import { useEffect, useRef } from 'react';
import { animate, useMotionValue, useMotionValueEvent } from 'motion/react';
import { CROP_OFFSETS, fieldPath, fieldPoint } from './robotRoute';

const robotTransform = (t: number) => {
  const { x, y, heading } = fieldPoint(t);
  return `translate(${x} ${y}) rotate(${heading})`;
};

export default function FieldRobot({ running, reduced }: { running: boolean; reduced: boolean }) {
  const progress = useMotionValue(.45);
  const robot = useRef<SVGGElement>(null);
  // Keep this as an SVG attribute: CSS transforms use different units/origins.
  useMotionValueEvent(progress, 'change', t => {
    robot.current?.setAttribute('transform', robotTransform(t));
    robot.current?.setAttribute('opacity', String(Math.min(1, t / .06, (1 - t) / .06)));
  });
  useEffect(() => {
    if (reduced) { progress.set(.45); return; }
    if (!running) return;
    const playback = animate(progress, [0, 1], { duration: 14, ease: 'linear', repeat: Infinity });
    return () => playback.stop();
  }, [progress, reduced, running]);
  return <>
    {CROP_OFFSETS.map(offset => <g key={offset}>
      <path className="scene-crop" d={fieldPath(offset)} />
      {Array.from({ length: 11 }, (_, i) => {
        const { x, y, heading } = fieldPoint(i / 10, offset);
        return <path key={i} className="scene-crop-leaves" transform={`translate(${x} ${y}) rotate(${heading})`} d="M0 0l-5-4M0 0l5-4" />;
      })}
    </g>)}
    <path className="robot-guide" d={fieldPath()} />
    <g ref={robot} transform={robotTransform(.45)}>
      <path className="robot-scan" d="M0-10L-18-34Q0-44 18-34Z" />
      <rect className="robot-wheel" x="-12" y="-9" width="5" height="8" rx="1" />
      <rect className="robot-wheel" x="7" y="-9" width="5" height="8" rx="1" />
      <rect className="robot-wheel" x="-12" y="5" width="5" height="8" rx="1" />
      <rect className="robot-wheel" x="7" y="5" width="5" height="8" rx="1" />
      <rect className="robot-chassis" x="-8" y="-12" width="16" height="26" rx="4" />
      <path className="scene-accent" d="M-4-5l4-4 4 4" />
      <circle className="scene-signal" cx="0" cy="3" r="2.5" />
    </g>
  </>;
}
