/* =========================================================
   Les verden – felles kode for alle sider
   Lager toppmeny, lesestøtte og bunntekst, og har små hjelpefunksjoner.
   Ingenting lagres: ingen localStorage, ingen cookies, ingen sporing.
   ========================================================= */

window.LV = window.LV || {};

(function () {
  const LV = window.LV;

  // ---------- Hjelpefunksjoner ----------
  LV.esc = function (s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  };

  LV.param = function (navn) {
    return new URLSearchParams(location.search).get(navn);
  };

  LV.fagNavn = { samfunnsfag: "Samfunnsfag", engelsk: "Engelsk" };

  // Delene av samfunnsfag. Feltet «emne» i oversikt.js bruker disse nøklene.
  LV.emner = {
    historie: { navn: "Historie", ikon: "🏛️", tekst: "Hvordan fortiden har formet verden vi lever i – kriger, revolusjoner og vanlige menneskers liv." },
    geografi: { navn: "Geografi", ikon: "🗺️", tekst: "Klima, ressurser og samarbeid på tvers av grenser – hvordan mennesker og natur påvirker hverandre." },
    samfunnskunnskap: { navn: "Samfunnskunnskap", ikon: "⚖️", tekst: "Demokrati, makt, konflikter og hvordan vi lever sammen i samfunnet i dag." }
  };

  // Merkelapper (fag · del · trinn) brukt på temakort og temasider.
  LV.merker = function (t) {
    const e = t.emne && LV.emner[t.emne];
    return '<span class="merker"><span class="merke">' + LV.fagNavn[t.fag] + "</span>" +
      (e ? '<span class="merke merke-emne">' + e.navn + "</span>" : "") +
      '<span class="merke">' + t.trinn + ". trinn</span></span>";
  };

  // Laster en datafil (vanlig <script>), slik at siden også virker når
  // den åpnes direkte fra disken uten nettserver.
  // Personkort (brukes på temasider og personsiden)
  LV.initialer = function (navn) {
    const deler = String(navn).replace(/\b(Jr|Dr|Queen|King)\.?/g, "").split(/[\s.]+/).filter(d => d && /[A-ZÆØÅ]/.test(d[0]));
    if (!deler.length) return "?";
    if (deler.length === 1) return deler[0].slice(0, 2);
    return deler[0][0] + deler[deler.length - 1][0];
  };
  LV.personkort = function (p, ekstra) {
    return '<article class="personkort">' +
      '<span class="initialer" aria-hidden="true">' + LV.esc(LV.initialer(p.navn)) + "</span>" +
      '<div class="person-tekst"><h3>' + LV.esc(p.navn) + "</h3>" +
      '<p class="levde">' + LV.esc(p.levde || "") + (p.rolle ? " · " + LV.esc(p.rolle) : "") + "</p>" +
      "<p>" + LV.esc(p.tekst || "") + "</p>" + (ekstra || "") + "</div></article>";
  };

  // Merkelapp på «Stopp og tenk»-bokser: hvilken lesestrategi trener spørsmålet?
  // Første treff vinner. Lenken går til strategien på lesestrategier.html.
  const STOPP_MERKER = [
    ["forutsi", "Forutsi", "Predicting", /\b(predict|guess|will happen|happen next|what will|what do you think .{0,30}\bwill\b|hva tror du (skjer|vil skje|kommer til å)|skje[r]? videre|gjett|theory|solve the mystery|teori|løse mysteriet)/i],
    ["visualisere", "Se for deg", "Visualising", /\b(imagine|picture|what do you see|what does .{0,40} look like|se for deg|forestill deg)/i],
    ["ord", "Ukjente ord", "New words", /\b(what does the (word|phrase|expression)|meaning of the|hva betyr (ordet|uttrykket))/i],
    ["lete", "Letelese", "Scanning", /(^\s*(find|look for|finn|let etter)\b|search for|søk etter)/i],
    ["sammendrag", "Oppsummere", "Summarising", /\b(summari[sz]e|in your own words|sum up|in one sentence|oppsummer|med egne ord|med én setning)/i],
    ["vurdere", "Vurdere", "Evaluating", /\b(do you agree|convince you|is it (a good|good|enough|right)|good thing or|should\b|bør\b|burde|synes du|hva tenker du|begrunn|ansvar|overbevisende|hva betyr mest|hvor går grensen|feig|er du enig|is it fair|(was|is) (it|that|this) (right|fair|wrong)|var det (riktig|rettferdig)|good or bad|bra eller dårlig|what do you think about|hva mener du)/i],
    ["koble", "Koble", "Connecting", /\b(similarit|compare .{0,40}(with|to) (your|today|norway)|likheter|sammenlign|think of a|tenk på en|have you ever|your own|in your life|would you|if you were|can you think of|do you (belong|know|feel|use)|have you learned|you know|your (school|family|friends|country|class)|remind|norw|today\b|nowadays|i norge|nordmenn|i dag\b|ditt eget|hva ville du|om du var|hvis du var|kjenner du|kan du komme på|har du (noen gang|opplevd)|what could you|tenk deg|ville du|hos deg|påvirker deg|engasjert deg)/i],
    ["mellom", "Lese mellom linjene", "Inferring", /\b(why|how do you know|what does (this|that|it) (tell|show|say|suggest)|what kind of|how does .{0,40} feel|clue|hvorfor|hva (forteller|viser|sier) (det|dette)|\bmean\b|really be|do you think|how do|how does|how is|how did|tror du|hvordan|hva gikk galt|til felles)/i]
  ];
  LV.stoppMerke = function (tekst, engelsk) {
    const t = String(tekst || "");
    const m = STOPP_MERKER.find(x => x[3].test(t)) || ["stopp", "Sjekk forståelsen", "Check understanding"];
    return '<a class="stopp-strategi" href="lesestrategier.html#' + m[0] + '" title="Lesestrategi – les mer om strategien">' + (engelsk ? '<span lang="en">' + m[2] + "</span>" : m[1]) + "</a>";
  };

  // Kompetansemål (data/kompetansemal.js må være lastet). nokkel = tema-id, «side:…» eller en liste med mål-id-er.
  LV.kmFinn = function (id) {
    const K = LV.kompetansemal; if (!K) return null;
    for (const fag of ["samfunnsfag", "engelsk"]) { const m = K[fag].mal.find(x => x.id === id); if (m) return Object.assign({ fag: fag, plan: K[fag] }, m); }
    return null;
  };
  LV.kmBoks = function (nokkel, tittel) {
    const K = LV.kompetansemal; if (!K) return "";
    const ids = Array.isArray(nokkel) ? nokkel : (K.kobling[nokkel] || []);
    const mal = ids.map(LV.kmFinn).filter(Boolean);
    if (!mal.length) return "";
    const planer = [...new Set(mal.map(m => m.plan))];
    return '<details class="km-boks" lang="nb"><summary>🎯 ' + LV.esc(tittel || "Kompetansemål") + " (" + mal.length + ")</summary>" +
      '<p class="km-intro">Forslag til kompetansemål etter 10. trinn som dette arbeider særlig med:</p><ul class="km-liste">' +
      mal.map(m => '<li><span class="km-kort">' + LV.esc(m.kort) + '</span> Eleven skal kunne ' + LV.esc(m.tekst) + ".</li>").join("") + "</ul>" +
      '<p class="km-kilde">Kilde: ' + planer.map(p => '<a href="' + p.url + '" target="_blank" rel="noopener">Læreplan i ' + p.navn.toLowerCase() + " (" + p.kode + ")</a>").join(", ") + ', gjelder fra 1.8.2026. <a href="planlegger.html">Se alle målene i planleggeren →</a></p></details>';
  };

  // Engelske aksenter for opplesing. Gir bare de variantene nettleseren har stemmer til.
  LV.AKSENTER = [["en-GB", "British English"], ["en-US", "American English"], ["en-AU", "Australian English"], ["en-IN", "Indian English"], ["en-IE", "Irish English"], ["en-ZA", "South African English"], ["en-NZ", "New Zealand English"], ["en-CA", "Canadian English"], ["en-SG", "Singapore English"]];
  LV.aksentStemme = function (kode) {
    if (!("speechSynthesis" in window)) return null;
    const alle = speechSynthesis.getVoices(), k = String(kode || "en-GB").toLowerCase().replace("_", "-");
    return alle.find(v => v.lang && v.lang.toLowerCase().replace("_", "-") === k) || null;
  };
  LV.tilgjengeligeAksenter = function () {
    return LV.AKSENTER.filter(([k]) => LV.aksentStemme(k));
  };
  // Leser engelsk tekst med valgt aksent (faller tilbake til en engelsk stemme)
  LV.lesEngelsk = function (tekst, kode, fart, ferdig) {
    if (!("speechSynthesis" in window)) return false;
    const u = new SpeechSynthesisUtterance(tekst);
    u.lang = kode || "en-GB"; u.rate = fart || 0.9;
    const v = LV.aksentStemme(u.lang) || speechSynthesis.getVoices().find(x => /^en/i.test(x.lang));
    if (v) u.voice = v;
    if (ferdig) { u.onend = ferdig; u.onerror = ferdig; }
    speechSynthesis.speak(u);
    return true;
  };

  // Versjonsnummer for datafilene. Endres ved hver oppdatering, slik at
  // nettleseren henter nye filer i stedet for gamle kopier.
  LV.versjon = "20261105e";

  LV.lastSkript = function (src) {
    return new Promise(function (ok, feil) {
      const s = document.createElement("script");
      s.src = src + (src.indexOf("?") < 0 ? "?v=" : "&v=") + LV.versjon;
      s.onload = ok;
      s.onerror = function () { feil(new Error("Fant ikke " + src)); };
      document.head.appendChild(s);
    });
  };

  // ---------- Toppmeny ----------
  function lagTopp() {
    const k = LV.config || { navn: "Les verden" };
    const side = document.body.dataset.side || "";
    const fag = LV.param("fag");
    const engelskSider = ["lesing", "sport", "grammatikk", "land", "uttale", "laere"];
    const verktoySider = ["tidslinje", "begreper", "personer", "ordbok", "lesestrategier", "muntlig", "lesedagbok", "skriving", "sok"];
    const aktiv = function (navn) {
      if (navn === "samfunnsfag" || navn === "engelsk") return (side === "forside" && fag === navn) || (side === "tema" && document.body.dataset.fag === navn) || (navn === "engelsk" && engelskSider.includes(side));
      if (navn === "verktoy") return verktoySider.includes(side);
      if (navn === "spill") return side === "spill" || side === "kartspill" || side === "mysterium";
      if (navn === "laerer") return side === "laerer" || (side === "planlegger" && LV.param("elev") !== "1");
      return side === navn;
    };
    const lenke = function (href, tekst, navn) {
      return '<a href="' + href + '"' + (aktiv(navn) ? ' aria-current="page"' : "") + ">" + tekst + "</a>";
    };
    // Menyer med undersider. [lenke, ikon, tittel, kort tekst, språk]
    const MENYER = {
      samfunnsfag: { navn: "Samfunnsfag", lenker: [
        ["index.html?fag=samfunnsfag#temaer", "📚", "Alle temaer", "Historie, geografi og samfunnskunnskap"],
        ["index.html?fag=samfunnsfag&trinn=8#temaer", "8️⃣", "8. trinn", "Revolusjoner, 1814 og Norge i dag"],
        ["index.html?fag=samfunnsfag&trinn=9#temaer", "9️⃣", "9. trinn", "Verden i endring 1800–1918"],
        ["index.html?fag=samfunnsfag&trinn=10#temaer", "🔟", "10. trinn", "Krig, fred og verden i dag"],
        ["tidslinje.html?fag=samfunnsfag", "📅", "Tidslinje", "Alle hendelsene i rekkefølge"],
        ["personer.html?fag=samfunnsfag", "👤", "Personer", "Og quizen «Hvem er jeg?»"],
        ["film.html?fag=samfunnsfag", "🎬", "Film", "Filmer med oppgaver"],
        ["kartspill.html", "🗺️", "Kartspill", "Land, byer og steder"],
        ["mysterium.html", "🕵️", "Kalde spor i historien", "Logikkgåter fra historien"],
        ["skriving.html#nb", "✍️", "Skriveguider", "Fagtekst, drøfting, presentasjon"]
      ] },
      engelsk: { navn: "Engelsk", lenker: [
        ["index.html?fag=engelsk#temaer", "📚", "Alle temaer", "Topics for 8th–10th grade", "en"],
        ["lesing.html", "📖", "Reading Room", "Stories, speeches and non-fiction", "en"],
        ["grammatikk.html", "🧩", "Grammar and vocabulary", "Parts of speech and more", "en"],
        ["uttale.html", "👄", "Pronunciation", "Sounds, stress and accents", "en"],
        ["laere-engelsk.html", "🧭", "How to learn English", "Learning strategies", "en"],
        ["skriving.html", "✍️", "How to write", "Essays, short stories, presentations", "en"],
        ["land.html", "🌍", "Landsider", "The English-speaking world"],
        ["sport.html", "🏆", "Sport", "Sports in the English-speaking world", "en"],
        ["film.html?fag=engelsk", "🎬", "Film", "Films and series with tasks"],
        ["mysterium.html#cold-case", "🔎", "Cold Case Mysteries", "Logic puzzles in English", "en"],
        ["ordbok.html", "📘", "Ordbok", "Norsk–engelsk og synonymer"]
      ] },
      verktoy: { navn: "Lese og skrive", lenker: [
        ["lesestrategier.html", "🧠", "Lesestrategier", "Slik leser du smartere"],
        ["muntlig.html", "🗣️", "Muntlig og lytting", "Samtalekort og lytteøvelser"],
        ["lesedagbok.html", "📔", "Lesedagbok", "For bøker du velger selv"],
        ["laere-engelsk.html", "🧭", "How to learn English", "Strategier for språklæring", "en"],
        ["uttale.html", "👄", "Pronunciation", "Uttale for nordmenn", "en"],
        ["skriving.html", "✍️", "Skriveverksted", "Skriveguider og skriverammer"],
        ["ordbok.html", "📘", "Ordbok", "Slå opp ord"],
        ["begreper.html", "🔤", "Begrepsbank", "Alle begrepene fra temaene"],
        ["tidslinje.html", "📅", "Tidslinje", "Alle hendelsene"],
        ["personer.html", "👤", "Personer", "Alle personene"],
        ["sok.html", "🔍", "Søk", "Søk i hele nettstedet"]
      ] }
    };
    const menyKnapp = id => '<button type="button" class="meny-knapp" id="meny-' + id + '" aria-expanded="false" aria-controls="panel-' + id + '"' + (aktiv(id) ? ' aria-current="page"' : "") + ">" + MENYER[id].navn + ' <span class="meny-pil" aria-hidden="true">▾</span></button>';
    const menyPanel = id => '<div class="meny-panel" id="panel-' + id + '" hidden><ul>' + MENYER[id].lenker.map(([h, ikon, t, kort, sp]) =>
      '<li><a href="' + h + '"' + (sp ? ' lang="' + sp + '"' : "") + '><span class="mp-ikon" aria-hidden="true">' + ikon + '</span><span><strong>' + LV.esc(t) + "</strong><small>" + LV.esc(kort) + "</small></span></a></li>").join("") + "</ul></div>";

    const topp = document.createElement("header");
    topp.className = "topp";
    topp.innerHTML =
      '<a class="hopp-til-innhold" href="#innhold">Hopp til innholdet</a>' +
      '<div class="topp-indre">' +
        '<a class="logo" href="index.html"><span class="logo-merke" aria-hidden="true">' + LV.esc(k.forkortelse || "LV") + "</span>" + LV.esc(k.navn) + "</a>" +
        '<nav class="hovedmeny" aria-label="Hovedmeny">' +
          menyKnapp("samfunnsfag") + menyKnapp("engelsk") + menyKnapp("verktoy") +
          lenke("spill.html", "Spill", "spill") +
          lenke("eksamen.html", "Eksamen", "eksamen") +
          lenke("laerer.html", "For lærere", "laerer") +
        "</nav>" +
        (side === "sok" ? "" : '<form class="topp-sok" action="sok.html" role="search"><label class="skjult-visuelt" for="topp-sok-felt">Søk på Les verden</label><input id="topp-sok-felt" name="q" type="search" placeholder="Søk …" autocomplete="off"><button type="submit" class="topp-sok-knapp" aria-label="Søk">🔍</button></form>') +
        '<button class="knapp" id="lesestotte-knapp" aria-expanded="false" aria-controls="lesestotte" title="Lesestøtte: skrift, størrelse, farger og opplesing">' +
          '<span aria-hidden="true">Aa</span> <span class="ls-knapp-tekst">Lesestøtte</span></button>' +
      "</div>" +
      '<div class="meny-paneler">' + menyPanel("samfunnsfag") + menyPanel("engelsk") + menyPanel("verktoy") + "</div>" +
      '<div class="lesestotte" id="lesestotte" hidden>' +
        '<span class="etikett">Tekststørrelse:</span>' +
        '<button class="knapp" data-skala="-1" aria-label="Mindre tekst">A−</button>' +
        '<button class="knapp" data-skala="0" aria-label="Vanlig tekststørrelse">A</button>' +
        '<button class="knapp" data-skala="1" aria-label="Større tekst">A+</button>' +
        '<button class="knapp" id="skrift-knapp" aria-pressed="false">Lesevennlig skrift</button>' +
        '<button class="knapp" id="tema-knapp" aria-pressed="false">Mørk modus</button>' +
      "</div>";
    document.body.prepend(topp);

    // Nedtrekksmenyer: én åpen om gangen, lukkes med Escape eller klikk utenfor
    const knapper = Array.from(topp.querySelectorAll(".meny-knapp"));
    const lukkMenyer = unntak => knapper.forEach(kn => { if (kn === unntak) return; kn.setAttribute("aria-expanded", "false"); document.getElementById(kn.getAttribute("aria-controls")).hidden = true; });
    knapper.forEach(kn => kn.addEventListener("click", e => {
      e.stopPropagation();
      const apen = kn.getAttribute("aria-expanded") !== "true";
      lukkMenyer(kn);
      kn.setAttribute("aria-expanded", String(apen));
      document.getElementById(kn.getAttribute("aria-controls")).hidden = !apen;
    }));
    document.addEventListener("click", e => { if (!e.target.closest(".meny-panel")) lukkMenyer(); });
    document.addEventListener("keydown", e => { if (e.key === "Escape") { const apen = knapper.find(kn => kn.getAttribute("aria-expanded") === "true"); lukkMenyer(); if (apen) apen.focus(); } });

    // På mobil kan menyen rulles sidelengs: sørg for at aktiv side er synlig
    const meny = topp.querySelector(".hovedmeny");
    const aktivLenke = meny.querySelector('[aria-current="page"]');
    if (aktivLenke && meny.scrollWidth > meny.clientWidth) {
      meny.scrollLeft = aktivLenke.offsetLeft - (meny.clientWidth - aktivLenke.offsetWidth) / 2;
    }

    // Lesestøtte (gjelder bare så lenge siden er åpen – ingenting lagres)
    const panel = topp.querySelector("#lesestotte");
    const panelKnapp = topp.querySelector("#lesestotte-knapp");
    panelKnapp.addEventListener("click", function () {
      const apen = panel.hidden;
      panel.hidden = !apen;
      panelKnapp.setAttribute("aria-expanded", String(apen));
    });

    const skalaer = [0.9, 1, 1.15, 1.3, 1.45];
    let skalaIndeks = 1;
    panel.querySelectorAll("[data-skala]").forEach(function (b) {
      b.addEventListener("click", function () {
        const v = Number(b.dataset.skala);
        skalaIndeks = v === 0 ? 1 : Math.min(skalaer.length - 1, Math.max(0, skalaIndeks + v));
        document.documentElement.style.setProperty("--skala", skalaer[skalaIndeks]);
      });
    });

    const skrift = panel.querySelector("#skrift-knapp");
    skrift.addEventListener("click", function () {
      const pa = skrift.getAttribute("aria-pressed") !== "true";
      skrift.setAttribute("aria-pressed", String(pa));
      if (pa) document.documentElement.dataset.skrift = "lesevennlig";
      else delete document.documentElement.dataset.skrift;
    });

    const tema = panel.querySelector("#tema-knapp");
    tema.addEventListener("click", function () {
      const pa = tema.getAttribute("aria-pressed") !== "true";
      tema.setAttribute("aria-pressed", String(pa));
      if (pa) document.documentElement.dataset.tema = "mork";
      else delete document.documentElement.dataset.tema;
    });
  }

  function lagFot() {
    const k = LV.config || {};
    const fot = document.createElement("footer");
    fot.className = "fot";
    fot.innerHTML =
      "<p><strong>" + LV.esc(k.navn || "Les verden") + "</strong> – " + LV.esc(k.undertittel || "") + "</p>" +
      "<p>Siden lagrer ingenting om deg. Svarene dine finnes bare så lenge fanen er åpen. " +
      "Bruk «Kopier mine svar» for å ta vare på dem.</p>";
    document.body.appendChild(fot);
  }

  document.addEventListener("DOMContentLoaded", function () {
    if (LV.config && LV.config.navn) {
      document.title = document.title.replace("Les verden", LV.config.navn);
    }
    lagTopp();
    lagFot();
  });
})();
