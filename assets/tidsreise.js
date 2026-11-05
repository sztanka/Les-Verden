/* =========================================================
   Les verden – Tidsreisen (tidsreise.html)
   Du får en hendelse fra tidslinjene i temaene – uten årstall.
   Gjett året. Jo nærmere, jo flere poeng. Ledetråder koster poeng.
   Data: data/tidsreise.js (lages av verktoy/lag-sok.mjs).
   ?fag=samfunnsfag|engelsk&trinn=8|9|10
   ========================================================= */
(function () {
  const LV = window.LV;
  const $ = id => document.getElementById(id);
  const esc = s => LV.esc(String(s == null ? "" : s));
  const bland = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const MIN = 1500, MAKS = 2030, RUNDER = 10;
  const skjul = t => String(t).replace(/\b\d{3,4}(?:[–-]\d{2,4})?(?=\b|-tallet)/g, "____");
  const poengFor = diff => diff === 0 ? 100 : Math.max(0, Math.round(100 - diff * 2));

  function bygg() {
    const p = new URLSearchParams(location.search);
    const fag = p.get("fag") || "", trinn = p.get("trinn") || "";
    document.title = "Tidsreisen – " + (LV.config ? LV.config.navn : "Les verden");
    const alle = (LV.tidsreise || []).filter(h => h[2] >= MIN && h[2] <= MAKS && (!fag || (fag === "engelsk") === !!h[6]) && (!trinn || String(h[7]) === trinn));
    $("innhold").innerHTML = '<nav class="brodsmuler" aria-label="Brødsmuler"><a href="index.html">Forside</a> › <a href="spill.html">Spill</a> › Tidsreisen</nav>' +
      '<header class="sidehode"><p class="overlinje">Spill</p><h1>⏳ Tidsreisen</h1><p class="ingress">Du blir sendt til en hendelse i historien – men årstallet er borte. Hvilket år er du i? Jo nærmere du gjetter, jo flere poeng. Trenger du hjelp, kan du kjøpe ledetråder.</p>' +
      '<form class="tr-filter" id="tr-filter"><label>Fag <select name="fag"><option value="">Begge fag</option><option value="samfunnsfag">Samfunnsfag</option><option value="engelsk">Engelsk</option></select></label><label>Trinn <select name="trinn"><option value="">Alle trinn</option><option>8</option><option>9</option><option>10</option></select></label><button class="knapp" type="submit">Ny reise</button></form></header>' +
      '<section class="tr-spill" id="tr-spill" aria-live="polite"></section>';
    $("tr-filter").fag.value = fag; $("tr-filter").trinn.value = trinn;
    $("tr-filter").addEventListener("submit", e => { e.preventDefault(); const q = new URLSearchParams(); if (e.target.fag.value) q.set("fag", e.target.fag.value); if (e.target.trinn.value) q.set("trinn", e.target.trinn.value); location.search = q.toString(); });
    if (alle.length < RUNDER) { $("tr-spill").innerHTML = '<p class="melding">For få hendelser med dette valget. Velg et annet fag eller trinn.</p>'; return; }
    // Ikke to hendelser fra samme år i én reise
    const brukt = new Set(), runder = [];
    for (const h of bland(alle)) { if (brukt.has(h[2])) continue; brukt.add(h[2]); runder.push(h); if (runder.length === RUNDER) break; }
    let n = 0, sum = 0, logg = [];

    const vis = () => {
      const h = runder[n];
      let trekk = 0;
      $("tr-spill").innerHTML = '<p class="tr-nr">Reise ' + (n + 1) + " av " + RUNDER + ' · <strong>' + sum + " poeng</strong></p>" +
        '<div class="tr-kort"' + (h[6] ? ' lang="en"' : "") + '><span class="tr-portal" aria-hidden="true">🌀</span><p class="tr-dato">' + esc(skjul(h[0])) + '</p><p class="tr-tekst">' + esc(skjul(h[1])) + "</p></div>" +
        '<div class="tr-hint"><button type="button" class="knapp liten" id="tr-sted"' + (h[5] ? "" : " disabled") + '>📍 Hvor? (−10)</button><button type="button" class="knapp liten" id="tr-tema">📚 Hvilket tema? (−10)</button><span id="tr-hinttekst" aria-live="polite"></span></div>' +
        '<form class="tr-gjett" id="tr-gjett"><label for="tr-ar">Ditt gjett: <strong id="tr-vis">1900</strong></label><input type="range" id="tr-ar" min="' + MIN + '" max="' + MAKS + '" value="1900" step="1"><div class="tr-skala" aria-hidden="true">' + [MIN, 1600, 1700, 1800, 1900, 2000].map(v => '<span style="left:' + ((v - MIN) / (MAKS - MIN) * 100) + '%">' + v + "</span>").join("") + "</div>" +
        '<div class="tr-finjuster"><button type="button" class="knapp liten" data-d="-10">−10</button><button type="button" class="knapp liten" data-d="-1">−1</button><label class="skjult-visuelt" for="tr-tall">Årstall</label><input type="number" id="tr-tall" min="' + MIN + '" max="' + MAKS + '" value="1900"><button type="button" class="knapp liten" data-d="1">+1</button><button type="button" class="knapp liten" data-d="10">+10</button></div>' +
        '<button class="knapp hoved" type="submit">🚀 Reis hit!</button></form><div id="tr-svar"></div>';
      const sett = v => { v = Math.max(MIN, Math.min(MAKS, Math.round(+v || 1900))); $("tr-ar").value = v; $("tr-tall").value = v; $("tr-vis").textContent = v; };
      $("tr-ar").addEventListener("input", e => sett(e.target.value));
      $("tr-tall").addEventListener("change", e => sett(e.target.value));
      document.querySelectorAll(".tr-finjuster [data-d]").forEach(b => b.addEventListener("click", () => sett(+$("tr-ar").value + +b.dataset.d)));
      $("tr-sted").addEventListener("click", () => { $("tr-sted").disabled = true; trekk += 10; $("tr-hinttekst").innerHTML += " 📍 <strong>" + esc(h[5]) + "</strong>"; });
      $("tr-tema").addEventListener("click", () => { $("tr-tema").disabled = true; trekk += 10; $("tr-hinttekst").innerHTML += ' 📚 <strong' + (h[6] ? ' lang="en"' : "") + ">" + esc(h[4]) + "</strong>"; });
      $("tr-gjett").addEventListener("submit", e => {
        e.preventDefault();
        const gjett = +$("tr-ar").value, diff = Math.abs(gjett - h[2]), p = Math.max(0, poengFor(diff) - trekk);
        sum += p; logg.push({ h, gjett, p });
        $("tr-gjett").querySelectorAll("input, button").forEach(x => { x.disabled = true; });
        document.querySelectorAll(".tr-hint button").forEach(x => { x.disabled = true; });
        const pos = v => ((v - MIN) / (MAKS - MIN) * 100) + "%";
        $("tr-svar").innerHTML = '<div class="tr-fasit"><p class="tr-stor">' + (diff === 0 ? "🎯 Midt i blinken!" : diff <= 5 ? "🔥 Veldig nærme!" : diff <= 20 ? "👍 Nærme" : diff <= 60 ? "🙂 Riktig århundre-ish" : "🌀 Feil tidsalder!") + "</p>" +
          '<div class="tr-linje"><span class="tr-merke gjett" style="left:' + pos(gjett) + '" title="Ditt gjett">' + gjett + '</span><span class="tr-merke riktig" style="left:' + pos(h[2]) + '" title="Riktig">' + h[2] + "</span></div>" +
          "<p><strong" + (h[6] ? ' lang="en"' : "") + ">" + esc(h[0]) + ":</strong> <span" + (h[6] ? ' lang="en"' : "") + ">" + esc(h[1]) + "</span></p><p>Du bommet med " + diff + " år og fikk <strong>" + p + " poeng</strong>" + (trekk ? " (−" + trekk + " for ledetråder)" : "") + '. <a href="tema.html?id=' + encodeURIComponent(h[3]) + '">Les om temaet →</a></p>' +
          '<button class="knapp hoved" type="button" id="tr-neste">' + (n < RUNDER - 1 ? "Neste reise →" : "Se resultatet") + "</button></div>";
        $("tr-neste").addEventListener("click", () => { n++; n < RUNDER ? vis() : ferdig(); });
        $("tr-neste").focus();
      });
    };
    const ferdig = () => {
      const maks = RUNDER * 100;
      $("tr-spill").innerHTML = '<div class="kd-slutt"><p class="kd-merke" aria-hidden="true">' + (sum >= 800 ? "🏆" : sum >= 600 ? "🥇" : sum >= 400 ? "🧭" : "🌀") + "</p><h2>" + sum + " av " + maks + " poeng</h2><p>" +
        (sum >= 800 ? "Du er en ekte tidsreisende!" : sum >= 600 ? "Imponerende – du har god oversikt over historien." : sum >= 400 ? "God start! Bruk tidslinjen for å få bedre oversikt." : "Historien er stor! Prøv tidslinjen og spill igjen.") + '</p><ol class="tr-logg">' +
        logg.map(x => "<li><strong>" + esc(x.h[2]) + "</strong> (du sa " + x.gjett + ", " + x.p + " p): " + esc(x.h[1]) + "</li>").join("") + '</ol><p><button class="knapp hoved" type="button" id="tr-igjen">↺ Ny reise</button> <a class="knapp" href="tidslinje.html">Se hele tidslinjen</a></p></div>';
      $("tr-igjen").addEventListener("click", () => location.reload());
    };
    vis();
  }
  document.addEventListener("DOMContentLoaded", bygg);
})();
