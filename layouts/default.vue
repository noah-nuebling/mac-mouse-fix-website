<!-- "default.vue" is a magic layout name. The template will automatically be wrapped around all pages. 

  Notes:
  - 320px (min width of the page content) is the width of an iPhone 5. Our lowest breakpoint is 375px, which is iPhone 6 width. The other min and max width's are either by eye or stolen from Apple websites.

-->

<template>
  <meta name="server-locale" :content="$i18n.locale">

  <div class="">

    <!-- NavBar -->
    <Navbar class="max-w-[960px]"/>

    <!-- Output page content -->
    <div class="min-w-[320px] max-w-[1780px] mx-auto pt-[0rem]"><slot /></div> <!-- page templates will be inserted here (about.vue, index.vue, etc) -->


    <!-- Bottom Nav -->
    <!-- Notes:
          - The hex colors used here are based on tailwinds green-500 with slight brightness adjustments using oklch.com
    -->
    <BottomNav/>

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
  
</script>

<style lang="postcss" scoped>

</style>