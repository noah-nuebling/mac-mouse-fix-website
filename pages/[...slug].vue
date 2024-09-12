
<!-- 
  This page is a catchall. If no other page matches the current path, then this one is displayed. 

  We use this page for:
  - 1. Redirections, e.g. the /about/ page which currently exist, but is still linked to from inside MMF 2. So we redirect /about/ to the GitHub readme for the time being.
      Note: We already have the `redirection-service` repo for redirections. Maybe we should should abandon the `redirection-service` in favor of using this for redirections. But redirection-service is easier to update/work with than this.
  - 2. As a 404 page. If this page doesn't redirect anywhere else, it displays a message, that the page wasn't found.

  Notes:
  - We can declare the page as `[slug].vue` or `[...slug].vue`. If we use the ..., then `$route.params.slug` seems to be an array. When there are several/path/segments, then we need to use [...slug].vue to catch them all. I can't find documentation for this on Google.
-->

<template>
  <div :class='[pageNotFound ? "opacity-[1.0]" : "opacity-[0.0]"]'>
    <Navbar class="max-w-[960px]"/> <!-- Note: Should keep this max-w in sync with the NavBar max-w on other pages. -->
    <div :class='["flex flex-col justify-center items-center gap-[31vh] h-[100svh] px-[2rem]"]'>
      <div :class='["h-fit max-w-[960px] flex flex-col items-start justify-center mt-[5em] px-[0rem] text-[3rem] md:text-[2.4rem] sm:text-[2rem]"]'>
        <BackButton coolClass="" path="/" :label="mdrf(MFLocalizedString('404.back', ''))"></BackButton>
        <p class="mt-[0em] font-[600] text-pretty" v-html="mdrf(MFLocalizedString('404.title', ''))"></p>
      </div>
      <BottomNav :is-minimal="true" color-class="accent-[unset]" class=""/>
    </div>
  </div>
</template>

<script setup lang="ts">

/* Refs */
const pageNotFound = ref(false)

/* Imports */

const { $coolI18n: {mdrf, MFLocalizedString} } = useNuxtApp();
const $route = useRoute();

/* Configure page */

definePageMeta({
  layout: false, /// Disable the default layout
})

/* Redirect */

const redirectMap = {

  // Redirecting '/about/'
  //  Notes: 
  //  - We could also use the 'redirection-service' for this redirection ('https://noah-nuebling.github.io/redirection-service?message=&target=mmf-about')
  //  - We created this redirection from /about/ to the GitHub Readme, because in MMF 2.2.3 on the accessibility sheet, there's a link saying "Why does MMF need Accessibility Access" which links to /about/. And the current replacement for the about page is the GitHub Readme.
  //      However, the Readme doesn't answer the question about Accessibility Access. Therefore, linking to the GitHub Readme doesn't make sense. 
  //      Either way, we should remove the /about/ link from MMF 2.

  // "about": 'https://github.com/noah-nuebling/mac-mouse-fix', 

};

const redirectsExist = Object.keys(redirectMap).length > 0

if (!redirectsExist) {
  
  pageNotFound.value = true

} else {

  // Preprocess the path
  //  We're trying to remove trailing `/` so that we can detect `/about` and `/about/` as the same thing. Not sure this is a good way to achieve this.

  const pathElements = $route.params.slug
  var cleanedPathElements: string[] = []
  for (const e of pathElements) {
    const newE = e.replace('/', '')
    if (newE.length > 0) {
      cleanedPathElements.push(newE)
    }
  }
  var path = cleanedPathElements.join('/')

  onMounted(async () => {

    /* Notes: 
        - When using `pnpm dev` this code is re-executed and the redirection is re-triggered on navigate back (when you navigate back to this page in the browswer history). However, when we build the production version that doesn't work anymore, and the redirection is not triggered, when we use the back button to navigate back to this page in the browser history. 
        - We wrapped this code in onMounted() so it would be re-triggered on navigate back, but it didn't help.
    */

    console.debug(`DEBUG - path: ${path}, elements: ${pathElements}, redirectMap keys: ${Object.keys(redirectMap)}`) // Debug

    var didRedirect = false

    if (path in redirectMap) {
      await navigateTo(redirectMap[path], { external: true })
      didRedirect = true
    }

    /* Make 'page not found' text visible, if we didn't redirect 
        Note: I'm not totally why, but the `if (!didRedirect)` check is necessary to make the pageNotFound text not appear when we're redirecting. It seems like even thought we `await` the navigateTo() call, the actual redirection takes place ca. a second after navigateTo() returns. */
    if (!didRedirect) {
      console.debug(`DEBUG - Setting pageNotFound to true`) // Debug
      pageNotFound.value = true
    }

  })
}

</script>

<style scoped>

</style>