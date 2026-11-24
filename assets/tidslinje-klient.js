/* =========================================================
   Les verden – Tidslinjeduellen i rom: visning for lagene (rom.html)
   Alle lagene får det samme kortet samtidig og legger det på sin
   egen tidslinje. Den første på laget som trykker, svarer for laget.
   Verten (tidslinjeduell.html) bestemmer kort, tid og poeng.
   ========================================================= */
(function () {
  const LV = window.LV;
  const esc = s => LV.esc(String(s == null ? "" : s));
  LV.romKlient = LV.romKlient || {};
  LV.romKlient.tidslinje = {
    start(el, send) {
      el.innerHTML = '<p class="rk-stor">✅ Du er med!</p><p>Vent på at duellen starter.</p>';
      el.addEventListener("click", e => {
        const b = e.target.closest(".td-plass"); if (!b || b.disabled) return;
        send({ t: "plass", i: +b.dataset.i, nr: +b.dataset.nr });
        el.querySelectorAll(".td-plass").forEach(x => { x.disabled = true; });
        b.classList.add("td-valgt");
      });
    },
    melding(d, el) {
      if (d.t !== "td") return;
      const lagHode = d.lag ? '<p class="tdr-lag" style="--tdr-f:' + d.lag.farge + '">' + d.lag.ikon + " " + esc(d.lag.navn) + " · <strong>" + d.lag.p + "</strong> / " + d.mal + "</p>" : "";
      const stilling = d.alle ? '<p class="tdr-stilling">' + d.alle.map(l => l.ikon + " " + esc(l.navn) + ": " + l.p).join(" · ") + "</p>" : "";
      if (d.fase === "venter" || d.fase === "lobby" || (!d.kort && d.fase !== "slutt")) { el.innerHTML = lagHode + '<p class="rk-stor">✅ Du er med!</p><p>Vent på at duellen starter.</p>'; return; }
      if (d.fase === "slutt") { el.innerHTML = '<p class="rk-stor">🏁 ' + esc(d.vinnerTekst) + "</p>" + stilling + lagHode; return; }
      const plass = (i, nr, laast) => {
        const f = d.linje[i - 1], e = d.linje[i];
        const t = !f ? "Før " + e[0] : !e ? "Etter " + f[0] : "Mellom " + f[0] + " og " + e[0];
        return '<li class="td-gap"><button type="button" class="td-plass' + (d.svar && d.svar.i === i ? " td-valgt" : "") + '" data-i="' + i + '" data-nr="' + nr + '"' + (laast ? " disabled" : "") + ">↳ " + t + "</button></li>";
      };
      const laast = d.fase !== "kort" || !!d.svar;
      let h = lagHode + '<div class="td-kort"' + (d.kort.en ? ' lang="en"' : "") + '><p class="td-tur">Kort ' + d.nr + '</p><p class="td-tekst">' + esc(d.kort.tekst) + '</p><p class="td-tema" lang="nb">📚 ' + esc(d.kort.tema) + "</p></div>";
      if (d.fase === "kort") h += d.svar ? '<p class="rk-sendt">Laget har svart' + (d.svar.av ? " (" + esc(d.svar.av) + ")" : "") + ". Venter på de andre lagene …</p>" : '<p class="td-hjelp">Snakk sammen på laget. Den første som trykker, svarer for hele laget!</p>';
      if (d.fase === "fasit") h += '<p class="td-melding ' + (d.resultat.ok ? "ok" : "feil") + '" role="status">' + (d.resultat.ok ? "✔ Riktig! Det" : d.svar ? "✗ Feil – det" : "⏰ Dere rakk ikke å svare – det") + " skjedde i <strong>" + esc(d.resultat.ar) + "</strong>: " + esc(d.resultat.tittel) + "</p>" + stilling + '<p class="rv-merk">Neste kort kommer snart …</p>';
      h += '<ol class="td-linje">' + d.linje.map((x, i) => plass(i, d.nr, laast) + '<li class="td-lagt"><span class="td-ar">' + x[0] + "</span><span" + (x[2] ? ' lang="en"' : "") + ">" + esc(x[1]) + "</span></li>").join("") + plass(d.linje.length, d.nr, laast) + "</ol>";
      el.innerHTML = h;
    }
  };
})();
