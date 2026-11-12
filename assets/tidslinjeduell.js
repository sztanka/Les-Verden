/* =========================================================
   Les verden – Tidslinjeduellen (tidslinjeduell.html)
   Trekk en hendelse uten årstall og plasser den riktig på tidslinja
   mellom kortene som allerede ligger der. Solo (tre liv) eller to lag
   som bytter på. Hendelsene kommer fra tidslinjene i temaene
   (data/tidsreise.js, lages av verktoy/lag-sok.mjs).
   ?fag=samfunnsfag|engelsk&trinn=8|9|10&tema=<id>
   Ingenting lagres.
   ========================================================= */
(function () {
  const LV = window.LV;
  const $ = id => document.getElementById(id);
  const esc = s => LV.esc(String(s == null ? "" : s));
  const bland = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const skjul = t => String(t).replace(/\b\d{3,4}(?:[–-]\d{2,4})?(?=\b|-tallet)/g, "____");

  function bygg() {
    document.title = "Tidslinjeduellen – " + (LV.config ? LV.config.navn : "Les verden");
    const p = new URLSearchParams(location.search);
    const fag = p.get("fag") || "", trinn = p.get("trinn") || "", temaId = p.get("tema") || "";
    const tema = temaId && LV.temaer.find(t => t.id === temaId);
    const alle = (LV.tidsreise || []).filter(h => (!temaId || h[3] === temaId) && (!fag || (fag === "engelsk") === !!h[6]) && (!trinn || String(h[7]) === trinn));
    $("innhold").innerHTML = '<nav class="brodsmuler" aria-label="Brødsmuler"><a href="index.html">Forside</a> › <a href="spill.html">Spill</a> › Tidslinjeduellen</nav>' +
      '<header class="sidehode"><p class="overlinje">Spill · historie</p><h1>⚔️ Tidslinjeduellen</h1><p class="ingress">Trekk en hendelse – uten årstall – og legg den på riktig plass på tidslinja. Jo flere kort som ligger der, jo vanskeligere blir det. Spill alene med tre liv, eller la to lag dyste mot hverandre på storskjermen.</p>' +
      (tema ? '<p class="melding">Bare hendelser fra temaet <a href="tema.html?id=' + encodeURIComponent(tema.id) + '">' + esc(tema.tittel) + '</a>. <a href="tidslinjeduell.html">Bruk alle temaene</a></p>' : "") +
      '<form class="tr-filter td-oppsett" id="td-oppsett">' + (tema ? "" : '<label>Fag <select name="fag"><option value="">Begge fag</option><option value="samfunnsfag">Samfunnsfag</option><option value="engelsk">Engelsk</option></select></label><label>Trinn <select name="trinn"><option value="">Alle trinn</option><option>8</option><option>9</option><option>10</option></select></label>') +
      '<label>Spillere <select name="modus"><option value="solo">Alene – tre liv</option><option value="lag">To lag</option></select></label><label>Kort for å vinne <select name="mal"><option>5</option><option selected>7</option><option>10</option></select></label><button class="knapp hoved" type="submit">Start duellen</button></form></header>' +
      '<section id="td-spill" class="td-spill" aria-live="polite"></section>';
    const f = $("td-oppsett");
    if (f.fag) { f.fag.value = fag; f.trinn.value = trinn; }
    f.addEventListener("submit", e => {
      e.preventDefault();
      if (f.fag && (f.fag.value !== fag || f.trinn.value !== trinn)) { const q = new URLSearchParams(); if (f.fag.value) q.set("fag", f.fag.value); if (f.trinn.value) q.set("trinn", f.trinn.value); q.set("start", f.modus.value + "-" + f.mal.value); location.search = q; return; }
      start(f.modus.value, +f.mal.value);
    });
    const st = p.get("start"); if (st) { const [m, n] = st.split("-"); f.modus.value = m; f.mal.value = n; start(m, +n); }

    function start(modus, mal) {
      if (alle.length < 8) { $("td-spill").innerHTML = '<p class="melding">For få hendelser med dette valget. Velg et annet fag eller trinn.</p>'; return; }
      // Unike år gjør spillet rettferdig
      const brukt = new Set(), bunke = [];
      bland(alle).forEach(h => { if (!brukt.has(h[2])) { brukt.add(h[2]); bunke.push(h); } });
      const linje = [bunke.shift()];
      const lag = modus === "lag" ? [{ navn: "Lag A", p: 0, ikon: "🟦" }, { navn: "Lag B", p: 0, ikon: "🟧" }] : [{ navn: "Du", p: 0, ikon: "⭐", liv: 3 }];
      let tur = 0, kort = null, ferdig = false;
      const trekk = () => { kort = bunke.shift(); if (!kort) return slutt("Bunken er tom!"); tegn(); };
      const tegn = (melding) => {
        const L = lag[tur];
        $("td-spill").innerHTML = '<div class="td-status">' + lag.map((l, i) => '<span class="td-lag' + (i === tur ? " na" : "") + '">' + l.ikon + " " + esc(l.navn) + ": <strong>" + l.p + "</strong> / " + mal + (l.liv != null ? " · " + "❤️".repeat(l.liv) + "🤍".repeat(3 - l.liv) : "") + "</span>").join("") + "</div>" +
          (melding || "") +
          '<div class="td-kort"' + (kort[6] ? ' lang="en"' : "") + '><p class="td-tur">' + (lag.length > 1 ? esc(L.navn) + " sin tur" : "Ditt kort") + '</p><p class="td-tekst">' + esc(skjul(kort[1])) + '</p><p class="td-tema" lang="nb">📚 ' + esc(kort[4]) + (kort[5] ? " · 📍 " + esc(kort[5]) : "") + "</p></div>" +
          '<p class="td-hjelp" id="td-hjelp">Hvor hører hendelsen hjemme? Velg en plass på tidslinja.</p><ol class="td-linje" aria-describedby="td-hjelp">' +
          linje.map((h, i) => plass(i) + '<li class="td-lagt"><span class="td-ar">' + h[2] + "</span><span" + (h[6] ? ' lang="en"' : "") + ">" + esc(h[1]) + "</span></li>").join("") + plass(linje.length) + "</ol>";
        document.querySelectorAll(".td-plass").forEach(b => b.addEventListener("click", () => legg(+b.dataset.i)));
        const ny = document.querySelector(".td-kort"); if (ny) ny.scrollIntoView({ block: "nearest" });
      };
      const plass = i => {
        const for_ = linje[i - 1], etter = linje[i];
        const t = !for_ ? "Før " + etter[2] : !etter ? "Etter " + for_[2] : "Mellom " + for_[2] + " og " + etter[2];
        return '<li class="td-gap"><button type="button" class="td-plass" data-i="' + i + '">↳ ' + t + "</button></li>";
      };
      const legg = i => {
        if (ferdig) return;
        const for_ = linje[i - 1], etter = linje[i], ar = kort[2];
        const ok = (!for_ || for_[2] <= ar) && (!etter || ar <= etter[2]);
        const L = lag[tur];
        let melding;
        if (ok) { linje.splice(i, 0, kort); L.p++; melding = '<p class="td-melding ok" role="status">✔ Riktig! «' + esc(kort[0]) + '» – ' + kort[2] + ".</p>"; }
        else { if (L.liv != null) L.liv--; melding = '<p class="td-melding feil" role="status">✗ Feil – det skjedde i <strong>' + kort[2] + "</strong>. Kortet er ute av spillet.</p>"; }
        if (L.p >= mal) return slutt(melding + '<p class="td-vinner">🏆 ' + esc(L.navn) + (lag.length > 1 ? " vinner duellen!" : " klarte det!") + "</p>");
        if (L.liv === 0) return slutt(melding + '<p class="td-vinner">Du har ingen liv igjen. Du fikk ' + L.p + " kort på tidslinja.</p>");
        if (lag.length > 1) tur = 1 - tur;
        kort = bunke.shift(); if (!kort) return slutt(melding + "<p>Bunken er tom!</p>");
        tegn(melding);
      };
      const slutt = melding => {
        ferdig = true;
        $("td-spill").innerHTML = '<div class="kd-slutt">' + melding + '<h2>Tidslinja dere bygde</h2><ol class="td-linje td-ferdig">' + linje.map(h => '<li class="td-lagt"><span class="td-ar">' + h[2] + "</span><span" + (h[6] ? ' lang="en"' : "") + ">" + esc(h[1]) + ' <a href="tema.html?id=' + encodeURIComponent(h[3]) + '" lang="nb">(' + esc(h[4]) + ")</a></span></li>").join("") + '</ol><p><button type="button" class="knapp hoved" id="td-igjen">↺ Ny duell</button> <a class="knapp" href="tidslinje.html">📅 Se hele tidslinja</a></p></div>';
        $("td-igjen").addEventListener("click", () => start(modus, mal));
        $("td-spill").querySelector("h2").setAttribute("tabindex", "-1"); $("td-spill").querySelector("h2").focus();
      };
      trekk();
    }
  }
  document.addEventListener("DOMContentLoaded", bygg);
})();
