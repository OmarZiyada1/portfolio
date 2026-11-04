// Hell/Dunkel-Umschaltung. Wird im <head> geladen, damit beim Laden nichts aufblitzt.
(() => {
  const root = document.documentElement;
  const KEY = 'theme';
  const t = (key) => (window.I18N ? window.I18N.t(key) : key);

  function saved() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }

  function apply(theme) {
    root.dataset.theme = theme;
    const btn = document.querySelector('.theme-toggle');
    if (btn) {
      const dark = theme === 'dark';
      btn.setAttribute('aria-label', t(dark ? 'ui.toLight' : 'ui.toDark'));
      btn.title = t(dark ? 'ui.light' : 'ui.dark');
    }
  }

  // Standard ist hell; eine frühere Auswahl wird übernommen
  apply(saved() === 'dark' ? 'dark' : 'light');

  // Beschriftung bei Sprachwechsel anpassen
  document.addEventListener('langchange', () => apply(root.dataset.theme));

  document.addEventListener('DOMContentLoaded', () => {
    const btn = document.querySelector('.theme-toggle');
    if (!btn) return;
    apply(root.dataset.theme);
    btn.addEventListener('click', () => {
      const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
      apply(next);
      try { localStorage.setItem(KEY, next); } catch (e) { /* z. B. privater Modus */ }
    });
  });
})();
