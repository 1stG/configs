module.exports = {
  ...require('./base'),
  '*.ts?(x)': () => 'tsc --incremental false --noEmit',
}
