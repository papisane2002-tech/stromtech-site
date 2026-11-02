/* Atelier Affiches : canevas libre façon Canva (fond, dégradé, polices, formes, images, calques, annuler/rétablir) */
(function () {
  var FONTS = ["Figtree", "Bebas Neue", "Anton", "Oswald", "Montserrat", "Poppins", "Raleway", "Playfair Display", "Roboto Slab", "Pacifico", "Lobster", "Dancing Script", "Permanent Marker"];
  var PAL = [["#087f6b", "#ffffff"], ["#2340ff", "#ffffff"], ["#f26b1d", "#ffffff"], ["#7a3cff", "#ffffff"], ["#d62839", "#ffffff"], ["#14161f", "#ffffff"], ["#f4eee5", "#302820"], ["#ffd23f", "#14161f"], ["#ffffff", "#14161f"]];
  var sel = null, hist = [], hi = -1, lastCv = null, ctx = null, n = 0;

  function h(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text) e.textContent = text; return e; }
  function nid(cv) { n = Math.max(n, cv.els.reduce(function (m, e) { return Math.max(m, +e.id.slice(1) || 0); }, 0)); return "e" + (++n); }
  function T(cv, o) { o = Object.assign({ k: "t", x: 0, y: 0, w: 200, h: 40, rot: 0, tx: "", fs: 18, fw: 400, fi: 0, ff: "Figtree", c: "#14161f", al: "left", bg: "", rad: 0, op: 100, ac: 0, sp: "", fx: "", fc: "#ff2bd6", bd: "", bw: 0, fl: "" }, o); o.id = nid(cv); cv.els.push(o); return o; }

  var CLIP = { tri: "polygon(50% 0,100% 100%,0 100%)", star: "polygon(50% 0,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)", diamond: "polygon(50% 0,100% 50%,50% 100%,0 50%)", hex: "polygon(25% 0,75% 0,100% 50%,75% 100%,25% 100%,0 50%)", arrow: "polygon(0 30%,60% 30%,60% 10%,100% 50%,60% 90%,60% 70%,0 70%)", plus: "polygon(35% 0,65% 0,65% 35%,100% 35%,100% 65%,65% 65%,65% 100%,35% 100%,35% 65%,0 65%,0 35%,35% 35%)" };
  var FL = { bw: "grayscale(1)", sepia: "sepia(.8)", blur: "blur(3px)", dark: "brightness(.6)", vivid: "saturate(1.8)" };
  var ICONS = [["🎉", "fête party"], ["🎂", "anniversaire gâteau"], ["🎵", "musique concert"], ["🎤", "micro chant"], ["🔥", "chaud promo feu"], ["⭐", "étoile"], ["❤️", "coeur amour mariage"], ["👑", "roi reine luxe"], ["📍", "lieu adresse"], ["📞", "téléphone appel"], ["💰", "argent prix"], ["🛍️", "shopping boutique"], ["🍔", "burger restaurant"], ["🍕", "pizza restaurant"], ["☕", "café"], ["🎁", "cadeau"], ["✨", "magie brillant"], ["🏆", "trophée sport"], ["⚽", "football sport"], ["🎓", "diplôme formation"], ["💼", "business pro"], ["📢", "annonce"], ["🚀", "lancement"], ["🌴", "vacances voyage"], ["🌙", "nuit soirée"], ["💎", "diamant luxe"], ["✅", "validé"], ["💒", "mariage"], ["🏠", "immobilier maison"]];
  var P = function (tx, x, y, w, hh, fs, c, o) { return [x, y, w, hh, Object.assign({ tx: tx, fs: fs, c: c, al: "center", fw: 700 }, o || {})]; };
  var S = function (x, y, w, hh, bg, o) { return [x, y, w, hh, Object.assign({ bg: bg }, o || {})]; };
  var BTN = function (tx, x, y, w, bg, c, o) { return P(tx, x, y, w, 7, 3.2, c, Object.assign({ bg: bg, rad: 999, ff: "Montserrat" }, o || {})); };
  /* Modèles : positions et tailles en % de la page ; fs en % de la largeur ; {n|…} = nom de marque, {s|…} = slogan */
  var TPLS = {
    blank: { n: "Page blanche", d: "Commence de zéro et ajoute tes éléments.", k: "vide blanc libre zéro", cat: "Tous", bg: "#ffffff", e: [] },
    evenement: { n: "Soirée festive", d: "Dégradé violet, cercles et gros titre.", k: "fête soirée dj club anniversaire party", cat: "Événement", bg: "#2a0a5e", bg2: "#d6249f", a: 150, e: [
      S(-12, -8, 48, 38, "#ffd23f", { rad: 999, op: 90 }), S(66, 58, 56, 45, "#29d3c8", { rad: 999, op: 80 }),
      P("{s|SOIRÉE}", 6, 17, 88, 17, 17, "#ffffff", { ff: "Bebas Neue", fx: "shadow" }), P("ÉLECTRO", 6, 33, 88, 15, 15, "#ffd23f", { ff: "Anton", fx: "shadow" }),
      P("Samedi 14 décembre · 21h", 6, 52, 88, 6, 4.4, "#ffffff", { fw: 400, ff: "Poppins" }), BTN("ENTRÉE LIBRE", 30, 70, 40, "#ffffff", "#2a0a5e"), P("{n|NOM DE LA MARQUE}", 6, 90, 88, 4, 2.6, "#ffffff", { ff: "Montserrat" })] },
    concert: { n: "Concert néon", d: "Fond sombre, lueur néon et étoile.", k: "concert live musique rap dj scène néon", cat: "Événement", bg: "#07070f", bg2: "#220a46", a: 180, e: [
      S(58, 5, 36, 26, "#ff2bd6", { sp: "star", rot: 12, fx: "glow", fc: "#ff2bd6" }), P("LIVE", 6, 16, 88, 24, 30, "#ffffff", { ff: "Anton", fx: "glow", fc: "#00e5ff" }),
      P("{s|CONCERT}", 6, 42, 88, 12, 12, "#ff2bd6", { ff: "Oswald", fx: "glow", fc: "#ff2bd6" }), S(30, 58, 40, 0.5, "#00e5ff", { fx: "glow", fc: "#00e5ff" }),
      P("Vendredi 20h · Grand Théâtre", 6, 62, 88, 6, 4.4, "#ffffff", { fw: 400, ff: "Poppins" }), BTN("RÉSERVE TA PLACE", 27, 80, 46, "#ff2bd6", "#ffffff", { fx: "glow", fc: "#ff2bd6" }), P("{n|NOM DE LA MARQUE}", 6, 92, 88, 3, 2.4, "#9aa0c8", { ff: "Montserrat" })] },
    ouverture: { n: "Grande ouverture", d: "Couleurs chaudes, étoile et grand titre.", k: "ouverture inauguration lancement boutique nouveau", cat: "Événement", bg: "#fff4e0", e: [
      S(-10, -6, 60, 30, "#f26b1d", { rad: 999 }), S(66, 68, 46, 32, "#ffd23f", { sp: "star", rot: 14 }), P("GRANDE", 6, 28, 88, 10, 8, "#14161f", { ff: "Oswald" }),
      P("{s|OUVERTURE}", 6, 37, 88, 14, 12, "#f26b1d", { ff: "Anton", fx: "shadow" }), P("Samedi 6 décembre · dès 10h", 6, 56, 88, 6, 4.4, "#14161f", { fw: 400, ff: "Poppins" }),
      P("Cadeaux et réductions toute la journée", 6, 64, 60, 8, 3.8, "#505a6e", { fw: 400, al: "left" }), P("{n|NOM DE LA MARQUE}", 6, 91, 88, 4, 3, "#14161f", { ff: "Montserrat", al: "left" })] },
    sport: { n: "Match / Sport", d: "Bande diagonale et contour fort.", k: "sport match football tournoi finale basket", cat: "Événement", bg: "#0f172a", e: [
      S(-30, 44, 160, 18, "#087f6b", { rot: -18, ac: 1 }), S(70, 70, 24, 16, "#ff6b2c", { sp: "hex", op: 90 }), P("MATCH", 6, 10, 88, 22, 21, "#ffffff", { ff: "Anton", fx: "outline", fc: "#ff6b2c" }),
      P("{s|FINALE}", 6, 30, 88, 12, 11, "#ffffff", { ff: "Oswald" }), P("Dimanche 16h · Stade", 6, 70, 60, 6, 4.4, "#ffffff", { fw: 400, al: "left", ff: "Poppins" }), P("{n|NOM DE LA MARQUE}", 6, 90, 88, 4, 2.8, "#9aa0c8", { ff: "Montserrat", al: "left" })] },
    promotion: { n: "Promotion", d: "Fond jaune, pastille de réduction.", k: "promo promotion réduction soldes prix offre", cat: "Commerce", bg: "#ffd23f", e: [
      S(52, 4, 52, 42, "#d62839", { rad: 999 }), P("-50%", 54, 12, 46, 22, 17, "#ffffff", { ff: "Anton", rot: -8, fx: "shadow" }), P("{s|GRANDE PROMO}", 6, 50, 88, 22, 13, "#14161f", { ff: "Anton", al: "left" }),
      P("Sur toute la collection, jusqu’au 30 novembre", 6, 73, 70, 8, 4, "#14161f", { fw: 400, al: "left" }), BTN("J’EN PROFITE", 6, 86, 44, "#14161f", "#ffffff")] },
    sale: { n: "Vente flash", d: "Rouge, bande jaune et prix en grand.", k: "vente flash soldes black friday prix choc", cat: "Commerce", bg: "#d62839", bg2: "#7a0f1a", e: [
      S(-10, 24, 120, 20, "#ffd23f", { rot: -8 }), P("VENTE FLASH", 4, 27, 92, 16, 12, "#14161f", { ff: "Anton", rot: -8 }), P("-70%", 6, 50, 88, 24, 26, "#ffffff", { ff: "Anton", fx: "relief", fc: "#14161f" }),
      P("24H SEULEMENT", 6, 78, 88, 6, 5, "#ffd23f", { ff: "Oswald" }), P("{n|NOM DE LA MARQUE}", 6, 92, 88, 3, 2.6, "#ffffff", { ff: "Montserrat" })] },
    restaurant: { n: "Menu restaurant", d: "Vert profond et cadre doré.", k: "restaurant menu plat cuisine café repas", cat: "Commerce", bg: "#14301f", e: [
      S(6, 4, 88, 92, "", { bd: "#e8c872", bw: 2 }), P("{n|CHEZ NOUS}", 10, 12, 80, 5, 3, "#e8c872", { ff: "Montserrat" }), P("{s|MENU DU JOUR}", 10, 20, 80, 14, 10, "#ffffff", { ff: "Playfair Display" }),
      P("Thiéboudiène · 3 500 F", 12, 40, 76, 6, 4.4, "#ffffff", { fw: 400, ff: "Poppins" }), P("Yassa poulet · 3 000 F", 12, 48, 76, 6, 4.4, "#ffffff", { fw: 400, ff: "Poppins" }), P("Dibi grillé · 4 000 F", 12, 56, 76, 6, 4.4, "#ffffff", { fw: 400, ff: "Poppins" }),
      S(35, 68, 30, 0.4, "#e8c872"), P("Ouvert 7j/7 · 11h–23h", 10, 74, 80, 5, 3.6, "#e8c872", { ff: "Montserrat" })] },
    elegant: { n: "Mariage élégant", d: "Crème, double cadre et script doré.", k: "mariage invitation élégant faire-part cérémonie", cat: "Élégant", bg: "#f6efe6", e: [
      S(6, 4, 88, 92, "", { bd: "#b08a57", bw: 2 }), S(8, 6, 84, 88, "", { bd: "#b08a57", bw: 1 }), P("Nous nous marions", 10, 16, 80, 10, 9, "#8a6a3b", { ff: "Dancing Script" }),
      P("{s|AMINATA & MOUSSA}", 10, 30, 80, 16, 8, "#302820", { ff: "Playfair Display", fw: 400 }), S(46, 52, 8, 3, "#b08a57", { sp: "diamond" }), P("Samedi 14 mars 2027 · 16h", 10, 58, 80, 6, 4.4, "#302820", { fw: 400, ff: "Playfair Display" }),
      P("Salle des fêtes · Dakar", 10, 66, 80, 5, 3.6, "#8a6a3b", { fw: 400, ff: "Raleway" }), P("RSVP · 77 000 00 00", 10, 84, 80, 5, 3, "#8a6a3b", { ff: "Montserrat" })] },
    minimal: { n: "Minimaliste", d: "Blanc, un titre, beaucoup d’espace.", k: "minimal simple épuré blanc texte", cat: "Élégant", bg: "#ffffff", e: [
      P("{s|TITRE}", 8, 34, 84, 22, 14, "#14161f", { al: "left", ff: "Raleway" }), S(8, 60, 14, 0.5, "#14161f"), P("Date · Lieu", 8, 64, 84, 5, 3.6, "#14161f", { al: "left", fw: 400 }), P("{n|NOM DE LA MARQUE}", 8, 92, 84, 3, 2.4, "#14161f", { al: "left" })] },
    formation: { n: "Conférence / Formation", d: "Bloc de couleur incliné et titre net.", k: "conférence formation séminaire atelier cours pro", cat: "Pro", bg: "#ffffff", e: [
      S(-20, -10, 70, 50, "#087f6b", { rot: -12, ac: 1 }), P("CONFÉRENCE", 6, 12, 40, 6, 3.4, "#ffffff", { al: "left", ff: "Montserrat" }), P("{s|LEADERSHIP & INNOVATION}", 6, 42, 88, 24, 9, "#14161f", { al: "left", ff: "Montserrat" }),
      P("Samedi 22 novembre · 9h–17h · Dakar", 6, 70, 88, 5, 3.8, "#505a6e", { al: "left", fw: 400 }), P("S’INSCRIRE", 6, 82, 36, 7, 3, "#ffffff", { bg: "#087f6b", ac: 1, rad: 12, ff: "Montserrat" })] }
  };
  function seed(tpl, W, H, name, slogan, accent) {
    var t = TPLS[tpl] || TPLS.blank, cv = { W: W, H: H, bg: t.bg, bg2: t.bg2 || "", angle: t.a || 160, els: [] };
    t.e.forEach(function (d) {
      var o = Object.assign({}, d[4]), m = /^\{([ns])\|(.*)\}$/.exec(o.tx || ""), v;
      if (m) { v = m[1] === "n" ? name : slogan; o.tx = v ? v.toUpperCase() : m[2]; }
      o.x = Math.round(d[0] * W / 100); o.y = Math.round(d[1] * H / 100); o.w = Math.round(d[2] * W / 100); o.h = Math.max(4, Math.round(d[3] * H / 100));
      if (o.fs) o.fs = Math.round(o.fs * W / 100);
      T(cv, o);
    });
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

  function elStyle(node, e, col) {
    var s = node.style, bg = e.ac ? (col || ctx.state.color) : e.bg, fc = e.fc || "#ff2bd6", txt = e.k === "t" && e.tx && !bg, sh = "";
    s.left = e.x + "px"; s.top = e.y + "px"; s.width = e.w + "px"; s.height = e.h + "px"; s.opacity = e.op / 100;
    s.transform = "rotate(" + e.rot + "deg)"; s.background = bg || "transparent"; s.borderRadius = e.rad + "px";
    s.clipPath = CLIP[e.sp] || ""; s.border = e.bw ? e.bw + "px solid " + (e.bd || "#14161f") : "none"; s.webkitTextStroke = "";
    if (e.fx === "shadow") sh = txt ? "3px 4px 10px rgba(0,0,0,.45)" : "0 10px 24px rgba(0,0,0,.35)";
    else if (e.fx === "glow") sh = txt ? "0 0 8px " + fc + ",0 0 24px " + fc : "0 0 26px " + fc;
    else if (e.fx === "relief" && txt) sh = "1px 1px 0 " + fc + ",2px 2px 0 " + fc + ",3px 3px 0 " + fc + ",4px 4px 0 " + fc + ",6px 6px 10px rgba(0,0,0,.4)";
    else if (e.fx === "outline" && txt) s.webkitTextStroke = "2px " + fc;
    s.textShadow = txt ? sh : ""; s.boxShadow = txt ? "" : sh; s.filter = FL[e.fl] || "";
    if (e.k === "t") { s.fontSize = e.fs + "px"; s.fontWeight = e.fw; s.fontStyle = e.fi ? "italic" : "normal"; s.fontFamily = "'" + e.ff + "',sans-serif"; s.color = e.c; s.textAlign = e.al; }
  }
  function mk(e, col) {
    var n = h("div", "pc-el");
    if (e.k === "i") { var im = h("img"); im.src = e.src; im.draggable = false; n.appendChild(im); } else n.textContent = e.tx;
    elStyle(n, e, col); return n;
  }
  function paint() {
    var cv = ctx.state.canvas, page = ctx.page, inner = page.firstChild;
    inner.textContent = ""; inner.style.width = cv.W + "px"; inner.style.height = cv.H + "px";
    inner.style.background = cv.bg2 ? "linear-gradient(" + cv.angle + "deg," + cv.bg + "," + cv.bg2 + ")" : cv.bg;
    cv.els.forEach(function (e) {
      var nd = mk(e, ctx.state.color); nd.dataset.id = e.id; if (e.id === sel) { nd.classList.add("is-sel"); nd.appendChild(h("i", "pc-handle")); } inner.appendChild(nd);
    });
    var k = page.clientWidth / cv.W; inner.style.transform = "scale(" + (k || 1) + ")";
    page.style.height = Math.round(cv.H * (k || 1)) + "px";
  }

  function pointers(page) {
    var d = null;
    page.addEventListener("pointerdown", function (ev) {
      var node = ev.target.closest(".pc-el"), id = node && node.dataset.id, e = find(id), k = page.clientWidth / ctx.state.canvas.W;
      if (!e) { sel = null; paint(); panel(); setTab("bg"); return; }
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

  var openF = {};
  function fold(title) { var d = h("details", "pc-fold"), s = h("summary", "", title); d.appendChild(s); d.open = !!openF[title]; d.addEventListener("toggle", function () { openF[title] = d.open; }); return d; }
  function library(g) {
    if (openF.Formes === undefined) openF.Formes = true; var f = fold("Formes"), w = h("div", "pc-btns");
    [["▭", "", 0, 200, 120], ["▢", "", 18, 200, 120], ["●", "", 999, 140, 140], ["▲", "tri", 0, 140, 130], ["★", "star", 0, 150, 150], ["◆", "diamond", 0, 140, 140], ["⬢", "hex", 0, 150, 130], ["➤", "arrow", 0, 180, 110], ["✚", "plus", 0, 120, 120], ["▬", "", 0, 260, 6]].forEach(function (x) {
      w.appendChild(btn(x[0], function () { addEl({ w: x[3], h: x[4], bg: ctx.state.color, ac: 1, sp: x[1], rad: x[2] }); }, "pc-shape"));
    }); f.appendChild(w); g.appendChild(f);
    var f2 = fold("Icônes"), q = h("input", "pc-search"), b = h("div", "pc-btns"); q.type = "search"; q.placeholder = "Chercher : fête, musique, prix…";
    ICONS.forEach(function (x) { var i = btn(x[0], function () { addEl({ w: 90, h: 90, tx: x[0], fs: 64, al: "center" }); }, "pc-shape"); i.dataset.k = x[1]; b.appendChild(i); });
    q.addEventListener("input", function () { var v = q.value.toLowerCase(); [].forEach.call(b.children, function (i) { i.hidden = v && i.dataset.k.indexOf(v) < 0; }); });
    f2.appendChild(q); f2.appendChild(b); g.appendChild(f2);
  }
  function propsUI() {
    var cv = ctx.state.canvas, p = ctx.panel, e = find(sel), g; p.textContent = "";
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
    var fxs = h("select"), fo = [["", "Aucun"], ["shadow", "Ombre"], ["glow", "Lueur"]];
    if (e.k === "t" && e.tx && !e.bg && !e.ac) fo = fo.concat([["outline", "Contour"], ["relief", "Relief 3D"]]);
    fo.forEach(function (o) { var op = h("option", "", o[1]); op.value = o[0]; fxs.appendChild(op); }); fxs.value = e.fx;
    fxs.addEventListener("change", function () { e.fx = fxs.value; commit(); }); g.appendChild(row("Effet", fxs));
    if (e.fx) g.appendChild(row("Couleur effet", inp("color", e.fc, live(function (v) { e.fc = v; }))));
    if (e.k === "i") { var fl = h("select"); [["", "Aucun"], ["bw", "Noir et blanc"], ["sepia", "Sépia"], ["blur", "Flou"], ["dark", "Assombri"], ["vivid", "Éclatant"]].forEach(function (o) { var op = h("option", "", o[1]); op.value = o[0]; fl.appendChild(op); }); fl.value = e.fl; fl.addEventListener("change", function () { e.fl = fl.value; commit(); }); g.appendChild(row("Filtre image", fl)); }
    g.appendChild(row("Bordure", inp("color", e.bd || "#14161f", live(function (v) { e.bd = v; if (!e.bw) e.bw = 3; }))));
    g.appendChild(row("Épaisseur", inp("range", e.bw, live(function (v) { e.bw = v; }), { min: 0, max: 20 })));
    var ac = h("div", "pc-btns"), i = cv.els.indexOf(e);
    ac.appendChild(btn("Devant", function () { cv.els.splice(i, 1); cv.els.push(e); commit(); }));
    ac.appendChild(btn("Derrière", function () { cv.els.splice(i, 1); cv.els.unshift(e); commit(); }));
    ac.appendChild(btn("Dupliquer", function () { var c = Object.assign({}, e, { id: nid(cv), x: e.x + 16, y: e.y + 16 }); cv.els.push(c); sel = c.id; commit(); }));
    ac.appendChild(btn("Supprimer", function () { cv.els.splice(i, 1); sel = null; commit(); }, "danger"));
    g.appendChild(ac); p.appendChild(g);
  }
  var curTab = "models";
  function addEl(o) { var cv = ctx.state.canvas; o = Object.assign({ k: "t" }, o); sel = T(cv, Object.assign({ x: Math.round((cv.W - o.w) / 2), y: Math.round((cv.H - o.h) / 2) }, o)).id; commit(); }
  function setTab(id) { curTab = id; var a = document.querySelector(".studio-tools"); if (a) a.dataset.pctab = id; [].forEach.call(document.querySelectorAll("#pcTabs button"), function (b) { b.setAttribute("aria-pressed", String(b.dataset.t === id)); }); }
  var SOL = ["#ffffff", "#f4eee5", "#fff4e0", "#ffd23f", "#f26b1d", "#d62839", "#ff2bd6", "#7a3cff", "#2340ff", "#00b4d8", "#087f6b", "#14301f", "#14161f", "#000000"];
  var GR = [["#ff6b6b", "#feca57"], ["#667eea", "#764ba2"], ["#00c6ff", "#0072ff"], ["#f857a6", "#ff5858"], ["#11998e", "#38ef7d"], ["#141e30", "#243b55"]];
  var TXT = [["Ajouter un titre", "Ton titre", { fs: 54, fw: 700, ff: "Montserrat", w: 360, h: 80 }], ["Ajouter un sous-titre", "Ton sous-titre", { fs: 28, fw: 700, ff: "Montserrat", w: 320, h: 44 }], ["Ajouter un texte", "Ton texte", { fs: 16, fw: 400, ff: "Figtree", w: 300, h: 60 }]];
  var COMBO = [["Élégant", { ff: "Playfair Display", fs: 44 }], ["Impact", { ff: "Bebas Neue", fs: 72 }], ["Manuscrit", { ff: "Dancing Script", fs: 52 }], ["Rétro", { ff: "Lobster", fs: 48 }], ["Néon", { ff: "Anton", fs: 56, fx: "glow", fc: "#00e5ff" }], ["Relief 3D", { ff: "Anton", fs: 56, fx: "relief", fc: "#14161f" }], ["Marqueur", { ff: "Permanent Marker", fs: 44 }]];
  function bgUI() {
    var cv = ctx.state.canvas, p = document.getElementById("pcBgBody"); if (!p) return; p.textContent = "";
    p.appendChild(row("Couleur de l’arrière-plan", inp("color", cv.bg, live(function (v) { cv.bg = v; }))));
    var sw = h("div", "pc-pal"); SOL.forEach(function (c) { var b = h("button", "pc-sw"); b.type = "button"; b.style.background = c; b.title = c; b.addEventListener("click", function () { cv.bg = c; cv.bg2 = ""; commit(); }); sw.appendChild(b); }); p.appendChild(sw);
    p.appendChild(h("h4", "", "Dégradés"));
    var gp = h("div", "pc-pal"); GR.forEach(function (c) { var b = h("button", "pc-sw"); b.type = "button"; b.style.background = "linear-gradient(135deg," + c[0] + "," + c[1] + ")"; b.addEventListener("click", function () { cv.bg = c[0]; cv.bg2 = c[1]; commit(); }); gp.appendChild(b); }); p.appendChild(gp);
    if (cv.bg2) {
      p.appendChild(row("Couleur 2", inp("color", cv.bg2, live(function (v) { cv.bg2 = v; }))));
      p.appendChild(row("Angle", inp("range", cv.angle, live(function (v) { cv.angle = v; }), { min: 0, max: 360 })));
      p.appendChild(btn("Revenir à un fond uni", function () { cv.bg2 = ""; commit(); }));
    } else p.appendChild(btn("Personnaliser un dégradé", function () { cv.bg2 = ctx.state.color; commit(); }));
    p.appendChild(h("h4", "", "Palettes assorties (fond + textes)"));
    var pal = h("div", "pc-pal"); PAL.forEach(function (c) { var b = h("button", "pc-sw"); b.type = "button"; b.style.background = c[0]; b.title = "Appliquer cette palette"; b.addEventListener("click", function () { cv.bg = c[0]; cv.bg2 = ""; cv.els.forEach(function (x) { if (x.k === "t" && x.tx && !x.bg && !x.ac) x.c = c[1]; }); commit(); }); pal.appendChild(b); });
    p.appendChild(pal);
  }
  function layersUI() {
    var host = document.getElementById("studioLayers"), cv = ctx.state.canvas; if (!host) return; host.textContent = "";
    if (!cv.els.length) { host.appendChild(h("p", "pc-hint", "Aucun élément pour le moment. Ajoute un texte, une forme ou une image.")); return; }
    cv.els.slice().reverse().forEach(function (e) {
      var i = cv.els.indexOf(e), r = h("div", "pc-layer" + (e.id === sel ? " on" : ""));
      r.appendChild(btn(e.k === "i" ? "▧ Image" : e.tx ? "T  " + e.tx.slice(0, 18) : "▰ Forme", function () { sel = e.id; paint(); panel(); }, "pc-layer-name"));
      r.appendChild(btn("↑", function () { if (i < cv.els.length - 1) { cv.els.splice(i + 1, 0, cv.els.splice(i, 1)[0]); commit(); } }));
      r.appendChild(btn("↓", function () { if (i > 0) { cv.els.splice(i - 1, 0, cv.els.splice(i, 1)[0]); commit(); } }));
      r.appendChild(btn("⧉", function () { var c = Object.assign({}, e, { id: nid(cv), x: e.x + 16, y: e.y + 16 }); cv.els.push(c); sel = c.id; commit(); }));
      r.appendChild(btn("✕", function () { cv.els.splice(i, 1); if (sel === e.id) sel = null; commit(); }, "danger"));
      host.appendChild(r);
    });
  }
  function panel() { propsUI(); bgUI(); layersUI(); }
  function dock() {
    if (document.getElementById("pcTabs")) return;
    var $ = function (i) { return document.getElementById(i); }, aside = document.querySelector(".studio-tools"), lay = $("studioLayers").closest(".grp"), g, tabs = h("div", "pc-tabs");
    $("typeSeg").closest(".grp").classList.add("pc-g-always"); $("tplList").closest(".grp").classList.add("pc-g-models"); lay.classList.add("pc-g-layers"); tabs.id = "pcTabs";
    [["models", "Modèles"], ["elements", "Éléments"], ["text", "Texte"], ["images", "Images"], ["bg", "Fond"], ["layers", "Calques"]].forEach(function (t) { var b = btn(t[1], function () { setTab(t[0]); }); b.dataset.t = t[0]; tabs.appendChild(b); });
    aside.insertBefore(tabs, aside.querySelector(".panel-heading").nextSibling);
    g = h("div", "grp pc-g-elements"); g.appendChild(h("h3", "", "Éléments")); g.appendChild(h("p", "pc-hint", "Clique sur une forme ou une icône : elle apparaît au centre de l’affiche.")); library(g); aside.insertBefore(g, lay);
    g = h("div", "grp pc-g-text"); g.appendChild(h("h3", "", "Texte"));
    TXT.forEach(function (x) { g.appendChild(btn(x[0], function () { addEl(Object.assign({ tx: x[1], c: ink() }, x[2])); }, "pc-big")); });
    g.appendChild(h("h4", "", "Styles de texte")); var cb = h("div", "pc-btns");
    COMBO.forEach(function (x) { var b = btn("Aa " + x[0], function () { addEl(Object.assign({ tx: x[0], c: x[1].fx ? "#ffffff" : ink(), w: 320, h: 80, fw: 700 }, x[1])); }, "pc-combo"); b.style.fontFamily = "'" + x[1].ff + "',sans-serif"; cb.appendChild(b); });
    g.appendChild(cb); aside.insertBefore(g, lay);
    g = h("div", "grp pc-g-images"); g.appendChild(h("h3", "", "Images")); g.appendChild(btn("+ Importer une image", function () { ctx.upload.click(); }, "pc-big"));
    g.appendChild(h("p", "pc-hint", "PNG, JPG ou WebP, 6 images maximum. Une fois posée, déplace-la, redimensionne-la et applique un filtre ou une bordure depuis le panneau de droite.")); aside.insertBefore(g, lay);
    g = h("div", "grp pc-g-bg"); g.appendChild(h("h3", "", "Fond de la page")); var body = h("div", "pc-bgbody"); body.id = "pcBgBody"; g.appendChild(body); aside.insertBefore(g, lay);
    var bar = h("div", "pc-bar"); bar.id = "pcBar"; bar.appendChild(btn("↶ Annuler", function () { go(-1); })); bar.appendChild(btn("↷ Rétablir", function () { go(1); })); bar.appendChild(btn("🎨 Fond", function () { setTab("bg"); }));
    bar.appendChild(h("span", "pc-hint", "Clique sur un élément pour le modifier · Suppr pour l’effacer"));
    var st = document.querySelector(".studio-stage"); st.insertBefore(bar, st.querySelector(".studio-stagebar").nextSibling);
  }
  function enable(on) {
    var a = document.querySelector(".studio-tools"), bar = document.getElementById("pcBar"), pn = document.getElementById("pcPanel");
    if (a) a.classList.toggle("pc-on", on); if (bar) bar.hidden = !on; if (pn) pn.hidden = !on; if (on) setTab(curTab);
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
    if (!pn) { pn = h("div", "pc-panel"); pn.id = "pcPanel"; var pr = document.querySelector(".studio-properties"); pr.insertBefore(pn, pr.querySelector(".panel-heading").nextSibling); var up = h("input"); up.type = "file"; up.accept = "image/png,image/jpeg,image/webp"; up.hidden = true; up.id = "pcUpload"; up.addEventListener("change", function () { upload(up.files[0]); up.value = ""; }); host.appendChild(up); }
    ctx = { state: state, page: page, panel: pn, save: api.save, upload: document.getElementById("pcUpload") };
    if (lastCv !== state.canvas || !hist.length) { lastCv = state.canvas; if (!hist.length) snap(); }
    dock(); enable(true); pointers(page); paint(); panel();
    if (!window.__pcKeys) { window.__pcKeys = 1; document.addEventListener("keydown", function (ev) {
      if (!ctx || ctx.state.type !== "poster" || /INPUT|TEXTAREA|SELECT/.test(ev.target.tagName)) return;
      var e = find(sel), z = ev.key.toLowerCase() === "z", y = ev.key.toLowerCase() === "y";
      if ((ev.ctrlKey || ev.metaKey) && (z || y)) { ev.preventDefault(); go(z && !ev.shiftKey ? -1 : 1); }
      else if (e && (ev.key === "Delete" || ev.key === "Backspace")) { ev.preventDefault(); ctx.state.canvas.els.splice(ctx.state.canvas.els.indexOf(e), 1); sel = null; commit(); }
    }); window.addEventListener("resize", function () { if (ctx && ctx.page.isConnected) paint(); }); }
  }
  var gq = "", gcat = "Tous";
  function gallery(host, state, pick) {
    host.textContent = ""; var col = state.color, qi = h("input", "pc-search"), chips = h("div", "pc-btns"), grid = h("div", "pc-gal");
    qi.type = "search"; qi.placeholder = "Rechercher : mariage, promo, concert…"; qi.value = gq;
    ["Tous", "Événement", "Commerce", "Élégant", "Pro"].forEach(function (c) { chips.appendChild(btn(c, function () { gcat = c; gallery(host, state, pick); }, gcat === c ? "on" : "")); });
    function fill() {
      grid.textContent = "";
      Object.keys(TPLS).forEach(function (id) {
        var t = TPLS[id];
        if (id !== "blank" && gcat !== "Tous" && t.cat !== gcat) return;
        if (gq && (t.n + " " + t.d + " " + t.k).toLowerCase().indexOf(gq.toLowerCase()) < 0) return;
        var b = h("button", "pc-card"), cv = seed(id, 560, 700, "", "", col), th = h("div", "pc-thumb"), inn = h("div", "pc-thumb-in");
        b.type = "button"; b.setAttribute("aria-pressed", String(state.template === id)); b.title = t.d;
        inn.style.background = cv.bg2 ? "linear-gradient(" + cv.angle + "deg," + cv.bg + "," + cv.bg2 + ")" : cv.bg;
        cv.els.forEach(function (e) { inn.appendChild(mk(e, col)); }); th.appendChild(inn); b.appendChild(th); b.appendChild(h("b", "", t.n));
        b.addEventListener("click", function () { pick(id); }); grid.appendChild(b);
      });
      if (!grid.children.length) grid.appendChild(h("p", "pc-hint", "Aucun modèle ne correspond. Essaie « promo », « mariage » ou « concert »."));
    }
    qi.addEventListener("input", function () { gq = qi.value; fill(); });
    host.appendChild(qi); host.appendChild(chips); host.appendChild(grid); fill();
  }
  window.PosterCanvas = { seed: seed, draw: draw, gallery: gallery, TPLS: TPLS, release: function () { enable(false); } };
})();
