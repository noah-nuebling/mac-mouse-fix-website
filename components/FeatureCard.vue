  <!-- 
    Notes:
    - bg-origin-border is needed to make the border work properly with background gradient. See https://stackoverflow.com/questions/11717873/why-are-border-colors-inverted-when-a-background-gradient-is-applied
    - $attrs.class contains the classes set by the parent like this <FeatureCard class="baz boo" />
  -->

<template>
  <div
    @click="isExpanded = !isExpanded" 
    :class="['h-full p-6 shadow-2xl rounded-xl border-2 border-gray-400/10 bg-origin-border', $attrs.class, /* { absolute: isExpanded } */]">
    <div v-show="!isExpanded">
      <slot name="default"/> <!-- Default card content -->
    </div>
    <div v-show="isExpanded">
      <slot name="expanded"/> <!-- When card is clicked, the card should expand and show this content -->
    </div>
  </div>
</template>

<script setup lang="ts">
  const isExpanded = ref(false)
</script>

<style lang="postcss" scoped>

</style>