// Parse GitHub's public calendar defensively. A changed response must not turn
// unavailable counts into fabricated zero-contribution days.
export function parseCalendar(html) {
  const tips = new Map([...html.matchAll(/<tool-tip\b([^>]*)>([\s\S]*?)<\/tool-tip>/g)].map(([, attrs, body]) => {
    const id = attrs.match(/\bfor="([^"]+)"/)?.[1];
    const text = body.replace(/<[^>]*>/g, '').trim();
    const match = text.match(/^(No|[\d,]+) contributions? on\b/);
    return [id, match ? (match[1] === 'No' ? 0 : Number(match[1].replaceAll(',', ''))) : null];
  }));
  const days = [...html.matchAll(/<td\b([^>]*\bdata-date="\d{4}-\d{2}-\d{2}"[^>]*)>/g)].map(([, attrs]) => {
    const date = attrs.match(/\bdata-date="([^"]+)"/)[1];
    const count = tips.get(attrs.match(/\bid="([^"]+)"/)?.[1]);
    const level = Number(attrs.match(/\bdata-level="([0-4])"/)?.[1]);
    if (!Number.isSafeInteger(count) || count < 0 || !Number.isInteger(level)) throw new Error(`Incomplete contribution data for ${date}`);
    return { date, count, level };
  });
  if (days.length < 300) throw new Error('GitHub calendar response is incomplete');
  return days.sort((a, b) => a.date.localeCompare(b.date));
}

export function lastYear(calendars, end) {
  const endTime = Date.parse(end + 'T00:00:00Z');
  const dates = new Map(calendars.flat().map(day => [day.date, day]));
  return Array.from({ length: 365 }, (_, index) => {
    const date = new Date(endTime - (364 - index) * 86400000).toISOString().slice(0, 10);
    const day = dates.get(date);
    if (!day) throw new Error(`Missing contribution date: ${date}`);
    return day;
  });
}
