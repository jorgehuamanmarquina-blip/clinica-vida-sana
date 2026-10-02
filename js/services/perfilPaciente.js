import { RE_NOMBRE_APELLIDO, telefonoValido } from '../utils/texto.js';

const CLAVE_PERFIL = 'vidasana_perfil_paciente';

export function obtenerPerfilPaciente() {
  try { return JSON.parse(localStorage.getItem(CLAVE_PERFIL)) || null; }
  catch (e) { return null; }
}

export function guardarPerfilPaciente(perfil) {
  try { localStorage.setItem(CLAVE_PERFIL, JSON.stringify(perfil)); }
  catch (e) { /* almacenamiento no disponible (modo privado, etc.) */ }
}

export function perfilCompleto(perfil) {
  return !!perfil
    && RE_NOMBRE_APELLIDO.test((perfil.nombre || '').trim())
    && telefonoValido(perfil.telefono);
}
