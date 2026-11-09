/* =========================================================
   Les verden – Lytteøkt med stopp (lytt.html)
   Teksten leses opp del for del (talesyntese i nettleseren).
   Etter hver del stopper opplesingen, og eleven får en lytteoppgave:
   stikkord, gjenfortelling, spådom, spørsmål … Teksten er skjult
   som standard – det er lytting som trenes.
   lytt.html?tema=<id>[&lett=1]  ·  lytt.html?tekst=<lesing-id>[&lett=1]
   Ingenting lagres.
   ========================================================= */
(function () {
  const LV = window.LV;
  const $ = id => document.getElementById(id);
  const esc = s => LV.esc(String(s == null ? "" : s));
  const ren = s => String(s).replace(/\[\[([^\]|]+)(?:\|[^\]]*)?\]\]/g, "$1").replace(/\*\*?/g, "").replace(/<[^>]+>/g, "");
  const ord = s => ren(s).split(/\s+/).filter(Boolean).length;
  const OPPG = {
    nb: ["Skriv tre stikkord fra det du hørte.", "Gjenfortell delen for en makker med egne ord (30 sekunder). Skriv ett stikkord om det dere snakket om.", "Hva tror du kommer i neste del? Hvorfor?", "Skriv ett spørsmål til det du hørte.", "Hvilket ord var nytt eller vanskelig? Hva tror du det betyr?", "Hva var det viktigste i denne delen? Skriv én setning."],
    en: ["Write down three key words from what you heard.", "Retell this part to a partner in your own words (30 seconds). Write one key word about what you talked about.", "What do you think will happen next? Why?", "Write one question about what you heard.", "Which word was new or difficult? What do you think it means?", "What was the most important thing in this part? Write one sentence."]
  };
  const TX = {
    nb: { spill: "▶ Lytt", pause: "⏸ Pause", igjen: "↺ Hør igjen", vis: "Vis teksten", skjul: "Skjul teksten", neste: "Neste del →", del: "Del", av: "av", fart: "Tempo", stopp: "⏸ Stopp og tenk", for: "Før du lytter", forT: "Hva vet du om dette fra før? Skriv to–tre ting.", start: "Start lytteøkta →", slutt: "Etter lyttingen", sluttT: "Oppsummer hele teksten med egne ord i tre–fire setninger.", sjekk: "Sjekk deg selv: Les hele teksten nå. Hva fikk du med deg, og hva gikk du glipp av?", visAlt: "Vis hele teksten", hopp: "Ferdig å lytte – til oppgaven ↓", ingenStemme: "Nettleseren din har ingen norsk stemme installert, så teksten kan bli lest med feil uttale. Prøv en annen nettleser (for eksempel Edge eller Chrome), eller be læreren lese høyt.", ingenTale: "Nettleseren din kan ikke lese opp tekst. Be læreren eller en makker lese delene høyt – stoppene og oppgavene fungerer like fint." },
    en: { spill: "▶ Listen", pause: "⏸ Pause", igjen: "↺ Listen again", vis: "Show the text", skjul: "Hide the text", neste: "Next part →", del: "Part", av: "of", fart: "Speed", stopp: "⏸ Stop and think", for: "Before you listen", forT: "What do you already know about this? Write two or three things.", start: "Start listening →", slutt: "After listening", sluttT: "Summarise the whole text in your own words in three or four sentences.", sjekk: "Check yourself: Read the whole text now. What did you catch, and what did you miss?", visAlt: "Show the whole text", hopp: "Done listening – to the task ↓", ingenStemme: "Your browser has no English voice installed.", ingenTale: "Your browser cannot read text aloud. Ask your teacher or a partner to read the parts aloud – the stops and tasks work just as well." }
  };
  const hode = () => '<nav class="brodsmuler" aria-label="Brødsmuler"><a href="index.html">Forside</a> › <a href="lesestrategier.html">Lese og skrive</a> › <a href="lytt.html">Lytteøkt</a></nav>';

  function oversikt() {
    document.title = "Lytteøkt med stopp – " + (LV.config ? LV.config.navn : "Les verden");
    const tema = (LV.temaer || []).slice().sort((a, b) => a.fag.localeCompare(b.fag) || a.trinn - b.trinn || a.tittel.localeCompare(b.tittel));
    $("innhold").innerHTML = hode() +
      '<header class="sidehode"><p class="overlinje">Lytting</p><h1>🎧 Lytteøkt med stopp</h1><p class="ingress">Lytt til en tekst del for del. Etter hver del stopper opplesingen, og du får en liten oppgave: stikkord, gjenfortelling, spådom eller et spørsmål. Teksten er skjult mens du lytter – du kan vise den når du vil sjekke deg selv.</p></header>' +
      '<div class="ka-metode"><h2>Gode lyttestrategier</h2><ul><li><strong>Før:</strong> Tenk på hva du vet om emnet fra før.</li><li><strong>Underveis:</strong> Lytt etter nøkkelord, navn, tall og årstall. Skriv korte stikkord – ikke hele setninger.</li><li><strong>Etter:</strong> Gjenfortell med egne ord, og sjekk med teksten.</li></ul></div>' +
      '<form class="ly-velg" id="ly-velg"><label for="ly-tema">Samfunnsfag- eller engelsktema</label><select id="ly-tema"><option value="">Velg et tema …</option>' +
      ["samfunnsfag", "engelsk"].map(f => '<optgroup label="' + (f === "engelsk" ? "Engelsk" : "Samfunnsfag") + '">' + tema.filter(t => t.fag === f).map(t => '<option value="tema:' + t.id + '">' + t.trinn + ". trinn – " + esc(t.tittel) + "</option>").join("") + "</optgroup>").join("") +
      '</select><label for="ly-tekst"><span lang="en">Reading Room</span></label><select id="ly-tekst"><option value="">Velg en tekst …</option>' + (LV.lesetekster || []).map(t => '<option value="tekst:' + t.id + '" lang="en">' + esc(t.tittel) + " – " + esc(t.forfatter) + "</option>").join("") + "</select>" +
      '<label class="ly-lett"><input type="checkbox" id="ly-lett"> Bruk lettere tekst når den finnes</label><button class="knapp hoved" type="submit">Start →</button></form>' +
      '<p class="mu-intro">Tips til læreren: Lytteøkta fungerer godt på storskjerm med hele klassen. Lytt til én del, la elevene skrive stikkord, snakk sammen i par – og gå videre.</p>';
    $("ly-tema").addEventListener("change", () => { if ($("ly-tema").value) $("ly-tekst").value = ""; });
    $("ly-tekst").addEventListener("change", () => { if ($("ly-tekst").value) $("ly-tema").value = ""; });
    $("ly-velg").addEventListener("submit", e => {
      e.preventDefault();
      const v = $("ly-tema").value || $("ly-tekst").value; if (!v) return;
      const [type, id] = v.split(":");
      location.search = "?" + type + "=" + encodeURIComponent(id) + ($("ly-lett").checked ? "&lett=1" : "");
    });
  }

  async function okt(type, id, lett) {
    let tittel = "", sp = "nb", deler = [], lenke = "";
    try {
      if (type === "tema") {
        const info = LV.temaer.find(t => t.id === id); if (!info) throw 0;
        await LV.lastSkript("data/temaer/" + id + ".js");
        const t = LV.tema; tittel = t.tittel; sp = t.sprak === "en" ? "en" : "nb"; lenke = "tema.html?id=" + id;
        deler = t.avsnitt.map(a => ({ h: a.tittel, p: (lett && a.lett ? a.lett : a.tekst).map(ren) }));
      } else {
        const info = (LV.lesetekster || []).find(t => t.id === id); if (!info) throw 0;
        await LV.lastSkript("data/lesing/" + id + ".js");
        const d = LV.lesetekst; tittel = info.tittel + " – " + info.forfatter; sp = "en"; lenke = "lesing.html?id=" + id;
        let kilde = (lett && d.lett ? d.lett : d.tekst) || [];
        let buf = [], h = null;
        const tom = () => { if (buf.length) deler.push({ h: h, p: buf }); buf = []; h = null; };
        kilde.forEach(p => {
          if (typeof p !== "string") { if (p.h) { tom(); h = p.h; } else if (p.vers) buf.push(p.vers.replace(/\n+/g, " ")); return; }
          buf.push(ren(p));
          if (ord(buf.join(" ")) >= 130) tom();
        });
        tom();
      }
    } catch (e) { $("innhold").innerHTML = hode() + "<p>Fant ikke teksten. <a href=\"lytt.html\">Velg en annen</a>.</p>"; return; }

    const tx = TX[sp], oppg = OPPG[sp];
    const kanLese = "speechSynthesis" in window;
    let n = -1, fart = 0.9, spiller = false;
    document.title = "Lytteøkt: " + tittel;
    $("innhold").innerHTML = hode() + '<div' + (sp === "en" ? ' lang="en"' : "") + '><header class="sidehode"><p class="overlinje">🎧 ' + (sp === "en" ? "Listening session" : "Lytteøkt") + "</p><h1>" + esc(tittel) + '</h1><p class="ly-meta">' + deler.length + " " + (sp === "en" ? "parts" : "deler") + (lett ? (sp === "en" ? " · easier text" : " · lettere tekst") : "") + ' · <a href="' + lenke + '">' + (sp === "en" ? "Open the text" : "Åpne teksten") + "</a></p></header>" +
      '<p class="ly-varsel" id="ly-varsel" role="status"></p><div id="ly-okt" class="ly-okt"></div></div>';

    const stemme = () => {
      if (!kanLese) return null;
      const v = speechSynthesis.getVoices();
      return sp === "en" ? (LV.aksentStemme("en-GB") || v.find(x => /^en/i.test(x.lang))) : v.find(x => /^(nb|no|nn)/i.test(x.lang));
    };
    const varsle = () => {
      if (!kanLese) $("ly-varsel").textContent = tx.ingenTale;
      else if (sp === "nb" && speechSynthesis.getVoices().length && !stemme()) $("ly-varsel").textContent = tx.ingenStemme;
      else $("ly-varsel").textContent = "";
    };
    if (kanLese) { speechSynthesis.onvoiceschanged = varsle; }
    varsle();

    const les = (ferdig) => {
      if (!kanLese) return;
      speechSynthesis.cancel();
      const d = deler[n];
      const u = new SpeechSynthesisUtterance((d.h ? d.h + ". " : "") + d.p.join(" "));
      u.lang = sp === "en" ? "en-GB" : "nb-NO"; u.rate = fart;
      const v = stemme(); if (v) u.voice = v;
      u.onend = () => { spiller = false; knapp(); ferdig && ferdig(); };
      u.onerror = () => { spiller = false; knapp(); };
      spiller = true; knapp();
      speechSynthesis.speak(u);
    };
    const knapp = () => { const b = $("ly-spill"); if (b) b.textContent = spiller ? tx.pause : (b.dataset.hort ? tx.igjen : tx.spill); };

    const start = () => {
      $("ly-okt").innerHTML = '<section class="ko-kort"><h2>' + tx.for + "</h2>" + felt("ly-for", tx.forT) + '<button type="button" class="knapp hoved" id="ly-start">' + tx.start + "</button></section>";
      $("ly-start").addEventListener("click", () => { n = 0; del(); });
    };
    const felt = (id, label) => '<label class="mu-notat" for="' + id + '"><span>' + esc(label) + '</span><textarea id="' + id + '" rows="3"></textarea></label>';

    const del = () => {
      const d = deler[n];
      $("ly-okt").innerHTML = '<section class="ko-kort ly-del"><p class="ly-nr">' + tx.del + " " + (n + 1) + " " + tx.av + " " + deler.length + '</p><div class="ly-bolge" aria-hidden="true">' + "<span></span>".repeat(14) + "</div>" +
        '<div class="ly-kontroll">' + (kanLese ? '<button type="button" class="knapp hoved" id="ly-spill">' + tx.spill + '</button><label class="ly-fart" for="ly-fart">' + tx.fart + ' <input type="range" id="ly-fart" min="0.6" max="1.2" step="0.1" value="' + fart + '"></label>' : "") +
        '<button type="button" class="knapp liten" id="ly-vis" aria-expanded="false" aria-controls="ly-tekst">' + tx.vis + "</button>" + (kanLese ? '<button type="button" class="knapp liten" id="ly-hopp">' + tx.hopp + "</button>" : "") + "</div>" +
        '<div class="ly-tekst" id="ly-tekst" hidden>' + (d.h ? "<h3>" + esc(d.h) + "</h3>" : "") + d.p.map(p => "<p>" + esc(p) + "</p>").join("") + "</div>" +
        '<div class="ly-stopp" id="ly-stopp"' + (kanLese ? " hidden" : "") + '><h3>' + tx.stopp + "</h3>" + felt("ly-o" + n, oppg[n % oppg.length]) + '<button type="button" class="knapp hoved" id="ly-neste">' + (n < deler.length - 1 ? tx.neste : tx.slutt + " →") + "</button></div></section>";
      const visStopp = () => { $("ly-stopp").hidden = false; $("ly-spill").dataset.hort = "1"; knapp(); $("ly-hopp").hidden = true; $("ly-stopp").querySelector("textarea").focus({ preventScroll: true }); $("ly-stopp").scrollIntoView({ behavior: "smooth", block: "nearest" }); };
      if (kanLese) {
        $("ly-spill").addEventListener("click", () => {
          if (spiller) { if (speechSynthesis.paused) { speechSynthesis.resume(); $("ly-spill").textContent = tx.pause; } else { speechSynthesis.pause(); $("ly-spill").textContent = tx.spill; } return; }
          les(visStopp);
        });
        $("ly-fart").addEventListener("input", e => { fart = +e.target.value; });
        $("ly-hopp").addEventListener("click", () => { speechSynthesis.cancel(); spiller = false; visStopp(); });
      }
      $("ly-vis").addEventListener("click", () => { const t = $("ly-tekst"), apen = !t.hidden; t.hidden = apen; $("ly-vis").setAttribute("aria-expanded", String(!apen)); $("ly-vis").textContent = apen ? tx.vis : tx.skjul; });
      $("ly-neste").addEventListener("click", () => { if (kanLese) speechSynthesis.cancel(); spiller = false; n++; if (n < deler.length) del(); else slutt(); });
      $("ly-okt").querySelector(".ly-nr").scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const slutt = () => {
      $("ly-okt").innerHTML = '<section class="ko-kort"><h2>' + tx.slutt + "</h2>" + felt("ly-slutt", tx.sluttT) + '<p class="mu-intro">' + tx.sjekk + '</p><button type="button" class="knapp" id="ly-alt" aria-expanded="false" aria-controls="ly-alttekst">' + tx.visAlt + '</button><div class="ly-tekst" id="ly-alttekst" hidden>' +
        deler.map(d => (d.h ? "<h3>" + esc(d.h) + "</h3>" : "") + d.p.map(p => "<p>" + esc(p) + "</p>").join("")).join("") + '</div><p><a class="knapp hoved" href="lytt.html">' + (sp === "en" ? "Choose another text" : "Velg en annen tekst") + "</a></p></section>";
      $("ly-alt").addEventListener("click", () => { const t = $("ly-alttekst"); t.hidden = !t.hidden; $("ly-alt").setAttribute("aria-expanded", String(!t.hidden)); });
    };
    window.addEventListener("pagehide", () => { if (kanLese) speechSynthesis.cancel(); });
    start();
  }

  document.addEventListener("DOMContentLoaded", () => {
    const t = LV.param("tema"), x = LV.param("tekst"), lett = LV.param("lett") === "1";
    if (t) okt("tema", t, lett); else if (x) okt("tekst", x, lett); else oversikt();
    const linje = document.createElement("div");
    linje.className = "svarlinje";
    linje.innerHTML = '<div class="svarlinje-indre"><label class="skjult-visuelt" for="elevnavn">Navn</label><input id="elevnavn" type="text" placeholder="Navn" autocomplete="off"><span class="status" role="status" aria-live="polite"></span></div>';
    document.body.appendChild(linje);
  });
})();
