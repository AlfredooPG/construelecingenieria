import { services } from '../data/services.mjs';
import { team } from '../data/team.mjs';
import { projects, categories } from '../data/projects.mjs';
import { faqGroups } from '../data/faq.mjs';
import { pageHero, ctaBand, projectCard } from '../lib/components.mjs';

const home = { label: 'Inicio', href: 'index.html' };

export const aboutPage = {
  file: 'nosotros.html',
  depth: 0,
  nav: 'nosotros',
  title: 'Nosotros | Equipo profesional y enfoque normativo',
  description:
    'Equipo multidisciplinario de ingeniero constructor, arquitecto, electricista autorizado SEC, gásfiter y especialistas en terminaciones. Rigor técnico y cumplimiento normativo.',
  body: (c) => `
${pageHero(c, {
  eyebrow: 'La empresa',
  title: 'Un equipo, todas las especialidades',
  lead: 'Contamos con un equipo multidisciplinario de profesionales y técnicos calificados para abordar cada etapa del proyecto con el máximo rigor técnico.',
  crumb: [home, { label: 'Nosotros' }],
})}
<section class="section">
  <div class="container grid grid-3">
    <article class="card"><span class="icon-box">${c.i('shield-check')}</span><h2 class="h3">Enfoque normativo</h2><p>Trabajamos conforme a la normativa urbanística, municipal y de la SEC. Gestionamos permisos, regularizaciones, recepciones finales y declaraciones TE1.</p></article>
    <article class="card"><span class="icon-box">${c.i('clipboard-check')}</span><h2 class="h3">Rigor técnico</h2><p>Planos, especificaciones, cubicaciones y presupuestos detallados, con inspección técnica de obra y control de calidad durante la ejecución.</p></article>
    <article class="card"><span class="icon-box">${c.i('badge-check')}</span><h2 class="h3">Terminaciones de excelencia</h2><p>Cada oficio a cargo de su especialista: ceramista, carpintero, soldador, yesero y pintor, para un resultado fino y duradero.</p></article>
  </div>
</section>
<section class="section section-alt">
  <div class="container">
    <div class="section-head"><p class="eyebrow">Equipo técnico y especialidades</p><h2>Quiénes participan en tu obra</h2></div>
    <ul class="grid grid-4 team-grid">${team.map((t) => `<li class="card team-card"><span class="icon-box">${c.i(t.icon)}</span><h3>${t.role}</h3><p>${t.desc}</p></li>`).join('')}</ul>
  </div>
</section>
<section class="section">
  <div class="container split">
    <div>
      <p class="eyebrow">Valor diferencial</p>
      <h2>Del primer plano a la recepción final</h2>
      <p>Al reunir diseño, tramitación, obra, instalaciones certificadas y control de costos en un mismo equipo, evitas coordinar proveedores por separado y reduces errores entre etapas.</p>
    </div>
    <ul class="checklist big">
      <li>Diseño y permisos ante la DOM en el mismo proyecto.</li>
      <li>Instalaciones eléctricas y de gas por personal autorizado.</li>
      <li>Presupuestos detallados para comparar con claridad.</li>
      <li>Inspección técnica y lista de observaciones al entregar.</li>
    </ul>
  </div>
</section>
${ctaBand(c)}`,
};

const LIGHTBOX = (c) => `<dialog id="lightbox" class="lightbox" aria-label="Vista ampliada del proyecto">
  <div class="lightbox-bar">
    <button type="button" class="icon-btn" data-lb="prev" aria-label="Proyecto anterior">${c.i('arrow-right', 'flip')}</button>
    <button type="button" class="icon-btn" data-lb="next" aria-label="Proyecto siguiente">${c.i('arrow-right')}</button>
    <button type="button" class="icon-btn" data-lb="close" aria-label="Cerrar">${c.i('x')}</button>
  </div>
  <figure>
    <div class="media lightbox-media"><img id="lb-img" src="${c.u('assets/img/proyecto-ampliacion-vivienda.svg')}" width="800" height="600" alt=""></div>
    <figcaption><p class="project-cat" id="lb-cat"></p><h2 id="lb-title">Proyecto</h2><p id="lb-desc"></p><p class="note">Imagen referencial.</p></figcaption>
  </figure>
</dialog>`;

export const projectsPage = {
  file: 'proyectos.html',
  depth: 0,
  nav: 'proyectos',
  title: 'Proyectos y portafolio',
  description:
    'Galería de proyectos de arquitectura, obras civiles, remodelaciones e instalaciones. Filtra por categoría y amplía cada imagen.',
  body: (c) => `
${pageHero(c, {
  eyebrow: 'Portafolio',
  title: 'Proyectos y obras',
  lead: 'Una muestra de los tipos de trabajo que ejecutamos. Filtra por categoría y haz clic en una imagen para ampliarla.',
  crumb: [home, { label: 'Proyectos' }],
})}
<section class="section">
  <div class="container">
    <div class="filters" role="group" aria-label="Filtrar proyectos por categoría">
      <button type="button" class="chip-btn" data-filter="all" aria-pressed="true">Todos</button>
      ${categories.map((k) => `<button type="button" class="chip-btn" data-filter="${k.key}" aria-pressed="false">${k.label}</button>`).join('')}
    </div>
    <p class="sr-only" id="filter-status" role="status" aria-live="polite"></p>
    <ul class="grid grid-4 project-grid" id="project-grid">${projects.map((p) => projectCard(c, p, categories.find((k) => k.key === p.cat), { lightbox: true })).join('')}</ul>
    <p class="note mt">Las imágenes mostradas son referenciales.</p>
  </div>
</section>
${LIGHTBOX(c)}
${ctaBand(c, { title: '¿Quieres un proyecto como estos?' })}`,
};

export const contactPage = {
  file: 'contacto.html',
  depth: 0,
  nav: 'contacto',
  title: 'Contacto',
  description: 'Contacta a TAMÁ por WhatsApp, teléfono o correo. Datos de ubicación, horario y mapa.',
  body: (c) => {
    const s = c.site;
    return `
${pageHero(c, {
  eyebrow: 'Contacto',
  title: 'Hablemos de tu proyecto',
  lead: 'Elige el canal que prefieras. Respondemos en horario de atención.',
  crumb: [home, { label: 'Contacto' }],
})}
<section class="section">
  <div class="container split split-wide">
    <div>
      <ul class="contact-cards">
        <li><a class="card contact-card" href="${c.wa('Hola, quisiera hacer una consulta.')}" target="_blank" rel="noopener noreferrer"><span class="icon-box wa">${c.i('message-circle')}</span><span><strong>WhatsApp</strong><br>${s.phone}</span></a></li>
        <li><a class="card contact-card" href="tel:${s.phoneHref}"><span class="icon-box">${c.i('phone')}</span><span><strong>Teléfono</strong><br>${s.phone}</span></a></li>
        <li><a class="card contact-card" href="${c.mail('Consulta desde el sitio web', 'Hola, quisiera hacer una consulta.')}"><span class="icon-box">${c.i('mail')}</span><span><strong>Correo</strong><br>${s.email}</span></a></li>
        <li><div class="card contact-card"><span class="icon-box">${c.i('map-pin')}</span><span><strong>Ubicación</strong><br>${c.esc(s.address)}</span></div></li>
        <li><div class="card contact-card"><span class="icon-box">${c.i('clock')}</span><span><strong>Horario</strong><br>${c.esc(s.hours)}</span></div></li>
      </ul>
      <p class="mt"><a class="btn btn-primary" href="${c.u('presupuesto.html')}">${c.i('file-text')}Solicitar presupuesto</a></p>
    </div>
    <div class="map-wrap">
      <iframe title="Mapa de ubicación de ${c.esc(s.name)}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" width="600" height="450" src="https://www.google.com/maps?q=${encodeURIComponent(s.mapQuery)}&amp;output=embed"></iframe>
    </div>
  </div>
</section>`;
  },
};

const FIELD_ERR = (id) => `<p class="field-error" id="err-${id}" aria-live="polite"></p>`;

export const quotePage = {
  file: 'presupuesto.html',
  depth: 0,
  nav: '',
  title: 'Solicitud de presupuesto',
  description: 'Solicita un presupuesto para arquitectura, construcción, remodelación o instalaciones. Completa el formulario y te contactamos.',
  body: (c) => {
    const s = c.site;
    return `
${pageHero(c, {
  eyebrow: 'Cotización',
  title: 'Solicita tu presupuesto',
  lead: 'Cuéntanos sobre tu proyecto. Mientras más detalle entregues, más preciso será el presupuesto.',
  crumb: [home, { label: 'Solicitud de presupuesto' }],
})}
<section class="section">
  <div class="container split split-wide">
    <div class="form-card">
      <form id="quote-form" novalidate data-endpoint="${c.esc(s.formEndpoint)}" data-wa="${s.whatsapp}" data-mail="${s.email}">
        <div class="form-grid">
          <div class="field"><label for="nombre">Nombre completo <span aria-hidden="true">*</span></label><input id="nombre" name="nombre" type="text" autocomplete="name" required aria-describedby="err-nombre">${FIELD_ERR('nombre')}</div>
          <div class="field"><label for="email">Correo electrónico <span aria-hidden="true">*</span></label><input id="email" name="email" type="email" autocomplete="email" required aria-describedby="err-email">${FIELD_ERR('email')}</div>
          <div class="field"><label for="telefono">Teléfono / WhatsApp <span aria-hidden="true">*</span></label><input id="telefono" name="telefono" type="tel" autocomplete="tel" inputmode="tel" placeholder="+56 9 1234 5678" required aria-describedby="err-telefono">${FIELD_ERR('telefono')}</div>
          <div class="field"><label for="comuna">Comuna o ciudad <span aria-hidden="true">*</span></label><input id="comuna" name="comuna" type="text" autocomplete="address-level2" required aria-describedby="err-comuna">${FIELD_ERR('comuna')}</div>
          <div class="field"><label for="servicio">Servicio de interés <span aria-hidden="true">*</span></label>
            <select id="servicio" name="servicio" required aria-describedby="err-servicio"><option value="">Selecciona una opción</option>${services.map((x) => `<option value="${x.slug}">${x.title.replace(' (Certificadas)', '')}</option>`).join('')}<option value="otro">Otro / No estoy seguro</option></select>${FIELD_ERR('servicio')}</div>
          <div class="field"><label for="inmueble">Tipo de inmueble</label>
            <select id="inmueble" name="inmueble"><option value="">Selecciona una opción</option><option>Casa</option><option>Departamento</option><option>Local comercial</option><option>Oficina</option><option>Edificio institucional</option><option>Terreno</option></select><p class="field-error" aria-hidden="true"></p></div>
          <div class="field"><label for="plazo">Plazo estimado de inicio</label>
            <select id="plazo" name="plazo"><option value="">Selecciona una opción</option><option>Lo antes posible</option><option>En 1 a 3 meses</option><option>Más de 3 meses</option><option>Solo estoy cotizando</option></select><p class="field-error" aria-hidden="true"></p></div>
          <div class="field field-full"><label for="mensaje">Describe tu proyecto <span aria-hidden="true">*</span></label><textarea id="mensaje" name="mensaje" rows="5" required minlength="20" aria-describedby="err-mensaje hint-mensaje"></textarea><p class="hint" id="hint-mensaje">Indica metros cuadrados aproximados, qué quieres hacer y si ya tienes planos.</p>${FIELD_ERR('mensaje')}</div>
          <div class="field field-hp" aria-hidden="true"><label for="website">No completar este campo</label><input id="website" name="website" type="text" tabindex="-1" autocomplete="off"></div>
          <div class="field field-full"><label class="check"><input id="acepto" name="acepto" type="checkbox" required aria-describedby="err-acepto"><span>Acepto la <a href="${c.u('politica-de-privacidad.html')}">política de privacidad</a> y los <a href="${c.u('terminos-de-servicio.html')}">términos de servicio</a>. <span aria-hidden="true">*</span></span></label>${FIELD_ERR('acepto')}</div>
        </div>
        <p class="hint">Los campos con * son obligatorios.</p>
        <div class="form-alert" id="form-alert" role="alert" hidden></div>
        <button class="btn btn-primary btn-lg" type="submit" id="submit-btn"><span class="btn-label">${c.i('send')}Enviar solicitud</span></button>
      </form>
      <div class="form-result" id="form-result" tabindex="-1" hidden>
        <span class="icon-box ok">${c.i('check')}</span>
        <h2 id="result-title">Solicitud</h2>
        <p id="result-text"></p>
        <div class="btn-row" id="result-actions"></div>
      </div>
    </div>
    <aside class="aside-card">
      <h2 class="h3">¿Qué sigue?</h2>
      <ol class="mini-steps">
        <li>Revisamos tu solicitud y la normativa que aplica.</li>
        <li>Coordinamos una llamada o visita para levantar información.</li>
        <li>Te entregamos una propuesta con alcance y presupuesto detallado.</li>
      </ol>
      <p>¿Prefieres hablar ahora?</p>
      <a class="btn btn-whatsapp" href="${c.wa('Hola, quisiera solicitar un presupuesto.')}" target="_blank" rel="noopener noreferrer">${c.i('message-circle')}Escribir por WhatsApp</a>
    </aside>
  </div>
</section>`;
  },
};

export const faqPage = {
  file: 'preguntas-frecuentes.html',
  depth: 0,
  nav: 'faq',
  title: 'Preguntas frecuentes',
  description: 'Respuestas sobre permisos municipales (DOM), certificación SEC y declaración TE1, garantías, presupuestos y formas de pago.',
  body: (c) => `
${pageHero(c, {
  eyebrow: 'Ayuda',
  title: 'Preguntas frecuentes',
  lead: 'Permisos municipales, certificación SEC, garantías y formas de pago.',
  crumb: [home, { label: 'Preguntas frecuentes' }],
})}
<section class="section">
  <div class="container narrow">
    ${faqGroups
      .map(
        (g) => `<h2 class="h3 faq-group">${g.title}</h2>
    <div class="faq">${g.items.map(([q, a]) => `<details class="faq-item" name="faq"><summary>${q}</summary><div class="faq-body"><p>${a}</p></div></details>`).join('')}</div>`,
      )
      .join('')}
    <p class="mt">¿No encuentras tu respuesta? <a href="${c.u('contacto.html')}">Contáctanos</a>.</p>
  </div>
</section>
${ctaBand(c)}`,
};
