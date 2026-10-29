/* Oversikt over alle temaer.
   Hvert tema har en egen fil i samme mappe, med samme navn som "id".
   Nytt tema: legg til en blokk her, og lag filen data/temaer/<id>.js.

   sted   → hvor temaet vises på verdenskartet (breddegrad og lengdegrad,
            finn dem ved å høyreklikke på stedet i Google Maps)
   bilde  → bilde på temakortet (legg bildefila i assets/bilder/)
   kreditt→ hvem som har laget bildet (skriv det når du bruker et ekte bilde)
   fakta  → 2–3 korte «Visste du at …?»-setninger til forsiden */
window.LV = window.LV || {};
window.LV.temaer = [
  {
    id: "sf9-industrialiseringen",
    fag: "samfunnsfag",
    trinn: 9,
    tittel: "Industrialiseringen",
    kort: "Fra håndkraft til maskiner og fabrikker – og hvordan livet endret seg for vanlige folk.",
    sted: { navn: "Manchester", lat: 53.48, lon: -2.24 },
    bilde: "assets/bilder/sf9-industrialiseringen.svg",
    bildeAlt: "Tegning av fabrikker med høye piper og et damptog",
    kreditt: "",
    fakta: [
      "I mange fabrikker på 1800-tallet var arbeidsdagen 12–14 timer lang, seks dager i uka.",
      "Byen Manchester vokste så raskt på grunn av bomullsfabrikkene at den fikk kallenavnet «Cottonopolis» – bomullsbyen.",
      "Norsk Hydro ble stiftet i 1905 – samme år som Norge ble et selvstendig land."
    ]
  },
  {
    id: "en9-victorian-era",
    fag: "engelsk",
    trinn: 9,
    tittel: "The Victorian Era and Charles Dickens",
    kort: "Rich and poor in Victorian Britain – and the writer who told the world about it.",
    sted: { navn: "London", lat: 51.51, lon: -0.13 },
    bilde: "assets/bilder/en9-victorian-era.svg",
    bildeAlt: "Tegning av London om kvelden med klokketårn, hustak og en gatelykt",
    kreditt: "",
    sprak: "en",
    fakta: [
      "Charles Dickens had to work in a factory when he was only twelve years old.",
      "The world’s first postage stamp, the Penny Black, was introduced in Britain in 1840.",
      "Queen Victoria ruled the United Kingdom for almost 64 years."
    ]
  }
];
