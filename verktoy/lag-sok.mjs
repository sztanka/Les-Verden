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
  ["How to learn English", "laere-engelsk.html", "Strategier for å lære ord, skrive tekster og klare seg i samtaler.", "språklæring strategier learning strategies vocabulary false friends falske venner explain the word kommunikasjonsstrategier"],
  ["Pronunciation for Norwegians", "uttale.html", "Vanskelige engelske lyder, ordtrykk, stumme bokstaver og aksenter.", "uttale pronunciation th w v word stress ordtrykk silent letters stumme bokstaver accent aksent british american"],
  ["Planlegger for lærere", "planlegger.html", "Finn innhold etter fag, trinn og kompetansemål, og del en arbeidsplan med elevene.", "planlegger kompetansemål læreplan lk20 saf01-05 eng01-06 arbeidsplan ukeplan økt"]
].forEach(([t, u, s, x]) => legg("side", t, u, s, x));

// Temaer, begreper og personer
last("data/temaer/oversikt.js");
const begreper = new Map(), personer = new Map();
for (const kat of ctx.LV.temaer) {
  ctx.LV.tema = null;
  last("data/temaer/" + kat.id + ".js");
  const t = ctx.LV.tema;
  if (!t) continue;
  const fagnavn = kat.fag === "engelsk" ? "Engelsk" : "Samfunnsfag";
  legg("tema", kat.tittel, "tema.html?id=" + kat.id, kat.kort, [kat.tittel, kat.kort, (t.avsnitt || []).map(a => a.tittel + " " + (a.del || "")).join(" "), Object.keys(t.ord || {}).join(" "), (t.personer || []).map(p => p.navn).join(" ")].join(" "), fagnavn + " · " + kat.trinn + ". trinn");
  Object.entries(t.ord || {}).forEach(([o, forkl]) => {
    const n = o.toLowerCase();
    if (!begreper.has(n)) begreper.set(n, { o, forkl, temaer: [] });
    begreper.get(n).temaer.push(kat.tittel);
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
const teller = {}; I.forEach(e => { teller[e.k] = (teller[e.k] || 0) + 1; });
console.log("data/sok.js", Math.round(ut.length / 1024) + " kB", JSON.stringify(teller));
