/* =========================================================
   Les verden – Første lønn (okonomi.html)
   Personlig økonomi: lag et månedsbudsjett for din første lønn,
   ta valg når uventede ting skjer, og regn ut hva et lån koster.
   Alle tall er forenklede eksempler. Ingenting lagres.
   Bruker LV.diagram (assets/diagram.js).
   ========================================================= */
(function () {
  const LV = window.LV;
  const $ = id => document.getElementById(id);
  const esc = s => LV.esc(String(s == null ? "" : s));
  const kr = v => Math.round(v).toLocaleString("nb-NO") + " kr";
  const BRUTTO = 34000, SKATT = 0.26;
  const NETTO = Math.round(BRUTTO * (1 - SKATT));
  const BOLIG = [["hybel", "Hybel i kjelleren", 7500], ["kollektiv", "Rom i kollektiv", 6500], ["leilighet", "Egen liten leilighet", 12500]];
  const REISE = [["buss", "Månedskort på buss", 850], ["sykkel", "Sykkel (vedlikehold)", 150], ["bil", "Bruktbil (lån, forsikring, drivstoff)", 5200]];
  const POSTER = [
    ["strom", "Strøm og internett", 1300, 800, 2500],
    ["mat", "Mat og husholdning", 4500, 2500, 8000],
    ["mobil", "Mobilabonnement", 400, 200, 800],
    ["klaer", "Klær og sko", 800, 0, 3000],
    ["fritid", "Fritid, trening og kafé", 1500, 0, 5000],
    ["abonnement", "Strømmetjenester og apper", 400, 0, 1500],
    ["forsikring", "Innboforsikring", 150, 0, 400],
    ["sparing", "Sparing (buffer og mål)", 2000, 0, 8000]
  ];
  const HENDELSER = [
    { id: "vask", tittel: "🧺 Vaskemaskinen streiker", tekst: "Vaskemaskinen du kjøpte brukt, gir opp. En ny koster 5 000 kroner.", valg: [
      ["Kjøpe ny og betale med sparepengene", 5000, 0, "Smart hvis du har en buffer. Det koster 5 000 kroner – og ikke en krone mer."],
      ["«Kjøp nå, betal senere» – 12 avdrag med gebyrer", 6100, 6100, "Det føles billig nå, men fakturagebyrer og rente gjør at maskinen fort koster rundt 6 100 kroner til sammen – og du har gjeld i et år."],
      ["Bruke vaskeriet i nabolaget i et halvt år", 1800, 0, "300 kroner i måneden i seks måneder. Det kan være lurt mens du sparer opp til en ny."]
    ] },
    { id: "tur", tittel: "✈️ Vennetur til Barcelona", tekst: "Vennene dine skal på tur om tre uker. Det vil koste deg omtrent 6 000 kroner.", valg: [
      ["Bli med og betale med kredittkortet", 6500, 6500, "Med rundt 25 % rente og gebyrer blir turen fort 500 kroner dyrere hvis du bruker et halvt år på å betale – og mye mer hvis du bare betaler minstebeløpet."],
      ["Bli med og betale med sparepengene", 6000, 0, "En fin opplevelse – men bufferen din blir mindre."],
      ["Si nei, og foreslå en billig hyttetur i stedet", 900, 0, "Du sparer penger, og kanskje blir flere med."]
    ] },
    { id: "mobil", tittel: "📱 Den nye mobilen", tekst: "Den nye toppmodellen koster 14 000 kroner. Butikken tilbyr den «for bare 690 kroner i måneden» i 24 måneder.", valg: [
      ["Ta tilbudet: 690 kroner i 24 måneder", 16560, 16560, "690 × 24 = 16 560 kroner. Du betaler 2 560 kroner mer enn kontantprisen – og er bundet i to år."],
      ["Kjøpe en brukt modell til 4 000 kroner", 4000, 0, "Nesten like god telefon – til en brøkdel av prisen."],
      ["Beholde den gamle mobilen litt til", 0, 0, "Den beste sparingen er ofte å vente."]
    ] },
    { id: "lan", tittel: "💸 «Du er forhåndsgodkjent!»", tekst: "Du får en reklame: «Lån opptil 50 000 kroner – uten sikkerhet, penger på konto i dag!» Den effektive renten er 22 %.", valg: [
      ["Låne 50 000 kroner til en sofa og en ny PC", 66900, 66900, "Med 22 % effektiv rente over tre år betaler du rundt 66 900 kroner tilbake – nesten 17 000 kroner bare i renter og gebyrer."],
      ["Takke nei", 0, 0, "Forbrukslån er dyre. Spar heller opp til det du vil kjøpe."]
    ] }
  ];

  function annuitet(lan, rente, ar) {
    const n = Math.round(ar * 12), r = rente / 100 / 12;
    const mnd = r === 0 ? lan / n : lan * r / (1 - Math.pow(1 + r, -n));
    return { mnd, total: mnd * n, renter: mnd * n - lan };
  }

  function side() {
    document.title = "Første lønn – " + (LV.config ? LV.config.navn : "Les verden");
    $("innhold").innerHTML = '<nav class="brodsmuler" aria-label="Brødsmuler"><a href="index.html">Forside</a> › <a href="spill.html">Spill</a> › Første lønn</nav>' +
      '<header class="sidehode"><p class="overlinje">Personlig økonomi</p><h1>💰 Første lønn</h1><p class="ingress">Du er 20 år, har fått din første faste jobb og skal flytte hjemmefra. Hvordan får du pengene til å strekke til – og hva skjer når noe uventet dukker opp?</p></header>' +
      '<div class="lp-viktig"><p><strong>Forenklede tall:</strong> Lønn, skatt og priser er eksempler. Skattetrekket ditt avhenger av inntekt og fradrag, og prisene varierer mye fra sted til sted.</p></div>' +
      '<nav class="dsp-innhold" aria-label="Innhold på siden"><ol><li><a href="#fl-1">Lag budsjett</a></li><li><a href="#fl-2">Når noe skjer</a></li><li><a href="#fl-3">Hva koster et lån?</a></li><li><a href="#fl-4">Ordliste</a></li></ol></nav>' +

      '<section class="le-del" id="fl-1" aria-labelledby="fl-1h"><h2 id="fl-1h">1. Lag et budsjett for én måned</h2>' +
      '<dl class="fl-lonn"><div><dt>Bruttolønn</dt><dd>' + kr(BRUTTO) + '</dd></div><div><dt>Skattetrekk (ca. ' + Math.round(SKATT * 100) + ' %)</dt><dd>− ' + kr(BRUTTO - NETTO) + '</dd></div><div class="fl-netto"><dt>Nettolønn – det du får utbetalt</dt><dd>' + kr(NETTO) + "</dd></div></dl>" +
      '<div class="fl-budsjett"><div class="fl-poster">' +
      '<fieldset><legend>🏠 Bolig</legend>' + BOLIG.map(([id, n, p], i) => '<label><input type="radio" name="fl-bolig" id="fl-bolig-' + id + '" value="' + p + '"' + (i === 0 ? " checked" : "") + "> " + esc(n) + " – " + kr(p) + "</label>").join("") + "</fieldset>" +
      '<fieldset><legend>🚌 Transport</legend>' + REISE.map(([id, n, p], i) => '<label><input type="radio" name="fl-reise" id="fl-reise-' + id + '" value="' + p + '"' + (i === 0 ? " checked" : "") + "> " + esc(n) + " – " + kr(p) + "</label>").join("") + "</fieldset>" +
      POSTER.map(([id, n, v, min, maks]) => '<div class="fl-post"><label for="fl-' + id + '">' + esc(n) + '</label><input type="range" id="fl-' + id + '" min="' + min + '" max="' + maks + '" step="50" value="' + v + '"><output for="fl-' + id + '" id="fl-' + id + '-v">' + kr(v) + "</output></div>").join("") +
      '</div><div class="fl-resultat"><div id="fl-sum" aria-live="polite"></div><div id="fl-diagram"></div></div></div>' +
      '<label class="mu-notat" for="fl-r1"><span>Hvilke valg var vanskeligst? Hva prioriterte du – og hvorfor?</span><textarea id="fl-r1" rows="3"></textarea></label></section>' +

      '<section class="le-del" id="fl-2" aria-labelledby="fl-2h"><h2 id="fl-2h">2. Når noe skjer</h2><p class="mu-intro">Livet følger ikke budsjettet. Velg hva du gjør i hver situasjon.</p>' +
      HENDELSER.map(h => '<fieldset class="fl-hendelse"><legend>' + esc(h.tittel) + "</legend><p>" + esc(h.tekst) + "</p>" + h.valg.map((v, i) => '<label><input type="radio" name="fl-h-' + h.id + '" id="fl-h-' + h.id + "-" + i + '" value="' + i + '"> ' + esc(v[0]) + "</label>").join("") + '<p class="fl-konsekvens" id="fl-k-' + h.id + '" aria-live="polite"></p></fieldset>').join("") +
      '<div id="fl-hsum" class="fl-hsum" aria-live="polite"></div>' +
      '<label class="mu-notat" for="fl-r2"><span>Hvilket valg tror du er vanligst blant unge? Hvorfor er «kjøp nå, betal senere» så fristende?</span><textarea id="fl-r2" rows="3"></textarea></label></section>' +

      '<section class="le-del" id="fl-3" aria-labelledby="fl-3h"><h2 id="fl-3h">3. Hva koster et lån?</h2><p class="mu-intro">Når du låner, betaler du tilbake mer enn du lånte. Renten er prisen for å låne penger. Prøv selv:</p>' +
      '<div class="fl-kalk"><label class="lg-felt" for="fl-lan"><span>Lånebeløp (kr)</span><input type="number" id="fl-lan" min="1000" max="1000000" step="1000" value="50000"></label><label class="lg-felt" for="fl-rente"><span>Rente per år (%)</span><input type="number" id="fl-rente" min="0" max="40" step="0.5" value="22"></label><label class="lg-felt" for="fl-ar"><span>Antall år</span><input type="number" id="fl-ar" min="1" max="30" step="1" value="3"></label></div>' +
      '<div id="fl-kalk-res" aria-live="polite"></div><div id="fl-kalk-diagram"></div>' +
      '<div class="ka-metode"><h3>Huskeregler</h3><ul><li>Se på den <strong>effektive renten</strong>. Den tar med gebyrer og viser hva lånet egentlig koster.</li><li>Forbrukslån og kredittkort har mye høyere rente enn boliglån og studielån.</li><li>Betaler du ikke regningene, kan de gå til <strong>inkasso</strong>, og det blir mye dyrere. Du kan også få betalingsanmerkning, som gjør det vanskelig å leie bolig eller få lån senere.</li><li>Har du problemer med gjeld, kan du få gratis hjelp fra NAV.</li></ul></div>' +
      '<label class="mu-notat" for="fl-r3"><span>Prøv 50 000 kroner med 5 % og med 22 % rente over 3 år. Hva er forskjellen i renter? Hva lærte du?</span><textarea id="fl-r3" rows="3"></textarea></label></section>' +

      '<section class="le-del" id="fl-4" aria-labelledby="fl-4h"><h2 id="fl-4h">4. Ordliste</h2><dl class="fl-ord">' + [["Bruttolønn", "Lønnen før skatt er trukket."], ["Nettolønn", "Det du faktisk får utbetalt etter skattetrekk."], ["Budsjett", "En plan for inntekter og utgifter."], ["Buffer", "Sparepenger til uventede utgifter."], ["Rente", "Prisen for å låne penger, i prosent per år."], ["Effektiv rente", "Renten pluss alle gebyrer – den egentlige prisen på et lån."], ["Forbrukslån", "Lån uten sikkerhet (for eksempel bolig), med høy rente."], ["Inkasso", "Når et firma krever inn ubetalte regninger, med ekstra gebyrer."], ["Betalingsanmerkning", "Registrering om at du ikke har betalt gjeld. Den kan stoppe deg fra å få lån eller leie bolig."]].map(([a, b]) => "<div><dt>" + a + "</dt><dd>" + b + "</dd></div>").join("") + "</dl></section>" +
      '<p class="fo-merk">Til læreren: Siden dekker kompetansemålet om å vurdere hvordan arbeid, inntekt og forbruk kan påvirke personlig økonomi, levestandard og livskvalitet. Tallene er forenklede eksempler (skattetrekket er satt til 26 %). Lånekalkulatoren regner med like store månedlige innbetalinger (annuitetslån) og uten gebyrer. Se også temaet <a href="tema.html?id=sf9-okonomi">Økonomi – fra lommepenger til statsbudsjett</a>.</p>';

    const budsjett = () => {
      const bolig = +document.querySelector('input[name="fl-bolig"]:checked').value, reise = +document.querySelector('input[name="fl-reise"]:checked').value;
      const v = {}; POSTER.forEach(([id]) => { v[id] = +$("fl-" + id).value; $("fl-" + id + "-v").textContent = kr(v[id]); });
      const ut = bolig + reise + POSTER.reduce((a, [id]) => a + v[id], 0), igjen = NETTO - ut;
      $("fl-sum").innerHTML = '<p class="fl-igjen ' + (igjen < 0 ? "minus" : "pluss") + '"><span>' + (igjen < 0 ? "Du bruker mer enn du tjener:" : "Igjen etter alle utgifter:") + "</span><strong>" + kr(igjen) + "</strong></p>" +
        "<p>Utgifter: " + kr(ut) + " av " + kr(NETTO) + ". Sparing: " + kr(v.sparing) + " (" + Math.round(v.sparing / NETTO * 100) + " % av nettolønnen).</p>" +
        (igjen < 0 ? '<p class="fl-varsel">⚠️ Budsjettet går ikke opp. Hvor kan du kutte?</p>' : v.sparing < 1000 ? '<p class="fl-varsel">💡 Mange anbefaler å spare minst 10 % av lønnen og å ha en buffer på et par månedslønner.</p>' : "");
      $("fl-diagram").innerHTML = LV.diagram({ id: "fl-dg", type: "sektor", tittel: "Slik brukes nettolønnen", x: ["Bolig", "Transport", ...POSTER.map(p => p[1])], serier: [{ navn: "Kroner", verdier: [bolig, reise, ...POSTER.map(([id]) => v[id])] }] });
    };
    document.querySelectorAll('#fl-1 input').forEach(i => i.addEventListener("input", budsjett));
    budsjett();

    const hend = () => {
      let kost = 0, gjeld = 0, n = 0;
      HENDELSER.forEach(h => {
        const v = document.querySelector('input[name="fl-h-' + h.id + '"]:checked');
        if (!v) return; n++;
        const [, k, g, f] = h.valg[+v.value]; kost += k; gjeld += g;
        $("fl-k-" + h.id).textContent = (g ? "💳 " : "✔ ") + f;
      });
      $("fl-hsum").innerHTML = n ? "<p><strong>Så langt:</strong> " + kr(kost) + " brukt" + (gjeld ? ", hvorav " + kr(gjeld) + " på kreditt eller lån som må betales tilbake" : ", og ingen gjeld") + "." + (n === HENDELSER.length ? " Sammenlign med en medelev: Hvem endte med minst gjeld – og hvem fikk flest opplevelser?" : "") + "</p>" : "";
    };
    document.querySelectorAll('.fl-hendelse input').forEach(i => i.addEventListener("change", hend));

    const kalk = () => {
      const lan = Math.max(0, +$("fl-lan").value || 0), rente = Math.max(0, +$("fl-rente").value || 0), ar = Math.max(1, Math.min(30, +$("fl-ar").value || 1));
      const a = annuitet(lan, rente, ar);
      $("fl-kalk-res").innerHTML = '<dl class="fl-lonn"><div><dt>Per måned</dt><dd>' + kr(a.mnd) + "</dd></div><div><dt>Betalt totalt</dt><dd>" + kr(a.total) + '</dd></div><div class="fl-netto"><dt>Bare i renter</dt><dd>' + kr(a.renter) + "</dd></div></dl>";
      const satser = [5, 12, 22, 30];
      $("fl-kalk-diagram").innerHTML = LV.diagram({ id: "fl-kdg", type: "soyle", tittel: "Renter du betaler på " + kr(lan) + " over " + ar + " år", x: satser.map(s => s + " % rente"), serier: [{ navn: "Renter i kroner", verdier: satser.map(s => Math.round(annuitet(lan, s, ar).renter)) }], enhet: "Kroner", yMin: 0, verdiPaSoyle: true });
    };
    ["fl-lan", "fl-rente", "fl-ar"].forEach(id => $(id).addEventListener("input", kalk));
    kalk();
  }

  document.addEventListener("DOMContentLoaded", () => {
    side();
    const l = document.createElement("div"); l.className = "svarlinje"; l.innerHTML = '<div class="svarlinje-indre"><label class="skjult-visuelt" for="elevnavn">Navn</label><input id="elevnavn" type="text" placeholder="Navn" autocomplete="off"><span class="status" role="status" aria-live="polite"></span></div>'; document.body.appendChild(l);
  });
})();
