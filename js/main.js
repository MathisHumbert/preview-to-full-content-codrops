import item from './item';
import cursor from './cursor';
import { preloadImages, preloadFonts } from './utils';

Promise.all([
  preloadImages('.item__img, .content__img'),
  preloadFonts('ytb6dpl'),
]).then(() => {
  document.body.classList.remove('loading');

  item();

  const { enter, leave } = cursor(document.querySelector('.cursor'));

  [...document.querySelectorAll('a, button')].forEach((el) => {
    el.addEventListener('mouseenter', enter);
    el.addEventListener('mouseleave', leave);
  });
});
