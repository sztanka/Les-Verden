# Les verden

En lese- og læringsressurs i **samfunnsfag** og **engelsk** for 8.–10. trinn (LK20).
Hver temaside er bygd rundt en fagtekst med ordforklaringer, «Stopp og tenk»-spørsmål,
lettlest sammendrag og oppgaver på tre nivåer.

Nettstedet er helt statisk: ren HTML, CSS og JavaScript. Filen `.nojekyll` i rotmappa gjør at GitHub Pages publiserer filene direkte uten å kjøre Jekyll (raskere og færre byggefeil). Det trenger ingen server,
ingen byggesteg og lagrer **ingenting** om elevene.

---

## Mappestruktur

```
les-verden/
├── index.html              Forside med fag- og trinnvalg
├── tema.html               Temaside (samme fil for alle temaer)
├── laerer.html             Informasjon for lærere
├── tidslinje.html          Felles tidslinje (lages automatisk fra temaene)
├── begreper.html           Begrepsbank (lages automatisk fra temaene)
├── personer.html           Personer og quizen «Hvem er jeg?» (lages automatisk)
├── eksamen.html            Eksamenssone for muntlig eksamen
├── kartspill.html          Kartspill (verden, Europa, USA, Storbritannia)
├── mysterium.html          Kalde spor i historien + Cold Case Mysteries (logikkgåter), data i data/mysterium/
├── film.html               Film i undervisningen + skriveguider for filmanmeldelse (data i data/film/)
├── skriving.html           Skriveverksted: skriveguider med setningsstartere og skriverammer (data i data/skriving/)
├── sport.html              Sports in the English-speaking world (data i data/sport.js, brukes også av landsidene)
├── lesing.html             Reading Room: tekster i det fri med lett versjon og oppgaver (data i data/lesing/)
├── lesestrategier.html    Lesestrategier før, under og etter lesing (data i data/lesestrategier.js)
├── sok.html                Søk i hele nettstedet (indeks i data/sok.js, lages av verktoy/lag-sok.mjs)
├── grammatikk.html         Grammar and vocabulary (engelsk), data i data/grammatikk/
├── ordbok.html             Ordbok: Bokmålsordboka + norsk–engelsk (data i data/ordbok/)
├── spill.html              Læringsspill: memory, gjett ordet, ordsøk, tidslinje (lages automatisk)
├── verktoy/                Verktøy som lager kartene (trengs ikke på nettsiden)
├── assets/
│   ├── stil.css            All styling (farger øverst i fila)
│   ├── felles.js           Toppmeny, lesestøtte, bunntekst
│   ├── forside.js          Verdenskart, «Visste du at …?» og temakort
│   ├── tema.js             Bygger temasiden fra datafila
│   ├── samle.js            Henter innhold fra alle temaene
│   ├── tidslinje.js        Felles tidslinje
│   ├── begreper.js         Begrepsbank
│   ├── personer.js         Personsiden og «Hvem er jeg?»
│   ├── eksamen.js          Eksamenssonen (verktøyene)
│   ├── kartspill.js        Kartspillet
│   └── bilder/             Bilder til temakortene
└── data/
    ├── innstillinger.js    Navnet på nettstedet m.m.
    ├── kart.js             Verdenskartet (generert – ikke rediger)
    ├── eksamen.js          Tekstene i eksamenssonen (rediger fritt)
    ├── kartspill.js        Spillsettene i kartspillet (generert)
    ├── kart/               Kartene til kartspillet (generert)
    └── temaer/
        ├── oversikt.js     Liste over alle temaer
        └── <id>.js         Ett tema per fil, f.eks. sf10-andre-verdenskrig.js
```

Datafilene er `.js` og ikke `.json`. Da virker siden også når du åpner
`index.html` direkte fra disken, ikke bare på GitHub Pages.

---

## Temaplan

`TEMAPLAN.md` viser alle planlagte temaer for 8.–10. trinn, med id og koblinger mellom fagene.
Kryss av når et tema er ferdig.

---

## Endre navnet på nettstedet

Åpne `data/innstillinger.js` og endre `navn`, `forkortelse` (de to bokstavene i logoen),
`undertittel` og `beskrivelse`.

---

## Legge til et nytt tema

1. **Kopier en eksisterende temafil** i `data/temaer/`, for eksempel
   `sf9-industrialiseringen.js`, og gi kopien et nytt navn, for eksempel
   `sf10-andre-verdenskrig.js`.
   Navnet bør starte med fag og trinn: `sf` = samfunnsfag, `en` = engelsk.

2. **Endre innholdet** i den nye fila. Husk å endre `id` slik at den er lik filnavnet
   (uten `.js`).

3. **Legg temaet til i `data/temaer/oversikt.js`:**

   ```js
   {
     id: "sf10-andre-verdenskrig",
     fag: "samfunnsfag",       // "samfunnsfag" eller "engelsk"
     emne: "historie",         // bare samfunnsfag: "historie", "geografi" eller "samfunnskunnskap"
     trinn: 10,
     tittel: "Andre verdenskrig",
     kort: "Én setning som vises på temakortet.",
     sted: { navn: "Berlin", lat: 52.52, lon: 13.40 },   // prikken på kartet
     bilde: "assets/bilder/sf10-andre-verdenskrig.jpg",  // bilde på temakortet
     bildeAlt: "Kort beskrivelse av hva bildet viser",
     kreditt: "Navn på fotografen",
     kredittUrl: "https://unsplash.com/@brukernavn",           // valgfritt
     kilde: "Unsplash",                                        // valgfritt
     kildeUrl: "https://unsplash.com/",                        // valgfritt
     fakta: [                                            // til «Visste du at …?»
       "En kort og overraskende faktasetning.",
       "En til."
     ]
   },
   ```

   `emne` bestemmer hvilken del av samfunnsfag temaet hører til. Når man velger
   Samfunnsfag på forsiden, kan man filtrere på historie, geografi og
   samfunnskunnskap, og man kan lenke direkte til en del, for eksempel
   `index.html?fag=samfunnsfag&emne=geografi`.

   For engelske temaer legger du også til `sprak: "en"`, slik at
   «Did you know …?» vises på engelsk.

   **Finne breddegrad og lengdegrad:** høyreklikk på stedet i Google Maps.
   Det øverste tallet i menyen er breddegrad (`lat`), det andre lengdegrad (`lon`).
   Temaer som ligger tett, slås automatisk sammen til én prikk med et tall.
   `sted` er valgfritt – temaer uten et naturlig sted vises bare i listen.
   Siden **For lærere** sjekker automatisk at alle steder havner på land.

4. Åpne `index.html` og sjekk at temaet vises og fungerer.

### Feltene i en temafil

| Felt | Hva det er |
|---|---|
| `id` | Samme som filnavnet, uten `.js` |
| `fag` | `"samfunnsfag"` eller `"engelsk"` |
| `trinn` | `8`, `9` eller `10` |
| `sprak` | `"nb"` (norsk) eller `"en"` (engelsk). Styrer knappetekster og opplesing |
| `tittel` | Overskriften |
| `ingress` | 2–4 setninger øverst på siden |
| `maal` | Liste med 2–3 læringsmål |
| `startsporsmal` | Spørsmål eleven tenker på før lesingen |
| `avsnitt` | Fagteksten: liste med `{ tittel, tekst: [avsnitt, …], stoppOgTenk }` |
| `ord` | Ordforklaringer: `{ "ord": "forklaring" }` |
| `sammendrag` | 5–6 enkle setninger |
| `oppgaver` | Nivå `1`, `2` og `3`, hver med `finn`, `forsta` og `diskuter` |
| `kobletTil` | Liste med `id` til temaer i det andre faget |
| `kilder` | Lenker: `{ tittel, url }` |
| `kontroller` | Opplysninger læreren bør sjekke. Vises bare med `&laerer=1` i adressen |

### Lange temaer: deler, tidslinje og begrepsliste

Noen temaer trenger mer plass (se `sf10-andre-verdenskrig.js`). Da kan du bruke tre valgfrie felt:

- `del: "Veien til krig"` på hvert avsnitt deler teksten i nummererte deler. Siden får da en
  innholdsliste øverst. (Innholdslisten kommer også automatisk når et tema har 10 avsnitt eller flere.)
- `tidslinje: [{ dato: "1.9.1939", tekst: "Tyskland angriper Polen." }, …]` viser en tidslinje etter teksten.
- `begrepsliste: true` viser alle ordene fra `ord` som en begrepsliste etter teksten.

### Dikt i teksten

Et avsnitt kan inneholde et dikt i stedet for en vanlig tekstbit. Skriv det som et objekt i `tekst`-lista. `\n` gir linjeskift, og en tom linje (`\n\n`) gir ny strofe:

```js
tekst: [
  "Vanlig tekst før diktet.",
  { dikt: "Tyger Tyger, burning bright,\nIn the forests of the night;", kilde: "William Blake, «The Tyger»" },
  "Vanlig tekst etter diktet."
]
```

Bruk bare dikt som er falt i det fri: Forfatteren må ha vært død i over 70 år (i Norge og EU). Nyere dikt kan gjenfortelles med egne ord, men ikke siteres.

### Felles tidslinje og begrepsbank

`tidslinje.html` og `begreper.html` henter innhold fra **alle** temafilene som står i
`oversikt.js`:

- Tidslinjen bruker feltet `tidslinje` i hvert tema. Skriv datoen slik den skal vises,
  for eksempel `"1.9.1939"`, `"Mars 1938"`, `"1760-tallet"`, `"ca. 500 f.Kr."` eller
  `"11 September 2001"`. Siden sorterer datoene selv. Like hendelser fra flere temaer
  (samme dato og nesten samme tekst) slås sammen til én, med lenke til begge temaene.
- Begrepsbanken bruker feltet `ord`. Samme ord fra flere temaer vises én gang. Har
  temaene ulike forklaringer, vises alle.

- Personsiden bruker feltet `personer`:
  `{ navn: "Winston Churchill", levde: "1874–1965", rolle: "Britisk statsminister", tekst: "…" }`.
  Skriv teksten uten personens navn (bruk «han/hun»), for teksten brukes også som
  ledetråd i quizen «Hvem er jeg?». Samme person i flere temaer vises én gang.
  Personene vises også nederst på temasiden.

Du trenger altså ikke gjøre noe ekstra: Når et nytt tema legges inn i `oversikt.js`,
dukker datoene og ordene opp automatisk.

### Eksamenssonen

Tekstene i eksamenssonen ligger i `data/eksamen.js`: hvordan eksamen foregår,
forberedelsesplanen, eksempler på problemstillinger, struktur, fraser, sjekkliste og
vanlige feil. **Tilpass gjerne «slikForegar» og «plan» til hvordan muntlig eksamen
gjøres på deres skole.** Øvingsspørsmålene i «Øv på samtalen» hentes automatisk fra
oppgavene på nivå 2 og 3 i temaene.

### Kalde spor i historien og Cold Case Mysteries (logikkgåter)

`mysterium.html` + `assets/mysterium.js`. Eleven løser en logikkgåte med ledetråder og et avkrysningsrutenett (hvem – med hva – hvor – og på vanskelig nivå: hvorfor).

- **Kalde spor i historien** (historiske gåter) ligger i `data/mysterium/saker.js`. Personene er ekte, gåtene oppdiktet. Hver ledetråd har en `tekst` og en `regel` som maskinen kan sjekke: `["med", ["p:falsen"], ["t:penn"]]` (hører sammen) eller `["ikke", ["p:cf"], ["s:hagen"]]` (hører ikke sammen). Flere id-er i en liste betyr «en av disse». `losning` er fasiten, og `svar.element` er opplysningen som avslører hvem det var. Med `utsagn: [{person, tekst, regel}]` blir det en løgnergåte: den skyldige sitt utsagn er falskt, alle andres er sanne. Lager du en ny sak, sjekk at den har nøyaktig én løsning (løseren `LV.mysterium.alleLosninger` + `oppfyller` kan brukes i konsollen).
- **Cold Case Mysteries** (generatoren, engelsk) bruker `data/mysterium/database.js`: fire «verdener» med personer (høyde, øyne, hår, venstre-/høyrehendt), gjenstander (vekt, materiale) og steder (inne/ute), og en liste med motiver. Nivåene: Easy 3×3×3, Medium 4×4×4, Hard 4×4×4 + motiv, Expert 5×5×5, Master 4×4×4 med utsagn der den skyldige lyver. Generatoren legger til ledetråder til det bare finnes én løsning, og fjerner så overflødige. Samme `seed` i adressen gir samme gåte, så en lenke kan deles med hele klassen.
- Nye personer, gjenstander og steder kan legges rett inn i databasen.

### Skriveverksted

`skriving.html` + `assets/skriving.js`. Oversikten ligger i `data/skriving/oversikt.js` (`LV.skriveguider`: `id`, `sprak` «en»/«nb», `ikon`, `farge`, `tittel`, `kort`, `fag`, ev. `par` (samme guide på det andre språket) og `lenke` (guiden ligger et annet sted, f.eks. filmsiden)). Hver guide er en fil `data/skriving/<id>.js` som setter `LV.skriveguide`:

- `ingress`, `hva` (avsnitt), `fakta` (`[[nøkkel, verdi]]`), `forarbeid` (liste), `oppbyggingTekst`
- `deler`: `{navn, kort, storrelse (høyde i figuren, 1–3), hva, tips, startere, eksempel, ramme, utenRamme}` – hver del blir et kort, en blokk i figuren og et felt i skriverammen (unntatt `utenRamme: true`). Setningsstarterne blir knapper som setter teksten inn i feltet.
- `sprak` (språktips), `bindeord` (`[{tittel, liste}]`), ev. `ordliste` (`[[engelsk, norsk]]`)
- `eksempel`: `{tittel, tekst: [{del, t}], kommentar}` – `del` er indeksen i `deler`, slik at eleven kan slå på merking av delene.
- `sjekkliste` og `vurdering` (`[kriterium, lav, middels, høy]`).

### Sports in the English-speaking world

`sport.html` + `assets/sport.js`, data i `data/sport.js` (`LV.sport`): `innledning`, `idretter` (hver med `land: {landId: 2|1}` – 2 = en av de største, 1 = populær – samt `spilles`, `ord`, `store`, `visste`), `land` (én del per land-id med `tekst`, `store`, `visste`, `idretter`), `ordpar` (britisk/amerikansk), `idiomer`, `quiz`, `oppgaver`, `kilder` og `kontroller` (vises med `?laerer=1`). `land.html` laster også `data/sport.js` og viser `LV.sport.land[id]` som en egen «Sport»-del på landsiden. Legger du til et nytt land, gi det en del i `LV.sport.land` og fyll inn landet i `land` på idrettene.

### Reading Room

`lesing.html` + `assets/lesing.js`. Oversikten ligger i `data/lesing/oversikt.js` (`LV.lesetekster`: tittel, forfatter, år, sjanger, `nivaa` 1–3, trinn, antall ord, `ikon` og `farger` til det tegnede bokomslaget, `tags` og `temaer`). Hver tekst har en egen fil `data/lesing/<id>.js` som setter `LV.lesetekst` med `forfatter.om`, `bakgrunn`, `forLesing`, `ord` (`["ord slik det står i teksten", "forklaring på engelsk", "norsk"]`), `stopp` (`{avsnittsindeks: "spørsmål"}`), `lett` (den lettere versjonen, `{h: "..."}` er en mellomtittel), `sporsmal[{s, svar}]`, `analyse`, `diskusjon`, `skriv` og `laerer`. Valgfritt: `historisk` (`{tittel, tekst}`) – en boks om historisk kontekst under «Before you read»; sett da `kontekst: true` i oversikten, så vises merket «Context». Dikt og sanger i teksten lagres som `{vers: "linje\nlinje\n\nny strofe"}`.

- **Rettigheter:** Bruk bare tekster der forfatteren døde for mer enn 70 år siden (i Norge gjelder vernet til og med 70 år etter dødsåret). Oversettelser har egen opphavsrett. Den lette versjonen og oppgavene skriver vi selv.
- **Originalteksten** ligger nederst i hver fil, etter et merke, og lages med `verktoy/lag-lesing.py` fra Standard Ebooks (korrekturleste utgaver, CC0). Klon repoet fra `github.com/standardebooks/…` til `verktoy/kilder/` og kjør skriptet. Det sjekker også at hvert ord i ordlista finnes i teksten og at «stopp»-indeksene finnes. Alt over merket er skrevet for hånd og blir ikke endret. Redaksjonelle endringer i originalteksten (f.eks. et rasistisk ord byttet med [klammer]) legges i `ERSTATT` i skriptet og forklares i lærerdelen.
- Første forekomst av hvert ord i ordlista blir en knapp med forklaring i originalteksten.
- `temaer` gir en «Read a story»-boks på temasidene.
- **Tekster fra Project Gutenberg:** `("txt", [(fil, fra-linje, til-linje), …])` i `KILDER` henter avsnitt fra ren tekst (klonet fra github.com/GITenberg). Flere utdrag skilles med «[…]». Sett `kilde: "gutenberg"` i oversikten.
- **Vernede tekster (f.eks. Carver):** Sett `utenTekst: true` i oversikten og `utenTekst: {tittel, tekst}` + `deler: [{tittel, sted, sammendrag, stopp}]` i datafilen, og `tekst: []`. Da vises ingen originaltekst – bare gjenfortelling med egne ord, «Stop and think» per del og oppgavene. Ikke legg inn sitater eller PDF-er av vernede tekster i repoet.
- `sjanger` styrer filteret i oversikten: «Short story», «Speech», ellers sakprosa.
- **Quiz:** `data/lesing/quiz.js` (`LV.lesequiz[id]`) har flervalgsspørsmål til hver tekst: `{s, valg: [...], riktig: indeks i valg, forklaring, strategi}`. `strategi` er id-en til en lesestrategi (se under). Alternativene stokkes når siden lastes, så skriv gjerne det riktige svaret hvor som helst i lista. Teksten får quiz automatisk når den har en oppføring her.

### Lesestrategier

`lesestrategier.html` + `assets/lesestrategier.js`, data i `data/lesestrategier.js` (`LV.lesestrategier`): `faser` (for/under/etter), `strategier` (`id`, `fase`, `ikon`, `navn`, `en`, `kort`, `hva`, `hvorfor`, `steg`, `eksempel`, `startere`, `prov` – lenker – og `skjema: true` for VØL-skjemaet) og `teksttyper` til «Hvilken strategi passer?». `id` blir ankeret (`lesestrategier.html#forutsi`). Merkelappen på «Stopp og tenk»-boksene lages av `LV.stoppMerke()` i `assets/felles.js`, som ser etter nøkkelord i spørsmålet (f.eks. «why/hvorfor» → lese mellom linjene, «have you ever/i Norge» → koble). Endre lista `STOPP_MERKER` der hvis en merkelapp bommer.

### Søk

`sok.html` + `assets/sok.js` søker i `data/sok.js`, som lages av `node verktoy/lag-sok.mjs`. Skriptet leser temaer, begreper, personer, Reading Room, filmer, skriveguider, lesestrategier, grammatikk, landsider, sport og kartsett. **Kjør det på nytt etter hver endring i innholdet**, ellers finner ikke søket det nye.

### Film i undervisningen

`film.html` + `assets/film.js`. Oversikten ligger i `data/film/oversikt.js` (`LV.filmer` og `LV.filmGuider`), og hver film har en egen fil `data/film/<id>.js` (`LV.film`) med `fakta`, `sammendrag`, `handling` (spoilere), `bakgrunn`, `sporsmal[{s, svar}]`, `diskusjon`, `refleksjon`, `fordypning`, `advarsel` og `kontroller`.

- **Trailer:** Legg YouTube-ID-en inn som `youtube: "…"` i `oversikt.js` (det som står etter `v=` i lenken, f.eks. `https://www.youtube.com/watch?v=mfmrPu43DF8` → `mfmrPu43DF8`). Traileren lastes fra youtube-nocookie.com først når eleven trykker «Spill av». Uten ID vises en lenke til søk på YouTube.
- **Omslag:** Filmene har tegnede «omslag» laget med farger og emoji (`farger`, `ikon`, `stil`), fordi ekte DVD-omslag og plakater er beskyttet av opphavsrett. Vil du likevel bruke et bilde, kan du legge inn `omslag: "lenke"` – men sjekk at du har lov.
- **Koblinger:** `temaer` (tema-id-er) gir lenker fra filmen til temaene og en «Film om temaet»-boks på temasidene. `landsider` gir lenker til landsidene.
- `serie: true` i oversikten gir overskrifter for TV-serie («Facts about the series»).
- `&laerer=1` viser fasit til faktaspørsmålene og lærerkontrollen.
- Skriveguidene ligger i `data/film/guide-review.js` og `data/film/guide-anmeldelse.js`.

### Grammar and vocabulary

`grammatikk.html` + `assets/grammatikk.js`. Oversikten og emnegruppene ligger i `data/grammatikk/oversikt.js` (`LV.grammatikkGrupper` og `LV.grammatikkListe`). Hvert emne har en egen fil `data/grammatikk/<id>.js` som setter `LV.grammatikk`:

- `id, tittel, ikon, ingress, opphav, forklaring[], norsk, husk[]`
- `grupper[{tittel, tekst?, ord: [[{ord, uttale?, betyr, norsk, eks}, …], …]}]` – hvert indre array er et sett ord som hører sammen (f.eks. their/there/they're)
- `tabeller[{tittel, tekst?, kolonner[], rader[[]], note?}]` (valgfri), `sammenlign[{tittel, tekst, eks?: [[norsk, engelsk]]}]` (valgfri, «Sammenlignet med norsk»)
- `obs{tittel, tekst[]}` (valgfri boks), `oppgaver[]`, `se[]` (id-er til beslektede emner)
- `ovelser`: enten en liste med flervalg `{s, valg[], forklaring}` (rett svar står først – rekkefølgen blandes), eller en liste med øvelsessett `{type, tittel, instruks, oppgaver}`:
  - `type: "mc"` – flervalg som over
  - `type: "finn"` – `{s: "The [boy] kicked the [ball]."}`: eleven trykker på ordene i [hakeparenteser]
  - `type: "fyll"` – `{s: "Two ___ (child).", hint: "child", svar: ["children"]}`: alle svar i `svar` godtas
  - `type: "sorter"` – `{kategorier: ["Countable", "Uncountable"], ord: [["chair", 0], ["water", 1]]}`
- Ordklassene har farge i `LV.grammatikkListe` (`farge`, `morkTekst` for lys bakgrunn, `entall`, `eks`). En gruppe med `plakat: true` vises som plakat, med valgfri fargelagt `setning` og `quiz`.

Nytt emne: lag fila, og legg emnet inn i `LV.grammatikkListe` og i `emner` i riktig gruppe. Formatering: `**fet**`, `*kursiv*` og `~~gjennomstreket~~` (feil form).

### Ordboka

`ordbok.html` + `assets/ordbok.js`. På temasidene, landsidene, tidslinjen, begrepsbanken, personsiden og eksamenssonen kan elevene dobbeltklikke på et ord (eller merke det på mobil og trykke «Slå opp») for å få det forklart i en boble.

- Norske ord: forklaring fra **Bokmålsordboka** (UiB og Språkrådet, CC BY 4.0) og engelsk oversettelse fra **Wiktionary**. Bøyningsformer finnes også («gikk» → «gå»).
- Engelske ord: norsk oversettelse fra **Wiktionary** og **FreeDict/WikDict** (CC BY-SA 3.0), og engelsk forklaring, eksempel, synonymer og motsatte ord fra **Open English WordNet** (CC BY 4.0, ca. 110 000 oppslagsord). Bøyningsformer gjenkjennes («went» → «go», «mice» → «mouse», «settlers» → «settler»). Alle synonymer og oversettelser er lenker, så eleven kan slå videre opp.
- Alt ligger i `data/ordbok/` (ca. 43 MB fordelt på ca. 420 filer). Bare filen som trengs lastes ned (ca. 100 kB). Ingenting sendes til andre nettsteder.
- Kildehenvisning står i ordboka og i `data/ordbok/LISENS.md`. Ikke fjern den.

Lage ordboka på nytt (f.eks. når Bokmålsordboka er oppdatert): Legg kildefilene i `verktoy/kilder/` (se toppen av `verktoy/lag-ordbok.py` for hvor de hentes) og kjør `python3 verktoy/lag-ordbok.py`.

### Læringsspillene

`spill.html` + `assets/spill.js` lager spill automatisk fra temafilene – det trengs ingen egne spilldata:

- **Memory / Koble sammen:** par fra `ord` (begrep ↔ forklaring), `personer` (navn ↔ rolle + levetid) og `tidslinje` (dato ↔ hendelse). I engelske temaer deles `ord`-verdien ved « – », så «norsk – English explanation» blir kortet «term (norsk)» ↔ «English explanation». Skriv derfor alltid engelske begreper på formen `"norsk – forklaring"`.
- **Gjett ordet** og **Ordsøk:** bruker begrepene og personnavnene (i ordsøk bare etternavnet). Ord over 12 bokstaver kommer ikke med i ordsøket.
- **Ordle** (som Wordle) og **Ordmiks** (som Smartle): bruker begreper som er ett ord (3–10 bokstaver, ingen mellomrom eller bindestrek), og etternavn hvis det er for få begreper. Ordle sjekker gjettene mot ordboka (`LV.ordbok.erOrd`), så `assets/ordbok.js` må lastes i `spill.html`.
- **Kryssord:** lages på nytt hver gang av begrepene og etternavnene (3–13 bokstaver, inntil 12 ord). Ord som ikke krysser andre, blir utelatt.
- **Worldle:** hører ikke til et tema (`spill.html?spill=worldle`, valgfritt `&fag=engelsk` eller `&utvalg=europa|afrika|asia|amerika|oseania|engelsk|alle`). Dataene ligger i `data/worldle.js` (ca. 300 kB) og lages av `cd verktoy && node lag-worldle.mjs` fra Natural Earth og pakken `i18n-iso-countries` (landnavn på bokmål og engelsk). Krim regnes med til Ukraina, Nord-Kypros til Kypros og Somaliland til Somalia.
- **Tidslinje:** seks hendelser fra `tidslinje`, sortert med `LV.tidsnokkel`. Krever minst fire datoer i temaet.

Adresser: `spill.html?spill=memory|koble|hangman|ordsok|ordle|ordmiks|kryssord|rekkefolge&tema=<id>`, eller `&fag=<fag>&trinn=<n>` for å blande alle temaene på et trinn. Spill som et tema har for lite innhold til, vises ikke i «Spill og øv»-boksen. Jo flere begreper (`[[ord]]`) et tema har, jo bedre blir spillene – sikt på minst 6–8.

### Kartspillet

Kartspillet har tre spillmåter: **Finn på kartet**, **Hva heter det?** og **Øv og utforsk**.
Lenk direkte til et spill med `kartspill.html?sett=europa-land` (og eventuelt `&modus=hva`).

Kartene i `data/kart/` og spillsettene i `data/kartspill.js` er **generert** – ikke rediger dem
for hånd. Innholdet (hvilke land, elver, landemerker, hendelser, byer og dialekter som er med,
med navn og infotekst) står i `verktoy/kartsett.mjs`. Slik lager du kartene på nytt etter en endring
(krever at Node.js er installert):

```
cd verktoy
npm install
node lag-kart.mjs
```

Skriptet laster ned kartdata fra Natural Earth første gang (til `verktoy/kilder/`, som ikke
lastes opp til GitHub). Kartdata: [Natural Earth](https://www.naturalearthdata.com/)
(offentlig eiendom) og US Census Bureau via us-atlas.

**Legge til en ny verdensdel eller et nytt land:** For et enkelt land (som Irland, Australia
eller India) kan du bruke funksjonen `lagLand({...})` nederst i `lag-kart.mjs`: Den lager kart med
delstater/fylker fra Natural Earth, byer og landemerker. For en hel verdensdel lager du en blokk etter
mønster av «EUROPA» (projeksjon og utsnitt). Legg innholdet i `kartsett.mjs`. USAs regioner og divisjoner (`USA_REGIONER`) lages ved å slå sammen delstatene; `indreGrenser: "stat:"` på et sett tegner delstatsgrensene som tynne stiplede linjer oppå. Spør gjerne
Claude om hjelp – det er dette verktøyet er laget for.

### Landsidene (engelsk)

`land.html` viser alle landsidene, og `land.html?id=uk` viser én side. Hvert land har:
fact file, fagtekster (geografi, historie, politikk, språk, urfolk der det er relevant, kultur),
severdigheter, tidslinje, **kartquiz** (kartspillet bygd inn på siden), flervalgsquiz og oppgaver
(«Find facts» og «Explore more») med «Copy my answers». Ingenting lagres.

- Listen over land, bilder og hvilke kartspill og temaer som hører til, står i `data/land/oversikt.js`.
- Innholdet for hvert land står i `data/land/<id>.js` (`uk`, `ireland`, `usa`, `australia`,
  `newzealand`, `southafrica`, `india`, `singapore`).
- Quizspørsmål skrives slik: `{ s: "Spørsmål?", valg: ["Riktig", "Feil", "Feil", "Feil"], riktig: 0, forklaring: "…" }`.
  Svaralternativene stokkes automatisk, så det riktige kan gjerne stå først.
- Legg til `&laerer=1` i adressen for å se opplysninger som bør kontrolleres.
- Tekstene nevner med vilje ikke hvem som er statsminister eller president akkurat nå –
  det er en «Explore more»-oppgave, slik at sidene ikke blir utdaterte.

Et nytt land: Lag `data/land/<id>.js` etter mønster av de andre, legg landet inn i
`data/land/oversikt.js` og lag eventuelt kartspill for landet (se over).

### Versjonsnummer (når endringer ikke vises)

Alle `.html`-filene henter CSS og JavaScript med et versjonsnummer, for eksempel
`assets/stil.css?v=20261105b`. Det samme nummeret står i `LV.versjon` øverst i
`assets/felles.js`. Når nummeret endres, henter nettleseren nye filer i stedet for gamle
kopier. Hvis du selv endrer CSS eller JavaScript og ikke ser endringen, kan du trykke
**Ctrl + F5** (Windows) eller **Cmd + Shift + R** (Mac), eller endre versjonsnummeret.
GitHub Pages kan dessuten bruke et par minutter på å publisere en ny versjon.

### Formatering i tekstene

| Skriv | Resultat |
|---|---|
| `[[fabrikk]]` | Ordet blir klikkbart og viser forklaringen fra `ord` |
| `[[fabrikker\|fabrikk]]` | Viser «fabrikker», men bruker forklaringen til «fabrikk» |
| `**James Watt**` | **Fet skrift** |

En oppgave kan merkes som samtaleoppgave:

```js
{ tekst: "Ville du heller levd før eller etter industrialiseringen?", partner: true }
```

### Tips for fagtekstene

- 8. trinn: ca. 600–800 ord. 9. trinn: 800–1000 ord. 10. trinn: 900–1200 ord.
- Korte avsnitt med mellomtitler. Én hovedidé per avsnitt.
- 2–3 «Stopp og tenk» fordelt i teksten.
- Les alltid gjennom faktaopplysningene før elevene får teksten.

---

## Bilder på temakortene

Bilder fra Unsplash lenkes direkte fra Unsplash, med fotografens navn som kreditering
både på kortet og øverst på temasiden. Unsplash-lisensen tillater dette uten kostnad.

Temakortene har tegnede illustrasjoner (SVG) som er laget for nettstedet.
Du kan bytte dem ut med ekte bilder:

1. Finn et bilde som er fritt å bruke, for eksempel på
   [Wikimedia Commons](https://commons.wikimedia.org) (se etter «Public domain»
   eller «CC BY») eller hos [Nasjonalbiblioteket](https://www.nb.no).
2. Last ned bildet, gi det et enkelt navn (for eksempel `sf9-industrialiseringen.jpg`)
   og legg det i `assets/bilder/`. Bredde rundt 800 piksler holder, og det gjør siden rask.
3. Endre `bilde`, `bildeAlt` og `kreditt` for temaet i `data/temaer/oversikt.js`.

Forslag til ekte bilder for de to første temaene:
- **Industrialiseringen:** maleriet *Coalbrookdale by Night* av Philip James de Loutherbourg (1801)
- **The Victorian Era:** et fotografi av Charles Dickens fra 1860-tallet

---

## Publisere på GitHub Pages

1. Gå til [github.com](https://github.com) og logg inn.
2. Trykk **+** øverst til høyre → **New repository**.
3. Skriv navnet `les-verden`, velg **Public** og trykk **Create repository**.
4. Trykk lenken **uploading an existing file**.
5. Pakk ut zip-fila på maskinen din. Åpne mappen `les-verden`, marker **alt innholdet**
   (ikke selve mappen) og dra det inn i nettleservinduet. Trykk **Commit changes**.
6. Gå til **Settings** → **Pages**. Under **Branch** velger du `main` og `/ (root)`,
   og trykker **Save**.
7. Etter et par minutter er siden ute på
   `https://<brukernavnet-ditt>.github.io/les-verden/`.

### Oppdatere siden senere

Åpne fila på github.com, trykk blyanten (**Edit**), gjør endringen og trykk
**Commit changes**. Nye filer legges til med **Add file** → **Upload files**.
Endringene vises på nettsiden etter et par minutter.

---

## Personvern og opphavsrett

- Siden har ingen innlogging, ingen sporing, ingen cookies og ingen lagring.
  Svarene finnes bare i den åpne fanen.
- Repoet er offentlig. Ikke legg ut elevnavn, elevtekster eller vurderinger.
- Ikke last opp tekster, bilder eller skannede sider som er beskyttet av opphavsrett.
  Lenk heller til dem.

---

## Senere faser

- **Fase 2:** flere temaer for alle trinn.
- **Fase 3:** felles tidslinje, begrepsbank, personer og eksamenssone.
- **Fase 4:** spill som bruker de samme datafilene (begrepsmemory,
  tidslinjesortering, «Hvem er jeg?», sant eller usant).
