<!-- 

  Notes:
  - On the wrapper for the "see it in action" button we had to set `min-h-[52px]` instead of h-[52px], for it to actually work. No idea why.


 -->

<template>
  <div>

   

    <!-- Replaces Trackpad -->

    <i18n-t tag="h2" keypath="trackpad-features.title" class="whitespace-pre-wrap xl:text-7xl md:text-6xl text-5xl font-bold tracking-tight mt-[6rem] text-gray-800">
      <template #track> 
        <span class="text-gradient-blue">{{ $t('trackpad-features.title.track')}}</span> 
      </template>
    </i18n-t>


    <p v-html="$mt('trackpad-features.body')" class="whitespace-pre-wrap text-3xl font-normal text-gray-700/60 max-w-[30em] leading-[1.4] my-[4.5rem]"></p>
    <!-- <p class="whitespace-pre-wrap text-3xl font-bold text-gray-900/70 mb-10 mt-0 w-max-[60rem]">Trackpad Features Which Mac Mouse Fix Brings To Your Mouse
      
    </p>
    <div class="bg-gray-900/90 rounded-[7px] text-sm px-3 py-2 ml-6  -translate-y-3 shadow-sm-inset bg-[linear-gradient(225deg,#1f005c,#540083,#a200a9,#d00099,#f60069,#ff1e38)]">
      <p v-html="$mt('trackpad-features.cards.hint.1')" class="whitespace-pre-wrap text-normal text-center font-bold text-gray-50/90 mb-0 mt-0 w-max-[60rem] 
       bg-clip-text w-full"></p>
    </div> -->

    <CardHeader titleKey="trackpad-features.header" :iconPath="trackpadImagePath" iconClass="translate-y-[3px]"/>
    
    <div class="">
      <div class="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[2.5rem] mt-[4.5rem]">
        <NormalFeatureCard titleKey="feature.lookup.title"              bodyKey="feature.lookup.body"           :videoPath="remapDemoVideoPath"       class="text-shadow-sm normal-feature-card-style-orange-content normal-feature-card-style-orange"/>
        <NormalFeatureCard titleKey="feature.mission-control.title"     bodyKey="feature.mission-control.body"  :videoPath="remapDemoVideoPath"       class="text-shadow-sm normal-feature-card-style-red-content normal-feature-card-style-red"/>
        <NormalFeatureCard titleKey="feature.spaces.title"              bodyKey="feature.spaces.body"           :videoPath="remapDemoVideoPath"       class="text-shadow-xl shadow-green-950/30 bg-[url('/assets/img/mac-wallpaper-sonoma.jpg')] bg-[length:1100px] bg-[center_top_-30rem] bg-black/0 bg-blend-darken"/>
        <NormalFeatureCard titleKey="feature.app-expose.title"          bodyKey="feature.app-expose.body"       :videoPath="remapDemoVideoPath"       class="text-shadow-lg shadow-red-950/40 bg-[url('/assets/img/mac-wallpaper-hello-orange-dark.jpg')] bg-[percentage:150%] bg-[center_top_-9rem] bg-black/0 bg-blend-darken"/>
        <NormalFeatureCard titleKey="feature.show-desktop.title"        bodyKey="feature.show-desktop.body"     :videoPath="remapDemoVideoPath"       class="text-shadow-sm normal-feature-card-style-blue-content normal-feature-card-style-blue"/>
        <NormalFeatureCard titleKey="feature.launchpad.title"           bodyKey="feature.launchpad.body"        :videoPath="remapDemoVideoPath"       class="text-shadow-lg shadow-violet-950/50 bg-[url('/assets/img/mac-wallpaper-monterey.jpg')] bg-cover bg-bottom bg-black/0 bg-blend-darken"/>

      </div>

      <hr class="my-[2.25rem] mx-[12px] border-gray-300/35">

      <div class="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[2.5rem]">
        <NormalFeatureCard titleKey="feature.zoom.title"                bodyKey="feature.zoom.body"             :videoPath="remapDemoVideoPath"       class="text-shadow-sm normal-feature-card-style-yellow-content normal-feature-card-style-yellow"/>
        <NormalFeatureCard titleKey="feature.pages.title"               bodyKey="feature.pages.body"            :videoPath="remapDemoVideoPath"       class="text-shadow-sm normal-feature-card-style-green-content normal-feature-card-style-green"/>
        <NormalFeatureCard titleKey="feature.mail-actions.title"        bodyKey="feature.mail-actions.body"     :videoPath="remapDemoVideoPath"       class="text-shadow-lg shadow-orange-950/30 bg-[url('/assets/img/mac-wallpaper-ventura.jpg')] bg-cover bg-center bg-black/0 bg-blend-darken"/>
        <NormalFeatureCard titleKey="feature.free-scroll.title"         bodyKey="feature.free-scroll.body"      :videoPath="remapDemoVideoPath"       class="text-shadow-lg shadow-blue-950/50 bg-[url('/assets/img/mac-wallpaper-big-sur.jpg')] bg-[length:800px] bg-bottom bg-black/0 bg-blend-darken"/>
        <NormalFeatureCard titleKey="feature.smart-zoom.title"          bodyKey="feature.smart-zoom.body"       :videoPath="remapDemoVideoPath"       class="text-shadow-sm normal-feature-card-style-purple-content normal-feature-card-style-purple"/>
      </div>
    </div>
    <p v-html="$mt('trackpad-features.disclaimer')" class="text-[1.0rem] text-center text-gray-500/60 mt-[4.5rem] mb-[4.5rem] whitespace-pre-line"></p>

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
    
    <CardHeader titleKey="user-feedback.card-header.title" subtitleKey="user-feedback.card-header.sub" :iconPath="speechBubbleImagePath" class="w-full" icon-class="scale-[1.0] translate-x-[0px] px-[8px] "/>

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

    <!-- 
      Language Picker
      Notes: 
      - I can't seem to give this a blue accent under the arrow like the native system buttons. This should be default look for <select> buttons. See https://www.w3schools.com/tags/tryit.asp?filename=tryhtml_select. But the current look is good enough for Chrome and Safari.
      -->
    <select id="locale-select" v-model="$i18n.locale" class="rounded-[50vh] outline outline-1 outline-slate-500/20"> 
      <option v-for="$loc in $i18n.locales" :value="$loc.code"> {{ $loc.name }}</option> 
    </select> 
  </div>
</template>

<script setup lang="ts">

/* Import plugin stuff */

// const { md } = useNuxtApp()

/* Import i18n stuff
    Note: Why can't we use $i18n in ts like we do in html? */

const { setLocale, locale, defaultLocale } = useI18n() 
import { $mt } from '~/utils/markdownTranslate'

/* Import Quote stuff */

import { quotes } from '~/utils/Quotes';

/* Call setLocale on locale update
    Notes: 
    - Otherwise the url doesn't update. No idea what we are doing 
    - The <select> language picker updates the `locale` */

watch(locale, () => {
  setLocale(locale.value);
})

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
import speechBubbleImagePath from '../assets/img/text.bubble@8x.png'

/* Helper functions */

function everyNth(n: number, startIndex: number, array: any[]): any[] {
  // Make a new array containg every `n`th element of `array`, starting at `startIndex`
  // We're using this so that we can place the quotes that we want most visible at the top of our `quotes` and then spread them out evenly along several columns.

  var result: any[] = []

  var index = startIndex
  while (true) {

    if (index >= array.length) {
      break
    }

    const v = array[index]
    result.push(v)

    index += n
  }

  return result
}

</script>

<style lang="postcss" scoped>



</style>