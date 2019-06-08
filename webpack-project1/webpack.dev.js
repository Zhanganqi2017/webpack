const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        index: './src/index.js',
        search: './src/search.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [{
            test: /.js$/,
            use: "babel-loader"
        }, {
            test: /\.css$/,
            use: ["style-loader", "css-loader"] // 先写 style-loader，后写 css-loader
        }, {
            test: /\.less$/,
            use: ["style-loader", "css-loader", "less-loader"]
        }, {
            test: /\.(jpg|png|jpeg|gif|svg)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 10240
                }
            }]
        }, {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            use: 'file-loader'
        }]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin()
    ],
    devServer: {
        contentBase: './dist',
        hot: true
    }
}