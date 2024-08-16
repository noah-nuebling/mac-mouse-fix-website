/* This is obsolete. 
    We moved the functionality of the localization.ts and markdownTranslate.ts composables into the setup-cool-i18n.ts plugin. */

export function useMT() {
  /* This method exists for 'backwards compatibility' after our refactor.
      It would be better to remove this and call useNuxtApp() directly, anywhere we use this.  */
  
  useI18n() // Not sure this is necessary
  
  const { $coolI18n } = useNuxtApp();
  const { mt } = $coolI18n;
  return mt;
}

/* ----------- vvv Old implementation vvv ------------- */

// import md from 'markdown-it' // We used to import 'md' here and it seemed to work the same.

// var didSetup = false
// var i18n: any
// var renderer: any

// function _setup() {

//   // Get i18n and markdown-it
//   //  Think we need to do this again even though it's already done in the plugins, because the plugins are only loaded later.
//   if (!didSetup) {
//     renderer = md({
//       html: true, // Our lang files don't allow inline html for some reason iirc
//       breaks: true
//     })
//     renderer.use(openLinkInNewTab)
//     didSetup = true
//   }
// }

// function openLinkInNewTab(md: MarkdownIt) {

//   // This plugin allows us to open links in a new tab by adding ::newTab to the URL.
//   // Usage example: [some text](some_link::newTab)

//   // Save the original link_open renderer
//   var defaultRender = md.renderer.rules.link_open || function(tokens, idx, options, env, self) {
//       return self.renderToken(tokens, idx, options);
//   };

//   md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
//       var aIndex = tokens[idx].attrIndex('href');
//       if (aIndex >= 0) {
//           var href = tokens[idx].attrs[aIndex][1];
//           // Check if the URL ends with '|newTab'
//           if (href.endsWith("::newTab")) {
//               // Add target="_blank" and rel="noopener noreferrer"
//               tokens[idx].attrPush(['target', '_blank']);
//               // tokens[idx].attrPush(['rel', 'noopener noreferrer']);
//               // Remove "|newTab" from the URL
//               tokens[idx].attrs[aIndex][1] = href.replace('::newTab', '')
//           }
//       }

//       // Call the default renderer
//       return defaultRender(tokens, idx, options, env, self);
//   };
// }

// export function useMT() {

//   // Setup
//   //  Note: need to call useI18n() here, not in _setup(), otherwise the prerender will have the same language for all pages. Not sure why.

//   _setup()
//   i18n = useI18n()
  

//   // Define mt
//   function mt(key: string, values?: Object | Array<string>, inline: boolean = true, locale?: string): string {

//     const translation = i18n.t(key, values, locale)
  
//     var result = inline ? renderer.renderInline(translation) : renderer.render(translation)
    
//     return result

// }

//   // Return mt
//   return mt
// }