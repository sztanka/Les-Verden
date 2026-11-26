/* =========================================================
   Les verden – Lesbarhetsmåleren (lesbarhet.html)
   Lim inn en tekst på norsk eller engelsk og få LIX (lesbarhetsindeks),
   setningslengde, andel lange ord, markering av lange setninger og
   ord, og en ordliste med lenker til Ordboka. For engelsk vises også
   Flesch Reading Ease og Flesch–Kincaid-trinn. To versjoner av en
   tekst kan sammenlignes. Ingenting lagres eller sendes.
   ========================================================= */
(function () {
  const LV = window.LV;
  const $ = id => document.getElementById(id);
  const esc = s => LV.esc(String(s == null ? "" : s));

  const SKALA = [
    [25, "Svært lett", "Som bøker for de yngste."],
    [35, "Lett", "Som enkel skjønnlitteratur og lettlest nyhetsstoff."],
    [45, "Middels", "Som vanlige aviser og mange lærebøker for ungdomstrinnet."],
    [55, "Vanskelig", "Som fagtekster og saksprosa for videregående."],
    [Infinity, "Svært vanskelig", "Som fagbøker, lovtekster og offentlige dokumenter."]
  ];
  const FORKORTELSER = ["f.eks.", "bl.a.", "dvs.", "osv.", "ca.", "mht.", "m.m.", "o.l.", "pga.", "ifm.", "jf.", "nr.", "kl.", "evt.", "inkl.", "mr.", "mrs.", "ms.", "dr.", "e.g.", "i.e.", "etc.", "vs.", "u.s.", "u.k.", "a.m.", "p.m."];
  const NO = new Set("og i det er som en på til av for at har med ikke de var den han hun jeg vi seg om et men kan fra også skal ble eller så hadde blir dette etter mot over når vil".split(" "));
  const EN = new Set("the and of to a in is that it was for on are as with he she they his her be at by this have from or an were which you not but had has their its will we".split(" "));

  function analyser(tekst, sprak) {
    let t = tekst.replace(/\r/g, "");
    FORKORTELSER.forEach(f => { t = t.replace(new RegExp("(^|[\\s(])" + f.replace(/\./g, "\\.") , "gi"), m => m.replace(/\./g, "․")); });
    // Setninger: . ! ? : … og linjeskift (overskrifter) avslutter
    const setninger = t.split(/(?<=[.!?:…])\s+|\n+/).map(s => s.replace(/․/g, ".").trim()).filter(s => /[\p{L}\p{N}]/u.test(s));
    const ordIS = s => s.match(/[\p{L}\p{N}][\p{L}\p{N}'’-]*/gu) || [];
    const alle = setninger.flatMap(ordIS);
    const n = alle.length, ns = Math.max(1, setninger.length);
    const bokstaver = w => (w.match(/\p{L}/gu) || []).length;
    const lange = alle.filter(w => bokstaver(w) > 6);
    const lix = n ? n / ns + lange.length * 100 / n : 0;
    const smaa = alle.map(w => w.toLowerCase());
    const auto = smaa.filter(w => NO.has(w)).length >= smaa.filter(w => EN.has(w)).length ? "nb" : "en";
    const sp = sprak === "auto" ? auto : sprak;
    let flesch = null, fk = null;
    if (sp === "en" && n) {
      const stavelser = alle.reduce((s, w) => s + staveEn(w), 0);
      flesch = 206.835 - 1.015 * (n / ns) - 84.6 * (stavelser / n);
      fk = .39 * (n / ns) + 11.8 * (stavelser / n) - 15.59;
    }
    const setnInfo = setninger.map(s => ({ s, ord: ordIS(s).length }));
    // Ordliste: lange ord, men ikke egennavn (stor forbokstav midt i en setning)
    const telling = new Map(), egennavn = new Set();
    setninger.forEach(st => ordIS(st).forEach((w, i) => { if (i > 0 && /^\p{Lu}/u.test(w)) egennavn.add(w.toLowerCase()); }));
    alle.forEach(w => { const k = w.toLowerCase().replace(/[’']s$/, ""); if (bokstaver(w) > 6 && !/\d/.test(w) && !egennavn.has(w.toLowerCase())) telling.set(k, (telling.get(k) || 0) + 1); });
    return { n, ns: setninger.length, lix, lange: lange.length, sp, auto, flesch, fk, setnInfo, telling, snitt: n / ns, svaertLange: alle.filter(w => bokstaver(w) >= 13).length };
  }
  function staveEn(w) {
    w = w.toLowerCase().replace(/[^a-z]/g, ""); if (!w) return 0; if (w.length <= 3) return 1;
    w = w.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "").replace(/^y/, "");
    const g = w.match(/[aeiouy]{1,2}/g); return g ? g.length : 1;
  }
  const kategori = lix => SKALA.find(k => lix < k[0]);

  function side() {
    document.title = "Lesbarhetsmåleren – " + (LV.config ? LV.config.navn : "Les verden");
    $("innhold").innerHTML = '<nav class="brodsmuler" aria-label="Brødsmuler"><a href="index.html">Forside</a> › <a href="laerer.html">For lærere</a> › Lesbarhetsmåleren</nav>' +
      '<header class="sidehode"><p class="overlinje">For lærere · lesing og tilpasning</p><h1>📏 Lesbarhetsmåleren</h1><p class="ingress">Hvor krevende er teksten for elevene dine? Lim inn en tekst på norsk eller engelsk, og se lesbarhetsindeksen (LIX), hvilke setninger som er lange, og hvilke ord som kan trenge forklaring. Sammenlign gjerne originalen med en forenklet versjon.</p></header>' +
      '<div class="lx-inn"><div class="lx-felt"><label class="cs-felt" for="lx-a"><span>Tekst A</span><textarea id="lx-a" rows="12" spellcheck="true" placeholder="Lim inn teksten her …"></textarea></label></div>' +
      '<div class="lx-felt" id="lx-bdel" hidden><label class="cs-felt" for="lx-b"><span>Tekst B – for eksempel en forenklet versjon</span><textarea id="lx-b" rows="12" spellcheck="true" placeholder="Lim inn den andre versjonen her …"></textarea></label></div></div>' +
      '<div class="lx-valg"><fieldset class="gt-modus"><legend>Språk</legend><label><input type="radio" name="lx-sprak" value="auto" checked> Finn automatisk</label><label><input type="radio" name="lx-sprak" value="nb"> Norsk</label><label><input type="radio" name="lx-sprak" value="en"> Engelsk</label></fieldset>' +
      '<label class="cs-avkryss"><input type="checkbox" id="lx-sammenlign"> Sammenlign med en annen versjon</label><button type="button" class="knapp liten" id="lx-eksempel">Prøv med en eksempeltekst</button></div>' +
      '<div id="lx-resultat" aria-live="polite"></div>' +
      '<section class="le-del"><h2>Om LIX</h2><p>LIX (lesbarhetsindeks) ble utviklet av den svenske pedagogen Carl-Hugo Björnsson. Tallet er <strong>gjennomsnittlig antall ord per setning + prosentandelen lange ord</strong> (ord med mer enn seks bokstaver). Jo høyere tall, jo tyngre er teksten å lese.</p>' +
      '<div class="sg-tabell-wrap" tabindex="0" role="region" aria-label="LIX-skala"><table class="sg-tabell"><caption class="skjult-visuelt">LIX-skala</caption><thead><tr><th scope="col">LIX</th><th scope="col">Lesbarhet</th><th scope="col">Typisk for</th></tr></thead><tbody>' + SKALA.map((k, i) => "<tr><td>" + (i === 0 ? "under 25" : i === SKALA.length - 1 ? "55 og over" : SKALA[i - 1][0] + "–" + (k[0] - 1)) + "</td><td>" + k[1] + "</td><td>" + k[2] + "</td></tr>").join("") + "</tbody></table></div>" +
      '<p class="mu-intro">LIX måler bare lengde – ikke om ordene er kjente, om teksten henger godt sammen, eller om eleven har bakgrunnskunnskap om temaet. Bruk tallet som en pekepinn, og les alltid teksten selv. For engelske tekster vises også Flesch Reading Ease (høyere = lettere) og Flesch–Kincaid, som anslår amerikansk skoletrinn («grade»).</p>' +
      '<h2>Slik gjør du en tekst lettere</h2><ul class="kk-tips"><li><strong>Del lange setninger.</strong> Én hovedtanke per setning.</li><li><strong>Bytt ut eller forklar lange ord.</strong> Særlig sammensatte ord og fagord eleven ikke trenger å kunne.</li><li><strong>Behold fagbegrepene</strong> som er målet med timen – men forklar dem i teksten eller i en ordliste.</li><li><strong>Bruk mellomtitler</strong> og avsnitt som viser hva teksten handler om.</li><li><strong>Gi førlesingsstøtte:</strong> Gå gjennom ordlista og aktiver forkunnskaper før eleven leser. Se <a href="lesestrategier.html">Lesestrategier</a>.</li></ul></section>' +
      '<p class="fo-merk">Teksten analyseres bare i nettleseren din. Ingenting lagres eller sendes.</p>';
    let t; const kjor = () => { clearTimeout(t); t = setTimeout(vis, 250); };
    $("lx-a").addEventListener("input", kjor); $("lx-b").addEventListener("input", kjor);
    document.querySelectorAll('input[name="lx-sprak"]').forEach(r => r.addEventListener("change", vis));
    $("lx-sammenlign").addEventListener("change", e => { $("lx-bdel").hidden = !e.target.checked; document.querySelector(".lx-inn").classList.toggle("lx-to", e.target.checked); vis(); if (e.target.checked) $("lx-b").focus(); });
    $("lx-eksempel").addEventListener("click", () => {
      $("lx-a").value = "Den industrielle revolusjonen, som startet i Storbritannia på slutten av 1700-tallet og etter hvert spredte seg til store deler av Europa og Nord-Amerika, innebar en omfattende omstrukturering av produksjonsforholdene, der håndverksbasert tilvirkning gradvis ble erstattet av maskinell masseproduksjon i fabrikker.\n\nDenne utviklingen medførte betydelige samfunnsmessige konsekvenser, blant annet urbanisering, fremveksten av en industriarbeiderklasse og fundamentale endringer i familiestrukturen.";
      $("lx-sammenlign").checked = true; $("lx-bdel").hidden = false; document.querySelector(".lx-inn").classList.add("lx-to");
      $("lx-b").value = "Den industrielle revolusjonen startet i Storbritannia rundt år 1780. Etter hvert spredte den seg til Europa og Nord-Amerika.\n\nFør laget håndverkere varene for hånd. Nå tok maskiner over. Varene ble laget i store fabrikker.\n\nDette endret samfunnet. Mange flyttet fra landet til byene. En ny gruppe vokste fram: fabrikkarbeiderne. Også familielivet ble annerledes.";
      vis();
    });
    $("lx-resultat").addEventListener("click", e => {
      const b = e.target.closest("button"); if (!b) return;
      if (b.dataset.a === "kopier") {
        const ord = [...document.querySelectorAll(".lx-ordvalg input:checked")].map(x => x.value);
        navigator.clipboard.writeText(ord.map(o => o + " – ").join("\n")).then(() => { b.textContent = "✔ Kopiert"; setTimeout(() => { b.textContent = "📋 Kopier ordlista"; }, 1600); }).catch(() => { b.textContent = "Kunne ikke kopiere"; });
      } else if (b.dataset.a === "skriv") skrivUt();
      else if (b.dataset.a === "alle") document.querySelectorAll(".lx-ordvalg input").forEach(x => { x.checked = b.dataset.v === "1"; });
    });
  }

  function vis() {
    const sprak = document.querySelector('input[name="lx-sprak"]:checked').value, a = $("lx-a").value.trim(), b = !$("lx-bdel").hidden && $("lx-b").value.trim();
    if (!a) { $("lx-resultat").innerHTML = ""; return; }
    const A = analyser(a, sprak), B = b ? analyser(b, sprak) : null;
    let h = '<div class="lx-kort' + (B ? " lx-to" : "") + '">' + kort("Tekst A", A) + (B ? kort("Tekst B", B, A) : "") + "</div>";
    h += '<section class="lx-del"><h2>Teksten med markeringer' + (B ? " (tekst A)" : "") + '</h2><p class="lx-forklaring"><span class="lx-s1">lang setning (over 20 ord)</span> <span class="lx-s2">svært lang setning (over 30 ord)</span> <span class="lx-ord">ord med mer enn 6 bokstaver</span> <span class="lx-ord lx-ord2">ord med 13 bokstaver eller flere</span></p><div class="lx-markert"' + (A.sp === "en" ? ' lang="en"' : "") + ">" + markert(a) + "</div></section>";
    const lengst = A.setnInfo.slice().sort((x, y) => y.ord - x.ord).filter(x => x.ord > 20).slice(0, 5);
    if (lengst.length) h += '<section class="lx-del"><h2>De lengste setningene</h2><p class="rv-merk">Vurder å dele disse i to eller flere setninger.</p><ol class="lx-setninger">' + lengst.map(x => "<li><strong>" + x.ord + " ord:</strong> " + esc(x.s) + "</li>").join("") + "</ol></section>";
    const ord = [...A.telling.entries()].sort((x, y) => y[0].length - x[0].length || y[1] - x[1]).slice(0, 40);
    if (ord.length) h += '<section class="lx-del"><h2>Ord som kan trenge forklaring</h2><p class="rv-merk">De lengste ordene i teksten. Kryss av for dem du vil ha med i ordlista, og slå dem opp i Ordboka.</p><div class="lx-ordvalg">' + ord.map(([o, k]) => '<label><input type="checkbox" value="' + esc(o) + '"' + (o.length >= 10 ? " checked" : "") + "> " + esc(o) + (k > 1 ? ' <span class="rv-merk">×' + k + "</span>" : "") + ' <a href="ordbok.html?q=' + encodeURIComponent(o) + '" target="_blank" rel="noopener" aria-label="Slå opp ' + esc(o) + ' i Ordboka">📘</a></label>').join("") + '</div><p class="mu-knapper"><button type="button" class="knapp liten" data-a="alle" data-v="1">Velg alle</button><button type="button" class="knapp liten" data-a="alle" data-v="0">Fjern alle</button><button type="button" class="knapp" data-a="kopier">📋 Kopier ordlista</button><button type="button" class="knapp" data-a="skriv">🖨️ Skriv ut ordliste</button></p></section>';
    $("lx-resultat").innerHTML = h;
  }
  function kort(tittel, R, mot) {
    const k = kategori(R.lix), pos = Math.min(100, R.lix / 70 * 100);
    const diff = mot ? R.lix - mot.lix : null;
    return '<div class="lx-resultatkort"><h2>' + tittel + (R.sp === "en" ? " · engelsk" : " · norsk") + '</h2><p class="lx-tall"><span>LIX</span> <strong>' + Math.round(R.lix) + "</strong> " + (diff != null ? '<span class="lx-diff ' + (diff < 0 ? "lx-ned" : "lx-opp") + '">' + (diff < 0 ? "▼ " : "▲ ") + Math.abs(Math.round(diff)) + "</span>" : "") + '</p><p class="lx-kat">' + k[1] + ' <span class="rv-merk">– ' + k[2] + "</span></p>" +
      '<div class="lx-skala" aria-hidden="true"><span style="left:' + pos + '%"></span></div><div class="lx-skalatekst" aria-hidden="true"><span>Lett</span><span>Middels</span><span>Vanskelig</span></div>' +
      '<dl class="lx-fakta"><div><dt>Ord</dt><dd>' + R.n + "</dd></div><div><dt>Setninger</dt><dd>" + R.ns + "</dd></div><div><dt>Ord per setning</dt><dd>" + R.snitt.toFixed(1).replace(".", ",") + "</dd></div><div><dt>Lange ord</dt><dd>" + (R.n ? Math.round(R.lange / R.n * 100) : 0) + " %</dd></div>" +
      (R.flesch != null ? "<div><dt>Flesch Reading Ease</dt><dd>" + Math.round(R.flesch) + '</dd></div><div><dt>Flesch–Kincaid</dt><dd>grade ' + Math.max(0, R.fk).toFixed(1) + "</dd></div>" : "") + "</dl>" +
      (R.n < 100 ? '<p class="rv-merk">Kort tekst – tallet blir mer pålitelig med minst 100–200 ord.</p>' : "") + "</div>";
  }
  function markert(tekst) {
    return tekst.split(/\n{2,}/).map(avsnitt => "<p>" + avsnitt.split(/(?<=[.!?:…])\s+|\n/).map(s => {
      const n = (s.match(/[\p{L}\p{N}][\p{L}\p{N}'’-]*/gu) || []).length;
      const indre = esc(s).replace(/[\p{L}][\p{L}'’-]*/gu, w => { const b = (w.match(/\p{L}/gu) || []).length; return b >= 13 ? '<span class="lx-ord lx-ord2">' + w + "</span>" : b > 6 ? '<span class="lx-ord">' + w + "</span>" : w; });
      return n > 30 ? '<span class="lx-s2">' + indre + "</span>" : n > 20 ? '<span class="lx-s1">' + indre + "</span>" : indre;
    }).join(" ") + "</p>").join("");
  }
  function skrivUt() {
    const ord = [...document.querySelectorAll(".lx-ordvalg input:checked")].map(x => x.value);
    if (!ord.length) return;
    const w = window.open("", "_blank"); if (!w) return;
    w.document.write('<!doctype html><html lang="nb"><head><meta charset="utf-8"><title>Ordliste</title><style>body{font-family:system-ui,sans-serif;margin:2cm}h1{font-size:1.4rem}table{width:100%;border-collapse:collapse}td,th{border:1px solid #999;padding:.6rem;text-align:left;vertical-align:top}th{background:#eee}td:first-child{width:30%;font-weight:600}td:last-child{height:2.2rem}</style></head><body><h1>Ordliste</h1><p>Navn: ______________________</p><table><thead><tr><th>Ord</th><th>Hva betyr det?</th></tr></thead><tbody>' + ord.map(o => "<tr><td>" + esc(o) + "</td><td></td></tr>").join("") + "</tbody></table><script>print()<\/script></body></html>");
    w.document.close();
  }

  document.addEventListener("DOMContentLoaded", side);
})();
