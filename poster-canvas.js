/* Atelier Affiches : canevas libre façon Canva (fond, dégradé, polices, formes, images, calques, annuler/rétablir) */
(function () {
  var FONTS = ["Figtree", "Bebas Neue", "Anton", "Oswald", "Montserrat", "Poppins", "Raleway", "Playfair Display", "Roboto Slab", "Pacifico", "Lobster", "Dancing Script", "Permanent Marker", "Great Vibes", "Allura", "Parisienne", "Sacramento", "Alex Brush", "Cormorant Garamond", "Bodoni Moda", "Italiana", "Cinzel", "Marcellus", "Tenor Sans", "Josefin Sans", "Abril Fatface"];
  var PAL = [["#087f6b", "#ffffff"], ["#2340ff", "#ffffff"], ["#f26b1d", "#ffffff"], ["#7a3cff", "#ffffff"], ["#d62839", "#ffffff"], ["#14161f", "#ffffff"], ["#f4eee5", "#302820"], ["#ffd23f", "#14161f"], ["#ffffff", "#14161f"]];
  var sel = null, hist = [], hi = -1, lastCv = null, ctx = null, n = 0;

  function h(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text) e.textContent = text; return e; }
  function nid(cv) { n = Math.max(n, cv.els.reduce(function (m, e) { return Math.max(m, +e.id.slice(1) || 0); }, 0)); return "e" + (++n); }
  function T(cv, o) { o = Object.assign({ k: "t", x: 0, y: 0, w: 200, h: 40, rot: 0, tx: "", fs: 18, fw: 400, fi: 0, ff: "Figtree", c: "#14161f", al: "left", bg: "", rad: 0, op: 100, ac: 0, sp: "", fx: "", fc: "#ff2bd6", bd: "", bw: 0, fl: "", ls: 0, lh: 0, gr: "", ph: 0 }, o); o.id = nid(cv); cv.els.push(o); return o; }

  var CLIP = { tri: "polygon(50% 0,100% 100%,0 100%)", star: "polygon(50% 0,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)", diamond: "polygon(50% 0,100% 50%,50% 100%,0 50%)", hex: "polygon(25% 0,75% 0,100% 50%,75% 100%,25% 100%,0 50%)", arrow: "polygon(0 30%,60% 30%,60% 10%,100% 50%,60% 90%,60% 70%,0 70%)", plus: "polygon(35% 0,65% 0,65% 35%,100% 35%,100% 65%,65% 65%,65% 100%,35% 100%,35% 65%,0 65%,0 35%,35% 35%)" };
  var METAL = { gold: "linear-gradient(120deg,#7a5410 0%,#d4a437 24%,#f6dc8a 42%,#b8861f 60%,#e7bf5c 80%,#7a5410 100%)", rosegold: "linear-gradient(120deg,#8a4a3c 0%,#d9937c 26%,#f6cdbd 44%,#b66f5a 62%,#e5a690 82%,#8a4a3c 100%)", silver: "linear-gradient(120deg,#6b7280 0%,#d1d5db 28%,#ffffff 45%,#9ca3af 62%,#e5e7eb 82%,#6b7280 100%)" };
  var GRADS = { gold: METAL.gold, rosegold: METAL.rosegold, silver: METAL.silver, goldball: "radial-gradient(circle at 32% 26%,#fff7d6 0,#f0cf7a 28%,#c9983a 62%,#8a6a1f 100%)", pearlball: "radial-gradient(circle at 32% 26%,#ffffff 0,#f1ece4 45%,#cfc6b8 100%)", roseball: "radial-gradient(circle at 32% 26%,#fff0f4 0,#f7a8c0 40%,#d9567f 100%)", blueball: "radial-gradient(circle at 32% 26%,#eaf4ff 0,#7fb2ff 40%,#2a5fd6 100%)", redball: "radial-gradient(circle at 32% 26%,#ffe5e5 0,#ff7a7a 40%,#c4202c 100%)", purpleball: "radial-gradient(circle at 32% 26%,#f3e8ff 0,#b48cff 40%,#6a2fd0 100%)", tealball: "radial-gradient(circle at 32% 26%,#e6fffb 0,#5fe0cf 40%,#0f9d8b 100%)", ink: "linear-gradient(160deg,#1c2133,#07080d)", sunset: "linear-gradient(160deg,#ff9a3c,#d6249f)", blush: "linear-gradient(160deg,#fbe5e0,#f3c9c0)", sky: "linear-gradient(160deg,#d8ecff,#a9d0ff)" };
  var FL = { bw: "grayscale(1)", sepia: "sepia(.8)", blur: "blur(3px)", dark: "brightness(.6)", vivid: "saturate(1.8)" };
  var ICONS = [["🎉", "fête party"], ["🎂", "anniversaire gâteau"], ["🎵", "musique concert"], ["🎤", "micro chant"], ["🔥", "chaud promo feu"], ["⭐", "étoile"], ["❤️", "coeur amour mariage"], ["👑", "roi reine luxe"], ["📍", "lieu adresse"], ["📞", "téléphone appel"], ["💰", "argent prix"], ["🛍️", "shopping boutique"], ["🍔", "burger restaurant"], ["🍕", "pizza restaurant"], ["☕", "café"], ["🎁", "cadeau"], ["✨", "magie brillant"], ["🏆", "trophée sport"], ["⚽", "football sport"], ["🎓", "diplôme formation"], ["💼", "business pro"], ["📢", "annonce"], ["🚀", "lancement"], ["🌴", "vacances voyage"], ["🌙", "nuit soirée"], ["💎", "diamant luxe"], ["✅", "validé"], ["💒", "mariage"], ["🏠", "immobilier maison"]];
  var P = function (tx, x, y, w, hh, fs, c, o) { return [x, y, w, hh, Object.assign({ tx: tx, fs: fs, c: c, al: "center", fw: 700 }, o || {})]; };
  var S = function (x, y, w, hh, bg, o) { return [x, y, w, hh, Object.assign({ bg: bg }, o || {})]; };
  var BTN = function (tx, x, y, w, bg, c, o) { return P(tx, x, y, w, 7, 3.2, c, Object.assign({ bg: bg, rad: 999, ff: "Montserrat" }, o || {})); };
/* PREMIUM_BUILT */
  /* ===== Modèles d'affiches premium =====
     Positions et tailles en % de la page ; fs en % de la largeur ; {n|…}/{s|…} = nom/slogan en MAJUSCULES, {N|…}/{S|…} = tels que saisis */
  var GOLD = "#b8924a", ROSE = "#c98a78", INK = "#14161f";
  function E() { var out = []; [].slice.call(arguments).forEach(function (x) { if (!x) return; if (Array.isArray(x[0])) x.forEach(function (y) { out.push(y); }); else out.push(x); }); return out; }
  var L = function (x, y, w, gr, o) { return S(x, y, w, 0.14, "", Object.assign({ gr: gr || "gold" }, o || {})); };
  var V = function (x, y, hh, gr) { return S(x, y, 0.2, hh, "", { gr: gr || "gold" }); };
  var CAP = function (tx, x, y, w, fs, c, o) { return P(tx, x, y, w, 4, fs, c, Object.assign({ ff: "Montserrat", fw: 400, ls: 3 }, o || {})); };
  var SCR = function (tx, x, y, w, hh, fs, o) { return P(tx, x, y, w, hh, fs, GOLD, Object.assign({ ff: "Great Vibes", fw: 400, fx: "gold" }, o || {})); };
  var HDIV = function (cx, y, w, gr) { var a = (w - 5) / 2; return [L(cx - w / 2, y + 1.1, a, gr), P("♥", cx - 2.5, y, 5, 3, 2.2, GOLD, { fx: gr === "rosegold" ? "rosegold" : "gold" }), L(cx + 2.5, y + 1.1, a, gr)]; };
  var BAL = function (x, y, w, hh, gr, rot) { return [S(x, y, w, hh, "", { sp: "balloon", gr: gr, rot: rot || 0 }), S(x + w / 2 - 1, y + hh - 0.6, 2, 1.4, "#b8924a", { sp: "tri", rot: 180 })]; };
  var CONF = function (a) { return a.map(function (c) { return S(c[0], c[1], c[4] || 2.4, c[4] ? c[4] * 0.55 : 1.3, c[3] || "#d9b45f", { rot: c[2], gr: c[3] ? "" : "gold", sp: c[5] || "" }); }); };
  var PHOTO = function (x, y, w, hh, o) { return [x, y, w, hh, Object.assign({ k: "i", src: "", ph: 1 }, o || {})]; };
  var RING = function (x, y, s, glyph, c) { c = c || GOLD; return [S(x, y, s, s * 0.8, "", { rad: 999, bd: c, bw: 1.5 }), P(glyph, x, y + s * 0.1, s, s * 0.6, s * 0.5, c, { fw: 400, ff: "Montserrat" })]; };
  var INFO3 = function (y, cols, c, lc) { var o = []; cols.forEach(function (col, i) { var x = 4 + i * 31.5; o.push(P(col[0], x + (col[2] ? 9 : 0), y, col[2] ? 21 : 29, 3, 2.1, c, { ff: "Montserrat", fw: 700, ls: 2, al: col[2] ? "left" : "center" })); o.push(P(col[1], x + (col[2] ? 9 : 0), y + 3.2, col[2] ? 21 : 29, 8, 2.5, c, { ff: "Montserrat", fw: 400, ls: 0.6, lh: 1.35, al: col[2] ? "left" : "center" })); if (i) o.push(V(x - 1.2, y - 0.5, 10, lc)); }); return o; };
  var TPLS = {
    blank: { n: "Page blanche", d: "Commence de zéro et ajoute tes éléments.", k: "vide blanc libre zéro", cat: "Tous", bg: "#ffffff", e: [] },
    /* ---------- Fêtes ---------- */
    anniv_luxe: { n: "Anniversaire luxe", d: "Blanc, or métallique, ballons et grande photo.", k: "anniversaire birthday luxe or doré ballons élégant femme", cat: "Fêtes", bg: "#ffffff", bg2: "#fbf3e4", a: 180, e: E(
      BAL(-7, -6, 17, 21, "goldball", -10), BAL(3, -9, 13, 17, "pearlball", 8), BAL(94.5, 30, 12, 15, "goldball", 10), BAL(96, 43, 10, 13, "pearlball", -6),
      CONF([[18, 7, 30], [88, 22, -20], [72, 62, 40], [6, 40, 10], [92, 50, 60]]),
      CAP("VOUS ÊTES INVITÉ(E) À", 18, 3, 64, 2.5, "#2b2b2b"), SCR("{S|Aminata}", 18, 6.5, 78, 14, 17), P("ANNIVERSAIRE", 16, 18.5, 82, 9, 8.6, "#111111", { ff: "Bodoni Moda", fw: 400 }),
      CAP("C É L É B R A T I O N", 22, 27.2, 70, 2.8, GOLD, { ls: 6 }), HDIV(57, 30.2, 24),
      PHOTO(3, 32, 46, 52, { sp: "arch", bd: GOLD, bw: 2 }),
      CAP("SAMEDI", 53, 33.5, 43, 2.5, "#2b2b2b", { ls: 5 }), P("14", 53, 36.5, 43, 11, 14, "#111111", { ff: "Bodoni Moda", fw: 400 }), SCR("Décembre", 53, 47, 43, 7, 8.4), CAP("2 0 2 6", 53, 55, 43, 2.8, "#2b2b2b", { ls: 5 }),
      HDIV(74.5, 60, 20), CAP("UNE ANNÉE DE", 53, 65, 43, 2.3, "#2b2b2b", { ls: 3 }), SCR("Grâce & Bonheur", 53, 67.5, 43, 7, 6.6), P("VENEZ CÉLÉBRER L’AMOUR, LE RIRE ET DE BEAUX SOUVENIRS", 54, 76, 41, 8, 2.4, "#2b2b2b", { ff: "Montserrat", fw: 400, ls: 1.5, lh: 1.5 }),
      INFO3(84.8, [["HEURE", "18h00\nprécises"], ["SALLE LE LUXE", "12 rue de la Fête\nDakar"], ["DRESS CODE", "Tout en blanc\ntouche d’or"]], "#2b2b2b"),
      CAP("RSVP : 77 123 45 67", 20, 95.6, 60, 2.5, "#2b2b2b", { ls: 5 })) },
    anniv: { n: "Anniversaire festif", d: "Dégradé rose-orange, confettis et photo ronde.", k: "anniversaire fête party enfant ado pop couleurs", cat: "Fêtes", bg: "#ff3d8b", bg2: "#ff9a3c", a: 160, e: E(
      S(-12, -6, 36, 28, "#ffd23f", { rad: 999, op: 95 }), S(84, 2, 16, 13, "#29d3c8", { rad: 999 }), S(72, 76, 44, 35, "#7a3cff", { rad: 999, op: 85 }), S(6, 60, 8, 6, "#ffffff", { sp: "star", rot: 20 }), S(46, 14, 5, 4, "#ffd23f", { sp: "diamond", rot: 15 }),
      CONF([[40, 8, 25, "#ffffff"], [90, 30, -30, "#ffd23f"], [10, 85, 20, "#29d3c8"], [60, 90, 50, "#ffffff"]]),
      P("Joyeux", 6, 5, 60, 10, 11, "#ffffff", { ff: "Pacifico", fx: "shadow", al: "left" }), P("{s|ANNIVERSAIRE}", 6, 15, 88, 11, 11, "#14161f", { ff: "Anton", al: "left" }),
      P("25", 5, 29, 46, 24, 32, "#ffd23f", { ff: "Anton", fx: "outline", fc: "#14161f", al: "left" }), P("ANS", 8, 52, 40, 8, 10, "#ffffff", { ff: "Bebas Neue", al: "left", ls: 6 }),
      PHOTO(50, 28, 46, 36.8, { sp: "oval", bd: "#ffffff", bw: 6 }),
      P("Samedi 14 décembre · 20h", 6, 72, 88, 5, 4.4, "#ffffff", { fw: 700, ff: "Poppins", al: "left" }), P("Chez Awa · Médina, Dakar", 6, 78, 88, 5, 3.8, "#ffffff", { fw: 400, ff: "Poppins", al: "left" }), BTN("VENEZ NOMBREUX", 6, 87, 46, "#ffffff", "#d6249f")) },
    anniv_enfant: { n: "Anniversaire enfant", d: "Ciel pastel, ballons colorés et photo ronde.", k: "anniversaire enfant bébé kids ballons goûter", cat: "Fêtes", bg: "#bfe3ff", bg2: "#fff6e0", a: 180, e: E(
      BAL(2, 2, 15, 19, "roseball", -8), BAL(15, -3, 13, 17, "goldball", 6), BAL(80, 2, 15, 19, "blueball", 8), BAL(70, -4, 12, 15, "tealball", -6), S(60, 84, 50, 30, "#ffffff", { rad: 999, op: 85 }), S(-12, 88, 40, 22, "#ffffff", { rad: 999, op: 90 }),
      P("C’est mon", 10, 22, 80, 7, 6, "#2a5fd6", { ff: "Pacifico" }), P("{S|ANNIVERSAIRE}", 6, 28, 88, 10, 10.5, "#e0457b", { ff: "Lobster", fx: "shadow" }),
      PHOTO(30, 40, 40, 32, { sp: "oval", bd: "#ffffff", bw: 7 }), P("5 ANS", 25, 73, 50, 9, 9, "#ff9a3c", { ff: "Anton", ls: 3 }),
      P("Samedi 14 décembre · 16h", 8, 83, 84, 5, 4.4, "#2a5fd6", { ff: "Poppins", fw: 700 }), P("Jeux · Gâteau · Surprises", 8, 89, 84, 5, 3.8, "#2a5fd6", { ff: "Poppins", fw: 400 })) },
    anniv_noir_or: { n: "Anniversaire noir & or", d: "Fond noir, or métallique et photo en arche.", k: "anniversaire noir or gold luxe vip fête adulte", cat: "Fêtes", bg: "#0b0b10", bg2: "#1d1608", a: 160, e: E(
      S(5, 3, 90, 94, "", { bd: GOLD, bw: 1.2 }), CONF([[12, 8, 20], [86, 10, -30], [8, 70, 40], [88, 66, 10], [78, 30, 50]]),
      CAP("VOUS ÊTES INVITÉ(E)", 20, 7, 60, 2.4, "#e9c46a", { ls: 6 }), P("JOYEUX", 10, 11, 80, 5, 4, "#ffffff", { ff: "Cinzel", ls: 14, fw: 400 }), P("ANNIVERSAIRE", 8, 15, 84, 8, 8, "#ffffff", { ff: "Cinzel", fx: "gold", fw: 700 }),
      PHOTO(31, 26, 38, 36, { sp: "arch", bd: "#e9c46a", bw: 2 }), SCR("{S|Fatou}", 10, 63, 80, 12, 14), P("40 ANS", 10, 75, 80, 5, 4.2, "#e9c46a", { ff: "Cinzel", ls: 10 }),
      HDIV(50, 81, 24), INFO3(86, [["DATE", "Samedi 14\ndécembre · 20h"], ["LIEU", "Salle Le Luxe\nAlmadies"], ["TENUE", "Chic\nnoir & or"]], "#f5e7c1", "gold")) },
    amour: { n: "Saint-Valentin", d: "Rouge profond, cœurs or rose et photo ovale.", k: "amour saint valentin couple romantique dîner cœur", cat: "Fêtes", bg: "#6a0c2a", bg2: "#c2204a", a: 170, e: E(
      S(62, -6, 52, 41, "#ff7fa5", { rad: 999, op: 30 }), S(-16, 64, 48, 38, "#ff7fa5", { rad: 999, op: 28 }), P("♥", 4, 4, 14, 8, 8, "#ffb3c8", { fx: "rosegold" }), P("♥", 84, 62, 14, 8, 8, "#ffb3c8", { fx: "rosegold" }),
      CAP("14 FÉVRIER", 20, 6, 60, 2.6, "#ffd9e4", { ls: 8 }), P("{S|Saint-Valentin}", 6, 10, 88, 13, 14, "#ffd9e4", { ff: "Great Vibes", fx: "rosegold", fw: 400 }),
      PHOTO(30, 25, 40, 32, { sp: "oval", bd: "#f0c4b2", bw: 4 }), P("DÎNER ROMANTIQUE", 8, 60, 84, 6, 6.4, "#ffffff", { ff: "Cormorant Garamond", fw: 700, ls: 5 }), HDIV(50, 68, 24, "rosegold"),
      P("Menu 2 personnes · Musique live", 10, 73, 80, 5, 3.6, "#ffd9e4", { ff: "Montserrat", fw: 400, ls: 1 }), P("Réservation : 77 123 45 67", 10, 80, 80, 5, 3.6, "#ffffff", { ff: "Montserrat", fw: 700, ls: 1 }), BTN("RÉSERVER", 32, 88, 36, "#f0c4b2", "#6a0c2a")) },
    fete_meres: { n: "Fête des mères", d: "Rose tendre, fleurs douces et portrait rond.", k: "fête des mères maman maternité floral rose", cat: "Fêtes", bg: "#ffe9f0", bg2: "#ffd0e0", a: 170, e: E(
      S(-14, -10, 50, 40, "#ffb6cf", { rad: 999, op: 60 }), S(70, 70, 52, 42, "#ffb6cf", { rad: 999, op: 55 }), S(80, 6, 14, 11, "#ffd23f", { rad: 999, op: 80 }), S(6, 80, 10, 8, "#ffffff", { rad: 999 }),
      CAP("LE 25 MAI", 20, 6, 60, 2.6, "#a3294f", { ls: 8 }), P("Bonne fête", 6, 10, 88, 10, 11, "#d6376b", { ff: "Pacifico" }), P("{S|Maman}", 6, 20, 88, 14, 16, "#a3294f", { ff: "Great Vibes", fw: 400 }),
      PHOTO(28, 36, 44, 35, { sp: "oval", bd: "#ffffff", bw: 7 }), P("🌸", 8, 55, 12, 8, 7, "#000000"), P("🌷", 80, 40, 12, 8, 7, "#000000"),
      P("Merci pour ton amour, ta force et ta tendresse.", 12, 75, 76, 8, 4, "#a3294f", { ff: "Cormorant Garamond", fw: 600, fi: 1 }), P("{n|NOM DE LA MARQUE}", 6, 92, 88, 3, 2.6, "#d6376b", { ff: "Montserrat", ls: 3 })) },
    fetes: { n: "Vœux de fin d’année", d: "Vert sapin, étoile or et message chaleureux.", k: "noël nouvel an vœux fêtes fin année bonne année", cat: "Fêtes", bg: "#0d3b2a", bg2: "#06180f", a: 180, e: E(
      S(38, 4, 24, 19, "#ffd23f", { sp: "star", gr: "gold", fx: "glow", fc: "#ffd23f" }), CONF([[8, 12, 20], [88, 16, -30], [10, 84, 40], [86, 82, 10], [20, 30, 50], [78, 36, 30]]),
      P("Joyeuses", 6, 26, 88, 8, 8, "#ffffff", { ff: "Cormorant Garamond", fw: 600, ls: 10 }), P("{S|Fêtes}", 6, 33, 88, 16, 22, "#e9c46a", { ff: "Great Vibes", fx: "gold", fw: 400 }),
      HDIV(50, 52, 28), P("Bonne et heureuse année 2027", 8, 59, 84, 7, 5.4, "#ffffff", { ff: "Cormorant Garamond", fw: 600, fi: 1 }),
      P("Toute l’équipe vous souhaite santé, joie et réussite.", 14, 70, 72, 9, 3.8, "#d9e8df", { ff: "Montserrat", fw: 400, lh: 1.5 }), P("{n|NOM DE LA MARQUE}", 6, 91, 88, 3, 2.6, "#e9c46a", { ff: "Montserrat", ls: 5 })) },
    /* ---------- Mariage & cérémonies ---------- */
    elegant: { n: "Mariage élégant", d: "Crème, double cadre doré et noms en script.", k: "mariage invitation élégant faire-part cérémonie or", cat: "Mariage", bg: "#fbf6ee", bg2: "#f3e9d8", a: 180, e: E(
      S(5, 3.5, 90, 93, "", { bd: GOLD, bw: 1.5 }), S(7, 5, 86, 90, "", { bd: GOLD, bw: 0.8 }), S(46, 3, 8, 6.4, "#fbf6ee", { sp: "diamond", bd: GOLD, bw: 1 }),
      CAP("NOUS NOUS MARIONS", 12, 12, 76, 2.8, "#6b5a3c", { ls: 8 }), SCR("{S|Aïda}", 10, 17, 80, 14, 17), P("&", 44, 31, 12, 6, 6, GOLD, { ff: "Cormorant Garamond", fw: 400, fi: 1 }), SCR("Ousmane", 10, 36, 80, 14, 17),
      HDIV(50, 53, 30), CAP("SAMEDI", 20, 60, 60, 2.6, "#6b5a3c", { ls: 8 }), P("14 · 03 · 2027", 10, 64, 80, 7, 8, "#3a2f1d", { ff: "Cormorant Garamond", fw: 700, ls: 4 }), CAP("16 H 00", 20, 71.5, 60, 2.6, "#6b5a3c", { ls: 8 }),
      P("Salle des fêtes · Almadies, Dakar", 10, 78, 80, 5, 3.8, "#3a2f1d", { ff: "Cormorant Garamond", fw: 600, fi: 1 }), HDIV(50, 85, 14), CAP("RSVP  ·  77 123 45 67", 15, 90, 70, 2.5, "#6b5a3c", { ls: 5 })) },
    mariage_photo: { n: "Mariage avec photo", d: "Grande arche photo, or et typographie raffinée.", k: "mariage photo couple arche invitation save the date", cat: "Mariage", bg: "#ffffff", bg2: "#f8efe2", a: 180, e: E(
      S(24, 3, 52, 49, "", { sp: "arch", bd: GOLD, bw: 1 }), PHOTO(26.5, 4.8, 47, 46, { sp: "arch", bd: GOLD, bw: 2 }),
      CAP("NOUS NOUS MARIONS", 15, 54.5, 70, 2.6, "#6b5a3c", { ls: 8 }), SCR("{S|Aïda & Ousmane}", 6, 59.5, 88, 11, 13), HDIV(50, 71.5, 28),
      CAP("SAMEDI 14 MARS 2027", 10, 77, 80, 3, "#3a2f1d", { ls: 6, fw: 700 }), P("Cérémonie à 16h · Réception à 19h", 10, 82, 80, 5, 3.6, "#6b5a3c", { ff: "Cormorant Garamond", fw: 600, fi: 1 }), P("Salle des fêtes · Almadies, Dakar", 10, 87, 80, 5, 3.6, "#6b5a3c", { ff: "Cormorant Garamond", fw: 600, fi: 1 }), CAP("RSVP  ·  77 123 45 67", 15, 94, 70, 2.3, GOLD, { ls: 5, fw: 700 })) },
    savedate: { n: "Save the date", d: "Bleu nuit, cadre or et photo ovale.", k: "save the date mariage fiançailles invitation cérémonie bleu or", cat: "Mariage", bg: "#0f1b3d", bg2: "#070d22", a: 170, e: E(
      S(5, 3, 90, 94, "", { bd: "#d8b46a", bw: 1.2 }), S(7, 5, 86, 90, "", { bd: "#d8b46a", bw: 0.6 }), CAP("SAVE THE DATE", 10, 8, 80, 3, "#e9c46a", { ls: 10, fw: 700 }),
      PHOTO(34, 14, 32, 25.6, { sp: "oval", bd: "#e9c46a", bw: 2 }), P("{S|Aïda & Ousmane}", 8, 42, 84, 9, 8, "#ffffff", { ff: "Bodoni Moda", fw: 400 }), HDIV(50, 53, 26),
      P("14 · 03 · 2027", 10, 59, 80, 8, 9, "#e9c46a", { ff: "Cormorant Garamond", fw: 700, ls: 6, fx: "gold" }), P("Dakar · Cérémonie à 16h", 10, 69, 80, 5, 3.8, "#cfd5ea", { ff: "Montserrat", fw: 400, ls: 3 }),
      P("Invitation formelle à suivre", 10, 79, 80, 5, 3.8, "#cfd5ea", { ff: "Cormorant Garamond", fw: 600, fi: 1 }), CAP("RSVP  ·  77 123 45 67", 15, 88, 70, 2.4, "#e9c46a", { ls: 5 })) },
    fiancailles: { n: "Fiançailles", d: "Rose poudré, alliances or rose et photo ronde.", k: "fiançailles engagement alliances rose couple", cat: "Mariage", bg: "#fbe5e0", bg2: "#f6cfc6", a: 170, e: E(
      S(-14, -8, 50, 40, "#ffffff", { rad: 999, op: 40 }), S(66, 72, 56, 45, "#ffffff", { rad: 999, op: 35 }),
      S(40, 5, 12, 9.6, "", { rad: 999, bd: "#c98a78", bw: 3 }), S(48, 5, 12, 9.6, "", { rad: 999, bd: "#c98a78", bw: 3 }),
      CAP("FIANÇAILLES", 15, 17, 70, 3, "#8a5648", { ls: 12, fw: 700 }), P("{S|Aïda & Ousmane}", 6, 21, 88, 11, 12, "#8a5648", { ff: "Great Vibes", fx: "rosegold", fw: 400 }),
      PHOTO(32, 35, 36, 28.8, { sp: "oval", bd: "#c98a78", bw: 3 }), HDIV(50, 67, 26, "rosegold"), CAP("SAMEDI 22 NOVEMBRE · 17H", 10, 73, 80, 2.8, "#8a5648", { ls: 5, fw: 700 }),
      P("Chez la famille Diop · Médina, Dakar", 10, 79, 80, 5, 3.8, "#8a5648", { ff: "Cormorant Garamond", fw: 600, fi: 1 }), CAP("RSVP  ·  77 123 45 67", 15, 90, 70, 2.4, "#c98a78", { ls: 5, fw: 700 })) },
    bapteme: { n: "Baptême / Naissance", d: "Pastel ciel, étoiles et portrait de bébé.", k: "baptême naissance bébé baby shower enfant pastel", cat: "Mariage", bg: "#dff0ff", bg2: "#fff7e6", a: 180, e: E(
      S(-12, 80, 50, 30, "#ffffff", { rad: 999, op: 90 }), S(62, 84, 50, 30, "#ffffff", { rad: 999, op: 90 }), S(10, 10, 5, 4, "#ffd23f", { sp: "star" }), S(86, 18, 4, 3.2, "#ffd23f", { sp: "star" }), S(80, 44, 3, 2.4, "#ffd23f", { sp: "star" }), S(8, 46, 3, 2.4, "#ffd23f", { sp: "star" }),
      CAP("VOUS ÊTES INVITÉS AU", 15, 7, 70, 2.5, "#4a6fa5", { ls: 6 }), SCR("Baptême", 10, 11, 80, 12, 15, { fx: "gold" }), PHOTO(31, 27, 38, 30.4, { sp: "oval", bd: "#ffffff", bw: 6 }),
      P("{S|Mamadou}", 6, 59, 88, 9, 10, "#4a6fa5", { ff: "Great Vibes", fw: 400 }), P("Dimanche 12 octobre · 11h", 8, 70, 84, 5, 4.2, "#4a6fa5", { ff: "Montserrat", fw: 700 }), P("Église Saint-Joseph · puis déjeuner en famille", 8, 76, 84, 5, 3.6, "#4a6fa5", { ff: "Montserrat", fw: 400 }), CAP("RSVP  ·  77 123 45 67", 15, 90, 70, 2.4, "#4a6fa5", { ls: 5, fw: 700 })) },
    remise: { n: "Sortie de promotion", d: "Bleu marine, or et portrait du diplômé.", k: "remise diplôme sortie promotion graduation cérémonie université", cat: "Mariage", bg: "#0e2150", bg2: "#06102c", a: 170, e: E(
      S(-10, -8, 46, 37, "#e9c46a", { rad: 999, op: 15 }), S(70, 70, 52, 42, "#e9c46a", { rad: 999, op: 12 }), P("🎓", 40, 3, 20, 8, 7, "#ffffff"),
      CAP("CÉRÉMONIE DE", 20, 13, 60, 2.8, "#e9c46a", { ls: 8, fw: 700 }), P("REMISE DES DIPLÔMES", 6, 17, 88, 7, 6.2, "#ffffff", { ff: "Cinzel", fw: 700 }), SCR("Promotion 2026", 10, 25, 80, 9, 10),
      PHOTO(32, 38, 36, 28.8, { sp: "oval", bd: "#e9c46a", bw: 3 }), P("{S|Awa Diop}", 6, 69, 88, 7, 7, "#ffffff", { ff: "Cormorant Garamond", fw: 700 }), HDIV(50, 78, 24),
      P("Samedi 6 décembre · 10h · Grand Théâtre", 6, 84, 88, 5, 3.8, "#cfd5ea", { ff: "Montserrat", fw: 400, ls: 1 }), P("{n|NOM DE L’ÉCOLE}", 6, 92, 88, 3, 2.6, "#e9c46a", { ff: "Montserrat", ls: 5 })) },
    /* ---------- Soirées & concerts ---------- */
    evenement: { n: "Soirée festive", d: "Dégradé violet-rose, cercles et photo du DJ.", k: "fête soirée dj club party boîte de nuit", cat: "Soirée", bg: "#2a0a5e", bg2: "#d6249f", a: 150, e: E(
      S(-14, -8, 48, 38, "#ffd23f", { rad: 999, op: 90 }), S(66, 56, 56, 45, "#29d3c8", { rad: 999, op: 80 }), S(70, 4, 24, 19, "#ffffff", { rad: 999, op: 15 }),
      PHOTO(54, 6, 38, 30.4, { sp: "oval", bd: "#ffffff", bw: 5 }), P("{S|SOIRÉE}", 5, 18, 52, 14, 14, "#ffffff", { ff: "Bebas Neue", fx: "shadow", al: "left" }), P("ÉLECTRO", 5, 31, 60, 14, 14, "#ffd23f", { ff: "Anton", fx: "shadow", al: "left" }),
      P("Samedi 14 décembre · 21h", 5, 52, 88, 6, 4.8, "#ffffff", { fw: 700, ff: "Poppins", al: "left" }), P("DJ Sam · DJ Kira · Live percussions", 5, 59, 88, 5, 3.8, "#ffffff", { fw: 400, ff: "Poppins", al: "left" }),
      BTN("ENTRÉE LIBRE", 5, 70, 40, "#ffffff", "#2a0a5e"), P("{n|NOM DE LA MARQUE}", 5, 90, 88, 4, 2.8, "#ffffff", { ff: "Montserrat", ls: 4, al: "left" })) },
    concert: { n: "Concert néon", d: "Fond sombre, lueur néon et portrait de l’artiste.", k: "concert live musique rap artiste scène néon", cat: "Soirée", bg: "#07070f", bg2: "#2a0a52", a: 180, e: E(
      S(60, 4, 36, 28, "#ff2bd6", { sp: "star", rot: 12, fx: "glow", fc: "#ff2bd6" }), PHOTO(20, 8, 60, 48, { sp: "arch", bd: "#00e5ff", bw: 3, fx: "glow", fc: "#00e5ff" }),
      P("LIVE", 6, 56, 88, 17, 20, "#ffffff", { ff: "Anton", fx: "glow", fc: "#00e5ff" }), P("{s|CONCERT}", 6, 72, 88, 9, 8, "#ff2bd6", { ff: "Oswald", fx: "glow", fc: "#ff2bd6", ls: 6 }),
      P("Vendredi 20h · Grand Théâtre · Dakar", 8, 83, 84, 5, 4, "#ffffff", { fw: 400, ff: "Poppins" }), BTN("RÉSERVE TA PLACE", 27, 90, 46, "#ff2bd6", "#ffffff", { fx: "glow", fc: "#ff2bd6" })) },
    afro: { n: "Afro night", d: "Soleil orange, portrait central et typo énergique.", k: "afro night soirée musique dj dance afrobeat", cat: "Soirée", bg: "#120a06", bg2: "#4a1604", a: 180, e: E(
      S(14, 3, 72, 57.6, "#ff7a1a", { rad: 999, fx: "glow", fc: "#ff7a1a" }), S(20, 7, 60, 48, "#ffd23f", { rad: 999 }), PHOTO(26, 10, 48, 38.4, { sp: "oval", bd: "#120a06", bw: 4 }),
      P("AFRO", 6, 59, 88, 17, 19, "#ffffff", { ff: "Anton", fx: "outline", fc: "#ff7a1a" }), P("{s|NIGHT}", 6, 73, 88, 12, 13, "#ffd23f", { ff: "Bebas Neue", ls: 10 }),
      P("Samedi 22h · DJ Sam · Dakar", 8, 86, 84, 5, 4.4, "#ffffff", { fw: 400, ff: "Poppins" }), P("{n|NOM DE LA MARQUE}", 6, 94, 88, 3, 2.4, "#ff7a1a", { ff: "Montserrat", ls: 5 })) },
    soiree_vip: { n: "Soirée VIP", d: "Noir et or métallique, grand VIP et portrait.", k: "soirée vip luxe club bouteille exclusive or noir", cat: "Soirée", bg: "#070709", bg2: "#1a1306", a: 160, e: E(
      S(4, 3, 92, 94, "", { bd: GOLD, bw: 1 }), CAP("SOIRÉE EXCLUSIVE", 15, 6, 70, 2.8, "#e9c46a", { ls: 10, fw: 700 }), P("V.I.P", 6, 10, 88, 22, 28, "#e9c46a", { ff: "Cinzel", fx: "gold", fw: 700, ls: 6 }),
      PHOTO(30, 33, 40, 28, { sp: "arch", bd: "#e9c46a", bw: 2 }), HDIV(50, 64, 26), P("SAMEDI 20 DÉCEMBRE", 8, 70, 84, 5, 4.4, "#ffffff", { ff: "Cinzel", fw: 700, ls: 6 }), P("DÈS 23H · ACCÈS SUR LISTE", 8, 76, 84, 4, 3, "#e9c46a", { ff: "Montserrat", fw: 400, ls: 5 }),
      P("Tenue chic exigée · Places limitées", 8, 83, 84, 4, 3.2, "#cfcfcf", { ff: "Cormorant Garamond", fw: 600, fi: 1 }), P("{n|NOM DU CLUB}", 6, 91, 88, 3, 2.8, "#e9c46a", { ff: "Montserrat", ls: 8 })) },
    gala: { n: "Soirée de gala", d: "Ivoire, cadre or et titre en capitales Cinzel.", k: "gala dîner de gala cérémonie remise prix trophées", cat: "Soirée", bg: "#fbf8f1", bg2: "#efe6d2", a: 180, e: E(
      S(4, 2.5, 92, 95, "", { bd: GOLD, bw: 1.5 }), S(6, 4, 88, 92, "", { bd: GOLD, bw: 0.6 }), CAP("SOIRÉE DE", 25, 10, 50, 3, GOLD, { ls: 10, fw: 700 }), P("{S|GALA}", 6, 14, 88, 15, 20, "#1a1a1a", { ff: "Cinzel", fw: 700, ls: 14 }), SCR("annuel 2026", 15, 30, 70, 9, 10),
      PHOTO(32, 43, 36, 28.8, { sp: "oval", bd: GOLD, bw: 2 }), HDIV(50, 74, 26), P("SAMEDI 13 DÉCEMBRE · 20H", 8, 80, 84, 4, 3.8, "#3a2f1d", { ff: "Montserrat", fw: 700, ls: 4 }), P("Hôtel Terrou-Bi · Dakar", 8, 85, 84, 5, 3.8, "#6b5a3c", { ff: "Cormorant Garamond", fw: 600, fi: 1 }), CAP("DRESS CODE : TENUE DE SOIRÉE", 10, 92, 80, 2.3, GOLD, { ls: 4, fw: 700 })) },
    festival: { n: "Festival de musique", d: "Dégradé coucher de soleil, soleil et gros titre.", k: "festival musique open air plage été concert", cat: "Soirée", bg: "#ff9a3c", bg2: "#6a1fb0", a: 175, e: E(
      S(22, 8, 56, 45, "#ffd23f", { rad: 999, op: 95 }), S(26, 12, 48, 38.4, "", { rad: 999, bd: "#ffffff", bw: 2, op: 70 }), S(-5, 50, 110, 4, "#2a0a5e", { op: 50 }), S(-5, 56, 110, 3, "#2a0a5e", { op: 40 }),
      P("FESTI", 4, 33, 92, 17, 24, "#ffffff", { ff: "Anton", fx: "shadow", ls: 2 }), P("{S|VAL}", 4, 53, 92, 17, 24, "#ffffff", { ff: "Anton", fx: "outline", fc: "#ffffff", ls: 2 }),
      P("3 JOURS DE MUSIQUE · 12–14 DÉC", 6, 74, 88, 5, 4, "#ffffff", { ff: "Oswald", ls: 4 }), P("Plage de Ngor · Dakar", 6, 80, 88, 5, 4, "#ffffff", { ff: "Montserrat", fw: 400, ls: 2 }), BTN("BILLETS DISPONIBLES", 24, 88, 52, "#ffffff", "#6a1fb0")) },
    dj: { n: "DJ night", d: "Noir, cercle néon bleu-rose et portrait du DJ.", k: "dj night club électro house set platines", cat: "Soirée", bg: "#050510", bg2: "#1a0a3a", a: 170, e: E(
      S(16, 6, 68, 54.4, "", { rad: 999, bd: "#00e5ff", bw: 3, fx: "glow", fc: "#00e5ff" }), S(20, 9, 60, 48, "", { rad: 999, bd: "#ff2bd6", bw: 3, fx: "glow", fc: "#ff2bd6" }), PHOTO(24, 12, 52, 41.6, { sp: "oval" }),
      P("DJ", 6, 59, 88, 8, 8, "#00e5ff", { ff: "Bebas Neue", fx: "glow", fc: "#00e5ff", ls: 20 }), P("{S|KIRA}", 6, 66, 88, 14, 17, "#ffffff", { ff: "Anton", fx: "glow", fc: "#ff2bd6" }),
      P("OPEN DECKS · VENDREDI 23H", 6, 83, 88, 4, 3.6, "#ffffff", { ff: "Oswald", ls: 5 }), P("{n|NOM DU CLUB}", 6, 92, 88, 3, 2.6, "#ff2bd6", { ff: "Montserrat", ls: 6 })) },
    sport: { n: "Match / Tournoi", d: "Bandes diagonales, ballon et énergie sportive.", k: "sport match football tournoi finale basket navétane", cat: "Soirée", bg: "#0e6b3a", bg2: "#08331d", a: 175, e: E(
      S(-30, 52, 160, 12, "#ffd23f", { rot: -6 }), S(-30, 59, 160, 3.4, "#ffffff", { rot: -6, op: 85 }), P("⚽", 36, 4, 28, 14, 12, "#ffffff"),
      P("{S|FINALE}", 4, 19, 92, 18, 19, "#ffffff", { ff: "Anton", fx: "shadow", ls: 2 }), P("DU TOURNOI", 6, 35, 88, 8, 6.4, "#ffd23f", { ff: "Oswald", ls: 12 }), P("ÉQUIPE A  VS  ÉQUIPE B", 4, 68, 92, 7, 5.4, "#ffffff", { ff: "Bebas Neue", ls: 4 }),
      P("Dimanche 16h · Stade municipal", 6, 77, 88, 5, 4, "#ffffff", { fw: 400, ff: "Poppins" }), P("Entrée : 1 000 F", 6, 83, 88, 5, 4, "#ffd23f", { fw: 700, ff: "Poppins" }), BTN("VIENS SUPPORTER", 28, 90, 44, "#ffd23f", "#08331d")) },
    /* ---------- Commerce ---------- */
    promotion: { n: "Promotion", d: "Fond jaune vif, pastille de réduction et photo produit.", k: "promo promotion réduction soldes prix offre produit", cat: "Commerce", bg: "#ffd23f", bg2: "#ffb800", a: 160, e: E(
      S(-8, 44, 116, 60, "#14161f", { rot: -6 }), S(56, 3, 40, 32, "#d62839", { rad: 999 }), P("-50%", 56, 10, 40, 14, 11, "#ffffff", { ff: "Anton", rot: -8, fx: "shadow" }), P("{s|GRANDE PROMO}", 5, 7, 52, 28, 12, "#14161f", { ff: "Anton", al: "left", lh: 1 }),
      PHOTO(10, 33, 36, 28.8, { rad: 20, bd: "#ffffff", bw: 4, rot: -6 }), P("Toute la collection\njusqu’au 30 nov.", 50, 43, 46, 10, 3.6, "#ffffff", { ff: "Poppins", fw: 400, al: "left", lh: 1.4 }),
      P("À PARTIR DE", 50, 57, 46, 4, 3, "#ffd23f", { ff: "Montserrat", fw: 700, ls: 3, al: "left" }), P("5 000 F", 50, 61, 46, 10, 9, "#ffffff", { ff: "Anton", al: "left" }), BTN("J’EN PROFITE", 8, 82, 44, "#ffd23f", "#14161f"), P("{n|NOM DE LA MARQUE}", 8, 92, 84, 3, 2.6, "#ffffff", { ff: "Montserrat", ls: 4, al: "left" })) },
    sale: { n: "Vente flash", d: "Rouge intense, bande jaune et prix en grand.", k: "vente flash soldes black friday prix choc 24h", cat: "Commerce", bg: "#d62839", bg2: "#6e0b16", a: 165, e: E(
      S(-10, 20, 120, 14, "#ffd23f", { rot: -7 }), S(-10, 62, 120, 2, "#ffd23f", { rot: -7, op: 70 }), P("⚡", 38, 3, 24, 12, 10, "#ffd23f"), P("VENTE FLASH", 4, 22, 92, 11, 8.6, "#14161f", { ff: "Anton", rot: -7, ls: 2 }),
      P("-70%", 4, 38, 92, 24, 33, "#ffffff", { ff: "Anton", fx: "relief", fc: "#14161f" }), P("24H SEULEMENT", 6, 66, 88, 7, 6.4, "#ffd23f", { ff: "Oswald", ls: 8 }), PHOTO(60, 78, 34, 17, { rad: 12, bd: "#ffffff", bw: 3 }), P("Jusqu’à\nminuit ce soir", 6, 79, 52, 10, 4.2, "#ffffff", { ff: "Poppins", fw: 400, al: "left", lh: 1.4 }), P("{n|NOM DE LA MARQUE}", 6, 94, 88, 3, 2.6, "#ffffff", { ff: "Montserrat", ls: 4, al: "left" })) },
    blackf: { n: "Black Friday", d: "Noir profond, vert néon et pourcentage géant.", k: "black friday soldes promo réduction vendredi noir", cat: "Commerce", bg: "#000000", bg2: "#10140a", a: 170, e: E(
      S(-10, 6, 120, 13, "#d6ff00", { rot: -6 }), P("BLACK FRIDAY", 4, 7.5, 92, 10, 9.4, "#000000", { ff: "Anton", rot: -6, ls: 3 }), P("JUSQU’À", 6, 30, 88, 5, 4.8, "#ffffff", { ff: "Oswald", ls: 10 }),
      P("-70%", 6, 35, 88, 27, 34, "#d6ff00", { ff: "Anton", fx: "glow", fc: "#d6ff00" }), PHOTO(28, 63, 44, 17.6, { rad: 14, bd: "#d6ff00", bw: 2 }), P("{S|SUR TOUT LE SITE}", 6, 82, 88, 6, 5.6, "#ffffff", { ff: "Oswald", ls: 6 }), BTN("EN PROFITER", 30, 90, 40, "#d6ff00", "#000000")) },
    ouverture: { n: "Grande ouverture", d: "Orange chaleureux, ruban doré et grand titre.", k: "ouverture inauguration lancement boutique nouveau magasin", cat: "Commerce", bg: "#fff4e0", bg2: "#ffe0b2", a: 170, e: E(
      S(-10, -6, 62, 32, "#f26b1d", { rad: 999 }), S(68, 68, 46, 33, "#ffd23f", { sp: "star", rot: 14, gr: "gold" }), CONF([[70, 8, 30], [90, 20, -20], [8, 60, 40]]),
      P("🎉", 4, 2, 22, 12, 9, "#000000"), P("GRANDE", 6, 25, 88, 10, 8, "#14161f", { ff: "Oswald", ls: 14, al: "left" }), P("{s|OUVERTURE}", 6, 33, 88, 15, 13.5, "#f26b1d", { ff: "Anton", fx: "shadow", al: "left" }),
      PHOTO(6, 51, 42, 24, { rad: 18, bd: "#14161f", bw: 3 }), P("Samedi 6 décembre\ndès 10h", 52, 52, 44, 11, 4.8, "#14161f", { ff: "Poppins", fw: 700, al: "left", lh: 1.35 }), P("Cadeaux et réductions\ntoute la journée", 52, 65, 44, 10, 3.8, "#505a6e", { ff: "Poppins", fw: 400, al: "left", lh: 1.4 }),
      BTN("VENEZ DÉCOUVRIR", 6, 84, 44, "#14161f", "#ffffff"), P("{n|NOM DE LA MARQUE}", 6, 93, 88, 3, 2.8, "#14161f", { ff: "Montserrat", ls: 4, al: "left" })) },
    livraison: { n: "Livraison à domicile", d: "Vert frais, scooter et appel à commander.", k: "livraison domicile commande rapide scooter courses", cat: "Commerce", bg: "#ffffff", e: E(
      S(0, 0, 100, 50, "#0aa66d"), S(58, 30, 54, 42, "#ffd23f", { rad: 999, op: 95 }), P("🛵", 6, 5, 88, 28, 26, "#ffffff"), P("{S|LIVRAISON}", 6, 32, 88, 12, 12, "#ffffff", { ff: "Anton", ls: 4 }),
      P("RAPIDE · 30 MIN", 6, 54, 88, 7, 6.4, "#0aa66d", { ff: "Oswald", ls: 6 }), P("Commandez par message ou par téléphone.", 8, 64, 84, 6, 4, "#505a6e", { fw: 400, ff: "Poppins" }), PHOTO(30, 72, 40, 12, { rad: 14 }), BTN("📞 77 000 00 00", 24, 87, 52, "#0aa66d", "#ffffff"), P("{n|NOM DE LA MARQUE}", 6, 95, 88, 3, 2.6, "#0aa66d", { ff: "Montserrat", ls: 4 })) },
    tech: { n: "Promo high-tech", d: "Nuit violette, halo lumineux et prix néon.", k: "smartphone téléphone tech promo boutique informatique ordinateur", cat: "Commerce", bg: "#0a0a23", bg2: "#3b1a8a", a: 160, e: E(
      S(14, 3, 72, 57.6, "#7a3cff", { rad: 999, op: 45, fx: "glow", fc: "#7a3cff" }), PHOTO(26, 8, 48, 38, { rad: 24, bd: "#00e5ff", bw: 2, fx: "glow", fc: "#00e5ff" }), P("{s|NOUVEAUTÉ}", 6, 52, 88, 6, 5.4, "#00e5ff", { ff: "Montserrat", ls: 8, fw: 700 }),
      P("-30%", 6, 58, 88, 22, 24, "#ffffff", { ff: "Anton", fx: "glow", fc: "#00e5ff" }), P("sur tous les smartphones", 8, 82, 84, 6, 4.5, "#cfd0ff", { fw: 400, ff: "Poppins" }), BTN("VOIR LES OFFRES", 28, 89, 44, "#00e5ff", "#0a0a23"), P("{n|NOM DE LA MARQUE}", 6, 96, 88, 3, 2.4, "#00e5ff", { ff: "Montserrat", ls: 6 })) },
    immo: { n: "Immobilier / À louer", d: "Bleu marine, bandeau orange et grande photo du bien.", k: "immobilier location villa appartement terrain maison vente à louer", cat: "Commerce", bg: "#0f2a4a", bg2: "#081a30", a: 170, e: E(
      S(0, 0, 100, 3.5, "#ff7a1a"), PHOTO(0, 3.5, 100, 36, {}), S(0, 30, 100, 9, "#0f2a4a", { op: 85 }), P("À LOUER", 6, 30.5, 88, 8, 8, "#ff7a1a", { ff: "Anton", al: "left", ls: 3 }), P("{S|Villa 4 chambres}", 6, 42, 88, 9, 7.4, "#ffffff", { ff: "Montserrat", fw: 700, al: "left" }), P("Almadies · Dakar", 6, 51, 88, 4, 3.6, "#9fb3d1", { ff: "Montserrat", fw: 400, ls: 3, al: "left" }),
      S(6, 58, 88, 17, "#ffffff", { rad: 16, op: 10 }), P("🛏 4 chambres    🚿 3 salles de bain    🚗 Garage", 8, 60, 84, 6, 3.3, "#ffffff", { ff: "Poppins", fw: 400 }), P("450 000 F / mois", 8, 67, 84, 7, 6, "#ffd23f", { ff: "Montserrat", fw: 700 }), BTN("📞 77 123 45 67", 24, 82, 52, "#ff7a1a", "#ffffff"), P("{n|NOM DE L’AGENCE}", 6, 94, 88, 3, 2.6, "#9fb3d1", { ff: "Montserrat", ls: 5 })) },
    solde_chic: { n: "Soldes chics", d: "Beige, noir et or : promotions élégantes.", k: "soldes élégants mode boutique luxe promotion chic", cat: "Commerce", bg: "#f4ede2", bg2: "#e9dcc6", a: 170, e: E(
      S(6, 4, 88, 92, "", { bd: "#14161f", bw: 1.2 }), CAP("SOLDES D’HIVER", 15, 9, 70, 2.8, "#14161f", { ls: 10, fw: 700 }), P("JUSQU’À", 10, 15, 80, 4, 3.6, GOLD, { ff: "Montserrat", ls: 8, fw: 700 }), P("-60%", 8, 20, 84, 20, 25, "#14161f", { ff: "Bodoni Moda", fw: 700 }),
      PHOTO(26, 43, 48, 28, { sp: "arch", bd: "#14161f", bw: 1.5 }), HDIV(50, 74, 24), P("Du 1er au 31 janvier", 10, 79, 80, 5, 4.4, "#14161f", { ff: "Cormorant Garamond", fw: 700, fi: 1 }), BTN("DÉCOUVRIR", 32, 86, 36, "#14161f", "#f4ede2"), P("{n|NOM DE LA MARQUE}", 10, 93, 80, 3, 2.4, GOLD, { ff: "Montserrat", ls: 8 })) },
    /* ---------- Beauté & mode ---------- */
    beaute: { n: "Salon de beauté", d: "Rose poudré, arche photo et or doux.", k: "beauté salon coiffure maquillage ongles esthétique femme", cat: "Beauté", bg: "#f9e3de", bg2: "#f3cfc6", a: 170, e: E(
      S(24, 3, 52, 48, "", { sp: "arch", bd: "#b08a57", bw: 1 }), PHOTO(26, 4.5, 48, 45, { sp: "arch" }), SCR("{S|Beauty}", 8, 53, 84, 11, 12), P("SALON DE BEAUTÉ", 8, 64, 84, 5, 4.6, "#6b3f35", { ff: "Cormorant Garamond", fw: 700, ls: 6 }), HDIV(50, 71, 22),
      P("Coiffure · Soins · Maquillage · Ongles", 8, 76, 84, 5, 3.4, "#6b3f35", { fw: 400, ff: "Montserrat", ls: 1 }), BTN("PRENDRE RENDEZ-VOUS", 22, 85, 56, "#6b3f35", "#ffffff"), CAP("77 123 45 67 · MÉDINA, DAKAR", 10, 94, 80, 2.4, "#6b3f35", { ls: 3, fw: 700 })) },
    mode: { n: "Nouvelle collection", d: "Beige chic, grand portrait et titre éditorial.", k: "mode collection vêtements boutique fashion style couture", cat: "Beauté", bg: "#efe6d8", bg2: "#e3d5bd", a: 170, e: E(
      PHOTO(8, 6, 46, 62, { bd: "#14161f", bw: 2 }), S(50, 18, 42, 50, "#14161f"), P("NEW", 52, 22, 38, 12, 11, "#efe6d8", { ff: "Bodoni Moda", fw: 400, ls: 4 }), P("COLLECTION", 52, 33, 38, 6, 4.2, GOLD, { ff: "Montserrat", ls: 5, fw: 700, fx: "gold" }), P("2026", 52, 42, 38, 14, 12, "#efe6d8", { ff: "Bodoni Moda", fw: 700 }),
      P("Prêt-à-porter · Tenues sur mesure", 8, 75, 84, 5, 4.2, "#14161f", { fw: 400, al: "left", ff: "Cormorant Garamond" }), P("{N|Ma Boutique}", 8, 82, 84, 7, 6, "#14161f", { ff: "Bodoni Moda", al: "left", fw: 400 }), L(8, 91, 84, "ink"), CAP("77 123 45 67 · DAKAR", 8, 93, 84, 2.4, "#14161f", { ls: 4, al: "left" })) },
    bienetre: { n: "Bien-être / Spa", d: "Vert sauge, cercles doux et portrait apaisant.", k: "spa yoga bien-être massage détente santé coaching", cat: "Beauté", bg: "#dfe8d8", bg2: "#c9d9c0", a: 170, e: E(
      S(-10, -4, 60, 48, "#b6c9a8", { rad: 999, op: 80 }), S(54, 54, 56, 45, "#cfdcc3", { rad: 999 }), PHOTO(30, 8, 40, 32, { sp: "oval", bd: "#ffffff", bw: 5 }), P("🌿", 8, 46, 14, 8, 7, "#4a6a3c"),
      P("{S|Bien-être}", 6, 44, 88, 12, 12, "#2f4a25", { ff: "Playfair Display", al: "center" }), CAP("MASSAGE · YOGA · RELAXATION", 10, 58, 80, 2.8, "#4a6a3c", { ls: 5, fw: 700 }), HDIV(50, 65, 20), P("Offre découverte : -20% sur la 1re séance", 10, 71, 80, 6, 3.8, "#4a6a3c", { ff: "Cormorant Garamond", fw: 600, fi: 1 }), BTN("RÉSERVER UNE SÉANCE", 22, 81, 56, "#2f4a25", "#ffffff"), P("{n|NOM DE LA MARQUE}", 6, 93, 88, 3, 2.6, "#4a6a3c", { ff: "Montserrat", ls: 5 })) },
    barbier: { n: "Barbershop", d: "Noir, or et portrait : coupes et barbe.", k: "barbier barbershop coiffure homme coupe barbe", cat: "Beauté", bg: "#0d0d10", bg2: "#1d1710", a: 170, e: E(
      S(5, 3, 90, 94, "", { bd: GOLD, bw: 1.2 }), S(8, 6, 84, 88, "", { bd: GOLD, bw: 0.5 }), CAP("ÉTABLI EN 2018", 20, 8, 60, 2.6, "#e9c46a", { ls: 8 }), P("BARBER", 8, 12, 84, 13, 12, "#ffffff", { ff: "Bebas Neue", ls: 14 }), P("SHOP", 8, 22.5, 84, 13, 13, "#e9c46a", { ff: "Anton", fx: "gold", ls: 10 }),
      PHOTO(28, 38, 44, 30, { sp: "oval", bd: "#e9c46a", bw: 3 }), P("COUPE · BARBE · SOINS", 8, 72, 84, 5, 4.4, "#ffffff", { ff: "Oswald", ls: 6 }), HDIV(50, 79, 22), P("Lun–Sam · 9h–20h · Sans rendez-vous", 8, 84, 84, 5, 3.4, "#cfcfcf", { ff: "Montserrat", fw: 400, ls: 1 }), P("77 123 45 67 · Plateau", 8, 89, 84, 5, 3.6, "#e9c46a", { ff: "Montserrat", fw: 700, ls: 2 })) },
    coiffure: { n: "Coiffure & tresses", d: "Violet profond, or rose et portrait ovale.", k: "coiffure tresses tissage perruque afro salon natte", cat: "Beauté", bg: "#3a0f4a", bg2: "#8a2a74", a: 160, e: E(
      S(-12, -6, 46, 37, "#f0c4b2", { rad: 999, op: 20 }), S(70, 66, 52, 42, "#f0c4b2", { rad: 999, op: 18 }), PHOTO(24, 7, 52, 41.6, { sp: "oval", bd: "#f0c4b2", bw: 3 }), P("{S|Tresses}", 6, 50, 88, 12, 13, "#ffe3d6", { ff: "Great Vibes", fx: "rosegold", fw: 400 }),
      CAP("COIFFURE AFRO · TISSAGE · NATTES", 8, 62, 84, 2.8, "#ffe3d6", { ls: 4, fw: 700 }), HDIV(50, 68, 22, "rosegold"), P("À PARTIR DE 8 000 F", 8, 74, 84, 6, 6, "#ffffff", { ff: "Oswald", ls: 4 }), BTN("PRENDRE RENDEZ-VOUS", 22, 84, 56, "#f0c4b2", "#3a0f4a"), P("77 123 45 67 · Dakar", 8, 94, 84, 3, 2.8, "#ffe3d6", { ff: "Montserrat", ls: 4 })) },
    /* ---------- Restauration ---------- */
    restaurant: { n: "Menu restaurant", d: "Vert profond, cadre doré et plats du jour.", k: "restaurant menu plat cuisine repas carte", cat: "Restauration", bg: "#14301f", bg2: "#0a1c12", a: 170, e: E(
      S(5, 3, 90, 94, "", { bd: "#e8c872", bw: 1.4 }), S(7, 5, 86, 90, "", { bd: "#e8c872", bw: 0.6 }), CAP("{N|CHEZ NOUS}", 10, 9, 80, 2.8, "#e8c872", { ls: 8, fw: 700 }), P("Menu du jour", 8, 14, 84, 11, 11, "#ffffff", { ff: "Great Vibes", fx: "gold", fw: 400 }),
      PHOTO(30, 28, 40, 18, { sp: "oval", bd: "#e8c872", bw: 2 }), P("Thiéboudiène  ·  3 500 F", 12, 50, 76, 5, 4.4, "#ffffff", { fw: 400, ff: "Cormorant Garamond", ls: 1 }), P("Yassa poulet  ·  3 000 F", 12, 57, 76, 5, 4.4, "#ffffff", { fw: 400, ff: "Cormorant Garamond", ls: 1 }), P("Dibi grillé  ·  4 000 F", 12, 64, 76, 5, 4.4, "#ffffff", { fw: 400, ff: "Cormorant Garamond", ls: 1 }), P("Mafé boeuf  ·  3 500 F", 12, 71, 76, 5, 4.4, "#ffffff", { fw: 400, ff: "Cormorant Garamond", ls: 1 }),
      HDIV(50, 79, 22), CAP("OUVERT 7J/7 · 11H – 23H", 10, 85, 80, 2.6, "#e8c872", { ls: 5, fw: 700 }), CAP("77 123 45 67 · Dakar", 10, 90, 80, 2.4, "#cfd9cf", { ls: 3 })) },
    burger: { n: "Fast-food / Burger", d: "Rouge appétissant, grand visuel et prix.", k: "burger fast food pizza sandwich menu livraison tacos", cat: "Restauration", bg: "#e8222d", bg2: "#8a0f18", a: 170, e: E(
      S(10, 5, 80, 64, "#ffd23f", { rad: 999 }), PHOTO(16, 9, 68, 55, { sp: "oval", bd: "#ffffff", bw: 5 }), S(66, 5, 28, 22.4, "#14161f", { rad: 999 }), P("2 500 F", 66, 11, 28, 8, 4.8, "#ffd23f", { ff: "Anton", rot: -10 }),
      P("{s|BURGER}", 6, 63, 88, 16, 16, "#ffffff", { ff: "Anton", fx: "shadow", ls: 3 }), P("DOUBLE CHEESE", 6, 78, 88, 7, 6.6, "#ffd23f", { ff: "Bebas Neue", ls: 10 }), BTN("COMMANDER", 30, 87, 40, "#ffffff", "#e8222d"), P("🍟 🥤 🍔", 6, 94, 88, 4, 3, "#ffffff")) },
    cafe: { n: "Café & pâtisserie", d: "Crème, marron et or : salon de thé chaleureux.", k: "café pâtisserie boulangerie gâteaux salon de thé", cat: "Restauration", bg: "#f6ecdd", bg2: "#ead7ba", a: 170, e: E(
      S(5, 3, 90, 94, "", { bd: "#6b4a2b", bw: 1.2 }), P("☕", 38, 6, 24, 9, 7, "#6b4a2b"), CAP("SALON DE THÉ", 20, 16, 60, 2.8, "#6b4a2b", { ls: 10, fw: 700 }), P("{S|Café Teranga}", 6, 21, 88, 11, 10, "#3f2a16", { ff: "Playfair Display", fw: 700 }),
      PHOTO(18, 35, 64, 30, { rad: 140, bd: "#6b4a2b", bw: 2 }), HDIV(50, 68, 22), P("Viennoiseries · Gâteaux · Cafés d’exception", 8, 74, 84, 5, 3.8, "#6b4a2b", { ff: "Cormorant Garamond", fw: 700, fi: 1 }), CAP("OUVERT DÈS 7H · LUN–DIM", 10, 82, 80, 2.4, "#3f2a16", { ls: 4, fw: 700 }), CAP("Almadies · 77 123 45 67", 10, 89, 80, 2.4, "#6b4a2b", { ls: 3 })) },
    traiteur: { n: "Traiteur / Événementiel", d: "Bordeaux et or : buffets, mariages, réceptions.", k: "traiteur buffet réception cuisine événement mariage", cat: "Restauration", bg: "#5a0f1f", bg2: "#2a0710", a: 170, e: E(
      S(5, 3, 90, 94, "", { bd: "#e9c46a", bw: 1 }), CAP("{N|CHEZ AWA}", 10, 8, 80, 2.8, "#e9c46a", { ls: 10, fw: 700 }), P("Traiteur", 6, 12, 88, 14, 17, "#ffffff", { ff: "Great Vibes", fx: "gold", fw: 400 }), P("POUR TOUTES VOS RÉCEPTIONS", 6, 27, 88, 5, 4.6, "#ffffff", { ff: "Cinzel", fw: 700, ls: 3 }),
      PHOTO(8, 35, 40, 28, { rad: 16, bd: "#e9c46a", bw: 2 }), PHOTO(52, 35, 40, 28, { rad: 16, bd: "#e9c46a", bw: 2 }), HDIV(50, 67, 24), CAP("MARIAGES · BAPTÊMES · ANNIVERSAIRES", 8, 73, 84, 2.5, "#e9c46a", { ls: 3, fw: 700 }), P("Buffets · Cocktails · Service complet", 8, 79, 84, 5, 4, "#ffd9e0", { ff: "Cormorant Garamond", fw: 700, fi: 1 }), BTN("DEMANDER UN DEVIS", 22, 86, 56, "#e9c46a", "#5a0f1f")) },
    /* ---------- Pro & éducation ---------- */
    formation: { n: "Conférence / Formation", d: "Bloc coloré incliné, portrait de l’intervenant.", k: "conférence formation séminaire atelier cours pro webinaire", cat: "Pro", bg: "#ffffff", bg2: "#eef6f4", a: 170, e: E(
      S(-20, -12, 80, 50, "#087f6b", { rot: -12, ac: 1 }), PHOTO(60, 7, 32, 25.6, { sp: "oval", bd: "#ffffff", bw: 5 }), CAP("CONFÉRENCE", 6, 9, 50, 2.8, "#ffffff", { ls: 8, fw: 700, al: "left" }), P("{S|LEADERSHIP & INNOVATION}", 6, 38, 88, 22, 9, "#14161f", { al: "left", ff: "Montserrat", fw: 700, lh: 1.1 }),
      L(6, 62, 14, "ink"), P("Samedi 22 novembre · 9h–17h\nPalais des Congrès · Dakar", 6, 66, 88, 9, 4, "#505a6e", { al: "left", fw: 400, lh: 1.5 }), P("Avec Dr Aïssatou Ba, M. Cheikh Ndiaye et 6 intervenants", 6, 77, 88, 5, 3.2, "#505a6e", { al: "left", fw: 400, ff: "Montserrat" }), BTN("S’INSCRIRE", 6, 86, 36, "#087f6b", "#ffffff", { ac: 1 }), P("{n|NOM DE LA MARQUE}", 6, 95, 88, 3, 2.4, "#087f6b", { ff: "Montserrat", ls: 4, al: "left" })) },
    recrut: { n: "Nous recrutons", d: "Bleu vif, bloc blanc et poste à pourvoir.", k: "recrutement emploi offre poste cdi cdd job travail", cat: "Pro", bg: "#2340ff", bg2: "#1220a8", a: 160, e: E(
      S(-10, -6, 50, 28, "#ffd23f", { rad: 999, op: 92 }), P("NOUS", 6, 7, 88, 9, 8, "#ffffff", { ff: "Bebas Neue", al: "left", ls: 6 }), P("RECRUTONS", 6, 17, 88, 14, 13, "#ffffff", { ff: "Anton", al: "left", ls: 2 }),
      S(6, 38, 88, 44, "#ffffff", { rad: 22 }), P("{S|COMMERCIAL TERRAIN}", 10, 41, 80, 9, 6, "#2340ff", { ff: "Montserrat", al: "left", fw: 700 }), P("CDI · Dakar · Débutant accepté\nEnvoyez votre CV avant le 30 novembre", 10, 52, 80, 12, 3.6, "#14161f", { fw: 400, al: "left", ff: "Poppins", lh: 1.5 }), PHOTO(10, 66, 30, 13, { rad: 10 }), P("contact@ton-domaine.com\n77 123 45 67", 44, 67, 50, 11, 3.2, "#2340ff", { ff: "Poppins", fw: 700, al: "left", lh: 1.5 }),
      BTN("POSTULER MAINTENANT", 22, 88, 56, "#ffd23f", "#14161f")) },
    ecole: { n: "Inscriptions ouvertes", d: "Jaune vif et bleu : école, université, formation.", k: "inscription école formation rentrée cours université centre", cat: "Pro", bg: "#ffd23f", bg2: "#ffbf1a", a: 170, e: E(
      S(-12, 60, 60, 48, "#2340ff", { rad: 999 }), S(72, -10, 44, 36, "#14161f", { sp: "hex" }), P("🎓", 62, 3, 30, 10, 8, "#ffd23f"), P("INSCRIPTIONS", 6, 14, 88, 12, 10, "#14161f", { ff: "Anton", al: "left", ls: 2 }),
      P("{S|OUVERTES}", 6, 26, 88, 16, 16, "#2340ff", { ff: "Anton", al: "left", ls: 2 }), PHOTO(52, 44, 42, 28, { rad: 20, bd: "#14161f", bw: 3 }), P("Rentrée 2026-2027\nLicence & Master", 6, 46, 44, 10, 4.2, "#14161f", { fw: 700, al: "left", ff: "Poppins", lh: 1.45 }),
      P("Places limitées", 6, 78, 44, 6, 4.6, "#ffffff", { al: "left", ff: "Montserrat", fw: 700 }), P("77 123 45 67", 6, 85, 50, 5, 4, "#ffffff", { al: "left", ff: "Montserrat", fw: 400 }), P("{n|NOM DE L’ÉCOLE}", 6, 94, 88, 3, 2.8, "#ffffff", { ff: "Montserrat", ls: 4, al: "left" })) },
    clinique: { n: "Clinique / Santé", d: "Blanc et bleu turquoise : cabinet médical, clinique.", k: "santé clinique médecin cabinet dentiste pharmacie soins", cat: "Pro", bg: "#ffffff", bg2: "#e3f4f8", a: 170, e: E(
      S(-14, -10, 60, 48, "#0e8fa8", { rad: 999, op: 15 }), S(62, 62, 60, 48, "#0e8fa8", { rad: 999, op: 12 }), P("✚", 6, 5, 14, 8, 8, "#0e8fa8"), CAP("{N|CLINIQUE DU PLATEAU}", 22, 6, 72, 2.8, "#0e8fa8", { ls: 5, fw: 700, al: "left" }),
      P("Votre santé,", 6, 13, 88, 10, 9, "#0b3b47", { ff: "Playfair Display", al: "left", fw: 700 }), P("notre priorité", 6, 22, 88, 10, 9, "#0e8fa8", { ff: "Playfair Display", al: "left", fw: 700 }), PHOTO(20, 36, 60, 30, { rad: 24, bd: "#0e8fa8", bw: 2 }),
      P("Médecine générale · Pédiatrie · Analyses · Urgences 24h/24", 6, 70, 88, 8, 3.8, "#0b3b47", { ff: "Montserrat", fw: 400, lh: 1.5 }), BTN("PRENDRE RENDEZ-VOUS", 22, 82, 56, "#0e8fa8", "#ffffff"), P("77 123 45 67 · Plateau, Dakar", 6, 92, 88, 3, 2.8, "#0b3b47", { ff: "Montserrat", ls: 3 })) },
    garage: { n: "Garage / Auto", d: "Noir et rouge : mécanique, entretien, dépannage.", k: "garage auto mécanique voiture entretien dépannage pneus", cat: "Pro", bg: "#101114", bg2: "#2a0d10", a: 170, e: E(
      S(-20, 38, 140, 15, "#e11d2a", { rot: -8 }), P("🔧", 4, 3, 16, 9, 7, "#ffffff"), P("GARAGE", 6, 10, 88, 15, 17, "#ffffff", { ff: "Anton", ls: 4, al: "left" }), P("{S|MÉCANIQUE & ENTRETIEN}", 6, 26, 88, 7, 5.6, "#e11d2a", { ff: "Oswald", ls: 5, al: "left" }),
      P("DIAGNOSTIC GRATUIT", 4, 40, 92, 8, 6.4, "#ffffff", { ff: "Anton", rot: -8, ls: 3 }), PHOTO(8, 56, 84, 22, { rad: 14, bd: "#ffffff", bw: 2 }), P("Vidange · Freins · Climatisation · Pneus", 6, 81, 88, 5, 3.8, "#ffffff", { ff: "Montserrat", fw: 400 }), P("77 123 45 67 · Lun–Sam 8h–19h", 6, 87, 88, 5, 3.8, "#ffd23f", { ff: "Montserrat", fw: 700 }), P("{n|NOM DU GARAGE}", 6, 94, 88, 3, 2.6, "#9aa0a8", { ff: "Montserrat", ls: 6, al: "left" })) },
    avis: { n: "Avis / Annonce", d: "Bandeau d’alerte rouge et message clair.", k: "avis annonce information important communiqué alerte notification", cat: "Pro", bg: "#ffffff", bg2: "#f4f6fb", a: 170, e: E(
      S(0, 0, 100, 22, "#d62839"), P("AVIS IMPORTANT", 6, 5, 88, 12, 8, "#ffffff", { ff: "Anton", ls: 5 }), P("📢", 6, 27, 88, 14, 12, "#14161f"), P("{S|FERMETURE EXCEPTIONNELLE}", 8, 44, 84, 18, 7.6, "#14161f", { ff: "Montserrat", fw: 700, lh: 1.15 }),
      L(38, 66, 24, "ink", { bg: "#d62839", gr: "" }), P("Nos bureaux seront fermés le vendredi 21 novembre.\nReprise normale le lundi 24.", 10, 70, 80, 12, 4, "#505a6e", { fw: 400, ff: "Poppins", lh: 1.5 }), P("{n|NOM DE LA MARQUE}", 6, 92, 88, 3, 2.6, "#d62839", { ff: "Montserrat", ls: 5 })) },
    minimal: { n: "Minimaliste", d: "Blanc, un grand titre et beaucoup d’air.", k: "minimal simple épuré blanc texte moderne", cat: "Pro", bg: "#ffffff", bg2: "#f1f3f8", a: 170, e: E(
      S(8, 8, 10, 7.2, "#14161f"), PHOTO(8, 20, 84, 36, { bd: "#14161f", bw: 0 }), P("{S|Titre de l’événement}", 8, 60, 84, 17, 9.4, "#14161f", { al: "left", ff: "Raleway", fw: 700, lh: 1.05 }), L(8, 80, 14, "ink"), P("Date · Lieu · Heure", 8, 83, 84, 5, 3.8, "#14161f", { al: "left", fw: 400, ff: "Montserrat", ls: 2 }), P("{n|NOM DE LA MARQUE}", 8, 92, 84, 3, 2.6, "#14161f", { al: "left", ff: "Montserrat", ls: 6 })) },
    /* ---------- Foi, social & vœux ---------- */
    aid: { n: "Vœux de fête religieuse", d: "Bleu nuit, croissant or et silhouettes d’arches.", k: "aid tabaski korité eid ramadan vœux religieux fête mosquée", cat: "Foi & Social", bg: "#0b1a4a", bg2: "#1d3d99", a: 175, e: E(
      S(72, 6, 6, 4.8, "#ffd23f", { sp: "star" }), S(18, 18, 4, 3.2, "#ffffff", { sp: "star" }), S(86, 28, 4, 3.2, "#ffffff", { sp: "star" }), S(10, 36, 3, 2.4, "#ffd23f", { sp: "star" }), P("🌙", 30, 6, 40, 20, 20, "#ffd23f"),
      P("{S|Eid Mubarak}", 4, 28, 92, 13, 15, "#ffd23f", { ff: "Great Vibes", fx: "gold", fw: 400 }), P("BONNE FÊTE", 6, 43, 88, 7, 5.6, "#ffffff", { ff: "Cinzel", fw: 700, ls: 10 }), HDIV(50, 54, 24),
      P("Que cette fête vous apporte paix, joie\net bénédictions.", 10, 60, 80, 9, 4, "#cfd8f5", { ff: "Cormorant Garamond", fw: 700, fi: 1, lh: 1.4 }), S(2, 78, 20, 26, "#08123a", { sp: "arch" }), S(18, 84, 26, 30, "#08123a", { sp: "arch" }), S(42, 74, 22, 30, "#08123a", { sp: "arch" }), S(62, 82, 24, 28, "#08123a", { sp: "arch" }), S(82, 77, 22, 30, "#08123a", { sp: "arch" }), P("{n|NOM DE LA MARQUE}", 6, 90, 88, 3, 2.6, "#ffd23f", { ff: "Montserrat", ls: 6 })) },
    culte: { n: "Conférence religieuse", d: "Bleu profond et or : prédication, veillée, conférence.", k: "culte église conférence religieuse prière veillée prédication", cat: "Foi & Social", bg: "#0e1b3f", bg2: "#2a1f55", a: 170, e: E(
      CAP("GRANDE CONFÉRENCE", 15, 6, 70, 2.8, "#e9c46a", { ls: 8, fw: 700 }), P("{S|FOI & ESPÉRANCE}", 6, 11, 88, 14, 8.6, "#ffffff", { ff: "Cinzel", fw: 700, ls: 2, lh: 1.1 }),
      PHOTO(30, 30, 40, 30, { sp: "arch", bd: "#e9c46a", bw: 2 }), P("Avec le Pasteur Samuel Diouf", 8, 63, 84, 6, 5, "#ffffff", { ff: "Great Vibes", fw: 400, fx: "gold" }), HDIV(50, 72, 22), P("VENDREDI 21 NOVEMBRE · 19H", 8, 78, 84, 5, 4, "#ffffff", { ff: "Montserrat", fw: 700, ls: 3 }), P("Temple Central · Dakar · Entrée libre", 8, 84, 84, 5, 3.6, "#cfd5ea", { ff: "Cormorant Garamond", fw: 700, fi: 1 }), P("{n|NOM DE L’ÉGLISE}", 6, 92, 88, 3, 2.6, "#e9c46a", { ff: "Montserrat", ls: 6 })) },
    solidarite: { n: "Campagne solidaire", d: "Vert espoir, grande photo et appel au don.", k: "solidarité ong association don campagne sensibilisation caritatif", cat: "Foi & Social", bg: "#0f6b4a", bg2: "#073a28", a: 175, e: E(
      S(-14, -8, 50, 40, "#ffd23f", { rad: 999, op: 18 }), PHOTO(0, 0, 100, 40, {}), S(0, 30, 100, 11, "#0f6b4a", { op: 90 }), P("❤️", 80, 4, 14, 8, 8, "#ffffff"), P("ENSEMBLE,", 6, 31, 88, 8, 7, "#ffffff", { ff: "Anton", al: "left", ls: 3 }), P("{S|CHANGEONS DES VIES}", 6, 44, 88, 17, 9.4, "#ffd23f", { ff: "Anton", al: "left", ls: 2, lh: 1.05 }),
      P("Collecte de fonds pour l’éducation des enfants\ndu village de Sédhiou.", 6, 64, 88, 11, 3.8, "#ffffff", { ff: "Poppins", fw: 400, al: "left", lh: 1.5 }), S(6, 78, 88, 9, "#ffffff", { rad: 14, op: 14 }), P("Dons : 77 123 45 67 (Wave / Orange Money)", 8, 79, 84, 7, 3.4, "#ffffff", { ff: "Poppins", fw: 700 }), BTN("JE FAIS UN DON", 26, 89, 48, "#ffd23f", "#073a28"), P("{n|NOM DE L’ASSOCIATION}", 6, 96.5, 88, 2.5, 2.2, "#bfe8d6", { ff: "Montserrat", ls: 4 })) },
    tournoi: { n: "Tournoi sportif", d: "Vert pelouse, bandeau blanc et inscription d’équipes.", k: "tournoi football foot navétane sport match quartier inscription", cat: "Soirée", bg: "#0e6b3a", bg2: "#08331d", a: 175, e: E(
      S(8, 57, 84, 0.2, "#ffffff", { op: 70 }), P("⚽", 36, 4, 28, 14, 12, "#ffffff"), P("TOURNOI", 4, 18, 92, 16, 18, "#ffffff", { ff: "Anton", fx: "shadow", ls: 3 }), P("{s|DE FOOTBALL}", 6, 34, 88, 9, 8, "#ffd23f", { ff: "Oswald", ls: 10 }), PHOTO(20, 44, 60, 11, { rad: 12, bd: "#ffffff", bw: 2 }),
      P("Samedi & dimanche · Stade municipal", 8, 62, 84, 6, 4, "#ffffff", { fw: 400, ff: "Poppins" }), P("Inscription : 5 000 F / équipe", 8, 70, 84, 6, 4, "#ffffff", { fw: 400, ff: "Poppins" }), BTN("INSCRIS TON ÉQUIPE", 26, 82, 48, "#ffd23f", "#09391f")) }
  };
  function seed(tpl, W, H, name, slogan, accent) {
    var t = TPLS[tpl] || TPLS.blank, cv = { W: W, H: H, bg: t.bg, bg2: t.bg2 || "", angle: t.a || 160, els: [] };
    t.e.forEach(function (d) {
      var o = Object.assign({}, d[4]), m = /^\{([nsNS])\|(.*)\}$/.exec(o.tx || ""), v;
      if (m) { v = m[1].toLowerCase() === "n" ? name : slogan; o.tx = v ? (m[1] === m[1].toLowerCase() ? v.toUpperCase() : v) : m[2]; }
      o.x = Math.round(d[0] * W / 100); o.y = Math.round(d[1] * H / 100); o.w = Math.round(d[2] * W / 100); o.h = Math.max(1, Math.round(d[3] * H / 100));
      if (o.fs) o.fs = Math.round(o.fs * W / 100);
      T(cv, o);
    });
    return cv;
  }
  function fit(cv, F) {
    var kx = F[0] / cv.W, ky = F[1] / cv.H;
    var kf = Math.min(kx, ky); cv.els.forEach(function (e) { e.x = Math.round(e.x * kx); e.w = Math.round(e.w * kx); e.y = Math.round(e.y * ky); e.h = Math.round(e.h * ky); if (e.k === "t") { e.fs = Math.max(8, Math.round(e.fs * kf)); if (e.ls) e.ls = Math.round(e.ls * kf * 10) / 10; } });
    cv.W = F[0]; cv.H = F[1];
  }

  function snap() { hist = hist.slice(0, hi + 1); hist.push(JSON.stringify(ctx.state.canvas)); if (hist.length > 40) hist.shift(); hi = hist.length - 1; }
  function go(d) { var i = hi + d; if (i < 0 || i >= hist.length) return; hi = i; ctx.state.canvas = JSON.parse(hist[i]); lastCv = ctx.state.canvas; if (!find(sel)) sel = null; commit(true); }
  function find(id) { return id && ctx.state.canvas.els.filter(function (e) { return e.id === id; })[0]; }
  function commit(noSnap) { if (!noSnap) snap(); ctx.save(); paint(); panel(); }

  function elStyle(node, e, col) {
    var s = node.style, bg = e.ac ? (col || ctx.state.color) : e.bg, fc = e.fc || "#ff2bd6", txt = e.k === "t" && e.tx && !bg, sh = "";
    s.left = e.x + "px"; s.top = e.y + "px"; s.width = e.w + "px"; s.height = e.h + "px"; s.opacity = e.op / 100;
    s.transform = "rotate(" + e.rot + "deg)"; s.background = GRADS[e.gr] || bg || "transparent"; s.borderRadius = e.rad + "px";
    if (e.sp === "balloon") s.borderRadius = "50% 50% 48% 48% / 56% 56% 44% 44%"; else if (e.sp === "arch") s.borderRadius = e.w + "px " + e.w + "px 0 0"; else if (e.sp === "oval") s.borderRadius = "50%";
    s.clipPath = CLIP[e.sp] || ""; s.border = e.bw ? e.bw + "px solid " + (e.bd || "#14161f") : "none"; s.webkitTextStroke = "";
    if (e.fx === "shadow") sh = txt ? "3px 4px 10px rgba(0,0,0,.45)" : "0 10px 24px rgba(0,0,0,.35)";
    else if (e.fx === "glow") sh = txt ? "0 0 8px " + fc + ",0 0 24px " + fc : "0 0 26px " + fc;
    else if (e.fx === "relief" && txt) sh = "1px 1px 0 " + fc + ",2px 2px 0 " + fc + ",3px 3px 0 " + fc + ",4px 4px 0 " + fc + ",6px 6px 10px rgba(0,0,0,.4)";
    else if (e.fx === "outline" && txt) s.webkitTextStroke = "2px " + fc;
    s.textShadow = txt ? sh : ""; s.boxShadow = txt ? "" : sh; s.filter = FL[e.fl] || "";
    s.letterSpacing = e.k === "t" && e.ls ? e.ls + "px" : ""; s.lineHeight = e.k === "t" && e.lh ? String(e.lh) : "";
    s.webkitBackgroundClip = ""; s.backgroundClip = ""; s.webkitTextFillColor = "";
    if (txt && METAL[e.fx]) { s.background = METAL[e.fx]; s.webkitBackgroundClip = "text"; s.backgroundClip = "text"; s.webkitTextFillColor = "transparent"; s.textShadow = ""; s.filter = "drop-shadow(0 1px 1px rgba(0,0,0,.25))"; }
    if (e.k === "t") { s.fontSize = e.fs + "px"; s.fontWeight = e.fw; s.fontStyle = e.fi ? "italic" : "normal"; s.fontFamily = "'" + e.ff + "',sans-serif"; s.color = e.c; s.textAlign = e.al; }
  }
  function mk(e, col) {
    var n = h("div", "pc-el");
    if (e.k === "i" && !e.src) { n.classList.add("pc-ph"); n.appendChild(h("span", "pc-img-missing", e.ph ? "📷 Double-clique pour ajouter ta photo" : "Image envoyée en pièce jointe")); } else if (e.k === "i") { var im = h("img"); im.src = e.src; im.draggable = false; n.appendChild(im); } else n.textContent = e.tx;
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
    page.addEventListener("dblclick", function (ev) { var nd = ev.target.closest(".pc-el"), e = nd && find(nd.dataset.id); if (e && e.k === "i") { ctx.target = e.id; ctx.upload.click(); } });
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
      g.appendChild(row("Espacement lettres", inp("range", e.ls || 0, live(function (v) { e.ls = v; }), { min: 0, max: 40 })));
      g.appendChild(row("Interligne", inp("range", e.lh || 1.15, live(function (v) { e.lh = v; }), { min: 0.8, max: 2, step: 0.05 })));
      g.appendChild(row("Couleur du texte", inp("color", e.c, live(function (v) { e.c = v; }))));
      var st = h("div", "pc-btns");
      st.appendChild(btn("G", function () { e.fw = e.fw >= 700 ? 400 : 700; commit(); }, e.fw >= 700 ? "on" : ""));
      st.appendChild(btn("I", function () { e.fi = e.fi ? 0 : 1; commit(); }, e.fi ? "on" : ""));
      ["left", "center", "right"].forEach(function (a, i) { st.appendChild(btn(["⇤", "↔", "⇥"][i], function () { e.al = a; commit(); }, e.al === a ? "on" : "")); });
      g.appendChild(st);
    }
    if (e.k === "i") { g.appendChild(h("p", "pc-hint", e.src ? "Image : déplace-la et redimensionne-la avec la poignée." : "Zone photo : ajoute ta photo, elle remplira ce cadre.")); g.appendChild(btn(e.src ? "↻ Remplacer l’image" : "📷 Choisir la photo", function () { ctx.target = e.id; ctx.upload.click(); }, "pc-big")); }
    if (e.k !== "t") { var gs = h("select"); [["", "Aucun"], ["gold", "Or"], ["rosegold", "Or rose"], ["silver", "Argent"], ["ink", "Encre"], ["blush", "Rose poudré"], ["sky", "Ciel"], ["sunset", "Coucher de soleil"], ["goldball", "Ballon or"], ["pearlball", "Ballon perle"], ["roseball", "Ballon rose"], ["blueball", "Ballon bleu"], ["redball", "Ballon rouge"]].forEach(function (o) { var op = h("option", "", o[1]); op.value = o[0]; gs.appendChild(op); }); gs.value = e.gr || ""; gs.addEventListener("change", function () { e.gr = gs.value; commit(); }); g.appendChild(row("Dégradé", gs)); }
    g.appendChild(row(e.k === "t" ? "Couleur de fond" : "Fond", inp("color", (e.ac ? ctx.state.color : e.bg) || "#ffffff", live(function (v) { e.bg = v; e.ac = 0; }))));
    if (e.bg || e.ac) g.appendChild(btn("Sans fond", function () { e.bg = ""; e.ac = 0; commit(); }));
    g.appendChild(row("Arrondi", inp("range", Math.min(e.rad, 120), live(function (v) { e.rad = v; }), { min: 0, max: 120 })));
    g.appendChild(row("Opacité", inp("range", e.op, live(function (v) { e.op = v; }), { min: 5, max: 100 })));
    g.appendChild(row("Rotation", inp("range", e.rot, live(function (v) { e.rot = v; }), { min: -180, max: 180 })));
    var fxs = h("select"), fo = [["", "Aucun"], ["shadow", "Ombre"], ["glow", "Lueur"]];
    if (e.k === "t" && e.tx && !e.bg && !e.ac) fo = fo.concat([["outline", "Contour"], ["relief", "Relief 3D"], ["gold", "Or métallique"], ["rosegold", "Or rose"], ["silver", "Argent"]]);
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
    var cv = ctx.state.canvas, tgt = ctx.target ? find(ctx.target) : null; ctx.target = null; if (!file || (!tgt && cv.els.filter(function (e) { return e.k === "i" && e.src; }).length >= 6)) return;
    var r = new FileReader();
    r.onload = function () {
      var im = new Image(); im.onload = function () {
        var k = Math.min(1, 900 / Math.max(im.width, im.height)), c = document.createElement("canvas"); c.width = Math.round(im.width * k); c.height = Math.round(im.height * k);
        c.getContext("2d").drawImage(im, 0, 0, c.width, c.height);
        var q = 0.8, src = c.toDataURL("image/webp", q); while (src.length > 400000 && q > 0.3) { q -= 0.1; src = c.toDataURL("image/webp", q); }
        if (tgt) { tgt.src = src; tgt.ph = 0; sel = tgt.id; commit(); return; }
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
  /* ===== Export : dessin direct du modèle sur un canvas (PNG / PDF haute définition) ===== */
  function cssGrad(ctx2, str, x, y, w, hh) {
    var m = /^(linear|radial)-gradient\((.*)\)$/.exec(str); if (!m) return null;
    var parts = m[2].split(/,(?![^(]*\))/).map(function (s) { return s.trim(); }), head = parts[0], g, stops;
    if (m[1] === "linear") {
      var ang = 180; var am = /^(-?[\d.]+)deg$/.exec(head); if (am) { ang = +am[1]; stops = parts.slice(1); } else stops = parts;
      var r = ang * Math.PI / 180, sx = Math.sin(r), sy = -Math.cos(r), len = Math.abs(w * sx) + Math.abs(hh * sy), cx = x + w / 2, cy = y + hh / 2;
      g = ctx2.createLinearGradient(cx - sx * len / 2, cy - sy * len / 2, cx + sx * len / 2, cy + sy * len / 2);
    } else {
      var pm = /at\s+([\d.]+)%\s+([\d.]+)%/.exec(head), px = pm ? +pm[1] / 100 : .5, py = pm ? +pm[2] / 100 : .5; stops = parts.slice(1);
      var cx2 = x + w * px, cy2 = y + hh * py, rad = Math.max(Math.hypot(cx2 - x, cy2 - y), Math.hypot(cx2 - x - w, cy2 - y), Math.hypot(cx2 - x, cy2 - y - hh), Math.hypot(cx2 - x - w, cy2 - y - hh));
      g = ctx2.createRadialGradient(cx2, cy2, 0, cx2, cy2, rad);
    }
    stops.forEach(function (s, i) { var sm = /^(.*?)\s+(-?[\d.]+)(%?)$/.exec(s); var col = sm ? sm[1] : s, pos = sm ? (sm[3] ? +sm[2] / 100 : +sm[2]) : (stops.length > 1 ? i / (stops.length - 1) : 0); g.addColorStop(Math.max(0, Math.min(1, pos)), col); });
    return g;
  }
  function polyPts(name) { var s = CLIP[name]; if (!s) return null; var m = /polygon\((.*)\)/.exec(s); return m[1].split(",").map(function (p) { var a = p.trim().split(/\s+/).map(function (v) { return parseFloat(v) / 100; }); return a; }); }
  function shapePath(c, e, x, y, w, hh, inset) {
    var pts = polyPts(e.sp); c.beginPath();
    if (pts) { pts.forEach(function (p, i) { var px = x + p[0] * w, py = y + p[1] * hh; if (i) c.lineTo(px, py); else c.moveTo(px, py); }); c.closePath(); return; }
    x += inset; y += inset; w -= inset * 2; hh -= inset * 2; if (w <= 0 || hh <= 0) return;
    if (e.sp === "oval" || e.sp === "balloon") { c.ellipse(x + w / 2, y + hh / 2, w / 2, hh / 2, 0, 0, Math.PI * 2); return; }
    var r = e.sp === "arch" ? Math.min(w / 2, hh) : Math.min(Math.max(e.rad - inset, 0), w / 2, hh / 2);
    if (e.sp === "arch") { c.moveTo(x, y + hh); c.lineTo(x, y + r); c.arc(x + r, y + r, r, Math.PI, Math.PI * 1.5); c.lineTo(x + w - r, y); c.arc(x + w - r, y + r, r, Math.PI * 1.5, 0); c.lineTo(x + w, y + hh); c.closePath(); return; }
    c.roundRect ? c.roundRect(x, y, w, hh, r) : c.rect(x, y, w, hh);
  }
  function wrapLines(c, text, maxW) {
    var out = [];
    String(text).split("\n").forEach(function (para) {
      var words = para.split(" "), line = "";
      words.forEach(function (wd) {
        var t = line ? line + " " + wd : wd;
        if (line && c.measureText(t).width > maxW) { out.push(line); line = wd; } else line = t;
        while (c.measureText(line).width > maxW && line.length > 1) { var k = line.length - 1; while (k > 1 && c.measureText(line.slice(0, k)).width > maxW) k--; out.push(line.slice(0, k)); line = line.slice(k); }
      });
      out.push(line);
    });
    return out;
  }
  function loadImg(src) { return new Promise(function (res) { if (!src) return res(null); var im = new Image(); im.onload = function () { res(im); }; im.onerror = function () { res(null); }; im.src = src; }); }
  function toCanvas(state, scale) {
    var cv = state.canvas, fonts = {};
    cv.els.forEach(function (e) { if (e.k === "t") fonts[(e.fi ? "italic " : "") + e.fw + " 20px '" + e.ff + "'"] = 1; });
    return Promise.all(Object.keys(fonts).map(function (f) { return document.fonts.load(f, "Aàé1"); }).concat([document.fonts.ready]))
      .then(function () { return Promise.all(cv.els.map(function (e) { return e.k === "i" ? loadImg(e.src) : null; })); })
      .then(function (imgs) {
        var cn = document.createElement("canvas"); cn.width = Math.round(cv.W * scale); cn.height = Math.round(cv.H * scale);
        var c = cn.getContext("2d"); c.scale(scale, scale);
        c.fillStyle = cv.bg2 ? cssGrad(c, "linear-gradient(" + cv.angle + "deg," + cv.bg + "," + cv.bg2 + ")", 0, 0, cv.W, cv.H) : cv.bg; c.fillRect(0, 0, cv.W, cv.H);
        cv.els.forEach(function (e, idx) {
          var w = e.w, hh = e.h, bg = e.ac ? state.color : e.bg, isTxt = e.k === "t" && e.tx && !bg && !e.gr;
          c.save(); c.globalAlpha = Math.max(0, Math.min(1, e.op / 100)); c.translate(e.x + w / 2, e.y + hh / 2); c.rotate(e.rot * Math.PI / 180);
          var x = -w / 2, y = -hh / 2;
          if (!isTxt && e.k !== "i" || (e.k === "t" && (bg || e.gr))) {
            var fill = e.gr && GRADS[e.gr] ? cssGrad(c, GRADS[e.gr], x, y, w, hh) : bg;
            if (fill) {
              c.save(); if (e.fx === "shadow") { c.shadowColor = "rgba(0,0,0,.35)"; c.shadowBlur = 24; c.shadowOffsetY = 10; } else if (e.fx === "glow") { c.shadowColor = e.fc; c.shadowBlur = 26; }
              shapePath(c, e, x, y, w, hh, 0); c.fillStyle = fill; c.fill(); c.restore();
            }
          }
          if (e.k === "i" && imgs[idx]) {
            var im = imgs[idx]; c.save(); shapePath(c, e, x, y, w, hh, 0); c.clip();
            var k = Math.max(w / im.width, hh / im.height), dw = im.width * k, dh = im.height * k; if (FL[e.fl]) c.filter = FL[e.fl];
            c.drawImage(im, x + (w - dw) / 2, y + (hh - dh) / 2, dw, dh); c.restore();
          }
          if (e.bw > 0) { c.save(); shapePath(c, e, x, y, w, hh, e.bw / 2); c.lineWidth = e.bw; c.strokeStyle = e.bd || "#14161f"; c.stroke(); c.restore(); }
          if (e.k === "t" && e.tx) {
            var fs = e.fs; c.font = (e.fi ? "italic " : "") + e.fw + " " + fs + "px '" + e.ff + "',sans-serif"; c.letterSpacing = (e.ls || 0) + "px"; c.textBaseline = "alphabetic";
            var lines = wrapLines(c, e.tx, w), lh = (e.lh || 1.15) * fs, total = lines.length * lh, mt = c.measureText("Hg");
            var asc = mt.fontBoundingBoxAscent || fs * .8, des = mt.fontBoundingBoxDescent || fs * .2, ty = -total / 2;
            var tx0 = e.al === "left" ? x : e.al === "right" ? x + w : 0; c.textAlign = e.al === "left" ? "left" : e.al === "right" ? "right" : "center";
            var base = function (i) { return ty + i * lh + (lh - (asc + des)) / 2 + asc; };
            var paint = function (mode) { lines.forEach(function (ln, i) { var yy = base(i); if (mode === "stroke") c.strokeText(ln, tx0, yy); else c.fillText(ln, tx0, yy); }); };
            if (METAL[e.fx]) { c.fillStyle = cssGrad(c, METAL[e.fx], x, y, w, hh); paint("fill"); }
            else if (e.fx === "relief") { c.fillStyle = e.fc; for (var d = 6; d >= 1; d--) { c.save(); c.translate(d, d); if (d === 6) { c.shadowColor = "rgba(0,0,0,.4)"; c.shadowBlur = 10; } paint("fill"); c.restore(); } c.fillStyle = e.c; paint("fill"); }
            else if (e.fx === "glow") { c.fillStyle = e.c; c.shadowColor = e.fc; c.shadowBlur = 24; paint("fill"); c.shadowBlur = 8; paint("fill"); c.shadowBlur = 0; paint("fill"); }
            else if (e.fx === "shadow") { c.fillStyle = e.c; c.shadowColor = "rgba(0,0,0,.45)"; c.shadowBlur = 10; c.shadowOffsetX = 3; c.shadowOffsetY = 4; paint("fill"); }
            else if (e.fx === "outline") { c.fillStyle = e.c; paint("fill"); c.strokeStyle = e.fc; c.lineWidth = 2; c.lineJoin = "round"; paint("stroke"); }
            else { c.fillStyle = e.c; paint("fill"); }
          }
          c.restore();
        });
        return cn;
      });
  }

  var gq = "", gcat = "Tous";
  function gallery(host, state, pick) {
    host.textContent = ""; var col = state.color, qi = h("input", "pc-search"), chips = h("div", "pc-btns"), grid = h("div", "pc-gal");
    qi.type = "search"; qi.placeholder = "Rechercher : mariage, promo, anniversaire…"; qi.value = gq;
    ["Tous", "Fêtes", "Mariage", "Soirée", "Commerce", "Beauté", "Restauration", "Pro", "Foi & Social"].forEach(function (c) { chips.appendChild(btn(c, function () { gcat = c; gallery(host, state, pick); }, gcat === c ? "on" : "")); });
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
  window.PosterCanvas = { mk: mk, toCanvas: toCanvas, FONTS: FONTS, GRADS: GRADS, seed: seed, draw: draw, gallery: gallery, TPLS: TPLS, release: function () { enable(false); } };
})();
