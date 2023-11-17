
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
    height: 1080
  }


  return { breakpoints, base }
}