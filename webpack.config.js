const path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './src/index.js',
    watch: true,
    watchOptions: {
        ignored: /node_modules/
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            { test: /\.css$/, use: [ 'style-loader','css-loader' ]},
            { test: /\.(png|jpe?g|gif)$/i, use: [ 'file-loader' ]},
        ]
    },
};