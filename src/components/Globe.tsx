import { useEffect, useRef, useState } from 'react';
import createGlobe from 'cobe';
import type { Language } from '../content';
import { copy } from '../content';

// Original integration; no source from Shengxiang-Lin's website is used.
export default function Globe({ lang, reduced, journey }: { lang: Language; reduced: boolean; journey: boolean }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const angle = useRef(0.35);
  const drag = useRef<number | null>(null);
  const [unavailable, setUnavailable] = useState(false);
  const c = copy[lang];
  useEffect(() => {
    const el = canvas.current;
    if (!el) return;
    let width = el.clientWidth;
    let visible = true;
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    observer.observe(el);
    const resize = new ResizeObserver(() => { width = el.clientWidth; });
    resize.observe(el);
    try {
      const globe = createGlobe(el, {
        devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2), width, height: width,
        phi: angle.current, theta: 0.26, dark: 1, diffuse: 1.2,
        mapSamples: 20000, mapBrightness: 4.5,
        baseColor: [0.17, 0.29, 0.4], markerColor: [0.38, 0.67, 1], glowColor: [0.09, 0.17, 0.25],
        markers: journey ? [
          { location: [41.9028, 12.4964], size: 0.065 },
          { location: [45.4642, 9.19], size: 0.065 },
          { location: [59.3293, 18.0686], size: 0.065 },
        ] : [],
        onRender: state => {
          if (!reduced && visible && !document.hidden && drag.current === null) angle.current += 0.002;
          state.phi = angle.current;
          state.width = width;
          state.height = width;
        },
      });
      setUnavailable(false);
      return () => { globe.destroy(); observer.disconnect(); resize.disconnect(); };
    } catch {
      setUnavailable(true);
      observer.disconnect(); resize.disconnect();
    }
  }, [reduced, journey]);
  return <div className="globe-visual">
    <div className="globe-orbit" aria-hidden="true" />
    <canvas ref={canvas} role="img" aria-label={c.globeAria} tabIndex={0}
      onKeyDown={e => { if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { e.preventDefault(); angle.current += e.key === 'ArrowLeft' ? -0.2 : 0.2; } }}
      onPointerDown={e => { drag.current = e.clientX; e.currentTarget.setPointerCapture(e.pointerId); }}
      onPointerMove={e => { if (drag.current !== null) { angle.current += (e.clientX - drag.current) / 180; drag.current = e.clientX; } }}
      onPointerUp={() => { drag.current = null; }} onPointerCancel={() => { drag.current = null; }} onLostPointerCapture={() => { drag.current = null; }} />
    <span className="globe-coordinate" aria-hidden="true">41°54′ N / 12°29′ E</span>
    <p className="globe-caption">{unavailable ? c.globeFallback : c.globeHint}</p>
  </div>;
}
