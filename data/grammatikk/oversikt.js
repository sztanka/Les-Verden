/* Grammar and vocabulary – oversikt. Hvert emne har en egen fil: data/grammatikk/<id>.js */
window.LV = window.LV || {};
LV.grammatikkGrupper = [
  {
    id: "partsofspeech",
    tittel: "Parts of speech",
    norsk: "Ordklasser",
    ikon: "🧩",
    plakat: true,
    ingress: "Every word in a sentence has a job. We sort words into **parts of speech** (ordklasser) according to the job they do. Knowing the parts of speech helps you build correct sentences – and it makes it much easier to talk about grammar. Click a card to learn more.",
    emner: ["nouns", "adjectives", "verbs", "pronouns", "articles", "adverbs", "prepositions", "conjunctions", "interjections"],
    setning: [["Wow!", "interjections"], ["The", "articles"], ["clever", "adjectives"], ["girl", "nouns"], ["quickly", "adverbs"], ["found", "verbs"], ["an", "articles"], ["old", "adjectives"], ["map,", "nouns"],
      ["and", "conjunctions"], ["she", "pronouns"], ["followed", "verbs"], ["it", "pronouns"], ["into", "prepositions"], ["the", "articles"], ["dark", "adjectives"], ["forest.", "nouns"]],
    quiz: { tittel: "Quick quiz: Which part of speech?", oppgaver: [
      { s: "«The **dog** barked all night.» – *dog* is a …", valg: ["noun", "verb", "adjective"], forklaring: "*Dog* names an animal (a thing): it is a noun." },
      { s: "«She **sings** beautifully.» – *sings* is a …", valg: ["verb", "adverb", "noun"], forklaring: "*Sings* tells us what she does: it is a verb." },
      { s: "«She sings **beautifully**.» – *beautifully* is an …", valg: ["adverb", "adjective", "interjection"], forklaring: "*Beautifully* tells us **how** she sings: it is an adverb." },
      { s: "«We had a **delicious** dinner.» – *delicious* is an …", valg: ["adjective", "adverb", "article"], forklaring: "*Delicious* describes the noun *dinner*: it is an adjective." },
      { s: "«**They** live in Bergen.» – *they* is a …", valg: ["pronoun", "noun", "preposition"], forklaring: "*They* is used instead of the names of the people: it is a pronoun." },
      { s: "«The cat is **under** the table.» – *under* is a …", valg: ["preposition", "conjunction", "adverb"], forklaring: "*Under* shows where the cat is in relation to the table: it is a preposition." },
      { s: "«I was tired, **but** I finished my homework.» – *but* is a …", valg: ["conjunction", "preposition", "pronoun"], forklaring: "*But* joins two parts of the sentence: it is a conjunction." },
      { s: "«**Ouch!** That hurt!» – *ouch* is an …", valg: ["interjection", "adverb", "adjective"], forklaring: "*Ouch* shows a sudden feeling (pain): it is an interjection." },
      { s: "«I ate **an** apple.» – *an* is an …", valg: ["article", "pronoun", "adjective"], forklaring: "*A*, *an* and *the* are articles." },
      { s: "«**Happiness** is important.» – *happiness* is a …", valg: ["noun", "adjective", "verb"], forklaring: "*Happiness* is the name of a feeling (an idea): it is an abstract noun." }
    ] }
  },
  {
    id: "lookalikes",
    tittel: "Words that look or sound alike",
    norsk: "Ord som ser like ut eller høres like ut",
    ikon: "👯",
    ingress: "English has many words that are spelled the same or pronounced the same – but mean different things. Knowing the names of these word groups helps you talk about language, and knowing the words themselves helps you avoid common spelling mistakes.",
    emner: ["homophones", "homographs", "homonyms", "heteronyms", "heterographs"]
  }
];
LV.grammatikkListe = [
  { id: "nouns", tittel: "Nouns", entall: "a noun", ikon: "🏷️", farge: "#7b3fa0", kort: "A noun names a person, place, thing or idea.", norsk: "Substantiv", eks: [["Person", "girl, teacher, Nora"], ["Place", "school, London, home"], ["Thing / idea", "book, dog, happiness"]] },
  { id: "adjectives", tittel: "Adjectives", entall: "an adjective", ikon: "🎨", farge: "#1a4a9c", kort: "An adjective describes a noun or a pronoun: what kind, how many or which one.", norsk: "Adjektiv", eks: [["What kind", "happy, big, blue"], ["How many", "two, many, few"], ["Which one", "this, that, last"]] },
  { id: "verbs", tittel: "Verbs", entall: "a verb", ikon: "🏃", farge: "#0e7c7b", kort: "A verb tells what someone or something does, or what someone or something is.", norsk: "Verb", eks: [["Action", "run, think, write"], ["State of being", "am, is, were"], ["Helping", "have, can, will"]] },
  { id: "pronouns", tittel: "Pronouns", entall: "a pronoun", ikon: "👥", farge: "#3d7f2f", kort: "A pronoun takes the place of a noun, so we don't have to repeat it.", norsk: "Pronomen", eks: [["Subject", "I, she, they"], ["Object", "me, her, them"], ["Possessive", "mine, hers, theirs"]] },
  { id: "articles", tittel: "Articles and determiners", entall: "an article / determiner", ikon: "🔑", farge: "#e2b007", morkTekst: true, kort: "Articles and determiners come before a noun and tell us which one or how many.", norsk: "Artikler og determinativer", eks: [["Articles", "a, an, the"], ["Pointing", "this, those"], ["Amount", "some, many, every"]] },
  { id: "adverbs", tittel: "Adverbs", entall: "an adverb", ikon: "⏱️", farge: "#c0520f", kort: "An adverb describes a verb, an adjective or another adverb: how, when, where or how much.", norsk: "Adverb", eks: [["How", "quickly, well"], ["When / how often", "today, always"], ["Where / how much", "outside, very"]] },
  { id: "prepositions", tittel: "Prepositions", entall: "a preposition", ikon: "📍", farge: "#0277bd", kort: "A preposition shows how a noun or pronoun is related to other words – often in place or time.", norsk: "Preposisjoner", eks: [["Place", "in, on, under"], ["Time", "at, before, until"], ["Movement", "to, through, into"]] },
  { id: "conjunctions", tittel: "Conjunctions", entall: "a conjunction", ikon: "🔗", farge: "#c62828", kort: "A conjunction joins words, phrases or sentences together.", norsk: "Konjunksjoner og subjunksjoner", eks: [["Join equals", "and, but, or, so"], ["Give reasons", "because, since"], ["Time / condition", "when, if, although"]] },
  { id: "interjections", tittel: "Interjections", entall: "an interjection", ikon: "💥", farge: "#6a4fb3", kort: "An interjection shows a strong feeling or a sudden reaction.", norsk: "Interjeksjoner", eks: [["Pain / disgust", "Ouch! Yuck!"], ["Surprise / joy", "Wow! Hooray!"], ["Relief / mistakes", "Phew! Oops!"]] },
  { id: "homophones", tittel: "Homophones", ikon: "👂", kort: "Words that sound the same but have different meanings – like their, there and they're.", norsk: "Ord som uttales likt, men betyr noe forskjellig" },
  { id: "homographs", tittel: "Homographs", ikon: "✍️", kort: "Words that are spelled the same but have different meanings – like bat and lead.", norsk: "Ord som skrives likt, men betyr noe forskjellig" },
  { id: "homonyms", tittel: "Homonyms", ikon: "🦇", kort: "Words that are spelled and pronounced the same but have different meanings – like bank and bear.", norsk: "Ord som skrives og uttales likt, men betyr noe forskjellig" },
  { id: "heteronyms", tittel: "Heteronyms", ikon: "🎭", kort: "Words that are spelled the same but pronounced differently – like tear and tear, or record and record.", norsk: "Ord som skrives likt, men uttales forskjellig og betyr noe forskjellig" },
  { id: "heterographs", tittel: "Heterographs", ikon: "🔀", kort: "Words that sound the same but are spelled differently – like knight and night.", norsk: "Ord som uttales likt, men skrives forskjellig og betyr noe forskjellig" }
];
