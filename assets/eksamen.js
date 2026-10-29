/* =========================================================
   Les verden – eksamenssone
   Innholdet ligger i data/eksamen.js. Øvingsspørsmålene hentes
   automatisk fra oppgavene i temaene. Ingenting lagres.
   ========================================================= */

(function () {
  const LV = window.LV;
  const E = LV.eksamen;
  let fag = "engelsk";
  let sporsmalsbank = null; // { engelsk: [...], samfunnsfag: [...] }
  let sisteSporsmal = null;

  const fmt = t => LV.esc(t).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

  // ---------- Bygg siden ----------
  function bygg() {
    let h = "";

    // Slik foregår det
    h += '<section class="eks-seksjon" id="slik"><h2><span class="nr">1</span>Slik foregår muntlig eksamen</h2>' +
      E.slikForegar.map(p => "<p>" + fmt(p) + "</p>").join("") + "</section>";

    // Forberedelsen
    h += '<section class="eks-seksjon" id="plan"><h2><span class="nr">2</span>Forberedelsen steg for steg</h2><ol class="plankort">' +
      E.plan.map((s, i) => '<li><span class="steg">Steg ' + (i + 1) + "</span><h3>" + LV.esc(s.tittel) + "</h3><ul>" +
        s.punkter.map(p => "<li>" + fmt(p) + "</li>").join("") + "</ul></li>").join("") + "</ol></section>";

    // Problemstilling
    const P = E.problemstilling;
    h += '<section class="eks-seksjon" id="problemstilling"><h2><span class="nr">3</span>Problemstillingen</h2>' +
      "<p>" + fmt(P.forklaring) + "</p>" +
      '<div class="to-kol"><div><h3>En god problemstilling …</h3><ul class="hakeliste">' + P.kjennetegn.map(k => "<li>" + fmt(k) + "</li>").join("") + "</ul></div>" +
      '<div><h3>Gode måter å starte på</h3><ul class="startord" id="startord"></ul></div></div>' +
      '<h3>Fra svak til god</h3><div class="eksempler" id="ps-eksempler"></div>' +
      '<div class="verktoyboks" id="ps-sjekk"><h3><span aria-hidden="true">🔎</span> Sjekk problemstillingen din</h3>' +
      '<label for="ps-felt">Skriv problemstillingen din her. Ingenting lagres.</label>' +
      '<textarea id="ps-felt" rows="2"></textarea><ul class="ps-tilbakemelding" id="ps-tilbakemelding" aria-live="polite"></ul></div>' +
      "</section>";

    // Presentasjonen
    h += '<section class="eks-seksjon" id="presentasjon"><h2><span class="nr">4</span>Presentasjonen</h2>' +
      "<p>En god presentasjon har en tydelig struktur. Fargelinjen viser omtrent hvor mye av tiden hver del bør ta.</p>" +
      '<div class="strukturlinje" aria-hidden="true">' + E.struktur.map((s, i) => '<span class="del-' + i + '" style="flex:' + s.andel + '">' + LV.esc(s.del) + "</span>").join("") + "</div>" +
      '<div class="strukturkort">' + E.struktur.map((s, i) => '<div class="del-' + i + '"><h3>' + LV.esc(s.del) + ' <small>ca. ' + s.andel + " %</small></h3><ul>" +
        s.punkter.map(p => "<li>" + fmt(p) + "</li>").join("") + "</ul></div>").join("") + "</div>" +
      '<div class="verktoyboks" id="tidtaker"><h3><span aria-hidden="true">⏱️</span> Øv med tidtaker</h3>' +
      '<p>Velg hvor lang presentasjonen skal være, og øv høyt. Tidtakeren viser hvilken del du bør være i.</p>' +
      '<div class="tt-rad"><label for="tt-lengde">Lengde:</label><select id="tt-lengde">' +
      [5, 8, 10, 12, 15, 20].map(m => '<option value="' + m + '"' + (m === 10 ? " selected" : "") + ">" + m + " minutter</option>").join("") + "</select>" +
      '<button class="knapp hoved" id="tt-start">▶ Start</button><button class="knapp" id="tt-null">↺ Nullstill</button></div>' +
      '<div class="tt-visning"><span class="tt-tid" id="tt-tid">0:00</span><span class="tt-fase" id="tt-fase" aria-live="polite">Klar</span></div>' +
      '<div class="tt-bar" role="progressbar" aria-label="Tid brukt" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" id="tt-bar"><span id="tt-fyll"></span>' +
      '<i style="left:' + E.struktur[0].andel + '%"></i><i style="left:' + (100 - E.struktur[2].andel) + '%"></i></div>' +
      "</div></section>";

    // Samtalen
    h += '<section class="eks-seksjon" id="samtale"><h2><span class="nr">5</span>Samtalen</h2>' +
      "<p>" + fmt(E.samtale.forklaring) + '</p><ul class="hakeliste">' + E.samtale.tips.map(t => "<li>" + fmt(t) + "</li>").join("") + "</ul>" +
      '<div class="verktoyboks" id="ov-samtale"><h3><span aria-hidden="true">🎲</span> Øv på samtalen</h3>' +
      "<p>Trekk et spørsmål fra temaene og svar høyt – gjerne til en læringspartner. Prøv å snakke i minst ett minutt: påstand, forklaring, eksempel.</p>" +
      '<div class="tt-rad"><label for="ov-tema">Tema:</label><select id="ov-tema"><option value="">Alle temaer</option></select>' +
      '<button class="knapp hoved" id="ov-trekk">Trekk et spørsmål</button></div>' +
      '<div class="ov-kort" id="ov-kort" aria-live="polite"><p class="ov-tom">Henter spørsmål fra temaene …</p></div>' +
      "</div></section>";

    // Fraser
    h += '<section class="eks-seksjon" id="fraser"><h2><span class="nr">6</span>Nyttige fraser</h2>' +
      '<p id="fraser-ingress"></p><div class="fraser" id="fraser-liste"></div></section>';

    // Vanlige feil
    h += '<section class="eks-seksjon" id="feil"><h2><span class="nr">7</span>Vanlige feil – og hva du gjør i stedet</h2><div class="feilliste">' +
      E.feil.map(f => '<div><p class="feil-tekst"><span aria-hidden="true">✗</span> ' + fmt(f.feil) + '</p><p class="gjor-tekst"><span aria-hidden="true">✓</span> ' + fmt(f.gjor) + "</p></div>").join("") +
      "</div></section>";

    // Sjekkliste
    h += '<section class="eks-seksjon" id="sjekkliste"><h2><span class="nr">8</span>Sjekkliste før eksamen</h2>' +
      '<p>Kryss av underveis. Avkryssingen forsvinner når du lukker siden.</p><ul class="sjekkliste">' +
      E.sjekkliste.map((s, i) => '<li><input type="checkbox" id="sj-' + i + '"><label for="sj-' + i + '">' + fmt(s) + "</label></li>").join("") +
      '</ul><p class="sj-status" id="sj-status" aria-live="polite"></p><button class="knapp" id="sj-null">Fjern alle kryss</button></section>';

    // Temaer
    h += '<section class="eks-seksjon" id="temaer"><h2><span class="nr">9</span>Repeter temaene</h2>' +
      '<p id="temaer-ingress"></p><ul class="temaliste" id="eks-temaliste"></ul></section>';

    document.getElementById("eksamen-innhold").innerHTML = h;
  }

  // ---------- Deler som avhenger av valgt fag ----------
  function tegnFag() {
    document.body.classList.remove("fag-engelsk", "fag-samfunnsfag");
    document.body.classList.add("fag-" + fag);
    document.querySelectorAll("[data-velg-fag]").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.velgFag === fag)));
    const en = fag === "engelsk";
    const P = E.problemstilling;

    document.getElementById("startord").innerHTML = P.startord[fag].map(s => "<li" + (en ? ' lang="en"' : "") + ">" + LV.esc(s) + "</li>").join("");
    document.getElementById("ps-eksempler").innerHTML = P.eksempler[fag].map(e =>
      '<div class="eksempel"' + (en ? ' lang="en"' : "") + '><p class="svak"><span class="merkelapp" lang="nb">Svak</span>' + LV.esc(e.svak) + "</p>" +
      '<p class="bedre"><span class="merkelapp" lang="nb">Bedre</span>' + LV.esc(e.bedre) + '</p><p class="hvorfor">' + LV.esc(e.hvorfor) + "</p></div>").join("");
    document.getElementById("ps-felt").placeholder = en
      ? "F.eks. To what extent is the American Dream still possible today?"
      : "F.eks. Hvorfor klarte ikke FN å hindre folkemordet i Rwanda?";
    sjekkProblemstilling();

    document.getElementById("fraser-ingress").textContent = en
      ? "Lær noen av disse utenat, så har du alltid noe å si – også når du er nervøs."
      : "Disse frasene hjelper deg å forklare, bruke kilder og drøfte.";
    document.getElementById("fraser-liste").innerHTML = E.fraser[fag].map(g =>
      '<div class="frasegruppe"' + (en ? ' lang="en"' : "") + "><h3>" + LV.esc(g.gruppe) + "</h3><ul>" + g.fraser.map(f => "<li>" + LV.esc(f) + "</li>").join("") + "</ul></div>").join("");

    const temaer = LV.temaer.filter(t => t.fag === fag).sort((a, b) => b.trinn - a.trinn || a.tittel.localeCompare(b.tittel, "nb"));
    document.getElementById("temaer-ingress").textContent = en
      ? "Les temaene på nytt, og gjør eksamensoppgaven («Exam practice») på nivå 3 i hvert tema: Der lager du en problemstilling og tre punkter."
      : "Les temaene på nytt, se på tidslinjen og repeter begrepene. Prøv å lage en problemstilling til hvert tema.";
    document.getElementById("eks-temaliste").innerHTML = temaer.map(t =>
      '<li><a class="temakort fag-' + t.fag + '" href="tema.html?id=' + encodeURIComponent(t.id) + '">' + LV.merker(t) +
      "<h3>" + LV.esc(t.tittel) + "</h3><p>" + LV.esc(t.kort) + "</p></a></li>").join("");

    tegnTemavalg();
    const kort = document.getElementById("ov-kort");
    if (sporsmalsbank) kort.innerHTML = '<p class="ov-tom">Trykk «Trekk et spørsmål» for å begynne.</p>';
  }

  // ---------- Sjekk problemstilling ----------
  function sjekkProblemstilling() {
    const felt = document.getElementById("ps-felt");
    const ut = document.getElementById("ps-tilbakemelding");
    const t = felt.value.trim();
    if (!t) { ut.innerHTML = ""; return; }
    const lav = t.toLowerCase();
    const ord = t.split(/\s+/).length;
    const en = fag === "engelsk";
    const r = [];
    const ok = s => r.push('<li class="ok"><span aria-hidden="true">✓</span> ' + s + "</li>");
    const tips = s => r.push('<li class="tips"><span aria-hidden="true">💡</span> ' + s + "</li>");

    if (t.endsWith("?")) ok("Det er et spørsmål.");
    else tips("En problemstilling bør være et spørsmål. Avslutt med spørsmålstegn.");

    const lukketNb = /^(hva er|hva var|hvem er|hvem var|når |hvor mange|hvor ligger|er |var |har |hadde |kan |finnes )/;
    const lukketEn = /^(what is|what was|what are|who is|who was|when |how many|where is|is |was |are |were |did |do |does |can |has |have )/;
    const apenNb = /^(hvordan|hvorfor|i hvilken grad|på hvilke måter|hvilke (årsaker|følger|konsekvenser|likheter|forskjeller)|hva (er|var) (årsakene|følgene|likhetene|forskjellene)|hvilken betydning)/;
    const apenEn = /^(how |why |to what extent|in what ways|what (are|were) the (causes|consequences|effects|reasons|differences|similarities))/;
    if ((apenEn.test(lav) || apenNb.test(lav)) && !/^how (many|much)/.test(lav)) ok("Spørsmålet er åpent og inviterer til forklaring eller drøfting.");
    else if (lukketEn.test(lav) || lukketNb.test(lav)) tips("Dette kan bli et faktaspørsmål med et kort svar. Prøv å starte med " + (en ? "«How», «Why», «To what extent» eller «In what ways»." : "«Hvordan», «Hvorfor», «I hvilken grad» eller «Hvilke følger …»."));
    else tips("Sjekk at spørsmålet er åpent – at det ikke kan besvares med ja/nei eller ett faktum.");

    if (ord < 6) tips("Den er ganske kort. Kan du gjøre den mer presis – hvem, hvor eller når?");
    else if (ord > 30) tips("Den er ganske lang. Kan du korte den ned, slik at den blir lett å huske og svare på?");
    else ok("Passe lengde.");

    if (/\d{3,4}/.test(t) || /\s[A-ZÆØÅ][a-zæøå]+/.test(t.slice(1))) ok("Den er konkret – den nevner et navn, et sted eller en tid.");
    else tips("Gjør den mer konkret: Legg gjerne til et sted, en tidsperiode, en person, en gruppe eller en tekst.");

    if (en && /[æøå]|\b(hvordan|hvorfor|og|ikke|hvilke)\b/.test(lav)) tips("Til eksamen i engelsk skal problemstillingen være på engelsk.");
    ut.innerHTML = r.join("");
  }

  // ---------- Tidtaker ----------
  let ttStart = 0, ttBrukt = 0, ttTimer = null, ttFase = "";
  function ttTegn() {
    const total = Number(document.getElementById("tt-lengde").value) * 60000;
    const brukt = ttBrukt + (ttTimer ? Date.now() - ttStart : 0);
    const s = Math.floor(brukt / 1000);
    document.getElementById("tt-tid").textContent = Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0");
    const pst = Math.min(100, brukt / total * 100);
    document.getElementById("tt-fyll").style.width = pst + "%";
    const bar = document.getElementById("tt-bar");
    bar.setAttribute("aria-valuenow", String(Math.round(pst)));
    bar.classList.toggle("over", brukt > total);
    let fase = "Klar";
    if (brukt > total) fase = "Tiden er ute – avslutt nå!";
    else if (brukt > 0) {
      const a = E.struktur[0].andel, c = E.struktur[2].andel;
      fase = pst < a ? E.struktur[0].del : pst < 100 - c ? E.struktur[1].del : E.struktur[2].del;
    }
    if (fase !== ttFase) { document.getElementById("tt-fase").textContent = fase; ttFase = fase; }
  }
  function ttStartPause() {
    const knapp = document.getElementById("tt-start");
    if (ttTimer) {
      ttBrukt += Date.now() - ttStart; clearInterval(ttTimer); ttTimer = null; knapp.textContent = "▶ Fortsett";
    } else {
      ttStart = Date.now(); ttTimer = setInterval(ttTegn, 250); knapp.textContent = "⏸ Pause";
    }
    ttTegn();
  }
  function ttNull() {
    clearInterval(ttTimer); ttTimer = null; ttBrukt = 0;
    document.getElementById("tt-start").textContent = "▶ Start";
    ttTegn();
  }

  // ---------- Øvingsspørsmål ----------
  function lagBank(temaer) {
    const bank = { engelsk: [], samfunnsfag: [] };
    temaer.forEach(({ kat, tema }) => {
      const o = tema.oppgaver || {};
      const kandidater = [].concat((o[2] && o[2].diskuter) || [], (o[3] && o[3].forsta) || [], (o[3] && o[3].diskuter) || []);
      kandidater.forEach(k => {
        const tekst = typeof k === "string" ? k : k.tekst;
        if (/^exam practice/i.test(tekst)) return;
        if (bank[kat.fag]) bank[kat.fag].push({ tekst: tekst, id: kat.id, tittel: kat.tittel, sprak: tema.sprak === "en" ? "en" : "nb" });
      });
    });
    return bank;
  }
  function tegnTemavalg() {
    const valg = document.getElementById("ov-tema");
    const temaer = LV.temaer.filter(t => t.fag === fag && (!sporsmalsbank || sporsmalsbank[fag].some(s => s.id === t.id)));
    valg.innerHTML = '<option value="">Alle temaer</option>' + temaer.map(t => '<option value="' + LV.esc(t.id) + '">' + LV.esc(t.tittel) + "</option>").join("");
  }
  function trekk() {
    const kort = document.getElementById("ov-kort");
    if (!sporsmalsbank) return;
    const valgt = document.getElementById("ov-tema").value;
    let liste = sporsmalsbank[fag].filter(s => !valgt || s.id === valgt);
    if (liste.length > 1) liste = liste.filter(s => s !== sisteSporsmal);
    if (!liste.length) { kort.innerHTML = '<p class="ov-tom">Fant ingen spørsmål.</p>'; return; }
    const s = liste[Math.floor(Math.random() * liste.length)];
    sisteSporsmal = s;
    kort.innerHTML = '<p class="ov-sporsmal"' + (s.sprak === "en" ? ' lang="en"' : "") + ">" + LV.enkelFormat(s.tekst) + "</p>" +
      '<p class="ov-fra">Fra temaet <a href="tema.html?id=' + encodeURIComponent(s.id) + '">' + LV.esc(s.tittel) + "</a></p>" +
      '<div class="tt-rad">' + ("speechSynthesis" in window ? '<button class="knapp" id="ov-les">🔊 Les opp</button>' : "") +
      '<button class="knapp" id="ov-tid">⏱️ Svar i 2 minutter</button><span class="ov-nedtelling" id="ov-nedtelling" aria-live="polite"></span></div>';
    const les = document.getElementById("ov-les");
    if (les) les.addEventListener("click", () => {
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(s.tekst.replace(/\*\*/g, ""));
      u.lang = s.sprak === "en" ? "en-GB" : "nb-NO";
      speechSynthesis.speak(u);
    });
    document.getElementById("ov-tid").addEventListener("click", nedtelling);
  }
  let nedTimer = null;
  function nedtelling() {
    clearInterval(nedTimer);
    const ut = document.getElementById("ov-nedtelling");
    const slutt = Date.now() + 120000;
    const tegnN = () => {
      const igjen = Math.max(0, Math.round((slutt - Date.now()) / 1000));
      if (!document.body.contains(ut)) { clearInterval(nedTimer); return; }
      ut.textContent = igjen ? Math.floor(igjen / 60) + ":" + String(igjen % 60).padStart(2, "0") + " igjen" : "Tiden er ute – godt jobbet!";
      if (!igjen) clearInterval(nedTimer);
    };
    tegnN(); nedTimer = setInterval(tegnN, 1000);
  }

  // ---------- Sjekkliste ----------
  function sjekklisteStatus() {
    const bokser = document.querySelectorAll(".sjekkliste input");
    const n = [...bokser].filter(b => b.checked).length;
    document.getElementById("sj-status").textContent = n === bokser.length
      ? "Alt er krysset av – du er klar! 🎉"
      : n + " av " + bokser.length + " er krysset av.";
  }

  document.addEventListener("DOMContentLoaded", async function () {
    const p = LV.param("fag");
    if (p === "engelsk" || p === "samfunnsfag") fag = p;
    bygg();
    tegnFag();
    sjekklisteStatus();

    document.querySelectorAll("[data-velg-fag]").forEach(b => b.addEventListener("click", () => {
      fag = b.dataset.velgFag;
      history.replaceState(null, "", "eksamen.html?fag=" + fag + location.hash);
      tegnFag();
    }));
    document.getElementById("ps-felt").addEventListener("input", sjekkProblemstilling);
    document.getElementById("tt-start").addEventListener("click", ttStartPause);
    document.getElementById("tt-null").addEventListener("click", ttNull);
    document.getElementById("tt-lengde").addEventListener("change", ttTegn);
    document.getElementById("ov-trekk").addEventListener("click", trekk);
    document.querySelectorAll(".sjekkliste input").forEach(b => b.addEventListener("change", sjekklisteStatus));
    document.getElementById("sj-null").addEventListener("click", () => {
      document.querySelectorAll(".sjekkliste input").forEach(b => { b.checked = false; });
      sjekklisteStatus();
    });

    sporsmalsbank = lagBank(await LV.lastAlleTemaer());
    tegnTemavalg();
    document.getElementById("ov-kort").innerHTML = '<p class="ov-tom">Trykk «Trekk et spørsmål» for å begynne.</p>';
  });
})();
