// Server-driven UI proof of concept.
// The "server" below returns JSON that mirrors SwiftPath's real wire format
// (SwiftPathComponentEntity / OnboardingFlowEntity). The client only knows how
// to render component types; every screen, copy change and route comes from JSON.
(function () {
  var SERVER = {
    v1: {
      flow: {
        version: 1,
        first_node_id: 'n1',
        screens: [
          { node_id: 'n1', screen_id: 'welcome', action_mapping: [
            { source_component_id: 'cta', default_config: { action: 'navigation', target_node_id: 'n2' } } ] },
          { node_id: 'n2', screen_id: 'goal', action_mapping: [
            { source_component_id: 'opt_sleep', default_config: { action: 'navigation', target_node_id: 'n3' } },
            { source_component_id: 'opt_focus', default_config: { action: 'navigation', target_node_id: 'n3' } } ] },
          { node_id: 'n3', screen_id: 'name', action_mapping: [
            { source_component_id: 'cta', default_config: { action: 'navigation', target_node_id: 'n4' } } ] },
          { node_id: 'n4', screen_id: 'done', action_mapping: [] }
        ]
      },
      screens: {
        welcome: { id: 'welcome', version: 1, config: col('#fffaf0', [
          text('Welcome to Lumen', 28, 700, '#2e2620'),
          text('A calmer way to wind down your day.', 16, 400, '#7a6c5d'),
          spacer(1),
          button('cta', 'Get started', '#b4572f')
        ]) },
        goal: { id: 'goal', version: 1, config: col('#fffaf0', [
          text('What brings you here?', 26, 700, '#2e2620'),
          option('opt_sleep', 'Better sleep', 'goal', 'sleep'),
          option('opt_focus', 'More focus', 'goal', 'focus')
        ]) },
        name: { id: 'name', version: 1, config: col('#fffaf0', [
          text('What should we call you?', 26, 700, '#2e2620'),
          { id: 'name_input', type: 'edit_text', margin: { top: 12 },
            edit_text_payload: { variable_key: 'name', hint_payload: { text: { en: 'Your name' } } } },
          spacer(1),
          button('cta', 'Continue', '#b4572f')
        ]) },
        done: { id: 'done', version: 1, config: col('#f0dccb', [
          spacer(1),
          text('You’re all set, {{name}}.', 28, 700, '#2e2620'),
          text('Goal: {{goal}}', 16, 400, '#7a6c5d'),
          spacer(1)
        ]) }
      }
    }
  };

  // v2 is "published" later: new copy, new colours, an extra step, a conditional route.
  // No app update, no store review.
  var v2 = JSON.parse(JSON.stringify(SERVER.v1));
  v2.flow.version = 2;
  v2.flow.screens[1].action_mapping = [
    { source_component_id: 'opt_sleep', default_config: { action: 'navigation', target_node_id: 'n_tips' } },
    { source_component_id: 'opt_focus', default_config: { action: 'navigation', target_node_id: 'n3' } },
    { source_component_id: 'opt_stress', default_config: { action: 'navigation', target_node_id: 'n3' } }
  ];
  v2.flow.screens.splice(2, 0, { node_id: 'n_tips', screen_id: 'tips', action_mapping: [
    { source_component_id: 'cta', default_config: { action: 'navigation', target_node_id: 'n3' } } ] });
  v2.screens.welcome = { id: 'welcome', version: 2, config: col('#2e2620', [
    text('Wind down with Lumen', 30, 700, '#fffaf0'),
    text('Five minutes a night. Sleep better tomorrow.', 16, 400, '#e3d6c1'),
    spacer(1),
    button('cta', 'Start tonight', '#e0a15f', '#2e2620')
  ]) };
  v2.screens.goal.version = 2;
  v2.screens.goal.config.children.push(option('opt_stress', 'Less stress', 'goal', 'stress'));
  v2.screens.tips = { id: 'tips', version: 2, config: col('#fffaf0', [
    text('A tip for better sleep', 26, 700, '#2e2620'),
    text('Dim the lights an hour before bed. We’ll remind you.', 16, 400, '#7a6c5d'),
    spacer(1),
    button('cta', 'Nice, continue', '#b4572f')
  ]) };
  SERVER.v2 = v2;

  // Tiny JSON builders to keep the sample payload readable.
  function col(bg, children) {
    return { id: 'root', type: 'column', background_color_payload: { type: 'solid', color_hex: bg },
      inner_padding: { top: 56, start: 24, bottom: 32, end: 24 }, width: { format: 'fill_max_size' },
      height: { format: 'fill_max_size' }, children: children };
  }
  function text(t, size, weight, color) {
    return { id: 't' + Math.random().toString(36).slice(2, 6), type: 'text', margin: { bottom: 8 },
      text_payload: { text: { en: t }, text_size_sp: size, font_weight: weight, text_color_hex: color } };
  }
  function spacer(weight) { return { id: 's' + Math.random().toString(36).slice(2, 6), type: 'spacer', weight: weight }; }
  function button(id, label, bg, fg) {
    return { id: id, type: 'box', alignment: 'center', margin: { top: 8 }, inner_padding: { top: 14, bottom: 14 },
      background_color_payload: { type: 'solid', color_hex: bg }, clip: { top_left_dp: 14, top_right_dp: 14, bottom_left_dp: 14, bottom_right_dp: 14 },
      clickable_payload: { type: 'navigation' },
      children: [{ id: id + '_l', type: 'text', text_payload: { text: { en: label }, text_size_sp: 16, font_weight: 600, text_color_hex: fg || '#fffaf0', text_alignment: 'center' } }] };
  }
  function option(id, label, key, value) {
    return { id: id, type: 'box', margin: { top: 10 }, inner_padding: { top: 16, bottom: 16, start: 16, end: 16 },
      background_color_payload: { type: 'solid', color_hex: '#f7f1e6' }, border: { border_color_hex: '#e3d6c1', border_width_dp: 1, corners: { top_left_dp: 14, top_right_dp: 14, bottom_left_dp: 14, bottom_right_dp: 14 } },
      clickable_payload: { type: 'set_value', key: key, value: value },
      children: [{ id: id + '_l', type: 'text', text_payload: { text: { en: label }, text_size_sp: 16, font_weight: 500, text_color_hex: '#2e2620' } }] };
  }

  // ---- Renderer -----------------------------------------------------------

  var state = { mode: 'screen', version: 'v1', payload: null, nodeId: null, vars: {}, history: [] };
  var els = {};

  function px(n) { return n == null ? null : n + 'px'; }
  function color(p) { return p && p.type === 'solid' ? p.color_hex : null; }
  function interpolate(s) {
    return s.replace(/\{\{(\w+)\}\}/g, function (_, k) { return state.vars[k] || ''; });
  }

  function render(c) {
    var el;
    switch (c.type) {
      case 'text':
        el = document.createElement('div');
        var tp = c.text_payload || {};
        el.textContent = interpolate((tp.text && (tp.text.en || tp.text[Object.keys(tp.text)[0]])) || '');
        el.style.fontSize = px(tp.text_size_sp);
        el.style.fontWeight = tp.font_weight || '';
        el.style.color = tp.text_color_hex || '';
        el.style.textAlign = tp.text_alignment === 'center' ? 'center' : '';
        break;
      case 'edit_text':
        el = document.createElement('input');
        var ep = c.edit_text_payload || {};
        el.placeholder = ep.hint_payload && ep.hint_payload.text ? ep.hint_payload.text.en : '';
        el.value = state.vars[ep.variable_key] || '';
        el.addEventListener('input', function () { state.vars[ep.variable_key] = el.value; });
        break;
      case 'spinner':
        el = document.createElement('div');
        el.className = 'sdui-spinner';
        break;
      default: // box / column / row
        el = document.createElement('div');
        el.style.display = 'flex';
        el.style.flexDirection = c.type === 'row' ? 'row' : 'column';
        if (c.type === 'box' && c.alignment === 'center') { el.style.alignItems = 'center'; el.style.justifyContent = 'center'; }
        (c.children || []).forEach(function (ch) { el.appendChild(render(ch)); });
    }
    var pad = c.inner_padding, m = c.margin;
    if (pad) el.style.padding = [pad.top, pad.end, pad.bottom, pad.start].map(function (v) { return (v || 0) + 'px'; }).join(' ');
    if (m) el.style.margin = [m.top, m.end, m.bottom, m.start].map(function (v) { return (v || 0) + 'px'; }).join(' ');
    var bg = color(c.background_color_payload); if (bg) el.style.background = bg;
    if (c.weight) el.style.flex = c.weight + ' 1 0';
    if (c.clip) el.style.borderRadius = [c.clip.top_left_dp, c.clip.top_right_dp, c.clip.bottom_right_dp, c.clip.bottom_left_dp].map(function (v) { return (v || 0) + 'px'; }).join(' ');
    if (c.border) {
      el.style.border = (c.border.border_width_dp || 1) + 'px solid ' + c.border.border_color_hex;
      var r = c.border.corners; if (r) el.style.borderRadius = [r.top_left_dp, r.top_right_dp, r.bottom_right_dp, r.bottom_left_dp].map(function (v) { return (v || 0) + 'px'; }).join(' ');
    }
    if (c.width && c.width.format === 'fill_max_size') el.style.width = '100%';
    if (c.height && c.height.format === 'fill_max_size') el.style.minHeight = '100%';
    if (c.clickable_payload) {
      el.classList.add('sdui-click');
      el.addEventListener('click', function () { onClick(c); });
      if (state.vars[c.clickable_payload.key] === c.clickable_payload.value && c.clickable_payload.type === 'set_value') el.classList.add('sdui-selected');
    }
    el.dataset.id = c.id;
    return el;
  }

  function onClick(c) {
    var cp = c.clickable_payload;
    if (cp.type === 'set_value') state.vars[cp.key] = cp.value;
    var node = currentNode();
    var map = (node.action_mapping || []).filter(function (a) { return a.source_component_id === c.id; })[0];
    if (!map) { show(); return; }
    var target = map.default_config.target_node_id;
    state.history.push(state.nodeId);
    state.nodeId = target;
    show();
  }

  function currentNode() {
    return state.payload.flow.screens.filter(function (s) { return s.node_id === state.nodeId; })[0];
  }

  function show() {
    var node = currentNode();
    var screen = state.payload.screens[node.screen_id];
    els.screen.innerHTML = '';
    els.screen.appendChild(render(screen.config));
    syncEditor();
    els.editorError.textContent = '';
    els.status.textContent = 'flow v' + state.payload.flow.version + ' · screen "' + node.screen_id + '" v' + screen.version;
    els.back.disabled = !state.history.length;
  }

  function syncEditor() {
    var data = state.mode === 'flow' ? state.payload.flow : state.payload.screens[currentNode().screen_id];
    els.editor.value = JSON.stringify(data, null, 2);
    [].forEach.call(document.querySelectorAll('[data-mode]'), function (b) {
      b.classList.toggle('active', b.dataset.mode === state.mode);
    });
  }

  function fetchPayload(version) {
    els.screen.innerHTML = '<div class="sdui-loading"><div class="sdui-spinner"></div></div>';
    els.status.textContent = 'POST provide_onboarding_flow {projectId, onboardingFlowId} → ' + version + '…';
    return new Promise(function (resolve) {
      setTimeout(function () { resolve(JSON.parse(JSON.stringify(SERVER[version]))); }, 500);
    });
  }

  function load(version) {
    state.version = version;
    return fetchPayload(version).then(function (p) {
      state.payload = p; state.nodeId = p.flow.first_node_id; state.vars = {}; state.history = [];
      els.toggleBtns.forEach(function (b) { b.classList.toggle('active', b.dataset.version === version); });
      show();
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    els.screen = document.getElementById('sdui-screen');
    els.editor = document.getElementById('sdui-editor');
    els.editorError = document.getElementById('sdui-error');
    els.status = document.getElementById('sdui-status');
    els.back = document.getElementById('sdui-back');
    els.toggleBtns = [].slice.call(document.querySelectorAll('[data-version]'));
    els.toggleBtns.forEach(function (b) { b.addEventListener('click', function () { load(b.dataset.version); }); });
    els.back.addEventListener('click', function () { state.nodeId = state.history.pop(); show(); });
    document.getElementById('sdui-restart').addEventListener('click', function () { load(state.version); });
    [].forEach.call(document.querySelectorAll('[data-mode]'), function (b) {
      b.addEventListener('click', function () { state.mode = b.dataset.mode; syncEditor(); els.editorError.textContent = ''; });
    });
    els.editor.addEventListener('input', function () {
      try {
        var parsed = JSON.parse(els.editor.value);
        if (state.mode === 'flow') {
          if (!parsed.screens || !parsed.screens.some(function (s) { return s.node_id === state.nodeId; })) throw new Error('current node "' + state.nodeId + '" must stay in the flow');
          state.payload.flow = parsed;
          els.status.textContent = 'flow v' + parsed.version + ' (edited)';
          els.editorError.textContent = '';
          return;
        }
        var screen = parsed;
        state.payload.screens[currentNode().screen_id] = screen;
        els.screen.innerHTML = '';
        els.screen.appendChild(render(screen.config));
        els.editorError.textContent = '';
      } catch (e) { els.editorError.textContent = 'Invalid JSON: ' + e.message; }
    });
    load('v1');
  });
})();
