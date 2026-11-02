window.LV = window.LV || {};
LV.grammatikk = {
  id: "verbs",
  tittel: "Verbs",
  norskNavn: "verb",
  ikon: "🏃",
  ingress: "A verb tells us what someone or something does, or what someone or something is. Every complete sentence needs a verb.",
  forklaring: [
    "**Action verbs** tell what someone does: *run, write, eat, think, play*. **State verbs** tell what someone or something is, has or feels: *be, have, like, know, belong*.",
    "**Helping verbs** (auxiliaries) help the main verb: *have, be, do* and the **modal verbs** *can, could, will, would, shall, should, may, might, must*. In *She **has** finished* and *I **can** swim*, the helping verbs are in bold.",
    "Verbs change form to show **tense** – when something happens: *I **play** (now / usually), I **played** (in the past), I **will play** (in the future).*",
    "**Regular verbs** get *-ed* in the past: *walk – walked*. **Irregular verbs** have their own past forms that you must learn: *go – went – gone*.",
    "In the present simple, the verb gets an **-s** in the third person singular (*he, she, it*): *I play – she play**s***. This is one of the most common mistakes in English!"
  ],
  norsk: "Verb er handlingsord og tilstandsord, som på norsk. Tre store forskjeller: 1) På engelsk får verbet **-s** etter *he, she, it* i presens: *she plays* (norsk: *hun spiller* – samme form for alle). 2) Engelsk har en egen **-ing-form** for noe som holder på akkurat nå: *I am reading* (jeg leser / holder på å lese). 3) I spørsmål og nektelser bruker engelsk **do/does/did**: *Do you like pizza? I don't like pizza.* (norsk: *Liker du pizza? Jeg liker ikke pizza.*)",
  husk: [
    "**He, she, it – the -s must fit!** *She works. It rains. My dad drives.*",
    "Use the **present continuous** (*am/is/are + -ing*) for things happening right now: *Look! It **is snowing**.*",
    "Questions and negatives in present simple and past simple need *do/does/did*: *Does she play? She doesn't play. Did you go? I didn't go.*",
    "After *does*, *doesn't*, *did* and *didn't*, use the base form: *Did you **go**?* (not ~~Did you went?~~)"
  ],
  tabeller: [
    { tittel: "The five forms of a verb", kolonner: ["Base form", "-s form", "Past simple", "Past participle", "-ing form"], rader: [
      ["play", "plays", "played", "played", "playing"],
      ["live", "lives", "lived", "lived", "living"],
      ["study", "studies", "studied", "studied", "studying"],
      ["stop", "stops", "stopped", "stopped", "stopping"],
      ["go", "goes", "went", "gone", "going"],
      ["write", "writes", "wrote", "written", "writing"],
      ["have", "has", "had", "had", "having"],
      ["be", "am / is / are", "was / were", "been", "being"]
    ] },
    { tittel: "The most important tenses", kolonner: ["Tense", "How to make it", "Example", "Norsk", "Use it for"], rader: [
      ["Present simple", "base form (+ -s after he/she/it)", "*She **plays** football every Monday.*", "Hun spiller fotball hver mandag.", "habits, facts, things that are always true"],
      ["Present continuous", "am / is / are + -ing", "*She **is playing** football now.*", "Hun spiller fotball (akkurat) nå.", "things happening right now"],
      ["Past simple", "-ed or irregular past form", "*She **played** yesterday.*", "Hun spilte i går.", "finished actions at a time in the past"],
      ["Present perfect", "have / has + past participle", "*She **has played** for ten years.*", "Hun har spilt i ti år.", "from the past until now, experiences"],
      ["Future with *will*", "will + base form", "*I think she **will win**.*", "Jeg tror hun vinner / kommer til å vinne.", "predictions, quick decisions, promises"],
      ["Future with *going to*", "am / is / are going to + base form", "*She **is going to play** on Saturday.*", "Hun skal spille på lørdag.", "plans you have already made"]
    ] },
    { tittel: "Questions and negatives with do / does / did", kolonner: ["", "Question", "Negative"], rader: [
      ["I / you / we / they", "***Do** you **like** cats?*", "*I **don't like** cats.*"],
      ["he / she / it", "***Does** she **like** cats?*", "*She **doesn't like** cats.*"],
      ["Past (all persons)", "***Did** they **like** the film?*", "*They **didn't like** the film.*"],
      ["With *be* and modal verbs – no *do*!", "***Are** you tired? **Can** you swim?*", "*I'**m not** tired. I **can't** swim.*"]
    ] },
    { tittel: "20 common irregular verbs", kolonner: ["Base form", "Past simple", "Past participle", "Norsk"], rader: [
      ["be", "was / were", "been", "være"], ["begin", "began", "begun", "begynne"], ["break", "broke", "broken", "knuse, brekke"], ["bring", "brought", "brought", "ta med"],
      ["buy", "bought", "bought", "kjøpe"], ["come", "came", "come", "komme"], ["do", "did", "done", "gjøre"], ["drink", "drank", "drunk", "drikke"],
      ["eat", "ate", "eaten", "spise"], ["find", "found", "found", "finne"], ["get", "got", "got (AmE: gotten)", "få"], ["give", "gave", "given", "gi"],
      ["go", "went", "gone", "gå, dra"], ["know", "knew", "known", "vite, kjenne"], ["make", "made", "made", "lage"], ["say", "said", "said", "si"],
      ["see", "saw", "seen", "se"], ["take", "took", "taken", "ta"], ["think", "thought", "thought", "tenke, tro"], ["write", "wrote", "written", "skrive"]
    ] }
  ],
  sammenlign: [
    { tittel: "-s i tredje person entall", tekst: "På norsk har verbet samme form for alle personer. På engelsk får verbet -s etter *he, she, it* (og etter ett navn eller én ting) i presens.", eks: [["Jeg spiller – hun spiller", "I play – she play**s**"], ["Faren min kjører buss.", "My dad drive**s** a bus."], ["Det regner.", "It rain**s**."]] },
    { tittel: "-ing-formen (progressiv)", tekst: "Norsk har ingen egen form for noe som pågår akkurat nå. Vi bruker vanlig presens eller *holder på å*. Engelsk bruker *am/is/are + -ing*.", eks: [["Jeg leser nå.", "I **am reading** now."], ["Hva gjør du?", "What **are** you **doing**?"], ["Det snør!", "It**'s snowing**!"]] },
    { tittel: "*Do* i spørsmål og nektelser", tekst: "På norsk bytter vi bare plass på verb og subjekt i spørsmål. På engelsk trenger de fleste verb hjelp av *do/does/did*.", eks: [["**Liker** du sjokolade?", "**Do** you **like** chocolate?"], ["Hun **spiser ikke** kjøtt.", "She **doesn't eat** meat."], ["**Så** du filmen?", "**Did** you **see** the film?"]] },
    { tittel: "Fremtid", tekst: "Norsk bruker ofte presens om fremtid (*Jeg kommer i morgen*). Engelsk bruker *will* eller *going to*.", eks: [["Jeg **kommer** i morgen.", "I**'ll come** tomorrow."], ["Vi **skal** reise til Spania i sommer.", "We **are going to** travel to Spain this summer."]] },
    { tittel: "Presens perfektum og «siden/i»", tekst: "Med *since* og *for* om noe som fortsatt pågår, bruker engelsk *have/has*, akkurat som norsk *har*. Men pass på: *i tre år* = *for three years*, og *siden 2020* = *since 2020*.", eks: [["Jeg **har bodd** her i tre år.", "I **have lived** here **for** three years."], ["Hun **har spilt** siden 2020.", "She **has played since** 2020."]] }
  ],
  ovelser: [
    { type: "finn", tittel: "Find the verbs", instruks: "Click on all the **verbs** – also helping verbs like *is*, *have* and *can*.", oppgaver: [
      { s: "My brother [plays] the guitar and [sings] in a band." },
      { s: "We [went] to the beach and [swam] in the sea." },
      { s: "She [is] very tired today." },
      { s: "I [have] [finished] my homework, so I [can] [play] now." },
      { s: "The dog [barked] when the postman [knocked] on the door." }
    ] },
    { type: "fyll", tittel: "He, she, it – the -s must fit!", instruks: "Write the verb in the **present simple**.", oppgaver: [
      { s: "My mum ___ in a hospital.", hint: "work", svar: ["works"] },
      { s: "He ___ to school every day.", hint: "go", svar: ["goes"] },
      { s: "The film ___ at eight o'clock.", hint: "start", svar: ["starts"] },
      { s: "She ___ English and Spanish.", hint: "study", svar: ["studies"] },
      { s: "My friends ___ in Bergen.", hint: "live", svar: ["live"], forklaring: "*My friends* = they, so no -s." },
      { s: "Tom always ___ his teeth after breakfast.", hint: "brush", svar: ["brushes"] },
      { s: "It ___ a lot in Bergen.", hint: "rain", svar: ["rains"] },
      { s: "She ___ two cats.", hint: "have", svar: ["has"] }
    ] },
    { type: "fyll", tittel: "Irregular verbs in the past", instruks: "Write the verb in the **past simple**.", oppgaver: [
      { s: "Yesterday we ___ to the cinema.", hint: "go", svar: ["went"] },
      { s: "I ___ a great book last week.", hint: "read", svar: ["read"] },
      { s: "She ___ a letter to her grandmother.", hint: "write", svar: ["wrote"] },
      { s: "We ___ pizza for dinner.", hint: "eat", svar: ["ate"] },
      { s: "He ___ his phone on the bus.", hint: "forget", svar: ["forgot"] },
      { s: "They ___ a new car last year.", hint: "buy", svar: ["bought"] },
      { s: "I ___ my best friend at the party.", hint: "see", svar: ["saw"] },
      { s: "The match ___ at seven.", hint: "begin", svar: ["began"] }
    ] },
    { type: "mc", tittel: "Which tense?", oppgaver: [
      { s: "Look! The children ___ in the snow.", valg: ["are playing", "play", "played"], forklaring: "*Look!* shows it is happening now: present continuous." },
      { s: "I ___ football every Tuesday.", valg: ["play", "am playing", "plays"], forklaring: "A habit (every Tuesday): present simple." },
      { s: "We ___ to Paris last summer.", valg: ["went", "have gone", "go"], forklaring: "A finished time in the past (*last summer*): past simple." },
      { s: "She ___ in Oslo since 2019.", valg: ["has lived", "lives", "lived"], forklaring: "From the past until now with *since*: present perfect." },
      { s: "___ you like horror films?", valg: ["Do", "Are", "Does"], forklaring: "Question with *you* in the present simple: *Do you …?*" },
      { s: "He ___ like fish.", valg: ["doesn't", "don't", "isn't"], forklaring: "*He* + negative: *doesn't*." },
      { s: "Did you ___ the match?", valg: ["watch", "watched", "watching"], forklaring: "After *did*, use the base form: *watch*." },
      { s: "We have bought the tickets. We ___ visit London in June.", valg: ["are going to", "will", "are"], forklaring: "A plan that is already made: *going to*." }
    ] },
    { type: "sorter", tittel: "Regular or irregular?", instruks: "Is the verb **regular** (past form with -ed) or **irregular**?", kategorier: ["Regular", "Irregular"], ord: [
      ["walk", 0], ["go", 1], ["play", 0], ["swim", 1], ["help", 0], ["think", 1], ["want", 0], ["drink", 1], ["listen", 0], ["make", 1], ["visit", 0], ["fly", 1]
    ] }
  ],
  oppgaver: [
    "Write about a normal day for you or someone in your family (present simple). Use at least six verbs, and remember the -s after he/she/it.",
    "Write about what you did last weekend (past simple). Use at least five irregular verbs. Underline them.",
    "Look out of the window or at a picture. Write five sentences about what is happening right now (present continuous)."
  ],
  se: ["adverbs", "pronouns", "nouns"]
};
