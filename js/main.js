// Karussell auf der Seite: ein Bild sichtbar, Pfeile, Punkte, Wischen.
(() => {
  document.querySelectorAll('.carousel').forEach((carousel) => {
    const track = carousel.querySelector('.car-track');
    const slides = Array.from(track.children);
    if (slides.length < 2) return;

    carousel.setAttribute('role', 'region');
    carousel.setAttribute('aria-roledescription', 'Karussell');

    // Pfeile
    const prev = document.createElement('button');
    prev.type = 'button';
    prev.className = 'car-btn car-prev';
    prev.setAttribute('aria-label', 'Vorheriges Bild');
    prev.textContent = '‹';
    const next = document.createElement('button');
    next.type = 'button';
    next.className = 'car-btn car-next';
    next.setAttribute('aria-label', 'Nächstes Bild');
    next.textContent = '›';
    carousel.append(prev, next);

    // Punkte
    const dots = document.createElement('div');
    dots.className = 'car-dots';
    const dotButtons = slides.map((_, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'car-dot';
      dot.setAttribute('aria-label', `Bild ${i + 1} von ${slides.length}`);
      dot.addEventListener('click', () => goTo(i));
      dots.appendChild(dot);
      return dot;
    });
    carousel.after(dots);

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
  dlg.setAttribute('aria-label', 'Bildansicht');
  dlg.innerHTML = `
    <button class="lb-btn lb-close" type="button" aria-label="Schließen">✕</button>
    <button class="lb-btn lb-prev" type="button" aria-label="Vorheriges Bild">‹</button>
    <figure class="lb-figure">
      <img class="lb-img" alt="">
      <figcaption class="lb-caption"><span class="lb-text"></span><span class="lb-count"></span></figcaption>
    </figure>
    <button class="lb-btn lb-next" type="button" aria-label="Nächstes Bild">›</button>`;
  document.body.appendChild(dlg);

  const lbImg = dlg.querySelector('.lb-img');
  const lbText = dlg.querySelector('.lb-text');
  const lbCount = dlg.querySelector('.lb-count');

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
    const carousel = last.closest('.carousel');
    if (carousel && carousel.goToSlide) carousel.goToSlide(last);
    last.focus({ preventScroll: true });
  });

  // Bilder klickbar und per Tastatur bedienbar machen
  galleries.forEach((gallery) => {
    gallery.forEach((img, i) => {
      img.classList.add('zoomable');
      img.tabIndex = 0;
      img.setAttribute('role', 'button');
      img.setAttribute('aria-label', `${img.alt} – vergrößern`);
      img.addEventListener('click', () => open(gallery, i));
      img.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          open(gallery, i);
        }
      });
    });
  });

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
