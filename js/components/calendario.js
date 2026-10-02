import { el } from '../utils/dom.js';
import { MESES, aISO, fechaLegibleCorta } from '../utils/fechas.js';

// Calendario propio (sin <input type="date">) para el formulario de cita.
// Deshabilita fechas pasadas y domingos, resalta hoy y el día elegido.
export function initCalendario() {
  const fechaCita = document.getElementById('fechaCita');
  const fechaCitaTrigger = document.getElementById('fechaCitaTrigger');
  const fechaCitaTexto = document.getElementById('fechaCitaTexto');
  const calendarioPopover = document.getElementById('calendarioPopover');
  const calendarioMesLbl = document.getElementById('calendarioMes');
  const calendarioGrid = document.getElementById('calendarioGrid');
  const calMesPrev = document.getElementById('calMesPrev');
  const calMesNext = document.getElementById('calMesNext');

  const hoyDate = new Date(); hoyDate.setHours(0, 0, 0, 0);
  let calMesVisible = hoyDate.getMonth();
  let calAnioVisible = hoyDate.getFullYear();

  function establecerFecha(iso) {
    fechaCita.value = iso;
    fechaCitaTexto.textContent = fechaLegibleCorta(iso);
    const [y, m] = iso.split('-').map(Number);
    calAnioVisible = y; calMesVisible = m - 1;
  }

  function renderCalendario() {
    calendarioMesLbl.textContent = `${MESES[calMesVisible]} ${calAnioVisible}`;
    calendarioGrid.innerHTML = '';

    const primerDiaSemana = new Date(calAnioVisible, calMesVisible, 1).getDay();
    const diasEnMes = new Date(calAnioVisible, calMesVisible + 1, 0).getDate();

    for (let i = 0; i < primerDiaSemana; i++) {
      calendarioGrid.appendChild(el(`<span class="dia-vacia"></span>`));
    }

    for (let dia = 1; dia <= diasEnMes; dia++) {
      const fechaDia = new Date(calAnioVisible, calMesVisible, dia);
      const iso = aISO(fechaDia);
      const esPasado = fechaDia < hoyDate;
      const esDomingo = fechaDia.getDay() === 0;
      const btn = el(`<button type="button" class="dia-celda">${dia}</button>`);
      if (fechaDia.getTime() === hoyDate.getTime()) btn.classList.add('es-hoy');
      if (fechaCita.value === iso) btn.classList.add('es-seleccionado');
      if (esPasado || esDomingo) {
        btn.disabled = true;
      } else {
        btn.addEventListener('click', () => {
          establecerFecha(iso);
          cerrarCalendario();
          const err = document.querySelector('[data-error-for="fechaCita"]');
          if (err) err.textContent = '';
          fechaCita.setAttribute('aria-invalid', 'false');
        });
      }
      calendarioGrid.appendChild(btn);
    }

    const esMesActual = calAnioVisible === hoyDate.getFullYear() && calMesVisible === hoyDate.getMonth();
    calMesPrev.disabled = esMesActual;
  }

  function abrirCalendario() {
    renderCalendario();
    calendarioPopover.hidden = false;
    fechaCitaTrigger.setAttribute('aria-expanded', 'true');
  }
  function cerrarCalendario() {
    calendarioPopover.hidden = true;
    fechaCitaTrigger.setAttribute('aria-expanded', 'false');
  }

  fechaCitaTrigger.addEventListener('click', () => {
    calendarioPopover.hidden ? abrirCalendario() : cerrarCalendario();
  });
  calMesPrev.addEventListener('click', () => {
    calMesVisible--; if (calMesVisible < 0) { calMesVisible = 11; calAnioVisible--; }
    renderCalendario();
  });
  calMesNext.addEventListener('click', () => {
    calMesVisible++; if (calMesVisible > 11) { calMesVisible = 0; calAnioVisible++; }
    renderCalendario();
  });
  document.addEventListener('click', (e) => {
    if (!calendarioPopover.hidden && !e.target.closest('.calendario-wrap')) cerrarCalendario();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !calendarioPopover.hidden) cerrarCalendario();
  });

  function limpiar() {
    fechaCita.value = '';
    fechaCitaTexto.textContent = 'Elegir fecha';
    cerrarCalendario();
  }

  return { establecerFecha, cerrarCalendario, limpiar, fechaCitaInput: fechaCita };
}
