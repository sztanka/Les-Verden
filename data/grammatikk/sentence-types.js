window.LV = window.LV || {};
LV.grammatikk = {
  id: "sentence-types",
  tittel: "Simple, compound and complex sentences",
  norskNavn: "enkle og sammensatte setninger",
  ikon: "🔗",
  ingress: "Short sentences are clear, but a text with only short sentences sounds childish. Good writers mix short and long sentences. Here you learn how to join ideas with the right words.",
  forklaring: [
    "A **clause** (setning/leddsetning) is a group of words with a subject and a verb: *the dog barked*, *because it was hungry*.",
    "A **simple sentence** has one main clause: *The dog barked.*",
    "A **compound sentence** joins two main clauses with *and, but, or, so* (often with a comma): *The dog barked, **so** I woke up.* Both parts can stand alone.",
    "A **complex sentence** has a main clause and a **subordinate clause** that cannot stand alone. It starts with words like *because, when, if, although, while, after, before, until, who, which, that*: *I woke up **because the dog barked**.*",
    "If the subordinate clause comes **first**, put a **comma** after it: ***When I got home,** I made dinner.* If it comes last, we usually don't need a comma: *I made dinner **when I got home**.*",
    "**Relative clauses** with *who* (people), *which* (things) and *that* (both) tell us more about a noun: *The girl **who won the race** is my sister. The book **that I borrowed** was great.*"
  ],
  norsk: "Leddsetninger finnes på norsk også, og bindeordene ligner: *fordi – because, når – when, hvis – if, selv om – although, som – who/which/that*. Pass på kommaet: På engelsk setter vi komma **etter** en leddsetning som står først (*When I got home, I …*), men vanligvis **ikke** foran *because* eller *that* midt i setningen. Husk også: *som* om personer = **who**, om ting = **which**.",
  husk: [
    "**FANBOYS** joins equal clauses: *For, And, Nor, But, Or, Yet, So*.",
    "Subordinating words: *because, when, if, although, while, after, before, until, since, unless*.",
    "Comma after a subordinate clause that starts the sentence: *If it rains, we'll stay inside.*",
    "*who* = people, *which* = things, *that* = both.",
    "Mix short and long sentences for a text that flows."
  ],
  tabeller: [
    { tittel: "Linking words and what they show", kolonner: ["Meaning", "Words", "Example"], rader: [
      ["Adding", "*and, also, as well as*", "*She sings **and** plays the piano.*"],
      ["Contrast", "*but, although, even though, while, yet*", "***Although** it was cold, we went swimming.*"],
      ["Cause", "*because, since, as*", "*We stayed inside **because** it rained.*"],
      ["Result", "*so, so that, therefore*", "*I was tired, **so** I went to bed.*"],
      ["Time", "*when, while, after, before, until, as soon as*", "*Call me **as soon as** you arrive.*"],
      ["Condition", "*if, unless*", "***If** you hurry, you'll catch the bus.*"],
      ["More information", "*who, which, that, where*", "*Oslo is the city **where** I was born.*"]
    ] }
  ],
  sammenlign: [
    { tittel: "*Som* = *who*, *which* eller *that*", tekst: "Norsk bruker *som* om alt. Engelsk skiller mellom personer og ting.", eks: [["Jenta **som** vant, er søsteren min.", "The girl **who** won is my sister."], ["Boka **som** jeg leste, var spennende.", "The book **which/that** I read was exciting."]] },
    { tittel: "Komma etter leddsetningen", tekst: "Står leddsetningen først, setter vi komma – akkurat som på norsk.", eks: [["Hvis det regner, blir vi inne.", "If it rains, we'll stay inside."], ["Vi blir inne hvis det regner.", "We'll stay inside if it rains."]] }
  ],
  ovelser: [
    { type: "mc", tittel: "Choose the best linking word", oppgaver: [
      { s: "I was hungry, ___ I made a sandwich.", valg: ["so", "but", "although"], forklaring: "*So* shows a result." },
      { s: "___ it was raining, we went for a walk.", valg: ["Although", "Because", "So"], forklaring: "*Although* shows contrast: something unexpected." },
      { s: "She stayed at home ___ she was ill.", valg: ["because", "but", "unless"], forklaring: "*Because* gives a reason." },
      { s: "You can't go out ___ you finish your homework.", valg: ["unless", "because", "so"], forklaring: "*Unless* = if not." },
      { s: "The man ___ lives next door is a pilot.", valg: ["who", "which", "where"], forklaring: "*Who* for people." },
      { s: "This is the house ___ my grandmother grew up.", valg: ["where", "who", "which"], forklaring: "*Where* for places." },
      { s: "I wanted to go, ___ I didn't have time.", valg: ["but", "so", "because"], forklaring: "*But* shows contrast between two main clauses." }
    ] },
    { type: "sorter", tittel: "Simple, compound or complex?", instruks: "Sort the sentences.", kategorier: ["Simple", "Compound", "Complex"], ord: [
      ["The sun was shining.", 0], ["We went to the beach, and we swam all day.", 1], ["We went home when it started to rain.", 2], ["My brother loves pizza.", 0],
      ["I studied hard, but I failed the test.", 1], ["If you need help, call me.", 2], ["The girl who sits next to me is from Poland.", 2], ["She was tired, so she went to bed.", 1]
    ] },
    { type: "fyll", tittel: "Join the sentences", instruks: "Write the missing word to join the two ideas.", oppgaver: [
      { s: "It was late. We kept playing. → It was late, ___ we kept playing.", svar: ["but", "yet"] },
      { s: "I'll call you. I get home. → I'll call you ___ I get home.", svar: ["when", "as soon as", "after"] },
      { s: "He missed the bus. He overslept. → He missed the bus ___ he overslept.", svar: ["because", "since", "as"] },
      { s: "I have a friend. She speaks five languages. → I have a friend ___ speaks five languages.", svar: ["who", "that"] },
      { s: "It was cold. We wore our jackets. → It was cold, ___ we wore our jackets.", svar: ["so"] }
    ] }
  ],
  oppgaver: [
    "Rewrite this text so it flows better. Join some of the sentences: *I have a dog. His name is Max. He is three years old. He likes to run. He is very fast. He doesn't like cats.*",
    "Write a paragraph about your hometown with at least one sentence with *because*, one with *although*, one with *when* and one with *who* or *which*.",
    "Take a text you have written. Find three places where you can join two short sentences into one."
  ],
  se: ["conjunctions", "run-ons", "sentence-parts"]
};
