# Notes

Project is based on [this Nuxt tutorial series](https://www.youtube.com/watch?v=ovJfnoqUBk8&list=PL4cUxeGkcC9haQlqdCQyYmL_27TesCGPC&index=3)
- We diverged from the tutorial at episode #12 - Server Routes, because we want to use SSG and deploy on gh pages instead of using SSR

- Type vbase and choose auto completion for **snippets** from Vue VSCode Snippets plugin

---

**Best practices**
- [ ] [Tailwind CSS tutorial series](https://www.youtube.com/watch?v=bxmDnn7lrnk&list=PL4cUxeGkcC9gpXORlEHjc5bgnIi5HEGhw&index=1)
- [ ] Read: https://tailwindcss.com/docs/reusing-styles

**i18n**
- [ ] nuxt i18n tutorial: https://phrase.com/blog/posts/nuxt-js-tutorial-i18n/

**Animations**
- https://github.com/topics/nuxt-animations ([anime.js](https://animejs.com/) and [gsap](https://greensock.com/gsap/))
  - gsap seems to be more widely used and you can find more examples on Google. Heres an example for expanding card: https://greensock.com/forums/topic/21050-expanding-card-on-click/
- https://vuejs.org/guide/built-ins/transition.html
- gsap seems to have much better support for scroll-linked animation than animejs. see https://greensock.com/docs/v3/Plugins/ScrollTrigger vs https://codepen.io/equinusocio/pen/GeBxJz
  - -> Will use gsap
- gsap + nuxt examples: https://stackblitz.com/@GreenSockLearning/collections/gsap-nuxtjs-starters

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
