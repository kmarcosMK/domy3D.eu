
(function(){
  'use strict';
  var qs = function(s){return document.querySelector(s)};
  var mobileBtn = qs('[data-mobile-toggle]');
  var mobileMenu = qs('#mobile-menu');
  if(mobileBtn && mobileMenu){
    mobileBtn.addEventListener('click', function(){
      mobileMenu.classList.toggle('open');
      mobileBtn.setAttribute('aria-expanded', mobileMenu.classList.contains('open') ? 'true' : 'false');
    });
  }

  // Cookie banner
  (function(){
    const key = 'domy3d_cookie_consent';
    const banner = document.getElementById('cookie-banner');
    if(!banner) return;
    const accept = document.getElementById('cookie-accept');
    const closeBtn = document.getElementById('cookie-close');
    const xBtn = document.getElementById('cookie-x');

    const hasConsent = localStorage.getItem(key);
    if(!hasConsent){ banner.hidden = false; }

    function dismiss(consented){
      if(consented) localStorage.setItem(key, 'accepted');
      banner.hidden = true;
    }

    accept?.addEventListener('click', ()=>dismiss(true));
    closeBtn?.addEventListener('click', ()=>dismiss(false));
    xBtn?.addEventListener('click', ()=>dismiss(false));
    document.addEventListener('keydown', (e)=>{ if(e.key==='Escape' && !banner.hidden) dismiss(false); });
  })();

  // simple reading-time calc for cards (optional)
  document.querySelectorAll('[data-reading-time]').forEach(function(el){
    var words = parseInt(el.getAttribute('data-reading-time'), 10) || 800;
    var mins = Math.max(1, Math.round(words/200));
    el.textContent = mins + ' min czytania';
  });
})();
