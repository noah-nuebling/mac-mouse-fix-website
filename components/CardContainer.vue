<template>

  <div class="strong:text-gradient-to-l shadow-sm shadow-black/[0.0] border-0 border-neutral-900/[0.15] bg-neutral-900/[0.015] sm:rounded-[2rem] rounded-[4rem] relative sm:px-[0.5rem] px-[2.5rem] xs:mx-0 mx-[2.5rem]">
    
    <!-- Title -->
    <div v-if="titleKey" :class="['relative sm:pt-[5.5rem] sm:pb-[calc(5.5rem-3rem)] pt-[7rem] pb-[calc(7rem-1.5rem)] mx-[1rem] mb-[0.25rem] ', titleClass]">
      <p v-html="$mt(titleKey!)" class="fadeee whitespace-pre-wrap sm:text-[1.4rem] text-[1.8rem] font-[300] strong:font-[600] leading-[1.4] text-center text-neutral-950/80 w-max-[60rem]"></p>
    </div>  

    <!-- Content -->
    
    <div class="relative z-10">
      <slot></slot>
    </div>

    <!-- Disclaimer -->
    <div v-if="disclaimerKey" class="max-w-[calc(100%-0rem)] relative left-[50%] translate-x-[-50%] sm:px-[1rem] px-[5rem] pt-[calc(5.5rem-0.5rem)] pb-[5.5rem]">
      <p v-html="$mt(disclaimerKey, disclaimerValues, true)" class="text-[1.0rem] text-center text-neutral-900/[0.7] "></p>
    </div>

  </div>
</template>

<script setup lang="ts">

const $mt = useMT()

const props = defineProps({
  titleKey: String,
  titleClass: String,
  disclaimerKey: String,
  disclaimerValues: Object,
})

</script>

<style lang="scss" scoped>

</style>