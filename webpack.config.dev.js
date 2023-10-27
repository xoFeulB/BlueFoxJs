const path = require("path");
const outputPath = path.resolve(__dirname, "dist");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "production",
  entry: "./src/BlueFoxJs/index.js",
  output: {
    path: `${__dirname}/dist/develop`,
    filename: "bluefox.js",
  },
  resolve: {
    extensions: [".js"],
    alias: {
      BlueFoxJs: path.resolve(__dirname, "src/BlueFoxJs/"),
    },
  },
  devServer: {
    watchFiles: ["./src/dev/index.html"],
    static: outputPath,
    hot: true,
    liveReload: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/dev/index.html",
      filename: "index.html",
    }),
  ],
};
