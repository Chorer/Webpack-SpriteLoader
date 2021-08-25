const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  target: 'node',
  mode: 'none',  
  entry: {
    'webpack-sprite-loader': './src/index.js',
    'webpack-sprite-loader.min': './src/index.js'
  },
  output: {
    path: path.resolve(__dirname,'./dist'),
    filename: '[name].js',
    library: 'webpack-sprite-loader',
    libraryExport: 'default',
    libraryTarget: 'umd',
    globalObject: 'this'
  }, 
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        test: /\.min\.js$/        
      })
    ]
  }
}