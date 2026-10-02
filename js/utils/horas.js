// Rango legible de cada turno. Debe coincidir siempre con las horas que
// ofrece el select de la cita (poblarHoras, en components/modalCita.js):
// Mañana 8:00–13:00, Tarde 13:00–20:00, sin huecos entre ambos turnos.
export const horasTurno = { 'Mañana': '8:00 – 13:00', 'Tarde': '13:00 – 20:00' };

// Hora por defecto que se preselecciona al elegir un turno desde el perfil
// del médico (cae dentro del rango de horasTurno de ese turno).
export const horaBaseTurno = { 'Mañana': '09:00', 'Tarde': '16:00' };

// "14:00" → "2 pm" · "19:30" → "7:30 pm" (estilo casual, sin puntos).
export function horaATexto12(hhmm) {
  const [h, m] = hhmm.split(':').map(Number);
  const ampm = h < 12 ? 'am' : 'pm';
  let h12 = h % 12; if (h12 === 0) h12 = 12;
  return m === 0 ? `${h12} ${ampm}` : `${h12}:${String(m).padStart(2, '0')} ${ampm}`;
}
