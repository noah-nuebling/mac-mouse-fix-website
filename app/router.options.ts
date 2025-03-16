
/* Configuration for vue router
  
  Discussion:
  - The main purpose of this extra configuration is 
    1. Being able to link to sections of the website with #. Example: `macmousefix.com/#action_table` or `macmousefix.com/de_DE#action_table`. Currently the the supported hashes are: (But any html element with an id can be addressed)
      - `trackpad`
      - `scroll`
      - `action_table`
      - `price`
    2. Waiting for the introAnimation to be loaded *before* the router changes the scroll position. That's because when the introAnimation loads, the introSection grows in size and pushes everything after it down.
    3. Being able to restore the scroll-position from the last visit after the page is visited again. (This is default behaviour but we have to re-implement it since we override the scrollBehaviour)
  - 


*/

// Imports
import { type RouterConfig } from "@nuxt/schema"
import { type RouteLocationNormalizedGeneric, type RouteLocationNormalizedLoadedGeneric } from 'vue-router'
import { objectDescription } from "~/utils/util"
import { popLocaleFromPath, normalizePath } from "~/locales/localizableUtil"

// Constants
const frontPageHashOffset = -70 // Chosen so that the headline is *centered* on the screen when we link to sections of the website with #. !REMEMBER: Update this when the layout of the section headers changes.
const scrollBehavior = 'instant' // Whether to animate the scroll

function log(str: string): void {
  console.debug(`router.options: ` + str);
}
function assert(condition?: boolean, ...data: any[]): void {
  console.assert(condition, ...[`router.options: `, ...data])
}

// Main
export default <RouterConfig> {
  
  scrollBehavior: (to: RouteLocationNormalizedGeneric, from: RouteLocationNormalizedLoadedGeneric, savedPosition) => {

    /* Here, we customize scroll-position-restoration logic after page reloads or route-changes
    
        This is all very hacky. If we change the logic here, we need to change other parts of the page, which rely on the timing of this. For example:
        - Unhiding the `afterIntro` content inside Index.vue.
    */

    log(`Adjusting scroll position with\nfrom: ${objectDescription(from)}\nto: ${objectDescription(to)}\nsaved: ${objectDescription(savedPosition)}`); // If we use JSON.stringify() instead of objectDescription(), this will crash in (only in release builds) due to circular refs int the printed objects.

    const { $coolI18n, $store: global } = useNuxtApp();

    const scrollY0              = $coolI18n.scrollPosPreLocaleSwitch.value;
    const scrollHeight0         = $coolI18n.pageHeightPreLocaleSwitch.value;
    const isLocaleSwitch        = $coolI18n.localeSwitchIsPending.value; // Why are we checking the localeSwitch flag here and not with scrollY4, scrollY5, whatever? Idk it works. 

    const scrollY1      = window.scrollY;
    const scrollHeight1 = document.documentElement.scrollHeight;

    const { locale: fromLocale, rawPath: fromRawPath }  = popLocaleFromPath(from.path);
    const { locale: toLocale,   rawPath: toRawPath }    = popLocaleFromPath(to.path);
    const loadingFrontPage = ['/', ''].includes(toRawPath);

    if (isLocaleSwitch) { // Debug
      log(`Detected localeSwitchIsPending as ${isLocaleSwitch}`);
      assert(to.name !== from.name && 
        normalizePath(fromRawPath) == normalizePath(toRawPath) && 
        fromLocale != toLocale,
        `Routes are unexpected for localeSwitch: fromPath: ${from.path}, toPath: ${to.path}`);
    }

    const originalIntroAnimationId = global.introAnimationId;

    return new Promise(async (resolve) => {

      log(`Entered promise`);
      
      const scrollY2 = window.scrollY;
      const scrollHeight2 = document.documentElement.scrollHeight;

      let newIntroAnimationId = 0;

      if (loadingFrontPage) {
        await new Promise<void>((resolve, reject) => { // Wait for the intro scroll animation to load, because it shifts everything below it down.
          if (global.introAnimationId != originalIntroAnimationId) resolve();
          const unwatch = watch(() => global.introAnimationId, async (value) => {
            newIntroAnimationId = value;
            resolve();
            unwatch();
          })
        })
        log(`Entered post-introAnimation-await.`);
      }

      const scrollY3 = window.scrollY;
      const scrollHeight3 = document.documentElement.scrollHeight;

      if (isLocaleSwitch) {
        // Notes:
        // - `scrollBehavior` is guarded against being called even when it is not completed
        // - [Mar 2025] Not sure this is still (was ever?) necessary after replacing nuxt-i18n with our own implementation.
        await $coolI18n.waitForPendingLocaleChange();
      }
      
      const scrollY4 = window.scrollY;
      const scrollHeight4 = document.documentElement.scrollHeight;

      if (loadingFrontPage) {
        await new Promise<void>((resolve, reject) => {
          requestAnimationFrame(() => {
            resolve();
          })  
        })
        log(`Entered post-requestAnimationFrame.`);
      }
      
      const scrollY5 = window.scrollY;
      const scrollHeight5 = document.documentElement.scrollHeight;

      if ((0)) log(`from/to before applying changes:\nfrom:${objectDescription(from)}\nto:${objectDescription(to)}`);
      log(`scrollYAndHeightChanges: ${scrollY0}/${scrollHeight0} -> ${scrollY1}/${scrollHeight1} -> ${scrollY2}/${scrollHeight2} -> ${scrollY3}/${scrollHeight3} -> ${scrollY4}/${scrollHeight4} -> ${scrollY5}/${scrollHeight5}`);

      if (loadingFrontPage && (newIntroAnimationId == 0)) {
        log(`Scrolling to top on fresh front page load.`);
        resolve({ top: 0 });                                  // Not sure this makes sense. I guess if the page is loaded fresh we scroll to the top?
        return;
      }
      if (isLocaleSwitch) { 
        // Notes:
        // - This is all very hacky. We're using scrollY0 and scrollY5 here. I'm not sure why that works.
        // - [Mar 2025] After replacing nuxt-i18n with custom implementation, we switched scrollY1 and scrollHeight1 for scrollY0 and scrollHeight0. Not sure it worked correctly before.
        const oldScrollTopDist = (scrollY0! - 0); 
        const oldScrollBottomDist = (scrollHeight0! - window.innerHeight - scrollY0!);
        const scrollPosWasCloserToTopThanBottom = oldScrollTopDist < oldScrollBottomDist;
        const newScrollY = scrollPosWasCloserToTopThanBottom ? (oldScrollTopDist) : (scrollHeight5 - window.innerHeight - oldScrollBottomDist);
        log(`Restoring scroll position after locale switch. Anchoring to ${ scrollPosWasCloserToTopThanBottom ? 'top' : 'bottom'}. Target y: ${newScrollY}`);
        resolve({ top: newScrollY });
        return;
      } 
      if (to.hash) {
        log(`Restoring scroll position with hash ${to.hash}`)
        resolve({ el: to.hash, top: loadingFrontPage ? frontPageHashOffset : 0, behavior: scrollBehavior}) // If the URL ends with `#someID`, scroll to the element with HTML id `someID`)
        return;
      } 
      if (savedPosition) {
        log(`Restoring scroll position to saved position ${savedPosition.top}`)
        resolve({ top: savedPosition.top, behavior: scrollBehavior})
        return;
      } 
      log(`Falling back to using default scroll restoration`);
      resolve({ top: scrollY1 ?? 0 }); // Note: [Mar 2025] Is scrollY1 really the 'default' I guess that's the position the browser chose before our vue code could run?
      return;
    })
  }
}