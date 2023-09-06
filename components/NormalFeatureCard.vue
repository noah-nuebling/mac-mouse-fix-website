<template>
  <FeatureCard ref="moveSpacesCard" class="feature-card col-span-auto cursor-pointer group shadow-md" @click="$refs.moveSpacesCard.expand()">
    <template v-slot:top> 
      <h3 class="dark-bg m-6">{{ $t(titleKey) }}</h3>
    </template>
    <template v-slot:default>
      <div class="flex flex-row items-stretch h-full m-6 mt-0 mb-3">
        <div>
          <p class="dark-bg whitespace-pre-wrap">{{ $t(bodyKey) }}</p>
        </div>        
      </div>
      <div class="rounded-[0px] border-[4px] m-[-4px] border-gray-50/20 min-h-[52px] flex items-center justify-center mt-5 cursor-pointer group-hover:underline">
        <a class="text-base dark-bg text-gray-50/90 text-center"><span class="">{{ $t('feature-card.expand-button') }}</span><span class="inline-space-[8]"/><img src="~/assets/img/play.circle@2x.png" alt="Play Video Icon" class="ml-[0px] inline h-[1.16rem] align-[-3.6px] contrast-200"></a>
      </div>
    </template>
    <template v-slot:expanded>
      <div class="video-wrapper">
        <video id="vid1" preload="auto" playsinline loop autoplay alt="Remap Demo" class="object-cover w-full h-full">
          <source :src="require(`../../assets/video/remap_demo_old.mp4`)" type="video/mp4">
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
  videoName: String,
})

</script>

<style scoped lang="postcss">

</style>