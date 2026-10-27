import { defineConfig as defineHooks } from '@1stg/simple-git-hooks'

describe('@1stg/simple-git-hooks', () => {
  it('uses the configured runner', () => {
    expect(defineHooks({ runner: 'pnpm' })).toEqual({
      'commit-msg': 'pnpm commitlint -e',
      'pre-commit': 'pnpm nano-staged',
    })
  })
})
