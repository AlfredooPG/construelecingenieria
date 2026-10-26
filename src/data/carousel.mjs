import { readFileSync } from 'node:fs';
// Diapositivas del carrusel de portada (generadas desde src/data/carousel.json).
export const slides = JSON.parse(readFileSync(new URL('./carousel.json', import.meta.url), 'utf8'));
