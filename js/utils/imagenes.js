// Si la foto de un doctor no carga (ruta incorrecta, archivo movido, etc.),
// mostramos un ícono genérico en vez del feo ícono de "imagen rota" del navegador.
const PLACEHOLDER_DOCTOR = 'data:image/svg+xml;utf8,' + encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect width="100" height="100" fill="#EEF6FC"/>
  <circle cx="50" cy="38" r="18" fill="#8FCBEF"/>
  <path d="M18 90c0-19 14-32 32-32s32 13 32 32z" fill="#8FCBEF"/>
</svg>`);

// Engancha el fallback a un <img>. Se puede pasar el elemento o su selector
// relativo a un contenedor ya creado.
export function conImagenDeRespaldo(img) {
  if (!img) return;
  img.addEventListener('error', function onError() {
    img.removeEventListener('error', onError);
    img.src = PLACEHOLDER_DOCTOR;
  }, { once: true });
}
