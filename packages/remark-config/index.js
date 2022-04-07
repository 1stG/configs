import remarkLint from 'remark-lint'
import remarkPresetLintConsistent from 'remark-preset-lint-consistent'
import remarkPresetLintMarkdownStyleGuide from 'remark-preset-lint-markdown-style-guide'
import remarkPresetLintRecommended from 'remark-preset-lint-recommended'
import remarkPresetPrettier from 'remark-preset-prettier'
import remarkValidateLinks from 'remark-validate-links'

export default {
  settings: {
    emphasis: '_',
    strong: '*',
    listItemIndent: 1,
    tightDefinitions: true,
  },
  plugins: [
    remarkLint,
    remarkPresetLintConsistent,
    remarkPresetLintMarkdownStyleGuide,
    remarkPresetLintRecommended,
    remarkPresetPrettier,
    remarkValidateLinks,
  ],
}
