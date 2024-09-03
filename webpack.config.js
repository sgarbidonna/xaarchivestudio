const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// Lista de páginas HTML para generar dinámicamente
let htmlPageNames = ['3Dconfiguration', '3Dconfiguration-es', '3Dconfiguration-it'];

let multipleHtmlPlugins = htmlPageNames.map(name => {
  return new HtmlWebpackPlugin({
    template: `./public/${name}.html`, 
    filename: `${name}.html`,
    chunks: [`${name}`] 
  });
});

module.exports = {
  entry: {
    '3Dconfiguration': './public/3Dconfiguration.ts',
    '3Dconfiguration-es':'./public/3Dconfiguration-es.ts',
    '3Dconfiguration-it':'./public/3Dconfiguration-it.ts',
  },
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
    /*
    splitChunks: {
      chunks: 'all',
    },
    */
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
    filename: '[name].bundle.js', 
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    ...multipleHtmlPlugins, 
    new CopyPlugin({
      patterns: [
        {
          from: "./public",
          to: "", // to dist
          globOptions: {
            ignore: htmlPageNames.map(name => `**/${name}.html`), 
          },
        },
        {
          from: "./public",
          to: "/es",
          globOptions: {
            ignore: ["**/3Dconfiguration-es.html"],
          },
        },
        {
          from: "./public",
          to: "/it",
          globOptions: {
            ignore: ["**/3Dconfiguration-it.html"],
          },
        },
      ],
    }),
  ],
};
