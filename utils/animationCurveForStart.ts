export { type AnimationCurve, type Curve, type Ease, rawCurveFromAnimationCurve, combineCurves, transfromCurve, animationCurveFromRawCurve }

import { strict as assert } from 'assert'
import { Interval, intervalScale } from './intervalScale'

///
/// Types & Constants
///

// Note: We don't need a general `Curve` type with inputDomain and outputDomain, because the inputDomain is always [0, 1] for any curves that we want to work with.

// type Curve = { inputDomain: Interval, outputRange: Interval, unit: RawCurve }

type AnimationCurve = { outputRange: Interval, ease: Ease }
type Curve = (arg0: number) => number
type Ease = Curve // Ease should always go through (0,0) and (1,1)

///
/// Convenience
///



/// 
/// Core
///

function transfromCurve(curve: Curve, transform: (arg0: number) => number) {
  
  // Applies `transform` to each output value

  const transformed = (arg0: number) => {
    const a = curve(arg0)
    const result = transform(a)
    return result
  }

  return transformed
}

function combineCurves(curve1: Curve, curve2: Curve, transform: (output1: number, output2: number) => number): Curve {

  const combined = (arg0: number) => {
    const a = curve1(arg0)
    const b = curve2(arg0)
    const result = transform(a, b)
    return result
  }

  return combined
}

///
/// Helper
///

function sample(arg0: AnimationCurve, t: number): number {
  
  const a = arg0.ease(t)
  const b = intervalScale(a, unitInterval, arg0.outputRange)
  
  return b
}

function animationCurveFromRawCurve(rawCurve: Curve): AnimationCurve {

  // Find outputRange
  // This isn't the actual output range in the maths sense, since there can be smaller and greater values in rawCurve(0.0...1.0)
  const outputRange = { start: rawCurve(0.0), end: rawCurve(1.0) }

  // Catch case when there is no animation
  //  Otherwise there can be NaNs generated
  if (outputRange.start == outputRange.end) {
    return { outputRange: outputRange, ease: (x) => x }
  }

  // Find unitCurve which goes through (0,0) and (1,1)
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

///
/// Unused
///

// Calling transfromAnimationCurve and combineAnimationCurves repeatedly was too slow.
// Instead: First call rawCurveFromAnimationCurve, then call transformCurve and combineCurves repeatedly, lastly call animationCurveFromRawCurve.

function transfromAnimationCurve(curve: AnimationCurve, transform: (arg0: number) => number) {
  
  // Applies `transform` to each output value

  const rawCurve = (arg0: number) => {
    const a = sample(curve, arg0)
    const result = transform(a)
    return result
  }

  const result = animationCurveFromRawCurve(rawCurve)

  return result
}

function combineAnimationCurves(curve1: AnimationCurve, curve2: AnimationCurve, transform: (output1: number, output2: number) => number): Curve {
  
  // Applies `transform` to each pair of output values of both curves

  const rawCurve = (arg0: number) => {
    const a = sample(curve1, arg0)
    const b = sample(curve2, arg0)
    const result = transform(a, b)
    return result
  }

  const result = animationCurveFromRawCurve(rawCurve)

  return result
}