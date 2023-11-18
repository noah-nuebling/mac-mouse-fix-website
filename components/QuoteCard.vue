<!-- 
  This component creates a FeatureCard containing a persons name and quote
  It's derived (copy-pasted + changes) from NormalFeatureCard.
-->

<template>
  <FeatureCard 
    ref="thisCard"
    :class="['h-fit col-span-auto group shadow-none rounded-[1.5rem] text-[1.0rem] bg-white bg-opacity-[0.04] backdrop-saturate-[1.1] backdrop-brightness-[1.0]', $attrs.class]" 
    borderClass="border-[1px] border-gray-400/25"
    backgroundFilterClass=""
    :doesExpand="false">

    <!-- 
    Notes: 
      - The text-glow effect adds a super cool glow effect, but we need to only enable it when the card is on screen, otherwise performance tanks on Safari. Edit: Now performance is fine?
    -->

    <template v-slot:top>
      <!-- Quote -->
      <div ref="quoteElement" class="flex flex-row items-start justify-start h-fit mx-[2.5em] my-[3.5em]">
          <p class="text-white/[0.3] font-[650] text-[3.75em] translate-y-[-0.375em] ml-[-0.05em] mr-[0.125em] h-0 opacity-[0.99]">&#8220</p>
          <!-- <img :src="quoteImagePath" alt="opening quote" class="w-[1.5rem] mr-[0.5rem] opacity-50 translate-y-[0.27em]"> -->
          <blockquote :class="['text-[1.5em] whitespace-pre-wrap max-w-[30em] text-glow-2', false ? '' : '']" v-html="uiStrings.quote"/>
      </div>
      <!-- Quote Source -->
      <div class="mt-[-1.5em] mb-[0.6em]">
        <a :href="quote?.link" :class="quoteSourceIsPublic(quote!.source) ? ['pointer-events-auto'] : ['pointer-events-none']">
          <p class="text-[1.0em] font-[300] text-center text-white/[0.5]">
            <span v-html="uiStrings.source" class=""></span>
          </p>
        </a>
      </div>

    </template>
    
  </FeatureCard>
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
}>()

// Get template refs
// const quoteElement = ref<HTMLElement | null>(null)

// State
// const doGlow = ref(true) // Does this have to be `ref()` ed for reactivity to work?
var scrollTrigger: ScrollTrigger | null = null


// Get uiStrings
const uiStrings = getUIStrings(props.quote!)

// Get language name (unused)
const i18n = useI18n()
function getLocalizedLanguageName(languageTag: string) {
  return i18n.localeProperties.value.name!
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

</style>