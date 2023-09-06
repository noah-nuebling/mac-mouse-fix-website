<!-- 
  This component creates a FeatureCard component with a title, body text as default content, and a video as expanded content. The text isn't passed in directly but instead the localization keys are passed in. 
-->

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

  /* Card Content 
      TODO: Remove this and use pure tailwind classes instead */

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