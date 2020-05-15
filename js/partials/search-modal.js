export default function enableSearchModal(id) {
  const trigger = document.getElementById(`${id}-trigger`);
  const target = document.getElementById(`${id}-target`);
  const input = target.querySelector('input[type="text"]');
  let timeout = null;

  function show() {
    target.classList.add('is-visible');
    target.removeAttribute('aria-hidden');
    timeout = setTimeout(() => {
      input.focus();
    }, 150);
  }

  function hide() {
    target.classList.remove('is-visible');
    target.setAttribute('aria-hidden', 'true');
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
  }

  trigger.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (target.classList.contains('is-visible')) {
      hide();
    } else {
      show();
    }
  });

  trigger.addEventListener('focus', (e) => {
    e.preventDefault();
    show();
  });

  document.body.addEventListener('click', (e) => {
    if (!target.contains(e.target)) {
      hide();
    }
  });
}
