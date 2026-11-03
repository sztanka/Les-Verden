/* Mysterier – database for generatoren (engelsk).
   Hver «verden» har personer, gjenstander og steder med egenskaper som brukes i ledetrådene.
   Personer: hoyde (tall/short), oyne (blue/brown/green/grey), har (dark/fair/red/grey), hand (left/right)
   Gjenstander: vekt (light/medium/heavy), materiale (metal/wood/glass/cloth/paper/stone/plastic)
   Steder: ute (true = utendørs) */
window.LV = window.LV || {};
LV.mysteriumVerdener = [
  {
    id: "manor", tittel: "Murder at Maplewood Manor", ikon: "🏰",
    intro: "A storm is raging over Maplewood Manor. During the night, the old owner, Lord Ashworth, was found dead. Nobody has left the house – so the killer must still be here. Each suspect was in a different place and had a different weapon.",
    tingOrd: "weapon", tingOrdFlertall: "weapons",
    svarTekst: { sted: "Lord Ashworth's body was found in {sted}.", ting: "Lord Ashworth was killed with {ting}." },
    sporsmal: "Who killed Lord Ashworth, with what weapon, and where?",
    personer: [
      { id: "crimson", navn: "Colonel Crimson", ikon: "🎖️", info: "A retired army officer who tells long war stories.", hoyde: "tall", oyne: "brown", har: "grey", hand: "right" },
      { id: "lavender", navn: "Lady Lavender", ikon: "👒", info: "Lord Ashworth's elegant niece – she will inherit everything.", hoyde: "short", oyne: "blue", har: "fair", hand: "left" },
      { id: "ashgrove", navn: "Doctor Ashgrove", ikon: "🩺", info: "The family doctor, who knows everybody's secrets.", hoyde: "tall", oyne: "grey", har: "dark", hand: "right" },
      { id: "basil", navn: "Chef Basil", ikon: "👨‍🍳", info: "A hot-tempered cook who hates cold soup.", hoyde: "short", oyne: "brown", har: "dark", hand: "left" },
      { id: "marigold", navn: "Miss Marigold", ikon: "🌼", info: "A young gardener with mud on her boots.", hoyde: "short", oyne: "green", har: "red", hand: "right" },
      { id: "graves", navn: "Butler Graves", ikon: "🤵", info: "He has served the family for forty years – and sees everything.", hoyde: "tall", oyne: "blue", har: "grey", hand: "right" },
      { id: "rouge", navn: "Madame Rouge", ikon: "💃", info: "A famous singer who came for the party and stayed for the storm.", hoyde: "tall", oyne: "green", har: "red", hand: "left" }
    ],
    ting: [
      { id: "candlestick", navn: "the silver candlestick", ikon: "🕯️", vekt: "medium", materiale: "metal" },
      { id: "rope", navn: "the rope", ikon: "🪢", vekt: "light", materiale: "cloth" },
      { id: "teacup", navn: "the poisoned teacup", ikon: "☕", vekt: "light", materiale: "glass" },
      { id: "shears", navn: "the garden shears", ikon: "✂️", vekt: "medium", materiale: "metal" },
      { id: "book", navn: "the heavy dictionary", ikon: "📕", vekt: "medium", materiale: "paper" },
      { id: "bust", navn: "the marble bust", ikon: "🗿", vekt: "heavy", materiale: "stone" },
      { id: "stick", navn: "the walking stick", ikon: "🦯", vekt: "light", materiale: "wood" }
    ],
    steder: [
      { id: "library", navn: "the library", ikon: "📚", ute: false },
      { id: "ballroom", navn: "the ballroom", ikon: "🎻", ute: false },
      { id: "greenhouse", navn: "the greenhouse", ikon: "🪴", ute: false },
      { id: "maze", navn: "the hedge maze", ikon: "🌳", ute: true },
      { id: "cellar", navn: "the wine cellar", ikon: "🍷", ute: false },
      { id: "rosegarden", navn: "the rose garden", ikon: "🌹", ute: true },
      { id: "kitchen", navn: "the kitchen", ikon: "🍳", ute: false }
    ]
  },
  {
    id: "school", tittel: "The Missing Trophy at Oakfield School", ikon: "🏆",
    intro: "Oakfield School has just won the national quiz championship – but this morning, the golden trophy was gone! Someone has taken it and hidden it. Each suspect was in a different place and had a different item.",
    tingOrd: "item", tingOrdFlertall: "items",
    svarTekst: { sted: "The trophy was hidden in {sted}.", ting: "The thief used {ting} to hide the trophy." },
    sporsmal: "Who took the trophy, with which item, and where?",
    personer: [
      { id: "miller", navn: "Coach Miller", ikon: "🏃", info: "The PE teacher. He thinks sport deserves more trophies than quizzes.", hoyde: "tall", oyne: "blue", har: "fair", hand: "right" },
      { id: "patel", navn: "Ms Patel", ikon: "📖", info: "The school librarian, who organized the quiz team.", hoyde: "short", oyne: "brown", har: "dark", hand: "right" },
      { id: "tom", navn: "Tom the Prankster", ikon: "😜", info: "A Year 9 student famous for his practical jokes.", hoyde: "short", oyne: "green", har: "red", hand: "left" },
      { id: "zoe", navn: "Zoe Quick", ikon: "⚡", info: "The quiz team captain. She answered the winning question.", hoyde: "tall", oyne: "grey", har: "dark", hand: "left" },
      { id: "brooks", navn: "Mr Brooks", ikon: "🧹", info: "The caretaker, who has keys to every room.", hoyde: "tall", oyne: "brown", har: "grey", hand: "right" },
      { id: "lily", navn: "Lily Chen", ikon: "🎨", info: "An art student who wants to paint the trophy.", hoyde: "short", oyne: "brown", har: "dark", hand: "left" },
      { id: "grant", navn: "Head Teacher Grant", ikon: "👔", info: "The head teacher, who wants the trophy in her office.", hoyde: "tall", oyne: "green", har: "grey", hand: "right" }
    ],
    ting: [
      { id: "key", navn: "the spare key", ikon: "🔑", vekt: "light", materiale: "metal" },
      { id: "ladder", navn: "the ladder", ikon: "🪜", vekt: "heavy", materiale: "wood" },
      { id: "backpack", navn: "the backpack", ikon: "🎒", vekt: "light", materiale: "cloth" },
      { id: "skateboard", navn: "the skateboard", ikon: "🛹", vekt: "medium", materiale: "wood" },
      { id: "umbrella", navn: "the umbrella", ikon: "☂️", vekt: "light", materiale: "cloth" },
      { id: "hockeystick", navn: "the hockey stick", ikon: "🏑", vekt: "medium", materiale: "wood" },
      { id: "lunchbox", navn: "the lunchbox", ikon: "🍱", vekt: "light", materiale: "plastic" }
    ],
    steder: [
      { id: "gym", navn: "the gym", ikon: "🏀", ute: false },
      { id: "library", navn: "the library", ikon: "📚", ute: false },
      { id: "lab", navn: "the science lab", ikon: "🧪", ute: false },
      { id: "canteen", navn: "the canteen", ikon: "🍕", ute: false },
      { id: "playground", navn: "the playground", ikon: "🛝", ute: true },
      { id: "musicroom", navn: "the music room", ikon: "🎸", ute: false },
      { id: "pitch", navn: "the football pitch", ikon: "⚽", ute: true }
    ]
  },
  {
    id: "space", tittel: "Sabotage on Space Station Aurora", ikon: "🚀",
    intro: "Alarm! The oxygen system on Space Station Aurora has been sabotaged. The crew must find the saboteur before the next supply ship arrives. Each crew member was in a different part of the station and had a different piece of equipment.",
    tingOrd: "tool", tingOrdFlertall: "tools",
    svarTekst: { sted: "The sabotage happened in {sted}.", ting: "The saboteur used {ting}." },
    sporsmal: "Who sabotaged the station, with which tool, and where?",
    personer: [
      { id: "nova", navn: "Commander Nova", ikon: "👩‍🚀", info: "The strict commander of the station.", hoyde: "tall", oyne: "grey", har: "dark", hand: "right" },
      { id: "rook", navn: "Engineer Rook", ikon: "🔧", info: "He knows every bolt on the station – and complains about all of them.", hoyde: "short", oyne: "brown", har: "red", hand: "left" },
      { id: "vega", navn: "Doctor Vega", ikon: "🧬", info: "The station's doctor and biologist.", hoyde: "tall", oyne: "green", har: "fair", hand: "right" },
      { id: "orion", navn: "Pilot Orion", ikon: "🛸", info: "A daredevil pilot who wants to go home early.", hoyde: "tall", oyne: "blue", har: "fair", hand: "left" },
      { id: "k9", navn: "Robot K-9", ikon: "🤖", info: "A cleaning robot with a very curious program.", hoyde: "short", oyne: "blue", har: "grey", hand: "right" },
      { id: "luna", navn: "Scientist Luna", ikon: "🔭", info: "An astronomer who never sleeps.", hoyde: "short", oyne: "grey", har: "dark", hand: "left" },
      { id: "sol", navn: "Chef Sol", ikon: "🥫", info: "The space chef, who is tired of food in tubes.", hoyde: "tall", oyne: "brown", har: "grey", hand: "right" }
    ],
    ting: [
      { id: "laser", navn: "the laser cutter", ikon: "🔦", vekt: "medium", materiale: "metal" },
      { id: "wrench", navn: "the giant wrench", ikon: "🔧", vekt: "heavy", materiale: "metal" },
      { id: "chip", navn: "the data chip", ikon: "💾", vekt: "light", materiale: "plastic" },
      { id: "tank", navn: "the oxygen tank", ikon: "🧯", vekt: "heavy", materiale: "metal" },
      { id: "tablet", navn: "the tablet", ikon: "📱", vekt: "light", materiale: "glass" },
      { id: "tape", navn: "the duct tape", ikon: "🩹", vekt: "light", materiale: "plastic" },
      { id: "rope", navn: "the safety cable", ikon: "🪢", vekt: "medium", materiale: "cloth" }
    ],
    steder: [
      { id: "command", navn: "the command deck", ikon: "🖥️", ute: false },
      { id: "engine", navn: "the engine room", ikon: "⚙️", ute: false },
      { id: "garden", navn: "the greenhouse pod", ikon: "🌱", ute: false },
      { id: "cargobay", navn: "the open cargo bay", ikon: "🌌", ute: true },
      { id: "lab", navn: "the laboratory", ikon: "🧫", ute: false },
      { id: "dome", navn: "the observation dome", ikon: "🪐", ute: false },
      { id: "dock", navn: "the docking port", ikon: "🛰️", ute: true }
    ]
  },
  {
    id: "pirates", tittel: "The Stolen Map on the Black Gull", ikon: "🏴‍☠️",
    intro: "The pirate ship Black Gull is anchored near a secret island. Last night, the treasure map disappeared from the captain's chest! Someone on board took it. Each pirate was in a different place on the ship and had a different item.",
    tingOrd: "item", tingOrdFlertall: "items",
    svarTekst: { sted: "The map was found in {sted}.", ting: "The thief opened the chest with {ting}." },
    sporsmal: "Who stole the map, with which item, and where?",
    personer: [
      { id: "redbeard", navn: "Captain Redbeard", ikon: "🏴‍☠️", info: "The loud captain who owns the map.", hoyde: "tall", oyne: "green", har: "red", hand: "right" },
      { id: "molly", navn: "First Mate Molly", ikon: "⚓", info: "The smartest sailor on board – she wants her own ship.", hoyde: "short", oyne: "blue", har: "fair", hand: "left" },
      { id: "barnaby", navn: "Cook Barnaby", ikon: "🍲", info: "A cook whose fish soup is a crime in itself.", hoyde: "short", oyne: "brown", har: "grey", hand: "right" },
      { id: "pip", navn: "Cabin Boy Pip", ikon: "🧒", info: "The youngest on board, small enough to hide anywhere.", hoyde: "short", oyne: "grey", har: "dark", hand: "left" },
      { id: "silva", navn: "Navigator Silva", ikon: "🧭", info: "She can read the stars – and maps.", hoyde: "tall", oyne: "brown", har: "dark", hand: "right" },
      { id: "gus", navn: "Old Salt Gus", ikon: "🦜", info: "An old sailor with a talkative parrot.", hoyde: "tall", oyne: "blue", har: "grey", hand: "left" }
    ],
    ting: [
      { id: "cutlass", navn: "the cutlass", ikon: "🗡️", vekt: "medium", materiale: "metal" },
      { id: "cannonball", navn: "the cannonball", ikon: "⚫", vekt: "heavy", materiale: "metal" },
      { id: "rope", navn: "the rope", ikon: "🪢", vekt: "light", materiale: "cloth" },
      { id: "lantern", navn: "the lantern", ikon: "🏮", vekt: "medium", materiale: "glass" },
      { id: "telescope", navn: "the telescope", ikon: "🔭", vekt: "light", materiale: "metal" },
      { id: "bottle", navn: "the empty bottle", ikon: "🍾", vekt: "light", materiale: "glass" },
      { id: "oar", navn: "the oar", ikon: "🛶", vekt: "heavy", materiale: "wood" }
    ],
    steder: [
      { id: "crowsnest", navn: "the crow's nest", ikon: "🪺", ute: true },
      { id: "cabin", navn: "the captain's cabin", ikon: "🛏️", ute: false },
      { id: "galley", navn: "the galley", ikon: "🍳", ute: false },
      { id: "deck", navn: "the main deck", ikon: "⛵", ute: true },
      { id: "hold", navn: "the cargo hold", ikon: "📦", ute: false },
      { id: "rowboat", navn: "the rowing boat", ikon: "🚣", ute: true }
    ]
  }
];
LV.mysteriumMotiver = [
  { id: "money", navn: "money", ikon: "💰", tekst: "wanted to get rich" },
  { id: "jealousy", navn: "jealousy", ikon: "💚", tekst: "was jealous" },
  { id: "revenge", navn: "revenge", ikon: "😠", tekst: "wanted revenge" },
  { id: "fame", navn: "fame", ikon: "⭐", tekst: "wanted to become famous" },
  { id: "fear", navn: "fear", ikon: "😨", tekst: "was afraid of a secret coming out" },
  { id: "curiosity", navn: "curiosity", ikon: "🧐", tekst: "just had to know" },
  { id: "love", navn: "love", ikon: "❤️", tekst: "did it for love" }
];
LV.mysteriumNivaer = [
  { id: "easy", navn: "Easy", norsk: "Lett", ikon: "🔍", n: 3, motiv: false, beskrivelse: "3 suspects, 3 items, 3 places. Some clues tell you things directly." },
  { id: "medium", navn: "Medium", norsk: "Middels", ikon: "🕵️", n: 4, motiv: false, beskrivelse: "4 suspects, 4 items, 4 places. More clues about features like height, eyes and materials." },
  { id: "hard", navn: "Hard", norsk: "Vanskelig", ikon: "🧠", n: 4, motiv: true, beskrivelse: "4 suspects, items, places – and motives. Almost no direct clues." },
  { id: "expert", navn: "Expert", norsk: "Ekspert", ikon: "🎩", n: 5, motiv: false, beskrivelse: "5 suspects, 5 items, 5 places. Tricky clues for master detectives." },
  { id: "master", navn: "Master", norsk: "Mester", ikon: "🎭", n: 4, motiv: false, logn: true, beskrivelse: "4 suspects. Every suspect makes a statement – and the guilty one is lying!" }
];
