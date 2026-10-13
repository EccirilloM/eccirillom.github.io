// One shared curve keeps the robot centred between parallel curved crop rows.
export const CROP_OFFSETS = [-105, -35, 35, 105];
export function fieldPoint(progress: number, offset = 0) {
  const t = Math.min(1, Math.max(0, progress));
  const x = 160 + offset + 24 * Math.sin(2 * Math.PI * t);
  const y = 176 - 128 * t;
  const heading = Math.atan2(48 * Math.PI * Math.cos(2 * Math.PI * t), 128) * 180 / Math.PI;
  return { x, y, heading };
}
export function fieldPath(offset = 0) {
  return Array.from({ length: 65 }, (_, i) => {
    const { x, y } = fieldPoint(i / 64, offset);
    return `${i === 0 ? 'M' : 'L'}${x.toFixed(3)} ${y.toFixed(3)}`;
  }).join(' ');
}
