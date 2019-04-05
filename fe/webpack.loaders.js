const path = require('path');

module.exports = [{
	test: /\.jsx?$/,
	exclude: /(node_modules\/)/,
	loader: 'babel-loader',
},
{
	test: /\.css$/,
	loaders: ['style-loader', 'css-loader?importLoaders=1'],
	exclude: ['node_modules'],
},
{
	test: /\.(png|jpg|gif|jpeg|ico|svg)$/,
	exclude: /(node_modules|bower_components)/,
	loader: 'url-loader',
},
];
