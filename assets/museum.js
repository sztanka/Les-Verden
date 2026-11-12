/* =========================================================
   Les verden – Museet vårt (museum.html)
   museum.html                → monteren (alle gjenstandene) + lag en utstilling
   museum.html?id=<id>        → én gjenstand: se nøye, fakta, skriv museumsskilt
   museum.html?id=egen        → skriv skilt til en gjenstand du har hjemme
   Skiltet vises mens eleven skriver og kan skrives ut.
   Ingenting lagres – svarene kan lastes ned (svarfil.js).
   Data: data/museum.js
   ========================================================= */
(function () {
  const LV = window.LV;
  const $ = id => document.getElementById(id);
  const esc = s => LV.esc(String(s == null ? "" : s));
  const ord = s => (String(s).trim().match(/\S+/g) || []).length;
  const MAKS = 60;
  const hode = g => '<nav class="brodsmuler" aria-label="Brødsmuler"><a href="index.html">Forside</a> › <a href="museum.html">Museet vårt</a>' + (g ? " › " + esc(g.navn) : "") + "</nav>";
  const svarlinje = () => { const l = document.createElement("div"); l.className = "svarlinje"; l.innerHTML = '<div class="svarlinje-indre"><label class="skjult-visuelt" for="elevnavn">Navn</label><input id="elevnavn" type="text" placeholder="Navn" autocomplete="off"><span class="status" role="status" aria-live="polite"></span></div>'; document.body.appendChild(l); };
  const skilt = (v, ikon) => '<div class="ms-skilt"><p class="ms-s-tittel">' + esc(v.tittel || "Tittel") + '</p><p class="ms-s-tid">' + esc(v.tid || "Tid og sted") + '</p><p class="ms-s-tekst">' + esc(v.tekst || "Skilteksten kommer her …") + "</p>" + (v.sp ? '<p class="ms-s-sp"><span aria-hidden="true">💭</span> ' + esc(v.sp) + "</p>" : "") + '<p class="ms-s-ikon" aria-hidden="true">' + (ikon || "🏛️") + "</p></div>";

  function oversikt() {
    document.title = "Museet vårt – " + (LV.config ? LV.config.navn : "Les verden");
    const liste = LV.museum.slice().sort((a, b) => (parseInt(a.tid.match(/\d{4}/)) || 0) - (parseInt(b.tid.match(/\d{4}/)) || 0));
    $("innhold").innerHTML = hode() +
      '<header class="sidehode"><p class="overlinje">Historie · lese og skrive</p><h1>🏛️ Museet vårt</h1><p class="ingress">Gjenstander kan fortelle historier som ikke står i historiebøkene. I dette museet er det ingen bilder – du må lese beskrivelsen nøye, som om du sto foran monteren. Så skriver du museumsskiltet selv. Velg en gjenstand – eller lag en hel utstilling.</p>' +
      '<nav class="dsp-innhold" aria-label="På denne siden"><ol><li><a href="#monteren">Monteren</a></li><li><a href="#utstilling">Lag en utstilling</a></li><li><a href="museum.html?id=egen">Skriv om din egen gjenstand</a></li></ol></nav></header>' +
      '<section id="monteren" aria-labelledby="ms-m"><h2 id="ms-m">Monteren</h2><ul class="ms-monter">' + liste.map(g => '<li><a href="museum.html?id=' + g.id + '"' + (g.sprak === "en" ? ' lang="en"' : "") + '><span class="ms-ikon" aria-hidden="true">' + g.ikon + "</span><strong>" + esc(g.navn) + '</strong><span class="ms-tid">' + esc(g.tid) + " · " + esc(g.sted) + "</span></a></li>").join("") +
      '<li><a href="museum.html?id=egen" class="ms-egen"><span class="ms-ikon" aria-hidden="true">➕</span><strong>Din egen gjenstand</strong><span class="ms-tid">Noe du har hjemme</span></a></li></ul></section>' +
      '<section id="utstilling" aria-labelledby="ms-u"><h2 id="ms-u">Lag en utstilling</h2><p>Velg tre til fem gjenstander som sammen forteller en historie – for eksempel «Hverdagsliv i krig», «Kampen for rettigheter» eller «Teknologi som forandret Norge». Gi utstillingen en tittel og skriv en introduksjon. Skriv deretter et kort skilt til hver gjenstand.</p>' +
      '<fieldset class="ms-velg"><legend>Velg gjenstander</legend>' + liste.map(g => '<label><input type="checkbox" value="' + g.id + '"> <span aria-hidden="true">' + g.ikon + "</span> " + esc(g.navn) + " (" + esc(g.tid) + ")</label>").join("") + "</fieldset>" +
      '<label for="ms-ut-tittel">Tittel på utstillingen</label><input type="text" id="ms-ut-tittel"><label for="ms-ut-intro">Introduksjon (hva vil utstillingen vise – og hvorfor er det viktig?)</label><textarea id="ms-ut-intro" rows="4"></textarea>' +
      '<div id="ms-ut-skilt"></div><div id="ms-ut-vis" class="ms-utstilling" aria-live="polite"></div><p><button type="button" class="knapp" id="ms-print">🖨️ Skriv ut utstillingen</button></p></section>' +
      '<p class="mu-intro">For læreren: La gruppene lage hver sin utstilling og ha «museumsvandring» i klasserommet. Elevene kan også ta med en gjenstand hjemmefra og skrive skilt til den (se <a href="lokalhistorie.html">Historien der du bor</a>). Gjenstandene er typiske eksempler, ikke bestemte museumsgjenstander. Vil dere se ekte gjenstander, finnes det mange på <a href="https://digitaltmuseum.no" rel="noopener">DigitaltMuseum</a>.</p>';
    const valgte = () => [...document.querySelectorAll(".ms-velg input:checked")].map(i => LV.museum.find(g => g.id === i.value));
    const tegnFelt = () => {
      const v = valgte(), gml = {}; document.querySelectorAll("#ms-ut-skilt textarea").forEach(t => { gml[t.id] = t.value; });
      $("ms-ut-skilt").innerHTML = v.map(g => '<label for="ms-ut-' + g.id + '">Skilt til «' + esc(g.navn) + '» (maks ' + MAKS + ' ord) – <a href="museum.html?id=' + g.id + '" target="_blank" rel="noopener">les om gjenstanden</a></label><textarea id="ms-ut-' + g.id + '" rows="3"></textarea>').join("");
      Object.entries(gml).forEach(([id, val]) => { if ($(id)) $(id).value = val; });
      vis();
    };
    const vis = () => {
      const v = valgte();
      $("ms-ut-vis").innerHTML = (v.length || $("ms-ut-tittel").value) ? '<div class="ms-ut-hode"><p class="ms-ut-t">' + esc($("ms-ut-tittel").value || "Tittel på utstillingen") + '</p><p>' + esc($("ms-ut-intro").value) + '</p></div><div class="ms-ut-rad">' + v.map(g => skilt({ tittel: g.navn, tid: g.tid + ", " + g.sted, tekst: ($("ms-ut-" + g.id) || {}).value || "" }, g.ikon)).join("") + "</div>" : "";
    };
    document.querySelector(".ms-velg").addEventListener("change", e => { if (valgte().length > 5) e.target.checked = false; tegnFelt(); });
    $("utstilling").addEventListener("input", vis);
    $("ms-print").addEventListener("click", () => { document.body.classList.add("ms-skriv-utstilling"); window.print(); document.body.classList.remove("ms-skriv-utstilling"); });
    svarlinje();
  }

  function gjenstand(g) {
    const egen = g.id === "egen", en = g.sprak === "en";
    document.title = (egen ? "Din egen gjenstand" : g.navn) + " – Museet vårt";
    const idx = LV.museum.indexOf(g), neste = LV.museum[(idx + 1) % LV.museum.length];
    const tema = !egen && LV.temaer.find(t => t.id === g.tema);
    $("innhold").innerHTML = hode(g) +
      '<header class="sidehode"><p class="overlinje">Museet vårt</p><h1><span aria-hidden="true">' + g.ikon + "</span> " + esc(egen ? "Din egen gjenstand" : g.navn) + "</h1>" + (egen ? '<p class="ingress">Ta med en gjenstand hjemmefra som har en historie – et gammelt bilde, et verktøy, et smykke, et brev, en leke. Spør noen hjemme om historien bak den. Beskriv den så nøye at andre kan se den for seg, og skriv museumsskiltet.</p>' : '<p class="ms-tid">' + esc(g.tid) + " · " + esc(g.sted) + "</p>") + "</header>" +
      '<div class="ms-oppsett"><div>' +
      (egen ? '<section class="ms-boks"><h2>👀 Se nøye</h2><label for="ms-beskriv">Beskriv gjenstanden: Hvor stor er den? Hva er den laget av? Farger, lukt, spor etter bruk?</label><textarea id="ms-beskriv" rows="5"></textarea><label for="ms-historie">Historien bak: Hvem har eid den? Når og hvor ble den brukt? Hva har noen fortalt deg om den?</label><textarea id="ms-historie" rows="5"></textarea></section>' :
        '<section class="ms-boks"' + (en ? ' lang="en"' : "") + '><h2>👀 ' + (en ? "Look closely" : "Se nøye") + '</h2><p class="ms-beskrivelse">' + esc(g.beskrivelse) + '</p></section><section class="ms-boks"' + (en ? ' lang="en"' : "") + '><h2>📌 ' + (en ? "Facts" : "Fakta") + "</h2><ul>" + g.fakta.map(f => "<li>" + esc(f) + "</li>").join("") + '</ul></section><section class="ms-boks"' + (en ? ' lang="en"' : "") + '><h2>💭 ' + (en ? "Think" : "Tenk") + "</h2><ol>" + g.sporsmal.map((s, i) => '<li><label for="ms-sp-' + i + '">' + esc(s) + '</label><textarea id="ms-sp-' + i + '" rows="2"></textarea></li>').join("") + "</ol></section>") +
      '<section class="ms-boks"><h2>✍️ Skriv museumsskiltet</h2><p class="fo-merk">Et godt museumsskilt er kort og presist. Det forteller hva gjenstanden er, og hvorfor den er viktig – og det får besøkende til å se nøyere etter.</p>' +
      '<label for="ms-tittel">Tittel</label><input type="text" id="ms-tittel" value="' + (egen ? "" : esc(g.navn)) + '"><label for="ms-tid2">Tid og sted</label><input type="text" id="ms-tid2" value="' + (egen ? "" : esc(g.tid + ", " + g.sted)) + '">' +
      '<label for="ms-tekst">Skilteksten (maks ' + MAKS + ' ord): Hva er dette, og hvorfor er det viktig?</label><textarea id="ms-tekst" rows="5"></textarea><p class="ms-teller" id="ms-teller" aria-live="polite">0 / ' + MAKS + ' ord</p>' +
      '<label for="ms-sp">Et spørsmål til besøkende (valgfritt)</label><input type="text" id="ms-sp"></section></div>' +
      '<aside class="ms-forhand" aria-label="Forhåndsvisning av skiltet"><p class="fo-merk">Slik blir skiltet:</p><div id="ms-skilt"></div><p><button type="button" class="knapp" id="ms-print">🖨️ Skriv ut skiltet</button></p>' +
      (tema ? '<p><a href="tema.html?id=' + encodeURIComponent(tema.id) + '">Les temaet «' + esc(tema.tittel) + "» →</a></p>" : "") + (egen ? "" : '<p><a href="museum.html?id=' + neste.id + '">Neste gjenstand: ' + esc(neste.navn) + " →</a></p>") + "</aside></div>";
    const oppd = () => {
      const n = ord($("ms-tekst").value);
      $("ms-teller").textContent = n + " / " + MAKS + " ord" + (n > MAKS ? " – for langt! Stryk det minst viktige." : "");
      $("ms-teller").classList.toggle("for-langt", n > MAKS);
      $("ms-skilt").innerHTML = skilt({ tittel: $("ms-tittel").value, tid: $("ms-tid2").value, tekst: $("ms-tekst").value, sp: $("ms-sp").value }, g.ikon);
    };
    $("innhold").addEventListener("input", oppd); oppd();
    $("ms-print").addEventListener("click", () => { document.body.classList.add("ms-skriv-skilt"); window.print(); document.body.classList.remove("ms-skriv-skilt"); });
    svarlinje();
  }

  document.addEventListener("DOMContentLoaded", () => {
    const id = LV.param("id");
    if (id === "egen") return gjenstand({ id: "egen", ikon: "🧸", navn: "Din egen gjenstand" });
    const g = LV.museum.find(x => x.id === id);
    if (g) gjenstand(g); else oversikt();
  });
})();
