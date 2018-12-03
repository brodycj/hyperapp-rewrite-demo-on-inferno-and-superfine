const path = require('path')

module.exports = {
  entry: './src/index.js',
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: ['babel-loader']
    }]
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, './dist')
  }
}
