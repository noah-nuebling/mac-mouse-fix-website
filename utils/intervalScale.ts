import { strict as assert } from "assert";

export default intervalScale
export { unitInterval, inverseUnitInterval, multiplyIntervals }

const unitInterval = { start: 0.0, end: 1.0 }
const inverseUnitInterval = { start: 1.0, end: 0.0 }

function intervalScale(value: number, originInterval: { start: number, end: number }, destinationInterval: { start: number, end: number }): number {

  // assert((originInterval.start <= value && value <= originInterval.end) || (originInterval.end <= value && value <= originInterval.start), `Interval scaling assertion failed. Value is not in origin interval. Value: ${ value }, originInterval: (${ originInterval.start }, ${ originInterval.end }), destinationInterval: (${ destinationInterval.start }, ${ destinationInterval.end })`);

  const unit = (value - originInterval.start) / (originInterval.end - originInterval.start)
  const result = unit * (destinationInterval.end - destinationInterval.start) + destinationInterval.start

  return result
}

function intervalMax(interval: { start: number, end: number }): number {
  return interval.start > interval.end ? interval.start : interval.end
}
function intervalMin(interval: { start: number, end: number }): number {
  return interval.start < interval.end ? interval.start : interval.end
}

function intervalIsInverted(interval: { start: number, end: number }): Boolean {
  return interval.start != intervalMin(interval)
}

function multiplyIntervals(interval1: { start: number, end: number }, interval2: { start: number, end: number }): { start: number, end: number } {
  
  const min = intervalMin(interval1) * intervalMin(interval2)
  const max = intervalMax(interval1) * intervalMax(interval2)
  
  const invert = intervalIsInverted(interval1) != intervalIsInverted(interval2)

  if (!invert) {
    return { start: min, end: max}
  } else {
    return { start: max, end: min}
  } 
}