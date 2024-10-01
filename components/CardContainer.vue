<template>

  <div class="shadow-sm shadow-black/[0.0] border-neutral-900/[0.15] bg-neutral-900/[0.015] sm:rounded-[2rem] rounded-[4rem] relative sm:px-[0.5rem] px-[2.5rem] xs:mx-0 mx-[2.5rem]">
    
    <!-- Title -->
    <div v-if="$slots.title" :class="['relative sm:pt-[5.5rem] sm:pb-[calc(5.5rem-3rem)] pt-[7rem] pb-[calc(7rem-1.5rem)] mx-[1rem] mb-[0.25rem] ', titleClass]">
      <p class="fadeeexxx strong:move-upppxxx strong:inline-blockxxx whitespace-pre-wrap sm:text-[1.4rem] text-[1.8rem] font-[300] strong:font-[600] leading-[1.4] text-center text-neutral-950/80 w-max-[60rem]">
        <slot name="title"></slot>
      </p>
    </div>  

    <!-- Content -->
    
    <div class="relative z-10">
      <slot></slot>
    </div>

    <!-- Disclaimer -->
    <div v-if="$slots.disclaimer" :id="'dontusethisid'/* disclaimerId */" class="w-[100%] relative sm:px-[1rem] px-[5rem] pt-[calc(5.5rem-0.5rem)] pb-[5.5rem] flex justify-center">
      <p class="max-w-[50em] text-[1.0rem] text-center text-neutral-900/[0.7]">
        <slot name="disclaimer"></slot>
      </p>
    </div>

  </div>
</template>

<script setup lang="ts">

const props = defineProps({
  // title: String,
  titleClass: String,
  // disclaimer: String,
  // disclaimerId: String, /* This lets us link to the disclaimer using macmousefix.com/#<disclaimerId> */
})

</script>

<style lang="scss" scoped>

</style>