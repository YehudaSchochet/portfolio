const path = require('path');
const json5 = require('json5');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const TerserPlugin = require("terser-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  mode: "production",
  devtool:"source-map",
  optimization: {
    minimizer: [new TerserPlugin({ extractComments: false })],
    splitChunks:{
      chunks:'all'
    }
  },
  target: ['web', 'es5'],
  entry: {
    app: './src/index.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),

    new ESLintPlugin(),
    new CompressionPlugin()
    ],
  performance: {
    hints: false,
  },

  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset'/*,
        parser: {
          dataUrlCondition: {
            maxSize: 20 * 1024,
          }
        }*/
      },
      {
        test: /\.json5$/i,
        type: 'json',
        parser: {
          parse: json5.parse,
        }
      },
      {
        test: /\.(csv|tsv)$/i,
        use: ['csv-loader']
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};