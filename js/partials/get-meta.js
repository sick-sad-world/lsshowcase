import all from './all';

export default function getMetaDataBySelector(selector, key, value) {
  return all(selector).reduce((acc, el) => {
    const key = el.getAttribute(key);
    acc[key] = el.getAttribute(value);
    return acc;
  }, {});
}
