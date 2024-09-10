<!-- 
  This component creates a FeatureCard component with a title, body text as default content, and a video as expanded content. The text isn't passed in directly but instead the localization keys are passed in. 
-->

<template>

  <!--
    Notes on FeatureCard class:
    - shadow-lg2 puts the cards closer to the 'ground' than 'shadow-lg3'. The strong parallax was designed for shadow-lg3 iirc, but I still prefer the less 'floaty' feel of shadow-lg2 (August 2024)
    - Similarily, putting the opacity lower in `bg-neutral-50/[0.7]` makes the cards get a stronger tint from the color splashes in the background. This can look nice, but also makes it feel more 'floaty' or less 'solid'. 
  -->
  <FeatureCard 
    ref="thisCard" 
    class="h-full feature-card col-span-auto group shadow-lg3xxx shadow-lg2 !shadow-black/[0.045]xxx !shadow-black/[0.045] rounded-[1.5rem] !text-black/[0.8] bg-neutral-50/[0.7]xxx bg-neutral-50/[0.7] !backdrop-blur-xl" 
    borderClass="border-[0px] border-black/[0.05]"
    :contentClass="contentClass"
    :backgroundFilterClass="backgroundFilterClass"
    :doesExpand="videoPath ? true : false"
    :videoPath="videoPath"
    

    @click="$refs.thisCard.toggleExpand()">

    <template v-slot:top>
      
      <!-- Spacer -->
      <div :class="['', videoPath ? 'h-[3.0rem]' : 'h-[2.75rem]']"></div>
      <!-- Expand button -->
      <div v-if="videoPath" class="absolute h-fit mt-[1.4rem] left-[50%] translate-x-[-50%]">
        <a class="card-sm w-full text-center sm:text-[1.0rem] text-[1.0rem] font-[400] text-gradient-to-l group-hover:cool-underline ">
          <!-- Expand -->
          <!-- Note: The play.circle and stop.circle images have blue-500 color. we use the --accent-rotate var to change the color. -->
          <span :class="['', isExpanded ? 'opacity-0 absolute' : '']">
            <span class="" v-html="mdrf(MFLocalizedString(expandButtonKey ? expandButtonKey : 'feature-card.expand-button', '')) + ''"></span>
            <span class="inline-space-[0]"/><img src="~/assets/img/play.circle-blue@8x.png" alt="" class="ml-[0.4em] translate-x-[0em] inline wh-[1.00em] align-[-0.2em] filter hue-rotate-[var(--accent-rotate)]">
          </span>
          <!-- Unexpand -->
          <span :class="['', isExpanded ? '' : 'opacity-0 absolute']">
            <span v-html="mdrf(MFLocalizedString('feature-card.unexpand-button', ''))"></span>                                                        
            <span class="inline-space-[0]"/><img src="~/assets/img/pause.circle-blue@8x.png" alt="" class="ml-[0.4em] translate-x-[0em] inline wh-[1.00em] align-[-0.2em] filter hue-rotate-[var(--accent-rotate)]">
          </span>
        </a>
      </div>
      <!-- Title -->
      <h3 :class="['card-title text-center sm:text-[1.4rem] text-[1.7rem] leading-[1.3] font-[700] strong:font-[700] sm:mx-[2rem] mx-[3rem]', titleClass]" v-html="mdrf(MFLocalizedString(titleKey!, ''), dynamic)"></h3>
    </template>

    <template v-slot:default>
      <div class="flex flex-col items-center justify-start h-full sm:m-[2rem] m-[3.0rem] sm:mt-[1.33rem] mt-[2.75rem] ">

        <!-- Body -->
        <div v-html="mdrf(MFLocalizedString(bodyKey!, ''), dynamic, false)" class="card-sm strong:font-[500] sm:text-[1.05rem] text-[1.15rem] font-[400] max-w-[30em] not-last:ch-[ol,ul,p]:mb-[1em]"></div>

        <!-- Image -->
        <div v-if="imagePath" :class="[imageClass]">
          <NuxtImg :src="imagePath" :sizes="imageScalingSizes" class="" alt=""/>
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
          <source type="video/mp4" :src="''">
        </video>
      </div>
    </template>
    <!-- <template v-slot:bottom>
    </template> -->
  </FeatureCard>


</template>

<script setup lang="ts">

// import { $mt, $mto } from '~/utils/markdownTranslate';
const { $coolI18n: { mdrf, MFLocalizedString } } = useNuxtApp();
import type { FeatureCard } from '#build/components';
// import remapDemoVideo from '@/assets/video/remap_demo_old.mp4';


const thisCard = ref<InstanceType<typeof FeatureCard> | null>(null)

const isExpanded = computed(() => thisCard.value?.isExpanded || thisCard.value?.isAnimationExpanded) // This is hacky but makes animations look nicer

var props = defineProps({
  titleKey: String,
  bodyKey: String,
  dynamic: Object,
  imagePath: String,
  imageScalingSizes: String, // The intended size which NuxtImg uses for scaling the image down for optimization
  imageClass: String,
  videoPath: String,
  expandButtonKey: String,
  backgroundFilterClass: String,
  contentClass: String,
  titleClass: String,
})

</script>

<style scoped lang="postcss">

  /* Avoid styling here when using tailwind. See https://tailwindcss.com/docs/reusing-styles. */




</style>