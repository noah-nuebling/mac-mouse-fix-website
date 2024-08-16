/* 
See: https://nuxt.com/docs/api/configuration/nuxt-config
Notes: 
- Use `whitespace-pre-wrap` tailwind class to make \n in the translation strings work 
- Not sure if `fallbackLocale` element is necessary since we already specify `defaultLocale` in nuxt.config.js
*/

import Localizable from "./locales/Localizable"
import { CANONICAL_URL, GITHUB_SUB_URL } from "./utils/constants" 

export default defineNuxtConfig({

  // Set compatibility date
  //  I don't understand this, nuxt told me to add this (Today is 2024-08-14)
  compatibilityDate: '2024-08-14',

  // Make the site static. See https://stackoverflow.com/questions/74070241/what-is-the-difference-between-ssrfalse-vs-targetstatic-in-nuxtjs
  // target: 'static', // Only on nuxt 2 I think. On nuxt 3 you use the generate script
  ssr: true,
  devtools: {
    enabled: true,

    timeline: {
      enabled: true
    }
  },
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@nuxtjs/i18n', '@nuxt/image', '@nuxtjs/robots', '@nuxtjs/sitemap'],

  app: {
    baseURL: '/', // GITHUB_SUB_URL,
    head: {
      title: 'Mac Mouse Fix',
      meta: [
        { name: 'description', content: 'Make Your $10 Mouse Better Than an Apple Trackpad' }
      ],
      link: [
        // { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' }
        { rel: 'icon', type: 'image/png', href: '/favicon.png' }, // Normal favicon definition
        { rel: 'apple-touch-icon', href: '/favicon.png' } // This is for Safari favorites and iOS homescreen IIRC. Adding `type: 'image/png'` here broke it I think.
      ]
    }
  },
  
  nitro: {
  },
  vite: {
    assetsInclude: "**/*.mov",
    plugins: [
    ]
  },
  site: {
    url: CANONICAL_URL, 
    indexable: true, // Makes @nuxtjs/robots allow indexing even for non-production env - I think only helpful for debugging.
  },
  router: {
    options: {
      hashMode: false, // Disable hashmode so we can properly control the hash stuff in app/router.options.ts
    },
  },
  routeRules: {
    '/activate': { index: false/* , robots: 'index, follow' */ },
    '/thankyou': { index: false },
    '/paddle-checkout': { index: false },
  },
  robots: {
    enabled: true,
  },
  sitemap: { // To see results, go to http://localhost:3000/sitemap_index.xml
    enabled: true,
    xsl: false,
  },  
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: '~~/tailwind.config.js'
  },
  i18n: {
    skipSettingLocaleOnNavigate: true, // See app.vue
    langDir: null, //'./locales/',
    locales: Localizable['locales'],
    defaultLocale: Localizable['sourceLocale'],
    vueI18n: './i18n.config.ts',
    compilation: {
      strictMessage: false, // Allow HTML in localization files.
    },
    strategy: 'prefix_except_default', //'prefix',
    detectBrowserLanguage: { /* Not sure what we're doing here */
      useCookie: true, // If true, non-english users will only be redirected the first time IIUC - only set false for testing
      cookieKey: 'i18n_redirected',
      redirectOn: 'no prefix', // 'root' is allegedly better than 'no prefix' for SEO or sth
    },
  },
  image: { // Mostly default overrides for @nuxt/image which can also be directly set on <NuxtImg> or <NuxtPicture>
    domains: [], // List of external domains whose images should be optimized by @nuxt/image (I think)
    dir: "assets/img", // The default is `public`, and the @nuxt/img docs suggest that only public works in some places. But assets/img also works? Weird. See: Notes.md -> Optimization 
    format: ['webp'], // Default image format. Setting to webp, all our current images are still pngs. See this thread: https://github.com/nuxt/image/issues/933. There they say that their images are actually webp, but the file extension is png. But for us they seem to be real pngs. 
    densities: [1, 2], // This doesn't seem to work. Default is [1, 2] but It only creates images at 2x not at 1x scale. The resulting <img> has a srcset with 2 images but they are both the same. Also since all apple devices are retina, we decided to only use 2x. Edit: I think omitting 1x leads to more bugs.....
    quality: 100,
    
  }

})