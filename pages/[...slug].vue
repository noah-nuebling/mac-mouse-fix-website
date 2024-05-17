
<!-- 
  This page is a catchall. If no other page matches the current path, then this one is displayed. 

  We use this page for:
  - 1. Redirections, e.g. the /about/ page which currently exist, but is still linked to from inside MMF 2. So we redirect /about/ to the GitHub readme for the time being.
    - Note: We already have the `redirection-service` repo for redirections. Maybe we should should abandon the `redirection-service` in favor of using this for redirections.
  - 2. As a 404 page. If this page doesn't redirect anywhere else, it displays a message, that the page wasn't found.

-->

<template>
  <div class="flex flex-col justify-center items-center gap-[31vh] h-[100svh] px-[2rem]">
    <div class="h-fit max-w-[960px] flex flex-col items-start justify-center mt-[5em] px-[0rem] text-[2.4rem] sm:text-[2rem]">
      <BackButton coolClass="" path="/" label-key="404.back"></BackButton>
      <p class="mt-[0em] font-[600] text-pretty" v-html="$mt('404.title')"></p>
    </div>
    <BottomNav :is-minimal="true" color-class="accent-[unset]" class=""/>
  </div>
</template>

<script setup lang="ts">

/* Setup translate module */

const $mt = useMT()
const $route = useRoute()

/* Redirect */

const redirectMap = {
  // About
  //  Note: We could also use the 'redirection-service' for this redirection ('https://noah-nuebling.github.io/redirection-service?message=&target=mmf-about')
  "about": 'https://github.com/noah-nuebling/mac-mouse-fix', 
};

const path = $route.params.slug

if (path in redirectMap) {
  await navigateTo(redirectMap[path], { external: true })
}

</script>

<style scoped>

</style>