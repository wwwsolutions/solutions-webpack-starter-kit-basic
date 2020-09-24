const postcssImport = require('./postcssImport')
const postcssMixins = require('./postcssMixins')
const postcssSimpleVars = require('./postcssSimpleVars')
const postcssNested = require('./postcssNested')
const postcssAutoprefixer = require('./postcssAutoprefixer')


const postCSSPlugins = [
    postcssImport,
    postcssMixins,
    postcssSimpleVars,
    postcssNested,
    require('postcss-hexrgba'),
    postcssAutoprefixer
]

module.exports = postCSSPlugins;  