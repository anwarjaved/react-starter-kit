const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const paths = require("./paths");
const path = require("path");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const fs = require('fs-extra');
const ESLintPlugin = require('eslint-webpack-plugin');
require("dotenv").config();
const env = process.env;

// Function to load filenames from JSON file
const loadFilenamesFromFile = (filePath) => {
	const fullPath = paths.resolveApp(filePath);
	try {
	  const fileContent = fs.readFileSync(fullPath, 'utf8');
	  return JSON.parse(fileContent);
	} catch (error) {
	  console.error(`Error reading file ${filePath}: ${error}`);
	  return [];
	}
  };
  
  // Load filenames from the JSON file
  const fileReplacements = loadFilenamesFromFile('replacements.json');

  function canReplace(searchString) {
    for (const item of fileReplacements) {
		
        if (searchString.indexOf(item) !== -1) {
            return [true, item];
        }
    }
    return [false, null];
}

const product = env.PRODUCT;
const config = {
  mode: "development",
  devtool: "eval-cheap-module-source-map",
  output: {
    publicPath: "/public",
  },
  entry: {
    react: ["react", "react-dom"],
    redux: ["redux", "react-redux", "@reduxjs/toolkit", "redux-logger"],
    "react-router": ["history", "react-router", "react-router-dom"],
    app: [paths.appIndexJs],
  },
  output: {
    // the output bundle
    filename: "[name]-[contenthash].js",
    chunkFilename: "[name]-[chunkhash].js",

    // necessary for HMR to know where to load the hot update chunks
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        exclude: /node_modules/,
        use: [
          "style-loader",
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
          name: "fonts/[name]-[hash].[ext]",
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
            cacheCompression: false,
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
    new NodePolyfillPlugin(),
	new webpack.NormalModuleReplacementPlugin(
		// Specify a regular expression that matches any request for files under the 'src' folder
		/src[\\/].+/,
		function (resource) {
			var result = canReplace(resource.request);

			if(result[0])
			{
				const fileName = product + "/" + result[1];
				const filePath = "@src/" + fileName;
				if(paths.CheckSourceFileExist(product + "\\" + result[1]))
				{
					console.log(filePath);
					resource.request = `src/${product}/${result[1]}`;
				}
			
				
			}

		}),

    // new ForkTsCheckerWebpackPlugin({
    //   typescript: {
    //     diagnosticOptions: {
    //       semantic: true,
    //       syntactic: true,
    //     },
    //   },
    // }),

    new HtmlWebpackPlugin({
      template: paths.appHtml,
      inject: true,
      meta: {
        referrer: "strict-origin-when-cross-origin",
      },
    }),
    new ReactRefreshWebpackPlugin(),
  ],
  devServer: {
    historyApiFallback: true,
    port: 9002,
    open: true,
	compress: true,
    hot: true,
    host: "localhost",
    server: 'https',
    static: {
      directory: paths.appPublic,
    },
  },
};

module.exports = config;
