/* =========================================================
   Les verden – Lag en lov (lov.html)
   Partiene er OPPDIKTET (169 plasser, 85 trengs for flertall).
   score > 0 = stemmer ja, 0 = avstår, < 0 = stemmer nei.
   kompromiss.d = endring i score for partiene.
   ========================================================= */
window.LV = window.LV || {};
LV.lov = {
  partier: [
    { id: "fel", navn: "Fellesskapspartiet", kort: "FP", plasser: 48, farge: "#c0392b", om: "Stort parti på venstresiden. Vil ha en sterk offentlig skole og små forskjeller." },
    { id: "mar", navn: "Markedspartiet", kort: "MP", plasser: 36, farge: "#1f5fa8", om: "Stort parti på høyresiden. Vil ha lavere skatt og mindre statlig detaljstyring." },
    { id: "byg", navn: "Bygdepartiet", kort: "BP", plasser: 22, farge: "#2e7d32", om: "Sentrumsparti. Opptatt av distriktene og av at kommunene skal bestemme mye selv." },
    { id: "try", navn: "Trygghetspartiet", kort: "TP", plasser: 21, farge: "#4a3b8f", om: "Parti på høyresiden. Vil ha tydelige regler og lave avgifter." },
    { id: "gro", navn: "Grønn Framtid", kort: "GF", plasser: 12, farge: "#6a9e1f", om: "Miljøparti. Opptatt av klima, natur og barn og unges framtid." },
    { id: "ven", navn: "Venstresiden", kort: "VS", plasser: 12, farge: "#8e1b3f", om: "Parti langt til venstre. Vil at fellesskapet skal betale for mer." },
    { id: "lib", navn: "Liberalerne", kort: "LIB", plasser: 9, farge: "#0e8a8a", om: "Liberalt parti. Opptatt av frihet for den enkelte og av utdanning." },
    { id: "ver", navn: "Verdipartiet", kort: "VP", plasser: 9, farge: "#b5651d", om: "Verdikonservativt parti. Opptatt av familie, trygghet og fellesskap." }
  ],
  saker: [
    {
      id: "mobil", ikon: "📵", tittel: "Mobilfri skole",
      forslag: "Mobiltelefoner skal ikke brukes i grunnskolen i skoletiden – verken i timene eller i friminuttene.",
      score: { fel: 0, mar: -1, byg: 1, try: 1, gro: -1, ven: -1, lib: -2, ver: 1 },
      grunner: { fel: "Er positive, men vil ha unntak for elever som trenger mobilen av helsegrunner.", mar: "Mener skolene selv bør bestemme, ikke staten.", byg: "Støtter forslaget – roligere skoledager.", try: "Støtter forslaget – tydelige regler.", gro: "Mener elever må lære å bruke teknologi fornuftig.", ven: "Redd for at elever med behov for hjelpemidler blir glemt.", lib: "Mener et forbud er feil vei – elevene må få ansvar.", ver: "Støtter forslaget – mer tid til lek og samtale." },
      horing: [
        { fra: "Elevrådet på Fjordvik ungdomsskole", tekst: "Vi er delt. Mange synes det er godt å slippe mobilen, men noen bruker den til å kontakte foreldrene eller for å måle blodsukker. Lag unntak for dem som trenger den." },
        { fra: "Foreldreforeningen Trygg Skolevei", tekst: "Vi støtter forbudet. Det blir mindre mobbing og bedre konsentrasjon. Men skolene trenger penger til låsbare skap." },
        { fra: "En rektor fra en liten skole", tekst: "Vi har allerede gode regler. La skolene selv bestemme hvordan forbudet skal praktiseres i friminuttene." }
      ],
      kompromiss: [
        { t: "Unntak for elever som trenger mobilen av helsegrunner eller som hjelpemiddel.", d: { fel: 1, ven: 2, lib: 1, try: -1 } },
        { t: "Hver skole bestemmer selv om forbudet skal gjelde i friminuttene.", d: { mar: 2, lib: 1, byg: -1, ver: -1 } },
        { t: "Staten betaler for oppbevaringsskap og evaluerer loven etter tre år.", d: { fel: 1, gro: 1, mar: -1 } }
      ]
    },
    {
      id: "stemme16", ikon: "🗳️", tittel: "Stemmerett for 16-åringer",
      forslag: "Alle som fyller 16 år i valgåret, skal få stemme ved kommunestyre- og fylkestingsvalg.",
      score: { fel: 0, mar: -1, byg: -1, try: -2, gro: 2, ven: 2, lib: 0, ver: -1 },
      grunner: { fel: "Delt: Mange er positive, men noen vil vente på forsøk først.", mar: "Mener stemmeretten bør følge myndighetsalderen på 18 år.", byg: "Usikre. Vil høre hva kommunene mener.", try: "Mot – mener 16-åringer er for unge.", gro: "For – unge rammes mest av klimapolitikken.", ven: "For – unge bør få si sin mening.", lib: "Positive, men vil ha bedre samfunnsfag i skolen først.", ver: "Mot – vil ikke dra politikken inn i ungdomstiden." },
      horing: [
        { fra: "Ungdomsrådet i Fjordvik", tekst: "Vi betaler skatt når vi har sommerjobb, og kommunen bestemmer over skolen og fritidstilbudet vårt. Vi vil være med og velge." },
        { fra: "En statsviter ved et universitet", tekst: "Forsøk med stemmerett for 16-åringer i noen kommuner har vist at mange unge stemmer første gang de kan. Effekten på hvem som vinner valget, er liten." },
        { fra: "En foreldreorganisasjon", tekst: "Vi er usikre. Unge kan bli påvirket av foreldre, venner eller sosiale medier. Skolen må i så fall gi bedre opplæring i demokrati." }
      ],
      kompromiss: [
        { t: "Starte med en prøveordning i 20 kommuner, og evaluere etterpå.", d: { fel: 1, byg: 2, lib: 1, gro: -1 } },
        { t: "Mer opplæring i demokrati og valg i ungdomsskolen fra samme år.", d: { lib: 2, ver: 1, mar: 1 } },
        { t: "Bare for kommunevalg, ikke for fylkestingsvalg.", d: { byg: 1, mar: 1, ven: -1 } }
      ]
    },
    {
      id: "skolemat", ikon: "🥪", tittel: "Gratis skolemat",
      forslag: "Alle elever på ungdomsskolen skal få et gratis, sunt måltid hver skoledag. Staten betaler.",
      score: { fel: 1, mar: -2, byg: 0, try: -1, gro: 1, ven: 2, lib: -1, ver: 0 },
      grunner: { fel: "For – gir likere muligheter for alle elever.", mar: "Mot – for dyrt, og foreldrene bør ha ansvaret for matpakka.", byg: "Positive, men vil at maten skal lages lokalt med norske råvarer.", try: "Mot – vil heller senke skatten så familiene får mer å rutte med.", gro: "For – hvis maten er sunn og mest mulig plantebasert.", ven: "For – og vil helst ha det i barneskolen også.", lib: "Usikre – vil heller bruke pengene på flere lærere.", ver: "Positive hvis det blir et felles måltid med voksne til stede." },
      horing: [
        { fra: "Elevrådet på Fjordvik ungdomsskole", tekst: "Mange elever spiser ikke frokost og har ikke med matpakke. Et felles måltid gjør at vi orker mer i timene." },
        { fra: "Fjordvik kommune", tekst: "Det er bra, men vi har ikke kjøkken på alle skolene. Staten må betale både mat, utstyr og ansatte – ellers går det ut over andre ting i skolen." },
        { fra: "En bondeorganisasjon i regionen", tekst: "Bruk lokale råvarer. Det gir både god mat og arbeidsplasser i distriktene." }
      ],
      kompromiss: [
        { t: "Kommunene får ekstra penger til kjøkken og ansatte de første årene.", d: { byg: 1, ver: 1, mar: -1 } },
        { t: "Krav om at mye av maten skal være lokalt produsert.", d: { byg: 2, gro: 1, lib: -1 } },
        { t: "Foreldre betaler en liten egenandel, men det er gratis for familier med lav inntekt.", d: { mar: 2, try: 2, lib: 2, ven: -2, fel: -1 } }
      ]
    }
  ],
  // Hvem kan foreslå en lov?
  hvem: { s: "Hvem kan legge fram et forslag til ny lov for Stortinget?", valg: ["Regjeringen og stortingsrepresentantene", "Bare kongen", "Bare Høyesterett", "Alle innbyggere kan sende lovforslag rett til votering"], riktig: 0,
    forklaring: "Som regel er det regjeringen som legger fram lovforslag (en proposisjon). Også stortingsrepresentanter kan fremme forslag (et representantforslag). Innbyggere kan påvirke gjennom høringer, partier, organisasjoner og innbyggerforslag i kommunen, men de kan ikke selv legge fram lovforslag i Stortinget." },
  // Debatt: hvilket argument er sterkest?
  debatt: {
    mobil: { valg: ["Undersøkelser fra skoler med mobilforbud tyder på bedre ro og mindre mobbing.", "Alle andre land har forbud, så vi må også ha det.", "De som er mot forbudet, bryr seg ikke om barna."], riktig: 0 },
    stemme16: { valg: ["Forsøk viser at mange 16-åringer stemmer, og at de som stemmer tidlig, ofte fortsetter å stemme.", "Alle ungdommer er smartere enn voksne.", "Motstanderne vil at unge aldri skal få bestemme noe."], riktig: 0 },
    skolemat: { valg: ["Et sunt måltid gir elevene mer energi og gjør det likere for alle, uansett hva de har hjemme.", "Mat er godt.", "Alle som er mot gratis skolemat, vil at barn skal sulte."], riktig: 0 }
  },
  prosess: [
    ["Forslag", "Regjeringen eller stortingsrepresentanter legger fram et lovforslag."],
    ["Høring", "Før regjeringen legger fram forslaget, sendes det på høring. Organisasjoner, kommuner og vanlige folk kan si sin mening."],
    ["Komiteen", "En fagkomité på Stortinget behandler forslaget og skriver en innstilling. Her forhandler partiene og inngår kompromisser."],
    ["Debatt og votering", "Forslaget debatteres i stortingssalen, og så stemmer representantene. Det trengs flertall."],
    ["To ganger", "En lov må behandles to ganger i Stortinget, med minst tre dager imellom. Den siste behandlingen kalles lovvedtak."],
    ["Sanksjon", "Kongen i statsråd sanksjonerer (godkjenner) loven, og statsministeren skriver under."],
    ["Kunngjøring", "Loven blir kunngjort i Norsk Lovtidend og gjelder fra den datoen som er bestemt."]
  ]
};
