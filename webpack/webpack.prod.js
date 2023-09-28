const { sentryWebpackPlugin } = require('@sentry/webpack-plugin');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    sentryWebpackPlugin({
      authToken: process.env.SENTRY_AUTH_TOKEN,
      org: 'wallet-guard',
      project: 'wallet-guard-extension',
    }),
  ],
  devtool: 'source-map',
});
