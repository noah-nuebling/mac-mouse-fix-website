
export default (curve: (arg0: number) => number) => {

  const iterations = 11
  const start = 0.0
  const end = 1.0

  const stride = end - start

  var trace: Array<{ x: number, y: number }> = []

  // Trace

  for (var i = 0; i < iterations; i++) {

    const input = (i / (iterations-1)) * stride + start
    const output = curve(input)
    
    trace.push({ x: input, y: output})
  }
  
  // Convert to string

  var result = ""

  for (var point of trace) {
    if (point != trace[0]) {
      result += ', '
    }
    result += `(${ point.x }, ${ point.y })`
  }

  // Return

  return result
}