/* Outils communs : client Supabase + helpers */
(function () {
  var C = window.STROMTECH || {};
  var ready = !/VOTRE|UUID-ADMIN/.test((C.SUPABASE_URL || "") + (C.SUPABASE_ANON_KEY || "") + (C.ADMIN_ID || ""));
  window.cfgOk = ready && !!window.supabase;
  window.sb = window.cfgOk ? window.supabase.createClient(C.SUPABASE_URL, C.SUPABASE_ANON_KEY) : null;
  window.safeNext = function (n) {
    return /^[a-z0-9-]+\.html(\?[a-zA-Z0-9=&%_.-]*)?$/.test(n || "") ? n : null;
  };
  window.fmtDate = function (iso) {
    try { return new Date(iso).toLocaleString("fr-FR", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" }); }
    catch (e) { return ""; }
  };
  window.showMsg = function (el, text, isErr) {
    el.textContent = text; el.hidden = !text; el.classList.toggle("err", !!isErr);
  };
  var yr = document.getElementById("year"); if (yr) yr.textContent = new Date().getFullYear();
})();
