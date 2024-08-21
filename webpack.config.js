const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: '/public/3Dconfiguration.ts',
  mode: 'production',
  performance: {
    hints: false
  },
  /*optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({
      terserOptions: {
        safari10: true
      }
    })],
  },*/
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
  /*
  output: {
    filename: './bundle.js',
    path: path.resolve(__dirname, 'dist')
  },*/
  plugins: [
      new HtmlWebpackPlugin({
        template: './public/3Dconfiguration.html',
        filename: '3Dconfiguration.html',
      }),
  ]
};

/*


const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './public/contenido/3Dconfiguration/3Dconfiguration.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // Ajusta esto a la ruta de tu archivo HTML principal
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
  },
};
*/