/* =========================================================
   Les verden – Tenkerutiner (tenkerutiner.html)
   Korte, faste tenkerutiner (inspirert av «Visible Thinking»,
   Project Zero, Harvard) brukt på bildene og temaene på siden.
   materiale: "bilde" (temabildet vises), "tema" (temaet i seg selv)
   steg: [tittel, spørsmål til elevene, tid i minutter]
   ========================================================= */
window.LV = window.LV || {};
LV.tenkerutiner = [
  { id: "se-tenk-undre", ikon: "👁️", navn: "Se – tenk – undre", en: "See – Think – Wonder", materiale: "bilde", fase: "Før lesing",
    kort: "Se nøye på et bilde før dere leser. Skill mellom det du ser, og det du tror.",
    steg: [["Se", "Hva ser du? Beskriv bare det du faktisk ser – farger, mennesker, ting, steder. Ingen tolkninger ennå!", 3], ["Tenk", "Hva tror du skjer? Hva får deg til å si det? Pek på noe i bildet.", 3], ["Undre", "Hva lurer du på? Skriv minst to spørsmål du vil finne svar på når du leser.", 2]],
    tips: "Skriv elevenes spørsmål fra «Undre» på tavla. Gå tilbake til dem etter at dere har lest fagteksten: Hvilke fikk vi svar på?" },
  { id: "zoom", ikon: "🔍", navn: "Zoom inn", en: "Zoom In", materiale: "bilde", zoom: true, fase: "Før lesing",
    kort: "Bildet vises bit for bit. For hver gang dere ser mer, må dere tenke på nytt.",
    steg: [["Første glimt", "Du ser bare en liten del av bildet. Hva ser du? Hva tror du dette er en del av?", 2], ["Mer av bildet", "Nå ser du mer. Hva ser du nå? Har du endret mening? Hvorfor?", 2], ["Hele bildet", "Nå ser du hele bildet. Hva overrasket deg? Hva lurer du fortsatt på?", 3]],
    tips: "Zoom inn viser at vi ofte trekker konklusjoner for raskt. Snakk om hvordan det samme gjelder for kilder og nyheter: Et utsnitt kan gi et helt annet inntrykk enn helheten." },
  { id: "pss", ikon: "🧩", navn: "Påstand – støtte – spørsmål", en: "Claim – Support – Question", materiale: "tema", fase: "Etter lesing",
    kort: "Lag en påstand om temaet, finn støtte for den i teksten, og still et kritisk spørsmål.",
    steg: [["Påstand", "Skriv en påstand om temaet – noe du mener er sant eller viktig. Eksempel: «Industrialiseringen gjorde livet bedre for de fleste.»", 3], ["Støtte", "Hva i teksten (eller i andre kilder) støtter påstanden din? Finn minst to ting.", 5], ["Spørsmål", "Hva kan noen si imot påstanden din? Hva er usikkert? Skriv et spørsmål som utfordrer påstanden.", 3]],
    tips: "Fin forberedelse til drøfting og argumenterende skriving. La elevene bytte påstander og finne støtte – eller motargumenter – for hverandres påstander." },
  { id: "tenk-lur-utforsk", ikon: "🧭", navn: "Tenk – lur – utforsk", en: "Think – Puzzle – Explore", materiale: "tema", fase: "Oppstart av tema",
    kort: "Finn ut hva klassen allerede vet, hva den lurer på, og hvordan den kan finne ut mer.",
    steg: [["Tenk", "Hva tror du at du allerede vet om dette temaet? Skriv alt du kommer på – også det du er usikker på.", 3], ["Lur", "Hva lurer du på? Hva synes du er forvirrende eller spennende?", 3], ["Utforsk", "Hvordan kan du finne ut mer? Hvilke kilder, personer eller steder kan hjelpe?", 3]],
    tips: "Samle svarene på en plakat og heng den opp. Kryss av underveis i temaet når klassen har funnet svar." },
  { id: "kompass", ikon: "🧭", navn: "Kompassrosen", en: "Compass Points", materiale: "tema", fase: "Diskusjon",
    kort: "Se på en sak fra fire retninger før dere tar stilling.",
    steg: [["Ø – Engasjerer", "Hva er spennende eller positivt med dette? Hva engasjerer deg?", 2], ["V – Vanskelig", "Hva er du bekymret for? Hva er vanskelig eller negativt?", 2], ["N – Trenger å vite", "Hva trenger du å vite mer om før du kan ta stilling?", 2], ["S – Standpunkt", "Hva mener du nå? Hva er ditt forslag eller standpunkt?", 3]],
    tips: "Passer godt til samfunnsspørsmål og dilemmaer i temaene, for eksempel klima, migrasjon eller digital dømmekraft. Kan brukes før en debatt." },
  { id: "overskrift", ikon: "📰", navn: "Overskriften", en: "Headlines", materiale: "tema", fase: "Etter lesing",
    kort: "Fang kjernen i temaet med én overskrift.",
    steg: [["Les", "Les fagteksten eller sammendraget. Hva er det aller viktigste?", 5], ["Overskrift", "Skriv en overskrift – maks ti ord – som fanger kjernen i temaet.", 3], ["Forklar", "Hvorfor valgte du akkurat den overskriften? Hva fikk ikke plass?", 3]],
    tips: "Samle overskriftene og sammenlign. Hvilke er mest presise? Hvilke er mest «klikkvennlige»? Koble gjerne til kildekritikk og mediebruk." },
  { id: "pleide", ikon: "🔄", navn: "Jeg pleide å tenke … nå tenker jeg", en: "I used to think … now I think", materiale: "tema", fase: "Avslutning",
    kort: "Hva har forandret seg i tankene dine etter at du har jobbet med temaet?",
    steg: [["Før", "Jeg pleide å tenke at …", 3], ["Nå", "Nå tenker jeg at …", 3], ["Hvorfor", "Hva var det som fikk deg til å endre tanker? Var det en tekst, en samtale, et bilde?", 3]],
    tips: "Fin som exit ticket etter et tema. Elevene blir bevisste på sin egen læring – og læreren får vite hva som gjorde inntrykk." },
  { id: "perspektivsirkel", ikon: "⭕", navn: "Perspektivsirkelen", en: "Circle of Viewpoints", materiale: "bilde", fase: "Etter lesing",
    kort: "Se bildet eller hendelsen fra ulike menneskers ståsted.",
    steg: [["Ståsteder", "Hvem kan ha en mening om det som skjer i bildet? Lag en liste over personer eller grupper – også de som ikke er med på bildet.", 3], ["Velg et perspektiv", "Velg én av dem. Fra mitt ståsted som … tenker jeg at …", 4], ["Spørsmål", "Hva lurer jeg på fra dette ståstedet? Hva ville jeg spurt de andre om?", 3]],
    tips: "Fordel ulike ståsteder i klassen. Se også <a href=\"perspektiv.html\">Perspektivbytte</a> for ferdige perspektiver fra historien." }
];
