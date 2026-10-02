/* ---------------------------------------------------------------
   MÉDICOS · Aquí editas todo: foto (img), datos, formación y horarios.
   Para cambiar una foto, modifica solo la línea  img:"..."  de ese médico.
   horarios: dia 1=Lunes, 2=Martes ... 6=Sábado (referencial; la hora exacta
   se elige aparte al momento de agendar).
--------------------------------------------------------------- */
export const doctores = [
  {
    nombre: "Dr. Carlos Pérez", esp: "cardiologia", cmp: "CMP 45210", exp: 15,
    img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=500&q=80",
    bio: "Especialista en cardiología clínica y hemodinamia con más de 15 años de experiencia internacional. Se enfoca en la prevención cardiovascular, el control de arritmias y el seguimiento de pacientes con hipertensión y colesterol elevado, con una atención clara y cercana.",
    idiomas: ["Español", "Inglés"],
    formacion: [["Médico Cirujano", "Título profesional · 2004"], ["Especialidad en Cardiología", "Residencia médica · 2010"], ["Fellowship en Hemodinamia", "Formación internacional · 2012"]],
    horarios: [{ dia: 1, turnos: ["Mañana", "Tarde"] }, { dia: 3, turnos: ["Mañana"] }, { dia: 5, turnos: ["Tarde"] }],
    email: "carlos.perez@vidasana.pe", tel: "(01) 555-0134 anexo 201"
  },
  {
    nombre: "Dra. María Gómez", esp: "pediatria", cmp: "CMP 38904", exp: 12,
    img: "imagenes/dr.martinez.jpg",
    bio: "Médico cirujano especialista en pediatría integral y cuidados neonatales. Acompaña el crecimiento de niños y adolescentes con controles de desarrollo, vacunación y atención de enfermedades frecuentes, orientando siempre a las familias con paciencia.",
    idiomas: ["Español"],
    formacion: [["Médico Cirujano", "Título profesional · 2007"], ["Especialidad en Pediatría", "Residencia médica · 2013"], ["Diplomado en Neonatología", "Cuidados del recién nacido · 2015"]],
    horarios: [{ dia: 1, turnos: ["Mañana"] }, { dia: 2, turnos: ["Mañana", "Tarde"] }, { dia: 4, turnos: ["Tarde"] }, { dia: 6, turnos: ["Mañana"] }],
    email: "maria.gomez@vidasana.pe", tel: "(01) 555-0134 anexo 202"
  },
  {
    nombre: "Dr. Jorge Silva", esp: "neurologia", cmp: "CMP 41287", exp: 14,
    img: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=500&q=80",
    bio: "Neurólogo experto en trastornos del sistema nervioso central y periférico. Atiende migrañas, epilepsia, mareos y alteraciones del sueño, combinando evaluación clínica detallada con estudios de apoyo para llegar a un diagnóstico preciso.",
    idiomas: ["Español", "Inglés"],
    formacion: [["Médico Cirujano", "Título profesional · 2005"], ["Especialidad en Neurología", "Residencia médica · 2011"], ["Subespecialidad en Cefaleas", "Formación clínica · 2014"]],
    horarios: [{ dia: 2, turnos: ["Tarde"] }, { dia: 3, turnos: ["Mañana", "Tarde"] }, { dia: 5, turnos: ["Mañana"] }],
    email: "jorge.silva@vidasana.pe", tel: "(01) 555-0134 anexo 203"
  },
  {
    nombre: "Dra. Ana Torres", esp: "dermatologia", cmp: "CMP 39562", exp: 10,
    img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=500&q=80",
    bio: "Especialista en dermatología médica, quirúrgica y láser. Trata acné, alergias de la piel, manchas y control de lunares, y realiza procedimientos estéticos con un enfoque natural y seguro para cada tipo de piel.",
    idiomas: ["Español", "Inglés"],
    formacion: [["Médico Cirujano", "Título profesional · 2009"], ["Especialidad en Dermatología", "Residencia médica · 2014"], ["Certificación en Láser Dermatológico", "Formación técnica · 2017"]],
    horarios: [{ dia: 1, turnos: ["Tarde"] }, { dia: 2, turnos: ["Mañana"] }, { dia: 4, turnos: ["Mañana", "Tarde"] }],
    email: "ana.torres@vidasana.pe", tel: "(01) 555-0134 anexo 204"
  },
  {
    nombre: "Dr. Luis Mendoza", esp: "traumatologia", cmp: "CMP 40118", exp: 13,
    img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=500&q=80",
    bio: "Cirujano traumatólogo ortopedista especializado en medicina deportiva. Atiende lesiones de rodilla, hombro y columna, fracturas y dolor articular crónico, priorizando siempre que sea posible el tratamiento conservador y una recuperación funcional rápida.",
    idiomas: ["Español"],
    formacion: [["Médico Cirujano", "Título profesional · 2006"], ["Especialidad en Traumatología y Ortopedia", "Residencia médica · 2012"], ["Curso en Cirugía Artroscópica", "Medicina deportiva · 2015"]],
    horarios: [{ dia: 1, turnos: ["Mañana"] }, { dia: 3, turnos: ["Tarde"] }, { dia: 5, turnos: ["Mañana", "Tarde"] }, { dia: 6, turnos: ["Mañana"] }],
    email: "luis.mendoza@vidasana.pe", tel: "(01) 555-0134 anexo 205"
  },
  {
    nombre: "Dra. Sofía Rojas", esp: "ginecologia", cmp: "CMP 42733", exp: 11,
    img: "imagenes/dr.carranza.jpg",
    bio: "Especialista en salud integral de la mujer y control obstétrico. Acompaña a sus pacientes en cada etapa: controles preventivos, planificación familiar, embarazo y menopausia, en un ambiente de confianza y respeto.",
    idiomas: ["Español", "Inglés"],
    formacion: [["Médico Cirujano", "Título profesional · 2008"], ["Especialidad en Ginecología y Obstetricia", "Residencia médica · 2014"], ["Diplomado en Ecografía Obstétrica", "Formación clínica · 2016"]],
    horarios: [{ dia: 2, turnos: ["Mañana", "Tarde"] }, { dia: 4, turnos: ["Mañana"] }, { dia: 6, turnos: ["Mañana"] }],
    email: "sofia.rojas@vidasana.pe", tel: "(01) 555-0134 anexo 206"
  },
  {
    nombre: "Dra. María Nuñez", esp: "oftalmologia", cmp: "CMP 121495", exp: 6,
    img: "imagenes/dr.lala.jpg",
    bio: "Oftalmóloga cirujana especializada en segmento anterior y cirugía láser. Realiza evaluaciones completas de la vista, control de glaucoma y cataratas, y corrección refractiva con tecnología de última generación.",
    idiomas: ["Español"],
    formacion: [["Médico Cirujano", "Título profesional · 2012"], ["Especialidad en Oftalmología", "Residencia médica · 2019"], ["Curso en Cirugía Refractiva", "Formación clínica · 2021"]],
    horarios: [{ dia: 1, turnos: ["Tarde"] }, { dia: 3, turnos: ["Mañana"] }, { dia: 5, turnos: ["Mañana", "Tarde"] }],
    email: "maria.nunez@vidasana.pe", tel: "(01) 555-0134 anexo 207"
  }
];
