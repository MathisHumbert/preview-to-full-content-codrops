import Lenis from '@studio-freight/lenis';

import item from './item';
import cursor from './cursor';
import { preloadImages, preloadFonts } from './utils';

Promise.all([
  preloadImages('.item__img, .content__img'),
  preloadFonts('ytb6dpl'),
]).then(() => {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  document.body.classList.remove('loading');

  item();

  const { enter, leave } = cursor(document.querySelector('.cursor'));

  [...document.querySelectorAll('a, button')].forEach((el) => {
    el.addEventListener('mouseenter', enter);
    el.addEventListener('mouseleave', leave);
  });
});
