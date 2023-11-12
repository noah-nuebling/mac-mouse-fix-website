<!-- "default.vue" is a magic layout name. The template will automatically be wrapped around all pages. -->

<template>
  <div>

    <!-- NavBar -->
    <Navbar/>

    <!-- Output page content -->
    <div class="container mx-auto pt-[0rem]"><slot /></div> <!-- page templates will be inserted here (about.vue, index.vue, etc) -->

    <!-- 
    Locale Picker
    Notes: 
    - I can't seem to give this a blue accent under the arrow like the native system buttons. This should be default look for <select> buttons. See https://www.w3schools.com/tags/tryit.asp?filename=tryhtml_select. But the current look is good enough for Chrome and Safari.
    -->
    <div class="container mx-auto mb-[4rem]">
      <select ref="localePicker" @change="handleLocaleSelect" class="rounded-[50vh] outline outline-1 outline-slate-500/20"> 
        <option v-for="$loc in $i18n.locales" :value="$loc.code"> {{ $loc.name }}</option> 
      </select> 
    </div>

  </div>

  <!-- Filters
    
    Notes on tint-blue:
    - #3b82f6 is blue-500 from tailwind

    Notes on noise filter from ChatGPT: 
    - Apply in css like: `filter: url('#noise-filter');` or in tailwind with `svg-filter-[noise-filter]`
    - Noise is the only way we found to mitigate heavy color banding on the color splashes.
      - We also tried to create the color splashes in pure css, using 1. approach: blurred circle and 2. approach: radial gradient - but there was still the same banding 
    - We tried applying noise to the color splashes directly in affinty photo, but that makes the image size huge (seems to prevent compression)
    -> So the best we can come up with is applying noise in css directly.
  -->

  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="filter-defs">
    <defs>
      <filter id="tint-blue">
        <feFlood flood-color="#3b82f6" flood-opacity="1.0" result="flood" />
        <feComposite in="flood" in2="SourceGraphic" operator="in" result="composite" />
        <!-- <feBlend in="composite" in2="SourceGraphic" mode="multiply" /> -->
      </filter>

      <filter id="splash-noise">

          <!-- V1 (ChatGPT - makes things washed out and `mode` doesn't work for some reason) -->
          <!-- <feTurbulence type="fractalNoise" baseFrequency="3.0" numOctaves="2" stitchTiles="noStitch" result="turbulence" />
          <feComposite in="turbulence" in2="SourceGraphic" operator="in" result="monochromeNoise" />
          <feBlend in="SourceGraphic" in2="monochromeNoise" mode="hue" result="r"/> -->

          <!-- V2 (Noise on alpha) (seems to make banding worse, and tanks scrolling performance) -->
          <feTurbulence type="fractalNoise" baseFrequency="1.0" numOctaves="2" stitchTiles="noStitch" result="turbulence" />
          <feComposite in="SourceGraphic" in2="turbulence" operator="out" result="noisyDark" />
          <feComponentTransfer in="noisyDark">
            <feFuncR type="identity"/>
            <feFuncG type="identity"/>
            <feFuncB type="identity"/>
            <feFuncA type="linear" slope="2.0"/>
          </feComponentTransfer>

          <!-- V3 (Noise on hue)  -->
      </filter>


      <filter id="alpha-boost">

        <!-- Alpha boost - for testing - tanks scrolling performance -->

        <feComponentTransfer in="SourceGraphic">
          <feFuncR type="identity"/>
          <feFuncG type="identity"/>
          <feFuncB type="identity"/>
          <feFuncA type="linear" slope="1.5"/>
        </feComponentTransfer>

      </filter>
    </defs>
  </svg>
</template>

<script setup lang="ts">

/* Import i18n stuff
Note: Why can't we use $i18n in ts like we do in html? */

const i18n = useI18n() 
const localePicker = ref<HTMLSelectElement|null>(null)

/* Set initial locale picker selection
    Note: We tried to use v-bind/: and v-model, but neither of them worked */

onMounted(() => {
  localePicker.value!.value = i18n.locale.value
});

/* React to user selecting a new locale */
  
function handleLocaleSelect(event: Event) {
  const select = event.target as HTMLSelectElement
  i18n.setLocale(select.value);
}
  
</script>

<style scoped>
</style>