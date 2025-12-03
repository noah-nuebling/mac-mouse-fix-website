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
    :class="['overflow-clip relative', $props.class, doesExpand ? 'cursor-pointer will-change-[transform,opacity]' : '']"
    v-on-click-outside="{ onEvent: () => { expand_settarget({new_target: false, do_queue: false}) }, condition: (expand_target && doesExpand), blockEvents: true }">
  
    <!-- Background Filter Container -->
    <div 
      id="backgroundFilterContainer"
      :class="['h-full w-full rounded-[inherit]', $props.backgroundFilterClass]">

      <!-- Border Container -->
      <div
        id="borderContainer"
        :class="['flex justify-center overflow-clip h-full rounded-[inherit]', $props.borderClass]">

          <!-- Content Container -->
        <div
          id="contentContainer"
          ref="card_contentContainer"
          :class="['h-full flex flex-col', doesExpand ? 'will-change-[transform,opacity]' : '', $props.contentClass]">

          <!-- Minimize hint -->
          <!-- <div 
            ref="minimizeHint"
            class="hidden justify-center items-center absolute inset-0 bg-white/70 backdrop-blur-xl z-[10] invisible opacity-0 transition-opacity duration-[0.5s]">
            
            <p class="text-blue-500/90 font-[600] text-center text-[1.6rem] group-hover:underline">{{ MFLocalizedStringgggg('feature-card.minimize-hint') }}</p>
          </div> -->

          <!-- Top -->
          <div id="topCardContent" class="flex flex-col">
            <slot name="top"/>
          </div> 

          <!-- Swap -->
          <div id="swappableContentContainer" class="min-h-0 min-w-0
                                                      grow
                                                      flex flex-col">

            <!-- Default -->
            <div id="defaultCardContent" class="min-h-0 min-w-0
                                                grow
                                                flex flex-col">
              <slot name="default"/>
            </div>

            <!-- Expanded -->
            <div id="expandedCardContent" class="min-h-0 min-w-0
                                                  grow
                                                  hidden flex-col">
              <slot name="expanded"/>
            </div>
          </div>

          <!-- Bottom -->
          <div id="bottomCardContent" class="flex flex-col">
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
import { useGlobalStore } from "~/store/global";
const constants = useConstants()
const { currentSize, ResponsiveSize } = useResponsive()
const globalStore = useGlobalStore()

// Import BezierEasing
//  Notes: 
//  - Should we import this through nuxt plugins or is this okay?... ChatGPT says this is okay. Plugins just let you globally inject for convenience, so you don't have to import.
//  - Not using the package atm, so we uninstalled it.
// import BezierEasing from 'bezier-easing'

// Import (is that the right term?) vue/nuxt stuff
const { $ScrollTrigger, $store, $gsap, $Power0, $Power1, $Power2, $Power3, $Power4, $isMobile, $isFirefox, $isSafari } = useNuxtApp()
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
  videoPath: String,
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

// Store gsap state
let scrollTrigger_leave: null | ScrollTrigger = null

// Define animation state
const expand_target = ref(false)          // Set to the state the the user has requested
const expand_anim   = ref(false)          // Set only after the animations complete
let   expand_unexpandIsQueuedUp = false   // Set to true if we were trying to *unexpand* during the expand animation

function expand_settarget({ new_target=<boolean|null>null, do_queue=<boolean>false }) {
  
  // [Jun 2025] Always set expand_target through this – never directly. That way we can block toggling it during an animation.
  //    This is important to prevent jank. We could try to build really fancy animations that can be interrupted/reverted half-way-through. But that is much more difficult.
  
  if (new_target === null) { new_target = !expand_target.value } // Pass in null to toggle the current state.

  if (new_target == expand_target.value) {                      // Ignore trying to set expand_target to the same value

  } else if (expand_target.value !== expand_anim.value) {       // Block toggling during an animation
    if (do_queue) {
      if (expand_target.value === true) {
        if (!expand_unexpandIsQueuedUp) {
          expand_unexpandIsQueuedUp = true
          watch(expand_anim, () => {    // Wait for the current animation to finish and then immediately revert it.
            { // DEBUG
              if (new_target === expand_anim.value) { console.warn("Unexpected state after expand_settarget queueing callback") };
              console.debug(`Setting isExpaned_target to ${new_target} after queueing.`)
            }
            expand_target.value = false
            expand_unexpandIsQueuedUp = false
          }, { once: true })
        }
      }
    }
  } else {    // Default case
    { // DEBUG
      console.debug(`Setting expand_target to ${new_target}`) 
    }
    expand_target.value = new_target
  }
}

// Get references to relevant dom elements
// The stuff initialized to ref(null) will be automatically bound to the html element with the ref attribute set to the same value by vue
const card:                  Ref<HTMLElement | null> = ref(null)
const card_contentContainer: Ref<HTMLElement | null> = ref(null)

// var minimizeHint: Ref<HTMLDivElement | null> = ref(null)

var expandedCard_video: HTMLVideoElement | null = null

// Define storage for dynamically created elements
var expandedCard:                           null | HTMLDivElement = null
var expandedCard_contentContainer:          null | HTMLDivElement = null
var expandedCard_backgroundFilterContainer: null | HTMLElement    = null
var expandedCard_borderContainer:           null | HTMLElement    = null


// Expose
defineExpose({
  expand_settarget,
  expand_target: expand_target,
  expand_anim: expand_anim,
})

// Close card if window resizes
//  This is because in the commit after c4f450bd015ba22ddbebb56ea0553e9e5c16e83c we changed the sizing logic so that the cards can grow wider than their positioned parent, but that also made it so the cards don't stay centered if the window resizes after they expanded. There might be a nicer solution but this is the only thing I have time for at the moment.
const onWindowResize = () => {
  expand_settarget({ new_target: false, do_queue: true}) // [Jun 2025] This can be blocked if there's an ongoing animation. In that case, we queue-up the unexpand.
}

// Additional setup after mount
onMounted(() => {
  // Prevent video autoplaying
  const video = findChild(expandedCard!, (child) => child.tagName == 'VIDEO') as HTMLVideoElement
  if (video != null) { video.pause() } // The video will be copied over into the expandedCard and then destroyed [Jun 5 2025]
  // Add windowResize listener
  window.addEventListener("resize", onWindowResize)
})

// Cleanup after unmount
onUnmounted(() => {
  // Remove windowResize listener
  window.removeEventListener("resize", onWindowResize)
});

// Don't do stuff if !doesExpand
// Discussion: 
// - First, we were trying to wrap this code in a function so that we can early return. But we can't do certain stuff inside functions like access `this` or call stuff like defineExpose, afaiu, so we're just wrapping everything inside a huge if-statement
// - Edit: Can't call defineExpose from inside if-statement, either, so we doing the if-statement all the way down here

if (props.doesExpand) {

  // Do the main expand / unexpand animations
  watch(expand_target, async (shouldExpand) => { 

    // DEBUG
    console.debug(`shouldExpand: ${shouldExpand}`)

    // Animate and stuff
    if (shouldExpand) {

      ///
      /// >>> Expand <<<
      ///

      // 
      // Create expandedCard if necessary
      //

      //    - The idea is that the `expandedCard` is a copy of the `card` but it shows the `expandedContent` instead of the `defaultContent`.
      //      We then fade between the two cards while applying transforms to give the impression that it's a single card that's moving and morphing. We call these the transform-based animations elsewhere.
      
      if (expandedCard == null) {
      
        // Create expandedCard
        expandedCard = card.value!.cloneNode(true) as HTMLDivElement
        
        // Extract elements inside the expandedCard
        expandedCard_contentContainer           = <any>findChild(expandedCard, ch => ch.id      == 'contentContainer');
        expandedCard_borderContainer            = <any>findChild(expandedCard, ch => ch.id      == 'borderContainer');
        expandedCard_backgroundFilterContainer  = <any>findChild(expandedCard, ch => ch.id      == 'backgroundFilterContainer');
        expandedCard_video                      = <any>findChild(expandedCard, ch => ch.tagName == 'VIDEO');

        // Destroy videos on the original `card` 
        //    because we don't need to display them and it takes up lot of resources. I think causing iOS to crash after you open a few cards.
        destroyVideos(card.value!)
        
        // Setup 'minimize hint' video ended - this was supposed to teach the user how to minimize cards, but with current design this is unnecessary I think [Jun 6 2025]
        if (0) {/*
          expandedCard_video?.addEventListener('ended', () => {
            minimizeHint.value!.style.visibility = 'visible'
            minimizeHint.value!.style.opacity = '1.0'
          }, false)
        */}

        // Show the expandedContent in the expandedCard
        const expandedCard_expandedContent = findChild(expandedCard, el => el.id == 'expandedCardContent') as HTMLElement
        const expandedCard_defaultContent  = findChild(expandedCard, el => el.id == 'defaultCardContent') as HTMLElement
        expandedCard_defaultContent.style.display = 'none'
        expandedCard_expandedContent.style.display = 'flex'
        
        // Position the expanded content normally
        //  (Because later code will set position = absolute so we need to reset that)
        //  - [ ] TODO: Remove this. Probably obsolete now [Jun 2025]
        expandedCard_expandedContent.style.position = '' // Setting it to emptyString resets it to default which is `static` for position

        //
        // Make expanded card fit its content.
        //  
        expandedCard_contentContainer!.style.height          = 'fit-content' // [Jun 2025] Not totally sure this is all necessary, but disabling all 3 breaks card-expansion in Safari rn.
        expandedCard_borderContainer!.style.height           = 'fit-content'
        expandedCard_backgroundFilterContainer!.style.height = 'fit-content'

        // Add isExpanded class 
        //    for conditional styling
        expandedCard.classList.add('isExpandedCls')
      }

      // 
      // Set up extra parallax when card is expanded 
      //    There's already parallax on all the cards – that's controlled inside index.vue. But we add extra parallax here to create an illusion of the card being elevated [Jun 9 2025] 
      
      if ((0)) { // [Jun 2025] This does work since there we simultaneously perform other translations on the card when they expand/unexpand. To do this correctly, we'd have to either have our existing animations do the parallax as well, or create a separate div to apply the parallax to.
        const setupParallax = (el) => {
          const parallaxOffset = 100.0

          const tlTrack = $gsap.timeline({ 
            scrollTrigger: {
              trigger: el,
              pin: false,
              start: "top bottom", // Top of element, bottom of viewport
              end: `bottom top`,
              scrub: 0.5, // Smooth scrubbing, takes x second to "catch up" to the scrollbar
              markers: false, // Debug
              onUpdate: (self) => {  }
            } 
          })
          tlTrack.fromTo(el,  { translateY: parallaxOffset }, { translateY: '-' + parallaxOffset, duration: 1, ease: 'linear' }, 0)
          tlTrack.scrollTrigger?.disable()
          tlTrack.progress(0.5);

          watch(expand_target, (new_expand_target) => {
              if (new_expand_target) {
                console.debug(`Parallax enable`)
                tlTrack.scrollTrigger?.enable()
              }
              else {
                console.debug(`Parallax disable`)
                tlTrack.scrollTrigger?.disable()
                tlTrack.progress(0.5);
              }
          })
        }
        setupParallax(card.value!)
        setupParallax(expandedCard!)
      }

      // 
      // Load/waitFor video
      //

      {
        const videosAreLoaded_: boolean = videosAreLoaded(expandedCard!)
        if (true) { console.debug(`videosAreLoaded: ${videosAreLoaded_}`); }
        if (!videosAreLoaded_) {
          
          // Start loading animation
          card_contentContainer.value!.classList.add('animate-pulse')

          // Begin load
          loadVideos(expandedCard!, true)

          // Wait
          const interrupted = await new Promise((resolve) => {         
            
            // Stop waiting on interrupt
            const unwatchInterrupt = watch(expand_target, () => {
              if (expand_target.value == false) {
                resolve(true)
                unwatchInterrupt()
              }
            }, { })

            // Stop waiting on load
            expandedCard_video!.addEventListener(/* 'loadedmetadata' */'loadeddata', () => {
              resolve(false)
              unwatchInterrupt()
            }, { once: true })
          })

          // Stop loading animation
          card_contentContainer.value!.classList.remove('animate-pulse')

          // Handle interrupt
          if (interrupted) { return }
        }
      }

      // 
      // Get current card size and position relative to nearest positioned ancestor
      //
      
      //    See https://developer.mozilla.org/en-US/docs/Web/API/CSS_Object_Model/Determining_the_dimensions_of_elements

      const originWidth  = card.value!.offsetWidth
      const originHeight = card.value!.offsetHeight
      
      const originTop  = card.value!.offsetTop
      const originLeft = card.value!.offsetLeft
      const originCenterX = originLeft + originWidth/2.0
      const originCenterY = originTop + originHeight/2.0

      // Bring card to front
      {
        expandedCard.style.zIndex = '100'
        card.value!.style.zIndex  = '100'
      }

      // 
      // Place expanded card in document
      //

      // Notes:
      // - How to center absolutely positioned element: https://stackoverflow.com/questions/1776915/how-can-i-center-an-absolutely-positioned-element-in-a-div
      // - Ideally we wanna set the width relative to the grid width, because we don't want the expanded card to spill out of the grid so you still can see context which should make the interaction feel lighter. Currently, the percent-based sizes aren't relative to the grid, and there are some sizes where the expanded card spills out from the grid. Maybe we can fix this by inserting the expanded card into the container element which determines the grid width (and the width of the document as a whole.). But we'd have to position that element so it's the nearest positioned ancestor aka the '.offsetParent' and idk if that could lead to other problems?
      // - Our width style with the min() and max() functions is *very* confusing to read. Maybe it would be better to use tailwind with media queries? But mixing tailwind classes with setting style directly through js seems like a bad idea. Idk how you could assign media queried' css through js. So this is the best solution I can come up with for now.
      //  - Update: We simplified things and are just making the card pretty much as big as possible as long as it fits the screen.
      // - TODO: Add border radius, border width and shadow changes here.
      {
        const targetLayout = 'absolute'

        const targetWidth = `${70*remInPx()}px` //`min(max(66%, ${700}px), 100%, 800px, 110vh)`
        const targetMaxWidth = 'min(max(100%, 90vw), 130vh)'
        const targetHeight = 'fit-content'
        const targetMaxHeight = 'auto'

        const targetMarginLeft = ''
        const targetMarginRight = ''
        var targetLeft = '0'
        const targetRight = ''
        var targetTop = ''

        // var targetBorderRadius = ''
        // var targetBorderWidth = ''
        const targetShadow = tw.theme!.boxShadow!["md-raised"]

        var calcScale = 0
        var calcWidth = 0
        var calcHeight = 0
        var calcTop = 0
        var calcLeft = 0
        var calcCenterX = 0
        var calcCenterY = 0

        // Placing the expandedCard at it's target (expanded) size and position in the document
        //  We use this to determine the remaining target styling (only 'targetTop' at the time of writing) and to record the calculated size and position. 
        //  We need the calculated size and position for animating. When we tried to animated to the targetStyle directly using gsap it didn't work. It seems the problem was somewhere with centering the absolutely positioned card by setting left and right to 0 and setting the leftMargin and rightMarging to auto. Animating this dinn't work proplerly it seems. There were also problems animating the maxHeight and maxWidth, but they could be resolved by setting those to a very high number right before the animation.

        // Set layout method
        expandedCard.style.position = targetLayout

        // Set size and stuff
        expandedCard.style.width = targetWidth
        expandedCard.style.maxWidth = targetMaxWidth
        expandedCard.style.height = targetHeight
        expandedCard.style.maxHeight = targetMaxHeight

        // Place expandedCard in document
        card.value!.offsetParent!.appendChild(expandedCard)

        // Calculate target style
        //  We calculated targetTop such that the x center of the card stays in the same position after expanding
        const computedH = expandedCard.offsetHeight
        const heightIncrease = computedH - originHeight
        targetTop = /* `${originTop - heightIncrease/2.0}px` */ `${ originTop-(1*remInPx()) }px`

        // Calculate left so that the card is centered
        targetLeft = (card.value!.offsetParent!.clientWidth/2 - expandedCard.offsetWidth/2) + 'px'

        // Set position and stuff
        expandedCard.style.marginLeft   = targetMarginLeft
        expandedCard.style.marginRight  = targetMarginRight
        expandedCard.style.left   = targetLeft
        expandedCard.style.right  = targetRight
        expandedCard.style.top    = targetTop

        // Increase shadow
        expandedCard.style.boxShadow = targetShadow

        // TESTING
        // return

        // Measure computed size, position and scale
        calcWidth   = expandedCard.offsetWidth
        calcHeight  = expandedCard.offsetHeight
        calcTop     = expandedCard.offsetTop
        calcLeft    = expandedCard.offsetLeft
        calcCenterX = calcLeft + calcWidth/2.0
        calcCenterY = calcTop + calcHeight/2.0
        calcScale   = ((calcWidth / originWidth) + (calcHeight / originHeight)) / 2.0
        
        // DEBUG
        if (1) {
          console.debug(
          `
            Card size calc:
            calcWidth     :   ${calcWidth}
            calcHeight    :   ${calcHeight}
            calcTop       :   ${calcTop}
            calcLeft      :   ${calcLeft}
            calcCenterX   :   ${calcCenterX}
            calcCenterY   :   ${calcCenterY}
            calcScale     :   ${calcScale}
          `)
        }

        // Calculate target style based on scale
        //  Note: Keep this in sync with video wrapper styling to make it look nice
        //  TODO: Make sense of this
        // targetBorderWidth = '4px' // `${originBorderWidth * calcScale}px`
        // targetBorderRadius = '24px' // `${originBorderRadius * calcScale}px`

        // Hide expandedCard and show original card
        //  This is the initial state for the animation. The animation might play after a delay, so we need to set the state here to prevent flickering
        card.value!.style.opacity  = '1.0'
        expandedCard.style.opacity = '0.0'
      }

      // 
      // Define animation timeline
      //
      {
        var tl = $gsap.timeline({ paused: true })

        // 
        // Define post-animation actions
        //
        
        {
          const onEnd = () => {

            console.debug(`OnEnd Expand`)
            
            // Play video, once expand animation finishes
            if (expand_target.value! == true && expandedCard_video != null && expandedCard_video.src != null) {
              expandedCard_video.play()
            }

            // Close card when it is scrolled away
            // When the card is already above the trigger zone when this is called, then the card unexpands immediately. But when it's below the trigger zone, this doesn't happen. Not sure why. I think ideally, we would scroll the card into view, but I can't get that to work right now, either. 
            
            console.debug(`All scroll triggers n: (${ $ScrollTrigger.getAll().length })`)
            scrollTrigger_leave?.kill()
            scrollTrigger_leave = $ScrollTrigger.create({
              trigger:  expandedCard,
              start:    "center bottom",
              end:      "center top",
              onLeave:      () => { console.debug(`_leave: Card left!`);      expand_settarget({new_target: false, do_queue: true}) },
              onLeaveBack:  () => { console.debug(`_leave: Card left back!`); expand_settarget({new_target: false, do_queue: true}) },
            })

            // Update state
            expand_anim.value = true
          }

          tl.eventCallback('onComplete', onEnd)
        }

        // Set transformOrigin
        {
          expandedCard!.style.transformOrigin = 'left top'
          card.value!.style.transformOrigin   = 'left top'
          card_contentContainer.value!.style.transformOrigin    = "center top"
          expandedCard_contentContainer!.style.transformOrigin  = "center top"
        }
        
        //
        // Define animation params
        //

        // Discussion: 
        // - We used to use more physically accurate curves with longer decelerations, but they 
        //      made part of the animation too fast which is especially jarring when there are frame-drops.
        // - We could make things look smoother by using bezier-easing npm package, if we drew the fade-in out a little longer like the MMF tab transitions, but then the cards become too transparent and you see what's behind. We'd have to fade the content but I think that'd bring a host of other problems, since we also need to fade the whole cards. We'll just leave it like it is.
        // Previous curves:
        // - dur: 0.5, sizeCurve: criticalSpring(4.0), centerCurve: criticalSpring(6.0)
        // - dur: 0.45, sizeCurve: $Power2.easeOut, centerCurve: $Power3.easeOut
        // - dur: 0.6, sizeCurve: $Power3.easeOut, centerCurve: $Power4.easeOut
        
        const dur = 0.6
        const easeForSize = $Power3.easeOut
        const easeForPosition = $Power4.easeOut
        const easeForFadeOut  = (x: number) => x //BezierEasing(0.0, 0.0, 1.0, 1.0)
        const easeForFadeIn   = (x: number) => x //BezierEasing(0.0, 0.0, 1.0, 1.0)
        const fadeDur = dur * 0.4
        
        const simpleDur = 0.6
        const simpleFadeDur = simpleDur * 0.35 // 0.6 // 0.35

        // Get animation complexity
        const { useSuperSimpleAnimations, useSimpleAnimations } = animationComplexity(originWidth, calcWidth, originHeight, calcHeight)

        // 
        // Animation preprocessing
        //  

        // Create base curves

        const curveForCenterX  = useSimpleAnimations ? null : rawCurveFromAnimationCurve({ outputRange: { start: originCenterX, end: calcCenterX }, ease: easeForPosition })
        const curveForCenterY  = useSuperSimpleAnimations ? null : rawCurveFromAnimationCurve({ outputRange: { start: originCenterY, end: calcCenterY }, ease: easeForPosition }) // Unused now

        const curveForHeight   = useSimpleAnimations ? null : rawCurveFromAnimationCurve({ outputRange: { start: originHeight, end: calcHeight },   ease: easeForSize })
        const curveForWidth    = useSimpleAnimations ? null : rawCurveFromAnimationCurve({ outputRange: { start: originWidth,  end: calcWidth },    ease: easeForSize })

        // Calculate animation curves for top/left of the element
        //  Edit: Just using the previous centerY ease for top now because we're anchoring our animation at the top, not the center anymore

        const curveForTop = useSuperSimpleAnimations ? null : rawCurveFromAnimationCurve({ outputRange: { start: originTop, end: calcTop }, ease: easeForPosition }) // combineCurves(curveForCenterY, curveForHeight, (centerY, height) => centerY - height/2.0)
        const curveForLeft = useSimpleAnimations ? null : combineCurves(curveForCenterX!, curveForWidth!,  (centerX, width) => centerX - width/2.0)

        // Find find animations for translate and scale equivalent to the position and size animations defined above
        //  (Translate and scale are very fast to animate)

        const curveForTranslateX  = useSimpleAnimations ? null : transfromCurve(curveForLeft!,     (v) => v - curveForLeft!(0.0) )
        const curveForTranslateY  = useSuperSimpleAnimations ? null : transfromCurve(curveForTop!, (v) => v - curveForTop!(0.0) )
        const curveForScaleX      = useSimpleAnimations ? null : transfromCurve(curveForWidth!,    (v) => v / curveForWidth!(0.0) )
        const curveForScaleY      = useSimpleAnimations ? null : transfromCurve(curveForHeight!,   (v) => v / curveForHeight!(0.0) )

        // Store the overall translate and scale 
        //  for convenience

        const translateX = useSimpleAnimations ? null : curveForTranslateX!(1.0)
        const translateY = useSuperSimpleAnimations ? null : curveForTranslateY!(1.0)
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
        const curveForInverseTranslateY = useSuperSimpleAnimations ? null : transfromCurve(curveForTranslateY!, (v) => v - translateY!)
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
        // Scroll card into center of screen - if the expanded card would not be fully on-screen without scrolling.
        // 
        
        {
          // Notes: I can't manage to center the card properly. But it's okay.

          const viewportHeight            = window.innerHeight
          const navbarHeight_Unexpanded   = globalStore.navbarHeight_Unexpanded
          const cardViewPortRect          = expandedCard!.getBoundingClientRect();
          const cardHeight                = calcHeight // cardViewPortRect.height
          const cardViewPortTop           = cardViewPortRect.top
          const cardViewPortBottom        = viewportHeight - cardViewPortRect.bottom
          const cardViewPortTopMax        = 0.0 + (navbarHeight_Unexpanded)
          const cardViewPortBottomMax     = 0.0
          const cardViewportTopTarget     =  Math.max(cardViewPortTop, cardViewPortTopMax)
          const cardViewportBottomTarget  = Math.max(cardViewPortBottom, cardViewPortBottomMax)

          if (cardViewportTopTarget != cardViewPortTop || cardViewportBottomTarget != cardViewPortBottom) {

            const viewportCenter  = ((viewportHeight - navbarHeight_Unexpanded)/2) + navbarHeight_Unexpanded
            const cardCenter      = cardViewPortTop + (cardHeight/2)
            
            if (1) {
              console.debug(`viewPortCenter: ${viewportCenter}, viewportHeight: ${viewportHeight}, navbarHeight_Unexpanded: ${navbarHeight_Unexpanded} ||| cardCenter: ${cardCenter}, cardViewPortRect.top: ${cardViewPortRect.top}], cardViewPortRect.height: ${cardViewPortRect.height}, cardHeight: ${cardHeight}`)
            }

            const documentScrollTopTarget = document.documentElement.scrollTop + (cardCenter - viewportCenter)
            
            tl.to(document.documentElement, {
              scrollTop: documentScrollTopTarget,
              duration: 0.3,
              ease: $Power1.easeOut,
            })
          }
        }

        //
        // Add animations to timeline
        //
        
        {
          if (!useSimpleAnimations) {

            // Animate size-related styling on card
            addAnimationToTimeline(tl, card.value!, 'scaleX', animationCurveFromRawCurve(curveForScaleX!), dur)
            addAnimationToTimeline(tl, card.value!, 'scaleY', animationCurveFromRawCurve(curveForScaleY!), dur)

            // Animate size-related styling on expandedCard
            addAnimationToTimeline(tl, expandedCard, 'scaleX', animationCurveFromRawCurve(curveForInverseScaleX!), dur)
            addAnimationToTimeline(tl, expandedCard, 'scaleY', animationCurveFromRawCurve(curveForInverseScaleY!), dur)

            // Counter-animate card content 
            //  to prevent stretching
            addAnimationToTimeline(tl, expandedCard_contentContainer!, 'scaleX', animationCurveFromRawCurve(curveForContentScaleX!), dur)
            addAnimationToTimeline(tl, expandedCard_contentContainer!, 'scaleY', animationCurveFromRawCurve(curveForContentScaleY!), dur)

            // Counter-animate placeholder content 
            addAnimationToTimeline(tl, card_contentContainer.value!, 'scaleX', animationCurveFromRawCurve(curveForPlaceholderContentScaleX!), dur)
            addAnimationToTimeline(tl, card_contentContainer.value!, 'scaleY', animationCurveFromRawCurve(curveForPlaceholderContentScaleY!), dur)
          }

          // Animate position-related styling on placeholder
          if (!useSuperSimpleAnimations)   addAnimationToTimeline(tl, card.value!, 'y', animationCurveFromRawCurve(curveForTranslateY!), useSimpleAnimations ? simpleDur : dur);
          if (!useSimpleAnimations)        addAnimationToTimeline(tl, card.value!, 'x', animationCurveFromRawCurve(curveForTranslateX!), useSimpleAnimations ? simpleDur : dur);

          // Animate position-related styling on card
          if (!useSuperSimpleAnimations)   addAnimationToTimeline(tl, expandedCard, 'y', animationCurveFromRawCurve(curveForInverseTranslateY!), useSimpleAnimations ? simpleDur : dur)
          if (!useSimpleAnimations)        addAnimationToTimeline(tl, expandedCard, 'x', animationCurveFromRawCurve(curveForInverseTranslateX!), useSimpleAnimations ? simpleDur : dur)

          // Fade out placeholder
          // Notes:
          //  - Neither opacity nor autoalpha work. (Not sure what autoAlpha is) Edit: Now it does. Not sure why. autoAlpha sets visibility: hidden automatically for optimization. We'll use this if it doesn't cause problems.
          addAnimationToTimeline(tl, card.value!, 'autoAlpha', { outputRange: { start: 1.0, end: 0.0 }, ease: easeForFadeOut },    useSimpleAnimations ? simpleFadeDur : fadeDur)

          // Fade in card
          addAnimationToTimeline(tl, expandedCard,  'autoAlpha', { outputRange: { start: 0.0, end: 1.0 }, ease: easeForFadeIn },      useSimpleAnimations ? simpleFadeDur : fadeDur)
        }
      }

      // 
      // Wait until browser is done rendering, then start animation
      //
      
      // Notes:
      //  - This works since the timeline is paused. Also we're using fromTo everywhere which renders the from state immediately.
      //  - 0.05s delay prevents a little more jerkiness in Safari (might be placebo) without feeling less responsive in Chrome.
      {
        doAfterRenderrr(() => { tl.play() }, 50)
      }

    } else { 
      
      // 
      //  >>> Unexpand <<<
      //

      // 
      // Do immediate state-changes
      //
      {
        // Bring card to front but behind other expanding and expanded cards (which have zIndex 100)
        expandedCard!.style.zIndex = '99'
        card.value!.style.zIndex   = '99'
      }

      //
      // Setup post-animation state-changes
      // 
      const onEnd = () => {

        // DEBUG
        console.debug(`onEnd Unexpand`)

        // Stop video
        //    [Jun 5 2025] If I pause the video before onEnd, the video disappears immediately before the animation ends, which looks janky. No idea why.
        if (expandedCard_video != null) {
          expandedCard_video.pause()
        }

        // Bring card to normal level
        expandedCard!.style.zIndex = '0'
        card.value!.style.zIndex = '0'

        // Reset playback time
        if (expandedCard_video != null) {
          expandedCard_video.currentTime = 0.0
        }

        // Free video from memory
        if (1) { freeVideos(card.value!) }
        if (0) { unloadVideos(card.value!) } // [Jun 2025] This actually works fine now. Not sure if there's a reason to use free over this.

        // Update isExpanded state
        expand_anim.value = false
      }
      
      // 
      // Define animation timeline
      // 
      {
        //  Note: We do almost the exact same thing for the expand animations. The code there has more explanations and discussion
        
        var tl = $gsap.timeline({ paused: true })
    
        tl.eventCallback('onComplete', onEnd)
        
        // Set transformOrigin 
        //    (Probably unnecessary since we already do this on expand)
        expandedCard!.style.transformOrigin = 'left top'
        card.value!.style.transformOrigin = 'left top'
        
        // Gather data

        const currentWidth    = expandedCard!.offsetWidth
        const currentHeight   = expandedCard!.offsetHeight
        const currentLeft     = expandedCard!.offsetLeft
        const currentTop      = expandedCard!.offsetTop
        const currentCenterX  = currentLeft + (currentWidth/2.0)
        const currentCenterY  = currentTop  + (currentHeight/2.0)

        const targetWidth   = card.value!.offsetWidth
        const targetHeight  = card.value!.offsetHeight
        const targetLeft    = card.value!.offsetLeft;
        const targetTop     = card.value!.offsetTop;
        const targetCenterX = targetLeft + (targetWidth/2.0)
        const targetCenterY = targetTop  + (targetHeight/2.0)

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


        // Determine animation complexity
        const { useSuperSimpleAnimations, useSimpleAnimations } = animationComplexity(targetWidth, currentWidth, targetHeight, currentHeight)

        // Create base curves

        const curveForCenterX  = useSimpleAnimations ? null : rawCurveFromAnimationCurve({ outputRange: { start: currentCenterX , end: targetCenterX }, ease: easeForPosition })
        const curveForCenterY  = useSimpleAnimations ? null : rawCurveFromAnimationCurve({ outputRange: { start: currentCenterY, end: targetCenterY }, ease: easeForPosition })
        
        const curveForHeight   = useSimpleAnimations ? null : rawCurveFromAnimationCurve({ outputRange: { start: currentHeight, end: targetHeight },   ease: easeForSize })
        const curveForWidth    = useSimpleAnimations ? null : rawCurveFromAnimationCurve({ outputRange: { start: currentWidth,  end: targetWidth },    ease: easeForSize })
        
        // Calculate animation curves for top/left of the element
        
        const curveForTop = useSuperSimpleAnimations ? null : rawCurveFromAnimationCurve({ outputRange: { start: currentTop, end: targetTop }, ease: easeForPosition }) // combineCurves(curveForCenterY, curveForHeight, (centerY, height) => centerY - height/2.0) <-- not using this bc anchoring card at the top now
        const curveForLeft = useSimpleAnimations ? null : combineCurves(curveForCenterX!, curveForWidth!, (centerX, width) => centerX - width/2.0)
        
        // Find animations for translate and scale equivalent to the position and size animations defined above
        
        const curveForTranslateX  = useSimpleAnimations ? null : transfromCurve(curveForLeft!,      (v) => v - curveForLeft!(0.0) )
        const curveForTranslateY  = useSuperSimpleAnimations ? null : transfromCurve(curveForTop!,  (v) => v - curveForTop!(0.0) )
        const curveForScaleX      = useSimpleAnimations ? null : transfromCurve(curveForWidth!,     (v) => v / curveForWidth!(0.0) )
        const curveForScaleY      = useSimpleAnimations ? null : transfromCurve(curveForHeight!,    (v) => v / curveForHeight!(0.0) )
        
        // Store the overall translate and scale 
        
        const translateX = useSimpleAnimations ? null : curveForTranslateX!(1.0)
        const translateY = useSuperSimpleAnimations ? null : curveForTranslateY!(1.0)
        const scaleX = useSimpleAnimations ? null : curveForScaleX!(1.0)
        const scaleY = useSimpleAnimations ? null : curveForScaleY!(1.0)
        
        // Get inverse transforms
        
        const curveForInverseTranslateX = useSimpleAnimations ? null : transfromCurve(curveForTranslateX!, (v) => v - translateX!)
        const curveForInverseTranslateY = useSuperSimpleAnimations ? null : transfromCurve(curveForTranslateY!, (v) => v - translateY!)
        const curveForInverseScaleX     = useSimpleAnimations ? null : transfromCurve(curveForScaleX!,     (v) => v / scaleX!)
        const curveForInverseScaleY     = useSimpleAnimations ? null : transfromCurve(curveForScaleY!,     (v) => v / scaleY!)
        
        // Calculate transforms for card-content
        // The direction of the < here makes it so the content scales even more than the card, making for a cool, if slightly vertigo-inducing effect. We don't do this on the expand animations, where the > are opposite (a the time of writing) Edit: Turned the effect off. Was weird.

        // Counter scaling cancels out the card scaling to prevent content from stretching
        var curveForCounterScaleX = useSimpleAnimations ? null : transfromCurve(curveForInverseScaleX!, (scale) => 1/scale)
        var curveForCounterScaleY = useSimpleAnimations ? null : transfromCurve(curveForInverseScaleY!, (scale) => 1/scale)
        
        if (0) {
          // This transform makes the card content scale up cover the card during the animation, but without stretching.
          var curveForContentScaleY = useSimpleAnimations ? null : combineCurves(curveForCounterScaleY!, scaleX! > scaleY! ? curveForInverseScaleX! : curveForInverseScaleY!, (a, b) => a * b)
          var curveForContentScaleX = useSimpleAnimations ? null : combineCurves(curveForCounterScaleX!, scaleX! > scaleY! ? curveForInverseScaleX! : curveForInverseScaleY!, (a, b) => a * b)
        } else {
          // This transform makes the card content stay the same size while the card scales
          var curveForContentScaleY = curveForCounterScaleY 
          var curveForContentScaleX = curveForCounterScaleX
        }
        
        // Calculate transforms for placeholder content
        var curveForPlaceholderCounterScaleX = useSimpleAnimations ? null : transfromCurve(curveForScaleX!, (scale) => 1/scale)
        var curveForPlaceholderCounterScaleY = useSimpleAnimations ? null : transfromCurve(curveForScaleY!, (scale) => 1/scale)

        // var curveForPlaceholderContentScaleX = combineCurves(curveForPlaceholderCounterScaleX, scaleX > scaleY ? curveForScaleX : curveForScaleY, (a, b) => a * b)
        // var curveForPlaceholderContentScaleY = combineCurves(curveForPlaceholderCounterScaleY, scaleX > scaleY ? curveForScaleX : curveForScaleY, (a, b) => a * b)
        var curveForPlaceholderContentScaleX = useSimpleAnimations ? null : curveForPlaceholderCounterScaleX
        var curveForPlaceholderContentScaleY = useSimpleAnimations ? null : curveForPlaceholderCounterScaleY

        //
        // Add animations to timeline 
        //

        // Notes: We only enable complex animations under certain conditions (otherwise we do a simple fade). Conditions at the time of writing:
        // - prefersReducedMotion is off
        // - animation grows in both dimensions -> That's because our animations look really crappy when the card shrinks while revealing the video.
        // - The window is wider than the xs breakpoint (iPhone 6 width) -> That's because the animations are really slow on my iPhone 8. Not sure if necessary since the growing condition should already disable animations on iPhone 8.
        
        if (!useSimpleAnimations) {
          
          // Animate size-related styling on expandedCard
          addAnimationToTimeline(tl, expandedCard!, 'scaleX', animationCurveFromRawCurve(curveForScaleX!), dur)
          addAnimationToTimeline(tl, expandedCard!, 'scaleY', animationCurveFromRawCurve(curveForScaleY!), dur)
          
          // Animate size-related styling on card
          addAnimationToTimeline(tl, card.value!, 'scaleX', animationCurveFromRawCurve(curveForInverseScaleX!), dur)
          addAnimationToTimeline(tl, card.value!, 'scaleY', animationCurveFromRawCurve(curveForInverseScaleY!), dur)
          
          // Counter-animate card content
          addAnimationToTimeline(tl, card_contentContainer.value!, 'scaleX', animationCurveFromRawCurve(curveForContentScaleX!), dur)
          addAnimationToTimeline(tl, card_contentContainer.value!, 'scaleY', animationCurveFromRawCurve(curveForContentScaleY!), dur)
          
          // Counter-animate expandedCard content 
          addAnimationToTimeline(tl, expandedCard_contentContainer!, 'scaleX', animationCurveFromRawCurve(curveForPlaceholderContentScaleX!), dur)
          addAnimationToTimeline(tl, expandedCard_contentContainer!, 'scaleY', animationCurveFromRawCurve(curveForPlaceholderContentScaleY!), dur)
        }

        // Animate position-related styling on expandedCard
        if (!useSuperSimpleAnimations) { addAnimationToTimeline(tl, expandedCard!, 'y', animationCurveFromRawCurve(curveForTranslateY!), useSimpleAnimations ? simpleDur : dur) }
        if (!useSimpleAnimations)      { addAnimationToTimeline(tl, expandedCard!, 'x', animationCurveFromRawCurve(curveForTranslateX!), useSimpleAnimations ? simpleDur : dur) }
        
        // Animate position-related styling on card
        if (!useSuperSimpleAnimations) { addAnimationToTimeline(tl, card.value!, 'y', animationCurveFromRawCurve(curveForInverseTranslateY!), useSimpleAnimations ? simpleDur : dur) }
        if (!useSimpleAnimations)      { addAnimationToTimeline(tl, card.value!, 'x', animationCurveFromRawCurve(curveForInverseTranslateX!), useSimpleAnimations ? simpleDur : dur) }
      
        // Fade out expandedCard
        addAnimationToTimeline(tl, expandedCard!, 'autoAlpha', { outputRange: { start: 1.0, end: 0.0}, ease: (x) => x }, useSimpleAnimations ? simpleFadeDur : fadeDur)
        
        // Fade in card
        addAnimationToTimeline(tl, card.value!, 'autoAlpha', { outputRange: { start: 0.0, end: 1.0}, ease: (x) => x }, useSimpleAnimations ? simpleFadeDur : fadeDur)  
      }
      
      // 
      // Wait until browser is done rendering, then start animation
      //
      {
        // Discussion: This is useful for expand - Is it also useful for unexpand? 
        doAfterRenderrr(() => { tl.play() }, 50)
      }
    }
  })


  //
  // Helper functions for expand
  //

  function addAnimationToTimeline(tl: gsap.core.Timeline, element: HTMLElement, property: string, curve: AnimationCurve, duration: number, offset: number = 0.0) {

    // console.debug(`tl: ${ tl }, element: ${ element }, property: ${ property }, curve: ${ curve }, duration: ${ duration }, offset: ${ offset }`)

    tl.fromTo(element, {
      [property]: curve.outputRange.start,
    }, {
      [property]: curve.outputRange.end,

      duration: duration,
      ease: curve.ease,
    }, offset)
  }

  function destroyCardAndReplaceWith(card: HTMLDivElement, replacement: HTMLElement) {

    console.assert(false, "Unused [Jun 2025]")

    // Unload videos
    destroyVideos(card)

    // Replace
    card.replaceWith(replacement)
  }

  function destroyCard(card: HTMLDivElement) {

    console.assert(false, "Unused [Jun 2025]")

    // Unload videos
    destroyVideos(card)

    // Remove from DOM
    card.remove()

  }

  function videosAreLoaded(element: HTMLElement) {
    
    const videos = findChildren(element, (child) =>  child.tagName == 'VIDEO') as HTMLVideoElement[]

    let areLoaded = true

    for (const video of videos) {
      { // DEBUG
        console.debug(`src: "${video.src}", currentSrc: "${video.currentSrc}", video: ${objectDescription(video)}`)
      }
      if (video.currentSrc != props.videoPath ||  // Doing all these checks to be extra secure against false positives. False positives caused weird **squishedCard bug** where cards would expand to wrong size, when closing a card (causing freeVideos() to be called, which unloads and reloads a video) and then re-opening the card before the video could be fully reloaded (which happens easily when the network is slower – It doesn't happen when hosting locally, making this hard to debug (Chrome throtting worked a little)) [Jun 5 2025]
          video.src        != props.videoPath ||
          video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA)
      { 
        areLoaded = false; break; 
      } 
    }
    
    return areLoaded
  }

  function freeVideos(element: HTMLElement) {

    // Free videos inside `element` from memory
    // Notes:
    // - See https://stackoverflow.com/questions/47445281/how-to-go-about-freeing-an-html5-video-from-memory
    // - If we don't do this iOS Safari starts crashing after opening a few cards, because they take up a lot of ram
    // - In Firefox we don't need to do this. If we do it breaks stuff and it seems to garbage collect the videos anyways.
    // - [Jun 2025] But why are we immediately reloading the videos? I assume so they open faster when trying to re-open? But wouldn't that cancel out the RAM savings?

    if ($isFirefox) {
      return
    }

    unloadVideos(element)
    loadVideos(element, true)
  }

function unloadVideos(element: HTMLElement) {
    
    const videos = findChildren(element, (child) =>  child.tagName == 'VIDEO') as HTMLVideoElement[]
    
    for (const video of videos) {
      // const src = video.currentSrc // Not sure why we have to use currentSrc (instead of src) here
      // video.dataset['src'] = src
      video.pause(); // See: https://stackoverflow.com/a/28060352/10601702
      video.removeAttribute('src') // [Jun 5 2025] I used to just set src to emptyString but that somehow caused src to then be the website root (`http://localhost:3000/de/`). `.removeAttribute()` works as expected. No clue what's going on.
      video.load()
    }
  }

  function loadVideos(element: HTMLElement, doPausingStuff = false) {
    
    const videos = findChildren(element, (child) =>  child.tagName == 'VIDEO') as HTMLVideoElement[]

    for (const video of videos) {

      const src = props.videoPath //video.dataset['src']

      if (src != undefined) {

        if (doPausingStuff) {
          video.pause()
          video.currentTime = 0
        }

        video.src = src
        video.load()

        if (doPausingStuff) {
          video.pause()
        }
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

  function animationComplexity(collapsedWidth: number, expandedWidth: number, collapsedHeight: number, expandedHeight: number) {

    const shrinksInAnyDimension = expandedWidth < collapsedWidth || expandedHeight < collapsedHeight
    const useSuperSimpleAnimations = $isMobile && currentSize.value <= ResponsiveSize.sm // Same as useSimpleAnimations, but also omit y position -> so only animate fade -> hopefully more efficient for mobile
    const useSimpleAnimations = prefersReducedMotion() || shrinksInAnyDimension || useSuperSimpleAnimations // Omit size and x position animations

    return { useSuperSimpleAnimations, useSimpleAnimations }
  }

} // End of if (doesExpand) { ... 

</script>

<style lang="postcss" scoped>

</style>