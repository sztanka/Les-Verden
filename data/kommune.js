/* =========================================================
   Les verden – Ordfører for en dag (kommune.html)
   Den oppdiktede kommunen Fjordvik. Beløp i millioner kroner.
   omrader: min = det kommunen minst må bruke for å oppfylle lovkrav
   grupper: andel = del av velgerne, vekt = hvor mye de bryr seg om hvert område
   dilemmaer: valg med virkning på grupper (g) og budsjett (b, millioner per år)
   ========================================================= */
window.LV = window.LV || {};
LV.kommune = {
  navn: "Fjordvik",
  budsjett: 800,
  steg: 10,
  omrader: [
    { id: "oppvekst", navn: "Skole og barnehage", ikon: "🏫", start: 300, min: 270, tekst: "Barneskoler, ungdomsskole, barnehager, SFO og helsesykepleier." },
    { id: "omsorg", navn: "Helse og eldreomsorg", ikon: "🧓", start: 290, min: 260, tekst: "Sykehjem, hjemmetjeneste, legevakt og fastleger." },
    { id: "kultur", navn: "Kultur, idrett og fritid", ikon: "🎸", start: 30, min: 0, tekst: "Ungdomsklubb, bibliotek, kulturskole, idrettshall og turstier." },
    { id: "vei", navn: "Veier, vann og avløp", ikon: "🚧", start: 80, min: 60, tekst: "Kommunale veier, brøyting, vann, kloakk og renovasjon." },
    { id: "sosial", navn: "Sosialhjelp og bosetting", ikon: "🤝", start: 50, min: 40, tekst: "Økonomisk hjelp gjennom NAV, kommunale boliger og bosetting av flyktninger." },
    { id: "miljo", navn: "Klima og miljø", ikon: "🌱", start: 20, min: 0, tekst: "Ladestasjoner, sykkelveier, flomsikring og vern av natur." },
    { id: "adm", navn: "Administrasjon", ikon: "🗂️", start: 30, min: 20, tekst: "Rådhuset, saksbehandling, IT og ansatte som planlegger og følger opp." }
  ],
  grupper: [
    { id: "familier", navn: "Barnefamilier", ikon: "👨‍👩‍👧", andel: 30, vekt: { oppvekst: 3, kultur: 1, vei: 1 } },
    { id: "eldre", navn: "Eldre", ikon: "👵", andel: 25, vekt: { omsorg: 3, vei: 1, kultur: 0.5 } },
    { id: "ungdom", navn: "Unge velgere", ikon: "🛹", andel: 10, vekt: { kultur: 3, miljo: 2, oppvekst: 1 } },
    { id: "naering", navn: "Næringslivet", ikon: "🏭", andel: 15, vekt: { vei: 3, adm: 1, oppvekst: 0.5 } },
    { id: "miljo", navn: "Miljøengasjerte", ikon: "🌍", andel: 10, vekt: { miljo: 3, kultur: 0.5, vei: -0.5 } },
    { id: "trygghet", navn: "De som trenger hjelp", ikon: "🫶", andel: 10, vekt: { sosial: 3, omsorg: 1 } }
  ],
  // b = endring i budsjettet hvert år framover (engang: true = bare neste år)
  dilemmaer: [
    { id: "skole", tittel: "Den lille skolen i Nordbygda", tekst: "Nordbygda skole har bare 34 elever. Rådmannen foreslår å legge den ned og la elevene ta buss 25 minutter til sentrumsskolen. Det vil spare 8 millioner i året. Foreldrene i Nordbygda har samlet 900 underskrifter mot nedleggelse.",
      valg: [
        { t: "Legge ned skolen og bruke pengene på andre ting.", g: { familier: -8, naering: 3 }, b: 8, nyhet: "«Ordføreren la ned bygdeskolen» – foreldrene i Nordbygda er rasende." },
        { t: "Beholde skolen.", g: { familier: 5, naering: -2 }, b: 0, nyhet: "«Skolen i Nordbygda reddet!» – men pengene må tas fra noe annet." },
        { t: "Utsette saken ett år og utrede den bedre.", g: { familier: 1 }, b: 0, nyhet: "«Ordføreren skyver skolesaken foran seg», skriver lokalavisa." }
      ] },
    { id: "skatepark", tittel: "Ungdommen vil ha skatepark", tekst: "Ungdomsrådet har samlet inn 2 000 underskrifter for en skatepark i sentrum. Den vil koste 6 millioner. Noen naboer klager på at det blir bråk.",
      valg: [
        { t: "Bygge skateparken (koster 6 millioner).", g: { ungdom: 12, familier: 2, eldre: -2 }, b: -6, engang: true, nyhet: "«Endelig!» – ungdommene i Fjordvik jubler over ny skatepark." },
        { t: "Si nei – det er ikke penger til det.", g: { ungdom: -10 }, b: 0, nyhet: "«Politikerne hører ikke på oss», sier leder for ungdomsrådet." },
        { t: "Si ja hvis ungdommene selv samler inn halvparten.", g: { ungdom: 3, naering: 2 }, b: -3, engang: true, nyhet: "Ungdom starter dugnad og innsamling for skatepark." }
      ] },
    { id: "storm", tittel: "Stormen", tekst: "En kraftig storm har ødelagt veien til Sørvika og skadet en kai. Det haster: 300 mennesker kommer seg ikke på jobb og skole. Reparasjonen koster 12 millioner.",
      valg: [
        { t: "Ta lån og reparere med en gang (koster 2 millioner i renter hvert år framover).", g: { naering: 4, familier: 2 }, b: -2, nyhet: "Veien til Sørvika er åpnet igjen etter rekordrask reparasjon." },
        { t: "Kutte i kultur og miljø i år for å betale.", g: { ungdom: -6, miljo: -6, naering: 3 }, b: -12, engang: true, nyhet: "Biblioteket får kortere åpningstider – pengene går til veien." },
        { t: "Vente med reparasjonen til neste år.", g: { naering: -10, familier: -5, eldre: -4 }, b: 0, nyhet: "«Vi er glemt», sier innbyggerne i Sørvika." }
      ] },
    { id: "hytter", tittel: "Hyttefelt i fjellet", tekst: "Et utbyggingsfirma vil bygge 200 hytter i et populært turområde. Det gir arbeidsplasser og 5 millioner i året i inntekter til kommunen. Men naturområdet er viktig for villrein, friluftsliv og reiseliv.",
      valg: [
        { t: "Si ja til hyttefeltet.", g: { naering: 10, miljo: -14, ungdom: -3 }, b: 5, nyhet: "Gravemaskinene er på plass i fjellet – miljøvernere demonstrerer." },
        { t: "Si nei og verne området.", g: { naering: -8, miljo: 12, ungdom: 3 }, b: 0, nyhet: "«Fjellet er reddet», sier turlaget." },
        { t: "Si ja til et mindre felt med 60 hytter, langt fra reinens trekkveier.", g: { naering: 4, miljo: -3 }, b: 2, nyhet: "Kompromiss om hyttefelt: «Ingen er helt fornøyd.»" }
      ] },
    { id: "bosetting", tittel: "Bosetting av flyktninger", tekst: "Staten spør om Fjordvik kan ta imot 20 flyktninger neste år. Kommunen får tilskudd fra staten, men trenger boliger, lærere og tolker. Noen innbyggere er skeptiske, andre har startet en vennegruppe.",
      valg: [
        { t: "Si ja til 20 og satse på god integrering.", g: { trygghet: 6, naering: 2, eldre: -2 }, b: 2, nyhet: "Fjordvik ønsker nye innbyggere velkommen – frivillige stiller opp." },
        { t: "Si ja til 10.", g: { trygghet: 2 }, b: 1, nyhet: "Kommunen sier ja til færre enn staten ba om." },
        { t: "Si nei.", g: { trygghet: -8, eldre: 2 }, b: 0, nyhet: "Staten kritiserer Fjordvik for å si nei til bosetting." }
      ] },
    { id: "sykehjem", tittel: "Sykehjem eller hjemmetjeneste?", tekst: "Det blir flere eldre i Fjordvik. Noen vil bygge et nytt sykehjem med 30 plasser. Andre mener det er bedre at flere eldre får hjelp hjemme, med teknologi som trygghetsalarmer og digitale medisinskap.",
      valg: [
        { t: "Bygge nytt sykehjem (koster 8 millioner i året i lån og drift).", g: { eldre: 10, familier: -1 }, b: -8, nyhet: "Nytt sykehjem vedtatt: «Endelig trygghet for de eldste.»" },
        { t: "Satse på hjemmetjeneste og velferdsteknologi (koster 3 millioner i året).", g: { eldre: 3, naering: 2 }, b: -3, nyhet: "Eldre i Fjordvik får trygghetsalarm og flere besøk hjemme." },
        { t: "Ikke gjøre noe nå.", g: { eldre: -10 }, b: 0, nyhet: "Lange ventelister på sykehjemsplass: «Dette er uverdig.»" }
      ] },
    { id: "eiendomsskatt", tittel: "Eiendomsskatt", tekst: "Rådmannen foreslår å øke eiendomsskatten. Det vil gi kommunen 20 millioner mer i året, men alle som eier hus eller hytte, må betale mer.",
      valg: [
        { t: "Øke eiendomsskatten (+20 millioner i året).", g: { familier: -4, eldre: -4, naering: -6, trygghet: 2 }, b: 20, nyhet: "«Skattesjokk i Fjordvik» – men kommunen får penger til mer velferd." },
        { t: "Holde skatten som den er.", g: {}, b: 0, nyhet: "Ingen endring i eiendomsskatten." },
        { t: "Fjerne eiendomsskatten helt (−15 millioner i året).", g: { familier: 4, eldre: 4, naering: 6, trygghet: -4 }, b: -15, nyhet: "Eiendomsskatten fjernes – men hvor skal kommunen kutte?" }
      ] }
  ],
  fakta: [
    "Norge har 357 kommuner. De har ansvar for mye av det som betyr mest i hverdagen: barnehager, grunnskole, eldreomsorg, helsestasjon, sosialhjelp, vann og avløp.",
    "Kommunene får penger fra skatt på innbyggernes inntekt, overføringer fra staten (rammetilskudd), avgifter og noen steder eiendomsskatt.",
    "Mange tjenester er **lovpålagte** – kommunen må gi dem. Derfor er det ofte lite penger igjen til det som er frivillig, som kultur og fritid.",
    "Kommunestyret vedtar budsjettet. Ordføreren leder kommunestyret, men kan ikke bestemme alene – hun eller han må få flertall.",
    "Kommunestyrevalg holdes hvert fjerde år, to år etter stortingsvalget."
  ]
};
