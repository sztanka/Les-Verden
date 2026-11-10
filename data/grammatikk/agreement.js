window.LV = window.LV || {};
LV.grammatikk = {
  id: "agreement",
  tittel: "Subject–verb agreement",
  norskNavn: "samsvar mellom subjekt og verbal",
  ikon: "🤝",
  ingress: "In English, the verb must **agree** with the subject: *she works*, but *they work*; *the book is*, but *the books are*. Norwegian verbs never change like this (*jeg/hun/de jobber*), so this is one of the most common mistakes Norwegian students make – even in 10th grade.",
  forklaring: [
    "In the **present simple**, add **-s** to the verb when the subject is *he, she, it* or one person or thing: *My brother **plays** football. The shop **opens** at nine.* With *I, you, we, they* and plural nouns, there is no -s: *My brothers **play** football.*",
    "The verb **be** changes the most: *I **am**, you/we/they **are**, he/she/it **is***. In the past: *I/he/she/it **was**, you/we/they **were***. Also **have** becomes **has** and **do** becomes **does** with *he, she, it*.",
    "Find the **real subject**. Words in between do not change the verb: *The **box** of chocolates **is** on the table.* *One **of my friends** **lives** in Oslo.* (One lives – not friends live.)",
    "**There is / there are:** The verb agrees with the noun that comes **after** it: *There **is** a cat in the garden. There **are** two cats in the garden.* Many Norwegians write *there is* with plurals, because Norwegian says *det er* in both cases.",
    "Some words are **singular** even if they seem to be about many: *everyone, everybody, nobody, each, every, news*: *Everybody **is** here. The news **is** good.* Some words are **plural** even without -s: *people, police, children*: *People **are** friendly. The police **are** coming.*"
  ],
  norsk: "På norsk har verbet samme form uansett subjekt: *jeg spiller, hun spiller, de spiller*. På engelsk må du sjekke subjektet hver gang. Den vanligste feilen er å glemme **-s** i tredje person entall (~~*she play*~~ → *she plays*). Den nest vanligste er ~~*there is many*~~ og ~~*people is*~~. Husk også at *nyheter* er entall på engelsk (*the news is*), mens *folk* er flertall (*people are*).",
  husk: [
    "He, she, it, one person or one thing → verb + **s** in the present simple.",
    "I am · you are · he/she/it is · we/you/they are.",
    "I/he/she/it was · you/we/they were.",
    "There **is** + one thing. There **are** + many things.",
    "Everybody, everyone, nobody, each, news → singular. People, police, children → plural."
  ],
  tabeller: [
    { tittel: "Present simple and *be*", kolonner: ["Subject", "play", "be (present)", "be (past)", "have", "do"], rader: [
      ["I", "play", "am", "was", "have", "do"],
      ["you / we / they", "play", "are", "were", "have", "do"],
      ["he / she / it", "play**s**", "**is**", "was", "**has**", "**does**"]
    ] },
    { tittel: "Tricky subjects", kolonner: ["Singular (is / has / plays)", "Plural (are / have / play)"], rader: [
      ["everybody, everyone, nobody, somebody", "people"],
      ["each, every", "children, men, women"],
      ["the news, maths, physics", "the police"],
      ["one of my friends", "both of my friends"],
      ["the number of students", "a number of students (= many students)"]
    ] }
  ],
  sammenlign: [
    { tittel: "Det er – there is / there are", tekst: "Norsk bruker «det er» både om én og om mange ting. Engelsk skiller.", eks: [["Det er en elev i gangen.", "There **is** a student in the corridor."], ["Det er mange elever i gangen.", "There **are** many students in the corridor."], ["Folk er hyggelige her.", "People **are** nice here."], ["Nyhetene er gode.", "The news **is** good."]] }
  ],
  ovelser: [
    { type: "fyll", tittel: "Add -s – or not?", instruks: "Write the verb in the **present simple**.", oppgaver: [
      { s: "My best friend ___ in Tromsø.", hint: "live", svar: ["lives"] },
      { s: "My grandparents ___ in Tromsø.", hint: "live", svar: ["live"] },
      { s: "Nobody ___ the answer.", hint: "know", svar: ["knows"], forklaring: "*Nobody* is singular." },
      { s: "One of my friends ___ three languages.", hint: "speak", svar: ["speaks"], forklaring: "The subject is *one*, not *friends*." },
      { s: "The police ___ looking for the thief.", hint: "be", svar: ["are"], forklaring: "*Police* is plural in English." },
      { s: "My sister ___ have a phone yet.", hint: "do not", svar: ["doesn't", "does not", "doesn’t"] },
      { s: "Everybody in my class ___ a laptop.", hint: "have", svar: ["has"] }
    ] },
    { type: "mc", tittel: "There is or there are?", oppgaver: [
      { s: "___ a lot of people at the concert.", valg: ["There were", "There was"], forklaring: "*People* is plural." },
      { s: "___ a new student in our class.", valg: ["There is", "There are"], forklaring: "One student → *there is*." },
      { s: "___ many reasons why I like English.", valg: ["There are", "There is"], forklaring: "*Reasons* is plural." },
      { s: "___ some milk in the fridge.", valg: ["There is", "There are"], forklaring: "*Milk* is uncountable and takes a singular verb." },
      { s: "___ no buses on Sundays.", valg: ["There are", "There is"], forklaring: "*Buses* is plural." }
    ] },
    { type: "sorter", tittel: "Correct or wrong?", instruks: "Sort the sentences.", kategorier: ["Correct", "Wrong"], ord: [
      ["She plays the guitar.", 0], ["He don't like fish.", 1], ["People are friendly here.", 0], ["The news are bad today.", 1], ["There is many cars in Oslo.", 1],
      ["Each of the students has a book.", 0], ["My parents was at work.", 1], ["Everyone loves holidays.", 0], ["The children is playing outside.", 1]
    ] }
  ],
  oppgaver: [
    "Write five sentences about a friend or family member in the present simple. Underline every verb and check the -s.",
    "Find a text you have written. Look for *there is* and *people*. Is the verb correct?",
    "Write a short news report that begins: «There are big changes at our school this year …»"
  ],
  se: ["verbs", "editing", "norwegian-errors"]
};
