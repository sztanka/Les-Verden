window.LV = window.LV || {};
LV.grammatikk = {
  id: "nouns",
  tittel: "Nouns",
  norskNavn: "substantiv",
  ikon: "🏷️",
  ingress: "A noun is a word that names a person, a place, a thing or an idea. Nouns are often the most important words in a sentence – they tell us who or what the sentence is about.",
  forklaring: [
    "**Nouns** are naming words. They can name a **person** (*teacher, sister, Nora*), a **place** (*school, Bergen, kitchen*), a **thing** (*phone, dog, bike*) or an **idea or feeling** (*freedom, happiness, friendship*).",
    "**Common nouns** are general words like *city* and *girl*. **Proper nouns** are the names of particular people, places and things, like *London* and *Taylor Swift*. Proper nouns always start with a capital letter.",
    "**Concrete nouns** are things you can see, hear, touch, smell or taste (*pizza, music*). **Abstract nouns** are ideas and feelings you cannot touch (*love, democracy, fear*).",
    "**Countable nouns** can be counted and have a plural form: *one book, two books*. **Uncountable nouns** cannot be counted and have no plural: *water, information, advice*.",
    "A good test: If you can put *a*, *an* or *the* in front of a word, it is probably a noun: *a house, an idea, the weather*."
  ],
  norsk: "Substantiv er navn på personer, steder, ting og ideer, akkurat som på norsk. De store forskjellene er: 1) Engelsk har ingen bestemt form på slutten av ordet. Vi sier *the car*, ikke «carren». 2) Mange engelske substantiv er **utellelige** og har ikke flertall, for eksempel *information*, *advice*, *news*, *furniture* og *homework*. 3) Dager, måneder, språk og nasjonaliteter skrives med **stor forbokstav** på engelsk: *Monday, July, English, Norwegian*.",
  husk: [
    "Most nouns get **-s** in the plural: *one cat – two cats*. But watch out for the irregular ones: *child – children, man – men, foot – feet*.",
    "Uncountable nouns have no plural and take a singular verb: *The news **is** good. My homework **is** done.*",
    "Use a capital letter for days, months, languages, nationalities and holidays: *on Monday in May, I speak English, Christmas*.",
    "Show that something belongs to someone with **'s**: *Nora's phone, the dog's bed, the children's toys*."
  ],
  tabeller: [
    { tittel: "Kinds of nouns", kolonner: ["Kind", "What it is", "Examples"], rader: [
      ["Common noun", "a general word for a person, place or thing", "*boy, city, river, book*"],
      ["Proper noun", "the name of a particular person, place or thing – capital letter!", "*Emma, Oslo, the Thames, Harry Potter*"],
      ["Concrete noun", "something you can see, hear, touch, smell or taste", "*apple, music, chair, rain*"],
      ["Abstract noun", "an idea, quality or feeling", "*love, freedom, courage, democracy*"],
      ["Countable noun", "can be counted – has a plural", "*a chair – three chairs*"],
      ["Uncountable noun", "cannot be counted – no plural", "*water, money, advice, information*"],
      ["Collective noun", "a group of people or animals", "*team, family, class, crowd, herd*"],
      ["Compound noun", "two or more words that form one noun", "*football, bus stop, mother-in-law*"]
    ] },
    { tittel: "How to make the plural", kolonner: ["Rule", "Singular", "Plural"], rader: [
      ["Most nouns: add **-s**", "book, car, girl", "book**s**, car**s**, girl**s**"],
      ["After **-s, -x, -z, -ch, -sh**: add **-es**", "bus, box, church, dish", "bus**es**, box**es**, church**es**, dish**es**"],
      ["Some nouns ending in **-o**: add **-es**", "potato, tomato, hero", "potato**es**, tomato**es**, hero**es**"],
      ["Consonant + **y**: change to **-ies**", "city, baby, story", "cit**ies**, bab**ies**, stor**ies**"],
      ["Vowel + **y**: just add **-s**", "boy, day, key", "boy**s**, day**s**, key**s**"],
      ["Many nouns ending in **-f / -fe**: change to **-ves**", "knife, leaf, wife, half", "kni**ves**, lea**ves**, wi**ves**, hal**ves**"],
      ["Irregular plurals", "man, woman, child, person", "**men**, **women**, **children**, **people**"],
      ["Irregular plurals", "foot, tooth, mouse, goose", "**feet**, **teeth**, **mice**, **geese**"],
      ["Same in singular and plural", "sheep, fish, deer", "sheep, fish, deer"]
    ], note: "Exceptions: *photo – photos, piano – pianos, roof – roofs, chief – chiefs*." },
    { tittel: "Uncountable nouns – watch out!", tekst: "These nouns are uncountable in English. They have no plural, and we cannot use *a/an* in front of them. Use *some*, *a lot of* or *a piece of* instead.", kolonner: ["English (uncountable)", "Norsk", "Say this", "Not this"], rader: [
      ["information", "informasjon, opplysninger", "*some information, a piece of information*", "~~informations~~"],
      ["advice", "råd", "*some advice, a piece of advice*", "~~an advice, advices~~"],
      ["news", "nyheter, nyhet", "*The news **is** good.*", "~~The news are good.~~"],
      ["homework", "lekser", "*I have a lot of homework.*", "~~homeworks~~"],
      ["furniture", "møbler", "*We bought new furniture.*", "~~furnitures~~"],
      ["money", "penger", "*The money **is** on the table.*", "~~The money are …~~"],
      ["hair", "hår", "*Her hair **is** long.*", "~~Her hairs are long.~~"],
      ["knowledge", "kunnskap(er)", "*She has a lot of knowledge.*", "~~knowledges~~"],
      ["equipment", "utstyr", "*The equipment is expensive.*", "~~equipments~~"],
      ["luggage / baggage", "bagasje", "*How much luggage do you have?*", "~~luggages~~"]
    ] },
    { tittel: "Showing that something belongs to someone (genitive)", kolonner: ["Rule", "Example", "Norsk"], rader: [
      ["One owner: add **'s**", "the girl**'s** bike, Nora**'s** phone", "jentas sykkel, Noras telefon"],
      ["Plural owners ending in -s: add only **'**", "the girls**'** bikes, my parents**'** car", "jentenes sykler, foreldrene mine sin bil"],
      ["Irregular plural: add **'s**", "the children**'s** toys, men**'s** clothes", "barnas leker, herreklær"],
      ["Names ending in -s: **'s** or **'**", "James**'s** car / James**'** car", "James' bil"],
      ["Things: often **of**", "the end **of** the film, the roof **of** the house", "slutten av filmen, taket på huset"]
    ] }
  ],
  sammenlign: [
    { tittel: "Bestemt form: *the* foran ordet", tekst: "På norsk setter vi bestemt artikkel bakerst i ordet (bil**en**, hus**et**, jent**a**). På engelsk står *the* foran, og substantivet endrer seg ikke.", eks: [["bil**en**", "**the** car"], ["hus**ene**", "**the** houses"], ["jent**a** sin sykkel", "**the** girl's bike"]] },
    { tittel: "Stor forbokstav", tekst: "Engelsk bruker stor forbokstav i flere ord enn norsk: dager, måneder, høytider, språk og nasjonaliteter.", eks: [["på mandag i januar", "on **M**onday in **J**anuary"], ["Jeg snakker norsk og engelsk.", "I speak **N**orwegian and **E**nglish."], ["i julen", "at **C**hristmas"]] },
    { tittel: "Utellelige substantiv", tekst: "Noen ord er flertall på norsk, men utellelige (entall) på engelsk. Da må verbet også stå i entall.", eks: [["Nyhetene **er** gode.", "The news **is** good."], ["Leksene mine **er** ferdige.", "My homework **is** done."], ["Pengene **ligger** på bordet.", "The money **is** on the table."], ["et godt råd", "**a piece of** good advice"]] },
    { tittel: "Sammensatte ord", tekst: "Norsk skriver sammensatte ord i ett ord. På engelsk skrives mange av dem i to ord. Slå opp i ordboka hvis du er usikker!", eks: [["fotballkamp", "football match"], ["busstopp", "bus stop"], ["mobiltelefon", "mobile phone"], ["soverom", "bedroom (ett ord!)"]] },
    { tittel: "Genitiv med apostrof", tekst: "På norsk skriver vi *Olas bil* uten apostrof. På engelsk må du ha apostrof: *Ola's car*. Ikke bruk apostrof i vanlig flertall: *two cars* (ikke ~~car's~~)." }
  ],
  ovelser: [
    { type: "finn", tittel: "Find the nouns", instruks: "Click on all the **nouns** in each sentence. Then press «Check».", oppgaver: [
      { s: "My [sister] has a black [cat] and two [dogs]." },
      { s: "The [students] visited a [museum] in [London]." },
      { s: "[Friendship] is more important than [money]." },
      { s: "On [Monday], our [teacher] gave us a difficult [test]." },
      { s: "The [team] won the [match] after a long [fight]." },
      { s: "[Emma] put the [keys] on the [table] next to the [window]." }
    ] },
    { type: "fyll", tittel: "Write the plural", instruks: "Write the plural form of the noun in brackets.", oppgaver: [
      { s: "There are three ___ in the box.", hint: "box", svar: ["boxes"] },
      { s: "The ___ are playing in the garden.", hint: "child", svar: ["children"] },
      { s: "I have read all the ___ in this book.", hint: "story", svar: ["stories"] },
      { s: "Brush your ___ before you go to bed.", hint: "tooth", svar: ["teeth"] },
      { s: "We need two sharp ___ to cut the bread.", hint: "knife", svar: ["knives"] },
      { s: "Many ___ live in big cities.", hint: "person", svar: ["people", "persons"] },
      { s: "The ___ are falling from the trees.", hint: "leaf", svar: ["leaves"] },
      { s: "There were ten ___ in the field.", hint: "sheep", svar: ["sheep"] },
      { s: "We visited many old ___ in Italy.", hint: "church", svar: ["churches"] },
      { s: "The cat caught two ___.", hint: "mouse", svar: ["mice"] },
      { s: "We eat a lot of ___ in Norway.", hint: "potato", svar: ["potatoes"] },
      { s: "The ___ were playing football.", hint: "boy", svar: ["boys"] }
    ] },
    { type: "sorter", tittel: "Countable or uncountable?", instruks: "Is the noun **countable** (can have a plural) or **uncountable** (no plural)?", kategorier: ["Countable", "Uncountable"], ord: [
      ["chair", 0], ["information", 1], ["apple", 0], ["advice", 1], ["homework", 1], ["student", 0], ["water", 1], ["idea", 0], ["furniture", 1], ["news", 1], ["country", 0], ["money", 1], ["coin", 0], ["music", 1]
    ] },
    { type: "sorter", tittel: "Common or proper noun?", instruks: "Is the noun a **common noun** or a **proper noun** (a name that needs a capital letter)?", kategorier: ["Common noun", "Proper noun"], ord: [
      ["city", 0], ["Paris", 1], ["girl", 0], ["Monday", 1], ["river", 0], ["the Nile", 1], ["language", 0], ["English", 1], ["holiday", 0], ["Christmas", 1], ["planet", 0], ["Mars", 1]
    ] },
    { type: "mc", tittel: "Choose the right form", oppgaver: [
      { s: "The news ___ very sad today.", valg: ["is", "are"], forklaring: "*News* is uncountable, so it takes a singular verb: *is*." },
      { s: "Can you give me some ___?", valg: ["advice", "advices", "an advice"], forklaring: "*Advice* is uncountable: *some advice* or *a piece of advice*." },
      { s: "Which sentence is correct?", valg: ["We have English on Monday.", "We have english on monday.", "We have English on monday."], forklaring: "Languages and days need a capital letter in English." },
      { s: "This is my ___ bedroom.", valg: ["brother's", "brothers", "brothers's"], forklaring: "One brother owns the bedroom: *my brother's bedroom*." },
      { s: "The ___ changing room is over there.", valg: ["girls'", "girl's", "girls"], forklaring: "Many girls share the changing room: *the girls'* (plural + apostrophe)." },
      { s: "My homework ___ finished!", valg: ["is", "are"], forklaring: "*Homework* is uncountable: *is*." },
      { s: "We need some new ___ for the living room.", valg: ["furniture", "furnitures", "a furniture"], forklaring: "*Furniture* is uncountable and has no plural." },
      { s: "I saw two ___ at the zoo.", valg: ["giraffes", "giraffe's", "giraffies"], forklaring: "A normal plural has no apostrophe: *giraffes*." }
    ] }
  ],
  oppgaver: [
    "Describe your bedroom or your classroom in 5–6 sentences. Underline all the nouns. Try to use at least three plural nouns.",
    "Write five abstract nouns (ideas or feelings) and use each of them in a sentence. Example: *Freedom is important to me.*",
    "Write a short text about your family or your friends. Use the genitive at least four times, for example *my mum's car* or *my friends' names*."
  ],
  se: ["pronouns", "articles", "adjectives"]
};
