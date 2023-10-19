
import md from 'markdown-it'

export { $mt }

function $mt(key: string): string {

  // Get i18n and markdown-it
  //  Think we need to do this again even though it's already done in the plugins, because the plugins are only loaded later.
  const i18n = useI18n()
  const renderer = md()

  // Get result
  const result = renderer.renderInline(i18n.t(key))

  // Return
  return result
}