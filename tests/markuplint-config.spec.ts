import { defineConfig as defineMarkuplint } from '@1stg/markuplint-config'

describe('@1stg/markuplint-config', () => {
  it('adds the Vue parser on demand', () => {
    expect(defineMarkuplint({ vue: false }).parser?.['.vue$']).toBeUndefined()
    expect(defineMarkuplint({ vue: true }).parser?.['.vue$']).toBe(
      '@markuplint/vue-parser',
    )
  })
})
