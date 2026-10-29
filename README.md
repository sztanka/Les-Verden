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
├── assets/
│   ├── stil.css            All styling (farger øverst i fila)
│   ├── felles.js           Toppmeny, lesestøtte, bunntekst
│   └── tema.js             Bygger temasiden fra datafila
└── data/
    ├── innstillinger.js    Navnet på nettstedet m.m.
    └── temaer/
        ├── oversikt.js     Liste over alle temaer
        ├── sf9-industrialiseringen.js
        └── en9-victorian-era.js
```

Datafilene er `.js` og ikke `.json`. Da virker siden også når du åpner
`index.html` direkte fra disken, ikke bare på GitHub Pages.

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
     trinn: 10,
     tittel: "Andre verdenskrig",
     kort: "Én setning som vises på temakortet."
   },
   ```

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
