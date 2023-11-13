<!-- 

  Notes:
  - On the wrapper for the "see it in action" button we had to set `min-h-[52px]` instead of h-[52px], for it to actually work. No idea why.


 -->

<template>
  <div>

    <!-- Debug Stuff -->

    <!-- <div class="w-full h-[200px] bg-red-700">200px</div> -->

    <!-- Debug Buttons -->

    <div class="hidden items-end justify-center fixed left-0 top-0 w-full h-[10rem] z-50">
      <div class="bg-red-500 rounded-[20px] w-fit h-fit py-[0px] px-[7px] m-[20px] cursor-pointer select-none z-50" @click="$refs.intro.killIntroAnimation()">
        <p class="text-white text-center">Kill</p>
      </div>
      <div class="bg-green-500 rounded-[20px] w-fit h-fit py-[0px] px-[7px] m-[20px] cursor-pointer select-none z-50" @click="$refs.intro.recreateIntroAnimation()">
        <p class="text-white text-center">Reload</p>
      </div>
    </div>

    <!-- Intro -->
   
    <Intro ref="intro"/>

    <!-- Replaces Trackpad -->

    <div class="w-full flex flex-col justify-center items-center">
      <i18n-t tag="h2" keypath="trackpad-features.title" class="text-center whitespace-pre-wrap xl:text-[5rem] md:text-[3.5rem] text-[3rem] font-[700] leading-[1.05] tracking-[-0.15rem] mt-[18rem] text-gray-800">
        <template #track> 
          <span class="text-gradient-blue">{{ $t('trackpad-features.title.track')}}</span> 
        </template>
      </i18n-t>

      <p v-html="$mt('trackpad-features.body')" class="text-center max-w-[30em] whitespace-pre-wrap text-[1.8rem] font-[400] text-black/[0.9] leading-[1.4] tracking-[-0.005rem] my-[4.5rem]"></p>
    </div>
    <!-- <p class="whitespace-pre-wrap text-3xl font-bold text-gray-900/70 mb-10 mt-0 w-max-[60rem]">Trackpad Features Which Mac Mouse Fix Brings To Your Mouse
      
    </p>
    <div class="bg-gray-900/90 rounded-[7px] text-sm px-3 py-2 ml-6  -translate-y-3 shadow-sm-inset bg-[linear-gradient(225deg,#1f005c,#540083,#a200a9,#d00099,#f60069,#ff1e38)]">
      <p v-html="$mt('trackpad-features.cards.hint.1')" class="whitespace-pre-wrap text-normal text-center font-bold text-gray-50/90 mb-0 mt-0 w-max-[60rem] 
       bg-clip-text w-full"></p>
    </div> -->

    
    
    <div class="shadow-sm shadow-black/[0.0] border-0 border-neutral-900/[0.15] bg-neutral-900/[0.01] rounded-[2rem] p-[1rem]">

      <CardHeader titleKey="trackpad-features.header" :iconPath="trackpadImagePath" iconClass="translate-y-[3px]" class="mt-[2rem] mb-[calc(6.5rem-3vh)] mx-[0] !rounded-[2rem] !border-none !font-[400]"/>

      <div ref="trackpadCardsSection" class="relative">

        <div class="absolute inset-0 -z-10">
          <div class="absolute inset-0 z-10"></div>
          <img ref="trackpadSplash1" :src="colorSplashImagePath" alt="" class="min-w-[150rem] absolute left-[75%] top-[25%] translate-x-[-50%] translate-y-[-50%] opacity-[0.8]">
          <img ref="trackpadSplash2" :src="colorSplashImagePath" alt="" class="min-w-[150rem] absolute left-[25%] top-[75%] translate-x-[-50%] translate-y-[-50%] opacity-[0.8]">
        </div>

        <div class="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[2.5rem]">
          <NormalFeatureCard titleKey="feature.lookup.title"              bodyKey="feature.lookup.body"           :videoPath="remapDemoVideoPath"       class="text-shadow-sm normal-feature-card-style-orange-content normal-feature-card-style-orange"/>
          <NormalFeatureCard titleKey="feature.mission-control.title"     bodyKey="feature.mission-control.body"  :videoPath="remapDemoVideoPath"       class="text-shadow-sm normal-feature-card-style-red-content normal-feature-card-style-red"/>
          <NormalFeatureCard titleKey="feature.spaces.title"              bodyKey="feature.spaces.body"           :videoPath="remapDemoVideoPath"       class="text-shadow-xl shadow-green-950/30 bg-[url('/assets/img/mac-wallpaper-sonoma.jpg')] bg-[length:1100px] bg-[center_top_-30rem] bg-black/0 bg-blend-darken"/>
          <NormalFeatureCard titleKey="feature.app-expose.title"          bodyKey="feature.app-expose.body"       :videoPath="remapDemoVideoPath"       class="text-shadow-lg shadow-red-950/40 bg-[url('/assets/img/mac-wallpaper-hello-orange-dark.jpg')] bg-[percentage:150%] bg-[center_top_-9rem] bg-black/0 bg-blend-darken"/>
          <NormalFeatureCard titleKey="feature.show-desktop.title"        bodyKey="feature.show-desktop.body"     :videoPath="remapDemoVideoPath"       class="text-shadow-sm normal-feature-card-style-blue-content normal-feature-card-style-blue"/>
          <NormalFeatureCard titleKey="feature.launchpad.title"           bodyKey="feature.launchpad.body"        :videoPath="remapDemoVideoPath"       class="text-shadow-lg shadow-violet-950/50 bg-[url('/assets/img/mac-wallpaper-monterey.jpg')] bg-cover bg-bottom bg-black/0 bg-blend-darken"/>

        </div>

        <hr ref="trackpadRule" class="my-[2.25rem] mx-[12px] border-neutral-900/[0.05]">

        <div class="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[2.5rem]">
          <NormalFeatureCard titleKey="feature.zoom.title"                bodyKey="feature.zoom.body"             :videoPath="remapDemoVideoPath"       class="text-shadow-sm normal-feature-card-style-yellow-content normal-feature-card-style-yellow"/>
          <NormalFeatureCard titleKey="feature.pages.title"               bodyKey="feature.pages.body"            :videoPath="remapDemoVideoPath"       class="text-shadow-sm normal-feature-card-style-green-content normal-feature-card-style-green"/>
          <NormalFeatureCard titleKey="feature.mail-actions.title"        bodyKey="feature.mail-actions.body"     :videoPath="remapDemoVideoPath"       class="text-shadow-lg shadow-orange-950/30 bg-[url('/assets/img/mac-wallpaper-ventura.jpg')] bg-cover bg-center bg-black/0 bg-blend-darken"/>
          <NormalFeatureCard titleKey="feature.free-scroll.title"         bodyKey="feature.free-scroll.body"      :videoPath="remapDemoVideoPath"       class="text-shadow-lg shadow-blue-950/50 bg-[url('/assets/img/mac-wallpaper-big-sur.jpg')] bg-[length:800px] bg-bottom bg-black/0 bg-blend-darken"/>
          <NormalFeatureCard titleKey="feature.smart-zoom.title"          bodyKey="feature.smart-zoom.body"       :videoPath="remapDemoVideoPath"       class="text-shadow-sm normal-feature-card-style-purple-content normal-feature-card-style-purple"/>
        </div>
      </div>
      <p v-html="$mt('trackpad-features.disclaimer')" class="text-[1.0rem] text-center text-gray-500/60 mt-[4.5rem] mb-[4.5rem] whitespace-pre-line"></p>
    </div>

    <!-- <h2 class="xl:text-7xl md:text-6xl text-5xl font-bold tracking-tight mb-20 mt-20 text-gray-800">Make Your Mouse Do<br>Anything You Can <span class="text-gradient-orange">Think </span>of.<br>As Fast as You Can Think of It.</h2> -->
    <!-- <h2 class="xl:text-7xl md:text-6xl text-5xl font-bold tracking-tight mb-20 mt-20 text-gray-800"><span class="text-gradient-orange">Think </span>It.<br>Then Make Your Mouse Do It.</h2> -->
    <!-- <h2 class="xl:text-7xl md:text-6xl text-5xl font-bold tracking-tight mb-20 mt-20 text-gray-800"><span class="text-gradient-blue">Think </span>It. <span class="text-gradient-green-yellow">Click</span> It.<span class="text-gradient-orange"> Do</span> It.</h2> -->
    <!-- <h2 class="xl:text-7xl md:text-6xl text-5xl font-bold tracking-tight mb-20 mt-20 text-gray-800"><span class="text-gradient-blue">Think </span>It.<br> <span class="text-gradient-green-yellow">Click</span> It.<br><span class="text-gradient-orange">Do</span> It.</h2> -->
    <!-- <h2 class="xl:text-7xl md:text-6xl text-5xl font-bold tracking-tight mb-20 mt-20 text-gray-800">As <span class="text-gradient-green-yellow">Flexible</span> as Your Mind.<br>As <span class="text-gradient-orange">Fast</span> As You Can Think.</h2> -->
    


    <!-- Scrolling -->

    
    <i18n-t tag="h2" keypath="scrolling.title" class="whitespace-pre-wrap xl:text-7xl md:text-6xl text-5xl font-bold tracking-tight mt-[6rem] text-gray-800">
      <template #first>
        <span v-html="$t('scrolling.title.first')" class="text-gradient-violet"></span>
      </template>
    </i18n-t>

    <p v-html="$mt('scrolling.body')" class="text-3xl font-normal text-gray-700/60 max-w-[30em] leading-[1.4] my-[4.5rem]"></p>

    <CardHeader titleKey="scroll-smoothness.header" :iconPath="sparkleArrowsImagePath" iconClass="scale-[0.9] translate-x-[2px]"/>

    <div class="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[2.5rem] py-0 my-[4.5rem]">
      <NormalFeatureCard titleKey="scroll-smoothness.high.title"           bodyKey="scroll-smoothness.high.body"        :videoPath="remapDemoVideoPath"       class="text-shadow-lg shadow-violet-950/50 bg-[url('/assets/img/mac-wallpaper-monterey.jpg')] bg-cover bg-bottom bg-black/0 bg-blend-darken"/>
      <NormalFeatureCard titleKey="scroll-smoothness.regular.title"        bodyKey="scroll-smoothness.regular.body"     :videoPath="remapDemoVideoPath"       class="text-shadow-sm normal-feature-card-style-orange-content normal-feature-card-style-orange"/>
      <NormalFeatureCard titleKey="scroll-smoothness.off.title"            bodyKey="scroll-smoothness.off.body"         :videoPath="remapDemoVideoPath"       class="text-shadow-sm normal-feature-card-style-green-content normal-feature-card-style-green"/>
    </div>

    <CardHeader titleKey="scroll-feature.header" :iconPath="arrowsImagePath" hideVideoHint iconClass="scale-[0.8] translate-y-[-1px] translate-x-[-1.5px] px-[0px]"/>

    <div class="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[2.5rem] my-[4.5rem]">
      <NormalFeatureCard titleKey="scroll-feature.reverse.title"        bodyKey="scroll-feature.reverse.body"            class="text-shadow-lg shadow-orange-950/30 bg-[url('/assets/img/mac-wallpaper-ventura.jpg')] bg-cover bg-center bg-black/0 bg-blend-darken"/>
      <NormalFeatureCard titleKey="scroll-feature.modifiers.title"      bodyKey="scroll-feature.modifiers.body"          class="text-shadow-lg shadow-blue-950/50 bg-[url('/assets/img/mac-wallpaper-big-sur.jpg')] bg-[length:800px] bg-bottom bg-black/0 bg-blend-darken"/>
      <NormalFeatureCard titleKey="scroll-feature.configurable.title"   bodyKey="scroll-feature.configurable.body"       class="text-shadow-sm normal-feature-card-style-yellow-content normal-feature-card-style-yellow"/>
    </div>


    <!-- Action Table -->

    <i18n-t tag="h2" keypath="remap-engine.title" class="whitespace-pre-wrap xl:text-7xl md:text-6xl text-5xl font-bold tracking-tight mb-[0] mt-[6rem] text-gray-800">
      <template #first>
        <span class="text-gradient-green-yellow"> {{ $t('remap-engine.title.first') }}</span>
      </template>
      <template #second>
        <span class="text-gradient-orange"> {{ $t('remap-engine.title.second') }}</span>
      </template>
    </i18n-t>
    
    <p v-html="$mt('remap-engine.body')" class="text-3xl font-normal text-gray-700/60 max-w-[30em] leading-[1.4] my-[4.5rem]"></p>

    <div class="flex flex-col items-center">
      <div class="max-w-[1000px] flex flex-col items-center gap-[2.5rem]">
        <CardHeader titleKey="customization-feature.header" :iconPath="gearImagePath" class="w-full" icon-class="scale-[1.0] translate-x-[0px] px-[5px]"/>
        <NormalFeatureCard titleKey="customization-feature.action-table.title" bodyKey="customization-feature.action-table.body" :videoPath="remapDemoVideoPath" class="text-shadow-sm shadow-orange-950/30 bg-black/0 bg-[url('/assets/img/mac-wallpaper-ventura.jpg')] bg-[center_top_30rem] bg-blend-darken w-full" backgroundFilterClass="backdrop-blur-2xl" :image-path="actionTableImagePath" image-class="w-[1400px] mt-1 mb-[-245px] translate-x-[345px]"/>
        <NormalFeatureCard titleKey="customization-feature.keyboard-shortcuts.title" bodyKey="customization-feature.keyboard-shortcuts.body" :videoPath="remapDemoVideoPath" class="text-shadow-sm shadow-orange-950/30 bg-white bg-[url('/assets/img/mac-wallpaper-big-sur.jpg')] bg-[center_top_-30rem] w-full" backgroundFilterClass="backdrop-blur-2xl" expand-button-key="customization-feature.keyboard-shortcuts.expand-button"/>
      </div>
    </div>

    <!--     
      Non-trackpad features section - not enough features to warrant a whole section at this point
    <div class="flex flex-row flex-wrap">
      <SmallFeatureCard titleKey="feature.spaces.title"          :videoPath="remapDemoVideoPath"        class="text-shadow-xl shadow-green-950/30 bg-[url('/assets/img/mac-wallpaper-sonoma.jpg')] bg-[length:1100px] bg-[center_top_-30rem] bg-black/0 bg-blend-darken"/>
      <SmallFeatureCard titleKey="feature.mission-control.title"  :videoPath="remapDemoVideoPath"       class="text-shadow-sm normal-feature-card-style-red-content normal-feature-card-style-red"/>
      <SmallFeatureCard titleKey="feature.app-expose.title"       :videoPath="remapDemoVideoPath"       class="text-shadow-sm normal-feature-card-style-blue-content normal-feature-card-style-blue"/>
      <SmallFeatureCard titleKey="feature.show-desktop.title"     :videoPath="remapDemoVideoPath"       class="text-shadow-lg shadow-red-950/40 bg-[url('/assets/img/mac-wallpaper-hello-orange-dark.jpg')] bg-[percentage:140%] bg-[center_top_-7rem] bg-black/0 bg-blend-darken"/>
      <SmallFeatureCard titleKey="feature.launchpad.title"        :videoPath="remapDemoVideoPath"       class="text-shadow-lg shadow-violet-950/50 bg-[url('/assets/img/mac-wallpaper-monterey.jpg')] bg-cover bg-bottom bg-black/0 bg-blend-darken"/>
      <SmallFeatureCard titleKey="feature.lookup.title"           :videoPath="remapDemoVideoPath"       class="text-shadow-sm normal-feature-card-style-orange-content normal-feature-card-style-orange"/>
      <SmallFeatureCard titleKey="feature.pages.title"            :videoPath="remapDemoVideoPath"       class="text-shadow-sm normal-feature-card-style-green-content normal-feature-card-style-green"/>
      <SmallFeatureCard titleKey="feature.mail-actions.title"     :videoPath="remapDemoVideoPath"       class="text-shadow-lg shadow-orange-950/30 bg-[url('/assets/img/mac-wallpaper-ventura.jpg')] bg-cover bg-center bg-black/0 bg-blend-darken"/>
      <SmallFeatureCard titleKey="feature.free-scroll.title"      :videoPath="remapDemoVideoPath"       class="text-shadow-lg shadow-blue-950/50 bg-[url('/assets/img/mac-wallpaper-big-sur.jpg')] bg-cover bg-bottom bg-black/0 bg-blend-darken"/>
      <SmallFeatureCard titleKey="feature.zoom.title"             :videoPath="remapDemoVideoPath"       class="text-shadow-sm normal-feature-card-style-yellow-content normal-feature-card-style-yellow"/>
      <SmallFeatureCard titleKey="feature.smart-zoom.title"       :videoPath="remapDemoVideoPath"       class="text-shadow-sm normal-feature-card-style-purple-content normal-feature-card-style-purple"/>
    </div> 
    -->

    

    <!-- Good Software -->

    <i18n-t tag="h2" keypath="good-software.title" class="whitespace-pre-wrap xl:text-7xl md:text-6xl text-5xl font-bold tracking-tight mb-[0] mt-[6rem] text-gray-800">
      <template #first>
        <span class="text-gradient-green"> {{ $t('good-software.title.first') }}</span>
      </template>
      <template #second>
        <span class="text-gradient-blue"> {{ $t('good-software.title.second') }}</span>
      </template>
      <template #third>
        <span class="text-gradient-orange"> {{ $t('good-software.title.third') }}</span>
      </template>
    </i18n-t>
    
    <p v-html="$mt('good-software.body')" class="hidden text-3xl font-normal text-gray-700/60 max-w-[30em] leading-[1.4] my-[4.5rem]"></p>


    <div class="grid xl:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-[2.5rem] py-0 my-[4.5rem]">
      <NormalFeatureCard titleKey="unobtrusive-lightweight.title"          bodyKey="unobtrusive-lightweight.body"    class="text-shadow-lg shadow-violet-950/50 bg-[url('/assets/img/mac-wallpaper-monterey.jpg')] bg-cover bg-bottom bg-black/0 bg-blend-darken"/>
      <NormalFeatureCard titleKey="open-source.title"        bodyKey="open-source.body"  class="text-shadow-sm normal-feature-card-style-orange-content normal-feature-card-style-orange"/>
    </div>
    

    

    <!-- Pricing -->
    
    <i18n-t tag="h2" keypath="pricing.title" class="hidden whitespace-pre-wrap xl:text-7xl md:text-6xl text-5xl font-bold tracking-tight mb-20 mt-20 text-gray-800">
      <template #first>
        <span class="text-gradient-green-yellow"> {{ $t('pricing.title.first') }}</span>
      </template>
      <template #second>
        <span class="text-gradient-orange"> {{ $t('pricing.title.second') }}</span>
      </template>
    </i18n-t>


    <div class="grid xl:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-[2.5rem] py-0 my-[4.5rem]">
      <NormalFeatureCard titleKey="price.title"          bodyKey="price.body"           class="col-span-full text-shadow-lg shadow-red-950/40 bg-[url('/assets/img/mac-wallpaper-hello-orange-dark.jpg')] bg-[percentage:150%] bg-[center_top_-9rem] bg-black/0 bg-blend-darken"/>
      <NormalFeatureCard titleKey="free-days.title"      bodyKey="free-days.body"       class="text-shadow-sm normal-feature-card-style-blue-content normal-feature-card-style-blue"/>
      <NormalFeatureCard titleKey="alternatives.title"   bodyKey="alternatives.body"    class="text-shadow-sm normal-feature-card-style-green-content normal-feature-card-style-green"/>
    </div>

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
const { $gsap } = useNuxtApp()

/* Import other utils */

import { everyNth } from '~/utils/util';

/* Import quote stuff */

import { getUsableQuotes } from "../utils/quotes"
const quotes = getUsableQuotes()

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
const { introAnimationIsReady } = storeToRefs(global)

/* Get refs */

const trackpadCardsSection = ref<HTMLDivElement | null>(null)
const trackpadSplash1 = ref<HTMLElement | null>(null)
const trackpadSplash2 = ref<HTMLElement | null>(null)
const trackpadRule = ref<HTMLElement | null>(null)

onMounted(() => {

  watch(introAnimationIsReady, (newValue) => {

    if (newValue == false) { return }

    /* Create scroll-linked animation for the color trackpad section */

    
    const cardsOffset = '4rem'

    const tlTrack = $gsap.timeline({scrollTrigger: {
      trigger: trackpadCardsSection.value!,
      pin: false, // Pin the trigger element while active
      start: "top bottom", // Top of element, bottom of viewport
      end: `bottom top`,
      scrub: 0.0, // Smooth scrubbing, takes x second to "catch up" to the scrollbar
      markers: true,
    }})

    // tlTrack.set(trackpadSplash1.value, { top: '25%', left: '75%' }, 0)
    // tlTrack.set(trackpadSplash2.value, { top: '75%', left: '25%' }, 0)

    // tlTrack.to(trackpadSplash1.value, { top: '35%', left: '65%', duration: 1, ease: 'linear'}, 0)
    // tlTrack.to(trackpadSplash2.value, { top: '65%', left: '35%', duration: 1, ease: 'linear'}, 0)

    tlTrack.fromTo(trackpadCardsSection.value,  { translateY: cardsOffset }, { translateY: '-' + cardsOffset, duration: 1, ease: 'linear'}, 0)
    tlTrack.fromTo(trackpadRule.value,          { translateY: '-' + cardsOffset }, { translateY: cardsOffset, duration: 1, ease: 'linear'}, 0)

    tlTrack.duration(4)

    console.log(`splash: ${ trackpadSplash1.value }, section: ${ trackpadCardsSection.value }`);

  })

})

</script>

<style lang="postcss" scoped>



</style>