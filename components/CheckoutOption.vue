<template>
  <div class="text-[1.0rem]">

    <!-- <div v-html="$mt(props.title ?? '', [], false)" :class="['ml-[1rem] strong:font-[700] mb-[1rem] mt-[1.0rem] text-[1.0em]']"></div> -->

    <div :class="['bg-white border-[1px] border-neutral-500/[0.2] mx-[1rem] rounded-[1rem] p-[1rem] transition-all duration-[0.5s] mb-[2em]', isSelected ? 'shadow-md translate-y-[-0.1rem] scale-[1.005]' : '']">
    <div class="flex flex-row justify-start">
      <div v-html="$mt(props.price ?? '', [], false)" :class="['rounded-full px-[0.4rem]', props.isSelected ? 'bg-blue-500 text-white' : 'bg-neutral-500/[0.15]']"></div>
      <div v-html="$mt(props.disclaimer ?? '', [], false)" :class="['text-neutral-500 text-[0.9em] ml-[0.5em]']"></div>
    </div>
    <div v-html="$mt(props.body ?? '', [], false)" class="mt-[0.5rem]"></div>
  </div>
  </div>
</template>

<script setup lang="ts">

// Get i18n stuff
const $mt = useMT()

// Define props
const props = defineProps({
  title: String,
  body: String,
  price: String,
  disclaimer: String,
  isSelected: Boolean,
})

</script>

<style scoped>

</style>