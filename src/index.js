/* ROOT FILE
//////////////////////////////////////////////*/

console.log('\'index.js\' loaded.');

// [LOAD CORE.JS MODULES]
// https://github.com/zloirock/core-js/blob/master/docs/2019-03-19-core-js-3-babel-and-a-look-into-the-future.md
// import "core-js/modules/es.array.unscopables.flat";
// import "core-js/modules/es.array.unscopables.flat-map";
// import "core-js/modules/esnext.math.clamp";
// import "core-js/modules/esnext.math.deg-per-rad";
// import "core-js/modules/esnext.math.degrees";
// import "core-js/modules/esnext.math.fscale";
// import "core-js/modules/esnext.math.rad-per-deg";
// import "core-js/modules/esnext.math.radians";
// import "core-js/modules/esnext.math.scale";

// [LOAD BABEL PLUGINS]
// https://babeljs.io/docs/en/babel-plugin-transform-runtime
import '@babel/runtime/regenerator';

// [LOAD THIRD PARTY CODE]
// https://survivejs.com/webpack/building/bundle-splitting/#:~:text=Webpack%20allows%20you%20to%20split,party%20code%20of%20your%20project.
import 'lazysizes';

// [LOAD STYLES]
import './styles/main.css';

// [LOAD APP]
import './app/application';

// ENABLE HMR
// https://webpack.js.org/guides/hot-module-replacement/
if (module.hot) {
  module.hot.accept();
}


