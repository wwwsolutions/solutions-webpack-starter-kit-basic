const currentTask = process.env.npm_lifecycle_event;
const fse = require('fs-extra');
const util = require('util');

// PATHS
const paths = require('./build-utils/webpack/webpack.paths');

// PLUGINS
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


// POSTCSS PLUGINS
const postCSSPlugins = [
  require('postcss-import'),
  require('postcss-mixins'),
  require('postcss-simple-vars'),
  require('postcss-nested'),
  require('postcss-hexrgba'),
  require('autoprefixer')
];

class RunAfterCompile {
  apply(compiler) {
    compiler.hooks.done.tap('Copy images', function () {
      // fse.copySync('./src/assets/images', './dist/assets/images')
      fse.copySync(paths.assets.images, paths.dist.images);
    });
  }
}

let cssConfig = {
  test: /\.css$/i,
  use: [
    // apply multiple loaders and options
    'css-loader?url=false',
    {
      loader: 'postcss-loader',
      // options for the loader
      options: {
        plugins: postCSSPlugins
      }
    }
  ]
};

let eslintConfig = {
  test: /\.js$/,
  enforce: 'pre',
  exclude: /node_modules/,
  use: ['eslint-loader'],

};
// let eslintConfig = {
//   test: /\.js$/,
//   enforce: 'pre',
//   exclude: /node_modules/,
//   use: {
//     loader: 'eslint-loader',
//   }
// };



let pages = fse.readdirSync('src').filter(function (file) {
  return file.endsWith('.html');
}).map(function (page) {
  return new HtmlWebpackPlugin({
    filename: page,
    // template: `./src/${page}`
    template: `${paths.src}/${page}`
  });
});


// [COMMON CONFIG] -----------------------------------------------------------------------------------------------------------

let config = {

  // defaults to ./src
  // Here the application starts executing
  // and webpack starts bundling
  // entry: `./src/index.js`, // string | object | array
  entry: {
    // modernizr: [ paths.head.modernizr ],
    // vendor: [ paths.vendors.lazyloading, paths.vendors.picturefill, /* paths.vendors.ionicons */ ],
    app: [paths.entry.app],
  },

  plugins: pages,

  // configuration regarding modules
  module: {
    // rules for modules (configure loaders, parser options, etc.)    
    rules: [
      cssConfig,
      eslintConfig
    ]
  },

  // enable devtools (sourcemaps)
  devtool: 'source-map'

};

// STYLE LINTING
config.plugins.push(
  new StyleLintPlugin({
    configFile: '.stylelintrc',
    context: 'src/styles/',
    files: ['**/*.css'],
    // syntax: 'scss',
    failOnError: false,
    quiet: false
  })
);


// [DEVELOPMENT MODE CONFIG] -----------------------------------------------------------------------------------------------------------
if (currentTask == 'dev') {

  // add loader to start of array
  cssConfig.use.unshift('style-loader');

  // options related to how webpack emits results
  config.output = {
    filename: 'bundled.js',

    // the target directory for all output files
    // must be an absolute path (use the Node.js path module)    
    // path: path.resolve(__dirname, 'src')
    path: paths.dist.root,
  };

  config.devServer = {
    before: function (app, server) {
      server._watch(`${paths.src}/**/*.html`);
    },
    // contentBase: path.join(__dirname, '../../src/app'), // boolean | string | array, static file location
    // contentBase: resolveAbs('./src'),
    contentBase: paths.src,

    hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
    port: 3000,
    host: '0.0.0.0',
    noInfo: false, // only errors & warns on hot reload
  };

  // Chosen mode tells webpack to use its built-in optimizations accordingly.
  config.mode = 'development';
}

// LOG COMMON CONFIG PLUGINS
// console.log('config.plugins: ', util.inspect(config.plugins, false, null, true /* enable colors */));


// [PRODUCTION MODE CONFIG] -----------------------------------------------------------------------------------------------------------
if (currentTask == 'build') {

  // configuration regarding modules  
  // rules for modules (configure loaders, parser options, etc.)
  config.module.rules.push({
    test: /\.js$/,
    exclude: /(node_modules)/,
    use: {
      // the loader which should be applied, it'll be resolved relative to the context      
      loader: 'babel-loader',
      // // options for the loader        
      // options: {
      //   presets: ['@babel/preset-env']
      // }
    }
  });

  // add loader to start of array
  cssConfig.use.unshift(MiniCssExtractPlugin.loader);

  // add plugin to end of postcss plugin array
  postCSSPlugins.push(require('cssnano'));

  // options related to how webpack emits results
  config.output = {
    // the filename template for entry chunks    
    // filename: `[name].[chunkhash].js`,

    // chunkFilename: `[name].[chunkhash].js`,

    // the target directory for all output files
    // must be an absolute path (use the Node.js path module)    
    // path: path.resolve(__dirname, 'dist')
    path: paths.dist.root,
    filename: `${paths.dist.scripts}/[name].[hash:10].js`,
    chunkFilename: `${paths.dist.scripts}/[name].js`

  };

  // Chosen mode tells webpack to use its built-in optimizations accordingly.
  config.mode = 'production';
  config.optimization = {
    splitChunks: { chunks: 'all' }
  };
  config.plugins.push(
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(
      {
        // the filename template for entry chunks        
        filename: 'styles.[chunkhash].css'
      }
    ),
    // new StyleLintPlugin({
    //   configFile: '.stylelintrc',
    //   context: 'src/styles/',
    //   files: ['**/*.css'],
    //   // syntax: 'css',
    //   failOnError: false,
    //   quiet: false
    // }),
    new RunAfterCompile()
  );
}

module.exports = config;