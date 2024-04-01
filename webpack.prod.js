const path = require('path');

const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const {cssExtractPlugin} = require('mini-css-extract-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


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
        ]
    },
    devtool: false,
    plugins: [new MiniCssExtractPlugin({
        filename: "[name].[contenthash].css"
    })]
});
  