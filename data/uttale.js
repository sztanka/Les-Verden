/* =========================================================
   Les verden – Pronunciation for Norwegians (uttale.html)
   lyder: hver lyd har forklaring, eksempelord og minimale par [ordA, ordB].
   Opplesingen bruker nettleserens talesyntese.
   ========================================================= */
window.LV = window.LV || {};
LV.uttale = {
  lyder: [
    { id: "th1", tegn: "θ", navn: "th as in *think*", tips: "Legg tungespissen lett mellom tennene og blås luft ut – uten stemme. Ikke si *t* eller *s*.", ord: ["think", "three", "thank you", "birthday", "mouth", "north"], par: [["think", "sink"], ["three", "tree"], ["thin", "tin"], ["mouth", "mouse"], ["path", "pass"]] },
    { id: "th2", tegn: "ð", navn: "th as in *this*", tips: "Samme munnstilling som i *think*, men med stemme – det skal surre litt. Ikke si *d*.", ord: ["this", "the", "mother", "weather", "together", "they"], par: [["they", "day"], ["then", "den"], ["though", "dough"], ["breathe", "breeze"]] },
    { id: "w", tegn: "w", navn: "w as in *wine*", tips: "Rund leppene som når du sier *u*, og åpne dem raskt. Tennene skal ikke røre leppa – da blir det *v*.", ord: ["water", "we", "window", "weather", "twelve", "Wednesday"], par: [["wine", "vine"], ["west", "vest"], ["wet", "vet"], ["worse", "verse"], ["wail", "veil"]] },
    { id: "z", tegn: "z", navn: "z as in *zoo* and *is*", tips: "En *s* med stemme – det surrer som en bie. Mange engelske *s*-er uttales slik, for eksempel i *is, his, was, music, easy*.", ord: ["zoo", "is", "his", "music", "easy", "dogs"], par: [["zoo", "Sue"], ["eyes", "ice"], ["prize", "price"], ["his", "hiss"], ["lose", "loose"]] },
    { id: "dj", tegn: "dʒ", navn: "j as in *jam*", tips: "Engelsk *j* er ikke norsk *j*. Den høres ut som *dsj*: *jam* = *dsjæm*.", ord: ["jam", "juice", "job", "jump", "orange", "village"], par: [["jam", "yam"], ["joke", "yolk"], ["jet", "yet"], ["Jew", "you"]] },
    { id: "ch", tegn: "tʃ / ʃ", navn: "ch as in *cheap* and sh as in *ship*", tips: "*ch* er *tsj* (*cheap*), *sh* er en myk *sj*-lyd (*ship*). Hold dem fra hverandre.", ord: ["cheap", "chips", "watch", "ship", "shoe", "wash"], par: [["cheap", "sheep"], ["chair", "share"], ["watch", "wash"], ["chip", "ship"], ["cheese", "she's"]] },
    { id: "slutt", tegn: "b d g v z", navn: "voiced sounds at the end of words", tips: "På engelsk er det forskjell på *bed* og *bet*. Ikke gjør *d, b, g, v, z* til *t, p, k, f, s* på slutten av ord. Lyden før blir dessuten litt lengre.", ord: ["bed", "dog", "five", "has", "rib", "bag"], par: [["bed", "bet"], ["bag", "back"], ["leave", "leaf"], ["rib", "rip"], ["card", "cart"]] },
    { id: "i", tegn: "ɪ / iː", navn: "short i and long ee", tips: "*ship* har kort, slapp *i*. *sheep* har lang, stram *ii*. Forskjellen endrer betydningen.", ord: ["ship", "sheep", "live", "leave", "fill", "feel"], par: [["ship", "sheep"], ["live", "leave"], ["fill", "feel"], ["sit", "seat"], ["bin", "bean"]] },
    { id: "ae", tegn: "æ / e", navn: "a as in *bad* and e as in *bed*", tips: "*bad* uttales med en åpen *æ*. *bed* har en mer lukket *e*.", ord: ["bad", "man", "cat", "bed", "men", "pen"], par: [["bad", "bed"], ["man", "men"], ["sat", "set"], ["pan", "pen"], ["had", "head"]] }
  ],

  trykk: [
    { ord: "photograph", stavelser: ["pho", "to", "graph"], trykk: 0 },
    { ord: "photography", stavelser: ["pho", "to", "gra", "phy"], trykk: 1 },
    { ord: "important", stavelser: ["im", "por", "tant"], trykk: 1 },
    { ord: "comfortable", stavelser: ["com", "for", "ta", "ble"], trykk: 0 },
    { ord: "development", stavelser: ["de", "vel", "op", "ment"], trykk: 1 },
    { ord: "hotel", stavelser: ["ho", "tel"], trykk: 1 },
    { ord: "banana", stavelser: ["ba", "na", "na"], trykk: 1 },
    { ord: "interesting", stavelser: ["in", "ter", "est", "ing"], trykk: 0 },
    { ord: "Japanese", stavelser: ["Ja", "pa", "nese"], trykk: 2 },
    { ord: "democracy", stavelser: ["de", "moc", "ra", "cy"], trykk: 1 },
    { ord: "politics", stavelser: ["pol", "i", "tics"], trykk: 0 },
    { ord: "political", stavelser: ["po", "lit", "i", "cal"], trykk: 1 }
  ],
  trykkPar: [
    ["a REcord", "to reCORD"], ["a PREsent", "to preSENT"], ["an OBject", "to obJECT"], ["a PROtest", "to proTEST"], ["an INcrease", "to inCREASE"], ["a CONtract", "to conTRACT"]
  ],

  stumme: [
    ["knife", "k"], ["know", "k"], ["write", "w"], ["wrong", "w"], ["island", "s"], ["listen", "t"], ["castle", "t"], ["Wednesday", "d"], ["climb", "b"], ["doubt", "b"],
    ["hour", "h"], ["honest", "h"], ["psychology", "p"], ["half", "l"], ["walk", "l"], ["foreign", "g"], ["sign", "g"], ["answer", "w"]
  ],

  vanskelige: [
    ["comfortable", "KUMF-tuh-bul – tre stavelser"], ["vegetable", "VEDJ-tuh-bul"], ["clothes", "rimer på *goes*"], ["chaos", "KAY-oss"], ["recipe", "RESS-i-pee"],
    ["Wednesday", "WENZ-day"], ["determine", "di-TUR-min"], ["suite", "som *sweet*"], ["receipt", "ri-SEET – ingen p"], ["women", "WIM-in"], ["colonel", "som *kernel*"], ["queue", "som bokstaven *Q*"],
    ["Leicester", "LESS-ter"], ["genre", "ZHON-ruh"], ["iron", "AI-ern"], ["laugh", "LAAF"]
  ],

  aksentord: [
    { ord: "water", tekst: "Would you like some water?", forskjell: "Britisk: *t* uttales tydelig. Amerikansk: *t* blir nesten en *d* (*wadder*)." },
    { ord: "tomato", tekst: "I need a tomato for the salad.", forskjell: "Britisk: *to-MAH-to*. Amerikansk: *to-MAY-to*." },
    { ord: "can't", tekst: "I can't come tonight.", forskjell: "Britisk: lang *a* (*kaant*). Amerikansk: kort *æ* (*kænt*)." },
    { ord: "car", tekst: "Park the car in the garage.", forskjell: "Britisk: *r* uttales ikke etter vokal. Amerikansk: tydelig *r*." },
    { ord: "schedule", tekst: "What is the schedule for today?", forskjell: "Britisk: *SHED-yool*. Amerikansk: *SKED-jool*." },
    { ord: "garage", tekst: "The bike is in the garage.", forskjell: "Britisk: *GA-ridzj*. Amerikansk: *ga-RAZJ*." }
  ]
};
