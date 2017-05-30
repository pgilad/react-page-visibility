module.exports = {
    entry: './test/component-test.js',
    output: {
        filename: 'react-page-visibility.test.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }]
    },
    externals: {
        'cheerio': 'window',
        'jsdom': 'window',
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': 'window',
    },
    node: {
        fs: 'empty'
    }
};
