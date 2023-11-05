export { doAfterRender, everyNth, debouncer, watchProperty }

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
  // - Not totally sure what this does
  // - This seems to help prevent a stutter at the start of gsap animations in Safari. We might be able to achieve the same effect using less nested calls. ChatGPT said it's a common trick to nest two requestAnimationFrames().
  // - If you use this to start a gsap timeline, make sure to create the timeline with `gsap.timeline({ paused: true })`, so it doesn't play immediately
  // - See https://stackoverflow.com/questions/15875128/is-there-element-rendered-event
  // - tl.delay() doesn't work anymore for some reason

  const { $gsap } = useNuxtApp()

  window.requestAnimationFrame(() => {
    setTimeout(() => {
      $gsap.delayedCall(additionalDelay/1000.0, workload)
    }, 0)
  });
}

function watchProperty(obj: any, propName: PropertyKey, callback: (newValue: any) => any): () => any {

  // Get a callback whenever a property is set
  // Credit: ChatGPT
  // Notes: 
  //  - We meant to use this for debugging of scrollTop property. But this function doesn't work on the `scrollTop` property. So this is currently unused and untested.
  // Usage:
  //  var myDiv = document.getElementById('myDiv');
  //  var unwatchScrollTop = watchProperty(myDiv, 'scrollTop', function(newValue) {
  //     console.log('scrollTop changed to:', newValue);
  //  });
  //  // To stop watching changes and restore the original property behavior
  //  unwatchScrollTop();

  // Make sure the property exists on the object and is configurable
  const originalDescriptor = Object.getOwnPropertyDescriptor(obj, propName);
  if (!originalDescriptor || !originalDescriptor.configurable) {
    throw new Error(`The property ${String(propName)} is not configurable.`);
  }

  // Create a new property with a custom setter
  Object.defineProperty(obj, propName, {
    get: function() {
      return originalDescriptor.get ? originalDescriptor.get.call(this) : originalDescriptor.value;
    },
    set: function(newValue) {
      if (callback) {
        callback(newValue);
      }
      if (originalDescriptor.set) {
        originalDescriptor.set.call(this, newValue);
      } else {
        originalDescriptor.value = newValue;
      }
    },
    enumerable: true,
    configurable: true
  });

  return function unwatch() {
    // Restore the original property descriptor
    Object.defineProperty(obj, propName, originalDescriptor);
  };
}