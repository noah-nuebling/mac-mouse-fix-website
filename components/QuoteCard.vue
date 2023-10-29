<!-- 
  This component creates a FeatureCard containing a persons name and quote
  It's derived (copy-pasted + changes) from NormalFeatureCard.
-->

<template>
  <FeatureCard 
    ref="thisCard"
    class="h-fit col-span-auto group shadow-sm rounded-[12px] bg-gray-300/50" 
    borderClass="border-[1px] border-gray-900/25"
    backgroundFilterClass=""
    :doesExpand="false"

    @click="$refs.thisCard.expand()">

    <template v-slot:top> 
      <h3 class="m-[1.4rem] text-[1.5rem] font-bold text-black/40 shadow-black/100" v-html="quote?.name"></h3>
    </template>

    <template v-slot:default>
      <div class="flex flex-col items-center justify-start h-full m-[1.4rem] mt-0 mb-[1.9rem]">
        <div>
          <p class="text-[1.05rem] text-black/70 whitespace-pre-wrap shadow-black/100 max-w-[30em]" v-html="quote?.quote"></p>
        </div>        
      </div>
    </template>
    
  </FeatureCard>
</template>

<script setup lang="ts">

// Imports
import { $mt } from '~/utils/markdownTranslate';
import { QuoteData } from '~/utils/Quotes';

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