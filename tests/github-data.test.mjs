import test from 'node:test';
import assert from 'node:assert/strict';
import { parseCalendar, lastYear } from '../scripts/github-data.mjs';

const days = Array.from({ length: 730 }, (_, i) => ({ date: new Date(Date.UTC(2023, 0, 1) + i * 86400000).toISOString().slice(0, 10), count: i % 4, level: i % 4 }));
const html = days.slice(0, 365).map((day, i) => `<td data-level="${day.level}" id="day-${i}" data-date="${day.date}"></td><tool-tip for="day-${i}">${day.count || 'No'} contributions on date.</tool-tip>`).join('');

test('GitHub calendar associates counts by cell id and rejects missing tooltips', () => {
  assert.deepEqual(parseCalendar(html), days.slice(0, 365));
  assert.throws(() => parseCalendar(html.replace('for="day-2"', 'for="unknown"')), /Incomplete/);
  assert.throws(() => parseCalendar('<html>rate limited</html>'), /incomplete/);
});
test('last year is 365 consecutive dates across a leap day and rejects gaps', () => {
  const result = lastYear([days], '2024-03-01');
  assert.equal(result.length, 365);
  assert.equal(result[0].date, '2023-03-03');
  assert.equal(result.at(-2).date, '2024-02-29');
  assert.equal(result.at(-1).date, '2024-03-01');
  assert.throws(() => lastYear([days.filter(day => day.date !== '2024-02-29')], '2024-03-01'), /Missing/);
});
