export { doAfterRender, everyNth, debouncer }

function debouncer(workload: () => any, timeout: number): () => any {

  // Returns a function that executes `workload` after `timout` milliseconds. If the function is called again during this timeout period, the timeout will reset.

  var timer: any
  const result = () => {
    clearTimeout(timer)
    timer = setTimeout(workload, timeout)
  }

  return result
}

function everyNth(n: number, startIndex: number, array: any[]): any[] {
  // Make a new array containg every `n`th element of `array`, starting at `startIndex`
  // We're using this so that we can place the quotes that we want most visible at the top of our `quotes` and then spread them out evenly along several columns.

  var result: any[] = []

  var index = startIndex
  while (true) {

    if (index >= array.length) {
      break
    }

    const v = array[index]
    result.push(v)

    index += n
  }

  return result
}

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