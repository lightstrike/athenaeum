const path = require('path');
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
const postCSSConfig = require('./postcss.config.js');
const get = require('lodash/get');

const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: path.resolve(__dirname, './src/public/index.html'),
  filename: 'index.html',
  inject: 'body'
});

module.exports = options => ({
  entry: options.entry,
  output: options.output,
  externals: options.externals,
  context: path.resolve(__dirname, 'src'),
  resolve: {
    modules: [
      path.resolve(__dirname, 'src'),
      'node_modules'
    ]
  },
  module: {
    rules: get(options, 'module.rules', []).concat([
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            // babel-loader will throw a deprecation warning
            // waiting for stable v7.0.0 to upgrade
            loader: 'babel-loader',
            options: { presets: [ 'react', 'es2015' ] }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader?importLoaders=3',
              options: {
                modules: true,
                localIdentName: '[name]__[local]___[hash:base64:5]',
                sourceMap: true
              }
            },
            {
              loader: 'postcss-loader?parser=postcss-scss',
              options: {
                postCSSConfig
              }
            },
            {
              loader: 'resolve-url-loader'
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
                sourceComments: true
              }
            }
          ]
        })
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/images/',
              publicPath: '/'
            }
          }
        ]
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/fonts/',
              publicPath: '/'
            }
          }
        ]
      }
    ])
  },
  plugins: get(options, 'plugins', []).concat([
    HTMLWebpackPluginConfig,
    new ExtractTextPlugin({
      filename: 'assets/styles.css',
      allChunks: true
    })
  ])
});