/* =========================================================
   Les verden – Kildeanalyse (kilder.html)
   Ekte historiske kilder med ordhjelp, norsk sammendrag,
   «Se – tenk – lur», kildekritiske spørsmål, historisk
   sammenheng og refleksjon. Data: data/kilder.js
   kilder.html → oversikt · kilder.html?id=<kilde>
   ========================================================= */
(function () {
  const LV = window.LV;
  const $ = id => document.getElementById(id);
  const esc = s => LV.esc(String(s == null ? "" : s));
  const bland = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const hode = t => '<nav class="brodsmuler" aria-label="Brødsmuler"><a href="index.html">Forside</a> › <a href="kildedetektiv.html">Kilder</a> › <a href="kilder.html">Kildeanalyse</a>' + (t ? " › " + esc(t) : "") + "</nav>";
  const felt = (id, label, rader) => '<label class="mu-notat" for="' + id + '"><span>' + esc(label) + '</span><textarea id="' + id + '" rows="' + (rader || 3) + '"></textarea></label>';

  function oversikt() {
    document.title = "Kildeanalyse – " + (LV.config ? LV.config.navn : "Les verden");
    $("innhold").innerHTML = hode() +
      '<header class="sidehode"><p class="overlinje">Kildekritikk</p><h1>🔍 Kildeanalyse: ekte kilder</h1><p class="ingress">Historikere bruker kilder for å finne ut hva som skjedde. Her møter du ekte kilder fra historien – en kongelig avtale fra 1215, en erklæring, en debattbok, et politisk program og en reportasjebok. Du får ordhjelp og et norsk sammendrag, og du stiller de samme spørsmålene som en historiker: Hvem, hvorfor, til hvem – og hva kan kilden IKKE fortelle?</p></header>' +
      '<div class="ka-metode"><h2>Fire spørsmål til enhver kilde</h2><ol><li><strong>Opphav:</strong> Hvem laget kilden, når og hvor?</li><li><strong>Hensikt:</strong> Hvorfor ble den laget? Hva ville avsenderen oppnå?</li><li><strong>Mottaker:</strong> Hvem var den laget for?</li><li><strong>Perspektiv:</strong> Hvem sitt syn får vi – og hvem sitt syn mangler?</li></ol><p>Øv også med oppdiktede kilder fra i dag i <a href="kildedetektiv.html">Kildedetektiven</a>.</p></div>' +
      '<ul class="fo-liste">' + LV.kilder.map(k => '<li><a class="fo-kort" href="kilder.html?id=' + k.id + '" style="--fo-a:var(--samfunnsfag)"><span class="fo-kort-topp"><span class="fo-ikon" aria-hidden="true">' + k.ikon + "</span><span>" + esc(k.aar) + " · " + esc(k.type) + "</span></span><strong>" + esc(k.tittel) + "</strong><span>" + esc(k.opphav[0][1]) + '</span><span class="fo-trinn">' + k.trinn + ". trinn · kilden er på engelsk</span></a></li>").join("") + "</ul>";
  }

  function kilde(k) {
    document.title = k.tittel + " (" + k.aar + ") – Kildeanalyse";
    const tema = LV.temaer && LV.temaer.find(t => t.id === k.tema);
    const kanLese = "speechSynthesis" in window;
    $("innhold").innerHTML = hode(k.tittel) +
      '<header class="sidehode"><p class="overlinje">Kildeanalyse · ' + esc(k.type) + '</p><h1><span aria-hidden="true">' + k.ikon + "</span> " + esc(k.tittel) + " (" + esc(k.aar) + ")</h1></header>" +
      '<section class="le-del"><h2>1. Les kilden</h2><p class="mu-intro">Les kilden to ganger. Bruk ordhjelpen. Står du fast, kan du lese det norske sammendraget – men prøv først selv!</p>' +
      '<div class="ka-rad"><div><div class="ka-kilde" lang="en">' + k.utdrag.map(p => typeof p === "string" ? "<p>" + esc(p) + "</p>" : '<p class="ka-kapittel">' + esc(p.h) + "</p>").join("") + "</div>" +
      '<p class="ka-knapper">' + (kanLese ? '<button type="button" class="knapp liten" id="ka-les">🔊 Lytt til kilden</button> ' : "") + '<button type="button" class="knapp liten" id="ka-norsk" aria-expanded="false" aria-controls="ka-norsk-tekst">🇳🇴 Vis norsk sammendrag</button></p>' +
      '<div class="ka-norsk" id="ka-norsk-tekst" hidden><p><strong>Sammendrag på norsk:</strong> ' + esc(k.norsk) + "</p></div></div>" +
      '<aside class="ka-ord"><h3>Ordhjelp</h3><dl>' + k.ord.map(([en, nb]) => '<dt lang="en">' + esc(en) + "</dt><dd>" + esc(nb) + "</dd>").join("") + "</dl></aside></div></section>" +
      '<section class="le-del"><h2>2. Se – tenk – lur</h2>' + felt("ka-se", "Se: Hva står det i kilden? Skriv tre ting du legger merke til.") + felt("ka-tenk", "Tenk: Hva tror du kilden handler om? Hvorfor tror du det?") + felt("ka-lur", "Lur: Hva lurer du på etter å ha lest kilden?") + "</section>" +
      '<section class="le-del"><h2>3. Opphav</h2><dl class="ka-opphav">' + k.opphav.map(([a, b]) => "<dt>" + esc(a) + "</dt><dd>" + esc(b) + "</dd>").join("") + "</dl></section>" +
      '<section class="le-del"><h2>4. Kildekritiske spørsmål</h2><p class="mu-intro">Velg svaret du mener er best – og begrunn med noe fra kilden eller opphavet.</p><ol class="ka-sporsmal">' +
      k.sporsmal.map((q, i) => { const r = bland(q.valg.map((_, j) => j)); return '<li><p class="ka-kat">' + esc(q.kat) + '</p><fieldset><legend>' + esc(q.s) + "</legend>" + r.map(j => '<label><input type="radio" name="ka-q' + i + '" id="ka-q' + i + "-" + j + '" value="' + j + '"> ' + esc(q.valg[j]) + "</label>").join("") + '</fieldset><p class="ka-svar" id="ka-svar-' + i + '" aria-live="polite"></p>' + felt("ka-b" + i, "Begrunnelse", 2) + "</li>"; }).join("") + "</ol></section>" +
      '<section class="le-del"><h2>5. Historisk sammenheng</h2>' + k.kontekst.map(p => "<p>" + esc(p) + "</p>").join("") + (tema ? '<p><a href="tema.html?id=' + encodeURIComponent(tema.id) + '">Les mer i temaet «' + esc(tema.tittel) + "» →</a></p>" : "") + "</section>" +
      '<section class="le-del"><h2>6. Hva kan kilden fortelle – og hva kan den ikke?</h2>' + k.refleksjon.map((r, i) => felt("ka-r" + i, r, 3)).join("") + '<p><a class="knapp" href="kilder.html">← Velg en annen kilde</a></p></section>';

    $("ka-norsk").addEventListener("click", () => { const t = $("ka-norsk-tekst"), apen = !t.hidden; t.hidden = apen; $("ka-norsk").setAttribute("aria-expanded", String(!apen)); $("ka-norsk").textContent = apen ? "🇳🇴 Vis norsk sammendrag" : "🇳🇴 Skjul norsk sammendrag"; });
    if (kanLese) $("ka-les").addEventListener("click", () => { if (speechSynthesis.speaking) { speechSynthesis.cancel(); return; } LV.lesEngelsk(k.utdrag.map(p => typeof p === "string" ? p : p.h).join(" ").replace(/\[…\]/g, ""), "en-GB", 0.9); });
    k.sporsmal.forEach((q, i) => document.querySelectorAll('input[name="ka-q' + i + '"]').forEach(inp => inp.addEventListener("change", () => {
      const ok = +inp.value === q.riktig, s = $("ka-svar-" + i);
      s.className = "ka-svar " + (ok ? "ok" : "feil");
      s.innerHTML = (ok ? "✔ Godt svar. " : "✘ Tenk en gang til. ") + (ok ? esc(q.forklaring) : "Se på opphavet og den historiske sammenhengen.");
    })));
  }

  document.addEventListener("DOMContentLoaded", () => {
    const k = LV.kilder.find(x => x.id === LV.param("id"));
    if (k) kilde(k); else oversikt();
    const linje = document.createElement("div");
    linje.className = "svarlinje";
    linje.innerHTML = '<div class="svarlinje-indre"><label class="skjult-visuelt" for="elevnavn">Navn</label><input id="elevnavn" type="text" placeholder="Navn" autocomplete="off"><span class="status" role="status" aria-live="polite"></span></div>';
    document.body.appendChild(linje);
  });
})();
