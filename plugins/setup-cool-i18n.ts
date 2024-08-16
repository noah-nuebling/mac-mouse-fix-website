/* This offers extensions to nuxtI18n.
  Access them using:
  ```
  const { $coolI18n } = useNuxtApp(); 
  ```
  */

import md from 'markdown-it' // We used to import 'md' here and it seemed to work the same.
import type MarkdownIt from 'markdown-it/index.js';

export default defineNuxtPlugin((app) => {

  /* Get stuff from nuxtApp */
  const { $i18n } = app;

  /* Get renderer */
  const renderer = md({
    html: true, // Our lang files don't allow inline html for some reason iirc
    breaks: true
  })
  renderer.use(openLinkInNewTab)
  
  /* Define mt */
  function mt(key: string, values?: Object | Array<string>, inline: boolean = true, locale?: string): string {

    const translation = $i18n.t(key, values, locale)
  
    var result = inline ? renderer.renderInline(translation) : renderer.render(translation)
    
    return result

  }

  /* Define isCurrentLang */
  function isCurrentLanguage(languageCode: string) {

    const currentLocale = $i18n.locale.value
    return currentLocale.startsWith(languageCode)
  }

  /* Store custom functions */
  const coolI18n = {
    mt,
    isCurrentLanguage
  }

  /* Return */
  return {
    provide: { coolI18n }
  }
})

/* Helper function */

function openLinkInNewTab(md: MarkdownIt) {

  // This plugin allows us to open links in a new tab by adding ::newTab to the URL.
  // Usage example: [some text](some_link::newTab)

  // Save the original link_open renderer
  var defaultRender = md.renderer.rules.link_open || function(tokens, idx, options, env, self) {
      return self.renderToken(tokens, idx, options);
  };

  md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
      var aIndex = tokens[idx].attrIndex('href');
      if (aIndex >= 0) {
          var href = tokens[idx].attrs[aIndex][1];
          // Check if the URL ends with '|newTab'
          if (href.endsWith("::newTab")) {
              // Add target="_blank" and rel="noopener noreferrer"
              tokens[idx].attrPush(['target', '_blank']);
              // tokens[idx].attrPush(['rel', 'noopener noreferrer']);
              // Remove "|newTab" from the URL
              tokens[idx].attrs[aIndex][1] = href.replace('::newTab', '')
          }
      }

      // Call the default renderer
      return defaultRender(tokens, idx, options, env, self);
  };
}