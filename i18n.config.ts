/* 
Note: Since there are so few options here it would be better to put this into nuxt.config.js directly, instead of having it link to this file. I read somewhere that that 
should be possible. But when I try it doesn't compile for some reason.
 */

export default defineI18nConfig(() => ({
  legacy: false,
  fallbackLocale: 'en-US',
  
}))