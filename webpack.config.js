const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

// SCSS loader for transpiling SCSS files to CSS
const scssLoader = {
  test: /\.(scss|css)$/,
  use: [
    "vue-style-loader",
    {
      loader: "css-loader",
      options: {
        modules: false,
        esModule: false
      }
    },
    "sass-loader"
  ]
};

// URL loader to resolve data-urls at build time
const urlLoader = {
  test: /\.(png|jpg|svg)$/,
  use:[{
    loader:"url-loader",
    options:{
      limit:10000,
      esModule:false,
      name:path.posix.join('static', '[name].[hash:7].[ext]')
    }
  }]
};

// Vue loader to resolve single file components
const vueLoader = {
  test: /\.vue$/,
  use:[
    {loader: "vue-loader"}
  ]
};
const { VueLoaderPlugin } = require('vue-loader');

const webpackConfig = {
  mode: "development",
  devtool: "eval-source-map",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "js/main.js",
    publicPath: "/"
  },
  devServer: {
    static: path.join(__dirname, "dist"),
    port: 80,
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
    rules: [vueLoader, scssLoader, urlLoader ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src/index.html"),
    })

  ]
};
module.exports = webpackConfig;
