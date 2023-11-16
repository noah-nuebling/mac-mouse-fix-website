<!-- 
  This component creates a FeatureCard component with a title, body text as default content, and a video as expanded content. The text isn't passed in directly but instead the localization keys are passed in. 
-->

<template>

  <FeatureCard 
    ref="thisCard"
    class="h-full feature-card col-span-auto group shadow-refactoringui !shadow-black/[0.06] rounded-[1.5rem] !text-black/[0.8] !bg-neutral-50/50 !backdrop-blur-xl" 
    borderClass="border-[0px] border-black/[0.05]"
    :backgroundFilterClass="backgroundFilterClass"
    :doesExpand="videoPath ? true : false"
    

    @click="$refs.thisCard.toggleExpand()">

    <template v-slot:top>
      
      <!-- Spacer -->
      <div :class="['', videoPath ? 'h-[3.0rem]' : 'h-[2.75rem]']"></div>
      <!-- Expand button -->
      <div v-if="videoPath" class="absolute h-fit mt-[1.4rem] left-[50%] translate-x-[-50%]">
        <a class="w-full text-center sm:text-[1.0rem] text-[1.0rem] font-[400] text-gradient-to-l cool-hover-underline">
          <span :class="['', isExpanded ? '' : 'opacity-0 absolute border']">
            <span v-html="$mt('feature-card.unexpand-button')"></span> <span class="inline-space-[8] hidden"/> <img src="~/assets/img/play.circle@2x.png" alt="Play Video Icon" class="ml-[0px] inline h-[1.16rem] align-[-2.6px] svg-filter-[tint-blue] hidden">
          </span>
          <span :class="['', isExpanded ? 'opacity-0 absolute' : '']" v-html="$mt(expandButtonKey ? expandButtonKey : 'feature-card.expand-button') + ' 􀊕'"></span>
        </a>
      </div>
      <!-- Title -->
      <h3 :class="['strong:font-weight-inherit text-center sm:text-[1.4rem] text-[1.6rem] leading-[1.3] font-[650] sm:mx-[2rem] mx-[3rem]', titleClass]" v-html="$mt(titleKey!)"></h3>
    </template>

    <template v-slot:default>
      <div class="flex flex-col items-center justify-start h-full sm:m-[2rem] m-[3.0rem] sm:mt-[1.33rem] mt-[2.75rem] ">

        <!-- Body -->
        <div>
          <p class="strong:font-[500]  sm:text-[1.0rem] text-[1.0rem] font-[400] whitespace-pre-wrap max-w-[30em]" v-html="$mt(bodyKey!)"></p>
        </div>        

        <!-- Image -->
        <div v-if="imagePath" :class="imageClass">
          <img :src="imagePath" class="" alt="">
        </div>

      </div>
    </template>

    <template v-slot:expanded>

      <!-- Video -->
      <div class="

            grow
            rounded-b-[1.5rem] border-[0px] mt-[1.4rem] border-black/[0.05]
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

// import { $mt, $mto } from '~/utils/markdownTranslate';
const $mt = useMT()
import type { FeatureCard } from '#build/components';
import remapDemoVideo from '@/assets/video/remap_demo_old.mp4';


const thisCard = ref<InstanceType<typeof FeatureCard> | null>(null)

const isExpanded = computed(() => thisCard.value?.isExpanded || thisCard.value?.isAnimationExpanded) // This is hacky but makes animations look nicer

var props = defineProps({
  titleKey: String,
  bodyKey: String,
  imagePath: String,
  imageClass: String,
  videoPath: String,
  expandButtonKey: String,
  backgroundFilterClass: String,
  titleClass: String,
})

</script>

<style scoped lang="postcss">

  /* Avoid styling here when using tailwind. See https://tailwindcss.com/docs/reusing-styles. */


  .group:hover .cool-hover-underline:after {

    /* Custom underline, because normal css underline doesnt work when we apply gradient to text */

    @apply content-[''] absolute left-0 w-full bottom-[2.5px] h-[1px] rounded-[1px] bg-gradient-to-l
  }

</style>