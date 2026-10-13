// Live performance row adapted from Sagar Gupta's FooterEndNote (GPL-3.0).
// Measurements stay in React memory: no storage, reporting or network transport.
import { useEffect, useState } from 'react';
import type { Metric } from 'web-vitals';
import type { Language } from '../content';

const metrics = ['LCP', 'INP', 'CLS', 'TTFB'] as const;
const colors = { good: '#22c55e', 'needs-improvement': '#f59e0b', poor: '#f87171' };
type Reading = { value: string; rating: Metric['rating'] };

export default function FooterVitals({ lang }: { lang: Language }) {
  const [readings, setReadings] = useState<Record<string, Reading>>({});
  useEffect(() => {
    let active = true;
    void import('web-vitals').then(({ onCLS, onINP, onLCP, onTTFB }) => {
      if (!active) return;
      const report = ({ name, value, rating }: Metric) => {
        if (!active) return;
        const formatted = name === 'CLS' ? value.toFixed(3) : value >= 1000 ? `${(value / 1000).toFixed(2)} s` : `${Math.round(value)} ms`;
        setReadings(previous => ({ ...previous, [name]: { value: formatted, rating } }));
      };
      const options = { reportAllChanges: true };
      onCLS(report, options); onINP(report, options); onLCP(report, options); onTTFB(report, options);
    }).catch(() => { /* Keep unavailable measurements empty; no fabricated values. */ });
    return () => { active = false; };
  }, []);
  return <div className="footer-vitals" aria-label={lang === 'it' ? 'Prestazioni di questa visita, misurate localmente' : 'Your visit, measured locally'}>
    <span className="footer-vitals-label">{lang === 'it' ? 'La tua visita, misurata sul tuo dispositivo' : 'Your visit, measured on you'}</span>
    {metrics.map(name => <span className="footer-vital" key={name}><span className="footer-vital-dot" aria-hidden="true" style={{ background: readings[name] ? colors[readings[name].rating] : '#ffffff2e' }} />{name} <span className="footer-vital-value">{readings[name]?.value ?? (name === 'INP' ? (lang === 'it' ? 'interagisci' : 'tap anything') : '…')}</span></span>)}
  </div>;
}
