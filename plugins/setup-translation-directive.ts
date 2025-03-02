// Sets up a custom directive "v-translate" that we can pass a localization string key and it automatically looks up the translation and then passes it to a markdown parser and then makes that the content of the element
// See: 
// - Nuxt docs: https://nuxt.com/docs/guide/directory-structure/plugins#vue-directives
// - Vue docs: https://vuejs.org/guide/reusability/custom-directives.html#introduction
// - Discussion: 
//  - All these plugins are executed with a large delay after the initial page render. That makes it so the content being loaded through this directive appears with a delay, too. I have no clue what to do about it. Already tried everything I could think of and asked GPT-4, too. See this commit: cf65ebdb7ecbdcb486004058a90a5890269af3cd. Maybe it's a bug and will go away?
//  - DONT USE THIS - the delay described above is really bad. Instead use v-html="mdrf(MFLocalizedString('some.key')". It renders immediately
//    - Update: Using MFLocalizedString also lets us easily extract the strings from the source files!

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

        el.innerHTML = "don't use v-translate" // mdrf(MFLocalizedString(...))
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