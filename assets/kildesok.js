/* =========================================================
   Les verden – Kildesøk (kildesok.html)
   Ett søkefelt for gode oppslagskilder. Treff fra Lille norske
   leksikon, Store norske leksikon (SNL sitt åpne API) og Wikipedia
   (MediaWiki-API-et) vises direkte på siden. Britannica, History.com
   og FN-sambandet åpnes i ny fane. Ingenting lagres – søket sendes
   rett fra nettleseren til kildene.
   kildesok.html?q=<søk>&sprak=nb|en
   ========================================================= */
(function () {
  const LV = window.LV;
  const $ = id => document.getElementById(id);
  const esc = s => LV.esc(String(s == null ? "" : s));
  const ren = s => String(s || "").replace(/<[^>]*>/g, "").replace(/&quot;/g, "\"").replace(/&#0?39;/g, "'").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/\s+/g, " ").trim();
  const enc = encodeURIComponent;
  const ddg = (site, q) => "https://duckduckgo.com/?q=" + enc("site:" + site + " " + q);

  const OM = {
    lille: { navn: "Lille norske leksikon", ikon: "📗", hvem: "Store norske leksikon for unge lesere. Kortere tekster med enklere språk, skrevet og kontrollert av fagfolk." },
    snl: { navn: "Store norske leksikon", ikon: "📘", hvem: "Norsk leksikon der fagfolk skriver og har ansvar for artiklene. Artiklene er signert, og du ser når de sist ble endret." },
    wiki: { navn: "Wikipedia", ikon: "🌐", hvem: "Leksikon som alle kan redigere. Ofte grundig og oppdatert, men kvaliteten varierer. Sjekk kildene nederst i artikkelen – og hvem som står bak." },
    brit: { navn: "Britannica", ikon: "📕", hvem: "Stort engelskspråklig leksikon med redaksjon og fagfolk. Noen artikler krever abonnement." },
    hist: { navn: "History.com", ikon: "📺", hvem: "Nettsted fra en amerikansk TV-kanal om historie. Lettlest populærhistorie – nyttig for oversikt, men sjekk viktige opplysninger i et leksikon." },
    fn: { navn: "FN-sambandet", ikon: "🇺🇳", hvem: "Norsk organisasjon som informerer om FN og verdens land: landfakta, statistikk, konflikter og bakgrunnsartikler." }
  };

  function side() {
    document.title = "Kildesøk – " + (LV.config ? LV.config.navn : "Les verden");
    const q0 = LV.param("q") || "", en0 = LV.param("sprak") === "en";
    $("innhold").innerHTML = '<nav class="brodsmuler" aria-label="Brødsmuler"><a href="index.html">Forside</a> › Kildesøk</nav>' +
      '<header class="sidehode"><p class="overlinje">Kilder og metode</p><h1>🔎 Kildesøk</h1><p class="ingress">Slå opp i gode kilder fra ett sted. Treff fra leksikonene og Wikipedia vises her, og du kan søke videre hos Britannica, History.com og FN-sambandet. Husk å vurdere kilden – og å skrive hvor du fant opplysningene.</p></header>' +
      '<form class="ks-skjema" id="ks-skjema" role="search"><label for="ks-q" class="skjult-visuelt">Søk</label><input id="ks-q" type="search" value="' + esc(q0) + '" placeholder="For eksempel «apartheid» eller «Den kalde krigen» …" autocomplete="off" spellcheck="true">' +
      '<fieldset class="ks-sprak"><legend class="skjult-visuelt">Språk for Wikipedia</legend><label><input type="radio" name="ks-sprak" value="nb"' + (en0 ? "" : " checked") + "> Norsk</label><label><input type=\"radio\" name=\"ks-sprak\" value=\"en\"" + (en0 ? " checked" : "") + '> English</label></fieldset><button type="submit" class="knapp hoved">Søk</button></form>' +
      '<div id="ks-videre"></div><div class="ks-resultater" id="ks-resultater" aria-live="polite"></div>' +
      '<section class="le-del ks-fn"><h2>🇺🇳 Fra FN-sambandet</h2><p class="mu-intro">Landfakta, statistikk og konflikter fra hele verden.</p><p class="mu-knapper"><a class="knapp" href="https://fn.no/land" target="_blank" rel="noopener">🌍 Alle land</a><a class="knapp" href="https://fn.no/Land/sammenlign-land" target="_blank" rel="noopener">📊 Sammenlign land</a><a class="knapp" href="https://fn.no/konflikter" target="_blank" rel="noopener">⚔️ Krig og konflikter</a></p></section>' +
      '<section class="le-del"><h2>Hva slags kilde er dette?</h2><ul class="ks-om">' + Object.values(OM).map(o => '<li><span class="ks-ikon" aria-hidden="true">' + o.ikon + "</span><div><strong>" + esc(o.navn) + "</strong><p>" + esc(o.hvem) + "</p></div></li>").join("") + "</ul>" +
      '<p class="mu-intro">Sjekk alltid viktige opplysninger i minst to kilder. Les mer om å vurdere nettsider i <a href="lateral.html">Lateral lesing</a>.</p></section>' +
      '<p class="fo-merk">Søket sendes direkte fra nettleseren din til kildene. Les verden lagrer ingenting. Tekstutdragene fra leksikonene og Wikipedia er korte smakebiter – les hele artikkelen hos kilden.</p>';
    $("ks-skjema").addEventListener("submit", e => { e.preventDefault(); sok(); });
    document.querySelectorAll('input[name="ks-sprak"]').forEach(r => r.addEventListener("change", () => { if ($("ks-q").value.trim()) sok(); }));
    if (q0) sok(); else $("ks-q").focus();
  }

  let teller = 0;
  async function sok() {
    const q = $("ks-q").value.trim(); if (!q) return;
    const en = document.querySelector('input[name="ks-sprak"]:checked').value === "en";
    const nr = ++teller;
    try { const u = new URL(location.href); u.searchParams.set("q", q); if (en) u.searchParams.set("sprak", "en"); else u.searchParams.delete("sprak"); history.replaceState(null, "", u); } catch (e) { /* ignorer */ }
    const wikiDomene = en ? "en.wikipedia.org" : "no.wikipedia.org";
    $("ks-videre").innerHTML = '<p class="ks-videre"><span>Søk videre:</span>' +
      '<a class="knapp liten" href="https://' + wikiDomene + "/w/index.php?search=" + enc(q) + '" target="_blank" rel="noopener">🌐 Wikipedia</a>' +
      '<a class="knapp liten" href="https://www.britannica.com/search?query=' + enc(q) + '" target="_blank" rel="noopener" lang="en">📕 Britannica</a>' +
      '<a class="knapp liten" href="' + ddg("history.com", q) + '" target="_blank" rel="noopener" lang="en">📺 History.com</a>' +
      '<a class="knapp liten" href="' + ddg("fn.no", q) + '" target="_blank" rel="noopener">🇺🇳 FN-sambandet</a>' +
      '<a class="knapp liten" href="' + ddg("snl.no", q) + '" target="_blank" rel="noopener">📘 Mer fra SNL</a></p>' +
      '<p class="ks-merk">Britannica åpner sitt eget søk. For History.com, FN-sambandet og flere SNL-treff brukes et søk i DuckDuckGo som bare viser sider fra det nettstedet. Lenkene åpnes i ny fane.</p>';
    $("ks-resultater").innerHTML = ["lille", "snl", "wiki"].map(k => '<section class="ks-kilde" id="ks-' + k + '"><h2>' + OM[k].ikon + " " + OM[k].navn + (k === "wiki" ? (en ? " (English)" : " (norsk)") : "") + '</h2><p class="ks-laster">Søker …</p></section>').join("");
    const vis = (k, html) => { if (nr === teller) $("ks-" + k).innerHTML = "<h2>" + OM[k].ikon + " " + OM[k].navn + (k === "wiki" ? (en ? " (English)" : " (norsk)") : "") + "</h2>" + html; };
    const snl = async (dom, k) => {
      try {
        const r = await fetch("https://" + dom + "/api/v1/search?query=" + enc(q) + "&limit=5");
        if (!r.ok) throw new Error(r.status);
        const d = await r.json();
        vis(k, d.length ? '<ol class="ks-treff">' + d.map(x => '<li><a href="' + esc(x.article_url) + '" target="_blank" rel="noopener"><strong>' + esc(x.headword || x.title) + "</strong>" + (x.clarification ? " <span class=\"ks-pres\">(" + esc(x.clarification) + ")</span>" : "") + "</a><p>" + esc(ren(x.first_two_sentences || x.snippet)) + "</p></li>").join("") + "</ol>" : '<p class="ks-ingen">Ingen treff. Prøv et annet ord – eller et kortere søk.</p>');
      } catch (e) {
        vis(k, '<p class="ks-ingen">Kunne ikke hente treff herfra akkurat nå. <a href="' + ddg(dom, q) + '" target="_blank" rel="noopener">Søk i ' + esc(OM[k].navn) + " i stedet →</a></p>");
      }
    };
    const wiki = async () => {
      try {
        const r = await fetch("https://" + wikiDomene + "/w/api.php?action=query&list=search&format=json&origin=*&srlimit=5&srsearch=" + enc(q));
        const d = await r.json(), l = (d.query && d.query.search) || [];
        vis("wiki", l.length ? '<ol class="ks-treff"' + (en ? ' lang="en"' : "") + ">" + l.map(x => '<li><a href="https://' + wikiDomene + "/wiki/" + enc(x.title.replace(/ /g, "_")) + '" target="_blank" rel="noopener"><strong>' + esc(x.title) + "</strong></a><p>… " + esc(ren(x.snippet)) + " …</p></li>").join("") + "</ol>" : '<p class="ks-ingen">Ingen treff.</p>');
      } catch (e) {
        vis("wiki", '<p class="ks-ingen">Kunne ikke hente treff akkurat nå. <a href="https://' + wikiDomene + "/w/index.php?search=" + enc(q) + '" target="_blank" rel="noopener">Søk på Wikipedia i stedet →</a></p>');
      }
    };
    snl("lille.snl.no", "lille"); snl("snl.no", "snl"); wiki();
  }

  document.addEventListener("DOMContentLoaded", side);
})();
