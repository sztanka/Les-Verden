// =========================================================
// Les verden – innholdet i kartspillene
// Brukes av lag-kart.mjs. Alle koordinater er [breddegrad, lengdegrad].
// Etter endringer: kjør  node verktoy/lag-kart.mjs  (se README).
// =========================================================

// ---------- Norske landnavn (nøkkel = navn i Natural Earth) ----------
export const LANDNAVN = {
  "Norway": "Norge", "Sweden": "Sverige", "Denmark": "Danmark", "Finland": "Finland", "Iceland": "Island",
  "United Kingdom": "Storbritannia", "Ireland": "Irland", "France": "Frankrike", "Spain": "Spania",
  "Portugal": "Portugal", "Germany": "Tyskland", "Netherlands": "Nederland", "Belgium": "Belgia",
  "Luxembourg": "Luxembourg", "Switzerland": "Sveits", "Austria": "Østerrike", "Italy": "Italia",
  "Poland": "Polen", "Czechia": "Tsjekkia", "Slovakia": "Slovakia", "Hungary": "Ungarn",
  "Slovenia": "Slovenia", "Croatia": "Kroatia", "Bosnia and Herz.": "Bosnia-Hercegovina", "Serbia": "Serbia",
  "Montenegro": "Montenegro", "Kosovo": "Kosovo", "Macedonia": "Nord-Makedonia", "Albania": "Albania",
  "Greece": "Hellas", "Bulgaria": "Bulgaria", "Romania": "Romania", "Moldova": "Moldova", "Ukraine": "Ukraina",
  "Belarus": "Belarus", "Lithuania": "Litauen", "Latvia": "Latvia", "Estonia": "Estland", "Russia": "Russland",
  "Turkey": "Tyrkia", "Cyprus": "Kypros", "Malta": "Malta", "Andorra": "Andorra", "Monaco": "Monaco",
  "San Marino": "San Marino", "Liechtenstein": "Liechtenstein", "Vatican": "Vatikanstaten",
  "China": "Kina", "India": "India", "Japan": "Japan", "Indonesia": "Indonesia", "Saudi Arabia": "Saudi-Arabia",
  "Iran": "Iran", "Iraq": "Irak", "Afghanistan": "Afghanistan", "Pakistan": "Pakistan", "Kazakhstan": "Kasakhstan",
  "Mongolia": "Mongolia", "Vietnam": "Vietnam", "Thailand": "Thailand", "Philippines": "Filippinene",
  "South Korea": "Sør-Korea", "North Korea": "Nord-Korea", "Israel": "Israel", "Syria": "Syria",
  "Egypt": "Egypt", "Nigeria": "Nigeria", "South Africa": "Sør-Afrika", "Ethiopia": "Etiopia", "Kenya": "Kenya",
  "Dem. Rep. Congo": "Den demokratiske republikken Kongo", "Algeria": "Algerie", "Morocco": "Marokko",
  "Libya": "Libya", "Sudan": "Sudan", "Somalia": "Somalia", "Madagascar": "Madagaskar", "Tanzania": "Tanzania",
  "Ghana": "Ghana", "United States of America": "USA", "Canada": "Canada", "Mexico": "Mexico", "Brazil": "Brasil",
  "Argentina": "Argentina", "Chile": "Chile", "Peru": "Peru", "Colombia": "Colombia", "Venezuela": "Venezuela",
  "Cuba": "Cuba", "Bolivia": "Bolivia", "Australia": "Australia", "New Zealand": "New Zealand",
  "Papua New Guinea": "Papua Ny-Guinea", "Greenland": "Grønland"
};

export const EUROPA_LAND = ["Norway", "Sweden", "Denmark", "Finland", "Iceland", "United Kingdom", "Ireland", "France",
  "Spain", "Portugal", "Germany", "Netherlands", "Belgium", "Luxembourg", "Switzerland", "Austria", "Italy", "Poland",
  "Czechia", "Slovakia", "Hungary", "Slovenia", "Croatia", "Bosnia and Herz.", "Serbia", "Montenegro", "Kosovo",
  "Macedonia", "Albania", "Greece", "Bulgaria", "Romania", "Moldova", "Ukraine", "Belarus", "Lithuania", "Latvia",
  "Estonia", "Russia", "Turkey", "Cyprus", "Malta", "Andorra", "Monaco", "San Marino", "Liechtenstein", "Vatican"];

export const VERDEN_LAND = ["Norway", "Sweden", "Finland", "Russia", "United Kingdom", "France", "Spain", "Germany",
  "Italy", "Poland", "Ukraine", "Greece", "Turkey", "China", "India", "Japan", "Indonesia", "Saudi Arabia", "Iran",
  "Iraq", "Afghanistan", "Pakistan", "Kazakhstan", "Mongolia", "Vietnam", "Thailand", "Philippines", "South Korea",
  "North Korea", "Israel", "Syria", "Egypt", "Nigeria", "South Africa", "Ethiopia", "Kenya", "Dem. Rep. Congo",
  "Algeria", "Morocco", "Libya", "Sudan", "Somalia", "Madagascar", "Tanzania", "United States of America", "Canada",
  "Mexico", "Brazil", "Argentina", "Chile", "Peru", "Colombia", "Venezuela", "Cuba", "Bolivia", "Australia",
  "New Zealand", "Papua New Guinea", "Greenland"];

// ---------- Hovedsteder i Europa ----------
export const HOVEDSTEDER = [
  ["Oslo", "Norway", 59.91, 10.75], ["Stockholm", "Sweden", 59.33, 18.07], ["København", "Denmark", 55.68, 12.57],
  ["Helsingfors", "Finland", 60.17, 24.94], ["Reykjavík", "Iceland", 64.15, -21.94], ["London", "United Kingdom", 51.51, -0.13],
  ["Dublin", "Ireland", 53.35, -6.26], ["Paris", "France", 48.86, 2.35], ["Madrid", "Spain", 40.42, -3.70],
  ["Lisboa", "Portugal", 38.72, -9.14], ["Berlin", "Germany", 52.52, 13.40], ["Amsterdam", "Netherlands", 52.37, 4.90],
  ["Brussel", "Belgium", 50.85, 4.35], ["Luxembourg", "Luxembourg", 49.61, 6.13], ["Bern", "Switzerland", 46.95, 7.45],
  ["Wien", "Austria", 48.21, 16.37], ["Roma", "Italy", 41.90, 12.50], ["Warszawa", "Poland", 52.23, 21.01],
  ["Praha", "Czechia", 50.08, 14.44], ["Bratislava", "Slovakia", 48.15, 17.11], ["Budapest", "Hungary", 47.50, 19.04],
  ["Ljubljana", "Slovenia", 46.06, 14.51], ["Zagreb", "Croatia", 45.81, 15.98], ["Sarajevo", "Bosnia and Herz.", 43.86, 18.41],
  ["Beograd", "Serbia", 44.79, 20.45], ["Podgorica", "Montenegro", 42.44, 19.26], ["Pristina", "Kosovo", 42.66, 21.17],
  ["Skopje", "Macedonia", 42.00, 21.43], ["Tirana", "Albania", 41.33, 19.82], ["Athen", "Greece", 37.98, 23.73],
  ["Sofia", "Bulgaria", 42.70, 23.32], ["Bucuresti", "Romania", 44.43, 26.10], ["Chișinău", "Moldova", 47.01, 28.86],
  ["Kyiv", "Ukraine", 50.45, 30.52], ["Minsk", "Belarus", 53.90, 27.57], ["Vilnius", "Lithuania", 54.69, 25.28],
  ["Riga", "Latvia", 56.95, 24.11], ["Tallinn", "Estonia", 59.44, 24.75], ["Moskva", "Russia", 55.76, 37.62],
  ["Ankara", "Turkey", 39.93, 32.86], ["Nikosia", "Cyprus", 35.17, 33.36], ["Valletta", "Malta", 35.90, 14.51],
  ["Andorra la Vella", "Andorra", 42.51, 1.52], ["Monaco", "Monaco", 43.74, 7.42], ["San Marino", "San Marino", 43.94, 12.45],
  ["Vaduz", "Liechtenstein", 47.14, 9.52]
];

// ---------- Elver: navn i Natural Earth + område [vest, sør, øst, nord] ----------
export const ELVER = [
  { navn: "Nilen", ne: ["Nile", "White Nile", "Albert Nile", "Victoria Nile", "Mountain Nile"], boks: [24, -4, 36, 32], info: "Verdens lengste elv. Renner nordover gjennom Øst-Afrika og Egypt til Middelhavet." },
  { navn: "Amazonas", ne: ["Amazonas", "Marañón", "Ucayali"], boks: [-79, -15, -48, 2], info: "Verdens vannrikeste elv. Renner gjennom regnskogen i Sør-Amerika til Atlanterhavet." },
  { navn: "Mississippi", ne: ["Mississippi"], boks: [-96, 28, -88, 48], info: "USAs viktigste elv. Renner sørover til Mexicogolfen ved New Orleans." },
  { navn: "Missouri", ne: ["Missouri"], boks: [-114, 38, -89, 49], info: "Den lengste elva i USA. Renner ut i Mississippi." },
  { navn: "Yangtze", ne: ["Yangtze", "Tongtian", "Tuotuo"], boks: [90, 24, 122, 36], info: "Asias lengste elv. Renner gjennom Kina til Shanghai." },
  { navn: "Huang He (Den gule elv)", ne: ["Huang", "Yellow"], boks: [95, 32, 120, 42], info: "Kinas «mor-elv». Får den gule fargen fra slam." },
  { navn: "Ganges", ne: ["Ganges"], boks: [77, 21, 92, 31], info: "Hellig elv for hinduer. Renner gjennom India og Bangladesh." },
  { navn: "Indus", ne: ["Indus"], boks: [66, 23, 82, 36], info: "Elva gjennom Pakistan. Her lå en av de første sivilisasjonene." },
  { navn: "Mekong", ne: ["Mekong"], boks: [93, 8, 108, 34], info: "Renner gjennom seks land i Sørøst-Asia, blant annet Laos, Kambodsja og Vietnam." },
  { navn: "Kongo", ne: ["Congo", "Lualaba"], boks: [11, -12, 30, 5], info: "Verdens dypeste elv. Renner gjennom regnskogen i Sentral-Afrika." },
  { navn: "Niger", ne: ["Niger"], boks: [-12, 3, 10, 18], info: "Den viktigste elva i Vest-Afrika. Renner i en stor bue gjennom Mali og Nigeria." },
  { navn: "Zambezi", ne: ["Zambezi"], boks: [18, -21, 37, -10], info: "Her ligger Victoriafallene, på grensen mellom Zambia og Zimbabwe." },
  { navn: "Donau", ne: ["Danube"], boks: [8, 42, 30, 50], info: "Renner gjennom ti land – flere enn noen annen elv – fra Tyskland til Svartehavet." },
  { navn: "Rhinen", ne: ["Rhine", "Rhein", "Nederrijn"], boks: [3, 46, 11, 53], info: "Viktig transportelv fra Alpene gjennom Tyskland til Nordsjøen." },
  { navn: "Volga", ne: ["Volga"], boks: [30, 44, 55, 60], info: "Europas lengste elv. Renner gjennom Russland til Det kaspiske hav." },
  { navn: "Ob", ne: ["Ob"], boks: [60, 48, 90, 68], info: "En av de lange elvene i Sibir. Renner nordover til Polhavet." },
  { navn: "Jenisej", ne: ["Yenisey", "Verkhniy Yenisey", "Malyy Yenisey"], boks: [83, 49, 100, 73], info: "Sibirsk elv som renner nordover til Polhavet." },
  { navn: "Eufrat", ne: ["Euphrates", "Firat", "Al Furat"], boks: [37, 30, 48, 40], info: "Sammen med Tigris rammet den inn Mesopotamia, der de første byene oppsto." },
  { navn: "Tigris", ne: ["Tigris", "Dicle"], boks: [38, 30, 48, 39], info: "Renner gjennom Tyrkia og Irak. Bagdad ligger ved Tigris." },
  { navn: "St. Lawrence", ne: ["St. Lawrence"], boks: [-80, 43, -60, 50], info: "Forbinder De store sjøene med Atlanterhavet i Canada." },
  { navn: "Murray", ne: ["Murray"], boks: [138, -37, 149, -33], info: "Australias lengste elv." },
  { navn: "Paraná", ne: ["Paraná"], boks: [-61, -35, -44, -15], info: "Sør-Amerikas nest lengste elv. Renner forbi Buenos Aires." }
];

// ---------- Fjellkjeder og ørkener: navn i Natural Earth (NAME_EN) ----------
export const FJELL = [
  { navn: "Himalaya", ne: "Himalayas", info: "Verdens høyeste fjellkjede, med Mount Everest (8849 moh.)." },
  { navn: "Alpene", ne: "Alps", info: "Europas største fjellkjede, gjennom blant annet Sveits, Østerrike og Italia." },
  { navn: "Andesfjellene", ne: "Andes", info: "Verdens lengste fjellkjede, langs vestkysten av Sør-Amerika." },
  { navn: "Rocky Mountains", ne: "Rocky Mountains", info: "Fjellkjeden gjennom det vestlige USA og Canada." },
  { navn: "Appalachene", ne: "Appalachian Mountains", info: "Gammel fjellkjede i det østlige USA." },
  { navn: "Uralfjellene", ne: "Ural Mountains", info: "Regnes som grensen mellom Europa og Asia." },
  { navn: "Kaukasus", ne: "Caucasus Mountains", info: "Mellom Svartehavet og Det kaspiske hav. Her ligger Elbrus, Europas høyeste fjell." },
  { navn: "Atlasfjellene", ne: "Atlas Mountains", info: "Fjellkjede i Nordvest-Afrika, gjennom Marokko og Algerie." },
  { navn: "Den skandinaviske fjellkjeden", ne: "Scandinavian Mountains", info: "Fjellene langs Norge og Sverige. Kalles også Kjølen." },
  { navn: "Pyreneene", ne: "Pyrenees", info: "Danner grensen mellom Spania og Frankrike." },
  { navn: "Karpatene", ne: "Carpathian Mountains", info: "Bue av fjell gjennom Slovakia, Polen, Ukraina og Romania." },
  { navn: "Great Dividing Range", ne: "Great Dividing Range", info: "Fjellkjede langs østkysten av Australia." },
  { navn: "Tian Shan", ne: "Tian Shan", info: "«De himmelske fjellene» i Sentral-Asia." },
  { navn: "Hindukusj", ne: "Hindu Kush", info: "Fjellkjede gjennom Afghanistan og Pakistan." },
  { navn: "Drakensberg", ne: "Drakensberg", info: "Den høyeste fjellkjeden i det sørlige Afrika." },
  { navn: "Det etiopiske høylandet", ne: "Ethiopian Highlands", info: "Høyland i Øst-Afrika. Her starter Den blå Nil." }
];
export const ORKENER = [
  { navn: "Sahara", ne: "Sahara", info: "Verdens største varme ørken, nesten like stor som USA." },
  { navn: "Rub al-Khali (Det tomme kvarter)", ne: "Rub' al Khali", info: "Verdens største sammenhengende sandørken, på Den arabiske halvøy." },
  { navn: "Gobi", ne: "Gobi Desert", info: "Kald ørken i Mongolia og Kina." },
  { navn: "Kalahari", ne: "Kalahari Desert", info: "Halvørken i det sørlige Afrika, blant annet i Botswana." },
  { navn: "Namib", ne: "Namib", info: "En av verdens eldste ørkener, langs kysten av Namibia." },
  { navn: "Atacama", ne: "Atacama Desert", info: "En av verdens tørreste steder, i Chile." },
  { navn: "Taklamakan", ne: "Taklamakan", info: "Sandørken i Vest-Kina." },
  { navn: "Great Victoria Desert", ne: "Great Victoria Desert", info: "Australias største ørken." }
];

// ---------- Landemerker i verden ----------
export const LANDEMERKER = [
  ["Eiffeltårnet", 48.86, 2.29, "Paris, Frankrike. Bygd til verdensutstillingen i 1889."],
  ["Frihetsgudinnen", 40.69, -74.04, "New York, USA. Gave fra Frankrike i 1886."],
  ["Den kinesiske mur", 40.43, 116.57, "Kina. Forsvarsverk bygd gjennom mer enn 2000 år."],
  ["Pyramidene i Giza", 29.98, 31.13, "Egypt. Over 4500 år gamle gravmonumenter for faraoer."],
  ["Taj Mahal", 27.17, 78.04, "Agra, India. Gravmonument bygd av stormogulen Shah Jahan."],
  ["Colosseum", 41.89, 12.49, "Roma, Italia. Romersk amfiteater fra år 80 e.Kr."],
  ["Akropolis", 37.97, 23.73, "Athen, Hellas. Tempelhøyden fra antikkens Hellas."],
  ["Machu Picchu", -13.16, -72.55, "Peru. Inkaenes by høyt oppe i Andesfjellene."],
  ["Kristus-statuen", -22.95, -43.21, "Rio de Janeiro, Brasil. Står på toppen av fjellet Corcovado."],
  ["Operahuset i Sydney", -33.86, 151.21, "Australia. Kjent for taket som ligner seil."],
  ["Mount Everest", 27.99, 86.93, "Verdens høyeste fjell, på grensen mellom Nepal og Kina."],
  ["Kilimanjaro", -3.07, 37.35, "Tanzania. Afrikas høyeste fjell."],
  ["Uluru", -25.34, 131.04, "Australia. Hellig fjell for aboriginene."],
  ["Grand Canyon", 36.10, -112.10, "Arizona, USA. Enorm kløft gravd ut av Colorado-elva."],
  ["Niagarafallene", 43.08, -79.07, "På grensen mellom USA og Canada."],
  ["Victoriafallene", -17.92, 25.86, "På grensen mellom Zambia og Zimbabwe, ved Zambezi-elva."],
  ["Petra", 30.33, 35.44, "Jordan. Oldtidsby hogd ut i fjellet."],
  ["Angkor Wat", 13.41, 103.87, "Kambodsja. Verdens største religiøse byggverk."],
  ["Chichén Itzá", 20.68, -88.57, "Mexico. By bygd av mayafolket."],
  ["Den røde plass", 55.75, 37.62, "Moskva, Russland. Ved Kreml."],
  ["Golden Gate Bridge", 37.82, -122.48, "San Francisco, USA."],
  ["Nordkapp", 71.17, 25.78, "Norge. Regnes ofte som Europas nordligste punkt."],
  ["Påskeøya", -27.12, -109.37, "Chile. Kjent for de store steinstatuene, moai."]
];

// ---------- Slag og historiske hendelser i verden ----------
export const HENDELSER = [
  ["Columbus kommer til Amerika (1492)", 24.05, -74.50, "Columbus går i land på Bahamas. Starten på europeisk kolonisering av Amerika.", "en10-indigenous-peoples"],
  ["Uavhengighetserklæringen (1776)", 39.95, -75.17, "USA erklærer seg uavhengig av Storbritannia i Philadelphia.", "en10-democracy-citizenship"],
  ["Grunnloven på Eidsvoll (1814)", 60.33, 11.26, "Norge får sin egen grunnlov 17. mai 1814.", "sf10-demokrati-diktatur"],
  ["Slaget ved Waterloo (1815)", 50.68, 4.41, "Napoleon taper sitt siste slag i Belgia.", null],
  ["Massakren ved Wounded Knee (1890)", 43.14, -102.36, "Amerikanske soldater dreper hundrevis av lakota-indianere.", "en10-indigenous-peoples"],
  ["Skuddene i Sarajevo (1914)", 43.86, 18.41, "Drapet på den østerrikske tronfølgeren utløser første verdenskrig.", "sf9-forste-verdenskrig"],
  ["Den russiske revolusjonen (1917)", 59.94, 30.31, "Kommunistene tar makten i Petrograd (St. Petersburg).", "sf9-russiske-revolusjonen"],
  ["Gandhis saltmarsj (1930)", 21.00, 72.63, "Gandhi går 390 km til havet i protest mot britisk styre i India.", "en10-leading-following"],
  ["Pearl Harbor (1941)", 21.36, -157.95, "Japan angriper den amerikanske flåten. USA går inn i andre verdenskrig.", "sf10-andre-verdenskrig"],
  ["Slaget ved Midway (1942)", 28.21, -177.37, "Vendepunktet i krigen i Stillehavet.", "sf10-andre-verdenskrig"],
  ["Slaget om Stalingrad (1942–43)", 48.71, 44.51, "Vendepunktet på østfronten i andre verdenskrig.", "sf10-andre-verdenskrig"],
  ["Auschwitz (1940–45)", 50.03, 19.18, "Den største leiren der nazistene drepte jøder og andre i Holocaust.", "sf10-holocaust"],
  ["D-dagen (1944)", 49.34, -0.60, "De allierte går i land i Normandie i Frankrike.", "sf10-andre-verdenskrig"],
  ["Atombomben over Hiroshima (1945)", 34.39, 132.45, "Første gang en atombombe brukes i krig.", "sf10-andre-verdenskrig"],
  ["Rosa Parks og bussboikotten (1955)", 32.37, -86.30, "I Montgomery, Alabama. Et vendepunkt i borgerrettighetskampen.", "en10-oppression"],
  ["Berlinmuren bygges (1961)", 52.52, 13.40, "Muren deler Berlin i 28 år. Den faller i 1989.", "sf10-kalde-krigen"],
  ["Cubakrisen (1962)", 22.00, -79.50, "Verden er nær en atomkrig mellom USA og Sovjetunionen.", "sf10-kalde-krigen"],
  ["Månelandingen skytes opp (1969)", 28.57, -80.65, "Apollo 11 skytes opp fra Cape Canaveral i Florida.", "sf10-kalde-krigen"],
  ["Mandela løslates (1990)", -33.92, 18.42, "Nelson Mandela løslates fra fengsel i Cape Town etter 27 år.", "en10-oppression"],
  ["Terrorangrepet 11. september (2001)", 40.71, -74.01, "Terrorister angriper World Trade Center i New York.", "en10-9-11"]
];

// ---------- Storbritannia ----------
export const UK_BYER = [
  ["London", 51.51, -0.13], ["Birmingham", 52.48, -1.90], ["Manchester", 53.48, -2.24], ["Liverpool", 53.41, -2.98],
  ["Leeds", 53.80, -1.55], ["Sheffield", 53.38, -1.47], ["Bristol", 51.45, -2.59], ["Newcastle", 54.97, -1.61],
  ["Nottingham", 52.95, -1.15], ["Leicester", 52.64, -1.13], ["Southampton", 50.90, -1.40], ["Brighton", 50.82, -0.14],
  ["Plymouth", 50.38, -4.14], ["Norwich", 52.63, 1.30], ["Oxford", 51.75, -1.26], ["Cambridge", 52.21, 0.12],
  ["York", 53.96, -1.08], ["Hull", 53.74, -0.33], ["Edinburgh", 55.95, -3.19], ["Glasgow", 55.86, -4.25],
  ["Aberdeen", 57.15, -2.09], ["Dundee", 56.46, -2.97], ["Inverness", 57.48, -4.22], ["Cardiff", 51.48, -3.18],
  ["Swansea", 51.62, -3.94], ["Belfast", 54.60, -5.93], ["Derry/Londonderry", 55.00, -7.32]
];
export const UK_DIALEKTER = [
  ["Cockney", 51.52, -0.05, "The traditional accent of London’s East End. Known for rhyming slang and dropping the h: “’ouse” for house."],
  ["Estuary English", 51.50, 0.60, "A mix of Cockney and standard English, spoken around the Thames Estuary in Essex and Kent."],
  ["West Country", 51.05, -3.00, "The accent of south-west England (Bristol, Somerset, Devon). Known for pronouncing the r: “farrrm”."],
  ["Brummie", 52.48, -1.90, "The accent of Birmingham in the Midlands."],
  ["Scouse", 53.41, -2.98, "The accent of Liverpool – the accent of the Beatles."],
  ["Mancunian", 53.48, -2.24, "The accent of Manchester."],
  ["Yorkshire", 53.90, -1.30, "Spoken in Yorkshire. Known for “t’” instead of “the” and “owt” and “nowt” for anything and nothing."],
  ["Geordie", 54.97, -1.61, "The accent of Newcastle and Tyneside. People say “howay” (come on) and “canny” (nice)."],
  ["Glaswegian", 55.86, -4.25, "The Scottish accent of Glasgow. You might hear “wee” (small) and “aye” (yes)."],
  ["Doric", 57.30, -2.40, "The Scots dialect of Aberdeen and north-east Scotland."],
  ["Highland English", 57.40, -4.60, "Spoken in the Scottish Highlands, influenced by the Gaelic language."],
  ["Welsh English", 51.68, -3.40, "Spoken in Wales, especially the South Wales Valleys. Has a typical “sing-song” rhythm."],
  ["Northern Irish", 54.60, -5.93, "The English spoken in Northern Ireland, for example in Belfast."]
];
export const UK_LANDEMERKER = [
  ["Big Ben", 51.50, -0.12, "The famous clock tower at the Houses of Parliament in London."],
  ["Stonehenge", 51.18, -1.83, "A prehistoric stone circle in Wiltshire, about 5000 years old."],
  ["Hadrian’s Wall", 55.00, -2.30, "A Roman wall across northern England, built around AD 122."],
  ["Loch Ness", 57.30, -4.45, "A deep lake in the Scottish Highlands – home of the legendary monster Nessie."],
  ["Ben Nevis", 56.80, -5.00, "The highest mountain in the UK (1345 m), in Scotland."],
  ["Snowdon (Yr Wyddfa)", 53.07, -4.08, "The highest mountain in Wales."],
  ["The Lake District", 54.46, -3.09, "A national park with lakes and mountains in north-west England."],
  ["The White Cliffs of Dover", 51.13, 1.36, "White chalk cliffs facing France across the English Channel."],
  ["The Giant’s Causeway", 55.24, -6.51, "About 40,000 stone columns on the coast of Northern Ireland."],
  ["Edinburgh Castle", 55.95, -3.20, "A castle on an old volcano in the middle of Edinburgh."],
  ["Windsor Castle", 51.48, -0.60, "One of the homes of the royal family, west of London."],
  ["Land’s End", 50.07, -5.72, "The most western point of England, in Cornwall."]
];

// =========================================================
// Landsidene (engelsk): byer og landemerker
// [navn, breddegrad, lengdegrad, info]
// =========================================================
export const USA_BYER = [
  ["New York City", 40.71, -74.01, "The largest city in the USA, with more than 8 million people."],
  ["Los Angeles", 34.05, -118.24, "The second largest city, home of Hollywood."],
  ["Chicago", 41.88, -87.63, "The largest city in the Midwest, on Lake Michigan."],
  ["Houston", 29.76, -95.37, "The largest city in Texas, known for oil and NASA’s mission control."],
  ["Phoenix", 33.45, -112.07, "The capital of Arizona, one of the hottest big cities in the USA."],
  ["Philadelphia", 39.95, -75.17, "Where the Declaration of Independence was signed in 1776."],
  ["San Francisco", 37.77, -122.42, "Famous for the Golden Gate Bridge and cable cars."],
  ["Seattle", 47.61, -122.33, "A city in the Pacific Northwest, home of big tech companies."],
  ["Boston", 42.36, -71.06, "One of the oldest cities in the USA, where the Boston Tea Party took place."],
  ["Miami", 25.76, -80.19, "A city in Florida with many Spanish speakers and beaches."],
  ["Atlanta", 33.75, -84.39, "The capital of Georgia and home city of Martin Luther King Jr."],
  ["Detroit", 42.33, -83.05, "“Motor City”, the centre of the American car industry."],
  ["Denver", 39.74, -104.99, "“The Mile High City”, close to the Rocky Mountains."],
  ["New Orleans", 29.95, -90.07, "A city in Louisiana, famous as the birthplace of jazz."],
  ["Las Vegas", 36.17, -115.14, "A city in the Nevada desert, famous for casinos and shows."],
  ["Nashville", 36.16, -86.78, "The capital of Tennessee and of country music."],
  ["Dallas", 32.78, -96.80, "A big city in Texas, where President Kennedy was shot in 1963."],
  ["Anchorage", 61.22, -149.90, "The largest city in Alaska."],
  ["Honolulu", 21.31, -157.86, "The capital of Hawaii, on the island of Oʻahu."],
  ["Washington, D.C.", 38.90, -77.04, "The capital of the USA, not part of any state."]
];
export const USA_LANDEMERKER = [
  ["The Statue of Liberty", 40.69, -74.04, "A gift from France in 1886 that welcomed millions of immigrants to New York."],
  ["The Grand Canyon", 36.10, -112.11, "A canyon in Arizona that is up to 1.8 km deep, carved by the Colorado River."],
  ["The Golden Gate Bridge", 37.82, -122.48, "The famous red suspension bridge in San Francisco, opened in 1937."],
  ["Mount Rushmore", 43.88, -103.46, "Four presidents carved into a mountain in South Dakota – on land sacred to the Lakota."],
  ["Yellowstone National Park", 44.43, -110.59, "The world’s first national park (1872), famous for geysers and bison."],
  ["Niagara Falls", 43.08, -79.07, "Huge waterfalls on the border between the USA and Canada."],
  ["The White House", 38.90, -77.04, "The home and office of the President in Washington, D.C."],
  ["Hollywood", 34.10, -118.33, "The centre of the American film industry, in Los Angeles."],
  ["Kennedy Space Center", 28.57, -80.65, "In Florida – where the Apollo missions to the Moon were launched."],
  ["Yosemite National Park", 37.86, -119.54, "Granite cliffs, waterfalls and giant sequoia trees in California."],
  ["The Everglades", 25.29, -80.90, "A huge wetland in Florida, home to alligators."],
  ["The Gateway Arch", 38.62, -90.18, "A 192-metre arch in St. Louis – the “gateway to the West”."],
  ["Pearl Harbor", 21.36, -157.95, "In Hawaii – Japan’s attack here in 1941 brought the USA into the Second World War."],
  ["Denali", 63.07, -151.00, "The highest mountain in North America (6,190 m), in Alaska."],
  ["Monument Valley", 36.98, -110.10, "Red rock towers on Navajo Nation land – seen in many Western films."],
  ["Montgomery", 32.38, -86.30, "In Alabama – where Rosa Parks refused to give up her seat on a bus in 1955."],
  ["Plymouth Rock", 41.96, -70.66, "Where the Pilgrims on the Mayflower landed in 1620, according to tradition."],
  ["The Alamo", 29.43, -98.49, "A mission in San Antonio, Texas, famous for a battle in 1836."],
  ["Death Valley", 36.50, -117.00, "One of the hottest and driest places on Earth, in California."],
  ["The Hoover Dam", 36.02, -114.74, "A giant dam on the Colorado River, built in the 1930s."]
];

export const IRL_FYLKER_SLÅ_SAMMEN = { "Dún Laoghaire–Rathdown": "Dublin", "Fingal": "Dublin", "South Dublin": "Dublin", "North Tipperary": "Tipperary", "South Tipperary": "Tipperary", "Laoighis": "Laois" };
export const IRL_PROVINS = {
  Dublin: "Leinster", Wicklow: "Leinster", Wexford: "Leinster", Kilkenny: "Leinster", Carlow: "Leinster", Kildare: "Leinster", Meath: "Leinster",
  Louth: "Leinster", Laois: "Leinster", Offaly: "Leinster", Westmeath: "Leinster", Longford: "Leinster",
  Cork: "Munster", Kerry: "Munster", Limerick: "Munster", Clare: "Munster", Tipperary: "Munster", Waterford: "Munster",
  Galway: "Connacht", Mayo: "Connacht", Sligo: "Connacht", Leitrim: "Connacht", Roscommon: "Connacht",
  Donegal: "Ulster", Cavan: "Ulster", Monaghan: "Ulster"
};
export const IRL_BYER = [
  ["Dublin", 53.35, -6.26, "The capital and largest city of Ireland."],
  ["Cork", 51.90, -8.47, "Ireland’s second city, in the south."],
  ["Limerick", 52.66, -8.63, "A city on the River Shannon."],
  ["Galway", 53.27, -9.05, "A lively city on the west coast, known for music and the Irish language."],
  ["Waterford", 52.26, -7.11, "Ireland’s oldest city, founded by Vikings in 914."],
  ["Kilkenny", 52.65, -7.25, "A medieval city with a famous castle."],
  ["Sligo", 54.27, -8.47, "A town in the north-west, linked to the poet W. B. Yeats."],
  ["Killarney", 52.06, -9.51, "A town near lakes and mountains in County Kerry."],
  ["Athlone", 53.42, -7.94, "A town in the middle of Ireland, on the River Shannon."],
  ["Belfast", 54.60, -5.93, "The capital of Northern Ireland (UK), where the Titanic was built."],
  ["Derry/Londonderry", 55.00, -7.32, "A walled city in Northern Ireland."],
  ["Letterkenny", 54.95, -7.73, "The largest town in County Donegal."],
  ["Wexford", 52.34, -6.46, "A town in the south-east, founded by Vikings."],
  ["Tralee", 52.27, -9.70, "A town in County Kerry."]
];
export const IRL_LANDEMERKER = [
  ["The Cliffs of Moher", 52.97, -9.43, "Cliffs up to 214 metres high above the Atlantic, in County Clare."],
  ["The Giant’s Causeway", 55.24, -6.51, "About 40,000 basalt columns on the coast of Northern Ireland."],
  ["Newgrange", 53.69, -6.48, "A passage tomb more than 5,000 years old – older than the pyramids."],
  ["Skellig Michael", 51.77, -10.54, "A rocky island with an old monastery – used in Star Wars films."],
  ["The Rock of Cashel", 52.52, -7.89, "A medieval castle and church on a hill in County Tipperary."],
  ["Blarney Castle", 51.93, -8.57, "Kiss the Blarney Stone, and you get “the gift of the gab”, according to legend."],
  ["The Burren", 53.05, -9.10, "A strange limestone landscape in County Clare."],
  ["Glendalough", 53.01, -6.33, "A valley with a monastery founded by St Kevin in the 500s."],
  ["The Aran Islands", 53.12, -9.70, "Islands off Galway where many people speak Irish."],
  ["Carrauntoohil", 52.00, -9.74, "The highest mountain in Ireland (1,038 m), in County Kerry."],
  ["Croagh Patrick", 53.76, -9.66, "A holy mountain in County Mayo that pilgrims climb every year."],
  ["Lough Neagh", 54.62, -6.40, "The largest lake in the British Isles, in Northern Ireland."],
  ["Connemara", 53.45, -9.80, "A wild landscape of bogs, lakes and mountains in the west."]
];

export const AUS_BYER = [
  ["Canberra", -35.28, 149.13, "The capital of Australia, built as a planned city."],
  ["Sydney", -33.87, 151.21, "The largest city in Australia, famous for its Opera House."],
  ["Melbourne", -37.81, 144.96, "Australia’s second city, known for sport, coffee and culture."],
  ["Brisbane", -27.47, 153.03, "The capital of Queensland."],
  ["Perth", -31.95, 115.86, "The capital of Western Australia – one of the most isolated big cities in the world."],
  ["Adelaide", -34.93, 138.60, "The capital of South Australia."],
  ["Hobart", -42.88, 147.33, "The capital of Tasmania."],
  ["Darwin", -12.46, 130.84, "The capital of the Northern Territory, in the tropical north."],
  ["Alice Springs", -23.70, 133.88, "A town in the middle of the Outback."],
  ["Cairns", -16.92, 145.77, "A city in the tropics, close to the Great Barrier Reef."],
  ["Gold Coast", -28.02, 153.40, "A coastal city famous for surfing beaches."],
  ["Broome", -17.96, 122.24, "A town in the north-west, known for pearls and red cliffs."],
  ["Townsville", -19.26, 146.82, "A city in northern Queensland."]
];
export const AUS_LANDEMERKER = [
  ["Uluru", -25.34, 131.04, "A huge red rock in the Outback, sacred to the Anangu people."],
  ["The Great Barrier Reef", -18.29, 147.70, "The world’s largest coral reef system, over 2,300 km long."],
  ["The Sydney Opera House", -33.86, 151.22, "A famous concert hall with roofs shaped like sails, opened in 1973."],
  ["Kakadu National Park", -12.84, 132.39, "A national park with wetlands and Aboriginal rock art thousands of years old."],
  ["The Twelve Apostles", -38.66, 143.10, "Limestone towers in the sea along the Great Ocean Road."],
  ["The Blue Mountains", -33.60, 150.30, "Forested mountains west of Sydney with a blue haze from eucalyptus trees."],
  ["The Daintree Rainforest", -16.17, 145.42, "One of the oldest rainforests in the world, in Queensland."],
  ["K’gari (Fraser Island)", -25.27, 153.13, "The world’s largest sand island."],
  ["Mount Kosciuszko", -36.46, 148.26, "The highest mountain on mainland Australia (2,228 m)."],
  ["Port Arthur", -43.15, 147.85, "A former prison for convicts in Tasmania."],
  ["Cradle Mountain", -41.68, 145.95, "A mountain in the wilderness of Tasmania."],
  ["The Nullarbor Plain", -31.00, 129.00, "A flat, dry plain with almost no trees – “null arbor” means “no tree”."],
  ["Shark Bay", -25.90, 113.60, "A World Heritage area in Western Australia with dolphins and dugongs."],
  ["Kangaroo Island", -35.80, 137.20, "An island full of wildlife off South Australia."]
];

export const NZL_BYER = [
  ["Wellington", -41.29, 174.78, "The capital of New Zealand, at the southern tip of the North Island."],
  ["Auckland", -36.85, 174.76, "The largest city, often called the “City of Sails”."],
  ["Christchurch", -43.53, 172.64, "The largest city on the South Island."],
  ["Hamilton", -37.79, 175.28, "A city on the Waikato River."],
  ["Dunedin", -45.87, 170.50, "A city with Scottish roots – its name comes from the old name for Edinburgh."],
  ["Tauranga", -37.69, 176.17, "A city in the Bay of Plenty."],
  ["Napier", -39.49, 176.91, "Rebuilt in Art Deco style after an earthquake in 1931."],
  ["Nelson", -41.27, 173.28, "One of the sunniest places in New Zealand."],
  ["Rotorua", -38.14, 176.25, "Famous for geysers, hot mud pools and Māori culture."],
  ["Queenstown", -45.03, 168.66, "The “adventure capital of the world”, known for bungy jumping."],
  ["Invercargill", -46.41, 168.35, "The southernmost city in New Zealand."],
  ["Gisborne", -38.66, 178.02, "One of the first cities in the world to see the sunrise each day."],
  ["Whangārei", -35.73, 174.32, "The northernmost city in New Zealand."]
];
export const NZL_LANDEMERKER = [
  ["Aoraki / Mount Cook", -43.60, 170.14, "The highest mountain in New Zealand (3,724 m)."],
  ["Milford Sound / Piopiotahi", -44.67, 167.93, "A spectacular fiord in Fiordland National Park."],
  ["Tongariro National Park", -39.20, 175.60, "Active volcanoes and sacred Māori land – New Zealand’s first national park."],
  ["The Waitangi Treaty Grounds", -35.27, 174.08, "Where the Treaty of Waitangi was signed in 1840."],
  ["Hobbiton", -37.87, 175.68, "The film set from The Lord of the Rings and The Hobbit."],
  ["Lake Taupō", -38.80, 175.90, "The largest lake in New Zealand, in the crater of a supervolcano."],
  ["Franz Josef Glacier", -43.47, 170.18, "A glacier that comes down almost to the rainforest near the sea."],
  ["Abel Tasman National Park", -40.90, 173.00, "Golden beaches and coastal walks."],
  ["Cape Reinga / Te Rerenga Wairua", -34.43, 172.68, "The northern tip, where Māori believe spirits leave for the afterlife."],
  ["Waitomo Caves", -38.26, 175.10, "Caves lit up by thousands of glow-worms."],
  ["Kaikōura", -42.40, 173.68, "A place where you can watch whales and dolphins."],
  ["Stewart Island / Rakiura", -47.00, 167.85, "New Zealand’s third largest island, a home for kiwi birds."]
];

export const ZAF_BYER = [
  ["Pretoria", -25.75, 28.19, "The executive capital – where the government sits."],
  ["Cape Town", -33.92, 18.42, "The legislative capital – where Parliament sits."],
  ["Bloemfontein", -29.12, 26.21, "The judicial capital – home of the Supreme Court of Appeal."],
  ["Johannesburg", -26.20, 28.05, "The largest city, built on gold mining."],
  ["Durban", -29.86, 31.03, "A port city on the Indian Ocean with a large Indian community."],
  ["Gqeberha (Port Elizabeth)", -33.96, 25.60, "A port city in the Eastern Cape."],
  ["East London", -33.02, 27.91, "A port city in the Eastern Cape."],
  ["Polokwane", -23.90, 29.45, "The capital of Limpopo province."],
  ["Kimberley", -28.74, 24.77, "A city built around a huge diamond mine – the “Big Hole”."],
  ["Mbombela (Nelspruit)", -25.47, 30.97, "The capital of Mpumalanga, close to Kruger National Park."],
  ["Pietermaritzburg", -29.60, 30.38, "Where Gandhi was thrown off a train in 1893."],
  ["Stellenbosch", -33.93, 18.86, "A university town known for wine."],
  ["Upington", -28.45, 21.26, "A town on the Orange River, close to the Kalahari."]
];
export const ZAF_LANDEMERKER = [
  ["Table Mountain", -33.96, 18.40, "A flat-topped mountain above Cape Town."],
  ["Robben Island", -33.81, 18.37, "The prison island where Nelson Mandela was held for 18 years."],
  ["The Cape of Good Hope", -34.36, 18.47, "A famous headland that sailors had to pass on the way to Asia."],
  ["Kruger National Park", -24.00, 31.50, "One of Africa’s largest game reserves – home of the “Big Five”."],
  ["The Drakensberg", -29.00, 29.40, "The highest mountains in Southern Africa, with San rock art."],
  ["Blyde River Canyon", -24.57, 30.83, "One of the largest canyons in the world."],
  ["The Garden Route", -34.04, 23.05, "A beautiful stretch of coast with forests, lagoons and beaches."],
  ["The Kalahari", -26.00, 20.60, "A large semi-desert shared with Botswana and Namibia."],
  ["Soweto", -26.27, 27.86, "A township near Johannesburg, centre of the 1976 student uprising."],
  ["The Cradle of Humankind", -25.92, 27.78, "Caves where some of the oldest human fossils have been found."],
  ["Cape Agulhas", -34.83, 20.00, "The southernmost point of Africa, where two oceans meet."],
  ["Augrabies Falls", -28.59, 20.34, "A powerful waterfall on the Orange River."],
  ["iSimangaliso Wetland Park", -27.90, 32.50, "A coastal wetland with hippos, crocodiles and coral reefs."]
];

export const IND_BYER = [
  ["New Delhi", 28.61, 77.21, "The capital of India."],
  ["Mumbai", 19.08, 72.88, "India’s largest city and financial centre, home of Bollywood."],
  ["Kolkata", 22.57, 88.36, "The capital of British India until 1911."],
  ["Chennai", 13.08, 80.27, "A large city on the east coast, centre of Tamil culture."],
  ["Bengaluru", 12.97, 77.59, "India’s “Silicon Valley”, centre of the IT industry."],
  ["Hyderabad", 17.39, 78.49, "A big city known for technology and biryani."],
  ["Ahmedabad", 23.02, 72.57, "A large city in Gujarat, where Gandhi had his ashram."],
  ["Jaipur", 26.91, 75.79, "The “Pink City”, capital of Rajasthan."],
  ["Varanasi", 25.32, 82.97, "One of the oldest living cities in the world, holy to Hindus, on the Ganges."],
  ["Agra", 27.18, 78.01, "The city of the Taj Mahal."],
  ["Amritsar", 31.63, 74.87, "Home of the Golden Temple, the holiest place for Sikhs."],
  ["Kochi", 9.93, 76.27, "A port city in Kerala with a long history of trade."],
  ["Srinagar", 34.08, 74.80, "A city of lakes and houseboats in the Kashmir valley."],
  ["Guwahati", 26.14, 91.74, "The largest city in the north-east, on the Brahmaputra River."],
  ["Panaji", 15.50, 73.83, "The capital of Goa, a former Portuguese colony."]
];
export const IND_LANDEMERKER = [
  ["The Taj Mahal", 27.17, 78.04, "A white marble tomb built by Shah Jahan for his wife, finished around 1653."],
  ["The Golden Temple", 31.62, 74.88, "The holiest site of Sikhism, in Amritsar."],
  ["The Gateway of India", 18.92, 72.83, "A great arch in Mumbai, built to welcome King George V in 1911."],
  ["The Red Fort", 28.66, 77.24, "A huge fort in Delhi where the Prime Minister speaks on Independence Day."],
  ["The Kerala backwaters", 9.50, 76.34, "A network of lakes, canals and rivers – explored by houseboat."],
  ["Hampi", 15.34, 76.46, "The ruins of a great medieval Hindu empire."],
  ["The Ajanta Caves", 20.55, 75.70, "Buddhist cave temples with paintings about 2,000 years old."],
  ["Kangchenjunga", 27.70, 88.15, "The highest mountain in India (8,586 m), in the Himalayas."],
  ["The Sundarbans", 21.95, 88.90, "The world’s largest mangrove forest – home of the Bengal tiger."],
  ["The Thar Desert", 27.00, 71.00, "The Great Indian Desert in Rajasthan."],
  ["The Konark Sun Temple", 19.89, 86.09, "A temple shaped like a giant chariot for the sun god."],
  ["The Victoria Memorial", 22.54, 88.34, "A white marble building in Kolkata from British times."],
  ["Dandi", 21.33, 72.62, "Where Gandhi’s Salt March ended in 1930."]
];

export const SGP_LANDEMERKER = [
  ["Marina Bay Sands", 1.2834, 103.8607, "A hotel with three towers and a huge “ship” on top."],
  ["Gardens by the Bay", 1.2816, 103.8636, "A park with giant metal “supertrees” and glass domes."],
  ["The Merlion", 1.2868, 103.8545, "A statue with the head of a lion and the body of a fish – the symbol of Singapore."],
  ["Changi Airport", 1.3644, 103.9915, "One of the world’s best airports, with an indoor waterfall."],
  ["Sentosa", 1.2494, 103.8303, "A holiday island with beaches and theme parks."],
  ["Chinatown", 1.2836, 103.8443, "A historic district with Chinese temples, shops and food."],
  ["Little India", 1.3066, 103.8518, "A colourful district with Indian shops, temples and restaurants."],
  ["Kampong Glam", 1.3023, 103.8590, "A Malay and Muslim district around the Sultan Mosque."],
  ["The Botanic Gardens", 1.3138, 103.8159, "A UNESCO World Heritage garden, famous for orchids."],
  ["Singapore Zoo", 1.4043, 103.7930, "A zoo in the rainforest where animals live without cages."],
  ["Bukit Timah Hill", 1.3541, 103.7764, "Singapore’s highest point – only 164 metres."],
  ["Pulau Ubin", 1.4044, 103.9625, "A small island where you can see how Singapore looked in the 1960s."],
  ["The Causeway", 1.4508, 103.7695, "The road and railway bridge to Malaysia."],
  ["Raffles Hotel", 1.2949, 103.8545, "A famous colonial hotel from 1887, named after Stamford Raffles."]
];
