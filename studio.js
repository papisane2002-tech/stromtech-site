/* Studio de design : le client compose sa maquette (site Web ou application) */
(function () {
  var $ = function (id) { return document.getElementById(id); };
  var COLORS = [["Bleu", "#2340ff"], ["Vert", "#0f9d6b"], ["Orange", "#f26b1d"], ["Violet", "#7a3cff"], ["Rouge", "#d62839"], ["Noir", "#14161f"]];
  var FONTS = { moderne: ["Moderne", "Figtree,system-ui,sans-serif"], elegante: ["Élégante", "Georgia,'Times New Roman',serif"], affirmee: ["Affirmée", "'Bricolage Grotesque',Figtree,sans-serif"] };
  var RADII = { "0": ["Carrés", "0px"], "1": ["Arrondis", "12px"], "2": ["Très arrondis", "24px"] };
  var SEC = {
    site: { about: "À propos", services: "Services", produits: "Produits", galerie: "Galerie", tarifs: "Tarifs", temoignages: "Témoignages", contact: "Contact" },
    app: { accueil: "Accueil", catalogue: "Catalogue", commande: "Panier", rdv: "Rendez-vous", messages: "Messages", profil: "Profil" }
  };
  var TPL = {
    site: {
      vitrine: { label: "Vitrine", desc: "Présenter une activité : restaurant, salon, entreprise.", hero: "center", sections: ["about", "services", "galerie", "contact"] },
      portfolio: { label: "Portfolio", desc: "Montrer ses réalisations : artiste, photographe, freelance.", hero: "left", sections: ["about", "galerie", "temoignages", "contact"] },
      boutique: { label: "Boutique", desc: "Vendre des produits avec un catalogue.", hero: "banner", sections: ["produits", "temoignages", "contact"] }
    },
    app: {
      commandes: { label: "Commandes", desc: "Catalogue, panier et suivi des commandes.", sections: ["accueil", "catalogue", "commande", "messages", "profil"] },
      rendezvous: { label: "Rendez-vous", desc: "Réservation de créneaux et messagerie.", sections: ["accueil", "rdv", "messages", "profil"] },
      gestion: { label: "Gestion", desc: "Suivre un catalogue, un stock ou des clients.", sections: ["accueil", "catalogue", "messages", "profil"] }
    }
  };
  var KEY = "stromtech_studio_draft";
  var state;
  var viewport = "desktop";
  var selectedKey = null;

  function defaults(type, tpl) {
    type = type || "site"; tpl = tpl || (type === "site" ? "vitrine" : "commandes");
    return { type: type, template: tpl, name: "", brandMode: "name", brandLogo: "", brandLogoWidth: 150, brandLogoBorder: false, brandLogoBorderColor: "#dce3f5", brandLogoBorderWidth: 1, slogan: "", color: "#2340ff", font: "moderne", radius: "1", theme: "light", sections: TPL[type][tpl].sections.slice(), notes: "", content: {}, elementColors: {}, blocks: [], blockOffsets: {}, blockPositions: {}, imageData: {}, imageWidths: {} };
  }
  function clean(o) {
    var d = defaults(o && o.type === "app" ? "app" : "site");
    if (!o || typeof o !== "object") return d;
    if (TPL[d.type][o.template]) { d.template = o.template; d.sections = TPL[d.type][o.template].sections.slice(); }
    if (typeof o.name === "string") d.name = o.name.slice(0, 60);
    if (o.brandMode === "logo" && typeof o.brandLogo === "string" && /^data:image\/webp;base64,[A-Za-z0-9+/=]+$/.test(o.brandLogo) && o.brandLogo.length < 250000) { d.brandMode = "logo"; d.brandLogo = o.brandLogo; }
    if (typeof o.brandLogoWidth === "number" && isFinite(o.brandLogoWidth)) d.brandLogoWidth = Math.max(60, Math.min(260, o.brandLogoWidth));
    if (typeof o.brandLogoBorder === "boolean") d.brandLogoBorder = o.brandLogoBorder;
    if (/^#[0-9a-f]{6}$/i.test(o.brandLogoBorderColor)) d.brandLogoBorderColor = o.brandLogoBorderColor;
    if (typeof o.brandLogoBorderWidth === "number" && isFinite(o.brandLogoBorderWidth)) d.brandLogoBorderWidth = Math.max(1, Math.min(8, o.brandLogoBorderWidth));
    if (typeof o.slogan === "string") d.slogan = o.slogan.slice(0, 120);
    if (typeof o.notes === "string") d.notes = o.notes.slice(0, 1000);
    if (/^#[0-9a-f]{6}$/i.test(o.color)) d.color = o.color;
    if (FONTS[o.font]) d.font = o.font;
    if (RADII[o.radius]) d.radius = o.radius;
    if (o.theme === "dark") d.theme = "dark";
    if (Array.isArray(o.sections)) { var ok = o.sections.filter(function (k) { return SEC[d.type][k]; }); if (ok.length) d.sections = ok.slice(0, d.type === "app" ? 5 : 7); }
    if (o.content && typeof o.content === "object") Object.keys(o.content).slice(0, 60).forEach(function (k) { if (/^[a-zA-Z0-9_-]{1,60}$/.test(k) && typeof o.content[k] === "string") d.content[k] = o.content[k].slice(0, 200); });
    if (o.elementColors && typeof o.elementColors === "object") Object.keys(o.elementColors).slice(0, 60).forEach(function (k) { if (/^[a-zA-Z0-9_-]{1,60}$/.test(k) && /^#[0-9a-f]{6}$/i.test(o.elementColors[k])) d.elementColors[k] = o.elementColors[k]; });
    if (Array.isArray(o.blocks)) d.blocks = o.blocks.slice(0, 30).filter(function (b) { return b && typeof b.id === "string" && /^block_[0-9]{1,16}$/.test(b.id) && (b.type === "text" || b.type === "button" || b.type === "image") && (b.type !== "image" || (o.imageData && typeof o.imageData[b.id] === "string" && o.imageData[b.id].indexOf("data:image/webp;base64,") === 0 && o.imageData[b.id].length < 500000)); }).map(function (b) { return { id: b.id, type: b.type }; });
    if (o.imageData && typeof o.imageData === "object") Object.keys(o.imageData).slice(0, 3).forEach(function (k) { if (/^block_[0-9]{1,16}$/.test(k) && typeof o.imageData[k] === "string" && /^data:image\/webp;base64,[A-Za-z0-9+/=]+$/.test(o.imageData[k]) && o.imageData[k].length < 500000) d.imageData[k] = o.imageData[k]; });
    if (o.imageWidths && typeof o.imageWidths === "object") Object.keys(o.imageWidths).slice(0, 3).forEach(function (k) { if (/^block_[0-9]{1,16}$/.test(k) && typeof o.imageWidths[k] === "number" && isFinite(o.imageWidths[k])) d.imageWidths[k] = Math.max(15, Math.min(100, o.imageWidths[k])); });
    if (o.blockOffsets && typeof o.blockOffsets === "object") Object.keys(o.blockOffsets).slice(0, 30).forEach(function (k) { if (/^block_[0-9]{1,16}$/.test(k) && typeof o.blockOffsets[k] === "number" && isFinite(o.blockOffsets[k])) d.blockOffsets[k] = Math.max(-45, Math.min(45, o.blockOffsets[k])); });
    if (o.blockPositions && typeof o.blockPositions === "object") Object.keys(o.blockPositions).slice(0, 30).forEach(function (k) { var p = o.blockPositions[k]; if (/^block_[0-9]{1,16}$/.test(k) && p && typeof p.x === "number" && typeof p.y === "number" && isFinite(p.x) && isFinite(p.y)) d.blockPositions[k] = { x: Math.max(-1200, Math.min(1200, p.x)), y: Math.max(-1200, Math.min(1200, p.y)) }; });
    return d;
  }
  function enc(o) { return btoa(unescape(encodeURIComponent(JSON.stringify(o)))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""); }
  function dec(s) { s = s.replace(/-/g, "+").replace(/_/g, "/"); while (s.length % 4) s += "="; return JSON.parse(decodeURIComponent(escape(atob(s)))); }
  function saveDraft() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} }
  function loadDraft() { try { return JSON.parse(localStorage.getItem(KEY)); } catch (e) { return null; } }

  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }
  function lines(n) { var f = document.createDocumentFragment(); for (var i = 0; i < n; i++) { var l = el("div", "pv-line"); l.style.width = (100 - i * 14) + "%"; f.appendChild(l); } return f; }
  function editText(tag, cls, value, key, label) {
    var node = el(tag, cls, state.content[key] != null ? state.content[key] : value);
    node.dataset.editable = key;
    node.dataset.editLabel = label;
    if (state.elementColors[key]) node.style.color = state.elementColors[key];
    return node;
  }
  function updateInspector() {
    var empty = $("inspectorEmpty"), fields = $("inspectorFields");
    var node = selectedKey && $("pv").querySelector('[data-editable="' + selectedKey + '"]');
    if (!node) { selectedKey = null; empty.hidden = false; fields.hidden = true; $("blockActions").hidden = true; return; }
    empty.hidden = true; fields.hidden = false;
    $("selectedElementName").textContent = node.dataset.editLabel || "Élément";
    $("elementText").value = state.content[selectedKey] != null ? state.content[selectedKey] : node.textContent;
    $("elementColor").value = state.elementColors[selectedKey] || "#14161f";
    var selectedBlock = state.blocks.find(function (b) { return b.id === selectedKey; });
    var isImage = selectedBlock && selectedBlock.type === "image";
    $("elementTextLabel").hidden = !!isImage; $("elementText").hidden = !!isImage;
    $("elementColorLabel").hidden = !!isImage; $("elementColor").hidden = !!isImage;
    $("imageSizeGroup").hidden = !isImage;
    if (isImage) $("imageWidth").value = state.imageWidths[selectedKey] || 60;
    $("blockActions").hidden = !selectedBlock;
  }

  function renderCustomBlocks(root) {
    if (!state.blocks.length) return;
    var wrap = el("section", "pv-custom-blocks");
    state.blocks.forEach(function (block) {
      var key = block.id;
      var node;
      if (block.type === "image") {
        node = el("img", "pv-custom-image");
        node.src = state.imageData[key] || "";
        node.alt = state.content[key] || "Image ajoutée";
        node.style.width = (state.imageWidths[key] || 60) + "%";
        node.dataset.editable = key; node.dataset.editLabel = "Image / logo";
      } else {
        node = block.type === "button" ? editText("button", "pv-btn pv-custom-button", state.content[key] != null ? state.content[key] : "Nouveau bouton", key, "Bloc bouton") : editText("p", "pv-custom-text", state.content[key] != null ? state.content[key] : "Ton nouveau texte", key, "Bloc texte");
      }
      node.dataset.blockId = block.id;
      var pos = state.blockPositions[block.id] || { x: 0, y: 0 };
      var offset = state.blockOffsets[block.id] || 0;
      node.style.transform = "translate3d(" + (pos.x + offset / 100 * 100) + "px," + pos.y + "px,0)";
      if (block.type === "button") node.type = "button";
      wrap.appendChild(node);
    });
    root.appendChild(wrap);
  }

  function styleBrandLogo(img) {
    img.style.width = state.brandLogoWidth + "px"; img.style.maxWidth = "100%";
    if (state.brandLogoBorder) { img.style.border = state.brandLogoBorderWidth + "px solid " + state.brandLogoBorderColor; img.style.padding = "5px"; img.style.borderRadius = "10px"; }
    else { img.style.border = "0"; img.style.padding = "0"; img.style.borderRadius = "0"; }
    return img;
  }

  /* ---------- Aperçu : site ---------- */
  function previewSite(root) {
    var tpl = TPL.site[state.template], nm = state.name || "Ton entreprise", sl = state.slogan || "Ton slogan s’affiche ici";
    var nav = el("div", "pv-nav");
    if (state.brandMode === "logo" && state.brandLogo) { var brandImg = styleBrandLogo(el("img", "pv-brand-logo")); brandImg.src = state.brandLogo; brandImg.alt = nm; nav.appendChild(brandImg); }
    else nav.appendChild(editText("b", "", nm, "brandName", "Nom de l’entreprise"));
    var links = el("span", "pv-links"); state.sections.slice(0, 4).forEach(function (k) { links.appendChild(el("span", "", SEC.site[k])); }); nav.appendChild(links);
    nav.appendChild(el("i", "pv-btn", "Contact")); root.appendChild(nav);
    var hero = el("div", "pv-hero pv-" + tpl.hero);
    var box = el("div", "pv-herotxt"); box.appendChild(editText("h4", "pv-h", sl, "heroTitle", "Titre principal")); box.appendChild(editText("p", "", "Une phrase courte pour expliquer ce que tu proposes à tes clients.", "heroDescription", "Description principale")); box.appendChild(editText("i", "pv-btn", tpl.hero === "banner" ? "Voir les nouveautés" : "Nous contacter", "heroButton", "Bouton principal")); hero.appendChild(box);
    if (tpl.hero === "left") hero.appendChild(el("div", "pv-avatar"));
    root.appendChild(hero);
    renderCustomBlocks(root);
    var builders = {
      about: function (b) { b.appendChild(lines(3)); },
      services: function (b) { var g = el("div", "pv-grid3"); [1, 2, 3].forEach(function (i) { var c = el("div", "pv-card"); c.appendChild(el("b", "", "Service " + i)); c.appendChild(lines(2)); g.appendChild(c); }); b.appendChild(g); },
      produits: function (b) { var g = el("div", "pv-grid4"); [1, 2, 3, 4].forEach(function (i) { var c = el("div", "pv-card"); c.appendChild(el("div", "pv-sq")); c.appendChild(el("b", "", "Produit " + i)); c.appendChild(el("span", "pv-price", (i * 5 + 5) + " 000 FCFA")); g.appendChild(c); }); b.appendChild(g); },
      galerie: function (b) { var g = el("div", "pv-grid3"); for (var i = 0; i < 6; i++) g.appendChild(el("div", "pv-sq")); b.appendChild(g); },
      tarifs: function (b) { var g = el("div", "pv-grid3"); ["Basique", "Standard", "Premium"].forEach(function (n) { var c = el("div", "pv-card"); c.appendChild(el("b", "", n)); c.appendChild(el("span", "pv-price", "— FCFA")); c.appendChild(lines(2)); g.appendChild(c); }); b.appendChild(g); },
      temoignages: function (b) { var g = el("div", "pv-grid2"); [1, 2].forEach(function () { var c = el("div", "pv-card"); c.appendChild(el("p", "", "“Un travail soigné, livré dans les temps.”")); c.appendChild(el("b", "", "Prénom Nom")); g.appendChild(c); }); b.appendChild(g); },
      contact: function (b) { var c = el("div", "pv-card"); c.appendChild(el("div", "pv-input", "Ton nom")); c.appendChild(el("div", "pv-input", "Ton message")); c.appendChild(el("i", "pv-btn", "Envoyer")); b.appendChild(c); }
    };
    state.sections.forEach(function (k) { var s = el("section", "pv-sec"); s.appendChild(editText("h5", "", SEC.site[k], "section_" + k, "Titre : " + SEC.site[k])); builders[k](s); root.appendChild(s); });
    root.appendChild(editText("div", "pv-foot", "© " + nm, "footerText", "Pied de page"));
  }

  /* ---------- Aperçu : application ---------- */
  var appTab = null;
  function previewApp(root) {
    var nm = state.name || "Ton appli", sl = state.slogan || "Ton slogan s’affiche ici";
    if (state.sections.indexOf(appTab) < 0) appTab = state.sections[0];
    var ph = el("div", "phone");
    if (state.brandMode === "logo" && state.brandLogo) { var appLogo = styleBrandLogo(el("img", "pv-brand-logo pv-app-logo")); appLogo.src = state.brandLogo; appLogo.alt = nm; ph.appendChild(appLogo); }
    else ph.appendChild(editText("div", "pv-appbar", nm, "appName", "Nom de l’application"));
    var scr = el("div", "pv-screen");
    var S = {
      accueil: function () { scr.appendChild(editText("h4", "pv-h", "Bonjour", "appGreeting", "Titre d’accueil")); scr.appendChild(editText("p", "", sl, "appSlogan", "Slogan de l’application")); var c = el("div", "pv-card pv-accent"); c.appendChild(el("b", "", "Offre du moment")); c.appendChild(lines(2)); scr.appendChild(c); var g = el("div", "pv-grid2"); ["Action 1", "Action 2"].forEach(function (t) { var x = el("div", "pv-card"); x.appendChild(el("b", "", t)); g.appendChild(x); }); scr.appendChild(g); },
      catalogue: function () { [1, 2, 3].forEach(function (i) { var r = el("div", "pv-row"); r.appendChild(el("div", "pv-thumb")); var m = el("div", "pv-grow"); m.appendChild(el("b", "", "Article " + i)); m.appendChild(lines(1)); r.appendChild(m); r.appendChild(el("span", "pv-price", (i * 2 + 3) + " 000")); scr.appendChild(r); }); },
      commande: function () { [1, 2].forEach(function (i) { var r = el("div", "pv-row"); r.appendChild(el("div", "pv-thumb")); r.appendChild(el("b", "pv-grow", "Article " + i + " × 1")); r.appendChild(el("span", "pv-price", (i * 2 + 3) + " 000")); scr.appendChild(r); }); scr.appendChild(el("p", "", "Total : 12 000 FCFA")); scr.appendChild(el("i", "pv-btn pv-full", "Commander")); },
      rdv: function () { var d = el("div", "pv-days"); ["Lun", "Mar", "Mer", "Jeu", "Ven"].forEach(function (x, i) { d.appendChild(el("span", i === 1 ? "on" : "", x)); }); scr.appendChild(d); var t = el("div", "pv-grid3"); ["09:00", "10:30", "14:00", "15:30", "16:00", "17:30"].forEach(function (x, i) { t.appendChild(el("span", "pv-slot" + (i === 2 ? " on" : ""), x)); }); scr.appendChild(t); scr.appendChild(el("i", "pv-btn pv-full", "Réserver")); },
      messages: function () { scr.appendChild(el("div", "pv-bub", "Bonjour, comment puis-je t’aider ?")); scr.appendChild(el("div", "pv-bub me", "Je voudrais plus d’informations.")); scr.appendChild(el("div", "pv-input", "Écris ton message")); },
      profil: function () { scr.appendChild(el("div", "pv-avatar pv-center")); scr.appendChild(el("h4", "pv-h pv-ctr", "Ton profil")); ["Mes informations", "Mes commandes", "Aide"].forEach(function (t) { scr.appendChild(el("div", "pv-row", t)); }); }
    };
    S[appTab](); renderCustomBlocks(scr); ph.appendChild(scr);
    var bar = el("div", "pv-tabs");
    state.sections.forEach(function (k) { var b = el("button", k === appTab ? "on" : "", SEC.app[k]); b.type = "button"; b.addEventListener("click", function () { appTab = k; render(); }); bar.appendChild(b); });
    ph.appendChild(bar); root.appendChild(ph);
  }

  function render() {
    var root = $("pv"); root.textContent = "";
    var dark = state.theme === "dark";
    root.style.setProperty("--pc", state.color);
    root.style.setProperty("--pbg", dark ? "#12141c" : "#ffffff");
    root.style.setProperty("--ptx", dark ? "#f2f4ff" : "#14161f");
    root.style.setProperty("--ppn", dark ? "#1e2230" : "#f4f6fb");
    root.style.setProperty("--pr", RADII[state.radius][1]);
    root.style.setProperty("--pf", FONTS[state.font][1]);
    $("frame").className = "frame is-" + state.type;
    $("frame").dataset.viewport = viewport;
    document.querySelectorAll("[data-viewport]").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-viewport") === viewport));
    });
    var label = $("viewLabel");
    if (label) label.textContent = state.type === "app" ? "Aperçu de l’application · mobile" : "Aperçu du site · " + (viewport === "desktop" ? "ordinateur" : viewport === "tablet" ? "tablette" : "mobile");
    document.querySelectorAll(".viewport-switch button").forEach(function (b) {
      b.hidden = state.type === "app" && b.getAttribute("data-viewport") !== "mobile";
    });
    if (state.type === "site") previewSite(root); else previewApp(root);
    if (selectedKey) { var selected = root.querySelector('[data-editable="' + selectedKey + '"]'); if (selected) selected.classList.add("is-selected"); }
    updateInspector();
  }

  /* ---------- Commandes ---------- */
  function seg(host, items, current, onPick) {
    host.textContent = "";
    items.forEach(function (it) { var b = el("button", "", it[1]); b.type = "button"; b.setAttribute("aria-pressed", String(it[0] === current)); b.addEventListener("click", function () { onPick(it[0]); }); host.appendChild(b); });
  }
  function buildControls() {
    seg($("typeSeg"), [["site", "Site Web"], ["app", "Application mobile"]], state.type, function (v) { if (v !== state.type) { state = Object.assign(defaults(v), { name: state.name, brandMode: state.brandMode, brandLogo: state.brandLogo, brandLogoWidth: state.brandLogoWidth, brandLogoBorder: state.brandLogoBorder, brandLogoBorderColor: state.brandLogoBorderColor, brandLogoBorderWidth: state.brandLogoBorderWidth, slogan: state.slogan, color: state.color, font: state.font, radius: state.radius, theme: state.theme, notes: state.notes }); change(true); } });
    var tl = $("tplList"); tl.textContent = "";
    Object.keys(TPL[state.type]).forEach(function (k) {
      var t = TPL[state.type][k], b = el("button", "tpl"); b.type = "button"; b.setAttribute("aria-pressed", String(k === state.template));
      b.appendChild(el("b", "", t.label)); b.appendChild(el("span", "", t.desc));
      b.addEventListener("click", function () { state.template = k; state.sections = t.sections.slice(); change(true); }); tl.appendChild(b);
    });
    var sw = $("swatches"); sw.textContent = "";
    COLORS.forEach(function (c) { var b = el("button", "sw"); b.type = "button"; b.style.background = c[1]; b.title = c[0]; b.setAttribute("aria-label", c[0]); b.setAttribute("aria-pressed", String(state.color.toLowerCase() === c[1])); b.addEventListener("click", function () { state.color = c[1]; change(true); }); sw.appendChild(b); });
    $("color").value = state.color;
    seg($("themeSeg"), [["light", "Clair"], ["dark", "Sombre"]], state.theme, function (v) { state.theme = v; change(true); });
    seg($("radiusSeg"), Object.keys(RADII).map(function (k) { return [k, RADII[k][0]]; }), state.radius, function (v) { state.radius = v; change(true); });
    $("font").value = state.font;
    $("name").value = state.name; $("slogan").value = state.slogan; $("notes").value = state.notes;
    $("brandNameField").hidden = state.brandMode === "logo";
    $("brandLogoField").hidden = state.brandMode !== "logo";
    $("brandNameMode").setAttribute("aria-pressed", String(state.brandMode === "name"));
    $("brandLogoMode").setAttribute("aria-pressed", String(state.brandMode === "logo"));
    $("brandLogoStatus").textContent = state.brandLogo ? "Logo ajouté à l’aperçu." : "PNG, JPG ou WebP · 5 Mo maximum";
    $("removeBrandLogo").hidden = !state.brandLogo;
    $("brandLogoWidth").value = state.brandLogoWidth; $("brandLogoWidthValue").textContent = state.brandLogoWidth + " px";
    $("brandLogoBorder").checked = state.brandLogoBorder; $("brandLogoBorderOptions").hidden = !state.brandLogoBorder;
    $("brandLogoBorderColor").value = state.brandLogoBorderColor; $("brandLogoBorderWidth").value = state.brandLogoBorderWidth; $("brandLogoBorderWidthValue").textContent = state.brandLogoBorderWidth + " px";
    $("secLegend").textContent = state.type === "site" ? "Sections de ta page" : "Écrans de ton application (5 maximum)";
    var sl = $("secList"); sl.textContent = ""; var max = state.type === "app" ? 5 : 7, full = state.sections.length >= max;
    Object.keys(SEC[state.type]).forEach(function (k) {
      var on = state.sections.indexOf(k) >= 0, lab = el("label", "chk"), cb = document.createElement("input"); cb.type = "checkbox"; cb.checked = on;
      cb.disabled = (!on && full) || (state.type === "app" && k === "accueil");
      cb.addEventListener("change", function () { state.sections = Object.keys(SEC[state.type]).filter(function (x) { return x === k ? cb.checked : state.sections.indexOf(x) >= 0; }); change(true); });
      lab.appendChild(cb); lab.appendChild(document.createTextNode(" " + SEC[state.type][k])); sl.appendChild(lab);
    });
  }
  function change(rebuild) { if (rebuild) buildControls(); render(); saveDraft(); }

  function bind() {
    bindBlockDragging();
    $("pv").addEventListener("click", function (event) {
      var target = event.target.closest("[data-editable]");
      if (!target) return;
      event.preventDefault();
      selectedKey = target.dataset.editable;
      render();
    });
    $("elementText").addEventListener("input", function () {
      if (!selectedKey) return;
      state.content[selectedKey] = $("elementText").value.slice(0, 200);
      render(); saveDraft();
    });
    $("elementColor").addEventListener("input", function () {
      if (!selectedKey) return;
      state.elementColors[selectedKey] = $("elementColor").value;
      render(); saveDraft();
    });
    $("clearSelection").addEventListener("click", function () { selectedKey = null; render(); });
    $("addTextBlock").addEventListener("click", function () { addBlock("text"); });
    $("addButtonBlock").addEventListener("click", function () { addBlock("button"); });
    $("addImageBlock").addEventListener("click", function () { $("imageUpload").click(); });
    $("brandNameMode").addEventListener("click", function () { state.brandMode = "name"; change(true); });
    $("brandLogoMode").addEventListener("click", function () { state.brandMode = "logo"; buildControls(); render(); saveDraft(); if (!state.brandLogo) $("brandLogoUpload").click(); });
    $("chooseBrandLogo").addEventListener("click", function () { $("brandLogoUpload").click(); });
    $("brandLogoUpload").addEventListener("change", function () { if (this.files && this.files[0]) addBrandLogo(this.files[0]); this.value = ""; });
    $("removeBrandLogo").addEventListener("click", function () { state.brandLogo = ""; state.brandMode = "name"; change(true); });
    $("brandLogoWidth").addEventListener("input", function () { state.brandLogoWidth = Number(this.value); $("brandLogoWidthValue").textContent = this.value + " px"; render(); saveDraft(); });
    $("brandLogoBorder").addEventListener("change", function () { state.brandLogoBorder = this.checked; $("brandLogoBorderOptions").hidden = !this.checked; render(); saveDraft(); });
    $("brandLogoBorderColor").addEventListener("input", function () { state.brandLogoBorderColor = this.value; render(); saveDraft(); });
    $("brandLogoBorderWidth").addEventListener("input", function () { state.brandLogoBorderWidth = Number(this.value); $("brandLogoBorderWidthValue").textContent = this.value + " px"; render(); saveDraft(); });
    $("imageUpload").addEventListener("change", function () { if (this.files && this.files[0]) addImage(this.files[0]); this.value = ""; });
    $("imageWidth").addEventListener("input", function () {
      if (!selectedKey) return;
      state.imageWidths[selectedKey] = Number(this.value);
      var img = $("pv").querySelector('[data-block-id="' + selectedKey + '"]');
      if (img) img.style.width = this.value + "%";
      saveDraft();
    });
    $("deleteBlock").addEventListener("click", deleteSelectedBlock);
    document.querySelectorAll("[data-viewport]").forEach(function (b) {
      b.addEventListener("click", function () {
        viewport = b.getAttribute("data-viewport");
        render();
      });
    });
    $("font").addEventListener("change", function () { state.font = $("font").value; change(false); });
    $("color").addEventListener("input", function () { state.color = $("color").value; change(false); });
    $("color").addEventListener("change", function () { buildControls(); });
    ["name", "slogan", "notes"].forEach(function (id) { $(id).addEventListener("input", function () { state[id] = $(id).value; change(false); }); });
    $("reset").addEventListener("click", function () { state = defaults(); try { localStorage.removeItem(KEY); } catch (e) {} change(true); showMsg($("warn"), ""); });
    $("sendBtn").addEventListener("click", send);
  }

  function addBlock(type) {
    if (state.blocks.length >= 30) { showMsg($("warn"), "Tu peux ajouter jusqu’à 30 blocs dans cette maquette.", true); return; }
    var id = "block_" + Date.now();
    while (state.blocks.some(function (b) { return b.id === id; })) id = "block_" + (Number(id.slice(6)) + 1);
    state.blocks.push({ id: id, type: type });
    state.content[id] = type === "button" ? "Nouveau bouton" : "Ton nouveau texte";
    selectedKey = id; render(); saveDraft();
  }
  function addImage(file) {
    if (!/^image\/(png|jpeg|webp)$/.test(file.type)) { showMsg($("warn"), "Choisis une image PNG, JPG ou WebP.", true); return; }
    if (file.size > 5 * 1024 * 1024) { showMsg($("warn"), "Image trop volumineuse : 5 Mo maximum avant optimisation.", true); return; }
    var used = Object.keys(state.imageData).reduce(function (n, k) { return n + state.imageData[k].length; }, 0);
    if (Object.keys(state.imageData).length >= 3 || used >= 450000) { showMsg($("warn"), "Limite atteinte : 3 images maximum et 450 Ko au total après optimisation.", true); return; }
    var reader = new FileReader();
    reader.onload = function () {
      var image = new Image();
      image.onload = function () {
        var scale = Math.min(1, 1000 / Math.max(image.width, image.height));
        var canvas = document.createElement("canvas"); canvas.width = Math.max(1, Math.round(image.width * scale)); canvas.height = Math.max(1, Math.round(image.height * scale));
        var ctx = canvas.getContext("2d"); ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        var data = canvas.toDataURL("image/webp", 0.72);
        var total = Object.keys(state.imageData).reduce(function (n, k) { return n + state.imageData[k].length; }, 0) + data.length;
        if (data.length > 300000 || total > 450000) { showMsg($("warn"), "Cette image reste trop volumineuse après optimisation. Essaie une image plus légère.", true); return; }
        var id = "block_" + Date.now();
        state.blocks.push({ id: id, type: "image" }); state.imageData[id] = data; state.imageWidths[id] = 60; state.content[id] = file.name.slice(0, 80);
        selectedKey = id; showMsg($("warn"), "Image ajoutée et optimisée.", false); render(); saveDraft();
      };
      image.onerror = function () { showMsg($("warn"), "Impossible de lire cette image.", true); };
      image.src = reader.result;
    };
    reader.onerror = function () { showMsg($("warn"), "La lecture du fichier a échoué.", true); };
    reader.readAsDataURL(file);
  }

  function addBrandLogo(file) {
    if (!/^image\/(png|jpeg|webp)$/.test(file.type)) { showMsg($("warn"), "Choisis un logo PNG, JPG ou WebP.", true); return; }
    if (file.size > 5 * 1024 * 1024) { showMsg($("warn"), "Logo trop volumineux : 5 Mo maximum.", true); return; }
    var reader = new FileReader();
    reader.onload = function () {
      var image = new Image();
      image.onload = function () {
        var scale = Math.min(1, 700 / Math.max(image.width, image.height));
        var canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(image.width * scale));
        canvas.height = Math.max(1, Math.round(image.height * scale));
        canvas.getContext("2d").drawImage(image, 0, 0, canvas.width, canvas.height);
        var data = canvas.toDataURL("image/webp", 0.78);
        if (data.length > 220000) { showMsg($("warn"), "Ce logo est trop lourd. Essaie une image plus légère.", true); return; }
        state.brandLogo = data; state.brandMode = "logo";
        change(true); showMsg($("warn"), "Logo ajouté à l’identité de ton entreprise.", false);
      };
      image.onerror = function () { showMsg($("warn"), "Impossible de lire ce logo.", true); };
      image.src = reader.result;
    };
    reader.onerror = function () { showMsg($("warn"), "La lecture du logo a échoué.", true); };
    reader.readAsDataURL(file);
  }

  function bindBlockDragging() {
    var drag = null, host = $("pv");
    host.addEventListener("pointerdown", function (event) {
      var node = event.target.closest("[data-block-id]");
      if (!node || event.button !== 0) return;
      selectedKey = node.dataset.blockId;
      var pos = state.blockPositions[selectedKey] || { x: 0, y: 0 };
      drag = { id: selectedKey, node: node, pointerId: event.pointerId, startX: event.clientX, startY: event.clientY, x: pos.x, y: pos.y, moved: false };
      node.classList.add("is-selected", "is-dragging");
      if (node.setPointerCapture) node.setPointerCapture(event.pointerId);
      updateInspector();
      event.preventDefault();
    });
    host.addEventListener("pointermove", function (event) {
      if (!drag || event.pointerId !== drag.pointerId) return;
      var dx = event.clientX - drag.startX, dy = event.clientY - drag.startY;
      if (Math.abs(dx) + Math.abs(dy) > 3) drag.moved = true;
      if (!drag.moved) return;
      var x = Math.max(-1200, Math.min(1200, drag.x + dx));
      var y = Math.max(-1200, Math.min(1200, drag.y + dy));
      drag.node.style.transform = "translate3d(" + x + "px," + y + "px,0)";
    });
    function finish(event) {
      if (!drag || (event && event.pointerId !== drag.pointerId)) return;
      if (drag.moved) {
        var dx = event.clientX - drag.startX, dy = event.clientY - drag.startY;
        state.blockPositions[drag.id] = { x: Math.max(-1200, Math.min(1200, drag.x + dx)), y: Math.max(-1200, Math.min(1200, drag.y + dy)) };
        saveDraft();
      }
      drag.node.classList.remove("is-dragging");
      drag = null;
      updateInspector();
    }
    host.addEventListener("pointerup", finish);
    host.addEventListener("pointercancel", finish);
  }
  function selectedBlockIndex() { return state.blocks.findIndex(function (b) { return b.id === selectedKey; }); }
  function deleteSelectedBlock() {
    var i = selectedBlockIndex(); if (i < 0) return;
    var key = state.blocks[i].id;
    state.blocks.splice(i, 1); delete state.content[key]; delete state.elementColors[key]; delete state.blockOffsets[key]; delete state.blockPositions[key]; delete state.imageData[key]; delete state.imageWidths[key];
    selectedKey = null; render(); saveDraft();
  }

  async function send() {
    var warn = $("warn"), btn = $("sendBtn");
    if (!window.cfgOk) return showMsg(warn, "Configuration manquante : renseigne config.js.", true);
    var s = (await sb.auth.getSession()).data.session;
    if (!s) { saveDraft(); location.href = "connexion.html?next=studio.html"; return; }
    var user = s.user; btn.disabled = true;
    var meta = user.user_metadata || {}, who = state.name || meta.name || user.email;
    var kind = state.type === "site" ? "site Web" : "application";
    var link = location.href.replace(/[?#].*$/, "").replace(/[^/]*$/, "") + "studio.html?d=" + enc(state);
    var secs = state.sections.map(function (k) { return SEC[state.type][k]; }).join(", ");
    var body = ["Maquette " + kind + " créée dans le studio de design", "", "Modèle : " + TPL[state.type][state.template].label, "Nom : " + (state.name || "—"), "Slogan : " + (state.slogan || "—"), "Couleur : " + state.color, "Thème : " + (state.theme === "dark" ? "sombre" : "clair"), "Police : " + FONTS[state.font][0], "Coins : " + RADII[state.radius][0], (state.type === "site" ? "Sections : " : "Écrans : ") + secs, state.notes ? "Remarques : " + state.notes : null, meta.phone ? "Téléphone : " + meta.phone : null, "", "Voir la maquette : " + link].filter(function (x) { return x !== null; }).join("\n");
    var c = await sb.from("conversations").insert({ customer_id: user.id, subject: "Maquette " + kind + " · " + who }).select("id").single();
    if (c.error) { btn.disabled = false; return showMsg(warn, "Maquette non envoyée : " + c.error.message, true); }
    var m = await sb.from("messages").insert({ conversation_id: c.data.id, sender_id: user.id, body: body });
    btn.disabled = false;
    if (m.error) return showMsg(warn, "Conversation créée mais message non envoyé : " + m.error.message, true);
    try { localStorage.removeItem(KEY); } catch (e) {}
    location.href = "espace.html?open=" + encodeURIComponent(c.data.id);
  }

  var d = new URLSearchParams(location.search).get("d"), shared = false;
  if (d) { try { state = clean(dec(d)); shared = true; } catch (e) { state = null; } }
  if (!state) state = clean(loadDraft());
  if (shared) { $("sharedNote").hidden = false; }
  bind(); buildControls(); render();
  if (window.cfgOk) sb.auth.getSession().then(function (r) { var u = r.data.session && r.data.session.user; if (u && u.id === STROMTECH.ADMIN_ID) { $("sendBtn").hidden = true; } });
})();
