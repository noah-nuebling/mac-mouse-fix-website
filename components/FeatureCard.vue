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
  -->

<template>
  <div
    ref="card"
    :class="['relative h-full rounded-[24px] overflow-clip will-change-[transform,opacity] pseudo-border', $props.class]">
  
    <!-- Border div -->
    <div class="absolute bg-transparent border-[4px] border-gray-50/25 rounded-[24px] pointer-events-none z-[1] top-0 left-0 right-0 bottom-0"/>
    
    <!-- Background div -->
    <div :class="['absolute pointer-events-none z-[-1] top-0 left-0 right-0 bottom-0', $props.contentContainerClass]"/>

    <!-- Padding Container -->
    <div
      ref="paddingContainer"
      :class="['h-full p-[4px] overflow-clip']">

      <!-- Border Clip Container -->

      <div 
        ref="contentClipContainer"
        class="h-full rounded-[20px] overflow-clip">

          <!-- Content Container -->
        <div
          ref="contentContainer"
          :class="['h-full flex flex-col']">

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
import { AnimationCurve, Curve, transfromCurve, combineCurves } from "~/utils/animationCurveForStart";
import findChildMatchingCondition from "~/utils/findChild"


  // Import (is that the right term?) vue/nuxt stuff
  const { $ScrollTrigger, $store, $gsap, $Power0, $Power1, $Power2, $Power3, $Power4 } = useNuxtApp()
  const slots = useSlots()

  // Define props
  var props = defineProps({
    class: String,
    contentContainerClass: String,
  })

  // Configure gsap
  // Lag smoothing prevents skipped frames
  // This prevents issue where first few frames of animation are just skipped under desktop Safari, but when performance is too bad it can make things really unresponsive.
  $gsap.ticker.lagSmoothing(17, 16);

  // Define vars
  const isExpanded = ref(false)
  var animationContext: any = null

  // Get references to relevant dom elements
  // The stuff initialized to ref(null) will be automatically bound to the html element with the ref attribute set to the same value by vue
  const card: Ref<HTMLElement | null> = ref(null)
  const contentContainer: Ref<HTMLElement | null> = ref(null)
  const paddingContainer: Ref<HTMLElement | null> = ref(null)
  const contentClipContainer: Ref<HTMLElement | null> = ref(null)

  const topCardContent: Ref<HTMLElement | null> = ref(null)  
  const defaultCardContent: Ref<HTMLElement | null> = ref(null)
  const expandedCardContent: Ref<HTMLElement | null> = ref(null)
  const bottomCardContent: Ref<HTMLElement | null> = ref(null) 

  // Dynamically created elements
  var cardPlaceholder: HTMLDivElement | null = null

  // Methods for parent
  function expand() {
    isExpanded.value = true
  }
  defineExpose({
    expand,
  })

  // React to isExpanded change
  watch(isExpanded, (shouldExpand) => {

    // Apply `will-change` animation optimization css
    // Note: Deactivating this because it doesn't seem to work. We also used to apply this on mouse hover
    
    if (false && card.value != null) {
      const css = 'will-change-[transform]' //'will-change-[top,left,width,height,box-shadow,border-radius]'
      if (shouldExpand) {
        card.value.classList.add(css)
      } else {
        card.value.classList.remove(css)
      }
    }
    

    // Kill current animations
    // Not totally sure if this is appropriate here. I think it prevents the onComplete method from being called when the card is unexpanded during the expand animation, which would lead to the zIndex getting messed up.
    if (animationContext) {
      animationContext.kill()
    }

    if (shouldExpand) {

      // Create backdrop
      if ($store.backdrop == null) {
        var b = document.createElement('div') as HTMLElement
        b.classList.add('h-screen', 'w-screen', 'z-[50]', 'fixed', 'top-0', 'left-0')
        // b.classList.add('bg-stone-900/50') // Not displaying the backdrop. But using it to close card when user click outside the card
        $store.backdrop = b
      }

      // Close card when backdrop is clicked
      //  We need to do this every time so *this* specific card is closed and not another card that the backdrop was previously used with
      $store.backdrop.onclick = (_) => isExpanded.value = false

      // Insert backdrop into document
      document.body.appendChild($store.backdrop)

      // Close card when it is scrolled away
      // When the card is already above the trigger zone when this is called, then the card unexpands immediately. But when it's below the trigger zone, this doesn't happen. Not sure why. I think ideally, we would scroll the card into view, but I can't get that to work right now, either. 
      $ScrollTrigger.create({
        trigger: card.value,
        start: "bottom bottom",
        end: "top top",
        onLeave: () => isExpanded.value = false,
        onLeaveBack: () => isExpanded.value = false,
      })

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

      // vvv TODO: Not sure we need to record origin border style. Remove if not.
      const originBorderWidth = parseInt(getComputedStyle(card.value!).borderWidth.slice(0, -2)) /* Slice off the `px` suffix from the string */
      const originBorderRadius = parseInt(getComputedStyle(card.value!).borderRadius.slice(0, -2))

      // Debug
      console.log(`Offset height: ${originHeight}`)

      // Create cardPlaceholder
      //  - Will be used as placeholder in the grid while we place the original card outside the grid
      //  - Might also be used as part of the expand animation 
      //    - The idea is that the placeholder has the defaultContent, and the card has the expandedContent 
      //      and then we fade out the placeholder and fade in the card while applying transforms to both to 
      //      give the impression that the card is moving

      if (cardPlaceholder == null) {
        cardPlaceholder = card.value!.cloneNode(true) as HTMLDivElement
        // cardPlaceholder.style.visibility = 'hidden'
      }

      // Set placeholder size to current card size (and replace all previous styling of the placeholder)
      // Note: Don't use tailwind here. See https://tailwindcss.com/docs/content-configuration#dynamic-class-names
      // Edit: Why would we manually set the size of the placeholder? It should naturally be the same size as the original card since it's an exact copy. Edit2: Things seem to still work after commenting this out.
      //  TODO: Remove this
      // cardPlaceholder.style.height = `${originHeight}px`
      // cardPlaceholder.style.width = `${originWidth}px`

      // Replace the card with the placeholder
      card.value?.replaceWith(cardPlaceholder)

      // Get references to defaultCardContent and expandedCardContent in the card
      //  TODO: Remove
      // const defaultCardContentCopy = findChildMatchingCondition(cardPlaceholder, (child) => child.id == 'defaultCardContent' )
      // const expandedCardContentCopy = findChildMatchingCondition(cardPlaceholder, (child) => child.id == 'expandedCardContent' )

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

      const targetWidth = `min(max(66%, ${700}px), 95%, 800px)`
      const targetMaxWidth = '100%'
      const targetHeight = /* '900px' */ 'fit-content'
      const targetMaxHeight = '80vh'

      var targetBorderRadius = ''
      var targetBorderWidth = ''

      const targetMarginLeft = 'auto'
      const targetMarginRight = 'auto'
      const targetLeft = '0'
      const targetRight = '0'
      var targetTop = ''

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
        paddingContainer.value!.style.height = 'fit-content'
        contentClipContainer.value!.style.height = 'fit-content'

        // Place in document
        cardPlaceholder?.offsetParent?.appendChild(card.value)

        // Calculate target style
        //  We calculated targetTop such that the x center of the card stays in the same position after expanding
        const computedH = card.value.offsetHeight
        const heightIncrease = computedH - originHeight
        targetTop = `${originTop - heightIncrease/2.0}px`

        // Set position and stuff
        card.value.style.marginLeft = targetMarginLeft
        card.value.style.marginRight = targetMarginRight
        card.value.style.left = targetLeft
        card.value.style.right = targetRight
        card.value.style.top = targetTop

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
        targetBorderWidth = '4px' // `${originBorderWidth * calcScale}px`
        targetBorderRadius = '24px' // `${originBorderRadius * calcScale}px`

        // Hide card and show placeholder
        //  This is the initial state for the animation. The animation might play after a delay, so we need to set the state here to prevent flickering
        card.value.style.opacity = '0.0'
        cardPlaceholder.style.opacity = '1.0'

        // Remove target style
        //  We're going to first remove the target style, then animate the card, and then apply the target style again after the animation ends.
        // TODO: Remove

        // cardPlaceholder.style.position = ''

        // cardPlaceholder.style.width = ''
        // cardPlaceholder.style.maxWidth = ''
        // cardPlaceholder.style.height = ''
        // cardPlaceholder.style.maxHeight = ''

        // cardPlaceholder.style.marginLeft = ''
        // cardPlaceholder.style.marginRight = ''
        // cardPlaceholder.style.left = ''
        // cardPlaceholder.style.right = ''
        // cardPlaceholder.style.top = ''
      }

      if (false) {

        // TODO: Remove

        // Show both the expanded content and the default content
        defaultCardContent.value!.style.display = 'flex'
        expandedCardContent.value!.style.display = 'flex'

        // Make the default content and expanded content overlap
        defaultCardContent.value!.style.position = 'absolute'
        expandedCardContent.value!.style.position = '' // Setting it to emptyString resets it to default which is `static` for position
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

        // TODO: Remove

        // // Set target style
        // card.value!.style.position = targetLayout

        // card.value!.style.width = targetWidth
        // card.value!.style.maxWidth = targetMaxWidth
        // card.value!.style.height = targetHeight
        // card.value!.style.maxHeight = targetMaxHeight

        // card.value!.style.marginLeft = targetMarginLeft
        // card.value!.style.marginRight = targetMarginRight
        // card.value!.style.left = targetLeft
        // card.value!.style.right = targetRight
        // card.value!.style.top = targetTop

        // // Hide default content
        // defaultCardContent.value!.style.display = 'none'
      }

      // Set transformOrigin
      cardPlaceholder!.style.transformOrigin = 'left top'
      card.value!.style.transformOrigin = 'left top'


      // Animation params
      // Discussion: 
      // - We used to use more physically accurate curves with longer decelerations, but they 
      //      made part of the animation too fast which is especially jarring when there are frame-drops.
      // Previous curves:
      // - dur: 0.5, sizeCurve: criticalSpring(4.0), centerCurve: criticalSpring(6.0)
      // - dur: 0.45, sizeCurve: $Power2.easeOut, centerCurve: $Power3.easeOut
      
      const dur = 0.5
      const easeForSize = criticalSpring(4.0)
      const easeForCenter = criticalSpring(6.0)

      // 
      // Animation preprocessing
      //  

      // Create base curves

      const curveForCenterX  = rawCurveFromAnimationCurve({ outputRange: { start: originCenterX, end: calcCenterX }, ease: easeForCenter })
      const curveForCenterY  = rawCurveFromAnimationCurve({ outputRange: { start: originCenterY, end: calcCenterY }, ease: easeForCenter })

      const curveForHeight   = rawCurveFromAnimationCurve({ outputRange: { start: originHeight, end: calcHeight },   ease: easeForSize })
      const curveForWidthh    = rawCurveFromAnimationCurve({ outputRange: { start: originWidth,  end: calcWidth },    ease: easeForSize })

      // Calculate animation curves for top/left of the element

      const curveForTopp: Curve = combineCurves(curveForCenterY, curveForHeight, (centerY, height) => centerY - height/2.0)
      const curveForLeft: Curve = combineCurves(curveForCenterX, curveForWidthh, (centerX, width) => centerX - width/2.0)

      // Find find animations for translate and scale equivalent to the position and size animations defined above
      //  (Translate and scale are very fast to animate)

      const curveForTranslateX  = transfromCurve(curveForLeft,     (v) => v - curveForLeft(0.0) )
      const curveForTranslateY  = transfromCurve(curveForTopp,     (v) => v - curveForTopp(0.0) )
      const curveForScaleX      = transfromCurve(curveForWidthh,   (v) => v / curveForWidthh(0.0) )
      const curveForScaleY      = transfromCurve(curveForHeight,   (v) => v / curveForHeight(0.0) )

      // Store the overall translate and scale 
      //  for convenience

      const translateX = curveForTranslateX(1.0)
      const translateY = curveForTranslateY(1.0)
      const scaleX = curveForScaleX(1.0)
      const scaleY = curveForScaleY(1.0)

      // Get inverse transforms
      //  Note: The transforms will be applied to the placeholder, which will be 
      //    at the original cards position in the layout, and the *inverse* transforms 
      //    will be applied to the original card element which will already be at it's target 
      //    position and size at the start of the animation. (That's why we have to apply *inverse* 
      //    transforms to it to get it to be at the original size and position at the start of the animation) 
      //    Overall, the placeholder and the original card should appear at the same position throughout the animation like this.
      //    Then we can fade between them, to get a smooth transition

      const curveForInverseTranslateX = transfromCurve(curveForTranslateX, (v) => v - translateX)
      const curveForInverseTranslateY = transfromCurve(curveForTranslateY, (v) => v - translateY)
      const curveForInverseScaleX     = transfromCurve(curveForScaleX,     (v) => v / scaleX)
      const curveForInverseScaleY     = transfromCurve(curveForScaleY,     (v) => v / scaleY)

      // Calculate transforms for card-content
      
      // Counter scaling cancels out the card scaling to prevent content from stretching
      var curveForCounterScaleX = transfromCurve(curveForInverseScaleX, (scale) => 1/scale)
      var curveForCounterScaleY = transfromCurve(curveForInverseScaleY, (scale) => 1/scale)

      // This transform makes the card content scale up cover the card during the animation, but without stretching. 
      //  Basically we apply the same animation to the content (both axes) as to axis of the card which scales up less.
      var curveForContentScaleX = combineCurves(curveForCounterScaleX, scaleX < scaleY ? curveForInverseScaleX : curveForInverseScaleY, (a, b) => a * b)
      var curveForContentScaleY = combineCurves(curveForCounterScaleY, scaleX < scaleY ? curveForInverseScaleX : curveForInverseScaleY, (a, b) => a * b)

      // DEBUG
      // console.log(`traceeee: ${ traceRawCurve(curveForCounterScaleX) } \ntraceoo: ${ traceRawCurve(largerScaleCurve) } \ntraceaaaa: ${ traceRawCurve(curveForContentScaleX) } \ntracexxx: ${ traceRawCurve(combineCurves(curveForCounterScaleX, largerScaleCurve, (a, b) => a * 1)) }\ntraceyyy: ${ traceRawCurve(animationCurveFromRawCurve(curveForContentScaleX).ease) }`)

      // Position card so it overlaps the placeholder (This is the starting state for the animation)
      // TODO: Remove

      // if (card.value) {
      //   card.value.style.position = 'absolute'
      //   card.value.style.top = `${startValueForTop}px`
      //   card.value.style.left = `${startValueForLeft}px`
      //   card.value.style.width = `${startValueForWidth}px`
      //   card.value.style.height = `${startValueForHeight}px`
      // }

      // Animate position-related styling on placeholder

      tl.fromTo(cardPlaceholder, {
        y: curveForTranslateY(0.0),
      }, {
        y: curveForTranslateY(1.0),

        duration: dur,
        ease: animationCurveFromRawCurve(curveForTranslateY).ease,
      }, 0)

      tl.fromTo(cardPlaceholder, {
        x: curveForTranslateX(0.0),
      }, {
        x: curveForTranslateX(1.0),

        duration: dur,
        ease: animationCurveFromRawCurve(curveForTranslateX).ease,
      }, 0)

      // Animate position-related styling on card

      tl.fromTo(card.value, {
        y: curveForInverseTranslateY(0.0),
      }, {
        y: curveForInverseTranslateY(1.0),

        duration: dur,
        ease: animationCurveFromRawCurve(curveForInverseTranslateY).ease,
      }, 0)

      tl.fromTo(card.value, {
        x: curveForInverseTranslateX(0.0),
      }, {
        x: curveForInverseTranslateX(1.0),

        duration: dur,
        ease: animationCurveFromRawCurve(curveForInverseTranslateX).ease,
      }, 0)

      // TESTING
      // console.log(`CurveForLeft: ${ traceRawCurve(curveForLeft) }`)
      // cardPlaceholder!.style.visibility = 'hidden'

      // Animate size-related styling on placeholder

      tl.fromTo(cardPlaceholder, {
        scaleX: curveForScaleX(0.0),
      }, {

        scaleX: curveForScaleX(1.0),

        duration: dur,
        ease: animationCurveFromRawCurve(curveForScaleX).ease,


      }, 0)

      tl.fromTo(cardPlaceholder, {
        scaleY: curveForScaleY(0.0),
      }, {

        scaleY: curveForScaleY(1.0),

        duration: dur,
        ease: animationCurveFromRawCurve(curveForScaleY).ease,


      }, 0)

      // Animate size-related styling on card

      tl.fromTo(card.value, {
        scaleX: curveForInverseScaleX(0.0),
      }, {

        scaleX: curveForInverseScaleX(1.0),

        // borderRadius: targetBorderRadius,
        // borderWidth: targetBorderWidth,

        duration: dur,
        ease: animationCurveFromRawCurve(curveForInverseScaleX).ease, // Ease might be same for x and y scale I think. If so, we could use a single fromTo call
      }, 0)

      tl.fromTo(card.value, {
        scaleY: curveForInverseScaleY(0.0),
      }, {
        scaleY: curveForInverseScaleY(1.0),
        duration: dur,
        ease: animationCurveFromRawCurve(curveForInverseScaleY).ease,

        // TODO: vvv Move this to timeline end, not this random animation
        onComplete: onEnd,
        onInterrupt: onEnd,
      }, 0)

      // Counter-animate card content to prevent stretching
      
      tl.fromTo(contentContainer.value, {
        scaleX: curveForContentScaleX(0.0),
      }, {
        scaleX: curveForContentScaleX(1.0),

        duration: dur,
        ease: animationCurveFromRawCurve(curveForContentScaleX).ease
      }, 0)

      tl.fromTo(contentContainer.value, {
        scaleY: curveForContentScaleY(0.0),
      }, {
        scaleY: curveForContentScaleY(1.0),

        duration: dur,
        ease: animationCurveFromRawCurve(curveForContentScaleY).ease
      }, 0)

      // Fade out placeholder
      // Notes:
      //  - Neither opacity nor autoalpha work. (Not sure what autoAlpha is) Edit: Now it does. Not sure why. autoAlpha sets visibility: hidden automatically for optimization. We'll use this if it doesn't cause problems.

      tl.fromTo(cardPlaceholder, {
        autoAlpha: 1.0,
      }, {
        autoAlpha: 0.0,
        duration: 0.4 * dur,
      }, 0)

      // Fade in card

      tl.fromTo(card.value, {
        autoAlpha: 0.0
      }, {
        autoAlpha: 1.0,
        duration: 0.4 * dur,
      }, 0)


      // Wait until browser is done rendering, then start animation
      //  This works since the timeline is paused. Also we're using fromTo everywhere which renders the from state immediately.
      //  See https://stackoverflow.com/questions/15875128/is-there-element-rendered-event

      function try_do_some_stuff() {

          const offsetW = card.value!.offsetWidth
          const offsetH = card.value!.offsetHeight

          console.log(`Try do some stuff - h: ${ offsetH } vs ${ originHeight } - w: ${ offsetW } vs ${ originWidth }`)

          if (offsetH != originHeight && offsetW != originWidth) {
            console.log(`Try do some stuff success`)
            setTimeout(() => { tl.delay(0.0).play() }, 0.0 * 1000)
          } else {
            console.log(`Try do some stuff again`)
            window.requestAnimationFrame(try_do_some_stuff);
          }
      };
      try_do_some_stuff()

    } else { // Unexpand

      // Remove backdrop from layout
      $store.backdrop?.remove()

      // Get current card size, position,
      //  Border radius, and shadow

      const originLayout = 'absolute'

      const originWidth = card.value!.offsetWidth
      const originHeight = card.value!.offsetHeight

      const originBorderRadius = ''
      const originBorderWidth = ''

      const originLeft = card.value!.offsetLeft
      const originTop = card.value!.offsetTop
      
      const originCenterX = originLeft + (originWidth/2.0)
      const originCenterY = originTop + (originHeight/2.0)

      // Bring card to front but behind expanding and expanded cards (which have zIndex 100)
      card.value!.style.zIndex = '99'

      // Show both the expanded content and the default content
      defaultCardContent.value!.style.display = 'flex'
      expandedCardContent.value!.style.display = 'flex'

      // Make the default content and expanded content overlap
      defaultCardContent.value!.style.position = ''
      expandedCardContent.value!.style.position = 'absolute'

      // After animation completes or is interrupted ...
      const onEnd = () => {
        
        // Hide expanded content
        expandedCardContent.value!.style.display = 'none'
        
        // Replace card styling with placeholder styling (except invisibility)
        // Note: For some reason we can't set the .style directly, but instead have to set .style.cssText

        card.value!.style.cssText = cardPlaceholder!.style.cssText
        card.value!.style.visibility = 'visible'

        // Replace placeholder with card.
        cardPlaceholder!.replaceWith(card.value!)

        // Bring card to normal level
        card.value!.style.zIndex = '0'

        // Debug
        console.log(`Unexpand result - top: ${card.value!.offsetTop}, left: ${card.value!.offsetLeft}, width: ${card.value!.offsetWidth}, height: ${card.value!.offsetHeight}, parent: ${card.value!.offsetParent?.tagName}`)
      }

      // Get size and position of placeholder
      const placeholderH = cardPlaceholder!.offsetHeight
      const placeholderW = cardPlaceholder!.offsetWidth
      const placeholderTop = cardPlaceholder!.offsetTop
      const placeholderLeft = cardPlaceholder!.offsetLeft
      const placeholderCenterX = placeholderLeft + (placeholderW/2.0)
      const placeholderCenterY = placeholderTop + (placeholderH/2.0)

      // Debug 

      console.log(`Unexpand placeholder - top: ${placeholderTop}, left: ${placeholderLeft}, width: ${placeholderW}, height: ${placeholderH}, parent: ${cardPlaceholder!.offsetParent?.tagName}`)

      // Unset all the position styling for the expanded layout of `card`
      
      card.value!.style.position = ''

      card.value!.style.width = ''
      card.value!.style.maxWidth = ''
      card.value!.style.height = ''
      card.value!.style.maxHeight = ''

      card.value!.style.marginLeft = ''
      card.value!.style.marginRight = ''
      card.value!.style.left = ''
      card.value!.style.right = ''
      card.value!.style.top = ''

      // Animation params
      // Discussion: 
      // - We used to use more physically accurate curves with longer decelerations, but they 
      //      made part of the animation too fast which is especially jarring when there are frame-drops.
      // Previous curves:
      // - dur: 0.6, sizeCurve: criticalSpring(6.0), centerCurve: criticalSpring(5.0)
      
      const dur = 0.6
      const curveForSize = $Power4.easeOut 
      const curveForCenter = $Power3.easeOut

      // Animation preprocessing
        //  Calculate animation curves + animation start and end values
      
      const startValueForWidth = originWidth
      const endValueForWidth = placeholderW
      const startValueForHeight = originHeight
      const endValueForHeight = placeholderH

      const startValueForCenterX = originCenterX
      const endValueForCenterX = placeholderCenterX
      const { curveForStart: curveForLeft, startValueForStart: startValueForLeft, endValueForStart: endValueForLeft } = animationCurveForStart(curveForCenter, startValueForCenterX, endValueForCenterX, curveForSize, startValueForWidth, endValueForWidth)

      const startValueForCenterY = originCenterY
      const endValueForCenterY = placeholderCenterY
      const { curveForStart: curveForTop, startValueForStart: startValueForTop, endValueForStart: endValueForTop } = animationCurveForStart(curveForCenter, startValueForCenterY, endValueForCenterY, curveForSize, startValueForHeight, endValueForHeight)

      // Debug
      // console.log(`curveForLeft: ${traceRawCurve(curveForLeft)}, ${startValueForLeft} - ${endValueForLeft}`)
      // console.log(`curveForTop: ${traceRawCurve(curveForTop)}, ${startValueForTop} - ${endValueForTop}`)

      // Position card so it overlaps the placeholder (This is the starting state for the animation)
      if (card.value) {
        card.value.style.position = 'absolute'
        card.value.style.top = `${startValueForTop}px`
        card.value.style.left = `${startValueForLeft}px`
        card.value.style.width = `${startValueForWidth}px`
        card.value.style.height = `${startValueForHeight}px`
      }

      // Animate card
      animationContext = $gsap.context((self) => {

        // var tl = $gsap.timeline()

        // Fade out expanded content
        $gsap.to(expandedCardContent.value, {
          opacity: 0.0,
          duration: 0.2 * dur,
        })

        // Fade in default content
        $gsap.to(defaultCardContent.value, {
          opacity: 1.0,
          duration: dur,
        })

        // Animate position
        $gsap.to(card.value, {
          top: endValueForTop,
          duration: dur,
          ease: curveForTop
        })

        $gsap.to(card.value, {
          left: endValueForLeft,
          duration: dur,
          ease: curveForLeft,
        })

        // Animate size
        $gsap.to(card.value, {
          width: endValueForWidth,
          height: endValueForHeight,
          duration: dur,
          ease: curveForSize,
          onComplete: onEnd,
          onInterrupt: onEnd,
        })

        // Play timeline
        // tl.play()
      })
    }
  })

  onUnmounted(() => {
    if (animationContext != null) {
      animationContext.revert() /* Clean up animation memory stuff or sth */
    }
  });

</script>

<style lang="postcss" scoped>

</style>