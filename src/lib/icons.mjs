// Genera un sprite SVG con SOLO los íconos Lucide usados en cada página (sin CDN, sin JS).
import path from 'node:path';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const ICON_DIR = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../../node_modules/lucide/dist/esm/icons',
);
const cache = new Map();

export async function loadIcon(name) {
  if (cache.has(name)) return cache.get(name);
  let src;
  try {
    src = await readFile(path.join(ICON_DIR, `${name}.js`), 'utf8');
  } catch {
    throw new Error(`Ícono Lucide inexistente: "${name}" (¿falta ejecutar npm install?)`);
  }
  // Se lee como texto (no import) para funcionar en cualquier versión de Node:
  // el paquete lucide no declara "type": "module".
  const m = src.match(/const \w+ = (\[[\s\S]*?\]);\s*export/);
  if (!m) throw new Error(`Formato inesperado en el ícono Lucide "${name}"`);
  const node = new Function('defaultAttributes', `return ${m[1]};`)({});
  const children = node[2];
  cache.set(name, children);
  return children;
}

const attrs = (o) => Object.entries(o).map(([k, v]) => `${k}="${v}"`).join(' ');
export const innerSvg = (children) => children.map(([tag, a]) => `<${tag} ${attrs(a)}/>`).join('');

export async function sprite(names) {
  const symbols = [];
  for (const n of [...names].sort()) {
    symbols.push(`<symbol id="i-${n}" viewBox="0 0 24 24">${innerSvg(await loadIcon(n))}</symbol>`);
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" class="sprite" width="0" height="0" aria-hidden="true" focusable="false">${symbols.join('')}</svg>`;
}
