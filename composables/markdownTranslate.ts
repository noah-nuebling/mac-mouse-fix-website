
import md from 'markdown-it' // We used to import 'md' here and it seemed to work the same.


// export { $mt, $mto }

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

export function useMT() {

  _setup()

  // Define mt
  function mt(key: string, values?: Object | Array<string>): string {

    // Get result
    const translation = i18n.t(key, values)
    const result = renderer.renderInline(translation)

    if (key == 'navbar.github') {
      console.log(`uiStringForQuoteSource - src:${ key }, result: ${ result }`);
    }

    // Return
    return result
  }

  // Return mt
  return mt
}


function $mto(key: string, values?: Object | Array<string>): string {

  // Render not-inline (aka "**o**ut of line")
  // Notes: 
  // - We tried to use this to create numbered lists, because renderInline doesn't create html lists, but that lead to weird rendering errors, so this is unused at the time of writing.

  _setup()

  // Get result
  const result = renderer.render(i18n.t(key, values))

  // Return
  return result
}