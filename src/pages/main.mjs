import { services, servicePath } from '../data/services.mjs';
import { team } from '../data/team.mjs';
import { projects, categories } from '../data/projects.mjs';
import { pageHero, serviceCard, projectCard, ctaBand, heroCarousel } from '../lib/components.mjs';

const PROCESS = [
  ['Visita y levantamiento', 'Revisamos el inmueble, tomamos medidas y entendemos tus objetivos y restricciones normativas.'],
  ['Diseño y presupuesto', 'Planos, especificaciones, cubicación y presupuesto detallado por partidas.'],
  ['Ejecución con control', 'Obra coordinada por especialistas, con inspección técnica y control de calidad.'],
  ['Recepción y entrega', 'Lista de observaciones, correcciones y tramitación de recepciones y certificaciones.'],
];

const VALUES = [
  ['shield-check', 'Cumplimiento normativo', 'Permisos DOM, urbanismo y declaraciones SEC resueltos dentro del mismo proyecto.'],
  ['ruler', 'Calidad técnica', 'Presupuestos detallados, inspección técnica de obra y control en ejecución.'],
  ['badge-check', 'Excelencia en terminaciones', 'Especialistas en cada oficio para un acabado fino y duradero.'],
];

export const homePage = {
  file: 'index.html',
  depth: 0,
  nav: 'inicio',
  title: 'ConstruElec Ingeniería | Construcción, remodelación e instalaciones',
  description:
    'Soluciones integrales de diseño, construcción, remodelación e instalaciones certificadas SEC para proyectos residenciales, comerciales e institucionales. Solicita tu presupuesto.',
  jsonld: (c) => ({
    '@context': 'https://schema.org',
    '@type': 'GeneralContractor',
    name: c.site.name,
    url: c.site.url,
    telephone: c.site.phone,
    email: c.site.email,
    areaServed: 'CL',
    description: c.site.tagline,
  }),
  body: (c) => `
<section class="hero">
  <div class="container hero-inner">
    <div>
      <p class="eyebrow">Arquitectura · Construcción · Instalaciones</p>
      <h1>Diseñamos, construimos y <em>certificamos</em> tu proyecto</h1>
      <p class="hero-lead">Ofrecemos soluciones integrales en diseño, construcción, remodelación y gestión de proyectos, garantizando el cumplimiento normativo, la calidad técnica y la excelencia en las terminaciones para proyectos residenciales, comerciales e institucionales.</p>
      <div class="btn-row">
        <a class="btn btn-primary btn-lg" href="${c.u('presupuesto.html')}">${c.i('file-text')}Solicitar presupuesto</a>
        <a class="btn btn-outline btn-lg" href="${c.u('servicios/index.html')}">Ver servicios${c.i('arrow-right')}</a>
      </div>
    </div>
    ${heroCarousel(c)}
  </div>
</section>

<section class="values" aria-label="Nuestros compromisos">
  <div class="container grid grid-3">
    ${VALUES.map(([ic, t, d]) => `<div class="value"><span class="icon-box">${c.i(ic)}</span><div><h2>${t}</h2><p>${d}</p></div></div>`).join('')}
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head">
      <p class="eyebrow">Servicios</p>
      <h2>Cinco pilares, un solo equipo</h2>
      <p>Desde el diseño y los permisos hasta la obra, las instalaciones certificadas y el control de costos.</p>
    </div>
    <div class="grid grid-services">${services.map((s) => serviceCard(c, s)).join('')}</div>
  </div>
</section>

<section class="section section-alt">
  <div class="container">
    <div class="section-head center">
      <p class="eyebrow">Cómo trabajamos</p>
      <h2>Un proceso claro de principio a fin</h2>
    </div>
    <ol class="steps">${PROCESS.map(([t, d], n) => `<li><span class="step-n" aria-hidden="true">${n + 1}</span><h3>${t}</h3><p>${d}</p></li>`).join('')}</ol>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head">
      <p class="eyebrow">Equipo técnico y especialidades</p>
      <h2>Profesionales calificados en cada etapa</h2>
      <p>Un equipo multidisciplinario de profesionales y técnicos para abordar cada etapa del proyecto con el máximo rigor técnico.</p>
    </div>
    <ul class="chips">${team.map((t) => `<li>${c.i(t.icon)}${t.role}</li>`).join('')}</ul>
    <p class="mt"><a class="link-arrow" href="${c.u('nosotros.html')}">Conoce a la empresa${c.i('arrow-right')}</a></p>
  </div>
</section>

<section class="section section-alt">
  <div class="container">
    <div class="section-head">
      <p class="eyebrow">Proyectos</p>
      <h2>Tipos de obra que ejecutamos</h2>
    </div>
    <ul class="grid grid-3 project-grid">${projects.slice(0, 3).map((p) => projectCard(c, p, categories.find((x) => x.key === p.cat))).join('')}</ul>
    <p class="mt"><a class="link-arrow" href="${c.u('proyectos.html')}">Ver todos los proyectos${c.i('arrow-right')}</a></p>
  </div>
</section>

${ctaBand(c, { text: 'Cuéntanos qué necesitas. Te ayudamos a definir alcance, normativa y presupuesto.' })}`,
};

export const servicesIndexPage = {
  file: 'servicios/index.html',
  depth: 1,
  nav: 'servicios',
  title: 'Servicios de construcción e instalaciones',
  description:
    'Portafolio completo: arquitectura e interiorismo, obras civiles y ampliaciones, remodelaciones, instalaciones eléctricas, sanitarias y de gas certificadas, y gestión de proyectos.',
  body: (c) => `
${pageHero(c, {
  eyebrow: 'Servicios corporativos',
  title: 'Soluciones integrales para tu proyecto',
  lead: 'Ofrecemos soluciones integrales en diseño, construcción, remodelación y gestión de proyectos, garantizando el cumplimiento normativo, la calidad técnica y la excelencia en las terminaciones para proyectos residenciales, comerciales e institucionales.',
  crumb: [{ label: 'Inicio', href: 'index.html' }, { label: 'Servicios' }],
})}
<section class="section">
  <div class="container grid grid-services">${services.map((s) => serviceCard(c, s)).join('')}</div>
</section>
${ctaBand(c, { text: 'Si no estás seguro de qué servicio necesitas, escríbenos y te orientamos.' })}`,
};

export const servicePages = services.map((s) => ({
  file: servicePath(s),
  depth: 1,
  nav: 'servicios',
  title: s.title,
  description: `${s.intro} Solicita tu presupuesto con ConstruElec Ingeniería.`.slice(0, 200),
  body: (c) => {
    const others = services.filter((o) => o.slug !== s.slug);
    return `
${pageHero(c, {
  eyebrow: `Servicio ${s.num}`,
  title: s.title,
  lead: s.intro,
  icon: s.icon,
  crumb: [
    { label: 'Inicio', href: 'index.html' },
    { label: 'Servicios', href: 'servicios/index.html' },
    { label: s.title.replace(' (Certificadas)', '') },
  ],
  actions: `<a class="btn btn-primary" href="${c.u('presupuesto.html')}?servicio=${s.slug}">${c.i('file-text')}Cotizar este servicio</a>
  <a class="btn btn-whatsapp" href="${c.wa(`Hola, quisiera cotizar el servicio de ${s.title}.`)}" target="_blank" rel="noopener noreferrer">${c.i('message-circle')}Consultar por WhatsApp</a>`,
})}
<section class="section">
  <div class="container">
    <div class="grid grid-2">
      ${s.groups
        .map(
          (g) => `<article class="card detail-card">
        <h2>${g.title}</h2>
        <ul class="checklist">${g.items.map((i) => `<li>${i}</li>`).join('')}</ul>
      </article>`,
        )
        .join('')}
    </div>
    <div class="specialists">
      <h2>Especialistas que participan</h2>
      <ul class="chips">${s.team.map((r) => `<li>${c.i(team.find((t) => t.role === r)?.icon || 'users')}${r}</li>`).join('')}</ul>
    </div>
  </div>
</section>
<section class="section section-alt">
  <div class="container">
    <div class="section-head"><p class="eyebrow">Otros servicios</p><h2>Complementa tu proyecto</h2></div>
    <div class="grid grid-4">${others
      .map(
        (o) => `<a class="mini-card" href="${c.u(servicePath(o))}"><span class="icon-box">${c.i(o.icon)}</span><span>${o.title.replace(' (Certificadas)', '')}</span>${c.i('arrow-right')}</a>`,
      )
      .join('')}</div>
  </div>
</section>
${ctaBand(c, { title: `Cotiza ${s.title.replace(' (Certificadas)', '')}`, wa: `Hola, quisiera cotizar el servicio de ${s.title}.` })}`;
  },
}));
