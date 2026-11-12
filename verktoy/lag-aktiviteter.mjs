// Les verden – lager data/aktiviteter.js: alle aktiviteter som hører til hvert tema.
// Brukes av boksen «Alt om temaet» på temasidene.
// Kjør: node verktoy/lag-aktiviteter.mjs  (etter at spill, rollespill, kilder osv. er endret)
// (lag-sok.mjs kjører dette skriptet automatisk til slutt.)
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const ROT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ctx = { console };
ctx.window = ctx; ctx.LV = {};
vm.createContext(ctx);
const last = f => vm.runInContext(fs.readFileSync(path.join(ROT, f), "utf8"), ctx, { filename: f });
[
  "data/temaer/oversikt.js", "data/arsak.js", "data/debatt.js", "data/diamant.js", "data/endring.js", "data/escape.js",
  "data/fn.js", "data/fortellinger.js", "data/historiker.js", "data/intervju.js", "data/kilder.js", "data/perspektiv.js",
  "data/skriftlig.js", "data/sport.js", "data/tekstpar.js", "data/kartspill.js", "data/mysterium/saker.js",
  "data/hverdagsbilder.js", "data/feed.js", "data/ordreise.js", "data/fred.js", "data/hvaom.js", "data/museum.js", "data/idiomer.js", "data/domstol.js"
].forEach(last);
const LV = ctx.LV;
const ider = new Set(LV.temaer.map(t => t.id));
const ren = s => String(s || "").replace(/\*\*|\*|\[\[|\]\]/g, "").replace(/\s+/g, " ").trim();

// Grupper: les = Les og lytt, ov = Spill og øv, tenk = Tenk, diskuter og rollespill, skriv = Snakk og skriv
const A = {};
const legg = (tema, gruppe, href, ikon, tittel, type) => {
  if (!ider.has(tema)) return;
  (A[tema] = A[tema] || []).push([gruppe, href, ikon || "•", ren(tittel), type]);
};
const enc = encodeURIComponent;

LV.fortellinger.forEach(f => legg(f.tema, "tenk", "fortelling.html?id=" + enc(f.id), f.ikon, "Velg din vei: " + f.tittel, "Fortelling"));
LV.kilder.forEach(k => legg(k.tema, "tenk", "kilder.html?id=" + enc(k.id), k.ikon, k.tittel + " (" + k.aar + ")", "Kildeanalyse"));
LV.historiker.forEach(h => legg(h.tema, "tenk", "historiker.html?id=" + enc(h.id), h.ikon, h.tittel, "Tenk som en historiker"));
LV.arsakskjeder.forEach(k => legg(k.tema, "tenk", "arsak.html?id=" + enc(k.id), "🔗", k.tittel, "Årsak og virkning"));
LV.diamant.forEach(d => legg(d.tema, "tenk", "diamant.html?id=" + enc(d.id), d.ikon, d.sporsmal, "Rangering"));
LV.perspektiv.forEach(p => legg(p.tema, "tenk", "perspektiv.html?id=" + enc(p.id), p.ikon, p.tittel, "Perspektiver"));
LV.endring.temaer.forEach(e => legg(e.tema, "tenk", "endring.html?id=" + enc(e.id), e.ikon, e.tittel, "Endring og kontinuitet"));
LV.intervju.forEach(i => legg(i.tema, "tenk", "intervju.html?id=" + enc(i.id), i.ikon, i.navn + " (" + i.levde + ")", "Intervju"));
LV.debatt.pastander.forEach(p => legg(p.tema, "tenk", "debatt.html?id=" + enc(p.id), "⚖️", p.pastand, "Debatt"));
LV.fn.saker.forEach(s => legg(s.tema, "tenk", "fn.html?sak=" + enc(s.id), s.ikon, "FN-rollespill: " + s.tittel, "Rollespill"));
LV.escape.forEach(e => legg(e.tema, "ov", "escape.html?id=" + enc(e.id), e.ikon, e.tittel, "Escape room"));
LV.mysteriumSaker.forEach(m => legg(m.tema, "ov", "mysterium.html?sak=" + enc(m.id), m.ikon, m.tittel, "Kalde spor"));
LV.kartspill.forEach(s => [...new Set((s.elementer || []).map(e => e.tema).filter(Boolean))]
  .forEach(t => legg(t, "ov", "kartspill.html?sett=" + enc(s.id), "🗺️", s.tittel, "Kartspill")));
LV.tekstpar.forEach(p => [p.tema, p.a && p.a.type === "tema" && p.a.id, p.b && p.b.type === "tema" && p.b.id].filter(Boolean)
  .filter((t, i, a) => a.indexOf(t) === i).forEach(t => legg(t, "les", "tekstpar.html?id=" + enc(p.id), p.ikon, p.tittel, "Tekstpar")));
LV.skriftlig.forEach(s => legg(s.kobling, "skriv", "skriftlig.html?id=" + enc(s.id), s.ikon, s.tema, "Skriftlig eksamen"));
LV.hvaom.forEach(s => legg(s.tema, "tenk", "hvaom.html?id=" + enc(s.id), s.ikon, s.sporsmal, "Hva om …?"));
LV.museum.forEach(g => legg(g.tema, "les", "museum.html?id=" + enc(g.id), g.ikon, "Museet vårt: " + g.navn + " (" + g.tid + ")", "Skriv museumsskilt"));
LV.feeder.forEach(f => legg(f.tema, "tenk", "feed.html?id=" + enc(f.id), f.ikon, "Feeden fra fortiden: " + f.tittel + " (" + f.dato + ")", "Sosiale medier fra historien"));
LV.fred.konferanser.forEach(k => [k.tema].concat(k.koblet || []).forEach(t => legg(t, "tenk", "fred.html?konf=" + enc(k.id), k.ikon, "Fredskonferansen: " + k.tittel + " " + k.dato, "Rollespill")));
LV.hverdagsbilder.forEach(b => legg(b.tema, "ov", "tidsreise.html?modus=hverdag&start=" + enc(b.id), "🏠", "Hverdagsbilde: Hvilket år er det?", "Tidsreisen – nærlesing"));
{ const per = {}; LV.ordreise.filter(w => w.tema).forEach(w => (per[w.tema] = per[w.tema] || []).push(w.o));
  Object.entries(per).forEach(([t, l]) => legg(t, "les", "ordreise.html?ord=" + enc(l[0]), "🧳", "Ord som har reist: " + l.map(o => "«" + o + "»").join(", "), "Ordenes historie")); }
// Menneskerettighetsdomstolen, Klimatoppmøtet og Byen vokser
LV.domstol.saker.forEach(x => legg(x.tema, "tenk", "domstol.html?sak=" + enc(x.id), "🏛️", "Menneskerettighetsdomstolen: " + x.tittel + " (" + x.artikkel.nr.replace(/ sammen.*/, "") + ")", "Rollespill"));
legg("sf10-fn-menneskerettigheter", "tenk", "domstol.html", "🏛️", "Menneskerettighetsdomstolen – seks saker", "Rollespill");
["sf10-klimaendringer", "sf10-internasjonalt-samarbeid"].forEach(t => legg(t, "tenk", "klima.html", "🌍", "Klimatoppmøtet", "Rollespill med klimamodell"));
["sf9-industrialiseringen", "sf9-arbeiderbevegelsen", "sf8-befolkning-urbanisering"].forEach(t => legg(t, "tenk", "byen.html", "🏭", "Byen vokser 1840–1910", "Simulering"));
// Idiomdetektiven: idiomer med temakobling
{ const per = {}; LV.idiomer.filter(x => x.tema).forEach(x => (per[x.tema] = per[x.tema] || []).push(x.i));
  Object.entries(per).forEach(([t, l]) => legg(t, "les", "idiomer.html#i-" + l[0].toLowerCase().replace(/[’']/g, "").replace(/[^a-z]+/g, "-").replace(/^-|-$/g, ""), "🕵️", "Idiom: " + l.map(o => "«" + o + "»").join(", "), "Idiomdetektiven")); }
(LV.sport.temaer || []).forEach(t => legg(t, "les", "sport.html", "⚽", "Sports in the English-speaking world", "Temaside"));

const ut = "/* Lages automatisk av verktoy/lag-aktiviteter.mjs – ikke rediger for hånd.\n" +
  "   For hvert tema: [gruppe, lenke, ikon, tittel, type]. Gruppe: les | ov | tenk | skriv */\n" +
  "window.LV = window.LV || {};\nLV.aktiviteter = " + JSON.stringify(A, null, 0).replace(/\],\"/g, '],\n"') + ";\n";
fs.writeFileSync(path.join(ROT, "data/aktiviteter.js"), ut);
const n = Object.values(A).reduce((s, l) => s + l.length, 0);
console.log("aktiviteter.js: " + n + " aktiviteter fordelt på " + Object.keys(A).length + " temaer");
