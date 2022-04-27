import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkLint from 'remark-lint'
import remarkLintNoDuplicateHeadings from 'remark-lint-no-duplicate-headings'
import remarkLintNoDuplicateHeadingsInSection from 'remark-lint-no-duplicate-headings-in-section'
import remarkPresetLintConsistent from 'remark-preset-lint-consistent'
import remarkPresetLintMarkdownStyleGuide from 'remark-preset-lint-markdown-style-guide'
import remarkPresetLintRecommended from 'remark-preset-lint-recommended'
import remarkPresetPrettier from 'remark-preset-prettier'
import remarkValidateLinks from 'remark-validate-links'

export default {
  settings: {
    bullet: '-',
    emphasis: '_',
    listItemIndent: 'one',
    quote: "'",
    rule: '-',
    strong: '*',
    tightDefinitions: true,
  },
  plugins: [
    remarkLint,
    remarkPresetLintConsistent,
    remarkPresetLintMarkdownStyleGuide,
    remarkPresetLintRecommended,
    remarkPresetPrettier,
    remarkFrontmatter,
    remarkGfm,
    remarkValidateLinks,
    [remarkLintNoDuplicateHeadings, false],
    remarkLintNoDuplicateHeadingsInSection,
  ],
}
