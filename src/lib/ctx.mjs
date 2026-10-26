// Contexto compartido por cada página: rutas relativas, íconos y enlaces de contacto.
export const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function createCtx(site, { depth = 0, absolute = false } = {}) {
  const root = absolute ? '/' : '../'.repeat(depth);
  const used = new Set();
  return {
    site,
    root,
    used,
    esc,
    /** Ruta interna relativa a la raíz del sitio. */
    u: (p = '') => root + p,
    /** Ícono del sprite SVG (se registra para incluirlo solo si se usa). */
    i: (name, cls = '') => {
      used.add(name);
      return `<svg class="i${cls ? ' ' + cls : ''}" aria-hidden="true" focusable="false"><use href="#i-${name}"></use></svg>`;
    },
    /** Enlace de WhatsApp con mensaje predefinido. */
    wa: (msg) => `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(msg)}`,
    /** Enlace mailto con asunto y cuerpo predefinidos (ya escapado para HTML). */
    mail: (subject, body = '') =>
      `mailto:${site.email}?subject=${encodeURIComponent(subject)}&amp;body=${encodeURIComponent(body)}`,
  };
}
