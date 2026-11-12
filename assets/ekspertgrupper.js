/* =========================================================
   Les verden – Ekspertgrupper (ekspertgrupper.html)
   «Jigsaw»: Temaet deles i 3–5 deler. Hver ekspertgruppe leser én
   del og lærer den bort i hjemmegruppa. Til slutt løser hjemmegruppa
   en felles oppgave som krever alle delene.
   ekspertgrupper.html?tema=<id>&grupper=4          → lærerens oversikt + utskrift
   ekspertgrupper.html?tema=<id>&grupper=4&ekspert=B → elevens kort og skjema
   ekspertgrupper.html?tema=<id>&grupper=4&hjem=1    → hjemmegruppas ark
   &lett=1 bruker den lettere teksten der den finnes.
   Ingenting lagres – svarene kan lastes ned (svarfil.js).
   ========================================================= */
(function () {
  const LV = window.LV;
  const $ = id => document.getElementById(id);
  const esc = s => LV.esc(String(s == null ? "" : s));
  const BOKST = "ABCDE";
  const FARGE = ["#c2410c", "#1d4ed8", "#15803d", "#7e22ce", "#a16207"];

  const T = {
    nb: { ekspert: "Ekspert", del: "Ekspertdel", les: "Les teksten", sporsmal: "Snakk om i ekspertgruppa", ord: "Nøkkelord", skjema: "Lær bort-skjema",
      s1: "De tre viktigste tingene i min del er:", s2: "Et ord de andre må forstå, og hva det betyr:", s3: "Et spørsmål jeg vil stille hjemmegruppa:", s4: "En tegning, et tall eller et eksempel som gjør det lettere å huske:",
      hjem: "Hjemmegruppa", hjemIntro: "Hver ekspert lærer bort sin del (ca. 3 minutter hver). De andre noterer det viktigste.", notat: "Dette lærte jeg av eksperten på", felles: "Felles oppgave", fellesIntro: "Løs oppgaven sammen. Dere trenger kunnskap fra alle ekspertene.",
      start: "Startspørsmålet", tilbake: "Tenk tilbake: Hvilken del var lettest å forstå når en annen elev forklarte den? Hvorfor?" },
    en: { ekspert: "Expert", del: "Expert part", les: "Read the text", sporsmal: "Talk about in your expert group", ord: "Key words", skjema: "Teach-back sheet",
      s1: "The three most important things in my part are:", s2: "A word the others need to understand, and what it means:", s3: "A question I want to ask my home group:", s4: "A drawing, a number or an example that makes it easier to remember:",
      hjem: "Home group", hjemIntro: "Each expert teaches their part (about 3 minutes each). The others write down the most important points.", notat: "What I learned from the expert on", felles: "Shared task", fellesIntro: "Solve the task together. You need knowledge from all the experts.",
      start: "The starting question", tilbake: "Look back: Which part was easiest to understand when another student explained it? Why?" }
  };
  const rentekst = s => String(s).replace(/\*\*(.+?)\*\*/g, "$1").replace(/\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g, "$1");
  const formater = s => esc(s).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, "<strong>$1</strong>");
  const ordI = s => [...String(s).matchAll(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g)].map(m => (m[2] || m[1]).trim());

  // Del avsnittene i n sammenhengende biter med omtrent like mange ord
  function del(avsnitt, n, lett) {
    const tekst = a => (lett && a.lett && a.lett.length ? a.lett : a.tekst) || [];
    const lengde = avsnitt.map(a => tekst(a).join(" ").split(/\s+/).length);
    const total = lengde.reduce((x, y) => x + y, 0);
    const biter = []; let i = 0;
    for (let g = 0; g < n; g++) {
      const bit = []; let sum = 0; const mal = total * (g + 1) / n;
      const forbrukt = biter.reduce((x, b) => x + b.reduce((y, j) => y + lengde[j], 0), 0);
      while (i < avsnitt.length && (avsnitt.length - i > n - g - 1) && (!bit.length || forbrukt + sum + lengde[i] / 2 <= mal)) { bit.push(i); sum += lengde[i]; i++; }
      biter.push(bit);
    }
    while (i < avsnitt.length) biter[n - 1].push(i++);
    return biter.map(b => b.map(j => Object.assign({}, avsnitt[j], { brukTekst: tekst(avsnitt[j]), nr: j })));
  }

  const temaValg = valgt => '<select id="eg-tema" required><option value="">Velg et tema …</option>' +
    [["samfunnsfag", "Samfunnsfag"], ["engelsk", "Engelsk"]].map(([f, n]) => '<optgroup label="' + n + '">' + LV.temaer.filter(t => t.fag === f).sort((a, b) => a.trinn - b.trinn || a.tittel.localeCompare(b.tittel, "nb")).map(t => '<option value="' + t.id + '"' + (t.id === valgt ? " selected" : "") + ">" + t.trinn + ". – " + esc(t.tittel) + "</option>").join("") + "</optgroup>").join("") + "</select>";

  function start() {
    $("innhold").innerHTML = '<nav class="brodsmuler" aria-label="Brødsmuler"><a href="index.html">Forside</a> › <a href="lesestrategier.html">Lese og skrive</a> › Ekspertgrupper</nav>' +
      '<header class="sidehode"><p class="overlinje">Lese sammen · for hele klassen</p><h1>🧩 Ekspertgrupper</h1><p class="ingress">Del et tema i biter. Hver elev blir ekspert på én del og lærer den bort til de andre i gruppa. Alle trengs – og alle må forstå sin del godt nok til å forklare den.</p></header>' +
      '<form class="eg-start" id="eg-skjema"><div><label for="eg-tema">Tema</label>' + temaValg(LV.param("tema") || "") + '</div>' +
      '<div><label for="eg-n">Antall ekspertgrupper (= elever i hver hjemmegruppe)</label><select id="eg-n"><option>3</option><option selected>4</option><option>5</option></select></div>' +
      '<label class="eg-lett"><input type="checkbox" id="eg-lett"> Bruk den lettere teksten der den finnes</label>' +
      '<p><button type="submit" class="knapp hoved">Lag ekspertgrupper →</button></p></form>' +
      '<section class="eg-gang"><h2>Slik gjør dere</h2><ol class="eg-steg">' +
      "<li><strong>Hjemmegrupper (2 min).</strong> Del klassen i grupper med like mange elever som det er ekspertdeler. Hver elev får en bokstav: A, B, C …</li>" +
      "<li><strong>Ekspertgrupper (15–20 min).</strong> Alle A-er sitter sammen, alle B-er sammen osv. Les delen, snakk om spørsmålene og fyll ut lær bort-skjemaet hver for dere.</li>" +
      "<li><strong>Tilbake til hjemmegruppa (15 min).</strong> Hver ekspert lærer bort sin del på ca. 3 minutter. De andre noterer på hjemmegruppe-arket.</li>" +
      "<li><strong>Felles oppgave (10 min).</strong> Hjemmegruppa løser en oppgave som krever kunnskap fra alle delene.</li></ol>" +
      '<p class="mu-intro">For læreren: Metoden kalles «jigsaw» (puslespill). Den virker best når ekspertene har nok tid til å forstå delen sin, og når lær bort-skjemaet er ferdig før de går tilbake. Fordel gjerne de lengste delene til de sterkeste leserne, eller bruk den lettere teksten.</p>' +
      '<p class="fo-merk">Se også: <a href="lesegruppe.html">Lesegrupper</a> · <a href="sporsmal.html">Spørsmålsstudioet</a> · <a href="tenkerutiner.html">Tenkerutiner</a> · <a href="lesestrategier.html">Lesestrategier</a></p></section>';
    $("eg-skjema").addEventListener("submit", e => {
      e.preventDefault(); if (!$("eg-tema").value) { $("eg-tema").focus(); return; }
      const q = new URLSearchParams({ tema: $("eg-tema").value, grupper: $("eg-n").value }); if ($("eg-lett").checked) q.set("lett", "1");
      location.href = "ekspertgrupper.html?" + q;
    });
  }

  function svarlinje() {
    const linje = document.createElement("div");
    linje.className = "svarlinje";
    linje.innerHTML = '<div class="svarlinje-indre"><label class="skjult-visuelt" for="elevnavn">Navn</label><input id="elevnavn" type="text" placeholder="Navn" autocomplete="off"><span class="status" role="status" aria-live="polite"></span></div>';
    document.body.appendChild(linje);
  }

  async function okt(id) {
    try { await LV.lastSkript("data/temaer/" + encodeURIComponent(id) + ".js"); } catch (e) { $("innhold").innerHTML = '<p class="melding">Fant ikke temaet.</p>'; return; }
    const tema = LV.tema;
    const sp = tema.sprak === "en" ? "en" : "nb", t = T[sp];
    const n = Math.max(3, Math.min(5, +LV.param("grupper") || 4, tema.avsnitt.length));
    const lett = LV.param("lett") === "1";
    const biter = del(tema.avsnitt, n, lett);
    const ep = (LV.param("ekspert") || "").toUpperCase(), ekspert = ep.length === 1 ? BOKST.indexOf(ep) : -1;
    const hjem = LV.param("hjem") === "1";
    const lenke = extra => { const q = new URLSearchParams({ tema: tema.id, grupper: n }); if (lett) q.set("lett", "1"); Object.keys(extra || {}).forEach(k => q.set(k, extra[k])); return "ekspertgrupper.html?" + q; };
    const navn = (b, i) => b.map(a => a.tittel).join(" · ");
    const lang = sp === "en" ? ' lang="en"' : "";
    document.title = "Ekspertgrupper: " + tema.tittel + " – " + (LV.config ? LV.config.navn : "Les verden");

    const kort = (b, i, medSkjema) => {
      const ord = [...new Set(b.flatMap(a => a.brukTekst.flatMap(ordI)))].filter(o => tema.ord && (tema.ord[o] || tema.ord[o.toLowerCase()])).slice(0, 6);
      const sporsmal = b.map(a => a.stoppOgTenk).filter(Boolean).flat();
      return '<article class="eg-kort" style="--eg:' + FARGE[i] + '"' + lang + '><p class="eg-merke"><span class="eg-bokstav" aria-hidden="true">' + BOKST[i] + "</span> " + t.ekspert + " " + BOKST[i] + "</p>" +
        "<h2>" + esc(navn(b, i)) + "</h2>" +
        b.map(a => '<section class="eg-tekst"><h3>' + esc(a.tittel) + "</h3>" + a.brukTekst.map(p => "<p>" + formater(p) + "</p>").join("") + "</section>").join("") +
        (ord.length ? '<div class="eg-ord"><h3>' + t.ord + "</h3><dl>" + ord.map(o => "<div><dt>" + esc(o) + "</dt><dd>" + esc(tema.ord[o] || tema.ord[o.toLowerCase()]) + "</dd></div>").join("") + "</dl></div>" : "") +
        (sporsmal.length ? '<div class="eg-snakk"><h3>' + t.sporsmal + "</h3><ul>" + sporsmal.map(s => "<li>" + esc(rentekst(s)) + "</li>").join("") + "</ul></div>" : "") +
        (medSkjema ? '<div class="eg-skjema"><h3>✍️ ' + t.skjema + "</h3>" +
          [t.s1, t.s2, t.s3, t.s4].map((s, j) => '<label for="eg-s' + j + '">' + s + '</label><textarea id="eg-s' + j + '" rows="' + (j ? 2 : 4) + '"></textarea>').join("") + "</div>" :
          '<div class="eg-skjema eg-papir"><h3>✍️ ' + t.skjema + "</h3>" + [t.s1, t.s2, t.s3, t.s4].map((s, j) => "<p>" + s + '</p><div class="eg-linjer" style="--l:' + (j ? 2 : 4) + '"></div>').join("") + "</div>") +
        "</article>";
    };

    const felles = () => {
      const d = tema.oppgaver && (tema.oppgaver[2] || tema.oppgaver[3] || {}).diskuter;
      const oppg = d && d.length ? (typeof d[0] === "string" ? d[0] : d[0].tekst) : "";
      return '<section class="eg-felles"' + lang + "><h2>🧩 " + t.felles + '</h2><p class="mu-intro">' + t.fellesIntro + "</p>" +
        '<p class="eg-oppg"><strong>' + t.start + ":</strong> " + esc(tema.startsporsmal || "") + "</p>" + (oppg ? '<p class="eg-oppg">' + esc(rentekst(oppg)) + "</p>" : "") + "</section>";
    };
    const hjemArk = medFelt => '<section class="eg-hjem"' + lang + "><h2>🏠 " + t.hjem + ": " + esc(tema.tittel) + '</h2><p class="mu-intro">' + t.hjemIntro + "</p>" +
      biter.map((b, i) => '<div class="eg-hjemrad" style="--eg:' + FARGE[i] + '"><' + (medFelt ? 'label for="eg-h' + i + '"' : "p") + '><span class="eg-bokstav" aria-hidden="true">' + BOKST[i] + "</span> " + t.notat + " <strong>" + esc(navn(b, i)) + "</strong></" + (medFelt ? "label" : "p") + ">" +
        (medFelt ? '<textarea id="eg-h' + i + '" rows="3"></textarea>' : '<div class="eg-linjer" style="--l:3"></div>') + "</div>").join("") +
      felles().replace('<section class="eg-felles"' + lang + ">", '<div class="eg-felles">').replace(/<\/section>$/, "") + (medFelt ? '<label for="eg-svar">✍️</label><textarea id="eg-svar" rows="6"></textarea><label for="eg-tilbake">' + t.tilbake + '</label><textarea id="eg-tilbake" rows="2"></textarea>' : '<div class="eg-linjer" style="--l:8"></div><p>' + t.tilbake + '</p><div class="eg-linjer" style="--l:2"></div>') + "</div></section>";

    const topp = '<nav class="brodsmuler" aria-label="Brødsmuler"><a href="index.html">Forside</a> › <a href="ekspertgrupper.html">Ekspertgrupper</a> › ' + esc(tema.tittel) + "</nav>";
    if (ekspert >= 0 && ekspert < n) {
      $("innhold").innerHTML = topp + '<header class="sidehode"><p class="overlinje">🧩 Ekspertgrupper · ' + esc(tema.tittel) + "</p><h1" + lang + ">" + t.ekspert + " " + BOKST[ekspert] + "</h1></header>" + kort(biter[ekspert], ekspert, true).replace(/<h2>/, '<h2 class="eg-deltittel">') +
        '<p class="eg-videre"><a class="knapp" href="' + lenke({ hjem: 1 }) + '">🏠 ' + t.hjem + " →</a></p>";
      svarlinje(); return;
    }
    if (hjem) {
      $("innhold").innerHTML = topp + '<header class="sidehode"><p class="overlinje">🧩 Ekspertgrupper</p><h1' + lang + ">" + t.hjem + "</h1></header>" + hjemArk(true).replace(/<h2>🏠 [^<]*<\/h2>/, "");
      svarlinje(); return;
    }
    // Lærerens oversikt
    $("innhold").innerHTML = topp + '<header class="sidehode"><p class="overlinje">🧩 Ekspertgrupper</p><h1>' + esc(tema.tittel) + '</h1><p class="ingress">' + n + " ekspertdeler" + (lett ? " · lettere tekst" : "") + '. Del ut lenkene eller skriv ut kortene.</p></header>' +
      '<div class="eg-verktoy"><label for="eg-n2">Antall deler</label><select id="eg-n2">' + [3, 4, 5].filter(x => x <= tema.avsnitt.length).map(x => "<option" + (x === n ? " selected" : "") + ">" + x + "</option>").join("") + "</select>" +
      '<label class="eg-lett"><input type="checkbox" id="eg-lett2"' + (lett ? " checked" : "") + "> Lettere tekst</label>" +
      '<button type="button" class="knapp hoved" id="eg-skriv">🖨️ Skriv ut kort og ark</button> <a class="knapp" href="tema.html?id=' + encodeURIComponent(tema.id) + '">📖 Temasiden</a></div>' +
      '<ol class="eg-oversikt">' + biter.map((b, i) => '<li style="--eg:' + FARGE[i] + '"><span class="eg-bokstav" aria-hidden="true">' + BOKST[i] + '</span><div><strong>' + t.ekspert + " " + BOKST[i] + "</strong>: " + esc(navn(b, i)) +
        ' <span class="eg-ordtall">(ca. ' + b.reduce((x, a) => x + a.brukTekst.join(" ").split(/\s+/).length, 0) + ' ord)</span><br><a href="' + lenke({ ekspert: BOKST[i] }) + '">Elevens side for ' + t.ekspert + " " + BOKST[i] + " →</a></div></li>").join("") +
        '<li class="eg-hjemlenke"><span class="eg-bokstav" aria-hidden="true">🏠</span><div><strong>' + t.hjem + '</strong>: notater og felles oppgave<br><a href="' + lenke({ hjem: 1 }) + '">Hjemmegruppas side →</a></div></li></ol>' +
      '<div class="eg-utskrift">' + biter.map((b, i) => kort(b, i, false)).join("") + hjemArk(false) + "</div>";
    const nytt = () => { location.href = (() => { const q = new URLSearchParams({ tema: tema.id, grupper: $("eg-n2").value }); if ($("eg-lett2").checked) q.set("lett", "1"); return "ekspertgrupper.html?" + q; })(); };
    $("eg-n2").addEventListener("change", nytt); $("eg-lett2").addEventListener("change", nytt);
    $("eg-skriv").addEventListener("click", () => window.print());
  }

  document.addEventListener("DOMContentLoaded", () => {
    const id = LV.param("tema");
    if (id && LV.temaer.find(t => t.id === id)) okt(id); else start();
  });
})();
