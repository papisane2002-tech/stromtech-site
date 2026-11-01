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
        type: reqType, service: SERVICE, model: "", name: v("name"), phone: v("phone"),
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
