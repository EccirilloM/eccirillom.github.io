// Adapted from Sagar Gupta's portfolio-react StackFieldBackdrop (GPL-3.0).
// Fourteen user-selected icons, evenly spaced columns, 2026-10-13.
import { useEffect, useState, type CSSProperties } from 'react';
import { motion, useMotionValue, useScroll, useTransform, type MotionValue } from 'motion/react';
import { sideSkills } from './SkillIcons';
import { SIDE_MEDIA, BAND_TOP, BAND_BOTTOM, TILE_SIZE, stackEndFade, stackPosition } from './stackGeometry';

const edge = (i: number): CSSProperties => ({ [i % 2 === 0 ? 'left' : 'right']: 16 + (i % 3) * 4 });

function Tile({ index, reduced }: { index: number; reduced: boolean }) {
  const { Icon, color, label } = sideSkills[index];
  return <motion.span className="original-stack-tile" style={{ color }} title={label}
    animate={reduced ? { y: 0, rotate: 0 } : { y: [0, -6, 0], rotate: [-2, 2, -2] }}
    transition={reduced ? { duration: 0 } : { duration: 10 + index * .4, repeat: Infinity, ease: 'easeInOut' }}>
    <Icon size={22} />
  </motion.span>;
}

function FloatingTile({ index, scroll, height, fade }: { index: number; scroll: MotionValue<number>; height: MotionValue<number>; fade: MotionValue<number> }) {
  const position = useTransform([scroll, height], ([s, h]: number[]) => stackPosition(index, sideSkills.length, s, h));
  const y = useTransform(position, p => p.y);
  const opacity = useTransform(() => position.get().opacity * fade.get());
  return <motion.div className="side-stack-slot" style={{ ...edge(index), y, opacity }}><Tile index={index} reduced={false} /></motion.div>;
}

function FloatingTiles() {
  const { scrollY, scrollYProgress } = useScroll();
  const height = useMotionValue(window.innerHeight);
  const fade = useTransform(scrollYProgress, stackEndFade);
  useEffect(() => {
    const update = () => height.set(window.innerHeight);
    window.addEventListener('resize', update, { passive: true });
    return () => window.removeEventListener('resize', update);
  }, [height]);
  return sideSkills.map(({ label }, index) => <FloatingTile key={label} index={index} scroll={scrollY} height={height} fade={fade} />);
}

export default function StackBackdrop({ reduced }: { reduced: boolean }) {
  const [wide, setWide] = useState(() => window.matchMedia(SIDE_MEDIA).matches);
  const [visible, setVisible] = useState(() => !document.hidden);
  useEffect(() => {
    const media = window.matchMedia(SIDE_MEDIA);
    const resize = () => setWide(media.matches);
    const visibility = () => setVisible(!document.hidden);
    media.addEventListener('change', resize);
    document.addEventListener('visibilitychange', visibility);
    return () => { media.removeEventListener('change', resize); document.removeEventListener('visibilitychange', visibility); };
  }, []);
  if (!wide) return null;
  return <div className="side-stack-backdrop" aria-hidden="true">
    {reduced || !visible ? sideSkills.map(({ label }, index) => <div className="side-stack-slot" key={label}
      style={{ ...edge(index), opacity: .7, top: `calc(${BAND_TOP}px + ${(Math.floor(index / 2) + .5) / Math.ceil(sideSkills.length / 2)} * (100% - ${BAND_TOP + BAND_BOTTOM + TILE_SIZE}px))` }}>
      <Tile index={index} reduced />
    </div>) : <FloatingTiles />}
  </div>;
}
