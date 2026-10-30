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
    emne: "historie",
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
  },
  {
    id: "en10-american-dream",
    fag: "engelsk",
    trinn: 10,
    tittel: "The American Dream and Immigration",
    kort: "Ellis Island, 800,000 Norwegian emigrants and today’s immigration debate – is the American Dream real for everyone?",
    sted: { navn: "Minnesota", lat: 45.5, lon: -94.5 },
    bilde: "https://images.unsplash.com/photo-1605130284535-11dd9eedc58a?ixlib=rb-4.1.0&w=1200&q=75&fm=jpg&fit=max",
    bildeAlt: "Frihetsgudinnen foran skylinen på Manhattan under klar blå himmel",
    kreditt: "Pierre Blaché",
    kredittUrl: "https://unsplash.com/@pierre9x6?utm_source=les_verden&utm_medium=referral",
    kilde: "Unsplash",
    kildeUrl: "https://unsplash.com/?utm_source=les_verden&utm_medium=referral",
    sprak: "en",
    fakta: [
      "Around 800,000 Norwegians emigrated to America between 1825 and 1930. Only Ireland lost a larger share of its population.",
      "Around 12 million immigrants passed through Ellis Island in New York between 1892 and 1954.",
      "More than four million Americans today say they have Norwegian ancestors."
    ]
  },
  {
    id: "en10-9-11",
    fag: "engelsk",
    trinn: 10,
    tittel: "9/11 and the War on Terror",
    kort: "What happened on 11 September 2001, the wars that followed – and the debate about freedom and security.",
    sted: { navn: "New York", lat: 40.71, lon: -74.01 },
    bilde: "https://images.unsplash.com/photo-1536799097017-5b57f1a7e56e?ixlib=rb-4.1.0&w=1200&q=75&fm=jpg&fit=max",
    bildeAlt: "New York om kvelden på minnedagen 11. september, med lys over byen",
    kreditt: "Jesse Mills",
    kredittUrl: "https://unsplash.com/@photographybyjrmills?utm_source=les_verden&utm_medium=referral",
    kilde: "Unsplash",
    kildeUrl: "https://unsplash.com/?utm_source=les_verden&utm_medium=referral",
    sprak: "en",
    fakta: [
      "The day after 9/11, NATO used Article 5 for the first time in its history: an attack on one member is an attack on all.",
      "One World Trade Center is 1,776 feet tall – a reference to 1776, the year of the Declaration of Independence."
    ]
  },
  {
    id: "sf10-mellomkrigstiden",
    fag: "samfunnsfag",
    emne: "historie",
    trinn: 10,
    tittel: "Mellomkrigstiden",
    kort: "Fra håp om fred til krise og diktatur: hvordan verden gikk fra én verdenskrig til den neste.",
    sted: { navn: "München", lat: 48.14, lon: 11.58 },
    bilde: "https://images.unsplash.com/photo-1703381132774-caeab4f6a9db?ixlib=rb-4.1.0&w=1200&q=75&fm=jpg&fit=max",
    bildeAlt: "Gamle aviser stablet oppå hverandre",
    kreditt: "Jonathan Gong",
    kredittUrl: "https://unsplash.com/@jonathangongphotography?utm_source=les_verden&utm_medium=referral",
    kilde: "Unsplash",
    kildeUrl: "https://unsplash.com/?utm_source=les_verden&utm_medium=referral",
    fakta: [
      "Under krakket på børsen i New York 29. oktober 1929 – «svarte tirsdag» – ble det solgt rundt 16 millioner aksjer på én dag.",
      "I 1923 var inflasjonen i Tyskland så høy at et brød kunne koste 200 milliarder mark."
    ]
  },
  {
    id: "sf10-andre-verdenskrig",
    fag: "samfunnsfag",
    emne: "historie",
    trinn: 10,
    tittel: "Andre verdenskrig",
    kort: "Hele krigen fra Hitlers vei til makten til atombombene i 1945 – utvidet tema med tidslinje og begrepsliste.",
    sted: { navn: "Normandie", lat: 49.25, lon: -0.6 },
    bilde: "https://images.unsplash.com/photo-1633595917024-52104bc2b730?ixlib=rb-4.1.0&w=1200&q=75&fm=jpg&fit=max",
    bildeAlt: "Rader med hvite kors på en krigskirkegård",
    kreditt: "Diane Picchiottino",
    kredittUrl: "https://unsplash.com/@diane_soko?utm_source=les_verden&utm_medium=referral",
    kilde: "Unsplash",
    kildeUrl: "https://unsplash.com/?utm_source=les_verden&utm_medium=referral",
    fakta: [
      "Over 150 000 allierte soldater gikk i land i Normandie på D-dagen 6. juni 1944.",
      "Sovjetunionen mistet rundt 27 millioner mennesker i krigen – flere enn noe annet land."
    ]
  },
  {
    id: "sf10-holocaust",
    fag: "samfunnsfag",
    emne: "historie",
    trinn: 10,
    tittel: "Holocaust",
    kort: "Hvordan fordommer og hat endte i drapet på seks millioner jøder – og hva som skjedde i Norge.",
    sted: { navn: "Auschwitz (Oświęcim)", lat: 50.03, lon: 19.18 },
    bilde: "https://images.unsplash.com/photo-1747197948501-539caea4f54f?ixlib=rb-4.1.0&w=1200&q=75&fm=jpg&fit=max",
    bildeAlt: "Betongblokkene i minnesmerket over de myrdede jødene i Europa, Berlin",
    kreditt: "Yoav Aziz",
    kredittUrl: "https://unsplash.com/@yoavaziz?utm_source=les_verden&utm_medium=referral",
    kilde: "Unsplash",
    kildeUrl: "https://unsplash.com/?utm_source=les_verden&utm_medium=referral",
    fakta: [
      "Av de 773 jødene som ble deportert fra Norge, overlevde bare 34.",
      "27. januar, dagen Auschwitz ble befridd i 1945, er den internasjonale minnedagen for Holocaust."
    ]
  },
  {
    id: "sf10-okkupasjonen",
    fag: "samfunnsfag",
    emne: "historie",
    trinn: 10,
    tittel: "Norge under okkupasjonen",
    kort: "9. april, kongens nei, hverdagen under krigen, motstandskampen og oppgjøret etter 1945.",
    sted: { navn: "Oslo", lat: 59.91, lon: 10.75 },
    bilde: "https://images.unsplash.com/photo-1599999268882-78ef52790bd6?ixlib=rb-4.1.0&w=1200&q=75&fm=jpg&fit=max",
    bildeAlt: "Norges flagg som vaier mot blå himmel",
    kreditt: "Mark König",
    kredittUrl: "https://unsplash.com/@markkoenig?utm_source=les_verden&utm_medium=referral",
    kilde: "Unsplash",
    kildeUrl: "https://unsplash.com/?utm_source=les_verden&utm_medium=referral",
    fakta: [
      "Over 10 000 norske lærere nektet å melde seg inn i NS sitt lærersamband i 1942 – og vant.",
      "Navnet Quisling brukes på mange språk som et ord for «forræder»."
    ]
  },
  {
    id: "sf10-fn-menneskerettigheter",
    fag: "samfunnsfag",
    emne: "historie",
    trinn: 10,
    tittel: "FN og menneskerettighetene",
    kort: "Hvorfor FN ble opprettet, hvordan det fungerer, og hvilke rettigheter alle mennesker har.",
    sted: { navn: "New York (FN)", lat: 40.75, lon: -73.97 },
    bilde: "https://images.unsplash.com/photo-1727221167365-d365e63e7ebc?ixlib=rb-4.1.0&w=1200&q=75&fm=jpg&fit=max",
    bildeAlt: "FNs hovedkvarter i New York med flagg foran",
    kreditt: "Nils Huenerfuerst",
    kredittUrl: "https://unsplash.com/@nhuenerfuerst?utm_source=les_verden&utm_medium=referral",
    kilde: "Unsplash",
    kildeUrl: "https://unsplash.com/?utm_source=les_verden&utm_medium=referral",
    fakta: [
      "FNs første generalsekretær var nordmannen Trygve Lie.",
      "Barnekonvensjonen er den menneskerettighetskonvensjonen som flest land i verden har sluttet seg til."
    ]
  },
  {
    id: "sf10-kalde-krigen",
    fag: "samfunnsfag",
    emne: "historie",
    trinn: 10,
    tittel: "Den kalde krigen",
    kort: "USA mot Sovjetunionen: jernteppet, Berlinmuren, atomtrusselen og romkappløpet.",
    sted: { navn: "Berlin", lat: 52.52, lon: 13.4 },
    bilde: "https://images.unsplash.com/photo-1772132823993-e0cb98edf929?ixlib=rb-4.1.0&w=1200&q=75&fm=jpg&fit=max",
    bildeAlt: "Fargerik graffiti på en rest av Berlinmuren",
    kreditt: "Daria K",
    kredittUrl: "https://unsplash.com/@amberfoxfilm?utm_source=les_verden&utm_medium=referral",
    kilde: "Unsplash",
    kildeUrl: "https://unsplash.com/?utm_source=les_verden&utm_medium=referral",
    fakta: [
      "Berlinmuren sto i 28 år, fra 1961 til 1989.",
      "Norge var det eneste NATO-landet i Nord-Europa med grense mot Sovjetunionen."
    ]
  },
  {
    id: "sf10-klimaendringer",
    fag: "samfunnsfag",
    emne: "geografi",
    trinn: 10,
    tittel: "Klimaendringer",
    kort: "Drivhuseffekten, følgene for verden og Norge – og dilemmaene når klimaet skal reddes.",
    sted: { navn: "Svalbard", lat: 78.22, lon: 15.65 },
    bilde: "https://images.unsplash.com/photo-1550695319-209e0e343dc9?ixlib=rb-4.1.0&w=1200&q=75&fm=jpg&fit=max",
    bildeAlt: "Isblokker som brekker av en isbre",
    kreditt: "Dominik Van Opdenbosch",
    kredittUrl: "https://unsplash.com/@derobi?utm_source=les_verden&utm_medium=referral",
    kilde: "Unsplash",
    kildeUrl: "https://unsplash.com/?utm_source=les_verden&utm_medium=referral",
    fakta: [
      "Uten den naturlige drivhuseffekten ville gjennomsnittstemperaturen på jorda vært rundt 18 minusgrader.",
      "Svalbard varmes opp flere ganger raskere enn gjennomsnittet for hele kloden."
    ]
  },
  {
    id: "sf10-internasjonalt-samarbeid",
    fag: "samfunnsfag",
    emne: "geografi",
    trinn: 10,
    tittel: "Internasjonalt samarbeid: EU, NATO og Norge",
    kort: "Hvorfor land samarbeider, hva EU og NATO er – og hvorfor Norge står utenfor EU, men likevel er med.",
    sted: { navn: "Brussel", lat: 50.85, lon: 4.35 },
    bilde: "https://images.unsplash.com/photo-1594810205183-18a8b0ce6c13?ixlib=rb-4.1.0&w=1200&q=75&fm=jpg&fit=max",
    bildeAlt: "Rad med EU-flagg utenfor EU-kommisjonens bygning i Brussel",
    kreditt: "Guillaume Périgois",
    kredittUrl: "https://unsplash.com/@guillaumeperigois?utm_source=les_verden&utm_medium=referral",
    kilde: "Unsplash",
    kildeUrl: "https://unsplash.com/?utm_source=les_verden&utm_medium=referral",
    fakta: [
      "Norge har sagt nei til EU-medlemskap to ganger, i 1972 og 1994.",
      "NATOs artikkel 5 er bare brukt én gang – etter terrorangrepene mot USA i 2001."
    ]
  },
  {
    id: "sf10-demokrati-diktatur",
    fag: "samfunnsfag",
    emne: "samfunnskunnskap",
    trinn: 10,
    tittel: "Demokrati og diktatur",
    kort: "Hva skiller folkestyre fra diktatur, og hvordan kan et demokrati svekkes steg for steg?",
    bilde: "https://images.unsplash.com/photo-1782998307726-f93ec14eda24?ixlib=rb-4.1.0&w=1200&q=75&fm=jpg&fit=max",
    bildeAlt: "To stemmebåser klare til bruk i et valglokale",
    kreditt: "Jesse Paul",
    kredittUrl: "https://unsplash.com/@jesseapaul?utm_source=les_verden&utm_medium=referral",
    kilde: "Unsplash",
    kildeUrl: "https://unsplash.com/?utm_source=les_verden&utm_medium=referral",
    fakta: [
      "Norges grunnlov fra 1814 er en av de eldste grunnlovene i verden som fortsatt er i bruk.",
      "Ordet demokrati kommer fra gresk og betyr «folkestyre»."
    ]
  },
  {
    id: "sf10-polarisering",
    fag: "samfunnsfag",
    emne: "samfunnskunnskap",
    trinn: 10,
    tittel: "Polarisering: når vi glir fra hverandre",
    kort: "Uenighet, algoritmer og ekkokamre – og hvorfor det er viktig å kunne være uenig på en god måte.",
    bilde: "https://images.unsplash.com/photo-1532356884227-66d7c0e9e4c2?ixlib=rb-4.1.0&w=1200&q=75&fm=jpg&fit=max",
    bildeAlt: "Rad med hender som holder mobiltelefoner",
    kreditt: "Robin Worrall",
    kredittUrl: "https://unsplash.com/@robin_rednine?utm_source=les_verden&utm_medium=referral",
    kilde: "Unsplash",
    kildeUrl: "https://unsplash.com/?utm_source=les_verden&utm_medium=referral",
    fakta: [
      "Innlegg som vekker sinne, sprer seg ofte raskere på sosiale medier enn rolige og nyanserte innlegg.",
      "Ordet polarisering kommer fra «pol», som i Nordpolen og Sydpolen."
    ]
  },
  {
    id: "sf10-konfliktlosning",
    fag: "samfunnsfag",
    emne: "samfunnskunnskap",
    trinn: 10,
    tittel: "Konflikt og konfliktløsning",
    kort: "Fra konflikttrappa og mekling i klasserommet til fredsforhandlinger mellom land.",
    sted: { navn: "Oslo (Nobels fredssenter)", lat: 59.91, lon: 10.73 },
    bilde: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.1.0&w=1200&q=75&fm=jpg&fit=max",
    bildeAlt: "To personer som håndhilser",
    kreditt: "Cytonn Photography",
    kredittUrl: "https://unsplash.com/@cytonn_photography?utm_source=les_verden&utm_medium=referral",
    kilde: "Unsplash",
    kildeUrl: "https://unsplash.com/?utm_source=les_verden&utm_medium=referral",
    fakta: [
      "Oslo-avtalen fra 1993 ble forhandlet fram i hemmelighet i Norge.",
      "Den norske fredsforskeren Johan Galtung skilte mellom negativ og positiv fred."
    ]
  },
  {
    id: "sf9-arbeiderbevegelsen",
    fag: "samfunnsfag",
    emne: "historie",
    trinn: 9,
    tittel: "Arbeiderbevegelsen",
    kort: "Fra Marcus Thrane til åttetimersdagen – hvordan arbeiderne gikk sammen og fikk bedre kår.",
    sted: { navn: "Arendal", lat: 58.46, lon: 8.77 },
    bilde: "assets/bilder/sf9-arbeiderbevegelsen.svg",
    bildeAlt: "Tegning av et 1. mai-tog med arbeidere som bærer en rød fane",
    kreditt: "",
    fakta: [
      "Kravet om åttetimersdagen lød: «åtte timer arbeid, åtte timer hvile og åtte timer fritid».",
      "Arbeiderpartiets første regjering i 1928 varte bare i 18 dager."
    ]
  },
  {
    id: "sf9-utvandringen",
    fag: "samfunnsfag",
    emne: "historie",
    trinn: 9,
    tittel: "Utvandringen til Amerika",
    kort: "Hvorfor 800 000 nordmenn reiste over Atlanterhavet – og hvordan livet ble i Amerika.",
    sted: { navn: "Stavanger", lat: 58.97, lon: 5.73 },
    bilde: "https://images.unsplash.com/photo-1605999358548-c8593e96cb83?ixlib=rb-4.1.0&w=1200&q=75&fm=jpg&fit=max",
    bildeAlt: "Et gammelt seilskip med hvite seil på havet",
    kreditt: "Michael Jerrard",
    kredittUrl: "https://unsplash.com/@michaeljerrard?utm_source=les_verden&utm_medium=referral",
    kilde: "Unsplash",
    kildeUrl: "https://unsplash.com/?utm_source=les_verden&utm_medium=referral",
    fakta: [
      "Da sluppen Restauration kom fram til New York i 1825, var det én passasjer mer om bord enn da den dro – et barn ble født underveis.",
      "Rundt 800 000 nordmenn utvandret til Amerika mellom 1825 og 1930."
    ]
  },
  {
    id: "sf9-kolonialisme",
    fag: "samfunnsfag",
    emne: "historie",
    trinn: 9,
    tittel: "Kolonialisme og imperialisme",
    kort: "Hvordan europeiske land delte Afrika og Asia mellom seg – og sporene det har satt.",
    sted: { navn: "Kongo (Kinshasa)", lat: -4.32, lon: 15.31 },
    bilde: "https://images.unsplash.com/photo-1723306743407-cb6ac8f19941?ixlib=rb-4.1.0&w=1200&q=75&fm=jpg&fit=max",
    bildeAlt: "Et gammelt verdenskart fra 1880",
    kreditt: "The New York Public Library",
    kredittUrl: "https://unsplash.com/@nypl?utm_source=les_verden&utm_medium=referral",
    kilde: "Unsplash",
    kildeUrl: "https://unsplash.com/?utm_source=les_verden&utm_medium=referral",
    fakta: [
      "Ingen afrikanere var invitert da europeiske stormakter møttes i Berlin i 1884–1885 for å bli enige om delingen av Afrika.",
      "Etiopia slo en italiensk hær ved Adwa i 1896 og ble ikke kolonisert."
    ]
  },
  {
    id: "sf9-nasjonalisme",
    fag: "samfunnsfag",
    emne: "historie",
    trinn: 9,
    tittel: "Nasjonalisme og 1905",
    kort: "Eventyr, bunader og unionsoppløsning – nasjonalismens lyse og mørke sider.",
    sted: { navn: "Karlstad", lat: 59.38, lon: 13.5 },
    bilde: "https://images.unsplash.com/photo-1616263674612-842b02a25dbe?ixlib=rb-4.1.0&w=1200&q=75&fm=jpg&fit=max",
    bildeAlt: "En norsk stavkirke",
    kreditt: "Karo K.",
    kredittUrl: "https://unsplash.com/@karo1504?utm_source=les_verden&utm_medium=referral",
    kilde: "Unsplash",
    kildeUrl: "https://unsplash.com/?utm_source=les_verden&utm_medium=referral",
    fakta: [
      "I folkeavstemningen om unionsoppløsningen i 1905 stemte bare 184 nordmenn nei.",
      "Asbjørnsen og Moe ga ut de første norske folkeeventyrene i 1841."
    ]
  },
  {
    id: "sf9-fornorskingen",
    fag: "samfunnsfag",
    emne: "historie",
    trinn: 9,
    tittel: "Fornorskingen av samene",
    kort: "Hvordan staten prøvde å gjøre samer og kvener norske – og veien mot forsoning.",
    sted: { navn: "Karasjok", lat: 69.47, lon: 25.51 },
    bilde: "https://images.unsplash.com/photo-1707550511844-a5d913deb20b?ixlib=rb-4.1.0&w=1200&q=75&fm=jpg&fit=max",
    bildeAlt: "To reinsdyr i snøen",
    kreditt: "Mylène Haudebourg",
    kredittUrl: "https://unsplash.com/@mylenehaudebourg14?utm_source=les_verden&utm_medium=referral",
    kilde: "Unsplash",
    kildeUrl: "https://unsplash.com/?utm_source=les_verden&utm_medium=referral",
    fakta: [
      "Samefolkets dag 6. februar er til minne om det første samiske landsmøtet i Trondheim i 1917.",
      "I 1997 ba kong Harald samene om unnskyldning for den uretten staten hadde gjort."
    ]
  },
  {
    id: "sf9-forste-verdenskrig",
    fag: "samfunnsfag",
    emne: "historie",
    trinn: 9,
    tittel: "Første verdenskrig",
    kort: "Skuddene i Sarajevo, livet i skyttergravene og krigen som forandret Europa.",
    sted: { navn: "Verdun", lat: 49.16, lon: 5.38 },
    bilde: "https://images.unsplash.com/photo-1527615532814-540d0d97d938?ixlib=rb-4.1.0&w=1200&q=75&fm=jpg&fit=max",
    bildeAlt: "En åker full av røde valmuer",
    kreditt: "Léonard Cotte",
    kredittUrl: "https://unsplash.com/@ettocl?utm_source=les_verden&utm_medium=referral",
    kilde: "Unsplash",
    kildeUrl: "https://unsplash.com/?utm_source=les_verden&utm_medium=referral",
    fakta: [
      "Den røde valmuen er et minnesymbol for første verdenskrig, fordi valmuer vokste på slagmarkene i Flandern.",
      "Våpenhvilen trådte i kraft den 11. dagen i den 11. måneden klokka 11 i 1918."
    ]
  },
  {
    id: "sf9-russiske-revolusjonen",
    fag: "samfunnsfag",
    emne: "historie",
    trinn: 9,
    tittel: "Den russiske revolusjonen",
    kort: "Fra tsar til kommunisme – revolusjonen i 1917 og fødselen av Sovjetunionen.",
    sted: { navn: "St. Petersburg", lat: 59.94, lon: 30.31 },
    bilde: "https://images.unsplash.com/photo-1609192604404-8574f77e5f5a?ixlib=rb-4.1.0&w=1200&q=75&fm=jpg&fit=max",
    bildeAlt: "Palassplassen i St. Petersburg om kvelden",
    kreditt: "Klaus Wright",
    kredittUrl: "https://unsplash.com/@klausswright?utm_source=les_verden&utm_medium=referral",
    kilde: "Unsplash",
    kildeUrl: "https://unsplash.com/?utm_source=les_verden&utm_medium=referral",
    fakta: [
      "Oktoberrevolusjonen skjedde i november etter vår kalender, fordi Russland brukte en eldre kalender.",
      "Byen St. Petersburg har hatt tre navn: Petrograd fra 1914 og Leningrad fra 1924 til 1991."
    ]
  },
  {
    id: "en9-british-empire",
    fag: "engelsk",
    trinn: 9,
    tittel: "The British Empire and the Spread of English",
    kort: "How a small island ruled a quarter of the world – and why English became a world language.",
    sted: { navn: "London", lat: 51.51, lon: -0.13 },
    bilde: "https://images.unsplash.com/photo-1600907055749-d6cc7e75efd4?ixlib=rb-4.1.0&w=1200&q=75&fm=jpg&fit=max",
    bildeAlt: "Et gammelt globus i gull og sølv",
    kreditt: "CHUTTERSNAP",
    kredittUrl: "https://unsplash.com/@chuttersnap?utm_source=les_verden&utm_medium=referral",
    kilde: "Unsplash",
    kildeUrl: "https://unsplash.com/?utm_source=les_verden&utm_medium=referral",
    sprak: "en",
    fakta: [
      "Around 1920, the British Empire ruled about a quarter of the world’s land.",
      "Most of the world’s English speakers today are not native speakers."
    ]
  },
  {
    id: "en9-australia",
    fag: "engelsk",
    trinn: 9,
    tittel: "Australia and the Stolen Generations",
    kort: "The First Australians, British colonization and the children who were taken from their families.",
    sted: { navn: "Sydney", lat: -33.87, lon: 151.21 },
    bilde: "https://images.unsplash.com/photo-1685362862102-1f9858423939?ixlib=rb-4.1.0&w=1200&q=75&fm=jpg&fit=max",
    bildeAlt: "Aboriginal helleristninger på en stor stein i Vest-Australia",
    kreditt: "René Riegal",
    kredittUrl: "https://unsplash.com/@riegal?utm_source=les_verden&utm_medium=referral",
    kilde: "Unsplash",
    kildeUrl: "https://unsplash.com/?utm_source=les_verden&utm_medium=referral",
    sprak: "en",
    fakta: [
      "People have lived in Australia for more than 60,000 years.",
      "Before the British arrived, more than 250 languages were spoken in Australia."
    ]
  },
  {
    id: "sf9-naeringsveier",
    fag: "samfunnsfag",
    emne: "geografi",
    trinn: 9,
    tittel: "Næringsveier – hva lever vi av?",
    kort: "Fra fiske og jordbruk til olje, havbruk og IT – hvordan næringslivet i Norge har forandret seg.",
    sted: { navn: "Lofoten", lat: 68.15, lon: 13.61 },
    bilde: "https://images.unsplash.com/photo-1681027100002-0cd58c68b4f2?ixlib=rb-4.1.0&w=1200&q=75&fm=jpg&fit=max",
    bildeAlt: "Fiskebåter i havna i Henningsvær i Lofoten, med snødekte fjell i bakgrunnen",
    kreditt: "Daniel Diemer",
    kredittUrl: "https://unsplash.com/@danieldiemer?utm_source=les_verden&utm_medium=referral",
    kilde: "Unsplash",
    kildeUrl: "https://unsplash.com/?utm_source=les_verden&utm_medium=referral",
    fakta: [
      "Rundt 1850 jobbet omtrent tre av fire nordmenn i jordbruk, skogbruk og fiske. I dag er det bare rundt 2–3 prosent.",
      "Norge er verdens største produsent av atlantisk oppdrettslaks."
    ]
  },
  {
    id: "sf9-globalisering",
    fag: "samfunnsfag",
    emne: "geografi",
    trinn: 9,
    tittel: "Globalisering – en verden som henger sammen",
    kort: "Containerskip, internett og frihandel har knyttet verden sammen. Hvem vinner, og hvem taper?",
    sted: { navn: "Shanghai", lat: 31.23, lon: 121.47 },
    bilde: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?ixlib=rb-4.1.0&w=1200&q=75&fm=jpg&fit=max",
    bildeAlt: "Et stort containerskip lastet med fargerike containere ved kai",
    kreditt: "Andy Li",
    kredittUrl: "https://unsplash.com/@andylid0?utm_source=les_verden&utm_medium=referral",
    kilde: "Unsplash",
    kildeUrl: "https://unsplash.com/?utm_source=les_verden&utm_medium=referral",
    fakta: [
      "Rundt 80 prosent av verdens varer fraktes sjøveien.",
      "Det første containerskipet seilte fra USA i 1956 – og gjorde frakt mye billigere."
    ]
  },
  {
    id: "sf9-fattigdom-ulikhet",
    fag: "samfunnsfag",
    emne: "geografi",
    trinn: 9,
    tittel: "Fattigdom og ulikhet",
    kort: "Hvorfor er noen land rike og andre fattige? Og hva betyr det å være fattig i Norge?",
    sted: { navn: "Recife", lat: -8.07, lon: -34.95 },
    bilde: "https://images.unsplash.com/photo-1584289488698-6f7b099c9ae0?ixlib=rb-4.1.0&w=1200&q=75&fm=jpg&fit=max",
    bildeAlt: "Tett bebyggelse med enkle murhus i en brasiliansk by",
    kreditt: "thiago japyassu",
    kredittUrl: "https://unsplash.com/@thiagojapyassu?utm_source=les_verden&utm_medium=referral",
    kilde: "Unsplash",
    kildeUrl: "https://unsplash.com/?utm_source=les_verden&utm_medium=referral",
    fakta: [
      "I 1990 levde over en tredel av verdens befolkning i ekstrem fattigdom. I dag er det under en tidel.",
      "Norge er et av landene i verden med minst økonomiske forskjeller."
    ]
  },
  {
    id: "sf9-migrasjon-flyktninger",
    fag: "samfunnsfag",
    emne: "geografi",
    trinn: 9,
    tittel: "Migrasjon og flyktninger",
    kort: "Hvorfor flytter folk? Om push og pull, flyktninger, asylsøkere og integrering i Norge.",
    sted: { navn: "Sinjar", lat: 36.32, lon: 41.87 },
    bilde: "https://images.unsplash.com/photo-1619569124496-4f35021bdbf1?ixlib=rb-4.1.0&w=1200&q=75&fm=jpg&fit=max",
    bildeAlt: "Hvite telt i en leir for internt fordrevne i Sinjar i Irak",
    kreditt: "Levi Meir Clancy",
    kredittUrl: "https://unsplash.com/@levimeirclancy?utm_source=les_verden&utm_medium=referral",
    kilde: "Unsplash",
    kildeUrl: "https://unsplash.com/?utm_source=les_verden&utm_medium=referral",
    fakta: [
      "Rundt sju av ti flyktninger bor i et naboland til landet de flyktet fra.",
      "Rundt 300 millioner mennesker bor i et annet land enn der de ble født."
    ]
  },
  {
    id: "sf9-baerekraftsmaal",
    fag: "samfunnsfag",
    emne: "geografi",
    trinn: 9,
    tittel: "FNs bærekraftsmål",
    kort: "17 mål for en bedre verden innen 2030 – hva betyr bærekraft, og er vi i rute?",
    sted: { navn: "New York (FN)", lat: 40.75, lon: -73.97 },
    bilde: "https://images.unsplash.com/photo-1562519990-50eb51e282b2?ixlib=rb-4.1.0&w=1200&q=75&fm=jpg&fit=max",
    bildeAlt: "Hvite vindturbiner på en grønn mark under blå himmel",
    kreditt: "Thomas Réaubourg",
    kredittUrl: "https://unsplash.com/@thomasreaubourg?utm_source=les_verden&utm_medium=referral",
    kilde: "Unsplash",
    kildeUrl: "https://unsplash.com/?utm_source=les_verden&utm_medium=referral",
    fakta: [
      "Begrepet bærekraftig utvikling ble kjent gjennom en FN-rapport ledet av Gro Harlem Brundtland i 1987.",
      "Hvis alle i verden levde som nordmenn, ville vi trengt rundt tre jordkloder."
    ]
  },
  {
    id: "sf9-okonomi",
    fag: "samfunnsfag",
    emne: "samfunnskunnskap",
    trinn: 9,
    tittel: "Økonomi – fra lommepenger til statsbudsjett",
    kort: "Tilbud og etterspørsel, skatt, inflasjon og rente – og hvordan du styrer din egen økonomi.",
    sted: { navn: "Oslo (Norges Bank)", lat: 59.91, lon: 10.74 },
    bilde: "https://images.unsplash.com/photo-1516570161787-2fd917215a3d?ixlib=rb-4.1.0&w=1200&q=75&fm=jpg&fit=max",
    bildeAlt: "Mynter og sedler i en haug",
    kreditt: "Mathieu Turle",
    kredittUrl: "https://unsplash.com/@nbmat?utm_source=les_verden&utm_medium=referral",
    kilde: "Unsplash",
    kildeUrl: "https://unsplash.com/?utm_source=les_verden&utm_medium=referral",
    fakta: [
      "Norges Bank ble opprettet i 1816, og kronen ble innført i 1875.",
      "Ordet økonomi kommer fra gresk og betyr «husholdning»."
    ]
  },
  {
    id: "sf9-arbeidsliv",
    fag: "samfunnsfag",
    emne: "samfunnskunnskap",
    trinn: 9,
    tittel: "Arbeidslivet – rettigheter, plikter og samarbeid",
    kort: "Hva har du krav på i din første jobb? Om arbeidsmiljøloven, fagforeninger og den norske modellen.",
    bilde: "https://images.unsplash.com/photo-1552879890-3a06dd3a06c2?ixlib=rb-4.1.0&w=1200&q=75&fm=jpg&fit=max",
    bildeAlt: "Mange gule vernehjelmer hengt opp i rader",
    kreditt: "Pop & Zebra",
    kredittUrl: "https://unsplash.com/@popandzebra?utm_source=les_verden&utm_medium=referral",
    kilde: "Unsplash",
    kildeUrl: "https://unsplash.com/?utm_source=les_verden&utm_medium=referral",
    fakta: [
      "Åtte timers arbeidsdag ble innført ved lov i Norge i 1919.",
      "Fra du er 13 år, kan du gjøre lett arbeid, som å bære ut aviser."
    ]
  },
  {
    id: "sf9-kriminalitet-straff",
    fag: "samfunnsfag",
    emne: "samfunnskunnskap",
    trinn: 9,
    tittel: "Kriminalitet og straff",
    kort: "Hvorfor bryter noen loven, og hva skal straff være godt for? Om rettsstaten og norske fengsler.",
    sted: { navn: "Halden", lat: 59.12, lon: 11.39 },
    bilde: "https://images.unsplash.com/photo-1568092806323-8ec13dfa9b92?ixlib=rb-4.1.0&w=1200&q=75&fm=jpg&fit=max",
    bildeAlt: "En tom rettssal med dommerbord, vitneboks og trebenker",
    kreditt: "David Veksler",
    kredittUrl: "https://unsplash.com/@davidveksler?utm_source=les_verden&utm_medium=referral",
    kilde: "Unsplash",
    kildeUrl: "https://unsplash.com/?utm_source=les_verden&utm_medium=referral",
    fakta: [
      "Den kriminelle lavalderen i Norge er 15 år.",
      "Omtrent én av fem som slippes ut av fengsel i Norge, blir dømt for ny kriminalitet innen to år – et av de laveste tallene i verden."
    ]
  },
  {
    id: "sf9-medier-pavirkning",
    fag: "samfunnsfag",
    emne: "samfunnskunnskap",
    trinn: 9,
    tittel: "Medier og påvirkning",
    kort: "Den fjerde statsmakt, algoritmer, ekkokamre, falske nyheter og reklame – og hvordan du kan være kildekritisk.",
    bilde: "https://images.unsplash.com/photo-1651465531201-7e430660fd82?ixlib=rb-4.1.0&w=1200&q=75&fm=jpg&fit=max",
    bildeAlt: "Et TV-studio med kamera og lys rettet mot nyhetsdesken",
    kreditt: "Brad Weaver",
    kredittUrl: "https://unsplash.com/@bweaver?utm_source=les_verden&utm_medium=referral",
    kilde: "Unsplash",
    kildeUrl: "https://unsplash.com/?utm_source=les_verden&utm_medium=referral",
    fakta: [
      "Norge har i mange år ligget øverst på listen over land med størst pressefrihet.",
      "Fra 2022 må reklame med retusjerte kropper merkes i Norge."
    ]
  },
  {
    id: "en9-new-zealand",
    fag: "engelsk",
    trinn: 9,
    sprak: "en",
    tittel: "New Zealand and the Māori",
    kort: "The Treaty of Waitangi, the haka and a language that came back to life.",
    sted: { navn: "Taupō", lat: -38.69, lon: 176.07 },
    bilde: "https://images.unsplash.com/photo-1604995384335-6b5ca07aee5a?ixlib=rb-4.1.0&w=1200&q=75&fm=jpg&fit=max",
    bildeAlt: "A red sailboat beside a huge Māori rock carving at Lake Taupō in New Zealand",
    kreditt: "Aaron Mickan",
    kredittUrl: "https://unsplash.com/@aaronmickan?utm_source=les_verden&utm_medium=referral",
    kilde: "Unsplash",
    kildeUrl: "https://unsplash.com/?utm_source=les_verden&utm_medium=referral",
    fakta: [
      "The Māori name for New Zealand, Aotearoa, is often translated as “the land of the long white cloud”.",
      "In 1893, New Zealand became the first self-governing country where women could vote."
    ]
  },
  {
    id: "en9-india",
    fag: "engelsk",
    trinn: 9,
    sprak: "en",
    tittel: "India – the World’s Largest Democracy",
    kort: "1.4 billion people, hundreds of languages, the road to independence – and the role of English.",
    sted: { navn: "Mumbai", lat: 19.08, lon: 72.88 },
    bilde: "https://images.unsplash.com/photo-1728325444513-f6f7bdd0950a?ixlib=rb-4.1.0&w=1200&q=75&fm=jpg&fit=max",
    bildeAlt: "A busy street with shops and a mosque in Mumbai, India",
    kreditt: "Zoshua Colah",
    kredittUrl: "https://unsplash.com/@zoshuacolah?utm_source=les_verden&utm_medium=referral",
    kilde: "Unsplash",
    kildeUrl: "https://unsplash.com/?utm_source=les_verden&utm_medium=referral",
    fakta: [
      "In 2023, India passed China as the country with the most people in the world.",
      "Gandhi’s Salt March in 1930 was about 385 kilometres long."
    ]
  },
  {
    id: "en9-british-american-english",
    fag: "engelsk",
    trinn: 9,
    sprak: "en",
    tittel: "British and American English",
    kort: "Flat or apartment? Colour or color? Differences in spelling, words, grammar and pronunciation.",
    bilde: "https://images.unsplash.com/photo-1675518482021-19ad136762d4?ixlib=rb-4.1.0&w=1200&q=75&fm=jpg&fit=max",
    bildeAlt: "A red telephone box in front of a clock tower in London",
    kreditt: "Chloe Christine",
    kredittUrl: "https://unsplash.com/@chloechristinemarketing?utm_source=les_verden&utm_medium=referral",
    kilde: "Unsplash",
    kildeUrl: "https://unsplash.com/?utm_source=les_verden&utm_medium=referral",
    fakta: [
      "Noah Webster’s dictionary from 1828 gave Americans spellings like color and center.",
      "In Britain, pants are underwear – in the USA, pants are trousers!"
    ]
  },
  {
    id: "en9-media-advertising",
    fag: "engelsk",
    trinn: 9,
    sprak: "en",
    tittel: "Media and Advertising",
    kort: "Ethos, pathos and logos, influencers and targeted ads – how advertisers try to persuade you.",
    sted: { navn: "New York (Times Square)", lat: 40.758, lon: -73.985 },
    bilde: "https://images.unsplash.com/photo-1652998060272-313862d0a145?ixlib=rb-4.1.0&w=1200&q=75&fm=jpg&fit=max",
    bildeAlt: "A city street lined with tall buildings covered in bright digital billboards",
    kreditt: "Amelia",
    kredittUrl: "https://unsplash.com/@redtulipsky?utm_source=les_verden&utm_medium=referral",
    kilde: "Unsplash",
    kildeUrl: "https://unsplash.com/?utm_source=les_verden&utm_medium=referral",
    fakta: [
      "The first official TV commercial was shown in the USA in 1941.",
      "The first clickable banner ad appeared on the internet in 1994."
    ]
  },
  {
    id: "en9-holes",
    fag: "engelsk",
    trinn: 9,
    sprak: "en",
    tittel: "Reading Holes by Louis Sachar",
    kort: "A camp with no lake, a hole every day and a family curse – help before, during and after reading.",
    sted: { navn: "Texas", lat: 31.5, lon: -100.0 },
    bilde: "https://images.unsplash.com/photo-1451418280345-67a6b4d10bba?ixlib=rb-4.1.0&w=1200&q=75&fm=jpg&fit=max",
    bildeAlt: "Dry, cracked earth in a desert",
    kreditt: "Brad Helmink",
    kredittUrl: "https://unsplash.com/@bradhelmink?utm_source=les_verden&utm_medium=referral",
    kilde: "Unsplash",
    kildeUrl: "https://unsplash.com/?utm_source=les_verden&utm_medium=referral",
    fakta: [
      "Holes won both the National Book Award and the Newbery Medal.",
      "The main character’s name, Stanley Yelnats, is a palindrome – it is spelled the same backwards."
    ]
  },
  {
    id: "en9-poetry",
    fag: "engelsk",
    trinn: 9,
    sprak: "en",
    tittel: "Poetry – Reading and Writing Poems",
    kort: "Rhyme, rhythm, metaphors and sonnets – read famous poems and write your own.",
    sted: { navn: "Lake District", lat: 54.46, lon: -3.02 },
    bilde: "https://images.unsplash.com/photo-1506513083865-434a8a207e11?ixlib=rb-4.1.0&w=1200&q=75&fm=jpg&fit=max",
    bildeAlt: "An old open book with handwritten text",
    kreditt: "Kiwihug",
    kredittUrl: "https://unsplash.com/@kiwihug?utm_source=les_verden&utm_medium=referral",
    kilde: "Unsplash",
    kildeUrl: "https://unsplash.com/?utm_source=les_verden&utm_medium=referral",
    fakta: [
      "Shakespeare wrote 154 sonnets.",
      "Emily Dickinson wrote almost 1,800 poems, but only about ten were published while she was alive."
    ]
  },
  {
    id: "sf8-opplysningstiden",
    fag: "samfunnsfag",
    emne: "historie",
    trinn: 8,
    tittel: "Opplysningstiden – fornuften tar over",
    kort: "Locke, Montesquieu, Rousseau og Voltaire utfordret kongene og kirken – og la grunnlaget for demokratiet.",
    sted: { navn: "Paris", lat: 48.86, lon: 2.35 },
    bilde: "https://images.unsplash.com/photo-1625053376622-e462848c453f?ixlib=rb-4.1.0&w=1200&q=75&fm=jpg&fit=max",
    bildeAlt: "Høye bokhyller av tre fulle av gamle bøker i et bibliotek",
    kreditt: "Peter Herrmann",
    kredittUrl: "https://unsplash.com/@tama66?utm_source=les_verden&utm_medium=referral",
    kilde: "Unsplash",
    kildeUrl: "https://unsplash.com/?utm_source=les_verden&utm_medium=referral",
    fakta: [
      "Det franske leksikonet Encyclopédie fikk 28 bind og skulle samle all kunnskap i verden.",
      "Montesquieus idé om å dele makten i tre brukes i Norge i dag: Stortinget, regjeringen og domstolene."
    ]
  },
  {
    id: "sf8-amerikanske-revolusjonen",
    fag: "samfunnsfag",
    emne: "historie",
    trinn: 8,
    tittel: "Den amerikanske revolusjonen",
    kort: "Ingen skatt uten representasjon! Hvordan tretten kolonier gjorde opprør og ble USA.",
    sted: { navn: "Philadelphia", lat: 39.95, lon: -75.15 },
    bilde: "https://images.unsplash.com/photo-1665888382663-74a86f3ceb32?ixlib=rb-4.1.0&w=1200&q=75&fm=jpg&fit=max",
    bildeAlt: "Independence Hall i Philadelphia, en bygning i rød murstein med klokketårn",
    kreditt: "Ernie Journeys",
    kredittUrl: "https://unsplash.com/@erniejourneys?utm_source=les_verden&utm_medium=referral",
    kilde: "Unsplash",
    kildeUrl: "https://unsplash.com/?utm_source=les_verden&utm_medium=referral",
    fakta: [
      "I 1773 kastet kolonister i Boston 342 kister med britisk te i sjøen.",
      "USAs grunnlov fra 1787 er den eldste skrevne grunnloven som fortsatt er i bruk."
    ]
  },
  {
    id: "sf8-franske-revolusjonen",
    fag: "samfunnsfag",
    emne: "historie",
    trinn: 8,
    tittel: "Den franske revolusjonen og Napoleon",
    kort: "Frihet, likhet, brorskap – fra stormen på Bastillen til terroren og Napoleons fall.",
    sted: { navn: "Versailles", lat: 48.8, lon: 2.12 },
    bilde: "https://images.unsplash.com/photo-1591828353335-197466da2a4e?ixlib=rb-4.1.0&w=1200&q=75&fm=jpg&fit=max",
    bildeAlt: "Slottet i Versailles med gullforgylte detaljer",
    kreditt: "Mathias Reding",
    kredittUrl: "https://unsplash.com/@matreding?utm_source=les_verden&utm_medium=referral",
    kilde: "Unsplash",
    kildeUrl: "https://unsplash.com/?utm_source=les_verden&utm_medium=referral",
    fakta: [
      "14. juli, dagen Bastillen ble stormet i 1789, er Frankrikes nasjonaldag.",
      "Napoleons nederlag førte til at Danmark måtte gi Norge til Sverige i 1814."
    ]
  },
  {
    id: "sf8-1814-grunnloven",
    fag: "samfunnsfag",
    emne: "historie",
    trinn: 8,
    tittel: "1814 og Grunnloven",
    kort: "Fra Kielfreden til Eidsvoll – hvordan Norge fikk en av verdens mest demokratiske grunnlover.",
    sted: { navn: "Eidsvoll", lat: 60.33, lon: 11.26 },
    bilde: "https://images.unsplash.com/photo-1780339500471-88f7f17f6e5d?ixlib=rb-4.1.0&w=1200&q=75&fm=jpg&fit=max",
    bildeAlt: "Barnetog med norske flagg og bunader på 17. mai i Oslo",
    kreditt: "Ingeborg Korme",
    kredittUrl: "https://unsplash.com/@ingeborgkorme?utm_source=les_verden&utm_medium=referral",
    kilde: "Unsplash",
    kildeUrl: "https://unsplash.com/?utm_source=les_verden&utm_medium=referral",
    fakta: [
      "Grunnloven ble skrevet på bare fem uker av 112 eidsvollsmenn.",
      "Den norske Grunnloven fra 1814 er en av verdens eldste skrevne grunnlover som fortsatt er i bruk."
    ]
  },
  {
    id: "sf8-unionen-1905",
    fag: "samfunnsfag",
    emne: "historie",
    trinn: 8,
    tittel: "Unionen med Sverige og 1905",
    kort: "Felles konge i 91 år, kampen om parlamentarismen og et fredelig brudd i 1905.",
    sted: { navn: "Oslo (Slottet)", lat: 59.917, lon: 10.727 },
    bilde: "https://images.unsplash.com/photo-1568381548317-727088be22c4?ixlib=rb-4.1.0&w=1200&q=75&fm=jpg&fit=max",
    bildeAlt: "Rytterstatuen av Karl Johan foran Slottet i Oslo",
    kreditt: "Delia Giandeini",
    kredittUrl: "https://unsplash.com/@dels?utm_source=les_verden&utm_medium=referral",
    kilde: "Unsplash",
    kildeUrl: "https://unsplash.com/?utm_source=les_verden&utm_medium=referral",
    fakta: [
      "I folkeavstemningen i 1905 stemte over 368 000 for å oppløse unionen – og bare 184 imot.",
      "Kvinnene hadde ikke stemmerett i 1905, men samlet inn rundt 280 000 underskrifter for bruddet."
    ]
  },
  {
    id: "en8-democracy-britain",
    fag: "engelsk",
    trinn: 8,
    sprak: "en",
    tittel: "Democracy in Britain: from Magna Carta to Parliament",
    kort: "From a king forced to follow the law in 1215 to votes for women – how power moved to the people.",
    sted: { navn: "Runnymede", lat: 51.44, lon: -0.565 },
    bilde: "https://images.unsplash.com/photo-1624651030272-d38c3d8bb9fe?ixlib=rb-4.1.0&w=1200&q=75&fm=jpg&fit=max",
    bildeAlt: "The Houses of Parliament and Big Ben in London at sunset",
    kreditt: "Peter Kostov",
    kredittUrl: "https://unsplash.com/@strippedlight?utm_source=les_verden&utm_medium=referral",
    kilde: "Unsplash",
    kildeUrl: "https://unsplash.com/?utm_source=les_verden&utm_medium=referral",
    fakta: [
      "Magna Carta was sealed in a meadow called Runnymede in 1215.",
      "The word “parliament” comes from the French word parler – “to talk”."
    ]
  },
  {
    id: "en8-united-kingdom",
    fag: "engelsk",
    trinn: 8,
    sprak: "en",
    tittel: "The United Kingdom – Four Nations in One",
    kort: "England, Scotland, Wales and Northern Ireland – capitals, symbols, languages and history.",
    sted: { navn: "Loch Awe, Scotland", lat: 56.4, lon: -5.03 },
    bilde: "https://images.unsplash.com/photo-1589489873423-d1745278a8f4?ixlib=rb-4.1.0&w=1200&q=75&fm=jpg&fit=max",
    bildeAlt: "Kilchurn Castle ruins reflected in the calm water of Loch Awe, Scotland",
    kreditt: "Connor Mollison",
    kredittUrl: "https://unsplash.com/@connormollison?utm_source=les_verden&utm_medium=referral",
    kilde: "Unsplash",
    kildeUrl: "https://unsplash.com/?utm_source=les_verden&utm_medium=referral",
    fakta: [
      "The Union Jack combines the crosses of England, Scotland and Ireland.",
      "Orkney and Shetland in Scotland belonged to Norway until the 1460s."
    ]
  },
  {
    id: "en8-ireland",
    fag: "engelsk",
    trinn: 8,
    sprak: "en",
    tittel: "Ireland – the Emerald Isle",
    kort: "Vikings, the Great Famine, the fight for independence and modern Ireland.",
    sted: { navn: "Cliffs of Moher", lat: 52.95, lon: -9.33 },
    bilde: "https://images.unsplash.com/photo-1602354817989-b9664561ae84?ixlib=rb-4.1.0&w=1200&q=75&fm=jpg&fit=max",
    bildeAlt: "Green cliffs above the Atlantic Ocean at the Cliffs of Moher in Ireland",
    kreditt: "Sean Kuriyan",
    kredittUrl: "https://unsplash.com/@sean189?utm_source=les_verden&utm_medium=referral",
    kilde: "Unsplash",
    kildeUrl: "https://unsplash.com/?utm_source=les_verden&utm_medium=referral",
    fakta: [
      "Dublin was founded by Vikings in the 800s.",
      "More than 30 million Americans say they have Irish ancestors."
    ]
  }
];
