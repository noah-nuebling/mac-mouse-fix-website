<template>

  <div class="shadow-sm shadow-black/[0.0] border-0 border-neutral-900/[0.15] bg-neutral-900/[0.015] sm:rounded-[2rem] rounded-[4rem] relative sm:px-[0.5rem] px-[2.5rem] xs:mx-0 mx-[2.5rem]">
    
    <div v-if="titleKey" class="relative sm:pt-[5.5rem] sm:pb-[calc(5.5rem-3rem)] pt-[7rem] pb-[calc(7rem-1.5rem)] mx-[1rem]">
      <p v-html="$mt(titleKey!)" class="whitespace-pre-wrap sm:text-[1.4rem] text-[1.8rem] font-[400] leading-[1.4] text-center text-neutral-950/80 mb-[0.25rem] w-max-[60rem]"></p>
    </div>  
    <slot></slot>
  </div>
</template>

<script setup lang="ts">

const $mt = useMT()

const props = defineProps({
  titleKey: String
})

</script>

<style lang="scss" scoped>

</style>