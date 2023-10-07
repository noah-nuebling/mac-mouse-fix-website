export { type Interval, unitInterval, inverseUnitInterval, multiplyIntervals, intervalScale }

import { strict as assert } from "assert";

type Interval = { start: number, end: number }

const unitInterval = { start: 0.0, end: 1.0 }
const inverseUnitInterval = { start: 1.0, end: 0.0 }

function intervalScale(value: number, originInterval: Interval, destinationInterval: Interval): number {

  // assert((originInterval.start <= value && value <= originInterval.end) || (originInterval.end <= value && value <= originInterval.start), `Interval scaling assertion failed. Value is not in origin interval. Value: ${ value }, originInterval: (${ originInterval.start }, ${ originInterval.end }), destinationInterval: (${ destinationInterval.start }, ${ destinationInterval.end })`);

  const unit = (value - originInterval.start) / (originInterval.end - originInterval.start)
  const result = unit * (destinationInterval.end - destinationInterval.start) + destinationInterval.start

  return result
}

function intervalMax(interval: Interval): number {
  return interval.start > interval.end ? interval.start : interval.end
}
function intervalMin(interval: Interval): number {
  return interval.start < interval.end ? interval.start : interval.end
}

function intervalIsInverted(interval: Interval): Boolean {
  return interval.start != intervalMin(interval)
}

function multiplyIntervals(interval1: Interval, interval2: Interval): Interval {
  
  const min = intervalMin(interval1) * intervalMin(interval2)
  const max = intervalMax(interval1) * intervalMax(interval2)
  
  const invert = intervalIsInverted(interval1) != intervalIsInverted(interval2)

  if (!invert) {
    return { start: min, end: max }
  } else {
    return { start: max, end: min }
  } 
}