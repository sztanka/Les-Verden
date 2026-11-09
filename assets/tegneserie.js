/* =========================================================
   Les verden – Tegneseriemaker (tegneserie.html)
   Velg ruter, bakgrunn, figurer, snakkebobler og fortellerboks.
   Tegneserien tegnes som SVG og kan lastes ned som PNG,
   skrives ut eller deles som lenke. Alt innholdet ligger i
   lenken (etter #) – ingenting lagres på nettstedet.
   ========================================================= */
(function () {
  const LV = window.LV;
  const $ = id => document.getElementById(id);
  const esc = s => LV.esc(String(s == null ? "" : s));
  const W = 400, H = 300, GAP = 14, TOPP = 46;
  const FONT = "'Comic Sans MS', 'Comic Neue', 'Chalkboard SE', 'Segoe Print', sans-serif";

  const BAKGRUNNER = [["hvit", "Hvit"], ["by", "By"], ["fabrikk", "Fabrikk"], ["land", "Landsbygd"], ["skog", "Skog"], ["hav", "Hav og skip"], ["inne", "Innendørs"], ["skole", "Klasserom"], ["talerstol", "Talerstol"], ["natt", "Natt"]];
  const FIGURER = [["", "Ingen"], ["jente", "Jente"], ["gutt", "Gutt"], ["elev", "Elev i hettegenser"], ["kvinne", "Kvinne"], ["mann", "Mann"], ["dame", "Dame med hatt"], ["arbeider", "Arbeider med sixpence"], ["soldat", "Soldat"], ["taler", "Taler i dress"], ["bestemor", "Eldre kvinne"], ["bestefar", "Eldre mann"]];
  const UTTRYKK = [["glad", "Glad"], ["noytral", "Nøytral"], ["trist", "Trist"], ["sint", "Sint"], ["overrasket", "Overrasket"]];
  const BOBLER = [["tale", "Snakker"], ["tanke", "Tenker"], ["rop", "Roper"]];
  const IDEER = [
    ["Gjenfortell en hendelse", "Velg en hendelse fra et tema – for eksempel Rosa Parks på bussen, Eidsvoll 1814 eller murens fall – og fortell den i fire ruter."],
    ["Forklar et begrep", "Lag en tegneserie som forklarer et fagbegrep, for eksempel «demokrati», «inflasjon» eller «kildekritikk», med et eksempel fra hverdagen."],
    ["Gjenfortell en novelle", "Velg en novelle fra Reading Room og fortell den i seks ruter – på engelsk."],
    ["To perspektiver", "Vis den samme situasjonen fra to sider: en fabrikkeier og en arbeider, en utvandrer og en som blir igjen."],
    ["Hva om …?", "Lag en kontrafaktisk historie: Hva om noe hadde gått annerledes? Bruk det du vet om årsaker og virkninger."],
    ["Dialog på engelsk", "Lag en samtale på engelsk mellom to ungdommer om et tema – med minst ett nytt ord fra temaet i hver rute."]
  ];
  const nyRute = () => ({ bg: "hvit", f: [{ t: "", u: "glad" }, { t: "", u: "glad" }], b: [{ w: 0, k: "tale", x: "" }, { w: 1, k: "tale", x: "" }], c: "" });
  const EKSEMPEL = { ti: "Amerikabrevet", lay: "4", r: [
    { bg: "land", f: [{ t: "jente", u: "noytral" }, { t: "bestemor", u: "trist" }], b: [{ w: 0, k: "tale", x: "Mor, det kom et brev fra Amerika!" }, { w: 1, k: "tanke", x: "Nå vil hun også reise …" }], c: "En bygd i Norge, 1882." },
    { bg: "inne", f: [{ t: "jente", u: "glad" }, { t: "", u: "glad" }], b: [{ w: 0, k: "tale", x: "Kusine Ragna skriver at det er arbeid og billig jord der borte!" }, { w: 1, k: "tale", x: "" }], c: "" },
    { bg: "hav", f: [{ t: "jente", u: "overrasket" }, { t: "arbeider", u: "noytral" }], b: [{ w: 1, k: "tale", x: "Ti dager til New York, frøken." }, { w: 0, k: "tanke", x: "Så langt hjemmefra!" }], c: "Noen måneder senere." },
    { bg: "by", f: [{ t: "jente", u: "glad" }, { t: "kvinne", u: "glad" }], b: [{ w: 1, k: "rop", x: "Velkommen!" }, { w: 0, k: "tale", x: "Ragna! Jeg klarte det!" }], c: "" }
  ] };

  // ---------- Koding (samme som i Lag selv) ----------
  const b64 = bytes => { let s = ""; bytes.forEach(b => { s += String.fromCharCode(b); }); return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""); };
  const fraB64 = s => { s = s.replace(/-/g, "+").replace(/_/g, "/"); while (s.length % 4) s += "="; return Uint8Array.from(atob(s), c => c.charCodeAt(0)); };
  const kanPakke = typeof CompressionStream === "function";
  async function strom(bytes, S) { return new Uint8Array(await new Response(new Blob([bytes]).stream().pipeThrough(new S("deflate-raw"))).arrayBuffer()); }
  async function kod(d) { const r = new TextEncoder().encode(JSON.stringify(d)); if (kanPakke) { try { return "1" + b64(await strom(r, CompressionStream)); } catch (e) { /* tilbake */ } } return "0" + b64(r); }
  async function dekod(h) {
    if (!h) return null;
    try { const by = fraB64(h.slice(1)); return rens(JSON.parse(new TextDecoder().decode(h[0] === "1" ? await strom(by, DecompressionStream) : by))); } catch (e) { return null; }
  }
  const lovlig = (v, liste, std) => liste.some(x => x[0] === v) ? v : std;
  function rens(d) {
    const s = (v, n) => String(v == null ? "" : v).slice(0, n);
    const lay = ["3", "4", "6"].includes(d && d.lay) ? d.lay : "4";
    const r = (Array.isArray(d && d.r) ? d.r : []).slice(0, 6).map(x => ({
      bg: lovlig(x && x.bg, BAKGRUNNER, "hvit"),
      f: [0, 1].map(i => { const f = (x && x.f && x.f[i]) || {}; return { t: lovlig(f.t, FIGURER, ""), u: lovlig(f.u, UTTRYKK, "glad") }; }),
      b: [0, 1].map(i => { const b = (x && x.b && x.b[i]) || {}; return { w: b.w === 1 ? 1 : 0, k: lovlig(b.k, BOBLER, "tale"), x: s(b.x, 90) }; }),
      c: s(x && x.c, 80)
    }));
    while (r.length < +lay) r.push(nyRute());
    return { ti: s(d && d.ti, 60), lay, r };
  }

  // ---------- Tegning ----------
  const X = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  function bryt(tekst, maks) {
    const ord = tekst.trim().split(/\s+/).filter(Boolean), linjer = [];
    let l = "";
    ord.forEach(o => { while (o.length > maks) { if (l) { linjer.push(l); l = ""; } linjer.push(o.slice(0, maks)); o = o.slice(maks); } if ((l + " " + o).trim().length > maks) { linjer.push(l); l = o; } else l = (l + " " + o).trim(); });
    if (l) linjer.push(l);
    return linjer;
  }
  function bakgrunn(bg) {
    const himmel = c => '<rect width="400" height="300" fill="' + c + '"/>';
    switch (bg) {
      case "by": return himmel("#cfe8f7") + '<rect x="0" y="80" width="70" height="220" fill="#9aa5b1"/><rect x="75" y="40" width="90" height="260" fill="#b6a58e"/><rect x="170" y="100" width="60" height="200" fill="#8f9bb3"/><rect x="235" y="60" width="80" height="240" fill="#c2a690"/><rect x="320" y="110" width="80" height="190" fill="#a3b0a0"/>' + [[15, 100], [40, 100], [95, 60], [130, 60], [95, 110], [130, 110], [250, 80], [285, 80], [250, 130], [285, 130], [335, 130], [365, 130]].map(([x, y]) => '<rect x="' + x + '" y="' + y + '" width="16" height="22" fill="#f6efc8"/>').join("") + '<rect y="270" width="400" height="30" fill="#7d7d7d"/>';
      case "fabrikk": return himmel("#c9c9c4") + '<circle cx="80" cy="40" r="28" fill="#b0b0aa"/><circle cx="115" cy="30" r="22" fill="#b6b6b0"/><circle cx="300" cy="35" r="30" fill="#b0b0aa"/><rect x="60" y="60" width="26" height="140" fill="#7a4b3a"/><rect x="280" y="70" width="26" height="130" fill="#7a4b3a"/><path d="M20 200 L20 140 L90 170 L90 140 L160 170 L160 140 L230 170 L230 140 L300 170 L300 140 L380 170 L380 200 Z" fill="#8c5a45"/><rect x="20" y="180" width="360" height="120" fill="#9b6a55"/>' + [50, 110, 170, 230, 290, 340].map(x => '<rect x="' + x + '" y="200" width="24" height="30" fill="#f2d98c"/>').join("") + '<rect y="275" width="400" height="25" fill="#5f5f5f"/>';
      case "land": return himmel("#bfe3f5") + '<circle cx="340" cy="55" r="30" fill="#ffd34d"/><path d="M0 200 Q100 140 200 190 T400 180 L400 300 L0 300 Z" fill="#7cb85a"/><path d="M0 240 Q150 200 400 240 L400 300 L0 300 Z" fill="#5f9e45"/><rect x="40" y="150" width="70" height="50" fill="#b23a2e"/><path d="M32 152 L75 120 L118 152 Z" fill="#6b3a2a"/><rect x="66" y="170" width="16" height="30" fill="#5a2c1e"/>';
      case "skog": return himmel("#d6ecf3") + '<rect y="240" width="400" height="60" fill="#6c8f4e"/>' + [[30, 1], [100, .8], [330, 1.1], [380, .8], [260, .7]].map(([x, s]) => '<rect x="' + (x - 6 * s) + '" y="' + (240 - 50 * s) + '" width="' + 12 * s + '" height="' + 50 * s + '" fill="#6b4a2f"/><path d="M' + (x - 45 * s) + " " + (240 - 40 * s) + " L" + x + " " + (240 - 190 * s) + " L" + (x + 45 * s) + " " + (240 - 40 * s) + ' Z" fill="#2f6b3a"/>').join("");
      case "hav": return himmel("#bfe1f2") + '<rect y="170" width="400" height="130" fill="#3b7fb6"/>' + [190, 220, 255].map(y => '<path d="M0 ' + y + " q25 -10 50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0" + '" fill="none" stroke="#a9d3ef" stroke-width="3"/>').join("") + '<path d="M250 160 L380 160 L360 190 L270 190 Z" fill="#3a2a22"/><rect x="290" y="110" width="22" height="50" fill="#e8e1d1"/><rect x="320" y="120" width="22" height="40" fill="#e8e1d1"/><rect x="292" y="104" width="18" height="8" fill="#1f1f1f"/><circle cx="60" cy="50" r="22" fill="#fff6c8"/>';
      case "inne": return '<rect width="400" height="300" fill="#efe0c4"/><rect y="230" width="400" height="70" fill="#a77b52"/><rect x="40" y="50" width="110" height="90" fill="#bfe1f2" stroke="#7a5532" stroke-width="8"/><line x1="95" y1="50" x2="95" y2="140" stroke="#7a5532" stroke-width="5"/><rect x="250" y="190" width="120" height="12" fill="#6b4a2f"/><rect x="260" y="200" width="10" height="40" fill="#6b4a2f"/><rect x="350" y="200" width="10" height="40" fill="#6b4a2f"/>';
      case "skole": return '<rect width="400" height="300" fill="#e7ecd9"/><rect x="60" y="30" width="280" height="120" fill="#2f4a3a" stroke="#8b6a45" stroke-width="8"/><text x="85" y="70" fill="#e9efe9" font-family="' + FONT + '" font-size="18">2 + 2 = 4</text><text x="200" y="110" fill="#e9efe9" font-family="' + FONT + '" font-size="18">ABC</text><rect y="240" width="400" height="60" fill="#b08a62"/>';
      case "talerstol": return '<rect width="400" height="300" fill="#7a1f2b"/>' + [20, 70, 120, 170, 220, 270, 320, 370].map(x => '<rect x="' + x + '" y="0" width="12" height="300" fill="#64161f"/>').join("") + '<rect y="250" width="400" height="50" fill="#4a3426"/><path d="M155 300 L165 215 L235 215 L245 300 Z" fill="#8a6440"/><rect x="160" y="208" width="80" height="10" fill="#5b3f27"/>';
      case "natt": return '<rect width="400" height="300" fill="#1b2445"/>' + [[30, 30], [90, 60], [150, 25], [210, 50], [260, 20], [120, 100], [40, 120], [350, 110]].map(([x, y]) => '<circle cx="' + x + '" cy="' + y + '" r="2" fill="#fff"/>').join("") + '<circle cx="330" cy="50" r="24" fill="#f4f1d0"/><circle cx="341" cy="44" r="22" fill="#1b2445"/><rect y="250" width="400" height="50" fill="#2b2f3a"/>';
      default: return '<rect width="400" height="300" fill="#ffffff"/>';
    }
  }
  const FIG = {
    jente: { hud: "#f1c27d", har: "#6b3e1f", stil: "langt", topp: "#d64545", kjole: true },
    gutt: { hud: "#8d5524", har: "#1d1d1d", stil: "kort", topp: "#3c6fb4" },
    elev: { hud: "#e0ac69", har: "#3b2a1a", stil: "kort", topp: "#f08a24", hette: true },
    kvinne: { hud: "#c68642", har: "#2b1a10", stil: "knute", topp: "#3a8f5a", kjole: true },
    mann: { hud: "#ffdbac", har: "#8a5a2b", stil: "kort", topp: "#6f6f7a", skjegg: true },
    dame: { hud: "#f1c27d", har: "#4a2a12", stil: "knute", topp: "#2f3f6f", kjole: true, hatt: "vid" },
    arbeider: { hud: "#e0ac69", har: "#5a3a1a", stil: "kort", topp: "#c9b68c", hatt: "caps" },
    soldat: { hud: "#c68642", har: "#2b1a10", stil: "kort", topp: "#5c6b3a", hatt: "hjelm" },
    taler: { hud: "#ffdbac", har: "#6f6f6f", stil: "kort", topp: "#222831", slips: true },
    bestemor: { hud: "#ffdbac", har: "#cfcfcf", stil: "knute", topp: "#7b4f8e", kjole: true },
    bestefar: { hud: "#8d5524", har: "#d9d9d9", stil: "skallet", topp: "#7a5a3a", skjegg: true }
  };
  function figur(type, uttr, cx) {
    const f = FIG[type]; if (!f) return "";
    const fy = 296, hy = 178, r = 24;
    let s = "";
    // Bein og kropp
    if (f.kjole) s += '<path d="M' + (cx - 30) + " " + (fy - 30) + " L" + (cx - 16) + " " + (hy + 26) + " L" + (cx + 16) + " " + (hy + 26) + " L" + (cx + 30) + " " + (fy - 30) + ' Z" fill="' + f.topp + '" stroke="#222" stroke-width="2"/><rect x="' + (cx - 14) + '" y="' + (fy - 30) + '" width="8" height="28" fill="' + f.hud + '"/><rect x="' + (cx + 6) + '" y="' + (fy - 30) + '" width="8" height="28" fill="' + f.hud + '"/>';
    else s += '<rect x="' + (cx - 16) + '" y="' + (fy - 50) + '" width="14" height="48" fill="#3d3d4a" stroke="#222" stroke-width="2"/><rect x="' + (cx + 2) + '" y="' + (fy - 50) + '" width="14" height="48" fill="#3d3d4a" stroke="#222" stroke-width="2"/><rect x="' + (cx - 20) + '" y="' + (hy + 24) + '" width="40" height="' + (fy - 50 - hy - 22) + '" rx="8" fill="' + f.topp + '" stroke="#222" stroke-width="2"/>';
    s += '<ellipse cx="' + (cx - 10) + '" cy="' + fy + '" rx="10" ry="4" fill="#222"/><ellipse cx="' + (cx + 10) + '" cy="' + fy + '" rx="10" ry="4" fill="#222"/>';
    // Armer
    s += '<path d="M' + (cx - 18) + " " + (hy + 34) + " L" + (cx - 34) + " " + (hy + 70) + '" stroke="' + f.topp + '" stroke-width="9" stroke-linecap="round"/><path d="M' + (cx + 18) + " " + (hy + 34) + " L" + (cx + 34) + " " + (hy + 70) + '" stroke="' + f.topp + '" stroke-width="9" stroke-linecap="round"/><circle cx="' + (cx - 35) + '" cy="' + (hy + 73) + '" r="5" fill="' + f.hud + '"/><circle cx="' + (cx + 35) + '" cy="' + (hy + 73) + '" r="5" fill="' + f.hud + '"/>';
    if (f.slips) s += '<path d="M' + cx + " " + (hy + 26) + " l-4 6 l4 22 l4 -22 z" + '" fill="#b23a2e"/>';
    if (f.hette) s += '<path d="M' + (cx - 26) + " " + (hy + 6) + " Q" + cx + " " + (hy + 40) + " " + (cx + 26) + " " + (hy + 6) + '" fill="none" stroke="' + f.topp + '" stroke-width="7"/>';
    // Hår bak
    if (f.stil === "langt") s += '<path d="M' + (cx - r - 4) + " " + (hy - 4) + " Q" + (cx - r - 8) + " " + (hy + 34) + " " + (cx - 12) + " " + (hy + 30) + " L" + (cx + 12) + " " + (hy + 30) + " Q" + (cx + r + 8) + " " + (hy + 34) + " " + (cx + r + 4) + " " + (hy - 4) + ' Z" fill="' + f.har + '"/>';
    // Hode
    s += '<circle cx="' + cx + '" cy="' + hy + '" r="' + r + '" fill="' + f.hud + '" stroke="#222" stroke-width="2"/>';
    // Hår foran
    if (f.stil === "kort" || f.stil === "langt") s += '<path d="M' + (cx - r) + " " + (hy - 2) + " Q" + cx + " " + (hy - r - 16) + " " + (cx + r) + " " + (hy - 2) + " Q" + cx + " " + (hy - r + 4) + " " + (cx - r) + " " + (hy - 2) + ' Z" fill="' + f.har + '"/>';
    if (f.stil === "knute") s += '<circle cx="' + cx + '" cy="' + (hy - r - 4) + '" r="9" fill="' + f.har + '"/><path d="M' + (cx - r) + " " + (hy - 2) + " Q" + cx + " " + (hy - r - 12) + " " + (cx + r) + " " + (hy - 2) + " Q" + cx + " " + (hy - r + 6) + " " + (cx - r) + " " + (hy - 2) + ' Z" fill="' + f.har + '"/>';
    if (f.stil === "skallet") s += '<path d="M' + (cx - r + 1) + " " + (hy + 2) + " q-4 -14 6 -18" + '" fill="none" stroke="' + f.har + '" stroke-width="6"/><path d="M' + (cx + r - 1) + " " + (hy + 2) + " q4 -14 -6 -18" + '" fill="none" stroke="' + f.har + '" stroke-width="6"/>';
    if (f.skjegg) s += '<path d="M' + (cx - 16) + " " + (hy + 10) + " Q" + cx + " " + (hy + 36) + " " + (cx + 16) + " " + (hy + 10) + " Q" + cx + " " + (hy + 22) + " " + (cx - 16) + " " + (hy + 10) + ' Z" fill="' + f.har + '"/>';
    // Hatter
    if (f.hatt === "vid") s += '<ellipse cx="' + cx + '" cy="' + (hy - 16) + '" rx="40" ry="8" fill="#5a2a3a"/><path d="M' + (cx - 20) + " " + (hy - 16) + " Q" + cx + " " + (hy - 50) + " " + (cx + 20) + " " + (hy - 16) + ' Z" fill="#5a2a3a"/>';
    if (f.hatt === "caps") s += '<path d="M' + (cx - 26) + " " + (hy - 8) + " Q" + cx + " " + (hy - 40) + " " + (cx + 26) + " " + (hy - 8) + ' Z" fill="#6b5a45"/><path d="M' + (cx + 4) + " " + (hy - 9) + " L" + (cx + 34) + " " + (hy - 4) + '" stroke="#4a3e30" stroke-width="5" stroke-linecap="round"/>';
    if (f.hatt === "hjelm") s += '<path d="M' + (cx - 30) + " " + (hy - 4) + " Q" + cx + " " + (hy - 52) + " " + (cx + 30) + " " + (hy - 4) + ' Z" fill="#4b5a30" stroke="#222" stroke-width="2"/>';
    // Ansikt
    const oy = hy - 2, my = hy + 11;
    if (uttr === "sint") s += '<path d="M' + (cx - 14) + " " + (oy - 9) + " l9 4 M" + (cx + 14) + " " + (oy - 9) + " l-9 4" + '" stroke="#222" stroke-width="2.5"/>';
    if (uttr === "trist") s += '<path d="M' + (cx - 14) + " " + (oy - 5) + " l9 -4 M" + (cx + 14) + " " + (oy - 5) + " l-9 -4" + '" stroke="#222" stroke-width="2"/>';
    s += uttr === "overrasket" ? '<circle cx="' + (cx - 8) + '" cy="' + oy + '" r="4" fill="#fff" stroke="#222" stroke-width="2"/><circle cx="' + (cx + 8) + '" cy="' + oy + '" r="4" fill="#fff" stroke="#222" stroke-width="2"/>' : '<circle cx="' + (cx - 8) + '" cy="' + oy + '" r="2.8" fill="#222"/><circle cx="' + (cx + 8) + '" cy="' + oy + '" r="2.8" fill="#222"/>';
    const munn = { glad: "M" + (cx - 9) + " " + my + " Q" + cx + " " + (my + 8) + " " + (cx + 9) + " " + my, noytral: "M" + (cx - 7) + " " + (my + 2) + " L" + (cx + 7) + " " + (my + 2), trist: "M" + (cx - 9) + " " + (my + 5) + " Q" + cx + " " + (my - 3) + " " + (cx + 9) + " " + (my + 5), sint: "M" + (cx - 9) + " " + (my + 4) + " Q" + cx + " " + (my - 2) + " " + (cx + 9) + " " + (my + 4) }[uttr];
    if (uttr === "overrasket") s += '<ellipse cx="' + cx + '" cy="' + (my + 2) + '" rx="5" ry="6" fill="#5a1d1d"/>';
    else s += '<path d="' + munn + '" fill="none" stroke="#222" stroke-width="2.5" stroke-linecap="round"/>';
    return "<g>" + s + "</g>";
  }
  function boble(b, i, rute, topp, stablet, delt) {
    const tekst = b.x.trim(); if (!tekst) return "";
    const maks = stablet ? 3 : 4, tegn = delt ? 18 : 21;
    let linjer = bryt(tekst, tegn);
    if (linjer.length > maks) { linjer = linjer.slice(0, maks); linjer[maks - 1] = linjer[maks - 1].replace(/\s*\S*$/, "") + " …"; }
    const bw = Math.max(70, Math.min(delt ? 186 : 190, Math.max(...linjer.map(l => l.length)) * 8.4 + 22)), bh = linjer.length * 17 + 14;
    const sx = b.w === 0 ? 110 : 290;
    const min = delt && b.w === 1 ? 207 : 6, max = delt && b.w === 0 ? 193 - bw : W - bw - 6;
    let bx = Math.min(max, Math.max(min, sx - bw / 2 + (b.w === 0 ? 20 : -20)));
    let by = topp;
    const tx = sx, ty = 148, fx = Math.min(bx + bw - 20, Math.max(bx + 20, sx));
    const harFig = !!rute.f[b.w].t;
    let s = "";
    if (b.k === "tanke") {
      s += '<rect x="' + bx + '" y="' + by + '" width="' + bw + '" height="' + bh + '" rx="' + Math.min(22, bh / 2) + '" fill="#fff" stroke="#222" stroke-width="2.5" stroke-dasharray="7 4"/>';
      if (harFig) s += '<circle cx="' + (fx + (tx - fx) * .35) + '" cy="' + (by + bh + 10) + '" r="6" fill="#fff" stroke="#222" stroke-width="2"/><circle cx="' + (fx + (tx - fx) * .6) + '" cy="' + (by + bh + 24) + '" r="4" fill="#fff" stroke="#222" stroke-width="2"/>';
    } else {
      const rop = b.k === "rop";
      if (harFig) s += '<path d="M' + (fx - 10) + " " + (by + bh - 2) + " L" + (tx + (b.w === 0 ? 4 : -4)) + " " + Math.max(by + bh + 14, ty) + " L" + (fx + 10) + " " + (by + bh - 2) + ' Z" fill="#fff" stroke="#222" stroke-width="' + (rop ? 3.5 : 2.5) + '" stroke-linejoin="round"/>';
      s += '<rect x="' + bx + '" y="' + by + '" width="' + bw + '" height="' + bh + '" rx="' + (rop ? 3 : 14) + '" fill="#fff" stroke="#222" stroke-width="' + (rop ? 4 : 2.5) + '"/>';
      if (harFig) s += '<rect x="' + (fx - 8) + '" y="' + (by + bh - 5) + '" width="16" height="6" fill="#fff"/>';
    }
    s += '<text font-family="' + FONT + '" font-size="15" fill="#111"' + (b.k === "rop" ? ' font-weight="bold"' : "") + ">" + linjer.map((l, n) => '<tspan x="' + (bx + bw / 2) + '" y="' + (by + 22 + n * 17) + '" text-anchor="middle">' + X(l) + "</tspan>").join("") + "</text>";
    return { svg: s, bunn: by + bh };
  }
  function ruteSvg(rute, nr) {
    let s = '<clipPath id="ts-k' + nr + '"><rect width="400" height="300"/></clipPath><g clip-path="url(#ts-k' + nr + ')">' + bakgrunn(rute.bg);
    s += figur(rute.f[0].t, rute.f[0].u, 110) + figur(rute.f[1].t, rute.f[1].u, 290);
    let topp = 8;
    if (rute.c.trim()) {
      const l = bryt(rute.c, 44).slice(0, 2), h = l.length * 17 + 10;
      s += '<rect x="0" y="0" width="400" height="' + h + '" fill="#fff4b8" stroke="#222" stroke-width="2"/><text font-family="' + FONT + '" font-size="14" fill="#111" font-style="italic">' + l.map((t, n) => '<tspan x="10" y="' + (18 + n * 17) + '">' + X(t) + "</tspan>").join("") + "</text>";
      topp = h + 8;
    }
    const aktive = rute.b.filter(b => b.x.trim());
    const stablet = aktive.length === 2 && aktive[0].w === aktive[1].w;
    const delt = aktive.length === 2 && !stablet;
    let neste = topp;
    rute.b.forEach((b, i) => {
      const t = stablet && i === 1 ? neste + 8 : topp;
      const r = boble(b, i, rute, t, stablet, delt);
      if (r) { s += r.svg; neste = r.bunn; }
    });
    return s + '</g><rect width="400" height="300" fill="none" stroke="#111" stroke-width="4"/>';
  }
  function tegnSvg(d) {
    const kol = d.lay === "4" ? 2 : 3, rader = d.lay === "3" ? 1 : 2;
    const bredde = kol * W + (kol + 1) * GAP, hoyde = TOPP + rader * H + (rader + 1) * GAP;
    let s = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + bredde + " " + hoyde + '" width="' + bredde + '" height="' + hoyde + '"><rect width="' + bredde + '" height="' + hoyde + '" fill="#ffffff"/>';
    s += '<text x="' + bredde / 2 + '" y="32" text-anchor="middle" font-family="' + FONT + '" font-size="26" font-weight="bold" fill="#111">' + X(d.ti.trim() || "Tegneserie") + "</text>";
    d.r.slice(0, +d.lay).forEach((r, i) => { const x = GAP + (i % kol) * (W + GAP), y = TOPP + GAP + Math.floor(i / kol) * (H + GAP); s += '<g transform="translate(' + x + " " + y + ')">' + ruteSvg(r, i) + "</g>"; });
    return s + "</svg>";
  }
  const navnPa = (liste, v) => (liste.find(x => x[0] === v) || ["", ""])[1];
  function tekstversjon(d) {
    return "<ol>" + d.r.slice(0, +d.lay).map(r => {
      const deler = [];
      if (r.c.trim()) deler.push("Fortellerboks: «" + esc(r.c.trim()) + "»");
      const fig = r.f.filter(f => f.t).map(f => navnPa(FIGURER, f.t).toLowerCase() + " (" + navnPa(UTTRYKK, f.u).toLowerCase() + ")");
      deler.push("Bakgrunn: " + navnPa(BAKGRUNNER, r.bg).toLowerCase() + (fig.length ? ". Figurer: " + fig.join(" og ") : ""));
      r.b.forEach(b => { if (b.x.trim()) deler.push((r.f[b.w].t ? navnPa(FIGURER, r.f[b.w].t) : (b.w ? "Høyre figur" : "Venstre figur")) + " " + navnPa(BOBLER, b.k).toLowerCase() + ": «" + esc(b.x.trim()) + "»"); });
      return "<li>" + deler.join(". ") + "</li>";
    }).join("") + "</ol>";
  }

  // ---------- Side ----------
  const opsjoner = (liste, v) => liste.map(([k, n]) => '<option value="' + k + '"' + (k === v ? " selected" : "") + ">" + esc(n) + "</option>").join("");
  async function start() {
    let d = (await dekod(location.hash.slice(1))) || rens({ lay: "4", r: [] });
    document.title = "Tegneseriemaker – " + (LV.config ? LV.config.navn : "Les verden");
    $("innhold").innerHTML = '<nav class="brodsmuler" aria-label="Brødsmuler"><a href="index.html">Forside</a> › <a href="spill.html">Spill</a> › Tegneseriemaker</nav>' +
      '<header class="sidehode"><p class="overlinje">Skapende arbeid</p><h1>💬 Tegneseriemaker</h1><p class="ingress">Fortell en historisk hendelse, forklar et begrep eller gjenfortell en novelle som tegneserie. Velg bakgrunn og figurer, og skriv snakkebobler og fortellerbokser. Tegneserien kan lastes ned som bilde, skrives ut eller deles som lenke.</p></header>' +
      '<details class="ts-ideer"><summary>💡 Ideer til tegneserier</summary><ul>' + IDEER.map(([t, b]) => "<li><strong>" + t + ":</strong> " + b + "</li>").join("") + '</ul><p><button type="button" class="knapp liten" id="ts-eksempel">Vis et eksempel</button></p></details>' +
      '<div class="ts-oppsett"><label class="lg-felt" for="ts-ti"><span>Tittel</span><input type="text" id="ts-ti" maxlength="60" autocomplete="off"></label><fieldset class="lg-sprak"><legend>Antall ruter</legend>' + [["3", "3"], ["4", "4"], ["6", "6"]].map(([v, n]) => '<label><input type="radio" name="ts-lay" value="' + v + '"> ' + n + "</label>").join("") + "</fieldset></div>" +
      '<div class="ts-arbeid"><div class="ts-ruter" id="ts-ruter"></div><div class="ts-forhand"><h2>Forhåndsvisning</h2><div class="ts-bilde" id="ts-bilde" role="img" aria-label="Tegneserien din. Se tekstversjonen under."></div>' +
      '<p class="ts-knapper"><button type="button" class="knapp hoved" id="ts-png">⬇️ Last ned som bilde (PNG)</button> <button type="button" class="knapp" id="ts-skriv">🖨️ Skriv ut</button> <button type="button" class="knapp" id="ts-kopier">🔗 Kopier lenke</button> <span class="lg-status" id="ts-status" role="status" aria-live="polite"></span></p>' +
      '<details class="ts-tekst"><summary>Tekstversjon av tegneserien</summary><div id="ts-tekstversjon"></div></details>' +
      '<p class="lg-merk">Lenken inneholder hele tegneserien, og adresselinja oppdateres mens du jobber. Ingenting lagres på nettstedet – kopier lenken eller last ned bildet før du lukker siden. Ikke skriv navn på ekte personer i klassen.</p></div></div>';

    function ruteHtml(r, i) {
      const p = "ts-" + i + "-";
      const fig = n => '<div class="ts-fig"><label for="' + p + "f" + n + '">' + (n ? "Figur til høyre" : "Figur til venstre") + '</label><select id="' + p + "f" + n + '" data-i="' + i + '" data-felt="f' + n + 't">' + opsjoner(FIGURER, r.f[n].t) + '</select><label class="skjult-visuelt" for="' + p + "u" + n + '">Uttrykk</label><select id="' + p + "u" + n + '" data-i="' + i + '" data-felt="f' + n + 'u" aria-label="Uttrykk, ' + (n ? "høyre" : "venstre") + ' figur">' + opsjoner(UTTRYKK, r.f[n].u) + "</select></div>";
      const bob = n => '<div class="ts-boble"><span class="ts-boble-navn">Boble ' + (n + 1) + '</span><label class="skjult-visuelt" for="' + p + "bw" + n + '">Hvem snakker i boble ' + (n + 1) + '</label><select id="' + p + "bw" + n + '" data-i="' + i + '" data-felt="b' + n + 'w"><option value="0"' + (r.b[n].w === 0 ? " selected" : "") + '>Venstre figur</option><option value="1"' + (r.b[n].w === 1 ? " selected" : "") + '>Høyre figur</option></select><label class="skjult-visuelt" for="' + p + "bk" + n + '">Type boble ' + (n + 1) + '</label><select id="' + p + "bk" + n + '" data-i="' + i + '" data-felt="b' + n + 'k">' + opsjoner(BOBLER, r.b[n].k) + '</select><label class="skjult-visuelt" for="' + p + "bx" + n + '">Tekst i boble ' + (n + 1) + '</label><input type="text" id="' + p + "bx" + n + '" data-i="' + i + '" data-felt="b' + n + 'x" maxlength="90" placeholder="Hva sier eller tenker figuren?" autocomplete="off"></div>';
      return '<fieldset class="ts-rute"><legend>Rute ' + (i + 1) + '</legend><div class="ts-rad"><label for="' + p + 'bg">Bakgrunn</label><select id="' + p + 'bg" data-i="' + i + '" data-felt="bg">' + opsjoner(BAKGRUNNER, r.bg) + "</select></div>" + fig(0) + fig(1) + bob(0) + bob(1) +
        '<div class="ts-rad ts-rad-bred"><label for="' + p + 'c">Fortellerboks</label><input type="text" id="' + p + 'c" data-i="' + i + '" data-felt="c" maxlength="80" placeholder="For eksempel: Neste morgen …" autocomplete="off"></div></fieldset>';
    }
    function tegnSkjema() {
      $("ts-ruter").innerHTML = d.r.slice(0, +d.lay).map(ruteHtml).join("");
      d.r.slice(0, +d.lay).forEach((r, i) => { $("ts-" + i + "-c").value = r.c; [0, 1].forEach(n => { $("ts-" + i + "-bx" + n).value = r.b[n].x; }); });
      $("ts-ti").value = d.ti;
      document.querySelector('input[name="ts-lay"][value="' + d.lay + '"]').checked = true;
    }
    let tid = null, svg = "";
    function forhand() {
      svg = tegnSvg(d);
      $("ts-bilde").innerHTML = svg;
      $("ts-tekstversjon").innerHTML = tekstversjon(d);
      clearTimeout(tid);
      tid = setTimeout(async () => { try { history.replaceState(null, "", "#" + await kod(d)); } catch (e) { /* ignorer */ } }, 400);
    }
    $("ts-ruter").addEventListener("input", e => {
      const el = e.target, i = +el.dataset.i, f = el.dataset.felt; if (isNaN(i) || !f) return;
      const r = d.r[i];
      if (f === "bg" || f === "c") r[f] = el.value;
      else if (f[0] === "f") r.f[+f[1]][f[2]] = el.value;
      else if (f[0] === "b") r.b[+f[1]][f[2]] = f[2] === "w" ? +el.value : el.value;
      forhand();
    });
    $("ts-ti").addEventListener("input", () => { d.ti = $("ts-ti").value; forhand(); });
    document.querySelectorAll('input[name="ts-lay"]').forEach(r => r.addEventListener("change", () => { d.lay = r.value; while (d.r.length < +d.lay) d.r.push(nyRute()); tegnSkjema(); forhand(); }));
    $("ts-eksempel").addEventListener("click", () => { d = rens(JSON.parse(JSON.stringify(EKSEMPEL))); tegnSkjema(); forhand(); $("ts-ti").focus(); });

    $("ts-png").addEventListener("click", () => {
      const img = new Image(), url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml;charset=utf-8" }));
      img.onload = () => {
        const c = document.createElement("canvas"), k = 2; c.width = img.width * k; c.height = img.height * k;
        const g = c.getContext("2d"); g.scale(k, k); g.drawImage(img, 0, 0); URL.revokeObjectURL(url);
        c.toBlob(b => { const a = document.createElement("a"); a.href = URL.createObjectURL(b); a.download = (d.ti.trim() || "tegneserie").replace(/[^\wæøåÆØÅ-]+/g, "-").toLowerCase() + ".png"; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 2000); $("ts-status").textContent = "✔ Bildet er lastet ned."; }, "image/png");
      };
      img.onerror = () => { $("ts-status").textContent = "Klarte ikke å lage bildet i denne nettleseren. Prøv «Skriv ut» og velg «Lagre som PDF»."; };
      img.src = url;
    });
    $("ts-skriv").addEventListener("click", () => window.print());
    $("ts-kopier").addEventListener("click", async () => {
      const lenke = location.href.split("#")[0] + "#" + await kod(d);
      try { await navigator.clipboard.writeText(lenke); $("ts-status").textContent = "✔ Lenken er kopiert."; }
      catch (e) { $("ts-status").textContent = "Kopier lenken fra adresselinja."; }
    });
    tegnSkjema();
    forhand();
  }
  document.addEventListener("DOMContentLoaded", start);
})();
