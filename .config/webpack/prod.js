const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const baseConfig = require('./base');

module.exports = (webpackConfig) => {
  process.env.NODE_ENV = 'development'; // Set environment level to 'development'

  // The base skeleton
  const Base = baseConfig(webpackConfig);

  // Javascript Rules
  const jsRules = {
    ...Base.jsRules,
    ...{
      // add JS rules for development here
    },
  };

  // CSS Rules
  const cssRules = {
    ...Base.cssRules,
    ...{
      // add CSS rules for development here
    },
  };

  // Image Rules
  const imgRules = {
    ...Base.imgRules,
    ...{
      // add image rules for development here
    },
  };

  // Font Rules
  const fontRules = {
    ...Base.fontRules,
    ...{
      // add image rules for development here
    },
  };

  // Sourcemaps
  const sourceMap = { devtool: false };
  if (
    webpackConfig.sourceMaps.enable === true
    && (webpackConfig.sourceMaps.env === 'dev'
      || webpackConfig.sourceMaps.env === 'dev-prod')
  ) {
    sourceMap.devtool = webpackConfig.sourceMaps.devtool;
  }

  // Plugins
  const plugins = [
    ...Base.plugins,
    ...[
      // add plugins for production here
      new CssMinimizerPlugin(),
    ],
  ];

  console.log("Running in PROD Mode");

  // Configuration that webpack will use!
  return {
    mode: 'production',
    entry: webpackConfig.entry,
    output: {
      path: webpackConfig.output,
      filename: webpackConfig.js.filename,
    },
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin()],
    },
    devtool: sourceMap.devtool,
    module: {
      rules: [jsRules, cssRules, imgRules, fontRules],
    },
    stats: {
      errorDetails: true,
    },
    plugins,
  };
};
