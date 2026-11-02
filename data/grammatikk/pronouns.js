window.LV = window.LV || {};
LV.grammatikk = {
  id: "pronouns",
  tittel: "Pronouns",
  norskNavn: "pronomen",
  ikon: "👥",
  ingress: "A pronoun is a word we use instead of a noun, so that we don't have to repeat the same word again and again.",
  forklaring: [
    "Without pronouns, we would have to say: *Emma lost Emma's phone, so Emma asked Emma's mum to help Emma.* With pronouns, we say: *Emma lost **her** phone, so **she** asked **her** mum to help **her**.*",
    "**Personal pronouns** stand for people and things. They have one form when they are the **subject** (the one who does something: *I, he, she, we, they*) and another form when they are the **object** (the one something happens to: *me, him, her, us, them*).",
    "**Possessive** words show who owns something. Some come before a noun (*my, your, his, her, its, our, their*), and some stand alone (*mine, yours, his, hers, ours, theirs*): *This is **my** bag. – This bag is **mine**.*",
    "**Reflexive pronouns** end in *-self* or *-selves*: *I hurt **myself**. They enjoyed **themselves**.*",
    "Other pronouns: **demonstrative** (*this, that, these, those*), **question words** (*who, what, which, whose*), **relative pronouns** that link sentences (*who, which, that*), and **indefinite pronouns** (*someone, anything, nobody, everything*)."
  ],
  norsk: "Pronomen brukes i stedet for substantiv, akkurat som på norsk (*jeg, meg, min, seg*). Viktige forskjeller: 1) *I* (jeg) skrives **alltid med stor bokstav**. 2) *You* betyr både *du, deg, dere* og *De*. 3) Engelsk har **ikke** *sin/sitt/sine*. Da bruker vi *his, her, its* eller *their*. 4) Ting og dyr er *it*, ikke *he* eller *she*. 5) Mange norske verb med *seg* er ikke refleksive på engelsk: *Jeg gleder meg* = *I'm looking forward to it*.",
  husk: [
    "**Subject** before the verb, **object** after the verb or preposition: ***She** likes **him**. **He** sat next to **her**.*",
    "Be polite – put yourself last: *My friend and **I** went to the cinema. Mum called my brother and **me**.*",
    "*Its* (no apostrophe) = belonging to it. *It's* = it is.",
    "Use *who* for people and *which* for things. *That* can be used for both."
  ],
  tabeller: [
    { tittel: "Personal pronouns, possessives and reflexives", kolonner: ["Subject", "Object", "Possessive + noun", "Possessive alone", "Reflexive", "Norsk"], rader: [
      ["I", "me", "my", "mine", "myself", "jeg – meg – min/mitt/mine – meg selv"],
      ["you", "you", "your", "yours", "yourself", "du – deg – din/ditt/dine – deg selv"],
      ["he", "him", "his", "his", "himself", "han – ham/han – hans/sin – seg selv"],
      ["she", "her", "her", "hers", "herself", "hun – henne – hennes/sin – seg selv"],
      ["it", "it", "its", "–", "itself", "den/det – den/det – dens/dets/sin – seg selv"],
      ["we", "us", "our", "ours", "ourselves", "vi – oss – vår/vårt/våre – oss selv"],
      ["you", "you", "your", "yours", "yourselves", "dere – dere – deres – dere selv"],
      ["they", "them", "their", "theirs", "themselves", "de – dem – deres/sin – seg selv"]
    ], note: "Example: ***I** gave **him** **my** book, and he gave **me** **his**. We did it **ourselves**.*" },
    { tittel: "Other kinds of pronouns", kolonner: ["Kind", "Pronouns", "Example"], rader: [
      ["Demonstrative (pointing)", "this, that, these, those", "*This is my bike. Those are your shoes.*"],
      ["Interrogative (questions)", "who, whom, what, which, whose", "*Who is that? Whose bag is this?*"],
      ["Relative (linking)", "who, which, that, whose", "*The girl **who** won is my cousin. The book **that** I read was great.*"],
      ["Indefinite", "someone, anyone, no one, everyone, something, anything, nothing, everything", "*Someone is at the door. I didn't see anything.*"],
      ["Reciprocal (each other)", "each other, one another", "*They looked at **each other**.* (hverandre)"]
    ] },
    { tittel: "Who, which or that?", kolonner: ["Word", "Used for", "Example"], rader: [
      ["who", "people", "*the boy **who** lives next door*"],
      ["which", "things and animals", "*the film **which** we saw*"],
      ["that", "people, things and animals (informal)", "*the boy **that** lives next door, the film **that** we saw*"],
      ["whose", "belonging to (people and things)", "*the girl **whose** dog ran away*"]
    ] }
  ],
  sammenlign: [
    { tittel: "*Sin, si, sitt, sine* finnes ikke", tekst: "Norsk skiller mellom *sin* (eier er subjektet) og *hans/hennes* (en annen eier). Engelsk bruker *his, her, its, their* i begge tilfeller.", eks: [["Han tok **sin** bok.", "He took **his** book."], ["Hun ringte **sin** mor.", "She called **her** mother."], ["De vasket **sine** biler.", "They washed **their** cars."]] },
    { tittel: "*You* = du, deg, dere", tekst: "Engelsk har bare ett ord for *du/deg/dere*. Bare de refleksive formene skiller mellom én og flere: *yourself* og *yourselves*.", eks: [["Ser **du** meg?", "Can **you** see me?"], ["Jeg ser **dere**.", "I can see **you**."], ["Kos **dere**!", "Enjoy **yourselves**!"]] },
    { tittel: "Norske verb med *seg*", tekst: "Mange norske verb har *seg*, men ikke på engelsk. Ikke oversett *seg* automatisk!", eks: [["Jeg **gleder meg** til ferien.", "I'm **looking forward to** the holiday."], ["Hun **føler seg** trøtt.", "She **feels** tired."], ["Vi må **skynde oss**.", "We must **hurry**."], ["**Sett deg** ned!", "**Sit down**!"], ["Han **ombestemte seg**.", "He **changed his mind**."], ["Jeg **slo meg**.", "I **hurt myself**."]] },
    { tittel: "*It* om ting og dyr", tekst: "På norsk sier vi ofte *han* eller *hun* om ting (*bilen – han er ny*). På engelsk er ting og dyr *it*. Kjæledyr kan likevel være *he* eller *she*.", eks: [["Hvor er bilen? **Den** står ute.", "Where is the car? **It**'s outside."], ["Katten vår heter Pus. **Hun** er tre år.", "Our cat is called Pus. **She**'s three. (kjæledyr)"]] },
    { tittel: "*I* med stor bokstav", tekst: "*I* (jeg) skrives alltid med stor bokstav, også midt i en setning: *Yesterday **I** went home.* Det gjelder ikke *me, my* eller *mine*." }
  ],
  ovelser: [
    { type: "fyll", tittel: "Subject or object?", instruks: "Write the correct form of the pronoun in brackets.", oppgaver: [
      { s: "Can you help ___ with my homework?", hint: "I", svar: ["me"] },
      { s: "___ are going to the cinema tonight.", hint: "we", svar: ["We"] },
      { s: "I saw Tom yesterday and talked to ___.", hint: "he", svar: ["him"] },
      { s: "My sister is nice. I like ___ a lot.", hint: "she", svar: ["her"] },
      { s: "Our neighbours are on holiday. We are feeding the cat for ___.", hint: "they", svar: ["them"] },
      { s: "The teacher gave ___ a lot of homework.", hint: "we", svar: ["us"] },
      { s: "My friend and ___ played football after school.", hint: "I", svar: ["I"], forklaring: "*My friend and I* is the subject of the sentence." },
      { s: "Dad drove my brother and ___ to school.", hint: "I", svar: ["me"], forklaring: "*My brother and me* is the object of *drove*." }
    ] },
    { type: "mc", tittel: "Possessives", oppgaver: [
      { s: "Is this ___ pen or mine?", valg: ["your", "yours", "you"], forklaring: "Before a noun (*pen*), use *your*." },
      { s: "This pen isn't mine. I think it's ___.", valg: ["yours", "your", "you's"], forklaring: "Without a noun after it, use *yours*." },
      { s: "Nora loves ___ dog.", valg: ["her", "hers", "its"], forklaring: "The dog belongs to Nora: *her dog*. (Norsk: *sin hund*.)" },
      { s: "The tree has lost all ___ leaves.", valg: ["its", "it's", "his"], forklaring: "Belonging to the tree: *its* (no apostrophe)." },
      { s: "The students forgot ___ books.", valg: ["their", "there", "theirs"], forklaring: "Before a noun: *their books*." },
      { s: "That house is ___. We bought it last year.", valg: ["ours", "our", "us"], forklaring: "Standing alone: *ours*." }
    ] },
    { type: "fyll", tittel: "Reflexive pronouns", instruks: "Write the correct reflexive pronoun: *myself, yourself, himself, herself, itself, ourselves, yourselves, themselves*.", oppgaver: [
      { s: "Be careful with the knife! Don't cut ___.", svar: ["yourself"] },
      { s: "We painted the room ___.", svar: ["ourselves"] },
      { s: "The children enjoyed ___ at the party.", svar: ["themselves"] },
      { s: "She taught ___ to play the guitar.", svar: ["herself"] },
      { s: "I made this cake ___!", svar: ["myself"] },
      { s: "He looked at ___ in the mirror.", svar: ["himself"] },
      { s: "Help ___ to some food, everyone!", svar: ["yourselves"] }
    ] },
    { type: "mc", tittel: "Who, which or whose?", oppgaver: [
      { s: "The woman ___ lives next door is a doctor.", valg: ["who", "which", "whose"], forklaring: "People: *who* (or *that*)." },
      { s: "This is the bike ___ I got for my birthday.", valg: ["which", "who", "whose"], forklaring: "Things: *which* (or *that*)." },
      { s: "That's the boy ___ mother is my teacher.", valg: ["whose", "who", "which"], forklaring: "*Whose* = belonging to him." },
      { s: "___ is your favourite singer?", valg: ["Who", "Which", "Whose"], forklaring: "We ask about a person: *who*." }
    ] },
    { type: "finn", tittel: "Find the pronouns", instruks: "Click on all the **pronouns** (including possessives like *my* and *mine*).", oppgaver: [
      { s: "[She] gave [me] [her] phone number." },
      { s: "[We] did the project [ourselves]." },
      { s: "Is [this] bag [yours] or [mine]?" },
      { s: "[They] invited [us] to [their] party." },
      { s: "[Someone] left [it] on the bus." }
    ] }
  ],
  oppgaver: [
    "Write a short text (5–6 sentences) about a friend without using pronouns. Then rewrite it with pronouns. Which text is better – and why?",
    "Translate into English: *Hun tok sin jakke. Han hjalp sin søster. Vi gleder oss til helgen. Sett dere ned!*",
    "Write five sentences with *who*, *which* or *whose* about people and things in your class."
  ],
  se: ["nouns", "articles", "verbs"]
};
