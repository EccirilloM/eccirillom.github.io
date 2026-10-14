// Adapted from Sagar Gupta's portfolio-react SkillCategory, SkillRail and
// SkillTagGroup (GPL-3.0), with Ettore's six bilingual groups, 2026-10-13.
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { PointerEvent } from 'react';
import { motion, useInView } from 'motion/react';
import { Binary, BookOpen, Bot, Boxes, Braces, Compass, Cpu, Crown, Database, GraduationCap, HeartHandshake, MessageCircle, Network, PanelsTopLeft, Puzzle, Sailboat, Sigma, Users, Wrench } from 'lucide-react';
import { technicalSkills, complementarySkills } from '../skills';
import type { Language } from '../content';
import { icons } from './SkillIcons';

function TechChip({ name }: { name: keyof typeof icons }) {
  const { Icon, color, label } = icons[name];
  return <span className="technology-chip"><Icon size={20} color={color} aria-hidden="true" />{label}</span>;
}

function SkillRail({ items, reverse, reduced, label }: { items: (keyof typeof icons)[]; reverse: boolean; reduced: boolean; label: string }) {
  const rail = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const gesture = useRef<{ id: number; x: number; y: number; dragging: boolean } | null>(null);
  // Scrub the existing CSS animation so dragging and autoplay share one position.
  const shift = (pixels: number) => {
    const element = track.current;
    const animation = element?.getAnimations()[0];
    const duration = Number(animation?.effect?.getComputedTiming().duration);
    const width = element ? element.scrollWidth / 2 : 0;
    if (!animation || !width || !Number.isFinite(duration) || duration <= 0) return;
    const next = Number(animation.currentTime ?? 0) + pixels * duration / width * (reverse ? 1 : -1);
    animation.currentTime = ((next % duration) + duration) % duration;
  };
  const finish = () => {
    const current = gesture.current;
    gesture.current = null;
    rail.current?.removeAttribute('data-dragging');
    if (current && rail.current?.hasPointerCapture(current.id)) rail.current.releasePointerCapture(current.id);
  };
  const start = (event: PointerEvent<HTMLDivElement>) => {
    if (!event.isPrimary || event.button !== 0 || gesture.current) return;
    gesture.current = { id: event.pointerId, x: event.clientX, y: event.clientY, dragging: false };
    event.currentTarget.setAttribute('data-dragging', 'true');
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const move = (event: PointerEvent<HTMLDivElement>) => {
    const current = gesture.current;
    if (!current || current.id !== event.pointerId) return;
    const dx = event.clientX - current.x;
    const dy = event.clientY - current.y;
    if (!current.dragging) {
      if (Math.max(Math.abs(dx), Math.abs(dy)) < 6) return;
      if (Math.abs(dy) > Math.abs(dx)) { finish(); return; }
      current.dragging = true;
    }
    shift(dx);
    current.x = event.clientX;
    current.y = event.clientY;
  };
  const inView = useInView(rail, { margin: '80px' });
  const [visible, setVisible] = useState(() => !document.hidden);
  useEffect(() => {
    const update = () => { setVisible(!document.hidden); if (document.hidden) finish(); };
    document.addEventListener('visibilitychange', update);
    window.addEventListener('blur', finish);
    return () => { document.removeEventListener('visibilitychange', update); window.removeEventListener('blur', finish); };
  }, []);
  useLayoutEffect(() => {
    const element = track.current;
    if (!element || reduced) return;
    const measure = () => rail.current?.style.setProperty('--skills-duration', `${element.scrollWidth / 2 / 40}s`);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, [reduced, items]);
  if (reduced) return <div ref={rail}><ul className="technology-wrap">{items.map(name => <li key={name}><TechChip name={name} /></li>)}</ul></div>;
  // Each half exceeds the widest section, preventing empty gaps in the loop.
  const copy = Array.from({ length: Math.ceil(12 / items.length) }, () => items).flat();
  return <div ref={rail} className={'technology-rail' + (reverse ? ' is-reversed' : '')} data-running={inView && visible}
    role="group" aria-label={label} tabIndex={0}
    onPointerDown={start} onPointerMove={move}
    onPointerUp={event => { if (gesture.current?.id === event.pointerId) finish(); }}
    onPointerCancel={event => { if (gesture.current?.id === event.pointerId) finish(); }}
    onLostPointerCapture={event => { if (gesture.current?.id === event.pointerId) finish(); }}
    onDragStart={event => event.preventDefault()}
    onKeyDown={event => {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      event.preventDefault();
      shift(event.key === 'ArrowRight' ? -180 : 180);
    }}>
    <ul className="skills-sr-only">{items.map(name => <li key={name}>{icons[name].label}</li>)}</ul>
    <div ref={track} className="technology-track" aria-hidden="true">{[0, 1].map(half =>
      <div className="technology-group" key={half}>{copy.map((name, index) => <TechChip key={`${index}-${name}`} name={name} />)}</div>
    )}</div>
  </div>;
}

const primaryGlyphs = [Braces, Bot, PanelsTopLeft];
const secondaryGlyphs = [BookOpen, HeartHandshake, Compass];
const itemGlyphs = [
  [Binary, Boxes, Network, Wrench, Cpu, Database],
  [Crown, Users, MessageCircle, GraduationCap, Puzzle],
  [Cpu, Sigma, Bot, Sailboat],
];

export default function Skills({ lang, reduced }: { lang: Language; reduced: boolean }) {
  return <section id="skills" className="section template-skills" aria-labelledby="skills-heading">
    <div className="about-section-heading"><div><p className="about-eyebrow">04 / {lang === 'it' ? 'Gli strumenti del mio lavoro' : 'What I work with'}</p>
      <h2 id="skills-heading">{lang === 'it' ? 'Competenze e tecnologie' : 'Skills & Technologies'}</h2></div><span aria-hidden="true" /></div>
    <div className="skills-categories">{technicalSkills.map((category, index) => {
      const Glyph = primaryGlyphs[index];
      return <motion.div key={category.id} className="skills-category" initial={reduced ? false : { opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ duration: .4 }}>
        <h3 className="skills-rule"><span><Glyph size={14} aria-hidden="true" />{category.title[lang]}</span></h3>
        <SkillRail items={category.items} reverse={index % 2 === 1} reduced={reduced}
          label={`${category.title[lang]}. ${lang === 'it' ? 'Trascina o usa le frecce sinistra e destra per scorrere.' : 'Drag or use the left and right arrow keys to browse.'}`} />
      </motion.div>;
    })}</div>
    <div className="skills-secondary">{complementarySkills.map((category, index) => {
      const Glyph = secondaryGlyphs[index];
      return <motion.div key={category.id} className="skills-category" initial={reduced ? false : { opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ duration: .4 }}>
        <h3 className="skills-rule"><span><Glyph size={14} aria-hidden="true" />{category.title[lang]}</span></h3>
        <ul className="technology-wrap secondary-tags">{category.items.map((item, itemIndex) => {
          const ItemIcon = itemGlyphs[index][itemIndex];
          return <li key={item.en}><span className="technology-chip"><ItemIcon size={16} color="#60a5fa" aria-hidden="true" />{item[lang]}</span></li>;
        })}</ul>
      </motion.div>;
    })}</div>
  </section>;
}
