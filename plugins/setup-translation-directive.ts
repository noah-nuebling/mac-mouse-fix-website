// Sets up a custom directive that we can pass a localization string key and it automatically looks up the translation and then passes it to a markdown parser and then makes that the content of the element
// See: 
// - Nuxt docs: https://nuxt.com/docs/guide/directory-structure/plugins#vue-directives
// - Vue docs: https://vuejs.org/guide/reusability/custom-directives.html#introduction

import { defineNuxtPlugin } from "nuxt/app"

export default defineNuxtPlugin((app) => {

  // Wait for app to be ready.
  //  Src: ChatGPT
  app.hook('app:created', () => {

    // Get app instance
    //  No idea what why this works
    const appp = app.vueApp.$nuxt
    // Define directive
    app.vueApp.directive('translate', {
      mounted (el: HTMLElement, binding, vnode, prevVnode) {
        el.innerHTML = appp.$md.renderInline(appp.$i18n.t(binding.value))
      },
    })

  })
})


// Helper

function getCircularReplacer() {
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