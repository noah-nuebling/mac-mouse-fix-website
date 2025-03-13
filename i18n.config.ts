/* 
Notes: 
- Since there are so few options here it would be better to put this into nuxt.config.js directly, instead of having it link to this file. I read somewhere that that 
should be possible. But when I try it doesn't compile for some reason.

*/

/* // [Mar 2025] Removing nuxt-i18n dependency

import Localizable from "./locales/Localizable"

export default defineI18nConfig(() => ({

  legacy: false,
  fallbackLocale: 'en',
  fallbackWarn: false, // Consider enabling for translators after debugging, where these are annoying Edit: it still warns about missing keys, so this option is kinda pointless...

  warnHtmlMessage: false, // Allow HTML in localization files (doesn't work)
  warnHtmlInMessage: 'off',

  messages: Localizable['strings']
  
}))
*/