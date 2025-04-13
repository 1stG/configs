/**
 * @type {Config}
 * @import {Config} from 'stylelint'
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
