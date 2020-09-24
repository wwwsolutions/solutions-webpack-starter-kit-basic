// HELPERS
// import { resolveAbs } from '../helpers/helpers';
const resolveAbs = require('../helpers/helpers')

const paths = {

  root: resolveAbs('/'),

  src: resolveAbs('./src'),

  entry: {
    app: resolveAbs('./src/app/index.js'),
  },

  head: {
    modernizr: resolveAbs('./src/vendors/modernizr.js'),
  },

  vendors: {
    jquery: resolveAbs('./src/vendors/jquery.js'),
    lazyloading: resolveAbs('./src/vendors/lazysizes.js'),
    picturefill: resolveAbs('./src/vendors/picturefill.js'),
    ionicons: resolveAbs('./src/vendors/ionicons-4.5.5.js'),
  },

  templates: {
    tmpl: resolveAbs('./src/templates/index.ejs'),
    favicon: resolveAbs('./src/templates/images/favicon.png'),
  },

  assets: {
    images: './src/assets/audio',
    images: './src/assets/fonts',
    images: './src/assets/icons',
    images: './src/assets/images',
    images: './src/assets/sprites',
    images: './src/assets/video',
    // fonts: resolveAbs('./src/assets/audio'),
    // fonts: resolveAbs('./src/assets/fonts'),
    // fonts: resolveAbs('./src/assets/icons'),
    // fonts: resolveAbs('./src/assets/images'),
    // fonts: resolveAbs('./src/assets/sprites'),
    // fonts: resolveAbs('./src/assets/video')
  },

  // PRODUCTION PATHS
  dist: {
    root: resolveAbs('./dist'),
    scripts: './scripts',
    stylesheets: './stylesheets',
    fonts: './dist./assets/fonts',
    images: './dist/assets/images',
    sprites: './dist/assets/images/sprites'
  },

  static: {
    // root: resolveAbs('./static'),
  },
}


// export default paths;
module.exports = paths;