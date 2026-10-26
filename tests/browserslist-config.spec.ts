import config from '@1stg/browserslist-config'
import latest from '@1stg/browserslist-config/latest'
import modern from '@1stg/browserslist-config/modern'

describe('@1stg/browserslist-config', () => {
  it('exports the default, latest and modern lists', () => {
    expect(Array.isArray(config)).toBe(true)
    expect(Array.isArray(latest)).toBe(true)
    expect(Array.isArray(modern)).toBe(true)
    expect(config).toContain('not dead')
    expect(latest).toContain('not dead')
    expect(modern).toContain('not dead')
  })
})
