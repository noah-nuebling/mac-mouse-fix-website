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
  :class="['h-fit col-span-auto group shadow-none rounded-[1.5rem] text-[1.0rem] bg-white/[0.04] border-[1px] border-neutral-100/[0.15] relative', $attrs.class]" >
    
    <!-- Background
          Need to make separate background container because chrome doesn't support nested backdrop filters for some reason -->
    <div class="absolute inset-0 backdrop-saturate-[1.1] backdrop-brightness-[1.0] backdrop-blur-[1rem] z-[-10] rounded-[inherit]">

    </div>

    <!-- Quote -->
    <div ref="quoteElement" class="flex flex-row items-start justify-start h-fit mx-[2.5em] my-[3.5em]">
      <p v-if="quote" class="text-white/[0.3] font-[650] text-[3.75em] translate-y-[-0.375em] ml-[-0.05em] mr-[0.125em] h-0 opacity-[0.99]">&#8220</p>
      <!-- <img :src="quoteImagePath" alt="opening quote" class="w-[1.5rem] mr-[0.5rem] opacity-50 translate-y-[0.27em]"> -->
      <blockquote :class="['text-[1.5em] whitespace-pre-wrap max-w-[30em]', dontGlow ? 'text-white/[0.7]' : 'text-glow-2 text-white/[0.3]']" v-html="quote ? uiStrings!.quote : text!"/>
    </div>
    <!-- Quote Source -->
    <div v-if="quote" class="mt-[-1.5em] mb-[0.6em] strong:font-[600] strong:text-glow-2 strong:inline-block strong:text-white/[0.3]">
      <a :href="quote?.link" :class="quoteSourceIsPublic(quote!.source) ? ['pointer-events-auto'] : ['pointer-events-none']">
        <p class="text-[1.0em] font-[300] text-center text-white/[0.5]">
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
var props = defineProps<{
  quote?: QuoteData,
  text?: String,
  dontGlow?: Boolean
}>()

// Get template refs
// const quoteElement = ref<HTMLElement | null>(null)

// State
// const doGlow = ref(true) // Does this have to be `ref()` ed for reactivity to work?
var scrollTrigger: ScrollTrigger | null = null

// Get uiStrings
const uiStrings = props.quote ? getUIStrings(props.quote) : null


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

</style>