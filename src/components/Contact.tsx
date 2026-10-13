// Contact layout/cards/form adapted from Sagar Gupta's portfolio-react, GPL-3.0.
// Direct delivery through the owner's EmailJS account, when configured.
import { useRef, useState, type CSSProperties, type FormEvent } from 'react';
import { ArrowUpRight, Copy, Mail, Send, UserPlus } from 'lucide-react';
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa6';
import { profile, type Language } from '../content';
import { contactDraft } from '../contactDraft';
import { emailConfig, emailConfigured } from '../emailConfig';
import { sendContact } from '../emailService';

export default function Contact({ lang, onPrivacy }: { lang: Language; onPrivacy: () => void }) {
  const it = lang === 'it';
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error' | 'rate-limit' | 'copied' | 'copy-error'>('idle');
  const sending = useRef(false);
  const nextSend = useRef(0);
  const form = useRef<HTMLFormElement>(null);
  const links = [
    { label: it ? 'Scrivimi' : 'Email me', value: profile.email, href: `mailto:${profile.email}`, Icon: Mail, color: '#60a5fa' },
    { label: 'LinkedIn', value: 'ettorecirillo', href: profile.linkedin, Icon: FaLinkedin, color: '#3287dc' },
    { label: 'Instagram', value: '@eccirillo', href: profile.instagram, Icon: FaInstagram, color: '#e1306c' },
    { label: 'GitHub', value: 'EccirilloM', href: profile.github, Icon: FaGithub, color: '#a5a5c0' },
  ];
  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!emailConfigured || sending.current) return;
    if (Date.now() < nextSend.current) { setStatus('rate-limit'); return; }
    sending.current = true;
    setStatus('sending');
    try {
      const website = String(new FormData(form.current!).get('website') ?? '');
      await sendContact(emailConfig, { name, email, message, website });
      nextSend.current = Date.now() + 30000;
      setStatus('sent'); setName(''); setEmail(''); setMessage('');
    } catch (error) {
      setStatus(error instanceof Error && error.message === 'rate-limit' ? 'rate-limit' : 'error');
    } finally { sending.current = false; }
  }
  async function copyDraft() {
    if (!form.current?.reportValidity()) return;
    try { await navigator.clipboard.writeText(contactDraft(name, email, message)); setStatus('copied'); }
    catch { setStatus('copy-error'); }
  }
  const messages = {
    idle: '',
    sending: it ? 'Invio in corso…' : 'Sending…',
    sent: it ? 'Messaggio inviato. Grazie per avermi scritto!' : 'Message sent. Thank you for getting in touch!',
    error: it ? 'Invio non confermato. Il testo è ancora qui: puoi riprovare o copiarlo.' : 'Sending was not confirmed. Your text is still here: try again or copy it.',
    'rate-limit': it ? 'Attendi un po’ prima di inviare un altro messaggio.' : 'Please wait a little before sending another message.',
    copied: it ? 'Messaggio copiato. Puoi incollarlo nella tua email.' : 'Message copied. You can paste it into your email.',
    'copy-error': it ? 'Copia non disponibile: seleziona e copia il testo del messaggio.' : 'Copy is unavailable: select and copy the message text.',
  };
  return <section id="contact" className="section template-contact" aria-labelledby="contact-heading">
    <div className="about-section-heading"><div><p className="about-eyebrow">06 / {it ? 'Scrivimi un messaggio' : 'Send a note'}</p><h2 id="contact-heading">{it ? <>Parlia<em>mone</em></> : <>Let’s <em>talk</em></>}</h2></div><span aria-hidden="true" /></div>
    <div className="contact-template-grid">
      <div className="contact-template-options">{links.map(({ label, value, href, Icon, color }) => <a key={label} className="contact-template-card" style={{ '--contact-accent': color } as CSSProperties} href={href} target={href.startsWith('https:') ? '_blank' : undefined} rel={href.startsWith('https:') ? 'noopener noreferrer' : undefined}>
        <span className="contact-template-icon"><Icon size={20} aria-hidden="true" /></span><span className="contact-template-text"><span>{label}</span><strong>{value}</strong></span><ArrowUpRight size={16} aria-hidden="true" />
      </a>)}
        <a className="original-btn-outline contact-vcard" href="/ettore-cirillo.vcf" download="ettore-cirillo.vcf"><UserPlus size={16} aria-hidden="true" />{it ? 'Salva il contatto' : 'Save contact card'}</a>
        <p className="contact-hint">{it ? 'Aggiungi i miei recapiti alla rubrica.' : 'Add my details to your contacts.'}</p>
      </div>
      <form ref={form} className="contact-template-form" onSubmit={submit} onChange={() => { if (!sending.current) setStatus('idle'); }}>
        <div className="contact-honeypot" aria-hidden="true"><label htmlFor="contact-website">Website</label><input id="contact-website" name="website" tabIndex={-1} autoComplete="off" /></div>
        <div><label htmlFor="contact-name">{it ? 'Nome' : 'Name'}</label><input id="contact-name" name="name" autoComplete="name" disabled={status === 'sending'} required maxLength={100} value={name} onChange={e => setName(e.target.value)} placeholder={it ? 'Il tuo nome' : 'Your name'} /></div>
        <div><label htmlFor="contact-email">Email</label><input id="contact-email" name="email" type="email" autoComplete="email" disabled={status === 'sending'} required maxLength={254} value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" /></div>
        <div><label htmlFor="contact-message">{it ? 'Messaggio' : 'Message'}</label><textarea id="contact-message" name="message" rows={5} disabled={status === 'sending'} required minLength={10} maxLength={3000} value={message} onChange={e => setMessage(e.target.value)} placeholder={it ? 'Un’idea, un progetto o un’opportunità? Raccontami.' : 'An idea, a project or an opportunity? Tell me about it.'} /></div>
        <p id="contact-send-hint" className="contact-hint">{emailConfigured
          ? (it ? 'Nome, email e messaggio saranno inviati tramite EmailJS per permettermi di risponderti.' : 'Your name, email and message will be sent through EmailJS so I can reply.')
          : (it ? 'Il modulo di invio è in preparazione. Intanto puoi usare i contatti qui accanto.' : 'The contact form is being set up. In the meantime, use the contact links alongside.')} <button type="button" className="contact-privacy-link" onClick={onPrivacy}>{it ? 'Leggi l’informativa privacy' : 'Read the privacy notice'}</button></p>
        <button type="submit" disabled={!emailConfigured || status === 'sending'} aria-busy={status === 'sending'} className="original-btn-primary" aria-describedby="contact-send-hint"><Send size={16} aria-hidden="true" />{status === 'sending' ? messages.sending : it ? 'Invia messaggio' : 'Send message'}</button>
        <button type="button" className="contact-copy" disabled={status === 'sending'} onClick={copyDraft}><Copy size={14} aria-hidden="true" />{it ? 'Copia il messaggio' : 'Copy message'}</button>
        <p className="contact-feedback" role="status">{messages[status]}</p>
      </form>
    </div>
  </section>;
}
