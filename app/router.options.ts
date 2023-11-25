import { type RouterConfig } from "@nuxt/schema"
import { storeToRefs } from "pinia"


export default <RouterConfig> {
  scrollBehavior: (to, from, savedPosition) => {

    const { $store } = useNuxtApp()
    const { introAnimationId } = storeToRefs($store)

    return new Promise((resolve) => {

      const unwatch = watch(introAnimationId, () => { // Wait for the intro scroll animation to load

        if (introAnimationId.value > 0) {
          
          setTimeout(() => {
            resolve(
                to.hash       ? { el: to.hash } : // If the URL ends with `#someID`, scroll to the element with HTML id `someID`
                savedPosition ? savedPosition : 
                                { top: 0 }
            )
          }, 0.1 * 1000)

          unwatch()
        }
      })
    })
  }
}