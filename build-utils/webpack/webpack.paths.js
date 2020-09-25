// HELPERS
const resolveAbs = require('../helpers/helpers')

const paths = {
  root: resolveAbs('/'),
  // context: resolveAbs('./src'),
  src: './src',
  entry: {
    index: './src/index.js',
  },
  assets: {
    audio: './src/assets/audio',
    fonts: './src/assets/fonts',
    icons: './src/assets/icons',
    images: './src/assets/images',
    sprites: './src/assets/sprites',
    video: './src/assets/video',
  },
  dist: {
    root: resolveAbs('./dist'),
    scripts: './scripts',
    stylesheets: './stylesheets',
    audio: './dist/assets/audio',
    fonts: './dist/assets/fonts',
    icons: './dist/assets/icons',
    images: './dist/assets/images',
    sprites: './dist/assets/sprites',
    video: './dist/assets/video'
  },
  head: {
    modernizr: resolveAbs('./src/vendors/js/modernizr.js'),
  },
  vendors: {
    lazyloading: resolveAbs('./src/vendors/js/lazysizes.js'),
    picturefill: resolveAbs('./src/vendors/js/picturefill.js'),
    // jquery: resolveAbs('./src/vendors/jquery.js'),
    // ionicons: resolveAbs('./src/vendors/ionicons-4.5.5.js'),
  },
}


module.exports = paths;