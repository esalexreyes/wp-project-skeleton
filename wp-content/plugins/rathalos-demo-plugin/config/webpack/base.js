const CopyPlugin = require('copy-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const WebpackBar = require('webpackbar');

module.exports = (webpackConfig) => {
  // Javascript Rules
  const jsRules = {
    test: webpackConfig.js.rules.test,
    include: webpackConfig.js.path,
    exclude: /(node_modules|bower_components|vendor)/,
    use: {
      // `.swcrc` can be used to configure swc
      loader: "swc-loader",
      options: {
        // This makes swc-loader invoke swc synchronously.
        sync: true,
      }
    }
  };

  // CSS Rules
  const cssRules = {
    test: webpackConfig.sass.rules.test,
    exclude: /(node_modules|bower_components|vendor)/,
    use: [
      {
        loader: MiniCssExtractPlugin.loader,
        options: {
          publicPath: '/'
        },
      },
      {
        loader: 'css-loader',
        options: {
          esModule: false,
          sourceMap: true,
        },
      },
      // {
      //   // loads the PostCSS loader
      //   loader: 'postcss-loader',
      //   options: {
      //     sourceMap: true,
      //     postcssOptions: {
      //       plugins: ['autoprefixer'],
      //     },
      //   },
      // },
      {
        // Compiles Sass to CSS
        loader: 'sass-loader',
        options: { sourceMap: true },
      },
    ],
  };

  // Image Rules
  const imgRules = {
    test: webpackConfig.images.rules.test,
    type: webpackConfig.images.rules.type,
    generator: webpackConfig.images.rules.generator,
  };

  // Font Rules
  const fontRules = {
    test: webpackConfig.fonts.rules.test,
    type: webpackConfig.fonts.rules.type,
    generator: webpackConfig.fonts.rules.generator,
  };

  // Plugins
  const plugins = [
    new WebpackBar(),
    new MiniCssExtractPlugin({
      // Extracts CSS files
      filename: webpackConfig.sass.filename,
    }),
    new CopyPlugin(webpackConfig.copy),
    new ESLintPlugin({
      overrideConfigFile: `config/eslint.config.js`
    }),
    new StylelintPlugin({
      configFile: `config/stylelint.config.js`,
      fix: true
    }),
  ];

  return {
    jsRules,
    cssRules,
    imgRules,
    fontRules,
    plugins,
  };
};
