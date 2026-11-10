/* =========================================================
   Les verden – Digitale spor (digitalespor.html)
   1) Spordetektiven: Hva kan en fremmed finne ut fra seks innlegg
      på en oppdiktet profil? 2) Ditt eget fotavtrykk: privat sjekkliste.
   3) Slik får du slettet spor. 4) Hvem eier det? Opphavsrett og
   Creative Commons, med åtte situasjoner.
   Profilen og personene er oppdiktet. Ingenting lagres.
   ========================================================= */
(function () {
  const LV = window.LV;
  const $ = id => document.getElementById(id);
  const esc = s => LV.esc(String(s == null ? "" : s));

  const SPOR = [
    ["skole", "🏫 Hvilken skole hun går på"],
    ["bosted", "🏠 Hvor hun bor"],
    ["bursdag", "🎂 Når hun har bursdag og hvor gammel hun er"],
    ["borte", "🧳 Når huset står tomt"],
    ["passord", "🔑 Et mulig passord"],
    ["ingen", "✅ Ingenting som kan misbrukes"]
  ];
  const INNLEGG = [
    { id: "a", bilde: "🎒🏫👭", tekst: "Første skoledag i 9B! Klar for et nytt år 💪", bildetekst: "Bildet viser tre jenter foran et skilt der det står «Fjellvik ungdomsskole».", svar: ["skole"], forklaring: "Skiltet i bakgrunnen viser hvilken skole hun går på – og «9B» forteller hvilken klasse. Sjekk alltid bakgrunnen før du legger ut et bilde." },
    { id: "b", bilde: "🎂🥳🎈", tekst: "Endelig 14 år i dag!! Takk for alle hilsener 💕 #12mars", bildetekst: "Bildet viser en kake med tallet 14.", svar: ["bursdag"], forklaring: "Nå vet alle nøyaktig når hun er født. Fødselsdato brukes ofte som sikkerhetsspørsmål og til å lage falske profiler – og mange bruker den i passord." },
    { id: "c", bilde: "✈️☀️🏖️", tekst: "Hele familien drar til Kreta i TO UKER fra i morgen!!! ☀️☀️", bildetekst: "Bildet viser fire kofferter i en gang.", svar: ["borte"], forklaring: "Innlegget forteller at ingen er hjemme de neste to ukene. Del heller feriebilder når du har kommet hjem." },
    { id: "d", bilde: "🐶❤️", tekst: "Rex er verdens beste hund 🐶 (han er passordet mitt også, haha)", bildetekst: "Bildet viser en brun hund i en sofa.", svar: ["passord"], forklaring: "Navn på kjæledyr, fødselsår og favorittlag er blant de vanligste passordene – og det første en inntrenger prøver. Bruk lange passord med flere tilfeldige ord." },
    { id: "e", bilde: "🌅🏡📍", tekst: "Utsikten fra rommet mitt i kveld 😍 📍 Fjellvik", bildetekst: "Bak hagen ser du et gateskilt der det står «Bjørkeveien», og nummer 14 på postkassen.", svar: ["bosted"], forklaring: "Stedsmerket, gateskiltet og husnummeret gjør det lett å finne adressen. Mange bilder lagrer også posisjonen i selve bildefilen – slå av posisjon for kameraet." },
    { id: "f", bilde: "📐😩", tekst: "Er det bare meg som synes brøk er det vanskeligste i verden?? 😩", bildetekst: "Bildet viser en mattebok og en blyant.", svar: ["ingen"], forklaring: "Dette innlegget avslører ikke noe som kan misbrukes. Ikke alt er farlig å dele! Poenget er å tenke seg om." }
  ];
  const SJEKK = [
    "Jeg har søkt opp mitt eget navn på nettet for å se hva som finnes om meg.",
    "Profilene mine i sosiale medier er private, og jeg vet hvem som følger meg.",
    "Jeg bruker forskjellige passord på forskjellige tjenester.",
    "Jeg har slått på tofaktorautentisering der det er mulig.",
    "Kameraet mitt lagrer ikke posisjonen i bildene.",
    "Jeg vet hvilke apper som har tilgang til posisjon, kamera og mikrofon.",
    "Jeg spør før jeg legger ut bilder av andre.",
    "Jeg har ryddet i gamle innlegg jeg ikke vil at andre skal se."
  ];
  const SITUASJONER = [
    { q: "Du laster opp en hel film du har kjøpt, til YouTube, slik at vennene dine kan se den.", lov: false, f: "Ikke lov. Når du kjøper en film, får du lov til å se den selv – ikke til å spre den. Filmen er beskyttet av opphavsrett." },
    { q: "Du bruker et bilde med lisensen CC BY i en presentasjon, og skriver navnet på fotografen og lisensen.", lov: true, f: "Lov. CC BY betyr at du kan bruke bildet til nesten hva som helst, så lenge du krediterer den som har laget det." },
    { q: "En lokal bedrift vil bruke et bilde med lisensen CC BY-NC på en reklameplakat.", lov: false, f: "Ikke lov. NC betyr «non-commercial» – ikke-kommersielt. Bildet kan ikke brukes i reklame eller for å tjene penger." },
    { q: "Du siterer to setninger fra en avisartikkel i en fagtekst, og oppgir kilden.", lov: true, f: "Lov. Sitatretten gir lov til å sitere korte utdrag når det er relevant, og du oppgir kilden. Du kan ikke kopiere hele artikkelen." },
    { q: "Du redigerer et bilde med lisensen CC BY-ND, legger på tekst og publiserer det.", lov: false, f: "Ikke lov. ND betyr «no derivatives» – ingen bearbeidelser. Du kan dele bildet slik det er, men ikke endre det." },
    { q: "Du bruker et bilde merket CC0 uten å oppgi hvem som har tatt det.", lov: true, f: "Lov. CC0 betyr at den som har laget bildet, har gitt fra seg rettighetene. Det er likevel fint å kreditere." },
    { q: "Du kopierer en lærebok og selger kopiene til elever på en annen skole.", lov: false, f: "Ikke lov. Å kopiere og selge andres verk er et klart brudd på opphavsretten." },
    { q: "Du legger ut et bilde av en venn som ser rar ut, fordi det er morsomt. Du har ikke spurt.", lov: false, f: "Ikke lov. Når en person er hovedmotivet i et bilde, må du som hovedregel ha samtykke før du publiserer. Dessuten kan det såre." }
  ];
  const CC = [
    ["BY", "Kreditering", "Du må oppgi hvem som har laget verket."],
    ["SA", "Del på samme vilkår", "Hvis du endrer verket, må du dele det med samme lisens."],
    ["NC", "Ikke-kommersiell", "Du kan ikke bruke verket for å tjene penger."],
    ["ND", "Ingen bearbeidelser", "Du kan dele verket, men ikke endre det."],
    ["CC0", "Ingen rettigheter forbeholdt", "Du kan bruke verket fritt, også uten å kreditere."]
  ];

  function side() {
    document.title = "Digitale spor – " + (LV.config ? LV.config.navn : "Les verden");
    $("innhold").innerHTML = '<nav class="brodsmuler" aria-label="Brødsmuler"><a href="index.html">Forside</a> › <a href="kildedetektiv.html">Kilder</a> › Digitale spor</nav>' +
      '<header class="sidehode"><p class="overlinje">Personvern og opphavsrett</p><h1>👣 Digitale spor</h1><p class="ingress">Alt du gjør på nettet, setter spor: bilder, kommentarer, likerklikk og søk. Noen spor legger du igjen selv, andre blir samlet inn uten at du merker det. Her finner du ut hva sporene kan avsløre, hvordan du får slettet dem – og hvem som eier det du finner på nettet.</p></header>' +
      '<nav class="dsp-innhold" aria-label="Innhold på siden"><ol><li><a href="#dsp-1">Spordetektiven</a></li><li><a href="#dsp-2">Ditt eget fotavtrykk</a></li><li><a href="#dsp-3">Slik får du slettet spor</a></li><li><a href="#dsp-4">Hvem eier det?</a></li></ol></nav>' +

      '<section class="le-del" id="dsp-1" aria-labelledby="dsp-1h"><h2 id="dsp-1h">1. Spordetektiven</h2><p class="mu-intro">Her er seks innlegg fra den oppdiktede profilen <strong>@frida_fjellvik</strong>. Hvert innlegg virker uskyldig. Men hva kan en fremmed finne ut? Kryss av for alt innlegget avslører, og trykk «Sjekk».</p>' +
      '<div class="lp-viktig"><p><strong>Oppdiktet:</strong> Profilen, personene og stedet finnes ikke.</p></div>' +
      '<ol class="dsp-feed">' + INNLEGG.map((p, i) => '<li class="dsp-innlegg"><article aria-labelledby="dsp-p' + p.id + '"><p class="dsp-topp"><span class="dsp-avatar" aria-hidden="true">F</span><strong>@frida_fjellvik</strong></p>' +
        '<div class="dsp-bilde" aria-hidden="true">' + p.bilde + "</div>" +
        '<p class="dsp-bildetekst">' + esc(p.bildetekst) + '</p><p class="dsp-tekst" id="dsp-p' + p.id + '">' + esc(p.tekst) + "</p>" +
        '<fieldset class="dsp-valg"><legend>Innlegg ' + (i + 1) + ": Hva kan en fremmed finne ut?</legend>" + SPOR.map(([v, t]) => '<label><input type="checkbox" id="dsp-' + p.id + "-" + v + '" value="' + v + '"> ' + t + "</label>").join("") + "</fieldset>" +
        '<p><button type="button" class="knapp dsp-sjekk" data-i="' + i + '">Sjekk</button></p><div class="dsp-svar" id="dsp-s' + p.id + '" aria-live="polite"></div></article></li>').join("") + "</ol>" +
        '<div class="dsp-samlet" id="dsp-samlet" hidden><h3 tabindex="-1" id="dsp-samlet-h">Puslespillet er lagt</h3><p>Hvert innlegg for seg avslører lite. Men til sammen vet en fremmed nå at Frida er <strong>14 år</strong>, har <strong>bursdag 12. mars</strong>, går i <strong>9B på Fjellvik ungdomsskole</strong>, bor i <strong>Bjørkeveien 14</strong>, at huset står <strong>tomt i to uker</strong> – og hva <strong>passordet</strong> hennes kan være. Dette kalles å <strong>sammenstille</strong> informasjon, og det er slik mange svindlere og overgripere jobber.</p>' +
        '<label class="mu-notat" for="dsp-r1"><span>Hvordan kunne Frida lagt ut de samme opplevelsene uten å avsløre så mye? Gi råd til minst tre av innleggene.</span><textarea id="dsp-r1" rows="4"></textarea></label></div></section>' +

      '<section class="le-del" id="dsp-2" aria-labelledby="dsp-2h"><h2 id="dsp-2h">2. Ditt eget fotavtrykk</h2><p class="mu-intro">Dette er bare for deg. Kryss av for det som stemmer. Ingenting lagres, og ingen andre ser svarene – med mindre du selv laster dem ned.</p>' +
        '<fieldset class="dsp-sjekkliste"><legend class="skjult-visuelt">Sjekkliste for ditt digitale fotavtrykk</legend>' + SJEKK.map((t, i) => '<label><input type="checkbox" id="dsp-sl' + i + '"> ' + esc(t) + "</label>").join("") + '</fieldset><p class="dsp-telling" id="dsp-telling" aria-live="polite"></p>' +
        '<label class="mu-notat" for="dsp-r2"><span>Velg ett punkt du ikke krysset av for. Hva kan du gjøre med det denne uka?</span><textarea id="dsp-r2" rows="2"></textarea></label></section>' +

      '<section class="le-del" id="dsp-3" aria-labelledby="dsp-3h"><h2 id="dsp-3h">3. Slik får du slettet spor</h2><p class="mu-intro">Du har rett til personvern. Det betyr blant annet at du kan kreve at opplysninger om deg blir slettet. Gå fram trinn for trinn:</p>' +
        '<ol class="dsp-trinn"><li><strong>Slett selv.</strong> Gå gjennom gamle innlegg, kommentarer og bilder. Husk at andre kan ha tatt skjermbilde før du slettet.</li><li><strong>Spør den som la det ut.</strong> Be vennlig, men tydelig om at bildet eller innlegget blir fjernet. De fleste gjør det.</li><li><strong>Rapporter til tjenesten.</strong> Alle store sosiale medier har en knapp for å rapportere innhold som krenker deg.</li><li><strong>Få hjelp fra slettmeg.no.</strong> Tjenesten er gratis og hjelper deg med å få fjernet innhold.</li><li><strong>Bruk retten til sletting.</strong> Personvernreglene (GDPR) gir deg rett til å kreve at en bedrift sletter opplysninger om deg. Svarer de ikke, kan du klage til <strong>Datatilsynet</strong>.</li><li><strong>Kontakt politiet</strong> hvis innholdet er truende, eller hvis det er nakenbilder av noen under 18 år.</li></ol>' +
        '<div class="ka-metode"><h3>Husk dette</h3><ul><li>Før du legger ut et bilde der andre er hovedmotivet, må du som hovedregel spørre dem.</li><li>Når barn under 15 år skal vises på nettet, anbefaler Datatilsynet at foreldrene samtykker.</li><li>Ta skjermbilde som bevis før du ber om sletting av noe som er ulovlig.</li></ul></div>' +
        '<p><a href="tema.html?id=sf8-grenser-press">Les mer i temaet «Grenser, kropp og press» →</a></p></section>' +

      '<section class="le-del" id="dsp-4" aria-labelledby="dsp-4h"><h2 id="dsp-4h">4. Hvem eier det? Opphavsrett og Creative Commons</h2>' +
        '<p>Når noen lager et bilde, en tekst, en sang eller en film, får de automatisk <strong>opphavsrett</strong>. Det betyr at de bestemmer hvem som kan kopiere og spre verket. Opphavsretten varer til <strong>70 år etter at opphavspersonen døde</strong>. Derfor er det bare gamle tekster av forfattere som døde for lenge siden, du finner i sin helhet her på Les verden.</p>' +
        '<p>Mange velger å dele verkene sine med en <strong>Creative Commons</strong>-lisens (CC). Da står det på forhånd hva du har lov til:</p>' +
        '<dl class="dsp-cc">' + CC.map(([k, n, t]) => '<div><dt><span class="dsp-merke">' + k + "</span> " + esc(n) + "</dt><dd>" + esc(t) + "</dd></div>").join("") + "</dl>" +
        '<p class="mu-intro">Er dette lov? Velg svar i hver situasjon.</p><ol class="dsp-situasjoner">' + SITUASJONER.map((s, i) => '<li><fieldset><legend>' + esc(s.q) + '</legend><div class="dsp-lov"><label><input type="radio" name="dsp-l' + i + '" id="dsp-l' + i + '-ja" value="ja"> Lov</label><label><input type="radio" name="dsp-l' + i + '" id="dsp-l' + i + '-nei" value="nei"> Ikke lov</label></div></fieldset><p class="dsp-lsvar" id="dsp-ls' + i + '" aria-live="polite"></p></li>').join("") + '</ol><p class="dsp-telling" id="dsp-ltelling" aria-live="polite"></p>' +
        '<label class="mu-notat" for="dsp-r3"><span>Hvorfor tror du opphavsretten finnes? Hvem beskytter den – og kan den noen ganger stå i veien for noe?</span><textarea id="dsp-r3" rows="3"></textarea></label></section>' +

      '<p class="fo-merk">Til læreren: Siden dekker kompetansemålet om å «utforske og reflektere over egne digitale spor og muligheten for å få slettet sporene og verne om egen og andres rett til privatliv, personvern og opphavsrett». Del 2 er privat – be ikke elevene levere den. Bruk gjerne Spordetektiven i plenum: Vis ett innlegg om gangen på storskjerm og la klassen diskutere. Se også temaene <a href="tema.html?id=sf9-digital-dommekraft">Digital dømmekraft</a> og <a href="tema.html?id=sf8-grenser-press">Grenser, kropp og press</a>.</p>';

    let sjekket = new Set();
    document.querySelectorAll(".dsp-sjekk").forEach(b => b.addEventListener("click", () => {
      const p = INNLEGG[+b.dataset.i];
      const valgt = SPOR.map(s => s[0]).filter(v => $("dsp-" + p.id + "-" + v).checked);
      const riktig = valgt.length === p.svar.length && p.svar.every(v => valgt.includes(v));
      const navn = p.svar.map(v => SPOR.find(s => s[0] === v)[1].replace(/^\S+\s/, "").toLowerCase());
      $("dsp-s" + p.id).innerHTML = '<div class="lgf-tilbake' + (riktig ? " best" : "") + '"><p><strong>' + (riktig ? "✔ Riktig! " : "💡 Innlegget avslører: " + esc(navn.join(", ")) + ". ") + "</strong>" + esc(p.forklaring) + "</p></div>";
      sjekket.add(p.id);
      if (sjekket.size === INNLEGG.length && $("dsp-samlet").hidden) { $("dsp-samlet").hidden = false; }
    }));
    const tell = () => {
      const n = SJEKK.filter((_, i) => $("dsp-sl" + i).checked).length;
      $("dsp-telling").textContent = n + " av " + SJEKK.length + " punkter. " + (n === SJEKK.length ? "Veldig bra – du har god kontroll på sporene dine!" : n >= 5 ? "Bra! Se om du kan ta ett punkt til." : "Det er lurt å ta ett punkt om gangen.");
    };
    SJEKK.forEach((_, i) => $("dsp-sl" + i).addEventListener("change", tell));
    const lsvar = () => {
      let besvart = 0, riktige = 0;
      SITUASJONER.forEach((s, i) => {
        const v = document.querySelector('input[name="dsp-l' + i + '"]:checked');
        if (!v) return; besvart++;
        const ok = (v.value === "ja") === s.lov; if (ok) riktige++;
        const el = $("dsp-ls" + i); el.className = "dsp-lsvar " + (ok ? "ok" : "feil"); el.textContent = (ok ? "✔ " : "✘ ") + s.f;
      });
      $("dsp-ltelling").textContent = besvart === SITUASJONER.length ? "Du hadde " + riktige + " av " + SITUASJONER.length + " riktige." : "";
    };
    document.querySelectorAll('.dsp-situasjoner input[type="radio"]').forEach(r => r.addEventListener("change", lsvar));
  }

  document.addEventListener("DOMContentLoaded", () => {
    side();
    const l = document.createElement("div"); l.className = "svarlinje"; l.innerHTML = '<div class="svarlinje-indre"><label class="skjult-visuelt" for="elevnavn">Navn</label><input id="elevnavn" type="text" placeholder="Navn" autocomplete="off"><span class="status" role="status" aria-live="polite"></span></div>'; document.body.appendChild(l);
  });
})();
