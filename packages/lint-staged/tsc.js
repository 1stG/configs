module.exports = {
  ...require('.'),
  '*.ts?(x)': () => 'tsc --incremental false --noEmit',
}
