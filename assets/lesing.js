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
      '<span class="lr-o-tittel' + (t.tittel.length > 22 ? " lang" : "") + '">' + esc(t.tittel) + '</span><span class="lr-o-ikon">' + t.ikon + '</span><span class="lr-o-forf">' + esc(t.forfatter) + "</span></span></span>";
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
      "<li><strong>Etter at du har lest:</strong> svar på spørsmålene, se nærmere på teksten, diskuter og skriv.</li></ol></div>" +
      '<div class="fo-filter" role="group" aria-label="Filtrer tekstene"><div class="fo-filter-rad"><span class="etikett">Type:</span>' +
      [["", "Alle"], ["fiction", "Short stories"], ["true", "True stories"]].map(([v, t]) => '<button class="knapp liten" data-type="' + v + '"' + (v ? ' lang="en"' : "") + ">" + t + "</button>").join("") +
      '</div><div class="fo-filter-rad"><span class="etikett">Nivå:</span><button class="knapp liten" data-niva="">Alle</button>' +
      [1, 2, 3].map(n => '<button class="knapp liten" data-niva="' + n + '" lang="en">' + LV.lesenivaer[n] + "</button>").join("") + "</div></div>" +
      '<p class="fo-antall" id="lr-antall" aria-live="polite"></p><ul class="lr-hylle" id="lr-hylle"></ul>' +
      '<p class="fo-merk">Noen av tekstene har skumle eller sterke scener. Under «For læreren» på hver tekst står det hva teksten inneholder og hvilke trinn den passer for.</p>';
    function tegn() {
      document.querySelectorAll("[data-type]").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.type === type)));
      document.querySelectorAll("[data-niva]").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.niva === niva)));
      const liste = LV.lesetekster.filter(t => (!type || (type === "fiction") === (t.sjanger === "Short story")) && (!niva || String(t.nivaa) === niva));
      $("lr-antall").textContent = liste.length + (liste.length === 1 ? " tekst" : " tekster");
      $("lr-hylle").innerHTML = liste.map(t => '<li><a class="lr-kort" href="lesing.html?id=' + t.id + '">' + omslag(t) +
        '<span class="lr-kort-tekst" lang="en"><strong>' + esc(t.tittel) + "</strong><span class=\"lr-kort-forf\">" + esc(t.forfatter) + " · " + t.ar + "</span><span>" + esc(t.kort) + "</span>" +
        '<span class="lr-kort-meta">' + stjerner(t.nivaa) + '<span class="lr-merke">' + esc(t.sjanger) + '</span><span class="lr-merke" lang="nb">' + t.trinn + ". trinn</span><span class=\"lr-merke\" lang=\"nb\">ca. " + lesetid(t.ord) + " min</span></span></span></a></li>").join("");
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
      '<nav class="lr-hopp" aria-label="Snarveier"><a href="#for">1. Before you read</a><a href="#les">2. Read</a><a href="#etter">3. After reading</a></nav></div></div>';

    // 1. Før lesing
    h += '<section class="lr-del" id="for" lang="en"><h2><span class="lr-steg">1</span> Before you read</h2>' +
      '<div class="lr-to"><div class="lr-boks"><h3>About the author</h3>' + d.forfatter.om.map(p => "<p>" + fmt(p) + "</p>").join("") + "</div>" +
      '<div class="lr-boks"><h3>' + esc(d.bakgrunn.tittel) + "</h3>" + d.bakgrunn.tekst.map(p => "<p>" + fmt(p) + "</p>").join("") + "</div></div>" +
      '<h3>Think before you read</h3><ol class="lr-oppg">' + d.forLesing.map((s, i) => "<li><p>" + fmt(s) + "</p>" + svarfelt("for" + i, s, "Before you read") + "</li>").join("") + "</ol>" +
      '<details class="lr-ordliste"><summary>📖 Word list – ' + d.ord.length + " words to know</summary>" +
      '<div class="gr-tabell-rull"><table><thead><tr><th scope="col">Word</th><th scope="col">Meaning</th><th scope="col" lang="nb">Norsk</th></tr></thead><tbody>' +
      d.ord.map(o => "<tr><td><strong>" + esc(o[0]) + "</strong></td><td>" + esc(o[1]) + '</td><td lang="nb">' + esc(o[2]) + "</td></tr>").join("") + "</tbody></table></div></details></section>";

    // 2. Lesing
    const orig = merkOrd(d.tekst, d.ord);
    let pnr = 0, stoppNr = 0;
    let origHtml = "";
    d.tekst.forEach((p, i) => {
      if (typeof p !== "string") origHtml += '<h3 class="lr-deltittel">' + esc(p.h) + "</h3>";
      else { pnr++; origHtml += '<p data-p="' + pnr + '">' + nr(pnr) + orig[i] + "</p>"; }
      if (d.stopp[i]) {
        stoppNr++;
        origHtml += '<aside class="stopp"><div class="tittel"><span aria-hidden="true">✋</span> Stop and think</div><p>' + fmt(d.stopp[i]) + "</p>" + svarfelt("stopp" + stoppNr, d.stopp[i], "Stop and think") + "</aside>";
      }
    });
    let lnr = 0;
    const lettHtml = d.lett.map(p => typeof p !== "string" ? '<h3 class="lr-deltittel">' + esc(p.h) + "</h3>" :
      '<p data-p="' + (++lnr) + '">' + nr(lnr) + fmt(p) + "</p>").join("");
    const lett = LV.param("versjon") === "lett";
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
    h += '<section class="lr-del" id="etter" lang="en"><h2><span class="lr-steg">3</span> After reading</h2>' +
      blokk("sporsmal", "❓", "Questions about the text", "Answer in full sentences. You can answer after reading the original or the easier version.", d.sporsmal, "Questions") +
      blokk("analyse", "🔍", "Look closer", "These questions are about how the text is written. Use quotes from the original text.", d.analyse, "Look closer") +
      blokk("diskusjon", "💬", "Discuss", "Talk in pairs or groups. Write down your most important points.", d.diskusjon, "Discuss") +
      blokk("skriv", "✍️", "Write", "Choose one task.", d.skriv, "Write") + "</section>";

    // Koblinger
    if (temaer.length) h += '<section><h2>Les mer om temaet</h2><ul class="temaliste">' + temaer.map(x => '<li><a class="temakort fag-' + x.fag + '" href="tema.html?id=' + encodeURIComponent(x.id) + '"' + (x.fag === "engelsk" ? ' lang="en"' : "") + ">" + LV.merker(x) + "<h3>" + esc(x.tittel) + "</h3><p>" + esc(x.kort) + "</p></a></li>").join("") + "</ul></section>";
    // Lærer
    h += '<details class="fo-laerer"' + (laerer ? " open" : "") + "><summary>👩‍🏫 For læreren</summary><p><strong>Innhold og alder:</strong> " + esc(d.laerer.innhold) + "</p>" +
      "<ul>" + d.laerer.tips.map(x => "<li>" + esc(x) + "</li>").join("") + "</ul>" +
      "<p><strong>Kilde og rettigheter:</strong> Originalteksten er hentet fra <a href=\"https://standardebooks.org\" target=\"_blank\" rel=\"noopener\">Standard Ebooks</a> (korrekturlest utgave, CC0). " + esc(info.forfatter) + " døde for over 70 år siden, så teksten er i det fri i Norge. Den lette versjonen, ordlista og oppgavene er skrevet for Les verden.</p>" +
      (laerer ? "" : '<p class="fo-hint">Legg til <code>&amp;laerer=1</code> i adressen for å se fasit til spørsmålene.</p>') + "</details>";
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
    svarlinje(info.tittel + " – " + info.forfatter);
  }

  document.addEventListener("DOMContentLoaded", function () {
    const id = LV.param("id");
    if (id) tekst(id); else oversikt();
  });
})();
