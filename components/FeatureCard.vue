  <!-- 
    Notes:
    - bg-origin-border is needed to make the border work properly with background gradient. See https://stackoverflow.com/questions/11717873/why-are-border-colors-inverted-when-a-background-gradient-is-applied
    - $attrs.class contains the classes set by the parent like this <FeatureCard class="baz boo" />
    - We're making the card a flexbox just to center the video vertically during the expand animation. Not sure this is the best solution. Also no idea why/if the video is centered horizontally, if the card has a taller aspect ratio than the card.
    - If we set margins on the slot content, that currently doesn't work properly for the default slot for some reason. The div around the default slot has the exact size of the slot content, but without the slot content's margins. This makes it so part of the slot content is cut off. I don't know what's going on. We'll just use padding instead of margins for now. Edit: This doesn't happen anymore now. I dont' know what changed. Might have to do with `space-x-0` and `space-y-0` which we removed.
    - I struggled controlling which part of the card content gets clipped / resized during the animation. It was because we couldn't get elements to shrink below their content size. Solution was setting min-h-0 and min-w-0 (for flex items) or setting overflow-clip (for block or flex items). Source: https://stackoverflow.com/a/38383437/10601702
      - However I couldn't get it to work properly with block items, so we made everything flex. But the expandedCardContent div and the other children of the `swappableContentContainer` *don't* seem to need the min-[axis]-0 to shrink properly. I have no clue why. Edit: When we switched everything to flex-col (instead of the default flex-row), we DID have to add the min-[axis]-0 for things to work. I'm lost. But hey it works.
      - We made everything flex because it works and block confuses me. The expandedCardContent div starts out with display: none (twcc `hidden`) and gets display: flex through js
      - We had to add grow for the flex items to grow beyond content size vertically (along with min-[axis]-0 to make it shrink vertically I think?). Not sure what's going on.
    - On the defaultCardContent div we had to set flex-col (default is row), otherwise things would behave super weird when trying to set margins on its child. No clue why. We're setting everything to flex col, even if we only expect the flexbox to contain one item because of this.
    
    - !We made lots of changes since we wrote the stuff above ^^^. We overhauled the animations to be transform-based and let the animations start later so they perform okay on Safari and mobile. Changed the structure to facilitate this and didn't document the decision-making. So I think most of the stuff above is irrelevant now. 
  -->

<template>
  <div
    ref="card"
    :class="['overflow-clip relative will-change-[transform,opacity] ', $props.class, doesExpand ? 'cursor-pointer' : '']"
    v-on-click-outside="{ onEvent: () => { isExpanded = false }, condition: isExpanded, blockEvents: true }">

    <!-- Background Filter Container -->
    <div 
      ref="backgroundFilterContainer"
      :class="['h-full w-full rounded-[inherit]', $props.backgroundFilterClass]">

      <!-- Border Container -->
      <div
        ref="borderContainer"
        :class="['overflow-clip h-full rounded-[inherit]', $props.borderClass]">

          <!-- Content Container -->
        <div
          id="contentContainer"
          ref="contentContainer"
          :class="['h-full flex flex-col will-change-[transform,opacity]', $props.contentClass]">

          <!-- Minimize hint -->
          <div 
            ref="minimizeHint"
            class="hidden justify-center items-center absolute inset-0 bg-white/70 backdrop-blur-xl z-[10] invisible opacity-0 transition-opacity duration-[0.5s]">
            
            <p class="text-blue-500/90 font-[600] text-center text-[1.6rem] group-hover:underline">{{ $t('feature-card.minimize-hint') }}</p>
          </div>

          <!-- Top -->
          <div ref="topCardContent" class="flex flex-col">
            <slot name="top"/>
          </div> 

          <!-- Swap -->
          <div ref="swappableContentContainer" class="min-h-0 min-w-0
                                                      grow
                                                      flex flex-col">

            <!-- Default -->
            <div ref="defaultCardContent" id="defaultCardContent" class="min-h-0 min-w-0
                                                grow
                                                flex flex-col">
              <slot name="default"/>
            </div>

            <!-- Expanded -->
            <div ref="expandedCardContent" id="expandedCardContent" class="min-h-0 min-w-0
                                                  grow
                                                  hidden flex-col">
              <slot name="expanded"/>
            </div>
          </div>

          <!-- Bottom -->
          <div ref="bottomCardContent" class="flex flex-col">
            <slot name="bottom"/>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  
import { type AnimationCurve, type Curve, transfromCurve, combineCurves } from "~/utils/animationCurveTransform";
import { prefersReducedMotion } from "~/utils/util";
import tailwindConfig from "~/tailwind.config";
import resolveConfig from 'tailwindcss/resolveConfig'
const constants = useConstants()

// Import BezierEasing
//  Notes: 
//  - Should we import this through nuxt plugins or is this okay?... ChatGPT says this is okay. Plugins just let you globally inject for convenience, so you don't have to import.
//  - Not using the package atm, so we uninstalled it.
// import BezierEasing from 'bezier-easing'

// Import (is that the right term?) vue/nuxt stuff
const { $ScrollTrigger, $store, $gsap, $Power0, $Power1, $Power2, $Power3, $Power4 } = useNuxtApp()
const slots = useSlots()

// Import tailwind config
const tw = resolveConfig(tailwindConfig)

// Define props
var props = defineProps({
  class: String,
  borderClass: String,
  backgroundFilterClass: String,
  contentClass: String,
  doesExpand: Boolean,
})

//
// Setup expand
//

// Configure gsap
// Lag smoothing prevents skipped frames
// Notes:
// - This prevents issue where first few frames of animation are just skipped under desktop Safari, but when performance is too bad it can make things really unresponsive.
// - On iOS Safari, with batter saver enabled animations play back at half framerate, so we allow down to half framerate before slowing down the animation (values 34, 33)
// - This is a global gsap setting, it might not make sense to set it here.

$gsap.ticker.lagSmoothing(34, 33);

// Define vars
const isExpanded = ref(false)
const isAnimationExpanded = ref(false) // Set only after the animations complete
var animationContext: any = null

// Get references to relevant dom elements
// The stuff initialized to ref(null) will be automatically bound to the html element with the ref attribute set to the same value by vue
const card: Ref<HTMLElement | null> = ref(null)
const contentContainer: Ref<HTMLElement | null> = ref(null)
const borderContainer: Ref<HTMLElement | null> = ref(null)
const backgroundFilterContainer: Ref<HTMLElement | null> = ref(null)

const topCardContent: Ref<HTMLElement | null> = ref(null)  
const defaultCardContent: Ref<HTMLElement | null> = ref(null)
const expandedCardContent: Ref<HTMLElement | null> = ref(null)
const bottomCardContent: Ref<HTMLElement | null> = ref(null)

var minimizeHint: Ref<HTMLDivElement | null> = ref(null)

var video: HTMLVideoElement | null = null

// Define storage for dynamically created elements
var cardPlaceholder: HTMLDivElement | null = null
var placeholderContentContainer: HTMLDivElement | null = null

// Methods for parent
function toggleExpand() {
  isExpanded.value = !isExpanded.value
}
defineExpose({
  toggleExpand,
  isExpanded,
  isAnimationExpanded,
})

// Additional setup after mount
onMounted(() => {

  // Get reference to video
  video = findChild(card.value!, (child) => child.tagName == 'VIDEO') as HTMLVideoElement

  
  if (video != null) {

    // Stop video from autoplaying
    video.pause()

    // Do stuff after video ends
    video.addEventListener('ended', () => {

      // Show minimizeHint
      minimizeHint.value!.style.visibility = 'visible'
      minimizeHint.value!.style.opacity = '1.0'
      
    }, false)
  }  
})

// Cleanup after unmount
onUnmounted(() => {
  if (animationContext != null) {
    animationContext.revert() /* Clean up animation memory stuff or sth */
  }
});

// Don't do stuff if !doesExpand
// Discussion: 
// - First, we were trying to wrap this code in a function so that we can early return. But we can't do certain stuff inside functions like access `this` or call stuff like defineExpose, afaiu, so we're just wrapping everything inside a huge if-statement
// - Edit: Can't call defineExpose from inside if-statement, either, so we doing the if-statement all the way down here

if (props.doesExpand) {

  // React to isExpanded change
  watch(isExpanded, (shouldExpand) => {    

    // Kill current animations
    // Not totally sure if this is appropriate here. I think it prevents the onComplete method from being called when the card is unexpanded during the expand animation, which would lead to the zIndex getting messed up.
    if (animationContext) {
      animationContext.kill()
    }

    // DEBUG
    console.log(`Set card cursor to: ${ card.value!.style.cursor }`)

    // Animate and stuff
    if (shouldExpand) {

      ///
      /// >>> Expand <<<
      ///

      // Set cursor
      // card.value!.style.cursor = 'auto'

      // Load video
      //  Don't need to do this. We immediately reload the video after unloading which loads the thumbnail without loading the whole video
      // loadVideos(card.value!)

      // Create backdrop
      // Notes: We used the backdrop only to monitor clicks outside the card. But this broke when we made everything look Apple-y. So we're just using v-click-outside instead.
      
      // if ($store.backdrop == null) {
      //   var b = document.createElement('div') as HTMLElement
      //   b.classList.add('h-screen', 'w-screen', 'z-[50]', 'fixed', 'top-0', 'left-0', 'cursor-auto')
      //   // b.classList.add('bg-stone-900/50') // Not displaying the backdrop. But using it to close card when user click outside the card
      //   $store.backdrop = b
      // }

      // Close card when backdrop is clicked
      //  We need to do this every time so *this* specific card is closed and not another card that the backdrop was previously used with
      // $store.backdrop.onclick = (_) => isExpanded.value = false

      // Insert backdrop into document
      // document.body.appendChild($store.backdrop)

      // Bring card to front
      card.value!.style.zIndex = '100'

      // Get current card size and position relative to nearest positioned ancestor
      // See https://developer.mozilla.org/en-US/docs/Web/API/CSS_Object_Model/Determining_the_dimensions_of_elements
      const originWidth = card.value!.offsetWidth
      const originHeight = card.value!.offsetHeight
      
      const originTop = card.value!.offsetTop
      const originLeft = card.value!.offsetLeft
      const originCenterX = originLeft + originWidth/2.0
      const originCenterY = originTop + originHeight/2.0

      // Record border style (we don't modify border style, so not needed)
      // const originBorderWidth = parseInt(getComputedStyle(card.value!).borderWidth.slice(0, -2)) /* Slice off the `px` suffix from the string */
      // const originBorderRadius = parseInt(getComputedStyle(card.value!).borderRadius.slice(0, -2))

      // Create cardPlaceholder
      //  - Will be used as placeholder in the grid while we place the original card outside the grid
      //  - Also used as part of the expand/unexpand animation 
      //    - The idea is that the placeholder has the defaultContent, and the card has the expandedContent 
      //      and then we fade out the placeholder and fade in the card while applying transforms to both to 
      //      give the impression that the card is moving. For unexpand it's the same idea but reversed
      //  - We destroy the videos on the placeholder because we don't need to display it and it takes up lot of resources. I think causing iOS to crash after you open a few cards.

      if (cardPlaceholder == null) {
        cardPlaceholder = card.value!.cloneNode(true) as HTMLDivElement
        placeholderContentContainer = findChild(cardPlaceholder, (element) => element.id == 'contentContainer') as HTMLDivElement
        destroyVideos(cardPlaceholder)
      }

      // Replace the card with the placeholder
      card.value?.replaceWith(cardPlaceholder)

      // Place the expanded content in the card, hide the default content
      defaultCardContent.value!.style.display = 'none'
      expandedCardContent.value!.style.display = 'flex'

      // Position the expanded content normally
      //  (Because later code will set position = absolute so we need to reset that)
      //  TODO: Check if this is still necessary with transform-based animations
      expandedCardContent.value!.style.position = '' // Setting it to emptyString resets it to default which is `static` for position

      // Determine target styling of card
      // Notes:
      // - How to center absolutely positioned element: https://stackoverflow.com/questions/1776915/how-can-i-center-an-absolutely-positioned-element-in-a-div
      // - Ideally we wanna set the width relative to the grid width, because we don't want the expanded card to spill out of the grid so you still can see context which should make the interaction feel lighter. Currently, the percent-based sizes aren't relative to the grid, and there are some sizes where the expanded card spills out from the grid. Maybe we can fix this by inserting the expanded card into the container element which determines the grid width (and the width of the document as a whole.). But we'd have to position that element so it's the nearest positioned ancestor aka the '.offsetParent' and idk if that could lead to other problems?
      // - Our width style with the min() and max() functions is *very* confusing to read. Maybe it would be better to use tailwind with media queries? But mixing tailwind classes with setting style directly through js seems like a bad idea. Idk how you could assign media queried' css through js. So this is the best solution I can come up with for now.
      // - TODO: Add border radius, border width and shadow changes here.

      const targetLayout = 'absolute'

      const targetWidth = `min(max(66%, ${700}px), 100%, 800px, 110vh)`
      const targetMaxWidth = '100%'
      const targetHeight = 'fit-content'
      const targetMaxHeight = 'auto'

      const targetMarginLeft = 'auto'
      const targetMarginRight = 'auto'
      const targetLeft = '0'
      const targetRight = '0'
      var targetTop = ''

      // var targetBorderRadius = ''
      // var targetBorderWidth = ''
      const targetShadow = tw.theme.boxShadow["md-raised"]

      var calcScale = 0
      var calcWidth = 0
      var calcHeight = 0
      var calcTop = 0
      var calcLeft = 0
      var calcCenterX = 0
      var calcCenterY = 0

      // Placing the card at it's target (expanded) size and position in the document
      //  We use this to determine the remaining target styling (only 'targetTop' at the time of writing) and to record the calculated size and position. 
      //  We need the calculated size and position for animating. When we tried to animated to the targetStyle directly using gsap it didn't work. It seems the problem was somewhere with centering the absolutely positioned card by setting left and right to 0 and setting the leftMargin and rightMarging to auto. Animating this dinn't work proplerly it seems. There were also problems animating the maxHeight and maxWidth, but they could be resolved by setting those to a very high number right before the animation.

      if (card.value) {

        // Set layout method
        card.value.style.position = targetLayout

        // Set size and stuff
        card.value.style.width = targetWidth
        card.value.style.maxWidth = targetMaxWidth
        card.value.style.height = targetHeight
        card.value.style.maxHeight = targetMaxHeight

        // TESTING: Set height on the content div
        // TODO: Set this back to full on unexpand
        contentContainer.value!.style.height = 'fit-content'
        borderContainer.value!.style.height = 'fit-content'
        backgroundFilterContainer.value!.style.height = 'fit-content'

        // Place in document
        cardPlaceholder?.offsetParent?.appendChild(card.value)

        // Calculate target style
        //  We calculated targetTop such that the x center of the card stays in the same position after expanding
        const computedH = card.value.offsetHeight
        const heightIncrease = computedH - originHeight
        targetTop = /* `${originTop - heightIncrease/2.0}px` */ `${ originTop-(1*remInPx()) }px`

        // Set position and stuff
        card.value.style.marginLeft = targetMarginLeft
        card.value.style.marginRight = targetMarginRight
        card.value.style.left = targetLeft
        card.value.style.right = targetRight
        card.value.style.top = targetTop

        // Increase shadow
        card.value.style.boxShadow = targetShadow

        // TESTING
        // return

        // Measure computed size, position and scale
        calcWidth = card.value.offsetWidth
        calcHeight = card.value.offsetHeight
        calcTop = card.value.offsetTop
        calcLeft = card.value.offsetLeft
        calcCenterX = calcLeft + calcWidth/2.0
        calcCenterY = calcTop + calcHeight/2.0
        calcScale = ((calcWidth / originWidth) + (calcHeight / originHeight)) / 2.0

        // Calculate target style based on scale
        //  Note: Keep this in sync with video wrapper styling to make it look nice
        //  TODO: Make sense of this
        // targetBorderWidth = '4px' // `${originBorderWidth * calcScale}px`
        // targetBorderRadius = '24px' // `${originBorderRadius * calcScale}px`

        // Hide card and show placeholder
        //  This is the initial state for the animation. The animation might play after a delay, so we need to set the state here to prevent flickering
        card.value.style.opacity = '0.0'
        cardPlaceholder.style.opacity = '1.0'
      }

      // Define animation timeline

      var tl = $gsap.timeline({ paused: true })

      // Scroll card into view
      // Note: Just can't get this to work for some reason. Not even this codepen works? https://codepen.io/matthiasott/pen/KKVxqyY
      // if (root.value) {
      //   const r = root.value!
        
      //   console.log(`Type of r is: ${root.value!}`)

      //   $gsap.to(window, {
      //     duration: 1.0,
      //     scrollTo: '#defaultSlotWrapper',
      //     ease: "power1.easeInOut",
      //   })
      // }

      // Define post-animation actions
      const onEnd = () => {

        console.log(`on ENDDD`)

        // Update state
        isAnimationExpanded.value = true

        // Play video, once expand animation finishes
        if (isExpanded.value! == true && video != null && video.src != null) {
          video.play()
        }

        // Close card when it is scrolled away
        // When the card is already above the trigger zone when this is called, then the card unexpands immediately. But when it's below the trigger zone, this doesn't happen. Not sure why. I think ideally, we would scroll the card into view, but I can't get that to work right now, either. 
        $ScrollTrigger.create({
          trigger: card.value,
          start: "center bottom",
          end: "center top",
          onLeave: () => isExpanded.value = false,
          onLeaveBack: () => isExpanded.value = false,
        })

      }

      tl.eventCallback('onComplete', onEnd)

      // Set transformOrigin
      cardPlaceholder!.style.transformOrigin = 'left top'
      card.value!.style.transformOrigin = 'left top'
      contentContainer.value!.style.transformOrigin = "center top"
      placeholderContentContainer!.style.transformOrigin = "center top"

      // Animation params
      // Discussion: 
      // - We used to use more physically accurate curves with longer decelerations, but they 
      //      made part of the animation too fast which is especially jarring when there are frame-drops.
      // - We could make things look smoother by using bezier-easing npm package, if we drew the fade-in out a little longer like the MMF tab transitions, but then the cards become too transparent and you see what's behind. We'd have to fade the content but I think that'd bring a host of other problems, since we also need to fade the whole cards. We'll just leave it like it is.
      // Previous curves:
      // - dur: 0.5, sizeCurve: criticalSpring(4.0), centerCurve: criticalSpring(6.0)
      // - dur: 0.45, sizeCurve: $Power2.easeOut, centerCurve: $Power3.easeOut
      // - dur: 0.6, sizeCurve: $Power3.easeOut, centerCurve: $Power4.easeOut
      
      const shrinks = originWidth > calcWidth || originHeight > calcHeight
      const useSimpleAnimations = prefersReducedMotion() || shrinks || window.innerWidth <= constants.breakpoints.xs

      const dur = 0.6
      const easeForSize = $Power3.easeOut
      const easeForPosition = $Power4.easeOut
      const easeForFadeOut  = (x: number) => x //BezierEasing(0.0, 0.0, 1.0, 1.0)
      const easeForFadeIn   = (x: number) => x //BezierEasing(0.0, 0.0, 1.0, 1.0)
      const fadeDur = dur * 0.4
      
      const simpleDur = 0.6
      const simpleFadeDur = simpleDur * 0.35 // 0.6 // 0.35

      // 
      // Animation preprocessing
      //  

      // Create base curves

      const curveForCenterX  = useSimpleAnimations ? null : rawCurveFromAnimationCurve({ outputRange: { start: originCenterX, end: calcCenterX }, ease: easeForPosition })
      const curveForCenterY  = rawCurveFromAnimationCurve({ outputRange: { start: originCenterY, end: calcCenterY }, ease: easeForPosition }) // Unused now

      const curveForHeight   = useSimpleAnimations ? null : rawCurveFromAnimationCurve({ outputRange: { start: originHeight, end: calcHeight },   ease: easeForSize })
      const curveForWidth    = useSimpleAnimations ? null : rawCurveFromAnimationCurve({ outputRange: { start: originWidth,  end: calcWidth },    ease: easeForSize })

      // Calculate animation curves for top/left of the element
      //  Edit: Just using the previous centerY ease for top now because we're anchoring our animation at the top, not the center anymore

      const curveForTop = rawCurveFromAnimationCurve({ outputRange: { start: originTop, end: calcTop }, ease: easeForPosition }) // combineCurves(curveForCenterY, curveForHeight, (centerY, height) => centerY - height/2.0)
      const curveForLeft = useSimpleAnimations ? null : combineCurves(curveForCenterX!, curveForWidth!,  (centerX, width) => centerX - width/2.0)

      // Find find animations for translate and scale equivalent to the position and size animations defined above
      //  (Translate and scale are very fast to animate)

      const curveForTranslateX  = useSimpleAnimations ? null : transfromCurve(curveForLeft!,     (v) => v - curveForLeft!(0.0) )
      const curveForTranslateY  = transfromCurve(curveForTop,      (v) => v - curveForTop(0.0) )
      const curveForScaleX      = useSimpleAnimations ? null : transfromCurve(curveForWidth!,    (v) => v / curveForWidth!(0.0) )
      const curveForScaleY      = useSimpleAnimations ? null : transfromCurve(curveForHeight!,   (v) => v / curveForHeight!(0.0) )

      // Store the overall translate and scale 
      //  for convenience

      const translateX = useSimpleAnimations ? null : curveForTranslateX!(1.0)
      const translateY = curveForTranslateY(1.0)
      const scaleX = useSimpleAnimations ? null : curveForScaleX!(1.0)
      const scaleY = useSimpleAnimations ? null : curveForScaleY!(1.0)

      // Get inverse transforms
      //  Note: The transforms will be applied to the placeholder, which will be 
      //    at the original cards position in the layout, and the *inverse* transforms 
      //    will be applied to the original card element which will already be at it's target 
      //    position and size at the start of the animation. (That's why we have to apply *inverse* 
      //    transforms to it to get it to be at the original size and position at the start of the animation) 
      //    Overall, the placeholder and the original card should appear at the same position throughout the animation like this.
      //    Then we can fade between them, to get a smooth transition

      const curveForInverseTranslateX = useSimpleAnimations ? null : transfromCurve(curveForTranslateX!, (v) => v - translateX!)
      const curveForInverseTranslateY = transfromCurve(curveForTranslateY, (v) => v - translateY)
      const curveForInverseScaleX     = useSimpleAnimations ? null : transfromCurve(curveForScaleX!,     (v) => v / scaleX!)
      const curveForInverseScaleY     = useSimpleAnimations ? null : transfromCurve(curveForScaleY!,     (v) => v / scaleY!)

      // Calculate transforms for card-content
      
      // Counter scaling cancels out the card scaling to prevent content from stretching
      var curveForCounterScaleX = useSimpleAnimations ? null : transfromCurve(curveForInverseScaleX!, (scale) => 1/scale)
      var curveForCounterScaleY = useSimpleAnimations ? null : transfromCurve(curveForInverseScaleY!, (scale) => 1/scale)

      // This transform makes the card content scale up cover the card during the animation, but without stretching. 
      //  Basically we apply the same animation to the content (both axes) as to axis of the card which scales up less.
      // var curveForContentScaleX = combineCurves(curveForCounterScaleX, scaleX < scaleY ? curveForInverseScaleX : curveForInverseScaleY, (a, b) => a * b)
      // var curveForContentScaleY = combineCurves(curveForCounterScaleY, scaleX < scaleY ? curveForInverseScaleX : curveForInverseScaleY, (a, b) => a * b)

      // Let card content stay the same size while the card changes size
      var curveForContentScaleX = curveForCounterScaleX
      var curveForContentScaleY = curveForCounterScaleY

      // Calculate transforms for placeholder content
      var curveForPlaceholderCounterScaleX = useSimpleAnimations ? null : transfromCurve(curveForScaleX!, (scale) => 1/scale)
      var curveForPlaceholderCounterScaleY = useSimpleAnimations ? null : transfromCurve(curveForScaleY!, (scale) => 1/scale)
      // var curveForPlaceholderContentScaleX = combineCurves(curveForPlaceholderCounterScaleX, scaleX < scaleY ? curveForScaleX : curveForScaleY, (a, b) => a * b)
      // var curveForPlaceholderContentScaleY = combineCurves(curveForPlaceholderCounterScaleY, scaleX < scaleY ? curveForScaleX : curveForScaleY, (a, b) => a * b)
      var curveForPlaceholderContentScaleX = useSimpleAnimations ? null : curveForPlaceholderCounterScaleX
      var curveForPlaceholderContentScaleY = useSimpleAnimations ? null : curveForPlaceholderCounterScaleY

      // 
      // Scroll card into center of screen
      //

      const cardViewPortOffset = card.value!.getBoundingClientRect();
      const cardCenter = cardViewPortOffset.top + cardViewPortOffset.height/2.0
      const viewportHeight = window.innerHeight
      const viewportCenter = viewportHeight/2.0
      const cardCenterOffset = cardCenter - viewportCenter
      if (Math.abs(cardCenterOffset) / (viewportHeight/2.0) > 0.4) {
        tl.to(document.documentElement, {
          scrollTop: document.documentElement.scrollTop + cardCenterOffset,
          duration: 0.3,
          ease: $Power1.easeOut,
        })
      }

      //
      // Add animations to timeline
      //

      if (!useSimpleAnimations) {

        // Animate size-related styling on placeholder
        addAnimationToTimeline(tl, cardPlaceholder, 'scaleX', animationCurveFromRawCurve(curveForScaleX!), dur)
        addAnimationToTimeline(tl, cardPlaceholder, 'scaleY', animationCurveFromRawCurve(curveForScaleY!), dur)

        // Animate size-related styling on card
        addAnimationToTimeline(tl, card.value!, 'scaleX', animationCurveFromRawCurve(curveForInverseScaleX!), dur)
        addAnimationToTimeline(tl, card.value!, 'scaleY', animationCurveFromRawCurve(curveForInverseScaleY!), dur)

        // Counter-animate card content 
        //  to prevent stretching
        addAnimationToTimeline(tl, contentContainer.value!, 'scaleX', animationCurveFromRawCurve(curveForContentScaleX!), dur)
        addAnimationToTimeline(tl, contentContainer.value!, 'scaleY', animationCurveFromRawCurve(curveForContentScaleY!), dur)

        // Counter-animate placeholder content 
        addAnimationToTimeline(tl, placeholderContentContainer!, 'scaleX', animationCurveFromRawCurve(curveForPlaceholderContentScaleX!), dur)
        addAnimationToTimeline(tl, placeholderContentContainer!, 'scaleY', animationCurveFromRawCurve(curveForPlaceholderContentScaleY!), dur)
      }

      // Animate position-related styling on placeholder
      addAnimationToTimeline(tl, cardPlaceholder, 'y', animationCurveFromRawCurve(curveForTranslateY), useSimpleAnimations ? simpleDur : dur)
      if (!useSimpleAnimations) addAnimationToTimeline(tl, cardPlaceholder, 'x', animationCurveFromRawCurve(curveForTranslateX!), useSimpleAnimations ? simpleDur : dur)

      // Animate position-related styling on card
      addAnimationToTimeline(tl, card.value!, 'y', animationCurveFromRawCurve(curveForInverseTranslateY), useSimpleAnimations ? simpleDur : dur)
      if (!useSimpleAnimations) addAnimationToTimeline(tl, card.value!, 'x', animationCurveFromRawCurve(curveForInverseTranslateX!), useSimpleAnimations ? simpleDur : dur)

      // Fade out placeholder
      // Notes:
      //  - Neither opacity nor autoalpha work. (Not sure what autoAlpha is) Edit: Now it does. Not sure why. autoAlpha sets visibility: hidden automatically for optimization. We'll use this if it doesn't cause problems.
      addAnimationToTimeline(tl, cardPlaceholder, 'autoAlpha', { outputRange: { start: 1.0, end: 0.0 }, ease: easeForFadeOut }, useSimpleAnimations ? simpleFadeDur : fadeDur)

      // Fade in card
      addAnimationToTimeline(tl, card.value!, 'autoAlpha', { outputRange: { start: 0.0, end: 1.0 }, ease: easeForFadeIn },      useSimpleAnimations ? simpleFadeDur : fadeDur)

      // 
      // Wait until browser is done rendering, then start animation
      //
      // Notes:
      //  - This works since the timeline is paused. Also we're using fromTo everywhere which renders the from state immediately.
      //  - 0.05s delay prevents a little more jerkiness in Safari (might be placebo) without feeling less responsive in Chrome.

      doAfterRenderrr(() => { tl.play() }, 50)

    } else { 
      
      // 
      //  >>> Unexpand <<<
      //

      // Remove backdrop from layout
      // $store.backdrop?.remove()

      // Bring card to front but behind expanding and expanded cards (which have zIndex 100)
      card.value!.style.zIndex = '99'

      // Stop video
      if (video != null) {
        video.pause()
      }

      // After animation completes or is interrupted ...
      const onEnd = () => {

        // DEBUG
        console.log(`onEnd`)

        // Update state
        isAnimationExpanded.value = false

        // 
        // Restore unexpanded state of card
        //

        // Hide minimizeHint
        minimizeHint.value!.style.visibility = 'hidden'
        minimizeHint.value!.style.opacity = '0.0'

        // Replace card styling with placeholder styling
        // Notes: 
        // - For some reason we can't set the .style directly, but instead have to set .style.cssText
        card.value!.style.cssText = cardPlaceholder!.style.cssText

        // Set cursor
        // 'pointer' is the hand
        // card.value!.style.cursor = 'pointer'

        // Bring card to normal level
        card.value!.style.zIndex = '0'

        // Remove transform
        card.value!.style.transform = ''
        contentContainer.value!.style.transform = ''

        // Restore default style of children
        contentContainer.value!.style.height = '100%'
        borderContainer.value!.style.height = '100%'
        backgroundFilterContainer.value!.style.height = '100%'

        // Place the default content in the card, hide the expanded content
        defaultCardContent.value!.style.display = 'flex'
        expandedCardContent.value!.style.display = 'none'

        ///
        /// ^^^
        ///

        // Hide placeholder, show card
        cardPlaceholder!.style.visibility = 'hidden'
        card.value!.style.visibility = 'visible'
        card.value!.style.opacity = '1.0'

        // Replace placeholder
        cardPlaceholder!.replaceWith(card.value!)

        // Reset playback time
        if (video != null) {
          video.currentTime = 0.0
        }

        // Unload video
        unloadVideos(card.value!)
      }

      // TESTING (We'll animate these later)
      // card.value!.style.transform = ''
      // card.value!.style.opacity = '1.0'
      // cardPlaceholder!.style.transform = ''
      // cardPlaceholder!.style.opacity = '1.0'
      // cardPlaceholder!.style.visibility = 'visible'
      
      // setTimeout(() => {
      //   onEnd()
      // }, 0.0 * 1000);
      
      // 
      // Define animation timeline
      // 

      //  Note: We do almost the exact same thing for the expand animations. The code there has more explanations and discussion
      
      var tl = $gsap.timeline({ paused: true })
  
      tl.eventCallback('onComplete', onEnd)
      
      // Set transformOrigin (Probably unnecessary since we already do this on expand)
      cardPlaceholder!.style.transformOrigin = 'left top'
      card.value!.style.transformOrigin = 'left top'
      
      // Gather data

      const currentWidth = card.value!.offsetWidth
      const currentHeight = card.value!.offsetHeight
      const currentLeft = card.value!.offsetLeft
      const currentTop = card.value!.offsetTop
      const currentCenterX = currentLeft + (currentWidth/2.0)
      const currentCenterY = currentTop + (currentHeight/2.0)

      const targetWidth = cardPlaceholder!.offsetWidth
      const targetHeight = cardPlaceholder!.offsetHeight
      const targetLeft = cardPlaceholder!.offsetLeft;
      const targetTop = cardPlaceholder!.offsetTop;
      const targetCenterX = targetLeft + (targetWidth/2.0)
      const targetCenterY = targetTop + (targetHeight/2.0)

      // Animation params
      // Previous curves:
      // - dur: 0.6, sizeCurve: criticalSpring(6.0), centerCurve: criticalSpring(5.0)
      // - dur: 0.6, sizeCurve: $Power4.easeOut, centerCurve: $Power3.easeOut
      // - dur: 0.7, sizeCurve: $Power4.easeOut, centerCurve: $Power3.easeOut

      const dur = 0.6
      const easeForSize = $Power4.easeOut
      const easeForPosition = $Power3.easeOut
      const fadeDur = dur * 0.2
      
      const simpleDur = 0.6
      const simpleFadeDur = simpleDur * 0.35
      
      const grows = currentWidth < targetWidth || currentHeight < targetHeight
      const useSimpleAnimations = prefersReducedMotion() || grows || window.innerWidth <= constants.breakpoints.xs

      // Create base curves

      const curveForCenterX  = useSimpleAnimations ? null : rawCurveFromAnimationCurve({ outputRange: { start: currentCenterX , end: targetCenterX }, ease: easeForPosition })
      const curveForCenterY  = useSimpleAnimations ? null : rawCurveFromAnimationCurve({ outputRange: { start: currentCenterY, end: targetCenterY }, ease: easeForPosition })
      
      const curveForHeight   = useSimpleAnimations ? null : rawCurveFromAnimationCurve({ outputRange: { start: currentHeight, end: targetHeight },   ease: easeForSize })
      const curveForWidth    = useSimpleAnimations ? null : rawCurveFromAnimationCurve({ outputRange: { start: currentWidth,  end: targetWidth },    ease: easeForSize })
      
      // Calculate animation curves for top/left of the element
      
      const curveForTop = rawCurveFromAnimationCurve({ outputRange: { start: currentTop, end: targetTop }, ease: easeForPosition }) // combineCurves(curveForCenterY, curveForHeight, (centerY, height) => centerY - height/2.0) <-- not using this bc anchoring card at the top now
      const curveForLeft = useSimpleAnimations ? null : combineCurves(curveForCenterX!, curveForWidth, (centerX, width) => centerX - width/2.0)
      
      // Find find animations for translate and scale equivalent to the position and size animations defined above
      
      const curveForTranslateX  = useSimpleAnimations ? null : transfromCurve(curveForLeft,      (v) => v - curveForLeft(0.0) )
      const curveForTranslateY  = transfromCurve(curveForTop,       (v) => v - curveForTop(0.0) )
      const curveForScaleX      = useSimpleAnimations ? null : transfromCurve(curveForWidth!,     (v) => v / curveForWidth!(0.0) )
      const curveForScaleY      = useSimpleAnimations ? null : transfromCurve(curveForHeight!,    (v) => v / curveForHeight!(0.0) )
      
      // Store the overall translate and scale 
      
      const translateX = useSimpleAnimations ? null : curveForTranslateX!(1.0)
      const translateY = curveForTranslateY(1.0)
      const scaleX = useSimpleAnimations ? null : curveForScaleX!(1.0)
      const scaleY = useSimpleAnimations ? null : curveForScaleY!(1.0)
      
      // Get inverse transforms
      
      const curveForInverseTranslateX = useSimpleAnimations ? null : transfromCurve(curveForTranslateX!, (v) => v - translateX!)
      const curveForInverseTranslateY = transfromCurve(curveForTranslateY, (v) => v - translateY)
      const curveForInverseScaleX     = useSimpleAnimations ? null : transfromCurve(curveForScaleX!,     (v) => v / scaleX!)
      const curveForInverseScaleY     = useSimpleAnimations ? null : transfromCurve(curveForScaleY!,     (v) => v / scaleY!)
      
      // Calculate transforms for card-content
      // The direction of the < here makes it so the content scales even more than the card, making for a cool, if slightly vertigo-inducing effect. We don't do this on the expand animations, where the > are opposite (a the time of writing) Edit: Turned the effect off. Was weird.

      // Counter scaling cancels out the card scaling to prevent content from stretching
      var curveForCounterScaleX = useSimpleAnimations ? null : transfromCurve(curveForInverseScaleX!, (scale) => 1/scale)
      var curveForCounterScaleY = useSimpleAnimations ? null : transfromCurve(curveForInverseScaleY!, (scale) => 1/scale)
      
      // This transform makes the card content scale up cover the card during the animation, but without stretching. 
      // var curveForContentScaleY = combineCurves(curveForCounterScaleY, scaleX > scaleY ? curveForInverseScaleX : curveForInverseScaleY, (a, b) => a * b)
      // var curveForContentScaleX = combineCurves(curveForCounterScaleX, scaleX > scaleY ? curveForInverseScaleX : curveForInverseScaleY, (a, b) => a * b)

      // This transform makes the card content stay the same size while the card scales
      var curveForContentScaleY = curveForCounterScaleY 
      var curveForContentScaleX = curveForCounterScaleX
      
      // Calculate transforms for placeholder content
      var curveForPlaceholderCounterScaleX = useSimpleAnimations ? null : transfromCurve(curveForScaleX!, (scale) => 1/scale)
      var curveForPlaceholderCounterScaleY = useSimpleAnimations ? null : transfromCurve(curveForScaleY!, (scale) => 1/scale)

      // var curveForPlaceholderContentScaleX = combineCurves(curveForPlaceholderCounterScaleX, scaleX > scaleY ? curveForScaleX : curveForScaleY, (a, b) => a * b)
      // var curveForPlaceholderContentScaleY = combineCurves(curveForPlaceholderCounterScaleY, scaleX > scaleY ? curveForScaleX : curveForScaleY, (a, b) => a * b)
      var curveForPlaceholderContentScaleX = useSimpleAnimations ? null : curveForPlaceholderCounterScaleX
      var curveForPlaceholderContentScaleY = useSimpleAnimations ? null : curveForPlaceholderCounterScaleY



      /* Add animations to timeline 
          Notes: We only enable complex animations under certain conditions (otherwise we do a simple fade). Conditiona at the time of writing:
          - prefersReducedMotion is off
          - animation grows in both dimensions -> That's because our animations look really crappy when the card shrinks while revealing the video.
          - The window is wider than the xs breakpoint (iPhone 6 width) -> That's because the animations are really slow on my iPhone 8. Not sure if necessary since the growing condition should already disable animations on iPhone 8.
      */
      
      if (!useSimpleAnimations) {
        
        // Animate size-related styling on card
        addAnimationToTimeline(tl, card.value!, 'scaleX', animationCurveFromRawCurve(curveForScaleX!), dur)
        addAnimationToTimeline(tl, card.value!, 'scaleY', animationCurveFromRawCurve(curveForScaleY!), dur)
        
        // Animate size-related styling on placeholder
        addAnimationToTimeline(tl, cardPlaceholder!, 'scaleX', animationCurveFromRawCurve(curveForInverseScaleX!), dur)
        addAnimationToTimeline(tl, cardPlaceholder!, 'scaleY', animationCurveFromRawCurve(curveForInverseScaleY!), dur)
        
        // Counter-animate placeholder content
        addAnimationToTimeline(tl, placeholderContentContainer!, 'scaleX', animationCurveFromRawCurve(curveForContentScaleX!), dur)
        addAnimationToTimeline(tl, placeholderContentContainer!, 'scaleY', animationCurveFromRawCurve(curveForContentScaleY!), dur)
        
        // Counter-animate card content 
        addAnimationToTimeline(tl, contentContainer.value!, 'scaleX', animationCurveFromRawCurve(curveForPlaceholderContentScaleX!), dur)
        addAnimationToTimeline(tl, contentContainer.value!, 'scaleY', animationCurveFromRawCurve(curveForPlaceholderContentScaleY!), dur)
      }

      // Animate position-related styling on card
      addAnimationToTimeline(tl, card.value!, 'y', animationCurveFromRawCurve(curveForTranslateY), useSimpleAnimations ? simpleDur : dur)
      if (!useSimpleAnimations) { addAnimationToTimeline(tl, card.value!, 'x', animationCurveFromRawCurve(curveForTranslateX!), useSimpleAnimations ? simpleDur : dur) }
      
      // Animate position-related styling on placeholder
      addAnimationToTimeline(tl, cardPlaceholder!, 'y', animationCurveFromRawCurve(curveForInverseTranslateY), useSimpleAnimations ? simpleDur : dur)
      if (!useSimpleAnimations) { addAnimationToTimeline(tl, cardPlaceholder!, 'x', animationCurveFromRawCurve(curveForInverseTranslateX!), useSimpleAnimations ? simpleDur : dur) }
    
      // Fade out card
      addAnimationToTimeline(tl, card.value!, 'autoAlpha', { outputRange: { start: 1.0, end: 0.0}, ease: (x) => x }, useSimpleAnimations ? simpleFadeDur : fadeDur)
      
      // Fade in placeholder
      addAnimationToTimeline(tl, cardPlaceholder!, 'autoAlpha', { outputRange: { start: 0.0, end: 1.0}, ease: (x) => x }, useSimpleAnimations ? simpleFadeDur : fadeDur)  
      
      
      // 
      // Wait until browser is done rendering, then start animation
      //
      
      // Discussion: This is useful for expand - Is it also useful for unexpand?
      
      doAfterRenderrr(() => { tl.play() }, 50)
    
      // vvv Old implementation
      // window.requestAnimationFrame(() => {
      //   setTimeout(() => {
          
      //     // Play timeline after delay
      //     $gsap.delayedCall(0.05, () => tl.play())
          
      //   }, 0)
      // });

    }
  })


  //
  // Helper functions for expand
  //

  function addAnimationToTimeline(tl: gsap.core.Timeline, element: HTMLElement, property: string, curve: AnimationCurve, duration: number, offset: number = 0.0) {

    // console.log(`tl: ${ tl }, element: ${ element }, property: ${ property }, curve: ${ curve }, duration: ${ duration }, offset: ${ offset }`)

    tl.fromTo(element, {
      [property]: curve.outputRange.start,
    }, {
      [property]: curve.outputRange.end,

      duration: duration,
      ease: curve.ease,
    }, offset)
  }

  function destroyCardAndReplaceWith(card: HTMLDivElement, replacement: HTMLElement) {

    // Unload videos
    destroyVideos(card)

    // Replace
    card.replaceWith(replacement)
  }

  function destroyCard(card: HTMLDivElement) {

    // Unload videos
    destroyVideos(card)

    // Remove from DOM
    card.remove()

  }

  function unloadVideos(element: HTMLElement) {

    // Free videos inside `element` from memory
    // Notes:
    // - See https://stackoverflow.com/questions/47445281/how-to-go-about-freeing-an-html5-video-from-memory
    // - If we don't do this iOS Safari starts crashing after opening a few cards, because they take up a lot of ram

    const videos = findChildren(element, (child) =>  child.tagName == 'VIDEO') as HTMLVideoElement[]

    for (const video of videos) {
      const src = video.currentSrc // Not sure why we have to use currentSrc (instead of src) here
      video.dataset['src'] = src
      video.src = ''
      video.load()

      // This might help load thumbnails on iOS when we reopen cards
      // Edit: Doesn't work, just creates memory overloads again. videos just keep playing on iOS it seems. Should test again, no time now.
      // TODO: Test this again ^^^
      
      setTimeout(() => {
        video.pause()
        video.currentTime = 0
        video.src = src
        video.load()
        video.pause()
        console.log(`videoData: preload: ${ video.preload }, currentSrc: ${ video.currentSrc }, currentTime: ${ video.currentTime }, isPaused: ${ video.paused }`)
      }, 0.0)

    }
  }
  function loadVideos(element: HTMLElement) {

    const videos = findChildren(element, (child) =>  child.tagName == 'VIDEO') as HTMLVideoElement[]

    for (const video of videos) {
      const src = video.dataset['src']
      if (src != undefined) {
        video.src = src
        video.load()
      }
    }
  }

  function destroyVideos(element: HTMLElement) {

    // Unload videos and remove
    // Otherwise the videos keep playing and take up hella cpu and memory
    // See: https://stackoverflow.com/questions/3258587/how-to-properly-unload-destroy-a-video-element


    const videos = findChildren(element, (child) =>  child.tagName == 'VIDEO') as HTMLVideoElement[]
    
    for (const video of videos) {
      video.src = ''
      video.load()
      video.remove()  
    }
  }

} // End of if (doesExpand) { ... 

</script>

<style lang="postcss" scoped>

</style>