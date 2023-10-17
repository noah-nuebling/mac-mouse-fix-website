<!-- 
  Copied from NormalFeatureCard but with adjustments for white background with image on the card
-->

<template>
  <FeatureCard 
    ref="thisCard"
    class="feature-card col-span-auto group shadow-md rounded-[24px] shadow-black/30 text-shadow-sm"
    backgroundFilterClass="backdrop-blur-2xl" 
    borderClass="border-[4px] border-gray-50/25 rounded-[24px]"

    @click="$refs.thisCard.expand()">

    <template v-slot:top> 
      <h3 class="text-2xl font-bold text-white/90 text-shadow-sm m-6 shadow-black/30">⌘ Keyboard Shortcuts</h3>
    </template>
    <template v-slot:default>
      <div class="flex flex-col items-center h-full m-6 -mt-0 mb-3">
        <div class="min-w-full -mx-6">
          <!-- <img src="~assets/img/mac-menubar-ventura.png" alt=""> -->
        </div>
        <div>
          <p class="text-base text-white/100 whitespace-pre-wrap shadow-black/30 text-shadow-sm">Use keyboard shortcuts straight from your mouse. So you can <b>copy and paste, undo and redo, switch between tabs in Safari, control media playback or audio volume</b>, and pretty much anything else you can think of - all with the press of a mouse button.</p>
        </div>
        <div class="w-[1400px] mt-1 mb-[-245px] translate-x-[345px] hidden">
          <img src="~assets/img/mmf-on-studio-display-keyboard.png" class="" alt="">
        </div>
        <div class="bg-white/50 rounded-[15px] backdrop-blur-xl shadow-md px-5 py-3 -mt-5 mb-9 hidden">
          <!-- <p class="text-base text-slate-900 whitespace-pre-wrap text-shadow-none shadow-black/100 text-start">{{ $t(bodyKey) }}</p> -->
          
          <p class="text-base text-slate-900/90 whitespace-pre-wrap text-shadow-none shadow-black/100 text-start mb-1">
            <b>Unlimited possibilities with Keyboard Shortcuts</b>
          </p>
          <p>
            Use keyboard shortcuts. So you <b>copy and paste, undo and redo, switch between tabs in Safari, control media playback or audio volume</b>, and pretty much anything else you can think of - straight from your mouse. 
          </p>  
        </div>
      </div>
      <div class="backdrop-blur-xl rounded-[0px] border-t-[4px] mt-5 border-gray-50/25 min-h-[52px] flex items-center justify-center cursor-pointer group-hover:underline">
        <!-- vvv Can't seem to give the inline play button image a shadow vvv -->
        <a class="text-lg dark-bg text-white/90 text-center shadow-black/100"><span class=""> See How To Add Keyboard Shortcuts To Your Mouse</span><span class="inline-space-[8]"/><img src="~/assets/img/play.circle-dark@2x.png" alt="Play Video Icon" class="ml-[0px] inline h-[1.16rem] align-[-3.6px] filter brightness-0 invert drop-shadow-xl"></a>
      </div>
    </template>
    <template v-slot:expanded>

      <div class="
            grow
            rounded-[24px] border-[4px] m-[-4px] border-gray-50/25 
            overflow-clip
            flex items-center justify-center
            ">

        <!-- Notes: 
          - Keep the border color, width and radius of the video wrapper in sync with the FeatureCard to make it look nice
          - We set autoplay here so the video preloads on iPhone. (src: https://stackoverflow.com/a/39104082/10601702) But we control playback from js.
        -->

        <video id="vid1" preload="auto" playsinline autoplay muted alt="Remap Demo" class="object-cover w-full h-full bg-black">
          <source :src="videoPath" type="video/mp4">
        </video>
      </div>
    </template>
    <!-- <template v-slot:bottom>
    </template> -->
  </FeatureCard>
</template>

<script setup lang="ts">

import remapDemoVideo from '@/assets/video/remap_demo_old.mp4';

var props = defineProps({
  titleKey: String,
  bodyKey: String,
  videoPath: String,
})

</script>

<style scoped lang="postcss">

  /* Avoid styling here when using tailwind. See https://tailwindcss.com/docs/reusing-styles. */

</style>