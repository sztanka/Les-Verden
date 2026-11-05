/* =========================================================
   Les verden – Kildedetektiven (kildedetektiv.html)
   Alle saker, kontoer, aviser og personer er oppdiktet (unntatt kjente
   institusjoner som SSB og WHO, som bare nevnes som kilder).
   svar: "sann" (troverdig) | "falsk" (ikke troverdig) | "usikker" (må sjekkes mer)
   spor: ledetråder eleven kan undersøke før hun bestemmer seg.
   ========================================================= */
window.LV = window.LV || {};
LV.kildedetektiv = [
  {
    id: "hai", sprak: "nb", type: "Innlegg i sosiale medier", avsender: { navn: "NyheterNå 24/7", konto: "@nyheterna24_7", info: "Konto opprettet for 12 dager siden · 41 000 følgere" },
    dato: "I dag kl. 07.12", tekst: "🚨 HELT VILT!!! Etter flommen i natt svømmer det en HAI på motorveien utenfor byen! DEL før de sletter det!! 🦈🌊",
    bilde: { ikon: "🦈", tekst: "Bilde: en haifinne i brunt flomvann mellom biler" },
    spor: [
      { navn: "Avsender", tekst: "Kontoen er bare 12 dager gammel, men har mange følgere. Navnet ligner en nyhetskanal, men det står ikke hvem som står bak." },
      { navn: "Bildet", tekst: "Et omvendt bildesøk viser at nøyaktig det samme bildet har blitt delt ved flommer i mange land de siste ti årene. Det er en kjent montasje." },
      { navn: "Andre kilder", tekst: "Ingen aviser, NRK eller politiet melder om hai på motorveien." },
      { navn: "Språket", tekst: "Store bokstaver, mange utropstegn og «DEL før de sletter det» er typisk for innlegg som vil spre seg raskt." }
    ],
    svar: "falsk", forklaring: "Bildet er en gammel montasje som dukker opp ved hver flom. Kontoen er ny og anonym, og ingen andre kilder bekrefter saken.", laerdom: "Sjekk bilder med omvendt bildesøk, og vær ekstra kritisk til innlegg som ber deg dele raskt."
  },
  {
    id: "buss", sprak: "nb", type: "Nyhetsartikkel", avsender: { navn: "Fjordposten", konto: "fjordposten.no", info: "Lokalavis · Redaktør: Kari Haugland · Redigert etter Vær Varsom-plakaten" },
    dato: "Tirsdag 3. mars kl. 14.30", tekst: "Nye busstider fra mandag: Skolebussen fra Nordvik går ti minutter tidligere. – Vi endrer rutene etter ønske fra skolen, sier trafikksjef Ola Berg i fylkeskommunen.",
    spor: [
      { navn: "Avsender", tekst: "Fjordposten er en kjent lokalavis med en ansvarlig redaktør. Avisen følger Vær Varsom-plakaten, og du kan klage til Pressens Faglige Utvalg (PFU) hvis noe er feil." },
      { navn: "Kilden i saken", tekst: "En navngitt person med en tydelig rolle blir sitert." },
      { navn: "Andre kilder", tekst: "Fylkeskommunens nettside har de samme nye rutetidene." },
      { navn: "Dato", tekst: "Saken er fra denne uka, og datoen står tydelig." }
    ],
    svar: "sann", forklaring: "Kjent avsender med redaktøransvar, navngitt kilde, tydelig dato – og fylkeskommunen bekrefter.", laerdom: "Redaktørstyrte medier og offisielle nettsider er gode steder å sjekke en sak."
  },
  {
    id: "einstein", sprak: "en", type: "Meme", avsender: { navn: "Daily Wisdom Quotes", konto: "@dailywisdomquotes", info: "Page with inspirational quotes · 2.1M followers" },
    dato: "Yesterday", tekst: "«Insanity is doing the same thing over and over again and expecting different results.» – Albert Einstein",
    bilde: { ikon: "🧑‍🔬", tekst: "Picture: a black-and-white photo of an old scientist with wild hair" },
    spor: [
      { navn: "Source", tekst: "The meme gives no book, speech or letter where Einstein said this." },
      { navn: "Other sources", tekst: "Researchers who check quotes have found no evidence that Einstein ever said or wrote it. Versions of the saying appear decades later, in other places." },
      { navn: "Why it spreads", tekst: "Putting a famous name on a quote makes it seem smarter and more trustworthy – so people share it without checking." }
    ],
    svar: "falsk", forklaring: "It is a well-known misattributed quote. There is no evidence that Einstein said it.", laerdom: "A famous name on a quote is not a source. Look for where and when it was said."
  },
  {
    id: "vannlekkasje", sprak: "nb", type: "Skjermbilde i en chat", avsender: { navn: "Videresendt melding", konto: "i klassechatten", info: "Ukjent hvem som skrev den først" },
    dato: "I går kl. 22.47", tekst: "Hørte fra en i 10B at skolen er STENGT i morgen pga vannlekkasje!!! Ikke kom 😂🙌",
    spor: [
      { navn: "Avsender", tekst: "Ingen vet hvem som skrev meldingen først. «Hørte fra en i 10B» er ikke en kilde." },
      { navn: "Offisielle kanaler", tekst: "Det står ingenting på skolens nettside eller i meldingen fra skolen – ennå. Det er sent på kvelden." },
      { navn: "Kan det stemme?", tekst: "Vannlekkasjer kan skje, så det er ikke umulig. Men du vet det ikke før skolen selv sier det." }
    ],
    svar: "usikker", forklaring: "Det kan stemme, men det finnes ingen pålitelig kilde. Sjekk skolens egne kanaler, eller spør en voksen – og møt opp hvis du ikke får bekreftet det.", laerdom: "Når du ikke kan bekrefte noe, er det beste svaret ofte: «Jeg vet ikke ennå.»"
  },
  {
    id: "mobil", sprak: "nb", type: "Annonse / popup", avsender: { navn: "Gratulerer-vinner.net", konto: "gratulerer-vinner.net", info: "Nettside registrert for 3 dager siden" },
    dato: "Akkurat nå", tekst: "🎉 GRATULERER! Du er besøkende nr. 1 000 000 og har vunnet en splitter ny mobil! Skriv inn navn, adresse og kortnummer innen 2 minutter for å betale frakt (kr 19). ⏰",
    spor: [
      { navn: "Nettadressen", tekst: "Nettsiden er bare noen dager gammel og har et rart navn. Den tilhører ingen kjent butikk." },
      { navn: "Hva ber de om?", tekst: "Kortnummer for å betale «frakt». Svindlere bruker små beløp for å få tak i kortopplysningene dine." },
      { navn: "Tidspress", tekst: "«Innen 2 minutter» skal få deg til å handle før du tenker." }
    ],
    svar: "falsk", forklaring: "Dette er svindel (phishing). Ingen vinner noe fordi de er «besøkende nr. 1 000 000».", laerdom: "Ikke gi fra deg kortnummer eller personopplysninger på grunn av en popup. Lukk siden og si fra til en voksen."
  },
  {
    id: "vaksine", sprak: "en", type: "News article", avsender: { navn: "Northfield News Service", konto: "northfieldnews.org", info: "Public broadcaster · Article by health reporter Emma Clarke" },
    dato: "12 May, 09:15", tekst: "Measles cases rose in Europe last year, according to new figures from the World Health Organization (WHO). Health experts say lower vaccination rates are the main reason.",
    spor: [
      { navn: "Source", tekst: "The article names the source of the numbers – the WHO – and links to the report." },
      { navn: "Author", tekst: "The article is written by a named health reporter at a known public broadcaster." },
      { navn: "Other sources", tekst: "The WHO website has the same figures. Several other news outlets report the same thing." }
    ],
    svar: "sann", forklaring: "A known broadcaster, a named reporter and an official source that you can check yourself.", laerdom: "Good articles tell you where the numbers come from – so you can check them."
  },
  {
    id: "ki-foto", sprak: "nb", type: "Innlegg med «historisk» bilde", avsender: { navn: "Gamle dager i bilder", konto: "@gamledagerbilder", info: "Side med historiske bilder · 85 000 følgere" },
    dato: "Søndag", tekst: "Sjeldent foto fra 1890-tallet! 😍 Arbeidere tar pause ved fabrikken langs Akerselva. Se så glade de er!",
    bilde: { ikon: "🖼️", tekst: "Bilde: smilende arbeidere i perfekt skarpt lys foran en fabrikk med et skilt" },
    spor: [
      { navn: "Detaljer i bildet", tekst: "Én av arbeiderne har seks fingre, og bokstavene på skiltet er bare rot. Ansiktene er glatte og helt like." },
      { navn: "Kilden", tekst: "Det står ikke hvem som tok bildet, eller hvilket museum eller arkiv det kommer fra. Ekte historiske bilder har nesten alltid en arkivkilde." },
      { navn: "Passer det med historien?", tekst: "Fotografier fra 1890-tallet var sjelden så skarpe, og folk smilte sjelden på bilder – lukkertiden var lang." }
    ],
    svar: "falsk", forklaring: "Bildet er laget med kunstig intelligens (KI). Seks fingre, rotete bokstaver og manglende arkivkilde avslører det.", laerdom: "Se etter feil i hender, tekst og bakgrunn – og spør hvor et historisk bilde kommer fra."
  },
  {
    id: "spillstudie", sprak: "nb", type: "Artikkel på en nettside", avsender: { navn: "Superhelse-tips", konto: "superhelse-tips.no", info: "Blogg om helse og livsstil · Selger kosttilskudd" },
    dato: "For to år siden", tekst: "NY STUDIE: Ungdom som spiller dataspill tre timer om dagen, får BEDRE karakterer! Forskere er sjokkert.",
    spor: [
      { navn: "Studien", tekst: "Artikkelen lenker ikke til studien. Når du finner den, viser det seg at den bare hadde 30 deltakere og ble betalt av et spillselskap." },
      { navn: "Hva sier studien egentlig?", tekst: "Studien fant at noen typer spill kan trene enkelte ferdigheter. Den sier ingenting om tre timer om dagen eller om karakterer." },
      { navn: "Avsender", tekst: "Bloggen tjener penger på klikk og salg. Det står ikke hvem som har skrevet artikkelen." },
      { navn: "Overskriften", tekst: "«Forskere er sjokkert» er en typisk klikkagn-formulering." }
    ],
    svar: "falsk", forklaring: "Saken er misvisende: Overskriften overdriver en liten, sponset studie som ikke sier det artikkelen påstår.", laerdom: "Finn den opprinnelige studien. Hvor mange var med, hvem betalte, og hva fant de egentlig?"
  },
  {
    id: "maanen", sprak: "en", type: "Video post", avsender: { navn: "TruthSeeker88", konto: "@truthseeker88", info: "Account posts mostly conspiracy videos · Not verified" },
    dato: "3 hours ago", tekst: "BREAKING: Former space agency worker ADMITS the Moon landing was filmed in a studio!!! They don't want you to see this 👀",
    bilde: { ikon: "🌕", tekst: "Video: a blurry man in shadow talking, with dramatic music" },
    spor: [
      { navn: "Who is the «worker»?", tekst: "The man is not named, his face is hidden, and there is no proof that he ever worked for a space agency." },
      { navn: "The account", tekst: "The account mostly shares conspiracy theories and has no contact information." },
      { navn: "The evidence", tekst: "The Moon landings are among the best-documented events in history: rock samples, independent tracking from other countries and mirrors left on the Moon that scientists still use today." },
      { navn: "The language", tekst: "«BREAKING», capital letters and «they don't want you to see this» are typical of conspiracy content." }
    ],
    svar: "falsk", forklaring: "An anonymous «witness» is not evidence, and the claim goes against a huge amount of independent proof.", laerdom: "Extraordinary claims need extraordinary evidence – not just a dramatic video."
  },
  {
    id: "ssb", sprak: "nb", type: "Innlegg fra elevavisa", avsender: { navn: "Skolebladet «Pennen»", konto: "@pennen_elevavis", info: "Elevavis ved Nordvik ungdomsskole · Redaktør: elevrådet" },
    dato: "Fredag", tekst: "Visste du at rundt hver femte innbygger i Norge har innvandrerbakgrunn? Det viser tall fra Statistisk sentralbyrå (SSB). Les mer på ssb.no 👉",
    spor: [
      { navn: "Kilden til tallet", tekst: "Innlegget sier hvor tallet kommer fra: SSB, som er statens offisielle statistikkbyrå." },
      { navn: "Kan du sjekke det?", tekst: "På ssb.no finner du det samme tallet, med forklaring på hva «innvandrerbakgrunn» betyr." },
      { navn: "Avsender", tekst: "En elevavis er ikke en stor nyhetsredaksjon, men her viser de til en god kilde og ber deg sjekke selv." }
    ],
    svar: "sann", forklaring: "Avsenderen er liten, men tallet kommer fra en pålitelig kilde som du selv kan sjekke.", laerdom: "Det viktigste er ikke alltid hvem som deler noe, men om de viser til en kilde du kan kontrollere."
  },
  {
    id: "storm", sprak: "en", type: "Video post", avsender: { navn: "World Weather Watch", konto: "@wwwatch_live", info: "Shares weather videos from around the world" },
    dato: "Today, 18:02", tekst: "LIVE NOW: Terrible storm hits the city TODAY! Look at the waves!! 🌪️ #storm",
    bilde: { ikon: "🌊", tekst: "Video: huge waves crashing over a harbour wall" },
    spor: [
      { navn: "Is the video new?", tekst: "A search for frames from the video shows that it was first posted three years ago – from a different country." },
      { navn: "Details", tekst: "The signs in the harbour are in a different language, and the weather in the video doesn't match today's forecast." },
      { navn: "What is true?", tekst: "There really is a storm warning today. That makes the old video feel believable." }
    ],
    svar: "falsk", forklaring: "The storm warning is real, but the video is old and from somewhere else. Old pictures in a new context are a very common kind of false information.", laerdom: "Ask: Is this picture or video really from here and now?"
  },
  {
    id: "leder", sprak: "nb", type: "Leder i en avis", avsender: { navn: "Fjordposten – leder", konto: "fjordposten.no/meninger", info: "Avisens leder er avisens egen mening" },
    dato: "Lørdag", tekst: "LEDER: Skoledagen bør starte klokka ni. Forskning tyder på at tenåringer sover for lite, og en senere start kan gi mer opplagte elever. Kommunen bør prøve det ut.",
    spor: [
      { navn: "Sjanger", tekst: "En leder er avisens mening – ikke en nyhet. Avisen skal argumentere, ikke være nøytral." },
      { navn: "Fakta i teksten", tekst: "Påstanden om at tenåringer trenger mye søvn, stemmer med det helsemyndighetene sier." },
      { navn: "Avsender", tekst: "Avisen står åpent fram med at dette er en mening, og hvem som har ansvaret." }
    ],
    svar: "sann", forklaring: "Teksten er troverdig – men den er en mening, ikke en nøytral nyhet. Du kan være uenig, selv om fakta i den stemmer.", laerdom: "Skill mellom fakta og meninger. En mening kan være godt begrunnet uten å være «sannheten»."
  }
];
