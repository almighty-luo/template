const { VueLoaderPlugin } = require('vue-loader')
const htmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 压缩css
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const { DefinePlugin } = require('webpack')
const { resolve } = require('path')
const { NODE_ENV } = process.env
let { parsed } = require('dotenv').config({ path: `${NODE_ENV === 'pro' ? '' : NODE_ENV}.env` })
parsed = Object.assign({ NODE_ENV }, parsed)
const definePluginData = {}
Object.keys(parsed).forEach(key => definePluginData[key] = JSON.stringify(parsed[key]))
module.exports = {
    mode: 'production',
    entry: resolve(process.cwd(), 'src', 'index.js'),
    output: {
        path: resolve(process.cwd(), 'dist'),
        asyncChunks: true,
        filename: 'js/[name].[contenthash].js'
    },
    resolve: {
        alias: {
            "@": resolve(process.cwd(), 'src')
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_moduels/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.vue$/,
                exclude: /node_moduels/,
                use: {
                    loader: 'vue-loader'
                }
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: '[name]_[contenthash].[ext]',
                        outputPath: 'images',
                        limit: 1024 * 5 //让500kb一下的转base64
                    }
                }
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.svg$/,
                use: ['svg-sprite-loader', 'svgo-loader']
            }
        ]
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            name: 'common'
        },
        minimize: true
    },
    plugins: [
        // CleanWebpackPlugin必须要配置output才生效
        new MiniCssExtractPlugin({
            filename: 'styes/[name]_[contenthash].css'
        }),
        new VueLoaderPlugin(),
        new htmlWebpackPlugin({
            template: 'index.html'
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: resolve(process.cwd(), 'public'), // 不打包直接输出的文件
                    to: resolve(process.cwd(), 'dist') // 打包后静态文件放置位置
                }
            ]
        }),
        new DefinePlugin(definePluginData),
        new CssMinimizerPlugin()
    ]
}