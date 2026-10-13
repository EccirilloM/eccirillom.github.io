// Adapted from Sagar Gupta's portfolio-react EducationCard and TimelineSpine,
// GPL-3.0. Ettore's bilingual education and course content, 2026-10-13.
import { useRef } from 'react';
import { motion, useInView, useScroll, useSpring } from 'motion/react';
import NumberFlow from '@number-flow/react';
import { BookOpen, GraduationCap, MapPin } from 'lucide-react';
import type { Language } from '../content';
import { educationEntries } from '../education';
import { DateRange } from './Experience';

// Same digit-wheel treatment as the template's AnimatedCounter.
function GradeBadge({ grade, lang, reduced }: { grade: number; lang: Language; reduced: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: .5 });
  const timing = { duration: 1200, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' };
  return <span ref={ref} className="education-grade" aria-label={`${lang === 'it' ? 'Voto finale' : 'Final grade'}: ${grade}`}>
    <span className="education-grade-value" aria-hidden="true"><NumberFlow value={inView || reduced ? grade : 0} animated={!reduced} locales="en-US" format={{ useGrouping: false }} spinTiming={timing} transformTiming={timing} /></span>
  </span>;
}

export default function Education({ lang, reduced }: { lang: Language; reduced: boolean }) {
  const timeline = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: timeline, offset: ['start 0.8', 'end 0.6'] });
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: .001 });
  const it = lang === 'it';
  return <section id="education" className="section template-education" aria-labelledby="education-heading">
    <div className="about-section-heading"><div><p className="about-eyebrow">03 / Polimi | KTH | ELIS</p><h2 id="education-heading">{it ? 'Formazione' : 'Education'}</h2></div><span aria-hidden="true" /></div>
    <ol ref={timeline} className="experience-list">
      <li className="experience-spine" aria-hidden="true" style={{ gridRow: `1 / ${educationEntries.length}` }}>
        <div className="experience-spine-line"><motion.div className="experience-spine-fill" style={{ scaleY: reduced ? 1 : progress }} /></div>
      </li>
      {educationEntries.map(item => <li className="experience-row" key={item.id}>
        <div className="experience-date"><DateRange period={item.period} lang={lang} />
          {item.location && <p><MapPin size={12} aria-hidden="true" />{item.location[lang]}</p>}
        </div>
        <div className={'experience-track' + (item.period.end ? '' : ' is-current')} aria-hidden="true"><span /></div>
        <article className="experience-card education-card" aria-labelledby={'education-' + item.id}>
          <div className="education-card-heading">
            <div className="education-heading-copy"><div className="education-institution"><span className="education-logo">{item.id === 'high-school' ? <GraduationCap size={22} aria-hidden="true" /> : <img src="/organizations/polimi.png" alt="" width={36} height={36} loading="lazy" />}</span><h3 id={'education-' + item.id}>{item.institution}</h3></div>
              <p className="education-degree">{item.title[lang]}</p>
            </div>
            {item.period.end === null ? <span className="education-current"><i className="original-status-dot" aria-hidden="true" />{it ? 'In corso' : 'In progress'}</span>
              : item.grade !== undefined && <GradeBadge grade={item.grade} lang={lang} reduced={reduced} />}
          </div>
          <div className="education-card-body">
            <p className="education-description"><BookOpen size={13} aria-hidden="true" />{item.description[lang]}</p>
            {item.skills.length > 0 && <ul className="education-skills" aria-label={it ? 'Materie e competenze' : 'Coursework and skills'}>{item.skills.map(skill => <li key={skill.en}>{skill[lang]}</li>)}</ul>}
            {item.extra && <div className="education-extra"><h4>{item.extra.title}<span>{item.extra.description[lang]}</span></h4>
              <ul className="education-skills" aria-label={it ? 'Competenze ELIS' : 'ELIS skills'}>{item.extra.skills.map(skill => <li key={skill}>{skill}</li>)}</ul>
            </div>}
          </div>
        </article>
      </li>)}
    </ol>
  </section>;
}
