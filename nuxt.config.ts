/* 
See: https://nuxt.com/docs/api/configuration/nuxt-config
Notes: 
- Use `whitespace-pre-wrap` tailwind class to make \n in the translation strings work 
- Not sure if `fallbackLocale` element is necessary since we already specify `defaultLocale` in nuxt.config.js
*/

export default defineNuxtConfig({
  
  // Make the site static. See https://stackoverflow.com/questions/74070241/what-is-the-difference-between-ssrfalse-vs-targetstatic-in-nuxtjs
  // target: 'static', // Only on nuxt 2 I think. On nuxt 3 you use the generate script
  ssr: true,
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@nuxtjs/i18n', 'markdown-it'],
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
      useCookie: true,
      cookieKey: 'mac_mouse_fix_website_language_cookie',
      alwaysRedirect: true, 
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
