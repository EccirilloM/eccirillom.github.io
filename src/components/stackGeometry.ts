// Scroll band and wrapping adapted from portfolio-react, Sagar Gupta, GPL-3.0.
export const SIDE_MEDIA = '(min-width: 1280px) and (min-height: 640px)';
export const TILE_SIZE = 44;
export const BAND_TOP = 80;
export const BAND_BOTTOM = 96;
const clamp = (n: number) => Math.min(1, Math.max(0, n));
const smoothstep = (n: number) => { const t = clamp(n); return t * t * (3 - 2 * t); };

export function stackPosition(index: number, count: number, scroll: number, height: number) {
  const length = Math.max(1, height - BAND_TOP - BAND_BOTTOM - TILE_SIZE);
  const rest = (Math.floor(index / 2) + .5) / Math.ceil(count / 2);
  // Equal speeds within a column preserve the space between neighbouring tiles.
  const speed = index % 2 === 0 ? .32 : .24;
  const raw = rest * length - scroll * speed;
  const position = ((raw % length) + length) % length;
  return {
    y: BAND_TOP + position,
    opacity: .85 * smoothstep(Math.min(position, length - position) / 40),
  };
}

export const stackEndFade = (progress: number) => 1 - smoothstep((progress - .95) / .04);
