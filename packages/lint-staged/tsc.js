module.exports = Object.assign({}, require('.'), {
  '*.ts?(x)': () => 'tsc --noEmit',
})
