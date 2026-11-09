/* =========================================================
   Les verden – Kontinuitet og endring (endring.html)
   Fem temaer sett på tre tidspunkter (rundt 1814, rundt 1914, i dag).
   Eleven vurderer hvor mye hvert område har endret seg, og svarer
   på spørsmål om årsaker, fremskritt og vendepunkter.
   endring.html → oversikt · endring.html?id=<tema>
   Data: data/endring.js · Ingenting lagres.
   ========================================================= */
(function () {
  const LV = window.LV;
  const $ = id => document.getElementById(id);
  const esc = s => LV.esc(String(s == null ? "" : s));
  const hode = t => '<nav class="brodsmuler" aria-label="Brødsmuler"><a href="index.html">Forside</a> › <a href="tidslinje.html">Tidslinje</a> › <a href="endring.html">Kontinuitet og endring</a>' + (t ? " › " + esc(t) : "") + "</nav>";
  const GRAD = [["mye", "Endret seg mye"], ["litt", "Endret seg litt"], ["lite", "Nesten det samme"]];

  function oversikt(D) {
    document.title = "Kontinuitet og endring – " + (LV.config ? LV.config.navn : "Les verden");
    $("innhold").innerHTML = hode() +
      '<header class="sidehode"><p class="overlinje">Historisk tenkning</p><h1>⏳ Kontinuitet og endring</h1><p class="ingress">Noe forandrer seg raskt, annet holder seg likt i hundrevis av år. Hvordan var det å gå på skole, arbeide eller være barn rundt 1814, rundt 1914 og i dag? Sammenlign, vurder hvor mye som har endret seg – og spør hvorfor.</p></header>' +
      '<ul class="fo-liste">' + D.temaer.map(t => '<li><a class="fo-kort" href="endring.html?id=' + t.id + '" style="--fo-a:var(--samfunnsfag)"><span class="fo-kort-topp"><span class="fo-ikon" aria-hidden="true">' + t.ikon + "</span><span>1814 · 1914 · i dag</span></span><strong>" + esc(t.tittel) + "</strong><span>" + t.rader.map(r => esc(r[0])).join(" · ") + "</span></a></li>").join("") + "</ul>" +
      '<div class="ka-metode"><h2>Tenk som en historiker</h2><ul><li><strong>Endring er ikke alltid fremskritt.</strong> Det som er bedre for noen, kan være verre for andre.</li><li><strong>Endring skjer i ulikt tempo.</strong> Noe skjer gradvis, noe skjer brått ved et vendepunkt.</li><li><strong>Noe varer.</strong> Kontinuitet – det som holder seg likt – er like viktig å se som endringen.</li></ul></div>' +
      '<p class="fo-merk">Til læreren: Oppgaven bygger på Peter Seixas’ begrep «kontinuitet og endring». La elevene først gjette hvordan det var før de leser, eller del klassen så hver gruppe tar ett tema og presenterer det. Faktaene er forenklet – sjekk gjerne detaljer i temaene og i leksikon.</p>';
  }

  function tema(D, t) {
    const pre = "en-" + t.id + "-";
    const temaInfo = LV.temaer.find(x => x.id === t.tema);
    document.title = t.tittel + " – Kontinuitet og endring";
    $("innhold").innerHTML = hode(t.tittel) +
      '<header class="sidehode"><p class="overlinje">⏳ Kontinuitet og endring</p><h1>' + t.ikon + " " + esc(t.tittel) + ' – før og nå</h1><p class="ingress">Les hva som gjaldt på de tre tidspunktene. Vurder så hvor mye hvert område har endret seg fra 1814 til i dag.</p></header>' +
      '<div class="en-tabell">' + t.rader.map(([aspekt, celler], r) => '<section class="en-blokk" aria-labelledby="' + pre + "h" + r + '"><h2 class="en-aspekt" id="' + pre + "h" + r + '">' + esc(aspekt) + '</h2><div class="en-celler">' + celler.map((c, i) => '<p class="en-celle en-t' + i + '"><strong class="en-tid">' + esc(D.tider[i]) + "</strong>" + esc(c) + "</p>").join("") + "</div>" +
        '<fieldset class="en-vurder"><legend>Hvor mye har dette endret seg fra 1814 til i dag?</legend>' + GRAD.map(([v, n]) => '<label><input type="radio" name="' + pre + "r" + r + '" id="' + pre + "r" + r + "-" + v + '" value="' + v + '"> ' + n + "</label>").join("") + "</fieldset></section>").join("") + "</div>" +
      '<section class="en-oversikt" aria-live="polite"><h2>Endringsmåler</h2><div id="en-maler" class="en-maler"></div></section>' +
      '<section class="le-del"><h2>Tenk etter</h2>' + D.sporsmal.map((s, i) => '<label class="mu-notat" for="' + pre + "s" + i + '"><span>' + esc(s) + '</span><textarea id="' + pre + "s" + i + '" rows="3"></textarea></label>').join("") +
      (temaInfo ? '<p><a href="tema.html?id=' + temaInfo.id + '">Les mer i temaet «' + esc(temaInfo.tittel) + "» →</a></p>" : "") +
      '<p class="en-andre">Andre temaer: ' + D.temaer.filter(x => x.id !== t.id).map(x => '<a href="endring.html?id=' + x.id + '">' + x.ikon + " " + esc(x.tittel) + "</a>").join(" · ") + "</p></section>";

    const maler = () => {
      const verdier = t.rader.map((_, r) => (document.querySelector('input[name="' + pre + "r" + r + '"]:checked') || {}).value);
      const n = { mye: 0, litt: 0, lite: 0 }; verdier.forEach(v => { if (v) n[v]++; });
      const svart = verdier.filter(Boolean).length;
      $("en-maler").innerHTML = svart ? '<div class="en-stolper">' + GRAD.map(([v, navn]) => '<div class="en-stolpe en-' + v + '"><span class="en-stolpe-fyll" style="height:' + (n[v] / t.rader.length * 100) + '%"></span><span class="en-stolpe-tall">' + n[v] + '</span><span class="en-stolpe-navn">' + navn + "</span></div>").join("") + "</div><p>" + (n.mye >= n.litt + n.lite ? "Dere mener at det meste har endret seg mye. Hva er det som likevel har holdt seg likt?" : n.lite > 0 ? "Dere har funnet kontinuitet – noe som nesten ikke har endret seg. Hvorfor tror dere det har vart så lenge?" : "Mye har endret seg litt. Skjedde endringene gradvis, eller var det et vendepunkt?") + "</p>" : '<p class="mu-intro">Vurder områdene over, så vises resultatet her.</p>';
    };
    document.querySelectorAll(".en-vurder input").forEach(i => i.addEventListener("change", maler));
    maler();
  }

  document.addEventListener("DOMContentLoaded", () => {
    const D = LV.endring, t = D.temaer.find(x => x.id === LV.param("id"));
    if (t) tema(D, t); else oversikt(D);
    const l = document.createElement("div"); l.className = "svarlinje"; l.innerHTML = '<div class="svarlinje-indre"><label class="skjult-visuelt" for="elevnavn">Navn</label><input id="elevnavn" type="text" placeholder="Navn" autocomplete="off"><span class="status" role="status" aria-live="polite"></span></div>'; document.body.appendChild(l);
  });
})();
