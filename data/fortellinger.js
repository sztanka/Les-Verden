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
        ]
      },
      avskjed: {
        tekst: [
          "Det blir en tung morgen. Mor har sydd en ny kjole og pakket en kiste med klær, en salmebok og flatbrød. Far bærer kisten ned til veien. «Skriv», er det eneste han sier.",
          "Med hest og skyss, og senere tog, kommer du til Kristiania. Havna er full av folk med kister og bylter – mange av dem skal samme vei som deg. Skipet går ikke direkte til Amerika: Først skal dere over Nordsjøen til Hull i England, så med tog til Liverpool, og derfra over Atlanteren."
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
        valg: [
          { t: "Fortsette mot New York.", til: "ankomst" }
        ]
      },
      ankomst: {
        tekst: [
          "Etter ti dager på havet ser du land. Skipet glir inn i havna i New York, forbi skog av master og skorsteiner. Dere blir ført til [[Castle Garden]], et stort, rundt byggverk ved vannet. Her blir alle registrert. En lege ser deg i øynene og lytter på pusten din. En tolk spør hvor du skal. «Minnesota», sier du – det eneste engelske ordet du er sikker på.",
          "Rundt deg selger folk billetter, mat og losji. Noen roper på norsk at de kan hjelpe deg, for en pris."
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
        kilde: { tittel: "Fakta: svindel mot innvandrere", tekst: "Innvandrere som ikke kunne språket, var lette ofre. Norskspråklige «hjelpere» solgte falske eller altfor dyre billetter. Norske kirker, foreninger og aviser i Amerika advarte nykommere – og hjalp dem som var blitt lurt." },
        valg: [ { t: "Reise videre til Minnesota.", til: "tog" } ]
      },
      tog: {
        tekst: [
          "Toget går dag og natt vestover, gjennom byer, skog og endeløse sletter. Til slutt står du på en liten stasjon i Minnesota. Tante Guri står der med hest og vogn. Hun er tynnere og eldre enn du husket, og hendene er harde.",
          "Huset er ikke så stort som i brevene. Det er av tømmer, med ett rom og et loft. Men åkrene er store, og det er mat på bordet. Guri trenger hjelp på gården, men hun sier også: «Inne i byen leter de etter jenter som kan arbeide i husene. Der får du penger i hånda.»"
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
        valg: [ { t: "Skrive brev hjem.", til: "brev-hjem" } ]
      },
      by: {
        tekst: [
          "I Minneapolis får du jobb som tjenestejente hos en rik familie med svenske røtter. Du lærer engelsk fort, kler deg som en amerikansk jente og tjener mer på en måned enn du gjorde på et år hjemme.",
          "Men du er alene mye. De andre jentene på kjøkkenet er irske og ler av uttalen din. Om kveldene skriver du dagbok på norsk, så du ikke glemmer språket."
        ],
        valg: [ { t: "Skrive brev hjem.", til: "brev-hjem" } ]
      },
      vest: {
        tekst: [
          "Du reiser med familien Haugen – eller med andre nordmenn – til Dakota-territoriet. Etter [[Homestead Act]] kan dere få 160 acres gratis jord hvis dere bor på den og dyrker den i fem år.",
          "Det finnes nesten ikke trær på [[prærie]]n. Det første året bor dere i et [[torvhus]]. Vinteren er så kald at melka fryser inne. Om sommeren kommer gresshopper og tordenvær. Mange gir opp.",
          "En dag ser du en gruppe dakota-indianere ri forbi i det fjerne. Du hører at denne jorda var deres land før. Noen år tidligere ble de tvunget bort."
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
      skriv: "Skriv Karis brev hjem til familien i Valdres. Bestem deg: Forteller hun hele sannheten?"
    }
  },

  {
    id: "fyrstikk-1889", tittel: "Fyrstikkarbeidersken", undertittel: "Kristiania, 1889", ikon: "🔥", farger: ["#3a2018", "#e89a3c"],
    tema: "sf9-arbeiderbevegelsen", trinn: 9,
    kort: "Du er Hanna, 14 år, og jobber i en fyrstikkfabrikk på østkanten. Lønna blir satt ned. Skal du streike – eller tie for å beholde jobben?",
    rolle: "Du er **Hanna**, 14 år. Du bor med mor og tre småsøsken i ett rom på Grünerløkka i Kristiania. Far døde i en ulykke på sagbruket. Siden du var tolv, har du jobbet på fyrstikkfabrikken. Det er høsten 1889.",
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
        valg: [ { t: "Se hva som skjedde videre.", til: "slutt-forening" } ]
      },
      tilbake: {
        slutt: "Tilbake ved bordet",
        tekst: [
          "Du går tilbake. Formannen nikker kort. Ved bordet sitter du ved siden av andre som også har kommet tilbake. Ingen snakker om det.",
          "Noen uker senere er streiken over. De som holdt ut lengst, får beholde jobben, de fleste av dem. Du forstår at det ikke var lett for noen – verken for dem som streiket eller for dem som gikk tilbake.",
          "**Til ettertanke:** Mange arbeidere sto i et vanskelig valg mellom å kjempe for bedre kår og å skaffe mat til familien i dag. Derfor ble streikekasser og fagforeninger så viktige."
        ]
      },
      "slutt-alene": {
        slutt: "Alene ved vinduet",
        tekst: [
          "Du får plassen ved vinduet. Etter noen uker er streiken over, og de andre kommer tilbake. Noen av dem snakker aldri mer med deg. Men noen år senere, da det blir startet en fagforening, er det Marie som spør om du vil bli med. «Vi trenger alle», sier hun.",
          "**Til ettertanke:** Arbeidsgivere prøvde ofte å splitte arbeiderne. Fagforeningene ble sterke fordi de klarte å samle også dem som først var usikre."
        ]
      },
      "slutt-forening": {
        slutt: "Sammen står vi sterkere",
        tekst: [
          "Marie får fosforkjeve noen år senere og må slutte. Du blir værende i fabrikken og i foreningen. Når du blir voksen, er du med på å kreve kortere arbeidsdager og forbud mot den giftige fosforen.",
          "**Slik gikk det:** Arbeiderbevegelsen vokste raskt i årene etter 1889. I 1899 ble Landsorganisasjonen (LO) dannet. Hvitt fosfor ble etter hvert forbudt i fyrstikkproduksjon i mange land, og i 1919 fikk Norge en lov om åtte timers arbeidsdag."
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
      skriv: "Skriv en kort tale som Hanna kunne holdt for de andre arbeiderskene. Hva vil hun overbevise dem om?"
    }
  },

  {
    id: "eidsvoll-1814", tittel: "Tjenestejenta på Eidsvoll", undertittel: "Våren 1814", ikon: "📜", farger: ["#7a1f2b", "#f0e2b6"],
    tema: "sf8-1814-grunnloven", trinn: 8,
    kort: "Du er Sigrid, 15 år og tjenestejente på Eidsvollsverket. Hit kommer 112 menn for å skrive en grunnlov. Hva hører du – og hva gjør du?",
    rolle: "Du er **Sigrid**, 15 år. Du er tjenestejente i huset til Carsten Anker, en rik godseier på Eidsvoll, nord for Christiania. Vinteren har vært hard. Folk sulter fortsatt etter krigsårene. Det er april 1814.",
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
        kilde: { tittel: "Fakta: hvem fikk stemme?", tekst: "Grunnloven ga stemmerett til menn over 25 år som eide eller leide jord, var embetsmenn eller borgere i byene. Det var rundt 40 prosent av mennene – mer enn i de fleste land på den tiden. Kvinner fikk allmenn stemmerett først i 1913. Grunnloven forbød også jøder å komme inn i riket. Den paragrafen ble fjernet i 1851." },
        valg: [ { t: "Fortsette arbeidet.", til: "frihet" } ]
      },
      frihet: {
        tekst: [
          "Ukene går. Om kveldene sitter komiteer og skriver. Du hører ord som «folkesuverenitet» og «maktfordeling» – makten skal komme fra folket og deles mellom en nasjonalforsamling, en konge og domstolene. Mange av ideene kommer fra Frankrike og Amerika.",
          "En kveld ber en av representantene deg om å bringe et brev ut til en kurér. Han hvisker at brevet er til en venn i Sverige. Er han en forræder – eller bare en som vil unngå krig?"
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
        valg: [ { t: "Følge med på hva som skjer.", til: "frihet" } ]
      },
      brevet: {
        tekst: [
          "Kokka holder brevet opp mot lyset, men det er forseglet. «Gjør som han ba om», sier hun. «Det er lov å ha venner i Sverige. Og det er lov å være uenig. Det er jo det de sitter og skriver om der oppe – at folk skal få mene ting.»",
          "Du løper ut til kuréren i vårmørket."
        ],
        valg: [ { t: "Fortsette.", til: "17mai" } ]
      },
      "17mai": {
        tekst: [
          "Den 17. mai 1814 er Grunnloven ferdig og underskrevet. Christian Frederik blir valgt til konge av Norge. Mennene omfavner hverandre og roper hurra. Da forsamlingen blir avsluttet noen dager senere, holder de hverandre i hendene og roper: «Enige og tro, til Dovre faller!»",
          "Om kvelden får tjenestefolket også et glass. Du står i døra og ser på alle de festkledde mennene. Norge har fått en av de mest moderne grunnlovene i verden. Men du vet også at sommeren kan bringe krig."
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
        ]
      },
      hjem: {
        slutt: "Hjem til bygda",
        tekst: [
          "Du kommer hjem til foreldrene dine. Far har vært i kirken og hørt prestene lese opp den nye Grunnloven. Han er stolt, selv om han som husmann ikke får stemme. «Vi har en lov som gjelder for alle nå – også kongen», sier han.",
          "Senere samme sommer kommer nyheten om krigen og om unionen med Sverige. Men Grunnloven består.",
          "**Til ettertanke:** Grunnloven ga ikke alle like rettigheter i 1814. Men den ble et grunnlag som senere generasjoner kunne bygge videre på – med stemmerett for alle menn i 1898 og for kvinner i 1913."
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
      skriv: "Skriv en dagbokside fra Sigrid kvelden 17. mai 1814."
    }
  }
];
