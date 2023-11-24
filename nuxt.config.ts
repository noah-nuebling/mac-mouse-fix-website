/* 
See: https://nuxt.com/docs/api/configuration/nuxt-config
Notes: 
- Use `whitespace-pre-wrap` tailwind class to make \n in the translation strings work 
- Not sure if `fallbackLocale` element is necessary since we already specify `defaultLocale` in nuxt.config.js
*/

import { CANONICAL_URL, GITHUB_SUB_URL } from "./utils/constants" 

export default defineNuxtConfig({

  router: {
    options: {

    }
  },
  app: {
    baseURL: GITHUB_SUB_URL,
    head: {
      title: 'Mac Mouse Fix',
      meta: [
        { name: 'description', content: 'Make Your $10 Mouse Better Than an Apple Trackpad' }
      ],
      link: [
        // { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' }
      ]
    }
  },
  nitro: {
    // plugins: ['~/server/plugins/sitemaps.ts'],
  },

  // hooks: {  
  //   ge: (page) => {
  //     console.log('Generating page:', page.route, 'Locale:', page.locale);
  //   },
  // },
  
  // Make the site static. See https://stackoverflow.com/questions/74070241/what-is-the-difference-between-ssrfalse-vs-targetstatic-in-nuxtjs
  // target: 'static', // Only on nuxt 2 I think. On nuxt 3 you use the generate script
  ssr: true,
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@nuxtjs/i18n', 'nuxt-simple-robots', 'nuxt-simple-sitemap'],

  site: {
    url: CANONICAL_URL, 
    indexable: true, // Makes nuxt-simple-robots allow indexing even for non-production env - I think only helpful for debugging.
  },
  routeRules: {
    '/activate': { index: false/* , robots: 'index, follow' */ },
    '/thankyou': { index: false },
  },
  robots: {
    enabled: true,
  },
  sitemap: {
    enabled: true,
    xsl: false,
  },

  // markdownit: {
  //   // runtime: true // Support `$md()`
  //   // preset: 'default',
  //   // linkify: true,
  //   // breaks: true, 
  // },
  
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: '~~/tailwind.config.js'
  },
  i18n: {
    langDir: './locales/',
    locales: [
      { code: 'en-US', iso: 'en-US', name: '🇬🇧 English', file: 'en-US.js', dir: 'ltr' },
      { code: 'de-DE', iso: 'de-DE', name: '🇩🇪 Deutsch', file: 'de-DE.js', dir: 'ltr' },
    ],
    defaultLocale: 'en-US',
    vueI18n: './i18n.config.ts',
    strategy: 'prefix_except_default', //'prefix',
    detectBrowserLanguage: { /* Not sure what we're doing here */
      useCookie: true, // If true, non-english users will only be redirected the first time IIUC - only set false for testing
      cookieKey: 'i18n_redirected',
      redirectOn: 'no prefix', // 'root' is allegedly better than 'no prefix' for SEO or sth
    },
  },

})
