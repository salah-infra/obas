// OBAS site — interactivity + motion: mobile nav, industry tabs (crossfade),
// scroll reveal, hero stagger, metric count-up, footer year.
(function () {
  'use strict';

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasIO = 'IntersectionObserver' in window;

  // ---- Mobile nav toggle ----
  var burger = document.querySelector('[data-nav-toggle]');
  var menu = document.querySelector('[data-nav-menu]');
  if (burger && menu) {
    burger.addEventListener('click', function () {
      var open = menu.hasAttribute('hidden');
      if (open) { menu.removeAttribute('hidden'); } else { menu.setAttribute('hidden', ''); }
      burger.setAttribute('aria-expanded', String(open));
    });
    // Close the mobile menu after tapping an in-page anchor link
    menu.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function () {
        menu.setAttribute('hidden', '');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Theme is fixed (dark, Urban Loft, IBM Plex) — no theme/palette/font switcher.

  // ---- Industry tabs (with crossfade) ----
  var tabs = Array.prototype.slice.call(document.querySelectorAll('[role="tab"]'));
  if (tabs.length) {
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        tabs.forEach(function (t) {
          t.setAttribute('aria-selected', 'false');
          var p = document.getElementById(t.getAttribute('aria-controls'));
          if (p) p.setAttribute('hidden', '');
        });
        tab.setAttribute('aria-selected', 'true');
        var panel = document.getElementById(tab.getAttribute('aria-controls'));
        if (panel) {
          panel.removeAttribute('hidden');
          if (!reduce) {
            panel.classList.remove('tab-enter');
            void panel.offsetWidth; // restart animation
            panel.classList.add('tab-enter');
          }
        }
      });
    });
  }

  // ---- Hero / page-load stagger ----
  var heroInner = document.querySelector('[data-hero]') ||
                  document.querySelector('main > section:first-of-type > .max-w-container');
  if (heroInner) heroInner.classList.add('stagger-in');

  // ---- Scroll reveal targets ----
  document.querySelectorAll('main > section:not(:first-of-type)').forEach(function (sec) {
    sec.querySelectorAll(':scope > .max-w-container > .rule, :scope > .max-w-container > h2, :scope > .max-w-container > p')
      .forEach(function (el) { el.classList.add('reveal-up'); });
  });
  // collect every reveal target (auto headings + manually-tagged band copy + cards + images)
  var revealEls = Array.prototype.slice.call(document.querySelectorAll('.reveal-up, .card, .reveal-img'));

  if (reduce || !hasIO) {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  // ---- Parallax photo bands ----
  if (!reduce) {
    var pxItems = Array.prototype.slice.call(document.querySelectorAll('[data-parallax]'))
      .map(function (el) { return { el: el, img: el.querySelector('img') }; })
      .filter(function (x) { return x.img; });
    if (pxItems.length) {
      var ticking = false;
      var run = function () {
        var vh = window.innerHeight;
        pxItems.forEach(function (it) {
          var r = it.el.getBoundingClientRect();
          if (r.bottom < -50 || r.top > vh + 50) return;
          var off = ((r.top + r.height / 2) - vh / 2) / vh; // -0.5 .. 0.5
          it.img.style.transform = 'translate3d(0,' + (off * -34).toFixed(1) + 'px,0)';
        });
        ticking = false;
      };
      var requestTick = function () { if (!ticking) { ticking = true; requestAnimationFrame(run); } };
      window.addEventListener('scroll', requestTick, { passive: true });
      window.addEventListener('resize', requestTick);
      run();
    }
  }

  // ---- Metric count-up ----
  function countUp(el) {
    var raw = el.getAttribute('data-count');
    var target = parseFloat(raw);
    if (isNaN(target)) { el.textContent = raw; return; }
    var dur = 1300, start = null;
    function tick(now) {
      if (start === null) start = now;
      var p = Math.min((now - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased).toString();
      if (p < 1) requestAnimationFrame(tick); else el.textContent = raw;
    }
    requestAnimationFrame(tick);
  }
  var counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    if (reduce || !hasIO) {
      counters.forEach(function (c) { c.textContent = c.getAttribute('data-count'); });
    } else {
      var cio = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { countUp(e.target); cio.unobserve(e.target); }
        });
      }, { threshold: 0.6 });
      counters.forEach(function (c) { c.textContent = '0'; cio.observe(c); });
    }
  }

  // ---- Footer year ----
  var y = document.querySelector('[data-year]');
  if (y) y.textContent = new Date().getFullYear();
})();
