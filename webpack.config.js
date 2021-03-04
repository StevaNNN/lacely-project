/// requiring webpack to enable webpack built-in plugins
const webpack = require("webpack");

/// requiring webpack copy plugin
const CopyPlugin = require('copy-webpack-plugin');

/// requiring postcss plugin autoprefixer
const autoprefixer = require("autoprefixer");

/// requiring mini css extract plugin this is a must
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/// requiring html
const htmlWebPackPlugin = require('html-webpack-plugin');

/// node path defaults to root of projet "webpack-test-2"
const path = require('path');

module.exports = {
    /// making entry points for JS and SASS this is a must
    entry: [
        "./src/index.js",
        "./src/main.scss"
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: "css-loader", /// loading prefixed css from autoprefix
                        options: {
                            sourceMap: true,
                        }
                    },
                    {
                        loader: "postcss-loader" /// using postcss's plugin's onto compiled css
                    },
                    {
                        loader: "sass-loader",/// compiled sass
                        options: {
                            sourceMap: true,
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif|svg|webp)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: "assets/img/" + "[name].[ext]", /// storing img's into custom location
                        }
                    }
                ]
            },
            {
                test: /\.(ttf|otf|woff|woff2|eot)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: "assets/fonts/" + "[name].[ext]", /// storing font's into custom location
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader' /// loading html
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({ /// calling build-in webpack plugin to be able to use postcss plugins
            options: {
                postcss: [
                    autoprefixer()
                ]
            }
        }),
        new MiniCssExtractPlugin({
            filename: "bundle." + "[name].css", /// naming extracted css to custom name "bundle.main.css"
        }),
        new htmlWebPackPlugin({
            template: "./src/index.html", /// where is HTML placed into project
            favicon: './src/assets/img/favicon.ico', // inject favicon
            filename: "./index.html" // where to store html with plugin
        }),
        new htmlWebPackPlugin({
            template: "./src/quick-fix.html", /// where is HTML placed into project
            filename: "./quick-fix.html" // where to store html with plugin
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ],
    output: {
        path: path.resolve(__dirname, 'build'), /// where should files pack when you build "webpack"
        filename: 'bundle.main.js' /// naming transpiled js into custom name
    },
    devServer: {
        host: 'localhost',
        port: 9998,
        disableHostCheck: true
    }
};