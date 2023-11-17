<template>

  <div class="strong:text-gradient-to-l shadow-sm shadow-black/[0.0] border-0 border-neutral-900/[0.15] bg-neutral-900/[0.01] sm:rounded-[2rem] rounded-[4rem] relative sm:px-[0.5rem] px-[2.5rem] xs:mx-0 mx-[2.5rem]">
    
    <!-- Title -->
    <div v-if="titleKey" :class="['relative sm:pt-[5.5rem] sm:pb-[calc(5.5rem-3rem)] pt-[7rem] pb-[calc(7rem-1.5rem)] mx-[1rem] mb-[0.25rem] ', titleClass]">
      <p v-html="$mt(titleKey!)" class="fadeee whitespace-pre-wrap sm:text-[1.4rem] text-[1.8rem] font-[300] strong:font-[600] leading-[1.4] text-center text-neutral-950/80 w-max-[60rem]"></p>
    </div>  

    <!-- Content -->
    
    <div class="relative z-10">
      <slot></slot>
    </div>

  </div>
</template>

<script setup lang="ts">

const $mt = useMT()

const props = defineProps({
  titleKey: String,
  titleClass: String
})

</script>

<style lang="scss" scoped>

</style>