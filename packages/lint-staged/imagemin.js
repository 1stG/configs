const fs = require('fs')
const { promisify } = require('util')

const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

const plugins = [
  [
    'imagemin-gifsicle',
    {
      interlaced: true,
    },
  ],
  [
    'imagemin-jpegtran',
    {
      progressive: true,
    },
  ],
  ['imagemin-mozjpeg'],
  [
    'imagemin-optipng',
    {
      optimizationLevel: 5,
    },
  ],
  [
    'imagemin-pngquant',
    {
      // eslint-disable-next-line no-magic-numbers
      quality: [0.6, 0.8],
    },
  ],
  ['imagemin-upng'],
  [
    'imagemin-svgo',
    {
      plugins: [
        {
          removeViewBox: false,
        },
      ],
    },
  ],
  [
    'imagemin-webp',
    {
      plugins: [
        {
          removeViewBox: false,
        },
      ],
    },
  ],
].map(([name, opts]) => require(name)(opts))

const minifyFile = filename =>
  [...plugins, it => writeFile(filename, it)].reduce(
    (acc, it) => acc.then(it),
    readFile(filename),
  )

Promise.all(process.argv.slice(2).map(minifyFile)).catch(e => {
  console.error(e)
  process.exitCode = 1
})
