// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  
  // Make the site static. See https://stackoverflow.com/questions/74070241/what-is-the-difference-between-ssrfalse-vs-targetstatic-in-nuxtjs
  // target: 'static', // Only on nuxt 2 I think. On nuxt 3 you use the generate script
  ssr: true,
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@nuxtjs/i18n'],
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: '~~/tailwind.config.js'
  },
  i18n: {
    locales: ['en', 'de'],
    defaultLocale: 'en',
    vueI18n: {
      fallbackLocale: 'en',
      messages: {
        en: {
          'trackpad-features.title':  "Macs Are Best\nWith a {0}.\n…Right?",
          'trackpad-features.title.0':  "Trackpad",
        },
        de: {
          'trackpad-features.title':  "Macs sind am besten\nMit einem {0}.\n…Sicher?",
          'trackpad-features.title.0':  "Trackpad",
        }
      }
    }
  },
  app: {
    // baseURL: process.env.NODE_ENV === 'development' ? '/' : 'mac-mouse-fix-website-nuxt', // Usnig gh-pages dev dependency instead
    baseURL: '/mac-mouse-fix-website-nuxt',
    head: {
      title: 'Nuxt Dojo (meta tag)',
      meta: [
        { name: 'description', content: 'Everything about Nuxt 3' }
      ],
      link: [
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' }
      ]
    }
  }
})
