      /* Note: Use whitespace-pre-wrap tailwind class to make \n in the translation strings work */

export default defineI18nConfig(() => ({

  legacy: false,
  fallbackLocale: 'en',
  messages: {
    en: {
      'trackpad-features.title': "Macs Are Best\nWith a {track}\n…Right?",
      'trackpad-features.title.track':  "Trackpad",
    },
    de: {
      'trackpad-features.title':  "Macs sind am besten\nMit einem {track}.\n…Sicher?",
      'trackpad-features.title.track':  "Trackpad",
    }
  }
}))