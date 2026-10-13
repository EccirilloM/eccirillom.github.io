// Layout adapted from portfolio-react Experience / TimelineCard / CompanyHeader,
// copyright Sagar Gupta, GPL-3.0. Ettore's content and SVG scenes, 2026-10-13.
import { ChevronDown, MapPin } from 'lucide-react';
import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { experienceEntries, type Period } from '../experience';
import type { Language } from '../content';
import ExperienceScene from './ExperienceScene';

const companyLogos = {
  sailing: 'polimi-sailing-team.svg', robot: 'airlab.png',
  claims: 'avr.png', road: 'avr.png', instruction: 'lega-navale.png',
};

export function DateRange({ period, lang }: { period: Period; lang: Language }) {
  const format = (value: string) => /^\d{4}$/.test(value) ? value : new Intl.DateTimeFormat(lang === 'it' ? 'it-IT' : 'en-GB',
    { month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(value + '-01T00:00:00Z'));
  return <><time dateTime={period.start}>{format(period.start)}</time><span className="experience-date-separator"> — </span>
    {period.end ? <time dateTime={period.end}>{format(period.end)}</time> : <span className="experience-present"><i className="original-status-dot" aria-hidden="true" />{lang === 'it' ? 'Presente' : 'Present'}</span>}</>;
}

export default function Experience({ lang, reduced }: { lang: Language; reduced: boolean }) {
  const it = lang === 'it';
  const timeline = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: timeline, offset: ['start 0.8', 'end 0.6'] });
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: .001 });
  return <section id="experience" className="section template-experience" aria-labelledby="experience-heading">
    <div className="about-section-heading">
      <div><p className="about-eyebrow">02 / {it ? 'Dove ho lavorato' : 'Where I’ve worked'}</p>
        <h2 id="experience-heading">{it ? 'Esperienze' : 'Experience'}</h2></div><span aria-hidden="true" />
    </div>
    <ol ref={timeline} className="experience-list">
      <li className="experience-spine" aria-hidden="true" style={{ gridRow: `1 / ${experienceEntries.length}` }}>
        <div className="experience-spine-line"><motion.div className="experience-spine-fill" style={{ scaleY: reduced ? 1 : progress }} /></div>
      </li>
      {experienceEntries.map(item => {
      return <li className="experience-row" key={item.id}>
        <div className="experience-date"><DateRange period={item.period} lang={lang} /><p><MapPin size={12} aria-hidden="true" />{item.location[lang]}</p><small>{item.mode[lang]}</small></div>
        <div className={'experience-track' + (item.period.end ? '' : ' is-current')} aria-hidden="true"><span /></div>
        <article className="experience-card" aria-labelledby={'experience-' + item.id}>
          <div className="experience-card-top">
            <div className="experience-card-heading">
              <div className="experience-company"><span className={'experience-company-icon' + (item.scene === 'robot' ? ' logo-on-dark' : '')}><img src={'/organizations/' + companyLogos[item.scene]} alt="" width={36} height={36} loading="lazy" /></span><h3 id={'experience-' + item.id}>{item.company}</h3></div>
              <p className="experience-role">{item.role[lang]}</p><span className="experience-kind">{item.kind[lang]}</span>
              <p className="experience-summary">{item.summary[lang]}</p>
            </div>
            <ExperienceScene kind={item.scene} reduced={reduced} />
          </div>
          {item.progression && <div className="experience-progression"><h4>{it ? 'Progressione dei ruoli' : 'Role progression'}</h4><ol>{item.progression.map(role =>
            <li key={role.period.start}><p>{role.role[lang]}</p><div><DateRange period={role.period} lang={lang} /></div></li>
          )}</ol></div>}
          {item.responsibilities[lang].length > 0 && <details className="experience-responsibilities">
            <summary>{it ? 'Attività e responsabilità' : 'Responsibilities'}<ChevronDown size={15} aria-hidden="true" /></summary>
            <ul>{item.responsibilities[lang].map(text => <li key={text}>{text}</li>)}</ul>
            <ul className="experience-skills" aria-label={it ? 'Competenze' : 'Skills'}>{item.skills.map(skill => <li key={skill}>{skill}</li>)}</ul>
          </details>}
        </article>
      </li>;
    })}</ol>
  </section>;
}
