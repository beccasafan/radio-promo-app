const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require("path");
const webpack = require("webpack");
const renameOutputPlugin = require('rename-output-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    //mode: 'development',
    entry: {
        "index": "./code/client/src/index.tsx",
    },
    output: {
        filename: "[name].js",
        path: __dirname + "/code/client/dist"
    },

    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        new HtmlWebpackPlugin({
            inject: false,
            template: require('html-webpack-template'),
            bodyHtmlSnippet: "<script async src=\"https://www.googletagmanager.com/gtag/js?id=UA-135674787-1\"></script><script>window.dataLayer = window.dataLayer || []; function gtag() { dataLayer.push(arguments); } gtag('js', new Date()); gtag('config', 'UA-135674787-1');</script><div id=\"root\"></div>",
            baseHref: 'https://beccasafan.github.io/radio-promo-app/code/client/dist/',
            title: "Radio Request Database - Louis",
            hash: true,
            links: [
                "https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css",
                "https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.5/css/select2.min.css",
                "https://beccasafan.github.io/radio-promo-app/code/client/dist/index.css",
                "https://use.fontawesome.com/releases/v5.7.2/css/all.css"
            ],
            scripts: [
                "https://code.jquery.com/jquery-3.3.1.slim.min.js",
                "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js",
                "https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js",
                "https://unpkg.com/react@16/umd/react.production.min.js",
                "https://unpkg.com/react-dom@16/umd/react-dom.production.min.js",
                "https://unpkg.com/react-dom@16/umd/react-dom-server.browser.production.min.js",
                "https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.5/js/select2.full.min.js",
            ]
        }),
        /*new CopyPlugin([
            { from: __dirname + '\\code\\client\\dist\\index_bundle.js', to: 'index_bundle.js.html' },
          ]),*/
        /*new renameOutputPlugin({
            'index': 'index_bundle.js.html',
            'index': 'index_bundle.js'
        })*/
    ],

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        //"root": [path.resolve("./code")],
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            {
                test: /\.js?$/,
                use: ['babel-loader', 'source-map-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.tsx?$/,
                use: ['babel-loader', 'ts-loader'],
            },
            {
                test: /\.(s?)css$/,
                exclude: /node-modules/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options:
                        {
                            publicPath: path.resolve(__dirname, './dist')
                        }
                    },
                    //{ loader: "style-loader" },
                    {
                        loader: 'typings-for-css-modules-loader',
                        options:
                        {
                            importLoaders: 1,
                            modules: true,
                            namedExport: true,
                            camelCase: true,
                            localIdentName: '[local]', //'[name]_[local][hash:base64:5]',
                            banner: "// *** Generated File - Do not Edit ***"
                        }
                    },
                    //{loader: "css-loader"},
                    {
                        loader: "sass-loader",
                        options:
                        {
                            localIdenTName: '[local]',
                            sourceMap: true,
                            modules: false
                        }
                    }
                ]
            }
            //{test: /\.css$/, loader: 'typings-for-css-modules-loader?modules&namedExport&camelCase' }
            /*{
                test: /\.s?css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // you can specify a publicPath here
                            // by default it use publicPath in webpackOptions.output
                            publicPath: '../'
                        }
                    },
                    //'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }*/
        ]
        /*rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: ["babel-loader", "ts-loader"]
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: ["babel"]
            },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { 
                enforce: "pre", 
                test: /\.js$/, 
                loader: "source-map-loader" 
            }
        ]*/
        /*loaders: [
            {
                "test": /\.tsx?$/,
                "loaders": ["babel-loader", "ts-loader"],
                "exclude": [/node_modules/]
            },
            {
                "test": /\.(jsx?)$/,
                "loaders": ["babel"],
                "exclude": [/node_modules/]
            }
        ]*/
    },

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        "react": "React",
        "react-dom": "ReactDOM",
        "react-dom/server": "ReactDOMServer",
        "bootstrap": "bootstrap",
        "jquery": "jQuery"
    }
};