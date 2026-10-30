(function () {
  var $ = function (s) { return document.querySelector(s); };
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- cozy assets (inline SVG, warm paper palette) ---------- */
  var INK = '#6b4a32', S = ' stroke="' + INK + '" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"';
  function svg(inner) { return '<svg viewBox="0 0 32 32" aria-hidden="true">' + inner + '</svg>'; }
  var ART = {
    moon: svg('<path d="M21 4a12 12 0 1 0 7 21A10 10 0 0 1 21 4z" fill="#f1d58a"' + S + '/><circle cx="26" cy="7" r="1.4" fill="#f1d58a"/>'),
    dog: svg('<g class="legs" fill="none"' + S + '><path d="M8 23v6M12.500 24v5M19 24v5M23 23v6"/></g><g class="dog-body"><path class="tail" d="M7 21C3 20 2 15 4 12" fill="none"' + S + '/><ellipse cx="15" cy="22" rx="11" ry="6.5" fill="#f3e1c8"' + S + '/><circle cx="24" cy="19" r="5.5" fill="#f3e1c8"' + S + '/><path d="M20.5 15.5c-2-1-3.500 1-3 4 2-.5 3.200-2 3-4z" fill="#d9a066"' + S + '/><path class="eye-z" d="M23 19.500q1.500 1.200 3 0" fill="none"' + S + '/><circle class="eye-o" cx="25" cy="18.500" r="1.300" fill="' + INK + '"/><circle cx="28.500" cy="20.500" r="1.100" fill="' + INK + '"/></g>'),
    paw: svg('<ellipse cx="16" cy="21" rx="6" ry="5" fill="#d98a6c"/><circle cx="8" cy="14" r="2.600" fill="#d98a6c"/><circle cx="13" cy="9" r="2.600" fill="#d98a6c"/><circle cx="19" cy="9" r="2.600" fill="#d98a6c"/><circle cx="24" cy="14" r="2.600" fill="#d98a6c"/>'),
    mug: svg('<path d="M6 12h16v9a6 6 0 0 1-6 6h-4a6 6 0 0 1-6-6z" fill="#d98a6c"' + S + '/><path d="M22 14h2a3.5 3.5 0 0 1 0 7h-2" fill="none"' + S + '/><path d="M11 8c0-2 2-2 2-4M17 8c0-2 2-2 2-4" fill="none"' + S + '/>'),
    acorn: svg('<path d="M7 14h18c0 8-4 14-9 14s-9-6-9-14z" fill="#d9a066"' + S + '/><path d="M6 14c0-5 4-8 10-8s10 3 10 8z" fill="#8a5a3c"' + S + '/><path d="M16 6V3" fill="none"' + S + '/>'),
    xylo: svg('<rect x="3" y="5" width="5" height="22" rx="2" fill="#d4825f"' + S + '/><rect x="9.5" y="8" width="5" height="19" rx="2" fill="#cfa23a"' + S + '/><rect x="16" y="11" width="5" height="16" rx="2" fill="#7a9c6a"' + S + '/><rect x="22.5" y="14" width="5" height="13" rx="2" fill="#8c78b0"' + S + '/>'),
    sprout: svg('<path d="M16 26v-9" fill="none"' + S + '/><path d="M16 19c-1-5-5-6-9-5 0 4 4 6 9 5z" fill="#8fae86"' + S + '/><path d="M16 17c1-5 5-6 9-5 0 4-4 6-9 5z" fill="#8fae86"' + S + '/><path d="M6 27c3-3 17-3 20 0z" fill="#8a5a3c"' + S + '/>'),
    sapling: svg('<path d="M16 26V9" fill="none"' + S + '/><path d="M16 22c-1-4-5-5-9-4 0 4 4 5 9 4z" fill="#8fae86"' + S + '/><path d="M16 19c1-4 5-5 9-4 0 4-4 5-9 4z" fill="#8fae86"' + S + '/><path d="M16 14c-1-4-4-6-8-5 0 4 3 6 8 5z" fill="#8fae86"' + S + '/><path d="M16 11c1-4 4-6 8-5 0 4-3 6-8 5z" fill="#8fae86"' + S + '/><path d="M6 27c3-3 17-3 20 0z" fill="#8a5a3c"' + S + '/>'),
    tree: svg('<path d="M14 28V19h4v9z" fill="#8a5a3c"' + S + '/><circle cx="9.500" cy="15" r="5.500" fill="#8fae86"' + S + '/><circle cx="22.500" cy="15" r="5.500" fill="#8fae86"' + S + '/><circle cx="16" cy="10.500" r="7" fill="#8fae86"' + S + '/>'),
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
  var lullabyEnds = 0;
  function woof(when, f0) {
    var a = ctx(); if (!a) return;
    /* a small dog's yap: harsh voice (saw + noise) with a quick pitch pop, shaped by two vowel formants */
    var t = a.currentTime + when, o = a.createOscillator(), env = a.createGain(), out = a.createGain();
    o.type = 'sawtooth';
    o.frequency.setValueAtTime(f0 * 0.85, t); o.frequency.exponentialRampToValueAtTime(f0 * 1.35, t + 0.025); o.frequency.exponentialRampToValueAtTime(f0 * 0.7, t + 0.15);
    env.gain.setValueAtTime(0.0001, t); env.gain.exponentialRampToValueAtTime(1, t + 0.006); env.gain.exponentialRampToValueAtTime(0.0001, t + 0.16);
    out.gain.value = 0.55; out.connect(a.destination);
    var len = Math.floor(a.sampleRate * 0.16), buf = a.createBuffer(1, len, a.sampleRate), d = buf.getChannelData(0);
    for (var i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    var s = a.createBufferSource(), ng = a.createGain(); s.buffer = buf; ng.gain.value = 0.5;
    [[850, 600, 5], [1900, 1300, 6]].forEach(function (fm) {
      var bp = a.createBiquadFilter(); bp.type = 'bandpass'; bp.Q.value = fm[2];
      bp.frequency.setValueAtTime(fm[0], t); bp.frequency.exponentialRampToValueAtTime(fm[1], t + 0.15);
      o.connect(bp); s.connect(ng); ng.connect(bp); bp.connect(env);
    });
    env.connect(out); o.start(t); o.stop(t + 0.18); s.start(t);
  }
  var SCALE =[523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66, 1318.51, 1568];
  function bar(freq) { tone(freq, 0, 0.9, 'sine', 0.2); tone(freq * 4, 0, 0.18, 'sine', 0.05); }
  var SOUND = {
    chime: function () { [0, 2, 4].forEach(function (n, i) { tone(SCALE[n + 2], i * 0.09, 0.7, 'sine', 0.1); }); },
    /* the opening of Brahms' Lullaby on a music box; ignored while it is still playing */
    lullaby: function () {
      var a = ctx(); if (!a || a.currentTime < lullabyEnds) return;
      var E = 659.25, G = 783.99, C = 1046.5, B = 987.77, A = 880, beat = 0.4, at = 0;
      /* 3/4 time: pickup, then E E G (held) E E G (held) E G C (held) B, A A G (held) */
      [[E, .5], [E, .5], [G, 2], [E, .5], [E, .5], [G, 2], [E, .5], [G, .5], [C, 2], [B, 1], [A, .5], [A, .5], [G, 3]].forEach(function (n) {
        var w = at * beat;
        tone(n[0], w, 1.6, 'sine', 0.07); tone(n[0] * 2.01, w, 0.5, 'sine', 0.018); tone(n[0] * 4.02, w, 0.2, 'sine', 0.006);
        tone(n[0], w + 0.2, 1, 'sine', 0.02);
        at += n[1];
      });
      lullabyEnds = a.currentTime + at * beat + 0.6;
    },
    /* two woofs: a buzzy voice that drops in pitch through a vowel-ish filter, with a puff of breath */
    bark: function () { woof(0, 470); woof(0.24, 510); },
    ding: function () { tone(1318, 0, 1, 'triangle', 0.1); tone(1975, 0, 0.5, 'sine', 0.05); },
    hello: function () { tone(523.25, 0, 0.5, 'sine', 0.1); tone(659.25, 0.12, 0.6, 'sine', 0.1); },
    leaf: function () { tone(698, 0, 0.5, 'triangle', 0.07); },
    /* a tree growing: a slow upward creak, a soft note as each stage unfurls, then leaves rustling */
    grow: function () {
      var a = ctx(); if (!a) return;
      var t = a.currentTime, o = a.createOscillator(), g = a.createGain();
      o.type = 'triangle'; o.frequency.setValueAtTime(140, t); o.frequency.exponentialRampToValueAtTime(330, t + 1.5);
      g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.05, t + 0.4); g.gain.exponentialRampToValueAtTime(0.0001, t + 1.6);
      o.connect(g); g.connect(a.destination); o.start(t); o.stop(t + 1.7);
      [262, 330, 392, 523].forEach(function (f, i) { tone(f, i * 0.45, 0.8, 'sine', 0.08); });
      var len = Math.floor(a.sampleRate * 1.1), buf = a.createBuffer(1, len, a.sampleRate), d = buf.getChannelData(0);
      for (var i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
      var s = a.createBufferSource(), f = a.createBiquadFilter(), n = a.createGain(), st = t + 1.2;
      s.buffer = buf; f.type = 'bandpass'; f.frequency.value = 4000; f.Q.value = 0.7;
      n.gain.setValueAtTime(0.0001, st); n.gain.exponentialRampToValueAtTime(0.05, st + 0.25); n.gain.exponentialRampToValueAtTime(0.0001, st + 1.1);
      s.connect(f); f.connect(n); n.connect(a.destination); s.start(st);
    }
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
  /* confetti on a canvas that fills the screen; a manual popover puts it in the top layer so it also covers the dialog */
  function confetti() {
    if (reduce) return;
    var W = innerWidth, H = innerHeight, dpr = Math.min(devicePixelRatio || 1, 2);
    var c = document.createElement('canvas'); c.className = 'confetti'; c.setAttribute('popover', 'manual');
    c.width = W * dpr; c.height = H * dpr; document.body.appendChild(c);
    try { c.showPopover(); } catch (e) {}
    var g = c.getContext('2d'); g.scale(dpr, dpr);
    var cols = ['#e4896a', '#e5b84c', '#8fae86', '#86a9c4', '#f1d58a', '#d98a6c'], ps = [], i;
    function add(x, y, vx, vy) {
      ps.push({ x: x, y: y, vx: vx, vy: vy, w: 6 + Math.random() * 6, h: 4 + Math.random() * 5, r: Math.random() * 6.28, vr: (Math.random() - .5) * .3, ph: Math.random() * 6.28, c: cols[Math.floor(Math.random() * cols.length)] });
    }
    for (i = 0; i < 70; i++) add(Math.random() * W, -20 - Math.random() * H * .6, (Math.random() - .5) * 2, 1 + Math.random() * 2);
    for (i = 0; i < 40; i++) add(0, H, 5 + Math.random() * 7, -(13 + Math.random() * 9));
    for (i = 0; i < 40; i++) add(W, H, -(5 + Math.random() * 7), -(13 + Math.random() * 9));
    var t0 = performance.now();
    (function frame(now) {
      g.clearRect(0, 0, W, H);
      var alive = 0;
      ps.forEach(function (p) {
        p.vx *= .98; p.vy = p.vy * .975 + .22; p.ph += .08;
        p.x += p.vx + Math.sin(p.ph) * .6; p.y += p.vy; p.r += p.vr;
        if (p.y > H + 20) return;
        alive++;
        g.save(); g.translate(p.x, p.y); g.rotate(p.r); g.fillStyle = p.c; g.fillRect(-p.w / 2, -p.h / 2, p.w, p.h); g.restore();
      });
      if (alive && now - t0 < 8000) requestAnimationFrame(frame); else c.remove();
    })(t0);
  }

  /* ---------- the collection shelf ---------- */
  var ITEMS = [
    { k: 'avatar', art: 'mug', name: 'A warm hello', hint: 'Say hello to me. Click my photo a few times.' },
    { k: 'brand', art: 'acorn', name: 'Acorn', hint: 'An acorn is tucked into the corner of a project card. Plant it.' },
    { k: 'xylo', art: 'xylo', name: 'Xylophone', hint: 'Keep clicking the big headline letters. About 5 clicks and they sing.' },
    { k: 'moon', art: 'moon', name: 'Sleepy moon', hint: 'Someone is resting on the BetterSleep card.' },
    { k: 'dog', art: 'dog', name: 'Sleepy pup', hint: 'Someone is napping at the very bottom of the page. Wake them up.' }
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
    ITEMS.forEach(function (it) {
      shelf.querySelector('[data-k=' + it.k + ']').classList.toggle('on', !!found[it.k]);
      document.documentElement.classList.toggle('has-' + it.k, !!found[it.k]);
    });
    shelf.classList.toggle('complete', count() === ITEMS.length);
    var hf = $('#hunt-found'); if (hf) hf.textContent = count();
    var hh = $('#hero-hunt'); if (hh) hh.classList.toggle('done', count() === ITEMS.length);
    document.documentElement.style.setProperty('--found', count());
    paintUnlocked();
  }
  /* what each secret changes on the page once it is found */
  function paintUnlocked() {
    var sp = $('.brand-spark');
    if (sp && !growing) sp.innerHTML = ART[found.brand ? 'tree' : 'acorn'];
  }
  function find(key, sound, x, y, kinds) {
    if (sound) SOUND[sound]();
    if (kinds) burst(x, y, kinds, 5);
    if (found[key]) return;
    found[key] = 1; save();
    var slot = shelf.querySelector('[data-k=' + key + ']'), it = ITEMS.filter(function (i) { return i.k === key; })[0];
    slot.classList.add('await'); paint();
    setTimeout(function () {
      fly(it, x, y, slot, function () {
        slot.classList.remove('await', 'pop-in'); void slot.offsetWidth; slot.classList.add('pop-in');
        SOUND.chime();
        if (count() === ITEMS.length) setTimeout(function () { openReward(); confetti(); }, 600);
      });
    }, key === 'brand' && !reduce ? 1500 : 0); /* let the acorn finish growing first */
  }
  /* the found item pops up where it was discovered, then arcs over to its slot on the shelf */
  function fly(it, x, y, slot, done) {
    if (reduce || !slot.animate) { done(); return; }
    var s = slot.getBoundingClientRect(), tx = s.left + s.width / 2, ty = s.top + s.height / 2;
    /* keep the pop-up fully on screen and below the nav, even when found near an edge */
    if (x == null) { x = innerWidth / 2; y = innerHeight / 2; }
    x = Math.min(Math.max(x, 50), innerWidth - 50); y = Math.min(Math.max(y, 110), innerHeight - 90);
    var el = document.createElement('span'); el.className = 'flyer'; el.innerHTML = ART[it.art];
    el.style.left = x - 24 + 'px'; el.style.top = y - 24 + 'px'; document.body.appendChild(el);
    burst(x, y, ['star', 'star'], 4);
    var dx = tx - x, dy = ty - y;
    el.animate([
      { transform: 'translate(0,0) scale(.3) rotate(-20deg)', opacity: 0, easing: 'cubic-bezier(.34,1.56,.64,1)' },
      { transform: 'translate(0,-20px) scale(1.5) rotate(8deg)', opacity: 1, offset: .25, easing: 'ease-in-out' },
      { transform: 'translate(0,-24px) scale(1.55) rotate(-6deg)', opacity: 1, offset: .42, easing: 'ease-in' },
      { transform: 'translate(' + dx * .55 + 'px,' + (dy * .55 - 80) + 'px) scale(1.05) rotate(10deg)', opacity: 1, offset: .75, easing: 'ease-out' },
      { transform: 'translate(' + dx + 'px,' + dy + 'px) scale(.6) rotate(0)', opacity: 1 }
    ], { duration: 1300 }).onfinish = function () { el.remove(); done(); };
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
      '<p class="reward-text">Thanks for poking around. I like sweating the small details, and I would love to bring that care to your next project. If you are hiring, or just want to talk shop, say hello.</p>' +
      '<a class="reward-go" href="#projects" data-go>Continue exploring</a>' +
      '<div class="reward-links">' +
        '<a href="mailto:alexandre.stelzig@gmail.com">Email me</a>' +
        '<a href="projects/AlexandreStelzigResume.pdf" target="_blank" rel="noopener">Resume</a>' +
        '<a href="https://www.linkedin.com/in/alexstelzig/" target="_blank" rel="noopener">LinkedIn</a>' +
        '<a href="https://github.com/AlexandreStelzig" target="_blank" rel="noopener">GitHub</a>' +
      '</div>' +
      '<button class="hint-reset" type="button">Start over</button>';
    if (!rw.open) rw.showModal();
  }
  rw.addEventListener('click', function (e) {
    if (e.target === rw || e.target.classList.contains('exp-modal-close')) { rw.close(); return; }
    if (e.target.closest('[data-go]')) rw.close();
    var rb = e.target.closest('.hint-reset'); if (rb) confirmReset(rb, function () { rw.close(); openHints(); });
  });
  function confirmReset(btn, done) {
    if (!btn.classList.contains('sure')) { btn.classList.add('sure'); btn.textContent = 'Click again to clear your finds'; return; }
    found = {}; save();
    avClicks = 0; plays = 0; paint();
    document.querySelectorAll('.egg').forEach(function (b) { b.classList.remove('found'); });
    done();
  }

  /* hints dialog */
  var dlg = document.createElement('dialog');
  dlg.className = 'exp-modal hint-dialog'; dlg.setAttribute('aria-label', 'Little secrets');
  document.body.appendChild(dlg);
  function openHints() {
    if (count() === ITEMS.length) { openReward(); return; }
    dlg.innerHTML = '<button class="exp-modal-close" aria-label="Close">&times;</button>' +
      '<h3 class="hint-title">Little secrets</h3>' +
      '<p class="hint-count">' + count() + ' of ' + ITEMS.length + ' found</p>' +
      '<ul class="hint-list">' + ITEMS.map(function (it) {
        var on = !!found[it.k];
        return '<li class="' + (on ? 'on' : '') + '"><span class="hint-art">' + ART[it.art] + '</span><span><b>' + (on ? it.name : '???') + '</b><small>' + it.hint + '</small></span></li>';
      }).join('') + '</ul>' +
      '<button class="hint-reset" type="button"' + (count() ? '' : ' disabled') + '>Start over</button>';
    if (!dlg.open) dlg.showModal();
  }
  dlg.addEventListener('click', function (e) {
    if (e.target === dlg || e.target.classList.contains('exp-modal-close')) { dlg.close(); return; }
    var rb = e.target.closest('.hint-reset'); if (rb) confirmReset(rb, openHints);
  });
  shelf.addEventListener('click', openHints);
  var heroHunt = $('#hero-hunt');
  if (heroHunt) { heroHunt.addEventListener('click', openHints); heroHunt.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openHints(); } }); }

  /* avatar */
  var av = $('#avatar'), avClicks = 0;
  if (av) av.addEventListener('click', function (e) {
    av.classList.remove('boing'); void av.offsetWidth; av.classList.add('boing');
    SOUND.hello(); burst(e.clientX, e.clientY, ['leaf'], 2);
    if (++avClicks === 3) find('avatar', null, e.clientX, e.clientY);
  });

  /* brand acorn */
  var br = $('#brand');
  /* the acorn grows into a tree; every click replays it and the tree is where it rests */
  var growing = false;
  function grow(x, y) {
    var sp = $('.brand-spark'); if (!sp || growing) return;
    growing = true; SOUND.grow();
    ['acorn', 'sprout', 'sapling', 'tree'].forEach(function (stage, i) {
      setTimeout(function () {
        sp.innerHTML = ART[stage]; sp.classList.remove('grow'); void sp.offsetWidth; sp.classList.add('grow');
        if (i === 3) { growing = false; burst(x, y, ['leaf', 'leaf', 'acorn'], 4); }
      }, reduce ? 0 : i * 450);
    });
  }
  if (br) br.addEventListener('click', function (e) {
    e.stopPropagation(); e.preventDefault();
    grow(e.clientX, e.clientY);
    find('brand', null, e.clientX, e.clientY);
  });

  /* clickable assets */
  var EGG = {
    moon: ['lullaby', ['star', 'star']],
    dog: ['bark', ['paw', 'paw', 'star']]
  };
  document.querySelectorAll('.egg').forEach(function (b) {
    if (found[b.dataset.egg]) b.classList.add('found');
    b.addEventListener('click', function (e) {
      e.stopPropagation(); e.preventDefault();
      var r = b.getBoundingClientRect(), d = EGG[b.dataset.egg];
      find(b.dataset.egg, d[0], r.left + r.width / 2, r.top + r.height / 2, d[1]);
      b.classList.add('found');
      b.classList.remove('woke'); void b.offsetWidth; b.classList.add('woke');
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
              ch.style.setProperty('--i', idx); ch.dataset.c = idx++ % 4; word.appendChild(ch);
            });
            frag.appendChild(word);
          });
          node.replaceChild(frag, n);
        } else if (n.nodeType === 1) walk(n);
      });
    };
    walk(h1);
    var NEED = 5, plays = 0, tip = document.createElement('div');
    tip.className = 'xylo-tip'; tip.setAttribute('aria-hidden', 'true'); tip.innerHTML = '<span>♪ try clicking the letters</span><svg viewBox="0 0 60 44" width="60" height="44" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M52 3C50 22 34 34 9 36"/><path d="M18 28L8 36l11 6"/></svg>';
    if (!found.xylo) { h1.parentNode.classList.add('has-tip'); h1.parentNode.appendChild(tip); }
    h1.addEventListener('click', function (e) {
      var ch = e.target.closest('.ch'); if (!ch) return;
      var label = tip.querySelector('span');
      if (plays + 1 >= NEED) tip.classList.add('gone');
      else label.textContent = '♪ ' + (NEED - plays - 1) + ' more click' + (NEED - plays - 1 === 1 ? '' : 's') + '…'
        label.classList.remove('tick'); void label.offsetWidth; label.classList.add('tick');
      var code = ch.textContent.toLowerCase().charCodeAt(0);
      bar(SCALE[code % SCALE.length]);
      ch.classList.remove('ring'); void ch.offsetWidth; ch.classList.add('ring');
      if (found.xylo) {
        var all = Array.prototype.slice.call(h1.querySelectorAll('.ch')), at = all.indexOf(ch);
        for (var d = 1; d <= 4; d++) [at - d, at + d].forEach(function (j) {
          var n = all[j]; if (!n) return;
          n.style.setProperty('--wd', d * 70 + 'ms'); n.classList.remove('wave'); void n.offsetWidth; n.classList.add('wave');
        });
      }
      if (++plays === NEED) find('xylo', null, e.clientX, e.clientY, ['note', 'note']);
    });
  }



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
