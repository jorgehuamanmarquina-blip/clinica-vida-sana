import { sintomas } from '../data/sintomas.js';
import { especialidades } from '../data/especialidades.js';
import { el } from '../utils/dom.js';

// Tarjetas seleccionables de "¿Qué te pasa?". `onAgendar` e `irADoctores`
// llegan desde main.js para no acoplar este componente a citaFlow ni al grid.
export function initSintomas({ onAgendar, irADoctores }) {
  const sintomasGrid = document.getElementById('sintomasGrid');
  const sintomaResumen = document.getElementById('sintomaResumen');
  let sintomaSeleccionado = null;

  sintomas.forEach((s, idx) => {
    const card = el(`
      <div class="sintoma-card" tabindex="0" role="button" aria-pressed="false">
        <span class="sintoma-check">✓</span>
        <div class="sintoma-icon">${s.icon}</div>
        <h3>${s.titulo}</h3>
        <p>${s.desc}</p>
        <span class="sintoma-especialidad">${especialidades[s.esp]}</span>
        <div class="sintoma-actions">
          <button class="btn-auna" type="button">Agendar cita</button>
          <button class="ver-mas" type="button">Ver especialistas &gt;</button>
        </div>
      </div>
    `);

    function seleccionar() {
      const yaActivo = sintomaSeleccionado === idx;
      sintomasGrid.querySelectorAll('.sintoma-card').forEach(c => { c.classList.remove('is-selected'); c.setAttribute('aria-pressed', 'false'); });
      if (yaActivo) {
        sintomaSeleccionado = null;
        sintomaResumen.hidden = true;
      } else {
        sintomaSeleccionado = idx;
        card.classList.add('is-selected');
        card.setAttribute('aria-pressed', 'true');
        sintomaResumen.hidden = false;
        sintomaResumen.textContent = `Para "${s.titulo}" el especialista indicado es ${especialidades[s.esp]}. Puedes agendar directo o revisar a los especialistas disponibles.`;
      }
    }

    card.addEventListener('click', (e) => {
      if (e.target.closest('button')) return;
      seleccionar();
    });
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); seleccionar(); }
    });

    card.querySelector('.btn-auna').addEventListener('click', () => {
      seleccionar();
      onAgendar(s.esp);
    });
    card.querySelector('.ver-mas').addEventListener('click', () => {
      seleccionar();
      irADoctores(s.esp);
    });

    sintomasGrid.appendChild(card);
  });
}
