// Pruebas de integridad sobre dist/ (ejecutar tras `npm run build`).
import test from 'node:test';
import assert from 'node:assert/strict';
import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const DIST = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../dist');
const walk = async (d) => (await Promise.all((await readdir(d, { withFileTypes: true })).map((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)])))).flat();
const files = await walk(DIST);
const htmlFiles = files.filter((f) => f.endsWith('.html'));
const pages = new Map(await Promise.all(htmlFiles.map(async (f) => [f, await readFile(f, 'utf8')])));
const exists = async (p) => stat(p).then(() => true, () => false);

const REQUIRED = ['index.html', 'servicios/index.html', 'nosotros.html', 'proyectos.html', 'contacto.html', 'presupuesto.html', 'preguntas-frecuentes.html', 'terminos-de-servicio.html', 'politica-de-privacidad.html', '404.html',
  'servicios/arquitectura-diseno-interiorismo.html', 'servicios/obras-civiles-construccion-ampliaciones.html', 'servicios/remodelaciones-terminaciones.html', 'servicios/instalaciones-especializadas.html', 'servicios/presupuestos-gestion-proyectos.html'];

test('existen todas las páginas requeridas', async () => {
  for (const r of REQUIRED) assert.ok(await exists(path.join(DIST, r)), `falta ${r}`);
});

test('cada página tiene doctype, lang, UTF-8, viewport, título único, descripción y un solo h1', () => {
  const titles = new Set();
  for (const [f, h] of pages) {
    const n = path.relative(DIST, f);
    assert.match(h, /^<!DOCTYPE html>/i, n);
    assert.match(h, /<html lang="es">/, n);
    assert.match(h, /<meta charset="utf-8">/i, n);
    assert.match(h, /name="viewport"/, n);
    assert.match(h, /<meta name="description" content="[^"]{30,}/, n);
    const t = h.match(/<title>([^<]+)<\/title>/)?.[1];
    assert.ok(t && !titles.has(t), `título duplicado/ausente en ${n}`);
    titles.add(t);
    assert.equal((h.match(/<h1[ >]/g) || []).length, 1, `h1 en ${n}`);
    assert.ok(!h.includes('�'), `carácter inválido en ${n}`);
  }
});

test('enlaces internos y anclas resuelven; no hay href="#" ni vacíos', async () => {
  for (const [f, h] of pages) {
    const n = path.relative(DIST, f);
    assert.ok(!/href="#?"/.test(h), `href vacío en ${n}`);
    for (const m of h.matchAll(/(?:href|src)="([^"]+)"/g)) {
      let url = m[1].replace(/&amp;/g, '&');
      if (/^(https?:|mailto:|tel:|data:)/.test(url)) continue;
      if (url.startsWith('#')) { assert.ok(h.includes(`id="${url.slice(1)}"`) || url === '#main', `${n}: ancla ${url}`); continue; }
      url = url.split('#')[0].split('?')[0];
      const target = url.startsWith('/') ? path.join(DIST, url) : path.resolve(path.dirname(f), url);
      assert.ok(await exists(target), `${n}: enlace roto → ${m[1]}`);
    }
  }
});

test('imágenes con alt, width y height; sin ids duplicados', () => {
  for (const [f, h] of pages) {
    const n = path.relative(DIST, f);
    for (const m of h.matchAll(/<img\b[^>]*>/g)) {
      assert.match(m[0], /\balt="/, `${n}: img sin alt`);
      assert.match(m[0], /\bwidth="\d+"/, `${n}: img sin width`);
      assert.match(m[0], /\bheight="\d+"/, `${n}: img sin height`);
    }
    const ids = [...h.matchAll(/\sid="([^"]+)"/g)].map((x) => x[1]).filter((id) => !id.startsWith('i-'));
    assert.equal(new Set(ids).size, ids.length, `${n}: ids duplicados`);
  }
});

test('íconos referenciados existen en el sprite de la página', () => {
  for (const [f, h] of pages) {
    for (const m of h.matchAll(/<use href="#(i-[^"]+)"/g)) assert.ok(h.includes(`<symbol id="${m[1]}"`), `${path.relative(DIST, f)}: falta ${m[1]}`);
  }
});

test('el contenido clave de los servicios está presente', async () => {
  const get = (r) => readFile(path.join(DIST, r), 'utf8');
  assert.match(await get('servicios/instalaciones-especializadas.html'), /declaración TE1/);
  assert.match(await get('servicios/arquitectura-diseno-interiorismo.html'), /Dirección de Obras Municipales \(DOM\)/);
  assert.match(await get('servicios/presupuestos-gestion-proyectos.html'), /Análisis de Precios Unitarios \(APU\)/);
  assert.match(await get('nosotros.html'), /Yesero y Pintor/);
});

test('el formulario tiene todos sus campos y el sitemap lista las páginas', async () => {
  const q = pages.get(path.join(DIST, 'presupuesto.html'));
  for (const n of ['nombre', 'email', 'telefono', 'comuna', 'servicio', 'mensaje', 'acepto']) assert.match(q, new RegExp(`name="${n}"`));
  const sm = await readFile(path.join(DIST, 'sitemap.xml'), 'utf8');
  assert.equal((sm.match(/<loc>/g) || []).length, REQUIRED.length - 1);
});

test('el JavaScript no tiene errores de sintaxis', () => {
  execFileSync(process.execPath, ['--check', path.join(DIST, 'assets/js/main.js')]);
});
