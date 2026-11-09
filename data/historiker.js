/* Les verden – Les som en historiker (historiker.html)
   Tre sett med kilder som forteller ulikt om samme hendelse.
   KILDENE ER GJENSKAPT: De er skrevet for Les verden, men bygger på
   virkelige hendelser og på typer kilder som finnes fra tiden.
   sjekk: flervalg med fasit (r = indeks for riktig svar). */
window.LV = window.LV || {};
window.LV.historiker = [
  {
    id: "fyrstikk", ikon: "🔥", sp: "nb", tema: "sf9-arbeiderbevegelsen",
    tittel: "Fyrstikkarbeiderskenes streik i 1889",
    sporsmal: "Hvorfor streiket fyrstikkarbeiderskene – og hvordan hadde de det på fabrikken?",
    kontekst: "Høsten 1889 la arbeiderskene ved to fyrstikkfabrikker i Kristiania ned arbeidet. Mange av dem var unge kvinner og jenter. Arbeidet med fosfor kunne gi en alvorlig sykdom i kjeven, fosfornekrose. Streiken vakte stor oppsikt, fordi det var uvanlig at kvinner streiket. På denne tiden vokste arbeiderbevegelsen, og det var stor uenighet i samfunnet om fagforeninger og streiker.",
    kilder: [
      { id: "A", type: "Leserinnlegg i en borgerlig avis", hvem: "En disponent (leder) ved en av fabrikkene", nar: "Oktober 1889, under streiken", tekst: "Arbeiderskene ved vår fabrikk har alltid blitt behandlet ordentlig, og lønningene er ikke dårligere enn ved andre fabrikker. Den lille justeringen av akkordlønnen var nødvendig på grunn av hard konkurranse fra utlandet. Det er sørgelig å se at uerfarne piker har latt seg forlede av agitatorer som ønsker uro. De fleste ville gjerne arbeide, om de bare fikk være i fred." },
      { id: "B", type: "Utdrag fra erindringer", hvem: "En kvinne som arbeidet på fabrikken som ung", nar: "Skrevet omkring 1935, over 40 år etter streiken", tekst: "Jeg var fjorten år da jeg begynte i fyrstikkfabrikken. Vi sto i elleve timer, og stanken av fosfor satt i håret og klærne. Flere av jentene fikk vondt i tennene, og én av dem mistet en del av kjeven. Da de kuttet lønna, var det nok. Vi var redde, men vi holdt sammen. Jeg husker at noen menn lo av oss og sa at jenter ikke kunne streike." },
      { id: "C", type: "Artikkel i en arbeideravis", hvem: "En journalist i en avis som støttet arbeiderbevegelsen", nar: "Oktober 1889, under streiken", tekst: "Fyrstikkarbeiderskene har vist et mot som mange menn kunne lære av. For en lønn som knapt holder til brød, risikerer de helsen hver dag i fosforstanken. Nå vil fabrikkeierne kutte enda mer. Hele byens arbeidere bør støtte disse modige kvinnene!" }
    ],
    sjekk: [
      { q: "Hvilken kilde ble skrevet lengst etter hendelsen?", valg: ["A", "B", "C"], r: 1, f: "B ble skrevet over 40 år senere. Hukommelsen kan svikte, og fortellingen kan bli farget av det som skjedde senere – men den gir et unikt innblikk i hvordan det føltes." },
      { q: "Hvem har størst grunn til å framstille forholdene på fabrikken som gode?", valg: ["Disponenten (A)", "Arbeidersken (B)", "Journalisten (C)"], r: 0, f: "Disponenten har ansvaret for fabrikken og vil forsvare den. Det betyr ikke at alt han skriver er feil, men vi må lese kilden med det i tankene." },
      { q: "Hva er alle tre kildene enige om?", valg: ["At forholdene var gode", "At lønna ble endret, og at arbeiderskene streiket", "At agitatorer sto bak streiken"], r: 1, f: "Alle tre bekrefter at lønna ble endret (A kaller det en «justering», B og C et «kutt»). Når kilder som er uenige om mye, likevel er enige om noe, er det sannsynligvis riktig." }
    ],
    ord: ["«justeringen» (A) – mot «kuttet» (B og C)", "«latt seg forlede av agitatorer» (A)", "«modige kvinnene» (C)"]
  },
  {
    id: "torgslaget", ikon: "🐎", sp: "nb", tema: "sf8-1814-grunnloven",
    tittel: "Torgslaget 17. mai 1829",
    sporsmal: "Hva skjedde på torget i Christiania 17. mai 1829 – og hvem hadde skylden?",
    kontekst: "Norge var i union med Sverige, og kong Karl Johan mislikte at nordmenn feiret 17. mai. Han mente at feiringen var en demonstrasjon mot unionen og mot ham. Om kvelden 17. mai 1829 samlet mange mennesker seg på torget i Christiania. Myndighetene sendte politi og ridende soldater for å få folk til å gå hjem. Ingen ble drept, men hendelsen fikk stor betydning for hvordan 17. mai ble feiret senere.",
    kilder: [
      { id: "A", type: "Rapport til myndighetene", hvem: "Politimesteren i Christiania", nar: "Dagen etter, 18. mai 1829", tekst: "En stor og uordentlig folkemengde samlet seg på torget utover kvelden, med rop og sang som forstyrret byens ro. Folkemengden ble flere ganger oppfordret til å gå hjem, men nektet. Det ble derfor nødvendig å la kavaleriet rydde torget. Dette ble gjort med den største forsiktighet, og så vidt jeg vet ble ingen alvorlig skadet." },
      { id: "B", type: "Privat brev", hvem: "En student som var til stede, til broren sin", nar: "Mai 1829", tekst: "Vi var mange som feiret grunnlovsdagen på torget, helt fredelig, med sang og hurrarop for Norge. Ingen fikk noen ordre som vi kunne høre. Plutselig kom rytterne med dragne sabler og red rett inn i folkemengden. Kvinner og barn skrek og løp. Jeg fikk et slag i ryggen med den flate siden av en sabel. Aldri har jeg vært så sint." },
      { id: "C", type: "Utdrag fra en historiebok for skolen", hvem: "En lærebokforfatter", nar: "Omkring 1920, nesten hundre år senere", tekst: "Torgslaget i 1829 viste at nordmennene ikke ville la seg kue. Kongens soldater kunne jage folk fra torget, men de kunne ikke ta fra dem kjærligheten til frihet og fedreland. Etter dette ble 17. mai en dag hele folket samlet seg om." }
    ],
    sjekk: [
      { q: "Hvilke to kilder er skrevet av øyenvitner?", valg: ["A og B", "B og C", "A og C"], r: 0, f: "Politimesteren og studenten var der – eller fikk rapporter rett etterpå. Læreboka er skrevet nesten hundre år senere og bygger på andre kilder." },
      { q: "Hva er kildene A og B uenige om?", valg: ["Om det var folk på torget", "Om folkemengden var fredelig, og om de fikk beskjed om å gå", "Om kavaleriet ble brukt"], r: 1, f: "Begge bekrefter at det var en folkemengde og at kavaleriet ryddet torget. De er uenige om oppførselen og om ordrene – det som avgjør hvem som «hadde skylden»." },
      { q: "Hva forteller kilde C mest om?", valg: ["Nøyaktig hva som skjedde på torget", "Hvordan nordmenn så på 17. mai rundt 1920", "Hva politimesteren tenkte"], r: 1, f: "Læreboka sier mer om sin egen tid – nasjonalfølelsen etter 1905 – enn om 1829. Historiefortellinger brukes ofte til å skape fellesskap." }
    ],
    ord: ["«uordentlig folkemengde» (A) – mot «helt fredelig» (B)", "«med den største forsiktighet» (A) – mot «red rett inn i folkemengden» (B)", "«ikke ville la seg kue» (C)"]
  },
  {
    id: "peterloo", ikon: "⚔️", sp: "en", tema: "en8-democracy-britain",
    tittel: "The Peterloo Massacre, 1819",
    sporsmal: "What happened at St Peter's Field in Manchester on 16 August 1819 – and who was to blame?",
    kontekst: "In 1819, very few people in Britain could vote, and big industrial cities like Manchester had no Members of Parliament of their own. Food was expensive and many workers were poor. On 16 August, a huge crowd – perhaps 60,000 people – gathered at St Peter's Field to hear speakers demand reform. The local magistrates ordered the arrest of the main speaker, Henry Hunt, and sent in armed cavalry. Around 15 to 18 people were killed and hundreds were injured. People soon called it «Peterloo», a bitter reference to the Battle of Waterloo four years earlier.",
    kilder: [
      { id: "A", type: "Report to the government", hvem: "The local magistrates in Manchester", nar: "A few days later, August 1819", tekst: "An immense mob, many of them armed with sticks, marched into the town in military order. The inhabitants were in great fear. When the yeomanry went to arrest the speaker, they were surrounded and attacked with stones and sticks. The cavalry had no choice but to defend themselves. Order was restored, and the town was saved from great danger." },
      { id: "B", type: "Witness statement", hvem: "A weaver who was in the crowd", nar: "Given at an inquiry later in 1819", tekst: "We came in our Sunday clothes, with our wives and children, carrying banners that said «Liberty» and «Reform». Nobody I saw had a weapon. We were singing when the horsemen came. They rode into the crowd and cut at everyone near them with their sabres. I saw a woman fall under a horse. People could not get away because the field was so full." },
      { id: "C", type: "Newspaper article", hvem: "A radical newspaper that supported reform", nar: "August 1819", tekst: "The massacre at Manchester will never be forgotten. Peaceful men, women and children, asking only for their rights, were cut down by the sabres of the rich. This is how the government answers the voice of the people. Every true Briton must demand justice for the victims of Peterloo!" }
    ],
    sjekk: [
      { q: "Who had the strongest reason to say the soldiers acted in self-defence?", valg: ["The magistrates (A)", "The weaver (B)", "The newspaper (C)"], r: 0, f: "The magistrates had given the order. If the crowd was peaceful, they were responsible for the deaths." },
      { q: "What do sources B and C agree on that A does not?", valg: ["That there was a large crowd", "That the crowd was peaceful", "That the cavalry was used"], r: 1, f: "All three agree there was a big crowd and that the cavalry was sent in. B and C describe the crowd as peaceful; A calls it an armed mob." },
      { q: "Why is source C less useful as evidence of exactly what happened?", valg: ["It was written too late", "It is written to make readers angry and support reform", "It was written by a soldier"], r: 1, f: "C is useful for understanding how people reacted, but its strong language («cut down by the sabres of the rich») shows it wants to persuade, not just describe." }
    ],
    ord: ["«an immense mob ... in military order» (A) – vs «in our Sunday clothes» (B)", "«had no choice but to defend themselves» (A)", "«massacre» (C) – vs «order was restored» (A)"]
  }
];
