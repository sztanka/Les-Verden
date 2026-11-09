/* =========================================================
   Les verden – Diamantrangering (diamant.html)
   Ni kort plasseres i en diamant (1–2–3–2–1) fra viktigst til
   minst viktig. Velg et kort og trykk på en plass – kortene byttes
   hvis plassen er opptatt. Begrunnelser i tekstfelt.
   Plasseringen tas med i «Last ned svarene» (svarfil.js).
   diamant.html → oversikt · diamant.html?id=<sett>
   ========================================================= */
(function () {
  const LV = window.LV;
  const $ = id => document.getElementById(id);
  const esc = s => LV.esc(String(s == null ? "" : s));
  const RADER = [1, 2, 3, 2, 1];
  const TX = {
    nb: { velg: "Trykk på et kort, og trykk så på plassen der du vil ha det.", bunke: "Kortene", tom: "Alle kortene er plassert!", viktigst: "Viktigst", minst: "Minst viktig", kriterier: "Tenk på dette når du rangerer", plass: "Plass", rad: "rad", ledig: "ledig", tilbake: "Legg tilbake i bunken", nullstill: "↻ Start på nytt", s: [["Hvorfor plasserte dere kortet øverst?"], ["Hvorfor plasserte dere kortet nederst?"], ["Hvilket kort var vanskeligst å plassere? Hvorfor?"], ["Var dere uenige? Hvordan ble dere enige?"]], skriv: "🖨️ Skriv ut" },
    en: { velg: "Tap a card, then tap the place where you want it.", bunke: "The cards", tom: "All the cards are placed!", viktigst: "Most important", minst: "Least important", kriterier: "Think about this when you rank", plass: "Place", rad: "row", ledig: "empty", tilbake: "Put back in the pile", nullstill: "↻ Start again", s: [["Why did you put that card at the top?"], ["Why did you put that card at the bottom?"], ["Which card was the hardest to place? Why?"], ["Did you disagree? How did you agree in the end?"]], skriv: "🖨️ Print" }
  };
  const hode = t => '<nav class="brodsmuler" aria-label="Brødsmuler"><a href="index.html">Forside</a> › <a href="spill.html">Spill</a> › <a href="diamant.html">Diamantrangering</a>' + (t ? " › " + esc(t) : "") + "</nav>";
  const svarlinje = () => { const l = document.createElement("div"); l.className = "svarlinje"; l.innerHTML = '<div class="svarlinje-indre"><label class="skjult-visuelt" for="elevnavn">Navn</label><input id="elevnavn" type="text" placeholder="Navn" autocomplete="off"><span class="status" role="status" aria-live="polite"></span></div>'; document.body.appendChild(l); };

  function oversikt() {
    document.title = "Diamantrangering – " + (LV.config ? LV.config.navn : "Les verden");
    $("innhold").innerHTML = hode() +
      '<header class="sidehode"><p class="overlinje">Historisk betydning</p><h1>💎 Diamantrangering</h1><p class="ingress">Hva var viktigst? Plasser ni kort i en diamant – det viktigste øverst, det minst viktige nederst, og resten i midten. Det finnes ingen fasit: Det viktigste er hvordan dere begrunner valgene. Snakk sammen i par eller grupper.</p></header>' +
      '<ul class="fo-liste">' + LV.diamant.map(d => '<li><a class="fo-kort" href="diamant.html?id=' + d.id + '" style="--fo-a:var(--' + (d.sp === "en" ? "engelsk" : "samfunnsfag") + ')"' + (d.sp === "en" ? ' lang="en"' : "") + '><span class="fo-kort-topp"><span class="fo-ikon" aria-hidden="true">' + d.ikon + "</span><span>9 kort</span></span><strong>" + esc(d.sporsmal) + "</strong><span>" + d.kort.slice(0, 3).map(esc).join(" · ") + " …</span></a></li>").join("") + "</ul>" +
      '<div class="ka-metode"><h2>Hva gjør noe historisk viktig?</h2><ul><li><strong>Mange berørt:</strong> Hvor mange mennesker påvirket det?</li><li><strong>Dyp endring:</strong> Hvor mye endret det livene deres?</li><li><strong>Lang varighet:</strong> Merker vi følgene fortsatt i dag?</li><li><strong>Avslører noe:</strong> Hjelper det oss å forstå noe viktig om fortiden eller om i dag?</li></ul></div>' +
      '<p class="fo-merk">Til læreren: Diamantrangering tvinger elevene til å prioritere og begrunne, og egner seg godt som samtale i grupper. Avslutt gjerne med at to grupper med ulik rangering forklarer valgene sine for hverandre. Kriteriene bygger på Peter Seixas’ begrep «historisk betydning».</p>';
  }

  function sett(d) {
    const T = TX[d.sp], lang = d.sp === "en" ? ' lang="en"' : "", pre = "dm-" + d.id + "-";
    document.title = "Diamantrangering – " + d.sporsmal;
    const tema = LV.temaer.find(t => t.id === d.tema);
    let plass = Array(9).fill(null), valgt = null; // valgt: {fra: "bunke"|"plass", i}
    $("innhold").innerHTML = hode(d.ikon + " " + (d.sp === "en" ? "Ranking" : "Rangering")) + "<div" + lang + ">" +
      '<header class="sidehode"><p class="overlinje">💎 ' + (d.sp === "en" ? "Diamond ranking" : "Diamantrangering") + "</p><h1>" + esc(d.sporsmal) + '</h1></header><div class="dm-kriterier"><h2>' + T.kriterier + "</h2><ul>" + d.kriterier.map(k => "<li>" + esc(k) + "</li>").join("") + "</ul></div>" +
      '<p class="mu-intro">' + T.velg + '</p><div class="dm-arbeid"><div class="dm-diamant" aria-label="Diamanten"><p class="dm-topp">⬆ ' + T.viktigst + "</p>" +
      RADER.map((n, r) => '<div class="dm-rad">' + Array.from({ length: n }, (_, k) => { const i = RADER.slice(0, r).reduce((a, b) => a + b, 0) + k; return '<button type="button" class="dm-plass" data-i="' + i + '" data-rad="' + (r + 1) + '"></button>'; }).join("") + "</div>").join("") +
      '<p class="dm-bunn">⬇ ' + T.minst + '</p></div><div class="dm-bunke"><h2>' + T.bunke + '</h2><div id="dm-bunke" class="dm-kortliste"></div><p class="dm-tom" id="dm-tom" hidden>✔ ' + T.tom + '</p><p><button type="button" class="knapp liten" id="dm-null">' + T.nullstill + '</button> <button type="button" class="knapp liten" id="dm-skriv">' + T.skriv + "</button></p></div></div>" +
      '<label class="skjult-visuelt" for="' + pre + 'plass">Plassering</label><input type="text" id="' + pre + 'plass" class="skjult-visuelt" tabindex="-1" aria-hidden="true">' +
      '<section class="le-del">' + T.s.map(([s], i) => '<label class="mu-notat" for="' + pre + "s" + i + '"><span>' + esc(s) + '</span><textarea id="' + pre + "s" + i + '" rows="3"></textarea></label>').join("") +
      (tema ? '<p lang="nb"><a href="tema.html?id=' + tema.id + '">Les mer i temaet «' + esc(tema.tittel) + "» →</a></p>" : "") + '<p lang="nb"><a class="knapp" href="diamant.html">← Velg en annen rangering</a></p></section></div>';

    function tegn() {
      const iBunke = d.kort.map((_, k) => k).filter(k => !plass.includes(k));
      $("dm-bunke").innerHTML = iBunke.map(k => '<button type="button" class="dm-kort" data-k="' + k + '" aria-pressed="' + !!(valgt && valgt.fra === "bunke" && valgt.k === k) + '">' + esc(d.kort[k]) + "</button>").join("");
      $("dm-tom").hidden = iBunke.length > 0;
      document.querySelectorAll(".dm-plass").forEach(b => {
        const i = +b.dataset.i, k = plass[i];
        b.classList.toggle("fylt", k !== null);
        b.classList.toggle("valgt", !!valgt && valgt.fra === "plass" && valgt.i === i);
        b.innerHTML = k !== null ? esc(d.kort[k]) : '<span aria-hidden="true">·</span>';
        b.setAttribute("aria-label", T.plass + " " + (i + 1) + ", " + T.rad + " " + b.dataset.rad + (b.dataset.rad === "1" ? " (" + T.viktigst.toLowerCase() + ")" : b.dataset.rad === "5" ? " (" + T.minst.toLowerCase() + ")" : "") + ": " + (k !== null ? d.kort[k] : T.ledig));
        b.setAttribute("aria-pressed", String(!!valgt && valgt.fra === "plass" && valgt.i === i));
      });
      $(pre + "plass").value = plass.map(k => k === null ? "-" : k).join(",");
      document.querySelectorAll(".dm-kort").forEach(b => b.addEventListener("click", () => { const k = +b.dataset.k; valgt = valgt && valgt.fra === "bunke" && valgt.k === k ? null : { fra: "bunke", k }; tegn(); fokus('.dm-kort[data-k="' + k + '"]'); }));
    }
    const fokus = sel => { const el = document.querySelector(sel); if (el) el.focus(); };
    document.querySelectorAll(".dm-plass").forEach(b => b.addEventListener("click", () => {
      const i = +b.dataset.i;
      if (valgt && valgt.fra === "bunke") { plass[i] = valgt.k; valgt = null; }
      else if (valgt && valgt.fra === "plass") { if (valgt.i !== i) { const t = plass[i]; plass[i] = plass[valgt.i]; plass[valgt.i] = t; } valgt = null; }
      else if (plass[i] !== null) valgt = { fra: "plass", i };
      tegn(); fokus('.dm-plass[data-i="' + i + '"]');
    }));
    $("dm-bunke").addEventListener("dblclick", () => {});
    // Trykk på bunken når et plassert kort er valgt: legg tilbake
    document.querySelector(".dm-bunke h2").insertAdjacentHTML("afterend", '<button type="button" class="knapp liten dm-tilbake" id="dm-tilbake" hidden>↩ ' + T.tilbake + "</button>");
    const tilbakeKnapp = () => { $("dm-tilbake").hidden = !(valgt && valgt.fra === "plass"); };
    const gammelTegn = tegn; tegn = function () { gammelTegn(); tilbakeKnapp(); };
    $("dm-tilbake").addEventListener("click", () => { if (valgt && valgt.fra === "plass") { plass[valgt.i] = null; valgt = null; tegn(); fokus(".dm-kort"); } });
    $("dm-null").addEventListener("click", () => { plass = Array(9).fill(null); valgt = null; tegn(); });
    $("dm-skriv").addEventListener("click", () => window.print());
    $(pre + "plass").addEventListener("input", () => { const v = $(pre + "plass").value.split(","); if (v.length === 9) { plass = v.map(x => x === "-" || x === "" ? null : +x); valgt = null; tegn(); } });
    tegn();
  }

  document.addEventListener("DOMContentLoaded", () => {
    const d = LV.diamant.find(x => x.id === LV.param("id"));
    if (d) sett(d); else oversikt();
    svarlinje();
  });
})();
