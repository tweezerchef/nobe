const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require('dotenv-webpack')
const webpack = require('webpack');

module.exports = {
  entry: "./client/src/index.tsx",
  output: {
    filename: "main.js",
    path: path.resolve("./client", "build"),
    publicPath: '/',
  },
  devtool: 'eval-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join("./client", "public", "index.html"),
    }),  new Dotenv(),  new webpack.IgnorePlugin({ resourceRegExp: /The component styled\.div with the id of/ }),
  ],
  devServer: {
    static: {
      directory: path.join("./client", "build"),
    },
    port: 3000,
  },
  module: {
    // exclude node_modules
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(ts|tsx)$/,
        loader: "ts-loader"
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ],
  },
  // pass all js files through Babel
  resolve: {
    extensions: [".*", ".js", ".jsx", ".ts", ".tsx"],
  },
  watch: true, // watch for changes and re-run
};