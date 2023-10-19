// Sets up a custom directive "v-translate" that we can pass a localization string key and it automatically looks up the translation and then passes it to a markdown parser and then makes that the content of the element
// See: 
// - Nuxt docs: https://nuxt.com/docs/guide/directory-structure/plugins#vue-directives
// - Vue docs: https://vuejs.org/guide/reusability/custom-directives.html#introduction

import { defineNuxtPlugin } from "nuxt/app"

export default defineNuxtPlugin((app) => {

  // Wait for app to be ready.
  //  Src: ChatGPT
  app.hook('app:created', () => {

    // Get app reference
    //  This has a reference to all the stuff we provided in the other plugins
    //  No idea why this works
    const appp = app.vueApp.$nuxt

    // Get reference to i18n and markdown-it
    const { $i18n, $md } = app 

    // Define directive
    app.vueApp.directive('translate', {
      mounted (el: HTMLElement, binding, vnode, prevVnode) {
        el.innerHTML = $md.renderInline($i18n.t(binding.value))
      },
    })

  })
})


// Helper

function getCircularReplacer() {

  // We used this for debugging to print circular objects to explore where in the nuxtApp the $i18n is.

  const ancestors = [];
  return function (key, value) {
    if (typeof value !== "object" || value === null) {
      return value;
    }
    // `this` is the object that value is contained in,
    // i.e., its direct parent.
    while (ancestors.length > 0 && ancestors.at(-1) !== this) {
      ancestors.pop();
    }
    if (ancestors.includes(value)) {
      return "[Circular]";
    }
    ancestors.push(value);
    return value;
  };
}