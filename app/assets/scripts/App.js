// [CORE.JS]
// import "core-js/modules/es.array.unscopables.flat";
// import "core-js/modules/es.array.unscopables.flat-map";
// import "core-js/modules/esnext.math.clamp";
// import "core-js/modules/esnext.math.deg-per-rad";
// import "core-js/modules/esnext.math.degrees";
// import "core-js/modules/esnext.math.fscale";
// import "core-js/modules/esnext.math.rad-per-deg";
// import "core-js/modules/esnext.math.radians";
// import "core-js/modules/esnext.math.scale";

// [BABEL]
import '@babel/runtime/regenerator';

// [VENDORS]
import 'lazysizes'

// [STYLES]
import '../styles/styles.css'

// [APPLICATION MODULES]
import MobileMenu from './modules/MobileMenu'
import RevealOnScroll from './modules/RevealOnScroll'
import StickyHeader from './modules/StickyHeader'

// [CODE==========================================================]

new StickyHeader()
new RevealOnScroll(document.querySelectorAll(".feature-item"), 75)
new RevealOnScroll(document.querySelectorAll(".testimonial"), 60)
new MobileMenu();
let modal

document.querySelectorAll(".open-modal").forEach(el => {
  el.addEventListener("click", e => {
    e.preventDefault()
    if (typeof modal == "undefined") {
      import(/* webpackChunkName: "modal" */ './modules/Modal').then(x => {
        modal = new x.default()
        setTimeout(() => modal.openTheModal(), 20)
      }).catch(() => console.log("There was a problem."))
    } else {
      modal.openTheModal()
    }
  })
})

if (module.hot) {
  module.hot.accept()
}