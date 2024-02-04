<!-- 

  Notes:
  - On the wrapper for the "see it in action" button we had to set `min-h-[52px]` instead of h-[52px], for it to actually work. No idea why.


 -->

 <template>
  <div ref="rootElement" class="mt-[50px] flex flex-col items-center text-[1.0rem] xs:mx-[1rem] mx-[2rem] ch-[a]:normal-link-color">

    <div class="flex flex-col items-stretch max-w-[45rem]">

      <!-- Custom UI -->

      <!-- Header -->
      
      <div class="hidden">
        <NuxtImg ref="mmfIcon" :src="mmfIconImagePath" sizes="225px" alt="Mac Mouse Fix Icon" :class="['h-[10rem]']"/> <!-- Copied this from intro.vue, not sure if good -->
        <p class="text-[2.0rem] font-[600]">Mac Mouse Fix</p>
        <p class="mb-[15rem]">Make your $10 Mouse Better than an Apple Trackpad!</p>
      </div>

      <!-- Options -->

      <p v-html="$mt('checkout-options.title')" class="self-start text-[1.7em] font-[600] mb-[0.7em] mt-[5vh]"></p>
      <p v-html="$mt('checkout-options.hint')" class="self-start text-[1.1em] font-[500] text-neutral-500/[1.0] mb-[1.5em]"></p>

      <div class="flex flex-col gap-[2em]">

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

      <!-- Extra Info (for Acknowledgements) -->
      


      <div :style="selectedOption == 'generous' || selectedOption == 'very-generous' ? '' : 'display: none'">

        <hr class="my-[4em] opacity-1">

        <div :style="selectedOption == 'generous' ? '' : 'display: none'">
          <p v-html="'Add your name'" class="self-start text-[1.7em] font-[600] mb-[0.7em] mt-[0]"></p>
          <p v-html="$mt('checkout-extra.name.hint')" class="self-start text-[1.1em] font-[500] text-neutral-500/[1.0] mb-[1.5em]"/>
        </div>
        <div :style="selectedOption == 'very-generous' ? '' : 'display: none'">
          <p v-html="'Add your name and message'" class="self-start text-[1.7em] font-[600] mb-[0.7em] mt-[0]"></p>
          <p v-html="$mt('checkout-extra.message.hint')" class="self-start text-[1.1em] font-[500] text-neutral-500/[1.0] mb-[1.5em]"/>
        </div>

        <div class=""> <!-- border rounded-[1.6rem] bg-white p-[1.5rem] shadow-sm -->

          <!-- Name field -->
          <div :style="selectedOption == 'generous' || selectedOption == 'very-generous' ? '' : 'display: none'">
            <p v-html="$mt('checkout-extra.name.title')"    class="text-[1.2em] font-[600] mb-[0.5em] mt-[0em]"
              :style="selectedOption == 'very-generous' ? '' : 'display: none'"/>
            <input type="text" id="name" class="border-black/[0.1] bg-white/[0.75] border rounded-[0.75rem] h-[3.5rem] px-[1rem] text-[1.1rem] w-full">
          </div>

          <!-- Message field -->
          <div :style="selectedOption == 'very-generous' ? '' : 'display: none'">
            <p v-html="$mt('checkout-extra.message.title')" class="text-[1.2em] font-[600] mb-[0.5em] mt-[1em]"/>
            <input type="text" id="name" class="border-black/[0.1] bg-white/[0.75] border rounded-[0.75rem] h-[3.5rem] px-[1rem] text-[1.1rem] w-full">
          </div>
        </div>
      </div>

  

      <!-- Paddle inline checkout -->

      <div ref="paddleCheckoutContainerContainer" class="hidden mx-[-8px]"> <!-- We set padding inside Paddle and then remove it with negative margin here. Otherwise the textfield glow is cut off -->

        <!-- <p v-html="'Check out'" class="self-start text-[1.7em] font-[600] mb-[0.7em] mt-[5vh]"></p>
        <p v-html="'Checking out is handled by Paddle'" class="self-start text-[1.1em] font-[500] text-neutral-500/[1.0] mb-[-2em]"></p> -->
        <hr class="my-[4em] opacity-1">
        <div ref="paddleCheckoutContainer" class="paddle-checkout-container"></div> <!-- border rounded-[1.6rem] bg-white shadow-sm p-[0.75rem] -->
      </div>

    </div>

    <!-- Bottom navigation -->
    <BottomNav :is-minimal="true" color-class="accent-[default] strong:gradient-blue" downloads-badge-color="4094ff"/> <!-- Good: 2f9bff, 4798ff, 4094ff || #3b82f6 is tailwinds blue-500 color -->

  </div>
</template>

<script setup lang="ts">


// Import i18n stuff
const $mt = useMT()

// Import assets

const mmfIconImagePath = "/mmf-icon.png"

// Edit head
useHead({
  script: [
    {
      src: 'https://cdn.paddle.com/paddle/v2/paddle.js' // Include Paddle checkout
    },
    {
      type: 'text/javascript',
      innerHTML: `

      `
    }
  ]
})


// Refs

const paddleCheckoutContainer = ref<HTMLDivElement | null>(null)
const paddleCheckoutContainerContainer = ref<HTMLDivElement | null>(null)

// Paddle stuff

// On mount

onMounted(() => {

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
})


function handlePaddleEvent(event: Object) {

  console.log(`Received Paddle event: ${event.name}: ${JSON.stringify(event, null, 2)}`)

  updatePaddleCheckoutHeight()

  if (event['type'] == "checkout.ping.size") {
      const iFrame = paddleCheckoutContainer.value!.querySelector('iframe')!
      console.log(`The iFrame: ${iFrame}`)
      iFrame.height = `${event['height']}`;
  } else {
    
    if (event.name == 'checkout.closed') {
      window.open("/", "_self"); // Navigate to domain root. This happens when the user clicks the little 'x' button. Ideally I'd like to hide that one.
    }
  }
}

function openPaddleCheckout(priceId: String) {
	
  Paddle.Checkout.open({ 					// See the docs at: https://developer.paddle.com/build/checkout/build-branded-inline-checkout || https://developer.paddle.com/paddlejs/methods/paddle-checkout-open
    customData: null,							// Idk
    discountCode: null, 					// Prepopulate with discount.
    settings: {
      displayMode: 'inline',			// Overlay is simpler. Good example of inline checkout at https://my.setapp.com/activate

      frameTarget: 'paddle-checkout-container', 				
      frameInitialHeight: 623, 	                // For China the initial height is currently 517, Germany/USA: 623,  docs say 450 is recommended
      frameStyle: "min-width: 286px; width: 100%; overflow: visible;",             //  Docs say min width should be >= 286 || Here's the official tutorial where they set some example values: https://developer.paddle.com/build/checkout/build-branded-inline-checkout || Here are the docs: https://developer.paddle.com/paddlejs/methods/paddle-checkout-open
      
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

function updatePaddleCheckoutHeight() {
  // const iFrame = paddleCheckoutContainer.value!.querySelector('iframe')!
  // iFrame.height = `${iFrame.contentWindow!.document.body.scrollHeight}`;
}

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
  
  if (newValue != '') {
    paddleCheckoutContainerContainer.value?.classList.remove('hidden')
  }
  

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