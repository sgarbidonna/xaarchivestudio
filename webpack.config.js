const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: '/public/3Dconfiguration.ts',
  mode: 'production',
  performance: {
    hints: false,
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          safari10: true,
        },
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  
  plugins: [ //https://stackoverflow.com/questions/39798095/multiple-html-files-using-webpack
      new HtmlWebpackPlugin({
        template: './public/3Dconfiguration.html',
        filename: '3Dconfiguration.html',
      }),

      new CopyPlugin({
        patterns: [
          {
            from: "./public", to: "", //to the dist root directory
            globOptions: {ignore: ["**/3Dconfiguration.html",],},
          },

          {
            from: "./public", to: "/es", 
            globOptions: {ignore: ["**/3Dconfiguration-es.html",],},
          },

          {
            from: "./public", to: "/it", 
            globOptions: {ignore: ["**/3Dconfiguration-it.html",],},
          },

        ],
      }),




  ]
};
