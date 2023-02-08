import gsap from 'gsap';
import { getMousePos, lerp } from './utils';

let mousepos = { x: 0, y: 0 };
window.addEventListener('mousemove', (e) => (mousepos = getMousePos(e)));

export const magneticButton = (el) => {
  let renderedStyles = {
    tx: { previous: 0, current: 0, amt: 0.1 },
    ty: { previous: 0, current: 0, amt: 0.1 },
  };

  let scrollVal = { x: 0, y: 0 };

  let rect;

  let requestId = undefined;

  const calculateSizePosition = () => {
    scrollVal = { x: window.scrollX, y: window.scrollY };

    rect = el.getBoundingClientRect();
  };

  const initEvents = () => {
    window.addEventListener('resize', calculateSizePosition);

    el.addEventListener('mouseenter', loopRender);

    el.addEventListener('mouseleave', () => {
      requestId = stopRendering();

      renderedStyles.tx.previous = 0;
      renderedStyles.ty.previous = 0;
    });
  };

  const loopRender = () => {
    if (!requestId) {
      requestId = requestAnimationFrame(() => render());
    }
  };

  const stopRendering = () => {
    if (requestId) {
      window.cancelAnimationFrame(requestId);
      requestId = undefined;
    }
  };

  const render = () => {
    requestId = undefined;

    const scrollDiff = {
      x: scrollVal.x - window.scrollX,
      y: scrollVal.y - window.scrollY,
    };

    renderedStyles.tx.current =
      (mousepos.x - (scrollDiff.x + rect.left + rect.width / 2)) * 0.3;

    renderedStyles.ty.current =
      (mousepos.y - (scrollDiff.y + rect.top + rect.height / 2)) * 0.3;

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
    });

    loopRender();
  };

  calculateSizePosition();

  initEvents();

  return stopRendering;
};
