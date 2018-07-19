/**
 * base webpack配置
 */
const path = require('path');
const webpack = require('webpack');
const devMode = process.env.NODE_ENV !== 'production';
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

process.noDeprecation = true;

module.exports = options => ({
  mode: options.mode,
  entry: options.entry,
  output: Object.assign(
    {
      path: path.resolve(process.cwd(), 'dest'),
      publicPath: '/',
    },
    options.output,
  ), 
  // Merge
  optimization: options.optimization,
  module: {
    rules: [
      {
        // Babel Transform 所有js
        test: /\.js$/, 
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: options.babelQuery,
        },
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [{
          loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader
        }, {
          loader:  'css-loader',
          options: {
            modules: true,
            sourceMap: devMode ? true : false
          }
        }, {
          loader:  'sass-loader',
          options: {
            includePaths: [path.resolve(process.cwd(), 'app')],
            outputStyle: 'compressed' //nested, expanded, compact, compressed
          }
        }],
      },

      {
        test: /\.(eot|otf|ttf|woff|woff2)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: 'styles/font/[name].[ext]?[hash:4]',
          }
        }],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-url-loader',
            options: {
              limit: 10 * 1024,
              noquotes: true,
            },
          },
        ],
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10 * 1024,
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                enabled: false,
              },
              gifsicle: {
                interlaced: false,
              },
              optipng: {
                optimizationLevel: 7,
              },
              pngquant: {
                quality: '65-90',
                speed: 4,
              },
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: 'html-loader',
      },
      {
        test: /\.(mp4|webm)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
          },
        },
      },
    ],
  },
  plugins: options.plugins.concat([
    new webpack.ProvidePlugin({
      fetch: 'exports-loader?self.fetch!whatwg-fetch',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new MiniCssExtractPlugin({
      filename: 'styles/[name].[hash:4].css',
      chunkFilename: 'styles/[name].[hash:4].css',
    })
  ]),
  resolve: {
    modules: ['node_modules', 'app'],
    extensions: ['.js', '.jsx', '.react.js', '.scss', '.eot', '.ttf', '.svg', '.woff'],
    mainFields: ['browser', 'jsnext:main', 'main'],
  },
  devtool: options.devtool,
  target: 'web',
  performance: options.performance || {},
});
