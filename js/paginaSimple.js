// Punto de entrada liviano para páginas informativas (Nosotros, Contacto)
// que no usan el flujo de citas/calendario: solo necesitan el menú móvil y
// la animación de aparición al hacer scroll.
import { initMenuResponsive } from './components/menuResponsive.js';
import { initScrollReveal } from './components/scrollReveal.js';

document.addEventListener('DOMContentLoaded', () => {
  initMenuResponsive();
  initScrollReveal();
});
