  <!-- 
    Notes:
    - bg-origin-border is needed to make the border work properly with background gradient. See https://stackoverflow.com/questions/11717873/why-are-border-colors-inverted-when-a-background-gradient-is-applied
    - $attrs.class contains the classes set by the parent like this <FeatureCard class="baz boo" />
    - We're making the card a flexbox just to center the video vertically during the expand animation. Not sure this is the best solution. Also no idea why/if the video is centered horizontally, if the card has a taller aspect ratio than the card.
    - If we set margins on the slot content, that currently doesn't work properly for the default slot for some reason. The div around the default slot has the exact size of the slot content, but without the slot content's margins. This makes it so part of the slot content is cut off. I don't know what's going on. We'll just use padding instead of margins for now. Edit: This doesn't happen anymore now. I dont' know what changed. Might have to do with `space-x-0` and `space-y-0` which we removed.
    - I struggled controlling which part of the card content gets clipped / resized during the animation. It was because we couldn't get elements to shrink below their content size. Solution was setting min-h-0 and min-w-0 (for flex items) or setting overflow-clip (for block or flex items). Source: https://stackoverflow.com/a/38383437/10601702
      - However I couldn't get it to work properly with block items, so we made everything flex. But the expandedCardContent div and the other children of the `swappableContentContainer` *don't* seem to need the min-[axis]-0 to shrink properly. I have no clue why. Edit: When we switched everything to flex-col (instead of the default flex-row), we DID have to add the min-[axis]-0 for things to work. I'm lost. But hey it works.
      - We made everything flex because it works and block confuses me. The expandedCardContent div starts out with display: none (twcc `hidden`) and gets display: flex through js
    - On the defaultCardContent div we had to set flex-col (default is row), otherwise things would behave super weird when trying to set margins on its child. No clue why. We're setting everything to flex col, even if we only expect the flexbox to contain one item because of this.
  -->

<template>
  <div
    ref="card"
    @click="isExpanded = true"
    :class="['flex flex-col h-full rounded-xl overflow-clip border-2 border-gray-50/25 bg-origin-border shadow-lg', $attrs.class, isExpanded ? '' : '' ]">
    
    <!-- Top -->
    <div ref="topCardContent" class="flex flex-col">
      <slot name="top"/>
    </div> 

    <!-- Swap -->
    <div ref="swappableContentContainer" class="min-h-0 min-w-0 
                                                flex flex-col">

      <!-- Default -->
      <div ref="defaultCardContent" class="min-h-0 min-w-0
                                            flex flex-col">
        <slot name="default"/>
      </div>

      <!-- Expanded -->
      <div ref="expandedCardContent" class="min-h-0 min-w-0
                                            hidden flex-col">
        <slot name="expanded"/>
      </div>
    </div>

    <!-- Bottom -->
    <div ref="bottomCardContent" class="flex flex-col">
      <slot name="bottom"/>
    </div>
  </div>
</template>

<script setup lang="ts">

  // Import (is that the right term?) vue/nuxt stuff
  const { $ScrollTrigger, $store, $gsap } = useNuxtApp()
  const slots = useSlots()

  // Define vars
  const isExpanded = ref(false)
  var animationContext: any = null

  // Get references to relevant dom elements
  // The stuff initialized to ref(null) will be automatically bound to the html element with the ref attribute set to the same value by vue
  const card: Ref<HTMLElement | null> = ref(null)
  
  const topCardContent: Ref<HTMLElement | null> = ref(null)  
  const defaultCardContent: Ref<HTMLElement | null> = ref(null)
  const expandedCardContent: Ref<HTMLElement | null> = ref(null)
  const bottomCardContent: Ref<HTMLElement | null> = ref(null) 

  // Dynamically created elements
  var cardPlaceholder: HTMLDivElement | null = null

  watch(isExpanded, (shouldExpand) => {

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
        // b.classList.add('bg-stone-900/10') // Not displaying the backdrop. But using it to close card when user click outside the card
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
      card.value.style.zIndex = 100

      // Create card placeholder
      if (cardPlaceholder == null) {
        cardPlaceholder = card.value.cloneNode(true) as HTMLDivElement
        cardPlaceholder.classList.add('invisible')
      }

      // Get current card size and position relative to nearest positioned ancestor
      // See https://developer.mozilla.org/en-US/docs/Web/API/CSS_Object_Model/Determining_the_dimensions_of_elements
      const originWidth = card.value!.offsetWidth
      const originHeight = card.value!.offsetHeight
      
      const originTop = card.value!.offsetTop
      const originLeft = card.value!.offsetLeft
      const originCenterX = originLeft + originWidth/2.0
      const originCenterY = originTop + originHeight/2.0

      const originBorderWidth = parseInt(getComputedStyle(card.value!).borderWidth.slice(0, -2)) /* Slice off the `px` suffix from the string */
      const originBorderRadius = parseInt(getComputedStyle(card.value!).borderRadius.slice(0, -2))


      // Debug
      console.log(`Offset height: ${originHeight}`)

      // Set placeholder size to current card size (and replace all previous styling of the placeholder)
      // Note: Don't use tailwind here. See https://tailwindcss.com/docs/content-configuration#dynamic-class-names
      cardPlaceholder.style.height = `${originHeight}px`
      cardPlaceholder.style.width = `${originWidth}px`

      // Replace the card with the placeholder
      card.value?.replaceWith(cardPlaceholder)

      // Place the expanded content in the card, hide the default content
      defaultCardContent.value!.style.display = 'none'
      expandedCardContent.value!.style.display = 'flex'

      // Determine target styling of card
      // Notes:
      // - How to center absolutely positioned element: https://stackoverflow.com/questions/1776915/how-can-i-center-an-absolutely-positioned-element-in-a-div
      // - Ideally we wanna set the width relative to the grid width, because we don't want the expanded card to spill out of the grid so you still can see context which should make the interaction feel lighter. Currently, the percent-based sizes aren't relative to the grid, and there are some sizes where the expanded card spills out from the grid. Maybe we can fix this by inserting the expanded card into the container element which determines the grid width (and the width of the document as a whole.). But we'd have to position that element so it's the nearest positioned ancestor aka the '.offsetParent' and idk if that could lead to other problems?
      // - Our width style with the min() and max() functions is *very* confusing to read. Maybe it would be better to use tailwind with media queries? But mixing tailwind classes with setting style directly through js seems like a bad idea. Idk how you could assign media queried' css through js. So this is the best solution I can come up with for now.
      // - TODO: Add border radius, border width and shadow changes here.

      const targetLayout = 'absolute'


      const targetWidth = `min(max(66%, ${700}px), 95%, 800px)`
      const targetMaxWidth = '100%'
      const targetHeight = /* '300px' */ 'fit-content'
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

        // Place in document
        cardPlaceholder.offsetParent?.appendChild(card.value)

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
        targetBorderWidth = '4px' // `${originBorderWidth * calcScale}px`
        targetBorderRadius = '24px' // `${originBorderRadius * calcScale}px`

        // Remove target style
        card.value.style.position = ''

        card.value.style.width = ''
        card.value.style.maxWidth = ''
        card.value.style.height = ''
        card.value.style.maxHeight = ''

        card.value.style.marginLeft = ''
        card.value.style.marginRight = ''
        card.value.style.left = ''
        card.value.style.right = ''
        card.value.style.top = ''
      }

      // Show both the expanded content and the default content
      defaultCardContent.value!.style.display = 'flex'
      expandedCardContent.value!.style.display = 'flex'

      // Make the default content and expanded content overlap
      defaultCardContent.value!.style.position = 'absolute'

      // Animate
      animationContext = $gsap.context((self) => {

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

          // Set target style
          card.value!.style.position = targetLayout
          card.value!.style.width = targetWidth
          card.value!.style.maxWidth = targetMaxWidth
          card.value!.style.height = targetHeight
          card.value!.style.maxHeight = targetMaxHeight
          card.value!.style.marginLeft = targetMarginLeft
          card.value!.style.marginRight = targetMarginRight
          card.value!.style.left = targetLeft
          card.value!.style.right = targetRight
          card.value!.style.top = targetTop

          // Hide default content
          defaultCardContent.value!.style.display = 'none'
        }

        // Calculate animation curves + animation start and end values

        const curveForSize = criticalSpring(4.0)
        const curveForCenter = criticalSpring(6.0)

        const startValueForWidth = originWidth
        const endValueForWidth = calcWidth
        const startValueForHeight = originHeight
        const endValueForHeight = calcHeight

        const startValueForCenterX = originCenterX
        const endValueForCenterX = calcCenterX
        const { curveForStart: curveForLeft, startValueForStart: startValueForLeft, endValueForStart: endValueForLeft } = animationCurveForStart(curveForCenter, startValueForCenterX, endValueForCenterX, curveForSize, startValueForWidth, endValueForWidth)

        const startValueForCenterY = originCenterY
        const endValueForCenterY = calcCenterY
        const { curveForStart: curveForTop, startValueForStart: startValueForTop, endValueForStart: endValueForTop } = animationCurveForStart(curveForCenter, startValueForCenterY, endValueForCenterY, curveForSize, startValueForHeight, endValueForHeight)

        // Position card so it overlaps the placeholder (This is the starting state for the animation)
        if (card.value) {
          card.value.style.position = 'absolute'
          card.value.style.top = `${startValueForTop}px`
          card.value.style.left = `${startValueForLeft}px`
          card.value.style.width = `${startValueForWidth}px`
          card.value.style.height = `${startValueForHeight}px`
        }

        // Animate card
        const dur =   .5

        // Animate position-related styling

        $gsap.to(card.value, {
          
          top: endValueForTop,
          duration: dur,
          ease: curveForTop,
        })

        $gsap.to(card.value, {
          
          left: endValueForLeft,
          duration: dur,
          ease: curveForLeft,
        })

        // Animate size-related styling

        $gsap.to(card.value, {

          width: endValueForWidth,
          height: endValueForHeight,

          borderRadius: targetBorderRadius,
          borderWidth: targetBorderWidth,

          duration: dur,
          ease: curveForSize,

          onComplete: onEnd,
          onInterrupt: onEnd,
        })

        // Debug
        // console.log(`target border width: ${targetBorderRadius}, radius: ${targetBorderWidth}`)

        // Fade out default content
        $gsap.to(defaultCardContent.value, {
          opacity: 0.0,
          duration: 0.2 * dur,
        })

        // Fade in expanded content
        $gsap.from(expandedCardContent.value, {
          opacity: 0.0
        })
        $gsap.to(expandedCardContent.value, {
          opacity: 1.0,
          duration: dur,
        })
      })
    } else { // Unexpand

      // Remove backdrop from layout
      $store.backdrop?.remove()

      // Bring card to front but behind expanding cards
      card.value.style.zIndex = 99

      // Show default content
      defaultCardContent.value?.classList.remove('hidden')

      // After animation completes or is interrupted ...
      const onEnd = () => {
        
        // Hide expanded content
        expandedCardContent.value?.classList.add('hidden')

        // Bring card to normal level
        card.value.style.zIndex = 0
        
        // Remove absolute positioning + size from card and replace placeholder with it
        if (card.value) {
          card.value!.style.position = ''
          card.value!.style.width = ''
          card.value!.style.height = ''
        }
        cardPlaceholder?.replaceWith(card.value)
      }

      // Get size and position of placeholder
      const placeholderH = cardPlaceholder.offsetHeight
      const placeholderW = cardPlaceholder.offsetWidth
      const placeholderTop = cardPlaceholder.offsetLeft
      const placeholderLeft = cardPlaceholder.offsetTop

      // Animate card
      animationContext = $gsap.context((self) => {

        const dur = 0.5

        var tl = $gsap.timeline()

        // Fade out expanded content
        tl.to(expandedCardContent.value, {
          opacity: 0.0,
          duration: 0.2 * dur,
        }, 0)

        // Fade in default content
        tl.to(defaultCardContent.value, {
          opacity: 1.0,
          duration: dur,
        }, 0)

        // Move card back to placeholder position
        tl.to(card.value, {
          top: placeholderTop,
          left: placeholderLeft,
          duration: dur /* - 0.005 */,
          ease: criticalSpring(4.0),
        }, 0/* .005 */) 

        // Scale card to placeholder size
        tl.to(card.value, {
          scale: 1.0,
          width: placeholderW,
          height: placeholderH,
          duration: dur,
          ease: criticalSpring(6.0),
          onComplete: onEnd,
          onInterrupt: onEnd,
        }, 0)

        // Play timeline
        tl.play()
      })
    }
  })

  onUnmounted(() => {
    animationContext.revert() /* Clean up animation memory stuff or sth */
  });

</script>

<style lang="postcss" scoped>

</style>