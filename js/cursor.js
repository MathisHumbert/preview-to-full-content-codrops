import gsap from 'gsap';
import { lerp, getMousePos } from './utils';

let mouse = { x: 0, y: 0 };

window.addEventListener('mousemove', (e) => (mouse = getMousePos(e)));

export default function cursor(el) {
  el.style.opacity = 0;

  let bounds = el.getBoundingClientRect();

  let renderedStyles = {
    tx: { previous: 0, current: 0, amt: 0.2 },
    ty: { previous: 0, current: 0, amt: 0.2 },
    scale: { previous: 1, current: 1, amt: 0.15 },
  };

  const enter = () => {
    renderedStyles.scale.current = 1.5;
  };

  const leave = () => {
    renderedStyles.scale.current = 1;
  };

  const render = () => {
    renderedStyles.tx.current = mouse.x - bounds.width / 2;
    renderedStyles.ty.current = mouse.y - bounds.height / 2;

    for (const key in renderedStyles) {
      renderedStyles[key].previous = lerp(
        renderedStyles[key].previous,
        renderedStyles[key].current,
        renderedStyles[key].amt
      );
    }

    gsap.set(el, {
      x: renderedStyles.tx.previous,
      y: renderedStyles.ty.previous,
      scale: renderedStyles.scale.previous,
    });

    requestAnimationFrame(() => render());
  };

  const onMouseMove = () => {
    renderedStyles.tx.previous = mouse.x - bounds.width / 2;
    renderedStyles.tx.current = mouse.x - bounds.width / 2;
    renderedStyles.ty.previous = mouse.y - bounds.height / 2;
    renderedStyles.ty.current = mouse.y - bounds.height / 2;

    gsap.to(el, { opacity: 1, duration: 0.9, ease: 'power3.easeOut' });

    requestAnimationFrame(() => render());

    window.removeEventListener('mousemove', onMouseMove);
  };

  window.addEventListener('mousemove', onMouseMove);

  return { enter, leave };
}
