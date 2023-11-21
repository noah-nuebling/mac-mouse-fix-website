
/* Plcace for constant global variables. If you need variablility / reactivity store/global.ts is the place. */

export function useConstants() {

  // Base size of 100vw and 100vh we used during development
  const base = {
    width: 1920,
    height: 975 // 1080 - toolbarHeight. it's 975 in Safari and 970 in Chrome
  }


  return { base }
}