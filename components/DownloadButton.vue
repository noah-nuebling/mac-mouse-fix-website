<!-- I feel like putting this into a component is overkill and only complicates things. But it's an experiment I guess. -->

<template>
    <div ref="rootElement" :class="['cursor-pointer']">
      <p class="text-inherit">{{ $t('download-button') }}</p>
    </div>
</template>

<script setup lang="ts">

const rootElement: Ref<HTMLElement|null> = ref(null)

defineExpose({
  rootElement
})

</script>

<style scoped>

</style>