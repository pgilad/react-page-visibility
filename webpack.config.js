const path = require('path');
const webpack = require('webpack');

const src = path.join(__dirname, 'src');

module.exports = {
    devtool: 'source-map',
    entry: src,
    output: {
        filename: 'react-page-visibility.js',
        library: 'react-page-visibility',
        libraryTarget: 'umd',
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }]
    },
    externals: {
        'prop-types': 'prop-types',
        react: {
            root: 'React',
            commonjs2: 'react',
            commonjs: 'react',
            amd: 'react'
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        })
    ]
};
