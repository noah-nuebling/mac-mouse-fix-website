
// This function takes as input an animation curve for the center of an element, and a separate animation curve for the size of the element. 
// It outputs an animation curve for the start of the element which makes the element move equivalently as if we were animating the center of the element with the curve from the function arguments.
// We use this to animate the top and the left css properties while controlling where the center of the element is during the animation. We need this because we can't animate the center of the element directly afaik.


export default main

function main(curveForCenter: (arg0: number) => number, 
              startValueForCenter: number, 
              endValueForCenter: number, 
              curveForSize: (arg0: number) => number, 
              startValueForSize: number, 
              endValueForSize: number) {

  const centerStride = endValueForCenter - startValueForCenter
  const sizeStride = endValueForSize - startValueForSize

  var rawCurveForStart = (arg0: number) => {
    const center = curveForCenter(arg0) * centerStride + startValueForCenter
    const size = curveForSize(arg0) * sizeStride + startValueForSize
    const start = center - size/2.0
    return start
  }

  const startValueForStart = rawCurveForStart(0.0)
  const endValueForStart = rawCurveForStart(1.0)
  const startStride = endValueForStart - startValueForStart

  const unitCurveForStart = (arg0: number) => {
    return (rawCurveForStart(arg0) - startValueForStart) / startStride
  }

  return {
    curveForStart: unitCurveForStart,
    startValueForStart: startValueForStart,
    endValueForStart: endValueForStart,
  }
}
