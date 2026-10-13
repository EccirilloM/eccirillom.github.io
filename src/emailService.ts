export type EmailConfig = { serviceId: string; templateId: string; publicKey: string };
export type ContactMessage = { name: string; email: string; message: string; website?: string };

export function isEmailConfigured(config: EmailConfig) {
  return [config.serviceId, config.templateId, config.publicKey].every(value => typeof value === 'string' && value.trim().length > 0);
}

// Only called by the form submit handler. Credentials/cookies are never sent;
// these are browser-public EmailJS IDs, not mailbox passwords or private keys.
export async function sendContact(config: EmailConfig, input: ContactMessage, transport: typeof fetch = fetch) {
  if (!isEmailConfigured(config)) throw new Error('not-configured');
  const name = input.name.trim();
  const email = input.email.trim();
  const message = input.message.trim();
  if (input.website || !name || name.length > 100 || /[\r\n]/.test(name) || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || message.length < 10 || message.length > 3000) throw new Error('invalid-input');
  const response = await transport('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST', credentials: 'omit', referrerPolicy: 'strict-origin',
    headers: { 'Content-Type': 'application/json' }, signal: AbortSignal.timeout(15000),
    body: JSON.stringify({ service_id: config.serviceId.trim(), template_id: config.templateId.trim(), user_id: config.publicKey.trim(), template_params: { from_name: name, reply_to: email, message } }),
  });
  if (!response.ok) throw new Error(response.status === 429 ? 'rate-limit' : 'send-failed');
}
