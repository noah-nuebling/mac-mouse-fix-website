<!-- 
  This component creates a FeatureCard containing a persons name and quote
  It's derived (copy-pasted + changes) from NormalFeatureCard.
-->

<template>
  <FeatureCard 
    ref="thisCard"
    :class="['h-fit col-span-auto group shadow-none rounded-[12px] bg-gray-300 bg-opacity-[0.2]']" 
    borderClass="border-[1px] border-gray-400/25"
    backgroundFilterClass=""
    :doesExpand="false"

    @click="$refs.thisCard.expand()">

    <template v-slot:top>
      <div class="flex flex-row items-start justify-center h-fit m-[1.4rem] mb-[0rem]">
          <p class="text-white font-[650] text-[2.8rem] translate-y-[-0.33em] ml-[-0.25rem] mr-[0.3rem] mb-[-10rem] opacity-[0.50]">&#8220</p>
          <!-- <img :src="quoteImagePath" alt="opening quote" class="w-[1.5rem] mr-[0.5rem] opacity-50 translate-y-[0.27em]"> -->
          <blockquote class="text-[1.05rem] text-white/90 whitespace-pre-wrap shadow-black/100 max-w-[30em]" v-html="quote?.quote">
          </blockquote>
      </div>
      <div class="m-[1.4rem]">
        <a :href="quote?.link" :class="quoteSourceIsPublic(quote!.source) ? ['pointer-events-auto'] : ['pointer-events-none']">
          <p class="text-[1.0rem] text-center text-white/60 shadow-black/100">
            <span v-html="getUIStringForQuoteSource(quote!.source, quote!.name)" class=""></span>
          </p>
        </a>
      </div>

    </template>
    
  </FeatureCard>
</template>

<script setup lang="ts">

// Imports
import { $mt } from '~/utils/markdownTranslate';
import { QuoteData, getUIStringForQuoteSource, quoteSourceIsPublic } from '~/utils/quotes';

// Import images
import quoteImagePath from '../assets/img/baskerville-bold.quotes.png'
// import quoteBubbleImagePath from '../assets/img/quote.bubble@8x.png'

// Define props
// Notes:
//  - Using "pure type annotations" instead of "object declaration syntax", because there you need to pass in the constructor of a type, and QuoteData doesn't have a constructor. See https://vuejs.org/guide/components/props.html
var props = defineProps<{
  quote?: QuoteData,
}>()

</script>

<style scoped lang="postcss">

  /* Avoid styling here when using tailwind. See https://tailwindcss.com/docs/reusing-styles. */

</style>