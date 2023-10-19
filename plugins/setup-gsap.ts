// This globally imports and registers gsap and some of its modules so we can use them everywhere in our nuxt app.
// Nuxt plugins docs: https://nuxt.com/docs/guide/directory-structure/plugins
// Most Examples set up gsap in the App.vue file to globally import and register stuff, but since we don't have that, we use a plugin
// We import animation curves (Power0, Power1, ...) because we want to manipulate them in our code. (Usually for gsap 3 it's you're supposed to use the condensed string form "power2.inOut" instead) 
//    I'm not sure it makes sense to import all this gsap stuff here (I think it's globally imported?), because we only need it in FeatureCard.vue (at the time of writing)

import { gsap } from 'gsap'
import { Power0, Power1, Power2, Power3, Power4 } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default defineNuxtPlugin(nuxtApp => {
  gsap.registerPlugin(ScrollTrigger)

  return {
    provide: { gsap, Power0, Power1, Power2, Power3, Power4, ScrollTrigger}
  }
})