const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const getStyleLoaders = (isWeb, isLess) => {
  let loaders = [
    {
      loader: 'css-loader',
      options: {
        importLoaders: isLess ? 2 : 1,
        modules: {
          auto: true,
          exportOnlyLocals: !isWeb,
          localIdentName: "[hash:8]",
        },
      },
    },
    { loader: 'postcss-loader' },
  ];

  if (isWeb) loaders = [MiniCssExtractPlugin.loader, ...loaders];

  if (isLess) loaders = [...loaders, 'less-loader'];

  return loaders;
};

module.exports = {
  mode: "development",
  entry: {
    home: './src/module/home/index.tsx',
    login: './src/module/login/index.tsx'
  },
  output: {
    // path: path.resolve(__dirname, '../dist'), // __dirname 是在本文件目录下
    path: path.resolve(process.cwd(), 'dist'),
    filename: '[name]/[name].[hash:4].js',
  },
  devtool: 'inline-source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, '../dist'),
    },
    // compress: true,
    port: 9000,
    open: true,
    hot: true,
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          // compress: { drop_console: true }
        },
      }),
    ],
    // splitChunks: {
    //   chunks: 'all',
    // },
  },
  plugins: [
    new CleanWebpackPlugin(),
    // 配置
    new HtmlWebpackPlugin({
      title: 'home',
      template: './public/index.html',
      filename: 'home/index.html',
      chunks: ['home'],
      inject: true,
      // minify: {
      //   html5: true,
      //   collapsableWhitespace: true,
      //   preserveLineBreaks: false,
      //   minifyCSS: true,
      //   minifyJS: true,
      //   removeComments: false
      // }
    }),
    new HtmlWebpackPlugin({
      title: 'login',
      template: './public/index.html',
      filename: 'login/index.html',
      chunks: ['login'],
    }),
    new webpack.SourceMapDevToolPlugin({}),
    new MiniCssExtractPlugin({
      filename: '[name]/[name].css',
      chunkFilename: '[name]/[id].css'
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
        },
      },
      {
        test: /\.css$/,
        use: getStyleLoaders(true),
      },
      {
        test: /\.less$/,
        use: getStyleLoaders(true, true),
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: 'asset',
        generator: { emit: true },
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/i,
        type: 'asset',
        generator: { emit: true },
      },
    ],
  },
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  },
};