import { copyFileSync, readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

copyFileSync('LICENSE', 'dist/LICENSE.txt');
copyFileSync('THIRD_PARTY_NOTICES.md', 'dist/THIRD_PARTY_NOTICES.txt');
const fonts = ['@fontsource-variable/bricolage-grotesque', '@fontsource-variable/inter', '@fontsource-variable/geist-mono', '@fontsource/instrument-serif', '@fontsource/yellowtail'];
const texts = fonts.map(font => {
  const folder = `node_modules/${font}`;
  const license = readdirSync(folder).find(name => /^(OFL|LICENSE)/i.test(name));
  if (!license) throw new Error(`Missing font license for ${font}`);
  return `${font}\n${readFileSync(join(folder, license), 'utf8')}`;
});
writeFileSync('dist/font-licenses.txt', texts.join('\n\n-----\n\n'));
