<!-- 
  This component creates a FeatureCard component with a title, body text as default content, and a video as expanded content. The text isn't passed in directly but instead the localization keys are passed in. 
-->

<template>

  <FeatureCard 
    ref="thisCard"
    class="h-full feature-card col-span-auto group shadow-md rounded-[1.5rem] !text-black/[0.8] !bg-gradient-to-b !from-neutral-50/50 !to-neutral-50/50 !backdrop-blur-xl !shadow-black/[0.05] !text-shadow-none " 
    borderClass="border-[0px] border-black/[0.05] "
    :backgroundFilterClass="backgroundFilterClass"
    :doesExpand="videoPath ? true : false"

    @click="$refs.thisCard.expand()">

    <template v-slot:top>
      <div class="rounded-[5px] px-[5px] translate-x-[-0.0rem] h-fit m-[1.4rem] mb-[-1rem] flex justify-center">
        <a class="text-blue-500 w-full text-center text-[1.0rem] font-[400] dark-bg  shadow-black/100">
          <span :class="['', isExpanded ? '' : 'opacity-0 absolute']">
            <span v-html="$mt('feature-card.unexpand-button') + ' 􀊗'"></span> <span class="inline-space-[8]"/> <img src="~/assets/img/play.circle@2x.png" alt="Play Video Icon" class="ml-[0px] inline h-[1.16rem] align-[-2.6px] drop-shadow-xl svg-filter-[tint-blue] hidden">
          </span>
          <span :class="['', isExpanded ? 'opacity-0 absolute' : '']" v-html="$mt(expandButtonKey ? expandButtonKey : 'feature-card.expand-button') + ' 􀊕'"></span>
        </a>
      </div>
      <h3 class="text-center m-[1.4rem] mt-[1rem] text-[1.6rem] font-[650] shadow-black/100" v-html="$mt(titleKey!)"></h3>
    </template>

    <template v-slot:default>
      <div class="flex flex-col items-center justify-start h-full m-[1.4rem] mt-[1.4rem] mb-[-0.0rem]">
        <div>
          <p class="text-[1.0rem] !font-[400] whitespace-pre-wrap shadow-black/100 max-w-[30em]" v-html="$mt(bodyKey!)"></p>
        </div>        
        <div v-if="imagePath" :class="imageClass">
          <img :src="imagePath" class="" alt="">
        </div>
      </div>
      <div v-if="videoPath" :class="['mx-[1.5rem] mb-[0.8rem] mt-[-0rem] rounded-[0px] border-t-[0px] border-neutral-950/[0.05] min-h-[3.25rem] flex items-center justify-start group-hover:underline', backgroundFilterClass]">
        <!-- vvv Can't seem to give the inline play button image a shadow vvv -->
        
      </div>
    </template>

    <template v-slot:expanded>

      <div class="
            grow
            rounded-[1.5rem] border-[0px] m-[-0px] border-black/[0.05]
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
})

</script>

<style scoped lang="postcss">

  /* Avoid styling here when using tailwind. See https://tailwindcss.com/docs/reusing-styles. */

</style>