/* =========================================================
   Les verden – søk i hele nettstedet (sok.html?q=…)
   Indeksen lages av verktoy/lag-sok.mjs (data/sok.js). Ingenting lagres.
   ========================================================= */
(function () {
  const LV = window.LV;
  const $ = id => document.getElementById(id);
  const esc = s => LV.esc(String(s == null ? "" : s));
  const norm = s => String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[«»“”"’'.,:;!?()]/g, " ");
  const TYPER = {
    side: ["📌", "Sider"], tema: ["📚", "Temaer"], tekst: ["📖", "Reading Room"], film: ["🎬", "Filmer og serier"], skriving: ["✍️", "Skriveguider"],
    begrep: ["🔤", "Begreper"], person: ["👤", "Personer"], grammatikk: ["🧩", "Grammar"], land: ["🌍", "Landsider"], sport: ["🏆", "Sport"], kart: ["🗺️", "Kartspill"]
  };
  const REKKE = ["side", "tema", "tekst", "film", "skriving", "begrep", "person", "land", "grammatikk", "sport", "kart"];
  const VEKT = { side: 3, tema: 4, tekst: 3, film: 3, skriving: 3, begrep: 2, person: 2, land: 3, grammatikk: 2, sport: 1, kart: 1 };
  let indeks = null, type = "";

  function forbered() {
    indeks = (LV.sokIndeks || []).map(e => Object.assign({}, e, { _t: norm(e.t), _x: norm(e.t + " " + e.x + " " + e.s + " " + e.f) }));
  }
  function sok(q) {
    const ord = norm(q).split(/\s+/).filter(o => o.length > 0);
    if (!ord.length) return [];
    const treff = [];
    indeks.forEach(e => {
      let p = 0;
      for (const o of ord) {
        if (!e._x.includes(o)) return;
        if (e._t === o) p += 30;
        else if (e._t.startsWith(o)) p += 14;
        else if (new RegExp("(^|\\s)" + o.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).test(e._t)) p += 10;
        else if (e._t.includes(o)) p += 6;
        else p += 1;
      }
      treff.push({ e: e, p: p * (VEKT[e.k] || 1) / 2 + VEKT[e.k] });
    });
    return treff.sort((a, b) => b.p - a.p || a.e.t.localeCompare(b.e.t, "nb")).map(x => x.e);
  }
  function marker(tekst, q) {
    let h = esc(tekst);
    norm(q).split(/\s+/).filter(o => o.length > 1).forEach(o => {
      // marker treff i den viste teksten (enkel, uten å bry seg om aksenter)
      const re = new RegExp("(" + o.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "gi");
      h = h.replace(/(<[^>]*>)|([^<]+)/g, (m, tag, tekst2) => tag || tekst2.replace(re, "<mark>$1</mark>"));
    });
    return h;
  }

  function tegn() {
    const q = $("sok-felt").value.trim();
    const p = new URLSearchParams(); if (q) p.set("q", q); if (type) p.set("type", type);
    history.replaceState(null, "", "sok.html" + (p.toString() ? "?" + p : ""));
    document.title = (q ? "«" + q + "» – " : "") + "Søk – " + (LV.config ? LV.config.navn : "Les verden");
    const ut = $("sok-resultat");
    if (!q) { $("sok-filter").innerHTML = ""; $("sok-antall").textContent = ""; ut.innerHTML = forslag(); kobleForslag(); return; }
    const alle = sok(q);
    const teller = {}; alle.forEach(e => { teller[e.k] = (teller[e.k] || 0) + 1; });
    $("sok-filter").innerHTML = '<button class="knapp liten" data-type=""' + (!type ? ' aria-pressed="true"' : ' aria-pressed="false"') + ">Alle (" + alle.length + ")</button>" +
      REKKE.filter(k => teller[k]).map(k => '<button class="knapp liten" data-type="' + k + '" aria-pressed="' + (type === k) + '">' + TYPER[k][0] + " " + TYPER[k][1] + " (" + teller[k] + ")</button>").join("");
    document.querySelectorAll("#sok-filter [data-type]").forEach(b => b.addEventListener("click", () => { type = b.dataset.type; tegn(); }));
    const vis = alle.filter(e => !type || e.k === type);
    $("sok-antall").textContent = alle.length ? (alle.length === 1 ? "1 treff" : alle.length + " treff") : "Ingen treff";
    let h = "";
    if (!vis.length) h += '<p class="sok-tom">Fant ingenting som passer. Prøv et annet ord, eller sjekk stavemåten.</p>';
    if (type) h += liste(vis.slice(0, 200), q);
    else [...new Set(vis.map(e => e.k))].forEach(k => {  // gruppene i rekkefølgen til det beste treffet
      const gruppe = vis.filter(e => e.k === k);
      if (!gruppe.length) return;
      const viser = gruppe.slice(0, 8);
      h += '<section class="sok-gruppe"><h2><span aria-hidden="true">' + TYPER[k][0] + "</span> " + TYPER[k][1] + ' <span class="sok-n">' + gruppe.length + "</span></h2>" + liste(viser, q) +
        (gruppe.length > viser.length ? '<p><button class="knapp liten" data-mer="' + k + '">Vis alle ' + gruppe.length + " →</button></p>" : "") + "</section>";
    });
    h += '<p class="sok-ordbok">📖 Leter du etter hva et ord betyr? <a href="ordbok.html?q=' + encodeURIComponent(q) + '">Slå opp «' + esc(q) + '» i ordboka →</a></p>';
    ut.innerHTML = h;
    ut.querySelectorAll("[data-mer]").forEach(b => b.addEventListener("click", () => { type = b.dataset.mer; tegn(); window.scrollTo(0, 0); }));
  }
  function liste(arr, q) {
    return '<ul class="sok-liste">' + arr.map(e => '<li><a href="' + esc(e.u) + '"><span class="sok-tittel">' + marker(e.t, q) + "</span>" +
      (e.f ? '<span class="sok-meta">' + esc(e.f) + "</span>" : "") + (e.s ? '<span class="sok-tekst">' + marker(e.s, q) + "</span>" : "") + "</a></li>").join("") + "</ul>";
  }
  function forslag() {
    const eks = ["apartheid", "demokrati", "Mandela", "short story", "Titanic", "fornorsking", "verb", "1814", "cricket", "klima"];
    return '<div class="sok-forslag"><p>Søk i temaer, begreper, personer, lesetekster, filmer, skriveguider, grammatikk, landsider og kartspill. Prøv for eksempel:</p><p>' +
      eks.map(e => '<button class="knapp liten" data-forslag="' + esc(e) + '">' + esc(e) + "</button>").join(" ") + "</p></div>";
  }
  function kobleForslag() {
    document.querySelectorAll("[data-forslag]").forEach(b => b.addEventListener("click", () => { $("sok-felt").value = b.dataset.forslag; type = ""; tegn(); }));
  }

  document.addEventListener("DOMContentLoaded", function () {
    forbered();
    type = LV.param("type") || "";
    $("innhold").innerHTML = '<header class="sidehode"><h1>Søk</h1></header>' +
      '<form class="sok-skjema" role="search" id="sok-skjema"><label class="skjult-visuelt" for="sok-felt">Søk på Les verden</label>' +
      '<input id="sok-felt" type="search" placeholder="Søk etter tema, begrep, person, tekst, film …" autocomplete="off" value="' + esc(LV.param("q") || "") + '"><button class="knapp hoved" type="submit">Søk</button></form>' +
      '<div class="sok-filter" id="sok-filter" role="group" aria-label="Vis bare"></div><p class="sok-antall" id="sok-antall" aria-live="polite"></p><div id="sok-resultat"></div>';
    let timer;
    $("sok-felt").addEventListener("input", () => { clearTimeout(timer); timer = setTimeout(() => { type = ""; tegn(); }, 150); });
    $("sok-skjema").addEventListener("submit", e => { e.preventDefault(); tegn(); });
    tegn();
    $("sok-felt").focus();
  });
})();
