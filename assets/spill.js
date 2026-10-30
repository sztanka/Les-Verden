/* =========================================================
   Les verden – læringsspill
   Spillene lages automatisk fra innholdet i temaene:
   - begreper («ord»), personer og tidslinje.
   spill.html                         → oversikt (velg tema og spill)
   spill.html?spill=memory&tema=<id>  → ett spill for ett tema
   spill.html?spill=memory&fag=engelsk&trinn=9 → bland alle temaene
   Spill: memory, koble, hangman, ordsok, rekkefolge.
   Ingenting lagres.
   ========================================================= */

(function () {
  const LV = window.LV;
  const $ = id => document.getElementById(id);
  const bland = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const tid = ms => { const s = Math.floor(ms / 1000); return Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0"); };

  const SPILL = [
    { id: "memory", ikon: "🃏", navn: "Memory", tekst: "Snu to og to kort og finn parene: begrep og forklaring, person og rolle, dato og hendelse.", krever: "par" },
    { id: "koble", ikon: "🔗", navn: "Koble sammen", tekst: "Alle kortene ligger synlige. Koble hvert begrep med riktig forklaring – god lesetrening!", krever: "par" },
    { id: "hangman", ikon: "🔤", navn: "Gjett ordet (hangman)", tekst: "Gjett begrepet bokstav for bokstav. Forklaringen er hintet ditt.", krever: "ord" },
    { id: "ordsok", ikon: "🔍", navn: "Ordsøk", tekst: "Finn begrepene som er gjemt i rutenettet – vannrett, loddrett og på skrå.", krever: "ord" },
    { id: "ordle", ikon: "🟩", navn: "Ordle", tekst: "Som Wordle: gjett et ord fra temaet på seks forsøk. Grønn = riktig plass, gul = feil plass.", krever: "enkeltord1" },
    { id: "ordmiks", ikon: "🔀", navn: "Ordmiks", tekst: "Som Smartle: bytt om bokstavene til hver rad blir et ord fra temaet. Forklaringene er ledetråder.", krever: "enkeltord3" },
    { id: "kryssord", ikon: "✏️", navn: "Kryssord", tekst: "Løs et kryssord der ledetrådene er forklaringene til begrepene i temaet.", krever: "kryssord" },
    { id: "rekkefolge", ikon: "⏳", navn: "Tidslinje", tekst: "Sett hendelsene i riktig rekkefølge – fra eldst til nyest.", krever: "hendelser" },
    { id: "worldle", ikon: "🌍", navn: "Worldle", tekst: "Gjett landet ut fra omrisset. Du får avstand og retning for hvert forsøk.", uavhengig: true }
  ];

  // Tekster for norske og engelske temaer
  const TEKST = {
    nb: { begrep: "Begrep", person: "Person", hendelse: "Hendelse", ferdig: "Ferdig!", igjen: "Spill igjen", kopier: "Kopier resultatet", kopiert: "Kopiert!",
      trekk: "Forsøk", tid: "Tid", feil: "Feil", neste: "Neste ord", hint: "Forklaring", riktigOrd: "Ordet var", bra: "Riktig!", tapt: "Ikke denne gangen.",
      sjekk: "Sjekk rekkefølgen", eldst: "Eldst", nyest: "Nyest", alleRiktig: "Alt riktig! 🎉", riktigePlass: "på riktig plass", visForklaring: "Vis forklaringer i stedet for ord (vanskeligere)",
      funnet: "Funnet", ordliste: "Finn disse ordene", tilTema: "Til temaet", alleSpill: "Alle spill", kategorier: "Ta med", antallPar: "Antall par",
      parene: "Alle parene", poeng: "Riktige ord", hintPerson: "Ledetråd", opp: "Flytt opp", ned: "Flytt ned" },
    en: { begrep: "Term", person: "Person", hendelse: "Event", ferdig: "Well done!", igjen: "Play again", kopier: "Copy the result", kopiert: "Copied!",
      trekk: "Moves", tid: "Time", feil: "Mistakes", neste: "Next word", hint: "Explanation", riktigOrd: "The word was", bra: "Correct!", tapt: "Not this time.",
      sjekk: "Check the order", eldst: "Oldest", nyest: "Newest", alleRiktig: "All correct! 🎉", riktigePlass: "in the right place", visForklaring: "Show explanations instead of words (harder)",
      funnet: "Found", ordliste: "Find these words", tilTema: "Back to the topic", alleSpill: "All games", kategorier: "Include", antallPar: "Number of pairs",
      parene: "All the pairs", poeng: "Words solved", hintPerson: "Clue", opp: "Move up", ned: "Move down" }
  };
  let T = TEKST.nb, SPRAK = "nb";

  // =========================================================
  // Hent spilldata fra et tema
  // =========================================================
  function forkort(t, maks) {
    t = String(t || "").replace(/\*\*(.+?)\*\*/g, "$1").replace(/\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g, "$1").trim();
    if (t.length <= maks) return t;
    const kutt = t.slice(0, maks);
    return kutt.slice(0, kutt.lastIndexOf(" ")) + " …";
  }
  function forsteSetning(t) { const m = String(t).match(/^.*?[.!?](\s|$)/); return m ? m[0].trim() : t; }

  LV.spilldata = function (tema, kat) {
    const en = tema.sprak === "en";
    const par = [], ord = [], hendelser = [];
    const tittel = (kat && kat.tittel) || tema.tittel;
    Object.entries(tema.ord || {}).forEach(([k, v]) => {
      let norsk = "", forkl = v;
      if (en) {
        const i = v.indexOf(" – ");
        if (i > 0) { norsk = v.slice(0, i).trim(); forkl = v.slice(i + 3).trim(); }
      }
      forkl = forkl.charAt(0).toUpperCase() + forkl.slice(1);
      par.push({ id: "o:" + tema.id + ":" + k, type: "begrep", a: k, a2: norsk, b: forkort(forkl, 130), tema: tittel, temaId: tema.id });
      ord.push({ ord: k, norsk: norsk, type: "begrep", forklaring: forkl, tema: tittel });
    });
    (tema.personer || []).forEach(p => {
      const b = p.rolle ? p.rolle + (p.levde ? " (" + p.levde + ")" : "") : forsteSetning(p.tekst);
      par.push({ id: "p:" + p.navn, type: "person", a: p.navn, b: forkort(b, 130), tema: tittel, temaId: tema.id, info: p.tekst });
      const deler = p.navn.split(/\s+/), etter = deler[deler.length - 1];
      ord.push({ ord: p.navn, sok: etter.length >= 4 ? etter : p.navn, type: "person", forklaring: b, tema: tittel });
    });
    const sett = new Set();
    (tema.tidslinje || []).forEach(h => {
      const nokkel = LV.tidsnokkel ? LV.tidsnokkel(h.dato) : null;
      hendelser.push({ dato: h.dato, tekst: forkort(h.tekst, 160), nokkel: nokkel, tema: tittel });
      if (sett.has(h.dato)) return;
      sett.add(h.dato);
      par.push({ id: "h:" + tema.id + ":" + h.dato, type: "hendelse", a: h.dato, b: forkort(h.tekst, 130), tema: tittel, temaId: tema.id });
    });
    return { par: par, ord: ord, hendelser: hendelser };
  };

  // =========================================================
  // Felles: last tema(er) og bygg ramme
  // =========================================================
  let DATA = null, KILDE = null; // KILDE: { tittel, lenke, sprak }

  async function lastData() {
    const id = LV.param("tema");
    if (id) {
      const kat = LV.temaer.find(t => t.id === id);
      if (!kat) throw new Error("Fant ikke temaet");
      LV.tema = null;
      await LV.lastSkript("data/temaer/" + encodeURIComponent(id) + ".js");
      const tema = LV.tema;
      KILDE = { tittel: kat.tittel, lenke: "tema.html?id=" + encodeURIComponent(id), sprak: tema.sprak || "nb", fag: kat.fag };
      return LV.spilldata(tema, kat);
    }
    const fag = LV.param("fag"), trinn = LV.param("trinn");
    const utvalg = LV.temaer.filter(t => (!fag || t.fag === fag) && (!trinn || String(t.trinn) === trinn));
    if (!utvalg.length) throw new Error("Ingen temaer");
    $("innhold").innerHTML = '<p class="melding">Henter innhold fra ' + utvalg.length + " temaer …</p>";
    const alle = await LV.lastAlleTemaer();
    const samlet = { par: [], ord: [], hendelser: [] };
    const settId = new Set();
    alle.filter(x => utvalg.includes(x.kat)).forEach(x => {
      const d = LV.spilldata(x.tema, x.kat);
      d.par.forEach(p => { if (!settId.has(p.id)) { settId.add(p.id); samlet.par.push(p); } });
      samlet.ord.push(...d.ord); samlet.hendelser.push(...d.hendelser);
    });
    KILDE = { tittel: (fag ? LV.fagNavn[fag] : "Alle fag") + (trinn ? ", " + trinn + ". trinn" : "") + " – alle temaer", lenke: "index.html" + (fag ? "?fag=" + fag : ""), sprak: fag === "engelsk" ? "en" : "nb", fag: fag, blandet: true };
    return samlet;
  }

  function ramme(spill, innhold) {
    const s = SPILL.find(x => x.id === spill);
    $("innhold").innerHTML =
      '<nav class="brodsmuler" aria-label="Brødsmuler" lang="nb"><a href="index.html">Forside</a> › <a href="spill.html">Spill</a> › ' + LV.esc(s.navn) + "</nav>" +
      '<header class="spill-hode"><h1><span aria-hidden="true">' + s.ikon + "</span> " + LV.esc(s.navn) + "</h1>" +
      '<p class="spill-kilde"' + (KILDE.sprak === "en" ? ' lang="en"' : "") + ">" + LV.esc(KILDE.tittel) +
      (KILDE.blandet ? "" : ' · <a href="' + KILDE.lenke + '" lang="nb">← ' + TEKST.nb.tilTema + "</a>") + "</p>" +
      (s.uavhengig ? "</header>" : '<nav class="spill-andre" aria-label="Andre spill" lang="nb">' + SPILL.filter(x => x.id !== spill && !x.uavhengig && kanSpilles(x)).map(x =>
        '<a href="spill.html?' + adresse(x.id) + '"><span aria-hidden="true">' + x.ikon + "</span> " + x.navn + "</a>").join("") + "</nav></header>") +
      '<div id="spillflate" class="spillflate"' + (KILDE.sprak === "en" ? ' lang="en"' : "") + ">" + innhold + "</div>";
  }
  function adresse(spill) {
    const p = new URLSearchParams(location.search); p.set("spill", spill); return p.toString();
  }
  function kanSpilles(s) {
    if (!DATA) return true;
    if (s.krever === "par") return DATA.par.length >= 4;
    if (s.krever === "ord") return DATA.ord.length >= 3;
    if (s.krever === "enkeltord1") return enkeltord(4, 9, false).length + enkeltord(4, 9, true).filter(x => x.type === "person").length >= 2;
    if (s.krever === "enkeltord3") return enkeltord(3, 10, false).length + enkeltord(4, 10, true).filter(x => x.type === "person").length >= 3;
    if (s.krever === "kryssord") return DATA.ord.length >= 4;
    if (s.krever === "hendelser") return DATA.hendelser.filter(h => h.nokkel != null).length >= 4;
    return true;
  }
  function kopier(tekst, statusEl) {
    const ok = () => { if (statusEl) statusEl.textContent = T.kopiert; };
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(tekst).then(ok, () => reserve());
    else reserve();
    function reserve() {
      const t = document.createElement("textarea"); t.value = tekst; t.style.position = "fixed"; t.style.opacity = "0"; document.body.appendChild(t); t.select();
      try { document.execCommand("copy"); ok(); } catch (e) { window.prompt("Ctrl+C / Cmd+C", tekst); }
      t.remove();
    }
  }
  function resultatTekst(spill, linje) {
    const d = new Date();
    return "Spill: " + SPILL.find(x => x.id === spill).navn + "\nTema: " + KILDE.tittel + "\nDato: " + d.toLocaleDateString("nb-NO") + "\nResultat: " + linje + "\n";
  }
  const typeNavn = t => T[t];

  // =========================================================
  // MEMORY og KOBLE SAMMEN
  // =========================================================
  function memory(synlig) {
    const spill = synlig ? "koble" : "memory";
    const typer = ["begrep", "person", "hendelse"].filter(t => DATA.par.some(p => p.type === t));
    const valgt = new Set(typer.filter(t => t !== "hendelse" || typer.length === 1));
    if (!valgt.size) typer.forEach(t => valgt.add(t));
    let antall = 8;
    ramme(spill,
      '<div class="spill-valg"><div class="spill-valggruppe"><span class="etikett">' + T.kategorier + ":</span>" +
      typer.map(t => '<label class="spill-sjekk"><input type="checkbox" data-type="' + t + '"' + (valgt.has(t) ? " checked" : "") + "> " + typeNavn(t) + " (" + DATA.par.filter(p => p.type === t).length + ")</label>").join("") + "</div>" +
      '<div class="spill-valggruppe"><span class="etikett">' + T.antallPar + ':</span>' + [6, 8, 10, 12].map(n => '<button class="knapp liten" data-antall="' + n + '">' + n + "</button>").join("") + "</div></div>" +
      '<div class="spill-status" id="spill-status" aria-live="polite"></div><div class="memorybrett' + (synlig ? " synlig" : "") + '" id="brett"></div><div id="spill-slutt"></div>');
    document.querySelectorAll("[data-type]").forEach(c => c.addEventListener("change", () => {
      if (c.checked) valgt.add(c.dataset.type); else valgt.delete(c.dataset.type);
      if (!valgt.size) { c.checked = true; valgt.add(c.dataset.type); }
      start();
    }));
    document.querySelectorAll("[data-antall]").forEach(b => b.addEventListener("click", () => { antall = +b.dataset.antall; start(); }));

    let S;
    function start() {
      document.querySelectorAll("[data-antall]").forEach(b => b.setAttribute("aria-pressed", String(+b.dataset.antall === antall)));
      const pool = bland(DATA.par.filter(p => valgt.has(p.type)));
      // Unngå to kort med samme tekst (f.eks. to personer med lik rolle)
      const brukt = new Set(), parene = [];
      for (const p of pool) { if (parene.length >= antall) break; if (brukt.has(p.a) || brukt.has(p.b)) continue; brukt.add(p.a); brukt.add(p.b); parene.push(p); }
      const kort = bland(parene.flatMap(p => [{ par: p, side: "a" }, { par: p, side: "b" }]));
      S = { parene: parene, kort: kort, apne: [], funnet: 0, trekk: 0, feil: 0, start: Date.now(), laast: false };
      const brett = $("brett");
      brett.innerHTML = kort.map((k, i) => {
        const p = k.par;
        const tekst = k.side === "a" ? '<strong class="kort-hoved">' + LV.esc(p.a) + "</strong>" + (p.a2 ? '<span class="kort-norsk" lang="nb">(' + LV.esc(p.a2) + ")</span>" : "") : '<span class="kort-forkl">' + LV.esc(p.b) + "</span>";
        return '<button class="mkort type-' + p.type + " side-" + k.side + '" data-i="' + i + '" aria-label="' + (synlig ? "" : "Kort " + (i + 1)) + '">' +
          '<span class="mkort-indre"><span class="mkort-bak" aria-hidden="true"></span><span class="mkort-front"><span class="kort-type">' + typeNavn(p.type) + "</span>" + tekst + "</span></span></button>";
      }).join("");
      brett.querySelectorAll(".mkort").forEach(b => b.addEventListener("click", () => velg(+b.dataset.i)));
      if (synlig) brett.querySelectorAll(".mkort").forEach(b => { b.classList.add("snudd"); b.removeAttribute("aria-label"); });
      $("spill-slutt").innerHTML = "";
      status();
    }
    function status() {
      $("spill-status").innerHTML = '<span>' + T.funnet + ": <strong>" + S.funnet + " / " + S.parene.length + "</strong></span><span>" +
        (synlig ? T.feil + ": <strong>" + S.feil : T.trekk + ": <strong>" + S.trekk) + "</strong></span>";
    }
    function knapp(i) { return $("brett").querySelector('[data-i="' + i + '"]'); }
    function velg(i) {
      if (S.laast) return;
      const b = knapp(i);
      if (b.classList.contains("funnet") || S.apne.includes(i)) {
        if (synlig && S.apne[0] === i) { b.classList.remove("valgt"); S.apne = []; }
        return;
      }
      S.apne.push(i);
      if (synlig) b.classList.add("valgt"); else { b.classList.add("snudd"); b.removeAttribute("aria-label"); }
      if (S.apne.length < 2) return;
      const [x, y] = S.apne, kx = S.kort[x], ky = S.kort[y];
      S.trekk++;
      if (kx.par === ky.par && kx.side !== ky.side) {
        [x, y].forEach(j => { const k = knapp(j); k.classList.remove("valgt"); k.classList.add("funnet"); k.disabled = true; });
        S.apne = []; S.funnet++;
        status();
        if (S.funnet === S.parene.length) ferdig();
      } else {
        S.feil++;
        status();
        S.laast = true;
        [x, y].forEach(j => knapp(j).classList.add("bom"));
        setTimeout(() => {
          [x, y].forEach(j => { const k = knapp(j); k.classList.remove("bom", "valgt"); if (!synlig) { k.classList.remove("snudd"); k.setAttribute("aria-label", "Kort " + (j + 1)); } });
          S.apne = []; S.laast = false;
        }, synlig ? 700 : 1300);
      }
    }
    function ferdig() {
      const brukt = Date.now() - S.start;
      const linje = synlig ? S.parene.length + " par, " + S.feil + " feil, tid " + tid(brukt) : S.parene.length + " par på " + S.trekk + " forsøk, tid " + tid(brukt);
      $("spill-slutt").innerHTML = '<div class="spill-resultat"><h2>' + T.ferdig + ' 🎉</h2><p lang="nb">' + LV.esc(linje) + "</p>" +
        '<div class="spill-knapper"><button class="knapp hoved" id="igjen">' + T.igjen + '</button><button class="knapp" id="kopier">' + T.kopier + '</button><span id="kopistatus" aria-live="polite"></span></div>' +
        "<details><summary>" + T.parene + "</summary><dl class=\"spill-parliste\">" + S.parene.map(p => "<div><dt>" + LV.esc(p.a) + (p.a2 ? " (" + LV.esc(p.a2) + ")" : "") + "</dt><dd>" + LV.esc(p.b) + "</dd></div>").join("") + "</dl></details></div>";
      $("igjen").addEventListener("click", start);
      $("kopier").addEventListener("click", () => kopier(resultatTekst(spill, linje), $("kopistatus")));
      $("spill-slutt").scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
    start();
  }

  // =========================================================
  // GJETT ORDET (hangman)
  // =========================================================
  const ALFABET = { nb: "ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅ", en: "ABCDEFGHIJKLMNOPQRSTUVWXYZ" };
  function grunn(ch) {
    const u = ch.toUpperCase();
    if ("ÆØÅ".includes(u)) return u;
    return u.normalize("NFD").replace(/[̀-ͯ]/g, "");
  }
  const erBokstav = ch => /[A-ZÆØÅ]/.test(grunn(ch));

  function hangman() {
    const alfabet = ALFABET[KILDE.sprak === "en" ? "en" : "nb"];
    const liste = bland(DATA.ord.filter(o => o.ord.length <= 26 && [...o.ord].filter(erBokstav).length >= 3 && (alfabet.length > 26 || !/[æøåÆØÅ]/.test(o.ord))));
    const MAKS = 7;
    let nr = -1, S, poeng = 0, spilt = 0;
    ramme("hangman",
      '<div class="spill-status" id="spill-status" aria-live="polite"></div>' +
      '<div class="hangman"><svg class="hm-tegning" id="hm-tegning" viewBox="0 0 120 130" aria-hidden="true"></svg>' +
      '<div class="hm-hoved"><div class="hm-ord" id="hm-ord" aria-live="polite"></div><p class="hm-hint"><strong>' + T.hint + ":</strong> <span id=\"hm-hint\"></span></p>" +
      '<div class="hm-tilbakemelding" id="hm-tb" aria-live="polite"></div></div></div>' +
      '<div class="hm-tastatur" id="hm-tast">' + [...alfabet].map(b => '<button class="knapp hm-tast" data-b="' + b + '">' + b + "</button>").join("") + "</div>" +
      '<div class="spill-knapper"><button class="knapp" id="hm-kopier">' + T.kopier + '</button><span id="kopistatus" aria-live="polite"></span></div>');
    document.querySelectorAll(".hm-tast").forEach(b => b.addEventListener("click", () => gjett(b.dataset.b)));
    document.addEventListener("keydown", e => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const b = e.key.toUpperCase();
      if (b.length === 1 && alfabet.includes(b)) gjett(b);
      else if (e.key === "Enter" && S && S.slutt) neste();
    });
    $("hm-kopier").addEventListener("click", () => kopier(resultatTekst("hangman", poeng + " av " + spilt + " ord"), $("kopistatus")));
    function neste() {
      nr = (nr + 1) % liste.length;
      const o = liste[nr];
      S = { o: o, gjettet: new Set(), feil: 0, slutt: false };
      $("hm-hint").textContent = o.forklaring;
      $("hm-hint").previousElementSibling.textContent = (o.type === "person" ? T.hintPerson : T.hint) + ":";
      $("hm-tb").innerHTML = "";
      document.querySelectorAll(".hm-tast").forEach(b => { b.disabled = false; b.classList.remove("riktig", "feil"); });
      tegn();
    }
    function tegn() {
      const ordet = S.o.ord;
      $("hm-ord").innerHTML = ordet.split(" ").map(del => '<span class="hm-del">' + [...del].map(ch => {
        if (!erBokstav(ch)) return '<span class="hm-tegn">' + LV.esc(ch) + "</span>";
        const vis = S.slutt || S.gjettet.has(grunn(ch));
        return '<span class="hm-boks' + (S.slutt && !S.gjettet.has(grunn(ch)) ? " mistet" : "") + '">' + (vis ? LV.esc(ch.toUpperCase()) : "") + "</span>";
      }).join("") + "</span>").join("");
      $("spill-status").innerHTML = "<span>" + T.feil + ": <strong>" + S.feil + " / " + MAKS + "</strong></span><span>" + T.poeng + ": <strong>" + poeng + " / " + spilt + "</strong></span>";
      tegnFigur(S.feil);
    }
    function gjett(b) {
      if (!S || S.slutt || S.gjettet.has(b)) return;
      S.gjettet.add(b);
      const knapp = document.querySelector('.hm-tast[data-b="' + b + '"]');
      const treff = [...S.o.ord].some(ch => grunn(ch) === b);
      if (knapp) { knapp.disabled = true; knapp.classList.add(treff ? "riktig" : "feil"); }
      if (!treff) S.feil++;
      const vunnet = [...S.o.ord].filter(erBokstav).every(ch => S.gjettet.has(grunn(ch)));
      if (vunnet || S.feil >= MAKS) {
        S.slutt = true; spilt++; if (vunnet) poeng++;
        $("hm-tb").innerHTML = '<p class="' + (vunnet ? "ok" : "ikke-ok") + '"><strong>' + (vunnet ? T.bra : T.tapt + " " + T.riktigOrd + ": " + LV.esc(S.o.ord)) + "</strong>" +
          (S.o.norsk ? ' <span lang="nb">(' + LV.esc(S.o.norsk) + ")</span>" : "") + "</p>" +
          '<button class="knapp hoved" id="hm-neste">' + T.neste + " →</button>";
        $("hm-neste").addEventListener("click", neste);
        $("hm-neste").focus();
      }
      tegn();
    }
    function tegnFigur(n) {
      // En enkel galge som tegnes del for del (7 deler)
      const deler = [
        '<line x1="10" y1="122" x2="70" y2="122"/>',
        '<line x1="30" y1="122" x2="30" y2="10"/><line x1="30" y1="10" x2="80" y2="10"/>',
        '<line x1="80" y1="10" x2="80" y2="28"/>',
        '<circle cx="80" cy="38" r="10"/>',
        '<line x1="80" y1="48" x2="80" y2="80"/>',
        '<line x1="80" y1="56" x2="66" y2="70"/><line x1="80" y1="56" x2="94" y2="70"/>',
        '<line x1="80" y1="80" x2="68" y2="100"/><line x1="80" y1="80" x2="92" y2="100"/>'
      ];
      $("hm-tegning").innerHTML = '<g class="hm-strek">' + deler.slice(0, n).join("") + "</g>";
    }
    neste();
  }

  // =========================================================
  // ORDSØK
  // =========================================================
  function ordsok() {
    const alfabet = ALFABET[KILDE.sprak === "en" ? "en" : "nb"];
    let visForkl = false, S;
    ramme("ordsok",
      '<div class="spill-valg"><label class="spill-sjekk"><input type="checkbox" id="os-forkl"> ' + T.visForklaring + "</label>" +
      '<button class="knapp liten" id="os-nytt">↻ ' + T.igjen + "</button></div>" +
      '<div class="spill-status" id="spill-status" aria-live="polite"></div>' +
      '<div class="ordsok"><div class="os-rutenett" id="os-nett" role="grid"></div><div class="os-liste"><h2>' + T.ordliste + '</h2><ul id="os-ord"></ul></div></div><div id="spill-slutt"></div>');
    $("os-forkl").addEventListener("change", e => { visForkl = e.target.checked; liste(); });
    $("os-nytt").addEventListener("click", start);

    function rens(o) { return [...o].filter(erBokstav).map(grunn).join(""); }
    function start() {
      const medRent = o => Object.assign({}, o, { rent: rens(o.sok || o.ord) });
      const passer = o => o.rent.length >= 3 && o.rent.length <= 12 && [...o.rent].every(b => alfabet.includes(b));
      const kandidater = bland(DATA.ord.filter(o => o.type === "begrep").map(medRent).filter(passer)).concat(bland(DATA.ord.filter(o => o.type === "person").map(medRent).filter(passer)));
      const unike = []; const sett = new Set();
      kandidater.forEach(o => { if (!sett.has(o.rent) && unike.length < 10) { sett.add(o.rent); unike.push(o); } });
      const n = Math.max(10, Math.min(13, Math.max(...unike.map(o => o.rent.length)) + 1));
      const retninger = [[0, 1], [1, 0], [1, 1], [-1, 1], [0, -1], [-1, 0]];
      const nett = Array.from({ length: n }, () => Array(n).fill(""));
      const plassert = [];
      unike.sort((a, b) => b.rent.length - a.rent.length).forEach(o => {
        for (let forsok = 0; forsok < 200; forsok++) {
          const [dr, dc] = retninger[Math.floor(Math.random() * (forsok < 120 ? 3 : retninger.length))];
          const L = o.rent.length;
          const r0 = Math.floor(Math.random() * n), c0 = Math.floor(Math.random() * n);
          const r1 = r0 + dr * (L - 1), c1 = c0 + dc * (L - 1);
          if (r1 < 0 || r1 >= n || c1 < 0 || c1 >= n) continue;
          let ok = true;
          for (let i = 0; i < L; i++) { const cel = nett[r0 + dr * i][c0 + dc * i]; if (cel && cel !== o.rent[i]) { ok = false; break; } }
          if (!ok) continue;
          for (let i = 0; i < L; i++) nett[r0 + dr * i][c0 + dc * i] = o.rent[i];
          plassert.push(Object.assign(o, { r0: r0, c0: c0, r1: r1, c1: c1, funnet: false }));
          return;
        }
      });
      for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (!nett[r][c]) nett[r][c] = alfabet[Math.floor(Math.random() * alfabet.length)];
      S = { n: n, nett: nett, ord: plassert, start: null, startTid: Date.now() };
      const el = $("os-nett");
      el.style.setProperty("--n", n);
      el.innerHTML = nett.map((rad, r) => '<div class="os-rad" role="row">' + rad.map((b, c) => '<button class="os-celle" role="gridcell" data-r="' + r + '" data-c="' + c + '">' + b + "</button>").join("") + "</div>").join("");
      el.querySelectorAll(".os-celle").forEach(b => {
        b.addEventListener("pointerdown", e => { e.preventDefault(); trykk(+b.dataset.r, +b.dataset.c, "ned"); });
        b.addEventListener("click", e => { if (e.detail === 0) trykk(+b.dataset.r, +b.dataset.c, "klikk"); });
      });
      el.onpointerup = e => {
        const m = document.elementFromPoint(e.clientX, e.clientY);
        const b = m && m.closest(".os-celle");
        if (b) trykk(+b.dataset.r, +b.dataset.c, "opp");
      };
      $("spill-slutt").innerHTML = "";
      liste(); status();
    }
    function celle(r, c) { return $("os-nett").querySelector('[data-r="' + r + '"][data-c="' + c + '"]'); }
    function trykk(r, c, hva) {
      if (hva === "ned" || hva === "klikk") {
        if (S.start && (S.start[0] !== r || S.start[1] !== c)) { return sjekk(S.start, [r, c]); }
        if (S.start && S.start[0] === r && S.start[1] === c && hva === "klikk") { celle(r, c).classList.remove("start"); S.start = null; return; }
        if (!S.start) { S.start = [r, c]; S.nyStart = hva === "ned"; celle(r, c).classList.add("start"); }
        return;
      }
      if (hva === "opp" && S.start) {
        if (S.start[0] === r && S.start[1] === c) return; // ett klikk: vent på neste
        sjekk(S.start, [r, c]);
      }
    }
    function sjekk(a, b) {
      celle(a[0], a[1]).classList.remove("start");
      S.start = null;
      const dr = Math.sign(b[0] - a[0]), dc = Math.sign(b[1] - a[1]);
      const lengde = Math.max(Math.abs(b[0] - a[0]), Math.abs(b[1] - a[1])) + 1;
      if (!(a[0] === b[0] || a[1] === b[1] || Math.abs(b[0] - a[0]) === Math.abs(b[1] - a[1]))) return blinkFeil(a, b);
      const o = S.ord.find(o => !o.funnet && ((o.r0 === a[0] && o.c0 === a[1] && o.r1 === b[0] && o.c1 === b[1]) || (o.r1 === a[0] && o.c1 === a[1] && o.r0 === b[0] && o.c0 === b[1])));
      if (!o) return blinkFeil(a, b);
      o.funnet = true;
      for (let i = 0; i < lengde; i++) celle(a[0] + dr * i, a[1] + dc * i).classList.add("funnet");
      liste(); status();
      if (S.ord.every(x => x.funnet)) {
        const linje = S.ord.length + " ord funnet, tid " + tid(Date.now() - S.startTid) + (visForkl ? " (med forklaringer)" : "");
        $("spill-slutt").innerHTML = '<div class="spill-resultat"><h2>' + T.ferdig + ' 🎉</h2><p lang="nb">' + LV.esc(linje) + '</p><div class="spill-knapper"><button class="knapp hoved" id="igjen">' + T.igjen +
          '</button><button class="knapp" id="kopier">' + T.kopier + '</button><span id="kopistatus" aria-live="polite"></span></div></div>';
        $("igjen").addEventListener("click", start);
        $("kopier").addEventListener("click", () => kopier(resultatTekst("ordsok", linje), $("kopistatus")));
      }
    }
    function blinkFeil(a, b) {
      [a, b].forEach(p => { const e = celle(p[0], p[1]); e.classList.add("bom"); setTimeout(() => e.classList.remove("bom"), 500); });
    }
    function liste() {
      $("os-ord").innerHTML = S.ord.map(o => '<li class="' + (o.funnet ? "funnet" : "") + '">' +
        (o.funnet || !visForkl ? "<strong>" + LV.esc(o.sok || o.ord) + "</strong>" + (o.sok && o.sok !== o.ord ? " (" + LV.esc(o.ord) + ")" : "") + (o.norsk ? ' <span lang="nb">(' + LV.esc(o.norsk) + ")</span>" : "") : "") +
        (visForkl || o.funnet ? '<span class="os-forkl">' + LV.esc(forkort(o.forklaring, 110)) + "</span>" : "") + "</li>").join("");
    }
    function status() {
      $("spill-status").innerHTML = "<span>" + T.funnet + ": <strong>" + S.ord.filter(o => o.funnet).length + " / " + S.ord.length + "</strong></span>" +
        '<span class="os-tips" lang="nb">Trykk på første og siste bokstav i ordet, eller dra over ordet.</span>';
    }
    start();
  }

  // =========================================================
  // TIDSLINJE – sett i rekkefølge
  // =========================================================
  function rekkefolge() {
    let S;
    ramme("rekkefolge",
      '<div class="spill-status" id="spill-status" aria-live="polite"></div><p class="rf-retning"><span>↑ ' + T.eldst + "</span></p>" +
      '<ol class="rf-liste" id="rf-liste"></ol><p class="rf-retning"><span>↓ ' + T.nyest + "</span></p>" +
      '<div class="spill-knapper"><button class="knapp hoved" id="rf-sjekk">' + T.sjekk + '</button><button class="knapp" id="rf-ny">↻ ' + T.igjen +
      '</button><button class="knapp" id="rf-kopier">' + T.kopier + '</button><span id="kopistatus" aria-live="polite"></span></div><div id="spill-slutt"></div>');
    let runder = 0, sisteLinje = "";
    $("rf-sjekk").addEventListener("click", sjekk);
    $("rf-ny").addEventListener("click", start);
    $("rf-kopier").addEventListener("click", () => kopier(resultatTekst("rekkefolge", sisteLinje || "ikke sjekket ennå"), $("kopistatus")));
    function start() {
      const unike = []; const nokler = new Set();
      bland(DATA.hendelser.filter(h => h.nokkel != null)).forEach(h => { if (unike.length < 6 && !nokler.has(h.nokkel)) { nokler.add(h.nokkel); unike.push(h); } });
      S = { liste: bland(unike), sjekket: false, forsok: 0 };
      tegn();
      $("spill-slutt").innerHTML = "";
      $("spill-status").innerHTML = "<span lang=\"nb\">Flytt hendelsene med pilene (eller dra dem) til de står i riktig rekkefølge. Trykk så «" + T.sjekk + "».</span>";
    }
    function tegn(fasit) {
      const riktig = S.liste.slice().sort((a, b) => a.nokkel - b.nokkel);
      $("rf-liste").innerHTML = S.liste.map((h, i) => {
        const ok = fasit && riktig[i] === h;
        return '<li class="rf-kort' + (fasit ? (ok ? " ok" : " ikke-ok") : "") + '" draggable="true" data-i="' + i + '">' +
          '<span class="rf-tekst">' + (fasit ? '<strong class="rf-dato">' + LV.esc(h.dato) + "</strong> " : "") + LV.esc(h.tekst) +
          (KILDE.blandet ? '<small class="rf-tema">' + LV.esc(h.tema) + "</small>" : "") + "</span>" +
          '<span class="rf-piler"><button class="knapp liten" data-opp="' + i + '" aria-label="' + T.opp + '"' + (i === 0 ? " disabled" : "") + ">↑</button>" +
          '<button class="knapp liten" data-ned="' + i + '" aria-label="' + T.ned + '"' + (i === S.liste.length - 1 ? " disabled" : "") + ">↓</button></span></li>";
      }).join("");
      document.querySelectorAll("[data-opp]").forEach(b => b.addEventListener("click", () => flytt(+b.dataset.opp, -1)));
      document.querySelectorAll("[data-ned]").forEach(b => b.addEventListener("click", () => flytt(+b.dataset.ned, 1)));
      let dra = null;
      document.querySelectorAll(".rf-kort").forEach(li => {
        li.addEventListener("dragstart", () => { dra = +li.dataset.i; li.classList.add("drar"); });
        li.addEventListener("dragend", () => li.classList.remove("drar"));
        li.addEventListener("dragover", e => e.preventDefault());
        li.addEventListener("drop", e => {
          e.preventDefault();
          const til = +li.dataset.i;
          if (dra == null || dra === til) return;
          const [h] = S.liste.splice(dra, 1); S.liste.splice(til, 0, h); dra = null; tegn();
        });
      });
    }
    function flytt(i, d) {
      const j = i + d; if (j < 0 || j >= S.liste.length) return;
      [S.liste[i], S.liste[j]] = [S.liste[j], S.liste[i]];
      tegn();
      const knapp = document.querySelector((d < 0 ? "[data-opp=\"" : "[data-ned=\"") + j + "\"]");
      if (knapp && !knapp.disabled) knapp.focus();
    }
    function sjekk() {
      S.forsok++;
      const riktig = S.liste.slice().sort((a, b) => a.nokkel - b.nokkel);
      const antall = S.liste.filter((h, i) => riktig[i] === h).length;
      tegn(true);
      sisteLinje = antall + " av " + S.liste.length + " " + TEKST.nb.riktigePlass + " (forsøk " + S.forsok + ")";
      $("spill-slutt").innerHTML = '<div class="spill-resultat"><h2>' + (antall === S.liste.length ? T.alleRiktig : antall + " / " + S.liste.length + " " + T.riktigePlass) + "</h2>" +
        (antall === S.liste.length ? "" : '<p lang="nb">De grønne står riktig. Flytt de røde og sjekk igjen!</p>') + "</div>";
      runder++;
    }
    start();
  }

  // =========================================================
  // Felles for Ordle og Ordmiks: enkeltord fra temaet
  // =========================================================
  function enkeltord(minL, maksL, medNavn) {
    const alfabet = ALFABET[KILDE.sprak === "en" ? "en" : "nb"];
    const ok = w => w.length >= minL && w.length <= maksL && [...w].every(b => alfabet.includes(b));
    const ut = [], sett = new Set();
    DATA.ord.forEach(o => {
      const ordet = o.type === "person" ? (medNavn ? o.sok : null) : o.ord;
      if (!ordet || /[\s\-.'’]/.test(ordet)) return;
      const w = [...ordet].map(grunn).join("");
      if (!ok(w) || sett.has(w)) return;
      sett.add(w);
      ut.push({ w: w, vis: ordet, forklaring: o.forklaring, norsk: o.norsk, type: o.type, navn: o.ord });
    });
    return ut;
  }

  // =========================================================
  // ORDLE (som Wordle)
  // =========================================================
  function ordle() {
    const en = KILDE.sprak === "en";
    const alfabet = ALFABET[en ? "en" : "nb"];
    const FORSOK = 6;
    let liste = bland(enkeltord(4, 9, false));
    if (liste.length < 3) liste = liste.concat(bland(enkeltord(4, 9, true).filter(x => x.type === "person")));
    let nr = -1, S, alleOrd = false, vunnet = 0, spilt = 0;
    const tastRader = en ? ["QWERTYUIOP", "ASDFGHJKL", "↵ZXCVBNM⌫"] : ["QWERTYUIOPÅ", "ASDFGHJKLØÆ", "↵ZXCVBNM⌫"];
    const tx = en ?
      { ukjent: "is not in the dictionary. Try another word.", forKort: "Too short", hint: "Show the explanation (hint)", ordet: "The word was", neste: "Next word", gjettet: "You got it in", av: "of", forsok: "tries" } :
      { ukjent: "står ikke i ordboka. Prøv et annet ord.", forKort: "For kort ord", hint: "Vis forklaringen (hint)", ordet: "Ordet var", neste: "Neste ord", gjettet: "Du klarte det på", av: "av", forsok: "forsøk" };
    ramme("ordle",
      '<div class="spill-valg"><label class="spill-sjekk" lang="nb"><input type="checkbox" id="ol-alle"> Godta alle ord (ikke sjekk mot ordboka)</label></div>' +
      '<div class="spill-status" id="spill-status" aria-live="polite"></div>' +
      '<div class="ordle"><div class="ol-brett" id="ol-brett" aria-live="off"></div><div class="ol-melding" id="ol-melding" role="status" aria-live="polite"></div>' +
      '<details class="ol-hint" id="ol-hint"><summary>' + tx.hint + '</summary><p id="ol-hinttekst"></p></details>' +
      '<div class="ol-tastatur" id="ol-tast">' + tastRader.map(r => '<div class="ol-rad">' + [...r].map(b =>
        '<button type="button" class="ol-tast' + (b === "↵" || b === "⌫" ? " bred" : "") + '" data-t="' + b + '" aria-label="' + (b === "↵" ? (en ? "Enter" : "Gjett") : b === "⌫" ? (en ? "Delete" : "Slett") : b) + '">' + (b === "↵" ? (en ? "ENTER" : "GJETT") : b) + "</button>").join("") + "</div>").join("") + "</div>" +
      '<div id="spill-slutt"></div></div>');
    $("ol-alle").addEventListener("change", e => { alleOrd = e.target.checked; });
    document.querySelectorAll(".ol-tast").forEach(b => b.addEventListener("click", () => trykk(b.dataset.t)));
    document.addEventListener("keydown", e => {
      if (e.ctrlKey || e.metaKey || e.altKey || e.target.closest("input, textarea, select")) return;
      if (e.key === "Enter") { e.preventDefault(); trykk("↵"); }
      else if (e.key === "Backspace") trykk("⌫");
      else if (e.key.length === 1 && alfabet.includes(e.key.toUpperCase())) trykk(e.key.toUpperCase());
    });

    function neste() {
      nr = (nr + 1) % liste.length;
      const o = liste[nr];
      S = { o: o, rader: [], na: "", ferdig: false, tastfarge: {}, sjekker: false };
      $("ol-hinttekst").textContent = o.forklaring;
      $("ol-hint").open = false;
      $("spill-slutt").innerHTML = ""; melding("");
      document.querySelectorAll(".ol-tast").forEach(b => b.classList.remove("riktig", "finnes", "ikke"));
      tegn(); status();
    }
    function status() {
      $("spill-status").innerHTML = "<span>" + (en ? "Letters" : "Bokstaver") + ": <strong>" + S.o.w.length + "</strong></span><span>" + (en ? "Solved" : "Riktige ord") + ": <strong>" + vunnet + " / " + spilt + "</strong></span>";
    }
    function melding(t, varig) {
      $("ol-melding").textContent = t;
      if (t && !varig) setTimeout(() => { if ($("ol-melding") && $("ol-melding").textContent === t) $("ol-melding").textContent = ""; }, 2600);
    }
    function vurder(gjett, fasit) {
      const res = Array(fasit.length).fill("ikke"), rest = {};
      [...fasit].forEach((b, i) => { if (gjett[i] === b) res[i] = "riktig"; else rest[b] = (rest[b] || 0) + 1; });
      [...gjett].forEach((b, i) => { if (res[i] !== "riktig" && rest[b]) { res[i] = "finnes"; rest[b]--; } });
      return res;
    }
    function tegn(animer) {
      const L = S.o.w.length;
      $("ol-brett").style.setProperty("--l", L);
      const navn = { riktig: en ? "correct" : "riktig plass", finnes: en ? "wrong place" : "feil plass", ikke: en ? "not in the word" : "ikke i ordet" };
      let h = "";
      for (let r = 0; r < FORSOK; r++) {
        const rad = S.rader[r], aktiv = r === S.rader.length && !S.ferdig;
        h += '<div class="ol-rad-brett' + (aktiv ? " aktiv" : "") + '" role="group" aria-label="' + (en ? "Guess " : "Forsøk ") + (r + 1) + '">';
        for (let i = 0; i < L; i++) {
          const b = rad ? rad.ord[i] : aktiv ? (S.na[i] || "") : "";
          const kl = rad ? rad.res[i] : b ? "fylt" : "";
          h += '<span class="ol-rute ' + kl + (animer && r === S.rader.length - 1 ? " snu" : "") + '" style="--i:' + i + '"' + (rad ? ' aria-label="' + b + ": " + navn[rad.res[i]] + '"' : "") + ">" + b + "</span>";
        }
        h += "</div>";
      }
      $("ol-brett").innerHTML = h;
    }
    async function trykk(t) {
      if (!S || S.ferdig || S.sjekker) { if (S && S.ferdig && t === "↵") neste(); return; }
      const L = S.o.w.length;
      if (t === "⌫") { S.na = S.na.slice(0, -1); return tegn(); }
      if (t !== "↵") { if (S.na.length < L) { S.na += t; tegn(); } return; }
      if (S.na.length < L) { melding(tx.forKort); rist(); return; }
      const gjett = S.na;
      if (!alleOrd && gjett !== S.o.w && !liste.some(x => x.w === gjett) && LV.ordbok) {
        S.sjekker = true;
        let finnes = true;
        try { finnes = await LV.ordbok.erOrd(gjett.toLowerCase(), en ? "en" : "no"); } catch (e) { finnes = true; }
        S.sjekker = false;
        if (!finnes) { melding("«" + gjett + "» " + tx.ukjent); rist(); return; }
      }
      const res = vurder(gjett, S.o.w);
      S.rader.push({ ord: gjett, res: res });
      S.na = "";
      const rang = { ikke: 1, finnes: 2, riktig: 3 };
      [...gjett].forEach((b, i) => { if (!S.tastfarge[b] || rang[res[i]] > rang[S.tastfarge[b]]) S.tastfarge[b] = res[i]; });
      document.querySelectorAll(".ol-tast").forEach(k => { k.classList.remove("riktig", "finnes", "ikke"); if (S.tastfarge[k.dataset.t]) k.classList.add(S.tastfarge[k.dataset.t]); });
      const vant = gjett === S.o.w;
      if (vant || S.rader.length >= FORSOK) {
        S.ferdig = true; spilt++; if (vant) vunnet++;
        tegn(true); status(); slutt(vant);
      } else tegn(true);
    }
    function rist() {
      const rad = document.querySelector(".ol-rad-brett.aktiv");
      if (rad) { rad.classList.remove("rist"); void rad.offsetWidth; rad.classList.add("rist"); }
    }
    function slutt(vant) {
      const ruter = S.rader.map(r => r.res.map(x => x === "riktig" ? "🟩" : x === "finnes" ? "🟨" : "⬜").join("")).join("\n");
      const linje = (vant ? S.rader.length : "X") + "/" + FORSOK;
      $("spill-slutt").innerHTML = '<div class="spill-resultat"><h2>' + (vant ? T.bra + " 🎉" : T.tapt) + "</h2>" +
        "<p>" + (vant ? tx.gjettet + " " + S.rader.length + " " + tx.forsok + "." : tx.ordet + ": <strong>" + LV.esc(S.o.vis) + "</strong>") + "</p>" +
        '<p class="ol-forklaring"><strong>' + LV.esc(S.o.vis) + "</strong>" + (S.o.norsk ? ' <span lang="nb">(' + LV.esc(S.o.norsk) + ")</span>" : "") + ": " + LV.esc(S.o.forklaring) + "</p>" +
        '<div class="spill-knapper"><button class="knapp hoved" id="ol-neste">' + tx.neste + ' →</button><button class="knapp" id="kopier">' + T.kopier + '</button><span id="kopistatus" aria-live="polite"></span></div></div>';
      $("ol-neste").addEventListener("click", neste);
      $("kopier").addEventListener("click", () => kopier(resultatTekst("ordle", linje + " (" + S.o.vis + ")\n" + ruter + "\nTotalt: " + vunnet + " av " + spilt + " ord"), $("kopistatus")));
      $("ol-neste").focus({ preventScroll: true });
    }
    neste();
  }

  // =========================================================
  // ORDMIKS (som Smartle): bytt bokstaver til hver rad blir et ord
  // =========================================================
  function ordmiks() {
    const en = KILDE.sprak === "en";
    const tx = en ?
      { tips: "Tap two letters to swap them – or drag one letter onto another. Each row must become one of the words. The explanations below are your clues.", hint: "Hint: place a letter", bytter: "Swaps", ord: "Words", hintBrukt: "Hints", ledetrader: "Clues", ny: "New puzzle", valgt: "selected" } :
      { tips: "Trykk på to bokstaver for å bytte dem – eller dra en bokstav over en annen. Hver rad skal bli ett av ordene. Forklaringene under er ledetrådene dine.", hint: "Hint: sett en bokstav på plass", bytter: "Bytter", ord: "Ord", hintBrukt: "Hint", ledetrader: "Ledetråder", ny: "Ny oppgave", valgt: "valgt" };
    let S;
    ramme("ordmiks",
      '<p class="om-tips">' + tx.tips + "</p>" +
      '<div class="spill-status" id="spill-status" aria-live="polite"></div>' +
      '<div class="ordmiks"><div class="om-brett" id="om-brett"></div><div class="om-side"><h2>' + tx.ledetrader + '</h2><ol class="om-ledetrader" id="om-led"></ol>' +
      '<div class="spill-knapper"><button class="knapp" id="om-hint">💡 ' + tx.hint + '</button><button class="knapp" id="om-ny">↻ ' + tx.ny + "</button></div></div></div><div id=\"spill-slutt\"></div>");
    $("om-hint").addEventListener("click", hint);
    $("om-ny").addEventListener("click", start);

    function start() {
      // Velg 4–5 ord, gjerne med samme lengde, maks 8 bokstaver
      let pool = bland(enkeltord(3, 10, false));
      if (pool.length < 4) pool = pool.concat(bland(enkeltord(4, 10, true).filter(x => x.type === "person")));
      const ordene = pool.slice(0, Math.min(5, pool.length)).sort((a, b) => a.w.length - b.w.length);
      const rader = ordene.map(o => o.w.length);
      let bokstaver;
      for (let f = 0; f < 50; f++) {
        bokstaver = bland(ordene.flatMap(o => [...o.w]));
        if (!radTekster(bokstaver, rader).some((t, r) => ordene.some(o => o.w === t))) break;
      }
      S = { ordene: ordene, rader: rader, b: bokstaver, laast: new Set(), valgt: null, bytter: 0, hint: 0, losning: new Array(rader.length).fill(null), start: Date.now(), ferdig: false };
      $("spill-slutt").innerHTML = "";
      sjekk(); tegn();
    }
    function radTekster(b, rader) {
      const ut = []; let i = 0;
      rader.forEach(L => { ut.push(b.slice(i, i + L).join("")); i += L; });
      return ut;
    }
    function radStart(r) { return S.rader.slice(0, r).reduce((a, b) => a + b, 0); }
    // Hvilke rader er løst? Hver rad må bli et ulikt ord med riktig lengde.
    function sjekk() {
      const tekster = radTekster(S.b, S.rader);
      const brukt = new Set();
      S.losning = tekster.map(t => {
        const o = S.ordene.findIndex((x, i) => !brukt.has(i) && x.w === t);
        if (o >= 0) { brukt.add(o); return o; }
        return null;
      });
    }
    function tegn() {
      let h = "", i = 0;
      S.rader.forEach((L, r) => {
        const lost = S.losning[r] != null;
        h += '<div class="om-rad' + (lost ? " lost" : "") + '" role="group" aria-label="' + (en ? "Row " : "Rad ") + (r + 1) + (lost ? " – " + S.ordene[S.losning[r]].vis : "") + '">';
        for (let k = 0; k < L; k++, i++) {
          h += '<button type="button" class="om-flis' + (S.valgt === i ? " valgt" : "") + (S.laast.has(i) ? " laast" : "") + '" data-i="' + i + '"' +
            (S.laast.has(i) || S.ferdig ? " disabled" : "") + ' aria-label="' + S.b[i] + (S.valgt === i ? ", " + tx.valgt : "") + '">' + S.b[i] + "</button>";
        }
        h += "</div>";
      });
      $("om-brett").innerHTML = h;
      $("om-led").innerHTML = S.ordene.map((o, oi) => {
        const lost = S.losning.includes(oi);
        return '<li class="' + (lost ? "lost" : "") + '"><span class="om-lengde">' + o.w.length + (en ? " letters" : " bokstaver") + (o.type === "person" ? (en ? " · surname" : " · etternavn") : "") + "</span>" +
          (lost ? "<strong>" + LV.esc(o.vis) + "</strong>" + (o.norsk ? ' <span lang="nb">(' + LV.esc(o.norsk) + ")</span>" : "") + " – " : "") + LV.esc(forkort(o.forklaring, 140)) + "</li>";
      }).join("");
      $("spill-status").innerHTML = "<span>" + tx.ord + ": <strong>" + S.losning.filter(x => x != null).length + " / " + S.ordene.length + "</strong></span><span>" + tx.bytter + ": <strong>" + S.bytter + "</strong></span>" +
        (S.hint ? "<span>" + tx.hintBrukt + ": <strong>" + S.hint + "</strong></span>" : "");
      $("om-brett").querySelectorAll(".om-flis").forEach(b => {
        b.addEventListener("click", () => velg(+b.dataset.i));
        b.addEventListener("pointerdown", e => { if (e.pointerType !== "mouse" || e.button === 0) dra = { fra: +b.dataset.i, x: e.clientX, y: e.clientY, flyttet: false }; });
      });
    }
    // Dra og slipp med pekeren (mus og berøring)
    let dra = null;
    document.addEventListener("pointermove", e => { if (dra && Math.hypot(e.clientX - dra.x, e.clientY - dra.y) > 8) dra.flyttet = true; });
    document.addEventListener("pointerup", e => {
      if (!dra) return;
      const d = dra; dra = null;
      if (!d.flyttet) return;
      const m = document.elementFromPoint(e.clientX, e.clientY);
      const b = m && m.closest(".om-flis");
      if (b && +b.dataset.i !== d.fra && !b.disabled) { S.valgt = null; bytt(d.fra, +b.dataset.i); }
      sperrKlikk = true; setTimeout(() => { sperrKlikk = false; }, 50);
    });
    let sperrKlikk = false;
    function velg(i) {
      if (sperrKlikk || S.ferdig || S.laast.has(i)) return;
      if (S.valgt == null) { S.valgt = i; tegn(); fokus(i); return; }
      if (S.valgt === i) { S.valgt = null; tegn(); fokus(i); return; }
      const a = S.valgt; S.valgt = null; bytt(a, i); fokus(i);
    }
    function fokus(i) { const b = $("om-brett").querySelector('[data-i="' + i + '"]'); if (b && !b.disabled) b.focus({ preventScroll: true }); }
    function bytt(a, b) {
      if (S.laast.has(a) || S.laast.has(b)) return;
      if (S.b[a] !== S.b[b]) S.bytter++;
      [S.b[a], S.b[b]] = [S.b[b], S.b[a]];
      sjekk(); tegn();
      if (S.losning.every(x => x != null)) ferdig();
    }
    function hint() {
      if (S.ferdig) return;
      // Finn en rad som ikke er løst, og ordet som passer best (samme lengde, ikke brukt)
      const brukt = new Set(S.losning.filter(x => x != null));
      for (let r = 0; r < S.rader.length; r++) {
        if (S.losning[r] != null) continue;
        const start = radStart(r), L = S.rader[r];
        const oi = S.ordene.findIndex((o, k) => !brukt.has(k) && o.w.length === L && ![...Array(L).keys()].some(j => S.laast.has(start + j) && S.b[start + j] !== o.w[j]));
        if (oi < 0) continue;
        const o = S.ordene[oi];
        for (let j = 0; j < L; j++) {
          const p = start + j;
          if (S.laast.has(p) || S.b[p] === o.w[j]) { if (S.b[p] === o.w[j]) S.laast.add(p); continue; }
          // finn bokstaven et sted som ikke er låst og ikke i en løst rad
          const losteRuter = new Set();
          S.losning.forEach((x, rr) => { if (x != null) for (let q = 0; q < S.rader[rr]; q++) losteRuter.add(radStart(rr) + q); });
          let fra = S.b.findIndex((ch, q) => ch === o.w[j] && !S.laast.has(q) && !losteRuter.has(q) && q !== p);
          if (fra < 0) fra = S.b.findIndex((ch, q) => ch === o.w[j] && !S.laast.has(q) && q !== p);
          if (fra < 0) continue;
          [S.b[p], S.b[fra]] = [S.b[fra], S.b[p]];
          S.laast.add(p); S.hint++; S.valgt = null;
          sjekk(); tegn();
          if (S.losning.every(x => x != null)) ferdig();
          return;
        }
      }
    }
    function ferdig() {
      S.ferdig = true; tegn();
      const linje = S.ordene.length + " ord, " + S.bytter + " bytter" + (S.hint ? ", " + S.hint + " hint" : "") + ", tid " + tid(Date.now() - S.start) + " (" + S.ordene.map(o => o.vis).join(", ") + ")";
      $("spill-slutt").innerHTML = '<div class="spill-resultat"><h2>' + T.ferdig + ' 🎉</h2><p lang="nb">' + LV.esc(linje) + '</p><div class="spill-knapper"><button class="knapp hoved" id="igjen">' + tx.ny +
        '</button><button class="knapp" id="kopier">' + T.kopier + '</button><span id="kopistatus" aria-live="polite"></span></div></div>';
      $("igjen").addEventListener("click", start);
      $("kopier").addEventListener("click", () => kopier(resultatTekst("ordmiks", linje), $("kopistatus")));
    }
    start();
  }

  // =========================================================
  // KRYSSORD
  // =========================================================
  function kryssord() {
    const en = KILDE.sprak === "en";
    const alfabet = ALFABET[en ? "en" : "nb"];
    const tx = en ?
      { vannrett: "Across", loddrett: "Down", sjekk: "Check", bokstav: "Reveal letter", ordet: "Reveal word", fasit: "Show answers", ny: "New crossword",
        tips: "Click a square or a clue and type. Click the same square again to switch between across and down.", feil: "wrong letters", riktig: "All correct!", ord: "words", toOrd: "words", etternavn: "surname" } :
      { vannrett: "Vannrett", loddrett: "Loddrett", sjekk: "Sjekk", bokstav: "Vis bokstav", ordet: "Vis ordet", fasit: "Vis fasit", ny: "Nytt kryssord",
        tips: "Trykk på en rute eller en ledetråd og skriv. Trykk på samme rute en gang til for å bytte mellom vannrett og loddrett.", feil: "feil bokstaver", riktig: "Alt riktig!", ord: "ord", toOrd: "ord", etternavn: "etternavn" };
    let K, retning = "v", aktiv = null, start = 0, hjelp = 0;
    ramme("kryssord",
      '<p class="om-tips">' + tx.tips + "</p>" +
      '<div class="spill-knapper"><button class="knapp" id="ko-sjekk">✓ ' + tx.sjekk + '</button><button class="knapp" id="ko-bokstav">' + tx.bokstav + '</button><button class="knapp" id="ko-ordet">' + tx.ordet +
      '</button><button class="knapp" id="ko-fasit">' + tx.fasit + '</button><button class="knapp" id="ko-ny">↻ ' + tx.ny + "</button></div>" +
      '<div class="spill-status" id="spill-status" aria-live="polite"></div><p class="ko-aktiv" id="ko-aktiv" aria-live="polite"></p>' +
      '<div class="kryssord"><div class="ko-nett" id="ko-nett"></div><div class="ko-ledetrader" id="ko-led"></div></div><div id="spill-slutt"></div>');

    // Ordene: begreper (uten mellomrom/bindestrek i fasiten) og etternavn
    function kandidater() {
      const ut = [], sett = new Set();
      DATA.ord.forEach(o => {
        const vis = o.type === "person" ? o.sok : o.ord;
        const w = [...vis].filter(erBokstav).map(grunn).join("");
        if (w.length < 3 || w.length > 13 || sett.has(w) || ![...w].every(b => alfabet.includes(b))) return;
        sett.add(w);
        const deler = vis.trim().split(/[\s-]+/).filter(Boolean).length;
        ut.push({ w: w, vis: vis, type: o.type, norsk: o.norsk,
          ledetrad: forkort(o.forklaring, 150) + (o.type === "person" ? " (" + tx.etternavn + ")" : "") + (deler > 1 ? " (" + deler + " " + tx.toOrd + ")" : "") });
      });
      return ut;
    }
    // Lag et kryssord: legg ordene inn ett og ett der de krysser flest bokstaver
    function lag(ordene) {
      const rute = new Map(), plassert = [];
      const nok = (r, c) => r + "," + c;
      const kan = (w, r, c, d) => {
        const [dr, dc] = d === "v" ? [0, 1] : [1, 0];
        let kryss = 0;
        if (rute.has(nok(r - dr, c - dc)) || rute.has(nok(r + dr * w.length, c + dc * w.length))) return -1;
        for (let i = 0; i < w.length; i++) {
          const rr = r + dr * i, cc = c + dc * i, her = rute.get(nok(rr, cc));
          if (her) { if (her.b !== w[i] || her[d]) return -1; kryss++; continue; }
          // ingen naboer på sidene der ordet ikke krysser
          if (rute.has(nok(rr + dc, cc + dr)) || rute.has(nok(rr - dc, cc - dr))) return -1;
        }
        return kryss;
      };
      const legg = (o, r, c, d) => {
        const [dr, dc] = d === "v" ? [0, 1] : [1, 0];
        for (let i = 0; i < o.w.length; i++) {
          const k = nok(r + dr * i, c + dc * i);
          const x = rute.get(k) || { b: o.w[i] };
          x[d] = true; rute.set(k, x);
        }
        plassert.push(Object.assign({}, o, { r: r, c: c, d: d }));
      };
      legg(ordene[0], 0, 0, "v");
      for (const o of ordene.slice(1)) {
        if (plassert.length >= 12) break;
        let best = null;
        for (const [k, x] of rute) {
          const [r0, c0] = k.split(",").map(Number);
          for (let i = 0; i < o.w.length; i++) {
            if (o.w[i] !== x.b) continue;
            for (const d of ["v", "l"]) {
              if (x[d]) continue;
              const r = d === "v" ? r0 : r0 - i, c = d === "v" ? c0 - i : c0;
              const kryss = kan(o.w, r, c, d);
              if (kryss > 0) {
                const p = kryss * 10 + Math.random() * 3;
                if (!best || p > best.p) best = { p: p, r: r, c: c, d: d };
              }
            }
          }
        }
        if (best) legg(o, best.r, best.c, best.d);
      }
      // Normaliser og regn ut størrelse
      const rs = [...rute.keys()].map(k => +k.split(",")[0]), cs = [...rute.keys()].map(k => +k.split(",")[1]);
      const r0 = Math.min(...rs), c0 = Math.min(...cs);
      plassert.forEach(p => { p.r -= r0; p.c -= c0; });
      return { ord: plassert, rader: Math.max(...rs) - r0 + 1, kol: Math.max(...cs) - c0 + 1 };
    }
    function nytt() {
      const alle = kandidater();
      let best = null;
      for (let f = 0; f < 40; f++) {
        const ordene = bland(alle).slice(0, 18).sort((a, b) => b.w.length - a.w.length + (Math.random() - .5) * 4);
        const k = lag(ordene);
        const poeng = k.ord.length * 100 - Math.max(k.rader, k.kol) * 4 - Math.abs(k.rader - k.kol) * 2 - (k.kol > 12 ? (k.kol - 12) * 60 : 0);
        if (k.kol <= 15 && (!best || poeng > best.poeng)) { best = k; best.poeng = poeng; }
      }
      K = best;
      // Nummerering
      const startPos = new Map();
      K.ord.sort((a, b) => a.r - b.r || a.c - b.c);
      let n = 0;
      K.ord.forEach(o => { const k = o.r + "," + o.c; if (!startPos.has(k)) startPos.set(k, ++n); o.nr = startPos.get(k); });
      K.celler = new Map();
      K.ord.forEach((o, oi) => {
        for (let i = 0; i < o.w.length; i++) {
          const r = o.d === "l" ? o.r + i : o.r, c = o.d === "v" ? o.c + i : o.c, k = r + "," + c;
          const x = K.celler.get(k) || { r: r, c: c, b: o.w[i], ord: {} };
          x.ord[o.d] = oi; K.celler.set(k, x);
        }
      });
      K.celler.forEach((x, k) => { x.nr = startPos.get(k) || null; x.svar = ""; x.vist = false; });
      aktiv = null; retning = "v"; start = Date.now(); hjelp = 0;
      $("spill-slutt").innerHTML = "";
      tegn();
    }
    function tegn() {
      const nett = $("ko-nett");
      nett.style.setProperty("--kol", K.kol);
      let h = "";
      for (let r = 0; r < K.rader; r++) for (let c = 0; c < K.kol; c++) {
        const x = K.celler.get(r + "," + c);
        if (!x) { h += '<span class="ko-tom" aria-hidden="true"></span>'; continue; }
        h += '<span class="ko-celle" data-k="' + r + "," + c + '">' + (x.nr ? '<span class="ko-nr" aria-hidden="true">' + x.nr + "</span>" : "") +
          '<input class="ko-inn" data-k="' + r + "," + c + '" maxlength="2" autocomplete="off" autocapitalize="characters" spellcheck="false" aria-label="' +
          (x.nr ? x.nr + " " : "") + (en ? "row " : "rad ") + (r + 1) + (en ? ", column " : ", kolonne ") + (c + 1) + '" value="' + x.svar + '"></span>';
      }
      nett.innerHTML = h;
      const liste = d => K.ord.map((o, oi) => [o, oi]).filter(([o]) => o.d === d).map(([o, oi]) =>
        '<li data-o="' + oi + '"><button type="button" class="ko-led" data-o="' + oi + '"><strong>' + o.nr + ".</strong> " + LV.esc(o.ledetrad) + ' <span class="ko-len">(' + o.w.length + ")</span></button></li>").join("");
      $("ko-led").innerHTML = '<div><h2>' + tx.vannrett + '</h2><ol class="ko-liste">' + liste("v") + "</ol></div><div><h2>" + tx.loddrett + '</h2><ol class="ko-liste">' + liste("l") + "</ol></div>";
      nett.querySelectorAll(".ko-inn").forEach(inp => {
        inp.addEventListener("focus", () => { const k = inp.dataset.k; if (aktiv !== k) { aktiv = k; const x = K.celler.get(k); if (x.ord[retning] == null) retning = retning === "v" ? "l" : "v"; } marker(); });
        inp.addEventListener("click", () => { const x = K.celler.get(inp.dataset.k); if (inp.dataset.klikket && x.ord.v != null && x.ord.l != null) { retning = retning === "v" ? "l" : "v"; marker(); } inp.dataset.klikket = "1"; });
        inp.addEventListener("blur", () => { delete inp.dataset.klikket; });
        inp.addEventListener("input", () => skriv(inp));
        inp.addEventListener("keydown", e => tast(e, inp));
      });
      $("ko-led").querySelectorAll(".ko-led").forEach(b => b.addEventListener("click", () => { const o = K.ord[+b.dataset.o]; retning = o.d; gaTil(o.r + "," + o.c); }));
      status();
    }
    function felt(k) { return $("ko-nett").querySelector('.ko-inn[data-k="' + k + '"]'); }
    function gaTil(k) { const f = felt(k); if (f) { aktiv = k; f.focus(); marker(); } }
    function marker() {
      const x = aktiv && K.celler.get(aktiv);
      document.querySelectorAll(".ko-celle").forEach(c => c.classList.remove("ord", "aktiv"));
      document.querySelectorAll(".ko-liste li").forEach(l => l.classList.remove("aktiv"));
      if (!x) return;
      const oi = x.ord[retning]; const o = K.ord[oi];
      for (let i = 0; i < o.w.length; i++) {
        const k = (o.d === "l" ? o.r + i : o.r) + "," + (o.d === "v" ? o.c + i : o.c);
        const c = document.querySelector('.ko-celle[data-k="' + k + '"]'); if (c) c.classList.add("ord");
      }
      document.querySelector('.ko-celle[data-k="' + aktiv + '"]').classList.add("aktiv");
      const li = document.querySelector('.ko-liste li[data-o="' + oi + '"]'); if (li) li.classList.add("aktiv");
      $("ko-aktiv").innerHTML = "<strong>" + o.nr + " " + (o.d === "v" ? tx.vannrett : tx.loddrett).toLowerCase() + ":</strong> " + LV.esc(o.ledetrad) + " (" + o.w.length + ")";
    }
    function nabo(k, steg) {
      const [r, c] = k.split(",").map(Number);
      const nk = retning === "v" ? r + "," + (c + steg) : (r + steg) + "," + c;
      return K.celler.has(nk) ? nk : null;
    }
    function skriv(inp) {
      const x = K.celler.get(inp.dataset.k);
      const v = [...inp.value.toUpperCase()].filter(b => alfabet.includes(grunn(b))).map(grunn).pop() || "";
      x.svar = v; inp.value = v; inp.parentElement.classList.remove("feil");
      if (v) { const n = nabo(inp.dataset.k, 1); if (n) gaTil(n); }
      status(); sjekkFerdig();
    }
    function tast(e, inp) {
      const k = inp.dataset.k;
      const flytt = (dr, dc, d) => { const [r, c] = k.split(",").map(Number); let rr = r + dr, cc = c + dc;
        while (rr >= 0 && cc >= 0 && rr < K.rader && cc < K.kol) { if (K.celler.has(rr + "," + cc)) { if (K.celler.get(rr + "," + cc).ord[d] != null) retning = d; return gaTil(rr + "," + cc); } rr += dr; cc += dc; } };
      if (e.key === "ArrowRight") { e.preventDefault(); flytt(0, 1, "v"); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); flytt(0, -1, "v"); }
      else if (e.key === "ArrowDown") { e.preventDefault(); flytt(1, 0, "l"); }
      else if (e.key === "ArrowUp") { e.preventDefault(); flytt(-1, 0, "l"); }
      else if (e.key === "Backspace" && !inp.value) { e.preventDefault(); const p = nabo(k, -1); if (p) { gaTil(p); const x = K.celler.get(p); x.svar = ""; felt(p).value = ""; status(); } }
      else if (e.key === " ") { e.preventDefault(); const x = K.celler.get(k); if (x.ord.v != null && x.ord.l != null) { retning = retning === "v" ? "l" : "v"; marker(); } }
      else if (e.key === "Enter") { e.preventDefault(); const oi = K.celler.get(k).ord[retning]; const neste = K.ord[(oi + 1) % K.ord.length]; retning = neste.d; gaTil(neste.r + "," + neste.c); }
    }
    function status() {
      const fylt = [...K.celler.values()].filter(x => x.svar).length;
      $("spill-status").innerHTML = "<span>" + K.ord.length + " " + tx.ord + "</span><span>" + (en ? "Filled in" : "Fylt ut") + ": <strong>" + fylt + " / " + K.celler.size + "</strong></span>";
    }
    function sjekk() {
      let feil = 0;
      K.celler.forEach((x, k) => { const c = document.querySelector('.ko-celle[data-k="' + k + '"]'); if (x.svar && x.svar !== x.b) { feil++; c.classList.add("feil"); } });
      $("ko-aktiv").innerHTML = feil ? "<strong>" + feil + " " + tx.feil + "</strong>" : (en ? "No wrong letters so far." : "Ingen feil så langt.");
    }
    function vis(k) { const x = K.celler.get(k); x.svar = x.b; x.vist = true; const f = felt(k); f.value = x.b; f.parentElement.classList.add("vist"); f.parentElement.classList.remove("feil"); }
    function sjekkFerdig() {
      if (![...K.celler.values()].every(x => x.svar === x.b)) return;
      const linje = K.ord.length + " ord, tid " + tid(Date.now() - start) + (hjelp >= 100 ? ", fasiten ble vist" : hjelp ? ", brukte hjelp " + hjelp + " ganger" : "");
      $("spill-slutt").innerHTML = '<div class="spill-resultat"><h2>' + tx.riktig + ' 🎉</h2><p lang="nb">' + LV.esc(linje) + '</p><dl class="spill-parliste">' +
        K.ord.map(o => "<div><dt>" + LV.esc(o.vis) + (o.norsk ? ' <span lang="nb">(' + LV.esc(o.norsk) + ")</span>" : "") + "</dt><dd>" + LV.esc(o.ledetrad) + "</dd></div>").join("") +
        '</dl><div class="spill-knapper"><button class="knapp hoved" id="igjen">' + tx.ny + '</button><button class="knapp" id="kopier">' + T.kopier + '</button><span id="kopistatus" aria-live="polite"></span></div></div>';
      $("igjen").addEventListener("click", nytt);
      $("kopier").addEventListener("click", () => kopier(resultatTekst("kryssord", linje), $("kopistatus")));
    }
    $("ko-sjekk").addEventListener("click", sjekk);
    $("ko-bokstav").addEventListener("click", () => { if (aktiv) { hjelp++; vis(aktiv); const n = nabo(aktiv, 1); if (n) gaTil(n); status(); sjekkFerdig(); } });
    $("ko-ordet").addEventListener("click", () => { if (!aktiv) return; hjelp++; const o = K.ord[K.celler.get(aktiv).ord[retning]];
      for (let i = 0; i < o.w.length; i++) vis((o.d === "l" ? o.r + i : o.r) + "," + (o.d === "v" ? o.c + i : o.c)); status(); sjekkFerdig(); });
    $("ko-fasit").addEventListener("click", () => { hjelp += 100; K.celler.forEach((x, k) => vis(k)); status(); sjekkFerdig(); });
    $("ko-ny").addEventListener("click", nytt);
    nytt();
  }

  // =========================================================
  // WORLDLE: gjett landet ut fra omrisset
  // =========================================================
  async function worldle() {
    let en = KILDE.sprak === "en";
    $("innhold").innerHTML = '<p class="melding">Henter kartene …</p>';
    await LV.lastSkript("data/worldle.js");
    const ALLE = LV.worldle.map(x => ({ a2: x[0], nb: x[1], en: x[2], lat: x[3], lon: x[4], del: x[5], areal: x[6], mal: x[7], lett: x[8], engelsk: x[9], d: x[10] }));
    const UTVALG = [
      ["lett", "Kjente land (lett)", "Well-known countries (easy)", x => x.lett],
      ["alle", "Alle land", "All countries", x => x.mal],
      ["Europa", "Europa", "Europe", x => x.mal && x.del === "Europa"],
      ["Afrika", "Afrika", "Africa", x => x.mal && x.del === "Afrika"],
      ["Asia", "Asia", "Asia", x => x.mal && x.del === "Asia"],
      ["Amerika", "Amerika", "The Americas", x => x.mal && /Amerika/.test(x.del)],
      ["Oseania", "Oseania", "Oceania", x => x.mal && x.del === "Oseania"],
      ["engelsk", "Engelskspråklige land", "English-speaking countries", x => x.mal && x.engelsk]
    ];
    const DELNAVN = { "Europa": "Europe", "Afrika": "Africa", "Asia": "Asia", "Nord-Amerika": "North America", "Sør-Amerika": "South America", "Oseania": "Oceania" };
    let utvalg = LV.param("utvalg") || (en ? "engelsk" : "lett");
    if (!UTVALG.some(u => u[0] === utvalg)) utvalg = "lett";
    const FORSOK = 6;
    let S, kø = [], vunnet = 0, spilt = 0;
    const navn = x => en ? x.en : x.nb;
    const flagg = a2 => a2.length === 2 ? [...a2.toUpperCase()].map(c => String.fromCodePoint(0x1F1E6 + c.charCodeAt(0) - 65)).join("") : "";
    const enkel = t => t.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-zæøå0-9]/g, "");

    function lagSide() {
      KILDE.sprak = en ? "en" : "nb"; T = TEKST[en ? "en" : "nb"];
      KILDE.tittel = en ? "Guess the country from its shape" : "Gjett landet ut fra omrisset";
      ramme("worldle",
        '<div class="spill-valg"><div class="spill-valggruppe"><label for="wl-utvalg" class="etikett">' + (en ? "Countries" : "Land") + ':</label><select id="wl-utvalg">' +
        UTVALG.map(u => '<option value="' + u[0] + '"' + (u[0] === utvalg ? " selected" : "") + ">" + (en ? u[2] : u[1]) + " (" + ALLE.filter(u[3]).length + ")</option>").join("") + "</select></div>" +
        '<div class="spill-valggruppe" role="group" aria-label="Språk"><button class="knapp liten" data-sprak="nb" aria-pressed="' + !en + '">Norsk</button><button class="knapp liten" data-sprak="en" aria-pressed="' + en + '">English</button></div></div>' +
        '<div class="spill-status" id="spill-status" aria-live="polite"></div>' +
        '<div class="worldle"><figure class="wl-form"><svg viewBox="0 0 200 200" id="wl-svg" role="img" aria-label="' + (en ? "Outline of a country" : "Omrisset av et land") + '"></svg></figure>' +
        '<form class="wl-sok" id="wl-form" autocomplete="off"><div class="wl-feltboks"><input id="wl-felt" type="text" role="combobox" aria-autocomplete="list" aria-expanded="false" aria-controls="wl-forslag" placeholder="' +
        (en ? "Type a country …" : "Skriv et land …") + '" aria-label="' + (en ? "Country" : "Land") + '"><ul id="wl-forslag" class="wl-forslag" role="listbox" hidden></ul></div>' +
        '<button class="knapp hoved" type="submit">' + (en ? "Guess" : "Gjett") + '</button></form><p class="ol-melding" id="wl-melding" role="status"></p>' +
        '<ol class="wl-gjett" id="wl-gjett"></ol><div class="spill-knapper"><button class="knapp" id="wl-hint">💡 ' + (en ? "Hint" : "Hint") + '</button><button class="knapp" id="wl-gi">' + (en ? "Give up" : "Gi opp") + '</button></div>' +
        '<p class="wl-hinttekst" id="wl-hinttekst" aria-live="polite"></p><div id="spill-slutt"></div></div>' +
        '<p class="ob-kilder">Kart: Natural Earth (public domain). Avstand og retning måles mellom midtpunktene i landene.</p>');
      $("wl-utvalg").addEventListener("change", e => { utvalg = e.target.value; kø = []; history.replaceState(null, "", "spill.html?spill=worldle&utvalg=" + utvalg + (en ? "&sprak=en" : "")); neste(); });
      document.querySelectorAll("[data-sprak]").forEach(b => b.addEventListener("click", () => { en = b.dataset.sprak === "en"; const s = S; lagSide(); S = s; if (S) tegnSpill(); }));
      const felt = $("wl-felt"), forslag = $("wl-forslag");
      let valgt = -1, treff = [];
      const visForslag = () => {
        const q = enkel(felt.value);
        treff = q ? ALLE.filter(x => enkel(navn(x)).includes(q) || enkel(x.nb).startsWith(q) || enkel(x.en).startsWith(q))
          .sort((a, b) => (enkel(navn(b)).startsWith(q) - enkel(navn(a)).startsWith(q)) || (b.mal - a.mal) || navn(a).length - navn(b).length || navn(a).localeCompare(navn(b), "nb")).slice(0, 8) : [];
        valgt = treff.length ? 0 : -1;
        forslag.innerHTML = treff.map((x, i) => '<li role="option" id="wl-f' + i + '" data-i="' + i + '"' + (i === valgt ? ' aria-selected="true"' : "") + ">" + LV.esc(navn(x)) + "</li>").join("");
        forslag.hidden = !treff.length; felt.setAttribute("aria-expanded", String(!!treff.length));
        felt.setAttribute("aria-activedescendant", valgt >= 0 ? "wl-f" + valgt : "");
      };
      felt.addEventListener("input", visForslag);
      felt.addEventListener("keydown", e => {
        if (!treff.length) return;
        if (e.key === "ArrowDown" || e.key === "ArrowUp") {
          e.preventDefault(); valgt = (valgt + (e.key === "ArrowDown" ? 1 : -1) + treff.length) % treff.length;
          forslag.querySelectorAll("li").forEach((li, i) => li.setAttribute("aria-selected", String(i === valgt)));
          felt.setAttribute("aria-activedescendant", "wl-f" + valgt);
        } else if (e.key === "Escape") { forslag.hidden = true; }
      });
      forslag.addEventListener("mousedown", e => { const li = e.target.closest("li"); if (li) { e.preventDefault(); gjett(treff[+li.dataset.i]); } });
      $("wl-form").addEventListener("submit", e => {
        e.preventDefault();
        const q = enkel(felt.value);
        const eksakt = ALLE.find(x => enkel(x.nb) === q || enkel(x.en) === q);
        gjett(eksakt || (valgt >= 0 ? treff[valgt] : null));
      });
      $("wl-hint").addEventListener("click", hint);
      $("wl-gi").addEventListener("click", () => { if (S && !S.ferdig) slutt(false); });
    }
    function neste() {
      if (!kø.length) kø = bland(ALLE.filter(UTVALG.find(u => u[0] === utvalg)[3]));
      S = { mal: kø.pop(), gjett: [], hint: 0, ferdig: false };
      tegnSpill();
      $("wl-felt").focus({ preventScroll: true });
    }
    function tegnSpill() {
      $("wl-svg").innerHTML = '<path d="' + S.mal.d + '" fill-rule="evenodd"/>';
      $("wl-melding").textContent = "";
      $("wl-gjett").innerHTML = S.gjett.map(rad).join("") + Array(Math.max(0, FORSOK - S.gjett.length)).fill('<li class="wl-tom"></li>').join("");
      $("spill-status").innerHTML = "<span>" + (en ? "Guesses" : "Forsøk") + ": <strong>" + S.gjett.length + " / " + FORSOK + "</strong></span><span>" + (en ? "Solved" : "Riktige") + ": <strong>" + vunnet + " / " + spilt + "</strong></span>";
      visHint();
      if (!S.ferdig) $("spill-slutt").innerHTML = "";
    }
    const rad = g => {
      const x = g.land;
      if (g.riktig) return '<li class="wl-rad riktig"><span class="wl-navn">' + flagg(x.a2) + " " + LV.esc(navn(x)) + '</span><span class="wl-km">0 km</span><span class="wl-pil">🎉</span><span class="wl-pst">100 %</span></li>';
      return '<li class="wl-rad"><span class="wl-navn">' + LV.esc(navn(x)) + '</span><span class="wl-km">' + g.km.toLocaleString("nb-NO") + ' km</span><span class="wl-pil" aria-label="' +
        (en ? "direction " : "retning ") + g.retning + '">' + g.pil + '</span><span class="wl-pst" style="--p:' + g.pst + '">' + g.pst + " %</span></li>";
    };
    // Avstand (storsirkel) og retning fra gjettet land til riktig land
    function maal(a, b) {
      const r = Math.PI / 180, f1 = a.lat * r, f2 = b.lat * r, dl = (b.lon - a.lon) * r;
      const km = Math.round(6371 * Math.acos(Math.min(1, Math.sin(f1) * Math.sin(f2) + Math.cos(f1) * Math.cos(f2) * Math.cos(dl))));
      const y = Math.sin(dl) * Math.cos(f2), x = Math.cos(f1) * Math.sin(f2) - Math.sin(f1) * Math.cos(f2) * Math.cos(dl);
      const grader = (Math.atan2(y, x) / r + 360) % 360;
      const i = Math.round(grader / 45) % 8;
      const piler = ["⬆️", "↗️", "➡️", "↘️", "⬇️", "↙️", "⬅️", "↖️"];
      const nb = ["nord", "nordøst", "øst", "sørøst", "sør", "sørvest", "vest", "nordvest"], eng = ["north", "north-east", "east", "south-east", "south", "south-west", "west", "north-west"];
      return { km: km, pil: piler[i], retning: en ? eng[i] : nb[i], pst: Math.max(0, Math.round(100 - km / 200)) };
    }
    function gjett(x) {
      if (!S || S.ferdig) return;
      const felt = $("wl-felt");
      if (!x) { $("wl-melding").textContent = en ? "Choose a country from the list." : "Velg et land fra lista."; return; }
      if (S.gjett.some(g => g.land === x)) { $("wl-melding").textContent = (en ? "You have already guessed " : "Du har allerede gjettet ") + navn(x) + "."; return; }
      felt.value = ""; $("wl-forslag").hidden = true; felt.setAttribute("aria-expanded", "false");
      const riktig = x === S.mal;
      S.gjett.push(Object.assign({ land: x, riktig: riktig }, riktig ? {} : maal(x, S.mal)));
      tegnSpill();
      if (riktig) slutt(true); else if (S.gjett.length >= FORSOK) slutt(false);
      else $("wl-melding").textContent = navn(x) + ": " + S.gjett[S.gjett.length - 1].km.toLocaleString("nb-NO") + " km " + (en ? "away, towards the " : "unna, mot ") + S.gjett[S.gjett.length - 1].retning + ".";
    }
    function hint() { if (!S || S.ferdig || S.hint >= 3) return; S.hint++; visHint(); }
    function visHint() {
      const m = S.mal, h = [];
      if (S.hint >= 1) h.push((en ? "Continent: " : "Verdensdel: ") + (en ? DELNAVN[m.del] || m.del : m.del));
      if (S.hint >= 2) h.push((en ? "Area: about " : "Areal: ca. ") + (Math.round(m.areal / 1000) * 1000).toLocaleString("nb-NO") + " km²" + (en ? "" : " (Norge: ca. 323 000 km²)"));
      if (S.hint >= 3) h.push((en ? "First letter: " : "Første bokstav: ") + navn(m)[0]);
      $("wl-hinttekst").textContent = h.join(" · ");
      $("wl-hint").disabled = S.ferdig || S.hint >= 3;
    }
    function slutt(vant) {
      S.ferdig = true; spilt++; if (vant) vunnet++;
      tegnSpill();
      const m = S.mal;
      const ruter = S.gjett.map(g => g.riktig ? "🟩🟩🟩🟩🟩 🎉" : "🟩".repeat(Math.floor(g.pst / 20)) + "⬜".repeat(5 - Math.floor(g.pst / 20)) + " " + g.pil).join("\n");
      const linje = (vant ? S.gjett.length : "X") + "/" + FORSOK + (S.hint ? " (" + S.hint + " hint)" : "");
      $("spill-slutt").innerHTML = '<div class="spill-resultat"><h2>' + (vant ? T.bra + " 🎉" : T.tapt) + '</h2><p class="wl-fasit"><span class="wl-flagg" aria-hidden="true">' + flagg(m.a2) + "</span> <strong>" + LV.esc(navn(m)) + "</strong>" +
        (en ? "" : ' <span lang="en">(' + LV.esc(m.en) + ")</span>") + " – " + (en ? DELNAVN[m.del] || m.del : m.del) + ", " + (Math.round(m.areal / 1000) * 1000).toLocaleString("nb-NO") + " km²</p>" +
        '<p><a href="ordbok.html?q=' + encodeURIComponent(m.nb) + '">' + (en ? "Look it up in the dictionary" : "Slå opp i ordboka") + '</a> · <a href="https://' + (en ? "en" : "no") + ".wikipedia.org/wiki/" + encodeURIComponent(navn(m)) + '" target="_blank" rel="noopener">Wikipedia ↗</a></p>' +
        '<div class="spill-knapper"><button class="knapp hoved" id="wl-neste">' + (en ? "Next country" : "Neste land") + ' →</button><button class="knapp" id="kopier">' + T.kopier + '</button><span id="kopistatus" aria-live="polite"></span></div></div>';
      $("wl-neste").addEventListener("click", neste);
      $("kopier").addEventListener("click", () => kopier(resultatTekst("worldle", linje + " – " + m.nb + "\n" + ruter + "\nTotalt: " + vunnet + " av " + spilt), $("kopistatus")));
      $("wl-neste").focus({ preventScroll: true });
    }
    lagSide();
    neste();
  }

  // =========================================================
  // Oversikt
  // =========================================================
  function oversikt() {
    document.title = "Spill – " + (LV.config ? LV.config.navn : "Les verden");
    const valg = (fag) => [8, 9, 10].map(tr => {
      const t = LV.temaer.filter(x => x.fag === fag && x.trinn === tr).sort((a, b) => a.tittel.localeCompare(b.tittel, "nb"));
      return t.length ? '<optgroup label="' + LV.fagNavn[fag] + " – " + tr + '. trinn">' + t.map(x => '<option value="tema=' + x.id + '">' + LV.esc(x.tittel) + "</option>").join("") +
        '<option value="fag=' + fag + "&trinn=" + tr + '">★ Bland alle temaene i ' + LV.fagNavn[fag].toLowerCase() + ", " + tr + ". trinn</option></optgroup>" : "";
    }).join("");
    let h = '<header class="sidehode"><h1>Spill</h1><p class="ingress">Øv på begreper, personer og hendelser fra temaene – med memory, gjett ordet, ordsøk, Ordle, Ordmiks og tidslinje. Spillene lages automatisk fra hvert tema. Ingenting lagres.</p></header>' +
      '<section class="spill-velger"><label for="spill-tema"><strong>1. Velg tema</strong></label><select id="spill-tema">' + valg("samfunnsfag") + valg("engelsk") + "</select></section>" +
      '<h2 class="spill-steg">2. Velg spill</h2><ul class="spillkort-rad">' + SPILL.map(s =>
        '<li><a class="spillkort"' + (s.uavhengig ? ' href="spill.html?spill=' + s.id + '">' : ' data-spill="' + s.id + '" href="#">') + '<span class="spillkort-ikon" aria-hidden="true">' + s.ikon + "</span><strong>" + s.navn + "</strong><span>" + s.tekst + "</span></a></li>").join("") +
      '<li><a class="spillkort spillkort-kart" href="kartspill.html"><span class="spillkort-ikon" aria-hidden="true">🗺️</span><strong>Kartspill</strong><span>Finn land, hovedsteder, delstater, elver, landemerker og historiske hendelser på kartet.</span></a></li>' +
      '<li><a class="spillkort" href="personer.html"><span class="spillkort-ikon" aria-hidden="true">🕵️</span><strong>Hvem er jeg?</strong><span>Gjett personen ut fra ledetråden – på personsiden.</span></a></li>' +
      '<li><a class="spillkort" href="land.html"><span class="spillkort-ikon" aria-hidden="true">🌍</span><strong>Country quiz</strong><span>Quiz og kartquiz om engelskspråklige land – på landsidene.</span></a></li></ul>';
    $("innhold").innerHTML = h;
    const sel = $("spill-tema");
    const fra = LV.param("tema");
    if (fra) sel.value = "tema=" + fra;
    document.querySelectorAll("[data-spill]").forEach(a => a.addEventListener("click", e => {
      e.preventDefault();
      location.href = "spill.html?spill=" + a.dataset.spill + "&" + sel.value;
    }));
  }

  // =========================================================
  // Start
  // =========================================================
  document.addEventListener("DOMContentLoaded", async function () {
    const spill = LV.param("spill");
    const s = SPILL.find(x => x.id === spill);
    if (!s) return oversikt();
    if (s.uavhengig) {
      KILDE = { tittel: "", sprak: LV.param("sprak") === "en" || LV.param("fag") === "engelsk" ? "en" : "nb", blandet: true };
      T = TEKST[KILDE.sprak];
      document.title = s.navn + " – " + (LV.config ? LV.config.navn : "Les verden");
      return worldle();
    }
    try { DATA = await lastData(); }
    catch (e) { $("innhold").innerHTML = '<p class="melding">Fant ikke temaet. <a href="spill.html">Gå til spillene</a></p>'; return; }
    SPRAK = KILDE.sprak === "en" ? "en" : "nb";
    T = TEKST[SPRAK];
    document.title = s.navn + " – " + KILDE.tittel;
    if (!kanSpilles(s)) {
      ramme(spill, '<p class="melding" lang="nb">Dette temaet har for lite innhold til dette spillet. Prøv et annet spill eller et annet tema.</p>');
      return;
    }
    ({ memory: () => memory(false), koble: () => memory(true), hangman: hangman, ordsok: ordsok, ordle: ordle, ordmiks: ordmiks, kryssord: kryssord, rekkefolge: rekkefolge })[spill]();
  });
})();
