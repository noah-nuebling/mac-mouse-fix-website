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
    <div class="flex flex-row flex-wrap gap-[2.5rem] py-0 my-[4.5rem]">

      <!-- First row -->
      <div class="flex flex-col gap-[2.5rem]">
        <QuoteCard v-for="quote in everyNth(3, 0, testemonials)" :title="quote.name" :body="quote.quote" class="h-fit flex-shrink flex-grow"></QuoteCard>
      </div>
      <!-- First row -->
      <div class="flex flex-col gap-[2.5rem]">
        <QuoteCard v-for="quote in everyNth(3, 1, testemonials)" :title="quote.name" :body="quote.quote" class=""></QuoteCard>
      </div>
      <!-- First row -->
      <div class="flex flex-col gap-[2.5rem]">
        <QuoteCard v-for="quote in everyNth(3, 2, testemonials)" :title="quote.name" :body="quote.quote" class=""></QuoteCard>
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
      <NormalFeatureCard titleKey="price.title"          bodyKey="price.body"             class="col-span-full text-shadow-lg shadow-red-950/40 bg-[url('/assets/img/mac-wallpaper-hello-orange-dark.jpg')] bg-[percentage:150%] bg-[center_top_-9rem] bg-black/0 bg-blend-darken"/>
      <NormalFeatureCard titleKey="free-days.title"        bodyKey="free-days.body" class="text-shadow-sm normal-feature-card-style-blue-content normal-feature-card-style-blue"/>
      <NormalFeatureCard titleKey="alternatives.title"           bodyKey="alternatives.body"      class="text-shadow-sm normal-feature-card-style-green-content normal-feature-card-style-green"/>
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

/* Testemonials */

enum QuoteSource {
  Email,
  PayPalDonation,
  GitHub,
  StackExchange,
  Reddit,
  Lifehacker,
  YoutubeComment,
}
enum PermissionToShare {
  None,
  Requested,
  Denied,
  Granted,
}

const testemonials = [

  // TODO: ? Add Chris Thomas' message

  {
    quote: "Works so well! Great idea and implementation, and of course the design, in the best Apple traditions!",
    name: "Dzhakhongir Normatov",
    source: QuoteSource.Email,
    link: 'message:<280189B0-BC31-4E89-907C-46FBFB584E38@icloud.com>',
    permission: PermissionToShare.None
  },
  {
    quote: "Many thanks for Mac Mouse Fix—it’s become an essential tool for me, and of all of the programs of this type I’ve found, it’s easily the best.",
    name: "David",
    source: QuoteSource.Email,
    link: 'message:<E344087D-7575-4253-B310-D127CC9F4A99@me.com>',
    permission: PermissionToShare.None
  },
  {
    quote: "You just saved me from spending money on the MX Master.",
    name: "Andreea",
    source: QuoteSource.Email,
    link: 'message:<D50495F3-3F30-4159-A09E-9373A9F40777@gmail.com>',
    permission: PermissionToShare.None,
  },
  {
    quote: "Thanks for this AMAZING software. 10/10!",
    name: "Timon Weides",
    source: QuoteSource.Email,
    link: 'message:<21D82608-53B7-4A72-AD52-E650FF0FED20@live.de>',
    permission: PermissionToShare.None,
  },
  {
    quote: "Mac Mouse Fix is magical. I am absolutely blown away by how well-designed and user-friendly it is.",
    name: "Shaon Khan",
    source: QuoteSource.Email,
    link: "message:<CAFj72xngJzJz8dvOx4pzL+QZTG97dSeuJ0QQwEmETJ67eGzrbQ@mail.gmail.com>",
    permission: PermissionToShare.None,
  },
  {
    quote: "Thank you for the amazing app in Mac Mouse Fix. Just what I needed, no subscription and no bloat. Thank you so much!",
    name: "Erik Svendsen",
    source: QuoteSource.PayPalDonation,
    link: 'message:<04.52.53548.372FA446@ccg13mail05>',
    permission: PermissionToShare.Granted,
  },
  {
    quote: "Thank you for Mac Mouse Fix! I love it. You're doing what Apple didn't =)",
    name: "Fernanda Bari Ramos",
    source: QuoteSource.Email,
    link: 'message:<1634211506.4537@paypal.com>',
    permission: PermissionToShare.None,
  },
  {
    quote: "The UI and gestures are so intuitive.",
    name: "Laurynas Tumosa",
    source: QuoteSource.Email,
    link: 'message:<1634236926.25936@paypal.com>',
    permission: PermissionToShare.None
  },
  {
    quote: "Your app is literally the best Mac Mouse Fix available. So simple, light, M1 compatible, no bugs. I’m totally in love. I don’t even use Logitech Hub as your app is far superior. I’ll definitely be recommending your app as much as possible.",
    name: "Marvin Marker",
    source: QuoteSource.Email,
    link: 'message:<221C5A7A-5754-4B3E-A74A-04EC3694772E@gmail.com>',
    permission: PermissionToShare.None
  },
  {
    quote: "Mac Mouse Fix is literally everything you could want in your experience of using a mouse with OSX.",
    name: "William Park",
    source: QuoteSource.Email,
    link: 'message:<3B.AC.57749.F6B6C326@ccg13mail02>',
    permission: PermissionToShare.None
  },
  {
    quote: "Thank you, saved me from buying an apple mouse",
    name: "Joao Santos",
    source: QuoteSource.Email,
    link: 'message:<5E.65.01822.93ADD426@ccg01mail02>',
    permission: PermissionToShare.None
  },
  {
    quote: "It's exact what I was looking for to make non-Apple-Mice work like I want ",
    name: "Wolf Spalteholz",
    source: QuoteSource.Email,
    link: 'message:<59.33.32745.E2035526@ccg13mail04>',
    permission: PermissionToShare.None
  },
  {
    quote: "Mac Mouse Fix is the single most important Mac app for me. I love it so much and it feels incredibly polished.",
    name: "Florian Schmidt",
    source: QuoteSource.Email,
    link: 'message:<94.9D.24537.7D594A26@ccg01mail03>',
    permission: PermissionToShare.None
  },
  {
    quote: "I've been wanting to get rid of my Magic Mouse for a while and because of your app, I can do just that! You're awesome!!!!",
    name: "Zachary Taffet",
    source: QuoteSource.Email,
    link: 'message:<E2.BB.41759.B545C736@ccg13mail04>',
    permission: PermissionToShare.None
  },
  {
    quote: "Utterly incredible software, bro :) so simple yet so functional. keep up the good work.",
    name: "Osman Keshawarz",
    source: QuoteSource.Email,
    link: 'message:<36.97.42814.18522A36@ccg01mail04>',
    permission: PermissionToShare.None
  },
  {
    quote: "Great app! Love the simplicity and it works like a charm! Thanx :)",
    name: "Peter Leijenhorst",
    source: QuoteSource.Email,
    link: 'message:<49.05.55471.3D245B36@ccg01mail03>',
    permission: PermissionToShare.None
  },
  {
    quote: "You are an absolute legend thank you so much for creating this app, it's literally perfect",
    name: "Herta Gatter",
    source: QuoteSource.Email,
    link: 'message:<67.68.63016.6BAA3D36@ccg01mail02>',
    permission: PermissionToShare.None
  },
  {
    quote: "No other similar utility can compete",
    name: "5silentrain",
    source: QuoteSource.Email,
    link: 'message:<CAB+S4pXD+RP3OYxENZXa_+NWLmJBB1Uqf1_Z9xKLqRy=-QaTJg@mail.gmail.com>',
    permission: PermissionToShare.None
  },
  {
    quote: "Thanks for your awesome app its just wonderful :).",
    name: "Marvin Pärli",
    source: QuoteSource.Email,
    link: 'message:<9C61D7F1-CABE-4851-8F29-AE04AF932140@icloud.com>',
    permission: PermissionToShare.None
  },
  {
    quote: "This is the single greatest piece of software in Apple's history.",
    name: "Michael Hicklen",
    source: QuoteSource.Email,
    link: 'message:<13.9C.09725.38CA7836@ccg01mail05>',
    permission: PermissionToShare.Granted
  },
  {
    quote: "Click & drag for switching between the screens feels so native.",
    name: "Lazar Manasijević",
    source: QuoteSource.Email,
    link: 'message:<BDF0E117-B5BB-4E3E-9CD5-C1DE163F7F02@gmail.com>',
    permission: PermissionToShare.None
  },
  {
    quote: "Your app is the best in its class!",
    name: "ib0ndar",
    source: QuoteSource.GitHub,
    link: 'https://github.com/noah-nuebling/mac-mouse-fix/issues/378',
    permission: PermissionToShare.None
  },
  {
    quote: "Probs the best app on my Mac",
    name: "SaMaY-69",
    source: QuoteSource.GitHub,
    link: 'https://github.com/noah-nuebling/mac-mouse-fix/issues/273',
    permission: PermissionToShare.None
  },
  {
    quote: "Among all apps that try to fix this problem, this one is undoubtly the best!",
    name: "tomatsaev",
    source: QuoteSource.GitHub,
    link: 'https://github.com/noah-nuebling/mac-mouse-fix/issues/34',
    permission: PermissionToShare.None
  },
  {
    quote: "This is the best mouse software on the Mac.",
    name: "samueljim",
    source: QuoteSource.GitHub,
    link: 'https://github.com/noah-nuebling/mac-mouse-fix/issues/105',
    permission: PermissionToShare.None
  },
  {
    quote: "The UI in V2 is fantastic and very intuitive.",
    name: "nghtstr",
    source: QuoteSource.GitHub,
    link: 'https://github.com/noah-nuebling/mac-mouse-fix/issues/135',
    permission: PermissionToShare.None
  },
  {
    quote: "SUPER NICE APPLICATION",
    name: "Chien Wei Chek",
    source: QuoteSource.GitHub,
    link: 'https://github.com/noah-nuebling/mac-mouse-fix/issues/136',
    permission: PermissionToShare.None
  },
  {
    quote: "The vertical scroll is just awesome",
    name: "nickcolea",
    source: QuoteSource.GitHub,
    link: 'https://github.com/noah-nuebling/mac-mouse-fix/issues/378',
    permission: PermissionToShare.None
  },
  {
    quote: "I really appreciate the simplicity it brings.",
    name: "chamburr",
    source: QuoteSource.GitHub,
    link: 'https://github.com/noah-nuebling/mac-mouse-fix/issues/150',
    permission: PermissionToShare.None
  },
  {
    quote: "A must have app for any Mac user with a mouse.",
    name: "4332weizi",
    source: QuoteSource.GitHub,
    link: 'https://github.com/noah-nuebling/mac-mouse-fix/issues/326',
    permission: PermissionToShare.None
  },
  {
    quote: "I spent last week without it because I’d installed Ventura and my whole workflow was interrupted. Thank you for such a brilliant app.",
    name: "nianiam",
    source: QuoteSource.GitHub,
    link: 'https://github.com/noah-nuebling/mac-mouse-fix/issues/326',
    permission: PermissionToShare.None
  },
  {
    quote: "Your app is incredible and absolutely vital to my workflow. I literally can't use my mac without MMF.",
    name: "ar311krypton",
    source: QuoteSource.GitHub,
    link: 'https://github.com/noah-nuebling/mac-mouse-fix/issues/369',
    permission: PermissionToShare.None
  },
  {
    quote: "Thanks, the app is very cool",
    name: "danilinus",
    source: QuoteSource.GitHub,
    link: 'https://github.com/noah-nuebling/mac-mouse-fix/issues/393',
    permission: PermissionToShare.None
  },
  {
    quote: "Your tool is literally the only way how I can use macOS (with a mouse especially) without freaking out!",
    name: "BlackBird11",
    source: QuoteSource.GitHub,
    link: 'https://github.com/noah-nuebling/mac-mouse-fix/issues/414',
    permission: PermissionToShare.None
  },
  {
    quote: "This has nearly doubled my productivity",
    name: "holdingsllc",
    source: QuoteSource.GitHub,
    link: 'https://github.com/noah-nuebling/mac-mouse-fix/issues/419',
    permission: PermissionToShare.None
  },
  {
    quote: "After switching to a mouse, I tried software such as SteerMouse, which received many recommendations and even charges, and finally found that this software meets my needs perfectly, every feature is very useful, and the performance is very good!",
    name: "SamyukL",
    source: QuoteSource.GitHub,
    link: 'https://github.com/noah-nuebling/mac-mouse-fix/issues/449',
    permission: PermissionToShare.None
  },
  {
    quote: "It works perfectly with my mouse",
    name: "wnavarrobr",
    source: QuoteSource.GitHub,
    link: 'https://github.com/noah-nuebling/mac-mouse-fix/issues/455',
    permission: PermissionToShare.None
  },
  {
    quote: "This software is amazing!",
    name: "NicolaeS",
    source: QuoteSource.StackExchange,
    link: 'https://apple.stackexchange.com/a/371342/308049',
    permission: PermissionToShare.None
  },
  {
    quote: "This is great software and solved all my mouse issues.",
    name: "Mladen Mihajlovic",
    source: QuoteSource.StackExchange,
    link: 'https://superuser.com/a/1699506',
    permission: PermissionToShare.None
  },
  {
    quote: "Works like a charm and it's easy to set up!",
    name: "Tomáš Nesrovnal",
    source: QuoteSource.StackExchange,
    link: 'https://apple.stackexchange.com/a/371330/308049',
    permission: PermissionToShare.None
  },
  {
    quote: "Beautiful piece of libre software. Thank you for your contribution to the open source cause.",
    name: "yonitubul",
    source: QuoteSource.Reddit,
    link: 'https://www.reddit.com/r/macapps/comments/s5h7gb/mac_mouse_fix_2_featuring_nativefeeling_gestures/',
    permission: PermissionToShare.None
  },
  {
    quote: "Cannot imagine using my office Mac without this software. Real productivity booster paired with my evoluent vertical mouse which does not have a driver for Mac like they do for Windows.",
    name: "abhimadav",
    source: QuoteSource.Reddit,
    link: 'https://www.reddit.com/r/macapps/comments/s5h7gb/mac_mouse_fix_2_featuring_nativefeeling_gestures/',
    permission: PermissionToShare.None
  },
  {
    quote: "Thank you for this, i don't understand why apple didn't make this as default, like it's super intuitive doing gestures with the middle click.",
    name: "couch_ech",
    source: QuoteSource.Reddit,
    link: 'https://www.reddit.com/r/macapps/comments/s5h7gb/mac_mouse_fix_2_featuring_nativefeeling_gestures/',
    permission: PermissionToShare.None
  },
  {
    quote: "This App Makes Your Cheap Mouse Work Better Than Trackpad Gestures",
    name: "Pranay Parab",
    source: QuoteSource.Lifehacker,
    link: 'https://lifehacker.com/this-app-makes-your-cheap-mouse-work-better-than-trackp-1848416099',
    permission: PermissionToShare.None
  },
  {
    quote: "I recommend Mac Mouse Fix, honestly it’s the cheapest, simple, and most well coded app I have yet seen.",
    name: "Rafiq_Kobayashi",
    source: QuoteSource.Reddit,
    link: 'https://www.reddit.com/r/MacOS/comments/y9q18r/comment/it80ce6/?utm_source=share&utm_medium=web2x&context=3',
    permission: PermissionToShare.None
  },
  {
    quote: "Awesome app, it definitely deserves to be shared widely with others 😁",
    name: "Jeff Su",
    source: QuoteSource.YoutubeComment,
    link: 'https://www.youtube.com/watch?v=gkYNdy-Hig4',
    permission: PermissionToShare.None
  },
  {
    quote: "Love this app so much, it's a must-have!",
    name: "LinusGeffarth",
    source: QuoteSource.GitHub,
    link: 'https://github.com/noah-nuebling/mac-mouse-fix/issues/297#issuecomment-1211926291',
    permission: PermissionToShare.None
  },

]

/*
  {
    quote: "",
    name: "",
    source: QuoteSource.,
    link: '',
    permission: PermissionToShare.
  },
  */
  


</script>

<style lang="postcss" scoped>



</style>