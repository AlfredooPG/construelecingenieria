// Generador del sitio estático: ensambla páginas + componentes y escribe /dist.
import { mkdir, writeFile, readFile, readdir, copyFile, rm } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createCtx, esc } from './src/lib/ctx.mjs';
import { sprite, loadIcon, innerSvg } from './src/lib/icons.mjs';
import { header, footer } from './src/lib/components.mjs';
import { categories, projects } from './src/data/projects.mjs';
import { homePage, servicesIndexPage, servicePages } from './src/pages/main.mjs';
import { aboutPage, projectsPage, contactPage, quotePage, faqPage } from './src/pages/company.mjs';
import { termsPage, privacyPage, notFoundPage } from './src/pages/legal.mjs';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(ROOT, 'dist');
const site = JSON.parse(await readFile(path.join(ROOT, 'src/data/site.json'), 'utf8'));

const pages = [
  homePage, servicesIndexPage, ...servicePages, aboutPage, projectsPage,
  contactPage, quotePage, faqPage, termsPage, privacyPage, notFoundPage,
];

await rm(DIST, { recursive: true, force: true }).catch(() => {}); // si no se puede limpiar, se sobrescribe
await mkdir(DIST, { recursive: true });
async function copyDir(from, to) {
  await mkdir(to, { recursive: true });
  for (const e of await readdir(from, { withFileTypes: true })) {
    const a = path.join(from, e.name), b = path.join(to, e.name);
    if (e.isDirectory()) await copyDir(a, b); else await copyFile(a, b);
  }
}
await copyDir(path.join(ROOT, 'src/assets'), path.join(DIST, 'assets'));

// Miniaturas SVG referenciales de proyectos (sin imágenes pesadas).
for (const p of projects) {
  const [c1, c2] = categories.find((k) => k.key === p.cat).colors;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient><pattern id="p" width="32" height="32" patternUnits="userSpaceOnUse"><path d="M32 0H0V32" fill="none" stroke="#fff" stroke-opacity=".09"/></pattern></defs><rect width="800" height="600" fill="url(#g)"/><rect width="800" height="600" fill="url(#p)"/><g transform="translate(250 150) scale(12.5)" fill="none" stroke="#fbbf24" stroke-width=".9" stroke-linecap="round" stroke-linejoin="round">${innerSvg(await loadIcon(p.icon))}</g></svg>`;
  await writeFile(path.join(DIST, `assets/img/proyecto-${p.slug}.svg`), svg);
}

// Versionado por contenido para cachear CSS/JS de forma segura.
const hash = createHash('md5')
  .update(await readFile(path.join(ROOT, 'src/assets/css/main.css')))
  .update(await readFile(path.join(ROOT, 'src/assets/js/main.js')))
  .digest('hex')
  .slice(0, 8);

const FONTS =
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap';

async function render(page) {
  const c = createCtx(site, { depth: page.depth, absolute: !!page.absolute });
  const main = page.body(c);
  const long = `${page.title} | ${site.name}`;
  const fullTitle = page.file === 'index.html' ? page.title : long.length <= 70 ? long : `${page.title} | ConstruElec`;
  const canonical = `${site.url}/${page.file === 'index.html' ? '' : page.file}`;
  const head = header(c, page.nav);
  const foot = footer(c);
  const icons = await sprite(c.used);
  const ld = page.jsonld ? `<script type="application/ld+json">${JSON.stringify(page.jsonld(c))}</script>` : '';
  const doc = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(page.description)}">
${page.noindex ? '<meta name="robots" content="noindex">' : `<link rel="canonical" href="${canonical}">`}
<meta name="theme-color" content="#0f172a">
<meta property="og:type" content="website">
<meta property="og:locale" content="es_CL">
<meta property="og:site_name" content="${esc(site.name)}">
<meta property="og:title" content="${esc(fullTitle)}">
<meta property="og:description" content="${esc(page.description)}">
<link rel="icon" href="${c.u('assets/img/favicon.svg')}" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" as="style" href="${FONTS}" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="${FONTS}"></noscript>
<script>document.documentElement.classList.add('js')</script>
<link rel="stylesheet" href="${c.u('assets/css/main.css')}?v=${hash}">
<script src="${c.u('assets/js/main.js')}?v=${hash}" defer></script>
${ld}
</head>
<body>
${icons}
${head}
<main id="main" tabindex="-1">${main}
</main>
${foot}
</body>
</html>
`;
  return doc.replace(/[ \t]+$/gm, '');
}

for (const page of pages) {
  const out = path.join(DIST, page.file);
  await mkdir(path.dirname(out), { recursive: true });
  await writeFile(out, await render(page));
}

const urls = pages.filter((p) => !p.noindex).map((p) => `${site.url}/${p.file === 'index.html' ? '' : p.file}`);
await writeFile(
  path.join(DIST, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${u}</loc></url>`).join('\n')}\n</urlset>\n`,
);
await writeFile(path.join(DIST, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${site.url}/sitemap.xml\n`);
const IMM = 'public, max-age=31536000, immutable';
const cacheHeaders = [
  { source: 'assets/css/**', headers: [{ key: 'Cache-Control', value: IMM }] },
  { source: 'assets/js/**', headers: [{ key: 'Cache-Control', value: IMM }] },
  { source: 'assets/img/**', headers: [{ key: 'Cache-Control', value: 'public, max-age=604800' }] },
];
await writeFile(path.join(DIST, 'serve.json'), JSON.stringify({ headers: cacheHeaders }, null, 2));
await writeFile(path.join(DIST, '_headers'), `/assets/css/*\n  Cache-Control: ${IMM}\n/assets/js/*\n  Cache-Control: ${IMM}\n/assets/img/*\n  Cache-Control: public, max-age=604800\n`);

console.log(`✔ ${pages.length} páginas generadas en dist/ (v=${hash})`);
