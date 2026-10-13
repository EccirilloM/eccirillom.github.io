// Adapted from FooterContent, FooterSocial, FooterEndNote, FooterStatusBar and
// SlideToContact in Sagar Gupta's portfolio-react (GPL-3.0), 13 October 2026.
import { useEffect, useRef, useState } from 'react';
import { animate, motion, useMotionValue, useTransform } from 'motion/react';
import { ArrowRight, ArrowUp, Download, Mail } from 'lucide-react';
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa6';
import Avatar from './Avatar';
import FooterVitals from './FooterVitals';
import { profile, type Language } from '../content';

function CopyEmail({ it, reduced }: { it: boolean; reduced: boolean }) {
  const [state, setState] = useState<'idle' | 'copied' | 'error'>('idle');
  const progress = useMotionValue(0);
  const ring = 2 * Math.PI * 9;
  const dashOffset = useTransform(progress, value => ring * (1 - value));
  const animation = useRef<ReturnType<typeof animate> | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reset = useRef<ReturnType<typeof setTimeout> | null>(null);
  function cancel() { if (timer.current) clearTimeout(timer.current); animation.current?.stop(); if (state !== 'copied') progress.set(0); }
  useEffect(() => () => { animation.current?.stop(); if (timer.current) clearTimeout(timer.current); if (reset.current) clearTimeout(reset.current); }, []);
  async function copy() {
    try { await navigator.clipboard.writeText(profile.email); setState('copied'); }
    catch { setState('error'); }
    progress.set(1);
    if (reset.current) clearTimeout(reset.current);
    reset.current = setTimeout(() => { setState('idle'); progress.set(0); }, 1800);
  }
  return <div className="footer-copy-wrap">
    <button className="footer-copy" type="button"
      onPointerDown={e => { if (e.button !== 0 || state === 'copied') return; cancel(); animation.current = animate(progress, 1, { duration: reduced ? 0 : .65, ease: 'linear' }); timer.current = setTimeout(() => void copy(), reduced ? 0 : 650); }}
      onPointerUp={cancel} onPointerLeave={cancel} onPointerCancel={cancel} onBlur={cancel}
      onClick={e => { if (e.detail === 0) void copy(); }} aria-label={it ? 'Copia indirizzo email' : 'Copy email address'}>
      <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true"><circle cx="11" cy="11" r="9" fill="none" stroke="#ffffff1f" strokeWidth="2" /><motion.circle cx="11" cy="11" r="9" fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeDasharray={ring} style={{ strokeDashoffset: dashOffset, rotate: -90, originX: '50%', originY: '50%' }} /></svg>
      <span>{state === 'copied' ? (it ? 'Copiata. A presto!' : 'Copied. Talk soon.') : `${it ? 'Tieni premuto per copiare' : 'Hold to copy'} ${profile.email}`}</span>
    </button>
    <span role="status" className="footer-copy-status">{state === 'error' ? (it ? `Copia non disponibile: ${profile.email}` : `Copy unavailable: ${profile.email}`) : state === 'copied' ? (it ? 'Email copiata' : 'Email copied') : ''}</span>
  </div>;
}

function SlideToContact({ it, reduced }: { it: boolean; reduced: boolean }) {
  const track = useRef<HTMLAnchorElement>(null);
  const dragged = useRef(false);
  const [end, setEnd] = useState(0);
  const x = useMotionValue(0);
  const opacity = useTransform(x, [0, Math.max(end * .65, 1)], [1, 0]);
  const fill = useTransform(x, value => end ? (value + 44) / (end + 44) : 0);
  useEffect(() => {
    const element = track.current;
    if (!element) return;
    const measure = () => setEnd(Math.max(0, element.clientWidth - 52));
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return <a className="footer-slide" href="#contact" ref={track} aria-label={it ? 'Apri il modulo contatti' : 'Go to the contact form'}
    onClick={e => { if (dragged.current) { e.preventDefault(); dragged.current = false; } }}>
    <motion.span className="footer-slide-fill" style={{ scaleX: fill }} aria-hidden="true" />
    <motion.span className="footer-slide-label" style={{ opacity }} aria-hidden="true">{it ? 'scorri per scrivermi' : 'slide to contact me'} <ArrowRight size={14} /></motion.span>
    <motion.span className="footer-slide-knob" aria-hidden="true" drag="x" style={{ x }} dragConstraints={{ left: 0, right: end }} dragMomentum={false} dragElastic={0}
      onPointerDown={() => { dragged.current = false; }} onDragStart={() => { dragged.current = true; }} onDragEnd={() => {
        if (end > 0 && x.get() >= end * .85) {
          document.getElementById('contact')?.scrollIntoView({ behavior: reduced ? 'instant' : 'smooth' });
          document.getElementById('contact-name')?.focus({ preventScroll: true });
        }
        void animate(x, 0, { duration: reduced ? 0 : .25 });
      }}><Mail size={18} /></motion.span>
  </a>;
}

export default function Footer({ lang, reduced, onPrivacy }: { lang: Language; reduced: boolean; onPrivacy: () => void }) {
  const it = lang === 'it';
  const [now, setNow] = useState(() => new Date());
  const [rotation, setRotation] = useState(0);
  useEffect(() => { const timer = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(timer); }, []);
  const socials = [{ name: 'GitHub', href: profile.github, Icon: FaGithub }, { name: 'LinkedIn', href: profile.linkedin, Icon: FaLinkedin }, { name: 'Instagram', href: profile.instagram, Icon: FaInstagram }];
  const links = [{ label: 'Home', href: '#home' }, { label: it ? 'Chi sono' : 'About', href: '#about' }, { label: it ? 'Esperienze' : 'Experience', href: '#experience' }, { label: 'GitHub', href: '#stats' }, { label: it ? 'Contatti' : 'Contact', href: '#contact' }];
  return <footer className="template-footer">
    <div className="footer-content">
      <div className="footer-top">
        <div className="footer-brand">
          <a href="#home" className="footer-identity" onMouseEnter={() => setRotation(value => value + 360)} onFocus={event => { if (event.currentTarget.matches(':focus-visible')) setRotation(value => value + 360); }}>
            <motion.span className="footer-avatar" animate={{ rotate: reduced ? 0 : rotation }} transition={{ type: 'spring', stiffness: 110, damping: 14 }}><Avatar size={40} /></motion.span>
            <span className="footer-signature">Ettore Cirillo</span>
          </a>
          <p className="footer-copyright">© {now.getFullYear()} Ettore Cirillo · <a href="/LICENSE.txt">GPL-3.0</a></p>
          <div className="footer-social-tiles">{socials.map(({ name, href, Icon }) => <a key={name} href={href} aria-label={name} target="_blank" rel="noopener noreferrer"><Icon size={18} aria-hidden="true" /></a>)}</div>
        </div>
        <nav className="footer-link-column" aria-label={it ? 'Navigazione nel footer' : 'Footer navigation'}><h2>{it ? 'Sito' : 'Site'}</h2>{links.map(link => <a key={link.href} href={link.href}>{link.label}</a>)}<a href={profile.cv} download>{it ? 'Scarica CV' : 'Download CV'} <Download size={13} aria-hidden="true" /></a></nav>
        <nav className="footer-link-column" aria-label="Social"><h2>Social</h2>{socials.map(({ name, href }) => <a key={name} href={href} target="_blank" rel="noopener noreferrer">{name} <ArrowRight size={12} aria-hidden="true" /></a>)}<a href={`mailto:${profile.email}`}>Email <ArrowRight size={12} aria-hidden="true" /></a></nav>
      </div>
      <div id="footer-endnote" className="footer-endnote"><p>{it ? <>Sei arrivato in fondo. Da qui in poi, basta un’<em>email</em>.</> : <>You’ve reached the bottom. Everything from here is an <em>email</em>.</>}</p><CopyEmail it={it} reduced={reduced} /><SlideToContact it={it} reduced={reduced} /><FooterVitals lang={lang} /></div>
      <div className="footer-status-bar">
        <div className="footer-clock"><span className="footer-live-dot" aria-hidden="true" />{it ? 'Roma' : 'Rome'} <time dateTime={now.toISOString()}>{now.toLocaleTimeString('en-GB', { timeZone: 'Europe/Rome', hour12: false })}</time><span>Europe/Rome</span></div>
        <div className="footer-stack"><span>{it ? 'Creato con' : 'Built with'}</span>{['React', 'TypeScript', 'Vite'].map(tech => <span className="footer-chip" key={tech}>{tech}</span>)}</div>
        <a href="#home" className="footer-top-link">{it ? 'Torna su' : 'Back to top'} <ArrowUp size={14} aria-hidden="true" /></a>
      </div>
      <div className="footer-legal"><span>{it ? 'Basato su' : 'Based on'} <a href="https://github.com/Sagargupta16/portfolio-react" target="_blank" rel="noopener noreferrer">portfolio-react · Sagar Gupta</a></span><div><button type="button" onClick={onPrivacy}>{it ? 'Privacy e crediti' : 'Privacy & credits'}</button><a href={profile.source}>{it ? 'Sorgente' : 'Source'}</a>{import.meta.env.PROD && <a href="/source.tar.gz" download>{it ? 'Scarica sorgente' : 'Download source'}</a>}</div></div>
    </div>
  </footer>;
}
