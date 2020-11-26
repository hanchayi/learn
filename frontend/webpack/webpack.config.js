const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const packageName = 'test'

module.exports = {
//   mode: 'development',
  entry: {
      app: './src/index.js',
      print: './src/print.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].umd.js',
    // chunkLoading: 'jsonp',
    library: `${packageName}-[name]`,
    libraryTarget: 'umd',
    // chunkLoadingGlobal: `webpackJsonp_${packageName}`,
    chunkLoadTimeout: 140000
  },
  plugins:  [
    new HtmlWebpackPlugin({template: './src/index.html'}),
    new CleanWebpackPlugin(),
  ],
  optimization: {
    minimize: false
  }
};
