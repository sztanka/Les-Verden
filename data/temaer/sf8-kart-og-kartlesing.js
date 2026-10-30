/* Tema: Kart og kartlesing (samfunnsfag – geografi, 8. trinn)
   Formatering: se forklaringen øverst i sf9-industrialiseringen.js */

window.LV = window.LV || {};
window.LV.tema = {
  id: "sf8-kart-og-kartlesing",
  fag: "samfunnsfag",
  trinn: 8,
  sprak: "nb",
  tittel: "Kart og kartlesing",

  ingress: "Du bruker sannsynligvis kart flere ganger i uka – på mobilen for å finne veien, i et spill eller når du ser værmeldingen. Men et kart er aldri en helt nøyaktig kopi av virkeligheten. Hver gang noen lager et kart, må de velge hva som skal være med, hvor stort det skal være, og hvordan en rund jord skal bli flat. Å lese kart er å forstå disse valgene.",

  maal: [
    "bruke målestokk, himmelretninger, tegnforklaring og koordinater til å lese kart",
    "forklare hvorfor alle kart er forenklinger, og hva kartprojeksjoner er",
    "drøfte hvordan kart kan påvirke hvordan vi ser på verden"
  ],

  startsporsmal: "Tegn et kart over veien fra hjemmet ditt til skolen. Hva tok du med, og hva lot du være med?",

  avsnitt: [
    {
      tittel: "Hva er et kart?",
      tekst: [
        "Et kart er en forenklet tegning av hele eller deler av jordoverflaten, sett ovenfra. Det kan vise veier, byer, fjell, elver, grenser eller nesten hva som helst annet. Fordi et kart er mindre enn virkeligheten, må kartmakeren velge ut det som er viktig, og la resten være. Et turkart viser stier og høydekurver, mens et bykart viser gater og busstopp.",
        "Det finnes to hovedtyper kart. **Generelle kart** viser mange ting samtidig, som terreng, veier og stedsnavn – slik som i et atlas. [[Tematiske kart|tematisk kart]] viser ett bestemt tema, for eksempel nedbør, befolkningstetthet, språk eller hvor mange som har tilgang på rent vann."
      ]
    },
    {
      tittel: "Målestokk",
      tekst: [
        "[[Målestokken|målestokk]] forteller hvor mye virkeligheten er forminsket på kartet. På et kart med målestokk **1 : 50 000** tilsvarer 1 centimeter på kartet 50 000 centimeter i virkeligheten. Det er 500 meter. Mange kart har også en målestokklinje som viser hvor langt for eksempel én kilometer er.",
        "Et kart i **stor målestokk**, som 1 : 5 000, viser et lite område med mange detaljer, for eksempel et bykart. Et kart i **liten målestokk**, som 1 : 10 000 000, viser et stort område med få detaljer, for eksempel et kart over hele Europa. Husk: Jo større tallet etter kolon er, desto mindre er målestokken."
      ],
      stoppOgTenk: "Hvor langt er 4 cm på et kart med målestokk 1 : 25 000 i virkeligheten?"
    },
    {
      tittel: "Himmelretninger og tegnforklaring",
      tekst: [
        "De fleste kart har nord opp. De fire hovedretningene er **nord, sør, øst og vest**. Mellom dem ligger nordøst, sørøst, sørvest og nordvest. Et kompass har en nål som peker mot den magnetiske nordpolen, og det har reddet mange turgåere som har gått seg bort i tåke.",
        "Kartet bruker [[symboler|symbol]], farger og linjer for å vise ting. Hva de betyr, står i [[tegnforklaringen|tegnforklaring]]. Blått er som regel vann, grønt skog eller lavland, og brunt eller hvitt høyfjell. På turkart viser **høydekurver** hvor bratt terrenget er: Ligger kurvene tett, er det bratt. Ligger de langt fra hverandre, er det slakt."
      ]
    },
    {
      tittel: "Lengdegrader og breddegrader",
      tekst: [
        "For å kunne beskrive nøyaktig hvor et sted ligger, har vi delt jorda inn i et rutenett av tenkte linjer. **Breddegradene** går øst–vest, parallelt med ekvator. Ekvator er 0 grader, og polene er 90 grader nord og 90 grader sør. **Lengdegradene** går fra nordpolen til sørpolen. Nullmeridianen går gjennom Greenwich i London, og derfra teller man 180 grader østover og 180 grader vestover.",
        "Sammen gir lengdegrad og breddegrad et stedets [[koordinater]]. Oslo ligger for eksempel på omtrent 60 grader nord og 11 grader øst. Det er slik GPS-en i mobilen vet hvor du er: Den tar imot signaler fra satellitter og regner ut koordinatene dine."
      ]
    },
    {
      tittel: "En rund jord på flatt papir",
      tekst: [
        "Jorda er rund, men kart er flate. Det er umulig å gjøre en kule flat uten å strekke eller klippe i den – prøv å legge et appelsinskall flatt! Derfor må kartmakerne velge en [[kartprojeksjon]], en matematisk metode for å overføre jordas overflate til et flatt kart. Alle projeksjoner har feil: Noen gir riktig form, men feil størrelse, andre gir riktig størrelse, men feil form.",
        "Den mest kjente er **Mercator-projeksjonen** fra 1569. Den var laget for sjøfolk, fordi kursen blir en rett linje. Men den gjør områder nær polene altfor store. På et Mercator-kart ser Grønland nesten like stort ut som Afrika, men i virkeligheten er Afrika omtrent 14 ganger større. Andre projeksjoner, som **Gall-Peters** eller **Robinson**, prøver å vise størrelsene mer riktig."
      ],
      stoppOgTenk: "Hvorfor tror du det har betydning om Afrika ser mindre ut enn det egentlig er på kartet?"
    },
    {
      tittel: "Kart og makt",
      tekst: [
        "Kart er ikke nøytrale. De fleste verdenskart vi bruker i Norge, har Europa i midten og nord opp. Men det finnes ingen naturlig grunn til at nord skal være opp – i Australia selges det kart der sør er opp. Kart laget i Kina har ofte Asia i midten.",
        "Kart har også blitt brukt som et maktmiddel. Da europeiske land delte Afrika mellom seg på 1880-tallet, tegnet de grenser med linjal på kartet, uten å ta hensyn til folkene som bodde der. Stedsnavn på kart kan også være politiske. I Norge har samiske og kvenske stedsnavn i dag fått plass på skilt og kart, etter at de lenge ble utelatt."
      ]
    },
    {
      tittel: "Digitale kart",
      tekst: [
        "I dag bruker de fleste digitale kart, som karttjenester på mobilen. De kan zoome fra hele jorda til ett enkelt hus, og vise trafikk, kollektivtransport og satellittbilder i sanntid. Geografer bruker [[GIS]] – geografiske informasjonssystemer – til å legge mange lag med informasjon oppå hverandre, for eksempel for å planlegge nye veier eller finne områder som kan rammes av flom.",
        "Digitale kart er nyttige, men gir også nye spørsmål. Kartselskapene vet hvor vi er og hvor vi skal. Mange som bare følger mobilen, mister evnen til å orientere seg selv. Derfor er det fortsatt lurt å kunne lese et vanlig kart og bruke kompass – særlig på tur i fjellet, der mobilen kan miste dekning eller gå tom for strøm."
      ]
    }
  ],

  tidslinje: [
    { dato: "ca. 150", tekst: "Den greske geografen Ptolemaios lager et verdenskart med lengde- og breddegrader." },
    { dato: "1569", tekst: "Gerardus Mercator lager kartprojeksjonen som fortsatt brukes i mange kart." },
    { dato: "1773", tekst: "Norges geografiske oppmåling (i dag Kartverket) blir opprettet." },
    { dato: "1884", tekst: "Greenwich i London blir valgt som nullmeridian." },
    { dato: "1995", tekst: "GPS-systemet blir fullt utbygd og tatt i bruk over hele verden." }
  ],

  personer: [
    { navn: "Gerardus Mercator", levde: "1512–1594", rolle: "Flamsk kartmaker", tekst: "Han laget i 1569 en kartprojeksjon der kursen på havet blir en rett linje. Projeksjonen gjør land nær polene altfor store, men brukes fortsatt i mange digitale kart. Han var også den første som brukte ordet «atlas» om en samling kart." }
  ],

  ord: {
    "tematisk kart": "Et kart som viser ett bestemt tema, for eksempel nedbør, befolkning eller språk.",
    "målestokk": "Forholdet mellom en avstand på kartet og den samme avstanden i virkeligheten.",
    "symbol": "Et tegn som står for noe annet, for eksempel en blå strek for en elv på et kart.",
    "tegnforklaring": "En liste på kartet som forklarer hva symbolene og fargene betyr.",
    "koordinater": "Tall for lengdegrad og breddegrad som viser nøyaktig hvor et sted ligger på jorda.",
    "kartprojeksjon": "En matematisk metode for å overføre den runde jordoverflaten til et flatt kart.",
    "GIS": "Geografiske informasjonssystemer – dataprogrammer som legger flere lag med informasjon på et digitalt kart."
  },

  sammendrag: [
    "Et kart er en forenklet tegning av jordoverflaten. Det finnes generelle og tematiske kart.",
    "Målestokken viser hvor mye virkeligheten er forminsket. 1 : 50 000 betyr at 1 cm er 500 m.",
    "Himmelretninger, tegnforklaring og høydekurver hjelper oss å lese kartet.",
    "Lengdegrader og breddegrader gir koordinater som viser nøyaktig hvor et sted ligger.",
    "Alle kartprojeksjoner har feil. Mercator gjør land nær polene altfor store.",
    "Kart er ikke nøytrale, og digitale kart og GIS har forandret hvordan vi bruker kart."
  ],

  oppgaver: {
    1: {
      finn: [
        "Hva er forskjellen på et generelt og et tematisk kart?",
        "Hva betyr målestokk 1 : 50 000?",
        "Hvor går nullmeridianen?"
      ],
      forsta: [
        "Forklar forskjellen på stor og liten målestokk.",
        "Forklar hvordan du kan se på et turkart om terrenget er bratt."
      ],
      diskuter: [
        { tekst: "Finn koordinatene til skolen deres på en digital karttjeneste. Hvilke koordinater har den?", partner: true }
      ]
    },
    2: {
      finn: [
        "Finn to fordeler og to ulemper med Mercator-projeksjonen.",
        "Finn tre ting digitale kart kan som papirkart ikke kan."
      ],
      forsta: [
        "Forklar hvorfor det er umulig å lage et helt riktig flatt verdenskart.",
        "Forklar hvordan GPS-en vet hvor du er."
      ],
      diskuter: [
        { tekst: "Er det viktig å kunne lese papirkart og bruke kompass i dag? Diskuter.", partner: true }
      ]
    },
    3: {
      finn: [
        "Bruk minst tre avsnitt til å forklare hvilke valg en kartmaker må gjøre."
      ],
      forsta: [
        "Sammenlign et verdenskart med Mercator-projeksjon og et med en annen projeksjon. Hva er forskjellene, og hva kan de bety for hvordan vi ser på verden?"
      ],
      diskuter: [
        "«Ingen kart er nøytrale.» Drøft påstanden.",
        "Eksamensøving: Lag en god problemstilling om kart og makt. Skriv tre punkter du ville tatt med."
      ]
    }
  },

  kobletTil: ["sf8-klima-og-vegetasjon", "sf8-befolkning-urbanisering", "sf9-kolonialisme"],

  kilder: [
    { tittel: "Kartverket", url: "https://www.kartverket.no/" },
    { tittel: "Norgeskart", url: "https://norgeskart.no/" },
    { tittel: "The True Size Of …", url: "https://www.thetruesize.com/" },
    { tittel: "NDLA: søk på «kart»", url: "https://ndla.no/search?query=kartprojeksjon" }
  ],

  kontroller: [
    "Afrika ca. 30,4 mill. km², Grønland ca. 2,17 mill. km² → ca. 14 ganger.",
    "Mercator 1569; Ptolemaios ca. 150 e.Kr.; Norges geografiske oppmåling 1773; Greenwich-konferansen 1884; GPS fullt operativt 1995.",
    "Oslo ca. 59,9° N, 10,7° Ø (teksten sier «omtrent 60 grader nord og 11 grader øst»).",
    "Sjekk at kildelenkene fungerer."
  ]
};
