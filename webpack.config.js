const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry : {
        filename: './src/atlas.main.js'
    } , 
    output : {
        path: path.resolve(__dirname , './src/'),
        filename: 'atlas.build.min.js',
    },
    module : {
        rules: [
            {
                test: /\.JS$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: [
                        ['es2015' , {modules: false}]
                    ]
                }
            }
        ]
    }
}