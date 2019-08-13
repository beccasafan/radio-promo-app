const path = require("path");

module.exports = {
    entry: "./src/index.ts",
    mode: "development",
    devtool: false,
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [ ".ts"],
        symlinks: false,
    },

    output: {
        filename: "index.js",
        path: path.resolve(__dirname, "lib")
    }
};