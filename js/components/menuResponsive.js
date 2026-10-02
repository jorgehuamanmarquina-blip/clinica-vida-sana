export function initMenuResponsive() {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navLinks = document.getElementById('navLinks');

  hamburgerBtn.addEventListener('click', () => {
    const abierto = navLinks.classList.toggle('is-open');
    hamburgerBtn.setAttribute('aria-expanded', abierto);
  });
}
