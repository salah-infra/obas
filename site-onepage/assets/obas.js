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

  // ---- Theme toggle (light / dark) ----
  // The saved theme is applied pre-paint by an inline script in each page's <head>.
  var themeToggles = document.querySelectorAll('[data-theme-toggle]');
  themeToggles.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var nowLight = document.documentElement.classList.toggle('light');
      try { localStorage.setItem('obas-theme', nowLight ? 'light' : 'dark'); } catch (e) {}
    });
  });

  // ---- Palette picker (color combinations) ----
  var PALETTES = [
    { id: 'electric', name: 'Electric',       c: '#00DCFA', v: '#7C5CFF' },
    { id: 'blue',     name: 'Blue Eclipse',   c: '#4F8BFF', v: '#7B6CF6' },
    { id: 'teal',     name: 'Cool Revival',   c: '#2DD4BF', v: '#38BDF8' },
    { id: 'neon',     name: 'Neon Noir',      c: '#00F5D4', v: '#C77DFF' },
    { id: 'mono',     name: 'Salt & Pepper',  c: '#9FB2C9', v: '#5E6E86' },
    { id: 'warm',     name: 'Urban Loft',     c: '#E0A872', v: '#B45309' },
    { id: 'sapphire', name: 'Sleek Sapphire', c: '#4DA3FF', v: '#E2683A' },
    { id: 'citrus',   name: 'Striking Citrus',c: '#B6F23D', v: '#E2620E' },
    { id: 'rose',     name: 'Rose & Blueberry',c:'#FF5C8A', v: '#3B6FD4' },
    { id: 'aurora',   name: 'Modern Bloom',   c: '#2EE6A6', v: '#1583C9' },
    { id: 'gold',     name: 'Audacious Gold', c: '#F4C04A', v: '#6D5DF6' },
    { id: 'grape',    name: 'Grape Pop',      c: '#A78BFA', v: '#D6447F' }
  ];
  var PAL_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r="1.3"/><circle cx="17" cy="10.5" r="1.3"/><circle cx="8.5" cy="7.5" r="1.3"/><circle cx="6.5" cy="12" r="1.3"/><path d="M12 2a10 10 0 0 0 0 20 2.5 2.5 0 0 0 2.5-2.5c0-.66-.26-1.26-.68-1.7a2.5 2.5 0 0 1 1.84-4.3H18a4 4 0 0 0 4-4 10 10 0 0 0-10-8z"/></svg>';
  var CHECK = '<svg class="palette-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';

  function currentPalette() { return document.documentElement.getAttribute('data-palette') || 'electric'; }

  // Build the popover once
  var pop = document.createElement('div');
  pop.className = 'palette-pop';
  pop.setAttribute('hidden', '');
  pop.setAttribute('role', 'menu');
  pop.innerHTML = '<p class="palette-head">Color palette</p>';
  PALETTES.forEach(function (p) {
    var opt = document.createElement('button');
    opt.className = 'palette-opt';
    opt.type = 'button';
    opt.setAttribute('role', 'menuitemradio');
    opt.setAttribute('data-pal', p.id);
    opt.innerHTML =
      '<span class="palette-sw" style="background:linear-gradient(120deg,' + p.c + ',' + p.v + ')"></span>' +
      '<span class="palette-name">' + p.name + '</span>' + CHECK;
    opt.addEventListener('click', function () { setPalette(p.id); hidePop(); });
    pop.appendChild(opt);
  });

  // Font selector (shared with the brand kit via localStorage('obas-font'))
  var FONTS = [
    { id: '', name: 'Space Grotesk' }, { id: 'sora', name: 'Sora' },
    { id: 'outfit', name: 'Outfit' }, { id: 'poppins', name: 'Poppins' },
    { id: 'plex', name: 'IBM Plex Sans' }, { id: 'manrope', name: 'Manrope' }
  ];
  var fontWrap = document.createElement('div');
  fontWrap.className = 'palette-font';
  fontWrap.innerHTML = '<p class="palette-head">Font</p>';
  var fontSel = document.createElement('select');
  fontSel.className = 'font-select';
  FONTS.forEach(function (f) {
    var o = document.createElement('option');
    o.value = f.id; o.textContent = f.name; fontSel.appendChild(o);
  });
  fontSel.value = document.documentElement.getAttribute('data-font') || '';
  fontSel.addEventListener('change', function () {
    var v = fontSel.value;
    if (v) document.documentElement.setAttribute('data-font', v);
    else document.documentElement.removeAttribute('data-font');
    try { localStorage.setItem('obas-font', v); } catch (e) {}
  });
  fontWrap.appendChild(fontSel);
  pop.appendChild(fontWrap);
  document.body.appendChild(pop);

  function syncChecks() {
    var cur = currentPalette();
    pop.querySelectorAll('.palette-opt').forEach(function (o) {
      o.setAttribute('aria-current', o.getAttribute('data-pal') === cur ? 'true' : 'false');
    });
  }
  function setPalette(id) {
    if (id === 'electric') document.documentElement.removeAttribute('data-palette');
    else document.documentElement.setAttribute('data-palette', id);
    try { localStorage.setItem('obas-palette', id); } catch (e) {}
    syncChecks();
  }
  function hidePop() { pop.setAttribute('hidden', ''); }
  function showPopAt(btn) {
    syncChecks();
    fontSel.value = document.documentElement.getAttribute('data-font') || '';
    pop.removeAttribute('hidden');
    var r = btn.getBoundingClientRect();
    var w = pop.offsetWidth;
    var left = Math.min(r.right - w, window.innerWidth - w - 12);
    pop.style.top = (r.bottom + 10) + 'px';
    pop.style.left = Math.max(12, left) + 'px';
  }

  // Inject a palette button next to each theme toggle
  themeToggles.forEach(function (tt) {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = tt.className.replace('cursor-pointer', '') + ' cursor-pointer';
    btn.setAttribute('data-palette-toggle', '');
    btn.setAttribute('aria-label', 'Choose color palette');
    btn.innerHTML = PAL_ICON;
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      if (pop.hasAttribute('hidden')) showPopAt(btn); else hidePop();
    });
    tt.parentNode.insertBefore(btn, tt);
  });

  document.addEventListener('click', function (e) {
    if (!pop.hasAttribute('hidden') && !pop.contains(e.target) && !e.target.closest('[data-palette-toggle]')) hidePop();
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') hidePop(); });

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
