import { doctores } from '../data/doctores.js';
import { especialidades } from '../data/especialidades.js';
import { el } from '../utils/dom.js';
import { RE_NOMBRE_APELLIDO, capitalizarNombre, telefonoValido, limitarTelefono } from '../utils/texto.js';
import { fechaLegible, proximaFecha } from '../utils/fechas.js';
import { horaATexto12, horaBaseTurno } from '../utils/horas.js';
import { limpiarErroresForm, marcarError } from '../utils/formulario.js';
import { guardarPerfilPaciente, obtenerPerfilPaciente } from '../services/perfilPaciente.js';
import { urlWhatsapp, mensajeCita } from '../services/whatsapp.js';
import { abrirModal, cerrarModal, alCerrarModalCita } from './modal.js';
import { initCalendario } from './calendario.js';

// Modal de reserva de cita: arma el mensaje y abre WhatsApp al enviar.
export function initModalCita() {
  const modalCita = document.getElementById('modalCita');
  const selectEspecialidad = document.getElementById('especialidadCita');
  const medicoCita = document.getElementById('medicoCita');
  const horaCita = document.getElementById('horaCita');
  const formCita = document.getElementById('formCita');
  const citaFormWrap = document.getElementById('citaFormWrap');
  const citaConfirmacion = document.getElementById('citaConfirmacion');
  const btnEnviarWhatsapp = document.getElementById('btnEnviarWhatsapp');
  const nombreCita = document.getElementById('nombreCita');
  const telefonoCita = document.getElementById('telefonoCita');

  const calendario = initCalendario();
  alCerrarModalCita(() => calendario.cerrarCalendario());

  nombreCita.addEventListener('blur', () => { nombreCita.value = capitalizarNombre(nombreCita.value); });
  limitarTelefono(telefonoCita);

  // Especialidades del <select>
  Object.entries(especialidades).forEach(([key, label]) => {
    selectEspecialidad.appendChild(el(`<option value="${key}">${label}</option>`));
  });
  selectEspecialidad.addEventListener('change', () => poblarMedicos(selectEspecialidad.value));

  function poblarMedicos(especialidadKey, medicoAPreseleccionar) {
    medicoCita.innerHTML = '';
    medicoCita.appendChild(el(`<option value="">Sin preferencia (cualquiera disponible)</option>`));
    doctores.filter(d => d.esp === especialidadKey).forEach(d => {
      medicoCita.appendChild(el(`<option value="${d.nombre}">${d.nombre}</option>`));
    });
    if (medicoAPreseleccionar) medicoCita.value = medicoAPreseleccionar;
  }

  // Horas del <select>, cada 30 min de 8:00 a 19:00 (la clínica cierra a las 20:00).
  (function poblarHoras() {
    for (let h = 8; h <= 19; h++) {
      for (const m of [0, 30]) {
        if (h === 19 && m === 30) continue;
        const hhmm = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
        horaCita.appendChild(el(`<option value="${hhmm}">${horaATexto12(hhmm)}</option>`));
      }
    }
  })();

  function abrirModalCita(especialidadKey, preferencia, medico) {
    citaFormWrap.hidden = false;
    citaConfirmacion.hidden = true;
    formCita.reset();
    calendario.limpiar();
    limpiarErroresForm(formCita);

    const perfil = obtenerPerfilPaciente();
    if (perfil) {
      nombreCita.value = perfil.nombre || '';
      telefonoCita.value = perfil.telefono || '';
    }

    const espFinal = (especialidadKey && especialidades[especialidadKey]) ? especialidadKey : Object.keys(especialidades)[0];
    selectEspecialidad.value = espFinal;
    poblarMedicos(espFinal, medico);

    if (preferencia) {
      calendario.establecerFecha(proximaFecha(preferencia.dia));
      horaCita.value = horaBaseTurno[preferencia.turno] || horaCita.value;
    }
    abrirModal(modalCita);
  }

  formCita.addEventListener('submit', (e) => {
    e.preventDefault();
    limpiarErroresForm(formCita);
    nombreCita.value = capitalizarNombre(nombreCita.value.trim());
    let valido = true;

    if (!RE_NOMBRE_APELLIDO.test(nombreCita.value.trim())) {
      marcarError(formCita, nombreCita, 'Escribe tu nombre y apellido (dos palabras, mínimo).');
      valido = false;
    }
    if (!telefonoValido(telefonoCita.value)) {
      marcarError(formCita, telefonoCita, 'Ingresa un teléfono válido de 9 dígitos.');
      valido = false;
    }
    if (!calendario.fechaCitaInput.value) {
      marcarError(formCita, calendario.fechaCitaInput, 'Elige una fecha para tu cita.');
      valido = false;
    }
    if (!horaCita.value) {
      marcarError(formCita, horaCita, 'Elige una hora.');
      valido = false;
    }
    if (!valido) return;

    guardarPerfilPaciente({ nombre: nombreCita.value.trim(), telefono: telefonoCita.value.trim() });

    const especialidadTexto = especialidades[selectEspecialidad.value];
    const medicoTexto = medicoCita.value || null;
    const fechaTxt = fechaLegible(calendario.fechaCitaInput.value);
    const horaTxt = horaATexto12(horaCita.value);

    document.getElementById('confirmacionTexto').textContent =
      `Tu solicitud para el ${fechaTxt} a las ${horaTxt} está lista. Solo falta enviarla por WhatsApp para que la clínica la confirme.`;

    const msg = mensajeCita({
      fechaTxt, especialidadTexto, medicoTexto, horaTxt,
      nombre: nombreCita.value.trim(), telefono: telefonoCita.value.trim()
    });
    const urlWa = urlWhatsapp(msg);
    btnEnviarWhatsapp.href = urlWa;

    citaFormWrap.hidden = true;
    citaConfirmacion.hidden = false;

    window.open(urlWa, '_blank'); // intento de redirección automática
  });

  document.getElementById('btnEditarPerfilDesdeCita').addEventListener('click', () => {
    cerrarModal(modalCita);
    // La apertura del modal de perfil la resuelve citaFlow (evita import circular).
    document.dispatchEvent(new CustomEvent('vidasana:editar-perfil-desde-cita'));
  });

  return { abrirModalCita };
}
