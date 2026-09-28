/* Broldélique — amélioration progressive. Le site fonctionne entièrement sans ce script. */
(function () {
  "use strict";
  var doc = document.documentElement;
  doc.classList.remove("no-js");

  /* ---------- Thème clair / sombre (préférence locale, facultative) ---------- */
  var KEY = "brol-theme";
  function store(v) { try { if (v) localStorage.setItem(KEY, v); else localStorage.removeItem(KEY); } catch (e) {} }
  function read() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function current() {
    var t = doc.getAttribute("data-theme");
    if (t) return t;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  var saved = read();
  if (saved === "dark" || saved === "light") doc.setAttribute("data-theme", saved);
  var btn = document.querySelector(".theme-toggle");
  function label() {
    if (!btn) return;
    var dark = current() === "dark";
    btn.setAttribute("aria-pressed", dark ? "true" : "false");
    var t = btn.querySelector(".theme-toggle__txt");
    if (t) t.textContent = dark ? "Clair" : "Sombre";
    btn.setAttribute("aria-label", dark ? "Passer au thème clair" : "Passer au thème sombre");
  }
  if (btn) {
    label();
    btn.addEventListener("click", function () {
      var next = current() === "dark" ? "light" : "dark";
      doc.setAttribute("data-theme", next);
      store(next);
      label();
    });
  }

  /* ---------- Barre de progression de lecture ---------- */
  var bar = document.querySelector(".progress span");
  var article = document.querySelector("article.post");
  if (bar && article) {
    var ticking = false;
    var update = function () {
      var r = article.getBoundingClientRect();
      var total = r.height - window.innerHeight;
      var p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 1;
      bar.style.width = (p * 100).toFixed(2) + "%";
      ticking = false;
    };
    window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    update();
  }

  /* ---------- Sommaire : section active ---------- */
  var tocLinks = document.querySelectorAll(".toc a[href^='#']");
  if (tocLinks.length && "IntersectionObserver" in window) {
    var map = {};
    tocLinks.forEach(function (a) { map[a.getAttribute("href").slice(1)] = a; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          tocLinks.forEach(function (a) { a.classList.remove("is-active"); });
          var a = map[en.target.id];
          if (a) a.classList.add("is-active");
        }
      });
    }, { rootMargin: "0px 0px -70% 0px", threshold: 0 });
    Object.keys(map).forEach(function (id) { var el = document.getElementById(id); if (el) io.observe(el); });
  }
  /* Sommaire replié par défaut sur mobile */
  var toc = document.querySelector("details.toc");
  if (toc && window.matchMedia("(max-width: 1100px)").matches) toc.removeAttribute("open");

  /* ---------- Partage / copie du lien / citation ---------- */
  document.querySelectorAll("[data-share]").forEach(function (b) {
    b.addEventListener("click", function () {
      var url = b.getAttribute("data-url") || location.href;
      var title = b.getAttribute("data-title") || document.title;
      if (navigator.share) { navigator.share({ title: title, url: url }).catch(function () {}); return; }
      copy(url, b, "Lien copié");
    });
  });
  document.querySelectorAll("[data-copy]").forEach(function (b) {
    b.addEventListener("click", function () {
      var el = document.getElementById(b.getAttribute("data-copy"));
      if (el) copy(el.textContent.trim(), b, "Copié");
    });
  });
  function copy(text, el, ok) {
    var done = function () { var o = el.textContent; el.textContent = ok; setTimeout(function () { el.textContent = o; }, 1600); };
    if (navigator.clipboard && navigator.clipboard.writeText) { navigator.clipboard.writeText(text).then(done, function () {}); }
    else { var t = document.createElement("textarea"); t.value = text; document.body.appendChild(t); t.select(); try { document.execCommand("copy"); done(); } catch (e) {} document.body.removeChild(t); }
  }

  /* ---------- Infobulles des graphiques (survol + clavier) ---------- */
  document.querySelectorAll(".chart").forEach(function (fig) {
    var tip = document.createElement("div");
    tip.className = "tip"; tip.setAttribute("role", "status"); tip.setAttribute("aria-live", "polite");
    fig.appendChild(tip);
    function show(mark) {
      tip.textContent = mark.getAttribute("data-tip") || "";
      var fr = fig.getBoundingClientRect(), mr = mark.getBoundingClientRect();
      var x = mr.left - fr.left + mr.width, y = mr.top - fr.top + mr.height / 2;
      tip.classList.add("on");
      var tw = tip.offsetWidth, th = tip.offsetHeight;
      var left = Math.min(Math.max(8, x + 10), fr.width - tw - 8);
      var top = y - th - 10; if (top < 4) top = y + 12;
      tip.style.left = left + "px"; tip.style.top = top + "px";
    }
    function hide() { tip.classList.remove("on"); }
    fig.querySelectorAll("[data-tip]").forEach(function (m) {
      m.addEventListener("mouseenter", function () { show(m); });
      m.addEventListener("mouseleave", hide);
      m.addEventListener("focus", function () { show(m); });
      m.addEventListener("blur", hide);
    });
  });

  /* ---------- Lexique : filtre instantané ---------- */
  var q = document.getElementById("lex-q");
  if (q) {
    var entries = document.querySelectorAll(".lexique .entry");
    var count = document.getElementById("lex-count");
    var norm = function (s) { return s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase(); };
    q.addEventListener("input", function () {
      var v = norm(q.value.trim()), n = 0;
      entries.forEach(function (e) { var hit = !v || norm(e.textContent).indexOf(v) > -1; e.hidden = !hit; if (hit) n++; });
      if (count) count.textContent = n + (n > 1 ? " termes" : " terme");
    });
  }
})();
