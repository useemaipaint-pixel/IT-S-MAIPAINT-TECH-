(function () {
  "use strict";

  // ---- Header menu ----
  var burger = document.getElementById("burger");
  var menu = document.getElementById("menu");
  function setMenu(open) {
    menu.hidden = !open;
    burger.setAttribute("aria-expanded", String(open));
  }
  burger.addEventListener("click", function (e) {
    e.stopPropagation();
    setMenu(menu.hidden);
  });
  document.addEventListener("click", function () { setMenu(false); });
  menu.addEventListener("click", function (e) { e.stopPropagation(); if (e.target.tagName === "A") setMenu(false); });

  // ---- Services: view all / show less ----
  var grid = document.getElementById("serviceGrid");
  var viewAllText = document.getElementById("viewAllText");
  document.getElementById("viewAll").addEventListener("click", function () {
    var all = grid.classList.toggle("is-all");
    viewAllText.textContent = all ? "Show Less" : "View All Services";
  });

  // ---- Start project: focus name field ----
  document.getElementById("startProject").addEventListener("click", function () {
    setTimeout(function () {
      document.getElementById("nameInput").focus({ preventScroll: true });
    }, 600);
  });

  // ---- Bottom nav active state ----
  var ids = ["home", "services", "about", "portfolio", "contact"];
  var links = document.querySelectorAll("#bottomNav a");
  function updateNav() {
    var line = window.innerHeight * 0.35, current = "home";
    ids.forEach(function (id) {
      var el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= line) current = id;
    });
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) current = "contact";
    links.forEach(function (a) {
      a.setAttribute("data-active", String(a.getAttribute("href") === "#" + current));
    });
  }
  updateNav();
  window.addEventListener("scroll", updateNav, { passive: true });
  window.addEventListener("resize", updateNav);

  // ---- Contact form -> WhatsApp ----
  var toast = document.getElementById("toast");
  document.getElementById("leadForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var f = new FormData(e.currentTarget);
    var msg = "*New Project Inquiry - IT'S MAIPAINT TECH*\n\n*Name:* " + f.get("n") +
      "\n*Email:* " + f.get("e") + "\n*Phone:* " + f.get("p") +
      "\n*Service:* " + f.get("s") + "\n*Budget:* " + f.get("b") +
      "\n\n*Project Description:*\n" + f.get("d");
    window.open("https://wa.me/" + f.get("w") + "?text=" + encodeURIComponent(msg), "_blank", "noopener");
    toast.textContent = "Opening WhatsApp. Tap Send there to confirm.";
    toast.hidden = false;
    setTimeout(function () { toast.hidden = true; }, 4000);
  });

  // ---- PWA: service worker ----
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      navigator.serviceWorker.register("sw.js").catch(function () {});
    });
  }
})();
