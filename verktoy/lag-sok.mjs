// Les verden – lager søkeindeksen data/sok.js fra alt innholdet på siden.
// Kjør: node verktoy/lag-sok.mjs  (etter at temaer, tekster, filmer osv. er endret)
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const ROT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ctx = { console };
ctx.window = ctx; ctx.LV = {};
vm.createContext(ctx);
const last = f => vm.runInContext(fs.readFileSync(path.join(ROT, f), "utf8"), ctx, { filename: f });
const ren = s => String(s || "").replace(/\*\*|\*|\[\[|\]\]/g, "").replace(/\[\[([^\]|]+)\|[^\]]+\]\]/g, "$1").replace(/\s+/g, " ").trim();
const kort = (s, n = 140) => { s = ren(s); return s.length > n ? s.slice(0, n - 1).replace(/\s\S*$/, "") + " …" : s; };

const I = [];
const legg = (k, t, u, s, x, f) => I.push({ k, t: ren(t), u, s: kort(s), x: ren(x || "").toLowerCase().slice(0, 600), f: f || "" });

// Sider
[
  ["Forside", "index.html", "Alle temaer i samfunnsfag og engelsk, kart og verktøy.", "hjem start"],
  ["Samfunnsfag – alle temaer", "index.html?fag=samfunnsfag", "Temaer i samfunnsfag for 8.–10. trinn.", "samfunnsfag historie geografi samfunnskunnskap"],
  ["Engelsk – alle temaer", "index.html?fag=engelsk", "Temaer i engelsk for 8.–10. trinn.", "engelsk english"],
  ["Reading Room", "lesing.html", "Noveller, taler og sakprosa på engelsk med lett versjon og oppgaver.", "lesing lesetekster stories short stories noveller taler speeches"],
  ["Hva om …?", "hvaom.html", "Kontrafaktisk historie: endre én årsak og tenk gjennom følgene.", "hva om kontrafaktisk historie årsaker følger what if"],
  ["Museet vårt", "museum.html", "Gjenstander fra historien – skriv museumsskilt og lag en utstilling.", "museum gjenstander museumsskilt utstilling"],
  ["Historien der du bor", "lokalhistorie.html", "Lokalhistorie: stedsnavn, gamle bilder, minnesmerker, intervju og blått skilt.", "lokalhistorie nærmiljø stedsnavn intervju besteforeldre minnesmerker snublesteiner"],
  ["Tidslinjeduellen", "tidslinjeduell.html", "Legg hendelser på riktig plass på tidslinja – alene eller to lag.", "tidslinje duell spill årstall rekkefølge"],
  ["Historiske kort", "historiske-kort.html", "Kortspill i Top Trumps-stil med personene fra temaene.", "kortspill top trumps personer utskrift"],
  ["Feeden fra fortiden", "feed.html", "Sosiale medier fra historien: fakta, mening, rykte eller propaganda?", "sosiale medier propaganda rykte kildekritikk bastillen eidsvoll saltmarsjen 9. april feed pip"],
  ["Ord som har reist", "ordreise.html", "Lånord i norsk og engelsk og historien bak dem.", "lånord etymologi ordhistorie språk vikinger arabisk persisk hindi words loanwords"],
  ["Idiomdetektiven", "idiomer.html", "Engelske idiomer og historien bak dem – utforsk, quiz og finn idiomene i teksten.", "idiomer idioms uttrykk expressions phrases origin opphav break a leg red herring"],
  ["Spørsmålsstudioet", "sporsmal.html", "Elevene lager, sorterer og prioriterer sine egne spørsmål til et tema.", "spørsmål question formulation technique qft åpne lukkede spørsmål undring"],
  ["Ekspertgrupper", "ekspertgrupper.html", "Jigsaw: del et tema i 3–5 deler – hver elev blir ekspert og lærer bort.", "ekspertgrupper jigsaw puslespill hjemmegruppe lær bort samarbeid"],
  ["Tenkerutiner", "tenkerutiner.html", "Se – tenk – undre, Zoom inn, Påstand – støtte – spørsmål og flere tenkerutiner.", "tenkerutiner visible thinking se tenk undre bilde storskjerm"],
  ["Klimatoppmøtet", "klima.html", "Forhandlingsrollespill om klima med en forenklet klimamodell.", "klima klimatoppmøte cop parisavtalen utslipp co2 rollespill forhandling temperatur"],
  ["Menneskerettighetsdomstolen", "domstol.html", "Rollespill med oppdiktede saker om menneskerettighetene.", "menneskerettigheter emd emk strasbourg domstol ytringsfrihet privatliv diskriminering rollespill"],
  ["Byen vokser", "byen.html", "Simulering av industrialiseringen i en norsk by 1840–1910.", "industrialisering by urbanisering simulering kolera jernbane barnearbeid streik akerselva"],
  ["Fredskonferansen", "fred.html", "Rollespill om Wienerkongressen 1815 og fredskonferansen i Paris 1919.", "rollespill fred versailles wien wienerkongressen forhandling diplomati"],
  ["Hverdagsbilder", "tidsreise.html?modus=hverdag", "Gjett året ut fra en tekst om en helt vanlig dag.", "tidsreise gjett året hverdag hverdagsbilder nærlesing"],
  ["Lesestrategier", "lesestrategier.html", "Slik leser du smartere: før, under og etter lesing.", "lesing strategier reading strategies skumlese oppsummere tankekart vøl kwl"],
  ["Skriveverksted", "skriving.html", "Skriveguider med setningsstartere og skriverammer.", "skriving how to write essay fagtekst presentasjon"],
  ["Film i undervisningen", "film.html", "Filmer til temaene med oppgaver.", "film filmer movies"],
  ["Grammar and vocabulary", "grammatikk.html", "Parts of speech, homophones og øvelser.", "grammatikk grammar ordklasser"],
  ["Landsider", "land.html", "Engelskspråklige land med fakta, kartquiz og quiz.", "land countries"],
  ["Sports in the English-speaking world", "sport.html", "Idretter og sportsspråk i den engelskspråklige verden.", "sport idrett"],
  ["Samtidig i verden", "samtidig.html", "Hva skjedde samme år i Norge og i verden?", "samtidig samme år årstall tidslinje verden norge parallell same year timeline"],
  ["Tekstpar", "tekstpar.html", "To tekster om samme tema side om side.", "tekstpar sammenligne tekster sammenlignende lesing venn diagram paired texts compare douglass zitkala-sa wollstonecraft pankhurst riis owen fornorsking"],
  ["Tidslinje", "tidslinje.html", "Alle hendelsene fra temaene på én tidslinje.", "tidslinje timeline historie"],
  ["Begrepsbank", "begreper.html", "Alle begrepene fra temaene.", "begreper ord ordforklaringer"],
  ["Personer", "personer.html", "Personer fra temaene – og quizen Hvem er jeg?", "personer hvem er jeg"],
  ["Ordbok", "ordbok.html", "Bokmålsordboka, norsk–engelsk og engelske synonymer.", "ordbok dictionary oversette"],
  ["Spill", "spill.html", "Memory, ordsøk, Ordle, kryssord og flere spill.", "spill games memory hangman ordle kryssord worldle"],
  ["Kartspill", "kartspill.html", "Finn land, byer og steder på kartet.", "kart kartspill map quiz"],
  ["Kalde spor i historien", "mysterium.html", "Logikkgåter med ekte personer fra historien.", "mysterium murdle cold case mysteries detektiv gåter"],
  ["Eksamenssone", "eksamen.html", "Forbered deg til muntlig eksamen.", "eksamen muntlig exam"],
  ["For lærere", "laerer.html", "Veiledning for lærere.", "lærer laerer teacher"],
  ["Muntlig og lytting", "muntlig.html", "Samtalekort, lytteøvelser og den varme stolen til alle temaene.", "muntlig lytting speaking listening samtalekort diskusjon frasebank hot seat varme stolen"],
  ["Kildedetektiven", "kildedetektiv.html", "Spill: er innlegget sant eller falskt? Undersøk avsender, dato og bilde.", "kildekritikk falske nyheter fake news desinformasjon ki-bilder svindel phishing spill kildedetektiv"],
  ["Klassequiz på storskjerm", "klassequiz.html", "For læreren: vis quizspørsmål fra temaer, tekster og land stort på tavla.", "klassequiz quiz storskjerm tavle kahoot lærer spørsmål"],
  ["Skriftlig eksamen i engelsk", "skriftlig.html", "Øv på videreformidling og samhandling til skriftlig eksamen.", "skriftlig eksamen engelsk videreformidling samhandling chattråd chat tråd forum podcast lytte formidle exam written mediation interaction"],
  ["Kildeanalyse", "kilder.html", "Ekte historiske kilder: Magna Carta, Uavhengighetserklæringen, Wollstonecraft, Det kommunistiske manifest og Jacob Riis.", "kildeanalyse kilder kildekritikk primærkilde opphav hensikt perspektiv magna carta declaration of independence wollstonecraft marx manifest riis"],
  ["Leseflyt", "leseflyt.html", "Gjentatt lesing med tidtaking og ord per minutt.", "leseflyt lesehastighet gjentatt lesing høytlesing ord per minutt tidtaking flyt fluency reading speed repeated reading"],
  ["Oppgaveord", "oppgaveord.html", "Hva betyr beskriv, forklar, drøft og vurder?", "oppgaveord oppgavetekst beskriv forklar drøft vurder sammenlign gjør rede for reflekter analyser task words describe explain discuss compare evaluate reflect analyse"],
  ["Lytteøkt med stopp", "lytt.html", "Lytt til en tekst del for del, med oppgaver etter hver del.", "lytting lytteøkt lytte høre opplesing listening stopp stikkord gjenfortelle lyttestrategier"],
  ["Svarte-ut-dikt", "svartut.html", "Blackout poetry: lag et nytt dikt av en side fra en tekst.", "svarte-ut-dikt blackout poetry dikt poesi skapende skriving reading room"],
  ["Skrivemaler", "skrivemal.html", "Postkort fra fortiden, avisforside, Wanted-plakat, bokomslag og booktrailer.", "skrivemal postkort avis avisforside wanted plakat bokomslag booktrailer trailer skapende skriving historisk perspektiv"],
  ["Escape room", "escape.html", "Lås deg ut ved å lese nøye – Bastillen, the Workhouse og the Locked Library.", "escape room rømning lås kode gåte bastillen workhouse library victorian franske revolusjonen lesing"],
  ["Begrepsgåta", "begrepsgata.html", "Gjett dagens fagbegrep ut fra forklaringen.", "begrepsgåta begreper gåte ord dagens begrep wordle fagord vocabulary"],
  ["Ordfører for en dag", "kommune.html", "Fordel budsjettet i en oppdiktet kommune og møt velgerne.", "ordfører kommune budsjett kommunestyre valg demokrati spill simulering prioritering"],
  ["Lag en lov", "lov.html", "Følg et lovforslag fra høring til votering på Stortinget.", "lov lovforslag stortinget høring komité votering flertall kompromiss parti demokrati"],
  ["Fire hjørner", "hjorner.html", "Påstander på storskjerm – elevene velger hjørne og argumenterer.", "fire hjørner påstand diskusjon argumentasjon muntlig storskjerm four corners"],
  ["Velg din vei", "fortelling.html", "Historiske fortellinger med valg: utvandreren, fyrstikkarbeidersken og Eidsvoll 1814.", "velg din vei fortelling rollespill valg utvandrer amerika fyrstikk streik eidsvoll 1814 grunnloven historie"],
  ["Tidsreisen", "tidsreise.html", "Spill: gjett året for historiske hendelser.", "tidsreise gjett året årstall historie spill timeline guess the year"],
  ["Årsak og virkning", "arsak.html", "Spill: sett årsaker og følger i riktig rekkefølge.", "årsak virkning følger konsekvenser cause effect sammenheng rekkefølge spill"],
  ["Exit ticket", "exit.html", "Avslutningslapper for slutten av timen.", "exit ticket avslutningslapp utgangsbillett 3-2-1 oppsummering vurdering for læring slutten av timen"],
  ["Lesehefte og forklar hvorfor", "tema.html?id=sf10-apartheid&hvorfor=1", "Forklar hvorfor-kort i temaene og lesehefte ved utskrift.", "forklar hvorfor elaborering lesehefte utskrift marg notater papir"],
  ["Lateral lesing", "lateral.html", "Sjekk nettsider som en faktasjekker.", "lateral lesing faktasjekk kildekritikk nettside avsender søk hvem står bak lateral reading fact check"],
  ["Rettssaken", "rettssak.html", "Spill en straffesak i tingretten.", "rettssak rollespill domstol tingrett dommer aktor forsvarer tiltalt vitne meddommer straff tyveri heleri trussel rettsstat mock trial"],
  ["Første lønn", "okonomi.html", "Budsjett, uventede utgifter og hva et lån koster.", "første lønn personlig økonomi budsjett lønn skatt netto brutto sparing buffer lån rente forbrukslån kredittkort avbetaling inkasso"],
  ["Kameratvurdering", "kamerat.html", "To stjerner og et ønske – tilbakemelding fra en medelev.", "kameratvurdering hverandrevurdering tilbakemelding to stjerner og et ønske kriterier peer feedback respons"],
  ["Ta opp deg selv", "opptak.html", "Lydopptak av høytlesing, presentasjon og uttale.", "opptak ta opp lydopptak mikrofon høytlesing presentasjon uttale muntlig egenvurdering record yourself"],
  ["Rewrite and improve", "skrivom.html", "Bearbeid teksten din etter tilbakemelding.", "skriv om bearbeide revidere rette tilbakemelding rettekoder koder feedback rewrite revise edit arms cups sjekkliste checklist"],
  ["Grafleseren", "grafleser.html", "Les grafer, avslør villedende grafer og lag ditt eget diagram.", "graf diagram søylediagram linjediagram sektordiagram statistikk tall regning villedende graf akse ssb chart graph data"],
  ["Undersøkelsesverkstedet", "undersokelse.html", "Lag din egen samfunnsfaglige undersøkelse.", "undersøkelse spørreundersøkelse spørreskjema problemstilling hypotese metode utvalg intervju observasjon gyldighet reliabilitet diagram prosjekt survey"],
  ["Valgsimulatoren", "valg.html", "Fra stemmer til mandater – og koalisjoner.", "valg valgsimulator stortingsvalg mandat sainte-laguë d'hondt sperregrense utjevningsmandat koalisjon regjering flertall mindretall parti election"],
  ["Digitale spor", "digitalespor.html", "Hva avslører innleggene dine – og hvem eier det du finner på nettet?", "digitale spor fotavtrykk personvern sletting slettmeg gdpr datatilsynet opphavsrett creative commons cc lisens bilder deling passord digital footprint copyright privacy"],
  ["Les som en historiker", "historiker.html", "Kilder som forteller ulikt om samme hendelse.", "historiker kilder opphav kontekst sammenligning nærlesing fyrstikkstreiken torgslaget peterloo reading like a historian"],
  ["Argumentkart", "argumentkart.html", "Bygg argumentasjonen som et kart.", "argumentkart argumentasjon påstand grunn belegg innvending motargument argument map claim evidence"],
  ["Ordverksted", "ordverksted.html", "Forstavelser, endelser og ordstammer.", "ordverksted morfologi forstavelse endelse ordstamme prefiks suffiks sammensatte ord prefix suffix root word parts vocabulary"],
  ["Diamantrangering", "diamant.html", "Rangér ni kort fra viktigst til minst viktig.", "diamantrangering rangering prioritering viktigst historisk betydning diamond ranking"],
  ["Kontinuitet og endring", "endring.html", "Skole, arbeid og barndom før og nå.", "kontinuitet endring før og nå 1814 1914 i dag skole arbeid barndom stemmerett kommunikasjon historisk tenkning"],
  ["Repetisjonsstart", "repetisjon.html", "Blandede repetisjonsspørsmål fra tidligere temaer.", "repetisjon repetere gjenhenting spredt øving starter oppstart huske quiz retrieval practice"],
  ["Lesegrupper med roller", "lesegruppe.html", "Les sammen med fire roller.", "lesegruppe gruppelesing roller spå oppklare spørre oppsummere reciprocal teaching gjensidig undervisning lesestrategier"],
  ["Løgnfabrikken", "lognfabrikk.html", "Spill om desinformasjon og manipulasjonsteknikker.", "løgnfabrikken desinformasjon falske nyheter fake news manipulasjon prebunking konspirasjon polarisering kildekritikk sosiale medier troll"],
  ["Begreper på morsmål", "morsmal.html", "Fagbegreper på arabisk, ukrainsk, tyrkisk og polsk.", "morsmål flerspråklig arabisk ukrainsk tyrkisk polsk oversettelse begreper minoritetsspråk særskilt språkopplæring arabic ukrainian turkish polish"],
  ["Tegneseriemaker", "tegneserie.html", "Lag din egen tegneserie.", "tegneserie tegneseriemaker comic snakkeboble tegning stripe bilde lag fortelle"],
  ["QR-leseløype", "leseloype.html", "Lag en leseløype med QR-koder fra et tema.", "qr leseløype løype poster postløp orientering kodeord løsningsord skanne"],
  ["Lesepass", "lesepass.html", "Samle stempler for lesing.", "lesepass stempler pass lesing bronse sølv gull diamant reading passport"],
  ["Perspektivbytte", "perspektiv.html", "Én hendelse, fire mennesker – skriv fra ulike perspektiver.", "perspektiv perspektivbytte rollekort historisk empati dagbok brev fabrikk utvandring 1905 internat fornorsking berlinmuren ellis island perspective"],
  ["Historisk intervju", "intervju.html", "Gjenskapte intervjuer med historiske personer.", "intervju historisk person gina krog elsa laula renberg fridtjof nansen frederick douglass emmeline pankhurst nansenpass stemmerett interview"],
  ["FN-rollespill", "fn.html", "Model UN: forhandle og stem over en resolusjon.", "fn rollespill model un generalforsamling resolusjon delegat avstemning klima plast flyktninger forhandling united nations"],
  ["Lag selv", "lag.html", "Lag din egen quiz, tidslinje eller ordkort og del lenken.", "lag selv elevskapt lage quiz tidslinje ordkort flashcards kort dele lenke spørsmål create your own quiz timeline"],
  ["Debattduell", "debatt.html", "Sorter argumenter for og mot, finn argumentasjonsfeil og skriv ditt eget innlegg.", "debatt argumentasjon argumenter for mot hersketeknikk stråmann argumentasjonsfeil fallacy debate opinion drøfting"],
  ["Lesebingo", "bingo.html", "5 × 5 leseoppgaver på norsk eller engelsk.", "lesebingo bingo reading bingo leseoppgaver lesing selvvalgte bøker reading room bingo"],
  ["Lesedagbok", "lesedagbok.html", "Leselogg, lesekort og bokpresentasjon for bøker du velger selv.", "lesedagbok leselogg reading log selvvalgte tekster bok bokpresentasjon book talk lesekort"],
  ["How to learn English", "laere-engelsk.html", "Strategier for å lære ord, skrive tekster og klare seg i samtaler.", "språklæring strategier learning strategies vocabulary false friends falske venner explain the word kommunikasjonsstrategier"],
  ["Pronunciation for Norwegians", "uttale.html", "Vanskelige engelske lyder, ordtrykk, stumme bokstaver og aksenter.", "uttale pronunciation th w v word stress ordtrykk silent letters stumme bokstaver accent aksent british american"],
  ["Planlegger for lærere", "planlegger.html", "Finn innhold etter fag, trinn og kompetansemål, og del en arbeidsplan med elevene.", "planlegger kompetansemål læreplan lk20 saf01-05 eng01-06 arbeidsplan ukeplan økt"]
].forEach(([t, u, s, x]) => legg("side", t, u, s, x));

// Temaer, begreper og personer
last("data/temaer/oversikt.js");
const begreper = new Map(), personer = new Map(), hendelser = [];
for (const kat of ctx.LV.temaer) {
  ctx.LV.tema = null;
  last("data/temaer/" + kat.id + ".js");
  const t = ctx.LV.tema;
  if (!t) continue;
  const fagnavn = kat.fag === "engelsk" ? "Engelsk" : "Samfunnsfag";
  legg("tema", kat.tittel, "tema.html?id=" + kat.id, kat.kort, [kat.tittel, kat.kort, (t.avsnitt || []).map(a => a.tittel + " " + (a.del || "")).join(" "), Object.keys(t.ord || {}).join(" "), (t.personer || []).map(p => p.navn).join(" ")].join(" "), fagnavn + " · " + kat.trinn + ". trinn");
  Object.entries(t.ord || {}).forEach(([o, forkl]) => {
    const n = o.toLowerCase();
    if (!begreper.has(n)) begreper.set(n, { o, forkl, temaer: [], temaId: kat.id, temaTittel: kat.tittel, fag: kat.fag, sprak: t.sprak || "nb" });
    begreper.get(n).temaer.push(kat.tittel);
  });
  (t.tidslinje || []).forEach(h => {
    const ar = (String(h.dato).match(/\d{3,4}/) || [])[0];
    if (ar && !/f\.\s*kr|\bbc\b/i.test(h.dato)) hendelser.push([String(h.dato), ren(h.tekst), Number(ar), kat.id, kat.tittel, (kat.sted && kat.sted.navn) || "", kat.fag === "engelsk" ? 1 : 0, kat.trinn]);
  });
  (t.personer || []).forEach(p => {
    const n = p.navn.toLowerCase();
    if (!personer.has(n)) personer.set(n, { p, temaer: [] });
    personer.get(n).temaer.push(kat.tittel);
  });
}
begreper.forEach(({ o, forkl, temaer }) => legg("begrep", o, "begreper.html?sok=" + encodeURIComponent(o), forkl, o, temaer.slice(0, 2).join(", ")));
personer.forEach(({ p, temaer }) => legg("person", p.navn, "personer.html?sok=" + encodeURIComponent(p.navn), (p.levde ? p.levde + " · " : "") + (p.rolle || ""), p.navn + " " + (p.rolle || ""), temaer.slice(0, 2).join(", ")));

// Lesetekster
last("data/lesing/oversikt.js");
ctx.LV.lesetekster.forEach(t => legg("tekst", t.tittel, "lesing.html?id=" + t.id, t.kort, [t.tittel, t.forfatter, t.sjanger, (t.tags || []).join(" ")].join(" "), t.forfatter + " · " + t.sjanger));

// Filmer og filmguider
last("data/film/oversikt.js");
ctx.LV.filmer.forEach(f => legg("film", f.tittel + " (" + f.ar + ")", "film.html?id=" + f.id, f.kort, [f.tittel, f.tagline, (f.tags || []).join(" "), f.serie ? "serie series tv" : "film movie"].join(" "), f.serie ? "TV-serie" : "Film"));

// Skriveguider
last("data/skriving/oversikt.js");
ctx.LV.skriveguider.forEach(g => legg("skriving", g.tittel, g.lenke || "skriving.html?id=" + g.id, g.kort, [g.tittel, g.kort, "how to write skriveguide", g.id].join(" "), g.sprak === "en" ? "Writing guide" : "Skriveguide"));

// Lesestrategier
last("data/lesestrategier.js");
ctx.LV.lesestrategier.strategier.forEach(st => legg("side", st.navn + " (" + st.en + ")", "lesestrategier.html#" + st.id, st.kort, [st.navn, st.en, st.kort, st.hva, "lesestrategi reading strategy"].join(" "), "Lesestrategi"));

// Grammatikk
last("data/grammatikk/oversikt.js");
(ctx.LV.grammatikkListe || []).forEach(e => legg("grammatikk", e.tittel, "grammatikk.html?id=" + e.id, e.kort, [e.tittel, e.kort, e.entall || "", "grammar"].join(" "), "Grammar and vocabulary"));

// Landsider og sport
last("data/land/oversikt.js");
ctx.LV.landliste.forEach(l => legg("land", l.navn, "land.html?id=" + l.id, l.kort, [l.navn, l.norsk, l.kort].join(" "), l.norsk));
last("data/sport.js");
ctx.LV.sport.idretter.forEach(i => legg("sport", i.navn, "sport.html#sport-" + i.id, i.kort, [i.navn, i.kort, i.ord.map(o => o[0]).join(" "), "sport idrett"].join(" "), "Sport"));

// Kartspill
last("data/kartspill.js");
ctx.LV.kartspill.forEach(s => legg("kart", s.tittel, "kartspill.html?sett=" + s.id, s.beskrivelse, [s.tittel, s.beskrivelse, s.gruppe, "kart kartspill map"].join(" "), "Kartspill · " + s.gruppe));

const ut = "/* Generert av verktoy/lag-sok.mjs – ikke rediger for hånd. Kjør skriptet på nytt når innholdet endres. */\nwindow.LV = window.LV || {};\nLV.sokIndeks = " + JSON.stringify(I) + ";\n";
fs.writeFileSync(path.join(ROT, "data", "sok.js"), ut);

// Dagens begrep (forsiden): alle begrepene, i fast rekkefølge
const dagens = [...begreper.values()].map(b => [b.o, ren(b.forkl), b.temaId, b.temaTittel, b.sprak === "en" ? 1 : 0]);
fs.writeFileSync(path.join(ROT, "data", "dagens-begrep.js"), "/* Lages av verktoy/lag-sok.mjs – ikke rediger for hånd. [begrep, forklaring, temaId, temaTittel, engelsk] */\nwindow.LV = window.LV || {};\nLV.dagensBegrep = " + JSON.stringify(dagens) + ";\n");
console.log("data/dagens-begrep.js", dagens.length, "begreper");

// Tidsreisen: alle hendelser fra tidslinjene [dato, tekst, år, temaId, temaTittel, sted, engelsk, trinn]
fs.writeFileSync(path.join(ROT, "data", "tidsreise.js"), "/* Lages av verktoy/lag-sok.mjs – ikke rediger for hånd. */\nwindow.LV = window.LV || {};\nLV.tidsreise = " + JSON.stringify(hendelser) + ";\n");
console.log("data/tidsreise.js", hendelser.length, "hendelser");
const teller = {}; I.forEach(e => { teller[e.k] = (teller[e.k] || 0) + 1; });
console.log("data/sok.js", Math.round(ut.length / 1024) + " kB", JSON.stringify(teller));

// Aktivitetene til «Alt om temaet» (data/aktiviteter.js)
await import("./lag-aktiviteter.mjs");
