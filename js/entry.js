import dropdown from './partials/dropdown';
import enableModal from './partials/modal';
import enableSlider from './partials/slider';
import getMetaDataBySelector from './partials/get-meta';

enableModal();
dropdown();

Array.from(document.querySelectorAll('.mod-slider-container')).forEach(el => {
  enableSlider({
    container: el,
    caption: true,
    lazyload: false
  });
});
