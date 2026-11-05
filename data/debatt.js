/* =========================================================
   Les verden – Debattduell (debatt.html)
   Hver påstand har argumentkort: side "for", "mot" eller "svak"
   (svake argumenter har «feil» = typen argumentasjonsfeil og «hvorfor»).
   ========================================================= */
window.LV = window.LV || {};
LV.debatt = {
  feil: {
    nb: [
      ["Hersketeknikk / personangrep", "Man angriper personen i stedet for argumentet: «Du er for ung til å forstå.»"],
      ["Stråmann", "Man forvrenger det motparten mener, og angriper den forvrengte versjonen."],
      ["Generalisering", "Man trekker en stor konklusjon fra få eksempler: «Alle ungdommer …»"],
      ["Anekdote", "Én historie brukes som om den beviste noe for alle: «Fetteren min …»"],
      ["Alle gjør det", "At mange mener eller gjør noe, gjør det ikke riktig."],
      ["Ikke relevant", "Argumentet handler egentlig om noe annet enn påstanden."]
    ],
    en: [
      ["Personal attack", "Attacking the person instead of the argument: «You're too young to understand.»"],
      ["Straw man", "Twisting what the other side means, then attacking the twisted version."],
      ["Generalisation", "Drawing a big conclusion from a few examples: «All teenagers …»"],
      ["Anecdote", "Using one story as if it proved something for everyone: «My cousin …»"],
      ["Bandwagon", "Something isn't right just because many people do it or think it."],
      ["Irrelevant", "The argument is really about something else."]
    ]
  },
  pastander: [
    { id: "mobil", sprak: "nb", tema: "sf9-medier-pavirkning", pastand: "Mobiltelefoner bør være forbudt på skolen hele dagen.", kort: [
      { t: "Elever konsentrerer seg bedre i timene når mobilen er borte.", side: "for" },
      { t: "Det blir mindre mobbing på sosiale medier i skoletiden.", side: "for" },
      { t: "Friminuttene blir mer sosiale når folk snakker sammen i stedet for å se på skjermen.", side: "for" },
      { t: "Elever må lære å bruke mobilen fornuftig – det lærer de ikke av et forbud.", side: "mot" },
      { t: "Mobilen kan være nyttig i undervisningen, for eksempel til ordbok og filming.", side: "mot" },
      { t: "Foreldre vil kunne nå barna sine hvis noe skjer.", side: "mot" },
      { t: "De som vil ha mobilforbud, er bare gamle folk som ikke skjønner teknologi.", side: "svak", feil: "Hersketeknikk / personangrep", hvorfor: "Angriper dem som mener noe, ikke argumentene deres." },
      { t: "Alle andre skoler i kommunen har forbud, så vi må også ha det.", side: "svak", feil: "Alle gjør det", hvorfor: "At andre gjør det, er ikke en begrunnelse for at det er lurt." }
    ] },
    { id: "16", sprak: "nb", tema: "sf8-demokratiet-i-norge", pastand: "16-åringer bør få stemme ved stortingsvalg.", kort: [
      { t: "16-åringer betaler skatt hvis de har jobb, og påvirkes av politikken.", side: "for" },
      { t: "Unge som stemmer tidlig, fortsetter ofte å stemme resten av livet.", side: "for" },
      { t: "Mange politiske saker, som klima og skole, angår unge mest.", side: "for" },
      { t: "Myndighetsalderen er 18 år, og stemmeretten bør følge den.", side: "mot" },
      { t: "Mange 16-åringer sier selv at de ikke føler seg klare til å stemme.", side: "mot" },
      { t: "Foreldrene kan få stor påvirkning på hva 16-åringer stemmer.", side: "mot" },
      { t: "Min lillebror på 16 vet ingenting om politikk, så ingen 16-åringer bør stemme.", side: "svak", feil: "Anekdote", hvorfor: "Én person sier ingenting om alle 16-åringer." },
      { t: "Motstanderne vil at unge aldri skal få si noe om noe som helst.", side: "svak", feil: "Stråmann", hvorfor: "Forvrenger hva motstanderne faktisk mener." }
    ] },
    { id: "olje", sprak: "nb", tema: "sf10-norge-etter-1945", pastand: "Norge bør slutte å lete etter ny olje og gass.", kort: [
      { t: "Olje og gass gir store utslipp av klimagasser når de brennes.", side: "for" },
      { t: "Det tar mange år før nye felt gir olje – da bør verden bruke mindre olje.", side: "for" },
      { t: "Norge bør ta ansvar som et rikt land og vise vei.", side: "for" },
      { t: "Mange tusen arbeidsplasser er knyttet til oljenæringen.", side: "mot" },
      { t: "Hvis Norge slutter, kan andre land produsere olje med enda større utslipp.", side: "mot" },
      { t: "Oljeinntektene betaler for mye av velferden vår.", side: "mot" },
      { t: "Klimaaktivister er hysteriske og overdriver alt.", side: "svak", feil: "Hersketeknikk / personangrep", hvorfor: "Sier noe negativt om personer, ikke om saken." },
      { t: "Det var veldig kaldt i vinter, så global oppvarming er ikke noe problem.", side: "svak", feil: "Generalisering", hvorfor: "Én kald vinter sier ingenting om den langsiktige utviklingen i klimaet." }
    ] },
    { id: "uniform", sprak: "nb", tema: "sf8-identitet-sosialisering", pastand: "Norske skoler bør innføre skoleuniform.", kort: [
      { t: "Uniform kan redusere press om merkeklær og dyre klær.", side: "for" },
      { t: "Det blir mindre forskjell mellom elever med mye og lite penger.", side: "for" },
      { t: "Det kan gi en følelse av fellesskap og tilhørighet til skolen.", side: "for" },
      { t: "Klær er en måte å uttrykke hvem man er på.", side: "mot" },
      { t: "Uniformer koster penger, og ikke alle familier har råd.", side: "mot" },
      { t: "Mobbing handler om mer enn klær og forsvinner ikke med uniform.", side: "mot" },
      { t: "I Storbritannia har de uniform, så det må være bra.", side: "svak", feil: "Alle gjør det", hvorfor: "At et annet land gjør det, viser ikke at det er bra." },
      { t: "Skoleuniformer er stygge.", side: "svak", feil: "Ikke relevant", hvorfor: "En smakssak, ikke et argument om hva som er best for elevene." }
    ] },
    { id: "ki", sprak: "nb", tema: "sf8-kildekritikk", pastand: "Elever bør få bruke KI-verktøy til skolearbeid.", kort: [
      { t: "KI kan forklare ting på nye måter når man står fast.", side: "for" },
      { t: "Elevene må lære å bruke verktøy de kommer til å bruke i arbeidslivet.", side: "for" },
      { t: "Med gode regler kan KI gi raske tilbakemeldinger på utkast.", side: "for" },
      { t: "Man lærer mindre hvis KI skriver teksten for en.", side: "mot" },
      { t: "KI kan gi feil svar som høres riktige ut.", side: "mot" },
      { t: "Det blir vanskelig for læreren å vurdere hva eleven selv kan.", side: "mot" },
      { t: "Alle elever jukser uansett, så det spiller ingen rolle.", side: "svak", feil: "Generalisering", hvorfor: "En påstand om «alle» uten grunnlag." },
      { t: "Lærere som er mot KI, er bare redde for å miste jobben.", side: "svak", feil: "Hersketeknikk / personangrep", hvorfor: "Gjetter på motivene til personer i stedet for å svare på argumentene." }
    ] },
    { id: "straff", sprak: "nb", tema: "sf9-kriminalitet-straff", pastand: "Unge lovbrytere bør få strengere straffer.", kort: [
      { t: "Strenge straffer kan skremme noen fra å begå lovbrudd.", side: "for" },
      { t: "Ofrene fortjener at samfunnet tar lovbrudd på alvor.", side: "for" },
      { t: "Forskning viser at fengsel ofte gjør unge mer kriminelle, ikke mindre.", side: "mot" },
      { t: "Ungdomsstraff med mekling og oppfølging gir ofte bedre resultater.", side: "mot" },
      { t: "Barnekonvensjonen sier at fengsel for barn bare skal brukes som en siste utvei.", side: "mot" },
      { t: "Ungdommen i dag har ingen respekt for noe.", side: "svak", feil: "Generalisering", hvorfor: "En svært bred påstand om en hel generasjon." },
      { t: "De som vil ha mildere straffer, bryr seg ikke om ofrene.", side: "svak", feil: "Stråmann", hvorfor: "Forvrenger hva den andre siden mener." }
    ] },
    { id: "homework", sprak: "en", tema: "en8-school-youth-culture", pastand: "Schools should stop giving homework.", kort: [
      { t: "Students need time to rest, play sports and be with family.", side: "for" },
      { t: "Homework can increase differences between students who get help at home and those who don't.", side: "for" },
      { t: "Students can practise more at school, where a teacher can help.", side: "for" },
      { t: "Homework helps students practise and remember what they learned.", side: "mot" },
      { t: "Homework teaches students to plan and work on their own.", side: "mot" },
      { t: "Parents can see what their children are learning.", side: "mot" },
      { t: "My friend never does his homework and he still gets good grades.", side: "svak", feil: "Anecdote", hvorfor: "One friend doesn't prove anything about all students." },
      { t: "Teachers only give homework because they like to make students suffer.", side: "svak", feil: "Straw man", hvorfor: "This twists teachers' reasons instead of answering them." }
    ] },
    { id: "socialmedia", sprak: "en", tema: "en10-group-think", pastand: "Social media should have an age limit of 15.", kort: [
      { t: "Young people are more easily affected by harmful content and pressure.", side: "for" },
      { t: "Algorithms are designed to keep users online for as long as possible.", side: "for" },
      { t: "An age limit gives parents support when they say no.", side: "for" },
      { t: "It is very hard to check a user's real age online.", side: "mot" },
      { t: "Social media helps young people keep in touch with friends and find communities.", side: "mot" },
      { t: "It is better to teach young people to use social media wisely than to ban it.", side: "mot" },
      { t: "Everybody in my class is on social media, so it must be fine.", side: "svak", feil: "Bandwagon", hvorfor: "Many people doing something doesn't make it right." },
      { t: "People who want age limits just hate young people.", side: "svak", feil: "Personal attack", hvorfor: "Attacks people's motives instead of their arguments." }
    ] },
    { id: "zoo", sprak: "en", tema: "en8-food-travel", pastand: "Zoos should be closed.", kort: [
      { t: "Wild animals need much more space than a zoo can give them.", side: "for" },
      { t: "Animals in zoos often show signs of stress and boredom.", side: "for" },
      { t: "We can learn about animals from documentaries and nature parks instead.", side: "for" },
      { t: "Zoos help protect endangered species through breeding programmes.", side: "mot" },
      { t: "Zoos teach children to care about animals and nature.", side: "mot" },
      { t: "Some zoos do important research and help animals in the wild.", side: "mot" },
      { t: "Zoo tickets are too expensive.", side: "svak", feil: "Irrelevant", hvorfor: "The price says nothing about whether zoos should exist." },
      { t: "I saw a sad lion once, so all zoo animals are unhappy.", side: "svak", feil: "Generalisation", hvorfor: "One animal doesn't tell us about all animals in all zoos." }
    ] },
    { id: "english", sprak: "en", tema: "en10-english-speaking-world", pastand: "English should become a second official language in Norway.", kort: [
      { t: "Most Norwegians already speak English well.", side: "for" },
      { t: "It would make life easier for people who move to Norway to work.", side: "for" },
      { t: "Norwegian companies and universities already use a lot of English.", side: "for" },
      { t: "Norwegian could lose ground, especially in science and business.", side: "mot" },
      { t: "Norway already has two written forms of Norwegian and Sámi languages to protect.", side: "mot" },
      { t: "Official documents in two languages would cost a lot of money.", side: "mot" },
      { t: "English is a more beautiful language than Norwegian.", side: "svak", feil: "Irrelevant", hvorfor: "Beauty is a matter of taste, not a reason for an official language." },
      { t: "People who disagree want Norway to be closed to the world.", side: "svak", feil: "Straw man", hvorfor: "This twists what the other side means." }
    ] }
  ]
};
