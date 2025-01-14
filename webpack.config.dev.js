import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
const outputPath = path.resolve(process.cwd(), "dist");

const conf = {
  performance: {
    maxEntrypointSize: 50000000,
    maxAssetSize: 50000000,
  },
  mode: "production",
  entry: "./src/BlueFoxJs/index.js",
  output: {
    path: `${process.cwd()}/dist/develop`,
    filename: "bluefox-js.js",
  },
  resolve: {
    extensions: [".js"],
    alias: {
      BlueFoxJs: path.resolve(process.cwd(), "src/BlueFoxJs/"),
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
  optimization: {
    minimize: false,
  },
};
export { conf as default };

