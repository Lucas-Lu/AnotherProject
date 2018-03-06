const path = require('path');
var webpack = require('webpack');
var Ex = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var getHtmlConfig = function(name){
  return {
    template : './src/view/' + name + '.html',
    filename : 'view/' + name + '.html',
    inject : true,
    hash : true,
    chunks : ['common',name]
  };
};

var config = {
    entry: {
        "common":['./src/page/common/index.js','webpack-dev-server/client?http://localhost:8088'],
        "index":['./src/page/index/index.js'],
        "login":['./src/page/login/index.js']
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      publishPath: '/dist',
      filename: 'js/[name].js'
    },
    module: {
      loaders: [{test: /\.css/,loader:Ex.extract({fallback: "style-loader",use: "css-loader"})
        //loader: Ex.extract('style-loader', 'css-loader')  // 单独打包出CSS，这里配置注意下
        //loader: "style-loader!css-loader"  // 单独打包出CSS，这里配置注意下
      },
      { test: /\.(gif|png|jpg|woff|svg|eto|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resourcer/[name].[ext]'}
      ] 
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
      new HtmlWebpackPlugin(getHtmlConfig('index')),
      new HtmlWebpackPlugin(getHtmlConfig('login')),
    ]
  };

  module.exports = config;