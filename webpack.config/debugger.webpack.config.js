const { VueLoaderPlugin } = require('vue-loader')
const htmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { DefinePlugin } = require('webpack')
const { resolve } = require('path')
const fs = require('fs-extra')
const { NODE_ENV } = process.env
let { parsed } = require('dotenv').config({ path: `${NODE_ENV === 'pro' ? '' : NODE_ENV}.env` })
parsed = Object.assign({ NODE_ENV }, parsed)
const definePluginData = {}
Object.keys(parsed).forEach(key => definePluginData[key] = JSON.stringify(parsed[key]))
fs.removeSync(resolve(__dirname, 'dist'))
module.exports = {
    mode: 'development',
    entry: resolve(process.cwd(), 'src', 'index.js'),
    output: {
        path: resolve(process.cwd(), 'dist'),
        asyncChunks: true,
        filename: 'js/[name].[contenthash].js'
    },
    devtool: 'source-map',
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
                        outputPath: 'images'
                    }
                }
            },
            {
                test: /\.scss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.svg$/,
                use: [
                    'svg-sprite-loader',
                    'svgo-loader'
                ]
            }
        ]
    },
    plugins: [
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
        new DefinePlugin(definePluginData)
    ]
}