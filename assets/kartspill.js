/* =========================================================
   Les verden – kartspill
   Spillsettene ligger i data/kartspill.js og kartene i data/kart/*.js
   (begge lages av verktoy/lag-kart.mjs). Ingenting lagres.

   Spillmåter:
   - finn:  Et navn vises – trykk på riktig sted på kartet.
   - hva:   Et sted er markert – velg riktig navn blant fire.
   - ov:    Utforsk kartet fritt og se navnene.
   ========================================================= */

(function () {
  const LV = window.LV;
  const SVGNS = "http://www.w3.org/2000/svg";
  const GRUPPER = [
    { navn: "Verden", ikon: "🌍", tekst: "Land, elver, fjellkjeder, landemerker og historiske hendelser." },
    { navn: "Europa", ikon: "🇪🇺", tekst: "Alle landene og hovedstedene i Europa." },
    { navn: "USA", ikon: "🇺🇸", tekst: "The 50 states and their capitals – for engelskfaget." },
    { navn: "Storbritannia", ikon: "🇬🇧", tekst: "Countries, cities, accents and famous places – for engelskfaget." }
  ];
  const MODUSER = [
    { id: "finn", navn: "Finn på kartet", ikon: "🎯", tekst: "Et navn vises – trykk på riktig sted." },
    { id: "hva", navn: "Hva heter det?", ikon: "🔤", tekst: "Et sted er markert – velg riktig navn." },
    { id: "ov", navn: "Øv og utforsk", ikon: "🧭", tekst: "Utforsk kartet og lær navnene i ditt eget tempo." }
  ];
  const POLITISK = /^(land|stat|nasjon):/;

  const main = () => document.getElementById("innhold");
  const el = (tag, attr) => { const e = document.createElementNS(SVGNS, tag); for (const k in attr || {}) e.setAttribute(k, attr[k]); return e; };
  const bland = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const tid = ms => { const s = Math.floor(ms / 1000); return Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0"); };

  // =========================================================
  // Oversikt
  // =========================================================
  function oversikt() {
    document.title = "Kartspill – " + (LV.config ? LV.config.navn : "Les verden");
    let h = '<header class="sidehode"><h1>Kartspill</h1><p class="ingress">Lær deg kartet! Finn land, hovedsteder, elver, fjellkjeder, landemerker og historiske hendelser. Velg et kart, og velg om du vil finne stedene, gjette navnene eller bare utforske.</p></header>';
    h += '<div class="ks-moduser-info">' + MODUSER.map(m => '<div><span aria-hidden="true">' + m.ikon + "</span><strong>" + m.navn + "</strong><small>" + m.tekst + "</small></div>").join("") + "</div>";
    GRUPPER.forEach(g => {
      const sett = LV.kartspill.filter(s => s.gruppe === g.navn);
      if (!sett.length) return;
      h += '<section class="ks-gruppe"><h2><span aria-hidden="true">' + g.ikon + "</span> " + g.navn + '</h2><p class="ks-gruppe-tekst">' + g.tekst + '</p><ul class="ks-settliste">';
      sett.forEach(s => {
        h += '<li><a class="ks-settkort fag-' + s.fag + '" href="kartspill.html?sett=' + encodeURIComponent(s.id) + '">' +
          '<span class="merker"><span class="merke">' + LV.fagNavn[s.fag] + '</span><span class="merke">' + s.elementer.length + " steder</span></span>" +
          "<h3" + (s.sprak === "en" ? ' lang="en"' : "") + ">" + LV.esc(s.tittel) + "</h3><p>" + LV.esc(s.beskrivelse) + '</p><span class="ks-spill">Spill →</span></a></li>';
      });
      h += "</ul></section>";
    });
    h += '<section class="kommer"><h2>Kommer etter hvert</h2><ul><li>Flere verdensdeler: Afrika, Asia, Sør-Amerika og Oseania</li><li>Norges fylker og byer</li><li>Flere historiske kart knyttet til temaene</li></ul></section>';
    main().innerHTML = h;
  }

  // =========================================================
  // Spillet
  // =========================================================
  let S = null; // spilltilstand

  function startSett(sett) {
    document.title = sett.tittel + " – Kartspill";
    main().innerHTML = '<p class="melding">Laster kartet …</p>';
    LV.lastSkript("data/kart/" + sett.kart + ".js").then(() => {
      S = { sett: sett, kart: LV.kartdata[sett.kart], modus: LV.param("modus") || "finn", utvalg: null };
      if (!MODUSER.some(m => m.id === S.modus)) S.modus = "finn";
      byggSkall();
      tegnKart();
      nyRunde();
    }).catch(() => { main().innerHTML = '<p class="melding">Fant ikke kartet.</p>'; });
  }

  function byggSkall() {
    const s = S.sett;
    main().innerHTML =
      '<div class="ks-hode"><a class="ks-tilbake" href="kartspill.html">← Alle kartspill</a>' +
      "<h1" + (s.sprak === "en" ? ' lang="en"' : "") + ">" + LV.esc(s.tittel) + "</h1>" +
      '<div class="ks-moduser" role="tablist" aria-label="Spillmåte">' + MODUSER.map(m =>
        '<button class="knapp" role="tab" data-modus="' + m.id + '"><span aria-hidden="true">' + m.ikon + "</span> " + m.navn + "</button>").join("") + "</div></div>" +
      '<div class="ks-status" id="ks-status"></div>' +
      '<div class="ks-kartramme" id="ks-ramme">' +
        '<div class="ks-zoom"><button class="knapp" id="ks-inn" aria-label="Zoom inn">+</button><button class="knapp" id="ks-ut" aria-label="Zoom ut">−</button><button class="knapp" id="ks-null" aria-label="Vis hele kartet">⟲</button></div>' +
        '<div class="ks-boble" id="ks-boble" hidden></div>' +
      "</div>" +
      '<div class="ks-tilbakemelding" id="ks-tilbakemelding" aria-live="polite"></div>' +
      '<p class="ks-kilde">Kartdata: Natural Earth og US Census Bureau. Zoom med knappene, musehjulet eller to fingre, og dra for å flytte kartet.</p>';
    document.querySelectorAll("[data-modus]").forEach(b => b.addEventListener("click", () => {
      S.modus = b.dataset.modus; S.utvalg = null;
      const p = new URLSearchParams(location.search); p.set("modus", S.modus);
      history.replaceState(null, "", "kartspill.html?" + p);
      nyRunde();
    }));
  }

  // ---------- Tegn kartet ----------
  function tegnKart() {
    const k = S.kart, s = S.sett;
    const svg = el("svg", { class: "ks-kart", viewBox: "0 0 " + k.bredde + " " + k.hoyde, role: "img", "aria-label": "Kart: " + s.tittel });
    svg.appendChild(el("rect", { class: "ks-hav", x: -k.bredde, y: -k.hoyde, width: k.bredde * 3, height: k.hoyde * 3 }));
    const bg = el("g", { class: "ks-bakgrunn" });
    k.bakgrunn.forEach(b => { const p = el("path", { d: b.d }); p.dataset.navn = b.n || ""; bg.appendChild(p); });
    const ids = new Set(s.elementer.map(e => e.id));
    Object.entries(k.omrader).forEach(([id, o]) => {
      if (!ids.has(id) && POLITISK.test(id)) { const p = el("path", { d: o.d }); bg.appendChild(p); }
    });
    svg.appendChild(bg);

    const gOmr = el("g", { class: "ks-omrader" }), gLin = el("g", { class: "ks-linjer" }), gPkt = el("g", { class: "ks-punkter" }), gRing = el("g", { class: "ks-ringer" });
    S.elementNoder = {};
    s.elementer.forEach(e => {
      const noder = [];
      if (e.form === "omrade") {
        const o = k.omrader[e.id]; if (!o) return;
        const p = el("path", { d: o.d, class: "ks-el" }); p.dataset.id = e.id; gOmr.appendChild(p); noder.push(p);
        if (o.liten) { const c = el("circle", { cx: o.x, cy: o.y, class: "ks-el ks-ring" }); c.dataset.id = e.id; c.dataset.r = 9; gRing.appendChild(c); noder.push(c); }
        e._sentrum = [o.sx, o.sy];
      } else if (e.form === "linje") {
        const l = k.linjer[e.id]; if (!l) return;
        const vis = el("path", { d: l.d, class: "ks-el ks-linje" }); vis.dataset.id = e.id;
        const treff = el("path", { d: l.d, class: "ks-linje-treff" }); treff.dataset.id = e.id;
        gLin.appendChild(vis); gLin.appendChild(treff); noder.push(vis);
      } else if (e.form === "punkt" && e.xy) {
        const c = el("circle", { cx: e.xy[0], cy: e.xy[1], class: "ks-el ks-punkt" }); c.dataset.id = e.id; c.dataset.r = 5.5;
        const t = el("circle", { cx: e.xy[0], cy: e.xy[1], class: "ks-punkt-treff" }); t.dataset.id = e.id; t.dataset.r = 13;
        gPkt.appendChild(c); gPkt.appendChild(t); noder.push(c);
        e._sentrum = e.xy;
      }
      S.elementNoder[e.id] = noder;
    });
    svg.appendChild(gOmr); svg.appendChild(gLin); svg.appendChild(gRing); svg.appendChild(gPkt);
    svg.appendChild(el("g", { class: "ks-etiketter" }));

    const ramme = document.getElementById("ks-ramme");
    ramme.insertBefore(svg, ramme.firstChild);
    S.svg = svg;
    S.vb = { x: 0, y: 0, w: k.bredde, h: k.hoyde };
    settOppZoom();
    oppdaterVB();
  }

  // ---------- Zoom og panorering ----------
  function skala() {
    const cw = S.svg.clientWidth || S.kart.bredde, ch = S.svg.clientHeight || S.kart.hoyde;
    return Math.max(S.vb.w / cw, S.vb.h / ch);
  }
  function oppdaterVB() {
    const v = S.vb, k = S.kart;
    v.w = Math.min(k.bredde, Math.max(k.bredde / 14, v.w));
    v.h = v.w * k.hoyde / k.bredde;
    v.x = Math.min(k.bredde - v.w * 0.25, Math.max(-v.w * 0.75, v.x));
    v.y = Math.min(k.hoyde - v.h * 0.25, Math.max(-v.h * 0.75, v.y));
    S.svg.setAttribute("viewBox", [v.x, v.y, v.w, v.h].map(n => n.toFixed(2)).join(" "));
    const sk = skala();
    S.svg.querySelectorAll("circle[data-r]").forEach(c => c.setAttribute("r", (Number(c.dataset.r) * sk).toFixed(2)));
    S.svg.style.setProperty("--sk", sk);
    S.svg.querySelectorAll(".ks-etiketter text").forEach(t => t.setAttribute("font-size", (12 * sk).toFixed(2)));
  }
  function zoom(faktor, px, py) {
    const v = S.vb;
    const r = S.svg.getBoundingClientRect();
    const fx = px == null ? 0.5 : (px - r.left) / r.width, fy = py == null ? 0.5 : (py - r.top) / r.height;
    const mx = v.x + fx * v.w, my = v.y + fy * v.h;
    v.w = v.w / faktor;
    v.w = Math.min(S.kart.bredde, Math.max(S.kart.bredde / 14, v.w));
    v.h = v.w * S.kart.hoyde / S.kart.bredde;
    v.x = mx - fx * v.w; v.y = my - fy * v.h;
    oppdaterVB();
  }
  function zoomTil(sentrum, bredde) {
    const v = S.vb;
    v.w = bredde; v.h = v.w * S.kart.hoyde / S.kart.bredde;
    v.x = sentrum[0] - v.w / 2; v.y = sentrum[1] - v.h / 2;
    oppdaterVB();
  }
  function settOppZoom() {
    const svg = S.svg;
    document.getElementById("ks-inn").addEventListener("click", () => zoom(1.6));
    document.getElementById("ks-ut").addEventListener("click", () => zoom(1 / 1.6));
    document.getElementById("ks-null").addEventListener("click", () => { S.vb = { x: 0, y: 0, w: S.kart.bredde, h: S.kart.hoyde }; oppdaterVB(); });
    svg.addEventListener("wheel", e => { e.preventDefault(); zoom(e.deltaY < 0 ? 1.25 : 0.8, e.clientX, e.clientY); }, { passive: false });

    const pekere = new Map();
    let start = null, flyttet = false, pinch = null;
    svg.addEventListener("pointerdown", e => {
      pekere.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (pekere.size === 1) { start = { x: e.clientX, y: e.clientY, vx: S.vb.x, vy: S.vb.y, mal: e.target }; flyttet = false; }
      if (pekere.size === 2) {
        const [a, b] = [...pekere.values()];
        pinch = { d: Math.hypot(a.x - b.x, a.y - b.y), w: S.vb.w };
        flyttet = true;
      }
    });
    svg.addEventListener("pointermove", e => {
      if (!pekere.has(e.pointerId)) { if (S.modus === "ov") svev(e); return; }
      pekere.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (pekere.size === 2 && pinch) {
        const [a, b] = [...pekere.values()];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        const onsket = pinch.w * pinch.d / d;
        zoom(S.vb.w / onsket, (a.x + b.x) / 2, (a.y + b.y) / 2);
        return;
      }
      if (!start) return;
      const dx = e.clientX - start.x, dy = e.clientY - start.y;
      if (!flyttet && Math.hypot(dx, dy) > 6) { flyttet = true; svg.setPointerCapture(e.pointerId); svg.classList.add("drar"); }
      if (flyttet) {
        const sk = skala();
        S.vb.x = start.vx - dx * sk; S.vb.y = start.vy - dy * sk;
        oppdaterVB();
      }
    });
    const slutt = e => {
      const varKlikk = start && !flyttet && pekere.size === 1;
      const mal = start && start.mal;
      pekere.delete(e.pointerId);
      if (pekere.size < 2) pinch = null;
      if (pekere.size === 0) { svg.classList.remove("drar"); if (varKlikk) klikk(mal, e); start = null; }
    };
    svg.addEventListener("pointerup", slutt);
    svg.addEventListener("pointercancel", e => { pekere.delete(e.pointerId); pinch = null; start = null; svg.classList.remove("drar"); });
    window.addEventListener("resize", () => S && S.svg && oppdaterVB());
  }

  function elementFra(mal) {
    const n = mal && mal.closest && mal.closest("[data-id]");
    return n ? S.sett.elementer.find(e => e.id === n.dataset.id) : null;
  }
  function settKlasse(e, klasse) { (S.elementNoder[e.id] || []).forEach(n => { n.classList.remove("r1", "r2", "r3", "feil", "markert", "avslort", "blink"); if (klasse) n.classList.add(klasse); }); }
  function blink(e, klasse, ms) {
    (S.elementNoder[e.id] || []).forEach(n => { n.classList.add(klasse); setTimeout(() => n.classList.remove(klasse), ms || 900); });
  }

  // ---------- Boble (navn på kartet) ----------
  function visBoble(tekst, x, y, sprak) {
    const b = document.getElementById("ks-boble");
    const r = document.getElementById("ks-ramme").getBoundingClientRect();
    b.textContent = tekst;
    if (sprak) b.setAttribute("lang", sprak); else b.removeAttribute("lang");
    b.hidden = false;
    b.style.left = Math.min(r.width - 10, Math.max(10, x - r.left)) + "px";
    b.style.top = Math.max(10, y - r.top - 14) + "px";
    clearTimeout(S.bobleTid);
    S.bobleTid = setTimeout(() => { b.hidden = true; }, 1600);
  }
  function svev(e) {
    const elm = elementFra(e.target);
    if (elm) visBoble(elm.navn, e.clientX, e.clientY, S.sett.sprak);
  }

  // =========================================================
  // Runder
  // =========================================================
  function nyRunde() {
    const s = S.sett;
    document.querySelectorAll("[data-modus]").forEach(b => b.setAttribute("aria-selected", String(b.dataset.modus === S.modus)));
    s.elementer.forEach(e => settKlasse(e, null));
    S.svg.querySelector(".ks-etiketter").innerHTML = "";
    S.svg.classList.toggle("ov-modus", S.modus === "ov");
    document.getElementById("ks-tilbakemelding").innerHTML = "";
    const liste = S.utvalg || s.elementer;
    S.ko = bland(liste.filter(e => e.form !== "punkt" || e.xy));
    S.totalt = S.ko.length;
    S.resultat = {}; // id -> antall feil
    S.start = Date.now();
    S.forsok = 0;
    clearInterval(S.klokke);
    if (S.modus === "ov") return tegnOv();
    S.klokke = setInterval(oppdaterStatusTid, 1000);
    neste();
  }

  function oppdaterStatusTid() {
    const t = document.getElementById("ks-tid");
    if (t) t.textContent = tid(Date.now() - S.start);
  }

  function statuslinje(innhold) {
    const ferdig = Object.keys(S.resultat).length;
    const riktige = Object.values(S.resultat).filter(v => v === 0).length;
    document.getElementById("ks-status").innerHTML =
      '<div class="ks-sporsmal">' + innhold + "</div>" +
      '<div class="ks-tall"><span title="Ferdig">' + ferdig + " / " + S.totalt + '</span><span title="Riktig på første forsøk">✓ ' +
      (ferdig ? Math.round(riktige / ferdig * 100) : 0) + ' %</span><span id="ks-tid" title="Tid">' + tid(Date.now() - S.start) + "</span></div>";
  }

  function neste() {
    if (!S.ko.length) return ferdig();
    S.gjeldende = S.ko[0];
    S.forsok = 0;
    const e = S.gjeldende;
    const lang = S.sett.sprak === "en" ? ' lang="en"' : "";
    if (S.modus === "finn") {
      statuslinje('<span class="ks-ledetekst">Finn:</span> <strong class="ks-navn"' + lang + ">" + LV.esc(e.navn) + "</strong>" +
        (e.hint ? ' <button class="knapp liten" id="ks-hint">Hint</button><span class="ks-hinttekst" id="ks-hinttekst" hidden' + lang + ">" + LV.esc(e.hint) + "</span>" : "") +
        ' <button class="knapp liten" id="ks-hopp">Hopp over</button>');
      const hint = document.getElementById("ks-hint");
      if (hint) hint.addEventListener("click", () => { document.getElementById("ks-hinttekst").hidden = false; hint.remove(); });
      document.getElementById("ks-hopp").addEventListener("click", () => { S.ko.push(S.ko.shift()); neste(); });
    } else if (S.modus === "hva") {
      settKlasse(e, "markert");
      if (e._sentrum && liten(e)) zoomTil(e._sentrum, Math.min(S.vb.w, S.kart.bredde / 3));
      const andre = bland(S.sett.elementer.filter(x => x !== e && x.form === e.form)).slice(0, 3);
      const valg = bland([e].concat(andre.length >= 3 ? andre : bland(S.sett.elementer.filter(x => x !== e)).slice(0, 3)));
      statuslinje('<span class="ks-ledetekst">Hva heter det markerte stedet?</span><div class="ks-valg"' + lang + ">" +
        valg.map((v, i) => '<button class="ks-alternativ" data-i="' + i + '">' + LV.esc(v.navn) + "</button>").join("") + "</div>");
      document.querySelectorAll(".ks-alternativ").forEach(b => b.addEventListener("click", () => svarHva(b, valg[Number(b.dataset.i)])));
    }
  }

  function liten(e) {
    if (e.form === "punkt") return true;
    const o = S.kart.omrader[e.id];
    return o && o.liten;
  }

  // ---------- Finn på kartet ----------
  function klikk(mal, ev) {
    const valgt = elementFra(mal);
    if (S.modus === "ov") {
      if (valgt) { visBoble(valgt.navn, ev.clientX, ev.clientY, S.sett.sprak); visInfo(valgt, true); }
      return;
    }
    if (S.modus !== "finn" || !S.gjeldende || S.venter) return;
    if (!valgt) return;
    const e = S.gjeldende;
    if (valgt === e) {
      S.resultat[e.id] = S.forsok;
      settKlasse(e, S.forsok === 0 ? "r1" : S.forsok === 1 ? "r2" : "r3");
      visInfo(e, true);
      S.ko.shift();
      neste();
    } else {
      if (S.resultat[valgt.id] === undefined) blink(valgt, "blink-feil", 700);
      visBoble("Det var " + valgt.navn, ev.clientX, ev.clientY, S.sett.sprak);
      S.forsok++;
      if (S.forsok >= 3) {
        S.resultat[e.id] = 3;
        settKlasse(e, "avslort");
        S.venter = true;
        visInfo(e, false);
        if (e._sentrum && liten(e) && S.vb.w > S.kart.bredde / 2) zoomTil(e._sentrum, S.kart.bredde / 2.5);
        setTimeout(() => { settKlasse(e, "feil"); S.venter = false; S.ko.shift(); neste(); }, 1500);
      }
    }
  }

  // ---------- Hva heter det? ----------
  function svarHva(knapp, valgt) {
    const e = S.gjeldende;
    if (S.venter) return;
    if (valgt === e) {
      S.resultat[e.id] = S.forsok;
      knapp.classList.add("riktig");
      settKlasse(e, S.forsok === 0 ? "r1" : S.forsok === 1 ? "r2" : "r3");
      visInfo(e, true);
      S.venter = true;
      setTimeout(() => { S.venter = false; S.ko.shift(); neste(); }, 900);
    } else {
      knapp.classList.add("feil"); knapp.disabled = true;
      S.forsok++;
      if (S.forsok >= 2) {
        S.resultat[e.id] = 3;
        document.querySelectorAll(".ks-alternativ").forEach(b => { if (b.textContent === e.navn) b.classList.add("riktig"); b.disabled = true; });
        settKlasse(e, "feil");
        visInfo(e, false);
        S.venter = true;
        setTimeout(() => { S.venter = false; S.ko.shift(); neste(); }, 1600);
      }
    }
  }

  function visInfo(e, riktig) {
    const ut = document.getElementById("ks-tilbakemelding");
    const tema = e.tema && LV.temaer.find(t => t.id === e.tema);
    const lang = S.sett.sprak === "en" ? ' lang="en"' : "";
    ut.innerHTML = '<p class="' + (riktig ? "ok" : "ikke") + '"><span aria-hidden="true">' + (riktig ? "✓" : "✗") + "</span> " +
      (riktig ? "" : "Riktig svar: ") + "<strong" + lang + ">" + LV.esc(e.navn) + "</strong>" +
      (e.info ? " – <span" + lang + ">" + LV.esc(e.info) + "</span>" : "") +
      (tema ? ' <a href="tema.html?id=' + encodeURIComponent(tema.id) + '">Les mer: ' + LV.esc(tema.tittel) + " →</a>" : "") + "</p>";
  }

  // ---------- Øv og utforsk ----------
  function tegnOv() {
    document.getElementById("ks-status").innerHTML =
      '<div class="ks-sporsmal"><span class="ks-ledetekst">Trykk eller pek på kartet for å se navnene.</span> ' +
      '<label class="ks-bryter"><input type="checkbox" id="ks-alle-navn"> Vis alle navn</label></div>';
    document.getElementById("ks-alle-navn").addEventListener("change", function () { visEtiketter(this.checked); });
    const liste = document.createElement("div");
    liste.className = "ks-navneliste";
    liste.innerHTML = "<h2>Alle stedene (" + S.sett.elementer.length + ")</h2><ul" + (S.sett.sprak === "en" ? ' lang="en"' : "") + ">" +
      S.sett.elementer.slice().sort((a, b) => a.navn.localeCompare(b.navn, "nb")).map(e => '<li><button class="ks-navneknapp" data-vis="' + LV.esc(e.id) + '">' + LV.esc(e.navn) + "</button></li>").join("") + "</ul>";
    document.getElementById("ks-tilbakemelding").appendChild(liste);
    liste.querySelectorAll("[data-vis]").forEach(b => b.addEventListener("click", () => {
      const e = S.sett.elementer.find(x => x.id === b.dataset.vis);
      if (!e) return;
      if (e._sentrum && liten(e)) zoomTil(e._sentrum, S.kart.bredde / 3);
      blink(e, "blink-vis", 2400);
      visInfo(e, true);
      document.getElementById("ks-ramme").scrollIntoView({ behavior: "smooth", block: "center" });
    }));
  }
  function visEtiketter(pa) {
    const g = S.svg.querySelector(".ks-etiketter");
    g.innerHTML = "";
    if (!pa) return;
    const sk = skala();
    S.sett.elementer.forEach(e => {
      let p = e._sentrum;
      if (!p && e.form === "linje") {
        const n = (S.elementNoder[e.id] || [])[0];
        if (n) { const L = n.getTotalLength(); const q = n.getPointAtLength(L / 2); p = [q.x, q.y]; }
      }
      if (!p) return;
      const t = el("text", { x: p[0], y: p[1] - (e.form === "punkt" ? 9 * sk : 0), "font-size": (12 * sk).toFixed(2) });
      t.textContent = e.navn;
      g.appendChild(t);
    });
  }

  // ---------- Ferdig ----------
  function ferdig() {
    clearInterval(S.klokke);
    const brukt = Date.now() - S.start;
    const res = S.resultat;
    const n = Object.keys(res).length;
    const forste = Object.values(res).filter(v => v === 0).length;
    const pst = n ? Math.round(forste / n * 100) : 0;
    const bom = S.sett.elementer.filter(e => res[e.id] > 0);
    const lang = S.sett.sprak === "en" ? ' lang="en"' : "";
    const melding = pst === 100 ? "Fantastisk – alt riktig på første forsøk! 🏆" : pst >= 80 ? "Veldig bra! 🎉" : pst >= 50 ? "Godt jobbet – øv litt til, så sitter det!" : "Bra start! Prøv igjen, så blir du bedre for hver gang.";
    document.getElementById("ks-status").innerHTML =
      '<div class="ks-resultat"><h2>Ferdig! ' + pst + " %</h2><p>" + melding + "</p><p>" + forste + " av " + n + " riktig på første forsøk · tid " + tid(brukt) + "</p>" +
      (bom.length ? '<p class="ks-bomliste"><strong>Øv mer på:</strong> <span' + lang + ">" + bom.map(e => LV.esc(e.navn)).join(", ") + "</span></p>" : "") +
      '<div class="ks-resultat-knapper"><button class="knapp hoved" id="ks-igjen">Spill igjen</button>' +
      (bom.length ? '<button class="knapp" id="ks-bom">Øv bare på de jeg bommet på (' + bom.length + ")</button>" : "") +
      '<button class="knapp" id="ks-kopier">Kopier resultatet</button><span class="ks-kopistatus" id="ks-kopistatus" aria-live="polite"></span></div></div>';
    document.getElementById("ks-igjen").addEventListener("click", () => { S.utvalg = null; nyRunde(); });
    const bk = document.getElementById("ks-bom");
    if (bk) bk.addEventListener("click", () => { S.utvalg = bom; nyRunde(); });
    document.getElementById("ks-kopier").addEventListener("click", () => {
      const d = new Date();
      const tekst = "Kartspill: " + S.sett.tittel + " (" + MODUSER.find(m => m.id === S.modus).navn + ")\n" +
        "Dato: " + d.toLocaleDateString("nb-NO") + "\n" +
        "Resultat: " + forste + " av " + n + " riktig på første forsøk (" + pst + " %)\nTid: " + tid(brukt) +
        (bom.length ? "\nØv mer på: " + bom.map(e => e.navn).join(", ") : "");
      const status = document.getElementById("ks-kopistatus");
      const ok = () => { status.textContent = "Kopiert!"; };
      if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(tekst).then(ok, () => reserve(tekst, ok));
      else reserve(tekst, ok);
    });
  }
  function reserve(tekst, ok) {
    const t = document.createElement("textarea"); t.value = tekst; document.body.appendChild(t); t.select();
    try { document.execCommand("copy"); ok(); } catch (e) { window.prompt("Kopier teksten:", tekst); }
    t.remove();
  }

  document.addEventListener("DOMContentLoaded", function () {
    const id = LV.param("sett");
    const sett = id && LV.kartspill.find(s => s.id === id);
    if (sett) startSett(sett); else oversikt();
  });
})();
