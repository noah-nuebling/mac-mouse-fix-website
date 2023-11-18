<!-- 
  This component creates a FeatureCard containing a persons name and quote
  It's derived (copy-pasted + changes) from NormalFeatureCard.
-->


<template>
  <!-- 
  Notes: 
  - The text-glow effect adds a super cool glow effect, but we need to only enable it when the card is on screen, otherwise performance tanks on Safari. Edit: Now performance is fine?
  -->
  <div 
  ref="thisCard"
  :class="['text-[0.90rem] h-fit col-span-auto group shadow-none rounded-[1.8em] bg-white/[0.04] border-[1px] border-neutral-100/[0.15] relative', 
          sourceIsPublic ? 'cursor-pointer' : 'cursor-default',
          $attrs.class]"
  @click="openLink">
    
    <!-- Background
          Need to make separate background container because chrome doesn't support nested backdrop filters for some reason -->
    <div class="absolute inset-0 bg-white/[0.00] backdrop-saturate-[1.15] backdrop-brightness-[1.00] backdrop-blur-[1rem] z-[-10] rounded-[inherit]">

    </div>

    <!-- Quote -->
    <div ref="quoteElement" class="flex flex-row items-start justify-center h-fit mx-[3em] my-[5.5em]">
      <!-- <p v-if="quote" class="text-white/[0.3] font-[650] text-[3.75em] translate-y-[-0.375em] ml-[-0.05em] mr-[0.125em] mb-[-99rem]">&#8220</p> -->
      <p v-if="quote" class="absolute top-[0rem] left-[1rem] text-white/[0.3] font-[700] text-[3.85em]">&#8220</p>
      <blockquote :class="['text-center text-[1.5em] whitespace-pre-wrap max-w-[24em]', !doGlow ? 'text-white/[0.75]' : 'text-glow-2 text-white/[0.75]']" v-html="quote ? uiStrings!.quote : text!"/>
    </div>
    <!-- Quote Source -->
    <div v-if="quote" class="flex justify-center mt-[-1.65em] mb-[0.6em] strong:font-[600] strong:text-glow-2 strong:inline-block strong:text-white/[0.3]">
      <a :href="sourceIsPublic ? quote?.link : ''" :class="['relative max-w-fit block pointer-events-none', sourceIsPublic ? 'cool-hover-underlinexxx' : '']">
        <p class="text-[1.05em] font-[300] text-center text-white/[0.5] w-fit">
          <span v-html="uiStrings!.source" class=""></span>
        </p>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">

// Imports
const $mt = useMT()
import { type QuoteData, getUIStrings, quoteSourceIsPublic } from '~/utils/quotes';
// const { $gsap, $ScrollTrigger } = useNuxtApp()

// Import images
// import quoteImagePath from '../assets/img/baskerville-bold.quotes.png'
// import quoteBubbleImagePath from '../assets/img/quote.bubble@8x.png'

// Define props
// Notes:
//  - Using "pure type annotations" instead of "object declaration syntax", because there you need to pass in the constructor of a type, and QuoteData doesn't have a constructor. See https://vuejs.org/guide/components/props.html
var props = defineProps({
  quote: Object as () => QuoteData,
  text: String,
  doGlow: {
    type: Boolean,
    default: true,
  }
})

// Get template refs
// const quoteElement = ref<HTMLElement | null>(null)

// State and vars
// const doGlow = ref(true) // Does this have to be `ref()` ed for reactivity to work?
var scrollTrigger: ScrollTrigger | null = null
const uiStrings = props.quote ? getUIStrings(props.quote) : null
const sourceIsPublic = props.quote ? quoteSourceIsPublic(props.quote.source) : false


function openLink() {
  if (sourceIsPublic) {
    window.open(props.quote!.link)
  }
}

onMounted(() => {

  // scrollTrigger = $ScrollTrigger.create({
  //   trigger: quote.value,
  //   start: "top top",
  //   end: "bottom bottom",
  //   onEnter: () => doGlow.value = true,
  //   onEnterBack: () => doGlow.value = true,
  //   onLeave: () => doGlow.value = false,
  //   onLeaveBack: () => doGlow.value = false,
  // })

})


</script>

<style scoped lang="postcss">

  /* Avoid styling here when using tailwind. See https://tailwindcss.com/docs/reusing-styles. */

  .group:hover .cool-hover-underline:after {
    @apply content-[''] absolute left-0 w-full bottom-[2.5px] h-[1px] rounded-[1px] bg-[hsla(0,0%,100%,0.5)] bg-blend-overlay;
  }

</style>