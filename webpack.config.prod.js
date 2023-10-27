const path = require("path");

module.exports = [
  {
    mode: "production",
    entry: "./src/BlueFoxJs/index.js",
    output: {
      path: `${__dirname}/dist/production`,
      filename: "bluefox.js",
    },
    resolve: {
      extensions: [".js"],
      alias: {
        BlueFoxJs: path.resolve(__dirname, "src/BlueFoxJs/"),
      },
    },
    optimization: {
      minimize: false,
    },
  },
  {
    mode: "production",
    entry: "./src/BlueFoxJs/index.js",
    output: {
      path: `${__dirname}/dist/production`,
      filename: "bluefox.min.js",
    },
    resolve: {
      extensions: [".js"],
      alias: {
        BlueFoxJs: path.resolve(__dirname, "src/BlueFoxJs/"),
      },
    },
  },
  {
    mode: "production",
    entry: "./src/BlueFoxJs/bluefox.js",
    output: {
      path: `${__dirname}/dist/production`,
      filename: "bluefox.es.js",
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
    mode: "production",
    entry: "./src/BlueFoxJs/bluefox.js",
    output: {
      path: `${__dirname}/dist/production`,
      filename: "bluefox.es.min.js",
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
