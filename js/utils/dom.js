// Crea un elemento del DOM a partir de una cadena HTML.
// Ej: el('<div class="x">Hola</div>')
export function el(html) {
  const t = document.createElement('template');
  t.innerHTML = html.trim();
  return t.content.firstElementChild;
}
