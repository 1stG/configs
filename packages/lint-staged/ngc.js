module.exports = {
  ...require('./base'),
  '*.{html,ts}': () => 'ngc --noEmit',
}
