// Helpers compartidos para mostrar/limpiar errores de validación en
// formularios (modal de perfil y modal de cita usan el mismo patrón).
export function limpiarErroresForm(form) {
  form.querySelectorAll('.field-error').forEach(e => e.textContent = '');
  form.querySelectorAll('[aria-invalid]').forEach(e => e.removeAttribute('aria-invalid'));
}

export function marcarError(form, campo, mensaje) {
  campo.setAttribute('aria-invalid', 'true');
  const err = form.querySelector(`[data-error-for="${campo.id}"]`);
  if (err) err.textContent = mensaje;
}
