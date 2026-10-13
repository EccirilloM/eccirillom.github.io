export function contactDraft(name: string, email: string, message: string) {
  return `${name.trim()} <${email.trim()}>\n\n${message.trim()}`;
}

export function contactMailto(recipient: string, name: string, email: string, message: string) {
  const subject = `Portfolio · ${name.replace(/[\r\n]/g, ' ').trim()}`;
  return `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(contactDraft(name, email, message))}`;
}
