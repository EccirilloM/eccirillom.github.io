import test from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

function sourceFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap(e => e.isDirectory() ? sourceFiles(join(dir, e.name)) : [join(dir, e.name)]);
}
test('the preview does not record visitors or persist browser identifiers', () => {
  const source = sourceFiles('src').map(file => readFileSync(file, 'utf8')).join('\n');
  assert.doesNotMatch(source, /\b(?:localStorage|sessionStorage|indexedDB)\b|document\.cookie|navigator\.geolocation|sendBeacon|\bfetch\s*\(|XMLHttpRequest/);
  assert.doesNotMatch(source, /shengxiang-visitor-api|google-analytics|googletagmanager|emailjs|simpleanalytics/);
});
test('entry point loads no third-party scripts or remote fonts', () => {
  const html = readFileSync('index.html', 'utf8');
  assert.doesNotMatch(html, /(?:src|href)=["']https?:/);
});
test('live mode is clearly labeled as unavailable in both languages', () => {
  const content = readFileSync('src/content.ts', 'utf8');
  assert.match(content, /Live visitor sharing is not enabled/);
  assert.match(content, /non è attiva in questa anteprima/);
});
