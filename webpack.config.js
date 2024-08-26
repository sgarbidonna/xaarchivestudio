const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: '/public/3Dconfiguration.ts',
  //entry: './public/index.ts',
  mode: 'production',
  
  performance: {
    hints: false
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({
      terserOptions: {
        safari10: true
      }
    })],
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: 'ts-loader',
      exclude: /node_modules/,
    }],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  
  output: {
    filename: 'ybundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  
  plugins: [
      new HtmlWebpackPlugin({
        template: './public/3Dconfiguration.html',
        filename: '3Dconfiguration.html',
      }),
  ]
};

/*

*/