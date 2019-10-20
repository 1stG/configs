module.exports = Object.assign({}, require('.'), {
  '*.ts?(x)': () => 'tsc --incremental false --noEmit',
})
