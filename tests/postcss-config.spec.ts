import { defineConfig as definePostcss } from '@1stg/postcss-config'
import postcss from 'postcss'

describe('@1stg/postcss-config', () => {
  const run = async (options: object) => {
    const { plugins } = definePostcss(options)
    const result = await postcss(plugins).process('a { color: red; /* x */ }', {
      from: undefined,
    })
    return result.css
  }

  it('minifies only in production', async () => {
    expect(await run({ env: 'development' })).toContain('/* x */')
    expect(await run({ env: 'production' })).toBe('a{color:red}')
  })

  it('lets options override the environment', async () => {
    expect(await run({ cssnano: false, env: 'production' })).toContain('/* x */')
    expect(await run({ env: 'development', minify: true })).not.toContain('/* x */')
  })

  it('maps in development only', () => {
    expect(definePostcss({ env: 'development' }).map).toBe(true)
    expect(definePostcss({ env: 'production' }).map).toBe(false)
  })
})
