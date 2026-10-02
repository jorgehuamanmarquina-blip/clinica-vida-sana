import { doctores } from '../data/doctores.js';
import { especialidades } from '../data/especialidades.js';
import { descripcionesEspecialidad } from '../data/descripcionesEspecialidad.js';
import { el } from '../utils/dom.js';
import { conImagenDeRespaldo } from '../utils/imagenes.js';

// Filtra, busca y pinta el staff médico. Devuelve `irADoctores(key)`, la
// función que usan otros componentes (síntomas, dropdown de servicios) para
// filtrar por especialidad y llevar la vista hasta la sección de doctores.
export function initDoctoresGrid({ onAbrirPerfil }) {
  const chipsWrap = document.getElementById('chipsEspecialidad');
  const gridDoctores = document.getElementById('gridDoctores');
  const buscarDoctor = document.getElementById('buscarDoctor');
  const noResults = document.getElementById('noResults');
  const descripcionEspecialidad = document.getElementById('descripcionEspecialidad');

  let filtroActivo = 'todos';

  Object.entries(especialidades).forEach(([key, label]) => {
    const chip = el(`<button class="chip" data-filter="${key}">${label}</button>`);
    chip.addEventListener('click', () => aplicarFiltroEspecialidad(key));
    chipsWrap.appendChild(chip);
  });
  chipsWrap.querySelector('[data-filter="todos"]').addEventListener('click', () => aplicarFiltroEspecialidad('todos'));

  function aplicarFiltroEspecialidad(key) {
    filtroActivo = key;
    chipsWrap.querySelectorAll('.chip').forEach(c => c.classList.toggle('is-active', c.dataset.filter === key));
    const descripcion = descripcionesEspecialidad[key];
    descripcionEspecialidad.hidden = !descripcion;
    descripcionEspecialidad.textContent = descripcion || '';
    renderDoctores();
  }

  function renderDoctores() {
    const termino = buscarDoctor.value.trim().toLowerCase();
    gridDoctores.innerHTML = '';

    const filtrados = doctores.filter(d => {
      const coincideFiltro = filtroActivo === 'todos' || d.esp === filtroActivo;
      const coincideBusqueda = !termino || d.nombre.toLowerCase().includes(termino) || especialidades[d.esp].toLowerCase().includes(termino);
      return coincideFiltro && coincideBusqueda;
    });

    noResults.hidden = filtrados.length > 0;

    filtrados.forEach(d => {
      const card = el(`
        <div class="doc-card">
          <img src="${d.img}" alt="Foto de ${d.nombre}">
          <div class="doc-info">
            <span class="especialidad-tag">${especialidades[d.esp]}</span>
            <h3>${d.nombre}</h3>
            <p class="cmp">${d.cmp}</p>
            <span class="click-info">Ver perfil completo →</span>
          </div>
        </div>
      `);
      conImagenDeRespaldo(card.querySelector('img'));
      card.addEventListener('click', () => onAbrirPerfil(d));
      gridDoctores.appendChild(card);
    });
  }

  buscarDoctor.addEventListener('input', renderDoctores);
  renderDoctores();
  document.querySelectorAll('[data-total-doctores]').forEach(n => { n.textContent = doctores.length; });

  function irADoctores(key) {
    aplicarFiltroEspecialidad(key);
    document.getElementById('doctores').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return { irADoctores };
}
