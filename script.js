(function () {
  'use strict';

  // Year in footer
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Sticky header style on scroll
  var header = document.getElementById('siteHeader');
  function onScroll() {
    if (!header) return;
    if (window.scrollY > 8) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var navList = document.getElementById('navList');
  if (toggle && navList) {
    toggle.addEventListener('click', function () {
      var open = navList.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    navList.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        navList.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Reveal-on-scroll for sections and cards
  var revealTargets = document.querySelectorAll(
    '.section-head, .step, .metric-card, .use-card, .science-card, .about-copy, .about-side, .cta-card, .faq-list details, .demo-frame'
  );
  revealTargets.forEach(function (el) { el.classList.add('reveal'); });

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealTargets.forEach(function (el) { io.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add('in'); });
  }

  // Pointer-tracked glow on metric cards
  document.querySelectorAll('.metric-card').forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      var r = card.getBoundingClientRect();
      card.style.setProperty('--mx', ((e.clientX - r.left) / r.width) * 100 + '%');
      card.style.setProperty('--my', ((e.clientY - r.top) / r.height) * 100 + '%');
    });
  });

  // Early-access form: open mailto with prefilled body (no backend yet)
  var form = document.getElementById('earlyAccessForm');
  var note = document.getElementById('formNote');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = (form.elements.namedItem('name') || {}).value || '';
      var email = (form.elements.namedItem('email') || {}).value || '';
      var role = (form.elements.namedItem('role') || {}).value || '';

      if (!email || email.indexOf('@') < 1) {
        if (note) {
          note.textContent = 'Please enter a valid email address.';
          note.classList.remove('success');
          note.classList.add('error');
        }
        return;
      }

      var subject = encodeURIComponent('Kineura early access request');
      var body = encodeURIComponent(
        'Hi Kineura team,\n\n' +
        'I would like to join the early access list.\n\n' +
        'Name: ' + name + '\n' +
        'Email: ' + email + '\n' +
        'Role: ' + role + '\n'
      );
      window.location.href = 'mailto:hello@kineura.com?subject=' + subject + '&body=' + body;

      if (note) {
        note.textContent = 'Thanks! Your email client should open with a pre-filled message.';
        note.classList.remove('error');
        note.classList.add('success');
      }
    });
  }
})();
