export { doAfterRender }

function doAfterRender(workload: () => any, additionalDelay: number = 0.0) {

  // Notes:
  // - This seems to help prevent a stutter at the start of gsap animations in Safari. 
  // - If you use this to start a gsap timeline, make sure to create the timeline with `gsap.timeline({ paused: true })`, so it doesn't play immediately
  // - See https://stackoverflow.com/questions/15875128/is-there-element-rendered-event
  // - tl.delay() doesn't work anymore for some reason

  const { $gsap } = useNuxtApp()

  window.requestAnimationFrame(() => {
    setTimeout(() => {
      $gsap.delayedCall(additionalDelay, workload)
    }, 0)
  });
}