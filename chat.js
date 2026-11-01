/* Messagerie : role = "client" ou "admin" */
async function initMessaging(role) {
  var $ = function (id) { return document.getElementById(id); };
  var C = window.STROMTECH, isAdmin = role === "admin";
  var warn = $("warn");
  if (!window.cfgOk) { showMsg(warn, "Configuration manquante : renseigne config.js (URL Supabase, clé anon, ADMIN_ID).", true); return; }

  var s = (await sb.auth.getSession()).data.session;
  if (!s) { location.replace("connexion.html?next=" + encodeURIComponent(isAdmin ? "admin.html" : "espace.html" + location.search)); return; }
  var user = s.user;
  if (isAdmin && user.id !== C.ADMIN_ID) { location.replace("espace.html"); return; }
  if (!isAdmin && user.id === C.ADMIN_ID) { location.replace("admin.html"); return; }

  var current = null, channel = null, poll = null, shown = 0, threads = [];
  $("logout").addEventListener("click", async function () { await sb.auth.signOut(); location.replace("connexion.html"); });

  function view(name) {
    if ($("newView")) $("newView").hidden = name !== "new";
    if (!$("emptyView")) return;
    $("chatView").hidden = name !== "chat";
    $("emptyView").hidden = name !== "empty";
  }

  function addText(node, text) {
    text.split(/(https?:\/\/\S+)/).forEach(function (part) {
      var ok = false;
      if (/^https?:\/\//.test(part)) { try { ok = new URL(part).origin === location.origin; } catch (e) {} }
      if (ok) { var a = document.createElement("a"); a.href = part; a.textContent = "Ouvrir la maquette"; a.target = "_blank"; a.rel = "noopener"; a.style.color = "inherit"; a.style.fontWeight = "700"; a.style.textDecoration = "underline"; node.appendChild(a); }
      else node.appendChild(document.createTextNode(part));
    });
  }

  async function loadThreads() {
    var q = sb.from("conversations").select("id,subject,status,updated_at,created_at").order("updated_at", { ascending: false });
    if (!isAdmin) q = q.eq("customer_id", user.id);
    var r = await q;
    if (r.error) { showMsg(warn, "Impossible de charger les conversations : " + r.error.message, true); return; }
    threads = r.data || [];
    var ul = $("list"); ul.textContent = "";
    var f = $("filter") ? $("filter").value : "all";
    var shownList = threads.filter(function (t) { return f === "all" || t.status === f; });
    if (!shownList.length) { var p = document.createElement("p"); p.className = "empty"; p.textContent = isAdmin ? "Aucune conversation." : "Aucune demande pour l’instant."; ul.appendChild(p); }
    shownList.forEach(function (t) {
      var li = document.createElement("li"), b = document.createElement("button");
      b.type = "button"; if (current === t.id) b.setAttribute("aria-current", "true");
      var name = document.createElement("span"); name.textContent = t.subject || "Conversation";
      var badge = document.createElement("span"); badge.className = "badge" + (t.status === "closed" ? " closed" : ""); badge.textContent = t.status === "closed" ? "Terminée" : "En cours";
      var d = document.createElement("small"); d.textContent = fmtDate(t.updated_at || t.created_at);
      b.append(name, badge, d); b.addEventListener("click", function () { openThread(t.id); });
      li.appendChild(b); ul.appendChild(li);
    });
  }

  async function loadMsgs() {
    if (!current) return;
    var r = await sb.from("messages").select("id,sender_id,body,created_at").eq("conversation_id", current).order("created_at", { ascending: true });
    if (r.error) { showMsg(warn, "Impossible de charger les messages : " + r.error.message, true); return; }
    var box = $("msgs"), data = r.data || [];
    if (data.length === shown) return;
    var atBottom = box.scrollHeight - box.scrollTop - box.clientHeight < 80 || shown === 0;
    box.textContent = "";
    data.forEach(function (m) {
      var d = document.createElement("div"); d.className = "bubble" + (m.sender_id === user.id ? " mine" : "");
      addText(d, m.body);
      var t = document.createElement("time"); t.textContent = fmtDate(m.created_at); d.appendChild(t);
      box.appendChild(d);
    });
    shown = data.length;
    if (atBottom) box.scrollTop = box.scrollHeight;
  }

  async function openThread(id) {
    current = id; shown = 0; showMsg(warn, "");
    var t = threads.filter(function (x) { return x.id === id; })[0] || {};
    $("chatTitle").textContent = t.subject || "Conversation";
    if ($("toggleStatus")) $("toggleStatus").textContent = t.status === "closed" ? "Rouvrir" : "Marquer comme terminée";
    $("msgs").textContent = ""; view("chat");
    if (channel) sb.removeChannel(channel);
    channel = sb.channel("msgs-" + id).on("postgres_changes", { event: "INSERT", schema: "public", table: "messages", filter: "conversation_id=eq." + id }, loadMsgs).subscribe();
    clearInterval(poll); poll = setInterval(loadMsgs, 10000);
    await loadMsgs(); loadThreads();
  }

  $("send").addEventListener("submit", async function (e) {
    e.preventDefault();
    var ta = $("body"), text = ta.value.trim(); if (!text || !current) return;
    var btn = e.submitter; btn.disabled = true;
    var r = await sb.from("messages").insert({ conversation_id: current, sender_id: user.id, body: text });
    btn.disabled = false;
    if (r.error) { showMsg(warn, "Message non envoyé : " + r.error.message, true); return; }
    ta.value = ""; showMsg(warn, "");
    sb.from("conversations").update({ updated_at: new Date().toISOString() }).eq("id", current).then(function () {});
    await loadMsgs(); loadThreads();
  });
  $("body").addEventListener("keydown", function (e) { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); $("send").requestSubmit(); } });

  if (isAdmin) {
    $("filter").addEventListener("change", loadThreads);
    $("toggleStatus").addEventListener("click", async function () {
      var t = threads.filter(function (x) { return x.id === current; })[0]; if (!t) return;
      var next = t.status === "closed" ? "open" : "closed";
      var r = await sb.from("conversations").update({ status: next }).eq("id", current);
      if (r.error) { showMsg(warn, "Statut non modifié : " + r.error.message, true); return; }
      await loadThreads(); openThread(current);
    });
    sb.channel("admin-all").on("postgres_changes", { event: "INSERT", schema: "public", table: "messages" }, function () { loadThreads(); loadMsgs(); }).subscribe();
    setInterval(loadThreads, 20000);
  } else {
    $("newBtn").addEventListener("click", function () { current = null; clearInterval(poll); view("new"); loadThreads(); });
    var qs = new URLSearchParams(location.search).get("service");
    if (qs && $("service")) $("service").value = qs;
    $("quote").addEventListener("submit", async function (e) {
      e.preventDefault();
      var v = function (id) { return $(id).value; }, btn = e.submitter; btn.disabled = true;
      var meta = user.user_metadata || {}, who = meta.name || user.email;
      var c = await sb.from("conversations").insert({ customer_id: user.id, subject: v("service") + " · " + who }).select("id").single();
      if (c.error) { btn.disabled = false; showMsg(warn, "Demande non envoyée : " + c.error.message, true); return; }
      var body = ["Service : " + v("service"), "Budget : " + v("budget"), "Délai : " + v("deadline"), meta.phone ? "Téléphone : " + meta.phone : null, "", v("details")].filter(function (x) { return x !== null; }).join("\n");
      var m = await sb.from("messages").insert({ conversation_id: c.data.id, sender_id: user.id, body: body });
      btn.disabled = false;
      if (m.error) { showMsg(warn, "Demande créée mais message non envoyé : " + m.error.message, true); }
      $("quote").reset(); await loadThreads(); openThread(c.data.id);
    });
  }

  await loadThreads();
  var op = new URLSearchParams(location.search).get("open"), hit = op && threads.some(function (t) { return t.id === op; });
  if (!isAdmin) { hit ? openThread(op) : (threads.length && !qs ? openThread(threads[0].id) : view("new")); }
  else { threads.length ? openThread(threads[0].id) : view("empty"); }
}
