const path = require("path");

module.exports = [
  {
    mode: "production",
    entry: "./src/BlueFoxQuery/index.js",
    output: {
      path: `${__dirname}/dist/production`,
      filename: "bluefox.query.js",
    },
    resolve: {
      extensions: [".js"],
      alias: {
        BlueFoxQuery: path.resolve(__dirname, "src/BlueFoxQuery/"),
      },
    },
    optimization: {
      minimize: false,
    },
  },
  {
    mode: "production",
    entry: "./src/BlueFoxQuery/index.js",
    output: {
      path: `${__dirname}/dist/production`,
      filename: "bluefox.query.min.js",
    },
    resolve: {
      extensions: [".js"],
      alias: {
        BlueFoxQuery: path.resolve(__dirname, "src/BlueFoxQuery/"),
      },
    },
  },
  {
    mode: "production",
    entry: "./src/BlueFoxQuery/bluefox.query.js",
    output: {
      path: `${__dirname}/dist/production`,
      filename: "bluefox.query.es.js",
      library: {
        type: "module",
      },
    },
    resolve: {
      extensions: [".js"],
      alias: {
        BlueFoxQuery: path.resolve(__dirname, "src/BlueFoxQuery/"),
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
    entry: "./src/BlueFoxQuery/bluefox.query.js",
    output: {
      path: `${__dirname}/dist/production`,
      filename: "bluefox.query.es.min.js",
      library: {
        type: "module",
      },
    },
    resolve: {
      extensions: [".js"],
      alias: {
        BlueFoxQuery: path.resolve(__dirname, "src/BlueFoxQuery/"),
      },
    },
    experiments: {
      outputModule: true,
    },
  },
];
