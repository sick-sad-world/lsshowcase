import { tns } from 'tiny-slider/src/tiny-slider';

export default function enableSlider({ container, caption, ...opts }) {
  const controls = [
    '<svg data-role="icon" viewBox="0 0 24 24"><use href="icons/chevron-left.svg"></use></svg>',
    '<svg data-role="icon" viewBox="0 0 24 24"><use href="icons/chevron-right.svg"></use></svg>'
  ];

  const setDescription = ({ container, index, slideItems }) => {
    const descriptionEl = document.getElementById(container.dataset.caption);
    if (slideItems[index]) {
      let img = slideItems[index].querySelector('img');
      if (img) {
        descriptionEl.innerText = img.getAttribute('alt');
      }
    } else {
      descriptionEl.innerText = '';
    }
  };

  const options = {
    container,
    items: 1,
    lazyload: true,
    arrowKeys: true,
    speed: 380,
    controlsText: controls,
    ...opts
  };

  if (caption === true) {
    options.onInit = setDescription;
  }

  const slider = tns(options);

  if (caption === true) {
    slider.events.on('indexChanged', setDescription);
  }

  return slider;
}
