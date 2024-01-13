const path = require("path");

module.exports = [
  {
    performance: {
      maxEntrypointSize: 50000000,
      maxAssetSize: 50000000,
    },
    mode: "production",
    entry: "./src/BlueFoxJs/bluefox.core.js",
    output: {
      path: `${__dirname}/dist/production`,
      filename: "bluefox.core.es.js",
      library: {
        type: "module",
      },
    },
    resolve: {
      extensions: [".js"],
      alias: {
        BlueFoxJs: path.resolve(__dirname, "src/BlueFoxJs/"),
      },
    },
    experiments: {
      outputModule: true,
    },
    optimization: {
      minimize: false,
    },
  },
  {
    performance: {
      maxEntrypointSize: 50000000,
      maxAssetSize: 50000000,
    },
    mode: "production",
    entry: "./src/BlueFoxJs/bluefox.core.js",
    output: {
      path: `${__dirname}/dist/production`,
      filename: "bluefox.core.es.min.js",
      library: {
        type: "module",
      },
    },
    resolve: {
      extensions: [".js"],
      alias: {
        BlueFoxJs: path.resolve(__dirname, "src/BlueFoxJs/"),
      },
    },
    experiments: {
      outputModule: true,
    },
  },
];
