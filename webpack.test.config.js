module.exports = {
    entry: './test/component-test.js',
    output: {
        filename: 'react-page-visibility.test.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: ['react', 'es2015']
            }
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
