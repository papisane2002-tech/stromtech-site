(function () {
  var SUPABASE_URL = "https://cbvpllpnrvaeaduqnpgn.supabase.co";
  var SUPABASE_KEY = "sb_publishable_zlOCLW6lX2XnRM0u8D0r9Q_rXWQPSSj";
  var SITE_URL = "https://papisane2002-tech.github.io/stromtech-site/";
  var ADMIN_ID = "c723e797-e72c-4fc0-8f6c-2e74a547370c"; // affichage uniquement : la sécurité est assurée par le RLS

  // true si on arrive depuis le lien de confirmation e-mail
  var draftPage = null;
  try {
    var dd = JSON.parse(localStorage.getItem("stromtech_draft") || "null");
    if (dd && dd.page) draftPage = dd.page;
  } catch (_) {}
  var hasDraft = !!draftPage;
  var fromMail = /access_token|type=signup/.test(window.location.hash);
  var openAfter = fromMail && !hasDraft;
  var draftFromMail = fromMail && hasDraft;

  var css = `
#sc-fab{position:fixed;right:20px;bottom:20px;z-index:9000;background:var(--a,#38d6b0);color:#07131a;border:0;border-radius:999px;padding:14px 22px;font:800 16px system-ui,sans-serif;cursor:pointer;box-shadow:0 8px 24px rgba(0,0,0,.4)}
.sc-nav-grp{display:flex;gap:10px;align-items:center}
.sc-nav-btn{border:1px solid var(--line,#ffffff20);background:#ffffff08;color:var(--txt,#f6f7ff);border-radius:12px;padding:12px 17px;font:800 16px system-ui,sans-serif;cursor:pointer}
.sc-overlay{position:fixed;inset:0;z-index:10000;background:#060a16cc;display:none;align-items:center;justify-content:center;padding:16px}
.sc-overlay.open{display:flex}
.sc-modal{position:relative;width:min(420px,100%);background:var(--panel,#141d32);color:var(--txt,#f6f7ff);border:1px solid var(--line,#ffffff20);border-radius:20px;padding:26px 24px;font:16px/1.5 system-ui,sans-serif}
.sc-modal h3{margin:0 0 14px;padding-right:30px}
.sc-x{background:none;border:0;color:var(--muted,#b8c2d9);cursor:pointer;font-size:18px;padding:4px 8px;border-radius:8px}
.sc-modal .sc-x{position:absolute;top:12px;right:12px}
.sc-tabs{display:flex;gap:6px;background:#0b1224;border-radius:12px;padding:4px;margin-bottom:14px}
.sc-tabs button{flex:1;border:0;background:none;color:var(--muted,#b8c2d9);padding:9px;border-radius:9px;font:700 14px system-ui,sans-serif;cursor:pointer}
.sc-tabs button.on{background:var(--a,#38d6b0);color:#07131a}
.sc-form-col{display:flex;flex-direction:column;gap:10px}
.sc-field{width:100%;background:#0b1224;border:1px solid var(--line,#ffffff20);color:var(--txt,#f6f7ff);border-radius:10px;padding:12px;font:inherit}
.sc-field:disabled{opacity:.6}
.sc-btn{background:var(--a,#38d6b0);color:#07131a;border:0;border-radius:12px;padding:12px 16px;font:800 15px system-ui,sans-serif;cursor:pointer}
.sc-btn.alt{background:transparent;color:var(--a,#38d6b0);border:1px solid var(--a,#38d6b0)}
.sc-btn.ghost{background:#ffffff0d;color:var(--txt,#f6f7ff);border:1px solid var(--line,#ffffff20)}
.sc-btn:disabled{opacity:.6;cursor:default}
.sc-msg{margin:0;min-height:1.2em;font-size:.92rem;color:var(--muted,#b8c2d9)}
.sc-msg.err{color:#ffb4b4}
.sc-msg.ok{color:var(--a,#38d6b0)}
.sc-muted{color:var(--muted,#b8c2d9);margin:0}
.sc-lbl{font-weight:700;font-size:.9rem;margin-top:4px}
.sc-grow{flex:1}
.sc-pad{padding:14px;display:flex;flex-direction:column;gap:10px}
#sc-space{position:fixed;inset:0;z-index:10000;background:radial-gradient(circle at 90% 0,#253363,transparent 30%),var(--bg,#0b1020);color:var(--txt,#f6f7ff);font:16px/1.5 system-ui,sans-serif;display:none;flex-direction:column}
#sc-space.open{display:flex}
.sp-top{display:flex;align-items:center;gap:12px;padding:0 18px;min-height:64px;border-bottom:1px solid var(--line,#ffffff20);background:#0b1020ee}
.sp-logo{font-size:1.3rem;font-weight:900}
.sp-logo span{color:var(--a,#38d6b0)}
.sp-badge{background:var(--a,#38d6b0);color:#07131a;font-weight:800;font-size:.75rem;padding:3px 9px;border-radius:99px}
.sp-badge[hidden]{display:none}
.sp-user{display:flex;align-items:center;gap:8px;font-weight:700}
.sp-avatar{width:34px;height:34px;border-radius:50%;background:var(--a,#38d6b0);color:#07131a;display:grid;place-items:center;font-weight:900}
.sp-top .sc-btn{padding:9px 13px;font-size:.9rem}
.sp-main{flex:1;min-height:0;display:flex}
.sp-side{width:220px;border-right:1px solid var(--line,#ffffff20);padding:16px 12px;display:flex;flex-direction:column;gap:6px}
.sp-side button{text-align:left;background:none;border:0;color:var(--muted,#b8c2d9);padding:12px 14px;border-radius:12px;font:700 15px system-ui,sans-serif;cursor:pointer}
.sp-side button.on{background:#38d6b01f;color:var(--a,#38d6b0)}
.sp-content{flex:1;min-width:0;min-height:0;overflow:auto;padding:24px;display:flex;flex-direction:column}
.sp-content.fill{overflow:hidden}
.sp-page{width:100%;max-width:820px;margin:0 auto;display:flex;flex-direction:column;gap:16px}
.sp-page h2{margin:0;font-size:1.8rem;letter-spacing:-.02em}
.sp-sub{margin:0;color:var(--muted,#b8c2d9)}
.sp-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
.sp-card{background:var(--panel,#141d32);border:1px solid var(--line,#ffffff20);border-radius:18px;padding:18px;display:flex;flex-direction:column;gap:10px}
.sp-card h3{margin:0}
.sp-stat b{display:block;font-size:1.6rem;color:var(--a,#38d6b0)}
.sp-stat span{color:var(--muted,#b8c2d9);font-size:.9rem}
.sp-actions{display:flex;flex-wrap:wrap;gap:10px}
.msg-wrap{flex:1;min-height:0;width:100%;max-width:1000px;margin:0 auto;display:grid;grid-template-columns:300px 1fr;gap:14px}
.msg-list{display:flex;flex-direction:column;gap:8px;overflow:auto;min-height:0}
.msg-chat{display:flex;flex-direction:column;min-height:0;background:var(--panel,#141d32);border:1px solid var(--line,#ffffff20);border-radius:18px;overflow:hidden}
.msg-head{display:flex;align-items:center;gap:8px;padding:12px 14px;border-bottom:1px solid var(--line,#ffffff20)}
.msg-head strong{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.msg-back{display:none}
.msg-form{display:flex;gap:8px;padding:10px 12px;border-top:1px solid var(--line,#ffffff20)}
.msg-form .sc-field{flex:1;min-width:0}
.msg-closed{padding:14px}
.sc-item{text-align:left;background:var(--panel,#141d32);border:1px solid var(--line,#ffffff20);color:var(--txt,#f6f7ff);border-radius:12px;padding:10px 12px;cursor:pointer;display:flex;flex-direction:column;gap:2px;font:inherit}
.sc-item small{color:var(--muted,#b8c2d9)}
.sc-item.on{border-color:var(--a,#38d6b0)}
.sc-msgs{flex:1;min-height:0;overflow:auto;padding:14px;display:flex;flex-direction:column;gap:8px}
.sc-bubble{max-width:80%;padding:9px 12px;border-radius:14px;white-space:pre-wrap;word-break:break-word}
.sc-bubble small{display:block;font-size:.7rem;opacity:.7;margin-top:2px}
.sc-bubble.sc-card{max-width:min(440px,92%);white-space:normal;background:#1c2a4d;color:var(--txt,#f6f7ff)}
.sc-me.sc-card{border:1px solid var(--a,#38d6b0)}
.rq{display:flex;flex-direction:column;gap:8px;min-width:230px}
.rq-badge{align-self:flex-start;font-weight:800;font-size:.8rem;padding:4px 10px;border-radius:99px;background:#38d6b022;color:var(--a,#38d6b0)}
.rq-badge.rq-realisation{background:#fbbf2422;color:#fbbf24}
.rq-badge.rq-contact{background:#60a5fa22;color:#60a5fa}
.rq-shot{display:block;width:100%;padding:0;border:1px solid var(--line,#ffffff20);border-radius:12px;overflow:hidden;aspect-ratio:4/3;background:#0b1224;cursor:zoom-in}
.rq-shot img{width:100%;height:100%;object-fit:cover;display:block}
.rq-shot.noimg{display:grid;place-items:center;cursor:default;font-size:2rem}
.rq-model{font-weight:800;font-size:1.05rem}
.rq-lbl{font-size:.7rem;letter-spacing:.08em;text-transform:uppercase;color:var(--muted,#b8c2d9);font-weight:700}
.rq-rows{display:grid;grid-template-columns:auto 1fr;gap:3px 12px;margin:0;font-size:.9rem}
.rq-rows dt{color:var(--muted,#b8c2d9)}
.rq-rows dd{margin:0;font-weight:600;word-break:break-word}
.rq-text{white-space:pre-wrap;word-break:break-word;background:#0b122466;border-radius:10px;padding:9px 11px;font-size:.92rem}
.sc-item{flex-direction:row;align-items:center;gap:10px}
.ci-thumb{flex:0 0 56px;width:56px;height:42px;border-radius:8px;object-fit:cover;background:#0b1224;display:block}
.ci-ico{display:grid;place-items:center;font-size:1.3rem;font-style:normal}
.ci-txt{display:flex;flex-direction:column;min-width:0;flex:1}
.ci-txt strong{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.ci-sub{color:var(--muted,#b8c2d9);font-size:.82rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.sc-zoom{position:fixed;inset:0;z-index:10002;background:#060a16ee;display:none;flex-direction:column;align-items:center;justify-content:center;gap:12px;padding:16px;color:var(--txt,#f6f7ff);text-align:center}
.sc-zoom.open{display:flex}
.sc-zoom img{max-width:min(980px,100%);max-height:72vh;border-radius:14px;object-fit:contain}
.sc-me{align-self:flex-end;background:var(--a,#38d6b0);color:#07131a}
.sc-other{align-self:flex-start;background:#1c2a4d}
.sc-err{color:#ffb4b4;padding:0 14px 6px;font-size:.85rem}
.sc-note{margin:0 0 12px;color:var(--muted,#b8c2d9);font-size:.9rem}
.sc-file{display:block;margin-top:6px;background:#0b102026;border:1px dashed currentColor;color:inherit;border-radius:8px;padding:6px 10px;cursor:pointer;font:inherit;text-align:left}
@media(max-width:720px){
  .sc-nav-btn{padding:10px 12px;font-size:.85rem}
  .sp-user .nm{display:none}
  #sp-site{display:none}
  .sp-main{flex-direction:column}
  .sp-side{order:2;width:auto;flex-direction:row;border-right:0;border-top:1px solid var(--line,#ffffff20);padding:8px;justify-content:space-around}
  .sp-side button{flex:1;text-align:center;padding:10px 6px;font-size:.85rem}
  .sp-content{padding:14px}
  .sp-stats{grid-template-columns:1fr}
  .msg-wrap{grid-template-columns:1fr}
  .msg-chat{display:none}
  .msg-wrap.show-chat .msg-list{display:none}
  .msg-wrap.show-chat .msg-chat{display:flex}
  .msg-back{display:inline-block}
}
`;

  var html = `
<button id="sc-fab" type="button">💬 Messagerie</button>

<div id="sc-auth" class="sc-overlay">
  <div class="sc-modal">
    <button id="sc-auth-close" class="sc-x" type="button" title="Fermer">✕</button>
    <h3 id="sc-auth-title">Connexion</h3>
    <p class="sc-note" id="sc-auth-note" hidden></p>
    <div class="sc-tabs">
      <button type="button" id="sc-tab-login" class="on">Connexion</button>
      <button type="button" id="sc-tab-signup">Créer un compte</button>
    </div>
    <div id="sc-auth-body"></div>
  </div>
</div>

<div id="sc-space">
  <div class="sp-top">
    <span class="sp-logo">strom<span>tech</span>.</span>
    <span class="sp-badge" id="sp-badge" hidden>Admin</span>
    <span class="sc-grow"></span>
    <div class="sp-user"><span class="sp-avatar" id="sp-avatar">?</span><span class="nm" id="sp-uname"></span></div>
    <button id="sp-site" class="sc-btn ghost" type="button">← Retour au site</button>
    <button id="sp-logout" class="sc-btn alt" type="button">Déconnexion</button>
  </div>
  <div class="sp-main">
    <div class="sp-side" id="sp-side">
      <button type="button" data-tab="home" class="on">🏠 Accueil</button>
      <button type="button" data-tab="msg">💬 Messages</button>
      <button type="button" data-tab="profile">👤 Mon profil</button>
    </div>
    <div class="sp-content" id="sp-content"></div>
  </div>
</div>
`;

  function mount() {
    var style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);

    var wrap = document.createElement("div");
    wrap.innerHTML = html;
    while (wrap.firstChild) document.body.appendChild(wrap.firstChild);

    var s = document.createElement("script");
    s.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";
    s.onload = init;
    document.head.appendChild(s);
  }

  function init() {
    var sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

    var fab = document.getElementById("sc-fab");
    var authOv = document.getElementById("sc-auth");
    var authTitle = document.getElementById("sc-auth-title");
    var authBody = document.getElementById("sc-auth-body");
    var tabLogin = document.getElementById("sc-tab-login");
    var tabSignup = document.getElementById("sc-tab-signup");
    var space = document.getElementById("sc-space");
    var content = document.getElementById("sp-content");
    var side = document.getElementById("sp-side");
    var badge = document.getElementById("sp-badge");
    var avatar = document.getElementById("sp-avatar");
    var uname = document.getElementById("sp-uname");

    var session = null, tab = "home";
    var pendingQuote = null, authNote = document.getElementById("sc-auth-note");
    var convs = [], conv = null, startNew = false, ui = {}, timer = null, tick = 0;
    var accBtn = null;

    function el(tag, cls, text) {
      var e = document.createElement(tag);
      if (cls) e.className = cls;
      if (text !== undefined && text !== null) e.textContent = text;
      return e;
    }
    function field(type, ph, ac) {
      var i = el("input", "sc-field");
      i.type = type; i.placeholder = ph; i.autocomplete = ac;
      return i;
    }
    function frErr(m) {
      m = String(m || "");
      if (/invalid login credentials/i.test(m)) return "E-mail ou mot de passe incorrect.";
      if (/email not confirmed/i.test(m)) return "Confirme d'abord ton e-mail (vérifie ta boîte mail et les spams).";
      if (/already registered/i.test(m)) return "Un compte existe déjà avec cet e-mail. Connecte-toi.";
      if (/at least 6/i.test(m)) return "Le mot de passe doit contenir au moins 6 caractères.";
      if (/rate limit|too many/i.test(m)) return "Trop de tentatives. Réessaie dans quelques minutes.";
      if (/invalid email|unable to validate email/i.test(m)) return "Adresse e-mail invalide.";
      if (/bucket not found/i.test(m)) return "Le stockage de fichiers n'est pas encore configuré.";
      if (/mime type|not supported/i.test(m)) return "Seuls les fichiers PDF sont acceptés.";
      if (/maximum allowed size|too large|payload too large/i.test(m)) return "Fichier trop volumineux (5 Mo maximum).";
      if (/row-level security/i.test(m)) return "Envoi du fichier refusé : vérifie que tu es bien connecté.";
      return m || "Une erreur est survenue.";
    }

    function isAdmin() { return !!session && session.user.id === ADMIN_ID; }
    function displayName() {
      var u = session.user, md = u.user_metadata || {};
      return md.full_name || (u.email || "").split("@")[0] || "Client";
    }
    function firstName() { return displayName().split(" ")[0]; }

    async function call(payload) {
      var res = await sb.functions.invoke("chat", { body: payload });
      if (res.error) {
        var msg = res.error.message;
        try {
          var j = await res.error.context.json();
          if (j && j.error) msg = j.error;
        } catch (_) {}
        throw new Error(msg);
      }
      return res.data;
    }

    function stopPolling() { clearInterval(timer); timer = null; }

    /* ---------- Pièces jointes (PDF) ---------- */
    function fileBtn(path, name) {
      var b = el("button", "sc-file", "📎 " + name);
      b.type = "button";
      b.onclick = async function () {
        b.disabled = true;
        var r = await sb.storage.from("project-files").createSignedUrl(path, 300);
        b.disabled = false;
        if (r.error || !r.data) { b.textContent = "⚠️ Fichier indisponible"; return; }
        var a = document.createElement("a");
        a.href = r.data.signedUrl; a.target = "_blank"; a.rel = "noopener";
        document.body.appendChild(a); a.click(); a.remove();
      };
      return b;
    }
    /* ---------- Demandes : carte avec le modèle choisi ---------- */
    var KINDS = {
      devis: { icon: "📋", label: "Demande de devis", short: "Devis" },
      realisation: { icon: "🛠️", label: "Demande de réalisation", short: "Réalisation" },
      contact: { icon: "✉️", label: "Message de contact", short: "Contact" }
    };
    function slug(n) {
      return String(n).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    }
    function modelImg(name) { return "modeles/" + slug(name) + ".jpg"; }

    function parseSubject(subj) {
      var p = String(subj || "").split(" · ");
      var k = p[0] === "Devis" ? "devis" : p[0] === "Réalisation" ? "realisation" : p[0] === "Contact" ? "contact" : null;
      if (!k) return null;
      if (k === "contact") return { kind: k, topic: p[1] || "", name: p.slice(2).join(" · ") };
      if (p.length >= 4) return { kind: k, service: p[1], model: p[2], name: p.slice(3).join(" · ") };
      return { kind: k, service: p[1] || "", model: "", name: p.slice(2).join(" · ") };
    }
    function convView(c) {
      var s = parseSubject(c.subject);
      if (!s) return { title: c.subject, sub: "", model: "", icon: "💬" };
      var K = KINDS[s.kind];
      if (s.kind === "contact") return { icon: K.icon, title: "Contact" + (s.topic ? " · " + s.topic : ""), sub: isAdmin() ? s.name : "", model: "" };
      return {
        icon: K.icon, model: s.model, title: s.model || s.service,
        sub: [K.short, s.model ? s.service : "", isAdmin() ? s.name : ""].filter(Boolean).join(" · ")
      };
    }
    function thumbFor(v) {
      if (v.model) {
        var im = document.createElement("img");
        im.className = "ci-thumb"; im.src = modelImg(v.model); im.alt = ""; im.loading = "lazy";
        im.onerror = function () { im.replaceWith(el("span", "ci-thumb ci-ico", v.icon)); };
        return im;
      }
      return el("span", "ci-thumb ci-ico", v.icon);
    }
    function convItem(c, on) {
      var v = convView(c);
      var b = el("button", "sc-item" + (on ? " on" : "")); b.type = "button";
      var txt = el("div", "ci-txt");
      txt.append(el("strong", null, v.title));
      if (v.sub) txt.append(el("span", "ci-sub", v.sub));
      txt.append(el("small", null, new Date(c.updated_at).toLocaleString("fr-FR") + (c.status === "open" ? "" : " · fermée")));
      b.append(thumbFor(v), txt);
      return b;
    }

    function parseRequest(body) {
      var lines = String(body).split("\n");
      var first = lines[0].replace(/\uFE0F/g, "");
      var kind = /Demande de devis$/.test(first) ? "devis" : /Demande de réalisation$/.test(first) ? "realisation" : /Message de contact$/.test(first) ? "contact" : null;
      if (!kind) return null;
      var o = { kind: kind }, i = 1;
      for (; i < lines.length; i++) {
        var m = /^(Nom|Téléphone|Service|Modèle|Budget|Délai|Sujet|Projet) : (.*)$/.exec(lines[i]);
        if (!m) break;
        if (m[1] === "Projet") { o.projet = [m[2]].concat(lines.slice(i + 1)).join("\n").trim(); i = lines.length; break; }
        o[m[1]] = m[2];
      }
      if (o.projet === undefined) o.projet = lines.slice(i).join("\n").trim();
      return o;
    }

    var zoomEl = null;
    function zoom(src, name) {
      if (!zoomEl) {
        zoomEl = el("div", "sc-zoom");
        var im = document.createElement("img"), cap = el("strong", null, ""), x = el("button", "sc-btn alt", "Fermer");
        x.type = "button";
        zoomEl.append(im, cap, x);
        zoomEl.onclick = function (e) { if (e.target.tagName !== "IMG") zoomEl.classList.remove("open"); };
        document.body.appendChild(zoomEl);
      }
      zoomEl.querySelector("img").src = src;
      zoomEl.querySelector("strong").textContent = name;
      zoomEl.classList.add("open");
    }

    function requestCard(o) {
      var K = KINDS[o.kind], card = el("div", "rq");
      card.append(el("div", "rq-badge rq-" + o.kind, K.icon + " " + K.label));
      var model = o["Modèle"];
      if (model) {
        var fig = el("button", "rq-shot"); fig.type = "button"; fig.title = "Agrandir";
        var im = document.createElement("img");
        im.src = modelImg(model); im.alt = "Modèle " + model; im.loading = "lazy";
        im.onerror = function () { fig.classList.add("noimg"); im.remove(); fig.append(document.createTextNode("🖼️")); };
        fig.append(im);
        fig.onclick = function () { if (!fig.classList.contains("noimg")) zoom(im.src, model); };
        card.append(el("div", "rq-lbl", "Modèle choisi"), fig, el("div", "rq-model", model));
      }
      var rows = el("dl", "rq-rows");
      [["Client", "Nom"], ["Téléphone", "Téléphone"], ["Service", "Service"], ["Sujet", "Sujet"], ["Budget", "Budget"], ["Délai", "Délai"]].forEach(function (r) {
        if (o[r[1]]) rows.append(el("dt", null, r[0]), el("dd", null, o[r[1]]));
      });
      card.append(rows);
      if (o.projet) card.append(el("div", "rq-lbl", o.kind === "contact" ? "Message" : "Projet"), el("div", "rq-text", o.projet));
      return card;
    }

    function renderBody(bub, body) {
      var rq = parseRequest(body);
      if (rq) { bub.classList.add("sc-card"); bub.append(requestCard(rq)); return; }
      var buf = [];
      function flush() { if (buf.length) { bub.append(el("span", null, buf.join("\n"))); buf = []; } }
      String(body).split("\n").forEach(function (l) {
        var m = /^\[\[file:(.+)\|(.+)\]\]$/.exec(l);
        if (m) { flush(); bub.append(fileBtn(m[1], m[2])); } else buf.push(l);
      });
      flush();
    }

    /* ---------- Demande de devis envoyée dans la messagerie ---------- */
    async function processQuote(p) {
      var real = p.type === "realisation", contact = p.type === "contact", lines;
      if (contact) {
        lines = ["✉️ Message de contact", "Nom : " + p.name, "Sujet : " + p.subject, "", p.details];
      } else {
        lines = [real ? "🛠️ Demande de réalisation" : "📋 Demande de devis", "Nom : " + p.name];
        if (p.phone) lines.push("Téléphone : " + p.phone);
        lines.push("Service : " + p.service);
        if (p.model) lines.push("Modèle : " + p.model);
        lines.push("Budget : " + p.budget, "Délai : " + p.deadline, "Projet : " + p.details);
      }
      var body = lines.join("\n");
      if (body.length > 2000) throw new Error("Ton message est trop long (" + p.details.length + " caractères). Raccourcis-le" + (contact ? "." : " ou mets le détail dans un PDF."));
      var uid = session.user.id, up = [];
      for (var i = 0; i < p.files.length; i++) {
        var f = p.files[i];
        var safe = f.name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(-80);
        var path = uid + "/" + Date.now() + "-" + i + "-" + safe;
        var r = await sb.storage.from("project-files").upload(path, f, { contentType: "application/pdf", upsert: false });
        if (r.error) throw new Error("Envoi de « " + f.name + " » impossible : " + frErr(r.error.message));
        up.push({ path: path, name: f.name.replace(/[|\[\]\r\n]/g, "").slice(0, 60) });
      }
      var subject = contact ? ("Contact · " + p.subject + " · " + p.name).slice(0, 120) : ((real ? "Réalisation · " : "Devis · ") + p.service + (p.model ? " · " + p.model : "") + " · " + p.name).slice(0, 120);
      var d1 = await call({ action: "send", subject: subject, body: body });
      var cid = d1.message.conversation_id;
      if (up.length) {
        await call({ action: "send", conversation_id: cid, body: up.map(function (x) { return "[[file:" + x.path + "|" + x.name + "]]"; }).join("\n") });
      }
      return { status: "sent", count: up.length, conversationId: cid, subject: subject };
    }
    function submitQuote(payload) {
      if (session) return processQuote(payload);
      if (pendingQuote) { var old = pendingQuote; pendingQuote = null; old.resolve({ status: "cancelled" }); }
      return new Promise(function (resolve, reject) {
        pendingQuote = { payload: payload, resolve: resolve, reject: reject };
        openAuth("login", "Connecte-toi (ou crée un compte) pour envoyer ta demande : nous te répondrons directement dans ta messagerie Stromtech.");
      });
    }

    /* ---------- Connexion / inscription ---------- */
    function openAuth(mode, note) {
      authNote.textContent = note || "";
      authNote.hidden = !note;
      renderAuth(mode || "login");
      authOv.classList.add("open");
    }
    function closeAuth() {
      authOv.classList.remove("open");
      if (pendingQuote && !session) {
        var q = pendingQuote; pendingQuote = null;
        q.resolve({ status: "cancelled" });
      }
    }

    function renderAuth(mode) {
      tabLogin.classList.toggle("on", mode === "login");
      tabSignup.classList.toggle("on", mode === "signup");
      authTitle.textContent = mode === "login" ? "Content de te revoir 👋" : "Crée ton espace Stromtech";
      authBody.replaceChildren();
      var f = el("form", "sc-form-col");
      var name = null;
      if (mode === "signup") { name = field("text", "Nom complet", "name"); f.append(name); }
      var email = field("email", "Adresse e-mail", "email");
      var pass = field("password", "Mot de passe (6 caractères min.)", mode === "login" ? "current-password" : "new-password");
      var msg = el("p", "sc-msg");
      var submit = el("button", "sc-btn", mode === "login" ? "Se connecter" : "Créer mon compte");
      submit.type = "submit";
      f.append(email, pass, submit, msg);
      f.onsubmit = async function (ev) {
        ev.preventDefault();
        var em = email.value.trim();
        if (!em || !pass.value || (name && !name.value.trim())) {
          msg.className = "sc-msg err"; msg.textContent = "Remplis tous les champs."; return;
        }
        submit.disabled = true; msg.className = "sc-msg"; msg.textContent = "…";
        openAfter = true;
        try {
          if (mode === "login") {
            var r = await sb.auth.signInWithPassword({ email: em, password: pass.value });
            if (r.error) throw r.error;
          } else {
            var r2 = await sb.auth.signUp({
              email: em,
              password: pass.value,
              options: { emailRedirectTo: SITE_URL, data: { full_name: name.value.trim() } }
            });
            if (r2.error) throw r2.error;
            if (r2.data.user && r2.data.user.identities && r2.data.user.identities.length === 0) {
              throw new Error("User already registered");
            }
            if (!r2.data.session) {
              openAfter = false;
              msg.className = "sc-msg ok";
              msg.textContent = "Compte créé ✅ Vérifie ta boîte mail (et les spams) pour confirmer ton adresse, puis connecte-toi." + (pendingQuote ? " Ton brouillon est conservé : reviens ensuite sur le formulaire pour envoyer ta demande." : "");
            }
          }
        } catch (e) {
          openAfter = false;
          msg.className = "sc-msg err"; msg.textContent = frErr(e.message);
        } finally {
          submit.disabled = false;
        }
      };
      authBody.append(f);
    }

    /* ---------- Espace personnel ---------- */
    function openSpace(t) {
      space.classList.add("open");
      document.body.style.overflow = "hidden";
      refreshUserUI();
      setTab(t || "home");
    }
    function closeSpace() {
      space.classList.remove("open");
      document.body.style.overflow = "";
      stopPolling();
    }

    function refreshUserUI() {
      if (!session) return;
      var n = displayName();
      avatar.textContent = n.charAt(0).toUpperCase();
      uname.textContent = n;
      badge.hidden = !isAdmin();
    }

    function updateAccountUI() {
      var inn = !!session;
      fab.textContent = inn ? "💬 Messages" : "💬 Messagerie";
      if (accBtn) accBtn.textContent = inn ? "👤 Mon espace" : "👤 Connexion";
    }

    function setTab(t) {
      tab = t;
      stopPolling();
      Array.prototype.forEach.call(side.querySelectorAll("button"), function (b) {
        b.classList.toggle("on", b.getAttribute("data-tab") === t);
      });
      content.classList.toggle("fill", t === "msg");
      content.replaceChildren();
      if (t === "home") renderHome();
      else if (t === "msg") renderMessages();
      else renderProfile();
    }

    function statCard(label) {
      var c = el("div", "sp-card sp-stat");
      var v = el("b", null, "…");
      c.append(v, el("span", null, label));
      return { root: c, set: function (x) { v.textContent = x; } };
    }

    async function renderHome() {
      var page = el("div", "sp-page");
      page.append(el("h2", null, "Bonjour, " + firstName() + " 👋"));
      page.append(el("p", "sp-sub", isAdmin()
        ? "Espace administrateur : toutes les conversations clients sont dans « Messages »."
        : "Bienvenue dans ton espace Stromtech. Retrouve ici tes échanges avec nous et gère ton profil."));

      var stats = el("div", "sp-stats");
      var s1 = statCard("Conversations"), s2 = statCard("En cours"), s3 = statCard("Dernière activité");
      stats.append(s1.root, s2.root, s3.root);
      page.append(stats);

      var actions = el("div", "sp-actions");
      var a1 = el("button", "sc-btn", "✉️ Écrire à Stromtech"); a1.type = "button";
      a1.onclick = function () { conv = null; startNew = true; setTab("msg"); };
      var a2 = el("button", "sc-btn alt", "📝 Faire une demande"); a2.type = "button";
      a2.onclick = function () { window.location.href = "services.html"; };
      actions.append(a1, a2);
      page.append(actions);

      var recent = el("div", "sp-card");
      recent.append(el("h3", null, "Conversations récentes"));
      var list = el("div", "sc-form-col");
      list.append(el("p", "sc-muted", "Chargement…"));
      recent.append(list);
      page.append(recent);
      content.replaceChildren(page);

      try {
        var data = await call({ action: "list" });
        convs = data.conversations || [];
        s1.set(String(convs.length));
        s2.set(String(convs.filter(function (c) { return c.status === "open"; }).length));
        s3.set(convs.length ? new Date(convs[0].updated_at).toLocaleDateString("fr-FR") : "—");
        list.replaceChildren();
        if (!convs.length) list.append(el("p", "sc-muted", "Aucune conversation pour le moment. Écris-nous pour démarrer !"));
        convs.slice(0, 3).forEach(function (c) {
          var b = convItem(c, false);
          b.onclick = function () { conv = c; startNew = false; setTab("msg"); };
          list.append(b);
        });
      } catch (e) {
        s1.set("—"); s2.set("—"); s3.set("—");
        list.replaceChildren(el("p", "sc-msg err", frErr(e.message)));
      }
    }

    /* ----- Messages ----- */
    async function renderMessages() {
      var wrap = el("div", "msg-wrap");
      var listCol = el("div", "msg-list");
      var chatCol = el("div", "msg-chat");
      wrap.append(listCol, chatCol);
      content.replaceChildren(wrap);
      ui = { wrap: wrap, listCol: listCol, chatCol: chatCol, box: null, stick: true };
      drawList();
      if (conv) openConv(conv);
      else if (startNew) openNew();
      else placeholder();
      await refreshList();
      if (tab !== "msg") return;
      stopPolling();
      timer = setInterval(onTick, 6000);
    }

    function placeholder() {
      ui.chatCol.replaceChildren(el("p", "sc-muted msg-closed", "Choisis une conversation ou démarre-en une nouvelle."));
    }

    async function refreshList() {
      try {
        var data = await call({ action: "list" });
        convs = data.conversations || [];
        if (conv) {
          var fresh = convs.filter(function (c) { return c.id === conv.id; })[0];
          if (fresh) conv = fresh;
        }
        if (tab === "msg") drawList();
      } catch (e) {
        if (tab === "msg" && ui.listCol) ui.listCol.append(el("p", "sc-msg err", frErr(e.message)));
      }
    }

    function drawList() {
      ui.listCol.replaceChildren();
      var nb = el("button", "sc-btn", "+ Nouvelle conversation");
      nb.type = "button";
      nb.onclick = function () { conv = null; startNew = true; drawList(); openNew(); };
      ui.listCol.append(nb);
      if (!convs.length) ui.listCol.append(el("p", "sc-muted", "Aucune conversation pour le moment."));
      convs.forEach(function (c) {
        var b = convItem(c, !!(conv && conv.id === c.id));
        b.onclick = function () { conv = c; startNew = false; drawList(); openConv(c); };
        ui.listCol.append(b);
      });
    }

    function chatHead(text, c) {
      var h = el("div", "msg-head");
      var back = el("button", "sc-x msg-back", "←");
      back.type = "button";
      back.onclick = function () { ui.wrap.classList.remove("show-chat"); };
      h.append(back);
      if (c) {
        var v = convView(c), t = el("div", "ci-txt");
        t.append(el("strong", null, v.title));
        if (v.sub) t.append(el("span", "ci-sub", v.sub));
        if (v.model) h.append(thumbFor(v));
        h.append(t);
      } else h.append(el("strong", null, text));
      return h;
    }

    function composer(err, subj) {
      var f = el("form", "msg-form");
      var inp = el("input", "sc-field");
      inp.placeholder = "Écris ton message…"; inp.maxLength = 2000; inp.autocomplete = "off";
      var btn = el("button", "sc-btn", "Envoyer");
      btn.type = "submit";
      f.append(inp, btn);
      f.onsubmit = function (ev) {
        ev.preventDefault();
        var t = inp.value.trim();
        if (t) send(t, subj, err, btn, inp);
      };
      return f;
    }

    function openConv(c) {
      ui.wrap.classList.add("show-chat");
      ui.chatCol.replaceChildren();
      var box = el("div", "sc-msgs");
      var err = el("div", "sc-err");
      ui.chatCol.append(chatHead(null, c), box, err);
      if (c.status === "open" || isAdmin()) ui.chatCol.append(composer(err, null));
      else ui.chatCol.append(el("p", "sc-muted msg-closed", "Cette conversation est fermée. Démarre-en une nouvelle pour continuer."));
      ui.box = box; ui.stick = true;
      loadMessages();
    }

    function openNew() {
      ui.wrap.classList.add("show-chat");
      ui.chatCol.replaceChildren();
      var err = el("div", "sc-err");
      var subj = el("input", "sc-field");
      subj.placeholder = "Sujet (ex. Site vitrine pour mon restaurant)"; subj.maxLength = 80;
      var info = el("div", "sc-pad");
      info.append(el("p", "sc-muted", "Décris ton besoin : nous te répondons directement ici, dans ton espace."), subj);
      ui.chatCol.append(chatHead("Nouvelle conversation"), info, el("div", "sc-grow"), err, composer(err, subj));
      ui.box = null;
    }

    async function loadMessages() {
      if (!conv || !ui.box || !session) return;
      var id = conv.id;
      try {
        var data = await call({ action: "list", conversation_id: id });
        if (!conv || conv.id !== id || !ui.box) return;
        var b = ui.box;
        var atBottom = b.scrollHeight - b.scrollTop - b.clientHeight < 60;
        b.replaceChildren();
        if (!data.messages.length) b.append(el("p", "sc-muted", "Aucun message."));
        data.messages.forEach(function (m) {
          var mine = m.sender_id === session.user.id;
          var bub = el("div", "sc-bubble " + (mine ? "sc-me" : "sc-other"));
          renderBody(bub, m.body);
          bub.append(el("small", null, new Date(m.created_at).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })));
          b.append(bub);
        });
        if (ui.stick || atBottom) { b.scrollTop = b.scrollHeight; ui.stick = false; }
      } catch (_) { /* silencieux */ }
    }

    async function send(text, subjIn, err, btn, inp) {
      err.textContent = ""; btn.disabled = true;
      try {
        var payload = { action: "send", body: text };
        if (conv) payload.conversation_id = conv.id;
        else {
          var base = (subjIn && subjIn.value.trim()) || "Nouvelle demande";
          payload.subject = (base + " · " + displayName()).slice(0, 120);
        }
        var data = await call(payload);
        inp.value = "";
        if (!conv) {
          conv = { id: data.message.conversation_id, subject: payload.subject, status: "open", updated_at: new Date().toISOString() };
          startNew = false;
          await refreshList();
          if (tab === "msg") openConv(conv);
          return;
        }
        ui.stick = true;
        await loadMessages();
      } catch (e) {
        err.textContent = frErr(e.message);
      } finally {
        btn.disabled = false;
      }
    }

    function onTick() {
      if (document.hidden || tab !== "msg" || !space.classList.contains("open")) return;
      tick++;
      loadMessages();
      if (tick % 5 === 0) refreshList();
    }

    /* ----- Profil ----- */
    function renderProfile() {
      var u = session.user, md = u.user_metadata || {};
      var page = el("div", "sp-page");
      page.append(el("h2", null, "Mon profil"));

      var card = el("div", "sp-card");
      card.append(el("h3", null, "Mes informations"));
      var name = field("text", "Nom complet", "name"); name.value = md.full_name || "";
      var phone = field("tel", "Téléphone", "tel"); phone.value = md.phone || "";
      var mail = field("email", "Email", "email"); mail.value = u.email || ""; mail.disabled = true;
      var msg = el("p", "sc-msg");
      var save = el("button", "sc-btn", "Enregistrer"); save.type = "button";
      save.onclick = async function () {
        save.disabled = true; msg.className = "sc-msg"; msg.textContent = "…";
        var r = await sb.auth.updateUser({ data: { full_name: name.value.trim(), phone: phone.value.trim() } });
        save.disabled = false;
        if (r.error) { msg.className = "sc-msg err"; msg.textContent = frErr(r.error.message); }
        else { msg.className = "sc-msg ok"; msg.textContent = "Profil mis à jour ✅"; }
      };
      card.append(el("label", "sc-lbl", "Nom complet"), name, el("label", "sc-lbl", "Téléphone"), phone, el("label", "sc-lbl", "Email"), mail, save, msg);

      var card2 = el("div", "sp-card");
      card2.append(el("h3", null, "Sécurité"));
      var np = field("password", "Nouveau mot de passe (6 caractères min.)", "new-password");
      var msg2 = el("p", "sc-msg");
      var chg = el("button", "sc-btn alt", "Changer le mot de passe"); chg.type = "button";
      chg.onclick = async function () {
        if (np.value.length < 6) { msg2.className = "sc-msg err"; msg2.textContent = "Au moins 6 caractères."; return; }
        chg.disabled = true; msg2.className = "sc-msg"; msg2.textContent = "…";
        var r = await sb.auth.updateUser({ password: np.value });
        chg.disabled = false;
        if (r.error) { msg2.className = "sc-msg err"; msg2.textContent = frErr(r.error.message); }
        else { np.value = ""; msg2.className = "sc-msg ok"; msg2.textContent = "Mot de passe modifié ✅"; }
      };
      card2.append(np, chg, msg2);

      page.append(card, card2);
      content.replaceChildren(page);
    }

    /* ---------- Branchements ---------- */
    var nav = document.querySelector("header nav");
    var cta = nav && nav.querySelector("a.btn");
    if (nav && cta) {
      accBtn = el("button", "sc-nav-btn", "👤 Connexion");
      accBtn.type = "button";
      var grp = el("div", "sc-nav-grp");
      nav.insertBefore(grp, cta);
      grp.append(accBtn, cta);
      accBtn.onclick = function () { session ? openSpace("home") : openAuth("login"); };
    }

    fab.onclick = function () { session ? openSpace("msg") : openAuth("login"); };
    tabLogin.onclick = function () { renderAuth("login"); };
    tabSignup.onclick = function () { renderAuth("signup"); };
    document.getElementById("sc-auth-close").onclick = closeAuth;
    authOv.addEventListener("click", function (ev) { if (ev.target === authOv) closeAuth(); });
    document.getElementById("sp-site").onclick = closeSpace;
    document.getElementById("sp-logout").onclick = function () { sb.auth.signOut(); };
    side.addEventListener("click", function (ev) {
      var b = ev.target.closest("button[data-tab]");
      if (b) { if (b.getAttribute("data-tab") !== "msg") { conv = null; startNew = false; } setTab(b.getAttribute("data-tab")); }
    });
    document.addEventListener("keydown", function (ev) {
      if (ev.key === "Escape") { if (zoomEl && zoomEl.classList.contains("open")) zoomEl.classList.remove("open"); else if (authOv.classList.contains("open")) closeAuth(); else if (space.classList.contains("open")) closeSpace(); }
    });

    sb.auth.onAuthStateChange(function (evt, s) {
      var was = !!session;
      session = s;
      updateAccountUI();
      if (!s) {
        conv = null; convs = []; startNew = false;
        setTimeout(closeSpace, 0);
      } else if (!was && pendingQuote) {
        var q = pendingQuote; pendingQuote = null; openAfter = false;
        setTimeout(function () {
          closeAuth();
          processQuote(q.payload).then(q.resolve, q.reject);
        }, 0);
      } else if (!was && openAfter) {
        openAfter = false;
        setTimeout(function () { closeAuth(); openSpace("home"); }, 0);
      } else if (!was && draftFromMail) {
        draftFromMail = false;
        setTimeout(function () { window.location.href = draftPage + ".html"; }, 0);
      } else if (evt === "USER_UPDATED") {
        refreshUserUI();
      }
    });

    window.Stromtech = {
      submitQuote: submitQuote,
      openSpace: function (t, cid, subj) {
        if (!session) { openAuth("login"); return; }
        if (cid) { conv = { id: cid, subject: subj || "Conversation", status: "open", updated_at: new Date().toISOString() }; startNew = false; }
        openSpace(t || "home");
      }
    };
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount);
  else mount();
})();
