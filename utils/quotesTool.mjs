
/* 

This file is a command-line-tool reads the quotes datastructure from quotes.js file and returns it to stdout as json.

As of [Mar 2025]
We're using this to extract the quotes list inside quotes.js for our python build scripts – so that they can put them into .xcstrings files for translation.
For all other localizable strings on the MMF website, our python script extracts the localizable strings by directly parsing the source files and looking for MFLocalizedString() invocations – but for the quotes we have this special mechanism.
I'm not sure this is the best solution – we could probably simplify things so everything is extracted via MFLocalizedString() – but this works, so we'll keep it for now.

*/

// Import
import { getUsableQuotes } from "./quotes.js"

// Gather quotes
const quotes = getUsableQuotes()

// Gather QuoteSource

// Print quotes to stdout
console.debug(JSON.stringify(quotes, null, 4))