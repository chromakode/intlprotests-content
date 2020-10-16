const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin')
const OverlayManifestPlugin = require('./src/OverlayManifestPlugin')

module.exports = (env, argv) => ({
  entry: {
    overlayIntl: './src/overlayIntl.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.ttf$/,
        use: 'url-loader',
      },
    ],
  },
  plugins: [
    new OverlayManifestPlugin(),
    new HtmlWebpackPlugin({
      title: 'Woke International Overlay',
      chunks: ['overlayIntl'],
      filename: 'overlayIntl.html',
    }),
    argv.mode === 'production'
      ? new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/.*/])
      : null,
  ].filter(Boolean),
  performance: {
    hints: false,
  },
})
