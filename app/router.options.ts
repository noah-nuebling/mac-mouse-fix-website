
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

// Constants
const hashOffset = -70 // Chosen so that the headline is *centered* on the screen when we link to sections of the website with #. !REMEMBER: Update this when the layout of the section headers changes.
const scrollBehavior = 'instant' // Whether to animate the scroll

// Main
export default <RouterConfig> {
  
  scrollBehavior: (to: RouteLocationNormalizedGeneric, from: RouteLocationNormalizedLoadedGeneric, savedPosition) => {

    /* Here, we customize scroll-position-restoration logic after page reloads or route-changes
    
        This is all very hacky. If we change the logic here, we need to change other parts of the page, which rely on the timing of this. For example:
        - Unhiding the `afterIntro` content inside Index.vue.
    */

    console.debug(`router.options: Adjusting scroll position with\nfrom: ${objectDescription(from)}\nto: ${objectDescription(to)}\nsaved: ${savedPosition}`); // If we use JSON.stringify() instead of objectDescription(), this will crash in (only in release builds) due to circular refs int the printed objects.

    const { $store: global } = useNuxtApp();

    const scrollY1 = window.scrollY;
    const scrollHeight1 = document.documentElement.scrollHeight;

    return new Promise((resolve) => {
      
      const scrollY2 = window.scrollY;
      const scrollHeight2 = document.documentElement.scrollHeight;

      if ((0)) {
        // [Mar 2025] Removing nuxt-i18n dependency
        const isLocaleSwitch = global.localeSwitchIsPending; // Why are we checking the localeSwitch flag here and not with scrollY4, scrollY5, whatever? Idk it works. 
        if (isLocaleSwitch) {
          console.assert(to.name !== from.name);
        }
      }

      const unwatch = watch(() => global.introAnimationId, async (newIntroAnimationId) => { // Wait for the intro scroll animation to load, because it shifts everything below it down.

        const scrollY3 = window.scrollY;
        const scrollHeight3 = document.documentElement.scrollHeight;

        const isLocaleSwitch = false;
        /* if ((0)) {
          // [Mar 2025] Removing nuxt-i18n dependency
          if (isLocaleSwitch) {
            // `$i18n` is injected in the `setup` of the nuxtjs/i18n module.
            // `scrollBehavior` is guarded against being called even when it is not completed
            await $i18n.waitForPendingLocaleChange();
          }
        } */

        const scrollY4 = window.scrollY;
        const scrollHeight4 = document.documentElement.scrollHeight;

        requestAnimationFrame(() => {

          const scrollY5 = window.scrollY;
          const scrollHeight5 = document.documentElement.scrollHeight;

          console.debug(`router.options: scrollYAndHeightChanges: ${scrollY1}/${scrollHeight1} -> ${scrollY2}/${scrollHeight2} -> ${scrollY3}/${scrollHeight3} -> ${scrollY4}/${scrollHeight4} -> ${scrollY5}/${scrollHeight5}`);

          if (newIntroAnimationId > 0) {
            if (0) {}
            else if (((0)) && isLocaleSwitch) { // [Mar 2025] Removing nuxt-i18n dependency 
              const oldScrollTopDist = (scrollY1 - 0); // This is all very hacky. We're using scrollY1 and scrollY5 here. I'm not sure why that works.
              const oldScrollBottomDist = (scrollHeight1 - window.innerHeight - scrollY1);
              const scrollPosWasCloserToTopThanBottom = oldScrollTopDist < oldScrollBottomDist;
              const newScrollY = scrollPosWasCloserToTopThanBottom ? (oldScrollTopDist) : (scrollHeight5 - window.innerHeight - oldScrollBottomDist);
              console.debug(`router.options: Restoring scroll position after locale switch. Anchoring to ${ scrollPosWasCloserToTopThanBottom ? 'top' : 'bottom'}. Target y: ${newScrollY}`);
              resolve({ top: newScrollY });
            } 
            else if (to.hash) {
              console.debug(`router.options: Restoring scroll position with hash ${to.hash}`)
              resolve({ el: to.hash, top: hashOffset, behavior: scrollBehavior}) // If the URL ends with `#someID`, scroll to the element with HTML id `someID`)
            } 
            else if (savedPosition) {
              console.debug(`router.options: Restoring scroll position to saved position ${savedPosition.top}`)
              resolve({ top: savedPosition.top, behavior: scrollBehavior})
            } 
            else {
              console.debug(`router.options: Falling back to using default scroll restoration`);
              resolve({ top: scrollY1 }) 
            }
          }
        })
        unwatch()
      })
    })
  }
}