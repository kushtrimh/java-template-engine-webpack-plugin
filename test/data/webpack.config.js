const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const JavaTemplateEngineWebpackPlugin = require('../../index');

function webpackConfig(outputFilename, options) {
  return {
    mode: 'production',
    entry: path.resolve(__dirname, 'index.js'),
    output: {
      path: path.resolve(__dirname, '../dist'),
      filename: 'bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          exclude: /node_modules/,
          use: [MiniCssExtractPlugin.loader, 'css-loader']
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'bundle.css'
      }),
      new HtmlWebpackPlugin({
        filename: outputFilename,
        template: path.resolve(__dirname, 'index.html')
      }),
      new JavaTemplateEngineWebpackPlugin(HtmlWebpackPlugin, options)
    ]
  };
}

module.exports = webpackConfig;