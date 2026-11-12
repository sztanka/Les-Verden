/* =========================================================
   Les verden – Sports in the English-speaking world (sport.html)
   Data: data/sport.js (LV.sport). Landene hentes fra LV.landliste.
   &laerer=1 viser opplysninger læreren bør kontrollere. Ingenting lagres.
   ========================================================= */
(function () {
  const LV = window.LV;
  const S = () => LV.sport;
  const $ = id => document.getElementById(id);
  const esc = s => LV.esc(String(s == null ? "" : s));
  const fmt = s => esc(s).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\*(.+?)\*/g, "<em>$1</em>");
  const laerer = LV.param("laerer") === "1";
  const bland = a => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };

  let svarListe = [], endret = false;
  function svarfelt(id, sporsmal) {
    svarListe.push({ id: id, sporsmal: sporsmal });
    return '<label class="skjult-visuelt" for="svar-' + id + '">Your answer</label><textarea id="svar-' + id + '" class="svar" rows="3" placeholder="Your answer …"></textarea>';
  }

  function bygg() {
    const s = S(), landliste = LV.landliste.filter(l => s.land[l.id]);
    const idrett = id => s.idretter.find(x => x.id === id);
    document.title = "Sports in the English-speaking world – " + (LV.config ? LV.config.navn : "Les verden");
    let h = '<nav class="brodsmuler" aria-label="Brødsmuler" lang="nb"><a href="index.html">Forside</a> › <a href="index.html?fag=engelsk">Engelsk</a> › <a href="land.html">Landsider</a> › Sport</nav>';
    if (laerer) h += '<aside class="laerer-boks" lang="nb"><h2>For læreren: kontroller disse opplysningene</h2><ul>' + s.kontroller.map(k => "<li>" + esc(k) + "</li>").join("") + "</ul></aside>";
    h += '<header class="sidehode sp-hode"><p class="overlinje">Country pages · Sport</p><h1>Sports in the English-speaking world</h1><p class="ingress">' + fmt(s.ingress) + "</p>" +
      '<p class="land-norsk" lang="nb">Hvilke idretter er store i hvilke land – og hvorfor? Les om idrettene, se hvor de spilles, lær sportsspråket og test deg selv. Ingenting lagres.</p></header>';

    const deler = [["historie", "Where do the sports come from?"], ["kart", "Which sports are big where?"], ["idretter", "The sports"], ["land", "Country by country"], ["ord", "British or American?"], ["idiomer", "Sports idioms"], ["quiz", "Quiz"], ["oppgaver", "Tasks"]];
    h += '<nav class="land-snarveier" aria-label="Contents"><ul>' + deler.map(([id, t]) => '<li><a href="#' + id + '">' + t + "</a></li>").join("") + "</ul></nav>";

    // Historien
    h += '<section id="historie" class="sp-del"><h2>Where do the sports come from?</h2><ol class="sp-historie">' +
      s.innledning.map((x, i) => '<li><span class="sp-hnr" aria-hidden="true">' + ["🇬🇧", "🌍", "🇺🇸"][i] + "</span><div><h3>" + esc(x.tittel) + "</h3><p>" + fmt(x.tekst) + "</p></div></li>").join("") + "</ol></section>";

    // Matrise
    h += '<section id="kart" class="sp-del"><h2>Which sports are big where?</h2><p class="sp-forklar">Click a sport or a country to read more. <span class="sp-tegn s2">●</span> = one of the biggest sports · <span class="sp-tegn s1">○</span> = popular</p>' +
      '<div class="gr-tabell-rull"><table class="sp-matrise"><thead><tr><th scope="col"><span class="skjult-visuelt">Sport</span></th>' +
      landliste.map(l => '<th scope="col"><a href="#land-' + l.id + '" title="' + esc(l.navn) + '"><span class="sp-flagg" aria-hidden="true">' + l.flagg + '</span><span class="sp-lnavn">' + esc(l.norsk === "Storbritannia" ? "UK" : l.navn.replace(/^The /, "").replace("United States of America", "USA")) + "</span></a></th>").join("") + "</tr></thead><tbody>" +
      s.idretter.map(x => '<tr><th scope="row"><a href="#sport-' + x.id + '"><span aria-hidden="true">' + x.ikon + "</span> " + esc(x.navn) + "</a></th>" +
        landliste.map(l => { const v = x.land[l.id] || 0; return '<td class="s' + v + '">' + (v === 2 ? '<span aria-hidden="true">●</span><span class="skjult-visuelt">one of the biggest</span>' : v === 1 ? '<span aria-hidden="true">○</span><span class="skjult-visuelt">popular</span>' : "") + "</td>"; }).join("") + "</tr>").join("") +
      "</tbody></table></div></section>";

    // Idrettene
    h += '<section id="idretter" class="sp-del"><h2>The sports</h2><div class="sp-kortrad">' + s.idretter.map(x =>
      '<article class="sp-kort" id="sport-' + x.id + '"><header><span class="sp-ikon" aria-hidden="true">' + x.ikon + "</span><div><h3>" + esc(x.navn) + "</h3><p>" + fmt(x.kort) + "</p></div></header>" +
      '<p class="sp-hvor"><strong>Big in:</strong> ' + landliste.filter(l => x.land[l.id]).sort((a, b) => x.land[b.id] - x.land[a.id]).map(l => '<a href="#land-' + l.id + '" class="sp-landmerke' + (x.land[l.id] === 2 ? " stor" : "") + '"><span aria-hidden="true">' + l.flagg + "</span> " + esc(l.norsk === "Storbritannia" ? "UK" : l.navn.replace(/^The /, "").replace("United States of America", "USA")) + "</a>").join("") +
      (x.id === "ice-hockey" ? '<span class="sp-landmerke stor"><span aria-hidden="true">🇨🇦</span> Canada</span>' : "") + "</p>" +
      "<h4>How is it played?</h4><p>" + fmt(x.spilles) + "</p>" +
      '<h4>Key words</h4><dl class="sp-ord">' + x.ord.map(([o, f]) => "<div><dt>" + esc(o) + "</dt><dd>" + esc(f) + "</dd></div>").join("") + "</dl>" +
      "<h4>Big events and leagues</h4><ul>" + x.store.map(t => "<li>" + esc(t) + "</li>").join("") + "</ul>" +
      '<p class="sp-visste"><strong>Did you know?</strong> ' + fmt(x.visste) + "</p></article>").join("") + "</div></section>";

    // Landene
    h += '<section id="land" class="sp-del"><h2>Country by country</h2><div class="sp-landrad">' + landliste.map(l => {
      const d = s.land[l.id];
      return '<article class="sp-land" id="land-' + l.id + '"><h3><span aria-hidden="true">' + l.flagg + "</span> " + esc(d.tittel) + "</h3>" +
        '<p class="sp-idrettsmerker">' + d.idretter.map(i => idrett(i)).filter(Boolean).map(i => '<a href="#sport-' + i.id + '" class="sp-landmerke"><span aria-hidden="true">' + i.ikon + "</span> " + esc(i.navn) + "</a>").join("") + "</p>" +
        d.tekst.map(p => "<p>" + fmt(p) + "</p>").join("") +
        "<h4>Big events</h4><ul>" + d.store.map(t => "<li>" + esc(t) + "</li>").join("") + "</ul>" +
        '<p class="sp-visste"><strong>Did you know?</strong> ' + fmt(d.visste) + "</p>" +
        '<p><a class="knapp liten" href="land.html?id=' + l.id + '#sport">More about ' + esc(l.navn.replace(/^The /, "the ")) + " →</a></p></article>";
    }).join("") + "</div></section>";

    // Ordpar
    h += '<section id="ord" class="sp-del"><h2>British or American?</h2><p class="sp-forklar">The British and the Americans often use different words about sport.</p>' +
      '<div class="gr-tabell-rull"><table class="sp-ordtabell"><thead><tr><th scope="col">🇬🇧 British English</th><th scope="col">🇺🇸 American English</th><th scope="col" lang="nb">Norsk</th></tr></thead><tbody>' +
      s.ordpar.map(([b, a, n]) => "<tr><td>" + esc(b) + "</td><td>" + esc(a) + '</td><td lang="nb">' + esc(n) + "</td></tr>").join("") + "</tbody></table></div>" +
      '<p class="sp-tips">💡 In British English, a team is often followed by a plural verb: «England <strong>are</strong> winning», «Arsenal <strong>have</strong> scored». In American English, it is usually singular: «The team <strong>is</strong> winning» – but «The Lakers <strong>are</strong> winning», because the name itself is plural.</p></section>';

    // Idiomer
    const betydninger = bland(s.idiomer.map(x => x.betydning));
    h += '<section id="idiomer" class="sp-del"><h2>Sports idioms</h2><p class="sp-forklar">Many everyday English expressions come from sport. Choose the right meaning for each idiom. <a href="idiomer.html">More idioms – from ships, wars and theatres – in the Idiom Detective →</a></p><ol class="sp-idiomer">' +
      s.idiomer.map((x, i) => '<li><label for="idiom-' + i + '"><strong>' + esc(x.uttrykk) + '</strong> <span class="sp-fra">(' + esc(x.sport) + ')</span></label><select id="idiom-' + i + '"><option value="">– choose –</option>' +
        betydninger.map(b => '<option value="' + esc(b) + '">' + esc(b) + "</option>").join("") + '</select><span class="sp-idiom-svar" id="idiom-svar-' + i + '" aria-live="polite"></span></li>').join("") +
      '</ol><p><button class="knapp hoved" id="sjekk-idiomer" type="button">Check my answers</button> <button class="knapp" id="vis-idiomer" type="button">Show answers</button> <span id="idiom-poeng" class="sp-poeng" aria-live="polite"></span></p></section>';

    // Quiz
    h += '<section id="quiz" class="sp-del land-quiz"><h2>❓ Quiz</h2><p class="sp-forklar">' + s.quiz.length + ' questions. Click the right answer.</p><div id="sp-quiz"></div><p class="sp-poeng" id="quiz-poeng" aria-live="polite"></p><p><button class="knapp" id="ny-quiz" type="button">↻ Start again</button></p></section>';

    // Oppgaver
    h += '<section id="oppgaver" class="sp-del oppgaver"><h2>✏️ Tasks</h2><ol class="lr-oppg">' + s.oppgaver.map((o, i) => "<li><p>" + fmt(o) + "</p>" + svarfelt("o" + i, (i + 1) + ". " + o) + "</li>").join("") + "</ol></section>";

    // Koblinger
    const temaer = s.temaer.map(id => LV.temaer.find(t => t.id === id)).filter(Boolean);
    if (temaer.length) h += '<section><h2>Read more</h2><ul class="temaliste">' + temaer.map(t => '<li><a class="temakort fag-' + t.fag + '" href="tema.html?id=' + encodeURIComponent(t.id) + '">' + LV.merker(t) + "<h3>" + esc(t.tittel) + "</h3><p>" + esc(t.kort) + "</p></a></li>").join("") + "</ul></section>";
    h += '<section class="landstripe"><h3>Country pages</h3><ul>' + LV.landliste.map(l => '<li><a href="land.html?id=' + encodeURIComponent(l.id) + '"><span aria-hidden="true">' + l.flagg + "</span>" + esc(l.navn) + " →</a></li>").join("") + "</ul></section>";
    h += "<section><h2>Sources</h2><ul class=\"kilder\">" + s.kilder.map(k => '<li><a href="' + esc(k.url) + '" target="_blank" rel="noopener">' + esc(k.tittel) + "</a></li>").join("") + "</ul></section>";
    if (!laerer) h += '<p class="fo-hint" lang="nb">Lærer: legg til <code>?laerer=1</code> i adressen for å se opplysninger som bør kontrolleres.</p>';
    $("innhold").innerHTML = h;
    kobleIdiomer();
    startQuiz();
    $("ny-quiz").addEventListener("click", startQuiz);
    svarlinje();
  }

  function kobleIdiomer() {
    const s = S();
    const sjekk = vis => {
      let r = 0;
      s.idiomer.forEach((x, i) => {
        const sel = $("idiom-" + i), ut = $("idiom-svar-" + i);
        if (vis) sel.value = x.betydning;
        const ok = sel.value === x.betydning;
        if (ok) r++;
        sel.classList.toggle("riktig", ok); sel.classList.toggle("feil", !!sel.value && !ok);
        ut.textContent = !sel.value ? "" : ok ? "✓" : "✗";
      });
      $("idiom-poeng").textContent = vis ? "" : r + " of " + s.idiomer.length + " correct";
    };
    $("sjekk-idiomer").addEventListener("click", () => sjekk(false));
    $("vis-idiomer").addEventListener("click", () => sjekk(true));
  }

  let poeng = 0, besvart = 0, sporsmal = [];
  function startQuiz() {
    poeng = 0; besvart = 0;
    sporsmal = S().quiz.map(q => { const rekke = bland(q.valg.map((_, i) => i)); return { s: q.s, valg: rekke.map(i => q.valg[i]), riktig: rekke.indexOf(q.riktig), forklaring: q.forklaring }; });
    $("sp-quiz").innerHTML = '<ol class="sp-quizliste">' + sporsmal.map((q, qi) => '<li class="quiz-sporsmal"><p><strong>' + esc(q.s) + '</strong></p><div class="quiz-valg">' +
      q.valg.map((v, vi) => '<button class="knapp" type="button" data-q="' + qi + '" data-v="' + vi + '">' + esc(v) + "</button>").join("") + '</div><p class="quiz-forklaring" id="qf-' + qi + '" aria-live="polite"></p></li>').join("") + "</ol>";
    $("quiz-poeng").textContent = "";
    $("sp-quiz").querySelectorAll("[data-q]").forEach(b => b.addEventListener("click", () => {
      const qi = Number(b.dataset.q), vi = Number(b.dataset.v), q = sporsmal[qi];
      const knapper = $("sp-quiz").querySelectorAll('[data-q="' + qi + '"]');
      knapper.forEach(k => { k.disabled = true; const i = Number(k.dataset.v); if (i === q.riktig) k.classList.add("riktig"); else if (i === vi) k.classList.add("feil"); });
      besvart++; if (vi === q.riktig) poeng++;
      $("qf-" + qi).textContent = (vi === q.riktig ? "✓ Correct! " : "✗ Not quite. ") + q.forklaring;
      $("quiz-poeng").textContent = "Score: " + poeng + " of " + besvart + (besvart === sporsmal.length ? " – finished!" : "");
    }));
  }

  function svarlinje() {
    const linje = document.createElement("div");
    linje.className = "svarlinje";
    linje.innerHTML = '<div class="svarlinje-indre" lang="nb"><label class="skjult-visuelt" for="elevnavn">Navn</label><input id="elevnavn" type="text" placeholder="Navn" autocomplete="off">' +
      '<button class="knapp hoved" id="kopier">Kopier mine svar</button><button class="knapp fare" id="slett">Slett alle svar</button><span class="status" id="status" role="status" aria-live="polite"></span></div>';
    document.body.appendChild(linje);
    document.addEventListener("input", e => { if (e.target.matches("textarea.svar")) { endret = true; $("status").textContent = ""; } });
    $("kopier").addEventListener("click", () => {
      const fylt = svarListe.filter(x => $("svar-" + x.id).value.trim());
      if (!fylt.length) { $("status").textContent = "Du har ikke skrevet noen svar ennå."; return; }
      const n = $("elevnavn").value.trim();
      const tekst = (n ? "Navn: " + n + "\n" : "") + "Sports in the English-speaking world\nDato: " + new Date().toLocaleDateString("nb-NO") + "\n" +
        ($("quiz-poeng").textContent ? "Quiz: " + $("quiz-poeng").textContent + "\n" : "") + "\n" + fylt.map(x => x.sporsmal + "\nSvar: " + $("svar-" + x.id).value.trim() + "\n").join("\n");
      const ok = () => { endret = false; $("status").textContent = "Svarene er kopiert! Lim dem inn i et dokument."; };
      const reserve = () => { const x = document.createElement("textarea"); x.value = tekst; document.body.appendChild(x); x.select(); let lyktes = false; try { lyktes = document.execCommand("copy"); } catch (e) { lyktes = false; } x.remove(); if (lyktes) ok(); else window.prompt("Ctrl+C / Cmd+C", tekst); };
      if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(tekst).then(ok, reserve); else reserve();
    });
    $("slett").addEventListener("click", () => { if (!confirm("Vil du slette alle svarene?")) return; svarListe.forEach(x => { $("svar-" + x.id).value = ""; }); endret = false; $("status").textContent = "Svarene er slettet."; });
    window.addEventListener("beforeunload", e => { if (!endret) return; e.preventDefault(); e.returnValue = ""; });
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.documentElement.lang = "en";
    bygg();
    if (location.hash) { const m = document.querySelector(location.hash); if (m) m.scrollIntoView(); }
  });
})();
