
import { defineNuxtPlugin } from "nuxt/app"

export default defineNuxtPlugin((nuxtApp) => {
  
  if (process.client) {

    const userAgent = window.navigator.userAgent.toLowerCase()

    // Check isMobile

    const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);

    if (isMobile) {
      document.body.classList.add('mobile')
    }

    // Check browser

    const isSafari = userAgent.includes('safari') && !userAgent.includes('chrome')
    const isChromium = userAgent.includes('chrome')
    const isFirefox = userAgent.includes('firefox')

    var classes: string[] = []
    if (isSafari) classes.push('safari')
    if (isChromium) classes.push('chromium')
    if (isFirefox) classes.push('firefox')

    document.body.classList.add(...classes)
  }

  function documentHasClass(className: string) {
    if (process.client) {
      return document.body.classList.contains(className)
    }
    return false
  }
  const isMobile = documentHasClass('mobile')
  const isSafari = documentHasClass('safari')
  const isChromium = documentHasClass('chromium')
  const isFirefox = documentHasClass('firefox')

  return {
    provide: {
      isMobile,
      isSafari,
      isChromium,
      isFirefox
    }
  }
})