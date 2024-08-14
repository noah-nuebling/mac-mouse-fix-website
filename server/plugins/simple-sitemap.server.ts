// Note: This tried to solve problem with @nuxtjs/sitemap sitemap generation when we tried to serve both at the server root on macmousefix.com and under the `mac-mouse-fix-website-nuxt` subfolder on github pages. I don't think this is necessary anymore since github pages just redirects to macmousefix.com now.

import { defineNitroPlugin } from 'nitropack/runtime/plugin'
import { CANONICAL_URL, GITHUB_SUB_URL } from "~/utils/constants"

export default defineNitroPlugin((nitroApp) => {

  nitroApp.hooks.hook(/* 'sitemap:resolved' */'sitemap:output', async (ctx) => {
  
  // Plug into @nuxtjs/sitemap, and remove the github subdomain. Otherwise the sitemap will generate urls like macmousefix.com/mac-mouse-fix-website-nuxt/about instead of macmousefix.com/about (where mac-mouse-fix-website-nuxt is the github pages subdoimain)
  const newSitemap = (ctx.sitemap as string).replaceAll(CANONICAL_URL + GITHUB_SUB_URL, CANONICAL_URL )
  ctx.sitemap = newSitemap

  console.log('sitemap:resolve ran');

    // // single sitemap example - just add the url directly
    // ctx.urls.push({
    //   loc: '/my-secret-url',
    //   changefreq: 'daily',
    //   priority: 0.8,
    // })
    // // multi sitemap example - filter for a sitemap name
    // if (ctx.sitemapName === 'posts') {
    //   ctx.urls.push({
    //     loc: '/posts/my-post',
    //     changefreq: 'daily',
    //     priority: 0.8,
    //   })
    // }
  })
})