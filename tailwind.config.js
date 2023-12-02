// This file needs to exist for Tailwind CSS IntelliSense plugin to activate

// Reference:
// - Tailwind size naming conventions: xs, sm, md(/base/DEFAULT), lg, xl, 2xl, 3xl, ...

import plugin from 'tailwindcss/plugin'
/** @type {import('tailwindcss').Config} */ /* Not sure what this is */

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

    /* Discussion of color stuff:

      - We currently plan to give each section an accent color. Different colors we could use that make a strong, distinct impression from the other colors:
        - Red, Orange, Yellow, Green, Light Blue, Dark Blue, Purple, Pink 
      - Analysis of tailwind color pallete and Apple System colors: I analyzed the tailwind color palette using https://hslpicker.com/#6567f1 and https://tailwindcolor.com/. In think I understand the pattern of how they came up with them. Here's how I managed to come up with very similar colors myself based on my understanding of their process: First, you find the purest version of your color, for this you pick a hue, set saturation to 80, and lightness to 50. We don't choose 100 as the base saturation, because that can look a bit 'neon' and 'unnatural' and also we want space to adjust colors so that we can more freely adjust colors to make many different colors with different hues have matching perceived 'colorfulness' and brightness. After setting our h, s, and l to the initial values, we adjust the s and l values to find the purest and most 'direct' looking version of the color, without having it start to look 'neon'. For this it's interesting to note, that decreasing the lightness increases perceived colorfulness, and increasing lightness decreases colorfulness. We can adjust saturation to compensate for this. Once we have found our 'purest' looking version of the hue, now we have found our base color. This matches the -500 version of a color in the tailwind scheme. Next we find the lightest version of the color, aka the -100 version. For this we take our original color, then increase the lightness to 95, increase the saturation to compensate the loss of 'colorfulness', and then make further small adjustments to h, s, and l to achieve the best looking color which also matches other tailwind -100 colors in lightness and colorfulness. Then we create the darkest version, aka the -900 version of the color. For this, we take the original -500 color, then decrease the lightness to 30, then lower the saturation to compensate for the increase in colorfulness, and then make further smaller adjustments to achieve the best result which also matches other -900 colors in colorfulness and lightness. Lastly, you want to come up with the in between colors, like -700 or -400. I haven't thought about this, too much, and I haven't tried to create these myself but I think one way that could work is to first try to create a color that is visually exactly  between the -500 and and -900 colors, and call that the -700 version, and then come up with one that is visually exactly between the -500 and -100 versions, and call that the -300 version. Then you could continue this 'bisection' process to get the -200, -400, -600, and -800 versions of the color. For every version you create you should also make sure that it matches other tailwind colors with the same number in lightness and colorfulness. Another thing I noticed looking at the colors on https://tailwindcolor.com/ (it seems to use tailwind 1, tailwind 2 might have changed this) is that the -200, -300, -400 versions in the red to yellow range have increased colorfulness and I think also decreased lightness compared to all other -200, -300, -400 color versions on the site. This might be bcause of my monitor or me using Apple Nightshift or something. I'm not sure. Lastly, I also analyzed some of Apple's system colors, and all the ones I found were very close to pure colors. All the ones I looked at used saturation 100 and lightness just a few percentages higher than 50. They also seemed to gravitate towards colors 'between' other colors. Not sure that description makes sense. Like their blue hue is exactly at the point between where the hue looks 'light-blue-ish' and where it looks 'dark-blue-ish'. Like EXACTLY in the middle where it looks like neither light nor dark blue. I analyzed one or two other colors from Apple, and for all the ones I looked at it was like this. However, I personally clearly prefer the tailwind colors which have a lower saturation which gives them a more sophisticated, natural, less 'neon' look and better matching between colors of different hues. 
      - There's also oklch (css natively supports it) which is a human perception-based way to pick colors -> https://oklch.com/. It's really cool. I'm not sure I find it more usable than hsl, because most of the perceivable colors aren't available on computer monitors, so you constantly have to work around that. 
      - We used to use accent colors before we gave all the text gradients - Green: hsla(142,93%,30%,1), Red: hsla(0,91%,45%,1), Purple: hsla(271,85%,52%,1), Blue: hsla(217,90%,48%,1)
      - On giving all the text gradients: We're using some custom tailwind variants and utilities to make this work ('strong' and 'ch') - I hope its worth it. Also we're using oklch.com to pick nice gradients with readable brightness and good visual impact. We also found that the gradients look significantly brighter on thinner, smaller text. So we're using css brightness filter to compensate.
      
    */

    screens: {

      // Responsive prefixes.
      // ! Keep this in sync with constants.ts
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
          - Update: Did some more testing, `-apple-system` and `BlinkMacSystemFont` are enough to get a system font that automatically switches between SF Pro Text and Display. That makes it seemingly unnecessary to use all the other fonts. But why does the apple website use SF Pro Display and so on fonts? -- I think it's because they are shipping the fonts with the website so they are also rendering sf fonts on non-apple devices?
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
      
      /* vvv From MMF Feedback Assistant */
      'sm-inset': '0px 0.5px 3px 1px rgba(0, 0, 0, 0.1), 0 1px 8px 0 rgba(0, 0, 0, 0.08), inset 0 1px 0 0 rgba(255, 255, 255, 0.30)', 
      'md-inset': '0 2px 4px 0 rgba(0, 0, 0, 0.08), 0 4px 16px 0 rgba(0, 0, 0, 0.08), 0 8px 32px 0 rgba(0, 0, 0, 0.08), inset 0 1px 0 0 rgba(255, 255, 255, 0.30)',
      
      /* vvv Like Feedback Assistant shadows but without inset – otherwise tailwind shadow coloring colors the inset */
      'sm': '0px 0.5px 3px 1px rgba(0, 0, 0, 0.1), 0 1px 8px 0 rgba(0, 0, 0, 0.08)',
      'md': '0 2px 4px 0 rgba(0, 0, 0, 0.08), 0 4px 16px 0 rgba(0, 0, 0, 0.08), 0 8px 32px 0 rgba(0, 0, 0, 0.08)',
      'lg': '0 2px 4px 0 rgba(0, 0, 0, 0.08), 0 4px 16px 0 rgba(0, 0, 0, 0.08), 0 20px 32px -5px rgba(0, 0, 0, 0.1)',
      'lg2': '0 2px 4px 0 rgba(0, 0, 0, 0.08), 0 4px 16px 0 rgba(0, 0, 0, 0.08), 0 8px 32px 0 rgba(0, 0, 0, 0.08), rgba(0, 0, 0, 0.1) 0px 8px 10px -6px',
      'lg3': 'rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.1) 0px 8px 10px -6px, 0 8px 32px -6px rgba(0, 0, 0, 0.08)',
      'md-raised': '0 16px 64px 8px rgba(0, 0, 0, 0.4), 0 16px 100px 16px rgba(0, 0, 0, 0.3), 0 32px 192px 16px rgba(0, 0, 0, 0.2)', /* This shadow is used for raised cards. Doesn't look that great at the moment, but somehow I don't care. */

      /* vvv Stolen from refactoringUI website */
      'refactoringui': 'rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.1) 0px 8px 10px -6px',
    },

    extend: {
      fontWeight: {
        'weight-inherit': 'inherit', // Using this to prevent <strong> text from markdown-it from being super fat. (Since we apply gradients to emphasize instead)
      },
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

    plugin(function ({ addVariant }) {

      /* Variant for safari and chrome-specific style
        Notes:
          - Introducing this because backdrop-filter colors look pretty different between chrome and safari
          - Use like `safari:color-blue-500` to apply that style only on Safari` */

      addVariant('safari',    `.safari &`);
      addVariant('chromium',  `.chromium &`);
      addVariant('firefox',   `.firefox &`);
    }),

    plugin(function ({ matchVariant }) {

      /* Variant for styling self if a parent has a certain class
        Use like `par-[.some-class]:color-blue-500`
        (There are probably more usecases for this that I don't understand, yet.)
      */

      const options = {}

      matchVariant('par', (value, { modifier, container }) => {
        return createVariants(value, (x) => `${ x } &`) 
      }, options)
    }),

    plugin(function ({ matchVariant }) {

      /* Variant for styling children with a certain selector
        Use like `ch-[.some-class]:color-blue-500` to style all children with class `.some-class`. If your child selector has spaces, you can use _ instead.
      */

      const options = {}

      matchVariant('ch', (value, { modifier, container }) => {
        return createVariants(value, (x) => `& ${ x }`)
      }, options)
    }),

    plugin(function ({ addVariant }) {

      // not-last variant
      // Use like `not-last:ch-[.some-class]:color-blue-500` to match all children with class `.some-class` that are not the last child.
      // Use like `ch-[.some-class]:not-last:color-blue-500` to match all children with class `.some-class` if the element that you're setting the tailwind class on is not the last child.

      addVariant('not-last', '&:not(:last-child)')
    }),

    plugin(function ({ addVariant }) {

      /* Variant for styling <strong> children, which markdown-it outputs for markdown source text wrapped in `**` 
        Use like `strong:color-blue-500` to style all <strong> children */

      addVariant('strong', '& strong')
    }),

    plugin(function ({ matchUtilities }) {

      /* Set variable utiltiy
          Use like `var-[accent-margin=30rem]` and then in a child `m-[var(--accent-margin)]`*/
      const newUtilities = {
        'var': (value) => {
          var [varName, varValue] = value.split('=', 2)
          varValue = varValue.replaceAll('_', ' ')
          return {
            [`--${ varName }`]: varValue,
          }
        },
      }
      const options = { }
      matchUtilities(newUtilities, options);
    }),

    plugin(function ({ matchUtilities }) {

      /* Set width and height together utility
          Use like `wh-[30rem]` */
      const newUtilities = {
        'wh': (value) => {
          value = value.replaceAll('_', ' ')
          return {
            'width': value,
            'height': value
          }
        },
      }
      const options = { }
      matchUtilities(newUtilities, options);
    }),

    plugin(function ({ matchUtilities }) {

      /* Force size utility
        Sometimes w- and h- don't work for some reason. This sets min- and max- at once to try and force the element to be exacltly that size */
      const newUtilities = {
        'f-w': (value) => {
          value = value.replaceAll('_', ' ')
          return {
            'min-width': value,
            'width': value,
            'max-width': value
          }
        },
        'f-h': (value) => {
          value = value.replaceAll('_', ' ')
          return {
            'min-height': value,
            'height': value,
            'max-height': value
          }
        }
      }
      const options = { }
      matchUtilities(newUtilities, options);
    }),

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
      const options = { }
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
function createVariants(v, rule) {
  v = preprocessVariantValue(v)
  var w = v.map(rule)
  return w
}
function preprocessVariantValue(v) {

  /*
  We need to do this so that 
    - Using comma as in ch-[a,b] works
    - Using underscores as in ch-[a_b] works
  */

  v = v.replaceAll('_', ' ');
  v = v.split(',');
  return v;
}
