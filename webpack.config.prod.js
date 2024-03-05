import path from "path";

const conf = [
  {
    performance: {
      maxEntrypointSize: 50000000,
      maxAssetSize: 50000000,
    },
    mode: "production",
    entry: "./src/BlueFoxJs/index.js",
    output: {
      path: `${process.cwd()}/dist/production`,
      filename: "bluefox.js",
    },
    resolve: {
      extensions: [".js"],
      alias: {
        BlueFoxJs: path.resolve(process.cwd(), "src/BlueFoxJs/"),
      },
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
    entry: "./src/BlueFoxJs/index.js",
    output: {
      path: `${process.cwd()}/dist/production`,
      filename: "bluefox.min.js",
    },
    resolve: {
      extensions: [".js"],
      alias: {
        BlueFoxJs: path.resolve(process.cwd(), "src/BlueFoxJs/"),
      },
    },
  },
  {
    performance: {
      maxEntrypointSize: 50000000,
      maxAssetSize: 50000000,
    },
    mode: "production",
    entry: "./src/BlueFoxJs/bluefox.js",
    output: {
      path: `${process.cwd()}/dist/production`,
      filename: "bluefox.es.js",
      library: {
        type: "module",
      },
    },
    resolve: {
      extensions: [".js"],
      alias: {
        BlueFoxJs: path.resolve(process.cwd(), "src/BlueFoxJs/"),
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
    entry: "./src/BlueFoxJs/bluefox.js",
    output: {
      path: `${process.cwd()}/dist/production`,
      filename: "bluefox.es.min.js",
      library: {
        type: "module",
      },
    },
    resolve: {
      extensions: [".js"],
      alias: {
        BlueFoxJs: path.resolve(process.cwd(), "src/BlueFoxJs/"),
      },
    },
    experiments: {
      outputModule: true,
    },
  },
];
export { conf as default };
