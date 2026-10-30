/* =========================================================
   Les verden – ordbok
   - LV.ordbok.finn(ord) slår opp i Bokmålsordboka, norsk–engelsk og engelsk–norsk.
   - Dobbeltklikk (eller merk) et ord i teksten for å slå det opp.
   - ordbok.html: eget søk.
   Dataene ligger i data/ordbok/ og lages av verktoy/lag-ordbok.py.
   Alt slås opp i filer på nettstedet – ingenting sendes ut, og ingenting lagres.
   ========================================================= */
(function () {
  const LV = window.LV;
  const lager = { no: {}, en: {} };
  const venter = {};
  let indeksLastet = null;

  LV.ordbokDel = function (sprak, nr, data) { lager[sprak][nr] = data; };

  function lastIndeks() {
    if (!indeksLastet) indeksLastet = LV.ordbokIndeks ? Promise.resolve() : LV.lastSkript("data/ordbok/indeks.js");
    return indeksLastet;
  }
  // Finn hvilken fil et ord ligger i (lista har første ord i hver fil, sortert)
  function filFor(sprak, ord) {
    const liste = LV.ordbokIndeks[sprak];
    let lo = 0, hi = liste.length - 1, svar = 0;
    while (lo <= hi) { const m = (lo + hi) >> 1; if (liste[m] <= ord) { svar = m; lo = m + 1; } else hi = m - 1; }
    return svar;
  }
  function lastDel(sprak, nr) {
    if (lager[sprak][nr]) return Promise.resolve(lager[sprak][nr]);
    const k = sprak + nr;
    if (!venter[k]) venter[k] = LV.lastSkript("data/ordbok/" + sprak + "/" + nr + ".js").then(() => lager[sprak][nr] || {});
    return venter[k];
  }
  const delFor = (sprak, ord) => lastDel(sprak, filFor(sprak, ord));

  // ---------- Norsk ----------
  async function finnNorsk(ord) {
    const lav = ord.toLowerCase();
    const del = await delFor("no", lav);
    const treff = [], sett = new Set();
    const legg = (lemma, data, form) => { if (sett.has(lemma) || !data) return; sett.add(lemma); treff.push({ lemma: lemma, b: data.b || [], e: data.e || [], form: form }); };
    Object.keys(del.o || {}).forEach(l => { if (l.toLowerCase() === lav) legg(l, del.o[l]); });
    for (const l of (del.f && del.f[lav]) || []) {
      const d2 = await delFor("no", l.toLowerCase());
      legg(l, (d2.o || {})[l], ord);
    }
    // Vanlige ord først: ord fra Bokmålsordboka foran ord som bare finnes i Wiktionary,
    // grunnformen foran bøyningsformer, og symboler/forkortelser/egennavn sist.
    const poeng = t => (t.b.length ? 0 : 10) + (t.b.length && /^(symbol|forkortelse|)$/.test(t.b[0][0]) ? 5 : 0) +
      (t.lemma !== t.lemma.toLowerCase() && ord === lav ? 3 : 0) + (t.form ? 1 : 0);
    return treff.sort((a, b) => poeng(a) - poeng(b));
  }

  // ---------- Engelsk ----------
  const UREGELRETT = {
    am: "be", is: "be", are: "be", was: "be", were: "be", been: "be", being: "be", has: "have", had: "have", does: "do", did: "do", done: "do",
    went: "go", gone: "go", goes: "go", came: "come", saw: "see", seen: "see", took: "take", taken: "take", made: "make", said: "say", got: "get", gotten: "get",
    gave: "give", given: "give", knew: "know", known: "know", thought: "think", told: "tell", found: "find", felt: "feel", left: "leave", kept: "keep",
    began: "begin", begun: "begin", brought: "bring", bought: "buy", built: "build", caught: "catch", chose: "choose", chosen: "choose", drew: "draw", drawn: "draw",
    drove: "drive", driven: "drive", ate: "eat", eaten: "eat", fell: "fall", fallen: "fall", fought: "fight", flew: "fly", flown: "fly", forgot: "forget", forgotten: "forget",
    grew: "grow", grown: "grow", heard: "hear", held: "hold", led: "lead", lost: "lose", meant: "mean", met: "meet", paid: "pay", ran: "run", rose: "rise", risen: "rise",
    sold: "sell", sent: "send", sang: "sing", sung: "sing", sat: "sit", slept: "sleep", spoke: "speak", spoken: "speak", spent: "spend", stood: "stand", stole: "steal", stolen: "steal",
    swam: "swim", taught: "teach", threw: "throw", thrown: "throw", understood: "understand", woke: "wake", woken: "wake", wore: "wear", worn: "wear", won: "win", wrote: "write", written: "write",
    became: "become", broke: "break", broken: "break", fed: "feed", forgave: "forgive", hid: "hide", hidden: "hide", hung: "hang", lay: "lie", lain: "lie", lit: "light", rode: "ride", ridden: "ride",
    rang: "ring", rung: "ring", shook: "shake", shaken: "shake", shot: "shoot", sank: "sink", sunk: "sink", struck: "strike", swore: "swear", sworn: "swear", tore: "tear", torn: "tear",
    men: "man", women: "woman", children: "child", people: "person", feet: "foot", teeth: "tooth", mice: "mouse", geese: "goose", lives: "life", wives: "wife", knives: "knife",
    leaves: "leaf", wolves: "wolf", halves: "half", selves: "self", thieves: "thief", better: "good", best: "good", worse: "bad", worst: "bad", further: "far", farther: "far",
    an: "a", its: "it", his: "he", her: "she", their: "they", them: "they", our: "we", us: "we", my: "i", me: "i", your: "you", indices: "index", crises: "crisis", analyses: "analysis", phenomena: "phenomenon", criteria: "criterion"
  };
  function engelskeFormer(o) {
    const ut = [o];
    if (UREGELRETT[o]) ut.push(UREGELRETT[o]);
    const leggTil = x => { if (x && x.length > 1 && !ut.includes(x)) ut.push(x); };
    if (/'s$/.test(o)) leggTil(o.slice(0, -2));
    if (/ies$/.test(o)) leggTil(o.slice(0, -3) + "y");
    if (/(s|x|z|ch|sh|o)es$/.test(o)) leggTil(o.slice(0, -2));
    if (/s$/.test(o) && !/ss$/.test(o)) leggTil(o.slice(0, -1));
    if (/ied$/.test(o)) leggTil(o.slice(0, -3) + "y");
    if (/ed$/.test(o)) { leggTil(o.slice(0, -2)); leggTil(o.slice(0, -1)); if (/(.)\1ed$/.test(o)) leggTil(o.slice(0, -3)); }
    if (/ing$/.test(o)) { leggTil(o.slice(0, -3)); leggTil(o.slice(0, -3) + "e"); if (/(.)\1ing$/.test(o)) leggTil(o.slice(0, -4)); if (/ying$/.test(o)) leggTil(o.slice(0, -4) + "ie"); }
    if (/ier$/.test(o)) leggTil(o.slice(0, -3) + "y");
    if (/iest$/.test(o)) leggTil(o.slice(0, -4) + "y");
    if (/er$/.test(o)) { leggTil(o.slice(0, -2)); leggTil(o.slice(0, -1)); }
    if (/est$/.test(o)) { leggTil(o.slice(0, -3)); leggTil(o.slice(0, -2)); }
    if (/ly$/.test(o)) { leggTil(o.slice(0, -2)); if (/ily$/.test(o)) leggTil(o.slice(0, -3) + "y"); }
    return ut;
  }
  async function finnEngelsk(ord) {
    const lav = ord.toLowerCase().replace(/[’']/g, "'");
    const kandidater = engelskeFormer(lav);
    // Uregelrette former fra WordNet (f.eks. «went» → «go», «mice» → «mouse»)
    const d0 = await delFor("en", lav);
    ((d0.f || {})[lav] || []).forEach(f => { if (!kandidater.includes(f)) kandidater.splice(1, 0, f); });
    for (const f of kandidater) {
      const del = await delFor("en", f);
      const w = (del.w || {})[f], t = (del.t || {})[f];
      if ((w && w.length) || (t && t.length)) return { ord: f, form: f !== lav ? lav : null, liste: w || [], tes: t || [] };
    }
    return null;
  }

  LV.ordbok = {
    rens: function (t) {
      return String(t || "").trim().replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, "").replace(/[’]/g, "'");
    },
    finn: async function (ord) {
      ord = LV.ordbok.rens(ord);
      if (!ord) return { ord: ord, no: [], en: null };
      await lastIndeks();
      const [no, en] = await Promise.all([finnNorsk(ord), finnEngelsk(ord)]);
      // Prøv også uten stor forbokstav/med små bokstaver i norsk (står først i setningen)
      return { ord: ord, no: no, en: en };
    },
    // Finnes ordet (eller en bøyningsform av det) i ordboka? Brukes av Ordle.
    erOrd: async function (ord, sprak) {
      ord = LV.ordbok.rens(ord);
      if (!ord) return false;
      await lastIndeks();
      if (sprak === "en") return !!(await finnEngelsk(ord));
      return (await finnNorsk(ord)).length > 0;
    }
  };

  // =========================================================
  // Visning
  // =========================================================
  const esc = s => LV.esc(String(s == null ? "" : s));
  const lenkeOrd = (o, tekst) => '<a href="ordbok.html?q=' + encodeURIComponent(o) + '" data-ordbok-ord="' + esc(o) + '">' + esc(tekst || o) + "</a>";
  const lenkeOrdboken = o => "https://ordbokene.no/bm/" + encodeURIComponent(o);

  LV.ordbok.html = function (r, valg) {
    valg = valg || {};
    const kort = !!valg.kort; // i boblen: færre detaljer
    const forst = valg.forst || "no";
    let no = "", en = "";
    if (r.no.length) {
      no += '<section class="ob-del" lang="nb"><h3 class="ob-overskrift">Norsk ' + (r.no.some(t => t.b.length) ? "(Bokmålsordboka)" : "") + "</h3>";
      r.no.forEach(t => {
        no += '<article class="ob-oppslag"><h4><span class="ob-lemma">' + esc(t.lemma) + "</span>" +
          (t.form && t.form.toLowerCase() !== t.lemma.toLowerCase() ? ' <span class="ob-form">(' + esc(t.form) + " er en form av dette ordet)</span>" : "") + "</h4>";
        t.b.slice(0, kort ? 2 : 9).forEach((a, ai) => {
          const [klasse, kjonn, sanser, eks, boy, flere] = a;
          no += '<div class="ob-artikkel">' + (t.b.length > 1 ? '<span class="ob-nr">' + (ai + 1) + "</span>" : "") +
            '<p class="ob-klasse">' + esc([klasse, kjonn].filter(Boolean).join(", ")) + (boy && !kort ? ' · <span class="ob-boy">' + esc(boy) + "</span>" : "") + "</p>" +
            '<ol class="ob-sanser">' + sanser.slice(0, kort ? 2 : 5).map(s => "<li>" + esc(s) + "</li>").join("") + "</ol>" +
            (eks.length && !kort ? '<p class="ob-eks">Eksempel: ' + eks.map(e => "<em>" + esc(e) + "</em>").join(" · ") + "</p>" : "") +
            (((kort && sanser.length > 2) || flere) ? '<p class="ob-mer"><a href="' + lenkeOrdboken(t.lemma) + '" target="_blank" rel="noopener">Flere betydninger i ordbøkene.no ↗</a></p>' : "") + "</div>";
        });
        if (t.e.length) {
          no += '<div class="ob-engelsk"><p class="ob-klasse">På engelsk</p><ul>' + t.e.slice(0, kort ? 1 : 4).map(([pos, gl]) =>
            '<li lang="en"><span class="ob-pos">' + esc(pos) + ":</span> " + gl.slice(0, kort ? 3 : 5).map(esc).join("; ") + "</li>").join("") + "</ul></div>";
        }
        no += "</article>";
      });
      no += "</section>";
    }
    if (r.en) {
      const e = r.en;
      en += '<section class="ob-del"><h3 class="ob-overskrift">Engelsk</h3><article class="ob-oppslag"><h4><span class="ob-lemma" lang="en">' + esc(e.ord) + "</span>" +
        (e.form ? ' <span class="ob-form">(grunnformen av «' + esc(e.form) + "»)</span>" : "") + "</h4>";
      if (e.liste.length) {
        en += '<p class="ob-klasse">På norsk</p><ul class="ob-oversatt">' +
          e.liste.slice(0, kort ? 4 : 10).map(([nb, pos, hint]) => '<li><strong lang="nb">' + lenkeOrd(nb) + "</strong>" +
            (hint ? ' <span class="ob-hint" lang="en">' + esc(hint) + "</span>" : pos ? ' <span class="ob-hint">' + esc(pos) + "</span>" : "") + "</li>").join("") + "</ul>";
      }
      if (e.tes.length) {
        en += '<div class="ob-wordnet" lang="en"><p class="ob-klasse" lang="nb">Engelsk forklaring og synonymer</p><ol class="ob-sanser">' +
          e.tes.slice(0, kort ? 3 : 7).map(([pos, def, syn, ant, ex]) => '<li><span class="ob-pos">' + esc(pos) + ":</span> " + esc(def) +
            (ex && !kort ? ' <em class="ob-eks-en">«' + esc(ex) + "»</em>" : "") +
            (syn && syn.length ? '<span class="ob-syn"><span class="ob-synetikett" lang="nb">Synonymer:</span> ' + syn.slice(0, kort ? 5 : 8).map(x => lenkeOrd(x)).join(", ") + "</span>" : "") +
            (ant && ant.length ? '<span class="ob-syn ob-ant"><span class="ob-synetikett" lang="nb">Motsatt:</span> ' + ant.map(x => lenkeOrd(x)).join(", ") + "</span>" : "") + "</li>").join("") + "</ol>" +
          (kort && e.tes.length > 3 ? '<p class="ob-mer" lang="nb">' + (e.tes.length - 3) + " betydninger til i ordboka</p>" : "") + "</div>";
      }
      en += "</article></section>";
    }
    if (!no && !en) return '<p class="ob-ingen">Fant ikke «' + esc(r.ord) + '» i ordboka. Prøv grunnformen av ordet, eller søk i <a href="' + lenkeOrdboken(r.ord) + '" target="_blank" rel="noopener">ordbøkene.no ↗</a>.</p>';
    return forst === "en" ? en + no : no + en;
  };

  LV.ordbok.kilder = '<p class="ob-kilder">Kilder: <a href="https://ordbokene.no" target="_blank" rel="noopener">Bokmålsordboka</a>, Universitetet i Bergen og Språkrådet, ordbøkene.no, ' +
    '<a href="https://creativecommons.org/licenses/by/4.0/deed.no" target="_blank" rel="noopener">CC BY 4.0</a> (forkortet) · Engelsk: <a href="https://www.wiktionary.org" target="_blank" rel="noopener">Wiktionary</a> via kaikki.org og FreeDict/WikDict, ' +
    '<a href="https://creativecommons.org/licenses/by-sa/3.0/deed.no" target="_blank" rel="noopener">CC BY-SA 3.0</a> · Engelske forklaringer og synonymer: <a href="https://en-word.net" target="_blank" rel="noopener">Open English WordNet</a> (bygger på Princeton WordNet), ' +
    '<a href="https://creativecommons.org/licenses/by/4.0/deed.no" target="_blank" rel="noopener">CC BY 4.0</a></p>';

  // =========================================================
  // Boble: dobbeltklikk eller merk et ord
  // =========================================================
  let boble = null, knapp = null;
  function sideSprak(node) {
    const el = node && (node.nodeType === 1 ? node : node.parentElement);
    const l = el && el.closest("[lang]");
    return l && /^en/.test(l.getAttribute("lang")) ? "en" : "no";
  }
  function lukk() { if (boble) { boble.remove(); boble = null; } }
  function lukkKnapp() { if (knapp) { knapp.remove(); knapp = null; } }

  async function visBoble(ord, rekt, sprak) {
    lukk(); lukkKnapp();
    ord = LV.ordbok.rens(ord);
    if (!ord) return;
    boble = document.createElement("div");
    boble.className = "ordbok-boble";
    boble.setAttribute("role", "dialog");
    boble.setAttribute("aria-label", "Ordbok: " + ord);
    boble.innerHTML = '<div class="ob-topp"><strong>📖 ' + esc(ord) + '</strong><button class="ob-lukk" aria-label="Lukk ordboka">×</button></div><div class="ob-innhold"><p class="ob-laster">Slår opp …</p></div>';
    document.body.appendChild(boble);
    plasser(rekt);
    boble.querySelector(".ob-lukk").addEventListener("click", lukk);
    const denne = boble;
    let r;
    try { r = await LV.ordbok.finn(ord); } catch (e) { r = { ord: ord, no: [], en: null }; }
    if (boble !== denne) return;
    boble.querySelector(".ob-innhold").innerHTML = LV.ordbok.html(r, { kort: true, forst: sprak }) +
      '<p class="ob-bunn"><a href="ordbok.html?q=' + encodeURIComponent(ord) + '">Åpne i ordboka →</a></p>';
    plasser(rekt);
    boble.querySelector(".ob-lukk").focus({ preventScroll: true });
    boble.querySelector(".ob-innhold").addEventListener("click", e => {
      const a = e.target.closest("[data-ordbok-ord]");
      if (!a) return;
      e.preventDefault();
      visBoble(a.dataset.ordbokOrd, rekt, /[æøå]/i.test(a.dataset.ordbokOrd) || a.closest('[lang="nb"]') ? "no" : "en");
    });
  }
  function plasser(rekt) {
    if (!boble) return;
    if (window.innerWidth < 600 || !rekt) { boble.classList.add("ark"); return; }
    const b = boble.getBoundingClientRect();
    let top = rekt.bottom + 8, venstre = Math.min(Math.max(8, rekt.left), window.innerWidth - b.width - 8);
    if (top + b.height > window.innerHeight - 8 && rekt.top - b.height - 8 > 8) top = rekt.top - b.height - 8;
    boble.style.top = (top + window.scrollY) + "px";
    boble.style.left = (venstre + window.scrollX) + "px";
  }
  function ignorer(node) {
    const el = node && (node.nodeType === 1 ? node : node.parentElement);
    return !el || !!el.closest("textarea, input, select, button, .ordbok-boble, .ordbok-knapp, .topp, .ordbok-side, [data-ingen-ordbok], svg");
  }
  function merketOrd() {
    const s = window.getSelection();
    if (!s || s.isCollapsed || !s.rangeCount) return null;
    const t = LV.ordbok.rens(s.toString());
    if (!t || t.length > 40 || /\s/.test(t) || !/\p{L}/u.test(t)) return null;
    if (ignorer(s.anchorNode)) return null;
    return { ord: t, rekt: s.getRangeAt(0).getBoundingClientRect(), sprak: sideSprak(s.anchorNode) };
  }

  LV.ordbok.aktiver = function () {
    document.addEventListener("dblclick", e => {
      if (ignorer(e.target)) return;
      setTimeout(() => { const m = merketOrd(); if (m) visBoble(m.ord, m.rekt, m.sprak); }, 10);
    });
    // Merk et ord (f.eks. hold inne på mobil): vis en liten «Slå opp»-knapp
    let tid = null;
    document.addEventListener("selectionchange", () => {
      clearTimeout(tid);
      tid = setTimeout(() => {
        const m = merketOrd();
        if (!m) { lukkKnapp(); return; }
        if (boble) return;
        lukkKnapp();
        knapp = document.createElement("button");
        knapp.className = "ordbok-knapp";
        knapp.type = "button";
        knapp.innerHTML = '📖 Slå opp «' + esc(m.ord) + "»";
        knapp.style.top = (m.rekt.bottom + window.scrollY + 8) + "px";
        knapp.style.left = Math.max(8, Math.min(m.rekt.left + window.scrollX, window.scrollX + window.innerWidth - 220)) + "px";
        knapp.addEventListener("mousedown", e => e.preventDefault());
        knapp.addEventListener("click", () => visBoble(m.ord, m.rekt, m.sprak));
        document.body.appendChild(knapp);
      }, 450);
    });
    document.addEventListener("mousedown", e => { if (boble && !boble.contains(e.target)) lukk(); });
    document.addEventListener("keydown", e => { if (e.key === "Escape") { lukk(); lukkKnapp(); } });
    window.addEventListener("resize", () => { lukk(); lukkKnapp(); });
  };

  // =========================================================
  // ordbok.html
  // =========================================================
  async function ordbokside() {
    const main = document.getElementById("innhold");
    const q = LV.param("q") || "";
    main.innerHTML = '<header class="sidehode"><h1>Ordbok</h1><p class="ingress">Slå opp norske og engelske ord. Norske ord får forklaring fra Bokmålsordboka og engelsk oversettelse. Engelske ord får norsk oversettelse. ' +
      "Tips: Dobbeltklikk på et ord i tekstene (eller hold fingeren på ordet på mobil) for å slå det opp der du leser.</p></header>" +
      '<form class="ob-sok" role="search"><label for="ob-felt" class="skjult-visuelt">Ord</label><input id="ob-felt" type="search" autocomplete="off" spellcheck="false" placeholder="Skriv et ord, f.eks. demokrati eller freedom" value="' + esc(q) + '">' +
      '<button class="knapp hoved" type="submit">Slå opp</button></form><div id="ob-resultat" class="ob-resultat" aria-live="polite"></div>' + LV.ordbok.kilder;
    const felt = document.getElementById("ob-felt"), res = document.getElementById("ob-resultat");
    async function sok(ord, skrivAdresse) {
      ord = LV.ordbok.rens(ord);
      if (!ord) { res.innerHTML = ""; return; }
      res.innerHTML = '<p class="ob-laster">Slår opp …</p>';
      const r = await LV.ordbok.finn(ord);
      res.innerHTML = '<h2 class="ob-tittel">' + esc(ord) + "</h2>" + LV.ordbok.html(r, { forst: "no" }) +
        (r.no.length ? '<p class="ob-mer"><a href="' + lenkeOrdboken(r.no[0].lemma) + '" target="_blank" rel="noopener">Se «' + esc(r.no[0].lemma) + "» i ordbøkene.no ↗</a></p>" : "");
      document.title = ord + " – Ordbok – " + (LV.config ? LV.config.navn : "Les verden");
      if (skrivAdresse) history.replaceState(null, "", "ordbok.html?q=" + encodeURIComponent(ord));
    }
    main.querySelector(".ob-sok").addEventListener("submit", e => { e.preventDefault(); sok(felt.value, true); });
    res.addEventListener("click", e => {
      const a = e.target.closest("[data-ordbok-ord]");
      if (!a) return;
      e.preventDefault(); felt.value = a.dataset.ordbokOrd; sok(felt.value, true); window.scrollTo({ top: 0, behavior: "smooth" });
    });
    if (q) sok(q, false); else felt.focus();
  }

  document.addEventListener("DOMContentLoaded", function () {
    const side = document.body.dataset.side;
    if (side === "ordbok") ordbokside();
    else if (side !== "spill" && side !== "kartspill") LV.ordbok.aktiver();
  });
})();
