/* DOCUMENT INFORMATION

  MAIN APPLICATION.
  IMPORTS MODULES, 
  APPLICATION INITIALIZATION.

//////////////////////////////////////////////*/

// [APPLICATION MODULES]
import MobileMenu from './modules/MobileMenu'
import RevealOnScroll from './modules/RevealOnScroll'
import StickyHeader from './modules/StickyHeader'


/* APPLICATION INITIALIZATION
> > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > >
------------------------------------------------------------------------------------------------------------- */

window.addEventListener('load', () => {

  console.warn('\'application.js\' loaded.');

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


}); // LOAD EVENT LISTENER
