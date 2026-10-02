// Tarjetas de "¿Qué te pasa?": cada síntoma apunta a la especialidad (esp)
// que debe filtrarse/agendarse cuando el paciente lo elige.
export const sintomas = [
  { titulo: "Siento latidos irregulares", esp: "cardiologia", desc: "Arritmias y palpitaciones. Sensación de latidos rápidos o pausas inusuales en el ritmo cardíaco.",
    icon: '<svg width="30" height="30" fill="none" stroke="currentColor" stroke-width="1.7" viewBox="0 0 24 24"><path d="M20.8 8.6c0-2.6-2.1-4.6-4.6-4.6-1.7 0-3.2.9-4.2 2.3-1-1.4-2.5-2.3-4.2-2.3-2.6 0-4.6 2.1-4.6 4.6 0 5.1 8.8 10.8 8.8 10.8s8.8-5.7 8.8-10.8z"/><path d="M4 12h3l1.5-3 2 5 1.5-3h4"/></svg>' },
  { titulo: "Me falta el aire al caminar", esp: "cardiologia", desc: "Fatiga, dificultad para respirar al acostarse e hinchazón en pies o extremidades inferiores.",
    icon: '<svg width="30" height="30" fill="none" stroke="currentColor" stroke-width="1.7" viewBox="0 0 24 24"><path d="M4 15c-1.7 0-3-1.3-3-3s1.3-3 3-3c.3-2.8 2.6-5 5.5-5 2.5 0 4.6 1.6 5.3 3.9.3-.1.6-.1.9-.1 2.4 0 4.3 1.9 4.3 4.3S18.1 15 15.7 15H4z"/></svg>' },
  { titulo: "Dolor persistente de cabeza", esp: "neurologia", desc: "Evaluación neurológica avanzada para descartar migrañas crónicas o tensiones severas.",
    icon: '<svg width="30" height="30" fill="none" stroke="currentColor" stroke-width="1.7" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>' },
  { titulo: "Manchas o problemas en la piel", esp: "dermatologia", desc: "Dermatología clínica y estética para cuidado de lunares, acné severo y alergias cutáneas.",
    icon: '<svg width="30" height="30" fill="none" stroke="currentColor" stroke-width="1.7" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><circle cx="9" cy="10" r="1.3" fill="currentColor" stroke="none"/><circle cx="14" cy="14" r="1.6" fill="currentColor" stroke="none"/></svg>' },
  { titulo: "Dolor articular o muscular", esp: "traumatologia", desc: "Lesiones deportivas, dolor de espalda o articulaciones evaluadas por traumatología especializada.",
    icon: '<svg width="30" height="30" fill="none" stroke="currentColor" stroke-width="1.7" viewBox="0 0 24 24"><path d="M7 15 15 7"/><circle cx="6" cy="16" r="2.5"/><circle cx="16" cy="6" r="2.5"/></svg>' },
  { titulo: "Control y desarrollo infantil", esp: "pediatria", desc: "Pediatría enfocada en inmunizaciones, nutrición y crecimiento saludable para tus hijos.",
    icon: '<svg width="30" height="30" fill="none" stroke="currentColor" stroke-width="1.7" viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.5"/><path d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6"/></svg>' }
];
