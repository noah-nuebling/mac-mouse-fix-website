
export function useScrollCallbacks() {

  function onScrollStop(callback: () => any) {
    
    if (!process.client) { return }

    const haltedFrameThreshold = 3
    var lastScrollY = window.scrollY
    var frameCount = 0
    var haltedFrameCount = 0

    function checkStopLoop() {

      const scrollY = window.scrollY
      const d = scrollY - lastScrollY
      lastScrollY = scrollY

      if (d == 0) {
        haltedFrameCount += 1
      } else {
        haltedFrameCount = 0
      }
      frameCount += 1

      if (haltedFrameCount >= haltedFrameThreshold) {
        console.log(`onScrollStop - callback called after ${ frameCount } frames`)
        callback()
      } else {
        requestAnimationFrame(() => checkStopLoop())  
      }
    }

    checkStopLoop()    
  }


  return { onScrollStop }
}