/* Landside: The United Kingdom (engelsk)
   Formatering: **fet** og [[visning|nøkkel]] for ordforklaringer (nøkkelen må finnes i «ord»). */

window.LV = window.LV || {};
window.LV.land = {
  ingress: "The United Kingdom of Great Britain and Northern Ireland – the UK for short – is one country made up of four nations: England, Scotland, Wales and Northern Ireland. It is a small island country, but its history, language and culture have shaped the whole world.",

  fakta: [
    ["Full name", "The United Kingdom of Great Britain and Northern Ireland"],
    ["Capital", "London"],
    ["Population", "about 69 million"],
    ["Area", "about 244,000 km² (Norway: 385,000 km²)"],
    ["Languages", "English; also Welsh, Scottish Gaelic, Scots, Irish and Ulster Scots"],
    ["Currency", "pound sterling (£)"],
    ["Form of government", "[[constitutional monarchy]] and [[parliamentary democracy]]"],
    ["Head of state", "King Charles III (since 2022)"],
    ["Highest mountain", "Ben Nevis, Scotland (1,345 m)"],
    ["Longest river", "the Severn (354 km)"],
    ["National days", "each nation has its own saint’s day"],
    ["Fun fact", "Cars drive on the left"]
  ],

  nasjonerTittel: "The four nations",
  nasjoner: [
    { navn: "England", flagg: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", fakta: [["Capital", "London"], ["Population", "about 58 million"], ["Symbol", "the red rose"], ["Saint’s day", "St George – 23 April"]],
      tekst: "The largest nation, with more than eight in ten of the UK’s people. Its flag is the red cross of St George. Big cities include London, Birmingham, Manchester and Liverpool." },
    { navn: "Scotland", flagg: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", fakta: [["Capital", "Edinburgh"], ["Population", "about 5.5 million"], ["Symbol", "the thistle"], ["Saint’s day", "St Andrew – 30 November"]],
      tekst: "The north of Great Britain, with the Highlands, lochs and about 800 islands. It has its own parliament, legal system and church. Some people speak Scottish Gaelic or Scots." },
    { navn: "Wales", flagg: "🏴󠁧󠁢󠁷󠁬󠁳󠁿", fakta: [["Capital", "Cardiff"], ["Population", "about 3.1 million"], ["Symbol", "the daffodil and the leek"], ["Saint’s day", "St David – 1 March"]],
      tekst: "A land of mountains, castles and choirs. The Welsh language, Cymraeg, is one of the oldest languages in Europe, and road signs are in both Welsh and English." },
    { navn: "Northern Ireland", flagg: "", fakta: [["Capital", "Belfast"], ["Population", "about 1.9 million"], ["Symbol", "the shamrock and flax"], ["Saint’s day", "St Patrick – 17 March"]],
      tekst: "The north-east of the island of Ireland. After a long conflict known as the Troubles, the Good Friday Agreement of 1998 brought peace and a shared government." }
  ],

  seksjoner: [
    {
      id: "geografi", ikon: "🏞️", tittel: "Geography and climate",
      tekst: [
        "The UK lies off the north-west coast of Europe. It consists of the island of **Great Britain**, the north-east part of the island of **Ireland** and more than 6,000 smaller islands. The English Channel separates it from France – at the narrowest point only 33 km. Since 1994, a railway tunnel under the sea, the Channel Tunnel, has connected the two countries.",
        "The landscape changes from the flat, green farmland of southern and eastern England to the hills of the Lake District and the mountains of Wales and the Scottish Highlands. The longest rivers are the Severn and the Thames, which flows through London.",
        "The UK has a mild, [[maritime climate]]. Thanks to the Gulf Stream, winters are milder than in Norway, and summers are seldom very hot. It rains often, especially in the west – but not as much as many people think. London gets less rain per year than Rome!"
      ]
    },
    {
      id: "historie", ikon: "🏰", tittel: "A short history",
      tekst: [
        "People have lived in Britain for thousands of years – Stonehenge was built around 5,000 years ago. The Romans conquered much of Britain in AD 43 and stayed for almost 400 years. After them came Angles, Saxons and later Vikings from Norway and Denmark. In 1066, the Normans from France conquered England at the Battle of Hastings.",
        "Over the centuries, England took control of Wales, and in 1707 England and Scotland were united as **Great Britain**. Ireland was added in 1801. From the 1600s to the 1900s, Britain built the largest [[empire]] in history, and English spread around the world. Britain was also the first country to have an Industrial Revolution.",
        "In the 1900s, Britain fought in two world wars. Most of Ireland became independent in 1922, and after 1945 most of the colonies became independent too. Many people from the former colonies moved to Britain, making it a [[multicultural]] society. In 2016, a majority voted to leave the European Union, and the UK left in 2020 – a decision known as **Brexit**."
      ],
      stoppOgTenk: "Why do you think it matters to many Scots and Welsh people that the UK is not just called “England”?"
    },
    {
      id: "politikk", ikon: "🏛️", tittel: "Politics",
      tekst: [
        "The UK is a [[constitutional monarchy]]. The King is head of state, but he has almost no political power. The real power lies with **Parliament** in Westminster, London, which has two houses: the elected **House of Commons** with 650 Members of Parliament (MPs), and the unelected **House of Lords**.",
        "The leader of the party with the most seats in the House of Commons usually becomes **Prime Minister** and lives at 10 Downing Street. General elections are held at least every five years, using a system called **first past the post**: the candidate with the most votes in each area wins the seat. The two biggest parties have traditionally been the **Conservative Party** and the **Labour Party**.",
        "Scotland, Wales and Northern Ireland have their own parliaments or assemblies that decide on things like schools and health. This is called [[devolution]]. In 2014, Scotland held a referendum on independence, and 55 per cent voted to stay in the UK – but the question is still debated."
      ]
    },
    {
      id: "spraak", ikon: "🗣️", tittel: "English in the UK",
      tekst: [
        "English was born in England, and the UK is still home to an amazing variety of [[accents|accent]]. The “standard” British accent, often heard on the BBC, is called **Received Pronunciation (RP)**, but only a small part of the population speaks it. In London, you may hear **Cockney**; in Liverpool, **Scouse**; in Newcastle, **Geordie**; and in Birmingham, **Brummie**. Scottish, Welsh and Northern Irish English all have their own sounds and words.",
        "The UK also has other languages. **Welsh** is spoken by about one in five people in Wales, and **Scottish Gaelic** by a small number of people in the Highlands and islands. Many British people also speak languages like Polish, Punjabi, Urdu, Bengali and Arabic at home. Try the accents map quiz on this page to find out where the different accents are spoken!"
      ]
    },
    {
      id: "kultur", ikon: "🎭", tittel: "People and culture",
      tekst: [
        "The UK has given the world writers like **William Shakespeare**, Jane Austen, Charles Dickens and J. K. Rowling, and bands like the Beatles, the Rolling Stones, Queen and Coldplay. Football, rugby, cricket, tennis and golf all got their modern rules in Britain.",
        "Typical British traditions include afternoon tea, fish and chips, the Sunday roast and Bonfire Night on 5 November. Today, the UK is a multicultural society: London is one of the most diverse cities in the world, and curry is one of the most popular dishes in the country. Most people are Christian or have no religion, but there are also large Muslim, Hindu, Sikh and Jewish communities."
      ]
    }
  ],

  severdigheter: [
    { navn: "Big Ben and the Houses of Parliament", sted: "London, England", tekst: "Big Ben is really the name of the great bell inside the clock tower, which is officially called the Elizabeth Tower." },
    { navn: "The Tower of London", sted: "London, England", tekst: "A castle almost 1,000 years old that has been a royal palace, a prison and a place of execution. The Crown Jewels are kept here." },
    { navn: "Stonehenge", sted: "Wiltshire, England", tekst: "A prehistoric stone circle built around 5,000 years ago. Nobody knows exactly what it was used for." },
    { navn: "The Lake District", sted: "Cumbria, England", tekst: "A national park with lakes and mountains that inspired poets like William Wordsworth." },
    { navn: "Edinburgh Castle", sted: "Edinburgh, Scotland", tekst: "A castle on top of an old volcano in the middle of Scotland’s capital." },
    { navn: "Loch Ness", sted: "The Scottish Highlands", tekst: "A deep, dark lake – home of the legendary monster Nessie, according to the stories." },
    { navn: "Eryri (Snowdonia)", sted: "North Wales", tekst: "A national park with Yr Wyddfa (Snowdon), the highest mountain in Wales." },
    { navn: "The Giant’s Causeway", sted: "County Antrim, Northern Ireland", tekst: "About 40,000 stone columns formed by volcanic activity. A legend says a giant built it." },
    { navn: "Hadrian’s Wall", sted: "Northern England", tekst: "A wall built by the Romans around AD 122 to mark the northern edge of their empire." }
  ],

  tidslinje: [
    { dato: "c. 3000 BC", tekst: "Building of Stonehenge begins." },
    { dato: "AD 43", tekst: "The Romans invade Britain." },
    { dato: "1066", tekst: "The Normans conquer England at the Battle of Hastings." },
    { dato: "1215", tekst: "Magna Carta limits the power of the king." },
    { dato: "1707", tekst: "England and Scotland unite as Great Britain." },
    { dato: "1801", tekst: "Ireland becomes part of the United Kingdom." },
    { dato: "1922", tekst: "Most of Ireland becomes independent; Northern Ireland stays in the UK." },
    { dato: "1948", tekst: "The National Health Service (NHS) is founded, and the ship Empire Windrush brings workers from the Caribbean." },
    { dato: "1973", tekst: "The UK joins the European Economic Community (EEC)." },
    { dato: "1998", tekst: "The Good Friday Agreement brings peace to Northern Ireland." },
    { dato: "2016", tekst: "The UK votes to leave the European Union (Brexit)." },
    { dato: "2022", tekst: "Queen Elizabeth II dies after 70 years on the throne, and Charles III becomes king." }
  ],

  ord: {
    "constitutional monarchy": "konstitusjonelt monarki – a system where a king or queen is head of state, but power is limited by law.",
    "parliamentary democracy": "parlamentarisk demokrati – a democracy where the government must have the support of the elected parliament.",
    "maritime climate": "kystklima – a mild, wet climate influenced by the sea.",
    "empire": "imperium – a group of countries or areas ruled by one powerful state.",
    "multicultural": "flerkulturell – with people from many different cultures and backgrounds.",
    "devolution": "selvstyre, desentralisering – when power is moved from the central government to regional parliaments.",
    "accent": "aksent, uttale – the way people from a particular place or group pronounce a language."
  },

  quiz: [
    { s: "Which four nations make up the United Kingdom?", valg: ["England, Scotland, Wales and Northern Ireland", "England, Scotland, Wales and Ireland", "England, Scotland, Ireland and Cornwall", "Great Britain, England, Scotland and Wales"], riktig: 0, forklaring: "The Republic of Ireland is an independent country. Only Northern Ireland is part of the UK." },
    { s: "What is the capital of Wales?", valg: ["Cardiff", "Swansea", "Edinburgh", "Belfast"], riktig: 0 },
    { s: "What is the highest mountain in the UK?", valg: ["Ben Nevis", "Snowdon", "Scafell Pike", "Slieve Donard"], riktig: 0, forklaring: "Ben Nevis in Scotland is 1,345 metres high." },
    { s: "What is “Big Ben”, really?", valg: ["A great bell in the clock tower", "The clock tower itself", "A famous London bridge", "The King’s palace"], riktig: 0, forklaring: "The tower is officially called the Elizabeth Tower." },
    { s: "In which year were England and Scotland united as Great Britain?", valg: ["1707", "1066", "1801", "1922"], riktig: 0 },
    { s: "What is the UK’s currency?", valg: ["The pound sterling", "The euro", "The dollar", "The krone"], riktig: 0 },
    { s: "Which accent is spoken in Liverpool?", valg: ["Scouse", "Geordie", "Cockney", "Brummie"], riktig: 0, forklaring: "Geordie is spoken in Newcastle, Cockney in London and Brummie in Birmingham." },
    { s: "How many MPs sit in the House of Commons?", valg: ["650", "169", "435", "100"], riktig: 0, forklaring: "169 is the number of members of the Norwegian Storting." },
    { s: "Which saint’s day is celebrated in Scotland on 30 November?", valg: ["St Andrew’s Day", "St George’s Day", "St David’s Day", "St Patrick’s Day"], riktig: 0 },
    { s: "When did the UK leave the European Union?", valg: ["2020", "2016", "1973", "2008"], riktig: 0, forklaring: "The referendum was in 2016, but the UK formally left in 2020." },
    { s: "Which stretch of sea separates Great Britain from France?", valg: ["The English Channel", "The Irish Sea", "The North Sea", "The Bay of Biscay"], riktig: 0 },
    { s: "Which language is spoken by about one in five people in Wales?", valg: ["Welsh (Cymraeg)", "Scottish Gaelic", "Irish", "Cornish"], riktig: 0 }
  ],

  finnFakta: [
    "What is the difference between Great Britain and the United Kingdom?",
    "Write down the capital and the saint’s day of each of the four nations.",
    "Why are British winters milder than Norwegian winters?",
    "What does devolution mean? Give an example.",
    "Name four British accents and where they are spoken.",
    "Which events in British history do you think were most important? Choose two from the timeline and explain why."
  ],

  undersok: [
    { tekst: "Who is the Prime Minister of the UK today, and which party does he or she lead? Find out how long the person has been Prime Minister.", lenker: [{ tittel: "GOV.UK: Prime Minister", url: "https://www.gov.uk/government/ministers/prime-minister" }] },
    { tekst: "Choose one British city that is not a capital. Write a short fact file: population, location, famous places and one interesting fact.", lenker: [{ tittel: "VisitBritain", url: "https://www.visitbritain.com/" }] },
    { tekst: "Listen to examples of different British accents. Which one do you find easiest to understand, and which one is hardest? Why?", lenker: [{ tittel: "British Library: Sounds Familiar?", url: "https://www.bl.uk/british-accents-and-dialects" }] },
    { tekst: "Find out more about the Empire Windrush and the “Windrush generation”. Who were they, and why are they important in British history?", lenker: [{ tittel: "BBC Bitesize: Windrush", url: "https://www.bbc.co.uk/bitesize/search?q=windrush" }] },
    { tekst: "Plan a five-day trip to the UK. Which places would you visit, and why? Use the sights on this page and at least one place you find yourself." }
  ],

  kilder: [
    { tittel: "Britannica: United Kingdom", url: "https://www.britannica.com/place/United-Kingdom" },
    { tittel: "UK Parliament", url: "https://www.parliament.uk/" },
    { tittel: "Office for National Statistics", url: "https://www.ons.gov.uk/" },
    { tittel: "NDLA: søk på «United Kingdom»", url: "https://ndla.no/search?query=united+kingdom" }
  ],

  kontroller: [
    "Befolkning: UK ca. 69 mill. (ONS 2024); England ca. 57–58 mill.; Skottland ca. 5,5 mill.; Wales ca. 3,1–3,2 mill.; Nord-Irland ca. 1,9 mill.",
    "Areal ca. 243 600 km².",
    "Over 6 000 øyer (Ordnance Survey: ca. 6 300).",
    "Den engelske kanal: 33 km ved Dover; Kanaltunnelen åpnet 1994.",
    "London ca. 600 mm nedbør per år, Roma ca. 800 mm.",
    "650 MP-er; valg minst hvert femte år.",
    "Skotsk folkeavstemning 2014: 55,3 % nei. Brexit-avstemning 2016, utmeldt 31.1.2020.",
    "Walisisk: ca. 18 % (folketelling 2021) – teksten sier «about one in five».",
    "Nord-Irland har ikke offisielt flagg; derfor står flagg-feltet tomt.",
    "Teksten nevner med vilje ikke hvem som er statsminister – elevene skal finne det ut (oppgave under «Explore more»).",
    "Sjekk at lenkene fungerer."
  ]
};
