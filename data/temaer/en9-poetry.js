/* Tema: Poetry (engelsk, 9. trinn)
   Formatering: se forklaringen øverst i sf9-industrialiseringen.js
   Dikt skrives som { dikt: "linje 1\nlinje 2\n\nny strofe", kilde: "..." }.
   Merk: Bare dikt som er falt i det fri (utgitt før 1929, forfatteren død
   for over 70 år siden), skal siteres her. */

window.LV = window.LV || {};
window.LV.tema = {
  id: "en9-poetry",
  fag: "engelsk",
  trinn: 9,
  sprak: "en",
  tittel: "Poetry – Reading and Writing Poems",

  ingress: "A poem can be a joke, a love letter, a protest, a prayer or a picture made of words. Poets play with rhythm, rhyme and images to say a lot in very few words. In this topic, you will read some famous poems in English, learn the tools poets use – and try writing poems of your own.",

  maal: [
    "recognise and explain poetic devices like rhyme, rhythm, imagery, simile, metaphor and personification",
    "read and interpret poems from different periods",
    "write your own poems and talk about how form and language create meaning"
  ],

  startsporsmal: "Do you know any poems or song lyrics by heart? Why do you think you remember them?",

  avsnitt: [
    {
      tittel: "What is a poem?",
      tekst: [
        "A [[poem]] is a text where the sound, the rhythm and the shape on the page are just as important as the meaning. Poems are written in lines, and the lines are often grouped in [[stanzas|stanza]] – the poetry version of paragraphs. Some poems rhyme and follow strict rules, while others, called free verse, have no fixed pattern.",
        "Poetry is one of the oldest forms of literature. Long before people could write, they used rhythm and rhyme to remember stories, laws and prayers. That is also why song lyrics and rap are so easy to remember – they use many of the same tools as poems."
      ]
    },
    {
      tittel: "Rhyme and rhythm",
      tekst: [
        "Words [[rhyme]] when they end with the same sound, like cloud – crowd or bright – night. We can describe the pattern of rhymes in a poem with letters. This is called the **rhyme scheme**. Lines that rhyme get the same letter. A limerick, a short funny poem, has the rhyme scheme AABBA. Here is a limerick by Edward Lear from 1846:",
        { dikt: "There was an Old Man with a beard,\nWho said, “It is just as I feared! –\nTwo Owls and a Hen,\nFour Larks and a Wren,\nHave all built their nests in my beard!”", kilde: "Edward Lear, from A Book of Nonsense (1846)" },
        "[[Rhythm|rhythm]] is the beat of a poem: the pattern of stressed and unstressed syllables. Try reading the limerick aloud and clap on the strong beats. You will notice that it almost sounds like a song."
      ],
      stoppOgTenk: "Which words rhyme in the limerick? Mark the rhyme scheme with A and B."
    },
    {
      tittel: "Painting with words",
      tekst: [
        "Poets use [[imagery]] – words that help us see, hear, smell, taste or feel something. A **simile** compares two things using like or as. A **metaphor** says that something is something else. **Personification** gives human qualities to animals, objects or ideas.",
        "In this famous poem from 1807, William Wordsworth uses a simile in the very first line. He compares himself to a cloud. The daffodils, on the other hand, are personified: they are a crowd that is dancing.",
        { dikt: "I wandered lonely as a cloud\nThat floats on high o’er vales and hills,\nWhen all at once I saw a crowd,\nA host, of golden daffodils;\nBeside the lake, beneath the trees,\nFluttering and dancing in the breeze.", kilde: "William Wordsworth, «I Wandered Lonely as a Cloud» (first stanza)" }
      ]
    },
    {
      tittel: "Big questions in small poems",
      tekst: [
        "Many poems ask questions that have no easy answers. In 1794, William Blake wrote a poem about a tiger. The speaker wonders who – or what – could create such a beautiful and dangerous animal. The poem uses strong rhythm, rhyme and [[alliteration]], which means repeating the same sound at the start of words, like burning bright.",
        { dikt: "Tyger Tyger, burning bright,\nIn the forests of the night;\nWhat immortal hand or eye,\nCould frame thy fearful symmetry?", kilde: "William Blake, «The Tyger» (first stanza)" },
        "Emily Dickinson wrote short poems full of dashes and surprising images. In this poem, published in 1891, hope is described as a bird that lives inside us. This is an extended [[metaphor]].",
        { dikt: "“Hope” is the thing with feathers –\nThat perches in the soul –\nAnd sings the tune without the words –\nAnd never stops – at all –", kilde: "Emily Dickinson, «“Hope” is the thing with feathers» (first stanza)" }
      ],
      stoppOgTenk: "If you described hope – or another feeling – as an animal, which animal would you choose? Why?"
    },
    {
      tittel: "The sonnet",
      tekst: [
        "A [[sonnet]] is a poem with 14 lines and a fixed rhyme scheme. The most famous sonnets in English were written by **William Shakespeare** around 1600. Many of them are about love, beauty and time. Sonnet 18 begins with a question:",
        { dikt: "Shall I compare thee to a summer’s day?\nThou art more lovely and more temperate:\nRough winds do shake the darling buds of May,\nAnd summer’s lease hath all too short a date;", kilde: "William Shakespeare, Sonnet 18 (first four lines, published 1609)" },
        "The language is old: thee and thou mean you, and art means are. The speaker says that the person he loves is even better than a summer’s day, because summer does not last. At the end of the sonnet, he claims that the poem itself will make the person’s beauty live forever – as long as people read it. More than 400 years later, we are still reading it."
      ]
    },
    {
      tittel: "Choices",
      tekst: [
        "One of the most quoted poems in American literature is Robert Frost’s «The Road Not Taken» from 1916. The speaker comes to a place where a road splits in two, and must choose which way to go. The roads are a [[symbol]] of the choices we make in life. In the last stanza, the speaker imagines himself as an old man, many years later, telling people with a sigh that he took the road fewer people had travelled – and that this choice changed everything.",
        "Many people read the poem as advice to choose your own path. But if you read the whole poem carefully, the speaker actually says that the two roads were almost the same. Perhaps the poem is really about how we tell stories about our choices afterwards. Good poems can often be read in more than one way – that is part of what makes them interesting."
      ]
    },
    {
      tittel: "Write your own poem",
      tekst: [
        "The best way to understand poetry is to write it yourself. You can start with a short form. A **haiku** comes from Japan and has three lines with five, seven and five syllables. It often describes a moment in nature. An **acrostic** poem uses the first letter of each line to spell a word downwards, for example your name.",
        "You can also write a poem that copies the pattern of a famous poem: “I wandered lonely as a ___” or “___ is the thing with ___”. Don’t worry about rhyme at first. Focus on strong images, interesting words and how the poem sounds when you read it aloud. Then read it to someone – poems are meant to be heard."
      ],
      stoppOgTenk: "Try writing a haiku about the view from your classroom window right now."
    }
  ],

  tidslinje: [
    { dato: "1609", tekst: "Shakespeare’s Sonnets are published." },
    { dato: "1794", tekst: "William Blake publishes Songs of Experience, which includes «The Tyger»." },
    { dato: "1807", tekst: "William Wordsworth publishes «I Wandered Lonely as a Cloud»." },
    { dato: "1846", tekst: "Edward Lear publishes A Book of Nonsense, full of limericks." },
    { dato: "1891", tekst: "A collection of Emily Dickinson’s poems is published after her death." },
    { dato: "1916", tekst: "Robert Frost publishes «The Road Not Taken»." }
  ],

  personer: [
    { navn: "William Shakespeare", levde: "1564–1616", rolle: "English playwright and poet", tekst: "He is often called the greatest writer in the English language. Besides famous plays like Romeo and Juliet and Hamlet, he wrote 154 sonnets about love, beauty and time." },
    { navn: "William Blake", levde: "1757–1827", rolle: "English poet and artist", tekst: "He was a poet, painter and printmaker who illustrated and printed his own books by hand. Many people in his time thought he was strange, but today he is seen as one of the great English poets." },
    { navn: "William Wordsworth", levde: "1770–1850", rolle: "English Romantic poet", tekst: "He was one of the leading Romantic poets and loved to write about nature and simple country life in the Lake District, where he lived for most of his life." },
    { navn: "Emily Dickinson", levde: "1830–1886", rolle: "American poet", tekst: "She lived a quiet life in Amherst, Massachusetts, and seldom left her home. She wrote almost 1,800 poems, but only about ten were published while she was alive." },
    { navn: "Robert Frost", levde: "1874–1963", rolle: "American poet", tekst: "He wrote about rural life in New England, using everyday language. He won the Pulitzer Prize four times and read a poem at President John F. Kennedy’s inauguration in 1961." }
  ],

  ord: {
    "poem": "dikt – a text where sound, rhythm, images and line breaks are used to create meaning.",
    "stanza": "strofe, vers – a group of lines in a poem.",
    "rhyme": "rim – when words end with the same sound.",
    "rhythm": "rytme – the pattern of strong and weak beats in a poem.",
    "imagery": "bildebruk – words that help the reader see, hear, smell, taste or feel something.",
    "alliteration": "allitterasjon – repeating the same sound at the start of several words close together.",
    "metaphor": "metafor – saying that something is something else, to show a likeness.",
    "sonnet": "sonett – a poem with 14 lines and a fixed rhyme scheme.",
    "symbol": "symbol – a thing that stands for a bigger idea, like a road standing for life’s choices."
  },

  sammendrag: [
    "Poems are written in lines and stanzas, and sound and rhythm are as important as meaning.",
    "The rhyme scheme shows which lines rhyme. A limerick goes AABBA.",
    "Poets use imagery, similes, metaphors, personification and alliteration.",
    "A sonnet has 14 lines. Shakespeare wrote 154 of them.",
    "Many poems can be interpreted in more than one way.",
    "You can write your own poems, for example a haiku or an acrostic."
  ],

  oppgaver: {
    1: {
      finn: [
        "What is a stanza?",
        "How many lines does a sonnet have?",
        "What is the rhyme scheme of a limerick?"
      ],
      forsta: [
        "Explain the difference between a simile and a metaphor, and give an example of each.",
        "Find the simile in Wordsworth’s poem and explain it."
      ],
      diskuter: [
        { tekst: "Read one of the poems aloud to your partner. Which poem did you like best, and why?", partner: true }
      ]
    },
    2: {
      finn: [
        "Find one example each of alliteration, personification and metaphor in the poems on this page.",
        "Find the rhyme scheme of the first four lines of Sonnet 18."
      ],
      forsta: [
        "Explain what the road symbolises in «The Road Not Taken».",
        "Explain how Emily Dickinson describes hope, and what she might mean."
      ],
      diskuter: [
        { tekst: "Are song lyrics poetry? Choose a song you like and discuss which poetic devices it uses.", partner: true }
      ]
    },
    3: {
      finn: [
        "Choose one of the poems and write a short analysis. Comment on form, rhyme, imagery and theme."
      ],
      forsta: [
        "Compare two of the poems on this page. How do they use language to create a mood?"
      ],
      diskuter: [
        "“Poetry is old-fashioned and has nothing to say to young people today.” Discuss the statement.",
        "Exam practice: Write a good problem statement for an oral presentation about a poem or a poet. Then write three points you would include."
      ]
    }
  },

  kobletTil: ["en9-victorian-era", "en10-narrated-stories", "en9-holes"],

  kilder: [
    { tittel: "Poetry Foundation", url: "https://www.poetryfoundation.org/" },
    { tittel: "Academy of American Poets: Poets.org", url: "https://poets.org/" },
    { tittel: "BBC Bitesize: poetic techniques", url: "https://www.bbc.co.uk/bitesize/search?q=poetic%20techniques" },
    { tittel: "NDLA: søk på «poetry»", url: "https://ndla.no/search?query=poetry" }
  ],

  kontroller: [
    "Alle siterte dikt er utgitt før 1929, og forfatterne døde for over 70 år siden. Frost (død 1963) er vernet i Norge til og med 2033, så «The Road Not Taken» er bare gjenfortalt, ikke sitert.",
    "Lear: A Book of Nonsense 1846; Blake: Songs of Experience 1794; Wordsworth: Poems in Two Volumes 1807 (teksten her følger 1815-versjonen).",
    "Dickinson: Poems 1891 (Second Series); ca. 1800 dikt, ca. 10 utgitt mens hun levde.",
    "Shakespeares sonetter utgitt 1609, 154 sonetter.",
    "Frost: fire Pulitzerpriser; leste ved Kennedys innsettelse 20.1.1961.",
    "Sjekk at kildelenkene fungerer."
  ]
};
