/* =========================================================
   Les verden – Byen vokser (byen.html)
   Simulering av industrialiseringen i den oppdiktede byen Elvebyen,
   1840–1910. Hendelsene bygger på virkelige trekk ved norsk historie
   (særlig Christiania og Akerselva), men byen og tallene er oppdiktet.
   Verdier 0–100: bolig, helse, miljo (ren elv), skole, tillit.
   Hvert valg: k = kostnad, og endringer i fab (fabrikker), bolig,
   helse, miljo, skole, tillit, vann (1 = vannverk/kloakk bygd).
   ========================================================= */
window.LV = window.LV || {};
LV.byen = {
  navn: "Elvebyen",
  start: { aar: 1840, folk: 8000, fab: 1, kasse: 40, bolig: 60, helse: 50, miljo: 85, skole: 25, tillit: 60, vann: 0 },
  maal: [["bolig", "🏠", "Boliger"], ["helse", "❤️", "Helse"], ["miljo", "🌊", "Ren elv"], ["skole", "📚", "Skole"], ["tillit", "🤝", "Tillit"]],
  runder: [
    { aar: 1840, tittel: "Fossen og spinneriet", tekst: "Elvebyen er en liten by med håndverkere, kjøpmenn og bønder rundt. Elva har mange fosser. En rik kjøpmann har kjøpt maskiner fra England og vil bygge et mekanisk spinneri ved den største fossen. Han trenger tomt – og arbeidere.",
      valg: [
        { id: "A", tittel: "Gi kjøpmannen gratis tomt ved fossen", tekst: "Spinneriet gir arbeid og skatteinntekter, men slipper avfall i elva.", k: 10, fab: 2, miljo: -8, tillit: 2 },
        { id: "B", tittel: "Bygge enkle arbeiderboliger", tekst: "Tilflytterne trenger et sted å bo.", k: 20, bolig: 12 },
        { id: "C", tittel: "Styrke fattigkassa", tekst: "Penger til mat og hjelp til de fattigste.", k: 10, helse: 4, tillit: 8 },
        { id: "D", tittel: "Bygge en ny skole", tekst: "Flere barn lærer å lese, skrive og regne.", k: 15, skole: 12 } ],
      ekte: "Ved Akerselva i Christiania ble det bygd mange fabrikker fra 1840-årene, for eksempel Nydalens Compagnie (1845) og Hjula væveri (1855). Fossene ga kraft til maskinene. Folk flyttet fra landsbygda for å få arbeid." },
    { aar: 1850, tittel: "Kolera!", tekst: "Byen har vokst raskt. Mange bor trangt i små rom uten rennende vann. Folk henter vann fra brønner og fra elva – den samme elva som fabrikkene og doene slipper avfall ut i. Nå har koleraen kommet. Folk dør i løpet av få dager.",
      valg: [
        { id: "A", tittel: "Bygge vannverk og kloakk", tekst: "Rent vann i rør og kloakk ut av byen. Svært dyrt, men det virker på sikt.", k: 35, helse: 15, vann: 1, miljo: 5 },
        { id: "B", tittel: "Åpne et kolerasykehus", tekst: "Syke blir isolert og pleiet. Hjelper nå, men fjerner ikke årsaken.", k: 10, helse: 6, tillit: 4 },
        { id: "C", tittel: "Rive de verste bakgårdene", tekst: "Nye, luftigere hus – men de fattige må flytte.", k: 20, bolig: 10, tillit: -6 },
        { id: "D", tittel: "Gi tomt til en ny fabrikk", tekst: "Flere arbeidsplasser og mer skatt.", k: 5, fab: 1, miljo: -6 } ],
      ekte: "Koleraen rammet Christiania flere ganger, verst i 1853, da over tusen mennesker døde. Ingen visste ennå at sykdommen smitter gjennom urent vann. Først senere bygde byene vannverk og kloakk." },
    { aar: 1860, tittel: "Jernbanen kommer", tekst: "Et jernbaneselskap vil legge banen til Elvebyen, men byen må betale for stasjonen. Med jernbanen kan fabrikkene få kull og råvarer billigere og selge varene sine i hele landet.",
      valg: [
        { id: "A", tittel: "Betale for jernbanestasjonen", tekst: "Flere fabrikker vil etablere seg i byen.", k: 25, fab: 2, tillit: 2 },
        { id: "B", tittel: "Gasslykter i gatene", tekst: "Tryggere gater om kvelden.", k: 10, tillit: 6, helse: 2 },
        { id: "C", tittel: "Bygge murgårder i stedet for trehus", tekst: "Mindre brannfare og bedre boliger.", k: 20, bolig: 10 },
        { id: "D", tittel: "Flere skoleklasser", tekst: "Skolen er full. Mange barn går ikke på skole i det hele tatt.", k: 15, skole: 12 } ],
      ekte: "Norges første jernbane, Hovedbanen mellom Christiania og Eidsvoll, åpnet i 1854. Jernbanen gjorde det lettere å frakte varer og mennesker, og byene vokste raskere." },
    { aar: 1870, tittel: "Barna i fabrikken", tekst: "Mange barn ned til 8–9 år jobber lange dager i fabrikkene. De er billig arbeidskraft, og familiene trenger pengene. Legen i byen sier at barna blir syke og at mange ikke lærer å lese.",
      valg: [
        { id: "A", tittel: "Forby fabrikkarbeid for barn under 12 år", tekst: "Barna får gå på skole, men familiene mister inntekt og eierne protesterer.", k: 5, skole: 10, helse: 5, tillit: 4, fab: -1 },
        { id: "B", tittel: "Kveldsskole for arbeiderbarn", tekst: "Barna jobber fortsatt, men kan lære litt om kvelden.", k: 10, skole: 6 },
        { id: "C", tittel: "Bygge leiegårder for arbeiderne", tekst: "Mange får et bedre sted å bo.", k: 20, bolig: 12 },
        { id: "D", tittel: "Gi skattelette til fabrikkeierne", tekst: "Eierne lover flere arbeidsplasser.", k: 0, fab: 1, tillit: -6 } ],
      ekte: "Barnearbeid var vanlig i norske fabrikker. Fabrikktilsynsloven fra 1892 forbød fabrikkarbeid for barn under 12 år og begrenset arbeidsdagen for barn mellom 12 og 14 år." },
    { aar: 1880, tittel: "Streik!", tekst: "Arbeiderne på den største fabrikken legger ned arbeidet. De krever høyere lønn, kortere arbeidsdag og bedre sikkerhet etter en ulykke. Eieren truer med å sparke alle og ansette nye.",
      valg: [
        { id: "A", tittel: "Støtte arbeiderne", tekst: "Bystyret ber eieren gi etter. Arbeiderne får mer, men eieren vurderer å flytte.", k: 0, tillit: 12, fab: -1, helse: 3 },
        { id: "B", tittel: "Støtte eieren", tekst: "Politiet skal beskytte de nye arbeiderne. Fabrikken går, men sinnet vokser.", k: 5, tillit: -12, fab: 1 },
        { id: "C", tittel: "Mekle mellom partene", tekst: "Bystyret inviterer begge sider til forhandlinger.", k: 5, tillit: 6 },
        { id: "D", tittel: "Bygge folkebad og bibliotek", tekst: "Arbeiderne får et sted å vaske seg og lese.", k: 15, helse: 5, skole: 5, tillit: 3 } ],
      ekte: "Arbeiderne begynte å organisere seg i fagforeninger, og Det norske Arbeiderparti ble stiftet i 1887. I 1889 streiket fyrstikkarbeiderne i Christiania – mest unge kvinner – mot dårlige og farlige arbeidsforhold." },
    { aar: 1890, tittel: "Elektrisitet og ny skolelov", tekst: "Fossen kan nå gi elektrisk strøm, ikke bare drive maskiner. En ny lov sier at alle barn skal gå på folkeskole. Samtidig er elva så skitten at den lukter vondt om sommeren.",
      valg: [
        { id: "A", tittel: "Bygge kraftstasjon ved fossen", tekst: "Strøm til fabrikker og gatelys.", k: 25, fab: 2, tillit: 3 },
        { id: "B", tittel: "Ny, stor folkeskole", tekst: "Plass til alle barna i byen.", k: 20, skole: 15 },
        { id: "C", tittel: "Park og turvei langs elva", tekst: "Rydde søppel og stille strengere krav til fabrikkene.", k: 15, miljo: 15, helse: 4, fab: -1 },
        { id: "D", tittel: "Nytt sykehus", tekst: "Bedre hjelp til syke og skadde.", k: 25, helse: 12 } ],
      ekte: "Folkeskoleloven fra 1889 ga alle barn rett til sju års skole. I 1891 ble Hammerfest den første byen i Nord-Europa med elektrisk gatelys. Akerselva var i lang tid sterkt forurenset av fabrikkene langs elva." },
    { aar: 1900, tittel: "Krakk og trikk", tekst: "Mange har bygd leiegårder for å tjene penger, men nå står leilighetene tomme og flere byggherrer går konkurs. Samtidig bor arbeiderfamilier fortsatt trangt. Kvinnene i byen krever stemmerett ved kommunevalget.",
      valg: [
        { id: "A", tittel: "Kommunen bygger egne boliger", tekst: "Billige, gode leiligheter for arbeiderfamilier.", k: 25, bolig: 15, tillit: 5 },
        { id: "B", tittel: "Elektrisk trikk til nye boligstrøk", tekst: "Folk kan bo lenger fra fabrikkene.", k: 20, bolig: 8, helse: 3 },
        { id: "C", tittel: "Stemmerett for kvinner ved kommunevalg", tekst: "Flere får være med og bestemme.", k: 0, tillit: 10 },
        { id: "D", tittel: "Rense elva", tekst: "Strengere krav til fabrikkene og kloakken.", k: 20, miljo: 15, helse: 4 } ],
      ekte: "I 1899 kom «Kristianiakrakket»: Det var bygd for mange leiegårder, og mange gikk konkurs. Kristiania fikk elektrisk trikk i 1894. I 1901 fikk kvinner med en viss inntekt stemmerett ved kommunevalg." }
  ],
  slutt: "I virkeligheten vokste Christiania fra rundt 30 000 innbyggere i 1840 til over 220 000 i 1900 – blant annet fordi byen fikk nye områder. Byen ble rikere, men mange arbeiderfamilier bodde trangt, og forskjellene mellom øst og vest i byen var store. Vannverk, skoler, sykehus og bedre boliger kom gradvis, ofte etter press fra arbeiderbevegelsen og etter epidemier.",
  refleksjon: [
    "Hvilket valg var vanskeligst? Hvorfor?",
    "Hvem tjente mest på at byen vokste, og hvem betalte prisen?",
    "Sammenlign byen deres med Christiania. Hva gjorde dere annerledes enn de virkelige politikerne?",
    "Finnes det byer i verden i dag som vokser like raskt? Hvilke av problemene i Elvebyen har de?"
  ],
  kontroller: "Byen og tallene er oppdiktet. Kontroller de historiske opplysningene før bruk: Nydalens Compagnie 1845, Hjula væveri 1855, koleraen i Christiania 1853, Hovedbanen 1854, fabrikktilsynsloven 1892, Arbeiderpartiet 1887, fyrstikkarbeiderstreiken 1889, folkeskoleloven 1889, elektrisk gatelys i Hammerfest 1891, elektrisk trikk i Kristiania 1894, Kristianiakrakket 1899, kommunal stemmerett for kvinner 1901 og folketallet i Christiania."
};
