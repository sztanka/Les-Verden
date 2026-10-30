/* =========================================================
   Les verden – landsider (engelsk)
   land.html            → oversikt over landene
   land.html?id=<id>    → én landside
   Oversikten ligger i data/land/oversikt.js, innholdet i data/land/<id>.js.
   Kartquizen bruker kartspillet (assets/kartspill.js) innebygd på siden.
   Ingenting lagres: svarene finnes bare så lenge siden er åpen.
   ========================================================= */

(function () {
  const LV = window.LV;
  let land = null, info = null;
  let endret = false;

  const T = {
    hjem: "Forside", engelsk: "Engelsk", landsider: "Countries",
    fakta: "Fact file", kartquiz: "Map quiz", severdigheter: "Sights and landmarks", tidslinje: "Timeline",
    quiz: "Quiz", oppgaver: "Tasks", finnFakta: "Find facts", undersok: "Explore more", nasjoner: "The four nations",
    temaer: "Read more on Les verden", kilder: "Sources", dittSvar: "Your answer",
    navn: "Your name", kopier: "Copy my answers", slett: "Delete all answers", kopiert: "Copied! Paste your answers into a document.",
    ingenSvar: "You have not written any answers yet.", bekreftSlett: "Delete all your answers on this page?",
    ulagret: "You have answers that are not copied. Do you want to leave the page?",
    poeng: "Score", proevIgjen: "Try again", riktig: "Correct!", feil: "Not quite.", riktigSvar: "The right answer is",
    kartInfo: "Choose a map, then find the places. You can also choose “Hva heter det?” (name the marked place) or “Øv og utforsk” (explore freely).",
    norsk: "På norsk", tilToppen: "Back to top"
  };

  // ---------- Tekstformatering: **fet** og [[visning|nøkkel]] ----------
  let ordTeller = 0;
  function formater(tekst) {
    let h = LV.esc(tekst);
    h = h.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    h = h.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, function (_, vis, nokkel) {
      const n = (nokkel || vis).trim();
      const forkl = land.ord && (land.ord[n] || land.ord[n.toLowerCase()]);
      if (!forkl) return vis;
      const id = "ord-" + (++ordTeller);
      return '<span class="ord-wrap"><button type="button" class="ord" aria-expanded="false" aria-controls="' + id + '">' + vis + "</button>" +
        '<span class="ordforklaring" id="' + id + '" role="tooltip" hidden><strong>' + LV.esc(n) + "</strong>" + LV.esc(forkl) + "</span></span>";
    });
    return h;
  }
  const ren = t => String(t).replace(/\*\*(.+?)\*\*/g, "$1").replace(/\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g, "$1");
  const bland = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

  function svarfelt(nokkel, sporsmal, gruppe) {
    return '<label class="svar-etikett" for="svar-' + nokkel + '">' + T.dittSvar + "</label>" +
      '<textarea class="svar" id="svar-' + nokkel + '" data-sporsmal="' + LV.esc(sporsmal) + '" data-gruppe="' + LV.esc(gruppe) + '"></textarea>';
  }

  function figur(i) {
    if (!i.bilde) return "";
    const navn = i.kredittUrl ? '<a href="' + LV.esc(i.kredittUrl) + '" target="_blank" rel="noopener">' + LV.esc(i.kreditt) + "</a>" : LV.esc(i.kreditt || "");
    const kilde = i.kilde ? " / " + (i.kildeUrl ? '<a href="' + LV.esc(i.kildeUrl) + '" target="_blank" rel="noopener">' + LV.esc(i.kilde) + "</a>" : LV.esc(i.kilde)) : "";
    return '<figure class="temabilde"><img src="' + LV.esc(i.bilde) + '" alt="' + LV.esc(i.bildeAlt || "") + '">' +
      (i.kreditt ? '<figcaption lang="nb">Foto: ' + navn + kilde + "</figcaption>" : "") + "</figure>";
  }

  // =========================================================
  // Oversikt
  // =========================================================
  function oversikt() {
    document.title = "Countries – " + (LV.config ? LV.config.navn : "Les verden");
    let h = '<nav class="brodsmuler" aria-label="Brødsmuler" lang="nb"><a href="index.html">' + T.hjem + '</a> › <a href="index.html?fag=engelsk">' + T.engelsk + "</a> › Landsider</nav>";
    h += '<header class="sidehode"><h1>Countries in the English-speaking world</h1>' +
      '<p class="ingress">Get to know the countries where English is spoken. Every country page has a fact file, texts about geography, history, politics and language, famous sights, a map quiz, a quiz and tasks.</p>' +
      '<p class="land-norsk" lang="nb">Landsider i engelsk: Les om landet, spill kartquiz, ta quizen og løs oppgavene. Ingenting lagres – bruk «Copy my answers» for å ta vare på svarene dine.</p></header>';
    h += '<ul class="landkort-rad">' + LV.landliste.map(l =>
      '<li><a class="landkort" href="land.html?id=' + encodeURIComponent(l.id) + '">' +
        (l.bilde ? '<img src="' + LV.esc(l.bilde) + '" alt="" loading="lazy">' : "") +
        '<span class="landkort-tekst"><span class="landkort-navn"><span class="flagg" aria-hidden="true">' + l.flagg + "</span>" + LV.esc(l.navn) + "</span>" +
        '<span class="landkort-norsk" lang="nb">' + LV.esc(l.norsk) + "</span>" +
        "<span>" + LV.esc(l.kort) + "</span>" +
        '<span class="vk-cta">Explore →</span></span></a></li>').join("") + "</ul>";
    h += '<p class="land-kartlenke" lang="nb">Vil du bare øve på kartet? <a href="kartspill.html">Gå til kartspillet →</a></p>';
    document.getElementById("innhold").innerHTML = h;
    document.querySelectorAll(".hovedmeny a").forEach(a => { if (a.getAttribute("href") === "index.html?fag=engelsk") a.setAttribute("aria-current", "page"); });
  }

  // =========================================================
  // Landsiden
  // =========================================================
  function bygg() {
    document.documentElement.lang = "en";
    document.body.classList.add("fag-engelsk");
    document.body.dataset.fag = "engelsk";
    document.title = info.navn + " – " + (LV.config ? LV.config.navn : "Les verden");

    const deler = [];
    let h = '<nav class="brodsmuler" aria-label="Brødsmuler" lang="nb"><a href="index.html">' + T.hjem + '</a> › <a href="index.html?fag=engelsk">' + T.engelsk +
      '</a> › <a href="land.html">Landsider</a> › ' + LV.esc(info.norsk) + "</nav>";

    if (LV.param("laerer") === "1" && land.kontroller && land.kontroller.length) {
      h += '<aside class="laerer-boks" lang="nb"><h2>For læreren: kontroller disse opplysningene</h2><ul>' +
        land.kontroller.map(k => "<li>" + LV.esc(k) + "</li>").join("") + "</ul></aside>";
    }
    h += figur(info);
    h += '<header class="temahode land-hode"><span class="merker"><span class="merke">Engelsk</span><span class="merke">Country page</span></span>' +
      '<h1><span class="flagg" aria-hidden="true">' + info.flagg + "</span> " + LV.esc(info.navn) + "</h1>" +
      '<p class="land-norsk" lang="nb">' + T.norsk + ": <strong>" + LV.esc(info.norsk) + "</strong></p>" +
      '<p class="ingress">' + formater(land.ingress) + "</p></header>";

    // Innhold (snarveier)
    deler.push(["fakta", T.fakta]);
    if (land.nasjoner) deler.push(["nasjoner", land.nasjonerTittel || T.nasjoner]);
    land.seksjoner.forEach(s => deler.push([s.id, s.tittel]));
    if (land.severdigheter) deler.push(["severdigheter", T.severdigheter]);
    if (land.tidslinje) deler.push(["tidslinje", T.tidslinje]);
    if (info.kartsett && info.kartsett.length) deler.push(["kartquiz", T.kartquiz]);
    if (land.quiz) deler.push(["quiz", T.quiz]);
    deler.push(["oppgaver", T.oppgaver]);
    h += '<nav class="land-snarveier" aria-label="Contents"><ul>' + deler.map(([id, t]) => '<li><a href="#' + id + '">' + LV.esc(t) + "</a></li>").join("") + "</ul></nav>";

    // Faktaboks
    h += '<section class="faktaboks" id="fakta" aria-labelledby="fakta-t"><h2 id="fakta-t"><span class="flagg" aria-hidden="true">' + info.flagg + "</span> " + T.fakta + "</h2><dl>" +
      land.fakta.map(([k, v]) => "<div><dt>" + LV.esc(k) + "</dt><dd>" + formater(v) + "</dd></div>").join("") + "</dl></section>";

    // Nasjoner / delstater (f.eks. de fire nasjonene i UK)
    if (land.nasjoner) {
      h += '<section id="nasjoner" aria-labelledby="nasjoner-t"><h2 id="nasjoner-t">' + LV.esc(land.nasjonerTittel || T.nasjoner) + '</h2><div class="nasjonkort-rad">' +
        land.nasjoner.map(n => '<article class="nasjonkort"><h3><span class="flagg" aria-hidden="true">' + (n.flagg || "") + "</span> " + LV.esc(n.navn) + "</h3>" +
          "<dl>" + n.fakta.map(([k, v]) => "<div><dt>" + LV.esc(k) + "</dt><dd>" + formater(v) + "</dd></div>").join("") + "</dl>" +
          "<p>" + formater(n.tekst) + "</p></article>").join("") + "</div></section>";
    }

    // Fagtekst
    let stopp = 0;
    h += '<article class="fagtekst land-tekst">';
    land.seksjoner.forEach(s => {
      h += '<section class="avsnitt" id="' + s.id + '"><h2>' + (s.ikon ? '<span class="land-ikon" aria-hidden="true">' + s.ikon + "</span> " : "") + LV.esc(s.tittel) + "</h2>" +
        s.tekst.map(p => "<p>" + formater(p) + "</p>").join("") + "</section>";
      if (s.stoppOgTenk) {
        stopp++;
        h += '<aside class="stopp"><div class="tittel"><span aria-hidden="true">✋</span> Stop and think</div><p>' + formater(s.stoppOgTenk) + "</p>" +
          svarfelt("stopp-" + stopp, ren(s.stoppOgTenk), "Stop and think") + "</aside>";
      }
    });
    h += "</article>";

    // Severdigheter
    if (land.severdigheter) {
      h += '<section id="severdigheter" aria-labelledby="sev-t"><h2 id="sev-t">' + T.severdigheter + '</h2><div class="severdighet-rad">' +
        land.severdigheter.map(s => '<article class="severdighet"><h3>' + LV.esc(s.navn) + "</h3>" +
          (s.sted ? '<p class="sev-sted">📍 ' + LV.esc(s.sted) + "</p>" : "") + "<p>" + formater(s.tekst) + "</p></article>").join("") + "</div></section>";
    }

    // Tidslinje
    if (land.tidslinje) {
      h += '<section class="tidslinje" id="tidslinje" aria-labelledby="tl-t"><h2 id="tl-t">' + T.tidslinje + "</h2><ol>" +
        land.tidslinje.map(t => '<li><span class="dato">' + LV.esc(t.dato) + '</span><span class="hendelse">' + formater(t.tekst) + "</span></li>").join("") + "</ol></section>";
    }

    // Kartquiz
    if (info.kartsett && info.kartsett.length) {
      h += '<section class="land-kartquiz" id="kartquiz" aria-labelledby="kq-t"><h2 id="kq-t">🗺️ ' + T.kartquiz + "</h2>" +
        '<p class="land-norsk">' + T.kartInfo + "</p>" +
        '<div class="ks-innebygd kartspill-side" id="ks-innebygd"><p class="melding">Loading the map …</p></div></section>';
    }

    // Quiz
    if (land.quiz) {
      h += '<section class="land-quiz" id="quiz" aria-labelledby="quiz-t"><h2 id="quiz-t">❓ ' + T.quiz + "</h2>" +
        '<p class="quiz-poeng" id="quiz-poeng" aria-live="polite"></p><ol class="quizliste" id="quizliste"></ol>' +
        '<button class="knapp" id="quiz-igjen">↻ ' + T.proevIgjen + "</button></section>";
    }

    // Oppgaver
    h += '<section class="oppgaver" id="oppgaver" aria-labelledby="opp-t"><h2 id="opp-t">✏️ ' + T.oppgaver + "</h2>";
    let nr = 0;
    if (land.finnFakta) {
      h += '<div class="oppgavegruppe"><h3>🔎 ' + T.finnFakta + '</h3><p class="nivabeskrivelse">Find the answers in the texts and the fact file on this page.</p>';
      land.finnFakta.forEach(o => { nr++; h += '<div class="oppgave"><p class="sporsmal"><span class="nr">' + nr + ".</span>" + formater(o) + "</p>" + svarfelt("ff-" + nr, nr + ". " + ren(o), T.finnFakta) + "</div>"; });
      h += "</div>";
    }
    if (land.undersok) {
      h += '<div class="oppgavegruppe"><h3>🌐 ' + T.undersok + '</h3><p class="nivabeskrivelse">Use the internet or the library. Remember to check your sources and write in your own words.</p>';
      land.undersok.forEach(o => {
        nr++;
        const lenker = (o.lenker || []).map(l => '<a href="' + LV.esc(l.url) + '" target="_blank" rel="noopener">' + LV.esc(l.tittel) + "</a>").join(" · ");
        h += '<div class="oppgave"><p class="sporsmal"><span class="nr">' + nr + ".</span>" + formater(o.tekst) + "</p>" +
          (lenker ? '<p class="oppgave-lenker">Start here: ' + lenker + "</p>" : "") + svarfelt("us-" + nr, nr + ". " + ren(o.tekst), T.undersok) + "</div>";
      });
      h += "</div>";
    }
    h += "</section>";

    // Temaer på nettstedet
    const temaer = (info.temaer || []).map(id => LV.temaer && LV.temaer.find(t => t.id === id)).filter(Boolean);
    if (temaer.length) {
      h += "<section><h2>" + T.temaer + '</h2><ul class="temaliste">' + temaer.map(t =>
        '<li><a class="temakort fag-' + t.fag + '" href="tema.html?id=' + encodeURIComponent(t.id) + '">' + LV.merker(t) +
        "<h3" + (t.sprak === "en" ? "" : ' lang="nb"') + ">" + LV.esc(t.tittel) + "</h3><p" + (t.sprak === "en" ? "" : ' lang="nb"') + ">" + LV.esc(t.kort) + "</p></a></li>").join("") + "</ul></section>";
    }
    if (land.kilder) {
      h += "<section><h2>" + T.kilder + '</h2><ul class="kilder">' +
        land.kilder.map(k => '<li><a href="' + LV.esc(k.url) + '" target="_blank" rel="noopener">' + LV.esc(k.tittel) + "</a></li>").join("") + "</ul></section>";
    }
    h += '<p class="land-andre" lang="nb">Andre land: ' + LV.landliste.filter(l => l.id !== info.id).map(l =>
      '<a href="land.html?id=' + l.id + '"><span aria-hidden="true">' + l.flagg + "</span> " + LV.esc(l.norsk) + "</a>").join(" · ") + "</p>";

    document.getElementById("innhold").innerHTML = h;
    document.querySelectorAll(".hovedmeny a").forEach(a => { if (a.getAttribute("href") === "index.html?fag=engelsk") a.setAttribute("aria-current", "page"); });

    // Svarlinje
    const linje = document.createElement("div");
    linje.className = "svarlinje";
    linje.innerHTML = '<div class="svarlinje-indre"><label class="skjult-visuelt" for="elevnavn">' + T.navn + "</label>" +
      '<input id="elevnavn" type="text" placeholder="' + T.navn + '" autocomplete="off">' +
      '<button class="knapp hoved" id="kopier">' + T.kopier + '</button><button class="knapp fare" id="slett">' + T.slett + "</button>" +
      '<span class="status" id="status" role="status" aria-live="polite"></span></div>';
    document.body.appendChild(linje);

    kobleOrd();
    kobleSvar();
    if (land.quiz) startQuiz();
    const kq = document.getElementById("ks-innebygd");
    if (kq && LV.startKartquiz) LV.startKartquiz(kq, info.kartsett);
  }

  // ---------- Ordforklaringer ----------
  function kobleOrd() {
    const lukk = unntak => document.querySelectorAll(".ord[aria-expanded='true']").forEach(b => {
      if (b === unntak) return;
      b.setAttribute("aria-expanded", "false");
      document.getElementById(b.getAttribute("aria-controls")).hidden = true;
    });
    document.addEventListener("click", e => {
      const k = e.target.closest(".ord");
      if (!k) { if (!e.target.closest(".ordforklaring")) lukk(); return; }
      const boks = document.getElementById(k.getAttribute("aria-controls"));
      const apne = k.getAttribute("aria-expanded") !== "true";
      lukk(k);
      k.setAttribute("aria-expanded", String(apne));
      boks.hidden = !apne;
      if (apne) {
        boks.style.left = "0px";
        const r = boks.getBoundingClientRect();
        if (r.right > window.innerWidth - 8) boks.style.left = (window.innerWidth - 8 - r.right) + "px";
      }
    });
    document.addEventListener("keydown", e => { if (e.key === "Escape") lukk(); });
  }

  // ---------- Quiz ----------
  let Q = null;
  function startQuiz() {
    Q = { svar: {}, sporsmal: bland(land.quiz).map(q => {
      const valg = bland(q.valg.map((v, i) => ({ v: v, riktig: i === q.riktig })));
      return { s: q.s, valg: valg, forklaring: q.forklaring };
    }) };
    const liste = document.getElementById("quizliste");
    liste.innerHTML = Q.sporsmal.map((q, i) =>
      '<li class="quizspm" data-q="' + i + '"><p class="quiz-s">' + formater(q.s) + '</p><div class="quiz-valg">' +
      q.valg.map((v, j) => '<button class="knapp quizknapp" data-q="' + i + '" data-v="' + j + '">' + LV.esc(v.v) + "</button>").join("") +
      '</div><p class="quiz-forklaring" hidden></p></li>').join("");
    liste.querySelectorAll(".quizknapp").forEach(b => b.addEventListener("click", () => svarQuiz(+b.dataset.q, +b.dataset.v)));
    oppdaterPoeng();
    const igjen = document.getElementById("quiz-igjen");
    igjen.onclick = () => { startQuiz(); document.getElementById("quiz").scrollIntoView({ behavior: "smooth" }); };
  }
  function svarQuiz(qi, vi) {
    if (qi in Q.svar) return;
    const q = Q.sporsmal[qi];
    const ok = q.valg[vi].riktig;
    Q.svar[qi] = ok;
    endret = true;
    const li = document.querySelector('.quizspm[data-q="' + qi + '"]');
    li.querySelectorAll(".quizknapp").forEach((b, j) => {
      b.disabled = true;
      if (q.valg[j].riktig) b.classList.add("riktig");
      else if (j === vi) b.classList.add("feil");
    });
    li.classList.add(ok ? "svart-riktig" : "svart-feil");
    const f = li.querySelector(".quiz-forklaring");
    const fasit = q.valg.find(v => v.riktig).v;
    f.innerHTML = "<strong>" + (ok ? "✓ " + T.riktig : "✗ " + T.feil + " " + T.riktigSvar + ": " + LV.esc(fasit) + ".") + "</strong> " + (q.forklaring ? formater(q.forklaring) : "");
    f.hidden = false;
    oppdaterPoeng();
  }
  function oppdaterPoeng() {
    const n = Object.keys(Q.svar).length, r = Object.values(Q.svar).filter(Boolean).length;
    const ferdig = n === Q.sporsmal.length;
    document.getElementById("quiz-poeng").innerHTML = T.poeng + ": <strong>" + r + " / " + n + "</strong>" + (n < Q.sporsmal.length ? " (" + (Q.sporsmal.length - n) + " left)" : "") +
      (ferdig ? " – " + (r === n ? "Perfect! 🏆" : r >= n * 0.7 ? "Well done! 🎉" : "Read the page again and try once more!") : "");
  }

  // ---------- Kopier og slett svar ----------
  function datoTekst() { const d = new Date(); return String(d.getDate()).padStart(2, "0") + "." + String(d.getMonth() + 1).padStart(2, "0") + "." + d.getFullYear(); }
  function kopitekst() {
    const felt = Array.from(document.querySelectorAll("textarea.svar")).filter(t => t.value.trim());
    const qn = Q ? Object.keys(Q.svar).length : 0;
    if (!felt.length && !qn) return null;
    const navn = document.getElementById("elevnavn").value.trim();
    const l = [];
    if (navn) l.push("Name: " + navn);
    l.push("Country page: " + info.navn + " (Engelsk)", "Date: " + datoTekst());
    if (qn) l.push("Quiz: " + Object.values(Q.svar).filter(Boolean).length + " of " + qn + " correct (" + Q.sporsmal.length + " questions)");
    let gr = null;
    felt.forEach(t => {
      if (t.dataset.gruppe !== gr) { l.push("", t.dataset.gruppe.toUpperCase()); gr = t.dataset.gruppe; }
      l.push(t.dataset.sporsmal, "Answer: " + t.value.trim(), "");
    });
    return l.join("\n").replace(/\n{3,}/g, "\n\n").trim() + "\n";
  }
  async function kopierTekst(tekst) {
    try { await navigator.clipboard.writeText(tekst); return true; }
    catch (e) {
      const ta = document.createElement("textarea"); ta.value = tekst; ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select();
      let ok = false; try { ok = document.execCommand("copy"); } catch (e2) { ok = false; }
      ta.remove(); return ok;
    }
  }
  function status(t, ok) { const s = document.getElementById("status"); s.textContent = t; s.classList.toggle("ok", !!ok); }
  function kobleSvar() {
    document.addEventListener("input", e => { if (e.target.matches("textarea.svar")) { endret = true; status(""); } });
    document.getElementById("kopier").addEventListener("click", async () => {
      const t = kopitekst();
      if (!t) return status(T.ingenSvar);
      if (await kopierTekst(t)) { endret = false; status(T.kopiert, true); } else window.prompt("Ctrl+C / Cmd+C", t);
    });
    document.getElementById("slett").addEventListener("click", () => {
      if (!confirm(T.bekreftSlett)) return;
      document.querySelectorAll("textarea.svar").forEach(t => { t.value = ""; });
      if (land.quiz) startQuiz();
      endret = false; status("");
    });
    window.addEventListener("beforeunload", e => { if (!endret) return; e.preventDefault(); e.returnValue = T.ulagret; return T.ulagret; });
  }

  // ---------- Start ----------
  document.addEventListener("DOMContentLoaded", function () {
    const id = LV.param("id");
    info = id && LV.landliste.find(l => l.id === id);
    if (!info) return oversikt();
    LV.lastSkript("data/land/" + info.id + ".js").then(() => {
      land = LV.land;
      bygg();
      if (location.hash) { const m = document.querySelector(location.hash); if (m) m.scrollIntoView(); }
    }).catch(() => { document.getElementById("innhold").innerHTML = '<p class="melding">Fant ikke landet.</p>'; });
  });
})();
