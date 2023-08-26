
export default (curve: (arg0: number) => number) => {

  const iterations = 10
  const start = 0.0
  const end = 1.0

  const stride = end - start

  var result: Array<[number, number]> = []

  for (var i = 0; i < iterations; i++) {

    const input = (i / (iterations-1)) * stride + start
    const output = curve(input)
    
    result.push([input, output])
  }

  console.log(`Trace: ${result}`)
}