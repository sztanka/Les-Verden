/* Les verden – Tekstpar (tekstpar.html)
   To tekster om samme tema, side om side. Tekstene hentes fra
   nettstedets egne filer, så her står bare hvilke deler som brukes:
   type "lesing" → data/lesing/<id>.js, tekst[deler]
   type "tema"   → data/temaer/<id>.js, avsnitt[deler]
   type "kilde"  → data/kilder.js, utdrag[deler]
   Hull i rekken av deler vises som […].
   av: hvem som skrev en kilde (vises under tittelen)
   sp: språket i spørsmålene ("nb" eller "en"). */
window.LV = window.LV || {};
window.LV.tekstpar = [
  {
    id: "skolen-som-redskap", ikon: "🏫", trinn: "9–10", sp: "nb", fag: ["samfunnsfag", "engelsk"],
    tittel: "Skolen som redskap",
    ingress: "Både i USA og i Norge brukte staten skolen til å gjøre urfolksbarn til «vanlige» borgere. Her møter du en ung Dakota-jente som forteller om sin første dag på internatskolen, og en fagtekst om fornorskingen av samene.",
    a: { type: "lesing", id: "zitkala-sa", deler: [18, 19, 20, 21, 22, 23], etikett: "Erindringer (USA, 1900)" },
    b: { type: "tema", id: "sf9-fornorskingen", deler: [2, 3], etikett: "Fagtekst (Norge)" },
    forLesing: ["Hva vet du om internatskoler eller fornorskingen fra før?", "Hvorfor tror du en stat vil bestemme hvilket språk barn skal snakke på skolen?"],
    sporsmal: [
      "Hvilke likheter ser du mellom det som skjedde med Zitkala-Ša og det som skjedde med samiske barn?",
      "Zitkala-Ša forteller om sine egne følelser. Fagteksten forteller om hele grupper. Hva får du vite av den ene teksten som du ikke får vite av den andre?",
      "Hvorfor tror du klippingen av håret var så vondt for Zitkala-Ša? Finn ord i teksten som viser det.",
      "Hvordan forklarer fagteksten hvorfor staten brukte skolen? Ville myndighetene i USA brukt de samme grunnene?",
      "Hvilken av tekstene gjorde sterkest inntrykk på deg – og hvorfor?"
    ],
    venn: ["Bare Zitkala-Ša", "Begge", "Bare fornorskingen"],
    skriv: "Skriv et kort innlegg (150–250 ord) der du sammenligner hvordan skolen ble brukt mot urfolk i USA og i Norge. Bruk minst ett eksempel fra hver tekst.",
    tema: "sf9-fornorskingen"
  },
  {
    id: "education-freedom", ikon: "📖", trinn: "10", sp: "en", fag: ["engelsk"],
    tittel: "Education: Freedom or Force?",
    ingress: "Frederick Douglass was enslaved as a child and was forbidden to learn to read. Zitkala-Ša was a Dakota girl who was taken to a school far from home to learn the ways of white Americans. Both write about education – but their stories are very different.",
    a: { type: "lesing", id: "douglass", deler: [1, 2], etikett: "Autobiography (1845)" },
    b: { type: "lesing", id: "zitkala-sa", deler: [1, 2, 3, 4], etikett: "Memoir (1900)" },
    forLesing: ["Why do you think some people in power have tried to stop others from learning to read?", "What do you think it would be like to go to school far away from your family?"],
    sporsmal: [
      "What does education mean to Douglass? What does it mean to Zitkala-Ša at the start of her story?",
      "Douglass is stopped from learning. Zitkala-Ša is taken away to learn. How can both be a way of controlling people?",
      "Find one sentence in each text that shows the writer's feelings. What feelings are they?",
      "Both writers look back on their childhood as adults. How might that affect the way they tell their stories?",
      "Which text do you think is more hopeful? Explain why."
    ],
    venn: ["Only Douglass", "Both", "Only Zitkala-Ša"],
    skriv: "Write a short text (150–250 words) comparing what education meant for Frederick Douglass and Zitkala-Ša. Use at least one quote from each text.",
    tema: "en10-oppression"
  },
  {
    id: "freedom-for-whom", ikon: "🗽", trinn: "10", sp: "en", fag: ["engelsk", "samfunnsfag"],
    tittel: "Freedom for Whom?",
    ingress: "In 1776, the Declaration of Independence said that «all men are created equal». In 1852, Frederick Douglass – who had escaped from slavery – was asked to give a speech to celebrate the Fourth of July. Read the promise, and then the answer.",
    a: { type: "kilde", id: "uavhengighetserklaeringen", deler: [0, 1], etikett: "Declaration (1776)", av: "Thomas Jefferson and others (1776)" },
    b: { type: "lesing", id: "fourth-of-july", deler: [2, 11], etikett: "Speech (1852)" },
    forLesing: ["What do you know about the Fourth of July?", "Can a country be free if some of its people are not?"],
    sporsmal: [
      "What does the Declaration promise? Find the key words.",
      "Douglass says «This Fourth of July is yours, not mine.» What does he mean?",
      "How does Douglass use the ideas of the Declaration against the people who celebrate it?",
      "The Declaration was written by people with power. Douglass speaks for people without power. How can you see that in the language?",
      "Is there a gap between promises and reality in Norway or in the world today? Give an example."
    ],
    venn: ["Only the Declaration", "Both", "Only Douglass"],
    skriv: "Write a short text (150–250 words): «All men are created equal» – a promise for everyone? Use both texts.",
    tema: "sf8-amerikanske-revolusjonen"
  },
  {
    id: "womens-rights", ikon: "🗳️", trinn: "9–10", sp: "en", fag: ["engelsk", "samfunnsfag"],
    tittel: "Women's Rights: Words and Deeds",
    ingress: "In 1792, Mary Wollstonecraft argued in a book that women should be treated as thinking human beings. More than a hundred years later, Emmeline Pankhurst and the suffragettes decided that words were not enough. Compare the two ways of fighting for women's rights.",
    a: { type: "kilde", id: "wollstonecraft", deler: [0], etikett: "Book (1792)", av: "Mary Wollstonecraft (1792)" },
    b: { type: "lesing", id: "votes-for-women", deler: [5, 6, 7], etikett: "Autobiography (1914)" },
    forLesing: ["When did women in Norway get the right to vote?", "Is it ever right to break rules to fight for a good cause?"],
    sporsmal: [
      "What does Wollstonecraft want for women? What do the suffragettes want?",
      "Wollstonecraft writes a calm argument. How do the suffragettes make people listen?",
      "How do the men at the meeting react? What does that tell you about the time?",
      "Which method do you think works best: careful arguments or loud protest? Use the texts.",
      "Which rights are women and girls still fighting for in the world today?"
    ],
    venn: ["Only Wollstonecraft", "Both", "Only Pankhurst"],
    skriv: "Write a short text (150–250 words) comparing how Wollstonecraft and Pankhurst fought for women's rights. Which method would you choose, and why?",
    tema: "sf8-opplysningstiden"
  },
  {
    id: "krigen-innenfra", ikon: "🪖", trinn: "9–10", sp: "nb", fag: ["samfunnsfag", "engelsk"],
    tittel: "Krigen sett innenfra",
    ingress: "En fagtekst forteller hva som skjedde i skyttergravene under første verdenskrig. Et dikt skrevet av en soldat som var der, får deg til å føle det. Hva kan et dikt fortelle som en fagtekst ikke kan – og omvendt?",
    a: { type: "lesing", id: "war-poems", deler: [4, 5], etikett: "Dikt av en soldat (1917–1918)", av: "Wilfred Owen: «Dulce et Decorum Est» (1917–1918)" },
    b: { type: "tema", id: "sf9-forste-verdenskrig", deler: [3, 4], etikett: "Fagtekst" },
    forLesing: ["Hva vet du om skyttergravene under første verdenskrig?", "Hvordan blir krig vist i filmer og spill du kjenner?"],
    sporsmal: [
      "Hvilke fakta fra fagteksten finner du igjen i diktet?",
      "Hvilke ord og bilder i diktet gjør sterkest inntrykk? Hva får de deg til å se, høre eller føle?",
      "Diktet ender med et latinsk sitat som betyr «Det er søtt og ærefullt å dø for fedrelandet». Hvorfor kaller Owen det en løgn?",
      "Hva får du vite av fagteksten som diktet ikke forteller?",
      "Hvilken tekst ville du brukt hvis du skulle forklare krigen for en som aldri har hørt om den? Begrunn svaret."
    ],
    venn: ["Bare diktet", "Begge", "Bare fagteksten"],
    skriv: "Skriv en tekst (150–250 ord) om hva et dikt og en fagtekst kan fortelle om krig. Bruk eksempler fra begge tekstene.",
    tema: "sf9-forste-verdenskrig"
  },
  {
    id: "byens-baksider", ikon: "🏭", trinn: "9–10", sp: "nb", fag: ["samfunnsfag", "engelsk"],
    tittel: "Byens baksider",
    ingress: "Industrialiseringen fikk byene til å vokse raskt – og mange levde i trange og skitne boliger. Journalisten Jacob Riis ville at de rike skulle se hvordan «den andre halvdelen» levde i New York. Sammenlign ham med en fagtekst om livet i fabrikkbyene.",
    a: { type: "kilde", id: "riis-1890", deler: [0], etikett: "Reportasjebok (New York, 1890)", av: "Jacob A. Riis (1890)" },
    b: { type: "tema", id: "sf9-industrialiseringen", deler: [3], etikett: "Fagtekst" },
    forLesing: ["Hvorfor flyttet så mange inn til byene på 1800-tallet?", "Hvem tror du har ansvar for at folk har et sted å bo?"],
    sporsmal: [
      "Hva er «den andre halvdelen» for Riis? Hvem er den første halvdelen?",
      "Hvilke problemer i byene beskriver fagteksten? Hvilke av dem antyder Riis?",
      "Riis vil at leserne skal bry seg. Hvilke ord viser det? Er fagteksten like engasjert?",
      "Riis var selv innvandrer og hadde vært fattig. Hvordan kan det ha påvirket det han skrev?",
      "Finnes det en «andre halvdel» i dag? Gi et eksempel fra Norge eller verden."
    ],
    venn: ["Bare Riis", "Begge", "Bare fagteksten"],
    skriv: "Skriv en tekst (150–250 ord) der du sammenligner hvordan Riis og fagteksten beskriver livet for de fattige i byene. Hvilken tekst er mest overbevisende?",
    tema: "sf9-industrialiseringen"
  }
];
window.LV.tekstparSkjema = {
  nb: [["opphav", "Hvem laget teksten, og når?"], ["type", "Hva slags tekst er det?"], ["hensikt", "Hvorfor ble teksten laget? Hvem er mottakeren?"], ["budskap", "Hva er hovedbudskapet?"], ["virkemidler", "Hvordan påvirker teksten leseren? (ordvalg, eksempler, følelser)"]],
  en: [["opphav", "Who wrote the text, and when?"], ["type", "What kind of text is it?"], ["hensikt", "Why was it written? Who is the audience?"], ["budskap", "What is the main message?"], ["virkemidler", "How does the text affect the reader? (words, examples, feelings)"]]
};
