import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ArrowRight, Mail, X, Pause, Play, Globe2 } from 'lucide-react';
import { MotionConfig, useReducedMotion } from 'motion/react';
import AmbientBackground from './components/AmbientBackground';
import About from './components/About';
import StackBackdrop from './components/StackBackdrop';
import Globe from './components/Globe';
import { PortfolioHeader, PortfolioHero } from './components/HeaderHero';
import { copy, experience, profile, projects, skills, type Language } from './content';



function ProjectArt({ kind }: { kind: string }) {
  return <div className={`project-art art-${kind}`} aria-hidden="true">
    <div className="art-grid" />
    {kind === 'sailing' ? <svg viewBox="0 0 480 240"><path className="blueprint" d="M80 186h320M240 35v140m-10-126L128 167h102zm23 32 74 86h-74zM116 181h238l-31 23H155z"/><path className="wave" d="M30 219q30-12 60 0t60 0t60 0t60 0t60 0t60 0t60 0"/><circle className="signal" cx="240" cy="180" r="34"/><circle className="signal outer" cx="240" cy="180" r="57"/><text x="32" y="35">ROS 2 / TELEMETRY</text><text x="350" y="225">01 / MOTH</text></svg>
    : kind === 'field' ? <svg viewBox="0 0 480 240"><path className="field-lines" d="m0 190 150-180M70 240 240 10M180 240 335 10M285 240 430 10M395 240 480 95"/><circle className="signal" cx="240" cy="130" r="68"/><circle className="signal outer" cx="240" cy="130" r="95"/><rect className="robot" x="214" y="96" width="52" height="70" rx="12"/><path className="blueprint" d="M207 103v20m66-20v20m-66 18v20m66-20v20m-34-62v-8"/><circle cx="240" cy="114" r="5" fill="#60a5fa"/><path className="route" d="m235 225 5-50m0-94 0-55"/><text x="32" y="35">PERCEPTION / NAVIGATION</text></svg>
    : <svg viewBox="0 0 480 240"><rect className="code-window" x="72" y="40" width="336" height="165" rx="8"/><path className="blueprint" d="M72 68h336"/><circle cx="90" cy="54" r="3" fill="#60a5fa"/><circle cx="102" cy="54" r="3" fill="#465865"/><circle cx="114" cy="54" r="3" fill="#465865"/><text x="100" y="97">interface ReliableSystem {'{'}</text><text x="117" y="122">patterns: 5;</text><text x="117" y="147">tests: JUnit;</text><text x="100" y="174">{'}'}</text><path className="route" d="m350 125 12 12 22-26"/></svg>}
  </div>;
}

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const c = copy[lang];
  const osReduced = useReducedMotion();
  const [motionOverride, setMotionOverride] = useState<boolean | null>(null);
  const reduced = motionOverride ?? !!osReduced;

  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState<string | null>(null);
  const [privacy, setPrivacy] = useState(false);
  const [worldTab, setWorldTab] = useState('journey');
  const dialog = useRef<HTMLDialogElement>(null);
  const selectedProject = projects.find(p => p.id === selected);
  const modalOpen = !!selectedProject || privacy;
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  useEffect(() => {
    document.documentElement.dataset.motion = reduced ? 'reduced' : 'full';
  }, [reduced]);
  useEffect(() => {
    if (modalOpen) { dialog.current?.showModal(); document.body.style.overflow = 'hidden'; }
    else { dialog.current?.close(); document.body.style.overflow = ''; }
    return () => { document.body.style.overflow = ''; };
  }, [modalOpen]);
  const close = () => { setSelected(null); setPrivacy(false); };
  return <MotionConfig reducedMotion={reduced ? 'always' : 'never'}>
    <AmbientBackground reducedMotion={reduced} />
    <StackBackdrop reduced={reduced} />
    <a className="skip-link" href="#main">{c.skip}</a>
    <PortfolioHeader lang={lang} setLang={setLang} />
    <main id="main">
      <PortfolioHero lang={lang} reduced={reduced} />
      <About lang={lang} reduced={reduced} />
      <section className="section learning-section">
        <div id="education" className="education"><h3>{c.education}</h3><div><span className="mono">2025 — {c.present}</span><h4>{c.master}</h4><p>Politecnico di Milano × KTH · EIT Digital</p></div><div><span className="mono">2021 — 2025</span><h4>{c.bachelor}</h4><p>Politecnico di Milano × ELIS College</p></div></div>
        <div id="skills" className="skills"><div><h3>{c.skillsTitle}</h3><p>{c.skillsNote}</p></div><div className="skill-list">{skills.map(s => <span key={s}>{s}</span>)}</div></div>
      </section>
      <section id="projects" className="section">
        <div className="section-label">{c.projectsLabel}</div><div className="section-heading"><div><h2>{c.projectsTitle}</h2><p>{c.projectsIntro}</p></div><div className="filters" role="group" aria-label={lang === 'it' ? 'Filtra progetti' : 'Filter projects'}>{[['all', c.all], ['software', c.software], ['robotics', c.robotics]].map(([key, label]) => <button key={key} aria-pressed={filter === key} onClick={() => setFilter(key)}>{label}</button>)}</div></div>
        <div className="projects-grid">{projects.filter(p => filter === 'all' || p.category === filter).map(p => <article className="project-card" key={p.id}>
          <button className="project-open" onClick={() => setSelected(p.id)} aria-label={`${c.details}: ${p.name}`}><ProjectArt kind={p.id} /><div className="project-content"><div className="project-meta"><span>{p.name}</span><span>{p.year}</span></div><h3>{p.title}<ArrowUpRight size={21} /></h3><p>{p[lang].description}</p><div className="tags">{p.tags.slice(0, 3).map(tag => <span key={tag}>{tag}</span>)}</div></div></button>
        </article>)}</div>
      </section>
      <section id="experience" className="section"><div className="section-label">{c.experienceLabel}</div><h2>{c.experienceTitle}</h2><div className="timeline">{experience.map(e => <article key={e.org}><span className="timeline-date mono">{e.date}</span><div className="timeline-dot" /><div><span className="company">{e.org}</span><h3>{e[lang][0]}</h3><p>{e[lang][1]}</p></div></article>)}</div><div id="achievements" className="certification"><span className="mono">ORACLE / 2022</span><span>Java SE 11 Developer</span></div></section>
      <section id="world" className="section"><div className="section-label">{c.globeLabel}</div><h2>{c.globeTitle}</h2><p className="world-intro">{c.globeIntro}</p>
        <div className="world-panel"><Globe lang={lang} reduced={reduced} journey={worldTab === 'journey'} /><div className="world-info"><div className="world-tabs" role="group" aria-label={lang === 'it' ? 'Contenuto del globo' : 'Globe content'}><button aria-pressed={worldTab === 'journey'} onClick={() => setWorldTab('journey')}>{c.journey}</button><button aria-pressed={worldTab === 'visitors'} onClick={() => setWorldTab('visitors')}>{c.visitors}</button></div><div className="world-tab-content" aria-live="polite"><span className="data-badge"><span />{worldTab === 'journey' ? c.journeyBadge : c.visitorsBadge}</span>{worldTab === 'journey' ? <ol className="places">{c.places.map((place, i) => <li key={place}><span className="place-number">0{i + 1}</span><div><h3>{place}</h3><p>{c.placesDesc[i]}</p></div></li>)}</ol> : <div className="visitor-empty"><Globe2 size={28} /><h3>{c.visitorsTitle}</h3><p>{c.visitorsText}</p></div>}</div></div></div>
      </section>
      <section id="contact" className="section contact-section"><div className="section-label">{c.contactLabel}</div><h2>{c.contactTitle}<br /><span>{c.contactAccent}</span></h2><p>{c.contactText}</p><a className="contact-email" href={`mailto:${profile.email}`}>{profile.email}<ArrowUpRight /></a><div className="contact-links"><a href={profile.github}>GitHub<ArrowUpRight size={15} /></a><a href={profile.linkedin}>LinkedIn<ArrowUpRight size={15} /></a></div></section>
    </main>
    <footer><a className="wordmark" href="#home">ec<span>.</span></a><p>© {new Date().getFullYear()} Ettore Cirillo <span>· {c.footer}</span></p><button onClick={() => setPrivacy(true)}>{c.privacy}</button></footer>
    <button className="motion-toggle" onClick={() => setMotionOverride(!reduced)} aria-label={reduced ? c.resumeMotion : c.motion} title={reduced ? c.resumeMotion : c.motion}>{reduced ? <Play size={14} /> : <Pause size={14} />}<span>{reduced ? c.resumeMotion : c.motion}</span></button>
    <dialog ref={dialog} className="detail-dialog" aria-labelledby="dialog-title" onCancel={close} onClose={close} onClick={e => { if (e.target === e.currentTarget) close(); }}><div className="dialog-inner"><button className="dialog-close icon-button" autoFocus onClick={close} aria-label={privacy ? c.closePrivacy : c.close}><X /></button>
      {selectedProject && <><ProjectArt kind={selectedProject.id} /><div className="dialog-copy"><span className="section-label">{selectedProject.name} / {selectedProject.year}</span><h2 id="dialog-title">{selectedProject.title}</h2><h3>{c.contribution}</h3><p>{selectedProject[lang].detail}</p><h3>{c.stack}</h3><div className="tags">{selectedProject.tags.map(t => <span key={t}>{t}</span>)}</div>{'url' in selectedProject ? <a className="button primary" href={selectedProject.url}>{c.repository}<ArrowRight size={16} /></a> : <p className="team-note">{c.teamNote}</p>}</div></>}
      {privacy && <div className="dialog-copy privacy-copy"><span className="section-label">{c.privacyIntro}</span><h2 id="dialog-title">{c.privacyTitle}</h2><p>{c.privacyBody}</p><p>{c.privacyHosting}</p><p>{c.credits}</p><p><a href={profile.source}>{c.source} ↗</a> · <a href="/LICENSE.txt">{c.license}</a> · <a href="/THIRD_PARTY_NOTICES.txt">{c.notices}</a></p><p><a href="https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages">GitHub Pages privacy ↗</a></p><a href={`mailto:${profile.email}`}><Mail size={15} /> {profile.email}</a></div>}
    </div></dialog>
  </MotionConfig>;
}
