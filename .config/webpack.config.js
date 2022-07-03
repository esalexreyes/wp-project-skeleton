// Global Requires
const glob = require('glob');
const path =  require ('path');
require('dotenv').config({ path: '.config/.env' });

// Local requires
const dev = require('./webpack/dev');
const prod = require('./webpack/prod');
const watch = require('./webpack/watch');

// Environment Configuration
const envConfig = {
  pluginName: process.env.PLUGIN_NAME,
  pluginPath: `../wp-content/plugins/${process.env.PLUGIN_NAME}`,
  themeName: process.env.THEME_NAME,
  themePath: `../wp-content/themes/${process.env.THEME_NAME}`,
  devDomain: process.env.DEV_DOMAIN_NAME,
  devSslKey: process.env.DEV_SSL_KEY,
  devSslCert: process.env.DEV_SSL_CERT,
};

function getEntries(pattern, dir, ) {
  const entries = {};
  glob.sync(pattern, {cwd: dir}).forEach((file) => {
    let outputFileKey = path.basename(file, path.extname(file));
    outputFileKey = `${(path.extname(file) == '.scss') ? 'css' : 'js' }/${outputFileKey}`;
    entries[outputFileKey] = path.join(dir, file);
  });
  console.log(entries);
  return entries;
}

// const themeConfig = {
//   output,
//   js,
//   css,
//   img,
//   fonts,
//   copy,
//   sourceMaps,
// };

const browsersync = {
  host: 'localhost',
  port: 3600, // Choose a port
  mode: 'proxy', // proxy | server
  proxy: envConfig.devDomain,
  files: [
    `${envConfig.themePath}/**/**/*.php`,
    `${envConfig.themePath}/**/**/*.js`,
    `${envConfig.themePath}/**/**/*.scss`,
    `${envConfig.themePath}/**/**/*.json`,
    `${envConfig.pluginPath}/**/**/*.php`,
    `${envConfig.pluginPath}/**/**/*.js`,
    `${envConfig.pluginPath}/**/**/*.scss`,
    `${envConfig.pluginPath}/**/**/*.json`,
  ],
  // Set false to prevent BrowserSync from reloading and let Webpack Dev Server take care of this
  reload: true,
  // ! Add your own key and cert, be sure to expose them if using devbox
  https: {
    key: envConfig.devSslKey,
    cert: envConfig.devSslCert,
  },
};

const pluginConfig = {
  output: path.resolve(
    __dirname,
    `${envConfig.pluginPath}/assets/dist`
  ),
  entry: {
    ...getEntries('js/*.js', path.resolve(__dirname, `${envConfig.pluginPath}/assets/src/`)),
    ...getEntries('css/*.scss', path.resolve(__dirname, `${envConfig.pluginPath}/assets/src/`))
  },
  js: {
    filename: '[name].js',
    path: path.resolve(__dirname, `${envConfig.pluginPath}/assets/src/js/`),
    rules: {
      test: /\.m?js$/,
    },
  },
  css: {
    filename: '[name].css',
    path: path.resolve(__dirname, `${envConfig.pluginPath}/assets/src/css/`),
    rules: {
      test: /\.s[ac]ss$/i,
    },
  },
  img: {
    rules: {
      test: /\.(jpe?g|png|gif|svg|webp)$/i,
      type: 'asset/resource',
      generator: {
        publicPath: '../',
        filename: 'img/[name][ext]',
      },
    },
    minimizer: {
      options: {
        plugins: [
          ['gifsicle', { interlaced: true }],
          ['jpegtran', { progressive: true }],
          ['optipng', { optimizationLevel: 5 }],
          [
            'svgo',
            {
              plugins: [
                {
                  name: 'preset-default',
                  params: {
                    overrides: {
                      removeViewBox: false,
                    },
                  },
                },
              ],
            },
          ],
        ],
      },
    },
  },
  fonts: {
    rules: {
      test: /\.(eot|ttf|woff|woff2)$/i,
      type: 'asset/resource',
      generator: {
        publicPath: '../',
        filename: 'fonts/[name][ext]',
      },
    },
  },
  sourceMaps: {
    enable: true,
    env: 'dev',
    devtool: 'source-map',
  },
};

const themeConfig = {
  output: path.resolve(
    __dirname,
    `${envConfig.themePath}/assets/dist`
  ),
  entry: {
    ...getEntries('js/*.js', path.resolve(__dirname, `${envConfig.themePath}/assets/src/`)),
    ...getEntries('css/*.scss', path.resolve(__dirname, `${envConfig.themePath}/assets/src/`))
  },
  js: {
    filename: '[name].js',
    path: path.resolve(__dirname, `${envConfig.themePath}/assets/src/js/`),
    rules: {
      test: /\.m?js$/,
    },
  },
  css: {
    filename: '[name].css',
    path: path.resolve(__dirname, `${envConfig.themePath}/assets/src/css/`),
    rules: {
      test: /\.s[ac]ss$/i,
    },
  },
  img: {
    rules: {
      test: /\.(jpe?g|png|gif|svg|webp)$/i,
      type: 'asset/resource',
      generator: {
        publicPath: '../',
        filename: 'img/[name][ext]',
      },
    },
    minimizer: {
      options: {
        plugins: [
          ['gifsicle', { interlaced: true }],
          ['jpegtran', { progressive: true }],
          ['optipng', { optimizationLevel: 5 }],
          [
            'svgo',
            {
              plugins: [
                {
                  name: 'preset-default',
                  params: {
                    overrides: {
                      removeViewBox: false,
                    },
                  },
                },
              ],
            },
          ],
        ],
      },
    },
  },
  fonts: {
    rules: {
      test: /\.(eot|ttf|woff|woff2)$/i,
      type: 'asset/resource',
      generator: {
        publicPath: '../',
        filename: 'fonts/[name][ext]',
      },
    },
  },
  sourceMaps: {
    enable: true,
    env: 'dev',
    devtool: 'source-map',
  },
};

module.exports = (env) => {
  let config = [];


  console.log(env.NODE_ENV);
  if (env.NODE_ENV == "production"){
    if (envConfig.pluginName) {
      config.push(prod(pluginConfig))
    }
    if (envConfig.themeName) {
      config.push(prod(themeConfig))
    }
  } else {
    if (envConfig.pluginName) {
      config.push(dev(pluginConfig))
    }
    if (envConfig.themeName) {
      config.push(dev(themeConfig))
    }
    config.push(watch(browsersync))
  }
  return config;
}
