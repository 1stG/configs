import { defineConfig as defineStaged } from '@1stg/nano-staged'

describe('@1stg/nano-staged', () => {
  it('builds both formatter tasks', () => {
    const config = defineStaged({
      cwd: process.cwd(),
      formatter: 'both',
      linter: 'oxlint',
      stylelint: true,
      tsconfig: 'tsconfig.json',
      typecheck: 'tsc',
    })
    expect(config['*.{cjs,cts,js,jsx,mjs,mts,ts,tsx,vue}']).toEqual([
      'oxlint --fix',
      'oxfmt',
    ])
    expect(config['*.{ini,properties,pug,rb,sass,sh,styl,stylus}']).toBe(
      'prettier --write',
    )
    expect(config['**/!(*package).json']).toBe('oxfmt')
    expect(config['**/package.json']).toBe('prettier --write')
    expect(config['*.ts?(x)']).toBeTypeOf('function')
  })
})
