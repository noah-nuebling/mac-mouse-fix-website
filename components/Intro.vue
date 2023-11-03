<template>

  <!-- Outer container 
        Notes: 
        - Setting z negative prevents scrolling in the qutoes. Not sure why. -->

  <div ref="outerContainer" class="w-[100%] h-[calc(100vh-5rem)] relative mt-[-0rem] z-10">

    <!-- BG + Color Splashes -->

    <div ref="backgroundContainer" class="bg-transparent w-[100vw] h-[100vh] overflow-x-visible overflow-y-visible absolute left-[50%] translate-x-[-50%] top-0 bottom-0 -z-10">
      <img ref="colorSplash1" :src="colorSplashImagePath" alt="Color Splash" :class="['.color-splash-pulse1 absolute min-w-[80rem] top-0 left-0 translate-x-[calc(-50%-(-15%))] translate-y-[calc(-50%-12%)] scale-[1.1] z-10 opacity-0']">
      <img ref="colorSplash2" :src="colorSplashImagePath" alt="Color Splash" :class="['.color-splash-pulse2 absolute min-w-[80rem] bottom-0 right-0 translate-x-[calc(50%+(-15%))] translate-y-[calc(50%+12%)] scale-[1.1] z-10 opacity-0']">
    </div>

    <!-- Initial Content -->

    <div class="flex items-center justify-center group w-[100%] h-[calc(100vh-5rem)] duration-[0.8s] ease-[cubic-bezier(0.4,0,0.2,1)]">
      <div class="h-fit w-fit border-[0px] relative">
        <div ref="innerContent" :class="['h-[100%] w-[100%] relative flex flex-col items-center justify-center border-[0px] translate-y-[-6rem] -z-20']"> 
          <img ref="mmfIcon" :src="mmfIconImagePath" alt="Mac Mouse Fix Icon" :class="['h-[14rem] border-[0px] mt-[-2rem] opacity-0']">
          <h1 ref="mmfName" :class="['font-[700] text-[5.0rem] text-black/90 mt-[1.75rem] mb-[-1.25rem] scale-[0.8]', playLoadingAnimation ? 'animate-pulse' : '']">Mac Mouse Fix</h1>
          <p ref="tagline" :class="['text-black mb-[1.5rem] opacity-0']">Make Your $10 Mouse Better Than an Apple Trackpad</p>
          <div ref="downloadButton" :class="['bg-blue-500 rounded-[5rem] opacity-0']">
            <p class="text-white mx-[0.75em] my-[0.25em] text-[1.0rem]">Download</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Tagline -->

    <div ref="taglineContainer" class="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center opacity-0">
      <p class="text-white font-[500] text-[2rem]" >Make Your $10 Mouse Better Than an Apple Trackpad</p>
    </div>

    <!-- Quote cards -->

    <div ref="quoteContainer" class="hidden absolute top-0 left-0 right-0 bottom-0 w-full h-full overflow-auto z-30">
      <div class="h-fit w-fit z-30">
        <CardHeader titleKey="user-feedback.card-header.title" subtitleKey="user-feedback.card-header.sub" :iconPath="'speechBubbleImagePath'" class="w-full" icon-class="scale-[1.0] translate-x-[0px] px-[8px] "/>

        <!-- User Quotes -->

        <!-- Small Layout -->
        <div class="flex md:hidden lg:hidden flex-row gap-[2.5rem] py-0 my-[4.5rem] justify-center">
          <!-- First row -->
          <div class="flex flex-col gap-[2.5rem]">
            <QuoteCard v-for="q in quotes" :quote="q" class=""/>
          </div>
        </div>

        <!-- Medium Layout -->
        <div class="hidden md:flex lg:hidden flex-row gap-[2.5rem] py-0 my-[4.5rem]">
          <!-- First row -->
          <div class="flex flex-col gap-[2.5rem]">
            <QuoteCard v-for="q in everyNth(2, 0, quotes)" :quote="q" class=""/>
          </div>
          <!-- Second row -->
          <div class="flex flex-col gap-[2.5rem]">
            <QuoteCard v-for="q in everyNth(2, 1, quotes)" :quote="q" class=""/>
          </div>
        </div>

        <!-- Large Layout -->
        <div class="hidden md:hidden lg:flex flex-row gap-[2.5rem] py-0 my-[4.5rem]">
          <!-- First row -->
          <div class="flex flex-col gap-[2.5rem]">
            <QuoteCard v-for="q in everyNth(3, 0, quotes)" :quote="q" class=""/>
          </div>
          <!-- Second row -->
          <div class="flex flex-col gap-[2.5rem]">
            <QuoteCard v-for="q in everyNth(3, 1, quotes)" :quote="q" class=""/>
          </div>
          <!-- Third row -->
          <div class="flex flex-col gap-[2.5rem]">
            <QuoteCard v-for="q in everyNth(3, 2, quotes)" :quote="q" class=""/>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script setup lang="ts">


/* Import gsap stuff */

import { gsap } from "gsap/gsap-core";
import { customInOutEase, linearScalingEase } from "../utils/curves"

/* Manually import images 
  (Not totally sure if necessary)
*/
import mmfIconImagePath from "../assets/img/mmf-icon.png"
import colorSplashImagePath from "../assets/img/color-splash.png"
import speechBubbleImagePath from '../assets/img/text.bubble@8x.png'

/* Import Quote stuff */

import { getUsableQuotes } from '~/utils/quotes';
const quotes = getUsableQuotes()

/* Get dom element refs 
    All unused atm
*/

const outerContainer:       Ref<HTMLElement|null> = ref(null)
const innerContent:         Ref<HTMLElement|null> = ref(null)
const mmfIcon:              Ref<HTMLElement|null> = ref(null)
const mmfName:              Ref<HTMLElement|null> = ref(null)
const tagline:              Ref<HTMLElement|null> = ref(null)
const downloadButton:       Ref<HTMLElement|null> = ref(null)
const backgroundContainer:  Ref<HTMLElement|null> = ref(null)
const colorSplash1:         Ref<HTMLElement|null> = ref(null)
const colorSplash2:         Ref<HTMLElement|null> = ref(null)
const taglineContainer:     Ref<HTMLElement|null> = ref(null)

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

  const sections = [4000, 500, 1000, 2000]
  const sectionsSum = sections.reduce((partialSum, n) => partialSum + n, 0)

  const tlScroll = gsap.timeline({
    scrollTrigger: {
      trigger: outerContainer.value!,
      pin: true, // Pin the trigger element while active
      anticipatePin: 1, // Prevent jitter when pin becomes active
      start: "top top", // Start when the top of the trigger hits the top of the viewport
      end: `+=${ sectionsSum }`, // End after scrolling this many px beyond the start
      scrub: 0.5, // Smooth scrubbing, takes 1 second to "catch up" to the scrollbar
    },
  })
  
  // Add zoom animation to tl
  const scale = 450.0 * window.innerHeight / 970.0
  tlScroll.to(innerContent.value, { scale: scale, translateY: `${scale * -4.6}rem`, ease: linearScalingEase(scale), duration: sections[0] })
  // tlScroll.set(innerContent.value, { scale: 1.0 })
  // tlScroll.set(backgroundContainer, { backgroundColor: 'black' })

  // Add pause to tl
  tlScroll.to({}, { duration: sections[1] }, '+=0')

  // Add tagline animatmion to tl
  tlScroll.to(taglineContainer.value, { opacity: 1, duration: sections[2] }, '+=0')

    // Add pause to tl
    tlScroll.to({}, { duration: sections[3] }, '+=0')

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