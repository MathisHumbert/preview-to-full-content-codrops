export const wrapLines = (arr, wrapType, wrapClass) => {
  arr.forEach((el) => {
    const wrapEl = document.createElement(wrapType);
    wrapEl.classList = wrapClass;
    el.parentNode.appendChild(wrapEl);
    wrapEl.appendChild(el);
  });
};

export const calcWinsize = () => {
  return { width: window.innerWidth, height: window.innerHeight };
};

export const getMousePos = (e) => {
  return { x: e.clientX, y: e.clientY };
};

export const lerp = (a, b, n) => (1 - n) * a + n * b;
