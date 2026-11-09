/* =========================================================
   Les verden – Tekstpar (tekstpar.html)
   To tekster om samme tema side om side, med førlesing,
   sammenligningsskjema, Venn-diagram, spørsmål og skriveoppgave.
   Tekstene hentes fra nettstedets egne filer (se data/tekstpar.js).
   tekstpar.html → oversikt · tekstpar.html?id=<par>
   Ingenting lagres – svarene kan lastes ned med svarfil.js.
   ========================================================= */
(function () {
  const LV = window.LV;
  const $ = id => document.getElementById(id);
  const esc = s => LV.esc(String(s == null ? "" : s));
  const fmt = s => esc(String(s).replace(/\[\[([^\]|]+)(?:\|[^\]]*)?\]\]/g, "$1")).replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>").replace(/\*([^*]+)\*/g, "<em>$1</em>");
  const hode = t => '<nav class="brodsmuler" aria-label="Brødsmuler"><a href="index.html">Forside</a> › <a href="lesestrategier.html">Lese og skrive</a> › <a href="tekstpar.html">Tekstpar</a>' + (t ? " › " + esc(t) : "") + "</nav>";
  const felt = (id, label, rader, lang) => '<label class="mu-notat" for="' + id + '"><span' + (lang || "") + ">" + esc(label) + '</span><textarea id="' + id + '" rows="' + (rader || 3) + '"></textarea></label>';

  function oversikt() {
    document.title = "Tekstpar – " + (LV.config ? LV.config.navn : "Les verden");
    $("innhold").innerHTML = hode() +
      '<header class="sidehode"><p class="overlinje">Sammenlignende lesing</p><h1>👯 Tekstpar</h1><p class="ingress">Når du leser to tekster om det samme, ser du mer enn når du leser én. Et dikt og en fagtekst, en erklæring og et svar på den, en erindring fra USA og en fagtekst fra Norge: Hva er likt, hva er ulikt – og hvorfor?</p></header>' +
      '<ul class="fo-liste">' + LV.tekstpar.map(p => '<li><a class="fo-kort" href="tekstpar.html?id=' + p.id + '" style="--fo-a:var(--' + (p.sp === "en" ? "engelsk" : "samfunnsfag") + ')"><span class="fo-kort-topp"><span class="fo-ikon" aria-hidden="true">' + p.ikon + "</span><span>" + esc(p.a.etikett) + " + " + esc(p.b.etikett) + "</span></span><strong" + (p.sp === "en" ? ' lang="en"' : "") + ">" + esc(p.tittel) + "</strong><span" + (p.sp === "en" ? ' lang="en"' : "") + ">" + esc(p.ingress) + '</span><span class="fo-trinn">' + p.trinn + ". trinn · spørsmål på " + (p.sp === "en" ? "engelsk" : "norsk") + "</span></a></li>").join("") + "</ul>" +
      '<p class="fo-merk">Til læreren: Tekstene hentes fra Reading Room, Kildeanalyse og temaene på nettstedet. Les gjerne de to tekstene i hver sin gruppe først, og la gruppene forklare «sin» tekst for hverandre før de sammenligner.</p>';
  }

  async function hent(k) {
    if (k.type === "lesing") {
      const info = (LV.lesetekster || []).find(t => t.id === k.id);
      await LV.lastSkript("data/lesing/" + k.id + ".js");
      const d = LV.lesetekst;
      return { tittel: info.tittel, av: k.av || info.forfatter + " (" + info.ar + ")", lang: "en", lenke: "lesing.html?id=" + k.id, deler: k.deler.map(i => d.tekst[i]), ord: (d.ord || []).map(o => [o[0], o[2] || o[1]]), nr: k.deler };
    }
    if (k.type === "tema") {
      const info = LV.temaer.find(t => t.id === k.id);
      await LV.lastSkript("data/temaer/" + k.id + ".js");
      const t = LV.tema;
      return { tittel: info.tittel, av: "Fagtekst fra Les verden", lang: t.sprak === "en" ? "en" : "nb", lenke: "tema.html?id=" + k.id, deler: [].concat(...k.deler.map(i => [{ h: t.avsnitt[i].tittel }].concat(t.avsnitt[i].tekst))), ord: [], nr: null };
    }
    const kilde = LV.kilder.find(x => x.id === k.id);
    return { tittel: kilde.tittel, tl: "nb", av: k.av || kilde.aar, lang: "en", lenke: "kilder.html?id=" + k.id, deler: k.deler.map(i => kilde.utdrag[i]), ord: kilde.ord || [], nr: k.deler };
  }

  function tekstHtml(t, bokstav, etikett) {
    let forrige = null, h = "";
    t.deler.forEach((p, n) => {
      if (t.nr) { const i = t.nr[n]; if (forrige != null && i > forrige + 1) h += '<p class="tp-hull">[…]</p>'; forrige = i; }
      if (p == null) return;
      if (typeof p === "string") h += "<p>" + fmt(p) + "</p>";
      else if (p.h) h += p.h === "[…]" ? '<p class="tp-hull">[…]</p>' : "<h4>" + fmt(p.h) + "</h4>";
      else if (p.vers) h += '<p class="tp-vers">' + p.vers.split("\n").map(fmt).join("<br>") + "</p>";
      else if (p.dikt) h += '<p class="tp-vers">' + String(p.dikt).split("\n").map(fmt).join("<br>") + "</p>";
    });
    return '<article class="tp-tekst tp-' + bokstav.toLowerCase() + '" aria-labelledby="tp-h-' + bokstav + '"><p class="tp-etikett"><span class="tp-bokstav" aria-hidden="true">' + bokstav + "</span> " + esc(etikett) + '</p><h3 id="tp-h-' + bokstav + '"' + ((t.tl || t.lang) === "en" ? ' lang="en"' : "") + ">" + esc(t.tittel) + '</h3><p class="tp-av">' + esc(t.av) + ' · <a href="' + t.lenke + '">Les hele</a></p>' +
      '<div class="tp-brod"' + (t.lang === "en" ? ' lang="en"' : "") + ">" + h + "</div>" +
      (t.ord.length ? '<details class="tp-ord"><summary>Ordhjelp</summary><dl>' + t.ord.map(([a, b]) => '<dt lang="en">' + esc(a) + "</dt><dd>" + esc(b) + "</dd>").join("") + "</dl></details>" : "") + "</article>";
  }

  async function par(p) {
    document.title = p.tittel + " – Tekstpar";
    const en = p.sp === "en", lang = en ? ' lang="en"' : "";
    let A, B;
    try { if (p.a.type === "kilde" || p.b.type === "kilde") await LV.lastSkript("data/kilder.js"); A = await hent(p.a); B = await hent(p.b); }
    catch (e) { $("innhold").innerHTML = hode() + '<p>Fant ikke tekstene. <a href="tekstpar.html">Tilbake</a>.</p>'; return; }
    const S = LV.tekstparSkjema[p.sp], pre = "tp-" + p.id + "-";
    const tema = LV.temaer.find(t => t.id === p.tema);
    const L = en ? { for: "1. Before you read", les: "2. Read both texts", lesT: "Read text A first, then text B. Underline or note words that show the writer's view.", skjema: "3. Compare the texts", venn: "4. Similarities and differences", vennT: "Write key words in the three fields.", sp: "5. Think and discuss", skriv: "6. Write", tekst: "Text", mer: "Read more in the topic" }
      : { for: "1. Før du leser", les: "2. Les begge tekstene", lesT: "Les tekst A først, så tekst B. Legg merke til ord som viser hva avsenderen mener.", skjema: "3. Sammenlign tekstene", venn: "4. Likheter og forskjeller", vennT: "Skriv stikkord i de tre feltene.", sp: "5. Tenk og diskuter", skriv: "6. Skriv", tekst: "Tekst", mer: "Les mer i temaet" };

    $("innhold").innerHTML = hode(p.tittel) +
      '<header class="sidehode"' + lang + '><p class="overlinje">👯 ' + (en ? "Text pair" : "Tekstpar") + "</p><h1>" + p.ikon + " " + esc(p.tittel) + '</h1><p class="ingress">' + esc(p.ingress) + "</p></header>" +
      '<section class="le-del"' + lang + "><h2>" + L.for + "</h2>" + p.forLesing.map((s, i) => felt(pre + "for" + i, s, 2)).join("") + "</section>" +
      '<section class="le-del"' + lang + "><h2>" + L.les + '</h2><p class="mu-intro">' + L.lesT + '</p><div class="tp-rad" lang="nb">' + tekstHtml(A, "A", p.a.etikett) + tekstHtml(B, "B", p.b.etikett) + "</div></section>" +
      '<section class="le-del"' + lang + "><h2>" + L.skjema + '</h2><div class="tp-skjema" role="table" aria-label="' + L.skjema + '"><div class="tp-skjema-rad tp-skjema-hode" role="row"><span role="columnheader"></span><span role="columnheader">A: ' + esc(A.tittel) + '</span><span role="columnheader">B: ' + esc(B.tittel) + "</span></div>" +
      S.map(([k, s]) => '<div class="tp-skjema-rad" role="row"><span class="tp-skjema-sp" role="rowheader">' + esc(s) + '</span><span role="cell"><label class="skjult-visuelt" for="' + pre + k + '-a">' + esc(s) + " – A</label><textarea id=\"" + pre + k + '-a" rows="2"></textarea></span><span role="cell"><label class="skjult-visuelt" for="' + pre + k + '-b">' + esc(s) + " – B</label><textarea id=\"" + pre + k + '-b" rows="2"></textarea></span></div>').join("") + "</div></section>" +
      '<section class="le-del"' + lang + "><h2>" + L.venn + '</h2><p class="mu-intro">' + L.vennT + '</p><div class="tp-venn">' + p.venn.map((v, i) => '<label class="tp-venn-felt tp-venn-' + i + '" for="' + pre + "v" + i + '"><span>' + esc(v) + '</span><textarea id="' + pre + "v" + i + '" rows="5"></textarea></label>').join("") + "</div></section>" +
      '<section class="le-del"' + lang + "><h2>" + L.sp + '</h2><ol class="tp-sporsmal">' + p.sporsmal.map((s, i) => "<li>" + felt(pre + "s" + i, s, 3) + "</li>").join("") + "</ol></section>" +
      '<section class="le-del"' + lang + "><h2>" + L.skriv + '</h2><p class="sx-oppgave">' + esc(p.skriv) + "</p>" + felt(pre + "skriv", en ? "Your text" : "Teksten din", 10) +
      '<p class="tp-ord-teller" id="tp-teller" aria-live="polite"></p>' + (tema ? '<p lang="nb"><a href="tema.html?id=' + tema.id + '">' + L.mer + " «" + esc(tema.tittel) + '» →</a></p>' : "") + '<p lang="nb"><a class="knapp" href="tekstpar.html">← ' + (en ? "Velg et annet tekstpar" : "Velg et annet tekstpar") + "</a></p></section>";
    const sk = $(pre + "skriv"), teller = () => { const n = sk.value.trim().split(/\s+/).filter(Boolean).length; $("tp-teller").textContent = n + (en ? " words" : " ord"); };
    sk.addEventListener("input", teller); teller();
  }

  document.addEventListener("DOMContentLoaded", () => {
    const p = LV.tekstpar.find(x => x.id === LV.param("id"));
    if (p) par(p); else oversikt();
    const linje = document.createElement("div");
    linje.className = "svarlinje";
    linje.innerHTML = '<div class="svarlinje-indre"><label class="skjult-visuelt" for="elevnavn">Navn</label><input id="elevnavn" type="text" placeholder="Navn" autocomplete="off"><span class="status" role="status" aria-live="polite"></span></div>';
    document.body.appendChild(linje);
  });
})();
