// Exige nombre y apellido (mínimo dos palabras de 2+ letras cada una).
export const RE_NOMBRE_APELLIDO = /^[A-Za-zÀ-ÖØ-öø-ÿ'’-]{2,}(\s+[A-Za-zÀ-ÖØ-öø-ÿ'’-]{2,})+$/;

// Pone en mayúscula la primera letra de cada palabra: "juan perez" → "Juan Perez".
export function capitalizarNombre(str) {
  return str.toLowerCase().split(/\s+/).filter(Boolean)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

// Limita un <input> de teléfono a solo dígitos, máximo 9, en tiempo real.
export function limitarTelefono(input) {
  input.addEventListener('input', () => {
    input.value = input.value.replace(/\D/g, '').slice(0, 9);
  });
}

export function telefonoValido(valor) {
  return /^[0-9]{9}$/.test((valor || '').trim());
}
