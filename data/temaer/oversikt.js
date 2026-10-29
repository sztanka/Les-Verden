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
  },
  {
    id: "en10-identity-stereotypes",
    fag: "engelsk",
    trinn: 10,
    tittel: "Identity and Stereotypes: American Born Chinese",
    kort: "Who are you – and who do others think you are? Identity, stereotypes and Gene Luen Yang’s graphic novel.",
    sted: { navn: "San Francisco", lat: 37.77, lon: -122.42 },
    bilde: "assets/bilder/en10-identity-stereotypes.svg",
    bildeAlt: "Tegning av tre tegneserieruter: en snakkeboble med «Who am I?», et speil og en gruppe ulike ansikter",
    kreditt: "",
    sprak: "en",
    fakta: [
      "American Born Chinese was the first graphic novel ever to be a finalist for the National Book Award in the USA.",
      "In 1882, the USA passed a law that stopped Chinese workers from moving to the country. It was not fully removed until 1943.",
      "The Monkey King comes from Journey to the West, a Chinese novel that is more than 400 years old."
    ]
  },
  {
    id: "en10-indigenous-peoples",
    fag: "engelsk",
    trinn: 10,
    tittel: "Indigenous Peoples",
    kort: "Native Americans and First Nations – their history, their fight for rights, and what they have in common with the Sámi.",
    sted: { navn: "Wounded Knee, South Dakota", lat: 43.14, lon: -102.37 },
    bilde: "https://images.unsplash.com/photo-1781153337895-5eb9f488b826?ixlib=rb-4.1.0&w=1200&q=75&fm=jpg&fit=max",
    bildeAlt: "Fargerike, utskårne totempæler i Stanley Park i Vancouver",
    kreditt: "Anthony Maw",
    kredittUrl: "https://unsplash.com/@anthonymaw?utm_source=les_verden&utm_medium=referral",
    kilde: "Unsplash",
    kildeUrl: "https://unsplash.com/?utm_source=les_verden&utm_medium=referral",
    sprak: "en",
    fakta: [
      "There are more than 470 million indigenous people in the world – more than the populations of the USA and Canada together.",
      "More than 570 Native American nations are officially recognized by the US government.",
      "The Sámi Parliament in Norway was opened in Karasjok in 1989."
    ]
  },
  {
    id: "en10-democracy-citizenship",
    fag: "engelsk",
    trinn: 10,
    tittel: "Democracy and Citizenship",
    kort: "How American democracy works, what it means to be a citizen – and why the USA has become so divided.",
    sted: { navn: "Washington, D.C.", lat: 38.89, lon: -77.01 },
    bilde: "https://images.unsplash.com/photo-1520525003249-2b9cdda513bc?ixlib=rb-4.1.0&w=1200&q=75&fm=jpg&fit=max",
    bildeAlt: "Kongressbygningen (Capitol) i Washington, D.C. med hvit kuppel mot blå himmel",
    kreditt: "Louis Velazquez",
    kredittUrl: "https://unsplash.com/@angelvela?utm_source=les_verden&utm_medium=referral",
    kilde: "Unsplash",
    kildeUrl: "https://unsplash.com/?utm_source=les_verden&utm_medium=referral",
    sprak: "en",
    fakta: [
      "The US Constitution from 1787 is the oldest written national constitution still in use. Norway’s, from 1814, is the second oldest.",
      "To become president of the USA, a candidate needs 270 of the 538 electoral votes."
    ]
  },
  {
    id: "en10-oppression",
    fag: "engelsk",
    trinn: 10,
    tittel: "Oppression: From Slavery to Civil Rights and Apartheid",
    kort: "Slavery, segregation and apartheid – and the people who fought back, from Rosa Parks to Nelson Mandela.",
    sted: { navn: "Montgomery, Alabama", lat: 32.37, lon: -86.3 },
    bilde: "https://images.unsplash.com/photo-1788350964414-cf854dcf5dd8?ixlib=rb-4.1.0&w=1200&q=75&fm=jpg&fit=max",
    bildeAlt: "Minnesmerket over Martin Luther King Jr. i Washington, D.C., hugget i stein",
    kreditt: "Charles Nouwen",
    kredittUrl: "https://unsplash.com/@charlesnouwen?utm_source=les_verden&utm_medium=referral",
    kilde: "Unsplash",
    kildeUrl: "https://unsplash.com/?utm_source=les_verden&utm_medium=referral",
    sprak: "en",
    fakta: [
      "The Montgomery Bus Boycott, which started when Rosa Parks was arrested, lasted for 381 days.",
      "Martin Luther King Jr. was only 35 years old when he won the Nobel Peace Prize in 1964.",
      "Nelson Mandela spent 27 years in prison before he became South Africa’s first Black president."
    ]
  },
  {
    id: "en10-leading-following",
    fag: "engelsk",
    trinn: 10,
    tittel: "Leading and Following",
    kort: "What makes a good leader, why people obey – and what dystopias like The Hunger Games warn us about.",
    sted: { navn: "New Haven (Yale University)", lat: 41.31, lon: -72.92 },
    bilde: "https://images.unsplash.com/photo-1758990849040-800ca71f84e2?ixlib=rb-4.1.0&w=1200&q=75&fm=jpg&fit=max",
    bildeAlt: "Svart-hvitt foto av en svane som svømmer foran en stor flokk ender",
    kreditt: "Evgeniy Beloshytskiy",
    kredittUrl: "https://unsplash.com/@eugeniqa?utm_source=les_verden&utm_medium=referral",
    kilde: "Unsplash",
    kildeUrl: "https://unsplash.com/?utm_source=les_verden&utm_medium=referral",
    sprak: "en",
    fakta: [
      "In Stanley Milgram’s experiment, about two out of three people obeyed orders all the way to the highest level of electric shock.",
      "Malala Yousafzai was only 17 when she won the Nobel Peace Prize – the youngest winner ever.",
      "George Orwell’s novel Nineteen Eighty-Four gave us the expression “Big Brother is watching you”."
    ]
  },
  {
    id: "en10-group-think",
    fag: "engelsk",
    trinn: 10,
    tittel: "Group Think: Fake News and Echo Chambers",
    kort: "Why groups make bad decisions, how false information spreads – and how to think for yourself.",
    sted: { navn: "Bay of Pigs, Cuba", lat: 22.35, lon: -80.95 },
    bilde: "https://images.unsplash.com/photo-1532356884227-66d7c0e9e4c2?ixlib=rb-4.1.0&w=1200&q=75&fm=jpg&fit=max",
    bildeAlt: "En rekke hender som holder mobiltelefoner og scroller",
    kreditt: "Robin Worrall",
    kredittUrl: "https://unsplash.com/@robin_rednine?utm_source=les_verden&utm_medium=referral",
    kilde: "Unsplash",
    kildeUrl: "https://unsplash.com/?utm_source=les_verden&utm_medium=referral",
    sprak: "en",
    fakta: [
      "In Solomon Asch’s experiment, three out of four people gave an obviously wrong answer at least once – just to fit in.",
      "A large study from 2018 found that false news spreads further and faster on Twitter than true news."
    ]
  },
  {
    id: "en10-narrated-stories",
    fag: "engelsk",
    trinn: 10,
    tittel: "Narrated Stories: How Stories Work",
    kort: "Plot, narrator, characters and themes – the tools writers use, and how to talk about a story.",
    bilde: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?ixlib=rb-4.1.0&w=1200&q=75&fm=jpg&fit=max",
    bildeAlt: "Mange åpne bøker som ligger oppå hverandre",
    kreditt: "Patrick Tomasso",
    kredittUrl: "https://unsplash.com/@impatrickt?utm_source=les_verden&utm_medium=referral",
    kilde: "Unsplash",
    kildeUrl: "https://unsplash.com/?utm_source=les_verden&utm_medium=referral",
    sprak: "en",
    fakta: [
      "The word “protagonist” comes from Greek and means “first actor”.",
      "S. E. Hinton started writing The Outsiders when she was only fifteen years old."
    ]
  },
  {
    id: "en10-english-speaking-world",
    fag: "engelsk",
    trinn: 10,
    tittel: "The English-Speaking World",
    kort: "How English became a world language, the many varieties of English – and what it means for Norwegian.",
    bilde: "https://images.unsplash.com/photo-1650526087824-163941841b52?ixlib=rb-4.1.0&w=1200&q=75&fm=jpg&fit=max",
    bildeAlt: "Et verdenskart med nåler som markerer steder",
    kreditt: "Leandro Barreto",
    kredittUrl: "https://unsplash.com/@lpbarreto?utm_source=les_verden&utm_medium=referral",
    kilde: "Unsplash",
    kildeUrl: "https://unsplash.com/?utm_source=les_verden&utm_medium=referral",
    sprak: "en",
    fakta: [
      "Only about one in four English speakers in the world has English as their mother tongue.",
      "Pilots and air traffic controllers all over the world use English to talk to each other.",
      "South Africa has twelve official languages – English is only one of them."
    ]
  }
];
