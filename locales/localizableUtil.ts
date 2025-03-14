

export { 
    isValidLocale, 
    pushLocaleToPath, 
    setUserSelectedLocale, 
    getUserSelectedLocale, 
    popLocaleFromPath, 
    getBrowserLocale,
}

import * as LocalizableAccess from './localizableAccess'

function isValidLocale(locale: string | null): boolean {
    if (!locale || locale.length == 0) return false;
    const result = LocalizableAccess.localeCodes().includes(locale)
    return result;
}

function pushLocaleToPath(locale: string, rawPath: string): string {
    
    // On paths: [Mar 2025]
    //  Paths we receive from nuxt are of the form: /<localeCode>/rest/of/path[/] (trailling '/' optional)
    //  The root pages have the path /<localeCode>[/]

    return '/' + locale + rawPath
}

function setUserSelectedLocale(locale: string|null) {
    // [Mar 2025] nuxt-i18n used a cookie with name `i18n_redirected` before we replaced it with this.
    
    if (locale == null) {
        window.localStorage.removeItem("user_selected_locale");
    } else {
        window.localStorage.setItem("user_selected_locale", locale);
    }
}
function getUserSelectedLocale(): string|null {
    return window.localStorage.getItem("user_selected_locale")
}

function popLocaleFromPath(path: string): { locale: string, rawPath: string } {

    let locale: string
    let rawPath: string
    
    const i = path.indexOf('/', 1) // Find the second '/'
    if (i == -1) {
        locale  = path.slice(1, undefined)
        rawPath = ''
    } else {
        locale  = path.slice(1, i)
        rawPath = path.slice(i, undefined)
    }
    return { locale: locale, rawPath: rawPath }
}

function getBrowserLocale(): string|null {
    
    // Locale code format:
    //  - Underscore vs dash: In python Babel, the codes are separated with `_`, but here we always expect `-` separator.
    //  - Capitalization: Not sure what rules are. Therefore we use toLowerCase() before comparing.
    //  - Matching Localizable.js: [Mar 2025] The result pass isValidLocale() or be null – that way we can do simple string-compare between locales. (I think that's useful?)

    // [Mar 2025] Meant to replace nuxt-i18n's getBrowserLocale(). See https://v8.i18n.nuxtjs.org/guide/browser-language-detection
    if (!import.meta.client) {
        console.log(false, 'Called getBrowserLocale() from the server. [Mar 2025] I think this happens on middleware redirect, but only in dev builds, not in our SSG builds.');
        return null;
    }

    // Get locale & language code from navigator
    const locale_code_browser = navigator.language;
    const lang_code_browser = locale_code_browser.split('-')[0]

    // Find translations which matches the browser's language code.
    let matching_locale_codes: string[] = [];
    for (let locale_code of LocalizableAccess.localeCodes()) {
        const lang_code = locale_code.split('-')[0]
        if (lang_code.toLowerCase() == lang_code_browser.toLowerCase())
            matching_locale_codes.push(locale_code)
    }
    
    // Failure return
    if (matching_locale_codes.length == 0)
        return null

    // If there are multiple translations with the same language code, find the best one.
    let perfect_match: string|undefined = undefined
    for (let locale_code of matching_locale_codes)
        if (locale_code.toLowerCase() == locale_code_browser.toLowerCase())
            perfect_match = locale_code;

    // Fall back to first matching translation
    const result = perfect_match || matching_locale_codes[0];
    
    // Return
    return result;
}