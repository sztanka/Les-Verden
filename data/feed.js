/* =========================================================
   Les verden – Feeden fra fortiden (feed.html)
   Hva om folk hadde hatt sosiale medier under historiske hendelser?
   Profilene er OPPDIKTEDE personer (eller offisielle kunngjøringer
   skrevet om til innlegg). Ekte historiske personer skriver aldri
   innlegg – de blir bare nevnt.
   type: fakta | mening | rykte | propaganda
   ========================================================= */
window.LV = window.LV || {};
LV.feedTyper = {
  nb: {
    fakta: ["✔️", "Fakta", "En opplysning som stemmer med det historikerne vet."],
    mening: ["💬", "Mening", "Hva noen synes eller mener. Kan ikke være sant eller usant."],
    rykte: ["❓", "Rykte", "Ubekreftet eller feil – spres ofte fordi folk er redde eller sinte."],
    propaganda: ["📣", "Propaganda", "Ensidig budskap fra noen med makt, laget for å påvirke hva folk mener."]
  },
  en: {
    fakta: ["✔️", "Fact", "Information that matches what historians know."],
    mening: ["💬", "Opinion", "What someone thinks or believes. It cannot be true or false."],
    rykte: ["❓", "Rumour", "Unconfirmed or false – often spread because people are scared or angry."],
    propaganda: ["📣", "Propaganda", "A one-sided message from someone with power, made to influence what people think."]
  }
};
LV.feeder = [
  {
    id: "bastillen-1789", sprak: "nb", tema: "sf8-franske-revolusjonen", trinn: 8, ikon: "🏰", farger: ["#1f3a6b", "#d64545"],
    tittel: "#Bastillen", dato: "14. juli 1789", sted: "Paris",
    intro: "Brødet er dyrere enn noen gang, og kongen har samlet tusenvis av soldater rundt Paris. Tre dager tidligere har han sparket finansministeren som folket stolte på. Hva om parisere hadde hatt Pip – og kunne skrive om alt mens det skjedde?",
    profiler: {
      lucie: { navn: "Lucie", handle: "@bakerkona_lucie", rolle: "Bakerkone i arbeiderstrøket Saint-Antoine", ikon: "🥖" },
      jean: { navn: "Jean", handle: "@gardisten_jean", rolle: "Soldat i den franske garden", ikon: "💂" },
      markien: { navn: "Markien av V.", handle: "@markien_av_v", rolle: "Adelsmann med slott utenfor Paris", ikon: "🎩" },
      kongen: { navn: "Kongelige kunngjøringer", handle: "@kongens_kunngjoringer", rolle: "Kunngjøringer fra hoffet i Versailles", ikon: "👑" },
      anne: { navn: "Anne", handle: "@pamfletten_anne", rolle: "Skriver pamfletter – små løpesedler", ikon: "📰" },
      pierre: { navn: "Pierre", handle: "@bonde_pierre", rolle: "Bonde i Normandie", ikon: "🌾" }
    },
    innlegg: [
      { av: "lucie", tid: "07:10", tekst: "Brødet koster 14 sou i dag. Det er over halvparten av det mannen min tjener på en dag. Hvordan skal vi leve? 😠", liker: 812, delt: 340, type: "fakta",
        forklaring: "Sommeren 1789 var brødprisen den høyeste på mange tiår, og vanlige arbeidere brukte over halvparten av lønna på brød." },
      { av: "kongen", tid: "08:00", tekst: "Hans Majestet har funnet det riktig å avskjedige finansminister Necker. Soldatene i og rundt Paris er der for å beskytte byens rolige innbyggere.", liker: 95, delt: 12, type: "propaganda",
        forklaring: "Det stemmer at Necker ble sparket 11. juli. Men kongen hadde samlet tusenvis av soldater, og mange fryktet at de skulle stoppe nasjonalforsamlingen. Kunngjøringen skal berolige og forteller ikke hvorfor soldatene er der.",
        svar: [{ av: "lucie", tekst: "Beskytte oss? Mot hva – brød?" }] },
      { av: "anne", tid: "08:45", tekst: "‼️ RYKTE: Kongen har gitt ordre om at 30 000 soldater skal skyte på hele Saint-Antoine i natt! DEL før det er for sent!!!", liker: 2304, delt: 5120, type: "rykte",
        forklaring: "Det var mange soldater rundt Paris, men det fantes ingen ordre om å skyte på et helt nabolag. Slike rykter skapte panikk – og fikk folk til å skaffe seg våpen." },
      { av: "jean", tid: "09:30", tekst: "Vi i garden kommer ikke til å skyte på våre egne. Jeg står sammen med folket i dag. 🇫🇷", liker: 1430, delt: 610, type: "mening",
        forklaring: "Dette er Jeans eget standpunkt. Men det bygger på noe ekte: Mange soldater i den franske garden gikk over til folkemengden 14. juli." },
      { av: "lucie", tid: "10:30", tekst: "Vi har vært på Invalidene og hentet geværer – tusenvis! Men det er nesten ikke krutt der. Alle sier at kruttet ligger i Bastillen.", liker: 990, delt: 480, type: "fakta",
        forklaring: "Om morgenen 14. juli tok folkemengden rundt 30 000 geværer fra Invalidene. Kruttet var flyttet til festningen Bastillen – derfor gikk de dit." },
      { av: "markien", tid: "11:15", tekst: "Pøbelen ødelegger Paris. Folk som ikke eier noe, kan ikke forvente å bestemme noe. Kongen må vise hard hånd nå.", liker: 61, delt: 8, type: "mening",
        forklaring: "Dette er markiens mening. Mange adelige mente at bare de som eide jord, burde ha makt.",
        svar: [{ av: "anne", tekst: "Og hvem har bygd slottet ditt, markien? 🤔" }] },
      { av: "anne", tid: "15:00", tekst: "Bastillen er full av hundrevis av uskyldige fanger som har sittet i lenker i årevis. Vi må befri dem!", liker: 3020, delt: 2210, type: "rykte",
        forklaring: "Bastillen var et symbol på kongens makt, men 14. juli satt det bare sju fanger der." },
      { av: "jean", tid: "17:30", tekst: "BASTILLEN HAR FALT! Kommandanten har overgitt seg. Vi fant bare sju fanger. Men festningen er vår. 🏰🔥", liker: 8900, delt: 7400, type: "fakta",
        forklaring: "Bastillen ble tatt om ettermiddagen 14. juli. Rundt hundre av angriperne ble drept, og kommandanten ble drept av folkemengden etterpå." },
      { av: "kongen", tid: "Dagen etter", tekst: "Av omsorg for sine kjære undersåtter har Hans Majestet besluttet å trekke soldatene ut av Paris.", liker: 140, delt: 30, type: "propaganda",
        forklaring: "Kongen trakk soldatene ut fordi han ikke lenger hadde kontroll – ikke av omsorg. Kunngjøringen får et nederlag til å se ut som en god gjerning." },
      { av: "pierre", tid: "Noen uker senere", tekst: "Her på landet sier alle at de adelige har leid røverbander som skal brenne kornet vårt før høsten. Vi bevæpner oss!", liker: 670, delt: 1300, type: "rykte",
        forklaring: "Sommeren 1789 spredte det seg rykter om røverbander over hele Frankrike. Det kalles «den store frykten». Bøndene angrep mange slott og brente papirene som viste hva de skyldte adelen." }
    ],
    sporsmal: [
      "Hvilke innlegg spredte seg mest? Hvorfor tror du det?",
      "Velg ett av innleggene fra «Kongelige kunngjøringer». Hva prøver de å få folk til å tro?",
      "Hvordan kan rykter ha påvirket det som skjedde 14. juli?",
      "Hvem mangler i feeden? Hvilke stemmer hører vi ikke?"
    ],
    kontroller: ["Brødpris 14 sou (ca. 14,5 sou for firepundsbrød i juli 1789).", "Ca. 30 000 geværer fra Invalidene; sju fanger i Bastillen.", "«Den store frykten» juli–august 1789."]
  },
  {
    id: "eidsvoll-1814", sprak: "nb", tema: "sf8-1814-grunnloven", trinn: 8, ikon: "📜", farger: ["#8a1c1c", "#f2e6c9"],
    tittel: "#Eidsvoll1814", dato: "Mai 1814", sted: "Eidsvoll",
    intro: "Danskekongen har gitt Norge til Sverige i Kiel-freden. Men på Eidsvoll sitter 112 menn og skriver en grunnlov for et fritt Norge. Hva om de og folk rundt dem hadde hatt Pip?",
    profiler: {
      ole: { navn: "Ole", handle: "@ole_fra_hedmark", rolle: "Bonde og valgt representant", ikon: "🌾" },
      marit: { navn: "Marit", handle: "@marit_paa_kjokkenet", rolle: "Tjenestejente på Eidsvoll", ikon: "🍲" },
      lund: { navn: "Kaptein Lund", handle: "@kaptein_lund", rolle: "Offiser, i selvstendighetspartiet", ikon: "⚔️" },
      kjopmann: { navn: "Kjøpmann Berg", handle: "@kjopmann_berg", rolle: "Trelasthandler, i unionspartiet", ikon: "🪵" },
      stockholm: { navn: "Stockholms Røst", handle: "@stockholms_rost", rolle: "Svensk avis", ikon: "🇸🇪" },
      prinsen: { navn: "Regentens kontor", handle: "@regentens_kontor", rolle: "Kunngjøringer fra prins Christian Frederik", ikon: "👑" }
    },
    innlegg: [
      { av: "ole", tid: "10. april", tekst: "Fremme på Eidsvoll! Vi er 112 representanter, og over en tredel av oss er bønder. 🌾", liker: 420, delt: 88, type: "fakta",
        forklaring: "Riksforsamlingen hadde 112 medlemmer: embetsmenn, offiserer, kjøpmenn og 37 bønder." },
      { av: "kjopmann", tid: "15. april", tekst: "Uten handel med England sulter folket. Vi bør forhandle med Sverige i stedet for å late som om vi er en stormakt.", liker: 210, delt: 40, type: "mening",
        forklaring: "Dette var et vanlig synspunkt i unionspartiet. De mente Norge var for svakt til å stå alene." },
      { av: "kjopmann", tid: "16. april", tekst: "Britiske skip blokkerer fortsatt kysten. Kornet kommer ikke fram, og i dalene spiser folk barkebrød.", liker: 330, delt: 120, type: "fakta",
        forklaring: "Under krigsårene 1807–1814 stengte britiske skip kysten, og mange nordmenn sultet." },
      { av: "stockholm", tid: "20. april", tekst: "Nordmennene lengter etter den svenske kongen. Svenske soldater vil bli tatt imot med blomster i alle norske byer! 🌸", liker: 75, delt: 14, type: "propaganda",
        forklaring: "Svenske myndigheter ville at Norge skulle godta unionen. Påstanden om at nordmennene lengtet etter den svenske kongen, stemte ikke." },
      { av: "lund", tid: "2. mai", tekst: "Komiteen er enig: Makten skal deles mellom en nasjonalforsamling, en konge og domstolene. Ingen skal ha all makt alene!", liker: 980, delt: 300, type: "fakta",
        forklaring: "Maktfordelingsprinsippet fra Montesquieu ble et av grunnlagene for Grunnloven." },
      { av: "marit", tid: "5. mai", tekst: "Hørte på kjøkkenet at ALLE nordmenn skal få stemmerett nå!! 🎉", liker: 1500, delt: 900, type: "rykte",
        forklaring: "Grunnloven ga stemmerett til menn over 25 år som eide eller leide jord, var embetsmenn eller borgere i byene – rundt 40 prosent av mennene. Kvinner fikk ingen stemmerett.",
        svar: [{ av: "ole", tekst: "Ikke helt, Marit. Ikke husmenn, ikke tjenestefolk – og ikke kvinner." }] },
      { av: "ole", tid: "8. mai", tekst: "§ 2 i utkastet sier at jøder fortsatt ikke skal få komme inn i riket. Jeg er ikke sikker på at det er rett.", liker: 160, delt: 45, type: "fakta",
        forklaring: "Grunnloven § 2 nektet jøder adgang til Norge. Paragrafen ble opphevet i 1851, etter kamp fra blant andre Henrik Wergeland." },
      { av: "lund", tid: "14. mai", tekst: "Norge blir et av de frieste landene i verden. Ingen kan ta dette fra oss! 🇳🇴", liker: 2400, delt: 1100, type: "mening",
        forklaring: "Dette er kapteinens mening. Grunnloven var svært moderne for sin tid – men om Norge var «et av de frieste landene», kan diskuteres." },
      { av: "prinsen", tid: "17. mai", tekst: "Hele det norske folk står samlet bak sin konge og sin grunnlov. ✨", liker: 3100, delt: 1500, type: "propaganda",
        forklaring: "Folket var ikke samlet: Mange i unionspartiet ville ha union med Sverige, og mange vanlige folk visste lite om det som skjedde. Kunngjøringen skal skape enhet." },
      { av: "marit", tid: "17. mai, kveld", tekst: "Prins Christian Frederik er valgt til konge i dag. Alle roper hurra, og vi får et glass punsj på kjøkkenet. 🥂", liker: 2700, delt: 800, type: "fakta",
        forklaring: "Grunnloven ble datert og underskrevet 17. mai 1814, og Christian Frederik ble valgt til konge samme dag." }
    ],
    sporsmal: [
      "Hvilke innlegg er skrevet av noen med makt? Hvordan merker du det?",
      "Marits innlegg om stemmeretten fikk mange likes. Hvorfor sprer feil informasjon seg ofte raskere enn riktig?",
      "Ole er usikker på § 2. Hva ville du svart ham?",
      "Skriv et innlegg som en husmann som ikke får stemme. Hva tenker han om Grunnloven?"
    ],
    kontroller: ["37 bønder blant de 112 representantene.", "Stemmerett for rundt 40 prosent av mennene.", "Jødeparagrafen opphevet 1851."]
  },
  {
    id: "saltmarsjen-1930", sprak: "en", tema: "en9-india", trinn: 9, ikon: "🧂", farger: ["#c25b16", "#f5d48c"],
    tittel: "#SaltMarch", dato: "March–May 1930", sted: "Gujarat, India",
    intro: "India is ruled by Britain. Every Indian must pay a tax on salt, and it is against the law to make your own salt from the sea. In March 1930, Mahatma Gandhi starts walking towards the sea. What if the people around him had been on Pip?",
    profiler: {
      priya: { navn: "Priya", handle: "@priya_marches", rolle: "Student who joins the march", ikon: "🚶‍♀️" },
      ram: { navn: "Ram", handle: "@ram_of_dandi", rolle: "Fisherman in the village of Dandi", ikon: "🎣" },
      meena: { navn: "Meena", handle: "@meena_shop", rolle: "Shopkeeper in Bombay", ikon: "🏪" },
      officer: { navn: "District Officer", handle: "@district_officer", rolle: "British official", ikon: "🎖️" },
      gazette: { navn: "The Loyal Gazette", handle: "@loyal_gazette", rolle: "Newspaper that supports British rule", ikon: "📰" },
      reporter: { navn: "J. Ellis", handle: "@reporter_ellis", rolle: "Foreign journalist", ikon: "🖋️" }
    },
    innlegg: [
      { av: "priya", tid: "12 March", tekst: "Day 1! We left Ahmedabad this morning with Gandhiji and 78 marchers. It is about 240 miles to the sea at Dandi. 🚶‍♀️🚶‍♂️", liker: 1200, delt: 600, type: "fakta",
        forklaring: "The Salt March started on 12 March 1930 with 78 followers. They walked about 240 miles (385 km) in 24 days." },
      { av: "gazette", tid: "13 March", tekst: "A handful of troublemakers have gone for a walk. Nobody in India cares about this silly show. 🙄", liker: 90, delt: 20, type: "propaganda",
        forklaring: "The newspaper tries to make the march look small and unimportant. In fact, thousands joined, and newspapers all over the world wrote about it." },
      { av: "ram", tid: "14 March", tekst: "The British take a tax on every grain of salt we eat. Even the poorest family must pay it. And we may not make our own salt from the sea, right outside our door.", liker: 2300, delt: 1400, type: "fakta",
        forklaring: "The Salt Act gave the British government a monopoly on salt. Everyone needs salt, so the tax hit the poorest hardest." },
      { av: "meena", tid: "20 March", tekst: "Walking to the sea will change nothing. The British have guns. We only have feet.", liker: 300, delt: 50, type: "mening",
        forklaring: "This is Meena’s opinion. Many Indians doubted that non-violent protest could work.",
        svar: [{ av: "priya", tekst: "Feet can carry a whole country, Meena. Come and see!" }] },
      { av: "meena", tid: "28 March", tekst: "I heard the marchers are secretly paid by Russia to make trouble! 😱", liker: 450, delt: 990, type: "rykte",
        forklaring: "There was no evidence for this. Claims that protesters are «paid by foreigners» are an old trick used to make a protest look fake." },
      { av: "officer", tid: "1 April", tekst: "The law is the law. Making salt without a licence is a crime, and criminals will be punished.", liker: 120, delt: 30, type: "mening",
        forklaring: "It is true that it was illegal. But whether an unfair law should be obeyed is a question of opinion – and that was exactly what the march was about." },
      { av: "priya", tid: "5 April", tekst: "Day 24. We have reached the sea! Thousands of people walk with us now. Every village has given us food and water. 🌊", liker: 5400, delt: 3100, type: "fakta",
        forklaring: "The marchers reached Dandi on 5 April. Along the way, the crowd grew to thousands." },
      { av: "ram", tid: "6 April", tekst: "This morning Gandhiji picked up a lump of salt from the beach. Now everyone is making salt! Let them arrest all of India! 🧂", liker: 9100, delt: 8800, type: "fakta",
        forklaring: "On 6 April 1930, Gandhi broke the salt law. Millions of Indians followed, and about 60 000 people were arrested in the following months." },
      { av: "reporter", tid: "21 May", tekst: "At the salt works in Dharasana, I watched police beat unarmed marchers with steel-tipped sticks. Not one of them raised an arm to fight back. I have never seen anything like it.", liker: 7600, delt: 6900, type: "fakta",
        forklaring: "Reports from Dharasana, especially by the American journalist Webb Miller, shocked readers around the world and won sympathy for India’s independence movement." },
      { av: "gazette", tid: "22 May", tekst: "Police acted with great care at Dharasana. Nobody was seriously hurt. 👮", liker: 60, delt: 15, type: "propaganda",
        forklaring: "Hundreds of marchers were injured, and some died. The newspaper hides what happened to protect the government." }
    ],
    sporsmal: [
      "Why was salt such a powerful symbol?",
      "Compare the posts from The Loyal Gazette with the posts from the reporter. Who would you trust, and why?",
      "Why do you think the march got so much attention around the world?",
      "Can you think of a protest today where social media played a big role?"
    ],
    kontroller: ["78 marsjdeltakere, ca. 240 miles, 12. mars–5. april, saltet 6. april 1930.", "Ca. 60 000 arrestert.", "Dharasana 21. mai 1930; Webb Miller."]
  },
  {
    id: "niende-april-1940", sprak: "nb", tema: "sf10-okkupasjonen", trinn: 10, ikon: "✈️", farger: ["#2d2a26", "#8c9db5"],
    tittel: "#9april", dato: "9.–10. april 1940", sted: "Oslo og Østlandet",
    intro: "Natt til 9. april 1940 angriper Tyskland Norge. Ingen vet hva som skjer, og radio og aviser gir motstridende beskjeder. Hva om folk hadde hatt Pip den natta?",
    profiler: {
      kari: { navn: "Kari", handle: "@kari_oslo15", rolle: "Elev, 15 år, i Oslo", ikon: "🎒" },
      erling: { navn: "Erling", handle: "@soldat_erling", rolle: "Soldat ved Oscarsborg festning", ikon: "🪖" },
      lytter: { navn: "Radiolytteren", handle: "@radiolytteren", rolle: "Sitter ved radioen hele natta", ikon: "📻" },
      bonde: { navn: "Anna", handle: "@anna_elverum", rolle: "Bonde på Elverum", ikon: "🚜" },
      tysk: { navn: "Den tyske kommandoen", handle: "@tysk_kommando", rolle: "Kunngjøringer fra de tyske styrkene", ikon: "🦅" },
      ns: { navn: "NS-kunngjøring", handle: "@ns_kunngjoring", rolle: "Kunngjøringer fra Nasjonal Samling", ikon: "📢" }
    },
    innlegg: [
      { av: "erling", tid: "04:30", tekst: "Et stort krigsskip kom inn Drøbaksundet i mørket. Vi har skutt mot det med kanonene og torpedoene fra festningen. Det brenner og synker!", liker: 3400, delt: 2900, type: "fakta",
        forklaring: "Den tyske krysseren «Blücher» ble senket av Oscarsborg festning. Det forsinket angrepet på Oslo, og kongen og regjeringen fikk tid til å komme seg ut av byen." },
      { av: "tysk", tid: "07:00", tekst: "Tyske tropper kommer som venner. Vi er her for å beskytte Norge mot et britisk angrep. Ingen trenger å være redde.", liker: 40, delt: 10, type: "propaganda",
        forklaring: "Dette var den offisielle tyske forklaringen. I virkeligheten ville Tyskland sikre seg jernmalmen fra Sverige, havnene og kysten." },
      { av: "kari", tid: "09:00", tekst: "Folk står i lange køer utenfor bankene for å ta ut pengene sine. Trikken går ikke. Mange drar ut av byen med kofferter.", liker: 560, delt: 200, type: "fakta",
        forklaring: "9. april var det kaos i Oslo. Mange tok ut pengene sine og flyktet ut av byen." },
      { av: "erling", tid: "11:00", tekst: "Noen sier at hele den norske hæren har overgitt seg allerede. Er det sant??", liker: 300, delt: 800, type: "rykte",
        forklaring: "Det stemte ikke. Norske styrker kjempet i to måneder, og de siste ga opp 10. juni 1940." },
      { av: "bonde", tid: "18:00", tekst: "Stortinget har samlet seg her på Elverum. Kongen og regjeringen kom hit med tog fra Hamar. Det er soldater overalt.", liker: 1200, delt: 600, type: "fakta",
        forklaring: "Stortinget møttes på Hamar og senere på Elverum 9. april. Der ga det regjeringen fullmakt til å styre landet så lenge krigen varte." },
      { av: "ns", tid: "19:30", tekst: "Vidkun Quisling har dannet en ny nasjonal regjering. Alle nordmenn må adlyde den nye regjeringen. Motstand er nytteløst!", liker: 80, delt: 25, type: "propaganda",
        forklaring: "Quisling erklærte seg selv som statsminister i radio om kvelden 9. april – et kupp. Han hadde nesten ingen støtte i folket, og selv tyskerne fjernet ham etter noen dager." },
      { av: "kari", tid: "20:00", tekst: "Ærlig talt – tyskerne virker ikke så ille. En av dem smilte og ga lillebroren min sjokolade.", liker: 90, delt: 5, type: "mening",
        forklaring: "Dette er Karis inntrykk. Mange tyske soldater var vennlige mot sivile i starten – men okkupasjonen kom til å vare i fem år, med arrestasjoner, sensur og terror.",
        svar: [{ av: "bonde", tekst: "Pass deg, jenta mi. Sjokolade er billig." }] },
      { av: "lytter", tid: "10. april, 12:00", tekst: "‼️ Hørte at engelske fly skal bombe Oslo om en time! Kom dere ut av byen NÅ!!", liker: 4200, delt: 9800, type: "rykte",
        forklaring: "10. april spredte det seg et rykte om at Oslo skulle bombes. Titusenvis flyktet i panikk ut av byen. Det kom ingen bomber." },
      { av: "bonde", tid: "10. april", tekst: "Kongen har sagt nei! Han vil ikke utnevne Quisling til statsminister. Heller går han av.", liker: 8600, delt: 7900, type: "fakta",
        forklaring: "Tyskland krevde at kong Haakon skulle godta Quisling. Kongen sa nei, og regjeringen støttet ham. Kongens nei ble et symbol for motstanden." },
      { av: "tysk", tid: "11. april", tekst: "Den norske regjeringen har flyktet og sviktet folket sitt. Bare samarbeid med Tyskland kan gi fred og ro.", liker: 30, delt: 12, type: "propaganda",
        forklaring: "Regjeringen hadde ikke sviktet folket – den hadde trukket seg unna for å fortsette kampen. Budskapet skal få folk til å gi opp." }
    ],
    sporsmal: [
      "Hvilke innlegg kunne folk stole på den 9. april? Hvordan kunne de vite det?",
      "Hvorfor tror du ryktet om bombing spredte seg så raskt?",
      "Hva ville den tyske kommandoen og NS oppnå med innleggene sine?",
      "Hvordan ville sosiale medier forandret 9. april hvis de hadde fantes? Ville det blitt bedre eller verre?"
    ],
    kontroller: ["«Blücher» senket ved Oscarsborg om morgenen 9. april.", "Elverumsfullmakten 9. april; kongens nei 10. april.", "Ryktet om bombing av Oslo og «panikkdagen» 10. april."]
  }
];
