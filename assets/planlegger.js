/* =========================================================
   Les verden – Planlegger for lærere (planlegger.html)
   Filtrer alt innhold etter fag, trinn, type og kompetansemål, sett sammen
   en økt eller periode, og del en elevlenke.
   Ingenting lagres: valgene ligger i adressen (URL-en), så lenken kan deles
   eller bokmerkes.
   planlegger.html?elev=1&r=tema:id,lesing:id&t=Tittel&m=Beskjed → elevvisning
   ========================================================= */
(function () {
  const LV = window.LV;
  const $ = id => document.getElementById(id);
  const esc = s => LV.esc(String(s == null ? "" : s));
  const navn = () => (LV.config ? LV.config.navn : "Les verden");
  const K = () => LV.kompetansemal;

  const TYPER = {
    tema: { ikon: "📚", navn: "Temaer" },
    lesing: { ikon: "📖", navn: "Reading Room" },
    film: { ikon: "🎬", navn: "Filmer" },
    skriving: { ikon: "✍️", navn: "Skriveguider" },
    grammatikk: { ikon: "🧩", navn: "Grammatikk" },
    side: { ikon: "🧰", navn: "Verktøy og sider" }
  };
  const SIDER = [
    ["lesestrategier", "Lesestrategier", "lesestrategier.html", "Strategier før, under og etter lesing, med VØL-skjema.", ["samfunnsfag", "engelsk"]],
    ["kildedetektiv", "Kildedetektiven", "kildedetektiv.html", "Spill i kildekritikk: er innlegget sant eller falskt?", ["samfunnsfag", "engelsk"]],
    ["skriftlig", "Skriftlig eksamen i engelsk", "skriftlig.html", "Videreformidling (lytt og formidle) og samhandling (chattråd) – tre temaer, også som hel eksamensøkt.", ["engelsk"]],
    ["kilder", "Kildeanalyse", "kilder.html", "Ekte historiske kilder (1215–1890) med ordhjelp, Se–tenk–lur og kildekritiske spørsmål.", ["samfunnsfag", "engelsk"]],
    ["leseflyt", "Leseflyt: gjentatt lesing", "leseflyt.html", "Hør teksten, les høyt tre ganger med tidtaking, makker markerer feil, se fremgang i ord per minutt.", ["samfunnsfag", "engelsk"]],
    ["oppgaveord", "Oppgaveord", "oppgaveord.html", "Hva krever beskriv, forklar, drøft, vurder – og describe, explain, discuss? Ordkort, koblespill, svardetektiv og «plukk oppgaven fra hverandre».", ["samfunnsfag", "engelsk"]],
    ["lytt", "Lytteøkt med stopp", "lytt.html", "Lytt til et tema eller en tekst del for del, med lytteoppgaver etter hver del.", ["samfunnsfag", "engelsk"]],
    ["svartut", "Svarte-ut-dikt", "svartut.html", "Blackout poetry: lag et nytt dikt av en side fra en tekst i Reading Room.", ["engelsk"]],
    ["skrivemal", "Skrivemaler", "skrivemal.html", "Postkort fra fortiden, historisk avisforside, Wanted-plakat, bokomslag og booktrailer-manus.", ["samfunnsfag", "engelsk"]],
    ["escape", "Escape room", "escape.html", "Tre escape rooms der svarene står i teksten: Bastillen (norsk), the Workhouse og the Locked Library (engelsk).", ["samfunnsfag", "engelsk"]],
    ["begrepsgata", "Begrepsgåta", "begrepsgata.html", "Dagens fagbegrep: gjett ordet ut fra forklaringen.", ["samfunnsfag", "engelsk"]],
    ["kommune", "Ordfører for en dag", "kommune.html", "Budsjettspill i en oppdiktet kommune: prioriteringer, dilemmaer og kommunevalg.", ["samfunnsfag"]],
    ["lov", "Lag en lov", "lov.html", "Fra høring til votering: kompromisser og flertall i et Storting med oppdiktede partier.", ["samfunnsfag"]],
    ["hjorner", "Fire hjørner", "hjorner.html", "Storskjerm: påstander, elevene velger hjørne og argumenterer (norsk og engelsk).", ["samfunnsfag", "engelsk"]],
    ["fortelling", "Velg din vei", "fortelling.html", "Historiske fortellinger med valg: utvandreren, fyrstikkarbeidersken, Eidsvoll 1814.", ["samfunnsfag"]],
    ["tidsreise", "Tidsreisen", "tidsreise.html", "Spill: gjett året for hendelser fra tidslinjene i temaene.", ["samfunnsfag", "engelsk"]],
    ["arsak", "Årsak og virkning", "arsak.html", "Spill: sett årsaker og følger i riktig rekkefølge (15 kjeder).", ["samfunnsfag", "engelsk"]],
    ["exit", "Exit ticket", "exit.html", "Avslutningslapper: 3–2–1, klart og uklart, jeg trodde – nå tenker jeg, ett ord og læringsmål-sjekk. Storskjerm, utskrift (4 per ark) og digital elevversjon.", ["samfunnsfag", "engelsk"]],
    ["lateral", "Lateral lesing", "lateral.html", "Fem oppdiktede nettsider: forlat siden, søk på avsenderen, les søketreffene og konkluder.", ["samfunnsfag", "engelsk"]],
    ["rettssak", "Rettssaken", "rettssak.html", "Rollespill i tingretten: to oppdiktede saker (sykkeltyveri/heleri og trussel i kommentarfelt) med rollekort, saksdokumenter, dommerens manus og meddommerskjema.", ["samfunnsfag"]],
    ["okonomi", "Første lønn", "okonomi.html", "Personlig økonomi: budsjett for første lønn, valg når noe uventet skjer, og lånekalkulator.", ["samfunnsfag"]],
    ["kamerat", "Kameratvurdering", "kamerat.html", "To stjerner og et ønske med kriterier fra et tema, en skrivesjanger eller egne kriterier, og setningsstartere.", ["samfunnsfag", "engelsk"]],
    ["opptak", "Ta opp deg selv", "opptak.html", "Lydopptak av høytlesing, presentasjon, engelsk uttale eller samtale, med sjekkliste for egenvurdering. Ingenting lagres.", ["samfunnsfag", "engelsk"]],
    ["skrivom", "Rewrite and improve", "skrivom.html", "Bearbeide egen tekst etter tilbakemelding: rettekoder med forklaring, før og etter, ARMS og CUPS og personlig sjekkliste.", ["engelsk"]],
    ["grafleser", "Grafleseren", "grafleser.html", "Velg riktig diagram, les av grafer, avslør fire villedende grafer og lag eget diagram (oppdiktede tall).", ["samfunnsfag"]],
    ["undersokelse", "Undersøkelsesverkstedet", "undersokelse.html", "Egen undersøkelse fra problemstilling til presentasjon: spørsmålsvaskeri, opptelling med diagram, gyldighet og utkast. Lagres i lenken.", ["samfunnsfag"]],
    ["valg", "Valgsimulatoren", "valg.html", "Fra stemmer til mandater (justert Sainte-Laguë, ren Sainte-Laguë, d’Hondt, sperregrense) og koalisjonsbyggeren – oppdiktede partier.", ["samfunnsfag"]],
    ["digitalespor", "Digitale spor", "digitalespor.html", "Spordetektiven (hva avslører seks innlegg?), privat sjekkliste, slik får du slettet spor, og opphavsrett og Creative Commons med åtte situasjoner.", ["samfunnsfag"]],
    ["historiker", "Les som en historiker", "historiker.html", "Tre kildesett (fyrstikkstreiken 1889, Torgslaget 1829, Peterloo 1819): opphav, kontekst, sammenligning, nærlesing og egen konklusjon.", ["samfunnsfag", "engelsk"]],
    ["argumentkart", "Argumentkart", "argumentkart.html", "Påstand, grunner, belegg, innvendinger og svar som visuelt kart – med tekstutkast og ideer fra Debattduell.", ["samfunnsfag", "engelsk"]],
    ["ordverksted", "Ordverksted", "ordverksted.html", "Forstavelser, endelser og greske/latinske ordstammer på norsk og engelsk, med tre øvinger.", ["samfunnsfag", "engelsk"]],
    ["diamant", "Diamantrangering", "diamant.html", "Fem sett med ni kort (årsaker til første verdenskrig, viktigste hendelse i Norge, industrialiseringen, FN-prioriteringer, utfordringer for unge) som rangeres og begrunnes.", ["samfunnsfag", "engelsk"]],
    ["endring", "Kontinuitet og endring", "endring.html", "Skole, arbeid, barndom, demokrati og kommunikasjon rundt 1814, 1914 og i dag – vurder hvor mye som har endret seg, og hvorfor.", ["samfunnsfag"]],
    ["repetisjon", "Repetisjonsstart", "repetisjon.html", "Fem minutter repetisjon i starten av timen med blandede spørsmål fra 2–4 tidligere temaer.", ["samfunnsfag", "engelsk"]],
    ["lesegruppe", "Lesegrupper med roller", "lesegruppe.html", "Gjensidig undervisning: spå, oppklare, spørre, oppsummere – rollene byttes for hver del.", ["samfunnsfag", "engelsk"]],
    ["lognfabrikk", "Løgnfabrikken", "lognfabrikk.html", "Prebunking-spill om seks manipulasjonsteknikker i et oppdiktet sosialt medium, med test til slutt.", ["samfunnsfag", "engelsk"]],
    ["morsmal", "Begreper på morsmål", "morsmal.html", "112 sentrale begreper fra samfunnsfag på arabisk, ukrainsk, tyrkisk og polsk, med søk og ordkort. Kan også slås på i temaene via Aa-menyen.", ["samfunnsfag"]],
    ["tegneserie", "Tegneseriemaker", "tegneserie.html", "Lag tegneserie med bakgrunner, figurer, snakkebobler og fortellerboks. Last ned som PNG, skriv ut eller del lenke.", ["samfunnsfag", "engelsk"]],
    ["leseloype", "QR-leseløype", "leseloype.html", "Lag en leseløype fra et tema: én QR-post per avsnitt, svarark og løsningsord.", ["samfunnsfag", "engelsk"]],
    ["lesepass", "Lesepass", "lesepass.html", "20 stempler for leseaktiviteter på nettstedet, med nivåer fra bronse til diamant.", ["samfunnsfag", "engelsk"]],
    ["perspektiv", "Perspektivbytte", "perspektiv.html", "Seks hendelser (fabrikken, utvandringen, 1905, internatskolen, Berlinmuren, Ellis Island) med fire rollekort hver. Skriv fra én rolle, bytt perspektiv, sammenlign.", ["samfunnsfag", "engelsk"]],
    ["intervju", "Historisk intervju", "intervju.html", "Gjenskapte intervjuer med Gina Krog, Elsa Laula Renberg, Fridtjof Nansen, Frederick Douglass og Emmeline Pankhurst, med merking av fakta og tolkning.", ["samfunnsfag", "engelsk"]],
    ["fn", "FN-rollespill", "fn.html", "Model UN med oppdiktede land: klima, plast i havet og flyktninger. Rollekort, resolusjon, forhandlinger og avstemning.", ["samfunnsfag", "engelsk"]],
    ["lag", "Lag selv: quiz, tidslinje og ordkort", "lag.html", "Elevene lager sin egen quiz, tidslinje eller ordkort og deler lenken. Innholdet ligger i lenken – ingenting lagres.", ["samfunnsfag", "engelsk"]],
    ["debatt", "Debattduell", "debatt.html", "Argumenter for og mot, argumentasjonsfeil og eget innlegg.", ["samfunnsfag", "engelsk"]],
    ["bingo", "Lesebingo", "bingo.html", "5 × 5 leseoppgaver på norsk eller engelsk – samme brett for hele klassen.", ["samfunnsfag", "engelsk"]],
    ["lesedagbok", "Lesedagbok", "lesedagbok.html", "Leselogg, lesekort og bokpresentasjon for selvvalgte tekster.", ["samfunnsfag", "engelsk"]],
    ["laere", "How to learn English", "laere-engelsk.html", "Strategier for å lære ord, skrive tekster og klare seg i samtaler.", ["engelsk"]],
    ["uttale", "Pronunciation for Norwegians", "uttale.html", "Vanskelige lyder, ordtrykk og stumme bokstaver – lytt og ta opp deg selv.", ["engelsk"]],
    ["muntlig", "Muntlig og lytting", "muntlig.html", "Samtalekort, lytteøvelser og den varme stolen til alle temaene.", ["samfunnsfag", "engelsk"]],
    ["grammatikk", "Grammar and vocabulary", "grammatikk.html", "Ordklasser, homofoner og øvelser.", ["engelsk"]],
    ["ordbok", "Ordbok", "ordbok.html", "Bokmålsordboka, norsk–engelsk og synonymer.", ["samfunnsfag", "engelsk"]],
    ["land", "Landsider", "land.html", "De engelskspråklige landene med fakta og quiz.", ["engelsk"]],
    ["sport", "Sports in the English-speaking world", "sport.html", "Idretter og sportsspråk.", ["engelsk"]],
    ["kartspill", "Kartspill", "kartspill.html", "Finn land, byer og steder på kartet.", ["samfunnsfag", "engelsk"]],
    ["tidslinje", "Tidslinje", "tidslinje.html", "Alle hendelsene fra temaene på én tidslinje.", ["samfunnsfag"]],
    ["samtidig", "Samtidig i verden", "samtidig.html", "Velg et år og se hendelser i Norge, den engelskspråklige verden og resten av verden side om side.", ["samfunnsfag", "engelsk"]],
    ["tekstpar", "Tekstpar", "tekstpar.html", "Seks par med to tekster om samme tema (erindring + fagtekst, dikt + fagtekst, erklæring + tale …) med sammenligningsskjema og Venn-diagram.", ["samfunnsfag", "engelsk"]],
    ["eksamen", "Eksamenssone", "eksamen.html", "Forbered muntlig eksamen.", ["samfunnsfag", "engelsk"]]
  ];

  // ---------- Bygg ressurslista ----------
  function trinnFra(t) { const m = String(t || "").match(/\d+/g); return m ? m.map(Number) : [8, 9, 10]; }
  function utvid(trinn) { if (trinn.length === 2) { const a = []; for (let i = trinn[0]; i <= trinn[1]; i++) a.push(i); return a; } return trinn; }
  function malFraTemaer(ider, prefiks) {
    const sett = new Set();
    (ider || []).forEach(id => (K().kobling[id] || []).forEach(m => { if (!prefiks || m[0] === prefiks) sett.add(m); }));
    return [...sett];
  }
  function lagRessurser() {
    const R = [];
    const temaTrinn = {};
    (LV.temaer || []).forEach(t => {
      temaTrinn[t.id] = t.trinn;
      R.push({ key: "tema:" + t.id, type: "tema", tittel: t.tittel, kort: t.kort, fag: [t.fag], trinn: [t.trinn], url: "tema.html?id=" + encodeURIComponent(t.id), mal: K().kobling[t.id] || [], en: t.fag === "engelsk" });
    });
    (LV.lesetekster || []).forEach(t => {
      const base = t.sjanger === "Short story" ? ["e11", "e10"] : ["e12", "e10"];
      R.push({ key: "lesing:" + t.id, type: "lesing", tittel: t.tittel, kort: t.forfatter + " · " + t.kort, fag: ["engelsk"], trinn: utvid(trinnFra(t.trinn)), url: "lesing.html?id=" + encodeURIComponent(t.id), mal: [...new Set(base.concat(malFraTemaer(t.temaer, "e")))], en: true });
    });
    (LV.filmer || []).forEach(f => {
      const tr = [...new Set((f.temaer || []).map(id => temaTrinn[id]).filter(Boolean))].sort();
      R.push({ key: "film:" + f.id, type: "film", tittel: f.tittel + " (" + f.ar + ")", kort: f.kort, fag: f.fag || ["engelsk"], trinn: tr.length ? tr : [8, 9, 10], url: "film.html?id=" + encodeURIComponent(f.id), mal: [...new Set(["e19"].concat(malFraTemaer(f.temaer)))], en: f.sprak === "en" });
    });
    (LV.skriveguider || []).forEach(g => {
      const en = g.sprak === "en";
      R.push({ key: "skriving:" + g.id, type: "skriving", tittel: g.tittel, kort: g.kort, fag: en ? ["engelsk"] : ["samfunnsfag"], trinn: [8, 9, 10], url: g.lenke || "skriving.html?id=" + encodeURIComponent(g.id), mal: en ? ["e14", "e15", "e9", "e1"] : ["s1"], en: en });
    });
    const GRAMMAL = { partsofspeech: ["e8", "e9"], lookalikes: ["e9", "e3"], sentences: ["e8", "e9", "e15"] };
    (LV.grammatikkGrupper || []).forEach(gr => gr.emner.forEach(id => {
      const e = (LV.grammatikkListe || []).find(x => x.id === id); if (!e) return;
      R.push({ key: "grammatikk:" + id, type: "grammatikk", tittel: e.tittel, kort: e.kort + " (" + e.norsk + ")", fag: ["engelsk"], trinn: [8, 9, 10], url: "grammatikk.html?id=" + encodeURIComponent(id), mal: GRAMMAL[gr.id] || ["e8"], en: true });
    }));
    SIDER.forEach(([id, t, u, k, fag]) => R.push({ key: "side:" + id, type: "side", tittel: t, kort: k, fag: fag, trinn: [8, 9, 10], url: u, mal: K().kobling["side:" + id] || [] }));
    return R;
  }

  // ---------- Tilstand i adressen ----------
  const S = { fag: "", trinn: "", type: "", mal: "", q: "", valgt: [], tittel: "", beskjed: "" };
  function lesAdresse() {
    const p = new URLSearchParams(location.search);
    ["fag", "trinn", "type", "mal", "q"].forEach(k => { S[k] = p.get(k) || ""; });
    S.valgt = (p.get("r") || "").split(",").filter(Boolean);
    S.tittel = p.get("t") || ""; S.beskjed = p.get("m") || "";
  }
  function elevLenke(abs) {
    const p = new URLSearchParams();
    p.set("elev", "1");
    if (S.tittel) p.set("t", S.tittel);
    if (S.beskjed) p.set("m", S.beskjed);
    p.set("r", S.valgt.join(","));
    return (abs ? location.href.split("?")[0].split("#")[0] : "planlegger.html") + "?" + p.toString();
  }
  function skrivAdresse() {
    const p = new URLSearchParams();
    ["fag", "trinn", "type", "mal", "q"].forEach(k => { if (S[k]) p.set(k, S[k]); });
    if (S.valgt.length) p.set("r", S.valgt.join(","));
    if (S.tittel) p.set("t", S.tittel);
    if (S.beskjed) p.set("m", S.beskjed);
    history.replaceState(null, "", "planlegger.html" + (p.toString() ? "?" + p : ""));
  }

  const malMerke = (id, aktiv) => { const m = LV.kmFinn(id); if (!m) return ""; return '<button type="button" class="pl-mal pl-mal-' + m.fag + (aktiv ? " aktiv" : "") + '" data-mal="' + id + '" title="' + esc(m.tekst) + '">' + esc(m.kort) + "</button>"; };

  // ---------- Lærervisning ----------
  function laerer(R) {
    document.title = "Planlegger – " + navn();
    const malValg = ["samfunnsfag", "engelsk"].map(f => '<optgroup label="' + K()[f].navn + " (" + K()[f].kode + ')">' + K()[f].mal.map(m => '<option value="' + m.id + '">' + esc(m.kort) + "</option>").join("") + "</optgroup>").join("");
    $("innhold").innerHTML = '<nav class="brodsmuler" aria-label="Brødsmuler"><a href="index.html">Forside</a> › <a href="laerer.html">For lærere</a> › Planlegger</nav>' +
      '<header class="sidehode"><p class="overlinje">For lærere</p><h1>Planlegger</h1><p class="ingress">Finn innhold etter fag, trinn og kompetansemål, sett sammen en økt eller en periode, og del en ferdig lenke med elevene. Ingenting lagres – valgene dine ligger i adressen, så du kan bokmerke den eller sende den til en kollega.</p></header>' +
      '<div class="pl-oppsett">' +
      '<section class="pl-finn" aria-labelledby="pl-finn-t"><h2 id="pl-finn-t">1. Finn innhold</h2>' +
      '<div class="pl-filter"><label>Fag<select id="pl-fag"><option value="">Begge fag</option><option value="samfunnsfag">Samfunnsfag</option><option value="engelsk">Engelsk</option></select></label>' +
      '<label>Trinn<select id="pl-trinn"><option value="">Alle trinn</option><option>8</option><option>9</option><option>10</option></select></label>' +
      '<label>Type<select id="pl-type"><option value="">Alt innhold</option>' + Object.entries(TYPER).map(([k, v]) => '<option value="' + k + '">' + v.navn + "</option>").join("") + "</select></label>" +
      '<label class="pl-bred">Kompetansemål<select id="pl-mal"><option value="">Alle kompetansemål</option>' + malValg + "</select></label>" +
      '<label class="pl-bred">Søk<input id="pl-q" type="search" autocomplete="off" placeholder="For eksempel: apartheid, essay, Dickens"></label></div>' +
      '<div id="pl-malinfo" class="pl-malinfo" aria-live="polite"></div><p class="pl-antall" id="pl-antall" aria-live="polite"></p><ul class="pl-liste" id="pl-liste"></ul></section>' +
      '<aside class="pl-plan" aria-labelledby="pl-plan-t"><div class="pl-plan-indre"><h2 id="pl-plan-t">2. Min plan</h2>' +
      '<label class="pl-felt">Tittel<input id="pl-tittel" type="text" autocomplete="off" placeholder="For eksempel: Uke 46 – Apartheid"></label>' +
      '<label class="pl-felt">Beskjed til elevene<textarea id="pl-beskjed" rows="3" placeholder="For eksempel: Les fagteksten og gjør nivå 2-oppgavene."></textarea></label>' +
      '<ol class="pl-valgt" id="pl-valgt"></ol><div id="pl-dekning"></div>' +
      '<h3>3. Del med elevene</h3><div class="pl-knapper"><button class="knapp hoved" id="pl-kopier-lenke" type="button">Kopier elevlenke</button><a class="knapp" id="pl-apne" href="#" target="_blank" rel="noopener">Åpne elevvisning</a><button class="knapp" id="pl-kopier-liste" type="button">Kopier som liste</button><button class="knapp fare" id="pl-tom" type="button">Tøm planen</button></div>' +
      '<p class="pl-status" id="pl-status" role="status" aria-live="polite"></p></div></aside></div>' +
      '<section class="pl-oversikt" aria-labelledby="pl-ov-t"><h2 id="pl-ov-t">Oversikt: kompetansemål og innhold</h2><p class="ingress-liten">Hvor mange temaer og tekster på siden som arbeider med hvert mål etter 10. trinn. Trykk på et mål for å filtrere. Koblingene er forslag – du vurderer selv.</p><div id="pl-ov"></div></section>';

    $("pl-fag").value = S.fag; $("pl-trinn").value = S.trinn; $("pl-type").value = S.type; $("pl-mal").value = S.mal; $("pl-q").value = S.q;
    $("pl-tittel").value = S.tittel; $("pl-beskjed").value = S.beskjed;

    const norm = s => String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
    function tegnListe() {
      const q = norm(S.q.trim());
      const liste = R.filter(r => (!S.fag || r.fag.includes(S.fag)) && (!S.trinn || r.trinn.includes(+S.trinn)) && (!S.type || r.type === S.type) && (!S.mal || r.mal.includes(S.mal)) && (!q || norm(r.tittel + " " + r.kort).includes(q)));
      $("pl-antall").textContent = liste.length + (liste.length === 1 ? " treff" : " treff");
      $("pl-liste").innerHTML = liste.map(r => {
        const inne = S.valgt.includes(r.key);
        return '<li class="pl-kort' + (inne ? " valgt" : "") + '"><div class="pl-kort-hode"><span class="pl-ikon" aria-hidden="true">' + TYPER[r.type].ikon + '</span><div><a href="' + r.url + '" target="_blank" rel="noopener"' + (r.en ? ' lang="en"' : "") + ">" + esc(r.tittel) + '</a><p class="pl-meta">' + TYPER[r.type].navn + " · " + r.fag.map(f => f === "engelsk" ? "Engelsk" : "Samfunnsfag").join(" og ") + " · " + (r.trinn.length === 3 ? "8.–10." : r.trinn.join(".–") + ".") + ' trinn</p></div><button type="button" class="knapp liten pl-legg" data-key="' + r.key + '" aria-pressed="' + inne + '">' + (inne ? "✓ Lagt til" : "+ Legg til") + "</button></div>" +
          '<p class="pl-kort-tekst"' + (r.en ? ' lang="en"' : "") + ">" + esc(r.kort) + '</p><div class="pl-maler">' + r.mal.map(m => malMerke(m, m === S.mal)).join("") + "</div></li>";
      }).join("") || '<li class="pl-tom">Ingen treff. Prøv å fjerne et filter.</li>';
      const m = S.mal && LV.kmFinn(S.mal);
      $("pl-malinfo").innerHTML = m ? '<p><strong>' + esc(m.plan.navn) + " – " + esc(m.kort) + ":</strong> Eleven skal kunne " + esc(m.tekst) + '. <button type="button" class="lenkeknapp" id="pl-malbort">Fjern målet</button></p>' : "";
      if (m) $("pl-malbort").addEventListener("click", () => { S.mal = ""; $("pl-mal").value = ""; oppdater(); });
    }
    function tegnPlan() {
      const valgt = S.valgt.map(k => R.find(r => r.key === k)).filter(Boolean);
      $("pl-valgt").innerHTML = valgt.length ? valgt.map((r, i) => '<li><span aria-hidden="true">' + TYPER[r.type].ikon + "</span> <span" + (r.en ? ' lang="en"' : "") + ">" + esc(r.tittel) + '</span><span class="pl-flytt"><button type="button" data-opp="' + i + '" aria-label="Flytt opp"' + (i ? "" : " disabled") + '>↑</button><button type="button" data-ned="' + i + '" aria-label="Flytt ned"' + (i < valgt.length - 1 ? "" : " disabled") + '>↓</button><button type="button" data-bort="' + i + '" aria-label="Fjern">✕</button></span></li>').join("") : '<li class="pl-tom">Trykk «+ Legg til» på innholdet du vil ha med.</li>';
      const mal = [...new Set(valgt.flatMap(r => r.mal))];
      $("pl-dekning").innerHTML = mal.length ? '<details class="pl-dekning"><summary>🎯 Planen dekker ' + mal.length + " kompetansemål</summary><ul>" + mal.map(LV.kmFinn).filter(Boolean).map(m => "<li><strong>" + esc(m.plan.navn) + ":</strong> " + esc(m.kort) + "</li>").join("") + "</ul></details>" : "";
      $("pl-apne").href = elevLenke(false);
      const har = valgt.length > 0;
      ["pl-kopier-lenke", "pl-kopier-liste", "pl-tom"].forEach(id => { $(id).disabled = !har; });
      $("pl-apne").classList.toggle("deaktivert", !har); if (har) $("pl-apne").removeAttribute("aria-disabled"); else $("pl-apne").setAttribute("aria-disabled", "true");
    }
    function tegnOversikt() {
      $("pl-ov").innerHTML = ["samfunnsfag", "engelsk"].map(f => '<h3>' + K()[f].navn + ' <span class="pl-kode">' + K()[f].kode + "</span></h3><ul class=\"pl-ov-liste\">" +
        K()[f].mal.map(m => {
          const n = R.filter(r => r.mal.includes(m.id));
          const temaer = n.filter(r => r.type === "tema").length, verktoy = n.filter(r => r.type === "side" || r.type === "grammatikk").length;
          return '<li><button type="button" class="pl-ov-mal" data-mal="' + m.id + '"><span class="pl-ov-n' + (n.length < 2 ? " lav" : "") + '">' + n.length + '</span><span><strong>' + esc(m.kort) + "</strong><small>" + esc(m.tekst) + '</small><small class="pl-ov-tall">' + temaer + " temaer · " + (n.length - temaer - verktoy) + " tekster, filmer og guider · " + verktoy + " verktøy og grammatikk</small></span></button></li>";
        }).join("") + "</ul>").join("") + '<p class="km-kilde">Kilder: <a href="' + K().samfunnsfag.url + '" target="_blank" rel="noopener">Læreplan i samfunnsfag (SAF01-05)</a> og <a href="' + K().engelsk.url + '" target="_blank" rel="noopener">Læreplan i engelsk (ENG01-06)</a>, fastsatt 20.5.2026, gjelder fra 1.8.2026.</p>';
    }
    function oppdater() { skrivAdresse(); tegnListe(); tegnPlan(); }

    [["pl-fag", "fag"], ["pl-trinn", "trinn"], ["pl-type", "type"], ["pl-mal", "mal"]].forEach(([id, k]) => $(id).addEventListener("change", e => { S[k] = e.target.value; oppdater(); }));
    $("pl-q").addEventListener("input", e => { S.q = e.target.value; oppdater(); });
    $("pl-tittel").addEventListener("input", e => { S.tittel = e.target.value; skrivAdresse(); tegnPlan(); });
    $("pl-beskjed").addEventListener("input", e => { S.beskjed = e.target.value; skrivAdresse(); tegnPlan(); });
    document.addEventListener("click", e => {
      const legg = e.target.closest(".pl-legg");
      if (legg) { const k = legg.dataset.key; S.valgt = S.valgt.includes(k) ? S.valgt.filter(x => x !== k) : S.valgt.concat(k); oppdater(); return; }
      const mal = e.target.closest("[data-mal]");
      if (mal) { S.mal = mal.dataset.mal; $("pl-mal").value = S.mal; oppdater(); $("pl-finn-t").scrollIntoView({ behavior: "smooth" }); return; }
      const b = e.target.closest("[data-opp],[data-ned],[data-bort]");
      if (b && b.closest("#pl-valgt")) {
        const v = S.valgt.filter(k => R.some(r => r.key === k));
        if (b.dataset.opp) { const i = +b.dataset.opp; [v[i - 1], v[i]] = [v[i], v[i - 1]]; }
        if (b.dataset.ned) { const i = +b.dataset.ned; [v[i + 1], v[i]] = [v[i], v[i + 1]]; }
        if (b.dataset.bort) v.splice(+b.dataset.bort, 1);
        S.valgt = v; oppdater();
      }
    });
    const status = t => { $("pl-status").textContent = t; };
    const kopier = (tekst, melding) => {
      const ok = () => status(melding);
      const reserve = () => { const x = document.createElement("textarea"); x.value = tekst; document.body.appendChild(x); x.select(); let lyktes = false; try { lyktes = document.execCommand("copy"); } catch (e) { lyktes = false; } x.remove(); if (lyktes) ok(); else window.prompt("Ctrl+C / Cmd+C", tekst); };
      if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(tekst).then(ok, reserve); else reserve();
    };
    $("pl-kopier-lenke").addEventListener("click", () => kopier(elevLenke(true), "Elevlenken er kopiert. Lim den inn i for eksempel Google Classroom."));
    $("pl-kopier-liste").addEventListener("click", () => {
      const rot = location.href.split("?")[0].replace(/planlegger\.html.*$/, "");
      const valgt = S.valgt.map(k => R.find(r => r.key === k)).filter(Boolean);
      const tekst = (S.tittel ? S.tittel + "\n" : "") + (S.beskjed ? S.beskjed + "\n" : "") + "\n" + valgt.map((r, i) => (i + 1) + ". " + r.tittel + "\n   " + rot + r.url).join("\n");
      kopier(tekst, "Lista er kopiert.");
    });
    $("pl-tom").addEventListener("click", () => { S.valgt = []; S.tittel = ""; S.beskjed = ""; $("pl-tittel").value = ""; $("pl-beskjed").value = ""; oppdater(); status("Planen er tømt."); });
    tegnOversikt(); oppdater();
  }

  // ---------- Elevvisning ----------
  function elev(R) {
    const valgt = S.valgt.map(k => R.find(r => r.key === k)).filter(Boolean);
    document.title = (S.tittel || "Arbeidsplan") + " – " + navn();
    document.body.classList.add("pl-elevside");
    $("innhold").innerHTML = '<header class="sidehode"><p class="overlinje">Arbeidsplan</p><h1>' + esc(S.tittel || "Dette skal vi jobbe med") + "</h1>" +
      (S.beskjed ? '<p class="ingress pl-beskjed">' + esc(S.beskjed).replace(/\n/g, "<br>") + "</p>" : "") + "</header>" +
      (valgt.length ? '<ol class="pl-elevliste">' + valgt.map(r => '<li><a class="pl-elevkort" href="' + r.url + '"><span class="pl-ikon" aria-hidden="true">' + TYPER[r.type].ikon + '</span><span><strong' + (r.en ? ' lang="en"' : "") + ">" + esc(r.tittel) + '</strong><small' + (r.en ? ' lang="en"' : "") + ">" + esc(r.kort) + "</small></span></a></li>").join("") + "</ol>" : '<p class="melding">Denne lenken inneholder ingen oppgaver.</p>') +
      '<p class="fo-merk">Svarene dine lagres ikke på siden. Kopier dem til et dokument når du er ferdig.</p>';
  }

  document.addEventListener("DOMContentLoaded", function () {
    if (!LV.kompetansemal) { $("innhold").innerHTML = '<p class="melding">Fant ikke kompetansemålene.</p>'; return; }
    lesAdresse();
    const R = lagRessurser();
    if (LV.param("elev") === "1") elev(R); else laerer(R);
  });
})();
