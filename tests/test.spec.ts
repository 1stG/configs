import { transform } from '@babel/core'

describe('babel-plugin: fast-async', () => {
  it('transform plain async/await to Promise', () => {
    const result = transform('async function main() {}', {
      filename: 'fast-async.test.js',
      presets: ['@1stg'],
    })
    expect(result!.code).toMatchInlineSnapshot(`
      "function _await(value, then, direct) {
        if (direct) {
          return then ? then(value) : value;
        }
        if (!value || !value.then) {
          value = Promise.resolve(value);
        }
        return then ? value.then(then) : value;
      }
      const main = function () {
        return _await();
      };"
    `)
  })
})
