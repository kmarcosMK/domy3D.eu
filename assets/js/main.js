(function(){
  'use strict';

  // -------- Helpers
  var $ = function(s, r){ return (r||document).querySelector(s); };
  var $$ = function(s, r){ return (r||document).querySelectorAll(s); };
  var on = function(el, ev, fn){ el && el.addEventListener(ev, fn); };

  // -------- Mobile nav (obsługa dwóch wzorców)
  (function(){
    // Wzorzec A (Twój): [data-mobile-toggle] + #mobile-menu
    var btnA  = $('[data-mobile-toggle]');
    var menuA = $('#mobile-menu');

    // Wzorzec B (a11y): .nav-toggle + #primary-nav
    var btnB  = $('.nav-toggle');
    var menuB = $('#primary-nav');

    var btn   = btnA || btnB;
    var menu  = menuA || menuB;

    if(!btn || !menu) return;

    function isOpen(){ return menu.classList.contains('open') || menu.classList.contains('is-open'); }
    function setOpen(open){
      // klasy zgodne z oboma wzorcami
      menu.classList.toggle('open', open);
      menu.classList.toggle('is-open', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.documentElement.classList.toggle('nav-locked', open); // blokada scrolla
    }

    on(btn, 'click', function(){
      setOpen(!isOpen());
    });

    // Zamknij Esc
    on(document, 'keydown', function(e){
      if(e.key === 'Escape' && isOpen()) setOpen(false);
    });

    // Klik poza menu zamyka (jeśli menu ma overlay/pozycjonowanie)
    on(document, 'click', function(e){
      if(!isOpen()) return;
      var clickInsideMenu = menu.contains(e.target) || btn.contains(e.target);
      if(!clickInsideMenu) setOpen(false);
    });
  })();

  // -------- Cookie banner + Analytics (consent-based)
(function(){
  var KEY = 'domy3d_cookie_consent';
  var banner  = $('#cookie-banner');
  if(!banner) return;

  // Uzupełnij tutaj swoim Measurement ID (np. G-ABCDEFG12)
  var GA_MEASUREMENT_ID = 'G-CKS8V6N8DD';
  var analyticsLoaded = false;

  function loadAnalytics(){
    if(analyticsLoaded) return;
    analyticsLoaded = true;

    // dodaj skrypt gtag.js
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_MEASUREMENT_ID;
    document.head.appendChild(s);

    // initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(){ dataLayer.push(arguments); }
    window.gtag = window.gtag || gtag;
    gtag('js', new Date());
    // anonimyzacja IP + uruchomienie konfiguracji
    gtag('config', GA_MEASUREMENT_ID, { 'anonymize_ip': true });
  }

  function get(key){
    try { return localStorage.getItem(key); } catch(_) { return null; }
  }
  function set(key, val){
    try { localStorage.setItem(key, val); } catch(_) {}
  }

  var accept  = $('#cookie-accept');
  var close   = $('#cookie-close');
  var xbtn    = $('#cookie-x');

  function hideBanner(){ banner.hidden = true; }

  // jeśli wcześniej zaakceptowano — ładuj analytics automatycznie
  if(get(KEY) === 'accepted') {
    hideBanner();
    loadAnalytics();
  } else {
    banner.hidden = false;
  }

  function acceptHandler(){
    set(KEY, 'accepted');
    hideBanner();
    loadAnalytics();
  }
  function closeHandler(){
    hideBanner();
  }

  on(accept, 'click', acceptHandler);
  on(close, 'click', closeHandler);
  on(xbtn, 'click', closeHandler);
  on(document, 'keydown', function(e){
    if(e.key === 'Escape' && !banner.hidden) closeHandler();
  });
})();


  // -------- Reading time (opcjonalne)
  $$( '[data-reading-time]' ).forEach(function(el){
    var words = parseInt(el.getAttribute('data-reading-time'), 10) || 800;
    var mins  = Math.max(1, Math.round(words/200));
    el.textContent = mins + ' min czytania';
  });
})();


// Minimal lightbox
(function(){
  const links = document.querySelectorAll('a[data-lightbox]');
  if(!links.length) return;

  const overlay = document.createElement('div');
  overlay.className = 'lb-overlay';
  overlay.innerHTML = '<button class="lb-close" aria-label="Zamknij">×</button><img alt="">';
  document.body.appendChild(overlay);
  const img = overlay.querySelector('img');
  const btn = overlay.querySelector('.lb-close');

  function open(src, alt){
    img.src = src; img.alt = alt || '';
    overlay.classList.add('is-open');
    btn.focus();
  }
  function close(){ overlay.classList.remove('is-open'); img.src = ''; }

  links.forEach(a=>{
    a.addEventListener('click', (e)=>{
      const href = a.getAttribute('href');
      const alt = a.querySelector('img')?.alt || a.getAttribute('aria-label');
      if(href && (href.endsWith('.jpg') || href.endsWith('.jpeg') || href.endsWith('.webp') || href.endsWith('.png'))){
        e.preventDefault(); open(href, alt);
      }
    });
  });
  btn.addEventListener('click', close);
  overlay.addEventListener('click', (e)=>{ if(e.target===overlay) close(); });
  document.addEventListener('keydown', (e)=>{ if(e.key==='Escape') close(); });
})();

// -------- Filtr tagów
const tags = document.querySelectorAll('.tag');
const articles = document.querySelectorAll('article.card');

function filterByTag(tagText) {
  articles.forEach(article => {
    const articleTags = Array.from(article.querySelectorAll('.tag')).map(t => t.textContent.trim());
    article.style.display = (tagText === null || articleTags.includes(tagText)) ? '' : 'none';
  });

  // aktywne podświetlenie tagów
  tags.forEach(t => t.classList.toggle('active', t.textContent.trim() === tagText));
}

// kliknięcie tagu
tags.forEach(tag => {
  tag.addEventListener('click', () => {
    const tagText = tag.textContent.trim();
    filterByTag(tagText);
    window.location.hash = 'tag=' + encodeURIComponent(tagText);
  });
});

// filtr przy starcie
const hash = window.location.hash;
if (hash.startsWith('#tag=')) {
  const activeTag = decodeURIComponent(hash.replace('#tag=', ''));
  filterByTag(activeTag);
} else {
  filterByTag(null); // pokaż wszystkie
}

window.addEventListener('hashchange', () => {
  const hash = window.location.hash;
  if (hash.startsWith('#tag=')) {
    const activeTag = decodeURIComponent(hash.replace('#tag=', ''));
    filterByTag(activeTag);
  } else {
    filterByTag(null); // pokaż wszystkie artykuły
  }
});
