<template>
  <div class="">

    <div v-if="false" v-html="props.title" :class="['ml-[1em] strong:font-[700] mb-[1em] mt-[1.0em] text-[1.0em]']"></div>
    <div :class="['bg-white/[0.75] rounded-[1.6em] p-[1.25em] transition-all duration-[0.5s] border-[1px]', isSelected ? 'shadow-md translate-y-[-0.1em] scale-[1.005]  ' : 'border-neutral-500/[0.2]']"> <!-- border-neutral-500/[0.2] -->
      <div class="flex flex-row justify-start items-center mb-[1.25em] ">
        <div v-html="props.price" :class="['rounded-full text-[1.1rem] px-[0.6rem] py-[0.2rem]', props.isSelected || false ? 'bg-blue-500 text-white font-[600]' : 'bg-neutral-500/[0.15] font-[500]']"></div>
        <div v-html="props.disclaimer" :class="['text-neutral-500 text-[0.9em]', props.isSelected ? 'ml-[0.4em]' : 'ml-[0.5em]']"></div>
      </div>
      <div v-html="props.body" class="mx-[0.25em] text-[1.1em] text-black/[0.9] font-[450]"></div>
    </div>
  </div>
</template>

<script setup lang="ts">

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