/* =========================================================
   Les verden – Sosiogram (sosiogram.html)
   Et verktøy for læreren: kartlegg hvem elevene ønsker å samarbeide
   med, med bare positive spørsmål. Svarene samles inn på elevenes
   enheter (romkode) eller skrives inn fra lapper. Resultatet vises
   som nettverksdiagram, tabell, oppmerksomhetsliste og gruppeforslag.
   Ingenting lagres – alt finnes bare i denne fanen.
   ========================================================= */
(function () {
  const LV = window.LV;
  const $ = id => document.getElementById(id);
  const esc = s => LV.esc(String(s == null ? "" : s));
  const SPORSMAL = [
    "Hvem vil du helst samarbeide med i et gruppearbeid?",
    "Hvem vil du helst sitte ved siden av i klasserommet?",
    "Hvem kan du spørre om hjelp når du står fast?",
    "Hvem er du gjerne sammen med i friminuttene?"
  ];
  let elever = [], sporsmal = SPORSMAL[0], maks = 3;
  const valg = new Map();          // elevId → [elevId]
  let rom = null, qr = "";
  const kobling = new Map();       // romspillerId → elevId

  // ---------- Side ----------
  function side() {
    document.title = "Sosiogram – " + (LV.config ? LV.config.navn : "Les verden");
    $("innhold").innerHTML = '<nav class="brodsmuler" aria-label="Brødsmuler"><a href="index.html">Forside</a> › <a href="laerer.html">For lærere</a> › Sosiogram</nav>' +
      '<header class="sidehode"><p class="overlinje">For lærere · klassemiljø</p><h1>🕸️ Sosiogram</h1><p class="ingress">Kartlegg hvem elevene ønsker å være sammen med – og få øye på dem som står utenfor. Resultatet vises som et nettverksdiagram, en oversikt over hvem som trenger oppmerksomhet, og forslag til grupper der alle får med seg minst én de valgte.</p></header>' +
      '<aside class="sg-rad" aria-labelledby="sg-rad-h"><h2 id="sg-rad-h">🔒 Før du starter</h2><ul>' +
      "<li><strong>Bare positive spørsmål.</strong> Verktøyet spør aldri «hvem vil du ikke …». Spørsmål om negative relasjoner mellom navngitte elever kan skade og skape hierarkier.</li>" +
      "<li><strong>Avklar med skoleledelsen.</strong> Sosiogram er en kartlegging av elevene og bør brukes i tråd med skolens plan for et trygt og godt skolemiljø.</li>" +
      "<li><strong>Ingenting lagres.</strong> Klasselista og svarene finnes bare i denne fanen. Med romkode går svarene direkte fra elevenes enheter til din. Lukker du fanen, er alt borte.</li>" +
      "<li><strong>Bare for deg.</strong> Ikke vis diagrammet på tavla eller til elevene. Bruk det som utgangspunkt for observasjon og samtale – det er et øyeblikksbilde, ikke en fasit.</li>" +
      "<li><strong>Bruk gjerne fornavn eller initialer.</strong></li></ul></aside>" +
      '<section class="le-del" aria-labelledby="sg-1"><h2 id="sg-1">1. Klasseliste</h2><label class="cs-felt" for="sg-liste">Ett navn per linje (2–40 elever)<textarea id="sg-liste" rows="8" spellcheck="false"></textarea></label><p class="mu-knapper"><button type="button" class="knapp hoved" id="sg-lagliste">Bruk klasselista</button></p><p class="rv-feil" id="sg-listefeil" role="alert"></p>' +
      '<details class="sg-lim"><summary>📋 Har du alt i et regneark? Lim inn hele tabellen</summary><p class="rv-merk">Kopier tabellen fra Excel, Google Regneark eller Word og lim den inn her: eleven i første kolonne og valgene i de neste. Du kan også skrive én elev per linje, for eksempel <code>Per: Dennis, Kari, Kjell</code>. Klasselista lages automatisk.</p><label class="cs-felt" for="sg-limfelt">Tabellen<textarea id="sg-limfelt" rows="8" spellcheck="false"></textarea></label><p class="mu-knapper"><button type="button" class="knapp hoved" id="sg-limknapp">Les inn tabellen</button></p><p class="rv-merk" id="sg-limmelding" role="status"></p></details></section>' +
      '<section class="le-del" id="sg-steg2" hidden aria-labelledby="sg-2"><h2 id="sg-2">2. Spørsmål</h2><label class="cs-felt">Spørsmålet elevene svarer på<select id="sg-sporsmal">' + SPORSMAL.map(s => "<option>" + esc(s) + "</option>").join("") + '</select></label><label class="cs-felt">Hvor mange kan hver elev velge?<select id="sg-maks"><option>1</option><option>2</option><option selected>3</option><option>4</option><option>5</option></select></label></section>' +
      '<section class="le-del" id="sg-steg3" hidden aria-labelledby="sg-3"><h2 id="sg-3">3. Samle inn svarene</h2><p class="mu-knapper"><button type="button" class="knapp hoved" id="sg-romstart">📱 Elevene svarer på egen enhet (romkode)</button></p><div id="sg-rom"></div>' +
      '<div class="sg-manuelt"><h3>✍️ Eller skriv inn svarene selv</h3><p class="rv-merk">Skriv navnet på dem eleven valgte. Forslag dukker opp mens du skriver, og store og små bokstaver spiller ingen rolle. Resultatet oppdateres med en gang.</p><div id="sg-tabell"></div></div></section>' +
      '<section class="le-del" id="sg-steg4" hidden aria-labelledby="sg-4"><h2 id="sg-4">4. Resultat</h2><div id="sg-resultat"></div></section>';
    $("sg-lagliste").addEventListener("click", lagListe);
    $("sg-sporsmal").addEventListener("change", e => { sporsmal = e.target.value; sendAlle(); });
    $("sg-maks").addEventListener("change", e => { maks = +e.target.value; valg.forEach((l, k) => valg.set(k, l.slice(0, maks))); tegnTabell(); sendAlle(); analyse(); });
    $("sg-romstart").addEventListener("click", apneRom);
    $("innhold").addEventListener("change", e => {
      const s = e.target.closest(".sg-manuell"); if (!s) return;
      const id = s.dataset.elev, l = [];
      document.querySelectorAll('.sg-manuell[data-elev="' + id + '"]').forEach(x => {
        const v = x.value.trim(), t = v ? finn(v) : null, feil = v && (!t || t === id);
        x.classList.toggle("sg-ukjent", !!feil); x.setAttribute("aria-invalid", feil ? "true" : "false");
        x.title = !feil ? "" : t === id ? "Eleven kan ikke velge seg selv" : "Finner ikke «" + v + "» i klasselista";
        if (t && t !== id) { l.push(t); x.value = navnPaa(t); }
      });
      if (l.length) valg.set(id, [...new Set(l)]); else valg.delete(id);
      const u = document.querySelectorAll(".sg-manuell.sg-ukjent").length;
      $("sg-tabellmelding").textContent = u ? "⚠️ " + u + (u === 1 ? " navn" : " navn") + " finnes ikke i klasselista (markert i rødt). Rett skrivemåten, eller legg eleven til." : "";
      tegnRom(); analyse();
    });
    $("innhold").addEventListener("keydown", e => {
      if (e.key === "Enter" && e.target.id === "sg-nyelev") { e.preventDefault(); nyElev(); }
    });
    $("innhold").addEventListener("click", e => {
      const b = e.target.closest("button"); if (!b) return;
      if (b.id === "sg-grupper") tegnGrupper();
      else if (b.id === "sg-skriv") window.print();
      else if (b.id === "sg-limknapp") limInn();
      else if (b.id === "sg-nykol" && maks < 5) { $("sg-maks").value = ++maks; tegnTabell(); sendAlle(); }
      else if (b.id === "sg-nyelevknapp") nyElev();
      else if (b.id === "sg-romsteng" && confirm("Stenge rommet? Elevene blir koblet fra. Svarene du har fått, beholdes.")) { rom.lukk(); rom = null; $("sg-rom").innerHTML = ""; $("sg-romstart").hidden = false; }
    });
  }

  function lagListe() {
    const navn = [...new Set($("sg-liste").value.split("\n").map(x => x.replace(/[<>]/g, "").trim().slice(0, 30)).filter(Boolean))];
    if (navn.length < 2 || navn.length > 40) { $("sg-listefeil").textContent = "Skriv mellom 2 og 40 navn – ett per linje."; return; }
    $("sg-listefeil").textContent = "";
    const gamle = new Map(elever.map(e => [e.navn, e.id]));
    elever = navn.map((n, i) => ({ id: gamle.get(n) || "e" + (i + 1) + "-" + Math.random().toString(36).slice(2, 6), navn: n }));
    const ider = new Set(elever.map(e => e.id));
    [...valg.keys()].forEach(k => { if (!ider.has(k)) valg.delete(k); else valg.set(k, valg.get(k).filter(x => ider.has(x))); });
    ["sg-steg2", "sg-steg3", "sg-steg4"].forEach(id => { $(id).hidden = false; });
    tegnTabell(); sendAlle(); analyse();
  }
  const norm = x => String(x || "").trim().toLocaleLowerCase("nb");
  const finn = navn => { const n = norm(navn); const e = elever.find(x => norm(x.navn) === n); return e ? e.id : null; };
  function nyElev() {
    const f = $("sg-nyelev"), n = f.value.replace(/[<>]/g, "").trim().slice(0, 30); if (!n) return;
    if (finn(n)) { f.value = ""; return; }
    const ventende = [...document.querySelectorAll(".sg-manuell.sg-ukjent")].map(x => [x.id, x.value]);
    $("sg-liste").value = $("sg-liste").value.replace(/\s*$/, "") + "\n" + n; lagListe();
    ventende.forEach(([id, v]) => { const x = $(id); if (x) { x.value = v; x.dispatchEvent(new Event("change", { bubbles: true })); } });
    setTimeout(() => { const x = $("sg-nyelev"); if (x) x.focus(); }, 0);
  }
  // Lim inn fra regneark: «Elev<TAB>Valg1<TAB>Valg2 …», «Elev; Valg1; …» eller «Elev: Valg1, Valg2»
  function limInn() {
    const rader = $("sg-limfelt").value.split(/\r?\n/).map(l => {
      l = l.replace(/[<>]/g, "");
      if (!/[\t;]/.test(l) && l.includes(":")) l = l.replace(":", ",");
      const sk = l.includes("\t") ? "\t" : l.includes(";") ? ";" : ",";
      return l.split(sk).map(x => x.trim().slice(0, 30));
    }).filter(r => r[0]);
    if (rader.length && /^(elev(er|ene)?|navn)$/i.test(rader[0][0])) rader.shift();
    if (!rader.length) { $("sg-limmelding").textContent = "Fant ingen rader. Lim inn tabellen og prøv igjen."; return; }
    const navn = [], sett = new Set(), legg = n => { if (n && !sett.has(norm(n))) { sett.add(norm(n)); navn.push(n); } };
    rader.forEach(r => legg(r[0])); rader.forEach(r => r.slice(1).forEach(legg));
    $("sg-liste").value = navn.join("\n"); lagListe();
    if (!elever.length) { $("sg-limmelding").textContent = $("sg-listefeil").textContent; return; }
    let antall = 0, selv = 0, flest = 0;
    rader.forEach(r => {
      const id = finn(r[0]); const l = [];
      r.slice(1).filter(Boolean).forEach(v => { const t = finn(v); if (t === id) selv++; else if (t && !l.includes(t)) l.push(t); });
      if (l.length) { valg.set(id, l); antall += l.length; flest = Math.max(flest, l.length); }
    });
    if (flest > maks) { maks = Math.min(5, flest); $("sg-maks").value = maks; valg.forEach((l, k) => valg.set(k, l.slice(0, maks))); }
    tegnTabell(); tegnRom(); analyse();
    $("sg-limmelding").textContent = "✔ Leste inn " + elever.length + " elever og " + antall + " valg." + (selv ? " " + selv + (selv === 1 ? " elev" : " elever") + " hadde valgt seg selv – det er tatt bort." : "") + (flest > 5 ? " Bare de fem første valgene per elev er tatt med." : "");
    $("sg-steg4").scrollIntoView({ behavior: "smooth", block: "start" });
  }
  const navnPaa = id => (elever.find(e => e.id === id) || {}).navn || "?";

  function tegnTabell() {
    if (!elever.length) return;
    const felt = (e, i, v) => '<td><label class="skjult-visuelt" for="sg-m-' + e.id + "-" + i + '">' + esc(e.navn) + ", valg " + (i + 1) + '</label><input type="text" class="sg-manuell" id="sg-m-' + e.id + "-" + i + '" data-elev="' + e.id + '" list="sg-navneforslag" autocomplete="off" spellcheck="false" value="' + esc(v ? navnPaa(v) : "") + '"></td>';
    $("sg-tabell").innerHTML = '<datalist id="sg-navneforslag">' + elever.map(e => '<option value="' + esc(e.navn) + '">').join("") + "</datalist>" +
      '<div class="sg-tabell-wrap"><table class="sg-tabell sg-inntasting"><thead><tr><th scope="col">Elev</th>' + Array.from({ length: maks }, (_, i) => '<th scope="col">Valg ' + (i + 1) + "</th>").join("") + "</tr></thead><tbody>" +
      elever.map(e => { const l = valg.get(e.id) || []; return '<tr><th scope="row">' + esc(e.navn) + "</th>" + Array.from({ length: maks }, (_, i) => felt(e, i, l[i])).join("") + "</tr>"; }).join("") + "</tbody></table></div>" +
      '<p class="rv-feil" id="sg-tabellmelding" role="status"></p>' +
      '<p class="mu-knapper sg-radknapper"><label class="skjult-visuelt" for="sg-nyelev">Navn på ny elev</label><input type="text" id="sg-nyelev" placeholder="Ny elev …" maxlength="30" spellcheck="false"><button type="button" class="knapp" id="sg-nyelevknapp">+ Legg til elev</button>' +
      (maks < 5 ? '<button type="button" class="knapp" id="sg-nykol">+ Legg til kolonne</button>' : "") + "</p>";
  }
  function fyllRad(id) {
    const l = valg.get(id) || [];
    document.querySelectorAll('.sg-manuell[data-elev="' + id + '"]').forEach((x, i) => { x.value = l[i] ? navnPaa(l[i]) : ""; x.classList.remove("sg-ukjent"); });
  }

  // ---------- Romkode ----------
  const tilElev = spillerId => {
    const id = kobling.get(spillerId);
    if (!id) return { t: "sosio", fase: "hvem", elever: elever.map(e => ({ id: e.id, navn: e.navn, tatt: [...kobling.values()].includes(e.id) })) };
    if (valg.has(id) && rom.svart && rom.svart.has(id)) return { t: "sosio", fase: "takk" };
    return { t: "sosio", fase: "svar", meg: navnPaa(id), sporsmal, maks, elever: elever.filter(e => e.id !== id).map(e => ({ id: e.id, navn: e.navn })) };
  };
  function sendAlle() { if (rom) rom.spillere.forEach(x => { if (x.tilkoblet) rom.send(x.id, tilElev(x.id)); }); tegnRom(); }
  async function apneRom() {
    $("sg-romstart").hidden = true; $("sg-rom").innerHTML = '<p class="rv-status">📱 Åpner rommet …</p>';
    try {
      await LV.lastSkript("assets/rom.js");
      rom = await LV.rom.vert({ spill: "sosiogram",
        onBli: x => { rom.send(x.id, tilElev(x.id)); tegnRom(); },
        onForlat: () => tegnRom(),
        onMelding: (x, m) => {
          if (m.t === "meg") {
            const tatt = [...kobling.entries()].some(([sp, id]) => id === m.id && sp !== x.id);
            if (!elever.some(e => e.id === m.id)) return;
            if (tatt) { rom.send(x.id, Object.assign(tilElev(x.id), { melding: "Det navnet er allerede valgt. Si fra til læreren." })); return; }
            kobling.set(x.id, m.id); sendAlle();
          } else if (m.t === "valg") {
            const id = kobling.get(x.id); if (!id || !Array.isArray(m.valg)) return;
            const ok = [...new Set(m.valg)].filter(v => v !== id && elever.some(e => e.id === v)).slice(0, maks);
            valg.set(id, ok); rom.svart.add(id);
            rom.send(x.id, tilElev(x.id)); fyllRad(id); tegnRom(); analyse();
          }
        } });
      rom.svart = new Set();
      qr = await LV.rom.qr(rom.lenke).catch(() => "");
      tegnRom();
    } catch (e) { $("sg-rom").innerHTML = '<p class="rv-feil">Klarte ikke å åpne rommet. ' + esc(LV.rom ? LV.rom.feilTekst(e) : "") + "</p>"; $("sg-romstart").hidden = false; }
  }
  function tegnRom() {
    if (!rom) return;
    const har = e => rom.svart.has(e.id) || (valg.get(e.id) || []).length > 0, svart = elever.filter(har), mangler = elever.filter(e => !har(e));
    $("sg-rom").innerHTML = '<div class="rkl-linje"><div class="rkl-kodedel"><span class="rkl-ledetekst">Romkode</span><span class="rkl-kode">' + rom.kode + '</span><span class="rkl-lenke">' + esc(rom.lenke.replace(/^https?:\/\//, "").replace(/\?.*$/, "")) + '</span></div><div class="rkl-qr" aria-hidden="true">' + qr + '</div><p class="rkl-tall"><strong>' + svart.length + "</strong> av " + elever.length + ' har svart</p><button type="button" class="knapp liten" id="sg-romsteng">✕ Steng rommet</button></div>' +
      (mangler.length ? '<p class="rv-merk">Mangler svar fra: ' + mangler.map(e => esc(e.navn)).join(", ") + "</p>" : '<p class="rv-merk">✔ Alle har svart.</p>');
  }

  // ---------- Analyse ----------
  function data() {
    const mottatt = new Map(elever.map(e => [e.id, []]));
    valg.forEach((l, fra) => l.forEach(til => { if (mottatt.has(til)) mottatt.get(til).push(fra); }));
    const gjensidig = (a, b) => (valg.get(a) || []).includes(b) && (valg.get(b) || []).includes(a);
    return { mottatt, gjensidig };
  }
  function analyse() {
    const el = $("sg-resultat"); if (!el) return;
    const svar = elever.filter(e => valg.has(e.id) && valg.get(e.id).length).length;
    if (svar < 2) { el.innerHTML = '<p class="rv-merk">Resultatet vises når minst to elever har svart.</p>'; return; }
    const { mottatt, gjensidig } = data();
    const rader = elever.map(e => { const m = mottatt.get(e.id), g = (valg.get(e.id) || []).filter(b => gjensidig(e.id, b)); return { e, gitt: (valg.get(e.id) || []).length, mottatt: m.length, gjensidige: g.length, svarte: valg.has(e.id) }; });
    const ingen = rader.filter(r => !r.mottatt), enveis = rader.filter(r => r.mottatt && !r.gjensidige), ikkeSvart = rader.filter(r => !r.svarte);
    const par = []; elever.forEach((a, i) => elever.slice(i + 1).forEach(b => { if (gjensidig(a.id, b.id)) par.push([a.navn, b.navn]); }));
    el.innerHTML = '<p class="sg-sporsmalvis">Spørsmål: <em>' + esc(sporsmal) + "</em> · " + svar + " av " + elever.length + " har svart</p>" +
      '<div class="sg-oppmerksomhet"><h3>👀 Verdt å følge med på</h3>' +
      (ingen.length ? "<p><strong>Ikke valgt av noen:</strong> " + ingen.map(r => esc(r.e.navn)).join(", ") + "</p>" : "<p>Alle er valgt av minst én. 👍</p>") +
      (enveis.length ? "<p><strong>Valgt, men uten gjensidige valg:</strong> " + enveis.map(r => esc(r.e.navn)).join(", ") + "</p>" : "") +
      (ikkeSvart.length ? '<p class="rv-merk">Har ikke svart: ' + ikkeSvart.map(r => esc(r.e.navn)).join(", ") + "</p>" : "") +
      '<p class="rv-merk">Husk: Et sosiogram er et øyeblikksbilde. Snakk med eleven og observer før du trekker slutninger.</p></div>' +
      '<figure class="sg-figur"><div id="sg-diagram"></div><figcaption><span class="sg-teg sg-teg-gj"></span> gjensidig valg <span class="sg-teg sg-teg-en"></span> enveis valg (pila peker mot den som blir valgt) · Større sirkel = flere valg mottatt · <span class="sg-teg sg-teg-ingen"></span> ikke valgt av noen</figcaption></figure>' +
      '<details class="sg-detaljer"><summary>📋 Tabell</summary><div class="sg-tabell-wrap"><table class="sg-tabell"><thead><tr><th scope="col">Elev</th><th scope="col">Har valgt</th><th scope="col">Valgt av</th><th scope="col">Gjensidige</th></tr></thead><tbody>' +
      rader.slice().sort((a, b) => a.mottatt - b.mottatt).map(r => "<tr><th scope=\"row\">" + esc(r.e.navn) + "</th><td>" + ((valg.get(r.e.id) || []).map(navnPaa).map(esc).join(", ") || "–") + "</td><td>" + (mottatt.get(r.e.id).map(navnPaa).map(esc).join(", ") || "–") + "</td><td>" + r.gjensidige + "</td></tr>").join("") + "</tbody></table></div>" +
      (par.length ? "<p><strong>Gjensidige par:</strong> " + par.map(p => esc(p[0]) + " ↔ " + esc(p[1])).join(" · ") + "</p>" : "") + "</details>" +
      '<h3>👥 Forslag til grupper</h3><p class="mu-knapper"><label class="cs-avkryss">Gruppestørrelse <select id="sg-str"><option>2</option><option selected>3</option><option>4</option><option>5</option></select></label><button type="button" class="knapp" id="sg-grupper">Lag forslag</button><button type="button" class="knapp" id="sg-skriv">🖨️ Skriv ut</button></p><div id="sg-gruppeliste"></div>';
    tegnDiagram();
  }

  // Enkel kraftbasert plassering (deterministisk)
  function tegnDiagram() {
    const W = 760, H = 520, n = elever.length, { mottatt, gjensidig } = data();
    const p = elever.map((e, i) => ({ id: e.id, x: W / 2 + Math.cos(i / n * 2 * Math.PI) * W * .35, y: H / 2 + Math.sin(i / n * 2 * Math.PI) * H * .35, vx: 0, vy: 0 }));
    const kant = []; valg.forEach((l, a) => l.forEach(b => kant.push([a, b])));
    const idx = new Map(p.map((q, i) => [q.id, i]));
    for (let it = 0; it < 400; it++) {
      for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) {
        const dx = p[i].x - p[j].x, dy = p[i].y - p[j].y, d2 = Math.max(dx * dx + dy * dy, 25), f = 9000 / d2;
        const fx = dx / Math.sqrt(d2) * f, fy = dy / Math.sqrt(d2) * f;
        p[i].vx += fx; p[i].vy += fy; p[j].vx -= fx; p[j].vy -= fy;
      }
      kant.forEach(([a, b]) => { const A = p[idx.get(a)], B = p[idx.get(b)]; if (!A || !B) return; const dx = B.x - A.x, dy = B.y - A.y, d = Math.sqrt(dx * dx + dy * dy) || 1, f = (d - 110) * .02; A.vx += dx / d * f; A.vy += dy / d * f; B.vx -= dx / d * f; B.vy -= dy / d * f; });
      p.forEach(q => { q.vx += (W / 2 - q.x) * .004; q.vy += (H / 2 - q.y) * .004; const k = 1 - it / 400; q.x = Math.max(40, Math.min(W - 40, q.x + Math.max(-12, Math.min(12, q.vx)) * k)); q.y = Math.max(30, Math.min(H - 30, q.y + Math.max(-12, Math.min(12, q.vy)) * k)); q.vx *= .5; q.vy *= .5; });
    }
    const r = id => 12 + Math.min(10, mottatt.get(id).length * 2.5);
    let s = '<svg viewBox="0 0 ' + W + " " + H + '" class="sg-svg" role="img" aria-label="Nettverksdiagram over valgene. Se tabellen for samme informasjon som tekst."><defs><marker id="sg-pil" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#8a8a8a"/></marker></defs>';
    const tegnet = new Set();
    kant.forEach(([a, b]) => {
      const A = p[idx.get(a)], B = p[idx.get(b)]; if (!A || !B) return;
      const gj = gjensidig(a, b), nk = [a, b].sort().join("|");
      if (gj && tegnet.has(nk)) return; tegnet.add(nk);
      const dx = B.x - A.x, dy = B.y - A.y, d = Math.sqrt(dx * dx + dy * dy) || 1, rb = r(b) + 3, ra = r(a) + 3;
      s += '<line x1="' + (A.x + dx / d * ra).toFixed(1) + '" y1="' + (A.y + dy / d * ra).toFixed(1) + '" x2="' + (B.x - dx / d * rb).toFixed(1) + '" y2="' + (B.y - dy / d * rb).toFixed(1) + '" class="' + (gj ? "sg-gj" : "sg-en") + '"' + (gj ? "" : ' marker-end="url(#sg-pil)"') + "/>";
    });
    p.forEach(q => { const m = mottatt.get(q.id).length; s += '<g class="sg-node' + (m ? "" : " sg-ingen") + '"><circle cx="' + q.x.toFixed(1) + '" cy="' + q.y.toFixed(1) + '" r="' + r(q.id) + '"/><text x="' + q.x.toFixed(1) + '" y="' + (q.y + r(q.id) + 14).toFixed(1) + '">' + esc(navnPaa(q.id)) + "</text></g>"; });
    $("sg-diagram").innerHTML = s + "</svg>";
  }

  // Gruppeforslag: samle elever som har valgt hverandre, så alle får minst én de valgte
  function tegnGrupper() {
    const k = +$("sg-str").value, ider = elever.map(e => e.id), n = ider.length;
    const antall = Math.max(1, Math.round(n / k));
    const poeng = (a, b) => ((valg.get(a) || []).includes(b) ? 2 : 0) + ((valg.get(b) || []).includes(a) ? 2 : 0) + ((valg.get(a) || []).includes(b) && (valg.get(b) || []).includes(a) ? 1 : 0);
    const gruppeVerdi = g => { let v = 0; g.forEach((a, i) => g.slice(i + 1).forEach(b => { v += poeng(a, b); })); g.forEach(a => { if ((valg.get(a) || []).length && !g.some(b => b !== a && (valg.get(a) || []).includes(b))) v -= 6; }); return v; };
    let best = null, bestV = -Infinity;
    for (let forsok = 0; forsok < 30; forsok++) {
      const grupper = Array.from({ length: antall }, () => []);
      const rekke = ider.slice().sort(() => Math.random() - .5).sort((a, b) => (valg.get(b) || []).length - (valg.get(a) || []).length);
      rekke.forEach(a => { let bi = 0, bv = -Infinity; grupper.forEach((g, i) => { if (g.length >= Math.ceil(n / antall)) return; const v = g.reduce((s, b) => s + poeng(a, b), 0) - g.length * .1; if (v > bv) { bv = v; bi = i; } }); grupper[bi].push(a); });
      for (let it = 0; it < 600; it++) {
        const i = Math.floor(Math.random() * antall), j = Math.floor(Math.random() * antall); if (i === j || !grupper[i].length || !grupper[j].length) continue;
        const ai = Math.floor(Math.random() * grupper[i].length), bj = Math.floor(Math.random() * grupper[j].length);
        const for_ = gruppeVerdi(grupper[i]) + gruppeVerdi(grupper[j]);
        [grupper[i][ai], grupper[j][bj]] = [grupper[j][bj], grupper[i][ai]];
        if (gruppeVerdi(grupper[i]) + gruppeVerdi(grupper[j]) < for_) [grupper[i][ai], grupper[j][bj]] = [grupper[j][bj], grupper[i][ai]];
      }
      const v = grupper.reduce((s, g) => s + gruppeVerdi(g), 0); if (v > bestV) { bestV = v; best = grupper; }
    }
    const utenValgt = g => g.filter(a => (valg.get(a) || []).length && !g.some(b => b !== a && (valg.get(a) || []).includes(b)));
    $("sg-gruppeliste").innerHTML = '<ol class="sg-grupper">' + best.map(g => { const u = utenValgt(g); return "<li><strong>" + g.map(a => esc(navnPaa(a)) + (u.includes(a) ? " ⚠️" : "")).join(", ") + "</strong></li>"; }).join("") + "</ol>" +
      '<p class="rv-merk">Alle i en gruppe har fått med minst én de selv valgte, så langt det lar seg gjøre. ⚠️ = eleven har ikke fått med noen hen valgte. Trykk «Lag forslag» igjen for et nytt forslag – og juster selv ut fra det du vet om klassen.</p>';
  }

  document.addEventListener("DOMContentLoaded", side);
})();
