var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var extractCSS = new ExtractTextPlugin('css/[name].css');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: ['babel-polyfill', path.normalize(__dirname + '/src/js/main')],
    devtool: 'cheap-module-source-map',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist')
    },
    module: {
        loaders: [
            {
                loader: 'babel',
                test: /\.js$/,
                include: [path.resolve(__dirname, 'src', 'js')],
                query: {
                    plugins: ['transform-runtime'],
                    presets: ['es2015']
                }
            },
            {
                test: /\.scss$/i, 
                loader: extractCSS.extract(['css','sass'])
            },
        ]        
            },
    plugins: [
        extractCSS,
        new UglifyJsPlugin()        
    ]
};
