<template>
  <div class="text-[1.0rem]"> <!-- Note: Text size has to be set on a **parent** of NuxtLink for layout not to be get weird. -->
    <NuxtLink :to="localePath(props.path!)" :class='["no-underline mb-[-0.5rem] font-[500] normal-link-color", props.coolClass ?? ""]'>
      <!-- <img :src="chevronLeft" class="inline h-[1em] translate-y-[-0.1em]"/> -->
      <span class="text-[1.8em] font-[300] inline-block translate-y-[0.05em] mt-[-100rem]">‹</span> 
      {{ props.label! }}
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">

const { $coolI18n: { mdrf, MFLocalizedString } } = useNuxtApp();
const localePath = useLocalePath()

const props = defineProps({
  path: String,
  label: String,
  coolClass: String, // Don't try to set the text size through this.
})

</script>

<style scoped>

</style>