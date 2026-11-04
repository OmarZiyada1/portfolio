// Navigation: Passen Name und alle Links nicht mehr nebeneinander, werden alle Links
// ausgeblendet (Klasse "compact"). Dann bleiben nur Sprachauswahl und Hell/Dunkel.
// Läuft direkt nach der Navigation, damit auf dem Handy nichts kurz aufblitzt.
(() => {
  const nav = document.querySelector('nav');
  if (!nav) return;
  const wrap = nav.querySelector('.wrap');
  const name = wrap.querySelector('b');
  const links = wrap.querySelector('.links');
  const MIN_GAP = 16; // Mindestabstand zwischen Name und Links in px

  function fit() {
    // Immer im vollen Zustand messen, dann entscheiden
    nav.classList.remove('compact');
    const cs = getComputedStyle(wrap);
    const available = wrap.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    const needed = name.getBoundingClientRect().width + MIN_GAP + links.scrollWidth;
    nav.classList.toggle('compact', needed > available);
  }

  fit();
  window.addEventListener('resize', fit);
  // Andere Sprache = andere Linklängen
  document.addEventListener('langchange', fit);
  // Nach dem Laden der Webschriften stimmen die Breiten erst genau
  if (document.fonts) {
    document.fonts.ready.then(fit);
    document.fonts.addEventListener('loadingdone', fit);
  }
})();
