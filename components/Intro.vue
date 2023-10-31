<template>
  <div ref="outerContainer" class="mt-[0rem]">

    <!-- Background -->

    <div class="bg-transparent w-screen h-[100vh] absolute left-0.5 right-0.5 top-0 bottom-0 -z-10">
      <img ref="colorSplash1" :src="colorSplashImagePath" alt="Color Splash" :class="['.color-splash-pulse1 absolute min-w-[80rem] top-0 left-0 translate-x-[calc(-50%-(-15%))] translate-y-[calc(-50%-12%)] scale-[1.1] -z-10 transition-[opacity] duration-[3.6s] ease-[inherit]', !showColorSplashes ? 'opacity-0' : '']">
      <img ref="colorSplash2" :src="colorSplashImagePath" alt="Color Splash" :class="['.color-splash-pulse2 absolute min-w-[80rem] bottom-0 right-0 translate-x-[calc(50%+(-15%))] translate-y-[calc(50%+12%)] scale-[1.1] -z-10 transition-[opacity] duration-[3.6s] ease-[inherit]', !showColorSplashes ? 'opacity-0' : '']">
    </div>

    <!-- Content -->

    <div class="flex items-center justify-center group w-[100%] h-[calc(100vh-5rem)] duration-[0.8s] ease-[cubic-bezier(0.4,0,0.2,1)]">
      <div class="h-fit w-fit border-[0px] relative duration-[inherit] ease-[inherit]">
        <div ref="innerContent" :class="['h-[100%] w-[100%] relative flex flex-col items-center justify-center transition-[transform] duration-[inherit] ease-[inherit] border-[0px]', playLoadingAnimation ? 'translate-y-[-6rem]' : '']"> 
          <img ref="mmfIcon" :src="mmfIconImagePath" alt="Mac Mouse Fix Icon" :class="['h-[14rem] transition-[opacity] duration-[inherit] ease-[inherit] border-[0px] mt-[-2rem]', playLoadingAnimation ? 'opacity-0' : '']">
          <h1 ref="mmfName" :class="['font-[700] text-[5.0rem] text-black/90 mt-[1.75rem] mb-[-1.25rem] transition-transform duration-[inherit] ease-[inherit]', playLoadingAnimation ? 'animate-pulse scale-[0.8]' : '']">Mac Mouse Fix</h1>
          <p ref="tagline" :class="['text-black mb-[1.5rem] transition-[opacity] duration-[inherit] ease-[inherit]', playLoadingAnimation ? 'opacity-0' : 'opacity-[0.7]']">Make Your $10 Mouse Better Than an Apple Trackpad</p>
          <div ref="downloadButton" :class="['bg-blue-500 rounded-[5rem] transition-[opacity] duration-[inherit] ease-[inherit]', playLoadingAnimation ? 'opacity-0' : '']">
            <p class="text-white mx-[0.75em] my-[0.25em] text-[1.0rem]">Download</p>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">


/* Import gsap stuff */

import { gsap } from "gsap/gsap-core";
import { linearScalingEase } from "../utils/criticalSpring"


/* Manually import images 
  (Not totally sure if necessary)
*/
import mmfIconImagePath from "../assets/img/mmf-icon.png"
import colorSplashImagePath from "../assets/img/color-splash.png"

/* Get dom element refs 
    All unused atm
*/

const outerContainer:   Ref<HTMLElement|null> = ref(null)
const innerContent:   Ref<HTMLElement|null> = ref(null)
const mmfIcon:        Ref<HTMLElement|null> = ref(null)
const mmfName:        Ref<HTMLElement|null> = ref(null)
// const tagline:        Ref<HTMLElement|null> = ref(null)
// const downloadButton: Ref<HTMLElement|null> = ref(null)
// const colorSplash1:   Ref<HTMLElement|null> = ref(null)
// const colorSplash2:   Ref<HTMLElement|null> = ref(null)

/* Constants */

const loadingTransitionDuration: number = 0.8 // Keep in sync with tailwind in <template>

/* State */

const playLoadingAnimation = ref(true) // Initialize to false to disable loading animations
const showColorSplashes = ref(false)

/* Wait for mount 
*/

onMounted(() => {

  /* Play intro animations */

  playLoadingAnimation.value = false
  showColorSplashes.value = true

  /* Wait for introAnimations */
  setTimeout(() => {

    /* Setup scroll animation */
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: outerContainer.value!,
        pin: true, // Pin the trigger element while active
        start: "top top", // Start when the top of the trigger hits the top of the viewport
        end: "+=5000", // End after scrolling 500px beyond the start
        scrub: 0.5, // Smooth scrubbing, takes 1 second to "catch up" to the scrollbar
      },
    })
    // add animations and labels to the timeline
    tl.to(outerContainer.value, { scale: 450.0, translateY: '-2050rem', ease: linearScalingEase(450.0) })

  }, loadingTransitionDuration * 1000);
})



</script>

<style scoped lang="postcss">

/* Color Splash Animations
    Doesn't seem to work. It's okay
 */

.color-splash-pulse1 {
  animation: splash-pulse 5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
.color-splash-pulse2 {
  animation: splash-pulse 7s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes splash-pulse {
  0%, 100% {
    opacity: 1;
    transform: translate(40px, 100px);
  }
  20% {
    opacity: 0.85;
    transform: translate(-30px, 2px);
  }
  40% {
    opacity: 0.9;
    transform: translate(0px, 5px);
  }
  60% {
    opacity: 0.8;
    transform: translate(-7px, -4px);
  }
  80% {
    opacity: 0.85;
    transform: translate(6px, -2px);
  }
}

</style>