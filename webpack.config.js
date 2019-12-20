const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');

// SCSS loader for transpiling SCSS files to CSS
const scssLoader = {
  test: /\.(scss|css)$/,
  use: [
    "vue-style-loader",
    {
      loader: "css-loader",
      options: { modules: false }
    },
    "sass-loader"
  ]
};

// URL loader to resolve data-urls at build time
const urlLoader = {
  test: /\.(png|jpg|svg)$/,
  loader: "url-loader?limit=10000000000000000"
};

// // HTML load to allow us to import HTML templates into our JS files
// const htmlLoader = {
//     test: /\.html$/,
//     loader: 'html-loader'
// }

// Vue loader to resolve single file components
const vueLoader = {
  test: /\.vue$/,
  loader: "vue-loader"
};
const VueLoaderPlugin = require("vue-loader/lib/plugin");

const webpackConfig = {
  mode: "development",
  devtool: "source-map",
  output: {
    path: path.join(__dirname, "public"),
    filename: "js/main.js"
  },
  devServer: {
    contentBase: path.join(__dirname, "public/"),
    port: 80,
    open: "google-chrome",
    proxy: {
      "/observation": {
        target: {
          host: "localhost",
          port: 8080,
          protocol: "http"
        },
        changeOrigin: true,
        logLevel: "debug"
      }
    }
  },
  module: {
    rules: [scssLoader, urlLoader, vueLoader]
  },
  plugins: [
    new VueLoaderPlugin(),
    // new HtmlWebpackPlugin({
    //   template: path.join(__dirname, "public/index.html"),
    // })
    // new webpack.DefinePlugin({
    //   'process.env':{
    //     'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    //     'API_HOST': JSON.stringify(process.env.API_HOST)
    //   }
    // })
  ]
};
module.exports = webpackConfig;
