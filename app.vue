<!-- 
 Root element of all pages and layouts. You can also delete this and nuxt will create a default afaik. 

We created this to call `finalizePendingLocaleChange()` from page transitions, but we're now [Mar 2025] calling finalizePendingLocaleChange() from elsewhere.
-->
  
<template>
  <div>
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
</script>

<style>
</style>