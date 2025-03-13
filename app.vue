<!-- 
 Root element of all pages and layouts. You can also delete this and nuxt will create a default afaik. 
 We created this to make locale switches smoother (using `finalizePendingLocaleChange()` together with page transitions.)
 (But we turned the page transition animations off at the time of writing for a snappier experience.)
 -->
  
<template>
  <NuxtLayout>
    <NuxtPage
      :transition="{
        name: 'my',
        mode: 'out-in',
        /* onBeforeEnter*/ // [Mar 2025] Removing nuxt-i18n dependency
      }"
    />
  </NuxtLayout>
</template>

<script setup lang="ts">

import { useGlobalStore } from '~/store/global';
const global = useGlobalStore()

/* // [Mar 2025] Removing nuxt-i18n dependency
const { finalizePendingLocaleChange } = useI18n();
const onBeforeEnter = async () => {
  await finalizePendingLocaleChange(); // Works in concert with `skipSettingLocaleOnNavigate: true`. and `navigateTo(switchLocalePath())` See docs: https://i18n.nuxtjs.org/docs/guide/lang-switcher#wait-for-page-transition 
  global.localeSwitchIsPending = false;
}
*/

</script>

<style>
.my-enter-active .my-leave-active {
  transition: opacity 0.0s;
}
.my-enter, .my-leave-active {
  opacity: 1; /* Turn off animations */
}
</style>