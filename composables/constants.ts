
export function useConstants() {
  
  const breakpoints =  {
    // ! Keep this in sync with tailwind.config.js
    lg: 1440,
    md: 1068,
    sm: 734,
    xs: 375,
  }
  return { breakpoints }
}