const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin')
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
const webpack = require('webpack')
const ENV = require('./env')

const { PORT, NODE_ENV, ASSET_PATH } = ENV[process.env.NODE_ENV]
const isProd = NODE_ENV === 'production'

module.exports = {
  entry: ['./src/app.tsx'],
  output: {
    filename: 'static/js/[name].[hash].chunk.js',
    path: path.resolve('./dist'),
    publicPath: ASSET_PATH,
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        oneOf: [
          {
            test: /\.module\.s?css$/,
            use: [
              MiniCssExtractPlugin.loader,
              {
                loader: 'css-loader',
                options: {
                  modules: {
                    mode: 'local',
                    localIdentName: 'style_[local]__[hash:base64:5]',
                    context: path.resolve(__dirname, 'src'),
                    hashPrefix: 'my-custom-hash',
                  },
                  onlyLocals: false,
                },
              },
              'sass-loader',
            ],
          },
          {
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
          },
        ],
      },
      {
        oneOf: [
          {
            test: /\.css$/,
            include: /node_modules/,
            use: ['style-loader', 'css-loader'],
            sideEffects: isProd,
          },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
            },
          },
        ],
      },
      {
        test: /\.(t|j)sx?$/,
        loader: 'awesome-typescript-loader',
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
    ],
  },
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
      styles: path.resolve('./src/styles'),
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  devtool: 'source-map',
  plugins: [
    new SimpleProgressWebpackPlugin({ format: 'compact' }),
    new FriendlyErrorsWebpackPlugin(),
    new HtmlWebPackPlugin({
      template: './public/index.html',
      favicon: './public/resources/images/favicon.ico',
    }),
    new MiniCssExtractPlugin({
      filename: isProd
        ? 'static/css/[name].[contenthash].chunk.css'
        : '[name].css',
    }),
    new ErrorOverlayPlugin(),
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin([{ from: 'public/resources' }]),
    new BrowserSyncPlugin({
      host: 'localhost',
      port: PORT,
      proxy: 'http://localhost:8080/',
      open: false,
    }),
  ],
}
