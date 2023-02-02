// import gsap from 'gsap';
// import SplitType from 'split-type';

// let isAnimating = false;

// function init() {
//   const items = document.querySelectorAll('.item');

//   items.forEach((item) => {
//     const button = item.querySelector('.item__enter');
//     const link = item.querySelector('.item__foter__link');
//     const circle = item.querySelector('.item__enter circle');
//     const imgWrapper = item.querySelector('.item__img__wrapper');
//     const img = item.querySelector('.item__img');
//     const heading = item.querySelector('.item__heading');
//     const words = item.querySelectorAll('.item__heading__word');

//     words.forEach((word) => {
//       const firstSpan = new SplitType(word, {
//         types: 'chars',
//         charClass: 'char__wrap',
//       });

//       new SplitType(firstSpan.chars, { types: 'chars' });
//     });

//     const chars = item.querySelectorAll('.char');

//     button.addEventListener('mouseenter', () =>
//       onItemEnter({ img, imgWrapper, heading, circle, chars })
//     );

//     button.addEventListener('mouseleave', () =>
//       onItemLeave({ img, imgWrapper, heading, circle, chars })
//     );

//     link.addEventListener('mouseenter', () =>
//       onItemEnter({ img, imgWrapper, heading, circle, chars })
//     );

//     link.addEventListener('mouseleave', () =>
//       onItemLeave({ img, imgWrapper, heading, circle, chars })
//     );
//   });
// }

// function onItemEnter({ img, imgWrapper, heading, circle, chars }) {
//   const tl = gsap.timeline();

//   tl.to([img, circle], { scale: 1.1 })
//     .to(imgWrapper, { scale: 0.95 }, '<')
//     .to(
//       chars,
//       {
//         xPercent: -100,
//         duration: 0.25,
//       },
//       0
//     )
//     .to(heading, { xPercent: -20, duration: 0.1 }, '-=0.175')
//     .set(chars, { xPercent: 100 })
//     .to(chars, { xPercent: 0, duration: 0.25 });
// }

// function onItemLeave({ img, imgWrapper, heading, circle, chars }) {
//   const tl = gsap.timeline();

//   tl.to([img, circle], { scale: 1 })
//     .to(imgWrapper, { scale: 1 }, '<')
//     .to(
//       chars,
//       {
//         xPercent: 100,
//         duration: 0.25,
//       },
//       0
//     )
//     .to(heading, { xPercent: 0, duration: 0.1 }, '-=0.175')
//     .set(chars, { xPercent: -100 })
//     .to(chars, { xPercent: 0, duration: 0.25 });
// }

// window.addEventListener('load', init);
