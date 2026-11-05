/* Tema: Utdanning og yrkesvalg (samfunnsfag, 10. trinn)
   Formatering: se forklaringen øverst i sf9-industrialiseringen.js
   NB: Tall og regler for inntak og utdanningsprogram endrer seg. Se kontroller. */

window.LV = window.LV || {};
window.LV.tema = {
  id: "sf10-utdanning-yrkesvalg",
  fag: "samfunnsfag",
  trinn: 10,
  sprak: "nb",
  tittel: "Utdanning og yrkesvalg",

  ingress: "Om noen måneder skal du søke videregående skole. Det er kanskje det første store valget du tar om din egen framtid. Hvilke muligheter har du, hva betyr valget – og hvordan kan du finne ut hva som passer for deg? I dette temaet ser vi på utdanningssystemet i Norge, på arbeidslivet i endring og på hva som påvirker valgene vi tar.",

  maal: [
    "beskrive utdanningssystemet i Norge og de ulike veiene gjennom videregående skole",
    "forklare hvordan arbeidslivet endrer seg, og hva det betyr for utdanningsvalg",
    "reflektere over hva som påvirker egne valg, og hvordan arbeid og utdanning henger sammen med levekår og livskvalitet"
  ],

  startsporsmal: "Hva drømte du om å bli da du var liten? Har drømmen endret seg – og i så fall hvorfor?",

  avsnitt: [
    {
      tittel: "Retten til utdanning",
      tekst: [
        "I Norge har alle barn rett og plikt til ti års grunnskole. Etter grunnskolen har alle ungdommer [[rett til videregående opplæring|ungdomsrett]]. Utdanningen er gratis, og du kan få stipend og lån fra Lånekassen. Slik har det ikke alltid vært. For hundre år siden gikk de fleste bare sju år på skolen, og videre utdanning var for de få som hadde råd.",
        "Retten til utdanning står i FNs barnekonvensjon og i menneskerettighetene. Likevel går rundt 250 millioner barn i verden ikke på skole. Fattigdom, krig og kjønn er de vanligste grunnene."
      ],
      lett: [
        "I Norge har alle rett til ti års grunnskole og tre års videregående skole. Skolen er gratis. Du kan få stipend og lån fra Lånekassen. Slik har det ikke alltid vært. I verden går rundt 250 millioner barn ikke på skole."
      ]
    },
    {
      tittel: "Videregående skole: to hovedveier",
      tekst: [
        "Videregående skole er delt i to hovedtyper utdanningsprogram. De **studieforberedende** programmene, som studiespesialisering, idrett, musikk, dans og drama, medier og kommunikasjon og kunst, design og arkitektur, tar som regel tre år. De gir [[generell studiekompetanse|studiekompetanse]], som du trenger for å studere ved universitet og høyskole.",
        "De **yrkesfaglige** programmene, som elektro og datateknologi, helse- og oppvekstfag, bygg- og anleggsteknikk og restaurant- og matfag, gjør deg klar for et yrke. Den vanligste modellen er to år på skolen og to år som [[lærling]] i en bedrift, der du får lønn mens du lærer. Til slutt tar du et [[fagbrev]] eller svennebrev. Etter yrkesfag kan du også ta et ekstra år, påbygging, for å få studiekompetanse.",
        "Norge mangler fagarbeidere innen mange yrker, blant annet helsefagarbeidere, elektrikere og rørleggere. Mange med fagbrev får jobb raskt og kan tjene godt – og mange starter sin egen bedrift."
      ],
      lett: [
        "Det finnes to hovedveier. **Studieforberedende** programmer tar tre år og gir rett til å studere på universitet. **Yrkesfag** gjør deg klar for et yrke. Ofte går du to år på skolen og er **lærling** i to år. Da får du lønn. Til slutt tar du **fagbrev**. Norge trenger mange fagarbeidere."
      ],
      stoppOgTenk: "Hvorfor tror du mange velger studieforberedende, selv om det er stort behov for fagarbeidere?"
    },
    {
      tittel: "Hvordan søker du?",
      tekst: [
        "Du søker videregående skole på **vilbli.no** innen 1. mars i 10. klasse. Du kan sette opp flere ønsker i prioritert rekkefølge. Til de fleste programmene blir du tatt inn etter [[karaktersnitt|poengsum]] – gjennomsnittet av standpunktkarakterene ganger ti. Noen programmer har opptaksprøver, og noen elever kan få fortrinnsrett.",
        "Rådgiveren på skolen kan hjelpe deg. Det kan også være lurt å besøke skoler på åpen dag, snakke med elever som går der, og prøve ut programmene i hospitering. Tenk ikke bare på hva vennene dine skal velge – det er din framtid."
      ],
      lett: [
        "Du søker på **vilbli.no** innen 1. mars i 10. klasse. Du kan sette opp flere ønsker. Karakterene dine bestemmer om du kommer inn. Rådgiveren på skolen kan hjelpe deg. Besøk gjerne skolene før du velger."
      ]
    },
    {
      tittel: "Et arbeidsliv i endring",
      tekst: [
        "Arbeidslivet forandrer seg stadig. For hundre år siden jobbet mange i jordbruk, fiske og industri. I dag jobber de fleste i [[tjenesteyting]], for eksempel i helse, skole, handel og IT. Nye teknologier som roboter og kunstig intelligens tar over noen oppgaver, men skaper samtidig nye jobber som ikke fantes før.",
        "Det betyr at du sannsynligvis vil bytte jobb flere ganger i livet, og at du må lære nye ting hele tiden. Mange kaller det [[livslang læring]]. Ferdigheter som å samarbeide, løse problemer, kommunisere og lære nytt blir derfor viktigere enn noen gang.",
        "Det grønne skiftet – overgangen til et samfunn med lavere klimautslipp – vil også endre arbeidslivet. Det trengs folk som kan bygge ut fornybar energi, gjøre bygninger mer energieffektive og utvikle ny teknologi."
      ],
      lett: [
        "Arbeidslivet forandrer seg hele tiden. Før jobbet mange i jordbruk og fabrikker. Nå jobber de fleste med tjenester, som helse, skole og handel. Roboter og kunstig intelligens tar over noen oppgaver. Du må regne med å lære nye ting hele livet."
      ],
      stoppOgTenk: "Hvilke jobber tror du vil finnes om 20 år som ikke finnes i dag?"
    },
    {
      tittel: "Hva påvirker valgene våre?",
      tekst: [
        "Vi tror kanskje at vi velger helt fritt, men mange ting påvirker oss: hva foreldrene våre jobber med, hva vennene velger, hva vi ser i sosiale medier, og forventninger knyttet til kjønn. I Norge velger fortsatt mange jenter helse- og omsorgsyrker, mens mange gutter velger tekniske fag. Det kalles et [[kjønnsdelt arbeidsmarked]].",
        "Også hvor du bor og familiens økonomi kan spille inn. Barn av foreldre med høy utdanning tar oftere høy utdanning selv. Velferdsstaten skal gi alle de samme mulighetene, men forskjellene er der fortsatt.",
        "Det er lurt å tenke over hva du liker å gjøre, hva du er god til, og hva som er viktig for deg i en jobb: lønn, fritid, trygghet, å hjelpe andre, å skape noe eller å få utfordringer. Det finnes ikke ett riktig valg – og de fleste valg kan endres senere."
      ],
      lett: [
        "Mange ting påvirker valget ditt: familien, vennene, sosiale medier og hva som er vanlig for jenter og gutter. Mange jenter velger helse, og mange gutter velger tekniske fag. Tenk på hva du liker, hva du er god til, og hva som er viktig for deg. De fleste valg kan endres senere."
      ]
    },
    {
      tittel: "Å fullføre",
      tekst: [
        "Rundt åtte av ti elever fullfører videregående skole i løpet av fem år, men mange slutter underveis. De som ikke fullfører, har større risiko for å havne utenfor arbeidslivet. Med den nye opplæringsloven fra 2024 har alle rett til å fullføre videregående opplæring, også om det tar lengre tid enn vanlig.",
        "Utdanning henger tett sammen med levekår og livskvalitet. Folk med utdanning har i gjennomsnitt høyere inntekt, bedre helse og lever lenger. Samtidig handler et godt liv om mer enn lønn og karrière. Arbeid gir også fellesskap, mening og identitet."
      ],
      lett: [
        "Rundt åtte av ti fullfører videregående skole. De som ikke fullfører, får oftere problemer med å få jobb. Utdanning gir ofte høyere lønn og bedre helse. Men et godt liv handler om mer enn penger. Arbeid gir også venner og mening."
      ],
      stoppOgTenk: "Hva er viktigst for deg i en framtidig jobb? Ranger lønn, fritid, trygghet, å hjelpe andre og å gjøre noe du liker."
    }
  ],

  tidslinje: [
    { dato: "1739", tekst: "Den første loven om skole for barn på landet i Norge." },
    { dato: "1889", tekst: "Lov om folkeskolen: sju års skole for alle barn." },
    { dato: "1947", tekst: "Statens lånekasse for utdanning blir opprettet." },
    { dato: "1969", tekst: "Ny lov om niårig grunnskole." },
    { dato: "1994", tekst: "Reform 94: alle ungdommer får rett til tre års videregående opplæring." },
    { dato: "1997", tekst: "Tiårig grunnskole og skolestart ved seks år." },
    { dato: "2024", tekst: "Ny opplæringslov: alle får rett til å fullføre videregående opplæring." }
  ],

  personer: [],

  ord: {
    "ungdomsrett": "Retten alle ungdommer som har fullført grunnskolen, har til å gå videregående skole.",
    "studiekompetanse": "Det du må ha fullført for å kunne søke på universitet og høyskole.",
    "lærling": "En som lærer et fag i en bedrift med lønn, vanligvis i to år etter to år på skolen.",
    "fagbrev": "Et bevis på at du har bestått en prøve og er utdannet fagarbeider i et yrke.",
    "poengsum": "Summen av karakterene dine som brukes når du søker videregående skole. Den er snittet ganger ti.",
    "tjenesteyting": "Arbeid der man yter tjenester til andre, i stedet for å produsere varer, for eksempel helse, skole og handel.",
    "livslang læring": "At man lærer nye ting gjennom hele livet, også etter at man er ferdig med skolen.",
    "kjønnsdelt arbeidsmarked": "At kvinner og menn i stor grad jobber i ulike yrker og bransjer."
  },

  sammendrag: [
    "Alle har rett til gratis videregående opplæring i Norge.",
    "Studieforberedende programmer gir studiekompetanse. Yrkesfag gir fagbrev, ofte etter to år på skolen og to år som lærling.",
    "Du søker på vilbli.no innen 1. mars og blir tatt inn etter karakterene dine.",
    "Arbeidslivet endrer seg med ny teknologi og det grønne skiftet. Livslang læring blir viktigere.",
    "Valgene våre påvirkes av familie, venner, kjønn og økonomi.",
    "Utdanning henger sammen med inntekt, helse og livskvalitet."
  ],

  oppgaver: {
    1: {
      finn: [
        "Hva er de to hovedveiene gjennom videregående skole?",
        "Hvor søker du videregående skole, og hva er fristen?",
        "Hva er en lærling?"
      ],
      forsta: [
        "Forklar forskjellen på studiekompetanse og fagbrev.",
        "Forklar hvorfor det er viktig å fullføre videregående skole."
      ],
      diskuter: [
        { tekst: "Hva liker du å gjøre, og hva er du god til? Hvilke yrker kunne passet?", partner: true }
      ]
    },
    2: {
      finn: [
        "Gå inn på vilbli.no og finn tre utdanningsprogram som interesserer deg. Hva kan du bli etter hvert av dem?",
        "Finn tre yrker det er stor mangel på i Norge."
      ],
      forsta: [
        "Forklar hvordan teknologi og det grønne skiftet endrer arbeidslivet.",
        "Forklar hva et kjønnsdelt arbeidsmarked er, og gi eksempler."
      ],
      diskuter: [
        { tekst: "Bør det gis ekstra poeng eller andre fordeler for å få flere gutter til helsefag og flere jenter til tekniske fag? Diskuter.", partner: true }
      ]
    },
    3: {
      finn: [
        "Intervju en voksen om yrket deres: Hvilken utdanning har de, hva liker de og ikke liker de med jobben, og hvordan har jobben endret seg?"
      ],
      forsta: [
        "Gjør rede for hvordan utdanning henger sammen med levekår og livskvalitet."
      ],
      diskuter: [
        "Drøft påstanden: «Vi velger fritt hva vi vil bli.»",
        "Drøft hva som bør være viktigst når du velger utdanning: interesser, jobbmuligheter eller lønn?"
      ]
    }
  },

  kobletTil: ["sf9-arbeidsliv", "sf9-okonomi", "sf10-norge-etter-1945", "sf9-fattigdom-ulikhet", "en8-school-youth-culture"],

  kilder: [
    { tittel: "Vilbli.no – søk videregående og les om programmene", url: "https://www.vilbli.no" },
    { tittel: "Utdanning.no – yrker og utdanninger", url: "https://utdanning.no" },
    { tittel: "Karriereveiledning.no", url: "https://karriereveiledning.no" },
    { tittel: "SSB: utdanning", url: "https://www.ssb.no/utdanning" }
  ],

  kontroller: [
    "Søknadsfrist 1. mars (fristen 1. februar for søkere med fortrinnsrett / individuell behandling).",
    "Utdanningsprogrammene etter fagfornyelsen (5 studieforberedende, 10 yrkesfaglige) – sjekk navn.",
    "Poengberegning: snitt av standpunkt × 10 (fra 2024 kan regler endres; ingen eksamenskarakter i 2020-2023).",
    "Fullføringsgrad ca. 80–82 % etter fem år (SSB).",
    "Ny opplæringslov fra 1.8.2024, rett til fullføring/omskolering for voksne – sjekk.",
    "Ca. 250 millioner barn utenfor skole (UNESCO 2023/24).",
    "Historikk: skoleloven 1739, folkeskoleloven 1889, Lånekassen 1947, grunnskoleloven 1969, Reform 94, R97.",
    "Sjekk at kildelenkene fungerer."
  ]
};
