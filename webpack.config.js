module.exports = {
	entry: "./js/main.js",
	output: {
		path: __dirname + "/public",
		filename: "bundle.js"
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exlude: /node_modules/,
				loader: "babel-loader",
				query: {
		        	presets: ['es2015']
		     	}
			}
		]
	}
}