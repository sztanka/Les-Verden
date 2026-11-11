/* =========================================================
   Les verden – Hverdagsbilder (Tidsreisen, modus «hverdag»)
   Korte tekster om en vanlig dag. Eleven gjetter året ut fra
   detaljene. Ledetråd 1 er vanskeligst, ledetråd 3 nesten avslører året.
   Felter: id, ar, tema (temaside), sprak ("nb"/"en"), trinn,
   tittel (vises etter gjettet), ledetrader [3], forklaring.
   kontroller: opplysninger læreren bør sjekke.
   ========================================================= */
window.LV = window.LV || {};
LV.hverdagsbilder = [
  { id: "christiania-1624", ar: 1624, tema: "sf8-befolkning-urbanisering", sprak: "nb", trinn: 8, tittel: "Oslo brenner – og blir Christiania",
    ledetrader: [
      "Det lukter fortsatt røyk over hele byen. Nesten alle trehusene ved Bjørvika er borte. Folk bor i telt og i sjøbuer mens de venter på å få vite hva som skal skje.",
      "Kongen kom selv ridende fra København for å se på ruinene. Han har bestemt at byen ikke skal bygges opp igjen der den lå, men flyttes inn under festningen Akershus. Gatene skal være rette og brede, og husene i byens sentrum skal helst være av mur.",
      "Den nye byen skal få kongens eget navn. Kongen heter Christian 4."
    ],
    forklaring: "Etter en stor bybrann i 1624 flyttet Christian 4. byen Oslo til området ved Akershus festning og ga den navnet Christiania. Rutenettet av rette gater kan du fortsatt se i Kvadraturen i Oslo. Byen het Christiania (senere Kristiania) helt til 1925." },
  { id: "philadelphia-1776", ar: 1776, tema: "sf8-amerikanske-revolusjonen", sprak: "en", trinn: 8, tittel: "A printer’s shop in Philadelphia",
    ledetrader: [
      "It is a hot July evening. The printer’s shop smells of ink and sweat. Outside, people are arguing about whether the colonies should stay loyal to the king across the ocean.",
      "A messenger runs in with a handwritten text. «Print two hundred copies tonight!» The text says that all men are created equal, and that the colonies have the right to be free and independent states.",
      "The text was approved by the Continental Congress on the fourth of July. Tomorrow it will be read aloud in the streets."
    ],
    forklaring: "The Declaration of Independence was approved on 4 July 1776, and the first printed copies were made that night by John Dunlap in Philadelphia. It was read aloud in public a few days later." },
  { id: "paris-1793", ar: 1793, tema: "sf8-franske-revolusjonen", sprak: "nb", trinn: 8, tittel: "En høstdag i det revolusjonære Paris",
    ledetrader: [
      "Gatene har fått nye navn. Ingen sier «monsieur» lenger – nå skal alle kalles «borger». Kirkene er stengt, og i en av dem holdes det fest for Fornuften.",
      "Kalenderen er også ny: Uka har ti dager, og månedene heter ting som «Tåkemåned» og «Vinmåned». Brødet er rasjonert, og en ny lov sier at alle som er mistenkt for å være mot revolusjonen, kan arresteres.",
      "Kongen ble henrettet i januar i år, og nå venter dronningen Marie Antoinette på sin dom."
    ],
    forklaring: "Høsten 1793 innførte Frankrike en egen revolusjonskalender, og terroren begynte. Ludvig 16. ble henrettet 21. januar 1793, og Marie Antoinette 16. oktober samme år." },
  { id: "sluppen-1825", ar: 1825, tema: "sf9-utvandringen", sprak: "nb", trinn: 9, tittel: "Sluppen fra Stavanger",
    ledetrader: [
      "En liten seilbåt ligger fortøyd ved kaia. Den er knapt større enn en fiskeskute, men 52 mennesker skal over havet med den. Mange av dem er kvekere, som ikke får praktisere troen sin fritt i Norge.",
      "Om bord er det sild som de håper å selge, og kister med klær og verktøy. Reisen kommer til å ta over tre måneder. Ingen nordmenn har gjort noe slikt i en organisert gruppe før.",
      "Det er bare elleve år siden Grunnloven ble skrevet. Båten heter «Restauration», og den skal til New York."
    ],
    forklaring: "4. juli 1825 seilte sluppen «Restauration» fra Stavanger med 52 mennesker. Den regnes som starten på den organiserte norske utvandringen til Amerika. Over 800 000 nordmenn fulgte etter de neste hundre årene." },
  { id: "crystal-palace-1851", ar: 1851, tema: "en9-victorian-era", sprak: "en", trinn: 9, tittel: "The Great Exhibition",
    ledetrader: [
      "You walk into a building made almost entirely of glass and iron. It is so big that full-grown elm trees are standing inside it. Thousands of people are pushing past you.",
      "There are machines from all over the world: steam engines, printing presses, a reaping machine from America and huge diamonds from India. Queen Victoria and Prince Albert have visited many times.",
      "The building is called the Crystal Palace, and it stands in Hyde Park. It is the first world’s fair in history."
    ],
    forklaring: "The Great Exhibition in London in 1851 showed off the power of industrial Britain and its Empire. Over six million visits were made in less than six months." },
  { id: "hovedbanen-1854", ar: 1854, tema: "sf9-industrialiseringen", sprak: "nb", trinn: 9, tittel: "Det første toget",
    ledetrader: [
      "Folk har gått i timevis for å se det. Noen er redde, andre ler. En gammel mann sier at det er djevelens verk å reise så fort.",
      "Damplokomotivet er bygd i England, og de fleste arbeiderne som har lagt sporene, er norske anleggsarbeidere – rallare. Turen som før tok en hel dag med hest og vogn, tar nå rundt to timer.",
      "Banen går fra Christiania til Eidsvoll, og den er den første jernbanen i Norge."
    ],
    forklaring: "Hovedbanen mellom Christiania og Eidsvoll åpnet i 1854. Den skulle frakte tømmer og varer fra innlandet til byen og havna. Jernbanen var et viktig tegn på at industrialiseringen hadde kommet til Norge." },
  { id: "telefon-1876", ar: 1876, tema: "en10-american-dream", sprak: "en", trinn: 10, tittel: "A voice through a wire",
    ledetrader: [
      "In a workshop in Boston, a young teacher of deaf students is bent over a strange machine with wires, a battery and a cone.",
      "He speaks into the cone. In the next room, his assistant hears his voice – not through the wall, but through the wire: «Mr. Watson, come here, I want to see you.»",
      "The inventor is Alexander Graham Bell, and the machine is the telephone. The same year, the USA celebrates its 100th birthday."
    ],
    forklaring: "Alexander Graham Bell got a patent for the telephone and made the first successful call in March 1876 – exactly 100 years after the Declaration of Independence. Within a few years, there were telephone lines in many cities, also in Norway." },
  { id: "stemmerett-1898", ar: 1898, tema: "sf8-demokratiet-i-norge", sprak: "nb", trinn: 8, tittel: "Alle menn får stemme",
    ledetrader: [
      "En fyrbøter på en dampbåt leser avisa høyt for de andre i messa. For første gang skal han få være med og bestemme hvem som sitter på Stortinget – selv om han verken eier jord eller tjener mye.",
      "Kvinnene i husholdningen hans får derimot ikke stemme. «Det kommer», sier kona hans bestemt. Hun er medlem av en forening som kjemper for kvinnestemmeretten.",
      "Stortinget har nettopp vedtatt alminnelig stemmerett for alle menn over 25 år. Det er sju år til unionsoppløsningen."
    ],
    forklaring: "I 1898 fikk alle norske menn over 25 år stemmerett, uavhengig av inntekt og eiendom. Kvinner fikk alminnelig stemmerett i 1913." },
  { id: "freden-1918", ar: 1918, tema: "sf9-forste-verdenskrig", sprak: "nb", trinn: 9, tittel: "Fred – og feber",
    ledetrader: [
      "Kirkeklokkene ringer over hele byen. Folk står på gata og klemmer hverandre. Men skolen din er stengt, og mange har munnbind når de går ut.",
      "En farlig influensa har spredt seg over hele verden i høst. Den rammer særlig unge voksne. Samtidig har de norske skipsrederne tjent store penger, og prisene på mat er høyere enn noen gang.",
      "Det er 11. november. Etter over fire år har det blitt våpenhvile på vestfronten."
    ],
    forklaring: "Første verdenskrig sluttet med våpenhvilen 11. november 1918. Samtidig herjet spanskesyken, som tok livet av rundt 15 000 mennesker i Norge." },
  { id: "wall-street-1929", ar: 1929, tema: "sf10-mellomkrigstiden", sprak: "en", trinn: 10, tittel: "Black Tuesday",
    ledetrader: [
      "A crowd has gathered outside the stock exchange in New York. Men in hats and long coats stare at the building in silence. Some of them have lost everything they owned in a single morning.",
      "For years, everybody has been buying shares – waiters, shoe-shine boys, teachers – often with borrowed money. Prices only went up. Now everyone is trying to sell at the same time, and nobody wants to buy.",
      "It is Tuesday, 29 October. The crash will be followed by the Great Depression."
    ],
    forklaring: "The Wall Street Crash in October 1929 started the Great Depression, a worldwide economic crisis. Millions lost their jobs in the 1930s – also in Norway." },
  { id: "kriseforliket-1935", ar: 1935, tema: "sf10-mellomkrigstiden", sprak: "nb", trinn: 10, tittel: "Kriseforliket",
    ledetrader: [
      "Faren din har vært arbeidsløs i to år. Han står i kø for å få gratis melk til barna. Mange gårder er tvangsauksjonert fordi bøndene ikke klarer å betale gjelda si.",
      "Arbeiderpartiet, som en gang ville ha revolusjon, har nå inngått et forlik med Bondepartiet. Sammen skal de bruke statens penger til å skape arbeid og hjelpe bøndene.",
      "Johan Nygaardsvold har nettopp blitt statsminister. For første gang har Arbeiderpartiet en regjering som blir sittende lenge."
    ],
    forklaring: "I 1935 inngikk Arbeiderpartiet og Bondepartiet kriseforliket, og Nygaardsvold dannet regjering. Det ble starten på en lang periode med Arbeiderparti-regjeringer og oppbyggingen av velferdsstaten." },
  { id: "fn-1946", ar: 1946, tema: "sf10-fn-menneskerettigheter", sprak: "nb", trinn: 10, tittel: "En nordmann i FN",
    ledetrader: [
      "Det er fortsatt rasjonering på sukker, kaffe og klær. Mange hus i Finnmark er bare aske etter krigen, og folk bor i brakker og jordgammer.",
      "I avisa er det stort bilde av en norsk politiker med runde briller. Han har fått en helt ny jobb: Han skal lede en organisasjon som skal hindre en ny verdenskrig.",
      "Trygve Lie er valgt til den første generalsekretæren i De forente nasjoner. Krigen sluttet året før."
    ],
    forklaring: "FN ble opprettet i 1945, og i februar 1946 ble Trygve Lie valgt til organisasjonens første generalsekretær. Gjenreisningen av Finnmark og Nord-Troms tok mange år." },
  { id: "sputnik-1957", ar: 1957, tema: "sf10-kalde-krigen", sprak: "nb", trinn: 10, tittel: "Pipet fra verdensrommet",
    ledetrader: [
      "Radioamatøren i nabohuset har sittet oppe hele natta med hodetelefonene på. Han ser blek og spent ut. «Jeg hørte det», sier han. «Pip, pip, pip.»",
      "Alle aviser skriver om det samme: Sovjetunionen har sendt noe opp i verdensrommet før amerikanerne. I USA er folk redde – hvis russerne kan sende en satellitt rundt jorda, kan de kanskje sende en atomrakett også.",
      "Satellitten heter Sputnik. Romkappløpet har begynt."
    ],
    forklaring: "4. oktober 1957 skjøt Sovjetunionen opp Sputnik 1, verdens første kunstige satellitt. Det var et sjokk for USA, og romkappløpet ble en viktig del av den kalde krigen." },
  { id: "fjernsyn-1960", ar: 1960, tema: "sf10-norge-etter-1945", sprak: "nb", trinn: 10, tittel: "Fjernsynet kommer",
    ledetrader: [
      "Hele oppgangen er samlet i stua til familien i tredje etasje. De er de eneste i gården som har kjøpt en svart-hvitt-skjerm i en stor trekasse.",
      "Det er bare én kanal, og den sender bare noen timer om kvelden. Mellom programmene vises et prøvebilde. Ungene sitter på gulvet og venter.",
      "NRK har nettopp startet offisielle fjernsynssendinger. Rasjoneringen etter krigen er endelig helt over."
    ],
    forklaring: "NRK Fjernsynet startet de offisielle sendingene i august 1960. Fjernsynet forandret hvordan nordmenn fikk nyheter og brukte fritiden sin." },
  { id: "ekofisk-1969", ar: 1969, tema: "sf8-naturressurser", sprak: "nb", trinn: 8, tittel: "Funnet i Nordsjøen",
    ledetrader: [
      "Det er like før jul. På en boreplattform langt ute i Nordsjøen står arbeiderne i regnvær og jubler over en svart væske.",
      "Mange trodde det ikke fantes noe under havbunnen på norsk side. Et amerikansk selskap har boret i flere år uten å finne nok. Dette var nesten det siste forsøket.",
      "Feltet får navnet Ekofisk. Samme år gikk de første menneskene på månen."
    ],
    forklaring: "Like før jul 1969 bekreftet Phillips Petroleum at de hadde funnet store mengder olje på Ekofisk-feltet. Oljen forandret norsk økonomi fullstendig." },
  { id: "ef-1972", ar: 1972, tema: "sf10-internasjonalt-samarbeid", sprak: "nb", trinn: 10, tittel: "Ja eller nei?",
    ledetrader: [
      "Hele familien er uenig. Bestefar har et merke på jakka der det står «Nei». Onkelen din har et merke der det står «Ja». Ved middagen er det ingen som snakker sammen.",
      "Det handler om Norge skal bli med i et europeisk fellesskap. Bønder og fiskere er redde for konkurransen, mens mange i byene tror det vil gi flere jobber.",
      "Folkeavstemningen ender med 53,5 prosent nei. Statsminister Trygve Bratteli går av."
    ],
    forklaring: "I folkeavstemningen i september 1972 stemte 53,5 prosent nei til medlemskap i EF (senere EU). Norge stemte nei igjen i 1994." },
  { id: "gro-1981", ar: 1981, tema: "sf9-likestilling", sprak: "nb", trinn: 9, tittel: "Den første",
    ledetrader: [
      "Moren din har kjøpt alle avisene. På forsiden er en kvinne med kort hår og bestemt blikk. «Endelig», sier mor.",
      "Kvinnen er lege og har tidligere vært miljøvernminister. Hun er bare 41 år. Noen skriver stygge leserbrev om at en kvinne ikke kan styre landet.",
      "Gro Harlem Brundtland har blitt Norges første kvinnelige statsminister."
    ],
    forklaring: "Gro Harlem Brundtland ble statsminister i februar 1981. I 1986 dannet hun «kvinneregjeringen», der åtte av 18 statsråder var kvinner – en verdensrekord da." },
  { id: "march-1963", ar: 1963, tema: "en10-oppression", sprak: "en", trinn: 10, tittel: "A march in Washington",
    ledetrader: [
      "It is a hot August day. Buses and trains have brought people from all over the country. You are standing in a huge crowd around a long pool of water, in front of a white memorial to a president who ended slavery.",
      "People carry signs asking for jobs and freedom. A hundred years have passed since the slaves were freed, but in the South, Black Americans are still kept out of schools, restaurants and voting booths.",
      "A young minister from Atlanta speaks last. He talks about a dream. About 250 000 people are listening."
    ],
    forklaring: "The March on Washington for Jobs and Freedom took place on 28 August 1963. Martin Luther King Jr.’s speech became one of the most famous speeches in history. The Civil Rights Act came the next year." },
  { id: "lillehammer-1994", ar: 1994, tema: "sf10-norge-etter-1945", sprak: "nb", trinn: 10, tittel: "Vinterlekene",
    ledetrader: [
      "Det er minus 20 grader, men bakken ved hoppbakken er svart av mennesker med flagg. Noen har grillet pølser over bål siden fem om morgenen.",
      "Hele Norge sitter klistret til skjermen. Johann Olav Koss har satt tre verdensrekorder på skøyter. Senere på året skal folket stemme over EU igjen.",
      "De olympiske vinterleker arrangeres på Lillehammer."
    ],
    forklaring: "De olympiske vinterleker på Lillehammer i februar 1994 regnes som en av de mest vellykkede vinterlekene. I november samme år stemte Norge nei til EU for andre gang." },
  { id: "iphone-2007", ar: 2007, tema: "en9-media-advertising", sprak: "en", trinn: 9, tittel: "A phone without buttons",
    ledetrader: [
      "Your older brother is watching a video on the computer. A man in a black sweater is standing on a stage, holding a small black object. The audience is cheering.",
      "«An iPod, a phone and an internet communicator», the man says. You can touch the screen with your fingers to scroll. There is no keyboard. Many experts say nobody will want a phone without buttons.",
      "Steve Jobs presents the first iPhone. Facebook is three years old, and YouTube two."
    ],
    forklaring: "Apple presented the first iPhone in January 2007. Smartphones changed how people communicate, read news and use social media." },
  { id: "hjemmeskole-2020", ar: 2020, tema: "sf9-digital-dommekraft", sprak: "nb", trinn: 9, tittel: "Skolen på kjøkkenbordet",
    ledetrader: [
      "Klasserommet ditt er kjøkkenbordet. Læreren ser ut som et lite bilde på skjermen, og hun ber deg slå på mikrofonen. Du har på deg pysjbukse.",
      "Butikkene har gått tom for toalettpapir. Det er forbudt å besøke besteforeldre, og alle snakker om å «flate ut kurven».",
      "Statsministeren har nettopp gjennomført de sterkeste tiltakene i Norge i fredstid. Et nytt koronavirus sprer seg over hele verden."
    ],
    forklaring: "12. mars 2020 stengte Norge skoler og barnehager på grunn av koronapandemien. Mange elever fikk hjemmeundervisning digitalt i flere uker." }
];
LV.hverdagsbilderKontroller = [
  "Datoene og detaljene i hvert bilde er skrevet ut fra allmenn kunnskap – sjekk særlig: Restauration (52 personer, 4. juli 1825), Hovedbanen (reisetid ca. 2 timer), The Great Exhibition (over 6 millioner besøk), Ekofisk (bekreftet desember 1969), EF 1972 (53,5 % nei), March on Washington (ca. 250 000).",
  "Personene som opptrer i bildene (fyrbøteren, radioamatøren, familiene) er oppdiktet."
];
