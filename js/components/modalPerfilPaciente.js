import { RE_NOMBRE_APELLIDO, capitalizarNombre, telefonoValido, limitarTelefono } from '../utils/texto.js';
import { limpiarErroresForm, marcarError } from '../utils/formulario.js';
import { obtenerPerfilPaciente, guardarPerfilPaciente } from '../services/perfilPaciente.js';
import { abrirModal, cerrarModal } from './modal.js';

// Modal "cuéntanos quién eres": se pide una sola vez antes de agendar.
// `onGuardado()` la llama citaFlow para retomar la acción pendiente.
export function initModalPerfilPaciente({ onGuardado }) {
  const modalPerfilPaciente = document.getElementById('modalPerfilPaciente');
  const formPerfilPaciente = document.getElementById('formPerfilPaciente');
  const ppNombre = document.getElementById('perfilPNombre');
  const ppTelefono = document.getElementById('perfilPTelefono');

  ppNombre.addEventListener('blur', () => { ppNombre.value = capitalizarNombre(ppNombre.value); });
  limitarTelefono(ppTelefono);

  function abrirModalPerfilPaciente() {
    const actual = obtenerPerfilPaciente();
    limpiarErroresForm(formPerfilPaciente);
    ppNombre.value = (actual && actual.nombre) || '';
    ppTelefono.value = (actual && actual.telefono) || '';
    abrirModal(modalPerfilPaciente);
  }

  formPerfilPaciente.addEventListener('submit', (e) => {
    e.preventDefault();
    limpiarErroresForm(formPerfilPaciente);
    ppNombre.value = capitalizarNombre(ppNombre.value.trim());
    let valido = true;

    if (!RE_NOMBRE_APELLIDO.test(ppNombre.value.trim())) {
      marcarError(formPerfilPaciente, ppNombre, 'Escribe tu nombre y apellido (dos palabras, mínimo).');
      valido = false;
    }
    if (!telefonoValido(ppTelefono.value)) {
      marcarError(formPerfilPaciente, ppTelefono, 'Ingresa un teléfono válido de 9 dígitos.');
      valido = false;
    }
    if (!valido) return;

    guardarPerfilPaciente({ nombre: ppNombre.value.trim(), telefono: ppTelefono.value.trim() });
    cerrarModal(modalPerfilPaciente);
    onGuardado();
  });

  document.getElementById('btnMiPerfil').addEventListener('click', () => abrirModalPerfilPaciente());

  // El modal de cita pide "editar mis datos" sin conocer este módulo directamente.
  document.addEventListener('vidasana:editar-perfil-desde-cita', () => abrirModalPerfilPaciente());

  return { abrirModalPerfilPaciente };
}
