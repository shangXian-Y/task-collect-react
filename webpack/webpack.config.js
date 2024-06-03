const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // context: path.resolve(__dirname, '../src/index.tsx'),
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'main.js',
  },
  devServer: {
    static: {
      directory: path.join(__dirname, '../dist'),
    },
    // compress: true,
    port: 9000,
    open: true,
    hot: true,
  },
  plugins: [
    // 配置
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html'
    })
  ],
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          caller: 'web',
          // cacheDirectory: 'development',
        },
      },
      // {
      //   test: /\.(woff2?|eot|ttf|otf)$/i,
      //   type: 'asset',
      //   generator: { emit: isWeb },
      // },
      // {
      //   test: /\.(png|svg|jpe?g|gif)$/i,
      //   type: 'asset',
      //   generator: { emit: isWeb },
      // },
    ],
  },
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  },
};