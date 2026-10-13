// Adapted from Sagar Gupta's portfolio-react SkillCategory, SkillRail and
// SkillTagGroup (GPL-3.0), with Ettore's six bilingual groups, 2026-10-13.
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { Binary, BookOpen, Bot, Boxes, Braces, Compass, Cpu, Crown, Database, GraduationCap, HeartHandshake, MessageCircle, Network, PanelsTopLeft, Puzzle, Sailboat, Sigma, Users, Wrench } from 'lucide-react';
import { technicalSkills, complementarySkills } from '../skills';
import type { Language } from '../content';
import { icons } from './SkillIcons';

function TechChip({ name }: { name: keyof typeof icons }) {
  const { Icon, color, label } = icons[name];
  return <span className="technology-chip"><Icon size={20} color={color} aria-hidden="true" />{label}</span>;
}

function SkillRail({ items, reverse, reduced }: { items: (keyof typeof icons)[]; reverse: boolean; reduced: boolean }) {
  const rail = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const inView = useInView(rail, { margin: '80px' });
  const [visible, setVisible] = useState(() => !document.hidden);
  useEffect(() => {
    const update = () => setVisible(!document.hidden);
    document.addEventListener('visibilitychange', update);
    return () => document.removeEventListener('visibilitychange', update);
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
  return <div ref={rail} className={'technology-rail' + (reverse ? ' is-reversed' : '')} data-running={inView && visible}>
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
        <SkillRail items={category.items} reverse={index % 2 === 1} reduced={reduced} />
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
