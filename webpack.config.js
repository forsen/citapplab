const path = require('path')

const libraryName = 'citapplab'

const config = {
  entry: path.resolve(__dirname, 'src/index.js'),
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'bundle.js',
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: path.resolve(__dirname, 'node_modules'),
        use: [
          'babel-loader',
          'eslint-loader'
        ]
      }
    ]
  }
}

module.exports = config
