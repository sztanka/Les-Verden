/* =========================================================
   Les verden – Årsak og virkning (arsak.html)
   Hver kjede står i riktig rekkefølge: fra årsak til følge.
   Spillet stokker leddene, og eleven setter dem i riktig rekkefølge.
   ========================================================= */
window.LV = window.LV || {};
LV.arsakskjeder = [
  { id: "industri", tema: "sf9-industrialiseringen", fag: "samfunnsfag", trinn: 9, tittel: "Fra kull til klimakrise", ledd: [
    "Storbritannia har mye kull og jern og mange rike kjøpmenn",
    "Dampmaskinen blir forbedret, og fabrikker bygges",
    "Folk flytter fra landet til byene for å få arbeid",
    "Arbeiderne bor trangt og jobber lange dager for lav lønn",
    "Arbeiderne går sammen i fagforeninger og krever bedre kår"
  ], forklaring: "Ressurser og kapital gjorde industrialiseringen mulig. Fabrikkene trakk folk til byene, de dårlige forholdene der førte til at arbeiderne organiserte seg." },
  { id: "ww1", tema: "sf9-forste-verdenskrig", fag: "samfunnsfag", trinn: 9, tittel: "Veien inn i første verdenskrig", ledd: [
    "Stormaktene bygger opp hærer og inngår allianser",
    "Franz Ferdinand blir skutt i Sarajevo i juni 1914",
    "Østerrike-Ungarn erklærer krig mot Serbia",
    "Alliansene trekker de andre stormaktene inn i krigen",
    "Krigen låser seg fast i skyttergravene i Frankrike"
  ], forklaring: "Spenningene (MAIN) var den langsiktige årsaken, skuddene i Sarajevo den utløsende. Alliansene gjorde en lokal konflikt til en verdenskrig." },
  { id: "ww2", tema: "sf10-mellomkrigstiden", fag: "samfunnsfag", trinn: 10, tittel: "Fra Versailles til ny krig", ledd: [
    "Tyskland får skylden og harde straffer i Versailles-freden",
    "Den økonomiske krisen på 1930-tallet gir stor arbeidsledighet",
    "Mange tyskere støtter Hitler, som lover arbeid og oppreisning",
    "Hitler gjør Tyskland til et diktatur og ruster opp",
    "Tyskland angriper Polen i 1939"
  ], forklaring: "Bitterhet etter Versailles og krise gjorde folk villige til å støtte en ekstrem leder. Diktaturet og opprustningen førte til krig." },
  { id: "kald", tema: "sf10-kalde-krigen", fag: "samfunnsfag", trinn: 10, tittel: "Hvorfor Berlinmuren falt", ledd: [
    "Sovjetunionen bruker enorme summer på våpen og kriger",
    "Økonomien i Sovjetunionen kommer i dyp krise",
    "Gorbatsjov innfører reformer og mer åpenhet",
    "Folk i Øst-Europa gjør opprør mot de kommunistiske regimene",
    "Berlinmuren faller i 1989, og Sovjetunionen oppløses i 1991"
  ], forklaring: "Våpenkappløpet tappet Sovjetunionen. Krisen førte til reformer, og den nye friheten ga folk mot til å gjøre opprør." },
  { id: "apartheid", tema: "sf10-apartheid", fag: "samfunnsfag", trinn: 10, tittel: "Slutten på apartheid", ledd: [
    "Svarte sørafrikanere protesterer mot apartheidlovene",
    "Politiet slår hardt ned på protester, for eksempel i Soweto i 1976",
    "Verden reagerer med boikott og sanksjoner",
    "Økonomien svekkes, og presidenten forstår at apartheid må ta slutt",
    "Mandela løslates i 1990, og alle får stemme i 1994"
  ], forklaring: "Motstand i landet og press utenfra virket sammen. Uten begge deler hadde apartheid trolig vart lenger." },
  { id: "avkol", tema: "sf10-avkolonisering", fag: "samfunnsfag", trinn: 10, tittel: "Hvorfor koloniene ble frie", ledd: [
    "Europa er svekket og fattig etter andre verdenskrig",
    "Soldater fra koloniene har kjempet for frihet – og krever det selv",
    "Selvstendighetsbevegelser vokser fram med sterke ledere",
    "FN støtter folkenes rett til selvbestemmelse",
    "Mange kolonier blir selvstendige stater fra 1947 til 1975"
  ], forklaring: "Flere årsaker virket sammen: svake kolonimakter, sterke frigjøringsbevegelser og internasjonalt press." },
  { id: "olje", tema: "sf10-norge-etter-1945", fag: "samfunnsfag", trinn: 10, tittel: "Oljen og velferden", ledd: [
    "Det blir funnet olje på Ekofisk i 1969",
    "Stortinget bestemmer at oljen skal tilhøre fellesskapet",
    "Staten får store inntekter fra skatt og eierskap",
    "Overskuddet settes i Oljefondet",
    "En liten del av fondet brukes hvert år på velferd"
  ], forklaring: "Valget om at oljen skulle tilhøre fellesskapet, er grunnen til at oljepengene kommer alle til gode." },
  { id: "klima", tema: "sf10-klimaendringer", fag: "samfunnsfag", trinn: 10, tittel: "Fra utslipp til klimaendringer", ledd: [
    "Vi brenner kull, olje og gass",
    "Det slippes ut CO₂ og andre klimagasser",
    "Mer drivhusgasser i atmosfæren holder på varmen",
    "Gjennomsnittstemperaturen på jorda stiger",
    "Isen smelter, havet stiger og ekstremvær blir vanligere"
  ], forklaring: "Dette er den forsterkede drivhuseffekten: menneskelige utslipp forsterker en naturlig effekt." },
  { id: "fornorsk", tema: "sf9-fornorskingen", fag: "samfunnsfag", trinn: 9, tittel: "Fornorskingen og følgene", ledd: [
    "Nasjonalismen gir idéen om at Norge skal ha ett folk og ett språk",
    "Staten bestemmer at samiske og kvenske barn skal lære norsk",
    "Barna blir sendt på internatskoler der morsmålet er forbudt",
    "Mange mister språket og skammer seg over bakgrunnen sin",
    "Staten beklager, og det arbeides for å ta språkene tilbake"
  ], forklaring: "Nasjonalismen ga grunnlaget for politikken. Følgene merkes fortsatt i dag, og forsoningsarbeidet pågår." },
  { id: "russisk", tema: "sf9-russiske-revolusjonen", fag: "samfunnsfag", trinn: 9, tittel: "Den russiske revolusjonen", ledd: [
    "De fleste russere er fattige bønder og arbeidere under en mektig tsar",
    "Første verdenskrig gir enorme tap og matmangel",
    "Folk gjør opprør, og tsaren må gå av i 1917",
    "Bolsjevikene under Lenin tar makten",
    "Sovjetunionen blir et kommunistisk ettpartistyre"
  ], forklaring: "Fattigdom var den langsiktige årsaken, krigen den utløsende. Kaoset ga bolsjevikene mulighet til å ta makten." },
  { id: "1814", tema: "sf8-1814-grunnloven", fag: "samfunnsfag", trinn: 8, tittel: "Fra Kielfreden til Grunnloven", ledd: [
    "Danmark-Norge er på den tapende siden i Napoleonskrigene",
    "I Kielfreden i januar 1814 må Danmark gi fra seg Norge til Sverige",
    "Nordmenn vil ikke bare overleveres, og vil bestemme selv",
    "Riksforsamlingen møtes på Eidsvoll",
    "Grunnloven blir vedtatt 17. mai 1814"
  ], forklaring: "Et nederlag i en stor europeisk krig ga Norge en sjanse til å lage sin egen grunnlov." },
  { id: "civilrights", tema: "en10-oppression", fag: "engelsk", trinn: 10, tittel: "The Civil Rights Movement", sprak: "en", ledd: [
    "Laws in the South keep Black and white Americans apart",
    "Rosa Parks refuses to give up her seat on a bus in 1955",
    "Black people in Montgomery boycott the buses for more than a year",
    "Peaceful protests and marches get attention all over the USA",
    "Congress passes the Civil Rights Act in 1964"
  ], forklaring: "Segregation caused protest. Peaceful, well-organised action won public support and led to new laws." },
  { id: "english", tema: "en9-british-empire", fag: "engelsk", trinn: 9, tittel: "Why English became a world language", sprak: "en", ledd: [
    "Britain builds a huge empire with colonies all over the world",
    "English is used in government, schools and trade in the colonies",
    "Many former colonies keep English after independence",
    "The USA becomes the world’s leading power after 1945",
    "English becomes the main language of the internet, science and pop culture"
  ], forklaring: "First the British Empire, then American power and technology, spread English around the world." },
  { id: "911", tema: "en10-9-11", fag: "engelsk", trinn: 10, tittel: "After 9/11", sprak: "en", ledd: [
    "Al-Qaeda terrorists attack the USA on 11 September 2001",
    "The USA demands that the Taliban hand over Osama bin Laden",
    "The USA and its allies invade Afghanistan",
    "Security at airports and surveillance increase around the world",
    "People debate how much freedom we should give up for security"
  ], forklaring: "The attacks led to wars, new security laws and a lasting debate about freedom and safety." },
  { id: "famine", tema: "en8-ireland", fag: "engelsk", trinn: 8, tittel: "The Great Famine in Ireland", sprak: "en", ledd: [
    "Most poor Irish families depend on potatoes for food",
    "A plant disease destroys the potato harvest in 1845",
    "About a million people die of hunger and disease",
    "More than a million people emigrate, many to the USA",
    "Ireland’s population is still lower today than before the famine"
  ], forklaring: "Depending on one crop made the disease a catastrophe. Emigration changed both Ireland and the USA." }
];
