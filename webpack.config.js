//const path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");


var config = {
    entry: {
        "common":['./src/page/common/index.js'],
        "index":['./src/page/index/index.js'],
        "login":['./src/page/login/index.js']
    },
    output: {
      path: '/dist',//path.resolve(__dirname, 'dist'),
      filename: 'js/[name].js'
    },
    module:{
      loaders:[
        { test: /\.css$/, loaders: ExtractTextPlugin.extract("style-loader","css-loader")}
      ]
    },
    externals:{
      'jquery' : 'window.jQuery'
    },
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        name: 'commons',
        filename : 'js/base.js'
      }),
      new ExtractTextPlugin("css/[name].css"), 
    ]
  };

  module.exports = config;