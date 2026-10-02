import { faqs } from '../data/faqs.js';
import { el } from '../utils/dom.js';

export function initFaq() {
  const faqList = document.getElementById('faqList');

  faqs.forEach((f, i) => {
    const item = el(`
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false" id="faqBtn${i}">
          <span>${f.q}</span><span class="faq-plus">+</span>
        </button>
        <div class="faq-answer" role="region" aria-labelledby="faqBtn${i}">${f.a}</div>
      </div>
    `);
    const btn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    btn.addEventListener('click', () => {
      const abierto = item.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', abierto);
      answer.style.maxHeight = abierto ? answer.scrollHeight + 'px' : '0px';
    });
    faqList.appendChild(item);
  });
}
