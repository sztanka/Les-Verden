window.LV = window.LV || {};
LV.grammatikk = {
  id: "sentence-parts",
  tittel: "Parts of a sentence",
  norskNavn: "setningsledd",
  ikon: "🧱",
  ingress: "Every sentence is built from parts that do different jobs: someone does something (subject + verb), sometimes to something or someone (object), and often we add when, where, how or why (adverbial).",
  forklaring: [
    "The **subject** is the person or thing that does the action, or that the sentence is about: ***My sister** plays football.* ***The film** was boring.* Ask: *Who* or *what* does something?",
    "The **verb** (verbal) tells what the subject does or is: *My sister **plays** football. The film **was** boring.* Some verbs have more than one word: *She **has been playing** for years.*",
    "The **object** is the person or thing the action is done to: *My sister plays **football**.* Ask: *Who* or *what* does the subject do something to? Some verbs have two objects: *She gave **me** (indirect object) **a book** (direct object).*",
    "The **adverbial** gives extra information: **when** (*yesterday*), **where** (*at school*), **how** (*quickly*) or **why** (*because it rained*): *My sister plays football **on Saturdays** **in the park**.*",
    "After verbs like *be, become, seem, look* we often have a **complement** that describes the subject: *The film was **boring**. She became **a doctor**.*",
    "A complete English sentence must have **a subject and a verb**. Even when it rains, English needs a subject: ***It** is raining* – not ~~*Is raining*~~."
  ],
  norsk: "Setningsleddene er de samme som på norsk: **subjekt**, **verbal**, **objekt** (direkte og indirekte), **adverbial** og **predikativ**. Den viktigste forskjellen er at engelsk er mye strengere med **rekkefølgen**: subjektet står nesten alltid **foran** verbet, også når setningen begynner med et adverbial. Engelsk trenger også alltid et subjekt – derfor *It is raining* (Det regner) og *It is cold* (Det er kaldt).",
  husk: [
    "Find the verb first. Then ask *who* or *what* is doing it – that is the subject.",
    "Every sentence needs a subject and a verb: ***It** is late.* ***There** are three cats.*",
    "The normal order is **S – V – O – A**: *She (S) read (V) the book (O) last night (A).*",
    "A **complement** comes after *be, become, seem*: *He is **tired**.*"
  ],
  tabeller: [
    { tittel: "The parts of a sentence", kolonner: ["Part", "Norsk", "Question", "Example"], rader: [
      ["Subject (S)", "subjekt", "Who / what?", "***The children** laughed.*"],
      ["Verb (V)", "verbal", "What happens?", "*The children **laughed**.*"],
      ["Direct object (O)", "direkte objekt", "Who / what is affected?", "*She opened **the door**.*"],
      ["Indirect object (IO)", "indirekte objekt", "To / for whom?", "*He sent **his mum** a message.*"],
      ["Adverbial (A)", "adverbial", "When / where / how / why?", "*We met **at the station** **at six**.*"],
      ["Complement (C)", "predikativ", "What is the subject like?", "*The soup is **hot**.*"]
    ] },
    { tittel: "Common sentence patterns", kolonner: ["Pattern", "Example"], rader: [
      ["S – V", "*The baby **slept**.*"],
      ["S – V – O", "*I **love** pizza.*"],
      ["S – V – C", "*The test **was** easy.*"],
      ["S – V – A", "*They **live** in Bergen.*"],
      ["S – V – IO – O", "*She **gave** him a present.*"],
      ["S – V – O – A", "*We **watched** a film yesterday.*"]
    ], note: "Adverbials can often move to the beginning: *Yesterday we watched a film.* But the order **S – V** stays the same." }
  ],
  sammenlign: [
    { tittel: "Engelsk trenger alltid et subjekt", tekst: "På norsk bruker vi *det* som «tomt» subjekt. På engelsk bruker vi *it* eller *there*.", eks: [["Det regner.", "**It** is raining."], ["Det er tre katter i hagen.", "**There** are three cats in the garden."], ["Det er viktig å lese.", "**It** is important to read."]] },
    { tittel: "Indirekte objekt med *to*", tekst: "Vi kan flytte det indirekte objektet bakerst med *to* eller *for*.", eks: [["Hun ga **meg** boka.", "She gave **me** the book. / She gave the book **to me**."], ["Han kjøpte **henne** blomster.", "He bought **her** flowers. / He bought flowers **for her**."]] }
  ],
  ovelser: [
    { type: "finn", tittel: "Find the subject", instruks: "Click on the **subject** in each sentence (all the words in it).", oppgaver: [
      { s: "[My little brother] loves dinosaurs." },
      { s: "Every morning, [the bus] is late." },
      { s: "[They] built a huge sandcastle." },
      { s: "In 1905, [Norway] became independent." },
      { s: "[The old man with the dog] lives next door." }
    ] },
    { type: "finn", tittel: "Find the verb", instruks: "Click on the **verb** (all the words in it).", oppgaver: [
      { s: "The children [played] in the snow." },
      { s: "We [have finished] our homework." },
      { s: "She [is reading] a book about sharks." },
      { s: "Tomorrow I [will visit] my grandparents." },
      { s: "[Did] you [see] the match?", forklaring: "In questions, the helping verb *did* comes first: **Did** … **see**. Both are part of the verb." }
    ] },
    { type: "finn", tittel: "Find the object", instruks: "Click on the **direct object** – the thing or person the action is done to.", oppgaver: [
      { s: "Sara kicked [the ball]." },
      { s: "I don't like [horror films]." },
      { s: "The teacher gave us [a test]." },
      { s: "Have you seen [my phone]?" },
      { s: "We ate [pizza] at the cinema." }
    ] },
    { type: "sorter", tittel: "Which part is it?", instruks: "Sort the parts of the sentence *«Last summer my cousin sent me a postcard from Canada.»*", kategorier: ["Subject", "Verb", "Object", "Adverbial"], ord: [
      ["Last summer", 3], ["my cousin", 0], ["sent", 1], ["me", 2], ["a postcard", 2], ["from Canada", 3]
    ] },
    { type: "mc", tittel: "Does the sentence have a subject?", oppgaver: [
      { s: "Which sentence is correct?", valg: ["It is very cold today.", "Is very cold today.", "Very cold today is."], forklaring: "English needs a subject: *It* is cold." },
      { s: "Which sentence is correct?", valg: ["There are many people here.", "Are many people here.", "It are many people here."], forklaring: "*There are* = Det er (mange)." },
      { s: "Which sentence is correct?", valg: ["It is important to sleep.", "Is important to sleep.", "Important is to sleep."], forklaring: "*It is important to …* = Det er viktig å …" }
    ] }
  ],
  oppgaver: [
    "Write five sentences about your weekend. Underline the subject once and the verb twice in each sentence.",
    "Write one sentence for each pattern in the table (S–V, S–V–O, S–V–C, S–V–A, S–V–IO–O).",
    "Find a paragraph in a text you are reading. Mark the subject, verb and object in three of the sentences."
  ],
  se: ["word-order", "sentence-types", "verbs"]
};
