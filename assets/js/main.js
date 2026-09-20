/* ---------- 1. Edit your details here ---------- */
const SITE = {
  email: "info@example.org",
  en: {
    name: "Your NGO Name",
    rights: "All rights reserved.",
    contact: "Contact",
    nav: { about: "About", team: "Team", project: "Projects", publication: "Publications", photo: "Photos" }
  },
  km: {
    name: "ឈ្មោះអង្គការរបស់អ្នក",
    rights: "រក្សាសិទ្ធិគ្រប់យ៉ាង។",
    contact: "ទំនាក់ទំនង",
    nav: { about: "អំពីយើង", team: "ក្រុមការងារ", project: "គម្រោង", publication: "ការបោះពុម្ពផ្សាយ", photo: "រូបថត" }
  }
};

/* ---------- 2. Find the language and page from the address ---------- */
const parts = window.location.pathname.split("/").filter(Boolean);
const lang = parts[0] === "km" ? "km" : "en";
const other = lang === "en" ? "km" : "en";
const page = parts[1] || "about";
const t = SITE[lang];
const order = ["about", "team", "project", "publication", "photo"];

/* ---------- 3. Build header and footer ---------- */
const navHtml = order.map(function (k) {
  const active = k === page ? ' class="active" aria-current="page"' : "";
  return '<a href="/' + lang + "/" + k + '/"' + active + ">" + t.nav[k] + "</a>";
}).join("");

const switchHref =
  window.location.pathname.replace("/" + lang + "/", "/" + other + "/") +
  window.location.search + window.location.hash;
const switchLabel = lang === "en" ? "ខ្មែរ" : "English";

document.getElementById("site-header").innerHTML =
  '<div class="topbar"><div class="container">' +
  '<a class="lang-switch" href="' + switchHref + '" hreflang="' + other + '" lang="' + other + '">' + switchLabel + "</a>" +
  "</div></div>" +
  '<div class="mainbar"><div class="container">' +
  '<a class="brand" href="/' + lang + '/about/">' + t.name + "</a>" +
  "<nav>" + navHtml + "</nav>" +
  "</div></div>";

document.getElementById("site-footer").innerHTML =
  '<footer><div class="container">' +
  "<p>© " + new Date().getFullYear() + " " + t.name + ". " + t.rights + "</p>" +
  "<p>" + t.contact + ': <a href="mailto:' + SITE.email + '">' + SITE.email + "</a></p>" +
  "</div></footer>";

/* ---------- 4. Team pop-ups ---------- */
document.querySelectorAll("[data-modal]").forEach(function (card) {
  function open() { document.getElementById(card.dataset.modal).showModal(); }
  card.addEventListener("click", open);
  card.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); }
  });
});

document.querySelectorAll("dialog").forEach(function (d) {
  d.addEventListener("click", function (e) { if (e.target === d) d.close(); });
  d.querySelectorAll(".close").forEach(function (b) {
    b.addEventListener("click", function () { d.close(); });
  });
});

/* ---------- 5. Photo enlargement ---------- */
document.querySelectorAll(".gallery img").forEach(function (img) {
  img.addEventListener("click", function () {
    const d = document.createElement("dialog");
    d.className = "lightbox";
    d.innerHTML = '<img src="' + img.src + '" alt="' + img.alt + '"><p>' + img.alt + "</p>";
    d.addEventListener("click", function () { d.close(); d.remove(); });
    document.body.appendChild(d);
    d.showModal();
  });
});
