/* =========================================================
   Les verden – Tavleskjermen (tavleskjerm.html)
   En flate til tavla med små verktøy («widgets») som kan flyttes,
   endres i størrelse og lukkes: nedtelling, stoppeklokke, klokke,
   lydmåler, arbeidssymboler, trafikklys, dagens plan, beskjed,
   terning, QR-kode, poengtavle, navnetrekk og nedtelling til en dag.
   Ingenting lagres – oppsettet kan lastes ned som fil.
   Lydmåleren bruker mikrofonen bare i nettleseren; lyden sendes
   ingen steder.
   ========================================================= */
(function () {
  const LV = window.LV;
  const $ = id => document.getElementById(id);
  const esc = s => LV.esc(String(s == null ? "" : s));
  const tilfeldig = n => { const a = new Uint32Array(1); crypto.getRandomValues(a); return a[0] % n; };
  const to = n => String(n).padStart(2, "0");
  let lyd = null;
  const ctx = () => { try { lyd = lyd || new (window.AudioContext || window.webkitAudioContext)(); lyd.resume(); return lyd; } catch (e) { return null; } };
  function pip(f, t0, lengde, vol) { const a = ctx(); if (!a) return; const o = a.createOscillator(), g = a.createGain(), t = a.currentTime + (t0 || 0); o.type = "sine"; o.frequency.value = f; g.gain.setValueAtTime(vol || .2, t); g.gain.exponentialRampToValueAtTime(.0001, t + (lengde || .25)); o.connect(g).connect(a.destination); o.start(t); o.stop(t + (lengde || .25) + .05); }
  const alarm = () => { [0, .3, .6, 1.2, 1.5, 1.8].forEach((t, i) => pip(i % 3 === 2 ? 1046 : 880, t, .22, .25)); };

  const BAKGRUNNER = [
    ["Lys", "#f4f1ea"], ["Himmel", "linear-gradient(135deg,#dfeefa,#f3e8fb)"], ["Skog", "linear-gradient(135deg,#d9efe1,#f1f6d8)"],
    ["Solnedgang", "linear-gradient(135deg,#ffe3c4,#fbd0d9)"], ["Tavlegrønn", "#2f4f3f"], ["Natt", "linear-gradient(135deg,#1c2541,#3a506b)"]
  ];

  // ---------- Widgets ----------
  const W = {};

  W.timer = { navn: "Nedtelling", ikon: "⏲️", str: [330, 300], lag(el, s) {
    s.sek = s.sek || 300;
    let igjen = s.sek * 1000, slutt = 0, gaar = false, t = null, ferdig = false;
    el.innerHTML = '<div class="ts-timer"><svg viewBox="0 0 100 100" class="ts-ring" aria-hidden="true"><circle cx="50" cy="50" r="44" class="ts-ring-bak"/><circle cx="50" cy="50" r="44" class="ts-ring-for" pathLength="100"/></svg><div class="ts-tid" role="timer" aria-live="off"></div></div>' +
      '<div class="ts-rad ts-forvalg">' + [1, 3, 5, 10, 15, 20].map(m => '<button type="button" class="knapp liten" data-m="' + m + '">' + m + " min</button>").join("") + "</div>" +
      '<div class="ts-rad"><button type="button" class="knapp liten" data-d="-60" aria-label="Ett minutt mindre">−1</button><button type="button" class="knapp hoved" data-a="start">▶ Start</button><button type="button" class="knapp liten" data-a="null" aria-label="Start på nytt">↺</button><button type="button" class="knapp liten" data-d="60" aria-label="Ett minutt mer">+1</button></div><p class="skjult-visuelt" aria-live="assertive"></p>';
    const tid = el.querySelector(".ts-tid"), ring = el.querySelector(".ts-ring-for"), knapp = el.querySelector('[data-a="start"]'), melding = el.querySelector("[aria-live=assertive]");
    const vis = () => {
      const ms = gaar ? Math.max(0, slutt - Date.now()) : igjen, sek = Math.ceil(ms / 1000);
      tid.textContent = (sek >= 3600 ? Math.floor(sek / 3600) + ":" + to(Math.floor(sek / 60) % 60) : Math.floor(sek / 60)) + ":" + to(sek % 60);
      ring.style.strokeDashoffset = 100 - (s.sek ? ms / (s.sek * 1000) * 100 : 0);
      el.closest(".ts-panel").classList.toggle("ts-snart", gaar && sek <= 10 && sek > 0);
      if (gaar && ms <= 0) { gaar = false; clearInterval(t); igjen = 0; ferdig = true; knapp.textContent = "▶ Start"; el.closest(".ts-panel").classList.add("ts-alarm"); tid.textContent = "Tiden er ute!"; melding.textContent = "Tiden er ute!"; if (s.lyd !== false) alarm(); }
    };
    const stopp = () => { if (gaar) { igjen = Math.max(0, slutt - Date.now()); gaar = false; clearInterval(t); knapp.textContent = "▶ Fortsett"; } };
    const sett = sek => { stopp(); s.sek = Math.max(10, Math.min(5940, sek)); igjen = s.sek * 1000; ferdig = false; knapp.textContent = "▶ Start"; el.closest(".ts-panel").classList.remove("ts-alarm"); vis(); };
    el.addEventListener("click", e => {
      const b = e.target.closest("button"); if (!b) return;
      if (b.dataset.m) sett(+b.dataset.m * 60);
      else if (b.dataset.d) { if (gaar) { slutt += +b.dataset.d * 1000; s.sek = Math.max(s.sek, Math.ceil((slutt - Date.now()) / 1000)); } else sett(Math.round(igjen / 1000) + +b.dataset.d); vis(); }
      else if (b.dataset.a === "null") sett(s.sek);
      else if (b.dataset.a === "start") {
        if (gaar) { stopp(); return; }
        if (ferdig || igjen <= 0) sett(s.sek);
        ctx(); slutt = Date.now() + igjen; gaar = true; knapp.textContent = "⏸ Pause"; t = setInterval(vis, 200); vis();
      }
    });
    vis();
    return { stopp() { clearInterval(t); }, valg: [["lyd", "Lyd når tiden er ute", true]] };
  } };

  W.stoppeklokke = { navn: "Stoppeklokke", ikon: "⏱️", str: [300, 210], lag(el) {
    let start = 0, brukt = 0, gaar = false, t = null;
    el.innerHTML = '<div class="ts-tid ts-tid-stor" role="timer">0:00.0</div><div class="ts-rad"><button type="button" class="knapp hoved" data-a="start">▶ Start</button><button type="button" class="knapp liten" data-a="null">↺ Null</button></div>';
    const tid = el.querySelector(".ts-tid"), knapp = el.querySelector('[data-a="start"]');
    const vis = () => { const ms = brukt + (gaar ? Date.now() - start : 0), s = Math.floor(ms / 1000); tid.textContent = (s >= 3600 ? Math.floor(s / 3600) + ":" + to(Math.floor(s / 60) % 60) : Math.floor(s / 60)) + ":" + to(s % 60) + "." + Math.floor(ms / 100) % 10; };
    el.addEventListener("click", e => {
      const b = e.target.closest("button"); if (!b) return;
      if (b.dataset.a === "start") { if (gaar) { brukt += Date.now() - start; gaar = false; clearInterval(t); knapp.textContent = "▶ Fortsett"; } else { start = Date.now(); gaar = true; t = setInterval(vis, 100); knapp.textContent = "⏸ Pause"; } }
      else { brukt = 0; start = Date.now(); if (!gaar) knapp.textContent = "▶ Start"; }
      vis();
    });
    return { stopp() { clearInterval(t); } };
  } };

  W.klokke = { navn: "Klokke", ikon: "🕒", str: [300, 170], lag(el, s) {
    el.innerHTML = '<div class="ts-klokke"><div class="ts-tid ts-tid-stor"></div><div class="ts-dato"></div></div>';
    const tid = el.querySelector(".ts-tid"), dato = el.querySelector(".ts-dato");
    const vis = () => { const d = new Date(); tid.textContent = to(d.getHours()) + ":" + to(d.getMinutes()) + (s.sek ? ":" + to(d.getSeconds()) : ""); dato.textContent = d.toLocaleDateString("nb-NO", { weekday: "long", day: "numeric", month: "long" }); };
    vis(); const t = setInterval(vis, 1000);
    return { stopp() { clearInterval(t); }, valg: [["sek", "Vis sekunder", false]], oppdater: vis };
  } };

  W.lydmaler = { navn: "Lydmåler", ikon: "🔊", str: [340, 300], lag(el, s) {
    s.grense = s.grense || 60; s.folsom = s.folsom || 5;
    let strom = null, an = null, raf = null, niva = 0, over = 0, sistPip = 0;
    el.innerHTML = '<div class="ts-lyd"><div class="ts-lydfjes" aria-hidden="true">🎤</div><div class="ts-maaler"><div class="ts-maaler-fyll"></div><div class="ts-maaler-grense"></div></div><p class="ts-lydtekst" aria-live="polite">Trykk «Start» og gi tilgang til mikrofonen.</p></div>' +
      '<div class="ts-rad"><button type="button" class="knapp hoved" data-a="start">🎤 Start</button></div>' +
      '<div class="ts-glidere"><label>Grense <input type="range" min="15" max="95" value="' + s.grense + '" data-g="grense"></label><label>Følsomhet <input type="range" min="1" max="10" value="' + s.folsom + '" data-g="folsom"></label></div>' +
      '<p class="ts-smaa">Lyden behandles bare i nettleseren og tas ikke opp eller sendes noe sted.</p>';
    const fyll = el.querySelector(".ts-maaler-fyll"), gr = el.querySelector(".ts-maaler-grense"), fjes = el.querySelector(".ts-lydfjes"), tekst = el.querySelector(".ts-lydtekst"), knapp = el.querySelector('[data-a="start"]');
    const settGrense = () => { gr.style.left = s.grense + "%"; };
    settGrense();
    el.addEventListener("input", e => { const g = e.target.dataset.g; if (g) { s[g] = +e.target.value; settGrense(); } });
    const loop = () => {
      const buf = new Float32Array(an.fftSize); an.getFloatTimeDomainData(buf);
      let sum = 0; for (let i = 0; i < buf.length; i++) sum += buf[i] * buf[i];
      const rms = Math.sqrt(sum / buf.length), db = 20 * Math.log10(rms + 1e-8);
      const maal = Math.max(0, Math.min(100, (db + 70 + s.folsom * 3) * 1.6));
      niva = niva * .85 + maal * .15;
      fyll.style.width = niva + "%";
      const hoy = niva > s.grense, nesten = niva > s.grense * .8;
      fyll.className = "ts-maaler-fyll " + (hoy ? "ts-rod" : nesten ? "ts-gul" : "ts-gronn");
      over = hoy ? over + 1 : Math.max(0, over - 2);
      const varsel = over > 45;
      fjes.textContent = varsel ? "😖" : nesten ? "😐" : "🙂";
      tekst.textContent = varsel ? "Litt for høyt nå!" : nesten ? "Nesten for høyt" : "Fint lydnivå";
      el.closest(".ts-panel").classList.toggle("ts-alarm", varsel);
      if (varsel && s.pip && Date.now() - sistPip > 4000) { sistPip = Date.now(); pip(660, 0, .3, .15); }
      raf = requestAnimationFrame(loop);
    };
    const stopp = () => { cancelAnimationFrame(raf); if (strom) strom.getTracks().forEach(t => t.stop()); strom = null; knapp.textContent = "🎤 Start"; fjes.textContent = "🎤"; fyll.style.width = "0"; el.closest(".ts-panel").classList.remove("ts-alarm"); tekst.textContent = "Lydmåleren er av."; };
    knapp.addEventListener("click", async () => {
      if (strom) { stopp(); return; }
      try {
        strom = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false } });
        const a = ctx(); const kilde = a.createMediaStreamSource(strom); an = a.createAnalyser(); an.fftSize = 1024; kilde.connect(an);
        knapp.textContent = "⏹ Stopp"; loop();
      } catch (e) { strom = null; tekst.textContent = "Fikk ikke tilgang til mikrofonen. Sjekk at nettleseren har lov til å bruke den."; }
    });
    return { stopp, valg: [["pip", "Lite pip når det er for høyt", false]] };
  } };

  const SYMBOLER = [["🤫", "Stille arbeid"], ["🗣️", "Hviskestemme"], ["👥", "Snakk med sidemannen"], ["🧩", "Gruppearbeid"], ["✋", "Rekk opp hånda"], ["👂", "Lytt"], ["👀", "Se på tavla"], ["📖", "Les"], ["✍️", "Skriv"], ["💻", "PC"], ["📵", "Mobilen i sekken"], ["🚶", "Gå rolig"]];
  W.symboler = { navn: "Arbeidssymboler", ikon: "🤫", str: [380, 260], lag(el, s) {
    s.valgt = s.valgt || [0];
    const tegn = () => {
      el.innerHTML = '<div class="ts-symvis">' + s.valgt.map(i => '<div class="ts-sym"><span class="ts-symikon" aria-hidden="true">' + SYMBOLER[i][0] + "</span><span>" + esc(SYMBOLER[i][1]) + "</span></div>").join("") + "</div>" +
        '<details class="ts-velg"><summary>Velg symboler (opptil 3)</summary><div class="ts-symvalg">' + SYMBOLER.map((x, i) => '<button type="button" class="ts-symknapp" data-i="' + i + '" aria-pressed="' + s.valgt.includes(i) + '"><span aria-hidden="true">' + x[0] + "</span> " + esc(x[1]) + "</button>").join("") + "</div></details>";
    };
    el.addEventListener("click", e => {
      const b = e.target.closest(".ts-symknapp"); if (!b) return;
      const i = +b.dataset.i; s.valgt = s.valgt.includes(i) ? s.valgt.filter(x => x !== i) : s.valgt.concat(i).slice(-3);
      if (!s.valgt.length) s.valgt = [i];
      tegn(); const d = el.querySelector(".ts-velg"); d.open = true; const f = el.querySelector('.ts-symknapp[data-i="' + i + '"]'); if (f) f.focus();
    });
    tegn(); return {};
  } };

  W.trafikklys = { navn: "Trafikklys", ikon: "🚦", str: [220, 380], lag(el, s) {
    s.lys = s.lys || "gronn"; s.tekst = s.tekst || { rod: "Stopp og lytt", gul: "Hvisk", gronn: "Vanlig stemme" };
    const tegn = () => {
      el.innerHTML = '<div class="ts-lys" role="group" aria-label="Trafikklys">' + ["rod", "gul", "gronn"].map(f => '<button type="button" class="ts-lampe ts-' + f + (s.lys === f ? " ts-pa" : "") + '" data-f="' + f + '" aria-pressed="' + (s.lys === f) + '" aria-label="' + { rod: "Rødt", gul: "Gult", gronn: "Grønt" }[f] + ": " + esc(s.tekst[f]) + '"></button>').join("") + '</div><p class="ts-lystekst" contenteditable="true" spellcheck="false" aria-label="Tekst for lyset">' + esc(s.tekst[s.lys]) + "</p>";
    };
    el.addEventListener("click", e => { const b = e.target.closest(".ts-lampe"); if (b) { s.lys = b.dataset.f; tegn(); } });
    el.addEventListener("input", e => { if (e.target.classList.contains("ts-lystekst")) s.tekst[s.lys] = e.target.textContent.slice(0, 40); });
    tegn(); return {};
  } };

  W.plan = { navn: "Dagens plan", ikon: "📋", str: [360, 340], lag(el, s) {
    s.punkt = s.punkt || [["Oppstart", false], ["Gjennomgang", false], ["Arbeid", false], ["Oppsummering", false]];
    s.tittel = s.tittel == null ? "I dag skal vi …" : s.tittel;
    const tegn = (fokus) => {
      const naa = s.punkt.findIndex(p => !p[1]);
      el.innerHTML = '<p class="ts-plantittel" contenteditable="true" spellcheck="true" aria-label="Overskrift">' + esc(s.tittel) + '</p><ol class="ts-plan">' + s.punkt.map((p, i) => '<li class="' + (p[1] ? "ts-ferdig" : i === naa ? "ts-naa" : "") + '"><input type="checkbox" data-i="' + i + '"' + (p[1] ? " checked" : "") + ' aria-label="Ferdig: ' + esc(p[0]) + '"><span contenteditable="true" spellcheck="true" data-t="' + i + '">' + esc(p[0]) + '</span><button type="button" class="ts-x" data-slett="' + i + '" aria-label="Slett ' + esc(p[0]) + '">×</button></li>').join("") + '</ol><div class="ts-rad"><button type="button" class="knapp liten" data-a="ny">＋ Punkt</button></div>';
      if (fokus != null) { const f = el.querySelector('[data-t="' + fokus + '"]'); if (f) { f.focus(); document.getSelection().selectAllChildren(f); } }
    };
    el.addEventListener("change", e => { const i = e.target.dataset.i; if (i != null) { s.punkt[i][1] = e.target.checked; tegn(); } });
    el.addEventListener("input", e => { const t = e.target.dataset.t; if (t != null) s.punkt[t][0] = e.target.textContent.slice(0, 80); else if (e.target.classList.contains("ts-plantittel")) s.tittel = e.target.textContent.slice(0, 80); });
    el.addEventListener("keydown", e => { if (e.key === "Enter" && e.target.isContentEditable) { e.preventDefault(); const t = e.target.dataset.t; if (t != null) { s.punkt.splice(+t + 1, 0, ["", false]); tegn(+t + 1); } else e.target.blur(); } });
    el.addEventListener("click", e => { const b = e.target.closest("button"); if (!b) return; if (b.dataset.slett) { s.punkt.splice(+b.dataset.slett, 1); tegn(); } else if (b.dataset.a === "ny") { s.punkt.push(["Nytt punkt", false]); tegn(s.punkt.length - 1); } });
    tegn(); return {};
  } };

  W.tekst = { navn: "Beskjed", ikon: "💬", str: [420, 220], lag(el, s) {
    s.tekst = s.tekst == null ? "Skriv en beskjed her …" : s.tekst; s.str = s.str || 2;
    el.innerHTML = '<div class="ts-beskjed" contenteditable="true" spellcheck="true" aria-label="Beskjed" style="font-size:' + s.str + 'em">' + esc(s.tekst).replace(/\n/g, "<br>") + '</div><div class="ts-rad ts-hoyre"><button type="button" class="knapp liten" data-s="-1" aria-label="Mindre tekst">A−</button><button type="button" class="knapp liten" data-s="1" aria-label="Større tekst">A+</button></div>';
    const b = el.querySelector(".ts-beskjed");
    b.addEventListener("input", () => { s.tekst = b.innerText.slice(0, 600); });
    el.addEventListener("click", e => { const k = e.target.closest("[data-s]"); if (k) { s.str = Math.max(.8, Math.min(6, s.str + +k.dataset.s * .4)); b.style.fontSize = s.str + "em"; } });
    return {};
  } };

  const PRIKKER = { 1: [5], 2: [1, 9], 3: [1, 5, 9], 4: [1, 3, 7, 9], 5: [1, 3, 5, 7, 9], 6: [1, 3, 4, 6, 7, 9] };
  W.terning = { navn: "Terning", ikon: "🎲", str: [320, 230], lag(el, s) {
    s.antall = s.antall || 1;
    const terning = v => '<div class="ts-terning" aria-hidden="true">' + Array.from({ length: 9 }, (_, i) => "<i" + (PRIKKER[v].includes(i + 1) ? ' class="ts-prikk"' : "") + "></i>").join("") + "</div>";
    let verdier = [6];
    const tegn = (rull) => { el.innerHTML = '<div class="ts-terninger' + (rull ? " ts-ruller" : "") + '">' + verdier.map(terning).join("") + '</div><p class="ts-sum" aria-live="polite">' + (verdier.length > 1 ? "Sum: " + verdier.reduce((a, b) => a + b, 0) + " (" + verdier.join(" + ") + ")" : "Terningen viser " + verdier[0]) + '</p><div class="ts-rad"><button type="button" class="knapp hoved" data-a="kast">🎲 Kast</button><button type="button" class="knapp liten" data-n="-1" aria-label="Færre terninger">−</button><button type="button" class="knapp liten" data-n="1" aria-label="Flere terninger">+</button></div>'; };
    el.addEventListener("click", e => {
      const b = e.target.closest("button"); if (!b) return;
      if (b.dataset.n) { s.antall = Math.max(1, Math.min(4, s.antall + +b.dataset.n)); verdier = Array.from({ length: s.antall }, () => 6); tegn(); return; }
      let k = 0; const t = setInterval(() => { verdier = Array.from({ length: s.antall }, () => tilfeldig(6) + 1); tegn(true); if (++k > 8) { clearInterval(t); tegn(); el.querySelector('[data-a="kast"]').focus(); } }, 70);
    });
    verdier = Array.from({ length: s.antall }, () => 6); tegn(); return {};
  } };

  W.qr = { navn: "QR-kode", ikon: "🔳", str: [300, 360], lag(el, s) {
    s.url = s.url || location.origin + location.pathname.replace(/[^/]*$/, "");
    el.innerHTML = '<div class="ts-qr"></div><label class="ts-qrfelt"><span class="skjult-visuelt">Lenke eller tekst</span><input type="text" value="' + esc(s.url) + '" spellcheck="false"></label>';
    const boks = el.querySelector(".ts-qr"), inp = el.querySelector("input");
    const lag = async () => { try { if (!window.qrcode) await LV.lastSkript("assets/vendor/qrcode.js"); const q = window.qrcode(0, "M"); q.addData(s.url || " "); q.make(); boks.innerHTML = q.createSvgTag({ cellSize: 6, margin: 2, scalable: true }); boks.firstElementChild.setAttribute("role", "img"); boks.firstElementChild.setAttribute("aria-label", "QR-kode til " + s.url); } catch (e) { boks.textContent = "Teksten er for lang for en QR-kode."; } };
    let t; inp.addEventListener("input", () => { s.url = inp.value.slice(0, 600); clearTimeout(t); t = setTimeout(lag, 300); });
    lag(); return {};
  } };

  W.poeng = { navn: "Poengtavle", ikon: "🏆", str: [420, 260], lag(el, s) {
    s.lag = s.lag || [["Lag 1", 0], ["Lag 2", 0]];
    const tegn = () => {
      const maks = Math.max(...s.lag.map(l => l[1]));
      el.innerHTML = '<div class="ts-lagliste">' + s.lag.map((l, i) => '<div class="ts-lag' + (l[1] === maks && maks > 0 ? " ts-leder" : "") + '"><span class="ts-lagnavn" contenteditable="true" spellcheck="false" data-i="' + i + '" aria-label="Navn på lag ' + (i + 1) + '">' + esc(l[0]) + '</span><span class="ts-lagpoeng" aria-live="polite">' + l[1] + '</span><span class="ts-lagknapper"><button type="button" class="knapp liten" data-p="-1" data-l="' + i + '" aria-label="Ett poeng mindre til ' + esc(l[0]) + '">−</button><button type="button" class="knapp hoved liten" data-p="1" data-l="' + i + '" aria-label="Ett poeng til ' + esc(l[0]) + '">+1</button></span></div>').join("") + '</div><div class="ts-rad"><button type="button" class="knapp liten" data-a="ny">＋ Lag</button><button type="button" class="knapp liten" data-a="fjern">− Lag</button><button type="button" class="knapp liten" data-a="null">↺ Null</button></div>';
    };
    el.addEventListener("click", e => {
      const b = e.target.closest("button"); if (!b) return;
      if (b.dataset.p) { const l = s.lag[b.dataset.l]; l[1] = Math.max(0, l[1] + +b.dataset.p); if (+b.dataset.p > 0) pip(784, 0, .12, .12); tegn(); const f = el.querySelector('[data-l="' + b.dataset.l + '"][data-p="' + b.dataset.p + '"]'); if (f) f.focus(); }
      else if (b.dataset.a === "ny" && s.lag.length < 8) { s.lag.push(["Lag " + (s.lag.length + 1), 0]); tegn(); }
      else if (b.dataset.a === "fjern" && s.lag.length > 1) { s.lag.pop(); tegn(); }
      else if (b.dataset.a === "null" && confirm("Sette alle poengene til null?")) { s.lag.forEach(l => { l[1] = 0; }); tegn(); }
    });
    el.addEventListener("input", e => { const i = e.target.dataset.i; if (i != null) s.lag[i][0] = e.target.textContent.slice(0, 30); });
    tegn(); return {};
  } };

  W.navn = { navn: "Trekk et navn", ikon: "🎯", str: [340, 300], lag(el, s) {
    s.liste = s.liste || ""; let trukket = [];
    el.innerHTML = '<p class="ts-trukket" aria-live="polite">Trykk «Trekk»</p><div class="ts-rad"><button type="button" class="knapp hoved" data-a="trekk">🎯 Trekk</button><button type="button" class="knapp liten" data-a="vis" aria-expanded="false">✏️ Navn</button></div><label class="ts-navnliste" hidden><span>Ett navn per linje</span><textarea rows="5" spellcheck="false">' + esc(s.liste) + '</textarea></label><p class="ts-smaa">Samme navn trekkes ikke igjen før alle er trukket. Vil du ha mer spenning: <a href="navnehjul.html" target="_blank" rel="noopener">Navnehjulet</a>.</p>';
    const ta = el.querySelector("textarea"), vis = el.querySelector(".ts-trukket"), felt = el.querySelector(".ts-navnliste");
    if (!s.liste) { felt.hidden = false; el.querySelector('[data-a="vis"]').setAttribute("aria-expanded", "true"); }
    ta.addEventListener("input", () => { s.liste = ta.value; trukket = []; });
    el.addEventListener("click", e => {
      const b = e.target.closest("button"); if (!b) return;
      if (b.dataset.a === "vis") { felt.hidden = !felt.hidden; b.setAttribute("aria-expanded", !felt.hidden); if (!felt.hidden) ta.focus(); return; }
      const alle = s.liste.split("\n").map(x => x.trim()).filter(Boolean);
      if (!alle.length) { vis.textContent = "Skriv inn navn først"; felt.hidden = false; ta.focus(); return; }
      let pott = alle.filter(n => !trukket.includes(n)); if (!pott.length) { trukket = []; pott = alle; }
      const n = pott[tilfeldig(pott.length)]; trukket.push(n); felt.hidden = true;
      let k = 0; const t = setInterval(() => { vis.innerHTML = '<span class="ts-rull">' + esc(alle[tilfeldig(alle.length)]) + "</span>"; if (++k > 10) { clearInterval(t); vis.innerHTML = "<strong>" + esc(n) + "</strong>"; pip(880, 0, .15, .12); } }, 70);
    });
    return {};
  } };

  W.nedtellingDag = { navn: "Dager igjen til …", ikon: "📅", str: [320, 200], lag(el, s) {
    const om = new Date(Date.now() + 14 * 864e5);
    s.hva = s.hva || "Prøve"; s.dato = s.dato || om.toISOString().slice(0, 10);
    el.innerHTML = '<div class="ts-dager"><span class="ts-dagtall"></span><span class="ts-dagtekst"></span></div><div class="ts-rad ts-dagvalg"><label><span class="skjult-visuelt">Hva</span><input type="text" value="' + esc(s.hva) + '" data-k="hva" maxlength="40"></label><label><span class="skjult-visuelt">Dato</span><input type="date" value="' + esc(s.dato) + '" data-k="dato"></label></div>';
    const vis = () => { const d = Math.ceil((new Date(s.dato + "T00:00") - new Date(new Date().toDateString())) / 864e5); el.querySelector(".ts-dagtall").textContent = isNaN(d) ? "–" : Math.abs(d); el.querySelector(".ts-dagtekst").textContent = isNaN(d) ? "" : d === 0 ? s.hva + " er i dag!" : d > 0 ? (d === 1 ? "dag" : "dager") + " til " + s.hva.toLocaleLowerCase("nb") : (d === -1 ? "dag" : "dager") + " siden " + s.hva.toLocaleLowerCase("nb"); };
    el.addEventListener("input", e => { const k = e.target.dataset.k; if (k) { s[k] = e.target.value; vis(); } });
    vis(); return {};
  } };

  // ---------- Flate og paneler ----------
  let paneler = [], nesteId = 1, bakgrunn = 0, ovenpa = 10;
  function side() {
    document.title = "Tavleskjermen – " + (LV.config ? LV.config.navn : "Les verden");
    $("innhold").innerHTML = '<nav class="brodsmuler" aria-label="Brødsmuler"><a href="index.html">Forside</a> › <a href="laerer.html">For lærere</a> › Tavleskjermen</nav>' +
      '<header class="sidehode ts-hode"><p class="overlinje">For lærere · i klasserommet</p><h1>🖥️ Tavleskjermen</h1><p class="ingress">Ha den oppe på tavla gjennom timen: nedtelling, lydmåler, arbeidssymboler, dagens plan og mer. Legg til verktøy fra lista nederst, dra dem dit du vil ha dem, og gjør dem større eller mindre i hjørnet.</p></header>' +
      '<div class="ts-skjerm" id="ts-skjerm"><div class="ts-flate" id="ts-flate" aria-label="Tavleflate"></div>' +
      '<div class="ts-verktoy" role="toolbar" aria-label="Legg til verktøy">' + Object.entries(W).map(([k, w]) => '<button type="button" class="ts-leggtil" data-w="' + k + '" title="' + esc(w.navn) + '"><span aria-hidden="true">' + w.ikon + '</span><span class="ts-leggtil-navn">' + esc(w.navn) + "</span></button>").join("") +
      '<span class="ts-skille" aria-hidden="true"></span><button type="button" class="ts-leggtil" id="ts-bakgrunn" title="Bytt bakgrunn"><span aria-hidden="true">🎨</span><span class="ts-leggtil-navn">Bakgrunn</span></button><button type="button" class="ts-leggtil" id="ts-rydd" title="Rydd"><span aria-hidden="true">🧹</span><span class="ts-leggtil-navn">Rydd</span></button><button type="button" class="ts-leggtil" id="ts-full" title="Fullskjerm"><span aria-hidden="true">⛶</span><span class="ts-leggtil-navn">Fullskjerm</span></button></div></div>' +
      '<section class="le-del"><h2>Lagre oppsettet</h2><p class="mu-intro">Les verden lagrer ingenting. Vil du bruke det samme oppsettet igjen – for eksempel dagens plan eller poengtavla – last det ned som fil og åpne det neste gang.</p><p class="mu-knapper"><button type="button" class="knapp" id="ts-last">💾 Last ned oppsettet</button><label class="knapp kk-apne">📂 Åpne oppsett<input type="file" id="ts-fil" accept=".json,application/json" class="skjult-visuelt"></label></p><p class="rv-feil" id="ts-feil" role="alert"></p>' +
      '<h2>Tips</h2><ul class="kk-tips"><li><strong>Fullskjerm</strong> skjuler alt annet – trykk Esc for å gå ut.</li><li><strong>Flytt</strong> et verktøy ved å dra i tittellinja, eller velg tittellinja og bruk piltastene.</li><li><strong>Lydmåleren</strong> trenger tilgang til mikrofonen. Lyden behandles bare i nettleseren.</li><li><strong>Dagens plan:</strong> Trykk på teksten for å skrive, Enter gir nytt punkt, og avkrysningen viser hvor dere er.</li></ul></section>';
    $("ts-skjerm").querySelector(".ts-verktoy").addEventListener("click", e => { const b = e.target.closest("[data-w]"); if (b) { const p = leggTil(b.dataset.w); p.el.querySelector(".ts-panelhode").focus(); } });
    $("ts-bakgrunn").addEventListener("click", () => { bakgrunn = (bakgrunn + 1) % BAKGRUNNER.length; settBakgrunn(); });
    $("ts-rydd").addEventListener("click", rydd);
    $("ts-full").addEventListener("click", () => { const el = $("ts-skjerm"); if (document.fullscreenElement) document.exitFullscreen(); else if (el.requestFullscreen) el.requestFullscreen().catch(() => {}); });
    $("ts-last").addEventListener("click", lastNed);
    $("ts-fil").addEventListener("change", apne);
    settBakgrunn();
    ["klokke", "plan", "timer", "symboler"].forEach(k => leggTil(k));
    rydd();
  }
  function settBakgrunn() { const [navn, v] = BAKGRUNNER[bakgrunn]; $("ts-flate").style.background = v; $("ts-flate").classList.toggle("ts-mork", /2f4f3f|1c2541/.test(v)); $("ts-bakgrunn").title = "Bakgrunn: " + navn; }

  function leggTil(type, tilstand, pos) {
    const w = W[type]; if (!w) return null;
    const flate = $("ts-flate"), id = nesteId++, s = tilstand || {};
    const el = document.createElement("section"); el.className = "ts-panel ts-p-" + type; el.setAttribute("aria-label", w.navn);
    const bredde = flate.clientWidth || 1000, n = paneler.length;
    const p = pos || { x: 20 + (n * 36) % Math.max(40, bredde - w.str[0] - 40), y: 20 + (n * 30) % 200, w: w.str[0], h: w.str[1] };
    Object.assign(el.style, { left: p.x + "px", top: p.y + "px", width: p.w + "px", height: p.h + "px", zIndex: ++ovenpa });
    el.innerHTML = '<div class="ts-panelhode" tabindex="0" aria-label="' + esc(w.navn) + ' – dra eller bruk piltastene for å flytte"><span aria-hidden="true">' + w.ikon + '</span> <span class="ts-paneltittel">' + esc(w.navn) + '</span><span class="ts-panelknapper"></span><button type="button" class="ts-lukk" aria-label="Lukk ' + esc(w.navn) + '">×</button></div><div class="ts-innhold"></div>';
    flate.appendChild(el);
    const innhold = el.querySelector(".ts-innhold"), api = w.lag(innhold, s) || {};
    if (api.valg) {
      el.querySelector(".ts-panelknapper").innerHTML = '<details class="ts-innst"><summary aria-label="Innstillinger">⚙️</summary><div>' + api.valg.map(([k, t, std]) => { if (s[k] == null) s[k] = std; return '<label><input type="checkbox" data-v="' + k + '"' + (s[k] ? " checked" : "") + "> " + esc(t) + "</label>"; }).join("") + "</div></details>";
      el.querySelector(".ts-innst").addEventListener("change", e => { s[e.target.dataset.v] = e.target.checked; if (api.oppdater) api.oppdater(); });
    }
    const panel = { id, type, s, el, api };
    paneler.push(panel);
    el.querySelector(".ts-lukk").addEventListener("click", () => { if (api.stopp) api.stopp(); el.remove(); paneler = paneler.filter(x => x !== panel); });
    el.addEventListener("pointerdown", () => { el.style.zIndex = ++ovenpa; }, true);
    // dra
    const hode = el.querySelector(".ts-panelhode");
    hode.addEventListener("pointerdown", e => {
      if (e.target.closest("button, summary, details")) return;
      const sx = e.clientX, sy = e.clientY, ox = el.offsetLeft, oy = el.offsetTop;
      hode.setPointerCapture(e.pointerId); el.classList.add("ts-drar");
      const flytt = ev => { el.style.left = Math.max(0, Math.min(flate.clientWidth - 60, ox + ev.clientX - sx)) + "px"; el.style.top = Math.max(0, Math.min(flate.clientHeight - 40, oy + ev.clientY - sy)) + "px"; };
      const slipp = () => { el.classList.remove("ts-drar"); hode.removeEventListener("pointermove", flytt); hode.removeEventListener("pointerup", slipp); hode.removeEventListener("pointercancel", slipp); };
      hode.addEventListener("pointermove", flytt); hode.addEventListener("pointerup", slipp); hode.addEventListener("pointercancel", slipp);
    });
    hode.addEventListener("keydown", e => {
      const d = { ArrowLeft: [-20, 0], ArrowRight: [20, 0], ArrowUp: [0, -20], ArrowDown: [0, 20] }[e.key]; if (!d) return;
      e.preventDefault();
      if (e.shiftKey) { el.style.width = Math.max(180, el.offsetWidth + d[0]) + "px"; el.style.height = Math.max(120, el.offsetHeight + d[1]) + "px"; }
      else { el.style.left = Math.max(0, el.offsetLeft + d[0]) + "px"; el.style.top = Math.max(0, el.offsetTop + d[1]) + "px"; }
    });
    return panel;
  }
  // Legg panelene pent i rader
  function rydd() {
    const flate = $("ts-flate"), B = flate.clientWidth || 1000; let x = 16, y = 16, radH = 0;
    paneler.forEach(p => { const w = p.el.offsetWidth, h = p.el.offsetHeight; if (x + w > B - 16 && x > 16) { x = 16; y += radH + 16; radH = 0; } p.el.style.left = x + "px"; p.el.style.top = y + "px"; x += w + 16; radH = Math.max(radH, h); });
    flate.style.minHeight = Math.max(0, y + radH + 24) + "px";
  }

  function lastNed() {
    const data = { type: "les-verden-tavleskjerm", versjon: 1, bakgrunn, paneler: paneler.map(p => ({ type: p.type, s: p.s, pos: { x: p.el.offsetLeft, y: p.el.offsetTop, w: p.el.offsetWidth, h: p.el.offsetHeight } })) };
    const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([JSON.stringify(data, null, 1)], { type: "application/json" })); a.download = "tavleskjerm.json"; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  }
  function apne(e) {
    const f = e.target.files[0]; if (!f) return;
    f.text().then(t => {
      const d = JSON.parse(t); if (d.type !== "les-verden-tavleskjerm") throw new Error();
      paneler.forEach(p => { if (p.api.stopp) p.api.stopp(); p.el.remove(); }); paneler = [];
      bakgrunn = (+d.bakgrunn || 0) % BAKGRUNNER.length; settBakgrunn();
      (d.paneler || []).forEach(p => { if (W[p.type]) leggTil(p.type, p.s || {}, p.pos && { x: +p.pos.x || 0, y: +p.pos.y || 0, w: +p.pos.w || W[p.type].str[0], h: +p.pos.h || W[p.type].str[1] }); });
      $("ts-feil").textContent = "";
    }).catch(() => { $("ts-feil").textContent = "Kunne ikke åpne filen. Velg en tavleskjerm-fil som er lastet ned herfra."; });
    e.target.value = "";
  }

  document.addEventListener("DOMContentLoaded", side);
})();
