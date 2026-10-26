// Componentes reutilizables: cada función devuelve HTML a partir del contexto de la página.
import { services, servicePath } from '../data/services.mjs';
import { slides } from '../data/carousel.mjs';

export const NAV = [
  { key: 'inicio', label: 'Inicio', href: 'index.html' },
  { key: 'servicios', label: 'Servicios', href: 'servicios/index.html' },
  { key: 'proyectos', label: 'Proyectos', href: 'proyectos.html' },
  { key: 'nosotros', label: 'Nosotros', href: 'nosotros.html' },
  { key: 'faq', label: 'Preguntas', href: 'preguntas-frecuentes.html' },
  { key: 'contacto', label: 'Contacto', href: 'contacto.html' },
];

const WA_GENERIC = 'Hola, quisiera solicitar información y un presupuesto.';

export function brand(c) {
  return `<a class="brand" href="${c.u('index.html')}" aria-label="${c.esc(c.site.name)}, ir al inicio">
    <span class="brand-mark">${c.i('zap')}</span>
    <span class="brand-name">CONSTRUELEC <b>INGENIERÍA</b></span>
  </a>`;
}

export function header(c, active) {
  const links = NAV.map(
    (n) =>
      `<li><a href="${c.u(n.href)}"${n.key === active ? ' aria-current="page"' : ''}>${n.label}</a></li>`,
  ).join('');
  return `<a class="skip" href="#main">Saltar al contenido</a>
<header class="site-header">
  <div class="container header-inner">
    ${brand(c)}
    <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="Abrir menú">
      ${c.i('menu', 'i-open')}${c.i('x', 'i-close')}
    </button>
    <nav id="site-nav" class="site-nav" aria-label="Principal">
      <ul>${links}</ul>
      <a class="btn btn-primary btn-sm" href="${c.u('presupuesto.html')}">Solicitar presupuesto</a>
    </nav>
  </div>
</header>`;
}

export function footer(c) {
  const s = c.site;
  const social = [
    ['instagram', 'Instagram'],
    ['facebook', 'Facebook'],
    ['linkedin', 'LinkedIn'],
  ].filter(([k]) => s.social[k]);
  return `<footer class="site-footer">
  <div class="hazard" aria-hidden="true"></div>
  <div class="container footer-grid">
    <div class="footer-brand">
      ${brand(c)}
      <p>${c.esc(s.tagline)}</p>
      <p class="footer-note">Instalaciones eléctricas y de gas ejecutadas por personal autorizado.</p>
      ${
        social.length
          ? `<ul class="social" aria-label="Redes sociales">${social
              .map(
                ([k, label]) =>
                  `<li><a href="${c.esc(s.social[k])}" target="_blank" rel="noopener noreferrer" aria-label="${label}">${c.i(k)}</a></li>`,
              )
              .join('')}</ul>`
          : ''
      }
    </div>
    <nav aria-label="Enlaces rápidos">
      <h2 class="footer-title">Navegación</h2>
      <ul>${NAV.map((n) => `<li><a href="${c.u(n.href)}">${n.label}</a></li>`).join('')}
      <li><a href="${c.u('presupuesto.html')}">Solicitar presupuesto</a></li></ul>
    </nav>
    <nav aria-label="Servicios">
      <h2 class="footer-title">Servicios</h2>
      <ul>${services.map((x) => `<li><a href="${c.u(servicePath(x))}">${x.title.replace(' (Certificadas)', '')}</a></li>`).join('')}</ul>
    </nav>
    <div>
      <h2 class="footer-title">Contacto</h2>
      <ul class="contact-list">
        <li>${c.i('phone')}<a href="tel:${s.phoneHref}">${s.phone}</a></li>
        <li>${c.i('mail')}<a href="mailto:${s.email}">${s.email}</a></li>
        <li>${c.i('map-pin')}<span>${c.esc(s.address)}</span></li>
        <li>${c.i('clock')}<span>${c.esc(s.hours)}</span></li>
      </ul>
    </div>
  </div>
  <div class="container footer-bottom">
    <p>© ${new Date().getFullYear()} ${c.esc(s.name)}. Todos los derechos reservados.</p>
    <ul>
      <li><a href="${c.u('terminos-de-servicio.html')}">Términos de servicio</a></li>
      <li><a href="${c.u('politica-de-privacidad.html')}">Política de privacidad</a></li>
    </ul>
  </div>
</footer>
<a class="wa-float" href="${c.wa(WA_GENERIC)}" target="_blank" rel="noopener noreferrer" aria-label="Escribir por WhatsApp">${c.i('message-circle')}</a>`;
}

const PIXEL = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';

/** Carrusel de la portada: ocupa exactamente la caja que antes ocupaba el dibujo de la casa. */
export function heroCarousel(c) {
  const total = slides.length;
  const lis = slides
    .map((s, n) => {
      const url = c.u(`assets/img/carrusel/${s.file}`);
      const src = n === 0 ? `src="${url}"` : `src="${PIXEL}" data-src="${url}"`;
      const prio = n === 0 ? ' fetchpriority="high"' : '';
      return `<li class="slide${n === 0 ? ' is-active' : ''}" role="group" aria-roledescription="diapositiva" aria-label="${n + 1} de ${total}" data-cat="${c.esc(s.cat)}" data-caption="${c.esc(s.alt)}">
        <img class="slide-bg" ${src} width="${s.w}" height="${s.h}" alt="" aria-hidden="true">
        <img class="slide-img" ${src} width="${s.w}" height="${s.h}" alt="${c.esc(s.alt)}" decoding="async"${prio}>
      </li>`;
    })
    .join('');
  return `<section class="hero-art carousel" data-carousel aria-roledescription="carrusel" aria-label="Galería de trabajos realizados" tabindex="0">
    <div class="carousel-stage"><ul class="carousel-track">${lis}</ul></div>
    <div class="carousel-bar">
      <p class="carousel-caption" aria-live="off"><b>${c.esc(slides[0].cat)}</b><span>${c.esc(slides[0].alt)}</span></p>
      <p class="carousel-count" aria-hidden="true"><span data-current>1</span> / ${total}</p>
      <div class="carousel-controls">
        <button type="button" class="carousel-btn" data-carousel-prev aria-label="Imagen anterior">${c.i('chevron-left')}</button>
        <button type="button" class="carousel-btn" data-carousel-toggle aria-label="Pausar animación" aria-pressed="false">${c.i('pause', 'i-pause')}${c.i('play', 'i-play')}</button>
        <button type="button" class="carousel-btn" data-carousel-next aria-label="Imagen siguiente">${c.i('chevron-right')}</button>
      </div>
      <span class="carousel-progress" aria-hidden="true"></span>
    </div>
  </section>`;
}

export function crumbs(c, items) {
  const lis = items
    .map((it, n) =>
      n === items.length - 1
        ? `<li aria-current="page">${c.esc(it.label)}</li>`
        : `<li><a href="${c.u(it.href)}">${c.esc(it.label)}</a></li>`,
    )
    .join('');
  return `<nav class="crumbs" aria-label="Migas de pan"><ol>${lis}</ol></nav>`;
}

/** Cabecera de páginas interiores. */
export function pageHero(c, { eyebrow, title, lead, crumb, actions = '', icon = '' }) {
  return `<section class="page-hero">
  <div class="container">
    ${crumb ? crumbs(c, crumb) : ''}
    <div class="page-hero-body">
      ${icon ? `<span class="page-hero-icon">${c.i(icon)}</span>` : ''}
      <div>
        ${eyebrow ? `<p class="eyebrow">${c.esc(eyebrow)}</p>` : ''}
        <h1>${title}</h1>
        ${lead ? `<p class="lead">${lead}</p>` : ''}
        ${actions ? `<div class="btn-row">${actions}</div>` : ''}
      </div>
    </div>
  </div>
</section>`;
}

/** Llamado a la acción final de página. */
export function ctaBand(c, { title = '¿Tienes un proyecto en mente?', text, wa = WA_GENERIC } = {}) {
  return `<section class="cta-band">
  <div class="container cta-inner">
    <div>
      <h2>${title}</h2>
      <p>${text || 'Cuéntanos qué necesitas y te ayudamos a definir alcance, normativa y presupuesto.'}</p>
    </div>
    <div class="btn-row">
      <a class="btn btn-primary" href="${c.u('presupuesto.html')}">${c.i('file-text')}Solicitar presupuesto</a>
      <a class="btn btn-whatsapp" href="${c.wa(wa)}" target="_blank" rel="noopener noreferrer">${c.i('message-circle')}WhatsApp</a>
    </div>
  </div>
</section>`;
}

export function serviceCard(c, s) {
  return `<article class="card service-card">
  <div class="service-card-top"><span class="icon-box">${c.i(s.icon)}</span><span class="service-num" aria-hidden="true">${s.num}</span></div>
  <h3>${s.title}</h3>
  <p>${s.short}</p>
  <ul class="checklist">${s.highlights.map((h) => `<li>${h}</li>`).join('')}</ul>
  <a class="link-arrow" href="${c.u(servicePath(s))}">Ver detalle del servicio<span class="sr-only">: ${s.title}</span>${c.i('arrow-right')}</a>
</article>`;
}

export function projectCard(c, p, cat, { lightbox = false } = {}) {
  const src = c.u(`assets/img/proyecto-${p.slug}.svg`);
  const media = `<span class="media"><img src="${src}" width="800" height="600" loading="lazy" decoding="async" alt="Imagen referencial: ${c.esc(p.title)}"><span class="badge">Imagen referencial</span></span>`;
  const body = `<span class="project-body"><span class="project-cat">${c.esc(cat.label)}</span><span class="project-title">${c.esc(p.title)}</span></span>`;
  return lightbox
    ? `<li class="project" data-cat="${p.cat}"><button type="button" class="project-open" data-src="${src}" data-title="${c.esc(p.title)}" data-desc="${c.esc(p.desc)}" data-cat="${c.esc(cat.label)}" aria-label="Ampliar: ${c.esc(p.title)}">${media}${body}</button></li>`
    : `<li class="project"><a class="project-open" href="${c.u('proyectos.html')}">${media}${body}</a></li>`;
}
