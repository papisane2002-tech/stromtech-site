/* Aperçus interactifs : chaque modèle reprend le design de sa photo de couverture.
   Sites : ordinateur / mobile — Applications : téléphone / tablette. Contenus statiques (aucune donnée utilisateur). */
(function () {
  var M = {};
  function nav(items, cls) { return items.map(function (t, i) { return '<a data-go="' + i + '" class="' + (cls || "") + '">' + t + "</a>"; }).join(""); }
  function bar(p, c) { return '<i class="dm-bar"><b style="width:' + p + '%;background:' + c + '"></b></i>'; }
  function tiles(arr) { return arr.map(function (t) { return '<div class="dm-tile" style="background:linear-gradient(135deg,' + t[1] + ',' + t[2] + ')"><span>' + t[0] + "</span></div>"; }).join(""); }

  /* ---------- SITES ---------- */
  M["vitrine-pro"] = { type: "site", url: "www.sahel-conseil.sn", stage: "linear-gradient(135deg,#dbe8f3,#e9eef5)", pages: ["Accueil", "Services", "À propos", "Contact"],
    html: function (i) {
      var head = '<header class="dm-top"><b class="dm-logo">Sahel<em>Conseil</em></b><nav class="dm-nav">' + nav(["Accueil", "Services", "À propos", "Contact"], "") + '</nav><a data-go="3" class="dm-btn">Nous contacter</a></header>';
      var cards = '<div class="dm-cards3"><div class="dm-card"><b>Conseil stratégique</b><span>Un plan clair pour atteindre tes objectifs.</span></div><div class="dm-card"><b>Finance</b><span>Suivi, budgets et tableaux de bord.</span></div><div class="dm-card"><b>Formation d’équipes</b><span>Des ateliers pratiques pour tes équipes.</span></div></div>';
      var body = [
        '<section class="dm-hero2"><div><small>ACCOMPAGNEMENT D’ENTREPRISES LOCALES</small><h3>Votre partenaire de confiance pour grandir.</h3><p>Stratégie, gestion et développement : nous aidons les entreprises locales à passer au niveau supérieur.</p><div class="dm-row"><a data-go="3" class="dm-btn dark">Demander un devis</a><a data-go="1" class="dm-btn ghost">Nos services</a></div></div><div class="dm-visual"><div class="dm-chart"><small>Croissance</small><div><i style="height:30%"></i><i style="height:48%"></i><i style="height:66%"></i><i style="height:92%"></i></div></div></div></section><section class="dm-sec">' + cards + "</section>",
        '<section class="dm-sec"><h3 class="dm-h">Nos services</h3><div class="dm-list"><div class="dm-item"><span class="dm-ico">📈</span><div><b>Conseil stratégique</b><p>Diagnostic, plan d’action et accompagnement dans la durée.</p></div></div><div class="dm-item"><span class="dm-ico">💼</span><div><b>Finance et gestion</b><p>Budgets, suivi de trésorerie et tableaux de bord clairs.</p></div></div><div class="dm-item"><span class="dm-ico">🎓</span><div><b>Formation d’équipes</b><p>Ateliers pratiques sur site ou à distance.</p></div></div></div></section>',
        '<section class="dm-sec"><h3 class="dm-h">À propos de SahelConseil</h3><p class="dm-p">Un cabinet de proximité qui accompagne les entrepreneurs locaux avec des conseils concrets et un suivi régulier.</p><div class="dm-cards3"><div class="dm-card center"><b class="big">10+</b><span>années d’expérience</span></div><div class="dm-card center"><b class="big">120</b><span>entreprises accompagnées</span></div><div class="dm-card center"><b class="big">98 %</b><span>clients satisfaits</span></div></div></section>',
        '<section class="dm-sec dm-two"><div><h3 class="dm-h">Parlons de ton projet</h3><p class="dm-p">Réponse sous 24 h.</p><ul class="dm-ul"><li>📞 77 000 00 00</li><li>✉️ contact@sahel-conseil.sn</li><li>📍 Dakar, Plateau</li></ul></div><form class="dm-form" onsubmit="return false"><input placeholder="Ton nom"><input placeholder="E-mail"><textarea placeholder="Ton message"></textarea><a class="dm-btn dark">Envoyer</a></form></section>'
      ][i];
      return head + body;
    } };

  M["portfolio-creatif"] = { type: "site", url: "www.mariama-studio.com", stage: "linear-gradient(135deg,#3a2a7a,#1a1040)", pages: ["Projets", "À propos", "Services", "Contact"],
    html: function (i) {
      var head = '<header class="dm-top"><b class="dm-logo">MARIAMA.STUDIO</b><nav class="dm-nav">' + nav(["Projets", "À propos", "Services", "Contact"]) + "</nav></header>";
      var body = [
        '<section class="dm-sec"><small class="dm-eyebrow">DESIGNER GRAPHIQUE & DIRECTRICE ARTISTIQUE</small><h3 class="dm-big">Des idées qui prennent <em>forme.</em></h3><div class="dm-masonry">' + tiles([["Identité visuelle", "#a07cf7", "#6d3fe0"], ["Affiche", "#f472b6", "#c026d3"], ["Logo", "#38bdf8", "#2563eb"], ["Packaging", "#fbbf24", "#f97316"], ["Application", "#34d399", "#059669"]]) + "</div></section>",
        '<section class="dm-sec dm-two"><div class="dm-avatar">M</div><div><h3 class="dm-h">Mariama, designer à Dakar</h3><p class="dm-p">Je crée des identités visuelles, des affiches et des interfaces qui racontent l’histoire de ta marque.</p><div class="dm-chips"><span>Branding</span><span>Affiches</span><span>UI/UX</span><span>Illustration</span></div></div></section>',
        '<section class="dm-sec"><h3 class="dm-h">Services</h3><div class="dm-cards3"><div class="dm-card"><b>Identité visuelle</b><span>Logo, couleurs, typographies.</span></div><div class="dm-card"><b>Affiches & print</b><span>Flyers, cartes, supports imprimés.</span></div><div class="dm-card"><b>Réseaux sociaux</b><span>Visuels et templates cohérents.</span></div></div></section>',
        '<section class="dm-sec dm-two"><div><h3 class="dm-h">Travaillons ensemble</h3><p class="dm-p">Raconte-moi ton projet.</p><ul class="dm-ul"><li>✉️ hello@mariama.studio</li><li>📍 Dakar</li></ul></div><form class="dm-form" onsubmit="return false"><input placeholder="Ton nom"><input placeholder="E-mail"><textarea placeholder="Ton projet"></textarea><a class="dm-btn">Envoyer</a></form></section>'
      ][i];
      return head + body;
    } };

  var MENU = [["Thiéboudienne", "Riz au poisson, légumes", "3 500"], ["Yassa poulet", "Oignons, citron, riz blanc", "3 000"], ["Mafé bœuf", "Sauce arachide, riz", "3 000"], ["Pastels maison", "Six pièces, sauce pimentée", "1 500"], ["Jus de bissap", "Fait maison, 50 cl", "500"]];
  function menuRows(a) { return a.map(function (m) { return '<div class="dm-mrow"><div><b>' + m[0] + "</b><span>" + m[1] + "</span></div><em>" + m[2] + " FCFA</em></div>"; }).join(""); }
  M["restaurant-menu"] = { type: "site", url: "www.chezfatou.sn", stage: "linear-gradient(135deg,#fbd9a8,#f3b98a)", pages: ["Accueil", "Menu", "Horaires", "Réserver"],
    html: function (i) {
      var head = '<header class="dm-top"><b class="dm-logo">Chez Fatou</b><nav class="dm-nav">' + nav(["Accueil", "Menu", "Horaires", "Réserver"]) + "</nav></header>";
      var body = [
        '<section class="dm-split"><div class="dm-l"><small>CUISINE SÉNÉGALAISE</small><h3>Le goût de la maison, servi chaud.</h3><p>Plats traditionnels préparés chaque jour avec des produits frais.</p><a data-go="3" class="dm-btn light">Réserver une table</a><p class="dm-hrs">Lundi – Samedi : 11h – 22h<br>Dimanche : 12h – 20h</p></div><div class="dm-r"><h4>Notre menu</h4>' + menuRows(MENU) + "</div></section>",
        '<section class="dm-sec"><h3 class="dm-h">Notre menu</h3><h4 class="dm-sub">Plats</h4>' + menuRows(MENU.slice(0, 3)) + '<h4 class="dm-sub">Entrées & boissons</h4>' + menuRows(MENU.slice(3)) + '<h4 class="dm-sub">Desserts</h4>' + menuRows([["Thiakry", "Lait caillé, couscous de mil", "1 000"], ["Salade de fruits", "Fruits de saison", "1 200"]]) + "</section>",
        '<section class="dm-sec dm-two"><div><h3 class="dm-h">Horaires</h3><div class="dm-mrow"><div><b>Lundi – Samedi</b></div><em>11h – 22h</em></div><div class="dm-mrow"><div><b>Dimanche</b></div><em>12h – 20h</em></div></div><div><h3 class="dm-h">Adresse</h3><p class="dm-p">Médina, Dakar<br>77 000 00 00</p><div class="dm-map">📍</div></div></section>',
        '<section class="dm-sec"><h3 class="dm-h">Réserver une table</h3><form class="dm-form" onsubmit="return false"><input placeholder="Ton nom"><div class="dm-row2"><input placeholder="Date"><input placeholder="Heure"></div><input placeholder="Nombre de personnes"><a class="dm-btn">Confirmer la réservation</a></form></section>'
      ][i];
      return head + body;
    } };

  var PROD = [["Robe wax", "12 500", "#ec4899", "#be185d", "f"], ["Chemise lin", "9 000", "#3b82f6", "#1d4ed8", "h"], ["Sac cuir", "18 000", "#f59e0b", "#d97706", "f"], ["Sandales", "7 500", "#10b981", "#047857", "f"], ["Boubou brodé", "25 000", "#8b5cf6", "#6d28d9", "h"], ["Casquette", "3 500", "#f97316", "#c2410c", "h"]];
  function prods(a) { return '<div class="dm-prods">' + a.map(function (p) { return '<div class="dm-prod"><div class="dm-pimg" style="background:linear-gradient(135deg,' + p[2] + ',' + p[3] + ')"></div><b>' + p[0] + '</b><div class="dm-prow"><span>' + p[1] + ' FCFA</span><a class="dm-mini" data-add>Commander</a></div></div>'; }).join("") + "</div>"; }
  M["boutique-catalogue"] = { type: "site", url: "www.boutique-teranga.com", stage: "linear-gradient(135deg,#cfe4f6,#e4eef8)", pages: ["Nouveautés", "Femme", "Homme", "Panier"],
    html: function (i) {
      var head = '<header class="dm-top"><b class="dm-logo">TerangaShop</b><input class="dm-search" placeholder="Rechercher un article…"><nav class="dm-nav">' + nav(["Nouveautés", "Femme", "Homme"]) + '</nav><a data-go="3" class="dm-btn dark">Panier (2)</a></header>';
      var body = [
        '<section class="dm-sec"><h3 class="dm-h">Nouveautés de la semaine</h3><p class="dm-p">Livraison à Dakar et dans tout le pays.</p>' + prods(PROD) + "</section>",
        '<section class="dm-sec"><h3 class="dm-h">Femme</h3>' + prods(PROD.filter(function (p) { return p[4] === "f"; })) + "</section>",
        '<section class="dm-sec"><h3 class="dm-h">Homme</h3>' + prods(PROD.filter(function (p) { return p[4] === "h"; })) + "</section>",
        '<section class="dm-sec"><h3 class="dm-h">Mon panier</h3><div class="dm-mrow"><div><b>Robe wax</b><span>Quantité : 1</span></div><em>12 500 FCFA</em></div><div class="dm-mrow"><div><b>Sac cuir</b><span>Quantité : 1</span></div><em>18 000 FCFA</em></div><div class="dm-mrow total"><div><b>Total</b></div><em>30 500 FCFA</em></div><a class="dm-btn dark wide">Passer la commande</a></section>'
      ][i];
      return head + body;
    } };

  /* ---------- APPLICATIONS ---------- */
  function app(brand, items, icons, body) {
    return '<div class="dm-shell"><aside class="dm-side"><b class="dm-logo">' + brand + "</b>" + items.map(function (t, i) { return '<a data-go="' + i + '" class="dm-sl"><span>' + icons[i] + "</span>" + t + "</a>"; }).join("") + '</aside><div class="dm-main">' + body + '</div><nav class="dm-bottom">' + items.map(function (t, i) { return '<a data-go="' + i + '" class="dm-bl"><span>' + icons[i] + "</span>" + t.split(" ")[0] + "</a>"; }).join("") + "</nav></div>";
  }
  var STK = [["Riz parfumé 25 kg", "RZ-025", 142, 88, "#12b5a0"], ["Huile 5 L", "HU-005", 38, 40, "#f59e0b"], ["Sucre 50 kg", "SU-050", 9, 12, "#ef4444"], ["Lait en poudre", "LA-400", 210, 92, "#12b5a0"], ["Savon (carton)", "SV-012", 64, 55, "#12b5a0"]];
  M["gestion-de-stock"] = { type: "app", stage: "linear-gradient(135deg,#d6e2ee,#c9d9e8)", pages: ["Tableau de bord", "Produits", "Mouvements", "Alertes"], cls: "stock",
    html: function (i) {
      var rows = STK.map(function (s) { return '<div class="dm-trow"><div><b>' + s[0] + "</b><span>" + s[1] + "</span></div><b>" + s[2] + "</b>" + bar(s[3], s[4]) + "</div>"; }).join("");
      var b = [
        '<h3 class="dm-h">Tableau de bord</h3><div class="dm-kpis"><div class="dm-kpi"><span>Produits en stock</span><b>1 248</b></div><div class="dm-kpi"><span>Valeur du stock</span><b>4,8 M <small>FCFA</small></b></div><div class="dm-kpi warn"><span>Stock bas</span><b>7 alertes</b></div></div><div class="dm-panel"><h4>Niveau de stock</h4>' + rows + "</div>",
        '<h3 class="dm-h">Produits</h3><input class="dm-search" placeholder="Rechercher un produit…"><div class="dm-panel">' + rows + '</div><a class="dm-btn">+ Nouveau produit</a>',
        '<h3 class="dm-h">Mouvements</h3><div class="dm-panel"><div class="dm-mrow"><div><b>Entrée · Riz parfumé 25 kg</b><span>Aujourd’hui · Fournisseur Sadio</span></div><em class="pos">+ 40</em></div><div class="dm-mrow"><div><b>Sortie · Huile 5 L</b><span>Hier · Vente comptoir</span></div><em class="neg">− 12</em></div><div class="dm-mrow"><div><b>Sortie · Sucre 50 kg</b><span>Hier · Commande #218</span></div><em class="neg">− 6</em></div><div class="dm-mrow"><div><b>Entrée · Savon (carton)</b><span>Lun. · Fournisseur Ba</span></div><em class="pos">+ 24</em></div></div>',
        '<h3 class="dm-h">Alertes de stock</h3><div class="dm-panel"><div class="dm-mrow"><div><b>Sucre 50 kg</b><span>9 restants · seuil 20</span></div><a class="dm-mini">Réapprovisionner</a></div><div class="dm-mrow"><div><b>Huile 5 L</b><span>38 restants · seuil 40</span></div><a class="dm-mini">Réapprovisionner</a></div></div>'
      ][i];
      return app("StockPro", this.pages, ["📊", "📦", "🔁", "⚠️"], b);
    } };

  var DAYS = "";
  for (var d = 1; d <= 30; d++) DAYS += '<a class="dm-day' + (d === 17 ? " sel" : "") + '" data-grp="day">' + d + "</a>";
  M["rendez-vous-reservations"] = { type: "app", stage: "linear-gradient(135deg,#f9d6ee,#e9d5fb)", pages: ["Réserver", "Confirmation", "Mes rendez-vous", "Profil"], cls: "booking",
    html: function (i) {
      var slots = ["09:00", "10:30", "11:30", "14:00", "15:30", "17:00"].map(function (t) { return '<a class="dm-slot' + (t === "10:30" ? " sel" : "") + '" data-grp="slot">' + t + "</a>"; }).join("");
      var b = [
        '<small class="dm-eyebrow">SALON BELLA</small><h3 class="dm-h">Choisis ta date</h3><div class="dm-panel"><div class="dm-cal-h"><b>Novembre 2026</b></div><div class="dm-cal">' + ["L", "M", "M", "J", "V", "S", "D"].map(function (x) { return "<small>" + x + "</small>"; }).join("") + DAYS + '</div></div><div class="dm-slots">' + slots + '</div><a data-go="1" class="dm-btn wide">Continuer</a>',
        '<div class="dm-confirm"><div class="dm-check">✓</div><h3 class="dm-h">Rendez-vous confirmé</h3><p class="dm-p">Un rappel te sera envoyé la veille.</p><div class="dm-panel left"><small>SERVICE</small><b>Coiffure & soins</b><small>DATE</small><b>Mardi 17 novembre · 10:30</b><small>LIEU</small><b>Dakar, Plateau</b></div></div>',
        '<h3 class="dm-h">Mes rendez-vous</h3><div class="dm-panel"><div class="dm-mrow"><div><b>Coiffure & soins</b><span>Mar. 17 nov. · 10:30</span></div><em class="pos">À venir</em></div><div class="dm-mrow"><div><b>Manucure</b><span>Sam. 25 oct. · 15:00</span></div><em>Terminé</em></div><div class="dm-mrow"><div><b>Massage</b><span>Jeu. 9 oct. · 11:00</span></div><em>Terminé</em></div></div>',
        '<div class="dm-profile"><div class="dm-avatar">AD</div><h3 class="dm-h">Awa Diop</h3><p class="dm-p">77 000 00 00</p></div><div class="dm-panel"><div class="dm-mrow"><div><b>Points fidélité</b><span>Prochaine remise à 500 points</span></div><em class="pos">320</em></div><div class="dm-mrow"><div><b>Notifications</b><span>Rappels de rendez-vous</span></div><em class="pos">Activées</em></div></div>'
      ][i];
      return app("Bella", this.pages, ["📅", "✅", "🗓️", "👤"], b);
    } };

  var CLI = [["Awa Diop", "Boutique Awa", "#ec4899", "AD"], ["Moussa Sy", "Sy Transport", "#3b82f6", "MS"], ["Fatou Ndiaye", "Salon Fatou", "#10b981", "FN"], ["Ibrahima Ba", "Ba Électro", "#f59e0b", "IB"], ["Khady Sarr", "Sarr & Fils", "#8b5cf6", "KS"]];
  M["suivi-des-clients"] = { type: "app", stage: "linear-gradient(135deg,#dfe3fb,#e6e8f7)", pages: ["Clients", "Fiche client", "Relances", "Statistiques"], cls: "crm",
    html: function (i) {
      var list = CLI.map(function (c, k) { return '<a data-go="1" class="dm-crow' + (k === 0 ? " sel" : "") + '"><span class="dm-av" style="background:' + c[2] + '">' + c[3] + "</span><div><b>" + c[0] + "</b><span>" + c[1] + "</span></div></a>"; }).join("");
      var fiche = '<div class="dm-fh"><span class="dm-av big" style="background:#ec4899">AD</span><div><h3 class="dm-h">Awa Diop</h3><span class="dm-p">Boutique Awa · Dakar · 77 000 00 00</span></div><em class="pos">Client actif</em></div><div class="dm-kpis"><div class="dm-kpi"><span>Projets</span><b>3</b></div><div class="dm-kpi"><span>Chiffre d’affaires</span><b>185 000 F</b></div><div class="dm-kpi"><span>Prochaine relance</span><b>Lundi</b></div></div><div class="dm-panel"><h4>Historique</h4><div class="dm-tl"><i></i><div><b>Devis envoyé — Site vitrine</b><span>Il y a 2 jours</span></div></div><div class="dm-tl"><i></i><div><b>Appel de suivi</b><span>Il y a 5 jours</span></div></div><div class="dm-tl"><i></i><div><b>Premier contact</b><span>Il y a 2 semaines</span></div></div></div>';
      var b = [
        '<h3 class="dm-h">Clients</h3><div class="dm-crm"><div><input class="dm-search" placeholder="Rechercher…"><div class="dm-panel">' + list + '</div><a class="dm-btn">+ Ajouter</a></div><div class="dm-detail">' + fiche + "</div></div>",
        fiche,
        '<h3 class="dm-h">Relances</h3><div class="dm-panel"><label class="dm-check2"><input type="checkbox" checked><span>Rappeler Awa Diop · Lundi</span></label><label class="dm-check2"><input type="checkbox"><span>Envoyer devis à Moussa Sy</span></label><label class="dm-check2"><input type="checkbox"><span>Relance facture Fatou Ndiaye</span></label><label class="dm-check2"><input type="checkbox"><span>Proposer un abonnement à Ba Électro</span></label></div>',
        '<h3 class="dm-h">Statistiques</h3><div class="dm-kpis"><div class="dm-kpi"><span>Clients</span><b>48</b></div><div class="dm-kpi"><span>Nouveaux ce mois</span><b>+6</b></div><div class="dm-kpi"><span>CA du mois</span><b>1,2 M F</b></div></div><div class="dm-panel"><h4>Nouveaux clients</h4><div class="dm-chart2"><i style="height:35%"></i><i style="height:50%"></i><i style="height:42%"></i><i style="height:70%"></i><i style="height:60%"></i><i style="height:88%"></i></div></div>'
      ][i];
      return app("Clients", this.pages, ["👥", "🧾", "⏰", "📈"], b);
    } };

  var FOOD = [["Burger maison", "2 500", "#f59e0b"], ["Pizza royale", "4 000", "#ef4444"], ["Salade fraîcheur", "2 000", "#10b981"], ["Jus de gingembre", "800", "#fb923c"]];
  M["commande-en-ligne"] = { type: "app", stage: "linear-gradient(135deg,#fde7b0,#f8c98a)", pages: ["Menu", "Panier", "Suivi", "Profil"], cls: "food",
    html: function (i) {
      var items = FOOD.map(function (f) { return '<div class="dm-frow"><span class="dm-fimg" style="background:' + f[2] + '"></span><div><b>' + f[0] + "</b><span>" + f[1] + ' FCFA</span></div><a class="dm-plus" data-add>+</a></div>'; }).join("");
      var b = [
        '<small class="dm-eyebrow">LIVRAISON À · Dakar, Almadies</small><h3 class="dm-h">Que veux-tu manger ?</h3><div class="dm-chips"><span class="on">Populaires</span><span>Plats</span><span>Boissons</span></div>' + items + '<a data-go="1" class="dm-btn wide">Voir le panier (2)</a>',
        '<h3 class="dm-h">Mon panier</h3><div class="dm-panel"><div class="dm-mrow"><div><b>1 × Burger maison</b></div><em>2 500 F</em></div><div class="dm-mrow"><div><b>1 × Pizza royale</b></div><em>4 000 F</em></div><div class="dm-mrow"><div><b>Livraison</b></div><em>500 F</em></div><div class="dm-mrow total"><div><b>Total</b></div><em>7 000 F</em></div></div><p class="dm-p">Paiement à la livraison ou mobile money.</p><a data-go="2" class="dm-btn wide">Valider la commande</a>',
        '<h3 class="dm-h">Suivi de commande</h3><div class="dm-panel"><div class="dm-step done"><i>✓</i><div><b>Commande reçue</b><span>12:04</span></div></div><div class="dm-step done"><i>✓</i><div><b>En préparation</b><span>12:08</span></div></div><div class="dm-step now"><i>●</i><div><b>En livraison</b><span>Arrivée estimée 12:35</span></div></div><div class="dm-step"><i></i><div><b>Livrée</b></div></div></div>',
        '<div class="dm-profile"><div class="dm-avatar">AD</div><h3 class="dm-h">Awa Diop</h3></div><div class="dm-panel"><div class="dm-mrow"><div><b>Adresse</b><span>Almadies, Dakar</span></div></div><div class="dm-mrow"><div><b>Paiement</b><span>Wave · Orange Money</span></div></div><div class="dm-mrow"><div><b>Commandes</b><span>14 commandes passées</span></div></div></div>'
      ][i];
      return app("Livraison", this.pages, ["🍔", "🛒", "🛵", "👤"], b);
    } };

  /* ---------- SANTÉ ET MÉDECINE ---------- */
  function docRows(a) { return a.map(function (d) { return '<div class="dm-crow"><span class="dm-av" style="background:' + d[2] + '">' + d[3] + '</span><div><b>' + d[0] + '</b><span>' + d[1] + '</span></div><a class="dm-mini" data-go="3">Réserver</a></div>'; }).join(""); }
  var DOCS = [["Dr Awa Ndiaye", "Médecine générale", "#0f9d8a", "AN"], ["Dr Moussa Fall", "Pédiatrie", "#2f80ed", "MF"], ["Dr Khady Sow", "Gynécologie", "#e0589a", "KS"]];
  M["cabinet-medical"] = { type: "site", url: "www.cabinet-medical-sante.sn", stage: "linear-gradient(135deg,#d3f1ee,#e4f4f9)", pages: ["Accueil", "Soins", "Équipe", "Rendez-vous"],
    html: function (i) {
      var head = '<header class="dm-top"><b class="dm-logo">✚ Cabinet <em>Santé+</em></b><nav class="dm-nav">' + nav(["Accueil", "Soins", "Équipe", "Rendez-vous"]) + '</nav><a data-go="3" class="dm-btn">Prendre rendez-vous</a></header>';
      var body = [
        '<section class="dm-hero2"><div><small>MÉDECINE GÉNÉRALE · DAKAR</small><h3>Votre santé, notre priorité au quotidien.</h3><p>Consultations sur rendez-vous, suivi des familles et urgences du jour.</p><div class="dm-row"><a data-go="3" class="dm-btn dark">Prendre rendez-vous</a><a data-go="1" class="dm-btn ghost">Nos soins</a></div></div><div class="dm-visual med"><div class="dm-chart"><small>Prochain créneau</small><b style="display:block;font:800 1.2rem Sora,sans-serif;margin-top:4px">Aujourd’hui · 16h30</b></div></div></section><section class="dm-sec"><div class="dm-cards3"><div class="dm-card"><b>🩺 Consultation</b><span>Médecine générale et suivi.</span></div><div class="dm-card"><b>💉 Vaccination</b><span>Enfants et adultes.</span></div><div class="dm-card"><b>🧪 Bilans</b><span>Analyses et dépistages.</span></div></div></section>',
        '<section class="dm-sec"><h3 class="dm-h">Nos soins</h3><div class="dm-list"><div class="dm-item"><span class="dm-ico">🩺</span><div><b>Consultation générale</b><p>Diagnostic, prescription et suivi médical.</p></div></div><div class="dm-item"><span class="dm-ico">👶</span><div><b>Pédiatrie</b><p>Suivi de croissance et vaccinations des enfants.</p></div></div><div class="dm-item"><span class="dm-ico">🫀</span><div><b>Bilan de santé</b><p>Tension, glycémie et examens de contrôle.</p></div></div></div></section>',
        '<section class="dm-sec"><h3 class="dm-h">Notre équipe</h3><div class="dm-panel">' + docRows(DOCS) + "</div></section>",
        '<section class="dm-sec dm-two"><div><h3 class="dm-h">Prendre rendez-vous</h3><p class="dm-p">Réponse rapide par téléphone ou message.</p><ul class="dm-ul"><li>📞 77 000 00 00</li><li>📍 Dakar, Point E</li><li>🕘 Lun–Ven : 8h – 18h · Sam : 8h – 13h</li></ul></div><form class="dm-form" onsubmit="return false"><input placeholder="Ton nom"><input placeholder="Téléphone"><div class="dm-row2"><input placeholder="Date"><input placeholder="Heure"></div><a class="dm-btn">Confirmer</a></form></section>'
      ][i];
      return head + body;
    } };

  M["site-de-clinique"] = { type: "site", url: "www.clinique-du-plateau.sn", stage: "linear-gradient(135deg,#d6e6fb,#e8f0fb)", pages: ["Accueil", "Spécialités", "Urgences", "Contact"],
    html: function (i) {
      var head = '<header class="dm-top"><b class="dm-logo">Clinique <em>du Plateau</em></b><nav class="dm-nav">' + nav(["Accueil", "Spécialités", "Urgences", "Contact"]) + '</nav><a data-go="2" class="dm-btn">Urgences 24h/24</a></header>';
      var body = [
        '<section class="dm-hero2"><div><small>CLINIQUE PRIVÉE · DAKAR</small><h3>Des soins de qualité, une équipe à votre écoute.</h3><p>Hospitalisation, maternité, imagerie et consultations de spécialistes.</p><div class="dm-row"><a data-go="1" class="dm-btn dark">Nos spécialités</a><a data-go="3" class="dm-btn ghost">Nous contacter</a></div></div><div class="dm-visual blue"><div class="dm-chart"><small>Prise en charge</small><b style="display:block;font:800 1.2rem Sora,sans-serif;margin-top:4px">24h/24 · 7j/7</b></div></div></section><section class="dm-sec"><div class="dm-cards3"><div class="dm-card center"><b class="big">12</b><span>spécialités</span></div><div class="dm-card center"><b class="big">40</b><span>lits</span></div><div class="dm-card center"><b class="big">24/7</b><span>urgences</span></div></div></section>',
        '<section class="dm-sec"><h3 class="dm-h">Spécialités</h3><div class="dm-cards3"><div class="dm-card"><b>❤️ Cardiologie</b><span>Bilans et suivi cardiaque.</span></div><div class="dm-card"><b>🤰 Maternité</b><span>Suivi de grossesse et accouchement.</span></div><div class="dm-card"><b>🦴 Orthopédie</b><span>Traumatologie et rééducation.</span></div><div class="dm-card"><b>🩻 Imagerie</b><span>Radiologie et échographie.</span></div><div class="dm-card"><b>🧪 Laboratoire</b><span>Analyses médicales.</span></div><div class="dm-card"><b>👶 Pédiatrie</b><span>Soins des enfants.</span></div></div></section>',
        '<section class="dm-sec"><div class="dm-alert">🚑 Urgences ouvertes 24h/24 — Appelez le <b>77 000 00 00</b></div><h3 class="dm-h" style="margin-top:14px">Que faire en cas d’urgence ?</h3><div class="dm-list"><div class="dm-item"><span class="dm-ico">1</span><div><b>Appelez le service d’urgence</b><p>Décrivez la situation et l’état du patient.</p></div></div><div class="dm-item"><span class="dm-ico">2</span><div><b>Rendez-vous à l’accueil</b><p>Entrée des urgences, rue du Plateau.</p></div></div></div></section>',
        '<section class="dm-sec dm-two"><div><h3 class="dm-h">Nous contacter</h3><ul class="dm-ul"><li>📞 77 000 00 00</li><li>✉️ contact@clinique-plateau.sn</li><li>📍 Dakar, Plateau</li></ul></div><form class="dm-form" onsubmit="return false"><input placeholder="Ton nom"><input placeholder="Téléphone"><textarea placeholder="Ton message"></textarea><a class="dm-btn">Envoyer</a></form></section>'
      ][i];
      return head + body;
    } };

  M["centre-dentaire"] = { type: "site", url: "www.sourire-dentaire.sn", stage: "linear-gradient(135deg,#d8f5ef,#e7f6fb)", pages: ["Accueil", "Soins", "Tarifs", "Rendez-vous"],
    html: function (i) {
      var head = '<header class="dm-top"><b class="dm-logo">😁 Sourire <em>Dentaire</em></b><nav class="dm-nav">' + nav(["Accueil", "Soins", "Tarifs", "Rendez-vous"]) + '</nav><a data-go="3" class="dm-btn">Réserver</a></header>';
      var body = [
        '<section class="dm-hero2"><div><small>CENTRE DENTAIRE · DAKAR</small><h3>Un sourire sain, des soins sans stress.</h3><p>Détartrage, soins, blanchiment et orthodontie dans un cabinet moderne.</p><div class="dm-row"><a data-go="3" class="dm-btn dark">Prendre rendez-vous</a><a data-go="2" class="dm-btn ghost">Voir les tarifs</a></div></div><div class="dm-visual mint"><div class="dm-chart"><small>Premier rendez-vous</small><b style="display:block;font:800 1.2rem Sora,sans-serif;margin-top:4px">Bilan offert</b></div></div></section><section class="dm-sec"><div class="dm-cards3"><div class="dm-card"><b>🦷 Soins courants</b><span>Caries, détartrage.</span></div><div class="dm-card"><b>✨ Blanchiment</b><span>Un sourire éclatant.</span></div><div class="dm-card"><b>😬 Orthodontie</b><span>Alignement des dents.</span></div></div></section>',
        '<section class="dm-sec"><h3 class="dm-h">Nos soins</h3><div class="dm-list"><div class="dm-item"><span class="dm-ico">🦷</span><div><b>Soins et détartrage</b><p>Prévention et traitement des caries.</p></div></div><div class="dm-item"><span class="dm-ico">✨</span><div><b>Blanchiment</b><p>Séance en cabinet, résultat visible.</p></div></div><div class="dm-item"><span class="dm-ico">😬</span><div><b>Orthodontie</b><p>Appareils pour enfants et adultes.</p></div></div></div></section>',
        '<section class="dm-sec"><h3 class="dm-h">Tarifs indicatifs</h3><div class="dm-panel"><div class="dm-mrow"><div><b>Consultation</b></div><em>10 000 FCFA</em></div><div class="dm-mrow"><div><b>Détartrage</b></div><em>25 000 FCFA</em></div><div class="dm-mrow"><div><b>Soin de carie</b></div><em>à partir de 20 000 FCFA</em></div><div class="dm-mrow"><div><b>Blanchiment</b></div><em>80 000 FCFA</em></div></div><p class="dm-p">Tarifs donnés à titre d’exemple.</p></section>',
        '<section class="dm-sec"><h3 class="dm-h">Réserver un créneau</h3><form class="dm-form" onsubmit="return false"><input placeholder="Ton nom"><input placeholder="Téléphone"><div class="dm-row2"><input placeholder="Date"><input placeholder="Motif (soin, contrôle…)"></div><a class="dm-btn">Confirmer le rendez-vous</a></form></section>'
      ][i];
      return head + body;
    } };

  /* Applications santé */
  M["rdv-patient"] = { type: "app", stage: "linear-gradient(135deg,#d6ecfb,#dff3ee)", pages: ["Accueil", "Médecins", "Mes rendez-vous", "Profil"], cls: "med1",
    html: function (i) {
      var b = [
        '<small class="dm-eyebrow">BONJOUR AWA 👋</small><h3 class="dm-h">Comment vas-tu aujourd’hui ?</h3><div class="dm-panel"><small class="dm-eyebrow">PROCHAIN RENDEZ-VOUS</small><b>Dr Awa Ndiaye · Médecine générale</b><p class="dm-p" style="margin:2px 0 0">Jeudi 19 nov. · 10:30</p></div><div class="dm-kpis"><div class="dm-kpi"><span>Ordonnances</span><b>2</b></div><div class="dm-kpi"><span>Rappels</span><b>1</b></div><div class="dm-kpi"><span>Résultats</span><b>3</b></div></div><a data-go="1" class="dm-btn wide">Prendre un rendez-vous</a>',
        '<h3 class="dm-h">Trouver un médecin</h3><input class="dm-search" placeholder="Spécialité ou nom…"><div class="dm-chips"><span class="on">Tous</span><span>Généraliste</span><span>Pédiatre</span></div><div class="dm-panel">' + docRows(DOCS) + "</div>",
        '<h3 class="dm-h">Mes rendez-vous</h3><div class="dm-panel"><div class="dm-mrow"><div><b>Dr Awa Ndiaye</b><span>Jeu. 19 nov. · 10:30</span></div><em class="pos">À venir</em></div><div class="dm-mrow"><div><b>Dr Moussa Fall</b><span>Lun. 2 nov. · 09:00</span></div><em>Terminé</em></div><div class="dm-mrow"><div><b>Analyse sanguine</b><span>Ven. 23 oct. · 08:00</span></div><em>Terminé</em></div></div>',
        '<div class="dm-profile"><div class="dm-avatar">AD</div><h3 class="dm-h">Awa Diop</h3><p class="dm-p">Patiente depuis 2024</p></div><div class="dm-panel"><div class="dm-mrow"><div><b>Rappels de rendez-vous</b><span>SMS la veille</span></div><em class="pos">Activés</em></div><div class="dm-mrow"><div><b>Dossier médical</b><span>Partagé avec ton médecin</span></div><em class="pos">Oui</em></div></div>'
      ][i];
      return app("Santé+", this.pages, ["🏠", "🩺", "📅", "👤"], b);
    } };

  M["dossier-patient"] = { type: "app", stage: "linear-gradient(135deg,#d7f0ee,#e3eefb)", pages: ["Patients", "Dossier", "Consultations", "Rappels"], cls: "med2",
    html: function (i) {
      var PA = [["Awa Diop", "34 ans · Dernier RDV 2 nov.", "#0f9d8a", "AD"], ["Moussa Sy", "52 ans · Dernier RDV 28 oct.", "#2f80ed", "MS"], ["Fatou Ndiaye", "29 ans · Dernier RDV 15 oct.", "#e0589a", "FN"], ["Ibrahima Ba", "61 ans · Dernier RDV 9 oct.", "#f59e0b", "IB"]];
      var list = PA.map(function (c, k) { return '<a data-go="1" class="dm-crow' + (k === 0 ? " sel" : "") + '"><span class="dm-av" style="background:' + c[2] + '">' + c[3] + "</span><div><b>" + c[0] + "</b><span>" + c[1] + "</span></div></a>"; }).join("");
      var fiche = '<div class="dm-fh"><span class="dm-av big" style="background:#0f9d8a">AD</span><div><h3 class="dm-h">Awa Diop</h3><span class="dm-p">34 ans · Groupe sanguin O+</span></div><em class="pos">Suivi régulier</em></div><div class="dm-kpis"><div class="dm-kpi"><span>Tension</span><b>12/8</b></div><div class="dm-kpi"><span>Poids</span><b>62 kg</b></div><div class="dm-kpi"><span>Prochain RDV</span><b>19 nov.</b></div></div><div class="dm-panel"><h4>Dernières consultations</h4><div class="dm-tl"><i></i><div><b>Contrôle annuel</b><span>2 nov. 2026</span></div></div><div class="dm-tl"><i></i><div><b>Vaccin grippe</b><span>15 sept. 2026</span></div></div></div>';
      var b = [
        '<h3 class="dm-h">Patients</h3><div class="dm-crm"><div><input class="dm-search" placeholder="Rechercher un patient…"><div class="dm-panel">' + list + '</div><a class="dm-btn">+ Nouveau patient</a></div><div class="dm-detail">' + fiche + "</div></div>",
        fiche,
        '<h3 class="dm-h">Consultations</h3><div class="dm-panel"><div class="dm-mrow"><div><b>Awa Diop · Contrôle annuel</b><span>Aujourd’hui · 09:00</span></div><em class="pos">Terminée</em></div><div class="dm-mrow"><div><b>Moussa Sy · Hypertension</b><span>Aujourd’hui · 10:30</span></div><em class="pos">En cours</em></div><div class="dm-mrow"><div><b>Fatou Ndiaye · Pédiatrie</b><span>Aujourd’hui · 11:15</span></div><em>À venir</em></div></div>',
        '<h3 class="dm-h">Rappels patients</h3><div class="dm-panel"><label class="dm-check2"><input type="checkbox" checked><span>Rappeler Awa Diop · RDV du 19 nov.</span></label><label class="dm-check2"><input type="checkbox"><span>Renouveler l’ordonnance de Moussa Sy</span></label><label class="dm-check2"><input type="checkbox"><span>Vaccin de rappel · Fatou Ndiaye</span></label></div>'
      ][i];
      return app("Dossiers", this.pages, ["👥", "📋", "🩺", "⏰"], b);
    } };

  M["pharmacie-ordonnance"] = { type: "app", stage: "linear-gradient(135deg,#dcf5e4,#e3f3f7)", pages: ["Ordonnance", "Médicaments", "Panier", "Suivi"], cls: "med3",
    html: function (i) {
      var MED = [["Paracétamol 500 mg", "Boîte de 16", "1 200", "#10b981"], ["Amoxicilline 1 g", "Boîte de 12", "3 500", "#3b82f6"], ["Vitamine C 1000", "Tube de 20", "2 800", "#f59e0b"], ["Sérum physiologique", "Boîte de 20", "1 500", "#8b5cf6"]];
      var meds = MED.map(function (f) { return '<div class="dm-frow"><span class="dm-fimg" style="background:' + f[3] + '"></span><div><b>' + f[0] + "</b><span>" + f[1] + " · " + f[2] + ' FCFA</span></div><a class="dm-plus" data-add>+</a></div>'; }).join("");
      var b = [
        '<small class="dm-eyebrow">PHARMACIE DU CENTRE</small><h3 class="dm-h">Envoie ton ordonnance</h3><div class="dm-panel dm-drop"><div style="font-size:2rem">📄</div><b>Photographier l’ordonnance</b><p class="dm-p" style="margin:0">Le pharmacien prépare ta commande.</p></div><a data-go="2" class="dm-btn wide">Envoyer à la pharmacie</a>',
        '<h3 class="dm-h">Médicaments</h3><input class="dm-search" placeholder="Rechercher un médicament…">' + meds,
        '<h3 class="dm-h">Mon panier</h3><div class="dm-panel"><div class="dm-mrow"><div><b>Paracétamol 500 mg</b><span>× 1</span></div><em>1 200 F</em></div><div class="dm-mrow"><div><b>Amoxicilline 1 g</b><span>× 1</span></div><em>3 500 F</em></div><div class="dm-mrow total"><div><b>Total</b></div><em>4 700 F</em></div></div><a data-go="3" class="dm-btn wide">Commander</a>',
        '<h3 class="dm-h">Suivi de commande</h3><div class="dm-panel"><div class="dm-step done"><i>✓</i><div><b>Ordonnance reçue</b><span>10:02</span></div></div><div class="dm-step done"><i>✓</i><div><b>Préparation</b><span>10:10</span></div></div><div class="dm-step now"><i>●</i><div><b>Prête à retirer</b><span>Retrait en pharmacie</span></div></div></div>'
      ][i];
      return app("Pharma", this.pages, ["📄", "💊", "🛒", "📦"], b);
    } };

  window.StromDemo = {
    get: function (key) { return M[key] || null; },
    devices: function (type) { return type === "app" ? [["phone", "📱 Téléphone"], ["tablet", "📲 Tablette"]] : [["desktop", "🖥️ Ordinateur"], ["phone", "📱 Mobile"]]; },
    /* Tailles logiques réelles (px) : le cadre est dessiné à cette taille puis réduit pour tenir dans la fenêtre. */
    size: function (device, portrait) { return device === "phone" ? [390, 844] : device === "tablet" ? (portrait ? [768, 1024] : [1024, 768]) : [1280, 800]; },
    render: function (key, i, device, portrait) {
      var m = M[key]; if (!m) return null;
      var sz = this.size(device, portrait);
      var frame = document.createElement("div"); frame.className = "dm-frame " + device + (device === "tablet" && portrait ? " portrait" : "");
      frame.style.width = sz[0] + "px"; frame.style.height = sz[1] + "px";
      if (m.type === "site" && device === "desktop") frame.innerHTML = '<div class="dm-chrome"><i></i><i></i><i></i><span>' + m.url + "</span></div>";
      var scr = document.createElement("div"); scr.className = "dm-screen";
      var dm = document.createElement("div"); dm.className = "dm dm-" + key + (m.cls ? " dm-app th-" + m.cls : " dm-site");
      dm.innerHTML = m.html(i); scr.appendChild(dm); frame.appendChild(scr);
      var wrap = document.createElement("div"); wrap.className = "dm-scale"; wrap.appendChild(frame); wrap._w = sz[0]; wrap._h = sz[1];
      return wrap;
    }
  };
})();
