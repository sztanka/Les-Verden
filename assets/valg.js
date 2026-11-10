/* =========================================================
   Les verden – Valgsimulatoren (valg.html)
   1) Fra stemmer til mandater: ett oppdiktet valgdistrikt, valgfri
      fordelingsmetode (justert Sainte-Laguë, ren Sainte-Laguë,
      d'Hondt) og sperregrense, med kvotienttabell steg for steg.
   2) Koalisjonsbyggeren: sett sammen et flertall på Stortinget.
   Partiene er oppdiktet (fra data/lov.js). Ingenting lagres.
   ========================================================= */
(function () {
  const LV = window.LV;
  const $ = id => document.getElementById(id);
  const esc = s => LV.esc(String(s == null ? "" : s));
  const P = LV.lov.partier;
  const POS = { ven: 1, fel: 2.5, gro: 3, byg: 4.2, lib: 4.6, ver: 5.2, mar: 6, try: 6.6 };
  const METODER = {
    sljust: { navn: "Sainte-Laguë, justert (Norge)", del: n => n === 0 ? 1.4 : 2 * n + 1, tekst: "1,4 – 3 – 5 – 7 …" },
    slren: { navn: "Sainte-Laguë, ren", del: n => 2 * n + 1, tekst: "1 – 3 – 5 – 7 …" },
    dhondt: { navn: "d'Hondt", del: n => n + 1, tekst: "1 – 2 – 3 – 4 …" }
  };
  const SCENARIER = {
    jevnt: { navn: "Jevnt valg", st: { fel: 2600, mar: 2400, byg: 1300, try: 1250, gro: 700, ven: 650, lib: 500, ver: 450 } },
    stort: { navn: "Ett stort parti", st: { fel: 4300, mar: 1900, byg: 900, try: 800, gro: 500, ven: 450, lib: 350, ver: 300 } },
    smaa: { navn: "Mange små partier", st: { fel: 1800, mar: 1700, byg: 1200, try: 1150, gro: 1000, ven: 950, lib: 600, ver: 550 } }
  };
  let st = Object.assign({}, SCENARIER.jevnt.st), mandater = 10, metode = "sljust", sperre = false, koal = new Set();

  function fordel(stemmer, n, m, grense) {
    const sum = Object.values(stemmer).reduce((a, b) => a + b, 0) || 1;
    const med = P.filter(p => stemmer[p.id] > 0 && (!grense || stemmer[p.id] / sum * 100 >= grense));
    const fikk = {}; P.forEach(p => { fikk[p.id] = 0; });
    const logg = [];
    for (let k = 0; k < n; k++) {
      let best = null;
      med.forEach(p => { const q = stemmer[p.id] / METODER[m].del(fikk[p.id]); if (!best || q > best.q || (q === best.q && stemmer[p.id] > stemmer[best.p.id])) best = { p, q }; });
      if (!best) break;
      logg.push({ nr: k + 1, p: best.p, q: best.q, deler: METODER[m].del(fikk[best.p.id]) });
      fikk[best.p.id]++;
    }
    return { fikk, logg, sum };
  }
  const tall = v => Math.round(v).toLocaleString("nb-NO");
  const desimal = v => (Math.round(v * 10) / 10).toLocaleString("nb-NO");

  function salen(fikk, id) {
    // Halvsirkel med ett punkt per mandat
    const liste = []; P.forEach(p => { for (let i = 0; i < fikk[p.id]; i++) liste.push(p); });
    const n = liste.length; if (!n) return "";
    const rader = n <= 12 ? 1 : n <= 40 ? 3 : 6, punkter = [];
    const radii = rader === 1 ? [150] : Array.from({ length: rader }, (_, r) => 80 + r * (120 / (rader - 1)));
    const tot = radii.reduce((a, r) => a + r, 0); let rest = n;
    const perRad = radii.map((r, i) => { const a = i === rader - 1 ? rest : Math.round(n * r / tot); rest -= a; return a; });
    radii.forEach((r, i) => { for (let j = 0; j < perRad[i]; j++) { const a = Math.PI - (perRad[i] === 1 ? Math.PI / 2 : j / (perRad[i] - 1) * Math.PI); punkter.push({ x: 220 + r * Math.cos(a), y: 220 - r * Math.sin(a), a }); } });
    punkter.sort((p, q) => q.a - p.a);
    const rad = Math.max(5, Math.min(16, 260 / (n + 6)));
    return '<svg class="vl-sal" viewBox="0 0 440 240" role="img" aria-labelledby="' + id + '-t"><title id="' + id + '-t">Fordeling av ' + n + " mandater: " + P.filter(p => fikk[p.id]).map(p => p.navn + " " + fikk[p.id]).join(", ") + "</title>" +
      punkter.map((pt, i) => '<circle cx="' + pt.x.toFixed(1) + '" cy="' + pt.y.toFixed(1) + '" r="' + rad.toFixed(1) + '" fill="' + liste[i].farge + '" stroke="var(--flate)" stroke-width="1.5"/>').join("") + "</svg>";
  }

  function regn() {
    const r = fordel(st, mandater, metode, sperre ? 4 : 0);
    const andre = Object.keys(METODER).map(k => [k, fordel(st, mandater, k, sperre ? 4 : 0).fikk]);
    $("vl-resultat").innerHTML =
      '<div class="vl-res-topp">' + salen(r.fikk, "vl-sal1") + '<div class="vl-rull" tabindex="0" role="region" aria-label="Resultattabell"><table class="vl-tabell"><caption>Resultat med ' + esc(METODER[metode].navn) + (sperre ? " og 4 % sperregrense" : "") + '</caption><thead><tr><th scope="col">Parti</th><th scope="col">Stemmer</th><th scope="col">Prosent</th><th scope="col">Mandater</th><th scope="col">Andel av mandatene</th></tr></thead><tbody>' +
      P.map(p => '<tr><th scope="row"><span class="vl-prikk" style="background:' + p.farge + '"></span>' + esc(p.navn) + "</th><td>" + tall(st[p.id] || 0) + "</td><td>" + desimal((st[p.id] || 0) / r.sum * 100) + " %</td><td><strong>" + r.fikk[p.id] + "</strong></td><td>" + desimal(r.fikk[p.id] / mandater * 100) + " %</td></tr>").join("") + "</tbody></table></div></div>" +
      '<details class="vl-logg"><summary>Se utregningen steg for steg (kvotienter)</summary><p>For hvert mandat deles hvert partis stemmetall på et deletall. Partiet med høyest svar – <strong>kvotient</strong> – får mandatet. Deletallene for denne metoden er ' + METODER[metode].tekst + ' Når et parti har fått et mandat, går det videre til neste deletall.</p><ol>' +
      r.logg.map(l => "<li>Mandat " + l.nr + ": <strong>" + esc(l.p.navn) + "</strong> – " + tall(st[l.p.id]) + " ÷ " + desimal(l.deler) + " = " + desimal(l.q) + "</li>").join("") + "</ol></details>" +
      '<div class="vl-rull" tabindex="0" role="region" aria-label="Sammenligning av metodene"><table class="vl-tabell vl-sammen"><caption>Hva hadde skjedd med de andre metodene?</caption><thead><tr><th scope="col">Parti</th>' + andre.map(([k]) => '<th scope="col">' + esc(METODER[k].navn) + "</th>").join("") + "</tr></thead><tbody>" +
      P.map(p => '<tr><th scope="row">' + esc(p.navn) + "</th>" + andre.map(([k, f]) => "<td" + (k === metode ? ' class="vl-valgt"' : "") + ">" + f[p.id] + "</td>").join("") + "</tr>").join("") + "</tbody></table></div>";
  }

  function koalisjon() {
    const sum = [...koal].reduce((a, id) => a + P.find(p => p.id === id).plasser, 0);
    const pos = [...koal].map(id => POS[id]), spenn = pos.length ? Math.max(...pos) - Math.min(...pos) : 0;
    let vurd = "";
    if (!koal.size) vurd = "Velg partier for å sette sammen en regjering.";
    else {
      vurd = sum >= 85 ? "✔ Flertall! Partiene har " + sum + " av 169 plasser." : "Mindretall: " + sum + " av 169 plasser. Det mangler " + (85 - sum) + " for flertall. En mindretallsregjering kan styre, men må få støtte fra andre partier i hver sak.";
      vurd += " " + (spenn >= 3.5 ? "⚠️ Partiene står langt fra hverandre politisk. Det kan bli svært vanskelig å bli enige." : spenn >= 2 ? "Partiene er uenige om en del saker – de må inngå kompromisser." : koal.size > 1 ? "Partiene står ganske nær hverandre politisk." : "");
    }
    $("vl-koal-res").innerHTML = '<div class="vl-maaler" aria-hidden="true"><span style="width:' + (sum / 169 * 100).toFixed(1) + '%"></span><i style="left:' + (85 / 169 * 100).toFixed(1) + '%"></i></div><p>' + esc(vurd) + "</p>";
  }

  function side() {
    document.title = "Valgsimulatoren – " + (LV.config ? LV.config.navn : "Les verden");
    $("innhold").innerHTML = '<nav class="brodsmuler" aria-label="Brødsmuler"><a href="index.html">Forside</a> › <a href="spill.html">Spill</a> › Valgsimulatoren</nav>' +
      '<header class="sidehode"><p class="overlinje">Demokrati og valg</p><h1>🗳️ Valgsimulatoren</h1><p class="ingress">Hvordan blir stemmene dine til plasser på Stortinget? Og hvordan blir det en regjering etterpå? Prøv selv med oppdiktede partier: Endre stemmetallene, bytt fordelingsmetode, og se hvem som får makt.</p></header>' +
      '<div class="lp-viktig"><p><strong>Partiene er oppdiktet.</strong> De er de samme som i <a href="lov.html">Lag en lov</a>.</p></div>' +
      '<section class="le-del" aria-labelledby="vl-1h"><h2 id="vl-1h">1. Fra stemmer til mandater</h2>' +
      '<div class="ka-metode"><h3>Slik fungerer stortingsvalget</h3><ul><li>Stortinget har <strong>169 representanter</strong>. Landet er delt i <strong>valgdistrikter</strong>, og hvert distrikt velger et bestemt antall.</li><li>Plassene fordeles <strong>forholdsmessig</strong>: Et parti med 20 prosent av stemmene skal få omtrent 20 prosent av plassene.</li><li>Norge bruker en <strong>justert Sainte-Laguës metode</strong>, der første deletall er 1,4. Det gjør det litt vanskeligere for de minste partiene å få sin første plass.</li><li>I tillegg finnes <strong>utjevningsmandater</strong>, som skal rette opp skjevheter. For å få dem må et parti ha minst 4 prosent av stemmene i hele landet – <strong>sperregrensen</strong>.</li></ul></div>' +
      '<p class="mu-intro">Her simulerer du ett oppdiktet valgdistrikt, Fjordland. Velg et utgangspunkt, eller skriv inn egne tall.</p>' +
      '<p class="vl-scen">' + Object.entries(SCENARIER).map(([k, s]) => '<button type="button" class="knapp liten vl-scenario" data-k="' + k + '" aria-pressed="' + (k === "jevnt") + '">' + esc(s.navn) + "</button>").join(" ") + "</p>" +
      '<div class="vl-oppsett"><fieldset class="vl-stemmer"><legend>Stemmer i Fjordland</legend>' + P.map(p => '<label for="vl-s-' + p.id + '"><span class="vl-prikk" style="background:' + p.farge + '"></span><span>' + esc(p.navn) + '</span><input type="number" min="0" max="999999" step="50" inputmode="numeric" id="vl-s-' + p.id + '" data-id="' + p.id + '" value="' + st[p.id] + '"></label>').join("") + "</fieldset>" +
      '<div class="vl-regler"><label class="lg-felt" for="vl-mandater"><span>Antall mandater i distriktet</span><input type="number" id="vl-mandater" min="1" max="60" value="' + mandater + '"></label>' +
      '<fieldset><legend>Fordelingsmetode</legend>' + Object.entries(METODER).map(([k, m]) => '<label><input type="radio" name="vl-metode" id="vl-m-' + k + '" value="' + k + '"' + (k === metode ? " checked" : "") + "> " + esc(m.navn) + " <small>(" + m.tekst + ")</small></label>").join("") + "</fieldset>" +
      '<label class="vl-sperre"><input type="checkbox" id="vl-sperre"> Bruk 4 % sperregrense i distriktet <small>(slik noen andre land gjør – i Norge gjelder sperregrensen bare utjevningsmandatene)</small></label></div></div>' +
      '<div id="vl-resultat" aria-live="polite"></div>' +
      '<ol class="vl-oppg"><li><label class="mu-notat" for="vl-o1"><span>Bytt mellom de tre metodene. Hvilke partier tjener på d’Hondt, og hvilke tjener på Sainte-Laguë?</span><textarea id="vl-o1" rows="2"></textarea></label></li><li><label class="mu-notat" for="vl-o2"><span>Prøv med 4 mandater og med 40 mandater. Hva skjer med de små partiene? Hvorfor?</span><textarea id="vl-o2" rows="2"></textarea></label></li><li><label class="mu-notat" for="vl-o3"><span>Bør et land ha sperregrense? Gi ett argument for og ett mot.</span><textarea id="vl-o3" rows="2"></textarea></label></li></ol></section>' +

      '<section class="le-del" aria-labelledby="vl-2h"><h2 id="vl-2h">2. Koalisjonsbyggeren</h2><p class="mu-intro">Etter valget har partiene fått disse plassene på Stortinget. Et flertall er minst <strong>85 av 169</strong>. Trykk på partiene for å sette sammen en regjering.</p>' +
      '<ul class="vl-partier">' + [...P].sort((a, b) => POS[a.id] - POS[b.id]).map(p => '<li><button type="button" class="vl-parti" data-id="' + p.id + '" aria-pressed="false" style="--vl-f:' + p.farge + '"><span class="vl-navn">' + esc(p.navn) + '</span><span class="vl-plasser">' + p.plasser + ' plasser</span><span class="vl-om">' + esc(p.om) + "</span></button></li>").join("") + "</ul>" +
      '<p class="vl-akse" aria-hidden="true"><span>← Venstre</span><span>Høyre →</span></p>' +
      '<div id="vl-koal-res" aria-live="polite"></div>' +
      '<label class="mu-notat" for="vl-o4"><span>Hvilken regjering ville du satt sammen? Begrunn valget – både med antall plasser og med politikk.</span><textarea id="vl-o4" rows="3"></textarea></label>' +
      '<label class="mu-notat" for="vl-o5"><span>Hva er fordeler og ulemper med en mindretallsregjering?</span><textarea id="vl-o5" rows="2"></textarea></label></section>' +
      '<p class="fo-merk">Til læreren: Simulatoren forenkler. I virkeligheten fordeles 150 distriktsmandater i hvert valgdistrikt, og deretter 19 utjevningsmandater ut fra resultatet i hele landet (sperregrense 4 %). Partienes plassering fra venstre til høyre er bare et hjelpemiddel. Prøv gjerne med resultatene fra det siste stortingsvalget i ett fylke – tallene finnes på valgresultat.no. Se også temaet <a href="tema.html?id=sf8-demokratiet-i-norge">Demokratiet i Norge</a>.</p>';

    const oppdater = () => { regn(); };
    P.forEach(p => $("vl-s-" + p.id).addEventListener("input", e => { st[p.id] = Math.max(0, Math.min(999999, Math.round(+e.target.value) || 0)); oppdater(); }));
    $("vl-mandater").addEventListener("input", e => { const v = Math.round(+e.target.value); if (v >= 1 && v <= 60) { mandater = v; oppdater(); } });
    document.querySelectorAll('input[name="vl-metode"]').forEach(r => r.addEventListener("change", () => { metode = r.value; oppdater(); }));
    $("vl-sperre").addEventListener("change", e => { sperre = e.target.checked; oppdater(); });
    document.querySelectorAll(".vl-scenario").forEach(b => b.addEventListener("click", () => {
      st = Object.assign({}, SCENARIER[b.dataset.k].st); P.forEach(p => { $("vl-s-" + p.id).value = st[p.id]; });
      document.querySelectorAll(".vl-scenario").forEach(x => x.setAttribute("aria-pressed", String(x === b))); oppdater();
    }));
    document.querySelectorAll(".vl-parti").forEach(b => b.addEventListener("click", () => {
      const id = b.dataset.id; if (koal.has(id)) koal.delete(id); else koal.add(id);
      b.setAttribute("aria-pressed", String(koal.has(id))); koalisjon();
    }));
    regn(); koalisjon();
  }

  document.addEventListener("DOMContentLoaded", () => {
    side();
    const l = document.createElement("div"); l.className = "svarlinje"; l.innerHTML = '<div class="svarlinje-indre"><label class="skjult-visuelt" for="elevnavn">Navn</label><input id="elevnavn" type="text" placeholder="Navn" autocomplete="off"><span class="status" role="status" aria-live="polite"></span></div>'; document.body.appendChild(l);
  });
})();
