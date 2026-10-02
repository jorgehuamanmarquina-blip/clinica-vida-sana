import { especialidades } from '../data/especialidades.js';
import { el } from '../utils/dom.js';
import { conImagenDeRespaldo } from '../utils/imagenes.js';
import { NOMBRES_DIA } from '../utils/fechas.js';
import { horasTurno } from '../utils/horas.js';
import { abrirModal, cerrarModal } from './modal.js';

// Modal de perfil del médico: tabs (sobre/formación/disponibilidad),
// horarios semanales seleccionables y botón "Agendar cita".
// `onAgendar(especialidadKey, slotElegido, nombreMedico)` viene de citaFlow.
export function initPerfilMedico({ onAgendar }) {
  const modalDoc = document.getElementById('modalDoc');
  const perfilTabs = modalDoc.querySelectorAll('.perfil-tab');
  const perfilPaneles = modalDoc.querySelectorAll('.tab-panel');
  const slotsWrap = document.getElementById('perfilSlots');
  const slotResumen = document.getElementById('perfilSlotResumen');
  const btnCopiar = document.getElementById('btnCopiarEmail');

  let doctorActual = null;
  let slotElegido = null;

  function activarTab(nombre) {
    perfilTabs.forEach(t => {
      const activa = t.dataset.tab === nombre;
      t.classList.toggle('is-active', activa);
      t.setAttribute('aria-selected', activa);
    });
    perfilPaneles.forEach(p => { p.hidden = p.dataset.panel !== nombre; });
  }
  perfilTabs.forEach(t => t.addEventListener('click', () => activarTab(t.dataset.tab)));

  function renderSlots(d) {
    slotsWrap.innerHTML = '';
    slotResumen.textContent = '';
    d.horarios.forEach(h => {
      const fila = el(`<div class="slot-row"><span class="slot-dia">${NOMBRES_DIA[h.dia]}</span></div>`);
      h.turnos.forEach(turno => {
        const b = el(`<button type="button" class="slot" aria-pressed="false">${turno} · ${horasTurno[turno]}</button>`);
        b.addEventListener('click', () => {
          const yaElegido = slotElegido && slotElegido.dia === h.dia && slotElegido.turno === turno;
          slotsWrap.querySelectorAll('.slot').forEach(s => { s.classList.remove('is-selected'); s.setAttribute('aria-pressed', 'false'); });
          if (yaElegido) {
            slotElegido = null;
            slotResumen.textContent = '';
          } else {
            slotElegido = { dia: h.dia, turno };
            b.classList.add('is-selected');
            b.setAttribute('aria-pressed', 'true');
            slotResumen.textContent = `Elegiste: ${NOMBRES_DIA[h.dia]}, turno ${turno.toLowerCase()}. Pulsa «Agendar cita» para elegir la hora exacta.`;
          }
        });
        fila.appendChild(b);
      });
      slotsWrap.appendChild(fila);
    });
  }

  function abrirPerfil(d) {
    doctorActual = d;
    slotElegido = null;

    const img = document.getElementById('perfilImg');
    img.src = d.img;
    img.alt = 'Foto de ' + d.nombre;
    conImagenDeRespaldo(img);
    document.getElementById('perfilNombre').textContent = d.nombre;
    document.getElementById('perfilTag').textContent = especialidades[d.esp];
    document.getElementById('perfilExp').textContent = d.exp + ' años';
    document.getElementById('perfilCmp').textContent = d.cmp.replace('CMP ', '');
    document.getElementById('perfilBio').textContent = d.bio;

    document.getElementById('perfilIdiomas').innerHTML = d.idiomas.map(i => `<span>${i}</span>`).join('');
    document.getElementById('perfilFormacion').innerHTML = d.formacion
      .map(f => `<li><strong>${f[0]}</strong><small>${f[1]}</small></li>`).join('');

    const email = document.getElementById('perfilEmail');
    email.textContent = d.email;
    email.href = 'mailto:' + d.email;
    const tel = document.getElementById('perfilTel');
    tel.textContent = d.tel;
    tel.href = 'tel:+5115550134';

    btnCopiar.textContent = 'Copiar';
    renderSlots(d);
    activarTab('sobre');
    modalDoc.querySelector('.perfil-body').scrollTop = 0;
    abrirModal(modalDoc);
  }

  btnCopiar.addEventListener('click', async () => {
    const texto = doctorActual.email;
    try {
      await navigator.clipboard.writeText(texto);
    } catch (e) {
      const t = document.createElement('textarea');
      t.value = texto; document.body.appendChild(t); t.select();
      document.execCommand('copy'); t.remove();
    }
    btnCopiar.textContent = '¡Copiado!';
    setTimeout(() => { btnCopiar.textContent = 'Copiar'; }, 1800);
  });

  document.getElementById('btnAgendarDesdeDoc').addEventListener('click', () => {
    const d = doctorActual, slot = slotElegido;
    cerrarModal(modalDoc);
    onAgendar(d.esp, slot, d.nombre);
  });

  return { abrirPerfil };
}
