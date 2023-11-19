
export default defineNuxtPlugin((nuxtApp) => {

  if (process.client) {

    const userAgent = window.navigator.userAgent.toLowerCase()

    const isSafari = userAgent.includes('safari') && !userAgent.includes('chrome')
    const isChromium = userAgent.includes('chrome')
    const isFirefox = userAgent.includes('firefox')

    var classes: string[] = []
    if (isSafari) classes.push('safari')
    if (isChromium) classes.push('chromium')
    if (isFirefox) classes.push('firefox')


    document.body.classList.add(...classes)
  }
})