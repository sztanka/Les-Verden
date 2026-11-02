window.LV = window.LV || {};
LV.grammatikk = {
  id: "articles",
  tittel: "Articles and determiners",
  norskNavn: "artikler og determinativer",
  ikon: "🔑",
  ingress: "Articles and determiners are small words that come before a noun. They tell us if we are talking about something specific or general, which one we mean, or how many.",
  forklaring: [
    "English has three **articles**: *a* and *an* (the **indefinite** articles) and *the* (the **definite** article).",
    "Use **a / an** when you talk about one thing that is not specific, or when you mention something for the first time: *I saw **a** dog.* Use **the** when it is clear which one you mean: ***The** dog was huge.*",
    "Use **a** before a consonant **sound** and **an** before a vowel **sound**. It is the sound that matters, not the letter: ***a** car, **an** apple, **an** hour (h is silent), **a** university (sounds like «you»).*",
    "Sometimes we use **no article** at all: when we talk about things in general in the plural or with uncountable nouns (*Dogs are loyal. Water is important.*), and before most names of people, countries, languages, meals and school subjects.",
    "**Determiners** is a bigger group of words that come before a noun. Articles are determiners, and so are **demonstratives** (*this, that, these, those*), **possessives** (*my, your, their*), **quantifiers** (*some, any, much, many, a lot of, every, each, all, no*) and **numbers** (*two, the first*)."
  ],
  norsk: "Norsk *en/ei/et* blir *a/an* på engelsk, og bestemt form (*bil**en***) blir ***the** car*. Forskjeller du bør kjenne: 1) Yrker og titler må ha *a/an*: *Hun er lege* = *She is **a** doctor*. 2) Når vi snakker generelt, bruker engelsk ingen artikkel: *Livet er kort* = *Life is short*, *Mennesker trenger vann* = *People need water*. 3) *A* eller *an* avgjøres av lyden: *an hour*, *a university*. 4) *De fleste* = *most* (ikke ~~the most~~): *Most people like music*.",
  husk: [
    "**an** before a vowel sound: *an apple, an egg, an hour, an MP3*. **a** before a consonant sound: *a book, a house, a university, a European*.",
    "Jobs need *a/an*: *My dad is **a** teacher. I want to be **an** engineer.*",
    "No *the* when you talk about things in general: ***Music** makes me happy. **Dogs** are friendly.*",
    "*Some* in positive sentences, *any* in questions and negatives: *I have **some** money. Do you have **any** money? I don't have **any** money.*",
    "*Many* with countable nouns, *much* with uncountable nouns: *many books, much time*. *A lot of* works with both."
  ],
  tabeller: [
    { tittel: "A, an or the?", kolonner: ["Article", "When", "Examples"], rader: [
      ["**a**", "one, not specific – before a consonant **sound**", "*a dog, a car, a house, a university, a one-way ticket*"],
      ["**an**", "one, not specific – before a vowel **sound**", "*an apple, an elephant, an hour, an honest man, an MP3 player*"],
      ["**the**", "specific – we know which one", "*the sun, the dog I told you about, the best day*"],
      ["**no article**", "general plural or uncountable, most names, meals, languages, sports, subjects", "*Cats sleep a lot. I love music. I live in Norway. We had lunch. I play football. I like history.*"]
    ] },
    { tittel: "When to use the – and when not", kolonner: ["Use **the**", "No article"], rader: [
      ["something mentioned before: *I saw a film. **The** film was great.*", "general statements: *Films are fun.*"],
      ["only one exists: ***the** sun, **the** moon, **the** internet*", "most countries: *Norway, France, China*"],
      ["countries with *Republic, Kingdom, States* or plural names: ***the** USA, **the** UK, **the** Netherlands*", "cities, streets, lakes, single mountains: *Oslo, Oxford Street, Lake Mjøsa, Mount Everest*"],
      ["rivers, seas, oceans, mountain ranges: ***the** Thames, **the** Atlantic, **the** Alps*", "meals: *have breakfast, after dinner*"],
      ["superlatives and ordinal numbers: ***the** best, **the** first*", "school subjects, languages, sports: *English, maths, football*"],
      ["musical instruments: *play **the** piano*", "*go to school / bed / work* (the normal purpose)"]
    ] },
    { tittel: "Other determiners", kolonner: ["Kind", "Determiners", "Example", "Norsk"], rader: [
      ["Demonstratives", "this, that, these, those", "*this book, those shoes*", "denne, den, disse, de"],
      ["Possessives", "my, your, his, her, its, our, their", "*my brother, their house*", "min, din, hans, hennes …"],
      ["Some / any", "some, any, no", "*some milk, any questions, no time*", "noe, noen, ingen"],
      ["Much / many", "much (uncountable), many (countable)", "*much water, many people*", "mye, mange"],
      ["A lot of", "a lot of / lots of (both)", "*a lot of friends, a lot of fun*", "mye, mange"],
      ["Few / little", "(a) few (countable), (a) little (uncountable)", "*a few minutes, a little sugar*", "noen få, litt"],
      ["Every / each / all", "every, each, all, both", "*every day, each student, all children*", "hver, alle, begge"]
    ] }
  ],
  sammenlign: [
    { tittel: "Yrker med *a/an*", tekst: "På norsk sier vi *Hun er lege*. På engelsk må yrket ha *a* eller *an*.", eks: [["Hun er lege.", "She is **a** doctor."], ["Jeg vil bli ingeniør.", "I want to be **an** engineer."], ["Faren min er lærer.", "My dad is **a** teacher."]] },
    { tittel: "Generelle utsagn uten *the*", tekst: "Norsk bruker ofte bestemt form om ting generelt (*livet, naturen, musikken*). Engelsk bruker ingen artikkel.", eks: [["**Livet** er kort.", "**Life** is short."], ["Jeg elsker **naturen**.", "I love **nature**."], ["**Musikk** gjør meg glad.", "**Music** makes me happy."], ["**Folk** er snille.", "**People** are kind."]] },
    { tittel: "*De fleste* = *most*", tekst: "Ikke oversett *de fleste* med ~~the most~~.", eks: [["**De fleste** liker sjokolade.", "**Most** people like chocolate."]] },
    { tittel: "Bestemt form vs. *the*", tekst: "Norsk har bestemt form bakerst i ordet, engelsk har *the* foran. Noen ganger har norsk bestemt form der engelsk ikke har *the*.", eks: [["bil**en**", "**the** car"], ["på skol**en**", "at school"], ["i senga", "in bed"], ["spille piano", "play **the** piano"]] },
    { tittel: "Utrop og mengder", tekst: "Noen faste uttrykk har *a/an* på engelsk, men ikke på norsk.", eks: [["For en fin dag!", "What **a** nice day!"], ["en halvtime", "half **an** hour"], ["to ganger i uka", "twice **a** week"], ["50 kroner kiloet", "50 kroner **a** kilo"]] }
  ],
  ovelser: [
    { type: "fyll", tittel: "A or an?", instruks: "Write **a** or **an**. Remember: it is the **sound** that matters!", oppgaver: [
      { s: "I ate ___ apple.", svar: ["an"] },
      { s: "She has ___ dog.", svar: ["a"] },
      { s: "We waited for ___ hour.", svar: ["an"], forklaring: "The *h* in *hour* is silent." },
      { s: "My sister goes to ___ university in Oslo.", svar: ["a"], forklaring: "*University* starts with a «you» sound." },
      { s: "He is ___ honest man.", svar: ["an"], forklaring: "The *h* in *honest* is silent." },
      { s: "I saw ___ elephant at the zoo.", svar: ["an"] },
      { s: "She wants to be ___ engineer.", svar: ["an"] },
      { s: "It was ___ unusual day.", svar: ["an"] },
      { s: "We stayed in ___ hotel in London.", svar: ["a"] },
      { s: "He wore ___ uniform.", svar: ["a"], forklaring: "*Uniform* starts with a «you» sound." }
    ] },
    { type: "fyll", tittel: "A, an, the – or nothing?", instruks: "Write **a**, **an** or **the**. Write **-** if no article is needed.", oppgaver: [
      { s: "My mum is ___ nurse.", svar: ["a"] },
      { s: "___ sun is shining today.", svar: ["The"] },
      { s: "I love ___ music.", svar: ["-", "–", "x", "0"], forklaring: "Music in general: no article." },
      { s: "We live in ___ Norway.", svar: ["-", "–", "x", "0"], forklaring: "No article before most country names." },
      { s: "Have you ever been to ___ USA?", svar: ["the"] },
      { s: "She plays ___ piano very well.", svar: ["the"] },
      { s: "I saw a film yesterday. ___ film was about space.", svar: ["The"], forklaring: "We have mentioned the film before: *the*." },
      { s: "What ___ beautiful day!", svar: ["a"] },
      { s: "___ dogs are loyal animals.", svar: ["-", "–", "x", "0"], forklaring: "Dogs in general: no article." },
      { s: "Mount Everest is ___ highest mountain in the world.", svar: ["the"] }
    ] },
    { type: "mc", tittel: "Some, any, much, many", oppgaver: [
      { s: "I'd like ___ milk in my tea, please.", valg: ["some", "any", "many"], forklaring: "Positive sentence: *some*." },
      { s: "Do you have ___ brothers or sisters?", valg: ["any", "some", "much"], forklaring: "Question: *any*." },
      { s: "There aren't ___ eggs left.", valg: ["any", "some", "much"], forklaring: "Negative sentence: *any*." },
      { s: "How ___ money do you have?", valg: ["much", "many"], forklaring: "*Money* is uncountable: *much*." },
      { s: "How ___ people were at the concert?", valg: ["many", "much"], forklaring: "*People* is countable: *many*." },
      { s: "We don't have ___ time.", valg: ["much", "many"], forklaring: "*Time* is uncountable: *much*." },
      { s: "___ people like chocolate.", valg: ["Most", "The most", "Most of"], forklaring: "*De fleste* = *most* (no *the*)." }
    ] },
    { type: "sorter", tittel: "A or an?", instruks: "Sort the words: do they take **a** or **an**? Listen to the first sound!", kategorier: ["a", "an"], ord: [
      ["house", 0], ["hour", 1], ["umbrella", 1], ["university", 0], ["egg", 1], ["European country", 0], ["orange", 1], ["one-way ticket", 0], ["idea", 1], ["useful tip", 0], ["honest answer", 1], ["horse", 0]
    ] },
    { type: "finn", tittel: "Find the articles and determiners", instruks: "Click on all the **articles and determiners** (*a, an, the, this, my, some, every …*).", oppgaver: [
      { s: "[The] girl gave [her] friend [a] present." },
      { s: "[This] book has [many] pictures." },
      { s: "I have [some] money in [my] pocket." },
      { s: "[Every] student needs [a] pencil and [an] eraser." },
      { s: "[Those] shoes are [the] best ones." }
    ] }
  ],
  oppgaver: [
    "Write about the jobs of five people you know: *My aunt is a nurse …* Remember *a* or *an*!",
    "Write five general statements without *the*, for example *Music makes people happy.* Then write five sentences about specific things with *the*.",
    "Translate into English: *Hun er lærer. Livet er fint. De fleste liker sommeren. For en fin dag! Vi har engelsk to ganger i uka.*"
  ],
  se: ["nouns", "pronouns", "adjectives"]
};
