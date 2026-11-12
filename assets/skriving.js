/* =========================================================
   Les verden – Skriveverksted / How to write
   skriving.html            → oversikt over guidene
   skriving.html?id=<id>    → én guide (data/skriving/<id>.js)
   Hver guide: hva teksten er, forarbeid, oppbygging med setningsstartere
   og eksempler, språktips, modelltekst, sjekkliste, vurdering og skriveramme.
   Ingenting lagres – eleven kopierer teksten sin.
   ========================================================= */
(function () {
  const LV = window.LV;
  const $ = id => document.getElementById(id);
  const esc = s => LV.esc(String(s == null ? "" : s));
  const fmt = s => esc(s).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\*(.+?)\*/g, "<em>$1</em>").replace(/\n/g, "<br>");
  const navn = () => (LV.config ? LV.config.navn : "Les verden");

  const T = {
    en: { hva: "What is it?", fakta: "Quick facts", for: "Before you write", oppbygging: "The structure", del: "Part", tips: "Tips", startere: "Sentence starters", eks: "Example", sprak: "Language tips", bindeord: "Linking words and phrases",
      modell: "Model text", visDeler: "Show the parts", visKomm: "💬 Show comments", komm: "Comment", sjekk: "Checklist", sjekkTekst: "Tick off when you have checked your text. (Nothing is saved.)", vurdering: "Assessment", lav: "Low", middels: "Medium", hoy: "High",
      ramme: "Writing frame", rammeTekst: "Write your text part by part. Click a sentence starter to add it to the box. Copy your text when you are finished – nothing is saved.", tittel: "Title", ord: "words", annen: "På norsk:", alle: "All writing guides", kopier: "Copy my text", slett: "Delete my text", kopiert: "Your text has been copied! Paste it into a document.", tom: "You have not written anything yet.", sikker: "Do you want to delete your text?", slettet: "Your text has been deleted." },
    nb: { hva: "Hva er det?", fakta: "Kort fortalt", for: "Før du skriver", oppbygging: "Oppbygging", del: "Del", tips: "Tips", startere: "Setningsstartere", eks: "Eksempel", sprak: "Språktips", bindeord: "Bindeord og overganger",
      modell: "Eksempeltekst", visDeler: "Vis delene", visKomm: "💬 Vis kommentarer", komm: "Kommentar", sjekk: "Sjekkliste", sjekkTekst: "Kryss av når du har sjekket teksten din. (Ingenting lagres.)", vurdering: "Vurdering", lav: "Lav", middels: "Middels", hoy: "Høy",
      ramme: "Skriveramme", rammeTekst: "Skriv teksten din del for del. Trykk på en setningsstarter for å sette den inn i feltet. Kopier teksten når du er ferdig – ingenting lagres.", tittel: "Tittel", ord: "ord", annen: "In English:", alle: "Alle skriveguidene", kopier: "Kopier teksten min", slett: "Slett teksten", kopiert: "Teksten er kopiert! Lim den inn i et dokument.", tom: "Du har ikke skrevet noe ennå.", sikker: "Vil du slette teksten din?", slettet: "Teksten er slettet." }
  };

  // ---------- Oversikt ----------
  function oversikt() {
    document.title = "Skriveverksted – How to write – " + navn();
    const kort = g => '<li><a class="sk-kort" href="' + (g.lenke || "skriving.html?id=" + g.id) + '"' + (g.sprak === "en" ? ' lang="en"' : "") + ' style="--sk:' + g.farge + '">' +
      '<span class="sk-ikon" aria-hidden="true">' + g.ikon + '</span><span class="sk-kort-tekst"><strong>' + esc(g.tittel) + "</strong><span>" + esc(g.kort) + "</span>" +
      '<span class="sk-merker">' + (g.fag || []).map(f => '<span class="sk-merke">' + esc(f) + "</span>").join("") + "</span></span></a></li>";
    const grupper = [["en", "🇬🇧 How to write in English", "Guides in English for the English subject."], ["nb", "🇳🇴 Skriveguider på norsk", "Guider på norsk – særlig for samfunnsfag."]];
    let h = '<nav class="brodsmuler" aria-label="Brødsmuler"><a href="index.html">Forside</a> › Skriveverksted</nav>' +
      '<header class="sidehode"><p class="overlinje" lang="en">How to …</p><h1>Skriveverksted</h1><p class="ingress">Steg-for-steg-guider for de vanligste teksttypene i engelsk og samfunnsfag. Hver guide forklarer delene i teksten, gir setningsstartere og eksempler, og har en skriveramme der du kan skrive din egen tekst.</p></header>' +
      '<div class="sk-steg-rad" aria-label="Slik bruker du en guide"><span><b>1</b> Les hva teksttypen er</span><span><b>2</b> Se på oppbyggingen og eksempelet</span><span><b>3</b> Skriv i skriverammen</span><span><b>4</b> Sjekk teksten med sjekklista</span></div>';
    grupper.forEach(([sp, tittel, tekst]) => {
      h += '<section class="sk-gruppe" id="' + sp + '"><h2' + (sp === "en" ? ' lang="en"' : "") + ">" + tittel + '</h2><p class="sk-gruppe-tekst">' + tekst + '</p><ul class="sk-kortrad">' + LV.skriveguider.filter(g => g.sprak === sp).map(kort).join("") + "</ul></section>";
    });
    h += '<a class="mu-banner" href="argumentkart.html"><span class="mu-banner-ikon" aria-hidden="true">🗺️</span><span><strong>Argumentkart</strong><span>Bygg argumentasjonen som et kart – påstand, grunner, belegg og innvendinger – og gjør den om til et tekstutkast.</span></span><span aria-hidden="true">→</span></a>';
    h += '<a class="mu-banner" href="oppgaveord.html"><span class="mu-banner-ikon" aria-hidden="true">🎯</span><span><strong>Oppgaveord: les oppgaven først</strong><span>Hva krever «beskriv», «forklar», «drøft» og «vurder»? Ordkort med gode og svake svar, og øvinger.</span></span><span aria-hidden="true">→</span></a>';
    h += '<a class="mu-banner" href="skrivemal.html"><span class="mu-banner-ikon" aria-hidden="true">✍️</span><span><strong>Skrivemaler: skapende skriving</strong><span>Postkort fra fortiden, historisk avisforside, Wanted-plakat, nytt bokomslag og booktrailer-manus – med forhåndsvisning du kan skrive ut.</span></span><span aria-hidden="true">→</span></a>';
    h += '<p class="fo-merk">Tips: Mange av guidene passer sammen med tekstene i <a href="lesing.html" lang="en">Reading Room</a>, filmene på <a href="film.html">filmsiden</a> og forberedelsene i <a href="eksamen.html">eksamenssonen</a>.</p>';
    $("innhold").innerHTML = h;
  }

  // ---------- Én guide ----------
  let tekstfelt = [];
  async function guide(id) {
    const info = LV.skriveguider.find(g => g.id === id && !g.lenke);
    if (!info) { $("innhold").innerHTML = '<p class="melding">Fant ikke guiden. <a href="skriving.html">Til skriveverkstedet</a></p>'; return; }
    LV.skriveguide = null;
    await LV.lastSkript("data/skriving/" + encodeURIComponent(id) + ".js");
    const g = LV.skriveguide, en = info.sprak === "en", t = T[en ? "en" : "nb"];
    document.title = info.tittel + " – Skriveverksted – " + navn();
    const annen = info.par && LV.skriveguider.find(x => x.id === info.par);
    const delId = i => "del-" + i;
    let h = '<nav class="brodsmuler" aria-label="Brødsmuler" lang="nb"><a href="index.html">Forside</a> › <a href="skriving.html">Skriveverksted</a> › <span' + (en ? ' lang="en"' : "") + ">" + esc(info.tittel) + "</span></nav>";
    h += '<div class="sk-side"' + (en ? ' lang="en"' : "") + ' style="--sk:' + info.farge + '">';
    h += '<header class="sk-hode"><span class="sk-hode-ikon" aria-hidden="true">' + info.ikon + '</span><div><p class="overlinje">' + (en ? "Writing guide" : "Skriveguide") + (info.fag ? " · " + info.fag.map(esc).join(" · ") : "") + "</p><h1>" + esc(info.tittel) + '</h1><p class="ingress">' + fmt(g.ingress) + "</p>" +
      (annen ? '<p class="sk-annen" lang="nb">' + t.annen + ' <a href="' + (annen.lenke || "skriving.html?id=" + annen.id) + '">' + esc(annen.tittel) + "</a></p>" : "") + "</div></header>";
    h += '<nav class="land-snarveier" aria-label="Contents"><ul>' + [["hva", t.hva], ["for", t.for], ["oppbygging", t.oppbygging], ["sprak", t.sprak], ["modell", t.modell], ["sjekk", t.sjekk], ["ramme", t.ramme]].map(([a, b]) => '<li><a href="#sk-' + a + '">' + b + "</a></li>").join("") + "</ul></nav>";

    // Hva er det?
    h += '<section id="sk-hva" class="sk-del"><h2>' + t.hva + '</h2><div class="sk-hva">' + '<div class="sk-hva-tekst">' + g.hva.map(p => "<p>" + fmt(p) + "</p>").join("") + "</div>" +
      (g.fakta ? '<div class="sk-fakta"><p class="sk-fakta-tittel">' + t.fakta + '</p><dl class="sk-fakta-liste">' + g.fakta.map(([k, v]) => "<div><dt>" + esc(k) + "</dt><dd>" + fmt(v) + "</dd></div>").join("") + "</dl></div>" : "") + "</div></section>";

    // Før du skriver
    h += '<section id="sk-for" class="sk-del"><h2>' + t.for + '</h2><ol class="sk-forarbeid">' + g.forarbeid.map(s => "<li>" + fmt(s) + "</li>").join("") + "</ol></section>";

    // Oppbygging: blåkopi + del-kort
    h += '<section id="sk-oppbygging" class="sk-del"><h2>' + t.oppbygging + "</h2>" + (g.oppbyggingTekst ? "<p>" + fmt(g.oppbyggingTekst) + "</p>" : "") +
      '<ol class="sk-blaakopi">' + g.deler.map((d, i) => '<li style="--h:' + (d.storrelse || 1) + '"><a href="#' + delId(i) + '"><span class="sk-bk-navn">' + esc(d.navn) + '</span><span class="sk-bk-kort">' + esc(d.kort) + "</span></a></li>").join("") + "</ol>" +
      '<div class="sk-delkort-rad">' + g.deler.map((d, i) => '<article class="sk-delkort" id="' + delId(i) + '"><header><span class="sk-delnr">' + (i + 1) + "</span><h3>" + esc(d.navn) + "</h3></header>" +
        d.hva.map(p => "<p>" + fmt(p) + "</p>").join("") +
        (d.tips ? "<h4>" + t.tips + '</h4><ul class="sk-tips">' + d.tips.map(x => "<li>" + fmt(x) + "</li>").join("") + "</ul>" : "") +
        (d.startere ? "<h4>" + t.startere + '</h4><ul class="sk-startere">' + d.startere.map(x => "<li>" + esc(x) + "</li>").join("") + "</ul>" : "") +
        (d.eksempel ? '<div class="sk-mini"><span class="sk-mini-etikett">' + t.eks + "</span><p>" + fmt(d.eksempel) + "</p></div>" : "") + "</article>").join("") + "</div></section>";

    // Språk
    h += '<section id="sk-sprak" class="sk-del"><h2>' + t.sprak + '</h2><ul class="sk-tips sk-spraktips">' + g.sprak.map(x => "<li>" + fmt(x) + "</li>").join("") + "</ul>" +
      (g.bindeord ? "<h3>" + t.bindeord + '</h3><div class="sk-bindeord">' + g.bindeord.map(b => '<div class="sk-bo"><h4>' + esc(b.tittel) + "</h4><p>" + b.liste.map(esc).join(" · ") + "</p></div>").join("") + "</div>" : "") +
      (g.ordliste ? '<div class="gr-tabell-rull" tabindex="0" role="region" aria-label="' + t.sprak + '"><table class="fo-ordtabell"><tbody>' + g.ordliste.map(([a, b]) => "<tr><td><strong>" + esc(a) + '</strong></td><td lang="nb">' + esc(b) + "</td></tr>").join("") + "</tbody></table></div>" : "") + "</section>";

    // Modelltekst
    h += '<section id="sk-modell" class="sk-del"><h2>' + t.modell + '</h2><p><label class="sk-bryter"><input type="checkbox" id="vis-deler" checked> ' + t.visDeler + "</label>" + (g.eksempel.tekst.some(p => p.m) ? ' <label class="sk-bryter"><input type="checkbox" id="vis-komm" checked> ' + t.visKomm + "</label>" : "") + "</p>" +
      '<article class="sk-modell vis-deler vis-komm" id="modelltekst">' + (g.eksempel.tittel ? "<h3>" + esc(g.eksempel.tittel) + "</h3>" : "") +
      g.eksempel.tekst.map(p => '<div class="sk-mdel"' + (p.del != null ? ' data-del="' + p.del + '"' : "") + ">" + (p.del != null ? '<span class="sk-metikett">' + esc(g.deler[p.del].navn) + "</span>" : "") + "<p>" + fmt(p.t) + "</p>" + (p.m ? '<div class="sk-marg"><span class="skjult-visuelt">' + t.komm + ': </span>' + fmt(p.m) + "</div>" : "") + "</div>").join("") +
      (g.eksempel.kommentar ? '<p class="sk-kommentar">💡 ' + fmt(g.eksempel.kommentar) + "</p>" : "") + "</article></section>";

    // Sjekkliste
    h += '<section id="sk-sjekk" class="sk-del"><h2>' + t.sjekk + '</h2><p class="sk-liten">' + t.sjekkTekst + '</p><ul class="fo-sjekk sk-sjekk">' + g.sjekkliste.map(x => '<li><label><input type="checkbox"> ' + fmt(x) + "</label></li>").join("") + "</ul></section>";

    // Vurdering
    if (g.vurdering) h += '<section class="sk-del"><h2>' + t.vurdering + '</h2><div class="gr-tabell-rull" tabindex="0" role="region" aria-label="' + t.vurdering + '"><table class="fo-vurdering"><thead><tr><td></td><th scope="col">' + t.lav + '</th><th scope="col">' + t.middels + '</th><th scope="col">' + t.hoy + "</th></tr></thead><tbody>" +
      g.vurdering.map(r => '<tr><th scope="row">' + esc(r[0]) + "</th>" + r.slice(1).map(c => "<td>" + esc(c) + "</td>").join("") + "</tr>").join("") + "</tbody></table></div></section>";

    // Skriveramme
    tekstfelt = [];
    h += '<section id="sk-ramme" class="sk-del sk-ramme"><h2>✍️ ' + t.ramme + '</h2><p class="sk-liten">' + t.rammeTekst + "</p>" +
      '<p><label for="sk-tittel"><strong>' + t.tittel + '</strong></label><input id="sk-tittel" class="sk-tittel" type="text" autocomplete="off"></p>' +
      g.deler.filter(d => !d.utenRamme).map((d, i) => {
        const id = "sk-felt-" + i; tekstfelt.push({ id: id, navn: d.navn });
        return '<div class="sk-rammedel"><h3><span class="sk-delnr">' + (g.deler.indexOf(d) + 1) + "</span>" + esc(d.navn) + "</h3>" + (d.ramme ? '<p class="sk-liten">' + fmt(d.ramme) + "</p>" : "") +
          (d.startere ? '<div class="sk-chips" role="group" aria-label="' + t.startere + '">' + d.startere.map(s => '<button type="button" class="sk-chip" data-felt="' + id + '">' + esc(s) + "</button>").join("") + "</div>" : "") +
          '<label class="skjult-visuelt" for="' + id + '">' + esc(d.navn) + '</label><textarea id="' + id + '" class="svar sk-felt" rows="' + (d.storrelse > 1 ? 7 : 4) + '"></textarea><p class="sk-teller" data-teller="' + id + '">0 ' + t.ord + "</p></div>";
      }).join("") + '<p class="sk-total" id="sk-total" aria-live="polite"></p></section>';
    h += '<p><a href="skriving.html">← ' + t.alle + "</a></p></div>";
    $("innhold").innerHTML = h;

    // Interaksjon
    $("vis-deler").addEventListener("change", e => $("modelltekst").classList.toggle("vis-deler", e.target.checked));
    if ($("vis-komm")) $("vis-komm").addEventListener("change", e => $("modelltekst").classList.toggle("vis-komm", e.target.checked));
    const tell = s => (s.trim().match(/\S+/g) || []).length;
    const oppdater = () => {
      let sum = 0;
      tekstfelt.forEach(f => { const n = tell($(f.id).value); sum += n; document.querySelector('[data-teller="' + f.id + '"]').textContent = n + " " + t.ord; });
      $("sk-total").textContent = (en ? "Total: " : "Totalt: ") + sum + " " + t.ord;
    };
    document.querySelectorAll(".sk-chip").forEach(b => b.addEventListener("click", () => {
      const felt = $(b.dataset.felt), tekst = b.textContent.replace(/…$/, "").trimEnd();
      const før = felt.value.slice(0, felt.selectionStart), etter = felt.value.slice(felt.selectionEnd);
      const mellom = før && !/\s$/.test(før) ? " " : "";
      felt.value = før + mellom + tekst + " " + etter;
      const pos = (før + mellom + tekst + " ").length;
      felt.focus(); felt.setSelectionRange(pos, pos); endret = true; oppdater();
    }));
    document.addEventListener("input", e => { if (e.target.matches && e.target.matches(".sk-felt, #sk-tittel")) { endret = true; oppdater(); $("status") && ($("status").textContent = ""); } });
    oppdater(); oppdaterFn = oppdater;
    svarlinje(t, info.tittel);
  }

  let endret = false, oppdaterFn = null;
  function svarlinje(t, guidetittel) {
    const linje = document.createElement("div");
    linje.className = "svarlinje";
    linje.innerHTML = '<div class="svarlinje-indre" lang="nb"><label class="skjult-visuelt" for="elevnavn">Navn</label><input id="elevnavn" type="text" placeholder="Navn" autocomplete="off">' +
      '<button class="knapp hoved" id="kopier">' + t.kopier + '</button><button class="knapp fare" id="slett">' + t.slett + '</button><span class="status" id="status" role="status" aria-live="polite"></span></div>';
    document.body.appendChild(linje);
    $("kopier").addEventListener("click", () => {
      const deler = tekstfelt.map(f => [f.navn, $(f.id).value.trim()]).filter(x => x[1]);
      const tittel = $("sk-tittel").value.trim();
      if (!deler.length && !tittel) { $("status").textContent = t.tom; return; }
      const n = $("elevnavn").value.trim();
      const tekst = (n ? n + "\n" : "") + guidetittel + " – " + new Date().toLocaleDateString("nb-NO") + "\n\n" + (tittel ? tittel + "\n\n" : "") + deler.map(x => x[1]).join("\n\n") + "\n";
      const ok = () => { endret = false; $("status").textContent = t.kopiert; };
      const reserve = () => { const x = document.createElement("textarea"); x.value = tekst; document.body.appendChild(x); x.select(); let lyktes = false; try { lyktes = document.execCommand("copy"); } catch (e) { lyktes = false; } x.remove(); if (lyktes) ok(); else window.prompt("Ctrl+C / Cmd+C", tekst); };
      if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(tekst).then(ok, reserve); else reserve();
    });
    $("slett").addEventListener("click", () => { if (!confirm(t.sikker)) return; tekstfelt.forEach(f => { $(f.id).value = ""; }); $("sk-tittel").value = ""; endret = false; $("status").textContent = t.slettet; if (oppdaterFn) oppdaterFn(); });
    window.addEventListener("beforeunload", e => { if (!endret) return; e.preventDefault(); e.returnValue = ""; });
  }

  document.addEventListener("DOMContentLoaded", function () {
    const id = LV.param("id");
    if (id) guide(id); else oversikt();
  });
})();
