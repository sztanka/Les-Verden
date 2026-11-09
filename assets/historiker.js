/* =========================================================
   Les verden – Les som en historiker (historiker.html)
   Tre kilder som forteller ulikt om samme hendelse. Eleven går
   gjennom fire steg: opphav, kontekst, sammenligning og nærlesing,
   og skriver til slutt sin egen konklusjon med belegg.
   Bygger på «Reading Like a Historian» (Stanford).
   historiker.html → oversikt · historiker.html?id=<sett>
   Data: data/historiker.js · Ingenting lagres.
   ========================================================= */
(function () {
  const LV = window.LV;
  const $ = id => document.getElementById(id);
  const esc = s => LV.esc(String(s == null ? "" : s));
  const hode = t => '<nav class="brodsmuler" aria-label="Brødsmuler"><a href="index.html">Forside</a> › <a href="kilder.html">Kildeanalyse</a> › <a href="historiker.html">Les som en historiker</a>' + (t ? " › " + esc(t) : "") + "</nav>";
  const TX = {
    nb: {
      steg: [["🏷️", "Opphav", "Hvem laget kilden, når og hvorfor? Les opphavet før du leser teksten."], ["🌍", "Kontekst", "Hva skjedde rundt kildene? Hvordan kan situasjonen ha påvirket dem?"], ["⚖️", "Sammenligning", "Hva er kildene enige om, og hvor er de uenige?"], ["🔍", "Nærlesing", "Hvilke ord viser hva avsenderen mener og vil?"], ["✍️", "Din konklusjon", "Hva skjedde – etter din vurdering?"]],
      kilder: "Kildene", gjenskapt: "Kildene er gjenskapt: De er skrevet for Les verden, men bygger på virkelige hendelser og typer kilder fra tiden.", type: "Type", hvem: "Hvem", nar: "Når",
      p1: k => "Kilde " + k + ": Hvem laget den, og hva ville avsenderen oppnå?", p2: "Hvordan kan situasjonen på denne tiden ha påvirket det kildene forteller?", p3: "Hva er kildene enige om, og hva er de uenige om?", p4: "Hvilke ord viser hva avsenderne mener? Velg minst to, og forklar.", p5: "Svar på hovedspørsmålet. Bruk belegg fra minst to av kildene, og si hvilken kilde du stoler mest på – og hvorfor.", ord: "Se nøye på disse ordene:", neste: "Neste steg →", riktig: "Riktig!", feil: "Ikke helt.", tema: "Les mer i temaet", tilbake: "← Velg et annet kildesett"
    },
    en: {
      steg: [["🏷️", "Sourcing", "Who made the source, when and why? Read the source information before the text."], ["🌍", "Context", "What was happening at the time? How might it have affected the sources?"], ["⚖️", "Corroboration", "What do the sources agree on, and where do they disagree?"], ["🔍", "Close reading", "Which words show what the writer thinks and wants?"], ["✍️", "Your conclusion", "What happened – in your judgement?"]],
      kilder: "The sources", gjenskapt: "The sources are recreated: they were written for Les verden, but are based on real events and on the kinds of sources that exist from the time.", type: "Type", hvem: "Who", nar: "When",
      p1: k => "Source " + k + ": Who made it, and what did the writer want to achieve?", p2: "How might the situation at the time have affected what the sources say?", p3: "What do the sources agree on, and what do they disagree on?", p4: "Which words show what the writers think? Choose at least two and explain.", p5: "Answer the main question. Use evidence from at least two sources, and say which source you trust most – and why.", ord: "Look closely at these words:", neste: "Next step →", riktig: "Correct!", feil: "Not quite.", tema: "Read more in the topic", tilbake: "← Velg et annet kildesett"
    }
  };
  const felt = (id, l, r) => '<label class="mu-notat" for="' + id + '"><span>' + esc(l) + '</span><textarea id="' + id + '" rows="' + (r || 3) + '"></textarea></label>';

  function oversikt() {
    document.title = "Les som en historiker – " + (LV.config ? LV.config.navn : "Les verden");
    $("innhold").innerHTML = hode() +
      '<header class="sidehode"><p class="overlinje">Historisk kildearbeid</p><h1>🧐 Les som en historiker</h1><p class="ingress">Historikere stoler ikke blindt på én kilde. De spør hvem som laget den og hvorfor, ser på hva som skjedde rundt, sammenligner med andre kilder og leser nøye. Her får du tre kilder som forteller ulikt om samme hendelse. Kan du finne ut hva som skjedde?</p></header>' +
      '<ol class="hi-stegliste">' + TX.nb.steg.map(([i, n, t]) => '<li><span aria-hidden="true">' + i + "</span><strong>" + n + "</strong><span>" + t + "</span></li>").join("") + "</ol>" +
      '<ul class="fo-liste">' + LV.historiker.map(h => '<li><a class="fo-kort" href="historiker.html?id=' + h.id + '" style="--fo-a:var(--' + (h.sp === "en" ? "engelsk" : "samfunnsfag") + ')"' + (h.sp === "en" ? ' lang="en"' : "") + '><span class="fo-kort-topp"><span class="fo-ikon" aria-hidden="true">' + h.ikon + "</span><span>" + h.kilder.length + " kilder</span></span><strong>" + esc(h.tittel) + "</strong><span>" + esc(h.sporsmal) + "</span></a></li>").join("") + "</ul>" +
      '<p class="fo-merk">Til læreren: De fire stegene bygger på <span lang="en">Reading Like a Historian</span> fra Stanford (<span lang="en">sourcing, contextualization, corroboration, close reading</span>). Kildene er gjenskapt for å vise typiske forskjeller mellom kilder – for eksempel en rapport fra myndighetene, et øyenvitne og en avis eller lærebok med et tydelig syn. Bruk gjerne ekte kilder fra <a href="kilder.html">Kildeanalyse</a> etterpå.</p>';
  }

  function sett(h) {
    const T = TX[h.sp], lang = h.sp === "en" ? ' lang="en"' : "", pre = "hi-" + h.id + "-";
    const tema = LV.temaer.find(t => t.id === h.tema);
    document.title = h.tittel + " – Les som en historiker";
    const stegHtml = [
      h.kilder.map(k => felt(pre + "o" + k.id, T.p1(k.id), 2)).join(""),
      '<div class="hi-kontekst"><p>' + esc(h.kontekst) + "</p></div>" + felt(pre + "k", T.p2, 3),
      '<ol class="hi-sjekk">' + h.sjekk.map((s, i) => '<li><fieldset><legend>' + esc(s.q) + "</legend>" + s.valg.map((v, j) => '<label><input type="radio" name="' + pre + "s" + i + '" id="' + pre + "s" + i + "-" + j + '" value="' + j + '"> ' + esc(v) + "</label>").join("") + '</fieldset><p class="hi-svar" id="' + pre + "sv" + i + '" aria-live="polite"></p></li>').join("") + "</ol>" + felt(pre + "sm", T.p3, 3),
      '<p class="hi-ordtittel">' + T.ord + '</p><ul class="hi-ord">' + h.ord.map(o => "<li>" + esc(o) + "</li>").join("") + "</ul>" + felt(pre + "n", T.p4, 3),
      felt(pre + "konk", T.p5, 8)
    ];
    $("innhold").innerHTML = hode(h.tittel) + "<div" + lang + ">" +
      '<header class="sidehode"><p class="overlinje">🧐 ' + (h.sp === "en" ? "Read like a historian" : "Les som en historiker") + "</p><h1>" + h.ikon + " " + esc(h.tittel) + '</h1><p class="hi-hoved"><strong>' + esc(h.sporsmal) + "</strong></p></header>" +
      '<section aria-labelledby="hi-kh"><h2 id="hi-kh">' + T.kilder + '</h2><p class="lg-elevmerk">' + T.gjenskapt + '</p><div class="hi-kilder">' + h.kilder.map(k => '<article class="hi-kilde" aria-labelledby="' + pre + "kh" + k.id + '"><h3 id="' + pre + "kh" + k.id + '"><span class="tp-bokstav" aria-hidden="true">' + k.id + "</span> " + esc(k.type) + '</h3><dl class="hi-opphav"><dt>' + T.hvem + "</dt><dd>" + esc(k.hvem) + "</dd><dt>" + T.nar + "</dt><dd>" + esc(k.nar) + '</dd></dl><blockquote class="hi-tekst">' + esc(k.tekst) + "</blockquote></article>").join("") + "</div></section>" +
      '<ol class="hi-steg">' + T.steg.map(([ikon, navn, intro], i) => '<li class="hi-trinn" data-steg="' + i + '"' + (i ? " hidden" : "") + '><h2 tabindex="-1"><span aria-hidden="true">' + ikon + "</span> " + (i + 1) + ". " + esc(navn) + '</h2><p class="mu-intro">' + esc(intro) + "</p>" + stegHtml[i] + (i < 4 ? '<p><button type="button" class="knapp hoved hi-videre" data-til="' + (i + 1) + '">' + T.neste + "</button></p>" : "") + "</li>").join("") + "</ol>" +
      '<p lang="nb">' + (tema ? '<a href="tema.html?id=' + tema.id + '">' + (h.sp === "en" ? "Les mer i temaet" : T.tema) + " «" + esc(tema.tittel) + "» →</a> · " : "") + '<a href="historiker.html">' + TX.nb.tilbake + "</a></p></div>";

    document.querySelectorAll(".hi-videre").forEach(b => b.addEventListener("click", () => {
      const n = document.querySelector('.hi-trinn[data-steg="' + b.dataset.til + '"]'); n.hidden = false; b.closest("p").hidden = true; n.querySelector("h2").focus();
    }));
    h.sjekk.forEach((s, i) => document.querySelectorAll('input[name="' + pre + "s" + i + '"]').forEach(inp => inp.addEventListener("change", () => {
      const ok = +inp.value === s.r, el = $(pre + "sv" + i);
      el.className = "hi-svar " + (ok ? "ok" : "feil");
      el.textContent = (ok ? "✔ " + T.riktig + " " : "✘ " + T.feil + " ") + s.f;
    })));
  }

  document.addEventListener("DOMContentLoaded", () => {
    const h = LV.historiker.find(x => x.id === LV.param("id"));
    if (h) sett(h); else oversikt();
    const l = document.createElement("div"); l.className = "svarlinje"; l.innerHTML = '<div class="svarlinje-indre"><label class="skjult-visuelt" for="elevnavn">Navn</label><input id="elevnavn" type="text" placeholder="Navn" autocomplete="off"><span class="status" role="status" aria-live="polite"></span></div>'; document.body.appendChild(l);
  });
})();
