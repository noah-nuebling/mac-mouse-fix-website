
<template>
  <div>
    <div class="bg-gray-200/50 rounded-[16px] px-6 py-3 shadow-sm-inset flex flex-row items-center">
      <img :src='iconPath' alt='Play Video Icon' :class="['mr-4 h-[1.9em] translate-y-[0.0rem] drop-shadow-xl', $props.iconClass]">
      <div>
        <p v-html="$mt(titleKey)" class="whitespace-pre-wrap text-[1.6rem] leading-[1.7rem] text-start font-normal text-gray-800/70 mb-[0.25rem] w-max-[60rem]"></p>
        <p v-if="!hideVideoHint" class="whitespace-pre-wrap text-normal text-start font-normal text-gray-700/70 mb-0 mt-[0.5rem] ml-1 w-max-[60rem]">
          <span v-html="$mt('video-card-hint.0')"></span>
          <img src='~/assets/img/play.circle@2x.png' alt='Play Video Icon' class='hidden ml-[9px] mr-[5px] inline h-[1.1em] align-[-3.0px] filter brightness-0 drop-shadow-xl'>
          <span>&nbsp;</span>
          <span v-html="$mt('video-card-hint.1')"></span>
        </p>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">

import { $mt } from '#imports';

var props = defineProps({
  titleKey: String,
  iconPath: String,
  iconClass: String,
  hideVideoHint: Boolean,
})

</script>

<style lang="postcss" scoped>

</style>