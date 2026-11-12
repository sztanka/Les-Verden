/* =========================================================
   Les verden – Idiomdetektiven (idiomer.html)
   Engelske idiomer og historien bak dem: utforsk, quiz,
   finn idiomene i teksten og skriv selv. Ingenting lagres –
   svarene kan lastes ned (svarfil.js).
   Data: data/idiomer.js. ?k=<kategori> filtrerer utforsk-delen.
   ========================================================= */
(function () {
  const LV = window.LV;
  const $ = id => document.getElementById(id);
  const esc = s => LV.esc(String(s == null ? "" : s));
  const bland = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const slug = s => s.toLowerCase().replace(/[’']/g, "").replace(/[^a-z]+/g, "-").replace(/^-|-$/g, "");

  function kort(x) {
    const K = LV.idiomKategorier[x.k];
    const tema = x.tema && (LV.temaer || []).find(t => t.id === x.tema);
    return '<article class="id-kort" id="i-' + slug(x.i) + '" data-k="' + x.k + '" lang="en">' +
      '<p class="id-kat"><span aria-hidden="true">' + K[0] + "</span> " + esc(K[1]) + (x.sikker ? "" : ' <span class="id-usikker" title="Historians are not sure">⚠️ Popular story – not certain</span>') + "</p>" +
      "<h3>" + esc(x.i) + "</h3>" +
      '<p class="id-betyr"><strong>Meaning:</strong> ' + esc(x.m) + "</p>" +
      '<p class="id-nb" lang="nb"><strong>På norsk:</strong> ' + esc(x.nb) + "</p>" +
      '<details class="id-opphav"><summary>Where does it come from?</summary><p>' + esc(x.o) + "</p></details>" +
      '<p class="id-eks"><em>' + esc(x.e) + "</em></p>" +
      (tema ? '<p class="id-tema" lang="nb"><a href="tema.html?id=' + encodeURIComponent(tema.id) + '">📖 Les mer: ' + esc(tema.tittel) + " →</a></p>" : "") +
      "</article>";
  }

  function bygg() {
    const D = LV.idiomer, K = LV.idiomKategorier;
    document.title = "Idiomdetektiven – " + (LV.config ? LV.config.navn : "Les verden");
    const start = K[LV.param("k")] ? LV.param("k") : "";
    let h = '<nav class="brodsmuler" aria-label="Brødsmuler"><a href="index.html">Forside</a> › <a href="index.html?fag=engelsk">Engelsk</a> › Idiomdetektiven</nav>' +
      '<header class="sidehode"><p class="overlinje" lang="en">The Idiom Detective</p><h1>Idiomdetektiven</h1><p class="ingress">Hvorfor sier engelskmenn at det regner katter og hunder? Idiomer er uttrykk der ordene betyr noe annet enn de ser ut til. Mange har en historie bak seg – fra seilskuter, kriger, teatre og dampmaskiner. Bli kjent med ' + D.length + ' idiomer, test deg selv, og bli detektiv i teksten.</p></header>' +
      '<nav class="mu-hopp" aria-label="Snarveier"><a href="#utforsk">🔎 Utforsk</a><a href="#quiz">🎯 Quiz</a><a href="#detektiv">🕵️ Finn idiomene</a><a href="#skriv">✍️ Skriv selv</a></nav>' +
      // Utforsk
      '<section class="id-del" id="utforsk"><h2>🔎 Utforsk <span class="ls-en" lang="en">Explore</span></h2>' +
      '<p class="mu-intro">Velg en kategori eller søk. Trykk «Where does it come from?» for å lese historien bak. ⚠️ betyr at historien er populær, men at ingen vet sikkert om den er sann – akkurat som i kildekritikk!</p>' +
      '<div class="id-filter"><label for="id-sok">Søk</label><input id="id-sok" type="search" placeholder="f.eks. ship, boat, secret" autocomplete="off">' +
      '<div class="id-kategorier" role="group" aria-label="Kategori"><button type="button" class="knapp" data-k="" aria-pressed="' + (!start) + '">Alle</button>' +
      Object.keys(K).map(k => '<button type="button" class="knapp" data-k="' + k + '" aria-pressed="' + (start === k) + '"><span aria-hidden="true">' + K[k][0] + "</span> " + esc(K[k][1]) + "</button>").join("") + "</div></div>" +
      '<p class="id-antall" id="id-antall" role="status"></p><div class="id-rutenett" id="id-rutenett">' + D.map(kort).join("") + "</div></section>" +
      // Quiz
      '<section class="id-del" id="quiz"><h2>🎯 Quiz</h2><p class="mu-intro">Hva betyr idiomet? Ti tilfeldige idiomer hver runde.</p>' +
      '<div class="id-quizvalg" role="group" aria-label="Type quiz"><button type="button" class="knapp" data-q="m" aria-pressed="true">Meaning</button><button type="button" class="knapp" data-q="nb" aria-pressed="false">Norsk uttrykk</button><button type="button" class="knapp" data-q="k" aria-pressed="false">Where from?</button></div>' +
      '<ol class="lr-quiz-liste id-quiz" id="id-quiz"></ol><p class="le-poeng" id="id-poeng" aria-live="polite"></p><p><button type="button" class="knapp" id="id-ny">🔀 Ny runde</button></p></section>' +
      // Detektiv
      '<section class="id-del" id="detektiv"><h2>🕵️ Finn idiomene <span class="ls-en" lang="en">Spot the idioms</span></h2>' +
      '<p class="mu-intro">Trykk på ordene du tror er en del av et idiom. Trykk «Sjekk» når du er ferdig. Du trenger bare å treffe ett ord i hvert idiom.</p>' +
      '<div class="id-tekstvalg" role="group" aria-label="Velg tekst">' + LV.idiomTekster.map((t, i) => '<button type="button" class="knapp" data-t="' + i + '" aria-pressed="' + (!i) + '">' + esc(t.tittel) + "</button>").join("") + "</div>" +
      '<div class="id-tekst" id="id-tekst" lang="en"></div><p class="mu-kontroll"><button type="button" class="knapp hoved" id="id-sjekk">Sjekk</button> <button type="button" class="knapp" id="id-nullstill">Start på nytt</button></p><div id="id-resultat" aria-live="polite"></div></section>' +
      // Skriv
      '<section class="id-del" id="skriv"><h2>✍️ Skriv selv <span class="ls-en" lang="en">Your turn</span></h2>' +
      '<p class="mu-intro">Trekk tre idiomer og skriv en kort historie (80–150 ord) på engelsk der alle tre er med. Les for en makker – klarer hen å finne idiomene?</p>' +
      '<p><button type="button" class="knapp" id="id-trekk">🎲 Trekk tre idiomer</button></p><ul class="id-trukket" id="id-trukket" lang="en"></ul>' +
      '<label class="mu-notat" for="id-historie"><span>My story</span></label><textarea id="id-historie" rows="8" lang="en"></textarea><p class="id-ordtall" id="id-ordtall" aria-live="polite">0 ord</p>' +
      '<label class="mu-notat" for="id-norsk"><span>Velg ett idiom. Finnes det et norsk uttrykk som betyr det samme? Hvorfor tror du språkene har like (eller ulike) bilder?</span></label><textarea id="id-norsk" rows="3"></textarea></section>' +
      '<p class="fo-merk">Se også: <a href="laere-engelsk.html#ove">False friends-quiz</a> · <a href="sport.html#idiomer">Sports idioms</a> · <a href="ordreise.html">Ordenes reise</a> · <a href="tema.html?id=en8-norwegian-and-english">Norwegian and English</a> · <a href="grammatikk.html">Grammatikk</a></p>';
    $("innhold").innerHTML = h;

    // Utforsk
    let kat = start;
    const filtrer = () => {
      const q = $("id-sok").value.trim().toLowerCase(); let n = 0;
      document.querySelectorAll(".id-kort").forEach(el => { const vis = (!kat || el.dataset.k === kat) && (!q || el.textContent.toLowerCase().includes(q)); el.hidden = !vis; if (vis) n++; });
      $("id-antall").textContent = n + " av " + D.length + " idiomer";
    };
    document.querySelectorAll(".id-kategorier button").forEach(b => b.addEventListener("click", () => {
      kat = b.dataset.k; document.querySelectorAll(".id-kategorier button").forEach(x => x.setAttribute("aria-pressed", x === b)); filtrer();
    }));
    $("id-sok").addEventListener("input", filtrer);
    filtrer();

    // Quiz
    let qtype = "m", q = [], poeng = 0, svart = 0;
    const nyQuiz = () => {
      const kats = Object.keys(K);
      q = bland(D).slice(0, 10).map(x => {
        let riktig, feil;
        if (qtype === "k") { riktig = K[x.k][1]; feil = bland(kats.filter(k => k !== x.k && k !== "ukjent")).slice(0, 2).map(k => K[k][1]); }
        else { riktig = x[qtype]; feil = bland(D.filter(y => y !== x)).slice(0, 2).map(y => y[qtype]); }
        return { x: x, riktig: riktig, valg: bland([riktig].concat(feil)) };
      });
      poeng = 0; svart = 0; $("id-poeng").textContent = "";
      $("id-quiz").innerHTML = q.map((o, i) => '<li class="lr-qs"><fieldset><legend lang="en"><strong>' + esc(o.x.i) + "</strong></legend>" +
        o.valg.map((v, j) => '<label class="id-svar"><input type="radio" name="idq' + i + '" value="' + j + '"> <span' + (qtype === "nb" ? ' lang="nb"' : ' lang="en"') + ">" + esc(v) + "</span></label>").join("") +
        '<p class="id-fasit" hidden lang="en"></p></fieldset></li>').join("");
      $("id-quiz").querySelectorAll("input").forEach(r => r.addEventListener("change", () => {
        const i = +r.name.slice(3), o = q[i], fs = r.closest("fieldset");
        fs.querySelectorAll("input").forEach(x => x.disabled = true);
        const ok = o.valg[+r.value] === o.riktig; svart++; if (ok) poeng++;
        const f = fs.querySelector(".id-fasit"); f.hidden = false;
        f.innerHTML = (ok ? "✅ Riktig! " : "❌ Riktig svar: <strong>" + esc(o.riktig) + "</strong>. ") + esc(qtype === "k" ? o.x.o : o.x.e);
        fs.parentNode.classList.add(ok ? "rett" : "feil");
        $("id-poeng").textContent = poeng + " av " + svart + " riktige" + (svart === q.length ? (poeng >= 8 ? " – idiomdetektiv! 🕵️" : " – prøv en ny runde!") : "");
      }));
    };
    document.querySelectorAll(".id-quizvalg button").forEach(b => b.addEventListener("click", () => {
      qtype = b.dataset.q; document.querySelectorAll(".id-quizvalg button").forEach(x => x.setAttribute("aria-pressed", x === b)); nyQuiz();
    }));
    $("id-ny").addEventListener("click", nyQuiz);
    nyQuiz();

    // Detektiv
    let tekst = 0;
    const visTekst = () => {
      const t = LV.idiomTekster[tekst];
      // Merk hvilke ord som tilhører hvilket idiom
      const deler = []; let rest = t.tekst;
      const treff = t.idiomer.map(([id], n) => ({ n: n, pos: t.tekst.indexOf(id), len: id.length })).filter(x => x.pos >= 0).sort((a, b) => a.pos - b.pos);
      let p = 0;
      treff.forEach(x => { if (x.pos > p) deler.push([t.tekst.slice(p, x.pos), -1]); deler.push([t.tekst.slice(x.pos, x.pos + x.len), x.n]); p = x.pos + x.len; });
      deler.push([t.tekst.slice(p), -1]);
      rest = deler.map(([s, n]) => s.split(/(\s+)/).map(w => /^\s+$/.test(w) || !w ? w : '<button type="button" class="id-ord" data-n="' + n + '" aria-pressed="false">' + esc(w) + "</button>").join("")).join("");
      $("id-tekst").innerHTML = "<h3>" + esc(t.tittel) + "</h3><p>" + rest + "</p>";
      $("id-resultat").innerHTML = "";
      $("id-tekst").querySelectorAll(".id-ord").forEach(b => b.addEventListener("click", () => { if (!$("id-tekst").classList.contains("sjekket")) b.setAttribute("aria-pressed", b.getAttribute("aria-pressed") !== "true"); }));
      $("id-tekst").classList.remove("sjekket");
    };
    document.querySelectorAll(".id-tekstvalg button").forEach(b => b.addEventListener("click", () => {
      tekst = +b.dataset.t; document.querySelectorAll(".id-tekstvalg button").forEach(x => x.setAttribute("aria-pressed", x === b)); visTekst();
    }));
    $("id-nullstill").addEventListener("click", visTekst);
    $("id-sjekk").addEventListener("click", () => {
      const t = LV.idiomTekster[tekst], ord = [...$("id-tekst").querySelectorAll(".id-ord")];
      $("id-tekst").classList.add("sjekket");
      const funnet = new Set(); let bom = 0;
      ord.forEach(b => {
        const n = +b.dataset.n, valgt = b.getAttribute("aria-pressed") === "true";
        if (n >= 0) b.classList.add("id-idiom");
        if (valgt && n >= 0) funnet.add(n); else if (valgt) { bom++; b.classList.add("id-bom"); }
      });
      const finn = navn => D.find(x => x.i === navn);
      $("id-resultat").innerHTML = '<p class="id-poengsum"><strong>Du fant ' + funnet.size + " av " + t.idiomer.length + " idiomer.</strong>" + (bom ? " " + bom + " ord var ikke en del av et idiom." : "") + "</p>" +
        '<ul class="id-liste" lang="en">' + t.idiomer.map(([s, navn], n) => { const x = finn(navn); return "<li>" + (funnet.has(n) ? "✅ " : "🔍 ") + "<strong>" + esc(s) + "</strong>" + (x ? " – " + esc(x.m) + ' <a href="#i-' + slug(x.i) + '" lang="nb">(se kortet)</a>' : "") + "</li>"; }).join("") + "</ul>";
    });
    visTekst();

    // Skriv
    $("id-trekk").addEventListener("click", () => { $("id-trukket").innerHTML = bland(D).slice(0, 3).map(x => "<li><strong>" + esc(x.i) + "</strong> – " + esc(x.m) + "</li>").join(""); });
    $("id-historie").addEventListener("input", () => { const n = $("id-historie").value.trim().split(/\s+/).filter(Boolean).length; $("id-ordtall").textContent = n + " ord" + (n >= 80 && n <= 150 ? " ✅" : ""); });

    const linje = document.createElement("div");
    linje.className = "svarlinje";
    linje.innerHTML = '<div class="svarlinje-indre"><label class="skjult-visuelt" for="elevnavn">Navn</label><input id="elevnavn" type="text" placeholder="Navn" autocomplete="off"><span class="status" role="status" aria-live="polite"></span></div>';
    document.body.appendChild(linje);
    if (location.hash) { const m = document.querySelector(location.hash); if (m) { if (m.hidden) { kat = ""; filtrer(); } m.scrollIntoView(); const d = m.querySelector("details"); if (d) d.open = true; } }
  }
  document.addEventListener("DOMContentLoaded", bygg);
})();
