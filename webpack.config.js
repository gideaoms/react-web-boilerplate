const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
  entry: path.join(__dirname, 'src', 'index.js'),
  output: {
    path: path.join(__dirname, 'public'),
    filename: '[name][hash].js',
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Onvitri - Dashboard',
      template: 'public/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name][hash].css'
    })
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'all',
          name: 'vendor',
          test: /node_modules/,
          enforce: true
        }
      }
    }
  },
  resolve: {
    alias: {
      jquery: 'jquery/dist/jquery.slim.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.s?[ac]ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          { loader: 'css-loader' },
          {
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [require('autoprefixer')]
              }
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif|woff(2)?|ttf|eot|svg)$/,
        use: ['file-loader']
      }
    ]
  }
}
