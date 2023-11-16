<!-- 

  Notes:
  - On the wrapper for the "see it in action" button we had to set `min-h-[52px]` instead of h-[52px], for it to actually work. No idea why.


 -->

<template>
  <div>

    <!-- Debug Stuff -->

    <!-- <div class="w-full h-[200px] bg-red-700">200px</div> -->

    <!-- Debug Buttons -->

    <div class="items-end justify-center fixed left-0 top-0 w-full h-[10rem] z-50">
      <div class="bg-red-500 rounded-[20px] w-fit h-fit py-[0px] px-[7px] m-[20px] cursor-pointer select-none z-50" @click="$refs.intro.killIntroAnimation()">
        <p class="text-white text-center">Kill Intro</p>
      </div>
      <div class="bg-green-500 rounded-[20px] w-fit h-fit py-[0px] px-[7px] m-[20px] cursor-pointer select-none z-50" @click="$refs.intro.recreateIntroAnimation()">
        <p class="text-white text-center">Reload Intro</p>
      </div>
    </div>

    <!-- Intro -->
   
    <Intro ref="intro"/>

    <!-- Replaces Trackpad -->

    <div class="relative">
      <!-- Section head -->
      <SectionHeader class="strong:gradient-blue strong:filter strong:brightness-[1.1]" title-accent-class="text-gradient-to-l gradient-blue brightness-[1.43] filter hue-rotate-[0deg]" title-key="trackpad-features.title" title-accent-key="trackpad-features.title.accent" body-key="trackpad-features.body" />
      <!-- Color splash -->
      <div class="hidden absolute top-0 bottom-0 left-[50%] translate-x-[-50%] w-[100vw]">
        <img :src="colorSplashImagePath" alt="" class="f-w-[100rem] relative left-[-15rem] top-[75%] translate-x-[-50%] translate-y-[-50%] opacity-[0.7] filter hue-rotate-[0deg]">
      </div>
    </div>

    <CardContainer title-key="trackpad-features.header" class="gradient-blue ch-[.card-title_strong]:filter ch-[.card-title_strong]:brightness-[1.25]" title-class="strong:filter strong:brightness-[1.25]">

      <div class="w-full flex justify-center">
        <div class="relative flex flex-col items-center w-fit">
          <div class="absolute inset-0 -z-10 pointer-events-none">
            <img ref="trackpadSplash1" :src="colorSplashImagePath" alt="" class="f-w-[110rem] absolute left-[75%] top-[25%] translate-x-[-50%] translate-y-[-50%] opacity-[0.8]">
            <img ref="trackpadSplash2" :src="colorSplashImagePath" alt="" class="f-w-[110rem] absolute left-[25%] top-[75%] translate-x-[-50%] translate-y-[-50%] opacity-[0.8]">
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
            <hr ref="trackpadRule" class="my-[2.25rem] mx-[2.5rem] border-t-[1px] border-neutral-950/[0.066]">
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
      <div class="max-w-[calc(100%-0rem)] relative left-[50%] translate-x-[-50%] sm:px-[1rem] px-[5rem] pt-[calc(5.5rem-0.5rem)] pb-[5.5rem]">
        <p v-html="$mt('trackpad-features.disclaimer')" class="text-[1.0rem] text-center text-neutral-900/[0.7] whitespace-pre-line"></p>
      </div>

    </CardContainer>

    <!-- Scrolling -->

    <SectionHeader class="gradient-violet" title-accent-class="text-gradient-to-l filter brightness-[1.06]" title-key="scrolling.title" title-accent-key="scrolling.title.accent" body-key="scrolling.body" />
    
    <CardContainer title-key="scroll-smoothness.header" class="mb-[10rem] strong:filter gradient-violet ch-[.card-sm]:brightness-[0.93]">
      <div class="w-fit relative left-[50%] translate-x-[-50%]">
        <div class="absolute inset-0 -z-10 pointer-events-none">
          <img :src="colorSplashImagePath" alt="" class="f-w-[120rem] f-h-[70rem] absolute left-[33%] top-[66%] translate-x-[-50%] translate-y-[-50%] opacity-[0.6] filter hue-rotate-[60deg]">
        </div>
        <div ref="scrollingCardsSection1" class="grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-[2.5rem] pb-[4.5rem] my-[0] w-fit">
          <NormalFeatureCard titleKey="scroll-smoothness.high.title"           bodyKey="scroll-smoothness.high.body"        :videoPath="remapDemoVideoPath"       title-class="" class=""/>
          <NormalFeatureCard titleKey="scroll-smoothness.regular.title"        bodyKey="scroll-smoothness.regular.body"     :videoPath="remapDemoVideoPath"       title-class="" class=""/>
          <NormalFeatureCard titleKey="scroll-smoothness.off.title"            bodyKey="scroll-smoothness.off.body"         :videoPath="remapDemoVideoPath"       title-class="" class=""/>
        </div>
      </div>
    </CardContainer>
  
    <CardContainer title-key="scroll-feature.header" class="gradient-violet">
      <div class="w-fit relative left-[50%] translate-x-[-50%]">
        <div class="absolute inset-0 -z-10 pointer-events-none">
          <img :src="colorSplashImagePath" alt="" class="f-w-[130rem] f-h-[70rem] scale-[1] absolute left-[75%] top-[40%] translate-x-[-50%] translate-y-[-50%] opacity-[0.6] filter hue-rotate-[60deg]">
        </div>
        <div ref="scrollingCardsSection2" class="grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-[2.5rem] pb-[4.5rem] my-[0] w-fit">
          <NormalFeatureCard titleKey="scroll-feature.reverse.title"        bodyKey="scroll-feature.reverse.body"            class=""/>
          <NormalFeatureCard titleKey="scroll-feature.modifiers.title"      bodyKey="scroll-feature.modifiers.body"          class=""/>
          <NormalFeatureCard titleKey="scroll-feature.configurable.title"   bodyKey="scroll-feature.configurable.body"       class=""/>
        </div>
      </div>
    </CardContainer>


    <!-- Action Table 
          Notes:
          - Thought about including a non-trackpad features section - but not enough features so far to warrant a whole section -->

    <SectionHeader class="gradient-red strong:filter strong:brightness-[1.0]" title-accent-class="italic" title-accent2-class="text-gradient-to-l filter brightness-[1.12] hue-rotate-[-0deg]" title-key="remap-engine.title" title-accent-key="remap-engine.title.accent" title-accent2-key="remap-engine.title.accent2" body-key="remap-engine.body" />

    <CardContainer class="gradient-red ch-[.card-title_strong]:brightness-[1.0] strong:brightness-[0.95]">
      <div class="flex justify-center">
        <div class="w-fit relative">
          <div class="absolute inset-0 -z-10 pointer-events-none">
              <img :src="colorSplashImagePath" alt="" class="f-w-[100rem] f-h-[80rem] absolute left-[75%] top-[25%] translate-x-[-50%] translate-y-[-50%] opacity-[0.9] filter hue-rotate-[120deg]">
              <img :src="colorSplashImagePath" alt="" class="f-w-[100rem] f-h-[80rem] absolute left-[25%] top-[75%] translate-x-[-50%] translate-y-[-50%] opacity-[0.9] filter hue-rotate-[120deg]">
          </div>
          <div ref="actionTableCardsSection" class="max-w-[1000px] flex flex-col items-center gap-[2.5rem] w-fit py-[4.5rem]">
            <NormalFeatureCard titleKey="customization-feature.action-table.title" bodyKey="customization-feature.action-table.body" :videoPath="remapDemoVideoPath"              title-class="!font-[600]" class="" backgroundFilterClass="backdrop-blur-2xl" :image-path="actionTableImagePath" image-class="mx-[-10rem] w-[80rem] mt-1 mb-[-245px] translate-x-[20rem]"/>
            <NormalFeatureCard titleKey="customization-feature.keyboard-shortcuts.title" bodyKey="customization-feature.keyboard-shortcuts.body" :videoPath="remapDemoVideoPath"  title-class="!font-[600]" class="w-full" backgroundFilterClass="backdrop-blur-2xl" expand-button-key="customization-feature.keyboard-shortcuts.expand-button"/>
          </div>
        </div>
      </div>
    </CardContainer>

    <!-- Price / Good Software -->

    <SectionHeader class="gradient-green strong:filter strong:brightness-[1.15]" title-accent2-class="text-gradient-to-l gradient-green filter brightness-[1.35]" title-key="good-software.title" title-accent2-key="good-software.title.accent2" body-key="good-software.body" />
    
    <CardContainer title-key="good-software.header" 
      class="gradient-green strong:filter ch-[.card-title_strong]:brightness-[1.2]"             title-class=" strong:filter strong:brightness-[1.2]">

      <div class="flex justify-center w-fit relative left-[50%] translate-x-[-50%]">
        <div class="absolute inset-0 -z-10 pointer-events-none">
          <img :src="colorSplashImagePath" alt="" class="f-h-[50rem] f-w-[100rem] absolute left-[33%] top-[33%] translate-x-[-50%] translate-y-[-50%] opacity-[0.8] filter invert hue-rotate-[125deg]">
        </div>
        <div ref="priceCardsSection1" class=" grid grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-[2.5rem] pb-[4.5rem] relative">
          <NormalFeatureCard titleKey="unobtrusive-lightweight.title"          bodyKey="unobtrusive-lightweight.body"     class=""/>
          <NormalFeatureCard titleKey="open-source.title"                      bodyKey="open-source.body"                 class=""/>
        </div>
      </div>
    </CardContainer>

    <CardContainer  title-key="price.header"        
      class="gradient-green strong:filter ch-[.card-title_strong]:brightness-[1.2] mt-[5rem]"   title-class=" strong:filter strong:brightness-[1.2]">

      <div class="flex justify-center w-fit relative left-[50%] translate-x-[-50%]">
        <div class="absolute inset-0 -z-10 pointer-events-none">
            <img :src="colorSplashImagePath" alt="" class="f-w-[150rem] f-h-[75rem] absolute left-[75%] top-[66%] translate-x-[-50%] translate-y-[-50%] opacity-[0.8] filter invert hue-rotate-[125deg]">
        </div>
        <div ref="priceCardsSection2" class="grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-[2.5rem] pb-[4.5rem]">
          <NormalFeatureCard titleKey="free-days.title"      bodyKey="free-days.body"       class=""/>
          <NormalFeatureCard titleKey="price.title"          bodyKey="price.body"           class=""/>
          <NormalFeatureCard titleKey="alternatives.title"   bodyKey="alternatives.body"    class=""/>
        </div>
      </div>
    </CardContainer>

<!-- 'alternatives.mx-master-rant'
'pay-reason.pity'
'pay-reason.open-source-indie' -->


  </div>
</template>

<script setup lang="ts">

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

/* Manually import video assets
    Note I feel like this is way too cumbersome. We know in advance which videos to import anyways (so we don't need 'dynamic' imports which should make it even easier) so why do we have to manually import in code? It should automatically import the static assets we use.
    Also See: https://stackoverflow.com/questions/75218697/nuxt-dynamic-image-require-is-not-defined
*/
import remapDemoVideoPath from '../assets/video/remap_demo_old.mp4'

/* Manually import image assets */

import trackpadImagePath from '../assets/img/rectangle.and.hand.point.up.left.filled@8x.png'
import sparkleArrowsImagePath from '../assets/img/arrow.up.and.down.and.sparkles@8x.png'
// import gearArrowsImagePath from '../assets/img/arrow.gear.png'
// import arrowsInGearImagePath from '../assets/img/arrow.in.gear.png'
import arrowsImagePath from '../assets/img/arrow.up.and.down@8x.png'
import gearImagePath from '../assets/img/gearshape@8x.png'
import actionTableImagePath from '../assets/img/mmf-on-studio-display-4.png'
import colorSplashImagePath from '../assets/img/color-splash.png'

/* Get global store */
import { useGlobalStore } from '~/store/global';
import { storeToRefs } from 'pinia';
const global = useGlobalStore()
const { introAnimationId } = storeToRefs(global)

/* Get refs */

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
const cardsSections = [trackpadCardsSection1, trackpadCardsSection2, scrollingCardsSection1, scrollingCardsSection2, actionTableCardsSection, priceCardsSection1, priceCardsSection2]

onMounted(() => {

  watch(introAnimationId, (newValue) => {

    console.log(`Intro is ready: ${ newValue }`)

    if (newValue == 0) { return }

    if (false /* newValue > 1 */) {
      // Refresh scrollTriggers
      // Discussion: In theory, we only have to refresh the scroll triggers when the intro animation updates (and changes height), but when we tried to refresh the scrollTriggers there was always a flicker or it didn't work at all. We tried doAfterRender() doBeforeRender() and gsap.ticker.add(..., true, false). So instead we're just completely recreating the animations every time now. That prevents the flicker. 
      $gsap.ticker.add(() => {
        for (const section of cardsSections) {
          const tl = sectionToTimelineMap.get(section)
          if (tl != null) {
            tl.scrollTrigger!.refresh()
          }
        }
      }, true, false)
      return
    }

    /* Delete existing animations */

    for (const section of cardsSections) {
      const tl = sectionToTimelineMap.get(section)
      if (tl != null) {
        killCardParallaxAnimation(tl)
        sectionToTimelineMap.delete(section) // Not sure if necessary
      }
    }

    /* Respect reduce motion */
    if (prefersReducedMotion()) { return }

    /* Create scroll-linked parallax animations for cardsSections */
    
    const cardsOffset = '4rem'

    for (const section of cardsSections) {

      const tlTrack = $gsap.timeline({scrollTrigger: {
        trigger: section.value!,
        pin: false,
        start: "top bottom", // Top of element, bottom of viewport
        end: `bottom top`,
        scrub: 0.0, // Smooth scrubbing, takes x second to "catch up" to the scrollbar
        markers: false, // Debug
      }})

      tlTrack.fromTo(section.value!,  { translateY: cardsOffset }, { translateY: '-' + cardsOffset, duration: 1, ease: 'linear' }, 0)

      sectionToTimelineMap.set(section, tlTrack)
    }
  })
})

function killCardParallaxAnimation(tl: gsap.core.Timeline | undefined | null, reset: boolean = false) {

  // Mostly copied from Intro.vue

  if (tl != null) {
    tl!.scrollTrigger!.kill(true, false)
    tl!.pause(reset ? 0 : undefined).kill()
    tl = null // Not sure if setting to null like this works
  }
}

</script>

<style lang="postcss" scoped>

</style>