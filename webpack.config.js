const path = require('path')

module.exports = {
  mode: 'development',
  entry: './Src/index.js',
  output: {
    path: path.resolve(__dirname, 'Dist'),
    filename: 'bundle.js'
  },
  watch: true
}