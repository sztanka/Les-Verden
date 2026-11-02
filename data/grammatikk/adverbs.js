window.LV = window.LV || {};
LV.grammatikk = {
  id: "adverbs",
  tittel: "Adverbs",
  norskNavn: "adverb",
  ikon: "⏱️",
  ingress: "An adverb describes a verb, an adjective or another adverb. It tells us how, when, where, how often or how much something happens.",
  forklaring: [
    "**Adverbs** give extra information. Most often they describe a **verb**: *She runs **quickly**.* But they can also describe an **adjective** (*It was **very** cold*) or another **adverb** (*He spoke **really** slowly*).",
    "Adverbs answer questions like: **How?** (*quickly, carefully, well*) **When?** (*today, yesterday, soon, now*) **Where?** (*here, outside, upstairs, everywhere*) **How often?** (*always, often, sometimes, never*) **How much?** (*very, quite, too, almost*).",
    "Many adverbs are made by adding **-ly** to an adjective: *quick → quickly, careful → carefully*. But some adverbs look exactly like the adjective: *fast, hard, late, early*. And the adverb for *good* is **well**.",
    "Be careful: Not all words ending in *-ly* are adverbs. *Friendly, lovely, lonely* and *ugly* are adjectives!"
  ],
  norsk: "Adverb forteller hvordan, når, hvor, hvor ofte og hvor mye, som på norsk. Den store forskjellen: På norsk lager vi ofte adverb ved å bruke adjektivet med *-t* (*pen → pent*). På engelsk legger vi til **-ly**: *Hun synger pent* = *She sings beautifully* (ikke ~~beautiful~~). *God → godt* blir *good → **well***. Pass også på ordstillingen: *Jeg spiser **alltid** frokost* blir *I **always** eat breakfast* – på engelsk står *always* **foran** hovedverbet.",
  husk: [
    "Adjective describes a **noun**, adverb describes a **verb**: *He is a **careful** driver. He drives **carefully**.*",
    "*Good* is an adjective, *well* is an adverb: *She is a **good** singer. She sings **well**.*",
    "Frequency adverbs (*always, usually, often, sometimes, never*) go **before** the main verb, but **after** *be*: *I **often** read. I am **often** late.*",
    "After linking verbs (*be, look, feel, smell, taste, sound*), use an **adjective**: *You look **great**. The soup smells **good**.*"
  ],
  tabeller: [
    { tittel: "Kinds of adverbs", kolonner: ["Kind", "Answers the question", "Examples", "Sentence"], rader: [
      ["Manner", "How?", "*quickly, slowly, carefully, well, hard, fast*", "*She works **hard**.*"],
      ["Time", "When?", "*now, today, yesterday, soon, later, already, yet*", "*I'll do it **later**.*"],
      ["Place", "Where?", "*here, there, outside, upstairs, everywhere, abroad*", "*The children are playing **outside**.*"],
      ["Frequency", "How often?", "*always, usually, often, sometimes, rarely, never*", "*We **never** eat meat.*"],
      ["Degree", "How much?", "*very, really, quite, too, almost, extremely, enough*", "*The tea is **too** hot.*"]
    ] },
    { tittel: "How to make adverbs with -ly", kolonner: ["Rule", "Adjective", "Adverb"], rader: [
      ["Most adjectives: add **-ly**", "quick, careful, sad", "quick**ly**, careful**ly**, sad**ly**"],
      ["Ending in **-y**: change to **-ily**", "happy, easy, angry", "happ**ily**, eas**ily**, angr**ily**"],
      ["Ending in **-le**: change to **-ly**", "gentle, terrible, possible", "gent**ly**, terrib**ly**, possib**ly**"],
      ["Ending in **-ic**: add **-ally**", "basic, tragic, dramatic", "basic**ally**, tragic**ally**, dramatic**ally**"],
      ["Irregular", "good", "**well**"],
      ["Same form as the adjective", "fast, hard, late, early, straight", "fast, hard, late, early, straight"]
    ], note: "Watch out: *hardly* means *nesten ikke* (*I can hardly see*), and *lately* means *i det siste*." },
    { tittel: "Where do frequency adverbs go?", kolonner: ["Rule", "Example", "Norsk"], rader: [
      ["**Before** the main verb", "*I **always** eat breakfast.*", "Jeg spiser **alltid** frokost."],
      ["**After** *am / is / are / was / were*", "*She is **never** late.*", "Hun er **aldri** sen."],
      ["**After** a helping verb", "*I have **often** been to London.*", "Jeg har **ofte** vært i London."],
      ["In questions: after the subject", "*Do you **usually** walk to school?*", "Går du **vanligvis** til skolen?"]
    ] }
  ],
  sammenlign: [
    { tittel: "*-ly*, ikke *-t*", tekst: "Norsk lager mange adverb med *-t* (eller samme form som adjektivet). På engelsk må du huske *-ly*.", eks: [["Hun synger **pent**.", "She sings **beautifully**."], ["Kjør **forsiktig**!", "Drive **carefully**!"], ["Han snakker **godt** engelsk.", "He speaks English **well**."], ["Vi vant **lett**.", "We won **easily**."]] },
    { tittel: "Ordstilling: *always, never, often*", tekst: "På norsk står slike adverb **etter** verbet. På engelsk står de **foran** hovedverbet (men etter *be*).", eks: [["Jeg **går alltid** til skolen.", "I **always walk** to school."], ["Hun **spiser aldri** fisk.", "She **never eats** fish."], ["Vi **er ofte** sene.", "We **are often** late."]] },
    { tittel: "*Hard* og *hardly*", tekst: "*Hard* betyr *hardt*, men *hardly* betyr *nesten ikke*. Dette er en vanlig felle!", eks: [["Hun jobber **hardt**.", "She works **hard**."], ["Jeg kunne **nesten ikke** se noe.", "I could **hardly** see anything."]] },
    { tittel: "Etter *look, feel, smell, taste*: adjektiv", tekst: "Når verbet beskriver hvordan noe er eller virker, bruker engelsk adjektiv – ikke adverb.", eks: [["Du ser **flott** ut.", "You look **great**."], ["Kaken smaker **godt**.", "The cake tastes **good**."], ["Jeg føler meg **dårlig**.", "I feel **bad** / **ill**."]] }
  ],
  ovelser: [
    { type: "fyll", tittel: "Make adverbs", instruks: "Write the **adverb** of the adjective in brackets.", oppgaver: [
      { s: "Please speak ___. The baby is sleeping.", hint: "quiet", svar: ["quietly"] },
      { s: "She sings very ___.", hint: "beautiful", svar: ["beautifully"] },
      { s: "He did ___ in the test.", hint: "good", svar: ["well"] },
      { s: "The children played ___ in the garden.", hint: "happy", svar: ["happily"] },
      { s: "Drive ___! The road is icy.", hint: "careful", svar: ["carefully"] },
      { s: "She held the kitten ___.", hint: "gentle", svar: ["gently"] },
      { s: "He runs very ___.", hint: "fast", svar: ["fast"] },
      { s: "We finished the task ___.", hint: "easy", svar: ["easily"] }
    ] },
    { type: "mc", tittel: "Adjective or adverb?", oppgaver: [
      { s: "Tom is a ___ driver.", valg: ["careful", "carefully"], forklaring: "*Careful* describes the noun *driver*: adjective." },
      { s: "Tom drives ___.", valg: ["carefully", "careful"], forklaring: "*Carefully* describes the verb *drives*: adverb." },
      { s: "She speaks English very ___.", valg: ["well", "good"], forklaring: "*Well* is the adverb of *good*." },
      { s: "This pizza tastes ___!", valg: ["good", "well"], forklaring: "After *taste*, we use an adjective." },
      { s: "The test was ___ easy.", valg: ["surprisingly", "surprising"], forklaring: "*Surprisingly* describes the adjective *easy*: adverb." },
      { s: "You look ___ today.", valg: ["happy", "happily"], forklaring: "After *look*, use an adjective." },
      { s: "I could ___ hear what she said. It was so noisy.", valg: ["hardly", "hard"], forklaring: "*Hardly* = nesten ikke." }
    ] },
    { type: "sorter", tittel: "What does the adverb tell us?", instruks: "Sort the adverbs: **How**, **When**, **Where** or **How often**?", kategorier: ["How", "When", "Where", "How often"], ord: [
      ["slowly", 0], ["yesterday", 1], ["outside", 2], ["always", 3], ["carefully", 0], ["soon", 1], ["upstairs", 2], ["sometimes", 3], ["well", 0], ["tomorrow", 1], ["everywhere", 2], ["never", 3]
    ] },
    { type: "mc", tittel: "Word order", oppgaver: [
      { s: "Which sentence is correct?", valg: ["I always eat breakfast.", "I eat always breakfast.", "Always I eat breakfast."], forklaring: "*Always* goes before the main verb." },
      { s: "Which sentence is correct?", valg: ["She is never late.", "She never is late.", "She is late never."], forklaring: "After *be*, the adverb comes after the verb: *is never*." },
      { s: "Which sentence is correct?", valg: ["We often go to the cinema.", "We go often to the cinema.", "We go to often the cinema."], forklaring: "*Often* goes before the main verb *go*." },
      { s: "Which sentence is correct?", valg: ["Have you ever been to Scotland?", "Have ever you been to Scotland?", "Have you been ever to Scotland?"], forklaring: "In questions, the adverb comes after the subject: *Have you ever …?*" }
    ] },
    { type: "finn", tittel: "Find the adverbs", instruks: "Click on all the **adverbs**.", oppgaver: [
      { s: "She [quickly] ran [outside]." },
      { s: "We [usually] go to bed [early]." },
      { s: "The film was [really] good." },
      { s: "[Yesterday] it rained [very] [heavily]." },
      { s: "He [never] speaks [loudly]." }
    ] }
  ],
  oppgaver: [
    "Write about your week. Use at least five frequency adverbs (*always, usually, often, sometimes, never*). Check the word order!",
    "Describe how different people do things: *My mum drives carefully. My best friend laughs loudly …* Write six sentences with adverbs of manner.",
    "Translate into English: *Hun synger pent. Han jobber hardt. Jeg spiser aldri fisk. Du snakker godt engelsk.*"
  ],
  se: ["adjectives", "verbs", "prepositions"]
};
