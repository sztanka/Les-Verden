/* =========================================================
   Les verden – felles tidslinje
   Samler feltet «tidslinje» fra alle temaene, sorterer etter dato
   og deler inn i perioder. Like hendelser fra flere temaer slås sammen.
   ========================================================= */

(function () {
  const LV = window.LV;

  const PERIODER = [
    { id: "for-1800", navn: "Før 1800", fra: -Infinity, til: 1800 },
    { id: "1800", navn: "1800-tallet", fra: 1800, til: 1900 },
    { id: "1900-1945", navn: "1900–1945", fra: 1900, til: 1946 },
    { id: "1946-1991", navn: "1946–1991", fra: 1946, til: 1992 },
    { id: "etter-1991", navn: "Etter 1991", fra: 1992, til: Infinity }
  ];

  let hendelser = [];
  let fag = "", trinn = "", sok = "";

  function samle(temaer) {
    const liste = [];
    temaer.forEach(({ kat, tema }) => {
      (tema.tidslinje || []).forEach(h => {
        liste.push({
          dato: h.dato, tekst: h.tekst, nokkel: LV.tidsnokkel(h.dato),
          sprak: tema.sprak === "en" ? "en" : "nb",
          temaer: [{ id: kat.id, tittel: kat.tittel, fag: kat.fag, trinn: kat.trinn }]
        });
      });
    });
    liste.sort((a, b) => a.nokkel - b.nokkel);

    // Slå sammen samme hendelse fra flere temaer (samme dato, samme språk, lik tekst)
    const ut = [];
    liste.forEach(h => {
      const lik = ut.find(u => u.nokkel === h.nokkel && u.sprak === h.sprak && LV.likhet(u.tekst, h.tekst) >= 0.4);
      if (lik) {
        if (h.tekst.length > lik.tekst.length) { lik.tekst = h.tekst; lik.dato = h.dato; }
        h.temaer.forEach(t => { if (!lik.temaer.some(x => x.id === t.id)) lik.temaer.push(t); });
      } else ut.push(h);
    });
    return ut;
  }

  function passer(h) {
    if (fag && !h.temaer.some(t => t.fag === fag)) return false;
    if (trinn && !h.temaer.some(t => String(t.trinn) === trinn)) return false;
    if (sok) {
      const tekst = (h.dato + " " + h.tekst + " " + h.temaer.map(t => t.tittel).join(" ")).toLowerCase();
      if (!sok.toLowerCase().split(/\s+/).every(o => tekst.includes(o))) return false;
    }
    return true;
  }

  function tegn() {
    const mal = document.getElementById("tidslinje-alle");
    const utvalg = hendelser.filter(passer);
    document.getElementById("antall").textContent =
      utvalg.length ? "Viser " + utvalg.length + " hendelser." : "Ingen hendelser passer med søket.";

    let h = "";
    const brukte = [];
    PERIODER.forEach(p => {
      const iPeriode = utvalg.filter(e => { const ar = Math.floor(e.nokkel / 10000); return ar >= p.fra && ar < p.til; });
      if (!iPeriode.length) return;
      brukte.push(p);
      h += '<section class="periode" id="periode-' + p.id + '" aria-labelledby="ph-' + p.id + '"><h2 id="ph-' + p.id + '">' + p.navn + "</h2><ol>";
      iPeriode.forEach(e => {
        const fagKlasse = "fag-" + e.temaer[0].fag;
        h += '<li class="' + fagKlasse + '"' + (e.sprak === "en" ? ' lang="en"' : "") + '>' +
          '<span class="dato">' + LV.esc(e.dato) + "</span>" +
          '<span class="hendelse">' + LV.enkelFormat(e.tekst) +
          '<span class="tema-lenker" lang="nb">' + e.temaer.map(t =>
            '<a class="tema-lenke fag-' + t.fag + '" href="tema.html?id=' + encodeURIComponent(t.id) + '#tidslinje">' + LV.esc(t.tittel) + "</a>").join("") +
          "</span></span></li>";
      });
      h += "</ol></section>";
    });
    mal.innerHTML = h;

    document.getElementById("perioder").innerHTML = brukte.length > 1
      ? '<span class="etikett">Hopp til:</span>' + brukte.map(p => '<a class="knapp" href="#periode-' + p.id + '">' + p.navn + "</a>").join("")
      : "";

    document.querySelectorAll("[data-fag]").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.fag === fag)));
    document.querySelectorAll("[data-trinn]").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.trinn === trinn)));
  }

  function oppdaterAdresse() {
    const p = new URLSearchParams();
    if (fag) p.set("fag", fag);
    if (trinn) p.set("trinn", trinn);
    if (sok) p.set("sok", sok);
    history.replaceState(null, "", "tidslinje.html" + (p.toString() ? "?" + p : ""));
  }

  document.addEventListener("DOMContentLoaded", async function () {
    fag = LV.param("fag") || "";
    trinn = LV.param("trinn") || "";
    sok = LV.param("sok") || "";
    const sokFelt = document.getElementById("sok");
    sokFelt.value = sok;

    hendelser = samle(await LV.lastAlleTemaer());
    tegn();

    document.querySelectorAll("[data-fag]").forEach(b => b.addEventListener("click", () => { fag = b.dataset.fag; oppdaterAdresse(); tegn(); }));
    document.querySelectorAll("[data-trinn]").forEach(b => b.addEventListener("click", () => { trinn = b.dataset.trinn; oppdaterAdresse(); tegn(); }));
    let tid;
    sokFelt.addEventListener("input", () => { clearTimeout(tid); tid = setTimeout(() => { sok = sokFelt.value.trim(); oppdaterAdresse(); tegn(); }, 150); });
  });
})();
