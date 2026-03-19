/* Bolts11 — Site JS */

// Mobile nav toggle
(function () {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', function () {
    mobileMenu.classList.toggle('open');
    const isOpen = mobileMenu.classList.contains('open');
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  // Close on outside click
  document.addEventListener('click', function (e) {
    if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
      mobileMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', false);
    }
  });
})();

// Contact form — simple client-side validation + mailto fallback
(function () {
  const form = document.getElementById('contact-form');
  const successMsg = document.getElementById('form-success');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name    = form.querySelector('[name="name"]').value.trim();
    const email   = form.querySelector('[name="email"]').value.trim();
    const message = form.querySelector('[name="message"]').value.trim();
    const type    = form.querySelector('[name="type"]') ? form.querySelector('[name="type"]').value : 'general';

    if (!name || !email || !message) {
      alert('Please fill in all required fields.');
      return;
    }

    // Build mailto link as a no-backend fallback
    const subject  = encodeURIComponent('Bolts11 Contact: ' + type);
    const body     = encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\nType: ' + type + '\n\n' + message);
    const mailto   = 'mailto:support@bolts11.com?subject=' + subject + '&body=' + body;
    window.location.href = mailto;

    if (successMsg) {
      successMsg.style.display = 'block';
      form.reset();
    }
  });
})();
