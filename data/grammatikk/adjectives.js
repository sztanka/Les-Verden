window.LV = window.LV || {};
LV.grammatikk = {
  id: "adjectives",
  tittel: "Adjectives",
  norskNavn: "adjektiv",
  ikon: "🎨",
  ingress: "An adjective describes a noun or a pronoun. It tells us what something is like: what kind, which one or how many.",
  forklaring: [
    "**Adjectives** are describing words. They make your writing more interesting: *a dog* → *a **big, friendly** dog*.",
    "An adjective can stand **before a noun** (*a **red** car*) or **after a linking verb** like *be, look, seem, feel, taste, smell, sound, become* (*The car is **red**. You look **tired**.*).",
    "Adjectives can **compare** things. Short adjectives get **-er** and **-est**: *tall – taller – the tallest*. Long adjectives get **more** and **most**: *beautiful – more beautiful – the most beautiful*.",
    "In English, adjectives **never change** for plural or gender: *a **big** house – two **big** houses*. That is easier than in Norwegian!",
    "Words ending in **-ed** describe how someone feels (*I'm **bored***). Words ending in **-ing** describe what causes the feeling (*The film is **boring***)."
  ],
  norsk: "Adjektiv beskriver substantiv, som på norsk. Men engelske adjektiv bøyes **ikke** i kjønn og tall: *et stort hus – store hus* blir *a big house – big houses*. Gradbøying ligner norsk: korte ord får *-er/-est* (*høy – høyere – høyest* / *tall – taller – tallest*), lange ord får *more/most* (*mer/mest*). Pass på forskjellen på *-ed* og *-ing*: *I am bored* (jeg kjeder meg) og *it is boring* (det er kjedelig). Adjektiv for nasjonalitet skrives med stor forbokstav: *Norwegian, British*.",
  husk: [
    "Adjectives never get -s: *two **old** cars* (not ~~olds~~).",
    "Compare with **than**: *She is taller **than** me.* (Not ~~then~~!)",
    "*Good – better – best* and *bad – worse – worst* are irregular.",
    "**-ed = how I feel** (*interested, excited, tired*). **-ing = what the thing is like** (*interesting, exciting, tiring*)."
  ],
  tabeller: [
    { tittel: "Comparing adjectives", kolonner: ["Rule", "Adjective", "Comparative", "Superlative"], rader: [
      ["One syllable: add **-er / -est**", "tall, old, fast", "tall**er**, old**er**, fast**er**", "the tall**est**, the old**est**, the fast**est**"],
      ["Ending in **-e**: add **-r / -st**", "nice, large", "nice**r**, large**r**", "the nice**st**, the large**st**"],
      ["Short vowel + one consonant: **double** the consonant", "big, hot, thin", "bi**gg**er, ho**tt**er, thi**nn**er", "the bi**gg**est, the ho**tt**est, the thi**nn**est"],
      ["Ending in **-y**: change to **-ier / -iest**", "happy, easy, funny", "happ**ier**, eas**ier**, funn**ier**", "the happ**iest**, the eas**iest**, the funn**iest**"],
      ["Two or more syllables: **more / most**", "beautiful, expensive, interesting", "**more** beautiful, **more** expensive", "the **most** beautiful, the **most** expensive"],
      ["Irregular", "good, bad, far", "**better**, **worse**, **further / farther**", "the **best**, the **worst**, the **furthest / farthest**"],
      ["Irregular", "much / many, little", "**more**, **less**", "the **most**, the **least**"]
    ] },
    { tittel: "Comparing in sentences", kolonner: ["Pattern", "Example", "Norsk"], rader: [
      ["comparative + **than**", "*Oslo is bigger **than** Bergen.*", "Oslo er større enn Bergen."],
      ["**as** + adjective + **as**", "*Tom is **as tall as** his dad.*", "Tom er like høy som faren sin."],
      ["**not as** … **as**", "*Maths is **not as hard as** I thought.*", "Matte er ikke så vanskelig som jeg trodde."],
      ["**the** + superlative", "*Mount Everest is **the highest** mountain in the world.*", "Mount Everest er det høyeste fjellet i verden."],
      ["**the same as**", "*My phone is **the same as** yours.*", "Telefonen min er lik din."]
    ] },
    { tittel: "-ed or -ing?", kolonner: ["-ed: how you feel", "-ing: what it is like", "Norsk"], rader: [
      ["I'm **bored**.", "The lesson is **boring**.", "jeg kjeder meg / kjedelig"],
      ["I'm **interested** in history.", "History is **interesting**.", "interessert / interessant"],
      ["We were **excited**.", "The match was **exciting**.", "spent / spennende"],
      ["She was **tired**.", "The trip was **tiring**.", "trøtt / slitsom"],
      ["He was **surprised**.", "The result was **surprising**.", "overrasket / overraskende"],
      ["I'm **confused**.", "The rules are **confusing**.", "forvirret / forvirrende"]
    ] },
    { tittel: "The order of adjectives", tekst: "When you use several adjectives before a noun, they usually come in this order (you rarely need more than two or three):", kolonner: ["Opinion", "Size", "Age", "Shape", "Colour", "Origin", "Material", "Noun"], rader: [
      ["a lovely", "little", "old", "round", "red", "Norwegian", "wooden", "boat"],
      ["a nice", "big", "new", "", "black", "", "leather", "jacket"]
    ] }
  ],
  sammenlign: [
    { tittel: "Ingen bøying i kjønn og tall", tekst: "På norsk bøyer vi adjektivet: *stor, stort, store*. På engelsk har adjektivet bare én form.", eks: [["en stor bil – et stort hus – store hus", "a **big** car – a **big** house – **big** houses"], ["Den røde bilen", "The **red** car"], ["De er glade.", "They are **happy**."]] },
    { tittel: "*Than* – ikke *then*", tekst: "*Enn* heter *than*. *Then* betyr *så/da*. Dette er en av de vanligste skrivefeilene!", eks: [["Hun er eldre **enn** meg.", "She is older **than** me."], ["Først spiste vi, **så** dro vi.", "First we ate, **then** we left."]] },
    { tittel: "*-ed* eller *-ing*", tekst: "Norske elever skriver ofte *I am boring* når de mener *jeg kjeder meg*. Men *I am boring* betyr *jeg er kjedelig*!", eks: [["Jeg kjeder meg.", "I'm **bored**."], ["Jeg er interessert i fotball.", "I'm **interested** in football."], ["Filmen var skummel.", "The film was **frightening** / **scary**."]] },
    { tittel: "Nasjonalitet med stor forbokstav", tekst: "Adjektiv som viser land og språk, har stor forbokstav på engelsk.", eks: [["norsk mat", "**N**orwegian food"], ["en britisk forfatter", "a **B**ritish writer"], ["amerikanske filmer", "**A**merican films"]] },
    { tittel: "Adjektiv eller adverb?", tekst: "Norsk bruker ofte samme ord som adjektiv og adverb (*hun er pen – hun synger pent*). På engelsk får adverbet ofte *-ly*: *She is **beautiful**. She sings **beautifully**.* Se siden om adverbs." }
  ],
  ovelser: [
    { type: "finn", tittel: "Find the adjectives", instruks: "Click on all the **adjectives**.", oppgaver: [
      { s: "We live in a [small], [yellow] house near the sea." },
      { s: "The film was [long] but very [exciting]." },
      { s: "My [new] teacher is [kind] and [funny]." },
      { s: "It was a [cold], [dark] night." },
      { s: "You look [tired] today." }
    ] },
    { type: "fyll", tittel: "Comparatives", instruks: "Write the **comparative** form (taller, more beautiful …).", oppgaver: [
      { s: "My brother is ___ than me.", hint: "old", svar: ["older"] },
      { s: "Today is ___ than yesterday.", hint: "hot", svar: ["hotter"] },
      { s: "This test was ___ than the last one.", hint: "easy", svar: ["easier"] },
      { s: "A Ferrari is ___ than a Fiat.", hint: "expensive", svar: ["more expensive"] },
      { s: "My new phone is ___ than my old one.", hint: "good", svar: ["better"] },
      { s: "The weather is ___ today than yesterday.", hint: "bad", svar: ["worse"] },
      { s: "Spanish is ___ than I thought.", hint: "difficult", svar: ["more difficult"] }
    ] },
    { type: "fyll", tittel: "Superlatives", instruks: "Write the **superlative** form with *the* (the tallest, the most beautiful …).", oppgaver: [
      { s: "The blue whale is ___ animal in the world.", hint: "big", svar: ["the biggest"] },
      { s: "This is ___ day of my life!", hint: "happy", svar: ["the happiest"] },
      { s: "That was ___ film I have ever seen.", hint: "bad", svar: ["the worst"] },
      { s: "She is ___ person in our class.", hint: "intelligent", svar: ["the most intelligent"] },
      { s: "Lofoten is one of ___ places in Norway.", hint: "beautiful", svar: ["the most beautiful"] },
      { s: "Who is ___ player on the team?", hint: "good", svar: ["the best"] }
    ] },
    { type: "mc", tittel: "-ed or -ing?", oppgaver: [
      { s: "I'm really ___ in space and planets.", valg: ["interested", "interesting"], forklaring: "How I feel: *interested*." },
      { s: "The documentary about space was very ___.", valg: ["interesting", "interested"], forklaring: "What the film is like: *interesting*." },
      { s: "There's nothing to do. I'm so ___!", valg: ["bored", "boring"], forklaring: "How I feel: *bored*. (*I'm boring* = jeg er kjedelig!)" },
      { s: "We were ___ when our team won.", valg: ["excited", "exciting"], forklaring: "How we felt: *excited*." },
      { s: "The rules of cricket are very ___.", valg: ["confusing", "confused"], forklaring: "What the rules are like: *confusing*." },
      { s: "After the long walk, I was ___.", valg: ["tired", "tiring"], forklaring: "How I felt: *tired*." }
    ] },
    { type: "mc", tittel: "Choose the correct sentence", oppgaver: [
      { s: "Which sentence is correct?", valg: ["They are happy.", "They are happys.", "They are happies."], forklaring: "Adjectives never get -s." },
      { s: "Which sentence is correct?", valg: ["She is taller than her mum.", "She is taller then her mum.", "She is more tall than her mum."], forklaring: "*Tall* gets *-er*, and we compare with *than*." },
      { s: "Which sentence is correct?", valg: ["I love Norwegian food.", "I love norwegian food.", "I love Norwegians food."], forklaring: "Nationality adjectives take a capital letter and no -s." },
      { s: "Which sentence is correct?", valg: ["He has a beautiful old wooden house.", "He has a wooden old beautiful house.", "He has an old wooden beautiful house."], forklaring: "Opinion – age – material: *beautiful old wooden*." }
    ] }
  ],
  oppgaver: [
    "Describe a person you admire, using at least eight different adjectives.",
    "Compare two places, two films or two sports. Use comparatives (*bigger than, more exciting than*) and superlatives (*the best*).",
    "Write five pairs of sentences with *-ed* and *-ing* adjectives, for example *I was surprised. The ending was surprising.*"
  ],
  se: ["adverbs", "nouns", "articles"]
};
