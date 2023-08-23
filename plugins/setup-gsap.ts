// This globally imports and registers gsap and some of its modules so we can use them everywhere in our nuxt app.
// Nuxt plugins docs: https://nuxt.com/docs/guide/directory-structure/plugins
// Most Examples set up gsap in the App.vue file to globally import and register stuff, but since we don't have that, we use a plugin

import { gsap } from 'gsap'
/* vvv Not sure I need all these vvv */
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Draggable } from 'gsap/Draggable'
import { Observer } from 'gsap/Observer'


export default defineNuxtPlugin(nuxtApp => {
  gsap.registerPlugin(Observer, Draggable, ScrollTrigger)

  return {
    provide: { gsap, Observer, Draggable, ScrollTrigger }
  }
})