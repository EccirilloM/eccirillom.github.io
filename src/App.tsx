import { useEffect, useRef, useState } from 'react';
import { Mail, X, Pause, Play } from 'lucide-react';
import { MotionConfig, useReducedMotion } from 'motion/react';
import AmbientBackground from './components/AmbientBackground';
import About from './components/About';
import Experience from './components/Experience';
import Education from './components/Education';
import Skills from './components/Skills';
import GitHubProfile from './components/GitHubProfile';
import Contact from './components/Contact';
import StackBackdrop from './components/StackBackdrop';
import { emailConfigured } from './emailConfig';
import { PortfolioHeader, PortfolioHero } from './components/HeaderHero';
import { copy, profile, type Language } from './content';



export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const c = copy[lang];
  const osReduced = useReducedMotion();
  const [motionOverride, setMotionOverride] = useState<boolean | null>(null);
  const reduced = motionOverride ?? !!osReduced;

  const [privacy, setPrivacy] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const modalOpen = privacy;
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  useEffect(() => {
    document.documentElement.dataset.motion = reduced ? 'reduced' : 'full';
  }, [reduced]);
  useEffect(() => {
    if (modalOpen) { dialog.current?.showModal(); document.body.style.overflow = 'hidden'; }
    else { dialog.current?.close(); document.body.style.overflow = ''; }
    return () => { document.body.style.overflow = ''; };
  }, [modalOpen]);
  const close = () => setPrivacy(false);
  return <MotionConfig reducedMotion={reduced ? 'always' : 'never'}>
    <AmbientBackground reducedMotion={reduced} />
    <StackBackdrop reduced={reduced} />
    <a className="skip-link" href="#main">{c.skip}</a>
    <PortfolioHeader lang={lang} setLang={setLang} />
    <main id="main">
      <PortfolioHero lang={lang} reduced={reduced} />
      <About lang={lang} reduced={reduced} />
      <Experience lang={lang} reduced={reduced} />
      <Education lang={lang} reduced={reduced} />
      <Skills lang={lang} reduced={reduced} />
      <GitHubProfile lang={lang} />
      <Contact lang={lang} />
    </main>
    <footer><a className="wordmark" href="#home">ec<span>.</span></a><p>© {new Date().getFullYear()} Ettore Cirillo <span>· {c.footer}</span></p><button onClick={() => setPrivacy(true)}>{c.privacy}</button></footer>
    <button className="motion-toggle" onClick={() => setMotionOverride(!reduced)} aria-label={reduced ? c.resumeMotion : c.motion} title={reduced ? c.resumeMotion : c.motion}>{reduced ? <Play size={14} /> : <Pause size={14} />}<span>{reduced ? c.resumeMotion : c.motion}</span></button>
    <dialog ref={dialog} className="detail-dialog" aria-labelledby="dialog-title" onCancel={close} onClose={close} onClick={e => { if (e.target === e.currentTarget) close(); }}><div className="dialog-inner"><button className="dialog-close icon-button" autoFocus onClick={close} aria-label={c.closePrivacy}><X /></button>
      {privacy && <div className="dialog-copy privacy-copy"><span className="section-label">{c.privacyIntro}</span><h2 id="dialog-title">{c.privacyTitle}</h2><p>{c.privacyBody}</p><p>{emailConfigured ? c.privacyContactActive : c.privacyContactInactive}</p><p>{c.privacyHosting}</p><p>{c.credits}</p><p><a href={profile.source}>{c.source} ↗</a> · <a href="/LICENSE.txt">{c.license}</a> · <a href="/THIRD_PARTY_NOTICES.txt">{c.notices}</a></p><p><a href="https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages">GitHub Pages privacy ↗</a></p><a href={`mailto:${profile.email}`}><Mail size={15} /> {profile.email}</a></div>}
    </div></dialog>
  </MotionConfig>;
}
