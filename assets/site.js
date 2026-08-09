/* ============================================================
   ANDREWS & MONROE — SHARED BEHAVIOUR
   ------------------------------------------------------------
   Loaded by every page with a plain <script src> before </body>.
   Three concerns only, all of them present on every page:
     1. mobile navigation toggle
     2. scroll reveal for .rv elements
     3. the copyright year

   Page-specific behaviour stays inline on its own page:
     index.html       the three-step case review wizard and the
                      call-back form
     employment.html  the tribunal deadline checker

   Every lookup is guarded, so this file is safe to load on a
   page that omits any given element. No browser storage is used
   anywhere on this site.
   ============================================================ */
(function () {
  'use strict';

  var $ = function (id) { return document.getElementById(id); };

  /* ---------- 1. mobile nav ---------- */
  var burger = $('burger'), nav = $('nav');
  if (burger && nav) {
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    // Tapping a link in the open drawer should close it behind you.
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a') && window.innerWidth <= 1000) {
        nav.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
        burger.setAttribute('aria-label', 'Open menu');
      }
    });
  }

  /* ---------- 2. reveal on scroll ----------
     Honours prefers-reduced-motion, and degrades to "everything
     visible" where IntersectionObserver is missing. Content must
     never depend on JS to become readable. */
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var items = document.querySelectorAll('.rv');
  if (reduce || !('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(items, function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -7% 0px', threshold: .07 });
    Array.prototype.forEach.call(items, function (el) { io.observe(el); });
  }

  /* ---------- 3. year ---------- */
  var yr = $('yr');
  if (yr) yr.textContent = new Date().getFullYear();
})();
