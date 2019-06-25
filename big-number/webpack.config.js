const TerserPlugin = require("terser-webpack-plugin");
module.exports = {
    mode: "production",
    entry: {
        "large-number": "./src/index.js",
        "large-number.min": "./src/index.js"
    },
    output: {
        filename: "[name].js",
        library: "largeNumber", // 指定库的全局变量
        // libraryExport: "default",
        libraryTarget: "umd" // 支持库引入的方式
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                include: /\.min\.js$/, //使用正则匹配，当是 min 文件才压缩
            }),
        ],
    }
}