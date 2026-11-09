/* Les verden – FN-rollespill (fn.html)
   En forenklet utgave av «Model UN». Landene er OPPDIKTEDE, men
   bygger på typiske situasjoner i verden i dag. Slik slipper vi å
   legge meninger i munnen på ekte land.
   standpunkt per punkt: ["for" | "mot" | "endre", begrunnelse] */
window.LV = window.LV || {};
window.LV.fn = {
  land: [
    { id: "nordlandia", navn: "Nordlandia", farger: ["#2a6f97", "#f4d35e", "#2a6f97"], fakta: ["5 millioner innbyggere", "Svært rikt – mye av rikdommen kommer fra olje og gass", "Høy levestandard og et godt velferdssystem"] },
    { id: "kalmira", navn: "Kalmira", farger: ["#d4a017", "#1d6b3b", "#d4a017"], fakta: ["900 millioner innbyggere", "Rask økonomisk vekst – mange er løftet ut av fattigdom, men mange er fortsatt fattige", "Får det meste av strømmen fra kullkraft"] },
    { id: "tavu", navn: "Tavu-øyene", farger: ["#0aa2c0", "#f2c94c", "#0aa2c0"], fakta: ["120 000 innbyggere på 30 små øyer", "Lever av fiske og turisme", "Det høyeste punktet er bare fire meter over havet"] },
    { id: "valoria", navn: "Valoria", farger: ["#5b2a86", "#e0e0e0", "#2d6a4f"], fakta: ["330 millioner innbyggere", "Verdens største forbrukerøkonomi og en stor bilindustri", "Står for en stor del av verdens utslipp gjennom historien"] },
    { id: "sahar", navn: "Republikken Sahar", farger: ["#c56a1b", "#f5e6c8", "#2e7d32"], fakta: ["40 millioner innbyggere", "Fattig – de fleste lever av jordbruk", "Tørke blir vanligere, og landet grenser til krigsrammede Dalmaria"] },
    { id: "marenia", navn: "Marenia", farger: ["#1565c0", "#ffffff", "#43a047"], fakta: ["25 millioner innbyggere", "Lang kyst – fiske og turisme er viktige næringer", "Mellominntektsland med en voksende plastindustri"] }
  ],
  saker: [
    {
      id: "klima", ikon: "🌊", tittel: "Havet stiger",
      bakgrunn: "Klimaendringene gjør at havnivået stiger, tørke og flom blir vanligere, og mange mennesker kan bli tvunget til å flytte. Landene er uenige om hvem som skal kutte mest, og hvem som skal betale. Generalforsamlingen skal stemme over et forslag til resolusjon.",
      tema: "sf10-klimaendringer",
      punkter: [
        "Alle land skal halvere klimagassutslippene sine innen 2040.",
        "Rike land skal betale til et felles klimafond som hjelper fattige land med å kutte utslipp og tilpasse seg.",
        "Det skal ikke bygges nye kullkraftverk etter 2030.",
        "Land som mister områder til havet, skal få hjelp til å flytte innbyggerne, og disse skal få rettigheter som klimaflyktninger."
      ],
      roller: {
        nordlandia: { mal: "Vise at dere er et ansvarlig land, men beskytte inntektene fra olje og gass.", st: [["for", "Dere har råd til å kutte, og det gir et godt rykte."], ["endre", "Dere vil betale, men bare hvis pengene kontrolleres nøye."], ["for", "Dere har nesten ingen kullkraft selv."], ["for", "Dere vil vise solidaritet med små øystater."]], rod: "Dere godtar ikke et krav om å stanse all olje- og gassproduksjon.", tips: "Søk støtte hos Tavu-øyene. Vær forberedt på at noen kaller dere hyklere." },
        kalmira: { mal: "Få fortsette den økonomiske veksten og løfte flere ut av fattigdom.", st: [["endre", "Rike land som har sluppet ut mest gjennom historien, må kutte først og mest."], ["for", "Dere vil gjerne få penger fra fondet."], ["mot", "Kullkraft gir strøm til hundrevis av millioner. Dere trenger mer tid."], ["for", "Dere har selv store kystbyer som er truet."]], rod: "Dere godtar ikke et forbud mot nye kullkraftverk før 2040.", tips: "Samarbeid med Sahar om at rike land må betale. Pass på at Valoria ikke får skylden fordelt likt." },
        tavu: { mal: "Overleve som land. Uten store kutt kan øyene forsvinne.", st: [["for", "Dere ønsker enda strengere krav."], ["for", "Dere har ikke råd til å bygge diker selv."], ["for", "Hvert kullkraftverk gjør havet høyere."], ["for", "Dette handler om framtiden til hele folket deres."]], rod: "Dere stemmer mot hele resolusjonen hvis punkt 1 blir svekket for mye.", tips: "Bruk følelser og fakta. Fortell hvordan livet på øyene allerede er endret. Søk støtte hos Nordlandia og Marenia." },
        valoria: { mal: "Unngå at Valoria må betale mest, og beskytte arbeidsplassene i industrien.", st: [["endre", "Dere vil kutte, men vil ha 2050 som frist."], ["endre", "Store vekstland som Kalmira må også betale."], ["for", "Dere har allerede lagt ned mange kullkraftverk."], ["mot", "Dere frykter at det blir altfor mange som får rett til å flytte til rike land."]], rod: "Dere godtar ikke at Valoria alene får hovedansvaret for fondet.", tips: "Foreslå endringer i stedet for å stemme nei. Prøv å få Kalmira til å godta et kompromiss." },
        sahar: { mal: "Få hjelp til å takle tørken, og få rettferdig behandling.", st: [["endre", "Fattige land med nesten ingen utslipp bør få unntak."], ["for", "Dere trenger penger til vanning og nye avlinger."], ["for", "Dere har ingen kullkraftverk."], ["for", "Mange fra Sahar må allerede flytte på grunn av tørke."]], rod: "Dere godtar ikke krav om kutt som gjør folk fattigere.", tips: "Samarbeid med Kalmira om rettferdighet. Minn de rike landene om løfter de har gitt før." },
        marenia: { mal: "Beskytte kysten og fiskeriene, og få tilgang til ny grønn teknologi.", st: [["for", "Varmere hav skader fiskeriene deres."], ["endre", "Mellominntektsland bør kunne få penger, ikke bare gi."], ["for", "Dere satser på vind og sol."], ["endre", "Dere vil ha regionale avtaler om hvem som tar imot hvem."]], rod: "Dere godtar ikke at mellominntektsland må betale like mye som de rikeste.", tips: "Dere kan være brobyggere mellom rike og fattige land. Kom med kompromissforslag." }
      }
    },
    {
      id: "plast", ikon: "🧴", tittel: "Plast i havet",
      bakgrunn: "Store mengder plast havner i havet hvert år. Plasten skader fisk, fugler og andre dyr, og mikroplast finnes nå overalt. Noen land produserer mye plast, andre får søppelet skylt i land eller tar imot plastavfall fra andre land. Generalforsamlingen skal stemme over en ny plastavtale.",
      tema: "sf9-baerekraftsmaal",
      punkter: [
        "Engangsplast som sugerør, plastbestikk og plastposer skal forbys i alle land innen 2030.",
        "De som produserer plast, skal betale for innsamling og gjenvinning av plasten.",
        "Det skal opprettes et internasjonalt fond for å rydde opp i havet.",
        "Det skal bli forbudt å sende plastavfall til andre land."
      ],
      roller: {
        nordlandia: { mal: "Være et foregangsland for et rent hav.", st: [["for", "Dere har allerede pant og god innsamling."], ["for", "Det passer med deres eget system."], ["for", "Dere vil gjerne lede fondet."], ["endre", "Noe av avfallet deres sendes i dag til andre land for gjenvinning. Dere trenger en overgangstid."]], rod: "Ingen. Dere vil helst ha en streng avtale.", tips: "Vis til eget pantesystem som eksempel. Vær forsiktig: Dere eksporterer selv noe avfall." },
        kalmira: { mal: "Beskytte plastindustrien, som gir millioner av arbeidsplasser.", st: [["endre", "Dere trenger lengre tid enn 2030."], ["mot", "Det blir for dyrt for fabrikkene deres."], ["for", "Hvis rike land betaler mest."], ["for", "Dere vil ikke lenger ta imot søppel fra andre land."]], rod: "Dere godtar ikke at produsentene alene skal betale.", tips: "Pek på at rike land har sendt søppelet sitt til andre i årevis." },
        tavu: { mal: "Få slutt på plasten som skyller i land på øyene.", st: [["for", "Strendene deres er fulle av plast fra andre land."], ["for", "De som lager plasten, bør ta ansvar."], ["for", "Dere har ikke råd til å rydde alene."], ["for", "Dere vil ikke bli verdens søppelplass."]], rod: "Dere godtar ikke en avtale uten penger til opprydding.", tips: "Ta med et «bevis»: Beskriv hva som skyller i land på én strand på én dag." },
        valoria: { mal: "Unngå strenge regler for næringslivet.", st: [["endre", "Hvert land bør bestemme selv hva som forbys."], ["mot", "Dere frykter høyere priser for forbrukerne."], ["endre", "Fondet bør være frivillig."], ["endre", "Dere vil heller ha strengere regler for hvordan avfallet behandles."]], rod: "Dere godtar ikke bindende forbud som gjelder alle land likt.", tips: "Foreslå frivillige mål i stedet for forbud. Snakk om innovasjon og ny teknologi." },
        sahar: { mal: "Få hjelp til avfallshåndtering – og ikke få nye kostnader.", st: [["endre", "Dere har nesten ingen søppeltømming og trenger hjelp først."], ["for", "Dere produserer lite plast selv."], ["for", "Hvis fondet også hjelper elver og kyst i fattige land."], ["for", "Dere vil ikke ta imot andres søppel."]], rod: "Dere godtar ikke forbud dere ikke har penger til å gjennomføre.", tips: "Spør de rike landene hvem som skal betale for søppelbiler og sorteringsanlegg." },
        marenia: { mal: "Redde turismen og fiskeriene – men beskytte den nye plastindustrien.", st: [["for", "Turistene vil ha rene strender."], ["endre", "Gradvis innføring, så bedriftene rekker å omstille seg."], ["for", "Dere vil ha penger til egne strender."], ["for", "Dere tar i dag imot avfall fra andre land og vil slutte."]], rod: "Dere godtar ikke at hele kostnaden legges på produsentene med en gang.", tips: "Dere er splittet mellom to interesser. Finn et kompromiss som andre kan godta." }
      }
    },
    {
      id: "flyktninger", ikon: "⛺", tittel: "Krig i Dalmaria",
      bakgrunn: "Det oppdiktede landet Dalmaria er rammet av en borgerkrig. Over to millioner mennesker har flyktet, de fleste til nabolandet Sahar. Leirene er overfylte, og det mangler mat, vann og skoler. Generalforsamlingen skal stemme over et forslag til resolusjon om hvordan verden skal hjelpe.",
      tema: "sf9-migrasjon-flyktninger",
      punkter: [
        "Nabolandene skal holde grensene åpne for mennesker som flykter fra krigen.",
        "Alle FN-land skal ta imot et antall kvoteflyktninger etter hvor store og rike de er.",
        "Det skal opprettes et FN-fond for mat, vann, helse og skole i flyktningleirene.",
        "FN skal innkalle partene i krigen til fredsforhandlinger og innføre en våpenembargo mot Dalmaria."
      ],
      roller: {
        nordlandia: { mal: "Hjelpe mye i nærområdene, men ikke ta imot altfor mange selv.", st: [["for", "Det er i tråd med flyktningkonvensjonen."], ["endre", "Dere vil selv bestemme hvor mange dere tar imot."], ["for", "Dere vil gi mye penger til fondet."], ["for", "Dere vil gjerne være vertskap for fredssamtalene."]], rod: "Dere godtar ikke et tvungent tall på kvoteflyktninger.", tips: "Dere har lang erfaring med fredsarbeid. Bruk det." },
        kalmira: { mal: "Unngå at FN blander seg i andre lands indre forhold.", st: [["for", "Grensene bør være åpne."], ["mot", "Dere vil ikke bli tvunget til å ta imot flyktninger."], ["endre", "Dere gir heller mat og utstyr enn penger."], ["endre", "Dere støtter fredssamtaler, men ikke en våpenembargo – dere selger utstyr til regjeringen i Dalmaria."]], rod: "Dere godtar ikke våpenembargo.", tips: "Snakk om respekt for staters suverenitet. Pass på at dere ikke virker kalde." },
        tavu: { mal: "Vise solidaritet – selv om dere er små.", st: [["for", "Alle mennesker har rett til å søke beskyttelse."], ["for", "Hvis tallet tar hensyn til at dere er svært små."], ["for", "Dere kan ikke gi penger, men støtter fondet."], ["for", "Fred er det eneste som virkelig hjelper."]], rod: "Ingen.", tips: "Dere kan minne de andre på at Tavu-folket kanskje selv blir flyktninger en dag på grunn av havet." },
        valoria: { mal: "Stoppe krigen og hindre at den sprer seg, men begrense innvandringen til Valoria.", st: [["for", "Nabolandene bør hjelpe først."], ["endre", "Kvotene bør være frivillige."], ["for", "Dere gir gjerne mye – det er billigere enn å ta imot mange."], ["for", "Dere vil ha strenge sanksjoner."]], rod: "Dere godtar ikke faste kvoter.", tips: "Prøv å få Kalmira med på embargoen. Det blir vanskelig." },
        sahar: { mal: "Få verden til å dele ansvaret. Sahar kan ikke klare dette alene.", st: [["endre", "Dere holder grensen åpen, men bare hvis andre land også tar ansvar."], ["for", "Dette er det viktigste punktet for dere."], ["for", "Leirene i Sahar trenger hjelp nå."], ["for", "Krigen må ta slutt."]], rod: "Dere stemmer mot punkt 1 hvis punkt 2 og 3 ikke blir vedtatt.", tips: "Fortell om situasjonen i leirene. Dere har mest erfaring av alle i rommet." },
        marenia: { mal: "Hindre at mange flyktninger kommer i båt over havet til kysten deres.", st: [["for", "Hvis nabolandene får hjelp."], ["endre", "Dere har allerede tatt imot mange og vil ha fradrag for det."], ["for", "Hjelp i nærområdene gjør at færre legger ut på farlige båtreiser."], ["for", "Dere støtter fredssamtaler."]], rod: "Dere godtar ikke at land ved havet får et ekstra stort ansvar.", tips: "Samarbeid med Sahar: Begge vil at ansvaret skal deles." }
      }
    }
  ],
  gang: [
    ["Forbered deg", "Les rollekortet og resolusjonsforslaget. Skriv åpningsinnlegget ditt (ca. 1 minutt).", "10–15 min"],
    ["Åpningsinnlegg", "Hvert land får ett minutt til å si hva det mener om saken.", "10 min"],
    ["Forhandlinger", "Gå rundt og snakk med andre land. Finn allierte, og bli enige om endringer.", "10–15 min"],
    ["Endringsforslag", "Land kan foreslå å endre et punkt. Forslaget trenger støtte fra minst ett annet land.", "10 min"],
    ["Avstemning", "Det stemmes over hvert punkt: for, mot eller avstår. Flertall av dem som stemmer for eller mot, vinner.", "5 min"],
    ["Etterpå", "Ut av rollen: Hva var vanskelig? Var resultatet rettferdig? Hvordan ligner dette på ekte FN?", "10 min"]
  ],
  fraser: [
    ["Åpning", "Honourable Chair, distinguished delegates, …", "Ærede ordstyrer, kjære delegater, …"],
    ["Åpning", "The delegation of … believes that …", "Delegasjonen fra … mener at …"],
    ["Støtte", "We support this clause because …", "Vi støtter dette punktet fordi …"],
    ["Imot", "We cannot accept this clause, as …", "Vi kan ikke godta dette punktet, fordi …"],
    ["Endring", "We propose to change clause … to …", "Vi foreslår å endre punkt … til …"],
    ["Spørsmål", "Would the delegate of … explain how …?", "Kan delegaten fra … forklare hvordan …?"],
    ["Kompromiss", "We are willing to accept … if …", "Vi kan godta … hvis …"],
    ["Avslutning", "We urge all delegates to vote in favour of …", "Vi oppfordrer alle delegater til å stemme for …"]
  ]
};
