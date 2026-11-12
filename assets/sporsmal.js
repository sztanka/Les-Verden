/* =========================================================
   Les verden – Spørsmålsstudioet (sporsmal.html)
   Elevene lager sine egne spørsmål til et tema eller en tekst
   (etter «Question Formulation Technique», Right Question Institute).
   sporsmal.html?tema=<id>              → økt med bildet og teksten til temaet
   sporsmal.html?fokus=<tekst>           → egen spørsmålsfokus fra læreren
   &vis=storskjerm                        → visning for tavla
   Ingenting lagres – svarene kan lastes ned (svarfil.js).
   ========================================================= */
(function () {
  const LV = window.LV;
  const $ = id => document.getElementById(id);
  const esc = s => LV.esc(String(s == null ? "" : s));

  const T = {
    nb: {
      regler: ["Still så mange spørsmål du kan.", "Ikke stopp for å diskutere, vurdere eller svare.", "Skriv ned spørsmålene akkurat slik de blir sagt.", "Gjør påstander om til spørsmål."],
      steg: [
        ["Spørsmålsfokuset", "Les eller se på fokuset. Ikke snakk om det ennå – bare tenk.", 1],
        ["Lag spørsmål", "Følg de fire reglene. Skriv så mange spørsmål du klarer, ett på hver linje.", 6],
        ["Lukket eller åpent?", "Merk hvert spørsmål: L = lukket (kan svares med ja/nei eller ett ord). Å = åpent (trenger en forklaring). Gjør så ett lukket spørsmål om til åpent, og ett åpent om til lukket.", 6],
        ["Velg de tre viktigste", "Kryss av ⭐ ved de tre spørsmålene som er viktigst eller mest interessante. Hvorfor valgte dere akkurat dem?", 5],
        ["Hva gjør vi nå?", "Hvordan kan dere finne svar på spørsmålene? Hvor leter dere, og hvem kan dere spørre?", 4],
        ["Tenk tilbake", "Hva lærte du? Hva var vanskelig? Hvordan kan du bruke dette senere?", 3]
      ],
      lukket: "Lukket", apent: "Åpent", viktig: "Viktigst",
      gjorApent: "Et lukket spørsmål gjort om til åpent:", gjorLukket: "Et åpent spørsmål gjort om til lukket:",
      fordeler: "Hva er fordelen med lukkede spørsmål? Og med åpne?", hvorfor: "Hvorfor valgte vi disse tre?",
      neste: "Slik kan vi finne svar:", refl: ["Hva lærte du ved å lage spørsmål selv?", "Hvilket spørsmål er du mest nysgjerrig på nå?", "Når kan du bruke denne måten å tenke på igjen?"],
      flere: "+ Flere linjer", kopier: "📋 Kopier spørsmålene", kopiert: "Spørsmålene er kopiert.", nr: "Spørsmål", maks: "Du kan bare velge tre. Fjern et kryss først.",
      fokus: "Spørsmålsfokus", lesTema: "Les temaet →"
    },
    en: {
      regler: ["Ask as many questions as you can.", "Do not stop to discuss, judge or answer.", "Write down every question exactly as it is said.", "Change any statement into a question."],
      steg: [
        ["The question focus", "Read or look at the focus. Don’t talk about it yet – just think.", 1],
        ["Produce questions", "Follow the four rules. Write as many questions as you can, one on each line.", 6],
        ["Closed or open?", "Mark each question: C = closed (can be answered with yes/no or one word). O = open (needs an explanation). Then change one closed question into an open one, and one open question into a closed one.", 6],
        ["Choose the three most important", "Tick ⭐ next to the three most important or interesting questions. Why did you choose them?", 5],
        ["What do we do next?", "How can you find answers to your questions? Where will you look, and who can you ask?", 4],
        ["Reflect", "What did you learn? What was difficult? How can you use this later?", 3]
      ],
      lukket: "Closed", apent: "Open", viktig: "Most important",
      gjorApent: "A closed question changed into an open one:", gjorLukket: "An open question changed into a closed one:",
      fordeler: "What is good about closed questions? And about open ones?", hvorfor: "Why did we choose these three?",
      neste: "This is how we can find answers:", refl: ["What did you learn by asking your own questions?", "Which question are you most curious about now?", "When can you use this way of thinking again?"],
      flere: "+ More lines", kopier: "📋 Copy the questions", kopiert: "The questions have been copied.", nr: "Question", maks: "You can only choose three. Remove one first.",
      fokus: "Question focus", lesTema: "Read the topic →"
    }
  };

  const temaValg = valgt => '<select id="ss-tema"><option value="">Velg et tema …</option>' +
    [["samfunnsfag", "Samfunnsfag"], ["engelsk", "Engelsk"]].map(([f, n]) => '<optgroup label="' + n + '">' + LV.temaer.filter(t => t.fag === f).sort((a, b) => a.trinn - b.trinn || a.tittel.localeCompare(b.tittel, "nb")).map(t => '<option value="' + t.id + '"' + (t.id === valgt ? " selected" : "") + ">" + t.trinn + ". – " + esc(t.tittel) + "</option>").join("") + "</optgroup>").join("") + "</select>";

  function start() {
    $("innhold").innerHTML = '<nav class="brodsmuler" aria-label="Brødsmuler"><a href="index.html">Forside</a> › <a href="lesestrategier.html">Lese og skrive</a> › Spørsmålsstudioet</nav>' +
      '<header class="sidehode"><p class="overlinje">Lese og tenke · i grupper</p><h1>❓ Spørsmålsstudioet</h1><p class="ingress">Gode spørsmål er starten på all læring. Her lager elevene sine egne spørsmål til et tema – i stedet for å svare på lærerens. Metoden har seks steg og tar 25–35 minutter.</p></header>' +
      '<section class="ss-del"><h2>1. Velg et spørsmålsfokus</h2><p class="mu-intro">Spørsmålsfokuset er det elevene skal stille spørsmål til: et bilde, en påstand eller en kort tekst. Det skal <strong>ikke</strong> være et spørsmål selv.</p>' +
      '<form class="ss-startskjema" id="ss-skjema"><div><label for="ss-tema">Tema (bilde og kort tekst fra temasiden)</label>' + temaValg(LV.param("tema") || "") + '</div>' +
      '<p class="ss-eller">… eller …</p><div><label for="ss-egen">Skriv din egen påstand eller tekst</label><textarea id="ss-egen" rows="2" placeholder="f.eks. «Alle elever burde ha mobilen innlevert hele skoledagen.»"></textarea></div>' +
      '<p class="ss-knapper"><button type="submit" class="knapp hoved">Start for elevene →</button> <button type="button" class="knapp" id="ss-stor">📺 Vis på storskjerm</button></p></form></section>' +
      '<section class="ss-del"><h2>Reglene</h2><ol class="ss-regler">' + T.nb.regler.map(r => "<li>" + esc(r) + "</li>").join("") + "</ol>" +
      '<p class="mu-intro">For læreren: Metoden heter «Question Formulation Technique» og er utviklet av Right Question Institute. Den virker best når elevene jobber i grupper på 3–4 med én sekretær, og når du som lærer holder deg unna innholdet og bare passer på reglene og tiden. Spørsmålene kan brukes som utgangspunkt for lesing, en undersøkelse eller en <a href="debatt.html">debatt</a>.</p>' +
      '<p class="fo-merk">Se også: <a href="tenkerutiner.html">Tenkerutiner</a> · <a href="lesestrategier.html">Lesestrategier</a> · <a href="undersokelse.html">Undersøkelse</a> · <a href="ekspertgrupper.html">Ekspertgrupper</a></p></section>';
    const lenke = stor => { const q = new URLSearchParams(); const t = $("ss-tema").value, e = $("ss-egen").value.trim(); if (e) q.set("fokus", e); else if (t) q.set("tema", t); if (stor) q.set("vis", "storskjerm"); return "sporsmal.html?" + q; };
    $("ss-skjema").addEventListener("submit", e => { e.preventDefault(); if (!$("ss-tema").value && !$("ss-egen").value.trim()) { $("ss-tema").focus(); return; } location.href = lenke(false); });
    $("ss-stor").addEventListener("click", () => { if (!$("ss-tema").value && !$("ss-egen").value.trim()) { $("ss-tema").focus(); return; } location.href = lenke(true); });
  }

  function okt() {
    const tema = LV.temaer.find(t => t.id === LV.param("tema"));
    const egen = (LV.param("fokus") || "").slice(0, 400);
    const sp = tema && tema.fag === "engelsk" && !egen ? "en" : "nb";
    const t = T[sp];
    const stor = LV.param("vis") === "storskjerm";
    document.title = "Spørsmålsstudioet – " + (LV.config ? LV.config.navn : "Les verden");
    const fokus = egen ? '<blockquote class="ss-fokus-tekst">' + esc(egen) + "</blockquote>" :
      '<div class="ss-fokus-tema">' + (tema.bilde ? '<figure><img src="' + esc(tema.bilde) + '" alt="' + esc(tema.bildeAlt || "") + '">' + (tema.kreditt ? "<figcaption>Foto: " + esc(tema.kreditt) + "</figcaption>" : "") + "</figure>" : "") +
      '<div><h2' + (sp === "en" ? ' lang="en"' : "") + ">" + esc(tema.tittel) + "</h2><p>" + esc(tema.kort || "") + "</p>" + (stor ? "" : '<p><a href="tema.html?id=' + encodeURIComponent(tema.id) + '">' + t.lesTema + "</a></p>") + "</div></div>";
    let h = '<nav class="brodsmuler" aria-label="Brødsmuler"><a href="index.html">Forside</a> › <a href="sporsmal.html">Spørsmålsstudioet</a> › ' + esc(tema ? tema.tittel : "Egen fokus") + "</nav>" +
      '<header class="sidehode"><p class="overlinje">❓ Spørsmålsstudioet</p><h1' + (sp === "en" ? ' lang="en"' : "") + ">" + esc(t.fokus) + "</h1></header>" +
      '<section class="ss-fokus"' + (sp === "en" ? ' lang="en"' : "") + ">" + fokus + "</section>";
    if (stor) {
      h += '<div id="ss-stortrinn"' + (sp === "en" ? ' lang="en"' : "") + "></div>";
      $("innhold").innerHTML = h;
      document.body.classList.add("storskjerm");
      let n = 0;
      const vis = () => {
        const s = t.steg[n];
        $("ss-stortrinn").innerHTML = '<section class="tu-stor" aria-live="polite"><p class="tu-nr">' + (n + 1) + " / " + t.steg.length + " · ca. " + s[2] + " min</p><h2>" + esc(s[0]) + '</h2><p class="tu-sp">' + esc(s[1]) + "</p>" +
          (n === 1 ? '<ol class="ss-regler ss-regler-stor">' + t.regler.map(r => "<li>" + esc(r) + "</li>").join("") + "</ol>" : "") +
          '<p class="tu-nav"><button type="button" class="knapp" id="ss-forrige"' + (n ? "" : " disabled") + '>←</button><button type="button" class="knapp hoved" id="ss-neste"' + (n < t.steg.length - 1 ? "" : " disabled") + ">→</button></p></section>";
        $("ss-forrige").addEventListener("click", () => { n--; vis(); });
        $("ss-neste").addEventListener("click", () => { n++; vis(); });
      };
      vis();
      return;
    }
    const steg = (i, innhold) => '<section class="ss-del ss-steg" id="steg-' + (i + 1) + '"><h2><span class="ho-nr" aria-hidden="true">' + (i + 1) + "</span> " + esc(t.steg[i][0]) + ' <small class="ss-tid">ca. ' + t.steg[i][2] + " min</small></h2><p class=\"ss-instruks\">" + esc(t.steg[i][1]) + "</p>" + innhold + "</section>";
    const rad = i => '<li class="ss-rad"><label class="skjult-visuelt" for="ss-q' + i + '">' + t.nr + " " + (i + 1) + '</label><input type="text" id="ss-q' + i + '" autocomplete="off">' +
      '<fieldset class="ss-type"><legend class="skjult-visuelt">' + t.nr + " " + (i + 1) + ': ' + t.lukket + " / " + t.apent + '</legend><label title="' + t.lukket + '"><input type="radio" name="ss-type' + i + '" value="L"> ' + t.lukket[0] + '</label><label title="' + t.apent + '"><input type="radio" name="ss-type' + i + '" value="Å"> ' + t.apent[0] + "</label></fieldset>" +
      '<label class="ss-stjerne" title="' + t.viktig + '"><input type="checkbox" name="ss-v' + i + '"><span aria-hidden="true">⭐</span><span class="skjult-visuelt">' + t.viktig + "</span></label></li>";
    h += '<div' + (sp === "en" ? ' lang="en"' : "") + ">" +
      steg(1, '<ol class="ss-regler">' + t.regler.map(r => "<li>" + esc(r) + "</li>").join("") + '</ol><ol class="ss-liste" id="ss-liste">' + Array.from({ length: 10 }, (x, i) => rad(i)).join("") + '</ol><p class="ss-knapper"><button type="button" class="knapp" id="ss-flere">' + t.flere + '</button> <button type="button" class="knapp" id="ss-kopier">' + t.kopier + '</button> <span class="status" id="ss-status" role="status"></span></p>') +
      steg(2, '<p class="ss-merk">↑ ' + t.lukket[0] + " / " + t.apent[0] + '</p><label for="ss-apent">' + t.gjorApent + '</label><input type="text" id="ss-apent"><label for="ss-lukket">' + t.gjorLukket + '</label><input type="text" id="ss-lukket"><label for="ss-fordel">' + t.fordeler + '</label><textarea id="ss-fordel" rows="3"></textarea>') +
      steg(3, '<p class="ss-merk" id="ss-valgt" aria-live="polite">↑ ⭐ 0 / 3</p><label for="ss-hvorfor">' + t.hvorfor + '</label><textarea id="ss-hvorfor" rows="3"></textarea>') +
      steg(4, '<label for="ss-plan">' + t.neste + '</label><textarea id="ss-plan" rows="4"></textarea>' +
        '<p class="ss-tips">' + (tema ? '<a href="tema.html?id=' + encodeURIComponent(tema.id) + '">📖 ' + esc(tema.tittel) + "</a> · " : "") + '<a href="kilder.html">📚 Kilder</a> · <a href="kildedetektiv.html">🔍 Kildedetektiven</a> · <a href="intervju.html">🎤 Intervju</a> · <a href="undersokelse.html">📊 Undersøkelse</a></p>') +
      steg(5, t.refl.map((r, i) => '<label for="ss-r' + i + '">' + esc(r) + '</label><textarea id="ss-r' + i + '" rows="2"></textarea>').join("")) + "</div>";
    $("innhold").innerHTML = h;

    let antall = 10;
    $("ss-flere").addEventListener("click", () => { $("ss-liste").insertAdjacentHTML("beforeend", Array.from({ length: 5 }, (x, i) => rad(antall + i)).join("")); antall += 5; $("ss-q" + (antall - 5)).focus(); });
    $("ss-liste").addEventListener("keydown", e => { if (e.key === "Enter" && e.target.type === "text") { e.preventDefault(); const nr = +e.target.id.slice(4) + 1; if (nr >= antall) $("ss-flere").click(); else $("ss-q" + nr).focus(); } });
    $("ss-liste").addEventListener("change", e => {
      if (e.target.type !== "checkbox") return;
      const valgt = [...document.querySelectorAll(".ss-stjerne input:checked")];
      if (valgt.length > 3) { e.target.checked = false; $("ss-valgt").textContent = t.maks; return; }
      $("ss-valgt").textContent = "↑ ⭐ " + valgt.length + " / 3";
    });
    $("ss-kopier").addEventListener("click", () => {
      const q = [...document.querySelectorAll(".ss-rad")].map(r => { const v = r.querySelector("input[type=text]").value.trim(); if (!v) return ""; const ty = r.querySelector(".ss-type input:checked"); return (r.querySelector(".ss-stjerne input").checked ? "⭐ " : "") + v + (ty ? " (" + ty.value + ")" : ""); }).filter(Boolean);
      const tekst = (tema ? tema.tittel : egen) + "\n\n" + q.map((x, i) => (i + 1) + ". " + x).join("\n");
      (navigator.clipboard ? navigator.clipboard.writeText(tekst) : Promise.reject()).then(() => { $("ss-status").textContent = t.kopiert; }, () => { $("ss-status").textContent = ""; });
    });
    const linje = document.createElement("div");
    linje.className = "svarlinje";
    linje.innerHTML = '<div class="svarlinje-indre"><label class="skjult-visuelt" for="elevnavn">Navn</label><input id="elevnavn" type="text" placeholder="Navn" autocomplete="off"><span class="status" role="status" aria-live="polite"></span></div>';
    document.body.appendChild(linje);
  }

  document.addEventListener("DOMContentLoaded", () => {
    if (LV.temaer.find(t => t.id === LV.param("tema")) || (LV.param("fokus") || "").trim()) okt(); else start();
  });
})();
