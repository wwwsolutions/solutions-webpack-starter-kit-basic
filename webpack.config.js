const currentTask = process.env.npm_lifecycle_event

// PATHS
const paths = require('./build-utils/webpack/webpack.paths')


const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const fse = require('fs-extra')

const postCSSPlugins = [
  require('postcss-import'),
  require('postcss-mixins'),
  require('postcss-simple-vars'),
  require('postcss-nested'),
  require('postcss-hexrgba'),
  require('autoprefixer')
]

class RunAfterCompile {
  apply(compiler) {
    compiler.hooks.done.tap('Copy images', function () {
      // fse.copySync('./src/assets/images', './dist/assets/images')
      fse.copySync(paths.assets.images, paths.dist.images)
    })
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
}

let pages = fse.readdirSync('src').filter(function (file) {
  return file.endsWith('.html')
}).map(function (page) {
  return new HtmlWebpackPlugin({
    filename: page,
    template: `./src/${page}`
  })
})

let config = {

  // defaults to ./src
  // Here the application starts executing
  // and webpack starts bundling
  entry: './src/app/index.js', // string | object | array
  // entry: {
  //   // modernizr: [ paths.head.modernizr ],
  //   // vendor: [ paths.vendors.lazyloading, paths.vendors.picturefill, /* paths.vendors.ionicons */ ],
  //   app: ['./src/app/index.js'],
  // },

  plugins: pages,

  // configuration regarding modules
  module: {
    // rules for modules (configure loaders, parser options, etc.)    
    rules: [
      cssConfig
    ]
  }
}

// [DEVELOPMENT MODE CONFIG]
if (currentTask == 'dev') {

  cssConfig.use.unshift('style-loader')

  // options related to how webpack emits results
  config.output = {
    filename: 'bundled.js',

    // the target directory for all output files
    // must be an absolute path (use the Node.js path module)    
    // path: path.resolve(__dirname, 'src')
    path: paths.dist.root,
  }

  config.devServer = {
    before: function (app, server) {
      server._watch(`${paths.src}/**/*.html`)
    },
    // contentBase: path.join(__dirname, '../../src/app'), // boolean | string | array, static file location
    // contentBase: resolveAbs('./src'),
    contentBase: paths.src,

    hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
    port: 3000,
    host: '0.0.0.0',
    noInfo: false, // only errors & warns on hot reload
  }

  // Chosen mode tells webpack to use its built-in optimizations accordingly.
  config.mode = 'development'
}

// [PRODUCTION MODE CONFIG]
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
  })

  cssConfig.use.unshift(MiniCssExtractPlugin.loader)
  postCSSPlugins.push(require('cssnano'))

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

  }

  // Chosen mode tells webpack to use its built-in optimizations accordingly.
  config.mode = 'production'
  config.optimization = {
    splitChunks: { chunks: 'all' }
  }
  config.plugins.push(
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(
      {
        // the filename template for entry chunks        
        filename: `styles.[chunkhash].css`
      }
    ),
    new RunAfterCompile()
  )
}

module.exports = config