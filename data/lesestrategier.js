/* =========================================================
   Les verden – lesestrategier (lesestrategier.html)
   Hver strategi: id (brukes som #anker), navn, en (engelsk navn), fase
   (for / under / etter), ikon, kort, hva, hvorfor, steg, eksempel,
   startere (engelske setningsstartere), prov (lenker til tekster på siden).
   ========================================================= */
window.LV = window.LV || {};
LV.lesestrategier = {
  faser: {
    for: { navn: "Før du leser", en: "Before reading", tekst: "Gjør hjernen klar. Finn ut hva du allerede vet, og hva teksten handler om." },
    under: { navn: "Mens du leser", en: "While reading", tekst: "Følg med på om du forstår. Stopp, tenk og jobb med ord og bilder." },
    etter: { navn: "Etter at du har lest", en: "After reading", tekst: "Samle tankene. Hva var det viktigste, og hva mener du om det?" }
  },

  strategier: [
    {
      id: "vol", fase: "for", ikon: "🧠", navn: "VØL-skjema", en: "KWL chart",
      kort: "Hva Vet jeg, hva Ønsker jeg å vite, og hva Lærte jeg?",
      hva: "Et VØL-skjema har tre kolonner: **V** – hva jeg *vet* fra før, **Ø** – hva jeg *ønsker* å finne ut, og **L** – hva jeg *lærte*. På engelsk heter det **KWL**: *Know – Want to know – Learned*. De to første kolonnene fyller du ut før du leser, den siste etterpå.",
      hvorfor: "Når du kobler ny kunnskap til noe du allerede vet, husker du den bedre. Spørsmålene i Ø-kolonnen gir deg dessuten noe å lete etter mens du leser.",
      steg: [
        "Les tittelen og se på bilder og mellomtitler.",
        "Skriv alt du vet om emnet i **V**-kolonnen – også det du er usikker på.",
        "Skriv 2–3 spørsmål du vil ha svar på i **Ø**-kolonnen.",
        "Les teksten. Se etter svar på spørsmålene dine.",
        "Fyll ut **L**-kolonnen. Sjekk også om noe i V-kolonnen var feil."
      ],
      eksempel: "**Temaet «Apartheid»** – V: «Nelson Mandela satt i fengsel.» Ø: «Hvorfor varte apartheid så lenge?» L: «Andre land innførte boikott, og det la press på regjeringen.»",
      startere: ["I already know that …", "I think I know that … but I am not sure.", "I want to find out why/how …", "I learned that …", "I was surprised that …"],
      skjema: true,
      prov: [{ t: "Alle temaer", u: "index.html" }, { t: "Ten Days in a Mad-House", u: "lesing.html?id=nellie-bly" }]
    },
    {
      id: "skumlese", fase: "for", ikon: "👀", navn: "Skumlese", en: "Skimming / previewing",
      kort: "Få oversikt over teksten på ett minutt før du leser nøye.",
      hva: "Å skumlese betyr å la blikket gli raskt over teksten for å få et overblikk – uten å lese hvert ord. Du ser på tittel, ingress, mellomtitler, bilder, bildetekster, uthevede ord og første setning i avsnittene.",
      hvorfor: "Når du vet hva teksten handler om og hvordan den er bygd opp, er det lettere å forstå detaljene når du leser grundig. Det er også lurt på prøver: Da vet du hvor du skal lete.",
      steg: [
        "Les tittel og ingress.",
        "Se på alle mellomtitler – de er som et innholdsfortegnelse.",
        "Se på bilder, kart, tidslinjer og faktabokser.",
        "Les første setning i hvert avsnitt (temasetningen).",
        "Si med én setning: «Denne teksten handler om …»"
      ],
      eksempel: "På en temaside kan du skumlese mellomtitlene først. Da ser du hele «reisen» i teksten – fra bakgrunn, via hendelser, til følger – før du begynner å lese.",
      startere: ["This text is about …", "The headings tell me that …", "The text is divided into … parts.", "The pictures show …"],
      prov: [{ t: "Alle temaer", u: "index.html" }, { t: "Votes for Women!", u: "lesing.html?id=votes-for-women" }]
    },
    {
      id: "forutsi", fase: "for", ikon: "🔮", navn: "Forutsi", en: "Predicting",
      kort: "Gjett hva som skal skje – og sjekk om du hadde rett.",
      hva: "Å forutsi betyr å bruke ledetråder (tittel, bilde, første avsnitt, det som har skjedd så langt) til å gjette hva som kommer. Du kan gjøre det før du leser og flere ganger underveis.",
      hvorfor: "Når du har gjettet noe, blir du nysgjerrig og leser mer aktivt. Du merker også fort om du har misforstått noe, fordi teksten ikke går dit du trodde.",
      steg: [
        "Se på tittelen og eventuelle bilder. Hva tror du teksten handler om?",
        "Skriv ned gjetningen din – og *hvorfor* du tror det.",
        "Les et stykke. Stopp og sjekk: Hadde du rett?",
        "Endre gjetningen hvis teksten tar en ny retning.",
        "Etter lesingen: Hva overrasket deg mest?"
      ],
      eksempel: "**The Monkey’s Paw**: Tittelen og advarselen fra soldaten får deg kanskje til å gjette at ønskene vil gå i oppfyllelse – men på en skremmende måte. Les og se om du har rett!",
      startere: ["I predict that …", "I think … will happen because …", "The title makes me think that …", "I was right/wrong about …", "I did not expect …"],
      prov: [{ t: "The Monkey’s Paw", u: "lesing.html?id=monkeys-paw" }, { t: "After Twenty Years", u: "lesing.html?id=after-twenty-years" }]
    },
    {
      id: "stopp", fase: "under", ikon: "✋", navn: "Stopp og tenk", en: "Stop and think / monitoring",
      kort: "Følg med på om du faktisk forstår det du leser.",
      hva: "Gode lesere legger merke til når de *ikke* forstår. «Stopp og tenk» betyr å ta en pause etter et avsnitt og spørre seg selv: Hva skjedde nå? Henger det sammen med det jeg leste før? På engelsk kalles det *monitoring* – å overvåke sin egen forståelse.",
      hvorfor: "Det er lett å lese en hel side med øynene uten at noe fester seg. Små pauser gjør at du oppdager det med en gang – og kan gjøre noe med det.",
      steg: [
        "Stopp ved hver ✋ i tekstene (eller etter hvert avsnitt).",
        "Si med egne ord hva du nettopp leste.",
        "Spør: Er det noe jeg ikke forstår? Et ord? En setning?",
        "Hvis ja: Les avsnittet én gang til, slå opp ordet eller les videre for å se om det blir klarere.",
        "Svar på spørsmålet i ✋-boksen før du går videre."
      ],
      eksempel: "I alle tekstene i Reading Room og på temasidene finner du gule ✋-bokser. Hver boks har en liten merkelapp som viser hvilken strategi spørsmålet trener – for eksempel *Forutsi* eller *Lese mellom linjene*.",
      startere: ["So far, …", "This part is about …", "I don’t understand …", "I need to read this part again because …", "Now I understand that …"],
      prov: [{ t: "The Open Window", u: "lesing.html?id=open-window" }, { t: "Reading Room", u: "lesing.html" }]
    },
    {
      id: "ord", fase: "under", ikon: "🔤", navn: "Ukjente ord", en: "Working out new words",
      kort: "Finn betydningen ut fra sammenhengen – eller slå opp smart.",
      hva: "Når du møter et ord du ikke kan, har du flere verktøy: Du kan se på ordene rundt (*context clues*), dele opp ordet (*un-happi-ness*), tenke på om det ligner et norsk ord, eller slå det opp i ordlisten eller ordboken.",
      hvorfor: "Du trenger ikke kunne alle ordene for å forstå en tekst, men noen ord er nøkkelord. Å gjette ut fra sammenhengen er raskere enn å slå opp alt – og du lærer ordet bedre.",
      steg: [
        "Les hele setningen – og gjerne setningen før og etter.",
        "Spør: Er det et ord for en ting, en handling eller en egenskap?",
        "Del opp ordet: Kjenner du en del av det? (*re-*, *un-*, *-less*, *-ful*)",
        "Ligner det et norsk ord? (*catastrophe* – katastrofe)",
        "Slå opp hvis ordet virker viktig. Trykk på ord med prikkete strek i tekstene.",
        "Skriv nøkkelordene i en ordliste med forklaring på norsk eller enkel engelsk."
      ],
      eksempel: "**To Build a Fire**: «The cold of space smote the unprotected tip of the planet.» Du kjenner kanskje ikke *smote*, men «cold» og «unprotected» forteller at kulden *slo* hardt mot jorda.",
      startere: ["I think … means … because …", "The word … looks like the Norwegian word …", "The prefix/suffix … tells me that …", "In this text, … means …"],
      prov: [{ t: "Ordbok", u: "ordbok.html" }, { t: "Begreper", u: "begreper.html" }, { t: "To Build a Fire", u: "lesing.html?id=to-build-a-fire" }]
    },
    {
      id: "visualisere", fase: "under", ikon: "🎬", navn: "Se for deg", en: "Visualising",
      kort: "Lag en film i hodet mens du leser.",
      hva: "Å visualisere betyr å lage indre bilder av det du leser: hvordan stedet ser ut, hvordan personene beveger seg, lyder og lukter. Du kan også tegne en enkel skisse.",
      hvorfor: "Bilder i hodet gjør teksten levende og lettere å huske. Hvis du ikke klarer å se noe for deg, er det et tegn på at du bør lese delen på nytt.",
      steg: [
        "Les et avsnitt med beskrivelser.",
        "Lukk øynene: Hva ser, hører og kjenner du?",
        "Se etter ord som beskriver farger, lyder, størrelser og bevegelser.",
        "Tegn en rask skisse av stedet eller en scene.",
        "Sammenlign med en klassekamerat: Ser dere det samme for dere?"
      ],
      eksempel: "**The Tell-Tale Heart**: Fortelleren beskriver hvordan han åpner døren millimeter for millimeter i mørket. Prøv å se for deg det lille lysstrålen fra lykta – og lytt etter lyden han hører.",
      startere: ["In my mind, I can see …", "I imagine that the place looks …", "The words … help me picture …", "I can almost hear …"],
      prov: [{ t: "The Tell-Tale Heart", u: "lesing.html?id=tell-tale-heart" }, { t: "To Build a Fire", u: "lesing.html?id=to-build-a-fire" }]
    },
    {
      id: "mellom", fase: "under", ikon: "🕵️", navn: "Lese mellom linjene", en: "Making inferences",
      kort: "Finn ut det teksten ikke sier rett ut.",
      hva: "Mye i en tekst står ikke direkte. Forfatteren gir deg ledetråder, og du må selv trekke slutninger: *Hvorfor* gjør personen dette? Hva føler hun? Hva mener taleren egentlig? Det kalles å lese mellom linjene (*making inferences*).",
      hvorfor: "Spørsmål om «hvorfor» og «hva tror du» er ofte de viktigste spørsmålene både i tekstene og på eksamen. Det er her du viser at du har forstått teksten i dybden.",
      steg: [
        "Still et spørsmål: Hvorfor …? Hva betyr det at …?",
        "Let etter ledetråder: hva personen sier, gjør og tenker, og hvordan andre reagerer.",
        "Koble ledetrådene med det du vet om mennesker og verden.",
        "Formuler en slutning: «Jeg tror … fordi teksten sier …»",
        "Støtt alltid svaret med et sitat eller en detalj fra teksten."
      ],
      eksempel: "**The Gift of the Magi**: Teksten sier ikke rett ut at Della og Jim elsker hverandre høyt – men det de ofrer for å kjøpe gaver, viser det tydelig.",
      startere: ["I think … because the text says …", "This shows that …", "The writer suggests that …", "Even though it doesn’t say so, I can tell that …", "A clue is when …"],
      prov: [{ t: "The Gift of the Magi", u: "lesing.html?id=gift-of-the-magi" }, { t: "What to the Slave Is the Fourth of July?", u: "lesing.html?id=fourth-of-july" }]
    },
    {
      id: "koble", fase: "under", ikon: "🔗", navn: "Koble", en: "Making connections",
      kort: "Tekst–meg, tekst–tekst og tekst–verden.",
      hva: "Mens du leser, kan du koble teksten til tre ting: **deg selv** (Har jeg opplevd noe lignende?), **andre tekster** (Minner det om en film eller bok?) og **verden** (Skjer dette i dag? Hva vet jeg fra samfunnsfag?).",
      hvorfor: "Koblinger gjør teksten mer meningsfull og hjelper deg å huske den. De gir deg også gode ting å si i en samtale eller skrive i en tekst om teksten.",
      steg: [
        "Tekst–meg: Hva minner dette meg om i mitt eget liv?",
        "Tekst–tekst: Hvilken annen tekst, film eller serie ligner dette?",
        "Tekst–verden: Hvilke hendelser eller problemer i verden passer med dette?",
        "Spør: Hjelper koblingen meg å forstå teksten bedre?"
      ],
      eksempel: "**Learning to Read and Write** (Frederick Douglass): Tekst–verden – Hvorfor var det forbudt å lære slaver å lese? Hvilke land i dag hindrer jenter i å gå på skole?",
      startere: ["This reminds me of …", "This is similar to … because …", "This connects to what we learned about …", "Today, …"],
      prov: [{ t: "Learning to Read and Write", u: "lesing.html?id=douglass" }, { t: "Filmer", u: "film.html" }]
    },
    {
      id: "notater", fase: "under", ikon: "🗂️", navn: "Notater og tankekart", en: "Note-taking and mind maps",
      kort: "Skriv ned nøkkelord og vis sammenhenger.",
      hva: "Å ta notater er å skrive ned det viktigste med *dine* ord – ikke kopiere setninger. Du kan bruke stikkord, et tankekart (*mind map*), en tidslinje for hendelser eller en tabell for å sammenligne.",
      hvorfor: "Når du må velge hva som er viktig og skrive det med egne ord, bearbeider hjernen stoffet. Notatene er også gull verdt når du skal skrive eller øve til prøve.",
      steg: [
        "Velg form: tankekart (emner), tidslinje (hendelser), tabell (sammenligning) eller stikkord.",
        "Skriv bare nøkkelord – ikke hele setninger.",
        "Bruk piler for å vise årsak og virkning.",
        "Skriv tall og årstall riktig.",
        "Les over notatene: Kan du forklare temaet bare ved å se på dem?"
      ],
      eksempel: "**Temaet om første verdenskrig**: Lag en tidslinje fra skuddene i Sarajevo i 1914 til våpenhvilen i 1918. Bruk Tidslinje-siden til å sjekke årstallene.",
      startere: ["Key words: …", "Cause: … → Effect: …", "First … then … finally …", "The main difference between … and … is …"],
      prov: [{ t: "Tidslinje", u: "tidslinje.html" }, { t: "Personer", u: "personer.html" }]
    },
    {
      id: "sammendrag", fase: "etter", ikon: "📝", navn: "Oppsummere", en: "Summarising",
      kort: "Fortell det viktigste – kort og med egne ord.",
      hva: "Et sammendrag er en kort versjon av teksten som bare tar med det viktigste. For en fortelling kan du bruke **Somebody – Wanted – But – So – Then**. For en fagtekst kan du skrive én setning per avsnitt eller mellomtittel.",
      hvorfor: "Hvis du klarer å oppsummere en tekst, har du forstått den. Det er også en av de vanligste oppgavene i både engelsk og samfunnsfag.",
      steg: [
        "Finn hovedpersonen eller hovedtemaet.",
        "Finn de viktigste hendelsene eller poengene – dropp detaljer og eksempler.",
        "Skriv med egne ord, i presens (*The story is about …*).",
        "Hold det kort: 3–6 setninger.",
        "Sjekk: Ville noen som ikke har lest teksten, forstått hva den handler om?"
      ],
      eksempel: "**Rikki-Tikki-Tavi** – *Somebody*: a young mongoose. *Wanted*: to protect the family he lives with. *But*: two deadly cobras live in the garden. *So*: he fights them bravely. *Then*: the garden is safe.",
      startere: ["The text is about …", "The main character … wants …", "In the beginning … / In the middle … / In the end …", "The most important point is …", "To sum up, …"],
      prov: [{ t: "Rikki-Tikki-Tavi", u: "lesing.html?id=rikki-tikki-tavi" }, { t: "The Gettysburg Address", u: "lesing.html?id=gettysburg" }]
    },
    {
      id: "lete", fase: "etter", ikon: "🔍", navn: "Letelese", en: "Scanning",
      kort: "Finn en bestemt opplysning raskt.",
      hva: "Når du leter etter noe bestemt – et årstall, et navn, et tall – trenger du ikke lese alt. Du lar blikket fare over teksten til du finner det du leter etter. På engelsk heter det *scanning*.",
      hvorfor: "Letelesing sparer tid når du skal svare på spørsmål, finne fakta eller sjekke et sitat. Kombiner det med skumlesing for å vite hvor du skal lete.",
      steg: [
        "Bestem nøyaktig hva du leter etter (et tall? et navn? et nøkkelord?).",
        "Bruk mellomtitler for å finne riktig del av teksten.",
        "La øynene gli raskt – stopp når du ser ordet eller tallet.",
        "Les setningen rundt nøye for å få med sammenhengen.",
        "På skjerm: Bruk Ctrl+F (Cmd+F på Mac) – eller Søk-feltet øverst på siden."
      ],
      eksempel: "**Ten Days in a Mad-House**: Hvor mange dager var Nellie Bly innlagt, og i hvilken by? Let etter tall og stedsnavn i stedet for å lese alt på nytt.",
      startere: ["According to the text, …", "In paragraph …, it says that …", "The text states that …"],
      prov: [{ t: "Søk på siden", u: "sok.html" }, { t: "Ten Days in a Mad-House", u: "lesing.html?id=nellie-bly" }]
    },
    {
      id: "vurdere", fase: "etter", ikon: "⚖️", navn: "Vurdere og være kildekritisk", en: "Evaluating and source criticism",
      kort: "Hvem skrev teksten, hvorfor – og hva mener du?",
      hva: "Etter lesingen bør du tenke over teksten som helhet: Hvem er avsenderen? Når og hvorfor ble teksten skrevet? Hvem er mottakeren? Er det fakta, meninger eller fiksjon? Og hva mener *du* om det teksten sier?",
      hvorfor: "Alle tekster er skrevet av noen, til noen, med et formål. Særlig taler og eldre tekster må forstås i sin tid. Å vurdere teksten gjør deg til en kritisk og selvstendig leser.",
      steg: [
        "Avsender: Hvem skrev eller sa dette? Hva vet du om personen?",
        "Tid og sted: Når og hvor? Hva skjedde i verden da?",
        "Formål: Vil teksten informere, overtale, underholde eller vekke følelser?",
        "Virkemidler: Hvordan prøver teksten å påvirke deg? (gjentakelser, spørsmål, sterke ord)",
        "Din mening: Er du enig? Hva er sterkt og svakt i teksten?"
      ],
      eksempel: "**Votes for Women!** Emmeline Pankhurst holdt talen i 1913 for et publikum i USA. Hun vil overtale – se etter hvordan hun forsvarer at kvinner bryter loven. Er du enig i argumentene hennes?",
      startere: ["The writer/speaker wants to …", "The text was written in … when …", "The writer uses … to persuade the reader.", "I agree/disagree because …", "A strength of the text is …"],
      prov: [{ t: "Votes for Women!", u: "lesing.html?id=votes-for-women" }, { t: "The Atlanta Exposition Address", u: "lesing.html?id=atlanta-address" }]
    },
    {
      id: "naerlese", fase: "etter", ikon: "🔁", navn: "Lese på nytt og nærlese", en: "Re-reading and close reading",
      kort: "Les viktige deler en gang til – og se etter mer.",
      hva: "Første gang du leser, får du med deg handlingen. Andre gang kan du se etter hvordan teksten er skrevet: ordvalg, symboler, fortellerstemme, oppbygging og slutt. Det kalles nærlesing (*close reading*).",
      hvorfor: "Gode lesere leser ofte viktige tekster flere ganger. Mange noveller har en vri på slutten som gjør at du ser begynnelsen med nye øyne.",
      steg: [
        "Velg ut en viktig del: begynnelsen, et vendepunkt eller slutten.",
        "Les sakte – gjerne høyt.",
        "Strek under ord og uttrykk som virker valgt med vilje.",
        "Spør: Hvorfor skrev forfatteren akkurat slik?",
        "Etter en overraskende slutt: Les begynnelsen igjen. Hvilke hint fikk du?"
      ],
      eksempel: "**The Open Window**: Når du vet hvordan historien slutter, kan du lese begynnelsen på nytt. Hvilke hint gir Vera om at hun liker å finne på historier?",
      startere: ["The writer uses the word … to show …", "When I read it again, I noticed …", "The ending makes me see … differently.", "The narrator is …"],
      prov: [{ t: "The Open Window", u: "lesing.html?id=open-window" }, { t: "Araby", u: "lesing.html?id=araby" }]
    }
  ],

  // «Hvilken strategi passer?» – ulike teksttyper
  teksttyper: [
    { id: "novelle", ikon: "📖", navn: "Novelle eller fortelling", en: "Short story", tips: "Bruk ledetrådene til å gjette hva som skjer, lag film i hodet og les mellom linjene for å forstå personene. Etterpå: oppsummer med *Somebody – Wanted – But – So – Then*.", strategier: ["forutsi", "visualisere", "mellom", "sammendrag", "naerlese"], lenke: { t: "Short stories i Reading Room", u: "lesing.html?type=fiction" } },
    { id: "tale", ikon: "🎤", navn: "Tale", en: "Speech", tips: "Finn ut hvem som talte, når og til hvem. Se etter hva taleren vil oppnå og hvilke virkemidler hun eller han bruker.", strategier: ["vol", "stopp", "mellom", "vurdere", "naerlese"], lenke: { t: "Speeches i Reading Room", u: "lesing.html?type=speech" } },
    { id: "fagtekst", ikon: "🏛️", navn: "Fagtekst og temaside", en: "Informational text", tips: "Skumles mellomtitlene først, fyll ut VØL-skjemaet og ta notater mens du leser. Bruk ordlisten for begreper.", strategier: ["skumlese", "vol", "ord", "notater", "sammendrag"], lenke: { t: "Alle temaer", u: "index.html" } },
    { id: "sakprosa", ikon: "📰", navn: "Reportasje og selvbiografi", en: "Non-fiction", tips: "Sakprosa forteller om virkelige hendelser, men alltid fra ett perspektiv. Koble til det du vet om tiden, og vurder hvem som forteller.", strategier: ["koble", "mellom", "lete", "vurdere"], lenke: { t: "Non-fiction i Reading Room", u: "lesing.html?type=true" } },
    { id: "oppgave", ikon: "✅", navn: "Spørsmål og prøver", en: "Answering questions", tips: "Les spørsmålet nøye, skumles teksten for å vite hvor svaret står, og letelese for å finne detaljene. Støtt svaret med et sitat.", strategier: ["skumlese", "lete", "mellom"], lenke: { t: "Eksamensøving", u: "eksamen.html" } }
  ]
};
