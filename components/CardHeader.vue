
<template>
  <div :class="['bg-transparent rounded-[16px] px-5 pb-3 pt-[4rem] shadow-none flex flex-row items-center justify-center border-[1px] border-gray-400/25', $attrs.class]">
    <img v-if="iconPath" :src='iconPath' alt='Icon' :class="['hidden mr-3 h-[1.9em] translate-y-[0.0rem] drop-shadow-xl', $props.iconClass]">
    <div class="">
      <p v-html="$mt(titleKey)" class="whitespace-pre-wrap text-[1.8rem] leading-[1.7rem] text-center text-neutral-950/80 mb-[0.25rem] w-max-[60rem]"></p>
      <p v-if="!hideVideoHint || subtitleKey" class="hidden whitespace-pre-wrap text-normal text-center font-normal text-gray-700/70 mb-0 mt-[0.5rem] ml-1 w-max-[60rem]">
        <span v-html="$mt(subtitleKey ? subtitleKey : 'card-header.video-hint')"></span>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">

// import { $mt } from '#imports';
const $mt = useMT()

var props = defineProps({
  titleKey: String,
  subtitleKey: String,
  iconPath: String,
  iconClass: String,
  hideVideoHint: Boolean,
})

</script>

<style lang="postcss" scoped>

</style>