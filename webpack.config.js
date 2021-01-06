const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const paths = {
  src: path.join(__dirname, "src"),
  dist: path.join(__dirname, "dist"),
};

module.exports = {
  context: paths.src,
  entry: ["./app.js", "./main.scss"],
  output: {
    filename: "app.bundle.js",
    path: paths.dist,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "main.bundle.css",
    }),
    new HtmlWebpackPlugin({
      template: path.join(paths.src, "index.html"),
    }),
  ],
  devServer: {
    contentBase: paths.dist,
    compress: true,
    port: 9999,
    hot: true,
  },
};
