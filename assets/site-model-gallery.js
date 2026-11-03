(function () {
  "use strict";
  var models = {
    vitrine: {
      title: "Site vitrine", style: "editorial", brand: "ATELIER", nav: ["Accueil", "Services", "Réalisations", "Contact"],
      pages: [
        ["Accueil", "L'EXCELLENCE AU QUOTIDIEN", "Donnez une nouvelle dimension à votre activité.", "Une présence digitale claire, élégante et pensée pour inspirer confiance dès le premier regard.", "Découvrir nos services", "photo-1497366754035-f200968a6e72"],
        ["Services", "CE QUE NOUS FAISONS", "Des solutions pensées autour de vos besoins.", "Un accompagnement complet, de la première idée à la réalisation finale.", "Parler de votre projet", "photo-1521737711867-e3b97375f902"],
        ["Réalisations", "NOS PROJETS", "Des idées transformées en expériences.", "Découvrez une sélection de projets conçus avec exigence et attention aux détails.", "Voir nos projets", "photo-1497366811353-6870744d04b2"],
        ["À propos", "NOTRE APPROCHE", "Le sens du détail fait toute la différence.", "Une équipe engagée qui place la qualité, l'écoute et la créativité au centre de chaque projet.", "Notre histoire", "photo-1521737711867-e3b97375f902"],
        ["Contact", "PARLONS ENSEMBLE", "Votre prochain projet commence ici.", "Décrivez-nous votre besoin et construisons une solution qui vous ressemble.", "Nous contacter", "photo-1497366216548-37526070297c"]
      ]
    },
    portfolio: {
      title: "Portfolio créatif", style: "gallery", brand: "NOÉ STUDIO", nav: ["Work", "About", "Journal", "Contact"],
      pages: [
        ["Accueil", "SELECTED WORK · 2026", "Créer avec intention. Marquer les esprits.", "Direction artistique, photographie et expériences visuelles singulières.", "Explorer le portfolio", "photo-1498050108023-c5249f4df085"],
        ["Projets", "SÉLECTION DE PROJETS", "Un regard, plusieurs univers.", "Une collection de projets qui racontent chacun une histoire différente.", "Voir la sélection", "photo-1507238691740-187a5b1d37b8"],
        ["Projet détaillé", "ÉTUDE DE CAS · 01", "L'identité prend vie dans chaque détail.", "Du concept initial aux derniers ajustements, découvrez le processus créatif.", "Projet suivant", "photo-1519389950473-47ba0277781c"],
        ["À propos", "À PROPOS DU STUDIO", "La curiosité comme moteur créatif.", "Un studio indépendant qui aime les idées fortes et les collaborations sincères.", "En savoir plus", "photo-1521737711867-e3b97375f902"],
        ["Contact", "COLLABORONS", "Une idée en tête ? Parlons-en.", "Les projets ambitieux commencent souvent par une simple conversation.", "Envoyer un message", "photo-1497366216548-37526070297c"]
      ]
    },
    boutique: {
      title: "Boutique en ligne", style: "commerce", brand: "MAISON ÉDEN", nav: ["Nouveautés", "Boutique", "Collections", "Contact"],
      pages: [
        ["Accueil", "COLLECTION PRINTEMPS", "Les essentiels qui font la différence.", "Des pièces choisies avec soin pour accompagner votre quotidien.", "Découvrir la collection", "photo-1441986300917-64674bd600d8"],
        ["Catalogue", "TOUS NOS ARTICLES", "Trouvez votre prochain coup de cœur.", "Explorez une sélection organisée pour vous aider à choisir facilement.", "Voir les nouveautés", "photo-1490481651871-ab68de25d43d"],
        ["Fiche produit", "LA SÉLECTION DU MOMENT", "Un essentiel, mille façons de le porter.", "Une création soignée, des finitions de qualité et une attention portée à chaque détail.", "Ajouter au panier", "photo-1542291026-7eec264c27ff"],
        ["Panier", "VOTRE SÉLECTION", "Presque à vous.", "Retrouvez vos articles et vérifiez votre sélection avant de continuer.", "Continuer", "photo-1472851294608-062f824d29cc"],
        ["Contact", "BESOIN D'AIDE ?", "Nous sommes là pour vous.", "Une question sur un article, une commande ou une livraison ? Notre équipe vous répond.", "Contacter la boutique", "photo-1497366216548-37526070297c"]
      ]
    },
    landing: {
      title: "Page de conversion", style: "bold", brand: "NOVA", nav: ["La solution", "Avantages", "Offres", "Contact"],
      pages: [
        ["Accueil", "PASSEZ À L'ÉTAPE SUIVANTE", "Votre ambition mérite mieux qu'une page ordinaire.", "Une solution simple et efficace pour transformer vos visiteurs en contacts qualifiés.", "Commencer maintenant", "photo-1460925895917-afdab827c52f"],
        ["Offre", "UNE OFFRE CLAIRE", "Tout ce qu'il faut pour démarrer.", "Un accompagnement structuré, sans complexité inutile et adapté à vos objectifs.", "Découvrir l'offre", "photo-1552664730-d307ca884978"],
        ["Avantages", "POURQUOI NOUS CHOISIR", "Moins de friction. Plus de résultats.", "Une expérience fluide, des informations accessibles et un parcours conçu pour vos visiteurs.", "Voir les avantages", "photo-1521737711867-e3b97375f902"],
        ["Tarifs", "NOS FORMULES", "Choisissez le bon point de départ.", "Des formules lisibles qui vous permettent d'avancer selon vos besoins.", "Comparer les offres", "photo-1554224155-6726b3ff858f"],
        ["Contact", "ON EN DISCUTE ?", "Faisons avancer votre idée.", "Expliquez-nous votre objectif. Nous vous aiderons à choisir la meilleure approche.", "Demander un échange", "photo-1497366216548-37526070297c"]
      ]
    },
    evenement: {
      title: "Site événementiel", style: "event", brand: "FESTIVAL", nav: ["L'événement", "Programme", "Galerie", "Billets"],
      pages: [
        ["Accueil", "12 — 14 JUIN · DAKAR", "Trois jours pour vivre l'inoubliable.", "Musique, rencontres et découvertes : retrouvez toutes les informations du rendez-vous.", "Découvrir l'événement", "photo-1492684223066-81342ee5ff30"],
        ["Programme", "LE PROGRAMME", "Chaque moment a son rendez-vous.", "Préparez votre expérience avec les temps forts et les activités à ne pas manquer.", "Voir les horaires", "photo-1506157786151-b8491531f063"],
        ["Galerie", "EN IMAGES", "L'énergie des éditions précédentes.", "Quelques instants, des rencontres et des souvenirs à revivre.", "Voir la galerie", "photo-1501386761578-eac5c94b800a"],
        ["Billetterie", "RÉSERVEZ VOTRE PLACE", "Faites partie de l'expérience.", "Choisissez votre accès et préparez-vous à vivre un moment exceptionnel.", "Voir les accès", "photo-1505373877841-8d25f7d46678"],
        ["Contact", "UNE QUESTION ?", "Toutes les infos au même endroit.", "Notre équipe est disponible pour vous accompagner avant et pendant l'événement.", "Nous écrire", "photo-1497366216548-37526070297c"]
      ]
    }
  };
  var css = document.createElement("style");
  css.textContent = [
    
    ".tpl{display:flex!important;flex-direction:column!important;gap:9px!important;padding:10px!important;text-align:left!important;border:1px solid #dce3ef!important;border-radius:16px!important;background:#fff!important;overflow:hidden!important;transition:transform .2s,border-color .2s,box-shadow .2s!important}.tpl:hover{transform:translateY(-3px);border-color:#7d94ff!important;box-shadow:0 14px 32px #172b5018!important}.tpl[aria-pressed=true]{border:2px solid #315cff!important;box-shadow:0 0 0 3px #315cff18!important}.tpl-preview{height:172px!important;width:100%!important;display:block!important;position:relative!important;overflow:hidden!important;border-radius:10px!important;background:#eef1f6!important}.tpl-preview>i{display:none!important}.wm-mini{position:absolute;inset:0;display:block;background:var(--mini-bg,#f4f4f0);color:var(--mini-ink,#182333);font-family:Arial,sans-serif;overflow:hidden}.wm-mini-nav{height:23px;padding:8px 10px;display:flex;justify-content:space-between;font-size:7px;font-weight:900;letter-spacing:.12em;background:var(--mini-nav,#fff)}.wm-mini-nav span:last-child{font-size:5px;letter-spacing:0;color:#7a8290}.wm-mini-hero{height:91px;display:grid;grid-template-columns:1fr 42%;gap:6px;align-items:center;padding:9px 11px;background:var(--mini-hero,#f4f7f4)}.wm-mini-copy small{display:block;font-size:5px;font-weight:900;letter-spacing:.14em;color:var(--mini-accent,#087f6b);margin-bottom:5px}.wm-mini-copy b{display:block;font-size:13px;line-height:1.02;letter-spacing:-.05em;max-width:145px}.wm-mini-copy em{display:block;margin-top:5px;font-size:5px;font-style:normal;color:#778092}.wm-mini-photo{height:70px;border-radius:var(--mini-radius,5px);background-size:cover;background-position:center}.wm-mini-cta{display:block;width:44px;height:9px;margin-top:6px;border-radius:2px;background:var(--mini-accent,#087f6b)}.wm-mini-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:5px;padding:7px 11px}.wm-mini-cards i{display:block;height:32px;border-radius:3px;background:linear-gradient(135deg,#d9e1e8,#f1f3f4)}.wm-mini-foot{height:13px;background:var(--mini-ink,#182333);margin-top:1px}.tpl b{font-size:.92rem!important}.tpl .tpl-tag{font-size:.66rem!important;font-weight:800!important;letter-spacing:.08em!important;color:#52627a!important}.tpl>span:not(.tpl-preview):not(.tpl-tag){font-size:.76rem!important;line-height:1.45!important;color:#68758a!important}.web-model-preview{margin:0 0 10px!important;border-radius:10px!important;background:#edf2ff!important;border:1px solid #d5dfff!important;color:#2446ca!important;padding:11px!important;font-weight:800!important}.web-model-preview:before{content:'↗  ';font-size:1rem}@media(max-width:560px){.tpl-preview{height:145px!important}.wm-mini-hero{height:77px}.wm-mini-copy b{font-size:11px}.wm-mini-photo{height:60px}.wm-mini-cards i{height:25px}}",
    ".web-model-preview{display:block;margin:10px 0 2px;width:100%;border:1px solid #cbd5e1;background:#f8fafc;color:#18243a;border-radius:10px;padding:10px 12px;font:700 .78rem Figtree,system-ui,sans-serif;cursor:pointer}.web-model-preview:hover{border-color:#2340ff;color:#2340ff;background:#eef2ff}",
    ".wm-overlay{position:fixed;inset:0;z-index:10000;background:#08101ddf;display:grid;place-items:center;padding:16px;backdrop-filter:blur(8px)}.wm-dialog{width:min(1180px,100%);max-height:96vh;overflow:auto;background:#f4f6fa;color:#172033;border:1px solid #ffffff50;border-radius:22px;box-shadow:0 30px 100px #0008}.wm-head{display:flex;justify-content:space-between;align-items:center;gap:14px;padding:16px 20px;background:#fff;border-bottom:1px solid #e5e9f1}.wm-head h2{margin:0;font:800 1rem Figtree,system-ui,sans-serif}.wm-head p{margin:4px 0 0;color:#69758a;font-size:.78rem}.wm-close{border:0;background:#edf1f7;border-radius:10px;padding:10px 13px;font-weight:800;cursor:pointer}.wm-body{display:grid;grid-template-columns:minmax(0,1fr) 220px;gap:16px;padding:16px}.wm-browser{overflow:hidden;border:1px solid #dce2ec;border-radius:14px;background:white;box-shadow:0 12px 34px #1c2c4510}.wm-chrome{height:28px;background:#f0f2f6;display:flex;align-items:center;gap:5px;padding:0 11px;border-bottom:1px solid #e4e8ef}.wm-chrome i{width:7px;height:7px;border-radius:50%;background:#c1c9d6}.wm-site{min-height:500px;background:#fff;color:#172033;--wm-accent:#087f6b}.wm-nav{height:60px;display:flex;align-items:center;justify-content:space-between;gap:12px;padding:0 5%;border-bottom:1px solid #edf0f4;font:800 12px Figtree,system-ui,sans-serif;letter-spacing:.06em}.wm-nav strong{font-size:15px;letter-spacing:.12em}.wm-nav span{font-size:10px;color:#677286;word-spacing:10px}.wm-hero{position:relative;min-height:300px;display:grid;grid-template-columns:1.05fr .95fr;align-items:center;gap:20px;padding:34px 6%;overflow:hidden}.wm-copy{position:relative;z-index:1}.wm-eyebrow{display:inline-block;margin-bottom:13px;color:var(--wm-accent);font:800 10px Figtree,system-ui,sans-serif;letter-spacing:.16em}.wm-copy h3{max-width:520px;margin:0 0 14px;font:800 clamp(27px,4vw,48px)/1.02 Figtree,system-ui,sans-serif;letter-spacing:-.055em}.wm-copy p{max-width:440px;margin:0 0 20px;color:#687386;font:400 12px/1.7 Figtree,system-ui,sans-serif}.wm-cta{display:inline-block;background:var(--wm-accent);color:#fff;border-radius:5px;padding:12px 16px;font:800 10px Figtree,system-ui,sans-serif}.wm-visual{height:250px;position:relative}.wm-visual img{width:100%;height:100%;object-fit:cover;border-radius:var(--wm-photo-radius,12px);display:block}.wm-visual:after{content:'';position:absolute;inset:12px -10px -10px 12px;border:1px solid var(--wm-accent);border-radius:var(--wm-photo-radius,12px);z-index:-1}.wm-below{padding:22px 6% 30px;background:#f7f8fa}.wm-below-top{display:flex;justify-content:space-between;align-items:end;gap:12px;margin-bottom:14px}.wm-below-top small{color:var(--wm-accent);font-size:9px;font-weight:900;letter-spacing:.16em}.wm-below-top b{font-size:16px}.wm-cards{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}.wm-card{background:#fff;border:1px solid #e9edf3;border-radius:9px;overflow:hidden}.wm-card img{width:100%;height:72px;object-fit:cover;display:block}.wm-card span{display:block;padding:9px;font-size:10px;font-weight:800}.wm-footer{padding:15px 6%;background:#172033;color:#fff;display:flex;justify-content:space-between;font-size:9px;letter-spacing:.1em}.wm-pages{display:grid;gap:8px;align-content:start}.wm-page{display:grid;grid-template-columns:76px 1fr;gap:9px;align-items:center;text-align:left;border:1px solid #e0e5ed;background:#fff;border-radius:11px;padding:7px;cursor:pointer;color:#253149}.wm-page[aria-pressed=true]{border:2px solid #2340ff;background:#eef2ff}.wm-page img{width:76px;height:54px;object-fit:cover;border-radius:6px}.wm-page b{display:block;font-size:11px}.wm-page small{display:block;margin-top:3px;color:#778196;font-size:9px}.wm-foot{display:flex;justify-content:space-between;align-items:center;gap:12px;padding:0 18px 18px;color:#69758a;font-size:.78rem}.wm-use{border:0;background:#2340ff;color:#fff;border-radius:10px;padding:12px 18px;font-weight:800;cursor:pointer}.wm-style-gallery .wm-hero{grid-template-columns:1fr;padding-top:42px}.wm-style-gallery .wm-visual{height:220px}.wm-style-gallery .wm-copy h3{font-family:Georgia,serif;font-weight:500;letter-spacing:-.035em}.wm-style-gallery .wm-visual img{border-radius:0}.wm-style-gallery .wm-visual:after{display:none}.wm-style-commerce .wm-nav{background:#fffaf3}.wm-style-commerce .wm-hero{background:#fffaf3}.wm-style-commerce .wm-copy h3{font-family:Georgia,serif;font-weight:500;letter-spacing:-.04em}.wm-style-commerce .wm-cta{border-radius:2px}.wm-style-bold .wm-hero{background:#101827;color:white}.wm-style-bold .wm-copy p{color:#bdc7d6}.wm-style-bold .wm-visual{height:270px}.wm-style-bold .wm-visual img{border-radius:18px}.wm-style-bold .wm-visual:after{display:none}.wm-style-event .wm-hero{grid-template-columns:1fr;min-height:370px;color:#fff;background:#151321}.wm-style-event .wm-hero:before{content:'';position:absolute;inset:0;background:linear-gradient(90deg,#100e1be8,#100e1b55),var(--wm-hero-image) center/cover}.wm-style-event .wm-copy p{color:#e0dce9}.wm-style-event .wm-visual{display:none}.wm-style-event .wm-copy h3{font-family:Georgia,serif;font-weight:500;letter-spacing:-.035em}.wm-style-event .wm-cta{background:#f5b942;color:#191522}.wm-style-editorial .wm-hero{background:#f3f7f5}.wm-style-editorial .wm-visual img{border-radius:2px}.wm-style-editorial .wm-copy h3{font-weight:700}.wm-style-gallery .wm-nav strong{font-family:Georgia,serif}.wm-style-gallery .wm-hero{background:#f4f1ed}.wm-style-gallery .wm-visual{height:240px}.wm-dialog button:focus-visible{outline:3px solid #80a2ff;outline-offset:2px}",
    "@media(max-width:760px){.wm-body{grid-template-columns:1fr}.wm-pages{grid-template-columns:repeat(2,minmax(0,1fr))}.wm-site{min-height:0}.wm-nav{height:48px;padding:0 4%}.wm-nav span{word-spacing:4px;font-size:8px}.wm-hero{grid-template-columns:1fr;gap:18px;padding:25px 5%;min-height:0}.wm-copy h3{font-size:32px}.wm-visual{height:190px}.wm-style-event .wm-hero{min-height:300px}.wm-style-gallery .wm-hero{grid-template-columns:1fr}.wm-style-gallery .wm-visual{height:170px}.wm-below{padding:18px 5%}.wm-footer{padding:13px 5%}}@media(max-width:420px){.wm-overlay{padding:6px}.wm-dialog{border-radius:14px}.wm-head{padding:12px}.wm-body{padding:9px;gap:10px}.wm-page{grid-template-columns:58px 1fr;padding:5px}.wm-page img{width:58px;height:45px}.wm-page b{font-size:10px}.wm-hero{padding:20px 5%}.wm-copy h3{font-size:28px}.wm-visual{height:155px}.wm-cards{gap:6px}.wm-card img{height:55px}.wm-card span{padding:7px;font-size:9px}.wm-foot{padding:0 10px 12px;align-items:flex-start;flex-direction:column}}"
  ].join("");
  document.head.appendChild(css);
  function photo(id, width) { return "https://images.unsplash.com/" + id + "?auto=format&fit=crop&w=" + (width || 1200) + "&q=85"; }
  function node(tag, cls, text) { var n = document.createElement(tag); if (cls) n.className = cls; if (text != null) n.textContent = text; return n; }
  function templateKey(card) {
    var preview = card.querySelector(".tpl-preview");
    if (!preview) return "";
    var cls = Array.prototype.find.call(preview.classList, function (name) { return name.indexOf("tpl-preview-") === 0; });
    return cls ? cls.slice("tpl-preview-".length) : "";
  }
  function openModel(key, card) {
    var model = models[key]; if (!model) return;
    var index = 0;
    var overlay = node("div", "wm-overlay");
    var dialog = node("section", "wm-dialog");
    dialog.setAttribute("role", "dialog"); dialog.setAttribute("aria-modal", "true");
    dialog.setAttribute("aria-label", "Galerie " + model.title);
    var head = node("header", "wm-head");
    var heading = node("div");
    heading.append(node("h2", "", "Explorer · " + model.title), node("p", "", "Maquettes visuelles multi-pages · " + model.pages.length + " écrans"));
    var close = node("button", "wm-close", "Fermer"); close.type = "button";
    close.addEventListener("click", dismiss);
    head.append(heading, close);
    var body = node("div", "wm-body");
    var browser = node("div", "wm-browser");
    var chrome = node("div", "wm-chrome"); for (var d = 0; d < 3; d++) chrome.appendChild(node("i"));
    var site = node("div", "wm-site wm-style-" + model.style);
    var nav = node("div", "wm-nav"); nav.append(node("strong", "", model.brand), node("span", "", model.nav.join("   ")));
    var hero = node("section", "wm-hero");
    var copy = node("div", "wm-copy");
    var eyebrow = node("span", "wm-eyebrow");
    var title = node("h3");
    var description = node("p");
    var cta = node("span", "wm-cta");
    copy.append(eyebrow, title, description, cta);
    var visual = node("div", "wm-visual");
    var mainImage = node("img"); mainImage.alt = "";
    visual.appendChild(mainImage);
    hero.append(copy, visual);
    var below = node("section", "wm-below");
    var belowTop = node("div", "wm-below-top");
    var belowLabel = node("small", "", "DÉCOUVRIR");
    var belowTitle = node("b", "", "Une expérience pensée pour vous");
    belowTop.append(belowLabel, belowTitle);
    var cards = node("div", "wm-cards");
    var cardTitles = key === "boutique" ? ["Sélection du mois", "Nos nouveautés", "Les indispensables"] : key === "evenement" ? ["Les temps forts", "Les artistes", "Infos pratiques"] : key === "portfolio" ? ["Identité visuelle", "Direction artistique", "Digital"] : ["Expertise", "Accompagnement", "Qualité"];
    var cardPhotos = key === "boutique" ? ["photo-1490481651871-ab68de25d43d", "photo-1542291026-7eec264c27ff", "photo-1472851294608-062f824d29cc"] : ["photo-1497366811353-6870744d04b2", "photo-1521737711867-e3b97375f902", "photo-1497366216548-37526070297c"];
    cardTitles.forEach(function (label, i) { var c = node("article", "wm-card"); var im = node("img"); im.src = photo(cardPhotos[i], 380); im.alt = ""; c.append(im, node("span", "", label)); cards.appendChild(c); });
    below.append(belowTop, cards);
    var footer = node("footer", "wm-footer"); footer.append(node("span", "", model.brand), node("span", "", "© 2026 · TOUS DROITS RÉSERVÉS"));
    site.append(nav, hero, below, footer);
    browser.append(chrome, site);
    var pageNav = node("nav", "wm-pages"); pageNav.setAttribute("aria-label", "Pages du modèle");
    function renderPage() {
      var page = model.pages[index];
      eyebrow.textContent = page[1]; title.textContent = page[2]; description.textContent = page[3]; cta.textContent = page[4];
      mainImage.src = photo(page[5], 1100); mainImage.alt = "Illustration de la page " + page[0];
      site.style.setProperty("--wm-hero-image", "url('" + photo(page[5], 1100) + "')");
      belowLabel.textContent = key === "portfolio" ? "SELECTED WORK" : key === "evenement" ? "À L'AFFICHE" : "À DÉCOUVRIR";
      belowTitle.textContent = page[0] === "Contact" ? "Restons en contact" : page[0] === "Panier" ? "Votre sélection" : page[0] === "Billetterie" ? "Choisissez votre expérience" : "Une expérience pensée pour vous";
      Array.prototype.forEach.call(pageNav.children, function (b, i) { b.setAttribute("aria-pressed", String(i === index)); });
    }
    model.pages.forEach(function (page, i) {
      var b = node("button", "wm-page"); b.type = "button"; b.setAttribute("aria-pressed", String(i === 0));
      var im = node("img"); im.src = photo(page[5], 260); im.alt = "";
      var label = node("span"); label.append(node("b", "", page[0]), node("small", "", "PAGE 0" + (i + 1)));
      b.append(im, label); b.addEventListener("click", function () { index = i; renderPage(); }); pageNav.appendChild(b);
    });
    body.append(browser, pageNav);
    var foot = node("div", "wm-foot");
    foot.append(node("span", "", "Maquette de démonstration · visuels illustratifs"));
    var use = node("button", "wm-use", "Utiliser ce modèle"); use.type = "button";
    use.addEventListener("click", function () { dismiss(); card.click(); });
    foot.appendChild(use);
    dialog.append(head, body, foot); overlay.appendChild(dialog); document.body.appendChild(overlay);
    function dismiss() { overlay.remove(); document.removeEventListener("keydown", onKey); }
    function onKey(event) { if (event.key === "Escape") dismiss(); }
    overlay.addEventListener("click", function (event) { if (event.target === overlay) dismiss(); });
    document.addEventListener("keydown", onKey);
    renderPage(); close.focus();
  }
  function miniMarkup(key, model) {
    var p=model.pages[0], accents={vitrine:["#f1f5f1","#142b25","#087f6b","#fff","5px"],portfolio:["#eee9e2","#26221f","#a45b37","#fff","0"],boutique:["#fbf4e9","#332719","#a36b35","#fffaf3","2px"],landing:["#111c2b","#fff","#66e0c2","#182638","7px"],evenement:["#211b30","#fff","#f4bd52","#171321","0"]};
    var a=accents[key]||accents.vitrine;
    var mini=node("span","wm-mini");
    mini.style.cssText="--mini-bg:"+a[0]+";--mini-ink:"+a[1]+";--mini-accent:"+a[2]+";--mini-nav:"+a[3]+";--mini-hero:"+a[0]+";--mini-radius:"+a[4];
    var nav=node("span","wm-mini-nav");nav.append(node("b","",model.brand),node("span","",model.nav.slice(0,3).join("  ·  ")));
    var hero=node("span","wm-mini-hero"),copy=node("span","wm-mini-copy");
    copy.append(node("small","",p[1]),node("b","",p[2]),node("em","",p[3].slice(0,75)));
    var cta=node("i","wm-mini-cta");copy.appendChild(cta);
    var photoBox=node("span","wm-mini-photo");photoBox.style.backgroundImage="url('"+photo(p[5],500)+"')";
    hero.append(copy,photoBox);
    var cards=node("span","wm-mini-cards");for(var i=0;i<3;i++)cards.appendChild(node("i"));
    mini.append(nav,hero,cards,node("span","wm-mini-foot"));return mini;
  }
  function enhance() {
    if (document.body.getAttribute("data-studio-service") !== "site") return;
    var host = document.getElementById("tplList"); if (!host) return;
    Array.prototype.forEach.call(host.querySelectorAll(".tpl"), function (card) {
      var key=templateKey(card),model=models[key];if(!model)return;
      var visual=card.querySelector(".tpl-preview");
      if(visual&&!visual.dataset.galleryRedesigned){visual.textContent="";visual.appendChild(miniMarkup(key,model));visual.dataset.galleryRedesigned="1";}
      if(card.dataset.webPreviewReady)return;
      card.dataset.webPreviewReady="1";
      var button=node("button","web-model-preview","Explorer les 5 pages");
      button.type="button";button.addEventListener("click",function(event){event.preventDefault();event.stopPropagation();openModel(key,card);});
      card.insertAdjacentElement("afterend",button);
    });
  }
  function observe() {
    var host = document.getElementById("tplList");
    if (host) new MutationObserver(enhance).observe(host, { childList: true, subtree: true });
    enhance();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", observe);
  else observe();
  document.addEventListener("click", function (event) {
    if (event.target.closest && event.target.closest("[data-studio-service]")) window.setTimeout(enhance, 100);
  });
})();