<!-- 
  This component creates a FeatureCard component with a title, body text as default content, and a video as expanded content. The text isn't passed in directly but instead the localization keys are passed in. 
-->

<template>
  <FeatureCard ref="moveSpacesCard" class="feature-card col-span-auto cursor-pointer group shadow-md" contentContainerClass="" @click="$refs.moveSpacesCard.expand()">
    <template v-slot:top> 
      <h3 class="text-2xl font-bold text-white/100 m-6 shadow-black/100">{{ $t(titleKey) }}</h3>
    </template>
    <template v-slot:default>
      <div class="flex flex-row items-stretch h-full m-6 mt-0 mb-3">
        <div>
          <p class="text-base text-white/100 whitespace-pre-wrap shadow-black/100">{{ $t(bodyKey) }}</p>
        </div>        
      </div>
      <div class="rounded-[0px] border-t-[4px] mt-5 border-gray-50/20 min-h-[52px] flex items-center justify-center cursor-pointer group-hover:underline">
        <!-- vvv Can't seem to give the inline play button image a shadow vvv -->
        <a class="text-lg dark-bg text-white/100 text-center shadow-black/100"><span class="">{{ $t('feature-card.expand-button') }}</span><span class="inline-space-[8]"/><img src="~/assets/img/play.circle@2x.png" alt="Play Video Icon" class="ml-[0px] inline h-[1.16rem] align-[-3.6px] filter brightness-0 invert drop-shadow-xl"></a>
      </div>
    </template>
    <template v-slot:expanded>

      <div class="
            grow
            rounded-[24px] border-[4px] m-[-4px] border-gray-50/25 
            overflow-clip
            flex items-center justify-center">

        <!-- Note: Keep the border color, width and radius of the video wrapper in sync with the FeatureCard to make it look nice -->

        <video id="vid1" preload="auto" playsinline loop autoplay alt="Remap Demo" class="object-cover w-full h-full">
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