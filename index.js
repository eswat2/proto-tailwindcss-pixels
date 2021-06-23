/**
 * TailwindCSS Pixels Sizes
 * Generates pixel sizes via plugin... [ height, width, lineHeight ]
 * @file index.js
 */
const plugin = require('tailwindcss/plugin')

/**
 * getSizes
 * Handles getting sizes in pixels...
 * @param {int} stop
 * @param {int} start
 * @return {object}
 */
const getSizes = (stop = 900, start = 0) => {
  // The following generates an array of increasing values from the totalSizes above.
  const sizeArray = Array.from(Array(stop + 1).keys())
  const sliced = sizeArray.slice(start, sizeArray.length)
  // Traverse the array and generate sizes in pxs.
  const sizes = sliced.map((x) =>
    x > 0 ? { [`${x}px`]: `${x}px;` } : { [`${x}px`]: `${x};` }
  )
  // Merge the array of objects into a single one
  const sizeObj = Object.assign.apply(Object, sizes)
  // console.log('sizeObj', sizeObj)
  return sizeObj
}

module.exports = plugin.withOptions(
  function (options) {
    return function ({ addUtilities, e, variants, theme }) {
      // ...
    }
  },
  function (options) {
    const tags = [
      'fontSize',
      'height',
      'lineHeight',
      'maxHeight',
      'maxWidth',
      'minHeight',
      'minWidth',
      'spacing',
      'width',
    ]

    const output = {
      theme: {
        extend: {},
      },
    }

    if (options) {
      const keys = Object.keys(options)

      keys.forEach((key) => {
        if (tags.includes(key)) {
          const results = getSizes(
            options[key].stop || 900,
            options[key].start || 0
          )
          output.theme.extend[key] = { ...results }
        }
      })
    }

    return output
  }
)
