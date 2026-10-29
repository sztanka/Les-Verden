/* =========================================================
   Les verden – forside
   Verdenskart med temaer, «Visste du at …?» og temakort.
   ========================================================= */

(function () {
  const LV = window.LV;

  // ---------- Verdenskart ----------
  function tilPunkt(sted) {
    const k = LV.kart;
    return {
      x: (sted.lon + 180) * k.bredde / 360,
      y: (k.nord - sted.lat) * k.bredde / 360
    };
  }

  // Slår sammen temaer som ligger så tett at prikkene ville overlappet.
  function lagKlynger(temaer, terskel) {
    const klynger = [];
    temaer.forEach(t => {
      const p = tilPunkt(t.sted);
      const naer = klynger.find(k => Math.hypot(k.x - p.x, k.y - p.y) < terskel);
      if (naer) {
        naer.temaer.push(t);
        const n = naer.temaer.length;
        naer.x = (naer.x * (n - 1) + p.x) / n;
        naer.y = (naer.y * (n - 1) + p.y) / n;
      } else {
        klynger.push({ x: p.x, y: p.y, temaer: [t] });
      }
    });
    return klynger;
  }

  // Kort navn på samlede prikker: «Washington, D.C. +2»
  function kortLapp(liste) {
    const navn = Array.from(new Set(liste.map(t => t.sted.navn)));
    return navn.length === 1 ? navn[0] : navn[0] + " +" + (navn.length - 1);
  }

  // Skjuler navnelapper som ville overlappet andre lapper eller prikker.
  // Lappen prøves først til høyre, så til venstre. Skjulte lapper vises
  // når man peker på prikken.
  function ryddLapper(kart) {
    const naler = Array.from(kart.querySelectorAll(".nal"));
    const prikker = naler.map(n => n.querySelector(".prikk").getBoundingClientRect());
    const vist = [];
    const kartR = kart.getBoundingClientRect();
    const overlapper = (a, b) => !(a.right + 4 < b.left || b.right + 4 < a.left || a.bottom + 2 < b.top || b.bottom + 2 < a.top);
    // Største klynger først, så de viktigste lappene får plass
    naler.map((n, i) => ({ n, i, vekt: n.classList.contains("klynge") ? 1 : 0 }))
      .sort((a, b) => b.vekt - a.vekt)
      .forEach(({ n, i }) => {
        const lapp = n.querySelector(".navnelapp");
        n.classList.remove("lapp-skjult");
        const proving = n.classList.contains("lapp-venstre") ? [true, false] : [false, true];
        let ok = false;
        for (const venstre of proving) {
          n.classList.toggle("lapp-venstre", venstre);
          const r = lapp.getBoundingClientRect();
          const innenfor = r.left >= kartR.left && r.right <= kartR.right;
          const kollisjon = vist.some(v => overlapper(r, v)) || prikker.some((p, j) => j !== i && overlapper(r, p));
          if (innenfor && !kollisjon) { vist.push(r); ok = true; break; }
        }
        if (!ok) n.classList.add("lapp-skjult");
      });
  }

  function steder(liste) {
    return Array.from(new Set(liste.map(t => t.sted.navn))).join(", ");
  }

  function lukkBoble() {
    const b = document.querySelector(".kartboble");
    if (b) {
      const fra = b.dataset.fra;
      b.remove();
      const knapp = fra && document.getElementById(fra);
      if (knapp) { knapp.setAttribute("aria-expanded", "false"); knapp.focus(); }
    }
  }

  function visBoble(klynge, knapp) {
    lukkBoble();
    const kart = document.getElementById("kart");
    const boble = document.createElement("div");
    boble.className = "kartboble";
    boble.dataset.fra = knapp.id;
    boble.setAttribute("role", "dialog");
    boble.setAttribute("aria-label", "Temaer i " + steder(klynge.temaer));
    boble.innerHTML =
      '<button class="lukk" aria-label="Lukk">×</button>' +
      "<h3>" + LV.esc(steder(klynge.temaer)) + "</h3><ul>" +
      klynge.temaer.map(t =>
        '<li><a class="fag-' + t.fag + '" href="tema.html?id=' + encodeURIComponent(t.id) + '">' +
          LV.esc(t.tittel) + "<small>" + LV.fagNavn[t.fag] + " · " + t.trinn + ". trinn</small></a></li>").join("") +
      "</ul>";
    kart.parentElement.appendChild(boble);

    // Plasser boblen ved nålen, men innenfor kartet
    const kb = kart.getBoundingClientRect();
    const bb = boble.getBoundingClientRect();
    const px = klynge.x / LV.kart.bredde * kb.width;
    const py = klynge.y / LV.kart.hoyde * kb.height;
    let venstre = px - bb.width / 2;
    let topp = py + 22;
    if (topp + bb.height > kb.height - 6 && py - bb.height - 22 >= 6) topp = py - bb.height - 22;
    venstre = Math.max(6, Math.min(kb.width - bb.width - 6, venstre));
    topp = Math.max(6, topp);
    boble.style.left = venstre + "px";
    boble.style.top = topp + "px";

    knapp.setAttribute("aria-expanded", "true");
    boble.querySelector(".lukk").addEventListener("click", lukkBoble);
    boble.querySelector("a").focus();
  }

  function tegnKart() {
    const kart = document.getElementById("kart");
    if (!kart || !LV.kart) return;
    const k = LV.kart;
    const ekvatorY = k.nord * k.bredde / 360;
    const medSted = LV.temaer.filter(t => t.sted);

    // Hvor tett prikker kan ligge, avhenger av hvor stort kartet vises
    const skala = kart.getBoundingClientRect().width / k.bredde || 1;
    const terskel = 34 / skala;
    const klynger = lagKlynger(medSted, terskel);

    let h = '<svg viewBox="0 0 ' + k.bredde + " " + k.hoyde + '" aria-hidden="true" focusable="false">' +
      '<line class="ekvator" x1="0" y1="' + ekvatorY + '" x2="' + k.bredde + '" y2="' + ekvatorY + '"/>' +
      '<path class="land" d="' + k.sti + '"/></svg>';

    klynger.forEach((kl, i) => {
      const venstre = (kl.x / k.bredde * 100) + "%";
      const lappKlasse = kl.x > k.bredde * 0.78 ? " lapp-venstre" : "";
      const topp = (kl.y / k.hoyde * 100) + "%";
      if (kl.temaer.length === 1) {
        const t = kl.temaer[0];
        h += '<a class="nal fag-' + t.fag + lappKlasse + '" style="left:' + venstre + ";top:" + topp + '" href="tema.html?id=' + encodeURIComponent(t.id) + '"' +
          ' aria-label="' + LV.esc(t.tittel + " (" + t.sted.navn + ")") + '">' +
          '<span class="prikk"></span><span class="navnelapp" aria-hidden="true">' + LV.esc(t.sted.navn) + "</span></a>";
      } else {
        h += '<button type="button" class="nal klynge' + lappKlasse + '" id="klynge-' + i + '" data-klynge="' + i + '" aria-expanded="false"' +
          ' style="left:' + venstre + ";top:" + topp + '"' +
          ' aria-label="' + kl.temaer.length + " temaer: " + LV.esc(steder(kl.temaer)) + '">' +
          '<span class="prikk">' + kl.temaer.length + '</span><span class="navnelapp" aria-hidden="true">' + LV.esc(kortLapp(kl.temaer)) + "</span></button>";
      }
    });
    kart.innerHTML = h;
    kart.classList.toggle("mange", klynger.length > 12);
    if (!kart.classList.contains("mange")) ryddLapper(kart);

    kart.querySelectorAll("[data-klynge]").forEach(b =>
      b.addEventListener("click", e => {
        e.stopPropagation();
        if (b.getAttribute("aria-expanded") === "true") lukkBoble();
        else visBoble(klynger[Number(b.dataset.klynge)], b);
      }));

    const n = medSted.length;
    document.getElementById("kart-antall").textContent =
      n + (n === 1 ? " tema" : " temaer") + " på kartet – og flere kommer";
  }

  // ---------- Visste du at …? ----------
  const alleFakta = [];
  let forrige = -1;
  function visFakta() {
    const boks = document.getElementById("visste");
    if (!boks || !alleFakta.length) { if (boks) boks.hidden = true; return; }
    let i = Math.floor(Math.random() * alleFakta.length);
    if (alleFakta.length > 1 && i === forrige) i = (i + 1) % alleFakta.length;
    forrige = i;
    const f = alleFakta[i];
    const en = f.tema.sprak === "en";
    boks.className = "visste";
    boks.lang = en ? "en" : "nb";
    boks.innerHTML =
      "<h2>" + (en ? "Did you know …?" : "Visste du at …?") + "</h2>" +
      "<p>" + LV.esc(f.tekst) + "</p>" +
      '<div class="visste-bunn"><a href="tema.html?id=' + encodeURIComponent(f.tema.id) + '">' +
        (en ? "Read more: " : "Les mer: ") + LV.esc(f.tema.tittel) + " →</a>" +
      '<button class="knapp" id="ny-fakta" lang="nb">Vis en ny</button></div>';
    document.getElementById("ny-fakta").addEventListener("click", visFakta);
  }

  // ---------- Temakort og filter ----------
  let fag = "";
  let trinn = "";

  function temakort(t) {
    return '<li><a class="temakort med-bilde fag-' + t.fag + '" href="tema.html?id=' + encodeURIComponent(t.id) + '">' +
      (t.bilde ? '<span class="bilde"><img src="' + LV.esc(t.bilde) + '" alt="' + LV.esc(t.bildeAlt || "") + '" loading="lazy"></span>' : "") +
      '<span class="innhold"><span class="merker"><span class="merke">' + LV.fagNavn[t.fag] + '</span><span class="merke">' + t.trinn + ". trinn</span></span>" +
      "<h3>" + LV.esc(t.tittel) + "</h3><p>" + LV.esc(t.kort) + "</p>" +
      (t.kreditt ? '<span class="kreditt">Foto: ' + LV.esc(t.kreditt) + (t.kilde ? " / " + LV.esc(t.kilde) : "") + "</span>" : "") +
      "</span></a></li>";
  }

  function tegnListe() {
    const liste = document.getElementById("temaliste");
    const utvalg = LV.temaer
      .filter(t => !fag || t.fag === fag)
      .filter(t => !trinn || String(t.trinn) === trinn)
      .sort((a, b) => a.trinn - b.trinn || a.fag.localeCompare(b.fag) || a.tittel.localeCompare(b.tittel, "nb"));

    document.getElementById("liste-tittel").textContent =
      (fag ? LV.fagNavn[fag] : "Alle temaer") + (trinn ? " – " + trinn + ". trinn" : "");
    liste.innerHTML = utvalg.length ? utvalg.map(temakort).join("") : '<li class="tom">Ingen temaer her ennå.</li>';

    document.querySelectorAll("[data-trinn]").forEach(b =>
      b.setAttribute("aria-pressed", String(b.dataset.trinn === trinn)));
    document.querySelectorAll(".fagkort").forEach(a =>
      a.setAttribute("aria-current", String(a.dataset.fag === fag)));
  }

  document.addEventListener("DOMContentLoaded", function () {
    const k = LV.config;
    document.getElementById("sidetittel").textContent = k.navn;
    document.getElementById("undertittel").textContent = k.undertittel;

    fag = LV.param("fag") || "";
    trinn = LV.param("trinn") || "";

    ["samfunnsfag", "engelsk"].forEach(f => {
      const n = LV.temaer.filter(t => t.fag === f).length;
      const el = document.querySelector('[data-antall="' + f + '"]');
      if (el) el.textContent = n + (n === 1 ? " tema" : " temaer") + " →";
    });

    LV.temaer.forEach(t => (t.fakta || []).forEach(tekst => alleFakta.push({ tekst: tekst, tema: t })));

    tegnKart();
    visFakta();
    tegnListe();

    document.querySelectorAll("[data-trinn]").forEach(b => b.addEventListener("click", function () {
      trinn = b.dataset.trinn;
      const p = new URLSearchParams();
      if (fag) p.set("fag", fag);
      if (trinn) p.set("trinn", trinn);
      history.replaceState(null, "", "index.html" + (p.toString() ? "?" + p : "") + "#temaer");
      tegnListe();
    }));

    document.addEventListener("click", e => {
      if (!e.target.closest(".kartboble") && !e.target.closest(".klynge")) {
        const b = document.querySelector(".kartboble");
        if (b) b.remove(), document.querySelectorAll(".klynge").forEach(x => x.setAttribute("aria-expanded", "false"));
      }
    });
    document.addEventListener("keydown", e => { if (e.key === "Escape") lukkBoble(); });

    let tid;
    window.addEventListener("resize", () => { clearTimeout(tid); tid = setTimeout(tegnKart, 150); });
  });
})();
