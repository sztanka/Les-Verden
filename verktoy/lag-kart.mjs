// =========================================================
// Les verden – lager kartene og spillsettene til kartspillet
//
// Bruk (krever Node.js 18+):
//   cd verktoy
//   npm install   (d3-geo, topojson-client/-server/-simplify, world-atlas, us-atlas)
//   node lag-kart.mjs
//
// Kartdata: Natural Earth (offentlig eiendom, naturalearthdata.com)
// og US Census Bureau via us-atlas. Natural Earth-filene lastes ned
// automatisk til verktoy/kilder/ første gang.
// Resultatet skrives til data/kart/*.js og data/kartspill.js.
// =========================================================

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import * as d3 from "d3-geo";
import * as topojson from "topojson-client";
import * as topoServer from "topojson-server";
import * as topoSimp from "topojson-simplify";
import * as S from "./kartsett.mjs";

const require = createRequire(import.meta.url);
const HER = path.dirname(fileURLToPath(import.meta.url));
const ROT = path.join(HER, "..");
const KILDER = path.join(HER, "kilder");
fs.mkdirSync(KILDER, { recursive: true });
fs.mkdirSync(path.join(ROT, "data", "kart"), { recursive: true });

async function hentNE(navn) {
  const fil = path.join(KILDER, navn + ".geojson");
  if (!fs.existsSync(fil)) {
    const url = "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/" + navn + ".geojson";
    console.log("Laster ned", url);
    const svar = await fetch(url);
    if (!svar.ok) throw new Error("Klarte ikke å laste ned " + navn);
    fs.writeFileSync(fil, Buffer.from(await svar.arrayBuffer()));
  }
  return JSON.parse(fs.readFileSync(fil, "utf8"));
}

const rund = v => Math.round(v * 10) / 10;
const ADVARSLER = [];

function lagSti(proj) {
  const sti = d3.geoPath(proj);
  if (sti.digits) sti.digits(1);
  return sti;
}

function omrade(sti, feature, terskel) {
  const d = sti(feature);
  if (!d) return null;
  const a = sti.area(feature);
  const c = sti.centroid(feature);
  const o = { d: d };
  if (a < terskel) { o.liten = true; o.x = rund(c[0]); o.y = rund(c[1]); }
  o.sx = rund(c[0]); o.sy = rund(c[1]);
  return o;
}

function punkt(proj, lat, lon) {
  const p = proj([lon, lat]);
  if (!p) { ADVARSLER.push("Punkt utenfor kartet: " + lat + "," + lon); return null; }
  return [rund(p[0]), rund(p[1])];
}

function skrivKart(id, data) {
  const fil = path.join(ROT, "data", "kart", id + ".js");
  const tekst = "/* Generert av verktoy/lag-kart.mjs – ikke rediger for hånd.\n   Kartdata: Natural Earth (offentlig eiendom) og US Census Bureau (us-atlas). */\n" +
    "window.LV = window.LV || {};\nwindow.LV.kartdata = window.LV.kartdata || {};\nwindow.LV.kartdata[" + JSON.stringify(id) + "] = " + JSON.stringify(data) + ";\n";
  fs.writeFileSync(fil, tekst);
  console.log(id + ".js", Math.round(tekst.length / 1024) + " kB");
}

const SETT = [];

// =========================================================
// VERDEN
// =========================================================
{
  const W = 1000;
  const verden = require("world-atlas/countries-110m.json");
  const land = topojson.feature(verden, verden.objects.countries).features.filter(f => f.properties.name !== "Antarctica");
  const fc = { type: "FeatureCollection", features: land };
  const proj = d3.geoNaturalEarth1().fitWidth(W, fc);
  const sti = lagSti(proj);
  const b = sti.bounds(fc);
  const H = Math.ceil(b[1][1]) + 2;

  const kart = { id: "verden", bredde: W, hoyde: H, bakgrunn: [], omrader: {}, linjer: {} };
  land.forEach(f => kart.bakgrunn.push({ d: sti(f), n: S.LANDNAVN[f.properties.name] || f.properties.name }));

  // Land i verden
  const landSett = [];
  S.VERDEN_LAND.forEach(n => {
    const f = land.find(x => x.properties.name === n);
    if (!f) return ADVARSLER.push("Fant ikke land (verden): " + n);
    kart.omrader["land:" + n] = omrade(sti, f, 25);
    landSett.push({ id: "land:" + n, navn: S.LANDNAVN[n] || n, form: "omrade" });
  });
  SETT.push({ id: "verden-land", kart: "verden", gruppe: "Verden", tittel: "Land i verden", fag: "samfunnsfag", beskrivelse: "Finn 59 viktige land på verdenskartet.", elementer: landSett });

  // Elver
  const elvData = await hentNE("ne_50m_rivers_lake_centerlines");
  const elvSett = [];
  S.ELVER.forEach(e => {
    const [v, s, o, n] = e.boks;
    const linjer = [];
    elvData.features.forEach(f => {
      const pn = f.properties.name_en || f.properties.name;
      if (!e.ne.includes(pn)) return;
      const geo = f.geometry.type === "LineString" ? [f.geometry.coordinates] : f.geometry.coordinates;
      geo.forEach(l => { if (l.some(([x, y]) => x >= v && x <= o && y >= s && y <= n)) linjer.push(l); });
    });
    if (!linjer.length) return ADVARSLER.push("Fant ikke elv: " + e.navn);
    const geom = { type: "MultiLineString", coordinates: linjer };
    const id = "elv:" + e.navn;
    kart.linjer[id] = { d: sti(geom) };
    elvSett.push({ id: id, navn: e.navn, form: "linje", info: e.info });
  });
  SETT.push({ id: "verden-elver", kart: "verden", gruppe: "Verden", tittel: "Store elver", fag: "samfunnsfag", beskrivelse: "Nilen, Amazonas, Donau og andre store elver i verden.", elementer: elvSett });

  // Fjellkjeder og ørkener
  const regioner = await hentNE("ne_10m_geography_regions_polys");
  const regionSett = (liste, prefiks) => liste.map(e => {
    const f = regioner.features.filter(x => x.properties.NAME_EN === e.ne || x.properties.NAME === e.ne)
      .sort((a, b) => a.properties.SCALERANK - b.properties.SCALERANK)[0];
    if (!f) { ADVARSLER.push("Fant ikke region: " + e.ne); return null; }
    const id = prefiks + e.navn;
    kart.omrader[id] = omrade(sti, f, 25);
    return { id: id, navn: e.navn, form: "omrade", info: e.info };
  }).filter(Boolean);
  SETT.push({ id: "verden-fjell", kart: "verden", gruppe: "Verden", tittel: "Fjellkjeder", fag: "samfunnsfag", beskrivelse: "Himalaya, Alpene, Andesfjellene og andre store fjellkjeder.", elementer: regionSett(S.FJELL, "fjell:") });
  SETT.push({ id: "verden-orkener", kart: "verden", gruppe: "Verden", tittel: "Ørkener", fag: "samfunnsfag", beskrivelse: "Sahara, Gobi, Atacama og andre ørkener.", elementer: regionSett(S.ORKENER, "orken:") });

  // Landemerker og hendelser (punkter)
  SETT.push({
    id: "verden-landemerker", kart: "verden", gruppe: "Verden", tittel: "Kjente landemerker", fag: "samfunnsfag",
    beskrivelse: "Eiffeltårnet, Taj Mahal, Machu Picchu og andre kjente steder.",
    elementer: S.LANDEMERKER.map(([n, la, lo, info]) => ({ id: "lm:" + n, navn: n, form: "punkt", xy: punkt(proj, la, lo), info: info }))
  });
  SETT.push({
    id: "verden-hendelser", kart: "verden", gruppe: "Verden", tittel: "Slag og historiske hendelser", fag: "samfunnsfag",
    beskrivelse: "Fra Columbus i 1492 til 11. september 2001 – med lenker til temaene.",
    elementer: S.HENDELSER.map(([n, la, lo, info, tema]) => ({ id: "hd:" + n, navn: n, form: "punkt", xy: punkt(proj, la, lo), info: info, tema: tema || undefined }))
  });

  skrivKart("verden", kart);
}

// =========================================================
// EUROPA
// =========================================================
{
  const W = 1000, H = 860;
  const verden = require("world-atlas/countries-50m.json");
  const land = topojson.feature(verden, verden.objects.countries).features;
  const ramme = { type: "Polygon", coordinates: [[[-24, 34.5], [-24, 71.5], [44, 71.5], [44, 34.5], [-24, 34.5]]] };
  const proj = d3.geoAzimuthalEqualArea().rotate([-12, -53]).fitExtent([[5, 5], [W - 5, H - 5]], ramme);
  proj.clipExtent([[-0.35 * W, -0.2 * H], [1.35 * W, 1.2 * H]]);
  const sti = lagSti(proj);
  const kart = { id: "europa", bredde: W, hoyde: H, bakgrunn: [], omrader: {}, linjer: {} };
  land.forEach(f => {
    if (S.EUROPA_LAND.includes(f.properties.name)) return;
    const d = sti(f);
    if (d) kart.bakgrunn.push({ d: d, n: S.LANDNAVN[f.properties.name] || f.properties.name });
  });
  const landSett = [];
  S.EUROPA_LAND.forEach(n => {
    const f = land.find(x => x.properties.name === n);
    if (!f) return ADVARSLER.push("Fant ikke land (Europa): " + n);
    kart.omrader["land:" + n] = omrade(sti, f, 40);
    landSett.push({ id: "land:" + n, navn: S.LANDNAVN[n] || n, form: "omrade" });
  });
  SETT.push({ id: "europa-land", kart: "europa", gruppe: "Europa", tittel: "Europas land", fag: "samfunnsfag", beskrivelse: "Alle de 47 landene i Europa – også de minste.", elementer: landSett });
  SETT.push({
    id: "europa-hovedsteder", kart: "europa", gruppe: "Europa", tittel: "Europas hovedsteder", fag: "samfunnsfag",
    beskrivelse: "Fra Reykjavík til Moskva – finn hovedstedene i Europa.",
    elementer: S.HOVEDSTEDER.map(([n, l, la, lo]) => ({ id: "hs:" + n, navn: n, form: "punkt", xy: punkt(proj, la, lo), hint: "Hovedstaden i " + (S.LANDNAVN[l] || l), info: "Hovedstaden i " + (S.LANDNAVN[l] || l) + "." }))
  });
  skrivKart("europa", kart);
}

// =========================================================
// USA (us-atlas er allerede projisert med geoAlbersUsa, 975 × 610)
// =========================================================
{
  const us = require("us-atlas/states-albers-10m.json");
  const stater = topojson.feature(us, us.objects.states).features;
  const sti = lagSti(null);
  const kart = { id: "usa", bredde: 975, hoyde: 610, bakgrunn: [], omrader: {}, linjer: {} };
  const statSett = [];
  stater.forEach(f => {
    const n = f.properties.name;
    if (n === "District of Columbia" || !sti(f)) return;
    kart.omrader["stat:" + n] = omrade(sti, f, 60);
    statSett.push({ id: "stat:" + n, navn: n, form: "omrade" });
  });
  statSett.sort((a, b) => a.navn.localeCompare(b.navn));
  SETT.push({ id: "usa-stater", kart: "usa", gruppe: "USA", tittel: "The 50 states", fag: "engelsk", sprak: "en", beskrivelse: "Finn alle de 50 delstatene i USA.", elementer: statSett });

  const proj = d3.geoAlbersUsa().scale(1300).translate([487.5, 305]);
  const steder = await hentNE("ne_10m_populated_places_simple");
  const hs = steder.features.filter(f => f.properties.adm0_a3 === "USA" && /Admin-1 capital/.test(f.properties.featurecla));
  const hsSett = hs.map(f => {
    const p = f.properties;
    const navn = p.name.replace(/\s+/g, " ");
    return { id: "hs:" + navn, navn: navn, form: "punkt", xy: punkt(proj, p.latitude, p.longitude), hint: "The capital of " + p.adm1name, info: "The capital of " + p.adm1name + "." };
  }).filter(e => e.xy).sort((a, b) => a.navn.localeCompare(b.navn));
  hsSett.push({ id: "hs:Washington, D.C.", navn: "Washington, D.C.", form: "punkt", xy: punkt(proj, 38.90, -77.04), hint: "The capital of the USA", info: "The capital of the whole country – not part of any state." });
  SETT.push({ id: "usa-hovedsteder", kart: "usa", gruppe: "USA", tittel: "State capitals", fag: "engelsk", sprak: "en", beskrivelse: "Finn hovedstedene i de 50 delstatene – og Washington, D.C.", elementer: hsSett });
  skrivKart("usa", kart);
}

// =========================================================
// STORBRITANNIA
// =========================================================
{
  const W = 700, H = 1000;
  const sub = await hentNE("ne_10m_admin_0_map_subunits");
  const ramme = { type: "Polygon", coordinates: [[[-10.8, 49.8], [-10.8, 61], [2.2, 61], [2.2, 49.8], [-10.8, 49.8]]] };
  const proj = d3.geoTransverseMercator().rotate([2, 0]).fitExtent([[10, 10], [W - 10, H - 10]], ramme);
  proj.clipExtent([[-0.35 * W, -0.2 * H], [1.35 * W, 1.2 * H]]);
  const sti = lagSti(proj);
  const kart = { id: "storbritannia", bredde: W, hoyde: H, bakgrunn: [], omrader: {}, linjer: {} };
  const NASJONER = { ENG: "England", SCT: "Scotland", WLS: "Wales", NIR: "Northern Ireland" };
  sub.features.forEach(f => {
    const p = f.properties;
    if (NASJONER[p.SU_A3] && p.ADM0_A3 === "GBR") return;
    if (!["IRL", "IMN", "FRA", "BEL", "NLD", "GGY", "JEY", "FRO"].includes(p.ADM0_A3) && p.ADM0_A3 !== "GBR") return;
    const d = sti(f);
    if (d) kart.bakgrunn.push({ d: d, n: p.ADM0_A3 === "IRL" ? "Ireland" : p.SUBUNIT });
  });
  const nasjonSett = [];
  Object.entries(NASJONER).forEach(([kode, n]) => {
    const f = sub.features.find(x => x.properties.SU_A3 === kode && x.properties.ADM0_A3 === "GBR");
    if (!f) return ADVARSLER.push("Fant ikke " + n);
    kart.omrader["nasjon:" + n] = omrade(sti, f, 20);
    nasjonSett.push({ id: "nasjon:" + n, navn: n, form: "omrade" });
  });
  SETT.push({
    id: "uk-byer", kart: "storbritannia", gruppe: "Storbritannia", tittel: "The UK: countries and cities", fag: "engelsk", sprak: "en",
    beskrivelse: "England, Scotland, Wales og Northern Ireland – og 27 store byer.",
    elementer: nasjonSett.concat(S.UK_BYER.map(([n, la, lo]) => ({ id: "by:" + n, navn: n, form: "punkt", xy: punkt(proj, la, lo) })))
  });
  SETT.push({
    id: "uk-dialekter", kart: "storbritannia", gruppe: "Storbritannia", tittel: "Accents and dialects", fag: "engelsk", sprak: "en",
    beskrivelse: "Cockney, Scouse, Geordie og andre aksenter – hvor snakkes de?",
    elementer: S.UK_DIALEKTER.map(([n, la, lo, info]) => ({ id: "dia:" + n, navn: n, form: "punkt", xy: punkt(proj, la, lo), info: info }))
  });
  SETT.push({
    id: "uk-landemerker", kart: "storbritannia", gruppe: "Storbritannia", tittel: "Famous places in the UK", fag: "engelsk", sprak: "en",
    beskrivelse: "Stonehenge, Loch Ness, Ben Nevis og andre kjente steder.",
    elementer: S.UK_LANDEMERKER.map(([n, la, lo, info]) => ({ id: "lm:" + n, navn: n, form: "punkt", xy: punkt(proj, la, lo), info: info }))
  });
  skrivKart("storbritannia", kart);
}

// =========================================================
// USA: byer og landemerker (samme kart som delstatene)
// =========================================================
{
  const proj = d3.geoAlbersUsa().scale(1300).translate([487.5, 305]);
  const pk = ([n, la, lo, info], pre) => ({ id: pre + n, navn: n, form: "punkt", xy: punkt(proj, la, lo), info: info });
  SETT.push({ id: "usa-byer", kart: "usa", gruppe: "USA", tittel: "Big cities in the USA", fag: "engelsk", sprak: "en", beskrivelse: "New York, Los Angeles, Chicago og 17 andre byer.", elementer: S.USA_BYER.map(b => pk(b, "by:")) });
  SETT.push({ id: "usa-landemerker", kart: "usa", gruppe: "USA", tittel: "Famous places in the USA", fag: "engelsk", sprak: "en", beskrivelse: "Grand Canyon, Statue of Liberty, Yellowstone og andre kjente steder.", elementer: S.USA_LANDEMERKER.map(b => pk(b, "lm:")) });
}

// =========================================================
// Landsidene: Irland, Australia, New Zealand, Sør-Afrika, India, Singapore
// =========================================================
{
  const sub = await hentNE("ne_10m_admin_0_map_subunits");
  const adm1 = await hentNE("ne_10m_admin_1_states_provinces");
  const overlapp = (b, r) => !(b[1][0] < r[0] || b[0][0] > r[2] || b[1][1] < r[1] || b[0][1] > r[3]);

  // Forenkler geometrien (beholder omtrent andelen «fjern» av punktene) så filene ikke blir for store.
  function forenkle(features, fjern) {
    if (!fjern || !features.length) return features;
    let topo = topoServer.topology({ o: { type: "FeatureCollection", features: features } }, 1e6);
    topo = topoSimp.presimplify(topo);
    topo = topoSimp.simplify(topo, topoSimp.quantile(topo, fjern));
    return topojson.feature(topo, topo.objects.o).features;
  }

  function lagLand(o) {
    const [v, sør, ø, n] = o.boks;
    const ramme = { type: "Polygon", coordinates: [[[v, sør], [v, n], [ø, n], [ø, sør], [v, sør]]] };
    const proj = o.proj().fitExtent([[10, 10], [o.W - 10, o.H - 10]], ramme);
    proj.clipExtent([[-0.3 * o.W, -0.3 * o.H], [1.3 * o.W, 1.3 * o.H]]);
    const sti = lagSti(proj);
    const kart = { id: o.id, bredde: o.W, hoyde: o.H, bakgrunn: [], omrader: {}, linjer: {} };
    const stor = [v - 6, sør - 6, ø + 6, n + 6];
    const naboer = forenkle(sub.features.filter(f => overlapp(d3.geoBounds(f), stor)), o.forenkle);
    naboer.forEach(f => {
      if (o.utenOmriss && o.utenOmriss.includes(f.properties.ADM0_A3) && (o.omrader || o.bakgrunnAdm1)) return;
      const d = sti(f);
      if (d) kart.bakgrunn.push({ d: d, n: o.navnPaa ? o.navnPaa(f.properties) : f.properties.SUBUNIT });
    });
    const egne = forenkle(adm1.features.filter(f => f.properties.adm0_a3 === o.adm0), o.forenkle);
    if (o.bakgrunnAdm1) egne.forEach(f => { const d = sti(f); if (d) kart.bakgrunn.push({ d: d, n: f.properties.name + " (" + o.landNavn + ")" }); });
    // Områder (delstater, provinser, fylker)
    if (o.omrader) {
      const grupper = {};
      egne.forEach(f => {
        let navn = f.properties.name;
        if (o.slaSammen && o.slaSammen[navn]) navn = o.slaSammen[navn];
        if (o.ikke && o.ikke.includes(navn)) return;
        (grupper[navn] = grupper[navn] || []).push(f);
      });
      const el = [];
      Object.entries(grupper).forEach(([navn, fs]) => {
        const fc = { type: "FeatureCollection", features: fs };
        const om = omrade(sti, fc, o.terskel || 25);
        if (!om) return ADVARSLER.push("Tomt område: " + navn);
        const visNavn = (o.navn && o.navn[navn]) || navn;
        kart.omrader[o.pre + navn] = om;
        el.push({ id: o.pre + navn, navn: visNavn, form: "omrade", hint: o.hint ? o.hint(navn) : undefined, info: o.info ? o.info(navn) : undefined });
      });
      el.sort((a, b) => a.navn.localeCompare(b.navn));
      SETT.push({ id: o.id + "-omrader", kart: o.id, gruppe: o.gruppe, tittel: o.omrader, fag: "engelsk", sprak: "en", beskrivelse: o.omrBeskr, elementer: el });
    }
    const pk = ([nv, la, lo, info], pre) => ({ id: pre + nv, navn: nv, form: "punkt", xy: punkt(proj, la, lo), info: info });
    if (o.byer) SETT.push({ id: o.id + "-byer", kart: o.id, gruppe: o.gruppe, tittel: o.byTittel, fag: "engelsk", sprak: "en", beskrivelse: o.byBeskr, elementer: o.byer.map(b => pk(b, "by:")) });
    if (o.landemerker) SETT.push({ id: o.id + "-landemerker", kart: o.id, gruppe: o.gruppe, tittel: o.lmTittel, fag: "engelsk", sprak: "en", beskrivelse: o.lmBeskr, elementer: o.landemerker.map(b => pk(b, "lm:")) });
    skrivKart(o.id, kart);
  }

  lagLand({
    id: "irland", gruppe: "Irland", W: 700, H: 880, boks: [-10.7, 51.3, -5.3, 55.5],
    proj: () => d3.geoTransverseMercator().rotate([8, 0]),
    adm0: "IRL", forenkle: 0.5, pre: "fylke:", omrader: "The counties of Ireland", omrBeskr: "Finn de 26 fylkene (counties) i Republikken Irland.",
    slaSammen: S.IRL_FYLKER_SLÅ_SAMMEN, terskel: 30, utenOmriss: ["IRL"],
    navn: Object.fromEntries(Object.keys(S.IRL_PROVINS).map(k => [k, "County " + k])),
    hint: n => "In the province of " + S.IRL_PROVINS[n], info: n => "A county in the province of " + S.IRL_PROVINS[n] + ".",
    navnPaa: p => p.ADM0_A3 === "GBR" && p.SU_A3 === "NIR" ? "Northern Ireland (UK)" : p.SUBUNIT,
    byer: S.IRL_BYER, byTittel: "Cities and towns in Ireland", byBeskr: "Dublin, Cork, Galway, Belfast og andre byer på øya Irland.",
    landemerker: S.IRL_LANDEMERKER, lmTittel: "Famous places in Ireland", lmBeskr: "Cliffs of Moher, Newgrange, Giant’s Causeway og andre kjente steder."
  });
  lagLand({
    id: "australia", gruppe: "Australia", W: 1000, H: 860, boks: [112.5, -44, 154, -10],
    proj: () => d3.geoConicConformal().parallels([-18, -36]).rotate([-133, 0]),
    adm0: "AUS", forenkle: 0.12, pre: "stat:", omrader: "States and territories", omrBeskr: "Finn de seks delstatene og to territoriene i Australia.",
    ikke: ["Jervis Bay Territory", "Macquarie Island", "Lord Howe Island"], terskel: 40, utenOmriss: ["AUS"],
    byer: S.AUS_BYER, byTittel: "Cities in Australia", byBeskr: "Canberra, Sydney, Melbourne og andre byer.",
    landemerker: S.AUS_LANDEMERKER, lmTittel: "Famous places in Australia", lmBeskr: "Uluru, Great Barrier Reef, Sydney Opera House og andre kjente steder."
  });
  lagLand({
    id: "newzealand", gruppe: "New Zealand", W: 700, H: 1000, boks: [166, -47.6, 178.8, -34.2],
    proj: () => d3.geoTransverseMercator().rotate([-173, 0]),
    adm0: "NZL", forenkle: 0.5, pre: "region:", omrader: "The regions of New Zealand", omrBeskr: "Finn de 16 regionene i New Zealand.",
    ikke: ["Auckland Islands", "Campbell Islands", "Antipodes Islands", "Chatham Islands Territory", "Kermadec Islands", "Tokelau", "The Snares", "Three Kings Islands"],
    navn: { "Manawatu-Wanganui": "Manawatū-Whanganui", "Gisborne District": "Gisborne", "Tasman District": "Tasman", "Marlborough District": "Marlborough", "Nelson City": "Nelson", "Hawke's Bay": "Hawke’s Bay" }, terskel: 30, utenOmriss: ["NZL"],
    byer: S.NZL_BYER, byTittel: "Cities in New Zealand", byBeskr: "Wellington, Auckland, Christchurch og andre byer.",
    landemerker: S.NZL_LANDEMERKER, lmTittel: "Famous places in New Zealand", lmBeskr: "Aoraki, Milford Sound, Waitangi og andre kjente steder."
  });
  lagLand({
    id: "sorafrika", gruppe: "Sør-Afrika", W: 1000, H: 820, boks: [16, -35, 33.2, -22],
    proj: () => d3.geoMercator(),
    adm0: "ZAF", forenkle: 0.3, pre: "provins:", omrader: "The provinces of South Africa", omrBeskr: "Finn de ni provinsene i Sør-Afrika.", terskel: 40, utenOmriss: ["ZAF"],
    byer: S.ZAF_BYER, byTittel: "Cities in South Africa", byBeskr: "De tre hovedstedene, Johannesburg, Durban og andre byer.",
    landemerker: S.ZAF_LANDEMERKER, lmTittel: "Famous places in South Africa", lmBeskr: "Table Mountain, Robben Island, Kruger og andre kjente steder."
  });
  lagLand({
    id: "india", gruppe: "India", W: 900, H: 1000, boks: [68, 6.5, 97.5, 37.2],
    proj: () => d3.geoMercator(),
    adm0: "IND", forenkle: 0.1, pre: "stat:", omrader: "States and union territories", omrBeskr: "Finn delstatene og unionsterritoriene i India.", terskel: 40, utenOmriss: ["IND"],
    navn: { "Andaman and Nicobar": "Andaman and Nicobar Islands", "Orissa": "Odisha" },
    byer: S.IND_BYER, byTittel: "Cities in India", byBeskr: "New Delhi, Mumbai, Kolkata og andre byer.",
    landemerker: S.IND_LANDEMERKER, lmTittel: "Famous places in India", lmBeskr: "Taj Mahal, Golden Temple, Kerala og andre kjente steder."
  });
  lagLand({
    id: "singapore", gruppe: "Singapore", W: 1000, H: 640, boks: [103.6, 1.2, 104.08, 1.48],
    proj: () => d3.geoMercator(),
    adm0: "SGP", bakgrunnAdm1: true, landNavn: "Singapore", utenOmriss: ["SGP"],
    landemerker: S.SGP_LANDEMERKER, lmTittel: "Famous places in Singapore", lmBeskr: "Marina Bay Sands, the Merlion, Changi og andre kjente steder."
  });
}

// =========================================================
// Spillsettene
// =========================================================
SETT.forEach(s => s.elementer.forEach(e => { if (e.form === "punkt" && !e.xy) ADVARSLER.push("Mangler punkt: " + e.navn); }));
const ut = "/* Generert av verktoy/lag-kart.mjs fra verktoy/kartsett.mjs – ikke rediger for hånd. */\n" +
  "window.LV = window.LV || {};\nwindow.LV.kartspill = " + JSON.stringify(SETT, null, 1) + ";\n";
fs.writeFileSync(path.join(ROT, "data", "kartspill.js"), ut);
console.log("kartspill.js", SETT.length, "sett,", SETT.reduce((n, s) => n + s.elementer.length, 0), "elementer");
if (ADVARSLER.length) console.log("ADVARSLER:\n  " + ADVARSLER.join("\n  "));
