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
    { id: "rekkefolge", ikon: "⏳", navn: "Tidslinje", tekst: "Sett hendelsene i riktig rekkefølge – fra eldst til nyest.", krever: "hendelser" }
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
      '<nav class="spill-andre" aria-label="Andre spill" lang="nb">' + SPILL.filter(x => x.id !== spill && kanSpilles(x)).map(x =>
        '<a href="spill.html?' + adresse(x.id) + '"><span aria-hidden="true">' + x.ikon + "</span> " + x.navn + "</a>").join("") + "</nav></header>" +
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
        '<li><a class="spillkort" data-spill="' + s.id + '" href="#"><span class="spillkort-ikon" aria-hidden="true">' + s.ikon + "</span><strong>" + s.navn + "</strong><span>" + s.tekst + "</span></a></li>").join("") +
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
    try { DATA = await lastData(); }
    catch (e) { $("innhold").innerHTML = '<p class="melding">Fant ikke temaet. <a href="spill.html">Gå til spillene</a></p>'; return; }
    SPRAK = KILDE.sprak === "en" ? "en" : "nb";
    T = TEKST[SPRAK];
    document.title = s.navn + " – " + KILDE.tittel;
    if (!kanSpilles(s)) {
      ramme(spill, '<p class="melding" lang="nb">Dette temaet har for lite innhold til dette spillet. Prøv et annet spill eller et annet tema.</p>');
      return;
    }
    ({ memory: () => memory(false), koble: () => memory(true), hangman: hangman, ordsok: ordsok, ordle: ordle, ordmiks: ordmiks, rekkefolge: rekkefolge })[spill]();
  });
})();
