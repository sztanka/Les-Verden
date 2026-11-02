/* =========================================================
   Les verden – Film i undervisningen
   film.html                 → oversikt over filmene
   film.html?id=<id>         → én film (data/film/<id>.js)
   film.html?guide=review    → How to write a movie review
   film.html?guide=anmeldelse→ Hvordan skrive en filmanmeldelse
   &laerer=1                 → viser fasit og lærerkontroll
   Traileren lastes først når eleven trykker på den (youtube-nocookie.com). Ingenting lagres.
   ========================================================= */
(function () {
  const LV = window.LV;
  const $ = id => document.getElementById(id);
  const esc = s => LV.esc(String(s == null ? "" : s));
  const fmt = s => esc(s).replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>").replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\*(.+?)\*/g, "<em>$1</em>");
  const laerer = LV.param("laerer") === "1";

  const T = {
    nb: { fakta: "Fakta om filmen", trailer: "Trailer", spill: "▶ Spill av traileren", personvern: "Traileren hentes fra YouTube først når du trykker. Da kan YouTube registrere besøket.", sok: "Søk etter traileren på YouTube ↗",
      handler: "Hva handler filmen om?", spoiler: "Hele handlingen – inneholder spoilere!", sporsmal: "Faktaspørsmål", diskusjon: "Diskusjon", refleksjon: "Refleksjon", fordypning: "Fordypning",
      sporsmalTekst: "Svar med hele setninger.", diskusjonTekst: "Snakk sammen to og to eller i grupper. Skriv ned de viktigste argumentene.", refleksjonTekst: "Tenk over og skriv om dine egne tanker og erfaringer.", fordypningTekst: "Velg én eller flere oppgaver. Bruk gode kilder.",
      svar: "Ditt svar", temaer: "Les mer om temaet", land: "Landsider", anmeld: "Skriv en anmeldelse", andre: "Andre filmer", kopier: "Kopier mine svar", slett: "Slett alle svar", navn: "Navn", kopiert: "Svarene er kopiert! Lim dem inn i et dokument.", slettet: "Svarene er slettet.", sikker: "Vil du slette alle svarene?",
      laerer: "For læreren", innhold: "Innhold og alder", fasit: "Fasit", kontroll: "Lærerkontroll", tilbake: "Alle filmene" },
    en: { fakta: "Facts about the film", trailer: "Trailer", spill: "▶ Play the trailer", personvern: "The trailer is loaded from YouTube only when you press play. YouTube may then register the visit.", sok: "Search for the trailer on YouTube ↗",
      handler: "What is the film about?", spoiler: "The whole story – contains spoilers!", sporsmal: "Questions about the film", diskusjon: "Discussion", refleksjon: "Reflection", fordypning: "Going further",
      sporsmalTekst: "Answer in full sentences.", diskusjonTekst: "Talk in pairs or groups. Write down the most important arguments.", refleksjonTekst: "Think about and write down your own thoughts and experiences.", fordypningTekst: "Choose one or more tasks. Use reliable sources.",
      svar: "Your answer", temaer: "Read more about the topic", land: "Country pages", anmeld: "Write a review", andre: "Other films", kopier: "Copy my answers", slett: "Delete all answers", navn: "Name", kopiert: "Your answers have been copied! Paste them into a document.", slettet: "Your answers have been deleted.", sikker: "Do you want to delete all your answers?",
      laerer: "For the teacher", innhold: "Content and age", fasit: "Answers", kontroll: "Teacher check", tilbake: "All films" }
  };

  // Et eget, tegnet «filmomslag» (ingen bilder med opphavsrett)
  function omslag(f, stor) {
    if (f.omslag) return '<span class="fo-omslag bilde' + (stor ? " stor" : "") + '"><img src="' + esc(f.omslag) + '" alt="" loading="lazy"></span>';
    const [a, b] = f.farger || ["#222", "#555"];
    return '<span class="fo-omslag stil-' + esc(f.stil || "klassisk") + (stor ? " stor" : "") + '" style="--a:' + a + ";--b:" + b + '" aria-hidden="true">' +
      '<span class="fo-ikon">' + f.ikon + '</span><span class="fo-tittel">' + esc(f.tittel) + '</span><span class="fo-ar">' + f.ar + "</span>" +
      (f.tagline ? '<span class="fo-tagline">' + esc(f.tagline) + "</span>" : "") + "</span>";
  }
  const fagMerke = f => f.fag.map(x => '<span class="fo-fag fag-' + x + '">' + (x === "engelsk" ? "Engelsk" : "Samfunnsfag") + "</span>").join("");

  // ---------- Oversikt ----------
  function oversikt() {
    document.title = "Film i undervisningen – " + (LV.config ? LV.config.navn : "Les verden");
    const tags = [...new Set(LV.filmer.flatMap(f => f.tags))].sort((a, b) => a.localeCompare(b, "nb"));
    let fag = LV.param("fag") || "", tag = LV.param("tag") || "";
    $("innhold").innerHTML = '<nav class="brodsmuler" aria-label="Brødsmuler"><a href="index.html">Forside</a> › Film</nav>' +
      '<header class="sidehode"><h1>Film i undervisningen</h1><p class="ingress">Spillefilmer som passer til temaene på siden – med trailer, sammendrag, bakgrunn, spørsmål, diskusjon, refleksjon og fordypning. Trykk på et filmomslag for å åpne filmen.</p></header>' +
      '<section class="fo-guider" aria-label="Skriveguider">' + LV.filmGuider.map(g => '<a class="fo-guide" href="film.html?guide=' + g.id + '"' + (g.sprak === "en" ? ' lang="en"' : "") + '><span class="fo-guide-ikon" aria-hidden="true">' + g.ikon + "</span><span><strong>" + esc(g.tittel) + "</strong><span>" + esc(g.kort) + "</span></span></a>").join("") + "</section>" +
      '<div class="fo-filter" role="group" aria-label="Filtrer filmene"><div class="fo-filter-rad"><span class="etikett">Fag:</span>' +
      [["", "Alle"], ["engelsk", "Engelsk"], ["samfunnsfag", "Samfunnsfag"]].map(([v, t]) => '<button class="knapp liten" data-fag="' + v + '">' + t + "</button>").join("") + '</div><div class="fo-filter-rad"><span class="etikett">Tema:</span>' +
      '<button class="knapp liten" data-tag="">Alle</button>' + tags.map(t => '<button class="knapp liten" data-tag="' + esc(t) + '">' + esc(t) + "</button>").join("") + "</div></div>" +
      '<p class="fo-antall" id="fo-antall" aria-live="polite"></p><ul class="fo-hylle" id="fo-hylle"></ul>' +
      '<p class="fo-merk">Aldersgrenser: Flere av filmene har høy aldersgrense eller sterke scener. Under «For læreren» på hver film står det hva filmen inneholder. Sjekk alltid aldersgrensen og vurder om filmen passer for klassen før visning.</p>';
    function tegn() {
      document.querySelectorAll("[data-fag]").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.fag === fag)));
      document.querySelectorAll("[data-tag]").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.tag === tag)));
      const liste = LV.filmer.filter(f => (!fag || f.fag.includes(fag)) && (!tag || f.tags.includes(tag)));
      $("fo-antall").textContent = liste.length + (liste.length === 1 ? " film" : " filmer");
      $("fo-hylle").innerHTML = liste.map(f => '<li><a class="fo-kort" href="film.html?id=' + f.id + '">' + omslag(f) +
        '<span class="fo-kort-tekst"' + (f.sprak === "en" ? ' lang="en"' : "") + "><strong>" + esc(f.tittel) + " (" + f.ar + ")</strong><span>" + esc(f.kort) + '</span><span class="fo-merker">' + fagMerke(f) +
        f.tags.map(t => '<span class="fo-tag">' + esc(t) + "</span>").join("") + "</span></span></a></li>").join("");
      const p = new URLSearchParams(); if (fag) p.set("fag", fag); if (tag) p.set("tag", tag);
      history.replaceState(null, "", "film.html" + (p.toString() ? "?" + p : ""));
    }
    document.querySelectorAll("[data-fag]").forEach(b => b.addEventListener("click", () => { fag = b.dataset.fag; tegn(); }));
    document.querySelectorAll("[data-tag]").forEach(b => b.addEventListener("click", () => { tag = b.dataset.tag; tegn(); }));
    tegn();
  }

  // ---------- Svar ----------
  let svarListe = [];
  function svarfelt(id, sporsmal, etikett) {
    svarListe.push({ id: id, sporsmal: sporsmal });
    return '<label class="skjult-visuelt" for="svar-' + id + '">' + esc(etikett) + '</label><textarea id="svar-' + id + '" class="svar" rows="3" placeholder="' + esc(etikett) + ' …"></textarea>';
  }
  function svarlinje(t, tittel, ekstra) {
    const linje = document.createElement("div");
    linje.className = "svarlinje";
    linje.innerHTML = '<div class="svarlinje-indre"><label class="skjult-visuelt" for="elevnavn">' + t.navn + '</label><input id="elevnavn" type="text" placeholder="' + t.navn + '" autocomplete="off">' +
      '<button class="knapp hoved" id="kopier">' + t.kopier + '</button><button class="knapp fare" id="slett">' + t.slett + '</button><span class="status" id="status" role="status" aria-live="polite"></span></div>';
    document.body.appendChild(linje);
    $("kopier").addEventListener("click", () => {
      const navn = $("elevnavn").value.trim();
      const tekst = tittel + (navn ? "\n" + navn : "") + "\n" + new Date().toLocaleDateString("nb-NO") + "\n" + (ekstra ? ekstra() : "") + "\n" +
        svarListe.map(s => s.sporsmal.replace(/\*/g, "") + "\n" + ($("svar-" + s.id).value.trim() || "–")).join("\n\n") + "\n";
      const ok = () => { $("status").textContent = t.kopiert; };
      if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(tekst).then(ok, reserve); else reserve();
      function reserve() { const x = document.createElement("textarea"); x.value = tekst; document.body.appendChild(x); x.select(); try { document.execCommand("copy"); ok(); } catch (e) { window.prompt("Ctrl+C / Cmd+C", tekst); } x.remove(); }
    });
    $("slett").addEventListener("click", () => { if (!confirm(t.sikker)) return; svarListe.forEach(s => { $("svar-" + s.id).value = ""; }); $("status").textContent = t.slettet; });
  }

  // ---------- Én film ----------
  async function film(id) {
    const f = LV.filmer.find(x => x.id === id);
    if (!f) { $("innhold").innerHTML = '<p class="melding">Fant ikke filmen. <a href="film.html">Til alle filmene</a></p>'; return; }
    LV.film = null;
    await LV.lastSkript("data/film/" + encodeURIComponent(id) + ".js");
    const d = LV.film, t = T[f.sprak === "en" ? "en" : "nb"], en = f.sprak === "en";
    document.title = f.tittel + " (" + f.ar + ") – Film – " + (LV.config ? LV.config.navn : "Les verden");
    const temaer = (f.temaer || []).map(x => LV.temaer.find(y => y.id === x)).filter(Boolean);
    const land = (f.landsider || []).map(x => (LV.landliste || []).find(y => y.id === x)).filter(Boolean);
    const guide = LV.filmGuider.find(g => g.sprak === (en ? "en" : "nb"));
    let h = '<nav class="brodsmuler" aria-label="Brødsmuler" lang="nb"><a href="index.html">Forside</a> › <a href="film.html">Film</a> › ' + esc(f.tittel) + "</nav>" +
      '<div class="fo-topp"' + (en ? ' lang="en"' : "") + ">" + omslag(f, true) + '<div class="fo-topp-tekst"><p class="overlinje">' + f.tags.map(esc).join(" · ") + "</p><h1>" + esc(f.tittel) + ' <span class="fo-h1-ar">(' + f.ar + ")</span></h1>" +
      '<p class="ingress">' + esc(f.kort) + '</p><div class="fo-merker" lang="nb">' + fagMerke(f) + "</div>" +
      '<dl class="faktaboks fo-fakta">' + d.fakta.map(([k, v]) => "<div><dt>" + esc(k) + "</dt><dd>" + fmt(v) + "</dd></div>").join("") + "</dl></div></div>";
    h += '<div class="fo-innhold"' + (en ? ' lang="en"' : "") + ">";
    // Trailer
    h += '<section class="fo-trailer" aria-labelledby="trailer-tittel"><h2 id="trailer-tittel">' + t.trailer + "</h2>" + (f.youtube ?
      '<div class="fo-video" id="fo-video" style="--a:' + f.farger[0] + ";--b:" + f.farger[1] + '"><button class="fo-spill" id="fo-spill" type="button"><span aria-hidden="true">▶</span> ' + t.spill.replace("▶ ", "") + "</button></div><p class=\"fo-personvern\">" + t.personvern + "</p>" :
      '<p><a class="knapp" href="https://www.youtube.com/results?search_query=' + encodeURIComponent(f.tittel + " " + f.ar + " official trailer") + '" target="_blank" rel="noopener">' + t.sok + "</a></p>") + "</section>";
    // Sammendrag
    h += '<section aria-labelledby="om-tittel"><h2 id="om-tittel">' + t.handler + "</h2>" + d.sammendrag.map(p => "<p>" + fmt(p) + "</p>").join("") +
      '<details class="fo-spoiler"><summary>⚠️ ' + t.spoiler + "</summary>" + d.handling.map(p => "<p>" + fmt(p) + "</p>").join("") + "</details></section>";
    if (d.bakgrunn) h += '<section class="fo-bakgrunn" aria-labelledby="bak-tittel"><h2 id="bak-tittel">' + esc(d.bakgrunn.tittel) + "</h2>" + d.bakgrunn.tekst.map(p => "<p>" + fmt(p) + "</p>").join("") + "</section>";
    // Oppgaver
    const blokk = (nokkel, ikon, tittel, tekst, liste, medFasit) => '<section class="fo-oppg fo-' + nokkel + '" aria-labelledby="' + nokkel + '-tittel"><h2 id="' + nokkel + '-tittel"><span aria-hidden="true">' + ikon + "</span> " + tittel + '</h2><p class="fo-oppg-tekst">' + tekst + '</p><ol>' +
      liste.map((x, i) => { const s = typeof x === "string" ? x : x.s; return "<li><p>" + fmt(s) + "</p>" + (medFasit && laerer && x.svar ? '<p class="fo-fasit" lang="nb"><strong>' + t.fasit + ":</strong> " + fmt(x.svar) + "</p>" : "") + svarfelt(nokkel + i, (i + 1) + ". " + s, t.svar) + "</li>"; }).join("") + "</ol></section>";
    h += blokk("sporsmal", "❓", t.sporsmal, t.sporsmalTekst, d.sporsmal, true);
    h += blokk("diskusjon", "💬", t.diskusjon, t.diskusjonTekst, d.diskusjon);
    h += blokk("refleksjon", "🪞", t.refleksjon, t.refleksjonTekst, d.refleksjon);
    h += blokk("fordypning", "🔎", t.fordypning, t.fordypningTekst, d.fordypning);
    h += "</div>";
    // Koblinger
    if (temaer.length) h += '<section lang="nb"><h2>' + (en ? "Read more about the topic" : "Les mer om temaet") + '</h2><ul class="temaliste">' + temaer.map(x => '<li><a class="temakort fag-' + x.fag + '" href="tema.html?id=' + encodeURIComponent(x.id) + '">' + LV.merker(x) + "<h3>" + esc(x.tittel) + "</h3><p>" + esc(x.kort) + "</p></a></li>").join("") + "</ul></section>";
    if (land.length) h += '<section class="landstripe"><h3>' + t.land + "</h3><ul>" + land.map(l => '<li><a href="land.html?id=' + encodeURIComponent(l.id) + '" lang="en"><span aria-hidden="true">' + l.flagg + "</span>" + esc(l.navn) + " →</a></li>").join("") + "</ul></section>";
    if (guide) h += '<p class="fo-anmeld"><a class="knapp hoved" href="film.html?guide=' + guide.id + '"' + (guide.sprak === "en" ? ' lang="en"' : "") + ">" + guide.ikon + " " + esc(guide.tittel) + "</a></p>";
    // Lærer
    h += '<details class="fo-laerer" lang="nb"' + (laerer ? " open" : "") + "><summary>👩‍🏫 " + T.nb.laerer + "</summary><p><strong>" + T.nb.innhold + ":</strong> " + esc(d.advarsel) + "</p>" +
      (laerer && d.kontroller ? "<p><strong>" + T.nb.kontroll + ":</strong></p><ul>" + d.kontroller.map(k => "<li>" + esc(k) + "</li>").join("") + "</ul>" : "") +
      (laerer ? "" : '<p class="fo-hint">Legg til <code>&amp;laerer=1</code> i adressen for å se fasit til faktaspørsmålene.</p>') + "</details>";
    const andre = LV.filmer.filter(x => x.id !== f.id);
    h += '<section class="fo-andre" lang="nb"><h2>Andre filmer</h2><ul class="fo-hylle liten">' + andre.map(x => '<li><a class="fo-kort" href="film.html?id=' + x.id + '">' + omslag(x) + "</a></li>").join("") + "</ul></section>";
    $("innhold").innerHTML = h;
    document.querySelectorAll(".fo-andre .fo-kort").forEach((a, i) => a.setAttribute("aria-label", andre[i].tittel + " (" + andre[i].ar + ")"));
    if (f.youtube) $("fo-spill").addEventListener("click", () => {
      $("fo-video").innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + encodeURIComponent(f.youtube) + '?autoplay=1&rel=0" title="' + esc(t.trailer + ": " + f.tittel) + '" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>';
    });
    svarlinje(t, f.tittel + " (" + f.ar + ")");
  }

  // ---------- Skriveguide ----------
  async function guide(id) {
    const g0 = LV.filmGuider.find(x => x.id === id);
    if (!g0) { $("innhold").innerHTML = '<p class="melding">Fant ikke guiden. <a href="film.html">Til filmene</a></p>'; return; }
    LV.filmGuide = null;
    await LV.lastSkript("data/film/guide-" + id + ".js");
    const g = LV.filmGuide, en = g.sprak === "en", t = T[en ? "en" : "nb"];
    document.title = g.tittel + " – " + (LV.config ? LV.config.navn : "Les verden");
    const annen = LV.filmGuider.find(x => x.id !== id);
    let h = '<nav class="brodsmuler" aria-label="Brødsmuler" lang="nb"><a href="index.html">Forside</a> › <a href="film.html">Film</a> › ' + esc(g.tittel) + "</nav>" +
      '<div' + (en ? ' lang="en"' : "") + '><header class="sidehode"><p class="overlinje">' + (en ? "Writing guide" : "Skriveguide") + "</p><h1>" + g0.ikon + " " + esc(g.tittel) + '</h1><p class="ingress">' + fmt(g.ingress) + "</p>" +
      (annen ? '<p class="fo-annen" lang="nb">' + (en ? "På norsk: " : "In English: ") + '<a href="film.html?guide=' + annen.id + '">' + esc(annen.tittel) + "</a></p>" : "") + "</header>";
    g.deler.forEach(d => {
      h += '<section class="fo-gdel"><h2>' + esc(d.tittel) + "</h2>" + (d.tekst || []).map(p => "<p>" + fmt(p) + "</p>").join("") + (d.liste ? "<ul>" + d.liste.map(x => "<li>" + fmt(x) + "</li>").join("") + "</ul>" : "") + "</section>";
    });
    h += '<section><h2>' + (en ? "Useful phrases" : "Nyttige uttrykk") + '</h2><div class="fo-fraser">' + g.fraser.map(f => '<div class="fo-frase"><h3>' + esc(f.tittel) + "</h3><ul>" + f.liste.map(x => "<li>" + fmt(x) + "</li>").join("") + "</ul></div>").join("") + "</div></section>";
    h += '<section><h2>' + (en ? "Film vocabulary" : "Nyttige ord") + '</h2><div class="gr-tabell-rull"><table class="fo-ordtabell"><thead><tr><th scope="col">' + (en ? "English" : "Ord") + '</th><th scope="col">' + (en ? "Norsk" : "Betydning") + "</th></tr></thead><tbody>" +
      g.ord.map(([a, b]) => "<tr><td><strong>" + esc(a) + '</strong></td><td lang="nb">' + esc(b) + "</td></tr>").join("") + "</tbody></table></div></section>";
    h += '<section class="fo-eksempel"><h2>' + (en ? "Example" : "Eksempel") + "</h2><article><h3>" + esc(g.eksempel.tittel) + "</h3>" + g.eksempel.tekst.map(p => "<p>" + fmt(p) + "</p>").join("") + "</article></section>";
    h += '<section><h2>' + (en ? "Checklist" : "Sjekkliste") + '</h2><ul class="fo-sjekk">' + g.sjekkliste.map((x, i) => '<li><label><input type="checkbox"> ' + fmt(x) + "</label></li>").join("") + "</ul></section>";
    h += '<section><h2>' + (en ? "Assessment" : "Vurdering") + '</h2><div class="gr-tabell-rull"><table class="fo-vurdering"><thead><tr><th scope="col"></th><th scope="col">' + (en ? "Low" : "Lav") + '</th><th scope="col">' + (en ? "Medium" : "Middels") + '</th><th scope="col">' + (en ? "High" : "Høy") + "</th></tr></thead><tbody>" +
      g.vurdering.map(r => '<tr><th scope="row">' + esc(r[0]) + "</th>" + r.slice(1).map(c => "<td>" + esc(c) + "</td>").join("") + "</tr>").join("") + "</tbody></table></div></section>";
    h += '<section class="fo-skriv"><h2>' + (en ? "Write your review" : "Skriv anmeldelsen din") + '</h2><p><label for="fo-velg">' + (en ? "Choose a film:" : "Velg film:") + '</label> <select id="fo-velg"><option value="">' + (en ? "– another film –" : "– en annen film –") + "</option>" +
      LV.filmer.map(f => '<option value="' + f.id + '">' + esc(f.tittel) + " (" + f.ar + ")</option>").join("") + "</select></p>" +
      g.skriveramme.map((s, i) => '<div class="fo-ramme"><h3>' + esc(s) + "</h3>" + svarfelt("ramme" + i, s, s) + "</div>").join("") + "</section></div>";
    $("innhold").innerHTML = h;
    const fra = LV.param("film"); if (fra) $("fo-velg").value = fra;
    svarlinje(t, g.tittel, () => { const o = $("fo-velg").selectedOptions[0]; return o && o.value ? "Film: " + o.textContent + "\n" : ""; });
  }

  document.addEventListener("DOMContentLoaded", function () {
    const id = LV.param("id"), g = LV.param("guide");
    if (g) guide(g); else if (id) film(id); else oversikt();
  });
})();
