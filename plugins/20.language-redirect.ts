/*

    When the user opens a path without a language-prefix, we redirect to the same path, but with a language-prefix.

    Design considerations: [Mar 2025]
    - Ideally we want the redirect to happen before anything else about the page can load – to make things as responsive as possible. 
        We're optimizing for this:
        - The more 'proper' way to do redirects like this is with middleware. However, plugins run earlier in the Nuxt lifecycle.
        - The filename has a `01.` prefix so it's alphabetically ordered before the other plugins. This should make it execute before the other plugins.
    - This is part of our replacement for nuxt-i18n's routing. Based on my minimal testing, nuxt-i18n's routing seems about as fast as this. So I assume there's no easy way to make it faster.

    Observation:
    - [Apr 2025] (In dev builds) linking to a hash url like macmousefix.com/#price is quite janky with a language redirect, since the page will fully load and go to the #price section before *and* after the redirect.
        However, this is not noticable in prod builds.


    References: 
    - Nuxt lifecycle: https://nuxt.com/docs/guide/concepts/nuxt-lifecycle
    - Nuxt lifecycle hooks:
        - API docs: https://nuxt.com/docs/api/advanced/hooks
        - Nuxt Dojo: https://blog.nuxtdojo.com/p/2-understanding-lifecycle-hooks-in
    - Nuxt redirects: https://masteringnuxt.com/blog/how-to-redirect-in-nuxt-every-single-way

*/

import { localeInfo, localeCodes, sourceLocale } from "~/locales/localizableAccess";
import { popLocaleFromPath, pushLocaleToPath, isValidLocale, getUserSelectedLocale, getBrowserLocale } from "../locales/localizableUtil"

export default defineNuxtPlugin((nuxtApp) => {

    // Client-only
    if (import.meta.client) {

        // Get url we're loading.
        const router = useRouter();
        const to = router.currentRoute.value;

        // Find desired locale
        let desiredLocale = undefined;
        let toPathAlreadyContainsLocale = false;
        do {
            // 1. Check toPath
            desiredLocale = popLocaleFromPath(to.path).locale;
            if (isValidLocale(desiredLocale)) {
                toPathAlreadyContainsLocale = true;
                break;
            }
            // 2. Check fromPath
            if ((0)) { // fromPath is only available in middleware. But it shouldn't be necessary. Because when we navigate between pages we'll attach locale-prefixes using localePath().
                desiredLocale = popLocaleFromPath(from.path).locale;
                if (isValidLocale(desiredLocale)) break;
            }

            // 3. Check localStorage
            desiredLocale = getUserSelectedLocale();
            if (isValidLocale(desiredLocale)) break;

            // 4. Check browserLocale
            desiredLocale = getBrowserLocale();
            if (desiredLocale != null) break; // [Mar 2025] getBrowserLocale() returns a valid locale or null

            // 5. Use source locale
            desiredLocale = sourceLocale();

        } while (0);
        
        // Switch to locale
        if (toPathAlreadyContainsLocale)
            return;
        else {
            const resultPath = pushLocaleToPath(desiredLocale!, to.fullPath) // Use fullPath to retain hash and queryParams
            if      ((0))   navigateTo(resultPath); // `external: true` (strangely) makes this redirect work (sort of) (Update: That was when we didn't put any page on the root path, and this code was in a middleware)
            else if ((1))   window.location.href = resultPath; // Using window.location might be slightly faster than navigateTo(). Also I've seen navigateTo() not update the url properly, I think navigateTo() might not work this early in the nuxt lifecycle [Mar 2025]
        }
    }
})