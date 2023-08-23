// This makes pinia store globally available I think. not sure what it does. The whole plugin thing is confusing.
// Src: https://nuxt.com/docs/migration/configuration

import { useMainStore } from "~/store";

export default defineNuxtPlugin((app => {
  const { $pinia } = app
  return {
    provide: {
      store: useMainStore($pinia)
    }
  }
})

)