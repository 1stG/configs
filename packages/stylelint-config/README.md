# @1stg/stylelint-config

Personal but Shareable Stylelint Configuration for all 1stG.me projects.

## Usage

`stylelint.config.js`:

```js
import { defineConfig } from '@1stg/stylelint-config'

export default defineConfig({
  modules: true,
  scss: true,
})
```

The default export is the zero-config version, usable from a JSON config:

```json
{ "extends": ["@1stg/stylelint-config"] }
```

## Options

| Option      | Default | Description                                    |
| ----------- | ------- | ---------------------------------------------- |
| `modules`   | `false` | Ignore the CSS Modules pseudo classes.         |
| `prettier`  | `false` | Run Prettier as a Stylelint rule.              |
| `scss`      | `false` | Add the SCSS syntax and rules.                 |
| `scssLoose` | `false` | Add the SCSS syntax with the strict rules off. |
| `vue`       | `false` | Ignore Vue-specific pseudo elements.           |

`stylelint-prettier` is opt-in now; the config no longer decides based on
whether `eslint` happens to be installed.
