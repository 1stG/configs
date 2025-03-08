/**
 * @import {Config} from 'stylelint'
 * @type {Config}
 */
const modules = {
  rules: {
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['export', 'local', 'global'],
      },
    ],
  },
}

export default modules
