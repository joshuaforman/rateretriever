var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: "./src/js/client.js",
  output: {
    path: __dirname + "/src/",
    filename: "client.min.js"
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader'
      },
      {
            test: /\.json?$/,
            loader: 'json'
      },
      {
          test: /\.woff(2)?(\?[a-z0-9#=&.]+)?$/,
          loader: 'url?limit=10000&mimetype=application/font-woff'
      }, {
          test: /\.(ttf|eot|svg)(\?[a-z0-9#=&.]+)?$/,
          loader: 'file'
      }
    ]
  },
};
