// This makes pinia store globally available I think. not sure what it does. The whole plugin thing is confusing.
// Src: https://nuxt.com/docs/migration/configuration
// Setup tutorial by pinia: https://pinia.vuejs.org/ssr/nuxt.html
// Stuff returned in provide seems to be accessible through useNuxtApp().
// Why are we passing in $pinia to useGlobalStore()?

import { useGlobalStore } from "~/store/global";

export default defineNuxtPlugin(nuxtApp => {
  const { $pinia } = nuxtApp
  return {
    provide: {
      store: useGlobalStore($pinia)
    }
  }
})