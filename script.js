(function () {
  'use strict';

  // ---- Metric content (powers both the page modal and the demo phone detail view) ----
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

  // ---- Demo phone: tabs ----
  var phone = document.getElementById('kineuraPhone');
  if (phone) {
    var tabs = phone.querySelectorAll('.app-tab');
    var views = phone.querySelectorAll('.app-view');
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var target = tab.getAttribute('data-tab');
        tabs.forEach(function (t) {
          var on = t === tab;
          t.classList.toggle('active', on);
          t.setAttribute('aria-selected', on ? 'true' : 'false');
        });
        views.forEach(function (v) {
          var match = v.id === 'view-' + target;
          v.classList.toggle('active', match);
          if (match) v.removeAttribute('hidden'); else v.setAttribute('hidden', '');
        });
        // Always close detail when switching tabs
        var detail = document.getElementById('appDetail');
        if (detail) detail.setAttribute('hidden', '');
      });
    });

    // Mini-card -> in-app detail view
    var detail = document.getElementById('appDetail');
    var dTitle = document.getElementById('appDetailTitle');
    var dValue = document.getElementById('appDetailValue');
    var dFill = document.getElementById('appDetailFill');
    var dWhat = document.getElementById('appDetailWhat');
    var dHow = document.getElementById('appDetailHow');
    var dWhy = document.getElementById('appDetailWhy');
    var dRes = document.getElementById('appDetailResearch');

    function showAppDetail(key) {
      var m = METRICS[key];
      if (!m || !detail) return;
      dTitle.textContent = m.title;
      dValue.textContent = m.value;
      dFill.style.setProperty('--w', m.fill + '%');
      dWhat.textContent = m.what;
      dHow.textContent = m.how;
      dWhy.textContent = m.why;
      dRes.textContent = m.research;
      detail.removeAttribute('hidden');
      var back = detail.querySelector('.app-back');
      if (back) back.focus();
    }
    function hideAppDetail() {
      if (detail) detail.setAttribute('hidden', '');
    }
    phone.querySelectorAll('.app-mini-card').forEach(function (card) {
      var key = card.getAttribute('data-metric');
      card.addEventListener('click', function () { showAppDetail(key); });
    });
    var backBtn = phone.querySelector('.app-back');
    if (backBtn) backBtn.addEventListener('click', hideAppDetail);

    // Live clock in the app header
    var appTime = document.getElementById('appTime');
    function updateAppTime() {
      if (!appTime) return;
      var d = new Date();
      var h = d.getHours();
      var m = d.getMinutes();
      appTime.textContent = (h < 10 ? '0' + h : h) + ':' + (m < 10 ? '0' + m : m);
    }
    updateAppTime();
    setInterval(updateAppTime, 30000);

    // EMG waveform animation
    var emgLine = document.getElementById('emgLine');
    var emgArea = document.getElementById('emgArea');
    var emgRms = document.getElementById('emgRms');
    var emgHz = document.getElementById('emgHz');
    if (emgLine && emgArea) {
      var W = 320, H = 140;
      var SAMPLES = 80;
      var buffer = new Array(SAMPLES).fill(H / 2);
      var t = 0;
      var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      function step() {
        t += 0.18;
        // EMG-like burst: noise enveloped by slow sinusoid
        var env = 0.5 + 0.45 * Math.sin(t * 0.35);
        var spike = (Math.random() - 0.5) * 2;
        var v = H / 2 + spike * 42 * env + Math.sin(t * 1.4) * 6;
        buffer.shift();
        buffer.push(v);

        var d = '';
        var area = '';
        for (var i = 0; i < SAMPLES; i++) {
          var x = (i / (SAMPLES - 1)) * W;
          var y = buffer[i];
          d += (i === 0 ? 'M' : 'L') + x.toFixed(1) + ',' + y.toFixed(1) + ' ';
        }
        area = d + 'L' + W + ',' + H + ' L0,' + H + ' Z';
        emgLine.setAttribute('d', d);
        emgArea.setAttribute('d', area);

        if (emgRms) emgRms.textContent = (0.32 + env * 0.22).toFixed(2);
        if (emgHz) emgHz.textContent = Math.round(82 + env * 22);
      }
      function tick() { step(); rafId = requestAnimationFrame(tick); }
      var rafId = null;
      function start() { if (rafId == null && !prefersReduced) tick(); }
      function stop() { if (rafId != null) { cancelAnimationFrame(rafId); rafId = null; } }
      // Only animate when phone is visible
      if ('IntersectionObserver' in window) {
        var phoneIo = new IntersectionObserver(function (entries) {
          entries.forEach(function (e) { if (e.isIntersecting) start(); else stop(); });
        }, { threshold: 0.2 });
        phoneIo.observe(phone);
      } else {
        start();
      }
      // Pre-fill once so the EMG view isn't empty before animation kicks in
      step();
    }
  }

  // ---- Early-access form ----
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
