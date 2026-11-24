/* =========================================================
   Les verden – Bli med i et rom (rom.html)
   Eleven skriver romkode og kallenavn. Hva som vises etterpå,
   bestemmes av spillet i rommet (LV.romKlient[spill]).
   rom.html?kode=ABCDE. Ingenting lagres.
   ========================================================= */
(function () {
  const LV = window.LV;
  const $ = id => document.getElementById(id);
  const esc = s => LV.esc(String(s == null ? "" : s));
  const FORMER = ["▲", "◆", "●", "■"];
  let api = null, sistKode = "", sistNavn = "";

  // ---------- Spillvisninger ----------
  LV.romKlient = LV.romKlient || {};
  LV.romKlient.klassequiz = {
    start(el) { el.innerHTML = '<p class="rk-stor">✅ Du er med!</p><p>Vent på at læreren starter quizen.</p>'; },
    melding(d, el, send) {
      if (d.t === "venter") { el.innerHTML = '<p class="rk-stor">✅ Du er med!</p><p>Vent på at læreren starter quizen' + (d.tittel ? " «" + esc(d.tittel) + "»" : "") + ".</p>"; return; }
      if (d.t === "sporsmal") {
        el.innerHTML = '<p class="rk-nr">' + (d.nr + 1) + " / " + d.antall + '</p><p class="rk-sporsmal"' + (d.en ? ' lang="en"' : "") + ">" + esc(d.s) + '</p><div class="rk-valg"' + (d.en ? ' lang="en"' : "") + ">" +
          d.valg.map((v, i) => '<button type="button" class="rk-alt kq-alt-' + i + '" data-pos="' + i + '"><span class="rk-form" aria-hidden="true">' + FORMER[i] + '</span><span>' + esc(v) + "</span></button>").join("") + "</div>";
        el.querySelectorAll(".rk-alt").forEach(b => b.addEventListener("click", () => {
          send({ t: "svar", nr: d.nr, pos: +b.dataset.pos });
          el.querySelectorAll(".rk-alt").forEach(x => { x.disabled = true; x.classList.toggle("valgt", x === b); });
          el.insertAdjacentHTML("beforeend", '<p class="rk-sendt" role="status">Svaret er sendt ✔ Vent på fasiten …</p>');
        }));
        return;
      }
      if (d.t === "fasit") {
        el.innerHTML = '<div class="rk-fasit ' + (d.riktig ? "rk-riktig" : "rk-feil") + '"><p class="rk-stor">' + (d.riktig ? "✔ Riktig!" : d.svarte ? "✘ Ikke riktig" : "⏰ Du rakk ikke å svare") + "</p>" +
          (d.riktig ? "<p>+" + d.poeng + " poeng</p>" : "") + '<p>Riktig svar: <strong>' + FORMER[d.rett] + " " + esc(d.rettTekst) + "</strong></p><p>Du har " + d.total + " poeng og er på " + d.plass + ". plass av " + d.av + ".</p></div>";
        return;
      }
      if (d.t === "slutt") {
        el.innerHTML = '<p class="rk-stor">🏁 Quizen er ferdig!</p><p>Du fikk <strong>' + d.total + " poeng</strong> og kom på <strong>" + d.plass + ". plass</strong> av " + d.av + ".</p>" + (d.plass <= 3 ? '<p class="rk-stor">' + ["🥇", "🥈", "🥉"][d.plass - 1] + "</p>" : "") + "<p>Bli i rommet hvis læreren starter en ny runde.</p>";
      }
    }
  };

  // ---------- Innmelding ----------
  function skjema(melding) {
    const kode = LV.rom ? LV.rom.rensKode(LV.param("kode") || sistKode) : "";
    $("innhold").innerHTML = '<nav class="brodsmuler" aria-label="Brødsmuler"><a href="index.html">Forside</a> › <a href="spill.html">Spill</a> › Bli med i et rom</nav>' +
      '<header class="sidehode"><p class="overlinje">Spill sammen</p><h1>🔑 Bli med i et rom</h1><p class="ingress">Skriv romkoden fra tavla eller fra den som har laget rommet.</p></header>' +
      '<form class="rk-skjema" id="rk-skjema" autocomplete="off"><label for="rk-kode">Romkode</label><input id="rk-kode" class="rk-kodefelt" inputmode="text" autocapitalize="characters" spellcheck="false" maxlength="7" value="' + esc(kode) + '" required>' +
      '<label for="rk-navn">Kallenavn</label><input id="rk-navn" maxlength="16" spellcheck="false" value="' + esc(sistNavn) + '" required><p class="rk-merk">Bruk et kallenavn eller bare fornavnet – ikke fullt navn.</p>' +
      '<button type="submit" class="knapp hoved">Bli med →</button><p class="status" id="rk-status" role="status" aria-live="polite">' + esc(melding || "") + "</p></form>" +
      '<p class="rk-merk">Ingenting lagres. Enhetene kobles direkte til hverandre, og en offentlig tjeneste (PeerJS) brukes bare til å finne rommet.</p>';
    (kode ? $("rk-navn") : $("rk-kode")).focus();
    $("rk-skjema").addEventListener("submit", e => { e.preventDefault(); kobleTil($("rk-kode").value, $("rk-navn").value); });
  }

  async function kobleTil(kode, navn) {
    sistKode = LV.rom.rensKode(kode); sistNavn = LV.rom.rensNavn(navn);
    if (sistKode.length !== 5 || !sistNavn) { const s = $("rk-status"); if (s) s.textContent = sistKode.length !== 5 ? "Romkoden har fem tegn." : "Skriv et kallenavn."; return; }
    const st = $("rk-status"); if (st) st.textContent = "Kobler til rom " + sistKode + " …";
    let el = null, visning = null;
    const forsok = () => LV.rom.bli(sistKode, sistNavn, {
      onMelding: d => { if (visning && el) visning.melding(d, el, x => api.send(x)); },
      onStatus: s => frakoblet(s)
    });
    try { api = await forsok(); }
    catch (e) {
      // Koblingstjenesten kan være treg – prøv én gang til før vi gir opp
      const st2 = $("rk-status"); if (st2) st2.textContent = "Prøver igjen …";
      await new Promise(r => setTimeout(r, 1500));
      try { api = await forsok(); } catch (e2) { skjema(LV.rom.feilTekst(e2)); return; }
    }
    visning = LV.romKlient[api.spill] || { start: x => { x.innerHTML = "<p>Du er med i rommet.</p>"; }, melding() {} };
    $("innhold").innerHTML = '<div class="rk-spill"><div class="rk-topp"><span>Rom <strong>' + esc(sistKode) + "</strong> · " + esc(api.navn) + '</span><button type="button" class="knapp liten" id="rk-forlat">Forlat rommet</button></div><div id="rk-flate" class="rk-flate" aria-live="polite"></div></div>';
    el = $("rk-flate");
    visning.start(el, x => api.send(x));
    $("rk-forlat").addEventListener("click", () => { api.lukk(); api = null; skjema("Du forlot rommet."); });
  }

  function frakoblet(s) {
    const tekst = s === "stengt" ? "Rommet er stengt." : s === "kastet" ? "Du ble fjernet fra rommet." : "Mistet forbindelsen til rommet.";
    const flate = $("rk-flate");
    if (!flate) { skjema(tekst); return; }
    flate.innerHTML = '<p class="rk-stor">' + (s === "frakoblet" ? "📡 " : "🚪 ") + tekst + "</p>" + (s === "frakoblet" ? '<p><button type="button" class="knapp hoved" id="rk-igjen">Koble til igjen</button></p><p class="rk-merk">Du får beholde poengene hvis du bruker samme kallenavn.</p>' : '<p><button type="button" class="knapp" id="rk-ny">Bli med i et annet rom</button></p>');
    const igjen = $("rk-igjen"); if (igjen) igjen.addEventListener("click", () => kobleTil(sistKode, sistNavn));
    const ny = $("rk-ny"); if (ny) ny.addEventListener("click", () => skjema(""));
  }

  document.addEventListener("DOMContentLoaded", () => { document.title = "Bli med i et rom – " + (LV.config ? LV.config.navn : "Les verden"); skjema(""); });
})();
