/* =========================================================
   Les verden – Historien der du bor (lokalhistorie.html)
   Et undersøkelsesopplegg i seks steg: stedet, navnet, bilder før
   og nå, minnesmerker, intervju og formidling (blått skilt og
   tidslinje for stedet). Alt skrives på siden og kan lastes ned
   (svarfil.js) eller skrives ut. Ingenting lagres.
   ========================================================= */
(function () {
  const LV = window.LV;
  const $ = id => document.getElementById(id);
  const esc = s => LV.esc(String(s == null ? "" : s));
  const lenke = (u, t) => '<a href="' + u + '" rel="noopener" target="_blank">' + t + "</a>";
  const SPORSMAL = [
    ["Barndom og skole", ["Hvor vokste du opp, og hvordan så det ut der?", "Hvordan var skoleveien din?", "Hvordan var en vanlig skoledag? Hva var strengt, og hva var morsomt?", "Hva lekte dere med?"]],
    ["Arbeid og penger", ["Hva var den første jobben din?", "Hva kostet ting da du var ung – for eksempel en is, en kinobillett eller en sykkel?", "Hvilke jobber fantes her før som ikke finnes nå?"]],
    ["Hverdag og teknologi", ["Når fikk dere telefon, TV eller bil hjemme?", "Hvordan fikk dere nyheter?", "Hva spiste dere til hverdags – og til fest?"]],
    ["Stedet før og nå", ["Hvordan så dette stedet ut da du var på min alder?", "Hvilke bygninger, butikker eller steder er borte nå?", "Hva er bedre her nå – og hva savner du?"]],
    ["Store hendelser", ["Husker du en hendelse i Norge eller verden der du husker nøyaktig hvor du var?", "Hvordan påvirket den hendelsen deg og familien din?"]]
  ];
  const ENDELSER = [["-heim, -vin", "Svært gamle navn, ofte fra før vikingtiden. Betyr «bosted» og «beite/eng»."], ["-stad, -set", "Gamle gårdsnavn. Betyr «sted» og «bosted»."], ["-rud, -rød", "«Rydning» – skog som ble ryddet til jord, ofte i middelalderen."], ["-vik, -nes, -dal, -berg", "Navn etter naturen: en bukt, et nes, en dal, et fjell."], ["Gatenavn etter personer", "Mange gater er oppkalt etter kjente personer. Hvem ble hedret – og hvem ble ikke det?"]];

  function bygg() {
    document.title = "Historien der du bor – " + (LV.config ? LV.config.navn : "Les verden");
    const steg = (n, id, tittel) => '<section class="lh-del" id="' + id + '" aria-labelledby="' + id + '-h"><h2 id="' + id + '-h"><span class="ho-nr">' + n + "</span> " + tittel + "</h2>";
    const felt = (id, label, rader) => '<label for="' + id + '">' + label + "</label>" + (rader ? '<textarea id="' + id + '" rows="' + rader + '"></textarea>' : '<input type="text" id="' + id + '">');
    $("innhold").innerHTML = '<nav class="brodsmuler" aria-label="Brødsmuler"><a href="index.html">Forside</a> › Historien der du bor</nav>' +
      '<header class="sidehode"><p class="overlinje">Lokalhistorie · undersøkelse</p><h1>🏘️ Historien der du bor</h1><p class="ingress">Historie skjer ikke bare i Paris og Berlin. Gatene du går i, husene du ser og menneskene rundt deg har også en historie. Bli historiker i ditt eget nabolag: Finn ut hva navnene betyr, sammenlign gamle bilder med i dag, intervju en som har bodd her lenge – og fortell historien videre.</p>' +
      '<nav class="dsp-innhold" aria-label="Stegene"><ol><li><a href="#lh-sted">Stedet</a></li><li><a href="#lh-navn">Navnet</a></li><li><a href="#lh-bilder">Før og nå</a></li><li><a href="#lh-minne">Minnesmerker</a></li><li><a href="#lh-intervju">Intervju</a></li><li><a href="#lh-formidle">Fortell videre</a></li></ol></nav></header>' +
      steg(1, "lh-sted", "Velg stedet") + "<p>Velg et sted du vil undersøke: en gate, et nabolag, en bygning, en gård, en skole eller hele bygda.</p>" + felt("lh-stedet", "Stedet jeg undersøker", 0) + felt("lh-hvorfor", "Hvorfor valgte jeg dette stedet? Hva vet jeg om det fra før?", 3) + "</section>" +
      steg(2, "lh-navn", "Hva forteller navnet?") + "<p>Stedsnavn og gatenavn er små historiske kilder. Mange er hundrevis av år gamle.</p>" +
      '<table class="lh-tabell"><caption>Noen vanlige navneledd</caption><thead><tr><th scope="col">Navnet ender på …</th><th scope="col">Betydning</th></tr></thead><tbody>' + ENDELSER.map(e => '<tr><th scope="row">' + esc(e[0]) + "</th><td>" + esc(e[1]) + "</td></tr>").join("") + "</tbody></table>" +
      '<p class="lh-kilder">🔎 Her kan du lete: ' + lenke("https://lokalhistoriewiki.no", "Lokalhistoriewiki") + " · " + lenke("https://snl.no", "Store norske leksikon") + " · " + lenke("https://norgeskart.no", "Norgeskart") + " · bygdebøker på biblioteket</p>" +
      felt("lh-navnet", "Hva betyr navnet på stedet ditt? Hvor fant du det ut?", 3) + felt("lh-gater", "Finn to gatenavn i nærheten. Hvem eller hva er de oppkalt etter? Hvorfor tror du de fikk akkurat de navnene?", 3) + "</section>" +
      steg(3, "lh-bilder", "Før og nå") + "<p>Finn et gammelt bilde av stedet. Gå dit og se (eller ta et bilde fra samme vinkel). Hva har forandret seg – og hva er det samme?</p>" +
      '<p class="lh-kilder">🔎 Gamle bilder: ' + lenke("https://digitaltmuseum.no", "DigitaltMuseum") + " (søk på stedsnavnet – også flyfoto) · " + lenke("https://www.nb.no/search", "Nasjonalbiblioteket") + " · " + lenke("https://norgeibilder.no", "Norge i bilder") + " (historiske flyfoto) · lokalhistorielaget</p>" +
      felt("lh-bildekilde", "Hvor fant du bildet? Hvem tok det, og når?", 0) +
      '<div class="lh-tofelt"><div>' + felt("lh-for", "Før – hva ser du på det gamle bildet?", 5) + "</div><div>" + felt("lh-na", "Nå – hva ser du i dag?", 5) + "</div></div>" + felt("lh-endring", "Hva har endret seg mest – og hvorfor tror du det har skjedd? Tenk på teknologi, arbeid, befolkning og trafikk.", 4) + "</section>" +
      steg(4, "lh-minne", "Minnesmerker og bygninger") + "<p>Finn et minnesmerke, en bauta, en minneplate, et gammelt hus eller en kirke. Les det som står der.</p>" +
      felt("lh-minnet", "Hva eller hvem minnes? Hva står det?", 3) + felt("lh-hvem", "Hvem bestemte at dette skulle minnes? Hvem eller hva blir ikke minnet – og hvorfor?", 3) +
      '<p class="fo-merk">Kanskje finnes det snublesteiner der du bor – små messingplater i fortauet med navn på jøder og andre som ble deportert og drept under andre verdenskrig. De ligger utenfor der personene bodde. Les navnene med respekt, og les mer i temaet om <a href="tema.html?id=sf10-holocaust">Holocaust</a>.</p></section>' +
      steg(5, "lh-intervju", "Intervju en som har bodd her lenge") + "<p>En besteforelder, en nabo eller en eldre i familien kan fortelle ting som ikke står i noen bok. Det kalles muntlige kilder.</p>" +
      '<div class="lh-regler"><h3>Før intervjuet</h3><ul><li>Spør om lov og fortell hva intervjuet skal brukes til.</li><li>Spør om du kan ta opp samtalen (med <a href="opptak.html">Ta opp deg selv</a>) eller skrive notater.</li><li>Ikke skriv det fulle navnet til den du intervjuer i skolearbeidet hvis personen ikke vil det. Skriv for eksempel «en kvinne født i 1952».</li><li>Husk at minner kan være unøyaktige. Sammenlign gjerne med andre kilder.</li></ul></div>' +
      "<h3>Velg spørsmål</h3><p>Kryss av for de spørsmålene du vil stille. Du kan skrive egne også.</p>" +
      SPORSMAL.map(([g, l], gi) => '<fieldset class="lh-sp"><legend>' + esc(g) + "</legend>" + l.map((q, qi) => '<label><input type="checkbox" data-q="' + esc(q) + '" id="lh-q-' + gi + "-" + qi + '"> ' + esc(q) + "</label>").join("") + "</fieldset>").join("") +
      felt("lh-egne", "Mine egne spørsmål", 3) + '<p><button type="button" class="knapp" id="lh-skjema">🖨️ Skriv ut intervjuskjemaet</button></p>' +
      felt("lh-notater", "Notater fra intervjuet: Hva var det mest overraskende du fikk vite?", 8) + "</section>" +
      steg(6, "lh-formidle", "Fortell historien videre") +
      "<h3>Det blå skiltet</h3><p>I mange byer henger det skilt på husveggen der kjente personer har bodd eller viktige ting har skjedd. Lag et skilt til stedet ditt. Det skal være kort: maks 25 ord.</p>" +
      '<div class="lh-tofelt"><div>' + felt("lh-s-tittel", "Hva eller hvem? (for eksempel «Her lå Fjordvik meieri»)", 0) + felt("lh-s-ar", "Årstall", 0) + felt("lh-s-tekst", "Kort tekst", 3) + '</div><div><div class="lh-blatt" id="lh-blatt" aria-live="polite"></div></div></div>' +
      "<h3>Tidslinje for stedet</h3><p>Skriv inn fire til seks viktige årstall og hendelser for stedet ditt.</p>" +
      '<div class="lh-tl-felt">' + [0, 1, 2, 3, 4, 5].map(i => '<div class="lh-tl-rad"><label class="skjult-visuelt" for="lh-tl-ar-' + i + '">År ' + (i + 1) + '</label><input type="text" id="lh-tl-ar-' + i + '" placeholder="År" inputmode="numeric"><label class="skjult-visuelt" for="lh-tl-h-' + i + '">Hendelse ' + (i + 1) + '</label><input type="text" id="lh-tl-h-' + i + '" placeholder="Hva skjedde?"></div>').join("") + "</div>" +
      '<ol class="lh-tidslinje" id="lh-tidslinje" aria-label="Tidslinje for stedet"></ol>' +
      felt("lh-oppsummering", "Oppsummering: Hva er det viktigste du har lært om stedet ditt? Hvordan henger historien til stedet sammen med Norges historie?", 5) +
      '<p><button type="button" class="knapp hoved" id="lh-print">🖨️ Skriv ut skiltet og tidslinjen</button></p></section>' +
      '<p class="mu-intro">For læreren: Opplegget passer som et prosjekt over to–fire uker, gjerne i samarbeid med det lokale historielaget eller biblioteket. Elevene kan presentere arbeidet som en utstilling (se <a href="museum.html">Museet vårt</a>), en podkast eller en guidet vandring. Husk personvern: Elevene skal ikke publisere navn eller opptak av andre uten samtykke.</p>';

    const blatt = () => {
      const t = $("lh-s-tittel").value, a = $("lh-s-ar").value, x = $("lh-s-tekst").value;
      $("lh-blatt").innerHTML = '<div class="lh-skilt"><p class="lh-sk-topp">' + esc($("lh-stedet").value || "Les verden") + '</p><p class="lh-sk-t">' + esc(t || "Her lå …") + '</p><p class="lh-sk-a">' + esc(a || "årstall") + '</p><p class="lh-sk-x">' + esc(x) + "</p></div>";
    };
    const tidslinje = () => {
      const rader = [0, 1, 2, 3, 4, 5].map(i => [$("lh-tl-ar-" + i).value.trim(), $("lh-tl-h-" + i).value.trim()]).filter(r => r[0] || r[1]).sort((a, b) => (parseInt(a[0]) || 0) - (parseInt(b[0]) || 0));
      $("lh-tidslinje").innerHTML = rader.map(r => "<li><strong>" + esc(r[0]) + "</strong> " + esc(r[1]) + "</li>").join("");
    };
    $("innhold").addEventListener("input", () => { blatt(); tidslinje(); });
    blatt();
    $("lh-print").addEventListener("click", () => { document.body.classList.add("lh-skriv-skilt"); window.print(); document.body.classList.remove("lh-skriv-skilt"); });
    $("lh-skjema").addEventListener("click", () => {
      const sp = [...document.querySelectorAll(".lh-sp input:checked")].map(i => i.dataset.q).concat($("lh-egne").value.split("\n").map(s => s.trim()).filter(Boolean));
      const w = document.createElement("div"); w.className = "lh-utskrift"; w.id = "lh-utskrift";
      w.innerHTML = "<h2>Intervju: " + esc($("lh-stedet").value || "historien der du bor") + '</h2><p>Dato: ________  Intervjuet er med (ikke fullt navn): ______________________</p><ol>' + sp.map(q => "<li><p>" + esc(q) + '</p><div class="lh-linjer"></div></li>').join("") + "</ol>";
      document.body.appendChild(w); document.body.classList.add("lh-skriv-skjema"); window.print(); document.body.classList.remove("lh-skriv-skjema"); w.remove();
    });
    const linje = document.createElement("div");
    linje.className = "svarlinje";
    linje.innerHTML = '<div class="svarlinje-indre"><label class="skjult-visuelt" for="elevnavn">Navn</label><input id="elevnavn" type="text" placeholder="Navn" autocomplete="off"><span class="status" role="status" aria-live="polite"></span></div>';
    document.body.appendChild(linje);
  }
  document.addEventListener("DOMContentLoaded", bygg);
})();
