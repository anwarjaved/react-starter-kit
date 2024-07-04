const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const paths = require("./paths");
const path = require("path");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Dotenv = require("dotenv-webpack");
const ESLintPlugin = require("eslint-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


require("dotenv").config();
const env = process.env;
var port = 9000;
var host = "localhost";
var fullUrl = "http://localhost:9000";
const config = {
  mode: "production",
  devtool: "source-map",
  output: {
    publicPath: "/public",
    filename: "[name].[contenthash].js",
    chunkFilename: "[name].[contenthash].js",
  },
  entry: {
    react: ["react", "react-dom"],
    redux: ["redux", "react-redux"],
    "react-router": ["history", "react-router", "react-router-dom"],
    app: [paths.appIndexJs],
  },
  performance: {
    maxEntrypointSize: 500000,
    hints: "warning",
	maxAssetSize: 500 * 1024	
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      minSize: 0,
    },    
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true, // Utilize multiple CPU cores for optimization
        terserOptions: {
          compress: {
            warnings: false, // Hide Terser warnings (potentially noisy)
            ecma: 2020, // Target latest supported ECMAScript version
            arrows: true,
            drop_console: true, // Remove console.log statements
            collapse_vars: true,
            comparisons: true,
            inline: 2, // Inline small functions for better minification
          },
          mangle: {
            safari10: true, // Support Safari 10+
          },
          output: {
            comments: false, // Remove comments except for license-related ones
          },
        },
      }),
      new CssMinimizerPlugin({
        // cssnano options (optional, see below)
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              implementation: require("sass"),
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        loader: "file-loader",
        options: {
          name: "images/[name]-[contenthash].[ext]",
        },
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: "file-loader",
        options: {
          name: "fonts/[name]-[contenthash].[ext]",
        },
      },
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
            babelrc: true,
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    plugins: [new TsconfigPathsPlugin()],
    alias: {
      "~": path.resolve("./node_modules"),
    },
  },
  plugins: [
    new Dotenv(),
    new ESLintPlugin(),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: paths.appHtml,
      inject: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NormalModuleReplacementPlugin(
      /environments\/environment/,
      "/environments/environment.prod"
    ),
    new BundleAnalyzerPlugin({
      // Optional analysis
      // Configuration
    }),
  ],
  devtool: "inline-source-map",
  output: {
    path: paths.appBuild,

    // the output bundle
    filename: "[name]-[contenthash].js",
    chunkFilename: "[name]-[chunkhash].js",

    // necessary for HMR to know where to load the hot update chunks
    publicPath: "/",
  },
};

module.exports = config;
