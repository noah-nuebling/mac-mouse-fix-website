/* This is obsolete. 
    We moved the functionality of the localization.ts and markdownTranslate.ts composables into the setup-cool-i18n.ts plugin.
    We did that because we couldn't get the composables to work outside of <script setup> context. I think because useI18n() composable requires this context? 
    Not sure this refactor was necessary. */

export function useCoolI18n() {

  /* This method exists for 'backwards compatibility' after our refactor.
  It would be better to remove this and call useNuxtApp() directly, anywhere we need this.  */
  
  const { $coolI18n } = useNuxtApp();
  const { isCurrentLanguage } = $coolI18n;
  return { isCurrentLanguage }
}

/* ------ vvv Old implementation vvv ------ */

// export function useCoolI18n() {

  // const i18n = useI18n()

  // function isCurrentLanguage(languageCode: string) {

  //   const currentLocale = i18n.locale.value

  //   return currentLocale.startsWith(languageCode)
  // }

  // return { isCurrentLanguage }
// }