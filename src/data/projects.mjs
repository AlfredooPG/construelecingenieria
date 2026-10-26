// Galería REFERENCIAL: reemplazar por obras reales y fotografías propias antes de publicar.
export const categories = [
  { key: 'arquitectura', label: 'Arquitectura y diseño', colors: ['#1e3a8a', '#0f172a'] },
  { key: 'obras', label: 'Obras civiles', colors: ['#334155', '#0f172a'] },
  { key: 'remodelaciones', label: 'Remodelaciones', colors: ['#0369a1', '#0c4a6e'] },
  { key: 'instalaciones', label: 'Instalaciones', colors: ['#b45309', '#78350f'] },
];

export const projects = [
  { slug: 'ampliacion-vivienda', cat: 'obras', icon: 'house', title: 'Ampliación de vivienda', desc: 'Ampliación en segundo nivel: estructura, albañilería, terminaciones y tramitación del permiso de edificación.' },
  { slug: 'proyecto-arquitectura-residencial', cat: 'arquitectura', icon: 'drafting-compass', title: 'Proyecto de arquitectura residencial', desc: 'Anteproyecto, planos, especificaciones técnicas y renders 3D para una vivienda unifamiliar.' },
  { slug: 'remodelacion-bano', cat: 'remodelaciones', icon: 'droplets', title: 'Remodelación integral de baño', desc: 'Retiro de artefactos, impermeabilización, porcelanato, vanitorio, mampara y accesorios.' },
  { slug: 'cocina-a-medida', cat: 'remodelaciones', icon: 'hammer', title: 'Cocina con mueblería a medida', desc: 'Renovación de revestimientos, habilitación para electrodomésticos y muebles fabricados a medida.' },
  { slug: 'quincho-terraza', cat: 'obras', icon: 'flame', title: 'Quincho y terraza', desc: 'Obra exterior con radier, estructura de techumbre, área de parrilla y pavimentación de acceso.' },
  { slug: 'renovacion-electrica', cat: 'instalaciones', icon: 'zap', title: 'Renovación eléctrica y tablero', desc: 'Recableado, nuevo tablero con protecciones, puesta a tierra y declaración TE1 por instalador autorizado.' },
  { slug: 'cierre-perimetral-portones', cat: 'obras', icon: 'layers', title: 'Cierre perimetral y portón', desc: 'Fabricación e instalación de reja, portón metálico y obras de acondicionamiento del acceso.' },
  { slug: 'regularizacion-dom', cat: 'arquitectura', icon: 'file-text', title: 'Regularización ante la DOM', desc: 'Levantamiento del estado actual, planos y expediente para regularizar una edificación existente.' },
];
