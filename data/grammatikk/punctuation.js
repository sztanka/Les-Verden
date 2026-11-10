window.LV = window.LV || {};
LV.grammatikk = {
  id: "punctuation",
  tittel: "Capital letters, commas and apostrophes",
  norskNavn: "stor forbokstav, komma og apostrof",
  ikon: "❝",
  ingress: "Small marks, big difference: *Let's eat, Grandma!* is very different from *Let's eat Grandma!* English has some rules for capital letters, commas and apostrophes that are different from Norwegian. Here are the most important ones.",
  forklaring: [
    "**Capital letters:** English uses a capital letter for the word **I**, and for **days**, **months**, **languages**, **nationalities** and **religions**: *On **Monday** in **June**, **I** spoke **English** with a **Norwegian** girl.* In Norwegian these words have small letters (*mandag, juni, engelsk, norsk*).",
    "Titles of books, films and songs usually have capital letters on the important words: ***The Hunger Games**, **Pride and Prejudice***.",
    "**The apostrophe ( ’ )** has two jobs. (1) It shows that letters are missing: *don't = do not, it's = it is, I'm = I am*. (2) It shows that something belongs to someone: *Nora**'s** bag* (one person), *the girls**'** bags* (more than one girl). Never use an apostrophe just to make a plural: ~~*apple's*~~ → *apples*.",
    "**its** or **it's**? *It's* always means *it is* or *it has*. *Its* means *dens/dets*: *The dog wagged **its** tail. **It's** a happy dog.*",
    "**Commas:** Use a comma after an introduction (*In 1905, Norway became independent.*), between items in a list (*bread, milk and eggs*), and around extra information (*My brother, who is 16, plays handball.*). Do **not** use a comma before *that*: ~~*I think, that …*~~ → *I think that …* – and do not join two full sentences with only a comma (see Run-ons).",
    "**Quotation marks:** English uses “double” or ‘single’ quotation marks – not the Norwegian «sjevroner». A comma or full stop usually goes **inside** them: *“I’m tired,” she said.*"
  ],
  norsk: "Tre ting nordmenn ofte gjør feil: (1) små bokstaver på ~~*monday*~~, ~~*english*~~ og ~~*norwegian*~~, (2) komma foran *that* fordi vi har det på norsk (~~*I think, that*~~), og (3) apostrof i flertall (~~*car's*~~). På norsk skriver vi *Noras bok* uten apostrof – på engelsk heter det *Nora's book*.",
  husk: [
    "Capital letters: I, days, months, languages, nationalities.",
    "Apostrophe = missing letters (don't) or ownership (Nora's).",
    "Plural = no apostrophe: books, apples, cars.",
    "it's = it is / it has. its = dens/dets.",
    "No comma before *that*."
  ],
  tabeller: [
    { tittel: "Capital letter or not?", kolonner: ["Capital letter in English", "Small letter in Norwegian"], rader: [
      ["**I** think", "jeg tror"],
      ["**Monday**, **Friday**", "mandag, fredag"],
      ["**January**, **December**", "januar, desember"],
      ["**English**, **Norwegian**", "engelsk, norsk"],
      ["a **Norwegian** flag", "et norsk flagg"],
      ["**Christmas**, **Easter**", "jul, påske"]
    ] },
    { tittel: "The apostrophe", kolonner: ["", "Example"], rader: [
      ["Missing letters", "I**'**m, you**'**re, it**'**s, don**'**t, can**'**t, won**'**t"],
      ["One owner", "my sister**'s** room, James**'s** car / James**'** car"],
      ["More than one owner (-s plural)", "my sisters**'** room, the students**'** books"],
      ["Plural without -s", "the children**'s** toys, the women**'s** team"],
      ["Plural – no apostrophe!", "two cars, many books, the 1990s"]
    ] }
  ],
  sammenlign: [
    { tittel: "Ikke komma foran «that»", tekst: "På norsk setter vi ofte komma foran «at». På engelsk gjør vi ikke det.", eks: [["Jeg tror, at det blir regn.", "I think that it will rain."], ["Hun sa, at hun var sliten.", "She said that she was tired."]] },
    { tittel: "Eieform", tekst: "På norsk: s uten apostrof. På engelsk: 's.", eks: [["Noras sykkel", "Nora**'s** bike"], ["lærerens kontor", "the teacher**'s** office"], ["barnas rom", "the children**'s** room"]] }
  ],
  ovelser: [
    { type: "finn", tittel: "Find the words that need a capital letter", instruks: "Click on every word that should have a **capital letter**.", oppgaver: [
      { s: "On [monday] [i] have [english] and maths." },
      { s: "We are going to Spain in [july]." },
      { s: "My cousin is [norwegian], but she speaks [french] too." },
      { s: "Do you celebrate [christmas] or [eid]?" },
      { s: "Last [friday] [i] watched a [japanese] film." }
    ] },
    { type: "mc", tittel: "Apostrophe or not?", oppgaver: [
      { s: "The dog is chasing ___ tail.", valg: ["its", "it's", "its'"], forklaring: "*Its* = dens. *It's* = it is." },
      { s: "___ raining again.", valg: ["It's", "Its", "Its'"], forklaring: "*It's* = it is." },
      { s: "We bought some ___.", valg: ["apples", "apple's", "apples'"], forklaring: "A plural needs no apostrophe." },
      { s: "This is my ___ house. (one brother)", valg: ["brother's", "brothers'", "brothers"], forklaring: "One owner: *'s*." },
      { s: "The ___ changing room is over there. (many girls)", valg: ["girls'", "girl's", "girls"], forklaring: "Many owners ending in -s: *s'*." },
      { s: "I ___ go to the party tomorrow.", valg: ["can't", "cant", "ca'nt"], forklaring: "*Can't* = cannot. The apostrophe replaces the missing letters." }
    ] },
    { type: "sorter", tittel: "Correct punctuation?", instruks: "Sort the sentences.", kategorier: ["Correct", "Wrong"], ord: [
      ["I think that you are right.", 0], ["I think, that you are right.", 1], ["In 1814, Norway got its constitution.", 0], ["The cat's are sleeping.", 1],
      ["My friend's dad is a pilot.", 0], ["It's time to go.", 0], ["The company lost it's money.", 1], ["We read english on wednesdays.", 1]
    ] }
  ],
  oppgaver: [
    "Write five sentences about your week. Use at least two days, one month, one language and one nationality.",
    "Write three sentences with *it's* and three with *its*.",
    "Check a text you have written: circle every apostrophe and every comma. Is each one correct?"
  ],
  se: ["run-ons", "editing", "norwegian-errors"]
};
