/* =========================================================
   Les verden – Navnehjulet (navnehjul.html)
   Et lykkehjul for tilfeldig trekning: navn, temaer, spørsmål eller
   oppgaver. Hjulet snurrer, bremser ned med tikkelyd og viser den
   som ble trukket. Valgfritt: fjern den trukne fra hjulet.
   Trekningen avgjøres med crypto.getRandomValues før hjulet starter,
   og animasjonen lander alltid på riktig felt. Ingenting lagres.
   ========================================================= */
(function () {
  const LV = window.LV;
  const $ = id => document.getElementById(id);
  const esc = s => LV.esc(String(s == null ? "" : s));
  const FARGER = ["#f6d365", "#8fd3c1", "#7fb7e6", "#c39bd3", "#f4a6a6", "#a8d08d", "#f7b977", "#9fb4f0"];
  const TAU = Math.PI * 2;
  const tilfeldig = n => { const a = new Uint32Array(1); crypto.getRandomValues(a); return a[0] % n; };
  const rolig = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

  let felt = [], rot = 0, snurrer = false, resultater = [], sist = -1, lyd = null, vipp = 0;

  function side() {
    document.title = "Navnehjulet – " + (LV.config ? LV.config.navn : "Les verden");
    $("innhold").innerHTML = '<nav class="brodsmuler" aria-label="Brødsmuler"><a href="index.html">Forside</a> › <a href="laerer.html">For lærere</a> › Navnehjulet</nav>' +
      '<header class="sidehode"><p class="overlinje">For lærere · i klasserommet</p><h1>🎡 Navnehjulet</h1><p class="ingress">Snurr hjulet og bygg opp spenningen! Bruk det til å trekke hvem som skal svare, hvilken gruppe som skal legge fram, eller hvilket tema, spørsmål eller ord klassen skal jobbe med.</p></header>' +
      '<div class="nh-flate" id="nh-flate">' +
      '<div class="nh-hjuldel"><div class="nh-hjul" id="nh-hjul"><canvas id="nh-lerret" role="img" aria-label="Navnehjul"></canvas><span class="nh-peker" id="nh-peker" aria-hidden="true"></span>' +
      '<button type="button" class="nh-midt" id="nh-midt" aria-label="Snurr hjulet">SNURR</button></div>' +
      '<p class="nh-hint">Trykk på hjulet, mellomromstasten eller <kbd>Ctrl</kbd> + <kbd>Enter</kbd></p>' +
      '<p class="nh-status skjult-visuelt" id="nh-status" aria-live="assertive"></p>' +
      '<button type="button" class="knapp nh-fullknapp" id="nh-full">⛶ Fullskjerm</button></div>' +
      '<aside class="nh-panel" aria-label="Innstillinger for hjulet"><div class="nh-faner" role="tablist"><button type="button" role="tab" id="nh-fane-felt" aria-selected="true" aria-controls="nh-p-felt">Felt <span class="nh-tall" id="nh-antall">0</span></button><button type="button" role="tab" id="nh-fane-res" aria-selected="false" aria-controls="nh-p-res" tabindex="-1">Trukket <span class="nh-tall" id="nh-resantall">0</span></button></div>' +
      '<div role="tabpanel" id="nh-p-felt" aria-labelledby="nh-fane-felt"><p class="mu-knapper nh-verktoy"><button type="button" class="knapp liten" id="nh-stokk">🔀 Stokk</button><button type="button" class="knapp liten" id="nh-sorter">🔤 Sorter</button><button type="button" class="knapp liten" id="nh-tom">🗑️ Tøm</button></p>' +
      '<label class="cs-felt" for="nh-liste">Ett felt per linje (2–100)<textarea id="nh-liste" rows="12" spellcheck="false" placeholder="Ada\nBo\nCy\n…"></textarea></label>' +
      '<details class="nh-maler"><summary>Hurtigvalg</summary><p class="mu-knapper">' +
      '<button type="button" class="knapp liten" data-mal="tall">Tall 1–30</button><button type="button" class="knapp liten" data-mal="grupper">Gruppe 1–6</button><button type="button" class="knapp liten" data-mal="ja">Ja / Nei</button><button type="button" class="knapp liten" data-mal="lesestrategi">Lesestrategier</button><button type="button" class="knapp liten" data-mal="sporsmal">Spørreord</button></p></details>' +
      '<fieldset class="nh-valg"><legend>Valg</legend><label class="cs-avkryss"><input type="checkbox" id="nh-fjern"> Fjern den som trekkes automatisk</label><label class="cs-avkryss"><input type="checkbox" id="nh-lyd" checked> Lyd</label>' +
      '<label class="cs-felt" for="nh-tid">Snurretid<select id="nh-tid"><option value="3">Kort (3 sek)</option><option value="6" selected>Middels (6 sek)</option><option value="10">Lang (10 sek)</option></select></label></fieldset>' +
      '<p class="rv-merk">Hjulet bestemmer helt tilfeldig. Ingenting lagres – lim inn lista på nytt neste gang.</p></div>' +
      '<div role="tabpanel" id="nh-p-res" aria-labelledby="nh-fane-res" hidden><ol class="nh-resultater" id="nh-resultater"></ol><p class="mu-knapper"><button type="button" class="knapp liten" id="nh-tilbake">↩️ Legg alle tilbake på hjulet</button><button type="button" class="knapp liten" id="nh-tomres">Tøm lista</button></p></div></aside></div>' +
      '<dialog class="nh-dialog" id="nh-dialog" aria-labelledby="nh-vinner"><p class="nh-dlabel">Hjulet har bestemt:</p><p class="nh-vinner" id="nh-vinner"></p><div class="nh-konfetti" aria-hidden="true"></div><p class="mu-knapper"><button type="button" class="knapp hoved" id="nh-lukk">Lukk</button><button type="button" class="knapp" id="nh-fjernen">Fjern fra hjulet</button></p></dialog>';

    $("nh-liste").value = "Ada\nBo\nCy\nDan\nEli\nFia\nGro\nHal";
    $("nh-liste").addEventListener("input", () => { lesFelt(); tegn(); });
    $("nh-midt").addEventListener("click", snurr);
    $("nh-lerret").addEventListener("click", snurr);
    $("nh-stokk").addEventListener("click", () => settListe(stokk(felt)));
    $("nh-sorter").addEventListener("click", () => settListe(felt.slice().sort((a, b) => a.localeCompare(b, "nb"))));
    $("nh-tom").addEventListener("click", () => { settListe([]); $("nh-liste").focus(); });
    $("nh-full").addEventListener("click", fullskjerm);
    $("nh-lukk").addEventListener("click", () => $("nh-dialog").close());
    $("nh-fjernen").addEventListener("click", () => { fjern(sist); $("nh-dialog").close(); });
    $("nh-dialog").addEventListener("click", e => { if (e.target === $("nh-dialog")) $("nh-dialog").close(); });
    $("nh-dialog").addEventListener("close", () => { const m = $("nh-midt"); if (m) m.focus(); });
    $("nh-tilbake").addEventListener("click", () => { const tilbake = resultater.filter(r => !felt.includes(r)); settListe(felt.concat([...new Set(tilbake)])); });
    $("nh-tomres").addEventListener("click", () => { resultater = []; tegnResultater(); });
    document.querySelectorAll("[data-mal]").forEach(b => b.addEventListener("click", () => settListe(MALER[b.dataset.mal]())));
    // Faner
    const faner = [$("nh-fane-felt"), $("nh-fane-res")];
    const velg = f => faner.forEach(x => { const p = x === f; x.setAttribute("aria-selected", p); x.tabIndex = p ? 0 : -1; $(x.getAttribute("aria-controls")).hidden = !p; });
    faner.forEach((f, i) => { f.addEventListener("click", () => velg(f)); f.addEventListener("keydown", e => { if (e.key === "ArrowRight" || e.key === "ArrowLeft") { const n = faner[(i + 1) % 2]; velg(n); n.focus(); } }); });
    document.addEventListener("keydown", e => {
      if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) { e.preventDefault(); snurr(); }
      else if (e.key === " " && !/^(TEXTAREA|INPUT|SELECT|BUTTON|SUMMARY|A)$/.test(document.activeElement.tagName) && !$("nh-dialog").open) { e.preventDefault(); snurr(); }
    });
    new ResizeObserver(() => tegn()).observe($("nh-hjul"));
    lesFelt(); tegn();
  }

  const MALER = {
    tall: () => Array.from({ length: 30 }, (_, i) => String(i + 1)),
    grupper: () => Array.from({ length: 6 }, (_, i) => "Gruppe " + (i + 1)),
    ja: () => ["Ja", "Nei"],
    lesestrategi: () => ["Forutsi", "Still spørsmål", "Oppklar", "Oppsummer", "Lag bilder i hodet", "Koble til noe du vet"],
    sporsmal: () => ["Hvem?", "Hva?", "Hvor?", "Når?", "Hvorfor?", "Hvordan?"]
  };
  const stokk = l => { l = l.slice(); for (let i = l.length - 1; i > 0; i--) { const j = tilfeldig(i + 1); [l[i], l[j]] = [l[j], l[i]]; } return l; };
  function lesFelt() {
    felt = $("nh-liste").value.split("\n").map(x => x.replace(/[<>]/g, "").trim().slice(0, 40)).filter(Boolean).slice(0, 100);
    $("nh-antall").textContent = felt.length;
    $("nh-lerret").setAttribute("aria-label", "Navnehjul med " + felt.length + " felt");
  }
  function settListe(l) { $("nh-liste").value = l.join("\n"); lesFelt(); tegn(); }
  function fjern(i) {
    if (i < 0 || i >= felt.length) return;
    const l = felt.slice(); l.splice(i, 1); settListe(l); sist = -1;
  }

  // ---------- Tegning ----------
  function tegn() {
    const c = $("nh-lerret"); if (!c) return;
    const str = Math.max(200, Math.floor($("nh-hjul").clientWidth)), dpr = window.devicePixelRatio || 1;
    if (c.width !== str * dpr) c.width = c.height = str * dpr;
    const x = c.getContext("2d"); x.setTransform(dpr, 0, 0, dpr, 0, 0);
    const r = str / 2, R = r - 6, n = felt.length;
    x.clearRect(0, 0, str, str);
    // skygge og kant
    x.save(); x.beginPath(); x.arc(r, r, R, 0, TAU); x.shadowColor = "rgba(0,0,0,.25)"; x.shadowBlur = 14; x.shadowOffsetY = 4; x.fillStyle = "#fff"; x.fill(); x.restore();
    if (!n) {
      x.fillStyle = "#e9e5dc"; x.beginPath(); x.arc(r, r, R, 0, TAU); x.fill();
      x.fillStyle = "#555"; x.font = "600 " + Math.round(r / 10) + "px system-ui, sans-serif"; x.textAlign = "center"; x.fillText("Skriv inn navn →", r, r - r * .45);
      return;
    }
    const a = TAU / n;
    for (let i = 0; i < n; i++) {
      const s = rot + i * a;
      x.beginPath(); x.moveTo(r, r); x.arc(r, r, R, s, s + a); x.closePath();
      x.fillStyle = FARGER[(n % FARGER.length === 1 && i === n - 1) ? 2 : i % FARGER.length]; x.fill();
      if (n > 1) { x.strokeStyle = "rgba(255,255,255,.55)"; x.lineWidth = 1.5; x.stroke(); }
      // tekst
      x.save(); x.translate(r, r); x.rotate(s + a / 2);
      const maksBredde = R * .68, hoyde = Math.min(R * .16, Math.max(9, 2 * Math.sin(a / 2) * R * .62 * .8));
      let fs = hoyde; x.font = "600 " + fs + "px system-ui, sans-serif";
      let t = felt[i]; while (x.measureText(t).width > maksBredde && fs > 9) { fs -= 1; x.font = "600 " + fs + "px system-ui, sans-serif"; }
      while (x.measureText(t).width > maksBredde && t.length > 2) t = t.slice(0, -2) + "…";
      x.fillStyle = "#1d1d1f"; x.textAlign = "right"; x.textBaseline = "middle"; x.fillText(t, R - 16, 0);
      x.restore();
    }
    x.beginPath(); x.arc(r, r, R, 0, TAU); x.strokeStyle = "rgba(0,0,0,.18)"; x.lineWidth = 3; x.stroke();
    $("nh-peker").style.transform = "translateY(-50%) rotate(" + vipp + "deg)";
  }
  const indeksVed = rv => { const n = felt.length, a = TAU / n; return Math.floor((((-rv) % TAU) + TAU) % TAU / a) % n; };

  // ---------- Lyd ----------
  function tikk() {
    if (!$("nh-lyd").checked) return;
    try {
      lyd = lyd || new (window.AudioContext || window.webkitAudioContext)();
      const o = lyd.createOscillator(), g = lyd.createGain(), t = lyd.currentTime;
      o.type = "square"; o.frequency.value = 1400; g.gain.setValueAtTime(.06, t); g.gain.exponentialRampToValueAtTime(.0001, t + .03);
      o.connect(g).connect(lyd.destination); o.start(t); o.stop(t + .035);
    } catch (e) { /* ingen lyd */ }
  }
  function fanfare() {
    if (!$("nh-lyd").checked || !lyd) return;
    try { [523, 659, 784, 1047].forEach((f, i) => { const o = lyd.createOscillator(), g = lyd.createGain(), t = lyd.currentTime + i * .09; o.type = "triangle"; o.frequency.value = f; g.gain.setValueAtTime(.12, t); g.gain.exponentialRampToValueAtTime(.0001, t + .35); o.connect(g).connect(lyd.destination); o.start(t); o.stop(t + .4); }); } catch (e) { /* ingen lyd */ }
  }

  // ---------- Snurr ----------
  function snurr() {
    if (snurrer || $("nh-dialog").open) return;
    if (felt.length < 2) { $("nh-status").textContent = "Skriv inn minst to felt."; $("nh-liste").focus(); return; }
    if ($("nh-lyd").checked) { try { lyd = lyd || new (window.AudioContext || window.webkitAudioContext)(); lyd.resume(); } catch (e) { /* ingen lyd */ } }
    const n = felt.length, a = TAU / n, k = tilfeldig(n), f = .15 + (tilfeldig(1000) / 1000) * .7;
    const varighet = rolig() ? 600 : +$("nh-tid").value * 1000;
    const runder = rolig() ? 0 : Math.round(varighet / 1000 * 1.1) + 2;
    const delta = (((-(k + f) * a - rot) % TAU) + TAU) % TAU;
    const start = rot, slutt = rot + runder * TAU + delta, t0 = performance.now();
    snurrer = true; $("nh-flate").classList.add("nh-snurrer"); $("nh-status").textContent = "Hjulet snurrer …";
    let forrige = indeksVed(rot);
    const ease = t => 1 - Math.pow(1 - t, 4);
    const steg = na => {
      const t = Math.min(1, (na - t0) / varighet);
      rot = start + (slutt - start) * ease(t);
      const i = indeksVed(rot);
      if (i !== forrige) { forrige = i; tikk(); vipp = -22; } else vipp *= .8;
      tegn();
      if (t < 1) requestAnimationFrame(steg);
      else { rot %= TAU; vipp = 0; tegn(); ferdig(indeksVed(rot)); }
    };
    requestAnimationFrame(steg);
  }
  function ferdig(i) {
    snurrer = false; $("nh-flate").classList.remove("nh-snurrer");
    const navn = felt[i]; sist = i;
    resultater.unshift(navn); tegnResultater();
    $("nh-status").textContent = "Hjulet har bestemt: " + navn;
    fanfare();
    if ($("nh-fjern").checked) { fjern(i); $("nh-fjernen").hidden = true; } else $("nh-fjernen").hidden = false;
    $("nh-vinner").textContent = navn;
    const k = document.querySelector(".nh-konfetti");
    k.innerHTML = rolig() ? "" : Array.from({ length: 40 }, (_, j) => '<i style="--x:' + (tilfeldig(200) - 100) + ";--d:" + (tilfeldig(600) / 1000) + "s;--f:" + FARGER[j % FARGER.length] + ";--r:" + tilfeldig(360) + 'deg"></i>').join("");
    $("nh-dialog").showModal(); $("nh-lukk").focus();
  }
  function tegnResultater() {
    $("nh-resantall").textContent = resultater.length;
    $("nh-resultater").innerHTML = resultater.length ? resultater.map(r => "<li>" + esc(r) + "</li>").join("") : '<li class="nh-ingen">Ingen trukket ennå.</li>';
  }
  function fullskjerm() {
    const el = $("nh-flate");
    if (document.fullscreenElement) { document.exitFullscreen(); return; }
    if (el.requestFullscreen) el.requestFullscreen().then(() => setTimeout(tegn, 50)).catch(() => {});
  }
  document.addEventListener("fullscreenchange", () => { $("nh-full").textContent = document.fullscreenElement ? "✕ Lukk fullskjerm" : "⛶ Fullskjerm"; setTimeout(tegn, 50); });

  document.addEventListener("DOMContentLoaded", () => { side(); tegnResultater(); });
})();
