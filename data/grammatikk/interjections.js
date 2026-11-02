window.LV = window.LV || {};
LV.grammatikk = {
  id: "interjections",
  tittel: "Interjections",
  norskNavn: "interjeksjoner",
  ikon: "💥",
  ingress: "An interjection is a word or a short phrase that shows a strong feeling or a sudden reaction – like surprise, pain, joy or disgust.",
  forklaring: [
    "**Interjections** are the «emotion words» of a language: *Wow! Ouch! Oops! Yuck! Hooray!* They show how someone feels, often very quickly.",
    "An interjection is not really part of the grammar of the sentence. It usually stands at the beginning, followed by an **exclamation mark** (strong feeling) or a **comma** (weaker feeling): ***Wow!** That's amazing. **Oh**, I didn't know that.*",
    "Some interjections are used to get attention (*Hey!*), to ask for silence (*Shh!*), to show that you are thinking (*Hmm*) or to start what you are saying (*Well, …*).",
    "Interjections are very common in **spoken English**, in **dialogue** in stories, in **comics** and in messages. In formal writing, like essays and reports, we hardly use them at all."
  ],
  norsk: "Interjeksjoner er utropsord som viser følelser, som *au!*, *æsj!*, *jippi!* og *oi!* på norsk. Engelsk har sine egne utropsord, og de er ikke alltid like de norske: *Au!* = *Ouch!*, *Æsj!* = *Yuck!*, *Uff!* = *Ugh!* eller *Oh no!*, *Jippi!* = *Yay!* eller *Hooray!*. Bruk dem i dialog og muntlig engelsk, men ikke i formelle tekster.",
  husk: [
    "Strong feeling → **exclamation mark**: *Ouch! That hurt!*",
    "Weaker feeling → **comma**: *Oh, I see.* / *Well, I'm not sure.*",
    "Use interjections in dialogue, stories and comics – not in formal essays.",
    "Use the English words, not the Norwegian ones: *Yuck!* (not ~~Æsj!~~), *Ouch!* (not ~~Au!~~)."
  ],
  tabeller: [
    { tittel: "Common interjections", kolonner: ["Interjection", "Feeling or use", "Example", "Norsk"], rader: [
      ["Ouch! / Ow!", "pain", "*Ouch! I hit my toe.*", "Au!"],
      ["Oops! / Whoops!", "a small mistake or accident", "*Oops! I dropped my phone.*", "Ops! / Oi!"],
      ["Wow!", "surprise, admiration", "*Wow! What a view!*", "Wow! / Oi!"],
      ["Yuck! / Eww!", "disgust", "*Yuck! This milk is sour.*", "Æsj! / Fy!"],
      ["Ugh!", "annoyance or disgust", "*Ugh! Not homework again!*", "Uff! / Æsj!"],
      ["Phew!", "relief", "*Phew! We caught the train.*", "Puh!"],
      ["Hooray! / Yay!", "joy, celebration", "*Hooray! We won!*", "Hurra! / Jippi!"],
      ["Oh no!", "worry, bad news", "*Oh no! I forgot my keys.*", "Å nei! / Uff da!"],
      ["Oh dear!", "mild worry or sympathy", "*Oh dear, you look tired.*", "Å, stakkars! / Uff!"],
      ["Hey!", "getting attention", "*Hey! Wait for me!*", "Hei! / Hallo!"],
      ["Shh!", "asking for silence", "*Shh! The baby is sleeping.*", "Hysj!"],
      ["Hmm", "thinking, doubt", "*Hmm, let me think.*", "Hmm"],
      ["Well,", "starting, hesitating", "*Well, I'm not sure.*", "Altså, … / Tja, …"],
      ["Ah! / Aha!", "understanding, discovering", "*Aha! Now I get it.*", "Aha!"],
      ["Huh?", "not understanding", "*Huh? What did you say?*", "Hæ?"],
      ["Bless you!", "after someone sneezes", "*Atchoo! – Bless you!*", "Prosit!"]
    ] }
  ],
  sammenlign: [
    { tittel: "Ulike utropsord", tekst: "Mange norske utropsord har egne engelske varianter. Bruk de engelske når du skriver eller snakker engelsk.", eks: [["Au!", "Ouch!"], ["Æsj!", "Yuck! / Eww!"], ["Uff da!", "Oh dear! / Oh no!"], ["Jippi!", "Yay! / Hooray!"], ["Hæ?", "Huh? / Sorry? / Pardon?"], ["Prosit!", "Bless you!"]] },
    { tittel: "Høflig eller uhøflig?", tekst: "*Huh?* og *What?* kan virke uhøflig. Si heller *Sorry?* eller *Pardon?* hvis du ikke hørte hva noen sa.", eks: [["Hæ?", "Sorry? / Pardon? (høflig)"]] },
    { tittel: "Lyder i tegneserier", tekst: "Tegneserier har mange lydord (onomatopoeia) som ligner interjeksjoner: *Bang! Boom! Splash! Crash!* På norsk ofte *Pang! Bom! Plask! Krasj!*" }
  ],
  ovelser: [
    { type: "mc", tittel: "Which interjection fits?", oppgaver: [
      { s: "«___! I cut my finger!»", valg: ["Ouch", "Hooray", "Yum"], forklaring: "Pain: *Ouch!*" },
      { s: "«___! We won the match!»", valg: ["Hooray", "Oops", "Ugh"], forklaring: "Joy: *Hooray!*" },
      { s: "«___! There's a hair in my soup!»", valg: ["Yuck", "Wow", "Phew"], forklaring: "Disgust: *Yuck!*" },
      { s: "«___! I spilled my juice.»", valg: ["Oops", "Hooray", "Shh"], forklaring: "A small accident: *Oops!*" },
      { s: "«___! We made it just in time.»", valg: ["Phew", "Ouch", "Yuck"], forklaring: "Relief: *Phew!*" },
      { s: "«___! Be quiet in the library.»", valg: ["Shh", "Wow", "Oh dear"], forklaring: "Asking for silence: *Shh!*" },
      { s: "«___! Look at that huge rainbow!»", valg: ["Wow", "Ugh", "Oops"], forklaring: "Surprise and admiration: *Wow!*" },
      { s: "Someone sneezes. You say:", valg: ["Bless you!", "Hooray!", "Oops!"], forklaring: "After a sneeze: *Bless you!*" }
    ] },
    { type: "sorter", tittel: "What feeling?", instruks: "Sort the interjections by feeling.", kategorier: ["Happy", "Hurt / upset", "Surprised", "Disgusted"], ord: [
      ["Hooray!", 0], ["Yay!", 0], ["Ouch!", 1], ["Oh no!", 1], ["Wow!", 2], ["Whoa!", 2], ["Yuck!", 3], ["Eww!", 3]
    ] },
    { type: "finn", tittel: "Find the interjections", instruks: "Click on the **interjections** in this comic dialogue.", oppgaver: [
      { s: "[Hey!] Wait for me!" },
      { s: "[Oh] [no!] I forgot my lunch." },
      { s: "[Wow!] That's the biggest dog I've ever seen." },
      { s: "[Hmm,] I'm not sure that's a good idea." },
      { s: "[Well,] maybe we should go home." }
    ] },
    { type: "mc", tittel: "Polite or not?", oppgaver: [
      { s: "You didn't hear what your teacher said. What is most polite?", valg: ["Sorry?", "Huh?", "What?"], forklaring: "*Sorry?* or *Pardon?* is polite." },
      { s: "Where do interjections belong?", valg: ["In dialogue, comics and informal texts", "In formal essays and reports", "Only in poems"], forklaring: "Interjections are informal." },
      { s: "Which punctuation shows a strong feeling?", valg: ["Wow! That's amazing.", "Wow. That's amazing.", "Wow; that's amazing."], forklaring: "A strong feeling gets an exclamation mark." }
    ] }
  ],
  oppgaver: [
    "Make a short comic strip (4–6 pictures) with speech bubbles. Use at least five different interjections.",
    "Write a dialogue between two friends who are on an exciting trip. Use interjections to show their feelings.",
    "Find five Norwegian interjections and write the English ones with the same feeling."
  ],
  se: ["adverbs", "conjunctions", "verbs"]
};
