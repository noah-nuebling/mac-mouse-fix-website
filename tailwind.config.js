// This file needs to exist for Tailwind CSS IntelliSense plugin to activate

module.exports = {
  theme: {
    extend: {
      backgroundImage: (theme) => ({ 
        'blue-gradient': `linear-gradient(to bottom, ${theme('colors.cyan.400')}, ${theme('colors.blue.500')})`,        /* bg-gradient-to-b from-cyan-400 to-blue-500 */
        'orange-gradient': `linear-gradient(to bottom, ${theme('colors.amber.400')}, ${theme('colors.orange.500')})`,   /* bg-gradient-to-b from-amber-400 to-orange-500 */
        'pink-gradient': `linear-gradient(to bottom, ${theme('colors.rose.400')}, ${theme('colors.pink.500')})`,        /* bg-gradient-to-b from-rose-400 to-pink-500 */
      })
    }
  }
}