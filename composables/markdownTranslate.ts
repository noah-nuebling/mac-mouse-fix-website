
import md from 'markdown-it' // We used to import 'md' here and it seemed to work the same.

var didSetup = false
var i18n: any
var renderer: any

function _setup() {

  // Get i18n and markdown-it
  //  Think we need to do this again even though it's already done in the plugins, because the plugins are only loaded later.
  if (!didSetup) {
    renderer = md()
    didSetup = true
  }
}

export function useMT() {

  // Setup
  //  Note: need to call useI18n() here, not in _setup(), otherwise the prerender will have the same language for all pages. Not sure why.

  _setup()
  i18n = useI18n()

  // Define mt
  function mt(key: string, values?: Object | Array<string>): string {

    // Get result
    const translation = i18n.t(key, values)
    const result = renderer.renderInline(translation)

    // Return
    return result
  }

  // Return mt
  return mt
}


function $mto(key: string, values?: Object | Array<string>): string {

  // UNUSED
  // Render not-inline (aka "**o**ut of line")
  // Notes: 
  // - We tried to use this to create numbered lists, because renderInline doesn't create html lists, but that lead to weird rendering errors, so this is unused at the time of writing.

  _setup()

  // Get result
  const result = renderer.render(i18n.t(key, values))

  // Return
  return result
}