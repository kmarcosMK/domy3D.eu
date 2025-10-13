(function () {
  async function inject(el) {
    const url = el.getAttribute('data-include');
    if (!url) return;

    // najpierw próba z podaną ścieżką (root-relative), fallback: relatywna
    const candidates = [url, url.replace(/^\//, '')];

    let html = '';
    for (const u of candidates) {
      try {
        const res = await fetch(u, { cache: 'no-cache' });
        if (res.ok) {
          html = await res.text();
          break;
        }
      } catch (_) {}
    }
    if (!html) {
      console.error('Include error for', url);
      el.remove();
      return;
    }
    el.outerHTML = html;
  }

  function run() {
    document.querySelectorAll('[data-include]').forEach(inject);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
