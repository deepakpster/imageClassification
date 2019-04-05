const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const loaders = require('./webpack.loaders');

const BUILD_DIR = path.resolve(__dirname, 'dist');
const APP_DIR = path.resolve(__dirname, 'src/js');

loaders.push({
	test: /\.scss$/,
	loader: ExtractTextPlugin.extract({
		fallback: 'style-loader',
		use: ['css-loader?sourceMap&localIdentName=[local]___[hash:base64:5]!sass-loader?outputStyle=expanded', {
			loader: 'sass-resources-loader',
			options: {
				resources: ['src/scss/_variables.scss'],
			},
		}],
	}),
	exclude: ['node_modules'],
});

const config = {
	entry: {
		vendor: ['react', 'react-dom', 'superagent', 'moment'],
		app: ['babel-polyfill', `${APP_DIR}/index.jsx`],
	},
	output: {
		publicPath: '/',
		path: BUILD_DIR,
		filename: 'app-[chunkhash].js',
	},
	resolve: {
		extensions: ['.js', '.jsx'],
	},
	node: {
		fs: 'empty'
	},
	module: {
		loaders,
	},
	stats: 'errors-only',
	plugins: [
		new WebpackCleanupPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"',
			},
		}),
		new webpack.optimize.UglifyJsPlugin({
			mangle: true,
			compress: {
				warnings: false,
				pure_getters: true,
				unsafe: true,
				unsafe_comps: true,
				screw_ie8: true,
				drop_console: true,
				drop_debugger: true,
			},
			output: {
				comments: false,
			},
			exclude: [/\.min\.js$/gi],
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			filename: 'vendor-[chunkhash].js',
			minChunks: Infinity,
		}),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new ExtractTextPlugin({
			filename: 'style-[chunkhash].css',
			allChunks: true,
		}),
		new OptimizeCssAssetsPlugin({
			assetNameRegExp: /\.css$/g,
			cssProcessor: require('cssnano'),
			cssProcessorOptions: { discardComments: { removeAll: true } },
			canPrint: true,
		}),
		new HtmlWebpackPlugin({
			favicon: 'src/i/favicon.ico',
			template: 'src/template.ejs',
			files: {
				css: ['dist/style-[chunkhash].css'],
				js: ['dist/bundle-[chunkhash].js'],
			},
		}),
	],
};

module.exports = config;
