const path = require("path");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: "./src/api/api.ts",
    mode: "development",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/
            }
        ]
    },
    devtool: false,
    resolve: {
        extensions: [ ".ts"],
        symlinks: false,
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: './src/appsscript.json' },
            { from: './src/.claspignore' },
            { from: './node_modules/radio-app-2-shared/lib/index.js', to: '../src/shared-lib.js'}
        ])
    ],
    output: {
        filename: "index.js",
        path: path.resolve(__dirname, "lib")
    }
};