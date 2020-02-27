export default function all(selector) {
  const query = document.querySelectorAll(selector);
  return query ? Array.from(query) : [];
}
