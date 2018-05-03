var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var path = require('path');
var nodeEnv	= process.env.NODE_ENV;
var css  = nodeEnv === 'production' ? 'css' : 'css?sourceMap';

module.exports = {
	resolve: {
		modulesDirectories: ["node_modules", "components", "responses"],
		extensions: ['', '.js', '.jsx']
	},

	entry: [
		'./components/routes.jsx'
	],

	output: {
		path: __dirname + "/build",
		filename: "bundle.js",
		publicPath: "/build/"
	},

	plugins: [
		new webpack.NoErrorsPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin()
	],

	module: {
		loaders: [
			{
				test: /\.js.*$/,
				loaders: ['babel?presets[]=es2015,presets[]=stage-0,presets[]=react,plugins[]=transform-runtime'],
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				loaders: ['style', 'css', 'postcss']
			},
			{
				test: /\.(otf|svg|eot|woff|woff2|ttf|jpg|png|gif)$/,
				loaders: ['file-loader']
			},
			{
				test: /\.json$/,
				loaders: ['json']
			}
		]
	},

	postcss: function() {
		return [autoprefixer]
	}
};
