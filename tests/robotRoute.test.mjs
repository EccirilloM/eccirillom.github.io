import test from 'node:test';
import assert from 'node:assert/strict';
import { fieldPoint, fieldPath } from '../src/components/robotRoute.ts';

test('robot stays between curved crop rows, including its rotated wheels', () => {
  for (let i = 10; i <= 990; i++) {
    const { x, y, heading } = fieldPoint(i / 1000);
    const a = heading * Math.PI / 180;
    for (const dx of [-12, 12]) for (const dy of [-12, 14]) {
      const cornerX = x + dx * Math.cos(a) - dy * Math.sin(a);
      const cornerY = y + dx * Math.sin(a) + dy * Math.cos(a);
      if (cornerY < 48 || cornerY > 176) continue;
      const centre = fieldPoint((176 - cornerY) / 128);
      assert.ok(Math.abs(cornerX - centre.x) < 30, 'robot overlaps crop foliage');
    }
  }
});

test('robot heading follows the tangent rather than sliding sideways', () => {
  for (const t of [.1, .25, .5, .75, .9]) {
    const before = fieldPoint(t - .0001);
    const after = fieldPoint(t + .0001);
    const tangent = Math.atan2(after.x - before.x, before.y - after.y) * 180 / Math.PI;
    assert.ok(Math.abs(tangent - fieldPoint(t).heading) < .001);
  }
  assert.notEqual(fieldPoint(.25).x, fieldPoint(.75).x);
  assert.doesNotMatch(fieldPath(), /NaN|Infinity/);
});
