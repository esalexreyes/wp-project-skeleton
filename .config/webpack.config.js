// Global Requires
const path =  require ('path');
require('dotenv').config({ path: '/.config/.env' });

// Local requires
const dev = require('./webpack/dev');
const watch = require('./webpack/watch');

// Environment Configuration
const envConfig = {
  projectName: process.env.PROJECT_NAME,
  domainName: process.env.DEV_DOMAIN,
  distPath: process.env.DIST,
};

const pluginConfig = {
  output,
  js,
  css,
  img,
  fonts,
  copy,
  sourceMaps,
};

const themeConfig = {
  output,
  js,
  css,
  img,
  fonts,
  copy,
  sourceMaps,
};

const browsersync = {
  host: 'localhost',
  port: 3600,
  mode: 'proxy', // proxy | server
  proxy: envConfig.domainName,
  files: [
    'src/**/**/*.php',
    'src/**/**/*.js',
    'src/**/**/*.scss',
    'src/**/**/*.json',
  ],
  // Set false to prevent BrowserSync from reloading and let Webpack Dev Server take care of this
  reload: true,
  // ! Add your own key and cert, be sure to expose them if using devbox
  https: {
    key: '/home/esalexreyes/DevBox/ca/certs/main/localhost.key',
    cert: '/home/esalexreyes/DevBox/ca/certs/main/localhost.crt',
  },
};

const

const oldProjectConfig = {
  dev: {
    output: path.resolve(
      __dirname,
      `../wp-content/plugins/${envConfig.projectName}/assets`
    )
  },
  js: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, '../src/assets/js/'),
    entry: {
      frontend: path.resolve(__dirname, '../src/assets/js/frontend.js'),
      backend: path.resolve(__dirname, '../src/assets/js/backend.js'),
    },
    rules: {
      test: /\.m?js$/,
    },
  },
  sass: {
    filename: 'css/[name].css',
    rules: {
      test: /\.s[ac]ss$/i,
    },
  },
  images: {
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
  copy: {
    patterns: [
      {
        from: '**/*.php',
        context: path.resolve(__dirname, '../src/'),
        to({ context, absoluteFilename }) {
          return `../${path.relative(context, absoluteFilename)}`;
        },
      },
      {
        from: '**/*.json',
        context: path.resolve(__dirname, '../src/'),
        to({ context, absoluteFilename }) {
          return `../${path.relative(context, absoluteFilename)}`;
        },
        noErrorOnMissing: true,
      },
      {
        from: '**/*.css',
        context: path.resolve(__dirname, '../src/'),
        to({ context, absoluteFilename }) {
          return `../${path.relative(context, absoluteFilename)}`;
        },
        noErrorOnMissing: true,
      },
      {
        from: '**/vendor/**/*.js',
        context: path.resolve(__dirname, '../src/'),
        to({ context, absoluteFilename }) {
          return `../${path.relative(context, absoluteFilename)}`;
        },
        noErrorOnMissing: true,
      },
    ],
  },
  sourceMaps: {
    enable: true,
    env: 'dev',
    devtool: 'source-map',
  },
}

const browsersync = {
  host: 'localhost',
  port: 3600,
  mode: 'proxy', // proxy | server
  proxy: envConfig.domainName,
  files: [
    'src/**/**/*.php',
    'src/**/**/*.js',
    'src/**/**/*.scss',
    'src/**/**/*.json',
  ],
  // Set false to prevent BrowserSync from reloading and let Webpack Dev Server take care of this
  reload: true,
  // ! Add your own key and cert, be sure to expose them if using devbox
  https: {
    key: '/home/esalexreyes/DevBox/ca/certs/main/localhost.key',
    cert: '/home/esalexreyes/DevBox/ca/certs/main/localhost.crt',
  },
};

console.log(projectConfig);

module.exports = (env) => {
  return [dev(projectConfig)]

}
