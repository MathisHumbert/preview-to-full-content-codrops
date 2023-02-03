import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import SplitType from 'split-type';

import { wrapLines, calcWinsize } from './utils';

gsap.registerPlugin(ScrollTrigger);

function init() {
  const items = document.querySelectorAll('.item');
  const frames = document.querySelectorAll('.frame');

  items.forEach((item, index) => {
    const button = item.querySelector('.item__enter');
    const link = item.querySelector('.item__foter__link');
    const circle = item.querySelector('.item__enter circle');
    const imgWrapper = item.querySelector('.item__img__wrapper');
    const img = item.querySelector('.item__img');
    const heading = item.querySelector('.item__heading');
    const words = item.querySelectorAll('.item__heading__word');
    const meta = item.querySelectorAll('.item__meta__row');
    const footer = item.querySelector('.item__footer');
    const textFooter = item.querySelector('.item__footer p');
    const linkFooter = item.querySelector('.item__footer a');
    const content = document.getElementById(`content-${index + 1}`);

    console.log(content);

    let tlHoverOut, tlHoverIn, tlOpen;

    let invertItem = index % 2 !== 0;

    words.forEach((word) => {
      const firstSpan = new SplitType(word, {
        types: 'chars',
        charClass: 'char__wrap',
      });

      new SplitType(firstSpan.chars, { types: 'chars' });
    });

    const splitTextFooter = new SplitType(textFooter, { types: 'lines' });
    wrapLines(splitTextFooter.lines, 'div', 'oh');

    const chars = item.querySelectorAll('.char');

    button.addEventListener('mouseenter', onItemEnter);

    button.addEventListener('mouseleave', onItemLeave);

    button.addEventListener('click', openContent);

    link.addEventListener('mouseenter', onItemEnter);

    link.addEventListener('mouseleave', onItemLeave);

    // const enterTl = gsap.timeline({
    //   scrollTrigger: {
    //     trigger: item,
    //     start: 'top bottom',
    //   },
    // });

    // enterTl
    //   .fromTo(
    //     imgWrapper,
    //     {
    //       clipPath: 'polygon(0 0,100% 0,100% 0,0 0)',
    //     },
    //     {
    //       clipPath: 'polygon(0 0,100% 0,100% 100%,0 100%)',
    //       duration: 0.8,
    //       ease: 'power3',
    //     }
    //   )
    //   .fromTo(
    //     img,
    //     { scale: 0.9 },
    //     { scale: 1, duration: 1.1, ease: 'power3' },
    //     0
    //   )
    //   .fromTo(
    //     meta,
    //     { opacity: 0 },
    //     { opacity: 1, duration: 0.7, stagger: 0.2, ease: 'power1' },
    //     0.4
    //   )
    //   .fromTo(
    //     chars,
    //     { xPercent: invertItem ? 103 : -103 },
    //     { xPercent: 0, duration: 0.7, ease: 'expo' },
    //     0.4
    //   )
    //   .fromTo(
    //     button,
    //     { opacity: 0 },
    //     { opacity: 1, duration: 0.2, stagger: 0.2, ease: 'quad.in' },
    //     0.7
    //   )
    //   .fromTo(
    //     splitTextFooter.lines,
    //     { yPercent: -105 },
    //     { yPercent: 0, duration: 0.7, stagger: 0.1, ease: 'power1' },
    //     0.7
    //   )
    //   .fromTo(
    //     linkFooter,
    //     { opacity: 0 },
    //     { opacity: 1, duration: 0.2, ease: 'power1' },
    //     '-=0.8'
    //   );

    function onItemEnter() {
      if (tlHoverOut) tlHoverOut.kill();

      tlHoverIn = gsap.timeline();

      tlHoverIn
        .to([circle, img], { scale: 1.1, duration: 0.8, ease: 'power3' })
        .to(imgWrapper, { scale: 0.95, duration: 0.8, ease: 'power3' }, 0)
        .to(
          chars,
          {
            xPercent: invertItem ? 103 : -103,
            duration: 0.2,
            ease: 'quad.in',
          },
          0
        )
        .set(heading, { xPercent: invertItem ? 20 : -20 }, 0.2)
        .to(
          chars,
          {
            startAt: { xPercent: invertItem ? -103 : 103 },
            xPercent: 0,
            duration: 0.7,
            ease: 'expo',
          },
          0.2
        );
    }

    function onItemLeave() {
      if (tlHoverIn) tlHoverIn.kill();

      tlHoverOut = gsap.timeline();

      tlHoverOut
        .to(
          [imgWrapper, img, circle],
          { scale: 1, duration: 0.8, ease: 'power3' },
          0
        )
        .to(
          chars,
          {
            xPercent: invertItem ? -103 : 103,
            duration: 0.2,
            ease: 'quad.in',
          },
          0
        )
        .set(heading, { xPercent: 0 }, 0.2)
        .to(
          chars,
          {
            startAt: { xPercent: invertItem ? 103 : -103 },
            xPercent: 0,
            duration: 0.7,
            ease: 'expo',
          },
          0.2
        );
    }

    function openContent() {
      if (tlHoverIn) tlHoverIn.kill();

      // content.classList.add('content__article--open');
      // document.body.classList.add('oh');

      // set content
      // to content

      tlOpen = gsap.timeline();

      const buttonRect = button.getBoundingClientRect();

      console.log(winsize, buttonRect);
      tlOpen
        .set(heading, { xPercent: invertItem ? 20 : -20 }, 0.2)
        .to(
          [frames, [...items].filter((_, i) => index !== i)],
          {
            opacity: 0,
            duration: 0.6,
            ease: 'power3',
          },
          0
        )
        .to(
          button,
          {
            x: winsize.width / 2 - buttonRect.left - buttonRect.width / 2,
            y: -buttonRect.top - buttonRect.height / 2,
            duration: 0.8,
            ease: 'power2',
          },
          0
        )
        .to(
          circle,
          {
            scale: 2.3,
            opacity: 0,
            duration: 2,
            ease: 'power2',
            onComplete: () => {
              gsap.set(button, { x: 0, y: 0 });
            },
          },
          0
        )
        .to(
          [footer, meta],
          {
            opacity: 0,
            yPercent: (i) => (i ? -100 : -8),
            duration: 0.5,
            ease: 'power4.in',
            stagger: {
              from: 'center',
              amount: 0.06,
            },
          },
          0
        )
        .to(
          imgWrapper,
          {
            scale: 0.9,
            opacity: 0,
            duration: 0.5,
            ease: 'power3.inOut',
          },
          0
        )
        .to(
          chars,
          {
            xPercent: invertItem ? 103 : -103,
            opacity: 0,
            duration: 0.3,
            ease: 'quad.in',
          },
          0
        );
    }
  });
}

window.addEventListener('load', init);

let winsize = calcWinsize();

window.addEventListener('resize', () => (winsize = calcWinsize()));
