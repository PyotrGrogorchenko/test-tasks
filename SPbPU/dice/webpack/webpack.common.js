const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = {
  entry: path.resolve(__dirname, '..', './src/index.tsx'),
  context: path.resolve(__dirname, '..', './src/'),
  resolve: {
    extensions: ['.tsx', '.ts', '.js', ".css", ".scss"],
    plugins: [
      new TsconfigPathsPlugin(
        {
          configFile: 'tsconfig.json'
        }
      )]
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: path.resolve(__dirname, '/node_modules'),
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
            },
          },
          'sass-loader'
        ]
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, '..', './build'),
    filename: 'bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '..', './public/index.html'),
    }),
  ],

  stats: 'errors-only',
}
