const fs = require('fs')
const { promisify } = require('util')

const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

const plugins = [
  [
    'gifsicle',
    {
      interlaced: true,
    },
  ],
  [
    'jpegtran',
    {
      progressive: true,
    },
  ],
  ['mozjpeg'],
  [
    'optipng',
    {
      optimizationLevel: 5,
    },
  ],
  [
    'pngquant',
    {
      // eslint-disable-next-line no-magic-numbers
      quality: [0.6, 0.8],
    },
  ],
  ['upng'],
  [
    'svgo',
    {
      plugins: [
        {
          removeViewBox: false,
        },
      ],
    },
  ],
  [
    'webp',
    {
      plugins: [
        {
          removeViewBox: false,
        },
      ],
    },
  ],
].map(([name, opts]) => require(`imagemin-${name}`)(opts))

module.exports = filename =>
  [...plugins, it => writeFile(filename, it)].reduce(
    (acc, it) => acc.then(it),
    readFile(filename),
  )
