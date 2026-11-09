/* =========================================================
   Les verden – Lateral lesing (lateral.html)
   Faktasjekkere leser ikke en ukjent nettside grundig først –
   de forlater den og søker etter hvem som står bak.
   Fem oppdiktede saker med simulerte søk og søkeresultater.
   Bygger på «Civic Online Reasoning» (Stanford).
   Alt er oppdiktet. Ingenting lagres.
   ========================================================= */
(function () {
  const LV = window.LV;
  const $ = id => document.getElementById(id);
  const esc = s => LV.esc(String(s == null ? "" : s));

  const SAKER = [
    { id: "sukker", sp: "nb", side: { navn: "Senter for trygg mat", adresse: "tryggmat-senteret.no", tittel: "Ny rapport: Sukkeravgift virker ikke", tekst: "Forskere ved Senter for trygg mat har gått gjennom tall fra flere land. Konklusjonen er klar: Avgifter på brus og godteri gjør ikke folk sunnere – de rammer bare familier med dårlig råd.", pynt: "🍎 Uavhengig · Kunnskapsbasert · Siden 2009" },
      sok: [["Senter for trygg mat", true], ["sukkeravgift virker ikke", false], ["tryggmat-senteret.no om oss", false]],
      treff: [
        { tittel: "Senter for trygg mat – Nettleksikon", adresse: "nettleksikon.no", tekst: "Senter for trygg mat er en interesseorganisasjon som finansieres av flere store produsenter av brus, snacks og godteri. Senteret har gitt ut flere rapporter mot avgifter på sukker.", viktig: true },
        { tittel: "Bransjen står bak «uavhengig» matsenter", adresse: "dagsavisa-nord.no", tekst: "Gjennomgang viser at over 80 prosent av inntektene kommer fra matindustrien.", viktig: true },
        { tittel: "Om oss – Senter for trygg mat", adresse: "tryggmat-senteret.no", tekst: "Vi er et uavhengig kunnskapssenter som jobber for trygg og god mat for alle." }
      ],
      svar: "delvis", forklaring: "Senteret kaller seg uavhengig, men blir finansiert av bransjen som taper på en sukkeravgift. Det betyr ikke automatisk at rapporten er feil, men du bør være skeptisk og sjekke hva uavhengige forskere sier. Legg merke til at senterets egen «Om oss»-side ikke forteller hvem som betaler." },
    { id: "hunder", sp: "nb", side: { navn: "Fjordvik Tidende", adresse: "fjordviktidende.no", tittel: "Kommunen forbyr hunder i sentrum fra 1. april", tekst: "Fjordvik kommune vil gjøre sentrum hundefritt. – Vi har fått mange klager på bjeffing, sier ordføreren. Hundeeiere som bryter forbudet, må betale 5000 kroner i bot.", pynt: "📰 Nyheter fra Fjordvik og omegn" },
      sok: [["Fjordvik Tidende", true], ["hundeforbud Fjordvik sentrum", false], ["fjordviktidende.no", false]],
      treff: [
        { tittel: "Fjordvik Tidende – Nettleksikon", adresse: "nettleksikon.no", tekst: "Fjordvik Tidende er et humornettsted som lager oppdiktede nyheter om den lille byen Fjordvik. Nettstedet skriver selv at alle saker er satire.", viktig: true },
        { tittel: "Nei, Fjordvik forbyr ikke hunder", adresse: "faktasjekk-nord.no", tekst: "Kommunen bekrefter at saken er oppdiktet. Den ble delt over 2000 ganger før den ble avslørt.", viktig: true },
        { tittel: "Hundeparker i Fjordvik", adresse: "fjordvik.kommune.no", tekst: "Oversikt over hundeparker og regler for bånd i sentrum." }
      ],
      svar: "ikke", forklaring: "Fjordvik Tidende er satire – oppdiktede saker ment som humor. Satire er ikke løgn i seg selv, men den blir desinformasjon når folk deler den som om den var sann. Et raskt søk på navnet avslører det." },
    { id: "ekspert", sp: "nb", side: { navn: "Dr. Henrik Moe", adresse: "drmoe-helse.no", tittel: "Mobilen i lomma skader hukommelsen din", tekst: "Som doktor har jeg sett hundrevis av unge med dårlig hukommelse. Stråling fra mobilen i lomma er årsaken. Heldigvis finnes det en løsning: mitt strålingsfilter til 499 kroner.", pynt: "👨‍⚕️ Ekspert · Over 20 års erfaring" },
      sok: [["Henrik Moe doktor", true], ["mobilstråling hukommelse", false], ["strålingsfilter 499", false]],
      treff: [
        { tittel: "Henrik Moe – livsstilscoach og gründer", adresse: "naringsregister-nord.no", tekst: "Henrik Moe har en doktorgrad i markedsføring og driver et firma som selger strålingsfiltre og kosttilskudd.", viktig: true },
        { tittel: "Hva sier forskningen om mobilstråling?", adresse: "helsebiblioteket-nord.no", tekst: "Forskere har ikke funnet at strålingen fra vanlig mobilbruk svekker hukommelsen.", viktig: true },
        { tittel: "Kjøp strålingsfilter – Dr. Moe", adresse: "drmoe-helse.no/butikk", tekst: "Beskytt hjernen din i dag. Fri frakt over 400 kroner." }
      ],
      svar: "ikke", forklaring: "«Dr.» betyr bare at han har en doktorgrad – her i markedsføring, ikke i medisin. Han tjener dessuten penger på produktet han anbefaler. Se etter om eksperten er ekspert på akkurat dette, og om hen har økonomiske interesser." },
    { id: "vann", sp: "nb", side: { navn: "Nasjonalt kunnskapssenter for vannkvalitet", adresse: "vannkvalitet-nks.no", tittel: "Råd: Kok vannet i Fjordvik i en uke", tekst: "Etter rørbruddet i Fjordvik har vi funnet bakterier i noen av prøvene. Vi anbefaler at innbyggerne koker drikkevannet til nye prøver viser at vannet er trygt.", pynt: "💧 Fakta om drikkevann" },
      sok: [["Nasjonalt kunnskapssenter for vannkvalitet", true], ["kok vannet Fjordvik", false], ["vannkvalitet-nks.no", false]],
      treff: [
        { tittel: "Nasjonalt kunnskapssenter for vannkvalitet – Nettleksikon", adresse: "nettleksikon.no", tekst: "Et statlig fagorgan som overvåker drikkevann og gir råd til kommunene. Det blir ledet av forskere og ingeniører.", viktig: true },
        { tittel: "Fjordvik: Kok vannet etter rørbrudd", adresse: "dagsavisa-nord.no", tekst: "Kommunen og kunnskapssenteret ber innbyggerne koke vannet. Flere uavhengige medier har omtalt saken.", viktig: true },
        { tittel: "Spørsmål og svar om drikkevann", adresse: "fjordvik.kommune.no", tekst: "Kommunen viser til rådene fra kunnskapssenteret." }
      ],
      svar: "troverdig", forklaring: "Et raskt søk viser at avsenderen er et offentlig fagorgan, og at flere uavhengige kilder sier det samme. Lateral lesing handler ikke bare om å avsløre falske kilder – det hjelper deg også å finne ut når du kan stole på noe." },
    { id: "ocean", sp: "en", side: { navn: "The Ocean Truth Project", adresse: "oceantruthproject.org", tittel: "Plastic in the ocean: the problem is exaggerated", tekst: "Our scientists have looked at the numbers. Most plastic in the sea comes from a few countries, and new bans in Europe will cost jobs without helping the ocean. It is time for facts, not panic.", pynt: "🌊 Science · Facts · Ocean" },
      sok: [["The Ocean Truth Project", true], ["plastic in the ocean exaggerated", false], ["oceantruthproject.org about", false]],
      treff: [
        { tittel: "The Ocean Truth Project – Online Encyclopedia", adresse: "online-encyclopedia.org", tekst: "The Ocean Truth Project is a lobby group funded by the Global Polymer Council, an association of plastic producers.", viktig: true },
        { tittel: "Who is behind the «ocean truth»?", adresse: "factcheck-north.org", tekst: "The group has campaigned against bans on single-use plastic in several countries.", viktig: true },
        { tittel: "About us – The Ocean Truth Project", adresse: "oceantruthproject.org", tekst: "We are scientists and citizens who love the ocean and want honest facts." }
      ],
      svar: "delvis", forklaring: "The group is funded by plastic producers, who would lose money from new bans. Some of their facts may be correct, but the way they are presented serves the industry. Check what independent scientists say." }
  ];
  const TX = {
    nb: { forst: "1. Hva gjør du først?", forstValg: [["les", "Leser siden grundig og ser om den virker seriøs"], ["om", "Klikker på «Om oss» på siden"], ["lateral", "Åpner en ny fane og søker etter hvem som står bak"]], sok: "2. Hva søker du på?", resultat: "3. Søkeresultater – trykk på treffene du vil lese", konk: "4. Hva er din konklusjon?", konkValg: [["troverdig", "Troverdig"], ["delvis", "Vær skeptisk – sjekk andre kilder"], ["ikke", "Ikke troverdig"]], begrunn: "Begrunn med det du fant", sjekk: "Sjekk konklusjonen", neste: "Neste sak →", ny: "Ny fane", sokeknapp: "Søk" },
    en: { forst: "1. What do you do first?", forstValg: [["les", "Read the page carefully to see if it looks serious"], ["om", "Click «About us» on the page"], ["lateral", "Open a new tab and search for who is behind it"]], sok: "2. What do you search for?", resultat: "3. Search results – tap the ones you want to read", konk: "4. What is your conclusion?", konkValg: [["troverdig", "Trustworthy"], ["delvis", "Be sceptical – check other sources"], ["ikke", "Not trustworthy"]], begrunn: "Explain using what you found", sjekk: "Check your conclusion", neste: "Next case →", ny: "New tab", sokeknapp: "Search" }
  };
  const FORST_SVAR = {
    les: "Mange gjør dette – men nettsider kan se svært seriøse ut uten å være det. Profesjonelle faktasjekkere bruker ikke tid på å lese en ukjent side grundig før de vet hvem som står bak.",
    om: "«Om oss» er skrevet av avsenderen selv, og forteller bare det de vil at du skal vite. Det er bedre å sjekke hva andre sier om avsenderen.",
    lateral: "Riktig! Dette er lateral lesing: Du forlater siden og finner ut hva andre sier om avsenderen. Det tar ofte under ett minutt."
  };

  document.addEventListener("DOMContentLoaded", () => {
    document.title = "Lateral lesing – " + (LV.config ? LV.config.navn : "Les verden");
    const hode = '<nav class="brodsmuler" aria-label="Brødsmuler"><a href="index.html">Forside</a> › <a href="kildedetektiv.html">Kilder</a> › Lateral lesing</nav>';
    let nr = -1, poeng = 0;
    function start() {
      $("innhold").innerHTML = hode +
        '<header class="sidehode"><p class="overlinje">Kildekritikk på nett</p><h1>↔️ Lateral lesing</h1><p class="ingress">Hvordan sjekker profesjonelle faktasjekkere en ukjent nettside? De leser den ikke grundig – de forlater den med en gang, åpner en ny fane og søker etter hvem som står bak. Det kalles lateral lesing (å lese «sidelengs»). Her øver du på det med fem oppdiktede nettsider.</p></header>' +
        '<div class="ka-metode"><h2>Tre spørsmål til en ukjent kilde</h2><ol><li><strong>Hvem står bak?</strong> Søk på navnet – ikke stol på «Om oss».</li><li><strong>Hva er beviset?</strong> Hva bygger påstanden på?</li><li><strong>Hva sier andre kilder?</strong> Finnes det uavhengige kilder som bekrefter det?</li></ol><p>Tips: Ikke klikk på det første søketreffet. Les sammendragene og velg det som ser mest uavhengig ut.</p></div>' +
        '<div class="lp-viktig"><p><strong>Alt er oppdiktet:</strong> nettsidene, organisasjonene, personene og søkeresultatene.</p></div>' +
        '<p><button type="button" class="knapp hoved" id="la-start">Start →</button></p>' +
        '<p class="fo-merk">Til læreren: Øvelsen bygger på forskning fra Stanford History Education Group / Digital Inquiry Group (<span lang="en">Civic Online Reasoning</span>), som viste at profesjonelle faktasjekkere vurderte kilder raskere og bedre enn både studenter og professorer – fordi de leste lateralt. Gjør gjerne en ekte øvelse etterpå: Velg en organisasjon som er i nyhetene, og søk lateralt i fellesskap.</p>';
      $("la-start").addEventListener("click", () => { nr = 0; poeng = 0; sak(); });
    }
    function sak() {
      if (nr >= SAKER.length) { slutt(); return; }
      const S = SAKER[nr], T = TX[S.sp], lang = S.sp === "en" ? ' lang="en"' : "";
      $("innhold").innerHTML = hode + '<p class="la-teller">Sak ' + (nr + 1) + " av " + SAKER.length + "</p>" +
        '<div class="la-nettleser" aria-label="Nettsiden du har kommet til"' + lang + '><div class="la-adresse"><span aria-hidden="true">🔒</span> ' + esc(S.side.adresse) + '</div><div class="la-side"><p class="la-merke">' + esc(S.side.navn) + '</p><h1 class="la-tittel" id="la-h" tabindex="-1">' + esc(S.side.tittel) + "</h1><p>" + esc(S.side.tekst) + '</p><p class="la-pynt">' + esc(S.side.pynt) + "</p></div></div>" +
        '<section class="la-steg" id="la-s1"><h2>' + T.forst + '</h2><div class="la-valg">' + T.forstValg.map(([v, t]) => '<button type="button" class="knapp la-forst" data-v="' + v + '">' + esc(t) + "</button>").join("") + '</div><p class="la-tilbake" id="la-t1" aria-live="polite"></p></section>' +
        '<section class="la-steg" id="la-s2" hidden><h2>' + T.sok + '</h2><div class="la-nyfane"><div class="la-adresse"><span aria-hidden="true">➕</span> ' + T.ny + '</div><div class="la-valg">' + S.sok.map(([q, ok], i) => '<button type="button" class="knapp la-sok" data-i="' + i + '"><span aria-hidden="true">🔍</span> ' + esc(q) + "</button>").join("") + '</div></div><p class="la-tilbake" id="la-t2" aria-live="polite"></p></section>' +
        '<section class="la-steg" id="la-s3" hidden><h2>' + T.resultat + '</h2><ol class="la-treff">' + S.treff.map((t, i) => '<li><button type="button" class="la-treffknapp" data-i="' + i + '" aria-expanded="false" aria-controls="la-tr' + i + '"' + lang + '><span class="la-treff-tittel">' + esc(t.tittel) + '</span><span class="la-treff-adr">' + esc(t.adresse) + '</span></button><p class="la-treff-tekst" id="la-tr' + i + '" hidden' + lang + ">" + esc(t.tekst) + "</p></li>").join("") + "</ol></section>" +
        '<section class="la-steg" id="la-s4" hidden><h2>' + T.konk + '</h2><fieldset class="la-konk"><legend class="skjult-visuelt">' + T.konk + "</legend>" + T.konkValg.map(([v, t]) => '<label><input type="radio" name="la-k' + nr + '" value="' + v + '"> ' + esc(t) + "</label>").join("") + '</fieldset><label class="mu-notat" for="la-b-' + S.id + '"><span>' + T.begrunn + '</span><textarea id="la-b-' + S.id + '" rows="3"></textarea></label><p><button type="button" class="knapp hoved" id="la-sjekk">' + T.sjekk + '</button></p><div id="la-t4" aria-live="polite"></div></section>';
      $("la-h").focus();
      const vis = id => { $(id).hidden = false; const h = $(id).querySelector("h2"); h.setAttribute("tabindex", "-1"); h.focus(); };
      document.querySelectorAll(".la-forst").forEach(b => b.addEventListener("click", () => {
        document.querySelectorAll(".la-forst").forEach(x => x.setAttribute("aria-pressed", String(x === b)));
        const v = b.dataset.v;
        $("la-t1").innerHTML = (v === "lateral" ? "✔ " : "💡 ") + esc(FORST_SVAR[v]) + (v !== "lateral" ? " <strong>Prøv lateral lesing:</strong>" : "");
        if (v === "lateral") { if (v === "lateral" && !poengTatt1) { poeng++; poengTatt1 = true; } }
        setTimeout(() => vis("la-s2"), 50);
      }));
      let poengTatt1 = false;
      document.querySelectorAll(".la-sok").forEach(b => b.addEventListener("click", () => {
        const ok = S.sok[+b.dataset.i][1];
        document.querySelectorAll(".la-sok").forEach(x => x.setAttribute("aria-pressed", String(x === b)));
        $("la-t2").textContent = ok ? "✔ Godt søk! Du søker på avsenderen, ikke på påstanden – da finner du ut hvem som står bak." : "💡 Dette søket gir deg mest treff fra sider som er enige med påstanden. Søk heller på navnet til avsenderen. Her er resultatene for avsenderen:";
        vis("la-s3");
      }));
      let lest = new Set();
      document.querySelectorAll(".la-treffknapp").forEach(b => b.addEventListener("click", () => {
        const p = $(b.getAttribute("aria-controls")), apen = !p.hidden; p.hidden = apen; b.setAttribute("aria-expanded", String(!apen));
        lest.add(+b.dataset.i);
        if ($("la-s4").hidden && [...lest].some(i => S.treff[i].viktig)) $("la-s4").hidden = false;
      }));
      $("la-sjekk").addEventListener("click", () => {
        const v = document.querySelector('input[name="la-k' + nr + '"]:checked');
        if (!v) { $("la-t4").innerHTML = "<p>Velg en konklusjon først.</p>"; return; }
        const ok = v.value === S.svar; if (ok) poeng++;
        const riktig = T.konkValg.find(x => x[0] === S.svar)[1];
        $("la-t4").innerHTML = '<div class="lgf-tilbake' + (ok ? " best" : "") + '"' + lang + "><p><strong>" + (ok ? "✔ " : "✘ ") + esc(riktig) + ".</strong> " + esc(S.forklaring) + '</p><button type="button" class="knapp hoved" id="la-neste" lang="nb">' + (nr + 1 < SAKER.length ? "Neste sak →" : "Se resultatet →") + "</button></div>";
        $("la-sjekk").disabled = true;
        $("la-neste").addEventListener("click", () => { nr++; sak(); }); $("la-neste").focus();
      });
    }
    function slutt() {
      $("innhold").innerHTML = hode + '<header class="sidehode"><p class="overlinje">↔️ Lateral lesing</p><h1 tabindex="-1" id="la-h">Ferdig!</h1><p class="ingress">Du fikk ' + poeng + " av " + (SAKER.length * 2) + " poeng (ett for å lese lateralt først, ett for riktig konklusjon i hver sak).</p></header>" +
        '<section class="le-del"><h2>Husk</h2><ul><li>Forlat siden – søk på <strong>avsenderen</strong>, ikke på påstanden.</li><li>Ikke stol på «Om oss» og et proft utseende.</li><li>Se etter hvem som betaler, og om eksperten er ekspert på akkurat dette.</li><li>Lateral lesing viser også når du <strong>kan</strong> stole på en kilde.</li></ul>' +
        '<label class="mu-notat" for="la-r1"><span>Tenk på en nettside eller konto du har sett nylig. Hvordan kunne du sjekket den lateralt?</span><textarea id="la-r1" rows="3"></textarea></label><p><button type="button" class="knapp" id="la-igjen">↻ Prøv igjen</button> <a class="knapp" href="lognfabrikk.html">Til Løgnfabrikken →</a> <a class="knapp" href="kildedetektiv.html">Til Kildedetektiven →</a></p></section>';
      $("la-h").focus();
      $("la-igjen").addEventListener("click", () => { nr = 0; poeng = 0; sak(); });
    }
    start();
    const l = document.createElement("div"); l.className = "svarlinje"; l.innerHTML = '<div class="svarlinje-indre"><label class="skjult-visuelt" for="elevnavn">Navn</label><input id="elevnavn" type="text" placeholder="Navn" autocomplete="off"><span class="status" role="status" aria-live="polite"></span></div>'; document.body.appendChild(l);
  });
})();
