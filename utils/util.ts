import { request } from "https"

export { doAfterRenderrr, doAfterRender, doBeforeRender, optimizeOnUpdate, everyNth, debouncer, watchProperty, prefersReducedMotion, remInPx, vw, vh, vmin, vmax, resetCSSAnimation, getProps, setProps, roundTo, setResolution, unsetResolution, formatAsMoney }

function formatAsMoney(number: number, currencyCode: string, locale = 'en') {

  // Written by ChatGPT

  // Restrict functionality
  //    Formatting USD with European formatting or formatting Euro with US formatting looks super weird. Also we're only using USD at this time. So we're forcing this to only with with USD and US formatting.
  console.assert(currencyCode == 'USD' && locale == 'en', `We only support formatting USD with en formatting at the moment. Tried to format ${currencyCode} with ${locale} formatting.`)

  // Create formatter
  const formatter = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currencyCode,
      // minimumFractionDigits: minimumFractionDigits, // Optional: Avoids decimal part for the dummy number
  });

  // Format
  const result = formatter.format(number)

  // Return
  return result
}

type ElementSize<T = number | string> = {
    fontSize: T,
    width: T,
    height: T
    marginTop: T,
    marginRight: T,
    marginBottom: T,
    marginLeft: T,
    // opticalSize: 
}

function unsetResolution(...elements: HTMLElement[]) {
  
  for (var element of elements) {

    if (!element.originalStyle) { continue }
    setProps(element.style, element.originalStyle)

    // Delete stored size and style
    //  We do this so in Intro.vue, when the mmfName's size changes due to responsive stuff, we're not forever stuck with the initial `originalSize`. 
    //  It might be nice to have a dedicated method for updating the size of an element which setResolution() has been called on, but for now, this hacky stuff is good enough

    element.originalStyle = null
    element.originalSize = null
  }
}

function setResolution(scaleFactor: number, ...elements: HTMLElement[]) {

  // Makes each of the `elements` be cached to a bitmap by the browser (or at least Safari) at `scaleFactor` times the current resolution. 
  //    That way, then you scale up the element to `scaleFactor` it still looks sharp, but since it's cached to a bitmap, the performance is better.
  // Notes: 
  // - We use this to make the zoom-into-text animation from Intro.vue work much faster on Safari. Chrome doesn't need this to look and perform super well. On Firefox I'm not sure what this does.
  // - This works by setting the actual size of the element to be `scaleFactor` times larger than the original size, then adjusting the margins to not affect the layout, and then scaling the element back down with the `scale` css style, and then setting `will-change: transform` style which forces the element to be rendered to a bitmap.
  // - This breaks for fonts with optical sizing, because those fonts change proportions as we change their font-size. Apple's San Francisco has optical sizing. You can set `font-optical: none` as a workaround.

  for (var element of elements) {

    if (!element) {
      console.error("Element not found")
      continue
    }

    // TEST
    // console.error(`ahhhh`)

    // Check if original size and margin data are already stored

    if (!element.originalSize) {

      // Store style for unsetResolution()
      const style = getProps(element.style,          ['fontSize', 'width', 'height', 'marginTop', 'marginRight', 'marginBottom', 'marginLeft', 'willChange', 'transform', 'transformOrigin'])
      element.originalStyle = style

      // Store computed size for computations
      const computedStyle = getComputedStyle(element)
      const size = getProps(computedStyle,           ['fontSize', 'width', 'height', 'marginTop', 'marginRight', 'marginBottom', 'marginLeft'])
      transformValues(size, (x) => parseFloat(x))
      element.originalSize = size

    }

    // Smooth out font size changes
    // element.style.transition = 'transform 0.2s ease-out, font-size 0.2s ease-out';

    // Retrieve original sizes and margins
    const { fontSize, width, height, marginTop, marginRight, marginBottom, marginLeft } = element.originalSize;

    // Get scaled font
    //  Round font size to px
    const fontSizeNew = scaleFactor * fontSize //Math.ceil(scaleFactor * fontSize)
    const fontScale = fontSizeNew / fontSize

    // Calculate the inverse scale factor (for counter-scaling)
    const inverseScale = 1 / fontScale;

    console.log(`Scale: ${fontScale}, inverse: ${inverseScale}, scaleRaw: ${scaleFactor}, fontBase: ${fontSize}, fontScaled: ${fontSizeNew}`)

    // Apply the increased font size, width, and height based on original size
    element.style.fontSize = `${fontScale * fontSize}px`;
    element.style.width = `${fontScale * width}px`;
    element.style.height = `${fontScale * height}px`;

    // Adjust margins so the overall size stays the same
    // const marginTopNew = marginTop        - (height * (fontScale - 1) / 2)
    const marginBottomNew = marginBottom  - (height * (fontScale - 1))
    // const marginLeftNew = marginLeft      - (width * (fontScale - 1) / 2)
    const marginRightNew = marginRight    - (width * (fontScale - 1))
    
    // element.style.margin = `${marginTopNew}px ${marginRightNew}px ${marginBottomNew}px ${marginLeftNew}px`;
    element.style.marginBottom = `${marginBottomNew}px`
    element.style.marginRight = `${marginRightNew}px`

    // Apply the counter-scale transform
    element.style.transformOrigin = 'top left'
    element.style.transform = `scale(${inverseScale})`;

    // Render to bitmap
    element.style.willChange = 'transform';

  }
}

/* Pretty rounding */

function roundTo(n: number, rounder: number, decimals: number = 100, roundingFn = Math.round) {

  // Outputs the multiple of `rounder` which is closest to `n`.
  // Use `decimals` set a max number of digits after the period. This is to combat division errors where you get numbers like 0.500000000000003.
  // Use like `roundTo(3.326985, 0.5)`  to get 3.5
  // Use like `roundTo(3.326985, 0.25)` to get 3.25
  // Use like `roundTo(3.326985, 0.1)` to get 3.3
  // Use like `roundTo(3.76, 0.5)`       to get 4.0

  const div = n / rounder
  var round = roundingFn(div)  
  const mult = round * rounder

  const result = mult.toFixed(decimals)

  return result
}

/* Map for Object */

function transformValues(obj: Object, fn: (value: any) => any) {

  // Like map but for object values. 
  //  This is mutating and doesn't return anything. That's why we called it `transform`

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      obj[key] = fn(obj[key])
    }
  }
}

/* Get/set properties in a batch */

function getProps(obj: Object, props: string[]) {

  var result: { [key: string]: any } = {}

  for (const prop of props) {
    result[prop] = obj[prop]
  }
  return result
}

function setProps(obj: Object, props: { [key: string]: any }) {

  for (const key in props) {
    obj[key] = props[key]
  }
}

/* Reset animations
    Src: https://stackoverflow.com/a/45036752/10601702 */

function resetCSSAnimation(el: HTMLElement) {
  el.style.animation = 'none';
  el.offsetHeight; /* trigger reflow */
  el.style.animation = ''; 
}

/* vh and vw 
    src: https://stackoverflow.com/a/44109531 */

function vh() {
  assertClient()
  var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  return h/100;
}

function vw() {
  assertClient()
  var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  return w/100;
}

function vmin() {
  assertClient()
  return Math.min(vh(), vw());
}

function vmax() {
  assertClient()
  return Math.max(vh(), vw());
}

function remInPx() {
  assertClient()
  return parseFloat(getComputedStyle(document.documentElement).fontSize);
}

function assertClient() {
  if (!process.client) {
    const stackTrace = (new Error).stack
    throw new Error(`MMFError: A function was called from the server, but it is client-only.`)
  }
}

function prefersReducedMotion(): boolean {
  // We tried fetching this once when the component is loaded, but that seems to break nuxt SSR prerendering
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

function debouncer(workload: (...args: any[]) => any, timeout: number): (...args: any[]) => void {

  // Returns a function that executes `workload` after `timout` milliseconds. If the function is called again during this timeout period, the timeout will reset.

  var timer: any
  const result = (...args: any[]) => {
    clearTimeout(timer)
    timer = setTimeout(() => workload(...args), timeout)
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

// Gsap optimize

function optimizeOnUpdate(workload: (progress: number) => any) { 

  // - Pass this into gsap Tweens' `onUpdate()`, instead of passing `workload` to the tween directly. This way the `workload` will be limited to being executed once per frame.
  // - We made this to improve the QuoteCard scrolling performance under iOS, to great effect!.
  // - Should probably use this whenever we use `onUpdate()`
  // - this.progress() is some weird gsap magic

  var isTicking = false

  const result = function() {
    if (!isTicking) {
      doBeforeRender(() => {
        const progress = this.progress()
        workload(progress)
        isTicking = false
      })
      isTicking = true
    }
  }

  return result
}

function doAfterRender(workload: () => any, additionalDelay: number = 0.0) {
  // If you pass 0 into setTimeout(), the workload will be executed right after the next render
  setTimeout(workload, additionalDelay)
}
function doBeforeRender(workload: () => any, order: number = 1) {
  if (order > 1) {
    requestAnimationFrame(() => doBeforeRender(workload, order - 1)) 
  } else {
    requestAnimationFrame(workload)
  }
  // requestAnimationFrame() lets you execute code right before the next render, but after styles and layout have already been calculated for the current frame.
  
}

function doAfterRenderrr(workload: () => any, additionalDelay: number = 0.0) {

  // Notes:
  // - Not totally sure what this does. Made for specific use case. Don't generally use this.
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