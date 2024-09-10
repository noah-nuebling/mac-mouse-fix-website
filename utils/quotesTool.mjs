
/* 

This file is a command-line-tool reads the quotes datastructure from quotes.js file and returns it to stdout as a json file.

We plan to use this to make the quotes datastructure visible to our python build scripts.

*/

// Import
import { getUsableQuotes } from "./quotes.js"

// Gather quotes
const quotes = getUsableQuotes()

// Print quotes to stdout
console.debug(JSON.stringify(quotes, null, 4))