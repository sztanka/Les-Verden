// Lager data/worldle.js: omrisset av hvert land, navn på norsk og engelsk,
// midtpunkt (for avstand og retning) og verdensdel.
// Kilder: Natural Earth 1:50m admin 0 map subunits (verktoy/kilder/, public domain)
//         i18n-iso-countries (landnavn på norsk bokmål og engelsk, MIT)
// Kjør: cd verktoy && node lag-worldle.mjs
import fs from "node:fs";
import { createRequire } from "node:module";
import { geoAzimuthalEqualArea, geoCentroid, geoArea, geoDistance } from "d3-geo";
import { VERDEN_LAND } from "./kartsett.mjs";

const require = createRequire(import.meta.url);
const land = require("i18n-iso-countries");
land.registerLocale(require("i18n-iso-countries/langs/nb.json"));
land.registerLocale(require("i18n-iso-countries/langs/en.json"));

const R = 6371; // km
const fc = JSON.parse(fs.readFileSync("kilder/ne_50m_admin_0_map_subunits.geojson", "utf8"));

// Slå sammen enheter slik Norge offisielt ser på grensene
const FLYTT = { CYN: "CYP", SOL: "SOM" };
const flyttDel = p => (p.ADM0_A3 === "RUS" && p.SUBUNIT === "Crimea") ? "UKR" : (FLYTT[p.ADM0_A3] || p.ADM0_A3);

const NAVN_NB = { BY: "Belarus", CD: "Den demokratiske republikken Kongo", CG: "Republikken Kongo", PS: "Palestina", MM: "Myanmar", US: "USA", GB: "Storbritannia" };
const NAVN_EN = { US: "United States", GB: "United Kingdom", CI: "Ivory Coast", CD: "DR Congo", CG: "Republic of the Congo", MK: "North Macedonia",
  TW: "Taiwan", PS: "Palestine", CZ: "Czechia", VA: "Vatican City", BO: "Bolivia", VE: "Venezuela", IR: "Iran", SY: "Syria", RU: "Russia",
  TZ: "Tanzania", LA: "Laos", VN: "Vietnam", KR: "South Korea", KP: "North Korea", MD: "Moldova", BN: "Brunei", FM: "Micronesia", KN: "Saint Kitts and Nevis" };
const VERDENSDEL = { "Africa": "Afrika", "Europe": "Europa", "Asia": "Asia", "North America": "Nord-Amerika", "South America": "Sør-Amerika", "Oceania": "Oseania", "Antarctica": "Antarktis", "Seven seas (open ocean)": "Hav" };
const ENGELSKSPRAKLIG = new Set(["GB", "IE", "US", "CA", "AU", "NZ", "ZA", "IN", "SG", "JM", "NG", "KE", "GH", "UG", "TZ", "ZM", "ZW", "BW", "NA", "MW", "SL", "LR", "GM", "PH", "PK", "BZ", "GY", "TT", "BS", "BB", "PG", "FJ", "MT", "CM", "RW", "SS", "LS", "SZ"]);
const LETT = new Set(VERDEN_LAND);

// Grupper delene per land
const grupper = new Map();
for (const f of fc.features) {
  const p = f.properties;
  const id = flyttDel(p);
  if (!grupper.has(id)) grupper.set(id, { deler: [], navn: new Set() });
  const g = grupper.get(id);
  g.deler.push(f);
  [p.ADMIN, p.NAME, p.GEOUNIT, p.NAME_LONG].forEach(n => n && g.navn.add(n));
  if (p.ADM0_A3 === id && (p.HOMEPART === 1 || !g.hoved)) g.hoved = p;
}

// Natural Earth bruker motsatt omløpsretning av det d3-geo forventer: snu ringer som dekker «hele jorda»
const snu = poly => geoArea({ type: "Polygon", coordinates: poly }) > 2 * Math.PI ? poly.map(r => r.slice().reverse()) : poly;
const polygoner = geom => (geom.type === "Polygon" ? [geom.coordinates] : geom.type === "MultiPolygon" ? geom.coordinates : []).map(snu);

// Ramer–Douglas–Peucker i skjermkoordinater
function forenkle(pts, tol) {
  if (pts.length < 4) return pts;
  const behold = new Uint8Array(pts.length); behold[0] = behold[pts.length - 1] = 1;
  const stabel = [[0, pts.length - 1]];
  while (stabel.length) {
    const [a, b] = stabel.pop();
    let maks = 0, idx = -1;
    const [x1, y1] = pts[a], [x2, y2] = pts[b], dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy) || 1e-9;
    for (let i = a + 1; i < b; i++) {
      const d = Math.abs(dy * pts[i][0] - dx * pts[i][1] + x2 * y1 - y2 * x1) / len;
      if (d > maks) { maks = d; idx = i; }
    }
    if (maks > tol) { behold[idx] = 1; stabel.push([a, idx], [idx, b]); }
  }
  return pts.filter((_, i) => behold[i]);
}
const flate = pts => { let s = 0; for (let i = 0; i < pts.length; i++) { const [x1, y1] = pts[i], [x2, y2] = pts[(i + 1) % pts.length]; s += x1 * y2 - x2 * y1; } return Math.abs(s) / 2; };

const ut = [];
for (const [id, g] of grupper) {
  const h = g.hoved;
  if (!h) continue;
  const a2 = (h.ISO_A2_EH && h.ISO_A2_EH !== "-99") ? h.ISO_A2_EH : (h.ISO_A2 !== "-99" ? h.ISO_A2 : null);
  if (!a2 || !land.getName(a2, "nb")) continue;
  if (h.CONTINENT === "Antarctica") continue;
  // Hjemmedelen og deler som ligger nær (Korsika, Bornholm, Balearene). Ikke Alaska, Svalbard osv.
  const hjem = g.deler.filter(f => f.properties.HOMEPART === 1 || f.properties.ADM0_A3 !== id);
  const hjemFc = { type: "Feature", geometry: { type: "MultiPolygon", coordinates: (hjem.length ? hjem : g.deler).flatMap(f => polygoner(f.geometry)) } };
  const sentrum0 = geoCentroid(hjemFc);
  const deler = g.deler.filter(f => hjem.includes(f) || geoDistance(geoCentroid(f), sentrum0) * R < 700);
  let polys = deler.flatMap(f => polygoner(f.geometry));
  // Dropp små øyer langt unna hoveddelen
  const storst = polys.reduce((m, p) => Math.max(m, geoArea({ type: "Polygon", coordinates: p })), 0);
  polys = polys.filter(p => { const a = geoArea({ type: "Polygon", coordinates: p }); return a > storst * 0.25 || geoDistance(geoCentroid({ type: "Polygon", coordinates: p }), sentrum0) * R < 1500; });
  const feature = { type: "Feature", geometry: { type: "MultiPolygon", coordinates: polys } };
  const [lon, lat] = geoCentroid(feature);
  const areal = Math.round(geoArea(feature) * R * R);
  const proj = geoAzimuthalEqualArea().rotate([-lon, -lat]).fitExtent([[8, 8], [192, 192]], feature);
  let d = "";
  for (const poly of polys) {
    for (const ring of poly) {
      let pts = ring.map(c => proj(c)).filter(Boolean);
      // Ringen er lukket (første = siste punkt): del den i to før forenkling
      const midt = pts.length >> 1;
      pts = forenkle(pts.slice(0, midt + 1), 0.45).concat(forenkle(pts.slice(midt), 0.45).slice(1, -1));
      if (pts.length < 3 || flate(pts) < 1.2) continue;
      d += "M" + pts.map(([x, y]) => x.toFixed(1).replace(/\.0$/, "") + " " + y.toFixed(1).replace(/\.0$/, "")).join("L") + "Z";
    }
  }
  if (!d) continue;
  const suveren = !["Dependency", "Lease"].includes(h.TYPE) || a2 === "GL";
  const lett = [...g.navn].some(n => LETT.has(n)) ? 1 : 0;
  ut.push({
    a2, nb: NAVN_NB[a2] || land.getName(a2, "nb"), en: NAVN_EN[a2] || land.getName(a2, "en"),
    lat: +lat.toFixed(2), lon: +lon.toFixed(2), del: VERDENSDEL[h.CONTINENT] || h.CONTINENT, areal,
    mal: suveren && areal >= 8000 && !["FK", "EH"].includes(a2) ? 1 : 0, lett, engelsk: ENGELSKSPRAKLIG.has(a2) ? 1 : 0, d
  });
}
// Samme landkode fra flere enheter: behold den største
const perKode = new Map();
for (const x of ut) if (!perKode.has(x.a2) || perKode.get(x.a2).areal < x.areal) perKode.set(x.a2, x);
ut.length = 0; ut.push(...perKode.values());
ut.sort((a, b) => a.nb.localeCompare(b.nb, "nb"));
const tekst = "/* Laget av verktoy/lag-worldle.mjs fra Natural Earth (public domain) og i18n-iso-countries (MIT) – ikke rediger for hånd */\n" +
  "window.LV = window.LV || {};\nLV.worldle = " + JSON.stringify(ut.map(x => [x.a2, x.nb, x.en, x.lat, x.lon, x.del, x.areal, x.mal, x.lett, x.engelsk, x.d])) + ";\n";
fs.writeFileSync("../data/worldle.js", tekst);
console.log(ut.length, "land,", ut.filter(x => x.mal).length, "kan være riktig svar,", ut.filter(x => x.lett).length, "lette,", (tekst.length / 1024).toFixed(0), "kB");
const mangler = VERDEN_LAND.filter(n => !ut.some(x => x.lett && [...grupper.values()].some(g => g.navn.has(n) && (g.hoved.ISO_A2_EH === x.a2 || g.hoved.ISO_A2 === x.a2))));
if (mangler.length) console.log("Fant ikke:", mangler.join(", "));
