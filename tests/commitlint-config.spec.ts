import { defineConfig as defineCommitlint } from '@1stg/commitlint-config'

describe('@1stg/commitlint-config', () => {
  it('adds workspace scopes for monorepos', () => {
    expect(defineCommitlint().rules).toBeDefined()
    expect(defineCommitlint({ monorepo: false }).rules).not.toEqual(
      defineCommitlint({ monorepo: true }).rules,
    )
  })
})
