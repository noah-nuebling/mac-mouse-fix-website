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
  :class="['sm:text-[0.8rem] text-[0.90rem] h-fit col-span-auto group shadow-none rounded-[1.8em] border-[1px] border-neutral-100/[0.175] relative ch-[a]:no-underline', 
          sourceIsPublic ? 'cursor-pointer' : 'cursor-default',
          $attrs.class]"
  @click="openLink">
    
    <!-- Background
          - Need to make separate background container because chrome doesn't support nested backdrop filters for some reason 
          - Edit: I'm not sure the backdrop filters work under Chrome atm. I think if any parent has non-1.0 opacity or a filter that disables the filters here. But it's okay, this looks fine.
          - We only enable backdrop blur on non-mobile to hopefully optimize.
    -->
    <div :class="['absolute inset-0 bg-white/[0.06] backdrop-saturate-[1.0] safari:backdrop-saturate-[1.05] backdrop-brightness-[1.00] z-[-10] rounded-[inherit]', $isMobile || true ? '' : 'backdrop-blur-[1rem]']">

    </div>

    <!-- Quote -->
    <div ref="quoteElement" class="flex flex-row items-start justify-center h-fit mx-[3em] my-[5.5em]">
      <p v-if="quote" class="font-[700] text-[3.85em] absolute top-[0rem] left-[1rem] text-white/[0.375] ">&#8220</p>
      <blockquote :class="['whitespace-pre-wrap max-w-[24em] text-center text-[1.6em] font-[400]', !doGlow ? 'text-white/[0.90]' : 'text-glow-2 text-white/[0.90]']" v-html="quote ? uiStrings?.quote : text!"/>
    </div>
    <!-- Quote Source -->
    <div v-if="quote" class="flex justify-center mt-[-2.05em] mb-[0.6em] mx-[1.5em] strong:font-[600] strong:text-glow-2 strong:inline-block strong:text-white/[0.3] text-white/[0.5] font-[400]">
      <a :href="sourceIsPublic ? quote?.link : ''" :class="['relative max-w-fit block pointer-events-none', sourceIsPublic ? 'cool-hover-underlinexxx' : '']">
        <p class="text-[1.15em] text-center w-fit">
          <span v-html="uiStrings?.source" class=""></span>
        </p>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">

/* Imports */
const { $isMobile } = useNuxtApp()
const $mt = useMT()
import { type QuoteData, getUIStrings, quoteSourceIsPublic } from '~/utils/quotes';
// const { $gsap, $ScrollTrigger } = useNuxtApp()

/* Import images */
// import quoteImagePath from '../assets/img/baskerville-bold.quotes.png'
// import quoteBubbleImagePath from '../assets/img/quote.bubble@8x.png'

/* Define props 
  Notes:
  - Using "pure type annotations" instead of "object declaration syntax", because there you need to pass in the constructor of a type, and QuoteData doesn't have a constructor. See https://vuejs.org/guide/components/props.html
  */

var props = defineProps({
  quote: Object as () => QuoteData,
  text: String,
  doGlow: {
    type: Boolean,
    default: false,
  }
})

/* Get template refs */
// const quoteElement = ref<HTMLElement | null>(null)

/* State and vars */
// const doGlow = ref(true) // Does this have to be `ref()` ed for reactivity to work?
var scrollTrigger: ScrollTrigger | null = null
const sourceIsPublic = props.quote ? quoteSourceIsPublic(props.quote.source) : false
const uiStrings = ref<{ quote: string|null, source: string } | null>(null);

/* Update uiStrings to current locale 
  Why debounce? 
  When switching locales from the UI, it changes locales twice - first with proper oldLocale, second with undefined as the old locale (15.08.2024) */
const i18n = useI18n();
const updateQuoteLocales = debouncer((newLocale: string, oldLocale: string) => {
  console.log(`quoteCardLocales: ${oldLocale} -> ${newLocale}`)
  uiStrings.value = props.quote ? getUIStrings(props.quote, newLocale) : null;
}, 50);
watch(i18n.locale, updateQuoteLocales, { immediate: false });

/* Callback */
function openLink() {
  if (sourceIsPublic) {
    window.open(props.quote!.link)
  }
}



onMounted(() => {

  /* Load quote strings after component load */
  updateQuoteLocales(i18n.locale.value, undefined);

  /* Trigger glow based on scroll-position */

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