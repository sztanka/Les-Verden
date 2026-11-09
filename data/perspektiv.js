/* Les verden – Perspektivbytte (perspektiv.html)
   Én hendelse – fire mennesker som opplevde den ulikt.
   Personene er oppdiktede, men situasjonene bygger på det som
   står i temaene. sp: språket på siden ("nb" eller "en").
   roller: navn, hvem (kort), situasjon, vet (fakta personen kjenner),
   foler (spørsmål til innlevelse) */
window.LV = window.LV || {};
window.LV.perspektiv = [
  {
    id: "fabrikken", ikon: "🏭", sp: "nb", trinn: 9, tema: "sf9-industrialiseringen",
    tittel: "En ny fabrikk i byen", tid: "England, 1830-årene",
    bakgrunn: "En ny bomullsspinneri åpner i en by i Nord-England. Maskinene drives av en dampmaskin, og fabrikken trenger hundrevis av arbeidere – også barn. Byen vokser raskt, og folk flytter inn fra landsbygda. I 1833 vedtar parlamentet en lov om barnearbeid i tekstilfabrikker, og inspektører skal sjekke at den blir fulgt.",
    format: "Skriv en dagbokside fra kvelden etter en vanlig arbeidsdag.",
    roller: [
      { ikon: "🧒", navn: "Mary, 11 år", hvem: "barnearbeider ved spinnemaskinene", situasjon: "Mary kryper under maskinene for å samle opp bomullsrester og knytte sammen tråder som ryker. Faren er syk, og lønna hennes trengs hjemme.", vet: ["Arbeidsdagen er lang, og det er støvete og bråkete.", "Hvis hun kommer for sent, blir lønna trukket.", "Hun har hørt om en ny lov, men vet ikke hva den betyr for henne."], foler: "Hva drømmer Mary om? Hva er hun redd for?" },
      { ikon: "🎩", navn: "Mr. Hartley", hvem: "eier av fabrikken", situasjon: "Mr. Hartley har lånt mye penger for å bygge fabrikken. Han konkurrerer med mange andre fabrikker om å selge billigst mulig.", vet: ["Barn er billige arbeidere, og små hender passer til noen av jobbene.", "Den nye loven kan gjøre det dyrere å drive.", "Fabrikken gir arbeid til mange som ellers ville sultet."], foler: "Hvordan forsvarer han seg selv? Er han i tvil om noe?" },
      { ikon: "🌾", navn: "John, 34 år", hvem: "landarbeider som har flyttet til byen", situasjon: "John mistet arbeidet på gården fordi det kom nye maskiner der også. Nå bor familien på fem i ett rom i en fuktig bakgård.", vet: ["I byen er det arbeid, men husleia er høy.", "Det er få toaletter og lite rent vann i nabolaget.", "Noen arbeidere snakker om å starte en fagforening."], foler: "Hva savner han fra landet? Angrer han på at han flyttet?" },
      { ikon: "📋", navn: "Inspektøren", hvem: "en av de nye fabrikkinspektørene", situasjon: "Inspektøren skal reise rundt og sjekke at fabrikkene følger loven. Han har et stort område og bare noen få medhjelpere.", vet: ["Loven forbyr barn under ni år i tekstilfabrikker og begrenser arbeidstiden for de yngste.", "Mange barn har ingen papirer som viser hvor gamle de er.", "Noen fabrikkeiere får beskjed før han kommer."], foler: "Hva tenker han når han ser barna? Klarer han å gjøre jobben sin?" }
    ],
    starter: ["I dag …", "Jeg kjente at …", "Det verste var …", "Jeg håper at …", "Ingen forstår at …"],
    sporsmal: ["Hva er likt og hva er ulikt i måten de to personene opplever fabrikken på?", "Hvem av de fire har mest makt? Hvem har minst?", "Hvem sine stemmer finner vi i kildene fra denne tiden – og hvem sine mangler? Hvorfor?"]
  },
  {
    id: "billetten", ikon: "🚢", sp: "nb", trinn: 9, tema: "sf9-utvandringen",
    tittel: "Billett til Amerika", tid: "En bygd i Norge, 1880-årene",
    bakgrunn: "I mange norske bygder er det for lite jord til alle. Fra Amerika kommer brev om billig jord og god lønn. Dampskipsselskapene har agenter som selger billetter. I en liten bygd har Anne bestemt seg: Hun skal reise. Ikke alle i familien er glade for det.",
    format: "Skriv et brev til en av de andre personene i rollekortene.",
    roller: [
      { ikon: "👩", navn: "Anne, 19 år", hvem: "skal reise alene til Amerika", situasjon: "Anne har tjent på en gård i tre år. En kusine i Minnesota har sendt et amerikabrev og lovet henne arbeid som tjenestepike.", vet: ["Reisen går med dampskip, først til England og så over Atlanterhavet.", "Hun kan nesten ikke engelsk.", "Kanskje ser hun aldri familien igjen."], foler: "Hva gleder hun seg til? Hva gruer hun seg til?" },
      { ikon: "👵", navn: "Mor Kari", hvem: "Annes mor, blir igjen på husmannsplassen", situasjon: "Kari har allerede to sønner i Amerika. Hun og mannen er husmenn og eier ikke jorda de bor på.", vet: ["Pengene som barna sender hjem, gjør livet litt lettere.", "Det kan gå måneder mellom hvert brev.", "Hun blir eldre og trenger hjelp på plassen."], foler: "Hvorfor sier hun ikke nei? Hva vil hun ikke si høyt?" },
      { ikon: "🧑‍🌾", navn: "Ola, 22 år", hvem: "husmannssønn og Annes kjæreste", situasjon: "Ola vil også reise, men han har ikke penger til billett. Han må vente til noen sender ham en «prepaid ticket» fra Amerika.", vet: ["Mange reiser fordi andre i familien har reist før dem.", "Han har lest at det er mye jord å få i Dakota.", "Presten og noen i bygda mener utvandringen er et svik mot landet."], foler: "Hva tenker han om at Anne reiser først?" },
      { ikon: "🎟️", navn: "Agenten", hvem: "selger billetter for et dampskipsselskap", situasjon: "Agenten får betalt for hver billett han selger. Han reiser rundt i bygdene med plakater og brosjyrer om Amerika.", vet: ["Jo flere som reiser, jo mer tjener han.", "Plakatene viser store gårder og fornøyde folk – ikke vanskelighetene.", "Konkurransen mellom selskapene gjør billettene billigere."], foler: "Er han ærlig om hva som venter? Bryr han seg om folkene?" }
    ],
    starter: ["Kjære …", "Jeg skriver til deg fordi …", "Du må forstå at …", "Jeg tenker ofte på …", "Hilsen …"],
    sporsmal: ["Hvordan påvirker situasjonen til personen hva hen mener om utvandringen?", "Hvilke push- og pull-faktorer ser du i rollekortene?", "Hvem tror du skrev flest brev som er bevart i dag? Hva betyr det for hva vi vet om utvandringen?"]
  },
  {
    id: "folkeavstemningen", ikon: "🗳️", sp: "nb", trinn: 8, tema: "sf8-unionen-1905",
    tittel: "Folkeavstemningen i 1905", tid: "Norge, august 1905",
    bakgrunn: "7. juni 1905 har Stortinget erklært at unionen med Sverige er oppløst. For å vise at folket står bak, holdes det en folkeavstemning 13. august. Bare menn over 25 år kan stemme. Resultatet blir 368 208 ja og 184 nei. Kvinnene, som ikke har stemmerett, samler inn underskrifter for å vise at de også støtter oppløsningen.",
    format: "Skriv et kort innlegg eller en dagbokside fra dagen for folkeavstemningen.",
    roller: [
      { ikon: "👨‍🌾", navn: "Hans, 51 år", hvem: "gårdbruker som skal stemme", situasjon: "Hans har lest om striden om konsulatvesenet i avisen i mange år. Nå går han flere timer for å komme til stemmelokalet.", vet: ["Mange mener Norge bør ha egne konsuler og en egen utenrikspolitikk.", "Noen frykter at det kan bli krig med Sverige.", "Stemmeseddelen gjelder om man er enig i at unionen er oppløst."], foler: "Hva betyr det for Hans å få si sin mening?" },
      { ikon: "✍️", navn: "Marie, 30 år", hvem: "lærerinne som samler underskrifter", situasjon: "Marie kan ikke stemme fordi hun er kvinne. Sammen med andre kvinner går hun fra dør til dør med lister.", vet: ["Kvinnesaksforeningene vil vise at kvinner også er en del av folket.", "Mange menn synes det er unødvendig at kvinner blander seg inn.", "Kvinner med egen inntekt har fått stemmerett ved kommunevalg i 1901 – men ikke ved stortingsvalg."], foler: "Er Marie stolt, sint – eller begge deler?" },
      { ikon: "🇸🇪", navn: "Erik, 45 år", hvem: "offiser i Stockholm", situasjon: "Erik leser i svenske aviser om det som skjer i Norge. Noen kaller nordmennene opprørere.", vet: ["Sverige har vært i union med Norge siden 1814.", "Noen svensker vil bruke makt, andre vil la Norge gå i fred.", "Forhandlingene i Karlstad skal avgjøre hvordan unionen avsluttes."], foler: "Føler han seg sviktet? Er han lettet over at det ikke blir krig?" },
      { ikon: "🧒", navn: "Sigrid, 14 år", hvem: "skolejente i Kristiania", situasjon: "Sigrid ser flagg overalt og hører voksne krangle om hvem som skal bli konge, og om Norge skal være republikk.", vet: ["Den danske prinsen Carl blir nevnt som ny konge.", "Faren hennes skal stemme, men moren kan ikke.", "Det er mange møter og taler i byen."], foler: "Hva forstår hun – og hva forstår hun ikke?" }
    ],
    starter: ["I dag skjedde det noe stort …", "Jeg merker at …", "Det er urettferdig at …", "Jeg er redd for …", "Kanskje vil …"],
    sporsmal: ["Hvordan ser 1905 forskjellig ut fra Norge og fra Sverige?", "Hvorfor tror du kvinnene ville samle underskrifter selv om de ikke kunne stemme?", "Hvem sine meninger om 1905 kjenner vi godt – og hvem sine vet vi lite om?"]
  },
  {
    id: "internatet", ikon: "🏫", sp: "nb", trinn: 9, tema: "sf9-fornorskingen",
    tittel: "Første dag på internatet", tid: "Finnmark, tidlig på 1900-tallet",
    bakgrunn: "Mange samiske og kvenske barn i Finnmark bor langt fra nærmeste skole. Staten bygger internatskoler der barna bor i lange perioder. Etter en instruks fra 1898 skal undervisningen foregå på norsk, og samisk og kvensk skal bare brukes som hjelpespråk. Et skoleår begynner.",
    format: "Skriv en dagbokside eller et brev hjem fra den første uka.",
    roller: [
      { ikon: "👧", navn: "Elle, 8 år", hvem: "samisk jente, første gang på internat", situasjon: "Elle snakker bare samisk. Familien driver med rein, og hun har aldri vært borte fra dem før.", vet: ["Hun skjønner nesten ingenting av det læreren sier.", "De andre barna fra bygda snakker samisk i friminuttet når ingen hører.", "Hun skal være på internatet i mange uker."], foler: "Hva savner hun mest? Hvordan prøver hun å klare seg?" },
      { ikon: "🧑‍🏫", navn: "Lærer Nilsen", hvem: "ung lærer fra Sør-Norge", situasjon: "Nilsen har fått sin første lærerjobb. Han har lært at det beste for barna er å bli gode i norsk så fort som mulig.", vet: ["Instruksen sier at undervisningen skal være på norsk.", "Han får bedre lønn hvis han viser gode resultater i norsk.", "Han kan ikke samisk selv."], foler: "Tviler han noen gang på det han gjør?" },
      { ikon: "🦌", navn: "Áilu, 38 år", hvem: "Elles far, reineier", situasjon: "Áilu må følge reinen og kan ikke ha barna med seg hele året. Han vil at Elle skal lære å lese og skrive, men ikke glemme hvem hun er.", vet: ["Uten norsk er det vanskelig å klare seg i møte med myndighetene.", "Fra 1902 kan bare den som snakker, leser og skriver norsk, kjøpe jord i Finnmark.", "Noen barn kommer hjem og skammer seg over språket sitt."], foler: "Hva sier han til Elle før hun drar? Hva sier han ikke?" },
      { ikon: "📜", navn: "Skoledirektøren", hvem: "embetsmann som har ansvar for skolene i landsdelen", situasjon: "Skoledirektøren skriver rapporter til departementet i Kristiania om hvordan fornorskingen går.", vet: ["Staten bruker egne penger på å lære samiske og kvenske barn norsk.", "Mange i Kristiania mener at en «norsk» befolkning i nord er viktig for landets sikkerhet.", "Rapportene måler hvor godt barna kan norsk – ikke hvordan de har det."], foler: "Hva står i rapportene hans – og hva står ikke der?" }
    ],
    starter: ["Kjære …", "Her er det …", "Jeg forstår ikke …", "Jeg prøver å …", "Det jeg ikke kan si til noen, er …"],
    sporsmal: ["Hvordan ser den samme skoledagen ut for Elle og for læreren?", "Hvem bestemte, og hvem ble bestemt over?", "Sannhets- og forsoningskommisjonen samlet fortellinger fra mange som gikk på slike skoler. Hvorfor er det viktig å høre deres stemmer?"]
  },
  {
    id: "muren", ikon: "🧱", sp: "nb", trinn: 10, tema: "sf10-kalde-krigen",
    tittel: "Natten muren åpnet seg", tid: "Berlin, 9. november 1989",
    bakgrunn: "I 28 år har Berlinmuren delt byen i øst og vest. Høsten 1989 demonstrerer tusenvis av østtyskere for frihet, og mange flykter via andre land. Om kvelden 9. november sier en talsmann for regjeringen på en pressekonferanse at østtyskere kan reise fritt – «med en gang». Folk strømmer til grenseovergangene.",
    format: "Skriv en dagbokside fra natten eller morgenen etter.",
    roller: [
      { ikon: "🧑‍🎤", navn: "Katrin, 17 år", hvem: "skoleelev i Øst-Berlin", situasjon: "Katrin har aldri vært i Vest-Berlin, selv om det bare er noen kilometer unna. Hun har sett vestlig TV i hemmelighet.", vet: ["Hun har venner som har flyktet via Ungarn i sommer.", "Det er farlig å kritisere regjeringen åpent.", "Familien hennes har ventet i årevis på å få kjøpe bil."], foler: "Hva kjenner hun når hun står ved grensen?" },
      { ikon: "💂", navn: "Grensevakten", hvem: "østtysk soldat ved en grenseovergang", situasjon: "Han har ikke fått noen klare ordre. Folkemengden blir større og større.", vet: ["Han har lært at muren beskytter landet mot Vesten.", "Tidligere har vakter skutt folk som prøvde å flykte.", "Hvis han åpner porten, vet han ikke hva som skjer med ham selv."], foler: "Hva skal han velge – og hvorfor?" },
      { ikon: "🧑‍🎓", navn: "Stefan, 23 år", hvem: "student i Vest-Berlin", situasjon: "Stefan hører nyheten på radio og løper til muren. Han har slektninger på den andre siden som han nesten aldri ser.", vet: ["Vest-Berlin er en øy av Vest-Tyskland midt i Øst-Tyskland.", "Mange vesttyskere har vent seg til at muren er der.", "Han er usikker på om det er en felle."], foler: "Hva gjør han når de første østtyskerne kommer gjennom?" },
      { ikon: "📰", navn: "Ingrid, 40 år", hvem: "norsk journalist på reportasjereise", situasjon: "Ingrid skal sende en sak hjem til avisen i Norge før deadline. Telefonlinjene er overbelastet.", vet: ["Hun har dekket den kalde krigen i mange år.", "Norge er med i NATO, og mange nordmenn har vært redde for en krig mellom øst og vest.", "Hun vet ikke om dette er slutten på delingen eller bare en kort åpning."], foler: "Hvordan forklarer hun det hun ser til leserne hjemme?" }
    ],
    starter: ["Jeg trodde aldri at …", "Rundt meg …", "Plutselig …", "Jeg tenker på …", "I morgen …"],
    sporsmal: ["Hvordan opplever personene den samme natten forskjellig?", "Hvilken rolle hadde de som ikke var politikere, for at muren falt?", "Hvem sin historie hører vi oftest når 9. november blir fortalt i dag – og hvem sin hører vi sjelden?"]
  },
  {
    id: "ellis-island", ikon: "🗽", sp: "en", trinn: 10, tema: "en10-american-dream",
    tittel: "Arriving at Ellis Island", tid: "New York, 1907",
    bakgrunn: "In 1907, about a million immigrants came through Ellis Island, the main immigration station in New York. After a long journey across the Atlantic, the passengers wait in a huge hall. Doctors check them quickly, and inspectors ask questions. Most are allowed in after a few hours – but some are sent back.",
    format: "Write a diary entry or a letter home from the end of the day.",
    roller: [
      { ikon: "👧", navn: "Ingrid, 16", hvem: "immigrant from Norway, travelling alone", situasjon: "Ingrid's older brother lives in Minnesota and has sent her a ticket. She has a piece of paper with his address, and she knows only a few words of English.", vet: ["She must answer questions about money, work and where she is going.", "People say that the doctors mark you with chalk if they think you are ill.", "If she is sent back, the family has lost all the money for the ticket."], foler: "What is she most afraid of? What does she hope for?" },
      { ikon: "🩺", navn: "Dr. Morgan", hvem: "doctor at the station", situasjon: "Dr. Morgan watches the immigrants as they climb the stairs. He has only a few seconds to look at each person.", vet: ["Immigrants with certain illnesses can be refused entry.", "He marks people with a chalk letter if they need a closer check.", "Thousands of people pass by him every day."], foler: "Does he see people – or only patients? How does he feel at the end of the day?" },
      { ikon: "📝", navn: "Mr. Kelly", hvem: "inspector, son of Irish immigrants", situasjon: "Mr. Kelly asks each immigrant the same questions through an interpreter. His own parents came to America fifty years ago.", vet: ["The law says that people who might not be able to support themselves can be sent back.", "Some immigrants are scared and give wrong answers.", "Many politicians want fewer immigrants."], foler: "Does his own family history affect how he does his job?" },
      { ikon: "📷", navn: "Ruth, 28", hvem: "newspaper reporter", situasjon: "Ruth is writing a story about the new Americans. Her editor wants exciting pictures and dramatic stories.", vet: ["Some readers are worried that immigrants take their jobs.", "Others believe immigrants build the country.", "The immigrants rarely get to tell their own stories in the newspapers."], foler: "Whose story will she choose to tell – and why?" }
    ],
    starter: ["Dear …", "Today I …", "I will never forget …", "I was afraid that …", "Tomorrow …"],
    sporsmal: ["How does the same day look different for an immigrant and for the people who work there?", "Who has power in this situation, and who has none?", "Today we have many photos and official papers from Ellis Island, but fewer letters and diaries from the immigrants. What does that mean for the story we tell?"]
  }
];
