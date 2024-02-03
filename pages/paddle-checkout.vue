<!-- 

  Notes:
  - On the wrapper for the "see it in action" button we had to set `min-h-[52px]` instead of h-[52px], for it to actually work. No idea why.


 -->

 <template>
  <div ref="rootElement" class="mt-[50px]">

    <div class="flex flex-row justify-center flex-wrap gap-[5rem]">

      <!-- Custom UI -->
      <div class="grow shrink max-w-[60rem] md:max-w-[45rem]">

        <!-- Just Mac Mouse Fix -->
        <CheckoutOption price='checkout-option.base.price' title='checkout-option.base.title' body='checkout-option.base.body' disclaimer='checkout-option.disclaimer'
        :is-selected="selectedOption == 'base'" @click="selectedOption = 'base'"/>

        <!-- Generous Contributor -->
        <CheckoutOption price='checkout-option.generous.price' title='checkout-option.generous.title' body='checkout-option.generous.body' disclaimer='checkout-option.disclaimer'
        :is-selected="selectedOption == 'generous'" @click="selectedOption = 'generous'"/>

        <!-- Very Generous Contributor -->
        <CheckoutOption price='checkout-option.very-generous.price' title='checkout-option.very-generous.title' body='checkout-option.very-generous.body' disclaimer='checkout-option.disclaimer'
        :is-selected="selectedOption == 'very-generous'" @click="selectedOption = 'very-generous'"/>

      </div>

      <!-- Paddle inline checkout -->
      <div class="paddle-checkout-container max-w-[45rem] min-h-[750px] grow shrink">
        
      </div>

    </div>

    <!-- Bottom navigation -->
    <BottomNav color-class="accent-[default] strong:gradient-blue" downloads-badge-color="4094ff"/> <!-- Good: 2f9bff, 4798ff, 4094ff || #3b82f6 is tailwinds blue-500 color -->

  </div>
</template>

<script setup lang="ts">

// Edit head
useHead({
  script: [
    {
      src: 'https://cdn.paddle.com/paddle/v2/paddle.js' // Include Paddle checkout
    },
    {
      type: 'text/javascript',
      innerHTML: `
      Paddle.Environment.set('sandbox');
      Paddle.Setup({ 
        /* 
        On tokens:
        Client-side token: live_1f3fdc81f7e49dcb8dcf7baae87
        Sandbox - Client-side token: test_6090d641c4ff107629e6d50fe86
        */
        token: 'test_6090d641c4ff107629e6d50fe86',
        eventCallback: (event) => { handlePaddleEvent(event) }
      });
      `
    }
  ]
})

// Paddle stuff
function handlePaddleEvent(event) {
  console.log(`Received Paddle event: ${event.name}: ${JSON.stringify(event, null, 2)}`)

  if (event.name == 'checkout.closed') {
    window.open("/", "_self"); // Navigate to domain root. This happens when the user clicks the little 'x' button. Ideally I'd like to hide that one.
  }

}

function openPaddleCheckout(priceId: String) {
	
  Paddle.Checkout.open({ 					// See the docs at: https://developer.paddle.com/build/checkout/build-branded-inline-checkout || https://developer.paddle.com/paddlejs/methods/paddle-checkout-open
    customData: null,							// Idk
    discountCode: null, 					// Prepopulate with discount.
    settings: {
      displayMode: 'inline',			// Overlay is simpler. Good example of inline checkout at https://my.setapp.com/activate

      frameTarget: 'paddle-checkout-container', 				
      frameInitialHeight: "450", 	                // Docs say 450 is recommended
      frameStyle: "min-width: 286px; width: 100%; height: 100%",             //  Docs say min width should be >= 286 || Here's the official tutorial where they set some example values: https://developer.paddle.com/build/checkout/build-branded-inline-checkout || Here are the docs: https://developer.paddle.com/paddlejs/methods/paddle-checkout-open
      
      theme: null, 								// There doesn't seem to be an auto option. Defaults to light. Dark looks fresher. Edit: But light seems more 'trustworthy' I think.
      successUrl: null, 					// If this is null, Paddle will display a simple success message saying they emailed you the order details. For Swish, the email contains download link, license key and custom instructions, which is all we want I think.
      locale: null, 							// Null so that it automatically detects browser locale
      //showAddDiscounts: null, 		// At the moment, discount field doesn't seem to show up when we set this to null. (We don't have any discount codes at the moment.) (In sandbox environment setting this to null leads to error atm.)

      allowLogout: false, 				// This hides the little 'Not you?' button next to your email on the second screen. Very small detail but I think it's slightly cleaner without this.
      showAddTaxId: true, 				// The use case for this is very niche but can avoid VAT for some businesses, so why not. Documented here: https://www.paddle.com/help/sell/tax/how-paddle-handles-vat-on-your-behalf
    
      allowedPaymentMethods: null, 	// Just setting this to null seems to allow everything from my testing. Although I can't get alipay to show up even when I connect a VPN to China mainland. Edit: That's because Alipay is in early access and you have to apply for it. See https://developer.paddle.com/concepts/payment-methods/alipay
      //[
        //"alipay",
        // "apple_pay",
        // "bancontact",
        //"card",
        //"google_pay",
        // "ideal",
        //"paypal",
      //],
    }, 
    items: [
      {
        priceId: priceId 
      },
    ]

  })
}

// On mount

onMounted(() => {
  // openPaddleCheckout()
})

// Ge† ref
var rootElement = ref<HTMLDivElement | null>(null)

// Get global store
import { storeToRefs } from 'pinia';
import { useGlobalStore } from '~/store/global';
const global = useGlobalStore()
const { navbarHeight_Unexpanded } = storeToRefs(global)

// Configure page
definePageMeta({
  layout: false,
})

// Pad rootElement so that navbar doesn't overlap
watch(navbarHeight_Unexpanded, (newHeight) => {
  rootElement!.value!.style.paddingTop = `${newHeight}px`
})

// State
const selectedOption = ref<string>('')

watch(selectedOption, (newValue) => {
  
  if (newValue == 'base') {
    openPaddleCheckout('pri_01hnp1bmt8cs73d49s8v64wtjg' /* Sandbox */)
  } else if (newValue == 'generous') {
    openPaddleCheckout('pri_01hnp1e1d7cm1g1gqgsq738s0y' /* Sandbox */)
  } else if (newValue == 'very-generous') {
    openPaddleCheckout('pri_01hnp1hc8jgpv3qfw0w9v94p7a' /* Sandbox */)
  } else {
    console.assert(false)
  }

})

</script>

<style lang="postcss" scoped>

</style>