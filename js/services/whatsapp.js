import { WHATSAPP_NUM } from '../config.js';

// Arma un link de WhatsApp con mensaje predeterminado ya codificado.
export function urlWhatsapp(mensaje) {
  return `https://wa.me/${WHATSAPP_NUM}?text=${encodeURIComponent(mensaje)}`;
}

export function mensajeEmergencia() {
  return 'Hola, tengo una emergencia y necesito atención inmediata.';
}

export function mensajeMasInformacion() {
  return 'Hola, buen día. Quisiera más información sobre sus servicios.';
}

export function mensajeCita({ fechaTxt, especialidadTexto, medicoTexto, horaTxt, nombre, telefono }) {
  let msg = `Hola, buen día. Quisiera una cita para el día ${fechaTxt}`;
  msg += medicoTexto ? ` con ${medicoTexto} (${especialidadTexto})` : ` de ${especialidadTexto}`;
  msg += ` a las ${horaTxt}. Mi nombre es ${nombre} y mi número es ${telefono}. ¡Gracias!`;
  return msg;
}
