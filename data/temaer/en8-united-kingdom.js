/* Tema: The United Kingdom (engelsk, 8. trinn)
   Formatering: se forklaringen øverst i sf9-industrialiseringen.js */

window.LV = window.LV || {};
window.LV.tema = {
  id: "en8-united-kingdom",
  fag: "engelsk",
  trinn: 8,
  sprak: "en",
  tittel: "The United Kingdom – Four Nations in One",

  ingress: "Is it England, Britain, Great Britain or the United Kingdom? Many people mix them up – even people who live there. The United Kingdom is one country made up of four nations: England, Scotland, Wales and Northern Ireland. Each has its own history, symbols, traditions and even languages. Let’s find out what makes each of them special.",

  maal: [
    "explain the difference between England, Great Britain and the United Kingdom",
    "describe the four nations of the UK, with their capitals, symbols and languages",
    "discuss what holds the UK together, and why some people want independence"
  ],

  startsporsmal: "What do you think of when you hear the word “British”? Write down five words.",

  avsnitt: [
    {
      tittel: "What’s in a name?",
      tekst: [
        "**Great Britain** is the name of the largest island in the British Isles. It includes three nations: England, Scotland and Wales. **The United Kingdom of Great Britain and Northern Ireland** – the UK for short – is the name of the country. It includes Great Britain plus Northern Ireland, on the island of Ireland. **The British Isles** is a geographical name for all the islands, including the whole island of Ireland.",
        "So England is just one part of the UK. Calling a Scottish or Welsh person “English” can be seen as rude! It is better to call them Scottish, Welsh or British. The UK has about 69 million inhabitants, and the capital of the whole country is **London**."
      ]
    },
    {
      tittel: "How the UK came together",
      tekst: [
        "The four nations were once separate. England conquered Wales in the 1200s, and Wales was formally joined to England by laws in the 1500s. In 1603, the Scottish king James VI also became king of England, so the two countries shared a monarch. In 1707, the **Acts of Union** joined England and Scotland into one kingdom called Great Britain, with one Parliament in London.",
        "Ireland was joined to Great Britain in 1801, creating the United Kingdom of Great Britain and Ireland. But in 1922, most of Ireland broke away and became independent. Six counties in the north-east stayed in the UK as **Northern Ireland**. That is why the country today is called the United Kingdom of Great Britain and Northern Ireland."
      ],
      stoppOgTenk: "Why do you think the nations kept their own identities even after they were united?"
    },
    {
      tittel: "England",
      tekst: [
        "England is the largest nation, with about 84 per cent of the UK’s population. Its capital is London, one of the world’s great cities, with landmarks like the Houses of Parliament, Buckingham Palace and the Tower of London. Other big cities include Birmingham, Manchester, Liverpool and Leeds.",
        "England’s national flag is the red cross of **St George** on a white background, and its national flower is the rose. England is famous for Shakespeare, the Beatles, the Premier League and afternoon tea. The landscape varies from the green hills of the Cotswolds to the lakes and mountains of the Lake District."
      ]
    },
    {
      tittel: "Scotland",
      tekst: [
        "Scotland covers the northern third of Great Britain. Its capital is **Edinburgh**, and its largest city is Glasgow. The Scottish **Highlands** are a wild landscape of mountains, valleys and lakes, called lochs. The most famous is Loch Ness, where some people believe a monster lives! Scotland also has around 800 islands, including the Hebrides, Orkney and Shetland – which were once Norwegian.",
        "Scotland’s flag is the white diagonal cross of **St Andrew** on a blue background, and its symbol is the thistle. Scottish traditions include bagpipes, kilts in different [[tartans|tartan]] and the Highland Games. Besides English, some people speak **Scottish Gaelic** or Scots. Since 1999, Scotland has had its own parliament, which decides on issues like education and health."
      ]
    },
    {
      tittel: "Wales",
      tekst: [
        "Wales lies in the west of Great Britain. Its capital is **Cardiff**. Wales is a land of mountains, castles and coastline. Snowdon, or Yr Wyddfa in Welsh, is the highest mountain in Wales and England. Wales is said to have more castles per square mile than any other country in Europe.",
        "The Welsh flag shows a red dragon on a green and white background. The national symbols are the daffodil and the leek. The **Welsh language**, Cymraeg, is a Celtic language that is very different from English. Around one in five people in Wales can speak it, and all road signs are in both Welsh and English. Wales is also famous for its choirs and its love of rugby."
      ],
      stoppOgTenk: "How is the situation of the Welsh language similar to that of Sámi or nynorsk in Norway?"
    },
    {
      tittel: "Northern Ireland",
      tekst: [
        "Northern Ireland is in the north-east of the island of Ireland. Its capital is **Belfast**, where the Titanic was built. The Giant’s Causeway, with about 40,000 stone columns formed by volcanic activity, is one of its best-known sights.",
        "Northern Ireland has a difficult history. Many **unionists**, mostly Protestants, want to stay in the UK. Many **nationalists**, mostly Catholics, would like to join the Republic of Ireland. From the late 1960s to 1998, a violent conflict known as **the Troubles** cost more than 3,500 lives. The [[Good Friday Agreement]] in 1998 brought peace and a shared government, where both sides must work together."
      ]
    },
    {
      tittel: "Together or apart?",
      tekst: [
        "What holds the UK together? The four nations share a monarch, a Parliament in Westminster, a currency (the pound) and a lot of history. The Union Jack, the UK flag, combines the crosses of England, Scotland and Ireland. But Wales, Scotland and Northern Ireland have their own parliaments or assemblies that make decisions on many local issues. This is called [[devolution]].",
        "Some people in Scotland want full independence. In a [[referendum]] in 2014, 55 per cent of Scots voted to stay in the UK. But in 2016, the UK as a whole voted to leave the European Union, while most Scots and Northern Irish voted to stay. Since then, the question of independence has been discussed again. The future of the UK is still an open question."
      ]
    }
  ],

  tidslinje: [
    { dato: "1284", tekst: "England conquers Wales." },
    { dato: "1603", tekst: "The Scottish king James VI also becomes king of England." },
    { dato: "1707", tekst: "The Acts of Union join England and Scotland into Great Britain." },
    { dato: "1801", tekst: "Ireland becomes part of the United Kingdom." },
    { dato: "1922", tekst: "Most of Ireland becomes independent. Northern Ireland stays in the UK." },
    { dato: "1998", tekst: "The Good Friday Agreement brings peace to Northern Ireland." },
    { dato: "1999", tekst: "Scotland and Wales get their own parliament and assembly." },
    { dato: "2014", tekst: "Scotland votes to stay in the UK in an independence referendum." },
    { dato: "2016", tekst: "The UK votes to leave the European Union (Brexit)." }
  ],

  personer: [
    { navn: "James VI and I", levde: "1566–1625", rolle: "King of Scotland and England", tekst: "He was king of Scotland from childhood, and in 1603 he also became king of England and Ireland. For the first time, the two kingdoms on the island of Great Britain shared a monarch. He married a Danish-Norwegian princess, Anne." },
    { navn: "Robert Burns", levde: "1759–1796", rolle: "Scotland’s national poet", tekst: "He wrote poems and songs in the Scots language. People all over the world sing his song “Auld Lang Syne” on New Year’s Eve, and Scots celebrate his birthday every year on 25 January with a special supper." }
  ],

  ord: {
    "tartan": "tartan, rutemønster – a pattern of coloured stripes and squares used on Scottish kilts.",
    "Good Friday Agreement": "Langfredagsavtalen – the peace agreement from 1998 that ended most of the violence in Northern Ireland.",
    "devolution": "selvstyre, desentralisering – when power is moved from the central government to regional parliaments.",
    "referendum": "folkeavstemning – a vote where all citizens decide on one question."
  },

  sammendrag: [
    "The United Kingdom consists of England, Scotland, Wales and Northern Ireland. Great Britain is the largest island.",
    "England and Scotland were united in 1707, and Northern Ireland stayed in the UK when Ireland became independent in 1922.",
    "England: capital London, St George’s cross, the rose.",
    "Scotland: capital Edinburgh, the Highlands, St Andrew’s cross, Gaelic.",
    "Wales: capital Cardiff, the red dragon, the Welsh language. Northern Ireland: capital Belfast, the Troubles and the Good Friday Agreement.",
    "The nations share a monarch and a Parliament, but have their own parliaments. Some Scots want independence."
  ],

  oppgaver: {
    1: {
      finn: [
        "Which four nations make up the UK?",
        "What are the capitals of the four nations?",
        "What is the Welsh language called in Welsh?"
      ],
      forsta: [
        "Explain the difference between Great Britain and the United Kingdom.",
        "Explain why you should not call a Scottish person English."
      ],
      diskuter: [
        { tekst: "Which of the four nations would you most like to visit? Tell your partner why.", partner: true }
      ]
    },
    2: {
      finn: [
        "Find one symbol, one landmark and one tradition for each of the four nations.",
        "Find three things that hold the UK together."
      ],
      forsta: [
        "Explain what the Troubles were, and how they ended.",
        "Explain what devolution means."
      ],
      diskuter: [
        { tekst: "Should Scotland become an independent country? Find arguments for and against.", partner: true }
      ]
    },
    3: {
      finn: [
        "Use at least three sections to explain how the United Kingdom came to be the country it is today."
      ],
      forsta: [
        "Compare the relationship between the nations in the UK with the union between Norway and Sweden before 1905. What is similar and different?"
      ],
      diskuter: [
        "“The United Kingdom is not very united.” Discuss the statement.",
        "Exam practice: Write a good problem statement for an oral presentation about the UK. Then write three points you would include."
      ]
    }
  },

  kobletTil: ["en8-ireland", "en8-democracy-britain", "en9-british-empire", "sf8-unionen-1905"],

  kilder: [
    { tittel: "BBC Bitesize: search “United Kingdom”", url: "https://www.bbc.co.uk/bitesize/search?q=united%20kingdom" },
    { tittel: "VisitBritain", url: "https://www.visitbritain.com/" },
    { tittel: "Britannica: United Kingdom", url: "https://www.britannica.com/place/United-Kingdom" },
    { tittel: "NDLA: søk på «United Kingdom»", url: "https://ndla.no/search?query=united+kingdom" }
  ],

  kontroller: [
    "UK-befolkning ca. 69 millioner (ONS 2024); England ca. 84 %.",
    "Wales erobret 1282–1284; Laws in Wales Acts 1535/1542; Union of the Crowns 1603; Acts of Union 1707; Irland 1801; Irish Free State 1922.",
    "Skottland: ca. 790–800 øyer; Orknøy og Shetland norrøne fram til 1468–69.",
    "Walisisk: ca. 18 % (folketelling 2021) til ca. 28 % (Annual Population Survey) – teksten sier «one in five», sjekk.",
    "Giant’s Causeway ca. 40 000 søyler; The Troubles over 3 500 drepte; Langfredagsavtalen 10.4.1998.",
    "Skotsk folkeavstemning 18.9.2014: 55,3 % nei; Brexit 23.6.2016: Skottland 62 % remain, Nord-Irland 56 % remain.",
    "Snowdon/Yr Wyddfa høyeste fjell i Wales og England.",
    "James VI giftet seg med Anna av Danmark (datter av Frederik 2. av Danmark-Norge), bryllupet var i Oslo 1589.",
    "Sjekk at kildelenkene fungerer."
  ]
};
