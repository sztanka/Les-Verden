/* =========================================================
   Les verden – Gruppetrekker (gruppetrekker.html)
   Tilfeldige grupper fra en navneliste: velg antall grupper eller
   antall per gruppe, marker fravær, hold elever sammen eller fra
   hverandre, del ut roller, bytt elever med to klikk og vis på
   tavla i fullskjerm. Ingenting lagres.
   ========================================================= */
(function () {
  const LV = window.LV;
  const $ = id => document.getElementById(id);
  const esc = s => LV.esc(String(s == null ? "" : s));
  const norm = s => String(s || "").trim().toLocaleLowerCase("nb");
  const ROLLER = "Ordstyrer\nSekretær\nTidtaker\nPresentatør";

  let navn = [], borte = new Set(), grupper = [], merket = null, advarsel = "";

  // Rettferdig tilfeldighet
  const tilfeldig = n => { const a = new Uint32Array(1); crypto.getRandomValues(a); return a[0] % n; };
  const stokk = l => { l = l.slice(); for (let i = l.length - 1; i > 0; i--) { const j = tilfeldig(i + 1); [l[i], l[j]] = [l[j], l[i]]; } return l; };

  function side() {
    document.title = "Gruppetrekker – " + (LV.config ? LV.config.navn : "Les verden");
    $("innhold").innerHTML = '<nav class="brodsmuler" aria-label="Brødsmuler"><a href="index.html">Forside</a> › <a href="laerer.html">For lærere</a> › Gruppetrekker</nav>' +
      '<header class="sidehode"><p class="overlinje">For lærere · i klasserommet</p><h1>🎲 Gruppetrekker</h1><p class="ingress">Del klassen i tilfeldige grupper på et øyeblikk – helt rettferdig, uten lapper i en lue. Marker hvem som er borte, bestem hvem som skal være sammen eller ikke, og vis gruppene på tavla.</p></header>' +
      '<div class="gt-oppsett">' +
      '<section class="gt-boks" aria-labelledby="gt-h1"><h2 id="gt-h1">1. Navn</h2><label class="cs-felt" for="gt-liste">Ett navn per linje<textarea id="gt-liste" rows="12" spellcheck="false" placeholder="Ada\nBo\nCy\n…"></textarea></label>' +
      '<p class="rv-merk">Bruk gjerne fornavn. Lista lagres ikke – lim den inn på nytt neste gang.</p><div id="gt-oppmote"></div></section>' +
      '<section class="gt-boks" aria-labelledby="gt-h2"><h2 id="gt-h2">2. Grupper</h2>' +
      '<fieldset class="gt-modus"><legend>Del inn etter</legend><label><input type="radio" name="gt-modus" value="antall" checked> Antall grupper</label><label><input type="radio" name="gt-modus" value="str"> Antall per gruppe</label></fieldset>' +
      '<label class="cs-felt" for="gt-tall"><span id="gt-tall-tekst">Antall grupper</span><input id="gt-tall" type="number" min="1" max="40" value="4" inputmode="numeric"></label>' +
      '<p class="gt-info rv-merk" id="gt-info" aria-live="polite"></p>' +
      '<details class="gt-mer"><summary>⚙️ Flere valg</summary>' +
      '<label class="cs-felt" for="gt-ikke"><span>Skal <strong>ikke</strong> være i samme gruppe</span><span class="gt-hjelp">Én regel per linje, for eksempel <code>Per, Kari</code></span><textarea id="gt-ikke" rows="3" spellcheck="false"></textarea></label>' +
      '<label class="cs-felt" for="gt-sammen">Skal være i samme gruppe<span class="gt-hjelp">Én regel per linje, for eksempel <code>Ola, Tina</code></span><textarea id="gt-sammen" rows="3" spellcheck="false"></textarea></label>' +
      '<label class="cs-avkryss"><input type="checkbox" id="gt-rollepaa"> Del ut roller i hver gruppe</label>' +
      '<label class="cs-felt" for="gt-roller" id="gt-rollefelt" hidden>Roller (én per linje)<textarea id="gt-roller" rows="4" spellcheck="false">' + ROLLER + '</textarea></label>' +
      '<p class="rv-merk">Reglene er bare synlige for deg her – de vises ikke på tavla.</p></details>' +
      '<p class="mu-knapper"><button type="button" class="knapp hoved gt-stor" id="gt-trekk">🎲 Lag grupper</button></p>' +
      '<p class="rv-feil" id="gt-feil" role="alert"></p></section></div>' +
      '<section class="gt-resultat" id="gt-resultat" hidden aria-labelledby="gt-rh"><div class="gt-topp"><h2 id="gt-rh">Gruppene</h2><p class="mu-knapper">' +
      '<button type="button" class="knapp" id="gt-igjen">🔁 Trekk på nytt</button><button type="button" class="knapp" id="gt-full">⛶ Vis på tavla</button><button type="button" class="knapp" id="gt-kopier">📋 Kopier</button><button type="button" class="knapp" id="gt-skriv">🖨️ Skriv ut</button></p></div>' +
      '<p class="rv-merk gt-byttinfo">Vil du flytte på noen? Trykk på ett navn og så på et annet, så bytter de plass.</p>' +
      '<p class="rv-feil" id="gt-advarsel" role="status"></p><div class="gt-grupper" id="gt-grupper"></div></section>' +
      '<section class="le-del" aria-labelledby="gt-th"><h2 id="gt-th">🎯 Trekk én elev</h2><p class="mu-intro">Trenger du bare én tilfeldig elev – til å svare, lese høyt eller begynne? Elever som er borte, er ikke med i trekningen.</p><p class="mu-knapper"><button type="button" class="knapp" id="gt-en">Trekk en elev</button><label class="cs-avkryss"><input type="checkbox" id="gt-unik" checked> Ikke trekk samme elev to ganger</label></p><p class="gt-trukket" id="gt-trukket" aria-live="polite"></p></section>';

    $("gt-liste").addEventListener("input", () => { lesNavn(); tegnOppmote(); info(); });
    document.querySelectorAll('input[name="gt-modus"]').forEach(r => r.addEventListener("change", () => { $("gt-tall-tekst").textContent = modus() === "antall" ? "Antall grupper" : "Antall per gruppe"; $("gt-tall").value = modus() === "antall" ? 4 : 3; info(); }));
    $("gt-tall").addEventListener("input", info);
    $("gt-rollepaa").addEventListener("change", e => { $("gt-rollefelt").hidden = !e.target.checked; if (grupper.length) tegnGrupper(); });
    $("gt-roller").addEventListener("input", () => { if (grupper.length) tegnGrupper(); });
    $("gt-trekk").addEventListener("click", () => trekk(true));
    $("gt-igjen").addEventListener("click", () => trekk(false));
    $("gt-full").addEventListener("click", fullskjerm);
    $("gt-skriv").addEventListener("click", () => window.print());
    $("gt-kopier").addEventListener("click", kopier);
    $("gt-en").addEventListener("click", trekkEn);
    $("gt-oppmote").addEventListener("click", e => {
      const b = e.target.closest(".gt-elev"); if (!b) return;
      const n = b.dataset.navn; if (borte.has(n)) borte.delete(n); else borte.add(n);
      tegnOppmote(); info();
    });
    $("gt-grupper").addEventListener("click", e => {
      const b = e.target.closest(".gt-navn"); if (!b) return;
      const p = [+b.dataset.g, +b.dataset.i];
      if (!merket) { merket = p; tegnGrupper(); return; }
      if (merket[0] !== p[0] || merket[1] !== p[1]) { const [g1, i1] = merket, [g2, i2] = p; [grupper[g1][i1], grupper[g2][i2]] = [grupper[g2][i2], grupper[g1][i1]]; sjekkRegler(); }
      merket = null; tegnGrupper();
      const f = document.querySelector('.gt-navn[data-g="' + p[0] + '"][data-i="' + p[1] + '"]'); if (f) f.focus();
    });
    document.addEventListener("keydown", e => { if (e.key === "Escape" && merket) { merket = null; tegnGrupper(); } });
    info();
  }

  const modus = () => document.querySelector('input[name="gt-modus"]:checked').value;
  function lesNavn() {
    const sett = new Set();
    navn = $("gt-liste").value.split("\n").map(x => x.replace(/[<>]/g, "").trim().slice(0, 30)).filter(x => x && !sett.has(norm(x)) && sett.add(norm(x)));
    borte = new Set([...borte].filter(n => navn.includes(n)));
  }
  const tilStede = () => navn.filter(n => !borte.has(n));
  function tegnOppmote() {
    $("gt-oppmote").innerHTML = navn.length ? '<p class="gt-oppmote-h"><strong>Oppmøte:</strong> Trykk på dem som er borte i dag.</p><div class="gt-elever">' + navn.map(n => '<button type="button" class="gt-elev' + (borte.has(n) ? " gt-borte" : "") + '" data-navn="' + esc(n) + '" aria-pressed="' + borte.has(n) + '">' + esc(n) + (borte.has(n) ? ' <span class="skjult-visuelt">(borte)</span>' : "") + "</button>").join("") + "</div>" : "";
  }
  function storrelser() {
    const n = tilStede().length, t = Math.max(1, Math.min(40, Math.floor(+$("gt-tall").value) || 1));
    const g = modus() === "antall" ? Math.min(t, n) : Math.max(1, Math.floor(n / t));
    if (!n) return [];
    return Array.from({ length: g }, (_, i) => Math.floor(n / g) + (i < n % g ? 1 : 0));
  }
  function info() {
    const s = storrelser(), n = tilStede().length;
    if (!n) { $("gt-info").textContent = "Skriv inn navn for å se hvordan gruppene blir."; return; }
    const min = Math.min(...s), maks = Math.max(...s);
    $("gt-info").textContent = n + " elever" + (borte.size ? " (" + borte.size + " borte)" : "") + " → " + s.length + (s.length === 1 ? " gruppe" : " grupper") + " med " + (min === maks ? min : min + "–" + maks) + (maks === 1 ? " elev" : " elever");
  }

  // Regler: linjer med navn skilt med komma, pluss eller «og»
  function regler(id) {
    return $(id).value.split("\n").map(l => l.split(/\s*(?:,|\+|;|&|\bog\b)\s*/i).map(x => navn.find(n => norm(n) === norm(x))).filter(n => n && !borte.has(n))).filter(l => l.length > 1);
  }
  function ukjenteIRegler() {
    const u = [];
    ["gt-ikke", "gt-sammen"].forEach(id => $(id).value.split("\n").forEach(l => l.split(/\s*(?:,|\+|;|&|\bog\b)\s*/i).forEach(x => { x = x.trim(); if (x && !navn.some(n => norm(n) === norm(x)) && !u.includes(x)) u.push(x); })));
    return u;
  }
  function brudd(gr) {
    let b = 0;
    regler("gt-ikke").forEach(r => gr.forEach(g => { const i = r.filter(n => g.includes(n)).length; if (i > 1) b += i - 1; }));
    regler("gt-sammen").forEach(r => { const hvor = new Set(r.map(n => gr.findIndex(g => g.includes(n)))); b += hvor.size - 1; });
    return b;
  }
  function sjekkRegler() {
    const b = brudd(grupper);
    advarsel = b ? "⚠️ Noen av reglene dine er ikke oppfylt i denne inndelingen." : "";
  }

  function trekk(forste) {
    lesNavn();
    const til = tilStede();
    if (til.length < 2) { $("gt-feil").textContent = "Skriv inn minst to navn (og ikke merk alle som borte)."; return; }
    $("gt-feil").textContent = "";
    const s = storrelser();
    // Klynger for «skal være sammen» (union-find)
    const forelder = new Map(til.map(n => [n, n]));
    const rot = n => { while (forelder.get(n) !== n) n = forelder.get(n); return n; };
    regler("gt-sammen").forEach(r => r.slice(1).forEach(n => forelder.set(rot(n), rot(r[0]))));
    const klynger = new Map(); til.forEach(n => { const r = rot(n); if (!klynger.has(r)) klynger.set(r, []); klynger.get(r).push(n); });
    const ikke = regler("gt-ikke");
    const konflikt = (g, k) => ikke.some(r => r.some(a => k.includes(a)) && r.some(b => g.includes(b) && !k.includes(b)));
    let best = null, bestB = Infinity;
    for (let forsok = 0; forsok < 400 && bestB > 0; forsok++) {
      const gr = s.map(() => []);
      const ks = stokk([...klynger.values()]).sort((a, b) => b.length - a.length);
      ks.forEach(k => {
        const plass = gr.map((g, i) => ({ i, ledig: s[i] - g.length, konf: konflikt(g, k) }));
        const pass = plass.filter(p => p.ledig >= k.length && !p.konf);
        const valg = pass.length ? pass : plass.filter(p => !p.konf).length ? plass.filter(p => !p.konf) : plass;
        const maks = Math.max(...valg.map(p => p.ledig)), topp = valg.filter(p => p.ledig === maks);
        gr[topp[tilfeldig(topp.length)].i].push(...stokk(k));
      });
      const b = brudd(gr) * 10 + gr.reduce((sum, g, i) => sum + Math.abs(g.length - s[i]), 0);
      if (b < bestB) { bestB = b; best = gr; }
    }
    grupper = best.map(g => stokk(g)); merket = null;
    sjekkRegler();
    const u = ukjenteIRegler(); if (u.length) advarsel = (advarsel ? advarsel + " " : "") + "Finner ikke " + u.map(x => "«" + x + "»").join(", ") + " i navnelista.";
    $("gt-resultat").hidden = false;
    tegnGrupper(true);
    if (forste) $("gt-resultat").scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
  }

  function roller() { return $("gt-rollepaa").checked ? $("gt-roller").value.split("\n").map(x => x.trim()).filter(Boolean) : []; }
  function tegnGrupper(animer) {
    const r = roller();
    $("gt-advarsel").textContent = advarsel;
    $("gt-grupper").innerHTML = grupper.map((g, gi) => '<section class="gt-gruppe' + (animer ? " gt-inn" : "") + '" style="--gi:' + gi + '"><h3>Gruppe ' + (gi + 1) + '</h3><ol>' +
      g.map((n, i) => '<li><button type="button" class="gt-navn' + (merket && merket[0] === gi && merket[1] === i ? " gt-merket" : "") + '" data-g="' + gi + '" data-i="' + i + '" aria-pressed="' + !!(merket && merket[0] === gi && merket[1] === i) + '">' + esc(n) + (r[i] ? ' <span class="gt-rolle">' + esc(r[i]) + "</span>" : "") + "</button></li>").join("") + "</ol></section>").join("");
  }
  function tekst() { const r = roller(); return grupper.map((g, i) => "Gruppe " + (i + 1) + ": " + g.map((n, j) => n + (r[j] ? " (" + r[j] + ")" : "")).join(", ")).join("\n"); }
  async function kopier() {
    try { await navigator.clipboard.writeText(tekst()); $("gt-kopier").textContent = "✔ Kopiert"; }
    catch (e) { $("gt-kopier").textContent = "Kunne ikke kopiere"; }
    setTimeout(() => { $("gt-kopier").textContent = "📋 Kopier"; }, 1800);
  }
  function fullskjerm() {
    const el = $("gt-resultat");
    if (document.fullscreenElement) { document.exitFullscreen(); return; }
    if (el.requestFullscreen) el.requestFullscreen().catch(() => el.classList.toggle("gt-tavle"));
    else el.classList.toggle("gt-tavle");
  }

  let trukket = [];
  function trekkEn() {
    lesNavn();
    let pott = tilStede();
    if ($("gt-unik").checked) { pott = pott.filter(n => !trukket.includes(n)); if (!pott.length) { trukket = []; pott = tilStede(); } }
    if (!pott.length) { $("gt-trukket").textContent = "Skriv inn navn først."; return; }
    const n = pott[tilfeldig(pott.length)]; trukket.push(n);
    const el = $("gt-trukket");
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { el.innerHTML = "<strong>" + esc(n) + "</strong>"; return; }
    let k = 0; const alle = tilStede();
    const t = setInterval(() => { el.innerHTML = '<span class="gt-rull">' + esc(alle[tilfeldig(alle.length)]) + "</span>"; if (++k > 12) { clearInterval(t); el.innerHTML = "<strong>" + esc(n) + "</strong>" + ($("gt-unik").checked ? ' <span class="rv-merk">(' + trukket.length + " av " + tilStede().length + " trukket)</span>" : ""); } }, 70);
  }

  document.addEventListener("DOMContentLoaded", side);
})();
