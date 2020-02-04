export default function breakingNewsHandler({ url, container, timeUpdateSelector, renderTemplate }) {
  const current = Date.now();
  return fetch(url)
    .then(resp => resp.json())
    .then(resp => {
      return Object.entries(resp)
        .filter(([id, item]) => !!document.getElementById(id))
        .map(([id, item]) => renderTemplate(id, item, current));
    })
    .then(items => {
      container.insertAdjacentHTML(items.join(''), 'afterbegin');
      document.title = items.length ? `(${items.length}) ${originaltitle}` : originaltitle;
      const elements = all(timeUpdateSelector);
      elements.forEach(el => {
        el.innerHTML = renderTime({ previous: el.getAttribute('time'), current });
      });
      return elements;
    });
}
