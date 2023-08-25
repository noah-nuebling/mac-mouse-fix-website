// This place is for global viariables and functions as far as I understand. The variables are reactive, I think.
// You can use `this` in the functions to refer to the store instance. E.g. `this.counter++`.
// Src for this: https://nuxt.com/docs/migration/configuration
// This is supposed to be made globally available through `~/plugins/setup-global-store.ts`

import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('global', () => {

  // Variables
  const backdrop: Ref<HTMLElement | null> = ref(null)

  // Functions
  // function increment() {
  //   counter.value++
  // }

  // Return 
  return { backdrop }
})