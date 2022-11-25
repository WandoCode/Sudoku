const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const isProduction = process.env.NODE_ENV == 'production'

const config = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'assets/[name][ext]',
    clean: true,
  },
  devServer: {
    static: './dist',
    hot: true,
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      title: 'Custom template',
      template: 'index.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(eot|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset',
      },
      {
        test: /\.svg$/i,
        include: path.resolve(__dirname, ''),
        type: 'asset/resource',
        generator: {
          filename: 'assets/[name][ext]',
        },
      },
    ],
  },
}

module.exports = () => {
  if (isProduction) {
    config.mode = 'production'

    config.plugins.push(new MiniCssExtractPlugin())
  } else {
    config.mode = 'development'
  }
  return config
}
