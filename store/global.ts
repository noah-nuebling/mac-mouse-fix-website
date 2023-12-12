// This place is for global viariables and functions as far as I understand. The variables are reactive, I think.
// You can use `this` in the functions to refer to the store instance. E.g. `this.counter++`.
// Src for this: https://nuxt.com/docs/migration/configuration
// This is supposed to be made globally available through `~/plugins/setup-global-store.ts`

import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('global', () => {

  // Variables
  // const backdrop = ref<HTMLElement | null>(null)
  const navbarHasDarkAppearance = ref<boolean>(false)
  const navbarHeight = ref(0)
  const introAnimationId = ref(0) // This increments every time the intro animation is (re-)created. Useful for watching changes.

  // Functions
  // function increment() {
  //   counter.value++
  // }

  // Return 
  return { navbarHasDarkAppearance, introAnimationId, navbarHeight }
})