import { writeFile, rename, mkdir } from 'node:fs/promises';
import { parseCalendar, lastYear } from './github-data.mjs';

const username = 'EccirilloM';
const now = new Date();
const end = now.toISOString().slice(0, 10);
const year = now.getUTCFullYear();
async function request(url, json = true) {
  const response = await fetch(url, { headers: { 'User-Agent': 'Ettore-Cirillo-Portfolio', Accept: json ? 'application/vnd.github+json' : 'text/html', 'Accept-Language': 'en-US' }, signal: AbortSignal.timeout(20000) });
  if (!response.ok) throw new Error(`GitHub HTTP ${response.status}: ${url}`);
  return json ? response.json() : response.text();
}
try {
  const calendars = await Promise.all([year - 1, year].map(async y => parseCalendar(await request(`https://github.com/users/${username}/contributions?from=${y}-01-01&to=${y}-12-31`, false))));
  const days = lastYear(calendars, end);
  const repos = [];
  for (let page = 1; ; page++) {
    const batch = await request(`https://api.github.com/users/${username}/repos?per_page=100&page=${page}&type=owner`);
    if (!Array.isArray(batch)) throw new Error('Invalid GitHub repository response');
    repos.push(...batch);
    if (batch.length < 100) break;
  }
  const counts = new Map();
  for (const repo of repos.filter(repo => !repo.fork && repo.language)) counts.set(repo.language, (counts.get(repo.language) ?? 0) + 1);
  const languages = [...counts].map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count);
  const snapshot = { username, updatedAt: now.toISOString(), from: days[0].date, to: end, contributions: days.reduce((sum, day) => sum + day.count, 0), publicRepos: repos.length, stars: repos.reduce((sum, repo) => sum + repo.stargazers_count, 0), languages, days };
  const dir = new URL('../src/data/', import.meta.url);
  await mkdir(dir, { recursive: true });
  const path = new URL('github.json', dir);
  const temporary = new URL('github.json.tmp', dir);
  await writeFile(temporary, JSON.stringify(snapshot, null, 2) + '\n');
  await rename(temporary, path);
  console.log(`GitHub updated: ${days.length} days, ${snapshot.contributions} contributions, ${repos.length} public repositories. ${end}`);
} catch (error) {
  console.error(`GitHub update failed; previous snapshot preserved. ${error.message}`);
  process.exitCode = 1;
}
