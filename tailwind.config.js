// This file needs to exist for Tailwind CSS IntelliSense plugin to activate

// Reference:
// - Tailwind size naming conventions: xs, sm, md(/base/DEFAULT), lg, xl, 2xl, 3xl, ...

import plugin from 'tailwindcss/plugin'

export default {
  content: [
    
    /// Additions
    `./css/**/*.css`,
    
    /// Default. Src: https://tailwindcss.nuxtjs.org/tailwind/config
    `./components/**/*.{vue,js,ts}`,
    `./layouts/**/*.vue`,
    `./pages/**/*.vue`,
    `./composables/**/*.{js,ts}`,
    `./plugins/**/*.{js,ts}`,
    `./utils/**/*.{js,ts}`,
    `./App.{js,ts,vue}`,
    `./app.{js,ts,vue}`,
    `./Error.{js,ts,vue}`,
    `./error.{js,ts,vue}`,
    `./app.config.{js,ts}`
  ],
  safelist: [
    'shadow-mdd',
  ],
  theme: {

    screens: {

      // Responsive prefixes.
      // Notes:
      // - Using `max` for desktop first design. using `M:some-tailwind-class` will apply that class at the M size and below
      // - Stole those breakpoints from the Apple iMac and MacBook Air website. They used 734, 1068 and 1440. But there were no changes to the site at 1440. (So there's only 3 sizes for everything - small, medium, large.) We might use 1440 as the default width of our stuff.
      //  - On the iMac and Air site, the content for the smallest breakpoint had a size of ca. 415, if the width got lower than that the text just wrapped and the images sized to fit.
      //  - iMac and Air sites used 320px as min width before responsive stuff stopped working. 320px is width of iPhone 5, 375px is width of iPhone 6
      //  - From playing around, AirPods Max site has breakpoints at ca. 1600, 1440, 1068, 734, 375. But we should be okay with only 3 breakpoints I think.

      lg: { max: "1440px" },
			md: { max: "1068px" }, // equivalent to css: @media (max-width: 1068px) { ... }
			sm: { max: "734px" },
      xs: { max: "375px" },
    },

    fontFamily: {

      /* Copied from Apple website, but adding "-apple-system[-xxx]" and "BlinkMacSystemFont"
          - Otherwise Safari would use Helvetica 
          - BlinkMacSystemFont is for Chrome I think, so probably not necessary
          - Info on -apple-system-xxx and system-ui fonts: 1. https://furbo.org/2018/03/28/system-fonts-in-css/ 2. https://stackoverflow.com/a/32660790 
          - When -apple-system is used it automatically seems to switch to SF Display at a certain size. Maybe even dynamically interpolating between them. I think size was like 20px. See this WWDC talk at around 10:00 min: https://developer.apple.com/videos/play/wwdc2020/10175/
          - Update: Did some more testing, `-apple-system` and `BlinkMacSystemFont` are enough to get a system font that automatically switches between SF Pro Text and Display. That makes 
            - TODO: Remove "SF Pro Display", "SF Pro Icons", and remove separate `display` and `body` font families.
      */

      'display': '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif', /* Copied from big text on iPad Pro page */ 
      'body': '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif', /* Copied from small text on iPad Pro page */
    },
    // fontSize: {
    //   xs: '0.75',
    //   sm: '0.875rem',
    //   base: '1rem',
    //   lg: '1.125', 
    //   xl: '1.25rem',
    //   ...
    // },

    boxShadow: {
      
      /* vvv From Feedback Assistant */
      'sm-inset': '0px 0.5px 3px 1px rgba(0, 0, 0, 0.1), 0 1px 8px 0 rgba(0, 0, 0, 0.08), inset 0 1px 0 0 rgba(255, 255, 255, 0.30)', 
      'md-inset': '0 2px 4px 0 rgba(0, 0, 0, 0.08), 0 4px 16px 0 rgba(0, 0, 0, 0.08), 0 8px 32px 0 rgba(0, 0, 0, 0.08), inset 0 1px 0 0 rgba(255, 255, 255, 0.30)',
      
      /* vvv Like Feedback Assistant shadows but without inset – otherwise tailwind shadow coloring colors the inset */
      'sm': '0px 0.5px 3px 1px rgba(0, 0, 0, 0.1), 0 1px 8px 0 rgba(0, 0, 0, 0.08)',
      'md': '0 2px 4px 0 rgba(0, 0, 0, 0.08), 0 4px 16px 0 rgba(0, 0, 0, 0.08), 0 8px 32px 0 rgba(0, 0, 0, 0.08)',
      'md-raised': '0 16px 64px 8px rgba(0, 0, 0, 0.4), 0 16px 100px 16px rgba(0, 0, 0, 0.3), 0 32px 192px 16px rgba(0, 0, 0, 0.2)',
    },

    extend: {
      backgroundImage: (theme) => ({ 
        // 'gradient-blue': `linear-gradient(to bottom, ${theme('colors.cyan.400')}, ${theme('colors.blue.500')})`,        /* bg-gradient-to-b from-cyan-400 to-blue-500 */
        // 'gradient-orange': `linear-gradient(to bottom, ${theme('colors.amber.400')}, ${theme('colors.orange.500')})`,   /* bg-gradient-to-b from-amber-400 to-orange-500 */
        // 'gradient-pink': `linear-gradient(to bottom, ${theme('colors.rose.400')}, ${theme('colors.pink.500')})`,        /* bg-gradient-to-b from-rose-400 to-pink-500 */
      }),
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite', // Doesn't seem to work
      },
      keyframes: {
        wiggle: { // Doesn't seem to work
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        }
      }
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

    plugin(function ({ matchUtilities }) {

      /* SVG filter plugin
          Probably can't be combined with other tailwind filters */

      const newUtilities = {
        'svg-filter': (value) => {
          return {
            'filter': `url('#${ value }')`
          }
        }
      }
      const options = {
      }
      matchUtilities(newUtilities, options);
    }),

    plugin(function ({ matchUtilities }) {

      /* `text-shadow-x` plugin */

      const newUtilities = {
        'text-shadow': (value) => {
          return {
            'textShadow': value
          }
        }
      }
      const options = {
        values: {
          none: '',
          sm: '0 0.02em 2px var(--tw-shadow-color), 0 0.01em 8px var(--tw-shadow-color)', // Alternative: '0 0.02em 1px var(--tw-shadow-color), 0 0.02em 4px var(--tw-shadow-color), 0 0.01em 28px var(--tw-shadow-color)',
          lg: '0 0.02em 1px var(--tw-shadow-color), 0 0.02em 4px var(--tw-shadow-color), 0 0.01em 20px var(--tw-shadow-color), 0 0.01em 24px var(--tw-shadow-color)',
          xl: '0 0.02em 1px var(--tw-shadow-color), 0 0.02em 4px var(--tw-shadow-color), 0 0.01em 20px var(--tw-shadow-color), 0 0.01em 24px var(--tw-shadow-color), 0 0.01em 28px var(--tw-shadow-color), 0 0.01em 32px var(--tw-shadow-color)',
        }
      }
      matchUtilities(newUtilities, options);
    }),

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