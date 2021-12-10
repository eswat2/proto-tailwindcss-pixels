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

const generate = (options) => {
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
        // NOTE:  support the new and old option props...
        const stop = options[key].stop || options[key].total || 900
        const start = options[key].start || options[key].startingValue || 0

        const results = getSizes(stop, start)

        output.theme.extend[key] = { ...results }
      }
    })
  }

  return output
}

module.exports = plugin.withOptions(
  function (_options) {
    return function () {
      // ...
    }
  },
  function (options) {
    return generate(options)
  }
)
