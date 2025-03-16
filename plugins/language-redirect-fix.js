//  
// Fix1
//  Workaround for bugs with nuxt i18n redirects. 
//  Details: See https://github.com/nuxt-modules/i18n/issues/2626
// 
// Fix2 
//  Workaround for **another bug** with nuxt i18n redirects:
//  Details:
//      For 'generate' builds (not for 'dev' builds), when i18n redirected the user based on browser locale, the url location wouldn't update.
//      This also caused 'hydration mismatch' errors to appear, but I didn't see any other negative effects of this. (Didn't look for very long.)
//      
// General
//  - Add `<meta name="server-locale" :content="$i18n.locale">` to the template of a page (or layout) for this to work.
//
// Meta:
//  - I like Vue and Tailwind, and gsap is useful. But I'm really not sure adopting nuxt or nuxt-i18n was worth it. I think I don't need the Static Site Generation with 'Hydration' or the  'SEO benefits' at all (I don't care about Google results, and I'm not even sure if the SEO stuff is voodoo), and this stuff is so annoying to deal with. I've mostly replaced i18n with our custom MFLocalizedString() stuff. I think the only thing I still use it for is routing and that's very broken as you can see here. Webdev is crazy.
//      -> Should perhaps remove dependency on nuxt i18n entirely.
// 
// Updates:
//  [Aug 14 2024] Commenting out fix1 as the bug seems to have been fixed.
//  [Mar 13 2025] [nuxt i18n v8.5.5] Added and activated Fix2. 
//  [Mar 13 2025] Found *another* bug: The page totally freezes when the user tries to change locales, but only in 'generate' builds. No idea how to debug this. 
//      -> Will try to complete replace nuxt-i18n and implement my own routing. I think that'll be easier than to keep fighting the framework.
//  [Mar 16 2025] Now replaced nuxt-i18n with custom implementation (took longer than I thought).
//      The freeze was not due to nuxt-i18n, but due to an objectDescription() call on a route object inside router.options.ts trying to stringify the object-graph of the whole application (But only in production builds)... 
//      Figured this out by using the Chrome debugger to step through the compiled (/bundled?) js code of the production build (which is pretty obscure to read.)
//      Not sure this was worth it. But it was pretty fun and we polished the website some more, and fixed some extra bugs and we understand the whole system better now. Hopefully it was worth it.

export default defineNuxtPlugin(async function(app) {
    
    /*

    if ((false)) { // PROBLEM: Fixes page-loads but freezes the page when user manually switches languages (not in dev builds though... Webdev is crazy.)
        // Fix2 
        if (import.meta.client) {
            app.hook("app:mounted", () => {

                const serverLocale = document.querySelector('meta[name="server-locale"]')?.getAttribute('content');
                const clientLocale = app.$i18n.locale.value

                if (serverLocale != null && serverLocale != clientLocale) {
                    window.location = clientLocale;
                }
            })
        }
        
    }

    if (false) {
        // Fix1 
        if (import.meta.client) {

            app.hook("app:mounted", () => {

                const serverLocale = document.querySelector('meta[name="server-locale"]')?.getAttribute('content');
                const clientLocale = app.$i18n.locale.value

                if (serverLocale != null && serverLocale != clientLocale) {
                    location.reload()
                }
            })
        }
    }
    */
})