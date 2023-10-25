<!-- 
  This component creates a FeatureCard component with a title, body text as default content, and a video as expanded content. The text isn't passed in directly but instead the localization keys are passed in. 
-->

<template>
  <FeatureCard 
    ref="thisCard"
    class="feature-card col-span-auto group shadow-md rounded-[24px]" 
    borderClass="border-[4px] border-gray-50/25"
    :backgroundFilterClass="backgroundFilterClass"
    :doesExpand="videoPath ? true : false"

    @click="$refs.thisCard.expand()">

    <template v-slot:top> 
      <h3 class="m-[1.4rem] text-[1.5rem] font-bold text-white/100 shadow-black/100" v-html="$mt(titleKey)"></h3>
    </template>

    <template v-slot:default>
      <div class="flex flex-col items-center justify-start h-full m-[1.4rem] mt-0 mb-[1.9rem]">
        <div>
          <p class="text-[1.05rem] text-white/100 whitespace-pre-wrap shadow-black/100 max-w-[30em]" v-html="$mt(bodyKey)"></p>
        </div>        
        <div v-if="imagePath" :class="imageClass">
          <img :src="imagePath" class="" alt="">
        </div>
      </div>
      <div v-if="videoPath" :class="['mt-[0.0rem] rounded-[0px] border-t-[4px] border-gray-50/20 min-h-[3.25rem] flex items-center justify-center group-hover:underline', backgroundFilterClass]">
        <!-- vvv Can't seem to give the inline play button image a shadow vvv -->
        <a class="text-[1.075rem] font-[600] dark-bg text-white/100 text-center shadow-black/100"><span class="" v-html="$mt(expandButtonKey ? expandButtonKey : 'feature-card.expand-button')"></span><span class="inline-space-[8]"/><img src="~/assets/img/play.circle@2x.png" alt="Play Video Icon" class="ml-[0px] inline h-[1.16rem] align-[-3.6px] filter brightness-0 invert drop-shadow-xl"></a>
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

import { $mt, $mto } from '~/utils/markdownTranslate';
import remapDemoVideo from '@/assets/video/remap_demo_old.mp4';

var props = defineProps({
  titleKey: String,
  bodyKey: String,
  imagePath: String,
  imageClass: String,
  videoPath: String,
  expandButtonKey: String,
  backgroundFilterClass: String,
})

</script>

<style scoped lang="postcss">

  /* Avoid styling here when using tailwind. See https://tailwindcss.com/docs/reusing-styles. */

</style>