/* =========================================================
   Les verden – Muntlig og lytting (muntlig.html)
   muntlig.html           → oversikt: metoder, frasebank, lyttetips, alle temaer
   muntlig.html?id=<tema> → samtalekort, lytteøvelse og «den varme stolen»
   for ett tema. Alt hentes fra temafila. Ingenting lagres.
   ========================================================= */
(function () {
  const LV = window.LV;
  const $ = id => document.getElementById(id);
  const esc = s => LV.esc(String(s == null ? "" : s));
  const ren = s => String(s || "").replace(/\[\[([^\]|]+)\|[^\]]+\]\]/g, "$1").replace(/\[\[|\]\]/g, "").replace(/\*\*|\*/g, "");
  const navn = () => (LV.config ? LV.config.navn : "Les verden");

  const T = {
    nb: { kort: "Samtalekort", kortTekst: "Snakk sammen om spørsmålene fra temaet. Bruk tidtakeren og frasebanken.", forrige: "← Forrige", neste: "Neste →", stokk: "🔀 Stokk", av: "av", tid: "Tid:", start: "▶ Start", pause: "⏸ Pause", ferdig: "Tiden er ute!", fraser: "Frasebank – nyttige setninger", lytt: "Lytteøvelse", lyttTekst: "Trykk «Spill av». Teksten vises ikke mens du lytter. Skriv stikkord, og sammenlign med teksten etterpå.", velg: "Hva vil du lytte til?", sammendrag: "Sammendraget", spill: "▶ Spill av", stopp: "■ Stopp", fart: "Fart:", sakte: "Sakte", normal: "Normal", notater: "Dine stikkord", vis: "Vis teksten", skjul: "Skjul teksten", kopier: "Kopier notatene", kopiert: "Notatene er kopiert!", tom: "Du har ikke skrevet noe ennå.", ingenStemme: "Nettleseren din har ingen norsk stemme. Prøv en annen nettleser, eller la en medelev lese høyt.", ingenTale: "Nettleseren din kan ikke lese opp tekst. La en medelev eller læreren lese høyt.", stol: "Den varme stolen", stolTekst: "Én elev er en person fra temaet og svarer i jeg-form. De andre stiller spørsmål. Personen kan bruke faktakortet.", velgPerson: "Velg person", faktakort: "Faktakort (bare for den som sitter i stolen)", visKort: "Vis faktakortet", sporsmal: "Spørsmål dere kan stille", metoder: "Måter å snakke sammen på", lyttetips: "Tips når du lytter", tilbake: "Tilbake til temaet", presentasjon: "Skal du holde en presentasjon? Se guiden", eksamen: "Øv til muntlig eksamen" },
    en: { kort: "Talk cards", kortTekst: "Talk about the questions from the topic. Use the timer and the phrase bank.", forrige: "← Previous", neste: "Next →", stokk: "🔀 Shuffle", av: "of", tid: "Time:", start: "▶ Start", pause: "⏸ Pause", ferdig: "Time’s up!", fraser: "Phrase bank – useful sentences", lytt: "Listening task", lyttTekst: "Press «Play». The text is hidden while you listen. Write key words, and compare with the text afterwards.", velg: "What do you want to listen to?", sammendrag: "The summary", spill: "▶ Play", stopp: "■ Stop", fart: "Speed:", sakte: "Slow", normal: "Normal", notater: "Your key words", vis: "Show the text", skjul: "Hide the text", kopier: "Copy my notes", kopiert: "Your notes have been copied!", tom: "You have not written anything yet.", ingenStemme: "Your browser has no English voice. Try another browser, or ask a classmate to read aloud.", ingenTale: "Your browser cannot read text aloud. Ask a classmate or your teacher to read aloud.", stol: "Hot seat", stolTekst: "One student is a person from the topic and answers as «I». The others ask questions. The person can use the fact card.", velgPerson: "Choose a person", faktakort: "Fact card (only for the person in the hot seat)", visKort: "Show the fact card", sporsmal: "Questions you can ask", metoder: "Ways to talk together", lyttetips: "Listening tips", tilbake: "Back to the topic", presentasjon: "Giving a presentation? See the guide", eksamen: "Practise for the oral exam" }
  };

  // ---------- Opplesing ----------
  function stemme(sprak) {
    const alle = window.speechSynthesis ? speechSynthesis.getVoices() : [];
    for (const p of sprak === "en" ? ["en-GB", "en"] : ["nb", "no", "nn"]) { const v = alle.find(v => v.lang && v.lang.toLowerCase().startsWith(p.toLowerCase())); if (v) return v; }
    return null;
  }

  // ---------- Ett tema ----------
  async function tema(id) {
    const info = (LV.temaer || []).find(t => t.id === id);
    if (!info) { $("innhold").innerHTML = '<p class="melding">Fant ikke temaet. <a href="muntlig.html">Til oversikten</a></p>'; return; }
    LV.tema = null;
    await LV.lastSkript("data/temaer/" + encodeURIComponent(id) + ".js");
    const t = LV.tema, sp = t.sprak === "en" ? "en" : "nb", tx = T[sp], M = LV.muntlig[sp];
    document.documentElement.lang = sp === "en" ? "en" : "nb";
    document.body.dataset.fag = t.fag;
    document.title = (sp === "en" ? "Speaking and listening – " : "Muntlig og lytting – ") + t.tittel + " – " + navn();

    // Kortstokken
    const kort = [];
    if (t.startsporsmal) kort.push({ s: t.startsporsmal, k: sp === "en" ? "Warm-up" : "Oppvarming" });
    (t.avsnitt || []).forEach(a => { if (a.stoppOgTenk) kort.push({ s: a.stoppOgTenk, k: sp === "en" ? "Stop and think" : "Stopp og tenk" }); });
    [1, 2, 3].forEach(n => { const o = t.oppgaver && t.oppgaver[n]; if (o && o.diskuter) o.diskuter.forEach(d => kort.push({ s: typeof d === "string" ? d : d.tekst, k: (sp === "en" ? "Discuss – level " : "Diskuter – nivå ") + n })); });

    // Lyttetekster
    const lytt = [];
    if (t.sammendrag && t.sammendrag.length) lytt.push({ navn: tx.sammendrag, tekst: t.sammendrag.map(ren) });
    (t.avsnitt || []).forEach(a => { if (a.tekst && a.tekst.length) lytt.push({ navn: ren(a.tittel || ""), tekst: a.tekst.map(ren) }); });

    const personer = t.personer || [];
    const tilbake = '<a href="tema.html?id=' + encodeURIComponent(id) + '">' + tx.tilbake + "</a>";
    let h = '<nav class="brodsmuler" aria-label="Brødsmuler" lang="nb"><a href="index.html">Forside</a> › <a href="muntlig.html">Muntlig og lytting</a> › ' + esc(t.tittel) + "</nav>" +
      '<header class="sidehode"><p class="overlinje">' + (sp === "en" ? "Speaking and listening" : "Muntlig og lytting") + "</p><h1>" + esc(t.tittel) + '</h1><p class="ingress">' + esc(info.kort) + " " + tilbake + "</p></header>" +
      '<nav class="mu-hopp" aria-label="Snarveier"><a href="#mu-kort">🗣️ ' + tx.kort + '</a><a href="#mu-lytt">🎧 ' + tx.lytt + "</a>" + (personer.length ? '<a href="#mu-stol">🔥 ' + tx.stol + "</a>" : "") + "</nav>";

    // A. Samtalekort
    h += '<section class="mu-del" id="mu-kort"><h2>🗣️ ' + tx.kort + '</h2><p class="mu-intro">' + tx.kortTekst + "</p>" +
      (kort.length ? '<div class="mu-kortstokk"><div class="mu-kortet" id="mu-kortet" aria-live="polite"></div><div class="mu-kontroll"><button class="knapp" id="mu-forrige" type="button">' + tx.forrige + '</button><span id="mu-nr"></span><button class="knapp hoved" id="mu-neste" type="button">' + tx.neste + '</button><button class="knapp" id="mu-stokk" type="button">' + tx.stokk + "</button></div>" +
        '<div class="mu-tid"><span>' + tx.tid + "</span>" + [1, 2, 3].map(m => '<button class="knapp liten" type="button" data-min="' + m + '" aria-pressed="' + (m === 1) + '">' + m + " min</button>").join("") + '<span class="mu-klokke" id="mu-klokke">1:00</span><button class="knapp liten" id="mu-start" type="button">' + tx.start + "</button></div></div>" : "") +
      '<details class="mu-fraser"><summary>💬 ' + tx.fraser + '</summary><div class="mu-fraserad">' + M.fraser.map(f => "<div><h3>" + esc(f.tittel) + "</h3><ul>" + f.liste.map(x => "<li>" + esc(x) + "</li>").join("") + "</ul></div>").join("") + "</div></details>" +
      '<details class="mu-fraser"><summary>👥 ' + tx.metoder + '</summary><ul class="mu-metoder">' + M.metoder.map(m => '<li><span aria-hidden="true">' + m.ikon + "</span><div><strong>" + esc(m.navn) + "</strong><p>" + esc(m.tekst) + "</p></div></li>").join("") + "</ul></details></section>";

    // B. Lytteøvelse
    h += '<section class="mu-del" id="mu-lytt"><h2>🎧 ' + tx.lytt + '</h2><p class="mu-intro">' + tx.lyttTekst + "</p>" +
      '<div class="mu-lyttrad"><label>' + tx.velg + ' <select id="mu-velg">' + lytt.map((l, i) => '<option value="' + i + '">' + esc(l.navn) + "</option>").join("") + "</select></label>" +
      (sp === "en" ? '<label>Accent: <select id="mu-aksent"><option value="en-GB">British English</option></select></label>' : "") +
      '<label>' + tx.fart + ' <select id="mu-fart"><option value="0.8">' + tx.sakte + '</option><option value="1" selected>' + tx.normal + "</option></select></label>" +
      '<button class="knapp hoved" id="mu-spill" type="button">' + tx.spill + '</button><button class="knapp" id="mu-stopp" type="button" hidden>' + tx.stopp + '</button></div><p class="mu-melding" id="mu-melding" role="status"></p>' +
      '<label class="mu-notat"><span>' + tx.notater + '</span><textarea id="mu-notater" rows="6"></textarea></label>' +
      '<div class="mu-knapper"><button class="knapp" id="mu-vis" type="button" aria-expanded="false">' + tx.vis + '</button><button class="knapp" id="mu-kopier" type="button">' + tx.kopier + '</button><span class="status" id="mu-status" role="status"></span></div>' +
      '<div class="mu-fasit" id="mu-fasit" hidden></div>' +
      '<details class="mu-fraser"><summary>💡 ' + tx.lyttetips + "</summary><ul>" + M.lytting.map(x => "<li>" + esc(x) + "</li>").join("") + "</ul></details></section>";

    // C. Den varme stolen
    if (personer.length) {
      h += '<section class="mu-del" id="mu-stol"><h2>🔥 ' + tx.stol + '</h2><p class="mu-intro">' + tx.stolTekst + '</p><label class="mu-velgperson">' + tx.velgPerson + ' <select id="mu-person">' + personer.map((p, i) => '<option value="' + i + '">' + esc(p.navn) + "</option>").join("") + "</select></label>" +
        '<details class="mu-faktakort" id="mu-faktakort"><summary>' + tx.visKort + '</summary><div id="mu-personkort"></div></details>' +
        "<h3>" + tx.sporsmal + '</h3><ul class="mu-sporsmal">' + M.sporsmal.map(x => "<li>" + esc(x) + "</li>").join("") + "</ul></section>";
    }
    h += '<p class="mu-videre" lang="nb">🎤 ' + T.nb.presentasjon + ': <a href="skriving.html?id=' + (sp === "en" ? "presentation" : "presentasjon") + '">' + (sp === "en" ? "The oral presentation" : "Muntlig presentasjon") + '</a> · <a href="eksamen.html">' + T.nb.eksamen + "</a></p>";
    $("innhold").innerHTML = h;

    // Kortstokk
    if (kort.length) {
      let i = 0, rekke = kort.map((_, n) => n);
      const vis = () => { const k = kort[rekke[i]]; $("mu-kortet").innerHTML = '<span class="mu-type">' + esc(k.k) + "</span><p>" + esc(ren(k.s)) + "</p>"; $("mu-nr").textContent = (i + 1) + " " + tx.av + " " + kort.length; $("mu-forrige").disabled = i === 0; $("mu-neste").disabled = i === kort.length - 1; };
      $("mu-forrige").addEventListener("click", () => { if (i > 0) { i--; vis(); } });
      $("mu-neste").addEventListener("click", () => { if (i < kort.length - 1) { i++; vis(); } });
      $("mu-stokk").addEventListener("click", () => { for (let n = rekke.length - 1; n > 0; n--) { const j = Math.floor(Math.random() * (n + 1)); [rekke[n], rekke[j]] = [rekke[j], rekke[n]]; } i = 0; vis(); });
      vis();
      // Tidtaker
      let sek = 60, igjen = 60, klokke = null;
      const tegn = () => { $("mu-klokke").textContent = Math.floor(igjen / 60) + ":" + String(igjen % 60).padStart(2, "0"); $("mu-klokke").classList.toggle("ute", igjen === 0); };
      const stopp = () => { clearInterval(klokke); klokke = null; $("mu-start").textContent = tx.start; };
      document.querySelectorAll("[data-min]").forEach(b => b.addEventListener("click", () => { stopp(); sek = igjen = +b.dataset.min * 60; document.querySelectorAll("[data-min]").forEach(x => x.setAttribute("aria-pressed", String(x === b))); tegn(); }));
      $("mu-start").addEventListener("click", () => {
        if (klokke) { stopp(); return; }
        if (igjen === 0) igjen = sek;
        $("mu-start").textContent = tx.pause;
        klokke = setInterval(() => { igjen--; tegn(); if (igjen <= 0) { stopp(); $("mu-klokke").textContent = tx.ferdig; } }, 1000);
      });
      $("mu-neste").addEventListener("click", () => { stopp(); igjen = sek; tegn(); });
    }

    // Lytting
    const fasit = () => { const l = lytt[+$("mu-velg").value]; $("mu-fasit").innerHTML = "<h3>" + esc(l.navn) + "</h3>" + (l === lytt[0] && t.sammendrag ? "<ul>" + l.tekst.map(x => "<li>" + esc(x) + "</li>").join("") + "</ul>" : l.tekst.map(x => "<p>" + esc(x) + "</p>").join("")); };
    $("mu-velg").addEventListener("change", () => { if (!$("mu-fasit").hidden) fasit(); });
    $("mu-vis").addEventListener("click", () => { const skjult = $("mu-fasit").hidden; if (skjult) fasit(); $("mu-fasit").hidden = !skjult; $("mu-vis").textContent = skjult ? tx.skjul : tx.vis; $("mu-vis").setAttribute("aria-expanded", String(skjult)); });
    if (!("speechSynthesis" in window)) { $("mu-spill").disabled = true; $("mu-melding").textContent = tx.ingenTale; }
    else {
      const synth = window.speechSynthesis;
      const ferdig = () => { $("mu-spill").hidden = false; $("mu-stopp").hidden = true; };
      $("mu-spill").addEventListener("click", () => {
        synth.cancel();
        const ak = $("mu-aksent") ? $("mu-aksent").value : null;
        const v = (ak && LV.aksentStemme(ak)) || stemme(sp); $("mu-melding").textContent = v ? "" : tx.ingenStemme;
        const l = lytt[+$("mu-velg").value];
        $("mu-spill").hidden = true; $("mu-stopp").hidden = false;
        l.tekst.forEach((x, n) => { const u = new SpeechSynthesisUtterance(x); u.lang = ak || (sp === "en" ? "en-GB" : "nb-NO"); if (v) u.voice = v; u.rate = +$("mu-fart").value; if (n === l.tekst.length - 1) { u.onend = ferdig; u.onerror = ferdig; } synth.speak(u); });
      });
      $("mu-stopp").addEventListener("click", () => { synth.cancel(); ferdig(); });
      window.addEventListener("beforeunload", () => synth.cancel());
    }
    $("mu-kopier").addEventListener("click", () => {
      const v = $("mu-notater").value.trim();
      if (!v) { $("mu-status").textContent = tx.tom; return; }
      const tekst = t.tittel + " – " + lytt[+$("mu-velg").value].navn + "\n\n" + v;
      const ok = () => { $("mu-status").textContent = tx.kopiert; };
      const reserve = () => { const x = document.createElement("textarea"); x.value = tekst; document.body.appendChild(x); x.select(); let lyktes = false; try { lyktes = document.execCommand("copy"); } catch (e) { lyktes = false; } x.remove(); if (lyktes) ok(); else window.prompt("Ctrl+C / Cmd+C", tekst); };
      if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(tekst).then(ok, reserve); else reserve();
    });

    // Aksentvalg (engelske temaer): bare stemmene nettleseren har
    if ($("mu-aksent")) {
      const fyll = () => { const l = LV.tilgjengeligeAksenter(); if (!l.length) return; const valgt = $("mu-aksent").value; $("mu-aksent").innerHTML = l.map(([k, n]) => '<option value="' + k + '"' + (k === valgt ? " selected" : "") + ">" + n + "</option>").join(""); };
      fyll(); if ("speechSynthesis" in window) speechSynthesis.addEventListener("voiceschanged", fyll);
    }

    // Varm stol
    if (personer.length) {
      const visPerson = () => { $("mu-personkort").innerHTML = LV.personkort(personer[+$("mu-person").value]); $("mu-faktakort").open = false; };
      $("mu-person").addEventListener("change", visPerson); visPerson();
    }
  }

  // ---------- Oversikt ----------
  function oversikt() {
    document.title = "Muntlig og lytting – " + navn();
    const M = LV.muntlig.nb, E = LV.muntlig.en;
    const grupper = [["samfunnsfag", "Samfunnsfag"], ["engelsk", "Engelsk"]];
    let h = '<nav class="brodsmuler" aria-label="Brødsmuler"><a href="index.html">Forside</a> › Muntlig og lytting</nav>' +
      '<header class="sidehode"><p class="overlinje" lang="en">Speaking and listening</p><h1>Muntlig og lytting</h1><p class="ingress">Hvert tema har samtalekort med spørsmål fra teksten, en lytteøvelse der teksten leses høyt uten at du ser den, og «den varme stolen» der du spiller en person fra temaet. Velg et tema nedenfor.</p></header>' +
      '<div class="mu-oversikt-rad"><section><h2>Måter å snakke sammen på</h2><ul class="mu-metoder">' + M.metoder.map(m => '<li><span aria-hidden="true">' + m.ikon + "</span><div><strong>" + esc(m.navn) + "</strong><p>" + esc(m.tekst) + "</p></div></li>").join("") + "</ul></section>" +
      '<section><h2>Frasebank</h2><details class="mu-fraser" open><summary>🇳🇴 På norsk</summary><div class="mu-fraserad">' + M.fraser.map(f => "<div><h3>" + esc(f.tittel) + "</h3><ul>" + f.liste.map(x => "<li>" + esc(x) + "</li>").join("") + "</ul></div>").join("") + '</div></details><details class="mu-fraser" lang="en"><summary>🇬🇧 In English</summary><div class="mu-fraserad">' + E.fraser.map(f => "<div><h3>" + esc(f.tittel) + "</h3><ul>" + f.liste.map(x => "<li>" + esc(x) + "</li>").join("") + "</ul></div>").join("") + "</div></details>" +
      "<h2>Tips når du lytter</h2><ul>" + M.lytting.map(x => "<li>" + esc(x) + "</li>").join("") + "</ul></section></div>";
    grupper.forEach(([fag, fnavn]) => {
      h += '<section class="mu-temaer"><h2>' + fnavn + "</h2>";
      [8, 9, 10].forEach(tr => {
        const liste = LV.temaer.filter(t => t.fag === fag && t.trinn === tr);
        if (liste.length) h += "<h3>" + tr + '. trinn</h3><ul class="mu-temaliste">' + liste.map(t => '<li><a href="muntlig.html?id=' + encodeURIComponent(t.id) + '"' + (fag === "engelsk" ? ' lang="en"' : "") + ">" + esc(t.tittel) + "</a></li>").join("") + "</ul>";
      });
      h += "</section>";
    });
    $("innhold").innerHTML = h;
  }

  document.addEventListener("DOMContentLoaded", () => {
    const id = LV.param("id");
    if (id) tema(id).catch(() => { $("innhold").innerHTML = '<p class="melding">Fant ikke temaet. <a href="muntlig.html">Til oversikten</a></p>'; });
    else oversikt();
  });
})();
