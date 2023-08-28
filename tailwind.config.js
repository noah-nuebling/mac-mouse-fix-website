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

    plugin(function({ matchUtilities }) {
      
      /*    
      - `inline-space-[n]` plugin
      - Example usage:
        `<p>Here<span class="inline-space-[8]"/>There</p>`
      - Also see https://tailwindcss.com/docs/plugins
      - matchUtilities() implementation didn't work at first. See https://github.com/tailwindlabs/tailwindcss/discussions/11916.
      - This might break on other systems where the Apple font isn't available and the space width is therefore different.
      */

      const thinSpace = '\u200A'; /* 2009 is thinSpace, 200A is hair space. See https://jkorpela.fi/chars/spaces.html */

      const newUtilities = {
        'inline-space': (n) => {
          const cssRules = {
            '&::before': {
              'content': `'${thinSpace.repeat(n)}'`
            }
          }
          return cssRules
        },
      }
      const options = {
        values: {
          /* Could define default values here. But with can also use arbitrary values with [bracket syntax] */
          1: '1',
          2: '2',
        },
      }

      matchUtilities(newUtilities, options)
    }),
  ]
}