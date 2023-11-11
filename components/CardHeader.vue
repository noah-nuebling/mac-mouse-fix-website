
<template>
  <div>
    <div class="bg-gray-200/50 rounded-[16px] px-5 py-3 shadow-none flex flex-row items-center border-[1px] border-gray-400/25">
      <img v-if="iconPath" :src='iconPath' alt='Icon' :class="['mr-3 h-[1.9em] translate-y-[0.0rem] drop-shadow-xl', $props.iconClass]">
      <div>
        <p v-html="$mt(titleKey)" class="whitespace-pre-wrap text-[1.6rem] leading-[1.7rem] text-start font-normal text-gray-800/70 mb-[0.25rem] w-max-[60rem]"></p>
        <p v-if="!hideVideoHint || subtitleKey" class="whitespace-pre-wrap text-normal text-start font-normal text-gray-700/70 mb-0 mt-[0.5rem] ml-1 w-max-[60rem]">
          <span v-html="$mt(subtitleKey ? subtitleKey : 'card-header.video-hint')"></span>
        </p>
      </div>
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