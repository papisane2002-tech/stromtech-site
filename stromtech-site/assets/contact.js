/* Page Contact : le message arrive dans la messagerie Stromtech */
(function () {
  var $ = function (id) { return document.getElementById(id); };
  var form = $("contact-form");
  if (!form) return;
  var status = $("contact-status");

  function say(msg, ok) {
    status.className = "status " + (ok ? "ok" : "err");
    status.replaceChildren(document.createTextNode(msg));
  }

  var o = Draft.restore();
  if (o) say("Ton brouillon a été restauré : vérifie-le puis envoie ton message.", true);
  form.addEventListener("input", function () { Draft.save(); });

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    status.className = ""; status.replaceChildren();
    if (!window.Stromtech) return say("La messagerie se charge, réessaie dans un instant.");
    var btn = $("contact-submit");
    btn.disabled = true;
    Draft.save();
    say("Envoi en cours…", true);
    try {
      var r = await window.Stromtech.submitQuote({
        type: "contact", name: $("c-name").value.trim(), subject: $("c-subject").value,
        details: $("c-details").value.trim(), files: []
      });
      if (r.status === "cancelled") {
        say("Ton message n'a pas encore été envoyé : connecte-toi pour l'envoyer (ton brouillon est conservé).");
        return;
      }
      Draft.clear();
      status.className = "status ok"; status.replaceChildren();
      status.append(document.createTextNode("✅ Message envoyé ! Nous te répondons directement dans ta messagerie Stromtech. "));
      var b = document.createElement("button");
      b.type = "button"; b.className = "btn primary"; b.textContent = "Ouvrir ma messagerie";
      b.onclick = function () { window.Stromtech.openSpace("msg", r.conversationId, r.subject); };
      status.append(b);
      form.reset();
    } catch (err) {
      say(err && err.message ? err.message : "Une erreur est survenue pendant l'envoi.");
    } finally {
      btn.disabled = false;
    }
  });
})();
