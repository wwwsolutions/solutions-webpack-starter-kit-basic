// UTILITIES
const currentTask = process.env.npm_lifecycle_event;
const fse = require('fs-extra');
const path = require('path');

// PATHS
const paths = require('./build-utils/webpack/webpack.paths');

// PLUGINS
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


// CONFIG
const postCSSPlugins = [
  require('postcss-import'),
  require('postcss-mixins'),
  require('postcss-simple-vars'),
  require('postcss-nested'),
  require('postcss-hexrgba'),
  require('autoprefixer')
];

// CONFIG
class RunAfterCompile {
  apply(compiler) {
    compiler.hooks.done.tap('Copy images', function () {
      // copy images
      fse.copySync(paths.assets.images, paths.dist.images);
      // copy icons
      fse.copySync(paths.assets.icons, paths.dist.icons);
    });
  }
}

// CONFIG
let cssConfig = {
  test: /\.css$/i,
  // apply multiple loaders and options
  use: [
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

// CONFIG
let eslintConfig = {
  test: /\.js$/,
  enforce: 'pre',
  exclude: /node_modules/,
  use: ['eslint-loader'],

};

// CONFIG
let pages = fse.readdirSync('src').filter(function (file) {
  return file.endsWith('.html');
}).map(function (page) {
  return new HtmlWebpackPlugin({
    filename: page,
    template: `${paths.src}/${page}`
  });
});


/* START COMMON CONFIGURATION
> > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > >
------------------------------------------------------------------------------------------------------------- */

let config = {

  entry: {
    // defaults to ./src
    // Here the application starts executing
    // and webpack starts bundling
    // entry: `./src/index.js`, // string | object | array
    app: [paths.entry.index],
    // include modernizr into build
    modernizr: [paths.head.modernizr],
    // include vendors
    vendor: [
      paths.vendors.lazyloading,
      paths.vendors.picturefill,
      // paths.vendors.ionicons
    ]
  },


  plugins: pages,
  // configuration regarding modules
  module: {
    // rules for modules (configure loaders, parser options, etc.)    
    rules: [
      cssConfig,
      eslintConfig
    ]
  }
};

// STYLE LINTING CONFIG
config.plugins.push(
  new StyleLintPlugin({
    configFile: '.stylelintrc',
    context: 'src/styles/',
    files: ['**/*.css'],
    // syntax: 'scss',
    failOnError: false,
    quiet: false
  })

); // END COMMON CONFIGURATION 



/* START DEVELOPMENT CONFIGURATION
> > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > >
------------------------------------------------------------------------------------------------------------- */

if (currentTask == 'dev') {

  // add loader to start of array
  cssConfig.use.unshift('style-loader');

  // options related to how webpack emits results
  config.output = {
    filename: '[name].bundle.js',
    // the target directory for all output files
    // must be an absolute path (use the Node.js path module)    
    path: path.resolve(__dirname, 'src')
    // path: paths.dist.root,
  };

  config.devServer = {
    before: function (app, server) {
      server._watch(`${paths.src}/**/*.html`);
    },
    contentBase: paths.src,
    hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
    port: 3000,
    host: '0.0.0.0',
    noInfo: false, // only errors & warns on hot reload
  };

  // Chosen mode tells webpack to use its built-in optimizations accordingly.
  config.mode = 'development';

  // set devtools with source maps
  config.devtool = 'source-map';

} // END DEVELOPMENT CONFIGURATION



/* START PRODUCTION CONFIGURATION
> > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > >
------------------------------------------------------------------------------------------------------------- */

if (currentTask == 'build') {

  // configuration regarding modules  
  // rules for modules (configure loaders, parser options, etc.)
  config.module.rules.push({
    test: /\.js$/,
    exclude: /(node_modules)/,
    use: {
      // the loader which should be applied, it'll be resolved relative to the context      
      loader: 'babel-loader',
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
        filename: `styles.[chunkhash].css`
        // filename: `${paths.dist.stylesheets}/styles.[chunkhash].css`
      }
    ),
    new RunAfterCompile()
  );
} // END PRODUCTION CONFIGURATION


module.exports = config;