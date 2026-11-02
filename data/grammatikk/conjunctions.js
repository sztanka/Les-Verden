window.LV = window.LV || {};
LV.grammatikk = {
  id: "conjunctions",
  tittel: "Conjunctions",
  norskNavn: "konjunksjoner og subjunksjoner",
  ikon: "🔗",
  ingress: "A conjunction is a word that joins words, phrases or sentences together. Conjunctions help you write longer, better and more connected sentences.",
  forklaring: [
    "**Coordinating conjunctions** join two parts that are equally important: *I like tea **and** coffee. She was tired, **but** she went to the party.* There are seven, and you can remember them with the word **FANBOYS**: *for, and, nor, but, or, yet, so*.",
    "**Subordinating conjunctions** start a part of the sentence that cannot stand alone (a subordinate clause). They show a reason, a time, a condition or a contrast: *I stayed inside **because** it was raining. **When** I got home, I made dinner. **If** it rains, we'll stay inside. **Although** it was cold, we went swimming.*",
    "**Correlative conjunctions** come in pairs: *both … and, either … or, neither … nor, not only … but also*. Example: *You can have **either** tea **or** coffee.*",
    "Using conjunctions makes your writing flow. Instead of *It was late. I was tired. I went to bed.*, write: *It was late **and** I was tired, **so** I went to bed.*"
  ],
  norsk: "Norsk skiller mellom **konjunksjoner** (*og, men, eller, for, så*) og **subjunksjoner** (*fordi, når, hvis, at, selv om*). På engelsk heter begge deler *conjunctions*: *coordinating* (sideordnende) og *subordinating* (underordnende). En viktig forskjell gjelder **ordstilling**: Når en leddsetning står først på norsk, kommer verbet før subjektet etterpå (*Når det regner, **blir jeg** inne*). På engelsk beholder vi vanlig rekkefølge: *When it rains, **I stay** inside.*",
  husk: [
    "**FANBOYS**: *for, and, nor, but, or, yet, so* join equal parts.",
    "After a subordinate clause at the start, use a **comma** and keep **subject + verb**: *Because it was late, **we went** home.*",
    "*So* = derfor/så (result). *Then* = så/deretter (time). *So that* = slik at (purpose).",
    "Don't start too many sentences with *And* or *But* in formal writing – join the sentences instead."
  ],
  tabeller: [
    { tittel: "Coordinating conjunctions (FANBOYS)", kolonner: ["Conjunction", "Meaning", "Example", "Norsk"], rader: [
      ["**F**or", "because (formal, rare)", "*She was happy, **for** she had passed the test.*", "for"],
      ["**A**nd", "adds information", "*I play football **and** handball.*", "og"],
      ["**N**or", "and not (after a negative)", "*He doesn't like fish, **nor** does he like meat.*", "heller ikke"],
      ["**B**ut", "shows a contrast", "*It was sunny **but** cold.*", "men"],
      ["**O**r", "gives a choice", "*Would you like tea **or** coffee?*", "eller"],
      ["**Y**et", "but still (contrast)", "*It was expensive, **yet** we bought it.*", "likevel, men"],
      ["**S**o", "shows a result", "*It was raining, **so** we stayed inside.*", "så, derfor"]
    ] },
    { tittel: "Subordinating conjunctions", kolonner: ["Type", "Conjunctions", "Example", "Norsk"], rader: [
      ["Reason", "because, since, as", "*I'm tired **because** I went to bed late.*", "fordi, siden, ettersom"],
      ["Time", "when, while, before, after, until, as soon as", "*Call me **when** you get home.*", "når/da, mens, før, etter at, til, så snart"],
      ["Condition", "if, unless", "*We'll go **if** it stops raining. I won't go **unless** you come.*", "hvis/om, med mindre"],
      ["Contrast", "although, even though, while, whereas", "***Although** it was cold, we went swimming.*", "selv om, mens"],
      ["Purpose", "so that, in order that", "*Speak up **so that** everyone can hear you.*", "slik at, for at"],
      ["Reported content", "that, whether, if", "*I think **that** she is right. I don't know **whether** he's coming.*", "at, om"]
    ] },
    { tittel: "Correlative conjunctions (pairs)", kolonner: ["Pair", "Example", "Norsk"], rader: [
      ["both … and", "*She speaks **both** English **and** Spanish.*", "både … og"],
      ["either … or", "*We can **either** walk **or** take the bus.*", "enten … eller"],
      ["neither … nor", "***Neither** Tom **nor** Emma was there.*", "verken … eller"],
      ["not only … but also", "*She is **not only** clever **but also** kind.*", "ikke bare … men også"]
    ] }
  ],
  sammenlign: [
    { tittel: "Ingen inversjon etter leddsetning", tekst: "På norsk kommer verbet før subjektet når en leddsetning står først. På engelsk står subjektet først, som vanlig.", eks: [["Når det regner, **blir jeg** inne.", "When it rains, **I stay** inside."], ["Hvis du kommer, **blir jeg** glad.", "If you come, **I will be** happy."], ["Fordi det var sent, **dro vi** hjem.", "Because it was late, **we went** home."]] },
    { tittel: "*Så* = *so* eller *then*?", tekst: "Norsk *så* kan bety *derfor* (resultat) eller *deretter* (tid). På engelsk er det to forskjellige ord.", eks: [["Jeg var sulten, **så** jeg spiste.", "I was hungry, **so** I ate."], ["Først spiste vi, **så** gikk vi en tur.", "First we ate, **then** we went for a walk."]] },
    { tittel: "*Når* og *da* = *when*", tekst: "Norsk skiller mellom *når* (gjentatt/fremtid) og *da* (én gang i fortiden). Engelsk bruker *when* om begge.", eks: [["**Når** jeg kommer hjem, spiser jeg.", "**When** I get home, I eat."], ["**Da** jeg var liten, bodde vi i Tromsø.", "**When** I was little, we lived in Tromsø."]] },
    { tittel: "*Hvis* og *om*", tekst: "*Hvis* (betingelse) er *if*. *Om* i betydningen *hvorvidt* er *whether* eller *if*.", eks: [["**Hvis** det regner, blir vi inne.", "**If** it rains, we'll stay inside."], ["Jeg vet ikke **om** hun kommer.", "I don't know **whether** / **if** she's coming."]] },
    { tittel: "*At* kan ofte sløyfes", tekst: "Som på norsk kan *that* ofte sløyfes i uformell engelsk: *I think (that) you're right.* – *Jeg tror (at) du har rett.*" }
  ],
  ovelser: [
    { type: "fyll", tittel: "And, but, or or so?", instruks: "Write **and**, **but**, **or** or **so**.", oppgaver: [
      { s: "I like apples ___ bananas.", svar: ["and"] },
      { s: "It was very cold, ___ we wore warm jackets.", svar: ["so"] },
      { s: "The film was long, ___ it was very good.", svar: ["but"] },
      { s: "Do you want to walk ___ take the bus?", svar: ["or"] },
      { s: "I was tired, ___ I went to bed early.", svar: ["so"] },
      { s: "She studied hard, ___ she didn't pass the test.", svar: ["but"] },
      { s: "We can play football ___ watch a film.", svar: ["or"] }
    ] },
    { type: "mc", tittel: "Choose the right conjunction", oppgaver: [
      { s: "I stayed at home ___ I was ill.", valg: ["because", "although", "unless"], forklaring: "A reason: *because*." },
      { s: "___ it was raining, we went for a walk.", valg: ["Although", "Because", "So"], forklaring: "A contrast: *although* (selv om)." },
      { s: "Wait here ___ I come back.", valg: ["until", "unless", "although"], forklaring: "Time: *until* (til)." },
      { s: "You won't pass ___ you study.", valg: ["unless", "if", "because"], forklaring: "*Unless* = if not (med mindre)." },
      { s: "Turn off the lights ___ you leave.", valg: ["before", "because", "or"], forklaring: "Time: *before*." },
      { s: "She listens to music ___ she does her homework.", valg: ["while", "unless", "so"], forklaring: "At the same time: *while* (mens)." },
      { s: "I don't know ___ he likes pizza.", valg: ["whether", "because", "although"], forklaring: "*Whether* = om (hvorvidt)." },
      { s: "We can ___ go to the beach or stay at home.", valg: ["either", "neither", "both"], forklaring: "*either … or* = enten … eller." }
    ] },
    { type: "sorter", tittel: "Coordinating or subordinating?", instruks: "Is the conjunction **coordinating** (FANBOYS) or **subordinating**?", kategorier: ["Coordinating", "Subordinating"], ord: [
      ["and", 0], ["because", 1], ["but", 0], ["although", 1], ["or", 0], ["when", 1], ["so", 0], ["if", 1], ["yet", 0], ["unless", 1], ["nor", 0], ["while", 1]
    ] },
    { type: "mc", tittel: "Word order", oppgaver: [
      { s: "Which sentence is correct?", valg: ["When I came home, I made dinner.", "When I came home, made I dinner.", "When came I home, I made dinner."], forklaring: "English keeps subject + verb: *I made*." },
      { s: "Which sentence is correct?", valg: ["If it rains, we will stay inside.", "If it rains, will we stay inside.", "If rains it, we will stay inside."], forklaring: "No inversion after the if-clause." },
      { s: "Which sentence is correct?", valg: ["I was hungry, so I ate a sandwich.", "I was hungry, then I ate a sandwich.", "I was hungry, so ate I a sandwich."], forklaring: "A result: *so*, and subject before verb." }
    ] },
    { type: "finn", tittel: "Find the conjunctions", instruks: "Click on all the **conjunctions**.", oppgaver: [
      { s: "I wanted to go out, [but] it was raining." },
      { s: "We stayed inside [because] it was cold [and] windy." },
      { s: "[When] the bell rang, the students ran outside." },
      { s: "You can have juice [or] milk." },
      { s: "[Although] she was nervous, she sang beautifully." }
    ] }
  ],
  oppgaver: [
    "Join these sentences with conjunctions: *It was Saturday. The sun was shining. We went to the beach. The water was cold. We swam anyway.*",
    "Write six sentences about yourself. Use *because*, *although*, *when*, *if*, *so* and *but* – one in each sentence.",
    "Translate into English and check the word order: *Når jeg kommer hjem, gjør jeg lekser. Fordi det regnet, ble vi inne. Hvis du vil, kan vi spille.*"
  ],
  se: ["prepositions", "adverbs", "verbs"]
};
