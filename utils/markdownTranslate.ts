
import md from 'markdown-it'

export { $mt, $mto}

var didSetup = false
var i18n: any
var renderer: any

function _setup() {

  // Get i18n and markdown-it
  //  Think we need to do this again even though it's already done in the plugins, because the plugins are only loaded later.
  if (!didSetup) {
    i18n = useI18n()
    renderer = md()
    didSetup = true
  }
}


function $mt(key: string): string {

  _setup()

  // Get result
  const result = renderer.renderInline(i18n.t(key))

  // Return
  return result
}


function $mto(key: string): string {

  // Render not-inline (aka "**o**ut of line")
  // Notes: 
  // - We tried to use this to create numbered lists, because renderInline doesn't create html lists, but that lead to weird rendering errors, so this is unused at the time of writing.

  _setup()

  // Get result
  const result = renderer.render(i18n.t(key))

  // Return
  return result
}