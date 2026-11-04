/* Modèles prêts à personnaliser : sites Web et applications mobiles (Stromtech) */
(function () {
  var sv = function (a) { return a.map(function (x) { return { name: x[0], description: x[1] }; }); };
  var pr = function (a) { return a.map(function (x) { return { name: x[0], price: x[1], description: x[2] || "" }; }); };
  var tm = function (a) { return a.map(function (x) { return { quote: x[0], author: x[1] }; }); };

  var site = {
    restaurant: { label: "Restaurant", desc: "Menu, plats du jour, galerie et réservation.", tag: "Restauration", hero: "overlay", sections: ["about", "produits", "galerie", "temoignages", "contact"],
      preset: { icon: "🍽️", color: "#c2410c", theme: "light", font: "elegante", radius: "1", slogan: "Le goût authentique du Sénégal",
        content: { heroDescription: "Cuisine maison, ingrédients frais et ambiance chaleureuse au cœur de Dakar.", heroButton: "Réserver une table", aboutDescription: "Depuis 2015, nous préparons les plats traditionnels avec passion : thiéboudiène, yassa, mafé et grillades au feu de bois.", section_produits: "Notre menu", section_galerie: "L’ambiance", section_temoignages: "Ils nous font confiance" },
        productDetails: pr([["Thiéboudiène", "3 500 F", "Riz au poisson et légumes"], ["Yassa poulet", "3 000 F", "Oignons confits, citron"], ["Dibi grillé", "4 000 F", "Agneau grillé, oignons"], ["Jus de bissap", "1 000 F", "Fait maison"]]),
        testimonialDetails: tm([["Le meilleur thiéboudiène de la ville, service impeccable.", "Fatou D."], ["Cadre agréable et plats généreux. Je recommande.", "Moussa K."]]) } },
    salon: { label: "Salon de beauté", desc: "Prestations, tarifs, galerie et prise de rendez-vous.", tag: "Beauté", hero: "soft", sections: ["about", "services", "galerie", "tarifs", "contact"],
      preset: { icon: "💅", color: "#c0587a", theme: "light", font: "elegante", radius: "2", slogan: "Révélez votre beauté",
        content: { heroDescription: "Coiffure, soins et maquillage par des professionnelles passionnées.", heroButton: "Prendre rendez-vous", aboutDescription: "Un salon moderne et chaleureux où chaque cliente repart rayonnante.", section_services: "Nos prestations", section_tarifs: "Nos tarifs" },
        serviceDetails: sv([["Coiffure", "Tresses, tissage, coloration, brushing"], ["Maquillage", "Jour, soirée, mariée"], ["Soins & ongles", "Manucure, pédicure, soins du visage"]]),
        pricingDetails: pr([["Tresses", "à partir de 8 000 F"], ["Maquillage", "à partir de 10 000 F"], ["Pack mariée", "sur devis", "Coiffure + maquillage"]]) } },
    entreprise: { label: "Entreprise / Agence", desc: "Présenter une société, ses services et références.", tag: "Corporate", hero: "split", sections: ["about", "services", "temoignages", "contact"],
      preset: { icon: "🏢", color: "#2340ff", theme: "light", font: "affirmee", radius: "1", slogan: "Votre partenaire de croissance",
        content: { heroDescription: "Conseil, accompagnement et solutions sur mesure pour développer votre activité.", heroButton: "Demander un devis", aboutDescription: "Une équipe d’experts à votre écoute pour transformer vos idées en résultats concrets.", section_services: "Nos expertises" },
        serviceDetails: sv([["Conseil", "Stratégie et accompagnement"], ["Marketing", "Communication et visibilité"], ["Digital", "Sites Web et outils numériques"]]),
        testimonialDetails: tm([["Une équipe réactive et professionnelle.", "Directeur, SARL Teranga"], ["Résultats visibles dès les premières semaines.", "Responsable commerciale"]]) } },
    ecole: { label: "École / Formation", desc: "Filières, frais d’inscription et contact.", tag: "Éducation", hero: "split", sections: ["about", "services", "tarifs", "contact"],
      preset: { icon: "🎓", color: "#0f9d6b", theme: "light", font: "moderne", radius: "1", slogan: "Construisez votre avenir",
        content: { heroDescription: "Des formations professionnalisantes, des enseignants expérimentés et un suivi personnalisé.", heroButton: "S’inscrire", aboutDescription: "Un établissement tourné vers l’insertion professionnelle, avec des stages et des projets concrets.", section_services: "Nos filières", section_tarifs: "Frais de scolarité" },
        serviceDetails: sv([["Informatique", "Licence et Master"], ["Gestion", "Comptabilité, commerce"], ["Formation continue", "Cours du soir et certifiants"]]),
        pricingDetails: pr([["Licence", "350 000 F / an"], ["Master", "450 000 F / an"], ["Certifiant", "75 000 F"]]) } },
    clinique: { label: "Clinique / Santé", desc: "Spécialités, équipe et prise de rendez-vous.", tag: "Santé", hero: "soft", sections: ["about", "services", "temoignages", "contact"],
      preset: { icon: "🩺", color: "#0e8fa8", theme: "light", font: "moderne", radius: "2", slogan: "Votre santé, notre priorité",
        content: { heroDescription: "Consultations, analyses et suivi médical dans un cadre moderne et rassurant.", heroButton: "Prendre rendez-vous", aboutDescription: "Une équipe médicale disponible 7j/7 pour vous accueillir et vous accompagner.", section_services: "Nos spécialités" },
        serviceDetails: sv([["Médecine générale", "Consultations et suivi"], ["Analyses", "Laboratoire et imagerie"], ["Urgences", "Prise en charge 24h/24"]]),
        testimonialDetails: tm([["Accueil chaleureux et médecins à l’écoute.", "Awa S."], ["Rendez-vous rapide et résultats clairs.", "Ibrahima N."]]) } },
    immobilier: { label: "Immobilier", desc: "Biens à vendre ou à louer, avis clients et contact.", tag: "Immobilier", hero: "dark", sections: ["about", "produits", "temoignages", "contact"],
      preset: { icon: "🏠", color: "#f26b1d", theme: "dark", font: "affirmee", radius: "1", slogan: "Trouvez le bien de vos rêves",
        content: { heroDescription: "Villas, appartements et terrains sélectionnés avec soin à Dakar et environs.", heroButton: "Voir les biens", aboutDescription: "Nous vous accompagnons de la recherche à la signature, en toute transparence.", section_produits: "Nos biens" },
        productDetails: pr([["Villa 4 chambres", "450 000 F / mois", "Almadies · Jardin · Garage"], ["Appartement F3", "250 000 F / mois", "Mermoz · Balcon"], ["Terrain 300 m²", "18 000 000 F", "Diamniadio · Titre foncier"], ["Studio meublé", "120 000 F / mois", "Plateau · Climatisé"]]),
        testimonialDetails: tm([["Équipe sérieuse, j’ai trouvé ma villa en deux semaines.", "Cheikh B."], ["Accompagnement impeccable jusqu’à la remise des clés.", "Mariama T."]]) } },
    association: { label: "Association / ONG", desc: "Mission, actions, galerie et appel au don.", tag: "Social", hero: "overlay", sections: ["about", "services", "galerie", "contact"],
      preset: { icon: "🤝", color: "#0f9d6b", theme: "light", font: "moderne", radius: "2", slogan: "Ensemble, changeons des vies",
        content: { heroDescription: "Nous agissons pour l’éducation, la santé et l’autonomie des communautés.", heroButton: "Nous soutenir", aboutDescription: "Notre association mobilise des bénévoles et des partenaires pour des projets utiles et durables.", section_services: "Nos actions", section_galerie: "Sur le terrain" },
        serviceDetails: sv([["Éducation", "Fournitures et soutien scolaire"], ["Santé", "Campagnes de sensibilisation"], ["Emploi", "Formation et micro-projets"]]) } },
    photo: { label: "Photographe / Créatif", desc: "Portfolio sombre, galerie et tarifs.", tag: "Portfolio", hero: "dark", sections: ["about", "galerie", "tarifs", "contact"],
      preset: { icon: "📷", color: "#f2b134", theme: "dark", font: "affirmee", radius: "0", slogan: "Capturer l’instant",
        content: { heroDescription: "Mariages, portraits, événements et reportages. Chaque image raconte une histoire.", heroButton: "Voir mes travaux", aboutDescription: "Photographe professionnel basé à Dakar, disponible partout au Sénégal.", section_galerie: "Mes réalisations", section_tarifs: "Mes forfaits" },
        pricingDetails: pr([["Portrait", "à partir de 25 000 F"], ["Événement", "à partir de 80 000 F"], ["Mariage", "sur devis", "Journée complète"]]) } },
    mariage: { label: "Mariage / Cérémonie", desc: "Page d’invitation avec programme, galerie et RSVP.", tag: "Invitation", hero: "soft", sections: ["about", "galerie", "tarifs", "contact"],
      preset: { icon: "💍", color: "#b08a57", theme: "light", font: "elegante", radius: "2", slogan: "Aïda & Ousmane se marient",
        content: { heroDescription: "Samedi 14 mars 2027 · Dakar. Nous serions heureux de partager ce jour avec vous.", heroButton: "Confirmer ma présence", aboutDescription: "Cérémonie à 16h, dîner de réception à 20h. Tenue élégante souhaitée.", section_about: "Notre histoire", section_galerie: "Nos souvenirs", section_tarifs: "Programme", section_contact: "RSVP" },
        pricingDetails: pr([["16h · Cérémonie", "Mairie de Dakar"], ["18h · Cocktail", "Jardin de la salle"], ["20h · Dîner & soirée", "Salle des fêtes"]]) } },
    modeboutique: { label: "Boutique de mode", desc: "Vitrine de vêtements avec produits et avis.", tag: "Vente en ligne", hero: "split", sections: ["produits", "temoignages", "contact"],
      preset: { icon: "👗", color: "#14161f", theme: "light", font: "elegante", radius: "0", slogan: "Le style qui vous ressemble",
        content: { heroDescription: "Nouvelle collection : tenues wax, prêt-à-porter et accessoires. Livraison partout à Dakar.", heroButton: "Découvrir la collection", section_produits: "Nouveautés" },
        productDetails: pr([["Robe wax", "15 000 F", "Coupe évasée"], ["Ensemble pagne", "22 000 F", "Sur mesure"], ["Sac cuir", "18 000 F", "Fait main"], ["Chemise lin", "12 000 F", "Homme"]]),
        testimonialDetails: tm([["Qualité superbe et livraison rapide.", "Ndeye A."], ["Les modèles sont magnifiques.", "Khady M."]]) } },
    tech: { label: "Startup / Application", desc: "Page d’un produit numérique : atouts, offres, contact.", tag: "Technologie", hero: "overlay", sections: ["about", "services", "tarifs", "contact"],
      preset: { icon: "🚀", color: "#7a3cff", theme: "dark", font: "affirmee", radius: "2", slogan: "Simplifiez votre quotidien",
        content: { heroDescription: "Une application pensée pour gagner du temps, disponible sur Android et iOS.", heroButton: "Télécharger", aboutDescription: "Rapide, sécurisée et conçue avec vous : essayez gratuitement pendant 30 jours.", section_services: "Fonctionnalités", section_tarifs: "Abonnements" },
        serviceDetails: sv([["Rapide", "Prise en main en 2 minutes"], ["Sécurisé", "Vos données sont protégées"], ["Hors ligne", "Fonctionne sans connexion"]]),
        pricingDetails: pr([["Gratuit", "0 F"], ["Pro", "2 500 F / mois"], ["Équipe", "10 000 F / mois"]]) } },
    coach: { label: "Coach / Sport", desc: "Programmes, tarifs et réservation de séances.", tag: "Sport & coaching", hero: "left", sections: ["about", "services", "tarifs", "contact"],
      preset: { icon: "💪", color: "#e11d48", theme: "dark", font: "affirmee", radius: "1", slogan: "Transforme ton corps, change ta vie",
        content: { heroDescription: "Coaching personnalisé, cours collectifs et suivi nutritionnel.", heroButton: "Réserver une séance", aboutDescription: "Coach diplômé, je t’accompagne vers tes objectifs : perte de poids, prise de masse, remise en forme.", section_services: "Mes programmes", section_tarifs: "Mes formules" },
        serviceDetails: sv([["Perte de poids", "Programme 8 semaines"], ["Musculation", "Séances personnalisées"], ["Cours collectifs", "Cardio, fitness, yoga"]]),
        pricingDetails: pr([["Séance", "10 000 F"], ["Pack 10 séances", "80 000 F"], ["Mensuel illimité", "35 000 F"]]) } }
  };

  var app = {
    resto: { label: "Restauration", desc: "Menu, commande en ligne et suivi de livraison.", tag: "Food", sections: ["accueil", "menu", "commande", "suivi", "profil"],
      preset: { icon: "🍔", home: { card: ["Offre du jour", "-20% sur votre première commande"], actions: [["🍔", "Burgers"], ["🍕", "Pizzas"], ["🥤", "Boissons"], ["🍰", "Desserts"]], list: "Populaires" }, color: "#d62839", theme: "light", font: "affirmee", radius: "2", slogan: "Vos plats préférés, livrés chez vous", content: { appGreeting: "Faim ? 😋" },
        productDetails: pr([["Burger maison", "3 500", "Boeuf, cheddar, frites"], ["Thiéboudiène", "3 000", "Riz au poisson"], ["Pizza royale", "5 000", "Jambon, fromage"]]) } },
    wallet: { label: "Portefeuille mobile", desc: "Solde, envoi d’argent, paiements et historique.", tag: "Finance", sections: ["accueil", "portefeuille", "messages", "profil"],
      preset: { icon: "💳", home: { card: ["Solde disponible", "125 000 FCFA"], actions: [["📤", "Envoyer"], ["📥", "Recevoir"], ["📱", "Crédit"], ["🧾", "Factures"]], list: "Raccourcis", items: [["Paiement boutique", "- 8 500"], ["Reçu de Awa", "+ 25 000"]] }, color: "#7a3cff", theme: "dark", font: "moderne", radius: "2", slogan: "Payez et transférez en un instant", content: { appGreeting: "Bonjour 👋" } } },
    sante: { label: "Médecin / Clinique", desc: "Prise de rendez-vous, messagerie et dossier patient.", tag: "Santé", sections: ["accueil", "rdv", "messages", "profil"],
      preset: { icon: "🩺", home: { card: ["Prochain rendez-vous", "Dr Diop · Jeudi 10h30"], actions: [["👨‍⚕️", "Médecins"], ["💊", "Ordonnances"], ["🧪", "Analyses"], ["🚑", "Urgences"]], list: "Conseils santé", items: [["Boire 1,5 L d’eau par jour", ""], ["Bilan annuel conseillé", ""]] }, color: "#0e8fa8", theme: "light", font: "moderne", radius: "2", slogan: "Prenez rendez-vous en quelques clics", content: { appGreeting: "Bonjour 👋" } } },
    fitness: { label: "Fitness / Coaching", desc: "Séances, programme de la semaine et réservation.", tag: "Sport", sections: ["accueil", "seances", "rdv", "profil"],
      preset: { icon: "💪", home: { card: ["Séance du jour", "Cardio · 45 min · 18h"], actions: [["🏃", "Cardio"], ["🏋️", "Muscu"], ["🧘", "Yoga"], ["🥗", "Nutrition"]], list: "Ton programme", items: [["Cardio · 45 min", "Lun"], ["Musculation", "Mer"]] }, color: "#e11d48", theme: "dark", font: "affirmee", radius: "1", slogan: "Dépasse tes limites", content: { appGreeting: "C’est parti 🔥" } } },
    immo: { label: "Immobilier", desc: "Annonces, favoris et contact des agents.", tag: "Immobilier", sections: ["accueil", "annonces", "messages", "profil"],
      preset: { icon: "🏠", home: { card: ["Bien du moment", "Villa 4 ch · Almadies"], actions: [["🏠", "Louer"], ["🔑", "Acheter"], ["📍", "Carte"], ["❤️", "Favoris"]], list: "Nouvelles annonces" }, color: "#f26b1d", theme: "light", font: "affirmee", radius: "1", slogan: "Trouvez votre prochain chez-vous", content: { appGreeting: "Bienvenue" },
        productDetails: pr([["Villa 4 ch · Almadies", "450 000 F/mois"], ["Appartement F3 · Mermoz", "250 000 F/mois"], ["Studio · Plateau", "120 000 F/mois"]]) } },
    transport: { label: "Transport / VTC", desc: "Choix du trajet, estimation du prix et suivi.", tag: "Mobilité", sections: ["accueil", "trajet", "suivi", "profil"],
      preset: { icon: "🚕", home: { card: ["Course en cours", "Plateau → Almadies · 4 min"], actions: [["🚕", "Taxi"], ["🛵", "Moto"], ["🚌", "Bus"], ["📅", "Réserver"]], list: "Lieux récents", items: [["Plateau · Domicile", ""], ["Almadies · Bureau", ""]] }, color: "#14161f", theme: "light", font: "moderne", radius: "2", slogan: "Où allez-vous aujourd’hui ?", content: { appGreeting: "Bonjour 👋" } } },
    boutique: { label: "Boutique en ligne", desc: "Catalogue de mode, panier et messagerie vendeur.", tag: "Commerce", sections: ["accueil", "catalogue", "commande", "messages", "profil"],
      preset: { icon: "🛍️", home: { card: ["Collection été", "-30% jusqu’à dimanche"], actions: [["👗", "Robes"], ["👜", "Sacs"], ["👟", "Chaussures"], ["💍", "Bijoux"]], list: "Tendances" }, color: "#b0566b", theme: "light", font: "elegante", radius: "2", slogan: "Votre style, à portée de main", content: { appGreeting: "Nouveautés ✨" },
        productDetails: pr([["Robe wax", "15 000"], ["Sac cuir", "18 000"], ["Sandales", "9 000"]]) } }
  };

  /* Accueil personnalisé de chaque application */
  function home(scr, el, st, h, editText, sl) {
    scr.appendChild(editText("h4", "pv-h", "Bonjour", "appGreeting", "Titre d’accueil")); scr.appendChild(editText("p", "", sl, "appSlogan", "Slogan de l’application"));
    var c = el("div", "pv-card pv-accent"); c.appendChild(el("div", "pv-sub", h.card[0])); c.appendChild(el("b", "pv-big", h.card[1])); scr.appendChild(c);
    var g = el("div", "pv-actions"); h.actions.forEach(function (a) { var t = el("div", "pv-action"); t.appendChild(el("span", "", a[0])); t.appendChild(el("small", "", a[1])); g.appendChild(t); }); scr.appendChild(g);
    scr.appendChild(el("b", "pv-subtitle", h.list));
    var items = (st.productDetails && st.productDetails.length ? st.productDetails : (h.items || []).map(function (x) { return { name: x[0], price: x[1] }; })).slice(0, 3);
    items.forEach(function (p) { var r = el("div", "pv-row"); r.appendChild(el("div", "pv-thumb")); r.appendChild(el("b", "pv-grow", p.name)); if (p.price) r.appendChild(el("span", "pv-price", p.price)); scr.appendChild(r); });
  }
  var appSections = { menu: "Menu", suivi: "Suivi", portefeuille: "Portefeuille", seances: "Séances", annonces: "Annonces", trajet: "Trajet" };

  /* Écrans supplémentaires pour l’aperçu mobile */
  var screens = {
    menu: function (scr, el, st) {
      var d = el("div", "pv-days"); ["Plats", "Boissons", "Desserts"].forEach(function (x, i) { d.appendChild(el("span", i === 0 ? "on" : "", x)); }); scr.appendChild(d);
      var items = (st.productDetails && st.productDetails.length ? st.productDetails : [{ name: "Burger maison", price: "3 500" }, { name: "Thiéboudiène", price: "3 000" }, { name: "Pizza royale", price: "5 000" }]).slice(0, 5);
      items.forEach(function (p) { var r = el("div", "pv-row"); r.appendChild(el("div", "pv-thumb")); var m = el("div", "pv-grow"); m.appendChild(el("b", "", p.name || "Plat")); if (p.description) m.appendChild(el("div", "pv-sub", p.description)); r.appendChild(m); r.appendChild(el("span", "pv-price", p.price || "")); scr.appendChild(r); });
    },
    suivi: function (scr, el) {
      var c = el("div", "pv-card pv-accent"); c.appendChild(el("b", "", "Arrivée estimée : 15 min")); c.appendChild(el("div", "pv-sub", "Commande n° 2481")); scr.appendChild(c);
      var t = el("div", "pv-timeline"); [["Commande reçue", 1], ["En préparation", 1], ["En route", 0], ["Livrée", 0]].forEach(function (s) { var r = el("div", "pv-step" + (s[1] ? " done" : "")); r.appendChild(el("i", "")); r.appendChild(el("span", "", s[0])); t.appendChild(r); }); scr.appendChild(t);
    },
    portefeuille: function (scr, el) {
      var c = el("div", "pv-card pv-accent pv-balance"); c.appendChild(el("div", "pv-sub", "Solde disponible")); c.appendChild(el("b", "pv-big", "125 000 FCFA")); scr.appendChild(c);
      var a = el("div", "pv-grid3"); ["Envoyer", "Recevoir", "Payer"].forEach(function (x) { a.appendChild(el("span", "pv-slot", x)); }); scr.appendChild(a);
      scr.appendChild(el("b", "pv-subtitle", "Dernières opérations"));
      [["Paiement boutique", "- 8 500"], ["Reçu de Awa", "+ 25 000"], ["Facture électricité", "- 14 200"]].forEach(function (x) { var r = el("div", "pv-row"); r.appendChild(el("b", "pv-grow", x[0])); r.appendChild(el("span", "pv-price", x[1])); scr.appendChild(r); });
    },
    seances: function (scr, el) {
      var c = el("div", "pv-card pv-accent"); c.appendChild(el("b", "", "3 séances sur 5 cette semaine")); var bar = el("div", "pv-progress"); bar.appendChild(el("i", "")); c.appendChild(bar); scr.appendChild(c);
      [["Cardio · 45 min", "Lun 18h"], ["Musculation", "Mer 18h"], ["Yoga · 60 min", "Ven 17h"]].forEach(function (x) { var r = el("div", "pv-row"); r.appendChild(el("div", "pv-thumb")); r.appendChild(el("b", "pv-grow", x[0])); r.appendChild(el("span", "pv-price", x[1])); scr.appendChild(r); });
    },
    annonces: function (scr, el, st) {
      var items = (st.productDetails && st.productDetails.length ? st.productDetails : [{ name: "Villa 4 ch · Almadies", price: "450 000 F/mois" }, { name: "Appartement F3", price: "250 000 F/mois" }]).slice(0, 4);
      items.forEach(function (p) { var c = el("div", "pv-card pv-listing"); c.appendChild(el("div", "pv-photo")); c.appendChild(el("b", "", p.name || "Bien")); c.appendChild(el("span", "pv-price", p.price || "")); scr.appendChild(c); });
    },
    trajet: function (scr, el) {
      scr.appendChild(el("div", "pv-map"));
      scr.appendChild(el("div", "pv-input", "📍 Départ : Plateau")); scr.appendChild(el("div", "pv-input", "🏁 Destination : Almadies"));
      var c = el("div", "pv-card"); c.appendChild(el("b", "", "Course standard · 4 min")); c.appendChild(el("span", "pv-price", "3 500 FCFA")); scr.appendChild(c); scr.appendChild(el("i", "pv-btn", "Commander"));
    }
  };

  window.StudioPresets = { site: site, app: app, appSections: appSections, screens: screens, home: home };
})();
