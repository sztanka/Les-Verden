/* =========================================================
   Les verden – temaside
   Leser data/temaer/<id>.js og bygger siden:
   før du leser → fagtekst → sammendrag → oppgaver → koblet til → kilder.
   ========================================================= */

(function () {
  const LV = window.LV;

  // ---------- Tekster i grensesnittet (norsk/engelsk) ----------
  const TEKST = {
    nb: {
      forDuLeser: "Før du leser", duSkalLaere: "Dette skal du lære", startsporsmal: "Tenk før du leser",
      lesOpp: "Les opp hele teksten", stopp: "Stopp opplesing", lesAvsnitt: "Les opp",
      stoppOgTenk: "Stopp og tenk", sammendrag: "Lettlest sammendrag – trykk for å åpne",
      oppgaver: "Oppgaver", niva: "Nivå",
      nivaTekst: { 1: "Grunnleggende – start her.", 2: "Middels – du forklarer og ser sammenhenger.", 3: "Krevende – du sammenligner og drøfter." },
      typer: { finn: "Finn svar i teksten", forsta: "Forstå og forklar", diskuter: "Diskuter og reflekter" },
      partner: "Snakk med læringspartner", dittSvar: "Ditt svar",
      kobletTil: "Koblet til", kilder: "Les mer",
      innhold: "Innhold – trykk for å hoppe", del: "Del", tidslinje: "Tidslinje – de viktigste datoene",
      begrepsliste: "Begreper du skal kunne", tilToppen: "Til innholdslisten",
      personer: "Personer i temaet", allePersoner: "Se alle personene",
      navn: "Navn", kopier: "Kopier mine svar", slett: "Slett alle svar",
      kopiert: "Kopiert! Lim inn i dokumentet ditt.", ingenSvar: "Du har ikke skrevet noen svar ennå.",
      bekreftSlett: "Vil du slette alle svarene dine? Dette kan ikke angres.",
      ulagret: "Husk å kopiere svarene dine før du lukker siden.",
      kopiHode: { tema: "Tema", fag: "Fag", trinn: "trinn", dato: "Dato", svar: "Svar" },
      ingenStemme: "Fant ingen norsk stemme i nettleseren – teksten leses med en annen stemme."
    },
    en: {
      forDuLeser: "Before you read", duSkalLaere: "In this topic you will learn to", startsporsmal: "Think before you read",
      lesOpp: "Read the whole text aloud", stopp: "Stop reading", lesAvsnitt: "Read aloud",
      stoppOgTenk: "Stop and think", sammendrag: "Easy summary – click to open",
      oppgaver: "Tasks", niva: "Level",
      nivaTekst: { 1: "Basic – start here.", 2: "Intermediate – explain and find connections.", 3: "Advanced – compare and discuss." },
      typer: { finn: "Find the answer in the text", forsta: "Understand and explain", diskuter: "Discuss and reflect" },
      partner: "Talk to a learning partner", dittSvar: "Your answer",
      kobletTil: "Connected topics", kilder: "Read more",
      innhold: "Contents – click to jump", del: "Part", tidslinje: "Timeline – the key dates",
      begrepsliste: "Key terms", tilToppen: "Back to contents",
      personer: "People in this topic", allePersoner: "See all the people",
      navn: "Name", kopier: "Copy my answers", slett: "Delete all answers",
      kopiert: "Copied! Paste it into your document.", ingenSvar: "You haven't written any answers yet.",
      bekreftSlett: "Do you want to delete all your answers? This cannot be undone.",
      ulagret: "Remember to copy your answers before you close the page.",
      kopiHode: { tema: "Topic", fag: "Subject", trinn: "grade", dato: "Date", svar: "Answer" },
      ingenStemme: "No English voice found in this browser – another voice will be used."
    }
  };

  let T = TEKST.nb;
  let tema = null;
  let endretSidenKopi = false;

  // ---------- Tekstformatering ----------
  // [[ord]] eller [[visningstekst|nøkkel]] blir ordforklaring. **tekst** blir fet.
  let ordTeller = 0;
  function formater(tekst) {
    let html = LV.esc(tekst);
    html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    html = html.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, function (_, vis, nokkel) {
      const n = (nokkel || vis).trim();
      const forklaring = tema.ord && (tema.ord[n] || tema.ord[n.toLowerCase()]);
      if (!forklaring) return vis;
      const id = "ord-" + (++ordTeller);
      return '<span class="ord-wrap"><button type="button" class="ord" aria-expanded="false" aria-controls="' + id + '">' + vis + "</button>" +
        '<span class="ordforklaring" id="' + id + '" role="tooltip" hidden><strong>' + LV.esc(n) + "</strong>" + LV.esc(forklaring) + (tema.sprak === "en" ? "" : LV.morsmalHtml(n)) + "</span></span>";
    });
    return html;
  }
  function rentekst(tekst) {
    return String(tekst).replace(/\*\*(.+?)\*\*/g, "$1").replace(/\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g, "$1");
  }

  function svarfelt(nokkel, sporsmal, gruppe) {
    return '<label class="svar-etikett" for="svar-' + nokkel + '">' + T.dittSvar + "</label>" +
      '<textarea class="svar" id="svar-' + nokkel + '" data-sporsmal="' + LV.esc(sporsmal) + '" data-gruppe="' + LV.esc(gruppe) + '"></textarea>';
  }

  // ---------- Bygg siden ----------
  function bygg() {
    const fagKlasse = "fag-" + tema.fag;
    document.body.classList.add(fagKlasse);
    document.body.dataset.fag = tema.fag;
    document.documentElement.lang = tema.sprak === "en" ? "en" : "nb";
    document.title = tema.tittel + " – " + (LV.config ? LV.config.navn : "Les verden");

    const kat = LV.temaer.find(t => t.id === tema.id) || {};
    const emne = kat.emne && LV.emner[kat.emne];
    let h = "";
    h += '<nav class="brodsmuler" aria-label="Brødsmuler"><a href="index.html">Forside</a> › ' +
      '<a href="index.html?fag=' + tema.fag + '#temaer">' + LV.fagNavn[tema.fag] + "</a> › " +
      (emne ? '<a href="index.html?fag=' + tema.fag + "&emne=" + kat.emne + '#temaer">' + emne.navn + "</a> › " : "") +
      '<a href="index.html?fag=' + tema.fag + (emne ? "&emne=" + kat.emne : "") + "&trinn=" + tema.trinn + '#temaer">' + tema.trinn + ". trinn</a></nav>";

    if (LV.param("laerer") === "1" && tema.kontroller && tema.kontroller.length) {
      h += '<aside class="laerer-boks" lang="nb"><h2>For læreren: kontroller disse opplysningene</h2><ul>' +
        tema.kontroller.map(k => "<li>" + LV.esc(k) + "</li>").join("") + "</ul></aside>";
    }

    if (kat.bilde) {
      let kreditt = "";
      if (kat.kreditt) {
        const navn = kat.kredittUrl ? '<a href="' + LV.esc(kat.kredittUrl) + '" target="_blank" rel="noopener">' + LV.esc(kat.kreditt) + "</a>" : LV.esc(kat.kreditt);
        const kilde = kat.kilde ? " / " + (kat.kildeUrl ? '<a href="' + LV.esc(kat.kildeUrl) + '" target="_blank" rel="noopener">' + LV.esc(kat.kilde) + "</a>" : LV.esc(kat.kilde)) : "";
        kreditt = '<figcaption lang="nb">Foto: ' + navn + kilde + "</figcaption>";
      }
      h += '<figure class="temabilde"><img src="' + LV.esc(kat.bilde) + '" alt="' + LV.esc(kat.bildeAlt || "") + '">' + kreditt + "</figure>";
    }
    h += '<header class="temahode">' + LV.merker({ fag: tema.fag, emne: kat.emne, trinn: tema.trinn }) +
      "<h1>" + LV.esc(tema.tittel) + '</h1><p class="ingress">' + formater(tema.ingress) + "</p><!--AT-ANTALL--></header>";

    // Før du leser
    h += '<section class="boks for-du-leser" aria-labelledby="for-du-leser"><h2 id="for-du-leser">' + T.forDuLeser + "</h2>";
    if (tema.maal && tema.maal.length) {
      h += "<h3>" + T.duSkalLaere + "</h3><ul>" + tema.maal.map(m => "<li>" + formater(m) + "</li>").join("") + "</ul>";
    }
    if (tema.startsporsmal) {
      h += "<h3>" + T.startsporsmal + "</h3><p>" + formater(tema.startsporsmal) + "</p>" +
        svarfelt("start", rentekst(tema.startsporsmal), T.startsporsmal);
    }
    h += '<p class="ordbok-tips" lang="nb"><span aria-hidden="true">📖</span> Ukjent ord? Dobbeltklikk på ordet (eller hold fingeren på det på mobil) for å slå det opp i <a href="ordbok.html">ordboka</a>.</p>';
    h += "</section>";

    // Tekstnivå: lettere, vanlig eller utfordring (når temaet har «lett» eller «utfordring» i avsnittene)
    const harLett = tema.avsnitt.some(a => a.lett && a.lett.length);
    const harUtf = tema.avsnitt.some(a => a.utfordring && a.utfordring.length);
    const harNiva = harLett || harUtf;
    let niva = LV.param("tekst");
    if (!((niva === "lett" && harLett) || (niva === "utfordring" && harUtf))) niva = "vanlig";
    let lett = niva === "lett";
    if (harNiva) {
      const en = tema.sprak === "en";
      const knapp = (v, ikon, nb, eng) => '<button type="button" class="knapp liten" data-tekstniva="' + v + '" aria-pressed="' + (niva === v) + '">' + ikon + " " + (en ? eng : nb) + "</button>";
      h += '<div class="tekstniva" role="group" aria-label="' + (en ? "Text level" : "Tekstnivå") + '"><span class="etikett">' + (en ? "Text:" : "Tekst:") + "</span>" +
        (harLett ? knapp("lett", "🌱", "Lettere tekst", "Easier text") : "") + knapp("vanlig", "📄", "Vanlig tekst", "Standard text") + (harUtf ? knapp("utfordring", "🚀", "Utfordring", "Challenge") : "") +
        '<span class="tekstniva-info">' + (en ? (harLett ? "The easier text is shorter and uses simpler words. " : "") + (harUtf ? "The challenge text goes deeper, with more context, different interpretations and more advanced language. " : "") + "The tasks are the same."
          : (harLett ? "Den lettere teksten er kortere og har enklere ord. " : "") + (harUtf ? "Utfordringsteksten går dypere, med mer sammenheng, ulike tolkninger og et mer avansert språk. " : "") + "Oppgavene er de samme.") + "</span></div>";
    }

    // Forklar hvorfor-kort (elaborerende spørsmål etter hvert avsnitt)
    const hvorforPa = LV.param("hvorfor") === "1";
    {
      const en = tema.sprak === "en";
      h += '<div class="hvorfor-bryter"><button type="button" class="knapp liten" id="hvorfor-knapp" aria-pressed="' + hvorforPa + '">🤔 ' + (en ? "Explain why cards" : "Forklar hvorfor-kort") + '</button><span class="tekstniva-info">' + (en ? "Shows a short «explain why» question after each part. Explaining to yourself while you read helps you remember and understand." : "Viser et kort «forklar hvorfor»-spørsmål etter hver del. Å forklare for seg selv mens man leser, gir bedre forståelse og hukommelse.") + "</span></div>";
    }

    // Opplesing
    if ("speechSynthesis" in window) {
      h += '<div class="opplesing"><button class="knapp hoved" id="les-alt">▶ ' + T.lesOpp + '</button>' +
        '<button class="knapp" id="stopp-lesing" hidden>■ ' + T.stopp + '</button><span class="info" id="stemme-info"></span></div>';
    }

    // Innholdsliste (vises når teksten er lang eller delt i deler)
    const harDeler = tema.avsnitt.some(a => a.del);
    const delNr = {};
    let delTeller = 0;
    tema.avsnitt.forEach(a => { if (a.del && !(a.del in delNr)) delNr[a.del] = ++delTeller; });
    if (harDeler || tema.avsnitt.length >= 10) {
      h += '<details class="innholdsliste" id="innholdsliste" open><summary>' + T.innhold + "</summary>";
      let forrige = null, apen = false;
      h += harDeler ? "" : "<ol>";
      tema.avsnitt.forEach(function (a, i) {
        if (harDeler && a.del !== forrige) {
          if (apen) h += "</ol></li>";
          h += (forrige === null ? "<ol class=\"deler\">" : "") + '<li><a href="#del-' + delNr[a.del] + '"><strong>' + T.del + " " + delNr[a.del] + ":</strong> " + LV.esc(a.del) + "</a><ol>";
          apen = true; forrige = a.del;
        }
        h += '<li><a href="#avsnitt-' + i + '">' + LV.esc(a.tittel) + "</a></li>";
      });
      h += harDeler ? "</ol></li></ol>" : "</ol>";
      if (tema.tidslinje && tema.tidslinje.length) h += '<p class="snarvei"><a href="#tidslinje">→ ' + T.tidslinje + "</a></p>";
      h += "</details>";
    }

    // Fagtekst
    let stoppNr = 0;
    let forrigeDel = null;
    const htag = harDeler ? "h3" : "h2";
    h += '<article class="fagtekst' + (harDeler ? " med-deler" : "") + '" id="fagtekst">';
    tema.avsnitt.forEach(function (a, i) {
      if (harDeler && a.del && a.del !== forrigeDel) {
        forrigeDel = a.del;
        h += '<h2 class="del-tittel" id="del-' + delNr[a.del] + '"><span class="del-nr">' + T.del + " " + delNr[a.del] + "</span>" + LV.esc(a.del) +
          (delNr[a.del] > 1 ? ' <a class="til-toppen" href="#innholdsliste">↑ ' + T.tilToppen + "</a>" : "") + "</h2>";
      }
      h += '<section class="avsnitt" id="avsnitt-' + i + '" data-avsnitt="' + i + '"><' + htag + ">" + LV.esc(a.tittel) +
        ("speechSynthesis" in window ? ' <button type="button" class="les-avsnitt" data-les="' + i + '" aria-label="' + T.lesAvsnitt + ": " + LV.esc(a.tittel) + '">▶ ' + T.lesAvsnitt + "</button>" : "") +
        "</" + htag + ">";
      if (LV.bildeFigurer) h += LV.bildeFigurer("tema:" + tema.id + ":" + a.tittel, tema.sprak === "en" ? "en" : "nb");
      const aLett = !!(a.lett && a.lett.length), aUtf = !!(a.utfordring && a.utfordring.length), aVis = (niva === "lett" && aLett) ? "lett" : (niva === "utfordring" && aUtf) ? "utfordring" : "vanlig";
      if (aLett) h += '<div class="tekst-lett"' + (aVis === "lett" ? "" : " hidden") + ">" + a.lett.map(p => "<p>" + formater(p) + "</p>").join("") + "</div>";
      if (aUtf) h += '<div class="tekst-utfordring"' + (aVis === "utfordring" ? "" : " hidden") + ">" + a.utfordring.map(p => "<p>" + formater(p) + "</p>").join("") + "</div>";
      if (aLett || aUtf) h += '<div class="tekst-vanlig"' + (aVis === "vanlig" ? "" : " hidden") + ">";
      a.tekst.forEach(p => {
        // Et dikt skrives som { dikt: "linje 1\nlinje 2", kilde: "Forfatter, «Tittel» (år)" }
        if (p && typeof p === "object" && p.dikt) {
          h += '<figure class="dikt"><blockquote' + (tema.sprak === "en" ? ' lang="en"' : "") + ">" +
            p.dikt.split(/\n\n+/).map(strofe => "<p>" + strofe.split("\n").map(LV.esc).join("<br>") + "</p>").join("") +
            "</blockquote>" + (p.kilde ? "<figcaption>" + LV.esc(p.kilde) + "</figcaption>" : "") + "</figure>";
        } else {
          h += "<p>" + formater(p) + "</p>";
        }
      });
      if (aLett || aUtf) h += "</div>";
      h += "</section>";
      {
        const en = tema.sprak === "en", t = a.tittel;
        const MAL = en
          ? ["Why do you think things turned out as described in «%»? Explain in your own words.", "How is «%» connected to what you read in the part before?", "What might have happened if things had gone differently in «%»?", "Why is «%» important for understanding the whole topic?", "How can you connect «%» to something you know from before – from another topic or from your own life?", "Which word or idea in «%» is the most important – and why?"]
          : ["Hvorfor tror du det ble slik som beskrevet i «%»? Forklar med egne ord.", "Hvordan henger «%» sammen med det du leste i delen før?", "Hva kunne ha skjedd hvis det hadde gått annerledes i «%»?", "Hvorfor er «%» viktig for å forstå hele temaet?", "Hvordan kan du koble «%» til noe du vet fra før – fra et annet tema eller fra ditt eget liv?", "Hvilket ord eller hvilken idé i «%» er viktigst – og hvorfor?"];
        const spm = MAL[i % MAL.length].replace("%", t); // første avsnitt får alltid «hvorfor», siden det ikke finnes noen del før
        h += '<aside class="hvorfor"' + (hvorforPa ? "" : " hidden") + '><p class="hvorfor-tittel"><span aria-hidden="true">🤔</span> ' + (en ? "Explain why" : "Forklar hvorfor") + "</p><p>" + LV.esc(spm) + "</p>" + svarfelt("hvorfor-" + i, spm, en ? "Explain why" : "Forklar hvorfor") + "</aside>";
      }
      if (a.stoppOgTenk) {
        stoppNr++;
        h += '<aside class="stopp"><div class="tittel"><span aria-hidden="true">✋</span> ' + T.stoppOgTenk + LV.stoppMerke(a.stoppOgTenk, tema.sprak === "en") + "</div><p>" + formater(a.stoppOgTenk) + "</p>" +
          svarfelt("stopp-" + stoppNr, rentekst(a.stoppOgTenk), T.stoppOgTenk) + "</aside>";
      }
    });
    h += "</article>";

    // Tidslinje
    if (tema.tidslinje && tema.tidslinje.length) {
      h += '<section class="tidslinje" id="tidslinje" aria-labelledby="tidslinje-tittel"><h2 id="tidslinje-tittel">' + T.tidslinje + "</h2><ol>" +
        tema.tidslinje.map(t => '<li><span class="dato">' + LV.esc(t.dato) + '</span><span class="hendelse">' + formater(t.tekst) + "</span></li>").join("") +
        "</ol></section>";
    }

    // Personer
    if (tema.personer && tema.personer.length) {
      h += '<section class="personer-tema" aria-labelledby="personer-tittel"><h2 id="personer-tittel">' + T.personer + '</h2><div class="personkort-rad">' +
        tema.personer.map(p => LV.personkort(p)).join("") +
        '</div><p><a href="personer.html?fag=' + tema.fag + '" lang="nb">' + T.allePersoner + " →</a></p></section>";
    }

    // Begrepsliste
    if (tema.begrepsliste && tema.ord) {
      const nokler = Object.keys(tema.ord).sort((a, b) => a.localeCompare(b, "nb"));
      h += '<section class="begrepsliste" aria-labelledby="begreper-tittel"><h2 id="begreper-tittel">' + T.begrepsliste + "</h2><dl>" +
        nokler.map(k => "<div><dt>" + LV.esc(k) + (tema.sprak === "en" ? "" : LV.morsmalHtml(k)) + "</dt><dd>" + LV.esc(tema.ord[k]) + "</dd></div>").join("") + "</dl>" +
        (tema.sprak === "en" ? "" : '<p class="mm-lenke"><a href="morsmal.html">🌐 Begrepene på arabisk, ukrainsk, tyrkisk og polsk</a></p>') + "</section>";
    }

    // Sammendrag
    if (tema.sammendrag && tema.sammendrag.length) {
      h += '<details class="sammendrag" id="sammendrag"><summary>' + T.sammendrag + "</summary><ul>" +
        tema.sammendrag.map(s => "<li>" + formater(s) + "</li>").join("") + "</ul></details>";
    }

    // Oppgaver
    h += '<section class="oppgaver" id="oppgaver" aria-labelledby="oppgaver-tittel"><h2 id="oppgaver-tittel">' + T.oppgaver + "</h2>";
    h += '<div class="nivafaner" role="tablist" aria-label="' + T.oppgaver + '">';
    [1, 2, 3].forEach(n => {
      h += '<button class="knapp" role="tab" id="fane-' + n + '" aria-controls="niva-' + n + '" aria-selected="' + (n === 1) + '" tabindex="' + (n === 1 ? 0 : -1) + '">' + T.niva + " " + n + "</button>";
    });
    h += "</div>";
    [1, 2, 3].forEach(n => {
      const niva = (tema.oppgaver && tema.oppgaver[n]) || {};
      h += '<div class="nivapanel" role="tabpanel" id="niva-' + n + '" aria-labelledby="fane-' + n + '"' + (n === 1 ? "" : " hidden") + ">";
      h += '<p class="nivabeskrivelse">' + T.nivaTekst[n] + "</p>";
      let nr = 0;
      ["finn", "forsta", "diskuter"].forEach(type => {
        const liste = niva[type] || [];
        if (!liste.length) return;
        h += '<div class="oppgavegruppe"><h3>' + T.typer[type] + "</h3>";
        liste.forEach(o => {
          nr++;
          const tekst = typeof o === "string" ? o : o.tekst;
          const partner = typeof o === "object" && o.partner;
          const gruppe = T.niva + " " + n + " – " + T.typer[type];
          h += '<div class="oppgave"><p class="sporsmal"><span class="nr">' + nr + ".</span>" + formater(tekst) +
            (partner ? '<span class="partner">' + T.partner + "</span>" : "") + "</p>" +
            svarfelt("o" + n + "-" + type + "-" + nr, nr + ". " + rentekst(tekst), gruppe) + "</div>";
        });
        h += "</div>";
      });
      h += "</div>";
    });
    h += "</section>";

    // Hva har jeg lært? Egenvurdering, avslutningslapp og vurderingskriterier
    {
      const en = tema.sprak === "en";
      const E = en ? {
        tittel: "What have I learned?", intro: "Think about the learning goals for this topic. How well can you do this now? Be honest – this helps you and your teacher.",
        valg: ["Not yet", "Partly", "Yes, well"], kanJeg: "I can …", exit: "Exit ticket", exitIntro: "Answer in one or two sentences.",
        exitSp: ["The most important thing I learned:", "Something I still wonder about:", "One thing I want to tell someone else:"],
        krit: "Assessment criteria (suggestion)", kritIntro: "This is what your teacher may look for when you show what you have learned – in writing or orally.",
        nivaa: ["Low", "Medium", "High"], gruppe: "Self-assessment",
        rader: [
          ["Knowledge and terms", "uses a few terms from the topic, sometimes incorrectly", "uses key terms correctly, for example " + "%B%", "uses many terms precisely and explains them in own words"],
          ["Understanding", "retells some facts from the text", "explains causes and consequences with examples", "sees connections across topics and between past and present"],
          ["Reflection and discussion", "gives an opinion with a simple reason", "gives reasons and shows more than one point of view", "discusses different perspectives and draws a well-founded conclusion"],
          ["Language and structure", "short answers, many errors that make it hard to understand", "clear structure, mostly correct English with some variation", "fluent, varied and precise English with a clear structure"]
        ]
      } : {
        tittel: "Hva har jeg lært?", intro: "Tenk over læringsmålene for temaet. Hvor godt kan du dette nå? Vær ærlig – det hjelper både deg og læreren.",
        valg: ["Ikke ennå", "Delvis", "Ja, godt"], kanJeg: "Jeg kan …", exit: "Avslutningslapp", exitIntro: "Svar med én eller to setninger.",
        exitSp: ["Det viktigste jeg lærte:", "Noe jeg fortsatt lurer på:", "Én ting jeg vil fortelle videre til noen:"],
        krit: "Vurderingskriterier (forslag)", kritIntro: "Dette kan læreren se etter når du viser hva du har lært – skriftlig eller muntlig.",
        nivaa: ["Lav", "Middels", "Høy"], gruppe: "Egenvurdering",
        rader: [
          ["Fagkunnskap og begreper", "bruker noen få begreper fra temaet, av og til feil", "bruker sentrale begreper riktig, for eksempel %B%", "bruker mange begreper presist og forklarer dem med egne ord"],
          ["Forståelse og sammenhenger", "gjengir noen fakta fra teksten", "forklarer årsaker og konsekvenser med eksempler", "ser sammenhenger mellom temaer og mellom fortid, nåtid og framtid"],
          ["Refleksjon og drøfting", "sier hva han eller hun mener, med en enkel begrunnelse", "begrunner meningene sine og viser mer enn ett perspektiv", "drøfter ulike perspektiver og kommer fram til en godt begrunnet konklusjon"],
          ["Kilder og kildebruk", "bruker fagteksten, men oppgir ikke kilder", "bruker flere kilder og oppgir dem", "vurderer hvor pålitelige kildene er, og bruker dem kritisk"]
        ]
      };
      const begreper = Object.keys(tema.ord || {}).slice(0, 3).map(b => "«" + b + "»").join(", ");
      h += '<section class="egenvurdering" id="egenvurdering" aria-labelledby="ev-tittel"><h2 id="ev-tittel">🎯 ' + E.tittel + '</h2>';
      if (tema.maal && tema.maal.length) {
        h += '<p class="ev-intro">' + E.intro + '</p><ul class="ev-liste" data-gruppe="' + LV.esc(E.gruppe) + '">' + tema.maal.map((m, i) =>
          '<li><fieldset><legend><span class="ev-kan">' + E.kanJeg + "</span> " + formater(m) + '</legend><div class="ev-valg">' + E.valg.map((v, j) =>
            '<label><input type="radio" name="ev-' + i + '" id="ev-' + i + "-" + j + '" value="' + j + '" data-maal="' + LV.esc(rentekst(m)) + '" data-tekst="' + LV.esc(v) + '"> <span>' + ["🌱", "🌿", "🌳"][j] + " " + v + "</span></label>").join("") + "</div></fieldset></li>").join("") + "</ul>";
      }
      h += "<h3>" + E.exit + '</h3><p class="ev-intro">' + E.exitIntro + '</p><ol class="ev-exit">' + E.exitSp.map((s, i) => "<li><p>" + s + "</p>" + svarfelt("exit-" + i, s, E.exit) + "</li>").join("") + "</ol>" +
        '<p class="ev-intro" lang="nb">For læreren: <a href="exit.html?v=maal&amp;tema=' + encodeURIComponent(tema.id) + '">Lag exit ticket for hele klassen</a> – til storskjerm, utskrift eller digitalt.</p>';
      h += '<details class="ev-krit"><summary>📋 ' + E.krit + '</summary><p class="ev-intro">' + E.kritIntro + '</p><div class="ev-tabell"><table><thead><tr><th scope="col"></th>' + E.nivaa.map(n => '<th scope="col">' + n + "</th>").join("") + "</tr></thead><tbody>" +
        E.rader.map(r => '<tr><th scope="row">' + r[0] + "</th>" + r.slice(1).map(c => "<td>" + LV.esc(c.replace("%B%", begreper || (en ? "the key terms" : "nøkkelbegrepene"))) + "</td>").join("") + "</tr>").join("") + "</tbody></table></div></details></section>";
    }

    // Alt om temaet: alle aktiviteter som hører til temaet, samlet i grupper
    // (data/aktiviteter.js lages av verktoy/lag-aktiviteter.mjs; resten hentes fra temaet selv)
    {
      const A = LV.temaAktiviteter(tema), G = A.G, spill = A.spill, en = A.en, id = A.id;
      const grupper = [
        ["les", "📖", en ? "Read, listen and watch" : "Les, lytt og se"],
        ["ov", "🎮", en ? "Play and practise" : "Spill og øv"],
        ["tenk", "🧠", en ? "Think, discuss and role-play" : "Tenk, diskuter og spill rollespill"],
        ["skriv", "✍️", en ? "Speak and write" : "Snakk og skriv"],
        ["klasse", "👩‍🏫", en ? "With the whole class" : "Med hele klassen"]
      ];
      const antall = Object.values(G).reduce((s, l) => s + l.length, 0) + spill.length;
      const lenke = a => '<li><a href="' + a[1] + '"><span class="at-ikon" aria-hidden="true">' + a[2] + '</span><span><strong' + (a[5] ? ' lang="' + a[5] + '"' : "") + ">" + LV.esc(a[3]) + "</strong><small>" + LV.esc(a[4]) + "</small></span></a></li>";
      h += '<section class="alt-tema" id="alt-om-temaet" aria-labelledby="at-tittel"><h2 id="at-tittel">🧭 ' + (en ? "Everything for this topic" : "Alt om temaet") + '</h2><p class="at-intro">' +
        (en ? antall + " activities on Les verden that go with «" + LV.esc(tema.tittel) + "»." : antall + " aktiviteter på Les verden som hører til «" + LV.esc(tema.tittel) + "».") + '</p><div class="at-grupper">' +
        grupper.map(g => {
          const liste = G[g[0]];
          if (!liste.length && !(g[0] === "ov" && spill.length)) return "";
          return '<div class="at-gruppe at-' + g[0] + '"><h3><span aria-hidden="true">' + g[1] + "</span> " + g[2] + "</h3>" +
            (g[0] === "ov" && spill.length ? '<ul class="spillknapper">' + spill.map(x => '<li><a class="knapp liten" href="spill.html?spill=' + x[0] + "&amp;tema=" + id + '"><span aria-hidden="true">' + x[1] + "</span> " + x[2] + "</a></li>").join("") + "</ul>" : "") +
            (liste.length ? '<ul class="at-liste">' + liste.map(lenke).join("") + "</ul>" : "") + "</div>";
        }).join("") + "</div></section>";
      h = h.replace("<!--AT-ANTALL-->", '<p class="at-snarvei"><a href="#alt-om-temaet"><span aria-hidden="true">🧭</span> ' + (en ? "Everything for this topic: " + antall + " activities" : "Alt om temaet: " + antall + " aktiviteter") + ' <span aria-hidden="true">↓</span></a></p>');
    }
    // Koblet til
    const koblet = (tema.kobletTil || []).map(id => LV.temaer.find(t => t.id === id)).filter(Boolean);
    if (koblet.length) {
      h += "<section><h2>" + T.kobletTil + '</h2><ul class="temaliste">' +
        koblet.map(t => '<li><a class="temakort fag-' + t.fag + '" href="tema.html?id=' + encodeURIComponent(t.id) + '">' +
          LV.merker(t) +
          "<h3>" + LV.esc(t.tittel) + "</h3><p>" + LV.esc(t.kort) + "</p></a></li>").join("") + "</ul></section>";
    }

    // Kilder
    h += LV.kmBoks(tema.id);
    if (tema.kilder && tema.kilder.length) {
      h += "<section><h2>" + T.kilder + '</h2><ul class="kilder">' +
        tema.kilder.map(k => '<li><a href="' + LV.esc(k.url) + '" target="_blank" rel="noopener">' + LV.esc(k.tittel) + "</a></li>").join("") + "</ul></section>";
    }

    const main = document.getElementById("innhold");
    main.innerHTML = h;
    document.querySelectorAll(".hovedmeny a").forEach(a => {
      if (a.getAttribute("href") === "index.html?fag=" + tema.fag) a.setAttribute("aria-current", "page");
    });

    // Svarlinje
    const linje = document.createElement("div");
    linje.className = "svarlinje";
    linje.innerHTML = '<div class="svarlinje-indre">' +
      '<label class="skjult-visuelt" for="elevnavn">' + T.navn + "</label>" +
      '<input id="elevnavn" type="text" placeholder="' + T.navn + '" autocomplete="off">' +
      '<button class="knapp hoved" id="kopier">' + T.kopier + "</button>" +
      '<button class="knapp fare" id="slett">' + T.slett + "</button>" +
      '<span class="status" id="status" role="status" aria-live="polite"></span></div>';
    document.body.appendChild(linje);

    // Forklar hvorfor-kort av/på
    const hk = document.getElementById("hvorfor-knapp");
    if (hk) hk.addEventListener("click", () => {
      const pa = hk.getAttribute("aria-pressed") !== "true";
      hk.setAttribute("aria-pressed", String(pa));
      document.querySelectorAll(".hvorfor").forEach(x => { x.hidden = !pa; });
      const q = new URLSearchParams(location.search); if (pa) q.set("hvorfor", "1"); else q.delete("hvorfor");
      history.replaceState(null, "", "tema.html?" + q + location.hash);
      if (pa) { const f = document.querySelector(".hvorfor"); if (f) f.scrollIntoView({ block: "nearest" }); }
    });

    // Bytt tekstnivå. Mangler et avsnitt det valgte nivået, vises vanlig tekst.
    document.body.classList.toggle("lett-tekst", niva === "lett");
    document.body.classList.toggle("utfordring-tekst", niva === "utfordring");
    document.querySelectorAll("[data-tekstniva]").forEach(b => b.addEventListener("click", () => {
      niva = b.dataset.tekstniva; lett = niva === "lett";
      document.body.classList.toggle("lett-tekst", niva === "lett");
      document.body.classList.toggle("utfordring-tekst", niva === "utfordring");
      document.querySelectorAll("[data-tekstniva]").forEach(x => x.setAttribute("aria-pressed", String(x === b)));
      document.querySelectorAll(".avsnitt").forEach(sek => {
        const l = sek.querySelector(":scope > .tekst-lett"), u = sek.querySelector(":scope > .tekst-utfordring"), v = sek.querySelector(":scope > .tekst-vanlig");
        if (!v) return;
        const vis = (niva === "lett" && l) ? l : (niva === "utfordring" && u) ? u : v;
        [l, u, v].forEach(x => { if (x) x.hidden = x !== vis; });
      });
      const q = new URLSearchParams(location.search); if (niva !== "vanlig") q.set("tekst", niva); else q.delete("tekst");
      history.replaceState(null, "", "tema.html?" + q + location.hash);
    }));
    kobleOrdforklaringer();
    kobleFaner();
    kobleSvar();
    kobleOpplesing();
  }

  // ---------- Ordforklaringer ----------
  function lukkAlleOrd(unntak) {
    document.querySelectorAll(".ord[aria-expanded='true']").forEach(b => {
      if (b === unntak) return;
      b.setAttribute("aria-expanded", "false");
      document.getElementById(b.getAttribute("aria-controls")).hidden = true;
    });
  }
  function kobleOrdforklaringer() {
    document.addEventListener("click", function (e) {
      const knapp = e.target.closest(".ord");
      if (!knapp) { if (!e.target.closest(".ordforklaring")) lukkAlleOrd(); return; }
      const boks = document.getElementById(knapp.getAttribute("aria-controls"));
      const apne = knapp.getAttribute("aria-expanded") !== "true";
      lukkAlleOrd(knapp);
      knapp.setAttribute("aria-expanded", String(apne));
      boks.hidden = !apne;
      if (apne) {
        boks.style.left = "0px";
        const r = boks.getBoundingClientRect();
        if (r.right > window.innerWidth - 8) boks.style.left = (window.innerWidth - 8 - r.right) + "px";
      }
    });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") lukkAlleOrd(); });
  }

  // ---------- Nivåfaner ----------
  function kobleFaner() {
    const faner = Array.from(document.querySelectorAll('[role="tab"]'));
    function velg(fane) {
      faner.forEach(f => {
        const valgt = f === fane;
        f.setAttribute("aria-selected", String(valgt));
        f.tabIndex = valgt ? 0 : -1;
        document.getElementById(f.getAttribute("aria-controls")).hidden = !valgt;
      });
    }
    faner.forEach((f, i) => {
      f.addEventListener("click", () => velg(f));
      f.addEventListener("keydown", e => {
        if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
          const neste = faner[(i + (e.key === "ArrowRight" ? 1 : faner.length - 1)) % faner.length];
          velg(neste); neste.focus();
        }
      });
    });
  }

  // ---------- Svar: kopier og slett ----------
  function datoTekst() {
    const d = new Date();
    return String(d.getDate()).padStart(2, "0") + "." + String(d.getMonth() + 1).padStart(2, "0") + "." + d.getFullYear();
  }

  function byggKopitekst() {
    const felt = Array.from(document.querySelectorAll("textarea.svar")).filter(t => t.value.trim());
    const ev = Array.from(document.querySelectorAll(".ev-liste input:checked"));
    if (!felt.length && !ev.length) return null;
    const navn = document.getElementById("elevnavn").value.trim();
    const H = T.kopiHode;
    const linjer = [];
    if (navn) linjer.push(T.navn + ": " + navn);
    linjer.push(H.tema + ": " + tema.tittel + " (" + LV.fagNavn[tema.fag] + ", " + tema.trinn + ". " + H.trinn + ")");
    linjer.push(H.dato + ": " + datoTekst());
    if (ev.length) {
      linjer.push("", document.querySelector(".ev-liste").dataset.gruppe.toUpperCase());
      ev.forEach(r => linjer.push("• " + r.dataset.maal + ": " + r.dataset.tekst));
    }
    let forrigeGruppe = null;
    felt.forEach(t => {
      if (t.dataset.gruppe !== forrigeGruppe) {
        linjer.push("", t.dataset.gruppe.toUpperCase());
        forrigeGruppe = t.dataset.gruppe;
      }
      linjer.push(t.dataset.sporsmal, H.svar + ": " + t.value.trim(), "");
    });
    return linjer.join("\n").replace(/\n{3,}/g, "\n\n").trim() + "\n";
  }

  async function kopierTekst(tekst) {
    try {
      await navigator.clipboard.writeText(tekst);
      return true;
    } catch (e) {
      const ta = document.createElement("textarea");
      ta.value = tekst;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      let ok = false;
      try { ok = document.execCommand("copy"); } catch (e2) { ok = false; }
      ta.remove();
      return ok;
    }
  }

  function visStatus(tekst, ok) {
    const s = document.getElementById("status");
    s.textContent = tekst;
    s.classList.toggle("ok", !!ok);
  }

  function kobleSvar() {
    document.addEventListener("input", e => {
      if (e.target.matches("textarea.svar, .ev-liste input")) { endretSidenKopi = true; visStatus(""); }
    });

    document.getElementById("kopier").addEventListener("click", async () => {
      const tekst = byggKopitekst();
      if (!tekst) { visStatus(T.ingenSvar); return; }
      const ok = await kopierTekst(tekst);
      if (ok) { endretSidenKopi = false; visStatus(T.kopiert, true); }
      else {
        // Siste utvei: vis teksten så eleven kan markere og kopiere selv
        window.prompt("Ctrl+C / Cmd+C", tekst);
      }
    });

    document.getElementById("slett").addEventListener("click", () => {
      if (!confirm(T.bekreftSlett)) return;
      document.querySelectorAll("textarea.svar").forEach(t => { t.value = ""; });
      document.querySelectorAll(".ev-liste input").forEach(r => { r.checked = false; });
      endretSidenKopi = false;
      visStatus("");
    });

    window.addEventListener("beforeunload", e => {
      if (!endretSidenKopi) return;
      e.preventDefault();
      e.returnValue = T.ulagret;
      return T.ulagret;
    });
  }

  // ---------- Opplesing ----------
  function kobleOpplesing() {
    if (!("speechSynthesis" in window)) return;
    const synth = window.speechSynthesis;
    const lang = tema.sprak === "en" ? "en-GB" : "nb-NO";
    const altKnapp = document.getElementById("les-alt");
    const stoppKnapp = document.getElementById("stopp-lesing");
    let markert = null;

    function stemme() {
      const alle = synth.getVoices();
      const prefiks = tema.sprak === "en" ? ["en-GB", "en"] : ["nb", "no", "nn"];
      for (const p of prefiks) {
        const v = alle.find(v => v.lang && v.lang.toLowerCase().startsWith(p.toLowerCase()));
        if (v) return v;
      }
      return null;
    }

    function avslutt() {
      synth.cancel();
      if (markert) markert.classList.remove("leses-na");
      markert = null;
      stoppKnapp.hidden = true;
      altKnapp.hidden = false;
    }

    function lesAvsnitt(indekser) {
      synth.cancel();
      const v = stemme();
      document.getElementById("stemme-info").textContent = v ? "" : T.ingenStemme;
      altKnapp.hidden = true;
      stoppKnapp.hidden = false;
      const ko = [];
      indekser.forEach(i => {
        const a = tema.avsnitt[i];
        const seksjon = document.querySelector('[data-avsnitt="' + i + '"]');
        ko.push({ tekst: a.tittel, el: seksjon });
        const lettNa = a.lett && a.lett.length && document.body.classList.contains("lett-tekst");
        const utfNa = a.utfordring && a.utfordring.length && document.body.classList.contains("utfordring-tekst");
        (lettNa ? a.lett : utfNa ? a.utfordring : a.tekst).forEach(p => ko.push({ tekst: (p && p.dikt) ? p.dikt.replace(/\n+/g, " ") : rentekst(p), el: seksjon }));
      });
      // Hvert avsnitt leses for seg – lange tekster kuttes ellers av enkelte nettlesere
      ko.forEach((del, n) => {
        const u = new SpeechSynthesisUtterance(del.tekst);
        u.lang = lang;
        if (v) u.voice = v;
        u.rate = 0.95;
        u.onstart = () => {
          if (markert !== del.el) {
            if (markert) markert.classList.remove("leses-na");
            markert = del.el;
            markert.classList.add("leses-na");
          }
        };
        if (n === ko.length - 1) u.onend = avslutt;
        synth.speak(u);
      });
    }

    altKnapp.addEventListener("click", () => lesAvsnitt(tema.avsnitt.map((_, i) => i)));
    stoppKnapp.addEventListener("click", avslutt);
    document.querySelectorAll("[data-les]").forEach(b =>
      b.addEventListener("click", () => lesAvsnitt([Number(b.dataset.les)])));
    window.addEventListener("pagehide", () => synth.cancel());
    if (synth.onvoiceschanged !== undefined) synth.onvoiceschanged = stemme;
  }

  // ---------- Start ----------
  document.addEventListener("DOMContentLoaded", async function () {
    const main = document.getElementById("innhold");
    const id = LV.param("id");
    const finnes = LV.temaer.find(t => t.id === id);
    if (!finnes) {
      main.innerHTML = '<p class="melding">Fant ikke temaet. <a href="index.html">Gå til forsiden</a>.</p>';
      return;
    }
    try {
      await LV.lastSkript("data/temaer/" + finnes.id + ".js");
      tema = LV.tema;
      if (!tema || tema.id !== finnes.id) throw new Error("Temafilen har feil id");
      T = TEKST[tema.sprak === "en" ? "en" : "nb"];
      bygg();
    } catch (e) {
      main.innerHTML = '<p class="melding">Kunne ikke laste temaet (' + LV.esc(e.message) + "). " +
        '<a href="index.html">Gå til forsiden</a>.</p>';
    }
  });
})();
