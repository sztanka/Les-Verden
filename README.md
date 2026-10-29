# Les verden

En lese- og læringsressurs i **samfunnsfag** og **engelsk** for 8.–10. trinn (LK20).
Hver temaside er bygd rundt en fagtekst med ordforklaringer, «Stopp og tenk»-spørsmål,
lettlest sammendrag og oppgaver på tre nivåer.

Nettstedet er helt statisk: ren HTML, CSS og JavaScript. Det trenger ingen server,
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
├── assets/
│   ├── stil.css            All styling (farger øverst i fila)
│   ├── felles.js           Toppmeny, lesestøtte, bunntekst
│   ├── forside.js          Verdenskart, «Visste du at …?» og temakort
│   ├── tema.js             Bygger temasiden fra datafila
│   ├── samle.js            Henter innhold fra alle temaene
│   ├── tidslinje.js        Felles tidslinje
│   ├── begreper.js         Begrepsbank
│   └── bilder/             Bilder til temakortene
└── data/
    ├── innstillinger.js    Navnet på nettstedet m.m.
    ├── kart.js             Verdenskartet (generert – ikke rediger)
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

### Felles tidslinje og begrepsbank

`tidslinje.html` og `begreper.html` henter innhold fra **alle** temafilene som står i
`oversikt.js`:

- Tidslinjen bruker feltet `tidslinje` i hvert tema. Skriv datoen slik den skal vises,
  for eksempel `"1.9.1939"`, `"Mars 1938"`, `"1760-tallet"`, `"ca. 500 f.Kr."` eller
  `"11 September 2001"`. Siden sorterer datoene selv. Like hendelser fra flere temaer
  (samme dato og nesten samme tekst) slås sammen til én, med lenke til begge temaene.
- Begrepsbanken bruker feltet `ord`. Samme ord fra flere temaer vises én gang. Har
  temaene ulike forklaringer, vises alle.

Du trenger altså ikke gjøre noe ekstra: Når et nytt tema legges inn i `oversikt.js`,
dukker datoene og ordene opp automatisk.

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
