// Ship the corresponding source of THIS build, including the refreshed GitHub
// snapshot. Explicit inputs exclude .env.local, Git history and dependency caches.
import { execFileSync } from 'node:child_process';
const inputs = [
  'src', 'public', 'scripts', 'tests', 'docs', '.github',
  'package.json', 'pnpm-lock.yaml', 'tsconfig.json', 'vite.config.ts', 'index.html',
  'Dockerfile', 'compose.yaml', 'portfolio.cmd', '.dockerignore', '.gitignore',
  '.env.example', 'LICENSE', 'THIRD_PARTY_NOTICES.md', 'README.md', 'TODO.md',
];
execFileSync('tar', ['-czf', 'dist/source.tar.gz', '--exclude=.env.local', '--exclude=.env.*.local', '--', ...inputs], { stdio: 'inherit' });
console.log('Corresponding source: dist/source.tar.gz');
