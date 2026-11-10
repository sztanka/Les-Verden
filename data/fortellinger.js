/* =========================================================
   Les verden – Velg din vei (fortelling.html)
   Historiske fortellinger med valg. Personene er oppdiktet,
   men hendelsene, stedene og kildeboksene bygger på ekte historie.
   noder: { id: { tekst: [...], kilde?: {tittel, tekst}, valg: [{t, til}] } }
   En node uten valg er en slutt (slutt: kort tittel på slutten).
   [[ord]] gir ordforklaring fra «ord». **fet**.
   ========================================================= */
window.LV = window.LV || {};
LV.fortellinger = [
  {
    id: "utvandrer-1882", tittel: "Utvandreren", undertittel: "Valdres – Amerika, 1882", ikon: "🚢", farger: ["#1f3b57", "#e3c27a"],
    tema: "sf9-utvandringen", trinn: 9,
    kort: "Du er Kari, 17 år og husmannsdatter i Valdres. Det er ikke nok jord, ikke nok arbeid – og et brev fra Amerika har kommet. Skal du reise?",
    rolle: "Du er **Kari Olsdatter**, 17 år. Familien din er [[husmenn]] under en stor gård i Valdres. Du har fem søsken, og den eldste broren din skal overta plassen etter faren. Det er vår i 1882.",
    rolleLett: "Du er **Kari**, 17 år. Familien din er fattige husmenn i Valdres. Du har fem søsken. Det er våren 1882.",
    start: "brev",
    ord: {
      "husmenn": "Folk som leide et lite jordstykke (en plass) av en bonde, og som betalte med arbeid på gården.",
      "amerikabrev": "Brev fra utvandrere i Amerika til familien i Norge.",
      "billett": "Her: en forhåndsbetalt reisebillett som slektninger i Amerika kunne kjøpe og sende hjem.",
      "emigrantagent": "En person som solgte billetter for rederiene og overtalte folk til å reise.",
      "Castle Garden": "Innvandrerstasjonen i New York før Ellis Island åpnet i 1892.",
      "Homestead Act": "En amerikansk lov fra 1862 som ga innvandrere gratis jord hvis de bodde på den og dyrket den i fem år.",
      "prærie": "Store, flate gressletter uten skog i Midtvesten.",
      "torvhus": "Et hus bygd av gresstorv, fordi det ikke fantes tømmer på prærien.",
      "tjenestejente": "En ung kvinne som arbeidet i huset hos en annen familie mot kost, losji og litt lønn."
    },
    noder: {
      brev: {
        tekst: [
          "En søndag etter kirken kommer presten med et brev. Det er fra tante Guri, som reiste til Minnesota for ti år siden. Hele familien samles rundt bordet mens mor leser høyt.",
          "«Her er jord nok for alle», skriver Guri. «Vi har 160 acres, to kyr og hvetebrød hver søndag. Kari er stor nå. Send henne til oss – vi trenger hjelp, og hun vil få det godt.» I konvolutten ligger en [[billett]] fra Kristiania til New York.",
          "Far ser lenge ut av vinduet. Mor gråter stille. Alle ser på deg."
        ],
        lett: [
          "Tante Guri bor i Amerika. Hun sender et brev.",
          "«Her er nok jord for alle», skriver hun. «Send Kari til oss.» I brevet ligger en billett til Amerika.",
          "Alle ser på deg. Skal du reise?"
        ],
        kilde: { tittel: "Fakta: amerikabrevene", tekst: "Tusenvis av [[amerikabrev]] ble sendt hjem til Norge. De ble lest høyt og sendt rundt i bygda. Mange inneholdt forhåndsbetalte billetter. Historikere regner med at en stor del av utvandrerne reiste på billett fra slekt i Amerika. Brevene kunne være pyntet – få skrev hjem om det som gikk dårlig." },
        valg: [
          { t: "«Jeg reiser.»", til: "avskjed" },
          { t: "«Jeg vil være her hjemme hos dere.»", til: "bli" }
        ]
      },
      bli: {
        tekst: [
          "Du blir. Om sommeren går du som budeie på setra, og om vinteren spinner du ull for andre. Lønna er liten, og plassen er trang.",
          "Året etter blir broren din syk, og det blir enda mindre mat. En kveld kommer en [[emigrantagent]] til bygda med plakater av store skip og gylne hveteåkre. Billetten fra tante Guri ligger fortsatt i skuffen."
        ],
        lett: [
          "Du blir hjemme. Du jobber hardt, men lønna er liten.",
          "Året etter blir broren din syk. Det blir enda mindre mat. Billetten ligger fortsatt i skuffen."
        ],
        valg: [
          { t: "Bruke billetten likevel – nå er det verre her enn før.", til: "avskjed" },
          { t: "Bli i Norge og søke arbeid som tjenestejente i Kristiania.", til: "kristiania" }
        ]
      },
      kristiania: {
        slutt: "Ny start i byen",
        tekst: [
          "Du får jobb som [[tjenestejente]] hos en kjøpmannsfamilie i Kristiania. Du jobber fra fem om morgenen til sent på kvelden, og du har fri én ettermiddag i uka. Byen vokser raskt, og mange av dem du møter, kommer fra bygdene som deg.",
          "Mange av vennene dine fra Valdres reiser til Amerika de neste årene. Du blir. Senere gifter du deg med en fabrikkarbeider og ser arbeiderbevegelsen vokse fram i byen.",
          "**Visste du?** Ikke alle som forlot bygdene, dro til Amerika. Mange flyttet til byene i Norge, der industrien trengte arbeidskraft."
        ],
        lett: [
          "Du blir tjenestejente i Kristiania. Du jobber fra tidlig morgen til sen kveld.",
          "Mange venner reiser til Amerika. Du blir i Norge og gifter deg med en fabrikkarbeider.",
          "**Visste du?** Mange flyttet fra bygdene til byene i Norge, ikke bare til Amerika."
        ]
      },
      avskjed: {
        tekst: [
          "Det blir en tung morgen. Mor har sydd en ny kjole og pakket en kiste med klær, en salmebok og flatbrød. Far bærer kisten ned til veien. «Skriv», er det eneste han sier.",
          "Med hest og skyss, og senere tog, kommer du til Kristiania. Havna er full av folk med kister og bylter – mange av dem skal samme vei som deg. Skipet går ikke direkte til Amerika: Først skal dere over Nordsjøen til Hull i England, så med tog til Liverpool, og derfra over Atlanteren."
        ],
        lett: [
          "Det er tungt å si ha det. Mor har pakket en kiste til deg. «Skriv», sier far.",
          "Du reiser til Kristiania. Derfra går skipet til England, og så over havet til Amerika."
        ],
        kilde: { tittel: "Fakta: reiseruta", tekst: "På 1880-tallet reiste de fleste norske utvandrerne med dampskip via England. Fra Hull tok de toget til Liverpool, der de gikk om bord i store dampskip til New York. Hele reisen tok omtrent to–tre uker. Tidligere, med seilskip, kunne den ta to–tre måneder." },
        valg: [
          { t: "Holde deg for deg selv og passe godt på kisten og pengene.", til: "skip-alene" },
          { t: "Bli kjent med en familie fra Hallingdal som skal samme vei.", til: "skip-venner" }
        ]
      },
      "skip-alene": {
        tekst: [
          "På mellomdekket i Liverpool-skipet ligger hundrevis av mennesker tett i tett. Det lukter av svette, oppkast og tjære. Du sover med pengepungen under hodeputa.",
          "Den tredje natta våkner du av at noen roter i kisten din. En mann løper av gårde i mørket. Salmeboka og kjolen ligger igjen – men det lille sølvsmykket fra mor er borte. Du sitter alene og gråter."
        ],
        lett: [
          "På skipet er det trangt og skittent. Du passer godt på pengene dine.",
          "En natt stjeler noen smykket fra mor. Du er alene og gråter."
        ],
        valg: [
          { t: "Gå til styrmannen og klage.", til: "ankomst" },
          { t: "Si ingenting og holde deg enda mer for deg selv.", til: "ankomst" }
        ]
      },
      "skip-venner": {
        tekst: [
          "Familien Haugen har fire barn, og den minste, Ola, blir syk av sjøen. Du hjelper mora med å stelle ham, og hun deler matpakka si med deg. Om kveldene synger dere salmer på mellomdekket sammen med svensker og irer.",
          "Det er trangt og skittent, og noen ombord får feber. Men du er ikke alene. «Kom og besøk oss i Dakota», sier fru Haugen. «Det er alltid plass til en til.»"
        ],
        lett: [
          "Du blir kjent med familien Haugen. Du hjelper dem med den minste gutten, som er sjøsyk.",
          "Det er trangt og skittent, men du er ikke alene. «Kom og besøk oss i Dakota», sier fru Haugen."
        ],
        valg: [
          { t: "Fortsette mot New York.", til: "ankomst" }
        ]
      },
      ankomst: {
        tekst: [
          "Etter ti dager på havet ser du land. Skipet glir inn i havna i New York, forbi skog av master og skorsteiner. Dere blir ført til [[Castle Garden]], et stort, rundt byggverk ved vannet. Her blir alle registrert. En lege ser deg i øynene og lytter på pusten din. En tolk spør hvor du skal. «Minnesota», sier du – det eneste engelske ordet du er sikker på.",
          "Rundt deg selger folk billetter, mat og losji. Noen roper på norsk at de kan hjelpe deg, for en pris."
        ],
        lett: [
          "Etter ti dager kommer dere til New York. Alle blir sjekket av en lege og registrert.",
          "Mange vil selge deg billetter og mat. Noen snakker norsk og vil «hjelpe» – for en pris."
        ],
        kilde: { tittel: "Fakta: Castle Garden", tekst: "Fra 1855 til 1890 kom de fleste innvandrerne til New York gjennom Castle Garden på sørspissen av Manhattan. Der ble de registrert og sjekket av leger, og de kunne veksle penger og kjøpe togbilletter. Ellis Island tok over i 1892. Utenfor ventet ofte svindlere som lurte nykommere." },
        valg: [
          { t: "Følge en hyggelig nordmann som tilbyr seg å hjelpe deg med togbillett.", til: "lurt" },
          { t: "Kjøpe billett i den offisielle luka inne i Castle Garden.", til: "tog" }
        ]
      },
      lurt: {
        tekst: [
          "Mannen snakker gammeldags bergensk og ler mye. Han tar deg med til et kontor i en sidegate, der du betaler nesten alle pengene dine for en «gjennomgående billett». Billetten viser seg å gjelde bare til Chicago.",
          "I Chicago står du på perrongen med nesten tomme lommer. En prest fra den norske kirken i byen ser deg og forstår hva som har skjedd. Han samler inn penger blant menigheten, så du kan reise videre."
        ],
        lett: [
          "En nordmann lurer deg. Du betaler nesten alle pengene for en billett som bare går til Chicago.",
          "I Chicago hjelper en norsk prest deg. Menigheten samler inn penger, så du kan reise videre."
        ],
        kilde: { tittel: "Fakta: svindel mot innvandrere", tekst: "Innvandrere som ikke kunne språket, var lette ofre. Norskspråklige «hjelpere» solgte falske eller altfor dyre billetter. Norske kirker, foreninger og aviser i Amerika advarte nykommere – og hjalp dem som var blitt lurt." },
        valg: [ { t: "Reise videre til Minnesota.", til: "tog" } ]
      },
      tog: {
        tekst: [
          "Toget går dag og natt vestover, gjennom byer, skog og endeløse sletter. Til slutt står du på en liten stasjon i Minnesota. Tante Guri står der med hest og vogn. Hun er tynnere og eldre enn du husket, og hendene er harde.",
          "Huset er ikke så stort som i brevene. Det er av tømmer, med ett rom og et loft. Men åkrene er store, og det er mat på bordet. Guri trenger hjelp på gården, men hun sier også: «Inne i byen leter de etter jenter som kan arbeide i husene. Der får du penger i hånda.»"
        ],
        lett: [
          "Toget går vestover i mange dager. Tante Guri henter deg på stasjonen.",
          "Huset er mindre enn i brevet. Men det er mat på bordet. Du kan bli på gården, ta jobb i byen eller reise lenger vest."
        ],
        valg: [
          { t: "Bli på gården hos Guri.", til: "gard" },
          { t: "Ta jobb i byen Minneapolis.", til: "by" },
          { t: "Reise videre vestover og ta jord selv.", til: "vest" }
        ]
      },
      gard: {
        tekst: [
          "Du melker kyrne, baker, vasker og hjelper til i innhøstingen. Om søndagene går dere til den norske kirken, der presten preker på norsk og alle synger de samme salmene som hjemme. Det er nesten som å være i Valdres – bare med flatere land og mer jord.",
          "Om vinteren går du på engelskskole i noen uker. Etter noen år gifter du deg med en nabogutt fra Telemark."
        ],
        lett: [
          "Du jobber på gården hos Guri. På søndager går dere i den norske kirken.",
          "Om vinteren lærer du engelsk. Senere gifter du deg med en nabogutt."
        ],
        valg: [ { t: "Skrive brev hjem.", til: "brev-hjem" } ]
      },
      by: {
        tekst: [
          "I Minneapolis får du jobb som tjenestejente hos en rik familie med svenske røtter. Du lærer engelsk fort, kler deg som en amerikansk jente og tjener mer på en måned enn du gjorde på et år hjemme.",
          "Men du er alene mye. De andre jentene på kjøkkenet er irske og ler av uttalen din. Om kveldene skriver du dagbok på norsk, så du ikke glemmer språket."
        ],
        lett: [
          "Du blir tjenestejente i byen. Du lærer engelsk og tjener godt.",
          "Men du er mye alene. Om kvelden skriver du dagbok på norsk."
        ],
        valg: [ { t: "Skrive brev hjem.", til: "brev-hjem" } ]
      },
      vest: {
        tekst: [
          "Du reiser med familien Haugen – eller med andre nordmenn – til Dakota-territoriet. Etter [[Homestead Act]] kan dere få 160 acres gratis jord hvis dere bor på den og dyrker den i fem år.",
          "Det finnes nesten ikke trær på [[prærie]]n. Det første året bor dere i et [[torvhus]]. Vinteren er så kald at melka fryser inne. Om sommeren kommer gresshopper og tordenvær. Mange gir opp.",
          "En dag ser du en gruppe dakota-indianere ri forbi i det fjerne. Du hører at denne jorda var deres land før. Noen år tidligere ble de tvunget bort."
        ],
        lett: [
          "Du reiser vest til Dakota. Der kan du få gratis jord hvis du dyrker den i fem år.",
          "Det første året bor dere i et hus av torv. Vinteren er veldig kald.",
          "Du ser dakota-indianere ri forbi. Jorda var deres før. De ble tvunget bort."
        ],
        kilde: { tittel: "Kilde: Homestead Act (1862) – fortalt med enklere ord", tekst: "Loven sa at enhver som var familieoverhode eller hadde fylt 21 år, og som var amerikansk borger eller hadde søkt om å bli det, kunne få 160 acres offentlig jord. Hvis man bodde på jorda og dyrket den i fem år, ble den ens egen. Jorda var i stor grad tatt fra urfolk gjennom kriger og tvangsavtaler." },
        valg: [ { t: "Holde ut.", til: "brev-hjem" } ]
      },
      "brev-hjem": {
        slutt: "Et brev til Valdres",
        tekst: [
          "Du setter deg ned med blekk og papir. Hva skal du skrive til mor og far? Skal du fortelle om alt – det tunge og det gode? Eller skal du skrive slik tante Guri gjorde: at alt er bedre her?",
          "Brevet ditt kommer til å bli lest høyt i bygda. Kanskje får det andre til å reise.",
          "**Slik gikk det for mange:** Rundt 800 000 nordmenn utvandret til Amerika fra 1825 til 1930. De fleste reiste aldri tilbake. I dag sier over fire millioner amerikanere at de har norske aner."
        ],
        lett: [
          "Du skal skrive brev hjem. Skal du fortelle alt – også det som er vanskelig?",
          "Brevet blir lest høyt i bygda. Kanskje får det andre til å reise.",
          "**Slik gikk det:** Rundt 800 000 nordmenn reiste til Amerika. De fleste kom aldri tilbake."
        ]
      }
    },
    etterpaa: {
      sporsmal: [
        "Hvilke push- og pull-faktorer fikk Kari til å reise – eller bli?",
        "Hvorfor var amerikabrevene så viktige? Var de alltid til å stole på?",
        "Hvem tapte på at nordmenn fikk jord i Midtvesten?",
        "Sammenlign Karis reise med hvordan folk flytter til Norge i dag. Hva er likt, og hva er forskjellig?"
      ],
      skriv: "Skriv Karis brev hjem til familien i Valdres. Bestem deg: Forteller hun hele sannheten?",
      ekte: [
        [true, "Rundt 800 000 nordmenn utvandret til Amerika fra 1825 til 1930."],
        [true, "Amerikabrev med forhåndsbetalte billetter, reiseruta via Hull og Liverpool og Castle Garden i New York."],
        [true, "Homestead Act fra 1862, og at jorda var tatt fra urfolk."],
        [false, "Kari, tante Guri, familien Haugen og svindleren i New York."]
      ]
    }
  },

  {
    id: "fyrstikk-1889", tittel: "Fyrstikkarbeidersken", undertittel: "Kristiania, 1889", ikon: "🔥", farger: ["#3a2018", "#e89a3c"],
    tema: "sf9-arbeiderbevegelsen", trinn: 9,
    kort: "Du er Hanna, 14 år, og jobber i en fyrstikkfabrikk på østkanten. Lønna blir satt ned. Skal du streike – eller tie for å beholde jobben?",
    rolle: "Du er **Hanna**, 14 år. Du bor med mor og tre småsøsken i ett rom på Grünerløkka i Kristiania. Far døde i en ulykke på sagbruket. Siden du var tolv, har du jobbet på fyrstikkfabrikken. Det er høsten 1889.",
    rolleLett: "Du er **Hanna**, 14 år. Du bor med mor og tre små søsken i ett rom i Kristiania. Far er død. Du jobber på en fyrstikkfabrikk. Det er høsten 1889.",
    start: "fabrikken",
    ord: {
      "akkord": "Betaling for hvor mye du produserer, ikke for hvor lenge du jobber.",
      "fosfor": "Et giftig stoff som ble brukt i fyrstikkhodene. Dampen kunne gi alvorlig sykdom.",
      "fosforkjeve": "En sykdom der kjevebeinet råtnet på grunn av fosfordamp. Den var svært smertefull og kunne være dødelig.",
      "streik": "Når arbeidere nekter å arbeide for å få gjennom krav om lønn eller arbeidsforhold.",
      "streikebryter": "En som arbeider mens de andre streiker.",
      "fagforening": "En forening der arbeidere går sammen for å forhandle om lønn og arbeidsvilkår.",
      "formann": "En arbeidsleder som passet på arbeiderne i fabrikken."
    },
    noder: {
      fabrikken: {
        tekst: [
          "Klokka er seks om morgenen. I den store salen sitter hundrevis av kvinner og jenter ved lange bord. Noen dypper fyrstikker i den gulhvite massen av [[fosfor]], andre pakker esker. Lufta er tung og lukter av svovel og noe søtlig vondt.",
          "Du jobber på [[akkord]]: Jo flere esker, jo mer betalt. Fingrene dine er raske. Ved siden av deg sitter Marie, som har vært her i ti år. Hun holder alltid et tørkle foran munnen, og hun har begynt å få vondt i kjeven.",
          "Ved middagstid kommer [[formann]]en inn med en lapp. Fra mandag blir betalingen per eske satt ned."
        ],
        lett: [
          "Klokka seks starter arbeidet. Lufta er giftig og lukter vondt.",
          "Du får betalt for hvor mange esker du lager. Marie ved siden av deg har vondt i kjeven av giften.",
          "Formannen sier at lønna skal settes ned fra mandag."
        ],
        kilde: { tittel: "Fakta: fyrstikkfabrikkene", tekst: "I fyrstikkfabrikkene i Kristiania arbeidet mange kvinner og barn. De brukte hvitt fosfor, som var billig, men giftig. Dampen kunne gi [[fosforkjeve]]: kjevebeinet råtnet, og ofte måtte det fjernes. Arbeiderskene hadde lange dager og lav lønn, og mange var bare barn." },
        valg: [
          { t: "Si ingenting. Jobben er viktigere enn noe annet.", til: "tie" },
          { t: "Høre hva de eldre kvinnene sier i spisepausen.", til: "pause" }
        ]
      },
      tie: {
        tekst: [
          "Du bøyer hodet og jobber enda fortere. Men om kvelden regner du på det: Med lavere betaling må du lage hundrevis flere esker hver uke for å tjene det samme. Mor ser bekymret på deg da du legger pengene på bordet. Det holder ikke til husleie og mat.",
          "Neste morgen står en gruppe kvinner utenfor porten. De har ikke tenkt å gå inn."
        ],
        lett: [
          "Du jobber enda fortere. Men lønna holder ikke til husleie og mat.",
          "Neste morgen står mange kvinner utenfor porten. De vil ikke gå inn."
        ],
        valg: [
          { t: "Stille deg sammen med dem.", til: "streik" },
          { t: "Gå forbi dem og inn i fabrikken.", til: "streikebryter" }
        ]
      },
      pause: {
        tekst: [
          "I spisepausen sitter kvinnene i gården med brødskivene sine. «Vi kan ikke la dem gjøre dette», sier Marie. «I London streiket fyrstikkjentene i fjor – og de vant!» Noen nikker. Andre ser ned. «Og hvem skal betale husleia mens vi streiker?» sier en eldre kvinne.",
          "En ung arbeider fra byen har kommet med en avis. Han sier at arbeiderforeningene vil samle inn penger hvis dere legger ned arbeidet."
        ],
        lett: [
          "«Vi kan ikke finne oss i dette», sier Marie. «I London streiket fyrstikkjentene, og de vant!» Andre er redde for å miste lønna.",
          "En mann sier at arbeiderforeningene vil samle inn penger hvis dere streiker."
        ],
        kilde: { tittel: "Fakta: London 1888", tekst: "I 1888 streiket rundt 1400 fyrstikkarbeidersker ved fabrikken Bryant & May i London. De protesterte mot lav lønn, bøter og den farlige fosforen. Journalisten Annie Besant skrev om forholdene. Streiken fikk stor støtte, og arbeiderskene vant flere krav. Nyheten spredte seg til andre land." },
        valg: [
          { t: "«Jeg er med.»", til: "streik" },
          { t: "«Jeg tør ikke. Mor trenger pengene.»", til: "tie" }
        ]
      },
      streikebryter: {
        tekst: [
          "Det er stille i salen. Mange plasser står tomme. Formannen er blid mot deg i dag og lover deg en bedre plass ved vinduet.",
          "Om kvelden står noen av de streikende ved porten. De sier ingenting, men de ser på deg. Marie snur seg bort. På vei hjem hører du noen rope «[[streikebryter]]» etter deg.",
          "Hjemme sier mor: «Du gjorde det du måtte. Men husk – hvis de vinner, får du det bedre du også.»"
        ],
        lett: [
          "Mange plasser er tomme. Du jobber. Formannen er blid mot deg.",
          "De som streiker, ser på deg. Noen roper «streikebryter».",
          "Mor sier: «Du gjorde det du måtte.»"
        ],
        valg: [
          { t: "Gå til de streikende neste dag og be om å få bli med.", til: "streik" },
          { t: "Fortsette å arbeide.", til: "slutt-alene" }
        ]
      },
      streik: {
        tekst: [
          "Dere er mange. Flere hundre kvinner og jenter går ut av fabrikkene. Dere går i tog gjennom gatene, og folk stopper opp for å se. Noen ler, andre roper oppmuntrende. Avisene skriver om «fyrstikkarbeiderskenes [[streik]]».",
          "Arbeiderforeningene samler inn penger, og noen av byens borgere gir også. Men pengene rekker ikke langt når så mange skal ha. Etter en uke er det lite mat hjemme. Lillebroren din spør hvorfor du ikke går på jobb lenger.",
          "Fabrikkeieren sender beskjed: De som kommer tilbake nå, får beholde jobben. De andre kan bli erstattet."
        ],
        lett: [
          "Hundrevis av kvinner streiker. Dere går i tog i gatene. Avisene skriver om dere.",
          "Folk samler inn penger, men det er lite mat hjemme.",
          "Fabrikkeieren sier: «De som kommer tilbake nå, får beholde jobben.»"
        ],
        kilde: { tittel: "Fakta: streiken i 1889", tekst: "Høsten 1889 la fyrstikkarbeiderskene i Kristiania ned arbeidet i protest mot lønnsnedslag. Streiken fikk stor oppmerksomhet i avisene og støtte fra arbeiderbevegelsen. Den viste at også kvinner i arbeiderklassen kunne organisere seg. Etter streiken ble det startet en egen forening for fyrstikkarbeiderskene." },
        valg: [
          { t: "Holde ut. Vi må stå sammen.", til: "holde-ut" },
          { t: "Gå tilbake til jobben for familiens skyld.", til: "tilbake" }
        ]
      },
      "holde-ut": {
        tekst: [
          "Du holder ut. Om kveldene møtes dere i et lokale i byen. En kvinne taler om at arbeidere må danne en [[fagforening]] – at én alene ikke kan gjøre noe, men at alle sammen er sterke. For første gang hører du noen si at du har rettigheter.",
          "Etter noen uker er streiken over. Dere får ikke gjennom alt dere krevde. Men noe har forandret seg: Dere har vist at dere tør, og mange av dere bestemmer seg for å holde sammen i en forening."
        ],
        lett: [
          "Du holder ut. En kvinne sier at arbeiderne må stå sammen i en fagforening.",
          "Streiken er over. Dere fikk ikke alt. Men dere har vist at dere tør."
        ],
        valg: [ { t: "Se hva som skjedde videre.", til: "slutt-forening" } ]
      },
      tilbake: {
        slutt: "Tilbake ved bordet",
        tekst: [
          "Du går tilbake. Formannen nikker kort. Ved bordet sitter du ved siden av andre som også har kommet tilbake. Ingen snakker om det.",
          "Noen uker senere er streiken over. De som holdt ut lengst, får beholde jobben, de fleste av dem. Du forstår at det ikke var lett for noen – verken for dem som streiket eller for dem som gikk tilbake.",
          "**Til ettertanke:** Mange arbeidere sto i et vanskelig valg mellom å kjempe for bedre kår og å skaffe mat til familien i dag. Derfor ble streikekasser og fagforeninger så viktige."
        ],
        lett: [
          "Du går tilbake på jobb. Ingen snakker om streiken.",
          "Snart er streiken over. Det var vanskelig for alle.",
          "**Til ettertanke:** Det var vanskelig å velge mellom å kjempe og å skaffe mat. Derfor ble fagforeningene viktige."
        ]
      },
      "slutt-alene": {
        slutt: "Alene ved vinduet",
        tekst: [
          "Du får plassen ved vinduet. Etter noen uker er streiken over, og de andre kommer tilbake. Noen av dem snakker aldri mer med deg. Men noen år senere, da det blir startet en fagforening, er det Marie som spør om du vil bli med. «Vi trenger alle», sier hun.",
          "**Til ettertanke:** Arbeidsgivere prøvde ofte å splitte arbeiderne. Fagforeningene ble sterke fordi de klarte å samle også dem som først var usikre."
        ],
        lett: [
          "Du får en bedre plass. Noen snakker aldri mer med deg. Men senere spør Marie om du vil bli med i fagforeningen.",
          "**Til ettertanke:** Fagforeningene ble sterke fordi de samlet alle arbeiderne."
        ]
      },
      "slutt-forening": {
        slutt: "Sammen står vi sterkere",
        tekst: [
          "Marie får fosforkjeve noen år senere og må slutte. Du blir værende i fabrikken og i foreningen. Når du blir voksen, er du med på å kreve kortere arbeidsdager og forbud mot den giftige fosforen.",
          "**Slik gikk det:** Arbeiderbevegelsen vokste raskt i årene etter 1889. I 1899 ble Landsorganisasjonen (LO) dannet. Hvitt fosfor ble etter hvert forbudt i fyrstikkproduksjon i mange land, og i 1919 fikk Norge en lov om åtte timers arbeidsdag."
        ],
        lett: [
          "Marie blir syk av giften. Du blir i foreningen og kjemper for kortere arbeidsdager.",
          "**Slik gikk det:** LO ble startet i 1899. I 1919 fikk Norge åtte timers arbeidsdag."
        ]
      }
    },
    etterpaa: {
      sporsmal: [
        "Hvorfor var det så vanskelig for Hanna å bestemme seg for om hun skulle streike?",
        "Hva var de største farene ved å jobbe i fyrstikkfabrikken?",
        "Hvordan kunne arbeiderne stå sterkere sammen enn hver for seg?",
        "Finnes det arbeidere i verden i dag som har det slik Hanna hadde det? Hvor, og hvorfor?"
      ],
      skriv: "Skriv en kort tale som Hanna kunne holdt for de andre arbeiderskene. Hva vil hun overbevise dem om?",
      ekte: [
        [true, "Fyrstikkarbeiderskenes streik i Kristiania høsten 1889."],
        [true, "Hvitt fosfor og sykdommen fosforkjeve."],
        [true, "Streiken i London i 1888 og at LO ble dannet i 1899."],
        [false, "Hanna, Marie, formannen og familien til Hanna."]
      ]
    }
  },

  {
    id: "eidsvoll-1814", tittel: "Tjenestejenta på Eidsvoll", undertittel: "Våren 1814", ikon: "📜", farger: ["#7a1f2b", "#f0e2b6"],
    tema: "sf8-1814-grunnloven", trinn: 8,
    kort: "Du er Sigrid, 15 år og tjenestejente på Eidsvollsverket. Hit kommer 112 menn for å skrive en grunnlov. Hva hører du – og hva gjør du?",
    rolle: "Du er **Sigrid**, 15 år. Du er tjenestejente i huset til Carsten Anker, en rik godseier på Eidsvoll, nord for Christiania. Vinteren har vært hard. Folk sulter fortsatt etter krigsårene. Det er april 1814.",
    rolleLett: "Du er **Sigrid**, 15 år. Du er tjenestejente på Eidsvoll. Det er april 1814.",
    start: "ankomst",
    ord: {
      "riksforsamling": "Et møte av valgte menn fra hele landet som skulle bestemme hvordan Norge skulle styres.",
      "eidsvollsmenn": "De 112 mennene som møttes på Eidsvoll i 1814 og skrev Grunnloven.",
      "selvstendighetspartiet": "De som ville at Norge skulle være helt fritt, med Christian Frederik som konge.",
      "unionspartiet": "De som mente at Norge måtte gå i union med Sverige og få mest mulig selvstyre der.",
      "embetsmenn": "Folk med høy utdanning som arbeidet for staten, som prester, dommere og offiserer.",
      "stattholder": "Kongens representant, som styrte Norge på vegne av kongen i København.",
      "Mossekonvensjonen": "Avtalen i august 1814 som avsluttet krigen mellom Norge og Sverige."
    },
    noder: {
      ankomst: {
        tekst: [
          "Hele vinteren har det vært uro. I januar kom beskjeden om at kongen i København har gitt Norge til Sverige. I februar måtte alle menn i bygda møte opp i kirken og sverge på at de ville forsvare Norges selvstendighet. Nå kommer de valgte mennene – [[eidsvollsmenn]]ene – til [[riksforsamling]]en her i huset.",
          "Huset fylles av folk: [[embetsmenn]] i fine frakker, offiserer i uniform og bønder i vadmel. Du bærer vann, rer senger og serverer mat. Prins Christian Frederik, [[stattholder]]en, har også kommet.",
          "Kokka sier: «Hold munnen lukket og ørene åpne, jenta mi. Det er historie som skjer her.»"
        ],
        lett: [
          "Kongen i Danmark har gitt Norge til Sverige. Nå kommer 112 menn til Eidsvoll. De skal lage en grunnlov.",
          "Du bærer vann, reier senger og serverer mat.",
          "Kokka sier: «Hold øynene og ørene åpne. Det er historie som skjer her.»"
        ],
        kilde: { tittel: "Fakta: valgene i kirkene", tekst: "Vinteren 1814 ble det holdt møter i kirkene over hele landet. Mennene sverget en ed på at de ville forsvare Norges selvstendighet, og de valgte hvem som skulle reise til Eidsvoll. 112 representanter møttes 10. april 1814: embetsmenn, bønder, kjøpmenn og offiserer. Ingen kvinner var med." },
        valg: [
          { t: "Servere i salen der mennene møtes, så du kan høre hva de sier.", til: "salen" },
          { t: "Hjelpe til på kjøkkenet og høre på det tjenestefolket snakker om.", til: "kjokken" }
        ]
      },
      salen: {
        tekst: [
          "Du bærer inn kaffe. Mennene er delt i to grupper som knapt hilser på hverandre. De som vil ha et helt fritt Norge med prinsen som konge, kalles [[selvstendighetspartiet]]. De andre, [[unionspartiet]], mener at Sverige og stormaktene er for sterke, og at Norge heller må forhandle om en union.",
          "En ung prest fra Vestlandet taler varmt om frihet. En kjøpmann svarer kjølig: «Frihet kan vi ikke spise. Uten korn fra utlandet sulter folket.» Det blir stille. Så banker presidenten i bordet."
        ],
        lett: [
          "Mennene er uenige. Noen vil ha et helt fritt Norge. Andre vil ha union med Sverige for å unngå krig.",
          "En prest snakker om frihet. En kjøpmann sier: «Frihet kan vi ikke spise.»"
        ],
        valg: [
          { t: "Du synes presten har rett: Norge må være fritt.", til: "frihet" },
          { t: "Du tenker på sulten hjemme og forstår kjøpmannen.", til: "union" }
        ]
      },
      kjokken: {
        tekst: [
          "På kjøkkenet snakker tjenestefolket fritt. En dreng sier: «Hva hjelper det oss med en grunnlov? Det er bare de som eier jord, som får stemme.» Kokka svarer: «Men for første gang skal makten komme fra folket og ikke fra en konge i København. Det er noe.»",
          "En bondegutt som har fulgt faren sin til Eidsvoll, sitter ved bordet og spiser. Han forteller at bøndene vil ha rett til å stemme og at embetsmennene ikke skal bestemme alt."
        ],
        lett: [
          "På kjøkkenet sier en dreng: «Bare de som eier jord, får stemme.»",
          "Kokka sier: «Men nå skal makten komme fra folket, ikke fra en konge i Danmark.»"
        ],
        valg: [
          { t: "Spørre om kvinner skal få stemme.", til: "kvinner" },
          { t: "Gå opp i salen med maten og høre selv.", til: "salen" }
        ]
      },
      kvinner: {
        tekst: [
          "Alle på kjøkkenet ler – ikke stygt, men som om du har sagt noe rart. «Kvinner?» sier drengen. «Det har ingen engang foreslått.» Kokka ser lenge på deg. «Kanskje en dag», sier hun stille.",
          "Du tenker på det hele kvelden. Mennene snakker om frihet og likhet, men det gjelder ikke deg, ikke kokka og ikke drengen uten jord."
        ],
        lett: [
          "Du spør om kvinner skal få stemme. Alle ler. «Det har ingen foreslått», sier drengen.",
          "Du tenker: Frihet og likhet gjelder ikke for deg."
        ],
        kilde: { tittel: "Fakta: hvem fikk stemme?", tekst: "Grunnloven ga stemmerett til menn over 25 år som eide eller leide jord, var embetsmenn eller borgere i byene. Det var rundt 40 prosent av mennene – mer enn i de fleste land på den tiden. Kvinner fikk allmenn stemmerett først i 1913. Grunnloven forbød også jøder å komme inn i riket. Den paragrafen ble fjernet i 1851." },
        valg: [ { t: "Fortsette arbeidet.", til: "frihet" } ]
      },
      frihet: {
        tekst: [
          "Ukene går. Om kveldene sitter komiteer og skriver. Du hører ord som «folkesuverenitet» og «maktfordeling» – makten skal komme fra folket og deles mellom en nasjonalforsamling, en konge og domstolene. Mange av ideene kommer fra Frankrike og Amerika.",
          "En kveld ber en av representantene deg om å bringe et brev ut til en kurér. Han hvisker at brevet er til en venn i Sverige. Er han en forræder – eller bare en som vil unngå krig?"
        ],
        lett: [
          "Mennene skriver grunnloven. Makten skal komme fra folket og deles i tre.",
          "En mann ber deg bringe et brev til en venn i Sverige. Er han en forræder?"
        ],
        valg: [
          { t: "Bringe brevet som han ba om. Det er ikke din sak.", til: "17mai" },
          { t: "Vise brevet til kokka først.", til: "brevet" }
        ]
      },
      union: {
        tekst: [
          "Du forstår begge sider. Hjemme hos foreldrene dine har de bare hatt barkebrød i vinter, fordi britiske skip har stengt kysten. Hvis det blir krig med Sverige, blir det enda verre.",
          "Men selvstendighetspartiet er flest. De vil at Norge skal være et fritt rike med egen grunnlov, uansett hva stormaktene sier."
        ],
        lett: [
          "Familien din har nesten ikke mat. Hvis det blir krig, blir det verre.",
          "Men de fleste mennene vil ha et fritt Norge."
        ],
        valg: [ { t: "Følge med på hva som skjer.", til: "frihet" } ]
      },
      brevet: {
        tekst: [
          "Kokka holder brevet opp mot lyset, men det er forseglet. «Gjør som han ba om», sier hun. «Det er lov å ha venner i Sverige. Og det er lov å være uenig. Det er jo det de sitter og skriver om der oppe – at folk skal få mene ting.»",
          "Du løper ut til kuréren i vårmørket."
        ],
        lett: [
          "Kokka sier: «Det er lov å være uenig. Det er det de skriver om der oppe.»",
          "Du løper ut med brevet."
        ],
        valg: [ { t: "Fortsette.", til: "17mai" } ]
      },
      "17mai": {
        tekst: [
          "Den 17. mai 1814 er Grunnloven ferdig og underskrevet. Christian Frederik blir valgt til konge av Norge. Mennene omfavner hverandre og roper hurra. Da forsamlingen blir avsluttet noen dager senere, holder de hverandre i hendene og roper: «Enige og tro, til Dovre faller!»",
          "Om kvelden får tjenestefolket også et glass. Du står i døra og ser på alle de festkledde mennene. Norge har fått en av de mest moderne grunnlovene i verden. Men du vet også at sommeren kan bringe krig."
        ],
        lett: [
          "17. mai 1814 er Grunnloven ferdig. Christian Frederik blir konge. Mennene roper hurra.",
          "Norge har fått en moderne grunnlov. Men det kan bli krig."
        ],
        kilde: { tittel: "Kilde: Grunnloven 1814 – fortalt med enklere ord", tekst: "§ 1 sa at Norge skal være et fritt, selvstendig og udelelig rike. Grunnloven delte makten mellom Stortinget (lovgivende), kongen (utøvende) og domstolene (dømmende). Den ga borgerne rettigheter som trykkefrihet og vern mot å bli fengslet uten lov og dom." },
        valg: [
          { t: "Bli i tjenesten på Eidsvoll.", til: "sommer" },
          { t: "Reise hjem til familien før høsten.", til: "hjem" }
        ]
      },
      sommer: {
        slutt: "Grunnloven består",
        tekst: [
          "I juli angriper svenske tropper. Krigen varer bare noen uker, og den norske hæren er for svak. I august blir [[Mossekonvensjonen]] underskrevet: Christian Frederik må gå av og reise fra landet. Men Norge får beholde Grunnloven.",
          "I november velger Stortinget den svenske kongen til konge også av Norge. Norge er i union med Sverige, men med egen grunnlov, eget storting og egen regjering.",
          "**Slik gikk det:** Grunnloven fra 1814 gjelder fortsatt i dag og er en av verdens eldste. 17. mai ble Norges nasjonaldag."
        ],
        lett: [
          "Om sommeren blir det krig med Sverige. Norge taper.",
          "Norge kommer i union med Sverige, men beholder Grunnloven.",
          "**Slik gikk det:** Grunnloven gjelder fortsatt i dag. 17. mai er nasjonaldagen."
        ]
      },
      hjem: {
        slutt: "Hjem til bygda",
        tekst: [
          "Du kommer hjem til foreldrene dine. Far har vært i kirken og hørt prestene lese opp den nye Grunnloven. Han er stolt, selv om han som husmann ikke får stemme. «Vi har en lov som gjelder for alle nå – også kongen», sier han.",
          "Senere samme sommer kommer nyheten om krigen og om unionen med Sverige. Men Grunnloven består.",
          "**Til ettertanke:** Grunnloven ga ikke alle like rettigheter i 1814. Men den ble et grunnlag som senere generasjoner kunne bygge videre på – med stemmerett for alle menn i 1898 og for kvinner i 1913."
        ],
        lett: [
          "Du kommer hjem. Far er stolt av Grunnloven, selv om han ikke får stemme.",
          "Senere blir det krig og union. Men Grunnloven består.",
          "**Til ettertanke:** Ikke alle fikk rettigheter i 1814. Alle menn fikk stemmerett i 1898, og kvinner i 1913."
        ]
      }
    },
    etterpaa: {
      sporsmal: [
        "Hva var forskjellen på selvstendighetspartiet og unionspartiet?",
        "Hvem fikk ikke være med på å bestemme i 1814? Hvorfor tror du det var slik?",
        "Hvilke ideer fra opplysningstiden finner du igjen i Grunnloven?",
        "Var Grunnloven demokratisk? Svar både med 1814-briller og med dagens briller."
      ],
      skriv: "Skriv en dagbokside fra Sigrid kvelden 17. mai 1814.",
      ekte: [
        [true, "Riksforsamlingen på Eidsvoll, med 112 representanter, i Carsten Ankers hus."],
        [true, "Selvstendighetspartiet og unionspartiet, og Grunnloven 17. mai 1814."],
        [true, "Krigen med Sverige sommeren 1814, Mossekonvensjonen og unionen i november."],
        [false, "Sigrid, kokka, drengen og brevet til Sverige."]
      ]
    }
  },

  {
    id: "krigsseiler-1917", tittel: "Krigsseileren", undertittel: "Arendal – Nordsjøen, 1917", ikon: "⚓", farger: ["#1c3344", "#9cc3d5"],
    tema: "sf9-forste-verdenskrig", trinn: 9, ar: 1917,
    kort: "Du er Anders, 16 år, fra Arendal. Norge er nøytralt i krigen, men norske skip seiler midt i den. Hyren er høy – og faren er stor. Skal du mønstre på?",
    rolle: "Du er **Anders Tobiassen**, 16 år. Du bor i Arendal med mor og to småsøstre. Far er styrmann og har vært ute på havet i nesten et år. Det er mars 1917, og verden har vært i krig i snart tre år. Norge er [[nøytralt]] – men krigen merkes likevel.",
    rolleLett: "Du er **Anders**, 16 år. Du bor i Arendal med mor og to små søstre. Far er sjømann og er langt borte. Det er 1917. Det er krig i Europa, men Norge er ikke med i krigen.",
    start: "hyre",
    ord: {
      "nøytralt": "Et nøytralt land tar ikke side i en krig.",
      "mønstre på": "Skrive kontrakt og begynne å jobbe på et skip.",
      "hyre": "Lønn for sjøfolk.",
      "krigstillegg": "Ekstra lønn til sjøfolk som seilte i farlige farvann under krigen.",
      "ubåt": "Et krigsskip som kan gå under vann. Tyskland senket mange handelsskip med ubåter.",
      "torpedo": "Et våpen som går under vann og eksploderer når det treffer et skip.",
      "props": "Tømmerstokker som ble brukt til å støtte opp gangene i kullgruvene.",
      "jobber": "En som kjøper og selger aksjer raskt for å tjene penger. Under krigen ble mange jobbere svært rike.",
      "aksje": "En liten del av et selskap. Prisen på aksjer kan gå opp og ned.",
      "konvoi": "En gruppe handelsskip som seiler sammen, beskyttet av krigsskip.",
      "livbåt": "En liten båt på et skip som skal redde mannskapet hvis skipet synker.",
      "dyrtid": "En tid da prisene på mat og varer stiger mye raskere enn lønningene.",
      "krakk": "Når prisene på aksjer plutselig faller kraftig, og mange mister pengene sine.",
      "spanskesyken": "En farlig influensa som spredte seg over hele verden i 1918–1920."
    },
    noder: {
      hyre: {
        tekst: [
          "Det er lørdag, og du står i kø på bakeriet med rasjoneringskortet til mor. Brødet koster nesten dobbelt så mye som før krigen. Bak deg står fru Salvesen og klager: «Det er [[dyrtid]], sier de. Men noen har det ikke dyrt, nei!»",
          "Hun nikker mot gata. Der kjører Herman Berg forbi i en blank, ny bil – den første i Arendal på lenge. For to år siden var han kontorist. Nå er han [[jobber]] og kjøper og selger [[aksje]]r i rederier. Folk sier han har tjent en formue.",
          "Nede på kaia ligger dampskipet «Solvang». Kapteinen trenger en dekksgutt. [[Hyre]]n er høy fordi skipet skal til England – med [[krigstillegg]] kan du tjene mer på ett år enn far gjorde på tre før krigen. Men alle vet hvorfor lønna er så høy."
        ],
        lett: [
          "Du står i kø på bakeriet. Brødet er blitt veldig dyrt på grunn av krigen.",
          "En mann kjører forbi i en ny bil. Han heter Herman Berg. Han har blitt rik på å kjøpe og selge aksjer i skip.",
          "På kaia ligger skipet «Solvang». De trenger en gutt som kan jobbe om bord. Lønna er høy, fordi turen til England er farlig."
        ],
        kilde: { tittel: "Fakta: Norge – et nøytralt land i krig", tekst: "Norge holdt seg utenfor første verdenskrig. Men Norge hadde en av verdens største handelsflåter, og norske skip fraktet varer for begge sider – mest for Storbritannia. Fordi det var farlig, var fraktprisene og lønningene svært høye. Noen ble rike, mens vanlige folk merket at prisene steg.", lett: "Norge var nøytralt i første verdenskrig. Men norske skip fraktet varer, mest til Storbritannia. Det var farlig, så lønna var høy." },
        valg: [
          { t: "Gå ned på kaia og mønstre på «Solvang».", til: "ombord" },
          { t: "Spørre om jobb som visergutt hos Herman Berg.", til: "jobber" }
        ]
      },
      ombord: {
        tekst: [
          "Mor gråter når du forteller det, men hun sier ikke nei. Pengene trengs. Tre dager senere står du på dekket da «Solvang» glir ut av Arendal med last av [[props]] – tømmer til de britiske kullgruvene. Uten norsk tømmer stopper gruvene, og uten kull stopper krigen.",
          "Kokken heter Gunnar og er fra Tromøy. Han viser deg [[livbåt]]ene og redningsvestene. «Fra februar har tyskerne sagt at de vil senke alle skip rundt England uten varsel», sier han. «Om du hører et smell, venter du ikke på ordre. Du løper.»",
          "Kapteinen har malt «NORGE» med store hvite bokstaver på skroget, og flagget er malt på siden. Det skal vise at skipet er nøytralt. «Det hjelper mot noen», sier Gunnar. «Ikke mot alle.»"
        ],
        lett: [
          "Mor er lei seg, men familien trenger pengene. «Solvang» seiler til England med tømmer til kullgruvene.",
          "Kokken Gunnar viser deg livbåtene. «Tyskerne senker skip uten å si fra», sier han. «Hvis det smeller, løper du.»",
          "Skipet har «NORGE» malt på siden. Det skal vise at skipet er nøytralt."
        ],
        kilde: { tittel: "Fakta: den uinnskrenkede ubåtkrigen", tekst: "Fra 1. februar 1917 erklærte Tyskland at ubåtene skulle senke alle skip i farvannene rundt Storbritannia – også skip fra nøytrale land – uten forvarsel. Målet var å sulte ut Storbritannia. Det ble den farligste tiden for norske sjøfolk. Ubåtkrigen var også en av grunnene til at USA gikk inn i krigen i april 1917.", lett: "Fra februar 1917 senket tyske ubåter skip rundt England uten å varsle. Også norske skip ble senket." },
        valg: [
          { t: "Spørre Gunnar om å få sove nær livbåtene.", til: "nordsjoen" },
          { t: "Sove i lugaren under dekk, der det er varmt.", til: "nordsjoen-lugar" }
        ]
      },
      nordsjoen: {
        tekst: [
          "Du sover med klærne på, på en benk ved byssa, tett ved trappa opp til båtdekket. Det er kaldt, men Gunnar har gitt deg et ekstra pledd.",
          "Den tredje natta, et stykke utenfor kysten av Skottland, smeller det. Hele skipet rister. Lyset går. Du er oppe på dekket før du har tenkt en eneste tanke. I måneskinnet ser du en mørk skikkelse i sjøen – et tårn som stikker opp av vannet. En [[ubåt]]."
        ],
        lett: [
          "Du sover nær livbåtene, med klærne på.",
          "Den tredje natta smeller det. Skipet rister. Du løper opp på dekket. I sjøen ser du en ubåt."
        ],
        valg: [ { t: "Løpe mot livbåten.", til: "senket" } ]
      },
      "nordsjoen-lugar": {
        tekst: [
          "Lugaren er trang, men varm. Du sovner med en gang og drømmer om Arendal.",
          "Den tredje natta våkner du av et smell så kraftig at du blir kastet ut av køya. Det er bekmørkt, og du hører vann som fosser et sted under deg. Du famler etter trappa. Noen roper navnet ditt. Det er Gunnar. Han har kommet ned for å hente deg."
        ],
        lett: [
          "Du sover i lugaren under dekk. Der er det varmt.",
          "Om natta smeller det. Det er mørkt, og vann renner inn. Kokken Gunnar kommer ned og henter deg."
        ],
        valg: [ { t: "Følge Gunnar opp trappa.", til: "senket" } ]
      },
      senket: {
        tekst: [
          "En [[torpedo]] har truffet akterut. «Solvang» krenger allerede. Mannskapet får den ene livbåten på vannet, men den andre henger fast i tauene. Ubåten ligger stille et stykke unna. Noen sier at tyskerne bare venter på at skipet skal synke.",
          "I livbåten er dere elleve mann. To mangler: andremaskinisten og en matros fra Grimstad. Du ser «Solvang» forsvinne under vannet. Det tar bare noen minutter. Så er havet stille, og ubåten er borte.",
          "Det er kaldt. Styrmannen har et kompass og litt skipskjeks. Kysten av Skottland ligger kanskje 40 nautiske mil unna."
        ],
        lett: [
          "En torpedo har truffet skipet. Det synker. Dere kommer dere i livbåten, men to av mannskapet er borte.",
          "Skipet forsvinner under vannet. Det er kaldt, og land er langt unna."
        ],
        kilde: { tittel: "Fakta: norske sjøfolk i første verdenskrig", tekst: "Selv om Norge var nøytralt, mistet landet rundt halvparten av handelsflåten i krigen – over 800 skip. Rundt 2000 norske sjøfolk omkom. Mange skip ble senket av ubåter, andre gikk på miner. Krigsseilerne fra første verdenskrig er langt mindre kjent enn krigsseilerne fra andre verdenskrig.", lett: "Norge mistet over 800 skip i krigen. Rundt 2000 norske sjøfolk døde." },
        valg: [
          { t: "Foreslå å ro mot land med en gang, før dere blir for kalde.", til: "ro" },
          { t: "Støtte styrmannen, som vil bli liggende og vente på å bli sett.", til: "vente" }
        ]
      },
      ro: {
        tekst: [
          "Dere ror på skift, to og to. Hendene får gnagsår og blemmer. Gunnar synger gamle viser fra Tromøy for å holde motet oppe.",
          "Etter et døgn ser dere røyk i horisonten. Det er en britisk tråler. Dere skyter opp den siste nødraketten. Tråleren snur. Mannskapet trekker dere om bord, gir dere te med sukker og tørre klær. En av dem klapper deg på skulderen: «Norwegian? You lot are bloody brave.»"
        ],
        lett: [
          "Dere ror i et helt døgn. Hendene får sår.",
          "Til slutt ser dere en britisk fiskebåt. De tar dere om bord og gir dere te og tørre klær."
        ],
        valg: [ { t: "Bli satt i land i Aberdeen.", til: "aberdeen" } ]
      },
      vente: {
        tekst: [
          "Dere binder årene fast og legger dere tett sammen under seilet for å holde varmen. Natta er lang. En av matrosene får frostskader i føttene.",
          "Neste morgen kommer et britisk patruljeskip forbi. Det er en del av en [[konvoi]] – en lang rekke handelsskip som seiler sammen, med krigsskip rundt. Konvoien stopper ikke, men en av jagerne setter ut en båt og henter dere."
        ],
        lett: [
          "Dere ligger tett sammen i båten for å holde varmen. Natta er lang og kald.",
          "Om morgenen kommer et britisk krigsskip. Det redder dere."
        ],
        kilde: { tittel: "Fakta: konvoiene", tekst: "Fra sommeren 1917 begynte britene å la handelsskip seile sammen i konvoier, beskyttet av krigsskip. Da ble det mye vanskeligere for ubåtene å senke skipene. Mange norske skip seilte i britiske konvoier, blant annet mellom Norge og Skottland.", lett: "Fra 1917 seilte mange skip sammen i grupper, med krigsskip rundt. Det kalles konvoi. Da ble færre skip senket." },
        valg: [ { t: "Bli satt i land i Aberdeen.", til: "aberdeen" } ]
      },
      aberdeen: {
        tekst: [
          "I Aberdeen får dere seng på et sjømannshjem. Den norske sjømannspresten kommer med brev og papir, så du kan skrive hjem. Mor har sikkert lest i avisa at «Solvang» er senket.",
          "Etter en uke kommer to tilbud. Et nytt norsk rederi trenger folk til et skip som skal seile i konvoi – med enda høyere krigstillegg. Eller du kan få reise hjem gratis med neste skip til Norge."
        ],
        lett: [
          "I Aberdeen får du seng og mat. Du skriver brev hjem til mor.",
          "Nå kan du velge: få ny jobb på et annet skip, eller reise hjem."
        ],
        valg: [
          { t: "Mønstre på et nytt skip. Familien trenger pengene.", til: "igjen" },
          { t: "Reise hjem til Arendal.", til: "hjem" }
        ]
      },
      igjen: {
        slutt: "Til sjøs igjen",
        tekst: [
          "Du seiler resten av krigen i konvoier mellom Skottland og Norge. To ganger ser du skip i konvoien bli truffet. Du lærer å sove lett og å aldri ta av deg skoene.",
          "Den 11. november 1918 ligger skipet i Leith ved Edinburgh. Alle kirkeklokkene i byen ringer. Krigen er slutt. Du har tjent mer penger enn du noen gang har sett – men du har også sett venner forsvinne i havet.",
          "**Slik gikk det for mange:** Krigsseilerne fikk lite oppmerksomhet etter krigen. Mange fikk aldri hjelp for det de hadde opplevd. I dag står det minnesmerker over dem langs hele kysten."
        ],
        lett: [
          "Du jobber på skip resten av krigen. Du ser andre skip bli senket.",
          "11. november 1918 er krigen slutt. Du har tjent mye penger, men du har mistet venner.",
          "**Slik gikk det:** Mange krigsseilere fikk lite hjelp etter krigen."
        ]
      },
      hjem: {
        tekst: [
          "Når du kommer hjem, står mor og søstrene dine på kaia. Mor holder rundt deg så lenge at folk begynner å se.",
          "Arendal har forandret seg på bare noen måneder. Prisene er enda høyere. Folk står i kø for poteter. Samtidig har rederiene aldri tjent mer. Det bygges nye villaer på Tyholmen.",
          "Verftet på Pusnes trenger lærlinger. Og Herman Berg leter fortsatt etter en visergutt."
        ],
        lett: [
          "Mor og søstrene står på kaia og venter på deg.",
          "Prisene er enda høyere nå. Noen er blitt veldig rike, andre har lite mat.",
          "Du kan bli lærling på verftet, eller jobbe for jobberen Herman Berg."
        ],
        valg: [
          { t: "Bli lærling på verftet.", til: "verftet" },
          { t: "Jobbe for Herman Berg.", til: "jobber" }
        ]
      },
      jobber: {
        tekst: [
          "Herman Berg har kontor i andre etasje over en kolonialbutikk. Det er fullt av papirer, telefoner og sigarrøyk. Jobben din er å løpe med brev og telegrammer til banken og til andre jobbere.",
          "Alle snakker om skipsaksjer. En aksje som kostet 1000 kroner i 1914, selges nå for 5000. Folk låner penger i banken for å kjøpe flere. «Det kan bare gå én vei», sier Berg og ler. «Opp!»",
          "En dag sier han: «Du er en lur gutt, Anders. Jeg kan låne deg penger, så kan du kjøpe aksjer selv.»"
        ],
        lett: [
          "Herman Berg har et kontor fullt av papirer og røyk. Du løper med brev til banken.",
          "Alle kjøper aksjer i skip. Prisene stiger og stiger. Folk låner penger for å kjøpe mer.",
          "Berg tilbyr å låne deg penger, så du også kan kjøpe aksjer."
        ],
        kilde: { tittel: "Fakta: jobbetiden", tekst: "Under krigen tjente rederiene enormt på de høye fraktprisene. Mange kjøpte aksjer i nye rederier og selskaper for å tjene raskt – ofte med lånte penger. Tiden kalles «jobbetiden». Samtidig steg prisene på mat og varer så raskt at mange arbeidere fikk dårligere råd. Forskjellene mellom fattig og rik økte.", lett: "Under krigen kjøpte mange aksjer for å bli rike fort. Det kalles jobbetiden. Samtidig ble mat dyrere for vanlige folk." },
        valg: [
          { t: "Si ja. Dette er sjansen din.", til: "krakk" },
          { t: "Si nei takk og spare lønna di i stedet.", til: "spare" }
        ]
      },
      krakk: {
        slutt: "Jobbetid og krakk",
        tekst: [
          "I to år går alt bra. Aksjene dine stiger, og du kjøper en sykkel og en dress. Mor får ny kåpe.",
          "Men da krigen er over, trenger ikke verden like mange skip. Fraktprisene faller. I 1920 begynner aksjene å synke – først litt, så alt på en gang. Det blir [[krakk]]. Herman Berg selger bilen og flytter fra byen om natta. Du skylder banken mer enn du eier.",
          "**Slik gikk det:** Etter krigen fikk Norge en alvorlig økonomisk krise. Mange banker gikk konkurs på 1920-tallet, og tusenvis av mennesker mistet sparepengene sine. Arbeidsløsheten ble høy."
        ],
        lett: [
          "I to år stiger aksjene. Du kjøper sykkel og dress.",
          "Etter krigen faller prisene. Aksjene blir nesten ingenting verdt. Du skylder banken penger.",
          "**Slik gikk det:** Etter krigen fikk Norge en stor økonomisk krise. Mange mistet pengene sine."
        ]
      },
      spare: {
        slutt: "Den forsiktige",
        tekst: [
          "Du legger hver krone i Arendal Sparebank. Herman Berg ler av deg. «Du blir aldri rik på den måten!»",
          "I 1920 kommer [[krakk]]et. Berg mister alt. Du har ikke mye, men det du har, er ditt. Du bruker sparepengene til å gå på sjømannsskolen og blir styrmann – som far.",
          "**Til ettertanke:** Mange som tjente mye under jobbetiden, mistet alt like raskt. Andre ble rike og forble rike. Hvem tror du tjente mest på krigen – og hvem betalte prisen?"
        ],
        lett: [
          "Du sparer pengene dine i banken. Berg ler av deg.",
          "I 1920 mister Berg alt. Du har sparepengene dine og går på sjømannsskolen.",
          "**Til ettertanke:** Hvem tjente på krigen, og hvem betalte prisen?"
        ]
      },
      verftet: {
        slutt: "Lærling på verftet",
        tekst: [
          "På verftet bygger dere nye skip for å erstatte dem som er senket. Arbeidet er tungt, men du lærer å nagle stålplater og lese tegninger.",
          "Høsten 1918 kommer [[spanskesyken]] til Arendal. Halve verftet ligger syk. Skolene stenges. Du og mor steller søstrene dine, som har høy feber. Den yngste blir frisk igjen. Mange i byen blir ikke det.",
          "**Slik gikk det:** Spanskesyken drepte rundt 15 000 mennesker i Norge i 1918–1920, mange av dem unge voksne. I hele verden døde titalls millioner – flere enn i selve krigen."
        ],
        lett: [
          "Du jobber på verftet og bygger nye skip.",
          "Høsten 1918 kommer en farlig influensa, spanskesyken. Mange blir syke. Søstrene dine blir syke, men de blir friske igjen.",
          "**Slik gikk det:** Spanskesyken drepte rundt 15 000 mennesker i Norge."
        ]
      }
    },
    etterpaa: {
      sporsmal: [
        "Norge var nøytralt. Var Norge likevel en del av krigen? Begrunn svaret.",
        "Hvorfor var lønna så høy for sjøfolk under krigen?",
        "Hvem tjente på jobbetiden, og hvem tapte?",
        "Sammenlign Anders’ valg med valgene unge mennesker tar når de får tilbud om godt betalt, men farlig arbeid i dag."
      ],
      skriv: "Skriv brevet Anders sender hjem fra Aberdeen etter at «Solvang» ble senket.",
      ekte: [
        [true, "Norge var nøytralt i første verdenskrig, men norske handelsskip seilte i krigssonene."],
        [true, "Fra februar 1917 senket tyske ubåter skip rundt Storbritannia uten varsel."],
        [true, "Norge mistet over 800 skip og rundt 2000 sjøfolk."],
        [true, "Jobbetiden, krakket etter krigen og spanskesyken i 1918."],
        [false, "Anders, familien hans, Gunnar, Herman Berg og skipet «Solvang»."],
        [false, "Nøyaktig hvor «Solvang» ble senket, og hvem som ble reddet."]
      ]
    },
    kontroller: [
      "Antall norske skip og sjøfolk som gikk tapt i første verdenskrig (her: over 800 skip, rundt 2000 sjøfolk).",
      "Uinnskrenket ubåtkrig fra 1. februar 1917 og at konvoisystemet kom sommeren 1917.",
      "Spanskesyken: rundt 15 000 døde i Norge 1918–1920.",
      "Eksempelet med aksjekurs (1000 → 5000 kr) er oppdiktet for å illustrere jobbetiden."
    ]
  },

  {
    id: "bergen-1940", tittel: "Fem år i et okkupert land", undertittel: "Bergen, 1940–1945", ikon: "📻", farger: ["#2d2a26", "#c8a560"],
    tema: "sf10-okkupasjonen", trinn: 10, ar: 1940,
    kort: "Du er Ingrid, 14 år, fra Bergen. En aprilmorgen i 1940 marsjerer tyske soldater inn i byen. De neste fem årene må du ta valg ingen har forberedt deg på.",
    rolle: "Du er **Ingrid Haukeland**, 14 år. Du bor i en leilighet på Nordnes i Bergen med mor, far og storebroren din Olav, som er 18. Far er politibetjent. Den beste venninnen din, Ruth, bor i etasjen under. Familien hennes er jødisk. Det er natt til 9. april 1940.",
    rolleLett: "Du er **Ingrid**, 14 år, og bor i Bergen. Far er politimann. Broren din Olav er 18. Venninnen din Ruth bor i etasjen under. Familien hennes er jødisk. Det er april 1940.",
    start: "niende",
    ord: {
      "okkupasjon": "Når et land blir tatt og styrt av et annet lands militære makt.",
      "NS": "Nasjonal Samling, det norske nazistpartiet ledet av Vidkun Quisling. Det var det eneste lovlige partiet under okkupasjonen.",
      "rasjoneringskort": "Kort som viste hvor mye mat og andre varer hver person fikk kjøpe.",
      "illegal avis": "En avis som ble laget og spredt i hemmelighet, fordi den var forbudt.",
      "isfront": "Når nordmenn holdt avstand til tyskere og NS-folk og ikke snakket med dem.",
      "motstandsbevegelsen": "Nordmenn som jobbet i hemmelighet mot okkupasjonsmakten.",
      "deportert": "Tvangssendt ut av landet.",
      "landssvik": "Å hjelpe fienden mot sitt eget land.",
      "kapitulasjon": "Når en hær gir opp og overgir seg."
    },
    noder: {
      niende: {
        tekst: [
          "Du våkner av drønn. Vinduene rister. Far står allerede påkledd i gangen. «Det er skyting ute ved Kvarven», sier han. «Det er tyske krigsskip i fjorden.»",
          "Da det blir lyst, er Bergen tatt. Tyske soldater marsjerer over Torgallmenningen i grå uniformer. Noen folk står og ser på i stillhet. Andre gråter. En gammel mann spytter på bakken. På radioen sier en mann at han heter Vidkun Quisling og at han har tatt makten.",
          "Ruth banker på døra. «Mor sier vi ikke skal gå ut i dag», hvisker hun. «Hun sier tyskerne ikke liker jøder.»"
        ],
        lett: [
          "Du våkner av smell. Tyske krigsskip har kommet til Bergen.",
          "Om morgenen marsjerer tyske soldater i gatene. Bergen er tatt. Quisling sier på radioen at han har tatt makten.",
          "Ruth kommer opp. «Mor sier vi ikke skal gå ut», sier hun. «Tyskerne liker ikke jøder.»"
        ],
        kilde: { tittel: "Fakta: 9. april 1940 i Bergen", tekst: "Natt til 9. april 1940 angrep Tyskland Norge. Kystfestningene ved Bergen skjøt mot de tyske skipene og skadet krysseren «Königsberg», men byen ble tatt samme morgen. Dagen etter ble «Königsberg» senket av britiske fly på havna i Bergen. Det ble kjempet i Norge i to måneder før de siste norske styrkene ga opp 10. juni. Kongen og regjeringen dro til London.", lett: "9. april 1940 angrep Tyskland Norge. Bergen ble tatt samme dag. Det ble kjempet i to måneder. Kongen og regjeringen flyktet til London." },
        valg: [
          { t: "Bli hjemme med Ruth og spille kort, så hun ikke er redd.", til: "radio" },
          { t: "Snike deg ut med Olav for å se soldatene.", til: "radio-ute" }
        ]
      },
      "radio-ute": {
        tekst: [
          "På Bryggen står soldatene i rekker. De er ikke mye eldre enn Olav. En av dem smiler og gir deg en sjokolade. Olav slår den ut av hånda di. «Vi tar ikke imot noe fra dem», sier han hardt.",
          "Månedene går. Det kommer tyske skilt i gatene og tyske soldater på trikken. Det blir mindre mat i butikkene. Mor står i kø med [[rasjoneringskort]]. Mange i byen begynner med det de kaller [[isfront]]: Man reiser seg hvis en tysker setter seg ved siden av deg på trikken."
        ],
        lett: [
          "Du ser soldatene. En gir deg sjokolade. Olav slår den ut av hånda di. «Vi tar ikke imot noe fra dem!»",
          "Det blir mindre mat. Mor står i kø med rasjoneringskort. Mange snakker ikke med tyskerne. Det kalles isfront."
        ],
        valg: [ { t: "Fortsette.", til: "radio" } ]
      },
      radio: {
        tekst: [
          "I august 1941 kommer en ny ordre: Alle radioer skal leveres inn. Den som har radio, kan bli arrestert. Far må hjelpe til med å samle dem inn, og han kommer hjem sliten og taus.",
          "Samme kveld hører du lyder fra loftet. Olav har tatt familieradioen og gjemt den bak noen gamle kofferter. «Hver kveld sender NRK fra London», sier han. «Kongen snakker til oss. Uten radioen vet vi bare det tyskerne vil at vi skal vite.»",
          "«Hvis far finner den, mister han jobben», sier du. «Eller verre.»"
        ],
        lett: [
          "I 1941 må alle levere inn radioene sine. Far er politimann og må hjelpe til.",
          "Olav gjemmer radioen på loftet. «Fra London får vi høre sannheten», sier han.",
          "Men hvis noen finner radioen, kan far miste jobben – eller bli arrestert."
        ],
        kilde: { tittel: "Fakta: radioene", tekst: "Høsten 1941 måtte nordmenn flest levere inn radioene sine. Myndighetene ville hindre folk i å høre nyhetene fra BBC i London, der den norske regjeringen og kongen sendte egne programmer. Mange gjemte radioer likevel. Nyhetene ble skrevet ned og spredt i [[illegal avis|illegal avis]]er.", lett: "I 1941 tok tyskerne radioene. De ville ikke at folk skulle høre nyheter fra London. Mange gjemte radioen likevel." },
        valg: [
          { t: "Hjelpe Olav og lytte sammen med ham hver kveld.", til: "london" },
          { t: "Si at han må levere den. Det er for farlig for far.", til: "levert" }
        ]
      },
      london: {
        tekst: [
          "Hver kveld klokka ti sitter du og Olav på loftet med et teppe over hodet og radioen. Stemmen fra London knitrer: «Dette er London. Her er nyhetene.» Du skriver ned det du hører i en skrivebok.",
          "En dag tar Olav deg med til en venn. I kjelleren står en stensilmaskin, og det ligger stabler med papir. «Vi lager en [[illegal avis]]», sier vennen. «Vi trenger noen som kan bære avisene ut. En jente med skoleveske blir ikke stoppet så lett.»"
        ],
        lett: [
          "Hver kveld hører du og Olav på radio fra London. Du skriver ned nyhetene.",
          "Olavs venn lager en hemmelig avis. «Vil du bære avisene rundt?» spør han. «En jente med skoleveske blir ikke stoppet så lett.»"
        ],
        valg: [
          { t: "Si ja. Du vil gjøre noe.", til: "avis" },
          { t: "Si nei. Du tenker på far og mor.", til: "aksjonen" }
        ]
      },
      avis: {
        tekst: [
          "To ganger i uka går du til skolen med avisene gjemt mellom bøkene. Du legger dem i postkasser og under dørmatter i trappeoppganger. Hjertet slår hardt hver gang.",
          "En morgen i 1943 er det kontroll ved Festningen. To tyske soldater og en norsk politimann fra [[NS]] stopper alle og ser i veskene. Det er fire personer foran deg i køen. I veska ligger tjue aviser."
        ],
        lett: [
          "Du bærer de hemmelige avisene i skoleveska og legger dem i postkasser.",
          "En dag er det kontroll i gata. Soldater ser i alle veskene. Du har tjue aviser i veska di."
        ],
        kilde: { tittel: "Fakta: de illegale avisene", tekst: "Under okkupasjonen ble det laget hundrevis av illegale aviser i Norge. De var ofte bare ett eller to ark med nyheter fra London. Å lage eller spre dem var svært farlig. Flere tusen nordmenn ble arrestert for illegalt arbeid, og noen ble skutt. Mange av dem som bar avisene, var unge.", lett: "Det fantes hundrevis av hemmelige aviser. Det var farlig å lage og spre dem. Mange ble arrestert." },
        valg: [
          { t: "Snu og løpe inn en sidegate.", til: "arrestert" },
          { t: "Bli stående og prøve å virke rolig.", til: "freden" }
        ]
      },
      arrestert: {
        slutt: "Arrestert",
        tekst: [
          "Du kommer ikke langt. En soldat roper, og en annen griper deg i armen. Veska blir tømt på brosteinen. Avisene blåser utover gata.",
          "Du sitter i fengsel i Bergen i tre uker. Du blir avhørt mange ganger, men du sier ikke noe om Olav eller vennen hans. Fordi du er så ung, blir du til slutt sendt hjem – men far blir avskjediget fra politiet.",
          "**Slik gikk det for mange:** Mange unge ble arrestert for illegalt arbeid. Noen ble sendt til fangeleirer i Norge, som Ulven utenfor Bergen og Grini ved Oslo, og noen til konsentrasjonsleirer i Tyskland."
        ],
        lett: [
          "Du løper, men soldatene tar deg. Avisene blåser utover gata.",
          "Du sitter i fengsel i tre uker. Du sier ingenting om Olav. Til slutt får du gå hjem, men far mister jobben.",
          "**Slik gikk det:** Mange unge ble arrestert. Noen ble sendt til fangeleirer i Norge eller Tyskland."
        ]
      },
      freden: {
        slutt: "Freden",
        tekst: [
          "Du teller stille til ti. Når det blir din tur, smiler du og viser fram mattebøkene. Soldaten blar litt, gjesper og vinker deg videre. Avisene lå i bunnen, under matpakka.",
          "Du bærer aviser i to år til. Den 8. mai 1945 kommer nyheten: Tyskland har [[kapitulert|kapitulasjon]]. Hele Bergen er ute i gatene med flagg. Olav kommer ned fra fjellet med armbind fra Milorg. Du gråter og ler samtidig.",
          "**Til ettertanke:** De fleste nordmenn var verken motstandsfolk eller landssvikere. De prøvde å leve så normalt som mulig. Men små handlinger – å bære aviser, å gjemme en radio, å holde isfront – betydde mye for mange."
        ],
        lett: [
          "Du smiler og viser fram mattebøkene. Soldaten vinker deg videre.",
          "8. mai 1945 er krigen slutt. Hele Bergen feirer med flagg. Olav kommer hjem.",
          "**Til ettertanke:** De fleste nordmenn prøvde bare å leve vanlig. Men små handlinger betydde mye."
        ]
      },
      levert: {
        tekst: [
          "Olav leverer radioen, men han snakker ikke med deg på flere dager. «Du er feig», sier han til slutt. Så blir han borte. Mor sier at han er på en hytte. Du skjønner at han er med i [[motstandsbevegelsen]].",
          "Samme vinter ser du Solveig, storesøsteren til en klassevenninne, gå arm i arm med en tysk soldat på Fløien. Neste dag har noen skrevet et stygt ord på døra hennes. Ingen i klassen vil snakke med søsteren hennes lenger."
        ],
        lett: [
          "Olav leverer radioen. Han er sint på deg. Så blir han borte. Du tror han er med i motstandsbevegelsen.",
          "Du ser Solveig gå sammen med en tysk soldat. Folk skriver stygge ord på døra hennes. Ingen vil være venn med søsteren hennes."
        ],
        valg: [
          { t: "Fortsette å være venn med Solveigs lillesøster.", til: "oppgjoret" },
          { t: "Holde deg unna, som alle de andre.", til: "aksjonen" }
        ]
      },
      oppgjoret: {
        slutt: "Oppgjøret",
        tekst: [
          "Du sitter sammen med lillesøsteren i friminuttene, selv om de andre hvisker. Hun har ikke gjort noe galt, tenker du. Og kjærlighet er vel ikke [[landssvik]]?",
          "Da freden kommer i mai 1945, blir Solveig hentet av en gruppe menn. De klipper håret hennes på torget mens folk ser på. Hun blir internert i en leir i flere måneder – uten dom. Du står i folkemengden og vet ikke hva du skal gjøre.",
          "**Slik gikk det:** Etter krigen ble flere tusen kvinner som hadde vært sammen med tyske soldater, internert. Mange ble trakassert, og barna deres ble mobbet. I 2018 ba statsministeren om unnskyldning for hvordan staten behandlet de såkalte «tyskerjentene»."
        ],
        lett: [
          "Du er venn med lillesøsteren, selv om de andre hvisker.",
          "Etter krigen blir Solveig hentet. Noen klipper håret hennes foran alle. Hun blir sperret inne i flere måneder uten dom.",
          "**Slik gikk det:** Mange kvinner som hadde vært sammen med tyske soldater, ble straffet uten dom. I 2018 ba staten om unnskyldning."
        ]
      },
      aksjonen: {
        tekst: [
          "En kveld i oktober 1942 kommer far sent hjem. Han setter seg ved kjøkkenbordet uten å ta av seg frakken. Du hører ham hviske til mor: «I morgen tidlig skal vi hente alle jødiske menn. Vi har fått lister med navn.»",
          "Mor holder hånda for munnen. «Herr Feldmann», sier hun. «Ruths far.»",
          "Far ser ned i bordet. «Hvis noen advarer dem, finner de ut at det var meg. Da blir jeg arrestert selv.»",
          "Du ligger våken. Ruth sover bare én etasje under deg."
        ],
        lett: [
          "En kveld i 1942 kommer far sent hjem. Du hører ham si: «I morgen skal vi arrestere alle jødiske menn.»",
          "Ruths far står på lista.",
          "Far sier: «Hvis noen advarer dem, blir jeg arrestert.»",
          "Du ligger våken. Ruth sover i etasjen under."
        ],
        kilde: { tittel: "Fakta: aksjonen mot jødene", tekst: "26. oktober 1942 arresterte norsk politi jødiske menn over 15 år i hele landet. En måned senere, 26. november, ble også kvinner og barn arrestert. Samme dag ble over 500 mennesker sendt fra Oslo med skipet «Donau» til Auschwitz. Det var norsk politi og norske drosjesjåfører som utførte mye av arbeidet. Noen politifolk varslet likevel jøder i hemmelighet, slik at de kunne flykte.", lett: "Høsten 1942 arresterte norsk politi jødene i Norge. Mange ble sendt med skip til Auschwitz. Noen politifolk advarte jødene i hemmelighet." },
        valg: [
          { t: "Liste deg ned trappa og advare Ruth.", til: "flukt" },
          { t: "Bli liggende. Du kan ikke sette far i fare.", til: "taus" }
        ]
      },
      flukt: {
        slutt: "Flukten",
        tekst: [
          "Du banker forsiktig på døra. Ruth åpner i nattkjole. Du hvisker alt du har hørt. Fru Feldmann blir hvit i ansiktet, men herr Feldmann handler raskt. På en halvtime har de pakket det viktigste.",
          "De forsvinner ut i mørket. Senere får du vite at de gjemte seg hos en bonde i Hardanger, og at motstandsfolk fulgte dem over fjellet mot øst og videre til Sverige. Ingen spør deg noen gang hvem som varslet dem. Far ser lenge på deg neste morgen, men han sier ingenting.",
          "**Slik gikk det:** Rundt halvparten av jødene i Norge klarte å flykte, de fleste til Sverige, ofte med hjelp fra vanlige nordmenn. Over 770 ble [[deportert]]. Bare noen få titalls av dem overlevde."
        ],
        lett: [
          "Du advarer Ruth og familien hennes. De pakker og drar samme natt.",
          "De gjemmer seg hos en bonde. Så hjelper motstandsfolk dem over fjellet til Sverige. Far sier ingenting, men han ser lenge på deg.",
          "**Slik gikk det:** Omtrent halvparten av jødene i Norge klarte å flykte. Over 770 ble sendt bort. Nesten alle av dem ble drept."
        ]
      },
      taus: {
        slutt: "Stillheten",
        tekst: [
          "Du blir liggende og stirre i taket. Klokka fem hører du biler i gata og tunge skritt i trappa. Så hører du herr Feldmanns stemme, rolig og lav. Døra slår igjen.",
          "En måned senere er Ruth, moren og lillebroren også borte. Leiligheten under deg står tom. Noen fra [[NS]] flytter inn i den.",
          "Etter krigen leter du etter navnet til Ruth i alle lister. Du finner det til slutt i en liste over dem som ble sendt med «Donau» til Auschwitz. Ingen av dem kom tilbake.",
          "**Til ettertanke:** De fleste som så det som skjedde, gjorde ingenting. Mange var redde, andre syntes det ikke angikk dem. Hva gjør at noen griper inn, mens andre ser bort?"
        ],
        lett: [
          "Du blir liggende. Om morgenen hører du at herr Feldmann blir hentet.",
          "En måned senere blir Ruth og resten av familien også tatt. Leiligheten er tom.",
          "Etter krigen finner du navnet til Ruth på en liste. Familien ble sendt til Auschwitz. Ingen kom tilbake.",
          "**Til ettertanke:** De fleste som så det, gjorde ingenting. Hvorfor griper noen inn, mens andre ser bort?"
        ]
      }
    },
    etterpaa: {
      sporsmal: [
        "Ingrids far er politimann. Hvilke valg hadde han, og hvilke valg hadde han ikke?",
        "Hva betyr det å «tilpasse seg», «gjøre motstand» og «samarbeide» under en okkupasjon? Finn eksempler i fortellingen.",
        "Var det rettferdig hvordan «tyskerjentene» ble behandlet etter krigen? Begrunn svaret.",
        "Hvorfor tror du noen grep inn for å hjelpe jødene, mens mange ikke gjorde det?"
      ],
      skriv: "Skriv en dagbokside fra Ingrid, skrevet 8. mai 1945. Hva tenker hun på når hun ser tilbake på de fem årene?",
      ekte: [
        [true, "Bergen ble tatt 9. april 1940, og «Königsberg» ble senket på havna dagen etter."],
        [true, "Radioene ble beslaglagt i 1941, og folk lyttet i hemmelighet til London."],
        [true, "Norsk politi arresterte jødene i oktober og november 1942, og over 500 ble sendt med «Donau»."],
        [true, "Kvinner som hadde vært sammen med tyske soldater, ble internert etter krigen, og staten ba om unnskyldning i 2018."],
        [false, "Ingrid, familien hennes, Ruth og familien Feldmann, Solveig."],
        [false, "Den illegale avisa og kontrollen ved Festningen."]
      ]
    },
    kontroller: [
      "Radioinndragningen: ordre i august 1941 (her: «august 1941» og «høsten 1941»).",
      "Arrestasjonene 26. oktober og 26. november 1942, og at over 500 ble sendt med «Donau».",
      "Tall: over 770 deportert, «noen få titalls» overlevde (ofte oppgitt 34–38); rundt halvparten flyktet.",
      "Unnskyldningen til «tyskerjentene» fra statsminister Erna Solberg i oktober 2018.",
      "Fluktruten Hardanger–fjellet–Sverige er oppdiktet; sjekk at den virker rimelig for elevene."
    ]
  },

  {
    id: "berlin-1961", tittel: "Muren", undertittel: "Øst-Berlin, 1961–1989", ikon: "🧱", farger: ["#3a3f47", "#d9534f"],
    tema: "sf10-kalde-krigen", trinn: 10, ar: 1961,
    kort: "Du er Katrin, 15 år, fra Øst-Berlin. En søndagsmorgen i august 1961 våkner byen og er delt i to. Bestemor bor på den andre siden. Hva gjør du?",
    rolle: "Du er **Katrin Weber**, 15 år. Du bor i Øst-Berlin, i den kommunistiske staten DDR, like ved grensen til Vest-Berlin. Far jobber på en fabrikk og er medlem av partiet. Mor er sykepleier. Storebroren din Jürgen er 19. Bestemor bor bare noen gater unna – men i Vest-Berlin. Det er lørdag 12. august 1961.",
    rolleLett: "Du er **Katrin**, 15 år. Du bor i Øst-Berlin i DDR. Far er med i kommunistpartiet. Broren din Jürgen er 19. Bestemor bor like ved, men i Vest-Berlin. Det er august 1961.",
    start: "sondag",
    ord: {
      "DDR": "Den tyske demokratiske republikk – Øst-Tyskland, en kommunistisk stat fra 1949 til 1990.",
      "Vest-Berlin": "Den vestlige delen av Berlin, som hørte til Vest-Tyskland, men lå midt inne i DDR.",
      "piggtråd": "Ståltråd med skarpe pigger, brukt til gjerder.",
      "grensevakt": "En soldat som skal passe på grensen. Ved Berlinmuren hadde vaktene ordre om å skyte.",
      "Stasi": "DDRs hemmelige politi. Stasi overvåket innbyggerne og hadde tusenvis av hemmelige informanter.",
      "informant": "En som i hemmelighet gir opplysninger om andre til politiet eller myndighetene.",
      "FDJ": "Freie Deutsche Jugend – DDRs ungdomsorganisasjon. Nesten alle unge var med.",
      "propaganda": "Informasjon som er laget for å påvirke hva folk mener, ofte ensidig eller usann.",
      "frikjøpt": "Her: Vest-Tyskland betalte DDR penger for å få politiske fanger løslatt."
    },
    noder: {
      sondag: {
        tekst: [
          "Du våkner tidlig søndag 13. august av lyden av lastebiler. Far står ved vinduet med kaffekoppen. «Endelig», sier han lavt.",
          "Nede i gata er det soldater. De ruller ut [[piggtråd]] tvers over gata, rett der fortauet går over til [[Vest-Berlin]]. På den andre siden står folk i nattøy og stirrer. En kvinne roper et navn igjen og igjen.",
          "Du skulle til bestemor i dag. Hun bor fire kvartaler unna. Nå står det en soldat med gevær mellom deg og henne.",
          "«Det er en beskyttelsesvoll mot fascistene i vest», sier far. Mor sier ingenting. Jürgen slår døra igjen etter seg."
        ],
        lett: [
          "Søndag morgen hører du lastebiler. Soldater ruller ut piggtråd tvers over gata.",
          "Byen er delt i to. Bestemor bor på den andre siden. Nå kan du ikke gå til henne.",
          "Far sier at muren skal beskytte dere. Mor sier ingenting. Jürgen er sint."
        ],
        kilde: { tittel: "Fakta: 13. august 1961", tekst: "Fra [[DDR]] ble grunnlagt i 1949 og fram til 1961, flyktet rundt 2,7 millioner mennesker til Vest-Tyskland – mange av dem gjennom Berlin. Natt til 13. august 1961 stengte DDR grensen. Først kom piggtråd, så en mur. DDR kalte den «den antifascistiske beskyttelsesvollen». I virkeligheten skulle den hindre egne innbyggere i å flykte.", lett: "Mange flyktet fra Øst-Tyskland til Vest-Tyskland. 13. august 1961 stengte DDR grensen i Berlin. Muren skulle stoppe folk fra å flykte." },
        valg: [
          { t: "Løpe ned til piggtråden for å se etter bestemor.", til: "piggtrad" },
          { t: "Bli inne. Far sier det er farlig.", til: "bernauer" }
        ]
      },
      piggtrad: {
        tekst: [
          "Ved piggtråden står det mange folk. Noen vinker, andre gråter. Du ser bestemor på den andre siden. Hun har tatt på seg søndagskåpa. Hun rekker ut hånda, men en soldat roper at hun skal gå tilbake.",
          "Plutselig tar en ung [[grensevakt]] fart, hopper over piggtråden og løper inn i Vest-Berlin. Folk på vestsiden jubler. En fotograf tar bilde. Soldatene på din side ser på hverandre. Én av dem ser ut som han vil gjøre det samme."
        ],
        lett: [
          "Du ser bestemor på den andre siden av piggtråden. Hun strekker ut hånda, men en soldat jager henne bort.",
          "Plutselig hopper en ung soldat over piggtråden og løper over til vest. Folk jubler."
        ],
        kilde: { tittel: "Fakta: hoppet over piggtråden", tekst: "15. august 1961 hoppet den 19 år gamle grensesoldaten Conrad Schumann over piggtråden til Vest-Berlin. Fotografiet av hoppet ble et av de mest kjente bildene fra den kalde krigen.", lett: "En ung grensesoldat hoppet over piggtråden i 1961. Bildet av ham ble veldig kjent." },
        valg: [ { t: "Gå hjem.", til: "bernauer" } ]
      },
      bernauer: {
        tekst: [
          "Noen dager senere tar Jürgen deg med til Bernauer Straße. Her er grensen helt spesiell: Husene ligger i øst, men fortauet utenfor er i vest. Soldatene har murt igjen dørene mot gata. Folk hopper ut av vinduene og ned på fortauet i vest, der brannmenn står med presenning for å ta imot dem.",
          "Jürgen stopper foran et hus der en venn av ham bor i tredje etasje. «I natt», hvisker han. «Brannvesenet er der hele tiden. Kommer du?»"
        ],
        lett: [
          "Jürgen tar deg med til en gate der husene er i øst, men fortauet er i vest.",
          "Folk hopper ut av vinduene og ned i vest. Brannmenn tar imot dem.",
          "«Jeg hopper i natt», sier Jürgen. «Kommer du?»"
        ],
        kilde: { tittel: "Fakta: Bernauer Straße", tekst: "I Bernauer Straße gikk grensen langs husveggene. I de første ukene etter 13. august hoppet mange ut av vinduene for å komme til vest. Brannvesenet i Vest-Berlin sto klar med nett. Noen skadet seg, og noen døde. Senere ble beboerne tvangsflyttet, og husene ble revet. I dag er det et minnested for muren der.", lett: "I Bernauer Straße hoppet folk ut av vinduene for å komme til vest. Noen døde. Senere ble husene revet." },
        valg: [
          { t: "Bli med Jürgen.", til: "vinduet" },
          { t: "Bli hjemme hos mor og far.", til: "alene" }
        ]
      },
      vinduet: {
        tekst: [
          "Klokka tre om natta står dere i en mørk leilighet. Vinduet er åpent. Nede på fortauet står fire brannmenn med et nett. En av dem vinker.",
          "Men på gata nedenfor ser du lommelykter. Folkepolitiet patruljerer på østsiden, bare noen meter unna. Jürgen knyter sammen laken til et tau. «Vi kan klatre ned i stedet for å hoppe», sier han. «Det tar fem minutter.»"
        ],
        lett: [
          "Det er natt. Dere står ved et åpent vindu. Brannmenn står klare med et nett nede på gata.",
          "Men du ser politi i nærheten. Jürgen vil klatre ned med et tau av laken. Det tar fem minutter."
        ],
        valg: [
          { t: "Hoppe nå, med en gang.", til: "vest" },
          { t: "Vente på tauet. Det er tryggere enn å hoppe.", til: "fanget" }
        ]
      },
      vest: {
        slutt: "Vest-Berlin",
        tekst: [
          "Du lukker øynene og hopper. Fallet varer et sekund og en evighet. Så treffer du nettet, og noen griper deg. Jürgen lander like etter. En brannmann gir dere et teppe. «Willkommen», sier han.",
          "Bestemor gråter når hun åpner døra. Men morgenen etter forstår du hva du har gjort: Mor og far er på den andre siden. Du får ikke besøke dem. Brevene blir åpnet og lest av [[Stasi]].",
          "Først i 1989 – 28 år senere – faller muren. Du er 43 år og har to barn. Du går gjennom porten ved Brandenburger Tor og banker på døra til foreldrene dine.",
          "**Slik gikk det:** Mange familier ble delt av muren i 28 år. Minst 140 mennesker ble drept ved muren i Berlin."
        ],
        lett: [
          "Du hopper. Brannmennene tar deg imot. Jürgen kommer etter.",
          "Bestemor gråter av glede. Men nå kan du ikke besøke mor og far.",
          "Først i 1989 faller muren. Da er du 43 år. Endelig kan du besøke foreldrene dine.",
          "**Slik gikk det:** Minst 140 mennesker ble drept ved muren i Berlin."
        ]
      },
      fanget: {
        slutt: "Fanget",
        tekst: [
          "Jürgen kommer seg ned først. Akkurat da du klatrer ut av vinduet, slås døra til leiligheten inn. Folkepolitiet drar deg inn igjen.",
          "Du blir dømt for «republikkflukt» og sitter i fengsel i over et år. Avhørene foregår om natta. En dag får du vite at du skal løslates – og sendes til vest. Vest-Tyskland har betalt penger for å få deg fri.",
          "**Slik gikk det:** Fra 1963 til 1989 ble over 30 000 politiske fanger i DDR [[frikjøpt]] av Vest-Tyskland. DDR fikk betalt i penger og varer. For DDR var det en viktig inntekt."
        ],
        lett: [
          "Jürgen kommer seg ned. Men politiet tar deg før du kommer ut.",
          "Du sitter i fengsel i over et år. Så blir du sendt til vest. Vest-Tyskland har betalt for å få deg fri.",
          "**Slik gikk det:** Over 30 000 fanger fra DDR ble kjøpt fri av Vest-Tyskland."
        ]
      },
      alene: {
        tekst: [
          "Jürgen kommer seg over. Et kort fra bestemor sier bare: «Pakken er kommet fram.» Far snakker ikke om ham mer.",
          "Et år senere, i august 1962, hører du på vestlig radio i hemmelighet. En 18 år gammel gutt er skutt ved muren og har ligget og blødd i nesten en time uten at noen hjalp ham. I avisene i øst står det ingenting.",
          "På skolen er alle med i [[FDJ]]. En dag blir du kalt inn til rektor. En mann i grå dress sitter der. Han sier at du kan få studere til lærer – hvis du hjelper dem. «Vi vil bare vite hva klassekameratene dine snakker om. Hvem hører på vestlig radio? Hvem snakker om å flykte?»"
        ],
        lett: [
          "Jürgen kommer seg over til vest. Far snakker ikke om ham mer.",
          "I 1962 hører du på vestlig radio at en ung gutt er skutt ved muren. I østtyske aviser står det ingenting.",
          "En mann fra det hemmelige politiet vil at du skal fortelle hva klassekameratene dine sier. Da kan du få studere."
        ],
        kilde: { tittel: "Fakta: Stasi", tekst: "[[Stasi]] var DDRs hemmelige politi. Ved siden av de ansatte hadde Stasi rundt 180 000 uoffisielle [[informant]]er i 1989 – venner, naboer, kolleger og familiemedlemmer som rapporterte om andre. Også ungdommer ble rekruttert. Mange fikk fordeler, for eksempel studieplass, hvis de samarbeidet.", lett: "Stasi var det hemmelige politiet i DDR. Mange vanlige folk rapporterte i hemmelighet om venner og familie." },
        valg: [
          { t: "Si ja. Du vil bli lærer, og det er jo bare småprat.", til: "informant" },
          { t: "Si nei, selv om det kan koste deg studieplassen.", til: "tunnel-melding" }
        ]
      },
      informant: {
        slutt: "Informanten",
        tekst: [
          "Hver måned møter du mannen i den grå dressen i en leilighet. Du forteller om hvem som hører på vestlig musikk, og hvem som har slektninger i vest. Det føles ufarlig. Du får studieplass og blir lærer.",
          "I november 1989 faller muren. To år senere åpnes Stasi-arkivene, og vanlige folk kan lese mappene om seg selv. En dag ringer Heike, den beste venninnen din fra skolen. Hun har lest mappa si. «Jeg vet at det var deg», sier hun. Så legger hun på.",
          "**Til ettertanke:** Etter 1992 har millioner av tyskere søkt om å få se Stasi-mappene sine. Mange oppdaget at venner eller familie hadde rapportert om dem. Hvorfor tror du folk sa ja til å bli informanter?"
        ],
        lett: [
          "Du forteller Stasi om klassekameratene dine. Du får studere og blir lærer.",
          "I 1989 faller muren. Senere kan folk lese hva Stasi skrev om dem. Venninnen din Heike leser mappa si. Hun vet at det var deg.",
          "**Til ettertanke:** Hvorfor tror du mange sa ja til å rapportere om andre?"
        ]
      },
      "tunnel-melding": {
        tekst: [
          "Du sier nei. Neste år får du ikke studieplass. Du begynner å jobbe på en tekstilfabrikk.",
          "En høstdag i 1964 kommer en fremmed mann bort til deg på trikken. Han legger en lapp i hånda di og går av på neste stopp. Det er Jürgens håndskrift: «Strelitzer Straße 55. Lørdag kveld. Si ‘Tokio’ ved døra. Ta bare med det du har på deg.»",
          "Du skjønner hva det er. En tunnel. Men hvis du drar, ser du kanskje aldri mor og far igjen."
        ],
        lett: [
          "Du sier nei. Du får ikke studere og må jobbe på en fabrikk.",
          "I 1964 får du en lapp fra Jürgen. Det er en adresse og et passord. Du skjønner at det er en hemmelig tunnel under muren.",
          "Men hvis du drar, ser du kanskje aldri mor og far igjen."
        ],
        valg: [
          { t: "Gå til adressen lørdag kveld.", til: "tunnelen" },
          { t: "Brenne lappen og bli hos mor og far.", til: "fall" }
        ]
      },
      tunnelen: {
        slutt: "Tunnelen",
        tekst: [
          "I bakgården på Strelitzer Straße står en ung mann i skyggen. Du sier «Tokio». Han peker mot et gammelt toalett i bakgården. I gulvet er det et hull og en stige. Tunnelen er bare 70 centimeter høy. Du kryper i 145 meter på albuer og knær i mørket.",
          "På den andre siden står Jürgen og trekker deg opp i en kjeller i Vest-Berlin. Den natta og den neste kommer 57 mennesker gjennom tunnelen. Natt nummer to blir tunnelen oppdaget, og det blir skyting. En ung østtysk grensesoldat blir drept.",
          "**Slik gikk det:** «Tunnel 57» er en av de mest kjente flukttunnelene. DDR sa at fluktmennene hadde drept soldaten. Etter murens fall viste dokumenter at han trolig ble truffet av en kollega. Mange tunneler ble gravd under muren – de fleste ble oppdaget før de var ferdige."
        ],
        lett: [
          "I en bakgård er det et hull i gulvet. Tunnelen er lav og trang. Du kryper i mørket i 145 meter.",
          "Jürgen trekker deg opp på den andre siden. 57 mennesker flykter gjennom tunnelen. Så blir den oppdaget, og en grensesoldat blir drept.",
          "**Slik gikk det:** Mange tunneler ble gravd under muren. De fleste ble oppdaget før de var ferdige."
        ]
      },
      fall: {
        slutt: "Muren faller",
        tekst: [
          "Du blir i øst. Du gifter deg, får barn og jobber på sykehuset som mor. Livet er trygt, men trangt. Du kan ikke reise vestover, og du snakker forsiktig selv med naboene.",
          "Høsten 1989 demonstrerer tusenvis av mennesker i Leipzig og Berlin: «Wir sind das Volk!» – «Vi er folket!». Torsdag 9. november sier en partileder på TV at grensen åpnes «med en gang». Den kvelden går du og tusenvis av andre til grenseovergangen ved Bornholmer Straße. Vaktene vet ikke hva de skal gjøre. Klokka halv tolv åpner de bommen.",
          "På den andre siden står en gammel kvinne og leter i folkemengden. Det er bestemor. Hun er 88 år.",
          "**Slik gikk det:** Muren sto fra 1961 til 1989. Året etter, i 1990, ble Øst- og Vest-Tyskland samlet igjen."
        ],
        lett: [
          "Du blir i øst. Du får jobb, familie og barn. Men du kan ikke reise fritt eller si hva du mener.",
          "I 1989 demonstrerer mange mennesker. 9. november åpnes grensen. Du går over til vest.",
          "På den andre siden venter bestemor. Hun er 88 år.",
          "**Slik gikk det:** I 1990 ble Tyskland samlet igjen."
        ]
      }
    },
    etterpaa: {
      sporsmal: [
        "Hvorfor bygde DDR muren? Sammenlign det DDR sa, med det som var den virkelige grunnen.",
        "Hva er propaganda? Finn eksempler i fortellingen.",
        "Hvorfor tror du noen sa ja til å bli informanter for Stasi?",
        "Hvordan påvirket den kalde krigen hverdagen til vanlige familier i Berlin?"
      ],
      skriv: "Skriv et brev fra Katrin til bestemor i Vest-Berlin. Husk at Stasi kan lese brevet – hva tør hun å skrive?",
      ekte: [
        [true, "Grensen ble stengt 13. august 1961, og muren sto til 9. november 1989."],
        [true, "I Bernauer Straße hoppet folk ut av vinduene, og brannvesenet i vest tok imot dem."],
        [true, "Conrad Schumann hoppet over piggtråden 15. august 1961."],
        [true, "«Tunnel 57» i oktober 1964, Stasi-arkivene og frikjøpet av fanger."],
        [false, "Katrin, Jürgen, bestemor, Heike og familien Weber."],
        [false, "Lappen på trikken og akkurat hva som skjedde i leiligheten i Bernauer Straße."]
      ]
    },
    kontroller: [
      "Rundt 2,7 millioner flyktet fra DDR 1949–1961 (tallene varierer mellom kilder).",
      "Minst 140 drept ved muren i Berlin (Gedenkstätte Berliner Mauer).",
      "Tunnel 57: 3.–5. oktober 1964, 57 personer, ca. 145 meter lang, inngang i Strelitzer Straße 55; passordet «Tokio».",
      "Rundt 180 000 uoffisielle Stasi-informanter i 1989; arkivene ble åpnet for innsyn i januar 1992.",
      "Frikjøp av over 30 000 politiske fanger 1963–1989.",
      "Bornholmer Straße åpnet ca. kl. 23.30 den 9. november 1989."
    ]
  },

  {
    id: "montgomery-1955", sprak: "en", tittel: "The Bus", undertittel: "Montgomery, Alabama, 1955–1956", ikon: "🚌", farger: ["#2f3b52", "#e8b04a"],
    tema: "en10-oppression", trinn: 10, ar: 1955,
    kort: "You are Ruby, 15, in Montgomery, Alabama. A woman has been arrested for not giving up her seat on the bus. Tomorrow, everyone is talking about a boycott. What will you do?",
    rolle: "You are **Ruby Jackson**, 15 years old. You live in Montgomery, Alabama, with your mother, your father and two younger brothers. Your mother is a maid for a white family across town, and she takes the bus every day. Your father is a carpenter. In Alabama, the law says that Black people and white people must be kept apart – in schools, in restaurants and on the buses. It is Friday, 2 December 1955.",
    rolleLett: "You are **Ruby**, 15. You live in Montgomery, Alabama, in the USA. Your mother cleans houses for a white family and takes the bus every day. In Alabama, Black and white people must be kept apart by law. It is December 1955.",
    start: "leaflet",
    ord: {
      "segregation": "Keeping people apart because of their race, for example in separate schools or separate seats on a bus.",
      "boycott": "When people refuse to buy or use something as a protest.",
      "leaflet": "A small printed paper with information, given out to many people.",
      "maid": "A woman who is paid to clean and cook in another family’s home.",
      "carpool": "When people share cars to get to work or school.",
      "mass meeting": "A big meeting for everyone in a community, often held in a church.",
      "lawsuit": "When someone takes a case to court.",
      "unconstitutional": "Against the Constitution, the highest law of the USA.",
      "Great Migration": "When millions of Black Americans moved from the South to cities in the North and West, about 1910–1970."
    },
    noder: {
      leaflet: {
        tekst: [
          "At school, your English teacher, Miss Carter, closes the classroom door. She takes a pile of papers out of her bag. «I need help», she says quietly. «Mrs. Rosa Parks was arrested yesterday. She would not give up her seat on the bus to a white man.»",
          "The [[leaflet]] says: *Another woman has been arrested. Don’t ride the buses to work, to town, to school, or anywhere on Monday.*",
          "You think of Claudette Colvin. She was 15, like you, when she was arrested in March for the same thing. The police dragged her off the bus. Everybody at school talked about it for weeks.",
          "«We printed thousands of these last night», says Miss Carter. «They must be in every house in Montgomery by Sunday.»"
        ],
        lett: [
          "Your teacher, Miss Carter, has a pile of papers. «Mrs. Rosa Parks was arrested», she says. «She did not give her seat on the bus to a white man.»",
          "The paper says: *Don’t ride the bus on Monday.*",
          "You remember Claudette Colvin. She was 15, like you, when she was arrested for the same thing.",
          "«These must be in every house by Sunday», says Miss Carter."
        ],
        kilde: { tittel: "Fact: the bus rules in Montgomery", tekst: "On Montgomery’s buses, the front seats were for white passengers. Black passengers often had to pay at the front, get off, and walk to the back door to get on again. If the white section was full, the driver could order Black passengers to give up their seats. About three out of four bus passengers in Montgomery were Black. The leaflets were written and printed overnight by Jo Ann Robinson and the Women’s Political Council.", lett: "On the buses, the front seats were for white people. Black people had to sit at the back. Sometimes they had to stand up for white people. Most bus passengers were Black." },
        valg: [
          { t: "Take a pile of leaflets and hand them out in your street.", til: "handout" },
          { t: "Take one leaflet home and show it to your parents first.", til: "home" }
        ]
      },
      handout: {
        tekst: [
          "On Saturday, you walk from house to house with your little brother. You push leaflets under doors and give them to people on their porches. Some people read them and nod. An old man shakes your hand.",
          "But Mrs. Davis next door shakes her head. «Child, I work for a white lady on the other side of town. If I don’t come on Monday, I lose my job. Then who feeds my kids?»",
          "You don’t know what to answer."
        ],
        lett: [
          "On Saturday, you give leaflets to all the houses in your street. Some people are happy.",
          "But your neighbour, Mrs. Davis, is afraid. «If I don’t go to work, I lose my job», she says."
        ],
        valg: [ { t: "Wait for Monday.", til: "monday" } ]
      },
      home: {
        tekst: [
          "Your mother reads the leaflet at the kitchen table. Her hands are tired after a long day of cleaning. «Mrs. Henderson will be angry if I’m late», she says. «And it’s six miles.»",
          "Your father puts down his newspaper. «Six miles is a long way», he says. «But we’ve been standing in the back of that bus for twenty years.»",
          "Your mother is quiet for a long time. Then she folds the leaflet and puts it in her apron pocket."
        ],
        lett: [
          "Your mother reads the leaflet. «It is six miles to my job», she says. «My boss will be angry if I am late.»",
          "Your father says: «We have stood at the back of the bus for twenty years.»",
          "Your mother puts the leaflet in her pocket."
        ],
        valg: [ { t: "Wait for Monday.", til: "monday" } ]
      },
      monday: {
        tekst: [
          "On Monday morning you stand at the corner and watch. The first bus comes. It is almost empty – just two white passengers. The next bus is empty too. People are walking everywhere: men in work clothes, women carrying bags, students in groups. Some Black taxi drivers are only charging ten cents, the same as the bus.",
          "Your mother has left at five o’clock to walk to work.",
          "Tonight there is a [[mass meeting]] at Holt Street Baptist Church. Everyone is going – but somebody has to stay with your little brothers."
        ],
        lett: [
          "On Monday, the buses are empty. Everybody is walking.",
          "Your mother left at five in the morning to walk to work.",
          "Tonight there is a big meeting in a church. But someone must look after your little brothers."
        ],
        valg: [
          { t: "Go to the mass meeting.", til: "meeting" },
          { t: "Stay at home with your brothers.", til: "walking" }
        ]
      },
      meeting: {
        tekst: [
          "The church is full long before the meeting starts. Thousands of people are standing outside in the cold, listening through loudspeakers. You squeeze in at the back.",
          "A young minister walks up to the pulpit. He is only 26. His name is Martin Luther King Jr. He talks about being tired – tired of being pushed around, tired of being humiliated. He says that protesting for what is right is part of being a citizen in a democracy. He says the protest must be peaceful.",
          "When the people vote to continue the [[boycott]] until the rules are changed, the whole church stands up and cheers. Nobody thought it would last more than a day. Now nobody knows how long it will last."
        ],
        lett: [
          "The church is full. Thousands of people stand outside.",
          "A young minister speaks. His name is Martin Luther King Jr. He says people are tired of being treated badly. He says the protest must be peaceful.",
          "Everybody votes to continue the boycott. Nobody knows how long it will last."
        ],
        kilde: { tittel: "Fact: the Montgomery Improvement Association", tekst: "On 5 December 1955, Black leaders in Montgomery formed the Montgomery Improvement Association (MIA). They chose Martin Luther King Jr., a new pastor in town, as their president. The boycott was supposed to last one day. It lasted 381 days.", lett: "Black leaders started a new group and chose Martin Luther King Jr. as leader. The boycott lasted 381 days." },
        valg: [ { t: "Go home and get ready for a long walk.", til: "walking" } ]
      },
      walking: {
        tekst: [
          "The weeks go by. Christmas comes and goes. Your mother walks twelve miles a day, to work and back. Her shoes wear out, and your father fixes them with pieces of rubber from an old tyre.",
          "The MIA organises a [[carpool]] with hundreds of cars. Church parking lots become «stations» where people wait for rides. They need young people to help organise the queues and the lists of drivers.",
          "But money is short at home. Mrs. Henderson has cut your mother’s hours because she is often late. A white family on your mother’s street needs a babysitter after school."
        ],
        lett: [
          "Weeks go by. Your mother walks twelve miles every day. Her shoes break.",
          "People share cars. They need young people to help organise the cars.",
          "But your family needs money. A white family needs a babysitter after school."
        ],
        valg: [
          { t: "Volunteer at the carpool station.", til: "carpool" },
          { t: "Take the babysitting job to help your family.", til: "job" }
        ]
      },
      carpool: {
        tekst: [
          "Every afternoon you stand in the parking lot of a church with a list and a pencil. You write down who needs to go where, and you match them with drivers. Doctors, teachers and even a few white women give rides.",
          "But the city fights back. The police stop carpool drivers and give them tickets for driving too fast or too slow. On 30 January 1956, someone throws a bomb onto the porch of Dr. King’s house. His wife and baby daughter are inside. Nobody is hurt, but an angry crowd gathers. Dr. King tells them to go home peacefully.",
          "In February, more than 80 leaders of the boycott are arrested for breaking an old law against boycotts. Your father says: «It’s getting dangerous, Ruby. Maybe it’s time to stop.»"
        ],
        lett: [
          "Every afternoon you help at the church parking lot. You write lists of drivers and passengers.",
          "But the police stop the drivers. Someone throws a bomb at Dr. King’s house. Nobody is hurt.",
          "Many leaders are arrested. Your father says: «It is getting dangerous. Maybe you should stop.»"
        ],
        kilde: { tittel: "Fact: Browder v. Gayle", tekst: "In February 1956, four Black women – Aurelia Browder, Susie McDonald, Claudette Colvin and Mary Louise Smith – went to federal court. Their [[lawsuit]], Browder v. Gayle, said that segregation on the buses was [[unconstitutional]]. Claudette Colvin, now 16, was one of the witnesses.", lett: "Four Black women took the city to court. They said segregation on the buses was against the Constitution. Claudette Colvin was one of them." },
        valg: [
          { t: "Keep going. You won’t give up now.", til: "court" },
          { t: "Listen to your father and help in a quieter way.", til: "quiet" }
        ]
      },
      court: {
        slutt: "The courtroom",
        tekst: [
          "In May 1956, Miss Carter takes a few students to the federal court building. The room is full. You watch Claudette Colvin walk to the witness stand. She is only a year older than you. A lawyer asks her who the leader of the protest is. She looks straight at him and says that the leader is all the people.",
          "In June, the court decides that bus segregation is unconstitutional. The city appeals, but on 13 November 1956 the US Supreme Court agrees. On 21 December 1956, after 381 days, you get on a Montgomery bus through the front door – and sit down wherever you want.",
          "**What happened next:** The boycott made Martin Luther King Jr. famous and inspired protests across the South. But it was thousands of ordinary people – most of them women who walked to work every day – who made it work."
        ],
        lett: [
          "In May 1956, you watch Claudette Colvin speak in court. She is brave.",
          "The court says that segregation on buses is against the law. In December 1956, after 381 days, you get on the bus through the front door. You sit where you want.",
          "**What happened next:** Thousands of ordinary people made the boycott work."
        ]
      },
      quiet: {
        slutt: "The quiet helpers",
        tekst: [
          "You stop going to the parking lot. Instead, you help the women from church cook dinners that are sold at the mass meetings. The money buys gas for the carpool cars and new shoes for people who walk. You bake pies every Saturday until your arms ache.",
          "When the buses are finally integrated in December 1956, nobody writes your name in the newspapers. But your mother hugs you and says: «Those pies carried us there.»",
          "**Think about it:** The famous names in history are often men. But the Montgomery bus boycott was organised and carried out mostly by women – teachers, maids, cooks and students. Most of their names are not in any history book."
        ],
        lett: [
          "You stop helping at the parking lot. Instead you bake pies with the women from church. The money buys gas for the cars.",
          "In December 1956, the buses are open to everyone. Your mother says: «Your pies helped us.»",
          "**Think about it:** Most of the people in the boycott were women. Most of their names are not in history books."
        ]
      },
      job: {
        tekst: [
          "The Millers have a little girl called Susan. She is six and asks a lot of questions. One day she asks: «Why don’t you take the bus like before, Ruby?»",
          "You think for a long time. «Because the bus says I have to sit at the back», you say. «And I am not a back-seat person.» Susan thinks about it. «I don’t think you are either», she says.",
          "In March, Mrs. Henderson fires your mother. «I can’t have a maid who supports that boycott», she says. That evening, your father reads a letter from your uncle in Detroit. «There’s work in the car factories», he writes. «And nobody tells you where to sit on the bus.»"
        ],
        lett: [
          "You babysit a little girl called Susan. She asks why you don’t take the bus.",
          "«Because I have to sit at the back», you say. «And I don’t want to.»",
          "In March, your mother loses her job. Your uncle in Detroit writes: «There is work here. And you can sit where you want on the bus.»"
        ],
        valg: [
          { t: "Move to Detroit with your family.", til: "north" },
          { t: "Stay in Montgomery until the boycott is won.", til: "day381" }
        ]
      },
      north: {
        slutt: "Going north",
        tekst: [
          "You pack everything you own into two suitcases and take the train north. Detroit is huge, noisy and cold. Your father gets a job at a car factory, and your mother works in a hospital laundry.",
          "Nobody tells you where to sit on the bus. But you soon learn that the North has its own walls. Some neighbourhoods don’t want Black families. Some jobs are «for whites only», even if no sign says so.",
          "**What happened next:** During the [[Great Migration]], about six million Black Americans left the South. Rosa Parks herself moved to Detroit in 1957, after losing her job and receiving threats. She lived there for the rest of her life."
        ],
        lett: [
          "You move to Detroit. Your father works in a car factory.",
          "You can sit where you want on the bus. But there is racism in the North too.",
          "**What happened next:** About six million Black Americans moved from the South to the North. Rosa Parks also moved to Detroit."
        ]
      },
      day381: {
        slutt: "Day 381",
        tekst: [
          "You stay. Your mother finds work in a laundry run by a Black family. You keep babysitting Susan, and you walk to the Millers’ house every day – rain or shine.",
          "On 21 December 1956, you and your mother stand at the bus stop together for the first time in more than a year. The bus stops. The driver opens the front door. Your mother hesitates. Then she gets on, pays, and sits down in the first row. You sit beside her. Nobody says a word.",
          "**What happened next:** The bus boycott was a victory, but it was not the end. In the next years, there was violence against Black churches and homes in Montgomery. The struggle for civil rights continued for many years."
        ],
        lett: [
          "You stay in Montgomery. You walk everywhere for a whole year.",
          "On 21 December 1956, you and your mother take the bus together. You sit in the front row. Nobody says anything.",
          "**What happened next:** The fight for equal rights continued for many years."
        ]
      }
    },
    etterpaa: {
      sporsmal: [
        "Why do you think the boycott worked? Give at least two reasons.",
        "Why was it harder for some people, like Mrs. Davis, to join the boycott?",
        "Claudette Colvin was arrested nine months before Rosa Parks. Why do you think Rosa Parks became more famous?",
        "Can you think of a protest today where ordinary people use their choices as consumers – what they buy or use – to change something?"
      ],
      skriv: "Write a diary entry from Ruby on Monday, 5 December 1955 – the first day of the boycott.",
      ekte: [
        [true, "Rosa Parks was arrested on 1 December 1955, and Claudette Colvin, 15, in March 1955."],
        [true, "The leaflets, the mass meeting at Holt Street Baptist Church and the carpool system."],
        [true, "The bombing of Dr. King’s house and Browder v. Gayle."],
        [true, "The boycott lasted 381 days, and the buses were integrated on 21 December 1956."],
        [false, "Ruby, her family, Miss Carter, Mrs. Davis, the Hendersons and the Millers."],
        [false, "Exactly what Claudette Colvin said in court is retold, not quoted."]
      ]
    },
    kontroller: [
      "Busreglene i Montgomery (betale foran, gå inn bak; førerens rett til å flytte svarte passasjerer).",
      "Claudette Colvin arrestert 2. mars 1955 (15 år); vitne i Browder v. Gayle i mai 1956.",
      "Bombingen av Kings hus 30. januar 1956; tiltale mot 89 personer i februar 1956 («more than 80»).",
      "Høyesterett 13. november 1956; integrerte busser fra 21. desember 1956; 381 dager.",
      "Rosa Parks flyttet til Detroit i 1957. Great Migration: ca. 6 millioner.",
      "Talen til King er gjenfortalt, ikke sitert (opphavsrett)."
    ]
  },

  {
    id: "paris-1789", tittel: "Bakerdatteren", undertittel: "Paris, 1789–1794", ikon: "🥖", farger: ["#1f3a6b", "#d64545"],
    tema: "sf8-franske-revolusjonen", trinn: 8, ar: 1789,
    kort: "Du er Marie, 15 år, datter av en baker i Paris. Brødet er så dyrt at folk sulter – og alle ser på bakeren. Så kommer revolusjonen.",
    rolle: "Du er **Marie Lefèvre**, 15 år. Faren din har et lite bakeri i Faubourg Saint-Antoine, et arbeiderstrøk øst i Paris, like ved festningen Bastillen. Du står i disken fra klokka fem om morgenen. Storebroren din Jacques er 18 og jobber i et snekkerverksted. Det er juli 1789.",
    rolleLett: "Du er **Marie**, 15 år. Faren din er baker i Paris. Broren din Jacques er 18. Det er sommeren 1789, og brødet er veldig dyrt.",
    start: "brodet",
    ord: {
      "tredjestanden": "Alle som ikke var prester eller adelige – bønder, arbeidere og borgere. Omtrent 98 prosent av folket.",
      "sou": "En liten fransk mynt. En arbeider tjente rundt 20–30 sou om dagen.",
      "hamstre": "Å samle og gjemme varer, for eksempel for å selge dem dyrere senere.",
      "nasjonalforsamlingen": "Forsamlingen som tredjestanden dannet i 1789. Den skulle gi Frankrike en grunnlov.",
      "giljotin": "En maskin med et tungt blad som ble brukt til å henrette folk.",
      "terroren": "Tiden 1793–1794 da revolusjonsregjeringen arresterte og henrettet tusenvis av mennesker de mente var fiender.",
      "mistenkt": "Under terroren kunne folk arresteres bare fordi de ble mistenkt for å være mot revolusjonen.",
      "komité": "Her: et utvalg i hvert nabolag som holdt øye med folk og kunne angi dem som mistenkte."
    },
    noder: {
      brodet: {
        tekst: [
          "Køen utenfor bakeriet er lang allerede før det blir lyst. Et brød på fire pund koster nå nesten 15 [[sou]] – mer enn halvparten av det en arbeider tjener på en dag. Folk ser sinte på deg når du tar imot pengene.",
          "«Bakerne [[hamstre]]r mel!» roper en kvinne. «De vil at vi skal sulte!» Far rister på hodet. Han betaler selv dobbelt så mye for melet som i fjor, etter at haglet ødela kornet.",
          "Den 14. juli hører du kanonskudd. Jacques kommer løpende forbi med en øks i hånda. «Folket marsjerer mot Bastillen!» roper han. «Kom!»"
        ],
        lett: [
          "Brødet er veldig dyrt. Folk står i lang kø og er sinte.",
          "«Bakerne gjemmer mel!» roper en kvinne. Men far har ikke mer mel. Kornet ble ødelagt av vær.",
          "14. juli hører du skudd. Jacques løper forbi. «Vi skal storme Bastillen!» roper han. «Kom!»"
        ],
        kilde: { tittel: "Fakta: brødet og revolusjonen", tekst: "I 1788 ødela tørke og hagl mye av kornhøsten i Frankrike. Vinteren etter var svært kald. Sommeren 1789 kostet brød mer enn noen gang i løpet av hele århundret. For vanlige folk var brød den viktigste maten, og mange brukte over halvparten av lønna på det. Sult og sinne var en viktig grunn til at revolusjonen brøt ut.", lett: "Kornet slo feil i 1788. Brødet ble veldig dyrt, og mange sultet. Det gjorde folk sinte." },
        valg: [
          { t: "Løpe etter Jacques til Bastillen.", til: "bastillen" },
          { t: "Bli i bakeriet og hjelpe far.", til: "bakeriet" }
        ]
      },
      bastillen: {
        tekst: [
          "Det er tusenvis av mennesker foran den store festningen. Røyk, skrik og skudd. Noen soldater har gått over til folket og drar kanoner fram. Etter noen timer senkes vindebroa. Folkemengden strømmer inn.",
          "Jacques kommer ut med svart ansikt og et stort smil. «Den er vår!» Men på vei hjem ser du at noen bærer hodet til festningens sjef på en stake. Du kaster opp i en bakgård.",
          "Den kvelden sier far stille: «Nå blir ingenting som før.»"
        ],
        lett: [
          "Tusenvis av folk angriper festningen. Det er røyk og skudd. Til slutt tar folket Bastillen.",
          "Jacques jubler. Men du ser at noen er blitt drept. Du blir kvalm.",
          "Far sier: «Nå blir ingenting som før.»"
        ],
        valg: [ { t: "Fortsette.", til: "kvinnetoget" } ]
      },
      bakeriet: {
        tekst: [
          "Utenfor bakeriet samler det seg folk. Noen dunker på døra. «Åpne! Vi vet du har mel i kjelleren!»",
          "Far er blek. I kjelleren står tre sekker mel – det er alt dere har til resten av uka. Hvis folket tar dem, har dere ingenting å bake neste dag. Men hvis dere ikke åpner, kan de knuse vinduene – eller verre."
        ],
        lett: [
          "Folk dunker på døra til bakeriet. «Vi vet du har mel!» roper de.",
          "Dere har bare tre sekker mel igjen. Hvis folk tar dem, har dere ingenting i morgen."
        ],
        valg: [
          { t: "Åpne døra og vise dem kjelleren.", til: "kvinnetoget" },
          { t: "Stenge skodder og vente til de går.", til: "kvinnetoget" }
        ]
      },
      kvinnetoget: {
        tekst: [
          "Det blir høst. [[Nasjonalforsamlingen]] har vedtatt Erklæringen om menneskets og borgerens rettigheter: Alle mennesker er født frie og like i rettigheter. Men brødet er fortsatt dyrt.",
          "Om morgenen 5. oktober står hundrevis av kvinner på torget foran rådhuset – torgkoner, tjenestejenter og arbeiderkvinner. «Til Versailles!» roper de. «Kongen skal gi oss brød!» Noen har kjøkkenkniver, andre har kosteskaft. Det regner.",
          "Ei torgkone griper deg i armen. «Du er bakerdatter – du vet hva sult er. Bli med!»"
        ],
        lett: [
          "Det er høst. Revolusjonen har sagt at alle mennesker er frie og like. Men brødet er fortsatt dyrt.",
          "5. oktober samles hundrevis av kvinner. «Vi går til kongen i Versailles!» roper de. «Han skal gi oss brød!»",
          "En kvinne tar deg i armen. «Bli med!»"
        ],
        kilde: { tittel: "Fakta: kvinnetoget til Versailles", tekst: "5. oktober 1789 gikk flere tusen kvinner – og etter hvert også menn og soldater – rundt 20 kilometer i regnet fra Paris til slottet i Versailles. Dagen etter måtte kong Ludvig 16. og dronning Marie Antoinette bli med dem tilbake til Paris. Kvinnene ropte at de hadde med seg «bakeren, bakerkona og bakergutten» – kongen, dronningen og sønnen deres.", lett: "Tusenvis av kvinner gikk til Versailles i 1789. De tok med seg kongen og dronningen tilbake til Paris." },
        valg: [
          { t: "Bli med til Versailles.", til: "versailles" },
          { t: "Bli hjemme. Noen må bake brødet.", til: "klubben" }
        ]
      },
      versailles: {
        tekst: [
          "Dere går i seks timer. Skoene blir gjennomvåte, og du har ingenting å spise. Men kvinnene synger, og flere og flere blir med. Til slutt står dere foran de forgylte portene til Versailles.",
          "Neste dag kommer kongen ut på balkongen. Folkemengden roper. Om ettermiddagen ruller kongefamiliens vogner mot Paris, omringet av tusenvis av mennesker. Kvinnene bærer brød på spydene sine og synger: «Nå har vi bakeren, bakerkona og bakergutten!» Du synger med."
        ],
        lett: [
          "Dere går i seks timer i regnet. Til slutt kommer dere til slottet i Versailles.",
          "Neste dag må kongen bli med til Paris. Kvinnene synger og jubler. Du synger med."
        ],
        valg: [ { t: "Fortsette.", til: "klubben" } ]
      },
      klubben: {
        tekst: [
          "Årene går, og revolusjonen blir stadig mer radikal. I 1791 leser du et skrift av forfatteren Olympe de Gouges: «Erklæringen om kvinnens og borgerinnens rettigheter». Hun skriver at kvinner må få de samme rettighetene som menn.",
          "I januar 1793 blir kongen henrettet med [[giljotin]]en. Frankrike er i krig med nesten hele Europa. I nabolaget starter noen kvinner en politisk klubb. «Vi gikk til Versailles», sier de. «Nå vil vi ha stemmerett!»"
        ],
        lett: [
          "Revolusjonen fortsetter. En kvinne, Olympe de Gouges, skriver at kvinner må få de samme rettighetene som menn.",
          "I 1793 blir kongen henrettet. Noen kvinner starter en politisk klubb. De vil ha stemmerett."
        ],
        valg: [
          { t: "Bli med i kvinneklubben.", til: "kvinneklubben" },
          { t: "Holde deg unna politikken og passe bakeriet.", til: "terroren" }
        ]
      },
      kvinneklubben: {
        slutt: "Kvinneklubben",
        tekst: [
          "Dere møtes i et kirkerom to ganger i uka, med trikolorbånd i håret. Dere diskuterer brødpriser, krigen og kvinners rett til å stemme og bære våpen.",
          "Men høsten 1793 bestemmer Nasjonalkonventet at alle kvinneklubber skal forbys. Kvinner skal holde seg hjemme, sier de. Noen uker senere blir Olympe de Gouges henrettet.",
          "**Slik gikk det:** Revolusjonen lovet frihet og likhet, men ikke for kvinner. Franske kvinner fikk ikke stemmerett før i 1944 – 150 år senere."
        ],
        lett: [
          "Du er med i klubben. Dere snakker om brød, krig og stemmerett for kvinner.",
          "Høsten 1793 blir alle kvinneklubber forbudt. Olympe de Gouges blir henrettet.",
          "**Slik gikk det:** Franske kvinner fikk ikke stemmerett før i 1944."
        ]
      },
      terroren: {
        tekst: [
          "Høsten 1793 begynner det folk kaller [[terroren]]. En ny lov sier at alle som er [[mistenkt]] for å være mot revolusjonen, kan arresteres. Hver uke ruller vogner med fanger mot giljotinen.",
          "En kveld kommer to menn fra nabolagets [[komité]] inn i bakeriet. «Kjøpmann Duval selger mel dyrere enn makspris», sier den ene. «Du ser alt fra disken din, borgerinne. Skriv under her på at du har sett det, så tar vi ham.»",
          "Duval er gammel og gretten. Men du har aldri sett ham selge mel for dyrt."
        ],
        lett: [
          "I 1793 begynner terroren. Folk kan arresteres bare fordi de er mistenkt.",
          "To menn kommer til bakeriet. «Skriv under på at kjøpmann Duval selger mel for dyrt», sier de.",
          "Men du har aldri sett det."
        ],
        kilde: { tittel: "Fakta: terroren", tekst: "Fra september 1793 til juli 1794 styrte Robespierre og Velferdskomiteen Frankrike med harde midler. Rundt 17 000 mennesker ble dømt til døden og henrettet, og enda flere døde i fengsel eller uten dom. Mange ble angitt av naboer – noen av overbevisning, andre av frykt eller for å bli kvitt en uvenn.", lett: "I 1793–1794 ble rundt 17 000 mennesker henrettet. Mange ble angitt av naboene sine." },
        valg: [
          { t: "Skrive under. Det er farlig å si nei til komiteen.", til: "angiveren" },
          { t: "Nekte. Du vil ikke lyve.", til: "mistenkt" }
        ]
      },
      angiveren: {
        slutt: "Angiveren",
        tekst: [
          "Du skriver navnet ditt med skjelvende hånd. To dager senere blir Duval hentet. Butikken hans blir stengt, og en måned senere står navnet hans på lista over henrettede.",
          "I juli 1794 blir Robespierre selv styrtet og henrettet. Terroren tar slutt. Folk begynner å snakke om hvem som angav hvem. Duvals datter står i køen i bakeriet hver morgen. Hun ser på deg, men sier ingenting.",
          "**Til ettertanke:** Under terroren var det farlig å si nei. Men også de som angav andre, gjorde et valg. Hva ville du gjort?"
        ],
        lett: [
          "Du skriver under. Duval blir arrestert og henrettet.",
          "I 1794 blir Robespierre selv henrettet, og terroren tar slutt. Duvals datter ser på deg hver dag i bakeriet.",
          "**Til ettertanke:** Det var farlig å si nei. Men det var også et valg å angi andre."
        ]
      },
      mistenkt: {
        tekst: [
          "Mennene går uten et ord. Tre dager senere blir far arrestert. Anklagen: Han skal ha [[hamstre]]t mel og være «en fiende av folket».",
          "Mor gråter ved kjøkkenbordet. Jacques, som nå er soldat, er ved fronten. Det er bare deg igjen. En nabo hvisker at du kan gå til komiteen og tale fars sak – eller dere kan selge bakeriet og flykte til tanta deres på landet før de kommer etter dere også."
        ],
        lett: [
          "Tre dager senere blir far arrestert. De sier at han har gjemt mel.",
          "Du kan gå til komiteen og forsvare far. Eller dere kan flykte fra Paris."
        ],
        valg: [
          { t: "Gå til komiteen og forsvare far.", til: "termidor" },
          { t: "Flykte fra Paris med mor.", til: "landet" }
        ]
      },
      termidor: {
        slutt: "Termidor",
        tekst: [
          "Du står foran komiteen med mel på forkleet. Du forteller om sekkene i kjelleren, om haglet i 1788 og om alle brødene far har gitt bort til fattige. Mennene skriver og hvisker. Far blir sittende i fengsel.",
          "Så, i juli 1794 – i måneden revolusjonen kaller *termidor* – blir Robespierre styrtet. Fengslene åpnes. En morgen står far i døra, mager og grå i håret. Han tar på seg forkleet og fyrer opp i ovnen uten å si noe.",
          "**Slik gikk det:** Etter terroren ble revolusjonen roligere. Men Frankrike var fortsatt i krig og urolig. I 1799 tok generalen Napoleon Bonaparte makten."
        ],
        lett: [
          "Du forsvarer far foran komiteen. Men han blir sittende i fengsel.",
          "I juli 1794 blir Robespierre styrtet. Fengslene åpnes, og far kommer hjem.",
          "**Slik gikk det:** I 1799 tok Napoleon makten i Frankrike."
        ]
      },
      landet: {
        slutt: "Flukten fra Paris",
        tekst: [
          "Dere selger ovnen og disken for nesten ingenting og tar diligencen sørover. Tanta deres bor i en liten landsby i Burgund. Her er det ingen giljotin og ingen komité – men heller ikke mye mat.",
          "Om høsten får dere et brev: Far er sluppet fri etter at Robespierre falt. Men han er syk etter månedene i fengselet. Han kommer til landsbyen og baker brød i tantas gamle steinovn.",
          "**Til ettertanke:** Revolusjonen ga franskmennene viktige rettigheter som vi tar for gitt i dag. Men for mange vanlige folk var årene 1789–1794 også preget av sult, frykt og vold. Kan begge deler være sant samtidig?"
        ],
        lett: [
          "Dere flykter til en landsby. Der er det tryggere, men lite mat.",
          "Om høsten kommer far ut av fengselet. Han er syk, men han kommer til dere.",
          "**Til ettertanke:** Revolusjonen ga viktige rettigheter, men også sult og frykt."
        ]
      }
    },
    etterpaa: {
      sporsmal: [
        "Hvorfor var brødet så viktig i den franske revolusjonen?",
        "Hvilken rolle spilte kvinnene i revolusjonen – og hva fikk de igjen for det?",
        "Hvorfor tror du så mange angav naboene sine under terroren?",
        "Var revolusjonen et fremskritt? Finn argumenter både for og mot."
      ],
      skriv: "Skriv et innlegg som Marie kunne lest opp i kvinneklubben i 1793. Hva krever hun?",
      ekte: [
        [true, "Dårlig kornhøst i 1788 og rekordhøye brødpriser i 1789."],
        [true, "Stormingen av Bastillen 14. juli og kvinnetoget til Versailles 5.–6. oktober 1789."],
        [true, "Olympe de Gouges, forbudet mot kvinneklubber i 1793 og terroren 1793–1794."],
        [false, "Marie, familien Lefèvre, kjøpmann Duval og nabolagskomiteens besøk."],
        [false, "Akkurat hvordan bakeriet ble behandlet av folkemengden."]
      ]
    },
    kontroller: [
      "Brødprisen sommeren 1789 (her: nesten 15 sou for et firepundsbrød) og at en arbeider tjente 20–30 sou om dagen.",
      "Kvinnetoget: ca. 20 km, «bakeren, bakerkona og bakergutten».",
      "Terroren: rundt 17 000 dømt og henrettet. Kvinneklubbene forbudt 30. oktober 1793; Olympe de Gouges henrettet 3. november 1793.",
      "Franske kvinner fikk stemmerett i 1944."
    ]
  },

  {
    id: "akerselva-1870", tittel: "Fabrikkjenta ved Akerselva", undertittel: "Kristiania, 1870-årene", ikon: "🏭", farger: ["#3d3a35", "#c97b3d"],
    tema: "sf9-industrialiseringen", trinn: 9, ar: 1870,
    kort: "Du er Berit, 14 år, fra en husmannsplass i Solør. Det er ikke arbeid nok hjemme, men i Kristiania skal fabrikkene trenge jenter. Skal du dra?",
    rolle: "Du er **Berit Olsdatter**, 14 år. Du er nest eldst av sju søsken på en husmannsplass i Solør. Det er lite mat og ingen penger. Kusina di, Marte, har jobbet på et veveri ved Akerselva i Kristiania i to år. Hun er hjemme på besøk i juli 1871.",
    rolleLett: "Du er **Berit**, 14 år. Familien din er fattig og bor på landet. Kusina di, Marte, jobber på en fabrikk i Kristiania. Det er 1871.",
    start: "bygda",
    ord: {
      "husmannsplass": "Et lite jordstykke som en husmann leide av en bonde og betalte for med arbeid.",
      "veveri": "En fabrikk der det lages stoff på vevstoler.",
      "spinneri": "En fabrikk der bomull eller ull blir spunnet til tråd.",
      "formann": "En arbeidsleder som passet på arbeiderne i fabrikken.",
      "akkord": "Betaling for hvor mye du produserer, ikke for hvor lenge du jobber.",
      "sengeliggere": "Folk som leide en seng – ofte bare en del av døgnet – hos andre.",
      "leiegård": "Et stort bygård med mange små leiligheter som ble leid ut.",
      "fattigkassa": "Kommunens hjelp til de fattigste. Den som fikk hjelp, mistet ofte stemmeretten og fikk lite å bestemme selv."
    },
    noder: {
      bygda: {
        tekst: [
          "Marte har nye støvler og en hatt med bånd. Hun legger fem blanke speciedaler på bordet til tante. «Det er tre måneders sparing», sier hun. «På Hjula får vi lønn hver lørdag.»",
          "Om kvelden ligger dere i høyet og hvisker. «Det er tungt», sier Marte. «Tolv timer om dagen, og maskinene bråker så du blir døv. Men du er din egen. Ingen bonde som bestemmer over deg.»",
          "Neste dag kommer bonden på storgården og sier at han kan ta deg som budeie og tjenestejente. Lønna er kost, losji og et par sko i året."
        ],
        lett: [
          "Marte har nye klær og penger. «På fabrikken får vi lønn hver uke», sier hun.",
          "«Det er tungt å jobbe tolv timer om dagen», sier hun. «Men du bestemmer selv over pengene dine.»",
          "Bonden på gården vil også ha deg som tjenestejente. Da får du mat, seng og sko – men nesten ingen penger."
        ],
        kilde: { tittel: "Fakta: fra bygda til byen", tekst: "På 1800-tallet vokste folketallet i Norge raskt, men det var ikke jord og arbeid nok på landet. Mange flyttet til Amerika – og mange flyttet til byene. Kristiania vokste nesten fire ganger så stor fra 1865 til 1900. Langs Akerselva lå mange av de første store fabrikkene, fordi fossene ga kraft til maskinene.", lett: "Det var for lite arbeid på landet. Mange flyttet til byene. Langs Akerselva lå mange fabrikker, fordi vannet ga kraft til maskinene." },
        valg: [
          { t: "Bli med Marte til Kristiania.", til: "fabrikken" },
          { t: "Ta jobben på storgården.", til: "gard" }
        ]
      },
      gard: {
        slutt: "Tjenestejente på bygda",
        tekst: [
          "Du blir på bygda. Om sommeren går du på setra, om vinteren steller du fjøset og spinner ull. Du er nær familien, og du får se småsøsknene dine vokse opp.",
          "Men pengene strekker aldri til. Tre av søsknene dine reiser til Amerika de neste årene. Selv gifter du deg med en husmannsgutt og overtar en plass ikke langt fra den du vokste opp på.",
          "**Til ettertanke:** Mange ble igjen på bygdene. Livet der forandret seg også – med nye maskiner, meierier og bedre veier – men saktere enn i byene."
        ],
        lett: [
          "Du blir på bygda og jobber på gården. Du er nær familien.",
          "Men dere har lite penger. Tre søsken reiser til Amerika.",
          "**Til ettertanke:** Mange ble igjen på landet. Livet der forandret seg også, men saktere."
        ]
      },
      fabrikken: {
        tekst: [
          "Klokka er seks. Fløyta skriker over Sagene. Du står i en stor sal med hundre vevstoler som hamrer og slår. Lufta er full av bomullsstøv, og det er så varmt at svetten renner.",
          "[[Formann]]en viser deg hvordan du skal knytte tråder som ryker, uten å stoppe maskinen. «Er du rask, får du mer», sier han. Lønna er [[akkord]] – du får betalt for hvor mange meter stoff du lager.",
          "Ved siden av deg står Inga. Hun er bare elleve og så liten at hun må stå på en kasse. Hun gråter fordi trådene hennes ryker hele tiden, og formannen har truet med å trekke henne i lønn."
        ],
        lett: [
          "Klokka seks starter arbeidet. Maskinene bråker. Det er varmt og støvete.",
          "Du får betalt for hvor mye du lager. Er du rask, får du mer penger.",
          "Ved siden av deg står Inga. Hun er bare elleve år. Hun gråter, fordi hun ikke klarer å jobbe fort nok."
        ],
        kilde: { tittel: "Fakta: barn i fabrikkene", tekst: "I 1870-årene var mange av fabrikkarbeiderne barn og unge jenter. De jobbet ofte tolv timer om dagen, seks dager i uka. Kvinner fikk mye lavere lønn enn menn. Først i 1892 kom en lov som forbød barn under tolv år å jobbe i fabrikker, og som begrenset arbeidstiden for barn og unge.", lett: "Mange barn jobbet i fabrikkene, tolv timer om dagen. Først i 1892 ble det forbudt for barn under tolv år." },
        valg: [
          { t: "Jobbe så fort du kan. Du trenger pengene.", til: "ulykken" },
          { t: "Hjelpe Inga med trådene hennes, selv om du selv blir tregere.", til: "ulykken" }
        ]
      },
      ulykken: {
        tekst: [
          "Det går et halvt år. En dag i november skjer det som alle frykter. En jente ved maskinen to rader bortenfor får skjørtet sitt fanget i en reim. Hun blir dratt mot hjulet. Noen skriker, maskinen stopper – men det er for sent. Hånda hennes er knust.",
          "Neste dag er plassen hennes tom. Hun får ingen erstatning. «Hun var uforsiktig», sier formannen. Moren hennes må søke hjelp fra [[fattigkassa]].",
          "Om kvelden snakker noen av de eldste kvinnene om å gå til disponenten og kreve gjerder rundt reimene. «Men den som klager, kan miste jobben», sier Marte."
        ],
        lett: [
          "En dag får en jente skjørtet sitt fanget i en maskin. Hånda hennes blir knust.",
          "Hun får ingen penger fra fabrikken. «Hun var uforsiktig», sier formannen.",
          "Noen kvinner vil klage til sjefen. «Men da kan vi miste jobben», sier Marte."
        ],
        valg: [
          { t: "Bli med de eldre kvinnene til disponenten.", til: "oppsagt" },
          { t: "Holde deg utenfor. Familien hjemme trenger pengene.", til: "boligen" }
        ]
      },
      oppsagt: {
        slutt: "Sagt opp",
        tekst: [
          "Dere er fem kvinner som står med luene i hånda på disponentens kontor. Han lytter, nikker – og sier at han skal tenke på det. En uke senere får to av dere beskjed om at det ikke er arbeid lenger. Du er en av dem.",
          "Du får jobb hos en syerske i byen. Lønna er lav, men ingen maskin kan knuse hånda di. Mange år senere, i 1889, står du i folkemengden og hører fyrstikkarbeiderskene streike for bedre arbeidsforhold. Du roper høyest av alle.",
          "**Slik gikk det:** Først i 1890-årene kom de første lovene om arbeidervern i Norge. Fabrikktilsynet skulle kontrollere at maskinene var sikre. Lovene kom fordi arbeiderne organiserte seg og krevde dem."
        ],
        lett: [
          "Dere klager til sjefen. En uke senere mister du jobben.",
          "Du blir syerske. Mange år senere ser du arbeiderne streike for bedre forhold. Du heier på dem.",
          "**Slik gikk det:** I 1890-årene kom de første lovene som skulle beskytte arbeiderne."
        ]
      },
      boligen: {
        tekst: [
          "Du og Marte leier en seng i et rom hos en enke på Sagene. I rommet bor sju personer. Dere er [[sengeliggere]]: Om natta sover dere i senga, om dagen sover en mann som jobber nattskift på sagbruket der.",
          "Hver lørdag får du lønna i en liten konvolutt. Du kan sende penger hjem til mor, slik Marte gjør. Eller du kan sette dem i Sparebanken – en tobakkshandler i gata har sagt at du kunne bli med på å starte en liten butikk. Og så er det Johan, maskinisten med de blå øynene, som har spurt om du vil gå på dans."
        ],
        lett: [
          "Du bor i et lite rom med seks andre. Dere deler senger. Om dagen sover en annen i senga di.",
          "Hver lørdag får du lønn. Du kan sende penger hjem, spare i banken – eller gå på dans med Johan."
        ],
        valg: [
          { t: "Sette hver øre du kan i Sparebanken.", til: "butikken" },
          { t: "Sende penger hjem – og si ja til dansen med Johan.", til: "leiegarden" }
        ]
      },
      butikken: {
        slutt: "Høkerbutikken",
        tekst: [
          "I fire år lever du på grøt og sild og setter resten i banken. Kollegene kaller deg gjerrig. Men i 1878 har du nok til å leie et lite lokale i Thorvald Meyers gate sammen med tobakkshandlerens enke. Dere åpner en høkerbutikk med mel, kaffe, sukker og sild.",
          "Bydelen rundt dere vokser for hver måned. Nye [[leiegård]]er skyter opp, fulle av arbeiderfamilier. Mange av dem handler på krita hos deg til lønningsdagen.",
          "**Til ettertanke:** Industrialiseringen ga noen arbeidere muligheten til å komme seg opp og fram. Men de fleste ble værende i trange kår. Hva tror du skilte dem fra hverandre?"
        ],
        lett: [
          "Du sparer i fire år. Så åpner du en liten butikk.",
          "Byen vokser, og mange arbeiderfamilier handler hos deg.",
          "**Til ettertanke:** Noen arbeidere fikk et bedre liv, men de fleste forble fattige. Hvorfor?"
        ]
      },
      leiegarden: {
        slutt: "Leiegården",
        tekst: [
          "Johan og du gifter dere i Paulus kirke i 1877. Dere flytter inn i ett rom og kjøkken i en ny [[leiegård]] på Grünerløkka. Det er trangt, men det er deres eget. Snart har dere tre barn.",
          "Når barna blir syke av tyfus det første året, sitter du våken i mange netter. Det er ikke rent vann i alle gårdene, og doen i bakgården deles av tretti familier. Den minste blir frisk igjen.",
          "**Slik gikk det:** Arbeiderbydelene i Kristiania ble bygd svært raskt og tett. Mange familier bodde på ett rom. Først rundt år 1900 fikk byen vann og avløp i de fleste gårdene."
        ],
        lett: [
          "Du gifter deg med Johan. Dere får ett rom og et kjøkken i en ny bygård. Dere får tre barn.",
          "Barna blir syke av skittent vann. Den minste blir frisk igjen.",
          "**Slik gikk det:** Mange arbeiderfamilier bodde på ett rom. Det var lite rent vann."
        ]
      }
    },
    etterpaa: {
      sporsmal: [
        "Hvilke push- og pull-faktorer fikk Berit til å flytte til byen?",
        "Hvorfor jobbet så mange barn og unge jenter i fabrikkene?",
        "Hva kunne arbeiderne gjøre når forholdene var farlige? Hva var risikoen?",
        "Sammenlign Berits arbeidsdag med en arbeidsdag i Norge i dag. Hvilke lover og rettigheter har endret seg?"
      ],
      skriv: "Skriv et brev fra Berit til mor hjemme i Solør etter den første uka på fabrikken.",
      ekte: [
        [true, "Fabrikkene langs Akerselva, som Hjula Væveri, og at mange arbeidere var barn og unge jenter."],
        [true, "Tolv timers arbeidsdag, sengeliggere og trange leiegårder på Grünerløkka og Sagene."],
        [true, "Loven fra 1892 som forbød barnearbeid i fabrikker for barn under tolv år."],
        [false, "Berit, Marte, Inga, Johan og ulykken i fabrikken."],
        [false, "Høkerbutikken i Thorvald Meyers gate."]
      ]
    },
    kontroller: [
      "Kristianias vekst: nesten fire ganger så mange innbyggere i 1900 som i 1865 (ca. 57 000 → ca. 227 000).",
      "Fabrikktilsynsloven 1892: forbud mot fabrikkarbeid for barn under 12 år, begrenset arbeidstid for 12–18-åringer.",
      "Hjula Væveri (grunnlagt 1855) og arbeidstiden på 1870-tallet.",
      "Vann og avløp i Kristiania rundt 1900 er forenklet."
    ]
  },

  {
    id: "petrograd-1917", tittel: "Brød og fred", undertittel: "Petrograd, 1917–1918", ikon: "🚩", farger: ["#5a1414", "#e0b44a"],
    tema: "sf9-russiske-revolusjonen", trinn: 9, ar: 1917,
    kort: "Du er Anja, 16 år, og jobber på en tekstilfabrikk i Petrograd. Det er krig, det er kaldt og det er ikke brød. En morgen går kvinnene ut i gatene – og verden forandrer seg.",
    rolle: "Du er **Anja Petrova**, 16 år. Du bor med mor og lillesøsteren din i ett rom på Vyborg-siden, arbeiderstrøket i Petrograd – Russlands hovedstad. Du og mor jobber på en tekstilfabrikk, elleve timer om dagen. Storebroren din Misja er soldat ved fronten i krigen mot Tyskland. Det er 23. februar 1917, og det er minus 15 grader.",
    rolleLett: "Du er **Anja**, 16 år. Du jobber på en fabrikk i Petrograd i Russland. Broren din er soldat i krigen. Det er februar 1917. Det er kaldt, og det er lite mat.",
    start: "brod",
    ord: {
      "tsar": "Russlands keiser. Tsaren hadde nesten all makt.",
      "sovjet": "Russisk for «råd». Arbeidere og soldater valgte sine egne råd i 1917.",
      "bolsjevikene": "Det kommunistiske partiet ledet av Lenin. De tok makten i oktober 1917.",
      "den provisoriske regjeringen": "Den midlertidige regjeringen som styrte Russland fra mars til oktober 1917.",
      "den konstituerende forsamlingen": "En folkevalgt forsamling som skulle lage en ny grunnlov for Russland.",
      "Tsjeka": "Det hemmelige politiet bolsjevikene opprettet i desember 1917.",
      "borgerkrig": "En krig mellom grupper i samme land."
    },
    noder: {
      brod: {
        tekst: [
          "Du har stått i brødkø siden klokka fire om morgenen. Klokka sju kommer en mann ut av bakeriet og roper at det ikke er mer brød i dag. Kvinnene i køen roper og banner.",
          "På fabrikken er alle urolige. Det er den internasjonale kvinnedagen. Ved lunsjtid slipper en av de eldste arbeiderne vevskyttelen. «Nok!» roper hun. «Vi vil ha brød! Vi vil ha mennene våre hjem fra krigen!» Én etter én går kvinnene ut av fabrikken og ut i snøen.",
          "Formannen roper at alle som går, mister jobben. Mor ser på deg."
        ],
        lett: [
          "Du har stått i brødkø i mange timer. Så er brødet slutt.",
          "Det er kvinnedagen. På fabrikken roper en kvinne: «Vi vil ha brød! Vi vil ha mennene hjem fra krigen!» Mange går ut i gata.",
          "Formannen sier at alle som går, mister jobben."
        ],
        kilde: { tittel: "Fakta: kvinnedagen 1917", tekst: "23. februar 1917 (8. mars etter vår kalender) gikk tusenvis av kvinnelige tekstilarbeidere i Petrograd i streik for brød. I løpet av noen dager streiket hundretusenvis av arbeidere. Soldatene som ble sendt for å stoppe dem, gikk over til folket. 2. mars ga [[tsar]] Nikolaj 2. fra seg makten. Russland brukte en eldre kalender enn resten av Europa fram til 1918 – derfor har mange datoer fra revolusjonen to versjoner.", lett: "I februar 1917 streiket kvinnene i Petrograd for brød. Etter noen dager ble soldatene med på opprøret. Tsaren måtte gå av." },
        valg: [
          { t: "Gå ut sammen med kvinnene.", til: "tsaren" },
          { t: "Bli ved vevstolen. Familien har ikke råd til at du mister jobben.", til: "tsaren-inne" }
        ]
      },
      "tsaren-inne": {
        tekst: [
          "Du jobber til fløyta går klokka sju. Gjennom vinduet hører du rop og sang fra gata. Neste dag er fabrikken nesten tom, og formannen gir opp og stenger portene.",
          "I fem dager er byen i opprør. Så kommer nyheten: [[Tsar]]en har gått av. Folk klemmer fremmede på gata og river ned keiserørner fra butikkskiltene."
        ],
        lett: [
          "Du jobber videre. Utenfor hører du rop og sang.",
          "Etter fem dager kommer nyheten: Tsaren har gått av. Folk jubler i gatene."
        ],
        valg: [ { t: "Fortsette.", til: "april" } ]
      },
      tsaren: {
        tekst: [
          "Dere går over den frosne elva Neva mot sentrum, flere tusen kvinner. Politiet på hest prøver å stoppe dere. Neste dag er det enda flere – også menn fra metallfabrikkene. Etter tre dager nekter soldatene å skyte på folkemengden. Noen gir geværene sine til arbeiderne.",
          "2. mars kommer nyheten: [[Tsar]]en har gått av. Tre hundre år med tsarer fra samme familie er over. Du står på Nevskij prospekt og gråter av glede sammen med fremmede."
        ],
        lett: [
          "Dere går over den frosne elva. Hver dag blir dere flere. Til slutt vil ikke soldatene skyte på dere.",
          "2. mars går tsaren av. Folk jubler i gatene."
        ],
        valg: [ { t: "Fortsette.", til: "april" } ]
      },
      april: {
        tekst: [
          "Nå er det to som styrer: [[den provisoriske regjeringen]] og arbeidernes og soldatenes [[sovjet]]. Regjeringen gir ytringsfrihet og lover valg – også for kvinner. Men den vil fortsette krigen, og brødet er fortsatt dyrt.",
          "I april kommer Lenin tilbake fra eksil. På Finlandstasjonen står han på et pansret kjøretøy og taler til tusenvis: Ingen støtte til regjeringen! All makt til sovjetene! Fred, jord og brød!",
          "Venninnen din Olga har meldt seg som frivillig sykepleier ved et militærsykehus. «Det er der vi trengs», sier hun. Andre på fabrikken melder seg inn hos [[bolsjevikene]]."
        ],
        lett: [
          "Nå styrer en ny regjering. Den gir frihet og lover valg. Men krigen fortsetter, og brødet er dyrt.",
          "Lenin kommer tilbake til Russland. Han lover «fred, jord og brød».",
          "Venninnen din Olga blir sykepleier. Andre blir med i Lenins parti, bolsjevikene."
        ],
        valg: [
          { t: "Gå på bolsjevikenes møter.", til: "oktober" },
          { t: "Bli frivillig sykepleier med Olga.", til: "sykehuset" }
        ]
      },
      oktober: {
        tekst: [
          "Møtene er fulle av unge arbeidere og soldater. De snakker om en verden uten fattige og rike. Lenin har lovet det alle vil ha: fred med en gang. Du får et rødt armbind og deler ut aviser.",
          "Natt til 25. oktober inntar Røde garder og soldater de viktigste bygningene i byen. Du står i folkemengden utenfor Vinterpalasset når det blir tatt nesten uten kamp. Neste dag kunngjør Lenin at sovjetene har makten.",
          "Noen uker senere er det valg til [[den konstituerende forsamlingen]]. For første gang kan kvinner i Russland stemme. Bolsjevikene får bare rundt en firedel av stemmene. Et annet parti får flest. I januar møtes forsamlingen – og bolsjevikene stenger den etter én dag."
        ],
        lett: [
          "Du går på møtene. Du deler ut aviser for bolsjevikene.",
          "25. oktober tar bolsjevikene makten. De tar Vinterpalasset nesten uten kamp.",
          "Så er det valg. Kvinner kan stemme for første gang. Bolsjevikene taper valget. Men de stenger forsamlingen etter én dag."
        ],
        kilde: { tittel: "Fakta: oktoberrevolusjonen", tekst: "25. oktober 1917 (7. november etter vår kalender) tok bolsjevikene makten i Petrograd. I valget til den konstituerende forsamlingen i november fikk de rundt 24 prosent av stemmene. Forsamlingen møttes 5. januar 1918, men ble oppløst av bolsjevikene dagen etter. En fredelig demonstrasjon til støtte for forsamlingen ble møtt med skudd.", lett: "Bolsjevikene tok makten i oktober 1917. De tapte valget, men stengte den folkevalgte forsamlingen." },
        valg: [
          { t: "Bli med i demonstrasjonen for forsamlingen.", til: "forsamlingen" },
          { t: "Stole på partiet. Lenin vet hva som er best for arbeiderne.", til: "partiet" }
        ]
      },
      forsamlingen: {
        slutt: "Forsamlingen",
        tekst: [
          "5. januar 1918 går du sammen med tusenvis av andre mot Taurispalasset med bannere: «All makt til den konstituerende forsamlingen!» Plutselig smeller det. Soldater skyter inn i toget. Folk faller rundt deg. Du løper.",
          "Noen uker senere kommer to menn fra [[Tsjeka]], det nye hemmelige politiet, og spør etter deg på fabrikken. Du flykter til tanta di på landsbygda. Russland går inn i en blodig [[borgerkrig]].",
          "**Slik gikk det:** Etter 1918 ble Russland et ettpartistat. Alle andre partier ble forbudt. Revolusjonen som begynte med krav om brød og fred, endte i borgerkrig og diktatur."
        ],
        lett: [
          "Du går i demonstrasjonen. Soldater skyter inn i folkemengden. Du løper.",
          "Det hemmelige politiet leter etter deg. Du flykter til landet. Det blir borgerkrig.",
          "**Slik gikk det:** Russland ble et land med bare ett parti. Alle andre partier ble forbudt."
        ]
      },
      partiet: {
        slutt: "Partiet",
        tekst: [
          "Du blir i partiet. «Forsamlingen var full av borgerlige», sier lederne. «Arbeiderne trenger ikke en gammeldags valgforsamling. De har sovjetene.» Du får jobb i fabrikkomiteen og senere i partiets kvinneavdeling.",
          "I mars 1918 slutter Russland fred med Tyskland og gir fra seg store områder. Så kommer borgerkrigen – de røde mot de hvite. Du organiserer suppekjøkken mens byen sulter.",
          "**Til ettertanke:** Mange unge trodde på revolusjonens løfter om likhet. Noen av dem ble senere selv ofre: Under Stalins utrenskninger i 1937–1938 ble hundretusenvis av partimedlemmer og vanlige folk arrestert og skutt."
        ],
        lett: [
          "Du stoler på partiet. Du får jobb i partiet.",
          "Russland slutter fred med Tyskland. Så kommer borgerkrig og sult. Du lager mat til de sultne.",
          "**Til ettertanke:** Mange trodde på revolusjonen. Senere ble mange av dem selv drept under Stalin."
        ]
      },
      sykehuset: {
        tekst: [
          "På sykehuset ligger soldatene i senger langs alle veggene. Mange har mistet armer eller bein. De forteller om skyttergraver, gass og offiserer som slo dem. Alle vil hjem.",
          "En dag i desember står Misja i døra. Han har gått fra fronten – desertert – sammen med tusenvis av andre. Han er mager og har frostsår. «Lenin har lovet fred», sier han. «Nå vil jeg ha jorda som er lovet oss.»",
          "Byen sulter. Om vinteren 1918 er det nesten ikke mat å få. Mange forlater Petrograd. Olga skal reise til slektninger i Finland."
        ],
        lett: [
          "På sykehuset ligger mange skadde soldater. Alle vil hjem.",
          "En dag kommer broren din Misja hjem fra krigen. Han har rømt fra hæren.",
          "Det er nesten ikke mat i byen. Olga skal reise til Finland."
        ],
        valg: [
          { t: "Reise med Olga til Finland.", til: "eksil" },
          { t: "Bli i Petrograd med familien.", til: "sulten" }
        ]
      },
      eksil: {
        slutt: "Eksil",
        tekst: [
          "Dere tar toget nordover med to kofferter. Ved grensen blir alt gjennomsøkt. I Helsingfors får du jobb på et sykehus. Men også Finland går inn i en borgerkrig våren 1918.",
          "Du ser aldri Petrograd igjen. Byen skifter navn to ganger – til Leningrad og senere tilbake til St. Petersburg. Mor skriver brev de første årene. Så slutter brevene å komme.",
          "**Slik gikk det:** Over én million mennesker forlot Russland etter revolusjonen og borgerkrigen. Mange av dem bosatte seg i Paris, Berlin, Praha og Harbin."
        ],
        lett: [
          "Du reiser til Finland og får jobb på et sykehus.",
          "Du ser aldri Petrograd igjen. Etter noen år slutter brevene fra mor å komme.",
          "**Slik gikk det:** Over én million mennesker flyktet fra Russland."
        ]
      },
      sulten: {
        slutt: "De sultne årene",
        tekst: [
          "Du blir. Familien fyrer med møbler for å holde varmen. Brødrasjonen er noen hundre gram om dagen, når den finnes. Misja blir tvangsinnkalt til Den røde armé og sendt til borgerkrigen i sør.",
          "I 1921 er krigen over. De røde har vunnet. Lenin innfører en ny økonomisk politikk der bøndene igjen får selge varene sine. Brødet kommer tilbake i butikkene. Misja kommer hjem med et skadet bein.",
          "**Slik gikk det:** Borgerkrigen og hungersnøden etter den kostet flere millioner mennesker livet. I 1922 ble Sovjetunionen opprettet."
        ],
        lett: [
          "Du blir i byen. Det er kaldt og nesten ingen mat. Misja må bli soldat igjen.",
          "I 1921 er borgerkrigen over. Bøndene får selge mat igjen. Misja kommer hjem.",
          "**Slik gikk det:** Millioner av mennesker døde i borgerkrigen og hungersnøden. I 1922 ble Sovjetunionen opprettet."
        ]
      }
    },
    etterpaa: {
      sporsmal: [
        "Hvorfor begynte revolusjonen i februar 1917? Nevn minst tre årsaker.",
        "Hva lovet bolsjevikene, og hvorfor fikk de mange tilhengere?",
        "Bolsjevikene tapte valget, men beholdt makten. Hva sier det om hva slags styre de innførte?",
        "Hvorfor tror du revolusjonen som skulle gi frihet, endte i diktatur?"
      ],
      skriv: "Skriv en dagbokside fra Anja 25. oktober 1917. Hva håper hun på – og hva er hun redd for?",
      ekte: [
        [true, "Kvinnestreiken 23. februar 1917 og at tsaren ga fra seg makten 2. mars."],
        [true, "Lenins retur i april, «fred, jord og brød» og oktoberrevolusjonen."],
        [true, "Valget til den konstituerende forsamlingen der kvinner kunne stemme, og at den ble oppløst i januar 1918."],
        [true, "Borgerkrigen, Tsjeka og hungersnøden."],
        [false, "Anja, familien hennes, Olga og fabrikken hun jobber på."]
      ]
    },
    kontroller: [
      "Datoene etter gammel kalender: 23. februar (= 8. mars), 2. mars, 25. oktober (= 7. november) 1917; forsamlingen 5.–6. januar 1918.",
      "Bolsjevikene fikk rundt 24 % i valget; kvinner fikk stemmerett i Russland sommeren 1917.",
      "Over én million emigrerte etter revolusjonen; Stalins store terror 1937–1938.",
      "Lenins tale ved Finlandstasjonen er gjenfortalt i korte slagord, ikke sitert."
    ]
  },

  {
    id: "ellis-1907", sprak: "en", tittel: "Ellis Island", undertittel: "New York, 1907", ikon: "🗽", farger: ["#1f4e5a", "#9fd3c7"],
    tema: "en10-american-dream", trinn: 10, ar: 1907,
    kort: "You are Rosa, 15, from a village near Naples. After two weeks at sea you can see the Statue of Liberty. But first you must get through Ellis Island – the «Island of Hope» and the «Island of Tears».",
    rolle: "You are **Rosa Esposito**, 15 years old. You come from a poor village near Naples in Italy. Your father went to New York three years ago and has saved money for tickets for you and your little brother Paolo, who is eight. Your mother stayed behind with the baby. It is April 1907, and your ship is sailing into New York Harbor.",
    rolleLett: "You are **Rosa**, 15. You come from Italy. Your father works in New York. Now you and your little brother Paolo, 8, are coming to America. It is 1907.",
    start: "ship",
    ord: {
      "steerage": "The cheapest and most crowded part of a ship, deep down below deck.",
      "immigrant": "A person who comes to live in a new country.",
      "inspector": "An official who checks people or things.",
      "trachoma": "A dangerous eye disease that can make people blind. Immigrants with trachoma were sent back.",
      "deported": "Sent back to the country you came from.",
      "tenement": "A crowded apartment building in a poor part of a city.",
      "sweatshop": "A small factory where people work long hours for very low pay.",
      "night school": "School in the evening for adults who work in the daytime."
    },
    noder: {
      ship: {
        tekst: [
          "For fourteen days you have lived in [[steerage]] with eight hundred other passengers. The air smells of seasickness and sweat. Now everyone is pushing up the stairs to the deck. Paolo holds your hand so hard that it hurts.",
          "Then you see her: a huge green woman holding a torch high above the water. The Statue of Liberty. People cry and pray and laugh. An old man next to you takes off his hat.",
          "But first-class passengers go straight to Manhattan. Steerage passengers like you are put on a ferry to a small island full of red brick buildings: Ellis Island."
        ],
        lett: [
          "You have been on the ship for fourteen days. It is crowded and dirty.",
          "Then you see the Statue of Liberty. People cry and laugh.",
          "Rich passengers can go straight to New York. Poor passengers must go to Ellis Island first."
        ],
        kilde: { tittel: "Fact: Ellis Island", tekst: "Ellis Island in New York Harbor opened as an immigration station in 1892. Until 1954, about 12 million people came through it. In 1907, the busiest year, more than one million [[immigrant]]s arrived – on some days more than 10 000. Most of them were from Italy, Eastern Europe and Scandinavia.", lett: "About 12 million immigrants came through Ellis Island. In 1907 more than one million people arrived." },
        valg: [ { t: "Get on the ferry to Ellis Island.", til: "stairs" } ]
      },
      stairs: {
        tekst: [
          "Inside the building there is a long, steep staircase up to a huge hall. Doctors in uniforms stand at the top and watch everyone who climbs the stairs. People call it the «six-second exam»: in a few seconds, the doctors look for people who are out of breath, who limp or who look ill.",
          "Paolo has been coughing for days. His eyes are red because he keeps rubbing them. You are afraid that the doctors will think he is sick."
        ],
        lett: [
          "There are many stairs up to a big hall. Doctors watch everyone who walks up. They look for sick people.",
          "Paolo has a cough. His eyes are red. You are afraid."
        ],
        valg: [
          { t: "Hold Paolo’s hand and tell him to stand up straight and smile.", til: "chalk" },
          { t: "Carry Paolo’s bag so he can walk easily.", til: "chalk" }
        ]
      },
      chalk: {
        tekst: [
          "At the top of the stairs, a doctor stops Paolo. He turns Paolo’s eyelids up with a small hook. It hurts, and Paolo cries. Then the doctor writes a big «E» with chalk on Paolo’s coat and points to a side room.",
          "A woman behind you whispers in Italian: «E means eyes. They think he has [[trachoma]]. If they keep him, they will send him back. Turn his coat inside out! Nobody will see the letter.»"
        ],
        lett: [
          "A doctor looks at Paolo’s eyes. He writes an «E» on Paolo’s coat with chalk.",
          "A woman whispers: «E means eyes. They think he is sick. Turn his coat inside out, so they can’t see the letter!»"
        ],
        kilde: { tittel: "Fact: the chalk marks", tekst: "Doctors at Ellis Island used chalk letters to mark people for a closer examination: «E» for eyes, «H» for heart, «L» for lameness, «X» for mental problems. The most feared disease was trachoma. Some immigrants secretly turned their coats inside out or rubbed out the marks. Only about two out of a hundred immigrants were sent back – but for them, the journey had been for nothing.", lett: "Doctors wrote letters with chalk on people who might be sick. About two out of a hundred immigrants were sent back." },
        valg: [
          { t: "Turn Paolo’s coat inside out.", til: "questions" },
          { t: "Go to the side room with Paolo.", til: "hospital" }
        ]
      },
      hospital: {
        tekst: [
          "In the side room, an older doctor looks at Paolo’s eyes for a long time. «Not trachoma», he says to a nurse. «Just an infection from the ship. Keep him for three days.»",
          "Paolo stays in the hospital on the island. You sleep in a big dormitory with hundreds of other women. On the third day, Paolo comes back with clean eyes and a red apple from the nurse. «They had real beds», he says. «And meat!»"
        ],
        lett: [
          "A doctor looks at Paolo again. «It is not dangerous», he says. «But he must stay here for three days.»",
          "Paolo stays in the hospital. After three days, he is well again."
        ],
        valg: [ { t: "Go to the inspector.", til: "questions" } ]
      },
      questions: {
        tekst: [
          "Now you stand in front of an [[inspector]] at a high desk. An interpreter translates his questions into Italian. «Name? Age? Can you read and write? Who paid for your ticket? How much money do you have?» You show him the twenty dollars your father sent.",
          "Then he asks: «Do you have a job waiting for you in America?»",
          "Your father wrote that a man from your village has promised you a job in a clothing factory. You are proud of it. But the woman behind you shakes her head very slightly."
        ],
        lett: [
          "An inspector asks many questions. «What is your name? Who paid for your ticket? How much money do you have?»",
          "Then he asks: «Do you have a job waiting for you?»",
          "Your father has found you a job. But the woman behind you shakes her head."
        ],
        valg: [
          { t: "Tell the truth: «Yes, I have a job in a factory.»", til: "sentback" },
          { t: "Say: «No, but I will work hard and find a job.»", til: "manhattan" }
        ]
      },
      sentback: {
        slutt: "The Island of Tears",
        tekst: [
          "The inspector frowns. He writes something and points to a bench. You are held for a hearing. American law forbids employers from bringing in workers who were promised a job before they arrived. The law was meant to protect American workers – and to stop people from being tricked into bad jobs abroad.",
          "Your father comes to the island with a lawyer. After a week, Paolo is allowed in. You are not. You are [[deported]] on the next ship back to Naples. From the deck, you see the Statue of Liberty get smaller and smaller.",
          "**What happened next:** People called Ellis Island the «Island of Tears» because of those who were sent back. Some tried again a few years later. Many never got a second chance."
        ],
        lett: [
          "The inspector says you have broken a law: You cannot have a job before you come.",
          "Paolo can stay with your father. You must go back to Italy alone.",
          "**What happened next:** People called Ellis Island the «Island of Tears» because of people who were sent back."
        ]
      },
      manhattan: {
        tekst: [
          "The inspector stamps your paper. «Welcome to America.» You run down the stairs to the «kissing post», where families meet. There is your father – thinner and older, but smiling. He lifts Paolo up in the air.",
          "Home is two rooms in a [[tenement]] on Mulberry Street. Seven people live there: you, Paolo, your father and a family of four who rent the other room. The toilet is in the yard.",
          "Your father says there is work in a [[sweatshop]] that sews blouses. You could earn six dollars a week. But the girl next door goes to [[night school]] to learn English – and she wants you to come too."
        ],
        lett: [
          "You are allowed into America! Your father is waiting for you.",
          "You live in two small rooms with seven people. The toilet is outside.",
          "You can work in a clothing factory. Or you can go to evening school to learn English."
        ],
        kilde: { tittel: "Fact: the Lower East Side", tekst: "Many immigrants in New York lived in tenements on the Lower East Side, one of the most crowded places in the world. Whole families lived in one or two rooms. Many worked in sweatshops in the clothing industry, often 60 hours a week or more. Children were expected to help the family earn money.", lett: "Many immigrants lived in small, crowded apartments. Many worked long hours in clothing factories." },
        valg: [
          { t: "Take the job in the factory. Your family needs the money.", til: "strike" },
          { t: "Take the job – and go to night school after work.", til: "nightschool" }
        ]
      },
      strike: {
        slutt: "The strike",
        tekst: [
          "You sit at a sewing machine from seven in the morning to eight at night. The doors are locked during the day so that nobody can take a break. If you are late, they take money from your pay.",
          "In November 1909, thousands of young women in the clothing factories go on strike. Most of them are Jewish and Italian girls your age. You stand on the picket line in the snow for weeks. The police arrest some of you. In the end, many factories agree to shorter hours and better pay.",
          "**What happened next:** In 1911, a fire broke out at the Triangle Shirtwaist Factory. The doors were locked, and 146 workers died – most of them young immigrant women. After the fire, New York passed new laws to protect workers."
        ],
        lett: [
          "You sew in a factory for thirteen hours every day. The doors are locked.",
          "In 1909, thousands of young women go on strike. You join them. Many factories give better pay.",
          "**What happened next:** In 1911, a fire killed 146 workers in a factory with locked doors. After that, new laws protected workers."
        ]
      },
      nightschool: {
        slutt: "Night school",
        tekst: [
          "You work at the factory in the daytime. Three evenings a week, you sit in a classroom with tired adults from all over the world – Russians, Greeks, Irish, Chinese. Your teacher, Miss O’Brien, says that you have «an ear for English».",
          "It takes six years. Then you pass an exam and get a job as an assistant in a public school, helping new immigrant children. Paolo becomes the first in the family to finish high school.",
          "**Think about it:** For many immigrants, the American Dream was not about getting rich. It was about their children having a better life than they did. Did the dream come true for everyone? Who was left out?"
        ],
        lett: [
          "You work in the day and go to school in the evening. You learn English.",
          "After six years, you get a job at a school. You help new immigrant children. Paolo finishes high school.",
          "**Think about it:** Did the American Dream come true for everyone?"
        ]
      }
    },
    etterpaa: {
      sporsmal: [
        "Why did Rosa’s family want to go to America? Find push and pull factors.",
        "Why was Ellis Island called both the «Island of Hope» and the «Island of Tears»?",
        "Was it fair that Rosa could be sent back for having a job waiting? Discuss.",
        "Compare Rosa’s journey with how immigrants come to the USA or Norway today."
      ],
      skriv: "Write a letter from Rosa to her mother in Italy after her first week in New York.",
      ekte: [
        [true, "Ellis Island, the «six-second exam» and the chalk marks."],
        [true, "1907 was the busiest year, with more than one million immigrants."],
        [true, "The law against promised jobs, the 1909 strike and the Triangle fire in 1911."],
        [false, "Rosa, Paolo, their parents, Miss O’Brien and the woman in the line."],
        [false, "The exact questions and answers at Rosa’s inspection."]
      ]
    },
    kontroller: [
      "Ellis Island 1892–1954, ca. 12 millioner; over én million i 1907.",
      "Krittmerkene (E, H, L, X) og at ca. 2 % ble sendt tilbake.",
      "Alien Contract Labor Law (1885) – forbud mot å komme med avtalt jobb.",
      "Streiken i 1909 («Uprising of the 20,000») og Triangle-brannen 25. mars 1911, 146 døde.",
      "Lønn og arbeidstid (6 dollar i uka) er omtrentlige eksempler."
    ]
  },

  {
    id: "transported-1833", sprak: "en", tittel: "Transported", undertittel: "London – New South Wales, 1833–1838", ikon: "⛓️", farger: ["#5b3a1e", "#e3a857"],
    tema: "en9-australia", trinn: 9, ar: 1833,
    kort: "You are Will, 16, from London. You stole a silk handkerchief – and now you are going to the other side of the world as a convict. What kind of life will you make in Australia?",
    rolle: "You are **Will Carter**, 16 years old. You grew up on the streets of London after your mother died. You have never been to school. One cold day in 1833, you steal a silk handkerchief from a gentleman’s pocket – and a policeman sees you.",
    rolleLett: "You are **Will**, 16. You live on the streets of London. In 1833 you steal a handkerchief, and a policeman sees you.",
    start: "court",
    ord: {
      "convict": "A person who has been found guilty of a crime and sent to prison.",
      "transportation": "A punishment where criminals were sent from Britain to colonies far away, like Australia.",
      "assigned": "Sent to work for a settler without pay.",
      "settler": "A person who comes to live in a new land and takes land there.",
      "ticket of leave": "A paper that let a convict work for pay and live more freely before the sentence was over.",
      "Aboriginal": "The first peoples of Australia, who have lived there for more than 60 000 years.",
      "frontier": "The edge of the area that settlers had taken, where they met the Aboriginal peoples whose land it was.",
      "massacre": "When many people who cannot defend themselves are killed."
    },
    noder: {
      court: {
        tekst: [
          "The courtroom at the Old Bailey is full of people. The judge does not even look at you. «William Carter, you are found guilty of stealing a handkerchief worth five shillings. You are sentenced to seven years’ [[transportation]] beyond the seas.»",
          "Beyond the seas means Australia – a place so far away that most [[convict]]s never come back. A woman in the gallery shouts that you are only a boy. Nobody listens.",
          "In the prison ship on the Thames, an older convict called Ned grins at you. «Seven years? Lucky lad. In Australia there’s land and sun. Here there’s only fog and the rope.»"
        ],
        lett: [
          "The judge says: «You stole a handkerchief. You will be sent to Australia for seven years.»",
          "Australia is very far away. Most convicts never come back.",
          "An older convict, Ned, says: «In Australia there is land and sun.»"
        ],
        kilde: { tittel: "Fact: transportation", tekst: "From 1788 to 1868, Britain sent about 162 000 convicts to the Australian colonies. Many of them had committed small crimes, like stealing clothes or food. Britain’s prisons were full, and the colonies needed workers. Most convicts were young men, but about one in six was a woman.", lett: "Britain sent about 162 000 convicts to Australia. Many had stolen small things." },
        valg: [ { t: "Board the convict ship.", til: "ship" } ]
      },
      ship: {
        tekst: [
          "The voyage takes four months. You sleep in chains below deck with two hundred other men. The ship rolls in storms near Africa, and many are seasick for weeks.",
          "The ship’s surgeon, Dr. Mackay, is strict but fair. Every afternoon he holds a class on deck for convicts who want to learn to read. «A man who can read can write a letter, sign a contract and read the law», he says.",
          "Ned laughs. He plays cards with the sailors for tobacco and rum every evening. «Come on, Will. Books won’t help you where we’re going.»"
        ],
        lett: [
          "The trip takes four months. You sleep in chains under the deck.",
          "The ship’s doctor teaches convicts to read every afternoon.",
          "Ned plays cards with the sailors. «Books won’t help you», he says."
        ],
        valg: [
          { t: "Go to Dr. Mackay’s reading class.", til: "sydney" },
          { t: "Play cards with Ned and the sailors.", til: "sydney" }
        ]
      },
      sydney: {
        tekst: [
          "Sydney Harbour is bright blue, and the sun is so strong that you have to close your eyes. You are marched to the Hyde Park Barracks, a big brick building where convicts sleep in hammocks.",
          "Convicts are [[assigned]] to work for [[settler]]s or for the government. An officer reads out the names. A builder in Sydney needs men to carry stone for new houses. A farmer far inland needs shepherds for his sheep station on the [[frontier]].",
          "«Out there, nobody watches you», whispers Ned. «And nobody helps you either.»"
        ],
        lett: [
          "You arrive in Sydney. The sun is very strong. You sleep in a big building for convicts.",
          "You can work for a builder in Sydney, or on a sheep farm far away from the town.",
          "«On the farm nobody watches you», says Ned."
        ],
        valg: [
          { t: "Work for the builder in Sydney.", til: "ticket" },
          { t: "Go to the sheep station inland.", til: "frontier" }
        ]
      },
      ticket: {
        slutt: "Ticket of leave",
        tekst: [
          "You carry stone for four years. Your back hurts every evening, but you learn to cut sandstone and lay walls. You keep out of trouble.",
          "In 1837, you get a [[ticket of leave]]. Now you can work for pay and rent your own room. You marry Bridget, an Irish convict woman who works in a bakery. Your first child is born free in a colony that grows bigger every year.",
          "**What happened next:** Many convicts stayed in Australia after their sentences ended. Some became farmers, builders or shop owners. Today, millions of Australians have a convict among their ancestors."
        ],
        lett: [
          "You work hard for four years and stay out of trouble.",
          "Then you get a ticket of leave. You can work for money. You marry Bridget and have a child.",
          "**What happened next:** Many convicts stayed in Australia. Millions of Australians today have convicts in their family history."
        ]
      },
      frontier: {
        tekst: [
          "You travel for three weeks by bullock cart to a sheep station on the Liverpool Plains. There are no fences and no towns – only grass, gum trees and thousands of sheep. You live in a bark hut with two other convict stockmen.",
          "One day you lose a group of sheep in the bush. An [[Aboriginal]] man finds you. The stockmen call him «Jacky», but he tells you his real name, and you practise saying it until he laughs. He shows you where the water is, and which plants are good to eat. You learn some words of his language. His people have lived here for longer than anyone can remember. The sheep are eating the grass and drinking the water they need.",
          "One evening, the overseer comes to the hut with a group of armed men on horses. «The blacks have speared two cattle», he says. «We’re going out tomorrow to teach them a lesson. You know where their camp is. You’ll show us.»"
        ],
        lett: [
          "You go to a sheep farm far away. There are no towns, only grass and trees.",
          "An Aboriginal man helps you find water. You learn his real name. His people have always lived on this land.",
          "One evening, armed men come. They want to attack the Aboriginal camp. «You know where it is», they say. «Show us.»"
        ],
        kilde: { tittel: "Fact: the frontier wars", tekst: "As settlers took more and more land for sheep and cattle, Aboriginal peoples lost their land, water and food. There was fighting on the frontier for more than a hundred years. Many Aboriginal people were killed in [[massacre]]s, often by settlers and stockmen who were never punished. Diseases brought by the settlers also killed many.", lett: "Settlers took Aboriginal land. There was fighting for over a hundred years. Many Aboriginal people were killed." },
        valg: [
          { t: "Slip away in the night to warn your friend’s people.", til: "warn" },
          { t: "Say nothing. You are a convict – what can you do?", til: "silence" },
          { t: "Run away into the bush and try to get to the coast.", til: "portarthur" }
        ]
      },
      warn: {
        slutt: "The warning",
        tekst: [
          "You walk through the dark bush for hours. At the camp, you find your friend and tell him with your few words and your hands. By sunrise, the camp is empty. The riders find only cold ashes.",
          "The overseer guesses what you did. You are flogged and sent back to Sydney in chains. Your sentence is made longer. But many years later, an old Aboriginal man in a town stops you in the street and says your name.",
          "**What happened next:** In June 1838, stockmen killed at least 28 Aboriginal people – mostly women, children and old men – at Myall Creek. For the first time, white men were hanged for killing Aboriginal people. But most massacres were never punished."
        ],
        lett: [
          "You warn your friend’s people. In the morning, the camp is empty.",
          "The overseer finds out. You are punished and sent back to Sydney.",
          "**What happened next:** At Myall Creek in 1838, stockmen killed at least 28 Aboriginal people. Seven men were hanged. But most massacres were never punished."
        ]
      },
      silence: {
        slutt: "The silence",
        tekst: [
          "You say nothing. You do not show them the way, but they find the camp anyway. You hear shots in the distance. When the men come back, nobody talks about what happened.",
          "You never see your friend again. For the rest of your life, you do not tell anyone about that day. When your sentence is over, you take land of your own nearby – land that once belonged to his people.",
          "**Think about it:** For a long time, Australian history books said little about the frontier wars. Today, many Australians talk about «the great Australian silence». Why do you think it took so long to tell this part of the story?"
        ],
        lett: [
          "You say nothing. The men find the camp. You hear shots.",
          "You never see your friend again. Later you get your own land – land that belonged to his people.",
          "**Think about it:** For a long time, Australia did not talk about the violence on the frontier. Why?"
        ]
      },
      portarthur: {
        slutt: "Port Arthur",
        tekst: [
          "You run at night with a bag of flour and a knife. For weeks you walk through the bush. You are hungry, lost and burned by the sun. Finally, a mounted policeman finds you half-dead by a creek.",
          "Runaways are punished hard. You are sent to Port Arthur in Van Diemen’s Land – a prison for convicts who break the rules again. The work is hard, and the punishments are harsh. Later, the prison builds a «Separate Prison», where convicts are not allowed to speak and must wear hoods when they walk outside.",
          "**What happened next:** Port Arthur was used as a prison from 1830 to 1877. Today it is a museum and a World Heritage Site, together with other convict sites in Australia."
        ],
        lett: [
          "You run away into the bush. You get lost and almost die. The police find you.",
          "You are sent to Port Arthur, a very hard prison. The prisoners are not allowed to talk.",
          "**What happened next:** Port Arthur is a museum today."
        ]
      }
    },
    etterpaa: {
      sporsmal: [
        "Why did Britain send convicts to Australia? Give at least two reasons.",
        "Was the punishment fair? Compare it with how we punish theft today.",
        "How did the arrival of convicts and settlers change life for the Aboriginal peoples?",
        "What does «the great Australian silence» mean, and why is it important to talk about it?"
      ],
      skriv: "Write the letter Will could have written to someone in London after five years in Australia. (Remember: Can he write?)",
      ekte: [
        [true, "About 162 000 convicts were transported to Australia, many for small thefts."],
        [true, "The Hyde Park Barracks, the ticket of leave and Port Arthur."],
        [true, "The frontier wars and the Myall Creek massacre in 1838."],
        [false, "Will, Ned, Dr. Mackay, Bridget and Will’s Aboriginal friend."],
        [false, "The attack in the story and Will’s warning."]
      ]
    },
    kontroller: [
      "Ca. 162 000 deporterte straffanger 1788–1868; omtrent én av seks var kvinner.",
      "Myall Creek 10. juni 1838: minst 28 drept; sju menn hengt i desember 1838.",
      "Port Arthur 1830–1877; Separate Prison med hetter og taushet ble bygd rundt 1850.",
      "«The great Australian silence» – uttrykket er fra W. E. H. Stanner (1968)."
    ]
  }
];
