/* =========================================================
   Les verden – Menneskerettighetsdomstolen (domstol.html)
   Oppdiktede saker der en innbygger klager på den oppdiktede staten
   Velland. Artiklene er gjengitt forenklet fra Den europeiske
   menneskerettskonvensjonen (EMK). Hver sak har en ekte, lignende sak
   fra Den europeiske menneskerettsdomstolen (EMD) til sammenligning.
   test: "begrens" (rettigheter som kan begrenses), "absolutt", "tid", "diskr"
   ========================================================= */
window.LV = window.LV || {};
LV.domstol = {
  stat: "Velland",
  om: [
    "Den europeiske menneskerettskonvensjonen (EMK) ble skrevet etter andre verdenskrig. Landene i Europarådet lovet hverandre at det aldri skulle skje igjen at en stat fratok innbyggerne sine grunnleggende rettigheter.",
    "Hvis du mener at staten har krenket rettighetene dine, og du har prøvd saken i domstolene hjemme, kan du klage til Den europeiske menneskerettsdomstolen (EMD) i Strasbourg i Frankrike. Domstolen har én dommer fra hvert medlemsland.",
    "Norge har vært med fra starten. Gjennom menneskerettsloven gjelder EMK som norsk lov, og den går foran andre lover hvis de kommer i konflikt.",
    "Mange rettigheter kan begrenses – men bare hvis begrensningen står i loven, har et godt formål og er nødvendig i et demokratisk samfunn. Noen rettigheter, som forbudet mot tortur, kan aldri begrenses."
  ],
  gang: [
    ["Forberedelse", "Klagerens advokater og statens advokater leser saken og skriver innlegget sitt. Dommerne leser saken og artikkelen og forbereder spørsmål.", "10 min"],
    ["Klagerens innlegg", "Klagerens advokater forklarer hvorfor rettigheten er krenket.", "3 min"],
    ["Statens innlegg", "Statens advokater forklarer hvorfor staten hadde rett til å gjøre det den gjorde.", "3 min"],
    ["Spørsmål fra dommerne", "Dommerne stiller spørsmål til begge sider.", "5 min"],
    ["Siste ord", "Hver side får ett minutt til å svare på det den andre siden sa.", "2 min"],
    ["Rådslagning", "Dommerne går gjennom dommertesten steg for steg og stemmer. De andre elevene gjør det samme i grupper.", "10 min"],
    ["Dommen", "Domstolens president leser opp dommen og begrunnelsen. Er noen uenige, kan de skrive en dissens.", "3 min"],
    ["Den ekte saken", "Sammenlign med en lignende sak fra EMD. Hva var likt, og hva var annerledes?", "5 min"]
  ],
  roller: [
    { id: "klager", ikon: "🙋", navn: "Klagerens advokater (2)", oppgave: ["Forklar hva som skjedde, sett fra klagerens side.", "Vis hvilken rettighet som er krenket, og bruk ordene i artikkelen.", "Forklar hvorfor statens grunner ikke er gode nok, eller hvorfor tiltaket var for strengt."] },
    { id: "staten", ikon: "🏛️", navn: "Statens advokater (2)", oppgave: ["Forklar hvorfor staten gjorde det den gjorde.", "Vis at tiltaket står i loven og har et godt formål.", "Forklar hvorfor et mildere tiltak ikke ville vært nok."] },
    { id: "dommer", ikon: "⚖️", navn: "Dommere (5 eller 7)", oppgave: ["Lytt til begge sider og still spørsmål.", "Gå gjennom dommertesten steg for steg.", "Stem. Flertallet bestemmer. Én av dere er president og leser opp dommen."] },
    { id: "journalist", ikon: "📰", navn: "Journalist", oppgave: ["Ta notater underveis.", "Skriv en kort nyhetssak om dommen: Hva handlet saken om, hva ble resultatet, og hva betyr det for andre?"] }
  ],
  tester: {
    begrens: { navn: "Rettigheter som kan begrenses", steg: [
      ["Er det et inngrep?", "Har staten gjort noe som begrenser rettigheten i artikkelen?"],
      ["Står det i loven?", "Hadde staten en klar lov å bygge på, som innbyggerne kunne kjenne til?"],
      ["Er formålet godt?", "Hadde staten et formål som artikkelen godtar – for eksempel å beskytte andres rettigheter, sikkerhet eller helse?"],
      ["Er det nødvendig og forholdsmessig?", "Var inngrepet nødvendig i et demokratisk samfunn? Står det i rimelig forhold til formålet, eller finnes det et mildere tiltak?"]] },
    absolutt: { navn: "Rettigheter som aldri kan begrenses", steg: [
      ["Hva skjedde?", "Beskriv behandlingen nøyaktig: Hvor lenge varte den, og hvordan påvirket den klageren?"],
      ["Er grensen nådd?", "Er behandlingen så alvorlig at den er umenneskelig eller nedverdigende? Se på varighet, følger for kropp og psyke, og klagerens situasjon."],
      ["Har staten en unnskyldning?", "Husk: Denne rettigheten kan ikke begrenses. Mangel på penger eller plass er ingen unnskyldning. Men er behandlingen alvorlig nok?"]] },
    tid: { navn: "Rettssak innen rimelig tid", steg: [
      ["Hvor lang tid tok det?", "Regn ut hvor lenge saken varte, fra den startet til den endelige dommen."],
      ["Hvor vanskelig var saken?", "Var saken spesielt vanskelig, med mange parter, bevis eller juridiske spørsmål?"],
      ["Hvem skyldtes forsinkelsene?", "Forsinket klageren selv saken, eller var det domstolene og myndighetene?"],
      ["Hva sto på spill?", "Hvor viktig var saken for klageren? Noen saker – om barn, helse eller frihet – må gå ekstra raskt."]] },
    diskr: { navn: "Forbud mot diskriminering", steg: [
      ["Er det forskjellsbehandling?", "Blir en gruppe behandlet dårligere enn andre i en lignende situasjon – også hvis det ikke var meningen?"],
      ["Er det en saklig grunn?", "Har staten en objektiv og rimelig grunn til forskjellsbehandlingen?"],
      ["Er det forholdsmessig?", "Står forskjellsbehandlingen i rimelig forhold til formålet? Kunne staten nådd målet på en måte som ikke rammer gruppa?"]] }
  },
  saker: [
    {
      id: "bloggen", ikon: "✍️", tittel: "Bloggen om ordføreren", tema: "sf10-demokrati-diktatur", test: "begrens",
      artikkel: { nr: "Artikkel 10", navn: "Ytringsfrihet", tekst: "Alle har rett til ytringsfrihet. Det omfatter retten til å ha meninger og å motta og formidle opplysninger og ideer uten inngrep fra myndighetene.", unntak: "Ytringsfriheten kan begrenses hvis det står i loven og er nødvendig i et demokratisk samfunn, for eksempel for å beskytte andres omdømme og rettigheter." },
      kort: "En 17-åring får bot for å ha kalt ordføreren «byens største sløser».",
      fakta: [
        "Selma Vik (17) bor i byen Nordhavn i Velland. Hun skriver en blogg om lokalpolitikk som rundt 2000 mennesker leser.",
        "Kommunen har brukt 40 millioner kroner på et nytt rådhus med marmorgulv, samtidig som to skoler har fått beskjed om at de må spare. Selma skriver et innlegg med tittelen «Byens største sløser». Der kaller hun ordføreren «uansvarlig» og «arrogant», og skriver at han «bryr seg mer om marmor enn om elever».",
        "Ordføreren går til sak for ærekrenkelse. Domstolene i Velland dømmer Selma til å betale 20 000 kroner i bot og erstatning, og innlegget må slettes. Retten mener at ordene var unødvendig krenkende."
      ],
      klager: ["Saken handler om hvordan politikere bruker innbyggernes penger. Det er akkurat det et demokrati må kunne diskutere.", "Ordene var skarpe, men de var meninger – ikke falske påstander om fakta. Det var riktig at rådhuset kostet 40 millioner.", "Politikere må tåle mer kritikk enn vanlige folk. En stor bot til en 17-åring gjør at andre unge blir redde for å si fra."],
      staten: ["Loven om ærekrenkelse er klar, og Selma kunne vite at hun kunne bli straffet.", "Også politikere har rett til å bli beskyttet mot personangrep. «Arrogant» og «uansvarlig» er angrep på ordføreren som person.", "Selma kunne kritisert pengebruken uten å bruke krenkende ord. Boten er ikke høyere enn for voksne."],
      ekte: { navn: "Lingens mot Østerrike", aar: 1986, utfall: "Krenkelse", tekst: "En journalist skrev at Østerrikes forbundskansler var «umoralsk» og «uverdig», og ble dømt for ærekrenkelse. EMD kom til at dommen krenket ytringsfriheten. Domstolen sa at politikere må tåle mye mer kritikk enn privatpersoner, og at man må skille mellom fakta, som kan bevises, og meninger, som ikke kan bevises." }
    },
    {
      id: "veisperringen", ikon: "🪧", tittel: "Veisperringen", tema: "sf8-demokratiet-i-norge", test: "begrens",
      artikkel: { nr: "Artikkel 11", navn: "Forsamlingsfrihet og foreningsfrihet", tekst: "Alle har rett til å delta i fredelige demonstrasjoner og møter, og til å slutte seg sammen med andre, for eksempel i fagforeninger.", unntak: "Retten kan begrenses hvis det står i loven og er nødvendig i et demokratisk samfunn, for eksempel for å hindre uorden eller beskytte andres rettigheter og friheter." },
      kort: "Klimaaktivister blokkerer hovedveien inn til byen i tre timer og får bot.",
      fakta: [
        "En gruppe på 60 ungdommer i Velland vil protestere mot at regjeringen har gitt tillatelse til en ny kullgruve. De har demonstrert lovlig foran parlamentet flere ganger uten at noen har brydd seg.",
        "En mandag morgen setter de seg ned på hovedveien inn til hovedstaden. De har ikke meldt fra til politiet. Det blir 15 kilometer kø, og en ambulanse må kjøre en lang omvei.",
        "Etter tre timer bærer politiet demonstrantene bort. Ingen blir skadet. Ti av dem, blant dem Jonas Lind (19), får 8 000 kroner i bot for å ha hindret trafikken."
      ],
      klager: ["Demonstrasjonen var fredelig. Ingen brukte vold, og alle lot seg bære bort uten å gjøre motstand.", "Lovlige demonstrasjoner ble ignorert. Noen ganger må en protest forstyrre for å bli hørt.", "Klimaendringene er en trussel mot vår generasjon. Staten bør tåle litt forstyrrelse når det gjelder noe så viktig."],
      staten: ["Staten forbød ikke protesten. Aktivistene kunne demonstrere foran parlamentet, slik de hadde gjort før.", "Å sperre en hovedvei rammer tusenvis av mennesker – også ambulanser. Det er å beskytte andres rettigheter.", "Boten var liten, og ingen ble satt i fengsel. Det er et mildt tiltak."],
      ekte: { navn: "Kudrevičius og andre mot Litauen", aar: 2015, utfall: "Ikke krenkelse", tekst: "Bønder i Litauen protesterte mot lave priser ved å sperre tre hovedveier i flere dager. Lederne fikk betinget fengsel. EMD kom til at forsamlingsfriheten ikke var krenket: Bøndene kunne ha demonstrert uten å sperre veiene, de forstyrret mye mer enn vanlig ved en demonstrasjon, og straffen var mild. Domstolen understreket likevel at fredelige demonstrasjoner har sterkt vern, selv når de forstyrrer." }
    },
    {
      id: "dna", ikon: "🧬", tittel: "DNA-registeret", tema: "sf8-rettsstaten", test: "begrens",
      artikkel: { nr: "Artikkel 8", navn: "Retten til respekt for privatliv og familieliv", tekst: "Alle har rett til respekt for sitt privatliv og familieliv, sitt hjem og sin korrespondanse.", unntak: "Retten kan begrenses hvis det står i loven og er nødvendig i et demokratisk samfunn, for eksempel for å forebygge kriminalitet eller beskytte andres rettigheter." },
      kort: "Politiet nekter å slette DNA-et til en 15-åring som ble frikjent.",
      fakta: [
        "Amir Haddad (15) blir pågrepet etter et innbrudd i en kiosk, fordi han lignet på en gutt i et overvåkingsbilde. Politiet tar DNA-prøve og fingeravtrykk.",
        "To måneder senere blir Amir frikjent. Den virkelige gjerningsmannen blir tatt. Amir ber politiet slette DNA-et og fingeravtrykkene hans.",
        "Politiet sier nei. Ifølge en lov i Velland skal DNA fra alle som er pågrepet, lagres for alltid, også om de blir frikjent. Domstolene i Velland gir politiet rett."
      ],
      klager: ["Amir er uskyldig, men blir behandlet som en mistenkt for resten av livet.", "DNA sier svært mye om et menneske – også om familien. Det er noe av det mest private vi har.", "Loven gjelder alle, uansett alder og hvor alvorlig saken var. Den er alt for vid."],
      staten: ["Loven er klar og vedtatt av parlamentet.", "Registeret har hjulpet politiet å oppklare mange alvorlige forbrytelser, også drap og voldtekter.", "Uskyldige har ingenting å frykte. DNA-et brukes bare til å sammenligne med spor fra forbrytelser."],
      ekte: { navn: "S. og Marper mot Storbritannia", aar: 2008, utfall: "Krenkelse", tekst: "To menn fra England – den ene var 11 år da han ble pågrepet – ble frikjent eller fikk saken henlagt, men politiet nektet å slette DNA og fingeravtrykk. EMD kom til at retten til privatliv var krenket. Domstolen la vekt på at lagringen gjaldt alle, uansett alder og hvor alvorlig saken var, og at den ikke hadde noen tidsgrense." }
    },
    {
      id: "cella", ikon: "🔒", tittel: "Cella", tema: "sf9-kriminalitet-straff", test: "absolutt",
      artikkel: { nr: "Artikkel 3", navn: "Forbud mot tortur", tekst: "Ingen må bli utsatt for tortur eller for umenneskelig eller nedverdigende behandling eller straff.", unntak: "Denne rettigheten kan aldri begrenses – heller ikke i krig eller når staten mangler penger." },
      kort: "En fange deler en celle på 9 kvadratmeter med tre andre i åtte måneder.",
      fakta: [
        "Fengslene i Velland er overfylte. Erik Moen (34) soner en dom på to år for økonomisk kriminalitet.",
        "I åtte måneder deler han en celle på 9 kvadratmeter med tre andre fanger. Det blir litt over 2 kvadratmeter per person. Toalettet står i hjørnet, uten vegg rundt. Fangene får gå ut én time om dagen.",
        "Erik klager. Fengselet svarer at alle fengsler i landet er fulle, og at staten ikke har penger til å bygge nye før om fem år."
      ],
      klager: ["Å bo så trangt i så lang tid, uten privatliv på toalettet, er nedverdigende.", "Erik har fått problemer med søvnen og angst.", "At staten mangler penger, er ingen unnskyldning. Denne rettigheten kan ikke begrenses."],
      staten: ["Erik er dømt for en forbrytelse. Fengsel skal ikke være behagelig.", "Han ble ikke slått eller truet, og han fikk mat, helsehjelp og lufting hver dag.", "Staten jobber med å bygge nye fengsler, men det tar tid."],
      ekte: { navn: "Muršić mot Kroatia", aar: 2016, utfall: "Delvis krenkelse", tekst: "EMD slo fast at hvis en fange har mindre enn 3 kvadratmeter plass i en felles celle, er det en sterk antakelse om at forbudet mot nedverdigende behandling er krenket. Da må staten vise at korte perioder, mye tid utenfor cella og gode forhold ellers veier opp. I saken ble Kroatia dømt for en periode på 27 dager under grensen, men ikke for kortere perioder." }
    },
    {
      id: "klassen", ikon: "🏫", tittel: "Den egne klassen", tema: "sf10-rasisme-diskriminering", test: "diskr",
      artikkel: { nr: "Artikkel 14 sammen med retten til utdanning", navn: "Forbud mot diskriminering", tekst: "Rettighetene i konvensjonen skal sikres uten diskriminering på grunn av kjønn, hudfarge, språk, religion, nasjonal eller etnisk opprinnelse, tilhørighet til en nasjonal minoritet eller andre forhold. Ingen skal nektes retten til utdanning.", unntak: "Forskjellsbehandling er bare lov hvis den har en objektiv og rimelig grunn og står i rimelig forhold til formålet." },
      kort: "Barn fra minoriteten rovani blir plassert i en egen klasse etter en test på et språk de ikke snakker hjemme.",
      fakta: [
        "Rovani-folket er en oppdiktet nasjonal minoritet i Velland. Mange snakker rovansk hjemme og lærer vellandsk først når de begynner på skolen.",
        "Alle seksåringer i Velland tar en test før skolestart – på vellandsk. Barn som får lave resultater, blir plassert i en egen «tilpasset klasse» med enklere læreplan. I byen Sørvik går 70 % av rovani-barna i tilpassede klasser. Blant andre barn er tallet 5 %.",
        "Foreldrene til Mira og Tomas (7) klager. Skolen svarer at plasseringen bygger på testen, ikke på hvem barna er, og at foreldrene har skrevet under på at de godtar plasseringen."
      ],
      klager: ["Testen er på et språk barna ikke snakker hjemme. Den måler språk, ikke evner.", "Selv om ingen mente å diskriminere, blir rovani-barna rammet mye hardere. Det er diskriminering i praksis.", "De tilpassede klassene gir dårligere utdanning og gjør det vanskeligere å få jobb senere. Foreldrene fikk ikke god nok informasjon da de skrev under."],
      staten: ["Testen er den samme for alle barn. Ingen blir plassert på grunn av hvem de er.", "De tilpassede klassene skal hjelpe barn som strever, med færre elever og mer hjelp.", "Foreldrene skrev under og godtok plasseringen."],
      ekte: { navn: "D.H. og andre mot Tsjekkia", aar: 2007, utfall: "Krenkelse", tekst: "Rombarn i Tsjekkia ble mange ganger oftere enn andre barn plassert i spesialskoler for barn med lærevansker, etter tester som ikke tok hensyn til språk og kultur. EMD kom til at dette var diskriminering, selv om loven var lik for alle. Domstolen sa at foreldrenes samtykke ikke var nok, fordi man ikke kan gi fra seg retten til ikke å bli diskriminert." }
    },
    {
      id: "ventetiden", ikon: "⏳", tittel: "Ventetiden", tema: "sf8-rettsstaten", test: "tid",
      artikkel: { nr: "Artikkel 6", navn: "Retten til en rettferdig rettergang", tekst: "Alle har rett til en rettferdig og offentlig rettergang innen rimelig tid, for en uavhengig og upartisk domstol.", unntak: "Hva som er «rimelig tid», avhenger av hvor vanskelig saken er, hvordan partene har oppført seg, og hva som står på spill." },
      kort: "En familie venter i elleve år på at domstolene skal avgjøre en sak om erstatning.",
      fakta: [
        "I 2013 blir huset til familien Berg ødelagt av et ras etter at kommunen har sprengt for en ny vei. Familien krever erstatning fra kommunen.",
        "Saken går gjennom tre rettsinstanser. Ofte går det over ett år mellom hvert rettsmøte. To ganger blir saken utsatt fordi dommeren blir flyttet til en annen domstol. Familien ber selv om én utsettelse på tre måneder.",
        "I 2024 – elleve år senere – får familien endelig erstatning. I mellomtiden har de bodd i en leid leilighet og betalt både husleie og lån på det ødelagte huset."
      ],
      klager: ["Elleve år er alt for lenge, uansett hva saken gjaldt.", "Mesteparten av ventetiden skyldtes domstolene, ikke familien.", "For familien sto mye på spill: hjemmet og økonomien deres."],
      staten: ["Saken var vanskelig. Det trengtes flere eksperter for å finne ut hva som forårsaket raset.", "Domstolene i Velland har mange saker og for få dommere.", "Familien fikk til slutt full erstatning. De har ikke tapt noe på at det tok tid."],
      ekte: { navn: "Mange saker – blant annet mot Italia", aar: 1999, utfall: "Krenkelse i svært mange saker", tekst: "Lang saksbehandlingstid er en av de vanligste grunnene til at stater blir dømt i EMD. Italia har fått flere hundre dommer om dette. I Bottazzi mot Italia (1999) slo domstolen fast at gjentatte brudd på kravet om rimelig tid i ett land er et alvorlig problem i seg selv. Mangel på dommere eller penger er ingen unnskyldning: Staten har plikt til å organisere domstolene slik at sakene går raskt nok." }
    }
  ],
  kontroller: "Artiklene er forenklet. Kontroller de ekte sakene før bruk: Lingens mot Østerrike (8. juli 1986), Kudrevičius og andre mot Litauen (storkammer, 15. oktober 2015), S. og Marper mot Storbritannia (storkammer, 4. desember 2008), Muršić mot Kroatia (storkammer, 20. oktober 2016), D.H. og andre mot Tsjekkia (storkammer, 13. november 2007) og Bottazzi mot Italia (storkammer, 28. juli 1999). Antall dommer mot Italia om saksbehandlingstid er omtrentlig."
};
