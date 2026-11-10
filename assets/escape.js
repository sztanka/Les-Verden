/* =========================================================
   Les verden – Escape room (escape.html)
   escape.html → oversikt · escape.html?id=<rom>
   escape.html?id=<rom>&papir=1 → papirversjon for klasserommet
     (én «konvolutt» per lås, hintkort og fasit for læreren)
   Svaret på hver lås står i teksten i rommet. Hint koster ett
   minutt ekstra. Tiden går oppover. Lagmodus gir roterende roller.
   Ingenting lagres. Data: data/escape.js
   Låstyper: kode · valg · rekke · rutenett (kart) · feil (finn feilen) · par (koble sammen)
   ========================================================= */
(function () {
  const LV = window.LV;
  const $ = id => document.getElementById(id);
  const esc = s => LV.esc(String(s == null ? "" : s));
  const bland = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const fmt = t => esc(t).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\*(.+?)\*/g, "<em>$1</em>");
  const avsnitt = t => t.startsWith("> ") ? '<blockquote class="es-dok">' + t.split("\n").map(l => fmt(l.replace(/^> ?/, ""))).join("<br>") + "</blockquote>" : "<p>" + fmt(t) + "</p>";
  const norm = s => String(s).toLowerCase().normalize("NFC").replace(/[.,!?«»"'’\s]+/g, " ").trim();
  const T = {
    nb: { rom: "Rom", las: "Lås", av: "av", tid: "Tid", hint: "💡 Hint (+1 min)", sjekk: "Prøv å åpne", feil: "Låst! Prøv igjen.", apen: "🔓 Åpen!", videre: "Gå videre →", ut: "Gå ut →", svar: "Ditt svar", fri: "Du er fri!", bruktTid: "Tid brukt", hintBrukt: "hint brukt", igjen: "↺ Spill igjen", andre: "Velg et annet rom", start: "Start", flytt: ["Flytt opp", "Flytt ned"], start2: "Start rømningen →", les: "Les mer i temaet",
      lag: "👥 Spill som lag med roller", lagInfo: "For grupper på 3–4. Rollene bytter ved hver lås, så alle får prøve alt.", person: "Person", roller: "Rollene ved denne låsen",
      R: [["📖", "Leser", "leser teksten høyt for gruppa"], ["🔎", "Detektiv", "leter etter ledetråder og peker i teksten"], ["✍️", "Skriver", "skriver eller velger svaret når gruppa er enig"], ["⏱️", "Tidsvokter", "følger med på tiden og bestemmer om dere skal ta hint"]],
      kartTekst: "Trykk på riktig rute på kartet.", feilTekst: "Trykk på setningen som er feil.", parRiktig: (a, b) => a + " av " + b + " riktige. Prøv igjen.", velg: "Velg …",
      papir: "🖨️ Papirversjon for klasserommet", papirKort: "Skriv ut låsene som konvolutter, med hintkort og fasit til læreren." },
    en: { rom: "Room", las: "Lock", av: "of", tid: "Time", hint: "💡 Hint (+1 min)", sjekk: "Try to open", feil: "Locked! Try again.", apen: "🔓 Open!", videre: "Go on →", ut: "Get out →", svar: "Your answer", fri: "You are free!", bruktTid: "Time", hintBrukt: "hints used", igjen: "↺ Play again", andre: "Choose another room", start: "Start", flytt: ["Move up", "Move down"], start2: "Start the escape →", les: "Read more in the topic",
      lag: "👥 Play as a team with roles", lagInfo: "For groups of 3–4. The roles change at every lock, so everyone tries everything.", person: "Person", roller: "Roles for this lock",
      R: [["📖", "Reader", "reads the text aloud to the group"], ["🔎", "Detective", "looks for clues and points them out in the text"], ["✍️", "Writer", "types or chooses the answer when the group agrees"], ["⏱️", "Timekeeper", "keeps an eye on the time and decides about hints"]],
      kartTekst: "Click the right square on the map.", feilTekst: "Click the sentence that is wrong.", parRiktig: (a, b) => a + " of " + b + " correct. Try again.", velg: "Choose …",
      papir: "🖨️ Paper version for the classroom", papirKort: "" }
  };
  const mmss = s => Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0");
  const OPPG = "Til læreren: La elevene jobbe i par eller små grupper – gjerne i lagmodus med roller. Tiden går oppover, og hvert hint koster ett minutt. Hvem kommer seg ut raskest? Hvert rom har også en papirversjon med konvolutter, hintkort og fasit, slik at dere kan spille escape room i klasserommet uten skjerm.";

  function oversikt() {
    document.title = "Escape room – " + (LV.config ? LV.config.navn : "Les verden");
    const kort = r => '<li><a class="fo-kort" href="escape.html?id=' + r.id + '" style="--fo-a:' + r.farger[0] + ';--fo-b:' + r.farger[1] + '"' + (r.sprak === "en" ? ' lang="en"' : "") + '><span class="fo-kort-topp"><span class="fo-ikon" aria-hidden="true">' + r.ikon + "</span><span>" + esc(r.sted) + "</span></span><strong>" + esc(r.tittel) + "</strong><span>" + esc(r.kort) + '</span><span class="fo-trinn" lang="nb">' + (r.sprak === "en" ? "🇬🇧 English · " : "") + r.trinn + ". trinn · " + r.laser.length + " låser</span></a></li>";
    const liste = LV.escape.slice().sort((a, b) => a.trinn - b.trinn);
    $("innhold").innerHTML = '<nav class="brodsmuler" aria-label="Brødsmuler"><a href="index.html">Forside</a> › <a href="spill.html">Spill</a> › Escape room</nav>' +
      '<header class="sidehode"><p class="overlinje">Spill · lesing</p><h1>🔐 Escape room</h1><p class="ingress">Du er låst inne. Hver dør har en lås, og svaret står i teksten du finner i rommet – men du må lese nøye! Bruk hint hvis du står fast, men det koster tid.</p></header>' +
      [["nb", "På norsk"], ["en", "In English"]].map(([sp, navn]) => {
        const l = liste.filter(r => (r.sprak || "nb") === sp);
        return l.length ? '<h2 class="fo-gruppe">' + navn + '</h2><ul class="fo-liste">' + l.map(kort).join("") + "</ul>" : "";
      }).join("") +
      '<p class="mu-intro">' + OPPG + "</p>";
  }

  // ---------- Felles: HTML for selve låsen (skjerm) ----------
  function lasHtml(l, tx) {
    let h = "";
    if (l.type === "kode") h += '<form id="es-form" class="es-kode"><label class="skjult-visuelt" for="es-svar">' + tx.svar + '</label><input id="es-svar" type="text" autocomplete="off" spellcheck="false" placeholder="' + tx.svar + '"><button class="knapp hoved" type="submit">' + tx.sjekk + "</button></form>";
    if (l.type === "valg") h += '<div class="fo-valg" role="group">' + bland(l.valg.map((_, i) => i)).map(i => '<button type="button" class="fo-valgknapp es-valg" data-i="' + i + '">' + esc(l.valg[i]) + "</button>").join("") + "</div>";
    if (l.type === "rekke") h += '<ol class="av-liste" id="es-rekke"></ol><button class="knapp hoved" type="button" id="es-sjekk">' + tx.sjekk + "</button>";
    if (l.type === "rutenett") {
      const k = l.kart;
      h += '<p class="es-instr">' + tx.kartTekst + '</p><div class="es-kartramme"><table class="es-kart"><caption class="skjult-visuelt">' + esc(l.oppgave) + '</caption><thead><tr><td></td>' + k.kolonner.map(c => '<th scope="col">' + esc(c) + "</th>").join("") + "</tr></thead><tbody>" +
        k.rader.map(r => '<tr><th scope="row">' + esc(r) + "</th>" + k.kolonner.map(c => {
          const id = c + r, inn = (k.celler || {})[id];
          return '<td class="' + (inn ? "har" : "") + ((k.vann || []).includes(id) ? " vann" : "") + '"><button type="button" class="es-rute" data-rute="' + id + '" aria-label="' + id + (inn ? ": " + esc(inn) : "") + '">' + (inn ? '<span aria-hidden="true">' + esc(inn) + "</span>" : "") + "</button></td>";
        }).join("") + "</tr>").join("") + "</tbody></table></div>";
    }
    if (l.type === "feil") h += '<p class="es-instr">' + tx.feilTekst + '</p><div class="es-setninger" role="group">' + l.setninger.map((s, i) => '<button type="button" class="es-setning" data-i="' + i + '"><span class="es-snr">' + (i + 1) + "</span> " + fmt(s) + "</button>").join("") + "</div>";
    if (l.type === "par") {
      const hoyre = bland(l.par.map((_, i) => i));
      h += '<div class="es-par">' + l.par.map((p, i) => '<div class="es-parrad"><label for="es-p-' + i + '">' + fmt(p[0]) + '</label><select id="es-p-' + i + '"><option value="">' + tx.velg + "</option>" + hoyre.map(j => '<option value="' + j + '">' + esc(l.par[j][1]) + "</option>").join("") + "</select></div>").join("") + '</div><button class="knapp hoved" type="button" id="es-sjekk">' + tx.sjekk + "</button>";
    }
    return h;
  }

  function rom(r) {
    const sp = r.sprak === "en" ? "en" : "nb", tx = T[sp];
    document.title = r.tittel + " – Escape room";
    let n = 0, sek = 0, straff = 0, hint = 0, tikk = null, lag = false;
    const tema = LV.temaer && LV.temaer.find(t => t.id === r.tema);
    $("innhold").innerHTML = '<nav class="brodsmuler" aria-label="Brødsmuler"><a href="index.html">Forside</a> › <a href="spill.html">Spill</a> › <a href="escape.html">Escape room</a> › ' + esc(r.tittel) + "</nav>" +
      '<div' + (sp === "en" ? ' lang="en"' : "") + '><header class="sidehode es-hode" style="--fo-a:' + r.farger[0] + ";--fo-b:" + r.farger[1] + '"><p class="overlinje">' + esc(r.sted) + '</p><h1><span aria-hidden="true">' + r.ikon + "</span> " + esc(r.tittel) + '</h1></header><div class="es-status" id="es-status"></div><div id="es-spill" class="es-spill"></div></div>';

    const status = () => {
      $("es-status").innerHTML = '<span>🔐 ' + tx.las + " " + Math.min(n + 1, r.laser.length) + " " + tx.av + " " + r.laser.length + '</span><span class="es-lasrekke" aria-hidden="true">' + r.laser.map((_, i) => i < n ? "🔓" : "🔒").join("") + '</span><span>⏱ ' + tx.tid + ': <strong id="es-tid">' + mmss(sek + straff) + "</strong></span>";
    };
    const start = () => { clearInterval(tikk); tikk = setInterval(() => { sek++; const t = $("es-tid"); if (t) t.textContent = mmss(sek + straff); }, 1000); };

    const intro = () => {
      status();
      $("es-spill").innerHTML = '<section class="ko-kort es-kort"><p class="es-intro">' + fmt(r.intro) + '</p>' +
        '<p class="es-lagvalg"><label><input type="checkbox" id="es-lag"' + (lag ? " checked" : "") + "> " + tx.lag + '</label><span class="es-laginfo">' + tx.lagInfo + "</span></p>" +
        '<button type="button" class="knapp hoved" id="es-start">' + tx.start2 + '</button></section>' +
        '<p class="es-papirlenke" lang="nb"><a href="escape.html?id=' + encodeURIComponent(r.id) + '&amp;papir=1">' + T.nb.papir + "</a> – " + T.nb.papirKort + "</p>";
      $("es-start").addEventListener("click", () => { lag = $("es-lag").checked; start(); las(); });
    };

    const rolleRad = () => {
      if (!lag) return "";
      return '<div class="es-roller" role="note" aria-label="' + tx.roller + '">' + tx.R.map((_, p) => {
        const rr = tx.R[(p + n) % tx.R.length];
        return '<span class="es-rolle"><span aria-hidden="true">' + rr[0] + "</span> <strong>" + tx.person + " " + (p + 1) + ":</strong> " + rr[1] + '<small>' + rr[2] + "</small></span>";
      }).join("") + "</div>";
    };

    const las = () => {
      const l = r.laser[n];
      let orden = l.type === "rekke" ? bland(l.rekke.map((_, i) => i)) : null;
      if (orden) while (orden.every((v, i) => v === i)) orden = bland(orden);
      status();
      $("es-spill").innerHTML = '<section class="ko-kort es-kort"><h2 tabindex="-1">' + esc(l.tittel) + "</h2>" + rolleRad() + l.tekst.map(avsnitt).join("") +
        '<div class="es-las"><p class="es-oppgave"><span aria-hidden="true">🔒</span> ' + fmt(l.oppgave) + "</p>" + lasHtml(l, tx) +
        '<p class="es-melding" id="es-melding" role="status" aria-live="assertive"></p><button type="button" class="knapp liten" id="es-hint">' + tx.hint + '</button><p class="es-hinttekst" id="es-hinttekst" hidden></p></div></section>';
      $("es-spill").querySelector("h2").focus({ preventScroll: true });
      $("es-status").scrollIntoView({ behavior: "smooth", block: "start" });

      const tegnRekke = () => {
        $("es-rekke").innerHTML = orden.map((j, pos) => '<li class="av-ledd" data-pos="' + pos + '"><span class="av-nr" aria-hidden="true">' + (pos + 1) + '</span><span class="av-tekst">' + esc(l.rekke[j]) + '</span><span class="av-pil"><button type="button" data-opp="' + pos + '" aria-label="' + tx.flytt[0] + '"' + (pos ? "" : " disabled") + '>↑</button><button type="button" data-ned="' + pos + '" aria-label="' + tx.flytt[1] + '"' + (pos < orden.length - 1 ? "" : " disabled") + ">↓</button></span></li>").join("");
      };
      if (orden) {
        tegnRekke();
        $("es-rekke").addEventListener("click", e => {
          const b = e.target.closest("button"); if (!b) return;
          const i = +(b.dataset.opp || b.dataset.ned), j = b.dataset.opp !== undefined ? i - 1 : i + 1;
          [orden[i], orden[j]] = [orden[j], orden[i]]; tegnRekke();
          const ny = $("es-rekke").querySelector('[data-pos="' + j + '"] button:not([disabled])'); if (ny) ny.focus();
        });
        $("es-sjekk").addEventListener("click", () => sjekk(orden.every((v, i) => v === i)));
      }
      if (l.type === "kode") $("es-form").addEventListener("submit", e => { e.preventDefault(); const v = norm($("es-svar").value); if (v) sjekk(l.svar.some(s => norm(s) === v)); });
      if (l.type === "valg") $("es-spill").querySelectorAll(".es-valg").forEach(b => b.addEventListener("click", () => { const ok = +b.dataset.i === l.riktig; if (!ok) b.disabled = true; sjekk(ok); }));
      if (l.type === "rutenett") $("es-spill").querySelectorAll(".es-rute").forEach(b => b.addEventListener("click", () => { const ok = b.dataset.rute === l.svar; if (!ok) { b.disabled = true; b.classList.add("bom"); } else b.classList.add("treff"); sjekk(ok); }));
      if (l.type === "feil") $("es-spill").querySelectorAll(".es-setning").forEach(b => b.addEventListener("click", () => { const ok = +b.dataset.i === l.riktig; if (!ok) b.disabled = true; else b.classList.add("treff"); sjekk(ok); }));
      if (l.type === "par") $("es-sjekk").addEventListener("click", () => {
        const sel = [...$("es-spill").querySelectorAll(".es-par select")];
        const rett = sel.filter((s, i) => s.value !== "" && +s.value === i).length;
        sel.forEach((s, i) => s.classList.toggle("feil", s.value !== "" && +s.value !== i));
        sjekk(rett === sel.length, tx.parRiktig(rett, sel.length));
      });
      $("es-hint").addEventListener("click", () => { $("es-hint").disabled = true; hint++; straff += 60; $("es-hinttekst").hidden = false; $("es-hinttekst").textContent = "💡 " + l.hint; const t = $("es-tid"); if (t) t.textContent = mmss(sek + straff); });
    };

    const sjekk = (ok, feilTekst) => {
      const l = r.laser[n], m = $("es-melding");
      if (!ok) { m.className = "es-melding feil"; m.textContent = feilTekst || tx.feil; const k = $("es-spill").querySelector(".es-las"); k.classList.remove("rist"); void k.offsetWidth; k.classList.add("rist"); return; }
      n++;
      status();
      $("es-spill").querySelectorAll(".es-las button, .es-las input, .es-las select").forEach(x => { x.disabled = true; });
      m.className = "es-melding ok";
      m.innerHTML = tx.apen + " " + fmt(l.forklaring);
      m.insertAdjacentHTML("afterend", '<button type="button" class="knapp hoved" id="es-videre">' + (n < r.laser.length ? tx.videre : tx.ut) + "</button>");
      $("es-videre").addEventListener("click", () => (n < r.laser.length ? las() : ferdig()));
      $("es-videre").focus();
    };

    const ferdig = () => {
      clearInterval(tikk);
      status();
      $("es-spill").innerHTML = '<section class="ko-kort es-kort es-ferdig"><p class="kd-merke" aria-hidden="true">🗝️</p><h2 tabindex="-1">' + tx.fri + "</h2><p>" + fmt(r.slutt) + '</p><p class="es-resultat">' + tx.bruktTid + ": <strong>" + mmss(sek + straff) + "</strong> · " + hint + " " + tx.hintBrukt + "</p>" +
        '<p><button type="button" class="knapp hoved" id="es-igjen">' + tx.igjen + '</button> <a class="knapp" href="escape.html">' + tx.andre + "</a>" + (tema ? ' <a class="knapp" href="tema.html?id=' + encodeURIComponent(tema.id) + '">' + tx.les + " «" + esc(tema.tittel) + "» →</a>" : "") + "</p></section>";
      $("es-spill").querySelector("h2").focus();
      $("es-igjen").addEventListener("click", () => { n = 0; sek = 0; straff = 0; hint = 0; intro(); });
    };
    intro();
  }

  // ---------- Papirversjon ----------
  function papir(r) {
    const sp = r.sprak === "en" ? "en" : "nb", en = sp === "en";
    document.title = r.tittel + " – papirversjon";
    document.body.classList.add("es-papirside");
    const P = en ? { konv: "Envelope", av: "of", svar: "Answer / code:", rekke: "Number the events in the right order (1 = first):", par: "Draw lines or write the right letter:", kart: "Write the square (for example C4):", feil: "Write the number of the wrong sentence:", hintKort: "Hint cards – cut out", fasit: "Answer key for the teacher", neste: "Show the answer to the teacher (or the game master) to get the next envelope." }
      : { konv: "Konvolutt", av: "av", svar: "Svar / kode:", rekke: "Nummerer hendelsene i riktig rekkefølge (1 = først):", par: "Trekk streker eller skriv riktig bokstav:", kart: "Skriv ruten (for eksempel C4):", feil: "Skriv nummeret på setningen som er feil:", hintKort: "Hintkort – klipp ut", fasit: "Fasit for læreren", neste: "Vis svaret til læreren (eller spillederen) for å få neste konvolutt." };
    const fasitTekst = l => {
      if (l.type === "kode") return l.svar[0];
      if (l.type === "valg") return l.valg[l.riktig];
      if (l.type === "rekke") return l.rekke.map((x, i) => (i + 1) + ". " + x).join(" · ");
      if (l.type === "rutenett") return l.svar + " (" + ((l.kart.celler || {})[l.svar] || "") + ")";
      if (l.type === "feil") return (l.riktig + 1) + ": " + l.setninger[l.riktig];
      if (l.type === "par") return l.par.map(p => p[0] + " – " + p[1]).join(" · ");
      return "";
    };
    const svarfelt = (l, i) => {
      if (l.type === "kode") return '<p class="ep-svar">' + P.svar + " <span class=\"ep-linje\"></span></p>";
      if (l.type === "valg") return '<ol class="ep-valg" type="A">' + l.valg.map(v => "<li>☐ " + esc(v) + "</li>").join("") + "</ol>";
      if (l.type === "rekke") { const o = bland(l.rekke.map((_, j) => j)); return "<p>" + P.rekke + '</p><ul class="ep-rekke">' + o.map(j => '<li><span class="ep-boks"></span> ' + esc(l.rekke[j]) + "</li>").join("") + "</ul>"; }
      if (l.type === "rutenett") { const k = l.kart; return '<div class="es-kartramme" tabindex="0" role="region" aria-label="' + (en ? "Map" : "Kart") + '"><table class="es-kart ep-kart"><thead><tr><td></td>' + k.kolonner.map(c => "<th>" + esc(c) + "</th>").join("") + "</tr></thead><tbody>" + k.rader.map(rr => "<tr><th>" + esc(rr) + "</th>" + k.kolonner.map(c => '<td class="' + ((k.vann || []).includes(c + rr) ? "vann" : "") + '">' + esc((k.celler || {})[c + rr] || "") + "</td>").join("") + "</tr>").join("") + '</tbody></table></div><p class="ep-svar">' + P.kart + ' <span class="ep-linje"></span></p>'; }
      if (l.type === "feil") return '<ol class="ep-setninger">' + l.setninger.map(s => "<li>" + fmt(s) + "</li>").join("") + '</ol><p class="ep-svar">' + P.feil + ' <span class="ep-linje kort"></span></p>';
      if (l.type === "par") { const o = bland(l.par.map((_, j) => j)); return "<p>" + P.par + '</p><div class="ep-par"><ol>' + l.par.map(p => "<li>" + fmt(p[0]) + ' <span class="ep-linje kort"></span></li>').join("") + '</ol><ol type="A">' + o.map(j => "<li>" + esc(l.par[j][1]) + "</li>").join("") + "</ol></div>"; }
      return "";
    };
    $("innhold").innerHTML = '<div class="ep"' + (en ? ' lang="en"' : "") + ">" +
      '<div class="ep-verktoy" lang="nb"><a class="knapp" href="escape.html?id=' + encodeURIComponent(r.id) + '">← Tilbake til skjermversjonen</a> <button type="button" class="knapp hoved" id="ep-skriv">🖨️ Skriv ut</button>' +
      '<p class="ep-tips"><strong>Slik bruker du papirversjonen:</strong> Skriv ut, og legg hver lås i en konvolutt merket med nummeret. Gruppene får intro-arket og konvolutt 1. Når de har riktig svar, får de neste konvolutt. Hintkortene klippes ut – det koster ett minutt å ta et hint. Fasiten er på siste side.</p></div>' +
      '<section class="ep-ark"><p class="ep-overlinje">' + esc(r.sted) + '</p><h1><span aria-hidden="true">' + r.ikon + "</span> " + esc(r.tittel) + '</h1><p class="ep-intro">' + fmt(r.intro) + "</p></section>" +
      r.laser.map((l, i) => '<section class="ep-ark"><p class="ep-overlinje">✉️ ' + P.konv + " " + (i + 1) + " " + P.av + " " + r.laser.length + "</p><h2>" + esc(l.tittel) + "</h2>" + l.tekst.map(avsnitt).join("") +
        '<div class="ep-las"><p class="es-oppgave">🔒 ' + fmt(l.oppgave) + "</p>" + svarfelt(l, i) + "</div>" + (i < r.laser.length - 1 ? '<p class="ep-neste">' + P.neste + "</p>" : "") + "</section>").join("") +
      '<section class="ep-ark"><h2>✂️ ' + P.hintKort + '</h2><div class="ep-hint">' + r.laser.map((l, i) => '<div class="ep-hintkort"><strong>💡 ' + P.konv + " " + (i + 1) + "</strong><p>" + esc(l.hint) + "</p></div>").join("") + "</div></section>" +
      '<section class="ep-ark"><h2>🔑 ' + P.fasit + '</h2><ol class="ep-fasit">' + r.laser.map(l => "<li><strong>" + esc(l.tittel) + ":</strong> " + esc(fasitTekst(l)) + '<br><span class="ep-forkl">' + fmt(l.forklaring) + "</span></li>").join("") + '</ol><p class="ep-slutt">' + fmt(r.slutt) + "</p>" + (r.kontroller && r.kontroller.length ? '<div class="ep-kontroll" lang="nb"><h3>Kontroller før bruk</h3><ul>' + r.kontroller.map(k => "<li>" + esc(k) + "</li>").join("") + "</ul></div>" : "") + "</section></div>";
    $("ep-skriv").addEventListener("click", () => window.print());
  }

  document.addEventListener("DOMContentLoaded", () => {
    const r = LV.escape.find(x => x.id === LV.param("id"));
    if (r && LV.param("papir") === "1") papir(r); else if (r) rom(r); else oversikt();
  });
})();
