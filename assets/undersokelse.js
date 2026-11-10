/* =========================================================
   Les verden – Undersøkelsesverkstedet (undersokelse.html)
   Samfunnsfaglig utforsking steg for steg: problemstilling,
   hypotese, metode og utvalg, spørreskjema, opptelling med
   diagram, gyldighet og utkast til presentasjon.
   Tilstanden ligger i lenken (#…), komprimert. Ingenting lagres
   på nettstedet. Bruker LV.diagram (assets/diagram.js).
   ========================================================= */
(function () {
  const LV = window.LV;
  const $ = id => document.getElementById(id);
  const esc = s => LV.esc(String(s == null ? "" : s));
  const MAKS_SP = 6, MAKS_ALT = 6;

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
    try { const bytes = fraB64(h.slice(1)); const raa = h[0] === "1" ? await strom(bytes, DecompressionStream) : bytes; return rens(JSON.parse(new TextDecoder().decode(raa))); } catch (e) { return null; }
  }
  const tekst = (v, n) => typeof v === "string" ? v.slice(0, n) : "";
  function rens(d) {
    if (!d || typeof d !== "object") return null;
    const ut = { tema: tekst(d.tema, 120), ps: tekst(d.ps, 600), hyp: tekst(d.hyp, 600), met: ["sporre", "intervju", "observasjon", "statistikk"].includes(d.met) ? d.met : "sporre", utv: tekst(d.utv, 400), gyl: tekst(d.gyl, 1500), res: tekst(d.res, 1500), konk: tekst(d.konk, 1200), sp: [] };
    (Array.isArray(d.sp) ? d.sp : []).slice(0, MAKS_SP).forEach(s => {
      if (!s || typeof s !== "object") return;
      const alt = (Array.isArray(s.alt) ? s.alt : []).slice(0, MAKS_ALT).map(a => tekst(a, 60));
      const n = alt.map((_, i) => Math.max(0, Math.min(9999, Math.round(+((s.n || [])[i]) || 0))));
      ut.sp.push({ q: tekst(s.q, 200), alt, n });
    });
    return ut;
  }
  const NY = () => ({ tema: "", ps: "", hyp: "", met: "sporre", utv: "", gyl: "", res: "", konk: "", sp: [{ q: "Hvor mange timer bruker du på mobilen etter skoletid en vanlig skoledag?", alt: ["Under 1 time", "1–2 timer", "2–4 timer", "Over 4 timer"], n: [0, 0, 0, 0] }] });
  let S = NY();

  const METODER = {
    sporre: ["📋 Spørreundersøkelse", "Mange svarer på de samme spørsmålene med faste svaralternativer. Gir tall du kan telle opp og lage diagram av. Men du får vite lite om hvorfor folk svarer som de gjør."],
    intervju: ["🎙️ Intervju", "Du snakker med noen få personer og stiller åpne spørsmål. Gir dybde og begrunnelser. Men svarene gjelder bare dem du snakket med."],
    observasjon: ["👀 Observasjon", "Du ser og teller hva folk faktisk gjør – for eksempel hvor mange som sykler til skolen. Viser handlinger, ikke meninger. Folk kan oppføre seg annerledes når de vet at de blir observert."],
    statistikk: ["📊 Statistikk fra andre", "Du bruker tall som andre har samlet inn, for eksempel fra SSB. Gir store, pålitelige tall. Men tallene svarer ikke alltid nøyaktig på ditt spørsmål."]
  };
  const VASK = [
    { q: "«Er du enig i at det er alt for mye lekser på denne skolen?»", valg: ["Spørsmålet er ledende", "Spørsmålet er for kort", "Ingenting er galt"], r: 0, f: "«Er du enig i at …» og «alt for mye» dytter folk mot et bestemt svar. Bedre: «Hvordan synes du mengden lekser er? For lite – passe – for mye»." },
    { q: "«Liker du å trene og spise sunt?»", valg: ["Det er to spørsmål i ett", "Spørsmålet er ledende", "Spørsmålet er for personlig"], r: 0, f: "Noen liker å trene, men ikke å spise sunt. Del det i to spørsmål." },
    { q: "«Hvor ofte bruker du sosiale medier?» Svar: Ofte – Sjelden", valg: ["Svaralternativene er uklare", "Spørsmålet er ledende", "Ingenting er galt"], r: 0, f: "«Ofte» betyr ulike ting for ulike folk. Bruk tydelige alternativer, for eksempel «Hver dag – noen ganger i uka – sjeldnere»." },
    { q: "«Hvor mange timer sover du?» Svar: 6 – 7 – 8", valg: ["Noen svaralternativer mangler", "Spørsmålet er to i ett", "Ingenting er galt"], r: 0, f: "Hva svarer den som sover 5 eller 10 timer? Svaralternativene må dekke alle – for eksempel «Under 6 – 6–7 – 7–8 – 8–9 – over 9»." }
  ];

  function lagre() {
    clearTimeout(lagre.t);
    lagre.t = setTimeout(async () => { const h = await kod(S); history.replaceState(null, "", "#" + h); const l = $("uv-lenke"); if (l) l.value = location.href; }, 300);
  }

  function spHtml() {
    return S.sp.map((s, i) => '<fieldset class="uv-sp"><legend>Spørsmål ' + (i + 1) + '</legend><label class="lg-felt" for="uv-q' + i + '"><span>Spørsmålet</span><input type="text" id="uv-q' + i + '" data-i="' + i + '" class="uv-q" maxlength="200" value="' + esc(s.q) + '"></label>' +
      '<div class="uv-alt">' + s.alt.map((a, j) => '<label class="lg-felt" for="uv-a' + i + "-" + j + '"><span>Svaralternativ ' + (j + 1) + '</span><input type="text" id="uv-a' + i + "-" + j + '" class="uv-a" data-i="' + i + '" data-j="' + j + '" maxlength="60" value="' + esc(a) + '"></label>').join("") + "</div>" +
      '<p class="uv-knapper">' + (s.alt.length < MAKS_ALT ? '<button type="button" class="knapp liten uv-plussalt" data-i="' + i + '">+ Svaralternativ</button> ' : "") + (s.alt.length > 2 ? '<button type="button" class="knapp liten uv-minusalt" data-i="' + i + '">− Fjern siste alternativ</button> ' : "") + (S.sp.length > 1 ? '<button type="button" class="knapp liten uv-fjernsp" data-i="' + i + '">🗑 Fjern spørsmålet</button>' : "") + "</p></fieldset>").join("") +
      (S.sp.length < MAKS_SP ? '<p><button type="button" class="knapp" id="uv-nysp">+ Nytt spørsmål</button></p>' : "");
  }
  function tellHtml() {
    return S.sp.map((s, i) => {
      const sum = s.n.reduce((a, b) => a + b, 0);
      return '<div class="uv-tell"><h3>' + (i + 1) + ". " + esc(s.q || "(uten tekst)") + '</h3><ul class="uv-tell-liste">' + s.alt.map((a, j) => '<li><span class="uv-alt-navn">' + esc(a || "(tomt)") + '</span><button type="button" class="knapp liten uv-pluss" data-i="' + i + '" data-j="' + j + '" aria-label="+1 svar: ' + esc(a) + '">+1</button><label class="skjult-visuelt" for="uv-n' + i + "-" + j + '">Antall svar: ' + esc(a) + '</label><input type="number" min="0" max="9999" inputmode="numeric" class="uv-n" id="uv-n' + i + "-" + j + '" data-i="' + i + '" data-j="' + j + '" value="' + s.n[j] + '"><span class="uv-pst">' + (sum ? Math.round(s.n[j] / sum * 100) + " %" : "") + "</span></li>").join("") + '</ul><p class="uv-sum">Svar totalt: <strong>' + sum + "</strong></p>" +
        (sum ? LV.diagram({ id: "uv-d" + i, type: "soyle", tittel: s.q, x: s.alt.map(a => a || "–"), serier: [{ navn: "Antall svar", verdier: s.n }], enhet: "Antall svar", yMin: 0, verdiPaSoyle: true, hoyde: 280 }) : '<p class="uv-tom">Diagrammet vises når du har talt opp svar.</p>') + "</div>";
    }).join("");
  }
  function tegnSp() { $("uv-spm").innerHTML = spHtml(); }
  function tegnTell() { $("uv-telling").innerHTML = tellHtml(); }

  function utkast() {
    const m = METODER[S.met][0].replace(/^\S+\s/, "").toLowerCase();
    const res = S.sp.filter(s => s.n.some(Boolean)).map(s => { const sum = s.n.reduce((a, b) => a + b, 0), maks = s.n.indexOf(Math.max(...s.n)); return "På spørsmålet «" + s.q + "» svarte flest «" + s.alt[maks] + "» (" + s.n[maks] + " av " + sum + ", " + Math.round(s.n[maks] / sum * 100) + " prosent)."; });
    return ["1. Innledning", "Tema: " + (S.tema || "…"), "Problemstilling: " + (S.ps || "…"), "Hypotese: " + (S.hyp || "…"), "",
      "2. Metode", "Vi brukte " + m + ". " + (S.utv || "(Hvem spurte dere, og hvor mange?)"), "",
      "3. Resultater", ...(res.length ? res : ["(Tell opp svarene i steg 5.)"]), "(Sett inn diagrammene.)", "",
      "4. Drøfting", S.res || "(Hva viser resultatene? Stemte hypotesen?)", S.gyl ? "Gyldighet: " + S.gyl : "(Hvor gyldige og pålitelige er funnene?)", "",
      "5. Konklusjon", S.konk || "(Svar kort på problemstillingen.)"].join("\n");
  }

  function side() {
    document.title = "Undersøkelsesverkstedet – " + (LV.config ? LV.config.navn : "Les verden");
    $("innhold").innerHTML = '<nav class="brodsmuler" aria-label="Brødsmuler"><a href="index.html">Forside</a> › Undersøkelsesverkstedet</nav>' +
      '<header class="sidehode"><p class="overlinje">Samfunnsfaglig utforsking</p><h1>🔬 Undersøkelsesverkstedet</h1><p class="ingress">Lag din egen samfunnsfaglige undersøkelse – fra problemstilling til presentasjon. Verkstedet hjelper deg med å stille gode spørsmål, telle opp svarene, lage diagram og vurdere hvor mye du kan stole på funnene.</p></header>' +
      '<div class="lp-viktig"><p><strong>Personvern:</strong> Ikke skriv navn på dem som svarer. Undersøkelsen lagres ikke på nettstedet – den ligger i lenken. Kopier lenken (nederst) eller last ned svarene for å fortsette senere.</p></div>' +
      '<ol class="uv-steg">' +
      '<li id="uv-1"><h2>Tema og problemstilling</h2><label class="lg-felt" for="uv-tema"><span>Tema</span><input type="text" id="uv-tema" maxlength="120" value="' + esc(S.tema) + '" placeholder="For eksempel: Mobilbruk blant ungdom"></label>' +
        '<div class="ka-metode"><h3>En god problemstilling …</h3><ul><li>er et <strong>spørsmål</strong> som kan undersøkes</li><li>er <strong>avgrenset</strong>: hvem, hvor og når</li><li>kan ikke besvares med bare ja eller nei</li></ul><p><strong>Svak:</strong> «Er mobil dårlig?»<br><strong>Bedre:</strong> «Hvor mye tid bruker elevene på 9. trinn ved skolen vår på mobilen etter skoletid, og hva bruker de tiden til?»</p></div>' +
        '<label class="mu-notat" for="uv-ps"><span>Problemstillingen din</span><textarea id="uv-ps" rows="2" maxlength="600">' + esc(S.ps) + "</textarea></label></li>" +
      '<li id="uv-2"><h2>Hypotese</h2><p class="mu-intro">En hypotese er det du <strong>tror</strong> du vil finne ut, og hvorfor. Den kan vise seg å være feil – det er også et funn!</p><label class="mu-notat" for="uv-hyp"><span>Jeg tror at … fordi …</span><textarea id="uv-hyp" rows="2" maxlength="600">' + esc(S.hyp) + "</textarea></label></li>" +
      '<li id="uv-3"><h2>Metode og utvalg</h2><fieldset class="uv-metoder"><legend>Hvilken metode passer best?</legend>' + Object.entries(METODER).map(([k, [n, t]]) => '<label><input type="radio" name="uv-met" id="uv-met-' + k + '" value="' + k + '"' + (S.met === k ? " checked" : "") + "> <span><strong>" + n + "</strong><br>" + esc(t) + "</span></label>").join("") + "</fieldset>" +
        '<label class="mu-notat" for="uv-utv"><span>Utvalg: Hvem spør eller observerer du, og hvor mange? Hvorfor dem?</span><textarea id="uv-utv" rows="2" maxlength="400">' + esc(S.utv) + "</textarea></label></li>" +
      '<li id="uv-4"><h2>Spørsmålene</h2><h3>Spørsmålsvaskeriet</h3><p class="mu-intro">Før du lager dine egne spørsmål: Hva er galt med disse?</p><ol class="gf-runde">' + VASK.map((v, i) => '<li><fieldset><legend>' + esc(v.q) + "</legend>" + v.valg.map((t, j) => '<label><input type="radio" name="uv-v' + i + '" id="uv-v' + i + "-" + j + '" value="' + j + '"> ' + esc(t) + "</label>").join("") + '</fieldset><p class="gf-svar" id="uv-v' + i + '-s" aria-live="polite"></p></li>').join("") + "</ol>" +
        '<h3>Dine spørsmål</h3><p class="mu-intro">Lag opptil seks spørsmål med faste svaralternativer. Skriv dem gjerne ut eller lag et skjema i et verktøy skolen bruker – her teller du bare opp svarene.</p><div id="uv-spm"></div></li>' +
      '<li id="uv-5"><h2>Tell opp svarene</h2><p class="mu-intro">Trykk «+1» for hvert svar, eller skriv inn antallet. Diagrammet lages automatisk.</p><div id="uv-telling"></div></li>' +
      '<li id="uv-6"><h2>Hva fant du – og kan du stole på det?</h2><label class="mu-notat" for="uv-res"><span>Hva viser resultatene? Stemte hypotesen din?</span><textarea id="uv-res" rows="3" maxlength="1500">' + esc(S.res) + "</textarea></label>" +
        '<div class="ka-metode"><h3>Vurder gyldigheten</h3><ul><li><strong>Utvalget:</strong> Hvor mange svarte? Ligner de som svarte, på dem du vil si noe om?</li><li><strong>Spørsmålene:</strong> Kan noen av dem ha vært ledende eller uklare?</li><li><strong>Ærlighet:</strong> Er det noe folk kan ha pyntet på når de svarte?</li><li><strong>Pålitelighet:</strong> Ville du fått omtrent de samme svarene en annen dag?</li></ul></div>' +
        '<label class="mu-notat" for="uv-gyl"><span>Hvor gyldige og relevante er funnene dine? Hva kunne du gjort annerledes?</span><textarea id="uv-gyl" rows="4" maxlength="1500">' + esc(S.gyl) + "</textarea></label>" +
        '<label class="mu-notat" for="uv-konk"><span>Konklusjon: Svar kort på problemstillingen</span><textarea id="uv-konk" rows="3" maxlength="1200">' + esc(S.konk) + "</textarea></label></li>" +
      '<li id="uv-7"><h2>Presenter funnene</h2><p class="mu-intro">Trykk på knappen for å få et utkast med alt du har skrevet. Kopier det inn i en presentasjon eller et dokument, og bygg videre.</p><p><button type="button" class="knapp hoved" id="uv-lagutkast">📝 Lag utkast</button></p><label class="mu-notat" for="uv-utkast"><span>Utkast til rapport eller presentasjon</span><textarea id="uv-utkast" rows="14"></textarea></label></li>' +
      '</ol><section class="le-del"><h2>Lagre og dele</h2><label class="lg-felt" for="uv-lenke"><span>Lenken til undersøkelsen din</span><input type="text" id="uv-lenke" readonly></label><p class="ak-knapper"><button type="button" class="knapp" id="uv-kopier">📋 Kopier lenken</button> <button type="button" class="knapp" id="uv-ny">↺ Start en ny undersøkelse</button> <span class="lg-status" id="uv-status" role="status" aria-live="polite"></span></p></section>' +
      '<p class="fo-merk">Til læreren: Verkstedet dekker kompetansemålet om å «bruke samfunnsfaglige metoder og digitale ressurser i egne undersøkelser, presentere funn ved hjelp av digitale verktøy og drøfte hvor gyldige og relevante funnene er». Elevene kan samle inn svar på papir eller i et skjemaverktøy skolen har godkjent, og bruke siden til opptelling og diagram. Minn elevene på at undersøkelser om helse, familie og andre personlige forhold krever ekstra varsomhet. Se også <a href="grafleser.html">Grafleseren</a>.</p>';
    tegnSp(); tegnTell(); $("uv-lenke").value = location.href;

    const felt = { "uv-tema": "tema", "uv-ps": "ps", "uv-hyp": "hyp", "uv-utv": "utv", "uv-res": "res", "uv-gyl": "gyl", "uv-konk": "konk" };
    Object.entries(felt).forEach(([id, k]) => $(id).addEventListener("input", e => { S[k] = e.target.value; lagre(); }));
    document.querySelectorAll('input[name="uv-met"]').forEach(r => r.addEventListener("change", () => { S.met = r.value; lagre(); }));
    VASK.forEach((v, i) => document.querySelectorAll('input[name="uv-v' + i + '"]').forEach(inp => inp.addEventListener("change", () => {
      const ok = +inp.value === v.r, el = $("uv-v" + i + "-s"); el.className = "gf-svar " + (ok ? "ok" : "feil"); el.textContent = (ok ? "✔ Riktig. " : "✘ Ikke helt. ") + v.f;
    })));
    $("uv-spm").addEventListener("input", e => {
      const t = e.target, i = +t.dataset.i;
      if (t.classList.contains("uv-q")) S.sp[i].q = t.value;
      if (t.classList.contains("uv-a")) S.sp[i].alt[+t.dataset.j] = t.value;
      lagre(); clearTimeout(tegnTell.t); tegnTell.t = setTimeout(tegnTell, 400);
    });
    $("uv-spm").addEventListener("click", e => {
      const b = e.target.closest("button"); if (!b) return; const i = +b.dataset.i;
      if (b.id === "uv-nysp") S.sp.push({ q: "", alt: ["", ""], n: [0, 0] });
      else if (b.classList.contains("uv-plussalt")) { S.sp[i].alt.push(""); S.sp[i].n.push(0); }
      else if (b.classList.contains("uv-minusalt")) { S.sp[i].alt.pop(); S.sp[i].n.pop(); }
      else if (b.classList.contains("uv-fjernsp")) S.sp.splice(i, 1);
      else return;
      tegnSp(); tegnTell(); lagre();
      const fokus = b.id === "uv-nysp" ? $("uv-q" + (S.sp.length - 1)) : $("uv-q" + Math.min(i, S.sp.length - 1)); if (fokus) fokus.focus();
    });
    $("uv-telling").addEventListener("click", e => {
      const b = e.target.closest(".uv-pluss"); if (!b) return; const i = +b.dataset.i, j = +b.dataset.j;
      S.sp[i].n[j] = Math.min(9999, S.sp[i].n[j] + 1); tegnTell(); lagre();
      const ny = document.querySelector('.uv-pluss[data-i="' + i + '"][data-j="' + j + '"]'); if (ny) ny.focus();
      $("uv-status").textContent = "";
    });
    $("uv-telling").addEventListener("change", e => {
      const t = e.target; if (!t.classList.contains("uv-n")) return;
      S.sp[+t.dataset.i].n[+t.dataset.j] = Math.max(0, Math.min(9999, Math.round(+t.value) || 0)); tegnTell(); lagre();
    });
    $("uv-lagutkast").addEventListener("click", () => { $("uv-utkast").value = utkast(); $("uv-utkast").focus(); });
    $("uv-kopier").addEventListener("click", async () => { try { await navigator.clipboard.writeText($("uv-lenke").value); $("uv-status").textContent = "✔ Lenken er kopiert."; } catch (e) { $("uv-lenke").select(); $("uv-status").textContent = "Lenken er merket – trykk Ctrl+C."; } });
    $("uv-ny").addEventListener("click", () => { S = NY(); history.replaceState(null, "", location.pathname); side(); $("uv-tema").focus(); });
  }

  document.addEventListener("DOMContentLoaded", async () => {
    const d = await dekod(location.hash.slice(1));
    if (d) S = d;
    side();
    const l = document.createElement("div"); l.className = "svarlinje"; l.innerHTML = '<div class="svarlinje-indre"><label class="skjult-visuelt" for="elevnavn">Navn</label><input id="elevnavn" type="text" placeholder="Navn" autocomplete="off"><span class="status" role="status" aria-live="polite"></span></div>'; document.body.appendChild(l);
  });
})();
