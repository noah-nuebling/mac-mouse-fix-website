  <!-- 
    Notes:
    - bg-origin-border is needed to make the border work properly with background gradient. See https://stackoverflow.com/questions/11717873/why-are-border-colors-inverted-when-a-background-gradient-is-applied
  -->

<template>
  <div :class="`h-full p-6 shadow-lg rounded-xl
  border-2 border-gray-400/10 bg-origin-border
  ${extraClass}`"> 
    <slot name="default"/> <!-- Default card content -->
    <slot name="expanded"/> <!-- When card is clicked, the card should expand and show this content -->
  </div>
</template>

<script setup lang="ts">
  const { extraClass } = defineProps(['extraClass'])
</script>

<style lang="postcss" scoped>

</style>