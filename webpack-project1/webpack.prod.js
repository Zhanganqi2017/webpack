const glob = require('glob');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

const setMPA = () => {
    const entry = {};
    const htmlWebpackPlugin = [];
    const entryFiles = glob.sync(path.join(__dirname, './src/*/index.js'));
    //console.log("entryFiles", entryFiles);
    Object.keys(entryFiles).map((index) => {
        const entryFile = entryFiles[index];
        const match = entryFile.match(/src\/(.*)\/index\.js/);
        const pageName = match && match[1];
        entry[pageName] = entryFile;
        htmlWebpackPlugin.push(new HtmlWebpackPlugin({
            template: path.join(__dirname, `src/${pageName}/index.html`),
            filename: `${pageName}.html`,
            chunks: [pageName],
            inject: true,
            minify: {
                html5: true,
                collapseWhitespace: true,
                preserveLineBreaks: false,
                minifyCSS: true,
                minifyJS: true,
                removeComments: false
            }
        }))
    });
    return {
        entry,
        htmlWebpackPlugin
    }
}
const { entry, htmlWebpackPlugin } = setMPA();

module.exports = {
    mode: 'production',
    // mode: 'none',
    entry: entry,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name]_[chunkhash:8].js'
    },
    module: {
        rules: [{
            test: /.js$/,
            use: ["babel-loader"]
                //use: ["babel-loader", 'eslint-loader']
        }, {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, "css-loader"] // 先写 style-loader，后写 css-loader
        }, {
            test: /\.less$/,
            use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader", {
                loader: 'postcss-loader',
                options: {
                    plugins: () => [
                        require('autoprefixer')({
                            overrideBrowserslist: ['last 2 versions', '>1%', 'ios 7']
                        })
                    ]
                }
            }, {
                loader: 'px2rem-loader',
                options: {
                    remUnit: 75,
                    remPrecesion: 8
                }
            }]
        }, {
            test: /\.(jpg|png|jpeg|gif|svg)$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: '[name]_[hash:8][ext]'
                        // limit: 10240
                }
            }]
        }, {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: '[name]_[hash:8].[ext]'

                }
            }]
        }]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name]_[contenthash:8].css'
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano')
        }),
        new CleanWebpackPlugin(),
        new FriendlyErrorsWebpackPlugin()
        // new webpack.optimize.ModuleConcatenationPlugin()
    ].concat(htmlWebpackPlugin),
    optimization: {
        splitChunks: {
            minSize: 0,
            cacheGroups: {
                common: {
                    name: "commons",
                    chunks: "all",
                    minChunks: 2
                }
            }
        }
    },
    stats: "errors-only"
}