/* =========================================================
   Les verden – Fredskonferansen (fred.html)
   Forhandlingsrollespill om to historiske fredskonferanser.
   delegasjoner: stemme = true betyr at delegasjonen sitter ved bordet.
     Andre delegasjoner er «i lobbyen» og må påvirke de andre.
   saker: valg med poeng per delegasjon (−3 til +3, hemmelig – står
     bare på rollekortene) og risiko (0–3) for ny konflikt.
     ekte = valget som ligner mest på det som faktisk skjedde.
   hendelser: overraskelser læreren kan lese opp underveis.
   ========================================================= */
window.LV = window.LV || {};
LV.fred = {
  gang: [
    ["Les rollekortet", "Hver delegasjon leser rollekortet sitt nøye og blir enige om hva som er viktigst for dem. Hemmelige mål skal ikke vises til de andre!", "10 min"],
    ["Åpningstaler", "Hver delegasjon ved bordet holder en kort tale (maks ett minutt): Hvem er vi, og hva krever vi?", "10 min"],
    ["Lobbyen", "Fri forhandling. Delegasjonene går rundt, inngår avtaler («Vi støtter dere på Polen hvis dere støtter oss på Rhinland») og prøver å påvirke hverandre. Delegasjonene i lobbyen kan bare påvirke – de har ikke stemme.", "15–20 min"],
    ["Forhandlingsbordet", "Ordstyreren tar sakene én etter én. Delegasjonene ved bordet blir enige – eller stemmer. Læreren fører resultatet inn på skjermen.", "15–20 min"],
    ["Resultatet", "Se hvor mange poeng hver delegasjon fikk, og hvor stor risikoen for en ny konflikt er.", "5 min"],
    ["Virkeligheten", "Sammenlign avtalen dere laget med den som faktisk ble inngått. Hva skjedde etterpå?", "10–15 min"]
  ],
  konferanser: [
    {
      id: "wien-1815", tittel: "Wienerkongressen", sted: "Wien", dato: "1814–1815", ikon: "🎻", farger: ["#2c3e66", "#d9b44a"],
      tema: "sf8-franske-revolusjonen", koblet: ["sf8-1814-grunnloven", "sf9-nasjonalisme"], trinn: 8,
      intro: "Napoleon er beseiret og sendt i eksil på øya Elba. I 25 år har Europa vært i krig. Nå møtes keisere, konger og diplomater i Wien for å tegne et nytt kart over Europa – og sørge for at det blir fred. Mellom møtene er det ballett, konserter og ball hver kveld. «Kongressen danser», sier folk.",
      bakgrunn: [
        "Den franske revolusjonen og Napoleons kriger har snudd Europa på hodet. Gamle grenser er borte, konger er avsatt, og nye ideer om frihet og nasjoner har spredt seg.",
        "De fire stormaktene som slo Napoleon – Storbritannia, Russland, Østerrike og Preussen – vil bestemme. Men den kloke franske diplomaten Talleyrand har klart å få Frankrike med ved bordet.",
        "Norge er ikke med i Wien. Etter Kiel-freden og krigen sommeren 1814 er Norge i union med Sverige, og stormaktene godtar det."
      ],
      delegasjoner: [
        { id: "gb", navn: "Storbritannia", leder: "utenriksminister Castlereagh", ikon: "🇬🇧", farge: "#2f4a8a", stemme: true,
          hvem: "Verdens største sjømakt og handelsnasjon. Dere har betalt mye av krigen mot Napoleon.",
          mal: "Dere vil ha balanse: Ingen stat på kontinentet skal bli så sterk at den kan true de andre – verken Frankrike eller Russland. Dere vil også at Europa skal fordømme slavehandelen.",
          hemmelig: "Pass på at Russland ikke får hele Polen uten at Østerrike og Preussen også blir sterke. Maktbalanse er alt!" },
        { id: "ru", navn: "Russland", leder: "tsar Aleksander 1.", ikon: "🇷🇺", farge: "#3d6b4f", stemme: true,
          hvem: "Det største landet i Europa. Hæren deres jaget Napoleon ut av Russland og helt til Paris.",
          mal: "Tsaren mener Russland fortjener en belønning for å ha slått Napoleon. Han vil ha Polen som sitt eget kongerike – med ham selv som konge.",
          hemmelig: "Polen er det viktigste. Støtt Preussen i saken om Sachsen hvis Preussen støtter dere på Polen." },
        { id: "at", navn: "Østerrike", leder: "fyrst Metternich", ikon: "🇦🇹", farge: "#a33b3b", stemme: true,
          hvem: "Vertskapet. Et stort keiserrike med mange folk og språk – tyskere, ungarere, tsjekkere, polakker og italienere.",
          mal: "Metternich vil ha ro og orden. Nye ideer om nasjoner og frihet er farlige for et rike med så mange folk. Dere vil lede de tyske statene, men ikke slå dem sammen til ett land.",
          hemmelig: "Hindre at Preussen og Russland blir for sterke. Samarbeid gjerne i hemmelighet med Storbritannia og Frankrike." },
        { id: "pr", navn: "Preussen", leder: "kansler Hardenberg", ikon: "🦅", farge: "#444b55", stemme: true,
          hvem: "En sterk tysk militærstat i nord. Hæren deres var med og slo Napoleon ved Leipzig.",
          mal: "Preussen vil vokse og bli den ledende tyske staten. Dere vil ha kongeriket Sachsen, hvis konge støttet Napoleon helt til slutt.",
          hemmelig: "Sachsen er det viktigste. Dere kan godta at Russland får Polen hvis dere får Sachsen." },
        { id: "fr", navn: "Frankrike", leder: "Talleyrand", ikon: "🇫🇷", farge: "#2b5ea8", stemme: true,
          hvem: "Den beseirede stormakten. Napoleon er borte, og den gamle kongefamilien er tilbake på tronen.",
          mal: "Talleyrand vil at Frankrike skal bli behandlet som en stormakt igjen – ikke som en forbryter. Dere vil beholde så mye land som mulig og slippe straff.",
          hemmelig: "Splitt de fire seierherrene! Støtt Østerrike og Storbritannia mot Russland og Preussen – da trenger de dere." },
        { id: "sx", navn: "Kongeriket Sachsen", leder: "kong Frederik August (i fangenskap)", ikon: "👑", farge: "#2e7d4f", stemme: false,
          hvem: "Et lite tysk kongerike. Kongen deres sitter fanget hos prøysserne, fordi han støttet Napoleon.",
          mal: "Dere har ikke plass ved bordet. Dere må gå rundt i lobbyen og overtale stormaktene til å redde kongeriket deres.",
          hemmelig: "Bruk argumentet om at det er farlig hvis store land bare kan ta små land. Hvem har nytte av å støtte dere?" }
      ],
      saker: [
        { id: "polen", tittel: "Polen", sporsmal: "Hva skal skje med Polen, som har vært delt mellom Russland, Preussen og Østerrike?",
          valg: [
            { id: "a", tekst: "Russland får det meste av Polen som et eget kongerike under tsaren. Preussen og Østerrike får hver sin bit.", poeng: { gb: -1, ru: 3, at: -1, pr: 1, fr: -1, sx: 0 }, risiko: 1 },
            { id: "b", tekst: "Polen deles mellom Russland, Preussen og Østerrike omtrent som før Napoleon.", poeng: { gb: 2, ru: -1, at: 2, pr: 2, fr: 1, sx: 0 }, risiko: 1 },
            { id: "c", tekst: "Polen blir et fritt og selvstendig land.", poeng: { gb: 0, ru: -3, at: -2, pr: -3, fr: 2, sx: 1 }, risiko: 2 }
          ], ekte: "a", ekteTekst: "Russland fikk det meste av Polen som «Kongress-Polen» med tsaren som konge. Preussen fikk Posen, Østerrike fikk Galicia, og Kraków ble en fri by." },
        { id: "sachsen", tittel: "Sachsen", sporsmal: "Skal Preussen få kongeriket Sachsen, hvis konge støttet Napoleon?",
          valg: [
            { id: "a", tekst: "Preussen får hele Sachsen.", poeng: { gb: -1, ru: 2, at: -3, pr: 3, fr: -3, sx: -3 }, risiko: 3 },
            { id: "b", tekst: "Preussen får omtrent to femdeler av Sachsen. Resten forblir et kongerike.", poeng: { gb: 2, ru: 1, at: 2, pr: 1, fr: 2, sx: 0 }, risiko: 1 },
            { id: "c", tekst: "Sachsen beholder alt land og kongen får tronen tilbake.", poeng: { gb: 1, ru: -1, at: 2, pr: -2, fr: 3, sx: 3 }, risiko: 1 }
          ], ekte: "b", ekteTekst: "Striden om Sachsen og Polen holdt på å føre til krig mellom stormaktene i januar 1815. Kompromisset ble at Preussen fikk omtrent 40 prosent av Sachsen – og store områder ved Rhinen." },
        { id: "frankrike", tittel: "Frankrike", sporsmal: "Hva skal skje med Frankrike etter Napoleon?",
          valg: [
            { id: "a", tekst: "Frankrike beholder grensene fra 1792 og slipper å betale erstatning.", poeng: { gb: 1, ru: 1, at: 0, pr: -2, fr: 3, sx: 0 }, risiko: 1 },
            { id: "b", tekst: "Frankrike får grensene fra 1790, må betale erstatning og blir okkupert av allierte soldater i noen år.", poeng: { gb: 2, ru: 1, at: 2, pr: 1, fr: -1, sx: 0 }, risiko: 1 },
            { id: "c", tekst: "Frankrike deles opp og mister store områder til naboene.", poeng: { gb: -2, ru: -1, at: 0, pr: 3, fr: -3, sx: 0 }, risiko: 3 }
          ], ekte: "b", ekteTekst: "Først fikk Frankrike milde vilkår. Etter Napoleons «hundre dager» i 1815 ble vilkårene strengere: grensene fra 1790, 700 millioner franc i erstatning og okkupasjon fram til 1818. Men Frankrike ble ikke delt opp." },
        { id: "tyskland", tittel: "De tyske statene", sporsmal: "Hvordan skal de mange tyske statene organiseres?",
          valg: [
            { id: "a", tekst: "Alle tyske stater slås sammen til ett tysk keiserrike.", poeng: { gb: -1, ru: -2, at: -2, pr: 2, fr: -3, sx: -1 }, risiko: 2 },
            { id: "b", tekst: "Et løst forbund av 39 tyske stater, ledet av Østerrike.", poeng: { gb: 2, ru: 2, at: 3, pr: 1, fr: 1, sx: 2 }, risiko: 0 },
            { id: "c", tekst: "Ingen felles ordning – hver stat klarer seg selv.", poeng: { gb: 0, ru: 1, at: 0, pr: -1, fr: 2, sx: 1 }, risiko: 2 }
          ], ekte: "b", ekteTekst: "Det tyske forbund ble opprettet med 39 stater under ledelse av Østerrike. Først i 1871 ble Tyskland samlet til ett land – under Preussen." },
        { id: "slaver", tittel: "Slavehandelen", sporsmal: "Skal kongressen gjøre noe med handelen med slavebundne afrikanere?",
          valg: [
            { id: "a", tekst: "Kongressen vedtar en erklæring som fordømmer slavehandelen – men uten straff.", poeng: { gb: 2, ru: 1, at: 1, pr: 1, fr: 0, sx: 0 }, risiko: 0 },
            { id: "b", tekst: "Slavehandelen forbys, og britiske skip får lov til å kontrollere andre lands skip.", poeng: { gb: 3, ru: 0, at: 0, pr: 0, fr: -2, sx: 0 }, risiko: 1 },
            { id: "c", tekst: "Saken hører ikke hjemme her. Ingen vedtak.", poeng: { gb: -2, ru: 0, at: 0, pr: 0, fr: 1, sx: 0 }, risiko: 0 }
          ], ekte: "a", ekteTekst: "Kongressen vedtok i februar 1815 en erklæring om at slavehandelen var i strid med menneskelighet – men ga ingen straff. Slavehandelen fortsatte i mange år, og slaveriet i de europeiske koloniene ble først avskaffet senere (Storbritannia 1833–1838, Frankrike 1848)." }
      ],
      hendelser: [
        { tittel: "Nyhet fra Elba!", tekst: "Mars 1815: Napoleon har rømt fra Elba og gått i land i Frankrike! Soldatene slutter seg til ham, og kongen flykter fra Paris. Delegasjonene må bestemme seg raskt: Skal dere stå sammen mot ham?" },
        { tittel: "Krigsfare", tekst: "Januar 1815: Russland og Preussen nekter å gi seg om Polen og Sachsen. Storbritannia, Østerrike og Frankrike inngår en hemmelig forsvarsallianse. Hvis ingen gir seg, kan det bli ny krig – mellom de som nettopp vant!" }
      ],
      etter: [
        "Etter Waterloo i juni 1815 ble Napoleon sendt i eksil på St. Helena, langt ute i Atlanterhavet.",
        "Wienerkongressen ga Europa et nytt kart og et system der stormaktene møttes for å løse konflikter – «konserten i Europa». Det gikk nesten 40 år før stormaktene igjen kriget mot hverandre (Krimkrigen 1853).",
        "Men kongressen tok lite hensyn til folkene selv. Polakker, italienere og tyskere ble fordelt uten å bli spurt. Kravene om nasjonal frihet og demokrati førte til revolusjoner i 1830 og 1848 – og nasjonalismen ble en av de store kreftene på 1800-tallet."
      ],
      sporsmal: [
        "Hvem fikk mest ut av avtalen deres – og hvorfor?",
        "Hvorfor tror du delegasjonene i lobbyen hadde så liten makt?",
        "Wienerkongressen ga Europa lang fred mellom stormaktene. Hva kan være grunnen?",
        "Hvilke grupper ble ikke spurt? Hva kunne det føre til senere?"
      ],
      kontroller: ["Preussen fikk ca. 40 % av Sachsen.", "Annen Paris-fred november 1815: 1790-grenser, 700 mill. franc, okkupasjon til 1818.", "Det tyske forbund med 39 stater.", "Erklæringen om slavehandelen 8. februar 1815.", "Poengene og risikotallene i spillet er en forenkling laget for rollespillet."]
    },
    {
      id: "versailles-1919", tittel: "Fredskonferansen i Paris", sted: "Paris og Versailles", dato: "1919", ikon: "🕊️", farger: ["#3b3a35", "#b8a46a"],
      tema: "sf9-forste-verdenskrig", koblet: ["sf10-mellomkrigstiden", "sf10-andre-verdenskrig"], trinn: 9,
      intro: "Første verdenskrig er over. Rundt 17 millioner mennesker er døde, og store deler av Frankrike og Belgia er ødelagt. I januar 1919 møtes seierherrene i Paris for å skrive freden. Hele verden følger med. Kan de skape en fred som varer?",
      bakgrunn: [
        "Tyskland ga opp i november 1918 og trodde freden skulle bygge på den amerikanske presidenten Woodrow Wilsons «fjorten punkter» – blant annet at folk skulle få bestemme over seg selv, og at et folkeforbund skulle hindre nye kriger.",
        "Men seierherrene er uenige. Frankrike har mistet over én million soldater og vil sikre seg mot Tyskland for alltid. Storbritannia vil ha erstatning, men ikke et Europa i kaos. USA vil ha en ny verdensorden.",
        "Tyskland og de andre tapende landene får ikke være med på forhandlingene. Heller ikke Russland, som er midt i en borgerkrig, er invitert. De viktigste beslutningene tas av «De fire store»."
      ],
      delegasjoner: [
        { id: "fr", navn: "Frankrike", leder: "statsminister Clemenceau", ikon: "🇫🇷", farge: "#2b5ea8", stemme: true,
          hvem: "Det landet som har lidd mest. Krigen ble utkjempet på fransk jord, og hele byer og landsbyer er lagt i ruiner.",
          mal: "Tyskland må aldri igjen kunne angripe Frankrike. Dere vil ha erstatning for ødeleggelsene, en svak tysk hær og trygghet langs grensen ved elva Rhinen.",
          hemmelig: "Få det strengeste alternativet i minst to av disse sakene: erstatning, hæren og Rhinland." },
        { id: "gb", navn: "Storbritannia", leder: "statsminister Lloyd George", ikon: "🇬🇧", farge: "#2f4a8a", stemme: true,
          hvem: "Verdens største imperium. Dere har mistet nesten en million soldater fra hele imperiet.",
          mal: "Velgerne hjemme vil at «Tyskland skal betale». Men dere vil ikke at Tyskland skal bli så fattig at det blir kaos eller kommunisme, eller at Frankrike blir for mektig. Dere vil sikre imperiet og sjømakten.",
          hemmelig: "De tyske koloniene i Afrika og Stillehavet bør komme under britisk kontroll. Ikke la Frankrike få alt det vil ha ved Rhinen." },
        { id: "us", navn: "USA", leder: "president Wilson", ikon: "🇺🇸", farge: "#8a2b2b", stemme: true,
          hvem: "Den nye supermakten. Dere kom sent inn i krigen, men avgjorde den.",
          mal: "Wilson drømmer om en rettferdig fred: Folk skal få bestemme over seg selv, og et folkeforbund skal løse konflikter uten krig. Han vil ikke ha en hevnfred.",
          hemmelig: "Folkeforbundet er det aller viktigste. Dere kan gi etter i andre saker for å få det." },
        { id: "it", navn: "Italia", leder: "statsminister Orlando", ikon: "🇮🇹", farge: "#2e7d4f", stemme: true,
          hvem: "Dere gikk inn i krigen på de alliertes side i 1915 etter løfter om nye landområder.",
          mal: "Italia vil ha det dere ble lovet: Sør-Tirol, Trieste og kysten av Dalmatia – og helst havnebyen Fiume.",
          hemmelig: "Hvis dere ikke får støtte, kan dere true med å forlate konferansen. (Orlando gjorde det i april 1919!)" },
        { id: "de", navn: "Tyskland", leder: "utenriksminister Brockdorff-Rantzau", ikon: "🇩🇪", farge: "#555555", stemme: false,
          hvem: "Den tapende parten. Keiseren har flyktet, og landet er en ny og skjør republikk. Folk sulter, og det er uro i gatene.",
          mal: "Dere får ikke sitte ved bordet. Dere får bare se avtalen når den er ferdig. Men dere kan prøve å påvirke delegasjonene i lobbyen og skrive protestbrev.",
          hemmelig: "Argumenter for at en hard fred vil skape bitterhet og nye kriger. Hvem ved bordet kan være enig med dere?" },
        { id: "pl", navn: "Polen", leder: "Paderewski og Dmowski", ikon: "🇵🇱", farge: "#b23a3a", stemme: false,
          hvem: "En nasjon som ikke har hatt sin egen stat på over hundre år. Nå er sjansen her.",
          mal: "Dere vil ha en egen, sterk stat med tilgang til havet. Dere har ikke stemme, men dere har venner ved bordet.",
          hemmelig: "Frankrike vil ha et sterkt Polen som allierte øst for Tyskland. Bruk det!" }
      ],
      saker: [
        { id: "erstatning", tittel: "Erstatning", sporsmal: "Skal Tyskland betale for skadene etter krigen?",
          valg: [
            { id: "a", tekst: "Ingen erstatning. Alle land bærer sine egne kostnader.", poeng: { fr: -3, gb: -1, us: 1, it: -1, de: 3, pl: 0 }, risiko: 0 },
            { id: "b", tekst: "Moderat erstatning for skadene i Frankrike og Belgia – et beløp Tyskland kan klare å betale.", poeng: { fr: 1, gb: 2, us: 2, it: 1, de: 0, pl: 1 }, risiko: 1 },
            { id: "c", tekst: "Svært høy erstatning: Tyskland skal betale for krigens skader og kostnader i mange tiår.", poeng: { fr: 3, gb: 1, us: -2, it: 2, de: -3, pl: 1 }, risiko: 3 }
          ], ekte: "c", ekteTekst: "Beløpet ble fastsatt i 1921 til 132 milliarder gullmark – en enorm sum. Mange økonomer, blant dem britiske John Maynard Keynes, advarte om at det ville ødelegge den tyske økonomien." },
        { id: "haer", tittel: "Den tyske hæren", sporsmal: "Hvor stor hær skal Tyskland få ha?",
          valg: [
            { id: "a", tekst: "Tyskland beholder hæren sin.", poeng: { fr: -3, gb: -1, us: 0, it: -1, de: 3, pl: -2 }, risiko: 2 },
            { id: "b", tekst: "Hæren begrenses til 100 000 mann, uten ubåter, fly og stridsvogner.", poeng: { fr: 2, gb: 3, us: 2, it: 2, de: -1, pl: 2 }, risiko: 1 },
            { id: "c", tekst: "Tyskland får ingen hær i det hele tatt.", poeng: { fr: 3, gb: 0, us: 0, it: 1, de: -3, pl: 2 }, risiko: 2 }
          ], ekte: "b", ekteTekst: "Tyskland fikk en hær på 100 000 mann og ingen ubåter, militærfly eller stridsvogner. På 1930-tallet brøt Hitler disse reglene åpent." },
        { id: "rhinland", tittel: "Rhinland", sporsmal: "Hva skal skje med området vest for elva Rhinen, mot den franske grensen?",
          valg: [
            { id: "a", tekst: "Rhinland forblir tysk, som før krigen.", poeng: { fr: -3, gb: 1, us: 1, it: 0, de: 3, pl: -1 }, risiko: 1 },
            { id: "b", tekst: "Rhinland forblir tysk, men uten soldater – og okkupert av de allierte i 15 år.", poeng: { fr: 2, gb: 2, us: 2, it: 1, de: -1, pl: 1 }, risiko: 1 },
            { id: "c", tekst: "Rhinland blir en egen stat under fransk kontroll.", poeng: { fr: 3, gb: -2, us: -2, it: 0, de: -3, pl: 1 }, risiko: 3 }
          ], ekte: "b", ekteTekst: "Rhinland ble demilitarisert og okkupert av allierte soldater. Frankrike fikk også Alsace-Lorraine tilbake. I 1936 sendte Hitler soldater inn i Rhinland – uten at noen stoppet ham." },
        { id: "skyld", tittel: "Skylden for krigen", sporsmal: "Skal avtalen si hvem som hadde skylden for krigen?",
          valg: [
            { id: "a", tekst: "Nei, avtalen sier ingenting om skyld.", poeng: { fr: -2, gb: 0, us: 1, it: -1, de: 3, pl: 0 }, risiko: 0 },
            { id: "b", tekst: "Ja, Tyskland og dets allierte erklæres ansvarlige for alle tap og skader i krigen.", poeng: { fr: 3, gb: 1, us: 0, it: 2, de: -3, pl: 1 }, risiko: 2 }
          ], ekte: "b", ekteTekst: "Paragraf 231 – «krigsskyldparagrafen» – sa at Tyskland og dets allierte var ansvarlige. Mange tyskere opplevde det som en ydmykelse, og nazistene brukte det i propagandaen sin." },
        { id: "polen", tittel: "Polen", sporsmal: "Skal det opprettes en ny polsk stat – og skal den få tilgang til havet?",
          valg: [
            { id: "a", tekst: "Ingen ny polsk stat.", poeng: { fr: -2, gb: 0, us: -2, it: 0, de: 3, pl: -3 }, risiko: 1 },
            { id: "b", tekst: "En ny polsk stat med en smal «korridor» til havet gjennom tysk område. Danzig blir en fri by.", poeng: { fr: 2, gb: 2, us: 3, it: 1, de: -2, pl: 2 }, risiko: 2 },
            { id: "c", tekst: "En stor polsk stat som også får hele Øst-Preussen.", poeng: { fr: 3, gb: -1, us: 0, it: 0, de: -3, pl: 3 }, risiko: 3 }
          ], ekte: "b", ekteTekst: "Polen ble en selvstendig stat med en korridor til Østersjøen, og Danzig (Gdańsk) ble en fri by under Folkeforbundet. Korridoren og Danzig ble en stor konflikt mellom Tyskland og Polen – og Tyskland angrep Polen i 1939." },
        { id: "folkeforbund", tittel: "Folkeforbundet", sporsmal: "Skal det lages en internasjonal organisasjon som skal hindre nye kriger?",
          valg: [
            { id: "a", tekst: "Ja, et folkeforbund der alle land er med fra starten – også Tyskland.", poeng: { fr: -1, gb: 1, us: 3, it: 0, de: 3, pl: 1 }, risiko: 0 },
            { id: "b", tekst: "Ja, et folkeforbund – men uten Tyskland og Russland i starten.", poeng: { fr: 2, gb: 2, us: 2, it: 1, de: -2, pl: 2 }, risiko: 1 },
            { id: "c", tekst: "Nei, ikke noe folkeforbund.", poeng: { fr: 0, gb: -1, us: -3, it: 0, de: 0, pl: -1 }, risiko: 2 }
          ], ekte: "b", ekteTekst: "Folkeforbundet ble opprettet i 1920, uten Tyskland (med fra 1926) og Sovjetunionen (med fra 1934). Det amerikanske senatet sa nei, så USA ble aldri med. Folkeforbundet klarte ikke å stoppe angrepene på 1930-tallet." },
        { id: "kolonier", tittel: "De tyske koloniene", sporsmal: "Hva skal skje med Tysklands kolonier i Afrika og Stillehavet?",
          valg: [
            { id: "a", tekst: "Tyskland beholder koloniene.", poeng: { fr: -2, gb: -2, us: 0, it: -1, de: 3, pl: 0 }, risiko: 0 },
            { id: "b", tekst: "Koloniene blir «mandater» som seierherrene styrer på vegne av Folkeforbundet.", poeng: { fr: 3, gb: 3, us: 1, it: 0, de: -2, pl: 0 }, risiko: 1 },
            { id: "c", tekst: "Koloniene blir selvstendige land.", poeng: { fr: -1, gb: -2, us: 2, it: -1, de: 0, pl: 0 }, risiko: 0 }
          ], ekte: "b", ekteTekst: "Koloniene ble mandater under Storbritannia, Frankrike, Belgia, Sør-Afrika, Japan og andre. Folkene i koloniene ble ikke spurt. Italia fikk ingen kolonier og følte seg snytt." }
      ],
      hendelser: [
        { tittel: "Italia går!", tekst: "April 1919: Den italienske delegasjonen forlater konferansen i protest fordi de ikke får byen Fiume. Kan de andre fortsette uten Italia? (Italia kom tilbake etter noen uker.)" },
        { tittel: "Presidenten er syk", tekst: "April 1919: President Wilson blir alvorlig syk under konferansen, trolig av spanskesyken. Han har mindre krefter til å kjempe for sine ideer. Den amerikanske delegasjonen mister 2 poeng i én sak de selv velger." },
        { tittel: "Sult i Tyskland", tekst: "De allierte fortsetter blokaden av Tyskland mens forhandlingene pågår. Folk sulter, og det er opprør i flere tyske byer. Tysklands delegasjon får holde en tale på ett minutt ved bordet." }
      ],
      etter: [
        "Tyskland måtte skrive under på Versailles-traktaten 28. juni 1919 – fem år etter skuddene i Sarajevo. Tyskerne kalte den et «diktat», fordi de ikke fikk forhandle.",
        "Mange tyskere følte seg ydmyket, og den økonomiske krisen i 1920- og 1930-årene gjorde bitterheten verre. Adolf Hitler og nazistene lovet å «rive i stykker» avtalen.",
        "Den franske marskalken Foch skal ha sagt om avtalen: «Dette er ikke fred, det er en våpenhvile for tjue år.» Andre verdenskrig begynte i september 1939 – tjue år senere."
      ],
      sporsmal: [
        "Sammenlign avtalen dere laget med Versailles-traktaten. Hva var likt, og hva var annerledes?",
        "Var Versailles-traktaten for streng, for mild – eller et rimelig kompromiss? Begrunn svaret.",
        "Hva kunne konferansen gjort annerledes for å hindre en ny krig?",
        "Sammenlign med Wienerkongressen i 1815 (hvis dere har spilt den): Hvorfor varte freden lenger da?"
      ],
      kontroller: ["Ca. 17 millioner døde i første verdenskrig (anslag varierer).", "132 milliarder gullmark (1921); hær på 100 000 mann; Rhinland okkupert 15 år; paragraf 231.", "Orlando forlot konferansen i april 1919; Wilson syk i april 1919.", "Fochs sitat er kjent, men gjengis ofte litt ulikt.", "Poengene og risikotallene i spillet er en forenkling laget for rollespillet."]
    }
  ]
};
