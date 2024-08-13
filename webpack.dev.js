const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const path = require("path");

module.exports = merge(common, {
  mode: "development",
  devtool: "eval-cheap-module-source-map",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader", // style-loader is ideal for development because it injects CSS directly into the DOM, allowing for quick updates and easy debugging.
          "css-loader",
          "postcss-loader",
        ],
        exclude: /node_modules/,
      },
    ],
  },
  devServer: {
    hot: true, // Enables Hot Module Replacement
    open: true, // Automatically opens the browser when the server starts
    compress: true, // Enables gzip compression for everything served
    port: 9000,
    historyApiFallback: true, // Enables support for HTML5 history API based routing by serving the index.html file for all 404 routes.
    static: {
      directory: path.join(__dirname, "public"), // Directory in which all static files are served from
    },
  },
  optimization: {
    // runtimeChunk: true,
    // removeAvailableModules: false,
    // removeEmptyChunks: false,
    // splitChunks: false,
  },
});
