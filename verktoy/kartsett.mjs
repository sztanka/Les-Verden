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
