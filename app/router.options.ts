/* Configuration for vue router
  
  Discussion:
  - The main purpose of this extra configuration is 
    1. Being able to link to sections of the website with #. Example: `macmousefix.com/#action_table` or `macmousefix.com/de_DE#action_table`. Currently the the supported hashes are: (But any html element with an id can be addressed)
      - `trackpad`
      - `scroll`
      - `action_table`
      - `price`
    2. Waiting for the introAnimation to be loaded *before* the router changes the scroll position. That's because when the introAnimation loads, the introSection grows in size and pushes everything after it down.
    3. Being able to restore the scroll-position from the last visit after the page is visited again. (This is default behaviour but we have to re-implement it since we override the scrollBehaviour)
  - 


*/

// Imports
import { type RouterConfig } from "@nuxt/schema"
import { storeToRefs } from "pinia"

// Constants
const hashOffset = -70 // Chosen so that the headline is *centered* on the screen when we link to sections of the website with #. !REMEMBER: Update this when the layout of the section headers changes.
const scrollBehavior = 'instant' // Whether to animate the scroll

// Main
export default <RouterConfig> {
  scrollBehavior: (to, from, savedPosition) => {

    const { $store } = useNuxtApp()
    const { introAnimationId } = storeToRefs($store)

    return new Promise((resolve) => {

      const unwatch = watch(introAnimationId, () => { // Wait for the intro scroll animation to load, because it shifts everything below it down.

        if (introAnimationId.value > 0) {
          
          requestAnimationFrame(() => {
            resolve(
                to.hash       ? { el: to.hash, top: hashOffset, behavior: scrollBehavior } : // If the URL ends with `#someID`, scroll to the element with HTML id `someID`
                savedPosition ? { top: savedPosition.top, behavior: scrollBehavior  } : 
                                { top: 0 }
            )
          })

          unwatch()
        }
      })
    })
  }
}