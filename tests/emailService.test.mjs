import test from 'node:test';
import assert from 'node:assert/strict';
import { sendContact } from '../src/emailService.ts';

const config = { serviceId: 'service_test', templateId: 'template_test', publicKey: 'public_test' };
const input = { name: 'Ettore', email: 'visitor@example.com', message: 'A message about a project.' };

test('contact sends only the allowed fields to the fixed provider without cookies', async () => {
  let calls = 0;
  await sendContact(config, input, async (url, options) => {
    calls++;
    assert.equal(url, 'https://api.emailjs.com/api/v1.0/email/send');
    assert.equal(options.credentials, 'omit');
    assert.equal(options.method, 'POST');
    const body = JSON.parse(options.body);
    assert.deepEqual(body, { service_id: config.serviceId, template_id: config.templateId, user_id: config.publicKey, template_params: { from_name: input.name, reply_to: input.email, message: input.message } });
    return new Response('OK', { status: 200 });
  });
  assert.equal(calls, 1);
});
test('missing configuration, invalid fields and honeypot cause no network request', async () => {
  let calls = 0;
  const transport = async () => { calls++; return new Response('OK'); };
  await assert.rejects(sendContact({ ...config, publicKey: '' }, input, transport), /not-configured/);
  await assert.rejects(sendContact(config, { ...input, email: 'invalid' }, transport), /invalid-input/);
  await assert.rejects(sendContact(config, { ...input, website: 'spam' }, transport), /invalid-input/);
  assert.equal(calls, 0);
});
test('failed, throttled and interrupted delivery never resolve as sent', async () => {
  await assert.rejects(sendContact(config, input, async () => new Response('Denied', { status: 400 })), /send-failed/);
  await assert.rejects(sendContact(config, input, async () => new Response('Wait', { status: 429 })), /rate-limit/);
  await assert.rejects(sendContact(config, input, async () => { throw new Error('Network unavailable'); }), /Network/);
});
