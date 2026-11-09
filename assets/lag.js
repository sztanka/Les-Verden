/* =========================================================
   Les verden – Lag selv (lag.html)
   Elevene lager sin egen quiz, tidslinje eller ordkort.
   Alt innholdet ligger i lenken (etter #), komprimert.
   Ingenting lagres på nettstedet eller sendes noe sted:
   delen etter # blir aldri sendt til serveren.
   lag.html               → oversikt
   lag.html?lag=quiz#…    → lag / rediger (quiz | tid | kort)
   lag.html?vis#…         → spill / vis
   ========================================================= */
(function () {
  const LV = window.LV;
  const $ = id => document.getElementById(id);
  const esc = s => LV.esc(String(s == null ? "" : s));
  const bland = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const MAKS = 30;
  const TYPER = {
    quiz: { navn: "Quiz", ikon: "❓", farge: "var(--lilla)", tekst: "Lag flervalgsspørsmål med forklaring. Klassen svarer og får poeng.", ny: () => ({ s: "", a: ["", "", "", ""], r: 0, f: "" }), enhet: "Spørsmål" },
    tid: { navn: "Tidslinje", ikon: "📅", farge: "var(--samfunnsfag)", tekst: "Legg inn hendelser med årstall. Klassen ser tidslinja – og kan prøve å sortere hendelsene.", ny: () => ({ y: "", n: "", b: "" }), enhet: "Hendelse" },
    kort: { navn: "Ordkort", ikon: "🃏", farge: "var(--engelsk)", tekst: "Skriv ord eller begreper med forklaring. Klassen øver med kort som snus.", ny: () => ({ o: "", d: "" }), enhet: "Kort" }
  };
  const EKSEMPEL = {
    quiz: { t: "quiz", e: 1, ti: "Demokratiet i Norge", l: "nb", q: [
      { s: "Hvilket år ble Grunnloven vedtatt på Eidsvoll?", a: ["1814", "1905", "1884", "1945"], r: 0, f: "Grunnloven ble vedtatt 16. mai og datert 17. mai 1814." },
      { s: "Hvem har den lovgivende makten i Norge?", a: ["Stortinget", "Regjeringen", "Høyesterett", "Kongen alene"], r: 0, f: "Stortinget vedtar lover. Regjeringen har den utøvende makten, og domstolene den dømmende." },
      { s: "Hvor ofte er det stortingsvalg?", a: ["Hvert fjerde år", "Hvert andre år", "Hvert femte år", "Hvert sjette år"], r: 0, f: "Det er stortingsvalg hvert fjerde år, og kommune- og fylkestingsvalg midt imellom." }
    ] },
    tid: { t: "tid", e: 1, ti: "Veien til demokrati i Norge", l: "nb", q: [
      { y: "1814", n: "Grunnloven", b: "Riksforsamlingen på Eidsvoll vedtar Grunnloven." },
      { y: "1884", n: "Parlamentarismen", b: "Regjeringen må ha støtte fra Stortinget for å kunne sitte." },
      { y: "1898", n: "Allmenn stemmerett for menn", b: "Alle menn over 25 år får stemmerett." },
      { y: "1905", n: "Unionen med Sverige oppløses", b: "Norge blir et selvstendig land med egen konge." },
      { y: "1913", n: "Allmenn stemmerett for kvinner", b: "Kvinner får stemmerett ved stortingsvalg på lik linje med menn." }
    ] },
    kort: { t: "kort", e: 1, ti: "Words about democracy", l: "en", q: [
      { o: "election", d: "When people vote to choose who will represent them." },
      { o: "parliament", d: "The group of elected people who make the laws of a country." },
      { o: "freedom of speech", d: "The right to say what you think without being punished by the state." },
      { o: "vote", d: "To choose officially, for example in an election." }
    ] }
  };

  // ---------- Koding: JSON → (komprimert) base64url ----------
  const b64 = bytes => { let s = ""; bytes.forEach(b => { s += String.fromCharCode(b); }); return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""); };
  const fraB64 = s => { s = s.replace(/-/g, "+").replace(/_/g, "/"); while (s.length % 4) s += "="; return Uint8Array.from(atob(s), c => c.charCodeAt(0)); };
  const kanPakke = typeof CompressionStream === "function" && typeof DecompressionStream === "function";
  async function strom(bytes, Strom) { const r = new Blob([bytes]).stream().pipeThrough(new Strom("deflate-raw")); return new Uint8Array(await new Response(r).arrayBuffer()); }
  async function kod(data) {
    const raa = new TextEncoder().encode(JSON.stringify(data));
    if (kanPakke) { try { return "1" + b64(await strom(raa, CompressionStream)); } catch (e) { /* faller tilbake */ } }
    return "0" + b64(raa);
  }
  async function dekod(h) {
    if (!h) return null;
    try {
      const bytes = fraB64(h.slice(1));
      const raa = h[0] === "1" ? await strom(bytes, DecompressionStream) : bytes;
      const d = JSON.parse(new TextDecoder().decode(raa));
      return d && TYPER[d.t] && Array.isArray(d.q) ? rens(d) : null;
    } catch (e) { return null; }
  }
  // Godtar bare kjente felt og korte tekster
  function rens(d) {
    const s = (v, n) => String(v == null ? "" : v).slice(0, n || 300);
    const ut = { t: d.t, ti: s(d.ti, 100), l: d.l === "en" ? "en" : "nb", q: [] };
    if (d.e === 1) ut.e = 1;
    d.q.slice(0, MAKS).forEach(x => {
      if (!x || typeof x !== "object") return;
      if (d.t === "quiz") ut.q.push({ s: s(x.s), a: (Array.isArray(x.a) ? x.a : []).slice(0, 4).map(v => s(v, 150)).concat(["", "", "", ""]).slice(0, 4), r: Math.min(3, Math.max(0, parseInt(x.r, 10) || 0)), f: s(x.f) });
      else if (d.t === "tid") ut.q.push({ y: s(x.y, 6).replace(/[^\d-]/g, ""), n: s(x.n, 120), b: s(x.b) });
      else ut.q.push({ o: s(x.o, 120), d: s(x.d) });
    });
    return ut;
  }
  const lenke = (kode, modus) => location.href.split(/[?#]/)[0] + modus + "#" + kode;
  const arTekst = y => { const n = parseInt(y, 10); return isNaN(n) ? "" : n < 0 ? -n + " f.Kr." : String(n); };
  const hode = t => '<nav class="brodsmuler" aria-label="Brødsmuler"><a href="index.html">Forside</a> › <a href="spill.html">Spill</a> › <a href="lag.html">Lag selv</a>' + (t ? " › " + esc(t) : "") + "</nav>";

  // ---------- Oversikt ----------
  function oversikt() {
    document.title = "Lag selv – " + (LV.config ? LV.config.navn : "Les verden");
    $("innhold").innerHTML = hode() +
      '<header class="sidehode"><p class="overlinje">Elevskapt innhold</p><h1>🛠️ Lag selv</h1><p class="ingress">Den beste måten å lære noe på er å lære det bort. Lag din egen quiz, tidslinje eller ordkort om et tema – og del lenken med klassen. Når du må finne gode spørsmål, gode forklaringer og riktige årstall, leser du teksten på en ny måte.</p></header>' +
      '<ul class="lg-typer">' + Object.entries(TYPER).map(([k, t]) => '<li class="lg-type" style="--lg:' + t.farge + '"><p class="lg-type-ikon" aria-hidden="true">' + t.ikon + "</p><h2>" + t.navn + "</h2><p>" + t.tekst + '</p><p class="lg-type-knapper"><a class="knapp hoved" href="lag.html?lag=' + k + '">Lag ' + t.navn.toLowerCase() + ' →</a><a class="knapp liten" href="#" data-eksempel="' + k + '">Se et eksempel</a></p></li>').join("") + "</ul>" +
      '<div class="lg-info"><section><h2>Slik gjør du</h2><ol><li>Les et tema eller en tekst, og velg hva du vil lage.</li><li>Skriv innholdet. Sjekk fakta i teksten – det du lager, skal være riktig!</li><li>Trykk «Prøv» for å se hvordan det blir.</li><li>Kopier lenken og del den med læreren eller klassen.</li></ol></section>' +
      '<section><h2>Lenken er lagringen</h2><p>Alt du skriver, ligger inni lenken – ingenting lagres på nettstedet. Lenken i adresselinja oppdateres mens du skriver. <strong>Kopier lenken før du lukker siden</strong>, ellers forsvinner arbeidet. Den som åpner lenken, kan spille, og kan lage sin egen kopi og endre den.</p><p><strong>Ikke skriv navn</strong> eller personlige opplysninger i det du lager.</p></section></div>' +
      '<p class="fo-merk">Til læreren: La elevene lage en quiz eller tidslinje til hverandre i slutten av et tema. Samle lenkene i en delt mappe eller i læringsplattformen. Bytt i par: Elev A spiller Elev Bs quiz og gir tilbakemelding på om spørsmålene er tydelige og riktige.</p>';
    document.querySelectorAll("[data-eksempel]").forEach(a => a.addEventListener("click", async e => { e.preventDefault(); location.href = lenke(await kod(EKSEMPEL[a.dataset.eksempel]), "?vis"); }));
  }

  // ---------- Redigering ----------
  async function rediger(type, hash) {
    const T = TYPER[type];
    let d = (await dekod(hash)) || { t: type, ti: "", l: "nb", q: [T.ny(), T.ny(), T.ny()] };
    if (d.t !== type) d = { t: type, ti: d.ti, l: d.l, q: [T.ny()] };
    delete d.e;
    if (!d.q.length) d.q.push(T.ny());
    document.title = "Lag " + T.navn.toLowerCase() + " – Lag selv";
    $("innhold").innerHTML = hode("Lag " + T.navn.toLowerCase()) +
      '<header class="sidehode"><p class="overlinje">Lag selv</p><h1><span aria-hidden="true">' + T.ikon + "</span> Lag " + T.navn.toLowerCase() + "</h1></header>" +
      '<div class="lg-hode"><label class="lg-felt lg-tittel" for="lg-ti"><span>Tittel</span><input type="text" id="lg-ti" maxlength="100" placeholder="For eksempel: Den kalde krigen" autocomplete="off"></label>' +
      '<fieldset class="lg-sprak"><legend>Språk</legend><label><input type="radio" name="lg-l" value="nb"> Norsk</label><label><input type="radio" name="lg-l" value="en"> Engelsk</label></fieldset></div>' +
      '<p class="mu-intro">' + (type === "tid" ? "Skriv årstall som tall. Bruk minus for år før vår tidsregning: −490 blir «490 f.Kr.». Rekkefølgen ordnes automatisk." : type === "quiz" ? "Skriv spørsmålet, minst to svaralternativer, og velg hvilket som er riktig. Alternativene blandes når quizen spilles." : "Skriv ordet eller begrepet på forsiden og forklaringen på baksiden.") + " Ikke skriv navn eller personlige opplysninger.</p>" +
      '<ol class="lg-liste" id="lg-liste"></ol><p><button type="button" class="knapp" id="lg-ny">➕ Legg til ' + T.enhet.toLowerCase() + '</button> <span class="lg-antall" id="lg-antall"></span></p>' +
      '<section class="lg-del" aria-labelledby="lg-del-h"><h2 id="lg-del-h">🔗 Prøv og del</h2><p class="lg-feil" id="lg-feil" role="alert"></p>' +
      '<label class="lg-felt" for="lg-lenke"><span>Lenke til ' + T.navn.toLowerCase() + 'en – kopier og del</span><input type="text" id="lg-lenke" readonly></label>' +
      '<p class="lg-del-knapper"><button type="button" class="knapp hoved" id="lg-kopier">📋 Kopier lenken</button> <a class="knapp" id="lg-prov" href="#">▶ Prøv</a> <span class="lg-status" id="lg-status" role="status" aria-live="polite"></span></p>' +
      '<p class="lg-merk" id="lg-lang"></p><p class="lg-merk">Lenken inneholder alt du har skrevet. Ingenting lagres på nettstedet.</p></section>';

    $("lg-ti").value = d.ti;
    document.querySelector('input[name="lg-l"][value="' + d.l + '"]').checked = true;

    function radHtml(x, i) {
      const n = d.q.length, p = "lg-" + i;
      let h = '<li class="lg-rad"><fieldset><legend>' + T.enhet + " " + (i + 1) + '</legend><div class="lg-flytt">' +
        '<button type="button" class="knapp liten" data-flytt="-1" data-i="' + i + '"' + (i === 0 ? " disabled" : "") + ' aria-label="Flytt ' + T.enhet.toLowerCase() + " " + (i + 1) + ' opp">↑</button>' +
        '<button type="button" class="knapp liten" data-flytt="1" data-i="' + i + '"' + (i === n - 1 ? " disabled" : "") + ' aria-label="Flytt ' + T.enhet.toLowerCase() + " " + (i + 1) + ' ned">↓</button>' +
        '<button type="button" class="knapp liten" data-slett="' + i + '"' + (n === 1 ? " disabled" : "") + ' aria-label="Slett ' + T.enhet.toLowerCase() + " " + (i + 1) + '">🗑️</button></div>';
      if (type === "quiz") {
        h += '<label class="lg-felt" for="' + p + '-s"><span>Spørsmål</span><textarea id="' + p + '-s" data-i="' + i + '" data-f="s" rows="2" maxlength="300"></textarea></label>' +
          '<div class="lg-alt" role="group" aria-label="Svaralternativer – velg det riktige">' + [0, 1, 2, 3].map(j => '<div class="lg-alt-rad"><input type="radio" name="' + p + '-r" id="' + p + "-r" + j + '" data-i="' + i + '" data-r="' + j + '"><label for="' + p + "-r" + j + '" class="skjult-visuelt">Alternativ ' + (j + 1) + ' er riktig</label><label class="skjult-visuelt" for="' + p + "-a" + j + '">Alternativ ' + (j + 1) + '</label><input type="text" id="' + p + "-a" + j + '" data-i="' + i + '" data-a="' + j + '" maxlength="150" placeholder="Alternativ ' + (j + 1) + (j < 2 ? "" : " (valgfritt)") + '" autocomplete="off"></div>').join("") + '<p class="lg-hint">Trykk på rundingen foran det riktige svaret.</p></div>' +
          '<label class="lg-felt" for="' + p + '-f"><span>Forklaring (vises etter svaret)</span><textarea id="' + p + '-f" data-i="' + i + '" data-f="f" rows="2" maxlength="300"></textarea></label>';
      } else if (type === "tid") {
        h += '<div class="lg-to"><label class="lg-felt lg-ar" for="' + p + '-y"><span>År</span><input type="number" id="' + p + '-y" data-i="' + i + '" data-f="y" min="-9999" max="9999" step="1"></label>' +
          '<label class="lg-felt" for="' + p + '-n"><span>Hendelse</span><input type="text" id="' + p + '-n" data-i="' + i + '" data-f="n" maxlength="120" autocomplete="off"></label></div>' +
          '<label class="lg-felt" for="' + p + '-b"><span>Kort forklaring (valgfritt)</span><textarea id="' + p + '-b" data-i="' + i + '" data-f="b" rows="2" maxlength="300"></textarea></label>';
      } else {
        h += '<div class="lg-to"><label class="lg-felt" for="' + p + '-o"><span>Ord eller begrep</span><input type="text" id="' + p + '-o" data-i="' + i + '" data-f="o" maxlength="120" autocomplete="off"></label>' +
          '<label class="lg-felt" for="' + p + '-d"><span>Forklaring</span><textarea id="' + p + '-d" data-i="' + i + '" data-f="d" rows="2" maxlength="300"></textarea></label></div>';
      }
      return h + "</fieldset></li>";
    }
    function tegn(fokus) {
      $("lg-liste").innerHTML = d.q.map(radHtml).join("");
      d.q.forEach((x, i) => {
        const p = "lg-" + i;
        if (type === "quiz") { $(p + "-s").value = x.s; $(p + "-f").value = x.f; x.a.forEach((v, j) => { $(p + "-a" + j).value = v; }); $(p + "-r" + x.r).checked = true; }
        else if (type === "tid") { $(p + "-y").value = x.y; $(p + "-n").value = x.n; $(p + "-b").value = x.b; }
        else { $(p + "-o").value = x.o; $(p + "-d").value = x.d; }
      });
      $("lg-ny").disabled = d.q.length >= MAKS;
      $("lg-antall").textContent = d.q.length + " av maks " + MAKS;
      if (fokus) { const el = document.querySelector(fokus); if (el) el.focus(); }
    }
    $("lg-liste").addEventListener("input", e => {
      const el = e.target, i = +el.dataset.i; if (isNaN(i) || !d.q[i]) return;
      if (el.dataset.f) d.q[i][el.dataset.f] = el.value;
      else if (el.dataset.a != null) d.q[i].a[+el.dataset.a] = el.value;
      planlegg();
    });
    $("lg-liste").addEventListener("change", e => { const el = e.target; if (el.dataset.r != null) { d.q[+el.dataset.i].r = +el.dataset.r; planlegg(); } });
    $("lg-liste").addEventListener("click", e => {
      const b = e.target.closest("button"); if (!b) return;
      if (b.dataset.flytt) { const i = +b.dataset.i, j = i + +b.dataset.flytt; [d.q[i], d.q[j]] = [d.q[j], d.q[i]]; tegn('[data-i="' + j + '"][data-flytt="' + b.dataset.flytt + '"]:not([disabled])'); if (!document.activeElement || document.activeElement === document.body) { const f = document.querySelector('[data-slett="' + j + '"]'); if (f) f.focus(); } planlegg(); }
      else if (b.dataset.slett) { const i = +b.dataset.slett; d.q.splice(i, 1); tegn(); const f = document.querySelector('[data-i="' + Math.max(0, i - 1) + '"][data-f], [data-i="' + Math.max(0, i - 1) + '"][data-a]'); if (f) f.focus(); planlegg(); }
    });
    $("lg-ny").addEventListener("click", () => { if (d.q.length >= MAKS) return; d.q.push(T.ny()); tegn('#lg-' + (d.q.length - 1) + (type === "quiz" ? "-s" : type === "tid" ? "-y" : "-o")); planlegg(); });
    $("lg-ti").addEventListener("input", () => { d.ti = $("lg-ti").value; planlegg(); });
    document.querySelectorAll('input[name="lg-l"]').forEach(r => r.addEventListener("change", () => { d.l = r.value; planlegg(); }));

    function mangler() {
      const brukt = d.q.filter(x => type === "quiz" ? x.s.trim() || x.a.some(a => a.trim()) : type === "tid" ? x.y !== "" || x.n.trim() : x.o.trim() || x.d.trim());
      if (!brukt.length) return "TOM";
      for (let k = 0; k < d.q.length; k++) {
        const x = d.q[k]; if (!brukt.includes(x)) continue;
        const nr = T.enhet + " " + (k + 1) + ": ";
        if (type === "quiz") { if (!x.s.trim()) return nr + "Skriv spørsmålet."; if (x.a.filter(a => a.trim()).length < 2) return nr + "Skriv minst to svaralternativer."; if (!x.a[x.r].trim()) return nr + "Det riktige alternativet er tomt. Velg et annet, eller skriv det."; }
        else if (type === "tid") { if (x.y === "" || isNaN(parseInt(x.y, 10))) return nr + "Skriv et årstall."; if (!x.n.trim()) return nr + "Skriv hva som skjedde."; }
        else { if (!x.o.trim() || !x.d.trim()) return nr + "Skriv både ord og forklaring."; }
      }
      return "";
    }
    function ferdigData() {
      const ut = rens(d);
      ut.q = ut.q.filter(x => type === "quiz" ? x.s.trim() : type === "tid" ? x.n.trim() : x.o.trim());
      if (type === "quiz") ut.q = ut.q.map(x => { const tom = x.a.map((a, j) => a.trim() ? -1 : j).filter(j => j >= 0); const a = x.a.filter(v => v.trim()); const r = x.r - tom.filter(j => j < x.r).length; return { s: x.s, a, r, f: x.f }; });
      return ut;
    }
    let tid = null, sisteKode = "";
    function planlegg() { clearTimeout(tid); tid = setTimeout(oppdater, 300); }
    async function oppdater() {
      const kode = await kod(d);
      try { history.replaceState(null, "", "?lag=" + type + "#" + kode); } catch (e) { /* file:// i noen nettlesere */ }
      const feil = mangler();
      $("lg-feil").textContent = feil === "TOM" ? "" : feil;
      $("lg-lenke").placeholder = feil === "TOM" ? "Lenken kommer når du har skrevet noe." : "";
      sisteKode = feil ? "" : await kod(ferdigData());
      $("lg-lenke").value = sisteKode ? lenke(sisteKode, "?vis") : "";
      $("lg-kopier").disabled = !sisteKode;
      $("lg-prov").setAttribute("aria-disabled", String(!sisteKode));
      $("lg-prov").href = sisteKode ? lenke(sisteKode, "?vis") : "#";
      $("lg-lang").textContent = sisteKode && sisteKode.length > 6000 ? "Lenken er lang. Den virker, men noen chatter kan kutte den – del den heller i læringsplattformen eller et dokument." : "";
    }
    $("lg-prov").addEventListener("click", e => { if (!sisteKode) { e.preventDefault(); $("lg-feil").scrollIntoView({ block: "center" }); } });
    $("lg-kopier").addEventListener("click", async () => {
      if (!sisteKode) return;
      const v = $("lg-lenke").value;
      try { await navigator.clipboard.writeText(v); $("lg-status").textContent = "✔ Lenken er kopiert. Lim den inn der du vil dele den."; }
      catch (e) { $("lg-lenke").select(); $("lg-status").textContent = "Lenken er merket. Trykk Ctrl+C (eller ⌘+C) for å kopiere."; }
    });
    tegn();
    oppdater();
  }

  // ---------- Vis / spill ----------
  async function vis(hash) {
    const d = await dekod(hash);
    if (!d || !d.q.length) { $("innhold").innerHTML = hode() + '<header class="sidehode"><h1>Fant ikke innholdet</h1><p class="ingress">Lenken ser ut til å være ufullstendig. Kanskje ble den kuttet da den ble kopiert? Be den som laget den, om å sende lenken på nytt.</p></header><p><a class="knapp" href="lag.html">Lag noe selv →</a></p>'; return; }
    const T = TYPER[d.t], lang = d.l === "en" ? ' lang="en"' : "";
    const tittel = d.ti.trim() || T.navn;
    document.title = tittel + " – Lag selv";
    $("innhold").innerHTML = hode(T.navn) +
      '<header class="sidehode"><p class="overlinje">' + T.ikon + " " + T.navn + (d.e ? " · eksempel fra Les verden" : " laget av en elev") + "</p><h1" + lang + ">" + esc(tittel) + '</h1><p class="ly-meta">' + d.q.length + " " + (d.t === "quiz" ? "spørsmål" : d.t === "tid" ? "hendelser" : "kort") + ' · <a href="#" id="lg-kopi">✏️ Lag din egen kopi og endre den</a></p></header>' +
      (d.e ? '<p class="lg-elevmerk">Dette er et eksempel. <a href="lag.html?lag=' + d.t + '">Lag din egen ' + T.navn.toLowerCase() + " →</a></p>" : '<p class="lg-elevmerk">Innholdet er laget av en elev og er ikke sjekket av nettstedet. Ser du en feil? Si fra til den som laget det.</p>') + '<div id="lg-vis"' + lang + "></div>";
    $("lg-kopi").addEventListener("click", e => { e.preventDefault(); location.href = lenke(hash, "?lag=" + d.t); });
    if (d.t === "quiz") quiz(d); else if (d.t === "tid") tidslinje(d); else kort(d);
  }

  function quiz(d) {
    const en = d.l === "en", rekke = bland(d.q);
    let nr = 0, poeng = 0;
    function steg() {
      if (nr >= rekke.length) {
        $("lg-vis").innerHTML = '<div class="lg-slutt"><p class="lg-slutt-tall">' + poeng + " / " + rekke.length + "</p><p>" + (en ? "Well done! Give feedback to the person who made the quiz: Which question was best? Was anything unclear?" : "Godt jobbet! Gi tilbakemelding til den som laget quizen: Hvilket spørsmål var best? Var noe uklart?") + '</p><button type="button" class="knapp" id="lg-igjen">↻ ' + (en ? "Play again" : "Spill igjen") + "</button></div>";
        $("lg-igjen").addEventListener("click", () => { nr = 0; poeng = 0; steg(); }); $("lg-igjen").focus(); return;
      }
      const x = rekke[nr], valg = bland(x.a.map((a, j) => j));
      $("lg-vis").innerHTML = '<div class="lg-quiz"><p class="lg-teller">' + (en ? "Question " : "Spørsmål ") + (nr + 1) + " / " + rekke.length + " · " + (en ? "Score" : "Poeng") + ": " + poeng + '</p><h2 class="lg-sporsmal" tabindex="-1" id="lg-q">' + esc(x.s) + '</h2><div class="lg-valg">' + valg.map(j => '<button type="button" class="lg-valgknapp" data-j="' + j + '">' + esc(x.a[j]) + "</button>").join("") + '</div><div class="lg-tilbake" id="lg-tb" role="status" aria-live="polite"></div></div>';
      $("lg-q").focus();
      document.querySelectorAll(".lg-valgknapp").forEach(b => b.addEventListener("click", () => {
        const ok = +b.dataset.j === x.r; if (ok) poeng++;
        document.querySelectorAll(".lg-valgknapp").forEach(k => { k.disabled = true; if (+k.dataset.j === x.r) k.classList.add("ok"); else if (k === b) k.classList.add("feil"); });
        $("lg-tb").innerHTML = "<p><strong>" + (ok ? (en ? "✔ Correct!" : "✔ Riktig!") : (en ? "✘ Not quite. The answer is: " : "✘ Ikke helt. Svaret er: ") + (ok ? "" : esc(x.a[x.r]))) + "</strong>" + (x.f ? " " + esc(x.f) : "") + '</p><button type="button" class="knapp hoved" id="lg-neste">' + (nr + 1 < rekke.length ? (en ? "Next →" : "Neste →") : (en ? "See score" : "Se resultatet")) + "</button>";
        $("lg-neste").addEventListener("click", () => { nr++; steg(); }); $("lg-neste").focus();
      }));
    }
    steg();
  }

  function tidslinje(d) {
    const en = d.l === "en", sortert = d.q.slice().sort((a, b) => parseInt(a.y, 10) - parseInt(b.y, 10));
    const ar = y => { const n = parseInt(y, 10); return isNaN(n) ? "" : n < 0 ? -n + (en ? " BC" : " f.Kr.") : String(n); };
    $("lg-vis").innerHTML = '<div class="lg-faner" role="group" aria-label="' + (en ? "View" : "Visning") + '"><button type="button" class="knapp liten" data-fane="se" aria-pressed="true">📅 ' + (en ? "Timeline" : "Se tidslinja") + '</button><button type="button" class="knapp liten" data-fane="sorter" aria-pressed="false">🔀 ' + (en ? "Put the events in order" : "Sorter hendelsene") + '</button></div><div id="lg-fane"></div>';
    function se() { $("lg-fane").innerHTML = '<ol class="lg-tidslinje">' + sortert.map(x => '<li><span class="lg-ar">' + esc(ar(x.y)) + '</span><div><h2 class="lg-hendelse">' + esc(x.n) + "</h2>" + (x.b ? "<p>" + esc(x.b) + "</p>" : "") + "</div></li>").join("") + "</ol>"; }
    function sorter() {
      let rekke = bland(sortert); if (rekke.length > 1 && rekke.every((x, i) => x === sortert[i])) rekke.reverse();
      const tegn = fokus => {
        $("lg-fane").innerHTML = '<p class="mu-intro">' + (en ? "Use the arrows to put the events in order – the earliest first. Then check." : "Bruk pilene til å sette hendelsene i riktig rekkefølge – det tidligste først. Sjekk når du er ferdig.") + '</p><ol class="lg-sorter">' + rekke.map((x, i) => '<li><span class="lg-sorter-tekst">' + esc(x.n) + '</span><span class="lg-sorter-ar" hidden></span><span class="lg-flytt"><button type="button" class="knapp liten" data-i="' + i + '" data-v="-1"' + (i === 0 ? " disabled" : "") + ' aria-label="' + (en ? "Move up: " : "Flytt opp: ") + esc(x.n) + '">↑</button><button type="button" class="knapp liten" data-i="' + i + '" data-v="1"' + (i === rekke.length - 1 ? " disabled" : "") + ' aria-label="' + (en ? "Move down: " : "Flytt ned: ") + esc(x.n) + '">↓</button></span></li>').join("") + '</ol><p><button type="button" class="knapp hoved" id="lg-sjekk">' + (en ? "Check" : "Sjekk") + '</button> <span id="lg-sres" role="status" aria-live="polite"></span></p>';
        if (fokus) { const f = document.querySelector(fokus); if (f) f.focus(); }
        document.querySelectorAll(".lg-sorter button").forEach(b => b.addEventListener("click", () => { const i = +b.dataset.i, j = i + +b.dataset.v; [rekke[i], rekke[j]] = [rekke[j], rekke[i]]; tegn('.lg-sorter button[data-i="' + j + '"][data-v="' + b.dataset.v + '"]:not([disabled])') ; if (document.activeElement === document.body) { const f = document.querySelector('.lg-sorter button[data-i="' + j + '"]:not([disabled])'); if (f) f.focus(); } }));
        $("lg-sjekk").addEventListener("click", () => {
          let rett = 0;
          document.querySelectorAll(".lg-sorter li").forEach((li, i) => { const ok = parseInt(rekke[i].y, 10) === parseInt(sortert[i].y, 10); if (ok) rett++; li.classList.toggle("ok", ok); li.classList.toggle("feil", !ok); const s = li.querySelector(".lg-sorter-ar"); s.hidden = false; s.textContent = ar(rekke[i].y) + (ok ? " ✔" : " ✘"); });
          $("lg-sres").textContent = rett + (en ? " of " : " av ") + rekke.length + (en ? " in the right place." : " på riktig plass.") + (rett === rekke.length ? " 🎉" : "");
        });
      };
      tegn();
    }
    document.querySelectorAll("[data-fane]").forEach(b => b.addEventListener("click", () => { document.querySelectorAll("[data-fane]").forEach(x => x.setAttribute("aria-pressed", String(x === b))); if (b.dataset.fane === "se") se(); else sorter(); }));
    se();
  }

  function kort(d) {
    const en = d.l === "en";
    let bunke = bland(d.q), kan = 0, snudd = false;
    function steg() {
      if (!bunke.length) {
        $("lg-vis").innerHTML = '<div class="lg-slutt"><p class="lg-slutt-tall">🎉</p><p>' + (en ? "You know all " + d.q.length + " cards!" : "Du kan alle " + d.q.length + " kortene!") + '</p><button type="button" class="knapp" id="lg-igjen">↻ ' + (en ? "Practise again" : "Øv igjen") + "</button></div>";
        $("lg-igjen").addEventListener("click", () => { bunke = bland(d.q); kan = 0; steg(); }); $("lg-igjen").focus(); return;
      }
      const x = bunke[0]; snudd = false;
      $("lg-vis").innerHTML = '<p class="lg-teller">' + (en ? "Cards left: " : "Kort igjen: ") + bunke.length + " · " + (en ? "Known: " : "Kan: ") + kan + "</p>" +
        '<button type="button" class="lg-kort" id="lg-kort" aria-describedby="lg-kort-hint"><span class="lg-kort-for">' + esc(x.o) + '</span><span class="lg-kort-bak" hidden>' + esc(x.d) + "</span></button>" +
        '<p class="lg-hint" id="lg-kort-hint">' + (en ? "Say the explanation out loud, then tap the card to turn it." : "Si forklaringen høyt, og trykk på kortet for å snu det.") + '</p><p class="lg-kort-knapper" id="lg-kk" hidden><button type="button" class="knapp" id="lg-ov">🔁 ' + (en ? "Practise more" : "Øv mer") + '</button><button type="button" class="knapp hoved" id="lg-kan">✔ ' + (en ? "I knew it" : "Jeg kunne det") + "</button></p>";
      $("lg-kort").addEventListener("click", () => { snudd = !snudd; $("lg-kort").classList.toggle("snudd", snudd); $("lg-kort").querySelector(".lg-kort-for").hidden = snudd; $("lg-kort").querySelector(".lg-kort-bak").hidden = !snudd; if (snudd) $("lg-kk").hidden = false; });
      $("lg-kan").addEventListener("click", () => { bunke.shift(); kan++; steg(); $("lg-kort") && $("lg-kort").focus(); });
      $("lg-ov").addEventListener("click", () => { bunke.push(bunke.shift()); steg(); $("lg-kort").focus(); });
    }
    steg();
  }

  document.addEventListener("DOMContentLoaded", () => {
    const hash = location.hash.slice(1), type = LV.param("lag");
    if (TYPER[type]) rediger(type, hash);
    else if (new URLSearchParams(location.search).has("vis") && hash) vis(hash);
    else oversikt();
  });
  window.addEventListener("hashchange", () => { if (new URLSearchParams(location.search).has("vis")) vis(location.hash.slice(1)); });
})();
