/* =========================================================
   Les verden – Klassesvar (klassesvar.html)
   Et enkelt klasseresponssystem: læreren stiller spørsmål, elevene
   svarer på egen enhet via romkode (rom.html), og svarene vises live
   som stolper, ordsky, svarkort eller skala. Bygger på LV.romKlasse.
   Ingenting lagres. Spørsmålsrekka kan lagres som en lenke (#r=…).
   ========================================================= */
(function () {
  const LV = window.LV;
  const $ = id => document.getElementById(id);
  const esc = s => LV.esc(String(s == null ? "" : s));

  const TYPER = {
    valg: { navn: "Flervalg / avstemning", ikon: "📊" },
    janei: { navn: "Ja / nei", ikon: "👍" },
    enig: { navn: "Enig – uenig", ikon: "⚖️" },
    ordsky: { navn: "Ordsky", ikon: "☁️" },
    apen: { navn: "Åpent svar", ikon: "💬" },
    skala: { navn: "Skala 1–5", ikon: "📏" }
  };
  const FARGER = ["#1d4f9c", "#b45309", "#23703f", "#a32626", "#6b2fa0", "#0f6b6b"];
  const FASTE = { janei: ["Ja", "Nei", "Vet ikke"], enig: ["Helt enig", "Litt enig", "Litt uenig", "Helt uenig"] };
  const HURTIG = [
    { type: "valg", tekst: "Hvor godt forstår du dette nå?", valg: ["Jeg kan forklare det til andre", "Jeg forstår det stort sett", "Jeg forstår litt", "Jeg forstår det ikke ennå"] },
    { type: "ordsky", tekst: "Hva tenker du på når du hører ordet «demokrati»?", antall: 3 },
    { type: "apen", tekst: "Hva lurer du fortsatt på?" },
    { type: "skala", tekst: "Hvor interessant var timen i dag?", lav: "Kjedelig", hoy: "Veldig interessant" },
    { type: "enig", tekst: "Påstand: Alle burde lære om kildekritikk på skolen." },
    { type: "ordsky", tekst: "Skriv ett ord som oppsummerer timen.", antall: 1 }
  ];

  let K = null, aktiv = null, sporNr = 0, visResultat = true, visFasit = false, anonym = true;
  const rekke = [], logg = [];

  // ---------- Rekka i lenka ----------
  const tilLenke = () => { try { return btoa(unescape(encodeURIComponent(JSON.stringify(rekke)))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""); } catch (e) { return ""; } };
  function fraLenke() {
    const m = location.hash.match(/^#r=([A-Za-z0-9_-]+)$/); if (!m) return;
    try {
      const l = JSON.parse(decodeURIComponent(escape(atob(m[1].replace(/-/g, "+").replace(/_/g, "/")))));
      if (Array.isArray(l)) l.slice(0, 60).forEach(s => { if (s && TYPER[s.type] && typeof s.tekst === "string") rekke.push(rensSporsmal(s)); });
    } catch (e) { /* ugyldig lenke – ignorer */ }
  }
  function rensSporsmal(s) {
    const r = { type: s.type, tekst: String(s.tekst).slice(0, 300) };
    if (s.type === "valg") { r.valg = (s.valg || []).map(x => String(x).slice(0, 120)).filter(Boolean).slice(0, 6); r.riktig = Number.isInteger(s.riktig) && s.riktig < r.valg.length ? s.riktig : null; }
    if (s.type === "ordsky") r.antall = Math.max(1, Math.min(3, +s.antall || 1));
    if (s.type === "skala") { r.lav = String(s.lav || "").slice(0, 40); r.hoy = String(s.hoy || "").slice(0, 40); }
    return r;
  }

  // ---------- Side ----------
  function side() {
    document.title = "Klassesvar – " + (LV.config ? LV.config.navn : "Les verden");
    fraLenke();
    $("innhold").innerHTML = '<nav class="brodsmuler" aria-label="Brødsmuler"><a href="index.html">Forside</a> › <a href="laerer.html">For lærere</a> › Klassesvar</nav>' +
      '<header class="sidehode"><p class="overlinje">I klasserommet</p><h1>📊 Klassesvar</h1><p class="ingress">Still et spørsmål – hele klassen svarer på mobilen eller PC-en, og svarene dukker opp på tavla med en gang: som stolper, ordsky, svarkort eller skala. Alle kan delta, også de som sjelden rekker opp hånda. Svarene er anonyme, og ingenting lagres.</p></header>' +
      '<div id="cs-rom"><p><button type="button" class="knapp hoved" id="cs-romstart">📱 Åpne rom for klassen</button> <span class="rv-merk">Elevene går til rom.html og skriver koden.</span></p></div>' +
      '<section class="cs-vis" id="cs-vis" aria-live="polite"><p class="cs-tom">Lag et spørsmål under og trykk «Send nå» – eller velg et hurtigspørsmål.</p></section>' +
      '<div class="cs-rad"><section class="le-del cs-bygg" aria-labelledby="cs-bygg-h"><h2 id="cs-bygg-h">Lag et spørsmål</h2>' +
      '<p class="cs-hurtig"><span>Hurtigspørsmål:</span>' + HURTIG.map((h, i) => '<button type="button" class="knapp liten" data-hurtig="' + i + '">' + TYPER[h.type].ikon + " " + esc(h.tekst.length > 34 ? h.tekst.slice(0, 32) + "…" : h.tekst) + "</button>").join("") + "</p>" +
      '<form id="cs-skjema" autocomplete="off"><label class="cs-felt">Type<select id="cs-type">' + Object.keys(TYPER).map(k => '<option value="' + k + '">' + TYPER[k].ikon + " " + TYPER[k].navn + "</option>").join("") + "</select></label>" +
      '<label class="cs-felt">Spørsmål eller påstand<textarea id="cs-tekst" rows="2" maxlength="300" required></textarea></label>' +
      '<div id="cs-ekstra"></div>' +
      '<p class="mu-knapper"><button type="submit" class="knapp hoved">▶ Send nå</button><button type="button" class="knapp" id="cs-legg">➕ Legg i spørsmålsrekka</button></p><p class="rv-feil" id="cs-feil" role="alert"></p></form></section>' +
      '<section class="le-del cs-rekke" aria-labelledby="cs-rekke-h"><h2 id="cs-rekke-h">Spørsmålsrekka</h2><p class="mu-intro">Forbered spørsmålene før timen. Lagre rekka som lenke (bokmerke den), så har du den neste gang.</p><ol id="cs-rekkeliste" class="cs-rekkeliste"></ol>' +
      '<p class="mu-knapper"><button type="button" class="knapp" id="cs-lenke">🔗 Kopier lenke til rekka</button></p><p class="status" id="cs-lenkestatus" role="status"></p>' +
      '<h2>Innstillinger</h2><label class="cs-avkryss"><input type="checkbox" id="cs-anonym" checked> Anonyme svar (vis ikke kallenavn på tavla)</label>' +
      '<h2>Etter timen</h2><p class="mu-knapper"><button type="button" class="knapp" id="cs-eksport">📋 Kopier resultatene fra økta</button></p><p class="status" id="cs-eksportstatus" role="status"></p></section></div>';
    tegnEkstra(); tegnRekke();
    $("cs-type").addEventListener("change", () => tegnEkstra());
    $("cs-skjema").addEventListener("submit", e => { e.preventDefault(); const s = lesSkjema(); if (s) send(s); });
    $("cs-legg").addEventListener("click", () => { const s = lesSkjema(); if (s) { rekke.push(s); tegnRekke(); $("cs-tekst").value = ""; tegnEkstra(); } });
    $("innhold").addEventListener("click", klikk);
    $("cs-anonym").addEventListener("change", e => { anonym = e.target.checked; tegnVis(); });
  }

  function tegnEkstra(s) {
    const t = $("cs-type").value; let h = "";
    if (t === "valg") {
      const v = (s && s.valg) || ["", "", "", ""], r = s ? s.riktig : null;
      h = '<fieldset class="cs-valg"><legend>Svaralternativer (2–6). Kryss av for riktig svar hvis det er en quiz.</legend>' + [0, 1, 2, 3, 4, 5].map(i => '<div class="cs-valgrad"><span class="cs-farge" style="background:' + FARGER[i] + '" aria-hidden="true"></span><label class="skjult-visuelt" for="cs-v' + i + '">Alternativ ' + (i + 1) + '</label><input id="cs-v' + i + '" maxlength="120" value="' + esc(v[i] || "") + '" placeholder="Alternativ ' + (i + 1) + (i > 1 ? " (valgfritt)" : "") + '"><label class="cs-riktig"><input type="radio" name="cs-riktig" value="' + i + '"' + (r === i ? " checked" : "") + "> Riktig</label></div>").join("") + '<button type="button" class="knapp liten" id="cs-ingenfasit">Ingen fasit</button></fieldset>';
    } else if (t === "ordsky") h = '<label class="cs-felt">Hvor mange ord kan hver elev sende?<select id="cs-antall">' + [1, 2, 3].map(n => '<option value="' + n + '"' + ((s && s.antall) === n || (!s && n === 3) ? " selected" : "") + ">" + n + "</option>").join("") + "</select></label>";
    else if (t === "skala") h = '<div class="cs-to"><label class="cs-felt">1 betyr<input id="cs-lav" maxlength="40" value="' + esc(s ? s.lav : "") + '" placeholder="f.eks. Helt uenig"></label><label class="cs-felt">5 betyr<input id="cs-hoy" maxlength="40" value="' + esc(s ? s.hoy : "") + '" placeholder="f.eks. Helt enig"></label></div>';
    else if (FASTE[t]) h = '<p class="rv-merk">Alternativer: ' + FASTE[t].join(" · ") + "</p>";
    $("cs-ekstra").innerHTML = h;
  }
  function lesSkjema() {
    const t = $("cs-type").value, tekst = $("cs-tekst").value.trim();
    $("cs-feil").textContent = "";
    if (!tekst) { $("cs-feil").textContent = "Skriv et spørsmål først."; return null; }
    const s = { type: t, tekst };
    if (t === "valg") {
      const alle = [0, 1, 2, 3, 4, 5].map(i => $("cs-v" + i).value.trim());
      const r = document.querySelector('input[name="cs-riktig"]:checked');
      s.valg = alle.filter(Boolean);
      if (s.valg.length < 2) { $("cs-feil").textContent = "Skriv minst to svaralternativer."; return null; }
      s.riktig = r && alle[+r.value] ? s.valg.indexOf(alle[+r.value]) : null;
    }
    if (t === "ordsky") s.antall = +$("cs-antall").value;
    if (t === "skala") { s.lav = $("cs-lav").value.trim(); s.hoy = $("cs-hoy").value.trim(); }
    return rensSporsmal(s);
  }
  function tegnRekke() {
    $("cs-rekkeliste").innerHTML = rekke.length ? rekke.map((s, i) => '<li' + (aktiv && aktiv.fra === i ? ' class="cs-aktiv"' : "") + '><span>' + TYPER[s.type].ikon + " " + esc(s.tekst) + (s.type === "valg" && s.riktig != null ? " ✔" : "") + '</span><span class="cs-rekkeknapper"><button type="button" class="knapp liten hoved" data-send="' + i + '">▶ Send</button><button type="button" class="knapp liten" data-rediger="' + i + '" aria-label="Rediger spørsmål ' + (i + 1) + '">✏️</button><button type="button" class="knapp liten" data-opp="' + i + '" aria-label="Flytt opp"' + (i ? "" : " disabled") + '>↑</button><button type="button" class="knapp liten" data-fjern="' + i + '" aria-label="Fjern spørsmål ' + (i + 1) + '">✕</button></span></li>').join("") : '<li class="cs-tomrad">Ingen spørsmål i rekka ennå.</li>';
  }

  // ---------- Rom og sending ----------
  async function apneRom() {
    if (K) return true;
    const el = $("cs-rom"); el.innerHTML = '<p class="rv-status">📱 Åpner rommet …</p>';
    try {
      await LV.lastSkript("assets/rom.js"); await LV.lastSkript("assets/romklasse.js");
      K = await LV.romKlasse.apne(el, { tittel: "Klassesvar", onSvar: tegnVis, onEndret: tegnVis, onLukket: () => { K = null; $("cs-rom").innerHTML = '<p><button type="button" class="knapp hoved" id="cs-romstart">📱 Åpne rom for klassen</button></p>'; } });
      return true;
    } catch (e) { el.innerHTML = '<p class="rv-feil">Klarte ikke å åpne rommet. ' + esc(LV.rom ? LV.rom.feilTekst(e) : "") + '</p><p><button type="button" class="knapp hoved" id="cs-romstart">Prøv igjen</button></p>'; return false; }
  }
  async function send(s, fra) {
    if (!(await apneRom())) return;
    lagreLogg();
    const valg = s.type === "valg" ? s.valg : FASTE[s.type];
    aktiv = { s, fra: fra == null ? null : fra, id: "cs" + (++sporNr), aapen: true };
    visFasit = false;
    if (valg) K.spor({ id: aktiv.id, type: "valg", tekst: s.tekst, valg: valg.map((v, i) => ({ id: String(i), tekst: v, farge: FARGER[i % FARGER.length] })) });
    else if (s.type === "ordsky") K.spor({ id: aktiv.id, type: "skjema", tekst: s.tekst, felt: Array.from({ length: s.antall }, (_, i) => ({ id: "o" + i, tekst: s.antall > 1 ? "Ord " + (i + 1) : "Ditt ord", type: "linje" })) });
    else if (s.type === "apen") K.spor({ id: aktiv.id, type: "skjema", tekst: s.tekst, anonym, felt: [{ id: "t", tekst: "Svaret ditt", type: "tekst", rader: 3 }] });
    else if (s.type === "skala") K.spor({ id: aktiv.id, type: "skjema", tekst: s.tekst, felt: [{ id: "s", tekst: (s.lav || s.hoy) ? "1 = " + (s.lav || "lavest") + " · 5 = " + (s.hoy || "høyest") : "Velg fra 1 til 5", type: "skala" }] });
    tegnRekke(); tegnVis();
    $("cs-vis").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // ---------- Resultater ----------
  const ordNorm = t => String(t || "").toLowerCase().replace(/^[\s"'«»().,!?:;–-]+|[\s"'«»().,!?:;–-]+$/g, "").replace(/\s+/g, " ").slice(0, 40);
  function resultat() {
    const s = aktiv.s, svar = [...K.svar.entries()];
    if (s.type === "valg" || FASTE[s.type]) {
      const valg = s.type === "valg" ? s.valg : FASTE[s.type], n = valg.map(() => 0);
      svar.forEach(([, v]) => { if (n[+v] != null) n[+v]++; });
      return { type: "stolper", valg, n, sum: svar.length };
    }
    if (s.type === "ordsky") {
      const m = new Map();
      svar.forEach(([, v]) => Object.values(v || {}).forEach(o => { const k = ordNorm(o); if (k) m.set(k, (m.get(k) || 0) + 1); }));
      return { type: "ordsky", ord: [...m.entries()].sort((a, b) => b[1] - a[1]), sum: svar.length };
    }
    if (s.type === "apen") return { type: "kort", svar: svar.map(([id, v]) => ({ navn: K.navn(id), tekst: (v && v.t) || "" })).filter(x => x.tekst), sum: svar.length };
    const n = [0, 0, 0, 0, 0]; let sumv = 0, ant = 0;
    svar.forEach(([, v]) => { const x = +(v && v.s); if (x >= 1 && x <= 5) { n[x - 1]++; sumv += x; ant++; } });
    return { type: "skala", n, snitt: ant ? sumv / ant : null, sum: svar.length };
  }
  const stolper = (etiketter, n, sum, riktig) => '<ul class="cs-stolper">' + etiketter.map((e, i) => '<li' + (riktig === i ? ' class="cs-rett"' : "") + '><span class="cs-etikett">' + (riktig === i ? "✔ " : "") + esc(e) + '</span><span class="cs-stolpe"><span style="width:' + (sum ? n[i] / Math.max(...n, 1) * 100 : 0) + "%;background:" + FARGER[i % FARGER.length] + '"></span></span><span class="cs-tall">' + n[i] + (sum ? ' <small>(' + Math.round(n[i] / sum * 100) + " %)</small>" : "") + "</span></li>").join("") + "</ul>";
  function ordsky(ord) {
    if (!ord.length) return '<p class="cs-tom">Ingen ord ennå …</p>';
    const maks = ord[0][1], l = ord.slice(0, 60), midt = [];
    l.forEach((o, i) => { if (i % 2) midt.push(o); else midt.unshift(o); });   // de største i midten
    return '<div class="cs-ordsky">' + midt.map(([o, n], i) => '<span style="font-size:' + (1 + (n / maks) * 2.6).toFixed(2) + "rem;color:" + FARGER[i % FARGER.length] + '" title="' + n + '">' + esc(o) + "</span>").join("") + "</div>";
  }
  function tegnVis() {
    const el = $("cs-vis"); if (!el || !aktiv) return;
    const s = aktiv.s, r = resultat(), antall = K ? K.antall() : 0;
    let h = '<div class="cs-vishode"><span class="cs-typeikon">' + TYPER[s.type].ikon + " " + TYPER[s.type].navn + '</span><span class="cs-telling">📱 <strong>' + r.sum + "</strong> av " + antall + " har svart" + (aktiv.aapen ? "" : " · 🔒 stengt") + "</span></div>" +
      '<h2 class="cs-sporsmal">' + esc(s.tekst) + "</h2>";
    if (!visResultat) h += '<p class="cs-skjult">Resultatene er skjult. Trykk «Vis resultatene» når dere er klare.</p>';
    else if (r.type === "stolper") h += stolper(r.valg, r.n, r.sum, visFasit && s.type === "valg" ? s.riktig : null);
    else if (r.type === "ordsky") h += ordsky(r.ord);
    else if (r.type === "kort") h += r.svar.length ? '<ul class="cs-kort">' + r.svar.map(x => "<li><p>" + esc(x.tekst) + "</p>" + (anonym ? "" : '<p class="cs-navn">– ' + esc(x.navn) + "</p>") + "</li>").join("") + "</ul>" : '<p class="cs-tom">Ingen svar ennå …</p>';
    else h += stolper(["1" + (s.lav ? " – " + s.lav : ""), "2", "3", "4", "5" + (s.hoy ? " – " + s.hoy : "")], r.n, r.sum, null) + (r.snitt != null ? '<p class="cs-snitt">Gjennomsnitt: <strong>' + r.snitt.toFixed(1).replace(".", ",") + "</strong></p>" : "");
    const nesteNr = aktiv.fra != null && aktiv.fra + 1 < rekke.length ? aktiv.fra + 1 : null;
    h += '<p class="mu-knapper cs-kontroll"><button type="button" class="knapp" id="cs-visres">' + (visResultat ? "🙈 Skjul resultatene" : "👀 Vis resultatene") + "</button>" +
      (s.type === "valg" && s.riktig != null && !visFasit ? '<button type="button" class="knapp hoved" id="cs-fasit">✔ Vis fasit</button>' : "") +
      (aktiv.aapen ? '<button type="button" class="knapp" id="cs-steng">🔒 Steng svarene</button>' : "") +
      (nesteNr != null ? '<button type="button" class="knapp hoved" data-send="' + nesteNr + '">⏭ Neste: ' + esc(rekke[nesteNr].tekst.slice(0, 30)) + (rekke[nesteNr].tekst.length > 30 ? "…" : "") + "</button>" : "") +
      '<button type="button" class="knapp" id="cs-full">⛶ Fullskjerm</button></p>';
    el.innerHTML = h;
  }

  function stengSvar(tekst) {
    if (!aktiv || !aktiv.aapen) return;
    aktiv.aapen = false; K.lukkSporsmal(tekst || "Takk for svaret! Se tavla.");
  }
  function lagreLogg() {
    if (!aktiv || !K) return;
    const r = resultat(), s = aktiv.s;
    let linjer = [];
    if (r.type === "stolper") linjer = r.valg.map((v, i) => "- " + v + ": " + r.n[i] + (s.type === "valg" && s.riktig === i ? " (riktig)" : ""));
    else if (r.type === "ordsky") linjer = r.ord.map(([o, n]) => "- " + o + (n > 1 ? " (" + n + ")" : ""));
    else if (r.type === "kort") linjer = r.svar.map(x => "- " + x.tekst);
    else linjer = r.n.map((n, i) => "- " + (i + 1) + ": " + n).concat(r.snitt != null ? ["- Gjennomsnitt: " + r.snitt.toFixed(1).replace(".", ",")] : []);
    logg.push(TYPER[s.type].navn + ": " + s.tekst + " (" + r.sum + " svar)\n" + linjer.join("\n"));
  }

  async function klikk(e) {
    const b = e.target.closest("button"); if (!b) return;
    if (b.id === "cs-romstart") return apneRom();
    if (b.dataset.hurtig != null) { const h = HURTIG[+b.dataset.hurtig]; $("cs-type").value = h.type; $("cs-tekst").value = h.tekst; tegnEkstra(h); $("cs-tekst").focus(); return; }
    if (b.id === "cs-ingenfasit") { document.querySelectorAll('input[name="cs-riktig"]').forEach(x => { x.checked = false; }); return; }
    if (b.dataset.send != null) { const i = +b.dataset.send; if (rekke[i]) send(rekke[i], i); return; }
    if (b.dataset.rediger != null) { const s = rekke[+b.dataset.rediger]; $("cs-type").value = s.type; $("cs-tekst").value = s.tekst; tegnEkstra(s); rekke.splice(+b.dataset.rediger, 1); tegnRekke(); $("cs-tekst").focus(); return; }
    if (b.dataset.opp != null) { const i = +b.dataset.opp; if (i > 0) { [rekke[i - 1], rekke[i]] = [rekke[i], rekke[i - 1]]; tegnRekke(); } return; }
    if (b.dataset.fjern != null) { rekke.splice(+b.dataset.fjern, 1); tegnRekke(); return; }
    if (b.id === "cs-visres") { visResultat = !visResultat; tegnVis(); return; }
    if (b.id === "cs-fasit") {
      visFasit = true; visResultat = true;
      const s = aktiv.s;
      if (aktiv.aapen) { aktiv.aapen = false; K.lukkSporsmal(id => { const v = K.svar.get(id); return (v == null ? "Du svarte ikke." : +v === s.riktig ? "✔ Riktig!" : "✘ Du svarte «" + s.valg[+v] + "».") + "\nRiktig svar: " + s.valg[s.riktig]; }); }
      tegnVis(); return;
    }
    if (b.id === "cs-steng") { stengSvar(); tegnVis(); return; }
    if (b.id === "cs-full") { const v = $("cs-vis"); if (document.fullscreenElement) document.exitFullscreen(); else if (v.requestFullscreen) v.requestFullscreen(); return; }
    if (b.id === "cs-lenke") {
      if (!rekke.length) { $("cs-lenkestatus").textContent = "Rekka er tom."; return; }
      const url = location.origin + location.pathname + "#r=" + tilLenke();
      history.replaceState(null, "", url);
      try { await navigator.clipboard.writeText(url); $("cs-lenkestatus").textContent = "✔ Lenken er kopiert. Lagre den som bokmerke eller i planen din."; } catch (er) { $("cs-lenkestatus").textContent = "Lenken står nå i adressefeltet – lagre den som bokmerke."; }
      return;
    }
    if (b.id === "cs-eksport") {
      if (!logg.length && !aktiv) { $("cs-eksportstatus").textContent = "Ingen spørsmål er stilt ennå."; return; }
      const forLengde = logg.length; lagreLogg(); const tekst = "Klassesvar " + new Date().toLocaleDateString("nb-NO") + "\n\n" + logg.join("\n\n"); logg.length = forLengde;
      try { await navigator.clipboard.writeText(tekst); $("cs-eksportstatus").textContent = "✔ Resultatene er kopiert. Lim dem inn i et dokument."; } catch (er) { $("cs-eksportstatus").textContent = "Kunne ikke kopiere automatisk."; }
    }
  }

  document.addEventListener("DOMContentLoaded", side);
})();
