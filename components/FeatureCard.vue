  <!-- 
    Notes:
    - bg-origin-border is needed to make the border work properly with background gradient. See https://stackoverflow.com/questions/11717873/why-are-border-colors-inverted-when-a-background-gradient-is-applied
    - $attrs.class contains the classes set by the parent like this <FeatureCard class="baz boo" />
  -->

<template>
  <div
    ref="root"
    @click="isExpanded = true"
    :class="['h-full rounded-xl overflow-clip', $attrs.class, isExpanded ? 'border-2 border-gray-400/10 bg-origin-border drop-shadow-2xl shadow-2xl' : 'border-0 shadow-2xl' ]">
    <div v-show="!isExpanded" id="defaultSlotWrapper" class="m-6">
      <slot name="default"/> <!-- Default card content -->
    </div>
    <div v-show="isExpanded" id="expandedSlotWrapper">
      <slot name="expanded"/> <!-- When card is clicked, the card should expand and show this content -->
    </div>
  </div>
</template>

<script setup lang="ts">

  const { $store, $gsap } = useNuxtApp()
  const slots = useSlots()

  const root: Ref<HTMLElement | null> = ref(null) /* Will be bound to the root element by magic */
  const isExpanded = ref(false)
  var animationContext: any = null

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

      // Close this card on backdrop click
      $store.backdrop.onclick = (_) => isExpanded.value = false

      // Insert backdrop into document
      document.body.appendChild($store.backdrop)

      // Bring card to front
      root.value.style.zIndex = 100

      // Animate card
      animationContext = $gsap.context((self) => { /* Not sure this leaks memory since we create so many contexts */

        const dur = 0.5
          const onCompleted = () => {
        }

        // Fade out default content
        $gsap.to("#defaultSlotWrapper", {
          opacity: 0.0,
          duration: 0.6 * dur,
        })

        // Fade in expanded content
        $gsap.from("#expandedSlotWrapper", {
          opacity: 0.0
        })
        $gsap.to("#expandedSlotWrapper", {
          opacity: 1.0,
          duration: dur,
        })

        // Move card
        $gsap.to(root.value, {
          x: 200,
          duration: dur,
          ease: criticalSpring(6.0),
        })

        // Zoom card
        $gsap.to(root.value, {
          scale: 2.0,
          duration: dur,
          ease: criticalSpring(4.0),
          onComplete: onCompleted,
        })

      })
    } else { // Unexpand

      // Remove backdrop from layout
      $store.backdrop?.remove()

      // Bring card to normal level after animation
      const onCompleted = () => {
        root.value.style.zIndex = 0
      }

      // Animate card
      animationContext = $gsap.context((self) => {

        const dur = 0.5

        var tl = $gsap.timeline()

        // Fade out expanded content
        tl.to("#expandedSlotWrapper", {
          opacity: 0.0,
          duration: dur,
        }, 0)

        // Fade in default content
        tl.to("#defaultSlotWrapper", {
          opacity: 1.0,
          duration: dur,
        }, 0)

        // Move card
        tl.to(root.value, {
          x: 0,
          duration: dur /* - 0.005 */,
          ease: criticalSpring(4.0),
        }, 0/* .005 */) 

        // Un-Zoom card
        tl.to(root.value, {
          scale: 1.0,
          duration: dur,
          ease: criticalSpring(6.0),
          onComplete: onCompleted,
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