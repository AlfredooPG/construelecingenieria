# ConstruElec Ingeniería — Landing page corporativa

Sitio web de una sola página (landing) para una empresa de ingeniería, construcción e instalaciones eléctricas en Chile. Presenta los servicios, los motivos para elegir a la empresa, una galería de proyectos de ejemplo y un formulario de cotización para empresas (B2B).

> **Importante:** los textos de marca, las cifras (180+ proyectos, 20+ años, 6 regiones), los proyectos, los teléfonos, los correos y el dominio `construelecingenieria.cl` son **datos de ejemplo**. Reemplázalos por los reales antes de publicar. El sello "Instalador Eléctrico Autorizado SEC" y las menciones a las declaraciones TE1 a TE6 solo deben mostrarse si la empresa cuenta efectivamente con esa autorización.

## 1. Funcionalidades

- Encabezado fijo con navegación, menú móvil y botón de cotización.
- Barra de atención de emergencias 24/7.
- Sección principal (hero) con llamadas a la acción.
- Banner de cifras con contadores animados al hacer scroll.
- Siete líneas de servicio: montaje eléctrico industrial, tableros, energías renovables, redes y empalmes, telecomunicaciones, certificaciones SEC (TE1 a TE6) y obras civiles integradas.
- Sección "Por qué elegirnos", galería de proyectos y pie de página con aviso de acreditación SEC.
- Formulario de cotización B2B con validación del navegador. **Aún no envía los datos a ningún servidor** (ver sección 12).

## 2. Tecnologías

| Parte | Tecnología |
|---|---|
| Marcado y lógica | HTML5 y JavaScript (sin framework) |
| Estilos | Tailwind CSS 3.4.17, cargado por CDN |
| Íconos | Lucide 0.469.0, cargado por CDN (jsDelivr) |
| Tipografías | Barlow Condensed e Inter (Google Fonts) |
| Servidor local | [`serve`](https://www.npmjs.com/package/serve) |
| Calidad | `html-validate` (revisión del HTML) y `node:test` (pruebas) |

No hay backend, base de datos, APIs propias ni variables de entorno. Por eso el proyecto no incluye un `.env.example`.

## 3. Requisitos previos

- **Node.js 18.18 o superior** (recomendado: la versión LTS actual). Incluye `npm`.
- **Visual Studio Code**.
- **Google Chrome o Microsoft Edge** (para depurar desde VS Code; para solo ver la página sirve cualquier navegador).
- **Conexión a Internet** al abrir la página, porque Tailwind, Lucide y las fuentes se descargan desde sus CDN.

Verifica tus versiones con:

```bash
node -v
npm -v
```

## 4. Estructura de carpetas

```text
construelec-ingenieria/
├── index.html              # La página completa (HTML, estilos y JavaScript)
├── package.json            # Scripts y dependencias de desarrollo
├── package-lock.json       # Versiones exactas de las dependencias
├── .htmlvalidate.json      # Reglas de revisión del HTML
├── .editorconfig           # Formato de código consistente entre editores
├── .gitignore              # Archivos que no se suben a Git
├── tests/
│   └── site.test.mjs       # Pruebas de integridad de index.html
└── .vscode/
    ├── extensions.json     # Extensiones recomendadas
    ├── settings.json       # Ajustes del editor
    ├── tasks.json          # Tareas (instalar, iniciar servidor, verificar)
    └── launch.json         # Depuración en Chrome o Edge
```

Dentro de `index.html`:

- `<head>`: metadatos, fuentes, Tailwind (con la paleta de marca en `tailwind.config`), Lucide y estilos complementarios.
- `<body>`: una `<section>` por bloque de contenido (`#servicios`, `#nosotros`, `#proyectos`, `#contacto`).
- Último `<script>`: íconos, menú móvil, contadores animados y envío del formulario.

## 5. Abrir el proyecto en Visual Studio Code

1. Descomprime la carpeta `construelec-ingenieria`.
2. En VS Code: **Archivo → Abrir carpeta…** y selecciona `construelec-ingenieria`.
3. Acepta la sugerencia **"Instalar extensiones recomendadas"** (Tailwind CSS IntelliSense, HTML-validate y EditorConfig). Es opcional, pero ayuda.
4. Abre la terminal integrada: **Terminal → Nueva terminal** (o `` Ctrl+` ``).

## 6. Instalar las dependencias

```bash
npm install
```

Esto instala solo herramientas de desarrollo (servidor local, revisión del HTML y utilidades para las pruebas). La página en sí no depende de ningún paquete de `node_modules`.

> Si `npm audit` muestra avisos sobre `serve`, afectan solo a la herramienta de desarrollo (la dependencia `compression`), no a la página publicada. El script `dev` ya la ejecuta solo en `127.0.0.1` y con la compresión desactivada, que es la función afectada.

## 7. Ejecutar la aplicación

```bash
npm run dev
```

Abre en el navegador: **http://localhost:3000**

Para detener el servidor, presiona `Ctrl+C` en la terminal.

Alternativas desde VS Code:

- **Terminal → Ejecutar tarea… → "Iniciar servidor local (puerto 3000)"**.
- **Ejecutar y depurar (`Ctrl+Shift+D`) → "Abrir en Chrome (con servidor)"** (o Edge). Inicia el servidor y abre el navegador con el depurador conectado.

> También puedes hacer doble clic en `index.html` para abrirlo directamente en el navegador; funciona igual mientras tengas Internet.

## 8. Verificar que todo funciona

```bash
npm run check     # revisa el HTML y ejecuta las pruebas
npm run lint      # solo revisión del HTML
npm test          # solo pruebas
```

Las pruebas comprueban que:

- existen título, descripción y viewport;
- todos los enlaces internos (`#servicios`, `#contacto`, etc.) apuntan a una sección existente;
- todos los íconos usados existen en la versión de Lucide fijada;
- el JavaScript no tiene errores de sintaxis y todos los elementos que busca existen;
- los scripts externos usan versiones fijas;
- no quedan menciones de la marca anterior.

Estas pruebas no abren un navegador. Para la revisión visual, abre http://localhost:3000 y recorre la página en escritorio y en móvil (`F12` → modo dispositivo).

## 9. Variables de entorno y base de datos

No se necesitan. Si en el futuro conectas el formulario a un servicio externo, guarda las claves en un archivo `.env` (ya está excluido de Git) y nunca las escribas directamente en `index.html`, porque el código del navegador es público.

## 10. Generar una versión de producción

No hay paso de compilación: `index.html` ya es el archivo final. Para publicarlo, sube `index.html` (y cualquier imagen o recurso que añadas junto a él) a un hosting estático.

Ejemplo con Netlify, sin terminal: entra en netlify.com, crea una cuenta gratuita y arrastra una carpeta que contenga solo `index.html` a la sección de despliegue manual. También funcionan GitHub Pages, Vercel o un hosting con cPanel (carpeta `public_html`).

**Nota técnica:** Tailwind por CDN es práctico para empezar, pero su propio equipo recomienda compilar los estilos en producción para mejor rendimiento. Si la página recibirá mucho tráfico, conviene migrar a la CLI de Tailwind. Es un cambio pequeño que se puede hacer más adelante.

## 11. Problemas habituales

| Síntoma | Causa y solución |
|---|---|
| `npm: command not found` | Node.js no está instalado o la terminal no se reinició tras instalarlo. Instálalo desde nodejs.org y abre una terminal nueva. |
| En Windows aparece "la ejecución de scripts está deshabilitada" | Usa el símbolo del sistema (cmd) en la terminal de VS Code, o ejecuta una vez `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` en PowerShell. |
| `EADDRINUSE` / el puerto 3000 está ocupado | Cierra el programa que lo usa o inicia en otro puerto: `npx serve . --listen 3001`. |
| La página se ve sin estilos o sin íconos | No hay conexión a Internet o una red/bloqueador impide cargar `cdn.tailwindcss.com` o `cdn.jsdelivr.net`. Revisa la conexión. |
| `npm install` falla con errores de versión | Tu Node es anterior a 18.18. Actualiza a la versión LTS. |
| La depuración en Chrome no inicia | Verifica que Chrome esté instalado, o usa la configuración de Edge. |

## 12. Funcionalidades que requieren servicios externos

- **Formulario de cotización:** hoy solo muestra un mensaje de confirmación. Para recibir las solicitudes hay que conectarlo a un servicio como Formspree o EmailJS, o a un backend propio. El punto exacto está comentado al final de `index.html` ("Punto de integración"). Necesitarás crear una cuenta en el servicio elegido y obtener su dirección o clave.
- **Fotos de proyectos:** son marcadores con íconos. Para usar fotos reales, reemplaza el `div` con `aspect-[4/3]` de cada tarjeta por una etiqueta `<img>`.
- **Dominio y correos:** configurar `construelecingenieria.cl` (o el dominio real) depende de tu proveedor de dominio y hosting.
# construelecingenieria
