const path = require('path');
const glob = require("glob");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
    ],
  },
  entry: glob.sync("./src/*.js").reduce((acc, path) => {
    const entry = path.slice(path.lastIndexOf('/') + 1, path.length).replace('.js', '')
    acc[entry] = path
    return acc
  }, {}),
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'assets')
  },
  plugins: [new MiniCssExtractPlugin({
    filename: (pathData) => {
      return pathData.chunk.name === 'index' ? 'shopify-accelerator.css' : '[name].css';
    }
  })]
};