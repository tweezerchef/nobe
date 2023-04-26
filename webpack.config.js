const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: "./client/src/index.tsx",
  output: {
    filename: "main.js",
    path: path.resolve("./client", "build"),
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join("./client", "public", "index.html"),
    }),  new Dotenv(),
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