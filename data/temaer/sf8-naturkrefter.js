/* Tema: Naturkrefter og naturfare (samfunnsfag – geografi, 8. trinn)
   Formatering: se forklaringen øverst i sf9-industrialiseringen.js */

window.LV = window.LV || {};
window.LV.tema = {
  id: "sf8-naturkrefter",
  fag: "samfunnsfag",
  trinn: 8,
  sprak: "nb",
  tittel: "Naturkrefter og naturfare",

  ingress: "Jorda er ikke ferdig. Under føttene våre beveger kontinentene seg, fjell blir løftet opp, og vulkaner bygger nytt land. I Norge raser fjellsider ut, og elver går over sine bredder. Naturkreftene former landskapet – og de kan bli farlige for menneskene som bor der.",

  maal: [
    "forklare hvordan platetektonikk fører til jordskjelv, vulkaner og fjellkjeder",
    "beskrive hvilke naturfarer som finnes i Norge, og hvordan samfunnet forebygger dem",
    "sammenligne hvorfor like store naturhendelser kan få svært ulike følger i ulike deler av verden"
  ],

  startsporsmal: "Har du opplevd et uvær, en flom eller et ras – eller sett det på nyhetene? Hva tror du er farligst å bo i nærheten av?",

  avsnitt: [
    {
      tittel: "Jorda er et puslespill",
      tekst: [
        "Jorda består av flere lag. Ytterst er [[jordskorpa]], som er tynn sammenlignet med resten av kloden – omtrent som skallet på et egg. Under den ligger [[mantelen]], som består av varm stein. Innerst ligger kjernen, som er flere tusen grader varm.",
        "Jordskorpa er delt opp i store og små biter som kalles [[kontinentalplater|kontinentalplate]]. Platene flyter på den varme, seige mantelen og beveger seg noen få centimeter i året – omtrent like fort som neglene dine vokser. Læren om hvordan platene beveger seg, kalles [[platetektonikk]]."
      ],
      lett: [
        "Jorda har flere lag. Ytterst er **jordskorpa**. Under den er **mantelen**, som er varm og seig. Innerst er kjernen. Jordskorpa er delt i store biter som heter **kontinentalplater**. De beveger seg noen centimeter i året. Dette kalles **platetektonikk**."
      ]
    },
    {
      tittel: "Når platene møtes",
      tekst: [
        "Det meste av det dramatiske skjer der platene møtes. Noen steder glir platene **fra hverandre**. Da presses smeltet stein opp og lager ny havbunn. Island ligger på et slikt sted, midt på Den midtatlantiske ryggen, og har derfor mange vulkaner.",
        "Andre steder beveger platene seg **mot hverandre**. Når en tung havplate møter en lettere kontinentplate, presses havplata ned under den andre. Det gir jordskjelv og vulkaner, som langs vestkysten av Sør-Amerika. Når to kontinentplater kolliderer, presses landet opp i høye fjellkjeder. Slik ble Himalaya til – og fjellet vokser fortsatt. Noen steder **glir platene langs hverandre**, som ved San Andreas-forkastningen i California. Der hekter platene seg fast, spenningen bygger seg opp, og plutselig rykker de – et jordskjelv."
      ],
      utfordring: [
        "Geologer skiller mellom tre typer plategrenser. Ved **divergerende** grenser beveger platene seg fra hverandre, og [[magma]] stiger opp og størkner til ny skorpe – slik vokser Atlanterhavet med et par centimeter i året. Ved **konvergerende** grenser beveger platene seg mot hverandre. Havskorpe er tyngre enn kontinentskorpe og blir presset ned i mantelen i en såkalt [[subduksjonssone]], der det dannes dype havgroper, vulkaner og noen av verdens kraftigste jordskjelv. Ved **transforme** grenser glir platene sidelengs forbi hverandre uten at skorpe blir laget eller ødelagt. Rundt Stillehavet ligger det så mange subduksjonssoner at området kalles **Ildringen**: Her skjer de aller fleste av verdens jordskjelv, og her ligger flertallet av de aktive vulkanene. Teorien om platetektonikk ble ikke allment godtatt før på 1960-tallet, selv om Alfred Wegener foreslo at kontinentene beveget seg allerede i 1912."
      ],
      lett: [
        "Mye skjer der platene møtes. Noen steder glir de **fra hverandre**, som på Island. Da kommer smeltet stein opp, og det blir vulkaner. Andre steder går platene **mot hverandre**. Da blir det jordskjelv, vulkaner og høye fjell, som Himalaya. Noen steder glir platene **langs hverandre**. Da kan det komme jordskjelv."
      ],
      stoppOgTenk: "Hvorfor har Island så mange vulkaner, mens Norge nesten ikke har noen?"
    },
    {
      tittel: "Jordskjelv og tsunamier",
      tekst: [
        "Et [[jordskjelv]] er rystelser i bakken når spenninger i jordskorpa plutselig løses ut. Styrken måles på en skala der hvert trinn betyr omtrent 32 ganger så mye energi. Et skjelv med styrke 7 er altså mye kraftigere enn et skjelv med styrke 6.",
        "Når et kraftig jordskjelv skjer under havet, kan havbunnen løftes plutselig. Da kan det oppstå en [[tsunami]] – en flodbølge som sprer seg over hele havet. 26. desember 2004 utløste et jordskjelv utenfor Indonesia en tsunami i Indiahavet. Rundt 230 000 mennesker i flere land omkom, blant dem 84 nordmenn som var på ferie i Thailand. I 2011 rammet et jordskjelv og en tsunami Japan og skadet atomkraftverket i Fukushima."
      ],
      lett: [
        "Et **jordskjelv** er rystelser i bakken. Hvert trinn på skalaen betyr mye mer energi. Et jordskjelv under havet kan lage en **tsunami** – en stor flodbølge. I 2004 drepte en tsunami rundt 230 000 mennesker rundt Indiahavet, blant dem 84 nordmenn."
      ]
    },
    {
      tittel: "Vulkaner",
      tekst: [
        "En [[vulkan]] er en åpning i jordskorpa der smeltet stein, gass og aske kommer opp. Smeltet stein under bakken kalles magma. Når den kommer ut, kalles den lava. Noen vulkaner har rolige utbrudd med lava som renner sakte. Andre eksploderer og sender aske høyt opp i lufta.",
        "Vulkaner kan være farlige, men de gir også fruktbar jord, og mange bor derfor nær dem. Vulkaner kan også ramme folk langt unna: Da vulkanen Eyjafjallajökull på Island hadde utbrudd i 2010, sendte den så mye aske opp i lufta at store deler av flytrafikken i Europa ble stoppet i flere dager. Siden 2021 har det vært en rekke utbrudd på Reykjanes-halvøya på Island, og byen Grindavík har måttet evakueres."
      ],
      lett: [
        "En **vulkan** er en åpning i jordskorpa der smeltet stein og aske kommer opp. Under bakken heter det magma, over bakken heter det lava. Vulkaner kan være farlige, men gir god jord. I 2010 stoppet aske fra en vulkan på Island flytrafikken i Europa."
      ]
    },
    {
      tittel: "Naturfare i Norge: skred",
      tekst: [
        "Norge har sjelden store jordskjelv eller vulkanutbrudd. Den største naturfaren hos oss er [[skred]] – når snø, stein, jord eller leire raser ut. Snøskred tar liv nesten hver vinter. Steinsprang og jordskred kan stenge veier og jernbane.",
        "Den farligste formen er [[fjellskred]], der store deler av en fjellside raser ut. Hvis et fjellskred går i en fjord, kan det lage en flodbølge. I Tafjord i 1934 skapte et fjellskred en bølge som drepte 40 mennesker. I dag overvåkes ustabile fjellsider som Åknes i Storfjorden døgnet rundt. **Kvikkleire** er en annen fare: leire som kan bli flytende når den forstyrres. I Gjerdrum i 2020 raste et boligområde ut, og 11 mennesker omkom."
      ],
      lett: [
        "I Norge er **skred** den største naturfaren. Det kan være snø, stein, jord eller leire som raser ut. Et **fjellskred** i en fjord kan lage en flodbølge. I Tafjord i 1934 døde 40 mennesker. I Gjerdrum i 2020 raste et boligområde ut i et **kvikkleireskred**, og 11 mennesker omkom."
      ],
      stoppOgTenk: "Hvorfor tror du det er så viktig å overvåke fjellsider som Åknes døgnet rundt?"
    },
    {
      tittel: "Flom, ekstremvær og klimatilpasning",
      tekst: [
        "[[Flom]] skjer når elver og bekker får mer vann enn de kan ta unna – for eksempel ved snøsmelting eller mye regn. Den største flommen vi kjenner til i Norge, **Storofsen**, rammet Østlandet i 1789. I 2023 førte ekstremværet «Hans» til store flommer og skred på Østlandet.",
        "Forskerne regner med at klimaendringene gir mer kraftig regn i Norge. Det kan bety flere flommer og jordskred. Derfor arbeider samfunnet med [[klimatilpasning]]: Kommunene må vurdere fare før de lar folk bygge, veier og bruer bygges sterkere, og Norges vassdrags- og energidirektorat (NVE) sender ut farevarsler på nettsiden **varsom.no**."
      ],
      lett: [
        "**Flom** er når elver får mer vann enn de kan ta unna. I 2023 ga uværet «Hans» store flommer på Østlandet. Klimaendringene kan gi mer regn, flere flommer og skred. Derfor må samfunnet tilpasse seg. Det kalles **klimatilpasning**. Farevarsler finner du på varsom.no."
      ]
    },
    {
      tittel: "Like store skjelv – ulike følger",
      tekst: [
        "En naturhendelse blir en [[naturkatastrofe]] når den rammer mennesker hardt. Hvor ille det går, kommer ikke bare an på naturen, men også på samfunnet. I januar 2010 rammet et jordskjelv med styrke 7,0 Haiti, et av de fattigste landene i verden. Over hundre tusen mennesker omkom, blant annet fordi mange hus var dårlig bygd. Noen uker senere rammet et mye kraftigere skjelv, med styrke 8,8, Chile. Der omkom rundt 500 mennesker.",
        "Forskjellen handler om [[sårbarhet]]: byggeregler, varslingssystemer, helsevesen, redningstjenester og hvor mye penger landet har til å bygge opp igjen. Derfor er naturfare også et spørsmål om fattigdom og ulikhet."
      ],
      lett: [
        "En **naturkatastrofe** er når naturen rammer mennesker hardt. I 2010 rammet et jordskjelv det fattige landet Haiti. Over hundre tusen døde. Samme år rammet et enda kraftigere skjelv Chile, men der døde rundt 500. Forskjellen handler om **sårbarhet**: gode hus, varsling, sykehus og penger."
      ],
      stoppOgTenk: "Hvorfor kan et svakere jordskjelv drepe langt flere mennesker enn et kraftigere?"
    }
  ],

  tidslinje: [
    { dato: "1789", tekst: "Storofsen – den største kjente flommen i Norge." },
    { dato: "1912", tekst: "Alfred Wegener foreslår at kontinentene beveger seg." },
    { dato: "1934", tekst: "Fjellskredet i Tafjord gir en flodbølge som dreper 40 mennesker." },
    { dato: "1960-tallet", tekst: "Teorien om platetektonikk blir allment godtatt." },
    { dato: "26.12.2004", tekst: "Tsunamien i Indiahavet – rundt 230 000 omkommer." },
    { dato: "2010", tekst: "Jordskjelv på Haiti og i Chile. Askeskyen fra Eyjafjallajökull stopper flytrafikken." },
    { dato: "2011", tekst: "Jordskjelv og tsunami i Japan – ulykken ved Fukushima." },
    { dato: "30.12.2020", tekst: "Kvikkleireskredet i Gjerdrum." },
    { dato: "2023", tekst: "Ekstremværet «Hans» gir flom og skred på Østlandet." }
  ],

  personer: [
    { navn: "Alfred Wegener", levde: "1880–1930", rolle: "Tysk forsker", tekst: "Han så at kystlinjene i Sør-Amerika og Afrika passer sammen som et puslespill, og foreslo at kontinentene en gang hadde hengt sammen. Mange lo av ham, men han fikk rett." }
  ],

  ord: {
    "jordskorpa": "Det ytterste, harde laget på jorda.",
    "mantelen": "Laget under jordskorpa. Det består av varm, seig stein.",
    "kontinentalplate": "En av de store bitene som jordskorpa er delt i, og som beveger seg sakte.",
    "platetektonikk": "Læren om hvordan kontinentalplatene beveger seg, og hva det fører til.",
    "magma": "Smeltet stein under bakken. Når den kommer opp, kalles den lava.",
    "subduksjonssone": "Et sted der en plate presses ned under en annen.",
    "jordskjelv": "Rystelser i bakken når spenninger i jordskorpa plutselig løses ut.",
    "tsunami": "En flodbølge som oftest lages av et jordskjelv under havet.",
    "vulkan": "En åpning i jordskorpa der smeltet stein, gass og aske kommer opp.",
    "skred": "Når snø, stein, jord eller leire raser ut.",
    "fjellskred": "Når store deler av en fjellside raser ut.",
    "Flom": "Når elver og bekker får mer vann enn de kan ta unna, og går over sine bredder.",
    "klimatilpasning": "Tiltak som gjør samfunnet bedre rustet mot et klima i endring.",
    "naturkatastrofe": "En naturhendelse som rammer mennesker og samfunn svært hardt.",
    "sårbarhet": "Hvor lett et samfunn eller en person blir skadet av en hendelse, og hvor vanskelig det er å komme seg igjen."
  },

  sammendrag: [
    "Jordskorpa er delt i plater som beveger seg noen centimeter i året.",
    "Der platene møtes, oppstår jordskjelv, vulkaner og fjellkjeder.",
    "Jordskjelv under havet kan lage tsunamier, som i Indiahavet i 2004.",
    "I Norge er skred og flom de største naturfarene.",
    "Klimaendringene kan gi flere flommer og skred, og samfunnet må tilpasse seg.",
    "Hvor alvorlig en naturhendelse blir, kommer også an på hvor sårbart samfunnet er."
  ],

  oppgaver: {
    1: {
      finn: [
        "Hva heter de tre lagene jorda består av?",
        "Hvor fort beveger kontinentalplatene seg?",
        "Hva er den største naturfaren i Norge?"
      ],
      forsta: [
        "Forklar med egne ord hvordan en tsunami oppstår.",
        "Forklar forskjellen på magma og lava."
      ],
      diskuter: [
        { tekst: "Ville du bodd nær en vulkan hvis jorda der var svært god? Hvorfor eller hvorfor ikke?", partner: true }
      ]
    },
    2: {
      finn: [
        "Finn tre ting som kan skje der platene møtes.",
        "Finn to eksempler på hvordan Norge forebygger naturfare."
      ],
      forsta: [
        "Forklar hvorfor Himalaya fortsatt vokser.",
        "Forklar hvorfor klimaendringene kan gi flere skred i Norge."
      ],
      diskuter: [
        { tekst: "Bør det være lov å bygge hus der det er fare for flom eller skred? Diskuter.", partner: true }
      ]
    },
    3: {
      finn: [
        "Lag en tabell over de tre typene plategrenser: hva skjer, hvilke naturfarer gir de, og et eksempel på et sted."
      ],
      forsta: [
        "Sammenlign jordskjelvene på Haiti og i Chile i 2010. Hvilke forhold i samfunnet kan forklare de ulike følgene?"
      ],
      diskuter: [
        "Drøft om naturkatastrofer egentlig er «naturlige». Hvor mye skyldes naturen, og hvor mye skyldes samfunnet?",
        "Hvem bør ha ansvaret for å beskytte folk mot naturfare: den enkelte, kommunen, staten eller verdenssamfunnet? Drøft."
      ]
    }
  },

  kobletTil: ["sf8-kart-og-kartlesing", "sf8-klima-og-vegetasjon", "sf10-klimaendringer", "sf9-fattigdom-ulikhet"],

  kilder: [
    { tittel: "Varsom.no – farevarsler fra NVE", url: "https://www.varsom.no/" },
    { tittel: "NVE: Skred", url: "https://www.nve.no/naturfare/" },
    { tittel: "Store norske leksikon: søk på «platetektonikk»", url: "https://snl.no/.search?query=platetektonikk" },
    { tittel: "NDLA: søk på «naturfare»", url: "https://ndla.no/search?query=naturfare" }
  ],

  kontroller: [
    "Platene beveger seg typisk 2–10 cm i året.",
    "Hvert trinn på momentskalaen ≈ 32 ganger mer energi.",
    "Tsunamien 26.12.2004: om lag 230 000 omkom; 84 nordmenn.",
    "Eyjafjallajökull april 2010; Reykjanes-utbrudd fra 2021, Grindavík evakuert november 2023.",
    "Tafjord 7.4.1934: 40 omkom. Åknes overvåkes av NVE.",
    "Gjerdrum 30.12.2020: 11 omkom (inkludert et ufødt barn i noen kilder – sjekk formuleringen).",
    "Storofsen 1789; ekstremværet «Hans» august 2023.",
    "Haiti 12.1.2010 (styrke 7,0, dødstall usikre, anslag over 100 000); Chile 27.2.2010 (8,8, rundt 500 omkom).",
    "Sjekk at kildelenkene fungerer."
  ]
};
