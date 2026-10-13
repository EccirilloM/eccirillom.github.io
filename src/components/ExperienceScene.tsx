import { useEffect, useRef, useState } from 'react';
import { useInView } from 'motion/react';
import type { ExperienceScene as SceneKind } from '../experience';

import SailingPipeline from './SailingPipeline';
import FieldRobot from './FieldRobot';
import SailingLesson from './SailingLesson';

// Original decorative illustrations; these depict the work, not live telemetry.
export default function ExperienceScene({ kind, reduced }: { kind: SceneKind; reduced: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '80px' });
  const [visible, setVisible] = useState(() => !document.hidden);
  useEffect(() => {
    const update = () => setVisible(!document.hidden);
    document.addEventListener('visibilitychange', update);
    return () => document.removeEventListener('visibilitychange', update);
  }, []);

  return <div ref={ref} className={'experience-scene scene-' + kind} aria-hidden="true" data-running={!reduced && inView && visible}>
    <svg viewBox="0 0 320 200" focusable="false">
      <path className="scene-grid" d="M0 40h320M0 80h320M0 120h320M0 160h320M40 0v200M80 0v200M120 0v200M160 0v200M200 0v200M240 0v200M280 0v200" />
      {kind === 'sailing' && <SailingPipeline />}
      {kind === 'instruction' && <SailingLesson />}
      {kind === 'robot' && <FieldRobot running={!reduced && inView && visible} reduced={reduced} />}
      {kind === 'claims' && <>
        <rect className="scene-panel" x="22" y="60" width="66" height="88" rx="7" />
        <path className="scene-line" d="M35 81h39M35 93h27M35 110h39M35 122h30M35 134h20" />
        <path className="scene-accent scene-flow" d="M89 105h46" />
        <rect className="scene-panel" x="136" y="47" width="164" height="111" rx="8" />
        <path className="scene-line" d="M136 69h164M150 84h75M150 108h75M150 132h75" />
        {[84, 108, 132].map((y, i) => <g className="scene-check" key={y} style={{ animationDelay: `${i * .7}s` }}>
          <circle className="scene-check-ring" cx="272" cy={y} r="8" /><path className="scene-accent" d={`M268 ${y}l3 3 5-6`} />
        </g>)}
      </>}
      {kind === 'road' && <>
        <rect className="scene-panel" x="23" y="45" width="185" height="134" rx="10" />
        <path className="scene-map-road" d="M38 90h152M83 58v108M163 58v108M38 137h152" />
        <path className="scene-accent scene-flow" d="M45 137h38V90h80V64" />
        <g className="scene-pin"><path className="scene-fill" d="M153 70a10 10 0 1 1 20 0c0 8-10 18-10 18s-10-10-10-18z" /><circle cx="163" cy="70" r="3" fill="#60a5fa" /></g>
        <path className="scene-accent scene-flow" d="M209 109h23" />
        <rect className="scene-panel" x="234" y="65" width="66" height="92" rx="7" />
        <path className="scene-line" d="M245 84h44M245 101h34M245 114h44M245 127h27" />
        <circle className="scene-signal" cx="267" cy="143" r="3" />
      </>}
    </svg>
  </div>;
}
