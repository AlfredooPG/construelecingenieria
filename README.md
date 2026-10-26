# ConstruElec Ingeniería — sitio corporativo (v2)

Sitio multipágina estático, sin framework ni CDN de CSS/JS. Un generador (`build.mjs`) ensambla las páginas a partir de componentes y datos únicos y escribe el resultado en `dist/`.

> La carpeta original `construelec-ingenieria` (landing de una página) se mantiene intacta como respaldo.

## Comandos

```bash
npm install        # solo la primera vez (ya incluye node_modules si copiaste la carpeta)
npm run dev        # compila y sirve en http://localhost:3000
npm run build      # genera dist/
npm run check      # compila + valida HTML + pruebas (15 páginas, enlaces, alt, íconos, JS)
```

Publicación: sube el contenido de `dist/` a cualquier hosting estático (Netlify, Vercel, GitHub Pages, cPanel). Incluye `sitemap.xml`, `robots.txt`, `_headers` (Netlify) y `serve.json`.

## Dónde editar

| Qué | Archivo |
|---|---|
| Teléfono, WhatsApp, correo, dirección, horario, redes, endpoint del formulario | `src/data/site.json` |
| Los 5 servicios (alimentan Inicio, Servicios, cada detalle y footer) | `src/data/services.mjs` |
| Equipo / especialidades | `src/data/team.mjs` |
| Proyectos de la galería | `src/data/projects.mjs` |
| Preguntas frecuentes | `src/data/faq.mjs` |
| Header, footer, héroes, CTA, tarjetas | `src/lib/components.mjs` |
| Páginas | `src/pages/*.mjs` |
| Diseño (colores, tipografía, componentes) | `src/assets/css/main.css` (tokens en `:root`) |
| Interacciones (menú, galería, formulario) | `src/assets/js/main.js` |

## Sistema de diseño

Fondo blanco/`#F8FAFC`; primario azul industrial `#0F172A` / `#1E3A8A`; acento ámbar `#F59E0B` (CTA e íconos); texto `#334155` / `#1E293B`, secundario `#64748B`; tipografía Inter (400–800); tarjetas con borde `#E2E8F0`, radio 12 px y sombra sutil; íconos Lucide incrustados como sprite SVG (solo los usados en cada página).

## Carrusel de la portada

Ocupa la misma caja que antes tenía el dibujo de la casa (proporción 640×520, ancho máximo 560 px). Las fotos están en `src/assets/img/carrusel/` (WebP, máx. 1100 px) y su lista, con categoría y texto alternativo, en `src/data/carousel.json`. Para agregar o quitar fotos, edita ese archivo y copia/borra el WebP; el contador y los controles se ajustan solos. Autoplay de 5 s, pausa al pasar el cursor o enfocar, botón de pausa, flechas del teclado y deslizamiento táctil; con "reducir movimiento" activado en el sistema arranca en pausa.

`_no-publicar/` guarda fotos revisadas y excluidas (personas identificables, capturas de pantalla). No se copia a `dist/`.

## Antes de publicar

1. **Datos de contacto** (`site.json`): teléfono, correo, dirección y mapa son de ejemplo. Agrega las URL de redes sociales: el footer solo muestra las que no estén vacías.
2. **Proyectos**: las miniaturas son ilustraciones referenciales (marcadas "Imagen referencial"). Reemplázalas por fotos reales (WebP/AVIF, con `width`/`height`) y quita la marca.
3. **Formulario**: sin backend. Si `formEndpoint` está vacío, al validar muestra un panel para enviar por WhatsApp o correo con los datos ya escritos. Para recibirlo directamente, pon en `formEndpoint` la URL de un servicio como Formspree.
4. **Textos legales y de FAQ** (garantías, plazos, medios de pago, términos y privacidad): son orientativos; revísalos con la empresa y asesoría legal.
5. Dominio: ajusta `url` en `site.json` (canonical, sitemap).

## Rendimiento y accesibilidad

Sin JavaScript ni CSS de terceros bloqueantes; una sola familia tipográfica; imágenes con dimensiones explícitas (CLS), `loading="lazy"` y skeleton de carga; CSS/JS con versión por contenido para caché inmutable; navegación por teclado, `aria-*`, enlace "saltar al contenido" y `prefers-reduced-motion`.
