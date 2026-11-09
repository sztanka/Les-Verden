/* =========================================================
   Les verden – Samtidig i verden (samtidig.html)
   Velg et år og se hva som skjedde samtidig i Norge, i den
   engelskspråklige verden og i resten av verden. Hendelsene
   hentes fra feltet «tidslinje» i alle temaene (samle.js).
   samtidig.html?ar=1914&spenn=0|2|10
   Ingenting lagres.
   ========================================================= */
(function () {
  const LV = window.LV;
  const $ = id => document.getElementById(id);
  const esc = s => LV.esc(String(s == null ? "" : s));
  const NORGE = /norge|norsk|nordm[ae]nn|storting|eidsvoll|oslo|kristiania|christiania|bergen|trondheim|tromsø|samer|samisk|sámi|sametinget|finnmark|kvener|haakon|quisling|nygaardsvold|gerhardsen|brundtland|norsk hydro|altaelva|altasaken|svalbard|utøya|regjeringskvartalet|norway|norwegian|lofoten|telemark|narvik|rjukan|kirkenes/i;
  const ENGELSK = /\busa\b|amerika|u\.s\.|united states|america|britain|britisk|storbritannia|england|engelsk|english|london|skottland|scotland|wales|irland|ireland|irish|australia|new zealand|aotearoa|canada|india|indisk|jamaica|nigeria|sør-afrika|south africa|washington|new york|lincoln|churchill|dronning victoria|queen victoria|kennedy|martin luther king|mandela|apartheid|\buk\b|british|manchester|liverpool|chicago|boston|philadelphia|virginia|alabama|texas|california|maori|māori|aborigin/i;
  const KOL = [["norge", "🇳🇴 Norge"], ["engelsk", "🇬🇧🇺🇸 Den engelskspråklige verden"], ["verden", "🌍 Resten av verden"]];
  const HURTIG = [1789, 1814, 1848, 1865, 1905, 1914, 1929, 1939, 1945, 1948, 1963, 1969, 1989, 2001, 2011];
  const SPENN = [["0", "Bare dette året"], ["2", "± 2 år"], ["10", "Hele tiåret"]];

  let hendelser = [], ar = 1914, spenn = "0";
  const arAv = h => Math.floor(h.nokkel / 10000);
  const arTekst = a => a < 0 ? -a + " f.Kr." : String(a);

  function sted(h) {
    const t = h.tekst + " " + h.temaer.map(x => x.tittel).join(" ");
    if (NORGE.test(h.tekst)) return "norge";
    if (ENGELSK.test(h.tekst)) return "engelsk";
    if (/tyskland|europa|japan|sovjet|russland|frankrike|kina|berlin|paris|moskva|polen|italia|spania|israel|palestin|afrika|asia|\bfn\b|nato/i.test(h.tekst)) return "verden";
    if (h.temaer.some(x => /^sf\d+-(1814|unionen|demokratiet-i-norge|okkupasjonen|norge-etter|fornorskingen|utvandringen)/.test(x.id))) return "norge";
    if (h.sprak === "en" || ENGELSK.test(t)) return "engelsk";
    return "verden";
  }

  function samle(temaer) {
    const liste = [];
    temaer.forEach(({ kat, tema }) => (tema.tidslinje || []).forEach(h => liste.push({ dato: h.dato, tekst: h.tekst, nokkel: LV.tidsnokkel(h.dato), sprak: tema.sprak === "en" ? "en" : "nb", temaer: [{ id: kat.id, tittel: kat.tittel, fag: kat.fag }] })));
    liste.sort((a, b) => a.nokkel - b.nokkel);
    const ut = [];
    liste.forEach(h => {
      if (!h.nokkel) return;
      const lik = ut.find(u => u.nokkel === h.nokkel && u.sprak === h.sprak && LV.likhet(u.tekst, h.tekst) >= 0.4);
      if (lik) { if (h.tekst.length > lik.tekst.length) { lik.tekst = h.tekst; lik.dato = h.dato; } h.temaer.forEach(t => { if (!lik.temaer.some(x => x.id === t.id)) lik.temaer.push(t); }); }
      else ut.push(h);
    });
    ut.forEach(h => { h.sted = sted(h); });
    return ut;
  }

  function intervall() {
    if (spenn === "10") { const fra = Math.floor(ar / 10) * 10; return [fra, fra + 9, fra + "-tallet"]; }
    const s = +spenn; return s ? [ar - s, ar + s, arTekst(ar - s) + "–" + arTekst(ar + s)] : [ar, ar, arTekst(ar)];
  }

  function tegn() {
    const [fra, til, navn] = intervall();
    const utvalg = hendelser.filter(h => { const a = arAv(h); return a >= fra && a <= til; });
    $("sa-ar").value = ar;
    document.querySelectorAll("[data-spenn]").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.spenn === spenn)));
    $("sa-overskrift").textContent = utvalg.length ? navn + ": " + utvalg.length + " hendelser" : navn + ": ingen hendelser i temaene";
    $("sa-kolonner").innerHTML = KOL.map(([k, tittel]) => {
      const her = utvalg.filter(h => h.sted === k);
      return '<section class="sa-kol sa-' + k + '" aria-labelledby="sa-h-' + k + '"><h3 id="sa-h-' + k + '">' + tittel + ' <span class="sa-antall">(' + her.length + ")</span></h3>" +
        (her.length ? '<ol class="sa-liste">' + her.map(h => '<li' + (h.sprak === "en" ? ' lang="en"' : "") + '><span class="sa-dato">' + esc(h.dato) + '</span><span class="sa-tekst">' + LV.enkelFormat(h.tekst) + '</span><span class="sa-temaer" lang="nb">' + h.temaer.map(t => '<a href="tema.html?id=' + encodeURIComponent(t.id) + '#tidslinje">' + esc(t.tittel) + "</a>").join("") + "</span></li>").join("") + "</ol>" : '<p class="sa-tom">Ingen hendelser her i temaene.</p>') + "</section>";
    }).join("");
    try { history.replaceState(null, "", "samtidig.html?ar=" + ar + (spenn !== "0" ? "&spenn=" + spenn : "")); } catch (e) { /* ignorer */ }
  }

  function hopp(retning) {
    const steg = spenn === "10" ? 10 : spenn === "2" ? 5 : 1;
    const ar0 = ar;
    const kandidater = [...new Set(hendelser.map(arAv))].sort((a, b) => a - b);
    if (spenn === "10") { const n = Math.floor(ar / 10) * 10 + retning * 10; const fins = kandidater.filter(a => retning > 0 ? a >= n : a < n + 10); if (fins.length) ar = retning > 0 ? Math.floor(fins[0] / 10) * 10 : Math.floor(fins[fins.length - 1] / 10) * 10; }
    else { const neste = retning > 0 ? kandidater.find(a => a >= ar + steg) : kandidater.filter(a => a <= ar - steg).pop(); if (neste != null) ar = neste; }
    if (ar !== ar0) { tegn(); $("sa-status").textContent = "Viser " + $("sa-overskrift").textContent + "."; }
  }

  document.addEventListener("DOMContentLoaded", async () => {
    ar = parseInt(LV.param("ar"), 10) || 1945;
    spenn = ["0", "2", "10"].includes(LV.param("spenn")) ? LV.param("spenn") : "0";
    $("innhold").innerHTML = '<nav class="brodsmuler" aria-label="Brødsmuler"><a href="index.html">Forside</a> › <a href="tidslinje.html">Tidslinje</a> › Samtidig i verden</nav>' +
      '<header class="sidehode"><p class="overlinje">Tidslinje</p><h1>🕰️ Samtidig i verden</h1><p class="ingress">Mens Norge fikk sin egen grunnlov, hva skjedde i USA og Storbritannia? Velg et år og se hendelsene fra alle temaene side om side. Historien skjer ikke ett sted om gangen.</p></header>' +
      '<form class="sa-velger" id="sa-form"><div class="sa-ar-rad"><button type="button" class="knapp" id="sa-forrige" aria-label="Forrige år med hendelser">◀</button><label for="sa-ar">År</label><input type="number" id="sa-ar" min="-3000" max="2100" step="1" inputmode="numeric"><button type="submit" class="knapp hoved">Vis</button><button type="button" class="knapp" id="sa-neste" aria-label="Neste år med hendelser">▶</button></div>' +
      '<div class="sa-spenn" role="group" aria-label="Hvor mange år">' + SPENN.map(([v, n]) => '<button type="button" class="knapp liten" data-spenn="' + v + '" aria-pressed="false">' + n + "</button>").join("") + "</div>" +
      '<div class="sa-hurtig"><span>Prøv:</span>' + HURTIG.map(a => '<button type="button" class="knapp liten" data-ar="' + a + '">' + a + "</button>").join("") + '</div><p class="skjult-visuelt" id="sa-status" role="status" aria-live="polite"></p></form>' +
      '<h2 id="sa-overskrift" class="sa-overskrift">Henter hendelser fra temaene …</h2><div class="sa-kolonner" id="sa-kolonner"></div>' +
      '<section class="le-del"><h2>Tenk sammen</h2>' +
      [["sa-t1", "Velg én hendelse fra to av kolonnene. Kan de ha påvirket hverandre? Hvordan?"], ["sa-t2", "Hva tror du en ungdom i Norge visste om det som skjedde i resten av verden dette året? Hvordan fikk folk nyheter?"], ["sa-t3", "Hvilken hendelse tror du var viktigst for folk flest – og for hvem?"]].map(([id, l]) => '<label class="mu-notat" for="' + id + '"><span>' + l + '</span><textarea id="' + id + '" rows="3"></textarea></label>').join("") + "</section>" +
      '<p class="fo-merk">Hendelsene hentes fra tidslinjene i temaene på nettstedet, så de dekker det temaene handler om – ikke alt som skjedde. Plasseringen i kolonnene gjøres automatisk ut fra stedsnavn i teksten og kan av og til slå feil.</p>';

    hendelser = samle(await LV.lastAlleTemaer());
    tegn();
    $("sa-form").addEventListener("submit", e => { e.preventDefault(); const v = parseInt($("sa-ar").value, 10); if (!isNaN(v)) { ar = v; tegn(); $("sa-status").textContent = "Viser " + $("sa-overskrift").textContent + "."; } });
    document.querySelectorAll("[data-ar]").forEach(b => b.addEventListener("click", () => { ar = +b.dataset.ar; tegn(); $("sa-status").textContent = "Viser " + $("sa-overskrift").textContent + "."; }));
    document.querySelectorAll("[data-spenn]").forEach(b => b.addEventListener("click", () => { spenn = b.dataset.spenn; tegn(); $("sa-status").textContent = "Viser " + $("sa-overskrift").textContent + "."; }));
    $("sa-forrige").addEventListener("click", () => hopp(-1));
    $("sa-neste").addEventListener("click", () => hopp(1));

    const linje = document.createElement("div");
    linje.className = "svarlinje";
    linje.innerHTML = '<div class="svarlinje-indre"><label class="skjult-visuelt" for="elevnavn">Navn</label><input id="elevnavn" type="text" placeholder="Navn" autocomplete="off"><span class="status" role="status" aria-live="polite"></span></div>';
    document.body.appendChild(linje);
  });
})();
