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
