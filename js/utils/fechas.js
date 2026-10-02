export const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
export const DIAS_SEMANA_CORTO = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'];
export const NOMBRES_DIA = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

// Convierte un objeto Date a "AAAA-MM-DD" en hora local (evita el desfase
// de un día que da toISOString() al usar UTC).
export function aISO(fecha) {
  return `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, '0')}-${String(fecha.getDate()).padStart(2, '0')}`;
}

export function fechaLegible(iso) {
  const [, m, dd] = iso.split('-').map(Number);
  return `${dd} de ${MESES[m - 1]}`;
}

export function fechaLegibleCorta(iso) {
  const [y, m, dd] = iso.split('-').map(Number);
  const f = new Date(y, m - 1, dd);
  return `${DIAS_SEMANA_CORTO[f.getDay()]}. ${dd} de ${MESES[m - 1]}`;
}

// Próxima fecha (a partir de mañana) que cae en el día de semana indicado
// (0=domingo … 6=sábado). Se usa para sugerir fecha desde un horario semanal.
export function proximaFecha(diaSemana) {
  const f = new Date();
  do { f.setDate(f.getDate() + 1); } while (f.getDay() !== diaSemana);
  return aISO(f);
}
