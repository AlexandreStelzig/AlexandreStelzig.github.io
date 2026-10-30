(function () {
  var $ = function (s) { return document.querySelector(s); };
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- cozy assets (inline SVG, warm paper palette) ---------- */
  var INK = '#6b4a32', S = ' stroke="' + INK + '" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"';
  function svg(inner) { return '<svg viewBox="0 0 32 32" aria-hidden="true">' + inner + '</svg>'; }
  var ART = {
    moon: svg('<path d="M21 4a12 12 0 1 0 7 21A10 10 0 0 1 21 4z" fill="#f1d58a"' + S + '/><circle cx="26" cy="7" r="1.4" fill="#f1d58a"/>'),
    fish: svg('<path d="M3 16C7 9 17 8 22 14l7-6v16l-7-6C17 24 7 23 3 16z" fill="#e4896a"' + S + '/><circle cx="9" cy="14.5" r="1.3" fill="' + INK + '"/>'),
    mug: svg('<path d="M6 12h16v9a6 6 0 0 1-6 6h-4a6 6 0 0 1-6-6z" fill="#d98a6c"' + S + '/><path d="M22 14h2a3.5 3.5 0 0 1 0 7h-2" fill="none"' + S + '/><path d="M11 8c0-2 2-2 2-4M17 8c0-2 2-2 2-4" fill="none"' + S + '/>'),
    acorn: svg('<path d="M7 14h18c0 8-4 14-9 14s-9-6-9-14z" fill="#d9a066"' + S + '/><path d="M6 14c0-5 4-8 10-8s10 3 10 8z" fill="#8a5a3c"' + S + '/><path d="M16 6V3" fill="none"' + S + '/>'),
    xylo: svg('<rect x="3" y="5" width="5" height="22" rx="2" fill="#d98a6c"' + S + '/><rect x="9.5" y="8" width="5" height="19" rx="2" fill="#e5b84c"' + S + '/><rect x="16" y="11" width="5" height="16" rx="2" fill="#8fae86"' + S + '/><rect x="22.5" y="14" width="5" height="13" rx="2" fill="#86a9c4"' + S + '/>'),
    bubbles: svg('<circle cx="11" cy="20" r="7" fill="#cfe3ea"' + S + '/><circle cx="23" cy="11" r="4.5" fill="#cfe3ea"' + S + '/><path d="M8 18a4 4 0 0 1 3-3" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/>'),
    leaf: svg('<path d="M5 27C5 12 14 5 27 5c0 13-7 22-20 22z" fill="#8fae86"' + S + '/><path d="M5 27L19 13" fill="none"' + S + '/>'),
    star: svg('<path d="M16 4l3.2 7 7.6.8-5.7 5.2 1.6 7.5L16 20.6 9.3 24.5l1.6-7.5L5.2 11.8l7.6-.8z" fill="#f1d58a"' + S + '/>'),
    coin: svg('<circle cx="16" cy="16" r="11" fill="#e5b84c"' + S + '/><path d="M16 10v12M12.5 13.5h6a2 2 0 0 1 0 4h-5" fill="none"' + S + '/>'),
    note: svg('<path d="M12 24V7l13-3v17" fill="none"' + S + '/><ellipse cx="9" cy="24" rx="4.5" ry="3.5" fill="#d98a6c"' + S + '/><ellipse cx="22" cy="21" rx="4.5" ry="3.5" fill="#d98a6c"' + S + '/>'),
  };
  function paintAssets() {
    document.querySelectorAll('[data-asset]').forEach(function (el) { if (!el.firstChild) el.innerHTML = ART[el.dataset.asset]; });
  }

  /* ---------- soft sounds (WebAudio, only ever after a click) ---------- */
  var ac;
  function ctx() { try { ac = ac || new (window.AudioContext || window.webkitAudioContext)(); if (ac.state === 'suspended') ac.resume(); } catch (e) {} return ac; }
  function tone(freq, when, dur, type, vol) {
    var a = ctx(); if (!a) return;
    var t = a.currentTime + (when || 0), o = a.createOscillator(), g = a.createGain();
    o.type = type || 'sine'; o.frequency.value = freq;
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol || 0.18, t + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, t + (dur || 0.6));
    o.connect(g); g.connect(a.destination); o.start(t); o.stop(t + (dur || 0.6) + 0.05);
  }
  var SCALE = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66, 1318.51, 1568];
  function bar(freq) { tone(freq, 0, 0.9, 'sine', 0.2); tone(freq * 4, 0, 0.18, 'sine', 0.05); }
  var SOUND = {
    chime: function () { [0, 2, 4].forEach(function (n, i) { tone(SCALE[n + 2], i * 0.09, 0.7, 'sine', 0.1); }); },
    lullaby: function () { tone(392, 0, 1.2, 'sine', 0.12); tone(330, 0.35, 1.4, 'sine', 0.1); },
    blip: function () { tone(500, 0, 0.12, 'sine', 0.14); tone(760, 0.07, 0.14, 'sine', 0.1); },
    ding: function () { tone(1318, 0, 1, 'triangle', 0.1); tone(1975, 0, 0.5, 'sine', 0.05); },
    hello: function () { tone(523.25, 0, 0.5, 'sine', 0.1); tone(659.25, 0.12, 0.6, 'sine', 0.1); },
    leaf: function () { tone(698, 0, 0.5, 'triangle', 0.07); }
  };

  /* ---------- particles: small asset bursts, no emoji ---------- */
  function burst(x, y, kinds, n) {
    if (reduce) return;
    for (var i = 0; i < n; i++) {
      var e = document.createElement('span'); e.className = 'pop'; e.innerHTML = ART[kinds[i % kinds.length]];
      e.style.left = x + 'px'; e.style.top = y + 'px';
      e.style.setProperty('--dx', (Math.random() - .5) * 140 + 'px'); e.style.setProperty('--dy', (-40 - Math.random() * 90) + 'px'); e.style.setProperty('--r', (Math.random() - .5) * 120 + 'deg');
      document.body.appendChild(e); setTimeout(e.remove.bind(e), 1100);
    }
  }
  function shower() {
    if (reduce) return;
    for (var i = 0; i < 26; i++) setTimeout(function () { burst(Math.random() * innerWidth, -10, ['leaf', 'leaf', 'star', 'acorn'], 1); }, i * 90);
  }

  /* ---------- the collection shelf ---------- */
  var ITEMS = [
    { k: 'avatar', art: 'mug', name: 'A warm hello', hint: 'Say hello to me. Click my photo a few times.' },
    { k: 'brand', art: 'acorn', name: 'Acorn', hint: 'There is a little something next to my name, up in the nav.' },
    { k: 'xylo', art: 'xylo', name: 'Xylophone', hint: 'Some letters in the big headline sing when you click them. Play a few.' },
    { k: 'moon', art: 'moon', name: 'Sleepy moon', hint: 'Someone is resting on the BetterSleep card.' },
    { k: 'fish', art: 'fish', name: 'Fish', hint: 'Something is swimming by the projects. Catch it.' }
  ];
  /* progress lives in localStorage; window.name is a backup so it also follows you between
     pages opened straight from disk (file://), where some browsers isolate each file's storage */
  function load() {
    var a = {}, b = {};
    try { a = JSON.parse(localStorage.getItem('eggs') || '{}'); } catch (e) {}
    try { if (/^eggs=/.test(window.name)) b = JSON.parse(window.name.slice(5)); } catch (e) {}
    var m = {}; for (var k in b) m[k] = b[k]; for (k in a) m[k] = a[k];
    return m;
  }
  function save() {
    try { localStorage.setItem('eggs', JSON.stringify(found)); } catch (e) {}
    try { window.name = 'eggs=' + JSON.stringify(found); } catch (e) {}
  }
  var found = load();


  var shelf = $('#hunt');
  if (!shelf) { shelf = document.createElement('div'); shelf.id = 'hunt'; shelf.className = 'hunt'; document.body.appendChild(shelf); }
  shelf.setAttribute('role', 'group'); shelf.setAttribute('aria-label', 'Collection of little secrets');
  shelf.innerHTML = ITEMS.map(function (it) { return '<button class="slot" data-k="' + it.k + '" data-hint="' + it.hint + '" aria-label="' + it.hint + '">' + ART[it.art] + '</button>'; }).join('');
  function count() { return ITEMS.filter(function (it) { return found[it.k]; }).length; }
  function paint() {
    ITEMS.forEach(function (it) { shelf.querySelector('[data-k=' + it.k + ']').classList.toggle('on', !!found[it.k]); });
    shelf.classList.toggle('complete', count() === ITEMS.length);
  }
  function find(key, sound, x, y, kinds) {
    if (sound) SOUND[sound]();
    if (kinds) burst(x, y, kinds, 5);
    if (found[key]) return;
    found[key] = 1; save();
    paint();
    var slot = shelf.querySelector('[data-k=' + key + ']'); slot.classList.remove('pop-in'); void slot.offsetWidth; slot.classList.add('pop-in');
    setTimeout(SOUND.chime, 250);
    if (count() === ITEMS.length) { setTimeout(shower, 700); setTimeout(openReward, 1900); }
  }
  paintAssets(); paint();

  /* stay in sync with other tabs and with pages restored from the back/forward cache */
  function resync() {
    found = load();
    paint();
    document.querySelectorAll('.egg').forEach(function (b) { b.classList.toggle('found', !!found[b.dataset.egg]); });
  }
  addEventListener('pageshow', resync);
  addEventListener('storage', function (e) { if (e.key === 'eggs') resync(); });

  /* reward dialog: shown once everything is found */
  var rw = document.createElement('dialog');
  rw.className = 'exp-modal reward-dialog'; rw.setAttribute('aria-label', 'You found everything');
  document.body.appendChild(rw);
  function openReward() {
    if (dlg.open) dlg.close();
    rw.innerHTML = '<button class="exp-modal-close" aria-label="Close">&times;</button>' +
      '<div class="reward-art">' + ITEMS.map(function (it) { return '<span>' + ART[it.art] + '</span>'; }).join('') + '</div>' +
      '<h3 class="hint-title">You found everything</h3>' +
      '<p class="reward-text">Thanks for poking around. I like sweating the small details, and I would love to bring that care to your next mobile app. If you are hiring, or just want to talk apps, say hello.</p>' +
      '<div class="reward-links">' +
        '<a class="primary" href="mailto:alexandre.stelzig@gmail.com">Email me</a>' +
        '<a href="projects/AlexandreStelzigResume.pdf" target="_blank" rel="noopener">Resume</a>' +
        '<a href="https://www.linkedin.com/in/alexstelzig/" target="_blank" rel="noopener">LinkedIn</a>' +
        '<a href="https://github.com/AlexandreStelzig" target="_blank" rel="noopener">GitHub</a>' +
      '</div>';
    if (!rw.open) rw.showModal();
  }
  rw.addEventListener('click', function (e) { if (e.target === rw || e.target.classList.contains('exp-modal-close')) rw.close(); });

  /* hints dialog */
  var dlg = document.createElement('dialog');
  dlg.className = 'exp-modal hint-dialog'; dlg.setAttribute('aria-label', 'Little secrets');
  document.body.appendChild(dlg);
  function openHints() {
    dlg.innerHTML = '<button class="exp-modal-close" aria-label="Close">&times;</button>' +
      '<h3 class="hint-title">Little secrets</h3>' +
      '<p class="hint-count">' + count() + ' of ' + ITEMS.length + ' found</p>' +
      '<ul class="hint-list">' + ITEMS.map(function (it) {
        var on = !!found[it.k];
        return '<li class="' + (on ? 'on' : '') + '"><span class="hint-art">' + ART[it.art] + '</span><span><b>' + (on ? it.name : '???') + '</b><small>' + it.hint + '</small></span></li>';
      }).join('') + '</ul>' +
      (count() === ITEMS.length ? '<button class="hint-reward" type="button">See your reward</button>' : '') +
      '<button class="hint-reset" type="button"' + (count() ? '' : ' disabled') + '>Start over</button>';
    if (!dlg.open) dlg.showModal();
  }
  dlg.addEventListener('click', function (e) {
    if (e.target === dlg || e.target.classList.contains('exp-modal-close')) { dlg.close(); return; }
    if (e.target.closest('.hint-reward')) { openReward(); return; }
    var rb = e.target.closest('.hint-reset'); if (!rb) return;
    if (!rb.classList.contains('sure')) { rb.classList.add('sure'); rb.textContent = 'Click again to clear your finds'; return; }
    found = {}; save();
    avClicks = 0; plays = 0; paint();
    document.querySelectorAll('.egg').forEach(function (b) { b.classList.remove('found'); });
    openHints();
  });
  shelf.addEventListener('click', openHints);

  /* avatar */
  var av = $('#avatar'), avClicks = 0;
  if (av) av.addEventListener('click', function (e) {
    av.classList.remove('boing'); void av.offsetWidth; av.classList.add('boing');
    SOUND.hello(); burst(e.clientX, e.clientY, ['leaf'], 2);
    if (++avClicks === 3) find('avatar', null, e.clientX, e.clientY);
  });

  /* brand acorn */
  var br = $('#brand');
  if (br) br.addEventListener('click', function (e) { find('brand', 'leaf', e.clientX, e.clientY, ['leaf', 'acorn']); });

  /* clickable assets */
  var EGG = {
    moon: ['lullaby', ['star', 'star']],
    fish: ['blip', ['bubbles', 'bubbles']]
  };
  document.querySelectorAll('.egg').forEach(function (b) {
    if (found[b.dataset.egg]) b.classList.add('found');
    b.addEventListener('click', function (e) {
      e.stopPropagation(); e.preventDefault();
      var r = b.getBoundingClientRect(), d = EGG[b.dataset.egg];
      find(b.dataset.egg, d[0], r.left + r.width / 2, r.top + r.height / 2, d[1]);
      b.classList.add('found');
    });
  });


  /* xylophone letters in the hero headline */
  var h1 = $('.hero h1');
  if (h1) {
    h1.setAttribute('aria-label', h1.textContent.replace(/\s+/g, ' ').trim());
    var idx = 0, walk = function (node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (n) {
        if (n.nodeType === 3) {
          var frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(function (w) {
            if (!w) return;
            if (/^\s+$/.test(w)) { frag.appendChild(document.createTextNode(' ')); return; }
            var word = document.createElement('span'); word.className = 'word';
            w.split('').forEach(function (c) {
              var ch = document.createElement('span'); ch.className = 'ch'; ch.textContent = c; ch.setAttribute('aria-hidden', 'true');
              ch.style.setProperty('--i', idx++); word.appendChild(ch);
            });
            frag.appendChild(word);
          });
          node.replaceChild(frag, n);
        } else if (n.nodeType === 1) walk(n);
      });
    };
    walk(h1);
    var plays = 0;
    h1.addEventListener('click', function (e) {
      var ch = e.target.closest('.ch'); if (!ch) return;
      var code = ch.textContent.toLowerCase().charCodeAt(0);
      bar(SCALE[code % SCALE.length]);
      ch.classList.remove('ring'); void ch.offsetWidth; ch.classList.add('ring');
      if (++plays === 8) find('xylo', null, e.clientX, e.clientY, ['note', 'note']);
    });
  }


  /* email: copy, confirm inline (no popup) */
  var em = $('#email');
  if (em) em.addEventListener('click', function (e) {
    if (!navigator.clipboard) return;
    e.preventDefault(); navigator.clipboard.writeText('alexandre.stelzig@gmail.com');
    var t = em.textContent; em.textContent = 'Copied to clipboard'; setTimeout(function () { em.textContent = t; }, 1600);
  });

  /* scroll reveal + progress */
  var targets = document.querySelectorAll('.exp-card, .project-card, .section-header, .contact-content');
  targets.forEach(function (el, i) { el.classList.add('reveal'); el.style.setProperty('--d', (i % 3) * 0.08 + 's'); });
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (en) { en.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target); } }); }, { threshold: .12 });
    targets.forEach(function (t) { io.observe(t); });
  } else targets.forEach(function (t) { t.classList.add('in'); });
  var pg = $('#progress');
  if (pg) addEventListener('scroll', function () { pg.style.width = (scrollY / (document.documentElement.scrollHeight - innerHeight) * 100) + '%'; }, { passive: true });
})();
