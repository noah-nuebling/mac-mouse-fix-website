// This globally imports and registers gsap and some of its modules so we can use them everywhere in our nuxt app.
// Nuxt plugins docs: https://nuxt.com/docs/guide/directory-structure/plugins
// Most Examples set up gsap in the App.vue file to globally import and register stuff, but since we don't have that, we use a plugin

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'


export default defineNuxtPlugin(nuxtApp => {
  gsap.registerPlugin(ScrollTrigger)

  return {
    provide: { gsap, ScrollTrigger}
  }
})