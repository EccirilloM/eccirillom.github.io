import test from 'node:test';
import assert from 'node:assert/strict';
import { stackPosition, stackEndFade, BAND_TOP, BAND_BOTTOM, TILE_SIZE } from '../src/components/stackGeometry.ts';

test('scrolling recycles all fourteen icons inside the safe viewport band', () => {
  for (const height of [640, 900, 1440]) for (const scroll of [-100, 0, 500, 5000, 100000]) {
    for (let i = 0; i < 14; i++) {
      const p = stackPosition(i, 14, scroll, height);
      assert.ok(p.y >= BAND_TOP && p.y <= height - BAND_BOTTOM - TILE_SIZE);
      assert.ok(p.opacity >= 0 && p.opacity <= .85);
    }
  }
});

test('icons in each column stay far enough apart even while wrapping', () => {
  for (const scroll of [0, 175, 1000, 7500]) for (const side of [0, 1]) {
    const positions = Array.from({ length: 7 }, (_, i) => stackPosition(i * 2 + side, 14, scroll, 640).y).sort((a, b) => a - b);
    for (let i = 1; i < positions.length; i++) assert.ok(positions[i] - positions[i - 1] > TILE_SIZE + 6);
  }
});

test('side decoration fades before the footer and never produces invalid opacity', () => {
  assert.equal(stackEndFade(0), 1);
  assert.equal(stackEndFade(.95), 1);
  assert.ok(stackEndFade(.97) > 0 && stackEndFade(.97) < 1);
  assert.equal(stackEndFade(1), 0);
  assert.equal(stackEndFade(1.1), 0);
});
