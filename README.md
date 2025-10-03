# Domy3D — Iteracja 1 (MVP)

## Struktura katalogów
```
/
  /assets
    /img
    /icons
    /fonts
    /css        # style.css, style.min.css
    /js         # main.js, main.min.js
  /articles     # template.html, przyklad-druk-3d.html
  /druk-3d      # index.html
  /projektowanie# index.html
  /wizualizacje # index.html
  /contact      # index.html, sent.html, form-handler.php
  index.html
  sitemap.xml
  robots.txt
  manifest.json
  privacy.md
  cookies.md
  README.md
  QA-REPORT-ITERATION-1.md
```

## Publikacja obrazów
- Preferuj WebP/SVG, dodawaj fallback (jpeg/png) gdy potrzebny.
- Nazwy opisowe, małe litery i myślniki: `nowoczesny-dom-a.webp`.
- Używaj `srcset`/`sizes` dla responsywności; `loading="lazy"` poza hero.

## Deploy
- **GitHub Pages / Netlify**: skopiuj katalog `/Domy3D` do root hostingu statycznego.
- **HTTPS**: włącz certyfikat Let's Encrypt (na Netlify/Cloudflare — kilka kliknięć).
- **Cache**: na serwerze ustaw:
  - `Cache-Control: public, max-age=31536000, immutable` dla `/assets/**/*` (wersjonuj pliki przy zmianach).
  - `Cache-Control: public, max-age=600` dla HTML.
- **Compression**: włącz gzip/brotli (NGINX/Apache).

## Formularz
- Domyślnie wspiera **Netlify Forms** (`data-netlify="true"`).
- Alternatywnie użyj `/contact/form-handler.php` (hosting z PHP).

## Dodawanie artykułu
1. Sklonuj `articles/template.html` jako nowy plik np. `nowy-temat.html`.
2. Uzupełnij metatagi (`TITLE`, `DESCRIPTION`, `CANONICAL`, `DATE`, `AUTHOR`).
3. Dodaj obraz og: `/assets/img/...` i wstaw w JSON-LD.
4. Dodaj link do sitemap.xml.

## Lighthouse — cel Iteracja 1
- Performance ~75–85 (do poprawy: inlining krytycznego CSS, preloading fontów, optymalizacja grafik wg rzeczywistych).
- Accessibility >= 90 (kontrast AA spełniony).
- Best Practices/SSEO >= 90.

## Roadmapa do Iteracji 2
- Usprawnienia a11y (skip-link, lepsze kontrolki menu, focus trap w mobile menu).
- Lightbox dla galerii (bez zależności).
- Breadcrumbs + rozszerzone schema.org.
- Lepsze preload/preconnect fontów z lokalnymi fontami.
- Minifikacja HTML w buildzie (skrypt).

