<!-- 
  This component creates a FeatureCard component with a title, body text as default content, and a video as expanded content. The text isn't passed in directly but instead the localization keys are passed in. 
-->

<template>
  <FeatureCard ref="moveSpacesCard" class="feature-card col-span-auto cursor-pointer group shadow-md" @click="$refs.moveSpacesCard.expand()">
    

    <template v-slot:default>

    </template>
    <template v-slot:expanded>
      
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