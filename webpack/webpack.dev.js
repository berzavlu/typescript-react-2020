const merge = require('webpack-merge')
const common = require('../webpack.common')
const ENV = require('../env')

const { PORT } = ENV[process.env.NODE_ENV]

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    host: 'localhost',
    open: true,
    hot: true,
    port: PORT,
    historyApiFallback: true,
    stats: 'errors-only',
    noInfo: true,
    quiet: true,
  },
})
