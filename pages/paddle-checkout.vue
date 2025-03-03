<!-- 

  Notes:
  - On the wrapper for the "see it in action" button we had to set `min-h-[52px]` instead of h-[52px], for it to actually work. No idea why.


 -->

 <template>
  <div ref="rootElement" class="flex flex-col items-center text-[1.0rem] xs:mx-[1rem] mx-[2rem] ch-[a]:normal-link-color">

    <div class="flex flex-col items-stretch max-w-[45rem]">


      <p class="text-red-500"> THIS PAGE IS A WORK IN PROGRESS - DONT BUY THE APP FROM HERE </p>

      <!-- Header -->
      
      <!-- <BottomNav class="mt-[1rem] mb-[-3rem] self-start translate-y-[0rem]" :is-minimal="true" color-class="accent-[default] strong:gradient-blue" downloads-badge-color="4094ff"/> -->

      <div class="flex flex-col items-start mt-[5rem]">

        <BackButton path="/">
          {{ mdrf(MFLocalizedString(`Front Page`, 'checkout-header.back-button', `The checkout page is still work-in-progress so you don't have to translate it, yet.`)) }}
        </BackButton>
        <!-- <NuxtImg ref="mmfIcon" :src="mmfIconImagePath" sizes="225px" alt="Mac Mouse Fix Icon" :class="['h-[6.5rem] mb-[3rem] mr-[1rem] hidden']"/> --> <!-- Copied this from intro.vue, not sure if good -->
        <p class="xs:text-[2.5rem] text-[3.0rem] font-[600]">
          <!-- <span class="font-[600] text-[1em] inline-block translate-y-[-0.1em]">􀎤</span>  -->
          {{ mdrf(MFLocalizedString(`Buy Mac Mouse Fix`, 'checkout-header.title', '')) }}
        </p>
        <!-- <p class="mb-[15rem]">Make your $10 Mouse Better than an Apple Trackpad!</p> -->
      </div>

      <hr class="my-[4em] opacity-1">

      <!-- Options -->

      <p v-html="mdrf(MFLocalizedString(`How much would you like to pay?`, 'checkout-options.title', ''))" class="self-start text-[1.7em] font-[600] mb-[0.7em] mt-[0rem]"></p>
      <p v-html="mdrf(MFLocalizedString(`You can pay a bit more to support the project.`, 'checkout-options.hint', ''))" class="self-start text-[1.1em] font-[500] text-neutral-500/[1.0] mb-[1.5em]"></p>

      <div class="flex flex-col gap-[2em]">

        <!-- Just Mac Mouse Fix -->
        <CheckoutOption :price="mdrf(MFLocalizedString(`$1.99`, 'checkout-option.base.price', ''), {}, false)" 
                        :title="mdrf(MFLocalizedString('', 'checkout-option.base.title', `Note to self: Why doesn't this have a value in the base file?`), {}, false)"
                        :body="mdrf(MFLocalizedString(`Just Mac Mouse Fix`, 'checkout-option.base.body', ''), {}, false)"
                        :disclaimer="mdrf(MFLocalizedString(`+ tax`, 'checkout-option.disclaimer', ''), {}, false)"
                        :is-selected="selectedOption == 'base'" @click="selectedOption = 'base'"/>

        <!-- Generous Contributor -->
        <CheckoutOption :price="mdrf(MFLocalizedString(`$4.99`, 'checkout-option.generous.price', ''), {}, false)"
                        :title="mdrf(MFLocalizedString(`**Generous Contributor**`, 'checkout-option.generous.title', ''), {}, false)"
                        :body="mdrf(MFLocalizedString(
                          `
                          1. Mac Mouse Fix
                          2. Milkshake for Noah
                          3. You'll be shown under **Generous Contributors** in the [Acknowledgements](https://github.com/noah-nuebling/mac-mouse-fix/blob/master/Acknowledgements.md)
                          `, 
                          'checkout-option.generous.body', 
                          ''
                        ), {}, false)"
                        :disclaimer="mdrf(MFLocalizedString(`+ tax`, 'checkout-option.disclaimer', ''), {}, false)"
                        :is-selected="selectedOption == 'generous'" @click="selectedOption = 'generous'"/>

        <!-- Very Generous Contributor -->
        <CheckoutOption :price="mdrf(MFLocalizedString(`$9.99`, 'checkout-option.very-generous.price', ''), {}, false)"  
                        :title="mdrf(MFLocalizedString(`**Very Generous Contributor**`, 'checkout-option.very-generous.title', ''), {}, false)"
                        :body="mdrf(MFLocalizedString(
                          `
                          1. Mac Mouse Fix
                          2. *Awesome* Milkshake for Noah!
                          3. You'll be shown under ***Very* Generous Contributors** in the [Acknowledgements](https://github.com/noah-nuebling/mac-mouse-fix/blob/master/Acknowledgements.md#-very-generous-contributors), and you can also leave a message there if you like
                          `, 
                          'checkout-option.very-generous.body', 
                          ''
                        ), {}, false)"
                        :disclaimer="mdrf(MFLocalizedString(`+ tax`, 'checkout-option.disclaimer', ''), {}, false)"
                        :is-selected="selectedOption == 'very-generous'" @click="selectedOption = 'very-generous'"/>
      </div>

      <!-- Extra Info (for Acknowledgements) -->
      


      <div :style="selectedOption == 'generous' || selectedOption == 'very-generous' ? '' : 'display: none'">

        <hr class="my-[4em] opacity-1">

        <div :style="selectedOption == 'generous' ? '' : 'display: none'">
          <p v-html="mdrf(MFLocalizedString(`Add your name`, 'checkout-extras.title.name', ''))" class="self-start text-[1.7em] font-[600] mb-[0.7em] mt-[0]"></p>
          <p v-html="mdrf(MFLocalizedString(
            `Your name will be shown in the [Acknowledgements](https://github.com/noah-nuebling/mac-mouse-fix/blob/master/Acknowledgements.md). Thank you for your generosity!`, 
            'checkout-extras.hint.name', 
            ''
            ))" 
            class="self-start text-[1.1em] font-[500] text-neutral-500/[1.0] mb-[1.5em]">
          </p>
        </div>
        <div :style="selectedOption == 'very-generous' ? '' : 'display: none'">
          <p v-html="mdrf(MFLocalizedString(`Add your name and message`, 'checkout-extras.title.message', ''))" class="self-start text-[1.7em] font-[600] mb-[0.7em] mt-[0]"></p>
          <p v-html="mdrf(MFLocalizedString(
            `Your name and message will be shown in the [Acknowledgements](https://github.com/noah-nuebling/mac-mouse-fix/blob/master/Acknowledgements.md#-very-generous-contributors). Thank you so much for your generosity!`,
            'checkout-extras.hint.message',
            ''))"
            class="self-start text-[1.1em] font-[500] text-neutral-500/[1.0] mb-[1.5em]">
          </p>
        </div>

        <div class=""> <!-- border rounded-[1.6rem] bg-white p-[1.5rem] shadow-sm -->

          <!-- Name field -->
          <div :style="selectedOption == 'generous' || selectedOption == 'very-generous' ? '' : 'display: none'">
            <p v-html="mdrf(MFLocalizedString(`Your Name`, 'checkout-extra.name.title', ''))"    class="text-[1.2em] font-[600] mb-[0.5em] mt-[0em]"
              :style="selectedOption == 'very-generous' ? '' : 'display: none'"/>
            <input v-model="paddleCustomData.name" type="text" class="border-black/[0.1] bg-white/[0.75] border rounded-[0.75rem] h-[3.5rem] px-[1rem] text-[1.1rem] w-full">
          </div>

          <!-- Message field -->
          <div :style="selectedOption == 'very-generous' ? '' : 'display: none'">
            <p v-html="mdrf(MFLocalizedString(
              `Your Message`, 
              'checkout-extra.message.title', 
              `The checkout page is still work-in-progress so we don't have to translate it, yet`
              ))" 
              class="text-[1.2em] font-[600] mb-[0.5em] mt-[1em]">
            </p>
            <input v-model="paddleCustomData.message" type="text" class="border-black/[0.1] bg-white/[0.75] border rounded-[0.75rem] h-[3.5rem] px-[1rem] text-[1.1rem] w-full">
          </div>
        </div>
      </div>

  

      <!-- Paddle inline checkout -->

      <div ref="paddleCheckoutContainerContainer" class="hidden mx-[-8px]"> <!-- We set padding inside Paddle and then remove it with negative margin here. Otherwise the textfield glow is cut off -->

        <!-- <p v-html="'Check out'" class="self-start text-[1.7em] font-[600] mb-[0.7em] mt-[5vh]"></p>
        <p v-html="'Checking out is handled by Paddle'" class="self-start text-[1.1em] font-[500] text-neutral-500/[1.0] mb-[-2em]"></p> -->
        <hr class="my-[4em] opacity-1">

        <div class="w-full flex justify-end items-center">
          <!-- <div class="w-[10rem]">
            <div class="flex justify-between"><p>Subtotal:</p><p>$9.99</p></div>
            <div class="flex justify-between"><p>Tax:</p><p>$1.76</p></div>
            <div class="flex justify-between"><p>Total:</p><p><strong>$10.75</strong></p></div>
          </div> -->
        </div>
        <p v-if="totals" class="w-full text-end px-[1rem] mb-[0rem] text-[1rem] font-[400]"> 
          <!-- 
            Display totals
            Notes: 
            - Should've probably used Paddle.PricePreview() to implement this, instead of custom formatAsMoney() method. But oh well.
            - See Paddle documentation for context: https://developer.paddle.com/build/customers/get-customer-credit-balances 
            - https://developer.paddle.com/api-reference/transactions/list-transactions
            - There are two weird data fields in the docs that don't show up for us at the moment: credit_to_balance and grand_total
            - ChatGPT says the credit stuff is confusing since user might wonder: Where does the credit come from? Where is it stored? What can it be used for? But I don't know the answer to these questions either so we'll just leave it for now.
          -->
          <span v-if="totals.subtotal != totals.total">       {{  mdrf(MFLocalizedString(`Subtotal:`, 'checkout-totals.subtotal', '')) }}                   <span class="">{{ formatAsMoney(totals.subtotal, currencyCode!, currencyLocale) }}</span></span>
          <span v-if="totals.discount > 0">             <br>  {{  mdrf(MFLocalizedString(`Discount:`, 'checkout-totals.discount', ''))  }}                  <span class="">-{{ formatAsMoney(totals.discount, currencyCode!, currencyLocale) }}</span></span>
          <span v-if="totals.tax > 0">                  <br>  {{  mdrf(MFLocalizedString(`Tax:`, 'checkout-totals.tax', ''))  }}                            <span class="">{{ formatAsMoney(totals.tax, currencyCode!, currencyLocale) }}</span></span>
          <span>                                        <br>  {{  mdrf(MFLocalizedString(`Total:`, 'checkout-totals.total', ''))  }}                        <span class=""><strong>{{ formatAsMoney(totals.total, currencyCode!, currencyLocale) }}</strong></span></span>
          <span v-if="totals.credit > 0">               <br>  {{  mdrf(MFLocalizedString(`Credit Applied:`, 'checkout-totals.credit', ''))  }}              <span class="">-{{ formatAsMoney(totals.credit, currencyCode!, currencyLocale) }}</span></span>
          <span v-if="totals.balance != totals.total">  <br>  {{  mdrf(MFLocalizedString(`Balance:`, 'checkout-totals.balance', ''))  }}                    <span class="">{{ formatAsMoney(totals.balance, currencyCode!, currencyLocale) }}</span></span>
          <span v-if="totals.credit_to_balance">     <br><br> {{  mdrf(MFLocalizedString(`Credit Received:`, 'checkout-totals.credit-to-balance', ''))  }}  <span class="">{{ formatAsMoney(totals.credit_to_balance, currencyCode!, currencyLocale) }}</span></span>
        </p>
        
        <div ref="paddleCheckoutContainer" class="paddle-checkout-container"></div> <!-- border rounded-[1.6rem] bg-white shadow-sm p-[0.75rem] -->
      </div>

      <!-- Bottom divider (for BottomNav) -->
      <hr class="my-[4em] opacity-1">
    </div>

    <!-- Bottom navigation -->
    <BottomNav :is-minimal="true" color-class="accent-[default] strong:gradient-blue" downloads-badge-color="4094ff"/> <!-- Good: 2f9bff, 4798ff, 4094ff || #3b82f6 is tailwinds blue-500 color -->

    <!-- Bottom spacer (for BottomNav) -->
    <hr class="mt-[4em] opacity-0">



  </div>
</template>

<script setup lang="ts">

// Import other stuff
const { $coolI18n: { mdrf, MFLocalizedString } } = useNuxtApp();
const $i18n = useI18n()
import { formatAsMoney } from '../utils/util'

// Import assets
// const mmfIconImagePath = "/mmf-icon.png"
// import chevronLeft from '../assets/img/chevron.backward.circle-blue@8x.png'

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


// HTML Refs
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

// State

const selectedOption = ref<string>('')
var totals = ref<Object|null>(null)
var currencyCode = ref<string|null>(null)
var currencyLocale = 'en' // $i18n.locale.value
var paddleCustomData = reactive({
  'name': null,
  'message': null,
})

watch([selectedOption, paddleCustomData], ([newSelectedOption, newCustomData], [oldSelectedOption, oldCustomData]) => {
  
  /* Discussion: 
    - We recreate the whole Paddle checkout any time one of these values changes. There is Paddle.Checkout.updateCheckout(), but it doesn't let us update the custom data according do docs. So we just recreate the checkout.
    - Perhaps we could pass in a transaction ID so that Paddle restores some of the entered information, but probably not worth it. */

  if (newSelectedOption != '') {
    paddleCheckoutContainerContainer.value?.classList.remove('hidden')
  }

  const ch =  newSelectedOption != oldSelectedOption ? openPaddleCheckout : debouncedOpenPaddleCheckout

  if (newSelectedOption == 'base') {
    ch('pri_01hnp1bmt8cs73d49s8v64wtjg' /* Sandbox */, newCustomData)
  } else if (newSelectedOption == 'generous') {
    ch('pri_01hnp1e1d7cm1g1gqgsq738s0y' /* Sandbox */, newCustomData)
  } else if (newSelectedOption == 'very-generous') {
    ch('pri_01hnp1hc8jgpv3qfw0w9v94p7a' /* Sandbox */, newCustomData)
  } else {
    console.assert(false)
  }
}, { deep: true })

function handlePaddleEvent(event: Object) {

  console.debug(`Received Paddle event: ${event.name}: ${objectDescription(event, null, 4)}`)

  updatePaddleCheckoutHeight()

  if (event.type == "checkout.ping.size") {
      if (paddleCheckoutContainer.value) {
        const iFrame = paddleCheckoutContainer.value!.querySelector('iframe')!
        console.debug(`The iFrame: ${iFrame}`)
        iFrame.height = `${event['height']}`;
      }
      return
  }
    
  if (event.name == 'checkout.closed') {
    window.open("/", "_self"); // Navigate to domain root. This happens when the user clicks the little 'x' button. Ideally I'd like to hide that one.
  }

  // console.debug(`TOTALLS: ${objectDescription(event, null, 4)}`)

  if (event.data) {
    if (event.data.totals) {
      totals.value = event.data.totals
    }
    if (event.data.currency_code) {
      currencyCode.value = event.data.currency_code
    }
  }
}

const debouncedOpenPaddleCheckout = debouncer((priceId: string, customData: Object) => openPaddleCheckout(priceId, customData), 500)

function openPaddleCheckout(priceId: String, customData: Object) {

  /* Notes:
    - Sandbox credit cards at: https://developer.paddle.com/concepts/payment-methods/credit-debit-card 
  */

  Paddle.Checkout.open({ 					// See the docs at: https://developer.paddle.com/build/checkout/build-branded-inline-checkout || https://developer.paddle.com/paddlejs/methods/paddle-checkout-open
    customData: customData,			  // We pass in the user's name and message through this.
    discountCode: null, 					// Prepopulate with discount.
    settings: {
      displayMode: 'inline',			// Overlay is simpler. Good example of inline checkout at https://my.setapp.com/activate

      frameTarget: 'paddle-checkout-container', 				
      frameInitialHeight: 623, 	                // For China the initial height is currently 517, Germany/USA: 623,  docs say 450 is recommended
      frameStyle: "min-width: 286px; width: 100%; overflow: visible;",             //  Docs say min width should be >= 286 || Here's the official tutorial where they set some example values: https://developer.paddle.com/build/checkout/build-branded-inline-checkout || Here are the docs: https://developer.paddle.com/paddlejs/methods/paddle-checkout-open
      
      theme: null, 								// There doesn't seem to be an auto option. Defaults to light. Dark looks fresher. Edit: But light seems more 'trustworthy' I think.
      // successUrl: null, 					// If this is null, Paddle will display a simple success message saying they emailed you the order details. For Swish, the email contains download link, license key and custom instructions, which is all we want I think. Edit: Comment this out due to errors setting to null.
      locale: $i18n.locale.value, 	// Null so that it automatically detects browser locale. Edit: Comment this out due to errors setting to null. Edit: We'd rather manually set the locale so everything is consistent
      //showAddDiscounts: null, 		// At the moment, discount field doesn't seem to show up when we set this to null. (We don't have any discount codes at the moment.) (In sandbox environment setting this to null leads to error atm.)

      allowLogout: true, 				// This hides the little 'Not you?' button next to your email on the second screen. Very small detail but I think it's slightly cleaner without this. Edit: There is no back button and this is the simplest substitute to implement - so enabling this for now. Edit: Doesn't even show up atm. Maybe only for overlay checkout?
      showAddTaxId: true, 				// The use case for this is very niche but can avoid VAT for some businesses, so why not. Documented here: https://www.paddle.com/help/sell/tax/how-paddle-handles-vat-on-your-behalf
    
      // allowedPaymentMethods: null, 	// Just setting this to null seems to allow everything from my testing. Although I can't get alipay to show up even when I connect a VPN to China mainland. Edit: That's because Alipay is in early access and you have to apply for it. See https://developer.paddle.com/concepts/payment-methods/alipay Edit: Comment this out due to errors setting to null.
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
import { useGlobalStore } from '~/store/global';
const global = useGlobalStore()

// Configure page
definePageMeta({
  layout: false, /// Disable the default layout
})

// Pad rootElement so that navbar doesn't overlap
watch(() => global.navbarHeight_Unexpanded, (newHeight) => {
  rootElement!.value!.style.paddingTop = `${newHeight}px`
})



</script>

<style lang="postcss" scoped>

</style>