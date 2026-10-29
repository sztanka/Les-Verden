/* =========================================================
   Les verden – temaside
   Leser data/temaer/<id>.js og bygger siden:
   før du leser → fagtekst → sammendrag → oppgaver → koblet til → kilder.
   ========================================================= */

(function () {
  const LV = window.LV;

  // ---------- Tekster i grensesnittet (norsk/engelsk) ----------
  const TEKST = {
    nb: {
      forDuLeser: "Før du leser", duSkalLaere: "Dette skal du lære", startsporsmal: "Tenk før du leser",
      lesOpp: "Les opp hele teksten", stopp: "Stopp opplesing", lesAvsnitt: "Les opp",
      stoppOgTenk: "Stopp og tenk", sammendrag: "Lettlest sammendrag – trykk for å åpne",
      oppgaver: "Oppgaver", niva: "Nivå",
      nivaTekst: { 1: "Grunnleggende – start her.", 2: "Middels – du forklarer og ser sammenhenger.", 3: "Krevende – du sammenligner og drøfter." },
      typer: { finn: "Finn svar i teksten", forsta: "Forstå og forklar", diskuter: "Diskuter og reflekter" },
      partner: "Snakk med læringspartner", dittSvar: "Ditt svar",
      kobletTil: "Koblet til", kilder: "Les mer",
      navn: "Navn", kopier: "Kopier mine svar", slett: "Slett alle svar",
      kopiert: "Kopiert! Lim inn i dokumentet ditt.", ingenSvar: "Du har ikke skrevet noen svar ennå.",
      bekreftSlett: "Vil du slette alle svarene dine? Dette kan ikke angres.",
      ulagret: "Husk å kopiere svarene dine før du lukker siden.",
      kopiHode: { tema: "Tema", fag: "Fag", trinn: "trinn", dato: "Dato", svar: "Svar" },
      ingenStemme: "Fant ingen norsk stemme i nettleseren – teksten leses med en annen stemme."
    },
    en: {
      forDuLeser: "Before you read", duSkalLaere: "In this topic you will learn to", startsporsmal: "Think before you read",
      lesOpp: "Read the whole text aloud", stopp: "Stop reading", lesAvsnitt: "Read aloud",
      stoppOgTenk: "Stop and think", sammendrag: "Easy summary – click to open",
      oppgaver: "Tasks", niva: "Level",
      nivaTekst: { 1: "Basic – start here.", 2: "Intermediate – explain and find connections.", 3: "Advanced – compare and discuss." },
      typer: { finn: "Find the answer in the text", forsta: "Understand and explain", diskuter: "Discuss and reflect" },
      partner: "Talk to a learning partner", dittSvar: "Your answer",
      kobletTil: "Connected topics", kilder: "Read more",
      navn: "Name", kopier: "Copy my answers", slett: "Delete all answers",
      kopiert: "Copied! Paste it into your document.", ingenSvar: "You haven't written any answers yet.",
      bekreftSlett: "Do you want to delete all your answers? This cannot be undone.",
      ulagret: "Remember to copy your answers before you close the page.",
      kopiHode: { tema: "Topic", fag: "Subject", trinn: "grade", dato: "Date", svar: "Answer" },
      ingenStemme: "No English voice found in this browser – another voice will be used."
    }
  };

  let T = TEKST.nb;
  let tema = null;
  let endretSidenKopi = false;

  // ---------- Tekstformatering ----------
  // [[ord]] eller [[visningstekst|nøkkel]] blir ordforklaring. **tekst** blir fet.
  let ordTeller = 0;
  function formater(tekst) {
    let html = LV.esc(tekst);
    html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    html = html.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, function (_, vis, nokkel) {
      const n = (nokkel || vis).trim();
      const forklaring = tema.ord && (tema.ord[n] || tema.ord[n.toLowerCase()]);
      if (!forklaring) return vis;
      const id = "ord-" + (++ordTeller);
      return '<span class="ord-wrap"><button type="button" class="ord" aria-expanded="false" aria-controls="' + id + '">' + vis + "</button>" +
        '<span class="ordforklaring" id="' + id + '" role="tooltip" hidden><strong>' + LV.esc(n) + "</strong>" + LV.esc(forklaring) + "</span></span>";
    });
    return html;
  }
  function rentekst(tekst) {
    return String(tekst).replace(/\*\*(.+?)\*\*/g, "$1").replace(/\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g, "$1");
  }

  function svarfelt(nokkel, sporsmal, gruppe) {
    return '<label class="svar-etikett" for="svar-' + nokkel + '">' + T.dittSvar + "</label>" +
      '<textarea class="svar" id="svar-' + nokkel + '" data-sporsmal="' + LV.esc(sporsmal) + '" data-gruppe="' + LV.esc(gruppe) + '"></textarea>';
  }

  // ---------- Bygg siden ----------
  function bygg() {
    const fagKlasse = "fag-" + tema.fag;
    document.body.classList.add(fagKlasse);
    document.body.dataset.fag = tema.fag;
    document.documentElement.lang = tema.sprak === "en" ? "en" : "nb";
    document.title = tema.tittel + " – " + (LV.config ? LV.config.navn : "Les verden");

    let h = "";
    h += '<nav class="brodsmuler" aria-label="Brødsmuler"><a href="index.html">Forside</a> › ' +
      '<a href="index.html?fag=' + tema.fag + '">' + LV.fagNavn[tema.fag] + "</a> › " +
      '<a href="index.html?fag=' + tema.fag + "&trinn=" + tema.trinn + '">' + tema.trinn + ". trinn</a></nav>";

    if (LV.param("laerer") === "1" && tema.kontroller && tema.kontroller.length) {
      h += '<aside class="laerer-boks" lang="nb"><h2>For læreren: kontroller disse opplysningene</h2><ul>' +
        tema.kontroller.map(k => "<li>" + LV.esc(k) + "</li>").join("") + "</ul></aside>";
    }

    const kat = LV.temaer.find(t => t.id === tema.id) || {};
    if (kat.bilde) {
      let kreditt = "";
      if (kat.kreditt) {
        const navn = kat.kredittUrl ? '<a href="' + LV.esc(kat.kredittUrl) + '" target="_blank" rel="noopener">' + LV.esc(kat.kreditt) + "</a>" : LV.esc(kat.kreditt);
        const kilde = kat.kilde ? " / " + (kat.kildeUrl ? '<a href="' + LV.esc(kat.kildeUrl) + '" target="_blank" rel="noopener">' + LV.esc(kat.kilde) + "</a>" : LV.esc(kat.kilde)) : "";
        kreditt = '<figcaption lang="nb">Foto: ' + navn + kilde + "</figcaption>";
      }
      h += '<figure class="temabilde"><img src="' + LV.esc(kat.bilde) + '" alt="' + LV.esc(kat.bildeAlt || "") + '">' + kreditt + "</figure>";
    }
    h += '<header class="temahode"><div class="merker"><span class="merke">' + LV.fagNavn[tema.fag] + '</span><span class="merke">' + tema.trinn + '. trinn</span></div>' +
      "<h1>" + LV.esc(tema.tittel) + '</h1><p class="ingress">' + formater(tema.ingress) + "</p></header>";

    // Før du leser
    h += '<section class="boks for-du-leser" aria-labelledby="for-du-leser"><h2 id="for-du-leser">' + T.forDuLeser + "</h2>";
    if (tema.maal && tema.maal.length) {
      h += "<h3>" + T.duSkalLaere + "</h3><ul>" + tema.maal.map(m => "<li>" + formater(m) + "</li>").join("") + "</ul>";
    }
    if (tema.startsporsmal) {
      h += "<h3>" + T.startsporsmal + "</h3><p>" + formater(tema.startsporsmal) + "</p>" +
        svarfelt("start", rentekst(tema.startsporsmal), T.startsporsmal);
    }
    h += "</section>";

    // Opplesing
    if ("speechSynthesis" in window) {
      h += '<div class="opplesing"><button class="knapp hoved" id="les-alt">▶ ' + T.lesOpp + '</button>' +
        '<button class="knapp" id="stopp-lesing" hidden>■ ' + T.stopp + '</button><span class="info" id="stemme-info"></span></div>';
    }

    // Fagtekst
    let stoppNr = 0;
    h += '<article class="fagtekst" id="fagtekst">';
    tema.avsnitt.forEach(function (a, i) {
      h += '<section class="avsnitt" data-avsnitt="' + i + '"><h2>' + LV.esc(a.tittel) +
        ("speechSynthesis" in window ? ' <button type="button" class="les-avsnitt" data-les="' + i + '" aria-label="' + T.lesAvsnitt + ": " + LV.esc(a.tittel) + '">▶ ' + T.lesAvsnitt + "</button>" : "") +
        "</h2>";
      a.tekst.forEach(p => { h += "<p>" + formater(p) + "</p>"; });
      h += "</section>";
      if (a.stoppOgTenk) {
        stoppNr++;
        h += '<aside class="stopp"><div class="tittel"><span aria-hidden="true">✋</span> ' + T.stoppOgTenk + "</div><p>" + formater(a.stoppOgTenk) + "</p>" +
          svarfelt("stopp-" + stoppNr, rentekst(a.stoppOgTenk), T.stoppOgTenk) + "</aside>";
      }
    });
    h += "</article>";

    // Sammendrag
    if (tema.sammendrag && tema.sammendrag.length) {
      h += '<details class="sammendrag"><summary>' + T.sammendrag + "</summary><ul>" +
        tema.sammendrag.map(s => "<li>" + formater(s) + "</li>").join("") + "</ul></details>";
    }

    // Oppgaver
    h += '<section class="oppgaver" aria-labelledby="oppgaver-tittel"><h2 id="oppgaver-tittel">' + T.oppgaver + "</h2>";
    h += '<div class="nivafaner" role="tablist" aria-label="' + T.oppgaver + '">';
    [1, 2, 3].forEach(n => {
      h += '<button class="knapp" role="tab" id="fane-' + n + '" aria-controls="niva-' + n + '" aria-selected="' + (n === 1) + '" tabindex="' + (n === 1 ? 0 : -1) + '">' + T.niva + " " + n + "</button>";
    });
    h += "</div>";
    [1, 2, 3].forEach(n => {
      const niva = (tema.oppgaver && tema.oppgaver[n]) || {};
      h += '<div class="nivapanel" role="tabpanel" id="niva-' + n + '" aria-labelledby="fane-' + n + '"' + (n === 1 ? "" : " hidden") + ">";
      h += '<p class="nivabeskrivelse">' + T.nivaTekst[n] + "</p>";
      let nr = 0;
      ["finn", "forsta", "diskuter"].forEach(type => {
        const liste = niva[type] || [];
        if (!liste.length) return;
        h += '<div class="oppgavegruppe"><h3>' + T.typer[type] + "</h3>";
        liste.forEach(o => {
          nr++;
          const tekst = typeof o === "string" ? o : o.tekst;
          const partner = typeof o === "object" && o.partner;
          const gruppe = T.niva + " " + n + " – " + T.typer[type];
          h += '<div class="oppgave"><p class="sporsmal"><span class="nr">' + nr + ".</span>" + formater(tekst) +
            (partner ? '<span class="partner">' + T.partner + "</span>" : "") + "</p>" +
            svarfelt("o" + n + "-" + type + "-" + nr, nr + ". " + rentekst(tekst), gruppe) + "</div>";
        });
        h += "</div>";
      });
      h += "</div>";
    });
    h += "</section>";

    // Koblet til
    const koblet = (tema.kobletTil || []).map(id => LV.temaer.find(t => t.id === id)).filter(Boolean);
    if (koblet.length) {
      h += "<section><h2>" + T.kobletTil + '</h2><ul class="temaliste">' +
        koblet.map(t => '<li><a class="temakort fag-' + t.fag + '" href="tema.html?id=' + encodeURIComponent(t.id) + '">' +
          '<span class="merker"><span class="merke">' + LV.fagNavn[t.fag] + '</span><span class="merke">' + t.trinn + '. trinn</span></span>' +
          "<h3>" + LV.esc(t.tittel) + "</h3><p>" + LV.esc(t.kort) + "</p></a></li>").join("") + "</ul></section>";
    }

    // Kilder
    if (tema.kilder && tema.kilder.length) {
      h += "<section><h2>" + T.kilder + '</h2><ul class="kilder">' +
        tema.kilder.map(k => '<li><a href="' + LV.esc(k.url) + '" target="_blank" rel="noopener">' + LV.esc(k.tittel) + "</a></li>").join("") + "</ul></section>";
    }

    const main = document.getElementById("innhold");
    main.innerHTML = h;
    document.querySelectorAll(".hovedmeny a").forEach(a => {
      if (a.getAttribute("href") === "index.html?fag=" + tema.fag) a.setAttribute("aria-current", "page");
    });

    // Svarlinje
    const linje = document.createElement("div");
    linje.className = "svarlinje";
    linje.innerHTML = '<div class="svarlinje-indre">' +
      '<label class="skjult-visuelt" for="elevnavn">' + T.navn + "</label>" +
      '<input id="elevnavn" type="text" placeholder="' + T.navn + '" autocomplete="off">' +
      '<button class="knapp hoved" id="kopier">' + T.kopier + "</button>" +
      '<button class="knapp fare" id="slett">' + T.slett + "</button>" +
      '<span class="status" id="status" role="status" aria-live="polite"></span></div>';
    document.body.appendChild(linje);

    kobleOrdforklaringer();
    kobleFaner();
    kobleSvar();
    kobleOpplesing();
  }

  // ---------- Ordforklaringer ----------
  function lukkAlleOrd(unntak) {
    document.querySelectorAll(".ord[aria-expanded='true']").forEach(b => {
      if (b === unntak) return;
      b.setAttribute("aria-expanded", "false");
      document.getElementById(b.getAttribute("aria-controls")).hidden = true;
    });
  }
  function kobleOrdforklaringer() {
    document.addEventListener("click", function (e) {
      const knapp = e.target.closest(".ord");
      if (!knapp) { if (!e.target.closest(".ordforklaring")) lukkAlleOrd(); return; }
      const boks = document.getElementById(knapp.getAttribute("aria-controls"));
      const apne = knapp.getAttribute("aria-expanded") !== "true";
      lukkAlleOrd(knapp);
      knapp.setAttribute("aria-expanded", String(apne));
      boks.hidden = !apne;
      if (apne) {
        boks.style.left = "0px";
        const r = boks.getBoundingClientRect();
        if (r.right > window.innerWidth - 8) boks.style.left = (window.innerWidth - 8 - r.right) + "px";
      }
    });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") lukkAlleOrd(); });
  }

  // ---------- Nivåfaner ----------
  function kobleFaner() {
    const faner = Array.from(document.querySelectorAll('[role="tab"]'));
    function velg(fane) {
      faner.forEach(f => {
        const valgt = f === fane;
        f.setAttribute("aria-selected", String(valgt));
        f.tabIndex = valgt ? 0 : -1;
        document.getElementById(f.getAttribute("aria-controls")).hidden = !valgt;
      });
    }
    faner.forEach((f, i) => {
      f.addEventListener("click", () => velg(f));
      f.addEventListener("keydown", e => {
        if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
          const neste = faner[(i + (e.key === "ArrowRight" ? 1 : faner.length - 1)) % faner.length];
          velg(neste); neste.focus();
        }
      });
    });
  }

  // ---------- Svar: kopier og slett ----------
  function datoTekst() {
    const d = new Date();
    return String(d.getDate()).padStart(2, "0") + "." + String(d.getMonth() + 1).padStart(2, "0") + "." + d.getFullYear();
  }

  function byggKopitekst() {
    const felt = Array.from(document.querySelectorAll("textarea.svar")).filter(t => t.value.trim());
    if (!felt.length) return null;
    const navn = document.getElementById("elevnavn").value.trim();
    const H = T.kopiHode;
    const linjer = [];
    if (navn) linjer.push(T.navn + ": " + navn);
    linjer.push(H.tema + ": " + tema.tittel + " (" + LV.fagNavn[tema.fag] + ", " + tema.trinn + ". " + H.trinn + ")");
    linjer.push(H.dato + ": " + datoTekst());
    let forrigeGruppe = null;
    felt.forEach(t => {
      if (t.dataset.gruppe !== forrigeGruppe) {
        linjer.push("", t.dataset.gruppe.toUpperCase());
        forrigeGruppe = t.dataset.gruppe;
      }
      linjer.push(t.dataset.sporsmal, H.svar + ": " + t.value.trim(), "");
    });
    return linjer.join("\n").replace(/\n{3,}/g, "\n\n").trim() + "\n";
  }

  async function kopierTekst(tekst) {
    try {
      await navigator.clipboard.writeText(tekst);
      return true;
    } catch (e) {
      const ta = document.createElement("textarea");
      ta.value = tekst;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      let ok = false;
      try { ok = document.execCommand("copy"); } catch (e2) { ok = false; }
      ta.remove();
      return ok;
    }
  }

  function visStatus(tekst, ok) {
    const s = document.getElementById("status");
    s.textContent = tekst;
    s.classList.toggle("ok", !!ok);
  }

  function kobleSvar() {
    document.addEventListener("input", e => {
      if (e.target.matches("textarea.svar")) { endretSidenKopi = true; visStatus(""); }
    });

    document.getElementById("kopier").addEventListener("click", async () => {
      const tekst = byggKopitekst();
      if (!tekst) { visStatus(T.ingenSvar); return; }
      const ok = await kopierTekst(tekst);
      if (ok) { endretSidenKopi = false; visStatus(T.kopiert, true); }
      else {
        // Siste utvei: vis teksten så eleven kan markere og kopiere selv
        window.prompt("Ctrl+C / Cmd+C", tekst);
      }
    });

    document.getElementById("slett").addEventListener("click", () => {
      if (!confirm(T.bekreftSlett)) return;
      document.querySelectorAll("textarea.svar").forEach(t => { t.value = ""; });
      endretSidenKopi = false;
      visStatus("");
    });

    window.addEventListener("beforeunload", e => {
      if (!endretSidenKopi) return;
      e.preventDefault();
      e.returnValue = T.ulagret;
      return T.ulagret;
    });
  }

  // ---------- Opplesing ----------
  function kobleOpplesing() {
    if (!("speechSynthesis" in window)) return;
    const synth = window.speechSynthesis;
    const lang = tema.sprak === "en" ? "en-GB" : "nb-NO";
    const altKnapp = document.getElementById("les-alt");
    const stoppKnapp = document.getElementById("stopp-lesing");
    let markert = null;

    function stemme() {
      const alle = synth.getVoices();
      const prefiks = tema.sprak === "en" ? ["en-GB", "en"] : ["nb", "no", "nn"];
      for (const p of prefiks) {
        const v = alle.find(v => v.lang && v.lang.toLowerCase().startsWith(p.toLowerCase()));
        if (v) return v;
      }
      return null;
    }

    function avslutt() {
      synth.cancel();
      if (markert) markert.classList.remove("leses-na");
      markert = null;
      stoppKnapp.hidden = true;
      altKnapp.hidden = false;
    }

    function lesAvsnitt(indekser) {
      synth.cancel();
      const v = stemme();
      document.getElementById("stemme-info").textContent = v ? "" : T.ingenStemme;
      altKnapp.hidden = true;
      stoppKnapp.hidden = false;
      const ko = [];
      indekser.forEach(i => {
        const a = tema.avsnitt[i];
        const seksjon = document.querySelector('[data-avsnitt="' + i + '"]');
        ko.push({ tekst: a.tittel, el: seksjon });
        a.tekst.forEach(p => ko.push({ tekst: rentekst(p), el: seksjon }));
      });
      // Hvert avsnitt leses for seg – lange tekster kuttes ellers av enkelte nettlesere
      ko.forEach((del, n) => {
        const u = new SpeechSynthesisUtterance(del.tekst);
        u.lang = lang;
        if (v) u.voice = v;
        u.rate = 0.95;
        u.onstart = () => {
          if (markert !== del.el) {
            if (markert) markert.classList.remove("leses-na");
            markert = del.el;
            markert.classList.add("leses-na");
          }
        };
        if (n === ko.length - 1) u.onend = avslutt;
        synth.speak(u);
      });
    }

    altKnapp.addEventListener("click", () => lesAvsnitt(tema.avsnitt.map((_, i) => i)));
    stoppKnapp.addEventListener("click", avslutt);
    document.querySelectorAll("[data-les]").forEach(b =>
      b.addEventListener("click", () => lesAvsnitt([Number(b.dataset.les)])));
    window.addEventListener("pagehide", () => synth.cancel());
    if (synth.onvoiceschanged !== undefined) synth.onvoiceschanged = stemme;
  }

  // ---------- Start ----------
  document.addEventListener("DOMContentLoaded", async function () {
    const main = document.getElementById("innhold");
    const id = LV.param("id");
    const finnes = LV.temaer.find(t => t.id === id);
    if (!finnes) {
      main.innerHTML = '<p class="melding">Fant ikke temaet. <a href="index.html">Gå til forsiden</a>.</p>';
      return;
    }
    try {
      await LV.lastSkript("data/temaer/" + finnes.id + ".js");
      tema = LV.tema;
      if (!tema || tema.id !== finnes.id) throw new Error("Temafilen har feil id");
      T = TEKST[tema.sprak === "en" ? "en" : "nb"];
      bygg();
    } catch (e) {
      main.innerHTML = '<p class="melding">Kunne ikke laste temaet (' + LV.esc(e.message) + "). " +
        '<a href="index.html">Gå til forsiden</a>.</p>';
    }
  });
})();
