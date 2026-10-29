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
  }
];
