// Revelado suave (fade + slide) de tarjetas al entrar en pantalla.
// Se desactiva solo si el usuario prefiere menos movimiento en su sistema.
export function initScrollReveal(selector = '.sintoma-card, .doc-card') {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.transition = 'opacity .6s ease, transform .6s ease';
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(selector).forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(16px)';
    observer.observe(card);
  });
}
