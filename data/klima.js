/* =========================================================
   Les verden – Klimatoppmøtet (klima.html)
   Forhandlingsspill med en FORENKLET klimamodell. Delegasjonene er
   oppdiktede og bruker landene fra FN-rollespillet (data/fn.js) som
   ledere for hver sin gruppe av land.
   e0 = CO₂-utslipp i 2025 (milliarder tonn), g = årlig vekst fram til 2050
   uten nye tiltak, folk = milliarder innbyggere, hist = andel av alle
   utslipp siden 1850 (oppdiktet, men i samme størrelsesorden som
   virkelige grupper av land).
   Modellen: temperatur 2100 ≈ 1,3 °C + 0,45 °C per 1000 milliarder tonn
   CO₂ sluppet ut fra 2025 til 2100. Den er laget for å vise sammenhenger,
   ikke for å spå framtiden.
   ========================================================= */
window.LV = window.LV || {};
LV.klima = {
  start: 2025, slutt: 2100, startTemp: 1.3, tcre: 0.00045, fondMal: 100,
  rest: { navn: "Resten av verden", // følger snittet av delegasjonene
    e0: 2, g: 0.01, farge: "#9aa3ad" },
  delegasjoner: [
    { id: "valoria", navn: "Valoria og allierte", ikon: "🏭", farger: ["#5b2a86", "#e0e0e0", "#2d6a4f"], farge: "#5b2a86",
      e0: 9, g: 0, folk: 0.6, hist: 30, type: "Rike industriland",
      hvem: "Dere leder en gruppe rike land med stor industri, mange biler og høyt forbruk. Dere har sluppet ut mer enn noen andre gjennom historien.",
      vil: ["Beskytte arbeidsplassene i bilindustrien og industrien.", "Få de store vekstlandene, særlig Kalmira, til å kutte også.", "Unngå å betale alene til klimafondet."],
      grenser: ["Dere kan ikke love kutt på mer enn 4 % i året uten at Kalmira også lover å nå toppen før 2035.", "Dere betaler ikke mer enn 40 milliarder dollar i året til fondet."],
      kort: "Kutt er dyrt, men dere har penger og teknologi. Velgerne hjemme er delt." },
    { id: "nordlandia", navn: "Nordlandia-unionen", ikon: "🛢️", farger: ["#2a6f97", "#f4d35e", "#2a6f97"], farge: "#3c8d5a",
      e0: 4, g: -0.01, folk: 0.5, hist: 25, type: "Rike land med olje, gass og velferd",
      hvem: "Dere leder en union av rike land med godt velferdssystem. Utslippene hjemme går allerede ned, men dere tjener mye penger på å selge olje og gass til andre.",
      vil: ["Vise at dere er et ansvarlig foregangsland.", "Fortsette å selge olje og gass noen år til.", "Sørge for at pengene i klimafondet blir brukt riktig."],
      grenser: ["Dere kan kutte mye hjemme (opptil 7 % i året), men vil ikke love å stanse olje- og gassalget.", "Dere betaler gjerne til fondet – men bare hvis andre rike land også betaler."],
      kort: "Dere har råd til å gå foran. Men blir dere troverdige når dere selger olje til resten av verden?" },
    { id: "kalmira", navn: "Kalmira og nabolandene", ikon: "⚡", farger: ["#d4a017", "#1d6b3b", "#d4a017"], farge: "#d4a017",
      e0: 14, g: 0.02, folk: 1.6, hist: 20, type: "Store land i rask vekst",
      hvem: "Dere leder en gruppe store land der økonomien vokser raskt. Hundrevis av millioner mennesker er løftet ut av fattigdom, men mange er fortsatt fattige. Det meste av strømmen kommer fra kull.",
      vil: ["Fortsette den økonomiske veksten.", "At de rike landene, som har sluppet ut mest gjennom historien, kutter først og mest.", "Selge solcellepaneler og elbiler til resten av verden."],
      grenser: ["Utslippene kan ikke nå toppen før 2030.", "Dere skal ikke betale til fondet, men kan godta å ikke få penger fra det."],
      kort: "Dere slipper ut mest i dag, men per person er det mindre enn i de rike landene." },
    { id: "marenia", navn: "Marenia-gruppa", ikon: "🌊", farger: ["#1565c0", "#ffffff", "#43a047"], farge: "#1565c0",
      e0: 8, g: 0.02, folk: 2.2, hist: 15, type: "Mellominntektsland",
      hvem: "Dere leder en stor gruppe mellominntektsland med lange kyster, voksende byer og mye industri på vei opp.",
      vil: ["Få tilgang til ny grønn teknologi uten å betale full pris.", "Beskytte kysten og fiskeriene mot varmere og høyere hav.", "Få penger fra fondet til å bygge sol- og vindkraft."],
      grenser: ["Dere kan nå toppen tidlig (2030) hvis dere får minst 30 milliarder dollar i året fra fondet. Ellers ikke før 2045.", "Dere betaler ikke til fondet."],
      kort: "Dere kan bli vinnere i det grønne skiftet – hvis dere får hjelp til å komme i gang." },
    { id: "sahar", navn: "Sahar-gruppa", ikon: "🌾", farger: ["#c56a1b", "#f5e6c8", "#2e7d32"], farge: "#c56a1b",
      e0: 3, g: 0.03, folk: 2.5, hist: 3, type: "Fattige land",
      hvem: "Dere leder en gruppe fattige land der de fleste lever av jordbruk. Dere har nesten ikke bidratt til klimaendringene, men tørke og flom rammer dere hardt.",
      vil: ["Få penger til å tilpasse dere: vanning, nye avlinger, flomvern.", "Få strøm til alle – helst fra sol, hvis noen hjelper til.", "Få rettferdig behandling: De som har skapt problemet, må betale."],
      grenser: ["Dere lover ingen kutt før dere har fått minst 40 milliarder dollar i året fra fondet.", "Dere kan velge å ikke bygge kullkraft hvis dere får hjelp til sol."],
      kort: "Dere har svært lite makt i økonomien, men sterke moralske argumenter." },
    { id: "tavu", navn: "Tavu-alliansen", ikon: "🏝️", farger: ["#0aa2c0", "#f2c94c", "#0aa2c0"], farge: "#0aa2c0",
      e0: 0.2, g: 0.01, folk: 0.07, hist: 0.1, type: "Små øystater",
      hvem: "Dere leder en allianse av små øystater. Mange av øyene ligger bare noen meter over havet. Utslippene deres er nesten null.",
      vil: ["At verden holder oppvarmingen under 1,5 °C. For dere handler det om å overleve som land.", "Penger til diker, flytting og tap og skade.", "Presse de store landene – dere har ingenting å tape på å være tydelige."],
      grenser: ["Dere godtar ikke en avtale som gir mer enn 2 °C uten å protestere høyt.", "Dere kan bruke vetotrusselen: Uten dere er avtalen ikke enstemmig."],
      kort: "Dere er små, men verden lytter når dere forteller hva som skjer med øyene deres." }
  ],
  gang: [
    ["Forberedelse", "Les rollekortet i delegasjonen. Bli enige om hva dere vil oppnå, og hva dere aldri kan godta. Skriv en kort åpningstale.", "10 min"],
    ["Åpningstaler", "Hver delegasjon holder en tale på maks 1 minutt: Hvem er vi, hva trenger vi, hva krever vi av de andre?", "8 min"],
    ["Runde 1: forhandling", "Delegasjonene går rundt og forhandler. Til slutt leverer hver delegasjon et tilbud: toppår, kutt per år og penger til eller fra fondet.", "10 min"],
    ["Modellen", "Læreren legger inn tilbudene. Hvor varmt blir det i 2100? Er det nok penger i fondet?", "5 min"],
    ["Hendelse og runde 2", "Læreren leser en hendelse. Delegasjonene forhandler på nytt og leverer et nytt tilbud.", "10 min"],
    ["Runde 3: siste sjanse", "Siste tilbud. Kan dere bli enige om en avtale alle kan leve med?", "10 min"],
    ["Etterarbeid", "Hva var vanskeligst å bli enige om? Hvem fikk mest gjennomslag – og var det rettferdig?", "10 min"]
  ],
  hendelser: [
    { tittel: "Hetebølge og tørke", tekst: "En rekordlang hetebølge rammer Sahar-gruppa. Avlingene slår feil, og millioner mangler mat. Bildene vises på nyhetene over hele verden." },
    { tittel: "Billig solkraft", tekst: "Ny forskning gjør solcellepaneler 30 % billigere. Det blir billigere å kutte – særlig for land som skal bygge ut mye ny strøm." },
    { tittel: "Valg i Valoria", tekst: "Valoria får ny regjering etter et valg. Den nye presidenten sier at klimaavtaler koster arbeidsplasser. Valoria-delegasjonen får beskjed om å være mer forsiktig." },
    { tittel: "Storm over Tavu", tekst: "En kraftig storm treffer Tavu-øyene. Hus, skoler og vannforsyning blir ødelagt. Presidenten i Tavu holder en tale for hele toppmøtet." },
    { tittel: "Oljepris-sjokk", tekst: "Oljeprisen stiger kraftig. Nordlandia tjener mer enn noen gang, mens fattige land sliter med å betale for drivstoff." }
  ],
  konsekvenser: [
    { maks: 1.6, tittel: "Rundt 1,5 °C", tekst: "Dette er målet i Parisavtalen. Mange korallrev forsvinner likevel, hetebølger blir vanligere, og havet stiger. Men de fleste samfunn kan tilpasse seg, og risikoen for store, varige endringer er mye mindre enn ved høyere temperaturer." },
    { maks: 2.1, tittel: "Rundt 2 °C", tekst: "Nesten alle korallrev forsvinner. Isfrie somre i Arktis blir mye vanligere. Flere hundre millioner flere mennesker opplever ekstrem hete, tørke eller flom enn ved 1,5 °C. Små øystater og kystbyer får store problemer." },
    { maks: 3.1, tittel: "Rundt 3 °C", tekst: "Store deler av verden får hetebølger som er farlige for helsen. Avlinger svikter oftere, og mange områder blir vanskelige å bo i. Risikoen øker for at isbreer på Grønland og i Antarktis smelter så mye at havet stiger mange meter over flere hundre år." },
    { maks: 99, tittel: "Over 3 °C", tekst: "Verden blir mye farligere og mer uforutsigbar. Mange land får store problemer med mat og vann, og flere hundre millioner mennesker kan bli tvunget til å flytte. Mange endringer kan ikke reverseres på flere tusen år." }
  ],
  refleksjon: [
    "Hvilket land eller hvilken gruppe hadde mest makt i forhandlingene? Hvorfor?",
    "Er det rettferdig at alle land kutter like mye? Bruk tallene for utslipp per person og utslipp gjennom historien.",
    "Hvorfor er det så vanskelig å bli enige om klimatiltak, selv om alle vet at oppvarmingen er farlig?",
    "Sammenlign med Parisavtalen (2015). Hva lignet på deres forhandlinger, og hva var annerledes?"
  ],
  kontroller: "Modellen er forenklet: Den regner bare med CO₂, «resten av verden» (2 milliarder tonn) følger samme utvikling som delegasjonene i snitt, og antar at temperaturen stiger med ca. 0,45 °C for hver 1000 milliarder tonn CO₂ (i tråd med IPCC sitt anslag på 0,27–0,63 °C). Startnivået 1,3 °C i 2025 og utslippstallene er avrundet. Konsekvensene er forenklet etter IPCC sine rapporter (blant annet spesialrapporten om 1,5 °C fra 2018). Målet om 100 milliarder dollar i året til klimafinansiering ble satt i København i 2009. Kontroller tallene mot oppdaterte kilder før bruk."
};
