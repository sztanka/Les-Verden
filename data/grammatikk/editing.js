window.LV = window.LV || {};
LV.grammatikk = {
  id: "editing",
  tittel: "Fix the text: editing your writing",
  norskNavn: "bearbeide og rette egen tekst",
  ikon: "🔍",
  ingress: "No writer gets everything right the first time. Good writers read their text again and again, and they know what to look for. Use this page to check and improve your own texts – and to find the mistakes Norwegian learners make most often.",
  forklaring: [
    "**Revising** means improving the content and the structure: Is the main idea clear? Is the order logical? Do I give examples? Are there sentences I can join or cut? Do this first.",
    "**Proofreading** means fixing the small things: spelling, word order, verb forms, punctuation and capital letters. Do this last.",
    "Read your text **aloud**, or let your computer read it to you. You will hear mistakes you don't see.",
    "Check **one thing at a time**. First read for word order, then for verb forms, then for spelling. It is easier than looking for everything at once.",
    "Use **feedback** actively. Make a list of the mistakes your teacher points out, and check your next text for exactly those mistakes."
  ],
  norsk: "Å **bearbeide** en tekst betyr å gjøre den bedre: tydeligere innhold, bedre struktur og et mer variert språk. Å **korrekturlese** betyr å rette småfeil. Gjør det i den rekkefølgen. Typiske feil for nordmenn er ordstilling (*Yesterday went I*), *s* i presens (*she play*), *is/are*, *their/there/they're*, *then/than*, stor forbokstav på nasjonaliteter og dager (*Norwegian, Monday*) og komma mellom to setninger.",
  husk: [
    "Revise first (content and structure), proofread last (small errors).",
    "Read aloud – your ear catches more than your eye.",
    "Check one thing at a time.",
    "Keep a personal list of your typical mistakes.",
    "Use the spell check, but don't trust it blindly: *their/there* are both «correct» words."
  ],
  tabeller: [
    { tittel: "Proofreading checklist: typical mistakes", kolonner: ["Check", "Wrong", "Right"], rader: [
      ["Word order", "~~*Yesterday went I to school.*~~", "*Yesterday I went to school.*"],
      ["*-s* in present tense (he/she/it)", "~~*She play football.*~~", "*She play**s** football.*"],
      ["*is / are*, *was / were*", "~~*The people is nice.*~~", "*The people **are** nice.*"],
      ["Past tense", "~~*I goed home.*~~", "*I **went** home.*"],
      ["*their / there / they're*", "~~*Their going to the party.*~~", "***They're** going to the party.*"],
      ["*then / than*", "~~*She is taller then me.*~~", "*She is taller **than** me.*"],
      ["Capital letters", "~~*norwegian, monday, english*~~", "***N**orwegian, **M**onday, **E**nglish*"],
      ["*I* is always capital", "~~*my friend and i*~~", "*my friend and **I***"],
      ["Comma splice", "~~*It was late, we left.*~~", "*It was late, **so** we left.*"],
      ["Adjective or adverb", "~~*She sings beautiful.*~~", "*She sings **beautifully**.*"]
    ] },
    { tittel: "Revising checklist: content and structure", kolonner: ["Ask yourself", "If not …"], rader: [
      ["Does my introduction tell the reader what the text is about?", "Add a clear topic sentence or thesis."],
      ["Does each paragraph have one main idea?", "Split long paragraphs, and add a topic sentence."],
      ["Do I give examples and explanations?", "Add *For example …*, *This shows that …*"],
      ["Do my sentences vary in length and start?", "Join short sentences; start some with *When, Although, However*."],
      ["Do I use linking words between paragraphs?", "Add *First, In addition, However, Finally*."],
      ["Does my conclusion sum up without new information?", "Rewrite it to answer the main question."]
    ] }
  ],
  sammenlign: [
    { tittel: "Stor forbokstav", tekst: "Engelsk har stor forbokstav på flere ord enn norsk.", eks: [["norsk, engelsk", "Norwegian, English"], ["mandag, januar", "Monday, January"], ["jeg", "I"]] }
  ],
  ovelser: [
    { type: "finn", tittel: "Spot the mistakes", instruks: "Click on the **word that is wrong** in each sentence.", oppgaver: [
      { s: "Yesterday [went] I to the cinema with my friends.", forklaring: "Word order: *Yesterday **I went** …*" },
      { s: "My brother [play] football every Saturday.", forklaring: "He/she/it needs *-s*: *My brother **plays** …*" },
      { s: "The people in London [is] very friendly.", forklaring: "*People* is plural: *are*." },
      { s: "I think [their] going to win the match.", forklaring: "*They're* = they are." },
      { s: "My dog is bigger [then] your dog.", forklaring: "Compare with *than*." },
      { s: "We have English on [monday] and Friday.", forklaring: "Days have capital letters: *Monday*." },
      { s: "She [goed] home after school.", forklaring: "Irregular verb: *go – went*." }
    ] },
    { type: "fyll", tittel: "Correct the word", instruks: "Write the correct form.", oppgaver: [
      { s: "She ___ in Bergen. (live)", svar: ["lives"] },
      { s: "Last year we ___ to Spain. (go)", svar: ["went"] },
      { s: "My friend and ___ are in the same class. (jeg)", svar: ["I"] },
      { s: "He speaks English very ___. (good)", svar: ["well"] },
      { s: "There ___ many students in my class. (is/are)", svar: ["are"] },
      { s: "My sister is older ___ me. (then/than)", svar: ["than"] }
    ] },
    { type: "mc", tittel: "Which version is better?", oppgaver: [
      { s: "Choose the version that flows best.", valg: ["Although it was raining, we went for a long walk in the forest.", "It was raining. We went for a walk. It was long. It was in the forest.", "It was raining, we went for a long walk in the forest."], forklaring: "One well-built sentence with a linking word reads better than many short ones – and avoids the comma splice." },
      { s: "Choose the best topic sentence for a paragraph about school uniforms.", valg: ["One important argument for school uniforms is that they make everyone equal.", "I think uniforms.", "School uniforms are clothes."], forklaring: "A good topic sentence tells the reader exactly what the paragraph is about." }
    ] }
  ],
  oppgaver: [
    "Take a text you have written. Read it three times: (1) for word order, (2) for verb forms (*-s*, past tense, *is/are*), (3) for spelling and capital letters. Mark every change you make.",
    "Make your own «mistake list» with your five most common mistakes. Use it every time you hand in a text.",
    "Swap texts with a partner. Use the revising checklist and give two pieces of praise and one suggestion for improvement."
  ],
  se: ["word-order", "run-ons", "sentence-types"]
};
