window.LV = window.LV || {};
LV.grammatikk = {
  id: "run-ons",
  tittel: "Run-ons and fragments",
  norskNavn: "setninger som renner over, og halve setninger",
  ikon: "✂️",
  ingress: "Two of the most common mistakes in written English are sentences that go on and on without the right punctuation (run-ons), and «sentences» that are not complete (fragments). Both are easy to fix when you know what to look for.",
  forklaring: [
    "A **run-on sentence** is two (or more) main clauses joined without the right punctuation or linking word: ~~*I love summer it is warm.*~~",
    "A **comma splice** is two main clauses joined with only a comma: ~~*I love summer, it is warm.*~~ In English, a comma alone is **not** strong enough to join two sentences.",
    "Four ways to fix a run-on or comma splice: (1) a **full stop**: *I love summer. It is warm.* (2) a **linking word**: *I love summer **because** it is warm.* (3) a **comma + and/but/so**: *I love summer, **and** it is warm.* (4) a **semicolon**: *I love summer; it is warm.*",
    "A **fragment** is a group of words that looks like a sentence but is not complete. It is missing a subject or a verb, or it is a subordinate clause standing alone: ~~*Because I was tired.*~~ ~~*For example the Titanic.*~~ ~~*Running to the bus.*~~",
    "Fix a fragment by joining it to the sentence before or after, or by adding the missing subject or verb: *I went to bed **because I was tired**.* *Many ships have sunk, **for example the Titanic**.*",
    "In speech and in informal messages, fragments are normal (*Great idea! See you later.*). In essays and formal texts, use complete sentences."
  ],
  norsk: "På norsk skriver mange lange setninger med bare komma mellom (*Jeg var sliten, jeg la meg tidlig*). Det er heller ikke helt riktig på norsk, men på engelsk er det en tydelig feil – **comma splice**. Bruk punktum, et bindeord (*so, because, but*) eller komma **+** *and/but/so*. Pass også på setninger som begynner med *Because* eller *For example*: de må henge sammen med en hovedsetning.",
  husk: [
    "One main clause = one sentence. Two main clauses need a full stop, a linking word or a semicolon.",
    "A comma alone cannot join two sentences.",
    "Every sentence needs a subject and a verb.",
    "*Because …, When …, If …, Although …* cannot stand alone. Join them to a main clause.",
    "Read your text aloud. Where you pause and drop your voice, you probably need a full stop."
  ],
  tabeller: [
    { tittel: "Four ways to fix a comma splice", kolonner: ["Method", "Example"], rader: [
      ["Full stop", "*It was late. We went home.*"],
      ["Comma + *and / but / so*", "*It was late, **so** we went home.*"],
      ["Linking word", "*We went home **because** it was late.*"],
      ["Semicolon", "*It was late; we went home.*"]
    ], note: "~~*It was late, we went home.*~~ ← comma splice" },
    { tittel: "Fragments and how to fix them", kolonner: ["Fragment", "Fixed"], rader: [
      ["~~*Because I forgot my keys.*~~", "*I couldn't get in because I forgot my keys.*"],
      ["~~*For example football and handball.*~~", "*I like team sports, for example football and handball.*"],
      ["~~*Walking home from school.*~~", "*I saw a fox when I was walking home from school.*"],
      ["~~*The boy who lives next door.*~~", "*The boy who lives next door has a new bike.*"]
    ] }
  ],
  sammenlign: [
    { tittel: "Komma er ikke nok", tekst: "Det som ofte er greit med komma på norsk, er feil på engelsk.", eks: [["Jeg var sliten, jeg la meg tidlig.", "I was tired, **so** I went to bed early. / I was tired. I went to bed early."], ["Det regnet, vi ble inne.", "It was raining, **so** we stayed inside."]] }
  ],
  ovelser: [
    { type: "sorter", tittel: "Correct, run-on or fragment?", instruks: "Sort each example.", kategorier: ["Correct sentence", "Run-on / comma splice", "Fragment"], ord: [
      ["My sister plays the violin.", 0], ["I was hungry, I ate a sandwich.", 1], ["Because the bus was late.", 2], ["We missed the start, but we saw the rest.", 0],
      ["She loves horses she rides every day.", 1], ["For example London and Paris.", 2], ["When I got home, I was exhausted.", 0], ["Running down the street.", 2], ["It was cold, we wore hats.", 1]
    ] },
    { type: "mc", tittel: "Choose the best correction", oppgaver: [
      { s: "*I love reading, my favourite book is Wonder.*", valg: ["I love reading. My favourite book is Wonder.", "I love reading, my favourite book, is Wonder.", "I love reading my favourite book is Wonder."], forklaring: "Two main clauses: use a full stop." },
      { s: "*We went to the beach. Because it was hot.*", valg: ["We went to the beach because it was hot.", "We went to the beach. Because, it was hot.", "We went to the beach, it was hot."], forklaring: "Join the *because*-clause to the main clause." },
      { s: "*He was late, he missed the bus.*", valg: ["He was late because he missed the bus.", "He was late, he, missed the bus.", "He was late he missed the bus."], forklaring: "A linking word shows how the ideas are connected." },
      { s: "*Many animals are in danger. For example the polar bear.*", valg: ["Many animals are in danger, for example the polar bear.", "Many animals are in danger. For example, the polar bear.", "Many animals are in danger for example. The polar bear."], forklaring: "*For example the polar bear* is a fragment. Join it to the sentence before." }
    ] }
  ],
  oppgaver: [
    "Rewrite this text with correct sentences: *Last summer we went to Spain, it was very hot. We swam every day the water was warm. Because my dad loves history. We also visited an old castle.*",
    "Look at a text you have written. Find every comma. Is there a full sentence on both sides? If yes, fix it with one of the four methods.",
    "Write a short text message to a friend (fragments are OK here!). Then rewrite it as a formal email with complete sentences."
  ],
  se: ["sentence-types", "editing", "conjunctions"]
};
