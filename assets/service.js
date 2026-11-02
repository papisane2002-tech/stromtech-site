/* Pages de service : demandes de devis / réalisation */
(function () {
  var $ = function (id) { return document.getElementById(id); };
  var SERVICE = document.body.getAttribute("data-service");
  var quote = $("quote");
  if (!quote || !SERVICE) return;

  var status = $("quote-status"), filesIn = $("files");
  var reqType = "devis";
  var TYPES = {
    devis: {
      btn: "Envoyer ma demande de devis ↗",
      hint: "Tu veux connaître le prix et les conditions avant de te décider : nous t'envoyons une estimation dans ta messagerie."
    },
    realisation: {
      btn: "Envoyer ma demande de réalisation ↗",
      hint: "Tu es prêt à lancer ton projet : nous confirmons le prix et le délai avec toi dans ta messagerie, puis nous démarrons après ton accord."
    }
  };

  function say(msg, ok) {
    status.className = "status " + (ok ? "ok" : "err");
    status.replaceChildren(document.createTextNode(msg));
  }

  function setType(t) {
    reqType = TYPES[t] ? t : "devis";
    document.querySelectorAll("#type-tabs button").forEach(function (b) {
      b.classList.toggle("on", b.getAttribute("data-type") === reqType);
    });
    $("type-hint").textContent = TYPES[reqType].hint;
    $("quote-submit").textContent = TYPES[reqType].btn;
  }
  document.querySelectorAll("#type-tabs button").forEach(function (b) {
    b.addEventListener("click", function () { setType(b.getAttribute("data-type")); });
  });

  var o = Draft.restore();
  setType(o && o.type ? o.type : "devis");
  if (o) say("Ton brouillon a été restauré : vérifie-le, ajoute à nouveau tes PDF si besoin, puis envoie ta demande.", true);
  quote.addEventListener("input", function () { Draft.save({ type: reqType }); });
  var audienceNames = { mariage: "Mariages et cérémonies", anniversaire: "Anniversaires et fêtes", commerce: "Commerces", evenement: "Organisateurs d’événements" };
  document.querySelectorAll("[data-audience]").forEach(function (button) {
    button.addEventListener("click", function () {
      var category = button.getAttribute("data-audience");
      document.querySelectorAll(".poster-choice").forEach(function (card) {
        card.hidden = card.getAttribute("data-category") !== category;
      });
      var heading = document.querySelector("#modeles .section-head p");
      if (heading) heading.textContent = "Modèles proposés pour : " + audienceNames[category] + ". Choisis celui qui te plaît.";
      var gallery = $("modeles"); if (gallery) gallery.scrollIntoView({ behavior: "smooth" });
    });
  });
  var serviceAudienceLabels = { entreprise:"Entreprises et commerces", portfolio:"Portfolio et créatifs", restaurant:"Restaurants", boutique:"Boutiques", medical:"Santé et médecine", stock:"Commerçants", booking:"Cabinets et services", business:"Entreprises", orders:"Boutiques et restaurants", etudiant:"Étudiants et diplômés", emploi:"Recherche d'emploi", reconversion:"Reconversion", creatif:"Profils créatifs" };
  document.querySelectorAll("[data-service-audience]").forEach(function (button) {
    button.addEventListener("click", function () {
      var category = button.getAttribute("data-service-audience");
      document.querySelectorAll(".service-model-card").forEach(function (card) {
        card.hidden = card.getAttribute("data-service-category") !== category;
      });
      var hint = $("service-gallery-hint");
      if (hint) hint.textContent = "Modèles proposés pour : " + (serviceAudienceLabels[category] || category) + ". Choisis celui qui correspond à ton projet.";
      var gallery = $("modeles"); if (gallery) gallery.scrollIntoView({ behavior: "smooth" });
    });
  });
  document.querySelectorAll("[data-service-model]").forEach(function (button) {
    button.addEventListener("click", function () {
      var field = $("posterModel");
      if (!field) return;
      field.value = button.getAttribute("data-service-model");
      var preview = $("selectedPosterPreview"), title = $("selectedPosterName"), help = $("selectedPosterHelp");
      var art = button.closest(".service-model-card").querySelector(".service-model-art");
      if (preview && art) preview.replaceChildren(art.cloneNode(true), preview.querySelector("div:last-child"));
      if (title) title.textContent = field.value;
      if (help) help.textContent = "Ce modèle sera indiqué dans ta demande Stromtech.";
      Draft.save({ type: reqType });
      var form = $("demande"); if (form) form.scrollIntoView({ behavior: "smooth" });
    });
  });
  document.querySelectorAll("[data-poster-model]").forEach(function (button) {
    button.addEventListener("click", function () {
      var field = $("posterModel");
      if (field) {
        field.value = button.getAttribute("data-poster-model");
        var preview = $("selectedPosterPreview"), title = $("selectedPosterName"), help = $("selectedPosterHelp");
        var sample = button.closest(".poster-choice").querySelector(".poster-sample");
        if (preview && sample) preview.replaceChildren(sample.cloneNode(true), preview.querySelector("div:last-child"));
        if (title) title.textContent = field.value;
        if (help) help.textContent = "Ce modèle sera indiqué dans ta demande Stromtech.";
        Draft.save({ type: reqType });
      }
      var form = $("demande"); if (form) form.scrollIntoView({ behavior: "smooth" });
    });
  });
  document.querySelectorAll("[data-poster-package]").forEach(function (button) {
    button.addEventListener("click", function () {
      var field = $("posterPackage");
      if (field) { field.value = button.getAttribute("data-poster-package"); Draft.save({ type: reqType }); }
    });
  });

  quote.addEventListener("submit", async function (e) {
    e.preventDefault();
    status.className = ""; status.replaceChildren();
    var v = function (id) { var node = $(id); return node ? node.value.trim() : ""; };
    var files = Array.prototype.slice.call(filesIn.files);
    if (files.length > 3) return say("3 fichiers PDF maximum.");
    for (var i = 0; i < files.length; i++) {
      var f = files[i];
      if (!(f.type === "application/pdf" || /\\.pdf$/i.test(f.name))) return say("« " + f.name + " » n'est pas un PDF.");
      if (f.size > 5 * 1024 * 1024) return say("« " + f.name + " » dépasse 5 Mo.");
    }
    if (!window.Stromtech) return say("La messagerie se charge, réessaie dans un instant.");
    var btn = $("quote-submit");
    btn.disabled = true;
    Draft.save({ type: reqType });
    say("Envoi en cours…", true);
    try {
      var r = await window.Stromtech.submitQuote({
        type: reqType, service: SERVICE, model: v("posterModel"), package: v("posterPackage"), name: v("name"), phone: v("phone"),
        budget: v("budget"), deadline: v("deadline"), details: v("details"), files: files
      });
      if (r.status === "cancelled") {
        say("Ta demande n'a pas encore été envoyée : connecte-toi pour l'envoyer (ton brouillon est conservé).");
        return;
      }
      Draft.clear();
      status.className = "status ok"; status.replaceChildren();
      status.append(document.createTextNode("✅ Demande envoyée" + (r.count ? " avec " + r.count + " fichier(s)" : "") + " ! Nous te répondons directement dans ta messagerie Stromtech. "));
      var b = document.createElement("button");
      b.type = "button"; b.className = "btn primary"; b.textContent = "Ouvrir ma messagerie";
      b.onclick = function () { window.Stromtech.openSpace("msg", r.conversationId, r.subject); };
      status.append(b);
      quote.reset(); setType("devis");
    } catch (err) {
      say(err && err.message ? err.message : "Une erreur est survenue pendant l'envoi.");
    } finally {
      btn.disabled = false;
    }
  });
})();
