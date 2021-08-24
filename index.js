if(process.env.NODE_ENV === 'production'){
  module.exports = require('./dist/webpack-sprite-loader.min.js')
} else {
  module.exports = require('./dist/webpack-sprite-loader.js')
}