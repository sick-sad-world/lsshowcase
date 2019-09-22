export default function dropdown() {
  const elems = Array.from(document.querySelectorAll('.dropdown select'));

  function listener(e) {
    let method = e.target.value ? 'add' : 'remove';
    e.target.classList[method]('is-value-selected');
    method = e.target.value === '' ? 'add' : 'remove';
    e.target.classList[method]('is-value-placeholder');
  }

  elems.forEach(el => {
    listener({ target: el });
    el.addEventListener('change', listener);
  });
  return {
    elems,
    strip: () => {
      elems.forEach(el => {
        el.classList.remove('is-value-selected');
        el.removeEventListener('change', listener);
      });
    }
  };
}
