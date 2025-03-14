/* This works on concert with `skipSettingLocaleOnNavigate: true` 
    So solve jankiness when switching locales, as described here: https://i18n.nuxtjs.org/docs/guide/lang-switcher#wait-for-page-transition 
    Update: Replaced with implementation in app.vue, as the docs recommend.
    Update2: [Mar 2025] I think all these comments are obsolete now since we've replace nuxt-i18n with a custom implementation.
  */

export default defineNuxtPlugin((app) => {
  // const { $i18n } = app
  // app.hook('page:transition:start', () => {
  //   console.debug(`Pendinggg: ${$i18n.pendingLocale}`)
  //   if ($i18n.pendingLocale !== $i18n.locale.value) {
  //     await $i18n.finalizePendingLocaleChange();
  //   }
  // });
});