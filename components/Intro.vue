<template>

  <!-- Outer container 
        Notes: 
        - Setting z negative prevents scrolling in the qutoes. Not sure why. -->

  <div ref="outerContainer" class=" relative mt-[-0rem] z-10">




    <!-- BG + Color Splashes -->

    <div ref="backgroundContainer" class="bg-transparent w-[100vw] h-[100vh] overflow-x-visible overflow-y-visible absolute left-[50%] translate-x-[-50%] top-0 bottom-0 z-0">
      <img ref="colorSplash1" :src="colorSplashImagePath" alt="Color Splash" :class="['.color-splash-pulse1 absolute min-w-[80rem] top-0 left-0 translate-x-[calc(-50%-(-15%))] translate-y-[calc(-50%-12%)] scale-[1.1] -z-10 opacity-0']">
      <img ref="colorSplash2" :src="colorSplashImagePath" alt="Color Splash" :class="['.color-splash-pulse2 absolute min-w-[80rem] bottom-0 right-0 translate-x-[calc(50%+(-15%))] translate-y-[calc(50%+12%)] scale-[1.1] -z-10 opacity-0']">
      <div ref="backgroundDiv" class="w-full h-full -z-20 bg-black opacity-0"></div>
    </div>

    <!-- Initial Content -->

    <div class="flex items-center justify-center group w-[100%] h-[calc(100vh-0rem)] duration-[0.8s] ease-[cubic-bezier(0.4,0,0.2,1)]">
      <div class="h-fit w-fit border-[0px] relative">
        <div ref="innerContent" :class="['h-[100%] w-[100%] relative flex flex-col items-center justify-center border-[0px] translate-y-[-6rem] -z-20']"> 
          <img ref="mmfIcon" :src="mmfIconImagePath" alt="Mac Mouse Fix Icon" :class="['h-[14rem] border-[0px] mt-[-2rem] opacity-0']">
          <h1 ref="mmfName" :class="['font-[700] text-[5.0rem] text-black/90 mt-[1.75rem] mb-[-1.25rem] scale-[0.8]', playLoadingAnimation ? 'animate-pulse' : '']">Mac Mouse Fix</h1>
          <p ref="introTagline" :class="['text-black mb-[1.5rem] opacity-0']">Make Your $10 Mouse Better Than an Apple Trackpad</p>
          <div ref="downloadButton" :class="['bg-blue-500 rounded-[5rem] opacity-0']">
            <p class="text-white mx-[0.75em] my-[0.25em] text-[1.0rem]">Download</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Tagline -->

    <div ref="taglineContainer" class="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center opacity-0">
      <p ref="tagline" class="text-white font-[500] text-[2rem]" >Make Your $10 Mouse Better Than an Apple Trackpad</p>
    </div>

    <!-- Quote cards -->

    <div ref="quoteContainer" class="invisible absolute top-0 left-0 right-0 bottom-0 w-full h-full overflow-hidden z-30">
      
      <!-- Expand button etc -->
      <div class="absolute left-0 bottom-0 w-full h-[10rem] z-10 bg-gradient-to-b from-transparent to-black flex items-end justify-center">
        <div class="bg-blue-500 rounded-[20px] w-fit h-fit py-[0px] px-[7px] m-[20px] cursor-pointer select-none z-50" @click="quotesAreExpanded = !quotesAreExpanded">
          <p class="text-white text-center">{{ !quotesAreExpanded ? 'See More' : 'See Less' }}</p>
        </div>
      </div>

      <!-- Scrolling container -->
      <div ref="quoteScrollingContainer" class="w-full h-full overflow-hidden">

        <div class="h-[100%]"></div>

        <div :class="['h-max w-fit mx-auto z-30 overflow-y-clip', !quotesAreExpanded ? 'max-h-[60rem]' : 'max-h-[fit-content] mb-[10rem]']">
          
          <CardHeader titleKey="user-feedback.card-header.title" subtitleKey="user-feedback.card-header.sub" :iconPath="'speechBubbleImagePath'" class="hidden w-full" icon-class="scale-[1.0] translate-x-[0px] px-[8px] "/>

          <!-- User Quotes -->

          <!-- Small Layout -->
          <div class="flex md:hidden lg:hidden flex-row gap-[2.5rem] py-0 my-[4.5rem] justify-center">
            <!-- First row -->
            <div class="flex flex-col gap-[2.5rem]">
              <QuoteCard v-for="q in quotes" :quote="q" class=""/>
            </div>
          </div>

          <!-- Medium Layout -->
          <div class="hidden md:flex lg:hiddennnn flex-row gap-[2.5rem] py-0 my-[4.5rem]">
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
          <div class="hidden md:hidden lg:flexxx flex-row gap-[2.5rem] py-0 my-[4.5rem]">
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
    
  </div>
</template>

<script setup lang="ts">


/* Import gsap stuff */

const { $gsap, $ScrollTrigger, $customInOutEase } = useNuxtApp()
import { linearScalingEase } from "../utils/curves"

/* Manually import images 
  (Not totally sure if necessary)
*/
import mmfIconImagePath from "../assets/img/mmf-icon.png"
import colorSplashImagePath from "../assets/img/color-splash.png"
import speechBubbleImagePath from '../assets/img/text.bubble@8x.png'

/* Import Quote stuff */

import { everyNth, debouncer, watchProperty } from "~/utils/util";
import { getUsableQuotes } from '~/utils/quotes';
const quotes = getUsableQuotes()

/* Expose methods */

defineExpose({
  killIntroAnimation, // For debug
  recreateIntroAnimation, // For debug
})

/* Get dom element refs 
    All unused atm
*/

const outerContainer:           Ref<HTMLElement|null> = ref(null)
const innerContent:             Ref<HTMLElement|null> = ref(null)
const mmfIcon:                  Ref<HTMLElement|null> = ref(null)
const mmfName:                  Ref<HTMLElement|null> = ref(null)
const introTagline:             Ref<HTMLElement|null> = ref(null)
const downloadButton:           Ref<HTMLElement|null> = ref(null)
const backgroundContainer:      Ref<HTMLElement|null> = ref(null)
const colorSplash1:             Ref<HTMLElement|null> = ref(null)
const colorSplash2:             Ref<HTMLElement|null> = ref(null)
const backgroundDiv:            Ref<HTMLElement|null> = ref(null)
const taglineContainer:         Ref<HTMLElement|null> = ref(null)
const tagline:                  Ref<HTMLElement|null> = ref(null)
const quoteContainer:           Ref<HTMLElement|null> = ref(null)
const quoteScrollingContainer:  Ref<HTMLElement|null> = ref(null)


/* Constants */

const loadingTransitionDuration: number = 0.8 // Keep in sync with tailwind in <template>
const defaultScreenHeight = 970.0

/* State */

const playLoadingAnimation = ref(true) // Initialize to false to disable loading animations
const showColorSplashes = ref(false)
const quotesAreExpanded = ref(true)

watch(quotesAreExpanded, (newValue) => {
  recreateIntroAnimation()
})

/* Wait for mount */

onMounted(() => {

  /* Play intro animations */

  playLoadingAnimation.value = false
  showColorSplashes.value = true

  // Color splash animation

  const tlSplash = $gsap.timeline({ paused: true })
  var ease: any = "none"
  var duration = 3.6

  tlSplash.to(colorSplash1.value, { opacity: 1, ease: ease }, 0)
  tlSplash.to(colorSplash2.value, { opacity: 1, ease: ease }, 0)

  tlSplash.duration(duration)
  doAfterRender(() => tlSplash.play(), 0.0)

  // Intro transition

  const tlIntro = $gsap.timeline({ paused: true })
  ease = $customInOutEase
  duration = 1.0

  tlIntro.to(innerContent.value, { translateY: 0, ease: ease}, 0)
  tlIntro.to(mmfIcon.value, { opacity: 1, ease: ease}, 0)
  tlIntro.fromTo(mmfName.value, { opacity: 0.75, scale: 0.8 }, { opacity: 1, scale: 1, ease: ease}, 0)
  tlIntro.to(introTagline.value, { opacity: 1, ease: ease}, 0)
  tlIntro.to(downloadButton.value, { opacity: 1, ease: ease}, 0)

  tlIntro.duration(duration)
  doAfterRender(() => tlIntro.play(), 0.0)

  /* Create scroll animation */

  recreateIntroAnimation()
  window.addEventListener("resize", () => debouncedRecreateIntroAnimation()); // Note: No need to call ScrollTrigger.refresh() here since we're killing and creating new triggers

})

/* Debug */

// setInterval(() => {
  // console.log(`Quote scrollPos: ${ quoteScrollingContainer.value!.scrollTop }`);
// })

/* Functions */

var tlScroll: gsap.core.Timeline | null = null

const debouncedRecreateIntroAnimation = debouncer(() => recreateIntroAnimation(), 0/* 100 */)

function killIntroAnimation(reset: boolean = false) {
  if (tlScroll != null) {
    tlScroll!.scrollTrigger!.kill(true, false)
    tlScroll!.pause(reset ? 0 : undefined).kill()
    tlScroll = null
  }
}
function recreateIntroAnimation() {

  const animationAlreadyExists = tlScroll != null

  /* Store viewport scrollTop
      For restoring later. See below */
  var windowScrollPosition = 0
  if (animationAlreadyExists) {
    windowScrollPosition = window.scrollY
  }

  /* Take measurements for new animation 
      Notes: 
      - I thought doing this first might help prevent forced reflows, but doesn't seem to work. But generally ChatGPT advised me to do all DOM reads in a batch and before writes if possible for optimization. See browser rendering cycle and stuff (yeah I know this isn't helpful)*/
  const zoomScale = 450.0 * window.innerHeight / 970.0
  const taglineDistanceToOffscreen = tagline.value!.offsetTop + tagline.value!.offsetHeight
  const quotesDistanceToTagline = outerContainer.value!.offsetHeight/2 - tagline.value!.offsetHeight/2

  const zoomDistance = 3000.0
  const taglineDistance = 1000.0
  const quotesDistance = Math.min(quoteScrollingContainer.value!.scrollHeight - quoteScrollingContainer.value!.offsetHeight, Infinity/* 750 */)

  const taglineShift = -1000.0
  const quotesShift = 200.0

  const overallDistance = [zoomDistance, taglineDistance, quotesDistance, taglineShift, quotesShift].reduce((partialSum, n) => partialSum + n, 0)

  /* Kill current animation */
  if (animationAlreadyExists) {
    killIntroAnimation()
  }

  /* Setup new animation */
  tlScroll = $gsap.timeline({
    scrollTrigger: {
      id: "introTrigger",
      trigger: outerContainer.value!,
      pin: true, // Pin the trigger element while active
      anticipatePin: 1, // Prevent jitter when pin becomes active
      start: "top top", // Start when the top of the trigger hits the top of the viewport
      end: `+=${ overallDistance }`, // End after scrolling this many px beyond the start
      scrub: 0.0, // Smooth scrubbing, takes x second to "catch up" to the scrollbar
      markers: false,
    },
  })

  tlScroll.addLabel("zoomStart",    `${ 0 }`)
  tlScroll.addLabel("zoomStop",     `${ zoomDistance }`)
  tlScroll.addLabel("taglineStart", `${ zoomDistance + taglineShift }`)
  tlScroll.addLabel("taglineStop",  `${ zoomDistance + taglineShift + taglineDistance }`)
  tlScroll.addLabel("quotesStart",  `${ zoomDistance + taglineShift + taglineDistance + quotesShift }`)
  tlScroll.addLabel("quotesStop",   `${ zoomDistance + taglineShift + taglineDistance + quotesShift + quotesDistance }`)

  // Add zoom animation to tl
  tlScroll.addLabel("zoom")
  tlScroll.fromTo(innerContent.value, { scale: 1, translateY: 0 }, { scale: zoomScale, translateY: `${zoomScale * -4.6}rem`, ease: linearScalingEase(zoomScale), duration: zoomDistance }, "zoomStart")

  // Add tagline fadein animation to tl
  tlScroll.fromTo(taglineContainer.value, { opacity: 0 }, { opacity: 1, duration: taglineDistance }, `taglineStart`)

  // Fade in background and reset zoom on inner content
  tlScroll.fromTo(backgroundDiv.value!, { opacity: 0 }, { opacity: 1, duration: 1000 }, `zoomEnd-=600`)
  tlScroll.set(innerContent.value!, { scale: 1.0 }, '>0')

  // Add quotes
  var lastQuoteScrollPosition = 0
  tlScroll.to({}, { duration: quotesDistance, onUpdate: function() { 

    const progress = this.progress()
    const scrollPosition = intervalScale(progress, unitInterval, { start: 0, end: quotesDistance })
    quoteScrollingContainer.value!.scrollTop = scrollPosition

    lastQuoteScrollPosition = scrollPosition

    // DEBUG
    // console.log(`After onUpdate() - quote scrollPos: ${ quoteScrollingContainer.value!.scrollTop }, animationProgress: ${ progress }, height: ${ quoteScrollingContainer.value!.offsetHeight }, scrollHeight: ${ quoteScrollingContainer.value!.scrollHeight }, clientHeight: ${ quoteScrollingContainer.value!.clientHeight }`);
    
  }}, `quotesStart`)
  tlScroll.set(quoteContainer.value!, { visibility: 'visible' }, `quotesStart` )
  tlScroll.fromTo(quoteContainer.value!, { opacity: 0 }, { opacity: 1, duration: 200 }, `quotesStart`)

  tlScroll.fromTo(taglineContainer.value, { opacity: 1, translateY: '0'}, { opacity: 0, translateY: `${ -taglineDistanceToOffscreen }px`, duration: taglineDistanceToOffscreen * 1.3, ease: 'none' }, `quotesStart+=${ quotesDistanceToTagline - 200 }`)

  /* Restore scroll position of quotes and viewport
      Notes:   
      - Otherwise scrollPosition of the quoteScrollingContainer isn't restored and scroll linked animations flicker after recreating the animation
      - There are more methods to scroll viewport programmatically like setting document.body.scrollTop. Not sure if that's better in any way.
      - I don't really have a clue why this works. Thank the lord ChatGPT.
  */

  if (animationAlreadyExists) {
    $gsap.ticker.add(() => { // What
      window.scrollTo(0, windowScrollPosition)
    }, true, false)
  }
  requestAnimationFrame(() => {
    quoteScrollingContainer.value!.scrollTop = lastQuoteScrollPosition
  })

  /* Update scrollTrigger
      Doesn't seem to have any effect */
  // doAfterRender(() => {
  //   console.log("HHHHNGGGGG");
  //   tlScroll!.scrollTrigger?.update()
  // }, 1000)

  /* Refresh ScrollTrigger
      This seems to be unnecessary, since we create a completely new scrollTrigger. Also this leads to forcedReflow and other warnings in Chrome console. Edit: Chrome warnings now appear anyways. Idk. */
  // tlScroll!.scrollTrigger!.refresh()
}


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