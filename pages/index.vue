<!-- 

  Notes:
  - On the wrapper for the "see it in action" button we had to set `min-h-[52px]` instead of h-[52px], for it to actually work. No idea why.


 -->

<template>
  <div ref="rootElement" class="strong:box-decoration-clone"> <!-- Shouldn't this global styling be in tailwind.css? -->

    <!-- Debug Stuff -->

    <!-- <div class="w-full h-[200px] bg-red-700">200px</div> -->

    <!-- Debug Buttons -->

    <div class="items-end justify-center fixed left-0 top-0 w-full h-[10rem] z-50">
      This is a work in progress. Visit <a href="https://mousefix.org" style="color:blue">mousefix.org</a>
      <div class="hidden bg-red-500 rounded-[20px] w-fit h-fit py-[0px] px-[7px] m-[20px] cursor-pointer select-none z-50" @click="$refs.intro.killIntroAnimation()">
        <p class="text-white text-center">Kill Intro</p>
      </div>
      <div class="hidden bg-green-500 rounded-[20px] w-fit h-fit py-[0px] px-[7px] m-[20px] cursor-pointer select-none z-50" @click="$refs.intro.recreateIntroAnimation()">
        <p class="text-white text-center">Reload Intro</p>
      </div>
    </div>

    <!-- Intro -->
   
    <Intro ref="intro"/>

    <!-- Post-intro --> 
    <!-- Initialize this to low opacity, to hide that scroll position changes twice - once to restore scroll position and another time after intro animation has loaded. 
            Edit: We're now delaying when the scroll position is set inside app/router.options.ts, so in most cases we don't need this. But there is one case: When we open a new tab in Chrome and then go to a hash link. In that case chrome goes to the hashlink immediately, and then a moment later, after the introAnimation as loaded, the vue router sets the proper scroll position. And if we don't hide the afterIntro content during this it looks janky Edit: In Safari on first page load the position never corrects to the proper one. Edit: By setting hashMode to false in the nuxt routerconfig, now it works I think. -->

    <div ref="afterIntro" class="opacity-[0.0]"> 

      <!-- Replaces Trackpad -->
      
      <div class="strong:text-gradient-to-l">

        <div class="relative">
          <!-- Section head -->
          <SectionHeader id="trackpad" class=" strong:gradient-blue strong:filter strong:brightness-[1.0]" title-accent-class="text-gradient-to-l gradient-blue brightness-[1.43] filter hue-rotate-[0deg]" title-key="trackpad-features.title" title-accent-key="trackpad-features.title.accent" body-key="trackpad-features.body" />
          <!-- Color splash -->
          <div class="hidden absolute top-0 bottom-0 left-[50%] translate-x-[-50%] w-[100vw]">
            <NuxtImg :src="colorSplashImagePath" alt="" class="f-w-[100rem] relative left-[-15rem] top-[75%] translate-x-[-50%] translate-y-[-50%] opacity-[0.7] filter hue-rotate-[0deg]"/>
          </div>
        </div>

        <CardContainer title-key="trackpad-features.header" class="gradient-blue strong:filter ch-[.card-title_strong]:brightness-[1.15]" title-class="strong:filter strong:brightness-[1.2] strong:hue-rotate-[0deg]" disclaimer-key="trackpad-features.disclaimer">

          <div class="w-full flex justify-center">
            <div class="relative flex flex-col items-center w-fit">
              <div class="absolute inset-0 -z-10 pointer-events-none">
                <NuxtImg :src="colorSplashImagePath" ref="trackpadSplash1" alt="" class="f-w-[110rem] absolute left-[75%] top-[25%] translate-x-[-50%] translate-y-[-50%] opacity-[0.8]"/>
                <NuxtImg :src="colorSplashImagePath" ref="trackpadSplash2" alt="" class="f-w-[110rem] absolute left-[25%] top-[75%] translate-x-[-50%] translate-y-[-50%] opacity-[0.8]"/>
              </div>

              <!-- <hr ref="trackpadRule" class="mb-[2.25rem] mx-[12px] border-neutral-950/[0.066]"> -->
              <div ref="trackpadCardsSection1" class="grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-[2.5rem] relative z-[10]">
                <NormalFeatureCard titleKey="feature.lookup.title"              bodyKey="feature.lookup.body"           :videoPath="remapDemoVideoPath"       class="w-fit"/>
                <NormalFeatureCard titleKey="feature.mission-control.title"     bodyKey="feature.mission-control.body"  :videoPath="remapDemoVideoPath"       class="w-fit"/>
                <NormalFeatureCard titleKey="feature.spaces.title"              bodyKey="feature.spaces.body"           :videoPath="remapDemoVideoPath"       class="w-fit"/>
                <NormalFeatureCard titleKey="feature.app-expose.title"          bodyKey="feature.app-expose.body"       :videoPath="remapDemoVideoPath"       class="w-fit"/>
                <NormalFeatureCard titleKey="feature.show-desktop.title"        bodyKey="feature.show-desktop.body"     :videoPath="remapDemoVideoPath"       class="w-fit"/>
                <NormalFeatureCard titleKey="feature.launchpad.title"           bodyKey="feature.launchpad.body"        :videoPath="remapDemoVideoPath"       class="w-fit"/>
              </div>

              <div class="w-full">
                <hr ref="trackpadRule" class="my-[2.25rem] mx-[2.5rem] border-t-[1px] border-neutral-950/[0.05]">
              </div>

              <div ref="trackpadCardsSection2" class="grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-[2.5rem] relative z-[9]">
                <NormalFeatureCard titleKey="feature.zoom.title"                bodyKey="feature.zoom.body"             :videoPath="remapDemoVideoPath"       class=""/>
                <NormalFeatureCard titleKey="feature.pages.title"               bodyKey="feature.pages.body"            :videoPath="remapDemoVideoPath"       class=""/>
                <NormalFeatureCard titleKey="feature.mail-actions.title"        bodyKey="feature.mail-actions.body"     :videoPath="remapDemoVideoPath"       class=""/>
                <NormalFeatureCard titleKey="feature.free-scroll.title"         bodyKey="feature.free-scroll.body"      :videoPath="remapDemoVideoPath"       class=""/>
                <NormalFeatureCard titleKey="feature.smart-zoom.title"          bodyKey="feature.smart-zoom.body"       :videoPath="remapDemoVideoPath"       class=""/>
              </div>
            </div>
          </div>
        </CardContainer>
      </div>

      <!-- Scrolling -->
      <div class="strong:text-gradient-to-l">
        <SectionHeader id="scroll" class="gradient-violet" title-accent-class="text-gradient-to-l filter brightness-[1.06]" title-key="scrolling.title" title-accent-key="scrolling.title.accent" body-key="scrolling.body" />
        
        <CardContainer title-key="scroll-smoothness.header" class="gradient-violet var-[accent-rotate=30deg] strong:filter ch-[.card-sm_strong]:brightness-[0.93] mb-[5rem]">
          <div class="w-fit relative left-[50%] translate-x-[-50%]">
            <div class="absolute inset-0 -z-10 pointer-events-none">
              <NuxtImg :src="colorSplashImagePath" alt="" class="f-w-[130rem] f-h-[70rem] absolute left-[25%] top-[40%] translate-x-[-50%] translate-y-[-50%] opacity-[0.6] filter hue-rotate-[60deg]"/>
            </div>
            <div ref="scrollingCardsSection1" class="grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-[2.5rem] pb-[4.5rem] my-[0] w-fit">
              <NormalFeatureCard titleKey="scroll-smoothness.high.title"           bodyKey="scroll-smoothness.high.body"        :videoPath="remapDemoVideoPath"       title-class="" class=""/>
              <NormalFeatureCard titleKey="scroll-smoothness.regular.title"        bodyKey="scroll-smoothness.regular.body"     :videoPath="remapDemoVideoPath"       title-class="" class=""/>
              <NormalFeatureCard titleKey="scroll-smoothness.off.title"            bodyKey="scroll-smoothness.off.body"         :videoPath="remapDemoVideoPath"       title-class="" class=""/>
            </div>
          </div>
        </CardContainer>
      
        <CardContainer title-key="scroll-feature.header"    class="gradient-violet var-[accent-rotate=30deg] strong:filter ch-[.card-sm_strong]:brightness-[0.93] ">
          <div class="w-fit relative left-[50%] translate-x-[-50%]">
            <div class="absolute inset-0 -z-10 pointer-events-none">
              <NuxtImg :src="colorSplashImagePath" alt="" class="f-w-[130rem] f-h-[70rem] scale-[1] absolute left-[66%] top-[66%] translate-x-[-50%] translate-y-[-50%] opacity-[0.6] filter hue-rotate-[60deg]"/>
            </div>
            <div ref="scrollingCardsSection2" class="grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-[2.5rem] pb-[4.5rem] my-[0] w-fit">
              <NormalFeatureCard titleKey="scroll-feature.reverse.title"        bodyKey="scroll-feature.reverse.body"            class=""/>
              <NormalFeatureCard titleKey="scroll-feature.modifiers.title"      bodyKey="scroll-feature.modifiers.body"          class=""/>
              <NormalFeatureCard titleKey="scroll-feature.configurable.title"   bodyKey="scroll-feature.configurable.body"       class=""/>
            </div>
          </div>
        </CardContainer>
      </div>


      <!-- Action Table 
            Notes:
            - Thought about including a non-trackpad features section - but not enough features so far to warrant a whole section -->

      <div class="strong:text-gradient-to-l">
        <SectionHeader id="action_table" class="gradient-red strong:filter strong:brightness-[1.0]" title-accent-class="italic" title-accent2-class="text-gradient-to-l filter brightness-[1.12] hue-rotate-[-0deg]" title-key="remap-engine.title" title-accent-key="remap-engine.title.accent" title-accent2-key="remap-engine.title.accent2" body-key="remap-engine.body" />

        <CardContainer class="gradient-red var-[accent-rotate=170deg] ch-[.card-title_strong]:brightness-[1.0] strong:brightness-[0.95]">
          <div class="relative">
            <div class="relative max-w-[70rem] left-[50%] translate-x-[-50%]">
              <div class="absolute inset-0 -z-10 pointer-events-none">
                  <NuxtImg :src="colorSplashImagePath" alt="" class="f-w-[100rem] f-h-[80rem] absolute left-[75%] top-[25%] translate-x-[-50%] translate-y-[-50%] opacity-[0.9] filter hue-rotate-[120deg]"/>
                  <NuxtImg :src="colorSplashImagePath" alt="" class="f-w-[100rem] f-h-[80rem] absolute left-[25%] top-[75%] translate-x-[-50%] translate-y-[-50%] opacity-[0.9] filter hue-rotate-[120deg]"/>
              </div>
              <div ref="actionTableCardsSection" class="flex flex-col items-center gap-[5rem] py-[4.5rem]">
                <NormalFeatureCard titleKey="customization-feature.action-table.title" bodyKey="customization-feature.action-table.body" :videoPath="remapDemoVideoPath"              title-class="!font-[600]" class="w-full"        content-class="par-[.isNotExpanded]:max-w-[50rem]" :image-path="actionTableImagePath" image-scaling-sizes="" image-class="w-[205%] sm:mt-[1rem] mt-[2rem] mr-[calc(-107%)] mb-[-35%] translate-x-[0rem]"/>
                <NormalFeatureCard titleKey="customization-feature.keyboard-shortcuts.title" bodyKey="customization-feature.keyboard-shortcuts.body" :videoPath="remapDemoVideoPath"  title-class="!font-[600]" class="w-full" expand-button-key="customization-feature.keyboard-shortcuts.expand-button"/>
              </div>
            </div>
          </div>
        </CardContainer>
      </div>

      <!-- Price / Good Software -->

      <div class="strong:text-gradient-to-l ch-[a]:text-blue-500">
        <SectionHeader id="price" class="gradient-green strong:filter strong:brightness-[1.15]" title-accent2-class="text-gradient-to-l gradient-green filter brightness-[1.35]" title-key="good-software.title" title-accent2-key="good-software.title.accent2" body-key="good-software.body" />
        
        <CardContainer title-key="good-software.header" 
          class="gradient-green var-[accent-rotate=360deg] strong:filter ch-[.card-title_strong]:brightness-[1.2] ch-[.feature-card]:bg-neutral-50/[0.8] "             title-class=" strong:filter strong:brightness-[1.2]">

          <div class="flex justify-center w-fit relative left-[50%] translate-x-[-50%]">
            <div class="absolute inset-0 -z-10 pointer-events-none">
              <NuxtImg :src="colorSplashImagePath" alt="" class="f-h-[50rem] f-w-[100rem] absolute left-[33%] top-[33%] translate-x-[-50%] translate-y-[-50%] opacity-[0.8] filter invert hue-rotate-[125deg]"/>
            </div>
            <div ref="priceCardsSection1" class=" grid grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-[2.5rem] pb-[4.5rem] relative">
              <NormalFeatureCard titleKey="unobtrusive-lightweight.title"          bodyKey="unobtrusive-lightweight.body"     class=""/>
              <NormalFeatureCard titleKey="open-source.title"                      bodyKey="open-source.body"                 class=""/>
            </div>
          </div>
        </CardContainer>

        <CardContainer  title-key="price.header" disclaimer-key="price.disclaimer" :disclaimer-values="dynamicUIStrings"
          class="gradient-green var-[accent-rotate=360deg] strong:filter ch-[.card-title_strong]:brightness-[1.2] ch-[.feature-card]:bg-neutral-50/[0.8] mt-[5rem]"   title-class="strong:filter strong:brightness-[1.2]">

          <div class="flex justify-center w-fit relative left-[50%] translate-x-[-50%]">
            <div class="absolute inset-0 -z-10 pointer-events-none">
                <NuxtImg :src="colorSplashImagePath" alt="" class="f-w-[150rem] f-h-[75rem] absolute left-[75%] top-[66%] translate-x-[-50%] translate-y-[-50%] opacity-[0.8] filter invert hue-rotate-[125deg]"/>
            </div>
            <div ref="priceCardsSection2" class="grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-[2.5rem] pb-[4.5rem]">
              <NormalFeatureCard titleKey="free-days.title"       bodyKey="free-days.body"        :dynamic="dynamicUIStrings" class=""/>
              <NormalFeatureCard titleKey="price.title"           bodyKey="price.body"            :dynamic="dynamicUIStrings" class=""/>
              <NormalFeatureCard titleKey="alternatives.title"    bodyKey="alternatives.body"     :dynamic="dynamicUIStrings" class=""/>
              <div class="hidden sm:col-span-1 md:col-span-2 col-span-3 w-full flex justify-center">
                <!-- Download counter was here -->
              </div> 
            </div>
          </div>
        </CardContainer>
      </div>

    </div>

<!-- 'alternatives.mx-master-rant'
'pay-reason.pity'
'pay-reason.open-source-indie' -->


  </div>
</template>

<script setup lang="ts">

import { roundTo } from "~/utils/util"
import licenseConfig from "~/assets/licenseinfo/config.json"


const MXMasterPrice = 99.99 // Update this when you change the listed products

const price = licenseConfig["price"] / 100
const trialDays = licenseConfig["trialDays"]
const priceFactor = Math.round(MXMasterPrice / price)
const taxEstimateLow = 0.05
const taxEstimateHigh = 0.25
const afterTaxPriceEstimateLow = roundTo(price * (1 + taxEstimateLow), 0.01, 2)
const afterTaxPriceEstimateHigh = roundTo(price * (1 + taxEstimateHigh), 0.01, 2)

const dynamicUIStrings = {
  price: price,
  trialDays: trialDays,
  priceFactor: priceFactor,
  taxEstimateLow: taxEstimateLow*100,
  taxEstimateHigh: taxEstimateHigh*100,
  afterTaxPriceEstimateLow: afterTaxPriceEstimateLow,
  afterTaxPriceEstimateHigh: afterTaxPriceEstimateHigh,
}

console.log(`licenseConfig: ${ licenseConfig }`)

/* Import plugin stuff */

// const { md } = useNuxtApp()

/* Import i18n stuff
    Note: Why can't we use $i18n in ts like we do in html? */

const { setLocale, locale, defaultLocale } = useI18n() 
const $mt = useMT()
// import { $mt } from '~/utils/markdownTranslate'

/* Import gsap stuff */
const { $gsap, $ScrollTrigger } = useNuxtApp()

/* Import quote stuff */

import { getUsableQuotes } from "../utils/quotes"
const quotes = getUsableQuotes()

/* Import other stuff */

import { everyNth } from '~/utils/util';
import { type Ref } from 'vue'
import { linearFadingEase } from '~/utils/curves'

/* Manually import video assets
    Notes on manually importing assets:
    - We're manually importing the assets, because we need to store them in vars and pass them to children. When using a plaintext URL instead of a variable for the img tag's src, then nuxt seems to import that automatially. 
      - According to https://stackoverflow.com/a/75012154, we also don't need to manually import images for <NuxtImg>, but I haven't tested that so far.
    - I feel like this is way too cumbersome. oad We know in advance which videos to import anyways (so we don't need 'dynamic' imports which should make it even easier) so why do we have to manually import in code? It should automatically import the static assets we use.
    Also See: https://stackoverflow.com/questions/75218697/nuxt-dynamic-image-require-is-not-defined
*/
import remapDemoVideoPath from '../assets/video/remap_demo_old.mp4'

/* Manually import image assets */

const actionTableImagePath = '/mmf-on-studio-display-5.png'
const colorSplashImagePath = '/color-splash.png'

/* Get global store */
import { useGlobalStore } from '~/store/global';
import { storeToRefs } from 'pinia';
const global = useGlobalStore()
const { introAnimationId } = storeToRefs(global)

/* Get refs */

const rootElement = ref<HTMLElement | null>(null)

const afterIntro = ref<HTMLElement | null>(null)

const trackpadCardsSection1 = ref<HTMLDivElement | null>(null)
const trackpadCardsSection2 = ref<HTMLDivElement | null>(null)
const trackpadSplash1 = ref<HTMLElement | null>(null)
const trackpadSplash2 = ref<HTMLElement | null>(null)
const trackpadRule = ref<HTMLElement | null>(null)

const scrollingCardsSection1 = ref<HTMLElement | null>(null)
const scrollingCardsSection2 = ref<HTMLElement | null>(null)
const actionTableCardsSection = ref<HTMLElement | null>(null)
const priceCardsSection1 = ref<HTMLElement | null>(null)
const priceCardsSection2 = ref<HTMLElement | null>(null)

/* Other vars */
const sectionToTimelineMap = new Map<Ref<HTMLElement | null>, gsap.core.Timeline>()
var fadeTimelines: Array<gsap.core.Timeline> = []
var parallaxElements = [trackpadCardsSection1, trackpadCardsSection2, scrollingCardsSection1, scrollingCardsSection2, actionTableCardsSection, priceCardsSection1, priceCardsSection2]


onMounted(() => {

  // Add parallaxElements
  //  Currently unused
  //  Not sure this is the best place to put this
  for (const element of Array.from(document.getElementsByClassName('parallax'))) {
    parallaxElements.push(ref(element as HTMLElement)) 
  } 

  watch(introAnimationId, (newValue) => {

    console.log(`Intro is ready: ${ newValue }`)

    if (newValue == 0) { return }

    afterIntro.value!.style.opacity = '1.0'

    document.documentElement.style.overflowY = 'scroll'

    if (false /* newValue > 1 */) {
      // Refresh scrollTriggers
      // Discussion: In theory, we only have to refresh the scroll triggers when the intro animation updates (and changes height), but when we tried to refresh the scrollTriggers there was always a flicker or it didn't work at all. We tried doAfterRender() doBeforeRender() and gsap.ticker.add(..., true, false). So instead we're just completely recreating the animations every time now. That prevents the flicker. 
      //              -> Update! maybe setting invalidateOnRefresh on the scrollTriggers would prevent us from having to recreate the animations everytime
      $gsap.ticker.add(() => {
        for (const section of parallaxElements) {
          const tl = sectionToTimelineMap.get(section)
          if (tl != null) {
            tl.scrollTrigger!.refresh()
          }
        }
      }, true, false)
      return
    }

    /* Delete existing animations */

    for (const section of parallaxElements) {
      const tl = sectionToTimelineMap.get(section)
      if (tl != null) {
        killScrollTriggerAnimation(tl)
        sectionToTimelineMap.delete(section) // Not sure if necessary
      }
    }
    while (true) {
      if (fadeTimelines.length == 0) { break }
      const tl = fadeTimelines.pop()
      killScrollTriggerAnimation(tl)
    }

    /* Respect reduce motion */
    if (prefersReducedMotion()) { return }

    /* Create scroll-linked parallax animations for parallaxElements */
    
    const parallaxOffset = '4rem'

    for (const section of parallaxElements) {

      const tlTrack = $gsap.timeline({ scrollTrigger: {
        trigger: section.value!,
        pin: false,
        start: "top bottom", // Top of element, bottom of viewport
        end: `bottom top`,
        scrub: 0.0, // Smooth scrubbing, takes x second to "catch up" to the scrollbar
        markers: false, // Debug
      }})

      tlTrack.fromTo(section.value!,  { translateY: parallaxOffset }, { translateY: '-' + parallaxOffset, duration: 1, ease: 'linear' }, 0)

      sectionToTimelineMap.set(section, tlTrack)
    }

    /* Create fade-in animations for titles and bodys */

    const toFade: Array<HTMLElement> = []
    const classes = ['fadeee']
    for (const c of classes) {
      const elements = rootElement.value!.getElementsByClassName(c)
      for (const element of elements) {
        toFade.push(element as HTMLElement)
      }
    }
    
    for (const element of toFade) {

      const tlFade = $gsap.timeline({ scrollTrigger: {
        trigger: element,
        pin: false,
        start: "bottom 95%",
        end: "bottom 10%",
        scrub: false,
        toggleActions: 'play none none reverse',
        markers: false,
      }})

      tlFade.fromTo(element, { translateY: "0rem", opacity: '0' }, { translateY: '0rem', opacity: '1', duration: 0.33, ease: linearFadingEase(0) }, 0)

      fadeTimelines.push(tlFade)
    }

  })
})

function killScrollTriggerAnimation(tl: gsap.core.Timeline | undefined | null, reset: boolean = false) {

  // Mostly copied from Intro.vue

  if (tl != null) {
    tl!.scrollTrigger!.kill(true, false)
    tl!.pause(reset ? 0 : undefined).kill()
    tl = null // Not sure if setting to null like this works
  }
}

</script>

<style lang="postcss" scoped>

html {
 
}

</style>