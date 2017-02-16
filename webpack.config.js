const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

// PLUGINS
// configuration for the extraction of css
const extractSassPluginConfig = new ExtractTextPlugin({
  filename: 'style.css',
});

const UglifyJsPluginConfig = new webpack.optimize.UglifyJsPlugin({
  // leave code alone due to lack of source map for debugging
  compress: false,
  mangle: false,
  beautify: true,
});

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  filename: 'previewer.html',
  template: '../src/index.ejs',
});

// MODULES
// configuration rules for the processing of javascript files
const javascriptModuleRule = {
  test: /\.(js|jsx)$/,
  exclude: /(node_modules)/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: ['es2015', 'react'],
    },
  },
};

// configuration rules for the processing of SCSS files
const scssModuleRule = {
  test: /\.scss$/,
  exclude: /(node_modules)/,
  use: extractSassPluginConfig.extract({
    use: [
      { loader: 'css-loader' },
      { loader: 'sass-loader' },
    ],
    fallback: 'style-loader',
  }),
};

// webpack configuration
module.exports = {
  context: path.join(__dirname, '/src'),
  devtool: false,
  entry: './index.jsx',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'app.min.js',
  },
  module: {
    rules: [javascriptModuleRule, scssModuleRule],
  },
  plugins: [
    extractSassPluginConfig,
    UglifyJsPluginConfig,
    HtmlWebpackPluginConfig,
  ],
};
