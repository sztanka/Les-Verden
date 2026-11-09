/* Les verden – Kontinuitet og endring (endring.html)
   Fem temaer sett på tre tidspunkter: rundt 1814, rundt 1914 og i dag.
   rader: [aspekt, [rundt 1814, rundt 1914, i dag]]
   kontroller: fakta som er sjekket (lærer). */
window.LV = window.LV || {};
window.LV.endring = {
  tider: ["Rundt 1814", "Rundt 1914", "I dag"],
  temaer: [
    { id: "skole", ikon: "🏫", tittel: "Skole", tema: "sf8-1814-grunnloven",
      rader: [
        ["Hvem gikk på skole, og hvor lenge?", ["På landet gikk mange barn på omgangsskole: Læreren flyttet mellom gårdene, og barna fikk noen uker undervisning i året.", "Etter folkeskoleloven fra 1889 gikk alle barn sju år i folkeskolen. Få gikk videre.", "Alle går ti år i grunnskolen, og alle har rett til videregående opplæring."]],
        ["Hva lærte de?", ["Lesing og kristendom var viktigst, fordi alle skulle konfirmeres.", "Norsk, regning, kristendom, historie, geografi og naturfag.", "Mange fag, også engelsk, samfunnsfag og digitale ferdigheter. Elevene skal lære å tenke kritisk og delta i demokratiet."]],
        ["Disiplin og straff", ["Fysisk straff, som ris og slag, var vanlig og lovlig.", "Fysisk straff var fortsatt tillatt i skolen. Den ble forbudt i folkeskolen i 1936.", "All fysisk avstraffelse er forbudt. Elevene har rett til et trygt og godt skolemiljø."]],
        ["Hvem bestemte?", ["Kirken og presten hadde stor makt over skolen.", "Kommunene og staten tok over mer av ansvaret, men kirken var fortsatt viktig.", "Staten lager læreplaner, kommunene driver skolene, og elevene har rett til å bli hørt, for eksempel i elevrådet."]]
      ] },
    { id: "arbeid", ikon: "⚒️", tittel: "Arbeid", tema: "sf9-arbeiderbevegelsen",
      rader: [
        ["Hva arbeidet folk med?", ["De fleste arbeidet i jordbruk, fiske og skogbruk. Mange var husmenn eller tjenestefolk.", "Industrien vokste, og mange arbeidet i fabrikker, men jordbruk og fiske var fortsatt store næringer.", "De fleste arbeider i tjenesteyting, som helse, skole, handel og kontor."]],
        ["Arbeidstid og fritid", ["Folk arbeidet fra soloppgang til solnedgang, og fritid var lite vanlig.", "Arbeidsdagen var ofte ti timer, seks dager i uka. Åttetimersdagen ble lovfestet i 1919.", "Vanlig arbeidstid er rundt 37,5 timer i uka, og de fleste har rundt fem ukers ferie."]],
        ["Barn og arbeid", ["Barn arbeidet på gården fra de var små.", "En lov fra 1892 forbød fabrikkarbeid for barn under 12 år, men mange barn arbeidet fortsatt som bud og visergutter, i jordbruket og hjemme.", "Barnearbeid er forbudt. Ungdom kan ha lette deltidsjobber med begrensede arbeidstider."]],
        ["Rettigheter", ["Arbeidsfolk hadde få rettigheter, og husmenn var avhengige av bonden.", "Fagforeningene vokste, og LO ble stiftet i 1899. Streik var et viktig våpen.", "Arbeidsmiljøloven gir rettigheter, og partene i arbeidslivet forhandler om lønn."]]
      ] },
    { id: "barndom", ikon: "🧒", tittel: "Barndom og familie", tema: "sf8-identitet-sosialisering",
      rader: [
        ["Hvor mange barn – og hvor mange overlevde?", ["Familiene var store, men mange barn døde før de fylte fem år.", "Barnedødeligheten gikk ned på grunn av bedre hygiene, mat og helsestell, men den var fortsatt høyere enn i dag.", "De fleste familier har ett til tre barn, og barnedødeligheten er svært lav."]],
        ["Hvem bodde sammen?", ["Ofte flere generasjoner på samme gård, sammen med tjenestefolk.", "I byene bodde mange arbeiderfamilier trangt, ofte i ett eller to rom.", "Mange ulike familieformer: kjernefamilie, delt bosted, nye familier og enslige forsørgere."]],
        ["Barns rettigheter", ["Barn hadde få rettigheter, og foreldre kunne straffe dem fysisk.", "De Castbergske barnelovene fra 1915 ga barn født utenfor ekteskap rett til farens navn og arv.", "Fysisk avstraffelse av barn ble forbudt i 1987, og FNs barnekonvensjon er norsk lov."]]
      ] },
    { id: "demokrati", ikon: "🗳️", tittel: "Demokrati og stemmerett", tema: "sf8-demokratiet-i-norge",
      rader: [
        ["Hvem kunne stemme?", ["Menn over 25 år som var embetsmenn, eide eller leide jord eller var borgere i byene – rundt 40 prosent av mennene.", "Alle menn fra 1898 og alle kvinner fra 1913 kunne stemme ved stortingsvalg.", "Alle norske statsborgere over 18 år kan stemme. Utenlandske statsborgere som har bodd i Norge i tre år, kan stemme ved kommune- og fylkestingsvalg."]],
        ["Hvem hadde makten?", ["Kongen og embetsmennene hadde mye makt. Stortinget var nytt.", "Fra 1884 måtte regjeringen ha støtte fra Stortinget (parlamentarisme).", "Makten er delt mellom Stortinget, regjeringen og domstolene. Mediene og organisasjonene er også viktige."]],
        ["Hvordan fikk folk vite om politikk?", ["Få aviser, og mange kunne ikke lese godt.", "Mange aviser, ofte knyttet til politiske partier.", "TV, nettaviser og sosiale medier – med både mer informasjon og mer desinformasjon."]]
      ] },
    { id: "kommunikasjon", ikon: "✉️", tittel: "Kommunikasjon", tema: "sf9-utvandringen",
      rader: [
        ["Hvor fort gikk et budskap?", ["Et brev kunne bruke dager eller uker. Nyheter fra utlandet tok lang tid.", "Telegrafen sendte beskjeder på minutter, og telefonen var tatt i bruk i byene.", "Meldinger går på sekunder til hele verden."]],
        ["Hvordan holdt man kontakt med familie langt borte?", ["Brev, som ble fraktet med båt eller hest.", "Amerikabrev mellom utvandrere og familien hjemme. Et brev over Atlanterhavet tok omtrent to uker.", "Videosamtaler og meldinger, uansett hvor man bor."]],
        ["Hvem kunne nå ut til mange?", ["Konger, kirken og de få som eide trykkerier og aviser.", "Aviseiere, journalister og politiske bevegelser.", "Nesten alle – gjennom sosiale medier. Men algoritmer bestemmer mye av hva vi ser."]]
      ] }
  ],
  sporsmal: [
    "Hva er den største endringen i dette temaet? Hvorfor tror du den skjedde?",
    "Hva har holdt seg ganske likt? Hvorfor har det ikke endret seg?",
    "Var endringene et fremskritt for alle? Hvem tjente på dem, og var det noen som tapte?",
    "Gikk endringen jevnt, eller var det et vendepunkt der mye endret seg raskt?"
  ],
  kontroller: "Omgangsskole og konfirmasjonstvang (1736); folkeskoleloven 1889 (sju år); fysisk straff forbudt i folkeskolen 1936; ti år grunnskole fra 1997, rett til videregående fra 1994; fabrikktilsynsloven 1892 (forbud under 12 år); åttetimersdagen 1919; LO 1899; Castbergske barnelover 1915; forbud mot fysisk avstraffelse av barn 1987; barnekonvensjonen inkorporert i menneskerettsloven 2003; stemmerett menn 1898, kvinner 1913, parlamentarisme 1884; stemmerett for utenlandske statsborgere ved lokalvalg etter tre års botid."
};
