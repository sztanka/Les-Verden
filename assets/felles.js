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

  // Begreper på morsmål (data/morsmal.js må være lastet på siden)
  LV.morsmalHtml = function (term) {
    const m = LV.morsmal; if (!m) return "";
    const t = m.ord[String(term).toLowerCase().trim()]; if (!t) return "";
    return '<span class="mm-boks">' + m.sprak.map((s, i) => '<span class="mm mm-' + s.kode + '" lang="' + s.kode + '"' + (s.rtl ? ' dir="rtl"' : "") + ">" + LV.esc(t[i]) + "</span>").join("") + "</span>";
  };

  // Engelske aksenter for opplesing. Gir bare de variantene nettleseren har stemmer til.
  LV.AKSENTER = [["en-GB", "British English"], ["en-US", "American English"], ["en-AU", "Australian English"], ["en-IN", "Indian English"], ["en-IE", "Irish English"], ["en-ZA", "South African English"], ["en-NZ", "New Zealand English"], ["en-CA", "Canadian English"], ["en-SG", "Singapore English"], ["en-JM", "Jamaican English"], ["en-NG", "Nigerian English"]];
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
  LV.versjon = "20261112g";

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
    const fil = (location.pathname.split("/").pop() || "index.html").replace(/\.html$/, "") || "index";
    // Hvilken meny «eier» siden? Den første menyen som har en lenke til siden.
    let eier = null;
    const aktiv = function (navn) {
      if (navn === "samfunnsfag" || navn === "engelsk") { if ((side === "forside" && fag === navn) || (side === "tema" && document.body.dataset.fag === navn)) return true; }
      if (navn === "laerer" && side === "planlegger" && LV.param("elev") === "1") return false;
      if (eier === null) {
        eier = (fil === "eksamen" || fil === "skriftlig") ? "eksamen" : "";
        if (!eier && fil !== "index" && fil !== "tema") for (const m of ["samfunnsfag", "engelsk", "verktoy", "spill", "laerer"]) {
          if (MENYER[m].grupper.some(g => g[1].some(l => l[0].split(/[?#]/)[0].replace(/\.html$/, "") === fil))) { eier = m; break; }
        }
      }
      if (MENYER[navn]) return eier === navn;
      return side === navn;
    };
    const lenke = function (href, tekst, navn) {
      return '<a href="' + href + '"' + (aktiv(navn) ? ' aria-current="page"' : "") + ">" + tekst + "</a>";
    };
    // Menyer med undersider, delt i grupper. Lenke: [adresse, ikon, tittel, kort tekst, språk]
    const MENYER = {
      samfunnsfag: { navn: "Samfunnsfag", grupper: [
        ["Temaer", [
          ["index.html?fag=samfunnsfag#temaer", "📚", "Alle temaer", "Historie, geografi og samfunnskunnskap"],
          ["index.html?fag=samfunnsfag&trinn=8#temaer", "8️⃣", "8. trinn", "Revolusjoner, 1814 og Norge i dag"],
          ["index.html?fag=samfunnsfag&trinn=9#temaer", "9️⃣", "9. trinn", "Verden i endring 1800–1918"],
          ["index.html?fag=samfunnsfag&trinn=10#temaer", "🔟", "10. trinn", "Krig, fred og verden i dag"]]],
        ["Utforsk", [
          ["tidslinje.html?fag=samfunnsfag", "📅", "Tidslinje", "Alle hendelsene i rekkefølge"],
          ["samtidig.html", "🕰️", "Samtidig i verden", "Hva skjedde samme år?"],
          ["endring.html", "⏳", "Kontinuitet og endring", "1814, 1914 og i dag"],
          ["personer.html?fag=samfunnsfag", "👤", "Personer", "Og quizen «Hvem er jeg?»"],
          ["film.html?fag=samfunnsfag", "🎬", "Film", "Filmer med oppgaver"],
          ["museum.html", "🏛️", "Museet vårt", "Gjenstander og museumsskilt"],
          ["lokalhistorie.html", "🏘️", "Historien der du bor", "Lokalhistorie og intervju"]]],
        ["Kilder og metode", [
          ["kilder.html", "📜", "Kildeanalyse", "Ekte historiske kilder"],
          ["historiker.html", "🧐", "Les som en historiker", "Kilder som forteller ulikt"],
          ["lateral.html", "↔️", "Lateral lesing", "Sjekk nettsider som en faktasjekker"],
          ["feed.html", "📱", "Feeden fra fortiden", "Fakta, mening, rykte eller propaganda?"],
          ["grafleser.html", "📈", "Grafleseren", "Les og lag diagrammer"],
          ["undersokelse.html", "🔬", "Undersøkelsesverkstedet", "Lag din egen undersøkelse"],
          ["digitalespor.html", "👣", "Digitale spor", "Personvern og opphavsrett"]]],
        ["Diskuter og drøft", [
          ["debatt.html", "⚖️", "Debattduell", "Argumenter for og mot"],
          ["argumentkart.html", "🗺️", "Argumentkart", "Bygg argumentasjonen"],
          ["perspektiv.html", "🔄", "Perspektivbytte", "Én hendelse, fire mennesker"],
          ["intervju.html", "🎙️", "Historisk intervju", "Spør Nansen, Gina Krog og flere"],
          ["diamant.html", "💎", "Diamantrangering", "Hva var viktigst?"],
          ["hvaom.html", "🔀", "Hva om …?", "Kontrafaktisk historie"],
          ["fred.html", "🕊️", "Fredskonferansen", "Rollespill: Wien 1815 og Paris 1919"]]]
      ] },
      engelsk: { navn: "Engelsk", grupper: [
        ["Topics", [
          ["index.html?fag=engelsk#temaer", "📚", "All topics", "8th–10th grade", "en"],
          ["index.html?fag=engelsk&trinn=8#temaer", "8️⃣", "8th grade", "Britain, identity, Wonder", "en"],
          ["index.html?fag=engelsk&trinn=9#temaer", "9️⃣", "9th grade", "The Empire, Australia, India …", "en"],
          ["index.html?fag=engelsk&trinn=10#temaer", "🔟", "10th grade", "Identity, power, the USA", "en"]], "en"],
        ["Read and watch", [
          ["lesing.html", "📖", "Reading Room", "Stories, poems and speeches", "en"],
          ["land.html", "🌍", "Landsider", "The English-speaking world"],
          ["sport.html", "🏆", "Sport", "Sports in the English-speaking world", "en"],
          ["film.html?fag=engelsk", "🎬", "Film", "Films and series with tasks"]], "en"],
        ["Language", [
          ["grammatikk.html", "🧩", "Grammar and vocabulary", "Explanations and exercises", "en"],
          ["uttale.html", "👄", "Pronunciation", "Sounds, stress and accents", "en"],
          ["laere-engelsk.html", "🧭", "How to learn English", "Learning strategies", "en"],
          ["idiomer.html", "🕵️", "Idiomdetektiven", "Idioms and the stories behind them"],
          ["ordbok.html", "📘", "Ordbok", "Norsk–engelsk og synonymer"],
          ["ordreise.html", "🧳", "Ord som har reist", "Lånord og historien bak dem"]], "en"],
        ["Write and speak", [
          ["skriving.html", "✍️", "How to write", "Essays, stories, presentations", "en"],
          ["skrivom.html", "🔁", "Rewrite and improve", "Use feedback to improve", "en"],
          ["skriftlig.html", "📝", "Skriftlig eksamen", "Videreformidling og samhandling"],
          ["muntlig.html", "🗣️", "Muntlig og lytting", "Samtalekort og lytteøvelser"]], "en"]
      ] },
      verktoy: { navn: "Lese og skrive", grupper: [
        ["Lese", [
          ["lesestrategier.html", "🧠", "Lesestrategier", "Slik leser du smartere"],
          ["leseflyt.html", "⏱️", "Leseflyt", "Gjentatt lesing med tidtaking"],
          ["lesegruppe.html", "👥", "Lesegrupper", "Fire roller – les sammen"],
          ["tekstpar.html", "👯", "Tekstpar", "To tekster side om side"],
          ["oppgaveord.html", "🎯", "Oppgaveord", "Hva betyr «drøft» og «vurder»?"],
          ["ordverksted.html", "🧱", "Ordverksted", "Ordenes byggeklosser"],
          ["tenkerutiner.html", "💭", "Tenkerutiner", "Se – tenk – undre og flere"],
          ["sporsmal.html", "❓", "Spørsmålsstudioet", "Lag dine egne spørsmål"],
          ["ekspertgrupper.html", "🧩", "Ekspertgrupper", "Bli ekspert og lær bort"]]],
        ["Leselyst", [
          ["lesepass.html", "🛂", "Lesepass", "Samle stempler for lesing"],
          ["lesedagbok.html", "📔", "Lesedagbok", "For bøker du velger selv"],
          ["bingo.html", "🎲", "Lesebingo", "5 × 5 leseoppgaver"],
          ["svartut.html", "⬛", "Svarte-ut-dikt", "Lag et dikt av en tekst"]]],
        ["Skrive", [
          ["skriving.html", "✍️", "Skriveverksted", "Skriveguider og skriverammer"],
          ["skrivemal.html", "📮", "Skrivemaler", "Postkort, avisforside, plakat"],
          ["kamerat.html", "🤝", "Kameratvurdering", "To stjerner og et ønske"],
          ["skrivom.html", "🔁", "Rewrite and improve", "Bearbeid etter tilbakemelding", "en"]]],
        ["Lytte og snakke", [
          ["muntlig.html", "🗣️", "Muntlig og lytting", "Samtalekort og lytteøvelser"],
          ["lytt.html", "🎧", "Lytteøkt", "Lytt del for del"],
          ["opptak.html", "🎙️", "Ta opp deg selv", "Høytlesing og presentasjon"]]],
        ["Ord og begreper", [
          ["ordbok.html", "📘", "Ordbok", "Slå opp ord"],
          ["begreper.html", "🔤", "Begrepsbank", "Alle begrepene fra temaene"],
          ["morsmal.html", "🌐", "Begreper på morsmål", "Arabisk, ukrainsk, tyrkisk, polsk"],
          ["ordreise.html", "🧳", "Ord som har reist", "Hvor kommer ordene fra?"]]]
      ] },
      spill: { navn: "Spill", alle: ["spill.html", "Se alle spillene →"], grupper: [
        ["Øv på et tema", [
          ["spill.html#tema", "🃏", "Ordspill", "Memory, Ordle, kryssord og mer"],
          ["repetisjon.html", "🔁", "Repetisjonsstart", "Fem minutter i starten av timen"],
          ["begrepsgata.html", "🧩", "Begrepsgåta", "Dagens fagbegrep"],
          ["lag.html", "🛠️", "Lag selv", "Egen quiz, tidslinje eller ordkort"]]],
        ["Rollespill og simuleringer", [
          ["rettssak.html", "⚖️", "Rettssaken", "Spill en straffesak"],
          ["domstol.html", "🏛️", "Menneskerettighetsdomstolen", "Saker om rettighetene våre"],
          ["valg.html", "🗳️", "Valgsimulatoren", "Fra stemmer til regjering"],
          ["lov.html", "📜", "Lag en lov", "Fra høring til votering"],
          ["kommune.html", "🏛️", "Ordfører for en dag", "Kommunebudsjettet"],
          ["fn.html", "🇺🇳", "FN-rollespill", "Forhandle om en resolusjon"],
          ["fred.html", "🕊️", "Fredskonferansen", "Skriv freden i 1815 eller 1919"],
          ["klima.html", "🌍", "Klimatoppmøtet", "Forhandle om utslippene"],
          ["byen.html", "🏭", "Byen vokser", "Industribyen 1840–1910"],
          ["okonomi.html", "💰", "Første lønn", "Budsjett og lån"]]],
        ["Historie", [
          ["fortelling.html", "🧭", "Velg din vei", "Historiske fortellinger med valg"],
          ["tidsreise.html", "⏳", "Tidsreisen", "Gjett året – hendelser og hverdagsbilder"],
          ["tidslinjeduell.html", "⚔️", "Tidslinjeduellen", "Legg hendelsene på riktig plass"],
          ["historiske-kort.html", "🃏", "Historiske kort", "Lag et kortspill med personene"],
          ["arsak.html", "🔗", "Årsak og virkning", "Sett kjeden i rekkefølge"],
          ["mysterium.html", "🕵️", "Kalde spor i historien", "Logikkgåter"],
          ["escape.html", "🔐", "Escape room", "Svarene står i teksten"]]],
        ["Kart, kilder og medier", [
          ["kartspill.html", "🗺️", "Kartspill", "Land, byer og steder"],
          ["spill.html?spill=worldle", "🌍", "Worldle", "Gjett landet"],
          ["kildedetektiv.html", "🔎", "Kildedetektiven", "Sant eller falskt?"],
          ["lognfabrikk.html", "🏭", "Løgnfabrikken", "Avslør desinformasjon"],
          ["feed.html", "📱", "Feeden fra fortiden", "Sosiale medier i 1789, 1814 og 1940"]]]
      ] },
      eksamen: { navn: "Eksamen", alle: ["eksamen.html", "Gå til eksamenssonen →"], grupper: [
        ["Muntlig eksamen", [
          ["eksamen.html?fag=samfunnsfag", "🌍", "Muntlig i samfunnsfag", "Slik foregår eksamen"],
          ["eksamen.html?fag=engelsk", "💬", "Muntlig i engelsk", "Oral exam step by step"],
          ["eksamen.html#problemstilling", "❓", "Lag en problemstilling", "Med eksempler og sjekk"],
          ["eksamen.html#presentasjon", "⏱️", "Øv på presentasjonen", "Med tidtaker"],
          ["eksamen.html#samtale", "💭", "Øv på samtalen", "Trekk spørsmål"]]],
        ["Skriftlig eksamen i engelsk", [
          ["skriftlig.html", "📝", "Skriftlig eksamen", "Videreformidling og samhandling"],
          ["skrivom.html", "🔁", "Rewrite and improve", "Bruk tilbakemeldingen", "en"],
          ["oppgaveord.html", "🎯", "Oppgaveord", "Hva betyr «drøft» og «vurder»?"]]],
        ["Øv og forbered", [
          ["opptak.html", "🎙️", "Ta opp deg selv", "Hør hvordan du høres ut"],
          ["eksamen.html#fraser", "🗨️", "Nyttige fraser", "Til presentasjon og samtale"],
          ["eksamen.html#sjekkliste", "✅", "Sjekkliste", "Er du klar?"]]]
      ] },
      laerer: { navn: "For lærere", grupper: [
        ["Planlegge", [
          ["laerer.html", "👩‍🏫", "Lærerveiledning", "Alt innholdet forklart"],
          ["planlegger.html", "🗓️", "Planleggeren", "Økter, perioder og kompetansemål"]]],
        ["I klasserommet", [
          ["klassequiz.html", "📺", "Klassequiz", "Spørsmål på storskjerm"],
          ["hjorner.html", "🧭", "Fire hjørner", "Påstander og argumenter"],
          ["tenkerutiner.html", "💭", "Tenkerutiner", "Se – tenk – undre på storskjerm"],
          ["exit.html", "🎟️", "Exit ticket", "Avslutningslapper"],
          ["repetisjon.html", "🔁", "Repetisjonsstart", "Blandede spørsmål"]]],
        ["Lag opplegg", [
          ["leseloype.html", "📍", "QR-leseløype", "Poster med QR-koder"],
          ["tegneserie.html", "💬", "Tegneseriemaker", "Fortell som tegneserie"],
          ["lag.html", "🛠️", "Lag selv", "Quiz, tidslinje og ordkort"]]]
      ] }
    };
    const menyKnapp = id => '<button type="button" class="meny-knapp" id="meny-' + id + '" aria-expanded="false" aria-controls="panel-' + id + '"' + (aktiv(id) ? ' aria-current="page"' : "") + ">" + MENYER[id].navn + ' <span class="meny-pil" aria-hidden="true">▾</span></button>';
    const menyPanel = id => '<div class="meny-panel" id="panel-' + id + '" hidden><div class="mp-grupper">' + MENYER[id].grupper.map(([tittel, lenker, gsp], gi) =>
      '<div class="mp-gruppe"><p class="mp-tittel" id="mp-' + id + "-" + gi + '"' + (gsp ? ' lang="' + gsp + '"' : "") + ">" + LV.esc(tittel) + '</p><ul aria-labelledby="mp-' + id + "-" + gi + '">' + lenker.map(([h, ikon, t, kort, sp]) =>
      '<li><a href="' + h + '"' + (sp ? ' lang="' + sp + '"' : "") + '><span class="mp-ikon" aria-hidden="true">' + ikon + '</span><span><strong>' + LV.esc(t) + "</strong><small>" + LV.esc(kort) + "</small></span></a></li>").join("") + "</ul></div>").join("") + "</div>" +
      (MENYER[id].alle ? '<p class="mp-alle"><a href="' + MENYER[id].alle[0] + '">' + LV.esc(MENYER[id].alle[1]) + "</a></p>" : "") + "</div>";

    const topp = document.createElement("header");
    topp.className = "topp";
    topp.innerHTML =
      '<a class="hopp-til-innhold" href="#innhold">Hopp til innholdet</a>' +
      '<div class="topp-indre">' +
        '<a class="logo" href="index.html"><span class="logo-merke" aria-hidden="true">' + LV.esc(k.forkortelse || "LV") + "</span>" + LV.esc(k.navn) + "</a>" +
        '<nav class="hovedmeny" aria-label="Hovedmeny">' +
          menyKnapp("samfunnsfag") + menyKnapp("engelsk") + menyKnapp("verktoy") + menyKnapp("spill") +
          menyKnapp("eksamen") +
          menyKnapp("laerer") +
        "</nav>" +
        (side === "sok" ? "" : '<form class="topp-sok" action="sok.html" role="search"><label class="skjult-visuelt" for="topp-sok-felt">Søk på Les verden</label><input id="topp-sok-felt" name="q" type="search" placeholder="Søk …" autocomplete="off"><button type="submit" class="topp-sok-knapp" aria-label="Søk">🔍</button></form>') +
        '<button class="knapp" id="lesestotte-knapp" aria-expanded="false" aria-controls="lesestotte" title="Lesestøtte: skrift, størrelse, farger og opplesing">' +
          '<span aria-hidden="true">Aa</span> <span class="ls-knapp-tekst">Lesestøtte</span></button>' +
      "</div>" +
      '<div class="meny-paneler">' + ["samfunnsfag", "engelsk", "verktoy", "spill", "eksamen", "laerer"].map(menyPanel).join("") + "</div>" +
      '<div class="lesestotte" id="lesestotte" hidden>' +
        '<span class="etikett">Tekststørrelse:</span>' +
        '<button class="knapp" data-skala="-1" aria-label="Mindre tekst">A−</button>' +
        '<button class="knapp" data-skala="0" aria-label="Vanlig tekststørrelse">A</button>' +
        '<button class="knapp" data-skala="1" aria-label="Større tekst">A+</button>' +
        '<button class="knapp" id="skrift-knapp" aria-pressed="false">Lesevennlig skrift</button>' +
        '<button class="knapp" id="tema-knapp" aria-pressed="false">Mørk modus</button>' +
        '<button class="knapp" id="linjal-knapp" aria-pressed="false" title="En lys stripe følger musa eller fingeren, resten av siden dempes. Flytt med Alt + piltastene.">📏 Leselinjal</button>' +
        '<button class="knapp" id="fokus-knapp" aria-pressed="false" title="Skjuler menyer og annet som forstyrrer, og gjør teksten smalere">🎯 Fokusmodus</button>' +
        (LV.morsmal ? '<label class="mm-valg"><span>Begreper på morsmål:</span><select id="morsmal-valg"><option value="">Ingen</option>' + LV.morsmal.sprak.map(s => '<option value="' + s.kode + '">' + LV.esc(s.navn) + " – " + LV.esc(s.eget) + "</option>").join("") + "</select></label>" : "") +
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

    // Leselinjal: en stripe som følger musa/fingeren, resten dempes
    const linjalKnapp = panel.querySelector("#linjal-knapp");
    let linjal = null, linjalY = 0;
    function plasserLinjal(y) {
      if (!linjal) return;
      const h = linjal.dataset.h;
      linjalY = Math.max(0, Math.min(window.innerHeight, y));
      linjal.firstChild.style.height = Math.max(0, linjalY - h / 2) + "px";
      linjal.lastChild.style.top = (linjalY + h / 2) + "px";
    }
    const flyttMus = e => { if (e.pointerType !== "touch" || e.type === "pointerdown") plasserLinjal(e.clientY); };
    const flyttTast = e => {
      if (!e.altKey || (e.key !== "ArrowDown" && e.key !== "ArrowUp")) return;
      e.preventDefault();
      plasserLinjal(linjalY + (e.key === "ArrowDown" ? 1 : -1) * linjal.dataset.h * 0.6);
    };
    linjalKnapp.addEventListener("click", function () {
      const pa = linjalKnapp.getAttribute("aria-pressed") !== "true";
      linjalKnapp.setAttribute("aria-pressed", String(pa));
      if (pa) {
        linjal = document.createElement("div");
        linjal.className = "leselinjal";
        linjal.setAttribute("aria-hidden", "true");
        linjal.innerHTML = '<div class="ll-over"></div><div class="ll-under"></div>';
        linjal.dataset.h = Math.round(parseFloat(getComputedStyle(document.documentElement).fontSize) * 3 * (parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--skala")) || 1));
        document.body.appendChild(linjal);
        plasserLinjal(window.innerHeight * 0.45);
        document.addEventListener("pointermove", flyttMus);
        document.addEventListener("pointerdown", flyttMus);
        document.addEventListener("keydown", flyttTast);
      } else {
        document.removeEventListener("pointermove", flyttMus);
        document.removeEventListener("pointerdown", flyttMus);
        document.removeEventListener("keydown", flyttTast);
        if (linjal) linjal.remove();
        linjal = null;
      }
    });

    // Morsmål: viser oversatte begreper ved forklaringene. Valget følger med
    // i lenker til andre sider (?mm=…), men lagres ikke.
    const mmValg = panel.querySelector("#morsmal-valg");
    if (mmValg) {
      const settMm = kode => {
        if (kode && LV.morsmal.sprak.some(s => s.kode === kode)) document.documentElement.dataset.morsmal = kode; else { delete document.documentElement.dataset.morsmal; kode = ""; }
        mmValg.value = kode;
        try { const u = new URL(location.href); if (kode) u.searchParams.set("mm", kode); else u.searchParams.delete("mm"); history.replaceState(null, "", u.pathname.split("/").pop() + u.search + u.hash); } catch (e) { /* ignorer */ }
        document.dispatchEvent(new CustomEvent("lv-morsmal", { detail: kode }));
      };
      mmValg.addEventListener("change", () => settMm(mmValg.value));
      if (LV.param("mm")) { settMm(LV.param("mm")); }
      document.addEventListener("click", e => {
        const a = e.target.closest("a[href]"), kode = document.documentElement.dataset.morsmal;
        if (!a || !kode || a.target === "_blank") return;
        const h = a.getAttribute("href");
        if (!/^[\w-]+\.html/.test(h) || /[?&]mm=/.test(h)) return;
        const [sti, hash] = h.split("#");
        a.setAttribute("href", sti + (sti.includes("?") ? "&" : "?") + "mm=" + kode + (hash != null ? "#" + hash : ""));
      }, true);
    }

    // Fokusmodus: skjuler menyer, bannere og bunntekst, og gjør teksten smalere
    const fokus = panel.querySelector("#fokus-knapp");
    fokus.addEventListener("click", function () {
      const pa = fokus.getAttribute("aria-pressed") !== "true";
      fokus.setAttribute("aria-pressed", String(pa));
      if (pa) document.documentElement.dataset.fokus = "pa";
      else delete document.documentElement.dataset.fokus;
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
