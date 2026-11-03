/* =========================================================
   Les verden – Kalde spor i historien + Cold Case Mysteries (logikkgåter i stil med «Murdle»)
   mysterium.html                              → oversikt
   mysterium.html?sak=<id>                     → historisk mysterium (data/mysterium/saker.js)
   mysterium.html?verden=<id>&niva=<n>&seed=<tall> → generert mysterium (samme seed = samme gåte)
   Ledetrådene er regler: ["med", A, B] / ["ikke", A, B]. Løseren prøver alle kombinasjoner.
   Ingenting lagres.
   ========================================================= */
(function () {
  const LV = window.LV;
  const $ = id => document.getElementById(id);
  const esc = s => LV.esc(String(s == null ? "" : s));
  const fmt = s => esc(s).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\*(.+?)\*/g, "<em>$1</em>");
  const stor = s => s.charAt(0).toUpperCase() + s.slice(1);

  const T = {
    nb: { ledetrader: "Ledetråder", rutenett: "Rutenett", rutenettTekst: "Trykk én gang for ✗ (umulig), to ganger for ✓ (riktig), tre ganger for å tømme ruten.", autoX: "Fyll ut ✗ automatisk når jeg setter ✓",
      sjekk: "Sjekk rutenettet", hint: "Gi meg et hint", fasit: "Vis løsningen", tom: "Tøm rutenettet", anklag: "Løs mysteriet", anklagKnapp: "Jeg har løst det!", velg: "– velg –",
      riktig: "Riktig! Du har løst mysteriet! 🎉", feilSvar: "Ikke helt. Se på ledetrådene en gang til.", feilRuter: "ruter er feil (markert med rødt)", ingenFeil: "Ingen feil så langt!", notater: "Notater", hvemErHvem: "Hvem er hvem?", visTips: "Vis tips",
      historien: "Historien bak", lesTema: "Les temaet", nyGate: "Nytt mysterium", alle: "Alle gåtene", sporsmal: "Spørsmålet", kopier: "Kopier resultatet", kopiert: "Kopiert!", hintBrukt: "hint brukt", tid: "Tid",
      personer: "Personer", gjenstander: "Gjenstander", steder: "Steder", motiv: "Motiver", innendors: "innendørs", utendors: "utendørs" },
    en: { ledetrader: "Clues", rutenett: "Deduction grid", rutenettTekst: "Tap once for ✗ (impossible), twice for ✓ (correct), three times to clear.", autoX: "Fill in ✗ automatically when I mark ✓",
      sjekk: "Check my grid", hint: "Give me a hint", fasit: "Show the solution", tom: "Clear the grid", anklag: "Solve the mystery", anklagKnapp: "I've solved it!", velg: "– choose –",
      riktig: "Correct! You solved the mystery! 🎉", feilSvar: "Not quite. Look at the clues again.", feilRuter: "squares are wrong (marked in red)", ingenFeil: "No mistakes so far!", notater: "Notes", hvemErHvem: "Who is who?", visTips: "Show hint",
      historien: "The real history", lesTema: "Read the topic", nyGate: "New mystery", alle: "All cases", sporsmal: "The question", kopier: "Copy the result", kopiert: "Copied!", hintBrukt: "hints used", tid: "Time",
      personer: "Suspects", gjenstander: "Items", steder: "Places", motiv: "Motives", innendors: "indoors", utendors: "outdoors" }
  };

  // ---------- Tilfeldige tall med frø (samme frø = samme gåte) ----------
  function rng(seed) {
    let a = seed >>> 0;
    return function () { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
  }
  const blandR = (a, r) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const velgR = (a, r) => a[Math.floor(r() * a.length)];
  function perms(n) {
    const ut = []; const a = [...Array(n).keys()];
    (function p(k) { if (k === n) { ut.push(a.slice()); return; } for (let i = k; i < n; i++) { [a[k], a[i]] = [a[i], a[k]]; p(k + 1); [a[k], a[i]] = [a[i], a[k]]; } })(0);
    return ut;
  }

  // ---------- Løser ----------
  // En løsning er en liste med permutasjoner: sol[c-1][person] = element i kategori c.
  function alleLosninger(k, n) {
    const P = perms(n);
    let comb = [[]];
    for (let c = 1; c < k; c++) { const ny = []; comb.forEach(x => P.forEach(p => ny.push(x.concat([p])))); comb = ny; }
    return comb;
  }
  function lagOppslag(kat) { const idx = {}; kat.forEach((k, ci) => k.elementer.forEach((e, ei) => { idx[k.id + ":" + e.id] = [ci, ei]; })); return idx; }
  function personFor(sol, idx, nokkel) { const [c, e] = idx[nokkel]; return c === 0 ? e : sol[c - 1].indexOf(e); }
  function oppfyller(sol, idx, regel) {
    const [type, A, B] = regel;
    const pa = A.map(a => personFor(sol, idx, a)), pb = B.map(b => personFor(sol, idx, b));
    const treff = pa.some(x => pb.includes(x));
    return type === "med" ? treff : !treff;
  }

  // ---------- Generator ----------
  const ATTR = {
    p: { hoyde: { tall: ["tall", ""], short: ["short", ""] }, oyne: { blue: ["", "with blue eyes"], brown: ["", "with brown eyes"], green: ["", "with green eyes"], grey: ["", "with grey eyes"] },
         har: { dark: ["", "with dark hair"], fair: ["", "with fair hair"], red: ["", "with red hair"], grey: ["", "with grey hair"] }, hand: { left: ["left-handed", ""], right: ["right-handed", ""] } },
    t: { vekt: { light: ["light", ""], medium: ["medium-weight", ""], heavy: ["heavy", ""] }, materiale: { metal: ["", "made of metal"], wood: ["", "made of wood"], glass: ["", "made of glass"], cloth: ["", "made of cloth"], paper: ["", "made of paper"], stone: ["", "made of stone"], plastic: ["", "made of plastic"] } },
    s: { ute: { true: ["", "outdoors"], false: ["", "indoors"] } }
  };
  const artikkel = ord => (/^[aeiou]/i.test(ord) ? "an " : "a ") + ord;

  function generer(verden, niva, seed) {
    const r = rng(seed);
    const n = niva.n;
    const personer = blandR(verden.personer, r).slice(0, n);
    const ting = blandR(verden.ting, r).slice(0, n);
    const steder = blandR(verden.steder, r).slice(0, n);
    const kat = [
      { id: "p", navn: "Suspects", elementer: personer },
      { id: "t", navn: stor(verden.tingOrdFlertall), elementer: ting },
      { id: "s", navn: "Places", elementer: steder }
    ];
    if (niva.motiv) kat.push({ id: "m", navn: "Motives", elementer: blandR(LV.mysteriumMotiver, r).slice(0, n) });
    const k = kat.length, idx = lagOppslag(kat);
    const sol = kat.slice(1).map(() => blandR([...Array(n).keys()], r));
    const partner = (c1, e1, c2) => { const p = c1 === 0 ? e1 : sol[c1 - 1].indexOf(e1); return c2 === 0 ? p : sol[c2 - 1][p]; };
    const navnPa = (c, e) => kat[c].elementer[e].navn;
    const tingOrd = verden.tingOrd;

    // Beskrivelse av et sett ut fra en egenskap
    function settFraser(c, attr, val) {
      const [for_, etter] = ATTR[kat[c].id][attr][String(val)];
      const noun = c === 0 ? "suspect" : c === 1 ? tingOrd : "place";
      const np = (for_ ? for_ + " " : "") + noun + (etter ? " " + etter : "");
      return { ubest: artikkel(np), best: "the " + np, ingen: "no " + np, sted: etter };
    }
    // Tekst for en ledetråd. A og B er {c, ids, attr?, val?}
    function tekst(type, A, B) {
      const enkel = X => X.ids.length === 1 && !X.attr;
      const fraseA = () => A.attr ? (A.ids.length === 1 ? settFraser(A.c, A.attr, A.val).best : settFraser(A.c, A.attr, A.val).ubest) : navnPa(A.c, A.ids[0]);
      const fraseB = () => {
        if (B.attr) return B.ids.length === 1 ? settFraser(B.c, B.attr, B.val).best : settFraser(B.c, B.attr, B.val).ubest;
        if (B.ids.length === 2) return "either " + navnPa(B.c, B.ids[0]) + " or " + navnPa(B.c, B.ids[1]);
        return navnPa(B.c, B.ids[0]);
      };
      const neg = type === "ikke";
      const ingenA = neg && A.attr && A.ids.length > 1;
      const subj = ingenA ? stor(settFraser(A.c, A.attr, A.val).ingen) : stor(fraseA());
      const ca = kat[A.c].id, cb = kat[B.c].id;
      const sted = cb === "s" && B.attr; // «outdoors / indoors»
      if (sted) { const ute = String(B.val) === "true"; const ord = (neg ? !ute : ute) ? "outdoors" : "indoors"; return subj + (ca === "p" ? " was " : ca === "t" ? " was " : " was ") + ord + "."; }
      const either = !B.attr && B.ids.length === 2;
      if (ca === "p" && cb === "t") return subj + (ingenA ? " had " : neg ? " did not have " : " had ") + fraseB() + ".";
      if (ca === "p" && cb === "s") return subj + (ingenA ? " was in " : neg ? " was not in " : either ? " was in " : " was in ") + fraseB().replace(/^either (.+) or (.+)$/, "either $1 or $2") + ".";
      if (ca === "t" && cb === "s") return subj + (ingenA ? " was in " : neg ? " was not in " : " was in ") + fraseB() + ".";
      if (ca === "p" && cb === "m") return subj + (ingenA ? " had the motive of " : neg ? " did not have the motive of " : " had the motive of ") + fraseB() + ".";
      if (ca === "t" && cb === "m") return (ingenA ? "Nobody with " + settFraser(A.c, A.attr, A.val).ubest : "The person with " + fraseA()) + (neg && !ingenA ? " did not have the motive of " : " had the motive of ") + fraseB() + ".";
      if (ca === "s" && cb === "m") {
        if (A.attr) { const ord = settFraser(A.c, A.attr, A.val).sted; return (A.ids.length > 1 ? (neg ? "Nobody " : "Someone ") : (neg ? "The person " : "The person ")) + ord + (neg && A.ids.length === 1 ? " did not have the motive of " : " had the motive of ") + fraseB() + "."; }
        return "The person in " + fraseA() + (neg ? " did not have the motive of " : " had the motive of ") + fraseB() + ".";
      }
      return subj + " – " + fraseB();
    }
    const nok = (c, ids) => ids.map(i => kat[c].id + ":" + kat[c].elementer[i].id);
    function attrSett(c, e, sannFor) {
      // alle egenskaper til element e, med settet av elementer som deler verdien
      const def = ATTR[kat[c].id]; if (!def) return [];
      return Object.keys(def).map(a => {
        const v = kat[c].elementer[e][a];
        const ids = kat[c].elementer.map((x, i) => x[a] === v ? i : -1).filter(i => i >= 0);
        return { c: c, ids: ids, attr: a, val: v };
      }).filter(x => x.ids.length < n);
    }
    const vekter = { easy: [5, 3, 1, 1, 0, 1], medium: [1, 3, 3, 2, 1, 2], hard: [0.3, 2, 4, 3, 2, 3], expert: [0.3, 3, 4, 3, 2, 3], master: [0.5, 2, 3, 3, 1, 2] }[niva.id];
    const kandidater = []; const sett = new Set();
    function legg(type, A, B) {
      const regel = [type, nok(A.c, A.ids), nok(B.c, B.ids)];
      const key = JSON.stringify(regel) + (A.attr || "") + (B.attr || "");
      if (sett.has(key)) return; sett.add(key);
      kandidater.push({ regel: regel, tekst: tekst(type, A, B) });
    }
    for (let forsok = 0; forsok < 900 && kandidater.length < 260; forsok++) {
      let ca = Math.floor(r() * k), cb = Math.floor(r() * k);
      if (ca === cb) continue;
      if (ca > cb) [ca, cb] = [cb, ca];
      const x = Math.floor(r() * n), y = partner(ca, x, cb);
      const z = velgR([...Array(n).keys()].filter(i => i !== y), r);
      const type = (() => { const sum = vekter.reduce((a, b) => a + b, 0); let t = r() * sum; for (let i = 0; i < vekter.length; i++) { t -= vekter[i]; if (t < 0) return i; } return 0; })();
      if (type === 0) legg("med", { c: ca, ids: [x] }, { c: cb, ids: [y] });
      else if (type === 1) legg("ikke", { c: ca, ids: [x] }, { c: cb, ids: [z] });
      else if (type === 2) { const s = velgR(attrSett(ca, x), r); if (s) legg("med", s, { c: cb, ids: [y] }); }
      else if (type === 3) { const s = velgR(attrSett(ca, x), r); if (s && !s.ids.some(i => partner(ca, i, cb) === z)) legg("ikke", s, { c: cb, ids: [z] }); }
      else if (type === 4) { const par = blandR([y, z], r); legg("med", { c: ca, ids: [x] }, { c: cb, ids: par }); }
      else if (type === 5) { if (kat[cb].id !== "m") { const s = velgR(attrSett(cb, y), r); if (s) legg("med", { c: ca, ids: [x] }, s); } }
    }
    // Mester-nivå: den skyldige lyver. Velg skyldig og lag utsagn først.
    const idxG = lagOppslag(kat);
    let skyldig = Math.floor(r() * n);
    const viaTing = niva.id === "hard" || niva.id === "expert";
    const svarElementFor = p => viaTing ? "t:" + ting[sol[0][p]].id : "s:" + steder[sol[1][p]].id;
    let utsagn = null;
    if (niva.logn) {
      utsagn = personer.map((pp, i) => {
        if (i !== skyldig) {
          const sanne = kandidater.filter(kd => !kd.regel[1].concat(kd.regel[2]).includes("p:" + pp.id) || r() < 0.3);
          const kd = velgR(sanne.length ? sanne : kandidater, r);
          return { person: "p:" + pp.id, tekst: kd.tekst, regel: kd.regel };
        }
        // Løgn: et par som ikke hører sammen, sagt som om det gjorde det
        for (let f = 0; f < 50; f++) {
          let ca = Math.floor(r() * k), cb = Math.floor(r() * k); if (ca === cb) continue; if (ca > cb) [ca, cb] = [cb, ca];
          const x = Math.floor(r() * n), y = partner(ca, x, cb), z = velgR([...Array(n).keys()].filter(j => j !== y), r);
          if (ca === 0 && x === i) continue;
          return { person: "p:" + pp.id, tekst: tekst("med", { c: ca, ids: [x] }, { c: cb, ids: [z] }), regel: ["med", nok(ca, [x]), nok(cb, [z])] };
        }
      });
      utsagn.forEach(u => { const navn = kat[0].elementer.find(e => "p:" + e.id === u.person).navn; if (u.tekst.startsWith(navn + " ")) u.tekst = "I " + u.tekst.slice(navn.length + 1); });
    }
    const svarEl = svarElementFor(skyldig);
    const oppfyllerUtsagn = s => !utsagn || utsagn.every(u => oppfyller(s, idxG, u.regel) === (personFor(s, idxG, u.person) !== personFor(s, idxG, svarEl)));
    // Legg til ledetråder til det bare finnes én løsning
    let mulige = alleLosninger(k, n).filter(oppfyllerUtsagn);
    const valgt = [];
    for (const kand of blandR(kandidater, r)) {
      const igjen = mulige.filter(s => oppfyller(s, idxG, kand.regel));
      if (igjen.length < mulige.length) { valgt.push(kand); mulige = igjen; }
      if (mulige.length === 1) break;
    }
    // Reserve: direkte ledetråder hvis det fortsatt finnes flere løsninger
    for (let p = 0; p < n && mulige.length > 1; p++) for (let c = 1; c < k && mulige.length > 1; c++) {
      const kand = { regel: ["med", nok(0, [p]), nok(c, [sol[c - 1][p]])], tekst: tekst("med", { c: 0, ids: [p] }, { c: c, ids: [sol[c - 1][p]] }) };
      const igjen = mulige.filter(s => oppfyller(s, idxG, kand.regel)); if (igjen.length < mulige.length) { valgt.push(kand); mulige = igjen; }
    }
    // Fjern overflødige ledetråder
    const alle = alleLosninger(k, n).filter(oppfyllerUtsagn);
    for (const kand of blandR(valgt.slice(), r)) {
      const uten = valgt.filter(v => v !== kand);
      if (alle.filter(s => uten.every(v => oppfyller(s, idxG, v.regel))).length === 1) valgt.splice(valgt.indexOf(kand), 1);
    }
    // Hvem gjorde det?
    const svarElement = svarEl;
    const svarTekst = viaTing ? verden.svarTekst.ting.replace("{ting}", ting[sol[0][skyldig]].navn) : verden.svarTekst.sted.replace("{sted}", steder[sol[1][skyldig]].navn);
    const losning = {};
    personer.forEach((p, i) => { losning[p.id] = {}; kat.slice(1).forEach((kk, c) => { losning[p.id][kk.id] = kk.elementer[sol[c][i]].id; }); });
    return {
      id: "gen", generert: true, tittel: verden.tittel, ikon: verden.ikon, sprak: "en", niva: niva.id, intro: verden.intro + (niva.motiv ? " And each of them had a different motive." : ""),
      sporsmal: verden.sporsmal.replace("?", niva.motiv ? " – and why?" : "?"), kategorier: kat, ledetrader: blandR(valgt, r), utsagn: utsagn, svar: { tekst: svarTekst, element: svarElement }, losning: losning
    };
  }

  // ---------- Oversikt ----------
  function oversikt() {
    document.title = "Kalde spor i historien – " + (LV.config ? LV.config.navn : "Les verden");
    const nivaNavn = id => { const n = LV.mysteriumNivaer.find(x => x.id === id); return n ? n.ikon + " " + n.norsk : id; };
    $("innhold").innerHTML = '<nav class="brodsmuler" aria-label="Brødsmuler"><a href="index.html">Forside</a> › <a href="spill.html">Spill</a> › Kalde spor</nav>' +
      '<header class="sidehode"><h1>🕵️ Kalde spor i historien</h1><p class="ingress">Logikkgåter for detektiver: Les ledetrådene, kryss av i rutenettet og finn ut hvem, med hva og hvor. Alle gåtene har nøyaktig én riktig løsning. Prøv også <a href="#cold-case">Cold Case Mysteries</a> – nye gåter på engelsk hver gang!</p></header>' +
      '<section class="my-seksjon"><h2>📜 Historiske saker</h2><p>Ekte personer fra historien – men oppdiktede gåter. For å løse dem må du vite (eller finne ut) hvem personene var. Bruk temaene på siden!</p><ul class="my-saker">' +
      LV.mysteriumSaker.map(s => '<li><a class="my-sak" href="mysterium.html?sak=' + s.id + '"' + (s.sprak === "en" ? ' lang="en"' : "") + '><span class="my-sak-ikon" aria-hidden="true">' + s.ikon + "</span><strong>" + esc(s.tittel) + '</strong><span class="my-sak-info" lang="nb">' + nivaNavn(s.niva) + " · " +
        (s.sprak === "en" ? "Engelsk" : "Norsk") + " · " + s.kategorier[0].elementer.length + " personer" + (s.kategorier.length > 3 ? " + motiv" : "") + (s.utsagn ? " · 🎭 én lyver" : "") + "</span></a></li>").join("") + "</ul></section>" +
      '<section class="my-seksjon my-gen" id="cold-case" lang="en"><h2>🗂️ Cold Case Mysteries</h2><p>A new case every time! Choose a world and a level, and the generator makes a puzzle with exactly one solution. Share the link to give the whole class the same mystery.</p>' +
      '<div class="my-velg"><fieldset><legend>World</legend><div class="my-valg">' + LV.mysteriumVerdener.map((v, i) => '<label class="my-radio"><input type="radio" name="verden" value="' + v.id + '"' + (i === 0 ? " checked" : "") + '> <span aria-hidden="true">' + v.ikon + "</span> " + esc(v.tittel) + "</label>").join("") +
      '<label class="my-radio"><input type="radio" name="verden" value="random"> <span aria-hidden="true">🎲</span> Surprise me!</label></div></fieldset>' +
      '<fieldset><legend>Level</legend><div class="my-valg">' + LV.mysteriumNivaer.map((n, i) => '<label class="my-radio"><input type="radio" name="niva" value="' + n.id + '"' + (i === 1 ? " checked" : "") + '> <span aria-hidden="true">' + n.ikon + "</span> <strong>" + n.navn + "</strong> <small>" + esc(n.beskrivelse) + "</small></label>").join("") + "</div></fieldset></div>" +
      '<button class="knapp hoved" id="my-lag">🎲 Create a mystery</button></section>' +
      '<details class="my-hjelp" lang="nb"><summary>Slik løser du et mysterium</summary><ol><li>Les historien og spørsmålet.</li><li>Se på personene, gjenstandene og stedene. Legg merke til egenskapene (høyde, øyne, materiale, inne/ute …).</li><li>Les én ledetråd om gangen. Sett ✗ i rutenettet der noe er umulig, og ✓ der du vet at noe stemmer.</li><li>Hver person har nøyaktig én gjenstand og ett sted. Når du har satt ✓, kan resten av raden og kolonnen få ✗.</li><li>Når rutenettet er fylt ut, bruker du den siste opplysningen til å finne ut hvem det var.</li><li><strong>Mester-gåter (🎭):</strong> Alle de mistenkte kommer med et utsagn, og den skyldige lyver. Tips: Prøv én mistenkt om gangen. Hvis han eller hun er den skyldige, er utsagnet falskt og alle de andre sanne. Går det opp?</li></ol></details>';
    $("my-lag").addEventListener("click", () => {
      let v = document.querySelector('input[name="verden"]:checked').value;
      if (v === "random") v = LV.mysteriumVerdener[Math.floor(Math.random() * LV.mysteriumVerdener.length)].id;
      const n = document.querySelector('input[name="niva"]:checked').value;
      location.href = "mysterium.html?verden=" + v + "&niva=" + n + "&seed=" + (Math.floor(Math.random() * 900000) + 100000);
    });
  }

  // ---------- Spill ----------
  function spill(gate) {
    const t = T[gate.sprak === "en" ? "en" : "nb"];
    const kat = gate.kategorier, k = kat.length, n = kat[0].elementer.length;
    const idx = lagOppslag(kat);
    const katNavn = { p: t.personer, t: t.gjenstander, s: t.steder, m: t.motiv };
    // Fasit: hvilke par hører sammen?
    const sammen = (a, b) => {
      const [ca, ea] = idx[a], [cb, eb] = idx[b];
      const person = (c, e) => c === 0 ? kat[0].elementer[e].id : Object.keys(gate.losning).find(p => gate.losning[p][kat[c].id] === kat[c].elementer[e].id);
      return person(ca, ea) === person(cb, eb);
    };
    const skyldig = Object.keys(gate.losning).find(p => { const [c, e] = idx[gate.svar.element]; return c === 0 ? kat[0].elementer[e].id === p : gate.losning[p][kat[c].id] === kat[c].elementer[e].id; });
    const tema = gate.tema && LV.temaer ? LV.temaer.find(x => x.id === gate.tema) : null;
    const niva = LV.mysteriumNivaer.find(x => x.id === gate.niva);
    let hint = 0, start = Date.now(), losst = false;
    const tilstand = {};
    const parNokkel = (a, b) => idx[a][0] < idx[b][0] ? a + "|" + b : b + "|" + a;

    // Kort for alle elementene
    const egenskaper = (c, e) => {
      if (!gate.generert) return e.info ? '<span class="my-egen">' + esc(e.info) + "</span>" : "";
      const id = kat[c].id;
      if (id === "p") return '<span class="my-egen">' + [e.hoyde, e.oyne + " eyes", e.har + " hair", e.hand + "-handed"].map(esc).join(" · ") + "</span>" + (e.info ? '<span class="my-info">' + esc(e.info) + "</span>" : "");
      if (id === "t") return '<span class="my-egen">' + esc(e.vekt + " · " + e.materiale) + "</span>";
      if (id === "s") return '<span class="my-egen">' + (e.ute ? "🌤️ " + t.utendors : "🏠 " + t.innendors) + "</span>";
      if (id === "m") return e.tekst ? '<span class="my-egen">' + esc(e.tekst) + "</span>" : "";
      return "";
    };
    let h = '<nav class="brodsmuler" aria-label="Brødsmuler" lang="nb"><a href="index.html">Forside</a> › <a href="spill.html">Spill</a> › <a href="mysterium.html' + (gate.generert ? "#cold-case" : "") + '">' + (gate.generert ? "Cold Case Mysteries" : "Kalde spor") + '</a> › ' + esc(gate.tittel) + "</nav>" +
      '<div' + (gate.sprak === "en" ? ' lang="en"' : "") + '><header class="sidehode my-hode"><p class="overlinje">' + (niva ? niva.ikon + " " + (gate.sprak === "en" ? niva.navn : niva.norsk) : "") + (gate.generert ? " · Seed " + LV.param("seed") : "") + "</p><h1>" + gate.ikon + " " + esc(gate.tittel) + '</h1><p class="ingress">' + fmt(gate.intro) + "</p>" +
      '<p class="my-sporsmal"><strong>' + t.sporsmal + ":</strong> " + esc(gate.sporsmal) + "</p>" + (tema ? '<p class="my-tema" lang="nb">📖 ' + t.lesTema + ': <a href="tema.html?id=' + tema.id + '" target="_blank" rel="noopener">' + esc(tema.tittel) + "</a></p>" : "") + "</header>";
    h += '<section class="my-kortseksjon">' + kat.map((kk, c) => '<div class="my-kategori"><h2>' + esc(kk.navn || katNavn[kk.id]) + '</h2><ul class="my-kort">' + kk.elementer.map((e, ei) =>
      '<li class="my-element kat-' + kk.id + '"><span class="my-ikon" aria-hidden="true">' + e.ikon + "</span><span><strong>" + esc(stor(e.navn)) + "</strong>" + egenskaper(c, e) +
      (e.hint ? '<button type="button" class="my-tipsknapp" data-tips="' + c + "-" + ei + '">💡 ' + t.visTips + '</button><span class="my-tips" id="tips-' + c + "-" + ei + '" hidden>' + esc(e.hint) + "</span>" : "") + "</span></li>").join("") + "</ul></div>").join("") + "</section>";
    h += '<div class="my-arbeid"><section class="my-ledetrader"><h2>🔎 ' + t.ledetrader + '</h2><ol id="my-ledetrader">' + gate.ledetrader.map((l, i) => '<li><button type="button" class="my-led" data-i="' + i + '" aria-pressed="false">' + fmt(l.tekst) + "</button></li>").join("") +
      "</ol>" + (gate.utsagn ? '<div class="my-utsagn"><h3>🗣️ ' + (gate.sprak === "en" ? "Statements" : "Utsagn") + '</h3><p class="my-loggregel">' + (gate.sprak === "en" ? "The guilty one is lying. Everyone else tells the truth." : "Den skyldige lyver. Alle de andre snakker sant.") + "</p><ul>" +
        gate.utsagn.map(u => { const e = kat[0].elementer.find(x => "p:" + x.id === u.person); return '<li><span class="my-taler"><span aria-hidden="true">' + e.ikon + "</span> " + esc(e.navn) + ':</span> <q>' + fmt(u.tekst) + "</q></li>"; }).join("") + "</ul></div>" : "") +
      '<p class="my-svarledetrad"><strong>' + (gate.sprak === "en" ? "And finally:" : "Og til slutt:") + "</strong> " + esc(gate.svar.tekst) + '</p><label class="my-notatlabel" for="my-notat">' + t.notater + '</label><textarea id="my-notat" rows="3" class="svar"></textarea></section>' +
      '<section class="my-rutenett-seksjon"><h2>🧩 ' + t.rutenett + '</h2><p class="my-forklaring">' + t.rutenettTekst + '</p><label class="spill-sjekk"><input type="checkbox" id="my-auto" checked> ' + t.autoX + '</label><div class="my-rutenett-rull"><table class="my-rutenett" id="my-rutenett"></table></div>' +
      '<div class="spill-knapper"><button class="knapp" id="my-sjekk">✓ ' + t.sjekk + '</button><button class="knapp" id="my-hint">💡 ' + t.hint + '</button><button class="knapp" id="my-tom">↺ ' + t.tom + '</button></div><p id="my-status" class="my-status" aria-live="polite"></p></section></div>';
    h += '<section class="my-anklag"><h2>⚖️ ' + t.anklag + "</h2><p>" + esc(gate.sporsmal) + '</p><div class="my-anklag-valg">' + kat.map(kk => '<label>' + esc(kk.navn || katNavn[kk.id]) + '<select data-kat="' + kk.id + '"><option value="">' + t.velg + "</option>" +
      kk.elementer.map(e => '<option value="' + e.id + '">' + esc(stor(e.navn)) + "</option>").join("") + "</select></label>").join("") + '</div><div class="spill-knapper"><button class="knapp hoved" id="my-anklag">' + t.anklagKnapp + '</button><button class="knapp" id="my-fasit">' + t.fasit + "</button>" +
      (gate.generert ? '<a class="knapp" href="mysterium.html?verden=' + LV.param("verden") + "&niva=" + LV.param("niva") + "&seed=" + (Math.floor(Math.random() * 900000) + 100000) + '">🎲 ' + t.nyGate + "</a>" : "") + '<a class="knapp" href="mysterium.html">' + t.alle + '</a></div><div id="my-resultat" aria-live="polite"></div></section></div>';
    $("innhold").innerHTML = h;

    // Rutenett
    const kolKat = [...Array(k).keys()].slice(1);
    const radKat = [0].concat([...Array(k).keys()].slice(2).reverse());
    const kolFor = rc => rc === 0 ? kolKat : kolKat.filter(c => c < rc);
    const nk = (c, e) => kat[c].id + ":" + kat[c].elementer[e].id;
    let tab = '<thead><tr><td class="my-hjorne"></td>' + kolKat.map(c => '<th scope="colgroup" colspan="' + n + '" class="my-kathode">' + esc(kat[c].navn || katNavn[kat[c].id]) + "</th>").join("") + '</tr><tr><td class="my-hjorne"></td>' +
      kolKat.map(c => kat[c].elementer.map((e, ei) => '<th scope="col" class="my-kolhode' + (ei === 0 ? " blokkstart" : "") + '" title="' + esc(stor(e.navn)) + '"><span class="my-loddrett"><span aria-hidden="true">' + e.ikon + "</span> " + esc(kortNavn(e.navn)) + "</span></th>").join("")).join("") + "</tr></thead><tbody>";
    radKat.forEach((rc, ri) => {
      kat[rc].elementer.forEach((e, ei) => {
        tab += '<tr class="' + (ei === 0 && ri > 0 ? "blokktopp" : "") + '"><th scope="row" class="my-radhode"><span aria-hidden="true">' + e.ikon + "</span> " + esc(kortNavn(e.navn)) + "</th>";
        kolKat.forEach(cc => {
          kat[cc].elementer.forEach((f, fi) => {
            if (!kolFor(rc).includes(cc)) { tab += '<td class="my-tomcelle' + (fi === 0 ? " blokkstart" : "") + '"></td>'; return; }
            const key = parNokkel(nk(rc, ei), nk(cc, fi));
            tab += '<td class="' + (fi === 0 ? "blokkstart" : "") + '"><button type="button" class="my-celle" data-key="' + key + '" data-r="' + rc + '" data-re="' + ei + '" data-c="' + cc + '" data-ce="' + fi + '" aria-label="' + esc(stor(e.navn) + " + " + f.navn) + '"></button></td>';
          });
        });
        tab += "</tr>";
      });
    });
    $("my-rutenett").innerHTML = tab + "</tbody>";
    function kortNavn(s) { s = s.replace(/^the /i, ""); return s.length > 16 ? s.slice(0, 15) + "…" : s; }
    const celle = key => document.querySelector('.my-celle[data-key="' + CSS.escape(key) + '"]');
    function sett(key, verdi) {
      tilstand[key] = verdi; const b = celle(key); if (!b) return;
      b.textContent = verdi === "x" ? "✗" : verdi === "v" ? "✓" : "";
      b.className = "my-celle" + (verdi ? " " + verdi : "");
    }
    document.querySelectorAll(".my-celle").forEach(b => b.addEventListener("click", () => {
      if (losst) return;
      const key = b.dataset.key, na = tilstand[key] || "";
      const ny = na === "" ? "x" : na === "x" ? "v" : "";
      sett(key, ny);
      if (ny === "v" && $("my-auto").checked) {
        const rc = +b.dataset.r, re = +b.dataset.re, cc = +b.dataset.c, ce = +b.dataset.ce;
        for (let i = 0; i < n; i++) {
          if (i !== ce) { const k2 = parNokkel(nk(rc, re), nk(cc, i)); if (!tilstand[k2]) sett(k2, "x"); }
          if (i !== re) { const k2 = parNokkel(nk(rc, i), nk(cc, ce)); if (!tilstand[k2]) sett(k2, "x"); }
        }
      }
      $("my-status").textContent = "";
    }));
    document.querySelectorAll(".my-led").forEach(b => b.addEventListener("click", () => b.setAttribute("aria-pressed", String(b.getAttribute("aria-pressed") !== "true"))));
    document.querySelectorAll(".my-tipsknapp").forEach(b => b.addEventListener("click", () => { $("tips-" + b.dataset.tips).hidden = false; b.remove(); }));
    $("my-sjekk").addEventListener("click", () => {
      let feil = 0;
      document.querySelectorAll(".my-celle").forEach(b => {
        const [a, c] = b.dataset.key.split("|"); const v = tilstand[b.dataset.key] || "";
        const galt = (v === "v" && !sammen(a, c)) || (v === "x" && sammen(a, c));
        b.classList.toggle("galt", galt); if (galt) feil++;
      });
      $("my-status").textContent = feil ? feil + " " + t.feilRuter : t.ingenFeil;
    });
    $("my-hint").addEventListener("click", () => {
      const mangler = [...document.querySelectorAll(".my-celle")].filter(b => { const [a, c] = b.dataset.key.split("|"); return sammen(a, c) && tilstand[b.dataset.key] !== "v"; });
      if (!mangler.length) return;
      const b = mangler[Math.floor(Math.random() * mangler.length)];
      hint++; sett(b.dataset.key, "v"); b.classList.add("hintet"); b.focus();
      $("my-status").textContent = hint + " " + t.hintBrukt;
    });
    $("my-tom").addEventListener("click", () => { Object.keys(tilstand).forEach(key => sett(key, "")); document.querySelectorAll(".my-celle").forEach(b => b.classList.remove("galt", "hintet")); });
    function visResultat(riktig, visFasit) {
      const svar = gate.losning[skyldig];
      const linjer = kat.map(kk => kk.id === "p" ? kat[0].elementer.find(e => e.id === skyldig) : kk.elementer.find(e => e.id === svar[kk.id]));
      const tidBrukt = Math.round((Date.now() - start) / 1000);
      const resultat = gate.tittel + " – " + (riktig ? "løst" : "fasit vist") + ", " + Math.floor(tidBrukt / 60) + " min " + (tidBrukt % 60) + " s" + (hint ? ", " + hint + " hint" : "");
      $("my-resultat").innerHTML = '<div class="spill-resultat my-losning"><h3>' + (riktig ? t.riktig : (gate.sprak === "en" ? "The solution" : "Løsningen")) + '</h3><p class="my-fasitlinje">' + linjer.map(e => '<span><span aria-hidden="true">' + e.ikon + "</span> " + esc(stor(e.navn)) + "</span>").join(" ") + "</p>" +
        (gate.historie ? '<div class="my-historie" lang="' + (gate.sprak === "en" ? "en" : "nb") + '"><h3>📜 ' + t.historien + "</h3>" + gate.historie.map(p => "<p>" + fmt(p) + "</p>").join("") + "</div>" : "") +
        '<div class="spill-knapper"><button class="knapp" id="my-kopier">' + t.kopier + '</button><span id="kopistatus" aria-live="polite"></span></div></div>';
      $("my-kopier").addEventListener("click", () => {
        const tekst = (gate.generert ? "Cold Case Mysteries: " : "Kalde spor i historien: ") + resultat + (gate.generert ? "\nLenke: " + location.href : "") + "\n";
        const ok = () => { $("kopistatus").textContent = t.kopiert; };
        if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(tekst).then(ok, reserve); else reserve();
        function reserve() { const x = document.createElement("textarea"); x.value = tekst; document.body.appendChild(x); x.select(); try { document.execCommand("copy"); ok(); } catch (e) { window.prompt("Ctrl+C / Cmd+C", tekst); } x.remove(); }
      });
      if (visFasit || riktig) {
        losst = true;
        document.querySelectorAll(".my-celle").forEach(b => { const [a, c] = b.dataset.key.split("|"); sett(b.dataset.key, sammen(a, c) ? "v" : "x"); b.classList.remove("galt"); });
      }
    }
    $("my-anklag").addEventListener("click", () => {
      const valg = {}; document.querySelectorAll(".my-anklag select").forEach(s => { valg[s.dataset.kat] = s.value; });
      if (Object.values(valg).some(v => !v)) { $("my-resultat").innerHTML = '<p class="my-feil">' + (gate.sprak === "en" ? "Choose one in each list." : "Velg én i hver liste.") + "</p>"; return; }
      const svar = gate.losning[skyldig];
      const riktig = valg.p === skyldig && kat.slice(1).every(kk => valg[kk.id] === svar[kk.id]);
      if (riktig) visResultat(true); else $("my-resultat").innerHTML = '<p class="my-feil">' + t.feilSvar + "</p>";
    });
    $("my-fasit").addEventListener("click", () => { if (confirm(gate.sprak === "en" ? "Show the solution?" : "Vil du se løsningen?")) visResultat(false, true); });
  }

  LV.mysterium = { generer: generer, alleLosninger: alleLosninger, lagOppslag: lagOppslag, oppfyller: oppfyller };

  document.addEventListener("DOMContentLoaded", function () {
    const sak = LV.param("sak"), verden = LV.param("verden");
    if (sak) {
      const s = LV.mysteriumSaker.find(x => x.id === sak);
      if (!s) { $("innhold").innerHTML = '<p class="melding">Fant ikke mysteriet. <a href="mysterium.html">Til alle mysteriene</a></p>'; return; }
      document.title = s.tittel + " – Kalde spor i historien";
      spill(s);
    } else if (verden) {
      const v = LV.mysteriumVerdener.find(x => x.id === verden) || LV.mysteriumVerdener[0];
      const n = LV.mysteriumNivaer.find(x => x.id === LV.param("niva")) || LV.mysteriumNivaer[1];
      const seed = parseInt(LV.param("seed"), 10) || Math.floor(Math.random() * 900000) + 100000;
      const g = generer(v, n, seed);
      document.title = g.tittel + " – Cold Case Mysteries";
      spill(g);
    } else oversikt();
  });
})();
