/* =========================================================
   Les verden – Grafleseren (grafleser.html)
   Regning i samfunnsfag: velge riktig diagram, lese grafer,
   avsløre villedende grafer, lage eget diagram og skrive om det.
   Tallene er oppdiktet (Fjellvik kommune). Ingenting lagres.
   Bruker LV.diagram fra assets/diagram.js.
   ========================================================= */
(function () {
  const LV = window.LV;
  const $ = id => document.getElementById(id);
  const esc = s => LV.esc(String(s == null ? "" : s));

  const VALG = [
    { q: "Hvor mange innbyggere Fjellvik har hatt hvert år fra 2015 til 2025.", r: "linje", f: "Utvikling over tid vises best med et linjediagram – linja viser om det går opp eller ned." },
    { q: "Hvilket fritidstilbud elevene i 9B liker best.", r: "soyle", f: "Når du sammenligner kategorier (fotball, kulturskole, gaming …), passer et søylediagram." },
    { q: "Hvordan kommunebudsjettet er fordelt på skole, helse, vei og kultur.", r: "sektor", f: "Deler av en helhet (som til sammen er 100 prosent) kan vises med et sektordiagram – «kakediagram»." },
    { q: "Hvor mange som bor i fem ulike kommuner.", r: "soyle", f: "Fem kommuner er fem kategorier som skal sammenlignes: søylediagram." },
    { q: "Temperaturen i Fjellvik hver måned gjennom ett år.", r: "linje", f: "Måned for måned er utvikling over tid: linjediagram." }
  ];
  const TYPER = { soyle: "📊 Søylediagram", linje: "📈 Linjediagram", sektor: "🥧 Sektordiagram" };

  const LES = [
    { d: { type: "linje", tittel: "Innbyggere i Fjellvik 2000–2025", x: ["2000", "2005", "2010", "2015", "2020", "2025"], serier: [{ navn: "Innbyggere", verdier: [4200, 4350, 4500, 4800, 5300, 5900] }], enhet: "Innbyggere", yMin: 0, kilde: "Oppdiktede tall" },
      spm: [
        { q: "Hvor mange innbyggere hadde Fjellvik i 2010?", valg: ["4 350", "4 500", "4 800"], r: 1, f: "Finn 2010 på x-aksen, gå rett opp til punktet og les av på y-aksen: 4 500." },
        { q: "I hvilken femårsperiode økte folketallet mest?", valg: ["2000–2005", "2010–2015", "2020–2025"], r: 2, f: "Linja er brattest mellom 2020 og 2025: en økning på 600 innbyggere." },
        { q: "Kan vi se av grafen hvorfor folketallet økte?", valg: ["Ja, fordi det ble født flere barn", "Ja, fordi folk flyttet til Fjellvik", "Nei, grafen viser bare hva som skjedde, ikke hvorfor"], r: 2, f: "En graf viser hva som skjedde. For å finne årsakene trenger vi andre kilder, for eksempel tall for fødsler og flytting." }
      ] },
    { d: { type: "soyle", tittel: "Skjermtid på fritiden – timer per dag (spørreundersøkelse)", x: ["8. trinn", "9. trinn", "10. trinn"], serier: [{ navn: "Jenter", verdier: [3.1, 3.6, 4.0] }, { navn: "Gutter", verdier: [3.4, 3.9, 4.6] }], enhet: "Timer", yMin: 0, verdiPaSoyle: true, kilde: "Oppdiktede tall fra en undersøkelse på Fjellvik ungdomsskole" },
      spm: [
        { q: "Hvilken gruppe har mest skjermtid?", valg: ["Jenter på 10. trinn", "Gutter på 10. trinn", "Gutter på 8. trinn"], r: 1, f: "Den høyeste søyla er guttene på 10. trinn: 4,6 timer." },
        { q: "Hva skjer med skjermtiden fra 8. til 10. trinn?", valg: ["Den øker for både jenter og gutter", "Den synker", "Den øker bare for guttene"], r: 0, f: "Begge søylene blir høyere for hvert trinn." },
        { q: "Hva bør du vite for å vurdere hvor pålitelig undersøkelsen er?", valg: ["Hvilken farge søylene har", "Hvor mange som svarte, og hvordan spørsmålet var stilt", "Hvilket år skolen ble bygd"], r: 1, f: "Hvis bare noen få svarte, eller spørsmålet var uklart, er tallene mindre til å stole på. Folk er dessuten ofte dårlige til å anslå sin egen skjermtid." }
      ] },
    { d: { type: "sektor", tittel: "Slik brukes pengene i Fjellvik kommune (prosent)", x: ["Skole og barnehage", "Helse og omsorg", "Vei, vann og avløp", "Kultur og idrett", "Administrasjon"], serier: [{ navn: "Prosent", verdier: [38, 34, 12, 6, 10] }], kilde: "Oppdiktede tall" },
      spm: [
        { q: "Hva bruker kommunen mest penger på?", valg: ["Helse og omsorg", "Skole og barnehage", "Administrasjon"], r: 1, f: "Den største sektoren er skole og barnehage, med 38 prosent." },
        { q: "Hvor stor del går til skole, barnehage, helse og omsorg til sammen?", valg: ["Omtrent en tredjedel", "Omtrent halvparten", "Nesten tre firedeler"], r: 2, f: "38 + 34 = 72 prosent – nesten tre firedeler. Slik er det i mange norske kommuner." }
      ] }
  ];

  const LURE = [
    { tittel: "Partiet som «doblet» seg", d: { type: "soyle", tittel: "Oppslutning om Bygdepartiet (prosent)", x: ["Mars", "April"], serier: [{ navn: "Prosent", verdier: [31, 33] }], yMin: 30, yMaks: 33.5, verdiPaSoyle: true }, aerlig: { type: "soyle", tittel: "Oppslutning om Bygdepartiet (prosent) – y-aksen starter på 0", x: ["Mars", "April"], serier: [{ navn: "Prosent", verdier: [31, 33] }], yMin: 0, yMaks: 40, verdiPaSoyle: true },
      valg: ["Y-aksen starter ikke på null", "Tallene er feil", "Det er brukt feil type diagram"], r: 0, f: "Y-aksen starter på 30. Da ser søyla for april ut til å være dobbelt så høy, selv om økningen bare er 2 prosentpoeng. Søylediagram bør nesten alltid starte på null." },
    { tittel: "«Kraftig økning i innbrudd!»", d: { type: "linje", tittel: "Innbrudd i Fjellvik", x: ["2023", "2024"], serier: [{ navn: "Innbrudd", verdier: [48, 55] }], yMin: 45, yMaks: 56 }, aerlig: { type: "linje", tittel: "Innbrudd i Fjellvik 2014–2024", x: ["2014", "2016", "2018", "2020", "2022", "2023", "2024"], serier: [{ navn: "Innbrudd", verdier: [120, 104, 90, 71, 60, 48, 55] }], yMin: 0 },
      valg: ["Grafen viser bare en kort, utvalgt periode", "Det er for mange innbrudd", "Linja burde vært rød"], r: 0, f: "Grafen viser bare to år. Ser vi på ti år, har innbruddene gått kraftig ned – fra 120 til 55. Å velge ut en kort periode som passer budskapet, kalles å «plukke kirsebær»." },
    { tittel: "Et brått hopp?", d: { type: "linje", tittel: "Antall elbiler i Fjellvik", x: ["1995", "2005", "2015", "2021", "2022", "2023", "2024"], serier: [{ navn: "Elbiler", verdier: [0, 2, 60, 410, 520, 640, 760] }], yMin: 0 }, aerlig: null,
      valg: ["Avstanden mellom årstallene på x-aksen er ujevn", "Elbiler er dyre", "Y-aksen starter på null"], r: 0, f: "De første punktene har ti år mellom seg, de siste bare ett år – men de står like langt fra hverandre. Da blir bildet av utviklingen forvrengt. Sjekk alltid tallene på aksene." },
    { tittel: "Is er farlig?", d: { type: "linje", tittel: "Issalg og drukningsulykker per måned (indeks)", x: ["Jan", "Mar", "Mai", "Jul", "Sep", "Nov"], serier: [{ navn: "Issalg", verdier: [10, 18, 55, 100, 40, 12] }, { navn: "Drukningsulykker", verdier: [8, 12, 50, 95, 35, 10] }], yMin: 0 }, aerlig: null,
      valg: ["Is fører til drukning", "To ting som skjer samtidig, trenger ikke å ha noe med hverandre å gjøre", "Grafen viser at folk bør slutte å spise is"], r: 1, f: "Begge linjene stiger om sommeren – fordi det er varmt. Når to ting varierer sammen, kalles det samvariasjon (korrelasjon). Det betyr ikke at den ene forårsaker den andre. Her er det en felles årsak: været." }
  ];

  function rundeHtml(navn, i, s) {
    return '<li><fieldset><legend>' + esc(s.q) + "</legend>" + s.valg.map((v, j) => '<label><input type="radio" name="' + navn + i + '" id="' + navn + i + "-" + j + '" value="' + j + '"> ' + esc(v) + "</label>").join("") + '</fieldset><p class="gf-svar" id="' + navn + i + '-s" aria-live="polite"></p></li>';
  }
  function koble(navn, liste) {
    liste.forEach((s, i) => document.querySelectorAll('input[name="' + navn + i + '"]').forEach(inp => inp.addEventListener("change", () => {
      const ok = +inp.value === s.r, el = $(navn + i + "-s");
      el.className = "gf-svar " + (ok ? "ok" : "feil"); el.textContent = (ok ? "✔ Riktig. " : "✘ Ikke helt. ") + s.f;
    })));
  }

  function side() {
    document.title = "Grafleseren – " + (LV.config ? LV.config.navn : "Les verden");
    let h = '<nav class="brodsmuler" aria-label="Brødsmuler"><a href="index.html">Forside</a> › <a href="kilder.html">Kildeanalyse</a> › Grafleseren</nav>' +
      '<header class="sidehode"><p class="overlinje">Regning i samfunnsfag</p><h1>📈 Grafleseren</h1><p class="ingress">Grafer og diagrammer er overalt – i nyheter, lærebøker og reklame. De kan gjøre tall lette å forstå, men de kan også lure deg. Her øver du på å velge riktig diagram, lese av grafer, avsløre villedende grafer og lage ditt eget.</p></header>' +
      '<div class="lp-viktig"><p><strong>Tallene er oppdiktet.</strong> De handler om den oppdiktede kommunen Fjellvik. Ekte statistikk finner du hos <a href="https://www.ssb.no/">Statistisk sentralbyrå (SSB)</a>.</p></div>' +
      '<nav class="dsp-innhold" aria-label="Innhold på siden"><ol><li><a href="#gf-1">Hvilket diagram passer?</a></li><li><a href="#gf-2">Les grafen</a></li><li><a href="#gf-3">Villedende grafer</a></li><li><a href="#gf-4">Lag ditt eget diagram</a></li></ol></nav>';

    h += '<section class="le-del" id="gf-1" aria-labelledby="gf-1h"><h2 id="gf-1h">1. Hvilket diagram passer?</h2><div class="gf-typer">' +
      '<div><h3>📈 Linjediagram</h3><p>Viser <strong>utvikling over tid</strong>: år, måneder, dager.</p></div><div><h3>📊 Søylediagram</h3><p><strong>Sammenligner</strong> ulike grupper eller kategorier.</p></div><div><h3>🥧 Sektordiagram</h3><p>Viser <strong>deler av en helhet</strong> – delene blir til sammen 100 prosent.</p></div></div>' +
      '<ol class="gf-runde">' + VALG.map((s, i) => '<li><fieldset><legend>' + esc(s.q) + "</legend>" + Object.entries(TYPER).map(([k, t]) => '<label><input type="radio" name="gf-v' + i + '" id="gf-v' + i + "-" + k + '" value="' + k + '"> ' + t + "</label>").join("") + '</fieldset><p class="gf-svar" id="gf-v' + i + '-s" aria-live="polite"></p></li>').join("") + "</ol></section>";

    h += '<section class="le-del" id="gf-2" aria-labelledby="gf-2h"><h2 id="gf-2h">2. Les grafen</h2><div class="ka-metode"><h3>Slik leser du en graf</h3><ol><li><strong>Tittel:</strong> Hva handler grafen om?</li><li><strong>Aksene:</strong> Hva viser x-aksen (vannrett) og y-aksen (loddrett)? Hvilken enhet?</li><li><strong>Kilde:</strong> Hvem har laget tallene?</li><li><strong>Hovedtrekk:</strong> Hva er høyest og lavest? Går det opp eller ned?</li><li><strong>Hva viser den ikke?</strong> Grafen sier hva som skjedde – sjelden hvorfor.</li></ol></div>' +
      LES.map((g, gi) => LV.diagram(Object.assign({ id: "gf-d" + gi }, g.d)) + '<ol class="gf-runde">' + g.spm.map((s, i) => rundeHtml("gf-l" + gi + "-", i, s)).join("") + "</ol>").join("") +
      '<label class="mu-notat" for="gf-beskriv"><span>Skriv tre–fire setninger om grafen over folketallet i Fjellvik. Bruk gjerne: «Grafen viser …», «Fra … til … økte …», «Den største økningen var …», «Grafen viser ikke …»</span><textarea id="gf-beskriv" rows="4"></textarea></label></section>';

    h += '<section class="le-del" id="gf-3" aria-labelledby="gf-3h"><h2 id="gf-3h">3. Villedende grafer</h2><p class="mu-intro">Disse grafene er laget for å gi et bestemt inntrykk. Finn trikset!</p>' +
      LURE.map((g, gi) => '<article class="gf-lure" aria-labelledby="gf-u' + gi + '-h"><h3 id="gf-u' + gi + '-h">' + (gi + 1) + ". " + esc(g.tittel) + "</h3>" + LV.diagram(Object.assign({ id: "gf-u" + gi + "d" }, g.d)) +
        '<fieldset><legend>Hva er trikset?</legend>' + g.valg.map((v, j) => '<label><input type="radio" name="gf-u' + gi + '" id="gf-u' + gi + "-" + j + '" value="' + j + '"> ' + esc(v) + "</label>").join("") + '</fieldset><div class="gf-svar" id="gf-u' + gi + '-s" aria-live="polite"></div></article>').join("") +
      '<label class="mu-notat" for="gf-lure-r"><span>Hvorfor tror du noen lager villedende grafer? Hvem kan ha nytte av det?</span><textarea id="gf-lure-r" rows="3"></textarea></label></section>';

    h += '<section class="le-del" id="gf-4" aria-labelledby="gf-4h"><h2 id="gf-4h">4. Lag ditt eget diagram</h2><p class="mu-intro">Skriv inn tallene dine – for eksempel fra en spørreundersøkelse i klassen eller fra SSB. Diagrammet tegnes med en gang.</p>' +
      '<div class="gf-lag"><div class="gf-skjema"><label class="lg-felt" for="gf-tittel"><span>Tittel</span><input type="text" id="gf-tittel" value="Favorittfag i klassen"></label><label class="lg-felt" for="gf-enhet"><span>Enhet (for eksempel «Antall elever» eller «Prosent»)</span><input type="text" id="gf-enhet" value="Antall elever"></label>' +
      '<label class="lg-felt" for="gf-type"><span>Type</span><select id="gf-type"><option value="soyle">Søylediagram</option><option value="linje">Linjediagram</option><option value="sektor">Sektordiagram</option></select></label>' +
      '<table class="gf-tabell"><caption class="skjult-visuelt">Tallene i diagrammet</caption><thead><tr><th scope="col">Kategori eller år</th><th scope="col">Verdi</th></tr></thead><tbody>' +
      [["Samfunnsfag", 7], ["Engelsk", 5], ["Matte", 6], ["Kroppsøving", 8], ["", ""], ["", ""], ["", ""], ["", ""]].map(([k, v], i) => '<tr><td><label class="skjult-visuelt" for="gf-k' + i + '">Kategori ' + (i + 1) + '</label><input type="text" id="gf-k' + i + '" value="' + k + '"></td><td><label class="skjult-visuelt" for="gf-n' + i + '">Verdi ' + (i + 1) + '</label><input type="number" inputmode="decimal" step="any" id="gf-n' + i + '" value="' + v + '"></td></tr>').join("") + "</tbody></table></div>" +
      '<div id="gf-eget" aria-live="polite"></div></div>' +
      '<label class="mu-notat" for="gf-eget-r"><span>Hva viser diagrammet ditt? Hva viser det ikke?</span><textarea id="gf-eget-r" rows="3"></textarea></label></section>' +
      '<p class="fo-merk">Til læreren: Siden trener regning som grunnleggende ferdighet i samfunnsfag og kompetansemålene om å presentere funn og vurdere kilder. Del 3 passer godt sammen med <a href="lognfabrikk.html">Løgnfabrikken</a>. Vil elevene samle egne data, kan de bruke <a href="undersokelse.html">Undersøkelsesverkstedet</a>. Ekte tall finnes hos SSB, blant annet i undervisningsoppleggene på SSB skole.</p>';
    $("innhold").innerHTML = h;

    VALG.forEach((s, i) => document.querySelectorAll('input[name="gf-v' + i + '"]').forEach(inp => inp.addEventListener("change", () => {
      const ok = inp.value === s.r, el = $("gf-v" + i + "-s"); el.className = "gf-svar " + (ok ? "ok" : "feil");
      el.textContent = (ok ? "✔ Riktig. " : "✘ Ikke helt – her passer " + TYPER[s.r].slice(3).toLowerCase() + ". ") + s.f;
    })));
    LES.forEach((g, gi) => koble("gf-l" + gi + "-", g.spm));
    LURE.forEach((g, gi) => document.querySelectorAll('input[name="gf-u' + gi + '"]').forEach(inp => inp.addEventListener("change", () => {
      const ok = +inp.value === g.r, el = $("gf-u" + gi + "-s");
      el.innerHTML = '<p class="gf-svar ' + (ok ? "ok" : "feil") + '">' + (ok ? "✔ Riktig. " : "✘ Ikke helt. ") + esc(g.f) + "</p>" + (g.aerlig ? '<p class="gf-aerlig">Slik ser det ut når grafen er laget ærlig:</p>' + LV.diagram(Object.assign({ id: "gf-a" + gi }, g.aerlig)) : "");
    })));
    const tegn = () => {
      const rader = [];
      for (let i = 0; i < 8; i++) { const k = $("gf-k" + i).value.trim(), v = parseFloat(String($("gf-n" + i).value).replace(",", ".")); if (k && isFinite(v)) rader.push([k, v]); }
      const type = $("gf-type").value;
      if (!rader.length) { $("gf-eget").innerHTML = "<p>Skriv inn minst én kategori med en verdi.</p>"; return; }
      if (type === "sektor" && rader.some(r => r[1] < 0)) { $("gf-eget").innerHTML = "<p>Et sektordiagram kan ikke ha negative tall.</p>"; return; }
      $("gf-eget").innerHTML = LV.diagram({ id: "gf-egetd", type, tittel: $("gf-tittel").value, enhet: $("gf-enhet").value, x: rader.map(r => r[0]), serier: [{ navn: $("gf-enhet").value || "Verdi", verdier: rader.map(r => r[1]) }], verdiPaSoyle: true, fargePerSoyle: false });
    };
    document.querySelectorAll(".gf-skjema input, .gf-skjema select").forEach(el => el.addEventListener("input", tegn));
    tegn();
  }

  document.addEventListener("DOMContentLoaded", () => {
    side();
    const l = document.createElement("div"); l.className = "svarlinje"; l.innerHTML = '<div class="svarlinje-indre"><label class="skjult-visuelt" for="elevnavn">Navn</label><input id="elevnavn" type="text" placeholder="Navn" autocomplete="off"><span class="status" role="status" aria-live="polite"></span></div>'; document.body.appendChild(l);
  });
})();
