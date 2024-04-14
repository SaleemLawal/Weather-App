const path = require('path');

const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');


module.exports = merge(common, {
    mode: "production",
    output: {
        filename: "[name].[contenthash].js",
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: "./imgs/[name].[hash].[ext]",
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
        ],
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin(), // Minifies JavaScript
            new CssMinimizerPlugin(), // Minifies CSS
        ],
    },
    devtool: false,
    plugins: [new MiniCssExtractPlugin({
        filename: "[name].[contenthash].css"
    })]
});
  