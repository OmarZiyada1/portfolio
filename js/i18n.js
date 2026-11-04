// Sprachumschaltung DE / EN / AR.
// Deutsch steht direkt im HTML. Hier stehen nur Englisch und Arabisch
// sowie die Texte, die per JavaScript erzeugt werden (Knöpfe, Bildbeschriftungen).
// Wird im <head> geladen, damit Sprache und Leserichtung sofort stimmen.
(() => {
  const LANGS = ['de', 'en', 'ar'];
  const KEY = 'lang';
  const root = document.documentElement;

  const T = {
    // Nur Texte, die nicht im HTML stehen
    de: {
      'title': 'Omar Ziyada – Portfolio',
      'ui.lang': 'Sprache wählen',
      'ui.prev': 'Vorheriges Bild',
      'ui.next': 'Nächstes Bild',
      'ui.dot': 'Bild {n} von {total}',
      'ui.carousel': 'Karussell',
      'ui.viewer': 'Bildansicht',
      'ui.close': 'Schließen',
      'ui.zoom': '{alt} – vergrößern',
      'ui.toDark': 'Dunkles Design aktivieren',
      'ui.toLight': 'Helles Design aktivieren',
      'ui.dark': 'Dunkles Design',
      'ui.light': 'Helles Design',
      'ui.top': 'Nach oben',
    },

    en: {
      'title': 'Omar Ziyada – Portfolio',
      'ui.lang': 'Choose language',
      'ui.prev': 'Previous image',
      'ui.next': 'Next image',
      'ui.dot': 'Image {n} of {total}',
      'ui.carousel': 'carousel',
      'ui.viewer': 'Image viewer',
      'ui.close': 'Close',
      'ui.zoom': '{alt} – enlarge',
      'ui.toDark': 'Switch to dark theme',
      'ui.toLight': 'Switch to light theme',
      'ui.dark': 'Dark theme',
      'ui.light': 'Light theme',
      'ui.top': 'Back to top',

      'hero.role': 'Backend Developer · Media Informatics (B.Sc.) · Bremen',
      'hero.intro': 'I build backend systems with Java and Spring Boot and design interfaces in Figma. I studied Media Informatics at Hochschule Bremen and gained hands-on experience as a backend developer at Webmen GmbH.',
      'hero.mail': 'Email me',
      'hero.alt': 'Portrait of Omar Ziyada',

      'cv.title': 'Career at a glance',
      'cv.job': 'Backend Development (Internship)',
      'cv.bsc': 'B.Sc. Media Informatics',
      'cv.bsc.place': 'Hochschule Bremen – City University of Applied Sciences',
      'cv.bsc.note': 'Semester abroad at GJU Amman · Erasmus+ BIP Groningen',
      'cv.mta': 'Mathematical-Technical Assistant (Business Informatics)',
      'cv.mta.place': 'School-based vocational training · Europaschule SZ Utbremen · incl. High School Diploma',
      'cv.mta.note': 'Programming, SAP, accounting',
      'cv.langs.label': 'Languages',
      'cv.langs': 'Arabic (native) · German (C1) · English (B2)',

      'skills.title': 'Skills',
      'skills.tools': 'Tools',
      'skills.methods': 'Methods &amp; AI',
      'skills.design': 'Design &amp; Media',
      'skills.erp': 'ERP systems',
      'tag.rest': 'REST APIs',
      'tag.testing': 'Software testing',
      'tag.ai': 'AI-assisted development',
      'tag.video': 'Video editing',
      'tag.comarch': 'Comarch (basics)',

      'projects.title': 'Projects',
      'p1.meta': 'Bachelor’s thesis · Team project · 2026',
      'p1.desc': 'Hochschule Bremen platform where students from all faculties showcase theses, projects and research, with a leaderboard, filters and reviews.',
      'p1.my': '<b>My part:</b> Full-stack development (Spring Boot + React/TypeScript), automated accessibility testing with Playwright and axe (target: WCAG 2.2 AA), Figma design system.',
      'p1.figma': 'Figma design ↗',
      'p1.shots': 'Screenshots of HSB E-Portfolio',
      'p1.alt1': 'E-Portfolio home page',
      'p1.alt2': 'E-Portfolio top 10',
      'p1.alt3': 'E-Portfolio project overview',
      'p2.meta': 'Networking platform · 2026',
      'p2.desc': 'Professional network for Syrian professionals worldwide: profiles with CVs, feed, projects, jobs and organization pages.',
      'p2.my': '<b>My part:</b> Backend development, plus selected frontend features.',
      'p2.shots': 'Screenshots of SyrLink',
      'p2.alt1': 'SyrLink feed',
      'p2.alt2': 'SyrLink profile',
      'p3.meta': 'Team project · Appointment booking for medical practices',
      'p3.desc': 'Web application for managing a practice’s appointments, patients, staff and services.',
      'p3.my': '<b>My part:</b> The backend API only (building the REST endpoints). The frontend was built by the team.',
      'p3.alt': 'MediBooker interface',
      'link.backend': 'Backend API ↗',
      'link.dashboard': 'Dashboard ↗',

      'design.title': 'Design in Figma',
      'design.open': 'Open in Figma ↗',
      'd1.label': 'UI / Design system',
      'd1.desc': 'Screens and design system of the E-Portfolio platform.',
      'd2.label': 'App concept',
      'd2.desc': 'Shared-flat app that prevents arguments: cleaning rota, shared shopping and anonymous feedback.',

      'more.title': 'More work',
      'game.desc': '2D arcade game built with Phaser: dodge, shoot, refuel.',
      'parti.desc': 'Civic participation app that lets people in Bremen report problems, share photos and propose projects. My part: backend API.',

      'footer.contact': 'Contact:',
      'footer.city': 'Bremen',
    },

    ar: {
      'title': 'Omar Ziyada · معرض الأعمال',
      'ui.lang': 'اختر اللغة',
      'ui.prev': 'الصورة السابقة',
      'ui.next': 'الصورة التالية',
      'ui.dot': 'الصورة {n} من {total}',
      'ui.carousel': 'عرض شرائح',
      'ui.viewer': 'عارض الصور',
      'ui.close': 'إغلاق',
      'ui.zoom': 'تكبير: {alt}',
      'ui.toDark': 'تفعيل الوضع الداكن',
      'ui.toLight': 'تفعيل الوضع الفاتح',
      'ui.dark': 'الوضع الداكن',
      'ui.light': 'الوضع الفاتح',
      'ui.top': 'العودة إلى الأعلى',

      'hero.role': 'مطوّر Backend · هندسة معلوماتية (<bdi>B.Sc.</bdi>) · بريمن',
      'hero.intro': 'أطوّر أنظمة Backend باستخدام Java وSpring Boot، وأصمّم الواجهات في Figma. درستُ الهندسة المعلوماتية في جامعة بريمن للعلوم التطبيقية، واكتسبت خبرة عملية في تطوير Backend لدى شركة Webmen GmbH.',
      'hero.mail': 'راسلني',
      'hero.alt': 'صورة شخصية: Omar Ziyada',

      'cv.title': 'المسيرة باختصار',
      'cv.job': 'تطوير Backend (تدريب عملي)',
      'cv.bsc': 'بكالوريوس هندسة معلوماتية (<bdi>B.Sc.</bdi>)',
      'cv.bsc.place': 'جامعة بريمن للعلوم التطبيقية (Hochschule Bremen)',
      'cv.bsc.note': 'فصل دراسي في الجامعة الألمانية الأردنية بعمّان · برنامج Erasmus+ BIP في خرونينغن',
      'cv.mta': 'مطوّر برمجيات ومحلل نظم معلومات الأعمال',
      'cv.mta.place': 'دبلوم مهني مدرسي · Europaschule SZ Utbremen · مع الشهادة الثانوية',
      'cv.mta.note': 'البرمجة وSAP والمحاسبة',
      'cv.langs.label': 'اللغات',
      'cv.langs': 'العربية (اللغة الأم) · الألمانية (C1) · الإنجليزية (B2)',

      'skills.title': 'المهارات',
      'skills.tools': 'الأدوات',
      'skills.methods': 'المنهجيات والذكاء الاصطناعي',
      'skills.design': 'التصميم والوسائط',
      'skills.erp': 'أنظمة ERP',
      'tag.rest': 'REST APIs',
      'tag.testing': 'اختبار البرمجيات',
      'tag.ai': 'التطوير بمساعدة الذكاء الاصطناعي',
      'tag.video': 'مونتاج الفيديو',
      'tag.comarch': 'Comarch (أساسيات)',

      'projects.title': 'المشاريع',
      'p1.meta': 'أطروحة البكالوريوس · مشروع جماعي · 2026',
      'p1.desc': 'منصة لجامعة بريمن للعلوم التطبيقية يعرض فيها طلاب جميع الكليات أعمال التخرج والمشاريع والأبحاث، وفيها قائمة للمتصدرين وأدوات تصفية ومراجعات.',
      'p1.my': '<b>دوري:</b> تطوير Full-Stack باستخدام Spring Boot وReact/TypeScript، واختبارات آلية لإمكانية الوصول عبر Playwright وaxe (الهدف WCAG 2.2 AA)، ونظام التصميم في Figma.',
      'p1.figma': 'التصميم في Figma ↗',
      'p1.shots': 'لقطات شاشة من HSB E-Portfolio',
      'p1.alt1': 'الصفحة الرئيسية في E-Portfolio',
      'p1.alt2': 'قائمة أفضل 10 مشاريع في E-Portfolio',
      'p1.alt3': 'صفحة المشاريع في E-Portfolio',
      'p2.meta': 'منصة تواصل مهني · 2026',
      'p2.desc': 'شبكة مهنية للكفاءات السورية حول العالم: ملفات شخصية مع السيرة الذاتية، وموجز منشورات، ومشاريع، ووظائف، وصفحات للمؤسسات.',
      'p2.my': '<b>دوري:</b> تطوير Backend، وبعض الميزات في الواجهة الأمامية.',
      'p2.shots': 'لقطات شاشة من SyrLink',
      'p2.alt1': 'موجز المنشورات في SyrLink',
      'p2.alt2': 'الملف الشخصي في SyrLink',
      'p3.meta': 'مشروع جماعي · حجز المواعيد في العيادات الطبية',
      'p3.desc': 'تطبيق ويب لإدارة مواعيد العيادة ومرضاها وموظفيها وخدماتها.',
      'p3.my': '<b>دوري:</b> تطوير Backend API وحده (نقاط REST)، وتولّى بقية الفريق الواجهة الأمامية.',
      'p3.alt': 'واجهة MediBooker',
      'link.backend': 'Backend API ↗',
      'link.dashboard': 'لوحة التحكم ↗',

      'design.title': 'التصميم في Figma',
      'design.open': 'افتح في Figma ↗',
      'd1.label': 'واجهات المستخدم / نظام التصميم',
      'd1.desc': 'شاشات منصة E-Portfolio ونظام تصميمها.',
      'd2.label': 'فكرة تطبيق',
      'd2.desc': 'تطبيق للسكن المشترك يقي من الخلافات: جدول للتنظيف، ومشتريات مشتركة، وملاحظات مجهولة الهوية.',

      'more.title': 'أعمال أخرى',
      'game.desc': 'لعبة Arcade ثنائية الأبعاد مبنية بإطار Phaser: تفادَ العقبات، وأطلق النار، واملأ الخزان.',
      'parti.desc': 'تطبيق للمشاركة المدنية يتيح لسكان بريمن الإبلاغ عن المشكلات ومشاركة الصور واقتراح المشاريع. دوري: Backend API.',

      'footer.contact': 'للتواصل:',
      'footer.city': 'بريمن',
    },
  };

  const CODES = { de: 'DE', en: 'EN', ar: 'AR' };

  function fromURL() {
    try {
      const l = new URLSearchParams(location.search).get('lang');
      return LANGS.includes(l) ? l : null;
    } catch (e) { return null; }
  }

  function saved() {
    try {
      const l = localStorage.getItem(KEY);
      return LANGS.includes(l) ? l : null;
    } catch (e) { return null; }
  }

  let lang = fromURL() || saved() || 'de';

  function t(key, vars) {
    let s = (T[lang] && T[lang][key]) ?? T.de[key] ?? key;
    if (vars) Object.keys(vars).forEach((k) => { s = s.split(`{${k}}`).join(vars[k]); });
    return s;
  }

  function setRootLang(l) {
    root.lang = l;
    root.dir = l === 'ar' ? 'rtl' : 'ltr';
  }

  // Sprache und Leserichtung sofort setzen. Bei EN/AR die Seite kurz verbergen,
  // bis die Texte getauscht sind (mit Sicherheitsnetz, falls etwas schiefgeht).
  setRootLang(lang);
  if (lang !== 'de') {
    root.classList.add('i18n-pending');
    setTimeout(() => root.classList.remove('i18n-pending'), 1500);
  }

  // Originaltexte (Deutsch) aus dem HTML merken
  const originals = new Map();
  const attrOriginals = new Map();

  function capture() {
    document.querySelectorAll('[data-i18n]').forEach((el) => originals.set(el, el.innerHTML));
    document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
      const map = {};
      el.dataset.i18nAttr.split(';').forEach((pair) => {
        const [attr] = pair.split(':').map((s) => s.trim());
        if (attr) map[attr] = el.getAttribute(attr);
      });
      attrOriginals.set(el, map);
    });
  }

  function translate(key, original) {
    if (lang === 'de') return original;
    return (T[lang] && T[lang][key]) ?? original;
  }

  function apply(next, { save = true } = {}) {
    lang = LANGS.includes(next) ? next : 'de';
    setRootLang(lang);

    originals.forEach((orig, el) => { el.innerHTML = translate(el.dataset.i18n, orig); });
    attrOriginals.forEach((map, el) => {
      el.dataset.i18nAttr.split(';').forEach((pair) => {
        const [attr, key] = pair.split(':').map((s) => s.trim());
        if (attr && key) el.setAttribute(attr, translate(key, map[attr]));
      });
    });
    document.title = t('title');

    // Sprachmenü aktualisieren
    const code = document.querySelector('.lang-code');
    if (code) code.textContent = CODES[lang];
    const btn = document.querySelector('.lang-btn');
    if (btn) btn.setAttribute('aria-label', t('ui.lang'));
    document.querySelectorAll('.lang-menu [data-lang]').forEach((b) => {
      b.setAttribute('aria-current', b.dataset.lang === lang ? 'true' : 'false');
    });

    if (save) {
      try { localStorage.setItem(KEY, lang); } catch (e) { /* z. B. privater Modus */ }
      try {
        const url = new URL(location.href);
        if (lang === 'de') url.searchParams.delete('lang');
        else url.searchParams.set('lang', lang);
        history.replaceState(null, '', url);
      } catch (e) { /* z. B. file:// */ }
    }

    document.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
  }

  // Sprachmenü in der Navigation
  function setupMenu() {
    const wrap = document.querySelector('.lang');
    if (!wrap) return;
    const btn = wrap.querySelector('.lang-btn');
    const menu = wrap.querySelector('.lang-menu');
    const items = Array.from(menu.querySelectorAll('[data-lang]'));

    function open() {
      menu.hidden = false;
      btn.setAttribute('aria-expanded', 'true');
      (items.find((i) => i.dataset.lang === lang) || items[0]).focus();
    }
    function close(focusBtn) {
      menu.hidden = true;
      btn.setAttribute('aria-expanded', 'false');
      if (focusBtn) btn.focus();
    }

    btn.addEventListener('click', () => (menu.hidden ? open() : close(false)));
    items.forEach((item) => item.addEventListener('click', () => {
      apply(item.dataset.lang);
      close(true);
    }));
    menu.addEventListener('keydown', (e) => {
      const i = items.indexOf(document.activeElement);
      if (e.key === 'ArrowDown') { e.preventDefault(); items[(i + 1) % items.length].focus(); }
      if (e.key === 'ArrowUp') { e.preventDefault(); items[(i - 1 + items.length) % items.length].focus(); }
      if (e.key === 'Escape') { e.preventDefault(); close(true); }
      if (e.key === 'Tab') close(false);
    });
    document.addEventListener('click', (e) => { if (!wrap.contains(e.target)) close(false); });
  }

  window.I18N = {
    t,
    get lang() { return lang; },
    set: (l) => apply(l),
  };

  document.addEventListener('DOMContentLoaded', () => {
    capture();
    apply(lang, { save: false });
    setupMenu();
    root.classList.remove('i18n-pending');
  });
})();
