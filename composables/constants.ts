
/* Plcace for constant global variables. If you need variablility / reactivity store/global.ts is the place. */

export function useConstants() {
  
  const breakpoints =  {
    // Screenwidth where responsive layout changes.
    // ! Keep this in sync with tailwind.config.js
    lg: 1440,
    md: 1068,
    sm: 734,
    xs: 375,
  }

  // Base size of 100vw and 100vh we used during development
  const base = {
    width: 1920,
    height: 975 // 1080 - toolbarHeight. it's 975 in Safari and 970 in Chrome
  }


  return { breakpoints, base }
}