const path = require('path');
var webpack = require('webpack');
var Ex = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
//环境变量，dev/online 
var WEBPACK_ENV = process.env.WEBPACK_ENV || "dev";
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
        "common":['./src/page/common/index.js'],
        "index":['./src/page/index/index.js'],
        "login":['./src/page/login/index.js'],
        "weui":['./src/page/weui/example.js']
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/dist',
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
    resolve:{
      alias:{
        util : __dirname + '/src/util',
        page : __dirname + '/src/page',
        image : __dirname + '/src/image',
        service : __dirname + '/src/service',
      }
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
      new HtmlWebpackPlugin(getHtmlConfig('weui')),
    ]
  };

  if("dev" == WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8098/');
  }

  module.exports = config;