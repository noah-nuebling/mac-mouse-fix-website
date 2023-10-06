import { strict as assert } from "assert";

export default intervalScale
export { unitInterval, inverseUnitInterval }

const unitInterval = { start: 0.0, end: 1.0 }
const inverseUnitInterval = { start: 1.0, end: 0.0 }

function intervalScale(value: number, originInterval: { start: number, end: number }, destinationInterval: { start: number, end: number }): number {

  assert((originInterval.start <= value && value <= originInterval.end) || (originInterval.end <= value && value <= originInterval.start), `Interval scaling assertion failed. Value is not in origin interval. Value: ${ value }, originInterval: (${ originInterval.start }, ${ originInterval.end }), destinationInterval: (${ destinationInterval.start }, ${ destinationInterval.end })`);

  const unit = (value - originInterval.start) / (originInterval.end - originInterval.start)
  const result = unit * (destinationInterval.end - destinationInterval.start) + destinationInterval.start

  return result
}