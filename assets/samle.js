/* =========================================================
   Les verden – samler innhold fra alle temaene
   Brukes av tidslinjen og begrepsbanken. Temafilene lastes én
   etter én (de bruker alle window.LV.tema), og det som trengs,
   kopieres ut. Ingenting lagres.
   ========================================================= */

(function () {
  const LV = window.LV;

  // Laster alle temafilene i oversikt.js. Gir en liste med { kat, tema }.
  LV.lastAlleTemaer = async function () {
    const resultat = [];
    for (const kat of LV.temaer) {
      try {
        LV.tema = null;
        await LV.lastSkript("data/temaer/" + encodeURIComponent(kat.id) + ".js");
        if (LV.tema && LV.tema.id === kat.id) resultat.push({ kat: kat, tema: LV.tema });
      } catch (e) {
        console.warn(e.message);
      }
    }
    LV.tema = null;
    return resultat;
  };

  // Gjør en dato-tekst om til et tall som kan sorteres.
  // Forstår f.eks. «1.9.1939», «9.–10.11.1938», «Mars 1938», «Juli–okt. 1940»,
  // «1760-tallet», «ca. 500 f.Kr.», «11 September 2001», «1861–1865».
  const MANEDER = [
    ["jan"], ["feb"], ["mar"], ["apr"], ["mai", "may"], ["jun"],
    ["jul"], ["aug"], ["sep"], ["okt", "oct"], ["nov"], ["des", "dec"]
  ];
  LV.tidsnokkel = function (dato) {
    const t = String(dato).toLowerCase();
    const aar = t.match(/\d{3,4}/);
    if (!aar) return 0;
    let ar = Number(aar[0]);
    if (/f\.\s*kr|\bbc\b|\bbce\b/.test(t)) ar = -ar;
    let maned = 0, dag = 0;
    const tall = t.match(/(\d{1,2})\.\s*(\d{1,2})\.\s*\d{3,4}/);
    if (tall) {
      dag = Number(tall[1]); maned = Number(tall[2]);
    } else {
      const ord = t.match(/[a-zæøå]{3,}/g) || [];
      for (const o of ord) {
        const i = MANEDER.findIndex(m => m.some(p => o.startsWith(p)));
        if (i >= 0) { maned = i + 1; break; }
      }
      const d = t.match(/^(\d{1,2})\.?\s+[a-zæøå]/);
      if (d && maned) dag = Number(d[1]);
    }
    return ar * 10000 + maned * 100 + dag;
  };

  // Hvor like to tekster er (andel felles ord). Brukes for å slå sammen like hendelser.
  const STOPPORD = new Set(["blir", "ble", "samme", "også", "etter", "med", "mot", "som", "være", "the", "with", "from", "that", "this", "their", "after", "first", "første", "gang"]);
  LV.likhet = function (a, b) {
    const ord = s => new Set(String(s).toLowerCase().replace(/\*\*/g, "").split(/[^a-zæøåäöüé0-9]+/).filter(w => w.length > 3 && !STOPPORD.has(w)));
    const A = ord(a), B = ord(b);
    if (!A.size || !B.size) return 0;
    let felles = 0;
    A.forEach(w => { if (B.has(w)) felles++; });
    return felles / Math.min(A.size, B.size);
  };

  // Enkel formatering: **fet** (samme som på temasidene, men uten ordforklaringer).
  LV.enkelFormat = function (tekst) {
    return LV.esc(tekst).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  };
})();
