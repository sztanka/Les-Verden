/* Les verden – Rettssaken (rettssak.html)
   To OPPDIKTEDE straffesaker til rollespill. Personer og steder finnes ikke.
   roller: hvem: navn og hvem personen er · vet: det personen vet (bare på eget
   kort) · oppgave: hva eleven skal gjøre i rettssaken. */
window.LV = window.LV || {};
LV.rettssaker = [
  {
    id: "sykkel", ikon: "🚲", tittel: "Sykkeltyveriet i Fjordvik",
    kort: "En dyr elsykkel forsvinner utenfor kjøpesenteret. Tre dager senere står den i boden til en 19-åring. Han sier han kjøpte den. Var det tyveri – eller heleri?",
    tiltale: [
      "Jonas Berg (19 år) settes under tiltale ved Fjordvik tingrett for overtredelse av **straffeloven § 321 (tyveri)**. Grunnlag: Lørdag 14. september tok han en elsykkel, verdi 25 000 kroner, som tilhørte Maria Lie, fra sykkelstativet utenfor Fjordvik kjøpesenter, med forsett om å skaffe seg en uberettiget vinning.",
      "**Subsidiært** (hvis retten ikke finner ham skyldig i tyveri): overtredelse av **straffeloven § 332 (heleri)**, for å ha kjøpt sykkelen selv om han forsto at den var stjålet."
    ],
    lovtekst: [
      ["Tyveri (§ 321)", "Den som tar en gjenstand som tilhører en annen, for å skaffe seg en uberettiget vinning, straffes for tyveri. Strafferammen er bot eller fengsel inntil 2 år."],
      ["Heleri (§ 332)", "Den som tar imot eller skaffer seg utbytte av en straffbar handling – for eksempel kjøper noe han forstår er stjålet – straffes for heleri. Strafferammen er bot eller fengsel inntil 2 år. Også den som burde ha forstått at noe var stjålet, kan straffes (uaktsomt heleri), men med lavere straff."]
    ],
    bevis: [
      ["📷 Bilde fra overvåkingskamera, kl. 14.21", "Et uklart bilde viser en ung mann i grå hettegenser som triller en svart elsykkel bort fra sykkelstativet. Ansiktet er ikke synlig. Høyde og kroppsbygning kan passe med Jonas, men også med mange andre."],
      ["🔒 Rapport fra politiet", "Sykkelen ble funnet i Jonas Bergs bod tre dager etter tyveriet, etter et tips. Låsen var klippet over. Politiet fant ikke noe verktøy hos Jonas. Sykkelen hadde ikke skader."],
      ["💬 Utskrift fra Jonas’ mobil", "Jonas har vist politiet en melding fra en ukjent avsender på en kjøp-og-salg-app: «Elsykkel selges billig, må bli kvitt den i dag, kun kontant.» Resten av samtalen er slettet. Annonsen finnes ikke lenger."],
      ["🧾 Pris", "Ny pris for sykkelen er 25 000 kroner. Jonas sier han betalte 4 000 kroner kontant, uten kvittering."]
    ],
    roller: [
      { id: "dommer", ikon: "⚖️", navn: "Dommer", hvem: "Du er fagdommer (jurist) i Fjordvik tingrett og leder forhandlingene.", vet: ["Du har lest tiltalen og bevisene, men skal ikke ta stilling før alle har snakket.", "Tiltalte har rett til å nekte å forklare seg."], oppgave: ["Følg saksgangen i dommerens manus steg for steg.", "Sørg for ro og at alle får snakke. Stopp spørsmål som er ledende eller handler om noe annet.", "Led rådslagningen med meddommerne, og les opp dommen med begrunnelse til slutt."] },
      { id: "aktor", ikon: "🏛️", navn: "Aktor (politiadvokat)", hvem: "Du representerer påtalemyndigheten – samfunnet – og skal bevise at Jonas er skyldig.", vet: ["Sykkelen sto i Jonas’ bod, med klippet lås.", "Mannen på overvåkingsbildet har samme type grå hettegenser som Jonas eier.", "4 000 kroner for en sykkel til 25 000 er svært billig. Den som kjøper så billig, burde forstå at noe er galt."], oppgave: ["Les opp tiltalen.", "Hold et kort innledningsforedrag: Hva skal du bevise?", "Still spørsmål til tiltalte og vitnene.", "Hold en prosedyre til slutt, og si hvilken straff du mener er riktig (påstand)."] },
      { id: "forsvarer", ikon: "🛡️", navn: "Forsvarer (advokat)", hvem: "Du er Jonas Bergs advokat. Jobben din er å passe på at han får en rettferdig rettssak, og å peke på tvil i bevisene.", vet: ["Ingen kan se ansiktet på overvåkingsbildet. Grå hettegensere er svært vanlige.", "Jonas var på fotballtrening til kl. 14.30, ifølge vennen Eirik.", "Politiet fant ikke noe verktøy som kunne klippe låsen."], oppgave: ["Still spørsmål til tiltalte og vitnene som får fram tvil.", "Hold en prosedyre: Hvorfor er det ikke bevist utover enhver rimelig tvil at Jonas stjal sykkelen?", "Hvis du mener det kan være heleri: Argumenter for at han ikke forsto at sykkelen var stjålet, eller for en mild straff."] },
      { id: "tiltalt", ikon: "🙋", navn: "Tiltalte: Jonas Berg (19)", hvem: "Du er 19 år, jobber i en dagligvarebutikk og spiller fotball. Du er tiltalt for å ha stjålet sykkelen.", vet: ["Du kjøpte sykkelen lørdag ettermiddag av en mann du ikke kjente, på en parkeringsplass. Han ville ha kontanter og hadde dårlig tid.", "Du syntes prisen var lav, men mannen sa at han skulle flytte og måtte bli kvitt den.", "Du slettet samtalen fordi du rydder i appen. Du skjønner nå at det var dumt.", "Du har en grå hettegenser – som halve klassen din hadde."], oppgave: ["Erklær deg ikke skyldig.", "Svar på spørsmålene fra aktor, forsvarer og dommer. Du kan velge å ikke svare.", "Du får det siste ordet før retten trekker seg tilbake."] },
      { id: "vitne1", ikon: "👩", navn: "Vitne: Maria Lie (34), sykkeleieren", hvem: "Du eier elsykkelen og bruker den til jobb.", vet: ["Du låste sykkelen med en kraftig lås kl. 14.00 og var tilbake kl. 14.40. Da var den borte.", "Du anmeldte tyveriet samme dag.", "Du kjenner ikke Jonas og har aldri sett ham før."], oppgave: ["Fortell hva som skjedde, og svar ærlig på spørsmål. Si «det vet jeg ikke» hvis du ikke vet."] },
      { id: "vitne2", ikon: "🦺", navn: "Vitne: Kari Dahl (52), vekter på kjøpesenteret", hvem: "Du var på jobb som vekter den dagen.", vet: ["Ca. kl. 14.20 så du en ung mann i grå hettegenser trille en svart sykkel mot parkeringsplassen.", "Du så ham bakfra, på 30–40 meters avstand. Du så ikke ansiktet.", "Du syntes det var litt rart at han hadde det travelt, men tenkte ikke mer over det."], oppgave: ["Fortell hva du så. Vær ærlig om hva du er sikker på, og hva du ikke er sikker på."] },
      { id: "vitne3", ikon: "⚽", navn: "Vitne: Eirik Sand (19), Jonas’ venn", hvem: "Du er Jonas’ venn og lagkamerat.", vet: ["Dere var på fotballtrening fra kl. 13.00 til kl. 14.30.", "Etterpå gikk Jonas alene. Kjøpesenteret ligger ca. ti minutter unna med sykkel.", "Jonas fortalte deg samme kveld at han hadde «gjort et kupp» og kjøpt en elsykkel billig."], oppgave: ["Svar ærlig. Du vil hjelpe vennen din, men du har lovet å snakke sant."] },
      { id: "meddommer", ikon: "🧑‍⚖️", navn: "Meddommer", hvem: "Du er en vanlig innbygger som er valgt til å dømme sammen med fagdommeren. Du har like mye å si som dommeren.", vet: ["Du vet bare det som kommer fram i retten."], oppgave: ["Lytt nøye og ta notater i skjemaet.", "I rådslagningen: Er det bevist utover enhver rimelig tvil at Jonas er skyldig i tyveri? Hvis ikke: i heleri?", "Bli enige om straff hvis han blir dømt."] },
      { id: "journalist", ikon: "📰", navn: "Journalist", hvem: "Du dekker rettssaken for lokalavisa Fjordvik Avis.", vet: ["Du vet bare det som kommer fram i retten."], oppgave: ["Ta notater underveis.", "Skriv en kort nyhetssak etterpå med tittel, ingress og sitater fra begge sider.", "Husk: Før dommen er falt, er Jonas uskyldig til det motsatte er bevist."] }
    ]
  },
  {
    id: "trussel", ikon: "💬", tittel: "Kommentaren",
    kort: "En sint kommentar til en lokalpolitiker i sosiale medier: «Pass deg når du går hjem i kveld.» Var det en straffbar trussel – eller bare dumme ord?",
    tiltale: [
      "Tor Andersen (22 år) settes under tiltale ved Fjordvik tingrett for overtredelse av **straffeloven § 263 (trusler)**. Grunnlag: Tirsdag 3. oktober kl. 23.14 skrev han i kommentarfeltet under et innlegg fra kommunestyrerepresentant Lise Hauge: «Du skal få se hva som skjer med folk som deg. Pass deg når du går hjem i kveld.» Uttalelsen var egnet til å fremkalle alvorlig frykt."
    ],
    lovtekst: [
      ["Trusler (§ 263)", "Den som i ord eller handling truer med straffbar atferd under slike omstendigheter at trusselen er egnet til å fremkalle alvorlig frykt, straffes med bot eller fengsel inntil 1 år. Det avgjørende er ikke om den som truer, mente det – men hvordan trusselen må oppfattes."],
      ["Ytringsfrihet (Grunnloven § 100)", "Alle har rett til å si sin mening, også skarp kritikk av politikere. Men ytringsfriheten beskytter ikke trusler."]
    ],
    bevis: [
      ["💬 Skjermbilde av kommentaren", "«Du skal få se hva som skjer med folk som deg. Pass deg når du går hjem i kveld.» Skrevet kl. 23.14 fra en konto med Tor Andersens navn og bilde. Kommentaren ble slettet av Tor kl. 07.50 neste morgen."],
      ["📝 Innlegget Lise Hauge hadde skrevet", "Hauge hadde foreslått å legge ned ungdomsklubben i Fjordvik for å spare penger. Innlegget fikk over 300 kommentarer, mange sinte."],
      ["🔒 Rapport fra politiet", "Kontoen er knyttet til Tor Andersens mobilnummer. Tor har ikke tidligere straffer. Han har aldri hatt kontakt med Hauge før."],
      ["🗺️ Kart", "Tor bor ca. 15 kilometer fra Hauge. Hauge skriver ofte i sosiale medier at hun går hjem fra kommunestyremøtene."]
    ],
    roller: [
      { id: "dommer", ikon: "⚖️", navn: "Dommer", hvem: "Du er fagdommer i Fjordvik tingrett og leder forhandlingene.", vet: ["Spørsmålet er ikke bare om Tor skrev kommentaren – det innrømmer han – men om den er en straffbar trussel.", "Det avgjørende er om kommentaren var egnet til å fremkalle alvorlig frykt hos en vanlig person i Hauges situasjon."], oppgave: ["Følg saksgangen i dommerens manus.", "Pass på at begge sider får komme fram.", "Led rådslagningen og les opp dommen med begrunnelse."] },
      { id: "aktor", ikon: "🏛️", navn: "Aktor (politiadvokat)", hvem: "Du representerer påtalemyndigheten.", vet: ["Kommentaren ble skrevet sent på kvelden og nevner «i kveld» og veien hjem.", "Hauge ble så redd at hun fikk en kollega til å kjøre henne hjem, og hun har vurdert å slutte i politikken.", "Trusler mot politikere kan føre til at folk ikke tør å engasjere seg. Det er et problem for demokratiet."], oppgave: ["Les opp tiltalen og hold et innledningsforedrag.", "Spør tiltalte og vitnene.", "Hold prosedyre og legg ned påstand om straff."] },
      { id: "forsvarer", ikon: "🛡️", navn: "Forsvarer (advokat)", hvem: "Du er Tor Andersens advokat.", vet: ["Tor var sint og hadde drukket. Han slettet kommentaren neste morgen og har aldri hatt kontakt med Hauge.", "Han bor 15 kilometer unna og hadde ingen planer om å gjøre noe.", "Ytringsfriheten skal være vid, også for sinte og stygge ytringer om politikere."], oppgave: ["Spør tiltalte og vitnene slik at det kommer fram at Tor ikke mente det.", "Hold prosedyre: Var kommentaren egentlig egnet til å skape alvorlig frykt? Hvis den var det: Hvorfor bør straffen være mild?"] },
      { id: "tiltalt", ikon: "🙋", navn: "Tiltalte: Tor Andersen (22)", hvem: "Du er 22 år og jobber på et bilverksted. Du gikk selv på ungdomsklubben da du var yngre.", vet: ["Du ble rasende da du leste at klubben skulle legges ned. Du hadde drukket noen øl.", "Du skrev kommentaren uten å tenke. Du mente det ikke som en trussel – du ville at hun skulle «skjønne hvor sinte folk er».", "Du skjønte neste morgen at det så stygt ut, og slettet den.", "Du har aldri truet noen før, og du angrer."], oppgave: ["Du kan erkjenne at du skrev kommentaren, men erklær deg ikke skyldig i trusler.", "Svar på spørsmålene. Du får siste ord til slutt."] },
      { id: "vitne1", ikon: "👩‍💼", navn: "Vitne: Lise Hauge (45), kommunestyrerepresentant", hvem: "Du er lokalpolitiker og fikk kommentaren.", vet: ["Du så kommentaren kl. 23.20, rett før du skulle gå hjem fra et møte.", "Du ble redd og ba en kollega kjøre deg hjem. Du sov dårlig i flere netter.", "Du får mange sinte kommentarer, men denne var annerledes fordi den nevnte «i kveld» og veien hjem.", "Du har vurdert å ikke stille til valg igjen."], oppgave: ["Fortell hvordan du opplevde kommentaren. Svar ærlig på spørsmål."] },
      { id: "vitne2", ikon: "🍺", navn: "Vitne: Sander Moe (23), Tors venn", hvem: "Du var sammen med Tor den kvelden.", vet: ["Dere så fotball og drakk noen øl hjemme hos Tor.", "Tor ble veldig sint da han leste om ungdomsklubben og skrev noe på mobilen. Du så ikke hva.", "Tor er en snill fyr som «snakker høyt, men aldri gjør noe»."], oppgave: ["Svar ærlig på spørsmålene."] },
      { id: "vitne3", ikon: "👮", navn: "Vitne: politibetjent Nina Aas", hvem: "Du etterforsket saken.", vet: ["Hauge anmeldte kommentaren neste dag.", "Kommentaren var slettet, men Hauge hadde tatt skjermbilde.", "Tor innrømmet med en gang i avhør at han skrev den, og var lei seg.", "Politiet får mange saker om trusler mot politikere, og de har blitt flere de siste årene."], oppgave: ["Fortell om etterforskningen og svar på spørsmål."] },
      { id: "meddommer", ikon: "🧑‍⚖️", navn: "Meddommer", hvem: "Du er en vanlig innbygger som dømmer sammen med fagdommeren.", vet: ["Du vet bare det som kommer fram i retten."], oppgave: ["Lytt og ta notater i skjemaet.", "I rådslagningen: Var kommentaren egnet til å fremkalle alvorlig frykt? Er det bevist utover rimelig tvil?", "Bli enige om straff hvis Tor blir dømt."] },
      { id: "journalist", ikon: "📰", navn: "Journalist", hvem: "Du dekker saken for Fjordvik Avis.", vet: ["Du vet bare det som kommer fram i retten."], oppgave: ["Ta notater og skriv en kort nyhetssak etterpå.", "Hvordan kan du skrive om saken uten å gjøre det verre for noen av partene?"] }
    ]
  }
];
LV.rettssakGang = [
  ["Retten settes", "Dommeren ønsker velkommen, sier hvilken sak det gjelder, og sjekker at alle er til stede. Vitnene venter utenfor til de skal forklare seg."],
  ["Tiltalen leses opp", "Aktor leser opp tiltalen."],
  ["Erkjenner du straffskyld?", "Dommeren spør tiltalte om hen erkjenner straffskyld (skyldig eller ikke skyldig)."],
  ["Aktors innledningsforedrag", "Aktor forteller kort hva saken gjelder, og hva aktor vil bevise."],
  ["Tiltaltes forklaring", "Dommeren minner tiltalte om at hen ikke har plikt til å forklare seg. Tiltalte forteller, og aktor, forsvarer og dommer stiller spørsmål."],
  ["Vitneforklaringer", "Ett vitne om gangen kommer inn. Dommeren minner vitnet om plikten til å snakke sant. Aktor spør først, så forsvarer, så dommer og meddommere."],
  ["Bevisene", "Aktor eller forsvarer viser fram bevisene (bilder, meldinger, rapporter)."],
  ["Prosedyrer", "Aktor oppsummerer og sier hvilken straff aktor mener er riktig (påstand). Deretter forsvarer. Aktor kan få svare kort."],
  ["Siste ord", "Tiltalte får alltid det siste ordet."],
  ["Rådslagning", "Dommer og meddommere trekker seg tilbake. Først skyldspørsmålet: Er det bevist utover enhver rimelig tvil? Så eventuelt straffen. Flertallet bestemmer."],
  ["Dommen avsies", "Dommeren leser opp dommen med begrunnelse: skyldig eller frifunnet, og eventuell straff."]
];
LV.rettssakStraff = [
  ["Frifinnelse", "Tiltalte er ikke skyldig – eller det er ikke bevist utover rimelig tvil."],
  ["Bot", "Tiltalte må betale et pengebeløp til staten."],
  ["Samfunnsstraff", "Tiltalte må gjøre samfunnsnyttig arbeid et visst antall timer, i stedet for fengsel."],
  ["Betinget fengsel", "Fengselsstraff som ikke sones, hvis tiltalte ikke gjør noe nytt kriminelt i en prøvetid (ofte 2 år)."],
  ["Ubetinget fengsel", "Tiltalte må sone i fengsel."]
];
