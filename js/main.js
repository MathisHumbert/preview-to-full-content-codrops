import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import SplitType from 'split-type';

import { wrapLines, calcWinsize } from './utils';
import { magneticButton } from './magneticButton';

gsap.registerPlugin(ScrollTrigger);

function init() {
  const items = document.querySelectorAll('.item');
  const frames = document.querySelectorAll('.frame');

  items.forEach((item, index) => {
    const enterButton = item.querySelector('.item__enter');
    const itemLink = item.querySelector('.item__foter__link');
    const enterCircle = item.querySelector('.item__enter circle');
    const itemImgWrapper = item.querySelector('.item__img__wrapper');
    const itemImg = item.querySelector('.item__img');
    const itemHeading = item.querySelector('.item__heading');
    const itemWords = item.querySelectorAll('.item__heading__word');
    const itemMeta = item.querySelectorAll('.item__meta__row');
    const itemFooter = item.querySelector('.item__footer');
    const itemTextFooter = item.querySelector('.item__footer p');
    const itemLinkFooter = item.querySelector('.item__footer a');
    const backButton = document.querySelector('.content__back');
    const content = document.getElementById(`content-${index + 1}`);
    const contentWords = content.querySelectorAll('.content__heading__word');
    const contentText = content.querySelectorAll('.content__text p');
    const contentImg = content.querySelector('.content__text img');

    itemWords.forEach((word) => {
      const firstSpan = new SplitType(word, {
        types: 'chars',
        charClass: 'char__wrap',
      });

      new SplitType(firstSpan.chars, { types: 'chars' });
    });

    contentWords.forEach((word) => {
      const firstSpan = new SplitType(word, {
        types: 'chars',
        charClass: 'char__wrap',
      });

      new SplitType(firstSpan.chars, { types: 'chars' });
    });

    const splitTextFooter = new SplitType(itemTextFooter, { types: 'lines' });
    wrapLines(splitTextFooter.lines, 'div', 'oh');

    const itemChars = item.querySelectorAll('.item__heading .char');
    const contentChars = content.querySelectorAll('.content__heading .char');

    let tlHoverOut, tlHoverIn, tlOpen, tlClose;
    let isContentOpen = false;
    let isContentEnter = false;

    let invertItem = index % 2 !== 0;

    const stopMagneticButton = magneticButton(enterButton);

    enterButton.addEventListener('mouseenter', onItemEnter);

    enterButton.addEventListener('mouseleave', onItemLeave);

    enterButton.addEventListener('click', openContent);

    itemLink.addEventListener('mouseenter', onItemEnter);

    itemLink.addEventListener('mouseleave', onItemLeave);

    backButton.addEventListener('click', closeContent);

    const enterTl = gsap.timeline({
      scrollTrigger: {
        trigger: item,
        start: 'top bottom',
      },
      onComplete: () => (isContentEnter = true),
    });

    enterTl
      .fromTo(
        itemImgWrapper,
        {
          clipPath: 'polygon(0 0,100% 0,100% 0,0 0)',
        },
        {
          clipPath: 'polygon(0 0,100% 0,100% 100%,0 100%)',
          duration: 0.8,
          ease: 'power3',
        }
      )
      .fromTo(
        itemImg,
        { scale: 0.9 },
        { scale: 1, duration: 1.1, ease: 'power3' },
        0
      )
      .fromTo(
        itemMeta,
        { opacity: 0 },
        { opacity: 1, duration: 0.7, stagger: 0.2, ease: 'power1' },
        0.4
      )
      .fromTo(
        itemChars,
        { xPercent: invertItem ? 103 : -103 },
        { xPercent: 0, duration: 0.7, ease: 'expo' },
        0.4
      )
      .fromTo(
        enterButton,
        { opacity: 0 },
        { opacity: 1, duration: 0.2, stagger: 0.2, ease: 'quad.in' },
        0.7
      )
      .fromTo(
        splitTextFooter.lines,
        { yPercent: -105 },
        { yPercent: 0, duration: 0.7, stagger: 0.1, ease: 'power1' },
        0.7
      )
      .fromTo(
        itemLinkFooter,
        { opacity: 0 },
        { opacity: 1, duration: 0.2, ease: 'power1' },
        '-=0.8'
      );

    function onItemEnter() {
      if (!isContentEnter) return;

      if (tlHoverOut) tlHoverOut.kill();

      tlHoverIn = gsap.timeline();

      tlHoverIn
        .to([enterCircle, itemImg], {
          scale: 1.1,
          duration: 0.8,
          ease: 'power3',
        })
        .to(itemImgWrapper, { scale: 0.95, duration: 0.8, ease: 'power3' }, 0)
        .to(
          itemChars,
          {
            xPercent: invertItem ? 103 : -103,
            duration: 0.2,
            ease: 'quad.in',
          },
          0
        )
        .set(itemHeading, { xPercent: invertItem ? 20 : -20 }, 0.2)
        .to(
          itemChars,
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
      if (isContentOpen || !isContentEnter) return;

      if (tlHoverIn) tlHoverIn.kill();

      tlHoverOut = gsap.timeline();

      tlHoverOut
        .to(enterButton, { x: 0, y: 0, duration: 0.8, ease: 'power3' }, 0)
        .to(
          [itemImgWrapper, itemImg, enterCircle],
          { scale: 1, duration: 0.8, ease: 'power3' },
          0
        )
        .to(
          itemChars,
          {
            xPercent: invertItem ? -103 : 103,
            duration: 0.2,
            ease: 'quad.in',
          },
          0
        )
        .set(itemHeading, { xPercent: 0 }, 0.2)
        .to(
          itemChars,
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
      stopMagneticButton();

      if (tlHoverIn) tlHoverIn.kill();

      content.classList.add('content__article--open');
      document.body.classList.add('oh');

      isContentOpen = true;

      tlOpen = gsap.timeline();

      const enterButtonRect = enterButton.getBoundingClientRect();

      tlOpen
        .set(contentChars, { xPercent: invertItem ? -103 : 103 }, 0)
        .set([contentText, contentImg], { y: 20, opacity: 0 }, 0)
        .set(backButton, { scale: 0.8, opacity: 0 }, 0)
        .set(enterButton, { x: 0, y: 0 }, 0)
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
          enterButton,
          {
            x:
              winsize.width / 2 -
              enterButtonRect.left -
              enterButtonRect.width / 2,
            y: -enterButtonRect.top - enterButtonRect.height / 2,
            duration: 0.8,
            ease: 'power2',
          },
          0
        )
        .to(
          enterCircle,
          {
            scale: 2.3,
            transformOrigin: '50% 50%',
            opacity: 0,
            duration: 2,
            ease: 'power2',
          },
          0
        )
        .to(
          [itemFooter, itemMeta],
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
          itemImgWrapper,
          {
            scale: 0.9,
            opacity: 0,
            duration: 0.5,
            ease: 'power3.inOut',
          },
          0
        )
        .to(
          itemChars,
          {
            xPercent: invertItem ? 103 : -103,
            duration: 0.3,
            ease: 'quad.in',
          },
          0
        )
        .to(
          contentChars,
          {
            xPercent: 0,
            duration: 1.3,
            ease: 'expo',
            stagger: invertItem ? -0.03 : 0.03,
          },
          0.4
        )
        .to(
          [contentText, contentImg],
          { y: 0, opacity: 1, duration: 1.3, ease: 'expo', stagger: 0.03 },
          0.7
        )
        .to(
          backButton,
          { opacity: 1, scale: 1, duration: 1.3, ease: 'expo' },
          1
        );
    }

    function closeContent() {
      if (tlOpen) tlOpen.kill();

      isContentOpen = false;

      tlClose = gsap.timeline();

      tlClose
        .set(enterButton, { x: 0, y: 0 })
        .set(enterCircle, { scale: 0.5, opacity: 0 }, 0)
        .to(
          backButton,
          {
            opacity: 0,
            scale: 0.9,
            duration: 0.3,
            ease: 'quad.in',
          },
          0
        )
        .to(
          contentChars,
          { xPercent: invertItem ? -103 : 103, duration: 0.3, ease: 'quad.in' },
          0
        )
        .to(
          [contentText, contentImg],
          {
            yPercent: 20,
            opacity: 0,
            duration: 0.5,
            ease: 'power4.in',
          },
          0
        )
        .to(
          enterCircle,
          {
            scale: 1,
            opacity: 1,
            ease: 'expo',
            onComplete: () => {
              content.classList.remove('content__article--open');
              document.body.classList.remove('oh');
            },
          },
          0.4
        )
        .to(
          [itemChars, itemHeading],
          {
            xPercent: 0,
            duration: 1.3,
            ease: 'expo',
            stagger: invertItem ? 0.01 : -0.01,
          },
          0.4
        )
        .to(
          [itemImg, itemImgWrapper],
          { scale: 1, opacity: 1, duration: 0.8, ease: 'power3' },
          0.4
        )
        .to(
          [itemFooter, itemMeta],
          {
            opacity: 1,
            yPercent: 0,
            duration: 1.3,
            ease: 'expo',
            stagger: { from: 'center', amount: 0.06 },
          },
          0.4
        )
        .to(
          [frames, [...items].filter((_, i) => index !== i)],
          {
            opacity: 1,
            duration: 0.6,
            ease: 'power3',
          },
          0.4
        );
    }
  });
}

window.addEventListener('load', init);

let winsize = calcWinsize();

window.addEventListener('resize', () => (winsize = calcWinsize()));
