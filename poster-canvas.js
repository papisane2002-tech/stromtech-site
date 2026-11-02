/* Atelier Affiches : canevas libre façon Canva (fond, dégradé, polices, formes, images, calques, annuler/rétablir) */
(function () {
  var FONTS = ["Figtree", "Bebas Neue", "Anton", "Oswald", "Montserrat", "Poppins", "Raleway", "Playfair Display", "Roboto Slab", "Pacifico", "Lobster", "Dancing Script", "Permanent Marker"];
  var PAL = [["#087f6b", "#ffffff"], ["#2340ff", "#ffffff"], ["#f26b1d", "#ffffff"], ["#7a3cff", "#ffffff"], ["#d62839", "#ffffff"], ["#14161f", "#ffffff"], ["#f4eee5", "#302820"], ["#ffd23f", "#14161f"], ["#ffffff", "#14161f"]];
  var SEED = { evenement: ["#087f6b", "#ffffff", "c", "Bebas Neue"], promotion: ["#171d2b", "#ffffff", "l", "Anton"], elegant: ["#f4eee5", "#302820", "c", "Playfair Display"], concert: ["#10101a", "#ffffff", "l", "Oswald"], editorial: ["#ffffff", "#14161f", "l", "Montserrat"], minimal: ["#ffffff", "#14161f", "c", "Raleway"], sale: ["#d62839", "#ffffff", "l", "Anton"], split: ["#2340ff", "#ffffff", "c", "Poppins"] };
  var sel = null, hist = [], hi = -1, lastCv = null, ctx = null, n = 0;

  function h(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text) e.textContent = text; return e; }
  function nid(cv) { n = Math.max(n, cv.els.reduce(function (m, e) { return Math.max(m, +e.id.slice(1) || 0); }, 0)); return "e" + (++n); }
  function T(cv, o) { o = Object.assign({ k: "t", x: 0, y: 0, w: 200, h: 40, rot: 0, tx: "", fs: 18, fw: 400, fi: 0, ff: "Figtree", c: "#14161f", al: "left", bg: "", rad: 0, op: 100, ac: 0 }, o); o.id = nid(cv); cv.els.push(o); return o; }

  function seed(tpl, W, H, name, slogan, accent) {
    var s = SEED[tpl] || SEED.evenement, bg = s[0], ink = s[1], center = s[2] === "c", ff = s[3], cv = { W: W, H: H, bg: bg, bg2: "", angle: 160, els: [] }, m = 32, al = center ? "center" : "left";
    var light = ink !== "#ffffff";
    T(cv, { x: m, y: 34, w: W - 2 * m, h: 24, tx: (name || "NOM DE LA MARQUE").toUpperCase(), fs: 13, fw: 700, c: ink, al: al, ff: "Montserrat" });
    if (!center) T(cv, { x: m, y: 90, w: 8, h: 190, bg: accent, ac: 1 });
    T(cv, { x: center ? m : m + 24, y: 84, w: W - 2 * m - (center ? 0 : 24), h: 200, tx: (slogan || "TON ÉVÉNEMENT").toUpperCase(), fs: Math.round(W / 9.5), fw: 700, c: ink, al: al, ff: ff });
    T(cv, { x: m, y: 296, w: W - 2 * m, h: 56, tx: "Une phrase courte pour attirer l’attention", fs: 18, c: ink, al: al });
    T(cv, { x: 0, y: H - 200, w: W, h: 200, bg: accent, ac: 1 });
    T(cv, { x: m, y: H - 178, w: W - 2 * m, h: 40, tx: "DATE · HEURE · LIEU", fs: 24, fw: 700, c: "#ffffff", al: al, ff: ff });
    T(cv, { x: m, y: H - 132, w: W - 2 * m, h: 44, tx: "Informations complémentaires, tarif ou offre spéciale", fs: 15, c: "#ffffff", al: al });
    T(cv, { x: center ? (W - 220) / 2 : m, y: H - 74, w: 220, h: 44, tx: "RÉSERVE TA PLACE", fs: 14, fw: 700, c: light ? "#ffffff" : accent, al: "center", bg: light ? "#14161f" : "#ffffff", rad: 999, ff: "Montserrat" });
    return cv;
  }
  function fit(cv, F) {
    var kx = F[0] / cv.W, ky = F[1] / cv.H;
    cv.els.forEach(function (e) { e.x = Math.round(e.x * kx); e.w = Math.round(e.w * kx); e.y = Math.round(e.y * ky); e.h = Math.round(e.h * ky); });
    cv.W = F[0]; cv.H = F[1];
  }

  function snap() { hist = hist.slice(0, hi + 1); hist.push(JSON.stringify(ctx.state.canvas)); if (hist.length > 40) hist.shift(); hi = hist.length - 1; }
  function go(d) { var i = hi + d; if (i < 0 || i >= hist.length) return; hi = i; ctx.state.canvas = JSON.parse(hist[i]); lastCv = ctx.state.canvas; if (!find(sel)) sel = null; commit(true); }
  function find(id) { return id && ctx.state.canvas.els.filter(function (e) { return e.id === id; })[0]; }
  function commit(noSnap) { if (!noSnap) snap(); ctx.save(); paint(); panel(); }

  function elStyle(node, e) {
    var s = node.style, bg = e.ac ? ctx.state.color : e.bg;
    s.left = e.x + "px"; s.top = e.y + "px"; s.width = e.w + "px"; s.height = e.h + "px"; s.opacity = e.op / 100;
    s.transform = "rotate(" + e.rot + "deg)"; s.background = bg || "transparent"; s.borderRadius = e.rad + "px";
    if (e.k === "t") { s.fontSize = e.fs + "px"; s.fontWeight = e.fw; s.fontStyle = e.fi ? "italic" : "normal"; s.fontFamily = "'" + e.ff + "',sans-serif"; s.color = e.c; s.textAlign = e.al; }
  }
  function paint() {
    var cv = ctx.state.canvas, page = ctx.page, inner = page.firstChild;
    inner.textContent = ""; inner.style.width = cv.W + "px"; inner.style.height = cv.H + "px";
    inner.style.background = cv.bg2 ? "linear-gradient(" + cv.angle + "deg," + cv.bg + "," + cv.bg2 + ")" : cv.bg;
    cv.els.forEach(function (e) {
      var node = h("div", "pc-el" + (e.id === sel ? " is-sel" : "")); node.dataset.id = e.id;
      if (e.k === "i") { var im = h("img"); im.src = e.src; im.draggable = false; node.appendChild(im); } else node.textContent = e.tx;
      elStyle(node, e); if (e.id === sel) node.appendChild(h("i", "pc-handle")); inner.appendChild(node);
    });
    var k = page.clientWidth / cv.W; inner.style.transform = "scale(" + (k || 1) + ")";
    page.style.height = Math.round(cv.H * (k || 1)) + "px";
  }

  function pointers(page) {
    var d = null;
    page.addEventListener("pointerdown", function (ev) {
      var node = ev.target.closest(".pc-el"), id = node && node.dataset.id, e = find(id), k = page.clientWidth / ctx.state.canvas.W;
      if (!e) { if (sel) { sel = null; paint(); panel(); } return; }
      if (sel !== id) { sel = id; paint(); panel(); node = page.querySelector('[data-id="' + id + '"]'); }
      d = { e: e, node: node, x: ev.clientX, y: ev.clientY, ox: e.x, oy: e.y, ow: e.w, oh: e.h, k: k, rs: !!ev.target.closest(".pc-handle"), moved: false };
      page.setPointerCapture(ev.pointerId); ev.preventDefault();
    });
    page.addEventListener("pointermove", function (ev) {
      if (!d) return; var dx = (ev.clientX - d.x) / d.k, dy = (ev.clientY - d.y) / d.k; d.moved = true;
      if (d.rs) { d.e.w = Math.max(24, Math.round(d.ow + dx)); d.e.h = Math.max(16, Math.round(d.oh + dy)); } else { d.e.x = Math.round(d.ox + dx); d.e.y = Math.round(d.oy + dy); }
      elStyle(d.node, d.e);
    });
    var up = function () { if (d && d.moved) { commit(); } d = null; };
    page.addEventListener("pointerup", up); page.addEventListener("pointercancel", up);
  }

  function row(label, input) { var r = h("label", "pc-row"); r.appendChild(h("span", "", label)); r.appendChild(input); return r; }
  function inp(type, val, fn, a) { var i = h("input"); i.type = type; i.value = val; if (a) Object.keys(a).forEach(function (k) { i.setAttribute(k, a[k]); }); i.addEventListener("input", function () { fn(type === "range" ? +i.value : i.value); }); i.addEventListener("change", function () { snap(); }); return i; }
  function btn(label, fn, cls) { var b = h("button", "pc-btn " + (cls || ""), label); b.type = "button"; b.addEventListener("click", fn); return b; }
  function live(fn) { return function (v) { fn(v); ctx.save(); paint(); }; }

  function panel() {
    var cv = ctx.state.canvas, p = ctx.panel, e = find(sel); p.textContent = "";
    var g = h("div", "pc-grp"); g.appendChild(h("h4", "", "Ajouter"));
    var add = h("div", "pc-btns");
    add.appendChild(btn("+ Texte", function () { sel = T(cv, { x: 40, y: 120, w: 260, h: 50, tx: "Nouveau texte", fs: 28, fw: 700, c: ink() }).id; commit(); }));
    add.appendChild(btn("+ Rectangle", function () { sel = T(cv, { x: 60, y: 160, w: 200, h: 120, bg: ctx.state.color, ac: 1 }).id; commit(); }));
    add.appendChild(btn("+ Cercle", function () { sel = T(cv, { x: 80, y: 160, w: 140, h: 140, bg: "#ffd23f", rad: 999 }).id; commit(); }));
    add.appendChild(btn("+ Image", function () { ctx.upload.click(); }));
    add.appendChild(btn("↶ Annuler", function () { go(-1); }));
    add.appendChild(btn("↷ Rétablir", function () { go(1); }));
    g.appendChild(add); p.appendChild(g);

    g = h("div", "pc-grp"); g.appendChild(h("h4", "", "Fond de la page"));
    g.appendChild(row("Couleur", inp("color", cv.bg, live(function (v) { cv.bg = v; }))));
    if (cv.bg2) {
      g.appendChild(row("Couleur 2", inp("color", cv.bg2, live(function (v) { cv.bg2 = v; }))));
      g.appendChild(row("Angle", inp("range", cv.angle, live(function (v) { cv.angle = v; }), { min: 0, max: 360 })));
      g.appendChild(btn("Fond uni", function () { cv.bg2 = ""; commit(); }));
    } else g.appendChild(btn("Passer en dégradé", function () { cv.bg2 = ctx.state.color; commit(); }));
    var pal = h("div", "pc-pal"); PAL.forEach(function (c) { var b = h("button", "pc-sw"); b.type = "button"; b.style.background = c[0]; b.title = "Appliquer cette palette"; b.addEventListener("click", function () { cv.bg = c[0]; cv.bg2 = ""; cv.els.forEach(function (x) { if (x.k === "t" && x.tx && !x.bg && !x.ac) x.c = c[1]; }); commit(); }); pal.appendChild(b); });
    g.appendChild(pal); p.appendChild(g);

    g = h("div", "pc-grp"); g.appendChild(h("h4", "", e ? "Élément sélectionné" : "Élément sélectionné"));
    if (!e) { g.appendChild(h("p", "pc-hint", "Clique sur un élément de l’affiche pour le modifier, le déplacer ou le redimensionner avec la poignée d’angle.")); p.appendChild(g); return; }
    if (e.k === "t") {
      var ta = h("textarea"); ta.rows = 3; ta.value = e.tx; ta.addEventListener("input", live(function () { e.tx = ta.value; })); ta.addEventListener("change", snap); g.appendChild(ta);
      var ff = h("select"); FONTS.forEach(function (f) { var o = h("option", "", f); o.value = f; o.style.fontFamily = "'" + f + "'"; ff.appendChild(o); }); ff.value = e.ff;
      ff.addEventListener("change", function () { e.ff = ff.value; commit(); }); g.appendChild(row("Police", ff));
      g.appendChild(row("Taille", inp("range", e.fs, live(function (v) { e.fs = v; }), { min: 8, max: 160 })));
      g.appendChild(row("Couleur du texte", inp("color", e.c, live(function (v) { e.c = v; }))));
      var st = h("div", "pc-btns");
      st.appendChild(btn("G", function () { e.fw = e.fw >= 700 ? 400 : 700; commit(); }, e.fw >= 700 ? "on" : ""));
      st.appendChild(btn("I", function () { e.fi = e.fi ? 0 : 1; commit(); }, e.fi ? "on" : ""));
      ["left", "center", "right"].forEach(function (a, i) { st.appendChild(btn(["⇤", "↔", "⇥"][i], function () { e.al = a; commit(); }, e.al === a ? "on" : "")); });
      g.appendChild(st);
    }
    if (e.k === "i") g.appendChild(h("p", "pc-hint", "Image : déplace-la et redimensionne-la avec la poignée."));
    g.appendChild(row(e.k === "t" ? "Couleur de fond" : "Fond", inp("color", (e.ac ? ctx.state.color : e.bg) || "#ffffff", live(function (v) { e.bg = v; e.ac = 0; }))));
    if (e.bg || e.ac) g.appendChild(btn("Sans fond", function () { e.bg = ""; e.ac = 0; commit(); }));
    g.appendChild(row("Arrondi", inp("range", Math.min(e.rad, 120), live(function (v) { e.rad = v; }), { min: 0, max: 120 })));
    g.appendChild(row("Opacité", inp("range", e.op, live(function (v) { e.op = v; }), { min: 5, max: 100 })));
    g.appendChild(row("Rotation", inp("range", e.rot, live(function (v) { e.rot = v; }), { min: -180, max: 180 })));
    var ac = h("div", "pc-btns"), i = cv.els.indexOf(e);
    ac.appendChild(btn("Devant", function () { cv.els.splice(i, 1); cv.els.push(e); commit(); }));
    ac.appendChild(btn("Derrière", function () { cv.els.splice(i, 1); cv.els.unshift(e); commit(); }));
    ac.appendChild(btn("Dupliquer", function () { var c = Object.assign({}, e, { id: nid(cv), x: e.x + 16, y: e.y + 16 }); cv.els.push(c); sel = c.id; commit(); }));
    ac.appendChild(btn("Supprimer", function () { cv.els.splice(i, 1); sel = null; commit(); }, "danger"));
    g.appendChild(ac); p.appendChild(g);
  }
  function ink() { var cv = ctx.state.canvas, x = cv.bg.toLowerCase(); return x === "#ffffff" || x === "#f4eee5" ? "#14161f" : "#ffffff"; }

  function upload(file) {
    var cv = ctx.state.canvas; if (!file || cv.els.filter(function (e) { return e.k === "i"; }).length >= 6) return;
    var r = new FileReader();
    r.onload = function () {
      var im = new Image(); im.onload = function () {
        var k = Math.min(1, 900 / Math.max(im.width, im.height)), c = document.createElement("canvas"); c.width = Math.round(im.width * k); c.height = Math.round(im.height * k);
        c.getContext("2d").drawImage(im, 0, 0, c.width, c.height);
        var q = 0.8, src = c.toDataURL("image/webp", q); while (src.length > 400000 && q > 0.3) { q -= 0.1; src = c.toDataURL("image/webp", q); }
        var w = Math.min(cv.W - 40, 300);
        sel = T(cv, { k: "i", x: 20, y: 120, w: w, h: Math.round(w * im.height / im.width), src: src }).id; commit();
      }; im.src = r.result;
    };
    r.readAsDataURL(file);
  }

  function draw(root, state, W, H, api) {
    if (state.canvas.W !== W || state.canvas.H !== H) fit(state.canvas, [W, H]);
    if (lastCv !== state.canvas && (!ctx || ctx.state !== state || hist.indexOf(JSON.stringify(state.canvas)) < 0)) { hist = []; hi = -1; sel = null; }
    var page = h("article", "pv-poster pc-page"), inner = h("div", "pc-inner"); page.appendChild(inner); root.appendChild(page);
    var host = document.getElementById("posterOptions"), pn = document.getElementById("pcPanel");
    if (!pn) { pn = h("div", "pc-panel"); pn.id = "pcPanel"; host.insertBefore(pn, host.children[1] || null); var up = h("input"); up.type = "file"; up.accept = "image/png,image/jpeg,image/webp"; up.hidden = true; up.id = "pcUpload"; up.addEventListener("change", function () { upload(up.files[0]); up.value = ""; }); host.appendChild(up); }
    ctx = { state: state, page: page, panel: pn, save: api.save, upload: document.getElementById("pcUpload") };
    if (lastCv !== state.canvas || !hist.length) { lastCv = state.canvas; if (!hist.length) snap(); }
    pointers(page); paint(); panel();
    if (!window.__pcKeys) { window.__pcKeys = 1; document.addEventListener("keydown", function (ev) {
      if (!ctx || ctx.state.type !== "poster" || /INPUT|TEXTAREA|SELECT/.test(ev.target.tagName)) return;
      var e = find(sel), z = ev.key.toLowerCase() === "z", y = ev.key.toLowerCase() === "y";
      if ((ev.ctrlKey || ev.metaKey) && (z || y)) { ev.preventDefault(); go(z && !ev.shiftKey ? -1 : 1); }
      else if (e && (ev.key === "Delete" || ev.key === "Backspace")) { ev.preventDefault(); ctx.state.canvas.els.splice(ctx.state.canvas.els.indexOf(e), 1); sel = null; commit(); }
    }); window.addEventListener("resize", function () { if (ctx && ctx.page.isConnected) paint(); }); }
  }
  window.PosterCanvas = { seed: seed, draw: draw };
})();
