export default function attachClipboardCopyHandler(id, successText) {
  const el = document.getElementById(id);

  function clickListener() {
    try {
      const input = this.querySelector('input[type="hidden"]');
      input.focus();
      input.select();
      const success = document.execCommand('copy');
      if (success) {
        alert(successText);
      }
    } catch (err) {
      console.error(err);
    }
  }
  if (!el) {
    return false;
  }
  el.addEventListener('click', clickListener);
  return () => el.removeEventListener('click', clickListener);
}
