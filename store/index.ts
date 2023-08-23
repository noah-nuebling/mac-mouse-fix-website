// This place is for global viariables and functions as far as I understand. The variables are reactive, I think.
// You can use `this` in the functions to refer to the store instance. E.g. `this.counter++`.
// Src for this: https://nuxt.com/docs/migration/configuration
// This is made globally available through `~/plugins/setup-global-store.ts`

import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
  
  // Variables
  state: () => ({
    counter: 0,
  }),

  // Functions
  actions: {

    increment() {
      // `this` is the store instance
      this.counter++
    },
  },
})