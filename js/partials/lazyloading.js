import all from './all';

export default function enableLazyloading(selector, targetProp, dataProp) {
  document.addEventListener('DOMContentLoaded', () => {
    const images = all(selector);

    if ('IntersectionObserver' in window) {
      const observerInstance = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const element = entry.target;
            element[targetProp] = element.dataset[dataProp];
            element.dataset.loaded = true;
            observer.unobserve(element);
          }
        });
      });

      images.forEach(el => observerInstance.observe(el));
    } else {
      images.forEach(element => {
        element[targetProp] = element.dataset[dataProp];
        element.dataset.loaded = true;
      });
    }
  });
}
