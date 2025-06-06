/* This offers extensions to nuxtI18n.

Access them using:
```
const { $coolI18n } = useNuxtApp(); 
```


[Mar 2025] Rule of thumb: Prefer to put stuff into localizableUtil.ts over setup-cool-i18n.ts so that it's accessible everywhere. 
    Currently, we only have functions here that aren't pure functions and depend on some state like 'currentLocale'. 
    Having them here lets us get reactive bindings to these values. (E.g. by wrapping them in computed())

*/

import md from 'markdown-it' // We used to import 'md' here and it seemed to work the same.
import type MarkdownIt from 'markdown-it/index.js';
import * as Localizable from "../locales/localizableAccess"
import { popLocaleFromPath, pushLocaleToPath, isValidLocale, setUserSelectedLocale } from "../locales/localizableUtil"

import { useRouter } from 'vue-router';
import { stringf } from '../utils/util';

import { objectDescription, trimEmptyLines, removeIndent } from '../utils/util';

export default defineNuxtPlugin(app => {
    
    /* Import router */
    const router = useRouter();

    /* Define currentLocale */
    const currentLocale = computed(() => {

        // [Mar 2025] Meant to replace nuxt-i18n's .locale
        
        let locale: string|null

        const path = router.currentRoute.value.path;
        locale = popLocaleFromPath(path).locale;
        
        if (!isValidLocale(locale)) {
            locale = Localizable.sourceLocale(); // If the path doesn't contain a locale, we fall back to the source locale (English)
        }

        console.debug(`Current locale updated to ${locale}`)
    
        return locale!;
    })
    function isCurrentLanguage(localeCode: string) {
        const result = currentLocale.value.startsWith(localeCode)
        return result;
    }

    /* Define routing helpers */
    function localePath(rawPath: string): string {
        // [Mar 2025] Meant to replace nuxt-i18n's localePath()
        return pushLocaleToPath(currentLocale.value, rawPath)
    }
    
    function switchLocalePath(localeCode: string): string {
        // [Mar 2025] Meant to replace nuxt-i18n's switchLocalePath()
        const raw = popLocaleFromPath(router.currentRoute.value.fullPath).rawPath
        const result = pushLocaleToPath(localeCode, raw);
        return result;
    }

    /* Define MFLocalizedString */
    function MFLocalizedString(englishUIString: string, key: string, comment: string): string {

        /* 
            This is the main way to access localized strings. 
                Don't use $i18n.t(), $i18n.tc(), etc.
            We plan to regex the source code files for MFLocalizedString() calls to automatically sync the .xcstrings files to the source code using a 'sync-strings' script.
                The `key`, `comment`, and `englishUIString` args will all end up in the .xcstrings file. 
                And actually, the `comment` and `englishUIString` are *only* intended for the .xcstrings file and is not used by the nuxt app.
            All this is basically the exact same idea as the NSLocalizedString() macro which is used by Xcode to synchronize .xcstrings files to Swift and C source-code files.

            Note: [Mar 2025] We could make this computed() to make it reactive? But not sure that helps with anything.
        */

        // Get result
        const result = Localizable._localizedString(key, currentLocale.value);

        // Validate
        console.assert(import.meta.env.DEV !== import.meta.env.PROD, "App is simulateously in development and production mode, or in neither mode.");
        if (import.meta.env.DEV) { // Only do these checks in development builds
            const currentLocale_ = currentLocale.value;
            const sourceLocale = Localizable.sourceLocale();
            if (currentLocale_ == sourceLocale) {

                // Log
                // console.log(`Validating localizedString ${key}...`);
                
                // Guard isEnglish
                console.assert(currentLocale_ === 'en', `Something is weird. The source locale is not English.`)

                // Clean the englishUIString
                //  
                // Explanation: 
                //      - Our sync-strings script extracts localizable strings from 'sourceCode -> .xcstrings' and the build-strings script transfers localizable strings from '.xcstrings -> Localizable.js'. 
                //          We load the 'result' of this function directly from Localizable.js.
                //      - The sync-strings script works by regexing the source code for MFLocalizedString() invocations. Since we're inside the MFLocalizedString() code here, 
                //          we can use this opportunity to validate, whether the sync-strings and build-strings scripts have correctly extracted the values passed into MFLocalizedString() into Localizable.js.
                //      - However, after the sync-strings script extracts the values from the MFLocalizedString() invocations, it then removes linebreaks and trims empty lines before it stores the values in the .xcstrings files.
                //          So we need to replicate this 'string cleaning' here to validate the process. That's what `coolStrip()` is for. It emulates the string cleaning we do in the sync-strings script.
                // Sidenote:
                //      - We are not validating the `comment` in the same way, since the comment is not transferred from the .xcstrings file to the Localizable.js file by the build-strings script - Only the value aka UIString is transferred to Localizable.js)
                
                function coolStrip(s: string): string {
                    s = trimEmptyLines(s);
                    s = removeIndent(s);
                    return s;
                }
                const cleanedEnglishUIString = coolStrip(englishUIString);

                // Validate englishUIString
                console.assert(result == cleanedEnglishUIString, `English UIString loaded from file doesn't match the passed-in string.\nFrom file:\n${result}\npassed-in:\n${cleanedEnglishUIString}\nPerhaps our 'sourceCode -> .xcstrings' or '.xcstrings -> Localizable.js' extraction isn't working properly or wasn't ran before this webapp was compiled.`);
            }
        }

        // Return
        return result;
    }
    
    /* Get markdown renderer */
    const renderer = md({
        html: true, // Our lang files don't allow inline html for some reason iirc
        breaks: true
    })
    renderer.use(openLinkInNewTab)
    
    /* Define mdrf 
        (MarkDown Render and Format) (commonly pronounced emdörf)
         Convenience function for rendering markdown markup to html string while also inserting formats into the string.

        Discussion:
        - I think we should remove this and just use stringf() and md.render() explicitly. That's cleaner/clearer.
            - Update [Feb 2025]: While it might be 'cleaner', especially since we don't even use the string formatting in most uses of mdrf(), it also doesn't matter. The refactor wouldn't be worth it.
        - [Feb 2025] In many places we're passing localized strings into mdrf() even though they have no markdown markup. That's unnecessary, but also unproblematic, so we won't change it.
        - Does this belong into coolI18n?: This isn't super directly related to localization, but we have no reason to render markdown outside of localized strings, 
            since could just write HTML instead. So I think we'll only ever use this in conjuction with MFLocalizedString. 
            
        On usage of stringf(): 
            $i18n.t() also supports the same format specifier syntax we implemented for stringf, so we could always replace it with $i18n.t() 
    */
    
    function mdrf(text: string, replacements?: Object, inline: boolean = true): string {
        
        var result = text;
        
        if (replacements !== undefined) {
            result = stringf(result, replacements);
        }
        result = inline ? renderer.renderInline(result) : renderer.render(result);
        
        return result
    }

    /* Locale selection by user */

    let localeSwitchIsPending       = ref(false);
    let localeSwitchCount           = ref(0);
    let pageHeightPreLocaleSwitch   = ref<number|null>(null);
    let scrollPosPreLocaleSwitch    = ref<number|null>(null);
    function userSelectLocale(selectedLocale: string) {

        // React to user picking a new locale
    
        // Guard change
        if (currentLocale.value == selectedLocale) {
            return;
        }
        
        // Update state
        localeSwitchCount.value         += 1;
        localeSwitchIsPending.value     = true;
        scrollPosPreLocaleSwitch.value  = window.scrollY;
        pageHeightPreLocaleSwitch.value = document.documentElement.scrollHeight;

        // Store user preference
        setUserSelectedLocale(selectedLocale);

        // Set locale
        const p = switchLocalePath(selectedLocale);
        if          ((1))       navigateTo(p);
        else if     ((0))       router.push(p);
        else                    window.location.href = p;
    }

    app.hook('page:finish', async () => {
        //  [Mar 2025] Not sure if 'page:finish' is the optimal/appropriate hook. 
        //  Testing: (On 404 page, [Mar 2025]) 
        //      Constraint: We want finalizePendingLocaleChange() to be called after our router.options.ts > scrollBehavior hook – so that we can detect localeChanges in that hook.
        //      Constraint: We want finalizePendingLocaleChanges() to be called between the 1. and 2. time that the reactivity system wants to update all the QuoteCard.vue components. So we that we can skip the first wave of updates (for performance.)
        //          Sidenote: If we delay the update to currentLocale perhaps we could prevent this problem at a deeper level. I did some minimal testing where I only updated currentLocale after finalizePendingLocaleChanges() was called (from 'page:start', 'page:finish', or 'page:loading:end' hook), but it didn't seem to work, and introduced extra jank when switching locales from the 'This page is 0% translated into...' altert – so I quickly gave up.
        //      Result: 'page:start', 'page:finish', and 'page:loading:end' all seem to work.
        //      Result: 'page:loading:start' is called too early. 'page:transition:finish' is seemingly never called.
        //      Note: Haven't tested any other hooks.
        //  Note: If we ever change the hook, make sure all the code that uses localeSwitchIsPending or waitForPendingLocaleChange() (currently that's only the code described by the 'Constraint's above) still works.
        //  References:
        //      - Nuxt hook API documentation: https://nuxt.com/docs/api/advanced/hooks
        if (localeSwitchIsPending.value)
            await finalizePendingLocaleChange();
    });

    async function finalizePendingLocaleChange() {
        // 
        //  [Mar 2025] meant to replace nuxt-i18n's finalizePendingLocaleChange()
        // 
        //  [Mar 2025] This is based on nuxt-i18n's guide about waiting for page transitions. 
        //  After we replaced nuxt-i18n with our own implementation, this is now just a general way for tracking/waiting for locale transitions. (Not sure that's actually necessary, but some of our code is designed around that atm [Mar 2025].)
        //  The nuxt-i18n guide recommends calling finalizePendingLocaleChange() from a transition inside app.vue. However, that lead to a bug:
        //      Bug reproduction steps: [Mar 2025]
        //           1. Open 404 page, then click link to go to front page, then click Browser back-button to go back to 404 page.
        //           2. Now switch locales
        //           3. Click link to go to front page, then glick browser back-button.
        //           4. Now there are multiple copies of the 404 page in the DOM.
        //      Note: There's a 'Known Issues' Section at the bottom of nuxt's transition guide which says that DOM updates are completely frozen during transitions. This might be causing the bug (But I'm not sure.)
        //      Bug Solution: Remove all page-transitions and call finalizePendingLocaleChange() in a lifecycle hook instead.
        // 
        //  References:
        //     - nuxt-i18n guide about waiting for page transitions: https://i18n.nuxtjs.org/docs/guide/lang-switcher#wait-for-page-transition
        //     - nuxt transitions guide: https://nuxt.com/docs/getting-started/transitions#known-issues

        console.debug(`Finalizing localeChange.`);
        
        localeSwitchIsPending.value     = false;
        scrollPosPreLocaleSwitch.value  = null;
        pageHeightPreLocaleSwitch.value = null;
    }
    
    function waitForPendingLocaleChange() {
        return new Promise<void>((resolve, reject) => {
            if (!localeSwitchIsPending.value) {
                resolve();
                return;
            }
            const unwatch = watch(localeSwitchIsPending, (isPending, oldValue, onCleanup) => {
                if (!isPending) {
                    unwatch();
                    resolve();
                }
            }, { immediate: false })
        })
    }

    /* Provide our utilties ot the nuxt app */
    const coolI18n = {
        mdRenderer: renderer,
        MFLocalizedString,
        mdrf,
        currentLocale,
        isCurrentLanguage,
        localePath,
        switchLocalePath,
        userSelectLocale,
        localeSwitchCount,
        localeSwitchIsPending,
        waitForPendingLocaleChange,
        scrollPosPreLocaleSwitch,
        pageHeightPreLocaleSwitch,
    }
    
    /* Return */
    return {
        provide: { coolI18n }
    }

    
})

/* Helper function */

function openLinkInNewTab(md: MarkdownIt) {
    
    // This plugin allows us to open links in a new tab by adding ::newTab to the URL.
    // Usage example: [some text](some_link::newTab)
    
    // Save the original link_open renderer
    var defaultRender = md.renderer.rules.link_open || function(tokens, idx, options, env, self) {
        return self.renderToken(tokens, idx, options);
    };
    
    md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
        var aIndex = tokens[idx].attrIndex('href');
        if (aIndex >= 0) {
            var href = tokens[idx].attrs[aIndex][1];
            // Check if the URL ends with '|newTab'
            if (href.endsWith("::newTab")) {
                // Add target="_blank" and rel="noopener noreferrer"
                tokens[idx].attrPush(['target', '_blank']);
                // tokens[idx].attrPush(['rel', 'noopener noreferrer']);
                // Remove "|newTab" from the URL
                tokens[idx].attrs[aIndex][1] = href.replace('::newTab', '')
            }
        }
        
        // Call the default renderer
        return defaultRender(tokens, idx, options, env, self);
    };
}