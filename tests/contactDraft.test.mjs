import test from 'node:test';
import assert from 'node:assert/strict';
import { contactDraft, contactMailto } from '../src/contactDraft.ts';

test('email draft preserves Unicode and lines without adding mail headers', () => {
  const name = 'Èttore & co?';
  const email = 'test+portfolio@example.com';
  const message = 'Ciao!\nTelemetria & dashboard? #idea\n&bcc=other@example.com';
  const url = new URL(contactMailto('ettore@example.com', name, email, message));
  assert.equal(url.protocol, 'mailto:');
  assert.equal(url.pathname, 'ettore@example.com');
  assert.deepEqual([...url.searchParams.keys()], ['subject', 'body']);
  assert.equal(url.searchParams.get('body'), contactDraft(name, email, message));
  assert.equal(url.searchParams.get('subject'), 'Portfolio · ' + name);
});
