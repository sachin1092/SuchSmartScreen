var webpack = require('webpack')
var config = require('./webpack.config.js')
var path = require('path')

config.entry.push('webpack-hot-middleware/client?reload=true')

config.devtool = 'source-map';

config.plugins = [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin()
];

module.exports = config;
