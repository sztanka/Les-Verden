/* Grammar and vocabulary – oversikt. Hvert emne har en egen fil: data/grammatikk/<id>.js */
window.LV = window.LV || {};
LV.grammatikkGrupper = [
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
  { id: "homophones", tittel: "Homophones", ikon: "👂", kort: "Words that sound the same but have different meanings – like their, there and they're.", norsk: "Ord som uttales likt, men betyr noe forskjellig" },
  { id: "homographs", tittel: "Homographs", ikon: "✍️", kort: "Words that are spelled the same but have different meanings – like bat and lead.", norsk: "Ord som skrives likt, men betyr noe forskjellig" },
  { id: "homonyms", tittel: "Homonyms", ikon: "🦇", kort: "Words that are spelled and pronounced the same but have different meanings – like bank and bear.", norsk: "Ord som skrives og uttales likt, men betyr noe forskjellig" },
  { id: "heteronyms", tittel: "Heteronyms", ikon: "🎭", kort: "Words that are spelled the same but pronounced differently – like tear and tear, or record and record.", norsk: "Ord som skrives likt, men uttales forskjellig og betyr noe forskjellig" },
  { id: "heterographs", tittel: "Heterographs", ikon: "🔀", kort: "Words that sound the same but are spelled differently – like knight and night.", norsk: "Ord som uttales likt, men skrives forskjellig og betyr noe forskjellig" }
];
