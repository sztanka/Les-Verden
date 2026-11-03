/* Historiske mysterier. Personene og hendelsene i bakgrunnen er ekte, men selve gåtene er oppdiktet.
   regel: ["med", [a…], [b…]]  = en av a-ene hører sammen med en av b-ene (samme person-rad)
          ["ikke", [a…], [b…]] = ingen av a-ene hører sammen med noen av b-ene
   Id-er: p:person, t:ting, s:sted, m:motiv.  svar: elementet som avslører hvem det var. */
window.LV = window.LV || {};
LV.mysteriumSaker = [
  {
    id: "eidsvoll-1814", tittel: "Det forsvunne utkastet – Eidsvoll 1814", sprak: "nb", niva: "easy", ikon: "📜", tema: "sf8-1814-grunnloven",
    intro: "Eidsvoll, mai 1814. Riksforsamlingen arbeider dag og natt med Norges nye grunnlov. En kveld forsvinner det viktigste utkastet til Grunnloven fra bordet! Det viser seg at en av de tre mennene har gjemt det – for å beskytte det mot svenske spioner. Hver av dem var på et eget sted og hadde en egen gjenstand.",
    sporsmal: "Hvem gjemte utkastet, med hvilken gjenstand, og hvor?",
    kategorier: [
      { id: "p", navn: "Personer", elementer: [
        { id: "cf", navn: "Christian Frederik", ikon: "👑", info: "Levde 1786–1848.", hint: "Dansk prins og stattholder i Norge. Han ble valgt til konge av Norge 17. mai 1814." },
        { id: "falsen", navn: "Christian Magnus Falsen", ikon: "⚖️", info: "Levde 1782–1830.", hint: "Jurist og sorenskriver. Han skrev et av de viktigste utkastene og blir ofte kalt «Grunnlovens far»." },
        { id: "sverdrup", navn: "Georg Sverdrup", ikon: "📚", info: "Levde 1770–1850.", hint: "Professor i gresk og bibliotekar ved universitetet i Christiania. En av de ivrigste for et selvstendig Norge." }
      ] },
      { id: "t", navn: "Gjenstander", elementer: [
        { id: "penn", navn: "fjærpennen", ikon: "🪶" }, { id: "lakk", navn: "segllakken", ikon: "🔴" }, { id: "lys", navn: "lysestaken", ikon: "🕯️" }
      ] },
      { id: "s", navn: "Steder", elementer: [
        { id: "salen", navn: "riksforsamlingssalen", ikon: "🏛️" }, { id: "bibliotek", navn: "biblioteket", ikon: "📖" }, { id: "hagen", navn: "hagen", ikon: "🌳" }
      ] }
    ],
    ledetrader: [
      { tekst: "Mannen som ble valgt til konge av Norge 17. mai 1814, var ikke i hagen.", regel: ["ikke", ["p:cf"], ["s:hagen"]] },
      { tekst: "Mannen som ofte kalles «Grunnlovens far», hadde fjærpennen.", regel: ["med", ["p:falsen"], ["t:penn"]] },
      { tekst: "Lysestaken stod i biblioteket.", regel: ["med", ["t:lys"], ["s:bibliotek"]] },
      { tekst: "Professoren i gresk var ikke i riksforsamlingssalen.", regel: ["ikke", ["p:sverdrup"], ["s:salen"]] },
      { tekst: "Personen i hagen hadde ikke segllakken.", regel: ["ikke", ["s:hagen"], ["t:lakk"]] }
    ],
    svar: { tekst: "Utkastet ble funnet gjemt i hagen.", element: "s:hagen" },
    losning: { cf: { t: "lakk", s: "salen" }, falsen: { t: "penn", s: "hagen" }, sverdrup: { t: "lys", s: "bibliotek" } },
    historie: [
      "Gåten er oppdiktet, men personene er ekte. Riksforsamlingen møttes på Eidsvoll fra 10. april til 20. mai 1814. Grunnloven ble vedtatt 16. mai og datert og underskrevet 17. mai.",
      "**Christian Magnus Falsen** skrev sammen med Johan Gunder Adler et utkast som fikk stor betydning for den ferdige Grunnloven. **Christian Frederik** ble valgt til konge 17. mai, men måtte gå av allerede samme høst etter krigen med Sverige. **Georg Sverdrup** var professor i gresk og en av lederne for dem som ville ha full selvstendighet."
    ]
  },
  {
    id: "great-exhibition-1851", tittel: "The Diamond at the Great Exhibition – London 1851", sprak: "en", niva: "medium", ikon: "💎", tema: "en9-victorian-era",
    intro: "London, 1851. Six million visitors come to the Great Exhibition in Hyde Park. The most famous object of all is the Koh-i-Noor diamond. One evening, the diamond is quietly moved to a secret hiding place – to keep it safe from thieves. Four famous Victorians were at the exhibition that evening. Each of them was in a different place and had a different object.",
    sporsmal: "Who moved the diamond, with which object, and where?",
    kategorier: [
      { id: "p", navn: "People", elementer: [
        { id: "dickens", navn: "Charles Dickens", ikon: "✒️", info: "1812–1870", hint: "Writer. He wrote Oliver Twist and A Christmas Carol." },
        { id: "nightingale", navn: "Florence Nightingale", ikon: "🏮", info: "1820–1910", hint: "Nurse. During the Crimean War, she became known as «the Lady with the Lamp»." },
        { id: "brunel", navn: "Isambard Kingdom Brunel", ikon: "🎩", info: "1806–1859", hint: "Engineer. He built the Great Western Railway and huge steamships." },
        { id: "lovelace", navn: "Ada Lovelace", ikon: "🧮", info: "1815–1852", hint: "Mathematician. She wrote what is often called the first computer program." }
      ] },
      { id: "t", navn: "Objects", elementer: [
        { id: "quill", navn: "the quill pen", ikon: "🪶" }, { id: "lamp", navn: "the oil lamp", ikon: "🪔" }, { id: "telescope", navn: "the brass telescope", ikon: "🔭" }, { id: "cards", navn: "the punched cards", ikon: "🗂️" }
      ] },
      { id: "s", navn: "Places", elementer: [
        { id: "hall", navn: "the main hall of the Crystal Palace", ikon: "🏛️" }, { id: "machinery", navn: "the Machinery Court", ikon: "⚙️" }, { id: "park", navn: "Hyde Park", ikon: "🌳" }, { id: "refresh", navn: "the Refreshment Rooms", ikon: "🫖" }
      ] }
    ],
    ledetrader: [
      { tekst: "The author of Oliver Twist was the only one outdoors.", regel: ["med", ["p:dickens"], ["s:park"]] },
      { tekst: "The woman who wrote what is often called the first computer program was among the machines.", regel: ["med", ["p:lovelace"], ["s:machinery"]] },
      { tekst: "The engineer behind the Great Western Railway had the brass telescope.", regel: ["med", ["p:brunel"], ["t:telescope"]] },
      { tekst: "Nobody in the main hall had anything made of brass.", regel: ["ikke", ["s:hall"], ["t:telescope"]] },
      { tekst: "The punched cards were in the Machinery Court.", regel: ["med", ["t:cards"], ["s:machinery"]] },
      { tekst: "The oil lamp was not in Hyde Park.", regel: ["ikke", ["t:lamp"], ["s:park"]] }
    ],
    svar: { tekst: "The diamond's new hiding place was right next to the brass telescope.", element: "t:telescope" },
    losning: { dickens: { t: "quill", s: "park" }, nightingale: { t: "lamp", s: "hall" }, brunel: { t: "telescope", s: "refresh" }, lovelace: { t: "cards", s: "machinery" } },
    historie: [
      "The puzzle is invented, but the people and the exhibition were real. The **Great Exhibition** of 1851 was held in the **Crystal Palace**, a huge building of glass and iron in Hyde Park. About six million people visited it, and the **Koh-i-Noor** diamond was one of the most famous objects on show.",
      "**Charles Dickens** was one of the most popular writers of the time. **Isambard Kingdom Brunel** built railways, bridges and ships. **Ada Lovelace** wrote notes about Charles Babbage's planned Analytical Engine in 1843 – often called the first computer program. **Florence Nightingale** became famous a few years later, during the Crimean War (1853–1856)."
    ]
  },
  {
    id: "motstand-1944", tittel: "Den hemmelige radiosenderen – Norge 1944", sprak: "nb", niva: "medium", ikon: "📻", tema: "sf10-okkupasjonen",
    intro: "Norge, vinteren 1944. Landet er okkupert av Tyskland. London trenger beskjed fra motstandsbevegelsen, men den hemmelige radiosenderen er gjemt – og bare én av fire motstandsfolk vet hvor. Hver av dem er på et eget sted og har en egen gjenstand. Finn ut hvem som har senderen, før tyskerne gjør det!",
    sporsmal: "Hvem har radiosenderen, og hvor er den?",
    kategorier: [
      { id: "p", navn: "Personer", elementer: [
        { id: "manus", navn: "Max Manus", ikon: "🧔", info: "Levde 1914–1996.", hint: "Sabotør som senket tyske skip med miner. Han skrev boka «Det vil helst gå godt» (1945)." },
        { id: "sonsteby", navn: "Gunnar Sønsteby", ikon: "🕵️", info: "Levde 1918–2012.", hint: "Leder av Oslogjengen, med dekknavnet «Nr. 24». Norges høyest dekorerte krigshelt." },
        { id: "ronneberg", navn: "Joachim Rønneberg", ikon: "🎿", info: "Levde 1919–2018.", hint: "Ledet Operasjon Gunnerside mot tungtvannsfabrikken på Vemork i 1943." },
        { id: "helberg", navn: "Claus Helberg", ikon: "🏔️", info: "Levde 1919–2003.", hint: "Var med i forhåndsgruppen Grouse, som ventet på Hardangervidda før aksjonen mot Vemork." }
      ] },
      { id: "t", navn: "Gjenstander", elementer: [
        { id: "radio", navn: "radiosenderen", ikon: "📻" }, { id: "kart", navn: "kartet", ikon: "🗺️" }, { id: "ski", navn: "skiene", ikon: "🎿" }, { id: "spreng", navn: "sprengstoffet", ikon: "🧨" }
      ] },
      { id: "s", navn: "Steder", elementer: [
        { id: "vidda", navn: "Hardangervidda", ikon: "🏔️" }, { id: "havn", navn: "Oslo havn", ikon: "⚓" }, { id: "marka", navn: "Nordmarka", ikon: "🌲" }, { id: "rjukan", navn: "Rjukan", ikon: "🏭" }
      ] }
    ],
    ledetrader: [
      { tekst: "Mannen som ledet Operasjon Gunnerside, var på Europas største høyfjellsplatå.", regel: ["med", ["p:ronneberg"], ["s:vidda"]] },
      { tekst: "Mannen som skrev boka «Det vil helst gå godt», hadde sprengstoffet.", regel: ["med", ["p:manus"], ["t:spreng"]] },
      { tekst: "Sprengstoffet var verken på Hardangervidda eller i Nordmarka.", regel: ["ikke", ["t:spreng"], ["s:vidda", "s:marka"]] },
      { tekst: "Kartet var i byen der tungtvannsfabrikken lå.", regel: ["med", ["t:kart"], ["s:rjukan"]] },
      { tekst: "Radiosenderen var i skogen nord for Oslo.", regel: ["med", ["t:radio"], ["s:marka"]] },
      { tekst: "Lederen av Oslogjengen var ikke ved havna.", regel: ["ikke", ["p:sonsteby"], ["s:havn"]] },
      { tekst: "Han med dekknavnet «Nr. 24» var ikke i Rjukan.", regel: ["ikke", ["p:sonsteby"], ["s:rjukan"]] }
    ],
    svar: { tekst: "London trenger radiosenderen.", element: "t:radio" },
    losning: { manus: { t: "spreng", s: "havn" }, sonsteby: { t: "radio", s: "marka" }, ronneberg: { t: "ski", s: "vidda" }, helberg: { t: "kart", s: "rjukan" } },
    historie: [
      "Gåten er oppdiktet, men personene er ekte motstandsfolk under andre verdenskrig.",
      "**Joachim Rønneberg** ledet Operasjon Gunnerside, som ødela tungtvannsanlegget på **Vemork** ved **Rjukan** i februar 1943. **Claus Helberg** var med i forhåndsgruppen **Grouse**, som overlevde vinteren på **Hardangervidda**. **Gunnar Sønsteby** («Nr. 24») ledet **Oslogjengen**, som gjennomførte en rekke sabotasjeaksjoner i Oslo. **Max Manus** var med i Oslogjengen og senket tyske skip med miner. Boka hans «Det vil helst gå godt» kom i 1945. Hemmelige radiosendere var svært viktige for å holde kontakt med London."
    ]
  },
  {
    id: "philadelphia-1776", tittel: "The Missing Draft – Philadelphia 1776", sprak: "en", niva: "hard", ikon: "🦅", tema: "sf8-amerikanske-revolusjonen",
    intro: "Philadelphia, July 1776. The Continental Congress is about to approve the Declaration of Independence. But during the night, the draft disappears! Four of the Founding Fathers each had a different object, were in a different place – and had a different reason for taking the draft. Only one of them really took it.",
    sporsmal: "Who took the draft to keep it safe – with which object, where, and why?",
    kategorier: [
      { id: "p", navn: "People", elementer: [
        { id: "jefferson", navn: "Thomas Jefferson", ikon: "🖋️", info: "1743–1826", hint: "He wrote most of the Declaration of Independence – in rented rooms in the Graff House. Later the third President." },
        { id: "franklin", navn: "Benjamin Franklin", ikon: "⚡", info: "1706–1790", hint: "The oldest of the four. Printer, inventor and scientist, famous for his experiments with electricity." },
        { id: "adams", navn: "John Adams", ikon: "⚖️", info: "1735–1826", hint: "Lawyer from Massachusetts. Later the second President of the United States." },
        { id: "hancock", navn: "John Hancock", ikon: "✍️", info: "1737–1793", hint: "President of the Continental Congress. His signature is the biggest on the Declaration." }
      ] },
      { id: "t", navn: "Objects", elementer: [
        { id: "quill", navn: "the quill", ikon: "🪶" }, { id: "wax", navn: "the sealing wax", ikon: "🔴" }, { id: "candle", navn: "the candle", ikon: "🕯️" }, { id: "block", navn: "the printing block", ikon: "🖨️" }
      ] },
      { id: "s", navn: "Places", elementer: [
        { id: "assembly", navn: "the Assembly Room", ikon: "🏛️" }, { id: "graff", navn: "the Graff House", ikon: "🏠" }, { id: "tavern", navn: "City Tavern", ikon: "🍺" }, { id: "print", navn: "the printing shop", ikon: "📰" }
      ] },
      { id: "m", navn: "Reasons", elementer: [
        { id: "edit", navn: "to edit it", ikon: "✏️" }, { id: "copy", navn: "to copy it", ikon: "📄" }, { id: "protect", navn: "to protect it", ikon: "🛡️" }, { id: "sign", navn: "to sign it", ikon: "✒️" }
      ] }
    ],
    ledetrader: [
      { tekst: "The man with the biggest signature on the Declaration was in the room where Congress met.", regel: ["med", ["p:hancock"], ["s:assembly"]] },
      { tekst: "The man who wrote most of the Declaration was in the house where he had written it.", regel: ["med", ["p:jefferson"], ["s:graff"]] },
      { tekst: "The future second President was neither in the Assembly Room nor in the printing shop.", regel: ["ikke", ["p:adams"], ["s:assembly", "s:print"]] },
      { tekst: "The printing block was in the printing shop.", regel: ["med", ["t:block"], ["s:print"]] },
      { tekst: "The oldest of the four wanted to copy it.", regel: ["med", ["p:franklin"], ["m:copy"]] },
      { tekst: "Nobody in City Tavern wanted to edit it.", regel: ["ikke", ["s:tavern"], ["m:edit"]] },
      { tekst: "The person who wanted to sign it had the sealing wax.", regel: ["med", ["m:sign"], ["t:wax"]] },
      { tekst: "The sealing wax was in the Assembly Room.", regel: ["med", ["t:wax"], ["s:assembly"]] },
      { tekst: "The candle was not in City Tavern.", regel: ["ikke", ["t:candle"], ["s:tavern"]] }
    ],
    svar: { tekst: "The draft was taken by the person who wanted to protect it.", element: "m:protect" },
    losning: { jefferson: { t: "candle", s: "graff", m: "edit" }, franklin: { t: "block", s: "print", m: "copy" }, adams: { t: "quill", s: "tavern", m: "protect" }, hancock: { t: "wax", s: "assembly", m: "sign" } },
    historie: [
      "The puzzle is invented, but the people and places are real. **Thomas Jefferson** wrote the first draft of the Declaration of Independence in rented rooms in the **Graff House** in Philadelphia. **John Adams** and **Benjamin Franklin** were part of the committee that edited it. Congress approved the Declaration on **4 July 1776**.",
      "**John Hancock** was President of the Continental Congress. His large signature is so famous that «John Hancock» has become an American expression for «signature». Franklin, the oldest of the Founding Fathers, had started his career as a printer. Adams became the second President of the USA in 1797, and Jefferson the third in 1801."
    ]
  },
  {
    id: "titanic-1912", tittel: "Nøkkelen til kikkertskapet – Titanic 1912", sprak: "nb", niva: "medium", ikon: "🚢", tema: "sf9-utvandringen",
    intro: "Titanic, 14. april 1912. Utkikkene i masta mangler kikkerter – skapet der kikkertene ligger, er låst, og ingen vet hvor nøkkelen er! Fire personer om bord var på hvert sitt sted og hadde hver sin gjenstand. En av dem har nøkkelen.",
    sporsmal: "Hvem hadde nøkkelen til kikkertskapet, og hvor var den?",
    kategorier: [
      { id: "p", navn: "Personer", elementer: [
        { id: "smith", navn: "Edward Smith", ikon: "👨‍✈️", info: "1850–1912", hint: "Kaptein og skipets sjef. Han hadde fått flere isvarsler." },
        { id: "andrews", navn: "Thomas Andrews", ikon: "📐", info: "1873–1912", hint: "Skipsbygger fra verftet Harland & Wolff i Belfast, der Titanic ble bygget." },
        { id: "brown", navn: "Margaret «Molly» Brown", ikon: "👒", info: "1867–1932", hint: "Rik amerikaner på første klasse. Hun overlevde og ble senere kalt «den usenkbare Molly Brown»." },
        { id: "phillips", navn: "Jack Phillips", ikon: "📡", info: "1887–1912", hint: "Telegrafist som sendte nødsignalene fra Titanic." }
      ] },
      { id: "t", navn: "Gjenstander", elementer: [
        { id: "nokkel", navn: "nøkkelen", ikon: "🔑" }, { id: "telegram", navn: "isvarselet", ikon: "📃" }, { id: "tegninger", navn: "tegningene av skipet", ikon: "📐" }, { id: "livbelte", navn: "livbeltet", ikon: "🛟" }
      ] },
      { id: "s", navn: "Steder", elementer: [
        { id: "bro", navn: "kommandobroen", ikon: "🧭" }, { id: "radio", navn: "radiorommet", ikon: "📻" }, { id: "salong", navn: "første klasses salong", ikon: "🛋️" }, { id: "dekk", navn: "båtdekket", ikon: "⛴️" }
      ] }
    ],
    ledetrader: [
      { tekst: "Skipets sjef var på kommandobroen.", regel: ["med", ["p:smith"], ["s:bro"]] },
      { tekst: "Telegrafisten som sendte nødsignalene, var på plassen sin i radiorommet.", regel: ["med", ["p:phillips"], ["s:radio"]] },
      { tekst: "Kvinnen som senere ble kalt «den usenkbare», var innendørs.", regel: ["ikke", ["p:brown"], ["s:dekk"]] },
      { tekst: "Skipsbyggeren fra Harland & Wolff hadde tegningene av skipet.", regel: ["med", ["p:andrews"], ["t:tegninger"]] },
      { tekst: "Livbeltet var ikke på kommandobroen.", regel: ["ikke", ["t:livbelte"], ["s:bro"]] },
      { tekst: "Nøkkelen var verken på kommandobroen eller i radiorommet.", regel: ["ikke", ["t:nokkel"], ["s:bro", "s:radio"]] }
    ],
    svar: { tekst: "Hvor var nøkkelen?", element: "t:nokkel" },
    losning: { smith: { t: "telegram", s: "bro" }, andrews: { t: "tegninger", s: "dekk" }, brown: { t: "nokkel", s: "salong" }, phillips: { t: "livbelte", s: "radio" } },
    historie: [
      "Gåten er oppdiktet – men nøkkelen fantes! Den virkelige historien er at offiseren **David Blair** ble tatt ut av mannskapet like før Titanic forlot Southampton. Han glemte å levere fra seg nøkkelen til skapet der kikkertene lå. Utkikkene i masta hadde derfor ingen kikkerter. Ingen vet om det ville ha reddet skipet, men nøkkelen ble solgt på auksjon i 2007.",
      "**Edward Smith** var kaptein, **Thomas Andrews** var skipsbyggeren fra Harland & Wolff, og **Jack Phillips** sendte nødsignalene til han omkom. **Molly Brown** overlevde og hjalp andre i livbåten. Over 1500 mennesker døde da Titanic sank natt til 15. april 1912."
    ]
  }
  ,
  {
    id: "svartedauden-1349", tittel: "Smitten på Bryggen – Bergen 1349", sprak: "nb", niva: "easy", ikon: "🐀",
    intro: "Bergen, august 1349. Et skip har lagt til ved byen, og etter få dager blir folk alvorlig syke. Byens råd vil vite hvem som hadde den smittede ullballen fra skipet – og hvor den er nå. Tre personer var i nærheten. Hver av dem var på et eget sted og hadde en egen gjenstand.",
    sporsmal: "Hvem hadde den smittede ullballen, og hvor var den?",
    kategorier: [
      { id: "p", navn: "Personer", elementer: [
        { id: "thomas", navn: "Skipper Thomas", ikon: "⛵", info: "Skipper på skipet som nettopp kom til Bergen.", hint: "Skipet hans kom fra England – landet pesten kom fra da den nådde Bergen." },
        { id: "eirik", navn: "Bror Eirik", ikon: "🙏", info: "Munk i Bergen.", hint: "Mange i middelalderen trodde pesten var Guds straff. Munkene ba og holdt messer for de syke." },
        { id: "hinrik", navn: "Kjøpmann Hinrik", ikon: "💰", info: "Tysk kjøpmann i Bergen.", hint: "Han kommer fra Lübeck, den viktigste byen i Hansaforbundet. De tyske hansakjøpmennene holdt til på Bryggen." }
      ] },
      { id: "t", navn: "Gjenstander", elementer: [
        { id: "ull", navn: "ullballen", ikon: "🧶" }, { id: "rokelse", navn: "røkelsen", ikon: "💨" }, { id: "korn", navn: "kornsekken", ikon: "🌾" }
      ] },
      { id: "s", navn: "Steder", elementer: [
        { id: "bryggen", navn: "Bryggen", ikon: "🏘️" }, { id: "kirken", navn: "Mariakirken", ikon: "⛪" }, { id: "havna", navn: "skipet i havna", ikon: "⚓" }
      ] }
    ],
    ledetrader: [
      { tekst: "Mannen fra landet skipet kom fra, var ikke i kirken.", regel: ["ikke", ["p:thomas"], ["s:kirken"]] },
      { tekst: "Kjøpmannen fra den viktigste Hansabyen var der de tyske kjøpmennene holdt til.", regel: ["med", ["p:hinrik"], ["s:bryggen"]] },
      { tekst: "Det folk i middelalderen trodde kunne rense den farlige, «dårlige lufta», var i kirken.", regel: ["med", ["t:rokelse"], ["s:kirken"]] },
      { tekst: "Kornsekken, der rottene gjemte seg, var ikke på Bryggen.", regel: ["ikke", ["t:korn"], ["s:bryggen"]] },
      { tekst: "Munken hadde ikke kornsekken.", regel: ["ikke", ["p:eirik"], ["t:korn"]] }
    ],
    svar: { tekst: "Rådet leter etter ullballen.", element: "t:ull" },
    losning: { thomas: { t: "korn", s: "havna" }, eirik: { t: "rokelse", s: "kirken" }, hinrik: { t: "ull", s: "bryggen" } },
    historie: [
      "Gåten er oppdiktet, men svartedauden kom virkelig til Norge i **1349**, med et skip fra **England** som la til i Bergen. Skipet hadde trolig ull eller tøy om bord. På kort tid spredte sykdommen seg over hele landet, og trolig døde **halvparten av befolkningen** – kanskje mer.",
      "I dag vet vi at pesten skyldes en bakterie som spres med **lopper på rotter**, og også mellom mennesker. I middelalderen trodde mange at sykdommen kom fra **«dårlig luft»** eller var **Guds straff**. Noen brente urter og røkelse, andre ba eller pisket seg selv for å be om tilgivelse. Tyske kjøpmenn fra Hansabyene, særlig **Lübeck**, hadde stor makt i handelen i Bergen og holdt til på **Bryggen**."
    ]
  },
  {
    id: "vikingtinget", tittel: "Sverdet på tinget – vikingtiden", sprak: "nb", niva: "medium", ikon: "⚔️",
    intro: "Tenk deg at fire kjente nordboere fra vikingtiden møttes på et stort ting. Midt under tinget forsvinner et kostbart sverd! Hver av de fire var på et eget sted og hadde en egen gjenstand. Finn ut hvem som tok sverdet.",
    sporsmal: "Hvem tok sverdet, og hvor var det?",
    kategorier: [
      { id: "p", navn: "Personer", elementer: [
        { id: "harald", navn: "Harald Hårfagre", ikon: "👑", info: "Levde ca. 850–932.", hint: "Ifølge sagaene samlet han Norge til ett rike etter slaget i Hafrsfjord." },
        { id: "olav", navn: "Olav Tryggvason", ikon: "✝️", info: "Levde ca. 963–1000.", hint: "Konge 995–1000. Han kristnet store deler av landet og falt i slaget ved Svolder i år 1000." },
        { id: "leiv", navn: "Leiv Eriksson", ikon: "🧭", info: "Levde ca. 970–1020.", hint: "Ifølge sagaene var han den første europeeren som kom til Amerika (Vinland), rundt år 1000." },
        { id: "gudrid", navn: "Gudrid Torbjørnsdotter", ikon: "👶", info: "Levde ca. 980–1050.", hint: "Hun reiste til Vinland. Sønnen Snorre regnes som det første europeiske barnet født i Amerika." }
      ] },
      { id: "t", navn: "Gjenstander", elementer: [
        { id: "sverd", navn: "sverdet", ikon: "🗡️" }, { id: "horn", navn: "drikkehornet", ikon: "📯" }, { id: "solstein", navn: "solsteinen", ikon: "💎" }, { id: "rune", navn: "runepinnen", ikon: "🪵" }
      ] },
      { id: "s", navn: "Steder", elementer: [
        { id: "langhus", navn: "langhuset", ikon: "🏠" }, { id: "skip", navn: "langskipet", ikon: "🛶" }, { id: "ting", navn: "tingvollen", ikon: "🪨" }, { id: "smie", navn: "smia", ikon: "🔥" }
      ] }
    ],
    ledetrader: [
      { tekst: "Mannen som ifølge sagaene var den første europeeren i Amerika, var om bord på skipet.", regel: ["med", ["p:leiv"], ["s:skip"]] },
      { tekst: "Solsteinen, som vikingene kanskje brukte til å finne sola i overskyet vær, var på langskipet.", regel: ["med", ["t:solstein"], ["s:skip"]] },
      { tekst: "Kongen som falt ved Svolder, var verken i langhuset eller i smia.", regel: ["ikke", ["p:olav"], ["s:langhus", "s:smie"]] },
      { tekst: "Kvinnen som fikk et barn i Vinland, hadde ikke drikkehornet.", regel: ["ikke", ["p:gudrid"], ["t:horn"]] },
      { tekst: "Kongen fra slaget i Hafrsfjord hadde ikke sverdet.", regel: ["ikke", ["p:harald"], ["t:sverd"]] },
      { tekst: "Drikkehornet var verken i smia eller på tingvollen.", regel: ["ikke", ["t:horn"], ["s:smie", "s:ting"]] },
      { tekst: "Runepinnen lå i smia.", regel: ["med", ["t:rune"], ["s:smie"]] }
    ],
    svar: { tekst: "Hvem tok sverdet?", element: "t:sverd" },
    losning: { harald: { t: "horn", s: "langhus" }, olav: { t: "sverd", s: "ting" }, leiv: { t: "solstein", s: "skip" }, gudrid: { t: "rune", s: "smie" } },
    historie: [
      "Gåten er oppdiktet – de fire levde ikke på samme tid. Men alle er kjent fra sagaene. **Harald Hårfagre** skal ha samlet Norge etter slaget i **Hafrsfjord** (rundt 872). **Olav Tryggvason** var konge fra 995 til han falt ved **Svolder** i år 1000.",
      "**Leiv Eriksson** kom til **Vinland** i Nord-Amerika rundt år 1000 – nesten 500 år før Columbus. Funnene på **L'Anse aux Meadows** i Canada viser at nordboere virkelig var der. **Gudrid Torbjørnsdotter** reiste også dit, og sønnen hennes, Snorre, regnes som det første europeiske barnet født i Amerika. **Tinget** var stedet der frie menn møttes for å lage lover og løse konflikter."
    ]
  },
  {
    id: "varennes-1791", tittel: "Kongens flukt – Frankrike 1791", sprak: "nb", niva: "medium", ikon: "🎭", tema: "sf8-franske-revolusjonen",
    intro: "Frankrike, juni 1791. Kongefamilien prøver å flykte fra Paris i forkledning – men blir avslørt! Noen kjente igjen kongen fra bildet på en pengeseddel, en assignat. Fire personer var på hvert sitt sted og hadde hver sin gjenstand.",
    sporsmal: "Hvem hadde assignaten som avslørte kongen, og hvor?",
    kategorier: [
      { id: "p", navn: "Personer", elementer: [
        { id: "ludvig", navn: "Ludvig 16.", ikon: "👑", info: "Levde 1754–1793.", hint: "Konge av Frankrike fra 1774. Han ble henrettet med giljotin i januar 1793." },
        { id: "marie", navn: "Marie Antoinette", ikon: "💎", info: "Levde 1755–1793.", hint: "Dronning av Frankrike, født i Østerrike." },
        { id: "robespierre", navn: "Maximilien Robespierre", ikon: "⚖️", info: "Levde 1758–1794.", hint: "Advokat og revolusjonsleder. Han var en av de viktigste under terrorperioden 1793–1794." },
        { id: "lafayette", navn: "Markien de Lafayette", ikon: "🎖️", info: "Levde 1757–1834.", hint: "Kjempet på amerikanernes side i den amerikanske revolusjonskrigen, og ledet nasjonalgarden i Paris." }
      ] },
      { id: "t", navn: "Gjenstander", elementer: [
        { id: "forkledning", navn: "forkledningen", ikon: "🥸" }, { id: "assignat", navn: "assignaten", ikon: "💵" }, { id: "kokarde", navn: "trikolor-kokarden", ikon: "🎗️" }, { id: "brev", navn: "brevet", ikon: "✉️" }
      ] },
      { id: "s", navn: "Steder", elementer: [
        { id: "tuileriene", navn: "Tuileriene (slottet)", ikon: "🏰" }, { id: "forsamlingen", navn: "nasjonalforsamlingen", ikon: "🏛️" }, { id: "vognen", navn: "vognen", ikon: "🐎" }, { id: "post", navn: "poststasjonen", ikon: "📯" }
      ] }
    ],
    ledetrader: [
      { tekst: "Kongen som ble henrettet i 1793, satt i vognen.", regel: ["med", ["p:ludvig"], ["s:vognen"]] },
      { tekst: "Forkledningen var i vognen.", regel: ["med", ["t:forkledning"], ["s:vognen"]] },
      { tekst: "Dronningen som var født i Østerrike, hadde brevet.", regel: ["med", ["p:marie"], ["t:brev"]] },
      { tekst: "Revolusjonslederen fra terrorperioden var der lovene ble vedtatt.", regel: ["med", ["p:robespierre"], ["s:forsamlingen"]] },
      { tekst: "Helten fra den amerikanske revolusjonskrigen var ikke i slottet.", regel: ["ikke", ["p:lafayette"], ["s:tuileriene"]] },
      { tekst: "Personen i nasjonalforsamlingen bar revolusjonens farger.", regel: ["med", ["s:forsamlingen"], ["t:kokarde"]] }
    ],
    svar: { tekst: "Hvem hadde assignaten?", element: "t:assignat" },
    losning: { ludvig: { t: "forkledning", s: "vognen" }, marie: { t: "brev", s: "tuileriene" }, robespierre: { t: "kokarde", s: "forsamlingen" }, lafayette: { t: "assignat", s: "post" } },
    historie: [
      "Gåten er oppdiktet, men flukten skjedde. Natt til **21. juni 1791** flyktet **Ludvig 16.**, **Marie Antoinette** og barna fra slottet **Tuileriene** i Paris, forkledd som tjenere. De ble stoppet i byen **Varennes**.",
      "Ifølge historien ble kongen kjent igjen av postmesteren **Jean-Baptiste Drouet**, som sammenlignet ansiktet hans med portrettet på en **assignat** – en pengeseddel. Flukten fikk mange franskmenn til å miste tilliten til kongen. Frankrike ble republikk i 1792, og kongen og dronningen ble henrettet i 1793. **Robespierre** ble selv henrettet i 1794, mens **Lafayette** overlevde revolusjonen."
    ]
  },
  {
    id: "christmas-truce-1914", tittel: "The Christmas Truce – Flanders 1914", sprak: "en", niva: "master", ikon: "⚽", tema: "sf9-forste-verdenskrig",
    intro: "Christmas Day, 1914. In some places on the Western Front, the shooting stops. Soldiers climb out of the trenches, shake hands and share food. Someone has brought a football into no man's land! Four soldiers were in different places and had different things. **Each soldier makes a statement – and the one who brought the football is lying.** Everyone else tells the truth.",
    sporsmal: "Who brought the football, and where were they?",
    kategorier: [
      { id: "p", navn: "Soldiers", elementer: [
        { id: "atkins", navn: "Private Tommy Atkins", ikon: "💂", info: "British soldier.", hint: "His name, «Tommy Atkins», became a nickname for all British soldiers." },
        { id: "weber", navn: "Gefreiter Fritz Weber", ikon: "🪖", info: "German soldier.", hint: "At Christmas 1914, soldiers from his country put small Christmas trees with candles on top of their trenches." },
        { id: "singh", navn: "Sepoy Ram Singh", ikon: "🎖️", info: "Soldier in the Indian Corps.", hint: "He came from India, then part of the British Empire. Over a million Indian soldiers served in the war." },
        { id: "macleod", navn: "Piper Angus MacLeod", ikon: "🎵", info: "Highland soldier.", hint: "He comes from the part of Britain famous for kilts and bagpipes: Scotland." }
      ] },
      { id: "t", navn: "Things", elementer: [
        { id: "football", navn: "the football", ikon: "⚽" }, { id: "tree", navn: "the little Christmas tree", ikon: "🎄" }, { id: "tin", navn: "the brass gift tin", ikon: "🎁" }, { id: "pudding", navn: "the plum pudding", ikon: "🍮" }
      ] },
      { id: "s", navn: "Places", elementer: [
        { id: "nomansland", navn: "no man's land", ikon: "🕳️" }, { id: "british", navn: "the British trench", ikon: "🇬🇧" }, { id: "german", navn: "the German trench", ikon: "🇩🇪" }, { id: "kitchen", navn: "the field kitchen", ikon: "🍲" }
      ] }
    ],
    ledetrader: [
      { tekst: "The soldier from the country that put Christmas trees on its trenches was in his own trench.", regel: ["med", ["p:weber"], ["s:german"]] },
      { tekst: "The little Christmas tree was in the German trench.", regel: ["med", ["t:tree"], ["s:german"]] },
      { tekst: "The soldier whose name became a nickname for all British soldiers did not have the football.", regel: ["ikke", ["p:atkins"], ["t:football"]] },
      { tekst: "The plum pudding was not in the field kitchen.", regel: ["ikke", ["t:pudding"], ["s:kitchen"]] },
      { tekst: "The brass gift tin – a Christmas present from Princess Mary to the soldiers – was not in the British trench.", regel: ["ikke", ["t:tin"], ["s:british"]] }
    ],
    utsagn: [
      { person: "p:atkins", tekst: "I was in the British trench.", regel: ["med", ["p:atkins"], ["s:british"]] },
      { person: "p:weber", tekst: "The Scottish soldier was not in the field kitchen.", regel: ["ikke", ["p:macleod"], ["s:kitchen"]] },
      { person: "p:singh", tekst: "Tommy had the plum pudding.", regel: ["med", ["p:atkins"], ["t:pudding"]] },
      { person: "p:macleod", tekst: "The soldier from India had the football.", regel: ["med", ["p:singh"], ["t:football"]] }
    ],
    svar: { tekst: "The person who lies is the one who brought the football.", element: "t:football" },
    losning: { atkins: { t: "pudding", s: "british" }, weber: { t: "tree", s: "german" }, singh: { t: "tin", s: "kitchen" }, macleod: { t: "football", s: "nomansland" } },
    historie: [
      "The puzzle is invented, but the **Christmas Truce** of 1914 really happened. Along parts of the Western Front, British and German soldiers stopped fighting on Christmas Eve and Christmas Day. They sang carols, exchanged food, cigarettes and souvenirs, and buried their dead. In a few places, they played football in no man's land.",
      "German soldiers put small **Christmas trees** with candles on their trenches. British soldiers received a **brass gift tin** from Princess Mary, with tobacco or sweets. Soldiers from **India** and many other parts of the British Empire fought in France and Belgium. The generals did not like the truce, and it never happened on the same scale again. The war continued until **11 November 1918**."
    ]
  },
  {
    id: "berlin-1961", tittel: "Dobbeltagenten – Berlin 1961", sprak: "nb", niva: "master", ikon: "🕶️", tema: "sf10-kalde-krigen",
    intro: "Berlin, høsten 1961. Muren er nettopp bygget, og byen er full av spioner. En hemmelig mikrofilm er overlevert til fienden – av en dobbeltagent! Fire agenter var på hvert sitt sted i byen og hadde hver sin gjenstand. **Alle agentene kommer med et utsagn. Dobbeltagenten lyver – alle de andre snakker sant.**",
    sporsmal: "Hvem er dobbeltagenten, hva hadde han eller hun, og hvor?",
    kategorier: [
      { id: "p", navn: "Agenter", elementer: [
        { id: "falk", navn: "Agent Falk", ikon: "🦅", info: "Fra CIA.", hint: "CIA er etterretningstjenesten til USA, supermakten i vest." },
        { id: "sokolov", navn: "Agent Sokolov", ikon: "🐻", info: "Fra KGB.", hint: "KGB var den hemmelige tjenesten i Sovjetunionen, supermakten i øst." },
        { id: "ziegler", navn: "Agent Ziegler", ikon: "🕵️", info: "Fra Stasi.", hint: "Stasi var det hemmelige politiet i Øst-Tyskland (DDR), landet som bygget muren." },
        { id: "hansen", navn: "Agent Hansen", ikon: "🎿", info: "Fra norsk etterretning.", hint: "Norge var med på å grunnlegge NATO i 1949 og hadde grense mot Sovjetunionen i nord." }
      ] },
      { id: "t", navn: "Gjenstander", elementer: [
        { id: "mikrofilm", navn: "mikrofilmen", ikon: "🎞️" }, { id: "kamera", navn: "minikameraet", ikon: "📷" }, { id: "kart", navn: "kartet over muren", ikon: "🗺️" }, { id: "radio", navn: "radioen", ikon: "📻" }
      ] },
      { id: "s", navn: "Steder", elementer: [
        { id: "checkpoint", navn: "Checkpoint Charlie", ikon: "🚧" }, { id: "brandenburg", navn: "Brandenburger Tor", ikon: "🏛️" }, { id: "glienicke", navn: "Glienicke-broen", ikon: "🌉" }, { id: "teufelsberg", navn: "Teufelsberg", ikon: "📡" }
      ] }
    ],
    ledetrader: [
      { tekst: "Agenten fra landet som bygget muren, var ved porten som ble stengt da muren kom.", regel: ["med", ["p:ziegler"], ["s:brandenburg"]] },
      { tekst: "Minikameraet var ved grenseovergangen der amerikanske og sovjetiske stridsvogner stod mot hverandre i oktober 1961.", regel: ["med", ["t:kamera"], ["s:checkpoint"]] },
      { tekst: "Agenten fra supermakten i øst hadde ikke kartet.", regel: ["ikke", ["p:sokolov"], ["t:kart"]] },
      { tekst: "Mikrofilmen var ikke på fjellet som ble bygget av ruinene etter andre verdenskrig.", regel: ["ikke", ["t:mikrofilm"], ["s:teufelsberg"]] },
      { tekst: "Agenten fra NATO-landet med grense mot Sovjetunionen var ikke ved Checkpoint Charlie.", regel: ["ikke", ["p:hansen"], ["s:checkpoint"]] },
      { tekst: "Mikrofilmen ble overlevert på broen der USA og Sovjetunionen senere byttet spioner.", regel: ["med", ["t:mikrofilm"], ["s:glienicke"]] }
    ],
    utsagn: [
      { person: "p:falk", tekst: "Jeg var ved Checkpoint Charlie.", regel: ["med", ["p:falk"], ["s:checkpoint"]] },
      { person: "p:sokolov", tekst: "Stasi-agenten hadde kartet.", regel: ["med", ["p:ziegler"], ["t:kart"]] },
      { person: "p:ziegler", tekst: "KGB-agenten var på Teufelsberg.", regel: ["med", ["p:sokolov"], ["s:teufelsberg"]] },
      { person: "p:hansen", tekst: "CIA-agenten hadde mikrofilmen.", regel: ["med", ["p:falk"], ["t:mikrofilm"]] }
    ],
    svar: { tekst: "Dobbeltagenten er den som hadde mikrofilmen.", element: "t:mikrofilm" },
    losning: { falk: { t: "kamera", s: "checkpoint" }, sokolov: { t: "radio", s: "teufelsberg" }, ziegler: { t: "kart", s: "brandenburg" }, hansen: { t: "mikrofilm", s: "glienicke" } },
    historie: [
      "Gåten er oppdiktet, men stedene er ekte. **Berlinmuren** ble bygget fra **13. august 1961**. **Brandenburger Tor** ble stengt og ble et symbol på det delte Berlin. Ved **Checkpoint Charlie** stod amerikanske og sovjetiske stridsvogner mot hverandre i oktober 1961. På **Glienicke-broen** byttet øst og vest spioner, første gang i 1962. **Teufelsberg** er et fjell laget av ruiner etter krigen, der amerikanerne senere bygget en stor avlyttingsstasjon.",
      "Under den kalde krigen hadde begge sider spioner overalt – også i Norge. Den mest kjente norske spionsaken er **Arne Treholt**, som ble dømt for spionasje for Sovjetunionen i 1985. Saken er fortsatt omdiskutert."
    ]
  }
];
