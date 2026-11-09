/* =========================================================
   Les verden – Lesegrupper med roller (lesegruppe.html)
   Gjensidig undervisning (reciprocal teaching): fire roller –
   spå, oppklare, spørre, oppsummere – som går på rundgang for
   hver del av teksten. Tekstene hentes fra temaene og Reading Room.
   lesegruppe.html?tema=<id>[&lett=1][&del=n] · ?tekst=<lesing-id>
   Ingenting lagres – notatene kan lastes ned med svarfil.js.
   ========================================================= */
(function () {
  const LV = window.LV;
  const $ = id => document.getElementById(id);
  const esc = s => LV.esc(String(s == null ? "" : s));
  const ren = s => String(s).replace(/\[\[([^\]|]+)(?:\|[^\]]*)?\]\]/g, "$1").replace(/\*\*/g, "");
  const tell = s => ren(s).split(/\s+/).filter(Boolean).length;
  const hode = t => '<nav class="brodsmuler" aria-label="Brødsmuler"><a href="index.html">Forside</a> › <a href="lesestrategier.html">Lese og skrive</a> › <a href="lesegruppe.html">Lesegrupper</a>' + (t ? " › " + esc(t) : "") + "</nav>";
  const ROLLER = {
    nb: [
      { id: "spa", ikon: "🔮", navn: "Spåmann", farge: "var(--lilla)", nar: "Før dere leser", oppg: "Se på overskriften og det dere har lest før. Hva tror du denne delen handler om? Begrunn gjetningen.", start: ["Jeg tror at … fordi …", "Overskriften får meg til å tenke på …", "Siden vi har lest om …, tror jeg at …"] },
      { id: "okl", ikon: "🔍", navn: "Oppklarer", farge: "var(--engelsk)", nar: "Etter lesingen", oppg: "Finn ord, uttrykk eller setninger som er vanskelige. Hjelp gruppa med å finne ut hva de betyr – les setningen rundt, del opp ordet eller slå det opp.", start: ["Et ord jeg ikke forstod, var …", "Jeg tror det betyr … fordi …", "Kan noen forklare setningen …?"] },
      { id: "spm", ikon: "❓", navn: "Spørsmålsstiller", farge: "var(--aksent)", nar: "Etter lesingen", oppg: "Still spørsmål til teksten – både spørsmål der svaret står i teksten, og spørsmål der gruppa må tenke selv.", start: ["Hvorfor …?", "Hva ville skjedd hvis …?", "Hvordan henger … sammen med …?"] },
      { id: "opp", ikon: "📝", navn: "Oppsummerer", farge: "var(--samfunnsfag)", nar: "Til slutt", oppg: "Fortell det viktigste i denne delen med egne ord i to–tre setninger. Gruppa sier fra om noe viktig mangler.", start: ["Denne delen handler om …", "Det viktigste er …", "Til slutt …"] }
    ],
    en: [
      { id: "spa", ikon: "🔮", navn: "Predictor", farge: "var(--lilla)", nar: "Before reading", oppg: "Look at the heading and what you have read so far. What do you think this part is about? Give a reason.", start: ["I think that … because …", "The heading makes me think of …", "Since we have read about …, I predict that …"] },
      { id: "okl", ikon: "🔍", navn: "Clarifier", farge: "var(--engelsk)", nar: "After reading", oppg: "Find words, phrases or sentences that are difficult. Help the group work out what they mean – read the sentence around them, split the word, or look it up.", start: ["A word I didn't understand was …", "I think it means … because …", "Can someone explain the sentence …?"] },
      { id: "spm", ikon: "❓", navn: "Questioner", farge: "var(--aksent)", nar: "After reading", oppg: "Ask questions about the text – questions where the answer is in the text, and questions where the group has to think.", start: ["Why …?", "What would have happened if …?", "How is … connected to …?"] },
      { id: "opp", ikon: "📝", navn: "Summariser", farge: "var(--samfunnsfag)", nar: "Finally", oppg: "Tell the group the most important points in this part in your own words, in two or three sentences. The group says if anything important is missing.", start: ["This part is about …", "The most important thing is …", "Finally, …"] }
    ]
  };

  function rollekortHtml(sp) {
    return '<div class="lgr-kort">' + ROLLER[sp].map(r => '<article class="lgr-rolle" style="--lgr:' + r.farge + '"' + (sp === "en" ? ' lang="en"' : "") + '><p class="lgr-rolle-ikon" aria-hidden="true">' + r.ikon + '</p><h3>' + esc(r.navn) + '</h3><p class="lgr-nar">' + esc(r.nar) + "</p><p>" + esc(r.oppg) + '</p><ul class="lgr-start">' + r.start.map(s => "<li>" + esc(s) + "</li>").join("") + "</ul></article>").join("") + "</div>";
  }

  function oversikt() {
    document.title = "Lesegrupper med roller – " + (LV.config ? LV.config.navn : "Les verden");
    const tema = LV.temaer.slice().sort((a, b) => a.fag.localeCompare(b.fag) || a.trinn - b.trinn || a.tittel.localeCompare(b.tittel));
    $("innhold").innerHTML = hode() +
      '<header class="sidehode"><p class="overlinje">Gjensidig undervisning</p><h1>👥 Lesegrupper med roller</h1><p class="ingress">Les en tekst sammen i grupper på fire. Hver av dere har en rolle: Spåmannen gjetter hva som kommer, oppklareren rydder opp i vanskelige ord, spørsmålsstilleren stiller gode spørsmål, og oppsummereren forteller det viktigste. Etter hver del bytter dere roller – slik øver alle på alle strategiene.</p></header>' +
      "<h2>Rollene</h2>" + rollekortHtml("nb") +
      '<p><button type="button" class="knapp" id="lgr-skriv">🖨️ Skriv ut rollekortene</button></p>' +
      '<form class="ly-velg" id="lgr-velg"><h2>Velg en tekst</h2><label for="lgr-tema">Samfunnsfag- eller engelsktema</label><select id="lgr-tema"><option value="">Velg et tema …</option>' +
      ["samfunnsfag", "engelsk"].map(f => '<optgroup label="' + (f === "engelsk" ? "Engelsk" : "Samfunnsfag") + '">' + tema.filter(t => t.fag === f).map(t => '<option value="tema:' + t.id + '">' + t.trinn + ". trinn – " + esc(t.tittel) + "</option>").join("") + "</optgroup>").join("") +
      '</select><label for="lgr-tekst"><span lang="en">Reading Room</span></label><select id="lgr-tekst"><option value="">Velg en tekst …</option>' + (LV.lesetekster || []).filter(t => !t.utenTekst).map(t => '<option value="tekst:' + t.id + '" lang="en">' + esc(t.tittel) + " – " + esc(t.forfatter) + "</option>").join("") + "</select>" +
      '<label class="ly-lett"><input type="checkbox" id="lgr-lett"> Bruk lettere tekst når den finnes</label><button class="knapp hoved" type="submit">Start →</button></form>' +
      '<p class="fo-merk">Til læreren: Modeller rollene selv først – tenk høyt mens du spår, oppklarer, spør og oppsummerer. La så gruppene overta. Er dere tre i gruppa, kan oppsummereren også være spåmann. Metoden kalles <span lang="en">reciprocal teaching</span> og er en av de best dokumenterte metodene for leseforståelse.</p>';
    $("lgr-tema").addEventListener("change", () => { if ($("lgr-tema").value) $("lgr-tekst").value = ""; });
    $("lgr-tekst").addEventListener("change", () => { if ($("lgr-tekst").value) $("lgr-tema").value = ""; });
    $("lgr-skriv").addEventListener("click", () => { document.body.classList.add("lgr-skriv-kort"); window.print(); setTimeout(() => document.body.classList.remove("lgr-skriv-kort"), 500); });
    $("lgr-velg").addEventListener("submit", e => { e.preventDefault(); const v = $("lgr-tema").value || $("lgr-tekst").value; if (!v) return; const [type, id] = v.split(":"); location.search = "?" + type + "=" + encodeURIComponent(id) + ($("lgr-lett").checked ? "&lett=1" : ""); });
  }

  async function hentDeler(type, id, lett) {
    if (type === "tema") {
      if (!LV.temaer.find(t => t.id === id)) throw 0;
      await LV.lastSkript("data/temaer/" + id + ".js");
      const t = LV.tema;
      return { tittel: t.tittel, sp: t.sprak === "en" ? "en" : "nb", lenke: "tema.html?id=" + id, deler: t.avsnitt.map(a => ({ h: a.tittel, p: (lett && a.lett && a.lett.length ? a.lett : a.tekst).filter(p => typeof p === "string").map(ren) })).filter(d => d.p.length) };
    }
    const info = (LV.lesetekster || []).find(t => t.id === id); if (!info) throw 0;
    await LV.lastSkript("data/lesing/" + id + ".js");
    const d = LV.lesetekst, deler = [];
    let buf = [], h = null;
    const tom = () => { if (buf.length) deler.push({ h: h, p: buf }); buf = []; h = null; };
    ((lett && d.lett ? d.lett : d.tekst) || []).forEach(p => {
      if (typeof p !== "string") { if (p.h) { tom(); h = p.h; } else if (p.vers) buf.push(p.vers); return; }
      buf.push(ren(p)); if (tell(buf.join(" ")) >= 220) tom();
    });
    tom();
    deler.forEach((x, i) => { if (!x.h || x.h === "[…]") x.h = "Part " + (i + 1); });
    return { tittel: info.tittel + " – " + info.forfatter, sp: "en", lenke: "lesing.html?id=" + id, deler };
  }

  async function okt(type, id, lett, delNr) {
    let T;
    try { T = await hentDeler(type, id, lett); } catch (e) { $("innhold").innerHTML = hode() + '<p>Fant ikke teksten. <a href="lesegruppe.html">Velg en annen</a>.</p>'; return; }
    const n = Math.min(Math.max(0, delNr), T.deler.length - 1), del = T.deler[n], R = ROLLER[T.sp], en = T.sp === "en";
    const lang = en ? ' lang="en"' : "", pre = "lgr-" + id + "-" + n + "-";
    const url = i => "lesegruppe.html?" + type + "=" + encodeURIComponent(id) + (lett ? "&lett=1" : "") + "&del=" + i;
    const rolleFor = elev => R[(elev + n) % 4];
    document.title = "Lesegruppe: " + T.tittel;
    const steg = [
      { r: R[0], tekst: false }, { les: true }, { r: R[1] }, { r: R[2] }, { r: R[3] }
    ];
    $("innhold").innerHTML = hode(T.tittel) +
      '<header class="sidehode"><p class="overlinje">👥 Lesegruppe · ' + (en ? "Part " : "Del ") + (n + 1) + " av " + T.deler.length + "</p><h1" + lang + ">" + esc(T.tittel) + '</h1><p class="ly-meta"><a href="' + T.lenke + '">Åpne hele teksten</a></p></header>' +
      '<section class="lgr-hvem" aria-labelledby="lgr-hvem-h"><h2 id="lgr-hvem-h">Hvem har hvilken rolle i denne delen?</h2><ul>' + [0, 1, 2, 3].map(e => { const r = rolleFor(e); return '<li style="--lgr:' + r.farge + '"><strong>Elev ' + (e + 1) + '</strong><span' + lang + "><span aria-hidden=\"true\">" + r.ikon + "</span> " + esc(r.navn) + "</span></li>"; }).join("") + '</ul><p class="mu-intro">Bestem hvem som er elev 1, 2, 3 og 4. Rollene flytter seg ett hakk for hver del.</p></section>' +
      '<ol class="lgr-steg">' + steg.map((s, i) => '<li class="lgr-trinn" data-steg="' + i + '"' + (i ? " hidden" : "") + ">" + (s.les
        ? '<h2>' + (i + 1) + ". " + (en ? "Read the text" : "Les teksten") + '</h2><p class="mu-intro">' + (en ? "Read silently, or take turns reading aloud." : "Les stille, eller les høyt etter tur.") + '</p><article class="lgr-tekst"' + lang + "><h3>" + esc(del.h) + "</h3>" + del.p.map(p => "<p>" + esc(p).replace(/\n/g, "<br>") + "</p>").join("") + "</article>"
        : '<div class="lgr-aktiv" style="--lgr:' + s.r.farge + '"><h2>' + (i + 1) + '. <span aria-hidden="true">' + s.r.ikon + "</span> <span" + lang + ">" + esc(s.r.navn) + '</span> <span class="lgr-hvemrolle">(elev ' + ([0, 1, 2, 3].find(e => rolleFor(e) === s.r) + 1) + ")</span></h2><p" + lang + ">" + esc(s.r.oppg) + '</p><ul class="lgr-start"' + lang + ">" + s.r.start.map(x => "<li>" + esc(x) + "</li>").join("") + '</ul><label class="mu-notat" for="' + pre + s.r.id + '"><span>Gruppas notater</span><textarea id="' + pre + s.r.id + '" rows="3"></textarea></label></div>') +
        (i < steg.length - 1 ? '<p><button type="button" class="knapp hoved lgr-videre" data-til="' + (i + 1) + '">Neste steg →</button></p>' : "") + "</li>").join("") + "</ol>" +
      '<nav class="lgr-nav" aria-label="Deler">' + (n > 0 ? '<a class="knapp" href="' + url(n - 1) + '">← Forrige del</a>' : "") + (n < T.deler.length - 1 ? '<a class="knapp hoved" href="' + url(n + 1) + '">Neste del – bytt roller →</a>' : '<a class="knapp hoved" href="lesegruppe.html">Ferdig! Velg en ny tekst</a>') + '<button type="button" class="knapp" id="lgr-alle">Vis alle stegene</button></nav>';
    document.querySelectorAll(".lgr-videre").forEach(b => b.addEventListener("click", () => {
      const neste = document.querySelector('.lgr-trinn[data-steg="' + b.dataset.til + '"]');
      neste.hidden = false; b.closest("p").hidden = true;
      const h = neste.querySelector("h2"); h.setAttribute("tabindex", "-1"); h.focus();
    }));
    $("lgr-alle").addEventListener("click", () => { document.querySelectorAll(".lgr-trinn").forEach(x => { x.hidden = false; }); document.querySelectorAll(".lgr-videre").forEach(b => { b.closest("p").hidden = true; }); });
  }

  document.addEventListener("DOMContentLoaded", () => {
    const tema = LV.param("tema"), tekst = LV.param("tekst"), lett = LV.param("lett") === "1", del = parseInt(LV.param("del"), 10) || 0;
    if (tema) okt("tema", tema, lett, del); else if (tekst) okt("tekst", tekst, lett, del); else oversikt();
    const linje = document.createElement("div");
    linje.className = "svarlinje";
    linje.innerHTML = '<div class="svarlinje-indre"><label class="skjult-visuelt" for="elevnavn">Navn</label><input id="elevnavn" type="text" placeholder="Navn" autocomplete="off"><span class="status" role="status" aria-live="polite"></span></div>';
    document.body.appendChild(linje);
  });
})();
