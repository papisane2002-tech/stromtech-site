/* Éléments communs à toutes les pages : menu mobile, apparition au défilement, brouillon de formulaire */
(function () {
  var seg = (location.pathname.split("/").pop() || "index").replace(/\.html$/, "") || "index";

  window.Draft = {
    page: seg,
    save: function (extra) {
      try {
        var o = Object.assign({ page: seg }, extra || {});
        document.querySelectorAll("[data-draft]").forEach(function (e) { o[e.id] = e.value; });
        localStorage.setItem("stromtech_draft", JSON.stringify(o));
      } catch (_) {}
    },
    get: function () {
      try {
        var o = JSON.parse(localStorage.getItem("stromtech_draft") || "null");
        return o && o.page === seg ? o : null;
      } catch (_) { return null; }
    },
    restore: function () {
      var o = this.get();
      if (!o) return null;
      document.querySelectorAll("[data-draft]").forEach(function (e) { if (o[e.id]) e.value = o[e.id]; });
      return o;
    },
    clear: function () { try { localStorage.removeItem("stromtech_draft"); } catch (_) {} }
  };

  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  var header = document.querySelector("header");
  var btn = document.getElementById("menu-btn");
  if (btn && header) {
    btn.addEventListener("click", function () {
      var open = header.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.textContent = open ? "✕" : "☰";
    });
    document.querySelectorAll(".links a").forEach(function (a) {
      a.addEventListener("click", function () { header.classList.remove("open"); btn.textContent = "☰"; });
    });
  }

  var items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) { items.forEach(function (e) { e.classList.add("in"); }); return; }
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  items.forEach(function (e) { io.observe(e); });
})();
