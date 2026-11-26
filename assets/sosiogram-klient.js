/* =========================================================
   Les verden – Sosiogram: visning på elevens enhet (rom.html)
   Eleven velger sitt eget navn fra klasselista og krysser av for
   opptil N klassekamerater på et positivt spørsmål. Bare læreren
   ser svarene.
   ========================================================= */
(function () {
  const LV = window.LV;
  const esc = s => LV.esc(String(s == null ? "" : s));
  LV.romKlient = LV.romKlient || {};
  LV.romKlient.sosiogram = {
    start(el, send) {
      el.innerHTML = '<p class="rk-stor">✅ Du er med!</p><p>Vent på læreren.</p>';
      el.addEventListener("click", e => { const b = e.target.closest(".sg-meg"); if (b && !b.disabled) send({ t: "meg", id: b.dataset.id }); });
      el.addEventListener("change", e => {
        const f = e.target.closest(".sg-skjema"); if (!f) return;
        const maks = +f.dataset.maks, valgt = f.querySelectorAll("input:checked");
        f.querySelectorAll("input").forEach(x => { x.disabled = !x.checked && valgt.length >= maks; });
        f.querySelector(".sg-teller").textContent = valgt.length + " av " + maks + " valgt";
      });
      el.addEventListener("submit", e => {
        const f = e.target.closest(".sg-skjema"); if (!f) return; e.preventDefault();
        send({ t: "valg", valg: [...f.querySelectorAll("input:checked")].map(x => x.value) });
      });
    },
    melding(d, el) {
      if (d.t !== "sosio") return;
      let h = "";
      if (d.fase === "venter") h = '<p class="rk-stor">✅ Du er med!</p><p>Vent på at læreren starter.</p>';
      else if (d.fase === "hvem") h = '<p class="rkl-tekst">Hvem er du? Trykk på navnet ditt.</p>' + (d.melding ? '<p class="bb-melding" role="alert">' + esc(d.melding) + "</p>" : "") + '<div class="sg-navneliste">' + d.elever.map(x => '<button type="button" class="knapp sg-meg" data-id="' + esc(x.id) + '"' + (x.tatt ? " disabled" : "") + ">" + esc(x.navn) + "</button>").join("") + "</div>";
      else if (d.fase === "svar") h = '<p class="sg-hei">Hei, <strong>' + esc(d.meg) + '</strong>!</p><form class="sg-skjema" data-maks="' + d.maks + '"><fieldset><legend class="rkl-tekst">' + esc(d.sporsmal) + "</legend><p class=\"rv-merk\">Velg opptil " + d.maks + ". Bare læreren ser svaret ditt.</p>" +
        '<div class="sg-valgliste">' + d.elever.map(x => '<label class="sg-valg"><input type="checkbox" value="' + esc(x.id) + '"> ' + esc(x.navn) + "</label>").join("") + '</div></fieldset><p class="sg-teller" aria-live="polite">0 av ' + d.maks + ' valgt</p><button type="submit" class="knapp hoved">Send svaret</button></form>';
      else if (d.fase === "takk") h = '<p class="rk-stor">🙏 Takk!</p><p>Svaret ditt er sendt. Det er bare læreren som ser det.</p>';
      el.innerHTML = h;
    }
  };
})();
