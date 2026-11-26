/* =========================================================
   Les verden – Klassekart (klassekart.html)
   Hjelp til å lage klassekart: velg oppsett (par, grupper, hestesko,
   rader, dobbel hestesko), plasser tavle, lærerpult, dør og vinduer,
   skriv inn elevene og reglene («ikke ved siden av hverandre», «langt
   fra hverandre», «skal sitte sammen», «foran», «ikke ved dør/vindu»).
   Verktøyet fordeler elevene med en optimalisering som prøver å
   oppfylle alle reglene. Læreren kan bytte, låse og fjerne pulter.
   Ingenting lagres i nettleseren – kartet kan lastes ned som fil.
   ========================================================= */
(function () {
  const LV = window.LV;
  const $ = id => document.getElementById(id);
  const esc = s => LV.esc(String(s == null ? "" : s));
  const norm = s => String(s || "").trim().toLocaleLowerCase("nb");
  const tilfeldig = n => { const a = new Uint32Array(1); crypto.getRandomValues(a); return a[0] % n; };

  const OPPSETT = {
    par: { navn: "Par – rader med to og to", ikon: "👥", best: "Blandet undervisning, makkerarbeid og individuelt arbeid", pluss: "Alle ser mot tavla, og det er lett å gå fra tavleundervisning til «snakk med sidemannen».", minus: "Mindre naturlig for gruppearbeid med fire." },
    trio: { navn: "Trio – rader med tre og tre", ikon: "👨‍👩‍👦", best: "Makkerarbeid i små grupper, samtidig som alle ser tavla", pluss: "Tre kan hjelpe hverandre, og alle sitter med ansiktet mot tavla.", minus: "Eleven i midten får lett to å prate med, og bordene tar litt mer plass i bredden." },
    grupper: { navn: "Grupper – bord på fire eller seks", ikon: "🧩", best: "Samarbeid, prosjekter, læringspar og aktiv læring", pluss: "Fremmer samarbeid og sparer gulvplass.", minus: "Noen sitter med ryggen til tavla, og det blir lettere mer prat." },
    hestesko: { navn: "Hestesko / U-form", ikon: "🧲", best: "Klassesamtaler, sokratiske samtaler og demonstrasjoner", pluss: "Alle ser tavla og hverandre, og læreren kan gå fritt i midten.", minus: "Tar mye plass – vanskelig med mer enn 20–24 elever." },
    rader: { navn: "Tradisjonelle rader – enkeltpulter", ikon: "🪑", best: "Tavleundervisning, prøver og stille individuelt arbeid", pluss: "Gir plass til flest elever og minst forstyrrelser fra sidemannen.", minus: "Lite samhandling mellom elevene." },
    blokker: { navn: "Rader i blokker – venstre, midten og høyre", ikon: "🧱", best: "Rom med ujevn plass, faste bord eller midtgang", pluss: "Du bestemmer selv hvor mange pulter som står ved siden av hverandre og hvor mange rader det er i hver del av rommet.", minus: "Antall plasser er fast – legg til rader eller pulter hvis det ikke er plass til alle." },
    dobbel: { navn: "Dobbel hestesko", ikon: "🎯", best: "Store klasser som har mye klassesamtale", pluss: "Plass til mange, og alle vender seg mot midten og tavla.", minus: "Den indre raden kan stenge for dem som sitter i den ytre." }
  };

  // ---------- Tilstand ----------
  let drag = null, ignorerKlikk = false, elever = [], seter = [], av = new Set(), plass = [], laast = new Set(), valgt = null, valgtElev = null, redigerer = false, rom = null, rapport = [];
  const o = { type: "par", perRad: 3, gruppe: 4, ekstra: 0, v: 2, m: 3, h: 2, vR: 5, mR: 5, hR: 5, flytt: "bord", egne: false, pult: "midten", dor: "hoyre-foran", vindu: "venstre", visning: "elev" };

  // ---------- Side ----------
  function side() {
    document.title = "Klassekart – " + (LV.config ? LV.config.navn : "Les verden");
    $("innhold").innerHTML = '<nav class="brodsmuler" aria-label="Brødsmuler"><a href="index.html">Forside</a> › <a href="laerer.html">For lærere</a> › Klassekart</nav>' +
      '<header class="sidehode"><p class="overlinje">For lærere · i klasserommet</p><h1>🗺️ Klassekart</h1><p class="ingress">Velg hvordan pultene står, skriv inn elevene og hvem som ikke bør sitte sammen – så lager verktøyet et forslag til klassekart. Bytt og lås plasser selv, og skriv ut eller vis kartet på tavla.</p></header>' +
      '<div class="kk-oppsett">' +
      // 1. Elever
      '<section class="kk-boks" aria-labelledby="kk-h1"><h2 id="kk-h1">1. Elever</h2><label class="cs-felt" for="kk-liste">Ett navn per linje<textarea id="kk-liste" rows="10" spellcheck="false" placeholder="Ada\nBo\nCy\n…"></textarea></label><p class="rv-merk" id="kk-antall"></p>' +
      '<details class="kk-regler" open><summary>⚙️ Regler <span class="rv-merk">(vises ikke på kartet)</span></summary><p class="rv-merk">Én regel per linje. Skill navnene med komma, for eksempel <code>Per, Kari</code>.</p>' +
      felt("kk-ikke", "🚫 Skal ikke sitte ved siden av hverandre", "Plasseres ikke som sidemann eller i samme gruppe, og helst ikke rett foran eller bak.") +
      felt("kk-langt", "↔️ Bør sitte langt fra hverandre", "Plasseres så langt fra hverandre som mulig.") +
      felt("kk-sammen", "🤝 Skal sitte sammen", "Plasseres som sidemann eller i samme gruppe.") +
      felt("kk-foran", "⬆️ Bør sitte foran", "Nær tavla og læreren – for eksempel elever med IOP, syns- eller hørselsbehov eller som trenger hjelp med konsentrasjonen. Skriv navnene med komma.") +
      felt("kk-dorvindu", "🚪 Bør ikke sitte ved dør eller vindu", "Færre forstyrrelser. Skriv navnene med komma.") +
      "</details></section>" +
      // 2. Rommet
      '<section class="kk-boks" aria-labelledby="kk-h2"><h2 id="kk-h2">2. Klasserommet</h2>' +
      '<fieldset class="kk-typer"><legend>Oppsett</legend>' + Object.entries(OPPSETT).map(([k, v]) => '<label><input type="radio" name="kk-type" value="' + k + '"' + (k === o.type ? " checked" : "") + '> <span aria-hidden="true">' + v.ikon + "</span> " + esc(v.navn) + "</label>").join("") + "</fieldset>" +
      '<div class="kk-typeinfo" id="kk-typeinfo" aria-live="polite"></div>' +
      '<div class="kk-tall" id="kk-param"></div>' +
      '<div class="kk-tall"><label class="cs-felt" for="kk-pult">Lærerpult<select id="kk-pult"><option value="venstre">Foran til venstre</option><option value="midten" selected>Foran på midten</option><option value="hoyre">Foran til høyre</option><option value="ingen">Ingen</option></select></label>' +
      '<label class="cs-felt" for="kk-dor">Dør<select id="kk-dor"><option value="venstre-foran">Venstre vegg, foran</option><option value="venstre-bak">Venstre vegg, bak</option><option value="hoyre-foran" selected>Høyre vegg, foran</option><option value="hoyre-bak">Høyre vegg, bak</option><option value="bak">Bakveggen</option></select></label>' +
      '<label class="cs-felt" for="kk-vindu">Vinduer<select id="kk-vindu"><option value="venstre" selected>Venstre vegg</option><option value="hoyre">Høyre vegg</option><option value="bak">Bakveggen</option><option value="ingen">Ingen</option></select></label></div>' +
      '<details class="kk-hjelp"><summary>🤔 Hjelp meg å velge oppsett</summary><div class="kk-tall"><label class="cs-felt" for="kk-q-pult">Hva slags pulter har du?<select id="kk-q-pult"><option value="enkel">Enkeltpulter</option><option value="to">Bord for to</option><option value="gruppe">Grupper / runde bord</option></select></label>' +
      '<label class="cs-felt" for="kk-q-stil">Hvordan underviser du mest?<select id="kk-q-stil"><option value="blanding">En blanding</option><option value="gruppe">Mye gruppearbeid</option><option value="tavle">Mye tavleundervisning og prøver</option><option value="samtale">Mye klassesamtale</option></select></label></div><p id="kk-forslag" class="kk-forslag" aria-live="polite"></p></details>' +
      '<p class="mu-knapper"><button type="button" class="knapp hoved kk-stor" id="kk-lag">🗺️ Lag klassekart</button></p><p class="rv-feil" id="kk-feil" role="alert"></p></section></div>' +
      // Kartet
      '<section class="kk-kartdel" id="kk-kartdel" aria-labelledby="kk-kh"><div class="kk-topp"><h2 id="kk-kh">Klassekartet</h2><p class="mu-knapper">' +
      '<button type="button" class="knapp" id="kk-nytt">🔁 Nytt forslag</button><button type="button" class="knapp" id="kk-snu" aria-pressed="false">🔄 Lærerens visning</button><button type="button" class="knapp" id="kk-rediger" aria-pressed="false">✏️ Endre pulter</button><button type="button" class="knapp" id="kk-full">⛶ Vis på tavla</button><button type="button" class="knapp" id="kk-skriv">🖨️ Skriv ut</button></p></div>' +
      '<div class="kk-handling" id="kk-handling" aria-live="polite"></div>' +
      '<div class="kk-utenplass" id="kk-utenplass"></div>' +
      '<div class="kk-rom" id="kk-rom"></div>' +
      '<div class="kk-rapport" id="kk-rapport" aria-live="polite"></div>' +
      '<p class="mu-knapper kk-fil"><button type="button" class="knapp liten" id="kk-last">💾 Last ned klassekartet</button><label class="knapp liten kk-apne">📂 Åpne lagret klassekart<input type="file" id="kk-fil" accept=".json,application/json" class="skjult-visuelt"></label></p>' +
      '<p class="rv-merk">Les verden lagrer ingenting. Vil du bruke kartet igjen, last det ned som fil. Filen inneholder navn og regler – lagre den et trygt sted, for eksempel på skolens område.</p></section>' +
      '<section class="le-del" aria-labelledby="kk-th"><h2 id="kk-th">💡 Tips for alle oppsett</h2><ul class="kk-tips"><li><strong>Sikt mot tavla.</strong> Ingen skal måtte vri seg for å se tavla eller skjermen.</li><li><strong>Frie gangveier.</strong> Hold veien til døra, søppelkassa og hyllene bred nok, så det ikke blir kø.</li><li><strong>Tenk gjennom støtteplassene.</strong> Elever med IOP, syns- eller hørselsbehov eller som trenger hjelp med konsentrasjonen, bør sitte nær der du underviser og borte fra dør og vinduer.</li><li><strong>Velg oppsett etter mål.</strong> Grupper fungerer best for samarbeid, rader eller hestesko best for tavleundervisning og samtale. Når oppsettet passer måten elevene jobber på, går overgangene lettere, og det blir mindre uro.</li></ul>' +
      '<div class="sg-tabell-wrap" tabindex="0" role="region" aria-label="Oversikt over oppsett"><table class="sg-tabell kk-oversikt"><caption class="skjult-visuelt">Oversikt over oppsett</caption><thead><tr><th scope="col">Oppsett</th><th scope="col">Best til</th><th scope="col">Fordeler</th><th scope="col">Ulemper</th></tr></thead><tbody>' + Object.values(OPPSETT).map(v => '<tr><th scope="row">' + v.ikon + " " + esc(v.navn) + "</th><td>" + esc(v.best) + "</td><td>" + esc(v.pluss) + "</td><td>" + esc(v.minus) + "</td></tr>").join("") + "</tbody></table></div></section>";

    $("kk-liste").addEventListener("input", () => { lesElever(); tegnAlt(); });
    document.querySelectorAll('input[name="kk-type"]').forEach(r => r.addEventListener("change", () => { o.type = r.value; o.perRad = { par: 3, trio: 2, grupper: 3, rader: 6 }[o.type] || 0; typeinfo(); byggRom(true); }));
    ["kk-pult", "kk-dor", "kk-vindu"].forEach(id => $(id).addEventListener("change", e => { o[id.slice(3)] = e.target.value; byggRom(false); }));
    $("kk-param").addEventListener("change", e => { const t = e.target; if (t.dataset.o) { o[t.dataset.o] = Math.max(+t.min || 0, Math.min(+t.max || 99, Math.floor(+t.value) || 0)); t.value = o[t.dataset.o]; byggRom(true); } });
    ["kk-q-pult", "kk-q-stil"].forEach(id => $(id).addEventListener("change", foreslaa));
    $("kk-forslag").addEventListener("click", e => { const b = e.target.closest("[data-bruk]"); if (!b) return; const r = document.querySelector('input[name="kk-type"][value="' + b.dataset.bruk + '"]'); r.checked = true; r.dispatchEvent(new Event("change")); r.focus(); });
    $("kk-lag").addEventListener("click", () => { lag(true); });
    $("kk-nytt").addEventListener("click", () => lag(false));
    $("kk-snu").addEventListener("click", () => { o.visning = o.visning === "elev" ? "laerer" : "elev"; $("kk-snu").setAttribute("aria-pressed", o.visning === "laerer"); tegnRom(); });
    $("kk-rediger").addEventListener("click", () => { redigerer = !redigerer; valgt = valgtElev = null; $("kk-rediger").setAttribute("aria-pressed", redigerer); $("kk-rediger").textContent = redigerer ? "✔ Ferdig med pultene" : "✏️ Endre pulter"; tegnAlt(); });
    $("kk-full").addEventListener("click", () => { const el = $("kk-kartdel"); if (document.fullscreenElement) document.exitFullscreen(); else if (el.requestFullscreen) el.requestFullscreen().catch(() => {}); });
    document.addEventListener("fullscreenchange", () => { $("kk-full").textContent = document.fullscreenElement ? "✕ Lukk fullskjerm" : "⛶ Vis på tavla"; });
    $("kk-skriv").addEventListener("click", () => window.print());
    $("kk-last").addEventListener("click", lastNed);
    $("kk-fil").addEventListener("change", apne);
    $("kk-rom").addEventListener("click", e => { if (ignorerKlikk) { ignorerKlikk = false; return; } const b = e.target.closest(".kk-sete"); if (b) klikkSete(+b.dataset.i); });
    $("kk-utenplass").addEventListener("click", e => { const b = e.target.closest(".kk-chip"); if (!b) return; valgtElev = valgtElev === b.dataset.navn ? null : b.dataset.navn; valgt = null; tegnAlt(); });
    $("kk-handling").addEventListener("click", e => {
      const b = e.target.closest("button"); if (!b) return;
      if (b.dataset.h === "laas" && valgt != null) { if (laast.has(valgt)) laast.delete(valgt); else laast.add(valgt); valgt = null; }
      else if (b.dataset.h === "fjern" && valgt != null) { plass[valgt] = null; laast.delete(valgt); valgt = null; }
      else if (b.dataset.h === "avbryt") { valgt = valgtElev = null; }
      else if (b.dataset.h === "allepulter") { av.clear(); }
      else if (b.dataset.h === "pultav" && valgt != null) { if (av.has(valgt)) av.delete(valgt); else { av.add(valgt); plass[valgt] = null; laast.delete(valgt); } rapport = sjekk(); }
      else if (b.dataset.h === "nypult") {
        const maxY = Math.max(...seter.map(q => q.y + q.h)), fri = seter.filter(q => q.y + q.h > maxY - .1).reduce((m, q) => Math.max(m, q.x + q.w), 0);
        const x = fri + 1.2 < rom.W - .2 ? fri + .4 : rom.W / 2 - .5, y = fri + 1.2 < rom.W - .2 ? maxY - .75 : maxY + .7;
        seter.push({ x, y, w: 1, h: .75, k: "x" + Date.now() }); plass.push(null); valgt = seter.length - 1; o.egne = true; byggRom(false); return;
      }
      else if (b.dataset.h === "nullstill") { o.egne = false; byggRom(true); return; }
      tegnAlt();
    });
    ["kk-ikke", "kk-langt", "kk-sammen", "kk-foran", "kk-dorvindu"].forEach(id => $(id).addEventListener("input", () => { rapport = sjekk(); tegnRapport(); }));
    $("kk-handling").addEventListener("change", e => { if (e.target.name === "kk-flytt") o.flytt = e.target.value; });
    document.addEventListener("keydown", e => { if (e.key === "Escape" && (valgt != null || valgtElev)) { valgt = valgtElev = null; tegnAlt(); } });
    typeinfo(); foreslaa(); lesElever(); byggRom(true);
    // Dra og slipp
    const romEl = $("kk-rom");
    romEl.addEventListener("pointerdown", e => {
      const b = e.target.closest(".kk-sete"); if (!b || e.button > 0) return;
      const i = +b.dataset.i; if (!redigerer && (!plass[i] || av.has(i))) return;
      const gruppe = redigerer && o.flytt === "bord" ? seter.map((q, j) => j).filter(j => seter[j].k === seter[i].k) : [i];
      drag = { i, b, x0: e.clientX, y0: e.clientY, flyttet: false, gruppe, start: gruppe.map(j => [seter[j].x, seter[j].y]), mal: null };
      try { b.setPointerCapture(e.pointerId); } catch (x) { /* ignorer */ }
    });
    romEl.addEventListener("pointermove", e => {
      if (!drag) return;
      const dxp = e.clientX - drag.x0, dyp = e.clientY - drag.y0;
      if (!drag.flyttet && Math.hypot(dxp, dyp) < 7) return;
      drag.flyttet = true; e.preventDefault();
      if (redigerer) {
        const enhet = romEl.querySelector(".kk-flate").getBoundingClientRect().width / rom.W, snu = o.visning === "laerer" ? -1 : 1;
        const du = Math.round(dxp / enhet * snu * 4) / 4, dv = Math.round(dyp / enhet * snu * 4) / 4;
        drag.gruppe.forEach((j, n) => { const q = seter[j]; q.x = Math.max(-1.5, Math.min(rom.W - q.w + 1.5, drag.start[n][0] + du)); q.y = Math.max(1.95, drag.start[n][1] + dv); const el = romEl.querySelector('.kk-sete[data-i="' + j + '"]'); if (el) el.setAttribute("style", P(q.x, q.y, q.w, q.h)); });
      } else {
        drag.b.classList.add("kk-drar"); drag.b.style.transform = "translate(" + dxp + "px," + dyp + "px)";
        const mal = document.elementsFromPoint(e.clientX, e.clientY).map(x => x.closest && x.closest(".kk-sete")).find(x => x && x !== drag.b && !x.classList.contains("kk-av"));
        romEl.querySelectorAll(".kk-mal").forEach(x => x.classList.remove("kk-mal"));
        drag.mal = mal ? +mal.dataset.i : null; if (mal) mal.classList.add("kk-mal");
      }
    });
    const slipp = e => {
      if (!drag) return; const d = drag; drag = null;
      if (!d.flyttet) return;
      ignorerKlikk = true; setTimeout(() => { ignorerKlikk = false; }, 0);
      if (e.type === "pointercancel") { tegnRom(); return; }
      if (redigerer) { o.egne = true; valgt = d.i; byggRom(false); }
      else { if (d.mal != null) bytt(d.i, d.mal); valgt = null; rapport = sjekk(); tegnAlt(); }
    };
    romEl.addEventListener("pointerup", slipp); romEl.addEventListener("pointercancel", slipp);
    romEl.addEventListener("keydown", e => {
      if (!redigerer || valgt == null || !/^Arrow/.test(e.key) || !e.target.closest(".kk-sete")) return;
      e.preventDefault();
      const snu = o.visning === "laerer" ? -1 : 1, st = .25 * snu, [du, dv] = { ArrowLeft: [-st, 0], ArrowRight: [st, 0], ArrowUp: [0, -st], ArrowDown: [0, st] }[e.key];
      const gr = o.flytt === "bord" ? seter.map((q, j) => j).filter(j => seter[j].k === seter[valgt].k) : [valgt];
      gr.forEach(j => { seter[j].x += du; seter[j].y = Math.max(1.95, seter[j].y + dv); });
      o.egne = true; const v = valgt; byggRom(false); const f = romEl.querySelector('.kk-sete[data-i="' + v + '"]'); if (f) f.focus();
    });
  }
  function felt(id, tittel, hjelp) {
    return '<label class="cs-felt" for="' + id + '"><span>' + tittel + '</span><span class="gt-hjelp">' + esc(hjelp) + '</span><textarea id="' + id + '" rows="2" spellcheck="false"></textarea></label>';
  }
  function typeinfo() {
    const v = OPPSETT[o.type];
    $("kk-typeinfo").innerHTML = "<p><strong>Best til:</strong> " + esc(v.best) + '</p><p><span class="kk-pluss">＋</span> ' + esc(v.pluss) + '</p><p><span class="kk-minus">−</span> ' + esc(v.minus) + "</p>";
    $("kk-param").innerHTML =
      (o.type === "rader" ? tall("perRad", "Pulter per rad", 2, 12) : "") +
      (o.type === "par" ? tall("perRad", "Par per rad", 1, 6) : "") +
      (o.type === "trio" ? tall("perRad", "Trioer per rad", 1, 4) : "") +
      (o.type === "blokker" ? '<div class="kk-blokker" role="group" aria-label="Blokker"><span></span><span>Venstre</span><span>Midten</span><span>Høyre</span><span>Pulter ved siden av hverandre</span>' + ["v", "m", "h"].map(k => tallInn(k, 0, 8, { v: "Venstre", m: "Midten", h: "Høyre" }[k] + ": pulter ved siden av hverandre")).join("") + "<span>Antall rader</span>" + ["vR", "mR", "hR"].map(k => tallInn(k, 1, 12, { vR: "Venstre", mR: "Midten", hR: "Høyre" }[k] + ": antall rader")).join("") + '</div><p class="rv-merk" id="kk-kapasitet"></p>' : "") +
      (o.type === "grupper" ? tall("perRad", "Grupper per rad", 1, 6) + '<label class="cs-felt" for="kk-p-gruppe">Elever per gruppe<select id="kk-p-gruppe" data-o="gruppe"><option value="4"' + (o.gruppe === 4 ? " selected" : "") + '>4 (2 × 2)</option><option value="6"' + (o.gruppe === 6 ? " selected" : "") + ">6 (3 × 2)</option></select></label>" : "") +
      (o.type === "blokker" ? "" : tall("ekstra", "Ekstra ledige pulter", 0, 20));
  }
  const tallInn = (k, min, max, navn) => '<input type="number" data-o="' + k + '" min="' + min + '" max="' + max + '" value="' + o[k] + '" inputmode="numeric" aria-label="' + esc(navn) + '">';
  const tall = (k, t, min, max) => '<label class="cs-felt" for="kk-p-' + k + '">' + t + '<input type="number" id="kk-p-' + k + '" data-o="' + k + '" min="' + min + '" max="' + max + '" value="' + o[k] + '" inputmode="numeric"></label>';
  function foreslaa() {
    const p = $("kk-q-pult").value, s = $("kk-q-stil").value, n = elever.length || 24;
    let t = p === "gruppe" || s === "gruppe" ? "grupper" : s === "samtale" ? (n <= 24 ? "hestesko" : "dobbel") : s === "tavle" ? (p === "to" ? "par" : "rader") : "par";
    const grunn = { grupper: "Dere jobber mye sammen, og gruppebord gjør samarbeid lett.", hestesko: "Alle ser hverandre i samtalen, og med " + n + " elever er det plass til en enkel hestesko.", dobbel: "Med " + n + " elever blir en enkel hestesko for stor – en dobbel gir plass til alle og beholder samtalen.", rader: "Rader gir ro og minst forstyrrelser ved tavleundervisning og prøver.", par: "Par passer til en blanding: alle ser tavla, og det er lett å snakke med sidemannen." }[t];
    $("kk-forslag").innerHTML = "Forslag: <strong>" + OPPSETT[t].ikon + " " + esc(OPPSETT[t].navn) + "</strong>. " + esc(grunn) + ' <button type="button" class="knapp liten" data-bruk="' + t + '">Bruk dette</button>';
  }

  function lesElever() {
    const sett = new Set();
    elever = $("kk-liste").value.split("\n").map(x => x.replace(/[<>]/g, "").trim().slice(0, 30)).filter(x => x && !sett.has(norm(x)) && sett.add(norm(x)));
    plass = plass.map(n => n && elever.includes(n) ? n : null);
    if (valgtElev && !elever.includes(valgtElev)) valgtElev = null;
    $("kk-antall").textContent = elever.length ? elever.length + " elever" : "";
    foreslaa();
  }

  // ---------- Geometri ----------
  // Enhet: én pult er ca. 1 bred. Alle seter: { x, y, w, h, k } (k = bord/gruppe-id)
  function lagSeter() {
    const n = Math.max(elever.length || 24, 2) + (o.ekstra || 0), s = [];
    if (o.type === "rader") {
      const c = Math.max(2, o.perRad); for (let i = 0; i < n; i++) s.push({ x: (i % c) * 1.55, y: Math.floor(i / c) * 1.5, w: 1, h: .75, k: "s" + i });
    } else if (o.type === "par") {
      const c = Math.max(1, o.perRad); for (let i = 0; i < n; i++) { const p = Math.floor(i / 2), kol = p % c, rad = Math.floor(p / c); s.push({ x: kol * 2.9 + (i % 2), y: rad * 1.55, w: 1, h: .75, k: "p" + p }); }
    } else if (o.type === "trio") {
      const c = Math.max(1, o.perRad); for (let i = 0; i < n; i++) { const p = Math.floor(i / 3), kol = p % c, rad = Math.floor(p / c); s.push({ x: kol * 3.9 + (i % 3), y: rad * 1.55, w: 1, h: .75, k: "t" + p }); }
    } else if (o.type === "blokker") {
      let x0 = 0;
      [["v", "vR"], ["m", "mR"], ["h", "hR"]].forEach(([b, r]) => { const w = o[b]; if (!w) return; for (let rad = 0; rad < o[r]; rad++) for (let j = 0; j < w; j++) s.push({ x: x0 + j, y: rad * 1.55, w: 1, h: .75, k: b + rad }); x0 += w + 1.5; });
      if (!s.length) s.push({ x: 0, y: 0, w: 1, h: .75, k: "x0" });
    } else if (o.type === "grupper") {
      const g = o.gruppe, kol = g / 2, c = Math.max(1, o.perRad);
      for (let i = 0; i < n; i++) { const p = Math.floor(i / g), j = i % g, px = (p % c) * (kol + 1.4), py = Math.floor(p / c) * 2.9; s.push({ x: px + (j % kol), y: py + Math.floor(j / kol) * .8, w: 1, h: .8, k: "g" + p }); }
    } else if (o.type === "hestesko") {
      const b = Math.max(2, Math.round(n * .4)), si = Math.ceil((n - b) / 2);
      u(s, 0, 0, si, b, "u");
    } else {
      let so = 3, bo = 4;
      const kap = () => 2 * so + bo + 2 * Math.max(1, so - 2) + Math.max(1, bo - 4);
      while (kap() < n) { so++; bo = Math.round(so * 1.4) + 1; }
      u(s, 0, 0, so, bo, "y");
      u(s, 1.95, 0, Math.max(1, so - 2), Math.max(1, bo - 4), "i");
    }
    return s;
  }
  // U-form: venstre side (si seter), bakrad (b), høyre side (si). Åpner seg mot tavla (oppover).
  function u(s, x0, y0, si, b, k) {
    for (let i = 0; i < si; i++) s.push({ x: x0, y: y0 + i * 1.05, w: .75, h: 1, k: k + "v" + i });
    for (let j = 0; j < b; j++) s.push({ x: x0 + .95 + j * 1.05, y: y0 + si * 1.05 + .15, w: 1, h: .75, k: k + "b" + j });
    for (let i = 0; i < si; i++) s.push({ x: x0 + .95 + b * 1.05 + .2, y: y0 + i * 1.05, w: .75, h: 1, k: k + "h" + i });
  }
  function byggRom(nyeSeter) {
    if (nyeSeter) {
      o.egne = false;
      const gamle = plass.filter(Boolean);
      seter = lagSeter(); av = new Set(); laast = new Set(); valgt = null;
      plass = seter.map((_, i) => gamle[i] || null);
    }
    // Rommets mål: seter forskyves inn, med plass foran til tavle og lærerpult
    const pad = .9, foran = 2.7;
    const minX = Math.min(...seter.map(q => q.x)), maxX = Math.max(...seter.map(q => q.x + q.w)), minY = Math.min(...seter.map(q => q.y)), maxY = Math.max(...seter.map(q => q.y + q.h));
    const bredde = Math.max(maxX - minX + 2 * pad, 7), dx = (bredde - (maxX - minX)) / 2 - minX;
    seter.forEach(q => { q.x += dx; q.y += foran - minY; q.cx = q.x + q.w / 2; q.cy = q.y + q.h / 2; });
    const H = foran + (maxY - minY) + pad + .4;
    rom = { W: bredde, H };
    rom.dor = { "venstre-foran": [0, foran - .6], "venstre-bak": [0, H - 1.6], "hoyre-foran": [bredde, foran - .6], "hoyre-bak": [bredde, H - 1.6], bak: [bredde - 1.8, H] }[o.dor];
    rom.dorKant = o.dor === "bak" ? "bak" : o.dor.split("-")[0];
    const fy = seter.map(q => q.cy), lo = Math.min(...fy), hi = Math.max(...fy);
    seter.forEach(q => { q.foran = hi > lo ? (q.cy - lo) / (hi - lo) : 0; });
    rapport = sjekk(); tegnAlt();
    const k = $("kk-kapasitet"); if (k) { const pl = seter.length - av.size, n = elever.length; k.textContent = pl + " plasser" + (n ? (pl < n ? " – " + (n - pl) + " for få til " + n + " elever!" : " til " + n + " elever") : ""); k.classList.toggle("rv-feil", pl < n); }
  }

  // ---------- Regler og kostnad ----------
  function regel(id) {
    return $(id).value.split("\n").map(l => [...new Set(l.split(/\s*(?:,|\+|;|&|\bog\b)\s*/i).map(x => elever.find(n => norm(n) === norm(x))).filter(Boolean))]).filter(l => l.length);
  }
  const par = l => { const r = []; l.forEach(g => g.forEach((a, i) => g.slice(i + 1).forEach(b => r.push([a, b])))); return r; };
  const avst = (a, b) => Math.hypot(a.cx - b.cx, a.cy - b.cy);
  const naboer = (a, b) => (a.k === b.k) || avst(a, b) <= 1.2 || (Math.abs(a.cy - b.cy) < .3 && Math.abs(a.cx - b.cx) <= 1.65);
  const naer = (a, b) => avst(a, b) <= 2.3;
  function reglene() {
    return { ikke: par(regel("kk-ikke")), langt: par(regel("kk-langt")), sammen: par(regel("kk-sammen")), foran: new Set(regel("kk-foran").flat()), dv: new Set(regel("kk-dorvindu").flat()) };
  }
  function vedDorVindu(q) {
    const [dx, dy] = rom.dor; let v = Math.hypot(q.cx - dx, q.cy - dy) < 2.4;
    if (o.vindu === "venstre") v = v || q.x < 1.5; else if (o.vindu === "hoyre") v = v || q.x + q.w > rom.W - 1.5; else if (o.vindu === "bak") v = v || q.y + q.h > rom.H - 1.5;
    return v;
  }
  function kostnad(pos, R, L) {
    let c = 0;
    const s = n => seter[pos.get(n)];
    R.ikke.forEach(([a, b]) => { const A = s(a), B = s(b); if (!A || !B) return; if (naboer(A, B)) c += 100; else if (naer(A, B)) c += 22; });
    R.langt.forEach(([a, b]) => { const A = s(a), B = s(b); if (!A || !B) return; const d = avst(A, B); if (d < L) c += 70 * (1 - d / L); if (naboer(A, B)) c += 60; });
    R.sammen.forEach(([a, b]) => { const A = s(a), B = s(b); if (!A || !B) return; if (!naboer(A, B)) c += 60 + 4 * avst(A, B); });
    R.foran.forEach(a => { const A = s(a); if (A) c += 70 * Math.max(0, A.foran - .2) + 4 * A.foran; });
    R.dv.forEach(a => { const A = s(a); if (A && vedDorVindu(A)) c += 35; });
    pos.forEach(i => { c += .6 * seter[i].foran; }); // fyll forfra
    return c;
  }
  function lag(forste) {
    lesElever();
    if (!elever.length) { $("kk-feil").textContent = "Skriv inn elevene først – ett navn per linje."; $("kk-liste").focus(); return; }
    $("kk-feil").textContent = "";
    const aktive = seter.map((_, i) => i).filter(i => !av.has(i));
    if (aktive.length < elever.length) {
      if (o.type === "blokker" || o.egne || av.size) { $("kk-feil").textContent = "Det er bare " + aktive.length + " pulter til " + elever.length + " elever. Legg til rader eller pulter (eller sett tilbake fjernede pulter)."; return; }
      byggRom(true); return lag(forste);
    }
    const R = reglene(), L = Math.max(3, Math.hypot(rom.W, rom.H) * .55);
    const laste = new Map(); laast.forEach(i => { if (plass[i] && !av.has(i)) laste.set(plass[i], i); });
    const fri = aktive.filter(i => !laast.has(i) || !plass[i]), los = elever.filter(n => !laste.has(n));
    let best = null, bestC = Infinity;
    for (let start = 0; start < 6; start++) {
      const pl = fri.slice(); for (let i = pl.length - 1; i > 0; i--) { const j = tilfeldig(i + 1); [pl[i], pl[j]] = [pl[j], pl[i]]; }
      const pos = new Map(laste); los.forEach((n, i) => pos.set(n, pl[i]));
      const ledig = pl.slice(los.length);
      let c = kostnad(pos, R, L);
      const steg = 6000;
      for (let t = 0; t < steg && los.length; t++) {
        const T = 25 * Math.pow(.002, t / steg);
        const a = los[tilfeldig(los.length)];
        let b, bytt;
        if (ledig.length && tilfeldig(4) === 0) { const li = tilfeldig(ledig.length); bytt = () => { const gml = pos.get(a); pos.set(a, ledig[li]); ledig[li] = gml; }; }
        else { b = los[tilfeldig(los.length)]; if (a === b) continue; bytt = () => { const x = pos.get(a); pos.set(a, pos.get(b)); pos.set(b, x); }; }
        bytt(); const nc = kostnad(pos, R, L);
        if (nc <= c || Math.random() < Math.exp((c - nc) / T)) c = nc; else bytt();
      }
      if (c < bestC) { bestC = c; best = new Map(pos); }
      if (bestC < 1) break;
    }
    plass = seter.map(() => null); best.forEach((i, n) => { plass[i] = n; });
    valgt = valgtElev = null; rapport = sjekk(); tegnAlt();
    if (forste) $("kk-kartdel").scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
  }
  function sjekk() {
    if (!plass.some(Boolean)) return [];
    const R = reglene(), pos = new Map(); plass.forEach((n, i) => { if (n) pos.set(n, i); });
    const s = n => seter[pos.get(n)], ut = [], L = Math.max(3, Math.hypot(rom.W, rom.H) * .55);
    R.ikke.forEach(([a, b]) => { const A = s(a), B = s(b); if (A && B && naboer(A, B)) ut.push(a + " og " + b + " sitter ved siden av hverandre."); else if (A && B && naer(A, B)) ut.push(a + " og " + b + " sitter rett foran/bak eller på skrå for hverandre."); });
    R.langt.forEach(([a, b]) => { const A = s(a), B = s(b); if (A && B && avst(A, B) < L * .6) ut.push(a + " og " + b + " sitter ganske nær hverandre."); });
    R.sammen.forEach(([a, b]) => { const A = s(a), B = s(b); if (A && B && !naboer(A, B)) ut.push(a + " og " + b + " sitter ikke sammen."); });
    R.foran.forEach(a => { const A = s(a); if (A && A.foran > .4) ut.push(a + " sitter ikke foran."); });
    R.dv.forEach(a => { const A = s(a); if (A && vedDorVindu(A)) ut.push(a + " sitter ved dør eller vindu."); });
    return ut;
  }

  // ---------- Klikk og redigering ----------
  function klikkSete(i) {
    if (redigerer) { valgt = valgt === i ? null : i; tegnAlt(); const f = document.querySelector('.kk-sete[data-i="' + i + '"]'); if (f) f.focus(); return; }
    if (av.has(i)) return;
    if (valgtElev) { const gml = plass.indexOf(valgtElev); if (gml >= 0) plass[gml] = plass[i]; plass[i] = valgtElev; laast.delete(i); valgtElev = null; }
    else if (valgt == null) { valgt = i; }
    else if (valgt === i) { valgt = null; }
    else { bytt(valgt, i); valgt = null; }
    rapport = sjekk(); tegnAlt();
    const f = document.querySelector('.kk-sete[data-i="' + i + '"]'); if (f) f.focus();
  }

  function bytt(a, b) { [plass[a], plass[b]] = [plass[b], plass[a]]; const la = laast.has(a), lb = laast.has(b); laast.delete(a); laast.delete(b); if (la) laast.add(b); if (lb) laast.add(a); }
  function P(x, y, w, h) { const { W, H } = rom; if (o.visning === "laerer") { x = W - x - w; y = H - y - h; } return "left:" + (x / W * 100).toFixed(2) + "%;top:" + (y / H * 100).toFixed(2) + "%;width:" + (w / W * 100).toFixed(2) + "%;height:" + (h / H * 100).toFixed(2) + "%"; }

  // ---------- Tegning ----------
  function tegnAlt() { tegnHandling(); tegnUtenPlass(); tegnRom(); tegnRapport(); }
  function tegnHandling() {
    let h = "";
    if (redigerer) h = '<div class="kk-redigerlinje"><p>✏️ <strong>Endre pulter:</strong> Dra pultene dit de står i rommet ditt. Trykk på en pult for å velge den – da kan du også flytte den med piltastene eller fjerne den.</p>' +
      '<p class="kk-redigerknapper"><span class="kk-flyttvalg" role="radiogroup" aria-label="Hva flyttes når du drar?">Flytt: <label><input type="radio" name="kk-flytt" value="bord"' + (o.flytt === "bord" ? " checked" : "") + '> hele bordet</label><label><input type="radio" name="kk-flytt" value="pult"' + (o.flytt === "pult" ? " checked" : "") + "> én pult</label></span>" +
      (valgt != null ? '<button type="button" class="knapp liten" data-h="pultav">' + (av.has(valgt) ? "↩️ Sett tilbake pulten" : "🗑️ Fjern pulten") + "</button>" : "") +
      '<button type="button" class="knapp liten" data-h="nypult">➕ Legg til pult</button>' + (av.size ? '<button type="button" class="knapp liten" data-h="allepulter">Sett tilbake alle fjernede</button>' : "") + (o.egne ? '<button type="button" class="knapp liten" data-h="nullstill">↺ Tilbakestill oppsettet</button>' : "") + "</p></div>";
    else if (valgtElev) h = "<p>Trykk på pulten der <strong>" + esc(valgtElev) + '</strong> skal sitte. <button type="button" class="knapp liten" data-h="avbryt">Avbryt</button></p>';
    else if (valgt != null) h = "<p>" + (plass[valgt] ? "<strong>" + esc(plass[valgt]) + "</strong> er valgt." : "Ledig pult valgt.") + ' Trykk på en annen pult for å bytte. ' +
      (plass[valgt] ? '<button type="button" class="knapp liten" data-h="laas">' + (laast.has(valgt) ? "🔓 Lås opp" : "🔒 Lås plassen") + '</button><button type="button" class="knapp liten" data-h="fjern">Ta bort fra pulten</button>' : "") + '<button type="button" class="knapp liten" data-h="avbryt">Avbryt</button></p>';
    else if (plass.some(Boolean)) h = '<p class="rv-merk">Dra en elev til en annen pult – eller trykk på to pulter – for å bytte plass. Velg en elev og trykk «Lås» for å beholde plassen når du lager nytt forslag.</p>';
    $("kk-handling").innerHTML = h;
  }
  function tegnUtenPlass() {
    const har = new Set(plass.filter(Boolean)), uten = elever.filter(n => !har.has(n));
    $("kk-utenplass").innerHTML = uten.length && plass.some(Boolean) ? "<p><strong>Uten plass (" + uten.length + "):</strong> " + uten.map(n => '<button type="button" class="kk-chip' + (valgtElev === n ? " kk-valgt" : "") + '" data-navn="' + esc(n) + '" aria-pressed="' + (valgtElev === n) + '">' + esc(n) + "</button>").join("") + ' <span class="rv-merk">Trykk på et navn og så på en pult.</span></p>' : "";
  }
  function tegnRom() {
    if (!rom) return;
    const { W, H } = rom;
    let h = '<div class="kk-flate" style="aspect-ratio:' + W.toFixed(2) + " / " + H.toFixed(2) + '">';
    h += '<div class="kk-tavle" style="' + P(W * .2, .15, W * .6, .4) + '">Tavle</div>';
    if (o.pult !== "ingen") { const x = o.pult === "venstre" ? .5 : o.pult === "hoyre" ? W - 2.6 : (W - 2.1) / 2; h += '<div class="kk-laererpult" style="' + P(x, .95, 2.1, .95) + '">Lærer</div>'; }
    const [dx, dy] = rom.dor;
    h += rom.dorKant === "bak" ? '<div class="kk-dor kk-dor-v" style="' + P(dx - .7, H - .22, 1.4, .22) + '">🚪</div>' : '<div class="kk-dor" style="' + P(dx === 0 ? 0 : W - .22, dy - .7, .22, 1.4) + '"><span>🚪</span></div>';
    if (o.vindu === "venstre") h += '<div class="kk-vindu" style="' + P(0, 2.4, .12, H - 3.4) + '"></div>';
    if (o.vindu === "hoyre") h += '<div class="kk-vindu" style="' + P(W - .12, 2.4, .12, H - 3.4) + '"></div>';
    if (o.vindu === "bak") h += '<div class="kk-vindu" style="' + P(.8, H - .12, W - 3.6, .12) + '"></div>';
    seter.forEach((q, i) => {
      const n = plass[i], fjernet = av.has(i);
      if (fjernet && !redigerer) return;
      const kl = "kk-sete" + (n ? "" : " kk-ledig") + (fjernet ? " kk-av" : "") + (valgt === i ? " kk-valgt" : "") + (laast.has(i) ? " kk-laast" : "") + (q.w < q.h ? " kk-hoy" : "");
      const etikett = fjernet ? "Fjernet pult" : n ? n + (laast.has(i) ? ", låst" : "") : "Ledig pult";
      h += '<button type="button" class="' + kl + '" data-i="' + i + '" style="' + P(q.x, q.y, q.w, q.h) + '" aria-label="' + esc(etikett) + '"' + (valgt === i ? ' aria-pressed="true"' : "") + '><span aria-hidden="true">' + esc(n || "") + "</span>" + (laast.has(i) ? '<i class="kk-lasikon" aria-hidden="true">🔒</i>' : "") + "</button>";
    });
    h += "</div>";
    $("kk-rom").innerHTML = h;
    $("kk-rom").setAttribute("data-visning", o.visning); $("kk-rom").classList.toggle("kk-redigerer", redigerer);
  }
  function tegnRapport() {
    if (!plass.some(Boolean)) { $("kk-rapport").innerHTML = ""; return; }
    const har = plass.filter(Boolean).length, ledige = seter.filter((_, i) => !av.has(i) && !plass[i]).length;
    $("kk-rapport").innerHTML = '<p class="rv-merk">' + har + " elever plassert · " + ledige + " ledige pulter" + (o.visning === "laerer" ? " · Lærerens visning: tavla er nederst" : " · Elevenes visning: tavla er øverst") + "</p>" +
      (rapport.length ? '<div class="kk-brudd"><p><strong>⚠️ Ikke alle reglene er oppfylt:</strong></p><ul>' + rapport.map(r => "<li>" + esc(r) + "</li>").join("") + '</ul><p class="rv-merk">Prøv «Nytt forslag», bytt plasser selv, eller fjern noen pulter for å få mer avstand.</p></div>' : (reglerFinnes() ? '<p class="kk-ok">✔ Alle reglene er oppfylt.</p>' : ""));
  }
  const reglerFinnes = () => ["kk-ikke", "kk-langt", "kk-sammen", "kk-foran", "kk-dorvindu"].some(id => $(id).value.trim());

  // ---------- Fil ----------
  function lastNed() {
    const data = { type: "les-verden-klassekart", versjon: 1, elever, regler: Object.fromEntries(["kk-ikke", "kk-langt", "kk-sammen", "kk-foran", "kk-dorvindu"].map(id => [id, $(id).value])), oppsett: o, seter: o.egne ? seter.map(q => ({ x: q.x, y: q.y, w: q.w, h: q.h, k: q.k })) : null, av: [...av], plass, laast: [...laast] };
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify(data, null, 1)], { type: "application/json" }));
    a.download = "klassekart.json"; document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  }
  function apne(e) {
    const f = e.target.files[0]; if (!f) return;
    f.text().then(t => {
      const d = JSON.parse(t); if (d.type !== "les-verden-klassekart") throw new Error();
      $("kk-liste").value = (d.elever || []).join("\n"); Object.entries(d.regler || {}).forEach(([id, v]) => { if ($(id)) $(id).value = v; });
      Object.assign(o, d.oppsett || {});
      const r = document.querySelector('input[name="kk-type"][value="' + o.type + '"]'); if (r) r.checked = true;
      $("kk-pult").value = o.pult; $("kk-dor").value = o.dor; $("kk-vindu").value = o.vindu; $("kk-snu").setAttribute("aria-pressed", o.visning === "laerer");
      lesElever(); typeinfo(); seter = Array.isArray(d.seter) && d.seter.length ? d.seter.map(q => ({ x: +q.x, y: +q.y, w: +q.w || 1, h: +q.h || .75, k: String(q.k) })) : lagSeter(); o.egne = !!(d.seter && d.seter.length); byggRom(false);
      av = new Set(d.av || []); plass = seter.map((_, i) => (d.plass || [])[i] && elever.includes(d.plass[i]) ? d.plass[i] : null); laast = new Set(d.laast || []);
      rapport = sjekk(); tegnAlt(); $("kk-feil").textContent = "";
    }).catch(() => { $("kk-feil").textContent = "Kunne ikke åpne filen. Velg en klassekart-fil som er lastet ned herfra."; });
    e.target.value = "";
  }

  document.addEventListener("DOMContentLoaded", side);
})();
