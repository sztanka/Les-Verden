window.LV = window.LV || {};
LV.grammatikk = {
  id: "homographs",
  tittel: "Homographs",
  ikon: "✍️",
  ingress: "Homographs are words that are spelled the same but have different meanings. Some of them are also pronounced differently.",
  opphav: "homo = same, graph = writing (Greek)",
  forklaring: [
    "A **homograph** is a word that is written exactly like another word, but has a different meaning. You can only tell which word it is from the **context** – the words around it.",
    "There are two kinds of homographs:",
    "1. Homographs that **sound the same**, like *bat* (the animal) and *bat* (for baseball). These are also called **homonyms**.",
    "2. Homographs that **sound different**, like *lead* /liːd/ (to show the way) and *lead* /led/ (a heavy metal). These are also called **heteronyms**.",
    "Homographs are important when you read aloud. If you choose the wrong pronunciation, the sentence may sound strange – or mean something completely different!"
  ],
  norsk: "Homografer er ord som skrives likt, men som betyr noe forskjellig. Noen uttales også likt (*bat* = flaggermus og balltre). Andre uttales forskjellig (*lead* = lede og *lead* = bly). Du må lese hele setningen for å forstå hvilket ord det er. Norsk har også homografer, for eksempel *tak* (på et hus) og *tak* (å ta tak i noe).",
  husk: [
    "When you read a homograph, look at the **context**: Is it a noun or a verb? What is the sentence about?",
    "All homonyms and all heteronyms are homographs.",
    "Practise reading the example sentences aloud – the pronunciation can change the meaning."
  ],
  grupper: [
    { tittel: "Homographs that sound the same", tekst: "Same spelling, same pronunciation, different meaning (= homonyms).", ord: [
      [ { ord: "bat", betyr: "a small flying animal", norsk: "flaggermus", eks: "A bat flew out of the cave." }, { ord: "bat", betyr: "a stick used to hit the ball in baseball and cricket", norsk: "balltre, kølle", eks: "He hit the ball with the bat." } ],
      [ { ord: "bank", betyr: "a place where you keep money", norsk: "bank", eks: "I put my money in the bank." }, { ord: "bank", betyr: "the land along the side of a river", norsk: "elvebredd", eks: "We had a picnic on the river bank." } ],
      [ { ord: "bark", betyr: "the sound a dog makes", norsk: "bjeffe; bjeff", eks: "The dog started to bark." }, { ord: "bark", betyr: "the outer layer of a tree", norsk: "bark", eks: "The bark of the old tree was rough." } ],
      [ { ord: "match", betyr: "a game between two teams", norsk: "kamp", eks: "We watched the football match." }, { ord: "match", betyr: "a small stick that makes fire", norsk: "fyrstikk", eks: "She lit a match." } ],
      [ { ord: "spring", betyr: "the season after winter", norsk: "vår", eks: "The flowers come out in spring." }, { ord: "spring", betyr: "a metal coil that jumps back", norsk: "fjær (spiral)", eks: "The old sofa has broken springs." } ],
      [ { ord: "light", betyr: "what makes it possible to see", norsk: "lys", eks: "Turn on the light." }, { ord: "light", betyr: "not heavy", norsk: "lett", eks: "My bag is very light." } ]
    ] },
    { tittel: "Homographs that sound different", tekst: "Same spelling, different pronunciation, different meaning (= heteronyms).", ord: [
      [ { ord: "lead", uttale: "/liːd/ – like «leed»", betyr: "to show the way; to be in charge", norsk: "lede", eks: "She will lead the team." }, { ord: "lead", uttale: "/led/ – like «led»", betyr: "a heavy grey metal", norsk: "bly", eks: "Old water pipes were made of lead." } ],
      [ { ord: "tear", uttale: "/tɪə/ – rhymes with «ear»", betyr: "a drop of water from your eye", norsk: "tåre", eks: "A tear ran down his face." }, { ord: "tear", uttale: "/teə/ – rhymes with «bear»", betyr: "to pull something apart", norsk: "rive (i stykker)", eks: "Don't tear the paper." } ],
      [ { ord: "wind", uttale: "/wɪnd/ – rhymes with «pinned»", betyr: "moving air", norsk: "vind", eks: "The wind is strong today." }, { ord: "wind", uttale: "/waɪnd/ – rhymes with «kind»", betyr: "to turn or twist something", norsk: "vikle, trekke opp; svinge", eks: "The road winds through the mountains." } ],
      [ { ord: "bow", uttale: "/baʊ/ – rhymes with «cow»", betyr: "to bend your body forward", norsk: "bukke, bøye seg", eks: "The actors bowed to the audience." }, { ord: "bow", uttale: "/bəʊ/ – rhymes with «go»", betyr: "a knot with loops; a weapon for shooting arrows", norsk: "sløyfe; bue", eks: "She tied a bow in her hair." } ],
      [ { ord: "live", uttale: "/lɪv/ – rhymes with «give»", betyr: "to have your home somewhere; to be alive", norsk: "bo; leve", eks: "I live in Norway." }, { ord: "live", uttale: "/laɪv/ – rhymes with «five»", betyr: "happening now, not recorded; alive", norsk: "direkte; levende", eks: "The concert is shown live on TV." } ],
      [ { ord: "close", uttale: "/kləʊz/ – ends in a z-sound", betyr: "to shut", norsk: "lukke, stenge", eks: "Please close the door." }, { ord: "close", uttale: "/kləʊs/ – ends in an s-sound", betyr: "near", norsk: "nær", eks: "We live close to the school." } ]
    ] }
  ],
  obs: { tittel: "Homographs in Norwegian", tekst: [
    "Norwegian also has homographs. Can you explain the two meanings of these Norwegian words in English?",
    "*tak* (et tak på huset / ta tak i noe) · *lyst* (et lyst rom / ha lyst på noe) · *fly* (et fly / fly fra noe) · *egg* (et egg / eggen på en kniv) · *bønner* (bønner i suppa / bønner til Gud) · *tømmer* (tømmer fra skogen / hun tømmer søpla)"
  ] },
  ovelser: [
    { s: "In which sentence does «lead» rhyme with «bed»?", valg: ["Pencils used to contain lead.", "Who will lead the group?", "Follow my lead."], riktig: 0, forklaring: "*Lead* /led/ is the metal. In the other sentences, *lead* /liːd/ means to show the way." },
    { s: "«The wind blew the leaves away.» How is «wind» pronounced here?", valg: ["Like «pinned»", "Like «kind»"], riktig: 0, forklaring: "Moving air is *wind* /wɪnd/." },
    { s: "«I saw a bat in the attic.» What is a bat here?", valg: ["A flying animal", "A stick for baseball"], riktig: 0, forklaring: "An animal in the attic makes more sense than a stick!" },
    { s: "«She had a tear in her eye.» What does «tear» mean?", valg: ["A drop of water from the eye", "A hole in a piece of clothing"], riktig: 0, forklaring: "In your eye, a *tear* /tɪə/ is a drop of water." },
    { s: "«The shop is close to the station.» How is «close» pronounced?", valg: ["With an s-sound: /kləʊs/", "With a z-sound: /kləʊz/"], riktig: 0, forklaring: "*Close* meaning *near* ends in an s-sound." },
    { s: "Which word is a homograph?", valg: ["bank", "their", "knight"], riktig: 0, forklaring: "*Bank* has two meanings with the same spelling. *Their* and *knight* are homophones." },
    { s: "All homographs …", valg: ["are spelled the same", "are pronounced the same", "are spelled differently"], riktig: 0, forklaring: "*Graph* means writing: homographs are always written the same." },
    { s: "«The band will play live tonight.» What does «live» mean here?", valg: ["Not recorded – happening now", "To have your home somewhere"], riktig: 0, forklaring: "*Live* /laɪv/ means happening now, in front of an audience." }
  ],
  oppgaver: [
    "Choose three homographs from this page. Write two sentences for each word that show the two different meanings.",
    "Find a Norwegian homograph (for example *tak* or *lyst*). Explain the two meanings in English.",
    "Read the example sentences aloud to a partner. Can your partner hear which meaning you mean?"
  ],
  se: ["homonyms", "heteronyms", "homophones"]
};
