import { defineConfig } from '@1stg/oxfmt-config'

export default defineConfig({
  // Changesets writes double-quoted package names in the frontmatter.
  overrides: [
    {
      files: ['.changeset/*.md'],
      options: {
        singleQuote: false,
      },
    },
  ],
})
