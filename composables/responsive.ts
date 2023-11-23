
export function useResponsive() {


  const breakpoints =  {
    // Screenwidth where responsive layout changes.
    // ! Keep this in sync with tailwind.config.js
    lg: 1440,
    md: 1068,
    sm: 734,
    xs: 375,
  }
  enum ResponsiveSize {
    none = -1,
    xl = Number.MAX_VALUE,
    lg = breakpoints.lg,
    md = breakpoints.md,
    sm = breakpoints.sm,
    xs = breakpoints.xs
  }

  var currentSize = ref<ResponsiveSize>(ResponsiveSize.none)

  function updateSize() {

    if (!process.client) { return }
    
    var result: ResponsiveSize
    const w = window.innerWidth
    if (w <= breakpoints.xs) { result = ResponsiveSize.xs }
    else if (w <= breakpoints.sm) { result = ResponsiveSize.sm }
    else if (w <= breakpoints.md) { result = ResponsiveSize.md }
    else if (w <= breakpoints.lg) { result = ResponsiveSize.lg }
    else { result = ResponsiveSize.xl }

    currentSize.value = result
  }

  updateSize()

  onMounted(() => {
    window.addEventListener('resize', updateSize)
  })
  onUnmounted(() => {
    window.removeEventListener('resize', updateSize)
  })


  return { ResponsiveSize, currentSize }
}