export default function attachClipboardCopyHandler(id, text) {
  const el = document.getElementById(id);

  function clickListener() {
    this.select();
    document.execCommand('copy');
    alert(text);
  }

  el.addEventListener('click', clickListener);
  return () => el.removeEventListener('click', clickListener);
}
