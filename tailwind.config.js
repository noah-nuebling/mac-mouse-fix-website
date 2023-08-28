// This file needs to exist for Tailwind CSS IntelliSense plugin to activate

const plugin = require('tailwindcss/plugin')

module.exports = {
  theme: {
    extend: {
      backgroundImage: (theme) => ({ 
        'gradient-blue': `linear-gradient(to bottom, ${theme('colors.cyan.400')}, ${theme('colors.blue.500')})`,        /* bg-gradient-to-b from-cyan-400 to-blue-500 */
        'gradient-orange': `linear-gradient(to bottom, ${theme('colors.amber.400')}, ${theme('colors.orange.500')})`,   /* bg-gradient-to-b from-amber-400 to-orange-500 */
        'gradient-pink': `linear-gradient(to bottom, ${theme('colors.rose.400')}, ${theme('colors.pink.500')})`,        /* bg-gradient-to-b from-rose-400 to-pink-500 */
      })
    }
  },
  plugins: [
    // plugin(function({ matchUtilities, theme }) {
    //   matchUtilities(
    //     {
    //       tab: (value) => ({
    //         tabSize: value
    //       }),
    //     },
    //     { values: theme('tabSize') }
    //   )
    // }),

    plugin(function({ addUtilities }) {
      
      /*    
      - `inline-space-x` plugin
      - Example usage:
        `<p>Here<span class="inline-space-8"/>There</p>`
      - Also see https://tailwindcss.com/docs/plugins
      - matchUtilities() implementation doesn't work. See https://github.com/tailwindlabs/tailwindcss/discussions/11916. This feels really weird and hacky and I don't understand it. Code comes from ChatGPT. Maybe we should use a vue directive instead.
      */

      const thinSpace = '\u2009'; /* 2009 is thinSpace. See https://jkorpela.fi/chars/spaces.html */

      // vvv addUtilities() implementation

      const cssRules = {};
      const maxValue = 100
      for (let i = 1; i <= maxValue; i++) {
        cssRules[`.inline-space-${i}::before`] = {
          content: "'" + thinSpace.repeat(i) + "'",
        };
      }
    
      addUtilities(cssRules);

      return

      // vvv matchUtilities() implementation

      // const newUtilities = {
      //   "spacing": (n, extra) => {
      //     const rules = {}
      //     const subRules = { content: "'" + thinSpace.repeat(n) + "'" }
      //     rules[`.spacing-[${n}]::before`] = subRules
      //     return subRules // Returning the rules doesn't work.
      //   },
      // }
      // const options = {
      //   values: {
      //     /* Could define default values here. But with can also use arbitrary values with [bracket syntax] */
      //     1: '1',
      //     2: '2',
      //   },
      // }

      // matchUtilities(newUtilities, options)
    }),
  ]
}