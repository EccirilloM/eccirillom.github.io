// Layout adapted from portfolio-react GitHubCard / WideProfileCard / SplitBar,
// Sagar Gupta, GPL-3.0. Data is a dated local snapshot from GitHub itself.
import { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';
import { profile, type Language } from '../content';
import data from '../data/github.json';

const shades = ['#60a5fa', '#38bdf8', '#a78bfa', '#34d399', '#fbbf24', '#f472b6'];
export default function GitHubProfile({ lang }: { lang: Language }) {
  const scroller = useRef<HTMLDivElement>(null);
  useEffect(() => { const el = scroller.current; if (el) el.scrollLeft = el.scrollWidth; }, []);
  const it = lang === 'it';
  const locale = it ? 'it-IT' : 'en-GB';
  const date = (value: string) => new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(value));
  const lead = new Date(data.days[0].date).getUTCDay();
  const weeks = Math.ceil((data.days.length + lead) / 7);
  const totalLanguages = data.languages.reduce((sum, entry) => sum + entry.count, 0);
  return <section id="stats" className="section template-github" aria-labelledby="github-heading">
    <div className="about-section-heading"><div><p className="about-eyebrow">05 / {it ? 'Il codice, su GitHub' : 'Code, on GitHub'}</p><h2 id="github-heading">Coding Platform Profiles</h2></div><span aria-hidden="true" /></div>
    <article className="github-profile-card">
      <header className="github-profile-heading"><FaGithub size={20} aria-hidden="true" /><h3>GitHub</h3><span>@{data.username}</span><a href={profile.github} target="_blank" rel="noopener noreferrer">{it ? 'Visita' : 'View'}<ArrowUpRight size={14} aria-hidden="true" /></a></header>
      <dl className="github-metrics">{[
        [data.contributions, it ? 'Contributi nel periodo' : 'Contributions in period'],
        [data.publicRepos, it ? 'Repository pubblici' : 'Public repositories'],
      ].map(([value, label]) => <div key={label}><dt>{label}</dt><dd>{Number(value).toLocaleString(locale)}</dd></div>)}</dl>
      <p className="github-period">{date(data.from)} — {date(data.to)} · {it ? 'Aggiornato' : 'Updated'} {date(data.updatedAt)}</p>
      <div ref={scroller} className="github-calendar-scroll" tabIndex={0} role="region" aria-label={it ? 'Calendario dei contributi GitHub, scorribile orizzontalmente' : 'GitHub contribution calendar, horizontally scrollable'}>
        <div className="github-months" aria-hidden="true" style={{ gridTemplateColumns: `repeat(${weeks}, 1fr)` }}>{data.days.flatMap((day, index) => day.date.endsWith('-01') && index < data.days.length - 20 ? [<span key={day.date} style={{ gridColumn: `${Math.floor((index + lead) / 7) + 1} / span 3` }}>{new Intl.DateTimeFormat(locale, { month: 'short', timeZone: 'UTC' }).format(new Date(day.date))}</span>] : [])}</div>
        <svg className="github-calendar" viewBox={`0 0 ${weeks * 14} 98`} role="img" aria-label={`${data.contributions} ${it ? 'contributi nel periodo visualizzato. Ogni quadrato rappresenta un giorno.' : 'contributions in the displayed period. Each square represents one day.'}`}>
          {data.days.map((day, index) => <rect key={day.date} x={Math.floor((index + lead) / 7) * 14} y={((index + lead) % 7) * 14} width="11" height="11" rx="2" data-level={day.level}><title>{date(day.date)}: {day.count} {it ? 'contributi' : 'contributions'}</title></rect>)}
        </svg>
      </div>
      <div className="github-legend"><span>{it ? 'Meno' : 'Less'}</span>{[0, 1, 2, 3, 4].map(level => <i key={level} data-level={level} aria-hidden="true" />)}<span>{it ? 'Più' : 'More'}</span></div>
      {data.languages.length > 0 && <div className="github-languages"><h4>{it ? 'Linguaggi principali dei repository originali pubblici' : 'Primary languages of original public repositories'}</h4>
        <div className="github-language-bar" aria-hidden="true">{data.languages.map((entry, index) => <span key={entry.name} style={{ flex: entry.count, background: shades[index % shades.length] }} />)}</div>
        <ul>{data.languages.map((entry, index) => <li key={entry.name}><i style={{ background: shades[index % shades.length] }} aria-hidden="true" />{entry.name}<span>{Math.round(entry.count / totalLanguages * 100)}%</span></li>)}</ul>
      </div>}
      <p className="github-source-note">{it ? 'Dati del profilo pubblico, aggiornati alla data indicata.' : 'Public profile data, as of the date shown.'}</p>
    </article>
  </section>;
}
