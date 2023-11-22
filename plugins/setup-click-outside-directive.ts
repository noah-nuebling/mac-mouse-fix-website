/* 

  Custom directive for monitoring clicks outside of an element.

  You can specify an onEvent callback, a `condition` for when the click monitoring should be active, and a `blockEvents` bool which prevents outside-clicks from doing anything besides triggering the onEvent callback/

  Usage example:
  ```
  <div v-on-click-outside="{ onEvent: () => { <<some actions>> }, condition: <<some (reactive) boolean>>, blockEvents: <<some boolean>> }">
  ```
*/

import { defineNuxtPlugin } from "nuxt/app"

export default defineNuxtPlugin((app) => {

  app.vueApp.directive("on-click-outside", {

    beforeMount(el, binding) {
      const { callback, condition, doBlockEvents } = parseBinding(binding)

      if (condition) { 
        addListener(el, callback, doBlockEvents)
      }
    }, 
    updated(el, binding) { // If we bind the directive to reactive stuff and it changes, this is invoked

      const { callback, condition, doBlockEvents } = parseBinding(binding)

      if (condition) { 
        addListener(el, callback, doBlockEvents)
      } else {
        removeListener(el)
      }

    },
    unmounted(el) {
      removeListener(el)
    }
  })
})

function parseBinding(binding) {

  var callback = binding.value.onEvent
  var condition = binding.value.condition
  var doBlockEvents = binding.value.blockEvents

  // Fallback: if we can't get callback from object, see if the whole binding is just the callback
  if (callback == null) {
    callback = binding.value
    condition = true
    doBlockEvents = false
  }

  // Fill out not-provided params
  if (condition == null) { condition = true }
  if (doBlockEvents == null) { doBlockEvents = false }

  // Return
  return { callback, condition, doBlockEvents }
}

function addListener(el, callback, doBlockEvents) {

  // Create function with logic: If clicked element is not el or el's child, then invoke the provided callback
  const clickOutsideEvent = function(event: Event) {

    if (el !== event.target && !el.contains(event.target)) {

      // Call callback
      callback(event)

      // Block event
      if (doBlockEvents) {
        event.preventDefault()
        event.stopPropagation() // Should we use stopImmediatePropagation()?
      }
    }
  }
  // Store function on el
  el.MMFClickOutsideEvent = clickOutsideEvent

  // Start listening
  //  Notes: - Setting the last param to true, makes the listener intercept during the event 'capturing' phase, instead of the 'bubbling' phase. This makes this event listener be installed *before* vue @click listeners, which makes the `doBlock` option work better for our usecases, because we want to block @click listeners.
  document.addEventListener('click', el.MMFClickOutsideEvent, true)
}

function removeListener(el) {
  // Stop listening
  document.removeEventListener('click', el.MMFClickOutsideEvent, true)
}