(function () {
  'use strict';

  // ---- Metric content (powers the page-level metric modal) ----
  var METRICS = {
    muscle: {
      title: 'Muscle Activation',
      tagline: 'See beneath the surface — which muscles fire and how that balance shifts.',
      value: '76%',
      fill: 76,
      what: 'Surface EMG (sEMG) measures the electrical activity produced when a muscle contracts. Kineura captures this signal across the major running muscles to show which groups are doing the work, and how that balance evolves across a session.',
      how: 'Lightweight surface EMG sensors sit on the major lower-limb muscles. The signal is amplified, filtered, and represented as RMS amplitude — the standard way to quantify activation intensity over time.',
      why: 'Knowing which muscles are doing the work helps you understand how your form is holding up and which areas to strengthen. It surfaces compensation patterns long before they show up as soreness.',
      research: 'RMS amplitude of sEMG provides a quantitative measure of muscle activation intensity and is the standard metric for assessing neuromuscular engagement (Konrad, 2005).'
    },
    fatigue: {
      title: 'Fatigue Index',
      tagline: 'Know when output starts to fade — before form breaks down.',
      value: '41%',
      fill: 41,
      what: 'A fatigue score derived from how the EMG signal changes shape as a session progresses. As muscles fatigue, signal amplitude rises while frequency content shifts downward — a well-documented dual-signal pattern.',
      how: 'Kineura tracks the median frequency of the EMG power spectrum over time. A downward shift, combined with rising RMS amplitude, indicates localized muscle fatigue.',
      why: 'Detecting fatigue early lets you adjust effort before form breaks down. Fatigued muscles fire differently, which can lead to compensatory movement patterns and elevated injury risk.',
      research: 'A downward shift in EMG median frequency is a well-established indicator of muscle fatigue, reflecting changes in muscle fiber conduction velocity (De Luca, 1997).'
    },
    symmetry: {
      title: 'Stride Symmetry',
      tagline: 'Spot imbalance before it compounds into injury.',
      value: '93%',
      fill: 93,
      what: 'A composite score comparing left and right limbs across activation intensity, ground contact time, and step timing. Asymmetries are one of the strongest predictors of overuse injury in runners.',
      how: 'IMU sensors detect each foot strike and toe-off. EMG captures activation intensity per leg. Kineura compares these side-by-side to compute a symmetry percentage that updates throughout the run.',
      why: 'Even small imbalances (>5%) sustained over many miles can lead to compensatory stress on the dominant side. Tracking symmetry lets you catch developing issues before they become injuries.',
      research: 'EMG-based bilateral muscle activation analysis can identify neuromuscular imbalances that predispose individuals to injury during gait (Schmitz et al., 2014).'
    },
    gct: {
      title: 'Ground Contact Time',
      tagline: 'Measure efficiency at the moment of impact.',
      value: '256 ms',
      fill: 64,
      what: 'Ground contact time (GCT) is the duration your foot spends on the ground during each stride, measured in milliseconds from initial foot strike to toe-off. It is a window into running economy and load.',
      how: 'IMU-detected foot-strike and toe-off events bracket each contact phase. Kineura averages contact time per leg and across the run, surfacing left/right differences and trends as you fatigue.',
      why: 'Shorter, more consistent ground contact tends to correlate with better running economy. Lengthening or asymmetric GCT often signals fatigue or compensation.',
      research: 'Composite biomechanical scores integrating multiple gait parameters provide more comprehensive injury risk assessment than any single metric alone (Napier et al., 2018).'
    },
    cadence: {
      title: 'Cadence & Motion Trends',
      tagline: 'Read rhythm in motion — pace, turnover, and stride dynamics over time.',
      value: '170 spm',
      fill: 85,
      what: 'Cadence is the number of steps per minute (spm) you take while running. Combined with pelvic motion and stride dynamics from the IMU, it tells the story of how your running rhythm evolves.',
      how: '9-axis IMU data is processed to detect each foot strike. Cadence is computed as a rolling average, while pelvic drop, vertical oscillation, and stride length come from accelerometer and gyroscope channels.',
      why: 'Cadence is one of the most modifiable factors in running form. Small increases in cadence have been shown to reduce loading rates at the knee and lower injury risk in novice runners.',
      research: 'A 12-month gait retraining program using cadence modification resulted in a 62% reduction in injury risk in novice runners (Willy et al., 2016).'
    },
    recovery: {
      title: 'Recovery Signals',
      tagline: 'Track readiness beyond feel — using objective neuromuscular data.',
      value: '82%',
      fill: 82,
      what: 'A daily readiness score that draws on neuromuscular markers — baseline activation, signal quality, and how recently you accumulated load — rather than only how you feel.',
      how: 'Kineura compares your current resting and submaximal EMG patterns against your personal baseline, factors in recent training load and fatigue trajectories, and rolls them into a single readiness percentage.',
      why: 'Adequate recovery between sessions is essential to prevent overtraining. An objective readiness signal helps you plan training around your body’s actual state, not just how you feel that morning.',
      research: 'EMG time-frequency fatigue measures (instantaneous median frequency) show high reproducibility across sessions (ICCs 87–99%) (Cifrek et al., 2009).'
    }
  };

  // ---- Year in footer ----
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---- Sticky header on scroll ----
  var header = document.getElementById('siteHeader');
  function onScroll() {
    if (!header) return;
    if (window.scrollY > 8) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---- Mobile nav toggle ----
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

  // ---- Reveal-on-scroll ----
  var revealTargets = document.querySelectorAll(
    '.section-head, .step, .use-card, .science-card, .about-copy, .about-side, .cta-card, .faq-list details, .demo-wrap, .metric-photo-card'
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

  // ---- Page-level metric modal ----
  var modal = document.getElementById('metricModal');
  var modalTag = document.getElementById('metricModalTag');
  var modalTitle = document.getElementById('metricModalTitle');
  var modalTagline = document.getElementById('metricModalTagline');
  var modalWhat = document.getElementById('metricModalWhat');
  var modalHow = document.getElementById('metricModalHow');
  var modalWhy = document.getElementById('metricModalWhy');
  var modalResearch = document.getElementById('metricModalResearch');
  var lastFocus = null;

  function openMetricModal(key) {
    var m = METRICS[key];
    if (!m || !modal) return;
    lastFocus = document.activeElement;
    modalTag.textContent = 'Metric';
    modalTitle.textContent = m.title;
    modalTagline.textContent = m.tagline;
    modalWhat.textContent = m.what;
    modalHow.textContent = m.how;
    modalWhy.textContent = m.why;
    modalResearch.textContent = m.research;
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    var closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) closeBtn.focus();
  }
  function closeMetricModal() {
    if (!modal) return;
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
  }
  if (modal) {
    modal.addEventListener('click', function (e) {
      if (e.target.matches('[data-modal-close]')) closeMetricModal();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') closeMetricModal();
    });
  }

  // Bind photo cards & their plus buttons
  document.querySelectorAll('.metric-photo-card').forEach(function (card) {
    var key = card.getAttribute('data-metric');
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-haspopup', 'dialog');
    card.addEventListener('click', function () { openMetricModal(key); });
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openMetricModal(key); }
    });
  });


  // ---- Early-access form ----
  // Progressive enhancement over the native FormSubmit.co POST. With JS, we
  // submit via fetch to the AJAX endpoint and surface the result inline so
  // the user stays on the page. Without JS, the form's native `action` still
  // posts to FormSubmit and the user is redirected to the `_next` URL.
  var form = document.getElementById('earlyAccessForm');
  var note = document.getElementById('formNote');
  if (form && window.fetch && window.FormData) {
    form.addEventListener('submit', function (e) {
      var emailField = form.elements.namedItem('email');
      var email = (emailField && emailField.value) || '';
      var honey = (form.elements.namedItem('_honey') || {}).value || '';

      // Honeypot: silently drop bot submissions on the client too.
      if (honey) { e.preventDefault(); return; }

      if (!email || email.indexOf('@') < 1) {
        e.preventDefault();
        if (note) {
          note.textContent = 'Please enter a valid email address.';
          note.classList.remove('success');
          note.classList.add('error');
        }
        return;
      }

      e.preventDefault();
      var submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Sending…'; }
      if (note) {
        note.textContent = 'Sending your request…';
        note.classList.remove('success', 'error');
      }

      var data = new FormData(form);
      // FormSubmit's AJAX endpoint accepts JSON and returns JSON.
      var json = {};
      data.forEach(function (v, k) { json[k] = v; });
      var actionUrl = form.getAttribute('action') || '';
      var ajaxUrl = actionUrl.replace('formsubmit.co/', 'formsubmit.co/ajax/');

      fetch(ajaxUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(json)
      }).then(function (res) {
        return res.json().catch(function () { return {}; });
      }).then(function (body) {
        var ok = body && (body.success === 'true' || body.success === true);
        if (ok) {
          form.reset();
          if (note) {
            note.textContent = 'Thanks! We received your request and will be in touch.';
            note.classList.remove('error');
            note.classList.add('success');
          }
        } else {
          if (note) {
            note.textContent = (body && body.message) || 'Something went wrong. Please try again or email hello@kineura.com.';
            note.classList.remove('success');
            note.classList.add('error');
          }
        }
      }).catch(function () {
        if (note) {
          note.textContent = 'Network error. Please try again or email hello@kineura.com.';
          note.classList.remove('success');
          note.classList.add('error');
        }
      }).then(function () {
        if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Request Early Access'; }
      });
    });
  }

  // If FormSubmit's `_next` redirect bounced us back with ?ea=thanks (used in
  // the no-JS path), surface a friendly confirmation near the form.
  if (note && /[?&]ea=thanks\b/.test(window.location.search)) {
    note.textContent = 'Thanks! We received your request and will be in touch.';
    note.classList.remove('error');
    note.classList.add('success');
  }

  // ---- Sleeve explainer connector lines ----
  // Draw SVG lines from each callout card's image-side edge to the corresponding
  // dot on the sleeve image. Recompute on resize / image load so endpoints stay
  // glued to the real DOM rects regardless of viewport width.
  (function initSleeveConnectors() {
    var stage = document.querySelector('.sleeve-stage');
    if (!stage) return;
    var svg = stage.querySelector('.sleeve-lines');
    if (!svg) return;
    var image = stage.querySelector('.sleeve-image');

    // callout key -> { calloutSel, dotSel, side }
    var pairs = [
      { key: 'tl', calloutSel: '.sleeve-callout--tl', dotSel: '.sleeve-dot--emg',  side: 'left'  },
      { key: 'tr', calloutSel: '.sleeve-callout--tr', dotSel: '.sleeve-dot--imu',  side: 'right' },
      { key: 'bl', calloutSel: '.sleeve-callout--bl', dotSel: '.sleeve-dot--fit',  side: 'left'  },
      { key: 'br', calloutSel: '.sleeve-callout--br', dotSel: '.sleeve-dot--sync', side: 'right' }
    ];

    function center(rect) { return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }; }

    function update() {
      // If the figure is in the stacked/mobile layout, callouts are display:none.
      // In that case, just hide the lines.
      var sample = stage.querySelector('.sleeve-callout--tl');
      if (!sample || getComputedStyle(sample).display === 'none') {
        svg.classList.remove('is-ready');
        return;
      }

      var sRect = stage.getBoundingClientRect();
      pairs.forEach(function (p) {
        var line = svg.querySelector('line[data-callout="' + p.key + '"]');
        var card = stage.querySelector(p.calloutSel + ' .sleeve-callout-card');
        var dot = stage.querySelector(p.dotSel);
        if (!line || !card || !dot) return;

        var cardRect = card.getBoundingClientRect();
        var dotRect = dot.getBoundingClientRect();
        var dotC = center(dotRect);

        // Anchor at the card's image-facing edge, vertically centered.
        var x1 = (p.side === 'left' ? cardRect.right : cardRect.left) - sRect.left;
        var y1 = cardRect.top + cardRect.height / 2 - sRect.top;
        var x2 = dotC.x - sRect.left;
        var y2 = dotC.y - sRect.top;

        line.setAttribute('x1', x1.toFixed(1));
        line.setAttribute('y1', y1.toFixed(1));
        line.setAttribute('x2', x2.toFixed(1));
        line.setAttribute('y2', y2.toFixed(1));
      });
      svg.classList.add('is-ready');
    }

    // Recompute on resize and after the image loads (size may change).
    var raf;
    function schedule() {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    }
    window.addEventListener('resize', schedule, { passive: true });
    if (image) {
      if (image.complete) schedule();
      else image.addEventListener('load', schedule);
    }
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(schedule).catch(function () {});
    }
    // Also observe the stage box itself; cards reflow as content/fonts settle.
    if (typeof ResizeObserver !== 'undefined') {
      try { new ResizeObserver(schedule).observe(stage); } catch (e) { /* no-op */ }
    }
    schedule();
  })();
})();
