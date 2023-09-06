<!-- 

  Notes:
  - On the wrapper for the "see it in action" button we had to set `min-h-[52px]` instead of h-[52px], for it to actually work. No idea why.


 -->

<template>
  <div>

   

    <i18n-t tag="h2" keypath="trackpad-features.title" class="whitespace-pre-wrap xl:text-7xl md:text-6xl text-5xl font-bold tracking-tight mb-0 mt-20 text-gray-800">
      <template #track> 
        <span class="text-gradient-blue">{{ $t('trackpad-features.title.track')}}</span> 
      </template>
    </i18n-t>


    <i18n-t tag="p" keypath="trackpad-features.body" class="whitespace-pre-wrap text-[1.5rem] leading-[1.5] font-medium text-gray-500/80 mb-[5rem] mt-[5rem] w-max-[60rem]"></i18n-t>

    <div class="bg-gray-200/50 rounded-[16px] px-3 pt-3 pb-3 mb-6 shadow-sm-inset">
      <i18n-t tag="p" keypath="trackpad-features.cards.hint.0" class="whitespace-pre-wrap text-normal text-center font-normal text-gray-500/70 mb-1 mt-0 w-max-[60rem]"></i18n-t>
      <i18n-t tag="p" keypath="trackpad-features.cards.hint.1" class="whitespace-pre-wrap text-normal text-center font-normal text-gray-500/70 mb-0 mt-0 w-max-[60rem]"></i18n-t>
    </div>
    <div class="">
      <div class="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 py-4">

        <NormalFeatureCard titleKey="feature.spaces.title" bodyKey="feature.spaces.body" :videoPath="remapDemoVideoPath" class="bg-gradient-pink shadow-red-900/30"/>
        <NormalFeatureCard titleKey="feature.mission-control.title" bodyKey="feature.mission-control.body" :videoPath="remapDemoVideoPath" class="bg-gradient-orange shadow-orange-900/30"/>
        <NormalFeatureCard titleKey="feature.app-expose.title" bodyKey="feature.app-expose.body" :videoPath="remapDemoVideoPath" class="bg-gradient-blue shadow-blue-900/40"/>


        <!-- <FeatureCard class="feature-card col-span-auto bg-gradient-orange shadow-md shadow-orange-900/30">
          <template v-slot:default>
            <div class="m-6">
              <h3 class="dark-bg">Mission Control</h3>
              <p class="dark-bg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Quisquam, voluptatum.</p>
              <a href="" class="mt-2 text-gray-100 underline">See it in action ❯</a>
            </div>
          </template>
          <template v-slot:expanded>
            <video id="vid1" preload="auto" playsinline loop autoplay alt="Remap Demo" class="w-full">
              <source src="~assets/video/remap_demo_old.mp4#t=0.1" type="video/mp4">
            </video>
          </template>
        </FeatureCard> -->
        <!-- <FeatureCard class="feature-card col-span-auto bg-gradient-blue shadow-md shadow-blue-900/40">
          <template v-slot:default>
            <div class="m-6">
              <h3 class="dark-bg">App Exposé</h3>
              <p class="dark-bg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Quisquam, voluptatum.</p>
            </div>
          </template>
          <template v-slot:expanded>
            <video id="vid1" preload="auto" playsinline loop autoplay alt="Remap Demo" class="w-full">
              <source src="~assets/video/remap_demo_old.mp4#t=0.1" type="video/mp4">
            </video>
          </template>
        </FeatureCard> -->
        <FeatureCard class="feature-card col-span-auto bg-white">
          <template v-slot:default>
            <div class="m-6">
              <h3>Show Desktop</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Quisquam, voluptatum.</p>
            </div>
          </template>
          <template v-slot:expanded>
            <video id="vid1" preload="auto" playsinline loop autoplay alt="Remap Demo" class="w-full">
              <source src="~assets/video/remap_demo_old.mp4#t=0.1" type="video/mp4">
            </video>
          </template>
        </FeatureCard>
        <FeatureCard class="feature-card col-span-auto bg-white">
          <template v-slot:default>
            <div class="m-6">
              <h3>Launchpad</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Quisquam, voluptatum.</p>
            </div>
          </template>
          <template v-slot:expanded>
            <video id="vid1" preload="auto" playsinline loop autoplay alt="Remap Demo" class="w-full">
              <source src="~assets/video/remap_demo_old.mp4#t=0.1" type="video/mp4">
            </video>
          </template>
        </FeatureCard>
        <FeatureCard class="feature-card col-span-auto bg-white">
          <template v-slot:default>
            <div class="m-6">
              <h3>Look Up & Data Detectors</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Quisquam, voluptatum.</p>
            </div>
          </template>
          <template v-slot:expanded>
            <video id="vid1" preload="auto" playsinline loop autoplay alt="Remap Demo" class="w-full">
              <source src="~assets/video/remap_demo_old.mp4#t=0.1" type="video/mp4">
            </video>
          </template>
        </FeatureCard>
        <FeatureCard class="feature-card col-span-auto bg-white">
          <template v-slot:default>
            <div class="m-6">
              <h3>Move between Pages</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Quisquam, voluptatum.</p>
            </div>
          </template>
          <template v-slot:expanded>
            <video id="vid1" preload="auto" playsinline loop autoplay alt="Remap Demo" class="w-full">
              <source src="~assets/video/remap_demo_old.mp4#t=0.1" type="video/mp4">
            </video>
          </template>
        </FeatureCard>
        <FeatureCard class="feature-card col-span-auto bg-white">
          <template v-slot:default>
            <div class="m-6">
              <h3>Mark Mails as Unread</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Quisquam, voluptatum.</p>
            </div>
          </template>
          <template v-slot:expanded>
            <video id="vid1" preload="auto" playsinline loop autoplay alt="Remap Demo" class="w-full">
              <source src="~assets/video/remap_demo_old.mp4#t=0.1" type="video/mp4">
            </video>
          </template>
        </FeatureCard>
        <FeatureCard class="feature-card col-span-auto bg-white">
          <template v-slot:default>
            <div class="m-6">
              <h3>Scroll Freely</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Quisquam, voluptatum.</p>
            </div>
          </template>
          <template v-slot:expanded>
            <video id="vid1" preload="auto" playsinline loop autoplay alt="Remap Demo" class="w-full">
              <source src="~assets/video/remap_demo_old.mp4#t=0.1" type="video/mp4">
            </video>
          </template>
        </FeatureCard>
        <FeatureCard class="feature-card col-span-auto bg-white">
          <template v-slot:default>
            <div class="m-6">
              <h3>Pinch to Zoom</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Quisquam, voluptatum.</p>
            </div>
          </template>
          <template v-slot:expanded>
            <video id="vid1" preload="auto" playsinline loop autoplay alt="Remap Demo" class="w-full">
              <source src="~assets/video/remap_demo_old.mp4#t=0.1" type="video/mp4">
            </video>
          </template>
        </FeatureCard>
        <FeatureCard class="feature-card col-span-auto bg-white">
          <template v-slot:default>
            <div class="m-6">
              <h3>Smart Zoom</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Quisquam, voluptatum.</p>
            </div>
          </template>
          <template v-slot:expanded>
            <video id="vid1" preload="auto" playsinline loop autoplay alt="Remap Demo" class="w-full">
              <source src="~assets/video/remap_demo_old.mp4#t=0.1" type="video/mp4">
            </video>
          </template>
        </FeatureCard>
      </div>
    </div>
    <p class="text-xl text-center text-xs text-gray-500/70 mb-7 mt-10 w-max-[60rem]">* Mac Mouse Fix can only bring all of the Trackpad-features to your third-party mouse in the way described, if your mouse has at least 5 buttons which are recognized by Mac Mouse Fix. If Mac Mouse Fix recognizes less than 5 buttons on your mouse, Mac Mouse Fix will still work great with it, but you will have to set it up in a different way to use all of the Trackpad features listed here.\nMac Mouse Fix does not currently support the Apple Magic Mouse.</p>

    <!-- <h2 class="xl:text-7xl md:text-6xl text-5xl font-bold tracking-tight mb-20 mt-20 text-gray-800">Make Your Mouse Do<br>Anything You Can <span class="text-gradient-orange">Think </span>of.<br>As Fast as You Can Think of It.</h2> -->
    <!-- <h2 class="xl:text-7xl md:text-6xl text-5xl font-bold tracking-tight mb-20 mt-20 text-gray-800"><span class="text-gradient-orange">Think </span>It.<br>Then Make Your Mouse Do It.</h2> -->
    <!-- <h2 class="xl:text-7xl md:text-6xl text-5xl font-bold tracking-tight mb-20 mt-20 text-gray-800"><span class="text-gradient-blue">Think </span>It. <span class="text-gradient-green-yellow">Click</span> It.<span class="text-gradient-orange"> Do</span> It.</h2> -->
    <!-- <h2 class="xl:text-7xl md:text-6xl text-5xl font-bold tracking-tight mb-20 mt-20 text-gray-800"><span class="text-gradient-blue">Think </span>It.<br> <span class="text-gradient-green-yellow">Click</span> It.<br><span class="text-gradient-orange">Do</span> It.</h2> -->
    <!-- <h2 class="xl:text-7xl md:text-6xl text-5xl font-bold tracking-tight mb-20 mt-20 text-gray-800">As <span class="text-gradient-green-yellow">Flexible</span> as Your Mind.<br>As <span class="text-gradient-orange">Fast</span> As You Can Think.</h2> -->
    
    <i18n-t tag="h2" keypath="remap-engine.title" class="whitespace-pre-wrap xl:text-7xl md:text-6xl text-5xl font-bold tracking-tight mb-20 mt-20 text-gray-800">
      <template #first>
        <span class="text-gradient-green-yellow"> {{ $t('remap-engine.title.first') }}</span>
      </template>
      <template #second>
        <span class="text-gradient-orange"> {{ $t('remap-engine.title.second') }}</span>
      </template>
    </i18n-t>
    
    <i18n-t tag="p" keypath="remap-engine.body" class="text-2xl font-medium text-gray-500/80 mb-20 w-max-[60rem]"></i18n-t>


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

/* Import i18n stuff
    Note: Why can't we use $i18n in ts like we do in html? */

const { setLocale, locale, defaultLocale } = useI18n() 

/* Call setLocale on locale update
    Notes: 
    - Otherwise the url doesn't update. No idea what we are doing 
    - The <select> language picker updates the locale */

watch(locale, () => {
  setLocale(locale.value);
})

/* Manually import video assets
    Note I feel like this is way too cumbersome. We know in advance which videos to import anyways (so we don't need 'dynamic' imports which should make it even easier) so why do we have to manually import in code? It should automatically import the static assets we use.
    Also See: https://stackoverflow.com/questions/75218697/nuxt-dynamic-image-require-is-not-defined
*/
import remapDemoVideoPath from '../assets/video/remap_demo_old.mp4'

</script>

<style lang="postcss">

  /* Card Content */

  .feature-card h3 { /* Not sure this abstraction is good / tailwindy. See https://tailwindcss.com/docs/reusing-styles */
    @apply text-lg font-bold;
  }
  .feature-card p {
    @apply text-gray-500/80;

    &:not(:last-child)  { /* Paragraph spacing */
      @apply mb-3
    }
  }

  .feature-card h3.dark-bg { /* Not sure this abstraction is good / tailwindy. See https://tailwindcss.com/docs/reusing-styles */
    @apply text-lg font-bold text-gray-100;
  }

  .feature-card p.dark-bg {
    @apply text-gray-100/75;
  }

  .video-wrapper { 

    /* Note: Keep the border color, width and radius in sync with the FeatureCard to make it look nice */

    @apply  grow
            rounded-[24px] border-[4px] m-[-4px] border-gray-50/25 
            overflow-clip
            flex items-center justify-center;
  }
/* 
  .ass-shadow {
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.08), 0 4px 16px 0 rgba(0, 0, 0, 0.08), 0 8px 32px 0 rgba(0, 0, 0, 0.08), inset 0 1px 0 0 rgba(255, 255, 255, 0.30)
  }

  .ass-low-shadow {
    box-shadow: 0px 0.5px 3px 1px rgba(0, 0, 0, 0.1), 0 1px 8px 0 rgba(0, 0, 0, 0.08), inset 0 1px 0 0 rgba(255, 255, 255, 0.30)
  } */

  .orange-shadow { /* Unused now. Remove */
    box-shadow: 0px 2px 4px 0px rgba(71, 30, 0, 0.3),0px 4px 16px 0px rgba(145, 60, 1, 0.3),0px 8px 32px 0px rgba(145, 60, 1, 0.3);
  }

</style>