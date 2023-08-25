  <!-- 
    Notes:
    - bg-origin-border is needed to make the border work properly with background gradient. See https://stackoverflow.com/questions/11717873/why-are-border-colors-inverted-when-a-background-gradient-is-applied
    - $attrs.class contains the classes set by the parent like this <FeatureCard class="baz boo" />
  -->

<template>
  <div
    ref="card"
    @click="isExpanded = true"
    :class="['h-full rounded-xl overflow-clip border-2 border-gray-50/25 bg-origin-border shadow-lg', $attrs.class, isExpanded ? '' : '' ]">
    <div ref="defaultCardContent" class="">
      <slot name="default"/> <!-- Default card content -->
    </div>
    <div ref="expandedCardContent" class="absolute top-0 left-0 hidden">
      <slot name="expanded"/> <!-- When card is clicked, the card should expand and show this content -->
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
  const defaultCardContent: Ref<HTMLElement | null> = ref(null)
  const expandedCardContent: Ref<HTMLElement | null> = ref(null)

  // Dynamically created dom elements
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

      // Create placeholder
      if (cardPlaceholder == null) {
        cardPlaceholder = document.createElement('div')
      }

      // Get current card size in layout
      // See https://developer.mozilla.org/en-US/docs/Web/API/CSS_Object_Model/Determining_the_dimensions_of_elements
      const w = card.value?.offsetWidth
      const h = card.value?.offsetHeight

      // Debug
      console.log(`Offset height: ${h}`)

      // Set placeholder size to current card size (and replace all previous styling of the placeholder)
      // Note: Don't use tailwind here. See https://tailwindcss.com/docs/content-configuration#dynamic-class-names
      cardPlaceholder.style.height = `${h}px`
      cardPlaceholder.style.width = `${w}px`

      // Get the cards position in its container
      const top = card.value?.offsetTop
      const left = card.value?.offsetLeft

      // Replace the card with the placeholder
      card.value?.replaceWith(cardPlaceholder)

      // Place the card back into the document at its old coordinates, but with absolute position, so it overlaps the placeholder
      if (card.value) {
        card.value.style.position = 'absolute'
        card.value.style.top = `${top}px`
        card.value.style.left = `${left}px`
        card.value.style.width = `${w}px`
        card.value.style.height = `${h}px`
        cardPlaceholder.offsetParent?.appendChild(card.value!)
      }

      // Animate
      animationContext = $gsap.context((self) => { /* Not sure this leaks memory since we create so many contexts */

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

        // Show the expanded content
        expandedCardContent.value?.classList.remove('hidden')

        // Animate card
        const dur = 0.5
        const onEnd = () => {
          /// Hide default content
          defaultCardContent.value?.classList.add('hidden')
        }

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

        // Move card
        $gsap.to(card.value, {
          x: 200,
          duration: dur,
          ease: criticalSpring(6.0),
        })

        // Zoom card
        $gsap.to(card.value, {
          scale: 2.0,
          duration: dur,
          ease: criticalSpring(4.0),
          onComplete: onEnd,
          onInterrupt: onEnd,
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
        
        // Remove absolute positioning from card and replace placeholder with it
        if (card.value) {
          card.value!.style.position = ''
        }
        cardPlaceholder?.replaceWith(card.value)
      }

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

        // Move card
        tl.to(card.value, {
          x: 0,
          duration: dur /* - 0.005 */,
          ease: criticalSpring(4.0),
        }, 0/* .005 */) 

        // Un-Zoom card
        tl.to(card.value, {
          scale: 1.0,
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