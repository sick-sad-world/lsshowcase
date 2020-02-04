export default function timeDifference({ current, previous, showDetails }) {
  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerMonth = msPerDay * 30;
  const msPerYear = msPerDay * 365;

  const elapsed = current - previous;

  const ago = '<br/>ago';

  const pluralStr = v => (v > 1 ? 's' : '');

  const valueOrToday = v => (showDetails ? v : 'Today');

  if (elapsed < msPerMinute) {
    return valueOrToday('Now');
  } else if (elapsed < msPerHour) {
    const diff = Math.round(elapsed / msPerMinute);
    return valueOrToday(`${diff} minute${pluralStr(diff)}${ago}`);
  } else if (elapsed < msPerDay) {
    const diff = Math.round(elapsed / msPerHour);
    return valueOrToday(`${diff} hour${pluralStr(diff)}${ago}`);
  } else if (elapsed < msPerMonth) {
    const diff = Math.round(elapsed / msPerDay);
    return `${diff} day${pluralStr(diff)}${ago}`;
  } else if (elapsed < msPerYear) {
    const diff = Math.round(elapsed / msPerMonth);
    return `${diff} month${pluralStr(diff)}${ago}`;
  } else {
    const diff = Math.round(elapsed / msPerYear);
    return `${diff} year${pluralStr(diff)}${ago}`;
  }
}
