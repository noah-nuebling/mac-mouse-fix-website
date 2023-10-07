export { type AnimationCurve, type Ease, animationCurveForStart }

import { strict as assert } from 'assert'
import { Interval, intervalScale } from './intervalScale'

///
/// Types & Constants
///

// type Curve = { domain: Interval, range: Interval, unit: RawCurve }
type AnimationCurve = { outputRange: Interval, ease: Ease }
type Curve = (arg0: number) => number
type Ease = Curve // Ease should always go through (0,0) and (1,1)

///
/// Main
///

function animationCurveForStart(curveForCenter: AnimationCurve, curveForSize: AnimationCurve): AnimationCurve {

  // This function takes as input an animation curve for the center of an element, and a separate animation curve for the size of the element. 
  // It outputs an animation curve for the start of the element which makes the element move equivalently as if we were animating the center of the element with the curve from the function arguments.
  // We use this to animate the top and the left css properties while controlling where the center of the element is during the animation. We need this because we can't animate the center of the element directly afaik.
  // Edit: Now we're using transforms instead of top and left, and we could animate the center directly, but we'll keep doing this because it's cool

  var rawCurveForStart = (arg0: number) => {
    const center = sample(curveForCenter, arg0)
    const size = sample(curveForSize, arg0)
    const start = center - size/2.0
    return start
  }

  const result = animationCurveFromRawCurve(rawCurveForStart)

  return result
}

///
/// Helper
///

function sample(arg0: AnimationCurve, at: number) {
  return intervalScale(at, unitInterval, arg0.outputRange)
}

function animationCurveFromRawCurve(rawCurve: Curve): AnimationCurve {

  // Find outputRange
  // This isn't the actual output range in the maths sense, since there can be smaller and greater values in rawCurve(inputDomain.start...inputDomain.end)
  const outputRange = { start: rawCurve(0.0), end: rawCurve(1.0) }

  // Find unitCurve
  const unitCurve = (arg0: number) => {
    const b = rawCurve(arg0)
    const c = intervalScale(b, outputRange, unitInterval)
    return c
  }

  // Return AnimationCurve
  return { outputRange: outputRange, ease: unitCurve }
}

function rawCurveFromAnimationCurve(animationCurve: AnimationCurve): Curve {

  // Probably won't use this? I think it's usually easier to just sample the animation curve directly.
  
  // Find Curve
  const curve = (arg0: number) => {
    const b = sample(animationCurve, arg0)
    return b
  }

  // Return curve
  return curve
}