// Navigation, hero layout and visual tokens adapted from Sagar Gupta's
// portfolio-react, GPL-3.0. Modified for Ettore Cirillo on 2026-10-13.
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'motion/react';
import { ArrowDownRight, ArrowUpRight, ChevronDown, Download, FileText, Hash, Menu, Search, X } from 'lucide-react';
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa6';
import { copy, profile, type Language } from '../content';
import Avatar from './Avatar';
import { sideSkills } from './SkillIcons';

const labels = {
  en: {
    primary: ['About', 'Experience', 'Skills', 'Projects'],
    more: ['Education', 'Awards', 'Stats'],
    blurbs: ['Degrees and academic journey', 'Certifications and achievements', 'GitHub and coding activity'],
    contact: 'Contact Me', moreLabel: 'More', hello: 'Hi, I’m',
    role: 'Mechatronics Engineering @ Polimi Sailing Team',
    headline: 'Software, robotics & high performance computing.',
    taglines: ['Curiosity, translated into code.', 'From software to the systems it moves.', 'Learning. Building. Exploring.'],
    latest: 'Latest', latestText: 'NSBSolver · Parallel Stokes–Brinkman solver', projects: 'See projects',
    read: 'Read CV', download: 'Download PDF',
    statsTitle: 'My work on GitHub', statsBody: 'Activity statistics will be added in a later step. You can already explore my public repositories.',
    github: 'Open GitHub profile', search: 'Search sections and links…', empty: 'No matching commands.',
    navigation: 'Navigation', profiles: 'Links', searchLabel: 'Command palette',
    close: 'Close', top: 'Back to top', scroll: 'Scroll', menu: 'Navigation menu',
    keyboard: '↑ ↓ navigate · Enter select · Esc close',
  },
  it: {
    primary: ['Chi sono', 'Esperienze', 'Competenze', 'Progetti'],
    more: ['Formazione', 'Riconoscimenti', 'Statistiche'],
    blurbs: ['Studi e percorso universitario', 'Certificazioni e riconoscimenti', 'GitHub e attività di sviluppo'],
    contact: 'Contattami', moreLabel: 'Altro', hello: 'Ciao, sono',
    role: 'Ingegneria meccatronica @ Polimi Sailing Team',
    headline: 'Software, robotica e high performance computing.',
    taglines: ['La curiosità diventa codice.', 'Dal software ai sistemi che mette in movimento.', 'Imparare. Costruire. Esplorare.'],
    latest: 'Novità', latestText: 'NSBSolver · Solver parallelo Stokes–Brinkman', projects: 'Vedi i progetti',
    read: 'Leggi il CV', download: 'Scarica PDF',
    statsTitle: 'Il mio lavoro su GitHub', statsBody: 'Aggiungeremo le statistiche di attività in uno dei prossimi passaggi. Intanto puoi esplorare i miei repository pubblici.',
    github: 'Apri il profilo GitHub', search: 'Cerca sezioni e link…', empty: 'Nessun comando trovato.',
    navigation: 'Navigazione', profiles: 'Collegamenti', searchLabel: 'Ricerca nel sito',
    close: 'Chiudi', top: 'Torna all’inizio', scroll: 'Scorri', menu: 'Menu di navigazione',
    keyboard: '↑ ↓ naviga · Invio seleziona · Esc chiudi',
  },
};
const primaryIds = ['about', 'experience', 'skills', 'projects'];
const moreIds = ['education', 'achievements', 'stats'];
const social = [
  { name: 'LinkedIn', url: profile.linkedin, Icon: FaLinkedin },
  { name: 'GitHub', url: profile.github, Icon: FaGithub },
  { name: 'Instagram', url: profile.instagram, Icon: FaInstagram },
];

function HeroStack({ reduced }: { reduced: boolean }) {
  return <div className="original-hero-stack" aria-hidden="true">{sideSkills.slice(0, 6).map(({ label, Icon, color }, index) =>
    <motion.div key={label} className={'original-stack-slot slot-' + index}
      animate={reduced ? undefined : { y: [0, -6, 0], rotate: [-3, 3, -3] }}
      transition={{ duration: 9 + index, repeat: Infinity, ease: 'easeInOut' }}>
      <span className="original-stack-tile" style={{ color }}><Icon size={24} /></span>
    </motion.div>)}</div>;
}

export function PortfolioHeader({ lang, setLang }: { lang: Language; setLang: (lang: Language) => void }) {
  const c = labels[lang];
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('home');
  const [dialogKind, setDialogKind] = useState<'palette' | 'stats' | null>(null);
  const [query, setQuery] = useState('');
  const dialog = useRef<HTMLDialogElement>(null);
  const more = useRef<HTMLDivElement>(null);
  const moreButton = useRef<HTMLButtonElement>(null);
  const paletteInput = useRef<HTMLInputElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const closeDialog = () => { setDialogKind(null); setQuery(''); };

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 20);
      const sections = ['home', ...primaryIds, 'education', 'achievements', 'contact']
        .map(id => ({ id, top: document.getElementById(id)?.getBoundingClientRect().top ?? Infinity }))
        .filter(s => s.top <= 160).sort((a, b) => b.top - a.top);
      setActive(sections[0]?.id ?? 'home');
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(frame); };
  }, []);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        // Do not layer the palette over a project or privacy dialog.
        if (document.querySelector('dialog[open]') && !dialog.current?.open) return;
        e.preventDefault();
        setQuery('');
        setMobileOpen(false);
        setMoreOpen(false);
        setDialogKind(kind => kind === 'palette' ? null : 'palette');
      }
      if (e.key === 'Escape') {
        if (moreOpen) { setMoreOpen(false); moreButton.current?.focus(); }
        if (mobileOpen) { setMobileOpen(false); menuButton.current?.focus(); }
      }
    };
    const onPointer = (e: PointerEvent) => { if (!more.current?.contains(e.target as Node)) setMoreOpen(false); };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
    };
  }, [moreOpen, mobileOpen]);
  useEffect(() => {
    if (dialogKind) {
      dialog.current?.showModal();
      const old = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      if (dialogKind === 'palette') paletteInput.current?.focus();
      return () => { document.body.style.overflow = old; };
    }
    dialog.current?.close();
  }, [dialogKind]);

  const go = (id: string) => {
    setMobileOpen(false); setMoreOpen(false);
    if (id === 'stats') { setDialogKind('stats'); return; }
    closeDialog();
    const target = document.getElementById(id);
    if (target) {
      history.pushState(null, '', '#' + id);
      target.scrollIntoView({ behavior: document.documentElement.dataset.motion === 'reduced' ? 'instant' : 'smooth' });
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    }
  };
  const openPalette = () => { setQuery(''); setMobileOpen(false); setMoreOpen(false); setDialogKind('palette'); };
  const rows = [
    ...primaryIds.map((id, i) => ({ key: id, command: 'cd ' + id, label: c.primary[i], action: () => go(id) })),
    ...moreIds.map((id, i) => ({ key: id, command: 'cd ' + id, label: c.more[i], action: () => go(id) })),
    { key: 'contact', command: 'cd contact', label: c.contact, action: () => go('contact') },
  ].filter(row => (row.command + ' ' + row.label).toLowerCase().includes(query.toLowerCase().trim()));
  const links = [...social, { name: c.read, url: profile.cv, Icon: FileText }]
    .filter(item => item.name.toLowerCase().includes(query.toLowerCase().trim()));

  return <>
    <header className={'original-nav' + (scrolled ? ' is-scrolled' : '')}>
      <div className="original-nav-inner">
        <button className="original-brand" onClick={() => go('home')} aria-label={c.top}><Avatar /></button>
        <nav className="original-desktop-links" aria-label={c.navigation}>
          {primaryIds.map((id, i) => <button key={id} className="original-nav-label" aria-current={active === id ? 'location' : undefined} onClick={() => go(id)}>
            {active === id && <motion.span className="original-active-pill" layoutId="original-nav-active" transition={{ type: 'spring', stiffness: 500, damping: 40 }} />}
            <span>{c.primary[i]}</span>
          </button>)}
          <div ref={more} className="original-more" onPointerEnter={e => { if (e.pointerType === 'mouse') setMoreOpen(true); }}
            onPointerLeave={() => { if (!more.current?.contains(document.activeElement)) setMoreOpen(false); }}
            onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget)) setMoreOpen(false); }}>
            <button ref={moreButton} className="original-nav-label" aria-expanded={moreOpen} aria-controls="original-more-list" onClick={() => setMoreOpen(!moreOpen)}>
              <span>{c.moreLabel}</span><ChevronDown size={14} style={{ transform: moreOpen ? 'rotate(180deg)' : undefined }} />
            </button>
            <AnimatePresence>{moreOpen && <motion.ul className="original-more-list" id="original-more-list" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}>
              {moreIds.map((id, i) => <li key={id}><button onClick={() => go(id)}><span>{c.more[i]}</span><small>{c.blurbs[i]}</small></button></li>)}
            </motion.ul>}</AnimatePresence>
          </div>
        </nav>
        <div className="original-nav-actions">
          <div className="original-language" role="group" aria-label={lang === 'it' ? 'Lingua' : 'Language'}>
            <button aria-pressed={lang === 'it'} onClick={() => setLang('it')} lang="it">IT</button><span>/</span><button aria-pressed={lang === 'en'} onClick={() => setLang('en')} lang="en">EN</button>
          </div>
          <button className="original-palette-trigger" onClick={openPalette} aria-label={c.searchLabel} aria-keyshortcuts="Control+K Meta+K"><Search size={14} /><kbd>Ctrl K</kbd></button>
          <button className="original-btn-pill original-contact" onClick={() => go('contact')}>{c.contact}</button>
          <button ref={menuButton} className="original-mobile-toggle" aria-label={c.menu} aria-expanded={mobileOpen} aria-controls="original-mobile-menu" onClick={() => setMobileOpen(!mobileOpen)}>{mobileOpen ? <X /> : <Menu />}</button>
        </div>
      </div>
      {mobileOpen && <nav id="original-mobile-menu" className="original-mobile-menu" aria-label={c.navigation}>
        {[...primaryIds, ...moreIds, 'contact'].map((id, i) => <button key={id} onClick={() => go(id)}>{[...c.primary, ...c.more, c.contact][i]}<ArrowUpRight size={16} /></button>)}
      </nav>}
    </header>
    <dialog ref={dialog} className={'original-dialog ' + (dialogKind === 'palette' ? 'original-palette' : 'original-notice')}
      aria-label={dialogKind === 'palette' ? c.searchLabel : c.statsTitle}
      onCancel={closeDialog} onClose={closeDialog} onClick={e => { if (e.target === e.currentTarget) closeDialog(); }}
      onKeyDown={e => {
        if (dialogKind !== 'palette' || !['ArrowDown', 'ArrowUp'].includes(e.key)) return;
        const options = [...e.currentTarget.querySelectorAll<HTMLElement>('[data-command]')];
        if (!options.length) return;
        e.preventDefault();
        const index = options.indexOf(document.activeElement as HTMLElement);
        const next = index < 0 ? (e.key === 'ArrowDown' ? 0 : options.length - 1) : (index + (e.key === 'ArrowDown' ? 1 : -1) + options.length) % options.length;
        options[next].focus();
      }}>
      {dialogKind === 'palette' ? <>
        <div className="original-palette-prompt"><span aria-hidden="true">~/ettore $</span><input ref={paletteInput} autoFocus value={query} onChange={e => setQuery(e.target.value)} placeholder={c.search} aria-label={c.search} onKeyDown={e => { if (e.key === 'Enter') (dialog.current?.querySelector('[data-command]') as HTMLElement | null)?.click(); }} /><button onClick={closeDialog} aria-label={c.close}><kbd>esc</kbd></button></div>
        <div className="original-palette-list">
          {rows.length > 0 && <p className="original-command-group">{c.navigation}</p>}
          {rows.map(row => <button key={row.key} data-command onClick={row.action} className="original-command"><Hash size={15} /><code>{row.command}</code><span>{row.label}</span></button>)}
          {links.length > 0 && <p className="original-command-group">{c.profiles}</p>}
          {links.map(({ name, url, Icon }) => <a key={name} data-command href={url} target="_blank" rel="noopener noreferrer" className="original-command" onClick={closeDialog}><Icon size={15} /><code>open {name.toLowerCase()}</code><span>{name}<ArrowUpRight size={12} /></span></a>)}
          {!rows.length && !links.length && <p className="original-command-empty">{c.empty}</p>}
        </div><div className="original-palette-footer">{c.keyboard}</div>
      </> : <div className="original-notice-inner">
        <button className="original-notice-close" onClick={closeDialog} aria-label={c.close}><X size={22} /></button>
        <FaGithub size={28} /><h2>{c.statsTitle}</h2><p>{c.statsBody}</p><a className="original-btn-primary" href={profile.github} target="_blank" rel="noopener noreferrer">{c.github}<ArrowUpRight size={16} /></a>
      </div>}
    </dialog>
  </>;
}

export function PortfolioHero({ lang, reduced }: { lang: Language; reduced: boolean }) {
  const c = labels[lang];
  const [tagline, setTagline] = useState(0);
  const host = useRef<HTMLElement>(null);
  const inView = useInView(host);
  useEffect(() => {
    if (reduced || !inView) return;
    const timer = window.setInterval(() => { if (!document.hidden) setTagline(n => (n + 1) % 3); }, 3000);
    return () => clearInterval(timer);
  }, [reduced, inView]);
  return <section id="home" ref={host} className="original-hero">
    <HeroStack reduced={reduced || !inView} />
    <motion.div className="original-hero-content" initial={reduced ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65 }}>
      <Avatar size={64} />
      <div className="original-role"><span className="original-status-dot" />{c.role}</div>
      <div className="original-tagline"><span className="visually-hidden">{c.taglines[0]}</span><span aria-hidden="true">{c.taglines.map((text, i) => <span key={i} className="original-tagline-size">{text}</span>)}<AnimatePresence mode="wait" initial={false}><motion.span className="original-tagline-current" key={reduced ? 0 : tagline} initial={reduced ? false : { opacity: 0, y: 7 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -7 }} transition={{ duration: .2 }}>{c.taglines[reduced ? 0 : tagline]}</motion.span></AnimatePresence></span></div>
      <h1 className="original-display">{c.hello} <span className="original-signature">Ettore Cirillo</span>.<br /><span className="original-headline">{c.headline}</span></h1>
      <p className="original-intro">{copy[lang].intro}</p>
      <div className="original-latest"><span>{c.latest}</span><a href={profile.latestProject} target="_blank" rel="noopener noreferrer">{c.latestText}<ArrowUpRight size={13} /></a></div>
      <div className="original-hero-buttons">
        <a className="original-btn-primary" href="#projects">{c.projects}<ArrowDownRight size={16} /></a>
        <a className="original-btn-outline" href={profile.cv} target="_blank" rel="noopener noreferrer"><FileText size={15} />{c.read}</a>
        <a className="original-download" href={profile.cv} download="Ettore_Cirillo_CV.pdf"><Download size={15} />{c.download}</a>
      </div>
      <div className="original-socials">{social.map(({ name, url, Icon }) => <motion.a key={name} href={url} target="_blank" rel="noopener noreferrer" aria-label={name} title={name} whileHover={reduced ? undefined : { y: -3, scale: 1.06 }} whileFocus={reduced ? undefined : { y: -3, scale: 1.06 }} whileTap={{ scale: .94 }}><Icon size={18} /></motion.a>)}</div>
    </motion.div>
    <a className="original-scroll" href="#about"><span>{c.scroll}</span><ChevronDown size={20} /></a>
  </section>;
}

