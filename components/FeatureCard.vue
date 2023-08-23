  <!-- 
    Notes:
    - bg-origin-border is needed to make the border work properly with background gradient. See https://stackoverflow.com/questions/11717873/why-are-border-colors-inverted-when-a-background-gradient-is-applied
    - $attrs.class contains the classes set by the parent like this <FeatureCard class="baz boo" />
  -->

<template>
  <div
    ref="root"
    @click="isExpanded = !isExpanded" 
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

  const { $gsap } = useNuxtApp()
  const slots = useSlots()

  const root = ref(null) /* Will be bound to the root element by magic */
  const isExpanded = ref(false)
  let gsapCtx: any

  watch(isExpanded, (newIsExpanded) => {
    if (newIsExpanded) {

      root.value.style.zIndex = 100

      gsapCtx = $gsap.context((self) => { /* Not sure this leaks memory since we create so many contexts */

        // Move card
/*         $gsap.to(root.value, {
          x: 200,
          duration: 0.4,
          ease: "elastic.out(0.001, 1.0)",
        }) */
        $gsap.to(root.value, {
          x: 200,
          duration: 0.5,
          ease: criticalSpring(6.0),
        })

        // Zoom card
        $gsap.to(root.value, {
          scale: 2.0,
          duration: 0.5,
          ease: criticalSpring(4.0),
        })

        // Fade out default content
        $gsap.to("#defaultSlotWrapper", {
          opacity: 0.0,
          duration: 0.3,
        })

        // Fade in expanded content
        $gsap.from("#expandedSlotWrapper", {
          opacity: 0.0
        })
        $gsap.to("#expandedSlotWrapper", {
          opacity: 1.0,
          duration: 0.5,
        })

      })
    } else {
      gsapCtx = $gsap.context((self) => {

        var tl = $gsap.timeline()

        // Fade out expanded content
        tl.to("#expandedSlotWrapper", {
          opacity: 0.0,
          duration: 0.4,
        }, 0)

        // Fade in default content
        tl.to("#defaultSlotWrapper", {
          opacity: 1.0,
          duration: 0.4,
        }, 0)

        // Un-Zoom card
        tl.to(root.value, {
          scale: 1.0,
          duration: 0.5,
          ease: criticalSpring(6.0),
          onComplete: () => {
            root.value.style.zIndex = 0
          }
        }, 0)

        // Move card
        tl.to(root.value, {
          x: 0,
          duration: 0.5 /* - 0.005 */,
          ease: criticalSpring(4.0),
        }, 0/* .005 */)

        // Play timeline
        tl.play()
      })
    }
  })

  onUnmounted(() => {
    gsapCtx.revert() /* Clean up animation memory stuff or sth */
  });

</script>

<style lang="postcss" scoped>

</style>