export default function enableModal(opts = {}) {
  const config = Object.assign(
    {
      button: 'menu-button',
      overlay: 'modal-overlay',
      modal: 'menu-modal',
      closeBtn: 'menu-modal-close'
    },
    opts
  );
  const button = document.getElementById(config.button);
  const overlay = document.getElementById(config.overlay);
  const modal = document.getElementById(config.modal);
  const closeBtn = document.getElementById(config.closeBtn);

  button.addEventListener('click', () => {
    modal.classList.add('is-visible');
    modal.setAttribute('aria-hidden', 'false');
  });

  overlay.addEventListener('click', () => {
    modal.classList.remove('is-visible');
    modal.setAttribute('aria-hidden', 'true');
    overlay.blur();
  });

  closeBtn.addEventListener('click', () => {
    modal.classList.remove('is-visible');
    modal.setAttribute('aria-hidden', 'true');
  });

  return {
    destroy: () => {}
  };
}
