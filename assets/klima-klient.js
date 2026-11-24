/* =========================================================
   Les verden – Klimatoppmøtet i rom: visning for delegasjonene (rom.html)
   Eleven velger delegasjon, ser det hemmelige rollekortet og leverer
   tilbud (toppår, kutt per år, penger til/fra fondet) i hver runde.
   Verten er modellsiden (klima.html?vis=modell).
   ========================================================= */
(function () {
  const LV = window.LV;
  const esc = s => LV.esc(String(s == null ? "" : s));
  const TOPPER = [2025, 2030, 2035, 2040, 2045, 2050, 2060, 2070, 2080, 2100];
  const tall = (x, d) => Number(x).toLocaleString("nb-NO", { maximumFractionDigits: d || 0, minimumFractionDigits: d || 0 });

  LV.romKlient = LV.romKlient || {};
  LV.romKlient.klima = {
    start(el, send) {
      el.innerHTML = '<p class="rk-stor">✅ Du er med!</p><p>Vent litt …</p>';
      el.addEventListener("click", e => {
        const v = e.target.closest(".klr-velg"); if (v) { send({ t: "velg", id: v.dataset.id }); return; }
        if (e.target.closest(".klr-bytt")) send({ t: "velg", id: "" });
      });
      el.addEventListener("submit", e => {
        const f = e.target.closest(".klr-tilbud"); if (!f) return; e.preventDefault();
        send({ t: "tilbud", topp: +f.querySelector("[name=topp]").value, kutt: +f.querySelector("[name=kutt]").value, fond: Math.round(+f.querySelector("[name=fond]").value || 0) });
        const st = f.querySelector(".klr-status"); if (st) st.textContent = "✔ Tilbudet er levert. Dere kan endre det til læreren låser runden.";
      });
    },
    melding(d, el) {
      if (d.t !== "klima") return;
      if (!d.min) {
        LV.romTegn(el, '<p class="rkl-tekst">Hvilken delegasjon er du med i?</p><div class="klr-delegasjoner">' + d.delegasjoner.map(x => '<button type="button" class="klr-velg" data-id="' + x.id + '" style="--kl:' + x.farge + '"><span class="klr-ikon" aria-hidden="true">' + x.ikon + '</span><span><strong>' + esc(x.navn) + "</strong><br><small>" + esc(x.type) + (x.antall ? " · " + x.antall + " med" : "") + "</small></span></button>").join("") + "</div>");
        return;
      }
      const r = d.rolle;
      const perPerson = r.e0 / r.folk;
      let h = '<p class="klr-topp"><span>' + r.ikon + " <strong>" + esc(r.navn) + '</strong></span> <button type="button" class="knapp liten klr-bytt">Bytt delegasjon</button></p>';
      if (d.hendelse) h += '<div class="kl-hendelse"><h2>🎴 ' + esc(d.hendelse.tittel) + "</h2><p>" + esc(d.hendelse.tekst) + "</p></div>";
      if (d.resultat) h += '<div class="klr-resultat"><p>Etter runde ' + d.resultat.runde + ': <strong>+' + tall(d.resultat.temp, 1) + " °C</strong> i 2100 · fondet: " + tall(d.resultat.fondInn) + " av " + d.resultat.fondMal + " mrd. $</p></div>";
      if (d.fase === "tilbud") {
        const t = d.tilbud || { topp: 2100, kutt: 0, fond: 0 };
        h += '<form class="klr-tilbud" autocomplete="off"><h2>Tilbud i runde ' + d.runde + "</h2>" +
          '<label>Toppår – når slutter utslippene å vokse?<select name="topp">' + TOPPER.map(x => '<option value="' + x + '"' + (x === t.topp ? " selected" : "") + ">" + (x === 2100 ? "Ingen topp" : x) + "</option>").join("") + "</select></label>" +
          '<label>Kutt per år etter toppåret<select name="kutt">' + [0, 1, 2, 3, 4, 5, 6, 7, 8].map(x => '<option value="' + x + '"' + (x === t.kutt ? " selected" : "") + ">" + x + " %</option>").join("") + "</select></label>" +
          '<label>Penger til fondet (+) eller fra fondet (−), mrd. dollar i året<input name="fond" type="number" min="-200" max="200" step="5" value="' + t.fond + '"></label>' +
          '<button type="submit" class="knapp hoved">' + (d.levert ? "Lever nytt tilbud" : "Lever tilbudet") + '</button><p class="klr-status" role="status">' + (d.levert ? "✔ Levert. Dere kan endre til læreren låser runden." : "") + "</p></form>";
      } else if (d.fase === "laast") h += '<p class="rk-sendt">🔒 Runden er låst. Forhandle videre – læreren åpner neste runde.</p>';
      else h += '<p class="rk-sendt">Les rollekortet og forbered dere. Læreren åpner første runde.</p>';
      h += '<details class="klr-kort"' + (d.fase !== "tilbud" ? " open" : "") + '><summary>📄 Rollekortet – hemmelig!</summary>' +
        '<p class="klr-type">' + esc(r.type) + "</p><p>" + esc(r.hvem) + "</p>" +
        '<dl class="klr-tall"><div><dt>Utslipp i dag</dt><dd>' + tall(r.e0, 1) + ' mrd. tonn</dd></div><div><dt>Innbyggere</dt><dd>' + tall(r.folk * 1000) + ' mill.</dd></div><div><dt>Per person</dt><dd>' + tall(perPerson, 1) + ' tonn</dd></div><div><dt>Andel av historiske utslipp</dt><dd>' + tall(r.hist, r.hist < 1 ? 1 : 0) + " %</dd></div></dl>" +
        "<h3>Dette vil dere</h3><ul>" + r.vil.map(x => "<li>" + esc(x) + "</li>").join("") + "</ul>" +
        "<h3>Grensene deres</h3><ul>" + r.grenser.map(x => "<li>" + esc(x) + "</li>").join("") + "</ul><p><em>" + esc(r.kort) + "</em></p></details>";
      LV.romTegn(el, h);
    }
  };
})();
