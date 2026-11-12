/* =========================================================
   Les verden – FN-rollespill (fn.html)
   Forenklet «Model UN» med oppdiktede land.
   fn.html                    → oversikt
   fn.html?sak=<sak>          → saken: resolusjon, land, gang, avstemning
   fn.html?sak=<sak>&land=<l> → rollekort for ett land
   Ingenting lagres – svarene kan lastes ned med svarfil.js.
   ========================================================= */
(function () {
  const LV = window.LV;
  const $ = id => document.getElementById(id);
  const esc = s => LV.esc(String(s == null ? "" : s));
  const D = () => LV.fn;
  const hode = (sak, land) => '<nav class="brodsmuler" aria-label="Brødsmuler"><a href="index.html">Forside</a> › <a href="spill.html">Spill</a> › <a href="fn.html">FN-rollespill</a>' + (sak ? " › " + (land ? '<a href="fn.html?sak=' + sak.id + '">' + esc(sak.tittel) + "</a> › " + esc(land.navn) : esc(sak.tittel)) : "") + "</nav>";
  const flagg = l => '<span class="fn-flagg" aria-hidden="true" style="background:linear-gradient(90deg,' + l.farger[0] + " 0 33.3%," + l.farger[1] + " 33.3% 66.6%," + l.farger[2] + ' 66.6%)"></span>';
  const ST = { for: ["✔", "For"], mot: ["✘", "Mot"], endre: ["✎", "Vil endre"] };
  const gangHtml = () => '<ol class="fn-gang">' + D().gang.map(([n, t, tid]) => '<li><strong>' + esc(n) + '</strong> <span class="fn-tid">' + esc(tid) + "</span><p>" + esc(t) + "</p></li>").join("") + "</ol>";
  const fraserHtml = () => '<div class="fn-fraser"><table><caption class="skjult-visuelt">Nyttige fraser</caption><thead><tr><th scope="col">Når</th><th scope="col" lang="en">English</th><th scope="col">Norsk</th></tr></thead><tbody>' + D().fraser.map(([n, en, nb]) => "<tr><td>" + esc(n) + '</td><td lang="en">' + esc(en) + "</td><td>" + esc(nb) + "</td></tr>").join("") + "</tbody></table></div>";
  const svarlinje = () => { const linje = document.createElement("div"); linje.className = "svarlinje"; linje.innerHTML = '<div class="svarlinje-indre"><label class="skjult-visuelt" for="elevnavn">Navn</label><input id="elevnavn" type="text" placeholder="Navn" autocomplete="off"><span class="status" role="status" aria-live="polite"></span></div>'; document.body.appendChild(linje); };

  function oversikt() {
    document.title = "FN-rollespill – " + (LV.config ? LV.config.navn : "Les verden");
    $("innhold").innerHTML = hode() +
      '<header class="sidehode"><p class="overlinje" lang="en">Model UN</p><h1>🇺🇳 FN-rollespill</h1><p class="ingress">I FNs generalforsamling har alle medlemsland én stemme. Her blir dere delegater for hvert deres land, forhandler om et forslag til resolusjon og stemmer. Landene er oppdiktede, men problemene er ekte – og det samme er utfordringen med å bli enige.</p></header>' +
      '<h2>Velg en sak</h2><ul class="fo-liste">' + D().saker.map(s => '<li><a class="fo-kort" href="fn.html?sak=' + s.id + '" style="--fo-a:var(--engelsk)"><span class="fo-kort-topp"><span class="fo-ikon" aria-hidden="true">' + s.ikon + "</span><span>" + s.punkter.length + " punkter · " + D().land.length + " land</span></span><strong>" + esc(s.tittel) + "</strong><span>" + esc(s.bakgrunn.split(". ")[0]) + ".</span></a></li>").join("") + "</ul>" +
      '<h2>Landene</h2><ul class="fn-landliste">' + D().land.map(l => "<li>" + flagg(l) + "<strong>" + esc(l.navn) + "</strong><span>" + esc(l.fakta.join(" · ")) + "</span></li>").join("") + "</ul>" +
      "<h2>Slik foregår møtet</h2>" + gangHtml() +
      '<p class="fo-merk">Til læreren: Passer for 6–30 elever. Med mange elever kan to–fire elever dele et land som en delegasjon. Læreren eller en elev er ordstyrer (<span lang="en">Chair</span>). Rollespillet kan gjennomføres på norsk eller engelsk – frasebanken har begge. Rollekortene kan deles ut som lenker eller skrives ut. De samme landene er med i <a href="klima.html">Klimatoppmøtet</a>, der delegasjonene forhandler med tall og en klimamodell.</p>';
  }

  function sakSide(s) {
    document.title = s.tittel + " – FN-rollespill";
    const tema = LV.temaer.find(t => t.id === s.tema);
    $("innhold").innerHTML = hode(s) +
      '<header class="sidehode"><p class="overlinje">🇺🇳 FN-rollespill</p><h1>' + s.ikon + " " + esc(s.tittel) + '</h1><p class="ingress">' + esc(s.bakgrunn) + "</p>" + (s.id === "klima" ? '<p>🌍 Vil dere forhandle med tall og se hvor varmt det blir? Prøv <a href="klima.html">Klimatoppmøtet</a>.</p>' : "") + (tema ? '<p><a href="tema.html?id=' + tema.id + '">Les bakgrunnen i temaet «' + esc(tema.tittel) + "» →</a></p>" : "") + "</header>" +
      '<section class="fn-resolusjon"><h2>Forslag til resolusjon</h2><p class="fn-res-intro">Generalforsamlingen …</p><ol>' + s.punkter.map(p => "<li>" + esc(p) + "</li>").join("") + "</ol></section>" +
      '<h2>Rollekort</h2><p class="mu-intro">Hvert land (eller hver delegasjon) åpner sitt eget rollekort. Ikke vis rollekortet til de andre landene!</p><ul class="fn-kortliste">' + D().land.map(l => '<li><a class="fn-landkort" href="fn.html?sak=' + s.id + "&land=" + l.id + '">' + flagg(l) + "<strong>" + esc(l.navn) + '</strong><span>Åpne rollekortet →</span></a></li>').join("") + '</ul><p><button type="button" class="knapp" id="fn-skriv">🖨️ Skriv ut alle rollekortene</button></p>' +
      "<h2>Slik foregår møtet</h2>" + gangHtml() +
      '<section class="fn-avstemning" aria-labelledby="fn-av-h"><h2 id="fn-av-h">🗳️ Avstemning</h2><p class="mu-intro">Ordstyreren teller stemmene for hvert punkt. Et punkt er vedtatt hvis det får flere for-stemmer enn mot-stemmer.</p>' +
      s.punkter.map((p, i) => '<div class="fn-punkt" data-i="' + i + '"><p class="fn-punkt-tekst"><strong>Punkt ' + (i + 1) + ":</strong> " + esc(p) + '</p><div class="fn-tellere">' + [["for", "For"], ["mot", "Mot"], ["av", "Avstår"]].map(([k, n]) => '<div class="fn-teller fn-' + k + '" role="group" aria-label="' + n + ", punkt " + (i + 1) + '"><span>' + n + '</span><button type="button" class="knapp liten" data-k="' + k + '" data-d="-1" aria-label="Én stemme mindre ' + n.toLowerCase() + '">−</button><output id="fn-' + i + "-" + k + '">0</output><button type="button" class="knapp liten" data-k="' + k + '" data-d="1" aria-label="Én stemme mer ' + n.toLowerCase() + '">+</button></div>').join("") + '</div><p class="fn-utfall" id="fn-u' + i + '" aria-live="polite">Ingen stemmer ennå.</p></div>').join("") +
      '<button type="button" class="knapp liten" id="fn-null">↻ Nullstill stemmene</button></section>' +
      "<h2>Nyttige fraser</h2>" + fraserHtml() +
      '<section class="le-del"><h2>Etter rollespillet</h2>' + [["fn-e1", "Hvilke punkter ble vedtatt? Hvorfor tror du det gikk slik?"], ["fn-e2", "Var det vanskelig å mene noe du kanskje ikke er enig i selv? Hva lærte du av det?"], ["fn-e3", "Generalforsamlingens resolusjoner er anbefalinger og ikke bindende for landene. Hva betyr det for hvor mye FN kan få gjort?"]].map(([id, l]) => '<label class="mu-notat" for="' + id + '"><span>' + l + '</span><textarea id="' + id + '" rows="3"></textarea></label>').join("") + "</section>" +
      '<div class="fn-utskrift" aria-hidden="true">' + D().land.map(l => rollekort(s, l, true)).join("") + "</div>";

    const tall = {};
    const vis = i => {
      const t = tall[i] || { for: 0, mot: 0, av: 0 };
      ["for", "mot", "av"].forEach(k => { $("fn-" + i + "-" + k).textContent = t[k]; });
      const sum = t.for + t.mot + t.av;
      $("fn-u" + i).textContent = !sum ? "Ingen stemmer ennå." : t.for > t.mot ? "✔ Vedtatt (" + t.for + " for, " + t.mot + " mot, " + t.av + " avstår)" : t.for === t.mot ? "Uavgjort (" + t.for + "–" + t.mot + ") – punktet er ikke vedtatt." : "✘ Ikke vedtatt (" + t.for + " for, " + t.mot + " mot, " + t.av + " avstår)";
      $("fn-u" + i).className = "fn-utfall" + (sum ? (t.for > t.mot ? " ok" : " nei") : "");
    };
    document.querySelectorAll(".fn-teller button").forEach(b => b.addEventListener("click", () => {
      const i = +b.closest(".fn-punkt").dataset.i; tall[i] = tall[i] || { for: 0, mot: 0, av: 0 };
      tall[i][b.dataset.k] = Math.max(0, tall[i][b.dataset.k] + +b.dataset.d); vis(i);
    }));
    $("fn-null").addEventListener("click", () => { s.punkter.forEach((_, i) => { tall[i] = { for: 0, mot: 0, av: 0 }; vis(i); }); });
    $("fn-skriv").addEventListener("click", () => { document.body.classList.add("fn-skriv-alle"); window.print(); setTimeout(() => document.body.classList.remove("fn-skriv-alle"), 500); });
  }

  function rollekort(s, l, utskrift) {
    const r = s.roller[l.id];
    return '<article class="fn-rolle" style="--fn1:' + l.farger[0] + '"><p class="fn-rolle-topp">' + flagg(l) + " Rollekort · " + esc(s.tittel) + "</p><" + (utskrift ? "h2" : "h2") + ' class="fn-rolle-navn">Delegasjonen fra ' + esc(l.navn) + "</h2>" +
      '<ul class="fn-fakta">' + l.fakta.map(f => "<li>" + esc(f) + "</li>").join("") + "</ul>" +
      '<p class="fn-mal"><strong>🎯 Målet ditt:</strong> ' + esc(r.mal) + "</p>" +
      '<h3>Hva mener dere om punktene?</h3><ol class="fn-st">' + s.punkter.map((p, i) => '<li><span class="fn-st-merke fn-st-' + r.st[i][0] + '">' + ST[r.st[i][0]][0] + " " + ST[r.st[i][0]][1] + '</span> <span class="fn-st-punkt">' + esc(p) + '</span><span class="fn-st-hvorfor">' + esc(r.st[i][1]) + "</span></li>").join("") + "</ol>" +
      '<p class="fn-rod"><strong>🛑 Rød linje:</strong> ' + esc(r.rod) + '</p><p class="fn-tips"><strong>💡 Tips:</strong> ' + esc(r.tips) + "</p></article>";
  }

  function landSide(s, l) {
    document.title = l.navn + " – " + s.tittel + " – FN-rollespill";
    const pre = "fn-" + s.id + "-" + l.id + "-";
    $("innhold").innerHTML = hode(s, l) + rollekort(s, l, false) +
      '<section class="le-del"><h2>Forbered deg</h2>' +
      '<label class="mu-notat" for="' + pre + 'apning"><span>Åpningsinnlegg (ca. 1 minutt): Hvem er dere, hva mener dere, og hva vil dere oppnå?</span><textarea id="' + pre + 'apning" rows="7"></textarea></label>' +
      '<label class="mu-notat" for="' + pre + 'allierte"><span>Hvilke land tror du kan bli allierte? Hvilke blir vanskelige?</span><textarea id="' + pre + 'allierte" rows="3"></textarea></label>' +
      '<label class="mu-notat" for="' + pre + 'endring"><span>Endringsforslag: Hvilket punkt vil dere endre, og hvordan?</span><textarea id="' + pre + 'endring" rows="3"></textarea></label>' +
      '<label class="mu-notat" for="' + pre + 'notater"><span>Notater fra forhandlingene</span><textarea id="' + pre + 'notater" rows="5"></textarea></label></section>' +
      '<section class="le-del"><h2>Stemmeseddel</h2><p class="mu-intro">Hvordan stemmer dere til slutt? Det kan være annerledes enn rollekortet etter forhandlingene.</p>' +
      s.punkter.map((p, i) => '<fieldset class="fn-seddel"><legend>Punkt ' + (i + 1) + ": " + esc(p) + "</legend>" + [["for", "For"], ["mot", "Mot"], ["av", "Avstår"]].map(([k, n]) => '<label><input type="radio" name="' + pre + "v" + i + '" id="' + pre + "v" + i + "-" + k + '" value="' + k + '"> ' + n + "</label>").join("") + "</fieldset>").join("") + "</section>" +
      "<h2>Nyttige fraser</h2>" + fraserHtml() +
      '<p><a class="knapp" href="fn.html?sak=' + s.id + '">← Til saken og resolusjonsforslaget</a></p>';
  }

  document.addEventListener("DOMContentLoaded", () => {
    const s = D().saker.find(x => x.id === LV.param("sak"));
    const l = s && D().land.find(x => x.id === LV.param("land"));
    if (s && l) landSide(s, l); else if (s) sakSide(s); else oversikt();
    svarlinje();
  });
})();
