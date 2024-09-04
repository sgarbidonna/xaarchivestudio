const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: '/public/3Dconfiguration.ts',
    mode: 'development',
//    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                //loader: "ts-loader",
                use: "ts-loader",
                exclude: /node_modules/,
                /*options: {
                    transpileOnly: true,
                    onlyCompileBundledFiles: true
                }*/
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    
    plugins: [
        new HtmlWebpackPlugin({
          template: './public/3Dconfiguration.html',
          filename: '3Dconfiguration.html',
        }),
    ],
    devServer: {
        open: true,
        static: path.resolve(__dirname, 'dist-dev'),
        hot: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/3Dconfiguration.html',
            filename: '3Dconfiguration.html',
        })
    ]
};