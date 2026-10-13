// Layout adapted from Sagar Gupta's portfolio-react About / DevAvatar / QuickFacts.
// GPL-3.0. Adapted for Ettore Cirillo, 2026-10-13.
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { motion, useInView } from 'motion/react';
import { Bot, Code2, Cpu, GraduationCap, Languages, MapPin, Sailboat } from 'lucide-react';
import type { Language } from '../content';
import { orbitSkills } from './SkillIcons';

const highlightIcons = [Sailboat, GraduationCap, Bot, Code2];
const highlightColors = ['#60a5fa', '#a78bfa', '#34d399', '#fbbf24'];
const factsIcons = [MapPin, Cpu, GraduationCap, Languages];
const content = {
  it: {
    title: 'Chi', accent: 'sono', subtitle: 'Software, HPC e robotica',
    status: 'Doppia laurea magistrale in HPC @ Polimi | KTH', greeting: 'Ciao, sono Ettore.',
    cards: [
      <>Come <strong>Co-Head of Mechatronics del Polimi Sailing Team</strong>, lavoro sulla comunicazione tra i sensori di bordo e il sistema di controllo della Moth, e sulle interfacce per regolare i parametri in tempo reale e mappare la barca. Coordino inoltre il team di meccatronica e organizzo sessioni di formazione tecnica per i suoi membri.</>,
      <>Studio <strong>High Performance Computing tra Politecnico di Milano e KTH</strong>, nel percorso EIT Digital, dopo la laurea in ingegneria informatica al Polimi.</>,
      <>In <strong>AIRLab, il laboratorio di intelligenza artificiale e robotica del Polimi</strong>, ho contribuito allo sviluppo di un robot autonomo capace di muoversi tra i filari di mais. Ho integrato e calibrato i sensori per la percezione dell’ambiente e la mappatura, lavorando al progetto per il Field Robot Event.</>,
      <>Durante gli stage in <strong>AVR Tech</strong> ho contribuito alla digitalizzazione della gestione delle pratiche attive e passive legate ai contratti di servizio. Ho inoltre sviluppato un’applicazione web per la rendicontazione dei lavori di gestione stradale, semplificando la raccolta dei dati e riducendo i tempi di elaborazione.</>,
    ],
    facts: [['Dove vivo', 'Roma, Italia'], ['Focus', 'HPC e robotica'], ['Formazione', 'Polimi | KTH'], ['Lingue', 'Inglese e italiano']],
  },
  en: {
    title: 'About', accent: 'me', subtitle: 'Software, HPC & robotics',
    status: 'Double MSc in HPC @ Polimi | KTH', greeting: 'Hi, I’m Ettore.',
    cards: [
      <>As <strong>Co-Head of Mechatronics at Polimi Sailing Team</strong>, I work on communication between our Moth’s onboard sensors and its control system, and on interfaces for real-time parameter tuning and boat mapping. I also coordinate the mechatronics team and organise technical training sessions for its members.</>,
      <>I study <strong>High Performance Computing at Politecnico di Milano and KTH</strong> through EIT Digital, following my bachelor’s degree in computing systems engineering at Polimi.</>,
      <>At <strong>AIRLab, Polimi’s Artificial Intelligence and Robotics Lab</strong>, I helped develop an autonomous robot capable of navigating through corn rows. I integrated and calibrated sensors for environmental perception and mapping as part of the team’s work for the Field Robot Event.</>,
      <>During my internships at <strong>AVR Tech</strong>, I helped digitise the management of incoming and outgoing claims under service contracts. I also developed a web application for reporting road-management work, simplifying data collection and reducing processing times.</>,
    ],
    facts: [['Based in', 'Rome, Italy'], ['Focus', 'HPC & robotics'], ['Education', 'Polimi | KTH'], ['Languages', 'English & Italian']],
  },
};

export default function About({ lang, reduced }: { lang: Language; reduced: boolean }) {
  const c = content[lang];
  const ref = useRef<HTMLElement>(null);
  const visible = useInView(ref, { margin: '100px' });
  const [tabVisible, setTabVisible] = useState(() => !document.hidden);
  useEffect(() => {
    const update = () => setTabVisible(!document.hidden);
    document.addEventListener('visibilitychange', update);
    return () => document.removeEventListener('visibilitychange', update);
  }, []);
  const running = !reduced && visible && tabVisible;
  return <section id="about" ref={ref} className="section template-about" aria-labelledby="about-heading">
    <div className="about-section-heading">
      <div><p className="about-eyebrow">01 / {c.subtitle}</p><h2 id="about-heading">{c.title} <em>{c.accent}</em></h2></div>
      <span aria-hidden="true" />
    </div>
    <div className="template-about-grid">
      <div className="about-avatar-column">
        <div className="about-avatar-frame" data-running={running}>
          <div className="about-avatar-halo" /><div className="about-orbit-ring" />
          <div className="about-avatar-disc"><img className="about-portrait" src="/ettore.jpg" alt="Ettore Cirillo" width="168" height="168" loading="lazy" /></div>
          <div className="about-orbit" aria-hidden="true">{orbitSkills.map(({ Icon, label }, i) => <div key={label} className="about-orbit-position"
            style={{ '--angle': `${i * 360 / orbitSkills.length}deg` } as CSSProperties}>
            <div className="about-orbit-counter"><span className="about-orbit-tile" title={label}><Icon size={18} /></span></div>
          </div>)}</div>
        </div>
      </div>
      <div className="about-biography">
        <div className="about-status"><span className="original-status-dot" aria-hidden="true" />{c.status}</div>
        <h3>{c.greeting}</h3>
        <div className="about-highlights">{c.cards.map((card, i) => {
          const Icon = highlightIcons[i];
          return <motion.div key={i} className="about-highlight" style={{ '--card-accent': highlightColors[i] } as CSSProperties}
            whileHover={reduced ? undefined : { y: -6 }} transition={{ duration: .2 }}>
            <span className="about-highlight-icon" aria-hidden="true"><Icon size={16} /></span><p>{card}</p>
          </motion.div>;
        })}</div>
      </div>
    </div>
    <dl className="about-quick-facts">{c.facts.map(([label, value], i) => {
      const Icon = factsIcons[i];
      return <div key={label}><Icon size={18} aria-hidden="true" /><dt>{label}</dt><dd>{value}</dd></div>;
    })}</dl>
  </section>;
}
