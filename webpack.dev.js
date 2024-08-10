const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devtool: "eval-cheap-module-source-map",
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
    compress: true,
    port: 9000,
    historyApiFallback: true,
  },
  optimization: {
    // runtimeChunk: true,
    // removeAvailableModules: false,
    // removeEmptyChunks: false,
    // splitChunks: false,
  },
});
