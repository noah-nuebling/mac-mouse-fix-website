<!-- I feel like putting this into a component is overkill and only complicates things. But it's an experiment I guess. -->

<template>
    <div ref="rootElement" :class="['cursor-pointer']" @click="() => downloadMMF()">
      <p class="text-inherit">{{ MFLocalizedString(`Download`, 'download-button', `Label for the big 'Download' button that is displayed at the top of the page.`) }}</p>
    </div>
</template>

<script setup lang="ts">

const { MFLocalizedString } = useNuxtApp().$coolI18n;

const rootElement: Ref<HTMLElement|null> = ref(null)

defineExpose({
  rootElement
})

function downloadMMF() {
  window.location.href='https://github.com/noah-nuebling/mac-mouse-fix/releases/latest/download/MacMouseFixApp.zip'
}

</script>

<style scoped>

</style>