window.LV = window.LV || {};
LV.grammatikk = {
  id: "norwegian-errors",
  tittel: "Typical mistakes Norwegians make",
  norskNavn: "typiske feil nordmenn gjør på engelsk",
  ikon: "🇳🇴",
  ingress: "Norwegian and English are related languages, so many words and structures are similar. That is a big help – but it also creates traps. Here are the mistakes examiners see most often in texts written by Norwegian students, and how to avoid them.",
  forklaring: [
    "**False friends** are words that look like Norwegian words but mean something else. *Eventually* means *til slutt*, not *eventuelt* (= *possibly*). *Actually* means *faktisk*, not *aktuelt* (= *relevant*). *Sensible* means *fornuftig*, not *sensibel* (= *sensitive*). *Become* means *bli* (= change into), not *få* (= *get*).",
    "**Uncountable nouns:** Some nouns have no plural in English: *information, advice, homework, furniture, equipment, news, knowledge*. ~~*informations*~~ → *information*, ~~*an advice*~~ → *a piece of advice / some advice*.",
    "**much / many:** *Many* with things you can count (*many books*), *much* with things you cannot count (*much time*). In positive sentences, *a lot of* is more natural: *I have a lot of homework.*",
    "**Present perfect or past?** When you say **when** something happened, use the past simple: ~~*I have been in London last year*~~ → *I **went** to London last year.* The present perfect is used **without** a finished time: *I **have been** to London.*",
    "**Small words:** *I agree* (not ~~*I am agree*~~), *in the picture* (not ~~*on the picture*~~), *married **to*** (not ~~*married with*~~), *depend **on*** (not ~~*depend of*~~), *listen **to** music*.",
    "**Word pairs:** *learn* (lære selv) / *teach* (lære bort): *My teacher **taught** me.* *borrow* (låne av) / *lend* (låne ut): *Can you **lend** me a pen?* *since* (siden et tidspunkt) / *for* (i en periode): *since 2020, for three years*."
  ],
  norsk: "Mange av disse feilene kommer av at vi oversetter direkte fra norsk. Et godt råd: Når du er usikker på et ord som ligner et norsk ord, slå det opp i en ordbok og se på eksempelsetningene. Og lær de vanligste «felleordene» utenat – de dukker opp i nesten alle tekster.",
  husk: [
    "eventually = til slutt · actually = faktisk · sensible = fornuftig.",
    "information, advice, homework, news → never with -s.",
    "Past time (yesterday, last year, in 2020) → past simple.",
    "I agree · in the picture · married to · depend on.",
    "learn ≠ teach · borrow ≠ lend · since ≠ for."
  ],
  tabeller: [
    { tittel: "False friends", kolonner: ["English word", "means", "Norwegian word", "in English"], rader: [
      ["eventually", "til slutt", "eventuelt", "possibly, if necessary"],
      ["actually", "faktisk", "aktuell", "relevant, current"],
      ["sensible", "fornuftig", "sensibel", "sensitive"],
      ["become", "bli", "bekomme (få)", "get, receive"],
      ["fabric", "stoff", "fabrikk", "factory"],
      ["gift", "gave", "gift", "married / poison"],
      ["chef", "kokk", "sjef", "boss"],
      ["exited", "gikk ut", "spent", "excited"]
    ] },
    { tittel: "Small words that are often wrong", kolonner: ["Wrong", "Right"], rader: [
      ["~~I am agree~~", "I agree"],
      ["~~on the picture~~", "in the picture"],
      ["~~I have been in London last year~~", "I went to London last year"],
      ["~~informations / advices~~", "information / advice"],
      ["~~He learned me to swim~~", "He taught me to swim"],
      ["~~Can I lend your pen?~~", "Can I borrow your pen?"],
      ["~~I have lived here since three years~~", "I have lived here for three years"],
      ["~~the most of the students~~", "most of the students / most students"]
    ] }
  ],
  sammenlign: [
    { tittel: "Direkte oversatt – og riktig", tekst: "Venstre kolonne er norsk. Til høyre står den riktige engelske versjonen.", eks: [["Jeg er enig.", "I agree."], ["Det kommer an på været.", "It depends **on** the weather."], ["Hun er gift med en lege.", "She is married **to** a doctor."], ["Jeg har bodd her i tre år.", "I have lived here **for** three years."], ["De fleste elevene", "**Most** students / **most of** the students"]] }
  ],
  ovelser: [
    { type: "mc", tittel: "False friends", oppgaver: [
      { s: "We waited for hours, but ___ the bus came.", valg: ["eventually", "possibly", "actually"], forklaring: "*Eventually* = til slutt." },
      { s: "That was a very ___ decision – well done!", valg: ["sensible", "sensitive", "sensational"], forklaring: "*Sensible* = fornuftig." },
      { s: "Bring your swimsuit, ___ a towel.", valg: ["and possibly", "and eventually", "and actually"], forklaring: "*Eventuelt* = *possibly*." },
      { s: "My uncle works in a car ___.", valg: ["factory", "fabric", "fabrication"], forklaring: "*Fabrikk* = *factory*. *Fabric* = stoff." },
      { s: "I was so ___ about the trip that I couldn't sleep.", valg: ["excited", "exited", "exciting"], forklaring: "*Excited* = spent, ivrig. *Exited* = gikk ut." }
    ] },
    { type: "fyll", tittel: "Fix the small words", instruks: "Write the missing word.", oppgaver: [
      { s: "It depends ___ the weather.", svar: ["on"] },
      { s: "She is married ___ a teacher.", svar: ["to"] },
      { s: "I have lived in Norway ___ ten years.", svar: ["for"] },
      { s: "I have lived in Norway ___ 2015.", svar: ["since"] },
      { s: "Look at the man ___ the picture.", svar: ["in"] },
      { s: "My grandmother ___ me how to knit. (lærte)", svar: ["taught"] },
      { s: "Could you ___ me your charger? (låne meg)", svar: ["lend"] }
    ] },
    { type: "sorter", tittel: "Countable or uncountable?", instruks: "Can you put *a* in front of the word and make it plural?", kategorier: ["Countable (a book, books)", "Uncountable (no a, no -s)"], ord: [
      ["information", 1], ["chair", 0], ["advice", 1], ["homework", 1], ["suggestion", 0], ["furniture", 1], ["idea", 0], ["news", 1], ["tip", 0], ["equipment", 1]
    ] }
  ],
  oppgaver: [
    "Make your own list of five words or expressions you often get wrong. Write a correct example sentence for each.",
    "Write a short text about your last holiday. Use the past simple every time you say when something happened.",
    "Swap texts with a partner. Look only for the mistakes on this page. How many can you find?"
  ],
  se: ["agreement", "punctuation", "editing"]
};
