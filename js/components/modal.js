// Control genérico de apertura/cierre para cualquier .modal del sitio.
// Se inicializa una vez; cada modal individual solo llama abrirModal/cerrarModal.

let alCerrarCalendario = null;

// Permite que el módulo del calendario registre una función a ejecutar
// cuando se cierra el modal de la cita (para no dejar el popover abierto).
export function alCerrarModalCita(fn) {
  alCerrarCalendario = fn;
}

export function abrirModal(modal) {
  modal.classList.add('is-visible');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  const focusable = modal.querySelector('input, button, select');
  if (focusable) focusable.focus();
}

export function cerrarModal(modal) {
  modal.classList.remove('is-visible');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  if (modal.id === 'modalCita' && alCerrarCalendario) alCerrarCalendario();
}

export function initModales() {
  document.querySelectorAll('[data-close-modal]').forEach(btn => {
    btn.addEventListener('click', () => cerrarModal(btn.closest('.modal')));
  });
  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => { if (e.target === modal) cerrarModal(modal); });
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal.is-visible').forEach(cerrarModal);
    }
  });
}
