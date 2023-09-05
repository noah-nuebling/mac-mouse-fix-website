/* 
Notes: 
- Use `whitespace-pre-wrap` tailwind class to make \n in the translation strings work 
- Not sure if `fallbackLocale` element is necessary since we already specify `defaultLocale` in nuxt.config.js
*/

export default defineI18nConfig(() => ({

  legacy: false,
  fallbackLocale: 'en-US', 
  messages: {
    'en-US': {
      'trackpad-features.title': "Macs Are Best\nWith a {track}\n…Right?",
      'trackpad-features.title.track':  "Trackpad",
    },
    'de-DE': {
      'trackpad-features.title':  "Macs sind am besten\nMit einem {track}.\n…Sicher?",
      'trackpad-features.title.track':  "Trackpad",
    }
  }
}))