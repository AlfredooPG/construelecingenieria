import { pageHero } from '../lib/components.mjs';

const home = { label: 'Inicio', href: 'index.html' };
const UPDATED = 'octubre de 2026';

const doc = (sections) =>
  `<section class="section"><div class="container narrow prose">
  <p class="note">Última actualización: ${UPDATED}.</p>
  ${sections.map(([t, body]) => `<h2 class="h3">${t}</h2>${body}`).join('')}
</div></section>`;

export const termsPage = {
  file: 'terminos-de-servicio.html',
  depth: 0,
  nav: '',
  title: 'Términos de servicio',
  description: 'Términos y condiciones de uso del sitio web de TAMÁ.',
  body: (c) => `${pageHero(c, { title: 'Términos de servicio', crumb: [home, { label: 'Términos de servicio' }] })}
${doc([
  ['1. Aceptación', `<p>Al usar este sitio web aceptas estos términos. Si no estás de acuerdo, te pedimos no utilizarlo.</p>`],
  ['2. Objeto del sitio', `<p>El sitio entrega información sobre los servicios de ${c.esc(c.site.name)}. La información tiene carácter referencial y no constituye una oferta vinculante.</p>`],
  ['3. Cotizaciones y contratación', `<p>Las solicitudes de presupuesto no obligan a ninguna de las partes. Alcance, valor, plazos, garantías y condiciones de pago se formalizan por escrito en una propuesta o contrato específico para cada proyecto.</p>`],
  ['4. Propiedad intelectual', `<p>Los textos, imágenes, logotipos y demás contenidos del sitio pertenecen a ${c.esc(c.site.name)} o se usan con autorización. No pueden reproducirse sin consentimiento previo.</p>`],
  ['5. Enlaces y servicios de terceros', `<p>El sitio puede enlazar o integrar servicios de terceros (por ejemplo WhatsApp, Google Maps o Google Fonts). Su uso se rige por las condiciones de cada proveedor.</p>`],
  ['6. Limitación de responsabilidad', `<p>Nos esforzamos por mantener la información actualizada, pero no garantizamos que esté libre de errores u omisiones. Para decisiones sobre tu proyecto, solicita una evaluación técnica específica.</p>`],
  ['7. Modificaciones', `<p>Podemos actualizar estos términos. La versión vigente es la publicada en esta página.</p>`],
  ['8. Legislación aplicable', `<p>Estos términos se rigen por las leyes de la República de Chile.</p>`],
  ['9. Contacto', `<p>Consultas: <a href="mailto:${c.site.email}">${c.site.email}</a>.</p>`],
])}`,
};

export const privacyPage = {
  file: 'politica-de-privacidad.html',
  depth: 0,
  nav: '',
  title: 'Política de privacidad',
  description: 'Cómo TAMÁ recopila, usa y protege los datos personales entregados a través del sitio web.',
  body: (c) => `${pageHero(c, { title: 'Política de privacidad', crumb: [home, { label: 'Política de privacidad' }] })}
${doc([
  ['1. Responsable', `<p>${c.esc(c.site.name)} es responsable del tratamiento de los datos que entregas en este sitio. Contacto: <a href="mailto:${c.site.email}">${c.site.email}</a>.</p>`],
  ['2. Datos que recopilamos', `<p>Cuando solicitas un presupuesto, te pedimos nombre, correo electrónico, teléfono, comuna o ciudad y la descripción de tu proyecto. También puedes indicar el tipo de inmueble y el plazo estimado.</p>`],
  ['3. Finalidad', `<p>Usamos estos datos únicamente para responder tu solicitud, elaborar presupuestos y coordinar visitas o reuniones relacionadas con tu proyecto.</p>`],
  ['4. Con quién los compartimos', `<p>No vendemos tus datos. Podemos usar proveedores que permiten operar el sitio y recibir mensajes (por ejemplo, servicios de formularios, correo o WhatsApp), que acceden a los datos solo para ese fin.</p>`],
  ['5. Conservación', `<p>Conservamos los datos mientras sea necesario para atender tu solicitud y cumplir obligaciones legales.</p>`],
  ['6. Tus derechos', `<p>Puedes solicitar acceso, rectificación, supresión u oposición al tratamiento de tus datos, conforme a la legislación chilena de protección de datos personales, escribiendo a <a href="mailto:${c.site.email}">${c.site.email}</a>.</p>`],
  ['7. Cookies y servicios de terceros', `<p>Este sitio no utiliza cookies propias de seguimiento ni publicidad. Al cargar tipografías de Google Fonts o el mapa de Google Maps, esos proveedores pueden recibir datos técnicos como tu dirección IP, según sus propias políticas.</p>`],
  ['8. Cambios', `<p>Podemos actualizar esta política. La versión vigente es la publicada en esta página.</p>`],
])}`,
};

export const notFoundPage = {
  file: '404.html',
  depth: 0,
  absolute: true,
  nav: '',
  noindex: true,
  title: 'Página no encontrada',
  description: 'La página que buscas no existe o fue movida.',
  body: (c) => `
<section class="notfound">
  <div class="container">
    <p class="nf-code" aria-hidden="true">404</p>
    <h1>Página no encontrada</h1>
    <p>La página que buscas no existe o fue movida. Vuelve al inicio o escríbenos si necesitas ayuda.</p>
    <div class="btn-row center">
      <a class="btn btn-primary btn-lg" href="${c.u('index.html')}">${c.i('house')}Volver al inicio</a>
      <a class="btn btn-outline btn-lg" href="${c.u('contacto.html')}">Contacto</a>
    </div>
  </div>
</section>`,
};
