const webpack = require('webpack');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const WextManifestWebpackPlugin = require('wext-manifest-webpack-plugin');
const DotenvPlugin = require('dotenv-webpack');

const srcDir = path.join(__dirname, '..', 'src');
const targetBrowser = process.env.TARGET_BROWSER;

module.exports = {
  entry: {
    manifest: path.join(srcDir, 'manifest.json'),
    background: path.join(srcDir, 'background.ts'),
    popup: path.join(srcDir, 'pages/popup.tsx'),
    chatweb3: path.join(srcDir, 'pages/chatweb3.tsx'),
    phishing: path.join(srcDir, 'pages/phishing.tsx'),
    'content-scripts/contentScripts': path.join(srcDir, 'content-scripts', 'contentScripts.tsx'),
    'content-scripts/bypassCheck': path.join(srcDir, 'content-scripts', 'bypassCheck.tsx'),
    'injected/injectWalletGuard': path.join(srcDir, 'injected', 'injectWalletGuard.tsx'),
  },

  output: {
    path: path.join(__dirname, '..', 'dist', targetBrowser),
    filename: 'js/[name].js',
  },

  optimization: {
    splitChunks: {
      name: 'vendor',
      chunks(chunk) {
        return chunk.name !== 'background';
      },
    },
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(css|scss)$/,
        include: path.resolve(srcDir),
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        type: 'javascript/auto', // prevent webpack handling json with its own loaders,
        test: /manifest\.json$/,
        use: {
          loader: 'wext-manifest-loader',
          options: {
            usePackageJSONVersion: true,
          },
        },
        exclude: /node_modules/,
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.css'],
    fallback: {
      buffer: require.resolve('buffer/'),
      worker_threads: false,
      stream: require.resolve('stream-browserify'),
    },
  },

  plugins: [
    new WextManifestWebpackPlugin(),
    new CopyPlugin({
      patterns: [{ from: '.', to: '.', context: 'public' }],
      options: {},
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser.js',
    }),
    new DotenvPlugin(),
  ],
};
