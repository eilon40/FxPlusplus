const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: {
		main: './src/main.js',
		serviceWorker: './src/serviceWorker.js'
	},
	output: {
		filename: '[name].bundle.js', 
		path: path.resolve(__dirname, 'dist'),
		clean: true
	},
	mode: 'production',//'development',
	devtool: 'cheap-module-source-map',
	watch: true,
	plugins: [
		new CopyWebpackPlugin({
			patterns: [{from: 'static'}]
		})
	]
}
//[name].
