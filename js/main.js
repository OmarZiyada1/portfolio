// Karussell auf der Seite: ein Bild sichtbar, Pfeile, Punkte, Wischen.
(() => {
  // Texte kommen aus js/i18n.js
  const t = (key, vars) => (window.I18N ? window.I18N.t(key, vars) : key);

  document.querySelectorAll('.carousel').forEach((carousel) => {
    const track = carousel.querySelector('.car-track');
    const slides = Array.from(track.children);
    if (slides.length < 2) return;

    // Blätterrichtung bleibt auch auf Arabisch links → rechts
    carousel.dir = 'ltr';
    carousel.setAttribute('role', 'region');

    // Pfeile
    const prev = document.createElement('button');
    prev.type = 'button';
    prev.className = 'car-btn car-prev';
    prev.textContent = '‹';
    const next = document.createElement('button');
    next.type = 'button';
    next.className = 'car-btn car-next';
    next.textContent = '›';
    carousel.append(prev, next);

    // Punkte
    const dots = document.createElement('div');
    dots.className = 'car-dots';
    dots.dir = 'ltr';
    const dotButtons = slides.map((_, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'car-dot';
      dot.addEventListener('click', () => goTo(i));
      dots.appendChild(dot);
      return dot;
    });
    carousel.after(dots);

    function label() {
      carousel.setAttribute('aria-roledescription', t('ui.carousel'));
      prev.setAttribute('aria-label', t('ui.prev'));
      next.setAttribute('aria-label', t('ui.next'));
      dotButtons.forEach((dot, i) => dot.setAttribute('aria-label', t('ui.dot', { n: i + 1, total: slides.length })));
    }
    label();
    document.addEventListener('langchange', label);

    let index = 0;

    function goTo(i) {
      const target = Math.max(0, Math.min(slides.length - 1, i));
      track.scrollTo({ left: target * track.clientWidth });
    }

    function update() {
      index = Math.round(track.scrollLeft / track.clientWidth);
      prev.disabled = index === 0;
      next.disabled = index === slides.length - 1;
      dotButtons.forEach((dot, i) => dot.setAttribute('aria-current', i === index ? 'true' : 'false'));
    }

    prev.addEventListener('click', () => goTo(index - 1));
    next.addEventListener('click', () => goTo(index + 1));

    let ticking = false;
    track.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => { update(); ticking = false; });
    }, { passive: true });

    carousel.addEventListener('keydown', (e) => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      e.preventDefault();
      const target = Math.max(0, Math.min(slides.length - 1, index + (e.key === 'ArrowRight' ? 1 : -1)));
      goTo(target);
      if (slides.includes(document.activeElement)) slides[target].focus({ preventScroll: true });
    });

    // Nach Größenänderung auf dem aktuellen Bild bleiben
    window.addEventListener('resize', () => {
      track.style.scrollBehavior = 'auto';
      track.scrollLeft = index * track.clientWidth;
      track.style.scrollBehavior = '';
    });

    // Versteckte Slides mitladen, sobald das erste Bild da ist
    const loadRest = () => slides.forEach((img) => { img.loading = 'eager'; });
    if (slides[0].complete) loadRest();
    else slides[0].addEventListener('load', loadRest, { once: true });

    // Lightbox schiebt das Karussell beim Schließen auf das zuletzt gesehene Bild
    carousel.goToSlide = (img) => {
      const i = slides.indexOf(img);
      if (i < 0) return;
      track.style.scrollBehavior = 'auto';
      track.scrollLeft = i * track.clientWidth;
      track.style.scrollBehavior = '';
      update();
    };

    update();
  });
})();

// Lightbox mit Karussell: Bilder eines Projekts bilden eine Galerie.
(() => {
  const t = (key, vars) => (window.I18N ? window.I18N.t(key, vars) : key);
  const images = document.querySelectorAll('.carousel img, .shots img, .small .item img');
  if (!images.length || typeof HTMLDialogElement !== 'function') return;

  // Bilder nach Projekt gruppieren
  const galleries = new Map();
  images.forEach((img) => {
    const group = img.closest('.project, .item') || img;
    if (!galleries.has(group)) galleries.set(group, []);
    galleries.get(group).push(img);
  });

  // Dialog aufbauen
  const dlg = document.createElement('dialog');
  dlg.className = 'lightbox';
  dlg.dir = 'ltr';
  dlg.innerHTML = `
    <button class="lb-btn lb-close" type="button">✕</button>
    <button class="lb-btn lb-prev" type="button">‹</button>
    <figure class="lb-figure">
      <img class="lb-img" alt="">
      <figcaption class="lb-caption"><span class="lb-text" dir="auto"></span><span class="lb-count"></span></figcaption>
    </figure>
    <button class="lb-btn lb-next" type="button">›</button>`;
  document.body.appendChild(dlg);

  const lbImg = dlg.querySelector('.lb-img');
  const lbText = dlg.querySelector('.lb-text');
  const lbCount = dlg.querySelector('.lb-count');

  // Beschriftungen in der aktuellen Sprache (auch nach dem Umschalten)
  function label() {
    dlg.setAttribute('aria-label', t('ui.viewer'));
    dlg.querySelector('.lb-close').setAttribute('aria-label', t('ui.close'));
    dlg.querySelector('.lb-prev').setAttribute('aria-label', t('ui.prev'));
    dlg.querySelector('.lb-next').setAttribute('aria-label', t('ui.next'));
    images.forEach((img) => img.setAttribute('aria-label', t('ui.zoom', { alt: img.alt })));
  }
  document.addEventListener('langchange', label);

  let current = [];
  let index = 0;

  function show(i) {
    index = (i + current.length) % current.length;
    const img = current[index];
    lbImg.src = img.currentSrc || img.src;
    lbImg.alt = img.alt;
    lbText.textContent = img.alt;
    lbCount.textContent = `${index + 1} / ${current.length}`;

    // Einblend-Animation neu starten
    lbImg.classList.remove('in');
    void lbImg.offsetWidth;
    lbImg.classList.add('in');

    // Nachbarbilder vorladen
    if (current.length > 1) {
      [index + 1, index - 1].forEach((n) => {
        const neighbour = current[(n + current.length) % current.length];
        new Image().src = neighbour.currentSrc || neighbour.src;
      });
    }
  }

  function open(gallery, i) {
    current = gallery;
    dlg.classList.toggle('single', gallery.length < 2);
    show(i);
    document.documentElement.classList.add('lb-open');
    dlg.showModal();
  }

  dlg.addEventListener('close', () => {
    document.documentElement.classList.remove('lb-open');
    lbImg.removeAttribute('src');
    const last = current[index];
    if (!last) return;
    last.closest('.carousel')?.goToSlide?.(last);
    last.focus({ preventScroll: true });
  });

  // Bilder klickbar und per Tastatur bedienbar machen
  galleries.forEach((gallery) => {
    gallery.forEach((img, i) => {
      img.classList.add('zoomable');
      img.tabIndex = 0;
      img.setAttribute('role', 'button');
      img.addEventListener('click', () => open(gallery, i));
      img.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          open(gallery, i);
        }
      });
    });
  });

  label();

  // Steuerung
  dlg.querySelector('.lb-close').addEventListener('click', () => dlg.close());
  dlg.querySelector('.lb-prev').addEventListener('click', () => show(index - 1));
  dlg.querySelector('.lb-next').addEventListener('click', () => show(index + 1));

  // Klick neben das Bild schließt
  dlg.addEventListener('click', (e) => {
    if (e.target === dlg || e.target.classList.contains('lb-figure')) dlg.close();
  });

  // Pfeiltasten (Esc schließt der Dialog von selbst)
  dlg.addEventListener('keydown', (e) => {
    if (current.length < 2) return;
    if (e.key === 'ArrowRight') { e.preventDefault(); show(index + 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); show(index - 1); }
  });

  // Wischen auf dem Handy
  let startX = null;
  dlg.addEventListener('touchstart', (e) => {
    startX = e.touches.length === 1 ? e.touches[0].clientX : null;
  }, { passive: true });
  dlg.addEventListener('touchend', (e) => {
    if (startX === null || current.length < 2) return;
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 50) show(dx < 0 ? index + 1 : index - 1);
    startX = null;
  });
})();

// Pfeil nach oben.
// Ab 1090px Breite: erscheint, sobald man etwa eine Bildschirmhöhe heruntergescrollt hat.
// Darunter: nur beim Hochscrollen (beim Lesen verdeckt er sonst Text) und ganz am Seitenende.
(() => {
  const btn = document.querySelector('.to-top');
  if (!btn) return;
  const mobile = window.matchMedia('(max-width: 1089px)');
  const JITTER = 8; // kleine Wackler beim Scrollen ignorieren (px)
  let lastY = window.scrollY;

  function update() {
    const y = window.scrollY;
    const past = y > window.innerHeight * 0.8;
    if (!mobile.matches) {
      btn.classList.toggle('show', past);
      lastY = y;
      return;
    }
    const atBottom = window.innerHeight + y >= document.documentElement.scrollHeight - 40;
    const delta = y - lastY;
    if (Math.abs(delta) < JITTER && !atBottom) return;
    btn.classList.toggle('show', past && (delta < 0 || atBottom));
    lastY = y;
  }

  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  mobile.addEventListener('change', update);
  update();

  btn.addEventListener('click', () => {
    const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' });
  });
})();
