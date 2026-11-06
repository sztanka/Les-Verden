/* Tema: Digital dømmekraft (samfunnsfag, 9. trinn)
   Formatering: se forklaringen øverst i sf9-industrialiseringen.js */

window.LV = window.LV || {};
window.LV.tema = {
  id: "sf9-digital-dommekraft",
  fag: "samfunnsfag",
  trinn: 9,
  sprak: "nb",
  tittel: "Digital dømmekraft",

  ingress: "Du bruker sikkert mobilen flere timer hver dag – til å snakke med venner, se videoer, spille og lære. Det digitale livet gir store muligheter, men også nye spørsmål. Hvem vet hva om deg? Hvorfor ser du akkurat de videoene du ser? Hva kan du dele, og hva bør du la være å dele? Digital dømmekraft handler om å ta gode valg på nett – for deg selv og for andre.",

  maal: [
    "forklare hva digitale spor og personvern er, og hvilke rettigheter du har",
    "beskrive hvordan algoritmer påvirker hva du ser på nett, og hva det kan bety for samfunnsdebatten",
    "reflektere over hva som er god og dårlig nettatferd, og hvordan du kan sette grenser for deg selv og respektere andres grenser"
  ],

  startsporsmal: "Hvis noen søkte på navnet ditt og så alt du har lagt ut, likt og kommentert det siste året – hva ville de tro om deg?",

  avsnitt: [
    {
      tittel: "Digitale spor",
      tekst: [
        "Alt du gjør på nett, setter spor. Noen spor legger du igjen med vilje: bilder, videoer og kommentarer du deler. Dette kalles **aktive spor**. Andre spor blir samlet inn uten at du tenker over det: hvilke sider du besøker, hvor lenge du ser på en video, hvor du er, og hva du søker etter. Dette kalles [[passive spor|passive spor]].",
        "Mange tjenester er gratis å bruke, men selskapene tjener penger på dataene dine. De bruker dem til å vise deg [[målrettet reklame]] og til å holde deg lenger på plattformen. Det sies ofte at «hvis du ikke betaler for produktet, er du produktet». Sporene kan også bli liggende lenge. Et bilde som er delt, kan bli lagret og spredt videre av andre, selv om du sletter det selv."
      ],
      lett: [
        "Alt du gjør på nett, setter **spor**. Noen spor legger du igjen med vilje, som bilder og kommentarer. Andre spor blir samlet inn uten at du merker det, for eksempel hva du søker etter. Selskapene tjener penger på dataene dine. Et bilde du har delt, kan bli spredt videre av andre."
      ],
      stoppOgTenk: "Tenk på appen du bruker mest. Hvilke opplysninger om deg tror du den samler inn?"
    },
    {
      tittel: "Personvern og rettighetene dine",
      tekst: [
        "[[Personvern]] betyr retten til et privatliv og til å bestemme over opplysninger om deg selv. I Norge og resten av EØS gjelder personvernforordningen, kalt **GDPR**, fra 2018. Den gir deg blant annet rett til å vite hvilke opplysninger et selskap har om deg, rett til å få feil rettet og i mange tilfeller rett til å få opplysninger slettet. Det kalles også **retten til å bli glemt**. **Datatilsynet** passer på at reglene blir fulgt.",
        "I Norge må du være 13 år for å samtykke selv til at sosiale medier bruker opplysningene dine. Regjeringen har foreslått å innføre en egen aldersgrense på 15 år for sosiale medier. Det er også regler for bilder: Som hovedregel må du spørre om lov før du legger ut bilder der andre personer er i fokus. Og det er alltid straffbart å dele nakenbilder av noen under 18 år – også hvis personen er på din egen alder og selv har sendt bildet."
      ],
      lett: [
        "**Personvern** betyr at du har rett til å bestemme over opplysninger om deg selv. Loven heter GDPR. Du kan be et selskap vise hva de vet om deg, og ofte få det slettet. Du må spørre før du legger ut bilder av andre. Det er alltid ulovlig å dele nakenbilder av noen under 18 år."
      ]
    },
    {
      tittel: "Algoritmer og filterbobler",
      tekst: [
        "Når du åpner en app, bestemmer en [[algoritme]] hva du får se. Algoritmen lærer av alt du gjør: hva du liker, hva du ser lenge på, og hva du hopper over. Målet er å vise deg det som holder deg lengst mulig i appen. Det betyr ofte innhold som vekker sterke følelser – noe som gjør deg glad, sint, redd eller misunnelig.",
        "Hvis du bare får se det som passer med det du allerede liker og mener, kan du havne i en [[filterboble]]. I et [[ekkokammer]] hører du mest de samme meningene om og om igjen, og andre synspunkter virker rare eller farlige. Mange forskere er bekymret for at dette kan gjøre samfunnet mer [[polarisert|polarisering]]. Andre mener at effekten er overdrevet, fordi de fleste også møter andre meninger gjennom venner, skole og nyheter. Uansett er det lurt å vite at feeden din ikke viser verden slik den er – den viser det algoritmen tror du vil se."
      ],
      lett: [
        "En **algoritme** bestemmer hva du ser i appene. Den lærer av hva du liker og ser på. Målet er at du skal bli lenge i appen. Hvis du bare ser det du allerede liker, kan du havne i en **filterboble**. Feeden din viser ikke hele verden – bare det algoritmen tror du vil se."
      ],
      stoppOgTenk: "Hva tror du feeden til en person med helt andre interesser enn deg inneholder? Hvordan kunne du funnet ut av det?"
    },
    {
      tittel: "Falske nyheter og KI",
      tekst: [
        "På nett kan hvem som helst publisere hva som helst. Noe av det som deles, er feil ved et uhell. Det kalles [[feilinformasjon]]. Annet er laget for å lure med vilje, for eksempel for å tjene penger, påvirke et valg eller skape uro. Det kalles [[desinformasjon]]. Falske nyheter spres ofte raskere enn sanne, fordi de er laget for å vekke sterke følelser.",
        "Med kunstig intelligens (KI) er det blitt lett å lage bilder, lyd og video som ser ekte ut. Slike forfalskninger kalles [[deepfakes|deepfake]]. Det betyr ikke at du ikke kan stole på noe – men at du må sjekke mer. Spør deg selv: Hvem står bak? Når ble det publisert? Hva sier andre kilder? Vekker det sterke følelser i meg? Og ikke del før du har sjekket.",
        "Svindlere bruker også nettet. Falske konkurranser, meldinger om pakker som venter og kontoer som utgir seg for å være venner, prøver å få deg til å oppgi passord eller betale penger. Ingen seriøse aktører ber deg om passord eller koder i en melding."
      ],
      lett: [
        "Ikke alt på nett er sant. Noe er feil ved et uhell. Noe er laget for å lure med vilje. Det kalles **desinformasjon**. Med KI kan man lage falske bilder og videoer som ser ekte ut. Sjekk hvem som står bak, når det ble laget, og hva andre kilder sier – før du deler."
      ]
    },
    {
      tittel: "Nettvett: hvordan vi behandler hverandre",
      tekst: [
        "Det er lettere å skrive stygge ting på en skjerm enn å si dem ansikt til ansikt. Man ser ikke reaksjonen til den andre, og noen tror de er anonyme. [[Netthets]] og digital mobbing kan være utestenging fra grupper, stygge kommentarer, spredning av bilder eller rykter. Det kan følge den som blir rammet hele døgnet, også hjemme.",
        "Digital dømmekraft betyr å tenke før du poster: Ville jeg sagt dette til personen ansikt til ansikt? Ville jeg likt at noen delte dette om meg? Det betyr også å si fra eller hjelpe når du ser at noen blir hetset – du kan støtte den som blir rammet, rapportere innholdet og fortelle det til en voksen. De fleste plattformene har knapper for å blokkere og rapportere.",
        "Mange sier de ønsker å bruke mobilen mindre. Apper er designet for å være vanskelige å legge fra seg, med varsler, uendelig scrolling og «streaks». Å sette egne grenser – for eksempel ingen mobil på soverommet om natta – er også en del av digital dømmekraft."
      ],
      lett: [
        "Det er lett å skrive stygge ting på nett. **Netthets** kan være stygge kommentarer, rykter eller at noen blir holdt utenfor. Tenk før du poster: Ville du sagt det ansikt til ansikt? Hvis noen blir hetset, kan du støtte dem, rapportere og si fra til en voksen. Apper er laget for at du skal bruke dem mye. Det er lurt å sette grenser for deg selv."
      ],
      stoppOgTenk: "Hvilken regel for mobilbruk tror du hadde gjort hverdagen din bedre? Hvorfor?"
    },
    {
      tittel: "Digital samhandling og demokratiet",
      tekst: [
        "Sosiale medier har gitt flere en stemme. Ungdom kan starte kampanjer, samle underskrifter og nå politikere direkte. Klimastreikene i 2019 spredte seg til hele verden gjennom sosiale medier. Samtidig kan hets føre til at folk slutter å si meningen sin offentlig. Undersøkelser viser at mange – særlig kvinner og minoriteter – lar være å delta i debatter på nett fordi de er redde for å bli hetset.",
        "Et godt demokrati trenger at folk kan være uenige på en saklig måte. Derfor er det viktig hvordan vi diskuterer på nett: å angripe argumenter og ikke personer, å sjekke fakta og å lytte til dem som mener noe annet enn oss."
      ],
      lett: [
        "På sosiale medier kan alle si meningen sin. Ungdom kan starte kampanjer og nå politikere. Men hets kan gjøre at folk slutter å delta i debatter. Et demokrati trenger at vi kan være uenige på en saklig måte."
      ]
    }
  ],

  tidslinje: [
    { dato: "1991", tekst: "World Wide Web blir åpnet for alle." },
    { dato: "2004", tekst: "Facebook blir lansert for studenter i USA." },
    { dato: "2007", tekst: "Den første iPhonen kommer, og smarttelefonen gjør internett mobilt." },
    { dato: "2010", tekst: "Instagram blir lansert." },
    { dato: "2018", tekst: "Personvernforordningen GDPR trer i kraft i EU og Norge." },
    { dato: "2018", tekst: "TikTok blir tilgjengelig i store deler av verden." },
    { dato: "2022", tekst: "ChatGPT blir lansert og gjør KI-verktøy kjent for millioner." }
  ],


  ord: {
    "passive spor": "Spor du etterlater på nett uten å tenke over det, for eksempel hvor du er og hva du søker etter.",
    "målrettet reklame": "Reklame som blir valgt ut til deg basert på opplysninger om deg og det du gjør på nett.",
    "personvern": "Retten til et privatliv og til å bestemme over opplysninger om deg selv.",
    "algoritme": "En oppskrift som en datamaskin følger. I apper bestemmer algoritmer hva du får se.",
    "filterboble": "Når du bare får se innhold som passer med det du allerede liker og mener.",
    "ekkokammer": "Et sted, for eksempel på nett, der man stort sett hører de samme meningene gjentatt.",
    "polarisering": "Når grupper i samfunnet blir mer uenige og mistenksomme mot hverandre.",
    "feilinformasjon": "Uriktig informasjon som spres uten at det er meningen å lure noen.",
    "desinformasjon": "Uriktig informasjon som spres med vilje for å lure eller påvirke.",
    "deepfake": "Bilde, lyd eller video laget med KI som får det til å se ut som om noen sier eller gjør noe de aldri har sagt eller gjort.",
    "netthets": "Trakassering, trusler eller stygge angrep på nett."
  },

  sammendrag: [
    "Alt du gjør på nett, setter aktive og passive spor. Selskapene tjener penger på dataene dine.",
    "Personvernloven GDPR gir deg rett til innsyn, retting og ofte sletting av opplysninger om deg.",
    "Du må spørre om lov før du deler bilder av andre. Å dele nakenbilder av noen under 18 år er alltid straffbart.",
    "Algoritmer bestemmer hva du ser, og kan gi filterbobler og ekkokamre.",
    "Sjekk kilden før du deler – KI gjør det lett å lage falske bilder og videoer.",
    "God nettatferd og egne grenser er en viktig del av digital dømmekraft, og påvirker også demokratiet."
  ],

  oppgaver: {
    1: {
      finn: [
        "Hva er forskjellen på aktive og passive digitale spor?",
        "Hva er GDPR?",
        "Hva er en deepfake?"
      ],
      forsta: [
        "Forklar med egne ord hva en algoritme gjør i en app.",
        "Forklar hvorfor du bør spørre om lov før du legger ut bilder av andre."
      ],
      diskuter: [
        { tekst: "Hva gjør du hvis du ser at noen blir hetset i en gruppechat? Lag en liste med tre ting dere kan gjøre.", partner: true }
      ]
    },
    2: {
      finn: [
        "Finn tre rettigheter du har etter personvernloven.",
        "Finn fire spørsmål du kan stille for å sjekke om noe på nett er sant."
      ],
      forsta: [
        "Forklar forskjellen på feilinformasjon og desinformasjon, og gi et eksempel på hver.",
        "Forklar hva som menes med «hvis du ikke betaler for produktet, er du produktet»."
      ],
      diskuter: [
        { tekst: "Bør det være 15 års aldersgrense på sosiale medier? Finn argumenter for og mot.", partner: true }
      ]
    },
    3: {
      finn: [
        "Finn ut hvilke opplysninger en app du bruker, samler inn om deg. Se i personvernerklæringen eller innstillingene. Presenter det du fant."
      ],
      forsta: [
        "Forklar hvordan filterbobler og ekkokamre kan påvirke samfunnsdebatten. Bruk begrepet polarisering."
      ],
      diskuter: [
        "Drøft hvem som har mest ansvar for at ungdom har det bra på nett: ungdommene selv, foreldrene, skolen, selskapene eller staten.",
        "Drøft om sosiale medier har gjort demokratiet sterkere eller svakere."
      ]
    }
  },

  kobletTil: ["sf9-medier-pavirkning", "sf8-kildekritikk", "sf10-polarisering", "sf8-identitet-sosialisering", "en10-group-think", "en9-media-advertising"],

  kilder: [
    { tittel: "Datatilsynet: personvern for barn og unge", url: "https://www.datatilsynet.no" },
    { tittel: "Medietilsynet: barn og medier", url: "https://www.medietilsynet.no" },
    { tittel: "Nettvett.no", url: "https://nettvett.no" },
    { tittel: "Faktisk.no: faktasjekk og kildekritikk", url: "https://www.faktisk.no" },
    { tittel: "NDLA: søk på «digital dømmekraft»", url: "https://ndla.no/search?query=digital%20d%C3%B8mmekraft" }
  ],

  kontroller: [
    "GDPR gjelder i Norge fra 20.7.2018 (EU 25.5.2018); art. 15–17: innsyn, retting, sletting.",
    "Aldersgrense 13 år for samtykke i personopplysningsloven § 5; forslag om 15-års aldersgrense – sjekk status før bruk.",
    "Bilder av personer: åndsverkloven § 104 (samtykke som hovedregel).",
    "Deling av seksualiserte bilder av personer under 18: straffeloven § 311.",
    "WWW åpnet for allmennheten 1991; Facebook 2004; iPhone 2007; Instagram 2010; TikTok internasjonalt 2017–2018; ChatGPT 30.11.2022.",
    "Klimastreikene (Fridays for Future) 2018–2019.",
    "Sjekk at kildelenkene fungerer."
  ]
};
