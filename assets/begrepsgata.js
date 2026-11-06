/* =========================================================
   Les verden – Begrepsgåta (begrepsgata.html)
   Gjett fagbegrepet ut fra forklaringen. Hver feil gir en ny
   ledetråd (tema, antall bokstaver, noen bokstaver …).
   Dagens gåte er den samme for hele klassen (velges ut fra datoen).
   Data: data/dagens-begrep.js (lages av verktoy/lag-sok.mjs).
   ?fag=samfunnsfag|engelsk. Ingenting lagres.
   ========================================================= */
(function () {
  const LV = window.LV;
  const $ = id => document.getElementById(id);
  const esc = s => LV.esc(String(s == null ? "" : s));
  const norm = s => String(s).toLowerCase().normalize("NFC").replace(/^(to|a|an|the)\s+/, "").replace(/[^a-zæøåäöüé0-9-]/g, "");
  const MAKS = 5;

  function bygg() {
    const fag = LV.param("fag") === "engelsk" ? "engelsk" : "samfunnsfag", en = fag === "engelsk";
    const alle = (LV.dagensBegrep || []).filter(x => !!x[4] === en && !/\s/.test(x[0]) && x[0].length >= 4 && x[0].length <= 14);
    const dag = Math.floor(Date.now() / 864e5);
    let idx = (dag * 53) % alle.length, dagens = true, poeng = 0, runder = 0;
    document.title = "Begrepsgåta – " + (LV.config ? LV.config.navn : "Les verden");

    $("innhold").innerHTML = '<nav class="brodsmuler" aria-label="Brødsmuler"><a href="index.html">Forside</a> › <a href="spill.html">Spill</a> › Begrepsgåta</nav>' +
      '<header class="sidehode"><p class="overlinje">Spill · begreper</p><h1>🧩 Begrepsgåta</h1><p class="ingress">Hvilket fagbegrep er forklart her? Du har fem forsøk. For hver feil får du en ny ledetråd. Dagens gåte er den samme for alle – sammenlign med klassen!</p>' +
      '<div class="kd-filter" role="group" aria-label="Fag"><a class="knapp liten" href="begrepsgata.html"' + (!en ? ' aria-current="true"' : "") + '>Samfunnsfag</a><a class="knapp liten" href="begrepsgata.html?fag=engelsk"' + (en ? ' aria-current="true"' : "") + ">Engelsk</a></div></header>" +
      '<section class="ko-kort bq-gata" id="bq-gata"' + (en ? ' lang="en"' : "") + "></section>";

    const gate = () => {
      const [ord, forkl, temaId, temaTittel] = alle[idx];
      let no = "", def = forkl;
      if (en && forkl.includes(" – ")) { no = forkl.slice(0, forkl.indexOf(" – ")); def = forkl.slice(forkl.indexOf(" – ") + 3); }
      const stamme = ord.toLowerCase().slice(0, Math.max(4, ord.length - 2));
      const maskert = def.replace(new RegExp("\\b" + stamme.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\w*", "gi"), "____");
      const halv = ord.split("").map((c, i) => (i % 2 === 0 ? c : "_")).join(" ");
      const hint = en
        ? [["🇳🇴 In Norwegian", no || "–"], ["📚 Topic", temaTittel], ["🔤 Letters", ord.length + " letters, starts with «" + ord[0].toUpperCase() + "»"], ["🧩 Every other letter", halv]]
        : [["📚 Tema", temaTittel], ["🔤 Bokstaver", ord.length + " bokstaver, begynner på «" + ord[0].toUpperCase() + "»"], ["🧩 Annenhver bokstav", halv], ["✍️ Siste bokstav", "… slutter på «" + ord[ord.length - 1] + "»"]];
      let forsok = [], ferdig = false;

      const tegn = () => {
        const vist = Math.min(forsok.length, hint.length);
        $("bq-gata").innerHTML = '<p class="bq-merke">' + (dagens ? (en ? "📅 Today’s puzzle" : "📅 Dagens gåte") : (en ? "🎲 Random puzzle" : "🎲 Tilfeldig gåte")) + (runder ? " · " + (en ? "Score" : "Poeng") + ": " + poeng + " / " + runder * MAKS : "") + "</p>" +
          '<p class="bq-forkl">«' + esc(maskert) + "»</p>" +
          '<ul class="bq-hint">' + hint.slice(0, vist).map(([a, b]) => "<li><strong>" + esc(a) + ":</strong> " + esc(b) + "</li>").join("") + "</ul>" +
          (forsok.length ? '<p class="bq-forsok">' + forsok.map(f => '<span class="' + (f.ok ? "ok" : "feil") + '">' + esc(f.v) + "</span>").join("") + "</p>" : "") +
          (ferdig ? "" : '<form id="bq-form" class="es-kode"><label class="skjult-visuelt" for="bq-svar">' + (en ? "Your answer" : "Ditt svar") + '</label><input id="bq-svar" type="text" autocomplete="off" spellcheck="false" placeholder="' + (en ? "Which term?" : "Hvilket begrep?") + '"><button class="knapp hoved" type="submit">' + (en ? "Guess" : "Gjett") + '</button></form><p class="bq-igjen">' + (MAKS - forsok.length) + (en ? " guesses left" : " forsøk igjen") + "</p>") +
          '<div id="bq-slutt" aria-live="polite"></div>';
        if (!ferdig) {
          $("bq-form").addEventListener("submit", e => {
            e.preventDefault();
            const v = $("bq-svar").value.trim(); if (!v) return;
            const ok = norm(v) === norm(ord);
            forsok.push({ v, ok });
            if (ok || forsok.length >= MAKS) { ferdig = true; slutt(ok); } else { tegn(); $("bq-svar").focus(); }
          });
          $("bq-svar").focus({ preventScroll: true });
        }
      };
      const slutt = (ok) => {
        const p = ok ? MAKS - forsok.length + 1 : 0;
        poeng += p; runder++;
        tegn();
        $("bq-slutt").innerHTML = '<div class="kd-fasit ' + (ok ? "ok" : "ikke") + '"><p class="bq-svaret"><strong>' + esc(ord) + "</strong> " + (ok ? "★".repeat(p) + "☆".repeat(MAKS - p) : "") + "</p><p>" + esc(forkl) + "</p><p>" +
          (ok ? (forsok.length === 1 ? (en ? "Brilliant – first try!" : "Glimrende – på første forsøk!") : (en ? "Well done!" : "Bra jobbet!")) : (en ? "Not this time." : "Ikke denne gangen.")) +
          ' <a href="tema.html?id=' + encodeURIComponent(temaId) + '">' + (en ? "Read about" : "Les om") + " «" + esc(temaTittel) + "» →</a></p></div>" +
          '<button type="button" class="knapp hoved" id="bq-ny">🎲 ' + (en ? "New puzzle" : "Ny gåte") + "</button>";
        $("bq-ny").addEventListener("click", () => { idx = Math.floor(Math.random() * alle.length); dagens = false; gate(); });
        $("bq-ny").focus();
      };
      tegn();
    };
    if (alle.length) gate(); else $("bq-gata").innerHTML = "<p>Fant ingen begreper.</p>";
  }
  document.addEventListener("DOMContentLoaded", bygg);
})();
