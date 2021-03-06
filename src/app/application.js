/* MAIN APPLICATION.
//////////////////////////////////////////////*/

console.log('\'application.js\' loaded.');

// [APPLICATION MODULES]
import MobileMenu from './modules/MobileMenu';
import RevealOnScroll from './modules/RevealOnScroll';
import StickyHeader from './modules/StickyHeader';



/* APPLICATION INITIALIZATION
> > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > >
------------------------------------------------------------------------------------------------------------- */

window.addEventListener('load', () => {

  new StickyHeader();
  new RevealOnScroll(document.querySelectorAll('.feature-item'), 75);
  new RevealOnScroll(document.querySelectorAll('.testimonial'), 60);
  new MobileMenu();
  let modal;

  document.querySelectorAll('.open-modal').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      if (typeof modal == 'undefined') {
        import(/* webpackChunkName: "modal" */ './modules/Modal').then(x => {
          modal = new x.default();
          setTimeout(() => modal.openTheModal(), 20);
        }).catch(() => console.log('There was a problem.'));
      } else {
        modal.openTheModal();
      }
    });
  });

}); // LOAD EVENT LISTENER





// testing Quokka
// https://github.com/wallabyjs/jsdom-quokka-plugin
const testDiv = document.getElementById('testDiv');
testDiv.textContent; //?
