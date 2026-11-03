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
        card.hidden = category !== "all" && card.getAttribute("data-service-category") !== category;
      });
      var hint = $("service-gallery-hint");
      if (hint) hint.textContent = category === "all" ? "Tous les modèles disponibles. Ouvre un aperçu pour parcourir les écrans, puis choisis celui qui correspond à ton projet." : "Modèles proposés pour : " + (serviceAudienceLabels[category] || category) + ". Choisis celui qui correspond à ton projet.";
      var gallery = $("modeles"); if (gallery) gallery.scrollIntoView({ behavior: "smooth" });
    });
  });
  document.querySelectorAll("[data-service-model]").forEach(function (button) {
    button.addEventListener("click", function () {
      var field = $("posterModel");
      if (!field) return;
      field.value = button.getAttribute("data-service-model");
      var preview = $("selectedPosterPreview"), title = $("selectedPosterName"), help = $("selectedPosterHelp");
      var art = button.closest(".service-model-card").querySelector(".service-model-art, .service-model-art-img");
      if (preview && art) { var details = title ? title.parentElement : null; preview.replaceChildren(art.cloneNode(true)); if (details) preview.appendChild(details); }
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
        if (preview && sample) { var details = title ? title.parentElement : null; preview.replaceChildren(sample.cloneNode(true)); if (details) preview.appendChild(details); }
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


  /* Inspection locale des modèles : aperçu multi-pages sans quitter Stromtech. */
  function installModelInspector() {
    var modal = document.createElement("div");
    modal.className = "model-inspector";
    modal.hidden = true;
    modal.innerHTML = '<div class="model-inspector-panel" role="dialog" aria-modal="true" aria-labelledby="model-inspector-title"><div class="model-inspector-top"><div><span class="tag">Aperçu interactif</span><h2 id="model-inspector-title">Modèle Stromtech</h2><p class="model-inspector-subtitle">Maquette de démonstration — les pages seront adaptées à ton projet.</p></div><button type="button" class="model-inspector-close" aria-label="Fermer">×</button></div><div class="model-inspector-tabs" role="tablist"></div><div class="model-inspector-screen"></div><div class="model-inspector-bottom"><span>Navigation de démonstration</span><button type="button" class="btn primary model-inspector-select">Choisir ce modèle</button></div></div>';
    document.body.appendChild(modal);
    var title=modal.querySelector("#model-inspector-title"), tabs=modal.querySelector(".model-inspector-tabs"), screen=modal.querySelector(".model-inspector-screen"), selected=modal.querySelector(".model-inspector-select"), close=modal.querySelector(".model-inspector-close");
    var currentName="", currentCard=null, currentType="";
    var pagesByType={
      site:["Accueil","Services","À propos","Contact"],
      app:["Tableau de bord","Activités","Profil","Paramètres"]
    };
    function renderPage(page,index) {
      screen.replaceChildren();
      if(currentType==="poster"){
        var art=currentCard.querySelector(".poster-sample");
        if(art) screen.appendChild(art.cloneNode(true));
        return;
      }
      var frame=document.createElement("div"); frame.className="inspector-page "+(currentType==="app"?"inspector-app-page":"inspector-site-page");
      var sourceArt=currentCard.querySelector(".service-model-art-img");
      if(sourceArt){var visual=document.createElement("div");visual.className="inspector-model-visual";var image=sourceArt.cloneNode(true);image.removeAttribute("loading");image.alt="Aperçu du modèle "+currentName;visual.appendChild(image);frame.appendChild(visual);}
      var brand=document.createElement("div"); brand.className="inspector-brand"; brand.textContent=currentName+" · "+page; frame.appendChild(brand);
      var hero=document.createElement("div"); hero.className="inspector-hero";
      var eyebrow=document.createElement("small"); eyebrow.textContent=index===0?"BIENVENUE":"DÉCOUVREZ NOTRE UNIVERS";
      var heading=document.createElement("h3"); heading.textContent=currentType==="app"?(["Votre espace en un coup d’œil","Toutes vos activités","Votre profil","Vos préférences"][index]):([currentName,"Nos services","Qui sommes-nous ?","Parlons de votre projet"][index]);
      var desc=document.createElement("p"); desc.textContent=currentType==="app"?(["Retrouvez ici les informations essentielles.","Consultez les opérations et les dernières mises à jour.","Gérez vos informations personnelles.","Personnalisez votre expérience."][index]):(["Une présentation claire, moderne et pensée pour vos visiteurs.","Des solutions organisées pour répondre à vos besoins.","Une équipe engagée et une approche adaptée.","Retrouvez nos coordonnées et envoyez-nous un message."][index]);
      hero.append(eyebrow,heading,desc);
      var action=document.createElement("span"); action.className="inspector-action"; action.textContent=currentType==="app"?"Ouvrir":"En savoir plus"; hero.appendChild(action); frame.appendChild(hero);
      var grid=document.createElement("div"); grid.className="inspector-content-grid";
      var labels=currentType==="app"?["Activité récente","Éléments enregistrés","Notifications"]:index===3?["Téléphone","E-mail","Adresse"]:["Présentation","Nos engagements","Informations utiles"];
      labels.forEach(function(label,i){var box=document.createElement("div");box.className="inspector-content-card";box.innerHTML="<b></b><span></span>";box.querySelector("b").textContent=label;box.querySelector("span").textContent=currentType==="app"?"Accès rapide et informations détaillées":"Un contenu organisé pour présenter clairement cette rubrique.";grid.appendChild(box);});
      frame.appendChild(grid);screen.appendChild(frame);
    }
    function open(card,type) {
      currentCard=card; currentType=type; currentName=card.querySelector("h3")?.textContent||"Modèle Stromtech";
      title.textContent=currentName; tabs.replaceChildren();
      if(type==="poster"){renderPage("Affiche",0);tabs.hidden=true;}
      else{
        tabs.hidden=false;
        pagesByType[type].forEach(function(page,index){var b=document.createElement("button");b.type="button";b.className="model-inspector-tab"+(index===0?" active":"");b.textContent=page;b.setAttribute("role","tab");b.addEventListener("click",function(){tabs.querySelectorAll("button").forEach(x=>x.classList.remove("active"));b.classList.add("active");renderPage(page,index);});tabs.appendChild(b);});
        renderPage(pagesByType[type][0],0);
      }
      selected.textContent="Choisir ce modèle";
      modal.hidden=false;document.body.classList.add("model-inspector-open");close.focus();
    }
    function shut(){modal.hidden=true;document.body.classList.remove("model-inspector-open");}
    close.addEventListener("click",shut);
    modal.addEventListener("click",function(e){if(e.target===modal)shut();});
    document.addEventListener("keydown",function(e){
      if(modal.hidden)return;
      if(e.key==="Escape"){shut();return;}
      if(e.key==="ArrowRight"||e.key==="ArrowLeft"){
        var buttons=Array.from(tabs.querySelectorAll("button"));if(!buttons.length)return;
        var active=buttons.findIndex(function(b){return b.classList.contains("active");});
        var next=(active+(e.key==="ArrowRight"?1:-1)+buttons.length)%buttons.length;
        buttons[next].click();buttons[next].focus();
      }
    });
    selected.addEventListener("click",function(){if(!currentCard)return;var choose=currentCard.querySelector("[data-service-model], [data-poster-model]");if(choose)choose.click();shut();});
    document.addEventListener("click",function(e){
      var button=e.target.closest("[data-inspect-model]");if(!button)return;
      var card=button.closest(".service-model-card, .poster-choice");if(!card)return;
      var type=card.classList.contains("poster-choice")?"poster":(document.body.getAttribute("data-service")||"").indexOf("Application")===0?"app":"site";
      open(card,type);
    });
    document.querySelectorAll(".service-model-card, .poster-choice").forEach(function(card){
      if (card.classList.contains("web-template-card")) return;
      var actions=card.querySelector(".btn");if(!actions)return;
      var b=document.createElement("button");b.type="button";b.className="btn secondary inspect-model-btn";b.setAttribute("data-inspect-model","");b.textContent="Voir le modèle";
      actions.parentNode.insertBefore(b,actions);
    });
  }
  /* Préselection d'un modèle provenant de la galerie multipages. */
  (function () {
    var params = new URLSearchParams(window.location.search);
    var chosen = params.get("modele");
    var field = $("posterModel");
    if (!chosen || !field) return;
    var option = Array.prototype.find.call(field.options, function (o) { return o.value === chosen || o.textContent === chosen; });
    if (!option) { option = document.createElement("option"); option.value = chosen; option.textContent = chosen; field.appendChild(option); }
    field.value = option.value;
    var title = $("selectedPosterName"), help = $("selectedPosterHelp");
    if (title) title.textContent = chosen;
    if (help) help.textContent = "Modèle choisi depuis la galerie des 24 sites Web. Il sera transmis avec ta demande.";
    var preview = $("selectedPosterPreview");
    if (preview) { var empty = preview.querySelector(".selected-poster-empty"); if (empty) empty.textContent = "🌐"; }
  })();

  /* Galerie Web intégrée : aperçu multipages dans une fenêtre Stromtech. */
  (function installWebTemplateGallery(){
    var gallery=document.getElementById("galerie-modeles-web");
    if(!gallery)return;
    var filters=gallery.querySelectorAll("[data-web-filter]");
    filters.forEach(function(btn){btn.addEventListener("click",function(){
      filters.forEach(function(x){x.classList.toggle("active",x===btn);});
      var key=btn.getAttribute("data-web-filter");
      gallery.querySelectorAll(".web-gallery-category").forEach(function(section){section.hidden=key!=="all"&&section.getAttribute("data-web-category")!==key;});
    });});
    var modal=document.createElement("div");
    modal.className="web-template-preview";modal.hidden=true;
    modal.innerHTML='<div class="web-template-preview-panel" role="dialog" aria-modal="true" aria-label="Aperçu du modèle"><header><div><span class="tag">Aperçu interactif</span><h2 class="web-preview-title"></h2><p>Navigue dans le modèle comme sur un vrai site. Tu restes sur Stromtech.</p></div><button type="button" class="web-preview-close" aria-label="Fermer">×</button></header><iframe title="Aperçu du site modèle" loading="lazy"></iframe><footer><span>Les liens et pages de démonstration sont consultables dans cet aperçu.</span><button type="button" class="btn primary web-preview-choose">Choisir ce modèle</button></footer></div>';
    document.body.appendChild(modal);
    var frame=modal.querySelector("iframe"),title=modal.querySelector(".web-preview-title"),chosen="";
    function close(){modal.hidden=true;document.body.classList.remove("web-preview-open");frame.src="about:blank";}
    modal.querySelector(".web-preview-close").addEventListener("click",close);
    modal.addEventListener("click",function(e){if(e.target===modal)close();});
    document.addEventListener("keydown",function(e){if(e.key==="Escape"&&!modal.hidden)close();});
    gallery.addEventListener("click",function(e){
      var btn=e.target.closest("[data-web-inspect]");if(!btn)return;
      chosen=btn.getAttribute("data-preview-title");
      title.textContent=chosen;frame.src=btn.getAttribute("data-preview-url");
      modal.hidden=false;document.body.classList.add("web-preview-open");
    });
    modal.querySelector(".web-preview-choose").addEventListener("click",function(){
      var field=document.getElementById("posterModel");
      if(field){var option=Array.prototype.find.call(field.options,function(o){return o.value===chosen;});if(!option){option=document.createElement("option");option.value=chosen;option.textContent=chosen;field.appendChild(option);}field.value=chosen;
        var n=document.getElementById("selectedPosterName"),h=document.getElementById("selectedPosterHelp");
        if(n)n.textContent=chosen;if(h)h.textContent="Ce modèle de site Web sera joint à ta demande Stromtech.";
        var p=document.getElementById("selectedPosterPreview");if(p){p.replaceChildren();var b=document.createElement("div");b.className="selected-poster-empty";b.textContent="🌐";p.appendChild(b);var d=document.createElement("div");var strong=document.createElement("strong");strong.textContent=chosen;var para=document.createElement("p");para.textContent="Modèle choisi dans la galerie Web.";d.append(strong,para);p.appendChild(d);}
        Draft.save({type:reqType});
      }
      close();var form=document.getElementById("demande");if(form)form.scrollIntoView({behavior:"smooth"});
    });
  })();

  installModelInspector();

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
