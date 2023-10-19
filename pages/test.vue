<!-- 

  Notes:
  - On the wrapper for the "see it in action" button we had to set `min-h-[52px]` instead of h-[52px], for it to actually work. No idea why.


 -->

<template>
  <div>

   

    <!-- Replaces Trackpad -->

    <i18n-t tag="h2" keypath="trackpad-features.title" class="whitespace-pre-wrap xl:text-7xl md:text-6xl text-5xl font-bold tracking-tight mb-0 mt-20 text-gray-800">
      <template #track> 
        <span class="text-gradient-blue">{{ $t('trackpad-features.title.track')}}</span> 
      </template>
    </i18n-t>


    <p v-html="$mt('trackpad-features.body')" class="whitespace-pre-wrap text-3xl max-w-[30em] leading-[1.4] font-medium text-gray-500/80 mb-[5rem] mt-[5rem]"></p>
    <!-- <p class="whitespace-pre-wrap text-3xl font-bold text-gray-900/70 mb-10 mt-0 w-max-[60rem]">Trackpad Features Which Mac Mouse Fix Brings To Your Mouse
      
    </p>
    <div class="bg-gray-900/90 rounded-[7px] text-sm px-3 py-2 ml-6  -translate-y-3 shadow-sm-inset bg-[linear-gradient(225deg,#1f005c,#540083,#a200a9,#d00099,#f60069,#ff1e38)]">
      <p v-html="$mt('trackpad-features.cards.hint.1')" class="whitespace-pre-wrap text-normal text-center font-bold text-gray-50/90 mb-0 mt-0 w-max-[60rem] 
       bg-clip-text w-full"></p>
    </div> -->

    <div class="bg-gray-200/50 rounded-[16px] px-6 pt-3 pb-3 mb-6 shadow-sm-inset">
      <p v-html="$mt('trackpad-features.cards.hint.0')" class="whitespace-pre-wrap text-2xl text-start font-normal text-gray-800/70 mb-1 mt-0 w-max-[60rem]"></p>
      <p class="whitespace-pre-wrap text-normal text-start font-normal text-gray-500/70 mb-0 mt-0 w-max-[60rem]">
        <img src='~/assets/img/play.circle@2x.png' alt='Play Video Icon' class='mr-[7px] inline h-[1.1em] align-[-3.0px] filter brightness-0 drop-shadow-xl'>
        <span v-html="$mt('trackpad-features.cards.hint.1')"></span>
      </p>
    </div>
    
    <div class="">
      <div class="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 py-4">

        <NormalFeatureCard titleKey="feature.spaces.title"              bodyKey="feature.spaces.body"           :videoPath="remapDemoVideoPath"       class="text-shadow-xl shadow-green-950/30 bg-[url('/assets/img/mac-wallpaper-sonoma.jpg')] bg-[length:1100px] bg-[center_top_-30rem] bg-black/0 bg-blend-darken"/>
        <NormalFeatureCard titleKey="feature.mission-control.title"     bodyKey="feature.mission-control.body"  :videoPath="remapDemoVideoPath"       class="text-shadow-sm normal-feature-card-style-red-content normal-feature-card-style-red"/>
        <NormalFeatureCard titleKey="feature.app-expose.title"          bodyKey="feature.app-expose.body"       :videoPath="remapDemoVideoPath"       class="text-shadow-sm normal-feature-card-style-blue-content normal-feature-card-style-blue"/>
        <NormalFeatureCard titleKey="feature.show-desktop.title"        bodyKey="feature.show-desktop.body"     :videoPath="remapDemoVideoPath"       class="text-shadow-lg shadow-red-950/40 bg-[url('/assets/img/mac-wallpaper-hello-orange-dark.jpg')] bg-[percentage:140%] bg-[center_top_-7rem] bg-black/0 bg-blend-darken"/>
        <NormalFeatureCard titleKey="feature.launchpad.title"           bodyKey="feature.launchpad.body"        :videoPath="remapDemoVideoPath"       class="text-shadow-lg shadow-violet-950/50 bg-[url('/assets/img/mac-wallpaper-monterey.jpg')] bg-cover bg-bottom bg-black/0 bg-blend-darken"/>
        <NormalFeatureCard titleKey="feature.lookup.title"              bodyKey="feature.lookup.body"           :videoPath="remapDemoVideoPath"       class="text-shadow-sm normal-feature-card-style-orange-content normal-feature-card-style-orange"/>
        <NormalFeatureCard titleKey="feature.pages.title"               bodyKey="feature.pages.body"            :videoPath="remapDemoVideoPath"       class="text-shadow-sm normal-feature-card-style-green-content normal-feature-card-style-green"/>
        <NormalFeatureCard titleKey="feature.mail-actions.title"        bodyKey="feature.mail-actions.body"     :videoPath="remapDemoVideoPath"       class="text-shadow-lg shadow-orange-950/30 bg-[url('/assets/img/mac-wallpaper-ventura.jpg')] bg-cover bg-center bg-black/0 bg-blend-darken"/>
        <NormalFeatureCard titleKey="feature.free-scroll.title"         bodyKey="feature.free-scroll.body"      :videoPath="remapDemoVideoPath"       class="text-shadow-lg shadow-blue-950/50 bg-[url('/assets/img/mac-wallpaper-big-sur.jpg')] bg-cover bg-bottom bg-black/0 bg-blend-darken"/>
        <NormalFeatureCard titleKey="feature.zoom.title"                bodyKey="feature.zoom.body"             :videoPath="remapDemoVideoPath"       class="text-shadow-sm normal-feature-card-style-yellow-content normal-feature-card-style-yellow"/>
        <NormalFeatureCard titleKey="feature.smart-zoom.title"          bodyKey="feature.smart-zoom.body"       :videoPath="remapDemoVideoPath"       class="text-shadow-sm normal-feature-card-style-purple-content normal-feature-card-style-purple"/>

      </div>
    </div>
    <p class="text-xs text-center text-gray-500/70 mb-7 mt-10">* Mac Mouse Fix can only bring all of the Trackpad-features to your third-party mouse in the way described, if your mouse has at least 5 buttons which are recognized by Mac Mouse Fix. If Mac Mouse Fix recognizes less than 5 buttons on your mouse, Mac Mouse Fix will still work great with it, but you will have to set it up in a different way to use all of the Trackpad features listed here.\nMac Mouse Fix does not currently support the Apple Magic Mouse.</p>

    <!-- <h2 class="xl:text-7xl md:text-6xl text-5xl font-bold tracking-tight mb-20 mt-20 text-gray-800">Make Your Mouse Do<br>Anything You Can <span class="text-gradient-orange">Think </span>of.<br>As Fast as You Can Think of It.</h2> -->
    <!-- <h2 class="xl:text-7xl md:text-6xl text-5xl font-bold tracking-tight mb-20 mt-20 text-gray-800"><span class="text-gradient-orange">Think </span>It.<br>Then Make Your Mouse Do It.</h2> -->
    <!-- <h2 class="xl:text-7xl md:text-6xl text-5xl font-bold tracking-tight mb-20 mt-20 text-gray-800"><span class="text-gradient-blue">Think </span>It. <span class="text-gradient-green-yellow">Click</span> It.<span class="text-gradient-orange"> Do</span> It.</h2> -->
    <!-- <h2 class="xl:text-7xl md:text-6xl text-5xl font-bold tracking-tight mb-20 mt-20 text-gray-800"><span class="text-gradient-blue">Think </span>It.<br> <span class="text-gradient-green-yellow">Click</span> It.<br><span class="text-gradient-orange">Do</span> It.</h2> -->
    <!-- <h2 class="xl:text-7xl md:text-6xl text-5xl font-bold tracking-tight mb-20 mt-20 text-gray-800">As <span class="text-gradient-green-yellow">Flexible</span> as Your Mind.<br>As <span class="text-gradient-orange">Fast</span> As You Can Think.</h2> -->
    


    <!-- Scrolling -->
    <!--
      Ideas:
      - Scrolling Has Never Felt So Good
      - Scroll About with Style
      - Get On The Scroller-Coaster
      - Bad UX? Scroll Past That.
      - Schlechte Software? Einfach weiterscrollen.
      - Bad software? Just keep scrolling.
      - An Expensive Trackpad? Just Keep Scrolling.
    -->

    <h2 class="whitespace-pre-wrap xl:text-7xl md:text-6xl text-5xl font-bold tracking-tight mb-20 mt-20 text-gray-800"><span class="text-gradient-violet">Scrolling</span> Has Never
    <br>Felt So <span class="text-gradient-redd">Good</span>.
    </h2>

    <p class="text-3xl max-w-[30em] leading-[1.4] font-medium text-gray-500/80 mb-20">
      With Mac Mouse Fix, you can can make scrolling feel as <b>fluid</b> and <b>precise</b> as on a Trackpad, or as <b>consistent</b> and <b>predictable</b> as on Windows - with just a few simple clicks.
    </p>

    <div class="bg-gray-200/50 rounded-[16px] px-3 pt-3 pb-3 mb-6 shadow-sm-inset">
      <p v-html="$mt('trackpad-features.cards.hint.0')" class="whitespace-pre-wrap text-normal text-center font-normal text-gray-500/70 mb-1 mt-0 w-max-[60rem]"></p>
      <p v-html="$mt('trackpad-features.cards.hint.1')" class="whitespace-pre-wrap text-normal text-center font-normal text-gray-500/70 mb-0 mt-0 w-max-[60rem]"></p>
    </div>
    <div class="mb-[70px]">
      <div class="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 py-4">
        <NormalFeatureCard titleKey="scroll-smoothness.high.title"           bodyKey="scroll-smoothness.high.body"        :videoPath="remapDemoVideoPath"       class="text-shadow-lg shadow-violet-950/50 bg-[url('/assets/img/mac-wallpaper-monterey.jpg')] bg-cover bg-bottom bg-black/0 bg-blend-darken"/>
        <NormalFeatureCard titleKey="scroll-smoothness.regular.title"        bodyKey="scroll-smoothness.regular.body"     :videoPath="remapDemoVideoPath"       class="text-shadow-sm normal-feature-card-style-orange-content normal-feature-card-style-orange"/>
        <NormalFeatureCard titleKey="scroll-smoothness.off.title"            bodyKey="scroll-smoothness.off.body"         :videoPath="remapDemoVideoPath"       class="text-shadow-sm normal-feature-card-style-green-content normal-feature-card-style-green"/>
      </div>
    </div>

    <div class="bg-gray-200/50 rounded-[16px] px-3 pt-3 pb-3 mb-6 shadow-sm-inset">
      <p v-html="$mt('trackpad-features.cards.hint.0')" class="whitespace-pre-wrap text-normal text-center font-normal text-gray-500/70 mb-1 mt-0 w-max-[60rem]"></p>
      <p v-html="$mt('trackpad-features.cards.hint.1')" class="whitespace-pre-wrap text-normal text-center font-normal text-gray-500/70 mb-0 mt-0 w-max-[60rem]"></p>
    </div>
    <div class="">
      <div class="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 py-4">

        <NormalFeatureCard titleKey="scroll-feature.reverse.title"        bodyKey="scroll-feature.reverse.body"       :videoPath="remapDemoVideoPath"       class="text-shadow-lg shadow-orange-950/30 bg-[url('/assets/img/mac-wallpaper-ventura.jpg')] bg-cover bg-center bg-black/0 bg-blend-darken"/>
        <NormalFeatureCard titleKey="scroll-feature.modifiers.title"      bodyKey="scroll-feature.modifiers.body"     :videoPath="remapDemoVideoPath"       class="text-shadow-lg shadow-blue-950/50 bg-[url('/assets/img/mac-wallpaper-big-sur.jpg')] bg-cover bg-bottom bg-black/0 bg-blend-darken"/>
        <NormalFeatureCard titleKey="scroll-feature.configurable.title"   bodyKey="scroll-feature.configurable.body"  :videoPath="remapDemoVideoPath"       class="text-shadow-sm normal-feature-card-style-yellow-content normal-feature-card-style-yellow"/>
      </div>
    </div>


    <!-- Action Table -->

    <i18n-t tag="h2" keypath="remap-engine.title" class="whitespace-pre-wrap xl:text-7xl md:text-6xl text-5xl font-bold tracking-tight mb-20 mt-20 text-gray-800">
      <template #first>
        <span class="text-gradient-green-yellow"> {{ $t('remap-engine.title.first') }}</span>
      </template>
      <template #second>
        <span class="text-gradient-orange"> {{ $t('remap-engine.title.second') }}</span>
      </template>
    </i18n-t>
    
    <p v-html="$mt('remap-engine.body')" class="text-3xl max-w-[30em] leading-[1.4] font-medium text-gray-500/80 mb-20"></p>

    <div class="flex flex-col items-center gap-10">
      <ActionTableFeatureCard titleKey="feature.action-table.title" bodyKey="feature.action-table.body" :videoPath="remapDemoVideoPath" class="shadow-orange-950/30 bg-white bg-[url('/assets/img/mac-wallpaper-ventura.jpg')] min-h-[500px] h-[500px] w-full max-w-[1000px] "/>
      <KeyboardShortcutFeatureCard titleKey="feature.keyboard-shortcuts.title" bodyKey="feature.keyboard-shortcuts.body" :videoPath="remapDemoVideoPath" class="shadow-orange-950/30 bg-white bg-[url('/assets/img/mac-wallpaper-big-sur.jpg')] bg-[center_top_-30rem]  w-full max-w-[1000px]"/>
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

    <!-- This is good software -->
    <i18n-t tag="h2" keypath="good-sofware.title" class="whitespace-pre-wrap xl:text-7xl md:text-6xl text-5xl font-bold tracking-tight mb-20 mt-20 text-gray-800">
      <template #first>
        <span class="text-gradient-green-yellow"> {{ $t('good-sofware.title.first') }}</span>
      </template>
      <template #second>
        <span class="text-gradient-orange"> {{ $t('good-sofware.title.second') }}</span>
      </template>
    </i18n-t>

    <!-- Pricing -->
    <i18n-t tag="h2" keypath="pricing.title" class="whitespace-pre-wrap xl:text-7xl md:text-6xl text-5xl font-bold tracking-tight mb-20 mt-20 text-gray-800">
      <template #first>
        <span class="text-gradient-green-yellow"> {{ $t('pricing.title.first') }}</span>
      </template>
      <template #second>
        <span class="text-gradient-orange"> {{ $t('pricing.title.second') }}</span>
      </template>
    </i18n-t>

    <div class="min-h-[2000px]"></div>

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

</script>

<style lang="postcss" scoped>



</style>