# QA — Iteracja 1 (MVP)

Data: 2025-10-03

## Walidacje wykonane lokalnie
- HTML5: sprawdzenie semantyki ręcznie — brak błędów krytycznych (nagłówki, landmarki).
- CSS: styl minimalny, brak `!important`, zmienne CSS, media queries OK.
- Dostępność:
  - Kontrast tekstu: AA spełnione wg ręcznych sprawdzeń.
  - Alt dla obrazów: dodane.
  - Focus states: widoczne, outline włączony.
  - Klawiatura: menu mobilne działa (toggle), brak pułapek focusu.

## Lighthouse (zalecenia uruchomienia)
- Uruchom w Chrome DevTools → Lighthouse (Mobile i Desktop).
- Oczekiwane wyniki: Performance ~80 (Mobile), 90+ (Desktop); A11y 90+.

## Znane kwestie do poprawy (wejdą do Iteracji 2)
- Dodać skip-link i focus-trap dla menu mobilnego.
- Zaimplementować lekki lightbox galerii.
- Dodać breadcrumbs i uzupełnić schema Article (image width/height).
- Lokalny hosting fontów Inter (preload i font-display:swap).
