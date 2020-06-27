const HtmlWebpackPlugin = require("html-webpack-plugin");

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = env => {
	return {
		mode: 'none',
		entry: {
			source: ['@babel/polyfill', './main.js',],
		},
		output: {
			filename: '[name].bundle.js',
			path: path.resolve(__dirname, 'dist')
		},
		module: {
			rules: [
				{
					test: /\.html$/,
					loader: 'html-loader'
				},
				{
					test: /\.(png|jpg|gif|svg|ico)$/,
					loader: 'url-loader?name=img/[name].[ext]'
				},
				{
					test: /\.js$/,
					exclude: /node_modules/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: [['@babel/preset-env']]
						}
					}
				},
				{
					test: /\.tsx?$/,
					use: [
						{ loader: 'cache-loader' },
						{
							loader: 'thread-loader',
							options: {
								workers: require('os').cpus().length - 1,
							},
						},
						{
							loader: 'ts-loader',
							options: {
								happyPackMode: true
							}
						}
					]
				},
				{
					test: /\.s?css$/,
					use: [
						MiniCssExtractPlugin.loader,
						{
							loader: 'css-loader',
							options: {
								url: true,
								sourceMap: true,
								minimize: true
							}
						},
						{
							loader: 'sass-loader',
							options: { sourceMap: true }
						}
					]
				}
			]
		},
		resolve: {
			extensions: ['.ts', '.js', '.css'],
			modules: [
				'node_modules',
				path.resolve('./')
			]
		},
		plugins: [
			new webpack.DefinePlugin({
				'process.env.NODE_ENV': JSON.stringify(env.NODE_ENV)
			}),
			new webpack.NoEmitOnErrorsPlugin(),
			new MiniCssExtractPlugin({ filename: '[name].bundle.css' }),
			new CopyWebpackPlugin([{
				from: path.join(__dirname, 'copyFolder'),
				to: './copiedFolder'
			}]),
			new ForkTsCheckerWebpackPlugin({ checkSyntacticErrors: true }),
			new HtmlWebpackPlugin({template: './index.html'}),
		],
		stats: {
			colors: true
		},
		devtool: env.NODE_ENV === 'dev' ? 'inline-source-map' : 'source-map',
		devServer: {
			contentBase: path.resolve(__dirname, 'dist'),
			compress: true,
			port: 3060,
			proxy: {
				'/api': 'http://localhost:3000',
			},
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
				'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type, Cache-Control',
			}
		}
	}
};