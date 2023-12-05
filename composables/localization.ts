
export function useCoolI18n() {

  const i18n = useI18n()

  function isCurrentLanguage(languageCode: string) {

    const currentLocale = i18n.locale.value

    return currentLocale.startsWith(languageCode)
  }

  return { isCurrentLanguage }
}