/* =========================================================
   Les verden – begrepsbank
   Samler feltet «ord» fra alle temaene. Samme begrep fra flere temaer
   vises én gang; har temaene ulike forklaringer, vises alle.
   ========================================================= */

(function () {
  const LV = window.LV;

  let begreper = [];
  let fag = "", trinn = "", sok = "";

  function samle(temaer) {
    const kart = new Map();
    temaer.forEach(({ kat, tema }) => {
      Object.entries(tema.ord || {}).forEach(([ord, forklaring]) => {
        const sprak = tema.sprak === "en" ? "en" : "nb";
        const nokkel = sprak + ":" + ord.toLowerCase();
        if (!kart.has(nokkel)) kart.set(nokkel, { ord: ord, sprak: sprak, forklaringer: [] });
        const b = kart.get(nokkel);
        // Vis begrepet med liten forbokstav hvis noen av temaene skriver det slik
        if (ord[0] === ord[0].toLowerCase()) b.ord = ord;
        let f = b.forklaringer.find(x => x.tekst === forklaring);
        if (!f) { f = { tekst: forklaring, temaer: [] }; b.forklaringer.push(f); }
        f.temaer.push({ id: kat.id, tittel: kat.tittel, fag: kat.fag, trinn: kat.trinn });
      });
    });
    return [...kart.values()].sort((a, b) => a.ord.localeCompare(b.ord, "nb", { sensitivity: "base" }));
  }

  function bokstav(ord) {
    const b = ord.trim()[0].toUpperCase();
    return /[A-ZÆØÅ]/.test(b) ? b : "#";
  }

  function alleTemaer(b) { return b.forklaringer.flatMap(f => f.temaer); }

  function passer(b) {
    const t = alleTemaer(b);
    if (fag && !t.some(x => x.fag === fag)) return false;
    if (trinn && !t.some(x => String(x.trinn) === trinn)) return false;
    if (sok) {
      const tekst = (b.ord + " " + b.forklaringer.map(f => f.tekst).join(" ")).toLowerCase();
      if (!sok.toLowerCase().split(/\s+/).every(o => tekst.includes(o))) return false;
    }
    return true;
  }

  function tegn() {
    const utvalg = begreper.filter(passer);
    document.getElementById("antall").textContent =
      utvalg.length ? "Viser " + utvalg.length + " begreper." : "Ingen begreper passer med søket.";

    const grupper = new Map();
    utvalg.forEach(b => {
      const k = bokstav(b.ord);
      if (!grupper.has(k)) grupper.set(k, []);
      grupper.get(k).push(b);
    });

    let h = "";
    grupper.forEach((liste, k) => {
      h += '<section class="bokstavgruppe" id="bokstav-' + encodeURIComponent(k) + '" aria-labelledby="bh-' + encodeURIComponent(k) + '">' +
        '<h2 id="bh-' + encodeURIComponent(k) + '">' + k + '</h2><dl class="begrepskort">';
      liste.forEach(b => {
        const fagene = [...new Set(alleTemaer(b).map(t => t.fag))];
        h += '<div class="begrep fag-' + fagene[0] + '"><dt' + (b.sprak === "en" ? ' lang="en"' : "") + ">" + LV.esc(b.ord) +
          (b.sprak === "en" ? ' <span class="sprakmerke" lang="nb" title="Engelsk ord">EN</span>' : "") + "</dt>";
        b.forklaringer.forEach(f => {
          h += "<dd>" + LV.esc(f.tekst) + '<span class="tema-lenker">' + f.temaer.map(t =>
            '<a class="tema-lenke fag-' + t.fag + '" href="tema.html?id=' + encodeURIComponent(t.id) + '">' + LV.esc(t.tittel) + "</a>").join("") +
            "</span></dd>";
        });
        h += "</div>";
      });
      h += "</dl></section>";
    });
    document.getElementById("begreper").innerHTML = h;

    document.getElementById("bokstaver").innerHTML = grupper.size > 1
      ? [...grupper.keys()].map(k => '<a href="#bokstav-' + encodeURIComponent(k) + '">' + k + "</a>").join("")
      : "";

    document.querySelectorAll("[data-fag]").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.fag === fag)));
    document.querySelectorAll("[data-trinn]").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.trinn === trinn)));
  }

  function oppdaterAdresse() {
    const p = new URLSearchParams();
    if (fag) p.set("fag", fag);
    if (trinn) p.set("trinn", trinn);
    if (sok) p.set("sok", sok);
    history.replaceState(null, "", "begreper.html" + (p.toString() ? "?" + p : ""));
  }

  document.addEventListener("DOMContentLoaded", async function () {
    fag = LV.param("fag") || "";
    trinn = LV.param("trinn") || "";
    sok = LV.param("sok") || "";
    const sokFelt = document.getElementById("sok");
    sokFelt.value = sok;

    begreper = samle(await LV.lastAlleTemaer());
    tegn();

    document.querySelectorAll("[data-fag]").forEach(b => b.addEventListener("click", () => { fag = b.dataset.fag; oppdaterAdresse(); tegn(); }));
    document.querySelectorAll("[data-trinn]").forEach(b => b.addEventListener("click", () => { trinn = b.dataset.trinn; oppdaterAdresse(); tegn(); }));
    let tid;
    sokFelt.addEventListener("input", () => { clearTimeout(tid); tid = setTimeout(() => { sok = sokFelt.value.trim(); oppdaterAdresse(); tegn(); }, 150); });
  });
})();
