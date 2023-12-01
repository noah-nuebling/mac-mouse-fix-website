<!-- "default.vue" is a magic layout name. The template will automatically be wrapped around all pages. 

  Notes:
  - 320px (min width of the page content) is the width of an iPhone 5. Our lowest breakpoint is 375px, which is iPhone 6 width. The other min and max width's are either by eye or stolen from Apple websites.

-->

<template>
  <div class="">

    <!-- NavBar -->
    <Navbar class="max-w-[960px]"/>

    <!-- Output page content -->
    <div class="min-w-[320px] max-w-[1780px] mx-auto pt-[0rem]"><slot /></div> <!-- page templates will be inserted here (about.vue, index.vue, etc) -->


    <!-- Bottom Nav -->
    <div class="relative h-[50vh] flex justify-center">


  
      <!-- <hr class="hidden border-t-[1px] border-neutral-950/[0.1] w-[200%] relative left-[50%] translate-x-[-50%]"> -->
      <div class="w-fit h-full flex flex-col justify-center items-center gap-[0.9rem] !text-[1.0rem]">
        
        <!-- Credits -->
        <p v-html="$mt('footer.credits')" class=" strong:font-[600] strong:text-gradient-to-l strong:gradient-green strong:filter strong:brightness-[1.05]"></p>
        <div class="sm:w-[100%] w-[200%] h-[1px] !bg-neutral-900/[0.0] bg-gradient-to-r from-transparent via-neutral-900/[0.1] to-transparent"/>

        <!-- Downloads -->
        <div class="whitespace-nowrap overflow-none border-0 py-[0.0rem] px-[0rem] mx-[0rem] rounded-[0.5rem] bg-white/[0] border-neutral-900/[0.9] border-1">
          <i18n-t tag="p" keypath="footer.thankyou" class="inline-block">
            <template #dwn> 
              <img src="https://img.shields.io/github/downloads/noah-nuebling/mac-mouse-fix/total?label=&color=24c65f&link=https%3A%2F%2Fgithub.com%2Fnoah-nuebling%2Fmac-mouse-fix%2Freleases" class="inline-block mx-[.25em] translate-y-[-0.1em] my-[-99rem] min-w-[34px] brightness-[1]">
            </template>
          </i18n-t>
        </div>
        <div class="sm:w-[100%] w-[200%] h-[1px] !bg-neutral-900/[0.0] bg-gradient-to-r from-transparent via-neutral-900/[0.1] to-transparent"/>

        <!-- 
        Locale Picker
        Notes: 
        - I can't seem to give this a blue accent under the arrow like the native system buttons. This should be default look for <select> buttons. See https://www.w3schools.com/tags/tryit.asp?filename=tryhtml_select. But the current look is good enough for Chrome and Safari.
        -->
        <div class="text-[1.0em]">
          <select ref="localePicker" @change="handleLocaleSelect" class="cool-select"> 
            <option v-for="$loc in $i18n.locales" :value="$loc.code"> {{ $loc.name }}</option> 
        </select>

        </div>

      </div>

    </div>

  </div>

  <!-- Filters
    
    Notes on tint-blue:
    - #3b82f6 is blue-500 from tailwind
    - We wanted to use this to tint the play button on the Feature cards, but for some reason it just doesn't work.


    Notes on noise filter from ChatGPT: 
    - Apply in css like: `filter: url('#noise-filter');` or in tailwind with `svg-filter-[noise-filter]`
    - Noise is the only way we found to mitigate heavy color banding on the color splashes.
      - We also tried to create the color splashes in pure css, using 1. approach: blurred circle and 2. approach: radial gradient - but there was still the same banding 
    - We tried applying noise to the color splashes directly in affinty photo, but that makes the image size huge (seems to prevent compression)
    -> So the best we can come up with is applying noise in css directly.
  -->

  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="hidden w-0 h-0 filter-defs">
    <defs>

      <filter id="tint-green" x="0" y="0" width="100%" height="100%"
              color-interpolation-filters="sRGB">
        <feFlood flood-color="#3a0339" result="flood"/>
        <feComposite in="flood" in2="SourceAlpha" operator="in" result="flood_alpha"/>
        <feBlend mode="exclusion" in="flood_alpha" in2="SourceGraphic"/>
      </filter>

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
const $mt = useMT()
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

<style lang="postcss" scoped>

.cool-select {

  /* 
  This button looks weirdddd on macOS Safari. Idk why. `appearance: button` seems to render <select> elements nicely in a codepen, but here's it renders this weird iOS 6 button. 
  The rounded and outline stuff applies on Chrome. Not sure what happens on mobile Safari, but it looks okay. 
  Update: Found a solution! See below. 
  */

  appearance: button;

  /* The following 4 styles are set inside tailwind.css @base with the selector `*, ::before, ::after`. Not sure why. But these styles break the system button styles. By reverting them all, the system button styles work properly. */
  box-sizing: revert;
  border-width: revert;
  border-style: revert;
  border-color: revert;
  
  /* Make it greeen */
  @apply accent-green-500;
}

</style>