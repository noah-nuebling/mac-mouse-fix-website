/* This offers extensions to nuxtI18n.
Access them using:
```
const { $coolI18n } = useNuxtApp(); 
```
*/

import md from 'markdown-it' // We used to import 'md' here and it seemed to work the same.
import type MarkdownIt from 'markdown-it/index.js';
import type { LocaleObject } from '@nuxtjs/i18n';
import Localizable from "../locales/Localizable";

import { stringf } from '../utils/util';

import { objectDescription, trimEmptyLines, removeIndent } from '../utils/util';

export default defineNuxtPlugin(app => {
    
    /* Test 
    We use `useI18n()` to give us autocompletions for the `$i18n` object. 
    When we actually use `useI18n()` it crashes though.

    // const i18n = useI18n();
    
    /* Get stuff from nuxtApp 
        Note: 
            Getting $i18n directly from the _NuxtApp instance passed into defineNuxtPlugin() also works, but TypeScript doesn't understand the types for some reason.
            By getting $i18n from useNuxtApp(), TypeScript understand.
        */

    const { $i18n } = useNuxtApp();

    /* Remove vueI18n translations functions 
        So we don't accidentally use them instead of MFLocalizedString() */
    
    const stub = () => { console.assert(false, `Don't use vue i18n translation functions. Use MFLocalizedString() instead.`); return "" }
    const boolStub = () => { console.assert(false, `Don't use vue i18n translation functions. Use MFLocalizedString() instead.`); return false }
    
    app.vueApp.config.globalProperties.$d = stub
    app.vueApp.config.globalProperties.$n = stub
    app.vueApp.config.globalProperties.$rt = stub
    app.vueApp.config.globalProperties.$t = stub
    app.vueApp.config.globalProperties.$tc = stub
    app.vueApp.config.globalProperties.$te = boolStub
    app.vueApp.config.globalProperties.$tm = stub
    
    /* Create our own translation function */

    function getLocaleCode(localeCode?: string): string {
        
        const c: string = localeCode ?? $i18n.locale.value;
        return c;
    }
    function getSourceLocaleCode(): string {
        return Localizable['sourceLocale'];
    }

    function _localizedString(strKey: string, localeCode?: string): string {

        /* 
            This function gets a localized string directly from the Localizable.js file 
                We use this over $i18n.t() since that always strips {format_specifiers} from the string for some reason. And we wanna do the formatting ourselves in stringf(), 
                so that we can separate the string retrieval (MFLocalizedString()) out from the formatting (stringf()), while $i18n.t() does it all at once. 
                Separating this out has the benefit that we can easily regex the source files for MFLocalizedString() calls. 
                
                Note that this does not have reactivity, which I think $t() does. However, this doesn't seem to be a problem and locale switching seems to work flawlessly. Not sure why.
        */

        // Get locale code
        const c = getLocaleCode(localeCode);

        // Get translated string
        //  @ts-ignore
        var result: string|undefined = Localizable.strings[c][strKey];

        // Make sure output is string - so we can use output directly in Vue templates without typescript complaining.
        if (typeof result !== 'string') {
            result = `<invalid localized string: ${objectDescription(result)} for key: ${strKey}>`;
        }

        // Return
        return result;
    }
    function MFLocalizedString(englishUIString: string, key: string, comment: string): string {

        /* 
            This is the main way to access localized strings. 
                Don't use $i18n.t(), $i18n.tc(), etc.
            We plan to regex the source code files for MFLocalizedString() calls to automatically sync the .xcstrings files to the source code using a 'sync-strings' script.
                The `key`, `comment`, and `englishUIString` args will all end up in the .xcstrings file. 
                And actually, the `comment` and `englishUIString` are *only* intended for the .xcstrings file and is not used by the nuxt app.
            All this is basically the exact same idea as the NSLocalizedString() macro which is used by Xcode to synchronize .xcstrings files to Swift and C source-code files.

        */

        // Get result
        const result = _localizedString(key);

        // Validate
        console.assert(import.meta.env.DEV !== import.meta.env.PROD, "App is simulateously in development and production mode, or in neither mode.");
        if (import.meta.env.DEV) { // Only do these checks in development builds
            const currentLocale = getLocaleCode();
            const sourceLocale = getSourceLocaleCode();
            if (currentLocale == sourceLocale) {

                // Log
                // console.log(`Validating localizedString ${key}...`);
                
                // Guard isEnglish
                console.assert(currentLocale === 'en', `Something is weird. The source locale is not English.`)

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
    
    /* Get renderer */
    const renderer = md({
        html: true, // Our lang files don't allow inline html for some reason iirc
        breaks: true
    })
    renderer.use(openLinkInNewTab)
    
    /* Define mdrf (MarkDown Render and Format) (commonly pronounced emdörf)
        Convenience function for rendering markdown markup to html while also inserting formats into the string.

        Discussion:
        - I think we should remove this and just use stringf() and md.render() explicitly. That's cleaner/clearer.
        - Does this belong into coolI18n?: This isn't super directly related to localization, but we have no reason to render markdown outside of localized strings, 
            since could just write HTML instead. So I think we'll only ever use this in conjuction with MFLocalizedString. 
            
        On usage of stringf(): 
            $i18n.t() also supports the same format specifier syntax we implemented for stringf, so we could always replace it with $i18n.t() */
    
    function mdrf(text: string, replacements?: Object, inline: boolean = true): string {
        
        var result = text;
        
        if (replacements !== undefined) {
            result = stringf(result, replacements);
        }
        result = inline ? renderer.renderInline(result) : renderer.render(result);
        
        return result
    }
    
    /* Define mt 
        Deprecated. Use mdrf() and MFLocalizedString() instead. */
    
    // function mt(key: string, values?: Object | Array<string>, inline: boolean = true, locale?: string): string {
    //   const translation = $i18n.t(key, values, locale)
    //   var result = inline ? renderer.renderInline(translation) : renderer.render(translation)
    //   return result
    // }
    
    /* Define isCurrentLanguage */
    function isCurrentLanguage(localeCode: string) {
        
        const currentLocale = $i18n.locale.value
        return currentLocale.startsWith(localeCode)
    }
    
    /* Define */
    function localeObject(locale: string): LocaleObject | null {
        var result = null;
        for (const l in $i18n.locales) {
            const obj = l as unknown as LocaleObject;
            if (obj.code == locale) {
                result = obj;
                break;
            }
        }
        return result;
    }
    
    /* Store custom functions */
    const coolI18n = {
        mdRenderer: renderer,
        MFLocalizedString,
        _localizedString,
        mdrf,
        isCurrentLanguage,
        localeObject,
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