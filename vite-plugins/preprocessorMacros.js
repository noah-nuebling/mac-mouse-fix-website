
/* 
This is a vite plugin that basically expands macros before compilation - just like c preprocessor macros.
    
    This works fine, the only problem is that the macros have to at least resemble valid HTML, js, ..., otherwise the vscode linter doesn't understand and flags it as an error. (Since it doesn't see the expansion.)
    
    Like C macros, this has no/terrible tooling support, so use sparingly.

Copied this code and adapted it:
    https://vitejs.dev/guide/api-plugin#transforming-custom-file-types

Currently unused (as of 11.09.2024)

*/

// const expansions = [
//     {
//         /*
//             MFLocalizedStringElement() macro.
//                 (Was intended as i18n-t substitute. Unused, we use MFLocalizedString() function and stuff instead of this.)
//             replaces:
//                 MFLocalizedStringElement(<key>, <localizer hint>)
//             with:
//                 keypath='<key>'
//         */
//         pathMatcher: /\.vue$/,                                              // Only apply the macro to files whose path matches this pattern
//         macro: /<MFLocalizedStringElement\(([^,]*?),([^\)]*?)\)/g,          // Pattern to replace in the source code
//         replacement: "<i18n-t keypath='$1'",                                // Replacement for the pattern in the source code. $1 will be the first matching group of the replaced pattern.
//     },
// ];

// export default function getMacroExpander() {

//     console.assert(false, `Don't use macro-expanding vite plugins for MFLocalizedStringElement.`)

//     return {
//         name: 'expand-preprocessor-macros',

//         transform(src, id) {
//             const isDotVueFile = /\.vue$/.test(id);
//             if (isDotVueFile) {
//                 console.log('Doing cool vite transform on file:', id);
//                 return {
//                     code: expandMacros(src),
//                     map: null, // What is this?
//                 }
//             }
//         }
//     }
// }

// function expandMacros(sourceCode) {

//     var result = sourceCode;

//     for (const [regex, replacement] of Object.entries(expansions)) {
//         var result = result.replaceAll(regex, replacement);
//     }

//     return result;
// }