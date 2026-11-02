/* =========================================================
   Les verden – Grammar and vocabulary (engelsk)
   grammatikk.html            → oversikt
   grammatikk.html?id=<id>    → ett emne (data/grammatikk/<id>.js)
   Øvelsestyper: mc (flervalg), finn (trykk på ordene), fyll (skriv inn), sorter (sorter ord i grupper).
   Ingenting lagres.
   ========================================================= */
(function () {
  const LV = window.LV;
  const $ = id => document.getElementById(id);
  const esc = s => LV.esc(String(s == null ? "" : s));
  const fmt = s => esc(s).replace(/~~(.+?)~~/g, "<s>$1</s>").replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\*(.+?)\*/g, "<em>$1</em>");
  const bland = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const kanLese = "speechSynthesis" in window;
  const norm = s => String(s).toLowerCase().replace(/[’`´]/g, "'").replace(/\s+/g, " ").trim().replace(/[.!?]$/, "");

  function les(tekst) {
    if (!kanLese) return;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(tekst);
    u.lang = "en-GB"; u.rate = 0.9;
    const stemme = speechSynthesis.getVoices().find(v => /^en-GB/i.test(v.lang)) || speechSynthesis.getVoices().find(v => /^en/i.test(v.lang));
    if (stemme) u.voice = stemme;
    speechSynthesis.speak(u);
  }
  const lesKnapp = (tekst, etikett) => kanLese ? '<button type="button" class="gr-les" data-les="' + esc(tekst) + '" aria-label="' + esc(etikett || "Listen: " + tekst) + '">🔊</button>' : "";
  const fargeStil = info => info && info.farge ? ' style="--gr-farge:' + info.farge + ";--gr-tekst:" + (info.morkTekst ? "#1f1a05" : "#fff") + '"' : "";

  // Rutenett: stavemåte × uttale (for «Words that look or sound alike»)
  function diagram(markert) {
    const m = markert || "";
    const celle = (id, navn, eks, tekst) => '<td class="gr-celle' + ((id && m === id) || (m === "homophones" && (id === "homonyms" || id === "heterographs")) || (m === "homographs" && (id === "homonyms" || id === "heteronyms")) ? " markert" : "") + '">' +
      (id ? '<a href="grammatikk.html?id=' + id + '"><strong>' + navn + "</strong><span>" + eks + "</span><small>" + tekst + "</small></a>" : "<div><strong>" + navn + "</strong><span>" + eks + "</span><small>" + tekst + "</small></div>") + "</td>";
    return '<figure class="gr-diagram"><table><caption>Spelling and sound – how the word groups fit together</caption>' +
      '<thead><tr><td></td><th scope="col"' + (m === "homophones" ? ' class="markert"' : "") + '>Same sound<br><a href="grammatikk.html?id=homophones">= homophones</a></th><th scope="col">Different sound</th></tr></thead><tbody>' +
      '<tr><th scope="row"' + (m === "homographs" ? ' class="markert"' : "") + '>Same spelling<br><a href="grammatikk.html?id=homographs">= homographs</a></th>' +
      celle("homonyms", "Homonyms", "bat – bat", "flaggermus / balltre") + celle("heteronyms", "Heteronyms", "lead – lead", "/liːd/ lede / /led/ bly") + "</tr>" +
      '<tr><th scope="row">Different spelling</th>' + celle("heterographs", "Heterographs", "night – knight", "natt / ridder") +
      celle("", "Different words", "cat – dog", "nothing in common") + "</tr></tbody></table>" +
      '<figcaption lang="nb">Les tabellen slik: Ord som <strong>skrives likt</strong> (øverste rad) er homografer. Ord som <strong>høres like ut</strong> (venstre kolonne) er homofoner.</figcaption></figure>';
  }

  // Plakat med ordklassene (som en klasseromsplakat)
  function plakat(g) {
    const emner = g.emner.map(id => LV.grammatikkListe.find(e => e.id === id)).filter(Boolean);
    let h = '<div class="gr-plakat"><p class="gr-plakat-tittel">' + esc(g.tittel) + '</p><ul class="gr-plakat-kort">' + emner.map(e =>
      '<li><a class="gr-pkort" href="grammatikk.html?id=' + e.id + '"' + fargeStil(e) + '><span class="gr-pkort-navn">' + esc(e.tittel) + '</span><span class="gr-pkort-kropp"><span class="gr-pkort-def">' + esc(e.kort) + "</span>" +
      (e.eks ? '<span class="gr-pkort-eks">' + e.eks.map(([o, ord]) => "<span><u>" + esc(o) + "</u>" + ord.split(",").map(w => "<i>" + esc(w.trim()) + "</i>").join("") + "</span>").join("") + "</span>" : "") +
      '<span class="gr-pkort-norsk" lang="nb">' + esc(e.norsk) + "</span></span></a></li>").join("") + "</ul>";
    if (g.setning) {
      h += '<p class="gr-plakat-setning" aria-label="' + esc(g.setning.map(x => x[0]).join(" ")) + '">' + g.setning.map(([ord, id]) => {
        const e = LV.grammatikkListe.find(x => x.id === id);
        return '<button type="button" class="gr-sord" data-klasse="' + esc(e ? e.entall || e.tittel : "") + '"' + fargeStil(e) + ">" + esc(ord) + "</button>";
      }).join(" ") + '</p><p class="gr-plakat-forklaring" id="gr-sord-svar" aria-live="polite" lang="nb">Trykk på et ord i setningen for å se ordklassen.</p>';
    }
    return h + "</div>";
  }

  // ---------- Oversikt ----------
  function oversikt() {
    document.title = "Grammar and vocabulary – " + (LV.config ? LV.config.navn : "Les verden");
    let h = '<nav class="brodsmuler" aria-label="Brødsmuler" lang="nb"><a href="index.html">Forside</a> › <a href="index.html?fag=engelsk">Engelsk</a> › Grammar and vocabulary</nav>' +
      '<header class="sidehode"><h1>Grammar and vocabulary</h1><p class="ingress">Learn how English works – with short explanations, tables, comparisons with Norwegian and exercises you can check yourself.</p>' +
      '<p class="gr-norsk-ingress" lang="nb">Her finner du forklaringer på engelsk grammatikk og ordforråd, med sammenligning med norsk, tabeller, ordlister og oppgaver du kan rette selv. Dobbeltklikk på et ord for å slå det opp i ordboka.</p></header>' +
      '<nav class="gr-snarvei" aria-label="Emnegrupper" lang="nb">' + LV.grammatikkGrupper.map(g => '<a href="#gruppe-' + g.id + '">' + g.ikon + " " + esc(g.tittel) + "</a>").join("") + "</nav>";
    LV.grammatikkGrupper.forEach(g => {
      h += '<section class="gr-gruppe" id="gruppe-' + g.id + '"><h2><span aria-hidden="true">' + g.ikon + "</span> " + esc(g.tittel) + ' <small lang="nb">' + esc(g.norsk) + "</small></h2><p>" + fmt(g.ingress) + "</p>";
      if (g.plakat) h += plakat(g);
      else h += '<ul class="gr-kortliste">' + g.emner.map(id => LV.grammatikkListe.find(e => e.id === id)).filter(Boolean).map(e =>
        '<li><a class="gr-kort" href="grammatikk.html?id=' + e.id + '"><span class="gr-kort-ikon" aria-hidden="true">' + e.ikon + "</span><strong>" + esc(e.tittel) + "</strong><span>" + esc(e.kort) +
        '</span><small lang="nb">' + esc(e.norsk) + "</small></a></li>").join("") + "</ul>";
      if (g.id === "lookalikes") h += diagram("");
      if (g.quiz) h += '<section class="gr-ovelser"><h3>' + esc(g.quiz.tittel) + '</h3><div id="gr-quiz-' + g.id + '"></div></section>';
      h += "</section>";
    });
    h += '<p class="gr-kommer" lang="nb">Flere emner kommer, for eksempel verbtider, setningsbygning og vanlige feil.</p>';
    $("innhold").innerHTML = h;
    LV.grammatikkGrupper.forEach(g => { if (g.quiz) ovelseSett($("gr-quiz-" + g.id), Object.assign({ type: "mc" }, g.quiz), 0, true); });
    document.querySelectorAll(".gr-sord").forEach(b => b.addEventListener("click", () => {
      document.querySelectorAll(".gr-sord").forEach(x => x.classList.toggle("valgt", x === b));
      $("gr-sord-svar").innerHTML = '<span lang="en">«' + esc(b.textContent.replace(/[.,!]$/, "")) + "» is <strong>" + esc(b.dataset.klasse) + "</strong>.</span>";
    }));
  }

  // ---------- Øvelser ----------
  function ovelseSett(el, sett, nr, utenTittel) {
    const type = sett.type || "mc";
    el.innerHTML = (utenTittel ? "" : '<h3 class="gr-sett-tittel">' + (nr ? "Exercise " + nr + ": " : "") + esc(sett.tittel || "") + "</h3>") +
      (sett.instruks ? '<p class="gr-instruks">' + fmt(sett.instruks) + "</p>" : "") + '<div class="gr-sett-innhold"></div><p class="gr-poeng" aria-live="polite"></p>' +
      '<div class="spill-knapper">' + (type === "finn" || type === "fyll" ? '<button type="button" class="knapp hoved" data-sjekk>Check</button>' : "") +
      (type === "fyll" ? '<button type="button" class="knapp" data-fasit>Show answers</button>' : "") + '<button type="button" class="knapp" data-igjen>↻ Try again</button></div>';
    const inn = el.querySelector(".gr-sett-innhold"), poeng = el.querySelector(".gr-poeng");
    el.querySelector("[data-igjen]").addEventListener("click", () => ovelseSett(el, sett, nr, utenTittel));
    ({ mc: mc, finn: finn, fyll: fyll, sorter: sorter })[type](inn, sett, poeng, el);
  }

  function mc(inn, sett, poengEl) {
    let poeng = 0, svart = 0;
    const liste = bland(sett.oppgaver).map(q => Object.assign({}, q, { blandet: bland(q.valg.map((v, i) => ({ v: v, ok: i === (q.riktig || 0) }))) }));
    inn.innerHTML = '<ol class="gr-quiz">' + liste.map((q, i) => '<li class="gr-sp" data-i="' + i + '"><p>' + fmt(q.s) + '</p><div class="gr-valg">' +
      q.blandet.map((v, j) => '<button type="button" class="knapp quizknapp" data-j="' + j + '">' + fmt(v.v) + "</button>").join("") + '</div><p class="gr-tilbake" aria-live="polite"></p></li>').join("") + "</ol>";
    inn.querySelectorAll(".gr-sp").forEach(li => li.querySelectorAll(".quizknapp").forEach(b => b.addEventListener("click", () => {
      const q = liste[+li.dataset.i], v = q.blandet[+b.dataset.j];
      if (li.dataset.ferdig) return;
      li.dataset.ferdig = "1"; svart++; if (v.ok) poeng++;
      li.querySelectorAll(".quizknapp").forEach((k, j) => { k.disabled = true; if (q.blandet[j].ok) k.classList.add("riktig"); });
      if (!v.ok) b.classList.add("feil");
      li.querySelector(".gr-tilbake").innerHTML = (v.ok ? "<strong>✓ Correct!</strong> " : "<strong>✗ Not quite.</strong> ") + fmt(q.forklaring || "");
      poengEl.textContent = "Score: " + poeng + " / " + svart + (svart === liste.length ? " – " + (poeng === svart ? "perfect! 🎉" : "well done!") : "");
    })));
  }

  // Trykk på ordene. Riktige ord står i [hakeparenteser] i dataene.
  function finn(inn, sett, poengEl, el) {
    const liste = sett.oppgaver.map(q => {
      const deler = [];
      q.s.replace(/\[([^\]]+)\]|([^\s\[\]]+)/g, (m, mal, vanlig) => {
        (mal || vanlig).split(/\s+/).forEach(ord => {
          const p = ord.match(/^([^A-Za-z0-9'’]*)(.*?)([^A-Za-z0-9'’]*)$/);
          if (!p[2] && deler.length) { deler[deler.length - 1].etter += p[1] + p[3]; return; }
          deler.push({ for: p[1], ord: p[2], etter: p[3], mal: !!mal });
        });
        return m;
      });
      return Object.assign({}, q, { deler: deler });
    });
    inn.innerHTML = '<ol class="gr-finn">' + liste.map((q, i) => '<li data-i="' + i + '"><p class="gr-finn-setning">' + q.deler.map((d, j) =>
      esc(d.for) + (d.ord ? '<button type="button" class="gr-ordknapp" data-j="' + j + '" aria-pressed="false">' + esc(d.ord) + "</button>" : "") + esc(d.etter)).join(" ") +
      '</p><p class="gr-tilbake" aria-live="polite"></p></li>').join("") + "</ol>";
    inn.querySelectorAll(".gr-ordknapp").forEach(b => b.addEventListener("click", () => {
      if (b.closest("li").dataset.sjekket) return;
      b.setAttribute("aria-pressed", String(b.getAttribute("aria-pressed") !== "true"));
    }));
    el.querySelector("[data-sjekk]").addEventListener("click", () => {
      let alleRiktig = 0;
      inn.querySelectorAll(".gr-finn > li").forEach(li => {
        const q = liste[+li.dataset.i];
        li.dataset.sjekket = "1";
        let feil = 0, mangler = 0;
        li.querySelectorAll(".gr-ordknapp").forEach(b => {
          const d = q.deler[+b.dataset.j], valgt = b.getAttribute("aria-pressed") === "true";
          b.disabled = true;
          if (d.mal && valgt) b.classList.add("riktig");
          else if (!d.mal && valgt) { b.classList.add("feil"); feil++; }
          else if (d.mal && !valgt) { b.classList.add("mangler"); mangler++; }
        });
        if (!feil && !mangler) alleRiktig++;
        li.querySelector(".gr-tilbake").innerHTML = !feil && !mangler ? "<strong>✓ All correct!</strong>" :
          "<strong>" + (mangler ? mangler + " missing" : "") + (mangler && feil ? ", " : "") + (feil ? feil + " wrong" : "") + ".</strong> " + (q.forklaring ? fmt(q.forklaring) : "The correct words are marked.");
      });
      poengEl.textContent = "Score: " + alleRiktig + " / " + liste.length + " sentences completely correct";
    });
  }

  // Skriv inn svaret. Godtar alle svar i svar[].
  function fyll(inn, sett, poengEl, el) {
    inn.innerHTML = '<ol class="gr-fyll">' + sett.oppgaver.map((q, i) => {
      const [for_, etter] = q.s.split("___");
      return '<li data-i="' + i + '"><label><span>' + fmt(for_) + '</span><input type="text" class="gr-felt" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Answer ' + (i + 1) + '" size="' + Math.max(6, Math.max(...q.svar.map(s => s.length)) + 2) + '"><span>' + fmt(etter || "") + "</span></label>" +
        (q.hint ? ' <span class="gr-fyll-hint">(' + fmt(q.hint) + ")</span>" : "") + '<p class="gr-tilbake" aria-live="polite"></p></li>';
    }).join("") + "</ol>";
    inn.querySelectorAll(".gr-felt").forEach(f => f.addEventListener("keydown", e => { if (e.key === "Enter") { e.preventDefault(); el.querySelector("[data-sjekk]").click(); } }));
    const sjekk = vis => {
      let r = 0;
      inn.querySelectorAll(".gr-fyll > li").forEach(li => {
        const q = sett.oppgaver[+li.dataset.i], f = li.querySelector("input");
        if (vis && !q.svar.some(s => norm(s) === norm(f.value))) f.value = q.svar[0];
        const ok = q.svar.some(s => norm(s) === norm(f.value));
        if (ok) r++;
        f.classList.toggle("riktig", ok); f.classList.toggle("feil", !ok && f.value.trim() !== "");
        li.querySelector(".gr-tilbake").innerHTML = ok ? (vis ? "" : "<strong>✓</strong> ") + (q.forklaring ? fmt(q.forklaring) : "") :
          f.value.trim() ? "<strong>✗ Try again.</strong>" + (q.tips ? " " + fmt(q.tips) : "") : "";
      });
      poengEl.textContent = vis ? "" : "Score: " + r + " / " + sett.oppgaver.length;
    };
    el.querySelector("[data-sjekk]").addEventListener("click", () => sjekk(false));
    el.querySelector("[data-fasit]").addEventListener("click", () => sjekk(true));
  }

  // Sorter ord i kategorier: trykk på riktig kategori for hvert ord.
  function sorter(inn, sett, poengEl) {
    const ord = bland(sett.ord);
    let forsteForsok = 0, ferdig = 0;
    inn.innerHTML = '<ul class="gr-sorter">' + ord.map(([o], i) => '<li data-i="' + i + '"><span class="gr-sorter-ord">' + esc(o) + '</span><span class="gr-sorter-valg">' +
      sett.kategorier.map((k, j) => '<button type="button" class="knapp liten" data-k="' + j + '">' + esc(k) + "</button>").join("") + "</span></li>").join("") + "</ul>";
    inn.querySelectorAll(".gr-sorter li").forEach(li => li.querySelectorAll("[data-k]").forEach(b => b.addEventListener("click", () => {
      if (li.dataset.ferdig) return;
      const rett = ord[+li.dataset.i][1];
      if (+b.dataset.k === rett) {
        li.dataset.ferdig = "1"; ferdig++;
        if (!li.dataset.bom) forsteForsok++;
        b.classList.add("riktig"); li.classList.add("ferdig");
        li.querySelectorAll("[data-k]").forEach(x => { if (x !== b) x.disabled = true; });
      } else { li.dataset.bom = "1"; b.classList.add("feil"); b.disabled = true; }
      poengEl.textContent = "Correct on the first try: " + forsteForsok + " / " + ferdig + (ferdig === ord.length ? " – all words sorted! 🎉" : "");
    })));
  }

  // ---------- Ett emne ----------
  async function emne(id) {
    const info = LV.grammatikkListe.find(e => e.id === id);
    if (!info) { $("innhold").innerHTML = '<p class="melding" lang="nb">Fant ikke emnet. <a href="grammatikk.html">Til oversikten</a></p>'; return; }
    LV.grammatikk = null;
    await LV.lastSkript("data/grammatikk/" + encodeURIComponent(id) + ".js");
    const g = LV.grammatikk;
    const gruppe = LV.grammatikkGrupper.find(x => x.emner.includes(id));
    document.title = g.tittel + " – Grammar and vocabulary – " + (LV.config ? LV.config.navn : "Les verden");
    const sett = Array.isArray(g.ovelser) && g.ovelser.length && g.ovelser[0].s !== undefined ? [{ type: "mc", tittel: "Choose the right answer", oppgaver: g.ovelser }] : (g.ovelser || []);
    let h = '<nav class="brodsmuler" aria-label="Brødsmuler" lang="nb"><a href="index.html">Forside</a> › <a href="index.html?fag=engelsk">Engelsk</a> › <a href="grammatikk.html">Grammar and vocabulary</a> › ' + esc(g.tittel) + "</nav>" +
      '<header class="sidehode gr-hode' + (info.farge ? " farget" : "") + '"' + fargeStil(info) + '><p class="overlinje">' + esc(gruppe ? gruppe.tittel : "Grammar and vocabulary") + "</p><h1>" +
      (info.farge ? "" : '<span aria-hidden="true">' + g.ikon + "</span> ") + esc(g.tittel) + (g.norskNavn ? ' <small lang="nb">(' + esc(g.norskNavn) + ")</small>" : "") + "</h1>" +
      '<p class="ingress">' + fmt(g.ingress) + "</p>" + (g.opphav ? '<p class="gr-opphav"><span>Word origin:</span> ' + esc(g.opphav) + "</p>" : "") + "</header>";
    const snarveier = [["forklaring", "Forklaring"], g.tabeller ? ["tabeller", "Tabeller"] : null, g.sammenlign ? ["norsk", "Sammenlignet med norsk"] : null, g.grupper ? ["ordliste", "Ordliste"] : null, ["ovelser", "Øvelser"], ["oppgaver", "Oppgaver"]].filter(Boolean);
    h += '<nav class="gr-snarvei" aria-label="På denne siden" lang="nb">' + snarveier.map(([a, t]) => '<a href="#' + a + '">' + t + "</a>").join("") + "</nav>";
    h += '<section class="gr-forklaring" id="forklaring"><h2>What is it?</h2>' + g.forklaring.map(p => "<p>" + fmt(p) + "</p>").join("") +
      '<details class="gr-norsk" lang="nb" open><summary>🇳🇴 Forklaring på norsk</summary><p>' + fmt(g.norsk) + "</p></details>" +
      (gruppe && gruppe.id === "lookalikes" ? diagram(g.id) : "") +
      '<aside class="gr-husk"><h3>💡 Remember</h3><ul>' + g.husk.map(x => "<li>" + fmt(x) + "</li>").join("") + "</ul></aside></section>";
    if (g.tabeller) {
      h += '<section id="tabeller"><h2>Tables</h2>' + g.tabeller.map(t => '<figure class="gr-tabell"><figcaption>' + fmt(t.tittel) + "</figcaption>" + (t.tekst ? '<p class="gr-gruppetekst">' + fmt(t.tekst) + "</p>" : "") +
        '<div class="gr-tabell-rull"><table><thead><tr>' + t.kolonner.map(k => '<th scope="col">' + fmt(k) + "</th>").join("") + "</tr></thead><tbody>" +
        t.rader.map(r => "<tr>" + r.map((c, i) => (i === 0 ? '<th scope="row">' : "<td>") + fmt(c) + (i === 0 ? "</th>" : "</td>")).join("") + "</tr>").join("") + "</tbody></table></div>" +
        (t.note ? '<p class="gr-tabell-note">' + fmt(t.note) + "</p>" : "") + "</figure>").join("") + "</section>";
    }
    if (g.sammenlign) {
      h += '<section class="gr-sammenlign" id="norsk" lang="nb"><h2>🇳🇴 ↔ 🇬🇧 Sammenlignet med norsk</h2><p class="gr-gruppetekst">Her er det engelsk og norsk er ulike – og der norske elever ofte gjør feil.</p><ul class="gr-sml-liste">' +
        g.sammenlign.map(s => '<li><h3>' + fmt(s.tittel) + "</h3><p>" + fmt(s.tekst) + "</p>" + (s.eks ? '<table class="gr-sml-eks"><thead><tr><th scope="col">Norsk</th><th scope="col" lang="en">English</th></tr></thead><tbody>' +
          s.eks.map(([n, e]) => '<tr><td>' + fmt(n) + '</td><td lang="en">' + fmt(e) + "</td></tr>").join("") + "</tbody></table>" : "") + "</li>").join("") + "</ul></section>";
    }
    if (g.grupper) {
      h += '<section id="ordliste"><h2>Word list</h2><p class="gr-hint" lang="nb">Trykk på 🔊 for å høre eksempelsetningen. Dobbeltklikk på et ord for å slå det opp i ordboka.</p>';
      g.grupper.forEach(gr => {
        h += '<h3 class="gr-gruppetittel">' + esc(gr.tittel) + "</h3>" + (gr.tekst ? '<p class="gr-gruppetekst">' + fmt(gr.tekst) + "</p>" : "") + '<ul class="gr-ordsett">' +
          gr.ord.map(sett => '<li class="gr-sett"><p class="gr-settord">' + sett.map(o => "<strong>" + esc(o.ord) + "</strong>").join(" – ") + "</p><dl>" +
            sett.map(o => '<div class="gr-ord"><dt><strong>' + esc(o.ord) + "</strong>" + (o.uttale ? ' <span class="gr-uttale">' + esc(o.uttale) + "</span>" : "") + "</dt>" +
              "<dd>" + esc(o.betyr) + ' <span class="gr-oversatt" lang="nb">(' + esc(o.norsk) + ")</span>" +
              (o.eks ? '<span class="gr-eks">' + lesKnapp(o.eks, "Listen: " + o.eks) + " <em>" + esc(o.eks) + "</em></span>" : "") + "</dd></div>").join("") + "</dl></li>").join("") + "</ul>";
      });
      h += "</section>";
    }
    if (g.obs) h += '<aside class="gr-obs"><h2>' + esc(g.obs.tittel) + "</h2>" + g.obs.tekst.map(p => "<p>" + fmt(p) + "</p>").join("") + "</aside>";
    h += '<section class="gr-ovelser" id="ovelser"><h2>Exercises</h2><p class="gr-hint" lang="nb">Øvelsene rettes med en gang. Trykk «Try again» for å prøve på nytt.</p>' +
      sett.map((s, i) => '<div class="gr-sett-boks" id="gr-sett-' + i + '"></div>').join("") + "</section>";
    h += '<section class="gr-oppgaver" id="oppgaver"><h2>Your turn</h2><ol>' + g.oppgaver.map((o, i) =>
      '<li><p>' + fmt(o) + '</p><label class="skjult-visuelt" for="gr-svar' + i + '">Your answer</label><textarea id="gr-svar' + i + '" class="svar" rows="4" placeholder="Write here …"></textarea></li>').join("") +
      '</ol><div class="spill-knapper"><button type="button" class="knapp hoved" id="gr-kopier">Copy my answers</button><span id="gr-status" role="status" aria-live="polite"></span></div>' +
      '<p class="gr-hint" lang="nb">Svarene lagres ikke. Kopier dem og lim dem inn i et dokument før du lukker siden.</p></section>';
    const se = (g.se || []).map(x => LV.grammatikkListe.find(e => e.id === x)).filter(Boolean);
    if (se.length) h += '<section><h2>See also</h2><ul class="gr-kortliste">' + se.map(e => '<li><a class="gr-kort' + (e.farge ? " farget" : "") + '" href="grammatikk.html?id=' + e.id + '"' + fargeStil(e) + '><span class="gr-kort-ikon" aria-hidden="true">' + e.ikon + "</span><strong>" + esc(e.tittel) + "</strong><span>" + esc(e.kort) + "</span></a></li>").join("") + "</ul></section>";
    if (gruppe && gruppe.plakat) h += '<nav class="gr-naboer" aria-label="Andre ordklasser"><p lang="nb">Andre ordklasser:</p><ul>' + gruppe.emner.filter(x => x !== id).map(x => LV.grammatikkListe.find(e => e.id === x)).filter(Boolean).map(e =>
      '<li><a href="grammatikk.html?id=' + e.id + '"' + fargeStil(e) + ">" + esc(e.tittel) + "</a></li>").join("") + "</ul></nav>";
    h += '<p><a href="grammatikk.html">← All grammar and vocabulary topics</a></p>';
    $("innhold").innerHTML = h;
    sett.forEach((s, i) => ovelseSett($("gr-sett-" + i), s, sett.length > 1 ? i + 1 : 0));
    $("gr-kopier").addEventListener("click", () => {
      const tekst = "Grammar and vocabulary: " + g.tittel + "\n\n" + g.oppgaver.map((o, i) => (i + 1) + ". " + o.replace(/\*/g, "") + "\n" + ($("gr-svar" + i).value.trim() || "(no answer)")).join("\n\n") + "\n";
      const ok = () => { $("gr-status").textContent = "Copied!"; };
      if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(tekst).then(ok, reserve); else reserve();
      function reserve() { const t = document.createElement("textarea"); t.value = tekst; document.body.appendChild(t); t.select(); try { document.execCommand("copy"); ok(); } catch (e) { window.prompt("Ctrl+C / Cmd+C", tekst); } t.remove(); }
    });
  }

  document.addEventListener("click", e => { const b = e.target.closest(".gr-les"); if (b) les(b.dataset.les); });
  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".hovedmeny a").forEach(a => { if (a.getAttribute("href") === "index.html?fag=engelsk") a.setAttribute("aria-current", "page"); });
    const id = LV.param("id");
    if (id) emne(id); else oversikt();
  });
})();
