import { testimonios } from '../data/testimonios.js';
import { el } from '../utils/dom.js';

// Sección de testimonios: refuerza confianza antes de que el visitante
// decida agendar. Es estática (sin filtros ni clics), solo pinta las tarjetas.
export function initTestimonios() {
  const grid = document.getElementById('testimoniosGrid');
  if (!grid) return;

  testimonios.forEach(t => {
    const estrellas = '★'.repeat(t.estrellas) + '☆'.repeat(5 - t.estrellas);
    const card = el(`
      <article class="testimonio-card">
        <p class="testimonio-estrellas" aria-label="${t.estrellas} de 5 estrellas">${estrellas}</p>
        <p class="testimonio-texto">“${t.texto}”</p>
        <p class="testimonio-autor">${t.nombre}<span>${t.especialidad}</span></p>
      </article>
    `);
    grid.appendChild(card);
  });
}
