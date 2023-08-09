<!-- error.vue is a magical name. Needs to be in the root directory. For some reason??-->
<!-- error object is magically passed by nuxt -->

<template>
  <div class="mt-7 max-w-sm mx-auto text-center card">
    <p class="mt-7 text-7xl font-bold">{{ error.statusCode }}</p>
    <p class="mt-7 text-6xl">Oooops.</p>
    <p class="mt-7">{{ error.message }}</p>
    <button class="btn my-7" @click="handleClearError">Go Home...</button>
  </div>
</template>

<script setup>
  defineProps(['error'])

  const handleClearError = () => clearError({ redirect: '/' })
</script>

<style scoped>

</style>