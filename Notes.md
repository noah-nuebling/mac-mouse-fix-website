# Notes

Project is based on [this Nuxt tutorial series](https://www.youtube.com/watch?v=ovJfnoqUBk8&list=PL4cUxeGkcC9haQlqdCQyYmL_27TesCGPC&index=3)
- We diverged from the tutorial at episode #12 - Server Routes, because we want to use SSG and deploy on gh pages instead of using SSR

- Type vbase and choose auto completion for **snippets** from Vue VSCode Snippets plugin

See example of apple website with card with play button [here](assets/notes/apple-card-play-button.png)
Expanding card code example: https://greensock.com/forums/topic/21050-expanding-card-on-click/


--- 

## Pricing (Not sure this belongs here)

- These guys sell books and say that 1.99 is a less common and worse price than 2.99. https://www.kdpcommunity.com/s/question/0D5f400000FHOPbCAP/dropping-price-from-299-to-199-effective?language=en_US
- I feel like 1.99 is weird now. I think I picked it as the lowest price that I could likely sustain myself with. But I think 1, 3, 5, 10 feel much better as price points.
- Magnet price history: https://appsliced.co/app?n=window-magnet

## Optimization

- **Videos**: We're doing this trick where we set the video's src to '' and then load them to clear them from the ram after the user closes a feature card. Otherwise all the videos make the browsers crash after opening a few feature cards. Videos seem to be loaded by the browser on-demand as the user plays them, so we don't need further optimization there. But it's probably good to export the videos in a compressed, web-friendly format.
  - Edit: ^^^ This is true for chrome. Under Safari, it does seem to currently load all the videos at once or sth, making it transfer over 100 MB on initial page load. But this doesn't make loading slower, and I assume it wouldn't do this on data saver mode. So it should be fine. Edit: It still seems to do this on datasaver mode and on iOS Safari from my limited testing. So we REALLY need lazy-loading. Edit: Implemented lazy loading now. Seems to work fine. Data transfer on page load in Safari is now acceptable size.
- **Images**: We're (currently trying to) using @nuxt/img to compress the images automatically. Currently, the 4 large images that we have on the site (MMF Icon, Action Table Image, and three "color splash" images) make up the vast majority of the data transferred on load - which is currently about 15 or 20 MB (youtube and reddit both have sub 5 MB). So if we compress those images, the payload size should be ok.
  - I'm confused where to put the images. `public` or `assets/img`. Docs are confusing. See: https://github.com/nuxt/image/discussions/1128
  - @nuxt/image is intended for you to specify the intended image size for different responsive breakpoints and device pixel densities and then it autogenerates images at all the optimal resolutions. However this lead to problems and there was buggyness, and was confusing and I'm tired and our images were already small enough, so we're not really using that stuff. Only using the `sizes` attribute on the mmf-icon NuxtImg to scale it down.
  - In Safari devtools it loaded images we reused for several <img> tags, once for each img tag, making the payload size much larger. But I found it only does this after force-reloading the site. When you normally load the site after clearing the cache, re-used images are only transferred once. This doesn't seem to be the case for videos however, but we don't want to reuse videos anyways.
- **Loading times**: After the initial load, we need to wait for page hydration, so that the intro animation works, before we enable scrolling. This currently takes like a second and is about as fast as the youtube homepage. I think it's ok.

---

## Content

- Line length/line width and readability: https://baymard.com/blog/line-length-readability
  - The site says line length should be between 50-60 or 50 - 80 chars, according to most sources. 
  - Upper bound for Korean, Chinese, Japanese should be 40 chars instead of 80
  - Max in CSS: 70ch or 34em according to this site
  - Measurements on this site:
    - We measured 80 chars at font-size:18px to be 656px - thats *36em*. Scaling this down:
    - 50 chars -> 22.5em
    - 60 chars -> 27em
    - 65 chars -> 30em
    - 70 chars -> 31.5em
    - 80 chars -> 36em
    - -> As a simplified rule: use 30em as base line length, adjust +-7.5em to taste --- I think we can use same for Korean, Japanese, Chinese.
- Readablity scores: https://readabilityformulas.com/readability-scoring-system.php#formulaResults
  - Word length and sentence length are the most important factors

---

## Implementation

**Best practices**
- [ ] [Tailwind CSS tutorial series](https://www.youtube.com/watch?v=bxmDnn7lrnk&list=PL4cUxeGkcC9gpXORlEHjc5bgnIi5HEGhw&index=1)
- [ ] Read: https://tailwindcss.com/docs/reusing-styles

**i18n**
- [ ] nuxt i18n tutorial: https://phrase.com/blog/posts/nuxt-js-tutorial-i18n/
- [ ] nuxt i18n docs: https://i18n.nuxtjs.org/setup/ (I think these are the up-to-date docs: https://vue-i18n.intlify.dev/guide/)
- Language tags: https://www.techonthenet.com/js/language_tags.php
  -> Apple calls the language tags 'languageIDs'. Vue calls them 'locales'. It's all the same thing. See the `mflocales.py` notes for more info.
- Also see: https://github.com/noah-nuebling/github-actions-test/blob/main/Readme-Meta.md (Or the equivalent in the MMF repo once we move the acknowledgements there)

Plan: Use standard i18n framework and put markdown parser around i18n calls. Put markdown files directly in the de.js en.js, etc files. (You can use multiline strings with `` in js) Using markdown files like in Feedback Assistant would be too cumbersome to integrate with internationalization. (In Feedback Assistant the internationalization was totally custom js implementation).

**Animations**
- https://github.com/topics/nuxt-animations ([anime.js](https://animejs.com/) and [gsap](https://greensock.com/gsap/))
  - gsap seems to be more widely used and you can find more examples on Google. Heres an example for expanding card: https://greensock.com/forums/topic/21050-expanding-card-on-click/
- https://vuejs.org/guide/built-ins/transition.html
- gsap seems to have much better support for scroll-linked animation than animejs. see https://greensock.com/docs/v3/Plugins/ScrollTrigger vs https://codepen.io/equinusocio/pen/GeBxJz
  - -> Will use gsap
- gsap + nuxt examples: https://stackblitz.com/@GreenSockLearning/collections/gsap-nuxtjs-starters
- Integrating gsap with nuxt: 
  - https://greensock.com/forums/topic/35443-nuxt-3-setup-with-plugins/
  - https://github.com/hypernym-studio/nuxt-gsap

**Inspiratio**

- https://www.apple.com/by/apple-watch-series-7/
- https://pasteapp.io/
- See [noteplan](<noteplan://x-callback-url/openNote?noteTitle=MMF - Inspiration>)

---

# Notes (From nuxt tutorial project which was the basis of this)

## Package Manager
We're using **pnpm** as package manager. Apparently it's better than npm and yarn (src: https://refine.dev/blog/pnpm-vs-npm-and-yarn/#conclusion) and you can still easily migrate package managers later. 

## Tech stack

- nuxt
- typescript
- Tailwind CSS (everyone seems to be using that)
- pnpm package manager

## Rendering Markdown

Astro: https://docs.astro.build/en/guides/markdown-content/
Nuxt: https://content.nuxtjs.org/guide/writing/markdown
Vue: (No official article)

## UI Framework

-> Decision: nuxt. It's like Vue but with some QoL improvements and SSG. I'm already familiar with Vue and it's the most liked of the 3 React, Angular, Vue frameworks. Astro seems nice but is too new for me to bet on. Astro template library is nice but I think I will only use templates for inspiration and maybe some copy-pasting, and there are pretty nice templates all over the web.

- nuxt
  - Nice, built on Vue, which I'm familiar with
- astro
  - Pretty new, awesome selection of free project templates/themes, can use Vue (Idk what that means)
  - Built at lightspeed has templates for all frameworks, including vue. But they seem worse and cost more from what I've seen. 

## Vue vs Nuxt

See [comparison article](https://www.bornfight.com/blog/nuxt-js-over-vue-js-when-should-you-use-it-and-why/?utm_source=Medium&utm_medium=social&utm_campaign=blog_b_2020&utm_term=svjetlicic_Nuxt.jsOverVue.js)

Pro Nuxt:
- SEO improvement (through server-side rendering (SSR), which we can't do hosting on GitHub I believe)
- "Faster development" with the auto-generic router, public share features, etc.

Pro Vue:
- "Developing your first Nuxt.js project will surely be confusing and complex at first, especially if you have Vue.js background without SSR knowledge"

See [this Vue artile on SSR](https://vuejs.org/guide/scaling-up/ssr.html#cross-request-state-pollution)
- When there is no user-specific content, you want to use Static Site Generation (SSG) instead of SSR. 
- This site was built with [VitePress](https://vitepress.dev/)
- Other mentioned SSG frameworks: Nuxt and Astro
- **"As of now, Google and Bing can index synchronous JavaScript applications just fine."**
  - Buttt I heard on reddit that social media crawlers which create e.g. link preview snippets on twitter, don't usually support javascript. So static should still be better.

See [Nuxt docs on SSG](https://v2.nuxt.com/docs/concepts/static-site-generation/)

See [Vue text on using SSG with Vue](https://vuejs.org/guide/extras/ways-of-using-vue.html#jamstack-ssg)
- We should use multi-page SSG instead of single-page SSG

## How to create static site (SSG)

[FreeCode Camp Tutorial](https://www.freecodecamp.org/news/how-to-generate-a-static-website-with-vue-js-in-no-time-e74e7073b7b8/)
- They use nuxt

I've seen mentioned:
- nuxt
  - Seems nice
- astro
  - Seems nice
- vue + VitePress
  - VitePress seems restrictve, and focused on documentation / blogs, but not sure
- vue + vite-ssg 
  - not very popular, so not sure if good

## Vue/Nuxt Quick Start Guide

Vue: https://vuejs.org/guide/quick-start.html#creating-a-vue-application

Nuxt: https://nuxt.com/docs/getting-started/installation
