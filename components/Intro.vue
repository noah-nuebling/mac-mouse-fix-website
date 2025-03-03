<template>

  <!-- Outer container 
        Notes: 
        - Setting z negative prevents scrolling in the qutoes. Not sure why. -->

  <div ref="outerContainer" class="relative z-0 h-[calc(100vh+0rem)]">

    <!-- Initial Content -->

    <div class="flex items-center justify-center group w-[100%] h-[100svh] relative z-[-20]">

      <!-- Localization Progress -->
      <div ref="localizationProgress_Wrapper" v-if="doShowLocalizationProgress" :class="['absolute opacity-0 left-[50%] translate-x-[-50%] w-fit']" :style="{ 'top': `${ global.navbarHeight_Unexpanded }px` }">
        <div ref="localizationProgress">
          <div :class="['xs:hidden relative leading-[2em] ch-[a]:normal-link-color text-[1em] font-[400] px-[0.9em] pb-[0.75em] pt-[calc(1em+10px)] mt-[-10px] text-black/[0.7] bg-white/[1] rounded-[0.75em]']">
            
            <p class="text-center whitespace-pre-line
                        strong:mx-[0.0em] strong:bg-black/[0.05] strong:font-[600] strong:rounded-[4px] strong:px-[5px] strong:py-[1px]
                        ch-[select]:mx-[0.05em]">
            <StringF>
              {{  MFLocalizedString(
                `
                This page is {localizationProgress} translated into {currentLocale}
                To help translate, click {linkToGuide}!
                `,
                'localization-progress', 
                `
                "{localizationProgress}" will be replaced by a string like "84%". 
                "{currentLocale}" will be replaced by a language name like "🇩🇪 Deutsch" (The language names are translated programmatically). "{linkToGuide}" will be replaced by the "localization-progress.link-to-guide" string defined by translators.
                `
              ) }}
              <template #localizationProgress>
                <strong>{{ localizationProgressDisplay }}</strong>
              </template>
              <template #currentLocale>
                <LocalePicker></LocalePicker>
              </template>
              <template #linkToGuide>
                <a href="https://noah-nuebling.github.io/redirection-service?message=&target=mmf-localization-guide">
                  {{ MFLocalizedString(`here`, 'localization-progress.link-to-guide', '') }}
                </a>
              </template>
            </StringF>
            </p>
          </div>
        </div>
      </div>

      <!-- Inner content -->
      <div class="h-fit w-fit relative translate-y-[-1.5rem]">
        <div ref="innerContent" :class="['h-fit w-fit relative flex flex-col items-center justify-center -z-20', 
                                            'xs:origin-[50%_calc(50%_+_4.1rem)] sm:origin-[50%_calc(50%_+_4.925rem)] origin-[50%_calc(50%_+_5.55rem)]', false ? initialTranslateYTW : '' ]"> 
          <NuxtImg ref="mmfIcon" :src="mmfIconImagePath" sizes="225px" alt="Mac Mouse Fix Icon" :class="['xs:h-[13rem] sm:h-[15rem] h-[16.5rem] mt-[-2rem] mb-[3rem]']"/>
          <h1 ref="mmfName" :class="['fontxxx-[Helvetica] font-[700] xs:text-[3.75rem] sm:text-[4.5rem] text-[calc(5.75rem)] text-[hsl(0,0%,10%)] mb-[-1rem] tracking-[-0.01em]', false ? initialNameScaleTW : '', playLoadingAnimation && false ? 'animate-pulse' : '']">Mac Mouse Fix</h1>
          <p ref="introTagline" :style="{ fontOpticalSizing: 'none'}" :class="['xs:tracking-[0.03em] tracking-[0.05em] whitespace-nowrap w-fit text-center fontxxx-[Helvetica] xs:text-[1.0rem] text-[1.1rem] text-black mb-[2.25rem] opacity-1']">{{ MFLocalizedString(`Make Your $10 Mouse Better Than an Apple Trackpad!`, 'intro.tagline', '') }}</p>
          <DownloadButton ref="downloadButton" class="bg-blue-500 rounded-full text-white px-[0.85em] py-[0.3em] text-[1.2rem] tracking-[0.0em]"></DownloadButton>
        </div>
      </div>

      <!-- Down arrow -->
      <div ref="chevronDown_Wrapper" class="absolute left-0 right-0 bottom-0 h-fit z-[-10] opacity-0">
        <div ref="chevronDown" class="flex justify-center">
          <img :src="chevronImagePath" alt="" class="w-[2rem] m-[3rem] opacity-[0.85]"/>
        </div>
      </div>
    </div>

    <!-- Background -->

    <div ref="backgroundContainer" class="absolute w-[100vw] h-full top-[0] bottom-[0] left-[50%] translate-x-[-50%] z-[5] pointer-events-none">
      <div ref="backgroundDiv" class="absolute inset-0 top-[-30rem] -z-20 bg-[hsl(0,0%,0%)] opacity-0"></div>
    </div>

    <!-- Splash container -->
    <div class="absolute w-[100vw] h-full top-0 left-[50%] translate-x-[-50%] overflow-clip z-[10] pointer-events-none">

      <!-- Dark Center splash -->
      <!-- <div :class="['hidden absolute inset-0 color-splash-pulse1', splashDance ? '' : 'paused']">
        <div ref="colorSplashCenter" class="absolute inset-0">
          <NuxtImg :src="colorSplashDark2ImagePath" alt=""  :class="['w-[80rem] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] scale-[1.5] opacity-[0.2]']"/>
        </div>
      </div> -->

      <!-- Top-left splash (dark) -->
      <div ref="dancer1" :class="['absolute inset-0 z-10 color-splash-dance1', splashDance ? '' : 'paused']">
        <div :class="['absolute inset-0 color-splash-pulse1', splashDance ? '' : 'paused']">
          <div ref="colorSplash1" class="absolute inset-0 opacity-1 ">
            <NuxtImg :src="colorSplashDark1ImagePath" alt="" :class="['f-w-[calc((0.5*200vh)+(0.5*200*9.75px))] absolute top-[0] left-[calc(50%-0.5*1920px)]       translate-x-[calc(-50%-(-15%))] translate-y-[calc(-50%-12%)] scale-[1.1] filter brightness-[1.0] transition-[opacity] duration-[1000ms] ease-linear ', global.navbarHasDarkAppearance ? '' : 'opacity-0']"/>
          </div>
        </div>
      </div>

      <!-- Top-left splash (light) -->
      <NuxtImg :src="colorSplashImagePath" alt=""            :class="['f-w-[calc((0.5*235vh)+(0.5*235*9.75px))] absolute z-[10] top-[0] left-[calc(50%-0.5*1920px)] translate-x-[calc(-50%-(-15%))] translate-y-[calc(-50%-12%)] scale-[1.1] transition-[opacity] duration-[1000ms] ease-linear', global.navbarHasDarkAppearance ? 'opacity-0' : '']"/>

      <!-- Bottom-right splash (dark) -->
      <div ref="dancer2" :class="['absolute inset-0 z-10 color-splash-dance2', splashDance ? '' : 'paused']">
        <div :class="['absolute inset-0 color-splash-pulse2', splashDance ? '' : 'paused']">
          <div ref="colorSplash2" class="absolute inset-0 opacity-1">
            <NuxtImg :src="colorSplashDark2ImagePath" alt="" :class="['f-w-[calc((0.5*220vh)+(0.5*220*9.75px))] absolute bottom-[0] right-[calc(50%-0.5*1920px)]   translate-x-[calc(50%+(-15%))] translate-y-[calc(50%+12%)] scale-[1.1] filter brightness-[1.0] transition-[opacity] duration-[1000ms] ease-linear ', global.navbarHasDarkAppearance ? '' : 'opacity-0']"/>
          </div>
        </div>
      </div>
      <!-- Bottom-right splash (light) -->
      <NuxtImg :src="colorSplashImagePath" alt=""            :class="['f-w-[calc((0.5*185vh)+(0.5*185*9.75px))] absolute z-[10] bottom-[0] right-[calc(50%-0.5*1920px)] translate-x-[calc(50%+(-15%))] translate-y-[calc(50%+12%)] scale-[1.1] transition-[opacity] duration-[1000ms] ease-linear', global.navbarHasDarkAppearance ? 'opacity-0' : '']"/>
    </div>

    <!-- Big Tagline -->

    <div ref="taglineContainer" class="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center z-[20] pointer-events-none">
      <p ref="tagline" class="font-[500] sm:text-[1.75rem] md:text-[2.25rem] text-[2.75rem] text-center mx-[1.5rem] opacity-0 text-glow-2 text-[hsla(0,0%,100%,0.86)] par-[.safari,.firefox]:text-[hsla(0,0%,100%,0.93)]" v-html="mdrf(MFLocalizedString(`Make Your $10 Mouse Better Than an Apple Trackpad!`, 'intro.big-tagline', ''))"></p>
    </div>

    <!-- Quote cards -->

    <div ref="quoteContainer" class="invisible absolute top-0 left-0 right-0 bottom-0 w-full h-full z-30">
      
      <!-- Expand button & shadow -->
      <div ref="quoteBottom" :class="['absolute w-[100vw] left-[50%] translate-x-[-50%] bottom-0  h-[10rem] z-50 flex items-end justify-center', quotesAreExpanded ? '' : '']">
        <div class="absolute inset-0 bg-gradient-to-b from-black/0 via-black/[0.1] via-20% to-black/[0.7]"></div>
        <div ref="quoteExpandButton" class="text-[1.1rem] relative w-fit h-fit py-[0.3em] px-[0.75em] m-[2.5em] shadow-sm shadow-black/[0.0] cursor-pointer select-none z-50" @click="quotesAreExpanded = !quotesAreExpanded">
          <div class="absolute inset-0 bg-white/[0.1] backdrop-blur-[1rem] backdrop-saturate-[1.5] rounded-full border border-white/[0.2] z-10"/>
          <p class="text-[1em] text-white/[0.85] font-[500] text-center relative z-20" v-html="getExpandButtonText(quotesAreExpanded)"></p>
        </div>
      </div>

      <!-- Scrolling container -->
      <div ref="quoteScrollingContainer" class="w-full h-full overflow-hidden">

        <div class="h-[100%]"></div>

        <div ref="innerQuoteContainer" :class="['relative h-max mx-auto z-30 overflow-y-clip flex flex-col items-center pb-[7.2rem]', !quotesAreExpanded ? 'sm:max-h-[calc(200vh+2.5rem)] max-h-[calc(100vh+2.5rem)]' : 'max-h-[fit-content]']">
        
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
            <QuoteCard :text="getThankYouText()"
              :doGlow="false" class="strong:inline-block strong:text-glow-2 strong:text-white/[0.3]">
            </QuoteCard>
          </div>
          <!-- <CardHeader titleKey="user-feedback.card-header.title" :hideVideoHint="true" subtitleKey="" class="w-full"/> -->
        </div>
      </div>
    </div>
    
  </div>

</template>

<script setup lang="ts">


/* Debug */

const _i18n = useI18n()
const locale = _i18n.locale

console.debug(`Locale during Intro.vue setup: ${ locale.value }, browserLocale: ${ _i18n.getBrowserLocale() }`);

/* Import gsap stuff */

const { $gsap, $ScrollTrigger, $isMobile, $isSafari, $isFirefox, $coolI18n: { mdrf, MFLocalizedString } } = useNuxtApp();
import { linearScalingEase, customInOutEase } from "../utils/curves"

/* Manually import images 
  (Not totally sure if necessary)
*/
const mmfIconImagePath = "/mmf-icon.png"
const colorSplashImagePath = "/color-splash.png"
const colorSplashDark1ImagePath = "/color-splash-dark-1.png"
const colorSplashDark2ImagePath = "/color-splash-dark-2.png"
import chevronImagePath from "../assets/img/chevron.down@8x.png"
import speechBubbleImagePath from '../assets/img/text.bubble@8x.png'

/* Import Quote stuff */

import { getUsableQuotes, getThankYouText, getExpandButtonText } from '~/utils/quotes';
const quotes = getUsableQuotes()

/* Import Other */
import { everyNth, debouncer, watchProperty, prefersReducedMotion, remInPx, vw, vh, vmin, vmax, resetCSSAnimation, setResolution } from "~/utils/util";
const constants = useConstants()
const { currentSize, ResponsiveSize } = useResponsive()
const { onScrollStop } = useScrollCallbacks()

/* Expose methods */

defineExpose({
  killIntroAnimation, // For debug
  recreateIntroAnimation, // For debug
})

/* Get global state */

import { useGlobalStore } from "~/store/global";
const global = useGlobalStore()

/* Get localization progress */

import * as Localizable from "../locales/localizableAccess";
var localizationProgressDisplay = ref<string>(''); // String like `84%`
var doShowLocalizationProgress = computed(() => localizationProgressDisplay.value != '100%' || global.localeSwitchCount > 0); // Note: Show progress if is page is not fully translated, or user has switched locales (so the progress UI doesn't disappear while the user is using it to switch locales.) 

// Watch locale changes
watch(_i18n.locale, (newLocale: string) => {

  // Get new localizationProgress
  localizationProgressDisplay.value = Localizable.progressDisplay(newLocale)

  // Log
  console.debug(`Intro: localeSwitchCount: ${global.localeSwitchCount}, progress: ${localizationProgressDisplay.value}`)
  
}, { immediate: true })

/* Get dom element refs 
    All unused atm
*/

const outerContainer                  = ref<HTMLElement|null>(null)
const innerContent                    = ref<HTMLElement|null>(null)
const mmfIcon                         = ref<NuxtImg|null>(null)
const mmfName                         = ref<HTMLElement|null>(null)
const introTagline                    = ref<HTMLElement|null>(null)
const downloadButton                  = ref<DownloadButton|null>(null)
const localizationProgress_Wrapper    = ref<HTMLElement|null>(null)
const localizationProgress            = ref<HTMLElement|null>(null)
const chevronDown_Wrapper             = ref<HTMLElement|null>(null)
const chevronDown                     = ref<HTMLElement|null>(null)
const backgroundContainer             = ref<HTMLElement|null>(null)
const colorSplash1                    = ref<HTMLElement|null>(null)
const colorSplash2                    = ref<HTMLElement|null>(null)
const colorSplashCenter               = ref<HTMLElement|null>(null)
const dancer1                         = ref<HTMLElement|null>(null)
const dancer2                         = ref<HTMLElement|null>(null)
const backgroundDiv                   = ref<HTMLElement|null>(null)
const taglineContainer                = ref<HTMLElement|null>(null)
const tagline                         = ref<HTMLElement|null>(null)
const quoteContainer                  = ref<HTMLElement|null>(null)
const quoteBottom                     = ref<HTMLElement|null>(null)
const quoteScrollingContainer         = ref<HTMLElement|null>(null)
const innerQuoteContainer             = ref<HTMLElement|null>(null)
const quoteExpandButton               = ref<HTMLElement|null>(null)

  // Collect elements
function initalElementsExceptName() { return [findChild(mmfIcon.value, (child) => child.tagName == "IMG"), introTagline.value, downloadButton.value.rootElement] }

/* Constants */

/* All this `initial` stuff was for the loading animation and subsequent intro transition where there was a little animation once the hydration completed. But it's currently unused. TODO: Remove */
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

// console.debug(`Window dims: ${ vw() * 100 } x ${ vh() * 10095 }`)

/* Lifecycle */

var windowResizeObserver: ResizeObserver | null = null

onMounted(() => {

  /* Cleanup resize-observation */
  if (windowResizeObserver) {
    windowResizeObserver!.disconnect();
  }
})

onMounted(() => {

  /* Adjust gsap lag smoothing for better responsivity - doesn't seem to work 
      (The feature cards set this to their own value) */

  $gsap.ticker.lagSmoothing(false);

  /* Create scroll animation, then enable vertical scrolling */
  recreateIntroAnimation()
  
  /* Update scroll animation on window resize */

  const onResize = () => {

    // Recreate intro scroll animation
    // Discussion:
    // - We're only updating the animation, if the height has changed more than `yThreshold`. This is to prevent the animation from being recalculated when the address bar extends/retracts on mobile Safari. ChatGPT said that 100 should work everywhere.
    // - I just tested on an iPhone Pro Max 15 Simulator on 50% website size in landscape and 100 wasn't enough. 200 seems to work though. 

    const yThreshold = 200

    const dx = window.innerWidth - viewportSizeForCurrentAnimation.width
    const dy = window.innerHeight - viewportSizeForCurrentAnimation.height

    // console.debug(`Window size delta - dx: ${ dx }, dy: ${ dy }`); // Don't leave this on in production, it logs like 10 times in a row.

    if (Math.abs(dx) > 0 || Math.abs(dy) > yThreshold) {
      debouncedRecreateIntroAnimation()
    }

    // Correct quotes
    debouncedCorrectQuoteScrollTop()

  }; // Note: There is no need to call ScrollTrigger.refresh() here since we're killing and creating new triggers

  // Start resize-observation
  //  Notes: 
  //  - We're using `  window.addEventListener('resize', ...)` since that's called when you resize the window on the desktop.
  //  - We're using ResizeObserver() + a 50 ms debouncer for iOS:
  //    On iOS (16.7.8), when you scale the site using the a|A buttons, window.addEventListener('resize', ...) didn't seem to fire until you start scrolling, leading to janky layouts. Listening to `orientationchange` instead of `resize` doesn't help. 
  //    Had to use a 50 ms delay before invoking onResize() for the window.innerWidth/.innerHeight to be updated before onResize() is invoked. Tried requestAnimationFrame() but it didn't work it seemed.
  //    Debouncing bc why not and in case user spams the `a|A` buttons.
  const debouncedOnResize = debouncer(onResize, 50);
  windowResizeObserver = new ResizeObserver(debouncedOnResize);
  windowResizeObserver.observe(document.body, {});
  window.addEventListener('resize', debouncedOnResize);

  /* Play intro animations */

  // Stop playing loading animation (pulse animation on `Mac Mouse Fix`)
  playLoadingAnimation.value = false

  // Color splash animation
  // const tlSplash = $gsap.timeline({ paused: true })
  // var ease: any = "none"
  // var introTransitionDuration = 3.6

  // tlSplash.to(colorSplash1.value, { opacity: 1, ease: ease }, 0)
  // tlSplash.to(colorSplash2.value, { opacity: 1, ease: ease }, 0)

  // tlSplash.duration(duration)
  // doAfterRender(() => tlSplash.play(), 0.0)

  // Intro transition
  //  Edit: Removed the intro transition - Now this is just chevron + localizationProgress fade-in
  //  Note: I'm worried the localizationProgress fade-in takes away from the chevron animation a bit. But since its position is relative to the navBar height (`global.navbarHeight_Unexpanded`), 
  //    I'm not sure we can render it in the correct position before hydration, since we get the navbarHeight from the global store? Not sure. Also for languages that are 100% translated, we only display the 
  //    localizationProgress if user has switch locales already. And so at least for those langauges, we can't prerender the localizationProgress and have to make it visible after hydration. 
  //    So just implementing the fade-in for all languages is probably the easiest solution. 

  const tlIntro = $gsap.timeline({ paused: true });
  var introTransitionDuration = 1.0;

  tlIntro.fromTo(chevronDown_Wrapper.value!, { autoAlpha: 0, translateY: initialTranslateY }, { autoAlpha: 1, translateY: 0, ease: customInOutEase() }, 0)
  tlIntro.fromTo(localizationProgress_Wrapper.value!, { autoAlpha: 0 }, { autoAlpha: 1, ease: customInOutEase() /*  linearFadingEase(0) */ }, 0) // We use `_Wrapper` here to prevent interference, because we're also animating the alpha with the scrollAnimation.

  tlIntro.duration(introTransitionDuration)
  doAfterRender(() => tlIntro.play(), 0.0)

  /* Make chevron bounce after delay 
      Not totally sure if this is helpful or annoying. */

  const chevronBounceDelay = 0.5 + introTransitionDuration
  setTimeout(() => {
    if (chevronDown.value != null) {
      const c = chevronDown.value!.firstChild as HTMLElement
      c.classList.add('cool-bounce')
    }
  }, chevronBounceDelay * 1000);

 
})

/* Debug */

// setInterval(() => {
//   console.debug(`Quote scrollPos: ${ quoteScrollingContainer.value!.scrollTop }`);
// }, 500)

/* Functions */

var tlScroll: gsap.core.Timeline | null = null
var navTrigger: ScrollTrigger | null = null


const debouncedCorrectQuoteScrollTop = debouncer(correctQuoteScrollTop, 100)
const debouncedRecreateIntroAnimation = debouncer(recreateIntroAnimation, 100)

function killIntroAnimation(reset: boolean = false) {
  if (tlScroll != null) {
    tlScroll!.scrollTrigger!.kill(true, false)
    tlScroll!.pause(reset ? 0 : undefined).kill()
    tlScroll = null
    navTrigger!.kill(true, false)
  }
}

var lastQuoteScrollPosition = 0

function correctQuoteScrollTop() {

  // Set quote scrolling position
  // For some reason iOS the scrollTop of the quotesScrollingContainer after the scroll that triggers locationbar expands/unexpands. It also resets CSS animation, but that's okay.

  if (!($isMobile && $isSafari)) { return }

  onScrollStop(() => {
    if (quoteScrollingContainer.value) {
      inner()
    }
  })

  function inner(attempt: number = 1) {
    const maxAttempts = 500

    if (quoteScrollingContainer.value /* && lastQuoteScrollPosition != 0 */ && attempt <= maxAttempts) {
      if (quoteScrollingContainer.value.scrollTop === 0) {
        quoteScrollingContainer.value.scrollTop = lastQuoteScrollPosition
        console.debug(`set quote scrolling pos to last: ${ lastQuoteScrollPosition } on attempt ${ attempt }`);
      } else {
        requestAnimationFrame(() => inner(attempt + 1))
      }
    } else {
      console.debug(`Didn't correct quote scroll top after ${ attempt } attempts`);
    }
  }

}
function recreateIntroAnimation(dueToQuotes: boolean = false, previousQuotesDistance: number = 0.0) {

  // Debug
  console.debug(`Recreating intro animation`);
  console.debug(`Window width: ${ window.innerWidth }`);

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
  const s = currentSize.value
  var zoomScale = (s == ResponsiveSize.xs ? 210 : s == ResponsiveSize.sm ? 220 : 230.0) * window.innerHeight / constants.base.height

  // Notes:
  //  - This sometimes errors due to tagline.value == null. Seen it during window resize. Doesn't seem to cause problems.
  if (tagline.value == null) { return; }
  const taglineDistanceToOffscreen = tagline.value!.offsetTop + tagline.value!.offsetHeight
  const quotesDistanceToTagline = outerContainer.value!.offsetHeight/2 - tagline.value!.offsetHeight/2

  /* 
    Define length (in scroll-distance) of the main events of the animation 
  */

  var zoomDistance = 1500.0
  const taglineDistance = 1000.0 // Distance that the tagline takes to fade in
  const quotesDistance = quoteScrollingContainer.value!.scrollHeight - quoteScrollingContainer.value!.offsetHeight // Distance that the quotes are scrolling for

  // Define Offset from the start of one main event of the animation to the end of the previous main event
  var taglineShift = -(zoomDistance * 0.25) // Offset between zoomStop and taglineStart
  var quotesShift = 0.0                   // Offset between taglineStop and quotesStart

  /* Override animation params for reduceMotion */

  const useOptimizedAnimations = $isMobile && currentSize.value <= ResponsiveSize.sm // This might not be necessary anymore since our optimized zoom also works okay on mobile safari.

  if (prefersReducedMotion() || useOptimizedAnimations) {
    zoomScale = 1.15
    zoomDistance = 500
    taglineShift = -zoomDistance
    quotesShift = 350
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
    onEnter: () => { global.navbarHasDarkAppearance = true }, 
    onEnterBack: () => { global.navbarHasDarkAppearance = true }, 
    onLeave: () => { global.navbarHasDarkAppearance = false }, 
    onLeaveBack: () => { global.navbarHasDarkAppearance = false }, 
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
  //  - Caching to bitmap makes performance much better but also makes the text blurry. `will-change` is our goto way to force caching to bitmap. But I think setting perspective transform and some other stuff has the same effect.
  //  - Apple MacBook Air website has similar, scale-into-text effect but it has PERFECT performance. I don't see anything special that they are doing, so no idea why ours is so much slower. They used a matrix while gsap used simple scale transform. Even when specifically passing a matrix to gsap, it used a simple scale transform under the hood. We did our own implementation with onUpdate() and used matrix, but it wasn't faster.
  //  - When we just reduce the scaling factor a little it improves. But the Apple website uses much greater scaling factor than us without framedrops.
  //
  //  Update: We finally found a (pretty elaborate) optimzation that works
  //  - We made a setResolution() method that makes text larger, then makes the browser cache it to a bitmap at high resolution, and then scales it back down with a transform. We're `setting the resolution` several times at certain points during the zoomAnimation to achieve optimal appearance and performance.
  //  - We're using this optimization on the mmfName, but this somehow leads to the other elements of the initialContent being bitmapped as well. The become blurry as we scale them up so we're fading them out before it becomes noticable.
  //  - On Chrome, this optimization makes things a lot slower, without improving visual quality, and on Firefox it had some problems I think, so we're only activating it for Safari.

  tlScroll.addLabel("zoom")

  const zoomedElement = innerContent.value!
  const baseMatrix = `matrix( 1, 0, 0, 
                              1, 0, 0)`
  const zoomMatrix = `matrix( ${zoomScale}, 0, 0, 
                              ${zoomScale}, 0, 0)`
  const scaleEase = linearScalingEase(zoomScale)

  const resolutionAdjustedElements = [mmfName.value!/*, introTagline.value!*/]

  // doAfterRender(() => {
    // zoomedElement.style.backfaceVisibility = 'hidden'
    // mmfName.value!.style.filter = 'blur(0)'
    // mmfName.value!.style.textRendering = 'optimizeSpeed'
    // mmfName.value!.style.willChange = 'transform'
    // zoomedElement.style.transform = 'translateZ(0)'
    //   mmfName.value!.style.scale = `1`
  // }, 2*1000)

  var lastRawZoomStage = -2
  if ($isSafari && !useOptimizedAnimations) {
    // setResolution(1.0, ...resolutionAdjustedElements)
  }
  tlScroll.to({}, { onUpdate: optimizeOnUpdate((rawProgress) => {

    const scaler = (rawProgress: number) => intervalScale(scaleEase(rawProgress), unitInterval, { start: 1, end: zoomScale })
    const scale = scaler(rawProgress)

    const transform = `matrix(  ${scale}, 0, 0, ${scale}, 0, 0) ${ false ? 'perspective(1px) translateZ(0)' : '' }` // Using scale() or matrix3d() transform doesn't make it faster.
    zoomedElement.style.transform = transform

    // Firefox optimization

    if ($isFirefox) {
      setResolution(5, mmfName.value!) // Setting 2.4 and higher looks better, but setting even higher makes no difference, until it totally breaks at some point. No idea why.
    }

    // Safari optimization
    //  See above for discussion
    //  If we're using optimizied animations, we barely zoom in and this seems to slow things down

    if ($isSafari && !useOptimizedAnimations) {
      // mmfName.value!.style.textRendering = 'optimizeSpeed' //'optimizeLegibility' //'geometricPrecision' // Not sure what to set this to

      if (rawProgress <= 0.00) {
        if (lastRawZoomStage != -2) {
          unsetResolution(...resolutionAdjustedElements);
          // setResolution(1.0, ...resolutionAdjustedElements)
          // mmfName.value!.style.color = 'black'
          lastRawZoomStage = -2;
        }
      } else if (rawProgress < 0.05) {
        if (lastRawZoomStage != -1) {
          unsetResolution(...resolutionAdjustedElements);
          // setResolution(scaler(0.05), ...resolutionAdjustedElements)
          // mmfName.value!.style.color = 'black'
          lastRawZoomStage = -1;
        }
      } else if (rawProgress < 0.2) {
        if (lastRawZoomStage != 0) {
          setResolution(scaler(0.2), ...resolutionAdjustedElements);
          // mmfName.value!.style.color = 'blue'
          lastRawZoomStage = 0;
        }
      } else if (rawProgress < 0.5) {
        if (lastRawZoomStage != 1) {
          setResolution(scaler(0.5), ...resolutionAdjustedElements);
          // mmfName.value!.style.color = 'orange'
          lastRawZoomStage = 1;
        }
      } else if (rawProgress < 0.6) {
        if (lastRawZoomStage != 2) {
          setResolution(scaler(0.6), ...resolutionAdjustedElements);
          // mmfName.value!.style.color = 'yellow'
          lastRawZoomStage = 2;
        }
      } else if (rawProgress < 1.0) {
        if (lastRawZoomStage != 3) {
          setResolution(scaler(0.7), ...resolutionAdjustedElements);
          // mmfName.value!.style.color = 'green'
          lastRawZoomStage = 3;
        }
      } else if (rawProgress >= 1.0) {
        // Explanation - Why do we need this >=1.0 zoom stage that does nothing?: 
        //    The <1.0 zoom stage is entered when the user actually scrolls into the zoom animation, while the >=1.0 stage is entered immediately on page load, 
        //      if the page is loaded scrolled past the zoom animation.
        //    If we setResolution() right after page load, while scrolled past the zoomAnimation, we get janky behaviour. 
        //    I suspect the jank is because the bitmap caching of setResolution() doesn't work since we set `display: none` shortly after the end of the zoomAnimation. 
        //    (That happens in ```tlScroll.to(zoomedElement, { display: "none", duration: 0 }, bgStop);```. If we disable that, the jank goes away but that causes other problems.)
        
        lastRawZoomStage = 4; 
      }

    }
  }), duration: zoomDistance }, zoomStart)

  // Fade out to all elements of initialContent except name
  //  This is to hide blurryness in Safari which comes from bitmap caching optimizations. Somehow, caching the mmfName to bitmap causes the other initialContent elements to be cached to bitmap as well?
  if ((true || $isSafari) && !useOptimizedAnimations) {
    const dur = zoomDistance/4
    tlScroll.fromTo(downloadButton.value.rootElement, { opacity: 1 }, { opacity: 0, duration: dur }, zoomStart)
    tlScroll.fromTo(mmfIcon.value!.$el,               { opacity: 1 }, { opacity: 0, duration: dur }, zoomStart)
    tlScroll.fromTo(introTagline.value!,              { opacity: 1 }, { opacity: 0, duration: dur }, zoomStart)
  }

  // Add fade-out to chevron (+ localizationProgress)
  tlScroll.fromTo(chevronDown.value, { autoAlpha: 1 }, { autoAlpha: 0, duration: zoomDistance/20 }, zoomStart)
  tlScroll.fromTo(localizationProgress.value, { autoAlpha: 1 }, { autoAlpha: 0, duration: zoomDistance/20 }, zoomStart)

  // Add tagline fadein animation to tl
  tlScroll.fromTo(tagline.value, { autoAlpha: 0 }, { autoAlpha: 1, duration: taglineDistance }, taglineStart)

  // Fade in background, start splash dance, and reset zoom on inner content
  const bgStart = zoomStop-600 //Math.max(zoomStart, zoomStop-600)
  const bgDistance = 1000 //Math.max(1000, zoomStop - bgStart)
  const bgStop = bgStart + bgDistance
  tlScroll.fromTo(backgroundDiv.value!, { autoAlpha: 0 }, { autoAlpha: 1, duration: bgDistance }, bgStart)
  tlScroll.set({}, { onComplete: () => { splashDance.value = (!prefersReducedMotion()) }, onReverseComplete: () => { splashDance.value = false } }, bgStart-300)
  tlScroll.fromTo(zoomedElement, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0 }, bgStop)
  if (!useOptimizedAnimations) {
    // Setting the scale back to 1 here seem to slow things down, but if we don't reset the scale at some point, then the site becomes superrrr long. Maybe we should reset it at some point where there's no other heavy animations? Or set disabled rendering (by setting `display: none`) instead of resetting scale? Edit: Setting `display: none`
    //    Update: This triggers too early and looks unpolished on mobile. Dont' know why. Tried tween.set() and tween.to()
    //    Update (August 2024): I can't reproduce the issues above. Tried removing this, and I think it caused Chrome performance to tank and the move-uppp animations to break on the page when scrolling down fast. Not sure.
    tlScroll.to(zoomedElement, { display: "none", duration: 0 }, bgStop);
  }

  // Add quotes
  
  tlScroll.to({}, {onUpdate: optimizeOnUpdate((progress) => {

        const scrollPosition = intervalScale(progress, unitInterval, { start: 0, end: quotesDistance })

        if (quoteScrollingContainer.value != null) { // Prevent some errors when we switch language, maybe at other times too
          quoteScrollingContainer.value!.scrollTop = scrollPosition
          // console.debug(`Setting quote scrollPos to ${ scrollPosition }`);
        }
        lastQuoteScrollPosition = scrollPosition

  }), duration: quotesDistance }, quotesStart)

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
  tlScroll.fromTo(quoteBottom.value!, { autoAlpha: 0 }, { autoAlpha: 1, duration: quoteExpandInDuration }, quoteExpandInStart)

  // Tagline fade-out
  const taglineOutShift = quotesDistanceToTagline - 50*vh()
  const taglineOutStart = quotesStart + taglineOutShift
  const taglineOutDurationTarget = taglineDistanceToOffscreen * 1.3
  const taglineOutDuration = Math.min(taglineOutDurationTarget, quotesDistance - taglineOutShift) // Should be taglineDistanceToOffscreen * 1.3, but capped so it doesn't go on until after quotesStop
  const f = taglineOutDuration/taglineOutDurationTarget
  const taglineTranslateY = `${ -(taglineDistanceToOffscreen * f) }px`
  tlScroll.fromTo(tagline.value, { autoAlpha: 1, translateY: '0'}, { autoAlpha: 0, translateY: taglineTranslateY, duration: taglineOutDuration, ease: 'none' }, taglineOutStart)

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
    // console.debug(`RESTORING scrollTop: ${ lastQuoteScrollPosition }`)
    quoteScrollingContainer.value!.scrollTop = lastQuoteScrollPosition
  })

  // Signal globally
  requestAnimationFrame(() => { // Wait for next frame to give index.vue time to start watching this.
    console.debug(`Intro: Incrementing introAnimationId (${global.introAnimationId})`)
    global.introAnimationId += 1
  })


  // DEBUG


  console.debug(`
    zoomStart: ${            zoomStart}
    zoomStop: ${             zoomStart + zoomDistance}
    taglineStart: ${         taglineStart}
    taglineStop: ${          taglineStart + taglineDistance}
    quotesStart: ${          quotesStart}
    quotesStop: ${           quotesStart + quotesDistance}
    bgStart: ${              bgStart}
    bgStop: ${               bgStart + bgDistance}
    quoteExpandInStart: ${   quoteExpandInStart}
    quoteExpandInStop: ${    quoteExpandInStart + quoteExpandInDuration}
    taglineOutStart: ${      taglineOutStart}
    taglineOutStop: ${       taglineOutStart + taglineOutDuration}
  `)

  // Recalculate all scrollTriggers (This scrolltrigger doesn't need to be recalculcated, because it was just recreated, but all the ones further down the page need to be recalculated)
  // doAfterRender(() => {
  //   console.debug(`Refresh all scrollTriggers`);
  //   $ScrollTrigger.refresh()
  // }, 1 * 1000)

  /* Update scrollTrigger
      Doesn't seem to have any effect */
  // doAfterRenderrr(() => {
  //   console.debug("HHHHNGGGGG");
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