
import md from 'markdown-it' // We used to import 'md' here and it seemed to work the same.

var didSetup = false
var i18n: any
var renderer: any

function _setup() {

  // Get i18n and markdown-it
  //  Think we need to do this again even though it's already done in the plugins, because the plugins are only loaded later.
  if (!didSetup) {
    renderer = md({
      html: true, // Our lang files don't allow inline html for some reason iirc
      breaks: true
    })
    didSetup = true
  }
}

export function useMT() {

  // Setup
  //  Note: need to call useI18n() here, not in _setup(), otherwise the prerender will have the same language for all pages. Not sure why.

  _setup()
  i18n = useI18n()

  // Define mt
  function mt(key: string, values?: Object | Array<string>, inline: boolean = true): string {

    const translation = i18n.t(key, values)
  
    var result = inline ? renderer.renderInline(translation) : renderer.render(translation)
    
    return result

}

  // Return mt
  return mt
}