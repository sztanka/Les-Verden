window.LV = window.LV || {};
LV.grammatikk = {
  id: "word-order",
  tittel: "Word order",
  norskNavn: "ordstilling",
  ikon: "🔀",
  ingress: "In English, the subject comes before the verb – almost always. This is the rule Norwegians break most often, because Norwegian works differently. Learn the rule, and your English will sound much better at once.",
  forklaring: [
    "The basic order of an English statement is **subject – verb – object – adverbial**: *I (S) played (V) football (O) yesterday (A).*",
    "If you start with an adverbial like *yesterday, today, in 2020* or *at school*, the order **does not change**: ***Yesterday** I played football* – not ~~*Yesterday played I football*~~. This is the biggest difference from Norwegian.",
    "Adverbials usually go at the **end** or at the **beginning** – **not** between the verb and the object: *I like football **very much*** – not ~~*I like very much football*~~.",
    "**Frequency adverbs** (*always, often, never …*) go **before** the main verb, but **after** *be*: *I **often** read. She is **always** late.*",
    "In **questions**, we put a helping verb in front of the subject: ***Do** you like tea? **Did** she call? **Have** you seen it? **Is** he coming?* If there is no helping verb, use *do / does / did*.",
    "**Not** goes after the first helping verb: *I **do not** (don't) like it. She **has not** (hasn't) finished.* – not ~~*I like not it*~~.",
    "Place before time: *We arrived **at the hotel** (where) **at nine** (when).*"
  ],
  norsk: "På norsk har vi **V2-regelen**: verbet står alltid på plass nummer to. Begynner setningen med *I går*, kommer verbet før subjektet: *I går **spilte jeg** fotball.* På engelsk gjelder **ikke** denne regelen. Subjektet kommer foran verbet uansett hva setningen begynner med: *Yesterday **I played** football.* På norsk lager vi spørsmål ved å snu om subjekt og verb (*Liker du te?*). På engelsk trenger vi et hjelpeverb: ***Do** you like tea?*",
  husk: [
    "**S – V**, always: *Today **I am** tired.* *In Norway **we have** long winters.*",
    "Never put an adverb between the verb and the object: *I speak English **well**.*",
    "Questions: helping verb + subject + main verb: *Does she play? Did you go?*",
    "Negatives: *do / does / did + not + verb*: *I didn't see it.*",
    "Place before time: *I'll meet you **at the café** **at three**.*"
  ],
  tabeller: [
    { tittel: "Norwegian and English word order", kolonner: ["Norsk", "English", "Rule"], rader: [
      ["I går **spilte jeg** fotball.", "Yesterday **I played** football.", "S before V"],
      ["Nå **er vi** ferdige.", "Now **we are** finished.", "S before V"],
      ["Jeg liker **veldig godt** fotball.", "I like football **very much**.", "Not between V and O"],
      ["Jeg spiser **aldri** fisk.", "I **never** eat fish.", "Frequency adverb before main verb"],
      ["**Liker du** te?", "**Do you like** tea?", "Questions with *do*"],
      ["Jeg **liker ikke** te.", "I **don't like** tea.", "*not* with *do*"],
      ["Hvorfor **kom du** for sent?", "Why **did you come** late?", "Question words + *did*"]
    ] },
    { tittel: "Questions", kolonner: ["Statement", "Yes/no question", "Wh- question"], rader: [
      ["*She **plays** tennis.*", "***Does** she **play** tennis?*", "*What **does** she **play**?*"],
      ["*They **went** home.*", "***Did** they **go** home?*", "*When **did** they **go** home?*"],
      ["*He **is** tired.*", "***Is** he tired?*", "*Why **is** he tired?*"],
      ["*You **have** finished.*", "***Have** you finished?*", "*What **have** you finished?*"],
      ["*She **can** swim.*", "***Can** she swim?*", "*How far **can** she swim?*"]
    ], note: "When the question word **is** the subject, we don't use *do*: ***Who** called you?* ***What** happened?*" }
  ],
  sammenlign: [
    { tittel: "V2-regelen gjelder ikke på engelsk", tekst: "Den aller vanligste feilen nordmenn gjør: å sette verbet før subjektet når setningen begynner med et adverbial.", eks: [["I helgen **dro vi** på hytta.", "At the weekend **we went** to the cabin."], ["Derfor **må du** øve.", "That's why **you have to** practise."], ["Etter skolen **spiser jeg** middag.", "After school **I eat** dinner."]] },
    { tittel: "Spørsmål og nektelse med *do*", tekst: "Norsk snur bare subjekt og verb. Engelsk bruker *do, does, did* når det ikke er et annet hjelpeverb.", eks: [["**Snakker du** engelsk?", "**Do you speak** English?"], ["Hun **bor ikke** her.", "She **doesn't live** here."], ["**Så du** filmen?", "**Did you see** the film?"]] }
  ],
  ovelser: [
    { type: "mc", tittel: "Which sentence is correct?", oppgaver: [
      { s: "Yesterday …", valg: ["Yesterday I went to the cinema.", "Yesterday went I to the cinema.", "Yesterday I to the cinema went."], forklaring: "Subject before verb: *Yesterday **I went**.*" },
      { s: "I like …", valg: ["I like music very much.", "I like very much music.", "I very much like music."], forklaring: "Don't put *very much* between the verb and the object. (*I very much like* is possible, but formal.)" },
      { s: "In Norway …", valg: ["In Norway we have long winters.", "In Norway have we long winters.", "In Norway long winters we have."], forklaring: "*In Norway **we have** …*" },
      { s: "Question:", valg: ["Do you play an instrument?", "Play you an instrument?", "You play an instrument?"], forklaring: "Questions need a helping verb: ***Do** you play …?*" },
      { s: "Negative:", valg: ["She doesn't eat meat.", "She eats not meat.", "She not eats meat."], forklaring: "*does + not + eat*: *She **doesn't eat** meat.*" },
      { s: "Place and time:", valg: ["We arrived in London at midnight.", "We arrived at midnight in London.", "At midnight arrived we in London."], forklaring: "Place before time: *in London (where) at midnight (when)*." },
      { s: "Question:", valg: ["Why did you leave early?", "Why you left early?", "Why left you early?"], forklaring: "*Why **did you leave** …?*" },
      { s: "Frequency:", valg: ["He is often tired after school.", "He often is tired after school.", "He is tired often after school."], forklaring: "After *be*: *He **is often** tired.*" }
    ] },
    { type: "fyll", tittel: "Make questions", instruks: "Write the missing helping verb: *do, does, did, is, are, have* or *can*.", oppgaver: [
      { s: "___ you like chocolate?", svar: ["do", "Do"] },
      { s: "___ she live in Oslo?", svar: ["does", "Does"] },
      { s: "___ they win the match yesterday?", svar: ["did", "Did"] },
      { s: "___ you ever been to London?", svar: ["have", "Have"] },
      { s: "Where ___ your parents work?", svar: ["do"] },
      { s: "What ___ he say to you last night?", svar: ["did"] },
      { s: "___ you swim?", svar: ["can", "Can"] }
    ] },
    { type: "fyll", tittel: "Translate – and watch the word order", instruks: "Write the English sentence. Start with the words that are given.", oppgaver: [
      { s: "I går så jeg en film. → Yesterday ___.", svar: ["I saw a film", "I watched a film", "I saw a movie", "I watched a movie"] },
      { s: "Nå er jeg sulten. → Now ___.", svar: ["I am hungry", "I'm hungry"] },
      { s: "Liker du fotball? → ___?", svar: ["Do you like football", "Do you like soccer"] },
      { s: "Han spiller ikke gitar. → He ___.", svar: ["doesn't play the guitar", "does not play the guitar", "doesn't play guitar", "does not play guitar"] },
      { s: "Derfor må vi gå. → That's why ___.", svar: ["we have to go", "we must go", "we have to leave", "we must leave"] }
    ] }
  ],
  oppgaver: [
    "Write about what you did last weekend. Start at least four sentences with a time expression (*On Saturday, In the evening, After that, Finally*). Check that the subject comes before the verb every time!",
    "Write an interview with a famous person: ten questions with *do, does, did, have, can* and question words.",
    "Find a text you have written in English. Look for sentences that start with an adverbial. Is the word order correct?"
  ],
  se: ["sentence-parts", "adverbs", "editing"]
};
