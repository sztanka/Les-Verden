/* =========================================================
   Les verden – Escape room (escape.html)
   Hvert rom har flere «låser». Svaret står alltid i teksten i rommet.
   type: "kode" (skriv svaret; svar = liste med godkjente svar),
         "valg" (flervalg; riktig = indeks), "rekke" (sett i riktig rekkefølge;
         elementene står i riktig rekkefølge i data og stokkes i spillet).
   ========================================================= */
window.LV = window.LV || {};
LV.escape = [
  {
    id: "bastillen", sprak: "nb", ikon: "🏰", farger: ["#2b2b3a", "#d4a73a"], tema: "sf8-franske-revolusjonen", trinn: 8,
    tittel: "Fanget i Bastillen", sted: "Paris, 14. juli 1789",
    kort: "Du er urettferdig fengslet i Bastillen. Utenfor stormer folket festningen. Klarer du å komme deg gjennom fem dører før vaktene kommer?",
    intro: "Du har sittet i en celle i Bastillen i flere måneder – uten dom, fordi du skrev en brosjyre som kritiserte kongen. I dag er det uro i gatene. Du hører rop, skudd og kirkeklokker. Plutselig ser du at celledøra står på gløtt. Men mellom deg og friheten er det fem låste dører.",
    laser: [
      { tittel: "Dør 1: Lappen på veggen", type: "kode",
        tekst: ["På veggen i cella har en tidligere fange risset inn seks linjer:", "> **F**angevokteren sover alltid etter middag.\n> **R**ustne nøkler henger ved døra.\n> **I**ngen har rømt herfra på ti år.\n> **H**ør etter: Ropet fra gata blir sterkere.\n> **E**tt ord åpner den første døra.\n> **T**enk på det folket roper etter."],
        oppgave: "Hvilket ord åpner den første døra?", svar: ["frihet"], hint: "Se på den første bokstaven i hver linje.", forklaring: "Forbokstavene danner ordet FRIHET. Dette kalles et akrostikon." },
      { tittel: "Dør 2: Brosjyren", type: "valg",
        tekst: ["På gulvet i gangen ligger et eksemplar av en brosjyre som alle i Paris snakker om:", "> «Hva er tredjestanden? **Alt.** Hva har den vært til nå? **Ingenting.** Hva vil den? **Bli noe.**»", "Under har noen skrevet: «Presteskapet og adelen er bare to av hundre franskmenn. De eier mye av jorda, men betaler nesten ikke skatt. Bøndene, arbeiderne og borgerne betaler nesten alt.»", "Over døra står det: *Svar riktig, ellers forblir døra stengt.*"],
        oppgave: "Hvilken gruppe betalte nesten all skatten?", valg: ["Tredjestanden – bønder, arbeidere og borgere", "Presteskapet", "Adelen", "Kongen og dronningen"], riktig: 0, hint: "Les det som står under sitatet.", forklaring: "Tredjestanden var omtrent 98 prosent av folket og betalte nesten all skatten. Sitatet er fra en berømt brosjyre av Emmanuel-Joseph Sieyès fra januar 1789 (fritt oversatt)." },
      { tittel: "Dør 3: Avisutklippet", type: "rekke",
        tekst: ["På vaktbordet ligger et avisutklipp:", "> «Mye har skjedd dette året. **I mai** møttes stenderforsamlingen i Versailles for første gang på 175 år. **I juni** erklærte tredjestanden seg som nasjonalforsamlingen og sverget å ikke gå hjem før Frankrike hadde fått en grunnlov. **I dag, 14. juli**, marsjerer folket mot Bastillen. Mange tror at nasjonalforsamlingen snart vil vedta en erklæring om menneskets rettigheter.»", "Låsen har fire knapper. De må trykkes i riktig rekkefølge."],
        oppgave: "Sett hendelsene i riktig rekkefølge.", rekke: ["Stenderforsamlingen møtes i Versailles", "Tredjestanden erklærer seg som nasjonalforsamlingen", "Folket stormer Bastillen", "Erklæringen om menneskets rettigheter blir vedtatt"], hint: "Se etter månedene i avisutklippet. Det som «snart» skal skje, kommer sist.", forklaring: "Mai: stenderforsamlingen. Juni: nasjonalforsamlingen. 14. juli: Bastillen. August: menneskerettighetserklæringen." },
      { tittel: "Dør 4: Fangeprotokollen", type: "kode",
        tekst: ["Ved neste dør henger fangeprotokollen. Den viser at det i dag bare sitter **sju fanger** i Bastillen. Mange hadde trodd at festningen var full av politiske fanger.", "På døra er det en tallås. Noen har skrevet med kritt: *Koden = antall fanger i dag ganger antall stender i Frankrike.*"],
        oppgave: "Hva er koden?", svar: ["21"], hint: "Hvor mange stender var det? Du har lest om dem bak dør 2.", forklaring: "7 fanger × 3 stender = 21. Da Bastillen ble stormet, satt det faktisk bare sju fanger der. Men festningen var et symbol på kongens makt." },
      { tittel: "Dør 5: Flagget", type: "kode",
        tekst: ["Ved den siste døra henger et flagg i tre farger: blått, hvitt og rødt. Noen har brodert tre ord på det, men det siste ordet er revet bort:", "> FRIHET – LIKHET – ……………", "Utenfor hører du folkemengden rope de tre ordene igjen og igjen. Det siste ordet betyr at alle borgere skal være som brødre og søstre."],
        oppgave: "Hva er det tredje ordet?", svar: ["brorskap", "broderskap"], hint: "Ordet ligner på «bror».", forklaring: "«Frihet, likhet, brorskap» (Liberté, égalité, fraternité) ble revolusjonens slagord og er i dag Frankrikes motto." }
    ],
    slutt: "Døra glir opp, og du løper ut i sollyset. Folkemengden jubler. Bastillen er falt! Dagen blir starten på den franske revolusjonen, og 14. juli er i dag Frankrikes nasjonaldag. Men revolusjonen har så vidt begynt – og den skal bli både modig og blodig."
  },
  {
    id: "workhouse", sprak: "en", ikon: "🏚️", farger: ["#3b2f24", "#c9b48a"], tema: "en9-victorian-era", trinn: 9,
    tittel: "Escape the Workhouse", sted: "London, 1862",
    kort: "You are 13 and stuck in a Victorian workhouse. Your brother is waiting for you somewhere in London. Can you get out through five locked doors?",
    intro: "Your parents died last winter, and you were sent to the workhouse – a place where the poorest people in Victorian Britain had to live and work in return for food and a bed. Your older brother managed to get away. Tonight, a girl in the kitchen whispers: «He left you messages. Find them, and you’ll find the way out.»",
    laser: [
      { tittel: "Door 1: The rules board", type: "kode",
        tekst: ["On the wall of the dining hall hangs a board with the rules:", "> RULES OF THE WORKHOUSE\n> 1. All inmates rise at five o’clock.\n> 2. Work starts at seven in the morning and ends at six in the evening.\n> 3. One hour is allowed for dinner. No talking during meals.\n> 4. Families shall live apart: men, women and children in separate wards.", "Under the board, your brother has scratched: *The code is the number of hours children WORK each day.*"],
        oppgave: "What is the code?", svar: ["10", "ten"], hint: "From seven to six is eleven hours. Don’t forget dinner.", forklaring: "From 7 a.m. to 6 p.m. is 11 hours, minus one hour for dinner = 10 hours of work. Families were split up, and life was hard on purpose, so that people would avoid the workhouse." },
      { tittel: "Door 2: The book on the shelf", type: "valg",
        tekst: ["In the master’s office there is a worn book on the shelf. Inside the cover your brother has written: *This story is about us.*", "> «Please, sir, I want some more.»", "The book was written by Charles Dickens in the late 1830s. It is about an orphan boy who is born in a workhouse, is punished for asking for more food, and later ends up among pickpockets in London."],
        oppgave: "Which book is it?", valg: ["Oliver Twist", "A Christmas Carol", "Great Expectations", "The Jungle Book"], riktig: 0, hint: "The boy in the book is named after the title.", forklaring: "«Oliver Twist» (1837–1839) made many readers angry about the way poor children were treated. You can read part of «A Christmas Carol» by Dickens in the Reading Room." },
      { tittel: "Door 3: The newspaper", type: "rekke",
        tekst: ["In the porter’s room lies an old newspaper with a list called «Our Queen’s Glorious Reign»:", "> In 1837, young Victoria became Queen, only eighteen years old. In 1840 she married Prince Albert. In 1851, millions visited the Great Exhibition in the Crystal Palace. Last year, in 1861, Prince Albert died, and the Queen is now dressed in black.", "The lock has four buttons."],
        oppgave: "Put the events in the right order.", rekke: ["Victoria becomes Queen", "Victoria marries Prince Albert", "The Great Exhibition in the Crystal Palace", "Prince Albert dies"], hint: "Look at the years: 1837, 1840, 1851, 1861.", forklaring: "1837, 1840, 1851, 1861. Queen Victoria wore black for the rest of her life after Albert died." },
      { tittel: "Door 4: The secret letter", type: "kode",
        tekst: ["Behind a loose brick you find a letter from your brother. Some of the letters are strangely big:", "> Dear sister, I am well. I have found work in a Tannery near the docks, and the Hours are long, but the pAy is fair. I think of you every Morning and Evening, my dear Sister. We will be together soon. Your loving brother.", "At the bottom: *The big letters tell you where to meet me.*"],
        oppgave: "Where should you meet him? Write the word.", svar: ["thames", "the thames", "river thames"], hint: "Find the capital letters that should not be capital letters. (The word «I» is always written with a capital.)", forklaring: "T-H-A-M-E-S: the River Thames, which runs through London." },
      { tittel: "Door 5: The gate", type: "valg",
        tekst: ["You are at the gate. The night porter is asleep. On the wall there is a small map of London, and your brother has drawn a circle by the river and written: *Meet me under the new clock tower by Parliament – the bell is called Big Ben. Don’t go to the Tower – that is a prison and the guards will catch you.*"],
        oppgave: "Where do you go?", valg: ["To the clock tower at the Houses of Parliament", "To the Tower of London", "To Buckingham Palace", "Back to bed"], riktig: 0, hint: "Read the note again: which place should you avoid?", forklaring: "The clock tower at the Houses of Parliament was finished in 1859. «Big Ben» is the name of the great bell. In 2012 the tower was renamed the Elizabeth Tower." }
    ],
    slutt: "You slip out through the gate and run through the foggy streets towards the river. Under the great clock tower, a figure steps out of the shadows. It is your brother. «You found my messages!» Reforms slowly made life better for the poor in the following decades, but the last workhouses in Britain did not close until the 20th century."
  },
  {
    id: "library", sprak: "en", ikon: "📚", farger: ["#1e3a3a", "#e6c97a"], tema: "en9-poetry", trinn: 8,
    tittel: "The Locked Library", sted: "A school library after closing time",
    kort: "You fell asleep in the school library – and now everything is locked. Only a good reader can solve the five puzzles and get out.",
    intro: "You sat down in a comfortable chair in the library with a good book … and when you wake up, it is dark. The doors are locked. On the librarian’s desk you find a note: «To the last reader in the library: Solve my five puzzles, and the doors will open. – The Librarian»",
    laser: [
      { tittel: "Puzzle 1: The poem on the wall", type: "kode",
        tekst: ["Above the door hangs a poem by Emily Dickinson:", "> There is no frigate like a book\n> To take us lands away,\n> Nor any coursers like a page\n> Of prancing poetry.", "Under the poem: *A frigate is a kind of sailing ship. Coursers are fast horses. The answer is the kind of ship.*"],
        oppgave: "What is the answer?", svar: ["frigate", "a frigate"], hint: "It is the first noun in the poem.", forklaring: "Dickinson compares a book to a ship that takes us to far-away lands. Read more of her poems in the Reading Room." },
      { tittel: "Puzzle 2: The strategy poster", type: "valg",
        tekst: ["On the wall there is a poster about reading strategies:", "> SKIMMING: Read quickly to get the main idea. Look at headings, pictures and the first sentence of each paragraph.\n> SCANNING: Look for one specific piece of information, like a name, a number or a date. Let your eyes jump until you find it.\n> CLOSE READING: Read slowly and carefully, maybe twice. Think about every word.", "Below: *You need to find the year a book was published in a long list – fast. Which strategy do you use?*"],
        oppgave: "Choose the right strategy.", valg: ["Scanning", "Skimming", "Close reading", "Reading aloud"], riktig: 0, hint: "You are looking for one specific number.", forklaring: "Scanning is for finding specific information quickly. Skimming is for the main idea." },
      { tittel: "Puzzle 3: The word detective", type: "kode",
        tekst: ["The next lock has letters instead of numbers. A card says:", "> «This traverse may the poorest take\n> Without oppress of toll;\n> How frugal is the chariot\n> That bears a human soul!»", "*Find the word in these lines that means «cheap» or «not wasteful». The poem says that even the poorest people can travel with a book.*"],
        oppgave: "Which word means «cheap»?", svar: ["frugal"], hint: "It describes the chariot.", forklaring: "«Frugal» means cheap, not wasteful. Using context – the words around a word – is a great strategy for understanding new words." },
      { tittel: "Puzzle 4: The fallen pages", type: "rekke",
        tekst: ["Five pages from a picture book about a famous fable have fallen on the floor. The pages are numbered on the back, but the numbers have faded. You remember the story: A proud animal challenges a slow one to a race – and loses because it takes a nap.", "The cupboard opens only if you put the pages in the right order."],
        oppgave: "Put the pages in the right order.", rekke: ["The Hare boasts that nobody can beat him.", "The Tortoise accepts the challenge, and the race starts.", "The Hare runs far ahead and lies down to sleep.", "The Tortoise plods on and passes the sleeping Hare.", "The Tortoise wins the race."], hint: "Think: beginning – problem – turning point – ending.", forklaring: "This is the plot of «The Hare and the Tortoise». Many stories follow this pattern: introduction, rising action, climax (the Hare sleeps), falling action and ending." },
      { tittel: "Puzzle 5: The catalogue", type: "kode",
        tekst: ["In the cupboard you find the library catalogue and a last note: *The key is hidden in a book by the author of «The Tell-Tale Heart». Type the author’s last name.*", "> CATALOGUE – SHORT STORIES\n> «After Twenty Years» – O. Henry\n> «The Tell-Tale Heart» – Edgar Allan Poe\n> «The Open Window» – Saki\n> «The Monkey’s Paw» – W. W. Jacobs\n> «To Build a Fire» – Jack London"],
        oppgave: "Type the author’s last name.", svar: ["poe", "edgar allan poe"], hint: "Scan the list for the title.", forklaring: "Edgar Allan Poe (1809–1849) wrote «The Tell-Tale Heart». You just used scanning!" }
    ],
    slutt: "Behind Poe’s book you find a little brass key. The library door clicks open. On the way out you see a new note: «Well done, reader! Remember: a book can take you anywhere – but please don’t fall asleep in here again. – The Librarian»"
  }
];
