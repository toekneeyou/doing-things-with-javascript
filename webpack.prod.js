const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const TerserPlugin = require("terser-webpack-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(common, {
  mode: "production",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, // Extracts CSS into separate files for better caching and parallel loading.
          "css-loader", // Resolves imports and URL references in CSS.
          "postcss-loader", // Applies PostCSS transformations (e.g., autoprefixing).
        ],
        exclude: /node_modules/,
      },
    ],
  },

  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin(), // minimizes JS with terser. Use only in prod
      new BundleAnalyzerPlugin(), // used for bundle analysis
      new MiniCssExtractPlugin(), // Extracts CSS into separate files for better caching and parallel loading.
    ],
    splitChunks: {
      chunks: "all", // Apply to all chunks (async and non-async)
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          name: "vendors",
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
          chunks: "all", // Apply to all chunks
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
});
