// HELPERS
// import { resolveAbs } from '../helpers/helpers';
const resolveAbs = require('../helpers/helpers')

const paths = {

  root: resolveAbs('/'),

  // src: resolveAbs('./src'),
  src: './src',

  entry: {
    // app: resolveAbs('./src/index.js'),
    app: './src/index.js',
  },

  head: {
    modernizr: resolveAbs('./src/vendors/modernizr.js'),
  },

  // vendors: {
  //   jquery: resolveAbs('./src/vendors/jquery.js'),
  //   lazyloading: resolveAbs('./src/vendors/lazysizes.js'),
  //   picturefill: resolveAbs('./src/vendors/picturefill.js'),
  //   ionicons: resolveAbs('./src/vendors/ionicons-4.5.5.js'),
  // },

  // templates: {
  //   tmpl: resolveAbs('./src/templates/index.ejs'),
  //   favicon: resolveAbs('./src/templates/images/favicon.png'),
  // },

  assets: {
    audio: './src/assets/audio',
    fonts: './src/assets/fonts',
    icons: './src/assets/icons',
    images: './src/assets/images',
    sprites: './src/assets/sprites',
    video: './src/assets/video',
  },

  // assets: {
  //   fonts: resolveAbs('./src/assets/audio'),
  //   fonts: resolveAbs('./src/assets/fonts'),
  //   fonts: resolveAbs('./src/assets/icons'),
  //   fonts: resolveAbs('./src/assets/images'),
  //   fonts: resolveAbs('./src/assets/sprites'),
  //   fonts: resolveAbs('./src/assets/video')
  // },

  // PRODUCTION PATHS
  dist: {
    root: resolveAbs('./dist'),
    scripts: './scripts',
    stylesheets: './dist/stylesheets',
    audio: './dist/assets/audio',
    fonts: './dist/assets/fonts',
    icons: './dist/assets/icons',
    images: './dist/assets/images',
    sprites: './dist/assets/sprites',
    video: './dist/assets/video'
  },

  // dist: {
  //   root: resolveAbs('./dist'),
  //   scripts: './scripts',
  //   stylesheets: './stylesheets',
  //   audio: './dist/assets/audio',
  //   fonts: './dist/assets/fonts',
  //   icons: './dist/assets/icons',
  //   images: './dist/assets/images',
  //   sprites: './dist/assets/sprites',
  //   video: './dist/assets/video'
  // },

  // dist: {
  //   root: resolveAbs('./dist'),
  //   scripts: resolveAbs('./scripts'),
  //   stylesheets: resolveAbs('./stylesheets'),
  //   fonts: resolveAbs('./dist./assets/fonts'),
  //   images: resolveAbs('./dist/assets/images'),
  //   sprites: resolveAbs('./dist/assets/images/sprites')
  // },

  static: {
    // root: resolveAbs('./static'),
  },
}


// export default paths;
module.exports = paths;