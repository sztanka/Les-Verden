/* =========================================================
   Les verden – Grammar and vocabulary (engelsk)
   grammatikk.html            → oversikt
   grammatikk.html?id=<id>    → ett emne (data/grammatikk/<id>.js)
   Ingenting lagres.
   ========================================================= */
(function () {
  const LV = window.LV;
  const $ = id => document.getElementById(id);
  const esc = s => LV.esc(String(s == null ? "" : s));
  const fmt = s => esc(s).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\*(.+?)\*/g, "<em>$1</em>");
  const bland = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const kanLese = "speechSynthesis" in window;

  function les(tekst) {
    if (!kanLese) return;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(tekst);
    u.lang = "en-GB"; u.rate = 0.9;
    const stemme = speechSynthesis.getVoices().find(v => /^en-GB/i.test(v.lang)) || speechSynthesis.getVoices().find(v => /^en/i.test(v.lang));
    if (stemme) u.voice = stemme;
    speechSynthesis.speak(u);
  }
  const lesKnapp = (tekst, etikett) => kanLese ? '<button type="button" class="gr-les" data-les="' + esc(tekst) + '" aria-label="' + esc(etikett || "Listen: " + tekst) + '">🔊</button>' : "";

  // Rutenett: stavemåte × uttale
  function diagram(markert) {
    const m = markert || "";
    const celle = (id, navn, eks, tekst) => '<td class="gr-celle' + ((id && m === id) || (m === "homophones" && (id === "homonyms" || id === "heterographs")) || (m === "homographs" && (id === "homonyms" || id === "heteronyms")) ? " markert" : "") + '">' +
      (id ? '<a href="grammatikk.html?id=' + id + '"><strong>' + navn + "</strong><span>" + eks + "</span><small>" + tekst + "</small></a>" : "<div><strong>" + navn + "</strong><span>" + eks + "</span><small>" + tekst + "</small></div>") + "</td>";
    return '<figure class="gr-diagram"><table><caption>Spelling and sound – how the word groups fit together</caption>' +
      '<thead><tr><td></td><th scope="col"' + (m === "homophones" ? ' class="markert"' : "") + '>Same sound<br><a href="grammatikk.html?id=homophones">= homophones</a></th><th scope="col">Different sound</th></tr></thead><tbody>' +
      '<tr><th scope="row"' + (m === "homographs" ? ' class="markert"' : "") + '>Same spelling<br><a href="grammatikk.html?id=homographs">= homographs</a></th>' +
      celle("homonyms", "Homonyms", "bat – bat", "flaggermus / balltre") + celle("heteronyms", "Heteronyms", "lead – lead", "/liːd/ lede / /led/ bly") + "</tr>" +
      '<tr><th scope="row">Different spelling</th>' + celle("heterographs", "Heterographs", "night – knight", "natt / ridder") +
      celle("", "Different words", "cat – dog", "nothing in common") + "</tr></tbody></table>" +
      '<figcaption lang="nb">Les tabellen slik: Ord som <strong>skrives likt</strong> (øverste rad) er homografer. Ord som <strong>høres like ut</strong> (venstre kolonne) er homofoner.</figcaption></figure>';
  }

  // ---------- Oversikt ----------
  function oversikt() {
    document.title = "Grammar and vocabulary – " + (LV.config ? LV.config.navn : "Les verden");
    let h = '<nav class="brodsmuler" aria-label="Brødsmuler" lang="nb"><a href="index.html">Forside</a> › <a href="index.html?fag=engelsk">Engelsk</a> › Grammar and vocabulary</nav>' +
      '<header class="sidehode"><h1>Grammar and vocabulary</h1><p class="ingress">Learn how English works – with short explanations, lists of important words and exercises you can check yourself.</p>' +
      '<p class="gr-norsk-ingress" lang="nb">Her finner du forklaringer på engelsk grammatikk og ordforråd, med lister over viktige ord og oppgaver du kan rette selv. Dobbeltklikk på et ord for å slå det opp i ordboka.</p></header>';
    LV.grammatikkGrupper.forEach(g => {
      h += '<section class="gr-gruppe"><h2><span aria-hidden="true">' + g.ikon + "</span> " + esc(g.tittel) + ' <small lang="nb">' + esc(g.norsk) + "</small></h2><p>" + fmt(g.ingress) + "</p>" +
        '<ul class="gr-kortliste">' + g.emner.map(id => LV.grammatikkListe.find(e => e.id === id)).filter(Boolean).map(e =>
          '<li><a class="gr-kort" href="grammatikk.html?id=' + e.id + '"><span class="gr-kort-ikon" aria-hidden="true">' + e.ikon + "</span><strong>" + esc(e.tittel) + "</strong><span>" + esc(e.kort) +
          '</span><small lang="nb">' + esc(e.norsk) + "</small></a></li>").join("") + "</ul>" + diagram("") +
        '<section class="gr-ovelser" id="ovelser"><h3>Quick quiz: Which word group?</h3><div id="gr-quiz"></div></section></section>';
    });
    h += '<p class="gr-kommer" lang="nb">Flere emner kommer, for eksempel ordklasser, verbtider og vanlige feil.</p>';
    $("innhold").innerHTML = h;
    quiz($("gr-quiz"), [
      { s: "«their – there – they're»", valg: ["Homophones / heterographs", "Homographs", "Heteronyms"], riktig: 0, forklaring: "They sound the same but are spelled differently." },
      { s: "«tear (from your eye) – tear (to rip)»", valg: ["Heteronyms", "Homonyms", "Heterographs"], riktig: 0, forklaring: "Same spelling, different pronunciation: heteronyms (and homographs)." },
      { s: "«bank (money) – bank (river)»", valg: ["Homonyms", "Heteronyms", "Heterographs"], riktig: 0, forklaring: "Same spelling and same sound: homonyms." },
      { s: "«knight – night»", valg: ["Heterographs", "Homographs", "Heteronyms"], riktig: 0, forklaring: "Same sound, different spelling: heterographs (and homophones)." },
      { s: "«REcord – reCORD»", valg: ["Heteronyms", "Homonyms", "Heterographs"], riktig: 0, forklaring: "Same spelling, different stress: heteronyms." },
      { s: "«bear (animal) – bear (put up with)»", valg: ["Homonyms", "Heterographs", "Heteronyms"], riktig: 0, forklaring: "Same spelling and same sound: homonyms." },
      { s: "«flour – flower»", valg: ["Heterographs", "Homonyms", "Heteronyms"], riktig: 0, forklaring: "Same sound, different spelling: heterographs." },
      { s: "Which word group includes all words that are spelled the same?", valg: ["Homographs", "Homophones", "Heterographs"], riktig: 0, forklaring: "Graph = writing. Homographs are written the same." }
    ]);
  }

  // ---------- Quiz ----------
  function quiz(el, sporsmal) {
    let poeng = 0, svart = 0;
    const liste = bland(sporsmal).map(q => { const valg = bland(q.valg.map((v, i) => ({ v: v, ok: i === q.riktig }))); return Object.assign({}, q, { blandet: valg }); });
    el.innerHTML = '<ol class="gr-quiz">' + liste.map((q, i) => '<li class="gr-sp" data-i="' + i + '"><p>' + fmt(q.s) + '</p><div class="gr-valg">' +
      q.blandet.map((v, j) => '<button type="button" class="knapp quizknapp" data-j="' + j + '">' + fmt(v.v) + "</button>").join("") + '</div><p class="gr-tilbake" aria-live="polite"></p></li>').join("") +
      '</ol><p class="gr-poeng" aria-live="polite"></p><button type="button" class="knapp" data-igjen>↻ Try again</button>';
    el.querySelectorAll(".gr-sp").forEach(li => li.querySelectorAll(".quizknapp").forEach(b => b.addEventListener("click", () => {
      const q = liste[+li.dataset.i], v = q.blandet[+b.dataset.j];
      if (li.dataset.ferdig) return;
      li.dataset.ferdig = "1"; svart++; if (v.ok) poeng++;
      li.querySelectorAll(".quizknapp").forEach((k, j) => { k.disabled = true; if (q.blandet[j].ok) k.classList.add("riktig"); });
      if (!v.ok) b.classList.add("feil");
      li.querySelector(".gr-tilbake").innerHTML = (v.ok ? "<strong>✓ Correct!</strong> " : "<strong>✗ Not quite.</strong> ") + fmt(q.forklaring || "");
      el.querySelector(".gr-poeng").textContent = "Score: " + poeng + " / " + svart + (svart === liste.length ? " – " + (poeng === svart ? "perfect! 🎉" : "well done!") : "");
    })));
    el.querySelector("[data-igjen]").addEventListener("click", () => quiz(el, sporsmal));
  }

  // ---------- Ett emne ----------
  async function emne(id) {
    const info = LV.grammatikkListe.find(e => e.id === id);
    if (!info) { $("innhold").innerHTML = '<p class="melding" lang="nb">Fant ikke emnet. <a href="grammatikk.html">Til oversikten</a></p>'; return; }
    LV.grammatikk = null;
    await LV.lastSkript("data/grammatikk/" + encodeURIComponent(id) + ".js");
    const g = LV.grammatikk;
    document.title = g.tittel + " – Grammar and vocabulary – " + (LV.config ? LV.config.navn : "Les verden");
    let h = '<nav class="brodsmuler" aria-label="Brødsmuler" lang="nb"><a href="index.html">Forside</a> › <a href="index.html?fag=engelsk">Engelsk</a> › <a href="grammatikk.html">Grammar and vocabulary</a> › ' + esc(g.tittel) + "</nav>" +
      '<header class="sidehode gr-hode"><p class="overlinje">Grammar and vocabulary</p><h1><span aria-hidden="true">' + g.ikon + "</span> " + esc(g.tittel) + "</h1>" +
      '<p class="ingress">' + fmt(g.ingress) + "</p>" + (g.opphav ? '<p class="gr-opphav"><span>Word origin:</span> ' + esc(g.opphav) + "</p>" : "") + "</header>";
    h += '<nav class="gr-snarvei" aria-label="På denne siden" lang="nb"><a href="#forklaring">Forklaring</a><a href="#ordliste">Ordliste</a><a href="#ovelser">Øvelser</a><a href="#oppgaver">Oppgaver</a></nav>';
    h += '<section class="gr-forklaring" id="forklaring"><h2>What is it?</h2>' + g.forklaring.map(p => "<p>" + fmt(p) + "</p>").join("") +
      '<details class="gr-norsk" lang="nb" open><summary>🇳🇴 Forklaring på norsk</summary><p>' + fmt(g.norsk) + "</p></details>" +
      diagram(g.id) +
      '<aside class="gr-husk"><h3>💡 Remember</h3><ul>' + g.husk.map(x => "<li>" + fmt(x) + "</li>").join("") + "</ul></aside></section>";
    h += '<section id="ordliste"><h2>Word list</h2><p class="gr-hint" lang="nb">Trykk på 🔊 for å høre eksempelsetningen. Dobbeltklikk på et ord for å slå det opp i ordboka.</p>';
    g.grupper.forEach(gr => {
      h += '<h3 class="gr-gruppetittel">' + esc(gr.tittel) + "</h3>" + (gr.tekst ? '<p class="gr-gruppetekst">' + fmt(gr.tekst) + "</p>" : "") + '<ul class="gr-ordsett">' +
        gr.ord.map(sett => '<li class="gr-sett"><p class="gr-settord">' + sett.map(o => "<strong>" + esc(o.ord) + "</strong>").join(" – ") + "</p><dl>" +
          sett.map(o => '<div class="gr-ord"><dt><strong>' + esc(o.ord) + "</strong>" + (o.uttale ? ' <span class="gr-uttale">' + esc(o.uttale) + "</span>" : "") + "</dt>" +
            "<dd>" + esc(o.betyr) + ' <span class="gr-oversatt" lang="nb">(' + esc(o.norsk) + ")</span>" +
            (o.eks ? '<span class="gr-eks">' + lesKnapp(o.eks, "Listen: " + o.eks) + " <em>" + esc(o.eks) + "</em></span>" : "") + "</dd></div>").join("") + "</dl></li>").join("") + "</ul>";
    });
    h += "</section>";
    if (g.obs) h += '<aside class="gr-obs"><h2>' + esc(g.obs.tittel) + "</h2>" + g.obs.tekst.map(p => "<p>" + fmt(p) + "</p>").join("") + "</aside>";
    h += '<section class="gr-ovelser" id="ovelser"><h2>Exercises</h2><p class="gr-hint" lang="nb">Velg riktig svar. Du får svar med en gang.</p><div id="gr-quiz"></div></section>';
    h += '<section class="gr-oppgaver" id="oppgaver"><h2>Your turn</h2><ol>' + g.oppgaver.map((o, i) =>
      '<li><p>' + fmt(o) + '</p><label class="skjult-visuelt" for="gr-svar' + i + '">Your answer</label><textarea id="gr-svar' + i + '" class="svar" rows="4" placeholder="Write here …"></textarea></li>').join("") +
      '</ol><div class="spill-knapper"><button type="button" class="knapp hoved" id="gr-kopier">Copy my answers</button><span id="gr-status" role="status" aria-live="polite"></span></div>' +
      '<p class="gr-hint" lang="nb">Svarene lagres ikke. Kopier dem og lim dem inn i et dokument før du lukker siden.</p></section>';
    const se = (g.se || []).map(x => LV.grammatikkListe.find(e => e.id === x)).filter(Boolean);
    if (se.length) h += '<section><h2>See also</h2><ul class="gr-kortliste">' + se.map(e => '<li><a class="gr-kort" href="grammatikk.html?id=' + e.id + '"><span class="gr-kort-ikon" aria-hidden="true">' + e.ikon + "</span><strong>" + esc(e.tittel) + "</strong><span>" + esc(e.kort) + "</span></a></li>").join("") + "</ul></section>";
    h += '<p><a href="grammatikk.html">← All grammar and vocabulary topics</a></p>';
    $("innhold").innerHTML = h;
    quiz($("gr-quiz"), g.ovelser);
    $("gr-kopier").addEventListener("click", () => {
      const tekst = "Grammar and vocabulary: " + g.tittel + "\n\n" + g.oppgaver.map((o, i) => (i + 1) + ". " + o.replace(/\*/g, "") + "\n" + ($("gr-svar" + i).value.trim() || "(no answer)")).join("\n\n") + "\n";
      const ok = () => { $("gr-status").textContent = "Copied!"; };
      if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(tekst).then(ok, reserve); else reserve();
      function reserve() { const t = document.createElement("textarea"); t.value = tekst; document.body.appendChild(t); t.select(); try { document.execCommand("copy"); ok(); } catch (e) { window.prompt("Ctrl+C / Cmd+C", tekst); } t.remove(); }
    });
  }

  document.addEventListener("click", e => { const b = e.target.closest(".gr-les"); if (b) les(b.dataset.les); });
  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".hovedmeny a").forEach(a => { if (a.getAttribute("href") === "index.html?fag=engelsk") a.setAttribute("aria-current", "page"); });
    const id = LV.param("id");
    if (id) emne(id); else oversikt();
  });
})();
