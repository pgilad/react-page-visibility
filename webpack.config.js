module.exports = {
    devtool: 'source-map',
    entry: './src',
    output: {
        filename: 'react-page-visibility.js',
        library: 'react-page-visibility',
        libraryTarget: 'umd',
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
        }]
    }
};
