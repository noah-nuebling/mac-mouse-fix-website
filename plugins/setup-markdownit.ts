// Currently unused. We instead create the md renderer in markdownTranslate.ts. Update: Now in setup-cool-i18n.ts
// This globally imports and registers markdownit
// See: https://github.com/nuxt-community/markdownit-module/issues/47#issuecomment-1453684664


import type MarkdownIt from 'markdown-it'
import md from 'markdown-it'
import { defineNuxtPlugin } from "nuxt/app"

export default defineNuxtPlugin(nuxtApp => {

  // const renderer = md()
  // renderer.use(openLinkInNewTab)

  // return {
  //   provide: { md: renderer }
  // }
})