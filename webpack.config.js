const path = require('path');
var webpack = require('webpack');
var Ex = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');


var config = {
    entry: {
        "common":['./src/page/common/index.js'],
        "index":['./src/page/index/index.js'],
        "login":['./src/page/login/index.js']
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'js/[name].js'
    },
    module: {
      loaders: [{
        test: /\.css/,
        loader:
        Ex.extract({fallback: "style-loader",use: "css-loader"})
        //loader: Ex.extract('style-loader', 'css-loader')  // 单独打包出CSS，这里配置注意下
        //loader: "style-loader!css-loader"  // 单独打包出CSS，这里配置注意下
      }]
    },
    externals:{
      'jquery' : 'window.jQuery'
    },
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        name: 'common',
        filename : 'js/base.js'
      }),
      new Ex("css/[name].css"),
      new HtmlWebpackPlugin({
          template : './src/view/index.html',
          filename : 'view/index.html',
          inject : true,
          hash : true,
          trunks : ['common','index']

      })
    ]
  };

  module.exports = config;