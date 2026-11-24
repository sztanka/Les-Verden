/* =========================================================
   Les verden – Dypdykk (dypdykk.html)
   Kategorispill: skriv ett svar per kategori før tiden går ut.
   Jo sjeldnere svaret er, jo dypere dykker du (poeng × 10 = meter).
   Moduser: dagens dykk (samme sju kategorier for alle i dag),
   øvingsdykk (sju tilfeldige) og «På tavla» (klassemodus).
   ?fag=samfunnsfag|engelsk. Ingenting lagres.
   Data: data/dypdykk.js (+ data/land/uttrykk.js for én kategori).
   ========================================================= */
(function () {
  const LV = window.LV;
  const $ = id => document.getElementById(id);
  const esc = s => LV.esc(String(s == null ? "" : s));
  const ANTALL = 7;

  const TEKST = {
    nb: {
      tittel: "Dypdykk", over: "Spill · kategorier", ingress: "Skriv ett svar til hver kategori før tiden går ut. Svar det alle tenker på, og du blir ved overflaten. Finn et sjeldent svar, og du dykker dypt. Hvor langt ned kommer du?",
      dagens: "📅 Dagens dykk", dagensT: "De samme sju kategoriene for alle i dag – sammenlign med klassen!", ovelse: "🎲 Øvingsdykk", ovelseT: "Sju tilfeldige kategorier. Spill så mange ganger du vil.", tavle: "🖥️ På tavla", tavleT: "Klassemodus: vis én kategori, la elevene skrive på ark, og avslør hvor sjeldne svarene er.",
      tid: "Tid per kategori", sek: "sekunder", uten: "Ingen tidsgrense", start: "Start", slikT: "Slik fungerer det", slik: ["Du får sju kategorier, for eksempel «Et land i EU».", "Skriv ett svar før tiden går ut. Får du «ikke på lista», kan du prøve igjen så lenge tiden går.", "Svaret havner på et av fem nivåer. Jo sjeldnere, jo flere poeng – og hvert poeng er ti meter ned.", "Etter hver kategori ser du noen svar som ville tatt deg enda dypere."],
      kategori: "Kategori", av: "av", dykk: "Dykk!", svarLabel: "Svaret ditt", giOpp: "Jeg står fast", neste: "Neste kategori →", resultat: "Se resultatet →",
      ikkeFunnet: s => "«" + s + "» står ikke på lista. Sjekk skrivemåten, eller prøv et annet svar.", tomt: "Skriv et svar først.", tidUte: "⏰ Tiden er ute!", staFast: "Ingen fare – her er noen svar du kunne brukt:",
      dypere: "Svar som ville tatt deg dypere:", andre: "Andre gode svar:", poeng: "poeng", meter: "meter",
      ferdig: "Dykket er over!", dittSvar: "Ditt svar", ingenSvar: "Ikke svart", alleSvar: "Se alle svarene", kopier: "📋 Kopier resultatet", kopiert: "Kopiert! Lim inn i klassechatten eller send til læreren.", igjen: "🎲 Nytt øvingsdykk", tilbake: "← Til start",
      tavleVelg: "Velg kategori", tilfeldig: "🎲 Tilfeldig kategori", nedtelling: "▶ Start nedtelling", visSvar: "👀 Vis svarene", skjulSvar: "🙈 Skjul svarene", sjekk: "Sjekk et svar", sjekkKnapp: "Sjekk", tavleIntro: "Elevene skriver ett svar hver på ark eller mini-whiteboard. Sjekk svarene her, eller vis hele lista til slutt.",
      nivaaer: "Nivåene", dagensMerke: "Dagens dykk", ovelseMerke: "Øvingsdykk", fag: "Fag", tidIgjen: "sekunder igjen", ikkeLista: "Ikke på lista"
    },
    en: {
      tittel: "Dypdykk", over: "Game · categories", ingress: "Write one answer for each category before time runs out. Give the answer everyone thinks of, and you stay at the surface. Find a rare answer, and you dive deep. How far down can you go?",
      dagens: "📅 Today’s dive", dagensT: "The same seven categories for everyone today – compare with your class!", ovelse: "🎲 Practice dive", ovelseT: "Seven random categories. Play as many times as you like.", tavle: "🖥️ On the board", tavleT: "Class mode: show one category, let students write on paper, then reveal how rare the answers are.",
      tid: "Time per category", sek: "seconds", uten: "No time limit", start: "Start", slikT: "How it works", slik: ["You get seven categories, for example “A US state”.", "Write one answer before time runs out. If it says “not on the list”, you can try again while the clock is running.", "Your answer lands on one of five levels. The rarer, the more points – and every point takes you ten metres down.", "After each category you see some answers that would have taken you even deeper."],
      kategori: "Category", av: "of", dykk: "Dive!", svarLabel: "Your answer", giOpp: "I’m stuck", neste: "Next category →", resultat: "See your result →",
      ikkeFunnet: s => "“" + s + "” is not on the list. Check the spelling, or try another answer.", tomt: "Write an answer first.", tidUte: "⏰ Time’s up!", staFast: "No problem – here are some answers you could have used:",
      dypere: "Answers that would have taken you deeper:", andre: "Other good answers:", poeng: "points", meter: "metres",
      ferdig: "The dive is over!", dittSvar: "Your answer", ingenSvar: "No answer", alleSvar: "See all the answers", kopier: "📋 Copy your result", kopiert: "Copied! Paste it in the class chat or send it to your teacher.", igjen: "🎲 New practice dive", tilbake: "← Back to start",
      tavleVelg: "Choose a category", tilfeldig: "🎲 Random category", nedtelling: "▶ Start the countdown", visSvar: "👀 Show the answers", skjulSvar: "🙈 Hide the answers", sjekk: "Check an answer", sjekkKnapp: "Check", tavleIntro: "Students write one answer each on paper or a mini-whiteboard. Check answers here, or show the whole list at the end.",
      nivaaer: "The levels", dagensMerke: "Today’s dive", ovelseMerke: "Practice dive", fag: "Subject", tidIgjen: "seconds left", ikkeLista: "Not on the list"
    }
  };

  // ---------- Tekstnormalisering og matching ----------
  const fold = s => String(s || "").toLowerCase().replace(/æ/g, "ae").replace(/ø/g, "o").replace(/å/g, "a")
    .normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/&/g, " and ").replace(/['’`´.]/g, "");
  const norm = (s, en) => {
    let x = fold(s).replace(/[…]/g, " ").trim();
    x = en ? x.replace(/^(the|a|an|to)\s+/, "") : x.replace(/^(det|den|de)\s+/, "");
    return x.replace(/[^a-z0-9]/g, "");
  };
  function lev(a, b) {
    if (Math.abs(a.length - b.length) > 2) return 9;
    const d = Array.from({ length: a.length + 1 }, (_, i) => [i]);
    for (let j = 1; j <= b.length; j++) d[0][j] = j;
    for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++)
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    return d[a.length][b.length];
  }
  const toleranse = n => (n >= 9 ? 2 : n >= 5 ? 1 : 0);

  // Bygger oppslag for en kategori: [{ navn, nivaa, alts, ord }]
  const cache = {};
  function oppslag(kat) {
    if (cache[kat.id]) return cache[kat.id];
    const en = kat.fag === "engelsk", liste = [];
    const leggTil = (tekst, nivaa, ekstraF) => {
      const deler = tekst.split("|").map(x => x.trim()).filter(Boolean); if (!deler.length) return;
      const navn = deler[0].replace(/^~/, "");
      const alts = [], ord = [];
      deler.forEach(d => { if (d[0] === "~") ord.push(norm(d.slice(1), en)); else { alts.push(norm(d, en)); d.split(/\s*\/\s*/).forEach(x => { if (x !== d) alts.push(norm(x, en)); }); } });
      liste.push({ navn, nivaa, alts: [...new Set(alts.filter(Boolean))], ord: ord.filter(Boolean), f: ekstraF || (kat.f || {})[navn] || "" });
    };
    if (kat.fraLand && LV.landUttrykk) {
      const NIVAA = { uk: 1, usa: 1, australia: 2, ireland: 2, canada: 2, newzealand: 2, southafrica: 3, india: 3, singapore: 3, jamaica: 4, nigeria: 4 };
      const sett = new Set();
      Object.keys(LV.landUttrykk).forEach(id => {
        const ak = LV.AKSENTER.find(a => a[2] === id);
        LV.landUttrykk[id].forEach(u => {
          const navn = u.o.replace(/\s*…\s*$/, "").trim(); const k = norm(navn, true);
          if (sett.has(k)) return; sett.add(k);
          leggTil(navn + "|" + u.o.split("/").map(x => x.replace(/…/, "").trim()).join("|"), NIVAA[id] || 3, (ak ? ak[3] + " " + ak[1] : "") + ": " + u.b);
        });
      });
    } else {
      kat.n.forEach((rad, i) => rad.split(";").forEach(x => leggTil(x, i + 1)));
    }
    const feil = Object.keys(kat.feil || {}).map(k => ({ alts: k.split("|").map(x => norm(x, en)), tekst: kat.feil[k] }));
    return (cache[kat.id] = { liste, feil, en });
  }
  function varianter(x, en) {
    const v = [x];
    if (!en) { const u = x.replace(/(fylket|fylke|kommune)$/, ""); if (u !== x && u.length >= 3) v.push(u); }
    if (!en) ["ene", "ane", "en", "et", "a", "n", "e"].forEach(s => { if (x.endsWith(s) && x.length - s.length >= 3) v.push(x.slice(0, -s.length)); });
    else ["s", "es"].forEach(s => { if (x.endsWith(s) && x.length - s.length >= 3) v.push(x.slice(0, -s.length)); });
    return v;
  }
  // Returnerer { treff } | { feil } | null
  function sjekk(kat, svar) {
    const o = oppslag(kat), x = norm(svar, o.en); if (!x) return null;
    const v = varianter(x, o.en);
    let t = o.liste.find(e => e.alts.some(a => v.includes(a))); if (t) return { treff: t };
    let f = o.feil.find(e => e.alts.some(a => v.includes(a))); if (f) return { feil: f.tekst };
    t = o.liste.find(e => e.ord.some(k => x.includes(k))); if (t) return { treff: t };
    let best = null, bestD = 9;
    o.liste.forEach(e => e.alts.forEach(a => { const tol = toleranse(a.length); if (!tol) return; v.forEach(y => { const d = lev(y, a); if (d <= tol && d < bestD) { best = e; bestD = d; } }); }));
    if (best) return { treff: best };
    if (kat.fraLand && x.length >= 4) { t = o.liste.find(e => e.alts.some(a => a.includes(x))); if (t) return { treff: t }; }
    for (const e of o.feil) for (const a of e.alts) { if (toleranse(a.length) && lev(x, a) <= toleranse(a.length)) return { feil: e.tekst }; }
    return null;
  }

  // ---------- Hjelpere ----------
  function rng(seed) { let a = seed >>> 0; return () => { a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
  const stokk = (a, r) => { a = a.slice(); r = r || Math.random; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const NIV = () => LV.dypdykk.nivaa;
  const nivaaNavn = (n, en) => NIV()[n - 1].ikon + " " + (en ? NIV()[n - 1].en : NIV()[n - 1].nb);
  const fmt = n => n.toLocaleString("nb-NO");

  // ---------- Tilstand ----------
  const fag = LV.param("fag") === "engelsk" ? "engelsk" : "samfunnsfag";
  const en = fag === "engelsk", T = TEKST[en ? "en" : "nb"];
  const KAT = () => LV.dypdykk.kategorier.filter(k => k.fag === fag && (!k.fraLand || LV.landUttrykk));
  let tidsgrense = 25, spill = null, klokke = null;

  function bygg() {
    document.title = "Dypdykk – " + (LV.config ? LV.config.navn : "Les verden");
    const m = LV.param("modus");
    if (m === "tavle") return tavle();
    start();
  }

  // ---------- Start ----------
  function start() {
    stoppKlokke();
    const nivaa = NIV().map((n, i) => '<li><span class="dd-niv dd-niv-' + (i + 1) + '">' + n.ikon + " " + esc(en ? n.en : n.nb) + "</span> " + n.p + " " + T.poeng + " · " + fmt(n.p * 10) + " m</li>").join("");
    $("innhold").innerHTML = '<nav class="brodsmuler" aria-label="Brødsmuler"><a href="index.html">Forside</a> › <a href="spill.html">Spill</a> › Dypdykk</nav>' +
      '<header class="sidehode"><p class="overlinje">' + T.over + '</p><h1>🤿 Dypdykk</h1><p class="ingress"' + (en ? ' lang="en"' : "") + ">" + T.ingress + "</p>" +
      '<div class="kd-filter" role="group" aria-label="Fag"><a class="knapp liten" href="dypdykk.html"' + (!en ? ' aria-current="true"' : "") + '>Samfunnsfag</a><a class="knapp liten" href="dypdykk.html?fag=engelsk"' + (en ? ' aria-current="true"' : "") + ">Engelsk</a></div></header>" +
      '<div class="dd-start"' + (en ? ' lang="en"' : "") + '><div class="dd-moduser">' +
      '<button type="button" class="dd-modus" data-m="dagens"><strong>' + T.dagens + "</strong><span>" + T.dagensT + "</span></button>" +
      '<button type="button" class="dd-modus" data-m="ovelse"><strong>' + T.ovelse + "</strong><span>" + T.ovelseT + "</span></button>" +
      '<a class="dd-modus" href="dypdykk.html?modus=tavle' + (en ? "&fag=engelsk" : "") + '"><strong>' + T.tavle + "</strong><span>" + T.tavleT + "</span></a></div>" +
      '<p class="dd-tidvalg"><label for="dd-tid">' + T.tid + '</label> <select id="dd-tid"><option value="25">25 ' + T.sek + '</option><option value="45">45 ' + T.sek + '</option><option value="90">90 ' + T.sek + '</option><option value="0">' + T.uten + "</option></select></p>" +
      '<div class="dd-info"><section><h2>' + T.slikT + "</h2><ol>" + T.slik.map(x => "<li>" + x + "</li>").join("") + '</ol></section><section><h2>' + T.nivaaer + '</h2><ul class="dd-nivaaliste">' + nivaa + "</ul></section></div></div>";
    $("dd-tid").value = String(tidsgrense);
    $("dd-tid").addEventListener("change", e => { tidsgrense = +e.target.value; });
    document.querySelectorAll("button.dd-modus").forEach(b => b.addEventListener("click", () => nyttSpill(b.dataset.m)));
  }

  function nyttSpill(modus) {
    let kat;
    if (modus === "dagens") {
      const dag = Math.floor((Date.now() - new Date().getTimezoneOffset() * 6e4) / 864e5);
      kat = stokk(KAT(), rng(dag * 7919 + (en ? 17 : 3))).slice(0, ANTALL);
    } else kat = stokk(KAT()).slice(0, ANTALL);
    spill = { modus, kat, i: 0, svar: [], dato: new Date().toLocaleDateString("nb-NO") };
    runde();
  }

  // ---------- Én kategori ----------
  function dybde() { return spill.svar.reduce((s, x) => s + (x.treff ? NIV()[x.treff.nivaa - 1].p : 0), 0) * 10; }
  function maaler() {
    const d = dybde(), maks = ANTALL * 1000;
    return '<div class="dd-maaler" aria-hidden="true"><div class="dd-maaler-fyll" style="width:' + Math.min(100, d / maks * 100) + '%"></div></div><p class="dd-dybde"><span class="dd-dybde-tall">' + fmt(d) + " m</span></p>";
  }
  function runde() {
    stoppKlokke();
    const kat = spill.kat[spill.i];
    $("innhold").innerHTML = '<div class="dd-spill"' + (en ? ' lang="en"' : "") + '><div class="dd-topp"><p class="dd-merke">' + (spill.modus === "dagens" ? T.dagensMerke + " · " + spill.dato : T.ovelseMerke) + " · " + T.kategori + " " + (spill.i + 1) + " " + T.av + " " + ANTALL + "</p>" + maaler() + "</div>" +
      '<section class="dd-kort" aria-labelledby="dd-kat"><h1 class="dd-kat" id="dd-kat">' + esc(kat.t) + "</h1>" + (kat.h ? '<p class="dd-hint">' + esc(kat.h) + "</p>" : "") +
      (tidsgrense ? '<div class="dd-tid" aria-hidden="true"><div class="dd-tid-fyll" id="dd-tid-fyll"></div></div><p class="dd-sek" id="dd-sek">' + tidsgrense + " " + T.tidIgjen + "</p>" : "") +
      '<form id="dd-skjema" class="dd-skjema" autocomplete="off"><label for="dd-svar" class="skjult-visuelt">' + T.svarLabel + '</label><input id="dd-svar" type="text" spellcheck="false" autocapitalize="off" placeholder="' + T.svarLabel + ' …"><button type="submit" class="knapp hoved">' + T.dykk + "</button></form>" +
      '<p class="dd-melding" id="dd-melding" role="status" aria-live="polite"></p><div id="dd-etter"></div>' +
      '<p class="dd-giopp-rad"><button type="button" class="knapp liten" id="dd-giopp">' + T.giOpp + "</button></p></section></div>";
    const inp = $("dd-svar"); inp.focus();
    $("dd-skjema").addEventListener("submit", e => {
      e.preventDefault(); if (spill.lukket) return;
      const s = inp.value.trim(); if (!s) { $("dd-melding").textContent = T.tomt; return; }
      const r = sjekk(kat, s);
      if (!r) { $("dd-melding").textContent = T.ikkeFunnet(s); inp.select(); return; }
      if (r.feil) { $("dd-melding").textContent = "✋ " + r.feil; inp.select(); return; }
      avslutt({ tekst: s, treff: r.treff });
    });
    $("dd-giopp").addEventListener("click", () => avslutt({ tekst: "", treff: null, giOpp: true }));
    spill.lukket = false;
    if (tidsgrense) {
      const slutt = Date.now() + tidsgrense * 1000;
      klokke = setInterval(() => {
        const igjen = Math.max(0, (slutt - Date.now()) / 1000);
        const fyll = $("dd-tid-fyll"); if (!fyll) return stoppKlokke();
        fyll.style.width = (igjen / tidsgrense * 100) + "%";
        fyll.classList.toggle("lite", igjen <= 5);
        $("dd-sek").textContent = Math.ceil(igjen) + " " + T.tidIgjen;
        if (igjen <= 0) avslutt({ tekst: inp.value.trim(), treff: null, tidUte: true });
      }, 200);
    }
  }
  function stoppKlokke() { if (klokke) { clearInterval(klokke); klokke = null; } }

  function eksempler(kat, over, antall) {
    const o = oppslag(kat), kand = o.liste.filter(e => e.nivaa > over);
    const fra = kand.length ? kand : o.liste;
    return stokk(fra).sort((a, b) => b.nivaa - a.nivaa).slice(0, antall * 2).sort(() => Math.random() - .5).slice(0, antall).sort((a, b) => a.nivaa - b.nivaa);
  }
  const eksListe = liste => '<ul class="dd-eks">' + liste.map(e => '<li><span class="dd-niv dd-niv-' + e.nivaa + '">' + NIV()[e.nivaa - 1].ikon + '</span> <strong>' + esc(e.navn) + "</strong>" + (e.f ? " – " + esc(e.f) : "") + "</li>").join("") + "</ul>";

  function avslutt(res) {
    if (spill.lukket) return;
    spill.lukket = true; stoppKlokke();
    const kat = spill.kat[spill.i];
    spill.svar.push(res);
    $("dd-svar").disabled = true; $("dd-skjema").querySelector("button").disabled = true; $("dd-giopp").hidden = true;
    let h = "";
    if (res.treff) {
      const n = NIV()[res.treff.nivaa - 1];
      h += '<div class="dd-resultat dd-niv-bg-' + res.treff.nivaa + '"><p class="dd-res-niv">' + n.ikon + " " + esc(en ? n.en : n.nb) + '</p><p class="dd-res-svar"><strong>' + esc(res.treff.navn) + "</strong> · +" + n.p + " " + T.poeng + " · " + fmt(n.p * 10) + " m</p>" + (res.treff.f ? '<p class="dd-res-f">' + esc(res.treff.f) + "</p>" : "") + "</div>";
      if (res.treff.nivaa < 5) h += "<p><strong>" + T.dypere + "</strong></p>" + eksListe(eksempler(kat, res.treff.nivaa, 3));
      else h += "<p><strong>" + T.andre + "</strong></p>" + eksListe(eksempler(kat, 2, 3).filter(e => e !== res.treff));
      $("dd-melding").textContent = "";
    } else {
      $("dd-melding").textContent = res.tidUte ? T.tidUte : "";
      h += "<p><strong>" + T.staFast + "</strong></p>" + eksListe(eksempler(kat, 1, 4));
    }
    const sist = spill.i === ANTALL - 1;
    h += '<p><button type="button" class="knapp hoved" id="dd-neste">' + (sist ? T.resultat : T.neste) + "</button></p>";
    $("dd-etter").innerHTML = h;
    document.querySelector(".dd-topp").innerHTML = document.querySelector(".dd-topp .dd-merke").outerHTML + maaler();
    $("dd-neste").focus();
    $("dd-neste").addEventListener("click", () => { spill.i++; if (sist) oppsummering(); else runde(); });
  }

  // ---------- Oppsummering ----------
  function alleSvar(kat) {
    const o = oppslag(kat);
    return [5, 4, 3, 2, 1].map(n => { const l = o.liste.filter(e => e.nivaa === n); return l.length ? '<div class="dd-alle-niv"><h4>' + nivaaNavn(n, en) + "</h4><p>" + l.map(e => esc(e.navn)).join(" · ") + "</p></div>" : ""; }).join("");
  }
  function oppsummering() {
    const d = dybde();
    const rader = spill.kat.map((kat, i) => {
      const s = spill.svar[i], n = s.treff ? NIV()[s.treff.nivaa - 1] : null;
      return '<li class="dd-oppsum-rad"><div class="dd-oppsum-hode"><span class="dd-oppsum-ikon" aria-hidden="true">' + (n ? n.ikon : "⬛") + '</span><div><strong>' + esc(kat.t) + "</strong><br>" + T.dittSvar + ": " + (s.treff ? esc(s.treff.navn) + " – " + nivaaNavn(s.treff.nivaa, en) + " (" + n.p + " " + T.poeng + ")" : T.ingenSvar) + "</div></div>" +
        "<details><summary>" + T.alleSvar + "</summary>" + alleSvar(kat) + "</details></li>";
    }).join("");
    $("innhold").innerHTML = '<div class="dd-spill"' + (en ? ' lang="en"' : "") + '><header class="dd-oppsum-topp"><p class="dd-merke">' + (spill.modus === "dagens" ? T.dagensMerke + " · " + spill.dato : T.ovelseMerke) + "</p><h1>" + T.ferdig + '</h1><p class="dd-total">🤿 ' + fmt(d) + " " + T.meter + '</p><p class="dd-ruter" aria-hidden="true">' + spill.svar.map(s => s.treff ? NIV()[s.treff.nivaa - 1].ikon : "⬛").join("") + "</p>" + maaler().replace(/<p class="dd-dybde">.*<\/p>/, "") + "</header>" +
      '<ol class="dd-oppsum">' + rader + "</ol>" +
      '<div class="mu-knapper"><button type="button" class="knapp hoved" id="dd-kopier">' + T.kopier + '</button><button type="button" class="knapp" id="dd-igjen">' + T.igjen + '</button><button type="button" class="knapp" id="dd-tilbake">' + T.tilbake + '</button></div><p class="status" id="dd-kopistatus" role="status"></p></div>';
    $("dd-kopier").addEventListener("click", () => {
      const tekst = "🤿 Dypdykk – " + (en ? "English" : "samfunnsfag") + ", " + (spill.modus === "dagens" ? (en ? "today’s dive " : "dagens dykk ") + spill.dato : (en ? "practice dive" : "øvingsdykk")) + "\n" +
        spill.svar.map(s => s.treff ? NIV()[s.treff.nivaa - 1].ikon : "⬛").join("") + "\n" + fmt(d) + " " + T.meter + "\n" + location.origin + location.pathname + (en ? "?fag=engelsk" : "");
      const ok = () => { $("dd-kopistatus").textContent = T.kopiert; };
      if (navigator.clipboard) navigator.clipboard.writeText(tekst).then(ok, () => { $("dd-kopistatus").textContent = tekst; });
      else $("dd-kopistatus").textContent = tekst;
    });
    $("dd-igjen").addEventListener("click", () => nyttSpill("ovelse"));
    $("dd-tilbake").addEventListener("click", start);
  }

  // ---------- På tavla ----------
  function tavle() {
    const alle = KAT();
    let kat = alle[Math.floor(Math.random() * alle.length)], tavleKlokke = null;
    $("innhold").innerHTML = '<nav class="brodsmuler" aria-label="Brødsmuler"><a href="index.html">Forside</a> › <a href="spill.html">Spill</a> › <a href="dypdykk.html' + (en ? "?fag=engelsk" : "") + '">Dypdykk</a> › ' + (en ? "On the board" : "På tavla") + "</nav>" +
      '<div class="dd-tavle"' + (en ? ' lang="en"' : "") + '><p class="mu-intro">' + T.tavleIntro + "</p>" +
      '<div class="dd-romvalg" lang="nb"><p id="dd-romknapp"><button type="button" class="knapp" id="dd-romstart">📱 La elevene sende svarene fra mobilen (romkode)</button></p><div id="dd-rom"></div></div>' +
      '<div class="dd-tavle-valg"><label for="dd-tkat">' + T.tavleVelg + '</label> <select id="dd-tkat">' + alle.map(k => '<option value="' + k.id + '">' + esc(k.t) + "</option>").join("") + '</select> <button type="button" class="knapp" id="dd-tilf">' + T.tilfeldig + '</button> <label for="dd-ttid">' + T.tid + '</label> <select id="dd-ttid"><option value="25">25 s</option><option value="45">45 s</option><option value="60" selected>60 s</option><option value="90">90 s</option></select></div>' +
      '<section class="dd-kort dd-tavle-kort"><h1 class="dd-kat" id="dd-tk"></h1><p class="dd-hint" id="dd-th"></p><p class="dd-tavle-sek" id="dd-tsek" aria-live="off"></p>' +
      '<div class="mu-knapper"><button type="button" class="knapp hoved" id="dd-tstart">' + T.nedtelling + '</button><button type="button" class="knapp" id="dd-tvis" aria-expanded="false">' + T.visSvar + "</button></div>" +
      '<form class="dd-skjema" id="dd-tsjekk" autocomplete="off"><label for="dd-tsvar">' + T.sjekk + '</label><input id="dd-tsvar" type="text" spellcheck="false"><button type="submit" class="knapp">' + T.sjekkKnapp + '</button></form><p class="dd-melding" id="dd-tmeld" role="status" aria-live="polite"></p>' +
      '<div class="dd-klasse" id="dd-klasse" aria-live="polite"></div>' +
      '<div class="dd-tavle-alle" id="dd-talle" hidden></div></section></div>';
    const vis = () => {
      if (tavleKlokke) { clearInterval(tavleKlokke); tavleKlokke = null; }
      $("dd-tkat").value = kat.id; $("dd-tk").textContent = kat.t; $("dd-th").textContent = kat.h || "";
      $("dd-tsek").textContent = ""; $("dd-tmeld").textContent = ""; $("dd-tsvar").value = "";
      $("dd-talle").hidden = true; $("dd-talle").innerHTML = alleSvar(kat); $("dd-tvis").textContent = T.visSvar; $("dd-tvis").setAttribute("aria-expanded", "false");
      if (K) { avslort = false; K.spor({ id: "dd" + (++sporNr), type: "skjema", en, tekst: kat.t + (kat.h ? " – " + kat.h : ""), felt: [{ id: "s", tekst: en ? "Your answer – the rarer, the better!" : "Svaret ditt – jo sjeldnere, jo bedre!", type: "linje" }] }); }
      klasse();
    };
    // ---------- Svar fra mobilen (romkode) ----------
    let K = null, sporNr = 0, avslort = false;
    const totalt = new Map();   // kallenavn → poeng i denne økta
    const vurder = () => [...K.svar.entries()].map(([id, v]) => { const tekst = String((v && v.s) || "").trim(); const r = tekst ? sjekk(kat, tekst) : null; return { id, navn: K.navn(id), tekst, treff: r && r.treff, feil: r && r.feil }; });
    function klasse() {
      const el = $("dd-klasse"); if (!el) return;
      if (!K) { el.innerHTML = ""; return; }
      let h = '<p>📱 <strong>' + K.svar.size + "</strong> " + (en ? "of " + K.antall() + " have answered." : "av " + K.antall() + " har svart.") + (avslort ? "" : ' <button type="button" class="knapp hoved" id="dd-avslor"' + (K.svar.size ? "" : " disabled") + ">" + (en ? "🤿 Reveal the dive" : "🤿 Avslør dykket") + "</button>") + "</p>";
      if (avslort) {
        const r = vurder().sort((a, b) => (b.treff ? b.treff.nivaa : 0) - (a.treff ? a.treff.nivaa : 0));
        const like = {}; r.forEach(x => { if (x.treff) like[x.treff.navn] = (like[x.treff.navn] || 0) + 1; });
        h += '<ol class="dd-klasseliste">' + r.map(x => '<li class="' + (x.treff ? "dd-niv-bg-" + x.treff.nivaa : "dd-ingen") + '"><span><strong>' + esc(x.navn) + "</strong>: " + esc(x.tekst || "–") + "</span><span>" + (x.treff ? NIV()[x.treff.nivaa - 1].ikon + " " + (en ? NIV()[x.treff.nivaa - 1].en : NIV()[x.treff.nivaa - 1].nb) + (like[x.treff.navn] > 1 ? " · " + like[x.treff.navn] + "×" : "") : x.feil ? "✋" : T.ikkeLista) + "</span></li>").join("") + "</ol>";
        const topp = [...totalt.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5);
        if (topp.length) h += "<h3>" + (en ? "🏆 Deepest divers so far" : "🏆 Dypest så langt") + '</h3><ol class="kq-toppliste">' + topp.map(([n, p]) => "<li><span>" + esc(n) + "</span><strong>" + fmt(p * 10) + " m</strong></li>").join("") + "</ol>";
      }
      el.innerHTML = h;
    }
    const avslor = () => {
      if (!K || avslort) return;
      avslort = true;
      const r = vurder();
      r.forEach(x => { if (x.treff) totalt.set(x.navn, (totalt.get(x.navn) || 0) + NIV()[x.treff.nivaa - 1].p); else if (!totalt.has(x.navn)) totalt.set(x.navn, 0); });
      K.lukkSporsmal(id => { const x = r.find(y => y.id === id); if (!x) return en ? "Time’s up! See the board." : "Tiden er ute! Se tavla."; return x.treff ? "«" + x.tekst + "» → " + nivaaNavn(x.treff.nivaa, en) + " (" + NIV()[x.treff.nivaa - 1].p + " " + T.poeng + ")" : x.feil ? "«" + x.tekst + "»: " + x.feil : T.ikkeFunnet(x.tekst); });
      klasse();
      $("dd-talle").hidden = false; $("dd-tvis").textContent = T.skjulSvar; $("dd-tvis").setAttribute("aria-expanded", "true");
    };
    $("dd-klasse").addEventListener("click", e => { if (e.target.closest("#dd-avslor")) avslor(); });
    $("dd-romstart").addEventListener("click", async () => {
      $("dd-romknapp").hidden = true;
      try {
        await LV.lastSkript("assets/rom.js"); await LV.lastSkript("assets/romklasse.js");
        K = await LV.romKlasse.apne($("dd-rom"), { tittel: "Dypdykk", onSvar: klasse, onEndret: klasse, onLukket: () => { K = null; $("dd-romknapp").hidden = false; klasse(); } });
        vis();
      } catch (er) { $("dd-rom").textContent = "Klarte ikke å åpne rommet. " + (LV.rom ? LV.rom.feilTekst(er) : ""); $("dd-romknapp").hidden = false; }
    });
    vis();
    $("dd-tkat").addEventListener("change", e => { kat = alle.find(k => k.id === e.target.value); vis(); });
    $("dd-tilf").addEventListener("click", () => { const andre = alle.filter(k => k !== kat); kat = andre[Math.floor(Math.random() * andre.length)]; vis(); });
    $("dd-tstart").addEventListener("click", () => {
      if (tavleKlokke) clearInterval(tavleKlokke);
      const slutt = Date.now() + +$("dd-ttid").value * 1000;
      tavleKlokke = setInterval(() => { const s = Math.max(0, Math.ceil((slutt - Date.now()) / 1000)); $("dd-tsek").textContent = s ? s + " s" : T.tidUte; if (!s) { clearInterval(tavleKlokke); tavleKlokke = null; if (K && K.svar.size) avslor(); } }, 250);
    });
    $("dd-tvis").addEventListener("click", () => { const a = $("dd-talle").hidden; $("dd-talle").hidden = !a; $("dd-tvis").textContent = a ? T.skjulSvar : T.visSvar; $("dd-tvis").setAttribute("aria-expanded", String(a)); });
    $("dd-tsjekk").addEventListener("submit", e => {
      e.preventDefault(); const s = $("dd-tsvar").value.trim(); if (!s) return;
      const r = sjekk(kat, s);
      $("dd-tmeld").innerHTML = !r ? esc(T.ikkeFunnet(s)) : r.feil ? "✋ " + esc(r.feil) : "<strong>" + esc(r.treff.navn) + "</strong> → " + nivaaNavn(r.treff.nivaa, en) + " (" + NIV()[r.treff.nivaa - 1].p + " " + T.poeng + ")" + (r.treff.f ? " – " + esc(r.treff.f) : "");
      $("dd-tsvar").select();
    });
  }

  // Til testing i konsollen: LV.dypdykkSjekk(id, svar)
  LV.dypdykkSjekk = (id, svar) => { const k = LV.dypdykk.kategorier.find(x => x.id === id); const r = k && sjekk(k, svar); return r ? (r.feil ? "FEIL: " + r.feil : r.treff.navn + " (" + r.treff.nivaa + ")") : null; };

  LV.dypdykkMatch = sjekk;
  // På andre sider (f.eks. Pass the Bomb) brukes bare matchingen
  document.addEventListener("DOMContentLoaded", () => { if (!document.querySelector('meta[name="lv-vert"]')) bygg(); });
})();
