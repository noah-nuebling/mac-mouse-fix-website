<template>
  <div ref="outerContainer" class="relative mt-[-0rem] -z-10">

    <!-- Background -->

    <div class="bg-transparent w-screen h-[100vh] absolute left-[50%] translate-x-[-50%] top-0 bottom-0 -z-10">
      <img ref="colorSplash1" :src="colorSplashImagePath" alt="Color Splash" :class="['.color-splash-pulse1 absolute min-w-[80rem] top-0 left-0 translate-x-[calc(-50%-(-15%))] translate-y-[calc(-50%-12%)] scale-[1.1] -z-10 opacity-0']">
      <img ref="colorSplash2" :src="colorSplashImagePath" alt="Color Splash" :class="['.color-splash-pulse2 absolute min-w-[80rem] bottom-0 right-0 translate-x-[calc(50%+(-15%))] translate-y-[calc(50%+12%)] scale-[1.1] -z-10 opacity-0']">
    </div>

    <!-- Content -->

    <div class="flex items-center justify-center group w-[100%] h-[calc(100vh-5rem)] duration-[0.8s] ease-[cubic-bezier(0.4,0,0.2,1)]">
      <div class="h-fit w-fit border-[0px] relative duration-[inherit] ease-[inherit]">
        <div ref="innerContent" :class="['h-[100%] w-[100%] relative flex flex-col items-center justify-center border-[0px] translate-y-[-6rem]']"> 
          <img ref="mmfIcon" :src="mmfIconImagePath" alt="Mac Mouse Fix Icon" :class="['h-[14rem] border-[0px] mt-[-2rem] opacity-0']">
          <h1 ref="mmfName" :class="['font-[700] text-[5.0rem] text-black/90 mt-[1.75rem] mb-[-1.25rem] scale-[0.8]', playLoadingAnimation ? 'animate-pulse' : '']">Mac Mouse Fix</h1>
          <p ref="tagline" :class="['text-black mb-[1.5rem] opacity-0']">Make Your $10 Mouse Better Than an Apple Trackpad</p>
          <div ref="downloadButton" :class="['bg-blue-500 rounded-[5rem] opacity-0']">
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
import { linearScalingEase } from "../utils/curves"
import { customInOutEase } from "../utils/curves"


/* Manually import images 
  (Not totally sure if necessary)
*/
import mmfIconImagePath from "../assets/img/mmf-icon.png"
import colorSplashImagePath from "../assets/img/color-splash.png"

/* Get dom element refs 
    All unused atm
*/

const outerContainer: Ref<HTMLElement|null> = ref(null)
const innerContent:   Ref<HTMLElement|null> = ref(null)
const mmfIcon:        Ref<HTMLElement|null> = ref(null)
const mmfName:        Ref<HTMLElement|null> = ref(null)
const tagline:        Ref<HTMLElement|null> = ref(null)
const downloadButton: Ref<HTMLElement|null> = ref(null)
const colorSplash1:   Ref<HTMLElement|null> = ref(null)
const colorSplash2:   Ref<HTMLElement|null> = ref(null)

/* Constants */

const loadingTransitionDuration: number = 0.8 // Keep in sync with tailwind in <template>
const defaultScreenHeight = 970.0

/* State */

const playLoadingAnimation = ref(true) // Initialize to false to disable loading animations
const showColorSplashes = ref(false)

/* Wait for mount 
*/

onMounted(() => {

  /* Play intro animations */

  playLoadingAnimation.value = false
  showColorSplashes.value = true

  // Color splash animation

  const tlSplash = gsap.timeline({ paused: true })
  var ease: any = "none"
  var duration = 3.6

  tlSplash.to(colorSplash1.value, { opacity: 1, ease: ease }, 0)
  tlSplash.to(colorSplash2.value, { opacity: 1, ease: ease }, 0)

  tlSplash.duration(duration)
  doAfterRender(() => tlSplash.play(), 0.0)

  // Intro transition

  const tlIntro = gsap.timeline({ paused: true })
  ease = customInOutEase
  duration = 1.0

  tlIntro.to(innerContent.value, { translateY: 0, ease: ease}, 0)
  tlIntro.to(mmfIcon.value, { opacity: 1, ease: ease}, 0)
  tlIntro.fromTo(mmfName.value, { opacity: 0.75, scale: 0.8 }, { opacity: 1, scale: 1, ease: ease}, 0)
  tlIntro.to(tagline.value, { opacity: 1, ease: ease}, 0)
  tlIntro.to(downloadButton.value, { opacity: 1, ease: ease}, 0)

  tlIntro.duration(duration)
  doAfterRender(() => tlIntro.play(), 0.0)

  /* Setup scroll animation */

  const tlScroll = gsap.timeline({
    scrollTrigger: {
      trigger: outerContainer.value!,
      pin: true, // Pin the trigger element while active
      start: "top top", // Start when the top of the trigger hits the top of the viewport
      end: "+=4000", // End after scrolling this many px beyond the start
      scrub: 0.5, // Smooth scrubbing, takes 1 second to "catch up" to the scrollbar
    },
  })
  // add animations and labels to the timeline
  const scale = 450.0 * window.innerHeight / 970.0
  tlScroll.to(innerContent.value, { scale: scale, translateY: `${scale * -4.6}rem`, ease: linearScalingEase(scale) })
  tlScroll.set(innerContent.value, { scale: 1.0 })

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