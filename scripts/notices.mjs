import { copyFileSync, readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

copyFileSync('LICENSE', 'dist/LICENSE.txt');
copyFileSync('THIRD_PARTY_NOTICES.md', 'dist/THIRD_PARTY_NOTICES.txt');
const fonts = ['bricolage-grotesque', 'inter', 'geist-mono'];
const texts = fonts.map(font => {
  const folder = `node_modules/@fontsource-variable/${font}`;
  const license = readdirSync(folder).find(name => /^(OFL|LICENSE)/i.test(name));
  if (!license) throw new Error(`Missing font license for ${font}`);
  return `${font}\n${readFileSync(join(folder, license), 'utf8')}`;
});
writeFileSync('dist/font-licenses.txt', texts.join('\n\n-----\n\n'));
