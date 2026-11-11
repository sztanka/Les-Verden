/* =========================================================
   Les verden – Tenkerutiner (tenkerutiner.html)
   tenkerutiner.html                       → oversikt
   tenkerutiner.html?rutine=<id>&tema=<id> → økt med temaet
   &vis=storskjerm                         → ett steg om gangen, stor tekst
   Elevarket kan lastes ned (svarfil.js). Ingenting lagres.
   Data: data/tenkerutiner.js + bildene til temaene.
   ========================================================= */
(function () {
  const LV = window.LV;
  const $ = id => document.getElementById(id);
  const esc = s => LV.esc(String(s == null ? "" : s));
  const R = () => LV.tenkerutiner;
  const hode = r => '<nav class="brodsmuler" aria-label="Brødsmuler"><a href="index.html">Forside</a> › <a href="tenkerutiner.html">Tenkerutiner</a>' + (r ? " › " + esc(r.navn) : "") + "</nav>";
  const temaValg = (valgt, id) => '<select id="' + id + '"><option value="">Velg et tema …</option>' +
    [["samfunnsfag", "Samfunnsfag"], ["engelsk", "Engelsk"]].map(([f, n]) => '<optgroup label="' + n + '">' + LV.temaer.filter(t => t.fag === f).sort((a, b) => a.trinn - b.trinn || a.tittel.localeCompare(b.tittel, "nb")).map(t => '<option value="' + t.id + '"' + (t.id === valgt ? " selected" : "") + ">" + t.trinn + ". – " + esc(t.tittel) + "</option>").join("") + "</optgroup>").join("") + "</select>";

  function oversikt() {
    document.title = "Tenkerutiner – " + (LV.config ? LV.config.navn : "Les verden");
    const faser = [...new Set(R().map(r => r.fase))];
    $("innhold").innerHTML = hode() +
      '<header class="sidehode"><p class="overlinje">Lese og tenke · for hele klassen</p><h1>💭 Tenkerutiner</h1><p class="ingress">Korte, faste måter å tenke sammen på – før, under og etter lesing. Velg en rutine og et tema. Bildet eller temaet vises på storskjermen, og elevene skriver på sitt eget ark. Når rutinene blir kjente, blir samtalene i klassen dypere.</p>' +
      '<form class="tu-start" id="tu-start"><label for="tu-tema">Tema</label>' + temaValg(LV.param("tema") || "", "tu-tema") + '<button type="button" class="knapp liten" id="tu-tilf">🎲 Tilfeldig tema</button></form></header>' +
      faser.map(f => "<h2>" + esc(f) + '</h2><ul class="tu-liste">' + R().filter(r => r.fase === f).map(r => '<li class="tu-kort"><h3><span aria-hidden="true">' + r.ikon + "</span> " + esc(r.navn) + '</h3><p class="tu-en" lang="en">' + esc(r.en) + "</p><p>" + esc(r.kort) + '</p><p class="tu-stegliste">' + r.steg.map(s => esc(s[0])).join(" → ") + '</p><p class="tu-knapper"><a class="knapp hoved" data-r="' + r.id + '" href="tenkerutiner.html?rutine=' + r.id + '">📝 Elevark</a><a class="knapp" data-r="' + r.id + '" data-vis="storskjerm" href="tenkerutiner.html?rutine=' + r.id + '&amp;vis=storskjerm">📺 Storskjerm</a></p></li>').join("") + "</ul>").join("") +
      '<p class="mu-intro">For læreren: Rutinene er inspirert av «Visible Thinking» fra Project Zero ved Harvard. De virker best når de brukes ofte og på samme måte, slik at elevene kjenner dem igjen. Start med «Se – tenk – undre» før dere leser et nytt tema. Bildene er de samme som på temasidene – velg et tema over. Rutinene finnes også i boksen «Alt om temaet» på hver temaside.</p>';
    const oppdater = () => { const t = $("tu-tema").value; document.querySelectorAll("[data-r]").forEach(a => { const q = new URLSearchParams({ rutine: a.dataset.r }); if (t) q.set("tema", t); if (a.dataset.vis) q.set("vis", a.dataset.vis); a.href = "tenkerutiner.html?" + q; }); };
    $("tu-tema").addEventListener("change", oppdater);
    $("tu-tilf").addEventListener("click", () => { const l = LV.temaer; $("tu-tema").value = l[Math.floor(Math.random() * l.length)].id; oppdater(); });
    oppdater();
  }

  function okt(r) {
    const tema = LV.temaer.find(t => t.id === LV.param("tema"));
    const stor = LV.param("vis") === "storskjerm";
    document.title = r.navn + " – Tenkerutiner";
    const lenke = (endr) => { const q = new URLSearchParams(location.search); Object.entries(endr).forEach(([k, v]) => v ? q.set(k, v) : q.delete(k)); return "tenkerutiner.html?" + q; };
    // Bildet og zoom-punktet (fast for hvert tema, så alle ser det samme)
    let hash = 0; for (const c of (tema ? tema.id : "x")) hash = (hash * 31 + c.charCodeAt(0)) % 997;
    const zx = 25 + hash % 50, zy = 25 + (hash * 7) % 50;
    const bilde = tema && tema.bilde ? '<figure class="tu-bilde' + (r.zoom ? " tu-zoom" : "") + '"><div class="tu-ramme"><img id="tu-img" src="' + esc(tema.bilde) + '" alt="' + esc(r.zoom ? "Et utsnitt av bildet til temaet" : (tema.bildeAlt || "")) + '" style="transform-origin:' + zx + "% " + zy + '%"></div>' + (tema.kreditt ? '<figcaption>Foto: ' + esc(tema.kreditt) + "</figcaption>" : "") + "</figure>" : "";
    const materiale = tema ? '<div class="tu-materiale">' + (r.materiale === "bilde" || stor ? bilde : "") + '<div class="tu-tematekst"><p class="overlinje">' + (tema.fag === "engelsk" ? "Engelsk" : "Samfunnsfag") + " · " + tema.trinn + '. trinn</p><h2 id="tu-tematittel">' + esc(r.zoom ? "Hva er dette?" : tema.tittel) + "</h2>" + (r.zoom ? "" : "<p>" + esc(tema.kort || "") + '</p><p><a href="tema.html?id=' + encodeURIComponent(tema.id) + '">Les temaet →</a></p>') + "</div></div>" :
      '<p class="melding">Velg et tema for å få bilde og tekst til rutinen.</p>';
    $("innhold").innerHTML = hode(r) +
      '<header class="sidehode tu-hode"><p class="overlinje">Tenkerutine · ' + esc(r.fase) + '</p><h1><span aria-hidden="true">' + r.ikon + "</span> " + esc(r.navn) + ' <span class="tu-en" lang="en">' + esc(r.en) + "</span></h1>" +
      '<div class="tu-verktoy"><label for="tu-tema">Tema</label>' + temaValg(tema ? tema.id : "", "tu-tema") +
      '<span class="tu-modus" role="group" aria-label="Visning"><a class="knapp liten" href="' + lenke({ vis: "" }) + '"' + (!stor ? ' aria-current="page"' : "") + '>📝 Elevark</a><a class="knapp liten" href="' + lenke({ vis: "storskjerm" }) + '"' + (stor ? ' aria-current="page"' : "") + ">📺 Storskjerm</a></span></div></header>" +
      materiale + '<div id="tu-steg"></div>' +
      '<details class="tu-tips"><summary>Tips til læreren</summary><p>' + r.tips + "</p></details>";
    $("tu-tema").addEventListener("change", e => { location.href = lenke({ tema: e.target.value }); });

    const zoom = n => { const img = $("tu-img"); if (img && r.zoom) { img.style.transform = "scale(" + [4, 2, 1][Math.min(n, 2)] + ")"; if (n >= 2) { img.alt = tema.bildeAlt || ""; $("tu-tematittel").textContent = tema.tittel; } } };
    if (stor) {
      let n = 0;
      const vis = () => {
        const s = r.steg[n];
        $("tu-steg").innerHTML = '<section class="tu-stor" aria-live="polite"><p class="tu-nr">Steg ' + (n + 1) + " av " + r.steg.length + " · ca. " + s[2] + ' min</p><h2>' + esc(s[0]) + '</h2><p class="tu-sp">' + esc(s[1]) + '</p><p class="tu-nav"><button type="button" class="knapp" id="tu-forrige"' + (n ? "" : " disabled") + '>← Forrige</button><button type="button" class="knapp hoved" id="tu-neste"' + (n < r.steg.length - 1 ? "" : " disabled") + ">Neste steg →</button></p>" +
          '<ol class="tu-prikker" aria-hidden="true">' + r.steg.map((x, i) => '<li class="' + (i === n ? "na" : i < n ? "ferdig" : "") + '">' + esc(x[0]) + "</li>").join("") + "</ol></section>";
        $("tu-forrige").addEventListener("click", () => { n--; vis(); });
        $("tu-neste").addEventListener("click", () => { n++; vis(); });
        zoom(n);
      };
      vis();
    } else {
      $("tu-steg").innerHTML = '<ol class="tu-ark">' + r.steg.map((s, i) => '<li><h3>' + esc(s[0]) + '</h3><label for="tu-s-' + i + '">' + esc(s[1]) + '</label><textarea id="tu-s-' + i + '" rows="4"></textarea>' + (r.zoom && i < 2 ? '<button type="button" class="knapp liten tu-mer" data-n="' + (i + 1) + '">🔍 Vis mer av bildet</button>' : "") + "</li>").join("") + "</ol>";
      zoom(0);
      document.querySelectorAll(".tu-mer").forEach(b => b.addEventListener("click", () => { zoom(+b.dataset.n); b.disabled = true; }));
      const linje = document.createElement("div");
      linje.className = "svarlinje";
      linje.innerHTML = '<div class="svarlinje-indre"><label class="skjult-visuelt" for="elevnavn">Navn</label><input id="elevnavn" type="text" placeholder="Navn" autocomplete="off"><span class="status" role="status" aria-live="polite"></span></div>';
      document.body.appendChild(linje);
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    const r = R().find(x => x.id === LV.param("rutine"));
    if (r) okt(r); else oversikt();
  });
})();
