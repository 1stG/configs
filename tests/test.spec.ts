import { transform } from '@babel/core'

describe('babel-plugin: fast-async', () => {
  it('transform plain async/await to Promise', () => {
    expect(
      transform('async function main() {}', {
        filename: 'fast-async.test.js',
        presets: ['@1stg'],
      })?.code,
    ).toMatchInlineSnapshot(`
      "import \\"core-js/modules/es.object.to-string.js\\";
      import \\"core-js/modules/es.promise.js\\";

      function main() {
        return new Promise(function ($return, $error) {
          return $return();
        });
      }"
    `)
  })
})
