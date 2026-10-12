import { transformSync } from '@babel/core'

describe('babel-preset: async', () => {
  it('keeps native async/await for the configured targets', () => {
    const result = transformSync(
      'export async function main(x) { return await x() }',
      {
        filename: 'async.test.js',
        presets: ['@1stg'],
      },
    )
    expect(result!.code).toMatchInlineSnapshot(`
      "export async function main(x) {
        return await x();
      }"
    `)
  })
})
