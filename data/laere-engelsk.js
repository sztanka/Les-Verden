/* =========================================================
   Les verden – How to learn English (laere-engelsk.html)
   Strategier for språklæring, tekstskaping og kommunikasjon.
   ========================================================= */
window.LV = window.LV || {};
LV.laereEngelsk = {
  deler: [
    {
      id: "ord", ikon: "🧠", tittel: "Lær og husk nye ord", en: "Learning vocabulary",
      intro: "Du trenger å møte et ord mange ganger før du husker det. Disse strategiene gjør at ordene fester seg raskere.",
      strategier: [
        { navn: "Lær ord i fraser, ikke alene", tekst: "Ord hører sammen med andre ord. Lær *make a decision* (ikke ~~do a decision~~), *take a photo*, *heavy rain*. Skriv ned hele uttrykket, ikke bare ordet." },
        { navn: "Ordkort og repetisjon med pauser", tekst: "Skriv engelsk på den ene siden og norsk eller en forklaring på den andre. Repeter etter én dag, tre dager, en uke og en måned. Legg kortene du kan, i en egen bunke." },
        { navn: "Ordfamilier", tekst: "Når du lærer ett ord, lær familien: *decide – decision – decisive – decisively*. Da får du fire ord for ett." },
        { navn: "Bruk ordet med en gang", tekst: "Lag din egen setning med det nye ordet, gjerne om deg selv: *I always find it hard to make a decision about what to wear.*" },
        { navn: "Gjett ut fra sammenhengen", tekst: "Du trenger ikke slå opp alt. Se på ordene rundt, del opp ordet (*un-believ-able*) og tenk på om det ligner et norsk ord.", lenke: ["lesestrategier.html#ord", "Mer om ukjente ord"] },
        { navn: "Pass på «falske venner»", tekst: "Noen ord ser ut som norske ord, men betyr noe annet. *Eventually* betyr *til slutt*, ikke *eventuelt*. Øv på dem i quizen lenger ned." }
      ],
      fraser: []
    },
    {
      id: "skrive", ikon: "✍️", tittel: "Planlegg og skriv tekster", en: "Writing strategies",
      intro: "Gode tekster blir til i flere steg. Ingen skriver en ferdig tekst på første forsøk.",
      strategier: [
        { navn: "1. Forstå oppgaven", tekst: "Strek under nøkkelordene i oppgaven: *describe, explain, discuss, compare*. Hvem er mottakeren? Hvilken teksttype skal du skrive?" },
        { navn: "2. Samle ideer", tekst: "Lag et tankekart eller skriv stikkord. Skriv gjerne på engelsk med en gang – da slipper du å oversette." },
        { navn: "3. Lag en plan", tekst: "Bestem rekkefølgen: innledning, hoveddel med ett poeng per avsnitt, avslutning. Bruk en skriveramme.", lenke: ["skriving.html", "Skriveverkstedet"] },
        { navn: "4. Skriv et utkast", tekst: "Skriv uten å stoppe for hvert ord. Står du fast, skriv ordet på norsk i [klammer] og fortsett. Slå opp etterpå." },
        { navn: "5. Bearbeid og rett", tekst: "Les teksten høyt. Sjekk innhold og struktur først, og småfeil til slutt. Bruk lista over dine typiske feil.", lenke: ["grammatikk.html?id=editing", "Fix the text: editing"] },
        { navn: "6. Bruk tilbakemeldingen", tekst: "Skriv ned det læreren sier du må jobbe med, og sjekk akkurat det i neste tekst." }
      ]
    },
    {
      id: "snakke", ikon: "🗣️", tittel: "Klar deg i samtaler", en: "Communication strategies",
      intro: "Selv de som er flinke i engelsk, mangler ord av og til. Det viktigste er å holde samtalen i gang. Disse frasene hjelper deg.",
      strategier: [
        { navn: "Forklar ordet du ikke kan", tekst: "Beskriv i stedet for å stoppe opp.", fraser: ["It’s a thing you use to …", "It’s a kind of …", "It’s a person who …", "It’s a place where …", "It’s the opposite of …", "It’s like a … but …"] },
        { navn: "Kjøp deg tid", tekst: "Bruk et lite «fyllord» mens du tenker – det høres naturlig ut.", fraser: ["Well, …", "Let me think …", "That’s a good question.", "How can I put it …", "What I mean is …"] },
        { navn: "Be om hjelp eller gjentakelse", tekst: "Det er helt greit å si at du ikke forsto.", fraser: ["Sorry, could you say that again?", "Could you speak a bit more slowly, please?", "What does … mean?", "How do you say … in English?", "Sorry, I didn’t catch that."] },
        { navn: "Sjekk at du har forstått", tekst: "Gjenta med egne ord.", fraser: ["So you mean that …?", "Do you mean …?", "If I understand you correctly, …"] },
        { navn: "Hold samtalen i gang", tekst: "Still oppfølgingsspørsmål og vis at du lytter.", fraser: ["Really? Why?", "What happened next?", "How did you feel about that?", "That’s interesting! Tell me more.", "What about you?"] }
      ]
    },
    {
      id: "digitalt", ikon: "💻", tittel: "Bruk digitale hjelpemidler smart", en: "Digital tools",
      intro: "Digitale verktøy kan hjelpe deg mye – hvis du bruker dem riktig.",
      strategier: [
        { navn: "Ordbok fremfor oversetter", tekst: "En ordbok viser flere betydninger og eksempler. Velg betydningen som passer i setningen din.", lenke: ["ordbok.html", "Ordboka på Les verden"] },
        { navn: "Stavekontroll – men tenk selv", tekst: "Stavekontrollen finner ikke *their/there* eller *then/than*, fordi begge er ekte ord." },
        { navn: "Oversettelsesverktøy og KI", tekst: "Oversett aldri en hel tekst – da lærer du ingenting, og det blir ofte feil. Bruk dem til å sjekke ett ord eller ett uttrykk. Følg skolens regler for KI." },
        { navn: "Lytt og les høyt", tekst: "La datamaskinen lese teksten din høyt. Da hører du feil du ikke ser. Bruk uttalesiden for å øve på vanskelige lyder.", lenke: ["uttale.html", "Pronunciation for Norwegians"] }
      ]
    },
    {
      id: "fritid", ikon: "🎧", tittel: "Lær engelsk utenfor skolen", en: "English in your free time",
      intro: "Mange norske ungdommer lærer mye engelsk i fritiden. Gjør det til en vane:",
      strategier: [
        { navn: "Serier og filmer", tekst: "Se med **engelsk** teksting i stedet for norsk. Da kobler du lyd og skrift." },
        { navn: "Musikk og podkaster", tekst: "Finn sangteksten til en sang du liker, og syng med. Lytt til podkaster om noe du er interessert i." },
        { navn: "Spill og nettsamfunn", tekst: "Mange spill krever engelsk. Legg merke til nye ord og uttrykk – og skriv dem ned." },
        { navn: "Les om det du liker", tekst: "Les om interessene dine på engelsk: fotball, mote, dyr, teknologi. Start med korte tekster.", lenke: ["lesing.html", "Reading Room"] },
        { navn: "Bytt språk", tekst: "Sett mobilen eller et spill på engelsk i en uke." }
      ]
    }
  ],

  // Falske venner (norsk – engelsk)
  falske: [
    { s: "What does *eventually* mean?", valg: ["til slutt", "eventuelt", "kanskje"], forklaring: "*Eventually* = til slutt. *Eventuelt* = *possibly* / *if necessary*." },
    { s: "What does *actually* mean?", valg: ["faktisk", "aktuelt", "nå for tiden"], forklaring: "*Actually* = faktisk. *Aktuell* = *current* / *relevant*." },
    { s: "What does *sensible* mean?", valg: ["fornuftig", "følsom", "sensibel"], forklaring: "*Sensible* = fornuftig. *Følsom* = *sensitive*." },
    { s: "What does *fabric* mean?", valg: ["stoff", "fabrikk", "fabrikat"], forklaring: "*Fabric* = stoff (tøy). *Fabrikk* = *factory*." },
    { s: "What does *a gift* mean?", valg: ["en gave", "gift (giftig stoff)", "gift (som i ektepar)"], forklaring: "*Gift* = gave. Gift (giftig) = *poison*, og gift (ektepar) = *married*." },
    { s: "What does *control* (a verb) usually mean?", valg: ["styre, ha makt over", "sjekke", "kontrollere billetten"], forklaring: "*Control* = styre. *Kontrollere/sjekke* = *check*." },
    { s: "What does *undertaker* mean?", valg: ["begravelsesbyrå", "underleverandør", "en som påtar seg en jobb"], forklaring: "*Undertaker* = begravelsesagent." },
    { s: "What does *brave* mean?", valg: ["modig", "snill og flink (bra)", "bråkete"], forklaring: "*Brave* = modig. *Snill* = *kind*, *well-behaved*." },
    { s: "What does *rare* mean?", valg: ["sjelden", "rar", "rå"], forklaring: "*Rare* = sjelden (eller lite stekt kjøtt). *Rar* = *strange* / *weird*." },
    { s: "What does *chef* mean?", valg: ["kokk", "sjef", "kelner"], forklaring: "*Chef* = kokk. *Sjef* = *boss*." },
    { s: "What is a *barn*?", valg: ["en låve", "et barn", "en bar"], forklaring: "*Barn* = låve. Et barn = *a child*. *The cows sleep in the barn.*" },
    { s: "Which English word means *time* (60 minutter)?", valg: ["hour", "time", "while"], forklaring: "En time = *an hour*. *Time* = tid: *What time is it?* = Hva er klokka? *I waited for an hour.*" },
    { s: "What does *become* mean?", valg: ["bli", "få", "bekomme"], forklaring: "*Become* = bli: *She became a doctor.* «Jeg får en sykkel» = *I get a bike* – ikke *I become a bike*!" },
    { s: "What does *genial* mean?", valg: ["vennlig og hyggelig", "genial, kjempesmart", "gammeldags"], forklaring: "*Genial* = vennlig, hyggelig. Genial (kjempesmart) = *brilliant*. *Our genial host welcomed us.*" },
    { s: "What does *sympathetic* mean?", valg: ["medfølende, forståelsesfull", "sympatisk, hyggelig", "slapp"], forklaring: "*Sympathetic* = medfølende. Sympatisk = *nice*, *likeable*. *The teacher was sympathetic when I was ill.*" },
    { s: "What is a *novel*?", valg: ["en roman", "en novelle", "en nyhet"], forklaring: "*A novel* = en roman (lang fortelling). En novelle = *a short story*." },
    { s: "What does *mist* mean?", valg: ["tåke", "mistet", "møkk"], forklaring: "*Mist* = lett tåke. Mistet = *lost*: *I lost my keys.*" },
    { s: "What does *slim* mean?", valg: ["slank", "slimete", "smal sjanse"], forklaring: "*Slim* = slank (også: liten – *a slim chance*). Slimete = *slimy*." },
    { s: "What is a *brand*?", valg: ["et merke (varemerke)", "en brann", "en brannbil"], forklaring: "*Brand* = (vare)merke: *a famous brand of shoes*. Brann = *fire*." },
    { s: "What does *mean* mean in *He is so mean*?", valg: ["slem, gjerrig", "han mener mye", "middels"], forklaring: "Som adjektiv er *mean* = slem eller gjerrig. Som verb er *mean* = bety/mene: *What do you mean?*" },
    { s: "What is a *spare* tyre?", valg: ["et reservedekk", "et dekk du sparer penger på", "et punktert dekk"], forklaring: "*Spare* = ekstra, reserve: *a spare key*. Å spare penger = *to save money*." },
    { s: "What is a *recipe*?", valg: ["en oppskrift", "en resept fra legen", "en kvittering"], forklaring: "*Recipe* = matoppskrift. Resept fra legen = *a prescription*. Kvittering = *a receipt*." },
    { s: "What does *hell* mean in English?", valg: ["helvete", "hell, flaks", "lys"], forklaring: "*Hell* = helvete – så ikke si «Hell!» når du ønsker noen lykke til. Flaks = *luck*: *Good luck!*" },
    { s: "What is a *stool*?", valg: ["en krakk", "en stol", "en stall"], forklaring: "*Stool* = krakk (stol uten rygg). Stol = *chair*." },
    { s: "In Britain, what are *chips*?", valg: ["pommes frites", "potetgull", "databrikker"], forklaring: "I britisk engelsk er *chips* = pommes frites (*fish and chips*). Potetgull = *crisps* i Storbritannia, men *chips* i USA!" },
    { s: "What does *smoking* mean?", valg: ["røyking", "en smoking (dress)", "røykvarsler"], forklaring: "*Smoking* = røyking: *No smoking*. En smoking = *a dinner jacket* (britisk) eller *a tuxedo* (amerikansk)." },
    { s: "How much is *a billion*?", valg: ["en milliard (1 000 000 000)", "en billion", "en million"], forklaring: "*A billion* = én milliard. En norsk billion er tusen ganger mer – *a trillion*." },
    { s: "What is *a dress*?", valg: ["en kjole", "en dress", "en drakt"], forklaring: "*A dress* = en kjole. En dress = *a suit*." },
    { s: "What is *a lecture*?", valg: ["en forelesning", "lektyre, noe å lese", "en lekse"], forklaring: "*Lecture* = forelesning: *a lecture at the university*. Lektyre = *reading*. Lekse = *homework*." },
    { s: "What does *engaged* mean in *They are engaged*?", valg: ["forlovet", "engasjert", "ansatt"], forklaring: "*Engaged* = forlovet (eller opptatt: *The line is engaged*). Engasjert = *committed*, *involved*." }
  ],

  // Forklar ordet (sirkumlokusjon) – ord å forklare uten å si dem
  forklar: [
    ["umbrella", "something you use when it rains"], ["dentist", "a person who looks after your teeth"], ["library", "a place where you can borrow books"],
    ["fridge", "a machine that keeps food cold"], ["neighbour", "a person who lives next to you"], ["passport", "a document you need to travel abroad"],
    ["ladder", "a thing you climb to reach high places"], ["airport", "a place where planes take off and land"], ["scissors", "a tool you use to cut paper"],
    ["holiday", "time when you don’t go to school or work"], ["teenager", "a person between 13 and 19"], ["headphones", "you wear them to listen to music"],
    ["referee", "the person who makes sure players follow the rules"], ["wallet", "a small thing where you keep money and cards"], ["volcano", "a mountain that can erupt with fire and lava"],
    ["recipe", "instructions for how to cook something"], ["lighthouse", "a tower with a light that helps ships at night"], ["homework", "school work you do at home"],
    ["birthday", "the day you were born, celebrated every year"], ["rainbow", "colours in the sky after rain"]
  ],

  refleksjon: [
    "Hvor lærer du mest engelsk: på skolen eller i fritiden? Gi eksempler.",
    "Hvilken strategi på denne siden vil du prøve den neste uka?",
    "Hva er vanskeligst for deg i engelsk: ord, grammatikk, uttale, å skrive eller å snakke?",
    "Hvilke tre ord eller uttrykk har du lært den siste uka?"
  ]
};
