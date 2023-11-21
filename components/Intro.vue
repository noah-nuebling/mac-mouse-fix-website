<template>

  <!-- Outer container 
        Notes: 
        - Setting z negative prevents scrolling in the qutoes. Not sure why. -->

  <div ref="outerContainer" class="relative z-0">

    <!-- Initial Content -->

    <div class="flex items-center justify-center group w-[100%] h-[calc(100vh-0rem)] relative z-[-20]">
      <div class="h-fit w-fit relative translate-y-[-1.5rem]">
        <div ref="innerContent" :class="['h-[100%] w-[100%] relative flex flex-col items-center justify-center -z-20', 
                                            'xs:origin-[50%_calc(50%_+_4.1rem)] sm:origin-[50%_calc(50%_+_4.925rem)] origin-[50%_calc(50%_+_5.55rem)]', false ? initialTranslateYTW : '' ]"> 
          <img ref="mmfIcon" :src="mmfIconImagePath" alt="Mac Mouse Fix Icon" :class="['xs:h-[13rem] sm:h-[15rem] h-[16.5rem] mt-[-2rem] mb-[3rem] opacity-1']">
          <h1 ref="mmfName" :class="['font-[700] xs:text-[3.75rem] sm:text-[4.5rem] text-[5.75rem] text-[hsl(0,0%,10%)] mb-[-1rem] tracking-[-0.01em]', false ? initialNameScaleTW : '', playLoadingAnimation && false ? 'animate-pulse' : '']">Mac Mouse Fix</h1>
          <p ref="introTagline" :class="['xs:text-[1.0rem] text-[1.1rem] xs:tracking-[-0.01rem] tracking-[0.01em] text-black mb-[2.25rem] opacity-1']">{{ $t('intro.tagline') }}</p>
          <DownloadButton ref="downloadButton" class="bg-blue-500 rounded-full text-white px-[0.85em] py-[0.3em] text-[1.2rem] tracking-[0.0em] opacity-1"></DownloadButton>
        </div>
      </div>

      <div ref="chevronDown" class="absolute left-0 right-0 bottom-0 h-fit flex justify-center opacity-0 z-[-10]">
        <img :src="chevronImagePath" alt="" class="w-[2rem] m-[3rem] opacity-[0.85]">
      </div>
    </div>

    <!-- Background -->

    <div ref="backgroundContainer" class=" absolute w-[100vw] h-[calc(100vh)] top-[0] bottom-[0] left-[50%] translate-x-[-50%] z-[5]">
      <div ref="backgroundDiv" class="absolute inset-0 top-[-30rem] -z-20 bg-[hsl(0,0%,0%)] opacity-0"></div>
    </div>

    <!-- Splash container -->
    <div class="absolute w-[100vw] h-full top-0 left-[50%] translate-x-[-50%] overflow-clip z-[10]">

      <!-- Dark Center splash -->
      <div :class="['hidden absolute inset-0 color-splash-pulse1', splashDance ? '' : 'paused']">
        <div ref="colorSplashCenter" class="absolute inset-0">
          <img :src="colorSplashDark2ImagePath" alt=""  :class="['w-[80rem] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] scale-[1.5] opacity-[0.2]']">
        </div>
      </div>

      <!-- Top-left splash (dark) -->
      <div ref="dancer1" :class="['absolute inset-0 z-10 color-splash-dance1', splashDance ? '' : 'paused']">
        <div :class="['absolute inset-0 color-splash-pulse1', splashDance ? '' : 'paused']">
          <div ref="colorSplash1" class="absolute inset-0 opacity-1 ">
            <img :src="colorSplashDark1ImagePath" alt=""  :class="['f-w-[calc((0.5*200vh)+(0.5*200*9.75px))] absolute top-[0] left-[calc(50%-0.5*1920px)]       translate-x-[calc(-50%-(-15%))] translate-y-[calc(-50%-12%)] scale-[1.1] filter brightness-[1.0] transition-[opacity] duration-[1000ms] ease-linear ', navbarHasDarkAppearance ? '' : 'opacity-0']">
          </div>
        </div>
      </div>

      <!-- Top-left splash (light) -->
      <img :src="colorSplashImagePath" alt="" :class="['f-w-[calc((0.5*235vh)+(0.5*235*9.75px))] absolute z-[10] top-[0] left-[calc(50%-0.5*1920px)] translate-x-[calc(-50%-(-15%))] translate-y-[calc(-50%-12%)] scale-[1.1] transition-[opacity] duration-[1000ms] ease-linear', navbarHasDarkAppearance ? 'opacity-0' : '']">

      <!-- Bottom-right splash (dark) -->
      <div ref="dancer2" :class="['absolute inset-0 z-10 color-splash-dance2', splashDance ? '' : 'paused']">
        <div :class="['absolute inset-0 color-splash-pulse2', splashDance ? '' : 'paused']">
          <div ref="colorSplash2" class="absolute inset-0 opacity-1">
            <img :src="colorSplashDark2ImagePath" alt=""  :class="['f-w-[calc((0.5*220vh)+(0.5*220*9.75px))] absolute bottom-[0] right-[calc(50%-0.5*1920px)]   translate-x-[calc(50%+(-15%))] translate-y-[calc(50%+12%)] scale-[1.1] filter brightness-[1.0] transition-[opacity] duration-[1000ms] ease-linear ', navbarHasDarkAppearance ? '' : 'opacity-0']">
          </div>
        </div>
      </div>
      <!-- Bottom-right splash (light) -->
      <img :src="colorSplashImagePath" alt="" :class="['f-w-[calc((0.5*185vh)+(0.5*185*9.75px))] absolute z-[10] bottom-[0] right-[calc(50%-0.5*1920px)] translate-x-[calc(50%+(-15%))] translate-y-[calc(50%+12%)] scale-[1.1] transition-[opacity] duration-[1000ms] ease-linear', navbarHasDarkAppearance ? 'opacity-0' : '']">
    </div>



    <!-- Tagline -->

    <div ref="taglineContainer" class="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center z-[20] ">
      <p ref="tagline" class="font-[500] sm:text-[1.75rem] md:text-[2.25rem] text-[2.75rem] text-center mx-[1rem] opacity-0 text-glow-2 safari:safari-text-glow-2 text-[hsla(0,0%,100%,0.86)] safari:text-[hsla(0,0%,100%,0.93)]" v-html="$mt('intro.big-tagline')"></p>
    </div>

    <!-- Quote cards -->

    <div ref="quoteContainer" class="invisible absolute top-0 left-0 right-0 bottom-0 w-full h-full z-30">
      
      <!-- Expand button & shadow -->
      <div ref="quoteBottom" :class="['absolute w-[100vw] left-[50%] translate-x-[-50%] bottom-0  h-[10rem] z-50 flex items-end justify-center', quotesAreExpanded ? '' : '']">
        <div class="absolute inset-0 bg-gradient-to-b from-black/0 via-black/[0.1] via-20% to-black/[0.7]"></div>
        <div ref="quoteExpandButton" class="text-[1.1rem] relative w-fit h-fit py-[0.3em] px-[0.75em] m-[2.5em] shadow-sm shadow-black/[0.0] cursor-pointer select-none z-50" @click="quotesAreExpanded = !quotesAreExpanded">
          <div class="absolute inset-0 bg-white/[0.1] backdrop-blur-[1rem] backdrop-saturate-[1.5] rounded-full border border-white/[0.2] z-10"/>
          <p class="text-[1em] text-white/[0.85] font-[500] text-center relative z-20" v-html="!quotesAreExpanded ? $t('quotes.see-more') : $t('quotes.see-less')"></p>
        </div>
      </div>

      <!-- Scrolling container -->
      <div ref="quoteScrollingContainer" class="w-full h-full overflow-hidden">

        <div class="h-[100%]"></div>

        <div :class="['relative h-max mx-auto z-30 overflow-y-clip flex flex-col items-center pb-[7.2rem]', !quotesAreExpanded ? 'sm:max-h-[calc(200vh+2.5rem)] max-h-[calc(100vh+2.5rem)]' : 'max-h-[fit-content]']">
        
          <!-- User Quotes -->

          <!-- Small Layout -->
          <div class="sm:flex hidden flex-row py-0 mx-[1.5rem] justify-center">
            <!-- First row -->
            <div class="flex flex-col gap-[3.5rem] m-[0] items-stretch">
              <QuoteCard v-for="q in quotes" :quote="q" class=""/>
            </div>
          </div>

          <!-- Medium Layout -->
          <div class="sm:hidden flex flex-row gap-[3.5rem] mx-[3.5rem] ">
            <!-- First row -->
            <div class="flex flex-col gap-[4.5rem] items-stretch">
              <QuoteCard v-for="q in everyNth(2, 0, quotes)" :quote="q" class=""/>
            </div>
            <!-- Second row -->
            <div class="flex flex-col gap-[4.5rem] items-stretch">
              <QuoteCard v-for="q in everyNth(2, 1, quotes)" :quote="q" class=""/>
            </div>
          </div>

          <!-- Thank you message -->
          <div class="flex justify-center my-[10rem] mx-[1.5rem]">
            <QuoteCard :text="$mt('quotes.thankyou')" :doGlow="false" class="strong:inline-block strong:text-glow-2 strong:text-white/[0.3]"/>
          </div>
          <!-- <CardHeader titleKey="user-feedback.card-header.title" :hideVideoHint="true" subtitleKey="" class="w-full"/> -->
        </div>
      </div>
    </div>
    
  </div>

</template>

<script setup lang="ts">


/* Debug */

const i18n = useI18n()
const locale = i18n.locale

console.log(`Locale during Intro.vue setup: ${ locale.value }, browserLocale: ${ i18n.getBrowserLocale() }`);

/* Import gsap stuff */

const { $gsap, $ScrollTrigger, $customInOutEase } = useNuxtApp()
import { linearScalingEase } from "../utils/curves"

/* Manually import images 
  (Not totally sure if necessary)
*/
import mmfIconImagePath from "../assets/img/mmf-icon.png"
import colorSplashImagePath from "../assets/img/color-splash.png"
import colorSplashDark1ImagePath from "../assets/img/color-splash-dark-1.png"
import colorSplashDark2ImagePath from "../assets/img/color-splash-dark-2.png"
import chevronImagePath from "../assets/img/chevron.down@8x.png"
import speechBubbleImagePath from '../assets/img/text.bubble@8x.png'

/* Import Quote stuff */

import { getUsableQuotes } from '~/utils/quotes';
const quotes = getUsableQuotes()

/* Import Other */
import { everyNth, debouncer, watchProperty, prefersReducedMotion, remInPx, vw, vh, vmin, vmax, resetCSSAnimation } from "~/utils/util";
const constants = useConstants()
const { currentSize, ResponsiveSize } = useResponsive()
const $mt = useMT()

/* Expose methods */

defineExpose({
  killIntroAnimation, // For debug
  recreateIntroAnimation, // For debug
})

/* Get global state */

import { useGlobalStore } from "~/store/global";
import { storeToRefs } from "pinia";
const global = useGlobalStore()
const { navbarHasDarkAppearance } = storeToRefs(global)

/* Get dom element refs 
    All unused atm
*/

const outerContainer          = ref<HTMLElement|null>(null)
const innerContent            = ref<HTMLElement|null>(null)
const mmfIcon                 = ref<HTMLElement|null>(null)
const mmfName                 = ref<HTMLElement|null>(null)
const introTagline            = ref<HTMLElement|null>(null)
const downloadButton          = ref<DownloadButton|null>(null)
const chevronDown             = ref<HTMLElement|null>(null)
const backgroundContainer     = ref<HTMLElement|null>(null)
const colorSplash1            = ref<HTMLElement|null>(null)
const colorSplash2            = ref<HTMLElement|null>(null)
const colorSplashCenter       = ref<HTMLElement|null>(null)
const dancer1                 = ref<HTMLElement|null>(null)
const dancer2                 = ref<HTMLElement|null>(null)
const backgroundDiv           = ref<HTMLElement|null>(null)
const taglineContainer        = ref<HTMLElement|null>(null)
const tagline                 = ref<HTMLElement|null>(null)
const quoteContainer          = ref<HTMLElement|null>(null)
const quoteBottom             = ref<HTMLElement|null>(null)
const quoteScrollingContainer = ref<HTMLElement|null>(null)
const quoteExpandButton       = ref<HTMLElement|null>(null)


/* Constants */

const initialTranslateY = '-10rem'/* '-3.5rem' */
const initialTranslateYTW = 'translate-y-[-10rem]'
const initialNameScale = 0.8
const initialNameScaleTW = 'scale-[0.8]'

/* State */

const playLoadingAnimation = ref(true) // Initialize to false to disable loading animations
const quotesAreExpanded = ref(false)
const splashDance = ref(false)

var viewportSizeForCurrentAnimation = { width: 0, height: 0 }

watch(quotesAreExpanded, (newValue) => {
  // Measure quotes section size
  const quotesDistance = quoteScrollingContainer.value!.scrollHeight - quoteScrollingContainer.value!.offsetHeight
  // Wait until quotes are rendered at new size, and then recreate animation
  doAfterRender(() => recreateIntroAnimation(true, quotesDistance))
})

/* Debug */

// console.log(`Window dims: ${ vw() * 100 } x ${ vh() * 10095 }`)

/* Wait for mount */

onMounted(() => {

  console.log(`Download button: ${ downloadButton.value.rootElement.style.opacity }`);

  /* Play intro animations */

  // Stop playing loading animation (pulse animation on `Mac Mouse Fix`)
  playLoadingAnimation.value = false

  // Color splash animation
  // const tlSplash = $gsap.timeline({ paused: true })
  var ease: any = "none"
  var duration = 3.6

  // tlSplash.to(colorSplash1.value, { opacity: 1, ease: ease }, 0)
  // tlSplash.to(colorSplash2.value, { opacity: 1, ease: ease }, 0)

  // tlSplash.duration(duration)
  // doAfterRender(() => tlSplash.play(), 0.0)

  // Intro transition
  //  Edit: Removed the intro transition - Not this is just chevron fade-in

  const tlIntro = $gsap.timeline({ paused: true })
  ease = $customInOutEase
  duration = 1.0

  tlIntro.fromTo(chevronDown.value!, { opacity: 0, translateY: initialTranslateY }, { opacity: 1, translateY: 0, ease: ease }, 0)

  tlIntro.duration(duration)
  doAfterRender(() => tlIntro.play(), 0.0)

  /* Make chevron bounce after delay 
      Not totally sure if this is helpful or annoying. */
  const chevronBounceDelay = 0.5 + duration
  setTimeout(() => {
    if (chevronDown.value != null) {
      const c = chevronDown.value!.firstChild as HTMLElement
      c.classList.add('cool-bounce')
    }
  }, chevronBounceDelay * 1000);

  /* Create scroll animation, then enable vertical scrolling */
  doAfterRender(() => {
    recreateIntroAnimation()
    document.documentElement.style.overflowY = 'scroll'
  }, duration*1000)
  
  /* Update scroll animation on window resize */
  window.addEventListener("resize", () => {

    // Discussion:
    // - We're only updating the animation, if the height has changed more than `yThreshold`. This is to prevent the animation from being recalculated when the address bar extends/retracts on mobile Safari. ChatGPT said that 100 should work everywhere.
    // - I just tested on an iPhone Pro Max 15 Simulator on 50% website size in landscape and 100 wasn't enough. 200 seems to work though. 

    const yThreshold = 200

    window.locationbar

    const dx = window.innerWidth - viewportSizeForCurrentAnimation.width
    const dy = window.innerHeight - viewportSizeForCurrentAnimation.height

    if (Math.abs(dx) > 0 || Math.abs(dy) > yThreshold) {
      debouncedRecreateIntroAnimation()
    }
  }); // Note: No need to call ScrollTrigger.refresh() here since we're killing and creating new triggers
})

/* Debug */

// setInterval(() => {
  // console.log(`Quote scrollPos: ${ quoteScrollingContainer.value!.scrollTop }`);
// })

/* Functions */

var tlScroll: gsap.core.Timeline | null = null
var navTrigger: ScrollTrigger | null = null

const debouncedRecreateIntroAnimation = debouncer(() => recreateIntroAnimation(), 0/* 100 */)

function killIntroAnimation(reset: boolean = false) {
  if (tlScroll != null) {
    tlScroll!.scrollTrigger!.kill(true, false)
    tlScroll!.pause(reset ? 0 : undefined).kill()
    tlScroll = null
    navTrigger!.kill(true, false)
  }
}
function recreateIntroAnimation(dueToQuotes: boolean = false, previousQuotesDistance: number = 0.0) {

  // Debug
  console.log(`Recreating intro animation`);
  console.log(`Window width: ${ window.innerWidth }`);
  

  // Update state
  viewportSizeForCurrentAnimation = { width: window.innerWidth, height: window.innerHeight }
  const animationAlreadyExists = tlScroll != null

  // Validate
  console.assert(!dueToQuotes || animationAlreadyExists) // === dueToQuotesCollapes -> animationAlreadyExists

  /* Store viewport scrollTop
      For restoring later. See below */
  var windowScrollPosition = 0
  if (animationAlreadyExists) {
    windowScrollPosition = window.scrollY
  }

  /* Take measurements for new animation 
      Notes: 
      - I thought doing this first might help prevent forced reflows, but doesn't seem to work. But generally ChatGPT advised me to do all DOM reads in a batch and before writes if possible for optimization. See browser rendering cycle and stuff (yeah I know this isn't helpful)
      - Currently, 200 zoomScale is enough on Safari but on Chrome we need 250. I think making zoomScale higher might make performance worse on Safari. Edit: Now 230 is enough on Chrome. Idk why.
    */
  const s = currentSize()
  var zoomScale = (s == ResponsiveSize.xs ? 210 : s == ResponsiveSize.sm ? 220 : 230.0) * window.innerHeight / constants.base.height

  const taglineDistanceToOffscreen = tagline.value!.offsetTop + tagline.value!.offsetHeight
  const quotesDistanceToTagline = outerContainer.value!.offsetHeight/2 - tagline.value!.offsetHeight/2

  // Define length (in scroll-distance) of the main events of the animation
  var zoomDistance = 2000.0
  const taglineDistance = 1000.0 // Distance that the tagline takes to fade in
  const quotesDistance = quoteScrollingContainer.value!.scrollHeight - quoteScrollingContainer.value!.offsetHeight // Distance that the quotes are scrolling for

  // Define Offset from the start of one main event of the animation to the end of the previous main event
  const taglineShift = -(zoomDistance * 0.25) // Offset between zoomStop and taglineStart
  const quotesShift = 666.0                   // Offset between taglineStop and quotesStart

  /* Override animation params for reduceMotion */

  if (prefersReducedMotion() || currentSize() <= 0) {
    zoomScale = 1.15
    zoomDistance = -taglineShift
  }

  /* Calculate anchorpoints */

  const zoomStart     = 0
  const zoomStop      = zoomDistance
  const taglineStart  = zoomDistance + taglineShift
  const taglineStop   = zoomDistance + taglineShift + taglineDistance
  const quotesStart   = zoomDistance + taglineShift + taglineDistance + quotesShift
  const quotesStop    = zoomDistance + taglineShift + taglineDistance + quotesShift + quotesDistance
  
  const overallDistance = quotesStop

  /* Adjust viewport scroll position if quotes are collapsing */
  if (dueToQuotes) {

    const current = windowScrollPosition // aka quotesStartAnchored

    const quotesEndAtBottomPosition   = outerContainer.value!.offsetTop + quotesStop
    const quotesEndAtTopPosition      = quotesEndAtBottomPosition + window.innerHeight
    const thresholdPosition           = quotesEndAtBottomPosition // + 150

    const d = quotesDistance - previousQuotesDistance
    const quotesEndWasOnScreen = quotesEndAtBottomPosition - d < current && current < quotesEndAtTopPosition - d

    const quotesEndEndAnchoredPosition = current + d

    if (current > thresholdPosition) {
      if (!quotesEndWasOnScreen) {
        windowScrollPosition = thresholdPosition
      } else {
        windowScrollPosition = quotesEndEndAnchoredPosition
      }
    } // else -> scroll position is anchored at the top of the quotes
  }

  /* Kill current animation */
  if (animationAlreadyExists) {
    killIntroAnimation()
  }

  /* Setup navbar transitions 
      Notes:
      - We would've done this as part of the main intro scroll animation, but this needs to go on longer, so we need a separate scrollTrigger */

  const startOffset = zoomStop-150
  navTrigger = $ScrollTrigger.create({
    trigger: outerContainer.value!,
    start: `top+=${ startOffset } top`,
    end: `+=${ overallDistance-startOffset + window.innerHeight }`,
    onEnter: () => { navbarHasDarkAppearance.value = true }, 
    onEnterBack: () => { navbarHasDarkAppearance.value = true }, 
    onLeave: () => { navbarHasDarkAppearance.value = false }, 
    onLeaveBack: () => { navbarHasDarkAppearance.value = false }, 
  })

  /* Setup new animation */
  tlScroll = $gsap.timeline({
    scrollTrigger: {
      id: "introTrigger", // Used this to kill scrollTrigger, but unused at time of writing
      trigger: outerContainer.value!,
      pin: true, // Pin the trigger element while active
      anticipatePin: 1, // Prevent jitter when pin becomes active
      start: "top top", // Start when the top of the trigger hits the top of the viewport. Seems it doesn't work when reentering animation from the bottom in Safari
      end: `+=${ overallDistance }`, // End after scrolling this many px beyond the start
      scrub: 0.0, // Smooth scrubbing, takes x second to "catch up" to the scrollbar
      markers: false,
    },
  })

  // Add zoom animation to tl
  //  Notes: This has bad performance under Safari
  //  - will-change makes it better but makes the text blurry. 
  //  - We're using matrix instead of scale, because Apple MacBook Air website uses matrix for a similar effect and it has better performance. But it doesn't seem to help here. Maybe a tinyyy bit.
  //  - When we just reduce the scaling factor a little it improves. On the apple website the text is larger to begin with, so the scaling factor is smaller, than currently on this site. Reducing scaling factor is so far the only thing I found that removes framedrops.
  //  - Here's the old solution: tlScroll.fromTo(innerContent.value, { scale: 1, translateY: 0 }, { scale: zoomScale, translateY: `${zoomScale * -4.55}rem`, ease: linearScalingEase(zoomScale), duration: zoomDistance }, zoomStart)
  tlScroll.addLabel("zoom")
  // const zoomMatrix = `matrix(${ zoomScale }, 0, 0, ${ zoomScale }, 0, ${ zoomTranslateY })`
  // tlScroll.fromTo(innerContent.value, {  transform: 'matrix(1, 0, 0, 1, 0, 0)' }, { transform: zoomMatrix, ease: linearScalingEase(zoomScale), duration: zoomDistance }, zoomStart)
  tlScroll.fromTo(innerContent.value, { scale: 1.0, translateY: 0.0 }, { scale: zoomScale, translateY: 0.0, ease: linearScalingEase(zoomScale), duration: zoomDistance, force3D: false }, zoomStart)
  // tlScroll.set(taglineContainer.value, { backgroundColor: 'green' }, zoomStop)

  // Add fade-out to chevron
  tlScroll.fromTo(chevronDown.value, { opacity: 1, translateY: 0 }, { opacity: 0, translateY: '-0rem', duration: zoomDistance/20 }, zoomStart)

  // Add tagline fadein animation to tl
  tlScroll.fromTo(tagline.value, { opacity: 0 }, { opacity: 1, duration: taglineDistance }, taglineStart)

  // Fade in background, start splash dance, and reset zoom on inner content
  const bgStart = zoomStop-600
  const bgDistance = 1000
  const bgStop = bgStart + bgDistance
  tlScroll.fromTo(backgroundDiv.value!, { opacity: 0 }, { opacity: 1, duration: bgDistance }, bgStart)
  tlScroll.set({}, { onComplete: () => { splashDance.value = !prefersReducedMotion() }, onReverseComplete: () => { splashDance.value = false } }, bgStart-300)
  tlScroll.fromTo(innerContent.value!, { scale: zoomScale }, { scale: 1, duration: 0 }, bgStop)

  // Add quotes
  var lastQuoteScrollPosition = 0
  tlScroll.to({}, { duration: quotesDistance, onUpdate: function() { 

    const progress = this.progress()
    const scrollPosition = intervalScale(progress, unitInterval, { start: 0, end: quotesDistance })
    if (quoteScrollingContainer.value != null) { // Prevent some errors when we switch language, maybe at other times too
      quoteScrollingContainer.value!.scrollTop = scrollPosition
    }

    lastQuoteScrollPosition = scrollPosition

    // DEBUG
    // console.log(`After onUpdate() - quote scrollPos: ${ quoteScrollingContainer.value!.scrollTop }, animationProgress: ${ progress }, height: ${ quoteScrollingContainer.value!.offsetHeight }, scrollHeight: ${ quoteScrollingContainer.value!.scrollHeight }, clientHeight: ${ quoteScrollingContainer.value!.clientHeight }`);
    
  }}, quotesStart)
  tlScroll.set(quoteContainer.value!, { visibility: 'visible' }, quotesStart )
  // tlScroll.fromTo(quoteBottom.value!, { opacity: 0 }, { opacity: 1, duration: Math.min(400, quotesDistance) }, quotesStart )

  // Fade in center color splash
  // const splashFadeShift = 300
  // const splashFadeStart = quotesStart + splashFadeShift
  // const splashFadeDuration = Math.min(500, quotesDistance - splashFadeShift)
  // tlScroll.fromTo(colorSplashCenter.value, { opacity: 0 }, { opacity: 1, duration: splashFadeDuration }, splashFadeStart)

  /* Quote Expand button fade-in */
  const quoteExpandInShift = 500
  const quoteExpandInStart = quotesStart + quoteExpandInShift
  const quoteExpandInDuration = Math.min(200, quotesDistance - quoteExpandInShift) // Should be 200, but capped so it doesn't go on until after quotesStop
  tlScroll.fromTo(quoteBottom.value!, { opacity: 0 }, { opacity: 1, duration: quoteExpandInDuration }, quoteExpandInStart)

  // Tagline fade-out
  const taglineOutShift = quotesDistanceToTagline - 50*vh()
  const taglineOutStart = quotesStart + taglineOutShift
  const taglineOutDurationTarget = taglineDistanceToOffscreen * 1.3
  const taglineOutDuration = Math.min(taglineOutDurationTarget, quotesDistance - taglineOutShift) // Should be taglineDistanceToOffscreen * 1.3, but capped so it doesn't go on until after quotesStop
  const f = taglineOutDuration/taglineOutDurationTarget
  const taglineTranslateY = `${ -(taglineDistanceToOffscreen * f) }px`
  tlScroll.fromTo(tagline.value, { opacity: 1, translateY: '0'}, { opacity: 0, translateY: taglineTranslateY, duration: taglineOutDuration, ease: 'none' }, taglineOutStart)

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

  // Signal globally
  global.introAnimationId += 1

  // Recalculate all scrollTriggers (This scrolltrigger doesn't need to be recalculcated, because it was just recreated, but all the ones further down the page need to be recalculated)
  // doAfterRender(() => {
  //   console.log(`Refresh all scrollTriggers`);
  //   $ScrollTrigger.refresh()
  // }, 1 * 1000)

  /* Update scrollTrigger
      Doesn't seem to have any effect */
  // doAfterRenderrr(() => {
  //   console.log("HHHHNGGGGG");
  //   tlScroll!.scrollTrigger?.update()
  // }, 1000)

  /* Refresh ScrollTrigger
      This seems to be unnecessary, since we create a completely new scrollTrigger. Also this leads to forcedReflow and other warnings in Chrome console. Edit: Chrome warnings now appear anyways. Idk. */
  // tlScroll!.scrollTrigger!.refresh()
}


</script>

<style scoped lang="postcss">

/* Color Splash Animations */

.color-splash-pulse1 {
  animation: splash-pulse 10s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
.color-splash-pulse2 {
  animation: splash-pulse 10s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  animation-direction: reverse;
}

.color-splash-dance1 {
  animation: splash-dance1 60s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  animation-direction: alternate;
}
.color-splash-dance2 {
  animation: splash-dance2 60s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  animation-direction: alternate;
}

@keyframes splash-dance1 {
  
  0%, 100% {
    transform: translate(0, 0);
    /* animation-timing-function: cubic-bezier(0.1, 0, 0.6, 1); */
    /* ^^^ Start faster, so visitor sees the cool effects */
  }
  20% {
    transform: translate(90%, 50%);
  }
  40% {
    transform: translate(90%, 130%);
  }
  60% {
    transform: translate(-10%, 130%);
  }
  80% {
    transform: translate(-10%, 60%);
  }
}

@keyframes splash-dance2 {

  /* Same as splash-dance1 with inverted signs */

  0%, 100% {
    transform: translate(0, 0);
    /* animation-timing-function: cubic-bezier(0.1, 0, 0.6, 1); */
    /* ^^^ Start faster, so visitor sees the cool effects */
  }
  20% {
    transform: translate(-90%, -50%);
  }
  40% {
    transform: translate(-90%, -130%);
  }
  60% {
    transform: translate(10%, -130%);
  }
  80% {
    transform: translate(10%, -60%);
  }
}

@keyframes splash-pulse {
  0%, 100% {
    opacity: 1;
    transform: translate(0px, 0px);
  }
  20% {
    opacity: 0.85;
    transform: translate(-30px, 20px);
  }
  40% {
    opacity: 0.9;
    transform: translate(0px, 50px);
  }
  60% {
    opacity: 0.8;
    transform: translate(-70px, -40px);
  }
  80% {
    opacity: 0.85;
    transform: translate(60px, -20px);
  }
}

.cool-bounce {
  animation: cool-bounce 1.75s infinite;
}

@keyframes cool-bounce {

  /* Copied from tailwind, just starting with translate 0 instead of -25%, so position doesn't jump when we start the animation */

  0%, 100% {
    transform: translateY(0);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: translateY(33%);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}


</style>