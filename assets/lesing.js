/* =========================================================
   Les verden – Reading Room
   lesing.html              → oversikt over tekstene
   lesing.html?id=<id>      → én tekst (data/lesing/<id>.js)
   &versjon=lett            → åpner den lettere versjonen
   &laerer=1                → viser fasit og lærerinformasjon
   Alle tekstene er i det fri (public domain). Ingenting lagres.
   ========================================================= */
(function () {
  const LV = window.LV;
  const $ = id => document.getElementById(id);
  const esc = s => LV.esc(String(s == null ? "" : s));
  const fmt = s => esc(s).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\*(.+?)\*/g, "<em>$1</em>");
  const laerer = LV.param("laerer") === "1";
  const navn = () => (LV.config ? LV.config.navn : "Les verden");
  const lesetid = ord => Math.max(5, Math.round(ord / 130 / 5) * 5);
  const stjerner = n => '<span class="lr-niva n' + n + '" title="' + LV.lesenivaer[n] + '"><span aria-hidden="true">' + "●".repeat(n) + "○".repeat(3 - n) + "</span> " + LV.lesenivaer[n] + "</span>";

  // Et eget, tegnet bokomslag
  function omslag(t, stor) {
    const [a, b] = t.farger;
    return '<span class="lr-omslag' + (stor ? " stor" : "") + '" style="--a:' + a + ";--b:" + b + '" aria-hidden="true"><span class="lr-ramme">' +
      '<span class="lr-o-tittel' + (t.tittel.length > 22 || t.tittel.split(/\s+/).some(w => w.length > 9) ? " lang" : "") + '">' + esc(t.tittel) + '</span><span class="lr-o-ikon">' + t.ikon + '</span><span class="lr-o-forf">' + esc(t.forfatter) + "</span></span></span>";
  }

  // ---------- Oversikt ----------
  function oversikt() {
    document.title = "Reading Room – " + navn();
    let type = LV.param("type") || "", niva = LV.param("niva") || "";
    $("innhold").innerHTML = '<nav class="brodsmuler" aria-label="Brødsmuler"><a href="index.html">Forside</a> › <a href="index.html?fag=engelsk">Engelsk</a> › Reading Room</nav>' +
      '<header class="sidehode lr-hode"><p class="overlinje" lang="en">Stories · Reading</p><h1 lang="en">Reading Room</h1>' +
      '<p class="ingress">Klassiske noveller og sanne historier på engelsk – hele originalteksten, en lettere versjon, ordliste, «stopp og tenk» og oppgaver før, under og etter lesingen. Alle tekstene er i det fri, fordi forfatterne døde for over 70 år siden.</p></header>' +
      '<div class="lr-hvordan"><h2>Slik jobber du med en tekst</h2><ol>' +
      "<li><strong>Før du leser:</strong> les om forfatteren og bakgrunnen, og svar på spørsmålene.</li>" +
      "<li><strong>Mens du leser:</strong> velg <em lang=\"en\">Original text</em> eller <em lang=\"en\">Easier version</em>. Trykk på ord med prikkete strek for forklaring, og stopp ved hver ✋.</li>" +
      "<li><strong>Etter at du har lest:</strong> ta quizen, svar på spørsmålene, se nærmere på teksten, diskuter og skriv.</li></ol><p class=\"lr-strat-lenke\">🧠 Tips: Se <a href=\"lesestrategier.html\">lesestrategiene</a> – de hjelper deg før, under og etter lesingen.</p></div>" +
      '<div class="fo-filter" role="group" aria-label="Filtrer tekstene"><div class="fo-filter-rad"><span class="etikett">Type:</span>' +
      [["", "Alle"], ["fiction", "Short stories"], ["speech", "Speeches"], ["true", "Non-fiction"]].map(([v, t]) => '<button class="knapp liten" data-type="' + v + '"' + (v ? ' lang="en"' : "") + ">" + t + "</button>").join("") +
      '</div><div class="fo-filter-rad"><span class="etikett">Nivå:</span><button class="knapp liten" data-niva="">Alle</button>' +
      [1, 2, 3].map(n => '<button class="knapp liten" data-niva="' + n + '" lang="en">' + LV.lesenivaer[n] + "</button>").join("") + "</div></div>" +
      '<p class="fo-antall" id="lr-antall" aria-live="polite"></p><ul class="lr-hylle" id="lr-hylle"></ul>' +
      '<p class="fo-merk">Noen av tekstene har skumle eller sterke scener. Under «For læreren» på hver tekst står det hva teksten inneholder og hvilke trinn den passer for.</p>';
    function tegn() {
      document.querySelectorAll("[data-type]").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.type === type)));
      document.querySelectorAll("[data-niva]").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.niva === niva)));
      const liste = LV.lesetekster.filter(t => (!type || type === (t.sjanger === "Short story" ? "fiction" : t.sjanger === "Speech" ? "speech" : "true")) && (!niva || String(t.nivaa) === niva));
      $("lr-antall").textContent = liste.length + (liste.length === 1 ? " tekst" : " tekster");
      $("lr-hylle").innerHTML = liste.map(t => '<li><a class="lr-kort" href="lesing.html?id=' + t.id + '">' + omslag(t) +
        '<span class="lr-kort-tekst" lang="en"><strong>' + esc(t.tittel) + "</strong><span class=\"lr-kort-forf\">" + esc(t.forfatter) + " · " + t.ar + "</span><span>" + esc(t.kort) + "</span>" +
        '<span class="lr-kort-meta">' + stjerner(t.nivaa) + (t.kontekst ? '<span class="lr-merke lr-merke-kontekst" title="Har en boks om historisk kontekst">🕰️ Context</span>' : "") + (t.utenTekst ? '<span class="lr-merke lr-merke-uten" title="Teksten deles ut av læreren">📕 Text from teacher</span>' : "") + '<span class="lr-merke">' + esc(t.sjanger) + '</span><span class="lr-merke" lang="nb">' + t.trinn + ". trinn</span><span class=\"lr-merke\" lang=\"nb\">ca. " + lesetid(t.ord) + " min</span></span></span></a></li>").join("");
      const p = new URLSearchParams(); if (type) p.set("type", type); if (niva) p.set("niva", niva);
      history.replaceState(null, "", "lesing.html" + (p.toString() ? "?" + p : ""));
    }
    document.querySelectorAll("[data-type]").forEach(b => b.addEventListener("click", () => { type = b.dataset.type; tegn(); }));
    document.querySelectorAll("[data-niva]").forEach(b => b.addEventListener("click", () => { niva = b.dataset.niva; tegn(); }));
    tegn();
  }

  // ---------- Ordforklaringer i teksten ----------
  // Første forekomst av hvert ord i ordlista blir en knapp med forklaring.
  function merkOrd(avsnitt, ordliste) {
    const html = avsnitt.map(p => typeof p === "string" ? fmt(p) : p);
    const brikker = [];
    ordliste.slice().sort((a, b) => b[0].length - a[0].length).forEach(o => {
      const re = new RegExp("(^|[^A-Za-z\\u00C0-\\u017F])(" + o[0].replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/'/g, "[’']") + ")(?![A-Za-z])", "i");
      for (let i = 0; i < html.length; i++) {
        if (typeof html[i] !== "string") continue;
        const m = html[i].match(re);
        if (!m) continue;
        const n = brikker.length;
        brikker.push({ vis: m[2], o: o });
        html[i] = html[i].slice(0, m.index) + m[1] + "\u0001" + n + "\u0002" + html[i].slice(m.index + m[0].length);
        break;
      }
    });
    return html.map(h => typeof h !== "string" ? h : h.replace(/\u0001(\d+)\u0002/g, (_, n) => {
      const b = brikker[n], id = "lr-ord-" + n;
      return '<span class="ord-wrap"><button type="button" class="ord" aria-expanded="false" aria-controls="' + id + '">' + b.vis + "</button>" +
        '<span class="ordforklaring" id="' + id + '" role="tooltip" hidden><strong>' + esc(b.o[0]) + "</strong>" + esc(b.o[1]) + '<span class="lr-norsk" lang="nb">🇳🇴 ' + esc(b.o[2]) + "</span></span></span>";
    }));
  }
  function lukkAlleOrd(unntak) {
    document.querySelectorAll(".ord[aria-expanded='true']").forEach(b => {
      if (b === unntak) return;
      b.setAttribute("aria-expanded", "false");
      $(b.getAttribute("aria-controls")).hidden = true;
    });
  }
  function kobleOrd() {
    document.addEventListener("click", e => {
      const k = e.target.closest(".ord");
      if (!k) { if (!e.target.closest(".ordforklaring")) lukkAlleOrd(); return; }
      const boks = $(k.getAttribute("aria-controls"));
      const apne = k.getAttribute("aria-expanded") !== "true";
      lukkAlleOrd(k);
      k.setAttribute("aria-expanded", String(apne));
      boks.hidden = !apne;
      if (apne) {
        boks.style.left = "0px";
        const r = boks.getBoundingClientRect();
        if (r.right > window.innerWidth - 8) boks.style.left = (window.innerWidth - 8 - r.right) + "px";
      }
    });
    document.addEventListener("keydown", e => { if (e.key === "Escape") lukkAlleOrd(); });
  }

  // ---------- Svar ----------
  let svarListe = [], endret = false;
  function svarfelt(id, sporsmal, gruppe) {
    svarListe.push({ id: id, sporsmal: sporsmal.replace(/\*\*/g, ""), gruppe: gruppe });
    return '<label class="skjult-visuelt" for="svar-' + id + '">Your answer</label><textarea id="svar-' + id + '" class="svar" rows="3" placeholder="Your answer …"></textarea>';
  }
  function svarlinje(tittel) {
    const linje = document.createElement("div");
    linje.className = "svarlinje";
    linje.innerHTML = '<div class="svarlinje-indre"><label class="skjult-visuelt" for="elevnavn">Navn</label><input id="elevnavn" type="text" placeholder="Navn" autocomplete="off">' +
      '<button class="knapp hoved" id="kopier">Kopier mine svar</button><button class="knapp fare" id="slett">Slett alle svar</button><span class="status" id="status" role="status" aria-live="polite"></span></div>';
    document.body.appendChild(linje);
    document.addEventListener("input", e => { if (e.target.matches("textarea.svar")) { endret = true; $("status").textContent = ""; } });
    $("kopier").addEventListener("click", () => {
      const fylt = svarListe.filter(s => $("svar-" + s.id).value.trim());
      if (!fylt.length) { $("status").textContent = "Du har ikke skrevet noen svar ennå."; return; }
      const n = $("elevnavn").value.trim();
      let forrige = null;
      const tekst = (n ? "Navn: " + n + "\n" : "") + "Tekst: " + tittel + "\nDato: " + new Date().toLocaleDateString("nb-NO") + "\n" +
        fylt.map(s => { const hode = s.gruppe !== forrige ? "\n" + s.gruppe.toUpperCase() + "\n" : ""; forrige = s.gruppe; return hode + s.sporsmal + "\nSvar: " + $("svar-" + s.id).value.trim() + "\n"; }).join("\n");
      const ok = () => { endret = false; $("status").textContent = "Svarene er kopiert! Lim dem inn i et dokument."; };
      const reserve = () => { const x = document.createElement("textarea"); x.value = tekst; document.body.appendChild(x); x.select(); let lyktes = false; try { lyktes = document.execCommand("copy"); } catch (e) { lyktes = false; } x.remove(); if (lyktes) ok(); else window.prompt("Ctrl+C / Cmd+C", tekst); };
      if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(tekst).then(ok, reserve); else reserve();
    });
    $("slett").addEventListener("click", () => { if (!confirm("Vil du slette alle svarene?")) return; svarListe.forEach(s => { $("svar-" + s.id).value = ""; }); endret = false; $("status").textContent = "Svarene er slettet."; });
    window.addEventListener("beforeunload", e => { if (!endret) return; e.preventDefault(); e.returnValue = ""; });
  }

  // ---------- Quiz: flervalg som retter seg selv (ingenting lagres) ----------
  const STRATEGINAVN = { vol: "KWL", skumlese: "Skimming", forutsi: "Predicting", stopp: "Check understanding", ord: "New words", visualisere: "Visualising", mellom: "Inferring", koble: "Connecting", notater: "Note-taking", sammendrag: "Summarising", lete: "Scanning", vurdere: "Evaluating", naerlese: "Close reading" };
  let quizRekke = [];  // svaralternativene stokkes hver gang siden lastes
  function stokk(n) { const a = [...Array(n).keys()]; for (let i = n - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  function quizHtml(id) {
    const q = LV.lesequiz && LV.lesequiz[id];
    if (!q || !q.length) return "";
    quizRekke = q.map(x => stokk(x.valg.length));
    return '<section class="fo-oppg lr-quiz" id="quiz"><h3><span aria-hidden="true">✅</span> Quick quiz</h3><p class="fo-oppg-tekst">Choose the best answer. You get the answer at once – nothing is saved.</p><ol class="lr-quiz-liste">' +
      q.map((x, i) => '<li class="lr-qs" data-i="' + i + '"><fieldset><legend>' + fmt(x.s) + "</legend>" +
        '<div class="lr-qvalg">' + quizRekke[i].map((j, pos) => '<button type="button" class="lr-qknapp" data-j="' + j + '"><span class="lr-qbokstav" aria-hidden="true">' + "ABCD"[pos] + "</span> " + fmt(x.valg[j]) + "</button>").join("") + "</div>" +
        '<div class="lr-qsvar" role="status" aria-live="polite"></div></fieldset></li>').join("") +
      '</ol><div class="lr-qresultat" aria-live="polite"></div></section>';
  }
  function kobleQuiz() {
    const boks = document.querySelector(".lr-quiz");
    if (!boks) return;
    const q = LV.lesequiz[LV.param("id")];
    const res = boks.querySelector(".lr-qresultat");
    let poeng = 0, besvart = 0;
    boks.addEventListener("click", e => {
      const b = e.target.closest(".lr-qknapp");
      if (b) {
        const li = b.closest(".lr-qs"); if (li.classList.contains("ferdig")) return;
        const x = q[+li.dataset.i], j = +b.dataset.j, rett = j === x.riktig;
        li.classList.add("ferdig", rett ? "rett" : "feil");
        li.querySelectorAll(".lr-qknapp").forEach(k => { const n = +k.dataset.j; k.disabled = true; if (n === x.riktig) k.classList.add("er-rett"); if (n === j && !rett) k.classList.add("er-feil"); if (n === j) k.setAttribute("aria-pressed", "true"); });
        li.querySelector(".lr-qsvar").innerHTML = "<p><strong>" + (rett ? "✔ Correct!" : "✘ Not quite. The right answer is " + "ABCD"[quizRekke[+li.dataset.i].indexOf(x.riktig)] + ".") + "</strong> " + fmt(x.forklaring) + "</p>" +
          (x.strategi ? '<p class="lr-qstrat"><a href="lesestrategier.html#' + x.strategi + '">🧠 Strategy: ' + (STRATEGINAVN[x.strategi] || x.strategi) + "</a></p>" : "");
        if (rett) poeng++; besvart++;
        if (besvart === q.length) {
          const melding = poeng === q.length ? "Excellent – full score! 🎉" : poeng >= q.length - 1 ? "Very good!" : poeng >= q.length / 2 ? "Good work. Read the explanations and look at the text again." : "Read the easier version or the parts you missed, and try again.";
          res.innerHTML = '<p><strong>You got ' + poeng + " of " + q.length + " right.</strong> " + melding + '</p><button type="button" class="knapp lr-qigjen">↺ Try again</button>';
        }
        return;
      }
      if (e.target.closest(".lr-qigjen")) {
        poeng = 0; besvart = 0; res.innerHTML = "";
        boks.querySelectorAll(".lr-qs").forEach(li => { li.classList.remove("ferdig", "rett", "feil"); li.querySelector(".lr-qsvar").innerHTML = ""; li.querySelectorAll(".lr-qknapp").forEach(k => { k.disabled = false; k.classList.remove("er-rett", "er-feil"); k.removeAttribute("aria-pressed"); }); });
        boks.querySelector(".lr-qknapp").focus();
      }
    });
  }

  // ---------- Opplesing ----------
  function kobleOpplesing() {
    if (!("speechSynthesis" in window)) return;
    const synth = window.speechSynthesis;
    let markert = null;
    const stemme = () => { const v = synth.getVoices(); return v.find(x => /^en-GB/i.test(x.lang)) || v.find(x => /^en/i.test(x.lang)) || null; };
    function avslutt() {
      synth.cancel();
      if (markert) markert.classList.remove("leses-na");
      markert = null;
      document.querySelectorAll(".lr-les").forEach(b => { b.hidden = false; });
      document.querySelectorAll(".lr-stopp-les").forEach(b => { b.hidden = true; });
    }
    function les(panel, fra) {
      synth.cancel();
      const v = stemme();
      const avsnitt = Array.from(panel.querySelectorAll("[data-p]")).filter(el => Number(el.dataset.p) >= fra);
      if (!avsnitt.length) return;
      panel.querySelector(".lr-les").hidden = true;
      panel.querySelector(".lr-stopp-les").hidden = false;
      avsnitt.forEach((el, n) => {
        const kopi = el.cloneNode(true);
        kopi.querySelectorAll(".ordforklaring, .lr-nr").forEach(x => x.remove());
        const u = new SpeechSynthesisUtterance(kopi.textContent.replace(/\s+/g, " ").trim());
        u.lang = "en-GB"; if (v) u.voice = v; u.rate = 0.92;
        u.onstart = () => { if (markert) markert.classList.remove("leses-na"); markert = el; el.classList.add("leses-na"); };
        if (n === avsnitt.length - 1) u.onend = avslutt;
        synth.speak(u);
      });
    }
    document.querySelectorAll(".lr-les").forEach(b => b.addEventListener("click", () => les(b.closest(".lr-panel"), 0)));
    document.querySelectorAll(".lr-stopp-les").forEach(b => b.addEventListener("click", avslutt));
    document.querySelectorAll(".lr-nr").forEach(b => b.addEventListener("click", () => les(b.closest(".lr-panel"), Number(b.closest("[data-p]").dataset.p))));
    document.querySelectorAll('[role="tab"]').forEach(f => f.addEventListener("click", avslutt));
    window.addEventListener("pagehide", () => synth.cancel());
  }

  // ---------- Én tekst ----------
  async function tekst(id) {
    const info = LV.lesetekster.find(x => x.id === id);
    if (!info) { $("innhold").innerHTML = '<p class="melding">Fant ikke teksten. <a href="lesing.html">Til Reading Room</a></p>'; return; }
    LV.lesetekst = null;
    await LV.lastSkript("data/lesing/" + encodeURIComponent(id) + ".js");
    const d = LV.lesetekst;
    document.title = info.tittel + " – Reading Room – " + navn();
    const temaer = (info.temaer || []).map(x => LV.temaer.find(y => y.id === x)).filter(Boolean);
    const kanLese = "speechSynthesis" in window;
    const nr = n => kanLese ? '<button type="button" class="lr-nr" aria-label="Read aloud from paragraph ' + n + '">' + n + "</button>" : '<span class="lr-nr" aria-hidden="true">' + n + "</span>";
    const lesKnapper = kanLese ? '<div class="lr-verktoy"><button class="knapp hoved lr-les" type="button">▶ Read aloud</button><button class="knapp lr-stopp-les" type="button" hidden>■ Stop reading</button>' +
      '<span class="lr-verktoy-tips" lang="nb">Trykk på et avsnittsnummer for å lese derfra.</span></div>' : "";

    let h = '<nav class="brodsmuler" aria-label="Brødsmuler"><a href="index.html">Forside</a> › <a href="index.html?fag=engelsk">Engelsk</a> › <a href="lesing.html">Reading Room</a> › <span lang="en">' + esc(info.tittel) + "</span></nav>";
    // Toppen
    h += '<div class="lr-topp" lang="en">' + omslag(info, true) + '<div class="lr-topp-tekst"><p class="overlinje">' + esc(info.sjanger) + " · " + info.tags.map(esc).join(" · ") + "</p>" +
      "<h1>" + esc(info.tittel) + '</h1><p class="lr-av">by <strong>' + esc(info.forfatter) + "</strong> (" + esc(info.levde) + ")</p>" +
      '<p class="ingress">' + esc(info.kort) + "</p>" +
      '<dl class="lr-fakta"><div><dt>Published</dt><dd>' + info.ar + "</dd></div><div><dt>Level</dt><dd>" + stjerner(info.nivaa) + '</dd></div><div><dt>Length</dt><dd>' + info.ord.toLocaleString("en-GB") + " words · about " + lesetid(info.ord) + " min</dd></div>" +
      '<div><dt lang="nb">Trinn</dt><dd lang="nb">' + info.trinn + ". trinn</dd></div></dl>" +
      '<nav class="lr-hopp" aria-label="Snarveier"><a href="#for">1. Before you read</a><a href="#les">2. Read</a><a href="#etter">3. After reading</a>' + (LV.lesequiz && LV.lesequiz[d.id] ? '<a href="#quiz">✅ Quiz</a>' : "") + '</nav></div></div>';

    // 1. Før lesing
    h += '<section class="lr-del" id="for" lang="en"><h2><span class="lr-steg">1</span> Before you read</h2>' +
      '<div class="lr-to"><div class="lr-boks"><h3>About the author</h3>' + d.forfatter.om.map(p => "<p>" + fmt(p) + "</p>").join("") + "</div>" +
      '<div class="lr-boks"><h3>' + esc(d.bakgrunn.tittel) + "</h3>" + d.bakgrunn.tekst.map(p => "<p>" + fmt(p) + "</p>").join("") + "</div></div>" +
      (d.historisk ? '<aside class="lr-historisk" id="kontekst"><h3><span aria-hidden="true">🕰️</span> ' + esc(d.historisk.tittel) + "</h3>" + d.historisk.tekst.map(p => "<p>" + fmt(p) + "</p>").join("") + "</aside>" : "") +
      '<h3>Think before you read</h3><ol class="lr-oppg">' + d.forLesing.map((s, i) => "<li><p>" + fmt(s) + "</p>" + svarfelt("for" + i, s, "Before you read") + "</li>").join("") + "</ol>" +
      '<details class="lr-ordliste"><summary>📖 Word list – ' + d.ord.length + " words to know</summary>" +
      '<div class="gr-tabell-rull"><table><thead><tr><th scope="col">Word</th><th scope="col">Meaning</th><th scope="col" lang="nb">Norsk</th></tr></thead><tbody>' +
      d.ord.map(o => "<tr><td><strong>" + esc(o[0]) + "</strong></td><td>" + esc(o[1]) + '</td><td lang="nb">' + esc(o[2]) + "</td></tr>").join("") + "</tbody></table></div></details></section>";

    // 2. Lesing
    const orig = merkOrd(d.tekst, d.ord);
    let pnr = 0, stoppNr = 0;
    let origHtml = "";
    d.tekst.forEach((p, i) => {
      if (p && p.vers) { pnr++; origHtml += '<figure class="lr-vers" data-p="' + pnr + '">' + nr(pnr) + p.vers.split(/\n\n+/).map(st => "<p>" + st.split("\n").map(fmt).join("<br>") + "</p>").join("") + "</figure>"; }
      else if (typeof p !== "string") origHtml += '<h3 class="lr-deltittel">' + esc(p.h) + "</h3>";
      else { pnr++; origHtml += '<p data-p="' + pnr + '">' + nr(pnr) + orig[i] + "</p>"; }
      if (d.stopp && d.stopp[i]) {
        stoppNr++;
        origHtml += '<aside class="stopp"><div class="tittel"><span aria-hidden="true">✋</span> Stop and think' + LV.stoppMerke(d.stopp[i], true) + '</div><p>' + fmt(d.stopp[i]) + "</p>" + svarfelt("stopp" + stoppNr, d.stopp[i], "Stop and think") + "</aside>";
      }
    });
    let lnr = 0;
    const lettHtml = (d.lett || []).map(p => typeof p !== "string" ? '<h3 class="lr-deltittel">' + esc(p.h) + "</h3>" :
      '<p data-p="' + (++lnr) + '">' + nr(lnr) + fmt(p) + "</p>").join("");
    const lett = LV.param("versjon") === "lett";
    if (d.utenTekst) {
      h += '<section class="lr-del" id="les" lang="en"><h2><span class="lr-steg">2</span> Read</h2>' +
        '<div class="lr-uten"><h3><span aria-hidden="true">📕</span> ' + esc(d.utenTekst.tittel) + "</h3>" + d.utenTekst.tekst.map(p => "<p>" + fmt(p) + "</p>").join("") +
        '<p class="lr-uten-norsk" lang="nb">Teksten er vernet av opphavsrett og ligger derfor ikke på nettsiden. Læreren deler den ut.</p></div>' +
        '<ol class="lr-deler">' + d.deler.map((x, i) => '<li class="lr-delkort"><h3>' + esc(x.tittel) + '</h3><p class="lr-delsted">📍 ' + esc(x.sted) + "</p>" +
          '<details class="lr-delsammendrag"><summary>🌱 Short summary of this part</summary><p>' + fmt(x.sammendrag) + "</p></details>" +
          '<aside class="stopp"><div class="tittel"><span aria-hidden="true">✋</span> Stop and think' + LV.stoppMerke(x.stopp, true) + '</div><p>' + fmt(x.stopp) + "</p>" + svarfelt("del" + i, x.stopp, "Stop and think") + "</aside></li>").join("") + "</ol></section>";
    } else
    h += '<section class="lr-del" id="les" lang="en"><h2><span class="lr-steg">2</span> Read</h2>' +
      '<div class="lr-faner" role="tablist" aria-label="Choose version">' +
      '<button role="tab" id="fane-orig" aria-controls="panel-orig" aria-selected="' + !lett + '"' + (lett ? ' tabindex="-1"' : "") + '>📜 Original text</button>' +
      '<button role="tab" id="fane-lett" aria-controls="panel-lett" aria-selected="' + lett + '"' + (lett ? "" : ' tabindex="-1"') + '>🌱 Easier version</button></div>' +
      '<div class="lr-panel" role="tabpanel" id="panel-orig" aria-labelledby="fane-orig"' + (lett ? " hidden" : "") + ">" + lesKnapper +
      '<p class="lr-panel-info" lang="nb">Originalteksten slik den ble utgitt i ' + info.ar + '. Ord med <span class="lr-prikk">prikkete strek</span> har forklaring – trykk på dem. Du kan også dobbeltklikke på et ord for å slå det opp i ordboka.</p>' +
      '<article class="lr-tekst"><h3 class="lr-tekst-tittel">' + esc(info.tittel) + '</h3><p class="lr-tekst-av">' + esc(info.forfatter) + "</p>" + origHtml + '<p class="lr-slutt" aria-hidden="true">❦</p></article></div>' +
      '<div class="lr-panel" role="tabpanel" id="panel-lett" aria-labelledby="fane-lett"' + (lett ? "" : " hidden") + ">" + lesKnapper +
      '<p class="lr-panel-info" lang="nb">En kortere og enklere gjenfortelling, skrevet for Les verden. Les gjerne denne først – og prøv deg så på originalen!</p>' +
      '<article class="lr-tekst lett"><h3 class="lr-tekst-tittel">' + esc(info.tittel) + ' <span class="lr-lett-merke">easier version</span></h3>' + lettHtml + "</article></div></section>";

    // 3. Etter lesing
    const blokk = (nokkel, ikon, tittel, tekst, liste, gruppe) => '<section class="fo-oppg lr-' + nokkel + '"><h3><span aria-hidden="true">' + ikon + "</span> " + tittel + '</h3><p class="fo-oppg-tekst">' + tekst + "</p><ol class=\"lr-oppg\">" +
      liste.map((x, i) => { const s = typeof x === "string" ? x : x.s; return "<li><p>" + fmt(s) + "</p>" + (laerer && x.svar ? '<p class="fo-fasit"><strong lang="nb">Fasit:</strong> ' + fmt(x.svar) + "</p>" : "") + svarfelt(nokkel + i, (i + 1) + ". " + s, gruppe) + "</li>"; }).join("") + "</ol></section>";
    h += '<section class="lr-del" id="etter" lang="en"><h2><span class="lr-steg">3</span> After reading</h2>' + quizHtml(info.id) +
      blokk("sporsmal", "❓", "Questions about the text", (d.utenTekst ? "Answer in full sentences." : "Answer in full sentences. You can answer after reading the original or the easier version."), d.sporsmal, "Questions") +
      blokk("analyse", "🔍", "Look closer", "These questions are about how the text is written. Use quotes from the original text.", d.analyse, "Look closer") +
      blokk("diskusjon", "💬", "Discuss", "Talk in pairs or groups. Write down your most important points.", d.diskusjon, "Discuss") +
      blokk("skriv", "✍️", "Write", "Choose one task.", d.skriv, "Write") + "</section>";

    // Koblinger
    if (temaer.length) h += '<section><h2>Les mer om temaet</h2><ul class="temaliste">' + temaer.map(x => '<li><a class="temakort fag-' + x.fag + '" href="tema.html?id=' + encodeURIComponent(x.id) + '"' + (x.fag === "engelsk" ? ' lang="en"' : "") + ">" + LV.merker(x) + "<h3>" + esc(x.tittel) + "</h3><p>" + esc(x.kort) + "</p></a></li>").join("") + "</ul></section>";
    // Lærer
    h += '<details class="fo-laerer"' + (laerer ? " open" : "") + "><summary>👩‍🏫 For læreren</summary><p><strong>Innhold og alder:</strong> " + esc(d.laerer.innhold) + "</p>" +
      "<ul>" + d.laerer.tips.map(x => "<li>" + esc(x) + "</li>").join("") + "</ul>" +
      (d.utenTekst ? "" : "<p><strong>Kilde og rettigheter:</strong> Originalteksten er hentet fra " + (info.kilde === "gutenberg" ? '<a href="https://www.gutenberg.org" target="_blank" rel="noopener">Project Gutenberg</a> (via GITenberg)' : '<a href="https://standardebooks.org" target="_blank" rel="noopener">Standard Ebooks</a> (korrekturlest utgave, CC0)') + ". " + esc(info.forfatter) + " døde for over 70 år siden, så teksten er i det fri i Norge. Den lette versjonen, ordlista og oppgavene er skrevet for Les verden.</p>") +
      (laerer ? "" : '<p class="fo-hint">Legg til <code>&amp;laerer=1</code> i adressen for å se fasit til spørsmålene.</p>') + "</details>" +
      LV.kmBoks(info.sjanger === "Short story" ? ["e11", "e10", "e14"] : ["e12", "e10", "e18"]);
    const andre = LV.lesetekster.filter(x => x.id !== info.id);
    h += '<section class="lr-andre"><h2>Flere tekster i Reading Room</h2><ul class="lr-hylle liten">' + andre.map(x => '<li><a class="lr-kort" href="lesing.html?id=' + x.id + '" aria-label="' + esc(x.tittel + " – " + x.forfatter) + '">' + omslag(x) + "</a></li>").join("") + "</ul></section>";
    $("innhold").innerHTML = h;

    // Faner
    const faner = Array.from(document.querySelectorAll('[role="tab"]'));
    const velg = f => {
      faner.forEach(x => { const v = x === f; x.setAttribute("aria-selected", String(v)); x.tabIndex = v ? 0 : -1; $(x.getAttribute("aria-controls")).hidden = !v; });
      const p = new URLSearchParams(location.search);
      if (f.id === "fane-lett") p.set("versjon", "lett"); else p.delete("versjon");
      history.replaceState(null, "", "lesing.html?" + p + location.hash);
    };
    faner.forEach((f, i) => {
      f.addEventListener("click", () => velg(f));
      f.addEventListener("keydown", e => {
        if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
        const n = faner[(i + (e.key === "ArrowRight" ? 1 : faner.length - 1)) % faner.length];
        velg(n); n.focus();
      });
    });
    kobleOrd();
    kobleOpplesing();
    kobleQuiz();
    svarlinje(info.tittel + " – " + info.forfatter);
  }

  document.addEventListener("DOMContentLoaded", function () {
    const id = LV.param("id");
    if (id) tekst(id); else oversikt();
  });
})();
