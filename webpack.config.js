const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");
const dotenv = require("dotenv");
// call dotenv and it will return an Object with a parsed key
const env = dotenv.config().parsed;
const ESLintPlugin = require("eslint-webpack-plugin");
// reduce it to a nice object, the same as before
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: {
    vendor: [
      "react",
      "react-dom",
      "react-redux",
      "react-router",
      "react-router-dom",
      "redux",
    ],
    app: "./src/index.js",
  },
  output: {
    filename: "scripts/[name].js",
    chunkFilename: "scripts/[id].chunk.js",
    path: path.resolve(__dirname, "./build/dist"),
    publicPath: '/'
  },
  context: path.resolve(__dirname),
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public", "index.html"),
      favicon: "./public/favicon.ico",
      filename: "index.html",
      manifest: "./public/manifest.json",
    }),
    new CleanWebpackPlugin({ cleanOnceBeforeBuildPatterns: ["./build/*.*"] }),
    new webpack.DefinePlugin(envKeys),
    new webpack.ProgressPlugin({
      activeModules: false,
      entries: true,
      handler(percentage, message, ...args) {
        console.info(Math.round(percentage * 100) + "%", message, ...args);
      },
      modules: true,
      modulesCount: 5000,
      profile: false,
      dependencies: true,
      dependenciesCount: 10000,
      percentBy: null,
    }),
    new ESLintPlugin(),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "build"),
    },
    port: 3333,
    open: true,
    compress: true,
    historyApiFallback: true,
    client: {
      progress: true,
    },
  },
  module: {
    // exclude node_modules
    rules: [
      {
        test: /\.(js|jsx)$/, // <-- added `|jsx` here
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.scss$/,
        include: [path.resolve(__dirname, "src", "assets", "scss")],
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "svg-url-loader",
            options: {
              limit: 10000,
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: "file-loader",
        options: {
          name: "[path][name].[ext]",
        },
      },
    ],
  },
  resolve: {
    extensions: ["*", ".js", ".jsx", ".scss"],
    modules: ["node_modules", path.resolve("./src")],
  },
};
