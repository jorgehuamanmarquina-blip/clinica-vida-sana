// Punto de entrada: conecta los módulos entre sí. Cada componente es
// independiente (no importa a los demás componentes); las dependencias
// cruzadas —como "intentar agendar"— se resuelven aquí.
import { obtenerPerfilPaciente, perfilCompleto } from './services/perfilPaciente.js';
import { initModales } from './components/modal.js';
import { initMenuResponsive } from './components/menuResponsive.js';
import { initDropdownServicios } from './components/dropdownServicios.js';
import { initDoctoresGrid } from './components/doctoresGrid.js';
import { initSintomas } from './components/sintomas.js';
import { initFaq } from './components/faq.js';
import { initTestimonios } from './components/testimonios.js';
import { initPerfilMedico } from './components/perfilMedico.js';
import { initModalCita } from './components/modalCita.js';
import { initModalPerfilPaciente } from './components/modalPerfilPaciente.js';
import { initScrollReveal } from './components/scrollReveal.js';

document.addEventListener('DOMContentLoaded', () => {

  // --- Piezas sin dependencias cruzadas ---
  initModales();
  initMenuResponsive();
  initFaq();
  initTestimonios();

  const { abrirModalCita } = initModalCita();

  // --- Puerta de entrada para agendar: exige perfil completo primero ---
  let accionPendiente = null; // { especialidadKey, preferencia, medico }

  const { abrirModalPerfilPaciente } = initModalPerfilPaciente({
    onGuardado() {
      if (accionPendiente) {
        const a = accionPendiente; accionPendiente = null;
        abrirModalCita(a.especialidadKey, a.preferencia, a.medico);
      }
    }
  });

  function intentarAgendar(especialidadKey, preferencia, medico) {
    const perfil = obtenerPerfilPaciente();
    if (!perfilCompleto(perfil)) {
      accionPendiente = { especialidadKey, preferencia, medico };
      abrirModalPerfilPaciente();
      return;
    }
    abrirModalCita(especialidadKey, preferencia, medico);
  }

  document.querySelectorAll('[data-open-modal]').forEach(btn => {
    btn.addEventListener('click', () => intentarAgendar(null));
  });

  // --- Staff médico (grid + perfil) ---
  const { abrirPerfil } = initPerfilMedico({ onAgendar: intentarAgendar });
  const { irADoctores } = initDoctoresGrid({ onAbrirPerfil: abrirPerfil });

  // --- Síntomas y menú de servicios reutilizan intentarAgendar / irADoctores ---
  initSintomas({ onAgendar: intentarAgendar, irADoctores });
  initDropdownServicios({ onIrAEspecialidad: irADoctores });

  initScrollReveal();
});
