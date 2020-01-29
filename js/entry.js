import dropdown from './partials/dropdown';
import enableModal from './partials/modal';
import enableSlider from './partials/slider';

enableModal();
dropdown();

Array.from(document.querySelectorAll('.mod-slider-container')).forEach(el => {
  enableSlider({
    container: el,
    caption: true,
    lazyload: false
  });
});
