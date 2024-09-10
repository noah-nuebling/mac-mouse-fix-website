export { criticalSpring, spring, linearScalingEase, linearFadingEase, customInOutEase };

import { animationCurveFromRawCurve } from "./animationCurveTransform";


/* Custom inOut ease 
  Created with this: https://gsap.com/docs/v3/Eases/
*/
function customInOutEase(): any {
  const { $CustomEase } = useNuxtApp(); /// Not sure it's bad for performance that we don't cache this? But if we call useNuxtApp() at top level of this file we get errors.
  const result = $CustomEase.create("custom", "M0,0 C0,0 -0.047,0 0,0 0.027,0 0.105,0.011 0.178,0.113 0.258,0.225 0.288,0.343 0.34,0.481 0.388,0.609 0.458,0.874 0.581,0.948 0.685,1.01 1,1 1,1 1,1 1,1 1,1 1,1 1,1 1,1 1.056,1 1,1 1,1");
  return result;
}

/*   
  Logarithmic easing for linear feeling scale animations
*/

function linearFadingEase(a: number) {
  
  // See https://www.desmos.com/calculator/hou11kpoqj
  // Update: (August 2024) I have no idea what the idea behind this is or what to set `a` to.

  if (a == 0) {
    return (x: number) => x
  }

  const c = -Math.exp(-a)+1
  const f = (x: number) => Math.log(-x*c + 1)/-a
  const rawCurve = f

  console.debug(`linearFadingEase: ${ Math.pow(-Math.E, -a*0.1) }`)

  const animationCurve = animationCurveFromRawCurve(rawCurve)
  return animationCurve.ease
}

function linearScalingEase(scalingFactor: number) {
  const rawCurve = (y: number) => Math.pow(scalingFactor, y)
  const animationCurve = animationCurveFromRawCurve(rawCurve)
  return animationCurve.ease
}

/*   
  Easing for gsap that feels like critically damped spring. 
  */

function criticalSpring(x: number) {
  
  /// Old implementation
  // return "elastic.out(0.001, 1.0)" // First arg is amplitude, values < 1 are mapped to 1
  
  // New implementation
  const result = spring(x, 1.0)

  // Return 
  return result
} 

function spring(l: number, f: number) {
  /*
  l: decay rate (If this is higher, the initial speed is higher)
  f: damping ratio (1.0 for critical damping)
  Source: https://www.desmos.com/calculator/hqwftl0dwj
  */
 
  // Validate params
  console.assert(l > 0.0, "Decay rate must be > 0.0")
  console.assert(f > 0.0 && f <= 1.0, "Damping ratio must > 0.0 and <= 1.0")

  // Define curve params
  const A = 1.0
  const p = 0.0
  const w = Math.sqrt((l*l - f*f*l*l)/(f*f));

  // Create curve with params
  const s = _spring(l, w, A, p)

  // Flip the curve, so it starts at 0 and goes towards 1
  const h = (t: number) => 1 - s(t)

  // Scale the curve, so it goes through (0,0) and (1,1) exactly
  const scalar = 1/h(1)
  const g = (t: number) => h(t) * scalar

  // Return
  return g
}

function _spring(l: number, w: number, A: number, p: number): (arg0: number) => number {
  /* 
  l: decay rate 
  w: angular frequency
  A: initial amplitude
  p: phase angle at t=0
  Source: https://en.wikipedia.org/wiki/Damping
  */
  return (t: number) => A * Math.pow(Math.E, -l * t) * Math.cos(w * t - p)
}

/* 

  Implementation for the gsap-native elastic easing. It's also spring easing but the parameters are weird and idk how to get critical damping with it:

_configElastic = function _configElastic(type, amplitude, period) {
  var p1 = amplitude >= 1 ? amplitude : 1,
  //note: if amplitude is < 1, we simply adjust the period for a more natural feel. Otherwise the math doesn't work right and the curve starts at 1.
  p2 = (period || (type ? .3 : .45)) / (amplitude < 1 ? amplitude : 1),
  p3 = p2 / _2PI * (Math.asin(1 / p1) || 0),
  easeOut = function easeOut(p) {
    return p === 1 ? 1 : p1 * Math.pow(2, -10 * p) * _sin((p - p3) * p2) + 1;
  },
  ease = type === "out" ? easeOut : type === "in" ? function (p) {
    return 1 - easeOut(1 - p);
  } : _easeInOutFromOut(easeOut);
  
  p2 = _2PI / p2; //precalculate to optimize
  
  ease.config = function (amplitude, period) {
    return _configElastic(type, amplitude, period);
  };
  
  return ease;
}, 

*/