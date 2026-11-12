/* =========================================================
   Les verden – Menneskerettighetsdomstolen (domstol.html)
   domstol.html            → om EMK og EMD, sakene og gangen
   domstol.html?sak=<id>   → saken, artikkelen, partene, rollene,
                             dommertesten og den ekte saken
   Data: data/domstol.js. Svarene kan lastes ned (svarfil.js).
   ========================================================= */
(function () {
  const LV = window.LV;
  const $ = id => document.getElementById(id);
  const esc = s => LV.esc(String(s == null ? "" : s));
  const D = () => LV.domstol;
  const hode = sak => '<nav class="brodsmuler" aria-label="Brødsmuler"><a href="index.html">Forside</a> › <a href="spill.html">Spill</a> › ' + (sak ? '<a href="domstol.html">Menneskerettighetsdomstolen</a> › ' + esc(sak) : "Menneskerettighetsdomstolen") + "</nav>";
  const svarlinje = () => { const l = document.createElement("div"); l.className = "svarlinje"; l.innerHTML = '<div class="svarlinje-indre"><label class="skjult-visuelt" for="elevnavn">Navn</label><input id="elevnavn" type="text" placeholder="Navn" autocomplete="off"><span class="status" role="status" aria-live="polite"></span></div>'; document.body.appendChild(l); };
  const gang = () => '<ol class="fn-gang">' + D().gang.map(([n, t, tid]) => "<li><strong>" + esc(n) + '</strong> <span class="fn-tid">' + esc(tid) + "</span><p>" + esc(t) + "</p></li>").join("") + "</ol>";

  function oversikt() {
    $("innhold").innerHTML = hode() +
      '<header class="sidehode"><p class="overlinje">Rollespill · samfunnsfag 8.–10. trinn</p><h1>⚖️ Menneskerettighetsdomstolen</h1><p class="ingress">En innbygger mener at staten har krenket menneskerettighetene hans eller hennes. Nå skal domstolen avgjøre saken. Sakene er oppdiktet og handler om den tenkte staten ' + esc(D().stat) + ' – men hver sak har en ekte søster fra domstolen i Strasbourg.</p></header>' +
      '<section class="dm-del"><h2>Sakene</h2><ul class="dm-saker">' + D().saker.map(s => '<li><a class="dm-sakkort" href="domstol.html?sak=' + s.id + '"><span class="dm-ikon" aria-hidden="true">' + s.ikon + '</span><span><strong>' + esc(s.tittel) + '</strong><small class="dm-art">' + esc(s.artikkel.nr) + ": " + esc(s.artikkel.navn) + "</small><small>" + esc(s.kort) + "</small></span></a></li>").join("") + "</ul></section>" +
      '<section class="dm-del"><h2>Hva er EMK og EMD?</h2>' + D().om.map(p => "<p>" + esc(p) + "</p>").join("") + "</section>" +
      '<section class="dm-del"><h2>Slik gjør dere</h2>' + gang() + '<p class="mu-intro">Har du en stor klasse? La flere grupper være dommere samtidig, og sammenlign dommene til slutt. Har dere bare én skoletime, kan dere hoppe over innleggene og la alle gruppene gå rett til dommertesten.</p></section>' +
      '<details class="kl-laerer"><summary>For læreren: kontroller</summary><p>' + esc(D().kontroller) + "</p></details>" +
      '<p class="fo-merk">Se også: <a href="rettssak.html">Rettssaken</a> (straffesak i tingretten) · <a href="tema.html?id=sf10-fn-menneskerettigheter">FN og menneskerettighetene</a> · <a href="tema.html?id=sf8-rettsstaten">Rettsstaten</a> · <a href="fn.html">FN-rollespill</a> · <a href="debatt.html">Debattduell</a></p>';
  }

  function sak(s) {
    const T = D().tester[s.test];
    const tema = LV.temaer.find(t => t.id === s.tema);
    document.title = s.tittel + " – Menneskerettighetsdomstolen – " + (LV.config ? LV.config.navn : "Les verden");
    const liste = a => "<ul>" + a.map(x => "<li>" + esc(x) + "</li>").join("") + "</ul>";
    $("innhold").innerHTML = hode(s.tittel) +
      '<header class="sidehode"><p class="overlinje">⚖️ Menneskerettighetsdomstolen · ' + esc(s.artikkel.nr) + '</p><h1>' + s.ikon + " " + esc(s.tittel) + '</h1><p class="ingress">' + esc(s.kort) + "</p></header>" +
      '<nav class="mu-hopp" aria-label="Snarveier"><a href="#saken">📄 Saken</a><a href="#artikkelen">📜 Artikkelen</a><a href="#partene">🗣️ Partene</a><a href="#rollene">🎭 Rollene</a><a href="#dommertest">⚖️ Dommertesten</a><a href="#ekte">🏛️ Den ekte saken</a></nav>' +
      '<section class="dm-del" id="saken"><h2>📄 Saken: ' + esc(s.tittel) + " mot " + esc(D().stat) + "</h2>" + s.fakta.map(p => '<p class="dm-fakta">' + esc(p) + "</p>").join("") + "</section>" +
      '<section class="dm-del" id="artikkelen"><h2>📜 ' + esc(s.artikkel.nr) + ": " + esc(s.artikkel.navn) + '</h2><blockquote class="dm-artikkel"><p>' + esc(s.artikkel.tekst) + '</p><p class="dm-unntak">' + esc(s.artikkel.unntak) + "</p></blockquote><p class=\"dm-merk\">Teksten er forenklet fra Den europeiske menneskerettskonvensjonen.</p></section>" +
      '<section class="dm-del" id="partene"><h2>🗣️ Partene</h2><div class="dm-parter"><div class="dm-part dm-klager"><h3>🙋 Klageren mener</h3>' + liste(s.klager) + '</div><div class="dm-part dm-staten"><h3>🏛️ ' + esc(D().stat) + " mener</h3>" + liste(s.staten) + "</div></div></section>" +
      '<section class="dm-del" id="rollene"><h2>🎭 Rollene og gangen</h2><div class="dm-roller">' + D().roller.map(r => '<div class="dm-rolle"><h3>' + r.ikon + " " + esc(r.navn) + "</h3>" + liste(r.oppgave) + "</div>").join("") + "</div>" +
      '<details class="kl-laerer"><summary>Gangen i rettsmøtet</summary>' + gang() + "</details>" +
      '<label for="dm-notat">Notater og innlegg</label><textarea id="dm-notat" rows="5"></textarea></section>' +
      '<section class="dm-del" id="dommertest"><h2>⚖️ Dommertesten: ' + esc(T.navn) + '</h2><p class="mu-intro">Gå gjennom stegene i rekkefølge. Begrunn hvert svar med fakta fra saken og ord fra artikkelen.</p><ol class="dm-test">' +
      T.steg.map(([n, sp], i) => '<li><fieldset><legend><strong>' + esc(n) + "</strong> " + esc(sp) + '</legend><div class="dm-valg"><label><input type="radio" name="dm-s' + i + '" value="ja"> Ja</label><label><input type="radio" name="dm-s' + i + '" value="nei"> Nei</label><label><input type="radio" name="dm-s' + i + '" value="usikker"> Usikker</label></div>' +
        '<label class="skjult-visuelt" for="dm-b' + i + '">Begrunnelse for steg ' + (i + 1) + '</label><textarea id="dm-b' + i + '" rows="2" placeholder="Fordi …"></textarea></fieldset></li>').join("") + "</ol>" +
      '<fieldset class="dm-dom"><legend>Dommen</legend><div class="dm-valg"><label><input type="radio" name="dm-dom" value="krenkelse"> Rettigheten er krenket</label><label><input type="radio" name="dm-dom" value="ikke"> Rettigheten er ikke krenket</label></div>' +
      '<label for="dm-stemmer">Stemmene (for eksempel 5 mot 2)</label><input type="text" id="dm-stemmer"><label for="dm-premisser">Begrunnelsen for dommen</label><textarea id="dm-premisser" rows="5"></textarea><label for="dm-dissens">Dissens: Hva mener mindretallet?</label><textarea id="dm-dissens" rows="3"></textarea></fieldset></section>' +
      '<section class="dm-del" id="ekte"><h2>🏛️ Den ekte saken</h2><p class="mu-intro">Les dette først når dere har avsagt dommen deres.</p><button type="button" class="knapp hoved" id="dm-vis" aria-expanded="false" aria-controls="dm-ekte">Vis den ekte saken</button>' +
      '<div id="dm-ekte" class="dm-ekte" hidden><h3>' + esc(s.ekte.navn) + " (" + s.ekte.aar + ')</h3><p class="dm-utfall">Resultat: <strong>' + esc(s.ekte.utfall) + "</strong></p><p>" + esc(s.ekte.tekst) + '</p><label for="dm-sml">Hva var likt og ulikt i deres sak og den ekte saken? Ville dere endret dommen deres?</label><textarea id="dm-sml" rows="4"></textarea></div></section>' +
      '<p class="fo-merk">' + (tema ? 'Les mer: <a href="tema.html?id=' + encodeURIComponent(tema.id) + '">' + esc(tema.tittel) + "</a> · " : "") + '<a href="domstol.html">Alle sakene</a> · <a href="rettssak.html">Rettssaken</a></p>';
    $("dm-vis").addEventListener("click", () => { $("dm-ekte").hidden = false; $("dm-vis").setAttribute("aria-expanded", "true"); $("dm-vis").hidden = true; $("dm-ekte").querySelector("h3").setAttribute("tabindex", "-1"); $("dm-ekte").querySelector("h3").focus(); });
    svarlinje();
  }

  document.addEventListener("DOMContentLoaded", () => {
    const s = D().saker.find(x => x.id === LV.param("sak"));
    if (s) sak(s); else oversikt();
  });
})();
