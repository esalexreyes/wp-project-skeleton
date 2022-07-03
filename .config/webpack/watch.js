/**
 * This holds the configuration for Browsersync so we only reload after the
 * other configs have completed their run.
 *
 * @since 1.1.0
 */

const path = require('path');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const DisableOutputWebpackPlugin = require('disable-output-webpack-plugin');

module.exports = (webpackConfig) => {
  const browserSyncOptions = {
    files: webpackConfig.files,
    host: webpackConfig.host,
    port: webpackConfig.port,
    https: webpackConfig.https,
    proxy: webpackConfig.proxy,
  };

  console.log(browserSyncOptions);

  const plugins = [
    new DisableOutputWebpackPlugin(),
    new BrowserSyncPlugin(browserSyncOptions, {
      reload: webpackConfig.reload,
    }),
  ];

  return {
    mode: 'none',
    entry: './.config/index.js',
    output: {
      path: path.resolve(__dirname),
    },
    plugins,
  };
};
