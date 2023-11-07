// This globally imports and registers gsap and some of its modules so we can use them everywhere in our nuxt app.
// Nuxt plugins docs: https://nuxt.com/docs/guide/directory-structure/plugins
// Most Examples set up gsap in the App.vue file to globally import and register stuff, but since we don't have that, we use a plugin
// We import animation curves (Power0, Power1, ...) because we want to manipulate them in our code. (Usually for gsap 3 it's you're supposed to use the condensed string form "power2.inOut" instead) 
//    I'm not sure it makes sense to import all this gsap stuff here (I think it's globally imported?), because we only need it in FeatureCard.vue (at the time of writing)

import { gsap } from 'gsap'
import { Power0, Power1, Power2, Power3, Power4 } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CustomEase } from 'gsap/CustomEase'

export default defineNuxtPlugin(nuxtApp => {
  gsap.registerPlugin(ScrollTrigger, CustomEase)

  /* Custom inOut ease 
    Created with this: https://gsap.com/docs/v3/Eases/
    Don't know where to declare this?
  */
  const customInOutEase: any = CustomEase.create("custom", "M0,0 C0,0 -0.047,0 0,0 0.027,0 0.105,0.011 0.178,0.113 0.258,0.225 0.288,0.343 0.34,0.481 0.388,0.609 0.458,0.874 0.581,0.948 0.685,1.01 1,1 1,1 1,1 1,1 1,1 1,1 1,1 1,1 1.056,1 1,1 1,1")

  return {
    provide: { gsap, Power0, Power1, Power2, Power3, Power4, ScrollTrigger, CustomEase, customInOutEase }
  }
})