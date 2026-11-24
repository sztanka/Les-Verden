/* =========================================================
   Les verden – Tidslinjeduellen (tidslinjeduell.html)
   Trekk en hendelse uten årstall og plasser den riktig på tidslinja
   mellom kortene som allerede ligger der. Solo (tre liv) eller to lag
   som bytter på. Hendelsene kommer fra tidslinjene i temaene
   (data/tidsreise.js, lages av verktoy/lag-sok.mjs).
   ?fag=samfunnsfag|engelsk&trinn=8|9|10&tema=<id>
   Ingenting lagres.
   ========================================================= */
(function () {
  const LV = window.LV;
  const $ = id => document.getElementById(id);
  const esc = s => LV.esc(String(s == null ? "" : s));
  const bland = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const skjul = t => String(t).replace(/\b\d{3,4}(?:[–-]\d{2,4})?(?=\b|-tallet)/g, "____");

  function bygg() {
    document.title = "Tidslinjeduellen – " + (LV.config ? LV.config.navn : "Les verden");
    const p = new URLSearchParams(location.search);
    const fag = p.get("fag") || "", trinn = p.get("trinn") || "", temaId = p.get("tema") || "";
    const tema = temaId && LV.temaer.find(t => t.id === temaId);
    const alle = (LV.tidsreise || []).filter(h => (!temaId || h[3] === temaId) && (!fag || (fag === "engelsk") === !!h[6]) && (!trinn || String(h[7]) === trinn));
    $("innhold").innerHTML = '<nav class="brodsmuler" aria-label="Brødsmuler"><a href="index.html">Forside</a> › <a href="spill.html">Spill</a> › Tidslinjeduellen</nav>' +
      '<header class="sidehode"><p class="overlinje">Spill · historie</p><h1>⚔️ Tidslinjeduellen</h1><p class="ingress">Trekk en hendelse – uten årstall – og legg den på riktig plass på tidslinja. Jo flere kort som ligger der, jo vanskeligere blir det. Spill alene med tre liv, eller la to lag dyste mot hverandre på storskjermen.</p>' +
      (tema ? '<p class="melding">Bare hendelser fra temaet <a href="tema.html?id=' + encodeURIComponent(tema.id) + '">' + esc(tema.tittel) + '</a>. <a href="tidslinjeduell.html">Bruk alle temaene</a></p>' : "") +
      '<form class="tr-filter td-oppsett" id="td-oppsett">' + (tema ? "" : '<label>Fag <select name="fag"><option value="">Begge fag</option><option value="samfunnsfag">Samfunnsfag</option><option value="engelsk">Engelsk</option></select></label><label>Trinn <select name="trinn"><option value="">Alle trinn</option><option>8</option><option>9</option><option>10</option></select></label>') +
      '<label>Spillere <select name="modus"><option value="solo">Alene – tre liv</option><option value="lag">To lag på samme skjerm</option><option value="rom2">📱 2 lag på egne enheter (romkode)</option><option value="rom3">📱 3 lag på egne enheter (romkode)</option><option value="rom4">📱 4 lag på egne enheter (romkode)</option></select></label><label>Kort for å vinne <select name="mal"><option>5</option><option selected>7</option><option>10</option></select></label><button class="knapp hoved" type="submit">Start duellen</button></form></header>' +
      '<section id="td-spill" class="td-spill" aria-live="polite"></section>';
    const f = $("td-oppsett");
    if (f.fag) { f.fag.value = fag; f.trinn.value = trinn; }
    f.addEventListener("submit", e => {
      e.preventDefault();
      if (f.fag && (f.fag.value !== fag || f.trinn.value !== trinn)) { const q = new URLSearchParams(); if (f.fag.value) q.set("fag", f.fag.value); if (f.trinn.value) q.set("trinn", f.trinn.value); q.set("start", f.modus.value + "-" + f.mal.value); location.search = q; return; }
      start(f.modus.value, +f.mal.value);
    });
    const st = p.get("start"); if (st) { const [m, n] = st.split("-"); f.modus.value = m; f.mal.value = n; start(m, +n); }

    function start(modus, mal) {
      if (/^rom\d$/.test(modus)) return romSpillStart(alle, +modus.slice(3), mal);
      if (alle.length < 8) { $("td-spill").innerHTML = '<p class="melding">For få hendelser med dette valget. Velg et annet fag eller trinn.</p>'; return; }
      // Unike år gjør spillet rettferdig
      const brukt = new Set(), bunke = [];
      bland(alle).forEach(h => { if (!brukt.has(h[2])) { brukt.add(h[2]); bunke.push(h); } });
      const linje = [bunke.shift()];
      const lag = modus === "lag" ? [{ navn: "Lag A", p: 0, ikon: "🟦" }, { navn: "Lag B", p: 0, ikon: "🟧" }] : [{ navn: "Du", p: 0, ikon: "⭐", liv: 3 }];
      let tur = 0, kort = null, ferdig = false;
      const trekk = () => { kort = bunke.shift(); if (!kort) return slutt("Bunken er tom!"); tegn(); };
      const tegn = (melding) => {
        const L = lag[tur];
        $("td-spill").innerHTML = '<div class="td-status">' + lag.map((l, i) => '<span class="td-lag' + (i === tur ? " na" : "") + '">' + l.ikon + " " + esc(l.navn) + ": <strong>" + l.p + "</strong> / " + mal + (l.liv != null ? " · " + "❤️".repeat(l.liv) + "🤍".repeat(3 - l.liv) : "") + "</span>").join("") + "</div>" +
          (melding || "") +
          '<div class="td-kort"' + (kort[6] ? ' lang="en"' : "") + '><p class="td-tur">' + (lag.length > 1 ? esc(L.navn) + " sin tur" : "Ditt kort") + '</p><p class="td-tekst">' + esc(skjul(kort[1])) + '</p><p class="td-tema" lang="nb">📚 ' + esc(kort[4]) + (kort[5] ? " · 📍 " + esc(kort[5]) : "") + "</p></div>" +
          '<p class="td-hjelp" id="td-hjelp">Hvor hører hendelsen hjemme? Velg en plass på tidslinja.</p><ol class="td-linje" aria-describedby="td-hjelp">' +
          linje.map((h, i) => plass(i) + '<li class="td-lagt"><span class="td-ar">' + h[2] + "</span><span" + (h[6] ? ' lang="en"' : "") + ">" + esc(h[1]) + "</span></li>").join("") + plass(linje.length) + "</ol>";
        document.querySelectorAll(".td-plass").forEach(b => b.addEventListener("click", () => legg(+b.dataset.i)));
        const ny = document.querySelector(".td-kort"); if (ny) ny.scrollIntoView({ block: "nearest" });
      };
      const plass = i => {
        const for_ = linje[i - 1], etter = linje[i];
        const t = !for_ ? "Før " + etter[2] : !etter ? "Etter " + for_[2] : "Mellom " + for_[2] + " og " + etter[2];
        return '<li class="td-gap"><button type="button" class="td-plass" data-i="' + i + '">↳ ' + t + "</button></li>";
      };
      const legg = i => {
        if (ferdig) return;
        const for_ = linje[i - 1], etter = linje[i], ar = kort[2];
        const ok = (!for_ || for_[2] <= ar) && (!etter || ar <= etter[2]);
        const L = lag[tur];
        let melding;
        if (ok) { linje.splice(i, 0, kort); L.p++; melding = '<p class="td-melding ok" role="status">✔ Riktig! «' + esc(kort[0]) + '» – ' + kort[2] + ".</p>"; }
        else { if (L.liv != null) L.liv--; melding = '<p class="td-melding feil" role="status">✗ Feil – det skjedde i <strong>' + kort[2] + "</strong>. Kortet er ute av spillet.</p>"; }
        if (L.p >= mal) return slutt(melding + '<p class="td-vinner">🏆 ' + esc(L.navn) + (lag.length > 1 ? " vinner duellen!" : " klarte det!") + "</p>");
        if (L.liv === 0) return slutt(melding + '<p class="td-vinner">Du har ingen liv igjen. Du fikk ' + L.p + " kort på tidslinja.</p>");
        if (lag.length > 1) tur = 1 - tur;
        kort = bunke.shift(); if (!kort) return slutt(melding + "<p>Bunken er tom!</p>");
        tegn(melding);
      };
      const slutt = melding => {
        ferdig = true;
        $("td-spill").innerHTML = '<div class="kd-slutt">' + melding + '<h2>Tidslinja dere bygde</h2><ol class="td-linje td-ferdig">' + linje.map(h => '<li class="td-lagt"><span class="td-ar">' + h[2] + "</span><span" + (h[6] ? ' lang="en"' : "") + ">" + esc(h[1]) + ' <a href="tema.html?id=' + encodeURIComponent(h[3]) + '" lang="nb">(' + esc(h[4]) + ")</a></span></li>").join("") + '</ol><p><button type="button" class="knapp hoved" id="td-igjen">↺ Ny duell</button> <a class="knapp" href="tidslinje.html">📅 Se hele tidslinja</a></p></div>';
        $("td-igjen").addEventListener("click", () => start(modus, mal));
        $("td-spill").querySelector("h2").setAttribute("tabindex", "-1"); $("td-spill").querySelector("h2").focus();
      };
      trekk();
    }
  }
  // ---------- Lag på egne enheter (romkode) ----------
  // Alle lagene får samme kort samtidig og legger det på sin egen tidslinje.
  const LAGINFO = [["Lag A", "🟦", "#1d4f9c"], ["Lag B", "🟧", "#b45309"], ["Lag C", "🟩", "#23703f"], ["Lag D", "🟪", "#6b2fa0"]];
  const TID = 45;
  const kortTekst = t => { t = String(t); return t.length > 80 ? t.slice(0, 77).replace(/\s+\S*$/, "") + " …" : t; };
  let ROMET = null;
  async function romSpillStart(alle, antLag, mal) {
    const el = $("td-spill");
    if (alle.length < 8) { el.innerHTML = '<p class="melding">For få hendelser med dette valget. Velg et annet fag eller trinn.</p>'; return; }
    if (ROMET) { ROMET.rom.lukk(); ROMET = null; }
    el.innerHTML = '<p class="rv-status" role="status">Åpner rommet …</p>';
    const brukt = new Set(), bunke = [];
    bland(alle).forEach(h => { if (!brukt.has(h[2])) { brukt.add(h[2]); bunke.push(h); } });
    const startKort = bunke.shift();
    const lag = LAGINFO.slice(0, antLag).map(([navn, ikon, farge]) => ({ navn, ikon, farge, linje: [startKort], p: 0, svar: null }));
    const medlem = new Map();
    const S = { fase: "lobby", kort: null, nr: 0, slutt: 0, klokke: null };
    let rom;
    const aktive = l => [...rom.spillere.values()].filter(x => x.tilkoblet && lag[medlem.get(x.id)] === l);
    const send = (bareLag) => rom.spillere.forEach(x => {
      if (!x.tilkoblet || (bareLag && lag[medlem.get(x.id)] !== bareLag)) return;
      const l = lag[medlem.get(x.id)];
      rom.send(x.id, { t: "td", fase: S.fase, mal, nr: S.nr, lag: l && { navn: l.navn, ikon: l.ikon, farge: l.farge, p: l.p },
        kort: S.kort && { tekst: skjul(S.kort[1]), tema: S.kort[4], en: !!S.kort[6] },
        linje: l ? l.linje.map(h => [h[0], kortTekst(h[1]), !!h[6]]) : [], svar: l && l.svar ? { i: l.svar.i, av: l.svar.av } : null,
        resultat: S.fase === "fasit" && l ? { ok: !!(l.svar && l.svar.ok), ar: S.kort[0], tittel: kortTekst(S.kort[1]) } : null,
        alle: lag.map(k => ({ navn: k.navn, ikon: k.ikon, p: k.p })), vinnerTekst: S.vinnerTekst || "" });
    });
    const fordel = id => { const n = lag.map(l => aktive(l).length); medlem.set(id, n.indexOf(Math.min(...n))); };
    try {
      await LV.lastSkript("assets/rom.js");
      rom = await LV.rom.vert({ spill: "tidslinje",
        onBli: x => { if (!medlem.has(x.id)) fordel(x.id); send(); tegn(); },
        onForlat: () => { tegn(); if (S.fase === "kort") sjekkAlle(); },
        onMelding: (x, m) => {
          if (m.t !== "plass" || S.fase !== "kort" || m.nr !== S.nr) return;
          const l = lag[medlem.get(x.id)]; if (!l || l.svar) return;
          const i = Math.max(0, Math.min(l.linje.length, m.i | 0)), f = l.linje[i - 1], e = l.linje[i], ar = S.kort[2];
          l.svar = { i, av: x.navn, ok: (!f || f[2] <= ar) && (!e || ar <= e[2]) };
          send(l); tegn(); sjekkAlle();
        } });
    } catch (er) { el.innerHTML = '<p class="melding">Klarte ikke å åpne rommet. ' + esc(LV.rom ? LV.rom.feilTekst(er) : "") + "</p>"; return; }
    ROMET = { rom };
    const qr = await LV.rom.qr(rom.lenke).catch(() => "");
    const sjekkAlle = () => { if (S.fase === "kort" && lag.filter(l => aktive(l).length).every(l => l.svar)) fasit(); };

    function nyttKort() {
      S.kort = bunke.shift();
      if (!S.kort) return slutt();
      S.nr++; S.fase = "kort"; lag.forEach(l => { l.svar = null; });
      S.slutt = Date.now() + TID * 1000;
      clearInterval(S.klokke);
      S.klokke = setInterval(() => { const t = $("tdr-tid"); const igjen = Math.max(0, Math.ceil((S.slutt - Date.now()) / 1000)); if (t) t.textContent = igjen + " s"; if (!igjen) fasit(); }, 250);
      send(); tegn();
    }
    function fasit() {
      if (S.fase !== "kort") return;
      clearInterval(S.klokke); S.fase = "fasit";
      lag.forEach(l => { if (l.svar && l.svar.ok) { l.linje.splice(l.svar.i, 0, S.kort); l.p++; } });
      if (lag.some(l => l.p >= mal) || !bunke.length) return slutt();
      send(); tegn();
    }
    function slutt() {
      clearInterval(S.klokke); S.fase = "slutt";
      const maks = Math.max(...lag.map(l => l.p)), beste = lag.filter(l => l.p === maks);
      S.vinnerTekst = beste.length === 1 ? beste[0].navn + " vinner duellen!" : "Uavgjort mellom " + beste.map(l => l.navn).join(" og ") + "!";
      send(); tegn();
    }
    function tegn() {
      const kolonner = '<div class="tdr-kolonner">' + lag.map((l, li) => {
        const folk = aktive(l);
        const status = S.fase === "kort" ? (l.svar ? "✔ Har svart" : "🤔 Tenker …") : S.fase === "fasit" ? (l.svar ? (l.svar.ok ? "✔ Riktig" : "✗ Feil") : "⏰ Ikke svart") : "";
        return '<section class="tdr-kolonne" style="--tdr-f:' + l.farge + '"><h3>' + l.ikon + " " + esc(l.navn) + ' <span class="tdr-p">' + l.p + " / " + mal + "</span></h3>" +
          '<p class="tdr-folk">' + (folk.length ? folk.map(x => '<button type="button" class="tdr-person" data-id="' + x.id + '" title="Flytt til neste lag">' + esc(x.navn) + "</button>").join("") : "<em>Ingen ennå</em>") + "</p>" +
          (status ? '<p class="tdr-status">' + status + "</p>" : "") +
          (S.fase !== "lobby" ? '<ol class="tdr-mini">' + l.linje.map(h => "<li" + (S.fase === "fasit" && h === S.kort ? ' class="tdr-ny"' : "") + "><strong>" + esc(h[0]) + "</strong> " + esc(kortTekst(h[1])) + "</li>").join("") + "</ol>" : "") + "</section>";
      }).join("") + "</div>";
      let h = '<section class="rv-romkort" aria-label="Romkode"><div><p class="rv-ledetekst">Romkode</p><p class="rv-kode">' + rom.kode + '</p><p class="rv-lenke">Gå til <strong>' + esc(rom.lenke.replace(/^https?:\/\//, "").replace(/\?.*$/, "")) + '</strong> og skriv koden.</p></div><div class="rv-qr" aria-hidden="true">' + qr + "</div></section>";
      if (S.fase === "lobby") h += '<p class="mu-intro">Elevene blir fordelt på lagene automatisk. Klikk på et navn for å flytte eleven til neste lag. Første lag med ' + mal + " kort på tidslinja vinner.</p>" + kolonner + '<p><button type="button" class="knapp hoved" id="tdr-start">▶ Start duellen</button></p>';
      else if (S.fase === "slutt") h = '<div class="kd-slutt"><p class="td-vinner">🏆 ' + esc(S.vinnerTekst) + "</p>" + kolonner + '<p><button type="button" class="knapp hoved" id="tdr-igjen">↺ Ny duell med de samme lagene</button></p></div>';
      else h += '<div class="td-kort tdr-tavlekort"' + (S.kort[6] ? ' lang="en"' : "") + '><p class="td-tur">Kort ' + S.nr + (S.fase === "kort" ? ' · <span id="tdr-tid">' + Math.max(0, Math.ceil((S.slutt - Date.now()) / 1000)) + " s</span>" : "") + '</p><p class="td-tekst">' + esc(skjul(S.kort[1])) + "</p>" +
          (S.fase === "fasit" ? '<p class="tdr-fasit">Svar: <strong>' + esc(S.kort[0]) + "</strong></p>" : "") + "</div>" + kolonner +
          '<p class="mu-knapper">' + (S.fase === "kort" ? '<button type="button" class="knapp" id="tdr-vis">Vis svaret nå</button>' : '<button type="button" class="knapp hoved" id="tdr-neste">Neste kort →</button>') + ' <button type="button" class="knapp" id="tdr-stopp">⏹ Avslutt</button></p>';
      el.innerHTML = h;
    }
    el.onclick = e => {
      const pers = e.target.closest(".tdr-person");
      if (pers && S.fase === "lobby") { const id = pers.dataset.id; medlem.set(id, (medlem.get(id) + 1) % lag.length); send(); tegn(); return; }
      if (e.target.closest("#tdr-start")) { if (![...rom.spillere.values()].some(x => x.tilkoblet)) return alert("Ingen elever er med ennå."); nyttKort(); }
      else if (e.target.closest("#tdr-neste")) nyttKort();
      else if (e.target.closest("#tdr-vis")) fasit();
      else if (e.target.closest("#tdr-stopp") && confirm("Avslutte duellen?")) slutt();
      else if (e.target.closest("#tdr-igjen")) {
        const ny = []; brukt.clear(); bland(alle).forEach(h => { if (!brukt.has(h[2])) { brukt.add(h[2]); ny.push(h); } });
        bunke.length = 0; bunke.push(...ny); const s0 = bunke.shift();
        lag.forEach(l => { l.linje = [s0]; l.p = 0; l.svar = null; }); S.fase = "lobby"; S.nr = 0; S.vinnerTekst = ""; send(); tegn();
      }
    };
    send(); tegn();
  }

  document.addEventListener("DOMContentLoaded", bygg);
})();
