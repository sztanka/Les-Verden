/* =========================================================
   Les verden – Klimatoppmøtet (klima.html)
   klima.html                → oversikt: gangen, delegasjonene, refleksjon
   klima.html?rolle=<id>     → rollekort og forhandlingsark for én delegasjon
   klima.html?vis=modell     → lærerens modell for storskjerm. Tilbudene og
                               rundene ligger i adressen (#…), så siden kan
                               lastes på nytt uten at noe lagres.
   Data: data/klima.js. Svarene kan lastes ned (svarfil.js).
   ========================================================= */
(function () {
  const LV = window.LV;
  const $ = id => document.getElementById(id);
  const esc = s => LV.esc(String(s == null ? "" : s));
  const K = () => LV.klima;
  const tall = (x, d) => x.toLocaleString("nb-NO", { minimumFractionDigits: d || 0, maximumFractionDigits: d || 0 });
  const flagg = l => '<span class="fn-flagg" aria-hidden="true" style="background:linear-gradient(90deg,' + l.farger[0] + " 0 33.3%," + l.farger[1] + " 33.3% 66.6%," + l.farger[2] + ' 66.6%)"></span>';
  const hode = sti => '<nav class="brodsmuler" aria-label="Brødsmuler"><a href="index.html">Forside</a> › <a href="spill.html">Spill</a> › ' + (sti ? '<a href="klima.html">Klimatoppmøtet</a> › ' + esc(sti) : "Klimatoppmøtet") + "</nav>";
  const svarlinje = () => { const l = document.createElement("div"); l.className = "svarlinje"; l.innerHTML = '<div class="svarlinje-indre"><label class="skjult-visuelt" for="elevnavn">Navn</label><input id="elevnavn" type="text" placeholder="Navn" autocomplete="off"><span class="status" role="status" aria-live="polite"></span></div>'; document.body.appendChild(l); };

  // ---------- Modellen ----------
  const AAR = () => { const a = []; for (let y = K().start; y <= K().slutt; y++) a.push(y); return a; };
  function bane(d, topp, kutt) {
    const ut = []; let ved = null;
    AAR().forEach(y => {
      const vekst = d.e0 * Math.pow(1 + d.g, Math.min(y, 2050) - K().start);
      if (y <= topp) { ut.push(vekst); ved = vekst; } else ut.push(ved * Math.pow(1 - kutt / 100, y - topp));
    });
    return ut;
  }
  const sum = a => a.reduce((x, y) => x + y, 0);
  function beregn(valg) {
    const D = K().delegasjoner;
    const baner = D.map((d, i) => bane(d, valg[i].topp, valg[i].kutt));
    const bau = D.map(d => bane(d, 2100, 0));
    // Resten av verden følger samme utvikling som delegasjonene i snitt
    const rest = bane(K().rest, 2100, 0).map((v, j) => v * baner.reduce((x, b) => x + b[j], 0) / bau.reduce((x, b) => x + b[j], 0));
    const restBau = bane(K().rest, 2100, 0);
    const total = sum(baner.map(sum)) + sum(rest);
    const totalBau = sum(bau.map(sum)) + sum(restBau);
    return { baner: baner, rest: rest, bauTotal: AAR().map((y, j) => bau.reduce((x, b) => x + b[j], 0) + restBau[j]), temp: K().startTemp + K().tcre * total, tempBau: K().startTemp + K().tcre * totalBau, total: total,
      fondInn: valg.reduce((x, v) => x + Math.max(0, v.fond), 0), fondUt: valg.reduce((x, v) => x + Math.max(0, -v.fond), 0) };
  }

  // ---------- Oversikt ----------
  function oversikt() {
    const D = K();
    const tot = D.delegasjoner.reduce((x, d) => x + d.e0, 0) + D.rest.e0;
    $("innhold").innerHTML = hode() +
      '<header class="sidehode"><p class="overlinje">Rollespill · samfunnsfag 10. trinn</p><h1>🌍 Klimatoppmøtet</h1><p class="ingress">Seks delegasjoner skal bli enige om hvordan verden skal kutte utslipp – og hvem som skal betale. Etter hver runde legger læreren tilbudene inn i en klimamodell som viser hvor varmt det kan bli i 2100. Klarer dere å holde oppvarmingen under 2 °C?</p></header>' +
      '<p class="mu-kontroll kl-start"><a class="knapp hoved" href="klima.html?vis=modell">📈 Åpne modellen (lærer / storskjerm)</a> <a class="knapp" href="#refleksjon">✍️ Etterarbeid</a></p>' +
      '<section class="kl-del"><h2>Delegasjonene</h2><p class="mu-intro">Del klassen i seks grupper. Hver gruppe åpner sitt rollekort. Landene er oppdiktet og er de samme som i <a href="fn.html">FN-rollespillet</a> – her leder hvert land en hel gruppe land.</p>' +
      '<ul class="kl-delegasjoner">' + D.delegasjoner.map(d => '<li><a class="kl-dkort" href="klima.html?rolle=' + d.id + '" style="--kl:' + d.farge + '">' + flagg(d) + '<span><strong>' + esc(d.navn) + "</strong><small>" + esc(d.type) + " · " + tall(d.e0, d.e0 < 1 ? 1 : 0) + " mrd. tonn CO₂ · " + tall(d.e0 / d.folk, 1) + " tonn per person</small></span></a></li>").join("") + "</ul>" +
      '<div class="gr-tabell-rull" tabindex="0" role="region" aria-label="Utslipp per delegasjon"><table class="kl-tabell"><caption>Utslipp i 2025 – tre måter å regne på</caption><thead><tr><th scope="col">Delegasjon</th><th scope="col">Andel av verdens utslipp i dag</th><th scope="col">Tonn CO₂ per person</th><th scope="col">Andel av utslippene siden 1850</th></tr></thead><tbody>' +
      D.delegasjoner.map(d => '<tr><th scope="row">' + esc(d.navn) + "</th><td>" + tall(100 * d.e0 / tot, 1) + " %</td><td>" + tall(d.e0 / d.folk, 1) + "</td><td>" + tall(d.hist, d.hist < 1 ? 1 : 0) + " %</td></tr>").join("") +
      "</tbody></table></div><p class=\"kl-merk\">Hvem bør kutte mest? Svaret avhenger av hvilken kolonne du ser på.</p></section>" +
      '<section class="kl-del"><h2>Slik gjør dere</h2><ol class="fn-gang">' + D.gang.map(([n, t, tid]) => "<li><strong>" + esc(n) + '</strong> <span class="fn-tid">' + esc(tid) + "</span><p>" + esc(t) + "</p></li>").join("") + "</ol>" +
      '<details class="kl-laerer"><summary>For læreren: hendelseskort</summary><p>Les én hendelse før runde 2 (og gjerne én før runde 3). Hendelsene kan også trekkes i modellen.</p><ul>' + D.hendelser.map(h => "<li><strong>" + esc(h.tittel) + ":</strong> " + esc(h.tekst) + "</li>").join("") + "</ul></details>" +
      '<details class="kl-laerer"><summary>For læreren: om modellen</summary><p>' + esc(D.kontroller) + "</p><p>Hver delegasjon velger <strong>toppår</strong> (når utslippene slutter å vokse), <strong>kutt per år</strong> etter toppåret og <strong>penger til eller fra klimafondet</strong> (milliarder dollar i året; minus betyr at delegasjonen ber om penger). Uten tiltak blir det ca. " + tall(beregn(D.delegasjoner.map(() => ({ topp: 2100, kutt: 0, fond: 0 }))).temp, 1) + " °C varmere i 2100.</p></details></section>" +
      '<section class="kl-del" id="refleksjon"><h2>✍️ Etterarbeid</h2>' + D.refleksjon.map((r, i) => '<label for="kl-r' + i + '">' + esc(r) + '</label><textarea id="kl-r' + i + '" rows="3"></textarea>').join("") + "</section>" +
      '<p class="fo-merk">Se også: <a href="tema.html?id=sf10-klimaendringer">Klimaendringer</a> · <a href="tema.html?id=sf10-internasjonalt-samarbeid">Internasjonalt samarbeid</a> · <a href="fn.html?sak=klima">FN-rollespill: Havet stiger</a> · <a href="grafleser.html">Grafleseren</a> · <a href="tema.html?id=sf9-baerekraftsmaal">Bærekraftsmålene</a></p>';
    svarlinje();
  }

  // ---------- Rollekort ----------
  function rolle(d) {
    const D = K();
    const tot = D.delegasjoner.reduce((x, e) => x + e.e0, 0) + D.rest.e0;
    document.title = d.navn + " – Klimatoppmøtet – " + (LV.config ? LV.config.navn : "Les verden");
    const runde = n => '<fieldset class="kl-tilbud"><legend>Tilbud i runde ' + n + '</legend><label for="kl-t' + n + '">Toppår (når slutter utslippene å vokse?)</label><input type="text" id="kl-t' + n + '" inputmode="numeric" placeholder="f.eks. 2035">' +
      '<label for="kl-k' + n + '">Kutt per år etter toppåret (0–8 %)</label><input type="text" id="kl-k' + n + '" inputmode="numeric" placeholder="f.eks. 3">' +
      '<label for="kl-f' + n + '">Penger til fondet (+) eller fra fondet (−), milliarder dollar i året</label><input type="text" id="kl-f' + n + '" inputmode="numeric" placeholder="f.eks. +20 eller −30">' +
      '<label for="kl-b' + n + '">Betingelser: Hva krever vi av de andre?</label><textarea id="kl-b' + n + '" rows="2"></textarea></fieldset>';
    $("innhold").innerHTML = hode(d.navn) +
      '<article class="fn-rolle kl-rolle" style="--fn1:' + d.farge + '"><p class="fn-rolle-topp">' + flagg(d) + " Klimatoppmøtet · rollekort</p><h1 class=\"fn-rolle-navn\">" + d.ikon + " " + esc(d.navn) + '</h1><p class="kl-type">' + esc(d.type) + "</p><p>" + esc(d.hvem) + "</p>" +
      '<dl class="kl-fakta"><div><dt>Utslipp i dag</dt><dd>' + tall(d.e0, d.e0 < 1 ? 1 : 0) + " mrd. tonn CO₂ (" + tall(100 * d.e0 / tot, 1) + " % av verden)</dd></div><div><dt>Per person</dt><dd>" + tall(d.e0 / d.folk, 1) + " tonn CO₂</dd></div><div><dt>Innbyggere</dt><dd>" + tall(d.folk * 1000) + " millioner</dd></div><div><dt>Andel av utslippene siden 1850</dt><dd>" + tall(d.hist, d.hist < 1 ? 1 : 0) + " %</dd></div><div><dt>Uten nye tiltak</dt><dd>" + (d.g > 0 ? "Utslippene vokser med " + tall(d.g * 100) + " % i året fram til 2050" : d.g < 0 ? "Utslippene synker med " + tall(-d.g * 100) + " % i året" : "Utslippene holder seg på samme nivå") + "</dd></div></dl>" +
      "<h2>Dette vil dere</h2><ul>" + d.vil.map(x => "<li>" + esc(x) + "</li>").join("") + "</ul>" +
      "<h2>Grensene deres</h2><ul>" + d.grenser.map(x => "<li>" + esc(x) + "</li>").join("") + '</ul><p class="kl-tips">💡 ' + esc(d.kort) + "</p></article>" +
      '<section class="kl-del kl-ark"><h2>Forhandlingsarket</h2><label for="kl-tale">Åpningstale (maks 1 minutt): Hvem er vi, hva trenger vi, hva krever vi?</label><textarea id="kl-tale" rows="5"></textarea>' +
      '<label for="kl-allierte">Hvem kan bli våre allierte? Hvorfor?</label><textarea id="kl-allierte" rows="2"></textarea>' + [1, 2, 3].map(runde).join("") + "</section>" +
      '<p class="mu-kontroll"><button type="button" class="knapp" id="kl-skriv">🖨️ Skriv ut</button> <a class="knapp" href="klima.html">← Alle delegasjoner</a></p>' +
      '<p class="fo-merk">Nyttige fraser: «Vi kan godta … hvis …» · «Vi foreslår et kompromiss: …» · «Hvorfor skal vi kutte når …?» · «Per person slipper dere ut …» · «Gjennom historien har …»</p>';
    $("kl-skriv").addEventListener("click", () => window.print());
    svarlinje();
  }

  // ---------- Modellen på storskjerm ----------
  function modell() {
    const D = K();
    document.title = "Modellen – Klimatoppmøtet – " + (LV.config ? LV.config.navn : "Les verden");
    const topper = [2025, 2030, 2035, 2040, 2045, 2050, 2060, 2070, 2080, 2100];
    const les = s => (s || "").split("_").map(x => { const [t, k, f] = x.split(".").map(Number); return { topp: topper.includes(t) ? t : 2100, kutt: k >= 0 && k <= 8 ? k : 0, fond: isFinite(f) ? Math.max(-200, Math.min(200, f)) : 0 }; });
    const skriv = v => v.map(x => x.topp + "." + x.kutt + "." + x.fond).join("_");
    const h = new URLSearchParams(location.hash.slice(1));
    let valg = h.get("t") ? les(h.get("t")) : D.delegasjoner.map(() => ({ topp: 2100, kutt: 0, fond: 0 }));
    while (valg.length < D.delegasjoner.length) valg.push({ topp: 2100, kutt: 0, fond: 0 });
    let runder = (h.get("r") || "").split("~").filter(Boolean).map(les);

    $("innhold").innerHTML = hode("Modellen") +
      '<header class="sidehode"><p class="overlinje">🌍 Klimatoppmøtet · for læreren og storskjermen</p><h1>Hvor varmt blir det i 2100?</h1><p class="ingress">Legg inn tilbudet fra hver delegasjon. Grafen og temperaturen oppdateres med en gang. Tallene ligger i adressen, så du kan laste siden på nytt eller bokmerke den.</p></header>' +
      '<div class="kl-modell"><div class="gr-tabell-rull" tabindex="0" role="region" aria-label="Tilbudene"><table class="kl-valg"><thead><tr><th scope="col">Delegasjon</th><th scope="col">Toppår</th><th scope="col">Kutt per år</th><th scope="col">Fondet (mrd. $)</th></tr></thead><tbody>' +
      D.delegasjoner.map((d, i) => '<tr style="--kl:' + d.farge + '"><th scope="row"><span class="kl-prikk" aria-hidden="true"></span>' + esc(d.navn) + "</th>" +
        '<td><label class="skjult-visuelt" for="kl-topp' + i + '">Toppår for ' + esc(d.navn) + '</label><select id="kl-topp' + i + '">' + topper.map(t => '<option value="' + t + '">' + (t === 2100 ? "Ingen topp" : t) + "</option>").join("") + "</select></td>" +
        '<td><label class="skjult-visuelt" for="kl-kutt' + i + '">Kutt per år for ' + esc(d.navn) + '</label><select id="kl-kutt' + i + '">' + [0, 1, 2, 3, 4, 5, 6, 7, 8].map(k => '<option value="' + k + '">' + k + " %</option>").join("") + "</select></td>" +
        '<td><label class="skjult-visuelt" for="kl-fond' + i + '">Fondet for ' + esc(d.navn) + '</label><input type="number" id="kl-fond' + i + '" min="-200" max="200" step="5"></td></tr>').join("") +
      '</tbody></table></div><div class="kl-resultat" id="kl-resultat" aria-live="polite"></div></div>' +
      '<figure class="kl-graf"><div id="kl-graf"></div><figcaption>Utslipp av CO₂ per år, milliarder tonn. Den stiplede linja viser utslippene uten nye tiltak.</figcaption></figure>' +
      '<p class="mu-kontroll"><button type="button" class="knapp hoved" id="kl-lagre">📌 Lagre som runde</button> <button type="button" class="knapp" id="kl-hendelse">🎴 Trekk en hendelse</button> <button type="button" class="knapp" id="kl-null">↺ Nullstill tilbudene</button></p>' +
      '<div id="kl-hendelsestekst" aria-live="polite"></div><section class="kl-del"><h2>Rundene</h2><ol class="kl-runder" id="kl-runder"></ol></section>' +
      '<details class="kl-laerer"><summary>Om modellen</summary><p>' + esc(D.kontroller) + '</p></details><p class="fo-merk"><a href="klima.html">← Tilbake til Klimatoppmøtet</a></p>';

    const sett = () => valg.forEach((v, i) => { $("kl-topp" + i).value = v.topp; $("kl-kutt" + i).value = v.kutt; $("kl-fond" + i).value = v.fond; });
    const lagreHash = () => { const q = new URLSearchParams(); q.set("t", skriv(valg)); if (runder.length) q.set("r", runder.map(skriv).join("~")); history.replaceState(null, "", "#" + q); };
    const tegn = () => {
      const r = beregn(valg);
      const k = D.konsekvenser.find(x => r.temp <= x.maks);
      const nivå = r.temp <= 1.6 ? "gronn" : r.temp <= 2.1 ? "gul" : r.temp <= 3.1 ? "oransje" : "rod";
      $("kl-resultat").innerHTML = '<div class="kl-termo kl-' + nivå + '"><span class="kl-grader">+' + tall(r.temp, 1) + ' °C</span><span>i 2100 (uten nye tiltak: +' + tall(r.tempBau, 1) + " °C)</span></div>" +
        '<div class="kl-konsekvens"><h2>' + esc(k.tittel) + "</h2><p>" + esc(k.tekst) + "</p></div>" +
        '<div class="kl-fond"><h2>Klimafondet</h2><p>Lovet: <strong>' + tall(r.fondInn) + " mrd. $</strong> · Ønsket: <strong>" + tall(r.fondUt) + " mrd. $</strong> · Mål: " + D.fondMal + ' mrd. $ i året</p><div class="kl-fondbar" role="img" aria-label="' + tall(Math.min(100, 100 * r.fondInn / D.fondMal)) + ' prosent av målet"><span style="width:' + Math.min(100, 100 * r.fondInn / D.fondMal) + '%"></span></div>' +
        (r.fondUt > r.fondInn ? '<p class="kl-varsel">⚠️ Delegasjonene ber om ' + tall(r.fondUt - r.fondInn) + " mrd. $ mer enn det som er lovet.</p>" : "") + "</div>";
      $("kl-graf").innerHTML = graf(r);
      lagreHash();
    };
    const visRunder = () => {
      $("kl-runder").innerHTML = runder.length ? runder.map((v, n) => { const r = beregn(v); return "<li><strong>Runde " + (n + 1) + ":</strong> +" + tall(r.temp, 1) + " °C · fondet " + tall(r.fondInn) + " av " + D.fondMal + ' mrd. $ <button type="button" class="knapp liten" data-hent="' + n + '">Vis</button></li>'; }).join("") : "<li>Ingen runder er lagret ennå.</li>";
      $("kl-runder").querySelectorAll("[data-hent]").forEach(b => b.addEventListener("click", () => { valg = runder[+b.dataset.hent].map(x => Object.assign({}, x)); sett(); tegn(); }));
    };
    D.delegasjoner.forEach((d, i) => ["topp", "kutt", "fond"].forEach(f => $("kl-" + f + i).addEventListener(f === "fond" ? "input" : "change", e => { valg[i][f] = +e.target.value || 0; if (f === "topp" && valg[i][f] === 0) valg[i][f] = 2100; tegn(); })));
    $("kl-lagre").addEventListener("click", () => { runder.push(valg.map(x => Object.assign({}, x))); visRunder(); lagreHash(); });
    $("kl-null").addEventListener("click", () => { valg = D.delegasjoner.map(() => ({ topp: 2100, kutt: 0, fond: 0 })); sett(); tegn(); });
    let brukt = [];
    $("kl-hendelse").addEventListener("click", () => {
      if (brukt.length === D.hendelser.length) brukt = [];
      const ledige = D.hendelser.map((x, i) => i).filter(i => !brukt.includes(i)); const n = ledige[Math.floor(Math.random() * ledige.length)]; brukt.push(n);
      $("kl-hendelsestekst").innerHTML = '<div class="kl-hendelse"><h2>🎴 ' + esc(D.hendelser[n].tittel) + "</h2><p>" + esc(D.hendelser[n].tekst) + "</p></div>";
    });
    sett(); tegn(); visRunder();
    window.addEventListener("hashchange", () => location.reload());
  }

  function graf(r) {
    const D = K(), A = AAR(), B = 760, H = 330, ml = 44, mb = 30, mt = 12, mr = 12;
    const lag = D.delegasjoner.map((d, i) => ({ farge: d.farge, navn: d.navn, v: r.baner[i] })).concat([{ farge: D.rest.farge, navn: D.rest.navn, v: r.rest }]);
    const ymax = Math.ceil(Math.max(60, ...r.bauTotal) / 10) * 10;
    const x = j => ml + (B - ml - mr) * j / (A.length - 1), y = v => mt + (H - mt - mb) * (1 - v / ymax);
    let under = A.map(() => 0), sti = "";
    lag.forEach(l => {
      const over = under.map((u, j) => u + l.v[j]);
      sti += '<path d="M' + A.map((a, j) => x(j).toFixed(1) + "," + y(over[j]).toFixed(1)).join("L") + "L" + A.map((a, j) => j).reverse().map(j => x(j).toFixed(1) + "," + y(under[j]).toFixed(1)).join("L") + 'Z" fill="' + l.farge + '" fill-opacity=".85"><title>' + esc(l.navn) + "</title></path>";
      under = over;
    });
    let akser = "";
    for (let v = 0; v <= ymax; v += 10) akser += '<line x1="' + ml + '" x2="' + (B - mr) + '" y1="' + y(v) + '" y2="' + y(v) + '" class="kl-rutenett"/><text x="' + (ml - 6) + '" y="' + (y(v) + 4) + '" text-anchor="end">' + v + "</text>";
    [2025, 2050, 2075, 2100].forEach(a => { const j = a - D.start; akser += '<text x="' + x(j) + '" y="' + (H - 8) + '" text-anchor="' + (a === 2100 ? "end" : a === 2025 ? "start" : "middle") + '">' + a + "</text>"; });
    const bau = '<path d="M' + A.map((a, j) => x(j).toFixed(1) + "," + y(r.bauTotal[j]).toFixed(1)).join("L") + '" class="kl-bau"/>';
    const tot = j => lag.reduce((s, l) => s + l.v[j], 0);
    const etikett = "Utslippene går fra " + tall(tot(0)) + " milliarder tonn i 2025 til " + tall(tot(25)) + " i 2050 og " + tall(tot(A.length - 1)) + " i 2100. Uten nye tiltak: " + tall(r.bauTotal[A.length - 1]) + " i 2100.";
    return '<svg viewBox="0 0 ' + B + " " + H + '" role="img" aria-label="' + esc(etikett) + '" class="kl-svg">' + akser + sti + bau + "</svg>" +
      '<ul class="kl-forklaring">' + lag.map(l => '<li><span style="background:' + l.farge + '" aria-hidden="true"></span>' + esc(l.navn) + "</li>").join("") + '<li><span class="kl-bau-tegn" aria-hidden="true"></span>Uten nye tiltak</li></ul>';
  }

  document.addEventListener("DOMContentLoaded", () => {
    const d = K().delegasjoner.find(x => x.id === LV.param("rolle"));
    if (LV.param("vis") === "modell") modell(); else if (d) rolle(d); else oversikt();
  });
})();
