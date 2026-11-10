/* =========================================================
   Les verden – Leseflyt (leseflyt.html)
   Gjentatt lesing: hør teksten lest høyt, les selv tre ganger
   med tidtaking (hele teksten eller ett minutt), la en makker
   markere feil, og se fremgangen i ord per minutt.
   Tekstene hentes fra temaene og Reading Room.
   leseflyt.html?tema=<id>[&lett=1][&del=n] · ?tekst=<lesing-id>
   Ingenting lagres – resultatene kan lastes ned med svarfil.js.
   ========================================================= */
(function () {
  const LV = window.LV;
  const $ = id => document.getElementById(id);
  const esc = s => LV.esc(String(s == null ? "" : s));
  const ren = s => String(s).replace(/\[\[([^\]|]+)(?:\|[^\]]*)?\]\]/g, "$1").replace(/\*\*?/g, "").replace(/<[^>]+>/g, "");
  const tell = s => ren(s).split(/\s+/).filter(Boolean).length;
  const mmss = s => Math.floor(s / 60) + ":" + String(Math.floor(s % 60)).padStart(2, "0");
  const RUNDER = 3;
  const hode = t => '<nav class="brodsmuler" aria-label="Brødsmuler"><a href="index.html">Forside</a> › <a href="lesestrategier.html">Lese og skrive</a> › <a href="leseflyt.html">Leseflyt</a>' + (t ? " › " + esc(t) : "") + "</nav>";

  function oversikt() {
    document.title = "Leseflyt – " + (LV.config ? LV.config.navn : "Les verden");
    const tema = (LV.temaer || []).slice().sort((a, b) => a.fag.localeCompare(b.fag) || a.trinn - b.trinn || a.tittel.localeCompare(b.tittel));
    $("innhold").innerHTML = hode() +
      '<header class="sidehode"><p class="overlinje">Lesetrening</p><h1>⏱️ Leseflyt: gjentatt lesing</h1><p class="ingress">Når du leser en tekst flere ganger, går lesingen lettere for hver gang – og når ordene går av seg selv, får hjernen mer plass til å forstå. Hør teksten først, les den høyt tre ganger, og se hvordan du blir bedre.</p></header>' +
      '<ol class="lf-steg"><li><span aria-hidden="true">🎧</span><strong>Hør</strong> teksten lest høyt</li><li><span aria-hidden="true">🗣️</span><strong>Les høyt</strong> tre ganger – en makker tar tiden</li><li><span aria-hidden="true">✏️</span><strong>Makkeren</strong> markerer ord som blir feil</li><li><span aria-hidden="true">📈</span><strong>Se</strong> fremgangen og tenk over lesingen</li></ol>' +
      '<p class="lf-viktig"><strong>Viktig:</strong> Målet er ikke å lese fortest mulig, men å lese jevnt, riktig og med innlevelse – og forstå det du leser. Sammenlign deg bare med deg selv.</p>' +
      '<form class="ly-velg" id="lf-velg"><label for="lf-tema">Samfunnsfag- eller engelsktema</label><select id="lf-tema"><option value="">Velg et tema …</option>' +
      ["samfunnsfag", "engelsk"].map(f => '<optgroup label="' + (f === "engelsk" ? "Engelsk" : "Samfunnsfag") + '">' + tema.filter(t => t.fag === f).map(t => '<option value="tema:' + t.id + '">' + t.trinn + ". trinn – " + esc(t.tittel) + "</option>").join("") + "</optgroup>").join("") +
      '</select><label for="lf-tekst"><span lang="en">Reading Room</span></label><select id="lf-tekst"><option value="">Velg en tekst …</option>' + (LV.lesetekster || []).filter(t => !t.utenTekst).map(t => '<option value="tekst:' + t.id + '" lang="en">' + esc(t.tittel) + " – " + esc(t.forfatter) + "</option>").join("") + "</select>" +
      '<label class="ly-lett"><input type="checkbox" id="lf-lett"> Bruk lettere tekst når den finnes</label><button class="knapp hoved" type="submit">Start →</button></form>' +
      '<p class="mu-intro">Tips: Les i par. Den ene leser, den andre tar tiden og markerer feil. Bytt etter tre runder. Velg en kort del av teksten – det er bedre å lese en kort tekst godt enn en lang tekst dårlig.</p>';
    $("lf-tema").addEventListener("change", () => { if ($("lf-tema").value) $("lf-tekst").value = ""; });
    $("lf-tekst").addEventListener("change", () => { if ($("lf-tekst").value) $("lf-tema").value = ""; });
    $("lf-velg").addEventListener("submit", e => {
      e.preventDefault();
      const v = $("lf-tema").value || $("lf-tekst").value; if (!v) return;
      const [type, id] = v.split(":");
      location.search = "?" + type + "=" + encodeURIComponent(id) + ($("lf-lett").checked ? "&lett=1" : "");
    });
  }

  async function hentDeler(type, id, lett) {
    let tittel, sp, deler = [], lenke;
    if (type === "tema") {
      if (!LV.temaer.find(t => t.id === id)) throw 0;
      await LV.lastSkript("data/temaer/" + id + ".js");
      const t = LV.tema; tittel = t.tittel; sp = t.sprak === "en" ? "en" : "nb"; lenke = "tema.html?id=" + id;
      deler = t.avsnitt.map(a => ({ h: a.tittel, p: (lett && a.lett && a.lett.length ? a.lett : a.tekst).filter(p => typeof p === "string").map(ren) })).filter(d => d.p.length);
    } else {
      const info = (LV.lesetekster || []).find(t => t.id === id); if (!info) throw 0;
      await LV.lastSkript("data/lesing/" + id + ".js");
      const d = LV.lesetekst; tittel = info.tittel + " – " + info.forfatter; sp = "en"; lenke = "lesing.html?id=" + id;
      let buf = [], h = null;
      const tom = () => { if (buf.length) deler.push({ h: h, p: buf }); buf = []; h = null; };
      ((lett && d.lett ? d.lett : d.tekst) || []).forEach(p => {
        if (typeof p !== "string") { if (p.h) { tom(); h = p.h; } else if (p.vers) buf.push(p.vers.replace(/\n+/g, " / ")); return; }
        buf.push(ren(p));
        if (tell(buf.join(" ")) >= 150) tom();
      });
      tom();
      deler.forEach((x, i) => { if (!x.h) x.h = "Del " + (i + 1); });
    }
    return { tittel, sp, deler, lenke };
  }

  async function okt(type, id, lett, delNr) {
    let T;
    try { T = await hentDeler(type, id, lett); } catch (e) { $("innhold").innerHTML = hode() + '<p>Fant ikke teksten. <a href="leseflyt.html">Velg en annen</a>.</p>'; return; }
    const n = Math.min(Math.max(0, delNr || 0), T.deler.length - 1), del = T.deler[n];
    const ordliste = del.p.map(p => p.split(/\s+/).filter(Boolean));
    const antall = ordliste.reduce((s, a) => s + a.length, 0);
    const lang = T.sp === "en" ? ' lang="en"' : "";
    const url = i => "leseflyt.html?" + type + "=" + encodeURIComponent(id) + (lett ? "&lett=1" : "") + "&del=" + i;
    document.title = "Leseflyt: " + T.tittel;

    $("innhold").innerHTML = hode(T.tittel) +
      '<header class="sidehode"><p class="overlinje">⏱️ Leseflyt' + (lett ? " · lettere tekst" : "") + "</p><h1" + lang + ">" + esc(T.tittel) + '</h1><p class="ly-meta"><a href="' + T.lenke + '">Åpne hele teksten</a></p></header>' +
      (T.deler.length > 1 ? '<nav class="lf-deler" aria-label="Velg del av teksten"><span>Velg del:</span>' + T.deler.map((d, i) => '<a class="knapp liten" href="' + url(i) + '"' + (i === n ? ' aria-current="page"' : "") + "><span" + lang + ">" + (i + 1) + ". " + esc(d.h) + "</span> <small>(" + d.p.reduce((s, p) => s + tell(p), 0) + " ord)</small></a>").join("") + "</nav>" : "") +

      '<section class="le-del"><h2>1. Hør teksten</h2><p class="mu-intro">Hør hvordan teksten kan leses: Følg med i teksten mens du lytter. Legg merke til pauser og hvilke ord som får trykk.</p>' +
      '<div class="lf-kontroll"><button type="button" class="knapp" id="lf-hor">🔊 Hør teksten</button><label class="ly-fart">Tempo <select id="lf-fart"><option value="0.7">Rolig</option><option value="0.85" selected>Middels</option><option value="1">Normalt</option></select></label></div><p class="lf-varsel" id="lf-varsel" role="status"></p></section>' +

      '<section class="le-del"><h2>2. Les høyt – tre runder</h2>' +
      '<fieldset class="lf-modus"><legend>Hvordan vil dere måle?</legend><label><input type="radio" name="lf-modus" value="hel" checked> Les hele teksten – vi tar tiden</label><label><input type="radio" name="lf-modus" value="min"> Les i ett minutt – så trykker vi på siste ord</label></fieldset>' +
      '<div class="lf-panel"><div class="lf-klokke" id="lf-klokke" aria-live="off">0:00</div><div class="lf-knapper"><button type="button" class="knapp hoved" id="lf-start">▶ Start runde 1</button> <button type="button" class="knapp" id="lf-merk" aria-pressed="false">✏️ Marker feil</button></div>' +
      '<p class="lf-melding" id="lf-melding" role="status" aria-live="polite">' + antall + ' ord. Leseren gjør seg klar – makkeren trykker «Start» og leseren begynner.</p></div>' +
      '<div class="lf-tekst" id="lf-tekst"' + lang + '></div>' +
      '<h3>Resultater</h3><div class="lf-tabell"><table><thead><tr><th scope="col">Runde</th><th scope="col">Resultat</th><th scope="col">Riktige ord per minutt</th></tr></thead><tbody>' +
      Array.from({ length: RUNDER }, (_, i) => '<tr><th scope="row">' + (i + 1) + '</th><td><label class="skjult-visuelt" for="lf-r' + (i + 1) + '">Resultat runde ' + (i + 1) + '</label><textarea class="lf-res" id="lf-r' + (i + 1) + '" rows="2" readonly></textarea></td><td><span class="lf-stolpe" id="lf-s' + (i + 1) + '"><span></span><b></b></span></td></tr>').join("") +
      '</tbody></table></div><p class="lf-fremgang" id="lf-fremgang" role="status" aria-live="polite"></p><button type="button" class="knapp liten" id="lf-nullstill">↻ Nullstill rundene</button></section>' +

      '<section class="le-del"><h2>3. Les med innlevelse</h2><p class="mu-intro">God leseflyt er mer enn fart. Kryss av for det som stemte i siste runde – gjerne sammen med makkeren.</p><ul class="lf-prosodi">' +
      ["Jeg tok pause ved punktum og komma.", "Jeg leste i et passe tempo – ikke for fort.", "Jeg la trykk på de viktige ordene.", "Jeg rettet meg selv når jeg leste feil.", "Stemmen min passet til det teksten handler om."].map((s, i) => '<li><label><input type="checkbox" id="lf-p' + i + '"> ' + s + "</label></li>").join("") + "</ul>" +
      '<h3>🎙️ Ta opp lesingen din</h3><p class="mu-intro">Ta opp første og siste runde og hør forskjellen. Hør etter pauser, tempo og trykk. Opptaket lagres ikke – last det ned hvis du vil ta vare på det eller levere det.</p><div id="lf-opptak"></div></section>' +

      '<section class="le-del"><h2>4. Forstod du teksten?</h2>' +
      [["lf-f1", "Hva handlet teksten om? Skriv to–tre setninger med egne ord."], ["lf-f2", "Hvilke ord eller setninger var vanskelige å lese?"], ["lf-f3", "Hva gjorde du annerledes i siste runde enn i første?"]].map(([fid, l]) => '<label class="mu-notat" for="' + fid + '"><span>' + l + '</span><textarea id="' + fid + '" rows="3"></textarea></label>').join("") +
      (n < T.deler.length - 1 ? '<p><a class="knapp" href="' + url(n + 1) + '">Neste del →</a></p>' : "") + "</section>";

    if (LV.opptaker) LV.opptaker($("lf-opptak"), { id: "lf-opp", filnavn: "leseflyt" });

    // ---------- Tekst ----------
    const feil = new Set();
    let modus = "les", sisteOrd = null; // les | feil | siste
    function tegn() {
      let i = 0;
      const klikk = modus !== "les";
      $("lf-tekst").className = "lf-tekst" + (klikk ? " lf-klikk lf-" + modus : "");
      $("lf-tekst").innerHTML = ordliste.map(ordene => "<p>" + ordene.map(o => {
        const k = i++, kl = "lf-o" + (feil.has(k) ? " lf-feilord" : "") + (sisteOrd === k ? " lf-siste" : "") + (sisteOrd != null && k > sisteOrd ? " lf-etter" : "");
        return klikk ? '<button type="button" class="' + kl + '" data-i="' + k + '"' + (modus === "feil" ? ' aria-pressed="' + feil.has(k) + '"' : "") + ">" + esc(o) + "</button>" : '<span class="' + kl + '">' + esc(o) + "</span>";
      }).join(" ") + "</p>").join("");
    }
    $("lf-tekst").addEventListener("click", e => {
      const b = e.target.closest("button.lf-o"); if (!b) return;
      const k = +b.dataset.i;
      if (modus === "feil") { if (feil.has(k)) feil.delete(k); else feil.add(k); b.classList.toggle("lf-feilord"); b.setAttribute("aria-pressed", String(feil.has(k))); oppdaterFeil(); }
      else if (modus === "siste") { sisteOrd = k; modus = "les"; avsluttMinutt(); }
    });
    tegn();

    // ---------- Opplesing ----------
    const kanLese = "speechSynthesis" in window;
    if (!kanLese) { $("lf-hor").disabled = true; $("lf-varsel").textContent = "Nettleseren din kan ikke lese opp tekst. Be læreren eller en makker lese teksten høyt først."; }
    const norskStemme = () => speechSynthesis.getVoices().find(v => /^(nb|no|nn)/i.test(v.lang));
    $("lf-hor").addEventListener("click", () => {
      if (speechSynthesis.speaking) { speechSynthesis.cancel(); $("lf-hor").textContent = "🔊 Hør teksten"; return; }
      const tekst = del.p.join(" ").replace(/ \/ /g, ", "), fart = +$("lf-fart").value, ferdig = () => { $("lf-hor").textContent = "🔊 Hør teksten"; };
      $("lf-hor").textContent = "⏹ Stopp";
      if (T.sp === "en") LV.lesEngelsk(tekst, "en-GB", fart, ferdig);
      else {
        const u = new SpeechSynthesisUtterance(tekst); u.lang = "nb-NO"; u.rate = fart; const v = norskStemme(); if (v) u.voice = v; else $("lf-varsel").textContent = "Nettleseren din har kanskje ingen norsk stemme. Hvis uttalen blir feil, kan læreren eller en makker lese teksten høyt.";
        u.onend = ferdig; u.onerror = ferdig; speechSynthesis.speak(u);
      }
    });

    // ---------- Tidtaking ----------
    let runde = 1, start = 0, tikk = null, sek = 0, gaar = false;
    const modusVerdi = () => document.querySelector('input[name="lf-modus"]:checked').value;
    const klokke = s => { $("lf-klokke").textContent = mmss(s); };
    function startRunde() {
      if (runde > RUNDER) return;
      if (kanLese) speechSynthesis.cancel();
      feil.clear(); sisteOrd = null; modus = "les"; tegn(); settMerk(false);
      gaar = true; start = performance.now(); sek = 0;
      const ettMin = modusVerdi() === "min";
      document.querySelectorAll('input[name="lf-modus"]').forEach(r => { r.disabled = true; });
      $("lf-start").textContent = ettMin ? "⏹ Avbryt" : "■ Ferdig";
      $("lf-melding").textContent = "Runde " + runde + ": Les nå! " + (ettMin ? "Klokka stopper etter ett minutt." : "Trykk «Ferdig» når siste ord er lest.");
      tikk = setInterval(() => {
        sek = (performance.now() - start) / 1000;
        if (ettMin) { klokke(Math.max(0, 60 - sek)); if (sek >= 60) { stopp(); sek = 60; modus = "siste"; tegn(); $("lf-melding").textContent = "⏰ Stopp! Trykk på det siste ordet leseren rakk å lese."; $("lf-start").disabled = true; const forste = $("lf-tekst").querySelector("button"); if (forste) forste.focus(); } }
        else klokke(sek);
      }, 200);
    }
    function stopp() { clearInterval(tikk); gaar = false; $("lf-start").textContent = "▶ Start runde " + runde; }
    function avbryt() { stopp(); klokke(0); document.querySelectorAll('input[name="lf-modus"]').forEach(r => { r.disabled = false; }); $("lf-melding").textContent = "Runden ble avbrutt. Start på nytt når dere er klare."; }
    function avsluttMinutt() { tegn(); $("lf-start").disabled = false; lagre(sisteOrd + 1, 60); }
    $("lf-start").addEventListener("click", () => {
      if (!gaar) { startRunde(); return; }
      if (modusVerdi() === "min") { avbryt(); return; }
      stopp(); sek = (performance.now() - start) / 1000; klokke(sek);
      if (sek < 3) { avbryt(); return; }
      lagre(antall, sek);
    });

    const runder = [];
    let gjeldende = -1;
    function tekstFor(r) { const rpm = Math.round((r.ord - r.feil) / (r.sek / 60)); return "Tid " + mmss(r.sek) + " · " + r.ord + " ord lest · " + r.feil + " feil · " + rpm + " riktige ord per minutt"; }
    function lagre(ord, s) {
      gjeldende = runde - 1;
      runder[gjeldende] = { ord, sek: s, feil: 0 };
      skriv(gjeldende);
      runde++;
      document.querySelectorAll('input[name="lf-modus"]').forEach(r => { r.disabled = false; });
      $("lf-melding").textContent = "Runde " + (gjeldende + 1) + " er ferdig. Makker: Trykk «Marker feil» og trykk på ordene som ble lest feil. " + (runde <= RUNDER ? "Start neste runde når dere er klare." : "Det var siste runde – se fremgangen nedenfor.");
      if (runde > RUNDER) { $("lf-start").disabled = true; $("lf-start").textContent = "✔ Tre runder lest"; } else $("lf-start").textContent = "▶ Start runde " + runde;
    }
    function skriv(i) { const inp = $("lf-r" + (i + 1)); inp.value = tekstFor(runder[i]); inp.dispatchEvent(new Event("input", { bubbles: true })); }
    function oppdaterFeil() { if (gjeldende >= 0 && runder[gjeldende]) { runder[gjeldende].feil = feil.size; skriv(gjeldende); } }
    function settMerk(pa) { $("lf-merk").setAttribute("aria-pressed", String(pa)); $("lf-merk").textContent = pa ? "✔ Ferdig med å markere" : "✏️ Marker feil"; }
    $("lf-merk").addEventListener("click", () => {
      if (gaar || modus === "siste") return;
      const pa = modus !== "feil"; modus = pa ? "feil" : "les"; settMerk(pa); tegn();
      if (pa && gjeldende < 0) $("lf-melding").textContent = "Les en runde først – så kan makkeren markere feil.";
      else if (pa) $("lf-melding").textContent = "Trykk på ordene som ble lest feil i runde " + (gjeldende + 1) + ". Trykk igjen for å fjerne et merke. Antall feil: " + feil.size + ".";
    });

    // Stolper og fremgang – leses fra feltene, så de også virker etter «Fortsett fra fil»
    const tall = v => { const m = /(\d+) riktige ord per minutt/.exec(v || ""); return m ? +m[1] : null; };
    function stolper() {
      const verdier = Array.from({ length: RUNDER }, (_, i) => tall($("lf-r" + (i + 1)).value));
      const maks = Math.max(1, ...verdier.filter(v => v != null));
      verdier.forEach((v, i) => { const s = $("lf-s" + (i + 1)); s.firstChild.style.width = v == null ? "0" : Math.round(v / maks * 100) + "%"; s.lastChild.textContent = v == null ? "–" : v; });
      const lest = verdier.filter(v => v != null);
      if (lest.length >= 2) {
        const diff = lest[lest.length - 1] - lest[0];
        $("lf-fremgang").textContent = diff > 0 ? "📈 Fra første til siste runde økte du med " + diff + " riktige ord per minutt. Godt jobbet!" : diff === 0 ? "Like mange riktige ord per minutt som i første runde. Hvordan var innlevelsen?" : "Siste runde gikk litt saktere. Det er helt greit – kanskje leste du med mer innlevelse? Snakk med makkeren om hva som skjedde.";
      } else $("lf-fremgang").textContent = "";
      const brukt = lest.length; if (brukt > runder.filter(Boolean).length && runde <= brukt) { runde = brukt + 1; if (runde > RUNDER) { $("lf-start").disabled = true; $("lf-start").textContent = "✔ Tre runder lest"; } else $("lf-start").textContent = "▶ Start runde " + runde; }
    }
    document.querySelectorAll(".lf-res").forEach(inp => inp.addEventListener("input", stolper));
    $("lf-nullstill").addEventListener("click", () => {
      if (gaar) stopp();
      runder.length = 0; gjeldende = -1; runde = 1; feil.clear(); sisteOrd = null; modus = "les"; settMerk(false); tegn(); klokke(0);
      document.querySelectorAll(".lf-res").forEach(inp => { inp.value = ""; });
      document.querySelectorAll('input[name="lf-modus"]').forEach(r => { r.disabled = false; });
      $("lf-start").disabled = false; $("lf-start").textContent = "▶ Start runde 1"; $("lf-melding").textContent = "Klar for ny lesing. " + antall + " ord.";
      stolper();
    });
    stolper();
  }

  document.addEventListener("DOMContentLoaded", () => {
    const tema = LV.param("tema"), tekst = LV.param("tekst"), lett = LV.param("lett") === "1", del = parseInt(LV.param("del"), 10) || 0;
    if (tema) okt("tema", tema, lett, del); else if (tekst) okt("tekst", tekst, lett, del); else oversikt();
    const linje = document.createElement("div");
    linje.className = "svarlinje";
    linje.innerHTML = '<div class="svarlinje-indre"><label class="skjult-visuelt" for="elevnavn">Navn</label><input id="elevnavn" type="text" placeholder="Navn" autocomplete="off"><span class="status" role="status" aria-live="polite"></span></div>';
    document.body.appendChild(linje);
  });
})();
