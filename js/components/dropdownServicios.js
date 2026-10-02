import { infoSubmenu } from '../data/servicios.js';
import { urlWhatsapp, mensajeEmergencia } from '../services/whatsapp.js';

// El panel "Servicios" se abre con el puntero (hover, ver estilo.css) y
// también por clic/teclado como respaldo para pantallas táctiles.
export function initDropdownServicios({ onIrAEspecialidad }) {
  const serviciosMenu = document.getElementById('serviciosMenu');
  const serviciosBtn = document.getElementById('serviciosBtn');
  const panelImg = document.getElementById('panelImg');
  const panelTitulo = document.getElementById('panelTitulo');
  const panelDesc = document.getElementById('panelDesc');
  const panelIrBtn = document.getElementById('panelIrBtn');

  let servicioActivo = 'salud';

  function actualizarPanel(key) {
    const info = infoSubmenu[key];
    if (!info) return;
    servicioActivo = key;
    panelTitulo.textContent = info.titulo;
    panelDesc.textContent = info.desc;
    panelImg.src = info.img;
    document.querySelectorAll('.sub-item').forEach(b => b.classList.toggle('is-active', b.dataset.key === key));
  }

  function irAServicio(key) {
    const info = infoSubmenu[key];
    cerrarMenuServicios();
    if (key === 'emergencias') {
      window.open(urlWhatsapp(mensajeEmergencia()), '_blank');
      return;
    }
    onIrAEspecialidad(info.especialidad || 'todos');
  }

  // Al pasar el mouse o enfocar con teclado, solo se actualiza la vista previa
  // (imagen + descripción a la derecha). Al hacer clic, se navega directo a
  // los especialistas de ese servicio: un clic en "Cardiología" ya lleva a
  // los cardiólogos disponibles, sin necesidad de un segundo clic en
  // "Ver especialistas".
  document.querySelectorAll('.sub-item').forEach(btn => {
    btn.addEventListener('mouseenter', () => actualizarPanel(btn.dataset.key));
    btn.addEventListener('focus', () => actualizarPanel(btn.dataset.key));
    btn.addEventListener('click', () => irAServicio(btn.dataset.key));
  });

  function cerrarMenuServicios() {
    serviciosMenu.classList.remove('is-open');
    serviciosBtn.setAttribute('aria-expanded', 'false');
  }

  panelIrBtn.addEventListener('click', () => irAServicio(servicioActivo));

  serviciosBtn.addEventListener('click', () => {
    const abierto = serviciosMenu.classList.toggle('is-open');
    serviciosBtn.setAttribute('aria-expanded', abierto);
  });
  document.addEventListener('click', (e) => {
    if (!serviciosMenu.contains(e.target)) cerrarMenuServicios();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') cerrarMenuServicios();
  });
}
