(function () {
  'use strict';

  /* Mobile menu */
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');
  function setMenu(open) {
    nav.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
  }
  burger.addEventListener('click', function () {
    setMenu(!nav.classList.contains('open'));
  });
  nav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') setMenu(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setMenu(false);
  });
  window.addEventListener('resize', function () {
    if (window.innerWidth >= 900) setMenu(false);
  });

  /* Photo fallback: if an image fails to load, show a dark placeholder */
  document.querySelectorAll('.ph img').forEach(function (img) {
    function fail() { img.parentElement.classList.add('fail'); }
    img.addEventListener('error', fail);
    if (img.complete && img.naturalWidth === 0) fail();
  });

  /* Gallery modal */
  var modal = document.getElementById('modal');
  var mImg = document.getElementById('mImg');
  var mCap = document.getElementById('mCap');
  var items = Array.prototype.slice.call(document.querySelectorAll('#grid button'));
  var index = 0;

  function show(i) {
    index = (i + items.length) % items.length;
    var b = items[index];
    mImg.src = b.dataset.src + '?auto=format&fit=max&w=1600&q=75';
    mImg.alt = b.querySelector('img').alt;
    mCap.textContent = b.dataset.cap + ' (иллюстративное фото)';
  }
  items.forEach(function (b, i) {
    b.addEventListener('click', function () {
      show(i);
      modal.showModal();
    });
  });
  document.getElementById('mClose').addEventListener('click', function () { modal.close(); });
  document.getElementById('mPrev').addEventListener('click', function () { show(index - 1); });
  document.getElementById('mNext').addEventListener('click', function () { show(index + 1); });
  modal.addEventListener('click', function (e) {
    if (e.target === modal) modal.close();
  });
  modal.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') show(index - 1);
    if (e.key === 'ArrowRight') show(index + 1);
  });

  /* Highlight today's row in the schedule */
  var today = String(new Date().getDay());
  var row = document.querySelector('#hours [data-d="' + today + '"]');
  if (row) row.classList.add('today');

  /* Footer year */
  document.getElementById('year').textContent = new Date().getFullYear();
})();
