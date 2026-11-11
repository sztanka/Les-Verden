/* =========================================================
   Les verden – Fredskonferansen (fred.html)
   fred.html                         → oversikt
   fred.html?konf=<id>               → konferansen: bakgrunn, delegasjoner,
                                       gangen, forhandlingsbordet, virkeligheten
   fred.html?konf=<id>&del=<id>      → rollekort for én delegasjon
   fred.html?konf=<id>&utskrift=1    → alle rollekortene, ett per side
   Poengene står bare på rollekortene og vises samlet først når
   læreren trykker «Vis resultatet». Ingenting lagres.
   Data: data/fred.js
   ========================================================= */
(function () {
  const LV = window.LV;
  const $ = id => document.getElementById(id);
  const esc = s => LV.esc(String(s == null ? "" : s));
  const D = () => LV.fred;
  const hode = (k, d) => '<nav class="brodsmuler" aria-label="Brødsmuler"><a href="index.html">Forside</a> › <a href="spill.html">Spill</a> › <a href="fred.html">Fredskonferansen</a>' + (k ? " › " + (d ? '<a href="fred.html?konf=' + k.id + '">' + esc(k.tittel) + "</a> › " + esc(d.navn) : esc(k.tittel)) : "") + "</nav>";
  const stjerner = p => p >= 3 ? "★★★ Svært viktig for dere" : p === 2 ? "★★ Bra for dere" : p === 1 ? "★ Greit" : p === 0 ? "– Likegyldig" : p === -1 ? "✗ Litt dårlig" : p === -2 ? "✗✗ Dårlig" : "✗✗✗ Uakseptabelt";
  const gangHtml = () => '<ol class="fn-gang">' + D().gang.map(([n, t, tid]) => "<li><strong>" + esc(n) + '</strong> <span class="fn-tid">' + esc(tid) + "</span><p>" + esc(t) + "</p></li>").join("") + "</ol>";

  function oversikt() {
    document.title = "Fredskonferansen – " + (LV.config ? LV.config.navn : "Les verden");
    $("innhold").innerHTML = hode() +
      '<header class="sidehode"><p class="overlinje">Rollespill · historie</p><h1>🕊️ Fredskonferansen</h1><p class="ingress">Etter en stor krig må noen skrive freden. Dere blir diplomater fra stormaktene – eller fra små land som ikke får sitte ved bordet. Les rollekortet nøye, inngå avtaler i lobbyen og forhandle fram en fredsavtale. Til slutt får dere se hvor mange av målene deres dere nådde – og hva som skjedde i virkeligheten.</p></header>' +
      '<ul class="fo-liste">' + D().konferanser.map(k => '<li><a class="fo-kort" href="fred.html?konf=' + k.id + '" style="--fo-a:' + k.farger[0] + ";--fo-b:" + k.farger[1] + '"><span class="fo-kort-topp"><span class="fo-ikon" aria-hidden="true">' + k.ikon + "</span><span>" + esc(k.sted) + " · " + esc(k.dato) + "</span></span><strong>" + esc(k.tittel) + "</strong><span>" + esc(k.intro.split(". ")[0]) + '.</span><span class="fo-trinn">' + k.trinn + ". trinn · " + k.delegasjoner.length + " delegasjoner · " + k.saker.length + " saker</span></a></li>").join("") + "</ul>" +
      "<h2>Slik foregår konferansen</h2>" + gangHtml() +
      '<p class="mu-intro">For læreren: Passer for 12–30 elever, to til fem elever per delegasjon, og tar to skoletimer. Læreren eller en elev er ordstyrer. Rollekortene kan deles ut som lenker eller skrives ut. Spill gjerne begge konferansene og sammenlign: Hvorfor varte freden etter 1815 lenger enn freden etter 1919? Se også <a href="fn.html">FN-rollespillet</a> og <a href="rettssak.html">Rettssaken</a>.</p>';
  }

  function konferanse(k) {
    document.title = k.tittel + " – Fredskonferansen";
    const tema = LV.temaer && LV.temaer.find(t => t.id === k.tema);
    const koblet = (k.koblet || []).map(id => LV.temaer && LV.temaer.find(t => t.id === id)).filter(Boolean);
    const laerer = LV.param("laerer") === "1" && k.kontroller ? '<aside class="laerer-boks"><h2>For læreren: kontroller disse opplysningene</h2><ul>' + k.kontroller.map(x => "<li>" + esc(x) + "</li>").join("") + "</ul></aside>" : "";
    $("innhold").innerHTML = hode(k) + laerer +
      '<header class="sidehode fd-hodet" style="--fo-a:' + k.farger[0] + '"><p class="overlinje">' + esc(k.sted) + " · " + esc(k.dato) + '</p><h1><span aria-hidden="true">' + k.ikon + "</span> " + esc(k.tittel) + '</h1><p class="ingress">' + esc(k.intro) + "</p>" +
      '<nav class="dsp-innhold" aria-label="På denne siden"><ol><li><a href="#bakgrunn">Bakgrunn</a></li><li><a href="#delegasjoner">Delegasjonene</a></li><li><a href="#gang">Slik foregår det</a></li><li><a href="#bordet">Forhandlingsbordet</a></li><li><a href="#virkeligheten">Virkeligheten</a></li></ol></nav></header>' +
      '<section id="bakgrunn"><h2>Bakgrunn</h2>' + k.bakgrunn.map(p => "<p>" + esc(p) + "</p>").join("") + "</section>" +
      '<section id="delegasjoner"><h2>Delegasjonene</h2><ul class="fk-del">' + k.delegasjoner.map(d => '<li style="--d:' + d.farge + '"><span class="fk-dikon" aria-hidden="true">' + d.ikon + "</span><div><strong>" + esc(d.navn) + "</strong> <span class=\"fk-leder\">– " + esc(d.leder) + '</span><p>' + esc(d.hvem) + '</p><p class="fk-plass">' + (d.stemme ? "🪑 Sitter ved bordet" : "🚪 I lobbyen – uten stemme") + '</p><a class="knapp liten" href="fred.html?konf=' + k.id + "&amp;del=" + d.id + '">Rollekort →</a></div></li>').join("") + "</ul>" +
      '<p><a class="knapp" href="fred.html?konf=' + k.id + '&amp;utskrift=1">🖨️ Skriv ut alle rollekortene</a></p></section>' +
      '<section id="gang"><h2>Slik foregår konferansen</h2>' + gangHtml() + "</section>" +
      '<section id="bordet"><h2>🪑 Forhandlingsbordet</h2><p>Ordstyreren tar sakene én etter én. Når delegasjonene ved bordet er enige (eller har stemt), velger dere alternativet her. Poengene er hemmelige til dere trykker «Vis resultatet».</p>' +
      '<details class="fk-hendelser"><summary>⚡ Overraskelser læreren kan lese opp underveis</summary>' + k.hendelser.map(h => "<h3>" + esc(h.tittel) + "</h3><p>" + esc(h.tekst) + "</p>").join("") + "</details>" +
      '<form id="fk-skjema">' + k.saker.map((s, i) => '<fieldset class="fk-sak"><legend><span class="fk-nr">' + (i + 1) + "</span> " + esc(s.tittel) + "</legend><p>" + esc(s.sporsmal) + "</p>" + s.valg.map(v => '<label class="fk-valg"><input type="radio" name="' + s.id + '" value="' + v.id + '"> <span>' + esc(v.tekst) + "</span></label>").join("") + "</fieldset>").join("") +
      '<p><button type="submit" class="knapp hoved">📊 Vis resultatet</button> <span id="fk-mangler" role="status" aria-live="polite"></span></p></form><div id="fk-resultat"></div></section>' +
      '<section id="virkeligheten"><h2>🌍 Virkeligheten</h2><p>Når dere har laget avtalen deres: Hva ble faktisk bestemt – og hva skjedde etterpå?</p><button type="button" class="knapp" id="fk-ekte">Vis hva som skjedde i virkeligheten</button><div id="fk-ekteboks" hidden></div></section>' +
      '<section class="fd-snakk"><h2>💬 Snakk og skriv</h2><ol>' + k.sporsmal.map((q, i) => '<li><label for="fk-q-' + i + '">' + esc(q) + '</label><textarea id="fk-q-' + i + '" rows="3"></textarea></li>').join("") + "</ol>" +
      "<p>" + [tema].concat(koblet).filter(Boolean).map(t => '<a class="knapp" href="tema.html?id=' + encodeURIComponent(t.id) + '">Les temaet «' + esc(t.tittel) + "» →</a>").join(" ") + "</p></section>";

    const resultat = valgt => {
      const del = k.delegasjoner;
      const sum = {}, maks = {}; del.forEach(d => { sum[d.id] = 0; maks[d.id] = 0; });
      let risiko = 0, maksR = 0;
      k.saker.forEach(s => {
        const v = s.valg.find(x => x.id === valgt[s.id]);
        del.forEach(d => { maks[d.id] += Math.max(...s.valg.map(x => x.poeng[d.id] || 0)); if (v) sum[d.id] += v.poeng[d.id] || 0; });
        maksR += Math.max(...s.valg.map(x => x.risiko)); if (v) risiko += v.risiko;
      });
      return { sum, maks, risiko, maksR };
    };
    const tabell = (r, tittel) => {
      const del = k.delegasjoner.slice().sort((a, b) => r.sum[b.id] / r.maks[b.id] - r.sum[a.id] / r.maks[a.id]);
      const andel = r.risiko / r.maksR, nivaa = andel < .34 ? ["lav", "🟢 Lav: De fleste kan leve med avtalen."] : andel < .67 ? ["middels", "🟡 Middels: Noen er misfornøyde og kan ville endre avtalen senere."] : ["hoy", "🔴 Høy: Avtalen skaper mye bitterhet. Faren for en ny konflikt er stor."];
      return '<div class="fk-res"><h3>' + esc(tittel) + '</h3><table><caption class="skjult-visuelt">Poeng per delegasjon</caption><thead><tr><th scope="col">Delegasjon</th><th scope="col">Poeng</th><th scope="col">Av mulige</th><th scope="col"><span class="skjult-visuelt">Andel</span></th></tr></thead><tbody>' +
        del.map(d => { const p = Math.max(0, Math.round(r.sum[d.id] / r.maks[d.id] * 100)); return "<tr><th scope=\"row\">" + d.ikon + " " + esc(d.navn) + (d.stemme ? "" : " <small>(lobby)</small>") + "</th><td>" + r.sum[d.id] + "</td><td>" + r.maks[d.id] + '</td><td><span class="fk-stolpe" style="--p:' + p + '%;--d:' + d.farge + '"></span></td></tr>'; }).join("") + "</tbody></table>" +
        '<p class="fk-risiko fk-' + nivaa[0] + '"><strong>Risiko for ny konflikt:</strong> ' + nivaa[1] + "</p></div>";
    };
    $("fk-skjema").addEventListener("submit", e => {
      e.preventDefault();
      const valgt = {}; k.saker.forEach(s => { const x = $("fk-skjema").querySelector('input[name="' + s.id + '"]:checked'); if (x) valgt[s.id] = x.value; });
      const mangler = k.saker.filter(s => !valgt[s.id]).map(s => s.tittel);
      $("fk-mangler").textContent = mangler.length ? "Mangler: " + mangler.join(", ") : "";
      if (mangler.length) return;
      $("fk-resultat").innerHTML = tabell(resultat(valgt), "Resultatet av deres avtale") + '<p class="tr-tenk">💭 Hvem vant mest? Hvem tapte? Hvorfor tror dere delegasjonene i lobbyen fikk så lite?</p>';
      $("fk-resultat").querySelector("h3").setAttribute("tabindex", "-1"); $("fk-resultat").querySelector("h3").focus();
      window.__fkValgt = valgt;
    });
    $("fk-ekte").addEventListener("click", () => {
      const ekte = {}; k.saker.forEach(s => { ekte[s.id] = s.ekte; });
      const deres = window.__fkValgt || {};
      $("fk-ekteboks").hidden = false; $("fk-ekte").hidden = true;
      $("fk-ekteboks").innerHTML = '<ol class="fk-ekteliste">' + k.saker.map(s => { const v = s.valg.find(x => x.id === s.ekte), lik = deres[s.id] === s.ekte; return "<li><h3>" + esc(s.tittel) + "</h3><p><strong>Det som ble bestemt:</strong> " + esc(v.tekst) + "</p><p>" + esc(s.ekteTekst) + "</p>" + (deres[s.id] ? '<p class="fk-sml">' + (lik ? "✔ Dere valgte det samme." : "✎ Dere valgte noe annet.") + "</p>" : "") + "</li>"; }).join("") + "</ol>" +
        tabell(resultat(ekte), "Hvis vi gir poeng til den virkelige avtalen") +
        "<h3>Hva skjedde etterpå?</h3>" + k.etter.map(p => "<p>" + esc(p) + "</p>").join("");
    });
    svarlinje();
  }

  function rollekort(k, d, id) {
    return '<article class="fk-kort" style="--d:' + d.farge + '"' + (id ? "" : "") + '><p class="overlinje">' + esc(k.tittel) + " · " + esc(k.dato) + '</p><h2><span aria-hidden="true">' + d.ikon + "</span> " + esc(d.navn) + '</h2><p class="fk-leder">Leder: ' + esc(d.leder) + '</p><p class="fk-plass">' + (d.stemme ? "🪑 Dere sitter ved forhandlingsbordet og har stemme." : "🚪 Dere er i lobbyen og har ikke stemme. Dere må overtale de andre!") + "</p>" +
      "<h3>Hvem er dere?</h3><p>" + esc(d.hvem) + "</p><h3>Målene deres</h3><p>" + esc(d.mal) + '</p><h3>🤫 Hemmelig mål</h3><p class="fk-hemmelig">' + esc(d.hemmelig) + "</p>" +
      "<h3>Hva betyr hver sak for dere?</h3>" + k.saker.map(s => '<div class="fk-kortsak"><h4>' + esc(s.tittel) + "</h4><ul>" + s.valg.map(v => '<li><span class="fk-st fk-st' + Math.sign(v.poeng[d.id] || 0) + '">' + stjerner(v.poeng[d.id] || 0) + "</span> " + esc(v.tekst) + "</li>").join("") + "</ul></div>").join("") +
      '<h3>Tips</h3><ul><li>Bestem dere for hvilke to saker som er viktigst – og hvor dere kan gi etter.</li><li>Inngå avtaler: «Vi støtter dere i … hvis dere støtter oss i …»</li><li>Bruk argumenter, ikke bare krav: Hvorfor er deres forslag best for freden?</li></ul></article>';
  }

  function delSide(k, d) {
    document.title = "Rollekort: " + d.navn + " – " + k.tittel;
    $("innhold").innerHTML = hode(k, d) + rollekort(k, d) + '<p class="fk-skriv"><button type="button" class="knapp" id="fk-print">🖨️ Skriv ut rollekortet</button> <a class="knapp" href="fred.html?konf=' + k.id + '">← Til konferansen</a></p>' +
      '<section class="fd-snakk"><h2>Forbered åpningstalen</h2><label for="fk-tale">Skriv åpningstalen deres (maks ett minutt): Hvem er vi, og hva krever vi?</label><textarea id="fk-tale" rows="6"></textarea><label for="fk-avtaler">Avtaler vi har gjort i lobbyen</label><textarea id="fk-avtaler" rows="4"></textarea></section>';
    $("fk-print").addEventListener("click", () => window.print());
    svarlinje();
  }

  function utskrift(k) {
    document.title = "Rollekort – " + k.tittel;
    $("innhold").innerHTML = hode(k) + '<p class="fk-skriv"><button type="button" class="knapp hoved" id="fk-print">🖨️ Skriv ut</button> Ett rollekort per side.</p><div class="fk-utskrift">' + k.delegasjoner.map(d => rollekort(k, d, true)).join("") + "</div>";
    $("fk-print").addEventListener("click", () => window.print());
  }

  function svarlinje() {
    const linje = document.createElement("div");
    linje.className = "svarlinje";
    linje.innerHTML = '<div class="svarlinje-indre"><label class="skjult-visuelt" for="elevnavn">Navn</label><input id="elevnavn" type="text" placeholder="Navn eller delegasjon" autocomplete="off"><span class="status" role="status" aria-live="polite"></span></div>';
    document.body.appendChild(linje);
  }

  document.addEventListener("DOMContentLoaded", () => {
    const k = D().konferanser.find(x => x.id === LV.param("konf"));
    if (!k) return oversikt();
    const d = k.delegasjoner.find(x => x.id === LV.param("del"));
    if (d) delSide(k, d); else if (LV.param("utskrift") === "1") utskrift(k); else konferanse(k);
  });
})();
