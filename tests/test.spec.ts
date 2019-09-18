import { transform } from '@babel/core'

describe('babel-plugin: fast-async', () => {
  it('transform plain async/await to Promise', () => {
    expect(
      transform('async function main() {}', {
        filename: 'fast-async.test.js',
        presets: ['@1stg'],
      })!.code,
    ).toMatch(`function main() {
  return new Promise(function ($return, $error) {
    return $return();
  });
}`)
  })
})
